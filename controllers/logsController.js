const redis = require("../cache/redis");

const {getFromRedis, updateRedis} = redis

class LogsController {

  constructor(logsService) {
    this.logsService = logsService;
  }

 async getLogs(request, response, next) {
    let index = request.query.index;
    let size = request.query.size;
    let substrQuery = request.query.q;

    let cacheKey = String(index)+String(size)+String(substrQuery)
    let cacheValue = await getFromRedis(cacheKey)
    console.log('cacheValue are:', cacheValue)

    if(cacheValue){
      console.log('CACHE WORKS!')
      response.json(cacheValue && cacheValue.hits && cacheValue.hits.hits ? cacheValue.hits.hits : cacheValue);
    } else {
      this.logsService.findLogs(index, size, substrQuery)
        .then(res => {
          updateRedis(cacheKey, res)
          response.json(res && res.hits && res.hits.hits ? res.hits.hits : res);
        })
        .catch(next);
    }
  }

  customQuery(request, response, next) {
    let operation = request.body.operation,
      params = request.body.params;

    this.logsService.submitCustomQuery(operation, params)
      .then(res => {
        response.json(res);
      })
      .catch(next);
  }
}

module.exports = function (logsService) {
  return new LogsController(logsService);
};