---
description: >-
  네임스페이스 'klay' 일대 Klaytn API에 대한 자바스크립트 래퍼.
---

# caver.klay <a id="caver-klay"></a>

`caver-klay` 패키지를 사용하면 Klaytn 노드와 상호작용할 수 있습니다.  아래 목록은 `caver-js`에서 현재 지원하는 API의 함수를 열거합니다.


## [계정](./caver.klay/account.md) <a id="account"></a>
- [defaultAccount](./caver.klay/account.md#defaultaccount)
- [accountCreated](./caver.klay/account.md#accountcreated)
- [getAccount](./caver.klay/account.md#getaccount)
- [getAccounts](./caver.klay/account.md#getaccounts)
- [getAccountKey](./caver.klay/account.md#getaccountkey)
- [getBalance](./caver.klay/account.md#getbalance)
- [getCode](./caver.klay/account.md#getcode)
- [getTransactionCount](./caver.klay/account.md#gettransactioncount)
- [isContractAccount](./caver.klay/account.md#iscontractaccount)
- [sign](./caver.klay/account.md#sign)


## [블록](./caver.klay/block.md) <a id="block"></a>
- [defaultBlock](./caver.klay/block.md#defaultblock)
- [getBlockNumber](./caver.klay/block.md#getblocknumber)
- [getBlock](./caver.klay/block.md#getblock)
- [getBlockReceipts](./caver.klay/block.md#getblockreceipts)
- [getBlockTransactionCount](./caver.klay/block.md#getblocktransactioncount)
- [getBlockWithConsensusInfo](./caver.klay/block.md#getblockwithconsensusinfo)
- [getCommittee](./caver.klay/block.md#getcommittee)
- [getCommitteeSize](./caver.klay/block.md#getcommitteesize)
- [getCouncil](./caver.klay/block.md#getcouncil)
- [getCouncilSize](./caver.klay/block.md#getcouncilsize)
- [getStorageAt](./caver.klay/block.md#getstorageat)
- [isMining](./caver.klay/block.md#ismining)
- [isSyncing](./caver.klay/block.md#issyncing)


## [트랜잭션](./caver.klay/transaction.md) <a id="transaction"></a>

- [call](./caver.klay/transaction.md#call)
- [estimateGas](./caver.klay/transaction.md#estimategas)
- [estimateComputationCost](./caver.klay/transaction.md#estimatecomputationcost)
- [decodeTransaction](./caver.klay/transaction.md#decodetransaction)
- [getTransaction](./caver.klay/transaction.md#gettransaction)
- [getTransactionBySenderTxHash](./caver.klay/transaction.md#gettransactionbysendertxhash)
- [getTransactionFromBlock](./caver.klay/transaction.md#gettransactionfromblock)
- [getTransactionReceipt](./caver.klay/transaction.md#gettransactionreceipt)
- [getTransactionReceiptBySenderTxHash](./caver.klay/transaction.md#gettransactionreceiptbysendertxhash)
- [sendSignedTransaction](./caver.klay/transaction.md#sendsignedtransaction)
- [sendTransaction (Legacy)](./caver.klay/sendtx_legacy.md#sendtransaction-legacy)
- [sendTransaction (VALUE_TRANSFER)](./caver.klay/sendtx_value_transfer.md#sendtransaction-value_transfer)
- [sendTransaction (FEE_DELEGATED_VALUE_TRANSFER)](./caver.klay/sendtx_value_transfer.md#sendtransaction-fee_delegated_value_transfer)
- [sendTransaction (FEE_DELEGATED_VALUE_TRANSFER_WITH_RATIO)](./caver.klay/sendtx_value_transfer.md#sendtransaction-fee_delegated_value_transfer_with_ratio)
- [sendTransaction (VALUE_TRANSFER_MEMO)](./caver.klay/sendtx_value_transfer_memo.md#sendtransaction-value_transfer_memo)
- [sendTransaction (FEE_DELEGATED_VALUE_TRANSFER_MEMO)](./caver.klay/sendtx_value_transfer_memo.md#sendtransaction-fee_delegated_value_transfer_memo)
- [sendTransaction (FEE_DELEGATED_VALUE_TRANSFER_MEMO_WITH_RATIO)](./caver.klay/sendtx_value_transfer_memo.md#sendtransaction-fee_delegated_value_transfer_memo_with_ratio)
- [sendTransaction (ACCOUNT_UPDATE)](./caver.klay/sendtx_account_update.md#sendtransaction-account_update)
- [sendTransaction (FEE_DELEGATED_ACCOUNT_UPDATE)](./caver.klay/sendtx_account_update.md#sendtransaction-fee_delegated_account_update)
- [sendTransaction (FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO)](./caver.klay/sendtx_account_update.md#sendtransaction-fee_delegated_account_update_with_ratio)
- [sendTransaction (SMART_CONTRACT_DEPLOY)](./caver.klay/sendtx_smart_contract_deploy.md#sendtransaction-smart_contract_deploy)
- [sendTransaction (FEE_DELEGATED_SMART_CONTRACT_DEPLOY)](./caver.klay/sendtx_smart_contract_deploy.md#sendtransaction-fee_delegated_smart_contract_deploy)
- [sendTransaction (FEE_DELEGATED_SMART_CONTRACT_DEPLOY_WITH_RATIO)](./caver.klay/sendtx_smart_contract_deploy.md#sendtransaction-fee_delegated_smart_contract_deploy_with_ratio)
- [sendTransaction (SMART_CONTRACT_EXECUTION)](./caver.klay/sendtx_smart_contract_execution.md#sendtransaction-smart_contract_execution)
- [sendTransaction (FEE_DELEGATED_SMART_CONTRACT_EXECUTION)](./caver.klay/sendtx_smart_contract_execution.md#sendtransaction-fee_delegated_smart_contract_execution)
- [sendTransaction (FEE_DELEGATED_SMART_CONTRACT_EXECUTION_WITH_RATIO)](./caver.klay/sendtx_smart_contract_execution.md#sendtransaction-fee_delegated_smart_contract_execution_with_ratio)
- [sendTransaction (CANCEL)](./caver.klay/sendtx_cancel.md#sendtransaction-cancel)
- [sendTransaction (FEE_DELEGATED_CANCEL)](./caver.klay/sendtx_cancel.md#sendtransaction-fee_delegated_cancel)
- [sendTransaction (FEE_DELEGATED_CANCEL_WITH_RATIO)](./caver.klay/sendtx_cancel.md#sendtransaction-fee_delegated_cancel_with_ratio)
- [signTransaction](./caver.klay/transaction.md#signtransaction)


## [환경설정](./caver.klay/config.md) <a id="configuration"></a>
- [gasPriceAt](./caver.klay/config.md#gaspriceat)
- [getChainId](./caver.klay/config.md#getchainid)
- [getGasPrice](./caver.klay/config.md#getgasprice)
- [getNodeInfo](./caver.klay/config.md#getnodeinfo)
- [getProtocolVersion](./caver.klay/config.md#getprotocolversion)
- [isSenderTxHashIndexingEnabled](./caver.klay/config.md#issendertxhashindexingenabled)
- [isParallelDBWrite](./caver.klay/config.md#isparalleldbwrite)
- [rewardbase](./caver.klay/config.md#rewardbase)


## [필터](./caver.klay/filter.md) <a id="filter"></a>
- [getFilterChanges](./caver.klay/filter.md#getfilterchanges)
- [getFilterLogs](./caver.klay/filter.md#getfilterlogs)
- [getPastLogs](./caver.klay/filter.md#getpastlogs)
- [newBlockFilter](./caver.klay/filter.md#newblockfilter)
- [newFilter](./caver.klay/filter.md#newfilter)
- [newPendingTransactionFilter](./caver.klay/filter.md#newpendingtransactionfilter)
- [uninstallFilter](./caver.klay/filter.md#uninstallfilter)

## [기타](./caver.klay/misc.md) <a id="miscellaneous"></a>
- [sha3](./caver.klay/misc.md#sha3)
