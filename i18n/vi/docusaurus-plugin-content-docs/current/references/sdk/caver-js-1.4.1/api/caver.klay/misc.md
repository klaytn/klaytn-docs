# Linh tinh

## sha3 <a id="sha3"></a>

```javascript
caver.klay.sha3(data[, callback])
```

Trả về hàm băm Keccak-256 (không phải là hàm băm SHA3-256 chuẩn hóa) của dữ liệu đã cho.

**Tham số**

| Tên      | type  | Mô tả                                                                                                                              |
| -------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------- |
| data     | Chuỗi | Dữ liệu cần chuyển đổi thành hàm băm SHA3.                                                                                         |
| callback | Hàm   | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `String` - Kết quả SHA3 của dữ liệu đã cho.

**Ví dụ**

```javascript
> caver.klay.sha3("0x11223344").then(console.log);
0x36712aa4d0dd2f64a9ae6ac09555133a157c74ddf7c079a70c33e8b4bf70dd73
```
