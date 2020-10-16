const router = require('express').Router(),
  { graphqlHTTP } = require('express-graphql'),
  config = require('config');

const { schema } =
  require('prom-graphql')(`http://${config.get('prometheus.server')}:${config.get('prometheus.port')}`);

router.use('/metrics', require('./metrics'));
router.use('/logs', require('./logs'));
router.use('/check', require('./healthCheck'));

// graphql
// activates GraphiQL(UI) only when the DEBUG env variable is set
router.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: !!process.env.DEBUG
}));

module.exports = router;