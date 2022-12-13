# caver.rpc <a id="caver-rpc"></a>

`caver.rpc` は、Klaytn Node を使用した rpc 呼び出しに関連する機能を提供するパッケージです。

## クラス <a id="class"></a>

### RPC <a id="rpc"></a>

```javascript
caver.rpc
```

`RPC` は内部に [Klay][]、 [Net][] と [Governance][] を含むクラスです。

**プロパティー**

| 名前         | タイプ            | Description                                    |
| ---------- | -------------- | ---------------------------------------------- |
| klay       | [Klay][]       | [Klay][] は`klay` の名前空間を持つ JSON-RPC 呼び出しを提供します。 |
| ネット        | [Net][]        | [Net][] は `net` の名前空間を持つ JSON-RPC 呼び出しを提供します。  |
| governance | [Governance][] | [ガバナンス][] で JSON-RPC コールに `ガバナンス` の名前空間を提供します。 |

## JSON-RPC通話 <a id="json-rpc-calls"></a>

`caver.rpc.klay` では、Klaytn ノードと対話することができます。 以下のリストは、 `caver-js`で現在サポートされているAPI関数を列挙しています。

### [アカウント](./klay.md#caver-rpc-klay-accountcreated) <a id="account"></a>
- [アカウント作成](./klay.md#caver-rpc-klay-accountcreated)
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

### [ブロック](./klay.md#caver-rpc-klay-getblocknumber) <a id="block"></a>
- [getBlockNumber](./klay.md#caver-rpc-klay-getblocknumber)
- [getBlockByNumber](./klay.md#caver-rpc-klay-getblockbynumber)
- [getBlockByHash](./klay.md#caver-rpc-klay-getblockbyhash)
- [getBlockReceipts](./klay.md#caver-rpc-klay-getblockreceipts)
- [getBlockTransactionCountByNumber](./klay.md#caver-rpc-klay-getblocktransactioncountbynumber)
- [getBlockTransactionCountByHash](./klay.md#caver-rpc-klay-getblocktransactionCountbyhash)
- [getBlockWithConsensusInfoByNumber](./klay.md#caver-rpc-klay-getblockwithconsensusinfobynumber)
- [getBlockWithConsensusInfoByHash](./klay.md#caver-rpc-klay-getblockwithconsensusinfobyhash)
- [getCommitte](./klay.md#caver-rpc-klay-getcommittee)
- [getCommitteeSize](./klay.md#caver-rpc-klay-getcommitteesize)
- [getCouncil](./klay.md#caver-rpc-klay-getcouncil)
- [getCouncilSize](./klay.md#caver-rpc-klay-getcouncilsize)
- [getStorageAt](./klay.md#caver-rpc-klay-getstorageat)
- [isSyncing](./klay.md#caver-rpc-klay-issyncing)

### [トランザクション](./klay.md#caver-rpc-klay-call) <a id="transaction"></a>
- [通話](./klay.md#caver-rpc-klay-call)
- [推定ガス](./klay.md#caver-rpc-klay-estimategas)
- [見積もり計算コスト](./klay.md#caver-rpc-klay-estimatecomputationcost)
- [getTransactionByBlockHashAndIndex](./klay.md#caver-rpc-klay-gettransactionbyblockhashandindex)
- [getTransactionByBlockNumberAndIndex](./klay.md#caver-rpc-klay-gettransactionbyblocknumberandindex)
- [getTransactionByHash](./klay.md#caver-rpc-klay-gettransactionbyhash)
- [getTransactionBySenderTxHash](./klay.md#caver-rpc-klay-gettransactionbysendertxhash)
- [getTransactionReceipt](./klay.md#caver-rpc-klay-gettransactionreceipt)
- [getTransactionReceiptBySenderTxHash](./klay.md#caver-rpc-klay-gettransactionreceiptbysendertxhash)
- [sendRawTransaction](./klay.md#caver-rpc-klay-sendrawtransaction)
- [トランザクションを送信](./klay.md#caver-rpc-klay-sendtransaction)
- [sendTransactionAsFeePayer](./klay.md#caver-rpc-klay-sendtransactionasfeepayer)
- [signTransaction](./klay.md#caver-rpc-klay-signtransaction)
- [signTransactionAsFeePayer](./klay.md#caver-rpc-klay-signtransactionasfeepayer)
- [getDecodedAnchoringTransactionByHash](./klay.md#caver-rpc-klay-getdecodedanchoringtransactionbyhash)

### [構成](./klay.md#caver-rpc-klay-getclientversion) <a id="configuration"></a>
- [getChainId](./klay.md#caver-rpc-klay-getchainid)
- [getClientVersion](./klay.md#caver-rpc-klay-getclientversion)
- [getGasPrice](./klay.md#caver-rpc-klay-getgasprice)
- [getGasPriceAt](./klay.md#caver-rpc-klay-getgaspriceat)
- [isParallelDBWrite](./klay.md#caver-rpc-klay-isparalleldbwrite)
- [isSenderTxHashIndexingEnabled](./klay.md#caver-rpc-klay-issendertxhashindexingenabled)
- [getProtocolVersion](./klay.md#caver-rpc-klay-getprotocolversion)
- [getRewardbase](./klay.md#caver-rpc-klay-getrewardbase)

### [フィルター](./klay.md#caver-rpc-klay-getfilterchanges) <a id="filter"></a>
- [getFilterChanges](./klay.md#caver-rpc-klay-getfilterchanges)
- [getFilterLogs](./klay.md#caver-rpc-klay-getfilterlogs)
- [getLogs](./klay.md#caver-rpc-klay-getlogs)
- [newBlockFilter](./klay.md#caver-rpc-klay-newblockfilter)
- [newFilter](./klay.md#caver-rpc-klay-newfilter)
- [newPendingTransactionFilter](./klay.md#caver-rpc-klay-newpendingtransactionfilter)
- [アンインストールフィルタ](./klay.md#caver-rpc-klay-uninstallfilter)

### [ネットワーク](./net.md) <a id="network"></a>
- [getNetworkId](./net.md#caver-rpc-net-getnetworkid)
- [isListening](./net.md#caver-rpc-net-islistening)
- [getPeerCount](./net.md#caver-rpc-net-getpeercount)
- [getPeerCountByType](./net.md#caver-rpc-net-getpeercountbytype)

### [その他](./klay.md#caver-rpc-klay-sha3) <a id="miscellaneous"></a>
- [sha3](./klay.md#caver-rpc-klay-sha3)

[Klay]: ./klay.md
[Net]: ./net.md
[Governance]: ./governance.md
[ガバナンス]: ./governance.md
