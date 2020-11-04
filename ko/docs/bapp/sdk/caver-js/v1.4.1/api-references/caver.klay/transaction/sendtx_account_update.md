# Account Update

## sendTransaction \(ACCOUNT\_UPDATE\) <a id="sendtransaction-account_update"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```

Sends an [Account Update](../../../../../../../klaytn/design/transactions/basic.md#txtypeaccountupdate) transaction to the network.

**매개변수**

sendTransaction의 매개 변수는 트랜잭션 객체 및 콜백 함수입니다.

| 명칭                | 형식       | 설명                                                                                                             |
|:----------------- |:-------- |:-------------------------------------------------------------------------------------------------------------- |
| transactionObject | Object   | 전송하려는 트랜잭션 객체.                                                                                                 |
| callback          | Function | \(optional\) Optional callback, returns an error object as the first parameter and the result as the second. |

A transaction object of type `ACCOUNT_UPDATE` has the following structure: Note that when you provide the new key, you should provide just one of the below depending on the key type. 둘 이상이 입력되면  'duplicated key' 오류가 발생합니다. caver-js v1.2.0부터는 `AccountForUpdate`객체를 생성하여 `key` 필드에 입력하는 것을 권장합니다.

* key
* legacyKey
* publicKey
* multisig
* roleTransactionKey, roleAccountUpdateKey, roleFeePayerKey
* failKey

| 명칭                   | 형식     | 설명                                                                                                                                                                                                                                                                                                          |
|:-------------------- |:------ |:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 형식                   | String | 트랜잭션 타입. "ACCOUNT\_UPDATE"                                                                                                                                                                                                                                                                                |
| from                 | String | 이 트랜잭션 발신자의 주소입니다. 이 계정이 이 트랜잭션에 의해 업데이트 될 것입니다.                                                                                                                                                                                                                                                            |
| gas                  | Number | The maximum amount of gas willing to pay for the transaction \(unused gas is refunded\).                                                                                                                                                                                                                  |
| gasPrice             | Number | \(optional\) Gas price provided by the sender in peb. gasPrice는 Klaytn 노드에 설정된 unitPrice와 같아야 합니다.                                                                                                                                                                                                        |
| 논스                   | Number | \(optional\) Integer of a nonce. 생략하면 `caver.klay.getTransactionCount` 값으로 caver-js가 설정합니다.                                                                                                                                                                                                               |
| key                  | Object | \(optional\) An `AccountForUpdate` instance containing the address and key to be used when updating the account. For instructions on how to create an AccountForUpdate instance for each key type, see [caver.klay.accounts.createAccountForUpdate](../../caver.klay.accounts.md#createaccountforupdate). |
| legacyKey            | Bool   | \(optional\) if updating the account to have a legacy key, set this true.                                                                                                                                                                                                                                 |
| publicKey            | String | \(optional\) if updating the account to have a public key, write down the 64 bytes public key.                                                                                                                                                                                                            |
| multisig             | Object | \(optional\) if updating the account to have a multisig key, write down the list of weighted public keys that make up the multisig. 다중 서명은 임계값도 정의합니다. 트랜잭션에 서명할 때 서명의 가중치 합계는 임계값 이상이어야 합니다.                                                                                                             |
| roleTransactionKey   | Object | \(optional\) if updating the account to have a role-based key, write down roleTransactionKey. roleTransactionKey는 공개키 또는 다중 서명 키일 수 있습니다. 이 roleTransactionKey는 트랜잭션에 서명할 때 사용됩니다.                                                                                                                        |
| roleAccountUpdateKey | Object | \(optional\) if updating the account to have a role-based key, write down roleAccountUpdateKey. roleAccountUpdateKey는 공개키 또는 다중 서명 키일 수 있습니다. 이 roleAccountUpdateKey는 AccountUpdate 트랜잭션에 서명할 때 사용됩니다.                                                                                                    |
| roleFeePayerKey      | Object | \(optional\) if updating the account to have a role-based key, write down roleFeePayerKey. roleFeePayerKey는 공개키 또는 다중 서명 키일 수 있습니다. 이 roleFeePayerKey는 feePayer로 트랜잭션에 서명할 때 사용됩니다.                                                                                                                       |
| failKey              | Bool   | \(optional\) if updating the account to have a fail key, set this true.                                                                                                                                                                                                                                   |

If you call `caver.klay.sendTransaction` with a transaction object of type `ACCOUNT_UPDATE` as in the above, caver-js will send it to the network after signing with the key of the sender account \(`from`\) inside the in-memory wallet.

**리턴값**

`callback`은 32바이트 트랜잭션 해시를 반환합니다.

`PromiEvent`: 프로미스(promise)가 조합된 이벤트 이미터(event emitter). 트랜잭션 영수증이 준비되면 resolve 됩니다. 추가로 다음 이벤트가 발생할 수 있습니다.

* `"transactionHash"`는 `String`를 반환: 트랜잭션을 보내고 트랜잭션 해시가 준비된 직후에 발생.
* `"receipt"`는 `Object`를 반환: 트랜잭션 영수중이 중비되면 발생.
* `"error"`는 `Error`를 반환: 전송 중 에러가 발생하면 발생. 가스 부족 에러(out-of-gas)가 발생한 경우 두 번째 인자는 트랜잭션 영수증입니다.

**예시**

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
.on('error', console.error); // 가스 부족 에러(out-of-gas)가 발생한 경우 두 번째 인자는 트랜잭션 영수증입니다.

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
.on('error', console.error); // 가스 부족 에러(out-of-gas)가 발생한 경우 두 번째 인자는 트랜잭션 영수증입니다.

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
.on('error', console.error); // 가스 부족 에러(out-of-gas)가 발생한 경우 두 번째 인자는 트랜잭션 영수증입니다.

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
.on('error', console.error); // 가스 부족 에러(out-of-gas)가 발생한 경우 두 번째 인자는 트랜잭션 영수증입니다.

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
.on('error', console.error); // 가스 부족 에러(out-of-gas)가 발생한 경우 두 번째 인자는 트랜잭션 영수증입니다.
```

## sendTransaction \(FEE\_DELEGATED\_ACCOUNT\_UPDATE\) <a id="sendtransaction-fee_delegated_account_update"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```

Sends a [Fee Delegated Account Update](../../../../../../../klaytn/design/transactions/fee-delegation.md#txtypefeedelegatedaccountupdate) transaction to the network.

수수료 납부자가 트랜잭션에 서명하고 네트워크에 보내는 방법은 두 가지가 있습니다.

1. `caver.klay.sendTransaction`에 `{senderRawTransaction: rawTransaction, feePayer: feePayerAddress}`객체를 넘겨 호출하는 방법. 이 객체는 수수료 납부자가 사용하는 트랜잭션 형식입니다. 이 경우, 수수료 납부자 계정이 caver-js의 인메모리 지갑에 있어야 합니다.
2. Sign with [caver.klay.accounts.feePayerSignTransaction](../../caver.klay.accounts.md#feepayersigntransaction) and send to network via [caver.klay.sendSignedTransaction](./#sendsignedtransaction)

여기서 보여주는 예제는 `caver.klay.sendTransaction`을 사용하는 방법만 설명합니다.

For information on how to send using `caver.klay.accounts.feePayerSignTransaction` and `caver.klay.sendSignedTransaction`, see [caver.klay.accounts.feePayerSignTransaction](../../caver.klay.accounts.md#feepayersigntransaction) and [Sending a Transaction with multiple signer](../../../getting-started_1.4.1.md#sending-a-transaction-with-multiple-signer).

**매개변수**

sendTransaction의 매개 변수는 트랜잭션 객체 및 콜백 함수입니다.

| 명칭                | 형식       | 설명                                                                                                             |
|:----------------- |:-------- |:-------------------------------------------------------------------------------------------------------------- |
| transactionObject | Object   | 전송하려는 트랜잭션 객체.                                                                                                 |
| callback          | Function | \(optional\) Optional callback, returns an error object as the first parameter and the result as the second. |

`FEE_DELEGATED_ACCOUNT_UPDATE` 트랜잭션 객체의 구조는 다음과 같습니다.

| 명칭                   | 형식     | 설명                                                                                                                                                                                                                                                                                                          |
|:-------------------- |:------ |:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 형식                   | String | 트랜잭션 타입. "FEE\_DELEGATED\_ACCOUNT\_UPDATE"                                                                                                                                                                                                                                                            |
| from                 | String | 이 트랜잭션 발신자의 주소입니다. 이 계정이 이 트랜잭션에 의해 업데이트 될 것입니다.                                                                                                                                                                                                                                                            |
| gas                  | Number | The maximum amount of gas willing to pay for the transaction \(unused gas is refunded\).                                                                                                                                                                                                                  |
| gasPrice             | Number | \(optional\) Gas price provided by the sender in peb. gasPrice는 Klaytn 노드에 설정된 unitPrice와 같아야 합니다.                                                                                                                                                                                                        |
| 논스                   | Number | \(optional\) Integer of a nonce. 생략하면 `caver.klay.getTransactionCount` 값으로 caver-js가 설정합니다.                                                                                                                                                                                                               |
| key                  | Object | \(optional\) An `AccountForUpdate` instance containing the address and key to be used when updating the account. For instructions on how to create an AccountForUpdate instance for each key type, see [caver.klay.accounts.createAccountForUpdate](../../caver.klay.accounts.md#createaccountforupdate). |
| legacyKey            | Bool   | \(optional\) if updating the account to have a legacy key, set this true.                                                                                                                                                                                                                                 |
| publicKey            | String | \(optional\) if updating the account to have a public key, write down the 64 bytes public key.                                                                                                                                                                                                            |
| multisig             | Object | \(optional\) if updating the account to have a multisig key, write down the list of weighted public keys that make up the multisig. 다중 서명은 임계값도 정의합니다. 트랜잭션에 서명할 때 서명의 가중치 합계는 임계값 이상이어야 합니다.                                                                                                             |
| roleTransactionKey   | Object | \(optional\) if updating the account to have a role-based key, write down roleTransactionKey. roleTransactionKey는 공개키 또는 다중 서명 키일 수 있습니다. 이 roleTransactionKey는 트랜잭션에 서명할 때 사용됩니다.                                                                                                                        |
| roleAccountUpdateKey | Object | \(optional\) if updating the account to have a role-based key, write down roleAccountUpdateKey. roleAccountUpdateKey는 공개키 또는 다중 서명 키일 수 있습니다. 이 roleAccountUpdateKey는 AccountUpdate 트랜잭션에 서명할 때 사용됩니다.                                                                                                    |
| roleFeePayerKey      | Object | \(optional\) if updating the account to have a role-based key, write down roleFeePayerKey. roleFeePayerKey는 공개키 또는 다중 서명 키일 수 있습니다. 이 roleFeePayerKey는 feePayer로 트랜잭션에 서명할 때 사용됩니다.                                                                                                                       |
| failKey              | Bool   | \(optional\) if updating the account to have a fail key, set this true.                                                                                                                                                                                                                                   |

A transaction object of type `FEE_DELEGATED_ACCOUNT_UPDATE` with the above structure or an `RLP-encoded transaction` of type `FEE_DELEGATED_ACCOUNT_UPDATE` can be used as a parameter in [caver.klay.accounts.signTransaction](../../caver.klay.accounts.md#signtransaction) for sender and in [caver.klay.accounts.feePayerSignTransaction](../../caver.klay.accounts.md#feepayersigntransaction) for fee payer.

수수료 납부자가 트랜잭션 발신자가 서명한 RLP 인코딩된 트랜잭션에 서명하고 이를 네트워크로 전송하려면 다음 구조로 오브젝트를 정의하고 `caver.klay.sendTransaction`을 호출하세요.

| 명칭                   | 형식     | 설명                      |
|:-------------------- |:------ |:----------------------- |
| feePayer             | String | 트랜잭션 수수료 납부자의 주소.       |
| senderRawTransaction | String | 발신자가 서명한 RLP 인코딩된 트랜잭션. |

**리턴값**

`callback`은 32바이트 트랜잭션 해시를 반환합니다.

`PromiEvent`: 프로미스(promise)가 조합된 이벤트 이미터(event emitter). 트랜잭션 영수증이 준비되면 resolve 됩니다. 추가로 다음 이벤트가 발생할 수 있습니다.

* `"transactionHash"`는 `String`를 반환: 트랜잭션을 보내고 트랜잭션 해시가 준비된 직후에 발생.
* `"receipt"`는 `Object`를 반환: 트랜잭션 영수중이 중비되면 발생.
* `"error"`는 `Error`를 반환: 전송 중 에러가 발생하면 발생. 가스 부족 에러(out-of-gas)가 발생한 경우 두 번째 인자는 트랜잭션 영수증입니다.

**예시**

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

## sendTransaction \(FEE\_DELEGATED\_ACCOUNT\_UPDATE\_WITH\_RATIO\) <a id="sendtransaction-fee_delegated_account_update_with_ratio"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```

Sends a [Fee Delegated Account Update With Ratio](../../../../../../../klaytn/design/transactions/partial-fee-delegation.md#txtypefeedelegatedaccountupdatewithratio) transaction to the network.

수수료 납부자가 트랜잭션에 서명하고 네트워크에 보내는 방법은 두 가지가 있습니다.

1. Call `caver.klay.sendTransaction` with fee payer transaction format \(An object that defines `senderRawTransaction` and `feepayer`\). 이 경우, 수수료 납부자 계정이 caver-js의 인메모리 지갑에 있어야 합니다.
2. Sign with [caver.klay.accounts.feePayerSignTransaction](../../caver.klay.accounts.md#feepayersigntransaction) and send to network via [caver.klay.sendSignedTransaction](./#sendsignedtransaction)

여기서 보여주는 예제는 `caver.klay.sendTransaction`을 사용하는 방법만 설명합니다.

For information on how to send using `caver.klay.accounts.feePayerSignTransaction` and `caver.klay.sendSignedTransaction`, see [caver.klay.accounts.feePayerSignTransaction](../../caver.klay.accounts.md#feepayersigntransaction) and [Sending a Transaction with multiple signer](../../../getting-started_1.4.1.md#sending-a-transaction-with-multiple-signer).

**매개변수**

sendTransaction의 매개 변수는 트랜잭션 객체 및 콜백 함수입니다.

| 명칭                | 형식       | 설명                                                                                                             |
|:----------------- |:-------- |:-------------------------------------------------------------------------------------------------------------- |
| transactionObject | Object   | 전송하려는 트랜잭션 객체.                                                                                                 |
| callback          | Function | \(optional\) Optional callback, returns an error object as the first parameter and the result as the second. |

`FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO` 트랜잭션 오브젝트는 아래와 같은 구조를 가집니다.

| 명칭                   | 형식     | 설명                                                                                                                                                                                                                                                                                                          |
|:-------------------- |:------ |:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 형식                   | String | The type of "FEE\_DELEGATED\_ACCOUNT\_UPDATE\_WITH\_RATIO" transaction.                                                                                                                                                                                                                           |
| from                 | String | 이 트랜잭션 발신자의 주소입니다. 이 계정이 이 트랜잭션에 의해 업데이트 될 것입니다.                                                                                                                                                                                                                                                            |
| gas                  | Number | The maximum amount of gas willing to pay for the transaction \(unused gas is refunded\).                                                                                                                                                                                                                  |
| gasPrice             | Number | \(optional\) Gas price provided by the sender in peb. gasPrice는 Klaytn 노드에 설정된 unitPrice와 같아야 합니다.                                                                                                                                                                                                        |
| 논스                   | Number | \(optional\) Integer of a nonce. 생략하면 `caver.klay.getTransactionCount` 값으로 caver-js가 설정합니다.                                                                                                                                                                                                               |
| key                  | Object | \(optional\) An `AccountForUpdate` instance containing the address and key to be used when updating the account. For instructions on how to create an AccountForUpdate instance for each key type, see [caver.klay.accounts.createAccountForUpdate](../../caver.klay.accounts.md#createaccountforupdate). |
| legacyKey            | Bool   | \(optional\) if updating the account to have a legacy key, set this true.                                                                                                                                                                                                                                 |
| publicKey            | String | \(optional\) if updating the account to have a public key, write down the 64 bytes public key.                                                                                                                                                                                                            |
| multisig             | Object | \(optional\) if updating the account to have a multisig key, write down the list of weighted public keys that make up the multisig. 다중 서명은 임계값도 정의합니다. 트랜잭션에 서명할 때 서명의 가중치 합계는 임계값 이상이어야 합니다.                                                                                                             |
| roleTransactionKey   | Object | \(optional\) if updating the account to have a role-based key, write down roleTransactionKey. roleTransactionKey는 공개키 또는 다중 서명 키일 수 있습니다. 이 roleTransactionKey는 트랜잭션에 서명할 때 사용됩니다.                                                                                                                        |
| roleAccountUpdateKey | Object | \(optional\) if updating the account to have a role-based key, write down roleAccountUpdateKey. roleAccountUpdateKey는 공개키 또는 다중 서명 키일 수 있습니다. 이 roleAccountUpdateKey는 AccountUpdate 트랜잭션에 서명할 때 사용됩니다.                                                                                                    |
| roleFeePayerKey      | Object | \(optional\) if updating the account to have a role-based key, write down roleFeePayerKey. roleFeePayerKey는 공개키 또는 다중 서명 키일 수 있습니다. 이 roleFeePayerKey는 feePayer로 트랜잭션에 서명할 때 사용됩니다.                                                                                                                       |
| failKey              | Bool   | \(optional\) if updating the account to have a fail key, set this true.                                                                                                                                                                                                                                   |

A transaction object of type `FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO` with the above structure or an `RLP-encoded transaction` of type `FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO` can be used as a parameter in [caver.klay.accounts.signTransaction](../../caver.klay.accounts.md#signtransaction) for sender and in [caver.klay.accounts.feePayerSignTransaction](../../caver.klay.accounts.md#feepayersigntransaction) for fee payer.

수수료 납부자가 트랜잭션 발신자가 서명한 RLP 인코딩된 트랜잭션에 서명하고 이를 네트워크로 전송하려면 다음 구조로 오브젝트를 정의하고 `caver.klay.sendTransaction`을 호출하세요.

| 명칭                   | 형식     | 설명                      |
|:-------------------- |:------ |:----------------------- |
| feePayer             | String | 트랜잭션 수수료 납부자의 주소.       |
| senderRawTransaction | String | 발신자가 서명한 RLP 인코딩된 트랜잭션. |

**리턴값**

`callback`은 32바이트 트랜잭션 해시를 반환합니다.

`PromiEvent`: 프로미스(promise)가 조합된 이벤트 이미터(event emitter). 트랜잭션 영수증이 준비되면 resolve 됩니다. 추가로 다음 이벤트가 발생할 수 있습니다.

* `"transactionHash"`는 `String`를 반환: 트랜잭션을 보내고 트랜잭션 해시가 준비된 직후에 발생.
* `"receipt"`는 `Object`를 반환: 트랜잭션 영수중이 중비되면 발생.
* `"error"`는 `Error`를 반환: 전송 중 에러가 발생하면 발생. 가스 부족 에러(out-of-gas)가 발생한 경우 두 번째 인자는 트랜잭션 영수증입니다.

**예시**

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

