# Go 런타임 추적 <a id="go-runtime-tracing"></a>

## debug_goTrace <a id="debug_gotrace"></a>

주어진 시간 동안 Go 런타임 추적을 진행하며 추적 데이터를 디스크에 입력합니다.

| Client  | Method Invocation                                         |
|:-------:| --------------------------------------------------------- |
| Console | `debug.goTrace(file, seconds)`                            |
|   RPC   | `{"method": "debug_goTrace", "params": [string, number]}` |

**Parameters**

| Name    | Type   | Description         |
| ------- | ------ | ------------------- |
| file    | string | 추적 결과 파일의 이름입니다.    |
| seconds | int    | 초 단위로 표현된 추적 기간입니다. |

**Return Value**

None

**Example**

Console
```javascript
> debug.goTrace("go.trace", 5)
null
```
HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_goTrace","params":["go.trace",5],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":null}
```


## debug_startGoTrace <a id="debug_startgotrace"></a>

입력으로 받은 파일에 Go 런타임 추적 결과를 씁니다.

| Client  | Method Invocation                                      |
|:-------:| ------------------------------------------------------ |
| Console | `debug.startGoTrace(file)`                             |
|   RPC   | `{"method": "debug_startGoTrace", "params": [string]}` |

**Parameters**

| Name | Type   | Description         |
| ---- | ------ | ------------------- |
| file | string | 추적 결과를 쓸 파일의 이름입니다. |

**Return Value**

None

**Example**

Console
```javascript
> debug.startGoTrace("go.trace")
null
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_startGoTrace","params":["go.trace"],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":null}
```


## debug_stopGoTrace <a id="debug_stopgotrace"></a>

Go 런타임 추적을 중지합니다.

| Client  | Method Invocation                               |
|:-------:| ----------------------------------------------- |
| Console | `debug.stopGoTrace()`                           |
|   RPC   | `{"method": "debug_stopGoTrace", "params": []}` |

**Parameters**

None

**Return Value**

None

**Example**

Console
```javascript
> debug.stopGoTrace()
null
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_stopGoTrace","params":[],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":null}
```

