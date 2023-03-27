# 로깅 <a id="logging"></a>

## debug_backtraceAt <a id="debug_backtraceat"></a>

로깅 백트레이스 위치를 설정합니다. 백트레이스 위치가 설정되고, 그 위치에서 로그 메시지가 전송되면 로그 내역을 실행하는 Go루틴의 스택이 `stderr`로 출력됩니다.

| Client  | Method Invocation                                     |
|:-------:| ----------------------------------------------------- |
| Console | `debug.backtraceAt(location)`                         |
|   RPC   | `{"method": "debug_backtraceAt", "params": [string]}` |

**Parameters**

| Name     | Type   | Description                                             |
| -------- | ------ | ------------------------------------------------------- |
| location | string | 로깅 백트레이스 위치는 `<filename>:<line>`와 같이 표현됩니다. |

**Return Value**

None

**Example**

``` javascript
> debug.backtraceAt("server.go:443")
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_backtraceAt","params":["server.go:443"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```


## debug_setVMLogTarget <a id="debug_setvmlogtarget"></a>

미리 컴파일된 컨트랙트 vmlog의 출력 형태를 설정합니다.  출력 형태가 파일이라면, 스마트 컨트랙트에서의 `vmlog` 호출로 발생한 로그가 `DATADIR/log/vm.log`에 저장됩니다.  이때 `DATADIR`는 `klay` 실행 시 `--datadir`를 통해 지정된 디렉토리입니다.  반면에 출력 형태가 `stdout`이면, 표준 출력의 디버깅 메시지 형태로 로그가 출력됩니다.

| Client  | Method Invocation                                        |
|:-------:| -------------------------------------------------------- |
| Console | `debug.setVMLogTarget(target)`                           |
|   RPC   | `{"method": "debug_setVMLogTarget", "params": [number]}` |

**Parameters**

| Name   | Type | Description                                                          |
| ------ | ---- | -------------------------------------------------------------------- |
| target | int  | 출력 형태를 설정합니다. (0: 출력 없음, 1: 파일, 2: stdout, 3: 파일과 stdout) (기본 설정: 0) |

**Return Value**

| Type   | Description                        |
| ------ | ---------------------------------- |
| string | 출력 형태입니다.  실제 리턴값의 예시는 아래를 참고해주세요. |

**Example**

Console
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
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_setVMLogTarget","params":[3],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":"both file and stdout"}
```


## debug_verbosity <a id="debug_verbosity"></a>

로깅의 상세 정도 상한을 설정합니다. 특정 레벨 이하까지 로그 메시지가 출력됩니다.

(Level :  0=crit, 1=error, 2=warn, 3=info, 4=debug, 5=trace)

`debug_vmodule`을 사용하여 각 패키지와 소스 파일의 상세 정도를 높일 수 있습니다.

| Client  | Method Invocation                                 |
|:-------:| ------------------------------------------------- |
| Console | `debug.verbosity(level)`                          |
|   RPC   | `{"method": "debug_vmodule", "params": [number]}` |

**Parameters**

| Name  | Type | Description            |
| ----- | ---- | ---------------------- |
| level | int  | 로깅의 상세 정도를 나타내는 레벨입니다. |

**Return Value**

None

**Example**

Console
```javascript
> debug.verbosity(3)
null
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_verbosity","params":['3'],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```

## debug_verbosityByName <a id="debug_verbositybyname"></a>

로그 모듈의 상세수준을 이름을 사용해 설정합니다. VerbosityByName은 zapLogger로만 작동하는 점에 주의해주세요.

(Level :  0=crit, 1=error, 2=warn, 3=info, 4=debug, 5=trace)

The verbosity of individual packages and source files can be raised using `debug_vmodule`.

| Client  | Method Invocation                                                 |
|:-------:| ----------------------------------------------------------------- |
| Console | `debug.verbosityByName(name, level)`                              |
|   RPC   | `{"method": "debug_verbosityByName", "params": [string, number]}` |

**Parameters**

| Name  | Type   | Description                  |
| ----- | ------ | ---------------------------- |
| name | string | 모듈의 이름                       |
| level | int    | The logging verbosity level. |

**Return Value**

None

**Example**

Console
```javascript
> debug.verbosityByName("name", 3)
null
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_verbosityByName","params":["name", '3'],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```


## debug_verbosityByID <a id="debug_verbositybyid"></a>

로그 모듈의 상세수준을 모듈 ID를 사용해 설정합니다. VerbosityByID는 zapLogger로만 작동하는 점에 주의해주세요.

(ModuleID : [github](https://github.com/klaytn/klaytn/blob/dev/log/log_modules.go)의 코드를 참고해주세요. )

(Level :  0=crit, 1=error, 2=warn, 3=info, 4=debug, 5=trace)

The verbosity of individual packages and source files can be raised using `debug_vmodule`.

| Client  | Method Invocation                                               |
|:-------:| --------------------------------------------------------------- |
| Console | `debug.verbosityByID(id, level)`                                |
|   RPC   | `{"method": "debug_verbosityByID", "params": [number, number]}` |

**Parameters**

| Name  | Type | Description                  |
| ----- | ---- | ---------------------------- |
| id    | int  | 모듈의 ID                       |
| level | int  | The logging verbosity level. |

**Return Value**

None

**Example**

Console
```javascript
> debug.verbosityById(1, 3)
null
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_verbosityById","params":['1',3'],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```


## debug_vmodule <a id="debug_vmodule"></a>

로깅의 상세수준 패턴을 설정합니다.

| Client  | Method Invocation                                 |
|:-------:| ------------------------------------------------- |
| Console | `debug.vmodule(module)`                           |
|   RPC   | `{"method": "debug_vmodule", "params": [string]}` |

**Parameters**

| Name   | Type   | Description    |
| ------ | ------ | -------------- |
| module | string | 로깅을 위한 모듈명입니다. |

**Return Value**

없음.

**Example**

Console

특정 Go 패키지(디렉토리) 및 하위 디렉토리의 메시지를 확인하려면 아래와 같이 입력하세요.

```javascript
> debug.vmodule("p2p/*=5")
```

하위 디렉토리는 제외하고 특정 패키지(*예*, p2p)의 메시지로 제한하려면 아래와 같이 입력하세요.

```javascript
> debug.vmodule("p2p=4")
```

특정 소스 파일의 로그 메시지를 확인하려면 아래와 같이 입력하세요.

```javascript
> debug.vmodule("server.go=3")
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_vmodule","params":["p2p=4"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```

