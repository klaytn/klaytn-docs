---
description: >-
APIs error codes 
---

# API Error Codes <a id="api-error-codes"></a>

Klaytn provides an `error` field in the API response to give developers more information about the reason for the failed API execution. This field exists only if the API execution fails. This field contains `error code` and `error message`.

Example Response
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
HTTP Errors
> **NOTE**
>
> Only HTTP errors that are explicitly returned on Klaytn are listed. Please refer to [**FastHTTP repository**](https://github.com/valyala/fasthttp/blob/5d73da31aed12047d2625e86bf405a0cd1f77f2b/status.go) for all status codes.

| Status Code | Error | Message Example |
| :---   | :--- | :--- |
| 403 | StatusForbidden | "invalid host specified" |
| 404 | StatusNotFound | "404 page not found" |
| 405 | StatusMethodNotAllowed | "method not allowed" |
| 413 | StatusRequestEntityTooLarge | "content length too large n > 524288" |
| 415 | StatusUnsupportedMediaType | "invalid content type, only application/json is supported" |

---

Standard JSON-RPC Errors

> **NOTE**
>
> Although there are various types of errors for each status code, only one of each has been written for the purpose of brevity.

| Error Code | Error | Message Example |
| :---   | :--- | :--- |
| -32000 | WSRPCNotRunningError |  "WebSocket RPC not running" |
|        | InvalidNodeIdError |  "invalid kni: invalid node ID (wrong length, want 128 hex chars)" |
|        | BlockNotFoundError |  "block #1 not found" |
|        | BlockNotExistError |  "the block does not exist (block number: 1)" |
|        | BlockDoesNotExistError |  "the block does not exist (block hash: 0xf...f)" |
|        | UnknownAccountError |  "unknown account" |
|        | TransactionNotFoundError |  "transaction 0xf...f not found" |
|        | ShutDownError |  "server is shutting down" |
| -32600 | InvalidRequestError | "server requests exceed the limit" |
| -32601 | MethodNotFoundError | "The method does not exist/is not available" |
| -32602 | InvalidParamsError  | "missing value for required argument 0" |
|        |                     | "invalid argument 0: hex string without 0x prefix" |
|        |                     | "invalid argument 0: json: cannot unmarshal string into Go value of type uint64" |
| -32700 | InvalidMessageError | "unexpected end of JSON input" |
