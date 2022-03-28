# 계정 생성 트랜잭션<a id="account-creation-transaction"></a>

## sendTransaction (ACCOUNT_CREATION) <a id="sendtransaction-account_creation"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
[Account Creation](../../../../../../klaytn/design/transactions/basic.md) 트랜잭션을 네트워크에 전송합니다.

**Parameters**

| 이름                                     | 타입                                              | 설명                                                                                                                                            |
| -------------------------------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| transactionObject                      | Object                                          | 전송하려는 트랜잭션 객체.                                                                                                                                |
| transactionObject.type                 | String                                          | "ACCOUNT_CREATION" 트랜잭션 타입.                                                                                                                   |
| transactionObject.from                 | String                                          | 트랜잭션 발신자의 주소.                                                                                                                                 |
| transactionObject.to                   | String                                          | 새로 생성될 주소.                                                                                                                                    |
| transactionObject.value                | Number &#124; String &#124; BN &#124; BigNumber | 새로 생성될 어카운트에 전송할 값으로 단위는 peb.                                                                                                                 |
| transactionObject.gas                  | Number                                          | 트랜잭션에 사용할 가스량(사용하지 않은 가스는 환불됨).                                                                                                               |
| transactionObject.gasPrice             | Number                                          | (선택사항) 트랜잭션 발신자가 설정한 가스 가격으로 단위는 peb입니다. gasPrice는 Klaytn 노드에 설정된 unitPrice와 같아야 합니다.                                                         |
| transactionObject.nonce                | Number                                          | (선택사항) 논스의 정숫값입니다. 생략하면 `caver.klay.getTransactionCount` 값으로 caver-js가 설정합니다.                                                                 |
| transactionObject.publicKey            | String                                          | (선택사항) 공개키로 계정을 생성하는 경우 64 바이트의 공개키를 입력하세요.                                                                                                   |
| transactionObject.multisig             | String                                          | (선택사항) 다중 서명 키로 계정을 생성하는 경우 multisig에 여러 개의 공개키를 입력하세요. 다중 서명 키를 구성하는 공개키는 각자 가중치를 가집니다. multisig로 서명된 트랜잭션의 경우 서명 가중치의 합이 임계값보다 크거나 같아야 합니다. |
| transactionObject.roleTransactionKey   | String                                          | (선택사항) 역할 기반 키를 가지는 계정을 생성하는 경우 roleTransactionKey에  공개키 또는 다중 서명 키를 입력하세요. 이 roleTransactionKey는 트랜잭션에 서명할 때 사용됩니다.                          |
| transactionObject.roleAccountUpdateKey | String                                          | (선택사항) 역할 기반 키를 가지는 계정을 생성하는 경우 roleAccountUpdateKey에  공개키 또는 다중 서명 키를 입력하세요. 이 roleAccountUpdateKey는 AccountUpdate 트랜잭션에 서명할 때 사용됩니다.        |
| transactionObject.roleFeePayerKey      | String                                          | (선택사항) 역할 기반 키를 가지는 계정을 생성하는 경우 rroleFeePayerKey에  공개키 또는 다중 서명 키를 입력하세요. 이 roleFeePayerKey는 feePayer로 트랜잭션에 서명할 때 사용됩니다.                     |
| transactionObject.failKey              | Bool                                            | (선택사항) fail key를 가지는 계정을 생성하는 경우 true로 설정하세요.                                                                                                 |
| callback                               | Function                                        | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다.                                                                          |

**리턴값**

`callback`은 32바이트 트랜잭션 해시를 반환합니다.

`PromiEvent`: 프로미스(promise)가 조합된 이벤트 이미터(event emitter). 트랜잭션 영수증이 준비되면 resolve 됩니다. 추가로 다음 이벤트가 발생할 수 있습니다.

- `"transactionHash"`는 `String`를 반환: 트랜잭션을 보내고 트랜잭션 해시가 준비된 직후에 발생.
- `"receipt"`는 `Object`를 반환: 트랜잭션 영수중이 중비되면 발생.
- `"error"`는 `Error`를 반환: 전송 중 에러가 발생하면 발생. 가스 부족 에러(out-of-gas)가 발생한 경우 두 번째 인자는 트랜잭션 영수증입니다.

**예시**

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
.on('error', console.error); // 가스 부족 에러(out-of-gas)가 발생한 경우 두 번째 인자는 트랜잭션 영수증입니다.

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
.on('error', console.error); // 가스 부족 에러(out-of-gas)가 발생한 경우 두 번째 인자는 트랜잭션 영수증입니다.

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
.on('error', console.error); // 가스 부족 에러(out-of-gas)가 발생한 경우 두 번째 인자는 트랜잭션 영수증입니다.

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
.on('error', console.error); // 가스 부족 에러(out-of-gas)가 발생한 경우 두 번째 인자는 트랜잭션 영수증입니다.

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
.on('error', console.error); // 가스 부족 에러(out-of-gas)가 발생한 경우 두 번째 인자는 트랜잭션 영수증입니다.

```
