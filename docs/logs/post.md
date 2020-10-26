**Execute Custom Queries**
----
  This endpoint allows the execution of custom queries with parameters specific to ElasticSearch ([elasticsearch-js](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/7.x/api-reference.html)), the current service responsible for collecting and storing logs.
  By now, the only operation supported is [search](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/7.x/api-reference.html#_search).

* **URL**

  `/logs`

* **Method:**

  `POST`

* **Data Params**
  
  ```yaml
  {
    "operation": "search",
    params: {
      "param1": "value",
      "param2": "value",
      ...
    }
  }
  ```
   **Required:**
 
   `operation=[string]` - search.

   **Optional:**
 
   `params=[object]` - an object containing a set of parameters to be passed together with the operation. Those parameters are those described on the [elasticsearch-js docs](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/7.x/api-reference.html#_search).

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:**
    ```yaml
    {
      "data": {
        "elastic": {
          "search": {
            "body": {
              "took": 34,
              "timed_out": false,
              "_shards": {
                "total": 5,
                "successful": 5,
                "skipped": 0,
                "failed": 0
              },
              "hits": {
                "total": {
                  "value": 114,
                  "relation": "eq"
                },
                "max_score": 7.6380124,
                "hits": [
                  {
                    "_index": "filebeat-7.2.0-2020.10.18",
                    "_type": "_doc",
                    "_id": "gWCRPXUBPy9HAi_4CoPh",
                    "_score": 7.6380124,
                    ....
    }
    ```
 
* **Error Response:**

  * **Code:** 500 UNKNOWN OPERATION <br />
    **Content:** `{ error: "operation not supported" }`

* **Sample Call:**

  ```sh
  curl -H "Content-Type: application/json" \
  -d '{"operation":"search", "params": {"q":"listening"}}' http://localhost:8081/logs
  ```
  
