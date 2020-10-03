class LogsController {

    constructor(elasticsearchService) {
      this.elasticsearchService = elasticsearchService;
    }
  
    getLogs(request, response, next) {
      let index = request.query.index;
      let size = request.query.size
      let substrQuery = request.query.q

      this.elasticsearchService.findLogs(index, size, substrQuery)
      .then(res => {
        response.json(res);
      })
      .catch(next);
    }
}

module.exports = function(elasticsearchService) {
    return new LogsController(elasticsearchService);
};