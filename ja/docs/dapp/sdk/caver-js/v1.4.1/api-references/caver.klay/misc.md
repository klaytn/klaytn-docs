## sha3 <a id="sha3"></a>

```javascript
caver.klay.sha3(data[, callback])
```

与えられたデータの Kecchak-256 ハッシュを返します(標準化された SHA3-256 ではありません)。


**Parameters**

| Name     | Type     | Description                                                                                                |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| data     | String   | The data to convert into a SHA3 hash.                                                                      |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` は `String を返します。` - 与えられたデータの SHA3 結果。

**Example**

```javascript
> caver.klay.sha3("0x11223344").then(console.log);
0x36712aa4d0dd2f64a9ae6ac09555133a157c74ddf7c079a70c33e8b4bf70ddd73
```
