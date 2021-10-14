# 로깅 <a id="logging"></a>

## debug_backtraceAt <a id="debug_backtraceat"></a>

로깅 백트레이스 위치를 설정합니다. 백트레이스 위치가 설정되고, 그 위치에서 로그 메시지가 전송되면 로그 내역을 실행하는 Go루틴의 스택이 `stderr`로 출력됩니다.

| 클라이언트 | 메서드 호출                                                |
|:-----:| ----------------------------------------------------- |
|  콘솔   | `debug.backtraceAt(location)`                         |
|  RPC  | `{"method": "debug_backtraceAt", "params": [string]}` |

**매개변수**

| 이름       | 타입     | 설명                                                      |
| -------- | ------ | ------------------------------------------------------- |
| location | string | 로깅 백트레이스 위치는 `<filename>:<line>`와 같이 표현됩니다. |

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

미리 컴파일된 컨트랙트 vmlog의 출력 형태를 설정합니다.  출력 형태가 파일이라면, 스마트 컨트랙트에서의 `vmlog` 호출로 발생한 로그가 `DATADIR/log/vm.log`에 저장됩니다.  이때 `DATADIR`는 `klay` 실행 시 `--datadir`를 통해 지정된 디렉토리입니다.  반면에 출력 형태가 `stdout`이면, 표준 출력의 디버깅 메시지 형태로 로그가 출력됩니다.

| 클라이언트 | 메서드 호출                                                   |
|:-----:| -------------------------------------------------------- |
|  콘솔   | `debug.setVMLogTarget(target)`                           |
|  RPC  | `{"method": "debug_setVMLogTarget", "params": [number]}` |

**매개변수**

| 이름     | 타입  | 설명                                                                   |
| ------ | --- | -------------------------------------------------------------------- |
| target | int | 출력 형태를 설정합니다. (0: 출력 없음, 1: 파일, 2: stdout, 3: 파일과 stdout) (기본 설정: 0) |

**리턴값**

| 타입     | 설명                                 |
| ------ | ---------------------------------- |
| string | 출력 형태입니다.  실제 리턴값의 예시는 아래를 참고해주세요. |

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

로깅의 상세 정도 상한을 설정합니다. 특정 레벨 이하까지 로그 메시지가 출력됩니다.

(Level :  0=crit, 1=error, 2=warn, 3=info, 4=debug, 5=trace)

`debug_vmodule`을 사용하여 각 패키지와 소스 파일의 상세 정도를 높일 수 있습니다.

| 클라이언트 | 메서드 호출                                            |
|:-----:| ------------------------------------------------- |
|  콘솔   | `debug.verbosity(level)`                          |
|  RPC  | `{"method": "debug_vmodule", "params": [number]}` |

**매개변수**

| 이름    | 타입  | 설명                     |
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

## debug_verbosityByName <a id="debug_verbositybyname"></a>

Sets the verbosity of log module with given name. Please note that VerbosityByName only works with zapLogger.

(Level :  0=crit, 1=error, 2=warn, 3=info, 4=debug, 5=trace)

`debug_vmodule`을 사용하여 각 패키지와 소스 파일의 상세 정도를 높일 수 있습니다.

| 클라이언트 | 메서드 호출                                                            |
|:-----:| ----------------------------------------------------------------- |
|  콘솔   | `debug.verbosityByName(name, level)`                              |
|  RPC  | `{"method": "debug_verbosityByName", "params": [string, number]}` |

**매개변수**

| 이름    | 타입     | 설명                     |
| ----- | ------ | ---------------------- |
| 명칭    | string | The module name.       |
| level | int    | 로깅의 상세 정도를 나타내는 레벨입니다. |

**리턴값**

없음

**예시**

콘솔
```javascript
> debug.verbosityByName("name", 3)
null
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_verbosityByName","params":["name", '3'],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":null}
```


## debug_verbosityByID <a id="debug_verbositybyid"></a>

Sets the verbosity of log module with given ModuleID. Please note that VerbosityByID only works with zapLogger.

(ModuleID : Please refer to the code on the [github](https://github.com/klaytn/klaytn/blob/dev/log/log_modules.go). )

(Level :  0=crit, 1=error, 2=warn, 3=info, 4=debug, 5=trace)

`debug_vmodule`을 사용하여 각 패키지와 소스 파일의 상세 정도를 높일 수 있습니다.

| 클라이언트 | 메서드 호출                                                          |
|:-----:| --------------------------------------------------------------- |
|  콘솔   | `debug.verbosityByID(id, level)`                                |
|  RPC  | `{"method": "debug_verbosityByID", "params": [number, number]}` |

**매개변수**

| 이름    | 타입  | 설명                     |
| ----- | --- | ---------------------- |
| id    | int | The module id.         |
| level | int | 로깅의 상세 정도를 나타내는 레벨입니다. |

**리턴값**

없음

**예시**

콘솔
```javascript
> debug.verbosityById(1, 3)
null
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_verbosityById","params":['1',3'],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":null}
```


## debug_vmodule <a id="debug_vmodule"></a>

Sets the logging verbosity pattern.

| 클라이언트 | 메서드 호출                                            |
|:-----:| ------------------------------------------------- |
|  콘솔   | `debug.vmodule(module)`                           |
|  RPC  | `{"method": "debug_vmodule", "params": [string]}` |

**매개변수**

| 이름     | 타입     | 설명                           |
| ------ | ------ | ---------------------------- |
| module | string | The module name for logging. |

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

If you want to see log messages from a particular source file, use

```javascript
> debug.vmodule("server.go=3")
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_vmodule","params":["p2p=4"],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":null}
```

