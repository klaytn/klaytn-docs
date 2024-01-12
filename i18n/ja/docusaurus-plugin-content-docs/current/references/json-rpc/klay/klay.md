---
description: APIs related to accounts, blocks, transactions, and nodes.
---

# klay

The namespace `klay` provides functions related to accounts, blocks, transactions,
configurations of networks or nodes, filters, and so on.
The list below enumerates the API functions that are currently supported in Klaytn.

### [Account](./account.md) <a id="account"></a>

- [klay_accountCreated](./account.md#klay_accountcreated)
- [klay_accounts](./account.md#klay_accounts)
- [klay_encodeAccountKey](./account.md#klay_encodeaccountkey)
- [klay_decodeAccountKey](./account.md#klay_decodeaccountkey)
- [klay_getAccount](./account.md#klay_getaccount)
- [klay_getAccountKey](./account.md#klay_getaccountkey)
- [klay_getBalance](./account.md#klay_getbalance)
- [klay_getCode](./account.md#klay_getcode)
- [klay_getTransactionCount](./account.md#klay_gettransactioncount)
- [klay_isContractAccount](./account.md#klay_iscontractaccount)
- [klay_sign](./account.md#klay_sign)

### [Block](./block.md) <a id="block"></a>

- [klay_blockNumber](./block.md#klay_blocknumber)
- [klay_getHeaderByNumber](./block.md#klay_getheaderbynumber)
- [klay_getHeaderByHash](./block.md#klay_getheaderbyhash)
- [klay_getBlockByNumber](./block.md#klay_getblockbynumber)
- [klay_getBlockByHash](./block.md#klay_getblockbyhash)
- [klay_getBlockReceipts](./block.md#klay_getblockreceipts)
- [klay_getBlockTransactionCountByNumber](./block.md#klay_getblocktransactioncountbynumber)
- [klay_getBlockTransactionCountByHash](./block.md#klay_getblocktransactioncountbyhash)
- [klay_getBlockWithConsensusInfoByHash](./block.md#klay_getblockwithconsensusinfobyhash)
- [klay_getBlockWithConsensusInfoByNumber](./block.md#klay_getblockwithconsensusinfobynumber)
- [klay_getCommittee](./block.md#klay_getcommittee)
- [klay_getCommitteeSize](./block.md#klay_getcommitteesize)
- [klay_getCouncil](./block.md#klay_getcouncil)
- [klay_getCouncilSize](./block.md#klay_getcouncilsize)
- [klay_getStorageAt](./block.md#klay_getstorageat)
- [klay_syncing](./block.md#klay_syncing)
- [klay_getRewards](./block.md#klay_getrewards)

### [Transaction](./transaction.md) <a id="transaction"></a>

- [klay_call](./transaction.md#klay_call)
- [klay_estimateGas](./transaction.md#klay_estimategas)
- [klay_estimateComputationCost](./transaction.md#klay_estimatecomputationcost)
- [klay_getTransactionByBlockHashAndIndex](./transaction.md#klay_gettransactionbyblockhashandindex)
- [klay_getTransactionByBlockNumberAndIndex](./transaction.md#klay_gettransactionbyblocknumberandindex)
- [klay_getTransactionByHash](./transaction.md#klay_gettransactionbyhash)
- [klay_getTransactionBySenderTxHash](./transaction.md#klay_gettransactionbysendertxhash)
- [klay_getTransactionReceipt](./transaction.md#klay_gettransactionreceipt)
- [klay_getTransactionReceiptBySenderTxHash](./transaction.md#klay_gettransactionreceiptbysendertxhash)
- [klay_sendRawTransaction](./transaction.md#klay_sendrawtransaction)
- [klay_sendTransaction](./transaction.md#klay_sendtransaction)
- [klay_sendTransactionAsFeePayer](./transaction.md#klay_sendtransactionasfeepayer)
- [klay_signTransaction](./transaction.md#klay_signtransaction)
- [klay_signTransactionAsFeePayer](./transaction.md#klay_signtransactionasfeepayer)
- [klay_getDecodedAnchoringTransactionByHash](./transaction.md#klay_getDecodedAnchoringTransactionByHash)
- [klay_resend](../eth/transaction.md#klay_resend)

### [Configuration](./config.md) <a id="configuration"></a>

- [klay_chainID](./config.md#klay_chainid)
- [klay_clientVersion](./config.md#klay_clientversion)
- [klay_gasPrice](./config.md#klay_gasprice)
- [klay_gasPriceAt](./config.md#klay_gaspriceat)
- [klay_isParallelDBWrite](./config.md#klay_isparalleldbwrite)
- [klay_isSenderTxHashIndexingEnabled](./config.md#klay_issendertxhashindexingenabled)
- [klay_protocolVersion](./config.md#klay_protocolversion)
- [klay_rewardbase](./config.md#klay_rewardbase)

### [Gas](./gas.md) <a id="gas"></a>

- [klay_feeHistory](./gas.md#klay_feehistory)
- [klay_maxPriorityFeePerGas](./gas.md#klay_maxpriorityfeepergas)

### [Filter](./filter.md) <a id="filter"></a>

- [klay_getFilterChanges](./filter.md#klay_getfilterchanges)
- [klay_getFilterLogs](./filter.md#klay_getfilterlogs)
- [klay_getLogs](./filter.md#klay_getlogs)
- [klay_newBlockFilter](./filter.md#klay_newblockfilter)
- [klay_newFilter](./filter.md#klay_newfilter)
- [klay_newPendingTransactionFilter](./filter.md#klay_newpendingtransactionfilter)
- [klay_subscribe](./filter.md#klay_subscribe)
- [klay_uninstallFilter](./filter.md#klay_uninstallfilter)
- [klay_unsubscribe](./filter.md#klay_unsubscribe)

### [Miscellaneous](./misc.md) <a id="miscellaneous"></a>

- [klay_sha3](./misc.md#klay_sha3)
- [klay_recoverFromTransaction](./misc.md#klay_recoverFromTransaction)
- [klay_recoverFromMessage](./misc.md#klay_recoverFromMessage)
- [klay_forkStatus](./misc.md#klay_forkStatus)
