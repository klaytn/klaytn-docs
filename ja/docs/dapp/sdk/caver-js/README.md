# caver-js

`caver-js` は、開発者が HTTP または WebSocket 接続を使用して Klaytn ノードと対話できるようにする JavaScript API ライブラリです。 [npm](https://www.npmjs.com/package/caver-js) で利用できます。

## Features <a href="#features" id="features"></a>

* HTTPとWebsocketを介したKlaytnのJSON-RPCクライアントAPIの完全な実装
* Support of Klaytn transaction, account, and account key types
* Klaytn ネットワーク上でスマートコントラクトを展開して実行する JavaScript スマートコントラクトパッケージ
* Klaytnアカウントを管理するためのインメモリウォレット
* 手数料委任のサポート
* Klaytnウォレットキーフォーマットのサポート
* RLPにおけるトランザクションオブジェクトのエンコーディング/復号化
* トランザクションオブジェクトの署名
* caver-jsへのweb3-jsアプリケーションを簡単に移植します

## caver-js内のパッケージ <a href="#packages-in-caver-js" id="packages-in-caver-js"></a>

以下は `caver-js` で提供されているパッケージです。

* [caver.account](api-references/caver.account.md)
* [caver.wallet.keyring](api-references/caver.wallet/keyring.md)
* [caver.wallet](api-references/caver.wallet/)
* [caver.transaction](api-references/caver.transaction/)
* [caver.rpc](api-references/caver.rpc/)
* [caver.contract](api-references/caver.contract.md)
* [caver.abi](api-references/caver.abi.md)
* [caver.kct](api-references/caver.kct/)
* [caver.validator](api-references/caver.validator.md)
* [caver.utils](api-references/caver.utils.md)
* [caver.ipfs](api-references/caver.ipfs.md)

## エラーコードの改善 <a href="#error-code-improvement" id="error-code-improvement"></a>

Web3.js経由のEthereumからのエラーメッセージは、エラーが発生する場所をほとんど把握していません。 `caver-js` は Klaytn からのエラーメッセージをキャッチするためのインターフェイスを改善します。

詳細については、以下のように、トランザクション受領の `txError` の値を参照してください。

```
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

## トランザクションをKlaytnに送信する際の注意 <a href="#caution-when-sending-a-transaction-to-klaytn" id="caution-when-sending-a-transaction-to-klaytn"></a>

Klaytnは、 [KIP-71](https://kips.klaytn.foundation/KIPs/kip-71)を有効にしたマグマハードフォーク以来、新しいガス価格ポリシーを持っています。

したがって、ハードフォークが適用されるかどうかに応じて、トランザクションを送信する際に、 `gasPrice` ロジックを異なる方法で設定する必要があります。

マグマハードフォークまで、Klaytnでの取引には「固定ガス価格」が適用されていました。 したがって、ネットワークに送信された他の価格の取引は拒否されます。 If `gasPrice` is not defined when you sign or submit a transaction, caver-js uses [caver.rpc.klay.getGasPrice](api-references/caver.rpc/klay.md#caver-rpc-klay-getgasprice) RPC call to set the gas price.

マグマハードフォークの後、Klaytnは「動的ガス料金の価格設定メカニズム」を使用します。 取引のガス価格は、Klaytnネットワークの基本料金よりも高くする必要があります。 If `gasPrice` is not defined when you sign or submit a transaction, caver-js sets the `gasPrice` field of the transaction using `caver.rpc.klay.getGasPrice`.

### gasPriceフィールドを設定する方法

caver-jsは `gasPrice`を設定するためのさまざまな方法を提供します。 caver-jsを使用する場合の `gasPrice` フィールドの設定方法は以下のとおりです。 ここで説明する方法は、ハードフォークに関係なく使用できます。

#### `gasPrice` フィールドを定義しない

If you create an instance without defining the `gasPrice` field, the `gasPrice` field is automatically set when you call `tx.sign` or `tx.signAsFeePayer` to sign a transaction.

```
const tx = caver.transaction.valueTransfer.create({ from, to, value, gas })
await tx.sign(from, tx) // 署名する前に、 gasPrice is set inside `tx.sign` 。
```

#### `tx.fillTransaction` メソッドを使用する

`tx.fillTransaction`を使用することができます。これは、トランザクションのオプションフィールドを省略したときに適切な値で埋める関数です。

```
const tx = caver.transaction.valueTransfer.create({ from, to, value, gas })
await tx.fillTransaction() // Fill the optional tx fields. 
```

#### `tx.suggestGasPrice` メソッドを使用する

`gasPrice` は、推奨されるガス価格を返す `tx.suggestGasPrice` の結果で設定できます。

```
const tx = caver.transaction.valueTransfer.create({ from, to, value, gas })
tx.gasPrice = await tx.suggestGasPrice() 
```

For more information about the gas price, see [Gas and Unit Price Overview](../../../klaytn/design/transaction-fees/transaction-fees.md#gas-and-unit-price-overview) The price of gas used in the network can be obtained by using [caver.rpc.klay.getGasPrice](api-references/caver.rpc/klay.md#caver-rpc-klay-getgasprice).

## Links <a href="#links" id="links"></a>

* caver-js [GitHub repository](https://github.com/klaytn/caver-js)
* caver-js on [npm](https://www.npmjs.com/package/caver-js)
