const router = require('express').Router(),
  addDays = require('date-fns/addDays'),
  jwt = require('jwt-simple'),
  config = require('config');

router.post('/', function (request, response, next) {
  const username = request.body.username,
    password = request.body.password;

  if (username === 'admin' && password === 'admin') {
    let expires = +(addDays(new Date(), 7));

    const token = jwt.encode({
      user: username,
      exp: expires
    }, config.get('auth.tokenSecret'));

    response.json({
      token: token
    });
  } else {
    let err = new Error('Unauthorized');
    err.status = 401;
    next(err);
  }
});

module.exports = router;