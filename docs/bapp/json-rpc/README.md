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

