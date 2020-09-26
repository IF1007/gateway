const { keys, omit, toNumber } = require('lodash');

class MetricsControlller {

  constructor(metricsService) {
    this.metricsService = metricsService;
  }

  getMetrics(request, response, next) {
    var limit = request.query.limit;

    this.metricsService.findMetrics(limit)
      .then(res => {
        response.json(keys(res));
      })
      .catch(next);
  }

  getMetric(request, response, next) {
    var metric = request.params._metric;

    var dimensions = omit(request.query, ['at', 'start', 'end']);

    let query;
    if (request.query.start || request.query.end) {
      query = this.metricsService.findMetricByRange(metric, dimensions, request.query.start,
        request.query.end, request.query.step);
    } else {
      query = this.metricsService.findMetricByInstant(metric, dimensions, request.query.at);
    }

    query
      .then(res => {
        response.json(res.result);
      })
      .catch(next);
  }

  getDimensions(request, response, next) {
    var limit = request.query.limit;

    this.metricsService.findDimensions()
      .then(res => {
        if (limit && (limit = toNumber(limit))) {
          response.json(res.slice(0, limit));
        } else {
          response.json(res);
        }

      })
      .catch(next);
  }

  getDimension(request, response, next) {
    var dimension = request.params._dimension;

    this.metricsService.findDimension(dimension)
      .then(res => {
        response.json(res);
      })
      .catch(next);
  }
}

module.exports = function (metricsService) {
  return new MetricsControlller(metricsService);
};