const router = require('express').Router(),
  { graphqlHTTP } = require('express-graphql'),
  config = require('config'),
  middlewareAuth = require('./auth');

const { schema } =
  require('prom-graphql')(`http://${config.get('prometheus.server')}:${config.get('prometheus.port')}`);

router.use('/login', require('./login'));

router.use('/metrics', middlewareAuth, require('./metrics'));
router.use('/logs', middlewareAuth, require('./logs'));
router.use('/check', middlewareAuth, require('./healthCheck'));

// graphql
// activates GraphiQL(UI) only when the DEBUG env variable is set
router.use('/graphql', middlewareAuth, graphqlHTTP({
  schema: schema,
  graphiql: !!process.env.DEBUG
}));

module.exports = router;