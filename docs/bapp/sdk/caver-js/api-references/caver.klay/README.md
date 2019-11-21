---
description: A JavaScript wrapper to Klaytn APIs around the namespace 'klay'.
---

# caver.klay

The `caver-klay` package allows you to interact with the Klaytn nodes. The list below enumerates the API functions that are currently supported in `caver-js`.

### [Account](account.md)

* [defaultAccount](account.md#defaultaccount)
* [accountCreated](account.md#accountcreated)
* [getAccount](account.md#getaccount)
* [getAccounts](account.md#getaccounts)
* [getAccountKey](account.md#getaccountkey)
* [getBalance](account.md#getbalance)
* [getCode](account.md#getcode)
* [getTransactionCount](account.md#gettransactioncount)
* [isContractAccount](account.md#iscontractaccount)
* [sign](account.md#sign)

### [Block](block.md)

* [defaultBlock](block.md#defaultblock)
* [getBlockNumber](block.md#getblocknumber)
* [getBlock](block.md#getblock)
* [getBlockReceipts](block.md#getblockreceipts)
* [getBlockTransactionCount](block.md#getblocktransactioncount)
* [getBlockWithConsensusInfo](block.md#getblockwithconsensusinfo)
* [getCommittee](block.md#getcommittee)
* [getCommitteeSize](block.md#getcommitteesize)
* [getCouncil](block.md#getcouncil)
* [getCouncilSize](block.md#getcouncilsize)
* [getStorageAt](block.md#getstorageat)
* [isMining](block.md#ismining)
* [isSyncing](block.md#issyncing)

### [Transaction](transaction/)

* [call](transaction/#call)
* [estimateGas](transaction/#estimategas)
* [estimateComputationCost](transaction/#estimatecomputationcost)
* [decodeTransaction](transaction/#decodetransaction)
* [getTransaction](transaction/#gettransaction)
* [getTransactionBySenderTxHash](transaction/#gettransactionbysendertxhash)
* [getTransactionFromBlock](transaction/#gettransactionfromblock)
* [getTransactionReceipt](transaction/#gettransactionreceipt)
* [getTransactionReceiptBySenderTxHash](transaction/#gettransactionreceiptbysendertxhash)
* [sendSignedTransaction](transaction/#sendsignedtransaction)
* [sendTransaction \(Legacy\)](transaction/sendtx_legacy.md#sendtransaction-legacy)
* [sendTransaction \(VALUE\_TRANSFER\)](transaction/sendtx_value_transfer.md#sendtransaction-value_transfer)
* [sendTransaction \(FEE\_DELEGATED\_VALUE\_TRANSFER\)](transaction/sendtx_value_transfer.md#sendtransaction-fee_delegated_value_transfer)
* [sendTransaction \(FEE\_DELEGATED\_VALUE\_TRANSFER\_WITH\_RATIO\)](transaction/sendtx_value_transfer.md#sendtransaction-fee_delegated_value_transfer_with_ratio)
* [sendTransaction \(VALUE\_TRANSFER\_MEMO\)](transaction/sendtx_value_transfer_memo.md#sendtransaction-value_transfer_memo)
* [sendTransaction \(FEE\_DELEGATED\_VALUE\_TRANSFER\_MEMO\)](transaction/sendtx_value_transfer_memo.md#sendtransaction-fee_delegated_value_transfer_memo)
* [sendTransaction \(FEE\_DELEGATED\_VALUE\_TRANSFER\_MEMO\_WITH\_RATIO\)](transaction/sendtx_value_transfer_memo.md#sendtransaction-fee_delegated_value_transfer_memo_with_ratio)
* [sendTransaction \(ACCOUNT\_UPDATE\)](transaction/sendtx_account_update.md#sendtransaction-account_update)
* [sendTransaction \(FEE\_DELEGATED\_ACCOUNT\_UPDATE\)](transaction/sendtx_account_update.md#sendtransaction-fee_delegated_account_update)
* [sendTransaction \(FEE\_DELEGATED\_ACCOUNT\_UPDATE\_WITH\_RATIO\)](transaction/sendtx_account_update.md#sendtransaction-fee_delegated_account_update_with_ratio)
* [sendTransaction \(SMART\_CONTRACT\_DEPLOY\)](transaction/sendtx_smart_contract_deploy.md#sendtransaction-smart_contract_deploy)
* [sendTransaction \(FEE\_DELEGATED\_SMART\_CONTRACT\_DEPLOY\)](transaction/sendtx_smart_contract_deploy.md#sendtransaction-fee_delegated_smart_contract_deploy)
* [sendTransaction \(FEE\_DELEGATED\_SMART\_CONTRACT\_DEPLOY\_WITH\_RATIO\)](transaction/sendtx_smart_contract_deploy.md#sendtransaction-fee_delegated_smart_contract_deploy_with_ratio)
* [sendTransaction \(SMART\_CONTRACT\_EXECUTION\)](transaction/sendtx_smart_contract_execution.md#sendtransaction-smart_contract_execution)
* [sendTransaction \(FEE\_DELEGATED\_SMART\_CONTRACT\_EXECUTION\)](transaction/sendtx_smart_contract_execution.md#sendtransaction-fee_delegated_smart_contract_execution)
* [sendTransaction \(FEE\_DELEGATED\_SMART\_CONTRACT\_EXECUTION\_WITH\_RATIO\)](transaction/sendtx_smart_contract_execution.md#sendtransaction-fee_delegated_smart_contract_execution_with_ratio)
* [sendTransaction \(CANCEL\)](transaction/sendtx_cancel.md#sendtransaction-cancel)
* [sendTransaction \(FEE\_DELEGATED\_CANCEL\)](transaction/sendtx_cancel.md#sendtransaction-fee_delegated_cancel)
* [sendTransaction \(FEE\_DELEGATED\_CANCEL\_WITH\_RATIO\)](transaction/sendtx_cancel.md#sendtransaction-fee_delegated_cancel_with_ratio)
* [signTransaction](transaction/#signtransaction)

## [Configuration](config.md)

* [gasPriceAt](config.md#gaspriceat)
* [getChainId](config.md#getchainid)
* [getGasPrice](config.md#getgasprice)
* [getNodeInfo](config.md#getnodeinfo)
* [getProtocolVersion](config.md#getprotocolversion)
* [isSenderTxHashIndexingEnabled](config.md#issendertxhashindexingenabled)
* [isParallelDBWrite](config.md#isparalleldbwrite)
* [rewardbase](config.md#rewardbase)
* [writeThroughCaching](config.md#writethroughcaching)

## [Filter](filter.md)

* [getFilterChanges](filter.md#getfilterchanges)
* [getFilterLogs](filter.md#getfilterlogs)
* [getPastLogs](filter.md#getpastlogs)
* [newBlockFilter](filter.md#newblockfilter)
* [newFilter](filter.md#newfilter)
* [newPendingTransactionFilter](filter.md#newpendingtransactionfilter)
* [uninstallFilter](filter.md#uninstallfilter)

### [Miscellaneous](misc.md)

* [sha3](misc.md#sha3)

