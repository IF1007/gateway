# MicroObs API Gateway
![Language: JavaScript](https://img.shields.io/static/v1?label=language&message=javascript&color=yellow&style=flat)
[![License: MIT](https://img.shields.io/github/license/microobs/gateway)](https://opensource.org/licenses/MIT)

An [API Gateway](https://microservices.io/patterns/apigateway.html) corresponds to the entry point of a microsservice application. In the MicroObs project, it is used to provide an interface for the observalibity aspects currently supported (logs and metrics).
According to Richardson(2019), an API gateway may implement the following functionalities (including the usual routing/composition):
* Routing / composition :heavy_check_mark:
* Authentication / authorization :heavy_check_mark:
* Request logging :heavy_check_mark:
* Rate limiting
* Caching
* Metrics collection

By now, the microobs API gateway supports the three checked concerns.

This module has been developed using the [Node.js](https://nodejs.org/) platform together with the flexible [Express framework](https://expressjs.com/). Trying to bring a different, preferably more flexible, approach, the gateway supports not only the usual REST communication mechanism (a common pattern adopted by various microservices implementations), but also the [GraphQL](https://graphql.org/) query language. GraphQL brings a distinct approach by letting the consumers query exactly what they want, thus avoiding underfetching and overfetching. A valuable discussion can be found [here](https://www.howtographql.com/basics/1-graphql-is-the-better-rest/).

## Usage
Right now, the the gateway image must be manually built. That can be accomplished by running the following commands:
```sh
# clone the gateway repository
git clone https://github.com/microobs/gateway
cd gateway

# build the image
# api_gateway is the tag configured to be used in the microobs docker-compose
sudo docker build -t api_gateway .
```

## Future Improvements
* Enhance the endpoints
* Add other promising technologies like [gRPC](https://grpc.io/)
* Improve the auth logic to support database consumption
* Address the other functionalaties not covered yet like caching
* Evaluate the incorporation of the [circuit breaker pattern](https://microservices.io/patterns/reliability/circuit-breaker.html)

## Contribution
This module along with the MicroObs project helped the creation of the open source JS module [Prom-GraphQL](https://github.com/carloszimm/prom-graphql) that as long as we know it's the first GraphQL wrapper on the Prometheus REST API.

## License
MicroObs API Gateway is available under the MIT license. See the [LICENSE](https://github.com/microobs/gateway/blob/master/LICENSE) file for more info.
