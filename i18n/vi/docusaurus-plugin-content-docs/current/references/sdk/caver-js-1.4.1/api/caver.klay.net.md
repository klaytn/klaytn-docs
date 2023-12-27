---
description: >-
  Trình bao JavaScript cho API Klaytn xung quanh không gian tên 'net'.

---

# caver.klay.net

Gói `caver-klay-net` cho phép bạn tương tác với thuộc tính mạng của các nút Klaytn.

```javascript
var Net = require('caver-klay-net');

// "Personal.providers.givenProvider" sẽ được đặt nếu trong trình duyệt được Klaytn hỗ trợ.
var net = new Net(Net.givenProvider || 'ws://some.local-or-remote.node:8552');

// hoặc sử dụng gói caver
var Caver = require('caver');
var caver = new Caver(Caver.givenProvider || 'ws://some.local-or-remote.node:8552');
// -> caver.klay.net
```


## getId <a id="getid"></a>

```javascript
caver.klay.net.getId([callback])
```

Nhận ID mạng hiện tại.

**Tham số**

| Tên      | type | Mô tả                                                                                                          |
| -------- | ---- | -------------------------------------------------------------------------------------------------------------- |
| callback | Hàm  | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `Số` - ID mạng.

**Ví dụ**

```javascript
> caver.klay.net.getId().then(console.log);
1000
```


## isListening <a id="islistening"></a>

```javascript
caver.klay.net.isListening([callback])
```

Kiểm tra xem nút có đang nghe các nút ngang hàng hay không.

**Tham số**

| Tên      | Loại | Mô tả                                                                                                          |
| -------- | ----- | -------------------------------------------------------------------------------------------------------------- |
| callback | Hàm   | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `Boolean` - `true` nếu nút đang lắng nghe nút ngang hàng, ngược lại sẽ là `false`.

**Ví dụ**

```javascript
> caver.klay.net.isListening().then(console.log);
true
```


## getPeerCount <a id="getpeercount"></a>

```javascript
caver.klay.net.getPeerCount([callback])
```

Nhận số lượng các nút ngang hàng được kết nối đến.

**Tham số**

| Tên      | type | Mô tả                                                                                                          |
| -------- | ---- | -------------------------------------------------------------------------------------------------------------- |
| callback | Hàm  | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `Số` - Số lượng nút ngang hàng được kết nối đến.

**Ví dụ**

```javascript
> caver.klay.net.getPeerCount().then(console.log);
10
```

## peerCountByType <a id="peercountbytype"></a>

```javascript
caver.klay.net.peerCountByType([callback])
```

Trả về số nút được kết nối theo loại và tổng số nút được kết nối với các cặp khóa/giá trị.

**Tham số**

| Tên      | Loại | Mô tả                                                                                                          |
| -------- | ----- | -------------------------------------------------------------------------------------------------------------- |
| callback | Hàm   | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `Đối tượng` - Số lượng nút ngang hàng được kết nối theo loại cũng như tổng số nút ngang hàng được kết nối.

**Ví dụ**

```javascript
> caver.klay.net.peerCountByType().then(console.log);
{ en: 1, pn: 2, total: 3 }
```
