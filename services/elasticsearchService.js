const config = require('config'),
  fetch = require('node-fetch');

class ElasticsearchService {
  constructor() {
    this.endpoint = `${config.get('elastic.server')}:${config.get('elastic.port')}`;
  }

  findLogs(index = '_all') {

    let fetchUrl = `http://${this.endpoint}/${index}/_search`;

    let json = (async () => {
      const response = await fetch(fetchUrl);
      const json = await response.json();
      return json;
    })();

    return json;
  }
}

module.exports = ElasticsearchService;

