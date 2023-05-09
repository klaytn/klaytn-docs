## eth_accounts <a id="eth_accounts"></a>

Trả về danh sách các địa chỉ thuộc sở hữu của khách hàng.

**Tham số**

Không có

**Giá trị trả về**

| Loại                 | Mô tả                                    |
| -------------------- | ---------------------------------------- |
| Mảng DỮ LIỆU 20 byte | Các địa chỉ thuộc sở hữu của khách hàng. |

**Ví dụ**

```shell
// Yêu cầu
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}' http://localhost:8551

// Kết quả
{
  "jsonrpc": "2.0",
  "id":1,
  "result": ["0xc94770007dda54cF92009BFF0dE90c06F603a09f"]
}
```


## eth_getBalance <a id="eth_getbalance"></a>

Trả về số dư tài khoản của địa chỉ đã cung cấp.

**Tham số**

| Tên                  | Loại                               | Mô tả                                                                                                                                                                                         |
| -------------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| địa chỉ              | DỮ LIỆU 20 byte                    | Địa chỉ để kiểm tra số dư.                                                                                                                                                                    |
| số khối hoặc hàm băm | SỐ LƯỢNG &#124; THẺ &#124; HÀM BĂM | Số khối là số nguyên hoặc thập lục phân hay chuỗi `"earliest"`, `"latest"` hoặc `"pending"` như trong [tham số khối mặc định ](./block.md#the-default-block-parameter) hoặc hàm băm của khối. |

**Giá trị trả về**

| Kiểu     | Mô tả                                   |
| -------- | --------------------------------------- |
| SỐ LƯỢNG | Số nguyên của số dư hiện tại trong peb. |

**Ví dụ**

```shell
// Yêu cầu
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0xc94770007dda54cF92009BFF0dE90c06F603a09f", "latest"],"id":1}' http://localhost:8551

// Kết quả
{
  "jsonrpc": "2.0","id":1,
  "result": "0x0234c8a3397aab58" // 158972490234375000
}
```


## eth_getCode <a id="eth_getcode"></a>

Trả về mã ở địa chỉ đã cấp.

**Tham số**

| Loại                              | Mô tả                                                                                                                                                                                         |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| DỮ LIỆU 20 byte                   | Địa chỉ                                                                                                                                                                                       |
| SỐ LƯỢNG &#124; THẺ &#124; MÃ BĂM | Số khối là số nguyên hoặc thập lục phân hay chuỗi `"earliest"`, `"latest"` hoặc `"pending"` như trong [tham số khối mặc định ](./block.md#the-default-block-parameter) hoặc hàm băm của khối. |

**Giá trị trả về**

| Loại   | Mô tả                 |
| ------- | --------------------- |
| DỮ LIỆU | Mã từ địa chỉ đã cho. |

**Ví dụ**

```shell
// Yêu cầu
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getCode","params":["0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b", "0x2"],"id":1}' http://localhost:8551

// Kết quả
{
  "jsonrpc": "2.0",
  "id":1,
  "result":   "0x600160008035811a818181146012578301005b601b6001356025565b8060005260206000f25b600060078202905091905056"
}
```


## eth_getTransactionCount <a id="eth_gettransactioncount"></a>

Trả về số lượng giao dịch *đã gửi* từ một địa chỉ.

**Tham số**

| Loại                              | Mô tả                                                                                                                                                                                         |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| DỮ LIỆU 20 byte                    | Địa chỉ                                                                                                                                                                                       |
| SỐ LƯỢNG &#124; THẺ &#124; HÀM BĂM | Số khối là số nguyên hoặc thập lục phân hay chuỗi `"earliest"`, `"latest"` hoặc `"pending"` như trong [tham số khối mặc định ](./block.md#the-default-block-parameter) hoặc hàm băm của khối. |

**Giá trị trả về**

| Loại     | Mô tả                                                     |
| -------- | --------------------------------------------------------- |
| SỐ LƯỢNG | Giá trị nguyên của số lượng giao dịch gửi từ địa chỉ này. |

**Ví dụ**

 ```shell
// Yêu cầu
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0xc94770007dda54cF92009BFF0dE90c06F603a09f","latest"],"id":1}' http://localhost:8551

// Kết quả
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0x1" // 1
}
 ```


## eth_sign <a id="eth_sign"></a>

Phương thức ký tính chữ ký dành riêng cho Klaytn bằng hàm:
```
sign(keccak256("\x19Klaytn Signed Message:\n" + len(message) + message)))
```

Thêm tiền tố vào thông điệp giúp chữ ký đã tính có thể được nhận dạng là chữ ký dành riêng cho Klaytn. Việc này giúp ngăn chặn việc dùng một dApp (ứng dụng phi tập trung) độc hại để ký dữ liệu tùy ý (ví dụ: giao dịch) và sử dụng chữ ký để mạo danh.

**LƯU Ý**: Địa chỉ để ký phải ở trạng thái mở khóa.

**Tham số**

| Tên        | Loại           | Mô tả             |
| ---------- | --------------- | ----------------- |
| tài khoản  | DỮ LIỆU 20 byte | Địa chỉ           |
| thông điệp | DỮ LIỆU N byte  | Thông điệp cần ký |

**Giá trị trả về**

| Loại    | Mô tả  |
| ------- | ------ |
| DỮ LIỆU | Chữ ký |

**Ví dụ**

```shell
// Yêu cầu
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_sign","params":["0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "0xdeadbeaf"],"id":1}' http://localhost:8551

// Kết quả
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```