# caver.rpc.net

`caver.rpc.net` cung cấp lệnh gọi JSON-RPC với không gian tên `net`.

## caver.rpc.net.getNetworkId <a id="caver-rpc-net-getnetworkid"></a>

```javascript
caver.rpc.net.getNetworkId([callback])
```

Trả về mã định danh mạng (ID mạng) của Nút Klaytn.

**Tham số**

| Tên      | type | Mô tả                                                                                                          |
| -------- | ---- | -------------------------------------------------------------------------------------------------------------- |
| callback | hàm  | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |


**Giá trị trả về**

`Promise` trả về `số`

| type | Mô tả    |
| ---- | -------- |
| số   | Id mạng. |

**Ví dụ**

```javascript
> caver.rpc.net.getNetworkId().then(console.log)
1001
```

## caver.rpc.net.isListening <a id="caver-rpc-net-islistening"></a>

```javascript
caver.rpc.net.isListening([callback])
```

Trả về `true` nếu Nút Klaytn đang lắng nghe các kết nối mạng.

**Tham số**

| Tên      | type | Mô tả                                                                                                          |
| -------- | ---- | -------------------------------------------------------------------------------------------------------------- |
| callback | hàm  | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |


**Giá trị trả về**

`Promise` trả về `boolean`

| Loại   | Mô tả                                                    |
| ------- | -------------------------------------------------------- |
| boolean | `true` khi máy khách đang nghe, ngược lại sẽ là `false`. |

**Ví dụ**

```javascript
> caver.rpc.net.isListening().then(console.log)
true
```

## caver.rpc.net.getPeerCount <a id="caver-rpc-net-getpeercount"></a>

```javascript
caver.rpc.net.getPeerCount([callback])
```

Trả về số lượng máy ngang hàng hiện đang kết nối với Nút Klaytn.

**Tham số**

| Tên      | Loại | Mô tả                                                                                                          |
| -------- | ----- | -------------------------------------------------------------------------------------------------------------- |
| callback | hàm   | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |


**Giá trị trả về**

`Promise` trả về `chuỗi`

| Loại | Mô tả                                          |
| ----- | ---------------------------------------------- |
| chuỗi | Số lượng máy ngang hàng được kết nối dạng hex. |

**Ví dụ**

```javascript
> caver.rpc.net.getPeerCount().then(console.log)
0x3
```

## caver.rpc.net.getPeerCountByType <a id="caver-rpc-net-getpeercountbytype"></a>

```javascript
caver.rpc.net.getPeerCountByType([callback])
```

Trả về số nút được kết nối theo loại và tổng số nút được kết nối với các cặp khóa/giá trị.

**Tham số**

| Tên      | Loại | Mô tả                                                                                                          |
| -------- | ----- | -------------------------------------------------------------------------------------------------------------- |
| callback | hàm   | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |


**Giá trị trả về**

`Promise` trả về `đối tượng`

| Loại     | Mô tả                                                                                        |
| --------- | -------------------------------------------------------------------------------------------- |
| đối tượng | Số lượng máy ngang hàng được kết nối theo loại cũng như tổng số máy ngang hàng được kết nối. |

**Ví dụ**

```javascript
> caver.rpc.net.getPeerCountByType().then(console.log)
{ en: 1, pn: 2, total: 3 }
```