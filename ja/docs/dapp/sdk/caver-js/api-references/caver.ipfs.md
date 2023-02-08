# caver.ipfs <a id="caver-ipfs"></a>

`caver.ipfs` は IPFS (InterPlanetary File System) に関連する機能を提供するパッケージです。

**注意** `caver.ipfs` は caver-js [v1.5.4](https://www.npmjs.com/package/caver-js/v/1.5.4) でサポートされています。

## caver.ipfs.setIPFSNode <a id="caver-ipfs-setipfsnode"></a>

```javascript
caver.ipfs.setIPFSNode(host, port, ssl)
```

IPFS ノードとの接続を初期化します。 この機能を通じてIPFSノード情報が設定されている場合、IPFSにファイルをアップロードしたり、IPFSからファイルを読み込んだりすることができます。

**Parameters**

| Name | Type    | Description                                                   |
| ---- | ------- | ------------------------------------------------------------- |
| host | string  | 接続するIPFSノードURL。                                               |
| port | number  | 使用するポート番号。                                                    |
| ssl  | boolean | true の場合、 `https` プロトコルが使用されます。 そうでなければ、 `http` プロトコルが使用されます。 |


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

IPFS にファイルを追加します。 アップロードされたファイルの [CID(Content Identifier)](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids) が返されます。

ファイルのパスが渡されると、ファイルの内容がパスから読み込まれ、IPFSにアップロードされます。 バッファが渡されると、直接IPFSにアップロードされます。

**Parameters**

| Name | Type                                    | Description                 |
| ---- | --------------------------------------- | --------------------------- |
| data | string &#124; Buffer &#124; ArrayBuffer | IPFSに追加するファイルまたはバッファのパス文字列。 |

**Notes** `Buffer` は caver-js [v1.5.5](https://www.npmjs.com/package/caver-js/v/1.5.5) でサポートされています。


**Return Value**

`Promise` は `文字列` を返します

| Type   | Description                                                                                                              |
| ------ | ------------------------------------------------------------------------------------------------------------------------ |
| string | アップロードされたファイルの [CID(Content Identifier)](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids)。 |

**Example**

```javascript
// Adds a file with path string.
> caver.ipfs.add('./test.txt')
Qmd9thymMS6mejhEDZfwXPowSDunzgma9ex4ezpCSRZGwC

// ファイルの内容を含むBuffer付きのファイルを追加します。
> caver.ipfs.add(Buffer.from('test data'))
QmWmsL95CYvci8JiortAMhezezr8BhAwAVohVUSJBcZcBL
```

## caver.ipfs.get <a id="caver-ipfs-get"></a>

```javascript
caver.ipfs.get(hash)
```

有効なIPFSパスで指定されたファイルを返します。

**Parameters**

| Name | Type   | Description                                                                                                             |
| ---- | ------ | ----------------------------------------------------------------------------------------------------------------------- |
| hash | string | ダウンロードするファイルの [CID(Content Identifier)](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids)。 |


**Return Value**

`Promise` は `Buffer` を返します。

| Type   | Description |
| ------ | ----------- |
| Buffer | ファイルの内容     |

**Example**

```javascript
> caver.ipfs.get('Qmd9thymMS6mejhEDZfwXPowSDunzgma9ex4ezpCSRZGwC')
<Buffer 74 65 73 74 20 64 61 74 61 20 66 6f 72 20 49 50 46 53>
```

## caver.ipfs.toHex <a id="caver-ipfs-tohex"></a>

```javascript
caver.ipfs.toHex(hash)
```

[CID(Content Identifier)](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids) を [Multihash](https://multiformats.io/multihash) に変換します。

**Parameters**

| Name | Type   | Description                                                                                                    |
| ---- | ------ | -------------------------------------------------------------------------------------------------------------- |
| hash | string | 変換する [CID(Content Identifier)](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids)。 |


**Return Value**

| Type   | Description                                         |
| ------ | --------------------------------------------------- |
| string | [Multihash](https://multiformats.io/multihash) 文字列. |

**Example**

```javascript
> caver.ipfs.toHex('Qmd9thymMS6mejhEDZfwXPowSDunzgma9ex4ezpCSRZGwC')
0x1220dc1dbe0bcf1e5f6cce80bd3d7e7d873801c5a1732add889c0f25391d53470dc3
```

## caver.ipfs.fromHex <a id="caver-ipfs-fromhex"></a>

```javascript
caver.ipfs.fromHex(hash)
```

[マルチハッシュ](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids) から [CID(Content Identifier)](https://multiformats.io/multihash) に変換します。

**Parameters**

| Name | Type   | Description                                        |
| ---- | ------ | -------------------------------------------------- |
| hash | string | 変換する [マルチハッシュ](https://multiformats.io/multihash)。 |


**Return Value**

| Type   | Description                                                                                               |
| ------ | --------------------------------------------------------------------------------------------------------- |
| string | [CID(Content Identifier)](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids). |

**Example**

```javascript
> caver.ipfs.fromHex('0x1220dc1dbe0bcf1e5f6cce80bd3d7e7d873801c5a1732add889c0f25391d53470dc3')
Qmd9thymMS6mejhEDZfwXPowSDunzgma9ex4ezpCSRZGwC
```
