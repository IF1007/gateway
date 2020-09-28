const app = require('express')(),
  { graphqlHTTP } = require('express-graphql'),
  { schema, root } = require('./graphql');

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
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: !!process.env.DEBUG
}));

// error handling
app.use(function (request, response, next) {
  let err = new Error('Not Found');
  err.status = 404;

  next(err);
});
app.use(function (err, request, response, next) {
  response.status(err.status || 500).json({ err: err.message });
});

// listener
module.exports = app;