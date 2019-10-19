# Smart Contract Execution Transaction

## sendTransaction (SMART_CONTRACT_EXECUTION)

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
Sends a [Smart Contract Execution](../../../../../klaytn/design/transactions/basic.md#txtypesmartcontractexecution) transaction to the network.

**Parameters**

| 명칭                         | 형식                                              | 설명                                                                                                                                                                                                  |
| -------------------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| transactionObject          | Object                                          | The transaction object to send.                                                                                                                                                                     |
| transactionObject.type     | String                                          | The type of "SMART_CONTRACT_EXECUTION" transaction.                                                                                                                                               |
| transactionObject.from     | String                                          | The address of the sender.                                                                                                                                                                          |
| transactionObject.to       | String                                          | the address of the deployed smart contract.                                                                                                                                                         |
| transactionObject.value    | Number &#124; String &#124; BN &#124; BigNumber | (선택 사항) 트랜잭션에 의해 전송된 peb 단위의 값. If omitted, it will be set to zero.                                                                                                                                 |
| transactionObject.gas      | Number                                          | The amount of gas to use for the transaction (unused gas is refunded).                                                                                                                              |
| transactionObject.gasPrice | Number                                          | (optional) Gas price provided by the sender in peb. The gasPrice must be the same as the unitPrice set in the Klaytn node.                                                                          |
| transactionObject.nonce    | Number                                          | (optional) Integer of a nonce. This allows to overwrite your own pending transactions that use the same nonce. If omitted, it will be set by caver-js via calling `caver.klay.getTransactionCount`. |
| transactionObject.data     | String                                          | An input data of the smart contract.                                                                                                                                                                |
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

// Calling smart contract function

// using the promise
caver.klay.sendTransaction({
    type: 'SMART_CONTRACT_EXECUTION',
    from: account.address,
    to: '0x1d389d91886fd0af55f44c56e1240eb6162ddff8',
    data: '0x6353586b0000000000000000000000001d389d91886fd0af55f44c56e1240eb6162ddff8',
    gas: '300000',
    value: '0x174876e800',
})
.then(function(receipt){
    ...
});

// using the event emitter
caver.klay.sendTransaction({
    type: 'SMART_CONTRACT_EXECUTION',
    from: account.address,
    to: '0x1d389d91886fd0af55f44c56e1240eb6162ddff8',
    data: '0x6353586b0000000000000000000000001d389d91886fd0af55f44c56e1240eb6162ddff8',
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
```


## sendTransaction (FEE_DELEGATED_SMART_CONTRACT_EXECUTION)

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
Sends a [Fee Delegated Smart Contract Execution](../../../../../klaytn/design/transactions/fee-delegation.md#txtypefeedelegatedsmartcontractexecution) transaction to the network.

**Parameters**

| 명칭                                     | 형식                                              | 설명                                                                                                                                                                                                  |
| -------------------------------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| transactionObject                      | Object                                          | The transaction object to send.                                                                                                                                                                     |
| transactionObject.type                 | String                                          | The type of "FEE_DELEGATED_SMART_CONTRACT_EXECUTION" transaction.                                                                                                                               |
| transactionObject.from                 | String                                          | The address of the sender.                                                                                                                                                                          |
| transactionObject.to                   | String                                          | the address of the deployed smart contract.                                                                                                                                                         |
| transactionObject.value                | Number &#124; String &#124; BN &#124; BigNumber | (선택 사항) 트랜잭션에 의해 전송된 peb 단위의 값. If omitted, it will be set to zero.                                                                                                                                 |
| transactionObject.gas                  | Number                                          | The amount of gas to use for the transaction (unused gas is refunded).                                                                                                                              |
| transactionObject.gasPrice             | Number                                          | (optional) Gas price provided by the sender in peb. The gasPrice must be the same as the unitPrice set in the Klaytn node.                                                                          |
| transactionObject.nonce                | Number                                          | (optional) Integer of a nonce. This allows to overwrite your own pending transactions that use the same nonce. If omitted, it will be set by caver-js via calling `caver.klay.getTransactionCount`. |
| transactionObject.data                 | String                                          | An input data of the smart contract.                                                                                                                                                                |
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
  type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
  from: sender.address,
  to:   '0xe56a7260015ad92dd48a305ed232090e51e02391',
  data: '0x6353586b0000000000000000000000001d389d91886fd0af55f44c56e1240eb6162ddff8',
  gas:  '300000',
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
  type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
  from: sender.address,
  to:   '0xe56a7260015ad92dd48a305ed232090e51e02391',
  data: '0x6353586b0000000000000000000000001d389d91886fd0af55f44c56e1240eb6162ddff8',
  gas:  '300000',
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


## sendTransaction (FEE_DELEGATED_SMART_CONTRACT_EXECUTION_WITH_RATIO)

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
Sends a [Fee Delegated Smart Contract Execution With Ratio](../../../../../klaytn/design/transactions/partial-fee-delegation.md#txtypefeedelegatedsmartcontractexecutionwithratio) transaction to the network.

**Parameters**

| 명칭                                     | 형식                                              | 설명                                                                                                                                                                                                                    |
| -------------------------------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| transactionObject                      | Object                                          | The transaction object to send.                                                                                                                                                                                       |
| transactionObject.type                 | String                                          | The type of "FEE_DELEGATED_SMART_CONTRACT_EXECUTION_WITH_RATIO" transaction.                                                                                                                                    |
| transactionObject.from                 | String                                          | The address of the sender.                                                                                                                                                                                            |
| transactionObject.to                   | String                                          | the address of the deployed smart contract.                                                                                                                                                                           |
| transactionObject.value                | Number &#124; String &#124; BN &#124; BigNumber | (선택 사항) 트랜잭션에 의해 전송된 peb 단위의 값. If omitted, it will be set to zero.                                                                                                                                                   |
| transactionObject.gas                  | Number                                          | The amount of gas to use for the transaction (unused gas is refunded).                                                                                                                                                |
| transactionObject.gasPrice             | Number                                          | (optional) Gas price provided by the sender in peb. The gasPrice must be the same as the unitPrice set in the Klaytn node.                                                                                            |
| transactionObject.nonce                | Number                                          | (optional) Integer of a nonce. This allows to overwrite your own pending transactions that use the same nonce. If omitted, it will be set by caver-js via calling `caver.klay.getTransactionCount`.                   |
| transactionObject.data                 | String                                          | An input data of the smart contract.                                                                                                                                                                                  |
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
  type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION_WITH_RATIO',
  from: sender.address,
  to:   '0xe56a7260015ad92dd48a305ed232090e51e02391',
  data: '0x6353586b0000000000000000000000001d389d91886fd0af55f44c56e1240eb6162ddff8',
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
  type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION_WITH_RATIO',
  from: sender.address,
  to:   '0xe56a7260015ad92dd48a305ed232090e51e02391',
  data: '0x6353586b0000000000000000000000001d389d91886fd0af55f44c56e1240eb6162ddff8',
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
.on('error', console.error); // 가스 부족 에러(out-of-gas)가 발생한 경우 두 번째 인자는 트랜잭션 영수증입니다.
```

