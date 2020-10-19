const config = require('config'),
  isBefore = require('date-fns/isBefore'),
  jwt = require('jwt-simple');

// inserts a slash at the end of the url
const insertSlash = url => url.replace(/\/?$/, '/');

// verifies if the supplied url is among the urls in the config file
const testUrls = (protectedUrls, url) =>
  protectedUrls.some(val =>
    val === '*' || val === url || insertSlash(val) === insertSlash(url)
  );

function middlewareAuth(request, response, next) {
  const protectedUrls = config.get('auth.protectedUrls');

  if (protectedUrls && protectedUrls.length > 0) {
    if (testUrls(protectedUrls, request.originalUrl.replace(/\?.*$/, ''))) {
      let token = request.headers['x-access-token'];

      if (!token) {
        let err = new Error('Forbidden');
        err.status = 403;
        return next(err);
      }
      try {
        const decoded = jwt.decode(token, config.get('auth.tokenSecret'));

        if (!isBefore(new Date(decoded.exp), new Date())) {
          request.user = decoded.user;
        } else { //expired 
          let err = new Error('Unauthorized');
          err.status = 401;
          return next(err);
        }
      } catch (err) {
        return next(err);
      }
    }
  }

  return next();
}

module.exports = middlewareAuth;