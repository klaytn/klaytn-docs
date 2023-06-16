# Profiling <a id="profiling"></a>

## debug_blockProfile <a id="debug_blockprofile"></a>

指定された期間のブロックプロファイリングをオンにし、プロファイルデータを ディスクに書き込みます。 最も正確な情報にはプロファイルレート1を使用します。 異なる レートが必要な場合は、レートを設定し、 [debug_writeBlockProfile](#debug_writeblockprofile) を使用してプロファイルを手動で書き込みます。

| Client  | Method Invocation                                              |
|:-------:| -------------------------------------------------------------- |
| Console | `debug.blockProfile(file, seconds)`                            |
|   RPC   | `{"method": "debug_blockProfile", "params": [string, number]}` |

**Parameters**

| Name    | Type   | Description           |
| ------- | ------ | --------------------- |
| file    | string | プロファイリング結果のファイル名。     |
| seconds | int    | プロファイリング期間を秒単位で指定します。 |

**Return Value**

None

**Example**

Console
```javascript
> debug.blockProfile("block.profile", 10)
null
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_blockProfile","params":["block.profile", 10],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```


## debug_cpuProfile <a id="debug_cpuprofile"></a>

指定した期間の CPU プロファイリングをオンにし、プロファイルデータをディスクに書き込みます。

| Client  | Method Invocation                                            |
|:-------:| ------------------------------------------------------------ |
| Console | `debug.cpuProfile(file, seconds)`                            |
|   RPC   | `{"method": "debug_cpuProfile", "params": [string, number]}` |

**Parameters**

| Name    | Type   | Description                            |
| ------- | ------ | -------------------------------------- |
| file    | string | The filename for the profiling result. |
| seconds | int    | The profiling duration in seconds.     |

**Return Value**

None

**Example**

Console
```javascript
> debug.cpuProfile("block.profile", 10)
null
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_cpuProfile","params":["block.profile", 10],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```

## debug_mutexProfile <a id="debug_mutexprofile"></a>

nsec(ナノ秒)のミューテックスプロファイリングをオンにし、プロファイルデータをファイルに書き込みます。 It uses a profile rate of 1 for most accurate information. 異なるレートが必要な場合は、レートを設定し、プロファイルを手動で記述します。

| Client  | Method Invocation                                              |
|:-------:| -------------------------------------------------------------- |
| Console | `debug.mutexProfile(file, seconds)`                            |
|   RPC   | `{"method": "debug_mutexProfile", "params": [string, number]}` |

**Parameters**

| Name    | Type   | Description                            |
| ------- | ------ | -------------------------------------- |
| file    | string | The filename for the profiling result. |
| seconds | int    | The profiling duration in seconds.     |

**Return Value**

None

**Example**

Console
```javascript
> debug.mutexProfile("mutex.profile", 10)
null
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_mutexProfile","params":["mutex.profile", 10],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```


## debug_isPProfRunning <a id="debug_ispprofrunning"></a>

pprof HTTP サーバーが実行されている場合は `true` を、それ以外の場合は `false` を返します。

| Client  | Method Invocation                                  |
|:-------:| -------------------------------------------------- |
| Console | `debug.isPProfRunning()`                           |
|   RPC   | `{"method": "debug_isPProfRunning", "params": []}` |

**Parameters**

None

**Return Value**

| Type | Description                                         |
| ---- | --------------------------------------------------- |
| bool | `pprof HTTP サーバーが実行されている場合は` true `、そうでない場合は` が正しい。 |

**Example**

Console
```javascript
> debug.isPProfRunning()
false
```

HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_isPProfRunning","params":[],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":true}
```


## debug_setBlockProfileRate <a id="debug_setblockprofilerate"></a>

Goroutineブロックプロファイルデータ収集の速度(サンプル/秒)を設定します。 がゼロでない場合、ブロックプロファイリングを有効にし、ゼロに設定するとプロファイルが停止します。 収集されたプロファイルデータは、 [debug_writeBlockProfile](#debug_writeblockprofile) を使用して書き込むことができます。

| Client  | Method Invocation                                             |
|:-------:| ------------------------------------------------------------- |
| Console | `debug.setBlockProfileRate(rate)`                             |
|   RPC   | `{"method": "debug_setBlockProfileRate", "params": [number]}` |

**Parameters**

| Name | Type | Description             |
| ---- | ---- | ----------------------- |
| レート  | int  | プロファイリング速度（samples/sec） |

**Return Value**

None

**Example**

Console
```javascript
> debug.setBlockProfileRate(1)
null
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_setBlockProfileRate","params":['3'],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```


## debug_startCPUProfile <a id="debug_startcpuprofile"></a>

CPU プロファイリングを無期限にオンにし、指定されたファイルに書き込みます。

| Client  | Method Invocation                                         |
|:-------:| --------------------------------------------------------- |
| Console | `debug.startCPUProfile(file)`                             |
|   RPC   | `{"method": "debug_startCPUProfile", "params": [string]}` |

**Parameters**

| Name | Type   | Description       |
| ---- | ------ | ----------------- |
| file | string | プロファイリング出力のファイル名。 |

**Return Value**

None

**Example**

Console

```javascript
> debug.startCPUProfile("cpu.profile")
null
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_startCPUProfile","params":["cpu.profile"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```


## debug_stopCPUProfile <a id="debug_stopcpuprofile"></a>

CPU プロファイリングをオフにします。

| Client  | Method Invocation                                  |
|:-------:| -------------------------------------------------- |
| Console | `debug.stopCPUProfile()`                           |
|   RPC   | `{"method": "debug_stopCPUProfile", "params": []}` |

**Parameters**

None

**Return Value**

None

**Example**

Console
```javascript
> debug.stopCPUProfile()
null
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_stopCPUProfile","params":[],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```


## debug_startPProf <a id="debug_startpprof"></a>

pprof HTTP サーバーを起動します。  実行中の pprof サーバは でアクセスできます(デフォルトの設定、つまりlocalhost:6060が使用されている場合):
- http://localhost:6060/debug/pprof (pprof results)
- http://localhost:6060/memsize/ (for the memory size reports)
- http://localhost:6060/debug/var (for the metrics)

| Client  | Method Invocation                                            |
|:-------:| ------------------------------------------------------------ |
| Console | `debug.startPProf(address, port)`                            |
|   RPC   | `{"method": "debug_startPProf", "params": [string, number]}` |

**Parameters**

| Name    | Type   | Description                                                |
| ------- | ------ | ---------------------------------------------------------- |
| address | string | (オプション) pprof HTTP サーバーリスニングインターフェイス (デフォルト: "127.0.0.1")。 |
| port    | int    | (オプション) pprof HTTP サーバーのリスニングポート(デフォルト: 6060)。             |

**Return Value**

None

**Example**

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
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_startPProf","params":["localhost", 6060],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```


## debug_stopPProf <a id="debug_stoppprof"></a>

pprof HTTP サーバーを停止します。

| Client  | Method Invocation                             |
|:-------:| --------------------------------------------- |
| Console | `debug.stopPProf()`                           |
|   RPC   | `{"method": "debug_stopPProf", "params": []}` |

**Parameters**

None

**Return Value**

None

**Example**

Console
```javascript
> debug.stopPProf()
null
```

HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_stopPProf","params":[],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```


## debug_writeBlockProfile <a id="debug_writeblockprofile"></a>

指定されたファイルにゴルーチンブロックプロファイルを書き込みます。

| Client  | Method Invocation                                           |
|:-------:| ----------------------------------------------------------- |
| Console | `debug.writeBlockProfile(file)`                             |
|   RPC   | `{"method": "debug_writeBlockProfile", "params": [string]}` |

**Parameters**

| Name | Type   | Description                            |
| ---- | ------ | -------------------------------------- |
| file | string | The filename for the profiling output. |

**Return Value**

None

**Example**

Console
```javascript
> debug.writeBlockProfile("block.profile")
null
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_writeBlockProfile","params":["block.profile"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```


## debug_writeMemProfile <a id="debug_writememprofile"></a>

割り当てプロファイルを指定したファイルに書き込みます。  プロファイリング率 は API では設定できないことに注意してください。 コマンドラインで `--memprofileate` フラグを使用して設定する必要があります。

| Client  | Method Invocation                                         |
|:-------:| --------------------------------------------------------- |
| Console | `debug.writeMemProfile(file)`                             |
|   RPC   | `{"method": "debug_writeMemProfile", "params": [string]}` |

**Parameters**

| Name | Type   | Description                            |
| ---- | ------ | -------------------------------------- |
| file | string | The filename for the profiling output. |

**Return Value**

None

**Example**

Console
```javascript
> debug.writeMemProfile("mem.profile")
null
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_writeMemProfile","params":["mem.profile"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```

## debug_writeMutexProfile <a id="debug_writemutexprofile"></a>

Writes a goroutine blocking profile to the given file.

| Client  | Method Invocation                                           |
|:-------:| ----------------------------------------------------------- |
| Console | `debug.writeMutexProfile(file)`                             |
|   RPC   | `{"method": "debug_writeMutexProfile", "params": [string]}` |

**Parameters**

| Name | Type   | Description                            |
| ---- | ------ | -------------------------------------- |
| file | string | The filename for the profiling output. |

**Return Value**

None

**Example**

Console
```javascript
> debug.writeMutexProfile("mutex.profile")
null
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_writeMutexProfile","params":["mutex.profile"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```
