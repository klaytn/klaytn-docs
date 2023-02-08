---
description: >-
  メインチェーンに関連する API サービスチェーンに接続された EN。
---

# ネームスペース メインブリッジ <a id="namespace-mainbridge"></a>

名前空間 `メインブリッジ` は、Service Chainに関連する関数を提供します。 この名前空間で関数を使用するには メインチェーン(メインネットまたはバオバブテストネット)に接続されているENで、 `メインブリッジ` を有効にする必要があります。

## mainbridge_nodeInfo <a id="mainbridge_nodeInfo"></a>

ノードのKNI(Klaytn Network Identifier)を含むブリッジノード情報を返します。 mainbridge ノードは KBI 経由でサブブリージュノードに接続できます。

**Parameters**

None

**Return Value**

| Type        | Description |
| ----------- | ----------- |
| JSON string | ブリッジノードの情報  |

**Example**

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

## mainbridge_addPeer  <a id="mainbridge_addPeer"></a>
サブブリッジピアの追加が正常に完了した場合、 `true` を返します。

It ピア・リストに新しいリモート・ノードを追加します。 The node will try to maintain connectivity to these nodes at all times, reconnecting every once in a while if the remote connection goes down. このメソッドは単一の引数を受け取ります 追跡を開始するリモートピアの `kni` URL。 `BOOL` を返します。追跡のためにピアが受け入れられたか、エラーが発生したかを示します。

**Parameters**

| Name | Type   | Description     |
| ---- | ------ | --------------- |
| url  | string | ピアの  `kni` URL。 |

**Return Value**

| Type | Description                                         |
| ---- | --------------------------------------------------- |
| bool | `true` if the peer was accepted, `false` otherwise. |

**Example**

Console

```javascript
> mainbridge.addPeer("knif://a979fb...1163c@10.0.0.1:50505") // or 'subbridge.addPeer'
true
```
HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"mainbridge_addPeer","params":["kni://a979fb575495b8d6db44f750317d0f4622bf4c2aa3365d6af7c284339968eef29b69ad0dce72a4d8db5ebb4968de0e3bec910127f134779fbcb0cb6d3331163c@10.0.0.1:50505"],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":true}
```

## mainbridge_removePeer <a id="mainbridge_removePeer"></a>
ピアの削除が成功した場合、 `true` を返します。

`removePeer` メソッドは、トラッキングされた静的ノードのリスト内のリモートノードを切断して削除します。 このメソッドは単一の引数を受け取ります 追跡を開始するリモートピアの `kni` URL。 `BOOL` は、ピアが 追跡のために受け入れられたか、またはエラーが発生したかを示します。

**Parameters**

| Name | Type   | Description        |
| ---- | ------ | ------------------ |
| url  | string | Peer's  `kni` URL. |

**Return Value**

| Type | Description                               |
| ---- | ----------------------------------------- |
| bool | `ピアが削除された場合は true` で、それ以外の場合は `false` です。 |

**Example**

Console

```javascript
> mainbridge.removePeer("knif://a979fb...1163c@10.0.0.1:50505") // or 'subbridge.removePeer'
true
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"mainbridge_removePeer","params":["kni://a979fb575495b8d6db44f750317d0f4622bf4c2aa3365d6af7c284339968eef29b69ad0dce72a4d8db5ebb4968de0e3bec910127f134779fbcb0cb6d3331163c@10.0.0.1:50505"],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":true}
```

## mainbridge_getChainIndexingEnabled <a id="mainbridge_getChildChainIndexingEnabled"></a>

`mainbridge_getChainIndexingEnabled` は、アンカートランザクションが有効かどうかを示す。

**Parameters**

none

**Return Value**

| Type | Description                              |
| ---- | ---------------------------------------- |
| bool | `インデックスが有効になっている場合は true` `false` でなければ。 |

**Example**

```javascript
> mainbridge.getChainIndexingEnabled()
true
```

## mainbridge_convertChildChainBlockHashToParentChainTxHash <a id="mainbridge_convertChildChainBlockHashToParentChainTxHash"></a>

与えられた子チェーンブロックハッシュのアンカートランザクションハッシュを返します。

**Parameters**

| Type         | Description     |
| ------------ | --------------- |
| 32-byte DATA | 子チェーンのブロックハッシュ。 |

**Return Value**

| Type         | Description                      |
| ------------ | -------------------------------- |
| 32-byte DATA | 子チェーンブロック情報を含むトランザクションハッシュのアンカー。 |

**Example**

Console

```javascript
> mainbridge.convertChildChainBlockHashToParentChainTxHash("0xeadc6a3a29a20c13824b5df1ba05cca1ed248d046382a4f2792aac8a6e0d1880")
"0x9a68591c0faa138707a90a7506840c562328aeb7621ac0561467c371b0322d51"
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"mainbridge_convertChildChainBlockHashToParentChainTxHash","params":["0xeadc6a3a29a20c13824b5df1ba05cca1ed248d046382a6e0d1880"],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"id":0x9a68591c0faa7870a790c5623a6e0d
```

