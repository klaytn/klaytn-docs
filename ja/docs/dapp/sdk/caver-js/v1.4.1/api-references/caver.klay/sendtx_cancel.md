# 取引をキャンセル <a id="cancel-transaction"></a>

## sendTransaction (CANCEL) <a id="sendtransaction-cancel"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
[キャンセル](../../../../../../klaytn/design/transactions/basic.md#txtypecancel) トランザクションをネットワークに送信します。

**パラメータ**

sendTransaction のパラメータはトランザクションオブジェクトとコールバック関数です。

| 名前                | タイプ    | Description                                                        |
| ----------------- | ------ | ------------------------------------------------------------------ |
| transactionObject | Object | 送信するトランザクションオブジェクト。                                                |
| callback          | 関数     | (オプション) オプションのコールバックは、最初のパラメータとしてエラーオブジェクトを返し、結果は2番目のパラメータとして返します。 |

タイプ `CANCEL` のトランザクションオブジェクトには以下の構造があります。

| 名前       | タイプ    | Description                                                                                                                       |
| -------- | ------ | --------------------------------------------------------------------------------------------------------------------------------- |
| タイプ      | 文字列    | トランザクションの種類 "CANCEL"                                                                                                              |
| from     | 文字列    | このトランザクション送信者のアドレス。                                                                                                               |
| ガス       | Number | 取引に支払うガスの最大額(使用されていないガスは返金されます)。                                                                                                  |
| gasPrice | Number | (オプション) ペブで送信者が提供するガス価格。 gasPriceは、Klaytnノードで設定されているunitPriceと同じである必要があります。                                                       |
| nonce    | Number | (オプション) nonce の整数。 これにより、同じノンスの保留中のトランザクションを置き換えることができます。 省略された場合、 `caver.klay.getTransactionCount` を呼び出すことで caver-js によって設定されます。 |

**戻り値**

`コールバック` は 32 バイトのトランザクションハッシュを返します。

`PromiEvent`: A promise combined event emitter. 領収書が入手可能な場合には解決されます。 さらに、次のイベントが利用できます:

- `"transactionHash"` returns `String`: トランザクションが送信され、トランザクションハッシュが利用可能になった直後に発行される。
- `"receipt"` は `オブジェクト`: トランザクション受信が可能であるときに発生します。
- `"error"` returns `Error`: 送信中にエラーが発生した場合に発生します。 ガス欠エラーでは、2 番目のパラメータはレシートです。

**例**

```javascript
const account = caver.klay.accounts.wallet.add('0x{private key}')

// using the promise
caver.klay.sendTransaction({
    type: 'CANCEL',
    from: account.address,
    nonce: 7, // It specifies target transaction having the same nonce to cancel.
    gas: '30000',
})
.then(function(receipt){
...
});

// using the event emitter
caver.klay.sendTransaction({
    type: 'CANCEL',
    from: account.address,
    nonce: 7, // It specifies target transaction having the same nonce to cancel.
    gas: '30000',
})
.on('transactionHash', function(hash){
...
})
.on('receipt', function(receipt){
...
})
.on('error', console.error); // ガス漏れの場合、2番目のパラメータはレシートです。
```


## sendTransaction (FEE_DELEGATED_CANCEL) <a id="sendtransaction-fee_delegated_cancel"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
ネットワークに [手数料委任キャンセル](../../../../../../klaytn/design/transactions/fee-delegation.md#txtypefeedelegatedcancel) トランザクションを送信します。

**パラメータ**

sendTransaction のパラメータはトランザクションオブジェクトとコールバック関数です。

| 名前                | タイプ    | Description                                                        |
| ----------------- | ------ | ------------------------------------------------------------------ |
| transactionObject | Object | 送信するトランザクションオブジェクト。                                                |
| callback          | 関数     | (オプション) オプションのコールバックは、最初のパラメータとしてエラーオブジェクトを返し、結果は2番目のパラメータとして返します。 |

型 `FEE_DELEGATED_CANCEL` のトランザクションオブジェクトは以下の構造を持ちます:

| 名前       | タイプ    | Description                                                                                                                       |
| -------- | ------ | --------------------------------------------------------------------------------------------------------------------------------- |
| タイプ      | 文字列    | トランザクションの種類 "FEE_DELEGATED_CANCEL"                                                                                              |
| from     | 文字列    | このトランザクション送信者のアドレス。                                                                                                               |
| ガス       | Number | 取引に支払うガスの最大額(使用されていないガスは返金されます)。                                                                                                  |
| gasPrice | Number | (オプション) ペブで送信者が提供するガス価格。 gasPriceは、Klaytnノードで設定されているunitPriceと同じである必要があります。                                                       |
| nonce    | Number | (オプション) nonce の整数。 これにより、同じノンスの保留中のトランザクションを置き換えることができます。 省略された場合、 `caver.klay.getTransactionCount` を呼び出すことで caver-js によって設定されます。 |

A transaction object of type `FEE_DELEGATED_CANCEL` with the above structure or an `RLP-encoded transaction` of type `FEE_DELEGATED_CANCEL` can be used as a parameters in [caver.klay.accounts.signTransaction](../caver.klay.accounts.md#signtransaction) for sender and in [caver.klay.accounts.feePayerSignTransaction](../caver.klay.accounts.md#feepayersigntransaction) for fee payer.

In order for the fee payer to sign an RLP encoded transaction signed by the sender and send it to the network, define an object with the following structure and call `caver.klay.sendTransaction`.

| 名前                   | タイプ | Description                        |
| -------------------- | --- | ---------------------------------- |
| feePayer             | 文字列 | このトランザクションの手数料支払者アドレス。             |
| senderRawTransaction | 文字列 | 送信者によって署名された RLP エンコードされたトランザクション。 |

**戻り値**

`コールバック` は 32 バイトのトランザクションハッシュを返します。

`PromiEvent`: A promise combined event emitter. 領収書が入手可能な場合には解決されます。 さらに、次のイベントが利用できます:

- `"transactionHash"` returns `String`: トランザクションが送信され、トランザクションハッシュが利用可能になった直後に発行される。
- `"receipt"` は `オブジェクト`: トランザクション受信が可能であるときに発生します。
- `"error"` returns `Error`: 送信中にエラーが発生した場合に発生します。 ガス欠エラーでは、2 番目のパラメータはレシートです。

**例**

```javascript
const sender = caver.klay.accounts.wallet.add('0x{private key}')
const feePayer = caver.klay.accounts.wallet.add('0x{private key}')

// using the promise
const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
  type: 'FEE_DELEGATED_CANCEL',
  from: sender.address,
  nonce: 7, // It specifies target transaction having the same nonce to cancel.
  gas: '30000',
}, sender.privateKey)

caver.klay.sendTransaction({
  senderRawTransaction: senderRawTransaction,
  feePayer: feePayer.address,
})
.then(function(receipt){
...
});

// using the event emitter
const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
  type: 'FEE_DELEGATED_CANCEL',
  from: sender.address,
  nonce: 7, // It specifies target transaction having the same nonce to cancel.
  gas: '30000',
}, sender.privateKey)

caver.klay.sendTransaction({
  senderRawTransaction: senderRawTransaction,
  feePayer: feePayer.address,
})
.on('transactionHash', function(hash){
...
})
.on('receipt', function(receipt){
...
})
.on('error', console.error); // ガス漏れの場合、2番目のパラメータはレシートです。
```


## sendTransaction (FEE_DELEGATED_CANCEL_WITH_RATIO) <a id="sendtransaction-fee_delegated_cancel_with_ratio"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
ネットワークに [手数料委任されたキャンセルを](../../../../../../klaytn/design/transactions/partial-fee-delegation.md#txtypefeedelegatedcancelwithratio) 割合で送信します。

**パラメータ**

sendTransaction のパラメータはトランザクションオブジェクトとコールバック関数です。

| 名前                | タイプ    | Description                                                        |
| ----------------- | ------ | ------------------------------------------------------------------ |
| transactionObject | Object | 送信するトランザクションオブジェクト。                                                |
| callback          | 関数     | (オプション) オプションのコールバックは、最初のパラメータとしてエラーオブジェクトを返し、結果は2番目のパラメータとして返します。 |

型 `FEE_DELEGATED_CANCEL_WITH_RATIO のトランザクションオブジェクト` には以下の構造があります:

| 名前       | タイプ    | Description                                                                                                                       |
| -------- | ------ | --------------------------------------------------------------------------------------------------------------------------------- |
| タイプ      | 文字列    | トランザクションの種類 "FEE_DELEGATED_CANCEL_WITH_RATIO"                                                                                 |
| from     | 文字列    | このトランザクション送信者のアドレス。                                                                                                               |
| ガス       | Number | 取引に支払うガスの最大額(使用されていないガスは返金されます)。                                                                                                  |
| gasPrice | Number | (オプション) ペブで送信者が提供するガス価格。 gasPriceは、Klaytnノードで設定されているunitPriceと同じである必要があります。                                                       |
| nonce    | Number | (オプション) nonce の整数。 これにより、同じノンスの保留中のトランザクションを置き換えることができます。 省略された場合、 `caver.klay.getTransactionCount` を呼び出すことで caver-js によって設定されます。 |
| 手数料比     | Number | 手数料支払者の手数料比率。 30%の場合は、手数料の30%が手数料支払者によって支払われます。 70%は送信者が支払います。 手数料比率の範囲は1~99ですが、範囲外の場合は取引は受け付けられません。                              |

A transaction object of type `FEE_DELEGATED_CANCEL_WITH_RATIO` with the above structure or an `RLP-encoded transaction` of type `FEE_DELEGATED_CANCEL_WITH_RATIO` can be used as a parameter in [caver.klay.accounts.signTransaction](../caver.klay.accounts.md#signtransaction) for sender and in [caver.klay.accounts.feePayerSignTransaction](../caver.klay.accounts.md#feepayersigntransaction) for fee payer.

In order for the fee payer to sign an RLP encoded transaction signed by the sender and send it to the network, define an object with the following structure and call `caver.klay.sendTransaction`.

| 名前                   | タイプ | Description                        |
| -------------------- | --- | ---------------------------------- |
| feePayer             | 文字列 | このトランザクションの手数料支払者アドレス。             |
| senderRawTransaction | 文字列 | 送信者によって署名された RLP エンコードされたトランザクション。 |

**戻り値**

`コールバック` は 32 バイトのトランザクションハッシュを返します。

`PromiEvent`: A promise combined event emitter. 領収書が入手可能な場合には解決されます。 さらに、次のイベントが利用できます:

- `"transactionHash"` returns `String`: トランザクションが送信され、トランザクションハッシュが利用可能になった直後に発行される。
- `"receipt"` は `オブジェクト`: トランザクション受信が可能であるときに発生します。
- `"error"` returns `Error`: 送信中にエラーが発生した場合に発生します。 ガス欠エラーでは、2 番目のパラメータはレシートです。

**例**

```javascript
const sender = caver.klay.accounts.wallet.add('0x{private key}')
const feePayer = caver.klay.accounts.wallet.add('0x{private key}')

// using the promise
const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
  type: 'FEE_DELEGATED_CANCEL_WITH_RATIO',
  from: sender.address,
  nonce: 7, // It specifies target transaction having the same nonce to cancel.
  gas: '30000',
  feeRatio: 30,
}, sender.privateKey)

caver.klay.sendTransaction({
  senderRawTransaction: senderRawTransaction,
  feePayer: feePayer.address,
})
.then(function(receipt){
...
});

// using the event emitter
const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
  type: 'FEE_DELEGATED_CANCEL_WITH_RATIO',
  from: sender.address,
  nonce: 7, // It specifies target transaction having the same nonce to cancel.
  gas: '30000',
  feeRatio: 30,
}, sender.privateKey)

caver.klay.sendTransaction({
  senderRawTransaction: senderRawTransaction,
  feePayer: feePayer.address,
})
.on('transactionHash', function(hash){
...
})
.on('receipt', function(receipt){
...
})
.on('error', console.error); // ガス漏れの場合、2番目のパラメータはレシートです。
```


