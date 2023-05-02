---
description: >-
  API được sử dụng để truy vấn cấu hình mạng.
---

# Namespace net <a id="namespace-net"></a>

Namespace `net` cung cấp các hàm liên quan đến mạng Klaytn.


## net_networkID <a id="net_networkid"></a>

Trả về mã định danh mạng (ID mạng).

**Tham số**

Không có

**Giá trị Trả về**

| Loại    | Mô tả                                                                                                                                  |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| SỐ LƯỢNG | Số nguyên của số định danh mạng.<br> - `"1001"`: Mạng thử nghiệm Klaytn Baobab.<br> - `"8217"`: Mạng chính Klaytn Cypress. |

**Ví dụ**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"net_networkID","params":[],"id":67}' https://public-en-baobab.klaytn.net

// Result
{
    "jsonrpc":"2.0",
    "id":67,
    "result":"1001"
}
```


## net_listening <a id="net_listening"></a>

Trả về `đúng` nếu máy khách đang tích cực lắng nghe các kết nối mạng.

**Tham số**

Không có

**Giá trị Trả về**

| Loại    | Mô tả                                                 |
| ------- | ----------------------------------------------------- |
| Boolean | `đúng` khi máy khách đang nghe, `sai` nếu không phải. |

**Ví dụ**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":67}' https://public-en-baobab.klaytn.net

// Result
{
    "id":67,
    "jsonrpc":"2.0",
    "result":true
}
```


## net_peerCount <a id="net_peercount"></a>

Trả về số lượng máy ngang hàng hiện đang kết nối với máy khách.

**Tham số**

Không có

**Giá trị Trả về**

| Loại    | Mô tả                                               |
| -------- | --------------------------------------------------- |
| SỐ LƯỢNG | Số nguyên của số lượng máy ngang hàng được kết nối. |

**Ví dụ**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":74}' https://public-en-baobab.klaytn.net

// Result
{
    "id":74,
    "jsonrpc": "2.0",
    "result": "0x3" // 2
}
```

## net_peerCountByType <a id="net_peercountbytype"></a>

Trả về số nút được kết nối theo loại và tổng số nút được kết nối với các cặp khóa/giá trị.

**Tham số**

Không có

**Giá trị Trả về**

| Loại      | Mô tả                                                                                        |
| ---------- | -------------------------------------------------------------------------------------------- |
| Chuỗi JSON | Số lượng máy ngang hàng được kết nối theo loại cũng như tổng số máy ngang hàng được kết nối. |

**Ví dụ**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"net_peerCountByType","params":[],"id":74}' https://public-en-baobab.klaytn.net

// Result
{
    "id":74,
    "jsonrpc": "2.0",
    "result": {"en":3,"pn":2,"total":5}
}
```

## net_version <a id="net_version"></a>

Trả về phiên bản giao thức klaytn hiện tại.

**Tham số**

Không có

**Giá trị Trả về**

| Loại    | Mô tả                                                                                                                                           |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| SỐ LƯỢNG | Số nguyên của phiên bản giao thức klaytn.<br> - `"1001"`: Mạng thử nghiệm Klaytn Baobab.<br> - `"8217"`: Mạng chính Klaytn Cypress. |

**Ví dụ**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}' https://public-en-baobab.klaytn.net
// Result
{
    "jsonrpc":"2.0",
    "id":67,
    "result":"1001"
}
```