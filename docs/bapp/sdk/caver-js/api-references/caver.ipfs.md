# caver.ipfs <a id="caver-ipfs"></a>

`caver.ipfs` is a package that provides functionality related to IPFS (InterPlanetary File System).

## caver.ipfs.setIPFSNode <a id="caver-ipfs-setipfsnode"></a>

```javascript
caver.ipfs.setIPFSNode(host, port, ssl)
```

Initializes a connection with an IPFS Node. When an IPFS Node information is set through this function, you can upload files to IPFS or load files from IPFS.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| host | string | The IPFS Node url to connect with. |
| port | number | The port number to use. |
| ssl | boolean| If true, the `https` protocol is used. Otherwise, the `http` protocol is used. |


**Return Value**

None

**Example**

```javascript
> caver.ipfs.setIPFSNode('localhost', 5001, false)
```

## caver.ipfs.add <a id="caver-ipfs-add"></a>

```javascript
caver.ipfs.add(path)
```

Adds a file to IPFS. The IPFS hash (Content Identifier-CID) of the uploaded file is returned.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| path | string | The path of the file to add to IPFS. |


**Return Value**

`Promise` returns `string`

| Type | Description |
| --- | --- |
| string | The IPFS hash (Content Identifier-CID) of the uploaded file. |

**Example**

```javascript
> caver.ipfs.add('./test.txt')
Qmd9thymMS6mejhEDZfwXPowSDunzgma9ex4ezpCSRZGwC
```

## caver.ipfs.get <a id="caver-ipfs-get"></a>

```javascript
caver.ipfs.get(hash)
```

Returns a file addressed by a valid IPFS path.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| hash | string | An IPFS hash (Content Identifier-CID) of the file to download. |


**Return Value**

`Promise` returns `string`

| Type | Description |
| --- | --- |
| string | The content of the file. |

**Example**

```javascript
> caver.ipfs.get('Qmd9thymMS6mejhEDZfwXPowSDunzgma9ex4ezpCSRZGwC')
test data for IPFS
```

## caver.ipfs.toHex <a id="caver-ipfs-tohex"></a>

```javascript
caver.ipfs.toHex(hash)
```

Converts a IPFS hash (Content Identifier-CID) to hex format.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| hash | string | A IPFS hash (Content Identifier-CID) to convert. |


**Return Value**

| Type | Description |
| --- | --- |
| string | The hash string in hex format. |

**Example**

```javascript
> caver.ipfs.toHex('Qmd9thymMS6mejhEDZfwXPowSDunzgma9ex4ezpCSRZGwC')
0x1220dc1dbe0bcf1e5f6cce80bd3d7e7d873801c5a1732add889c0f25391d53470dc3
```

## caver.ipfs.fromHex <a id="caver-ipfs-fromhex"></a>

```javascript
caver.ipfs.fromHex(hash)
```

Converts to IPFS hash (Content Identifier-CID) from the hash in hex format.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| hash | string | A hash in hex format to convert. |


**Return Value**

| Type | Description |
| --- | --- |
| string | The IPFS hash (Content Identifier-CID). |

**Example**

```javascript
> caver.ipfs.fromHex('0x1220dc1dbe0bcf1e5f6cce80bd3d7e7d873801c5a1732add889c0f25391d53470dc3')
Qmd9thymMS6mejhEDZfwXPowSDunzgma9ex4ezpCSRZGwC
```
