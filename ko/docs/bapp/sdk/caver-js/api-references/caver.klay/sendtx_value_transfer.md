# Value Transfer Transaction

## sendTransaction (VALUE_TRANSFER)

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
Sends a [Value Transfer](../../../../../klaytn/design/transactions/basic.md#txtypevaluetransfer) transaction to the network.

**Parameters**

| 명칭                         | 형식                                              | 설명                                                                                                                                                                                                  |
| -------------------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| transactionObject          | Object                                          | The transaction object to send.                                                                                                                                                                     |
| transactionObject.type     | String                                          | The type of "VALUE_TRANSFER" transaction.                                                                                                                                                           |
| transactionObject.from     | String                                          | The sender address of the transaction.                                                                                                                                                              |
| transactionObject.to       | String                                          | The destination address of the transaction.                                                                                                                                                         |
| transactionObject.value    | Number &#124; String &#124; BN &#124; BigNumber | The value transferred for the transaction in peb.                                                                                                                                                   |
| transactionObject.gas      | Number                                          | The amount of gas to use for the transaction (unused gas is refunded).                                                                                                                              |
| transactionObject.gasPrice | Number                                          | (optional) Gas price provided by the sender in peb. The gasPrice must be the same as the unitPrice set in the Klaytn node.                                                                          |
| transactionObject.nonce    | Number                                          | (optional) Integer of a nonce. This allows to overwrite your own pending transactions that use the same nonce. If omitted, it will be set by caver-js via calling `caver.klay.getTransactionCount`. |
| callback                   | Function                                        | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다.                                                                                                                                |

**Return Value**

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
    type: 'VALUE_TRANSFER',
    from: account.address,
    to: '0x75c3098Be5E4B63FBAc05838DaAEE378dD48098d',
    gas: '300000',
    value: caver.utils.toPeb('1', 'KLAY'),
}).then(function(receipt){
    ...
});

// using the event emitter
caver.klay.sendTransaction({
    type: 'VALUE_TRANSFER',
    from: account.address,
    to: '0x75c3098Be5E4B63FBAc05838DaAEE378dD48098d',
    gas: '300000',
    value: caver.utils.toPeb('1', 'KLAY'),
})
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
    ...
})
.on('error', console.error); // 가스 부족 에러(out-of-gas)가 발생한 경우 두 번째 인자는 트랜잭션 영수증입니다.

```


## sendTransaction (FEE_DELEGATED_VALUE_TRANSFER)

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
Sends a [Fee Delegated Value Transfer](../../../../../klaytn/design/transactions/fee-delegation.md#txtypefeedelegatedvaluetransfer) transaction to the network.

**Parameters**

| 명칭                                     | 형식                                              | 설명                                                                                                                                                                                                  |
| -------------------------------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| transactionObject                      | Object                                          | The transaction object to send.                                                                                                                                                                     |
| transactionObject.type                 | String                                          | The type of "FEE_DELEGATED_VALUE_TRANSFER" transaction.                                                                                                                                           |
| transactionObject.from                 | String                                          | The sender address of the transaction.                                                                                                                                                              |
| transactionObject.to                   | String                                          | The destination address of the transaction.                                                                                                                                                         |
| transactionObject.value                | Number &#124; String &#124; BN &#124; BigNumber | The value transferred for the transaction in peb.                                                                                                                                                   |
| transactionObject.gas                  | Number                                          | The amount of gas to use for the transaction (unused gas is refunded).                                                                                                                              |
| transactionObject.gasPrice             | Number                                          | (optional) Gas price provided by the sender in peb. The gasPrice must be the same as the unitPrice set in the Klaytn node.                                                                          |
| transactionObject.nonce                | Number                                          | (optional) Integer of a nonce. This allows to overwrite your own pending transactions that use the same nonce. If omitted, it will be set by caver-js via calling `caver.klay.getTransactionCount`. |
| transactionObject.feePayer             | String                                          | (for fee payer) The fee payer address of the transaction.                                                                                                                                           |
| transactionObject.senderRawTransaction | String                                          | (for fee payer) The raw transaction of a sender.                                                                                                                                                    |
| callback                               | Function                                        | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다.                                                                                                                                |

**Return Value**

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
  type: 'FEE_DELEGATED_VALUE_TRANSFER',
  from: sender.address,
  to: '0x75c3098Be5E4B63FBAc05838DaAEE378dD48098d',
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
  type: 'FEE_DELEGATED_VALUE_TRANSFER',
  from: sender.address,
  to: '0x75c3098Be5E4B63FBAc05838DaAEE378dD48098d',
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
.on('error', console.error); // 가스 부족 에러(out-of-gas)가 발생한 경우 두 번째 인자는 트랜잭션 영수증입니다.
```

## sendTransaction (FEE_DELEGATED_VALUE_TRANSFER_WITH_RATIO)

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
Sends a [Fee Delegated Value Transfer With Ratio](../../../../../klaytn/design/transactions/partial-fee-delegation.md#txtypefeedelegatedvaluetransferwithratio) transaction to the network.

**Parameters**

| 명칭                                     | 형식                                              | 설명                                                                                                                                                                                                                    |
| -------------------------------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| transactionObject                      | Object                                          | The transaction object to send.                                                                                                                                                                                       |
| transactionObject.type                 | String                                          | The type of "FEE_DELEGATED_VALUE_TRANSFER_WITH_RATIO" transaction.                                                                                                                                                |
| transactionObject.from                 | String                                          | The sender address of the transaction.                                                                                                                                                                                |
| transactionObject.to                   | String                                          | The destination address of the transaction.                                                                                                                                                                           |
| transactionObject.value                | Number &#124; String &#124; BN &#124; BigNumber | The value transferred for the transaction in peb.                                                                                                                                                                     |
| transactionObject.gas                  | Number                                          | The amount of gas to use for the transaction (unused gas is refunded).                                                                                                                                                |
| transactionObject.gasPrice             | Number                                          | (optional) Gas price provided by the sender in peb. The gasPrice must be the same as the unitPrice set in the Klaytn node.                                                                                            |
| transactionObject.nonce                | Number                                          | (optional) Integer of a nonce. This allows to overwrite your own pending transactions that use the same nonce. If omitted, it will be set by caver-js via calling `caver.klay.getTransactionCount`.                   |
| transactionObject.feeRatio             | Number                                          | Fee ratio of the fee payer. If it is 30, 30% of the fee will be paid by the fee payer. 70% will be paid by the sender. The range of fee ratio is 1 ~ 99, if it is out of range, the transaction will not be accepted. |
| transactionObject.feePayer             | String                                          | (for fee payer) The fee payer address of the transaction.                                                                                                                                                             |
| transactionObject.senderRawTransaction | String                                          | (for fee payer) The raw transaction of a sender.                                                                                                                                                                      |
| callback                               | Function                                        | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다.                                                                                                                                                  |

**Return Value**

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
  type: 'FEE_DELEGATED_VALUE_TRANSFER_WITH_RATIO',
  from: sender.address,
  to: '0x75c3098Be5E4B63FBAc05838DaAEE378dD48098d',
  gas: '300000',
  feeRatio: 20,
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
  type: 'FEE_DELEGATED_VALUE_TRANSFER_WITH_RATIO',
  from: sender.address,
  to: '0x75c3098Be5E4B63FBAc05838DaAEE378dD48098d',
  gas: '300000',
  feeRatio: 20,
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
.on('error', console.error); // 가스 부족 에러(out-of-gas)가 발생한 경우 두 번째 인자는 트랜잭션 영수증입니다.
```
