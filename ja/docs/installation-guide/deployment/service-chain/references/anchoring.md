デザインセクションで説明したように、Service Chainはデータアンカー機能をサポートします。 このページでは、アンカー機能を有効にする方法を示します。 これが有効になっている場合、SCN アンカーは定期的に子チェーンのブロックデータを親チェーンへの存在と不変性の証明としてブロックします。 これにより、サービスチェーンの安全性と信頼性が保証されます。

# アンカーを有効化 <a id="enable-anchoring"></a>

## SCNの親演算子を確認する <a id="check-parent-operator-of-scn"></a>
SCNをインストールして正常に実行した場合は、親チェーンオペレータアカウントを生成する必要があります。 親演算子として使用するキーストアファイルを指定できます。 または提供されていない場合は、SCN がキーを生成します。 親演算子アドレスは RPC API、 `subbridge_parentOperator` で確認できます。

```
$ kscn attach ~/kscnd_home/klay.ipc
Klaytn JavaScript コンソールへようこそ!

インスタンス: Klaytn/vX.X.X/XXXX-XXXX-XXXX/goX.X

 datadir: ~/kscnd_home
 modules: admin:1.0 subbridge:1.0 debug:1.0 governance:1.0 klay:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 servicechain:1.0 txpool:1.0
 > subbridge.parentOperator
 "0x726e5C8705892989DAB1E9982FBE0B0A92eC84Bf"

```
*この親オペレーターアカウントアドレスは、 `$dataDIR/parent_bridge_account` ディレクトリのキーストアファイルから派生します。*


## 親オペレーターアカウントにKLAYを追加<a id="add-klay-to-parent-operator-account"></a>
SCNがブロックデータをアンカーする場合、SCNは親オペレータとしてアンカートランザクションを作成します。 そのため、取引手数料を支払うにはKLAYが必要です。 親演算子口座に十分な KLAYを追加する必要があります。

## アンカーを有効化 <a id="enable-anchoring"></a>
KLAYを送った後、以下のように残高を確認することができます。
```javascript
> subbridge.parentOperatorBalance
1e+50
```

以下のように、 `subbridge.anchoring`を介してアンカーを有効にすることができます。 詳細については、 [subbridge API](../../../bapp/json-rpc/api-references/subbridge.md#subbridge_anchoring) を参照してください。
```
> subbridge.anchoring(true)
true
```

# アンカーデータの確認 <a id="check-anchoring-data"></a>
アンカー機能が有効になっている場合、SCN はブロックデータを定期的にメインチェーンにアンカーします。 アンカーされたデータは以下のように確認できます。

## サブブリッジ <a id="sub-bridge"></a>
サブブリッジでは、最新のアンカーされたブロック番号を以下のように確認できます。 詳細については、 [subbridge API](../../../bapp/json-rpc/api-references/subbridge.md#subbridge_latestAnchoredBlockNumber) を参照してください。
```javascript
> subbridge.latestAnkirdBlockNumber
71025
```

また、以下のようにサービスチェーンブロック番号によってアンカートランザクションハッシュを見つけることができます。
```javascript
> subbridge.getAnchoringTxHashByBlockNumber(1055)
"0x9a68591c0faa138707a90a7506840c562328aeb7621ac0561467c371b0322d51"
```

## メインブリッジ <a id="sub-bridge"></a>
Main-Bridgeでは、チェーンインデックス作成オプションが有効になっている場合、以下のようにサービスチェーンブロックハッシュによってアンカーtxハッシュを見つけることができます。 詳細は [メインブリッジ API](../../../bapp/json-rpc/api-references/mainbridge.md#mainbridge_convertChildChainBlockHashToParentChainTxHash) を参照してください。

```javascript
> mainbridge.convertChildChainBlockHashToParentChainTxHash("0xeadc6a3a29a20c13824b5df1ba05cca1ed248d046382a4f2792aac8a6e0d1880")
"0x9a68591c0faa138707a90a7506840c562328aeb7621ac0561467c371b0322d51"
```

トランザクションハッシュをアンカーすることで、デコードされたアンカーデータを取得することができます。
```javascript
> klay.getDecodedAnchoringTransactionByHash("0x9a68591c0faa138707a90a7506840c562328aeb7621ac0561467c371b0322d51")
{
  BlockCount: 1,
  BlockHash: "0xcf5f591836d70a1da8e6bb8e5b2c5739329ca0e535b91e239b332af2e1b7f1f4",
  BlockNumber: 1055,
  ParentHash: "0x70f6115a5b597f29791d3b5e3f129df54778f69ae669842cc81ec8c432fee37c",
  ReceiptHash: "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
  StateRootHash: "0x654773348f77a6788c76c93946340323c9b39399d0aa173f6b23fe082848d056",
  TxCount: 0,
  TxHash: "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421"
}
```
