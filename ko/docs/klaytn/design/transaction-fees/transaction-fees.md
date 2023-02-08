# Transaction Fees <a id="transaction-fees"></a>
The transaction fee for the current Klaytn virtual machine \(KLVM\) is calculated as follows:

```text
(Transaction Fee) := (Gas Used) * (Base Fee)
```

* The `Gas Used` is computed by KLVM based on the gas cost of the opcode and the intrinsic gas cost.
* `Base Fee` is the actual gas price used for the transaction. It has the same meaning as the `Effective Gas Price`.

This calculated transaction fee is subtracted from the sender's or fee payer's account balance, depending on the transaction.

## Gas and Base Fee Overview <a id="gas-and-base-fee-overview"></a>
### Gas <a id="gas"></a>
Every action that changes the state of the blockchain requires gas. When a node processes a user's transaction, such as sending KLAY, using KIP-7 tokens, or executing a contract, the user has to pay for the computation and storage usage. The payment amount is decided by the amount of `gas` required.

`Gas` is a measuring unit representing how much calculation is needed to process the user's transaction.

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

### Transaction Replacement <a id="transaction-replacement"></a>

Klaytn currently does not provide a way to replace a transaction using the unit price but may support different methods for the transaction replacement in the future. Note that in Ethereum, a transaction with a given nonce can be replaced by a new one with a higher gas price.

## Klaytn's Gas table  <a id="klaytns-gas-table"></a>

Basically, Klaytn is keeping compatibility with Ethereum. So Klaytn's gas table is pretty similar with that of Ethereum. But there are some features unique to Klaytn that require several new constants.

{% hint style="success" %}
NOTE: The gas table has changed with the `IstanbulEVM` protocol upgrade, or the "hard fork". If you want the previous document, please refer to [previous document](transaction-fees-previous.md).

`IstanbulEVM` protocol upgrade block number is as follows.
* Baobab Testnet: `#75373312`
* Cypress Mainnet: `#86816005`
{% endhint %}

### Common Fee <a id="common-fee"></a>

| Item              | Gas   | Description                                                                                        |
|:----------------- |:----- |:-------------------------------------------------------------------------------------------------- |
| G\_zero         | 0     | Nothing paid for operations of the set Wzero                                                       |
| G\_base         | 2     | Amount of gas to pay for operations of the set Wbase                                               |
| G\_verylow      | 3     | Amount of gas to pay for operations of the set Wverylow                                            |
| G\_low          | 5     | Amount of gas to pay for operations of the set Wlow                                                |
| G\_mid          | 8     | Amount of gas to pay for operations of the set Wmid                                                |
| G\_high         | 10    | Amount of gas to pay for operations of the set Whigh                                               |
| G\_blockhash    | 20    | Payment for BLOCKHASH operation                                                                    |
| G\_extcode      | 700   | Amount of gas to pay for operations of the set Wextcode                                            |
| G\_balance      | 700   | Amount of gas to pay for a BALANCE operation                                                       |
| G\_sload        | 800   | Paid for a SLOAD operation                                                                         |
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
| G\_extcodehash  | 700   | Paid for getting keccak256 hash of a contract's code                                               |
| G\_create2      | 32000 | Paid for opcode CREATE2 which bahaves identically with CREATE but use different arguments          |

### Precompiled Contracts <a id="precompiled-contracts"></a>

Precompiled contracts are special kind of contracts which usually perform complex cryptographic computations and are initiated by other contracts.

| Item                    | Gas                | Description                                               |
|:----------------------- |:------------------ |:--------------------------------------------------------- |
| EcrecoverGas            | 3000               | Perform ECRecover operation                               |
| Sha256BaseGas           | 60                 | Perform sha256 hash operation                             |
| Sha256PerWordGas        | 12                 | ​                                                         |
| Ripemd160BaseGas        | 600                | Perform Ripemd160 operation                               |
| Ripemd160PerWordGas     | 120                | ​                                                         |
| IdentityBaseGas         | 15                 | ​                                                         |
| IdentityPerWordGas      | 3                  | ​                                                         |
| ModExpQuadCoeffDiv      | 20                 | ​                                                         |
| Bn256AddGas             | 150                | Perform Bn256 elliptic curve operation                    |
| Bn256ScalarMulGas       | 6000               | ​                                                         |
| Bn256PairingBaseGas     | 45000              | ​                                                         |
| Bn256PairingPerPointGas | 34000              | ​                                                         |
| VMLogBaseGas            | 100                | Write logs to node's log file - Klaytn only               |
| VMLogPerByteGas         | 20                 | Klaytn only                                               |
| FeePayerGas             | 300                | Get feePayer's address - Klaytn only                      |
| ValidateSenderGas       | 5000 per signature | Validate the sender's address and signature - Klaytn only |

Total gas of those items which has XXXBaseGas and XXXPerWordGas \(e.g. Sha256BaseGas, Sha256PerWordGas\) are calculated as

```text
TotalGas = XXXBaseGas + (number of words * XXXPerWordGas)
```

ValidateSenderGas have to be paid per signature basis.

```text
TotalGas = number of signatures * ValidateSenderGas
```

Blake2f gas cost is calculated based on the below formula. `input` is the input of the blake2f call.
```text
Gas = uint64(binary.BigEndian.Uint32(input[0:4]))
```

### Account-related Gas Table <a id="account-related-gas-table"></a>

| Item                       | Gas   | Description                                                 |
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

| TxType                 | Gas                                                    |
|:---------------------- |:------------------------------------------------------ |
| LegacyTransaction      | TxGas + PayloadGas + KeyValidationGas                  |
| ValueTransfer          | TxGasValueTransfer + KeyValidationGas                  |
| ValueTransferMemo      | TxGasValueTransfer + PayloadGas + KeyValidationGas     |
| AccountUpdate          | TxGasAccountUpdate + KeyCreationGas + KeyValidationGas |
| SmartContractDeploy    | TxGasContractCreation + PayloadGas + KeyValidationGas  |
| SmartContractExecution | TxGasContractExecution + PayloadGas + KeyValidationGas |
| Cancel                 | TxGasCancel + KeyValidationGas                         |

KeyValidationGas is defined as below based on the key type,

| Key Type  | Gas                                                                 |
|:--------- |:------------------------------------------------------------------- |
| Nil       | N/A                                                                 |
| Legacy    | 0                                                                   |
| Fail      | 0                                                                   |
| Public    | 0                                                                   |
| MultiSig  | \(number of signatures - 1\) \* GasValidationPerKey \(15000\) |
| RoleBased | Based on keys in the role used in the validation                    |

KeyCreationGas is defined as below based on the key type,

| Key Type  | Gas                                                                                                                                                                                                                |
|:--------- |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Nil       | N/A                                                                                                                                                                                                                |
| Legacy    | 0                                                                                                                                                                                                                  |
| Fail      | 0                                                                                                                                                                                                                  |
| Public    | GasCreationPerKey \(20000\)                                                                                                                                                                                      |
| MultiSig  | \(keys\) \* GasCreationPerKey                                                                                                                                                                                  |
| RoleBased | Gas fee calculated based on keys in each role. e.g., GasRoleTransaction = \(keys\) _GasCreationPerKey_ _GasRoleAccountUpdate = \(keys\)_ GasCreationPerKey GasRoleFeePayer = \(keys\) \* GasCreationPerKey |

