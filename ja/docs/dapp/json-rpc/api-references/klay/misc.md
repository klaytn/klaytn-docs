# その他 <a id="miscellaneous"></a>

## klay_sha3 <a id="klay_sha3"></a>

戻り値 与えられたデータの Keccak-256 (標準化された SHA3-256) ではありません。

**パラメータ**

| 名前   | タイプ | Description       |
| ---- | --- | ----------------- |
| data | データ | SHA3ハッシュに変換するデータ。 |

**戻り値**

| タイプ       | Description      |
| --------- | ---------------- |
| 32バイトのデータ | 与えられたデータのSHA3結果。 |


**例**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_sha3","params":["0x11223344"],"id":1}' https://api.baobab.klaytn.net:8651

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":"0x36712aa4d0dd2f64a9ae6ac09555133a157c74ddf7c079a70c33e8b4bf70dd73"
}
```
