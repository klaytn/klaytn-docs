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

### [Account](./klay.md#caver-rpc-klay-accountcreated) <a id="account"></a>
- [accountCreated](./klay.md#accountcreated)
- [getAccount](./klay.md#getaccount)
- [getAccountKey](./klay.md#getaccountkey)
- [encodeAccountKey](./klay.md#encodeaccountkey)
- [decodeAccountKey](./klay.md#decodeaccountkey)
- [getBalance](./klay.md#getbalance)
- [getCode](./klay.md#getcode)
- [getTransactionCount](./klay.md#gettransactioncount)
- [isContractAccount](./klay.md#iscontractaccount)
- [sign](./klay.md#sign)
- [getAccounts](./klay.md#getaccounts)

### [Block](./klay.md#caver-rpc-klay-getblocknumber) <a id="block"></a>
- [getBlockNumber](./klay.md#getblocknumber)
- [getBlockByNumber](./klay.md#getblockbynumber)
- [getBlockByHash](./klay.md#getblockbyhash)
- [getBlockReceipts](./klay.md#getblockreceipts)
- [getBlockTransactionCountByNumber](./klay.md#getblocktransactioncountbynumber)
- [getBlockTransactionCountByHash](./klay.md#getblocktransactioncountbyhash)
- [getBlockWithConsensusInfoByNumber](./klay.md#getblockwithconsensusinfobynumber)
- [getBlockWithConsensusInfoByHash](./klay.md#getblockwithconsensusinfobyhash)
- [getCommittee](./klay.md#getcommittee)
- [getCommitteeSize](./klay.md#getcommitteesize)
- [getCouncil](./klay.md#getcouncil)
- [getCouncilSize](./klay.md#getcouncilsize)
- [getStorageAt](./klay.md#getstorageat)
- [isSyncing](./klay.md#issyncing)

### [Transaction](./klay.md#caver-rpc-klay-call) <a id="transaction"></a>
- [call](./klay.md#call)
- [estimateGas](./klay.md#estimategas)
- [estimateComputationCost](./klay.md#estimatecomputationcost)
- [getTransactionByBlockHashAndIndex](./klay.md#gettransactionbyblockhashandindex)
- [getTransactionByBlockNumberAndIndex](./klay.md#gettransactionbyblocknumberandindex)
- [getTransactionByHash](./klay.md#gettransactionbyhash)
- [getTransactionBySenderTxHash](./klay.md#gettransactionbysendertxhash)
- [getTransactionReceipt](./klay.md#gettransactionreceipt)
- [getTransactionReceiptBySenderTxHash](./klay.md#gettransactionreceiptbysendertxhash)
- [sendRawTransaction](./klay.md#sendrawtransaction)
- [sendTransaction](./caver.klay/sendtx_legacy.md#sendtransaction)
- [sendTransactionAsFeePayer](./caver.klay/sendtx_legacy.md#sendtransactionasfeepayer)
- [signTransaction](./klay.md#signtransaction)
- [signTransactionAsFeePayer](./klay.md#signtransactionasfeepayer)
- [getDecodedAnchoringTransactionByHash](./klay.md#getdecodedanchoringtransactionbyhash)

### [Configuration](./klay.md#caver-rpc-klay-getclientversion) <a id="configuration"></a>
- [getChainId](./klay.md#getchainid)
- [getClientVersion](./klay.md#getclientversion)
- [getGasPrice](./klay.md#getgasprice)
- [getGasPriceAt](./klay.md#getgaspriceat)
- [isParallelDBWrite](./klay.md#isparalleldbwrite)
- [isSenderTxHashIndexingEnabled](./klay.md#issendertxhashindexingenabled)
- [getProtocolVersion](./klay.md#getprotocolversion)
- [getRewardbase](./klay.md#getrewardbase)
- [isWriteThroughCaching](./klay.md#iswritethroughcaching)

### [Filter](./klay.md#caver-rpc-klay-getfilterchanges) <a id="filter"></a>
- [getFilterChanges](./klay.md#getfilterchanges)
- [getFilterLogs](./klay.md#getfilterlogs)
- [getLogs](./klay.md#getlogs)
- [newBlockFilter](./klay.md#newblockfilter)
- [newFilter](./klay.md#newfilter)
- [newPendingTransactionFilter](./klay.md#newpendingtransactionfilter)
- [uninstallFilter](./klay.md#uninstallfilter)

### [Network](./net.md) <a id="network"></a>
- [getNetworkId](./net.md#getnetworkid)
- [isListening](./net.md#islistening)
- [getPeerCount](./net.md#getpeercount)
- [getPeerCountByType](./net.md#getpeercountbytype)

### [Miscellaneous](./klay.md#caver-rpc-klay-sha3) <a id="miscellaneous"></a>
- [sha3](./klay.md#sha3)

[Klay]: ./klay.md
[net]: ./net.md