---
description: >-
  APIs related to service chain ENs.
---

# Namespace subbridge

The namespace `subbridge` provides functions related to Service Chain. To use functions in this namespace, the option `subbridge` should be enabled in the SEN connected to the service chain.

## subbridge_nodeInfo

Returns bridge node information including the KNI (Klaytn Network Identifier) of the node. A subbridge node can connect to a mainbridge node via the KNI.

**Parameters**

None

**Return Value**

| 형식          | 설명                           |
| ----------- | ---------------------------- |
| JSON string | the bridge node information. |

**예시**

```javascript
> subbridge.nodeInfo
{
  kni: "kni://f8a1f0cd1e2bebeece571e4fda16e215218fd4b9bc2eddd924f7cd5b5f950fcec8f4b8cd3851390d1d0bacf1b15e1c4a38c882252e429a28d16eeb6edbacd726@[::]:50505?discport=0",
  id: "f8a1f0cd1e2bebeece571e4fda16e215218fd4b9bc2eddd924f7cd5b5f950fcec8f4b8cd3851390d1d0bacf1b15e1c4a38c882252e429a28d16eeb6edbacd726",
  ip: "::",
  listenAddr: "[::]:50505",
  name: "-2",
  ports: {
    discovery: 0,
    listener: 50505
  },
  protocols: {
    servicechain: {
      config: {
        chainId: 2018,
        deriveShaImpl: 0,
        isBFT: true,
        istanbul: {...},
        unitPrice: 0
      },
      difficulty: 87860,
      genesis: "0x711ce9865492659977abb2758d29f68c2b0c82862d9376f25953579f64f95b58",
      head: "0x0d4b130731f1e7560e4531ac73d55ac8c6daccb178abd86af0d96b7aafded7c5",
      network: 1
    }
  }
}
```

## subbridge_addPeer
Returns `true` if adding a mainbridge peer is done successfully.

The `addPeer` method adds a new remote node to the peer list. The node will try to maintain connectivity to these nodes at all times, reconnecting every once in a while if the remote connection goes down.

The method accepts a single argument, the `kni` URL of the remote peer to start tracking and returns a `BOOL` indicating whether the peer was accepted for tracking or some error occurred.

**Parameters**

| 명칭  | 형식     | 설명                 |
| --- | ------ | ------------------ |
| url | string | Peer's  `kni` URL. |

**Return Value**

| 형식   | 설명                                                  |
| ---- | --------------------------------------------------- |
| bool | `true` if the peer was accepted, `false` otherwise. |

**예시**

Console

```javascript
> mainbridge.addPeer("kni://a979fb...1163c@10.0.0.1:50505") // or 'subbridge.addPeer'
true
```
HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"mainbridge_addPeer","params":["kni://a979fb575495b8d6db44f750317d0f4622bf4c2aa3365d6af7c284339968eef29b69ad0dce72a4d8db5ebb4968de0e3bec910127f134779fbcb0cb6d3331163c@10.0.0.1:50505"],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":true}
```

## subbridge_removePeer
Returns `true` if removing the peer is done successfully.

The `removePeer` method disconnects and removes the remote node in the list of tracked static nodes. The method accepts a single argument, the `kni` URL of the remote peer to start tracking and returns a `BOOL` indicating whether the peer was accepted for tracking or some error occurred.

**Parameters**

| 명칭  | 형식     | 설명                 |
| --- | ------ | ------------------ |
| url | string | Peer's  `kni` URL. |

**Return Value**

| 형식   | 설명                                                 |
| ---- | -------------------------------------------------- |
| bool | `true` if the peer was removed, `false` otherwise. |

**예시**

Console

```javascript
> mainbridge.removePeer("kni://a979fb...1163c@10.0.0.1:50505") // or 'subbridge.removePeer'
true
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"mainbridge_removePeer","params":["kni://a979fb575495b8d6db44f750317d0f4622bf4c2aa3365d6af7c284339968eef29b69ad0dce72a4d8db5ebb4968de0e3bec910127f134779fbcb0cb6d3331163c@10.0.0.1:50505"],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":true}
```

## subbridge_sendChainTxslimit

The `sendChainTxslimit` gets the maximum number of pending transactions to pick up for sending at once.

**Parameters**

None

**Return Value**

| 형식     | 설명                                                                        |
| ------ | ------------------------------------------------------------------------- |
| Uint64 | the maximum number of pending transactions to pickup for sending at once. |

**예시**

```javascript
> subbridge.sendChainTxslimit
100
```

## subbridge_anchoring
The `subbridge.anchoring` can enable/disable the anchoring feature of the service chain.

**Parameters**

| 명칭     | 형식   | 설명                                                         |
| ------ | ---- | ---------------------------------------------------------- |
| enable | Bool | `true` enables the anchoring feature, `false` disables it. |

**Return Value**

| 형식   | 설명                                                      |
| ---- | ------------------------------------------------------- |
| bool | `true` if the anchoring was enabled, `false` otherwise. |

**예시**

Console

```javascript
> subbridge.anchoring(true)
true
> subbridge.anchoring(false)
false
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"subbridge_anchoring","params":[true],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":true}
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"subbridge_anchoring","params":[false],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":false}
```

## subbridge_latestAnchoredBlockNumber
The `subbridge.latestAnchoredBlockNumber` returns the latest anchored block number of the service chain.

**Parameters**

None

**Return Value**

| 형식     | 설명                                |
| ------ | --------------------------------- |
| Uint64 | The latest anchored block number. |

**예시**

```javascript
> subbridge.latestAnchoredBlockNumber
71025
```
