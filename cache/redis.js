const redis = require('redis'),
  config = require('config'),
  debug = require('debug')('gateway:caching');

const client =
  redis.createClient(config.get('redis.port'), config.get('redis.server'));

client.on("error", function (error) {
  debug(error);
});

const getFromRedis = key => {
  return new Promise((resolve, reject) => {
    client.get(key, (err, value) => {
      if (err) {
        reject(err);
      } else {
        debug("requested cache!")
        resolve(JSON.parse(value));
      }
    });
  });
}

const updateRedis = (key, value) => {
  client.set(key, JSON.stringify(value));
  client.expire(key, config.get('redis.expire'));
}

module.exports = { getFromRedis, updateRedis };