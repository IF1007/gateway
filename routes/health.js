const router = require('express').Router(),
  fetch = require('node-fetch'),
  config = require('config');

// loads a shim for Promise.allSettled in case isn't available
require('promise.allsettled').shim();

const createMessage = (status, name, url, message = "") =>
  ({
    "ok": status,
    "name": name,
    "error": message,
    "details": {
      "url": url
    }
  });

const services = ['prometheus', 'elastic'].map(service => ({
  name: service,
  url: `http://${config.get(`${service}.server`)}:${config.get(`${service}.port`)}` +
    `${config.get(`${service}.health`)}`
}));

router.get('/', (req, res) => {

  Promise.allSettled(services.map(service => fetch(service.url)))
    .then(results => {
      let msg = { ok: true, checks: [] };

      results.forEach((result, index) => {
        if (result.status == 'rejected') {
          msg.ok = false;
          msg.checks.push(createMessage(false, services[index].name, services[index].url, result.reason));
        } else {
          if (!result.value.ok) {
            msg.ok = false;
            msg.checks.push(createMessage(false, services[index].name, services[index].url, result.value.statusText));
          } else {
            msg.checks.push(createMessage(true, services[index].name, services[index].url));
          }
        }
      });
      return msg;
    })
    .then(msg => {
      res.status = 201;
      res.json(msg);
    });
});

module.exports = router;