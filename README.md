# MicroObs API Gateway
![Language: JavaScript](https://img.shields.io/static/v1?label=language&message=javascript&color=yellow&style=flat)
[![License: MIT](https://img.shields.io/github/license/microobs/gateway)](https://opensource.org/licenses/MIT)

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
* Add other promising technologies like gRPC
* Improve the auth logic to support database consumption

## Contribution
This module along with the MicroObs project helped the creation of the open source JS module [Prom-GraphQL](https://github.com/carloszimm/prom-graphql) that as long as we know it's the first GraphQL wrapper on the Prometheus REST API.

## License
MicroObs API Gateway is available under the MIT license. See the [LICENSE](https://github.com/microobs/gateway/blob/master/LICENSE) file for more info.
