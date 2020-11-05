# Profiling <a id="profiling"></a>

## debug_blockProfile <a id="debug_blockprofile"></a>

Turns on block profiling for the given duration and writes profile data to disk. 가장 정확한 정보를 위해 프로파일 속도는 1입니다. If a different rate is desired, set the rate and write the profile manually using [debug_writeBlockProfile](#debug_writeblockprofile).

| 클라이언트 | 메서드 호출                                                         |
|:-----:| -------------------------------------------------------------- |
|  콘솔   | `debug.blockProfile(file, seconds)`                            |
|  RPC  | `{"method": "debug_blockProfile", "params": [string, number]}` |

**매개변수**

| 명칭      | 형식  | 설명                     |
| ------- | --- | ---------------------- |
| file    | 문자열 | 프로파일링 결과 파일의 이름입니다.    |
| seconds | int | 초 단위로 표현된 프로파일링 기간입니다. |

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

| 명칭      | 형식  | 설명                     |
| ------- | --- | ---------------------- |
| file    | 문자열 | 프로파일링 결과 파일의 이름입니다.    |
| seconds | int | 초 단위로 표현된 프로파일링 기간입니다. |

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


## debug_isPProfRunning <a id="debug_ispprofrunning"></a>

pprof HTTP 서버가 실행 중이면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다.

| 클라이언트 | 메서드 호출                                             |
|:-----:| -------------------------------------------------- |
|  콘솔   | `debug.isPProfRunning()`                           |
|  RPC  | `{"method": "debug_isPProfRunning", "params": []}` |

**매개변수**

없음

**리턴값**

| 형식   | 설명                                                          |
| ---- | ----------------------------------------------------------- |
| bool | pprof HTTP 서버가 실행 중이면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다. |

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

| 명칭   | 형식  | 설명                       |
| ---- | --- | ------------------------ |
| rate | int | (샘플/초)로 표현된 프로파일링 속도입니다. |

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

무기한으로 CPU 프로파일링을 진행하고, 입력으로 받은 파일에 그 결과를 작성합니다.

| 클라이언트 | 메서드 호출                                                    |
|:-----:| --------------------------------------------------------- |
|  콘솔   | `debug.startCPUProfile(file)`                             |
|  RPC  | `{"method": "debug_startCPUProfile", "params": [string]}` |

**매개변수**

| 명칭   | 형식  | 설명                  |
| ---- | --- | ------------------- |
| file | 문자열 | 프로파일링 출력 파일의 이름입니다. |

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

CPU 프로파일링을 중단합니다.

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

pprof HTTP 서버를 시작합니다.  The running pprof server can be accessed by (when the default configuration, i.e., localhost:6060, is used):
- http://localhost:6060/debug/pprof (for the pprof results)
- http://localhost:6060/memsize/ (for the memory size reports)
- http://localhost:6060/debug/vars (for the metrics)

| 클라이언트 | 메서드 호출                                                       |
|:-----:| ------------------------------------------------------------ |
|  콘솔   | `debug.startPProf(address, port)`                            |
|  RPC  | `{"method": "debug_startPProf", "params": [string, number]}` |

**매개변수**

| 명칭      | 형식  | 설명                                                                       |
| ------- | --- | ------------------------------------------------------------------------ |
| address | 문자열 | (optional) pprof HTTP server listening interface (default: "127.0.0.1"). |
| port    | int | (optional) pprof HTTP server listening port (default: 6060).             |

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

pprof HTTP 서버를 중단합니다.

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

입력으로 받은 파일에 go루틴 블록 프로파일링을 작성합니다.

| 클라이언트 | 메서드 호출                                                      |
|:-----:| ----------------------------------------------------------- |
|  콘솔   | `debug.writeBlockProfile(file)`                             |
|  RPC  | `{"method": "debug_writeBlockProfile", "params": [string]}` |

**매개변수**

| 명칭   | 형식  | 설명                  |
| ---- | --- | ------------------- |
| file | 문자열 | 프로파일링 출력 파일의 이름입니다. |

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

입력으로 받은 파일에 메모리 사용량 프로파일을 작성합니다.  Note that the profiling rate cannot be set through the API, it must be set on the command line using the `--memprofilerate` flag.

| 클라이언트 | 메서드 호출                                                    |
|:-----:| --------------------------------------------------------- |
|  콘솔   | `debug.writeMemProfile(file)`                             |
|  RPC  | `{"method": "debug_writeMemProfile", "params": [string]}` |

**매개변수**

| 명칭   | 형식  | 설명                  |
| ---- | --- | ------------------- |
| file | 문자열 | 프로파일링 출력 파일의 이름입니다. |

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

