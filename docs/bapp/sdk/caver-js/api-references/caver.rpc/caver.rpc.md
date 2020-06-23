# caver.rpc <a id="caver-rpc"></a>

`caver.rpc` is a package that provides functionality related to rpc call with Klaytn Node.

## Class <a id="class"></a>

### RPC <a id="rpc"></a>

```javascript
caver.rpc
```

`RPC` is a class that includes [Klay] and [Net] inside.

**properties**

| Name | Type | Description |
| --- | --- | --- |
| klay | [Klay] | The [Klay] providing JSON-RPC call with `klay` name space. |
| net | [Net] | The [Net] providing JSON-RPC call with `net` name space. |

## JSON-RPC calls <a id="json-rpc-calls"></a>

The `caver.rpc.klay` allows you to interact with the Klaytn nodes. The list below enumerates the API functions that are currently supported in `caver-js`.

### [Account](./caver.rpc.klay.md#caver-rpc-klay-accountcreated) <a id="account"></a>
- [accountCreated](./caver.rpc.klay.md#accountcreated)
- [getAccount](./caver.rpc.klay.md#getaccount)
- [getAccountKey](./caver.rpc.klay.md#getaccountkey)
- [encodeAccountKey](./caver.rpc.klay.md#encodeaccountkey)
- [decodeAccountKey](./caver.rpc.klay.md#decodeaccountkey)
- [getBalance](./caver.rpc.klay.md#getbalance)
- [getCode](./caver.rpc.klay.md#getcode)
- [getTransactionCount](./caver.rpc.klay.md#gettransactioncount)
- [isContractAccount](./caver.rpc.klay.md#iscontractaccount)
- [sign](./caver.rpc.klay.md#sign)
- [getAccounts](./caver.rpc.klay.md#getaccounts)

### [Block](./caver.rpc.klay.md#caver-rpc-klay-getblocknumber) <a id="block"></a>
- [getBlockNumber](./caver.rpc.klay.md#getblocknumber)
- [getBlockByNumber](./caver.rpc.klay.md#getblockbynumber)
- [getBlockByHash](./caver.rpc.klay.md#getblockbyhash)
- [getBlockReceipts](./caver.rpc.klay.md#getblockreceipts)
- [getBlockTransactionCountByNumber](./caver.rpc.klay.md#getblocktransactioncountbynumber)
- [getBlockTransactionCountByHash](./caver.rpc.klay.md#getblocktransactioncountbyhash)
- [getBlockWithConsensusInfoByNumber](./caver.rpc.klay.md#getblockwithconsensusinfobynumber)
- [getBlockWithConsensusInfoByHash](./caver.rpc.klay.md#getblockwithconsensusinfobyhash)
- [getCommittee](./caver.rpc.klay.md#getcommittee)
- [getCommitteeSize](./caver.rpc.klay.md#getcommitteesize)
- [getCouncil](./caver.rpc.klay.md#getcouncil)
- [getCouncilSize](./caver.rpc.klay.md#getcouncilsize)
- [getStorageAt](./caver.rpc.klay.md#getstorageat)
- [isSyncing](./caver.rpc.klay.md#issyncing)

### [Transaction](./caver.rpc.klay.md#caver-rpc-klay-call) <a id="transaction"></a>
- [call](./caver.rpc.klay.md#call)
- [estimateGas](./caver.rpc.klay.md#estimategas)
- [estimateComputationCost](./caver.rpc.klay.md#estimatecomputationcost)
- [getTransactionByBlockHashAndIndex](./caver.rpc.klay.md#gettransactionbyblockhashandindex)
- [getTransactionByBlockNumberAndIndex](./caver.rpc.klay.md#gettransactionbyblocknumberandindex)
- [getTransactionByHash](./caver.rpc.klay.md#gettransactionbyhash)
- [getTransactionBySenderTxHash](./caver.rpc.klay.md#gettransactionbysendertxhash)
- [getTransactionReceipt](./caver.rpc.klay.md#gettransactionreceipt)
- [getTransactionReceiptBySenderTxHash](./caver.rpc.klay.md#gettransactionreceiptbysendertxhash)
- [sendRawTransaction](./caver.rpc.klay.md#sendrawtransaction)
- [sendTransaction](./caver.klay/sendtx_legacy.md#sendtransaction)
- [sendTransactionAsFeePayer](./caver.klay/sendtx_legacy.md#sendtransactionasfeepayer)
- [signTransaction](./caver.rpc.klay.md#signtransaction)
- [signTransactionAsFeePayer](./caver.rpc.klay.md#signtransactionasfeepayer)
- [getDecodedAnchoringTransactionByHash](./caver.rpc.klay.md#getdecodedanchoringtransactionbyhash)

### [Configuration](./caver.rpc.klay.md#caver-rpc-klay-getclientversion) <a id="configuration"></a>
- [getChainId](./caver.rpc.klay.md#getchainid)
- [getClientVersion](./caver.rpc.klay.md#getclientversion)
- [getGasPrice](./caver.rpc.klay.md#getgasprice)
- [getGasPriceAt](./caver.rpc.klay.md#getgaspriceat)
- [isParallelDBWrite](./caver.rpc.klay.md#isparalleldbwrite)
- [isSenderTxHashIndexingEnabled](./caver.rpc.klay.md#issendertxhashindexingenabled)
- [getProtocolVersion](./caver.rpc.klay.md#getprotocolversion)
- [getRewardbase](./caver.rpc.klay.md#getrewardbase)
- [isWriteThroughCaching](./caver.rpc.klay.md#iswritethroughcaching)

### [Filter](./caver.rpc.klay.md#caver-rpc-klay-getfilterchanges) <a id="filter"></a>
- [getFilterChanges](./caver.rpc.klay.md#getfilterchanges)
- [getFilterLogs](./caver.rpc.klay.md#getfilterlogs)
- [getLogs](./caver.rpc.klay.md#getlogs)
- [newBlockFilter](./caver.rpc.klay.md#newblockfilter)
- [newFilter](./caver.rpc.klay.md#newfilter)
- [newPendingTransactionFilter](./caver.rpc.klay.md#newpendingtransactionfilter)
- [uninstallFilter](./caver.rpc.klay.md#uninstallfilter)

### [Network](./caver.rpc.net.md) <a id="network"></a>
- [getNetworkId](./caver.rpc.net.md#getnetworkid)
- [isListening](./caver.rpc.net.md#islistening)
- [getPeerCount](./caver.rpc.net.md#getpeercount)
- [getPeerCountByType](./caver.rpc.net.md#getpeercountbytype)

### [Miscellaneous](./caver.rpc.klay.md#caver-rpc-klay-sha3) <a id="miscellaneous"></a>
- [sha3](./caver.rpc.klay.md#sha3)

[Klay]: ./caver.rpc.klay.md
[net]: ./caver.rpc.net.md