# caver.rpc

caver.rpc`는 클레이튼 노드와의 rpc 호출과 관련된 기능을 제공하는 패키지입니다.

## 클래스 <a id="class"></a>

### RPC <a id="rpc"></a>

```javascript
caver.rpc
```

`RPC`는 내부에 [Klay], [Net], [Governance]가 포함된 클래스입니다.

**속성**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| klay| [Klay] | [Klay]가 '클레이' 네임스페이스로 JSON-RPC 호출을 제공합니다. |
| net | [Net] | `net` 이름 공간으로 JSON-RPC 호출을 제공하는 [Net] 입니다. |
| governance | [Governance] | `governance` 이름 공간으로 JSON-RPC 호출을 제공하는 [Governance] 입니다. |

## JSON-RPC 호출 <a id="json-rpc-calls"></a>

`caver.rpc.klay`를 사용하면 클레이튼 노드와 상호작용할 수 있습니다. 아래 목록은 현재 `caver-js`에서 지원되는 API 함수를 열거한 것입니다.

### [Account](./klay.md#caver-rpc-klay-accountcreated) <a id="account"></a>

- [accountCreated](./klay.md#caver-rpc-klay-accountcreated)
- [getAccount](./klay.md#caver-rpc-klay-getaccount)
- [getAccountKey](./klay.md#caver-rpc-klay-getaccountkey)
- [encodeAccountKey](./klay.md#caver-rpc-klay-encodeaccountkey)
- [decodeAccountKey](./klay.md#caver-rpc-klay-decodeaccountkey)
- [getBalance](./klay.md#caver-rpc-klay-getbalance)
- [getCode](./klay.md#caver-rpc-klay-getcode)
- [getTransactionCount](./klay.md#caver-rpc-klay-gettransactioncount)
- [isContractAccount](./klay.md#caver-rpc-klay-iscontractaccount)
- [sign](./klay.md#caver-rpc-klay-sign)
- [getAccounts](./klay.md#caver-rpc-klay-getaccounts)

### [Block](./klay.md#caver-rpc-klay-getblocknumber) <a id="block"></a>
- [getBlockNumber](./klay.md#caver-rpc-klay-getblocknumber)
- [getBlockByNumber](./klay.md#caver-rpc-klay-getblockbynumber)
- [getBlockByHash](./klay.md#caver-rpc-klay-getblockbyhash)
- [getBlockReceipts](./klay.md#caver-rpc-klay-getblockreceipts)
- [getBlockTransactionCountByNumber](./klay.md#caver-rpc-klay-getblocktransactioncountbynumber)
- [getBlockTransactionCountByHash](./klay.md#caver-rpc-klay-getblocktransactionCountbyhash)
- [getBlockWithConsensusInfoByNumber](./klay.md#caver-rpc-klay-getblockwithconsensusinfobynumber)
- [getBlockWithConsensusInfoByHash](./klay.md#caver-rpc-klay-getblockwithconsensusinfobyhash)
- [getCommittee](./klay.md#caver-rpc-klay-getcommittee)
- [getCommitteeSize](./klay.md#caver-rpc-klay-getcommitteesize)
- [getCouncil](./klay.md#caver-rpc-klay-getcouncil)
- [getCouncilSize](./klay.md#caver-rpc-klay-getcouncilsize)
- [getStorageAt](./klay.md#caver-rpc-klay-getstorageat)
- [isSyncing](./klay.md#caver-rpc-klay-issyncing)

### [Transaction](./klay.md#caver-rpc-klay-call) <a id="transaction"></a>
- [call](./klay.md#caver-rpc-klay-call)
- [estimateGas](./klay.md#caver-rpc-klay-estimategas)
- [estimateComputationCost](./klay.md#caver-rpc-klay-estimatecomputationcost)
- [getTransactionByBlockHashAndIndex](./klay.md#caver-rpc-klay-gettransactionbyblockhashandindex)
- [getTransactionByBlockNumberAndIndex](./klay.md#caver-rpc-klay-gettransactionbyblocknumberandindex)
- [getTransactionByHash](./klay.md#caver-rpc-klay-gettransactionbyhash)
- [getTransactionBySenderTxHash](./klay.md#caver-rpc-klay-gettransactionbysendertxhash)
- [getTransactionReceipt](./klay.md#caver-rpc-klay-gettransactionreceipt)
- [getTransactionReceiptBySenderTxHash](./klay.md#caver-rpc-klay-gettransactionreceiptbysendertxhash)
- [sendRawTransaction](./klay.md#caver-rpc-klay-sendrawtransaction)
- [sendTransaction](./klay.md#caver-rpc-klay-sendtransaction)
- [sendTransactionAsFeePayer](./klay.md#caver-rpc-klay-sendtransactionasfeepayer)
- [signTransaction](./klay.md#caver-rpc-klay-signtransaction)
- [signTransactionAsFeePayer](./klay.md#caver-rpc-klay-signtransactionasfeepayer)
- [getDecodedAnchoringTransactionByHash](./klay.md#caver-rpc-klay-getdecodedanchoringtransactionbyhash)

### [Configuration](./klay.md#caver-rpc-klay-getclientversion) <a id="configuration"></a>
- [getChainId](./klay.md#caver-rpc-klay-getchainid)
- [getClientVersion](./klay.md#caver-rpc-klay-getclientversion)
- [getGasPrice](./klay.md#caver-rpc-klay-getgasprice)
- [getGasPriceAt](./klay.md#caver-rpc-klay-getgaspriceat)
- [isParallelDBWrite](./klay.md#caver-rpc-klay-isparalleldbwrite)
- [isSenderTxHashIndexingEnabled](./klay.md#caver-rpc-klay-issendertxhashindexingenabled)
- [getProtocolVersion](./klay.md#caver-rpc-klay-getprotocolversion)
- [getRewardbase](./klay.md#caver-rpc-klay-getrewardbase)

### [Filter](./klay.md#caver-rpc-klay-getfilterchanges) <a id="filter"></a>
- [getFilterChanges](./klay.md#caver-rpc-klay-getfilterchanges)
- [getFilterLogs](./klay.md#caver-rpc-klay-getfilterlogs)
- [getLogs](./klay.md#caver-rpc-klay-getlogs)
- [newBlockFilter](./klay.md#caver-rpc-klay-newblockfilter)
- [newFilter](./klay.md#caver-rpc-klay-newfilter)
- [newPendingTransactionFilter](./klay.md#caver-rpc-klay-newpendingtransactionfilter)
- [uninstallFilter](./klay.md#caver-rpc-klay-uninstallfilter)

### [Network](./net.md) <a id="network"></a>
- [getNetworkId](./net.md#caver-rpc-net-getnetworkid)
- [isListening](./net.md#caver-rpc-net-islistening)
- [getPeerCount](./net.md#caver-rpc-net-getpeercount)
- [getPeerCountByType](./net.md#caver-rpc-net-getpeercountbytype)

### [기타](./klay.md#caver-rpc-klay-sha3) <a id="miscellaneous"></a>
- [sha3](./klay.md#caver-rpc-klay-sha3)

[Klay]: klay.md
[Net]: net.md
[Governance]:governance.md