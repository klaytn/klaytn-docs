# API JSON-RPC

Nút điểm cuối thể hiện các API JSON-RPC. Bạn có thể kích hoạt/vô hiệu hóa các API như sau. Để biết thông số API chi tiết, vui lòng tham khảo [API JSON-RPC](../../references/json-rpc/json-rpc.md).

**LƯU Ý**: Việc cung cấp API qua giao diện HTTP (`rpc`) hoặc WebSocket (`ws`) sẽ cấp cho mọi người quyền truy cập vào các API có thể truy cập giao diện này (DApps, trình duyệt tab, v. v). Hãy thận trọng với những API bạn kích hoạt. Theo mặc định, Klaytn kích hoạt tất cả các API trên giao diện IPC (`ipc`) nhưng đối với `rpc` và `ws` các mô-đun bắt buộc phải được bật.

## Kích hoạt API  <a id="enabling-apis"></a>

### Từ dòng lệnh <a id="from-commandline"></a>
Để cung cấp API qua các điểm cuối Klaytn RPC, vui lòng chỉ định chúng bằng đối số dòng lệnh `--${interface}api` trong đó `${interface}` có thể là `rpc` cho điểm cuối HTTP hoặc `ws` cho điểm cuối WebSocket.

`ipc` cung cấp tất cả các API trên ổ cắm unix (Unix) hoặc điểm cuối ống dẫn có tên (Windows) mà không có bất kỳ cờ nào.

Bạn có thể khởi chạy nút Klaytn với các API cụ thể mà bạn muốn thêm như ví dụ bên dưới. Nhưng hãy nhớ rằng bạn không thể thay đổi API sau khi khởi chạy nút.

Ví dụ) khởi chạy một nút Klaytn có bật các mô-đun `klay` và `net`:

```shell
$ ken --rpcapi klay,net --rpc --{other options}
```

Giao diện HTTP RPC phải được bật bằng cách sử dụng cờ báo `--rpc`.

### Sử dụng cấu hình <a id="using-configuration"></a>

Vui lòng cập nhật thuộc tính `RPC_ENABLE`, `RPC_API`, `WS_ENABLE` và `WS_API` trong  [Tập tin cấu hình](../../misc/operation/configuration.md).

## Truy vấn API đã kích hoạt <a id="querying-enabled-apis"></a>

Để xác định API mà giao diện cung cấp, có thể gọi phương pháp `modules` JSON-RPC. Ví dụ: trên giao diện `rpc`:

**IPC**

```javascript
$ echo '{"jsonrpc":"2.0","method":"rpc_modules","params":[],"id":1}' | nc -U klay.ipc
```

**HTTP**

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"rpc_modules","params":[],"id":1}' https://public-en-baobab.klaytn.net
```

sẽ cung cấp cho bạn tất cả các mô-đun đã kích hoạt bao gồm cả số phiên bản:

```
{
   "jsonrpc":"2.0",
   "id":1,
   "result":{
      "admin":"1.0",
      "debug":"1.0",
      "klay":"1.0",
      "miner":"1.0",
      "net":"1.0",
      "personal":"1.0",
      "rpc":"1.0",
      "txpool":"1.0",
      "web3":"1.0"
   }
}
```

## Disabling unsafe debug APIs <a id="disabling-unsafe-debug-apis"></a>

Some debug namespace APIs are unsafe/unappropriate to be opened to public. We recommend you to provide the debug namespace APIs to authorized users only. However, if you want to maintain a public EN and provide debug namespace APIs to the public, we strongly recommend you to set the `rpc.unsafe-debug.disable` flag which will disable APIs that are unsafe/unappropriate to be opened to the public and enable only a subset of the debug namespace APIs.

The enabled APIs are as follows:

- [VM Tracing](../../references/json-rpc/debug/tracing.md) APIs, however with limited functionality (only [pre-defined tracers](../../references/json-rpc/debug/tracing.md#tracing-options) are allowed)
- debug_dumpBlock, debug_dumpStateTrie, debug_getBlockRlp, debug_getModifiedAccountsByHash, debug_getModifiedAccountsByNumber, debug_getBadBlocks, debug_getModifiedStorageNodesByNumber
- debug_metrics

To set the `rpc.unsafe-debug.disable` flag, append the following line in the `kend.conf` file.

```
ADDITIONAL="$ADDITIONAL --rpc.unsafe-debug.disable"
```
