---
description: >-
  サービスチェーンENに関連するAPI。
---

# ネームスペースサブブリッジ <a id="namespace-subbridge"></a>

名前空間 `サブブリッジ` は、Service Chain に関連する関数を提供します。 この名前空間で関数を使用するには、サービスチェーンに接続された SEN で `subbridge` オプションを有効にする必要があります。

## subbridge_nodeInfo <a id="subbridge_nodeInfo"></a>

ノードのKNI(Klaytn Network Identifier)を含むブリッジノード情報を返します。 サブブリッジノードは、KNI経由でメインブリッジノードに接続できます。

**パラメータ**

なし

**戻り値**

| タイプ     | Description |
| ------- | ----------- |
| JSON文字列 | ブリッジノードの情報  |

**例**

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

## subbridge_addPeer <a id="subbridge_addPeer"></a>
メインブリッジピアの追加が正常に完了した場合、 `true` を返します。

`addPeer` メソッドはピア・リストに新しいリモート・ノードを追加します。 ノードは常にこれらのノードへの接続を維持しようとします リモート接続が切断された場合、 をしばらく毎に再接続します。

このメソッドは単一の引数を受け取ります 追跡を開始するリモートピアの `kni` URL。 `BOOL` は、ピアが 追跡のために受け入れられたか、またはエラーが発生したかを示します。

**パラメータ**

| 名前  | タイプ | Description     |
| --- | --- | --------------- |
| URL | 文字列 | ピアの  `kni` URL。 |

**戻り値**

| タイプ  | Description                          |
| ---- | ------------------------------------ |
| bool | `ピアが受け入れられた場合には true` `false` となります。 |

**例**

コンソール

```javascript
> mainbridge.addPeer("knif://a979fb...1163c@10.0.0.1:50505") // or 'subbridge.addPeer'
true
```
HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"mainbridge_addPeer","params":["kni://a979fb575495b8d6db44f750317d0f4622bf4c2aa3365d6af7c284339968eef29b69ad0dce72a4d8db5ebb4968de0e3bec910127f134779fbcb0cb6d3331163c@10.0.0.1:50505"],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":true}
```

## subbridge_removePeer <a id="subbridge_removePeer"></a>
ピアの削除が成功した場合、 `true` を返します。

`removePeer` メソッドは、トラッキングされた静的ノードのリスト内のリモートノードを切断して削除します。 このメソッドは単一の引数を受け取ります 追跡を開始するリモートピアの `kni` URL。 `BOOL` は、ピアが 追跡のために受け入れられたか、またはエラーが発生したかを示します。

**パラメータ**

| 名前  | タイプ | Description     |
| --- | --- | --------------- |
| URL | 文字列 | ピアの  `kni` URL。 |

**戻り値**

| タイプ  | Description                               |
| ---- | ----------------------------------------- |
| bool | `ピアが削除された場合は true` で、それ以外の場合は `false` です。 |

**例**

コンソール

```javascript
> mainbridge.removePeer("knif://a979fb...1163c@10.0.0.1:50505") // or 'subbridge.removePeer'
true
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"mainbridge_removePeer","params":["kni://a979fb575495b8d6db44f750317d0f4622bf4c2aa3365d6af7c284339968eef29b69ad0dce72a4d8db5ebb4968de0e3bec910127f134779fbcb0cb6d3331163c@10.0.0.1:50505"],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":true}
```

## subbridge_parentOperator <a id="subbridge_parentOperator"></a>
`subbridge_parentOperator` は、親演算子のアカウントアドレスを返します。

**パラメータ**

なし

**戻り値**

| タイプ   | Description          |
| ----- | -------------------- |
| アカウント | 親チェーンオペレータアカウントアドレス。 |

**例**

```javascript
> subbridge.parentOperator
"0xA057995175B93Ee0D1bdfA54f078Ad0F0116130b"
```

## subbridge_childOperator <a id="subbridge_childOperator"></a>
`subbridge_childOperator` は子演算子のアカウントアドレスを返します。

**パラメータ**

なし

**戻り値**

| タイプ   | Description                           |
| ----- | ------------------------------------- |
| アカウント | Child chain operator account address. |

**例**

```javascript
> subbridge.childOperator
"0x5C1C757a6Cb6c6FcEFE398674D8209FDA2A74Df4"
```

## subbridge_parentOperatorNonce <a id="subbridge_parentOperatorNonce"></a>
`subbridge_parentOperatorNonce` は、親演算子の口座アドレスの nonce を返します。

**パラメータ**

なし

**戻り値**

| タイプ | Description                   |
| --- | ----------------------------- |
| 品質  | 親演算子アカウントから送信されたトランザクション数の整数。 |

**例**

```javascript
> subbridge.parentOperatorNonce
1348
```

## subbridge_childOperatorNonce <a id="subbridge_childOperatorNonce"></a>
`subbridge_childOperator` は子演算子のアカウントアドレスを返します。

**パラメータ**

なし

**戻り値**

| タイプ | Description                   |
| --- | ----------------------------- |
| 品質  | 子演算子アカウントから送信されたトランザクション数の整数。 |

**例**

```javascript
> subbridge.childOperatorNonce
1024
```

## subbridge_parentOperatorBalance <a id="subbridge_parentOperatorBalance"></a>
`subbridge_parentOperatorBalance` は、親演算子口座の残高を返します。

**パラメータ**

なし

**戻り値**

| タイプ | Description       |
| --- | ----------------- |
| 品質  | 親演算子の口座の現在の残高の整数。 |

**例**

```javascript
> subbridge.parentOperatorBalance
1e+50
```

## subbridge_childOperatorBalance <a id="subbridge_childOperatorBalance"></a>
`subbridge_childOperatorBalance` は、子演算子口座の残高を返します。

**パラメータ**

なし

**戻り値**

| タイプ | Description          |
| --- | -------------------- |
| 品質  | 子演算子のアカウントの現在の残高の整数。 |

**例**

```javascript
> subbridge.childOperatorBalance
1e+50
```



## subbridge_sendChainTxslimit <a id="subbridge_sendChainTxslimit"></a>

`sendChainTxslimit` は、一度に送信するために取得する保留中のトランザクションの最大数を取得します。

**パラメータ**

なし

**戻り値**

| タイプ    | Description          |
| ------ | -------------------- |
| Uint64 | 一度に送金するための最大保留中の取引数。 |

**例**

```javascript
> subbridge.sendChainTxslimit
100
```

## subbridge_anchoring <a id="subbridge_anchoring"></a>
`subbridge_anchoring` はサービスチェーンのアンカー機能を有効/無効にできます。

**パラメータ**

| 名前    | タイプ  | Description                           |
| ----- | ---- | ------------------------------------- |
| 有効にする | ブール型 | `true` でアンカー機能を有効にし、 `false` で無効にします。 |

**戻り値**

| タイプ  | Description                                   |
| ---- | --------------------------------------------- |
| bool | `アンカーが有効になっている場合は true` 、それ以外の場合は `false` です。 |

**例**

コンソール

```javascript
> subbridge.anchoring(true)
true
> subbridge.anchoring(false)
false
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"subbridge_anchoring","params":[true],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":true}
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"subbridge_anchoring","params":[false],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":false}
```

## subbridge_latestAnkirdBlockNumber <a id="subbridge_latestAnchoredBlockNumber"></a>
`subbridge_latestAnkirdBlockNumber` は、サービス・チェーンの最新のアンカーされたブロック番号を返します。

**パラメータ**

なし

**戻り値**

| タイプ    | Description    |
| ------ | -------------- |
| Uint64 | 最新のアンカーブロック番号。 |

**例**

```javascript
> subbridge.latestAnkirdBlockNumber
71025
```

## subbridge_getReceiptFromParentChain <a id="subbridge_getReceiptFromParentChain"></a>
`subbridge_getReceiptFromParentChain` は、アンカートランザクションの受領を返します。

**パラメータ**

| タイプ       | Description                         |
| --------- | ----------------------------------- |
| 32バイトのデータ | アンカリング tx ハッシュが含まれていた子チェーンブロックハッシュ。 |


**戻り値**

`Object` - 領収書が見つからない場合は `null`。

| 名前              | タイプ        | Description                                                           |
| --------------- | ---------- | --------------------------------------------------------------------- |
| コントラクトアドレス      | データ        | トランザクションがコントラクト作成であれば、コントラクトアドレスが作成されます。そうでなければ `null` です。 (非推奨になります) |
| gasUsed         | 品質         | この特定の取引だけで使用されるガスの量。                                                  |
| ログ              | 行列         | このトランザクションが生成したログオブジェクトの配列。                                           |
| logsBloom       | 256バイトのデータ | ライトクライアントが関連するログをすばやく取得できるようにするためのフィルターをブルームにします。                     |
| ステータス           | 品質         | `1` (成功) または `0 0` (失敗).                                              |
| transactionHash | 32バイトのデータ  | トランザクションのハッシュ                                                         |

**例**

```javascript
> subbridge.getReceiptFromParentChain("0x4f300d6574e71d7940c88fe08f27d9ac45cbc7b81d45c17e848d3772f64377b5")
{
  contractAddress: "0x0000000000000000000000000000000000000000",
  gasUsed: "0x9470",
  logs: [],
  logsBloom: "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  status: "0x1",
  transactionHash: "0x3641f52359f44ef2a9941ea840aed4befbace5cac28d5cc8cacd94eae211fd1e"
}
```

## subbridge_deployBridge <a id="subbridge_deployBridge"></a>
`subbridge_deployBridge` は、ブリッジコントラクトを親チェーンと子チェーンにデプロイし、デプロイされたブリッジコントラクトのアドレスを返します。 この方法では、ブリッジコントラクトもサブブリッジに登録します。

**パラメータ**

なし

**戻り値**

| 名前    | タイプ        | Description             |
| ----- | ---------- | ----------------------- |
| アカウント | 20 バイトのデータ | 子チェーン上のブリッジコントラクトのアドレス。 |
| アカウント | 20 バイトのデータ | 親チェーン上のブリッジ契約のアドレス。     |

**例**

```javascript
> subbridge.deployBridge()
["0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4"]
```

## subbridge_registerBridge <a id="subbridge_registerBridge"></a>
`subbridge_registerBridge` は、すでに親チェーンと子チェーンにブリッジコントラクトをデプロイしています。

**パラメータ**

| 名前    | タイプ        | Description             |
| ----- | ---------- | ----------------------- |
| アカウント | 20 バイトのデータ | 子チェーン上のブリッジコントラクトのアドレス。 |
| アカウント | 20 バイトのデータ | 親チェーン上のブリッジ契約のアドレス。     |

**戻り値**

| 名前  | タイプ | Description                                   |
| --- | --- | --------------------------------------------- |
| エラー | エラー | `null` 登録が成功した場合は、それ以外の場合は Error オブジェクトを返します。 |

**例**

```javascript
> subbridge.registerBridge("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4")
null

> subbridge.registerBridge("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4")
エラー: ブリッジは既に存在します

```

## subbridge_deregisterBridge <a id="subbridge_deregisterBridge"></a>
`subbridge.delegisterBridge` は、すでに登録されている親/子チェーンのブリッジコントラクトを削除します。

**パラメータ**

| 名前    | タイプ        | Description             |
| ----- | ---------- | ----------------------- |
| アカウント | 20 バイトのデータ | 子チェーン上のブリッジコントラクトのアドレス。 |
| アカウント | 20 バイトのデータ | 親チェーン上のブリッジ契約のアドレス。     |

**戻り値**

| 名前  | タイプ | Description                                    |
| --- | --- | ---------------------------------------------- |
| エラー | エラー | `null` もし削除が成功した場合、それ以外の場合は Error オブジェクトを返します。 |

**例**

```javascript
> subbridge.deregisterBridge("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4")
null

> subbridge.deregisterBridge("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4")
エラー: 無効なブリッジペア
```

## subbridge_subscribeBridge <a id="subbridge_subscribeBridge"></a>
`subbridge_subscribeBridge` は、親チェーンと子チェーンで登録されたブリッジコントラクトをサブスクライブします。 サブブリッジノードがブリッジコントラクトペアを購読している場合、クロスチェーンの値転送リクエストはサブブリッジによって自動的に処理されます。

**パラメータ**

| 名前    | タイプ        | Description             |
| ----- | ---------- | ----------------------- |
| アカウント | 20 バイトのデータ | 子チェーン上のブリッジコントラクトのアドレス。 |
| アカウント | 20 バイトのデータ | 親チェーン上のブリッジ契約のアドレス。     |

**戻り値**

| 名前  | タイプ | Description                                  |
| --- | --- | -------------------------------------------- |
| エラー | エラー | `null` 購読が成功した場合、それ以外の場合は Error オブジェクトを返します。 |

**例**

```javascript
> subbridge.subbridge("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4")
null
> subbridge.subscribeBridge("0x87d6b9c567e5bcd8400e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4")
エラー: 既に購読登録済みです 

```

## subbridge_unsubscribeBridge <a id="subbridge_unsubscribeBridge"></a>
`subbridge_unsubscribeBridge` は、親チェーンと子チェーンのブリッジコントラクトからサブブリッジの登録を解除します。 サブブリッジがブリッジコントラクトから登録解除されている場合、クロスチェーン値転送要求はサブブリッジによって処理できません。

**パラメータ**

| 名前    | タイプ        | Description             |
| ----- | ---------- | ----------------------- |
| アカウント | 20 バイトのデータ | 子チェーン上のブリッジコントラクトのアドレス。 |
| アカウント | 20 バイトのデータ | 親チェーン上のブリッジ契約のアドレス。     |

**戻り値**

| 名前  | タイプ | Description                                    |
| --- | --- | ---------------------------------------------- |
| エラー | エラー | `null` 購読解除が成功した場合、それ以外の場合は Error オブジェクトを返します。 |

**例**

```javascript
> subbridge.unsubscribeBridge("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4")
null
```

## subbridge_registerToken <a id="subbridge_registerToken"></a>
`subbridge_registerToken` は、ブリッジコントラクトに ERC-20 または 721 トークンのペアを登録します。

**パラメータ**

| 名前    | タイプ        | Description             |
| ----- | ---------- | ----------------------- |
| アカウント | 20 バイトのデータ | 子チェーン上のブリッジコントラクトのアドレス。 |
| アカウント | 20 バイトのデータ | 親チェーン上のブリッジ契約のアドレス。     |
| アカウント | 20 バイトのデータ | 子チェーン上のトークンコントラクトのアドレス。 |
| アカウント | 20 バイトのデータ | 親チェーン上のトークンコントラクトのアドレス。 |

**戻り値**

| 名前  | タイプ | Description                                   |
| --- | --- | --------------------------------------------- |
| エラー | エラー | `null` 登録が成功した場合は、それ以外の場合は Error オブジェクトを返します。 |

**例**

```javascript
> subbridge.registerToken("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4","0xA4b0c6e12346426a09FaD70dAE0651E6Dbdd5198","0x865Cca53828C91663BFf0Ca9808827Bac552BAec")
null
> subbridge.registerToken("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4","0xA4b0c6e12346426a09FaD70dAE0651E6Dbdd5198","0x865Cca53828C91663BFf0Ca9808827Bac552BAec")
Error: token already exists
```

## subbridge_deregisterToken <a id="subbridge_deregisterToken"></a>
`subbridge_delegisterBridge` は、既に登録済みのトークンペアをブリッジコントラクトから削除しています。

**パラメータ**

| 名前    | タイプ        | Description             |
| ----- | ---------- | ----------------------- |
| アカウント | 20 バイトのデータ | 子チェーン上のブリッジコントラクトのアドレス。 |
| アカウント | 20 バイトのデータ | 親チェーン上のブリッジ契約のアドレス。     |
| アカウント | 20 バイトのデータ | 子チェーン上のトークンコントラクトのアドレス。 |
| アカウント | 20 バイトのデータ | 親チェーン上のトークンコントラクトのアドレス。 |

**戻り値**

| 名前  | タイプ | Description                                    |
| --- | --- | ---------------------------------------------- |
| エラー | エラー | `null` もし削除が成功した場合、それ以外の場合は Error オブジェクトを返します。 |

**例**

```javascript
> subbridge.deregisterToken("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4","0xA4b0c6e12346426a09FaD70dAE0651E6Dbdd5198","0x865Cca53828C91663BFf0Ca9808827Bac552BAec")
null
> subbridge.deregisterToken("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4","0xA4b0c6e12346426a09FaD70dAE0651E6Dbdd5198","0x865Cca53828C91663BFf0Ca9808827Bac552BAec")
Error: invalid token pair
```

## subbridge_convertRequestTxHashToHandleTxHash <a id="subbridge_convertRequestTxHashToHandleTxHash"></a>
`subbridge_convertRequestTxHashToHandleTxHash` は、与えられた「リクエスト値転送トランザクション」ハッシュに対して、対応する「ハンドル値転送トランザクション」ハッシュを反対のチェーンで返します。 「リクエスト値転送トランザクション」とは、ユーザーによって開始されたトランザクションであり、クロスチェーン値転送を要求します。 "Handle value transfer transaction" はサブブリッジによって作成されたトランザクションで、ユーザーからの値transfer requestを処理します。

**パラメータ**

| 名前   | タイプ       | Description              |
| ---- | --------- | ------------------------ |
| ハッシュ | 32バイトのデータ | 「リクエスト値転送」トランザクションのハッシュ。 |


**戻り値**

| 名前   | タイプ       | Description                                                       |
| ---- | --------- | ----------------------------------------------------------------- |
| ハッシュ | 32バイトのデータ | 「ハンドル値転送」トランザクションのハッシュ。 ゼロハッシュは、対応する「ハンドル値転送」トランザクションがないことを意味します。 |


**例**

```javascript
> subbridge.convertRequestTxHashToHandleTxHash("0xae5604f8673098436ee4eaf1b453f1a395afccd6e8eb674c60edd63ebb047622")
"0x97493d1a91d65c149763209be6535efdacf8f1b50c99daa22abf06502010b2ee"
> subbridge.convertRequestTxHashToHandleTxHash("0xc585cfd1e7047b4faae69e62e77db192d8a339701b40d6ab4adb58453b934bec")
"0x0000000000000000000000000000000000000000000000000000000000000000"
```

## subbridge_listBridge <a id="subbridge_listBridge"></a>
`subbridge_listBridge` は、サブブリッジに登録されている(格納されている)すべてのブリッジコントラクトペアのリストを返します。

**パラメータ**

nonce

**戻り値**

| 名前           | タイプ   | Description                                                |
| ------------ | ----- | ---------------------------------------------------------- |
| localAddress | アカウント | 20バイトのデータ | 子(サービス)チェーン上のブリッジ契約のアドレス。                      |
| localAddress | アカウント | 20バイトデータ | 親(main)チェーン上のブリッジコントラクトのアドレス。                   |
| 購読済み         | bool  | `true` `ブリッジ契約のペアが契約されている場合、` それ以外の場合は false format@@4 です。 |

**例**

```javascript
> subbridge.listBridge
[{
    localAddress: "0x27caeba831d98b5fbb1d81ce0ed20801702f443a",
    remoteAddress: "0x22c41ae528627b790233d2e59ea520be12350eb5",
    subscribed: true
}, {
    localAddress: "0x376b72abe1b29cace831bd3f5acdfa967814c9cd",
    remoteAddress: "0x53160735f7cc6ff75e48619f368bb94daff66a1b",
    subscribed: false
}, {
    localAddress: "0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a",
    remoteAddress: "0x23dab942822021bbd6d551ef51003208924877e4",
    subscribed: false
}]
```

## subbridge_getBridgeInformation <a id="subbridge_getBridgeInformation"></a>
`subbridge_getBridgeInformation` は、与えられたブリッジコントラクトの情報を返します。

**パラメータ**

| 名前    | タイプ        | Description     |
| ----- | ---------- | --------------- |
| アカウント | 20 バイトのデータ | ブリッジコントラクトのアドレス |


**戻り値**

| 名前               | タイプ        | Description                                                              |
| ---------------- | ---------- | ------------------------------------------------------------------------ |
| counterPart      | 20 バイトのデータ | 対応するブリッジ契約の住所。 (まだサポートされていません)                                           |
| isRunning        | bool       | `ブリッジコントラクトが実行されている場合は` true `、そうでない場合は` false format@@4。                |
| isSubscribed     | bool       | `true` `ブリッジコントラクトが購読されていれば、` が正しくありません。                                 |
| onServiceChain   | bool       | `true` if the bridge contact is on child (service) chain, `false` other. |
| pendingEventSize | 品質         | ブリッジコントラクトによって生成された保留中の「リクエスト値転送」イベントの数。サブブリッジはまだ処理していません。               |
| requestNonce     | 品質         | ブリッジ契約のノンスを要求します。                                                        |
| handleNonce      | 品質         | ブリッジ契約の上部ハンドルのノンス。                                                       |
| lowerHandleNonce | 品質         | ブリッジ契約のハンドルを低くします。                                                       |


**例**

```javascript
> subbridge.getBridgeInformation("0x27caeba831d98b5fbb1d81ce0ed20801702f443a")
{
  counterPart: "0x0000000000000000000000000000000000000000",
  handleNonce: 0,
  lowerHandleNonce: 0,
  isRunning: true,
  isSubscribed: true,
  onServiceChain: true,
  pendingEventSize: 0,
  requestNonce: 0
}
```

## subbridge_txPendingCount <a id="subbridge_txPendingCount"></a>
`subbridge_txPendingCount` は、ブリッジトランザクションプールで保留中のトランザクション数を返します。

**パラメータ**

なし

**戻り値**

| タイプ    | Description                     |
| ------ | ------------------------------- |
| Uint64 | ブリッジトランザクションプール内の保留中のトランザクション数。 |

**例**

```javascript
> subbridge.txPendingCount
2
```

## subbridge_txPending <a id="subbridge_txPending"></a>
`subbridge_txPending` はブリッジトランザクションプールで保留中のトランザクションのリストを返します。

**パラメータ**

なし

**戻り値**

| タイプ     | Description                        |
| ------- | ---------------------------------- |
| JSON文字列 | ブリッジトランザクションプールで保留中のトランザクションの一覧です。 |

**例**

```javascript
> subbridge.txPending
{
  0xa057995175b93ee0d1bdfa54f078ad0f0116130b: [{
      from: "0xa057995175b93ee0d1bdfa54f078ad0f0116130b",
      gas: "0x186a0",
      gasPrice: "0x5d21dba00",
      hash: "0x284c8f5bc82ef987c3a14fc8dac7933beb528777745987ff790014441f26ca03",
      input: "0xf8a9a063f41a6ec8e2f8074c30fccf11f2b8479e7ebd8a0e5aa0c171623bc1f3812e33a056e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421a0f845557d8dc2175974f29c2e9d12b1a57f634acaafdf56ae7033201a0796bedea056e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421a09109530b191b47ca3d91012faba70fcf307f13b030f19d932cab38f2c1ece7b78304157c",
      nonce: "0x41589",
      signatures: [{...}],
      type: "TxTypeChainDataAnchoring",
      typeInt: 72
  }, {
      from: "0xa057995175b93ee0d1bdfa54f078ad0f0116130b",
      gas: "0x186a0",
      gasPrice: "0x5d21dba00",
      hash: "0x4dd093916a419608091da28b5d7ffc6e34d894ddaac96328f1904bfef93a4ad0",
      input: "0xf8a9a05b0dd6cc938916e37b17b602690399987b4e8540a14a494626d85e947f721a10a056e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421a063f41a6ec8e2f8074c30fccf11f2b8479e7ebd8a0e5aa0c171623bc1f3812e33a056e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421a09109530b191b47ca3d91012faba70fcf307f13b030f19d932cab38f2c1ece7b78304157d",
      nonce: "0x4158a",
      signatures: [{...}],
      type: "TxTypeChainDataAnchoring",
      typeInt: 72
  }]
}
```

