**Query Graphql**
----
  Query graphql endpoint for both logs' and metrics' services (elasticsearch and prometheus respectively). Two root level types are available: elastic and prometheus. Their fields correspond to the search operations commonly found on those services like `search` for querying elasticsearch data or `query`/`query_range` to execute a Prometheus instant and range query respectively. More information can be found in the schemas available in the [elastic-graphql](https://github.com/carloszimm/elastic-graphql/blob/main/lib/schema.js) and [prom-graphql](https://github.com/carloszimm/prom-graphql/blob/main/lib/schema.js) modules.

* **URL**

  `/graphql`

* **Method:**

  `POST`

* **Data Params**

  ```yaml
  {
    "data": "graphql query"
  }
  ```
  **Required:**
  `data=[string]` - a graphql query.

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```yaml
    { "data":
      { "elastic":
        { "search":
          { "body":
            { "took": 941,
              "timed_out":false,
              "_shards":
              { "total":6,
                "successful":4,
                "skipped":0,
                "failed":0
               },
              "hits":
              ....
              ....
    }
    ```
    
* **Sample Call:**
  * ElasticSearch
  ```sh
  curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"query": "{ elastic { search(q: \"listening\") { body } } }"}' \
  http://localhost:8081/graphql
  ```
  
  * Prometheus
  ```sh
  curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"query": "{ prometheus { query(query: \"container_memory_usage_bytes\") { status } } }"}' \
  http://localhost:8081/graphql
  ```
  
  * ElasticSearch and Prometheus
  ```sh
  curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"query": "{ elastic { search(q: \"listening\") { body } } prometheus { query(query: \"container_memory_usage_bytes\") { status } } }"}' \
  http://localhost:8081/graphql
  ```
