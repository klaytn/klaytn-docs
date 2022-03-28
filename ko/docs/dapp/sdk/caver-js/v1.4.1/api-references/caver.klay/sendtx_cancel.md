# 취소 트랜잭션<a id="cancel-transaction"></a>

## sendTransaction (CANCEL) <a id="sendtransaction-cancel"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
[Cancel](../../../../../../klaytn/design/transactions/basic.md#txtypecancel) 트랜잭션을 네트워크에 전송합니다.

**Parameters**

sendTransaction의 매개 변수는 트랜잭션 객체 및 콜백 함수입니다.

| 이름                | 타입       | 설명                                                                   |
| ----------------- | -------- | -------------------------------------------------------------------- |
| transactionObject | Object   | 전송하려는 트랜잭션 객체.                                                       |
| callback          | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

`CANCEL` 트랜잭션 오브젝트의 구조는 다음과 같습니다.

| 이름       | 타입     | 설명                                                                                                                       |
| -------- | ------ | ------------------------------------------------------------------------------------------------------------------------ |
| 형식       | String | 트랜잭션 타입. "CANCEL"                                                                                                        |
| from     | String | 이 트랜잭션 발신자의 주소입니다.                                                                                                       |
| gas      | Number | 트랜잭션에 지불할 의향이 있는 최대 가스량(사용하지 않은 가스는 환불됨).                                                                                |
| gasPrice | Number | (선택사항) 트랜잭션 발신자가 설정한 가스 가격으로 단위는 peb입니다. gasPrice는 Klaytn 노드에 설정된 unitPrice와 같아야 합니다.                                    |
| 논스       | Number | (선택사항) 논스의 정숫값입니다. 이를 통해 같은 논스를 사용하는 펜딩 상태의 트랜잭션을 덮어쓸 수 있습니다. 생략하면 `caver.klay.getTransactionCount` 값으로 caver-js가 설정합니다. |

**리턴값**

`callback`은 32바이트 트랜잭션 해시를 반환합니다.

`PromiEvent`: 프로미스(promise)가 조합된 이벤트 이미터(event emitter). 트랜잭션 영수증이 준비되면 resolve 됩니다. 추가로 다음 이벤트가 발생할 수 있습니다.

- `"transactionHash"`는 `String`를 반환: 트랜잭션을 보내고 트랜잭션 해시가 준비된 직후에 발생.
- `"receipt"`는 `Object`를 반환: 트랜잭션 영수중이 중비되면 발생.
- `"error"`는 `Error`를 반환: 전송 중 에러가 발생하면 발생. 가스 부족 에러(out-of-gas)가 발생한 경우 두 번째 인자는 트랜잭션 영수증입니다.

**예시**

```javascript
const account = caver.klay.accounts.wallet.add('0x{private key}')

// using the promise
caver.klay.sendTransaction({
    type: 'CANCEL',
    from: account.address,
    nonce: 7, // It specifies target transaction having the same nonce to cancel.
    gas: '300000',
})
.then(function(receipt){
    ...
});

// using the event emitter
caver.klay.sendTransaction({
    type: 'CANCEL',
    from: account.address,
    nonce: 7, // It specifies target transaction having the same nonce to cancel.
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


## sendTransaction (FEE_DELEGATED_CANCEL) <a id="sendtransaction-fee_delegated_cancel"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
[Fee Delegated Cancel](../../../../../../klaytn/design/transactions/fee-delegation.md#txtypefeedelegatedcancel) 트랜잭션을 네트워크에 전송합니다.

**Parameters**

sendTransaction의 매개 변수는 트랜잭션 객체 및 콜백 함수입니다.

| 이름                | 타입       | 설명                                                                   |
| ----------------- | -------- | -------------------------------------------------------------------- |
| transactionObject | Object   | 전송하려는 트랜잭션 객체.                                                       |
| callback          | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

`FEE_DELEGATED_CANCEL` 트랜잭션 객체의 구조는 다음과 같습니다.

| 이름       | 타입     | 설명                                                                                                                       |
| -------- | ------ | ------------------------------------------------------------------------------------------------------------------------ |
| 형식       | String | 트랜잭션 타입. "FEE_DELEGATED_CANCEL"                                                                                        |
| from     | String | 이 트랜잭션 발신자의 주소입니다.                                                                                                       |
| gas      | Number | 트랜잭션에 지불할 의향이 있는 최대 가스량(사용하지 않은 가스는 환불됨).                                                                                |
| gasPrice | Number | (선택사항) 트랜잭션 발신자가 설정한 가스 가격으로 단위는 peb입니다. gasPrice는 Klaytn 노드에 설정된 unitPrice와 같아야 합니다.                                    |
| 논스       | Number | (선택사항) 논스의 정숫값입니다. 이를 통해 같은 논스를 사용하는 펜딩 상태의 트랜잭션을 덮어쓸 수 있습니다. 생략하면 `caver.klay.getTransactionCount` 값으로 caver-js가 설정합니다. |

위의 구조를 가진 `FEE_DELEGATED_CANCEL` 유형의 트랜잭션 오브젝트, 또는  `FEE_DELEGATED_CANCEL` 유형의 `RLP 인코딩된 트랜잭션`은 트랜잭션 발신자의 경우 [caver.klay.accounts.signTransaction](../caver.klay.accounts.md#signtransaction)의 매개 변수로, 수수료 납부자의 경우 [ caver.klay.accounts.feePayerSignTransaction](../caver.klay.accounts.md#feepayersigntransaction)의 매개 변수로 사용할 수 있습니다.

수수료 납부자가 트랜잭션 발신자가 서명한 RLP 인코딩된 트랜잭션에 서명하고 이를 네트워크로 전송하려면 다음 구조로 오브젝트를 정의하고 `caver.klay.sendTransaction`을 호출하세요.

| 이름                   | 타입     | 설명                      |
| -------------------- | ------ | ----------------------- |
| feePayer             | String | 트랜잭션 수수료 납부자의 주소.       |
| senderRawTransaction | String | 발신자가 서명한 RLP 인코딩된 트랜잭션. |

**리턴값**

`callback`은 32바이트 트랜잭션 해시를 반환합니다.

`PromiEvent`: 프로미스(promise)가 조합된 이벤트 이미터(event emitter). 트랜잭션 영수증이 준비되면 resolve 됩니다. 추가로 다음 이벤트가 발생할 수 있습니다.

- `"transactionHash"`는 `String`를 반환: 트랜잭션을 보내고 트랜잭션 해시가 준비된 직후에 발생.
- `"receipt"`는 `Object`를 반환: 트랜잭션 영수중이 중비되면 발생.
- `"error"`는 `Error`를 반환: 전송 중 에러가 발생하면 발생. 가스 부족 에러(out-of-gas)가 발생한 경우 두 번째 인자는 트랜잭션 영수증입니다.

**예시**

```javascript
const sender = caver.klay.accounts.wallet.add('0x{private key}')
const feePayer = caver.klay.accounts.wallet.add('0x{private key}')

// using the promise
const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
  type: 'FEE_DELEGATED_CANCEL',
  from: sender.address,
  nonce: 7, // It specifies target transaction having the same nonce to cancel.
  gas: '300000',
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
.on('error', console.error); // 가스 부족 에러(out-of-gas)가 발생한 경우 두 번째 인자는 트랜잭션 영수증입니다.
```


## sendTransaction (FEE_DELEGATED_CANCEL_WITH_RATIO) <a id="sendtransaction-fee_delegated_cancel_with_ratio"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
[Fee Delegated Cancel With Ratio](../../../../../../klaytn/design/transactions/partial-fee-delegation.md#txtypefeedelegatedcancelwithratio) 트랜잭션을 네트워크에 전송합니다.

**Parameters**

sendTransaction의 매개 변수는 트랜잭션 객체 및 콜백 함수입니다.

| 이름                | 타입       | 설명                                                                   |
| ----------------- | -------- | -------------------------------------------------------------------- |
| transactionObject | Object   | 전송하려는 트랜잭션 객체.                                                       |
| callback          | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

`FEE_DELEGATED_CANCEL_WITH_RATIO` 트랜잭션 객체의 구조는 다음과 같습니다.

| 이름       | 타입     | 설명                                                                                                                                                 |
| -------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| 형식       | String | 트랜잭션 타입. "FEE_DELEGATED_CANCEL_WITH_RATIO"                                                                                                     |
| from     | String | 이 트랜잭션 발신자의 주소입니다.                                                                                                                                 |
| gas      | Number | 트랜잭션에 지불할 의향이 있는 최대 가스량(사용하지 않은 가스는 환불됨).                                                                                                          |
| gasPrice | Number | (선택사항) 트랜잭션 발신자가 설정한 가스 가격으로 단위는 peb입니다. gasPrice는 Klaytn 노드에 설정된 unitPrice와 같아야 합니다.                                                              |
| 논스       | Number | (선택사항) 논스의 정숫값입니다. 이를 통해 같은 논스를 사용하는 펜딩 상태의 트랜잭션을 덮어쓸 수 있습니다. 생략하면 `caver.klay.getTransactionCount` 값으로 caver-js가 설정합니다.                           |
| feeRatio | Number | 트랜잭션 수수료 납부자의 부담 비율입니다. 이 값이 30이면, 트랜잭션 수수료의 30%를 트랜잭션 수수료 납부자가 지불합니다. 나머지 70%는 트랜잭션 발신자가 지불합니다. 수수료 비율의 범위는 1 ~ 99이며, 이 범위를 벗어나면 트랜잭션이 수락되지 않습니다. |

위의 구조를 가진 `FEE_DELEGATED_CANCEL_WITH_RATIO` 유형의 트랜잭션 오브젝트, 또는  `FEE_DELEGATED_CANCEL_WITH_RATIO` 유형의 `RLP 인코딩된 트랜잭션`은 트랜잭션 발신자의 경우 [caver.klay.accounts.signTransaction](../caver.klay.accounts.md#signtransaction)의 매개 변수로, 수수료 납부자의 경우 [ caver.klay.accounts.feePayerSignTransaction](../caver.klay.accounts.md#feepayersigntransaction)의 매개 변수로 사용할 수 있습니다.

수수료 납부자가 트랜잭션 발신자가 서명한 RLP 인코딩된 트랜잭션에 서명하고 이를 네트워크로 전송하려면 다음 구조로 오브젝트를 정의하고 `caver.klay.sendTransaction`을 호출하세요.

| 이름                   | 타입     | 설명                      |
| -------------------- | ------ | ----------------------- |
| feePayer             | String | 트랜잭션 수수료 납부자의 주소.       |
| senderRawTransaction | String | 발신자가 서명한 RLP 인코딩된 트랜잭션. |

**리턴값**

`callback`은 32바이트 트랜잭션 해시를 반환합니다.

`PromiEvent`: 프로미스(promise)가 조합된 이벤트 이미터(event emitter). 트랜잭션 영수증이 준비되면 resolve 됩니다. 추가로 다음 이벤트가 발생할 수 있습니다.

- `"transactionHash"`는 `String`를 반환: 트랜잭션을 보내고 트랜잭션 해시가 준비된 직후에 발생.
- `"receipt"`는 `Object`를 반환: 트랜잭션 영수중이 중비되면 발생.
- `"error"`는 `Error`를 반환: 전송 중 에러가 발생하면 발생. 가스 부족 에러(out-of-gas)가 발생한 경우 두 번째 인자는 트랜잭션 영수증입니다.

**예시**

```javascript
const sender = caver.klay.accounts.wallet.add('0x{private key}')
const feePayer = caver.klay.accounts.wallet.add('0x{private key}')

// using the promise
const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
  type: 'FEE_DELEGATED_CANCEL_WITH_RATIO',
  from: sender.address,
  nonce: 7, // It specifies target transaction having the same nonce to cancel.
  gas: '300000',
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
.on('error', console.error); // 가스 부족 에러(out-of-gas)가 발생한 경우 두 번째 인자는 트랜잭션 영수증입니다.
```


