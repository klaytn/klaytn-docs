# はじめに <a id="introduction"></a>

`caver-js` は、開発者が HTTP または WebSocket 接続を使用して Klaytn ノードと対話できるようにする JavaScript API ライブラリです。 [npm](https://www.npmjs.com/package/caver-js) で利用できます。

## 特徴 <a id="features"></a>

* HTTPとWebsocketを介したKlaytnのJSON-RPCクライアントAPIの完全な実装
* Klaytnトランザクション、アカウント、およびアカウントキーの種類のサポート
* Klaytn ネットワーク上でスマートコントラクトを展開して実行する JavaScript スマートコントラクトパッケージ
* Klaytnアカウントを管理するためのインメモリウォレット
* 手数料委任のサポート
* Klaytnウォレットキーフォーマットのサポート
* RLPにおけるトランザクションオブジェクトのエンコーディング/復号化
* トランザクションオブジェクトの署名
* caver-jsへのweb3-jsアプリケーションを簡単に移植します

## caver-js内のパッケージ <a id="packages-in-caver-js"></a>

以下は `caver-js` で提供されているパッケージです。

* [caver.klay](api-references/caver.klay.md)
* [caver.klay.accounts](api-references/caver.klay.accounts.md)
* [caver.klay.Contract](api-references/caver.klay.Contract.md)
* [caver.klay.net](api-references/caver.klay.net.md)
* [caver.klay.abi](api-references/caver.klay.abi.md)
* [caver.utils](api-references/caver.utils_1.4.1.md)

## エラーコードの改善 <a id="error-code-improvement"></a>

Web3.js経由のEthereumからのエラーメッセージは、エラーが発生する場所をほとんど把握していません。 `caver-js` は Klaytn からのエラーメッセージをキャッチするためのインターフェイスを改善します。

詳細については、以下のように、トランザクション受領の `txError` の値を参照してください。

```text
Error: runtime error occurred in interpreter
 {
  "blockHash": "0xe7ec35c9fff1178d52cee1d46d40627d19f828c4b06ad1a5c3807698b99acb20",
  "blockNumber": 7811,
  "contractAddress": null,
  "from": "0xa8a2d37727197cc0eb827f8c5a3a3aceb26cf59e",
  "gasUsed": 9900000000,
  "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  "status": false,
  "to": "0xf8425b0f65147969621f9390ca06139c7b439497",
  "transactionHash": "0x85ce2b307899c90144442d9b3236827ac57375c522be2435093aebfd920b8c58",
  "transactionIndex": 0,
  "txError": "0x2",
  "events": {}
}
```

## トランザクションをKlaytnに送信する際の注意 <a id="caution-when-sending-a-transaction-to-klaytn"></a>

Klaytnは固定ガス価格\(25 ston = 25 \* 10^9\)を使用します。 Klaytnネットワークに提出された異なる価格の取引は拒否されます。 For more information about the gas price, see [Gas and Unit Price Overview](../../../../klaytn/design/transaction-fees/transaction-fees.md#gas-and-unit-price-overview) The price of gas used in the network can be obtained by using [caver.klay.getGasPrice](api-references/caver.klay/config.md#getgasprice).

If `gasPrice` is not defined when you sign or submit a transaction, caver-js uses the [caver.klay.getGasPrice](api-references/caver.klay/config.md#getgasprice) RPC call to set the gas price of the transaction.

## リンク <a id="links"></a>

* caver-js [GitHub repository](https://github.com/klaytn/caver-js)
* caver-js on [npm](https://www.npmjs.com/package/caver-js)


