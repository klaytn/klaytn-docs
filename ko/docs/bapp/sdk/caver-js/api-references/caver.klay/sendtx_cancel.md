# Cancel Transaction

## sendTransaction (CANCEL)

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
Sends a [Cancel](../../../../../klaytn/design/transactions/basic.md#txtypecancel) transaction to the network.

**매개변수**

| 명칭                         | Type     | 설명                                                                                                                                                      |
| -------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| transactionObject          | 객체       | The transaction object to send.                                                                                                                         |
| transactionObject.type     | 문자열      | The type of "CANCEL" transaction.                                                                                                                       |
| transactionObject.from     | 문자열      | The address of the sender.                                                                                                                              |
| transactionObject.gas      | Number   | The amount of gas to use for the transaction (unused gas is refunded).                                                                                  |
| transactionObject.gasPrice | Number   | (optional) Gas price provided by the sender in peb. The gasPrice must be the same as the unitPrice set in the Klaytn node.                              |
| transactionObject.nonce    | Number   | (선택사항) nonce의 정숫값입니다. 이를 통해 같은 nonce를 사용하는 보류 중인 트랜잭션을 덮어쓸 수 있습니다. If omitted, it will be set by caver-js via calling `caver.klay.getTransactionCount`. |
| callback                   | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다.                                                                                    |

**리턴값**

The `callback` will return the 32-byte transaction hash.

`PromiEvent`: 프로미스(promise)가 조합된 이벤트 에미터(event emitter). Will be resolved when the transaction receipt is available. Additionally the following events are available:

- `"transactionHash"` returns `String`: Is fired right after the transaction is sent and a transaction hash is available.
- `"receipt"` returns `Object`: Is fired when the transaction receipt is available.
- `"error"` returns `Error`: Is fired if an error occurs during sending. 가스 부족 에러(out-of-gas)가 발생한 경우 두 번째 인자는 트랜잭션 영수증입니다.

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


## sendTransaction (FEE_DELEGATED_CANCEL)

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
Sends a [Fee Delegated Cancel](../../../../../klaytn/design/transactions/fee-delegation.md#txtypefeedelegatedcancel) transaction to the network.

**매개변수**

| 명칭                                     | Type     | 설명                                                                                                                                                      |
| -------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| transactionObject                      | 객체       | The transaction object to send.                                                                                                                         |
| transactionObject.type                 | 문자열      | The type of "FEE_DELEGATED_CANCEL" transaction.                                                                                                       |
| transactionObject.from                 | 문자열      | The address of the sender.                                                                                                                              |
| transactionObject.gas                  | Number   | The amount of gas to use for the transaction (unused gas is refunded).                                                                                  |
| transactionObject.gasPrice             | Number   | (optional) Gas price provided by the sender in peb. The gasPrice must be the same as the unitPrice set in the Klaytn node.                              |
| transactionObject.nonce                | Number   | (선택사항) nonce의 정숫값입니다. 이를 통해 같은 nonce를 사용하는 보류 중인 트랜잭션을 덮어쓸 수 있습니다. If omitted, it will be set by caver-js via calling `caver.klay.getTransactionCount`. |
| transactionObject.feePayer             | 문자열      | (for fee payer) The fee payer address of the transaction.                                                                                               |
| transactionObject.senderRawTransaction | 문자열      | (for fee payer) The raw transaction of a sender.                                                                                                        |
| callback                               | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다.                                                                                    |

**리턴값**

The `callback` will return the 32-byte transaction hash.

`PromiEvent`: 프로미스(promise)가 조합된 이벤트 에미터(event emitter). Will be resolved when the transaction receipt is available. Additionally the following events are available:

- `"transactionHash"` returns `String`: Is fired right after the transaction is sent and a transaction hash is available.
- `"receipt"` returns `Object`: Is fired when the transaction receipt is available.
- `"error"` returns `Error`: Is fired if an error occurs during sending. 가스 부족 에러(out-of-gas)가 발생한 경우 두 번째 인자는 트랜잭션 영수증입니다.

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


## sendTransaction (FEE_DELEGATED_CANCEL_WITH_RATIO)

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
Sends a [Fee Delegated Cancel With Ratio](../../../../../klaytn/design/transactions/partial-fee-delegation.md#txtypefeedelegatedcancelwithratio) transaction to the network.

**매개변수**

| 명칭                                     | Type     | 설명                                                                                                                                                                                                |
| -------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| transactionObject                      | 객체       | The transaction object to send.                                                                                                                                                                   |
| transactionObject.type                 | 문자열      | The type of "FEE_DELEGATED_CANCEL_WITH_RATIO" transaction.                                                                                                                                    |
| transactionObject.from                 | 문자열      | The address of the sender.                                                                                                                                                                        |
| transactionObject.gas                  | Number   | The amount of gas to use for the transaction (unused gas is refunded).                                                                                                                            |
| transactionObject.gasPrice             | Number   | (optional) Gas price provided by the sender in peb. The gasPrice must be the same as the unitPrice set in the Klaytn node.                                                                        |
| transactionObject.nonce                | Number   | (선택사항) nonce의 정숫값입니다. 이를 통해 같은 nonce를 사용하는 보류 중인 트랜잭션을 덮어쓸 수 있습니다. If omitted, it will be set by caver-js via calling `caver.klay.getTransactionCount`.                                           |
| transactionObject.feeRatio             | Number   | Fee ratio of the fee payer. 이 값이 30이면, 트랜잭션 비용의 30%를 트랜잭션 비용 납부자가 지불합니다. 나머지 70%는 트랜잭션 발신자가 지불합니다. The range of fee ratio is 1 ~ 99, if it is out of range, the transaction will not be accepted. |
| transactionObject.feePayer             | 문자열      | (for fee payer) The fee payer address of the transaction.                                                                                                                                         |
| transactionObject.senderRawTransaction | 문자열      | (for fee payer) The raw transaction of a sender.                                                                                                                                                  |
| callback                               | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다.                                                                                                                              |

**리턴값**

The `callback` will return the 32-byte transaction hash.

`PromiEvent`: 프로미스(promise)가 조합된 이벤트 에미터(event emitter). Will be resolved when the transaction receipt is available. Additionally the following events are available:

- `"transactionHash"` returns `String`: Is fired right after the transaction is sent and a transaction hash is available.
- `"receipt"` returns `Object`: Is fired when the transaction receipt is available.
- `"error"` returns `Error`: Is fired if an error occurs during sending. 가스 부족 에러(out-of-gas)가 발생한 경우 두 번째 인자는 트랜잭션 영수증입니다.

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


