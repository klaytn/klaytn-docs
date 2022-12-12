# Go Runtime Tracing <a id="go-runtime-tracing"></a>

## unsafedebug_goTrace <a id="unsafedebug_gotrace"></a>

Turns on Go runtime tracing for the given duration and writes
trace data to disk.

| Client  | Method Invocation                                         |
|:-------:|-----------------------------------------------------------|
| Console | `unsafedebug.goTrace(file, seconds)`                            |
| RPC     | `{"method": "unsafedebug_goTrace", "params": [string, number]}` |

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| file | string | The filename for the trace output. |
| seconds | int | The tracing duration in seconds. |

**Return Value**

None

**Example**

Console
```javascript
> unsafedebug.goTrace("go.trace", 5)
null
```
HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"unsafedebug_goTrace","params":["go.trace",5],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":null}
```


## unsafedebug_startGoTrace <a id="unsafedebug_startgotrace"></a>

Starts writing a Go runtime trace to the given file.

| Client  | Method Invocation                                      |
|:-------:|--------------------------------------------------------|
| Console | `unsafedebug.startGoTrace(file)`                             |
| RPC     | `{"method": "unsafedebug_startGoTrace", "params": [string]}` |

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| file | string | The filename for the tracing output. |

**Return Value**

None

**Example**

Console
```javascript
> unsafedebug.startGoTrace("go.trace")
null
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"unsafedebug_startGoTrace","params":["go.trace"],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":null}
```


## unsafedebug_stopGoTrace <a id="unsafedebug_stopgotrace"></a>

Stops writing the Go runtime trace.

| Client  | Method Invocation                                 |
|:-------:|---------------------------------------------------|
| Console | `unsafedebug.stopGoTrace()`                             |
| RPC     | `{"method": "unsafedebug_stopGoTrace", "params": []}`   |

**Parameters**

None

**Return Value**

None

**Example**

Console
```javascript
> unsafedebug.stopGoTrace()
null
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"unsafedebug_stopGoTrace","params":[],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":null}
```

