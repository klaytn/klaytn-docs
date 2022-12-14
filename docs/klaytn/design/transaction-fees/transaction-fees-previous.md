# Transaction Fees <a id="transaction-fees"></a>

{% hint style="success" %}
NOTE: This document contains the transaction fee used before the activation of the protocol upgrade.
If you want the latest document, please refer to [latest document](transaction-fees.md).
{% endhint %}

The transaction fee of one transaction is calculated as follows:
```text
Transaction fee := (Gas used) x (GasPrice)
```
As an easy-to-understand analogy in this regard, suppose you're filling up gas at a gas station. The gas price is determined by the refinery every day, and today's price is $2. If you fill 15L up, then you would pay $30 = 15L x $2/1L for it, and the $30 will be paid out of your bank account. Also, the transaction will be recorded in the account book.

Transaction fee works just like this too. The network determines the gas price for every block. Suppose the gas price for the current block is 30 ston. If a transaction submitted by `from` account was charged 21000 gas, then 630000 ston = (21000 gas * 30 ston/1 gas) would be paid out of the `from` account. Also, the transaction will be recorded in the block, and it will be applied in the state of all blockchain nodes.

Summing it up again, this calculated transaction fee is subtracted from the sender's or fee payer's account. However, the fee can be deducted from the balance only if the transaction is created by klay_sendTransaction/eth_sendTransaction. Because the other transactions cannot change the state since they cannot be included in the block. They are just a simulation in some way.

This has been an overall explanation of the transaction fee, and from this point, I will give a general explanation of the unitPrice and the gas.

## Unit Price Overview <a id="unit-price-overview"></a>

`Unit price` is the price for a single gas. The unit price \(also called `gas price`\) is set in the system by the governance. It cannot be changed by user. The current value of the unit price can be obtained by calling the `klay.gasPrice` API.

In Ethereum, users set the gas price for each transaction, and miners choose which transactions to be included in their block to maximize their reward. It is something like bidding for limited resources. This approach has been working because it is market-based. However, the transaction cost fluctuates and often becomes too high to guarantee the execution.

To solve the problem, Klaytn is using a fixed unit price and the price can be adjusted by the governance council. This policy ensures that every transaction will be handled equally and be guaranteed to be executed. Therefore, users do not need to struggle to determine the right unit price.

### Transaction Validation against Unit Price <a id="transaction-validation-against-unit-price"></a>

Klaytn only accepts transactions with gas prices, which can be set by the user, that are equal to the unit price of Klaytn; it rejects transactions with gas prices that are different from the unit price in Klaytn.

### Unit Price Error <a id="unit-price-error"></a>

The error message `invalid unit price` is returned when the gas price of a transaction is not equal to the unit price of Klaytn.

### Transaction Replacement <a id="transaction-replacement"></a>

Klaytn currently does not provide a way to replace a transaction using the unit price but may support different methods for the transaction replacement in the future. Note that in Ethereum, a transaction with a given nonce can be replaced by a new one with a higher gas price.

## Gas <a id="gas"></a>
Every action that changes the state of the blockchain requires gas. When a node processes a user's transaction, such as sending KLAY, using KIP-7 tokens, or executing a contract, the user has to pay for the computation and storage usage. The payment amount is decided by the amount of `gas` required.

`Gas` is a measuring unit representing how much calculation is needed to process the user's transaction.

`Gas used` is computed by adding up the next three gas costs;
* `IntrinsicGasCost` is calculated based on the transaction type. I will explain it here.
* `KeyValidationGasCost` is calculated based on the account type. I will explain it here.
* `ContractExecutionGasCost` is calculated during the contract execution based on KLVM. For more information, please refer [klvm docs](../computation/klaytn-virtual-machine/klaytn-virtual-machine-previous.md).

### Intrinsic Gas Cost <a id="intrinsic-gas-cost"></a>

Basically, Klaytn is keeping compatibility with Ethereum. So Klaytn's gas cost calcuation is pretty similar with that of Ethereum. However, due to the unique features, there are several new gas costs for those features.

A transaction's intrinsic gas can be calculated like below.
```
IntrinsicGasCost = TxTypedGas + KeyCreationGas + PayloadGas
```

`PayloadGas` is calculated as below.

```
# legacy-typed transaction
PayloadGas = number_of_zero_bytes x TxDataZeroGas (4) + number_of_nonzero_bytes x TxDataNonZeroGas (68)`

# non legacy-typed transaction
PayloadGas = number_of_bytes * TxDataGas (100)
```

`KeyCreationGas` is defined based on the key type.

| Key Type | Gas |
| :--- | :--- |
| Nil | N/A |
| Legacy | 0 |
| Fail | 0 |
| Public | GasCreationPerKey (20000) |
| MultiSig | (number of keys) x GasCreationPerKey |
| RoleBased | Gas fee calculated based on keys in each role. |

There are three kinds of the klaytn's transaction type; `base type`, `fee-delegated type`, and `fee-delegatedWithFeeRatio type`.
For example, the kind of the `valueTransfer` txType is a `base type`. Then, the kind of the `valueTransferFeeDelegated` txType is `fee-delegated type` and the kind of the `valueTransferFeeDelegatedWithRatio` is `fee-delegatedDelegatedWithRatio`.

This is important when calculating intrinsic gas cost:
* Intrinsic gas cost of the base type is calculated through the IntrinsicGas function defined per transaction type,
* Intrinsic gas cost of the feeDelegated type is derived by adding `IntrinsicGasCost of base type` and `TxGasFeeDelegated (10000)`
* Intrinsic gas cost of the feeDelegatedWithFeeRatio type is derived by adding `IntrinsicGasCost of base type` and `TxGasFeeDelegatedWithRatio (15000)`

The intrinsic gas cost of the base type is calculated based on the following table.

| TxType(only base type) | Value of `TxTypedGas` | Existence of </br> `KeyCreationGas` | Existence of </br> `PayloadGas` |
| :--- | :--- | :--- | :--- |
| LegacyTransaction | if it creates contract: </br>-> TxGas (21000) </br> if it does not create contract: </br> -> TxGasContractCreation (53000) | X | O |
| ValueTransfer | TxGas | X | X |
| ValueTransferMemo | TxGas | X | O |
| AccountCreation | TxGas | O | X |
| AccountUpdate | TxGas | O | X |
| SmartContractDeploy | TxGasContractCreation | X | O |
| SmartContractExecution | TxGas | X | O |
| ChainDataAnchoring | TxGas | X | O |
| Cancel | TxGas | X | X |

### Key validation Gas Cost <a id="key-validation-gas-cost"></a>
A Klaytn transaction can also have a feePayer, so the `keyValidationGas` is like this.
```
keyValidationGas =  (validationGas for a sender) + (validationGas for a feePayer)
```
The validationGas for a sender and a feePayer is same, and it is defined as below based on the key type.

| Key Type | Gas |
| :--- | :--- |
| Nil | N/A |
| Legacy | 0 |
| Fail | 0 |
| Public | 0 |
| MultiSig | \(keys-1\) \* GasValidationPerKey \(15000\) |
| RoleBased | Based on keys in the role used in the validation |
