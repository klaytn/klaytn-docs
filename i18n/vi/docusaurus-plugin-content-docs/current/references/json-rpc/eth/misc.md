# Khác

## eth_hashrate <a id="eth_hashrate"></a>

Trả về số lần băm trên mỗi giây mà nút đang khai thác.

Xin lưu ý rằng do Klaytn không có cơ chế PoW (bằng chứng xử lý), giá trị trả về luôn là `0x0`.

**Tham số**

Không có

**Giá trị trả về**

| Loại    | Mô tả                |
| -------- | -------------------- |
| SỐ LƯỢNG | Số lần băm mỗi giây. |

**Ví dụ**

```shell
// Yêu cầu
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_hashrate","params":[],"id":1}' http://localhost:8551

// Kết quả
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0x0"
}
```

## eth_getHashrate <a id="eth_gethashrate"></a>

Trả về số lần băm trên mỗi giây mà nút đang khai thác.

Xin lưu ý rằng do Klaytn không có cơ chế PoW (bằng chứng xử lý), giá trị trả về luôn là `0`.

**Tham số**

Không có

**Giá trị trả về**

| type     | Mô tả                |
| -------- | -------------------- |
| SỐ LƯỢNG | Số lần băm mỗi giây. |

**Ví dụ**

```shell
// Yêu cầu
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getHashrate","params":[],"id":1}' http://localhost:8551

// Kết quả
{
  "jsonrpc": "2.0",
  "id":1,
  "result": 0
}
``

## eth_getWork <a id="eth_getwork"></a>

Trả về mã băm của khối hiện tại, seedHash, và điều kiện biên cần đáp ứng ("mục tiêu").

Xin lưu ý rằng do Klaytn không có cơ chế PoW (bằng chứng xử lý), giá trị trả về luôn là `errNoMiningWork`.

**Tham số**

Không có

**Giá trị trả về**

| Loại                  | Mô tả                                                                                                                   |
|-----------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Mảng DỮ LIỆU 32 byte | Danh sách hàm băm pow, hàm băm bổ sung của tiêu đề khối hiện tại được sử dụng cho DAG, điều kiện biên ("mục tiêu"), 2^256 / độ khó. |

**Ví dụ**

```shell
// Yêu cầu
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getWork","params":[],"id":1}' http://localhost:8551

// Kết quả
{
  "jsonrpc": "2.0",
  "id":1,
  "error": {
    "code": -32000,
    "message": "no mining work available yet"
  }
}
```


## eth_submitWork <a id="eth_submitwork"></a>

Được dùng để gửi giải pháp bằng chứng công việc.

Xin lưu ý rằng do Klaytn không có cơ chế PoW (bằng chứng xử lý), giá trị trả về luôn là `false`.

**Tham số**

| type            | Mô tả                                     |
| --------------- | ----------------------------------------- |
| DỮ LIỆU 8 byte  | Tìm thấy giá trị số dùng một lần (64 bit) |
| DỮ LIỆU 32 byte | Hàm băm pow của tiêu đề (256 bit)         |
| DỮ LIỆU 32 byte | Hàm băm hỗn hợp (256 bit)                 |

**Giá trị trả về**

| Loại                | Mô tả                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------- |
| Kiểu dữ liệu Boolean | Nếu giải pháp cung cấp hợp lệ, giá trị trả về là true, nếu không giá trị sẽ là false. |

**Ví dụ**

```shell
// Yêu cầu
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_submitWork","params":["0x0000000000000001", "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef", "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"],"id":1}' http://localhost:8551

// Kết quả
{
  "jsonrpc": "2.0",
  "id":1,
  "result": false
}
```


## eth_submitHashrate <a id="eth_submithashrate"></a>

Dùng để gửi tốc độ băm khai thác.

Xin lưu ý rằng do Klaytn không có cơ chế PoW (bằng chứng xử lý), giá trị trả về luôn là `false`.

**Tham số**

| Tên      | Loại           | Mô tả                                                                          |
| -------- | --------------- | ------------------------------------------------------------------------------ |
| hashrate | DỮ LIỆU 32 byte | Chuỗi thập lục phân (32 byte) biểu thị tốc độ băm.                             |
| id       | DỮ LIỆU 32 byte | ID ngẫu nhiên dưới dạng chuỗi thập lục phân (32 byte) để định danh khách hàng. |

**Giá trị trả về**

| Loại                | Mô tả                                                                     |
| -------------------- | ------------------------------------------------------------------------- |
| Kiểu dữ liệu Boolean | Kết quả trả về là true nếu gửi thành công, nếu không kết quả sẽ là false. |

**Ví dụ**

```shell
// Yêu cầu
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_submithashrate","params":["0x5", "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"],"id":1}' http://localhost:8551

// Kết quả
{
  "jsonrpc": "2.0",
  "id":1,
  "result": false
}
```


