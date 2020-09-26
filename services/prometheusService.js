const config = require('config'),
  parseISO = require('date-fns/parseISO'),
  PrometheusQuery = require('prometheus-query');

function transformObj(obj) {
  let aux = "";

  Object.keys(obj).forEach(function (key, index, array) {
    aux += `${key}="${obj[key]}"`;
    if (index < array.length - 1)
      aux += ', ';
  });

  return "{" + aux + "}";
}

class PrometheusService {
  constructor() {
    this.pq = new PrometheusQuery({
      endpoint: `http://${config.get('prometheus.server')}:${config.get('prometheus.port')}`,
      baseURL: "/api/v1" // default value
    });
  }

  findMetrics(limit) {
    return this.pq.metadata(undefined, limit);
  }

  findMetricByInstant(metric, dimensions, moment) {
    if (dimensions) {
      metric += transformObj(dimensions);
      console.log(metric);
    }
    if (moment) {
      moment = isNaN(moment) ? parseISO(moment) : Number(moment);
    }

    return this.pq.instantQuery(metric, moment);
  }

  findMetricByRange(metric, dimensions, startTime, endTime, step = '15s') {
    if (dimensions) {
      metric += transformObj(dimensions)
      console.log(metric);
    }
    if (startTime) {
      startTime = isNaN(startTime) ? parseISO(startTime) : Number(startTime);
    } else {
      startTime = new Date();
    }

    if (endTime) {
      endTime = isNaN(endTime) ? parseISO(endTime) : Number(endTime);
    } else {
      endTime = new Date();
    }

    return this.pq.rangeQuery(metric, startTime, endTime, step);
  }

  findDimensions() {
    return this.pq.labelNames();
  }

  findDimension(dimension) {
    return this.pq.labelValues(dimension);
  }
}

module.exports = PrometheusService;