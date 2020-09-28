const { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    metrics: [String]
    metricByInstant(metric: String!, dimensions: String, moment: String): String
  }
`);

module.exports = schema;