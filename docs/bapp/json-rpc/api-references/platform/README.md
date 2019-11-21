---
description: 'APIs related to accounts, blocks, transactions, and nodes.'
---

# klay

The namespace `klay` provides functions related to accounts, blocks, transactions, configurations of networks or nodes, filters, and so on. The list below enumerates the API functions that are currently supported in Klaytn.

## [Account](account.md)

* [klay\_accountCreated](account.md#klay_accountcreated)
* [klay\_accounts](account.md#klay_accounts)
* [klay\_getAccount](account.md#klay_getaccount)
* [klay\_getAccountKey](account.md#klay_getaccountkey)
* [klay\_getBalance](account.md#klay_getbalance)
* [klay\_getCode](account.md#klay_getcode)
* [klay\_getTransactionCount](account.md#klay_gettransactioncount)
* [klay\_isContractAccount](account.md#klay_iscontractaccount)
* [klay\_sign](account.md#klay_sign)

## [Block](block.md)

* [klay\_blockNumber](block.md#klay_blocknumber)
* [klay\_getBlockByNumber](block.md#klay_getblockbynumber)
* [klay\_getBlockByHash](block.md#klay_getblockbyhash)
* [klay\_getBlockReceipts](block.md#klay_getblockreceipts)
* [klay\_getBlockTransactionCountByNumber](block.md#klay_getblocktransactioncountbynumber)
* [klay\_getBlockTransactionCountByHash](block.md#klay_getblocktransactioncountbyhash)
* [klay\_getBlockWithConsensusInfoByHash](block.md#klay_getblockwithconsensusinfobyhash)
* [klay\_getBlockWithConsensusInfoByNumber](block.md#klay_getblockwithconsensusinfobynumber)
* [klay\_getCommittee](block.md#klay_getcommittee)
* [klay\_getCommitteeSize](block.md#klay_getcommitteesize)
* [klay\_getCouncil](block.md#klay_getcouncil)
* [klay\_getCouncilSize](block.md#klay_getcouncilsize)
* [klay\_getStorageAt](block.md#klay_getstorageat)
* [klay\_mining](block.md#klay_mining)
* [klay\_syncing](block.md#klay_syncing)

## [Transaction](transaction.md)

* [klay\_call](transaction.md#klay_call)
* [klay\_estimateGas](transaction.md#klay_estimategas)
* [klay\_estimateComputationCost](transaction.md#klay_estimatecomputationcost)
* [klay\_getTransactionByBlockHashAndIndex](transaction.md#klay_gettransactionbyblockhashandindex)
* [klay\_getTransactionByBlockNumberAndIndex](transaction.md#klay_gettransactionbyblocknumberandindex)
* [klay\_getTransactionByHash](transaction.md#klay_gettransactionbyhash)
* [klay\_getTransactionBySenderTxHash](transaction.md#klay_gettransactionbysendertxhash)
* [klay\_getTransactionReceipt](transaction.md#klay_gettransactionreceipt)
* [klay\_getTransactionReceiptBySenderTxHash](transaction.md#klay_gettransactionreceiptbysendertxhash)
* [klay\_sendRawTransaction](transaction.md#klay_sendrawtransaction)
* [klay\_sendTransaction](transaction.md#klay_sendtransaction)
* [klay\_signTransaction](transaction.md#klay_signtransaction)

## [Configuration](config.md)

* [klay\_chainID](config.md#klay_chainid)
* [klay\_clientVersion](config.md#klay_clientVersion)
* [klay\_gasPrice](config.md#klay_gasprice)
* [klay\_gasPriceAt](config.md#klay_gaspriceat)
* [klay\_isParallelDBWrite](config.md#klay_isparalleldbwrite)
* [klay\_isSenderTxHashIndexingEnabled](config.md#klay_issendertxhashindexingenabled)
* [klay\_protocolVersion](config.md#klay_protocolversion)
* [klay\_rewardbase](config.md#klay_rewardbase)
* [klay\_writeThroughCaching](config.md#klay_writethroughcaching)

## [Filter](filter.md)

* [klay\_getFilterChanges](filter.md#klay_getfilterchanges)
* [klay\_getFilterLogs](filter.md#klay_getfilterlogs)
* [klay\_getLogs](filter.md#klay_getlogs)
* [klay\_newBlockFilter](filter.md#klay_newblockfilter)
* [klay\_newFilter](filter.md#klay_newfilter)
* [klay\_newPendingTransactionFilter](filter.md#klay_newpendingtransactionfilter)
* [klay\_uninstallFilter](filter.md#klay_uninstallfilter)

## [Miscellaneous](misc.md)

* [klay\_sha3](misc.md#klay_sha3)

