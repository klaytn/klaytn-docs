# Profiling

## debug_blockProfile

Turns on block profiling for the given duration and writes profile data to disk. It uses a profile rate of 1 for most accurate information. If a different rate is desired, set the rate and write the profile manually using [debug_writeBlockProfile](#debug_writeblockprofile).

| Client  | Method Invocation                                              |
|:-------:| -------------------------------------------------------------- |
| Console | `debug.blockProfile(file, seconds)`                            |
|   RPC   | `{"method": "debug_blockProfile", "params": [string, number]}` |

**Parameters**

| 명칭      | 형식     | 설명                                     |
| ------- | ------ | -------------------------------------- |
| file    | string | The filename for the profiling result. |
| seconds | int    | The profiling duration in seconds.     |

**Return Value**

None

**예시**

Console
```javascript
> debug.blockProfile("block.profile", 10)
null
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_blockProfile","params":["block.profile", 10],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":null}
```


## debug_cpuProfile

Turns on CPU profiling for the given duration and writes profile data to disk.

| Client  | Method Invocation                                            |
|:-------:| ------------------------------------------------------------ |
| Console | `debug.cpuProfile(file, seconds)`                            |
|   RPC   | `{"method": "debug_cpuProfile", "params": [string, number]}` |

**Parameters**

| 명칭      | 형식     | 설명                                     |
| ------- | ------ | -------------------------------------- |
| file    | string | The filename for the profiling result. |
| seconds | int    | The profiling duration in seconds.     |

**Return Value**

None

**예시**

Console
```javascript
> debug.cpuProfile("block.profile", 10)
null
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_cpuProfile","params":["block.profile", 10],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":null}
```


## debug_isPProfRunning

Returns `true` if the pprof HTTP server is running and `false` otherwise.

| Client  | Method Invocation                                  |
|:-------:| -------------------------------------------------- |
| Console | `debug.isPProfRunning()`                           |
|   RPC   | `{"method": "debug_isPProfRunning", "params": []}` |

**Parameters**

None

**Return Value**

| 형식   | 설명                                                                |
| ---- | ----------------------------------------------------------------- |
| bool | `true` if the pprof HTTP server is running and `false` otherwise. |

**예시**

Console
```javascript
> debug.isPProfRunning()
false
```

HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_isPProfRunning","params":[],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":true}
```


## debug_setBlockProfileRate

Sets the rate (in samples/sec) of goroutine block profile data collection. A non-zero rate enables block profiling, setting it to zero stops the profile. Collected profile data can be written using [debug_writeBlockProfile](#debug_writeblockprofile).

| Client  | Method Invocation                                             |
|:-------:| ------------------------------------------------------------- |
| Console | `debug.setBlockProfileRate(rate)`                             |
|   RPC   | `{"method": "debug_setBlockProfileRate", "params": [number]}` |

**Parameters**

| 명칭   | 형식  | 설명                                 |
| ---- | --- | ---------------------------------- |
| rate | int | The profiling rate in samples/sec. |

**Return Value**

None

**예시**

Console
```javascript
> debug.setBlockProfileRate(1)
null
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_setBlockProfileRate","params":['3'],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":null}
```


## debug_startCPUProfile

Turns on CPU profiling indefinitely, writing to the given file.

| Client  | Method Invocation                                         |
|:-------:| --------------------------------------------------------- |
| Console | `debug.startCPUProfile(file)`                             |
|   RPC   | `{"method": "debug_startCPUProfile", "params": [string]}` |

**Parameters**

| 명칭   | 형식     | 설명                                     |
| ---- | ------ | -------------------------------------- |
| file | string | The filename for the profiling output. |

**Return Value**

None

**예시**

Console

```javascript
> debug.startCPUProfile("cpu.profile")
null
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_startCPUProfile","params":["cpu.profile"],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":null}
```


## debug_stopCPUProfile

Turns off CPU profiling.

| Client  | Method Invocation                                  |
|:-------:| -------------------------------------------------- |
| Console | `debug.stopCPUProfile()`                           |
|   RPC   | `{"method": "debug_stopCPUProfile", "params": []}` |

**Parameters**

None

**Return Value**

None

**예시**

Console
```javascript
> debug.stopCPUProfile()
null
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_stopCPUProfile","params":[],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":null}
```


## debug_startPProf

Starts the pprof HTTP server.  The running pprof server can be accessed by (when the default configuration, i.e., localhost:6060, is used):
- http://localhost:6060/debug/pprof (for the pprof results)
- http://localhost:6060/memsize/ (for the memory size reports)
- http://localhost:6060/debug/vars (for the metrics)

| Client  | Method Invocation                                            |
|:-------:| ------------------------------------------------------------ |
| Console | `debug.startPProf(address, port)`                            |
|   RPC   | `{"method": "debug_startPProf", "params": [string, number]}` |

**Parameters**

| 명칭   | 형식     | 설명                                                                       |
| ---- | ------ | ------------------------------------------------------------------------ |
| 주소   | string | (optional) pprof HTTP server listening interface (default: "127.0.0.1"). |
| port | int    | (optional) pprof HTTP server listening port (default: 6060).             |

**Return Value**

None

**예시**

Console
```javascript
# To start the pprof server at 127.0.0.1:6060
> debug.startPProf()
null

# To start the pprof server at localhost:12345
> debug.startPProf("localhost", 12345)
null
```

HTTP RPC
```shell
# To start the pprof server at localhost:6060
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_startPProf","params":["localhost", 6060],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":null}
```


## debug_stopPProf

Stops the pprof HTTP server.

| Client  | Method Invocation                             |
|:-------:| --------------------------------------------- |
| Console | `debug.stopPProf()`                           |
|   RPC   | `{"method": "debug_stopPProf", "params": []}` |

**Parameters**

None

**Return Value**

None

**예시**

Console
```javascript
> debug.stopPProf()
null
```

HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_stopPProf","params":[],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":null}
```


## debug_writeBlockProfile

Writes a goroutine blocking profile to the given file.

| Client  | Method Invocation                                           |
|:-------:| ----------------------------------------------------------- |
| Console | `debug.writeBlockProfile(file)`                             |
|   RPC   | `{"method": "debug_writeBlockProfile", "params": [string]}` |

**Parameters**

| 명칭   | 형식     | 설명                                     |
| ---- | ------ | -------------------------------------- |
| file | string | The filename for the profiling output. |

**Return Value**

None

**예시**

Console
```javascript
> debug.writeBlockProfile("block.profile")
null
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_writeBlockProfile","params":["block.profile"],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":null}
```


## debug_writeMemProfile

Writes an allocation profile to the given file.  Note that the profiling rate cannot be set through the API, it must be set on the command line using the `--memprofilerate` flag.

| Client  | Method Invocation                                         |
|:-------:| --------------------------------------------------------- |
| Console | `debug.writeMemProfile(file)`                             |
|   RPC   | `{"method": "debug_writeMemProfile", "params": [string]}` |

**Parameters**

| 명칭   | 형식     | 설명                                     |
| ---- | ------ | -------------------------------------- |
| file | string | The filename for the profiling output. |

**Return Value**

None

**예시**

Console
```javascript
> debug.writeMemProfile("mem.profile")
null
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_writeMemProfile","params":["mem.profile"],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":null}
```

