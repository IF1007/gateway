const { dropRight, keys, toNumber } = require('lodash');
const PrometheusQuery = require('prometheus-query');

class MetricsControlller {

  constructor() {
    this.pq = new PrometheusQuery({
      endpoint: "http://prometheus:9090",
      baseURL: "/api/v1" // default value
    });
  }

  getMetrics(request, response, next) {
    var limit = request.query.limit;

    this.pq.metadata(undefined, limit)
      .then(res => {
        response.json(keys(res));
      })
      .catch(next);
  }

  getMetric(request, response, next) {
    var metric = request.params._metric;

      this.pq.instantQuery(metric)
      .then(res => {
        response.json(res.result);
      })
      .catch(next);
  }

  getDimensions(request, response, next) {
    var limit = request.query.limit;

    this.pq.labelNames()
      .then(res => {
        if(limit && (limit = toNumber(limit))){
          response.json(res.slice(0, limit));
        }else{
          response.json(res);
        }
        
      })
      .catch(next);
  }

  getDimension(request, response, next) {
    var dimension = request.params._dimension;

    this.pq.labelValues(dimension)
    .then(res => {
      response.json(res);
    })
    .catch(next);
  }
}

module.exports = new MetricsControlller();