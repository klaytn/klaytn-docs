# Logging <a id="logging"></a>

## debug_backtraceAt <a id="debug_backtraceat"></a>

Sets the logging backtrace location. When a backtrace location is set and a log message is emitted at that location, the stack of the goroutine executing the log statement will be printed to `stderr`.

| Client  | Method Invocation                                     |
|:-------:| ----------------------------------------------------- |
| Console | `debug.backtraceAt(location)`                         |
|   RPC   | `{"method": "debug_backtraceAt", "params": [string]}` |

**Parameters**

| Name     | Type   | Description                                                                  |
| -------- | ------ | ---------------------------------------------------------------------------- |
| location | string | The logging backtrace location specified as `<filename>:<line>`. |

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

Sets the output target of vmlog precompiled contract.  When the output target is a file, logs from `vmlog` calls in smart contracts will be written to `DATADIR/log/vm.log`.  Here `DATADIR` is the directory specified by `--datadir` when launching `klay`.  On the other hand, the output target is `stdout`, logs will be displayed like a debug message on the standard output.

| Client  | Method Invocation                                        |
|:-------:| -------------------------------------------------------- |
| Console | `debug.setVMLogTarget(target)`                           |
|   RPC   | `{"method": "debug_setVMLogTarget", "params": [number]}` |

**Parameters**

| Name   | Type | Description                                                                |
| ------ | ---- | -------------------------------------------------------------------------- |
| target | int  | The output target (0: no output, 1: file, 2: stdout, 3: both) (default: 0) |

**Giá trị Trả về**

| Loại  | Mô tả                                                                        |
| ----- | ---------------------------------------------------------------------------- |
| chuỗi | Mục tiêu đầu ra.  Xem các ví dụ bên dưới để biết các giá trị trả về thực tế. |

**Ví dụ**

Bảng điều khiển
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

Thiết lập trần độ chi tiết ghi nhật ký. Tin nhắn nhật ký với cấp độ lên đến và bao gồm mức đã cho sẽ được in ra.

(Cấp độ: 0=crit, 1=lỗi, 2=cảnh báo, 3=thông tin, 4=gỡ lỗi, 5=truy vết)

Có thể tăng mức độ chi tiết của các gói và tệp nguồn riêng lẻ bằng cách sử dụng `debug_vmodule`.

|   Khách hàng    | Gọi phương thức                                   |
|:---------------:| ------------------------------------------------- |
| Bảng điều khiển | `debug.verbosity(level)`                          |
|       RPC       | `{"method": "debug_vmodule", "params": [number]}` |

**Tham số**

| Tên    | Loại | Mô tả                        |
| ------ | ---- | ---------------------------- |
| cấp độ | int  | Cấp độ chi tiết ghi nhập ký. |

**Giá trị Trả về**

Không có

**Ví dụ**

Bảng điều khiển
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

Thiết lập mức độ chi tiết của mô-đun nhật ký với tên đã cho. Xin lưu ý rằng VerbosityByName chỉ hoạt động với zapLogger.

(Cấp độ: 0=crit, 1=lỗi, 2=cảnh báo, 3=thông tin, 4=gỡ lỗi, 5=truy vết)

Có thể tăng mức độ chi tiết của các gói và tệp nguồn riêng lẻ bằng cách sử dụng `debug_vmodule`.

|   Khách hàng    | Gọi phương thức                                                   |
|:---------------:| ----------------------------------------------------------------- |
| Bảng điều khiển | `debug.verbosityByName(name, level)`                              |
|       RPC       | `{"method": "debug_verbosityByName", "params": [string, number]}` |

**Tham số**

| Tên   | Loại   | Description                  |
| ----- | ------ | ---------------------------- |
| name  | string | The module name.             |
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

Sets the verbosity of log module with given ModuleID. Please note that VerbosityByID only works with zapLogger.

(ModuleID : Please refer to the code on the [github](https://github.com/klaytn/klaytn/blob/dev/log/log_modules.go). )

(Level :  0=crit, 1=error, 2=warn, 3=info, 4=debug, 5=trace)

The verbosity of individual packages and source files can be raised using `debug_vmodule`.

| Client  | Method Invocation                                               |
|:-------:| --------------------------------------------------------------- |
| Console | `debug.verbosityByID(id, level)`                                |
|   RPC   | `{"method": "debug_verbosityByID", "params": [number, number]}` |

**Parameters**

| Name  | Type | Description                  |
| ----- | ---- | ---------------------------- |
| id    | int  | The module id.               |
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

Sets the logging verbosity pattern.

| Client  | Method Invocation                                 |
|:-------:| ------------------------------------------------- |
| Console | `debug.vmodule(module)`                           |
|   RPC   | `{"method": "debug_vmodule", "params": [string]}` |

**Tham số**

| Tên    | Loại  | Mô tả                      |
| ------ | ----- | -------------------------- |
| mô-đun | chuỗi | Tên mô-đun để ghi nhật ký. |

**Giá trị Trả về**

Không có

**Ví dụ**

Bảng điều khiển

Nếu bạn muốn xem tin nhắn từ một gói Go cụ thể (thư mục) và tất cả các thư mục con, sử dụng

```javascript
> debug.vmodule("p2p/*=5")
```

Nếu bạn muốn giới hạn thư trong một gói cụ thể (*ví dụ:*, p2p) nhưng loại trừ các thư mục con, sử dụng

```javascript
> debug.vmodule("p2p=4")
```

Nếu bạn muốn xem tin nhắn nhật ký từ một tệp nguồn cụ thể, hãy sử dụng

```javascript
> debug.vmodule("server.go=3")
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_vmodule","params":["p2p=4"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```

