# Value Transfer Memo Transaction <a id="value-transfer-memo-transaction"></a>

## sendTransaction (VALUE_TRANSFER_MEMO) <a id="sendtransaction-value_transfer_memo"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
Sends a [Value Transfer Memo](../../../../../klaytn/design/transactions/basic.md#txtypevaluetransfermemo) transaction to the network.

**매개변수**

The parameters of sendTransaction are a transaction object and a callback function.

| 명칭                | 형식       | 설명                                                                   |
| ----------------- | -------- | -------------------------------------------------------------------- |
| transactionObject | 객체       | The transaction object to send.                                      |
| callback          | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

A transaction object of type `VALUE_TRANSFER_MEMO` has the following structure:

| 명칭       | 형식                                              | 설명                                                                                                                         |
| -------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| type     | 문자열                                             | Transaction Type. "VALUE_TRANSFER_MEMO"                                                                                  |
| from     | 문자열                                             | Address of this transaction sender.                                                                                        |
| to       | 문자열                                             | The destination address of the transaction.                                                                                |
| value    | Number &#124; String &#124; BN &#124; BigNumber | The value transferred for the transaction in peb.                                                                          |
| data     | 문자열                                             | The message to send with.                                                                                                  |
| gas      | Number                                          | The maximum amount of gas willing to pay for the transaction (unused gas is refunded).                                     |
| gasPrice | Number                                          | (optional) Gas price provided by the sender in peb. The gasPrice must be the same as the unitPrice set in the Klaytn node. |
| nonce    | Number                                          | (선택사항) 논스의 정숫값입니다. If omitted, it will be set by caver-js via calling `caver.klay.getTransactionCount`.                    |

**리턴값**

The `callback` will return the 32-byte transaction hash.

`PromiEvent`: 프로미스(promise)가 조합된 이벤트 이미터(event emitter). Will be resolved when the transaction receipt is available. Additionally the following events are available:

- `"transactionHash"` returns `String`: Is fired right after the transaction is sent and a transaction hash is available.
- `"receipt"` returns `Object`: Is fired when the transaction receipt is available.
- `"error"` returns `Error`: Is fired if an error occurs during sending. 가스 부족 에러(out-of-gas)가 발생한 경우 두 번째 인자는 트랜잭션 영수증입니다.

**예시**

```javascript
const account = caver.klay.accounts.wallet.add('0x{private key}')

// using the promise
caver.klay.sendTransaction({
    type: 'VALUE_TRANSFER_MEMO',
    from: account.address,
    to: '0x75c3098Be5E4B63FBAc05838DaAEE378dD48098d',
    gas: '300000',
    value: caver.utils.toPeb('1', 'KLAY'),
    data: '0x68656c6c6f',
});
.then(function(receipt){
    ...
});

// using the event emitter
caver.klay.sendTransaction({
    type: 'VALUE_TRANSFER_MEMO',
    from: account.address,
    to: '0x75c3098Be5E4B63FBAc05838DaAEE378dD48098d',
    gas: '300000',
    value: caver.utils.toPeb('1', 'KLAY'),
    data: '0x68656c6c6f',
});
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
    ...
})
.on('error', console.error); // 가스 부족 에러(out-of-gas)가 발생한 경우 두 번째 인자는 트랜잭션 영수증입니다.
```


## sendTransaction (FEE_DELEGATED_VALUE_TRANSFER_MEMO) <a id="sendtransaction-fee_delegated_value_transfer_memo"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
Sends a [Fee Delegated Value Transfer Memo](../../../../../klaytn/design/transactions/fee-delegation.md#txtypefeedelegatedvaluetransfermemo) transaction to the network.

**매개변수**

The parameters of sendTransaction are a transaction object and a callback function.

| 명칭                | 형식       | 설명                                                                   |
| ----------------- | -------- | -------------------------------------------------------------------- |
| transactionObject | 객체       | The transaction object to send.                                      |
| callback          | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

A transaction object of type `FEE_DELEGATED_VALUE_TRANSFER_MEMO` has the following structure:

| 명칭       | 형식                                              | 설명                                                                                                                         |
| -------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| type     | 문자열                                             | Transaction Type. "FEE_DELEGATED_VALUE_TRANSFER_MEMO"                                                                  |
| from     | 문자열                                             | Address of this transaction sender.                                                                                        |
| to       | 문자열                                             | The destination address of the transaction.                                                                                |
| value    | Number &#124; String &#124; BN &#124; BigNumber | The value transferred for the transaction in peb.                                                                          |
| data     | 문자열                                             | The message to send with.                                                                                                  |
| gas      | Number                                          | The maximum amount of gas willing to pay for the transaction (unused gas is refunded).                                     |
| gasPrice | Number                                          | (optional) Gas price provided by the sender in peb. The gasPrice must be the same as the unitPrice set in the Klaytn node. |
| nonce    | Number                                          | (선택사항) 논스의 정숫값입니다. If omitted, it will be set by caver-js via calling `caver.klay.getTransactionCount`.                    |

A transaction object of type `FEE_DELEGATED_VALUE_TRANSFER_MEMO` with the above structure or an `RLP-encoded transaction` of type `FEE_DELEGATED_VALUE_TRANSFER_MEMO` can be used as a parameter in [caver.klay.accounts.signTransaction](../caver.klay.accounts.md#signtransaction) for sender and in [caver.klay.accounts.feePayerSignTransaction](../caver.klay.accounts.md#feepayersigntransaction) for fee payer.

In order for the fee payer to sign an RLP encoded transaction signed by the sender and send it to the network, define an object with the following structure and call `caver.klay.sendTransaction`.

| 명칭                   | 형식  | 설명                                            |
| -------------------- | --- | --------------------------------------------- |
| feePayer             | 문자열 | The fee payer address of the transaction.     |
| senderRawTransaction | 문자열 | The RLP-encoded transaction signed by sender. |

**리턴값**

The `callback` will return the 32-byte transaction hash.

`PromiEvent`: 프로미스(promise)가 조합된 이벤트 이미터(event emitter). Will be resolved when the transaction receipt is available. Additionally the following events are available:

- `"transactionHash"` returns `String`: Is fired right after the transaction is sent and a transaction hash is available.
- `"receipt"` returns `Object`: Is fired when the transaction receipt is available.
- `"error"` returns `Error`: Is fired if an error occurs during sending. 가스 부족 에러(out-of-gas)가 발생한 경우 두 번째 인자는 트랜잭션 영수증입니다.

**예시**

```javascript
const sender = caver.klay.accounts.wallet.add('0x{private key}')
const feePayer = caver.klay.accounts.wallet.add('0x{private key}')

// using the promise
const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
  type: 'FEE_DELEGATED_VALUE_TRANSFER_MEMO',
  from: sender.address,
  to: '0x75c3098Be5E4B63FBAc05838DaAEE378dD48098d',
  gas: '300000',
  value: caver.utils.toPeb('1', 'KLAY'),
  data: '0x68656c6c6f',
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
  type: 'FEE_DELEGATED_VALUE_TRANSFER_MEMO',
  from: sender.address,
  to: '0x75c3098Be5E4B63FBAc05838DaAEE378dD48098d',
  gas: '300000',
  value: caver.utils.toPeb('1', 'KLAY'),
  data: '0x68656c6c6f',
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


## sendTransaction (FEE_DELEGATED_VALUE_TRANSFER_MEMO_WITH_RATIO) <a id="sendtransaction-fee_delegated_value_transfer_memo_with_ratio"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
Sends a [Fee Delegated Value Transfer Memo With Ratio](../../../../../klaytn/design/transactions/partial-fee-delegation.md#txtypefeedelegatedvaluetransfermemowithratio) transaction to the network.

**매개변수**

The parameters of sendTransaction are a transaction object and a callback function.

| 명칭                | 형식       | 설명                                                                   |
| ----------------- | -------- | -------------------------------------------------------------------- |
| transactionObject | 객체       | The transaction object to send.                                      |
| callback          | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

A transaction object of type `FEE_DELEGATED_VALUE_TRANSFER_MEMO_WITH_RATIO` has the following structure:

| 명칭       | 형식                                              | 설명                                                                                                                                                                                              |
| -------- | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type     | 문자열                                             | Transaction Type. "FEE_DELEGATED_VALUE_TRANSFER_MEMO_WITH_RATIO"                                                                                                                          |
| from     | 문자열                                             | Address of this transaction sender.                                                                                                                                                             |
| to       | 문자열                                             | The destination address of the transaction.                                                                                                                                                     |
| value    | Number &#124; String &#124; BN &#124; BigNumber | The value transferred for the transaction in peb.                                                                                                                                               |
| data     | 문자열                                             | The message to send with.                                                                                                                                                                       |
| gas      | Number                                          | The maximum amount of gas willing to pay for the transaction (unused gas is refunded).                                                                                                          |
| gasPrice | Number                                          | (optional) Gas price provided by the sender in peb. The gasPrice must be the same as the unitPrice set in the Klaytn node.                                                                      |
| nonce    | Number                                          | (선택사항) 논스의 정숫값입니다. If omitted, it will be set by caver-js via calling `caver.klay.getTransactionCount`.                                                                                         |
| feeRatio | Number                                          | 트랜잭션 수수료 납부자의 부담 비율입니다. 이 값이 30이면, 트랜잭션 수수료의 30%를 트랜잭션 수수료 납부자가 지불합니다. 나머지 70%는 트랜잭션 발신자가 지불합니다. The range of fee ratio is 1 ~ 99, if it is out of range, the transaction will not be accepted. |

A transaction object of type `FEE_DELEGATED_VALUE_TRANSFER_MEMO_WITH_RATIO` with the above structure or an `RLP-encoded transaction` of type `FEE_DELEGATED_VALUE_TRANSFER_MEMO_WITH_RATIO` can be used as a parameter in [caver.klay.accounts.signTransaction](../caver.klay.accounts.md#signtransaction) for sender and in [caver.klay.accounts.feePayerSignTransaction](../caver.klay.accounts.md#feepayersigntransaction) for fee payer.

In order for the fee payer to sign an RLP encoded transaction signed by the sender and send it to the network, define an object with the following structure and call `caver.klay.sendTransaction`.

| 명칭                   | 형식  | 설명                                            |
| -------------------- | --- | --------------------------------------------- |
| feePayer             | 문자열 | The fee payer address of the transaction.     |
| senderRawTransaction | 문자열 | The RLP-encoded transaction signed by sender. |

**리턴값**

The `callback` will return the 32-byte transaction hash.

`PromiEvent`: 프로미스(promise)가 조합된 이벤트 이미터(event emitter). Will be resolved when the transaction receipt is available. Additionally the following events are available:

- `"transactionHash"` returns `String`: Is fired right after the transaction is sent and a transaction hash is available.
- `"receipt"` returns `Object`: Is fired when the transaction receipt is available.
- `"error"` returns `Error`: Is fired if an error occurs during sending. 가스 부족 에러(out-of-gas)가 발생한 경우 두 번째 인자는 트랜잭션 영수증입니다.

**예시**

```javascript
const sender = caver.klay.accounts.wallet.add('0x{private key}')
const feePayer = caver.klay.accounts.wallet.add('0x{private key}')

// using the promise
const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
  type: 'FEE_DELEGATED_VALUE_TRANSFER_MEMO_WITH_RATIO',
  from: sender.address,
  to: '0x75c3098Be5E4B63FBAc05838DaAEE378dD48098d',
  gas: '300000',
  feeRatio: 20,
  data: '0x68656c6c6f',
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
  type: 'FEE_DELEGATED_VALUE_TRANSFER_MEMO_WITH_RATIO',
  from: sender.address,
  to: '0x75c3098Be5E4B63FBAc05838DaAEE378dD48098d',
  gas: '300000',
  feeRatio: 20,
  data: '0x68656c6c6f',
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


