const config = require('config'),
  fetch = require('node-fetch'),
  formurlencoded = require('form-urlencoded').default,
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
    this.serviceConfigs = {
      endpoint: `http://${config.get('prometheus.server')}:${config.get('prometheus.port')}`,
      baseURL: "/api/v1" // default value
    };
    this.pq = new PrometheusQuery(this.serviceConfigs);
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

  submitCustomQuery(operation, params) {
    let url = this.serviceConfigs.endpoint + this.serviceConfigs.baseURL;

    switch (operation) {
      case 'instantQuery':
      case 'instant_query':
      case 'query':
        url += '/query';
        break;
      case 'rangeQuery':
      case 'range_query':
      case 'query_range':
        url += '/query_range';
        break;
      default:
        return Promise.reject(new Error('operation not supported'));
    }

    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formurlencoded(params)
    })
      .then(res => res.json());
  }
}

module.exports = PrometheusService;