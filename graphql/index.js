const { buildSchema } = require('graphql'),
  { keys } = require('lodash'),
  PrometheusService = require('../services/prometheusService');

const prometheusService = new PrometheusService();

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    metrics: [String]
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  metrics: () => {
    return prometheusService.findMetrics()
      .then(res => keys(res));
  },
};

module.exports = {
  schema,
  root
};