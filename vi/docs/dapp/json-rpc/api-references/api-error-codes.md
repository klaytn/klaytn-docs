---
- >-

- Mã lỗi API
---

# Mã Lỗi API <a id="api-error-codes"></a>

Klaytn cung cấp trường `lỗi` trong phản hồi API để cung cấp thêm thông tin cho nhà phát triển về lý do triển khai API không thành công. Trường này chỉ tồn tại nếu quá trình triển khai API không thành công. Trường này chứa `mã lỗi` và `thông báo lỗi`.

Phản hồi ví dụ
```
{
 "jsonrpc":"2.0",
 "id":83,
 "error":{
    "code":-32602,
    "message":"invalid argument 0: hex string without 0x prefix"
 }
}
```

---
Lỗi HTTP
> **LƯU Ý**
> 
> Chỉ các lỗi HTTP được trả về rõ ràng trên Klaytn mới được liệt kê. Vui lòng tham khảo [**Kho lưu trữ FastHTTP**](https://github.com/valyala/fasthttp/blob/5d73da31aed12047d2625e86bf405a0cd1f77f2b/status.go) để biết tất cả các mã trạng thái.

| Mã trạng thái | Lỗi                         | Ví dụ Tin nhắn                                         |
|:------------- |:--------------------------- |:------------------------------------------------------ |
| 403           | StatusForbidden             | "máy chủ được chỉ định không hợp lệ"                   |
| 404           | StatusNotFound              | "404 không tìm thấy trang"                             |
| 405           | StatusMethodNotAllowed      | "phương thức không được phép"                          |
| 413           | StatusRequestEntityTooLarge | "độ dài nội dung quá lớn n > 524288"                   |
| 415           | StatusUnsupportedMediaType  | "loại nội dung không hợp lệ, chỉ hỗ trợ ứng dụng/json" |

---

Lỗi JSON-RPC tiêu chuẩn

> **LƯU Ý**
> 
> Mặc dù có nhiều loại lỗi khác nhau đối với mỗi mã trạng thái, nhưng chỉ một trong số chúng được viết để phục vụ mục đích vắn tắt.

| Mã Lỗi | Lỗi                      | Ví dụ Tin nhắn                                                                          |
|:------ |:------------------------ |:--------------------------------------------------------------------------------------- |
| -32000 | WSRPCNotRunningError     | "WebSocket RPC không chạy"                                                              |
|        | InvalidNodeIdError       | "kni không hợp lệ: ID nút không hợp lệ (sai độ dài, cần có 128 ký tự hex)"              |
|        | BlockNotFoundError       | "không tìm thấy khối số 1"                                                              |
|        | BlockNotExistError       | "khối không tồn tại (số khối: 1)"                                                       |
|        | BlockDoesNotExistError   | "khối không tồn tại (mã băm khối: 0xf...f)"                                             |
|        | UnknownAccountError      | "tài khoản không xác định"                                                              |
|        | TransactionNotFoundError | "không tìm thấy giao dịch 0xf...f"                                                      |
|        | ShutDownError            | "máy chủ đã bị tắt"                                                                     |
| -32600 | InvalidRequestError      | "yêu cầu máy chủ vượt quá giới hạn"                                                     |
| -32601 | MethodNotFoundError      | "Phương thức không tồn tại/không khả dụng"                                              |
| -32602 | InvalidParamsError       | "thiếu giá trị cho đối số bắt buộc 0"                                                   |
|        |                          | "đối số 0 không hợp lệ: chuỗi hex không có tiền tố 0x"                                  |
|        |                          | "đối số không hợp lệ 0: json: không thể sắp xếp chuỗi thành giá trị Go của loại uint64" |
| 32700  | InvalidMessageError      | "đầu vào JSON kết thúc ngoài dự kiến"                                                   |
