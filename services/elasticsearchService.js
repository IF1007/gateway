const config = require('config'),
  fetch = require('node-fetch');

class ElasticsearchService {
  constructor() {
    this.endpoint = `${config.get('elastic.server')}:${config.get('elastic.port')}`;
  }

  findLogs(index = '_all', size = 1000, substrQuery=undefined) {

    let fetchUrl = `http://${this.endpoint}/${index}/_search?size=${size}`;
    if(substrQuery){
      fetchUrl += `&q=${substrQuery}`
    }

    let json = (async () => {
      const response = await fetch(fetchUrl);
      const json = await response.json();
      return json;
    })();

    return json;
  }
}

module.exports = ElasticsearchService;

