# caver.ipfs

`caver.ipfs` là gói cung cấp chức năng liên quan đến IPFS (InterPlanetary File System).

**LƯU Ý** `caver.ipfs` được hỗ trợ kể từ caver-js phiên bản [v1.5.4](https://www.npmjs.com/package/caver-js/v/1.5.4).

## caver.ipfs.setIPFSNode <a id="caver-ipfs-setipfsnode"></a>

```javascript
caver.ipfs.setIPFSNode(host, port, ssl)
```

Khởi tạo kết nối với Nút IPFS. Khi thông tin Nút IPFS được đặt thông qua hàm này, bạn có thể tải tệp lên IPFS hoặc tải tệp từ IPFS.

**Tham số**

| Tên  | type    | Mô tả                                                                                        |
| ---- | ------- | -------------------------------------------------------------------------------------------- |
| host | chuỗi   | Url Nút IPFS để kết nối.                                                                     |
| port | số      | Số cổng để sử dụng.                                                                          |
| ssl  | boolean | Nếu đúng thì giao thức `https` được sử dụng. Nếu không thì giao thức `http` sẽ được sử dụng. |

**Giá trị trả về**

Không có

**Ví dụ**

```javascript
> caver.ipfs.setIPFSNode('localhost', 5001, false)
```

## caver.ipfs.add <a id="caver-ipfs-add"></a>

```javascript
caver.ipfs.add(data)
```

Thêm tập tin vào IPFS. [CID(Định danh nội dung)](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids) của tệp đã tải lên được trả về.

Nếu đường dẫn của tập tin được thông qua, nội dung của tập tin sẽ được tải từ đường dẫn và được tải lên IPFS. Nếu một bộ đệm được thông qua, nó sẽ được tải trực tiếp lên IPFS.

**Tham số**

| Tên  | Loại                          | Mô tả                                                     |
| ---- | ------------------------------ | --------------------------------------------------------- |
| data | chuỗi \| Bộ đệm \| ArrayBuffer | Chuỗi đường dẫn của tập tin hoặc bộ đệm để thêm vào IPFS. |

**LƯU Ý** `Buffer` được hỗ trợ kể từ caver-js phiên bản [v1.5.5](https://www.npmjs.com/package/caver-js/v/1.5.5).

**Giá trị trả về**

`Promise` trả về `string`

| Loại | Mô tả                                                                                                                                               |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| chuỗi | [CID(Định danh nội dung)](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids) của tập tin đã tải lên. |

**Ví dụ**

```javascript
// Adds a file with path string.
> caver.ipfs.add('./test.txt')
Qmd9thymMS6mejhEDZfwXPowSDunzgma9ex4ezpCSRZGwC

// Adds a file with Buffer containing the contents of the file.
> caver.ipfs.add(Buffer.from('test data'))
QmWmsL95CYvci8JiortAMhezezr8BhAwAVohVUSJBcZcBL
```

## caver.ipfs.get <a id="caver-ipfs-get"></a>

```javascript
caver.ipfs.get(hash)
```

Trả về tập tin được xử lý bằng đường dẫn IPFS hợp lệ.

**Tham số**

| Tên  | Loại | Mô tả                                                                                                                                             |
| ---- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| hash | chuỗi | [CID(Định danh nội dung)](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids) của tệp để tải xuống. |

**Giá trị trả về**

`Promise` trả về `Bộ đệm`

| Loại  | Mô tả                 |
| ------ | --------------------- |
| Bộ đệm | Nội dung của tệp tin. |

**Ví dụ**

```javascript
> caver.ipfs.get('Qmd9thymMS6mejhEDZfwXPowSDunzgma9ex4ezpCSRZGwC')
<Buffer 74 65 73 74 20 64 61 74 61 20 66 6f 72 20 49 50 46 53>
```

## caver.ipfs.toHex <a id="caver-ipfs-tohex"></a>

```javascript
caver.ipfs.toHex(hash)
```

Chuyển đổi [CID(Định danh nội dung)](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids) thành [Multihash](https://multiformats.io/multihash).

**Tham số**

| Tên  | type  | Mô tả                                                                                                                                      |
| ---- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| hash | chuỗi | [CID(Định danh nội dung)](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids) để chuyển đổi. |

**Giá trị trả về**

| Loại | Mô tả                                                 |
| ----- | ----------------------------------------------------- |
| chuỗi | Chuỗi [Multihash](https://multiformats.io/multihash). |

**Ví dụ**

```javascript
> caver.ipfs.toHex('Qmd9thymMS6mejhEDZfwXPowSDunzgma9ex4ezpCSRZGwC')
0x1220dc1dbe0bcf1e5f6cce80bd3d7e7d873801c5a1732add889c0f25391d53470dc3
```

## caver.ipfs.fromHex <a id="caver-ipfs-fromhex"></a>

```javascript
caver.ipfs.fromHex(hash)
```

Chuyển đổi thành [CID(Định danh nội dung)](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids) từ [Multihash](https://multiformats.io/multihash).

**Tham số**

| Tên  | Loại | Mô tả                                                         |
| ---- | ----- | ------------------------------------------------------------- |
| hash | chuỗi | [Multihash](https://multiformats.io/multihash) để chuyển đổi. |

**Giá trị trả về**

| Loại | Mô tả                                                                                                                        |
| ----- | ---------------------------------------------------------------------------------------------------------------------------- |
| chuỗi | [CID(Định danh nội dung)](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids). |

**Ví dụ**

```javascript
> caver.ipfs.fromHex('0x1220dc1dbe0bcf1e5f6cce80bd3d7e7d873801c5a1732add889c0f25391d53470dc3')
Qmd9thymMS6mejhEDZfwXPowSDunzgma9ex4ezpCSRZGwC
```
