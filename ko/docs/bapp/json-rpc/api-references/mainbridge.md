---
description: >-
  APIs related to main chain ENs connected with a service chain.
---

# Namespace mainbridge

The namespace `mainbridge` provides functions related to Service Chain. To use functions in this namespace, the option `mainbridge` should be enabled in the EN connected to the main chain (Mainnet or Baobab testnet).

## mainbridge_nodeInfo

Returns bridge node information including the KNI (Klaytn Network Identifier) of the node. A mainbridge node can connect to a subbrige node via the KNI.

**Parameters**

None

**Return Value**

| 형식          | 설명                           |
| ----------- | ---------------------------- |
| JSON string | the bridge node information. |

**예시**

```javascript
> mainbridge.nodeInfo
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

## mainbridge_addPeer
Returns `true` if adding a subbridge peer is done successfully.

It Adds a new remote node to the peer list. The node will try to maintain connectivity to these nodes at all times, reconnecting every once in a while if the remote connection goes down. The method accepts a single argument, the `kni` URL of the remote peer to start tracking and returns a `BOOL` indicating whether the peer was accepted for tracking or some error occurred.

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

## mainbridge_removePeer
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

## mainbridge_convertServiceChainBlockHashToMainChainTxHash

Returns the anchoring transaction hash of the given child chain block hash.

**Parameters**

| 형식           | 설명                                                              |
| ------------ | --------------------------------------------------------------- |
| 32-byte DATA | The childchain block hash which included the anchoring tx hash. |

**Return Value**

| 형식           | 설명                                                                                |
| ------------ | --------------------------------------------------------------------------------- |
| 32-byte DATA | The transaction hash whilch including the childchain block anchoring inforamtion. |

**예시**

Console

```javascript
> mainbridge.convertServiceChainBlockHashToMainChainTxHash("0xeadc6a3a29a20c13824b5df1ba05cca1ed248d046382a4f2792aac8a6e0d1880")
"0x9a68591c0faa138707a90a7506840c562328aeb7621ac0561467c371b0322d51"
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"mainbridge_convertServiceChainBlockHashToMainChainTxHash","params":["0xeadc6a3a29a20c13824b5df1ba05cca1ed248d046382a4f2792aac8a6e0d1880"],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":"0x9a68591c0faa138707a90a7506840c562328aeb7621ac0561467c371b0322d51"}
```

