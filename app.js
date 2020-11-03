const app = require('express')(),
  bodyParser = require('body-parser'),
  debug = require('debug')('gateway:errors');

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

// error handling
app.use(function (request, response, next) {
  let err = new Error('Not Found');
  err.status = 404;

  //console.log(err);
  debug(err);
  next(err);
});
app.use(function (err, request, response, next) {
  response.status(err.status || 500).json({ error: err.message });
});

// listener
module.exports = app;