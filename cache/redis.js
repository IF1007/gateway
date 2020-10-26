const redis = require('redis')
const config = require('config')
const client = redis.createClient(config.get('redis.port'), config.get('redis.server'))

client.on("error", function(error) {
    console.error(error);
  });
  
const getFromRedis = (key) => {
    return new Promise((resolve, reject) => {
        client.get(key, (err, value) => {
            if(err){
                reject(err);
            }else{
                console.log("requested cache!")
                resolve(JSON.parse(value));
            }
        });
    });
}

const updateRedis = (key, value) => {
        client.set(key, JSON.stringify(value))
        client.expire(key, config.get('redis.expire'))
}

module.exports = {getFromRedis, updateRedis}