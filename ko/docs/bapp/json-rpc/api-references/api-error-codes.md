---
- >-

- APIs error codes
---

# API Error Codes <a id="api-error-codes"></a>

API 응답의 `error` 필드를 통해 API 실행이 실패한 원인을 알려드립니다. 이 필드는 API 실행이 실패한 경우에만 존재합니다. 이 필드에는 `error code`와 `error message`가 포함됩니다.

예시 응답:
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
HTTP 오류
> **참고**
> 
> Klaytn에서 실제 반환되는 HTTP 에러만 열거되어 있습니다. 모든 상태 코드를 보려면 [**FastHTTP repository**](https://github.com/valyala/fasthttp/blob/5d73da31aed12047d2625e86bf405a0cd1f77f2b/status.go)를 참고하세요.

| 상태 코드 | 에러                          | 메세지 예시                                                     |
|:----- |:--------------------------- |:---------------------------------------------------------- |
| 403   | StatusForbidden             | "invalid host specified"                                   |
| 404   | StatusNotFound              | "404 page not found"                                       |
| 405   | StatusMethodNotAllowed      | "method not allowed"                                       |
| 413   | StatusRequestEntityTooLarge | "content length too large n > 524288"                      |
| 415   | StatusUnsupportedMediaType  | "invalid content type, only application/json is supported" |

---

표준 JSON-RPC 오류

> **참고**
> 
> 각 상태 코드에 다양한 에러가 존재하지만, 간결성을 위해 일부만 제시했습니다.

| 오류 코드  | 에러                       | 메세지 예시                                                                           |
|:------ |:------------------------ |:-------------------------------------------------------------------------------- |
| -32000 | WSRPCNotRunningError     | "WebSocket RPC not running"                                                      |
|        | InvalidNodeIdError       | "invalid kni: invalid node ID (wrong length, want 128 hex chars)"                |
|        | BlockNotFoundError       | "block #1 not found"                                                             |
|        | BlockNotExistError       | "the block does not exist (block number: 1)"                                     |
|        | BlockDoesNotExistError   | "the block does not exist (block hash: 0xf...f)"                                 |
|        | UnknownAccountError      | "unknown account"                                                                |
|        | TransactionNotFoundError | "transaction 0xf...f not found"                                                  |
|        | ShutDownError            | "server is shutting down"                                                        |
| -32600 | InvalidRequestError      | "server requests exceed the limit"                                               |
| -32601 | MethodNotFoundError      | "The method does not exist/is not available"                                     |
| -32602 | InvalidParamsError       | "missing value for required argument 0"                                          |
|        |                          | "invalid argument 0: hex string without 0x prefix"                               |
|        |                          | "invalid argument 0: json: cannot unmarshal string into Go value of type uint64" |
| -32700 | InvalidMessageError      | "unexpected end of JSON input"                                                   |
