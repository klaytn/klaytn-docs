# Miscellaneous <a id="miscellaneous"></a>

## klay_sha3 <a id="klay_sha3"></a>

Returns Keccak-256 (not the standardized SHA3-256) of the given data.

**Parameters**

| Name | Type | Description                           |
| ---- | ---- | ------------------------------------- |
| data | DATA | The data to convert into a SHA3 hash. |

**Return Value**

| Type            | Mô tả                            |
| --------------- | -------------------------------- |
| DỮ LIỆU 32 byte | Kết quả SHA3 của dữ liệu đã cho. |


**Ví dụ**

```shell
// Yêu cầu
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_sha3","params":["0x11223344"],"id":1}' https://public-en-baobab.klaytn.net

// Kết quả
{
  "jsonrpc":"2.0",
  "id":1,
  "result":"0x36712aa4d0dd2f64a9ae6ac09555133a157c74ddf7c079a70c33e8b4bf70dd73"
}
```
