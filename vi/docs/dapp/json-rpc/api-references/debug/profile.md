# Đang cấu hình <a id="profiling"></a>

## debug_blockProfile <a id="debug_blockprofile"></a>

Bật cấu hình khối trong khoảng thời gian nhất định và ghi dữ liệu cấu hình vào đĩa. Nó sử dụng tốc độ cấu hình là 1 để có thông tin chính xác nhất. Nếu yêu cầu một tốc độ khác, hãy thiết lập tỷ lệ và cấu hình theo cách thủ công bằng cách sử dụng [debug_writeBlockProfile](#debug_writeblockprofile).

|   Khách hàng    | Gọi Phương thức                                                |
|:---------------:| -------------------------------------------------------------- |
| Bảng điều khiển | `debug.blockProfile(file, seconds)`                            |
|       RPC       | `{"method": "debug_blockProfile", "params": [string, number]}` |

**Tham số**

| Tên     | Loại  | Mô tả                               |
| ------- | ----- | ----------------------------------- |
| tệp tin | chuỗi | Tên tệp cho kết quả hồ sơ.          |
| giây    | int   | Thời lượng cấu hình tính bằng giây. |

**Giá trị Trả về**

Không có

**Ví dụ**

Bảng điều khiển
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

Bật cấu hình CPU trong khoảng thời gian nhất định và ghi dữ liệu cấu hình vào đĩa.

|   Khách hàng    | Gọi Phương thức                                              |
|:---------------:| ------------------------------------------------------------ |
| Bảng điều khiển | `debug.cpuProfile(file, seconds)`                            |
|       RPC       | `{"method": "debug_cpuProfile", "params": [string, number]}` |

**Tham số**

| Tên     | Loại  | Mô tả                               |
| ------- | ----- | ----------------------------------- |
| tệp tin | chuỗi | Tên tệp cho kết quả cấu hình.       |
| giây    | int   | Thời lượng cấu hình tính bằng giây. |

**Giá trị Trả về**

Không có

**Ví dụ**

Bảng điều khiển
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

Bật cấu hình mutex cho nsec (nano giây) và ghi dữ liệu cấu hình vào tệp. Nó sử dụng tốc độ cấu hình là 1 để có thông tin chính xác nhất. Nếu muốn một tốc độ khác, hãy thiết lập tốc độ và cấu hình theo cách thủ công.

|   Khách hàng    | Gọi Phương thức                                                |
|:---------------:| -------------------------------------------------------------- |
| Bảng điều khiển | `debug.mutexProfile(file, seconds)`                            |
|       RPC       | `{"method": "debug_mutexProfile", "params": [string, number]}` |

**Tham số**

| Tên     | Loại | Mô tả                               |
| ------- | ----- | ----------------------------------- |
| tệp tin | chuỗi | Tên tệp cho kết quả cấu hình.       |
| giây    | int   | Thời lượng cấu hình tính bằng giây. |

**Giá trị Trả về**

Không có

**Ví dụ**

Bảng điều khiển
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

Trả về `true` nếu máy chủ HTTP pprof đang chạy và trả về `false` nếu không phải.

|   Khách hàng    | Gọi Phương thức                                    |
|:---------------:| -------------------------------------------------- |
| Bảng điều khiển | `debug.isPProfRunning()`                           |
|       RPC       | `{"method": "debug_isPProfRunning", "params": []}` |

**Tham số**

Không có

**Giá trị Trả về**

| Loại | Mô tả                                                              |
| ---- | ------------------------------------------------------------------ |
| bool | `true` nếu máy chủ HTTP pprof đang chạy và `false` nếu không phải. |

**Ví dụ**

Bảng điều khiển
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

Đặt tốc độ (tính bằng mẫu/giây) của việc thu thập dữ liệu cấu hình khối goroutine. Một tốc độ khác 0 cho phép định hình khối, đặt nó thành 0 sẽ dừng cấu hình. Dữ liệu cấu hình được thu thập có thể được viết bằng cách sử dụng [debug_writeBlockProfile](#debug_writeblockprofile).

|   Khách hàng    | Gọi Phương thức                                               |
|:---------------:| ------------------------------------------------------------- |
| Bảng điều khiển | `debug.setBlockProfileRate(rate)`                             |
|       RPC       | `{"method": "debug_setBlockProfileRate", "params": [number]}` |

**Tham số**

| Tên    | Loại | Mô tả                               |
| ------ | ----- | ----------------------------------- |
| tốc độ | int   | Tốc độ cấu hình tính bằng mẫu/giây. |

**Giá trị Trả về**

Không có

**Ví dụ**

Bảng điều khiển
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

Bật cấu hình CPU vô thời hạn, ghi vào tệp đã cho.

|   Khách hàng    | Gọi Phương thức                                           |
|:---------------:| --------------------------------------------------------- |
| Bảng điều khiển | `debug.startCPUProfile(file)`                             |
|       RPC       | `{"method": "debug_startCPUProfile", "params": [string]}` |

**Tham số**

| Tên     | Loại  | Mô tả                        |
| ------- | ----- | ---------------------------- |
| tệp tin | chuỗi | Tên tệp cho đầu ra cấu hình. |

**Giá trị Trả về**

Không có

**Ví dụ**

Bảng điều khiển

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

Tắt cấu hình CPU.

|   Khách hàng    | Gọi Phương thức                                    |
|:---------------:| -------------------------------------------------- |
| Bảng điều khiển | `debug.stopCPUProfile()`                           |
|       RPC       | `{"method": "debug_stopCPUProfile", "params": []}` |

**Tham số**

Không có

**Giá trị Trả về**

Không có

**Ví dụ**

Bảng điều khiển
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

Starts the pprof HTTP server.  The running pprof server can be accessed by (when the default configuration, i.e., localhost:6060, is used):
- http://localhost:6060/debug/pprof (for the pprof results)
- http://localhost:6060/memsize/ (for the memory size reports)
- http://localhost:6060/debug/vars (for the metrics)

| Client  | Method Invocation                                            |
|:-------:| ------------------------------------------------------------ |
| Console | `debug.startPProf(address, port)`                            |
|   RPC   | `{"method": "debug_startPProf", "params": [string, number]}` |

**Parameters**

| Name    | Type   | Description                                                              |
| ------- | ------ | ------------------------------------------------------------------------ |
| address | string | (optional) pprof HTTP server listening interface (default: "127.0.0.1"). |
| port    | int    | (optional) pprof HTTP server listening port (default: 6060).             |

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

Stops the pprof HTTP server.

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

Writes a goroutine blocking profile to the given file.

| Client  | Method Invocation                                           |
|:-------:| ----------------------------------------------------------- |
| Console | `debug.writeBlockProfile(file)`                             |
|   RPC   | `{"method": "debug_writeBlockProfile", "params": [string]}` |

**Tham số**

| Tên     | Loại  | Mô tả                        |
| ------- | ----- | ---------------------------- |
| tệp tin | chuỗi | Tên tệp cho đầu ra cấu hình. |

**Giá trị Trả về**

Không có

**Ví dụ**

Bảng điều khiển
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

Viết một cấu hình phân bổ vào tệp đã cho.  Lưu ý rằng tốc độ cấu hình không thể được đặt thông qua API, nó phải được đặt trên dòng lệnh bằng cách sử dụng cờ `--memprofilerate`.

|   Khách hàng    | Gọi Phương thức                                           |
|:---------------:| --------------------------------------------------------- |
| Bảng điều khiển | `debug.writeMemProfile(file)`                             |
|       RPC       | `{"method": "debug_writeMemProfile", "params": [string]}` |

**Tham số**

| Tên     | Loại  | Mô tả                        |
| ------- | ----- | ---------------------------- |
| tệp tin | chuỗi | Tên tệp cho đầu ra cấu hình. |

**Giá trị Trả về**

Không có

**Ví dụ**

Bảng điều khiển
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

Viết một cấu hình khối goroutine vào tệp đã cho.

|   Khách hàng    | Gọi Phương thức                                             |
|:---------------:| ----------------------------------------------------------- |
| Bảng điều khiển | `debug.writeMutexProfile(file)`                             |
|       RPC       | `{"method": "debug_writeMutexProfile", "params": [string]}` |

**Tham số**

| Tên     | Loại  | Mô tả                        |
| ------- | ----- | ---------------------------- |
| tệp tin | chuỗi | Tên tệp cho đầu ra cấu hình. |

**Giá trị Trả về**

Không có

**Ví dụ**

Bảng điều khiển
```javascript
> debug.writeMutexProfile("mutex.profile")
null
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_writeMutexProfile","params":["mutex.profile"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```