const app = require('express')(),
  bodyParser = require('body-parser'),
  { graphqlHTTP } = require('express-graphql'),
  config = require('config');

const { schema } =
  require('prom-graphql')(`http://${config.get('prometheus.server')}:${config.get('prometheus.port')}`);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// handle favicon
app.use(function (request, response, next) {
  if (request.url === 'favicon.ico') {
    response.writeHead(200, { 'Content-Type': 'image/x-icon' });
    response.end('');
  } else {
    next();
  }
});

// routes
app.use('/', require('./routes'));

// graphql
// activates graphiql only when the DEBUG env variable is set
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: !!process.env.DEBUG
}));

// error handling
app.use(function (request, response, next) {
  let err = new Error('Not Found');
  err.status = 404;

  console.log(err)
  next(err);
});
app.use(function (err, request, response, next) {
  response.status(err.status || 500).json({ err: err.message });
});

// listener
module.exports = app;