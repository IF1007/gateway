const config = require('config'),
  fetch = require('node-fetch'),
  pkg = require('../package.json');

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

class HealthCheckController {

  constructor() {
    this.services = ['prometheus', 'elastic'].map(service => ({
      name: service,
      url: `http://${config.get(`${service}.server`)}:${config.get(`${service}.port`)}` +
        `${config.get(`${service}.health`)}`
    }));
  }

  getVersion(request, response, next) {
    response.status = 200;
    response.json({
      "applicationName": pkg.name,
      "versionRelease": pkg.version
    });
  }

  getHealth(request, response, next) {
    Promise.allSettled(this.services.map(service => fetch(service.url)))
    .then(results => {
      let msg = { ok: true, checks: [] };

      results.forEach((result, index) => {
        if (result.status == 'rejected') {
          msg.ok = false;
          msg.checks.push(createMessage(false, this.services[index].name, this.services[index].url, result.reason));
        } else {
          if (!result.value.ok) {
            msg.ok = false;
            msg.checks.push(createMessage(false, this.services[index].name, this.services[index].url, result.value.statusText));
          } else {
            msg.checks.push(createMessage(true, this.services[index].name, this.services[index].url));
          }
        }
      });
      return msg;
    })
    .then(msg => {
      response.status = 200;
      response.json(msg);
    });
  }
}

module.exports = new HealthCheckController();