# caver.ipfs

`caver.ipfs`는 IPFS(행성 간 파일 시스템)와 관련된 기능을 제공하는 패키지입니다.

**참고** `caver.ipfs`는 caver-js [v1.5.4](https://www.npmjs.com/package/caver-js/v/1.5.4) 부터 지원됩니다.

## caver.ipfs.setIPFSNode <a id="caver-ipfs-setipfsnode"></a>

```javascript
caver.ipfs.setIPFSNode(host, port, ssl)
```

IPFS 노드와의 연결을 초기화합니다. 이 기능을 통해 IPFS 노드 정보가 설정되면, IPFS에 파일을 업로드하거나 IPFS에서 파일을 로드할 수 있습니다.

**매개변수**

| 이름   | 유형      | 설명                                                      |
| ---- | ------- | ------------------------------------------------------- |
| host | string  | 연결할 IPFS 노드 URL입니다.                                     |
| port | Number  | 사용할 포트 번호입니다.                                           |
| ssl  | boolean | true이면 `https` 프로토콜이 사용됩니다. 그렇지 않으면 `http` 프로토콜이 사용됩니다. |

**리턴 값**

없음

**예시**

```javascript
> caver.ipfs.setIPFSNode('localhost', 5001, false)
```

## caver.ipfs.add <a id="caver-ipfs-add"></a>

```javascript
caver.ipfs.add(data)
```

IPFS에 파일을 추가합니다. 업로드한 파일의 [CID(콘텐츠 식별자)](https://multiformats.io/multihash)가 반환됩니다.

파일 경로가 전달되면 해당 경로에서 파일 내용을 로드하여 IPFS에 업로드합니다. 버퍼가 전달되면 버퍼가 IPFS에 직접 업로드됩니다.

**매개변수**

| 이름   | 유형                              | 설명                             |
| ---- | ------------------------------- | ------------------------------ |
| data | string \| Buffer \| ArrayBuffer | IPFS에 추가할 파일 또는 버퍼의 경로 문자열입니다. |

**참고** `Buffer`는 caver-js [v1.5.5](https://www.npmjs.com/package/caver-js/v/1.5.5) 부터 지원됩니다.

**리턴 값**

`Promise`는 `string`을 반환합니다.

| 유형     | 설명                                                                                |
| ------ | --------------------------------------------------------------------------------- |
| string | 업로드한 파일의 [CID(콘텐츠 식별자)](https://multiformats.io/multihash)입니다. |

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

유효한 IPFS 경로로 주소가 지정된 파일을 반환합니다.

**매개변수**

| 이름   | 유형     | 설명                                                                                 |
| ---- | ------ | ---------------------------------------------------------------------------------- |
| hash | string | 다운로드할 파일의 [CID(콘텐츠 식별자)](https://multiformats.io/multihash)입니다. |

**리턴 값**

`Promise`는 `Buffer`를 반환합니다.

| 유형     | 설명        |
| ------ | --------- |
| Buffer | 파일 내용입니다. |

**예시**

```javascript
> caver.ipfs.get('Qmd9thymMS6mejhEDZfwXPowSDunzgma9ex4ezpCSRZGwC')
<Buffer 74 65 73 74 20 64 61 74 61 20 66 6f 72 20 49 50 46 53>
```

## caver.ipfs.toHex <a id="caver-ipfs-tohex"></a>

```javascript
caver.ipfs.toHex(hash)
```

[CID(콘텐츠 식별자)](https://multiformats.io/multihash)를 [Multihash](https://multiformats.io/multihash)로 변환합니다.

**매개변수**

| 이름   | 유형     | 설명                                                                                                                                        |
| ---- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| hash | string | A [CID(Content Identifier)](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids) to convert. |

**리턴 값**

| 유형     | 설명                                                     |
| ------ | ------------------------------------------------------ |
| string | [Multihash](https://multiformats.io/multihash) 문자열입니다. |

**예시**

```javascript
> caver.ipfs.toHex('Qmd9thymMS6mejhEDZfwXPowSDunzgma9ex4ezpCSRZGwC')
0x1220dc1dbe0bcf1e5f6cce80bd3d7e7d873801c5a1732add889c0f25391d53470dc3
```

## caver.ipfs.fromHex <a id="caver-ipfs-fromhex"></a>

```javascript
caver.ipfs.fromHex(hash)
```

[Multihash](https://multiformats.io/multihash)에서 [CID(콘텐츠 식별자)](https://multiformats.io/multihash)로 변환합니다.

**매개변수**

| 이름   | 유형     | 설명                                                  |
| ---- | ------ | --------------------------------------------------- |
| hash | string | 변환할 [Multihash](https://multiformats.io/multihash). |

**리턴 값**

| 유형     | 설명                                                                                                                               |
| ------ | -------------------------------------------------------------------------------------------------------------------------------- |
| string | The [CID(Content Identifier)](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids). |

**예시**

```javascript
> caver.ipfs.fromHex('0x1220dc1dbe0bcf1e5f6cce80bd3d7e7d873801c5a1732add889c0f25391d53470dc3')
Qmd9thymMS6mejhEDZfwXPowSDunzgma9ex4ezpCSRZGwC
```
