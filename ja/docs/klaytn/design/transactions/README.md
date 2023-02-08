# 取引 <a id="transactions"></a>

## 取引の概要 <a id="transactions-overview"></a>

A transaction in a blockchain platform is a message sent between nodes that changes the state of the blockchain. 例えば、Aliceのアカウントから10KLAYを送信するトランザクションが実行された場合 アリスの残高は10KLAY、ボブの残高は10KLAY増加します。 トランザクションはアトミックな操作のため、トランザクションは別のトランザクションとインターリーブできないことに注意してください。 一般的なブロックチェーントランザクションには、以下のようなコンポーネントがあります。

| コンポーネント  | Description                                                                                                                                                                                                  |
|:-------- |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| value    | 転送する `peb` 内の KLAYの量。                                                                                                                                                                                        |
| to       | The account address that will receive the transferred value.                                                                                                                                                 |
| input    | Data attached to the transaction, used for transaction execution.                                                                                                                                            |
| v,r s    | 送信者によって生成された暗号署名で、受信者が送信者のアドレスを取得することができます。                                                                                                                                                                  |
| nonce    | 送信者のトランザクションを一意に識別するために使用される値。 同じノンスを持つ2つのトランザクションが送信者によって生成された場合、1つだけが実行されます。                                                                                                                               |
| gas      | The maximum amount of transaction fee the transaction is allowed to use.                                                                                                                                     |
| gasPrice | 送信者がトークンで支払う金額を取得する倍数。 送信者が支払うトークンの金額は、 `ガス` \* `gasPrice` で計算されます。 例えば、ガスが10でgasPriceが10^18の場合、送信者はトランザクション手数料として10KLAYを支払います。 KLAYの単位についてはこちら [](../../design/klaytn-native-coin-klay.md#units-of-klay). |

## Klaytn 取引 <a id="klaytn-transactions"></a>

一般的なブロックチェーンプラットフォームは単一のトランザクションタイプを提供します。 Klaytnは、メモリフットプリントとパフォーマンスのための新しい機能と最適化でトランザクションを強化する複数のトランザクションタイプを提供します。

### トランザクションの署名検証 <a id="signature-validation-of-transactions"></a>

典型的なブロックチェーンプラットフォームでは、アドレスはトランザクション署名から再び派生した公開鍵から派生します。 これは、アドレスと鍵ペアが強く結合されている場合にのみ可能です。

Klaytnのアドレスから鍵ペアが分離されるため、送信者アドレスはトランザクション署名を使用して派生することはできません。 これが、TxTypeLegacyTransaction 以外の Klaytn トランザクションタイプが `から` フィールドを持っている理由です。 Klaytn でトランザクションを検証するには、 [から](../accounts.md#account-key) の `AccountKey` を取得します。 取得されたキーはトランザクション署名を検証するために使用されます。

### Fee Delegation <a id="fee-delegation"></a>

ビジネスモデル設計に必要な柔軟性を提供するために、Klaytnは基本的なトランザクションタイプに対していくつかの手数料委任バージョンを提供します。 これらのバリエーションにより、サービスプロバイダーは代わりに取引手数料を支払うことでエンドユーザーの活動を補助することができます。 トランザクション手数料補助金は、Ratioパラメータを使用してトランザクションを使用することで、サービスプロバイダがカバーする手数料の割合を指定することができます。 手数料委譲トランザクションには、送信者からの署名と手数料支払者からの署名が少なくとも2つ必要です。

### SenderTxHash <a id="sendertxhash"></a>

SenderTxHashは手数料支払者のアドレスと署名を持たないトランザクションのハッシュです。 手数料支払者がトランザクションに署名するまで、手数料委任されたトランザクションのトランザクションハッシュはまだ決定されません。 手数料委託トランザクションを追跡する 送信者は、送信者と手数料支払者の両方からの署名を含む完全なトランザクションから派生したトランザクションハッシュを取得する必要があります。 送信者がトランザクションハッシュを取得するのは非常に困難なので、Klaytnはトランザクションハッシュと同様にSenderTxHashを提供します。 Klaytnネットワークで手数料委託された完全なトランザクションを見つけるために、送信者はSenderTxHashを生成し、 [klay_getTransactionBySenderTxHash](../../../bapp/json-rpc/api-references/klay/transaction.md#klay_gettransactionbysendertxhash) を介してトランザクションオブジェクトを要求します。 SenderTxHashを取得する方法は、各トランザクションタイプの説明に記載されている各トランザクションタイプに依存します。

各トランザクションタイプは詳細に記載されています:

|                        | Basic                                                                 | Fee Delegation                                                                                         | Partial Fee Delegation                                                                                                           |
|:---------------------- |:--------------------------------------------------------------------- |:------------------------------------------------------------------------------------------------------ |:-------------------------------------------------------------------------------------------------------------------------------- |
| Legacy                 | [TxTypeLegacyTransaction](basic.md#txtypelegacytransaction)           | N/A                                                                                                    | N/A                                                                                                                              |
| ValueTransfer          | [TxTypeValueTransfer](basic.md#txtypevaluetransfer)                   | [TxTypeFeeDelegatedValueTransfer](fee-delegation.md#txtypefeedelegatedvaluetransfer)                   | [TxTypeFeeDelegatedValueTransferWithRatio](partial-fee-delegation.md#txtypefeedelegatedvaluetransferwithratio)                   |
| ValueTransferMemo      | [TxTypeValueTransferMemo](basic.md#txtypevaluetransfermemo)           | [TxTypeFeeDelegatedValueTransferMemo](fee-delegation.md#txtypefeedelegatedvaluetransfermemo)           | [TxTypeFeeDelegatedValueTransferMemoWithRatio](partial-fee-delegation.md#txtypefeedelegatedvaluetransfermemowithratio)           |
| SmartContractDeploy    | [TxTypeSmartContractDeploy](basic.md#txtypesmartcontractdeploy)       | [TxTypeFeeDelegatedSmartContractDeploy](fee-delegation.md#txtypefeedelegatedsmartcontractdeploy)       | [TxTypeFeeDelegatedSmartContractDeployWithRatio](partial-fee-delegation.md#txtypefeedelegatedsmartcontractdeploywithratio)       |
| SmartContractExecution | [TxTypeSmartContractExecution](basic.md#txtypesmartcontractexecution) | [TxTypeFeeDelegatedSmartContractExecution](fee-delegation.md#txtypefeedelegatedsmartcontractexecution) | [TxTypeFeeDelegatedSmartContractExecutionWithRatio](partial-fee-delegation.md#txtypefeedelegatedsmartcontractexecutionwithratio) |
| AccountUpdate          | [TxTypeAccountUpdate](basic.md#txtypeaccountupdate)                   | [TxTypeFeeDelegatedAccountUpdate](fee-delegation.md#txtypefeedelegatedaccountupdate)                   | [TxTypeFeeDelegatedAccountUpdateWithRatio](partial-fee-delegation.md#txtypefeedelegatedaccountupdatewithratio)                   |
| Cancel                 | [TxTypeCancel](basic.md#txtypecancel)                                 | [TxTypeFeeDelegatedCancel](fee-delegation.md#txtypefeedelegatedcancel)                                 | [TxTypeFeeDelegatedCancelWithRatio](partial-fee-delegation.md#txtypefeedelegatedcancelwithratio)                                 |
| ChainDataAnchoring     | [TxTypeChainDataAnchoring](basic.md#txtypechaindataanchoring)         | [TxTypeFeeDelegatedChainDataAnchoring](fee-delegation.md#txtypefeedelegatedchaindataanchoring)         | [TxTypeFeeDelegatedChainDataAnchoringWithRatio](partial-fee-delegation.md#txtypefeedelegatedchaindataanchoringwithratio)         |


