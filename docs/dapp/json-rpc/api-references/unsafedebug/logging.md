# Logging <a id="logging"></a>

## unsafedebug_backtraceAt <a id="unsafedebug_backtraceat"></a>

Sets the logging backtrace location. When a backtrace location is set and a log
message is emitted at that location, the stack of the goroutine executing the
log statement will be printed to `stderr`.

| Client  | Method Invocation                                     |
| :-----: | ----------------------------------------------------- |
| Console | `unsafedebug.backtraceAt(location)`                         |
|   RPC   | `{"method": "unsafedebug_backtraceAt", "params": [string]}` |

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| location | string | The logging backtrace location specified as `<filename>:<line>`. |

**Return Value**

None

**Example**

``` javascript
> unsafedebug.backtraceAt("server.go:443")
null
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"unsafedebug_backtraceAt","params":["server.go:443"],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":null}
```


## unsafedebug_setVMLogTarget <a id="unsafedebug_setvmlogtarget"></a>

Sets the output target of vmlog precompiled contract.  When the output target
is a file, logs from `vmlog` calls in smart contracts will be written to
`DATADIR/log/vm.log`.  Here `DATADIR` is the directory specified by `--datadir`
when launching `klay`.  On the other hand, the output target is `stdout`, logs
will be displayed like a debug message on the standard output.

| Client  | Method Invocation                                        |
|:-------:|----------------------------------------------------------|
| Console | `unsafedebug.setVMLogTarget(target)`                           |
| RPC     | `{"method": "unsafedebug_setVMLogTarget", "params": [number]}` |

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| target | int | The output target (0: no output, 1: file, 2: stdout, 3: both) (default: 0) |

**Return Value**

| Type | Description |
| --- | --- |
| string | The output target.  See the examples below for the actual return values. |

**Example**

Console
```javascript
> unsafedebug.setVMLogTarget(0)
"no output"

> unsafedebug.setVMLogTarget(1)
"file"

> unsafedebug.setVMLogTarget(2)
"stdout"

> unsafedebug.setVMLogTarget(3)
"both file and stdout"

> unsafedebug.setVMLogTarget(4)
Error: target should be between 0 and 3
    at web3.js:3239:20
    at web3.js:6447:15
    at web3.js:5181:36
    at <anonymous>:1:1
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"unsafedebug_setVMLogTarget","params":[3],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":"both file and stdout"}
```


## unsafedebug_verbosity <a id="unsafedebug_verbosity"></a>

Sets the logging verbosity ceiling. Log messages with level up to and including
the given level will be printed.

(Level :  0=crit, 1=error, 2=warn, 3=info, 4=debug, 5=trace)

The verbosity of individual packages and source files
can be raised using `unsafedebug_vmodule`.

| Client  | Method Invocation                                 |
|:-------:|---------------------------------------------------|
| Console | `unsafedebug.verbosity(level)`                          |
| RPC     | `{"method": "unsafedebug_vmodule", "params": [number]}` |

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| level | int | The logging verbosity level. |

**Return Value**

None

**Example**

Console
```javascript
> unsafedebug.verbosity(3)
null
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"unsafedebug_verbosity","params":['3'],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":null}
```

## unsafedebug_verbosityByName <a id="unsafedebug_verbositybyname"></a>

Sets the verbosity of log module with given name.
Please note that VerbosityByName only works with zapLogger.

(Level :  0=crit, 1=error, 2=warn, 3=info, 4=debug, 5=trace)

The verbosity of individual packages and source files
can be raised using `unsafedebug_vmodule`.

| Client  | Method Invocation                                             |
|:-------:|---------------------------------------------------------------|
| Console | `unsafedebug.verbosityByName(name, level)`                    |
| RPC     | `{"method": "unsafedebug_verbosityByName", "params": [string, number]}` |

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| name | string | The module name. |
| level | int | The logging verbosity level. |

**Return Value**

None

**Example**

Console
```javascript
> unsafedebug.verbosityByName("name", 3)
null
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"unsafedebug_verbosityByName","params":["name", '3'],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":null}
```


## unsafedebug_verbosityByID <a id="unsafedebug_verbositybyid"></a>

Sets the verbosity of log module with given ModuleID.
Please note that VerbosityByID only works with zapLogger.

(ModuleID : Please refer to the code on the [github](https://github.com/klaytn/klaytn/blob/dev/log/log_modules.go). )

(Level :  0=crit, 1=error, 2=warn, 3=info, 4=debug, 5=trace)

The verbosity of individual packages and source files
can be raised using `unsafedebug_vmodule`.

| Client  | Method Invocation                                 |
|:-------:|---------------------------------------------------|
| Console | `unsafedebug.verbosityByID(id, level)`                          |
| RPC     | `{"method": "unsafedebug_verbosityByID", "params": [number, number]}` |

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| id | int | The module id. |
| level | int | The logging verbosity level. |

**Return Value**

None

**Example**

Console
```javascript
> unsafedebug.verbosityById(1, 3)
null
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"unsafedebug_verbosityById","params":['1',3'],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":null}
```


## unsafedebug_vmodule <a id="unsafedebug_vmodule"></a>

Sets the logging verbosity pattern.

| Client  | Method Invocation                                 |
|:-------:|---------------------------------------------------|
| Console | `unsafedebug.vmodule(module)`                           |
| RPC     | `{"method": "unsafedebug_vmodule", "params": [string]}` |

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| module | string | The module name for logging. |

**Return Value**

None

**Example**

Console

If you want to see messages from a particular Go package (directory)
and all subdirectories, use

```javascript
> unsafedebug.vmodule("p2p/*=5")
```

If you want to restrict messages to a particular package (*e.g.*, p2p)
but exclude subdirectories, use

```javascript
> unsafedebug.vmodule("p2p=4")
```

If you want to see log messages from a particular source file, use

```javascript
> unsafedebug.vmodule("server.go=3")
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"unsafedebug_vmodule","params":["p2p=4"],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":null}
```

