class LogsController {

    constructor(elasticsearchService) {
      this.elasticsearchService = elasticsearchService;
    }
  
    getLogs(request, response, next) {
      let index = request.query.index;
  
      this.elasticsearchService.findLogs(index)
      .then(res => {
        response.json(res);
      })
      .catch(next);
    }
}

module.exports = function(elasticsearchService) {
    return new LogsController(elasticsearchService);
};