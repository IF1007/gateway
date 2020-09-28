const { keys } = require('lodash'),
  PrometheusService = require('../services/prometheusService');

const prometheusService = new PrometheusService();

// The root provides a resolver function for each API endpoint
var root = {
  metrics: () => {
    return prometheusService.findMetrics()
      .then(res => keys(res));
  },
  metricByInstant: ({ metric, dimensions, moment }) => {
    return prometheusService.findMetricByInstant(metric, dimensions, moment)
      .then(res => JSON.stringify(res.result));
  }
};

module.exports = root;