# ランタイムトレース <a id="go-runtime-tracing"></a>

## debug_goTrace <a id="debug_gotrace"></a>

指定した期間のGoランタイムトレースをオンにし、 トレースデータをディスクに書き込みます。

| Client  | Method Invocation                                         |
|:-------:| --------------------------------------------------------- |
| Console | `debug.goTrace(file, seconds)`                            |
|   RPC   | `{"method": "debug_goTrace", "params": [string, number]}` |

**Parameters**

| Name | Type   | Description       |
| ---- | ------ | ----------------- |
| ファイル | string | トレース出力のファイル名。     |
| 秒    | int    | トレース時間を秒単位で指定します。 |

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
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_goTrace","params":["go.trace",5],"id":1} https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":null}
```


## debug_startGoTrace <a id="debug_startgotrace"></a>

指定されたファイルにGoランタイムトレースを書き始めます。

| Client  | Method Invocation                                      |
|:-------:| ------------------------------------------------------ |
| Console | `debug.startGoTrace(file)`                             |
|   RPC   | `{"method": "debug_startGoTrace", "params": [string]}` |

**Parameters**

| Name | Type   | Description   |
| ---- | ------ | ------------- |
| file | string | トレース出力のファイル名。 |

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
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_startGoTrace","params":["go.trace"],"id":1} https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":null}
```


## debug_stopGoTrace <a id="debug_stopgotrace"></a>

Goランタイムトレースの書き込みを停止します。

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

