# Namespace klay

Namespace `klay` provides functions related to accounts, blocks, transactions,
configurations of networks or nodes, filters, and so on.
The list below enumerates the API functions that are currently supported in Klaytn.


### [Account](./platform/account.md)
- [klay_accountCreated](./platform/account.md#klay_accountcreated)
- [klay_accounts](./platform/account.md#klay_accounts)
- [klay_getAccount](./platform/account.md#klay_getaccount)
- [klay_getAccountKey](./platform/account.md#klay_getaccountkey)
- [klay_getBalance](./platform/account.md#klay_getbalance)
- [klay_getCode](./platform/account.md#klay_getcode)
- [klay_getTransactionCount](./platform/account.md#klay_gettransactioncount)
- [klay_isContractAccount](./platform/account.md#klay_iscontractaccount)
- [klay_sign](./platform/account.md#klay_sign)


### [Block](./platform/block.md)
- [klay_blockNumber](./platform/block.md#klay_blocknumber)
- [klay_getBlockByNumber](./platform/block.md#klay_getblockbynumber)
- [klay_getBlockByHash](./platform/block.md#klay_getblockbyhash)
- [klay_getBlockReceipts](./platform/block.md#klay_getblockreceipts)
- [klay_getBlockTransactionCountByNumber](./platform/block.md#klay_getblocktransactioncountbynumber)
- [klay_getBlockTransactionCountByHash](./platform/block.md#klay_getblocktransactioncountbyhash)
- [klay_getBlockWithConsensusInfoByHash](./platform/block.md#klay_getblockwithconsensusinfobyhash)
- [klay_getBlockWithConsensusInfoByNumber](./platform/block.md#klay_getblockwithconsensusinfobynumber)
- [klay_getCommittee](./platform/block.md#klay_getcommittee)
- [klay_getCommitteeSize](./platform/block.md#klay_getcommitteesize)
- [klay_getCouncil](./platform/block.md#klay_getcouncil)
- [klay_getCouncilSize](./platform/block.md#klay_getcouncilsize)
- [klay_getStorageAt](./platform/block.md#klay_getstorageat)
- [klay_mining](./platform/block.md#klay_mining)
- [klay_syncing](./platform/block.md#klay_syncing)


### [Transaction](./platform/transaction.md)
- [klay_call](./platform/transaction.md#klay_call)
- [klay_estimateGas](./platform/transaction.md#klay_estimategas)
- [klay_estimateComputationCost](./platform/transaction.md#klay_estimatecomputationcost)
- [klay_getTransactionByBlockHashAndIndex](./platform/transaction.md#klay_gettransactionbyblockhashandindex)
- [klay_getTransactionByBlockNumberAndIndex](./platform/transaction.md#klay_gettransactionbyblocknumberandindex)
- [klay_getTransactionByHash](./platform/transaction.md#klay_gettransactionbyhash)
- [klay_getTransactionBySenderTxHash](./platform/transaction.md#klay_gettransactionbysendertxhash)
- [klay_getTransactionReceipt](./platform/transaction.md#klay_gettransactionreceipt)
- [klay_getTransactionReceiptBySenderTxHash](./platform/transaction.md#klay_gettransactionreceiptbysendertxhash)
- [klay_sendRawTransaction](./platform/transaction.md#klay_sendrawtransaction)
- [klay_sendTransaction](./platform/transaction.md#klay_sendtransaction)
- [klay_signTransaction](./platform/transaction.md#klay_signtransaction)


### [Configuration](./platform/config.md)
- [klay_chainID](./platform/config.md#klay_chainid)
- [klay_clientVersion](./platform/config.md#klay_clientVersion)
- [klay_gasPrice](./platform/config.md#klay_gasprice)
- [klay_gasPriceAt](./platform/config.md#klay_gaspriceat)
- [klay_isParallelDBWrite](./platform/config.md#klay_isparalleldbwrite)
- [klay_isSenderTxHashIndexingEnabled](./platform/config.md#klay_issendertxhashindexingenabled)
- [klay_protocolVersion](./platform/config.md#klay_protocolversion)
- [klay_rewardbase](./platform/config.md#klay_rewardbase)
- [klay_writeThroughCaching](./platform/config.md#klay_writethroughcaching)


### [Filter](./platform/filter.md)
- [klay_getFilterChanges](./platform/filter.md#klay_getfilterchanges)
- [klay_getFilterLogs](./platform/filter.md#klay_getfilterlogs)
- [klay_getLogs](./platform/filter.md#klay_getlogs)
- [klay_newBlockFilter](./platform/filter.md#klay_newblockfilter)
- [klay_newFilter](./platform/filter.md#klay_newfilter)
- [klay_newPendingTransactionFilter](./platform/filter.md#klay_newpendingtransactionfilter)
- [klay_uninstallFilter](./platform/filter.md#klay_uninstallfilter)


### [Miscellaneous](./platform/misc.md)
- [klay_sha3](./platform/misc.md#klay_sha3)
