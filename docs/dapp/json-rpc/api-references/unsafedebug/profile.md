# Profiling <a id="profiling"></a>

## unsafedebug_blockProfile <a id="unsafedebug_blockprofile"></a>

Turns on block profiling for the given duration and writes profile data to
disk. It uses a profile rate of 1 for most accurate information. If a different
rate is desired, set the rate and write the profile manually using
[unsafedebug_writeBlockProfile](#unsafedebug_writeblockprofile).

| Client  | Method Invocation                                              |
| :-----: | -------------------------------------------------------------- |
| Console | `unsafedebug.blockProfile(file, seconds)`                            |
|   RPC   | `{"method": "unsafedebug_blockProfile", "params": [string, number]}` |

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| file | string | The filename for the profiling result. |
| seconds | int | The profiling duration in seconds. |

**Return Value**

None

**Example**

Console
```javascript
> unsafedebug.blockProfile("block.profile", 10)
null
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"unsafedebug_blockProfile","params":["block.profile", 10],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":null}
```


## unsafedebug_cpuProfile <a id="unsafedebug_cpuprofile"></a>

Turns on CPU profiling for the given duration and writes profile data to disk.

| Client  | Method Invocation                                            |
| :-----: | ------------------------------------------------------------ |
| Console | `unsafedebug.cpuProfile(file, seconds)`                            |
|   RPC   | `{"method": "unsafedebug_cpuProfile", "params": [string, number]}` |

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| file | string | The filename for the profiling result. |
| seconds | int | The profiling duration in seconds. |

**Return Value**

None

**Example**

Console
```javascript
> unsafedebug.cpuProfile("block.profile", 10)
null
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"unsafedebug_cpuProfile","params":["block.profile", 10],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":null}
```

## unsafedebug_mutexProfile <a id="unsafedebug_mutexprofile"></a>

Turns on mutex profiling for nsec (nanosecond) and writes profile data to file.
It uses a profile rate of 1 for most accurate information. If a different rate is desired, set the rate and write the profile manually.

| Client  | Method Invocation                                            |
| :-----: | ------------------------------------------------------------ |
| Console | `unsafedebug.mutexProfile(file, seconds)`                            |
|   RPC   | `{"method": "unsafedebug_mutexProfile", "params": [string, number]}` |

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| file | string | The filename for the profiling result. |
| seconds | int | The profiling duration in seconds. |

**Return Value**

None

**Example**

Console
```javascript
> unsafedebug.mutexProfile("mutex.profile", 10)
null
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"unsafedebug_mutexProfile","params":["mutex.profile", 10],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":null}
```


## unsafedebug_isPProfRunning <a id="unsafedebug_ispprofrunning"></a>

Returns `true` if the pprof HTTP server is running and `false` otherwise.

| Client  | Method Invocation                                  |
| :-----: | -------------------------------------------------- |
| Console | `unsafedebug.isPProfRunning()`                           |
| RPC     | `{"method": "unsafedebug_isPProfRunning", "params": []}` |

**Parameters**

None

**Return Value**

| Type | Description |
| --- | --- |
| bool | `true` if the pprof HTTP server is running and `false` otherwise. |

**Example**

Console
```javascript
> unsafedebug.isPProfRunning()
false
```

HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"unsafedebug_isPProfRunning","params":[],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":true}
```


## unsafedebug_setBlockProfileRate <a id="unsafedebug_setblockprofilerate"></a>

Sets the rate (in samples/sec) of goroutine block profile data collection. A
non-zero rate enables block profiling, setting it to zero stops the profile.
Collected profile data can be written using
[unsafedebug_writeBlockProfile](#unsafedebug_writeblockprofile).

| Client  | Method Invocation                                             |
|:-------:|---------------------------------------------------------------|
| Console | `unsafedebug.setBlockProfileRate(rate)`                             |
| RPC     | `{"method": "unsafedebug_setBlockProfileRate", "params": [number]}` |

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| rate | int | The profiling rate in samples/sec. |

**Return Value**

None

**Example**

Console
```javascript
> unsafedebug.setBlockProfileRate(1)
null
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"unsafedebug_setBlockProfileRate","params":['3'],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":null}
```


## unsafedebug_startCPUProfile <a id="unsafedebug_startcpuprofile"></a>

Turns on CPU profiling indefinitely, writing to the given file.

| Client  | Method Invocation                                         |
|:-------:|-----------------------------------------------------------|
| Console | `unsafedebug.startCPUProfile(file)`                             |
| RPC     | `{"method": "unsafedebug_startCPUProfile", "params": [string]}` |

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| file | string | The filename for the profiling output. |

**Return Value**

None

**Example**

Console

```javascript
> unsafedebug.startCPUProfile("cpu.profile")
null
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"unsafedebug_startCPUProfile","params":["cpu.profile"],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":null}
```


## unsafedebug_stopCPUProfile <a id="unsafedebug_stopcpuprofile"></a>

Turns off CPU profiling.

| Client  | Method Invocation                                  |
|:-------:|----------------------------------------------------|
| Console | `unsafedebug.stopCPUProfile()`                           |
| RPC     | `{"method": "unsafedebug_stopCPUProfile", "params": []}` |

**Parameters**

None

**Return Value**

None

**Example**

Console
```javascript
> unsafedebug.stopCPUProfile()
null
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"unsafedebug_stopCPUProfile","params":[],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":null}
```


## unsafedebug_startPProf <a id="unsafedebug_startpprof"></a>

Starts the pprof HTTP server.  The running pprof server can be accessed by
(when the default configuration, i.e., localhost:6060, is used):
- http://localhost:6060/debug/pprof (for the pprof results)
- http://localhost:6060/memsize/ (for the memory size reports)
- http://localhost:6060/debug/vars (for the metrics)

| Client  | Method Invocation                                            |
| :-----: | ------------------------------------------------------------ |
| Console | `unsafedebug.startPProf(address, port)`                            |
| RPC     | `{"method": "unsafedebug_startPProf", "params": [string, number]}` |

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| address | string | (optional) pprof HTTP server listening interface (default: "127.0.0.1"). |
| port | int | (optional) pprof HTTP server listening port (default: 6060). |

**Return Value**

None

**Example**

Console
```javascript
# To start the pprof server at 127.0.0.1:6060
> unsafedebug.startPProf()
null

# To start the pprof server at localhost:12345
> unsafedebug.startPProf("localhost", 12345)
null
```

HTTP RPC
```shell
# To start the pprof server at localhost:6060
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"unsafedebug_startPProf","params":["localhost", 6060],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":null}
```


## unsafedebug_stopPProf <a id="unsafedebug_stoppprof"></a>

Stops the pprof HTTP server.

| Client  | Method Invocation                             |
| :-----: | --------------------------------------------- |
| Console | `unsafedebug.stopPProf()`                           |
| RPC     | `{"method": "unsafedebug_stopPProf", "params": []}` |

**Parameters**

None

**Return Value**

None

**Example**

Console
```javascript
> unsafedebug.stopPProf()
null
```

HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"unsafedebug_stopPProf","params":[],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":null}
```


## unsafedebug_writeBlockProfile <a id="unsafedebug_writeblockprofile"></a>

Writes a goroutine blocking profile to the given file.

| Client  | Method Invocation                                           |
|:-------:|-------------------------------------------------------------|
| Console | `unsafedebug.writeBlockProfile(file)`                             |
| RPC     | `{"method": "unsafedebug_writeBlockProfile", "params": [string]}` |

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| file | string | The filename for the profiling output. |

**Return Value**

None

**Example**

Console
```javascript
> unsafedebug.writeBlockProfile("block.profile")
null
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"unsafedebug_writeBlockProfile","params":["block.profile"],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":null}
```


## unsafedebug_writeMemProfile <a id="unsafedebug_writememprofile"></a>

Writes an allocation profile to the given file.  Note that the profiling rate
cannot be set through the API, it must be set on the command line using the
`--memprofilerate` flag.

| Client  | Method Invocation                                           |
|:-------:|-------------------------------------------------------------|
| Console | `unsafedebug.writeMemProfile(file)`                               |
| RPC     | `{"method": "unsafedebug_writeMemProfile", "params": [string]}` |

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| file | string | The filename for the profiling output. |

**Return Value**

None

**Example**

Console
```javascript
> unsafedebug.writeMemProfile("mem.profile")
null
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"unsafedebug_writeMemProfile","params":["mem.profile"],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":null}
```

## unsafedebug_writeMutexProfile <a id="unsafedebug_writemutexprofile"></a>

Writes a goroutine blocking profile to the given file.

| Client  | Method Invocation                                           |
|:-------:|-------------------------------------------------------------|
| Console | `unsafedebug.writeMutexProfile(file)`                               |
| RPC     | `{"method": "unsafedebug_writeMutexProfile", "params": [string]}` |

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| file | string | The filename for the profiling output. |

**Return Value**

None

**Example**

Console
```javascript
> unsafedebug.writeMutexProfile("mutex.profile")
null
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"unsafedebug_writeMutexProfile","params":["mutex.profile"],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":null}
```
