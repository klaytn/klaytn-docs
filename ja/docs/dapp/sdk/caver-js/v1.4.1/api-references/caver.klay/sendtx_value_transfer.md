# Value Transfer Transaction <a id="value-transfer-transaction"></a>

## sendTransaction (VALUE_TRANSFER) <a id="sendtransaction-value_transfer"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
Sends a [Value Transfer](../../../../../../klaytn/design/transactions/basic.md#txtypevaluetransfer) transaction to the network.

**パラメータ**

sendTransaction のパラメータはトランザクションオブジェクトとコールバック関数です。

| 名前                | タイプ    | Description                                                        |
| ----------------- | ------ | ------------------------------------------------------------------ |
| transactionObject | Object | 送信するトランザクションオブジェクト。                                                |
| callback          | 関数     | (オプション) オプションのコールバックは、最初のパラメータとしてエラーオブジェクトを返し、結果は2番目のパラメータとして返します。 |

A transaction object of type `VALUE_TRANSFER` has the following structure:

| 名前       | タイプ                                             | Description                                                                                |
| -------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------ |
| タイプ      | 文字列                                             | トランザクションの種類 "VALUE_TRANSFER"                                                               |
| from     | 文字列                                             | このトランザクション送信者のアドレス。                                                                        |
| to       | 文字列                                             | The destination address of the transaction.                                                |
| 値        | Number &#124; String &#124; BN &#124; BigNumber | The value transferred for the transaction in peb.                                          |
| ガス       | Number                                          | 取引に支払うガスの最大額(使用されていないガスは返金されます)。                                                           |
| gasPrice | Number                                          | (オプション) ペブで送信者が提供するガス価格。 gasPriceは、Klaytnノードで設定されているunitPriceと同じである必要があります。                |
| nonce    | Number                                          | (オプション) nonce の整数。 省略された場合、 `caver.klay.getTransactionCount` を呼び出すことで caver-js によって設定されます。 |

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
    type: 'VALUE_TRANSFER',
    from: account.address,
    to: '0x75c3098Be5E4B63FBAc05838DaAEE378dD48098d',
    gas: '300000',
    value: caver.utils.toPeb('1', 'KLAY'),
}).then(function(receipt){
    ...
});

// using the event emitter
caver.klay.sendTransaction({
    type: 'VALUE_TRANSFER',
    from: account.address,
    to: '0x75c3098Be5E4B63FBAc05838DaAEE378dD48098d',
    gas: '300000',
    value: caver.utils.toPeb('1', 'KLAY'),
})
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
...
})
.on('error', console.error); // ガス漏れの場合、2番目のパラメータはレシートです。

```


## sendTransaction (FEE_DELEGATED_VALUE_TRANSFER) <a id="sendtransaction-fee_delegated_value_transfer"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
Sends a [Fee Delegated Value Transfer](../../../../../../klaytn/design/transactions/fee-delegation.md#txtypefeedelegatedvaluetransfer) transaction to the network.

**パラメータ**

sendTransaction のパラメータはトランザクションオブジェクトとコールバック関数です。

| 名前                | タイプ    | Description                                                        |
| ----------------- | ------ | ------------------------------------------------------------------ |
| transactionObject | Object | 送信するトランザクションオブジェクト。                                                |
| callback          | 関数     | (オプション) オプションのコールバックは、最初のパラメータとしてエラーオブジェクトを返し、結果は2番目のパラメータとして返します。 |

A transaction object of type `FEE_DELEGATED_VALUE_TRANSFER` has the following structure:

| 名前       | タイプ                                             | Description                                                                                |
| -------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------ |
| タイプ      | 文字列                                             | トランザクションの種類 "FEE_DELEGATED_VALUE_TRANSFER"                                               |
| from     | 文字列                                             | このトランザクション送信者のアドレス。                                                                        |
| to       | 文字列                                             | The destination address of the transaction.                                                |
| 値        | Number &#124; String &#124; BN &#124; BigNumber | The value transferred for the transaction in peb.                                          |
| ガス       | Number                                          | 取引に支払うガスの最大額(使用されていないガスは返金されます)。                                                           |
| gasPrice | Number                                          | (オプション) ペブで送信者が提供するガス価格。 gasPriceは、Klaytnノードで設定されているunitPriceと同じである必要があります。                |
| nonce    | Number                                          | (オプション) nonce の整数。 省略された場合、 `caver.klay.getTransactionCount` を呼び出すことで caver-js によって設定されます。 |

A transaction object of type `FEE_DELEGATED_VALUE_TRANSFER` with the above structure or an `RLP-encoded transaction` of type `FEE_DELEGATED_VALUE_TRANSFER` can be used as a parameter in [caver.klay.accounts.signTransaction](../caver.klay.accounts.md#signtransaction) for sender and in [caver.klay.accounts.feePayerSignTransaction](../caver.klay.accounts.md#feepayersigntransaction) for fee payer.

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
  type: 'FEE_DELEGATED_VALUE_TRANSFER',
  from: sender.address,
  to: '0x75c3098Be5E4B63FBAc05838DaAEE378dD48098d',
  gas: '300000',
  value: caver.utils.toPeb('1', 'KLAY'),
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
  type: 'FEE_DELEGATED_VALUE_TRANSFER',
  from: sender.address,
  to: '0x75c3098Be5E4B63FBAc05838DaAEE378dD48098d',
  gas: '300000',
  value: caver.utils.toPeb('1', 'KLAY'),
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

## sendTransaction (FEE_DELEGATED_VALUE_TRANSFER_WITH_RATIO) <a id="sendtransaction-fee_delegated_value_transfer_with_ratio"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
Sends a [Fee Delegated Value Transfer With Ratio](../../../../../../klaytn/design/transactions/partial-fee-delegation.md#txtypefeedelegatedvaluetransferwithratio) transaction to the network.

**パラメータ**

sendTransaction のパラメータはトランザクションオブジェクトとコールバック関数です。

| 名前                | タイプ    | Description                                                        |
| ----------------- | ------ | ------------------------------------------------------------------ |
| transactionObject | Object | 送信するトランザクションオブジェクト。                                                |
| callback          | 関数     | (オプション) オプションのコールバックは、最初のパラメータとしてエラーオブジェクトを返し、結果は2番目のパラメータとして返します。 |

A transaction object of type `FEE_DELEGATED_VALUE_TRANSFER_WITH_RATIO` has the following structure:

| 名前       | タイプ                                             | Description                                                                                          |
| -------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| タイプ      | 文字列                                             | トランザクションの種類 "FEE_DELEGATED_VALUE_TRANSFER_WITH_RATIO"                                            |
| from     | 文字列                                             | このトランザクション送信者のアドレス。                                                                                  |
| to       | 文字列                                             | The destination address of the transaction.                                                          |
| 値        | Number &#124; String &#124; BN &#124; BigNumber | The value transferred for the transaction in peb.                                                    |
| ガス       | Number                                          | 取引に支払うガスの最大額(使用されていないガスは返金されます)。                                                                     |
| gasPrice | Number                                          | (オプション) ペブで送信者が提供するガス価格。 gasPriceは、Klaytnノードで設定されているunitPriceと同じである必要があります。                          |
| nonce    | Number                                          | (オプション) nonce の整数。 省略された場合、 `caver.klay.getTransactionCount` を呼び出すことで caver-js によって設定されます。           |
| 手数料比     | Number                                          | 手数料支払者の手数料比率。 30%の場合は、手数料の30%が手数料支払者によって支払われます。 70%は送信者が支払います。 手数料比率の範囲は1~99ですが、範囲外の場合は取引は受け付けられません。 |

A transaction object of type `FEE_DELEGATED_VALUE_TRANSFER_WITH_RATIO` with the above structure or an `RLP-encoded transaction` of type `FEE_DELEGATED_VALUE_TRANSFER_WITH_RATIO` can be used as a parameter in [caver.klay.accounts.signTransaction](../caver.klay.accounts.md#signtransaction) for sender and in [caver.klay.accounts.feePayerSignTransaction](../caver.klay.accounts.md#feepayersigntransaction) for fee payer.

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
  type: 'FEE_DELEGATED_VALUE_TRANSFER_WITH_RATIO',
  from: sender.address,
  to: '0x75c3098Be5E4B63FBAc05838DaAEE378dD48098d',
  gas: '300000',
  feeRatio: 20,
  value: caver.utils.toPeb('1', 'KLAY'),
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
  type: 'FEE_DELEGATED_VALUE_TRANSFER_WITH_RATIO',
  from: sender.address,
  to: '0x75c3098Be5E4B63FBAc05838DaAEE378dD48098d',
  gas: '300000',
  feeRatio: 20,
  value: caver.utils.toPeb('1', 'KLAY'),
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

