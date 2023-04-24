# Transaction Fees <a id="transaction-fees"></a>
{% hint style="success" %}
NOTE: The transaction fee has changed with the `Kore` hardfork. If you want the previous document, please refer to [previous document](transaction-fees-previous.md).

`Kore` hardfork block numbers are as follows.
* Baobab Testnet: `#111736800`
* Cypress Mainnet: `#119750400`
{% endhint %}

The transaction fee of one transaction is calculated as follows:
```text
Transaction fee := (Gas used) x (GasPrice)
```
As an easy-to-understand analogy in this regard, suppose you're filling up gas at a gas station. The gas price is determined by the refinery every day, and today's price is $2. If you fill 15L up, then you would pay $30 = 15L x $2/1L for it, and the $30 will be paid out of your bank account. Also, the transaction will be recorded in the account book.

Transaction fee works just like this too. The network determines the gas price for every block. Suppose the gas price for the current block is 30 ston. If a transaction submitted by `from` account was charged 21000 gas, then 630000 ston = (21000 gas * 30 ston/1 gas) would be paid out of the `from` account. Also, the transaction will be recorded in the block, and it will be applied in the state of all blockchain nodes.

Summing it up again, this calculated transaction fee is subtracted from the sender's or fee payer's account. However, the fee can be deducted from the balance only if the transaction is created by klay_sendTransaction/eth_sendTransaction. Because the other transactions cannot change the state since they cannot be included in the block. They are just a simulation in some way.

Unlike the ethereum, Klaytn used the fixed gas price, called `unitPrice` at first. However, since magma hardfork, klaytn has borrowed basefee concept from the ethereum and has started to use the dynamic gas price, basefee. By the way, the basefee has the same meaning as the `Effective Gas Price`. Since this concepts can be very confusing, those concepts including the transaction gasPrice parameter are briefly explained below.

| Network | Before BaseFee | After BaseFee |
| :--- | :--- | :--- |
| klaytn | tx parameter gasPrice: network-defined. must be set as the `unitPrice` </br> gasPrice: use the tx parameter gasPrice | tx parameter gasPrice: user-defined. It means the price the most you can pay </br> (e.g. suggestGasPrice = 2*latestBlock.baseFee ) </br> gasPrice: dynamic gasPrice, `baseFee`, which is defined by network. |
| Ethereum | tx parameter gasPrice: user-defined. it means the price the most you can pay. </br> gasPrice: use the tx parameter gasPrice | tx parameter gasPrice: user-defined. It means the price the most you can pay. </br> gasPrice: dynamic gasPrice, `baseFee+tip`, which is defined by network. |

This has been an overall explanation of the transaction fee, and from this point, I will give a general explanation of the basefee and the gas.

## Base Fee Overview <a id="base-fee-overview"></a>
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

## Gas Overview <a id="gas-overview"></a>
Every action that changes the state of the blockchain requires gas. When a node processes a user's transaction, such as sending KLAY, using KIP-7 tokens, or executing a contract, the user has to pay for the computation and storage usage. The payment amount is decided by the amount of `gas` required.

`Gas` is a measuring unit representing how much calculation is needed to process the user's transaction.

`Gas used` is computed by adding up the next three gas costs;
* `IntrinsicGasCost` is calculated based on the transaction type. I will explain it here.
* `KeyValidationGasCost` is calculated based on the account type. I will explain it here.
* `ContractExecutionGasCost` is calculated during the contract execution based on KLVM. For more information, please refer [klvm docs](../computation/klaytn-virtual-machine/klaytn-virtual-machine.md).

### Intrinsic Gas Cost <a id="intrinsic-gas-cost"></a>

Basically, Klaytn is keeping compatibility with Ethereum. So Klaytn's gas cost calcuation is pretty similar with that of Ethereum. However, due to the unique features, there are several new gas costs for those features.

A transaction's intrinsic gas can be calculated like below.
```
IntrinsicGasCost = TxTypedGas + KeyCreationGas + PayloadGas
```
* `TxTypedGas` is defined based on the transaction type.
* `PayloadGas` is calculated as `number_of_bytes_of_tx_input x TxDataGas (100)`
* `KeyCreationGas` is defined based on the key type.

| Key Type | KeyCreationGas |
| :--- | :--- |
| Nil | N/A |
| Legacy | 0 |
| Fail | 0 |
| Public | GasCreationPerKey (20000) |
| MultiSig | (number of keys) x GasCreationPerKey |
| RoleBased | Gas fee calculated based on keys in each role. </br> For example, </br> * GasRoleTransaction = \(number of this role keys\) * GasCreationPerKey </br> * GasRoleAccountUpdate = \(number of this role keys\) * GasCreationPerKey </br> * GasRoleFeePayer = \(number of this role keys\) \* GasCreationPerKey|

There are three kinds of the klaytn's transaction type; `base type`, `fee-delegated type`, and `fee-delegatedWithFeeRatio type`.
For example, the kind of the `valueTransfer` txType is a `base type`. Then, the kind of the `valueTransferFeeDelegated` txType is `fee-delegated type` and the kind of the `valueTransferFeeDelegatedWithRatio` is `fee-delegatedDelegatedWithRatio`.

This is important when calculating intrinsic gas cost:
* Intrinsic gas cost of the base type is calculated through the IntrinsicGas function defined per transaction type,
* Intrinsic gas cost of the feeDelegated type is derived by adding `IntrinsicGasCost of base type` and `TxGasFeeDelegated (10000)`
* Intrinsic gas cost of the feeDelegatedWithFeeRatio type is derived by adding `IntrinsicGasCost of base type` and `TxGasFeeDelegatedWithRatio (15000)`

The intrinsic gas cost of the base type is calculated based on the following table.

| TxType(only base type) | Value of `TxTypedGas` | Existence of </br> `KeyCreationGas` | Existence of </br> `PayloadGas` |
| :--- | :--- | :--- | :--- |
| LegacyTransaction, </br> EthereumAccessList, </br> EthereumDynamicFee | if it creates contract: </br>-> TxGas (21000) </br> if it does not create contract: </br> -> TxGasContractCreation (53000) | X | O |
| ValueTransfer | TxGas | X | X |
| ValueTransferMemo | TxGas | X | O |
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
| MultiSig | \(number of signatures - 1\) x GasValidationPerKey \(15000\) |
| RoleBased | Based on keys in the role used in the validation |
