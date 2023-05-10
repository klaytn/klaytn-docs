# caver.ipfs <a id="caver-ipfs"></a>

`caver.ipfs` is a package that provides functionality related to IPFS (InterPlanetary File System).

**LƯU Ý** `caver.ipfs` được hỗ trợ kể từ caver-js phiên bản [v1.5.4](https://www.npmjs.com/package/caver-js/v/1.5.4).

## caver.ipfs.setIPFSNode <a id="caver-ipfs-setipfsnode"></a>

```javascript
caver.ipfs.setIPFSNode(host, port, ssl)
```

Khởi tạo kết nối với Nút IPFS. Khi thông tin Nút IPFS được đặt thông qua hàm này, bạn có thể tải tệp lên IPFS hoặc tải tệp từ IPFS.

**Tham số**

| Tên  | Type    | Description                                                                    |
| ---- | ------- | ------------------------------------------------------------------------------ |
| host | string  | The IPFS Node url to connect with.                                             |
| port | number  | The port number to use.                                                        |
| ssl  | boolean | If true, the `https` protocol is used. Otherwise, the `http` protocol is used. |


**Return Value**

None

**Example**

```javascript
> caver.ipfs.setIPFSNode('localhost', 5001, false)
```

## caver.ipfs.add <a id="caver-ipfs-add"></a>

```javascript
caver.ipfs.add(data)
```

Adds a file to IPFS. The [CID(Content Identifier)](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids) of the uploaded file is returned.

If the path of a file is passed, the contents of the file are loaded from the path and uploaded to IPFS. If a buffer is passed, it is uploaded to IPFS directly.

**Parameters**

| Name | Type                                    | Description                                           |
| ---- | --------------------------------------- | ----------------------------------------------------- |
| data | string &#124; Buffer &#124; ArrayBuffer | The path string of a file or a buffer to add to IPFS. |

**NOTE** `Buffer` is supported since caver-js [v1.5.5](https://www.npmjs.com/package/caver-js/v/1.5.5).


**Return Value**

`Promise` returns `string`

| Type   | Description                                                                                                                        |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| string | The [CID(Content Identifier)](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids) of the uploaded file. |

**Example**

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

Returns a file addressed by a valid IPFS path.

**Parameters**

| Name | Type   | Description                                                                                                                          |
| ---- | ------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| hash | string | An [CID(Content Identifier)](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids) of the file to download. |


**Giá trị Trả về**

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

| Tên     | Loại  | Mô tả                                                                                                                   |
| ------- | ----- | ----------------------------------------------------------------------------------------------------------------------- |
| hàm băm | chuỗi | [CID(Định danh nội dung)](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids) để chuyển đổi. |


**Giá trị Trả về**

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

| Tên     | Loại | Mô tả                                                         |
| ------- | ----- | ------------------------------------------------------------- |
| hàm băm | chuỗi | [Multihash](https://multiformats.io/multihash) để chuyển đổi. |


**Giá trị Trả về**

| Loại | Mô tả                                                                                                     |
| ----- | --------------------------------------------------------------------------------------------------------- |
| chuỗi | [CID(Định danh nội dung)](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids). |

**Ví dụ**

```javascript
> caver.ipfs.fromHex('0x1220dc1dbe0bcf1e5f6cce80bd3d7e7d873801c5a1732add889c0f25391d53470dc3')
Qmd9thymMS6mejhEDZfwXPowSDunzgma9ex4ezpCSRZGwC
```
