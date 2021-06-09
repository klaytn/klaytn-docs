# caver.ipfs <a id="caver-ipfs"></a>

`caver.ipfs` is a package that provides functionality related to IPFS (InterPlanetary File System).

**NOTE** `caver.ipfs` is supported since caver-js [v1.5.4](https://www.npmjs.com/package/caver-js/v/1.5.4).

## caver.ipfs.setIPFSNode <a id="caver-ipfs-setipfsnode"></a>

```javascript
caver.ipfs.setIPFSNode(host, port, ssl)
```

Initializes a connection with an IPFS Node. When an IPFS Node information is set through this function, you can upload files to IPFS or load files from IPFS.

**매개변수**

| 명칭   | 타입      | 설명                                                                             |
| ---- | ------- | ------------------------------------------------------------------------------ |
| host | string  | The IPFS Node url to connect with.                                             |
| port | number  | The port number to use.                                                        |
| ssl  | boolean | If true, the `https` protocol is used. Otherwise, the `http` protocol is used. |


**리턴값**

없음

**예시**

```javascript
> caver.ipfs.setIPFSNode('localhost', 5001, false)
```

## caver.ipfs.add <a id="caver-ipfs-add"></a>

```javascript
caver.ipfs.add(data)
```

Adds a file to IPFS. The [CID(Content Identifier)](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids) of the uploaded file is returned.

If the path of a file is passed, the contents of the file are loaded from the path and uploaded to IPFS. If a buffer is passed, it is uploaded to IPFS directly.

**매개변수**

| 명칭   | 타입                                      | 설명                                                    |
| ---- | --------------------------------------- | ----------------------------------------------------- |
| data | string &#124; Buffer &#124; ArrayBuffer | The path string of a file or a buffer to add to IPFS. |

**NOTE** `Buffer` is supported since caver-js [v1.5.5](https://www.npmjs.com/package/caver-js/v/1.5.5).


**리턴값**

`Promise`는 `string`을 반환합니다.

| 타입     | 설명                                                                                                                                 |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| string | The [CID(Content Identifier)](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids) of the uploaded file. |

**예시**

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

**매개변수**

| 명칭 | 타입     | 설명                                                                                                                                   |
| -- | ------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| 해시 | string | An [CID(Content Identifier)](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids) of the file to download. |


**리턴값**

`Promise` returns `Buffer`

| 타입     | 설명                       |
| ------ | ------------------------ |
| Buffer | The content of the file. |

**예시**

```javascript
> caver.ipfs.get('Qmd9thymMS6mejhEDZfwXPowSDunzgma9ex4ezpCSRZGwC')
<Buffer 74 65 73 74 20 64 61 74 61 20 66 6f 72 20 49 50 46 53>
```

## caver.ipfs.toHex <a id="caver-ipfs-tohex"></a>

```javascript
caver.ipfs.toHex(hash)
```

Converts a [CID(Content Identifier)](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids) to a [Multihash](https://multiformats.io/multihash).

**매개변수**

| 명칭 | 타입     | 설명                                                                                                                     |
| -- | ------ | ---------------------------------------------------------------------------------------------------------------------- |
| 해시 | string | A [CID(Content Identifier)](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids) to convert. |


**리턴값**

| 타입     | 설명                                                         |
| ------ | ---------------------------------------------------------- |
| string | The [Multihash](https://multiformats.io/multihash) string. |

**예시**

```javascript
> caver.ipfs.toHex('Qmd9thymMS6mejhEDZfwXPowSDunzgma9ex4ezpCSRZGwC')
0x1220dc1dbe0bcf1e5f6cce80bd3d7e7d873801c5a1732add889c0f25391d53470dc3
```

## caver.ipfs.fromHex <a id="caver-ipfs-fromhex"></a>

```javascript
caver.ipfs.fromHex(hash)
```

Converts to [CID(Content Identifier)](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids) from a [Multihash](https://multiformats.io/multihash).

**매개변수**

| 명칭 | 타입     | 설명                                                           |
| -- | ------ | ------------------------------------------------------------ |
| 해시 | string | A [Multihash](https://multiformats.io/multihash) to convert. |


**리턴값**

| 타입     | 설명                                                                                                            |
| ------ | ------------------------------------------------------------------------------------------------------------- |
| string | The [CID(Content Identifier)](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids). |

**예시**

```javascript
> caver.ipfs.fromHex('0x1220dc1dbe0bcf1e5f6cce80bd3d7e7d873801c5a1732add889c0f25391d53470dc3')
Qmd9thymMS6mejhEDZfwXPowSDunzgma9ex4ezpCSRZGwC
```
