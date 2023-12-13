---
unlisted: true
---

# 트랜잭션 수수료

:::note

참고: 이 문서에는 `Kore` 프로토콜 업그레이드 활성화 전에 사용된 트랜잭션 수수료가 포함되어 있습니다.
최신 문서를 원하시면 [최신 문서](transaction-fees.md)를 참조하시기 바랍니다.

:::

트랜잭션 한 건당 트랜잭션 수수료는 다음과 같이 계산됩니다:

```text
Transaction fee := (Gas used) x (GasPrice)
```

이와 관련하여 이해하기 쉬운 비유로 주유소에서 기름을 넣는다고 가정해 보겠습니다. 주유 가격은 정유사에서 매일 결정하며, 오늘의 가격은 2달러입니다. 15L를 주유하면 $30 = 15L x $2/1L를 지불하고 30달러는 은행 계좌에서 출금됩니다. 또한 트랜잭션은 계정 장부에 기록됩니다.

트랜잭션 수수료는 위와 동일한 방식으로 작동합니다. 네트워크는 모든 블록의 가스 가격을 결정합니다. 현재 블록의 가스 가격이 30 스톤이라고 가정해봅시다. `from` 계정에서 제출한 트랜잭션에 21000 가스가 청구되었다면, 630000 스톤 = (21000 가스 * 30 스톤)이 `from` 계정에서 지불됩니다. 또한 트랜잭션은 블록에 기록되어 모든 블록체인 노드의 상태에 적용됩니다.

다시 요약하면, 이렇게 계산된 트랜잭션 수수료는 발신자 또는 수수료 지불자의 계정에서 차감됩니다. 단, 수수료는 트랜잭션이 klay_sendTransaction/eth_sendTransaction에 의해 생성된 경우에만 잔액에서 차감될 수 있습니다. 다른 트랜잭션은 블록에 포함될 수 없기 때문에 상태를 변경할 수 없기 때문입니다. 이는 어떤 면에서 시뮬레이션일 뿐입니다.

이것은 트랜잭션 수수료에 대한 전반적인 설명이며, 이 시점부터 가스 가격이 어떻게 결정되고 가스가 어떻게 계산되는지에 대해 자세히 설명해드리겠습니다.

## 단가 개요 <a id="unit-price-overview"></a>

'단가(Unit price)'는 가스 한 개에 대한 가격입니다. 단가(``gas 가격``이라고도 함)는 거버넌스에 의해 시스템에서 설정됩니다. 사용자가 변경할 수 없습니다. 단위 가격의 현재 값은 `klay.gasPrice` API를 호출하여 얻을 수 있습니다.

이더리움에서는 사용자가 각 트랜잭션의 가스 가격을 설정하고, 채굴자는 보상을 최대화하기 위해 블록에 포함할 트랜잭션을 선택합니다. 이는 한정된 자원에 대한 입찰과 같은 것입니다. 이 접근 방식은 시장 기반이기 때문에 효과가 있었습니다. 그러나 트랜잭션 비용이 변동하고 종종 너무 높아져 실행을 보장할 수 없게 됩니다.

이 문제를 해결하기 위해 클레이튼은 고정 단가를 사용하며, 거버넌스 카운슬에서 가격을 조정할 수 있습니다. 이 정책은 모든 트랜잭션이 동등하게 처리되고 실행이 보장되도록 보장합니다. 따라서 사용자는 적절한 단가를 결정하기 위해 고심할 필요가 없습니다.

### 단가 대비 트랜잭션 유효성 검사 <a id="transaction-validation-against-unit-price"></a>

클레이튼은 사용자가 설정할 수 있는 가스가격이 클레이튼의 단가와 동일한 트랜잭션만 허용하고, 클레이튼의 단가와 다른 가스가격의 트랜잭션은 거부합니다.

### 단가 오류 <a id="unit-price-error"></a>

트랜잭션의 가스 가격이 클레이튼의 단가와 같지 않으면 `invalid unit price`라는 오류 메시지가 반환됩니다.

### 트랜잭션 대체 <a id="transaction-replacement"></a>

Klaytn은 현재 단가를 사용하여 트랜잭션을 대체할 수 있는 방법을 제공하지 않지만, 향후 다른 방법으로 트랜잭션을 대체할 수 있도록 지원할 수 있습니다. 이더리움에서는 주어진 논스를 가진 트랜잭션을 더 높은 가스 가격을 가진 새로운 트랜잭션으로 대체할 수 있다는 점에 유의하세요.

## Gas 개요 <a id="gas-overview"></a>

블록체인의 상태를 변경하는 모든 작업에는 gas가 필요합니다. 블록에서 트랜잭션을 처리하는 동안 KLAY를 전송하거나, KIP-7 토큰을 사용하거나, 컨트랙트를 실행할 때 사용자는 연산 및 스토리지 사용량에 대한 비용을 지불해야 합니다. 지불 금액은 필요한 `gas`의 양에 따라 결정됩니다.

필요한 `gas`는 다음 두 가지 가스를 합산하여 계산됩니다;

* `IntrinsicGas`는 트랜잭션의 데이터 크기와 같은 트랜잭션의 구성에 따라 정적으로 부과되는 가스입니다.
* 반면에 `ContractExecutionGas`는 컨트랙트 실행에 따라 동적으로 계산되는 가스입니다.

여기서는 `IntrinsicGas`가 어떻게 구성되는지에 초점을 맞추겠습니다. 계약 실행 가스`에 대해서는 klvm 문서에 자세히 설명되어 있으니 [klvm docs](./computation/klaytn-virtual-machine-previous.md)를 참고하시기 바랍니다.

다시 `IntrinsicGas`로 돌아와서 트랜잭션의 `IntrinsicGas`는 다음 네 가지 요소를 합산하여 계산할 수 있습니다.

```
IntrinsicGasCost = KeyCreationGas + KeyValidationGas + PayloadGas + TxTypedGas
```

* `PayloadGas`는 트랜잭션의 데이터 필드 크기에 따라 계산됩니다.
* `KeyCreationGas`는 트랜잭션이 새 키를 등록할 때 계산됩니다. 계정 업데이트` 트랜잭션에만 적용됩니다.
* `KeyValidationGas`는 서명 수에 따라 계산됩니다.
* `TxTypedGas`는 트랜잭션 유형에 따라 정의됩니다.

자세히 설명하기 전에 모든 키 유형이 키 가스(`KeyCreationGas` 및 `KeyValidationGas`)를 적용하는 것은 아니라는 점에 유의하세요.

| 키 유형 | 해당 키가 적용되나요? |
| :--- | :--- |
| 없음 | 아니요 |
| Legacy | 아니요 |
| Fail | 아니요
| Public | 예 |
| MultiSig | 예 |
| RoleBased | 역할의 키 유형에 따라 다름 |

### KeyCreationGas <a id="keyCreationGas"></a>
`KeyCreationGas`는 `(등록 키 개수) x TxAccountCreationGasPerKey (20000)`로 계산됩니다.

>공개 키 유형은 항상 등록 키가 하나뿐이므로 가스는 항상 20000이 된다는 점에 유의하세요.

### KeyValidationGas <a id="keyValidationGas"></a>
KeyValidationGas는 `(키 수 - 1) x TxValidationGasPerKey(15000)`로 계산됩니다.

>공개키 유형은 항상 서명키가 하나뿐이므로 가스는 항상 0이 된다는 점에 유의하세요.

Klaytn 트랜잭션은 수수료 납부자(feePayer)도 가질 수 있으므로 총 KeyValidationGas는 다음과 같습니다.

```
KeyValidationGas = (발신자에 대한 KeyValidationGas) + (수수료 납부자에 대한 KeyValidationGas)
```

### PayloadGas <a id="payloadGas"></a>
`PayloadGas`는 아래와 같이 계산됩니다.

```
# legacy-typed transaction
PayloadGas = number_of_zero_bytes x TxDataZeroGas (4) + number_of_nonzero_bytes x TxDataNonZeroGas (68)`

# non legacy-typed transaction
PayloadGas = number_of_bytes * TxDataGas (100)
```

### TxTypedGas <a id="txTypedGas"></a>
클레이튼에는 세 가지 유형의 트랜잭션이 있습니다: `base`, `feeDelegated`, `feeDelegatedWithFeeRatio`.

예를 들어
* TxTypeValueTransfer는 가치 트랜잭션 트랜잭션의 `base` 유형입니다.
* TxTypeFeeDelegatedValueTransfer는 valueTransfer 트랜잭션의 `feeDelegated` 유형입니다.
* TxTypeFeeDelegatedValueTransferWithRatio는 valueTransfer 트랜잭션의 `feeDelegatedWithRatio` 유형입니다.

이는 TxTypedGas를 계산할 때 중요합니다:
* 먼저 TxType이 `feeDelegated` 또는 `feeDelegatedWithFeeRatio`인지 확인합니다.
    * TxType이 `feeDelegated`인 경우, `TxGasFeeDelegated(10000)`를 TxTypedGas에 추가합니다.
    * TxType이 `feeDelegatedWithFeeRatio`인 경우, `TxGasFeeDelegatedWithRatio (15000)`를 TxTypedGas에 추가합니다.
* 둘째, 트랜잭션이 컨트랙트를 생성하는지 여부를 확인합니다.
    * 트랜잭션이 컨트랙트를 생성하면 `TxGasContractCreation (53000)`을 TxTypedGas에 추가합니다.
    * 그렇지 않으면 `TxGas (21000)`를 TxTypedGas에 추가합니다.

예를 들어
* 레거시 트랜잭션이고 컨트랙트를 생성하는 경우, TxTypedGas는 `0 + TxGasContractCreation(53000)`이 됩니다.
* TxTypeFeeDelegatedValueTransfer인 경우, TxTypedGas는 `TxGasFeeDelegated(10000) + TxGas (21000)`가 됩니다.
* TxTypeFeeDelegatedSmartContractDeployWithRatio인 경우, TxTypedGas는 `TxGasFeeDelegatedWithRatio (15000) + TxGasContractCreation (53000)`이 됩니다.

