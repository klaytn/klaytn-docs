# Cancel Transaction

## sendTransaction (CANCEL)

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
Sends a [Cancel](../../../../../klaytn/design/transactions/basic.md#txtypecancel) transaction to the network.

**Parameters**

| 명칭                         | 형식       | 설명                                                                                                                                                                                                  |
| -------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| transactionObject          | Object   | The transaction object to send.                                                                                                                                                                     |
| transactionObject.type     | String   | The type of "CANCEL" transaction.                                                                                                                                                                   |
| transactionObject.from     | String   | The address of the sender.                                                                                                                                                                          |
| transactionObject.gas      | Number   | The amount of gas to use for the transaction (unused gas is refunded).                                                                                                                              |
| transactionObject.gasPrice | Number   | (optional) Gas price provided by the sender in peb. The gasPrice must be the same as the unitPrice set in the Klaytn node.                                                                          |
| transactionObject.nonce    | Number   | (optional) Integer of a nonce. This allows to overwrite your own pending transactions that use the same nonce. If omitted, it will be set by caver-js via calling `caver.klay.getTransactionCount`. |
| callback                   | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second.                                                                                          |

**Return Value**

The `callback` will return the 32-byte transaction hash.

`PromiEvent`: A promise combined event emitter. Will be resolved when the transaction receipt is available. Additionally the following events are available:

- `"transactionHash"` returns `String`: Is fired right after the transaction is sent and a transaction hash is available.
- `"receipt"` returns `Object`: Is fired when the transaction receipt is available.
- `"error"` returns `Error`: Is fired if an error occurs during sending. On an out-of-gas error, the second parameter is the receipt.

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

**Parameters**

| 명칭                                     | 형식       | 설명                                                                                                                                                                                                  |
| -------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| transactionObject                      | Object   | The transaction object to send.                                                                                                                                                                     |
| transactionObject.type                 | String   | The type of "FEE_DELEGATED_CANCEL" transaction.                                                                                                                                                   |
| transactionObject.from                 | String   | The address of the sender.                                                                                                                                                                          |
| transactionObject.gas                  | Number   | The amount of gas to use for the transaction (unused gas is refunded).                                                                                                                              |
| transactionObject.gasPrice             | Number   | (optional) Gas price provided by the sender in peb. The gasPrice must be the same as the unitPrice set in the Klaytn node.                                                                          |
| transactionObject.nonce                | Number   | (optional) Integer of a nonce. This allows to overwrite your own pending transactions that use the same nonce. If omitted, it will be set by caver-js via calling `caver.klay.getTransactionCount`. |
| transactionObject.feePayer             | String   | (for fee payer) The fee payer address of the transaction.                                                                                                                                           |
| transactionObject.senderRawTransaction | String   | (for fee payer) The raw transaction of a sender.                                                                                                                                                    |
| callback                               | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second.                                                                                          |

**Return Value**

The `callback` will return the 32-byte transaction hash.

`PromiEvent`: A promise combined event emitter. Will be resolved when the transaction receipt is available. Additionally the following events are available:

- `"transactionHash"` returns `String`: Is fired right after the transaction is sent and a transaction hash is available.
- `"receipt"` returns `Object`: Is fired when the transaction receipt is available.
- `"error"` returns `Error`: Is fired if an error occurs during sending. On an out-of-gas error, the second parameter is the receipt.

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

**Parameters**

| 명칭                                     | 형식       | 설명                                                                                                                                                                                                                    |
| -------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| transactionObject                      | Object   | The transaction object to send.                                                                                                                                                                                       |
| transactionObject.type                 | String   | The type of "FEE_DELEGATED_CANCEL_WITH_RATIO" transaction.                                                                                                                                                        |
| transactionObject.from                 | String   | The address of the sender.                                                                                                                                                                                            |
| transactionObject.gas                  | Number   | The amount of gas to use for the transaction (unused gas is refunded).                                                                                                                                                |
| transactionObject.gasPrice             | Number   | (optional) Gas price provided by the sender in peb. The gasPrice must be the same as the unitPrice set in the Klaytn node.                                                                                            |
| transactionObject.nonce                | Number   | (optional) Integer of a nonce. This allows to overwrite your own pending transactions that use the same nonce. If omitted, it will be set by caver-js via calling `caver.klay.getTransactionCount`.                   |
| transactionObject.feeRatio             | Number   | Fee ratio of the fee payer. If it is 30, 30% of the fee will be paid by the fee payer. 70% will be paid by the sender. The range of fee ratio is 1 ~ 99, if it is out of range, the transaction will not be accepted. |
| transactionObject.feePayer             | String   | (for fee payer) The fee payer address of the transaction.                                                                                                                                                             |
| transactionObject.senderRawTransaction | String   | (for fee payer) The raw transaction of a sender.                                                                                                                                                                      |
| callback                               | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second.                                                                                                            |

**Return Value**

The `callback` will return the 32-byte transaction hash.

`PromiEvent`: A promise combined event emitter. Will be resolved when the transaction receipt is available. Additionally the following events are available:

- `"transactionHash"` returns `String`: Is fired right after the transaction is sent and a transaction hash is available.
- `"receipt"` returns `Object`: Is fired when the transaction receipt is available.
- `"error"` returns `Error`: Is fired if an error occurs during sending. On an out-of-gas error, the second parameter is the receipt.

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

