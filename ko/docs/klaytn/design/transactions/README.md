# Transactions <a id="transactions"></a>

## 트랜잭션 개요 <a id="transactions-overview"></a>

블록체인 플랫폼의 트랜잭션은 블록체인의 상태를 변경하는 노드간 전송되는 메시지입니다. 예를 들어 Alice의 계정에서 Bob의 계정으로 10 KLAY를 보내는 트랜잭션이 실행될 때 Alice의 잔액은 10 KLAY 감소하고 Bob의 잔액은 10 KLAY 증가합니다. 한 트랜잭션이 다른 트랜잭션 사이에 낄 수 없습니다. 트랜잭션은 아토믹(atomic) 연산이기 때문입니다 일반적인 블록체인 트랜잭션에는 다음과 같은 구성 요소가 있습니다.

| 구성요소    | 설명                                                                                                                                                                                                                                                |
|:------- |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value   | 명시된 양의 KLAY(단위: peb)가 전송됩니다.                                                                                                                                                                                                                      |
| to      | 전송되는 KLAY를 받을 계정 주소입니다.                                                                                                                                                                                                                           |
| input   | 트랜잭션 실행에 이용되며 트랜잭션에 첨부되는 데이터입니다.                                                                                                                                                                                                                  |
| v, r, s | 수신자가 발신자의 주소를 받을 수 있게 발신자에 의해 발생된 암호학적 서명입니다.                                                                                                                                                                                                     |
| 논스      | 발신자의 트랜잭션을 고유하게 식별하기 위해 사용되는 값입니다. 발신자가 동일한 논스를 가진 두 개의 트랜잭션을 생성하면 하나만 실행됩니다.                                                                                                                                                                     |
| gas     | 트랜잭션에서 사용하도록 허락된 최대 트랜잭션 수수료입니다.                                                                                                                                                                                                                  |
| 가스 가격   | 발신자가 얼마나 가스비를 지급해야하는지 알 수 있도록 곱하는 값입니다. 발신자가 지급해야할 비용은 `gas` \* `gasPrice`로 계산됩니다. 예를 들어, 만약 가스가 10이 필요하고 gasPrice가 10^18이라면 발신자는 트랜잭션을 위해 10 KLAY를 지급해야 합니다. KLAY의 단위는 [여기](../../design/klaytn-native-coin-klay.md#units-of-klay)에 설명되어 있습니다. |

## Klaytn 트랜잭션 <a id="klaytn-transactions"></a>

일반적인 블록체인 플랫폼은 하나의 트랜잭션 유형만 제공합니다. 하지만, Klaytn은 새로운 기능을 제공하고, 메모리 풋 프린트와 퍼포먼스를 최적화하기 위해 여러 가지 트랜잭션 유형을 제공합니다.

### 트랜잭션의 서명 검증 <a id="signature-validation-of-transactions"></a>

일반적인 블록체인 플랫폼에서 주소는 공개키에서 파생되며, 공개키는 트랜잭션 서명에서 다시 파생됩니다. 이런 방식은 주소와 키 쌍이 강력하게 연결된 경우에만 가능합니다.

클레이튼에서 키 쌍은 Klaytn의 주소와 분리되어 있으므로 발신자 주소는 트랜잭션 서명을 사용하여 파생되지 않습니다. 이것이 TxTypeLegacyTransaction을 제외한 다른 Klaytn 트랜잭션 유형의 필드에 `from`이 있는 이유입니다. 트랜잭션을 검증하기 위해 클레이튼에서 `from`의 [AccountKey](../accounts.md#account-key)가 사용됩니다.

### 트랜잭션 수수료 위임 <a id="fee-delegation"></a>

Klaytn은 비즈니스 모델 디자인에 유연성을 제공하기 위해 기본 트랜잭션 유형들에 대한 여러 가지 비용 위임 버전을 제공합니다. 이러한 변형을 통해 서비스 제공자가 대신 트랜잭션 수수료를 지불하여 최종 사용자 활동에 보조금을 지급할 수 있습니다. 트랜잭션 수수료 보조금은 Ratio parameter를 조정하여 서비스 제공자가 커버할 수수료의 비율을 정할 수 있습니다. 트랜잭션 수수료 위임 트랜잭션은 적어도 두 개의 서명이 필요하다. 하나는 발신자로부터, 또 다른 하나는 트랜잭션 수수료 지불인으로부터의 서명이다.

### SenderTxHash <a id="sendertxhash"></a>

SenderTxHash는 트랜잭션 수수료 납부자의 주소와 서명이 없는 트랜잭션의 해시입니다. 트랜잭션 수수료 위임 트랜잭션의 트랜잭션 해시는 수수료 지불인이 그 거래에 서명할 때까지 결정되지 않는다. 수수료 위임 트랜잭션을 찾으려면 발신자는 발신자와 트랜잭션 수수료 지불인 모두의 서명이 담긴 완전한 트랜잭션으로부터 파생된 트랜잭션 해시를 얻어야 합니다. 발신자가 트랜잭션 해시를 얻는 것이 매우 어렵기 때문에 Klaytn은 트랜잭션 해시뿐만 아니라 SenderTxHash를 제공합니다. Klaytn 네트워크에서 완전한 수수료 위임 트랜잭션을 찾으려면 발신자는 SenderTxHash을 만들고 트랜잭션 오브젝트를 [klay_getTransactionBySenderTxHash](../../../bapp/json-rpc/api-references/klay/transaction.md#klay_gettransactionbysendertxhash)로 요청해야 합니다. SenderTxHash를 얻기 위한 방법은 트랜잭션 유형에 따라 다릅니다. 관련 내용은 각 트랜잭션 유형의 설명을 참고하세요.

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
| ChainDataAnchoring     | [TxTypeChainDataAnchoring](basic.md#txtypechaindataanchoring)         | [TxTypeFeeDelegatedChainDataAnchoring](fee-delegation.md#txtypefeedelegatedchaindataanchoring)         | [TxTypeFeeDelegatedChainDataAnchoringWithRatio](partial-fee-delegation.md#txtypefeedelegatedchaindataanchoringwithratio)         |


