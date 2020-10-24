class LogsController {

  constructor(logsService) {
    this.logsService = logsService;
  }

  getLogs(request, response, next) {
    let index = request.query.index;
    let size = request.query.size;
    let substrQuery = request.query.q;

    this.logsService.findLogs(index, size, substrQuery)
      .then(res => {
        response.json(res && res.hits && res.hits.hits ? res.hits.hits : res);
      })
      .catch(next);
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