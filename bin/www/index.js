#!/usr/bin/env node

var app = require('../../app')
var server = app.listen(8081, function () {
  let host = server.address().address;
  let port = server.address().port;

  console.log(`Gateway listening at http://${host}:${port}`)
});