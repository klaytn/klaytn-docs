## eth_accounts <a id="eth_accounts"></a>

Trả về danh sách các địa chỉ thuộc sở hữu của khách hàng.

**Tham số**

Không có

**Giá trị Trả về**

| Loại                  | Mô tả                                    |
| --------------------- | ---------------------------------------- |
| Chuỗi DỮ LIỆU 20 byte | Các địa chỉ thuộc sở hữu của khách hàng. |

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

Trả về số dư tài khoản của địa chỉ đã cho.

**Tham số**

| Tên                   | Loại                               | Mô tả                                                                                                                                                                                               |
| --------------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| địa chỉ               | DỮ LIỆU 20 byte                    | Địa chỉ để kiểm tra số dư.                                                                                                                                                                          |
| số chuỗi hoặc hàm băm | SỐ LƯỢNG &#124; THẺ &#124; HÀM BĂM | Số nguyên hoặc số khối thập lục phân hoặc chuỗi `"sớm nhất"`, `"trễ nhất"` hoặc `"đang chờ xử lý"` như trong [tham số khối mặc định](./block.md#the-default-block-parameter), hay hàm băm của khối. |

**Giá trị Trả về**

| Loại     | Mô tả                                   |
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

Trả về mã ở địa chỉ đã cho.

**Tham số**

| Loại                            | Mô tả                                                                                                                                                                                  |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| DỮ LIỆU 20 byte                 | Địa chỉ                                                                                                                                                                                |
| QUANTITY &#124; TAG &#124; HASH | Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"` as in the [default block parameter](./block.md#the-default-block-parameter), or block hash. |

**Return Value**

| Type | Description                      |
| ---- | -------------------------------- |
| DATA | The code from the given address. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getCode","params":["0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b", "0x2"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result":   "0x600160008035811a818181146012578301005b601b6001356025565b8060005260206000f25b600060078202905091905056"
}
```


## eth_getTransactionCount <a id="eth_gettransactioncount"></a>

Returns the number of transactions *sent* from an address.

**Parameters**

| Type                            | Description                                                                                                                                                                            |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 20-byte DATA                    | Address                                                                                                                                                                                |
| QUANTITY &#124; TAG &#124; HASH | Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"` as in the [default block parameter](./block.md#the-default-block-parameter), or block hash. |

**Return Value**

| Type     | Description                                                   |
| -------- | ------------------------------------------------------------- |
| QUANTITY | Integer of the number of transactions send from this address. |

**Example**

 ```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0xc94770007dda54cF92009BFF0dE90c06F603a09f","latest"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0x1" // 1
}
 ```


## eth_sign <a id="eth_sign"></a>

The sign method calculates a Klaytn-specific signature with:
```
sign(keccak256("\x19Klaytn Signed Message:\n" + len(message) + message)))
```

Adding a prefix to the message makes the calculated signature recognizable as a Klaytn-specific signature. This prevents misuse where a malicious dApp signs arbitrary data (e.g. transaction) and uses the signature for impersonation.

**NOTE**: The address to sign with must be unlocked.

**Parameters**

| Name    | Type         | Description     |
| ------- | ------------ | --------------- |
| account | 20-byte DATA | Address         |
| message | N-byte DATA  | Message to sign |

**Return Value**

| Type | Description |
| ---- | ----------- |
| DATA | Signature   |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_sign","params":["0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "0xdeadbeaf"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```