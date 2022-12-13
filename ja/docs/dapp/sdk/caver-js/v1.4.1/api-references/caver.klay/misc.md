## sha3 <a id="sha3"></a>

```javascript
caver.klay.sha3(data[, callback])
```

与えられたデータの Kecchak-256 ハッシュを返します(標準化された SHA3-256 ではありません)。


**パラメータ**

| 名前       | タイプ | Description                                                        |
| -------- | --- | ------------------------------------------------------------------ |
| data     | 文字列 | SHA3ハッシュに変換するデータ。                                                  |
| callback | 関数  | (オプション) オプションのコールバックは、最初のパラメータとしてエラーオブジェクトを返し、結果は2番目のパラメータとして返します。 |

**戻り値**

`Promise` は `String を返します。` - 与えられたデータの SHA3 結果。

**例**

```javascript
> caver.klay.sha3("0x11223344").then(console.log);
0x36712aa4d0dd2f64a9ae6ac09555133a157c74ddf7c079a70c33e8b4bf70ddd73
```
