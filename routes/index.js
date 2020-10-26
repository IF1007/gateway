const router = require('express').Router(),
  { graphqlHTTP } = require('express-graphql'),
  config = require('config'),
  { mergeSchemas } = require('@graphql-tools/merge'),
  authMiddleware = require('./auth');

const { schema: promSchema } =
  require('prom-graphql')(`http://${config.get('prometheus.server')}:${config.get('prometheus.port')}`);
const { schema: elasticSchema } =
  require('elastic-graphql')(`http://${config.get('elastic.server')}:${config.get('elastic.port')}`);

router.use('/login', require('./login'));

router.use('/metrics', authMiddleware, require('./metrics'));
router.use('/logs', authMiddleware, require('./logs'));
router.use('/check', authMiddleware, require('./healthCheck'));

// graphql
// activates GraphiQL(UI) only when the GRAPHIQL env variable is set
router.use('/graphql', authMiddleware, graphqlHTTP({
  schema: mergeSchemas({
    schemas: [promSchema, elasticSchema]
  }),
  graphiql: !!process.env.GRAPHIQL
}));

module.exports = router;