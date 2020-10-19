```yaml
{
  query{
    prometheus{
      query(query:"container_memory_usage_bytes"){
        data{
          resultType
          ... on Vector{
            result{
              value{
                time
                value
              }
            }
          }
        }
      }
      query_range(query:"node_network_name_assign_type",
        start: "2020-10-15T20:36:36.919Z",
        end: "2020-10-15T20:56:36.919Z",
        step: "15s"){
        data{
          resultType
          ... on Matrix{
            result{
              values{
                time
                value
              }
            }
          }
        }
      }
    }
  }
}
```
