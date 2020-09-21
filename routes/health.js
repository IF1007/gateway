const router = require('express').Router(),
  async = require('async'),
  fetch = require('node-fetch'),
  config = require('config');

const createMessage = (status, name, url, message = "") =>
  ({
    "ok": status,
    "name": name,
    "error": message,
    "details": {
      "url": url
    }
  });

router.get('/', (req, res) => {

  let status = true;

  async.parallel([
    function (callback) {
      let url =
        `http://${config.get('prometheus.server')}:${config.get('prometheus.port')}` +
        `${config.get('prometheus.health')}`;

      fetch(url)
        .then(res => {
          if (res.ok) {
            callback(null, createMessage(true, 'prometheus', url));
          } else {
            status = false;
            callback(null, createMessage(false, 'prometheus', url, res.statusText));
          }
        })
        .catch(err => {
          status = false;
          callback(null, createMessage(false, 'prometheus', url, err.message));
        });
    },
    function (callback) {
      let url = `http://${config.get('elastic.server')}:${config.get('elastic.port')}` +
        `${config.get('elastic.health')}?format=JSON`;

      fetch(url)
        .then(res => {
          if (res.ok) {
            callback(null, createMessage(true, 'elasticsearch', url));
          } else {
            status = false;
            callback(null, createMessage(false, 'elasticsearch', url, res.statusText));
          }
        })
        .catch(err => {
          status = false;
          callback(null, createMessage(false, 'elasticsearch', url, err.message))
        });
    }
  ], function (err, checks) {
    res.status = 201;
    res.json({
      ok: status,
      checks: checks
    });
  });


});

module.exports = router;