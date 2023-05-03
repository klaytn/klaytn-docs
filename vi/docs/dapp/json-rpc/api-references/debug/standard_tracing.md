# Theo dõi tiêu chuẩn VM <a id="vm-standard-tracing"></a>

## debug_standardTraceBadBlockToFile <a id="debug_standardtracebadblocktofile"></a>

Tương tự như [debug_traceBadBlock](./tracing.md#debug_tracebadblock), `standardTraceBadBlockToFile` chấp nhận mã băm khối hỏng và sẽ phát lại khối hỏng. Nó trả về một danh sách các tên tệp có chứa kết quả theo dõi. Lưu ý rằng các tệp sẽ được lưu trữ trong máy phục vụ API này.


|    Máy khách    | Gọi Phương thức                                                         |
|:---------------:| ----------------------------------------------------------------------- |
| Bảng điều khiển | `debug.standardTraceBadBlockToFile(hash, [options])`                    |
|       RPC       | `{"method": "debug_standardTraceBadBlockToFile", "params": [hash, {}]}` |

**Tham số**

| Tên      | Loại           | Mô tả                                                              |
| -------- | --------------- | ------------------------------------------------------------------ |
| mã băm   | DỮ LIỆU 32-byte | Hàm băm của một khối.                                              |
| tùy chọn | đối tượng       | Xem [các tùy chọn theo dõi tiêu chuẩn](#standard-tracing-options). |

**Giá trị Trả về**

| Loại     | Mô tả                                                                                                                                                                                                                                       |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mảng JSON | Một danh sách các tên tệp tin. Mỗi tên đại diện cho một kết quả theo dõi của một giao dịch. Định dạng của tên tệp là `block_{first 4 bytes of the block hash}-{transaction index}-{first 4 bytes of the transaction hash}-{random string}`. |

**Ví dụ**

Bảng điều khiển
```javascript
> debug.standardTraceBadBlockToFile("0x1d5ba00e313a81ae6d409d459c153327072665d9ea2f47608369722baf0cfbb6")
["/var/folders/v9/z3vq7j4d42b2jq_vxsv0km6h0000gn/T/block_0x1d5ba00e-0-0xae6f8ed4-701973544", "/var/folders/v9/z3vq7j4d42b2jq_vxsv0km6h0000gn/T/block_0x1d5ba00e-1-0x2e37321f-918920039"]
```

HTTP RPC
```shell
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_standardTraceBadBlockToFile","params":["0x1d5ba00e313a81ae6d409d459c153327072665d9ea2f47608369722baf0cfbb6"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":["/var/folders/v9/z3vq7j4d42b2jq_vxsv0km6h0000gn/T/block_0x1d5ba00e-0-0xae6f8ed4-608268252","/var/folders/v9/z3vq7j4d42b2jq_vxsv0km6h0000gn/T/block_0x1d5ba00e-1-0x2e37321f-315574667"]}
```


## debug_standardTraceBlockToFile <a id="debug_standardtraceblocktofile"></a>

Tương tự như [debug_traceBlock](./tracing.md#debug_traceblock), `standardTraceBlockToFile` chấp nhận một hàm băm khối và sẽ phát lại khối đã có trong cơ sở dữ liệu. Nó trả về một danh sách các tên tệp có chứa kết quả theo dõi. Lưu ý rằng các tệp sẽ được lưu trữ trong máy phục vụ API này.

|    Máy khách    | Gọi Phương thức                                                      |
|:---------------:| -------------------------------------------------------------------- |
| Bảng điều khiển | `debug.standardTraceBlockToFile(hash, [options])`                    |
|       RPC       | `{"method": "debug_standardTraceBlockToFile", "params": [hash, {}]}` |

**Tham số**

| Tên      | Loại            | Mô tả                                                              |
| -------- | --------------- | ------------------------------------------------------------------ |
| hàm băm  | DỮ LIỆU 32-byte | Hàm băm của một khối.                                              |
| tùy chọn | đối tượng       | Xem [các tùy chọn theo dõi tiêu chuẩn](#standard-tracing-options). |

**Giá trị Trả về**

| Loại     | Mô tả                                                                                                                                                                                                                                       |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mảng JSON | Một danh sách các tên tệp tin. Mỗi tên đại diện cho một kết quả theo dõi của một giao dịch. Định dạng của tên tệp là `block_{first 4 bytes of the block hash}-{transaction index}-{first 4 bytes of the transaction hash}-{random string}`. |

**Ví dụ**

Bảng điều khiển
```javascript
> debug.standardTraceBlockToFile("0x485fff444481ee28debe50639f312f44e0a09342161a8906a99cf325cc2512a4")
["/var/folders/v9/z3vq7j4d42b2jq_vxsv0km6h0000gn/T/block_0x485fff44-0-0xfe8210fc-141224302"]
```

HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_standardTraceBlockToFile","params":["0x485fff444481ee28debe50639f312f44e0a09342161a8906a99cf325cc2512a4"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":["/var/folders/v9/z3vq7j4d42b2jq_vxsv0km6h0000gn/T/block_0x485fff44-0-0xfe8210fc-288181237"]}
```


## Tùy chọn Theo dõi Tiêu chuẩn <a id="standard-tracing-options"></a>

Bạn có thể cung cấp cho chức năng API theo dõi một đối số tùy chọn phụ, chỉ định các tùy chọn cho lệnh gọi cụ thể này. Các tùy chọn khả thi là:

- `disableStorage`: `BOOL`. Đặt nó thành true sẽ vô hiệu hóa tính năng thu thập lưu trữ (mặc định = false).
- `disableMemory`: `BOOL`. Đặt nó thành true sẽ vô hiệu hóa tính năng thu thập bộ nhớ (mặc định = false).
- `disableStack`: `BOOL`. Đặt nó thành true sẽ vô hiệu hóa tính năng thu thập stack (mặc định = false).
- `txHash`: `chuỗi`. Đặt giá trị này sẽ chỉ theo dõi giao dịch được chỉ định.


