# Khác <a id="miscellaneous"></a>

## klay_sha3 <a id="klay_sha3"></a>

Trả về Keccak-256 (không phải SHA3-256 đã chuẩn hóa) của dữ liệu đã cho.

**Tham số**

| Tên     | Loại    | Mô tả                                     |
| ------- | ------- | ----------------------------------------- |
| dữ liệu | DỮ LIỆU | Dữ liệu để chuyển đổi thành hàm băm SHA3. |

**Giá trị trả về**

| Loại            | Mô tả                            |
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
