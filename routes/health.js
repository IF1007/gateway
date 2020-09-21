const router = require('express').Router();
const async = require('async');
var fetch = require('node-fetch');

router.get('/', (req, res) => {
  function createMessage(status, name, url, message = "") {
    return {
      "ok": status,
      "name": name,
      "error": message,
      "details": {
        "url": url
      }
    }
  }

  let ret = {
    "ok": true
  };

  async.parallel([
    function (callback) {
      let url = "http://prometheus:9090/-/healthy";

      fetch(url)
        .then(res => {
          if (res.ok) {
            callback(null, createMessage(true, 'prometheus', url));
          } else {
            ret.ok = false;
            callback(null, createMessage(false, 'prometheus', url, res.statusText));
          }
        })
        .catch(err => {
          ret.ok = false;
          callback(null, createMessage(false, 'prometheus', url, err.message));
        });
    },
    function (callback) {
      let url = "http://elasticsearch:9200/_cat/health?format=JSON";

      fetch(url)
        .then(res => {
          if (res.ok) {
            callback(null, createMessage(true, 'elasticsearch', url));
          } else {
            ret.ok = false;
            callback(null, createMessage(false, 'elasticsearch', url, res.statusText));
          }
        })
        .catch(err => {
          ret.ok = false;
          callback(null, createMessage(false, 'elasticsearch', url, err.message))
        });
    }
  ], function (err, checks) {
    ret.checks = checks;
    res.status = 201;
    res.json(ret);
  });


});

module.exports = router;