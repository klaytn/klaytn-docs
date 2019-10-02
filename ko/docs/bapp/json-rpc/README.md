# 소개

This document explains how to use Klaytn APIs. Most APIs except Toolkit API support remote protocols \(RPC, Websocket\) and Klaytn JavaScript Console. This document is written with `ken` as an example but most of APIs can be used on `kcn` and `kpn` as well.

**NOTE**: Since few APIs do not support both of remote protocols and Klaytn JavaScript console, APIs available in remote protocols are documented mainly. Rest of APIs will be documented later.

## API 활성화

To offer the APIs over the Klaytn RPC endpoints, please specify them with the `--${interface}api` command line argument where `${interface}` can be `rpc` for the HTTP endpoint or `ws` for the WebSocket endpoint.

`ipc` offers all APIs over the unix socket \(Unix\) or named pipe \(Windows\) endpoint without any flag.

아래 예시처럼 추가하고자 하는 특정 API와 함께 Klaytn 노드를 실행할 수 있습니다. 하지만 노드를 시작한 이후에는 API를 변경할 수 없다는 점을 유의해주세요.

Example\) launching a Klaytn node with `klay` and `net` modules enabled:

```bash
$ ken --rpcapi klay,net --rpc --{other options}
```

HTTP RPC 인터페이스는 `--rpc` 플래그를 사용해 명시적으로 활성화해야 합니다.

**NOTE**: Offering an API over the HTTP \(`rpc`\) or WebSocket \(`ws`\) interfaces will give everyone access to the APIs who can access this interface \(DApps, browser tabs, etc\). Be careful which APIs you enable. By default Klay enables all APIs over the IPC \(`ipc`\) interface but for `rpc` and `ws` required modules have to be explicitly enabled.

`modules` JSON-RPC 메서드를 호출하여 인터페이스가 제공하는 API를 확인하세요. For example over an `rpc` interface:

**IPC**

```bash
$ echo '{"jsonrpc":"2.0","method":"rpc_modules","params":[],"id":1}' | nc -U klay.ipc
```

**HTTP**

```bash
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"rpc_modules","params":[],"id":1}' http://localhost:8551
```

위 명령은 버전 번호를 포함하여 모든 활성화된 모듈을 제공합니다.

```text
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

