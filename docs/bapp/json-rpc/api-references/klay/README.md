---
description: 'APIs related to accounts, blocks, transactions, and nodes.'
---

# klay

The namespace `klay` provides functions related to accounts, blocks, transactions, configurations of networks or nodes, filters, and so on. The list below enumerates the API functions that are currently supported in Klaytn.

## [Account](account.md) <a id="account"></a>

* [klay\_accountCreated](account.md#klay_accountcreated)
* [klay\_accounts](account.md#klay_accounts)
* [klay\_encodeAccountKey](account.md#klay_encodeaccountkey)
* [klay\_decodeAccountKey](account.md#klay_decodeaccountkey)
* [klay\_getAccount](account.md#klay_getaccount)
* [klay\_getAccountKey](account.md#klay_getaccountkey)
* [klay\_getBalance](account.md#klay_getbalance)
* [klay\_getCode](account.md#klay_getcode)
* [klay\_getTransactionCount](account.md#klay_gettransactioncount)
* [klay\_isContractAccount](account.md#klay_iscontractaccount)
* [klay\_sign](account.md#klay_sign)

## [Block](block.md) <a id="block"></a>

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

## [Transaction](transaction/) <a id="transaction"></a>

* [klay\_call](transaction/#klay_call)
* [klay\_estimateGas](transaction/#klay_estimategas)
* [klay\_estimateComputationCost](transaction/#klay_estimatecomputationcost)
* [klay\_getTransactionByBlockHashAndIndex](transaction/#klay_gettransactionbyblockhashandindex)
* [klay\_getTransactionByBlockNumberAndIndex](transaction/#klay_gettransactionbyblocknumberandindex)
* [klay\_getTransactionByHash](transaction/#klay_gettransactionbyhash)
* [klay\_getTransactionBySenderTxHash](transaction/#klay_gettransactionbysendertxhash)
* [klay\_getTransactionReceipt](transaction/#klay_gettransactionreceipt)
* [klay\_getTransactionReceiptBySenderTxHash](transaction/#klay_gettransactionreceiptbysendertxhash)
* [klay\_sendRawTransaction](transaction/#klay_sendrawtransaction)
* [klay\_sendTransaction](transaction/#klay_sendtransaction)
* [klay\_sendTransactionAsFeePayer](transaction/#klay_sendtransactionasfeepayer)
* [klay\_signTransaction](transaction/#klay_signtransaction)
* [klay\_signTransactionAsFeePayer](transaction/#klay_signtransactionasfeepayer)
* [klay\_getDecodedAnchoringTransactionByHash](transaction/#klay_getDecodedAnchoringTransactionByHash)

## [Configuration](config.md) <a id="configuration"></a>

* [klay\_chainID](config.md#klay_chainid)
* [klay\_clientVersion](config.md#klay_clientversion)
* [klay\_gasPrice](config.md#klay_gasprice)
* [klay\_gasPriceAt](config.md#klay_gaspriceat)
* [klay\_isParallelDBWrite](config.md#klay_isparalleldbwrite)
* [klay\_isSenderTxHashIndexingEnabled](config.md#klay_issendertxhashindexingenabled)
* [klay\_protocolVersion](config.md#klay_protocolversion)
* [klay\_rewardbase](config.md#klay_rewardbase)
* [klay\_writeThroughCaching](config.md#klay_writethroughcaching)

## [Filter](filter.md) <a id="filter"></a>

* [klay\_getFilterChanges](filter.md#klay_getfilterchanges)
* [klay\_getFilterLogs](filter.md#klay_getfilterlogs)
* [klay\_getLogs](filter.md#klay_getlogs)
* [klay\_newBlockFilter](filter.md#klay_newblockfilter)
* [klay\_newFilter](filter.md#klay_newfilter)
* [klay\_newPendingTransactionFilter](filter.md#klay_newpendingtransactionfilter)
* [klay\_subscribe](filter.md#klay_subscribe)
* [klay\_uninstallFilter](filter.md#klay_uninstallfilter)
* [klay\_unsubscribe](filter.md#klay_unsubscribe)

## [Miscellaneous](misc.md) <a id="miscellaneous"></a>

* [klay\_sha3](misc.md#klay_sha3)

