# 트랜잭션

## 트랜잭션 개요

블록체인 플랫폼의 트랜잭션은 블록체인의 상태를 변경하는 노드간 전송되는 메시지입니다. 예를 들어 Alice의 계정에서 Bob의 계정으로 10 KLAY를 보내는 트랜잭션이 실행될 때 Alice의 잔액은 10 KLAY 감소하고 Bob의 잔액은 10 KLAY 증가합니다. 한 트랜잭션이 다른 트랜잭션 사이에 낄 수 없습니다. 트랜잭션은 아토믹(atomic) 연산이기 때문입니다 일반적인 블록체인 트랜잭션에는 다음과 같은 구성 요소가 있습니다.

| 구성요소     | 설명                                                                                                                                                                                                                                                |
|:-------- |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value    | 명시된 양의 KLAY(단위: peb)가 전송됩니다.                                                                                                                                                                                                                      |
| to       | 전송되는 KLAY를 받을 계정 주소입니다.                                                                                                                                                                                                                           |
| input    | 트랜잭션 실행에 이용되며 트랜잭션에 첨부되는 데이터입니다.                                                                                                                                                                                                                  |
| v, r, s  | 수신자가 발신자의 주소를 받을 수 있게 발신자에 의해 발생된 암호학적 서명입니다.                                                                                                                                                                                                     |
| nonce    | 발신자의 트랜잭션을 고유하게 식별하기 위해 사용되는 값입니다. 발신자가 동일한 nonce를 가진 두 개의 트랜잭션을 생성하면 하나만 실행됩니다.                                                                                                                                                                  |
| gas      | 트랜잭션에서 사용하도록 허락된 최대 트랜잭션 비용입니다.                                                                                                                                                                                                                   |
| gasPrice | 발신자가 얼마나 가스비를 지급해야하는지 알 수 있도록 곱하는 값입니다. 발신자가 지급해야할 비용은 `gas` \* `gasPrice`로 계산됩니다. 예를 들어, 만약 가스가 10이 필요하고 gasPrice가 10^18이라면 발신자는 트랜잭션을 위해 10 KLAY를 지급해야 합니다. KLAY의 단위는 [여기](../../design/klaytn-native-coin-klay.md#units-of-klay)에 설명되어 있습니다. |

## Klaytn 트랜잭션

While typical Blockchain platforms provide a single transaction type, Klaytn provides multiple transaction types that empower transactions with new capabilities and optimizations for memory footprint and performance.

### 트랜잭션의 서명 검증

In typical blockchain platforms, the address is derived from the public key which is derived again from the transaction signature. This is possible only if the address and the key pair are strongly coupled.

Since a key pair is decoupled from the address in Klaytn, the sender address cannot be derived using the transaction signature. This is why Klaytn transaction types except TxTypeLegacyTransaction have the field `from`. In Klaytn, to validate a transaction, the [AccountKey](../accounts.md#account-key) of `from` is obtained, and the obtained key is used to validate the transaction signature.

### 트랜잭션 비용 위임

To provide businesses with the necessary flexibility in their business model design, Klaytn provides a number of fee-delegated versions for its basic transaction types. These variants enable service providers to subsidize their end-user activities by paying for their transaction fees instead. Transaction fee subsidization can be further detailed by using transactions with the Ratio parameter, letting service providers designate the percentage of fees they would cover. Fee-delegation transactions require at least two signatures: one from the sender, and another from the fee payer.

### SenderTxHash

SenderTxHash는 트랜잭션 비용 지불자의 주소와 서명이 없는 트랜잭션의 해시입니다. The transaction hash of a fee-delegated transaction is not determined yet until the fee payer signs the transaction. To track a fee-delegated transaction, the sender should get the transaction hash derived from the complete transaction containing the signatures from both the sender and the fee payer. Since it is very hard for the sender to get the transaction hash, Klaytn provides a SenderTxHash as well as the transaction hash. To find the complete fee-delegated transaction in the Klaytn network, the sender generates the SenderTxHash and requests a transaction object via [klay_getTransactionBySenderTxHash](../../../bapp/json-rpc/api-references/klay/transaction.md#klay_gettransactionbysendertxhash). How to get the SenderTxHash depends on each transaction type, which is described in the description of each transaction type.

각 트랜잭션 유형을 자세하게 살펴보면 다음과 같습니다.

|                        | 기본                                                                    | 트랜잭션 비용 위임                                                                                             | 부분 트랜잭션 비용 위임                                                                                                                    |
|:---------------------- |:--------------------------------------------------------------------- |:------------------------------------------------------------------------------------------------------ |:-------------------------------------------------------------------------------------------------------------------------------- |
| Legacy                 | [TxTypeLegacyTransaction](basic.md#txtypelegacytransaction)           | N/A                                                                                                    | N/A                                                                                                                              |
| ValueTransfer          | [TxTypeValueTransfer](basic.md#txtypevaluetransfer)                   | [TxTypeFeeDelegatedValueTransfer](fee-delegation.md#txtypefeedelegatedvaluetransfer)                   | [TxTypeFeeDelegatedValueTransferWithRatio](partial-fee-delegation.md#txtypefeedelegatedvaluetransferwithratio)                   |
| ValueTransferMemo      | [TxTypeValueTransferMemo](basic.md#txtypevaluetransfermemo)           | [TxTypeFeeDelegatedValueTransferMemo](fee-delegation.md#txtypefeedelegatedvaluetransfermemo)           | [TxTypeFeeDelegatedValueTransferMemoWithRatio](partial-fee-delegation.md#txtypefeedelegatedvaluetransfermemowithratio)           |
| SmartContractDeploy    | [TxTypeSmartContractDeploy](basic.md#txtypesmartcontractdeploy)       | [TxTypeFeeDelegatedSmartContractDeploy](fee-delegation.md#txtypefeedelegatedsmartcontractdeploy)       | [TxTypeFeeDelegatedSmartContractDeployWithRatio](partial-fee-delegation.md#txtypefeedelegatedsmartcontractdeploywithratio)       |
| SmartContractExecution | [TxTypeSmartContractExecution](basic.md#txtypesmartcontractexecution) | [TxTypeFeeDelegatedSmartContractExecution](fee-delegation.md#txtypefeedelegatedsmartcontractexecution) | [TxTypeFeeDelegatedSmartContractExecutionWithRatio](partial-fee-delegation.md#txtypefeedelegatedsmartcontractexecutionwithratio) |
| AccountUpdate          | [TxTypeAccountUpdate](basic.md#txtypeaccountupdate)                   | [TxTypeFeeDelegatedAccountUpdate](fee-delegation.md#txtypefeedelegatedaccountupdate)                   | [TxTypeFeeDelegatedAccountUpdateWithRatio](partial-fee-delegation.md#txtypefeedelegatedaccountupdatewithratio)                   |
| Cancel                 | [TxTypeCancel](basic.md#txtypecancel)                                 | [TxTypeFeeDelegatedCancel](fee-delegation.md#txtypefeedelegatedcancel)                                 | [TxTypeFeeDelegatedCancelWithRatio](partial-fee-delegation.md#txtypefeedelegatedcancelwithratio)                                 |
| ChainDataAnchoring     | [TxTypeChainDataAnchoring](basic.md#txtypechaindataanchoring)         | N/A                                                                                                    | N/A                                                                                                                              |

