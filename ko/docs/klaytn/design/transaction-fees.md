# 트랜잭션 비용

현재 Klaytn 가상머신\(KLVM\)의 트랜잭션 비용은 다음과 같이 계산됩니다.

```text
트랜잭션 비용 : = (총 가스 사용량) x (가스 단가)
```

* `총 가스 사용량`은 opcode의 가스 비용과 intrinsic gas cost을 기준으로 KLVM이 계산합니다.
* `unit price`는 Klaytn에서 정한 가스 가격입니다.

이 계산된 트랜잭션 비용은 트랜잭션에 따라 발신자 또는 기업 계좌 잔액에서 차감됩니다.

## 가스 및 단가 개요

### 가스(Gas)

블록체인 상태를 변경하는 모든 행동에는 가스가 필요합니다. 노드가 KLAY 전송, ERC-20 토큰 사용 또는 컨트랙트 실행과 같은 사용자의 트랜잭션을 처리할 때 사용자는 연산 및 스토리지 사용 비용을 지불해야 합니다. 지불 금액은 필요한 `gas`양으로 정합니다.

`가스`는 사용자의 트랜잭션을 처리하는 데 어느 정도의 연산이 필요한지를 나타내는 측정 단위입니다.

### 단가(Unit Price)

`단가`는 가스당 가격입니다. 단가 \(`가스 가격`\라고도 함)는 거버넌스에 의해 시스템에 설정되어 있습니다. 현재는 가스당 25 Gpeb\(*즉*, 25 x 10^9 peb\)로 설정되어있으며, 사용자에 의해 바뀔 수 없습니다. 현재의 단가 정보는 `klay.gasPrice` API를 호출하여 얻을 수 있습니다.

이더리움에서 사용자는 각 트랜잭션에 대한 가스 가격을 설정하고, 마이너들은 보상을 극대화하기 위해 특정 거래를 그들의 블록에 포함시킬 수 있습니다. 이는 한정된 자원을 얻기 위한 경매와 같습니다. 이 접근 방식은 시장을 기반으로 하므로 작동합니다. 하지만, 트랜잭션 비용의 변동이 심하고 실행을 보장할 수 없을 정도로 자주 너무 높아집니다.

이 문제를 해결하기 위해 Klaytn은 고정된 단가를 사용하고 있으며 가격은 governance council에서 조정할 수 있습니다. 이 정책은 모든 트랜잭션이 동일하게 처리되고 실행되도록 보장합니다. 따라서, 사용자는 적절한 단가를 결정하기 위해 애쓸 필요가 없습니다.

#### Transaction Validation against Unit Price

Klaytn only accepts transactions with gas prices, which can be set by the user, that are equal to the unit price of Klaytn; it rejects transactions with gas prices that are different from the unit price in Klaytn.

#### 단가 오류(Unit Price Error)

트랜잭션의 가스 가격이 Klaytn의 단가(Unit price)와 같지 않을 때, 에러 메시지인 `invalid unit price`가 반환됩니다.

### 트랜잭션 교체

Klaytn은 현재 단가를 이용하는 트랜잭션을 교체할 수 없습니다. 하지만 향후 트랜잭션 교체를 위한 방법이 지원될 것입니다. 이더리움에서는 주어진 nonce를 가진 트랜잭션이 더 높은 가스 가격으로 설정된 트랜잭션에 의해 교체될 수 있습니다.

## Klaytn의 가스표

기본적으로 Klaytn은 이더리움과 호환성을 유지합니다. 그래서 Klaytn의 가스표는 이더리움과 매우 유사합니다. 하지만 Klaytn의 고유한 기능이 있기 때문에, 그런 기능들을 위한 다른 수치들이 있습니다.

### 공통 비용<a id="common-fee"></a>

| 항목                | 가스    | 설명                                                                                               |
|:----------------- |:----- |:------------------------------------------------------------------------------------------------ |
| G\_zero         | 0     | Set Wzero 연산을 위해 지불할 금액은 없음                                                                      |
| G\_base         | 2     | Set Wbase 연산을 위해 지불하는 가스량                                                                        |
| G\_verylow      | 3     | Set Wverylow 연산을 위해 지불하는 가스량                                                                     |
| G\_low          | 5     | Set Wlow 연산을 위해 지불하는 가스량                                                                         |
| G\_mid          | 8     | Set Wmid 연산을 위해 지불하는 가스량                                                                         |
| G\_high         | 10    | Set Whigh 연산을 위해 지불하는 가스량                                                                        |
| G\_blockhash    | 20    | BLOCKHASH 연산을 위해 지불하는 가스량                                                                        |
| G\_extcode      | 700   | Set Wextcode 연산을 위해 지불하는 가스량                                                                     |
| G\_balance      | 400   | BALANCE 연산을 위해 지불하는 가스량                                                                          |
| G\_sload        | 200   | SLOAD 연산을 위해 지불되는 가스량                                                                            |
| G\_jumpdest     | 1     | JUMPDEST 연산을 위해 지불되는 가스량                                                                         |
| G\_sset         | 20000 | Storage value가 0에서 0이 아니도록 변경된 경우 SSTORE 연산을 위해 지불하는 가스량                                         |
| G\_sreset       | 5000  | Storage value가 0이 유지되거나 0으로 바뀐 경우 SSTORE 연산을 위해 지불하는 가스량                                         |
| G\_sclear       | 15000 | Refund given \(added into refund counter\) when the storage value is set to zero from non-zero |
| R\_selfdestruct | 24000 | Refund given \(added into refund counter\) for self-destructing an account                     |
| G\_selfdestruct | 5000  | SELFDESTRUCT 연산을 위해 지불하는 가스량                                                                     |
| G\_create       | 32000 | CREATE 연산을 위해 지불되는 가스량                                                                           |
| G\_codedeposit  | 200   | Paid per byte for a CREATE operation to succeed in placing code into state                       |
| G\_call         | 700   | CALL 연산을 위해 지불되는 가스량                                                                             |
| G\_callvalue    | 9000  | Paid for a non-zero value transfer as part of the CALL operation                                 |
| G\_callstipend  | 2300  | A stipend for the called contract subtracted from Gcallvalue for a non-zero value transfer       |
| G\_newaccount   | 25000 | Paid for a CALL or SELFDESTRUCT operation which creates an account                               |
| G\_exp          | 10    | Partial payment for an EXP operation                                                             |
| G\_expbyte      | 50    | Partial payment when multiplied by dlog256\(exponent\)e for the EXP operation                  |
| G\_memory       | 3     | Paid for every additional word when expanding memory                                             |
| G\_txcreate     | 32000 | Paid by all contract-creating transactions                                                       |
| G\_transaction  | 21000 | 모든 트랜잭션에 대해 지불하는 가스량                                                                             |
| G\_log          | 375   | LOG 연산에 대한 부분 지불                                                                                 |
| G\_logdata      | 8     | LOG 연산 데이터의 각 바이트에 대해 지불하는 가스량                                                                   |
| G\_logtopic     | 375   | Paid for each topic of a LOG operation                                                           |
| G\_sha3         | 30    | SHA3 연산을 위해 지불되는 가스량                                                                             |
| G\_sha3word     | 6     | Paid for each word \(rounded up\) for input data to a SHA3 operation                           |
| G\_copy         | 3     | Partial payment for \*COPY operations, multiplied by words copied, rounded up                  |
| G\_blockhash    | 20    | BLOCKHASH 연산을 위해 지불하는 가스량                                                                        |
| G\_extcodehash  | 400   | 컨트랙트 코드의 keccak256 해시값을 얻기 위해 지불하는 가스량                                                           |
| G\_create2      | 32000 | CREATE와 똑같이 작동하지만 다른 인수를 사용하는 CREATE2 연산자를 위해 지불하는 가스량.                                          |


### 미리 컴파일된 컨트랙트(Precompiled Contracts) <a id="precompiled-contracts"></a>

미리 컴파일된 컨트랙트는 일반적으로 복잡한 암호화 연산을 수행하며, 다른 컨트랙트에 의해 실행되는 특수한 유형의 컨트랙트입니다.

| 항목                      | 가스                 | 설명                           |
|:----------------------- |:------------------ |:---------------------------- |
| EcrecoverGas            | 3000               | ECRecover 연산 수행              |
| Sha256BaseGas           | 60                 | sha256 hash 연산 수행            |
| Sha256PerWordGas        | 12                 | ​                            |
| Ripemd160BaseGas        | 600                | Ripemd160 연산 수행              |
| Ripemd160PerWordGas     | 120                | ​                            |
| IdentityBaseGas         | 15                 | ​                            |
| IdentityPerWordGas      | 3                  | ​                            |
| ModExpQuadCoeffDiv      | 20                 | ​                            |
| Bn256AddGas             | 500                | Bn256 elliptic curve 연산 수행   |
| Bn256ScalarMulGas       | 40000              | ​                            |
| Bn256PairingBaseGas     | 100000             | ​                            |
| Bn256PairingPerPointGas | 80000              | ​                            |
| VMLogBaseGas            | 100                | 노드의 로그 파일에 로그 쓰기 - Klaytn 전용 |
| VMLogPerByteGas         | 20                 | Klaytn only                  |
| FeePayerGas             | 300                | feePayer의 주소 획득 - Klaytn 전용  |
| ValidateSenderGas       | 5000 per signature | 발신자의 주소와 서명 검증 - Klaytn 전용   |


XXXBaseGas와 XXXPerWordGas \(e.g. Sha256BaseGas, Sha256PerWordGas\)등을 포함한 항목들의 총 가스량은 다음과 같이 계산됩니다.

```text
TotalGas = XXXBaseGas + (number of words * XXXPerWordGas)
```

ValidateSenderGas는 서명마다 지불해야 합니다.

```text
TotalGas = number of signatures * ValidateSenderGas
```

### Account-related Gas Table <a id="account-related-gas-table"></a>

| 항목                         | 가스    | 설명                                           |
|:-------------------------- |:----- |:-------------------------------------------- |
| TxAccountCreationGasPerKey | 20000 | 키 페어 생성에 필요한 가스                              |
| TxValidationGasPerKey      | 15000 | 키 검증(validation)에 필요한 가스                     |
| TxGasAccountUpdate         | 21000 | 계정 업데이트에 필요한 가스                              |
| TxGasFeeDelegated          | 10000 | 트랜잭션 비용 위임에 필요한 가스                           |
| TxGasFeeDelegatedWithRatio | 15000 | Gas required for a fee delegation with ratio |
| TxGasCancel                | 21000 | nonce가 같은 거래를 취소하는 데 필요한 가스                  |
| TxGasValueTransfer         | 21000 | KLAY 전송에 필요한 가스                              |
| TxGasContractExecution     | 21000 | 컨트랙트 실행을 위한 기본 가스                            |
| TxDataGas                  | 100   | 트랜잭션의 단일 바이트 당 필요한 가스                        |


페이로드 데이터는 아래와 같이 계산됩니다.

```text
GasPayload = number_of_bytes * TxDataGas
```

### 트랜잭션 유형에 따른 가스 계산 공식<a id="gas-formula-for-transaction-types"></a>

| 트랜잭션 유형                | 가스                                                     |
|:---------------------- |:------------------------------------------------------ |
| LegacyTransaction      | TxGas + PayloadGas + KeyValidationGas                  |
| ValueTransfer          | TxGasValueTransfer + KeyValidationGas                  |
| ValueTransferMemo      | TxGasValueTransfer + PayloadGas + KeyValidationGas     |
| AccountUpdate          | TxGasAccountUpdate + KeyCreationGas + KeyValidationGas |
| SmartContractDeploy    | TxGasContractCreation + PayloadGas + KeyValidationGas  |
| SmartContractExecution | TxGasContractExecution + PayloadGas + KeyValidationGas |
| Cancel                 | TxGasCancel + KeyValidationGas                         |


KeyValidationGas는 키 유형에 따라 아래와 같이 정의됩니다.

| 키 유형      | 가스                                                |
|:--------- |:------------------------------------------------- |
| Nil       | N/A                                               |
| Legacy    | 0                                                 |
| Fail      | 0                                                 |
| Public    | 0                                                 |
| MultiSig  | \(keys-1\) \* GasValidationPerKey \(15000\) |
| RoleBased | 검증(validation)에 사용된 역할의 키를 기반으로 함                 |


KeyCreationGas는 키 유형에 따라 아래와 같이 정의됩니다.

| 키 유형      | 가스                                                                                                                                                                                              |
|:--------- |:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Nil       | N/A                                                                                                                                                                                             |
| Legacy    | 0                                                                                                                                                                                               |
| Fail      | 0                                                                                                                                                                                               |
| Public    | GasCreationPerKey \(20000\)                                                                                                                                                                   |
| MultiSig  | \(keys\) \* GasCreationPerKey                                                                                                                                                               |
| RoleBased | 가스 비용은 각 역할의 키를 기반으로 계산됩니다. e.g., GasRoleTransaction = \(keys\) *GasCreationPerKey* *GasRoleAccountUpdate = \(keys\)* GasCreationPerKey GasRoleFeePayer = \(keys\) \* GasCreationPerKey |