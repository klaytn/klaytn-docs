# 프로파일링<a id="profiling"></a>

## debug_blockProfile <a id="debug_blockprofile"></a>

입력으로 받은 기간 동안의 블록 프로파일링을 설정하고 프로파일 데이터를 디스크에 씁니다. 가장 정확한 정보를 위해 프로파일 속도는 1입니다. 속도를 다르게 설정하려면, [debug_writeBlockProfile](#debug_writeblockprofile)를 사용하여 속도를 설정하고 프로파일을 수동으로 작성합니다.

| 클라이언트 | 메서드 호출                                                         |
|:-----:| -------------------------------------------------------------- |
|  콘솔   | `debug.blockProfile(file, seconds)`                            |
|  RPC  | `{"method": "debug_blockProfile", "params": [string, number]}` |

**매개변수**

| 이름      | 타입     | 설명                     |
| ------- | ------ | ---------------------- |
| file    | string | 프로파일링 결과 파일의 이름입니다.    |
| seconds | int    | 초 단위로 표현된 프로파일링 기간입니다. |

**리턴값**

없음

**예시**

콘솔
```javascript
> debug.blockProfile("block.profile", 10)
null
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_blockProfile","params":["block.profile", 10],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":null}
```


## debug_cpuProfile <a id="debug_cpuprofile"></a>

입력으로 받은 기간 동안의 CPU 프로파일링을 설정하고 프로파일 데이터를 디스크에 씁니다.

| 클라이언트 | 메서드 호출                                                       |
|:-----:| ------------------------------------------------------------ |
|  콘솔   | `debug.cpuProfile(file, seconds)`                            |
|  RPC  | `{"method": "debug_cpuProfile", "params": [string, number]}` |

**매개변수**

| 이름      | 타입     | 설명                     |
| ------- | ------ | ---------------------- |
| file    | string | 프로파일링 결과 파일의 이름입니다.    |
| seconds | int    | 초 단위로 표현된 프로파일링 기간입니다. |

**리턴값**

없음

**예시**

콘솔
```javascript
> debug.cpuProfile("block.profile", 10)
null
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_cpuProfile","params":["block.profile", 10],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":null}
```

## debug_mutexProfile <a id="debug_mutexprofile"></a>

Turns on mutex profiling for nsec (nanosecond) and writes profile data to file. 가장 정확한 정보를 위해 프로파일 속도는 1입니다. If a different rate is desired, set the rate and write the profile manually.

| 클라이언트 | 메서드 호출                                                         |
|:-----:| -------------------------------------------------------------- |
|  콘솔   | `debug.mutexProfile(file, seconds)`                            |
|  RPC  | `{"method": "debug_mutexProfile", "params": [string, number]}` |

**매개변수**

| 이름      | 타입     | 설명                     |
| ------- | ------ | ---------------------- |
| file    | string | 프로파일링 결과 파일의 이름입니다.    |
| seconds | int    | 초 단위로 표현된 프로파일링 기간입니다. |

**리턴값**

없음

**예시**

콘솔
```javascript
> debug.mutexProfile("mutex.profile", 10)
null
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_mutexProfile","params":["mutex.profile", 10],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":null}
```


## debug_isPProfRunning <a id="debug_ispprofrunning"></a>

Returns `true` if the pprof HTTP server is running and `false` otherwise.

| 클라이언트 | 메서드 호출                                             |
|:-----:| -------------------------------------------------- |
|  콘솔   | `debug.isPProfRunning()`                           |
|  RPC  | `{"method": "debug_isPProfRunning", "params": []}` |

**매개변수**

없음

**리턴값**

| 타입   | 설명                                                                |
| ---- | ----------------------------------------------------------------- |
| bool | `true` if the pprof HTTP server is running and `false` otherwise. |

**예시**

콘솔
```javascript
> debug.isPProfRunning()
false
```

HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_isPProfRunning","params":[],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":true}
```


## debug_setBlockProfileRate <a id="debug_setblockprofilerate"></a>

Sets the rate (in samples/sec) of goroutine block profile data collection. A non-zero rate enables block profiling, setting it to zero stops the profile. Collected profile data can be written using [debug_writeBlockProfile](#debug_writeblockprofile).

| 클라이언트 | 메서드 호출                                                        |
|:-----:| ------------------------------------------------------------- |
|  콘솔   | `debug.setBlockProfileRate(rate)`                             |
|  RPC  | `{"method": "debug_setBlockProfileRate", "params": [number]}` |

**매개변수**

| 이름   | 타입  | 설명                                 |
| ---- | --- | ---------------------------------- |
| rate | int | The profiling rate in samples/sec. |

**리턴값**

없음

**예시**

콘솔
```javascript
> debug.setBlockProfileRate(1)
null
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_setBlockProfileRate","params":['3'],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":null}
```


## debug_startCPUProfile <a id="debug_startcpuprofile"></a>

Turns on CPU profiling indefinitely, writing to the given file.

| 클라이언트 | 메서드 호출                                                    |
|:-----:| --------------------------------------------------------- |
|  콘솔   | `debug.startCPUProfile(file)`                             |
|  RPC  | `{"method": "debug_startCPUProfile", "params": [string]}` |

**매개변수**

| 이름   | 타입     | 설명                  |
| ---- | ------ | ------------------- |
| file | string | 프로파일링 출력 파일의 이름입니다. |

**리턴값**

없음

**예시**

콘솔

```javascript
> debug.startCPUProfile("cpu.profile")
null
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_startCPUProfile","params":["cpu.profile"],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":null}
```


## debug_stopCPUProfile <a id="debug_stopcpuprofile"></a>

Turns off CPU profiling.

| 클라이언트 | 메서드 호출                                             |
|:-----:| -------------------------------------------------- |
|  콘솔   | `debug.stopCPUProfile()`                           |
|  RPC  | `{"method": "debug_stopCPUProfile", "params": []}` |

**매개변수**

없음

**리턴값**

없음

**예시**

콘솔
```javascript
> debug.stopCPUProfile()
null
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_stopCPUProfile","params":[],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":null}
```


## debug_startPProf <a id="debug_startpprof"></a>

Starts the pprof HTTP server.  The running pprof server can be accessed by (when the default configuration, i.e., localhost:6060, is used):
- http://localhost:6060/debug/pprof (pprof 결과)
- http://localhost:6060/memsize/ (메모리 크기 리포트)
- http://localhost:6060/debug/vars (측정 수치)

| 클라이언트 | 메서드 호출                                                       |
|:-----:| ------------------------------------------------------------ |
|  콘솔   | `debug.startPProf(address, port)`                            |
|  RPC  | `{"method": "debug_startPProf", "params": [string, number]}` |

**매개변수**

| 이름      | 타입     | 설명                                                                       |
| ------- | ------ | ------------------------------------------------------------------------ |
| address | string | (optional) pprof HTTP server listening interface (default: "127.0.0.1"). |
| port    | int    | (optional) pprof HTTP server listening port (default: 6060).             |

**리턴값**

없음

**예시**

콘솔
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


## debug_stopPProf <a id="debug_stoppprof"></a>

Stops the pprof HTTP server.

| 클라이언트 | 메서드 호출                                        |
|:-----:| --------------------------------------------- |
|  콘솔   | `debug.stopPProf()`                           |
|  RPC  | `{"method": "debug_stopPProf", "params": []}` |

**매개변수**

없음

**리턴값**

없음

**예시**

콘솔
```javascript
> debug.stopPProf()
null
```

HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_stopPProf","params":[],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":null}
```


## debug_writeBlockProfile <a id="debug_writeblockprofile"></a>

Writes a goroutine blocking profile to the given file.

| 클라이언트 | 메서드 호출                                                      |
|:-----:| ----------------------------------------------------------- |
|  콘솔   | `debug.writeBlockProfile(file)`                             |
|  RPC  | `{"method": "debug_writeBlockProfile", "params": [string]}` |

**매개변수**

| 이름   | 타입     | 설명                  |
| ---- | ------ | ------------------- |
| file | string | 프로파일링 출력 파일의 이름입니다. |

**리턴값**

없음

**예시**

콘솔
```javascript
> debug.writeBlockProfile("block.profile")
null
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_writeBlockProfile","params":["block.profile"],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":null}
```


## debug_writeMemProfile <a id="debug_writememprofile"></a>

Writes an allocation profile to the given file.  Note that the profiling rate cannot be set through the API, it must be set on the command line using the `--memprofilerate` flag.

| 클라이언트 | 메서드 호출                                                    |
|:-----:| --------------------------------------------------------- |
|  콘솔   | `debug.writeMemProfile(file)`                             |
|  RPC  | `{"method": "debug_writeMemProfile", "params": [string]}` |

**매개변수**

| 이름   | 타입     | 설명                  |
| ---- | ------ | ------------------- |
| file | string | 프로파일링 출력 파일의 이름입니다. |

**리턴값**

없음

**예시**

콘솔
```javascript
> debug.writeMemProfile("mem.profile")
null
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_writeMemProfile","params":["mem.profile"],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":null}
```

## debug_writeMutexProfile <a id="debug_writemutexprofile"></a>

Writes a goroutine blocking profile to the given file.

| 클라이언트 | 메서드 호출                                                      |
|:-----:| ----------------------------------------------------------- |
|  콘솔   | `debug.writeMutexProfile(file)`                             |
|  RPC  | `{"method": "debug_writeMutexProfile", "params": [string]}` |

**매개변수**

| 이름   | 타입     | 설명                  |
| ---- | ------ | ------------------- |
| file | string | 프로파일링 출력 파일의 이름입니다. |

**리턴값**

없음

**예시**

콘솔
```javascript
> debug.writeMutexProfile("mutex.profile")
null
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_writeMutexProfile","params":["mutex.profile"],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":null}
```