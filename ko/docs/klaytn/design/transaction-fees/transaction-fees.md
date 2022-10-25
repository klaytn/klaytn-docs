# 트랜잭션 수수료 <a id="transaction-fees"></a>
The transaction fee for the current Klaytn virtual machine \(KLVM\) is calculated as follows:

```text
(Transaction Fee) := (Gas Used) * (Base Fee)
```

* The `Gas Used` is computed by KLVM based on the gas cost of the opcode and the intrinsic gas cost.
* `Base Fee` is the actual gas price used for the transaction. It has the same meaning as the `Effective Gas Price`.

This calculated transaction fee is subtracted from the sender's or fee payer's account balance, depending on the transaction.

## Gas and Base Fee Overview <a id="gas-and-base-fee-overview"></a>
### 가스 <a id="gas"></a>
블록체인 상태를 변경하는 모든 행동에는 가스가 필요합니다. When a node processes a user's transaction, such as sending KLAY, using KIP-7 tokens, or executing a contract, the user has to pay for the computation and storage usage. The payment amount is decided by the amount of `gas` required.

`가스`는 사용자의 트랜잭션을 처리하는 데 어느 정도의 연산이 필요한지를 나타내는 측정 단위입니다.

### Dynamic Gas Fee Mechanism <a id="dynamic-gas-fee-mechanism"></a>
Since the Klaytn v1.9.0 hard fork, a dynamic gas fee mechanism has replaced the existing fixed fee policy. Dynamic gas fee policy provides a stable service to users by preventing network abuse and storage overuse. The gas fee changes according to the network situation. Seven parameters affect the `base fee(gas fee)`:

1. PREVIOUS_BASE_FEE: Base fee of the previous block
2. GAS_USED_FOR_THE_PREVIOUS_BLOCK: Gas used to process all transactions of the previous block
3. GAS_TARGET: The gas amount that determines the increase or decrease of the base fee (30 million at the moment)
4. MAX_BLOCK_GAS_USED_FOR_BASE_FEE: Implicit block gas limit to enforce the max basefee change rate (60 million at the moment)
5. BASE_FEE_DELTA_REDUCING_DENOMINATOR: The value to set the maximum base fee change to 5% per block (20 at the moment, can be changed later by governance)
6. UPPER_BOUND_BASE_FEE: The maximum value for the base fee (750 ston at the moment, can be changed later by governance)
7. LOWER_BOUND_BASE_FEE: The minimum value for the base fee (25 ston at the moment, can be changed later by governance)

### Base Fee <a id="base-fee"></a>
The basic idea of this algorithm is that the `base fee` would go up if the gas used exceeds the base gas and vice versa. It is closely related to the number of transactions in the network and the gas used in the process. There is an upper and lower limit for the `base fee` to prevent the fee from increasing or decreasing indefinitely. There is also a cap for the gas and an adjustment value for the fluctuation to prevent abrupt changes in the `base fee`. The values can be changed by governance.

```text
(BASE_FEE_CHANGE_RATE) = (GAS_USED_FOR_THE_PREVIOUS_BLOCK - GAS_TARGET)
(ADJUSTED_BASE_FEE_CHANGE_RATE) = (BASE_FEE_CHANGE_RATE) / (GAS_TARGET) / (BASE_FEE_DELTA_REDUCING_DENOMINATOR)
(BASE_FEE_CHANGE_RANGE) = (PREVIOUS_BASE_FEE) * (ADJUSTED_BASE_FEE_CHANGE_RATE)
(BASE_FEE) = (PREVIOUS_BASE_FEE) + (BASE_FEE_CHANGE_RANGE) 
```

The `base fee` is calculated for every block; there could be changes every second. Transactions from a single block use the same `base fee` to calculate transaction fees. Only transactions with a gas price higher than the block `base fee` can be included in the block. Half of the transaction fee for each block is burned (BURN_RATIO = 0.5, cannot be changed by governance).

> NOTE: An important feature that sets Klaytn apart from Ethereum's EIP-1559 is that it does not have tips. Klaytn follows the First Come, First Served(FCFS) principle for its transactions.

### 트랜잭션 교체 <a id="transaction-replacement"></a>

Klaytn은 현재 단가를 이용하는 트랜잭션을 교체할 수 없습니다. 하지만 향후 트랜잭션 교체를 위한 방법이 지원될 것입니다. 이더리움에서는 주어진 논스를 가진 트랜잭션이 더 높은 가스 가격으로 설정된 트랜잭션에 의해 교체될 수 있습니다.

## Klaytn의 가스표  <a id="klaytns-gas-table"></a>

기본적으로 Klaytn은 이더리움과 호환성을 유지합니다. 그래서 Klaytn의 가스표는 이더리움과 매우 유사합니다. But there are some features unique to Klaytn that require several new constants.

{% hint style="success" %}
NOTE: The gas table has changed with the `IstanbulEVM` protocol upgrade, or the "hard fork". If you want the previous document, please refer to [previous document](transaction-fees-previous.md).

`IstanbulEVM` protocol upgrade block number is as follows.
* Baobab Testnet: `#75373312`
* Cypress Mainnet: `#86816005`
{% endhint %}

### 공통 비용<a id="common-fee"></a>

| 항목                | 가스    | 설명                                                         |
|:----------------- |:----- |:---------------------------------------------------------- |
| G\_zero         | 0     | Set Wzero 연산을 위해 지불할 금액은 없음                                |
| G\_base         | 2     | Set Wbase 연산을 위해 지불하는 가스량                                  |
| G\_verylow      | 3     | Set Wverylow 연산을 위해 지불하는 가스량                               |
| G\_low          | 5     | Set Wlow 연산을 위해 지불하는 가스량                                   |
| G\_mid          | 8     | Set Wmid 연산을 위해 지불하는 가스량                                   |
| G\_high         | 10    | Set Whigh 연산을 위해 지불하는 가스량                                  |
| G\_blockhash    | 20    | BLOCKHASH 연산을 위해 지불하는 가스량                                  |
| G\_extcode      | 700   | Set Wextcode 연산을 위해 지불하는 가스량                               |
| G\_balance      | 700   | BALANCE 연산을 위해 지불하는 가스량                                    |
| G\_sload        | 800   | SLOAD 연산을 위해 지불되는 가스량                                      |
| G\_jumpdest     | 1     | JUMPDEST 연산을 위해 지불되는 가스량                                   |
| G\_sset         | 20000 | Storage value가 0에서 0이 아니도록 변경된 경우 SSTORE 연산을 위해 지불하는 가스량   |
| G\_sreset       | 5000  | Storage value가 0이 유지되거나 0으로 바뀐 경우 SSTORE 연산을 위해 지불하는 가스량   |
| G\_sclear       | 15000 | 스토리지 값이 0이 아닌 경우에서 0으로 설정된 경우 반환되는 양(반환 카운터가 추가됨)          |
| R\_selfdestruct | 24000 | 계정 self-destructing시 반환되는 양(반환 카운터가 추가됨)                   |
| G\_selfdestruct | 5000  | SELFDESTRUCT 연산을 위해 지불하는 가스량                               |
| G\_create       | 32000 | CREATE 연산을 위해 지불되는 가스량                                     |
| G\_codedeposit  | 200   | CREATE 연산이 코드를 상태에 배치하는 데 바이트당 지불하는 가스량                    |
| G\_call         | 700   | CALL 연산을 위해 지불되는 가스량                                       |
| G\_callvalue    | 9000  | CALL 연산의 일부로 0이 아닌 값 전송에 대해 지불되는 가스량                       |
| G\_callstipend  | 2300  | 0이 아닌 값 전송을 위해 호출된 컨트랙트에 지불하는 비용으로 Gcallvalue에서 차감된 금액     |
| G\_newaccount   | 25000 | 계정을 생성하는 SELFDESTRUCT나 CALL 연산을 위해 지불하는 가스량                |
| G\_exp          | 10    | EXP 연산에 대한 부분 지불                                           |
| G\_expbyte      | 50    | EXP 연산에서 dlog256\(exponent\)e가 곱해질 때 부분 지불하는 가스량         |
| G\_memory       | 3     | 메모리를 확장하는 모든 추가적인 단어를 위해 지불하는 가스량                          |
| G\_txcreate     | 32000 | 모든 컨트랙트 생성 트랜잭션을 위해 지불하는 가스량                               |
| G\_transaction  | 21000 | 모든 트랜잭션에 대해 지불하는 가스량                                       |
| G\_log          | 375   | LOG 연산에 대한 부분 지불하는 가스량                                     |
| G\_logdata      | 8     | LOG 연산 데이터의 각 바이트에 대해 지불하는 가스량                             |
| G\_logtopic     | 375   | LOG 연산의 각 topic마다 지불되는 가스량                                 |
| G\_sha3         | 30    | SHA3 연산을 위해 지불되는 가스량                                       |
| G\_sha3word     | 6     | SHA3 연산에 대한 입력 데이터의 각 단어(반올림)에 대해 지불하는 가스량                 |
| G\_copy         | 3     | \*COPY 연산에 대한 부분 지불량. 복사된 단어에 곱하고, 반올림 됨.                |
| G\_blockhash    | 20    | BLOCKHASH 연산을 위해 지불하는 가스량                                  |
| G\_extcodehash  | 700   | 컨트랙트 코드의 keccak256 해시를 얻기 위해 지불하는 가스량                      |
| G\_create2      | 32000 | CREATE와 똑같이 작동하지만 다른 인수를 사용하는 CREATE2 Opcode를 위해 지불하는 가스량. |

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
| Bn256AddGas             | 150                | Bn256 elliptic curve 연산 수행   |
| Bn256ScalarMulGas       | 6000               | ​                            |
| Bn256PairingBaseGas     | 45000              | ​                            |
| Bn256PairingPerPointGas | 34000              | ​                            |
| VMLogBaseGas            | 100                | 노드의 로그 파일에 로그 쓰기 - Klaytn 전용 |
| VMLogPerByteGas         | 20                 | Klaytn 전용                    |
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

Blake2f gas cost is calculated based on the below formula. `input` is the input of the blake2f call.
```text
Gas = uint64(binary.BigEndian.Uint32(input[0:4]))
```

### 계정 관련 가스 수수료 표 <a id="account-related-gas-table"></a>

| 항목                         | 가스    | 설명                         |
|:-------------------------- |:----- |:-------------------------- |
| TxAccountCreationGasPerKey | 20000 | 키 페어 생성에 필요한 가스            |
| TxValidationGasPerKey      | 15000 | 키 검증(validation)에 필요한 가스   |
| TxGasAccountUpdate         | 21000 | 계정 업데이트에 필요한 가스            |
| TxGasFeeDelegated          | 10000 | 트랜잭션 수수료 위임에 필요한 가스        |
| TxGasFeeDelegatedWithRatio | 15000 | Ratio 트랜잭션 수수료 위임에 필요한 가스  |
| TxGasCancel                | 21000 | 논스가 같은 트랜잭션을 취소하는 데 필요한 가스 |
| TxGasValueTransfer         | 21000 | KLAY 전송에 필요한 가스            |
| TxGasContractExecution     | 21000 | 컨트랙트 실행을 위한 기본 가스          |
| TxDataGas                  | 100   | 트랜잭션의 단일 바이트 당 필요한 가스      |

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

KeyValidationGas is defined as below based on the key type,

| 키 유형      | 가스                                                                  |
|:--------- |:------------------------------------------------------------------- |
| Nil       | N/A                                                                 |
| Legacy    | 0                                                                   |
| Fail      | 0                                                                   |
| Public    | 0                                                                   |
| MultiSig  | \(number of signatures - 1\) \* GasValidationPerKey \(15000\) |
| RoleBased | 검증(validation)에 사용된 역할의 키를 기반으로 함                                   |

KeyCreationGas is defined as below based on the key type,

| 키 유형      | 가스                                                                                                                                                                                              |
|:--------- |:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Nil       | N/A                                                                                                                                                                                             |
| Legacy    | 0                                                                                                                                                                                               |
| Fail      | 0                                                                                                                                                                                               |
| Public    | GasCreationPerKey \(20000\)                                                                                                                                                                   |
| MultiSig  | \(keys\) \* GasCreationPerKey                                                                                                                                                               |
| RoleBased | 가스 비용은 각 역할의 키를 기반으로 계산됩니다. e.g., GasRoleTransaction = \(keys\) _GasCreationPerKey_ _GasRoleAccountUpdate = \(keys\)_ GasCreationPerKey GasRoleFeePayer = \(keys\) \* GasCreationPerKey |

