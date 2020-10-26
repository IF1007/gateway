# Documentation
* [Endpoints](https://github.com/microobs/gateway/tree/master/docs#endpoints)
* [Configuration](https://github.com/microobs/gateway/tree/master/docs#configuration)
* [JWT Basic Authentication](https://github.com/microobs/gateway/tree/master/docs#jwt-basic-authentication)
* [Request logging](https://github.com/microobs/gateway/tree/master/docs#request-logging)

## Endpoints
### Authentication
* [Login](https://github.com/microobs/gateway/tree/master/docs#jwt-basic-authentication): `POST /login`

### Metrics
* [Show Metrics](https://github.com/microobs/gateway/blob/master/docs/metrics/get.md#show-metrics): `GET /metrics`
* [Query Specific Metric](https://github.com/microobs/gateway/blob/master/docs/metrics/get.md#query-specific-metric): `GET /metrics/m/:metric`
* [Show Dimensions/Labels](https://github.com/microobs/gateway/blob/master/docs/metrics/get.md#show-dimensionslabels): `GET /metrics/ds`
* [Retrieve Dimensions' Values](https://github.com/microobs/gateway/blob/master/docs/metrics/get.md#retrieve-dimensions-values): `GET /metrics/ds/:dimension_name`

* [Execute Custom Queries](https://github.com/microobs/gateway/blob/master/docs/metrics/post.md#execute-custom-queries): `POST /metrics`

### Logs

* [Execute Custom Queries](https://github.com/microobs/gateway/blob/master/docs/logs/post.md#execute-custom-queries): `POST /logs`

### GraphQL

### Server Info
* [Check Health](https://github.com/microobs/gateway/blob/master/docs/check/get.md#check-health): `GET /check/health`
* [Retrive API Version](https://github.com/microobs/gateway/blob/master/docs/check/get.md#retrive-api-version): `GET /check/version`

## Configuration
The gateway uses the [node-config](https://github.com/lorenwest/node-config) module to load some configuration settings. This modules in turn loads configuration based on some default files that must reside under the /config folder. Thus, this module is configured to load such configs from the [default.json](https://github.com/microobs/gateway/blob/master/config/default.json) file following the structure presented in it. Those configs are used to set basic informations like the url and port of each dependent service and their health endpoint. Also, it carries some config related to authentication (more info [bellow](https://github.com/microobs/gateway/tree/master/docs#jwt-basic-authentication)). As described in the microobs main page, those configuration can be overwriten by using the docker volumes feature (there's even a line commentted in the [docker-compose file](https://github.com/microobs/microobs/blob/master/docker-compose.yml) that show how to do so). Also, since the gateway is being built manually before use, one can directly alter those config in the default.json file.

## JWT Basic Authentication
The gateway supports basic authentication through JWT (JSON Web Token). To "enable" it (protect the endpoints), an object is available in the [config file](https://github.com/microobs/gateway/blob/master/config/default.json) presenting the following structure
```yaml
"auth": {
    "protectedUrls": [],
    "tokenSecret": "microobs"
  }
```

The `protectedUrls` is an array containing the endpoints that must be protected by authetication. This array may be filled with either strings or objects. If a string is supplied, the auth mechanism will protect any route that matches such string regardless of the http verb. On the other hand, an object can be supplied that in such case must have both a `url` property, containing the route pattern that must be protected, and a `method` property consisting of a comma separated string of the protected http methods. The following listing shows examples of valid entries for the `protectedUrls` field:
```yaml
"auth": {
    "protectedUrls": [
      {
        "url": "/graphql",
        "method": "GET,POST"
      },
      "/metrics",
      {
        "/metrics/m/:metricname"
        "method": "GET"
      }
    ],
    "tokenSecret": "microobs"
  }
```

Note that the routes can have patterns like `/metrics/m/:metricname`or even `/metrics/*`(to protect metrics and all endpoints starting with it). This is possible thanks to the amazing library [url-pattern](https://github.com/snd/url-pattern) that is used internally for checking routes' patterns.

The `tokenSecret` represents the Salt to be used in the encoding process. Once an endpoint is protected, the following error JSON is displayed if an invalid token or no token at all is informed:
```yaml
{"error": "Forbidden"}
```
> Note: a generated token is valid for 7 days. After that, a new login process must be done.

To access such a protected endpoint, one must first get a token by submitting a JSON informing a valid username and password to the `/login` endpoint:
```sh
curl -H "Content-type: application/json" \
-d '{"username": "admin", "password": "admin"}' \
http://localhost:8081/login
```
> Note: Currently the only valid username and password are admin and admin.

The returned response is a JSON containing the entry token and the its respective value. Supposing that the `/metrics` endpoint is currently protected and a token was already generated, the following curl command could be used to access the endpoint:

```sh
curl -H "Content-type: application/json" \
-H "x-access-token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiYWRtaW4iLCJleHAiOjE2MDM3MjU0MzI0Nzh9.kYz5XCOpAVxd0sk_YT5L5XVo8AR1G1_4LnEIUkpTO3A" \
http://localhost:8081/metrics
```

As can be seen, the token must be provided as a message header under the entry `x-access-token`.

## Request Logging
The request logging functionality is provided by the Express framework ([Debugging Express](https://expressjs.com/en/guide/debugging.html)). To activate it, the `Debug environment variable` must be set to the appropriated value. To include only information about request, this variable can be set to `express:router`. To output a more complete information about the all the functionalities handled by Express, this variable may be set to `express:*`.
