const config = require('config'),
  isBefore = require('date-fns/isBefore'),
  jwt = require('jwt-simple'),
  UrlPattern = require('url-pattern');

// inserts a slash at the end of the url
const insertSlash = url => url.replace(/\/?$/, '/');

const transformPattern =
  val => val === '*' ? new UrlPattern(val) : new UrlPattern(insertSlash(val));

let protectedUrls = config.get('auth.protectedUrls');

// transforms each url pattern in a UrlPattern instance
if (protectedUrls && protectedUrls.length > 0) {
  protectedUrls = protectedUrls.map(val => {
    if (typeof val === 'string') {
      return transformPattern(val);
    } else if (typeof val === 'object' && val.url) {
      return {
        url: transformPattern(val.url),
        method: val.method
      };
    }
  });
}

// verifies if the supplied url is among the url path patterns in the config file
const testUrls = request => {
  const url = insertSlash(request.originalUrl.replace(/\?.*$/, ''));
  const method = request.method.toUpperCase();

  return protectedUrls.some(val => {
    if (val.url) {
      const result = val.url.match(url);
      return val.method ?
        result && (val.method.split(',').some(m => m.toUpperCase() === method)) :
        result;
    }
    return val.match(url);
  })
};

function authMiddleware(request, response, next) {

  if (protectedUrls && protectedUrls.length > 0) {
    if (testUrls(request)) {
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

module.exports = authMiddleware;