---
description: >-
  API để kiểm soát nút Klaytn.
---

# Quản trị viên Namespace <a id="namespace-admin"></a>

`Quản trị viên` namespace cung cấp cho bạn quyền truy cập vào một số phương thức RPC không chuẩn. Họ sẽ cho phép bạn quyền kiểm soát chi tiết đối với phiên bản Klaytn của bạn, bao gồm nhưng không giới hạn đối với mạng ngang hàng và quản lý điểm cuối RPC.


## admin_nodeInfo <a id="admin_nodeinfo"></a>

Có thể truy vấn thuộc tính quản trị `nodeInfo` đối với tất cả thông tin đã biết về nút Klaytn đang chạy ở mức độ chi tiết của mạng. Chúng bao gồm thông tin chung về nút như một thành phần tham gia của [devp2p](https://github.com/ethereum/devp2p/blob/master/README.md) P2P giao thức phủ, cũng như thông tin chuyên biệt được thêm vào bởi mỗi giao thức ứng dụng đang chạy, e.g., `klay`.

|   Khách hàng    | Gọi phương thức                |
|:---------------:| ------------------------------ |
| Bảng điều khiển | `admin.nodeInfo`               |
|       RPC       | `{"method": "admin_nodeInfo"}` |

**Tham số**

Không có

**Giá trị Trả về**

| Loại      | Mô tả          |
| ---------- | -------------- |
| Chuỗi JSON | Thông tin nút. |

**Ví dụ**

Bảng điều khiển
```javascript
> admin.nodeInfo
{
   kni: "kni://0bbff960d26fc12a5153ac25d7aaffd654e073a74a8b1aa65034250d47fac610ebe99a83d21d741c6121a32fb01312b49fc0633ae04e80c5eb73c3bc71c5a850@[::]:32323?discport=0",
   id: "0bbff960d26fc12a5153ac25d7aaffd654e073a74a8b1aa65034250d47fac610ebe99a83d21d741c6121a32fb01312b49fc0633ae04e80c5eb73c3bc71c5a850",
   ip: "::",
   listenAddr: "[::]:32323",
   name: "Klaytn/validator-1/vX.X.X/XXXX-XXXX/goX.X.X",
   ports: {
     discovery: 0,
     listener: 32323
   },
   protocols: {
     istanbul: {
       config: {
         chainId: 2018,
         isBFT: true,
         istanbul: {...},
         unitPrice: 0
       },
       difficulty: 52794,
       genesis: "0x42824367c973785245923a712cf2e5a99aae6a26f44e4f1ec686a0e60986644e",
       head: "0x4c3000a6f8c40b0507d8ee4a3fc5c9865df0a8d66f882366ea95473c87342005",
       network: 2017
     }
   }
}
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_nodeInfo","id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,
"result":               {"id":"377ef808aff73a397d133b3bf160df586054c98c0e6a65c8fce9560e6a0632bc975419f461803d27f28ee270287113cc2359225814debc1bfb2f811061e14c5d", "name":"Klaytn/vvX.X.X/XXXX-XXXX/goX.X.X",    "kni":"kni://377ef808aff73a397d133b3bf160df586054c98c0e6a65c8fce9560e6a0632bc975419f461803d27f28ee270287113cc2359225814debc1bfb2f811061e14c5d@[::]:32323?discport=0",
"ip":"::",
"ports":{"discovery":0,"listener":32323},
"listenAddr":"[::]:32323",
"protocols":{"istanbul":{"network":1000,"difficulty":1,"genesis":"0x06806bd8b1e086dfb7098a289da07037a3af58e793d205d20f61c88eeea9351d","config":{"chainId":1000,"istanbul":{"epoch":30000,"policy":0,"sub":7},"isBFT":true,"unitPrice":25000000000,"deriveShaImpl":0},"head":"0x06806bd8b1e086dfb7098a289da07037a3af58e793d205d20f61c88eeea9351d"}}}}
```


## admin_datadir <a id="admin_datadir"></a>

Có thể truy vấn thuộc tính quản trị `datadir` cho đường dẫn tuyệt đối của nút Klaytn đang chạy hiện đang sử dụng để lưu trữ tất cả các cơ sở dữ liệu của nó. Đường dẫn mặc định khác nhau tùy thuộc vào loại nút (kcn, kpn và ken) và loại hệ điều hành.

|   Khách hàng    | Gọi phương thức               |
|:---------------:| ----------------------------- |
| Bảng điều khiển | `admin.datadir`               |
|       RPC       | `{"method": "admin_datadir"}` |

**Tham số**

Không có

**Giá trị Trả về**

| Loại  | Mô tả                |
| ----- | -------------------- |
| chuỗi | Đường dẫn `datadir`. |

**Ví dụ**

Bảng điều khiển

```javascript
> admin.datadir
"/home/user/Library/KEN"
```
HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_datadir","id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":"/your/dir/ken/data/dd"}
```


## admin_peers <a id="admin_peers"></a>

Có thể truy vấn thuộc tính quản trị `peers` đối với tất cả thông tin đã biết về các nút từ xa được kết nối ở mức độ chi tiết của mạng. Chúng bao gồm thông tin chung về nút như một thành phần tham gia của [devp2p](https://github.com/ethereum/devp2p/blob/master/README.md) giao thức phủ P2P cũng như thông tin chuyên biệt được thêm vào bởi mỗi giao thức ứng dụng đang chạy.

|   Khách hàng    | Gọi phương thức             |
|:---------------:| --------------------------- |
| Bảng điều khiển | `admin.peers`               |
|       RPC       | `{"method": "admin_peers"}` |

**Tham số**

Không có

**Giá trị Trả về**

| Loại       | Mô tả                                                 |
| ---------- | ----------------------------------------------------- |
| Chuỗi JSON | Thông tin về tất cả các mạng ngang hàng được kết nối. |

**Ví dụ**

Bảng điều khiển

```javascript
> admin.peers
[{
    caps: ["istanbul/64"],
    id: "5d73afadf1eb4d6ccd1e10ab0f00301a1642b102fb521f170f4eaa4b3cb9a58788d1e2b387d6ce3726cb4786d034feb7dd17b5055b6d9a888520011e5756c89e",
    name: "Klaytn/validator-3/vX.X.X/XXXX-XXXX/goX.X.X",
    network: {
      inbound: true,
      localAddress: "127.0.0.1:32323",
      nodeType: "cn",
      remoteAddress: "127.0.0.1:63323",
      static: false,
      trusted: false
    },
    protocols: {
      istanbul: {
        difficulty: 52794,
        head: "0x4c3000a6f8c40b0507d8ee4a3fc5c9865df0a8d66f882366ea95473c87342005",
        version: 64
      }
    }
},  /* ... */ {
    caps: ["istanbul/64"],
    id: "8bcf4297aa6bb46121bb20a18b7af8f1eaad7e7435c71cb64109511a73c5507744bca138ee76b52d06cecedde9d88fdfddbffc5c3b80c5cbace3c326d5df5f1f",
    name: "Klaytn/validator-2/vX.X.X/XXXX-XXXX/goX.X.X",
    networks: [{
      inbound: true,
      localAddress: "127.0.0.1:32323",
      nodeType: "cn",
      remoteAddress: "127.0.0.1:63247",
      static: false,
      trusted: false
    }],
    protocols: {
      istanbul: {
        difficulty: 52794,
        head: "0x4c3000a6f8c40b0507d8ee4a3fc5c9865df0a8d66f882366ea95473c87342005",
        version: 64
      }
    }
}]
```
HTTP RPC

**LƯU Ý**: Tất cả các địa chỉ IP bên dưới được hiển thị làm ví dụ. Vui lòng thay thế chúng bằng địa chỉ IP thực tế trong môi trường triển khai của bạn.

```shell
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_peers","id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":[{"id":"144af69d2bb030c6a2a5ceee7445dc613e200f19358547cffc353d56e6c8a5b4186a6953c028b6afd0ab3c2bfc4c86f24b0bf855d0686b964ec65cefd3deec37","name":"Klaytn/vvX.X.X/XXXX-XXXX/goX.X.X","caps":["istanbul/64"],"network":{"localAddress":"10.0.10.1:49355","remoteAddress":"10.0.0.1:32323","inbound":false,"trusted":false,"static":true},"protocols":{"istanbul":{"version":64,"difficulty":1285901,"head":"0x2d04ac52df4af08a9a0e15d5939c29decb00031e7b3f6abd05bc0c731f6b5561"}}},{"id":"a875620f67f0b12edb97d0ec269e7940f2505b1f62576f39858c37e1d7f956318c3a619239f03f806a79ccaa8e7e9b5def343c24a9fd2e9d715964e0952dd995","name":"Klaytn/vvX.X.X/XXXX-XXXX/goX.X.X","caps":["istanbul/64"],"networks":[{"localAddress":"10.0.10.2:49353","remoteAddress":"10.0.0.2:32323","inbound":false,"trusted":false,"static":true}],"protocols":{"istanbul":{"version":64,"difficulty":1285901,"head":"0x2d04ac52df4af08a9a0e15d5939c29decb00031e7b3f6abd05bc0c731f6b5561"}}},{"id":"e18d6d4e0ffac0a51028a8d49a548295ac8ac50d064f3581600799a3ae761a61f0b39c38b4195e163e01f30db616debf61b5b2ddea716bc8fb1c907ce7a1de26","name":"Klaytn/vvX.X.X/XXXX-XXXX/goX.X.X","caps":["istanbul/64"],"network":{"localAddress":"10.0.10.3:49354","remoteAddress":"10.0.0.3:32323","inbound":false,"trusted":false,"static":true},"protocols":{"istanbul":{"version":64,"difficulty":1285900,"head":"0x2e228a45c7c9b9e6729b6c66b31957d6cb62ce53e32cedf156615a4e8a2e253a"}}}]}
```


## admin_addPeer <a id="admin_addpeer"></a>

`addPeer` là một phương thức quản trị yêu cầu thêm một nút từ xa mới vào danh sách các nút tĩnh được theo dõi. Nút sẽ cố gắng duy trì kết nối với các nút này mọi lúc, thỉnh thoảng kết nối lại nếu kết nối từ xa bị hỏng.

Phương thức chấp nhận một đối số duy nhất kni, nghĩa là "Định danh mạng Klaytn". Nó tương tự với khái niệm [`enode`](https://github.com/ethereum/wiki/wiki/enode-url-format) trong geth. Đó là URL của máy ngang hàng từ xa để bắt đầu theo dõi và trả về `BOOL` cho biết máy ngang hàng đó có được chấp nhận để theo dõi hoặc đã lỗi xảy ra hay không.

|   Khách hàng    | Gọi phương thức                                |
|:---------------:| ---------------------------------------------- |
| Bảng điều khiển | `admin.addPeer(url)`                           |
|       RPC       | `{"method": "admin_addPeer", "params": [url]}` |

**Tham số**

| Tên | Loại  | Mô tả                     |
| --- | ----- | ------------------------- |
| url | chuỗi | URL `kni` của ngang hàng. |

**Giá trị Trả về**

| Loại | Mô tả                                                 |
| ---- | ----------------------------------------------------- |
| bool | `đúng` nếu đồng đẳng được chấp nhận, `sai` nếu không. |

**Ví dụ**

Bảng điều khiển
```javascript
> admin.addPeer("kni://a979fb575495b8d6db44f750317d0f4622bf4c2aa3365d6af7c284339968eef29b69ad0dce72a4d8db5ebb4968de0e3bec910127f134779fbcb0cb6d3331163c@10.0.0.1:32323") //Đây là một địa chỉ ví dụ.
đúng
```
HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_addPeer","params":["kni://a979fb575495b8d6db44f750317d0f4622bf4c2aa3365d6af7c284339968eef29b69ad0dce72a4d8db5ebb4968de0e3bec910127f134779fbcb0cb6d3331163c@10.0.0.1:32323"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":true}
```


## admin_removePeer <a id="admin_removepeer"></a>

`removePeer` là một phương thức quản trị yêu cầu xóa một nút khỏi danh sách nút tĩnh được theo dõi.

Phương thức chấp nhận một đối số duy nhất kni, nghĩa là "Định danh mạng Klaytn". Nó tương tự với khái niệm [`enode`](https://github.com/ethereum/wiki/wiki/enode-url-format) trong geth. Đó là URL của máy ngang hàng từ xa sẽ bị xóa khỏi danh sách và trả về `BOOL` cho biết liệu máy ngang hàng đã bị xóa hay xảy ra lỗi nào đó.

|   Khách hàng    | Gọi phương thức                                   |
|:---------------:| ------------------------------------------------- |
| Bảng điều khiển | `admin.removePeer(url)`                           |
|       RPC       | `{"method": "admin_removePeer", "params": [url]}` |

**Tham số**

| Tên | Loại  | Mô tả                     |
| --- | ----- | ------------------------- |
| url | chuỗi | URL `kni` của ngang hàng. |

**Giá trị Trả về**

| Loại | Mô tả                                                 |
| ---- | ----------------------------------------------------- |
| bool | `đúng` nếu đồng đẳng được chấp nhận, `sai` nếu không. |

**Ví dụ**

Bảng điều khiển
```javascript
> admin.removePeer("kni://a979fb575495b8d6db44f750317d0f4622bf4c2aa3365d6af7c284339968eef29b69ad0dce72a4d8db5ebb4968de0e3bec910127f134779fbcb0cb6d3331163c@10.0.0.1:32323") //Đây là một địa chỉ ví dụ.
đúng
```
HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_removePeer","params":["kni://a979fb575495b8d6db44f750317d0f4622bf4c2aa3365d6af7c284339968eef29b69ad0dce72a4d8db5ebb4968de0e3bec910127f134779fbcb0cb6d3331163c@10.0.0.1:32323"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":true}
```

## admin_startHTTP <a id="admin_starthttp"></a>

**LƯU Ý**: API này thay thế cho `admin_startRPC`. `admin_startRPC` sẽ sớm ngừng hoạt động.

`startHTTP` là phương pháp quản trị khởi động [JSON RPC](http://www.jsonrpc.org/specification) dựa trên HTTP Máy chủ web API để xử lý các yêu cầu của khách hàng.

Phương thức này trả về một cờ boolean chỉ định xem trình nghe HTTP RPC đã được mở hay chưa. Xin lưu ý rằng chỉ có một điểm cuối HTTP được phép hoạt động bất cứ lúc nào.

|   Khách hàng    | Gọi phương thức                                                     |
|:---------------:| ------------------------------------------------------------------- |
| Bảng điều khiển | `admin.startHTTP(host, port, cors, apis)`                           |
|       RPC       | `{"method": "admin_startHTTP", "params": [host, port, cors, apis]}` |

**Tham số**

| Tên     | Loại   | Mô tả                                                                                                                                   |
| ------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| máy chủ | chuỗi  | (tùy chọn) giao diện mạng để mở ổ cắm trình nghe (mặc định: `"localhost"`).                                                             |
| cổng    | int    | (optional) network port to open the listener socket on (default:  `8551`).                                                              |
| cors    | string | (optional) [cross-origin resource sharing](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) header to use (default:  `""`). |
| apis    | string | (optional) API modules to offer over this interface (default:  `"klay,net,rpc"`).                                                       |

**Return Value**

| Type | Description                                                 |
| ---- | ----------------------------------------------------------- |
| bool | `true` if the HTTP RPC listener was opened, `false` if not. |

**Example**

Console

```javascript
> admin.startHTTP("127.0.0.1", 8551)
true
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_startHTTP","id":1, "params":["127.0.0.1", 8551, "", "klay"]}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"error":{"code":-32000,"message":"HTTP RPC already running on 127.0.0.1:8551"}}
```


## admin_stopHTTP <a id="admin_stophttp"></a>

**NOTE**: This API replaces `admin_stopRPC`. The `admin_stopRPC` will be deprecated soon.

The `stopHTTP` is an administrative method that closes the currently open HTTP RPC endpoint. As the node can only have a single HTTP endpoint running, this method takes no parameters, returning a boolean whether the endpoint was closed or not.

| Client  | Method invocation              |
|:-------:| ------------------------------ |
| Console | `admin.stopHTTP()`             |
|   RPC   | `{"method": "admin_stopHTTP"}` |

**Tham số**

Không có

**Giá trị Trả về**

| Loại | Mô tả                                               |
| ---- | --------------------------------------------------- |
| bool | `đúng` nếu điểm cuối đã đóng, `sai` nếu không phải. |

**Ví dụ**

Bảng điều khiển

```javascript
> admin.stopHTTP()
true
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_stopHTTP","id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":true}
```


## admin_startWS <a id="admin_startws"></a>

The `startWS` là phương pháp quản trị khởi động [JSON RPC](http://www.jsonrpc.org/specification) dựa trên WebSocket Máy chủ web API để xử lý các yêu cầu của khách hàng.

Phương thức này trả về một cờ boolean chỉ định xem trình nghe WebSocket RPC đã được mở hay chưa. Xin lưu ý rằng chỉ có một điểm cuối WebSocket được phép hoạt động bất cứ lúc nào.

|   Khách hàng    | Gọi phương thức                                                   |
|:---------------:| ----------------------------------------------------------------- |
| Bảng điều khiển | `admin.startWS(host, port, cors, apis)`                           |
|       RPC       | `{"method": "admin_startWS", "params": [host, port, cors, apis]}` |

**Tham số**

| Tên     | Loại  | Mô tả                                                                                                                                              |
| ------- | ----- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| máy chủ | chuỗi | (tùy chọn) giao diện mạng để mở ổ cắm trình nghe (mặc định: `"localhost"`).                                                                        |
| cổng    | int   | (tùy chọn) cổng mạng để mở socket trình nghe (mặc định: `8552`).                                                                                   |
| cors    | chuỗi | (tùy chọn) [Tiêu đề chia sẻ tài nguyên trên nhiều nguồn](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) để sử dụng (mặc định: `""`). |
| apis    | chuỗi | (tùy chọn) các mô-đun API để cung cấp trên giao diện này (mặc định: `"klay,net,personal"`).                                                        |

**Giá trị Trả về**

| Loại | Mô tả                                                                 |
| ---- | --------------------------------------------------------------------- |
| bool | `đúng` nếu trình nghe WebSocket RPC đã được mở, `sai` nếu không phải. |

**Ví dụ**

Bảng điều khiển

```javascript
> admin.startWS("127.0.0.1", 8552)
true
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_startWS","params":["127.0.0.1", 8552, "", "klay"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":true}
```


## admin_stopWS <a id="admin_stopws"></a>

The `stopWS` is an administrative method that closes the currently open WebSocket RPC endpoint. As the node can only have a single WebSocket endpoint running, this method takes no parameters, returning a boolean whether the endpoint was closed or not.

| Client  | Method invocation            |
|:-------:| ---------------------------- |
| Console | `admin.stopWS()`             |
|   RPC   | `{"method": "admin_stopWS"}` |

**Parameters**

None

**Return Value**

| Type | Description                                        |
| ---- | -------------------------------------------------- |
| bool | `true` if the endpoint was closed, `false` if not. |

**Example**

Console

```javascript
> admin.stopWS()
true
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_stopWS","id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":true}
```


## admin_exportChain <a id="admin_exportchain"></a>

The `exportChain` is an administrative method that exports the blockchain to a file.

| Client  | Method invocation                                        |
|:-------:| -------------------------------------------------------- |
| Console | `admin.exportChain(fileName)`                            |
|   RPC   | `{"method": "admin_importChain"}, "params": [fileName]}` |

**Parameters**

| Name     | Type   | Description                                                                 |
| -------- | ------ | --------------------------------------------------------------------------- |
| fileName | string | the fully qualified path to the file where the blockchain must be exported. |

**Return Value**

| Type | Description                                   |
| ---- | --------------------------------------------- |
| bool | `true` if chain was exported, `false` if not. |

**Example**

Console

```javascript
> admin.exportChain("/tmp/chain.txt")
true
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_exportChain","params":["/tmp/chain.txt"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":true}
```


## admin_importChain <a id="admin_importchain"></a>

The `importChain` is an administrative method that imports an exported chain from a file into a node. This method imports only blocks that haven't existed in a Klaytn node. This method does not delete any data of the existing chain.

|   Khách hàng    | Gọi phương thức                                          |
|:---------------:| -------------------------------------------------------- |
| Bảng điều khiển | `admin.importChain(fileName)`                            |
|       RPC       | `{"method": "admin_importChain"}, "params": [fileName]}` |

**Tham số**

| Tên         | Loại  | Mô tả                                                   |
| ----------- | ----- | ------------------------------------------------------- |
| tên tệp tin | chuỗi | đường dẫn đủ điều kiện đến tệp chứa chuỗi sẽ được nhập. |

**Giá trị Trả về**

| Loại | Mô tả                                                |
| ---- | ---------------------------------------------------- |
| bool | `đúng` nếu chuỗi đã được nhập, `sai` nếu không phải. |

**Ví dụ**

Bảng điều khiển

```javascript
> admin.importChain("/tmp/chain.txt")
true
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_importChain","params":["/tmp/chain.txt"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":true}
```

## admin_importChainFromString <a id="admin_importchainfromstring"></a>

The `importChainFromString` là phương pháp quản trị nhập chuỗi từ chuỗi khối được mã hóa RLP vào nút Klaytn. Nó chỉ hoạt động nếu chưa có chuỗi hiện có nào trong nút Klaytn. Phương pháp này không xóa bất kỳ dữ liệu nào của chuỗi hiện có.

|   Khách hàng    | Gọi phương thức                                                            |
|:---------------:| -------------------------------------------------------------------------- |
| Bảng điều khiển | `admin.importChainFromString(blockRlp)`                                    |
|       RPC       | `{"method": "admin_importChainFromString"}, "params": [<blockRlp>]}` |

**Tham số**

| Tên      | Loại  | Mô tả                                                                                                |
| -------- | ----- | ---------------------------------------------------------------------------------------------------- |
| blockRlp | chuỗi | chuỗi được mã hóa RLP đại diện cho các khối được nhập. (bằng giá trị trả về của `debug.getBlockRlp`) |

**Giá trị Trả về**

| Loại | Mô tả                                                    |
| ---- | -------------------------------------------------------- |
| bool | `đúng` nếu chuỗi đã được nhập hoặc `sai` nếu không phải. |

**Ví dụ**

Bảng điều khiển

```javascript
> admin.importChainFromString("f9071...080c0")
true
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_importChainFromString","params":["f9071...080c0"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":true}
```

## admin_startStateMigration <a id="admin_startstatemigration"></a>

The `startStateMigration` is an administrative method that starts a state migration and removes old state/storage trie nodes. This can save the storage space of a Klaytn node. The method returns an error if it fails to start a state migration, or `null` if it succeeds to start. NOTE: After the state migration, the node cannot serve APIs with previous states.

| Client  | Method invocation                         |
|:-------:| ----------------------------------------- |
| Console | `admin.startStateMigration()`             |
|   RPC   | `{"method": "admin_startStateMigration"}` |

**Parameters**

None

**Return Value**

| Type  | Description                                                            |
| ----- | ---------------------------------------------------------------------- |
| Error | `null` if the state migration has started, or an error message if not. |

**Example**

Console

```javascript
> admin.startStateMigration()
null
```

HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_startStateMigration","id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```


## admin_stopStateMigration <a id="admin_stopstatemigration"></a>

The `stopStateMigration` is an administrative method that stops the currently running state migration. This method takes no parameters and returns `null` or an error whether the state migration was stopped or not.

| Client  | Method invocation                        |
|:-------:| ---------------------------------------- |
| Console | `admin.stopStateMigration()`             |
|   RPC   | `{"method": "admin_stopStateMigration"}` |

**Parameters**

None

**Return Value**

| Type  | Description                                                   |
| ----- | ------------------------------------------------------------- |
| Error | `null` if the state migration is stopped, or an error if not. |


**Example**

Console

```javascript
> admin.stopStateMigration()
true
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_stopStateMigration","id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```

## admin_stateMigrationStatus <a id="admin_statemigrationstatus"></a>

The `stateMigrationStatus` is an administrative method that returns the status information of the state migration. This method takes no parameters and returns the status of the currently running state migration.

|     Client      | Method invocation                          |
|:---------------:| ------------------------------------------ |
| Bảng điều khiển | `admin.stateMigrationStatus`               |
|       RPC       | `{"method": "admin_stateMigrationStatus"}` |

**Tham số**

Không có

**Giá trị Trả về**

| Tên                  | Loại    | Mô tả                                                                                                       |
| -------------------- | ------- | ----------------------------------------------------------------------------------------------------------- |
| đã lưu trữ           | int     | `committed` là số nút trie đã được sao chép bởi quá trình di chuyển trạng thái.                             |
| err                  | Lỗi     | `null` nếu quá trình di chuyển trạng thái kết thúc tốt đẹp hoặc lỗi nếu không phải.                         |
| isMigration          | bool    | `đúng` nếu quá trình di chuyển trạng thái đang chạy hoặc `sai` nếu không phải.                              |
| migrationBlockNumber | uint64  | blockNumber mà quá trình di chuyển trạng thái bắt đầu. (`0` nếu quá trình di chuyển trạng thái không chạy.) |
| đang chờ             | int     | `pending` đại diện cho số lượng nút trie chưa được xử lý bởi quá trình di chuyển trạng thái.                |
| tiến trình           | float64 | `progress` là tiến trình di chuyển trạng thái được tính bằng phần trăm.                                     |
| đọc                  | int     | `read` biểu thị số trie nút đã được đọc bởi quá trình di chuyển trạng thái.                                 |

**Ví dụ**

Bảng điều khiển

```javascript
> admin.stateMigrationStatus
{
  committed: 1585169,
  err: "null",
  isMigration: true,
  migrationBlockNumber: 32527233,
  pending: 27677,
  progress: 0.3662109375,
  read: 1587473
}
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_stateMigrationStatus","id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":{"committed":14995692,"err":"null","isMigration":true,"migrationBlockNumber":32630836,"pending":19699,"progress":25,"read":14997777}}
```

## admin_saveTrieNodeCacheToDisk <a id="admin_saveTrieNodeCacheToDisk"></a>

`saveTrieNodeCacheToDisk` là một phương pháp quản trị bắt đầu lưu nút trie đã lưu trong bộ nhớ cache vào đĩa để sử dụng lại chúng khi nút khởi động lại. Dữ liệu nút trie đã lưu trong bộ nhớ cache sẽ được lưu trữ và tải từ `$DATA_DIR/fastcache` . Phương thức này trả về lỗi nếu quá trình lưu đã được kích hoạt hoặc bộ nhớ đệm nút trie bị tắt. Tính năng này được hỗ trợ kể từ Klaytn 1.5.3.

|   Khách hàng    | Gọi phương thức                               |
|:---------------:| --------------------------------------------- |
| Bảng điều khiển | `admin.saveTrieNodeCacheToDisk()`             |
|       RPC       | `{"method": "admin_saveTrieNodeCacheToDisk"}` |

**Tham số**

Không có

**Return Value**

| Type  | Description                                                             |
| ----- | ----------------------------------------------------------------------- |
| Error | `null` if saving the trie node has started, or an error message if not. |

**Example**

Console

```javascript
> admin.saveTrieNodeCacheToDisk()
null
```

HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_saveTrieNodeCacheToDisk", "id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```

## admin_setMaxSubscriptionPerWSConn <a id="admin_setMaxSubscriptionPerWSConn"></a>

The `setMaxSubscriptionPerWSConn` is an administrative method that sets the maximum allowed number of subscriptions per single WebSocket connection. For example, if the maximum number is set to five and a user requests more than five subscriptions through the `klay_subscribe` API, an error message "Maximum 5 subscriptions are allowed for a WebSocket connection" will be displayed. This feature is supported since Klaytn 1.6.0.

| Client  | Method invocation                                 |
|:-------:| ------------------------------------------------- |
| Console | `admin.setMaxSubscriptionPerWSConn(limit)`        |
|   RPC   | `{"method": "admin_setMaxSubscriptionPerWSConn"}` |

**Parameters**

| Name  | Type | Description                                                                  |
| ----- | ---- | ---------------------------------------------------------------------------- |
| limit | int  | The maximum allowed number of subscriptions per single WebSocket connection. |

**Return Value**

| Type  | Description                                                                      |
| ----- | -------------------------------------------------------------------------------- |
| Error | `null` if the limit is set successfully; otherwise, it returns an error message. |

**Example**

Console

```javascript
> admin.setMaxSubscriptionPerWSConn(5)
null
```

HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_setMaxSubscriptionPerWSConn", "params":[5], "id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":null}
```
