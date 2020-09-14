const _ = require('lodash/core');
const PrometheusQuery = require('prometheus-query');

class MetricsControlller {

  constructor() {
    this.pq = new PrometheusQuery({
      endpoint: "http://prometheus:9090",
      baseURL: "/api/v1" // default value
    });
  }

  getMetrics(request, response, next) {
    this.pq.metadata()
      .then(res => {
        response.json(_.keys(res));
      })
      .catch(next)
  }
}

module.exports = new MetricsControlller();