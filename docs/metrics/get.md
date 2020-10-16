**Metrics**
----
Returns an array containing the collected metrics.

* **URL**

  `/metrics`

* **Method:**

  `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** `["cadvisor_version_info", "container_cpu_load_average_10s", "container_cpu_system_seconds_total"]`

* **Sample Call:**

  ```sh
  curl -H "Content-Type: application/json" \
  http://localhost:8081/metrics
  ```
