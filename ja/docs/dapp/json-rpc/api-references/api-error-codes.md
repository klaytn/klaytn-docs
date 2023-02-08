---
- >-

- APIエラーコード
---

# API エラー コード <a id="api-error-codes"></a>

Klaytn は API レスポンスに `エラー` 項目を提供し、開発者に失敗した API 実行の理由についての詳細情報を提供します。 この項目は、API の実行に失敗した場合にのみ存在します。 このフィールドには、 `error code` と `error message` が含まれます。

応答例
```
{
 "jsonrpc":"2.0",
 "id":83,
 "error":{
    "code":-32602,
    "message":"invalid argument 0: hex string without 0x prefix"
 }
}
```

---
HTTP エラー
> **NOTE**
> 
> Klaytn で明示的に返される HTTP エラーのみがリストされます。 すべてのステータスコードについては、 [**FastHTTP リポジトリ**](https://github.com/valyala/fasthttp/blob/5d73da31aed12047d2625e86bf405a0cd1f77f2b/status.go) を参照してください。

| ステータスコード： | Error                       | メッセージの例                                    |
|:--------- |:--------------------------- |:------------------------------------------ |
| 403       | StatusForbidden             | "不正なホストが指定されました"                           |
| 404       | StatusNotFound              | "404 page not found"                       |
| 405       | StatusMethodNotAllowed      | "methodnot allowed"                        |
| 413       | StatusRequestEntityTooLarge | "Content length too large n > 524288"      |
| 415       | StatusUnsupportedMediaType  | "無効なコンテンツタイプ、application/jsonのみサポートされています" |

---

標準JSON-RPCエラー

> **NOTE**
> 
> ステータスコードごとにさまざまな種類のエラーがあるが、簡潔性のために書かれているのはそれぞれ1つだけである。

| エラーコード | Error                    | Message Example                                                                |
|:------ |:------------------------ |:------------------------------------------------------------------------------ |
| -32000 | WSRPCNotRunningError     | "WebSocket RPCが実行されていません"                                                      |
|        | InvalidNodeIdError       | "無効なナイフ: 不正なノードID(長さが間違っています。128ヘックス文字が必要です)"                                  |
|        | BlockNotFoundError       | "block #1 not found"                                                           |
|        | BlockNotExistError       | 「ブロックが存在しません（ブロック番号：1）」                                                        |
|        | BlockDoesNotExistError   | 「ブロックが存在しません（ブロックハッシュ：0xf...f）」                                                |
|        | UnknownAccountError      | "不明なアカウント"                                                                     |
|        | TransactionNotFoundError | "トランザクション 0xf...f が見つかりません"                                                    |
|        | ShutDownError            | "サーバーがシャットダウンしています"                                                            |
| -32600 | InvalidRequestError      | "サーバーリクエストが制限を超えています"                                                          |
| -32601 | MethodNotFoundError      | "メソッドが存在しません/利用できません"                                                          |
| -32602 | InvalidParamsError       | "必須引数0の欠落値                                                                     |
|        |                          | "invalid argument 0: hex文字列, without 0x prefix"                                |
|        |                          | "invalid argument 0: json: cannot marchal string into Go value of type uint64" |
| -32700 | InvalidMessageError      | "JSON入力の予期しない終了"                                                               |
