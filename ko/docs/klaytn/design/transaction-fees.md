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

#### Unit Price Error

The error message `invalid unit price` is returned when the gas price of a transaction is not equal to the unit price of Klaytn.

### Transaction Replacement

Klaytn currently does not provide a way to replace a transaction using the unit price but may support different methods for the transaction replacement in the future. Note that in Ethereum, a transaction with a given nonce can be replaced by a new one with a higher gas price.

## Klaytn's Gas table

Basically, Klaytn is keeping compatibility with Ethereum. So Klaytn's gas table is pretty similar with that of Ethereum. But because of the existence of unique features of Klaytn, there are several new constants for those features.

### Common Fee <a id="common-fee"></a>

| Item              | 가스    | Description                                                                                        |
|:----------------- |:----- |:-------------------------------------------------------------------------------------------------- |
| G\_zero         | 0     | Nothing paid for operations of the set Wzero                                                       |
| G\_base         | 2     | Amount of gas to pay for operations of the set Wbase                                               |
| G\_verylow      | 3     | Amount of gas to pay for operations of the set Wverylow                                            |
| G\_low          | 5     | Amount of gas to pay for operations of the set Wlow                                                |
| G\_mid          | 8     | Amount of gas to pay for operations of the set Wmid                                                |
| G\_high         | 10    | Amount of gas to pay for operations of the set Whigh                                               |
| G\_blockhash    | 20    | Payment for BLOCKHASH operation                                                                    |
| G\_extcode      | 700   | Amount of gas to pay for operations of the set Wextcode                                            |
| G\_balance      | 400   | Amount of gas to pay for a BALANCE operation                                                       |
| G\_sload        | 200   | Paid for a SLOAD operation                                                                         |
| G\_jumpdest     | 1     | Paid for a JUMPDEST operation                                                                      |
| G\_sset         | 20000 | Paid for an SSTORE operation when the storage value is set to non-zero from zero                   |
| G\_sreset       | 5000  | Paid for an SSTORE operation when the storage value’s zeroness remains unchanged or is set to zero |
| G\_sclear       | 15000 | Refund given \(added into refund counter\) when the storage value is set to zero from non-zero   |
| R\_selfdestruct | 24000 | Refund given \(added into refund counter\) for self-destructing an account                       |
| G\_selfdestruct | 5000  | Amount of gas to pay for a SELFDESTRUCT operation                                                  |
| G\_create       | 32000 | Paid for a CREATE operation                                                                        |
| G\_codedeposit  | 200   | Paid per byte for a CREATE operation to succeed in placing code into state                         |
| G\_call         | 700   | Paid for a CALL operation                                                                          |
| G\_callvalue    | 9000  | Paid for a non-zero value transfer as part of the CALL operation                                   |
| G\_callstipend  | 2300  | A stipend for the called contract subtracted from Gcallvalue for a non-zero value transfer         |
| G\_newaccount   | 25000 | Paid for a CALL or SELFDESTRUCT operation which creates an account                                 |
| G\_exp          | 10    | Partial payment for an EXP operation                                                               |
| G\_expbyte      | 50    | Partial payment when multiplied by dlog256\(exponent\)e for the EXP operation                    |
| G\_memory       | 3     | Paid for every additional word when expanding memory                                               |
| G\_txcreate     | 32000 | Paid by all contract-creating transactions                                                         |
| G\_transaction  | 21000 | Paid for every transaction                                                                         |
| G\_log          | 375   | Partial payment for a LOG operation                                                                |
| G\_logdata      | 8     | Paid for each byte in a LOG operation’s data                                                       |
| G\_logtopic     | 375   | Paid for each topic of a LOG operation                                                             |
| G\_sha3         | 30    | Paid for each SHA3 operation                                                                       |
| G\_sha3word     | 6     | Paid for each word \(rounded up\) for input data to a SHA3 operation                             |
| G\_copy         | 3     | Partial payment for \*COPY operations, multiplied by words copied, rounded up                    |
| G\_blockhash    | 20    | Payment for BLOCKHASH operation                                                                    |
| G\_extcodehash  | 400   | Paid for getting keccak256 hash of a contract's code                                               |
| G\_create2      | 32000 | Paid for opcode CREATE2 which bahaves identically with CREATE but use different arguemnts          |


### Precompiled Contracts <a id="precompiled-contracts"></a>

Precompiled contracts are special kind of contracts which usually perform complex cryptographic computations and are initiated by other contracts.

| Item                    | 가스                 | Description                                               |
|:----------------------- |:------------------ |:--------------------------------------------------------- |
| EcrecoverGas            | 3000               | Perform ECRecover operaton                                |
| Sha256BaseGas           | 60                 | Perform sha256 hash operation                             |
| Sha256PerWordGas        | 12                 | ​                                                         |
| Ripemd160BaseGas        | 600                | Perform Ripemd160 operation                               |
| Ripemd160PerWordGas     | 120                | ​                                                         |
| IdentityBaseGas         | 15                 | ​                                                         |
| IdentityPerWordGas      | 3                  | ​                                                         |
| ModExpQuadCoeffDiv      | 20                 | ​                                                         |
| Bn256AddGas             | 500                | Perform Bn256 elliptic curve operation                    |
| Bn256ScalarMulGas       | 40000              | ​                                                         |
| Bn256PairingBaseGas     | 100000             | ​                                                         |
| Bn256PairingPerPointGas | 80000              | ​                                                         |
| VMLogBaseGas            | 100                | Write logs to node's log file - Klaytn only               |
| VMLogPerByteGas         | 20                 | Klaytn only                                               |
| FeePayerGas             | 300                | Get feePayer's address - Klaytn only                      |
| ValidateSenderGas       | 5000 per signature | Validate the sender's address and signature - Klaytn only |


Total gas of those items which has XXXBaseGas and XXXPerWordGas \(e.g. Sha256BaseGas, Sha256PerWordGas\) are calcluated as

```text
TotalGas = XXXBaseGas + (number of words * XXXPerWordGas)
```

ValidateSenderGas have to be paid per signature basis.

```text
TotalGas = number of signatures * ValidateSenderGas
```

### Account-related Gas Table <a id="account-related-gas-table"></a>

| Item                       | 가스    | Description                                                 |
|:-------------------------- |:----- |:----------------------------------------------------------- |
| TxAccountCreationGasPerKey | 20000 | Gas required for a key-pair creation                        |
| TxValidationGasPerKey      | 15000 | Gas required for a key validation                           |
| TxGasAccountUpdate         | 21000 | Gas required for an account update                          |
| TxGasFeeDelegated          | 10000 | Gas required for a fee delegation                           |
| TxGasFeeDelegatedWithRatio | 15000 | Gas required for a fee delegation with ratio                |
| TxGasCancel                | 21000 | Gas required to cancel a transaction which has a same nonce |
| TxGasValueTransfer         | 21000 | Gas required to transfer KLAY                               |
| TxGasContractExecution     | 21000 | Base gas for contract execution                             |
| TxDataGas                  | 100   | Gas required per transaction's single byte                  |


Gas for payload data is calculated as below

```text
GasPayload = number_of_bytes * TxDataGas
```

### Gas Formula for Transaction Types <a id="gas-formula-for-transaction-types"></a>

| TxType                 | 가스                                                     |
|:---------------------- |:------------------------------------------------------ |
| LegacyTransaction      | TxGas + PayloadGas + KeyValidationGas                  |
| ValueTransfer          | TxGasValueTransfer + KeyValidationGas                  |
| ValueTransferMemo      | TxGasValueTransfer + PayloadGas + KeyValidationGas     |
| AccountUpdate          | TxGasAccountUpdate + KeyCreationGas + KeyValidationGas |
| SmartContractDeploy    | TxGasContractCreation + PayloadGas + KeyValidationGas  |
| SmartContractExecution | TxGasContractExecution + PayloadGas + KeyValidationGas |
| Cancel                 | TxGasCancel + KeyValidationGas                         |


KeyValidationGas is defined as below based on key type,

| Key Type  | 가스                                                |
|:--------- |:------------------------------------------------- |
| Nil       | N/A                                               |
| Legacy    | 0                                                 |
| Fail      | 0                                                 |
| Public    | 0                                                 |
| MultiSig  | \(keys-1\) \* GasValidationPerKey \(15000\) |
| RoleBased | Based on keys in the role used in the validation  |


KeyCreationGas is defined as below based on key type,

| Key Type  | 가스                                                                                                                                                                                                                 |
|:--------- |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Nil       | N/A                                                                                                                                                                                                                |
| Legacy    | 0                                                                                                                                                                                                                  |
| Fail      | 0                                                                                                                                                                                                                  |
| Public    | GasCreationPerKey \(20000\)                                                                                                                                                                                      |
| MultiSig  | \(keys\) \* GasCreationPerKey                                                                                                                                                                                  |
| RoleBased | Gas fee calculated based on keys in each role. e.g., GasRoleTransaction = \(keys\) *GasCreationPerKey* *GasRoleAccountUpdate = \(keys\)* GasCreationPerKey GasRoleFeePayer = \(keys\) \* GasCreationPerKey |