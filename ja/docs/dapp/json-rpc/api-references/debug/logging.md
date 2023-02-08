# ログ <a id="logging"></a>

## debug_backtraceAt <a id="debug_backtraceat"></a>

ロギングバックトレースの場所を設定します。 When a backtrace location is set and a log message is emitted at that location, the stack of the goroutine executing the log statement will be printed to `stderr`.

| Client  | Method Invocation                                     |
|:-------:| ----------------------------------------------------- |
| Console | `debug.backtraceAt(location)`                         |
|   RPC   | `{"method": "debug_backtraceAt", "params": [string]}` |

**Parameters**

| Name | Type   | Description                                             |
| ---- | ------ | ------------------------------------------------------- |
| 場所   | string | `<filename>:<line>` として指定されたロギングバックトレースの場所。 |

**Return Value**

None

**Example**

``` javascript
> debug.backtraceAt("server.go:443")
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_backtraceAt","params":["server.go:443"],"id":1}) https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":null}
```


## debug_setVMLogTarget <a id="debug_setvmlogtarget"></a>

vmlog プリコンパイル済みコントラクトの出力ターゲットを設定します。  When the output target is a file, logs from `vmlog` calls in smart contracts will be written to `DATADIR/log/vm.log`.  ここで `DATADIR` は、 `--datadir` で `klay` を起動するときに指定されたディレクトリです。  一方、出力ターゲットは `stdout`であり、logs は標準出力のデバッグメッセージのように表示されます。

| Client  | Method Invocation                                        |
|:-------:| -------------------------------------------------------- |
| Console | `debug.setVMLogTarget(target)`                           |
|   RPC   | `{"method": "debug_setVMLogTarget", "params": [number]}` |

**Parameters**

| Name   | Type | Description                                                                |
| ------ | ---- | -------------------------------------------------------------------------- |
| target | int  | The output target (0: no output, 1: file, 2: stdout, 3: both) (default: 0) |

**Return Value**

| Type   | Description                                   |
| ------ | --------------------------------------------- |
| string | The output target.  実際の戻り値については以下の例を参照してください。 |

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
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_setVMLogTarget","params":[3],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":"file and stdout"}
```


## debug_verbosity <a id="debug_verbosity"></a>

ロギング冗長性の天井を設定します。 指定されたレベルまでのレベル を含むログメッセージが表示されます。

(レベル : 0=crit, 1=error, 2=warn, 3=info, 4=debug, 5=trace)

個々のパッケージとソースファイル の詳細度は `debug_vmodule` を使用して調べることができます。

| Client  | Method Invocation                                 |
|:-------:| ------------------------------------------------- |
| Console | `debug.verbosity(level)`                          |
|   RPC   | `{"method": "debug_vmodule", "params": [number]}` |

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| レベル  | int  | ロギングの詳細レベル。 |

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
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_verbosity","params":['3'],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":null}
```

## debug_verbosityByName <a id="debug_verbositybyname"></a>

指定された名前でログモジュールの詳細度を設定。 VerbosityByNameはzapLoggerでのみ動作することに注意してください。

(Level :  0=crit, 1=error, 2=warn, 3=info, 4=debug, 5=trace)

The verbosity of individual packages and source files can be raised using `debug_vmodule`.

| Client  | Method Invocation                                                 |
|:-------:| ----------------------------------------------------------------- |
| Console | `debug.verbosityByName(name, level)`                              |
|   RPC   | `{"method": "debug_verbosityByName", "params": [string, number]}` |

**Parameters**

| Name  | Type   | Description                  |
| ----- | ------ | ---------------------------- |
| 名前    | string | モジュール名                       |
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
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_verbosityByName","params":["name", '3'],"id":1}) https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":null}
```


## debug_verbosityByID <a id="debug_verbositybyid"></a>

与えられた ModuleID でログモジュールの詳細度を設定します。 VerbosityByIDはzapLoggerでのみ動作することに注意してください。

(ModuleID: [github](https://github.com/klaytn/klaytn/blob/dev/log/log_modules.go) のコードを参照してください。 )

(Level :  0=crit, 1=error, 2=warn, 3=info, 4=debug, 5=trace)

The verbosity of individual packages and source files can be raised using `debug_vmodule`.

| Client  | Method Invocation                                               |
|:-------:| --------------------------------------------------------------- |
| Console | `debug.verbosityByID(id, level)`                                |
|   RPC   | `{"method": "debug_verbosityByID", "params": [number, number]}` |

**Parameters**

| Name  | Type | Description                  |
| ----- | ---- | ---------------------------- |
| id    | int  | モジュール id                     |
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
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_verbosityById","params":['1',3'],"id":1}) https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":null}
```


## debug_vmodule <a id="debug_vmodule"></a>

ログの詳細パターンを設定します。

| Client  | Method Invocation                                 |
|:-------:| ------------------------------------------------- |
| Console | `debug.vmodule(module)`                           |
|   RPC   | `{"method": "debug_vmodule", "params": [string]}` |

**Parameters**

| Name  | Type   | Description |
| ----- | ------ | ----------- |
| モジュール | string | ログのモジュール名   |

**Return Value**

None

**Example**

Console

特定の Go パッケージ (ディレクトリ) とすべてのサブディレクトリからのメッセージを見たい場合は、

```javascript
> debug.vmodule("p2p/*=5")
```

メッセージを特定のパッケージ (*など) に制限したい場合、*, p2p) サブディレクトリを除外する場合は、

```javascript
> debug.vmodule("p2p=4")
```

特定のソースファイルからのログメッセージを表示したい場合は、

```javascript
> debug.vmodule("server.go=3")
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_vmodule","params":["p2p=4"],"id":1} https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":null}
```

