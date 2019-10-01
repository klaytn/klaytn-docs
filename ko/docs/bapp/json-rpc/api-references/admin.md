---
description: >-
  APIs to control Klaytn node.
---

# Namespace admin

The namespace `admin` gives you access to several non-standard RPC methods, which will allow you to have fine-grained control over your Klaytn instance, including but not limited to network peer and RPC endpoint management.


## admin_nodeInfo

The `nodeInfo` administrative property can be queried for all the information known about the running Klaytn node at the networking granularity. These include general information about the node itself as a participant of the [devp2p](https://github.com/ethereum/devp2p/blob/master/README.md) P2P overlay protocol, as well as specialized information added by each of the running application protocols, e.g., `klay`.

| Client  | Method invocation              |
|:-------:| ------------------------------ |
| Console | `admin.nodeInfo`               |
|   RPC   | `{"method": "admin_nodeInfo"}` |

**Parameters**

None

**Return Value**

| 형식          | 설명                    |
| ----------- | --------------------- |
| JSON string | The node information. |

**예시**

Console
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
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_nodeInfo","id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,
"result":               {"id":"377ef808aff73a397d133b3bf160df586054c98c0e6a65c8fce9560e6a0632bc975419f461803d27f28ee270287113cc2359225814debc1bfb2f811061e14c5d", "name":"Klaytn/vvX.X.X/XXXX-XXXX/goX.X.X",    "kni":"kni://377ef808aff73a397d133b3bf160df586054c98c0e6a65c8fce9560e6a0632bc975419f461803d27f28ee270287113cc2359225814debc1bfb2f811061e14c5d@[::]:32323?discport=0",
"ip":"::",
"ports":{"discovery":0,"listener":32323},
"listenAddr":"[::]:32323",
"protocols":{"istanbul":{"network":1000,"difficulty":1,"genesis":"0x06806bd8b1e086dfb7098a289da07037a3af58e793d205d20f61c88eeea9351d","config":{"chainId":1000,"istanbul":{"epoch":30000,"policy":0,"sub":7},"isBFT":true,"unitPrice":25000000000,"deriveShaImpl":0},"head":"0x06806bd8b1e086dfb7098a289da07037a3af58e793d205d20f61c88eeea9351d"}}}}
```


## admin_datadir

The `datadir` administrative property can be queried for the absolute path the running Klaytn node currently uses to store all its databases. The default path is different depending on the node types (kcn, kpn, and ken) and the OS type.

| Client  | Method invocation             |
|:-------:| ----------------------------- |
| Console | `admin.datadir`               |
|   RPC   | `{"method": "admin_datadir"}` |

**Parameters**

None

**Return Value**

| 형식     | 설명                  |
| ------ | ------------------- |
| string | The `datadir` path. |

**예시**

Console

```javascript
> admin.datadir
"/home/user/Library/KEN"
```
HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_datadir","id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":"/your/dir/ken/data/dd"}
```


## admin_peers

The `peers` administrative property can be queried for all the information known about the connected remote nodes at the networking granularity. These include general information about the nodes themselves as participants of the [devp2p](https://github.com/ethereum/devp2p/blob/master/README.md) P2P overlay protocol, as well as specialized information added by each of the running application protocols.

| Client  | Method invocation           |
|:-------:| --------------------------- |
| Console | `admin.peers`               |
|   RPC   | `{"method": "admin_peers"}` |

**Parameters**

None

**Return Value**

| 형식          | 설명                                         |
| ----------- | ------------------------------------------ |
| JSON string | The information about all connected peers. |

**예시**

Console

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

**NOTE**: All IP addresses below are shown as examples. Please replace them with the actual IP addresses in your execution environment.

```shell
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_peers","id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":[{"id":"144af69d2bb030c6a2a5ceee7445dc613e200f19358547cffc353d56e6c8a5b4186a6953c028b6afd0ab3c2bfc4c86f24b0bf855d0686b964ec65cefd3deec37","name":"Klaytn/vvX.X.X/XXXX-XXXX/goX.X.X","caps":["istanbul/64"],"network":{"localAddress":"10.0.10.1:49355","remoteAddress":"10.0.0.1:32323","inbound":false,"trusted":false,"static":true},"protocols":{"istanbul":{"version":64,"difficulty":1285901,"head":"0x2d04ac52df4af08a9a0e15d5939c29decb00031e7b3f6abd05bc0c731f6b5561"}}},{"id":"a875620f67f0b12edb97d0ec269e7940f2505b1f62576f39858c37e1d7f956318c3a619239f03f806a79ccaa8e7e9b5def343c24a9fd2e9d715964e0952dd995","name":"Klaytn/vvX.X.X/XXXX-XXXX/goX.X.X","caps":["istanbul/64"],"networks":[{"localAddress":"10.0.10.2:49353","remoteAddress":"10.0.0.2:32323","inbound":false,"trusted":false,"static":true}],"protocols":{"istanbul":{"version":64,"difficulty":1285901,"head":"0x2d04ac52df4af08a9a0e15d5939c29decb00031e7b3f6abd05bc0c731f6b5561"}}},{"id":"e18d6d4e0ffac0a51028a8d49a548295ac8ac50d064f3581600799a3ae761a61f0b39c38b4195e163e01f30db616debf61b5b2ddea716bc8fb1c907ce7a1de26","name":"Klaytn/vvX.X.X/XXXX-XXXX/goX.X.X","caps":["istanbul/64"],"network":{"localAddress":"10.0.10.3:49354","remoteAddress":"10.0.0.3:32323","inbound":false,"trusted":false,"static":true},"protocols":{"istanbul":{"version":64,"difficulty":1285900,"head":"0x2e228a45c7c9b9e6729b6c66b31957d6cb62ce53e32cedf156615a4e8a2e253a"}}}]}
```


## admin_addPeer

The `addPeer` administrative method requests adding a new remote node to the list of tracked static nodes. The node will try to maintain connectivity to these nodes at all times, reconnecting every once in a while if the remote connection goes down.

The method accepts a single argument kni, which means "Klaytn Network Identifier". It is similar to the [`enode`](https://github.com/ethereum/wiki/wiki/enode-url-format) concept in the geth. It is URL of the remote peer to start tracking and returns a `BOOL` indicating whether the peer was accepted for tracking or some error occurred.

| Client  | Method invocation                              |
|:-------:| ---------------------------------------------- |
| Console | `admin.addPeer(url)`                           |
|   RPC   | `{"method": "admin_addPeer", "params": [url]}` |

**Parameters**

| 명칭  | 형식     | 설명                |
| --- | ------ | ----------------- |
| url | string | Peer's `kni` URL. |

**Return Value**

| 형식   | 설명                                                  |
| ---- | --------------------------------------------------- |
| bool | `true` if the peer was accepted, `false` otherwise. |

**예시**

Console
```javascript
> admin.addPeer("kni://a979fb575495b8d6db44f750317d0f4622bf4c2aa3365d6af7c284339968eef29b69ad0dce72a4d8db5ebb4968de0e3bec910127f134779fbcb0cb6d3331163c@10.0.0.1:32323") //This is an example address.
true
```
HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_addPeer","params":["kni://a979fb575495b8d6db44f750317d0f4622bf4c2aa3365d6af7c284339968eef29b69ad0dce72a4d8db5ebb4968de0e3bec910127f134779fbcb0cb6d3331163c@10.0.0.1:32323"],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":true}
```


## admin_removePeer

The `removePeer` administrative method requests removing a node from the list of tracked static nodes.

The method accepts a single argument kni, which means "Klaytn Network Identifier". It is similar to the [`enode`](https://github.com/ethereum/wiki/wiki/enode-url-format) concept in the geth. It is URL of the remote peer to be removed from a list and returns a `BOOL` indicating whether the peer was remove or some error occurred.

| Client  | Method invocation                                 |
|:-------:| ------------------------------------------------- |
| Console | `admin.removePeer(url)`                           |
|   RPC   | `{"method": "admin_removePeer", "params": [url]}` |

**Parameters**

| 명칭  | 형식     | 설명                |
| --- | ------ | ----------------- |
| url | string | Peer's `kni` URL. |

**Return Value**

| 형식   | 설명                                                  |
| ---- | --------------------------------------------------- |
| bool | `true` if the peer was accepted, `false` otherwise. |

**예시**

Console
```javascript
> admin.removePeer("kni://a979fb575495b8d6db44f750317d0f4622bf4c2aa3365d6af7c284339968eef29b69ad0dce72a4d8db5ebb4968de0e3bec910127f134779fbcb0cb6d3331163c@10.0.0.1:32323") //This is an example address.
true
```
HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_removePeer","params":["kni://a979fb575495b8d6db44f750317d0f4622bf4c2aa3365d6af7c284339968eef29b69ad0dce72a4d8db5ebb4968de0e3bec910127f134779fbcb0cb6d3331163c@10.0.0.1:32323"],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":true}
```


## admin_startRPC

The `startRPC` administrative method starts an HTTP based [JSON RPC](http://www.jsonrpc.org/specification) API webserver to handle client requests.

The method returns a boolean flag specifying whether the HTTP RPC listener was opened or not. Please note, only one HTTP endpoint is allowed to be active at any time.

| Client  | Method invocation                                                  |
|:-------:| ------------------------------------------------------------------ |
| Console | `admin.startRPC(host, port, cors, apis)`                           |
|   RPC   | `{"method": "admin_startRPC", "params": [host, port, cors, apis]}` |

**Parameters**

| 명칭   | 형식     | 설명                                                                                                                                      |
| ---- | ------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| host | string | (optional) network interface to open the listener socket on (default:  `"localhost"`).                                                  |
| port | int    | (optional) network port to open the listener socket on (default:  `8551`).                                                              |
| cors | string | (optional) [cross-origin resource sharing](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) header to use (default:  `""`). |
| apis | string | (optional) API modules to offer over this interface (default:  `"klay,net,personal"`).                                                  |

**Return Value**

| 형식   | 설명                                                          |
| ---- | ----------------------------------------------------------- |
| bool | `true` if the HTTP RPC listener was opened, `false` if not. |

**예시**

Console

```javascript
> admin.startRPC("127.0.0.1", 8551)
true
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_startRPC","id":1, "params":["127.0.0.1", 8551, "", "klay"]}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"error":{"code":-32000,"message":"HTTP RPC already running on 127.0.0.1:8551"}}
```


## admin_stopRPC

The `stopRPC` administrative method closes the currently open HTTP RPC endpoint. As the node can only have a single HTTP endpoint running, this method takes no parameters, returning a boolean whether the endpoint was closed or not.

| Client  | Method invocation             |
|:-------:| ----------------------------- |
| Console | `admin.stopRPC()`             |
|   RPC   | `{"method": "admin_stopRPC"}` |

**Parameters**

None

**Return Value**

| 형식   | 설명                                                 |
| ---- | -------------------------------------------------- |
| bool | `true` if the endpoint was closed, `false` if not. |

**예시**

Console

```javascript
> admin.stopRPC()
true
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_stopRPC","id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":true}
```


## admin_startWS

The `startWS` administrative method starts an WebSocket based [JSON RPC](http://www.jsonrpc.org/specification) API webserver to handle client requests.

The method returns a boolean flag specifying whether the WebSocket RPC listener was opened or not. Please note, only one WebSocket endpoint is allowed to be active at any time.

| Client  | Method invocation                                                 |
|:-------:| ----------------------------------------------------------------- |
| Console | `admin.startWS(host, port, cors, apis)`                           |
|   RPC   | `{"method": "admin_startWS", "params": [host, port, cors, apis]}` |

**Parameters**

| 명칭   | 형식     | 설명                                                                                                                                      |
| ---- | ------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| host | string | (optional) network interface to open the listener socket on (default:  `"localhost"`).                                                  |
| port | int    | (optional) network port to open the listener socket on (default:  `8552`).                                                              |
| cors | string | (optional) [cross-origin resource sharing](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) header to use (default:  `""`). |
| apis | string | (optional) API modules to offer over this interface (default:  `"klay,net,personal"`).                                                  |

**Return Value**

| 형식   | 설명                                                               |
| ---- | ---------------------------------------------------------------- |
| bool | `true` if the WebSocket RPC listener was opened, `false` if not. |

**예시**

Console

```javascript
> admin.startWS("127.0.0.1", 8552)
true
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_startWS","params":["127.0.0.1", 8552, "", "klay"],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":true}
```


## admin_stopWS

The `stopWS` administrative method closes the currently open WebSocket RPC endpoint. As the node can only have a single WebSocket endpoint running, this method takes no parameters, returning a boolean whether the endpoint was closed or not.

| Client  | Method invocation            |
|:-------:| ---------------------------- |
| Console | `admin.stopWS()`             |
|   RPC   | `{"method": "admin_stopWS"}` |

**Parameters**

None

**Return Value**

| 형식   | 설명                                                 |
| ---- | -------------------------------------------------- |
| bool | `true` if the endpoint was closed, `false` if not. |

**예시**

Console

```javascript
> admin.stopWS()
true
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_stopWS","id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":true}
```


## admin_exportChain

The `exportChain` administrative method exports the blockahin to a file.

| Client  | Method invocation                                        |
|:-------:| -------------------------------------------------------- |
| Console | `admin.exportChain(fileName)`                            |
|   RPC   | `{"method": "admin_importChain"}, "params": [fileName]}` |

**Parameters**

| 명칭       | 형식     | 설명                                                                          |
| -------- | ------ | --------------------------------------------------------------------------- |
| fileName | string | the fully qualified path to the file where the blockchain must be exported. |

**Return Value**

| 형식   | 설명                                            |
| ---- | --------------------------------------------- |
| bool | `true` if chain was exported, `false` if not. |

**예시**

Console

```javascript
> admin.exportChain("/tmp/chain.txt")
true
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_exportChain","params":["/tmp/chain.txt"],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":true}
```


## admin_importChain

The `importChain` administrative method imports an exported chain from file into node. This only works if no chain already exists: it does not delete any existing data.

| Client  | Method invocation                                        |
|:-------:| -------------------------------------------------------- |
| Console | `admin.importChain(fileName)`                            |
|   RPC   | `{"method": "admin_importChain"}, "params": [fileName]}` |

**Parameters**

| 명칭       | 형식     | 설명                                                                        |
| -------- | ------ | ------------------------------------------------------------------------- |
| fileName | string | the fully qualified path to the file containing the chain to be imported. |

**Return Value**

| 형식   | 설명                                            |
| ---- | --------------------------------------------- |
| bool | `true` if chain was imported, `false` if not. |

**예시**

Console

```javascript
> admin.importChain("/tmp/chain.txt")
true
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_importChain","params":["/tmp/chain.txt"],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":true}
```
