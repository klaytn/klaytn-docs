---
description: >-
`eth` namespace APIs.
---

# Namespace eth <a id="namespace-eth"></a>

The namespace `eth` provides functions related to accounts, blocks, transactions,
configurations of networks or nodes, filters, and so on.

Klaytn now supports [eth namespace apis](https://eth.wiki/json-rpc/API). But Please note that
there are some fields returning correction values. Below is the overview of that fields.

And due to the fundamental design differences existing between Klaytn and Ethereum, 
Klaytn's data structure (Transaction, Block, TransactionReceipt) cannot be fully supported via eth namespace APIs.

**NOTE**: `eth` namespace APIs are supported from Klaytn v1.8.0.

The list below enumerates the API functions that are currently supported in Klaytn.

### [Account](./eth/account.md) <a id="account"></a>
- [eth_accounts](./eth/account.md#eth_accounts)
- [eth_getBalance](./eth/account.md#eth_getbalance)
- [eth_getCode](./eth/account.md#eth_getcode)
- [eth_getTransactionCount](./eth/account.md#eth_gettransactioncount)
- [eth_sign](./eth/account.md#eth_sign)

### [Block](./eth/block.md) <a id="block"></a>
- [eth_blockNumber](./eth/block.md#eth_blocknumber)
- [eth_getHeaderByNumber](./eth/block.md#eth_getheaderbynumber)
- [eth_getHeaderByHash](./eth/block.md#eth_getheaderbyhash)
- [eth_getBlockByNumber](./eth/block.md#eth_getblockbynumber)
- [eth_getBlockByHash](./eth/block.md#eth_getblockbyhash)
- [eth_getBlockByHash](./eth/block.md#eth_getblockbyhash)
- [eth_getUncleBlockByHashAndIndex](./eth/block.md#eth_getunclebyblockhashandindex)
- [eth_getUncleByBlockNumberAndIndex](./eth/block.md#eth_getunclebyblocknumberandindex)
- [eth_getBlockTransactionCountByNumber](./eth/block.md#eth_getblocktransactioncountbynumber)
- [eth_getBlockTransactionCountByHash](./eth/block.md#eth_getblocktransactioncountbyhash)
- [eth_getUncleCountByBlockNumber](./eth/block.md#eth_getunclecountbyblocknumber)
- [eth_getUncleCountByBlockHash](./eth/block.md#eth_getunclecountbyblockhash)
- [eth_getStorageAt](./eth/block.md#eth_getstorageat)
- [eth_mining](./eth/block.md#eth_mining)
- [eth_syncing](./eth/block.md#eth_syncing)


### [Transaction](./eth/transaction.md) <a id="transaction"></a>
- [eth_call](./eth/transaction.md#eth_call)
- [eth_estimateGas](./eth/transaction.md#eth_estimategas)
- [eth_getTransactionByBlockHashAndIndex](./eth/transaction.md#eth_gettransactionbyblockhashandindex)
- [eth_getTransactionByBlockNumberAndIndex](./eth/transaction.md#eth_gettransactionbyblocknumberandindex)
- [eth_getTransactionByHash](./eth/transaction.md#eth_gettransactionbyhash)
- [eth_getTransactionReceipt](./eth/transaction.md#eth_gettransactionreceipt)
- [eth_sendRawTransaction](./eth/transaction.md#eth_sendrawtransaction)
- [eth_sendTransaction](./eth/transaction.md#eth_sendtransaction)
- [eth_signTransaction](./eth/transaction.md#eth_signtransaction)


### [Configuration](./eth/config.md) <a id="configuration"></a>
- [eth_coinbase](./eth/config.md#eth_coinbase)
- [eth_etherbase](./eth/config.md#eth_etherbase)
- [eth_chainId](./eth/config.md#eth_chainid)
- [eth_gasPrice](./eth/config.md#eth_gasprice)


### [Filter](./eth/filter.md) <a id="filter"></a>
- [eth_getFilterChanges](./eth/filter.md#eth_getfilterchanges)
- [eth_getFilterLogs](./eth/filter.md#eth_getfilterlogs)
- [eth_getLogs](./eth/filter.md#eth_getlogs)
- [eth_newBlockFilter](./eth/filter.md#eth_newblockfilter)
- [eth_newFilter](./eth/filter.md#eth_newfilter)
- [eth_newPendingTransactionFilter](./eth/filter.md#eth_newpendingtransactionfilter)
- [eth_subscribe](./eth/filter.md#eth_subscribe)
- [eth_uninstallFilter](./eth/filter.md#eth_uninstallfilter)
- [eth_unsubscribe](./eth/filter.md#eth_unsubscribe)


### [Gas](./eth/gas.md) <a id="gas"></a>
- [eth_feeHistory](./eth/gas.md#eth_feehistory)
- [eth_maxPriorityFeePerGas](./eth/gas.md#eth_maxpriorityfeepergas)

### [Miscellaneous](./eth/misc.md) <a id="miscellaneous"></a>
- [eth_hashrate](./eth/misc.md#eth_hashrate)
- [eth_getWork](./eth/misc.md#eth_getwork)
- [eth_submitWork](./eth/misc.md#eth_submitwork)
- [eth_submitHashrate](./eth/misc.md#eth_submithashrate)

## Differences Overview from Ethereum

> Please check the [Caution](./eth/caution.md) document which describes details about differences between Klaytn and Ethereum when serving eth namespace APIs. 

### Block Header <a id="block_header"></a>

Related APIs: `eth_getHeaderByNumber`, `eth_getHeaderByHash`.

| Field           | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                          |                                                                                                                                                                                                                                                                                                                                                                                                            
|-----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| baseFeePerGas   | **(Note that)** This field always have value `0x0` because there is no scheme of baseFeePerGas in Klaytn yet.                                                                                                                                                                                                                                                                                                                                                        |
| difficulty      | **(Note that)** This field always have value `0x1` because the value is from `blockScore` field of Klaytn Header. There is no PoW mechanism in Klaytn.                                                                                                                                                                                                                                                                                                               |
| extraData       | **(Note that)** It always return `0x` which means empty data because actual value of `extraData` field in Klaytn header cannot be used as meaningful way when served as eth namespace api. Because `extraData` is used as consensus info which is an encoded value of validators addresses, validators signatures, and proposer signature in Klaytn but the original Klaytn header changes while serving eth namespace apis, so it lost it's meaning.                |
| gasLimit        | **(Note that)** This field always have value `0xe8d4a50fff`(=`999999999999` in decimal representation.) because there is no GasLimit in Klaytn, so we return this value as a large enough. As of the writing date, it is 30 times larger than [the block gas limit of Ethereum](https://ethereum.org/en/developers/docs/gas/#block-size). Please check [computation cost](https://docs.klaytn.com/klaytn/design/computation/computation-cost) for more details.      |
| miner           | **(Note that)** Because the [consensus mechanism](https://docs.klaytn.com/klaytn/design/consensus-mechanism) in Klaytn is [PBFT](https://docs.klaytn.com/klaytn/design/consensus-mechanism#pbft-practical-byzantine-fault-tolerance), there is a block proposer not miner. So it returns the address of proposer of the block.                                                                                                                                       |
| mixHash         | **(Note that)** This field always have zeroHash(`0x00...`) because there is no PoW mechanism in Klaytn.                                                                                                                                                                                                                                                                                                                                                              |
| nonce           | **(Note that)** This field always have zeroNonce(`0x00...`) because there is no PoW mechanism in Klaytn.                                                                                                                                                                                                                                                                                                                                                             |
| sha3Uncles      | **(Note that)** This field always have `0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347` which is the keccak256 hash of rlp encoded bytes of empty list of transaction headers because there is no uncles in Klaytn.                                                                                                                                                                                                                              |
| totalDifficulty | **(Note that)** The total blockScore of the chain until this block.                                                                                                                                                                                                                                                                                                                                                                                                  |

Fields not covered here are fields used synonymously with Ethereum.

### Block <a id="block"></a>

Related APIs: `eth_getBlockByHash`, `eth_getBlockByNumber`, `eth_getUncleByBlockHashAndIndex`, `eth_getUncleByBlockNumberAndIndex`.

Since Block contains fields of Header and header has already been covered above,
this section describes the remaining fields of the block except for header.

| Field           | Description                                                                                       |
|-----------------|---------------------------------------------------------------------------------------------------|
| uncles          | **(Note that)** This field is always have value `[]` because there are no uncles in Klaytn.       |

### Transaction <a id="transaction"></a>

Related APIs: `eth_getTransactionByHash`, `eth_getTransactionByBlockHashAndIndex`, `eth_getTransactionByBlockNumberAndIndex`, `eth_pendingTransactions`.

> Due to the fundamental design differences existing between Klaytn and Ethereum, 
> Klaytn transaction cannot be fully supported when served via Ethereum namespace APIs. 

| Field    | Description                                                                                                                                                                                                                                                                                                   |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| gasPrice | **(Note that)** It is also called [Unit Price](https://docs.klaytn.com/klaytn/design/transaction-fees#unit-price) in Klaytn and this value is set in the system by the governance.                                                                                                                            |
| type     | **(Note that)** Value and data type of this field is converted. The type of this field is a string(e.g. `"LegacyTransaction"`) in Klaytn but it is converted and served as hexadecimal(e.g. `0x0`) just like Ethereum Legacy Transaction. Transaction types valid only for Klaytn are served as `0x0` always. |

Transaction in Klaytn can have more than one signature because Klaytn supports MultiSig(Ethereum transaction have only one signature field (= v, r, s)).
In that context, fields related with signature (v, r, s) will match `tx.signatures[0].V`, `tx.signatures[0].R`, `tx.signatures[0].S`.

Fields not covered here are fields used synonymously with Ethereum.

### Transaction Receipt <a id="transaction_receipt"></a>

Related APIs: `eth_getTransactionReceipt`.

> Due to the fundamental design differences existing between Klaytn and Ethereum,
> Klaytn transaction receipt cannot be fully supported when served via Ethereum namespace APIs.
 
| Field             | Description                                                                                                                                                                                                                                                                                                   |
|-------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| effectiveGasPrice | **(Note that)** In Klaytn, gasPrice(also called [Unit Price](https://docs.klaytn.com/klaytn/design/transaction-fees#unit-price)) is set in the system by the governance.                                                                                                                                      |
| type              | **(Note that)** Value and data type of this field is converted. The type of this field is a string(e.g. `"LegacyTransaction"`) in Klaytn but it is converted and served as hexadecimal(e.g. `0x0`) just like Ethereum Legacy Transaction. Transaction types valid only for Klaytn are served as `0x0` always. |
| transactionIndex  | **(Note that)** Almost same with Ethereum but unlike Ethereum, Klaytn returns integer as it is when its pending.                                                                                                                                                                                              |

Fields not covered here are fields used synonymously with Ethereum.
