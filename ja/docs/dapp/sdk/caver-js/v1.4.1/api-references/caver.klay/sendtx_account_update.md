# アカウントの更新取引 <a id="account-update-transaction"></a>

## sendTransaction (ACCOUNT_UPDATE) <a id="sendtransaction-account_update"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
[アカウント更新](../../../../../../klaytn/design/transactions/basic.md#txtypeaccountupdate) トランザクションをネットワークに送信します。

**パラメータ**

sendTransaction のパラメータはトランザクションオブジェクトとコールバック関数です。

| 名前                | タイプ    | Description                                                        |
| ----------------- | ------ | ------------------------------------------------------------------ |
| transactionObject | Object | 送信するトランザクションオブジェクト。                                                |
| callback          | 関数     | (オプション) オプションのコールバックは、最初のパラメータとしてエラーオブジェクトを返し、結果は2番目のパラメータとして返します。 |

タイプ `ACCOUNT_UPDATE` のトランザクションオブジェクトには以下の構造があります: 新しいキーを提供するときに注意してください。 キーの種類によっては以下のいずれかを提供する必要があります。 複数のキーが与えられた場合、'重複したキー' エラーが発生します。 caver-js v1.2.0 から `AccountForUpdate` インスタンスで `キー` を使用することをお勧めします。
- キー
- legacyKey
- 公開キー
- multig
- roleTransactionKey, roleAccountUpdateKey, roleFeePayerKey
- failKey

| 名前                   | タイプ    | Description                                                                                                                                                                                                         |
| -------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| タイプ                  | 文字列    | トランザクションタイプ。 "ACCOUNT_UPDATE"                                                                                                                                                                                       |
| from                 | 文字列    | このトランザクション送信者のアドレス。 このアカウントはこのトランザクションによって更新されます。                                                                                                                                                                   |
| ガス                   | Number | 取引に支払うガスの最大額(使用されていないガスは返金されます)。                                                                                                                                                                                    |
| gasPrice             | Number | (オプション) ペブで送信者が提供するガス価格。 gasPriceは、Klaytnノードで設定されているunitPriceと同じである必要があります。                                                                                                                                         |
| nonce                | Number | (オプション) nonce の整数。 省略された場合、 `caver.klay.getTransactionCount` を呼び出すことで caver-js によって設定されます。                                                                                                                          |
| キー                   | Object | (オプション) アカウントの更新時に使用されるアドレスとキーを含む `AccountForUpdate` インスタンス。 各キータイプの AccountForUpdate インスタンスを作成する方法については、 [caver.klay.accounts.createAccountForUpdate](../caver.klay.accounts.md#createaccountforupdate) を参照してください。 |
| legacyKey            | ブール型   | (オプション) レガシーキーを持つようにアカウントを更新する場合、これをtrueに設定します。                                                                                                                                                                     |
| 公開キー                 | 文字列    | (オプション) 公開鍵を持つようにアカウントを更新する場合は、64 バイトの公開鍵を書き留めます。                                                                                                                                                                   |
| multig               | Object | (オプション) マルチシグキーを持つようにアカウントを更新する場合は、マルチシグを構成する重み付けされた公開鍵のリストを書き留めます。 マルチシグでは閾値も定義しています トランザクションに署名するとき、署名の重みの合計はしきい値以上でなければなりません。                                                                                    |
| roleTransactionKey   | Object | (オプション) ロールベースのキーを持つようにアカウントを更新する場合、roleTransactionKey を書き留めます。 roleTransactionKey は、公開鍵またはマルチシグ鍵にすることができます。 このロールTransactionKeyはトランザクションに署名するときに使用されます。                                                            |
| roleAccountUpdateKey | Object | (オプション) ロールベースのキーを持つようにアカウントを更新する場合、roleAccountUpdateKey を書き留めます。 roleAccountUpdateKey は、公開鍵またはマルチシグ鍵にすることができます。 このロールAccountUpdateKeyはAccountUpdateトランザクションに署名するときに使用されます。                                         |
| roleFeePayerKey      | Object | (オプション) ロールベースのキーを持つようにアカウントを更新する場合、roleFeePayerKey を書き留めます。 roleFeePayerKey は、公開鍵またはマルチシグ鍵にすることができます。 この roleFeePayerKey は、手数料支払い者としてトランザクションに署名するときに使用されます。                                                       |
| failKey              | ブール型   | (オプション) 失敗キーを持つようにアカウントを更新する場合は、この値を true に設定します。                                                                                                                                                                   |

If you call `caver.klay.sendTransaction` with a transaction object of type `ACCOUNT_UPDATE` as in the above, caver-js will send it to the network after signing with the key of the sender account (`from`) inside the in-memory wallet.

**戻り値**

`コールバック` は 32 バイトのトランザクションハッシュを返します。

`PromiEvent`: A promise combined event emitter. 領収書が入手可能な場合には解決されます。 さらに、次のイベントが利用できます:

- `"transactionHash"` returns `String`: トランザクションが送信され、トランザクションハッシュが利用可能になった直後に発行される。
- `"receipt"` は `オブジェクト`: トランザクション受信が可能であるときに発生します。
- `"error"` returns `Error`: 送信中にエラーが発生した場合に発生します。 ガス欠エラーでは、2 番目のパラメータはレシートです。

**例**

```javascript
const account = caver.klay.accounts.wallet.add('0x{private key}')

// Case 1: Updating account with an AccountForUpdate instance

const accountForUpdate = caver.klay.accounts.createAccountForUpdate(account.address, '0x{private key}')

// using the promise
caver.klay.sendTransaction({
    type: 'ACCOUNT_UPDATE',
    from: account.address,
    key: accountForUpdate,
    gas: '300000',
})
.then(function(receipt){
    ...
})

// using the event emitter
caver.klay.sendTransaction({
    type: 'ACCOUNT_UPDATE',
    from: account.address,
    key: accountForUpdate,
    gas: '300000',
})
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
...
})
.on('error', console.error)

// Case 2: Updating account with legacy key

// using the promise
caver.klay.sendTransaction({
    type: 'ACCOUNT_UPDATE',
    from: account.address,
    legacyKey: true,
    gas: '300000',
})
.then(function(receipt){
    ...
});

// using the event emitter
caver.klay.sendTransaction({
    type: 'ACCOUNT_UPDATE',
    from: account.address,
    legacyKey: true,
    gas: '300000',
})
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
...
})
.on('error', console.error); // ガス漏れの場合、2番目のパラメータはレシートです。

// Case 3: Updating account with public key

// using the promise
caver.klay.sendTransaction({
    type: 'ACCOUNT_UPDATE',
    from: account.address,
    publicKey: '0x9016de15ebb219b1e8bc732070df93a28903e5799d0cd24a807a5afabf4601f7e5ab312b5a682dd8c0e72e71e67552174d5082cde25db3626a5b025f97f8a005',
    gas: '300000',
})
.then(function(receipt){
    ...
});

// using the event emitter
caver.klay.sendTransaction({
    type: 'ACCOUNT_UPDATE',
    from: account.address,
    publicKey: '0x9016de15ebb219b1e8bc732070df93a28903e5799d0cd24a807a5afabf4601f7e5ab312b5a682dd8c0e72e71e67552174d5082cde25db3626a5b025f97f8a005',
    gas: '300000',
})
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
...
})
.on('error', console.error); // ガス漏れの場合、2番目のパラメータはレシートです。

// Case 4: Updating account with fail key

// using the promise
caver.klay.sendTransaction({
    type: 'ACCOUNT_UPDATE',
    from: account.address,
    failKey: true,
    gas: '300000',
})
.then(function(receipt){
    ...
});

// using the event emitter
caver.klay.sendTransaction({
    type: 'ACCOUNT_UPDATE',
    from: account.address,
    failKey: true,
    gas: '300000',
})
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
...
})
.on('error', console.error); // ガス漏れの場合、2番目のパラメータはレシートです。

// Case 5: Updating account with weighted-multisig

// using the promise
caver.klay.sendTransaction({
  type: 'ACCOUNT_UPDATE',
  from: account.address,
  multisig: {
    threshold: 3,
    keys: [
      { weight: 1, publicKey: '0xb1a73e06009a6ba4816e24018e70fbd6f95b584c61bc704473da5102ac118d3121ce7fc64a7ba5004d487c49865047a7a3d7aa8baec5d9b2c2568f44110daab8' },
      { weight: 1, publicKey: '0x24b437235528893f079b15d65b33a355f315b7a521374f899ae3b3c29c546659dc6bc129cb8de49ccc05617cebf78224a622b9cd238a4fe3b04a5d1f8036efbe' },
      { weight: 1, publicKey: '0x354acd6ef039e69ffc31a690bf6aa748ca76a3dd98c5108793c5e0863a80d3477ebb1fac8c7d3e9a9f6cf57777db28f8ea3efb3937cb17101878b910ee66c527' },
      { weight: 1, publicKey: '0x9016de15ebb219b1e8bc732070df93a28903e5799d0cd24a807a5afabf4601f7e5ab312b5a682dd8c0e72e71e67552174d5082cde25db3626a5b025f97f8a005' },
    ],
  },
  gas: '300000',
})
.then(function(receipt){
    ...
});

// using the event emitter
caver.klay.sendTransaction({
  type: 'ACCOUNT_UPDATE',
  from: account.address,
  multisig: {
    threshold: 3,
    keys: [
      { weight: 1, publicKey: '0xb1a73e06009a6ba4816e24018e70fbd6f95b584c61bc704473da5102ac118d3121ce7fc64a7ba5004d487c49865047a7a3d7aa8baec5d9b2c2568f44110daab8' },
      { weight: 1, publicKey: '0x24b437235528893f079b15d65b33a355f315b7a521374f899ae3b3c29c546659dc6bc129cb8de49ccc05617cebf78224a622b9cd238a4fe3b04a5d1f8036efbe' },
      { weight: 1, publicKey: '0x354acd6ef039e69ffc31a690bf6aa748ca76a3dd98c5108793c5e0863a80d3477ebb1fac8c7d3e9a9f6cf57777db28f8ea3efb3937cb17101878b910ee66c527' },
      { weight: 1, publicKey: '0x9016de15ebb219b1e8bc732070df93a28903e5799d0cd24a807a5afabf4601f7e5ab312b5a682dd8c0e72e71e67552174d5082cde25db3626a5b025f97f8a005' },
    ],
  },
  gas: '300000',
})
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
...
})
.on('error', console.error); // ガス漏れの場合、2番目のパラメータはレシートです。

// Case 6: Updating account with role-based key

// using the promise
caver.klay.sendTransaction({
  type: 'ACCOUNT_UPDATE',
  from: account.address,
  roleTransactionKey: {
    publicKey: '0xe4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512d0a5735a23ce1654b14680054a993441eae7c261983a56f8e0da61280758b5919',
  },
  roleAccountUpdateKey: {
    publicKey: '0x36f6355f5b532c3c1606f18fa2be7a16ae200c5159c8031dd25bfa389a4c9c066fdf9fc87a16ac359e66d9761445d5ccbb417fb7757a3f5209d713824596a50d',
  },
  roleFeePayerKey: {
    publicKey: '0xc8785266510368d9372badd4c7f4a94b692e82ba74e0b5e26b34558b0f08144794c27901465af0a703859ab47f8ae17e54aaba453b7cde5a6a9e4a32d45d72b2',
  },
  gas: '300000',
})
.then(function(receipt){
    ...
});

// using the event emitter
caver.klay.sendTransaction({
  type: 'ACCOUNT_UPDATE',
  from: account.address,
  roleTransactionKey: {
    publicKey: '0xe4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512d0a5735a23ce1654b14680054a993441eae7c261983a56f8e0da61280758b5919',
  },
  roleAccountUpdateKey: {
    publicKey: '0x36f6355f5b532c3c1606f18fa2be7a16ae200c5159c8031dd25bfa389a4c9c066fdf9fc87a16ac359e66d9761445d5ccbb417fb7757a3f5209d713824596a50d',
  },
  roleFeePayerKey: {
    publicKey: '0xc8785266510368d9372badd4c7f4a94b692e82ba74e0b5e26b34558b0f08144794c27901465af0a703859ab47f8ae17e54aaba453b7cde5a6a9e4a32d45d72b2',
  },
  gas: '300000',
})
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
...
})
.on('error', console.error); // ガス漏れの場合、2番目のパラメータはレシートです。
```


## sendTransaction (FEE_DELEGATED_ACCOUNT_UPDATE) <a id="sendtransaction-fee_delegated_account_update"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
[手数料委任アカウント更新](../../../../../../klaytn/design/transactions/fee-delegation.md#txtypefeedelegatedaccountupdate) トランザクションをネットワークに送信します。

手数料支払者が取引に署名し、ネットワークに送信するには2つの方法があります。

1. `caver.klay.sendTransaction` をオブジェクトで呼び出します。 `{senderRawTransaction: rawTransaction, feePayer: feePayerAddress}`, 手数料支払者に使用されるトランザクション形式。 この場合、手数料支払者アカウントはインメモリcaver-jsウォレットに存在する必要があります。
2. [caver.klay.accounts.feePayerSignTransaction](../caver.klay.accounts.md#feepayersigntransaction) で署名し、 [caver.klay.sendSignedTransaction](./transaction.md#sendsignedtransaction) 経由でネットワークに送信します。

この例では、 `caver.klay.sendTransaction` の使用方法についてのみ説明します。

For information on how to send using `caver.klay.accounts.feePayerSignTransaction` and `caver.klay.sendSignedTransaction`, see [caver.klay.accounts.feePayerSignTransaction](../caver.klay.accounts.md#feepayersigntransaction) and [Sending a Transaction with multiple signer](../../getting-started_1.4.1.md#sending-a-transaction-with-multiple-signer).

**パラメータ**

sendTransaction のパラメータはトランザクションオブジェクトとコールバック関数です。

| 名前                | タイプ    | Description                                                        |
| ----------------- | ------ | ------------------------------------------------------------------ |
| transactionObject | Object | 送信するトランザクションオブジェクト。                                                |
| callback          | 関数     | (オプション) オプションのコールバックは、最初のパラメータとしてエラーオブジェクトを返し、結果は2番目のパラメータとして返します。 |

タイプ `FEE_DELEGATED_ACCOUNT_UPDATE` のトランザクションオブジェクト

| 名前                   | タイプ    | Description                                                                                                                                                                                                         |
| -------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| タイプ                  | 文字列    | トランザクションの種類 "FEE_DELEGATED_ACCOUNT_UPDATE"                                                                                                                                                                        |
| from                 | 文字列    | このトランザクション送信者のアドレス。 このアカウントはこのトランザクションによって更新されます。                                                                                                                                                                   |
| ガス                   | Number | 取引に支払うガスの最大額(使用されていないガスは返金されます)。                                                                                                                                                                                    |
| gasPrice             | Number | (オプション) ペブで送信者が提供するガス価格。 gasPriceは、Klaytnノードで設定されているunitPriceと同じである必要があります。                                                                                                                                         |
| nonce                | Number | (オプション) nonce の整数。 省略された場合、 `caver.klay.getTransactionCount` を呼び出すことで caver-js によって設定されます。                                                                                                                          |
| キー                   | Object | (オプション) アカウントの更新時に使用されるアドレスとキーを含む `AccountForUpdate` インスタンス。 各キータイプの AccountForUpdate インスタンスを作成する方法については、 [caver.klay.accounts.createAccountForUpdate](../caver.klay.accounts.md#createaccountforupdate) を参照してください。 |
| legacyKey            | ブール型   | (オプション) レガシーキーを持つようにアカウントを更新する場合、これをtrueに設定します。                                                                                                                                                                     |
| 公開キー                 | 文字列    | (オプション) 公開鍵を持つようにアカウントを更新する場合は、64 バイトの公開鍵を書き留めます。                                                                                                                                                                   |
| multig               | Object | (オプション) マルチシグキーを持つようにアカウントを更新する場合は、マルチシグを構成する重み付けされた公開鍵のリストを書き留めます。 マルチシグでは閾値も定義しています トランザクションに署名するとき、署名の重みの合計はしきい値以上でなければなりません。                                                                                    |
| roleTransactionKey   | Object | (オプション) ロールベースのキーを持つようにアカウントを更新する場合、roleTransactionKey を書き留めます。 roleTransactionKey は、公開鍵またはマルチシグ鍵にすることができます。 このロールTransactionKeyはトランザクションに署名するときに使用されます。                                                            |
| roleAccountUpdateKey | Object | (オプション) ロールベースのキーを持つようにアカウントを更新する場合、roleAccountUpdateKey を書き留めます。 roleAccountUpdateKey は、公開鍵またはマルチシグ鍵にすることができます。 このロールAccountUpdateKeyはAccountUpdateトランザクションに署名するときに使用されます。                                         |
| roleFeePayerKey      | Object | (オプション) ロールベースのキーを持つようにアカウントを更新する場合、roleFeePayerKey を書き留めます。 roleFeePayerKey は、公開鍵またはマルチシグ鍵にすることができます。 この roleFeePayerKey は、手数料支払い者としてトランザクションに署名するときに使用されます。                                                       |
| failKey              | ブール型   | (オプション) 失敗キーを持つようにアカウントを更新する場合は、この値を true に設定します。                                                                                                                                                                   |

A transaction object of type `FEE_DELEGATED_ACCOUNT_UPDATE` with the above structure or an `RLP-encoded transaction` of type `FEE_DELEGATED_ACCOUNT_UPDATE` can be used as a parameter in [caver.klay.accounts.signTransaction](../caver.klay.accounts.md#signtransaction) for sender and in [caver.klay.accounts.feePayerSignTransaction](../caver.klay.accounts.md#feepayersigntransaction) for fee payer.

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

const accountForUpdate = caver.klay.accounts.createAccountForUpdate(sender.address, '0x{private key}')

// using the promise
const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
    type: 'FEE_DELEGATED_ACCOUNT_UPDATE',
    from: sender.address,
    key: accountForUpdate,
    gas: '300000',
}, sender.privateKey)

caver.klay.sendTransaction({
    senderRawTransaction: senderRawTransaction,
    feePayer: feePayer.address,
})
.then(function(receipt){
    ...
})

// using the event emitter
const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
    type: 'FEE_DELEGATED_ACCOUNT_UPDATE',
    from: sender.address,
    key: accountForUpdate,
    gas: '300000',
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
.on('error', console.error)

```

## sendTransaction (FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO) <a id="sendtransaction-fee_delegated_account_update_with_ratio"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
ネットワークに [手数料委任されたアカウントの更新を](../../../../../../klaytn/design/transactions/partial-fee-delegation.md#txtypefeedelegatedaccountupdatewithratio) 割合で送信します。

手数料支払者が取引に署名し、ネットワークに送信するには2つの方法があります。

1. 手数料支払者トランザクションフォーマットで `caver.klay.sendTransaction` を呼び出します( `senderRawTransaction` と `feepayer` を定義するオブジェクト)。 この場合、caver-jsのメモリ内ウォレットに手数料支払い者アカウントが存在する必要があります。
2. [caver.klay.accounts.feePayerSignTransaction](../caver.klay.accounts.md#feepayersigntransaction) で署名し、 [caver.klay.sendSignedTransaction](./transaction.md#sendsignedtransaction) 経由でネットワークに送信します。

この例では、 `caver.klay.sendTransaction` の使用方法についてのみ説明します。

For information on how to send using `caver.klay.accounts.feePayerSignTransaction` and `caver.klay.sendSignedTransaction`, see [caver.klay.accounts.feePayerSignTransaction](../caver.klay.accounts.md#feepayersigntransaction) and [Sending a Transaction with multiple signer](../../getting-started_1.4.1.md#sending-a-transaction-with-multiple-signer).

**パラメータ**

sendTransaction のパラメータは、transaction オブジェクトとコールバック関数です。

| 名前                | タイプ    | Description                                                        |
| ----------------- | ------ | ------------------------------------------------------------------ |
| transactionObject | Object | 送信するトランザクションオブジェクト。                                                |
| callback          | 関数     | (オプション) オプションのコールバックは、最初のパラメータとしてエラーオブジェクトを返し、結果は2番目のパラメータとして返します。 |

`FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO` トランザクションのプレーントランザクションオブジェクトタイプは以下の構造を持ちます:

| 名前                   | タイプ    | Description                                                                                                                                                                                                         |
| -------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| タイプ                  | 文字列    | "FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO" トランザクションのタイプ。                                                                                                                                                         |
| from                 | 文字列    | このトランザクション送信者のアドレス。 このアカウントはこのトランザクションによって更新されます。                                                                                                                                                                   |
| ガス                   | Number | 取引に支払うガスの最大額(使用されていないガスは返金されます)。                                                                                                                                                                                    |
| gasPrice             | Number | (オプション) ペブで送信者が提供するガス価格。 gasPriceは、Klaytnノードで設定されているunitPriceと同じである必要があります。                                                                                                                                         |
| nonce                | Number | (オプション) nonce の整数。 省略された場合、 `caver.klay.getTransactionCount` を呼び出すことで caver-js によって設定されます。                                                                                                                          |
| キー                   | Object | (オプション) アカウントの更新時に使用されるアドレスとキーを含む `AccountForUpdate` インスタンス。 各キータイプの AccountForUpdate インスタンスを作成する方法については、 [caver.klay.accounts.createAccountForUpdate](../caver.klay.accounts.md#createaccountforupdate) を参照してください。 |
| legacyKey            | ブール型   | (オプション) レガシーキーを持つようにアカウントを更新する場合、これをtrueに設定します。                                                                                                                                                                     |
| 公開キー                 | 文字列    | (オプション) 公開鍵を持つようにアカウントを更新する場合は、64 バイトの公開鍵を書き留めます。                                                                                                                                                                   |
| multig               | Object | (オプション) マルチシグキーを持つようにアカウントを更新する場合は、マルチシグを構成する重み付けされた公開鍵のリストを書き留めます。 マルチシグでは閾値も定義しています トランザクションに署名するとき、署名の重みの合計はしきい値以上でなければなりません。                                                                                    |
| roleTransactionKey   | Object | (オプション) ロールベースのキーを持つようにアカウントを更新する場合、roleTransactionKey を書き留めます。 roleTransactionKey は、公開鍵またはマルチシグ鍵にすることができます。 このロールTransactionKeyはトランザクションに署名するときに使用されます。                                                            |
| roleAccountUpdateKey | Object | (オプション) ロールベースのキーを持つようにアカウントを更新する場合、roleAccountUpdateKey を書き留めます。 roleAccountUpdateKey は、公開鍵またはマルチシグ鍵にすることができます。 このロールAccountUpdateKeyはAccountUpdateトランザクションに署名するときに使用されます。                                         |
| roleFeePayerKey      | Object | (オプション) ロールベースのキーを持つようにアカウントを更新する場合、roleFeePayerKey を書き留めます。 roleFeePayerKey は、公開鍵またはマルチシグ鍵にすることができます。 この roleFeePayerKey は、手数料支払い者としてトランザクションに署名するときに使用されます。                                                       |
| failKey              | ブール型   | (オプション) 失敗キーを持つようにアカウントを更新する場合は、この値を true に設定します。                                                                                                                                                                   |

A transaction object of type `FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO` with the above structure or an `RLP-encoded transaction` of type `FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO` can be used as a parameter in [caver.klay.accounts.signTransaction](../caver.klay.accounts.md#signtransaction) for sender and in [caver.klay.accounts.feePayerSignTransaction](../caver.klay.accounts.md#feepayersigntransaction) for fee payer.

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

const accountForUpdate = caver.klay.accounts.createAccountForUpdate(sender.address, '0x{private key}')

// using the promise
const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
    type: 'FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO',
    from: sender.address,
    key: accountForUpdate,
    gas: '300000',
    feeRatio: 30,
}, sender.privateKey)

caver.klay.sendTransaction({
    senderRawTransaction: senderRawTransaction,
    feePayer: feePayer.address,
})
.then(function(receipt){
    ...
})

// using the event emitter
const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
    type: 'FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO',
    from: sender.address,
    key: accountForUpdate,
    gas: '300000',
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
.on('error', console.error)
```
