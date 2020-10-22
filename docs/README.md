## Endpoints
* [Login](https://github.com/microobs/gateway/tree/master/docs#jwt-basic-authentication): `POST /login`

### Metrics
* [Show Metrics](https://github.com/microobs/gateway/blob/master/docs/metrics/get.md#show-metrics): `GET /metrics`
* [Query Specific Metric](https://github.com/microobs/gateway/blob/master/docs/metrics/get.md#query-specific-metric): `GET /metrics/m/:metric`
* [Show Dimensions/Labels](https://github.com/microobs/gateway/blob/master/docs/metrics/get.md#show-dimensionslabels): `GET /metrics/ds`
* [Retrieve Dimensions' Values](https://github.com/microobs/gateway/blob/master/docs/metrics/get.md#retrieve-dimensions-values): `GET /metrics/ds/:dimension_name`

* [Execute Custom Queries](https://github.com/microobs/gateway/blob/master/docs/metrics/post.md#execute-custom-queries): `POST /metrics`

### Logs

### GraphQL

### Server Info
* [Check Health](https://github.com/microobs/gateway/blob/master/docs/check/get.md#check-health): `GET /check/health`
* [Retrive API Version](https://github.com/microobs/gateway/blob/master/docs/check/get.md#retrive-api-version): `GET /check/version`

## JWT Basic Authentication
The gateway supports basic authentication through JWT (JSON Web Token). To "enable" it(protect the endpoints), an object is available in the config file presenting the following structure
```yaml
"auth": {
    "protectedUrls": [],
    "tokenSecret": "microobs"
  }
```

The `protectedUrls` is a string array of the endpoints that must be protected by authetication. For example, to protect the `graphql`, the string `"/graphql"` must be provided in the array. The `tokenSecret` represents the Salt to be used in the encoding process. Once an endpoint is protected, the following error JSON is displayed with a valid token is informed:
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

As can be seen, the token must be provided as a message header under the entry `x-access-token'.
