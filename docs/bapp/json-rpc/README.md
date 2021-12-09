# Introduction <a id="introduction"></a>

This document explains how to use Klaytn APIs. Most APIs except Toolkit API support remote protocols \(RPC, Websocket\) and Klaytn JavaScript Console. This document is written with `ken` as an example but most of APIs can be used on `kcn` and `kpn` as well.

**NOTE**: Since few APIs do not support both of remote protocols and Klaytn JavaScript console, APIs available in remote protocols are documented mainly. Rest of APIs will be documented later.

## Enabling APIs <a id="enabling-apis"></a>

To offer the APIs over the Klaytn RPC endpoints, please specify them with the `--${interface}api` command line argument where `${interface}` can be `rpc` for the HTTP endpoint or `ws` for the WebSocket endpoint.

`ipc` offers all APIs over the unix socket \(Unix\) or named pipe \(Windows\) endpoint without any flag.

You can launch a Klaytn node with specific APIs you want to add like the example below. But keep in mind that you can't change APIs once you launch the node.

Example\) launching a Klaytn node with `klay` and `net` modules enabled:

```bash
$ ken --rpcapi klay,net --rpc --{other options}
```

The HTTP RPC interface must be explicitly enabled using the `--rpc` flag.

**NOTE**: Offering an API over the HTTP \(`rpc`\) or WebSocket \(`ws`\) interfaces will give everyone access to the APIs who can access this interface \(DApps, browser tabs, etc\). Be careful which APIs you enable. By default Klay enables all APIs over the IPC \(`ipc`\) interface but for `rpc` and `ws` required modules have to be explicitly enabled.

To determine which APIs an interface provides, the `modules` JSON-RPC method can be invoked. For example over an `rpc` interface:

**IPC**

```bash
$ echo '{"jsonrpc":"2.0","method":"rpc_modules","params":[],"id":1}' | nc -U klay.ipc
```

**HTTP**

```bash
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"rpc_modules","params":[],"id":1}' http://localhost:8551
```

will give all enabled modules including the version number:

```text
{
   "jsonrpc":"2.0",
   "id":1,
   "result":{
      "admin":"1.0",
      "debug":"1.0",
      "istanbul":"1.0",
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

## 요청 형식

Klaytn의 JSON-RPC API 설명에 공통적으로 사용되는 요청 형식에 대해 설명드리겠습니다. 우선 형식은 아래와 같습니다.

```
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"{method}","params":[],"id":1}' http://localhost:8551
```

우선 `-H` 이후에 나오는 헤더 포함되는 내용은 다음과 같습니다.

- `Content-Type: application/json`는 전달되는 데이터의 형식이 JSON이라는 뜻입니다.

`--data`에 포함되는 내용을 살펴보겠습니다.

- `"jsonrpc":"2.0"`는 사용되는 JSON-RPC 프로토콜의 버전이 2.0라는 뜻입니다.
- `method`는 사용할 JSON-RPC 메서드를 뜻합니다.
- `"params":[]`에는 사용할 메서드에 따라 파라미터를 전달합니다. 특정 주소의 계정 정보를 반환하는 경우로 예를 들어 보겠습니다. 이때 파라미터로 조회할 주소와 블록번호가 전달되는데, 이는 다음과 같습니다. `"params":["0x3111a0577f322e8fb54f78d9982a26ae7ca0f722", "latest"]`
- `"id":1`는 요청을 구분할 식별자입니다.

API 참조 문서에는 각 메서드의 ("params"에 해당하는) 파라미터에 대한 설명만 포함되어 있음을 참고해주세요.
