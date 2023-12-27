# 계정 업데이트

## sendTransaction (ACCOUNT_UPDATE) <a id="sendtransaction-account_update"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
[계정 업데이트](../../../../../../learn/transactions/basic.md#txtypeaccountupdate) 트랜잭션을 네트워크로 전송합니다.

**매개변수**

sendTransaction의 매개 변수는 트랜잭션 객체와 콜백 함수입니다.

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| transactionObject | Object | 전송할 트랜잭션 오브젝트입니다. |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개 변수로 오류 개체를 반환하고 두 번째 매개 변수로 결과를 반환합니다. |

`ACCOUNT_UPDATE` 타입의 트랜잭션 객체는 다음과 같은 구조를 가집니다:
새 키를 제공할 때 키 유형에 따라 아래 중 하나만 제공해야 합니다. 둘 이상의 키를 제공하면 '중복된 키' 오류가 발생합니다. caver-js v1.2.0부터는 `key`를 `AccountForUpdate` 인스턴스와 함께 사용하는 것을 권장합니다.
- key
- legacyKey
- publicKey
- multisig
- roleTransactionKey, roleAccountUpdateKey, roleFeePayerKey
- failKey

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| type | String | 트랜잭션 유형. "ACCOUNT_UPDATE" |
| from | String | 이 트랜잭션 발신자의 주소. 이 트랜잭션에 의해 이 계정이 업데이트됩니다. |
| gas | Number | 거래에 대해 지불할 수 있는 최대 가스 금액(사용하지 않은 가스는 환불됨). |
| gasPrice | Number | (선택 사항) 발신자가 제공한 가스 가격(peb 단위). 가스 가격은 Klaytn 노드에 설정된 단위가격과 동일해야 합니다. |
| nonce | Number | (선택 사항) nonce의 정수입니다. 생략할 경우, caver-js가 `caver.klay.getTransactionCount`를 호출하여 설정합니다. |
| Key | Object | (선택 사항) 계정을 업데이트할 때 사용할 주소와 키가 포함된 `AccountForUpdate` 인스턴스입니다. 각 키 유형에 대한 계정 업데이트 인스턴스를 생성하는 방법에 대한 지침은 [caver.klay.accounts.createAccountForUpdate](../../caver.klay.accounts.md#createaccountforupdate)를 참조하세요. |
| legacyKey | Boolean | (선택 사항) 레거시 키를 갖도록 계정을 업데이트하는 경우 이 값을 true로 설정합니다. |
| publicKey | String | (선택 사항) 공개키를 사용하도록 계정을 업데이트하는 경우 64바이트의 공개키를 기록합니다. |
| multisig | Object | (선택 사항) 계정을 다중서명 키를 갖도록 업데이트하는 경우 다중서명을 구성하는 가중치 있는 공개키 목록을 기록합니다. 다중서명은 임계값도 정의합니다. 트랜잭션에 서명할 때 서명의 가중치 합이 임계값보다 크거나 같아야 합니다. |
| roleTransactionKey | Object | (선택 사항) 역할 기반 키를 갖도록 계정을 업데이트하는 경우 roleTransactionKey를 기록합니다. roleTransactionKey는 공개 키 또는 다중 서명 키일 수 있습니다. 이 RoleTransactionKey는 트랜잭션에 서명할 때 사용됩니다. |
| roleAccountUpdateKey | Object | (선택 사항) 역할 기반 키를 갖도록 계정을 업데이트하는 경우 roleAccountUpdateKey를 기록합니다. roleAccountUpdateKey는 공개 키 또는 다중서명 키일 수 있습니다. 이 roleAccountUpdateKey는 계정 업데이트 트랜잭션에 서명할 때 사용됩니다. |
| roleFeePayerKey | Object | (선택 사항) 역할 기반 키를 갖도록 계정을 업데이트하는 경우 roleFeePayerKey를 기록합니다. roleFeePayerKey는 공개 키 또는 다중서명 키일 수 있습니다. 이 roleFeePayerKey는 수수료 지불자로 트랜잭션에 서명할 때 사용됩니다. |
| failKey | Bool | (선택 사항) 실패 키를 갖도록 계정을 업데이트하는 경우 이 값을 true로 설정합니다. |

위와 같이 `caver.klay.sendTransaction`을 `ACCOUNT_UPDATE` 타입의 트랜잭션 객체로 호출하면 caver-js는 인메모리 지갑 내부에서 발신자 계정(`from`)의 키로 서명 후 네트워크에 전송합니다.

**리턴 값**

`callback`은 32바이트 트랜잭션 해시를 반환합니다.

`PromiEvent`: 프로미스 결합 이벤트 이미터입니다. 트랜잭션 영수증을 사용할 수 있을 때 해결됩니다. 추가로 다음과 같은 이벤트를 사용할 수 있습니다:

- ``"transactionHash"``는 ``String``을 반환합니다: 트랜잭션이 전송되고 트랜잭션 해시를 사용할 수 있는 직후에 발생합니다.
- ``"receipt"``는 ``Object``를 반환합니다: 트랜잭션 영수증을 사용할 수 있을 때 발생합니다.
- ``"error"``는 ``Error``를 반환합니다: 전송 중 에러가 발생하면 발생합니다. 가스 부족 오류에서 두 번째 매개 변수는 영수증입니다.

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

[수수료 위임 계정 업데이트](../../../../../../learn/transactions/fee-delegation.md#txtypefeedelegatedaccountupdate) 트랜잭션을 네트워크에 전송합니다.

수수료 납부자가 트랜잭션에 서명하고 네트워크에 전송하는 방법에는 두 가지가 있습니다.

1. 수수료 납부자에게 사용되는 트랜잭션 형식인 `{senderRawTransaction: rawTransaction, feePayer: feePayerAddress}` 오브젝트와 함께 `caver.klay.sendTransaction`을 호출합니다. 이 경우 수수료 납부자 계정은 인메모리 caver-js 지갑에 존재해야 합니다.
2. [caver.klay.accounts.feePayerSignTransaction](../../caver.klay.accounts.md#feepayersigntransaction)으로 서명하고 [caver.klay.sendSignedTransaction](./transaction.md#sendsignedtransaction)을 통해 네트워크에 보냅니다.

여기 예시에서는 `caver.klay.sendTransaction`을 사용하는 방법만 설명합니다.

`caver.klay.accounts.feePayerSignTransaction` 및 `caver.klay.sendSignedTransaction`을 사용하여 전송하는 방법에 대한 자세한 내용은 [caver.klay.accounts.feePayerSignTransaction](../../caver.klay.accounts.md#feepayersigntransaction) 및 [여러 서명자가 있는 트랜잭션 보내기](../../../get-started-1.4.1.md#sending-a-transaction-with-multiple-signer)를 참조하세요.

**매개변수**

sendTransaction의 매개 변수는 트랜잭션 객체와 콜백 함수입니다.

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| transactionObject | Object | 전송할 트랜잭션 오브젝트입니다. |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개 변수로 오류 개체를 반환하고 두 번째 매개 변수로 결과를 반환합니다. |

`FEE_DELEGATED_ACCOUNT_UPDATE` 유형의 트랜잭션 객체는 다음과 같은 구조를 가집니다:

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| type | String | 트랜잭션 유형. "FEE_DELEGATED_ACCOUNT_UPDATE" |
| from | String | 이 트랜잭션 발신자의 주소. 이 트랜잭션에 의해 이 계정이 업데이트됩니다. |
| gas | Number | 트랜잭션에 대해 지불할 최대 가스 금액(사용하지 않은 가스는 환불됨). |
| gasPrice | Number | (선택 사항) 발신자가 제공한 가스 가격(peb 단위). 가스 가격은 Klaytn 노드에 설정된 단위가격과 동일해야 합니다. |
| nonce | Number | (선택 사항) nonce의 정수입니다. 생략할 경우, caver-js가 `caver.klay.getTransactionCount`를 호출하여 설정합니다. |
| Key | Object | (선택 사항) 계정을 업데이트할 때 사용할 주소와 키가 포함된 `AccountForUpdate` 인스턴스입니다. 각 키 유형에 대한 계정 업데이트 인스턴스를 생성하는 방법에 대한 지침은 [caver.klay.accounts.createAccountForUpdate](../../caver.klay.accounts.md#createaccountforupdate)를 참조하세요. |
| legacyKey | Boolean | (선택 사항) 레거시 키를 갖도록 계정을 업데이트하는 경우 이 값을 true로 설정합니다. |
| publicKey | String | (선택 사항) 공개키를 사용하도록 계정을 업데이트하는 경우 64바이트의 공개키를 기록합니다. |
| multisig | Object | (선택 사항) 계정을 다중서명 키를 갖도록 업데이트하는 경우 다중서명을 구성하는 가중치 있는 공개키 목록을 기록합니다. 다중서명은 임계값도 정의합니다. 트랜잭션에 서명할 때 서명의 가중치 합이 임계값보다 크거나 같아야 합니다. |
| roleTransactionKey | Object | (선택 사항) 역할 기반 키를 갖도록 계정을 업데이트하는 경우 roleTransactionKey를 기록합니다. roleTransactionKey는 공개 키 또는 다중 서명 키일 수 있습니다. 이 roleTransactionKey는 트랜잭션에 서명할 때 사용됩니다. |
| roleAccountUpdateKey | Object | (선택 사항) 역할 기반 키를 갖도록 계정을 업데이트하는 경우 roleAccountUpdateKey를 기록합니다. roleAccountUpdateKey는 공개 키 또는 다중서명 키일 수 있습니다. 이 roleAccountUpdateKey는 계정 업데이트 트랜잭션에 서명할 때 사용됩니다. |
| roleFeePayerKey | Object | (선택 사항) 역할 기반 키를 갖도록 계정을 업데이트하는 경우 roleFeePayerKey를 기록합니다. roleFeePayerKey는 공개 키 또는 다중서명 키일 수 있습니다. 이 roleFeePayerKey는 수수료 지불자로 트랜잭션에 서명할 때 사용됩니다. |
| failKey | Bool | (선택 사항) 실패 키를 갖도록 계정을 업데이트하는 경우 이 값을 true로 설정합니다. |

위의 구조를 가진 `FEE_DELEGATED_ACCOUNT_UPDATE` 타입의 트랜잭션 객체 또는 `FEE_DELEGATED_ACCOUNT_UPDATE` 타입의 `RLP 인코딩된 트랜잭션`을 발신자의 경우 [caver.klay.accounts.signTransaction](../../caver.klay.accounts.md#signtransaction)에서 매개변수로, 수수료 납부자의 경우 [caver.klay.accounts.feePayerSignTransaction](../../caver.klay.accounts.md#feepayersigntransaction)에서 매개변수로 사용할 수 있습니다.

수수료 납부자가 발신자가 서명한 RLP 인코딩 트랜잭션에 서명하고 네트워크에 전송하려면 다음 구조의 객체를 정의하고 `caver.klay.sendTransaction`을 호출합니다.

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| feePayer | String | 트랜잭션의 수수료 납부자 주소입니다. |
| senderRawTransaction | String | 발신자가 서명한 RLP 인코딩된 트랜잭션입니다. |

**리턴 값**

`callback`은 32바이트 트랜잭션 해시를 반환합니다.

`PromiEvent`: 프로미스 결합 이벤트 이미터입니다. 트랜잭션 영수증을 사용할 수 있을 때 해결됩니다. 추가로 다음과 같은 이벤트를 사용할 수 있습니다:

- ``"transactionHash"``는 ``String``을 반환합니다: 트랜잭션이 전송되고 트랜잭션 해시를 사용할 수 있는 직후에 발생합니다.
- ``"receipt"``는 ``Object``를 반환합니다: 트랜잭션 영수증을 사용할 수 있을 때 발생합니다.
- ``"error"``는 ``Error``를 반환합니다: 전송 중 에러가 발생하면 발생합니다. 가스 부족 오류에서 두 번째 매개 변수는 영수증입니다.

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

## sendTransaction (FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO) <a id="sendtransaction-fee_delegated_account_update_with_ratio"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
[비율에 따른 수수료 위임 계정 업데이트](../../../../../../learn/transactions/partial-fee-delegation.md#txtypefeedelegatedaccountupdatewithratio) 트랜잭션을 네트워크에 전송합니다.

수수료 납부자가 트랜잭션에 서명하고 네트워크에 전송하는 방법에는 두 가지가 있습니다.

1. 수수료 납부자 트랜잭션 형식(`senderRawTransaction`과 `feepayer`를 정의하는 객체)으로 `caver.klay.sendTransaction`을 호출합니다. 이 경우 수수료 납부자 계정은 caver-js의 인메모리 월렛에 존재해야 합니다.
2. [caver.klay.accounts.feePayerSignTransaction](../../caver.klay.accounts.md#feepayersigntransaction)으로 서명하고 [caver.klay.sendSignedTransaction](./transaction.md#sendsignedtransaction)을 통해 네트워크에 전송합니다.

여기 예시에서는 `caver.klay.sendTransaction`을 사용하는 방법만 설명합니다.

`caver.klay.accounts.feePayerSignTransaction` 및 `caver.klay.sendSignedTransaction`을 사용하여 전송하는 방법에 대한 자세한 내용은 [caver.klay.accounts.feePayerSignTransaction](../../caver.klay.accounts.md#feepayersigntransaction) 및 [여러 서명자가 있는 트랜잭션 보내기](../../../get-started-1.4.1.md#sending-a-transaction-with-multiple-signer)를 참조하세요.

**매개변수**

sendTransaction의 매개변수는 트랜잭션 객체와 콜백 함수입니다.

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| transactionObject | Object | 전송할 트랜잭션 오브젝트입니다. |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개 변수로 오류 개체를 반환하고 두 번째 매개 변수로 결과를 반환합니다. |

`FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO` 트랜잭션의 일반 트랜잭션 객체 유형은 다음과 같은 구조를 가집니다:

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| type | String | "FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO" 트랜잭션의 유형입니다. |
| from | String | 이 트랜잭션 발신자의 주소입니다. 이 트랜잭션에 의해 이 계정이 업데이트됩니다. |
| gas | Number | 트랜잭션에 대해 지불할 최대 가스 금액(사용하지 않은 가스는 환불됨). |
| gasPrice | Number | (선택 사항) 발신자가 제공한 가스 가격(peb 단위). 가스 가격은 Klaytn 노드에 설정된 단위가격과 동일해야 합니다. |
| nonce | Number | (선택 사항) nonce의 정수입니다. 생략하면 caver-js가 `caver.klay.getTransactionCount`를 호출하여 설정합니다. |
| Key | Object | (선택 사항) 계정을 업데이트할 때 사용할 주소와 키가 포함된 `AccountForUpdate` 인스턴스입니다. 각 키 유형에 대한 계정 업데이트 인스턴스를 생성하는 방법에 대한 지침은 [caver.klay.accounts.createAccountForUpdate](../../caver.klay.accounts.md#createaccountforupdate)를 참조하세요. |
| legacyKey | Bool | (선택 사항) 레거시 키를 갖도록 계정을 업데이트하는 경우 이 값을 true로 설정합니다. |
| publicKey | String | (선택 사항) 공개키를 사용하도록 계정을 업데이트하는 경우 64바이트의 공개키를 기록합니다. |
| multisig | Object | (선택 사항) 계정을 다중서명 키를 갖도록 업데이트하는 경우 다중서명을 구성하는 가중 공개키 목록을 기록합니다. 다중서명은 임계값도 정의합니다. 트랜잭션에 서명할 때 서명의 가중치 합이 임계값보다 크거나 같아야 합니다. |
| roleTransactionKey | Object | (선택 사항) 역할 기반 키를 갖도록 계정을 업데이트하는 경우 roleTransactionKey를 기록합니다. roleTransactionKey는 공개 키 또는 다중 서명 키일 수 있습니다. 이 roleTransactionKey는 트랜잭션에 서명할 때 사용됩니다. |
| roleAccountUpdateKey | Object | (선택 사항) 역할 기반 키를 갖도록 계정을 업데이트하는 경우 roleAccountUpdateKey를 기록합니다. roleAccountUpdateKey는 공개 키 또는 다중서명 키일 수 있습니다. 이 roleAccountUpdateKey는 계정 업데이트 트랜잭션에 서명할 때 사용됩니다. |
| roleFeePayerKey | Object | (선택 사항) 역할 기반 키를 갖도록 계정을 업데이트하는 경우 roleFeePayerKey를 기록합니다. roleFeePayerKey는 공개 키 또는 다중서명 키일 수 있습니다. 이 roleFeePayerKey는 수수료 지불자로 트랜잭션에 서명할 때 사용됩니다. |
| failKey | Bool | (선택 사항) 실패 키를 갖도록 계정을 업데이트하는 경우 이 값을 true로 설정합니다. |

위와 같은 구조의 `FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO` 타입의 트랜잭션 객체 또는 `FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO` 타입의 `RLP 인코딩된 트랜잭션`을 발신자의 경우 [caver.klay.accounts.signTransaction](../../caver.klay.accounts.md#signtransaction)에, 수수료 납부자의 경우 [caver.klay.accounts.feePayerSignTransaction](../../caver.klay.accounts.md#feepayersigntransaction)에 매개변수로 사용할 수 있습니다.

수수료 납부자가 발신자가 서명한 RLP 인코딩 트랜잭션에 서명하고 네트워크에 전송하려면 다음 구조의 객체를 정의하고 `caver.klay.sendTransaction`을 호출합니다.

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| feePayer | String | 트랜잭션의 수수료 납부자 주소입니다. |
| senderRawTransaction | String | 발신자가 서명한 RLP 인코딩된 트랜잭션입니다. |

**리턴 값**

`callback`은 32바이트 트랜잭션 해시를 반환합니다.

`PromiEvent`: 프로미스 결합 이벤트 이미터. 트랜잭션 영수증을 사용할 수 있을 때 해결됩니다. 추가로 다음과 같은 이벤트를 사용할 수 있습니다:

- ``"transactionHash"``는 ``String``을 반환합니다: 트랜잭션이 전송되고 트랜잭션 해시를 사용할 수 있는 직후에 발생합니다.
- ``"receipt"``는 ``Object``를 반환합니다: 트랜잭션 영수증을 사용할 수 있을 때 발생합니다.
- ``"error"``는 ``Error``를 반환합니다: 전송 중 에러가 발생하면 발생합니다. 가스 부족 오류에서 두 번째 매개 변수는 영수증입니다.

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
