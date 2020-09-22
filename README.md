# gateway

## Endpoints
> GET **/version** - Returns application name and version.

> GET **/health** - Checks the health of the API gateway according to its dependent services.

> GET **/metrics** - Returns an array containing collected metrics.

> GET **/metrics/[metric name]** - Returns information about a specific metric. If no time query parameter is informed, value(s) of the given metric is return in that given moment in time.<br>

* *Query Parameters*

&nbsp; &nbsp; &nbsp;**at** - indicates a specific point in time (under construction)<br>
&nbsp; &nbsp; &nbsp;**start** - indicates a start point in time (under construction)<br>
&nbsp; &nbsp; &nbsp;**end** - indicates a final point in time (under construction)<br>
&nbsp; &nbsp; &nbsp;**a set of dimensions/labels** - additionally, a set of dimensions, called labels, can be passed in as query parameter (in a key-value form) to filter even more the query. (under construction)

> GET **/dimensions** - Returns an array of dimensions, called labels in Prometheus.

> GET **/dimensions/[dimension name]** - Return values of a given dimension/label.
