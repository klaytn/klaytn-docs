# 계정 업데이트 트랜잭션<a id="account-update-transaction"></a>

## sendTransaction (ACCOUNT_UPDATE) <a id="sendtransaction-account_update"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
[Account Update](../../../../../../klaytn/design/transactions/basic.md#txtypeaccountupdate) 트랜잭션을 네트워크에 전송합니다.

**Parameters**

sendTransaction의 매개 변수는 트랜잭션 객체 및 콜백 함수입니다.

| Name              | Type     | Description                                                                                                |
| ----------------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| transactionObject | Object   | The transaction object to send.                                                                            |
| callback          | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

`ACCOUNT_UPDATE` 타입의 트랜잭션 객체는 아래와 같은 구조를 가집니다. 새로운 키는 타입에 따라 아래 중 하나만 제공해야 한다는 점을 주의하세요. 둘 이상이 입력되면  'duplicated key' 오류가 발생합니다. caver-js v1.2.0부터는 `AccountForUpdate`객체를 생성하여 `key` 필드에 입력하는 것을 권장합니다.
- key
- legacyKey
- publicKey
- multisig
- roleTransactionKey, roleAccountUpdateKey, roleFeePayerKey
- failKey

| Name                 | Type   | Description                                                                                                                                                                                                   |
| -------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type                 | String | 트랜잭션 타입. "ACCOUNT_UPDATE"                                                                                                                                                                                     |
| from                 | String | 이 트랜잭션 발신자의 주소입니다. 이 계정이 이 트랜잭션에 의해 업데이트 될 것입니다.                                                                                                                                                              |
| gas                  | Number | 트랜잭션에 지불할 의향이 있는 최대 가스량(사용하지 않은 가스는 환불됨).                                                                                                                                                                     |
| gasPrice             | Number | (optional) Gas price provided by the sender in peb. The gasPrice must be the same as the unitPrice set in the Klaytn node.                                                                                    |
| nonce                | Number | (optional) Integer of a nonce. If omitted, it will be set by caver-js via calling `caver.klay.getTransactionCount`.                                                                                           |
| key                  | Object | (선택사항) `AccountForUpdate` 인스턴스. 계정을 업데이트할 때 사용할 주소와 키가 포함된 인스턴스. 키 유형별 AccountForUpdate 인스턴스를 생성하는 방법은 [caver.klay.accounts.createAccountForUpdate](../caver.klay.accounts.md#createaccountforupdate)를 참조하세요. |
| legacyKey            | Bool   | (선택사항) 레거시 키를 가지도록 계정을 업데이트하는 경우 이 값을 true로 설정하세요.                                                                                                                                                            |
| publicKey            | String | (선택사항) 공개키를 가지도록 계정을 업데이트하는 경우 64 바이트 공개키를 입력하세요.                                                                                                                                                             |
| multisig             | Object | (선택사항) 다중 서명 키를 가지도록 계정을 업데이트하는 경우 다중 서명을 구성하는 가중 공개 키 목록을 입력하세요. 다중 서명은 임계값도 정의합니다. 트랜잭션에 서명할 때 서명의 가중치 합계는 임계값 이상이어야 합니다.                                                                                   |
| roleTransactionKey   | Object | (선택사항) 역할 기반 키를 가지도록 계정을 업데이트하는 경우 roleTransactionKey를 입력하세요. roleTransactionKey는 공개키 또는 다중 서명 키일 수 있습니다. 이 roleTransactionKey는 트랜잭션에 서명할 때 사용됩니다.                                                            |
| roleAccountUpdateKey | Object | (선택사항) 역할 기반 키를 가지도록 계정을 업데이트하는 경우 roleAccountUpdateKey를 입력하세요. roleAccountUpdateKey는 공개키 또는 다중 서명 키일 수 있습니다. 이 roleAccountUpdateKey는 AccountUpdate 트랜잭션에 서명할 때 사용됩니다.                                        |
| roleFeePayerKey      | Object | (선택사항) 역할 기반 키를 가지도록 계정을 업데이트하는 경우 roleFeePayerKey를 입력하세요. roleFeePayerKey는 공개키 또는 다중 서명 키일 수 있습니다. 이 roleFeePayerKey는 feePayer로 트랜잭션에 서명할 때 사용됩니다.                                                           |
| failKey              | Bool   | (선택사항) fail key를 가지도록 계정을 업데이트하는 경우 true로 설정하세요.                                                                                                                                                              |

`caver.klay.sendTransaction`로 위의  `ACCOUNT_UPDATE` 트랜잭션 객체를 호출하면, caver-js는 이 트랜잭션 객체를 인메모리 지갑 내부에 있는 발신자 계정(`from`)의 키로 서명한 후에 Klaytn 네트워크로 보낼 것입니다.

**Return Value**

The `callback` will return the 32-byte transaction hash.

`PromiEvent`: A promise combined event emitter. Will be resolved when the transaction receipt is available. Additionally the following events are available:

- `"transactionHash"` returns `String`: Is fired right after the transaction is sent and a transaction hash is available.
- `"receipt"` returns `Object`: Is fired when the transaction receipt is available.
- `"error"` returns `Error`: Is fired if an error occurs during sending. On an out-of-gas error, the second parameter is the receipt.

**Example**

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
.on('error', console.error); // If an out-of-gas error, the second parameter is the receipt.

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
.on('error', console.error); // If an out-of-gas error, the second parameter is the receipt.

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
.on('error', console.error); // If an out-of-gas error, the second parameter is the receipt.

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
.on('error', console.error); // If an out-of-gas error, the second parameter is the receipt.

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
.on('error', console.error); // If an out-of-gas error, the second parameter is the receipt.
```


## sendTransaction (FEE_DELEGATED_ACCOUNT_UPDATE) <a id="sendtransaction-fee_delegated_account_update"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
[Fee Delegated Account Update](../../../../../../klaytn/design/transactions/fee-delegation.md#txtypefeedelegatedaccountupdate) 트랜잭션을 네트워크에 전송합니다.

수수료 납부자가 트랜잭션에 서명하고 네트워크에 보내는 방법은 두 가지가 있습니다.

1. `caver.klay.sendTransaction`에 `{senderRawTransaction: rawTransaction, feePayer: feePayerAddress}`객체를 넘겨 호출하는 방법. 이 객체는 수수료 납부자가 사용하는 트랜잭션 형식입니다. 이 경우, 수수료 납부자 계정이 caver-js의 인메모리 지갑에 있어야 합니다.
2. [caver.klay.accounts.feePayerSignTransaction](../caver.klay.accounts.md#feepayersigntransaction)로 서명하고 [caver.klay.sendSignedTransaction](./transaction.md#sendsignedtransaction)로 네트워크로 전송하는 방법.

여기서 보여주는 예제는 `caver.klay.sendTransaction`을 사용하는 방법만 설명합니다.

`caver.klay.accounts.feePayerSignTransaction`과 `caver.klay.sendSignedTransaction`으로 보내는 방법에 관한 정보는 [caver.klay.accounts.feePayerSignTransaction](../caver.klay.accounts.md#feepayersigntransaction)과 [Sending a Transaction with multiple signer](../../getting-started_1.4.1.md#sending-a-transaction-with-multiple-signer)를 참조하십시오.

**Parameters**

The parameters of sendTransaction are a transaction object and a callback function.

| Name              | Type     | Description                                                                                                |
| ----------------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| transactionObject | Object   | The transaction object to send.                                                                            |
| callback          | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

`FEE_DELEGATED_ACCOUNT_UPDATE` 트랜잭션 객체의 구조는 다음과 같습니다.

| Name                 | Type   | Description                                                                                                                                                                                                                                                                                          |
| -------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type                 | String | 트랜잭션 타입. "FEE_DELEGATED_ACCOUNT_UPDATE"                                                                                                                                                                                                                                                            |
| from                 | String | Address of this transaction sender. This account will be updated by this transaction.                                                                                                                                                                                                                |
| gas                  | Number | The maximum amount of gas willing to pay for the transaction (unused gas is refunded).                                                                                                                                                                                                               |
| gasPrice             | Number | (optional) Gas price provided by the sender in peb. The gasPrice must be the same as the unitPrice set in the Klaytn node.                                                                                                                                                                           |
| nonce                | Number | (optional) Integer of a nonce. If omitted, it will be set by caver-js via calling `caver.klay.getTransactionCount`.                                                                                                                                                                                  |
| key                  | Object | (optional) An `AccountForUpdate` instance containing the address and key to be used when updating the account. For instructions on how to create an AccountForUpdate instance for each key type, see [caver.klay.accounts.createAccountForUpdate](../caver.klay.accounts.md#createaccountforupdate). |
| legacyKey            | Bool   | (optional) if updating the account to have a legacy key, set this true.                                                                                                                                                                                                                              |
| publicKey            | String | (optional) if updating the account to have a public key, write down the 64 bytes public key.                                                                                                                                                                                                         |
| multisig             | Object | (optional) if updating the account to have a multisig key, write down the list of weighted public keys that make up the multisig. multisig also defines the threshold. When signing a transaction, the sum of the weights of the signatures must be larger than or equal to the threshold.           |
| roleTransactionKey   | Object | (optional) if updating the account to have a role-based key, write down roleTransactionKey. roleTransactionKey can be a public key or a multisig key. This roleTransactionKey will be used when signing a transaction.                                                                               |
| roleAccountUpdateKey | Object | (optional) if updating the account to have a role-based key, write down roleAccountUpdateKey. roleAccountUpdateKey can be a public key or a multisig key. This roleAccountUpdateKey will be used when signing an AccountUpdate transaction.                                                          |
| roleFeePayerKey      | Object | (optional) if updating the account to have a role-based key, write down roleFeePayerKey. roleFeePayerKey can be a public key or a multisig key. This roleFeePayerKey will be used when signing a transaction as a feePayer.                                                                          |
| failKey              | Bool   | (optional) if updating the account to have a fail key, set this true.                                                                                                                                                                                                                                |

위의 구조를 가진 `FEE_DELEGATED_ACCOUNT_UPDATE` 유형의 트랜잭션 오브젝트, 또는  `FEE_DELEGATED_ACCOUNT_UPDATE` 유형의 `RLP 인코딩된 트랜잭션`은 트랜잭션 발신자의 경우 [caver.klay.accounts.signTransaction](../caver.klay.accounts.md#signtransaction)의 매개 변수로, 수수료 납부자의 경우 [ caver.klay.accounts.feePayerSignTransaction](../caver.klay.accounts.md#feepayersigntransaction)의 매개 변수로 사용할 수 있습니다.

수수료 납부자가 트랜잭션 발신자가 서명한 RLP 인코딩된 트랜잭션에 서명하고 이를 네트워크로 전송하려면 다음 구조로 오브젝트를 정의하고 `caver.klay.sendTransaction`을 호출하세요.

| Name                 | Type   | Description                               |
| -------------------- | ------ | ----------------------------------------- |
| feePayer             | String | The fee payer address of the transaction. |
| senderRawTransaction | String | 발신자가 서명한 RLP 인코딩된 트랜잭션.                   |

**Return Value**

The `callback` will return the 32-byte transaction hash.

`PromiEvent`: A promise combined event emitter. Will be resolved when the transaction receipt is available. Additionally the following events are available:

- `"transactionHash"` returns `String`: Is fired right after the transaction is sent and a transaction hash is available.
- `"receipt"` returns `Object`: Is fired when the transaction receipt is available.
- `"error"` returns `Error`: Is fired if an error occurs during sending. On an out-of-gas error, the second parameter is the receipt.

**Example**

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
[Fee Delegated Account Update With Ratio](../../../../../../klaytn/design/transactions/partial-fee-delegation.md#txtypefeedelegatedaccountupdatewithratio) 트랜잭션을 네트워크에 전송합니다.

수수료 납부자가 트랜잭션에 서명하고 네트워크에 보내는 방법은 두 가지가 있습니다.

1. `caver.klay.sendTransaction`에 수수료 납부자가 사용하는 트랜잭션 형식(`senderRawTransaction`과 `feePayer`를 가진 객체)을 넘겨 호출하는 방법. 이 경우, 수수료 납부자 계정이 caver-js의 인메모리 지갑에 있어야 합니다.
2. Sign with [caver.klay.accounts.feePayerSignTransaction](../caver.klay.accounts.md#feepayersigntransaction) and send to network via [caver.klay.sendSignedTransaction](./transaction.md#sendsignedtransaction)

The example here only describes how to use `caver.klay.sendTransaction`.

For information on how to send using `caver.klay.accounts.feePayerSignTransaction` and `caver.klay.sendSignedTransaction`, see [caver.klay.accounts.feePayerSignTransaction](../caver.klay.accounts.md#feepayersigntransaction) and [Sending a Transaction with multiple signer](../../getting-started_1.4.1.md#sending-a-transaction-with-multiple-signer).

**Parameters**

sendTransaction의 매개 변수는 트랜잭션 객체 및 콜백 함수입니다.

| Name              | Type     | Description                                                                                                |
| ----------------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| transactionObject | Object   | The transaction object to send.                                                                            |
| callback          | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

`FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO` 트랜잭션 오브젝트는 아래와 같은 구조를 가집니다.

| Name                 | Type   | Description                                                                                                                                                                                                                                                                                          |
| -------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type                 | String | "FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO" 트랜잭션 타입.                                                                                                                                                                                                                                               |
| from                 | String | Address of this transaction sender. This account will be updated by this transaction.                                                                                                                                                                                                                |
| gas                  | Number | The maximum amount of gas willing to pay for the transaction (unused gas is refunded).                                                                                                                                                                                                               |
| gasPrice             | Number | (optional) Gas price provided by the sender in peb. The gasPrice must be the same as the unitPrice set in the Klaytn node.                                                                                                                                                                           |
| nonce                | Number | (optional) Integer of a nonce. If omitted, it will be set by caver-js via calling `caver.klay.getTransactionCount`.                                                                                                                                                                                  |
| key                  | Object | (optional) An `AccountForUpdate` instance containing the address and key to be used when updating the account. For instructions on how to create an AccountForUpdate instance for each key type, see [caver.klay.accounts.createAccountForUpdate](../caver.klay.accounts.md#createaccountforupdate). |
| legacyKey            | Bool   | (optional) if updating the account to have a legacy key, set this true.                                                                                                                                                                                                                              |
| publicKey            | String | (optional) if updating the account to have a public key, write down the 64 bytes public key.                                                                                                                                                                                                         |
| multisig             | Object | (optional) if updating the account to have a multisig key, write down the list of weighted public keys that make up the multisig. multisig also defines the threshold. When signing a transaction, the sum of the weights of the signatures must be larger than or equal to the threshold.           |
| roleTransactionKey   | Object | (optional) if updating the account to have a role-based key, write down roleTransactionKey. roleTransactionKey can be a public key or a multisig key. This roleTransactionKey will be used when signing a transaction.                                                                               |
| roleAccountUpdateKey | Object | (optional) if updating the account to have a role-based key, write down roleAccountUpdateKey. roleAccountUpdateKey can be a public key or a multisig key. This roleAccountUpdateKey will be used when signing an AccountUpdate transaction.                                                          |
| roleFeePayerKey      | Object | (optional) if updating the account to have a role-based key, write down roleFeePayerKey. roleFeePayerKey can be a public key or a multisig key. This roleFeePayerKey will be used when signing a transaction as a feePayer.                                                                          |
| failKey              | Bool   | (optional) if updating the account to have a fail key, set this true.                                                                                                                                                                                                                                |

위의 구조를 가진 `FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO` 유형의 트랜잭션 오브젝트, 또는  `FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO` 유형의 `RLP 인코딩된 트랜잭션`은 트랜잭션 발신자의 경우 [caver.klay.accounts.signTransaction](../caver.klay.accounts.md#signtransaction)의 매개 변수로, 수수료 납부자의 경우 [ caver.klay.accounts.feePayerSignTransaction](../caver.klay.accounts.md#feepayersigntransaction)의 매개 변수로 사용할 수 있습니다.

In order for the fee payer to sign an RLP encoded transaction signed by the sender and send it to the network, define an object with the following structure and call `caver.klay.sendTransaction`.

| Name                 | Type   | Description                                   |
| -------------------- | ------ | --------------------------------------------- |
| feePayer             | String | The fee payer address of the transaction.     |
| senderRawTransaction | String | The RLP-encoded transaction signed by sender. |

**Return Value**

The `callback` will return the 32-byte transaction hash.

`PromiEvent`: A promise combined event emitter. Will be resolved when the transaction receipt is available. Additionally the following events are available:

- `"transactionHash"` returns `String`: Is fired right after the transaction is sent and a transaction hash is available.
- `"receipt"` returns `Object`: Is fired when the transaction receipt is available.
- `"error"` returns `Error`: Is fired if an error occurs during sending. On an out-of-gas error, the second parameter is the receipt.

**Example**

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
