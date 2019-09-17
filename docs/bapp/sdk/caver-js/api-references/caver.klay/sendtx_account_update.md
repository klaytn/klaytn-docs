# Account Update Transaction

## sendTransaction (ACCOUNT_UPDATE)

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
Sends an [Account Update](../../../../../klaytn/design/transactions/basic.md#txtypeaccountupdate) transaction to the network.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| transactionObject | Object | The transaction object to send. |
| transactionObject.type | String | The type of "ACCOUNT_UPDATE" transaction. |
| transactionObject.from | String | The address which will be updated. |
| transactionObject.gas | Number | The amount of gas to use for the transaction (unused gas is refunded). |
| transactionObject.gasPrice | Number | (optional) Gas price provided by the sender in peb. The gasPrice must be the same as the unitPrice set in the Klaytn node. |
| transactionObject.nonce | Number | (optional) Integer of a nonce. This allows to overwrite your own pending transactions that use the same nonce. If omitted, it will be set by caver-js via calling `caver.klay.getTransactionCount`. |
| transactionObject.publicKey | String | (optional) if updating account with public key, write down 64 bytes of public key. |
| transactionObject.multisig | String | (optional) if updating account with multisig key, write down multisig with multiple public keys. The public keys that make up multisig have their own weight. For transactions signed with multisig, the sum of the weights of the signature must be larger than or equal to the threshold. |
| transactionObject.roleTransactionKey | String | (optional) if updating account with role based key, write down roleTransactionKey with public key or multisig key. This roleTransactionKey is used when sign the transaction. |
| transactionObject.roleAccountUpdateKey | String | (optional) if updating account with role based key, write down roleAccountUpdateKey with public key or multisig key. This roleAccountUpdateKey is used when sign an AccountUpdate transaction. |
| transactionObject.roleFeePayerKey | String | (optional) if updating account with role based key, write down roleFeePayerKey with public key or multisig key. This roleFeePayerKey is used when sign the transaction as a feePayer. |
| transactionObject.failKey | Bool | (optional) if updating account with fail key, set it true |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

The `callback` will return the 32-byte transaction hash.

`PromiEvent`: A promise combined event emitter. Will be resolved when the transaction receipt is available. Additionally the following events are available:

- ``"transactionHash"`` returns ``String``: Is fired right after the transaction is sent and a transaction hash is available.
- ``"receipt"`` returns ``Object``: Is fired when the transaction receipt is available.
- ``"error"`` returns ``Error``: Is fired if an error occurs during sending. On an out-of-gas error, the second parameter is the receipt.

**Example**

```javascript
const account = caver.klay.accounts.wallet.add('0x{private key}')

// Case 1: Updating account with public key

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
.on('error', console.error); // If an out-of-gas error, the second parameter is the receipt.

// Case 2: Updating account with fail key

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
.on('error', console.error); // If an out-of-gas error, the second parameter is the receipt.

// Case 3: Updating account with weighted-multisig

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
.on('error', console.error); // If an out-of-gas error, the second parameter is the receipt.

// Case 4: Updating account with role-based key

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
.on('error', console.error); // If an out-of-gas error, the second parameter is the receipt.
```


## sendTransaction (FEE_DELEGATED_ACCOUNT_UPDATE)

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
Sends a [Fee Delegated Account Update](../../../../../klaytn/design/transactions/fee-delegation.md#txtypefeedelegatedaccountupdate) transaction to the network.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| transactionObject | Object | The transaction object to send. |
| transactionObject.type | String | The type of "FEE_DELEGATED_ACCOUNT_UPDATE" transaction. |
| transactionObject.from | String | The address which will be updated. |
| transactionObject.gas | Number | The amount of gas to use for the transaction (unused gas is refunded). |
| transactionObject.gasPrice | Number | (optional) Gas price provided by the sender in peb. The gasPrice must be the same as the unitPrice set in the Klaytn node. |
| transactionObject.nonce | Number | (optional) Integer of a nonce. This allows to overwrite your own pending transactions that use the same nonce. If omitted, it will be set by caver-js via calling `caver.klay.getTransactionCount`. |
| transactionObject.publicKey | String | (optional) if updating account with public key, write down 64 bytes of public key. |
| transactionObject.multisig | String | (optional) if updating account with multisig key, write down multisig with multiple public keys. The public keys that make up multisig have their own weight. For transactions signed with multisig, the sum of the weights of the signature must be larger than or equal to the threshold. |
| transactionObject.roleTransactionKey | String | (optional) if updating account with role based key, write down roleTransactionKey with public key or multisig key. This roleTransactionKey is used when sign the transaction. |
| transactionObject.roleAccountUpdateKey | String | (optional) if updating account with role based key, write down roleAccountUpdateKey with public key or multisig key. This roleAccountUpdateKey is used when sign an AccountUpdate transaction. |
| transactionObject.roleFeePayerKey | String | (optional) if updating account with role based key, write down roleFeePayerKey with public key or multisig key. This roleFeePayerKey is used when sign the transaction as a feePayer. |
| transactionObject.failKey | Bool | (optional) if updating account with fail key, set it true |
| transactionObject.feePayer | String | (for fee payer) The fee payer address of the transaction. |
| transactionObject.senderRawTransaction | String | (for fee payer) The raw transaction of a sender. |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

The `callback` will return the 32-byte transaction hash.

`PromiEvent`: A promise combined event emitter. Will be resolved when the transaction receipt is available. Additionally the following events are available:

- ``"transactionHash"`` returns ``String``: Is fired right after the transaction is sent and a transaction hash is available.
- ``"receipt"`` returns ``Object``: Is fired when the transaction receipt is available.
- ``"error"`` returns ``Error``: Is fired if an error occurs during sending. On an out-of-gas error, the second parameter is the receipt.

**Example**

```javascript
const sender = caver.klay.accounts.wallet.add('0x{private key}')
const feePayer = caver.klay.accounts.wallet.add('0x{private key}')

// using the promise
const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
  type: 'FEE_DELEGATED_ACCOUNT_UPDATE',
  from: sender.address,
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
  type: 'FEE_DELEGATED_ACCOUNT_UPDATE',
  from: sender.address,
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
.on('error', console.error); // If an out-of-gas error, the second parameter is the receipt.
```


## sendTransaction (FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO)

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
Sends a [Fee Delegated Account Update With Ratio](../../../../../klaytn/design/transactions/partial-fee-delegation.md#txtypefeedelegatedaccountupdatewithratio) transaction to the network.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| transactionObject | Object | The transaction object to send. |
| transactionObject.type | String | The type of "FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO" transaction. |
| transactionObject.from | String | The address which will be updated. |
| transactionObject.gas | Number | The amount of gas to use for the transaction (unused gas is refunded). |
| transactionObject.gasPrice | Number | (optional) Gas price provided by the sender in peb. The gasPrice must be the same as the unitPrice set in the Klaytn node. |
| transactionObject.nonce | Number | (optional) Integer of a nonce. This allows to overwrite your own pending transactions that use the same nonce. If omitted, it will be set by caver-js via calling `caver.klay.getTransactionCount`. |
| transactionObject.publicKey | String | (optional) if updating account with public key, write down 64 bytes of public key. |
| transactionObject.multisig | String | (optional) if updating account with multisig key, write down multisig with multiple public keys. The public keys that make up multisig have their own weight. For transactions signed with multisig, the sum of the weights of the signature must be larger than or equal to the threshold. |
| transactionObject.roleTransactionKey | String | (optional) if updating account with role based key, write down roleTransactionKey with public key or multisig key. This roleTransactionKey is used when sign the transaction. |
| transactionObject.roleAccountUpdateKey | String | (optional) if updating account with role based key, write down roleAccountUpdateKey with public key or multisig key. This roleAccountUpdateKey is used when sign an AccountUpdate transaction. |
| transactionObject.roleFeePayerKey | String | (optional) if updating account with role based key, write down roleFeePayerKey with public key or multisig key. This roleFeePayerKey is used when sign the transaction as a feePayer. |
| transactionObject.failKey | Bool | (optional) if updating account with fail key, set it true |
| transactionObject.feeRatio | Number | Fee ratio of the fee payer. If it is 30, 30% of the fee will be paid by the fee payer. 70% will be paid by the sender. The range of fee ratio is 1 ~ 99, if it is out of range, the transaction will not be accepted. |
| transactionObject.feePayer | String | (for fee payer) The fee payer address of the transaction. |
| transactionObject.senderRawTransaction | String | (for fee payer) The raw transaction of a sender. |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

The `callback` will return the 32-byte transaction hash.

`PromiEvent`: A promise combined event emitter. Will be resolved when the transaction receipt is available. Additionally the following events are available:

- ``"transactionHash"`` returns ``String``: Is fired right after the transaction is sent and a transaction hash is available.
- ``"receipt"`` returns ``Object``: Is fired when the transaction receipt is available.
- ``"error"`` returns ``Error``: Is fired if an error occurs during sending. On an out-of-gas error, the second parameter is the receipt.

**Example**

```javascript
const sender = caver.klay.accounts.wallet.add('0x{private key}')
const feePayer = caver.klay.accounts.wallet.add('0x{private key}')

// using the promise
const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
  type: 'FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO',
  from: sender.address,
  gas: '300000',
  value: caver.utils.toPeb('1', 'KLAY'),
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
  type: 'FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO',
  from: sender.address,
  gas: '300000',
  value: caver.utils.toPeb('1', 'KLAY'),
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
.on('error', console.error); // If an out-of-gas error, the second parameter is the receipt.
```

