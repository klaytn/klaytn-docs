## eth_coinbase <a id="eth_coinbase"></a>

Trả về địa chỉ coinbase khách hàng.

**Tham số**

Không có

**Giá trị trả về**

| Loại            | Mô tả                        |
| --------------- | ---------------------------- |
| DỮ LIỆU 20 byte | Địa chỉ coinbase khách hàng. |

**Ví dụ**

```shell
// Yêu cầu
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_coinbase","params":[],"id":1}' http://localhost:8551

// Kết quả
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0xc94770007dda54cF92009BFF0dE90c06F603a09f"
}
```


## eth_etherbase <a id="eth_etherbase"></a>

Trả về địa chỉ etherbase khách hàng.

**Tham số**

Không có

**Giá trị trả về**

| Loại           | Mô tả                         |
| --------------- | ----------------------------- |
| DỮ LIỆU 20 byte | Địa chỉ etherbase khách hàng. |

**Ví dụ**

```shell
// Yêu cầu
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_etherbase","params":[],"id":1}' http://localhost:8551

// Kết quả
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0xc94770007dda54cF92009BFF0dE90c06F603a09f"
}
```


## eth_chainId <a id="eth_chainid"></a>

Trả về mã chuỗi hiện tại được đặt trên nút yêu cầu.

**Tham số**

Không có

**Giá trị trả về**

| Loại     | Mô tả                               |
| -------- | ----------------------------------- |
| SỐ LƯỢNG | Mã chuỗi được đặt trên nút yêu cầu. |

**Ví dụ**

```shell
// Yêu cầu
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}' http://localhost:8551

// Kết quả
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0x2019"
}
```


## eth_gasPrice <a id="eth_gasprice"></a>

Trả về mức giá hiện tại cho mỗi gas tính bằng peb.

**LƯU Ý**: API này có hành vi khác với hành vi của Ethereum và trả về giá gas của Klaytn thay vì đề xuất giá gas như trong Ethereum.

**Tham số**

Không có

**Giá trị trả về**

| Loại     | Mô tả                                         |
| -------- | --------------------------------------------- |
| SỐ LƯỢNG | Số nguyên chỉ giá gas hiện tại tính bằng peb. |

**Ví dụ**

```shell
// Yêu cầu
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":1}' http://localhost:8551

// Kết quả
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0xAE9F7BCC00" // 250,000,000,000 peb = 250 ston (Gwei)
}
```
