# 取引先作成取引 <a id="account-creation-transaction"></a>

## sendTransaction (account_CREATION) <a id="sendtransaction-account_creation"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
ネットワークに [アカウント 作成](../../../../../../klaytn/design/transactions/basic.md) トランザクションを送信します。

**Parameters**

| Name                                   | Type                                            | Description                                                                                                                                      |
| -------------------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| transactionObject                      | Object                                          | 送信するトランザクションオブジェクト。                                                                                                                              |
| transactionObject.type                 | String                                          | "ACCOUNT_CREATION"トランザクションのタイプ。                                                                                                                  |
| transactionObject.from                 | String                                          | トランザクションの送信者アドレス                                                                                                                                 |
| transactionObject.to                   | String                                          | 新しく作成されるアドレス                                                                                                                                     |
| transactionObject.value                | Number &#124; String &#124; BN &#124; BigNumber | pebで新しく作成された口座に転送される値。                                                                                                                           |
| transactionObject.gas                  | Number                                          | 取引に使用するガスの量(未使用ガスは返金されます)。                                                                                                                       |
| transactionObject.gasPrice             | Number                                          | (オプション) ペブで送信者が提供するガス価格。 gasPriceは、Klaytnノードで設定されているunitPriceと同じである必要があります。                                                                      |
| transactionObject.nonce                | Number                                          | (optional) Integer of a nonce. 省略された場合、 `caver.klay.getTransactionCount` を呼び出すことで caver-js によって設定されます。                                           |
| transactionObject.publicKey            | String                                          | (オプション) 公開鍵でアカウントを作成する場合は、公開鍵の 64 バイトを書き留めます。                                                                                                    |
| transactionObject.multisig             | String                                          | (オプション) マルチシグキーでアカウントを作成する場合は、複数の公開鍵でマルチシグを書き留めます。 マルチシグを構成する公開鍵は、独自の重みを持っています。 マルチシグで署名されたトランザクションの場合、署名の重みの合計はしきい値以上でなければなりません。                |
| transactionObject.roleTransactionKey   | String                                          | (オプション) ロールベースのキーでアカウントを作成する場合は、公開キーまたはマルチシグキーでロールトランザクションキーを書き留めます。 このロールTransactionKeyはトランザクションに署名するときに使用されます。                                 |
| transactionObject.roleAccountUpdateKey | String                                          | (オプション) ロールベースのキーでアカウントを作成する場合は、公開キーまたはマルチシグキーを使用して roleAccountUpdateKey を書き留めます。 このroleAccountUpdateKey は、AccountUpdate トランザクションに署名するときに使用されます。 |
| transactionObject.roleFeePayerKey      | String                                          | (オプション) ロールベースのキーでアカウントを作成する場合は、公開キーまたはマルチシグキーでroleFeePayerKeyを書き留めます。 この roleFeePayerKey は、トランザクションに feePayer として署名するときに使用されます。                 |
| transactionObject.failKey              | Bool                                            | (オプション) 失敗キーでアカウントを作成する場合はtrueを設定します                                                                                                             |
| callback                               | Function                                        | (optional) Optional callback, returns an error object as the first parameter and the result as the second.                                       |

**Return Value**

`コールバック` は 32 バイトのトランザクションハッシュを返します。

`PromiEvent`: A promise combined event emitter. 領収書が入手可能な場合には解決されます。 さらに、次のイベントが利用できます:

- `"transactionHash"` returns `String`: トランザクションが送信され、トランザクションハッシュが利用可能になった直後に発行される。
- `"receipt"` は `オブジェクト`: トランザクション受信が可能であるときに発生します。
- `"error"` returns `Error`: 送信中にエラーが発生した場合に発生します。 On an out-of-gas error, the second parameter is the receipt.

**Example**

```javascript

// Case 1: Creating account with public key (human-readable)

// using the promise
caver.klay.sendTransaction({
    type: 'ACCOUNT_CREATION',
    from: '0x90B3E9A3770481345A7F17f22f16D020Bccfd33e',
    to: 'colin.klaytn',
    publicKey: '0xc8785266510368d9372badd4c7f4a94b692e82ba74e0b5e26b34558b0f08144794c27901465af0a703859ab47f8ae17e54aaba453b7cde5a6a9e4a32d45d72b2',
    gas: '300000',
    value: '0x174876e800',
})
.then(function(receipt){
    ...
});

// using the event emitter
caver.klay.sendTransaction({
    type: 'ACCOUNT_CREATION',
    from: '0x90B3E9A3770481345A7F17f22f16D020Bccfd33e',
    to: 'colin.klaytn',
    publicKey: '0xc8785266510368d9372badd4c7f4a94b692e82ba74e0b5e26b34558b0f08144794c27901465af0a703859ab47f8ae17e54aaba453b7cde5a6a9e4a32d45d72b2',
    gas: '300000',
    value: '0x174876e800',
})
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
...
})
.on('error', console.error); // ガス漏れの場合、2番目のパラメータはレシートです。

// Case 2: Creating account with public key (non-humanreadable)

// using the promise
caver.klay.sendTransaction({
    type: 'ACCOUNT_CREATION',
    from: '0x90B3E9A3770481345A7F17f22f16D020Bccfd33e',
    to: '0x492c06ff9f5fbd51ace4ff214bfc9ca06fe4c601',
    publicKey: '0xc8785266510368d9372badd4c7f4a94b692e82ba74e0b5e26b34558b0f08144794c27901465af0a703859ab47f8ae17e54aaba453b7cde5a6a9e4a32d45d72b2',
    gas: '300000',
    value: '0x174876e800',
})
.then(function(receipt){
    ...
});

// using the event emitter
caver.klay.sendTransaction({
    type: 'ACCOUNT_CREATION',
    from: '0x90B3E9A3770481345A7F17f22f16D020Bccfd33e',
    to: '0x492c06ff9f5fbd51ace4ff214bfc9ca06fe4c601',
    publicKey: '0xc8785266510368d9372badd4c7f4a94b692e82ba74e0b5e26b34558b0f08144794c27901465af0a703859ab47f8ae17e54aaba453b7cde5a6a9e4a32d45d72b2',
    gas: '300000',
    value: '0x174876e800',
})
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
    ...
})
.on('error', console.error); // If an out-of-gas error, the second parameter is the receipt.

// Case 3: Creating account with fail key

// using the promise
caver.klay.sendTransaction({
    type: 'ACCOUNT_CREATION',
    from: '0x90B3E9A3770481345A7F17f22f16D020Bccfd33e',
    to: '0x492c06ff9f5fbd51ace4ff214bfc9ca06fe4c601',
    failKey: true,
    gas: '300000',
    value: '0x174876e800',
})
.then(function(receipt){
    ...
});

// using the event emitter
caver.klay.sendTransaction({
    type: 'ACCOUNT_CREATION',
    from: '0x90B3E9A3770481345A7F17f22f16D020Bccfd33e',
    to: '0x492c06ff9f5fbd51ace4ff214bfc9ca06fe4c601',
    failKey: true,
    gas: '300000',
    value: '0x174876e800',
})
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
    ...
})
.on('error', console.error); // If an out-of-gas error, the second parameter is the receipt.

// Case 4: Creating account with weighted-multisig

// using the promise
caver.klay.sendTransaction({
  type: 'ACCOUNT_CREATION',
  from: '0x492c06ff9f5fbd51ace4ff214bfc9ca06fe4c601',
  to: '0xbd6fa2b535f9502d3e8877cc7818df577bc3a981',
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
  type: 'ACCOUNT_CREATION',
  from: '0x492c06ff9f5fbd51ace4ff214bfc9ca06fe4c601',
  to: '0xbd6fa2b535f9502d3e8877cc7818df577bc3a981',
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
.on('error', console.error); // If an out-of-gas error, the second parameter is the receipt.

// Case 5: Creating account with role-based key

// using the promise
caver.klay.sendTransaction({
  type: 'ACCOUNT_CREATION',
  from: '0x492c06ff9f5fbd51ace4ff214bfc9ca06fe4c601',
  to: '0xbd6fa2b535f9502d3e8877cc7818df577bc3a981',
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
  type: 'ACCOUNT_CREATION',
  from: '0x492c06ff9f5fbd51ace4ff214bfc9ca06fe4c601',
  to: '0xbd6fa2b535f9502d3e8877cc7818df577bc3a981',
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
.on('error', console.error); // If an out-of-gas error, the second parameter is the receipt.

```
