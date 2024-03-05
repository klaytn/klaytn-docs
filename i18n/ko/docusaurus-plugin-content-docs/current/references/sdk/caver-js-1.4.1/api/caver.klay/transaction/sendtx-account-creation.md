# 계정 생성 트랜잭션

## sendTransaction (ACCOUNT_CREATION) <a id="sendtransaction-account_creation"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```

[계정 생성](../../../../../../learn/transactions/basic.md) 트랜잭션을 네트워크에 전송합니다.

**Parameters**

| Name                                   | Type                                | Description                                                                                                                                                     |
| -------------------------------------- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| transactionObject                      | Object                              | 전송할 트랜잭션 객체입니다.                                                                                                                                                 |
| transactionObject.type                 | String                              | "ACCOUNT_CREATION" 트랜잭션의 유형입니다.                                                                                                            |
| transactionObject.from                 | String                              | 트랜잭션의 발신자 주소입니다.                                                                                                                                                |
| transactionObject.to                   | String                              | 새로 생성될 주소입니다.                                                                                                                                                   |
| transactionObject.value                | Number \| String \| BN \| BigNumber | 새로 생성된 계정에 대해 이체된 값입니다(단위: peb).                                                                                                             |
| transactionObject.gas                  | Number                              | 거래에 사용할 가스 양(사용하지 않은 가스는 환불됩니다).                                                                                                             |
| transactionObject.gasPrice             | Number                              | (선택 사항) 발신자가 peb으로 제공한 가스 가격. 가스 가격은 Klaytn 노드에 설정된 단위가격과 동일해야 합니다.                                                                          |
| transactionObject.nonce                | Number                              | (선택 사항) nonce의 정수입니다. 생략할 경우, `caver.klay.getTransactionCount` 호출을 통해 caver-js가 설정합니다.                                                       |
| transactionObject.publicKey            | String                              | (선택 사항) 공개 키로 계정을 만드는 경우 64바이트의 공개 키를 적어 둡니다.                                                                                                |
| transactionObject.multisig             | String                              | (선택 사항) 다중 서명 키로 계정을 만드는 경우, 여러 개의 공개 키로 다중 서명을 기록합니다. 다중 서명을 구성하는 공개 키에는 고유한 가중치가 있습니다. 다중 서명으로 서명된 트랜잭션의 경우, 서명의 가중치 합이 임계값보다 크거나 같아야 합니다. |
| transactionObject.roleTransactionKey   | String                              | (선택 사항) 역할 기반 키로 계정을 만드는 경우, 공개 키 또는 다중 서명 키와 함께 roleTransactionKey를 기록합니다. 이 roleTransactionKey는 트랜잭션에 서명할 때 사용됩니다.                         |
| transactionObject.roleAccountUpdateKey | String                              | (선택 사항) 역할 기반 키로 계정을 만드는 경우 공개 키 또는 다중 서명 키와 함께 roleAccountUpdateKey를 기록합니다. 이 roleAccountUpdateKey는 AccountUpdate 트랜잭션에 서명할 때 사용됩니다.        |
| transactionObject.roleFeePayerKey      | String                              | (선택 사항) 역할 기반 키로 계정을 만드는 경우, 공개 키 또는 다중서명 키와 함께 roleFeePayerKey를 기록합니다. 이 roleFeePayerKey는 feePayer로 트랜잭션에 서명할 때 사용됩니다.                      |
| transactionObject.failKey              | Bool                                | (선택 사항) 실패 키로 계정을 생성하는 경우 true로 설정합니다.                                                                                                       |
| callback                               | Function                            | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다.                                                                               |

**리턴 값**

`callback`은 32바이트 트랜잭션 해시를 반환합니다.

`PromiEvent`: 프라미스 결합 이벤트 이미터입니다. 트랜잭션 영수증을 사용할 수 있을 때 해결됩니다. 추가로 다음과 같은 이벤트를 사용할 수 있습니다:

- `"transactionHash"`는 `String`을 반환합니다: 트랜잭션이 전송되고 트랜잭션 해시를 사용할 수 있는 직후에 발생합니다.
- `"receipt"`는 `Object`를 반환합니다: 트랜잭션 영수증을 사용할 수 있을 때 발생합니다.
- `"error"`는 `Error`를 반환합니다: 전송 중 에러가 발생하면 발생합니다. 가스 부족 에러의 경우 두 번째 파라미터는 영수증입니다.

**예제**

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
.on('error', console.error); // If an out-of-gas error, the second parameter is the receipt.

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
