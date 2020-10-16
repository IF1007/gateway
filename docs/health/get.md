**Check Health**
----
  Returns information about the API gateway's health according to the health of its dependent services.

* **URL**

  `/check/health`

* **Method:**

  `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:**
    
    ```yaml
    {
      "ok": true,
      "checks": [
        {
          "ok": true,
          "name": "prometheus",
          "error": "",
          "details": {
            "url": "http://prometheus:9090/-/healthy"
          }
        },
        {
          "ok": true,
          "name": "elastic",
          "error": "",
          "details": {
            "url": "http://elasticsearch:9200/_cat/health?format=JSON"
          }
        }
      ]
    }
    ```

* **Sample Call:**

  ```sh
  curl -H "Content-Type: application/json" \
  http://localhost:8081/check/health
  ```
**Retrive API Version**
----
  Returns information about the application name and version.

* **URL**

  `/check/version`

* **Method:**

  `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:**
    
    ```yaml
    {
      "applicationName": "microobs-gateway",
      "versionRelease": "1.0.0"
    }
    ```

* **Sample Call:**

  ```sh
  curl -H "Content-Type: application/json" \
  http://localhost:8081/check/version
  ```
