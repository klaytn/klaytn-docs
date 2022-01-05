---
description: >-
  APIs related to accounts, blocks, transactions, and nodes. 
---

# Namespace eth <a id="namespace-eth"></a>

The namespace `eth` provides functions related to accounts, blocks, transactions,
configurations of networks or nodes, filters, and so on.
The list below enumerates the API functions that are currently supported in Klaytn.

However there are some precautions for each data structure, so be sure to read 
[Caution](./eth/caution.md) document.

Please note that the `eth` namespace apis are supported to make 

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
- [eth_getBlockReceipts](./eth/block.md#eth_getblockreceipts)
- [eth_getBlockTransactionCountByNumber](./eth/block.md#eth_getblocktransactioncountbynumber)
- [eth_getBlockTransactionCountByHash](./eth/block.md#eth_getblocktransactioncountbyhash)
- [eth_getBlockWithConsensusInfoByHash](./eth/block.md#eth_getblockwithconsensusinfobyhash)
- [eth_getBlockWithConsensusInfoByNumber](./eth/block.md#eth_getblockwithconsensusinfobynumber)
- [eth_getCommittee](./eth/block.md#eth_getcommittee)
- [eth_getCommitteeSize](./eth/block.md#eth_getcommitteesize)
- [eth_getCouncil](./eth/block.md#eth_getcouncil)
- [eth_getCouncilSize](./eth/block.md#eth_getcouncilsize)
- [eth_getStorageAt](./eth/block.md#eth_getstorageat)
- [eth_mining](./eth/block.md#eth_mining)
- [eth_syncing](./eth/block.md#eth_syncing)


### [Transaction](./eth/transaction.md) <a id="transaction"></a>
- [eth_call](./eth/transaction.md#eth_call)
- [eth_estimateGas](./eth/transaction.md#eth_estimategas)
- [eth_estimateComputationCost](./eth/transaction.md#eth_estimatecomputationcost)
- [eth_getTransactionByBlockHashAndIndex](./eth/transaction.md#eth_gettransactionbyblockhashandindex)
- [eth_getTransactionByBlockNumberAndIndex](./eth/transaction.md#eth_gettransactionbyblocknumberandindex)
- [eth_getTransactionByHash](./eth/transaction.md#eth_gettransactionbyhash)
- [eth_getTransactionBySenderTxHash](./eth/transaction.md#eth_gettransactionbysendertxhash)
- [eth_getTransactionReceipt](./eth/transaction.md#eth_gettransactionreceipt)
- [eth_getTransactionReceiptBySenderTxHash](./eth/transaction.md#eth_gettransactionreceiptbysendertxhash)
- [eth_sendRawTransaction](./eth/transaction.md#eth_sendrawtransaction)
- [eth_sendTransaction](./eth/transaction.md#eth_sendtransaction)
- [eth_sendTransactionAsFeePayer](./eth/transaction.md#eth_sendtransactionasfeepayer)
- [eth_signTransaction](./eth/transaction.md#eth_signtransaction)
- [eth_signTransactionAsFeePayer](./eth/transaction.md#eth_signtransactionasfeepayer)
- [eth_getDecodedAnchoringTransactionByHash](./eth/transaction.md#eth_getDecodedAnchoringTransactionByHash)


### [Configuration](./eth/config.md) <a id="configuration"></a>
- [eth_chainID](./eth/config.md#eth_chainid)
- [eth_clientVersion](./eth/config.md#eth_clientversion)
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


### [Miscellaneous](./eth/misc.md) <a id="miscellaneous"></a>
- [eth_sha3](./eth/misc.md#eth_sha3)

