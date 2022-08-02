---
description: >-
  계정, 블록, 트랜잭션, 노드 등과 관련된 API입니다.
---

# klay <a id="namespace-klay"></a>

The namespace `klay` provides functions related to accounts, blocks, transactions, configurations of networks or nodes, filters, and so on. The list below enumerates the API functions that are currently supported in Klaytn.


### [계정](./klay/account.md) <a id="account"></a>
- [klay_accountCreated](./klay/account.md#klay_accountcreated)
- [klay_accounts](./klay/account.md#klay_accounts)
- [klay_encodeAccountKey](./klay/account.md#klay_encodeaccountkey)
- [klay_decodeAccountKey](./klay/account.md#klay_decodeaccountkey)
- [klay_getAccount](./klay/account.md#klay_getaccount)
- [klay_getAccountKey](./klay/account.md#klay_getaccountkey)
- [klay_getBalance](./klay/account.md#klay_getbalance)
- [klay_getCode](./klay/account.md#klay_getcode)
- [klay_getTransactionCount](./klay/account.md#klay_gettransactioncount)
- [klay_isContractAccount](./klay/account.md#klay_iscontractaccount)
- [klay_sign](./klay/account.md#klay_sign)


### [블록](./klay/block.md) <a id="block"></a>
- [klay_blockNumber](./klay/block.md#klay_blocknumber)
- [klay_getHeaderByNumber](./klay/block.md#klay_getheaderbynumber)
- [klay_getHeaderByHash](./klay/block.md#klay_getheaderbyhash)
- [klay_getBlockByNumber](./klay/block.md#klay_getblockbynumber)
- [klay_getBlockByHash](./klay/block.md#klay_getblockbyhash)
- [klay_getBlockReceipts](./klay/block.md#klay_getblockreceipts)
- [klay_getBlockTransactionCountByNumber](./klay/block.md#klay_getblocktransactioncountbynumber)
- [klay_getBlockTransactionCountByHash](./klay/block.md#klay_getblocktransactioncountbyhash)
- [klay_getBlockWithConsensusInfoByHash](./klay/block.md#klay_getblockwithconsensusinfobyhash)
- [klay_getBlockWithConsensusInfoByNumber](./klay/block.md#klay_getblockwithconsensusinfobynumber)
- [klay_getCommittee](./klay/block.md#klay_getcommittee)
- [klay_getCommitteeSize](./klay/block.md#klay_getcommitteesize)
- [klay_getCouncil](./klay/block.md#klay_getcouncil)
- [klay_getCouncilSize](./klay/block.md#klay_getcouncilsize)
- [klay_getStorageAt](./klay/block.md#klay_getstorageat)
- [klay_syncing](./klay/block.md#klay_syncing)


### [트랜잭션](./klay/transaction.md) <a id="transaction"></a>
- [klay_call](./klay/transaction.md#klay_call)
- [klay_estimateGas](./klay/transaction.md#klay_estimategas)
- [klay_estimateComputationCost](./klay/transaction.md#klay_estimatecomputationcost)
- [klay_getTransactionByBlockHashAndIndex](./klay/transaction.md#klay_gettransactionbyblockhashandindex)
- [klay_getTransactionByBlockNumberAndIndex](./klay/transaction.md#klay_gettransactionbyblocknumberandindex)
- [klay_getTransactionByHash](./klay/transaction.md#klay_gettransactionbyhash)
- [klay_getTransactionBySenderTxHash](./klay/transaction.md#klay_gettransactionbysendertxhash)
- [klay_getTransactionReceipt](./klay/transaction.md#klay_gettransactionreceipt)
- [klay_getTransactionReceiptBySenderTxHash](./klay/transaction.md#klay_gettransactionreceiptbysendertxhash)
- [klay_sendRawTransaction](./klay/transaction.md#klay_sendrawtransaction)
- [klay_sendTransaction](./klay/transaction.md#klay_sendtransaction)
- [klay_sendTransactionAsFeePayer](./klay/transaction.md#klay_sendtransactionasfeepayer)
- [klay_signTransaction](./klay/transaction.md#klay_signtransaction)
- [klay_signTransactionAsFeePayer](./klay/transaction.md#klay_signtransactionasfeepayer)
- [klay_getDecodedAnchoringTransactionByHash](./klay/transaction.md#klay_getDecodedAnchoringTransactionByHash)


### [환경설정](./klay/config.md) <a id="configuration"></a>
- [klay_chainID](./klay/config.md#klay_chainid)
- [klay_clientVersion](./klay/config.md#klay_clientversion)
- [klay_gasPrice](./klay/config.md#klay_gasprice)
- [klay_gasPriceAt](./klay/config.md#klay_gaspriceat)
- [klay_isParallelDBWrite](./klay/config.md#klay_isparalleldbwrite)
- [klay_isSenderTxHashIndexingEnabled](./klay/config.md#klay_issendertxhashindexingenabled)
- [klay_protocolVersion](./klay/config.md#klay_protocolversion)
- [klay_rewardbase](./klay/config.md#klay_rewardbase)

### [Gas](./klay/gas.md) <a id="gas"></a>
- [klay_feeHistory](./klay/gas.md#klay_feehistory)
- [klay_maxPriorityFeePerGas](./klay/gas.md#klay_maxpriorityfeepergas)

### [필터](./klay/filter.md) <a id="filter"></a>
- [klay_getFilterChanges](./klay/filter.md#klay_getfilterchanges)
- [klay_getFilterLogs](./klay/filter.md#klay_getfilterlogs)
- [klay_getLogs](./klay/filter.md#klay_getlogs)
- [klay_newBlockFilter](./klay/filter.md#klay_newblockfilter)
- [klay_newFilter](./klay/filter.md#klay_newfilter)
- [klay_newPendingTransactionFilter](./klay/filter.md#klay_newpendingtransactionfilter)
- [klay_subscribe](./klay/filter.md#klay_subscribe)
- [klay_uninstallFilter](./klay/filter.md#klay_uninstallfilter)
- [klay_unsubscribe](./klay/filter.md#klay_unsubscribe)


### [기타](./klay/misc.md) <a id="miscellaneous"></a>
- [klay_sha3](./klay/misc.md#klay_sha3)

