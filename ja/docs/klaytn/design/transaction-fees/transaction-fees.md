# Transaction Fees <a id="transaction-fees"></a>
現在のKlaytn仮想マシン\(KLVM\)のトランザクション手数料は以下のように計算されます。

```text
(トランザクション手数料) := (ガス使用料) * (ベース手数料)
```

* `Gas Used` は、KLVMによってオペコードのガスコストと本質的なガスコストに基づいて計算される。
* `基本手数料` は、取引に使用される実際のガス価格です。 これは、 `実効ガス価格` と同じ意味を持っています。

この計算された取引手数料は、取引に応じて送信者または手数料支払者の口座残高から差し引かれます。

## ガスとベース料金の概要 <a id="gas-and-base-fee-overview"></a>
### Gas <a id="gas"></a>
Every action that changes the state of the blockchain requires gas. ノードが KIP-7 トークンを使用して、KLAY送信などのユーザのトランザクションを処理する場合。 またはコントラクトを実行するには、ユーザーが計算とストレージの使用料を支払わなければなりません。 支払金額は必要な `ガス` の金額で決まります。

`Gas` is a measuring unit representing how much calculation is needed to process the user's transaction.

### 動的ガス料金メカニズム <a id="dynamic-gas-fee-mechanism"></a>
Klaytn v1.9.0ハードフォーク以来、動的ガス料金メカニズムは既存の固定料金ポリシーを置き換えました。 動的ガス料金ポリシーは、ネットワークの乱用とストレージの過剰使用を防止することにより、ユーザーに安定したサービスを提供します。 ネットワーク状況によりガス料金は変化します。 7つのパラメータが `基本料金(ガス料金)` に影響を与えます :

1. PREVIOUS_BASE_FEE: 前のブロックの基本手数料
2. GAS_USED_FOR_THE_PREVIOUS_BLOCK: 前のブロックのすべてのトランザクション処理に使用されたガス
3. GAS_TARGET:基本料金の増減を決定するガス量 (現時点で3,000万)
4. MAX_BLOCK_GAS_USED_FOR_BASE_FEE: 暗黙のブロックガス制限で最大基準変更レートを適用します (現時点では6000万)
5. BASE_FEE_DELTA_REDUCING_DENOMINATOR: 基本料金の最大値をブロックごとに5%に変更する(現時点で20個をガバナンスにより後から変更することができる)。
6. UPPER_BOUND_BASE_FEE: 基本手数料の最大値(現時点では 750 ston、ガバナンスによって後から変更できます)
7. LOWER_BOUND_BASE_FEE: 基本手数料の最小値(現時点では25st、ガバナンスによって後から変更できます)

### 基本手数料 <a id="base-fee"></a>
このアルゴリズムの基本的な考え方は、使用されるガスがベースガスを超えた場合、 `ベース手数料` が上昇することです。 これは、ネットワーク内の取引数とプロセスで使用されるガスと密接に関連しています。 `基本手数料` には、手数料が無期限に増加または減少するのを防ぐための上限と下限があります。 また、 `基準手数料`の急激な変化を防ぐため、ガスのキャップと変動の調整値もあります。 値はガバナンスによって変更できます。

```text
(BASE_FEE_CHANGE_RATE) = (GAS_USED_FOR_THE_PREVIOUS_BLOCK - GAS_TARGET)
(ADJUSTED_BASE_FEE_CHANGE_RATE) = (BASE_FEE_CHANGE_RATE) / (GAS_TARGET) / (BASE_FEE_DELTA_REDUCING_DENOMINATOR)
(BASE_FEE_CHANGE_RANGE) = (PREVIOUS_BASE_FEE) * (ADJUSTED_BASE_FEE_CHANGE_RATE)
(BASE_FEE) = (PREVIOUS_BASE_FEE) + (BASE_FEE_CHANGE_RANGE) 
```

`基本手数料` は、ブロックごとに計算されます。毎秒変更される可能性があります。 単一のブロックからのトランザクションは、トランザクション手数料を計算するのに同じ `基本手数料` を使用します。 ブロック `基本手数料` より高いガス価格の取引のみがブロックに含めることができます。 各ブロックのトランザクション手数料の半分が書き込まれます(BURN_RATIO = 0.5はガバナンスによって変更できません)。

> 注:KlaytnをEthereumのEIP-1559から離す重要な機能は、それがヒントを持っていないことです。 Klaytn は First Come, First Served(FCFS)のトランザクションの原則に従います。

### Transaction Replacement <a id="transaction-replacement"></a>

Klaytn currently does not provide a way to replace a transaction using the unit price but may support different methods for the transaction replacement in the future. Note that in Ethereum, a transaction with a given nonce can be replaced by a new one with a higher gas price.

## Klaytn's Gas table  <a id="klaytns-gas-table"></a>

Basically, Klaytn is keeping compatibility with Ethereum. So Klaytn's gas table is pretty similar with that of Ethereum. しかし、いくつかの新しい定数を必要とする Klaytn 固有の機能があります。

{% hint style="success" %}
注: ガステーブルは `イスタンブールEVM` プロトコルのアップグレード、または「ハードフォーク」で変更されました。 前のドキュメントをご希望の場合は、 [前のドキュメント](transaction-fees-previous.md) をご参照ください。

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

Blake2fガスコストは以下の式に基づいて計算されます。 `input` は、blake2f呼び出しの入力である。
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

KeyValidationGas は、キーの型に基づいて以下のように定義されます。

| Key Type  | Gas                                                                 |
|:--------- |:------------------------------------------------------------------- |
| Nil       | N/A                                                                 |
| Legacy    | 0                                                                   |
| Fail      | 0                                                                   |
| Public    | 0                                                                   |
| MultiSig  | \(number of signatures - 1\) \* GasValidationPerKey \(15000\) |
| RoleBased | Based on keys in the role used in the validation                    |

KeyCreationGas は、キーの型に基づいて以下のように定義されます。

| Key Type  | Gas                                                                                                                                                                                                                |
|:--------- |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Nil       | N/A                                                                                                                                                                                                                |
| Legacy    | 0                                                                                                                                                                                                                  |
| Fail      | 0                                                                                                                                                                                                                  |
| Public    | GasCreationPerKey \(20000\)                                                                                                                                                                                      |
| MultiSig  | \(keys\) \* GasCreationPerKey                                                                                                                                                                                  |
| RoleBased | Gas fee calculated based on keys in each role. e.g., GasRoleTransaction = \(keys\) _GasCreationPerKey_ _GasRoleAccountUpdate = \(keys\)_ GasCreationPerKey GasRoleFeePayer = \(keys\) \* GasCreationPerKey |

