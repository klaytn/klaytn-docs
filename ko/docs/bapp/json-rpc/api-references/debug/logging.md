# 로깅 <a id="logging"></a>

## debug_backtraceAt <a id="debug_backtraceat"></a>

로깅 백트레이스 위치를 설정합니다. 백트레이스 위치가 설정되고, 그 위치에서 로그 메시지가 보내지면 로그 내역을 실행하는 Go루틴의 스택이 `stderr`로 출력됩니다.

| 클라이언트 | 메서드 호출                                                |
|:-----:| ----------------------------------------------------- |
|  콘솔   | `debug.backtraceAt(location)`                         |
|  RPC  | `{"method": "debug_backtraceAt", "params": [string]}` |

**매개변수**

| 명칭       | 형식  | 설명                                                      |
| -------- | --- | ------------------------------------------------------- |
| location | 문자열 | 로깅 백트레이스 위치는 `<filename>:<line>`와 같이 표현됩니다. |

**리턴값**

없음

**예시**

``` javascript
> debug.backtraceAt("server.go:443")
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_backtraceAt","params":["server.go:443"],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":null}
```


## debug_setVMLogTarget <a id="debug_setvmlogtarget"></a>

미리 컴파일된 컨트랙트 vmlog의 출력 형태를 설정합니다.  When the output target is a file, logs from `vmlog` calls in smart contracts will be written to `DATADIR/log/vm.log`.  Here `DATADIR` is the directory specified by `--datadir` when launching `klay`.  On the other hand, the output target is `stdout`, logs will be displayed like a debug message on the standard output.

| 클라이언트 | 메서드 호출                                                   |
|:-----:| -------------------------------------------------------- |
|  콘솔   | `debug.setVMLogTarget(target)`                           |
|  RPC  | `{"method": "debug_setVMLogTarget", "params": [number]}` |

**매개변수**

| 명칭     | 형식  | 설명                                                                         |
| ------ | --- | -------------------------------------------------------------------------- |
| target | int | The output target (0: no output, 1: file, 2: stdout, 3: both) (default: 0) |

**리턴값**

| 형식  | 설명                                 |
| --- | ---------------------------------- |
| 문자열 | 출력 형태입니다.  실제 리턴값의 예시는 아래를 참고해주세요. |

**예시**

콘솔
```javascript
> debug.setVMLogTarget(0)
"no output"

> debug.setVMLogTarget(1)
"file"

> debug.setVMLogTarget(2)
"stdout"

> debug.setVMLogTarget(3)
"both file and stdout"

> debug.setVMLogTarget(4)
Error: target should be between 0 and 3
    at web3.js:3239:20
    at web3.js:6447:15
    at web3.js:5181:36
    at <anonymous>:1:1
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_setVMLogTarget","params":[3],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":"both file and stdout"}
```


## debug_verbosity <a id="debug_verbosity"></a>

로깅의 상세 정도 상한을 설정합니다. Log messages with level up to and including the given level will be printed.

(Level :  0=silent, 1=error, 2=warn, 3=info, 4=debug, 5=detail)

The verbosity of individual packages and source files can be raised using `debug_vmodule`.

| 클라이언트 | 메서드 호출                                            |
|:-----:| ------------------------------------------------- |
|  콘솔   | `debug.verbosity(level)`                          |
|  RPC  | `{"method": "debug_vmodule", "params": [number]}` |

**매개변수**

| 명칭    | 형식  | 설명                     |
| ----- | --- | ---------------------- |
| level | int | 로깅의 상세 정도를 나타내는 레벨입니다. |

**리턴값**

없음

**예시**

콘솔
```javascript
> debug.verbosity(3)
null
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_verbosity","params":['3'],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":null}
```


## debug_vmodule <a id="debug_vmodule"></a>

로깅의 상세 출력 패턴을 설정합니다.

| 클라이언트 | 메서드 호출                                            |
|:-----:| ------------------------------------------------- |
|  콘솔   | `debug.vmodule(module)`                           |
|  RPC  | `{"method": "debug_vmodule", "params": [string]}` |

**매개변수**

| 명칭     | 형식  | 설명             |
| ------ | --- | -------------- |
| module | 문자열 | 로깅을 위한 모듈명입니다. |

**리턴값**

없음

**예시**

콘솔

If you want to see messages from a particular Go package (directory) and all subdirectories, use

```javascript
> debug.vmodule("p2p/*=5")
```

If you want to restrict messages to a particular package (*e.g.*, p2p) but exclude subdirectories, use

```javascript
> debug.vmodule("p2p=4")
```

특정 소스 파일의 로그 메시지를 확인하려면 아래와 같이 입력하세요.

```javascript
> debug.vmodule("server.go=3")
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_vmodule","params":["p2p=4"],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":null}
```

