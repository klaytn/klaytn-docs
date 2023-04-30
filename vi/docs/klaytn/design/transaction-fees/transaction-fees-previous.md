# Transaction Fees <a id="transaction-fees"></a>

The transaction fee for the current Klaytn virtual machine \(KLVM\) is computed as follows:

```text
Transaction fee := (total gas used) x (unit price)
```

* The `total gas used` is computed by KLVM based on the gas cost of the opcode and the intrinsic gas cost.
* `unit price` is the price of gas defined in Klaytn.

This calculated transaction fee is subtracted from the sender's or enterprise account's balance, depending on the transaction.

## Gas and Unit Price Overview <a id="gas-and-unit-price-overview"></a>

### Gas <a id="gas"></a>

Every action that changes the state of the blockchain requires gas. When a node processes user's transaction such as sending KLAY, using ERC-20 tokens, or executing a contract, the user has to pay for the computation and storage usage. The amount of payment is decided by the amount of `gas` required.

`Gas` is a measuring unit representing how much calculation is needed to process the user's transaction.

### Unit Price <a id="unit-price"></a>

`Unit price` is the price for a single gas. The unit price \(also called `gas price`\) is set in the system by the governance. It is currently set to 250 ston \(_i.e._, 250 x 10^9 peb\) per gas and cannot be changed by user. The current value of the unit price can be obtained by calling the `klay.gasPrice` API.

In Ethereum, users set the gas price for each transaction, and miners choose which transactions to be included in their block to maximize their reward. Việc này cũng giống như mang các nguồn lực hạn chế ra để đấu giá. Hướng tiếp cận này đã có hiệu quả vì nó dựa trên thị trường. Tuy nhiên, chi phí giao dịch có thể biến động và thường sẽ trở nên quá cao để đảm bảo cho việc thực thi.

Để giải quyết vấn đề này, Klaytn sử dụng đơn giá cố định và giá có thể được điều chỉnh bởi hội đồng quản trị. Chính sách này đảm bảo rằng mọi giao dịch đều sẽ được xử lý công bằng và chắc chắn sẽ được thực thi. Vì thế, người dùng không cần phải vất vả xác định đơn giá phù hợp.

#### Xác thực giao dịch so với Đơn giá <a id="transaction-validation-against-unit-price"></a>

Klaytn chỉ chấp nhận các giao dịch bằng giá gas, giá này có thể do người dùng đặt, ở mức bằng với đơn giá của Klaytn; Klaytn từ chối các giao dịch với giá gas khác với đơn giá của Klaytn.

#### Lỗi đơn giá <a id="unit-price-error"></a>

Thông báo lỗi `invalid unit price` được trả về khi giá gas của một giao dịch không bằng với đơn giá của Klaytn.

### Thay thế giao dịch <a id="transaction-replacement"></a>

Klaytn hiện không cung cấp phương pháp để thay thế giao dịch bằng đơn giá, nhưng có thể hỗ trợ các phương pháp khác để thay thế giao dịch trong tương lai. Hãy lưu ý rằng trong Ethereum, một giao dịch với một số dùng một lần nhất định có thể được thay thế bằng một giao dịch mới với giá gas cao hơn.

## Bảng giá ga của Klaytn  <a id="klaytns-gas-table"></a>

Về cơ bản, Klaytn luôn duy trì tương thích với Ethereum. Vì thế, bảng giá gas của Klaytn cũng khá tương đồng với bảng của Ethereum. Tuy nhiên, do sự tồn tại của những tính năng độc đáo của Klaytn, có một số hằng số mới cho những tính năng đó.

{% hint style="success" %}
LƯU Ý: Tài liệu này chứa bảng giá gas được sử dụng trước khi kích hoạt nâng cấp giao thức. Nếu bạn muốn nhận tài liệu mới nhất, vui lòng tham khảo [tài liệu mới nhất](transaction-fees.md).
{% endhint %}

### Phí phổ biến <a id="common-fee"></a>

| Mục               | Gas   | Mô tả                                                                                              |
|:----------------- |:----- |:-------------------------------------------------------------------------------------------------- |
| G\_zero         | 0     | Các hoạt động của bộ Wzero                                                                         |
| G\_base         | 2     | Lượng gas phải trả cho các hoạt động của bộ Wbase                                                  |
| G\_verylow      | 3     | Lượng gas phải trả cho các hoạt động của bộ Wverylow                                               |
| G\_low          | 5     | Lượng gas phải trả cho các hoạt động của bộ Wlow                                                   |
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
| Bn256AddGas             | 500                | Perform Bn256 elliptic curve operation                    |
| Bn256ScalarMulGas       | 40000              | ​                                                         |
| Bn256PairingBaseGas     | 100000             | ​                                                         |
| Bn256PairingPerPointGas | 80000              | ​                                                         |
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

KeyValidationGas is defined as below based on key type,

| Key Type  | Gas                                               |
|:--------- |:------------------------------------------------- |
| Nil       | N/A                                               |
| Legacy    | 0                                                 |
| Fail      | 0                                                 |
| Public    | 0                                                 |
| MultiSig  | \(keys-1\) \* GasValidationPerKey \(15000\) |
| RoleBased | Based on keys in the role used in the validation  |

KeyCreationGas is defined as below based on key type,

| Key Type  | Gas                                                                                                                                                                                                                |
|:--------- |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Nil       | N/A                                                                                                                                                                                                                |
| Legacy    | 0                                                                                                                                                                                                                  |
| Fail      | 0                                                                                                                                                                                                                  |
| Public    | GasCreationPerKey \(20000\)                                                                                                                                                                                      |
| MultiSig  | \(keys\) \* GasCreationPerKey                                                                                                                                                                                  |
| RoleBased | Gas fee calculated based on keys in each role. e.g., GasRoleTransaction = \(keys\) _GasCreationPerKey_ _GasRoleAccountUpdate = \(keys\)_ GasCreationPerKey GasRoleFeePayer = \(keys\) \* GasCreationPerKey |
