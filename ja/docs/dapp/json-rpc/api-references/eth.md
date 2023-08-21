---
description: >-
  eth 名前空間API
---

# ネームスペース eth <a id="namespace-eth"></a>

名前空間 `の` は、アカウント、ブロック、トランザクション、 ネットワークまたはノードの構成、フィルタなどに関連する関数を提供します。

Klaytnは `EthereumのJSON-RPC API` の名前空間 [](https://eth.wiki/json-rpc/API) をサポートします。 EthereumのAPIレスポンスボディに合わせていくつかのリターン値が調整されていることに注意してください。

And due to the fundamental design differences between Klaytn and Ethereum, Klaytn's data structure (Transaction, Block, and TransactionReceipt) cannot be fully supported via `eth` namespace APIs.

このドキュメントの [エテリアム](#differences_overview_from_ethereum) の違い概要を確認してください。

**注**: `eth` 名前空間 API は Klaytn v1.8.0 でサポートされています。

以下のリストは、API 関数を列挙しています。 `eth` 名前空間 API はすべて、Klaytn でサポートされています。

### [アカウント](./eth/account.md) <a id="account"></a>
- [eth_accounts](./eth/account.md#eth_accounts)
- [eth_getBalance](./eth/account.md#eth_getbalance)
- [eth_getCode](./eth/account.md#eth_getcode)
- [eth_getTransactionCount](./eth/account.md#eth_gettransactioncount)
- [eth_sign](./eth/account.md#eth_sign)

### [ブロック](./eth/block.md) <a id="block"></a>
- [eth_blockNumber](./eth/block.md#eth_blocknumber)
- [eth_getHeaderByNumber](./eth/block.md#eth_getheaderbynumber)
- [eth_getHeaderByHash](./eth/block.md#eth_getheaderbyhash)
- [eth_getBlockByNumber](./eth/block.md#eth_getblockbynumber)
- [eth_getBlockByHash](./eth/block.md#eth_getblockbyhash)
- [eth_getUncleByBlockHashAndIndex](./eth/block.md#eth_getunclebyblockhashandindex)
- [eth_getUncleByBlockNumberAndIndex](./eth/block.md#eth_getunclebyblocknumberandindex)
- [eth_getBlockTransactionCountByNumber](./eth/block.md#eth_getblocktransactioncountbynumber)
- [eth_getBlockTransactionCountByHash](./eth/block.md#eth_getblocktransactioncountbyhash)
- [eth_getUncleCountByBlockNumber](./eth/block.md#eth_getunclecountbyblocknumber)
- [eth_getUncleCountByBlockHash](./eth/block.md#eth_getunclecountbyblockhash)
- [eth_getStorageAt](./eth/block.md#eth_getstorageat)
- [eth_mining](./eth/block.md#eth_mining)
- [eth_syncing](./eth/block.md#eth_syncing)


### [トランザクション](./eth/transaction.md) <a id="transaction"></a>
- [eth_call](./eth/transaction.md#eth_call)
- [eth_estimateGas](./eth/transaction.md#eth_estimategas)
- [eth_getTransactionByBlockHashAndIndex](./eth/transaction.md#eth_gettransactionbyblockhashandindex)
- [eth_getTransactionByBlockNumberAndIndex](./eth/transaction.md#eth_gettransactionbyblocknumberandindex)
- [eth_getTransactionByHash](./eth/transaction.md#eth_gettransactionbyhash)
- [eth_getTransactionReceipt](./eth/transaction.md#eth_gettransactionreceipt)
- [eth_sendRawTransaction](./eth/transaction.md#eth_sendrawtransaction)
- [eth_sendTransaction](./eth/transaction.md#eth_sendtransaction)
- [eth_signTransaction](./eth/transaction.md#eth_signtransaction)
- [eth_fillTransaction](./eth/transaction.md#eth_filltransaction)
- [eth_pendingTransaction](./eth/transaction.md#eth_pendingtransactions)
- [eth_resend](./eth/transaction.md#eth_resend)

### [構成](./eth/config.md) <a id="configuration"></a>
- [eth_coinbase](./eth/config.md#eth_coinbase)
- [eth_etherbase](./eth/config.md#eth_etherbase)
- [eth_chainId](./eth/config.md#eth_chainid)
- [eth_gasPrice](./eth/config.md#eth_gasprice)


### [フィルター](./eth/filter.md) <a id="filter"></a>
- [eth_getFilterChanges](./eth/filter.md#eth_getfilterchanges)
- [eth_getFilterLogs](./eth/filter.md#eth_getfilterlogs)
- [eth_getLogs](./eth/filter.md#eth_getlogs)
- [eth_newBlockFilter](./eth/filter.md#eth_newblockfilter)
- [eth_newFilter](./eth/filter.md#eth_newfilter)
- [eth_newPendingTransactionFilter](./eth/filter.md#eth_newpendingtransactionfilter)
- [eth_subscribe](./eth/filter.md#eth_subscribe)
- [eth_uninstallFilter](./eth/filter.md#eth_uninstallfilter)
- [eth_unsubscribe](./eth/filter.md#eth_unsubscribe)


### [ガス](./eth/gas.md) <a id="gas"></a>
- [eth_feeHistory](./eth/gas.md#eth_feehistory)
- [eth_maxPriorityFeePerGas](./eth/gas.md#eth_maxpriorityfeepergas)

### [その他](./eth/misc.md) <a id="miscellaneous"></a>
- [ハッシュレート](./eth/misc.md#eth_hashrate)
- [eth_getWork](./eth/misc.md#eth_getwork)
- [eth_submitWork](./eth/misc.md#eth_submitwork)
- [eth_submitHashrate](./eth/misc.md#eth_submithashrate)

## Ethereumとの違いの概要 <a id="differences_overview_from_ethereum">

> ethの名前空間 API をより詳細に提供する場合、Klaytn と Ethereumの違いを記述した [Caution](./eth/caution.md) セクションを参照してください。

### ブロック <a id="block"></a>

Related APIs: [eth_getHeaderByNumber](./eth/block/#eth_getHeaderByNumber), [eth_getHeaderByHash](./eth/block/#eth_getHeaderByHash), [eth_getBlockByHash](./eth/block/#eth_getBlockByHash), [eth_getBlockByNumber](./eth/block/#eth_getBlockByNumber), [eth_getUncleByBlockHashAndIndex](./eth/block/#eth_getUncleByBlockHashAndIndex), [eth_getUncleByBlockNumberAndIndex](./eth/block/#eth_getUncleByBlockNumberAndIndex).

| フィールド           | Description                                                                                                                                                                                                                                                                                        |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| baseFeePerGas   | Klaytn には baseFeePerGas スキームがないため、このフィールドは常に `0x0` の値を持ちます。                                                                                                                                                                                                                                        |
| 難易度：            | このフィールドは、 `0x1` に固定されている Klaytn ヘッダーの `blockScore` に対応します。 これは、KlaytnのコンセンサスメカニズムがPoWに基づいていないため、ブロック難易度の技術的概念がKlaytnコアには適用できないことを示しています。                                                                                                                                                           |
| extraData       | このフィールドは、常に空の値を示す `0x` の値を持ちます。 Owing to the fact that Klaytn's `extraData` contains consensus data such as validators addresses, validators signatures, and proposer signature, it is not applicable to `eth` namespace API.                                                                      |
| gasLimit        | このフィールドは常に値 `0xe8d4a50fff`(10進数では`999999999999` ) を持ちます。これは、Klaytn には GasLimit がないため任意の数値です。 執筆時点では、この数字はEthereumの [ブロックガス制限の30倍です](https://ethereum.org/en/developers/docs/gas/#block-size)。 詳細については、 [計算コスト](../../../klaytn/design/computation/computation-cost/computation-cost.md) を参照してください。 |
| miner           | このフィールドはブロック提案者のアドレスを返します。 なぜなら、Klaytnの [コンセンサス機構](../../../klaytn/design/consensus-mechanism.md) は鉱夫の代わりにブロック提案者を持つ [PBFT](../../../klaytn/design/consensus-mechanism.md#pbft-practical-byzantine-fault-tolerance)であるからである。                                                                       |
| mixHash         | このフィールドは常に zeroHash (`0x00...`) を持ちます。なぜなら、Klaytn のコンセンサスメカニズムは PoW に基づいていないからです。                                                                                                                                                                                                                  |
| nonce           | このフィールドは常に zeroNonce (`0x00...`) を持ちます。なぜなら、Klaytn のコンセンサスメカニズムは PoW に基づいていないからです。                                                                                                                                                                                                                 |
| sha3Uncles      | このフィールドは常に `0x1dccc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347`を持っています。 これは空のブロックヘッダを含むリストのRLPエンコードバイトのKecchak256ハッシュで、Klaytnには叔父ブロックがないためです。                                                                                                                                     |
| totalDifficulty | クエリブロックまでのチェーンの全難易度。                                                                                                                                                                                                                                                                               |
| おじさんたち          | このフィールドは常に値 `[]` を持ちます。なぜなら、Klaytn コアには uncumes ブロックの技術的な概念がないからです。                                                                                                                                                                                                                                |

ここでカバーされていないフィールドは、Ethereumのブロックフィールドに固執します。

### 取引 <a id="transaction"></a>

関連API: [eth_getTransactionByHash](./eth/transaction/#eth_getTransactionByHash), [eth_getTransactionByBlockHashAndIndex](./eth/transaction/#eth_getTransactionByBlockHashAndIndex), [eth_getTransactionByBlockNumberAndIndex](./eth/transaction/#eth_getTransactionByBlockNumberAndIndex), [eth_pendingTransactions](./eth/transaction/#eth_pendingTransactions).

> KlaytnとEthereumの基本的な設計上の違いにより、 Klaytnトランザクションは `eth` 名前空間APIを介して完全にサポートすることはできません。

| Field    | Description                                                                                                                                                                                            |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| gasPrice | Klaytnのコンテキストでは [単価](../../../klaytn/design/transaction-fees/transaction-fees.md#unit-price) とも呼ばれ、この値はガバナンスプロセスを通じてシステム内で決定されます。                                                                      |
| タイプ      | In Klaytn, `type` returns the transaction type in string (e.g. `"LegacyTransaction"`), but it has been converted to hexadecimal (e.g. `0x0`) to match Ethereum. Klaytnでのみ有効なトランザクションタイプは常に `0x0`を返します。 |

KlaytnはMultiSigをサポートしているため、Klaytnトランザクションは複数の署名を持つことができます(Etherumトランザクションは1つの署名フィールドのみを持っています(= v)。 R, S)) プロトコルレベルでも. In that context, fields related to signature (v, r, s) will match `tx.signatures[0].V`, `tx.signatures[0].R`, and `tx.signatures[0].S`.

ここでカバーされていないフィールドはEthereumのトランザクションフィールドに固執します。

### char@@0char@@1char@@2 <a id="transaction_receipt"></a>

関連API: [eth_getTransactionReceipt](./eth/transaction/#eth_getTransactionReceipt).

> KlaytnとEthereumの間に存在する基本的な設計上の違いにより、 Ethereum名前空間APIを介して提供される場合、Klaytnトランザクションレシートは完全にサポートされません。

| Field             | Description                                                                                                                                                               |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| effectiveGasPrice | Klaytnは固定のガス価格ポリシーを使用しているため、gasPrice値が返されます。 gasPrice( [Unit Price](../../../klaytn/design/transaction-fees/transaction-fees.md#unit-price)とも呼ばれます)はガバナンスによってシステムに設定されます。 |
| transactionIndex  | Ethereumとほぼ同じですが、Ethereumとは異なり、Klaytnは保留中のときと同じように整数を返します。                                                                                                                |

ここでカバーされていないフィールドは、Ethereumの推奨フィールドである transaction_receipt に固執します。
