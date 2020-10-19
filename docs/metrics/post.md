**Execute Custom Queries**
----
  This endpoint allows the execution of custom queries with parameters specific to Prometheus, the current service responsible for collecting and storing metrics.

* **URL**

  `/metrics`

* **Method:**

  `POST`

* **Data Params**
  
  ```yaml
  {
    "operation": "instantQuery" | "instant_query" | "rangeQuery" | "range_query",
    params: {
      "param1": "value",
      "param2": "value",
      ...
    }
  }
  ```
   **Required:**
 
   `operation=[string]` - one of the available options shown above.

   **Optional:**
 
   `params=[object]` - an object containing a set of parameters to be passed together with the operation. Those parameters are those described on the [Prometheus docs](https://prometheus.io/docs/prometheus/latest/querying/api/).

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example (taken from Prometheus docs):**
    ```yaml
    {
       "status" : "success",
       "data" : {
          "resultType" : "vector",
          "result" : [
             {
                "metric" : {
                   "__name__" : "up",
                   "job" : "prometheus",
                   "instance" : "localhost:9090"
                },
                "value": [ 1435781451.781, "1" ]
             },
             {
                "metric" : {
                   "__name__" : "up",
                   "job" : "node",
                   "instance" : "localhost:9100"
                },
                "value" : [ 1435781451.781, "0" ]
             }
          ]
       }
    }
    ```
 
* **Error Response:**

  * **Code:** 500 UNKNOWN OPERATION <br />
    **Content:** `{ error: "operation not supported" }`

* **Sample Call:**

  ```sh
  curl -H "Content-Type: application/json" \
  -d '{"operation":"instant_query", "params": {"query":"up"}}' http://localhost:8081/metrics
  ```
  
