# Miscellaneous

## klay_sha3

Returns Keccak-256 (not the standardized SHA3-256) of the given data.

**Parameters**

| Name | Type | 설명                                    |
| ---- | ---- | ------------------------------------- |
| data | DATA | The data to convert into a SHA3 hash. |

**Return Value**

| Type         | 설명                                 |
| ------------ | ---------------------------------- |
| 32-byte DATA | The SHA3 result of the given data. |


**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_sha3","params":["0x11223344"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":"0x36712aa4d0dd2f64a9ae6ac09555133a157c74ddf7c079a70c33e8b4bf70dd73"
}
```
