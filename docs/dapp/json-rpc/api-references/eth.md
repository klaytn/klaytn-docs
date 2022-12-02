---
description: eth namespace APIs.
---

# eth

The namespace `eth` provides functions related to accounts, blocks, transactions, configurations of networks or nodes, filters, and so on.

Klaytn now supports the namespace `eth` of [Ethereum's JSON-RPC API](https://eth.wiki/json-rpc/API). Please note that some return values have been adjusted to match the Ethereum's API response body.

And due to the fundamental design differences between Klaytn and Ethereum, Klaytn's data structure (Transaction, Block, and TransactionReceipt) cannot be fully supported via `eth` namespace APIs.

Please check the [Differences Overview from Ethereum](eth.md#differences\_overview\_from\_ethereum) in this document.

**NOTE**: `eth` namespace APIs are supported from Klaytn v1.8.0.

The list below enumerates the API functions. All `eth` namespace APIs are supported on Klaytn.

### [Account](eth/account.md) <a href="#account" id="account"></a>

* [eth\_accounts](eth/account.md#eth\_accounts)
* [eth\_getBalance](eth/account.md#eth\_getbalance)
* [eth\_getCode](eth/account.md#eth\_getcode)
* [eth\_getTransactionCount](eth/account.md#eth\_gettransactioncount)
* [eth\_sign](eth/account.md#eth\_sign)

### [Block](eth/block.md) <a href="#block" id="block"></a>

* [eth\_blockNumber](eth/block.md#eth\_blocknumber)
* [eth\_getHeaderByNumber](eth/block.md#eth\_getheaderbynumber)
* [eth\_getHeaderByHash](eth/block.md#eth\_getheaderbyhash)
* [eth\_getBlockByNumber](eth/block.md#eth\_getblockbynumber)
* [eth\_getBlockByHash](eth/block.md#eth\_getblockbyhash)
* [eth\_getUncleByBlockHashAndIndex](eth/block.md#eth\_getunclebyblockhashandindex)
* [eth\_getUncleByBlockNumberAndIndex](eth/block.md#eth\_getunclebyblocknumberandindex)
* [eth\_getBlockTransactionCountByNumber](eth/block.md#eth\_getblocktransactioncountbynumber)
* [eth\_getBlockTransactionCountByHash](eth/block.md#eth\_getblocktransactioncountbyhash)
* [eth\_getUncleCountByBlockNumber](eth/block.md#eth\_getunclecountbyblocknumber)
* [eth\_getUncleCountByBlockHash](eth/block.md#eth\_getunclecountbyblockhash)
* [eth\_getStorageAt](eth/block.md#eth\_getstorageat)
* [eth\_mining](eth/block.md#eth\_mining)
* [eth\_syncing](eth/block.md#eth\_syncing)

### [Transaction](eth/transaction.md) <a href="#transaction" id="transaction"></a>

* [eth\_call](eth/transaction.md#eth\_call)
* [eth\_estimateGas](eth/transaction.md#eth\_estimategas)
* [eth\_getTransactionByBlockHashAndIndex](eth/transaction.md#eth\_gettransactionbyblockhashandindex)
* [eth\_getTransactionByBlockNumberAndIndex](eth/transaction.md#eth\_gettransactionbyblocknumberandindex)
* [eth\_getTransactionByHash](eth/transaction.md#eth\_gettransactionbyhash)
* [eth\_getTransactionReceipt](eth/transaction.md#eth\_gettransactionreceipt)
* [eth\_sendRawTransaction](eth/transaction.md#eth\_sendrawtransaction)
* [eth\_sendTransaction](eth/transaction.md#eth\_sendtransaction)
* [eth\_signTransaction](eth/transaction.md#eth\_signtransaction)
* [eth\_fillTransaction](eth/transaction.md#eth\_filltransaction)
* [eth\_pendingTransactions](eth/transaction.md#eth\_pendingtransactions)

### [Configuration](eth/config.md) <a href="#configuration" id="configuration"></a>

* [eth\_coinbase](eth/config.md#eth\_coinbase)
* [eth\_etherbase](eth/config.md#eth\_etherbase)
* [eth\_chainId](eth/config.md#eth\_chainid)
* [eth\_gasPrice](eth/config.md#eth\_gasprice)

### [Filter](eth/filter.md) <a href="#filter" id="filter"></a>

* [eth\_getFilterChanges](eth/filter.md#eth\_getfilterchanges)
* [eth\_getFilterLogs](eth/filter.md#eth\_getfilterlogs)
* [eth\_getLogs](eth/filter.md#eth\_getlogs)
* [eth\_newBlockFilter](eth/filter.md#eth\_newblockfilter)
* [eth\_newFilter](eth/filter.md#eth\_newfilter)
* [eth\_newPendingTransactionFilter](eth/filter.md#eth\_newpendingtransactionfilter)
* [eth\_subscribe](eth/filter.md#eth\_subscribe)
* [eth\_uninstallFilter](eth/filter.md#eth\_uninstallfilter)
* [eth\_unsubscribe](eth/filter.md#eth\_unsubscribe)

### [Gas](eth/gas.md) <a href="#gas" id="gas"></a>

* [eth\_feeHistory](eth/gas.md#eth\_feehistory)
* [eth\_maxPriorityFeePerGas](eth/gas.md#eth\_maxpriorityfeepergas)

### [Miscellaneous](eth/misc.md) <a href="#miscellaneous" id="miscellaneous"></a>

* [eth\_hashrate](eth/misc.md#eth\_hashrate)
* [eth\_getWork](eth/misc.md#eth\_getwork)
* [eth\_submitWork](eth/misc.md#eth\_submitwork)
* [eth\_submitHashrate](eth/misc.md#eth\_submithashrate)

## Differences Overview from Ethereum <a href="#differences_overview_from_ethereum" id="differences_overview_from_ethereum"></a>

> Please check the [Caution](eth/caution.md) section which describes the differences between Klaytn and Ethereum when serving eth namespace APIs in more detail.

### Block <a href="#block" id="block"></a>

Related APIs: [eth\_getHeaderByNumber](eth/block/#eth\_getHeaderByNumber), [eth\_getHeaderByHash](eth/block/#eth\_getHeaderByHash), [eth\_getBlockByHash](eth/block/#eth\_getBlockByHash), [eth\_getBlockByNumber](eth/block/#eth\_getBlockByNumber), [eth\_getUncleByBlockHashAndIndex](eth/block/#eth\_getUncleByBlockHashAndIndex), [eth\_getUncleByBlockNumberAndIndex](eth/block/#eth\_getUncleByBlockNumberAndIndex).

| Field           | Description                                                                                                                                                                                                                                                                                                                                                                                                               |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| baseFeePerGas   | This field always has the value `0x0` because Klaytn does not have a baseFeePerGas scheme.                                                                                                                                                                                                                                                                                                                                |
| difficulty      | This field corresponds to `blockScore` in the Klaytn header, which is fixed to `0x1`. This is because Klaytn's consensus mechanism is not based on PoW, indicating the technical concept of block difficulty is not applicable to Klaytn core.                                                                                                                                                                            |
| extraData       | This field always has the value `0x` indicating the empty value. Owing to the fact that Klaytn's `extraData` contains consensus data such as validators addresses, validators signatures, and proposer signature, it is not applicable to `eth` namespace API.                                                                                                                                                            |
| gasLimit        | This field always has the value `0xe8d4a50fff`(=`999999999999` in decimal), which is an arbitrary figure since Klaytn has no GasLimit. At the time of writing, this figure is 30 times higher than the [block gas limit of Ethereum](https://ethereum.org/en/developers/docs/gas/#block-size). Please refer to [Computation Cost](../../../getting-started/klaytn/design/computation/computation-cost/) for more details. |
| miner           | This field returns the block proposer's address, because Klaytn's [consensus mechanism](../../../getting-started/klaytn/design/consensus-mechanism.md) is [PBFT](../../../getting-started/klaytn/design/consensus-mechanism.md#pbft-practical-byzantine-fault-tolerance), which has a block proposer instead of miners.                                                                                                   |
| mixHash         | This field always has zeroHash (`0x00...`) because Klaytn's consensus mechanism is not based on PoW.                                                                                                                                                                                                                                                                                                                      |
| nonce           | This field always has zeroNonce (`0x00...`) because Klaytn's consensus mechanism is not based on PoW.                                                                                                                                                                                                                                                                                                                     |
| sha3Uncles      | This field always has `0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347`, which is the Keccak256 hash of the RLP-encoded bytes of the list containing empty block header because there are no uncles blocks on Klaytn.                                                                                                                                                                                  |
| totalDifficulty | The total difficulty of the chain until the querying block.                                                                                                                                                                                                                                                                                                                                                               |
| uncles          | This field always has the value `[]` because there is no technical concept of uncles block in Klaytn core.                                                                                                                                                                                                                                                                                                                |

Fields not covered here will stick to the block fields of Ethereum.

### Transaction <a href="#transaction" id="transaction"></a>

Related APIs: [eth\_getTransactionByHash](eth/transaction/#eth\_getTransactionByHash), [eth\_getTransactionByBlockHashAndIndex](eth/transaction/#eth\_getTransactionByBlockHashAndIndex), [eth\_getTransactionByBlockNumberAndIndex](eth/transaction/#eth\_getTransactionByBlockNumberAndIndex), [eth\_pendingTransactions](eth/transaction/#eth\_pendingTransactions).

> Due to the fundamental design differences between Klaytn and Ethereum, Klaytn transactions cannot be fully supported via `eth` namespace APIs.

| Field    | Description                                                                                                                                                                                                                          |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| gasPrice | Also known as [Unit Price](../../../getting-started/klaytn/design/transaction-fees/#unit-price) in Klaytn's context, this value is determined in the system via the governance processes.                                            |
| type     | In Klaytn, `type` returns the transaction type in string (e.g. `"LegacyTransaction"`), but it has been converted to hexadecimal (e.g. `0x0`) to match Ethereum. Transaction types that are only valid in Klaytn always return `0x0`. |

Klaytn transactions can have more than one signature because Klaytn supports MultiSig (Ethereum transactions only have one signature field (= v, r, s)) even on protocol-level. In that context, fields related to signature (v, r, s) will match `tx.signatures[0].V`, `tx.signatures[0].R`, and `tx.signatures[0].S`.

Fields not covered here will stick to the transaction fields of Ethereum.

### Transaction Receipt <a href="#transaction_receipt" id="transaction_receipt"></a>

Related APIs: [eth\_getTransactionReceipt](eth/transaction/#eth\_getTransactionReceipt).

> Due to the fundamental design differences existing between Klaytn and Ethereum, Klaytn transaction receipt cannot be fully supported when served via Ethereum namespace APIs.

| Field             | Description                                                                                                                                                                                                                 |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| effectiveGasPrice | Since Klaytn uses a fixed gas price policy, the gasPrice value is returned. gasPrice(also called [Unit Price](../../../getting-started/klaytn/design/transaction-fees/#unit-price)) is set in the system by the governance. |
| transactionIndex  | Almost same with Ethereum but unlike Ethereum, Klaytn returns integer as it is when its pending.                                                                                                                            |

Fields not covered here will stick to Ethereum's suggested fields of transaction\_receipt.
