const config = require('config'),
  isBefore = require('date-fns/isBefore'),
  jwt = require('jwt-simple'),
  UrlPattern = require('url-pattern');

// inserts a slash at the end of the url
const insertSlash = url => url.replace(/\/?$/, '/');

let protectedUrls = config.get('auth.protectedUrls');
// transforms each url pattern in a UrlPattern instance
if (protectedUrls && protectedUrls.length > 0) {
  protectedUrls = protectedUrls.map(val =>
    val === '*' ? new UrlPattern(val) : new UrlPattern(insertSlash(val)));
}

// verifies if the supplied url is among the url path patters in the config file
const testUrls = url =>
  protectedUrls.some(pattern => pattern.match(url));

function middlewareAuth(request, response, next) {

  if (protectedUrls && protectedUrls.length > 0) {
    if (testUrls(insertSlash(request.originalUrl.replace(/\?.*$/, '')))) {
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