const config = require('config'),
  fetch = require('node-fetch'),
  { Client } = require('@elastic/elasticsearch');

class ElasticsearchService {
  constructor() {
    this.endpoint = `${config.get('elastic.server')}:${config.get('elastic.port')}`;
    this.client = new Client({ node: `http://${this.endpoint}` });
  }

  findLogs(index = '_all', size = 1000, substrQuery) {

    let fetchUrl = `http://${this.endpoint}/${index}/_search?size=${size}`;
    if (substrQuery) {
      fetchUrl += `&q=${substrQuery}`
    }

    let json = (async () => {
      const response = await fetch(fetchUrl);
      const json = await response.json();
      return json;
    })();

    return json;
  }

  submitCustomQuery(operation, params) {
    if (operation === 'search') {
      return this.client.search(params);
    } else {
      return Promise.reject(new Error('operation not supported'));
    }
  }
}

module.exports = ElasticsearchService;

