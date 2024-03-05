# 밸류 전송 메모

## sendTransaction (VALUE_TRANSFER_MEMO) <a id="sendtransaction-value_transfer_memo"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```

[밸류 전송 메모](../../../../../../learn/transactions/basic.md#txtypevaluetransfermemo) 트랜잭션을 네트워크에 전송합니다.

**매개변수**

sendTransaction의 매개 변수는 트랜잭션 객체와 콜백 함수입니다.

| 이름                | Type     | 설명                                                                                  |
| ----------------- | -------- | ----------------------------------------------------------------------------------- |
| transactionObject | Object   | 전송할 트랜잭션 오브젝트입니다.                                                                   |
| callback          | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개 변수로 오류 개체를 반환하고 두 번째 매개 변수로 결과를 반환합니다. |

`VALUE_TRANSFER_MEMO` 타입의 트랜잭션 객체는 다음과 같은 구조를 가집니다:

| 이름       | Type                                | 설명                                                                                                          |
| -------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| type     | String                              | 트랜잭션 유형. "VALUE_TRANSFER_MEMO"                                    |
| from     | String                              | 이 트랜잭션 발신자의 주소입니다.                                                                                          |
| to       | String                              | 트랜잭션의 받는 사람 주소입니다.                                                                                          |
| value    | number \| string \| BN \| BigNumber | 트랜잭션에 대해 전송된 값(peb 단위)입니다.                                                               |
| data     | String                              | 전송할 메시지입니다.                                                                                                 |
| gas      | Number                              | 트랜잭션에 대해 지불할 최대 가스 금액(사용하지 않은 가스는 환불됨).                                                  |
| gasPrice | Number                              | (선택 사항) 발신자가 제공한 가스 가격(peb 단위). 가스 가격은 Klaytn 노드에 설정된 단위가격과 동일해야 합니다. |
| nonce    | Number                              | (선택 사항) nonce의 정수입니다. 생략하면 caver-js가 `caver.klay.getTransactionCount` 호출을 통해 설정합니다.      |

**리턴 값**

`callback`은 32바이트 트랜잭션 해시를 반환합니다.

`PromiEvent`: 프로미스 결합 이벤트 이미터입니다. 트랜잭션 영수증을 사용할 수 있을 때 해결됩니다. 추가로 다음과 같은 이벤트를 사용할 수 있습니다:

- `"transactionHash"`는 `String`을 반환합니다: 트랜잭션이 전송되고 트랜잭션 해시를 사용할 수 있는 직후에 발생합니다.
- `"receipt"`는 `Object`를 반환합니다: 트랜잭션 영수증을 사용할 수 있을 때 발생합니다.
- `"error"`는 `Error`를 반환합니다: 전송 중 에러가 발생하면 발생합니다. 가스 부족 오류에서 두 번째 매개 변수는 영수증입니다.

**예시**

```javascript
const account = caver.klay.accounts.wallet.add('0x{private key}')

// using the promise
caver.klay.sendTransaction({
    type: 'VALUE_TRANSFER_MEMO',
    from: account.address,
    to: '0x75c3098Be5E4B63FBAc05838DaAEE378dD48098d',
    gas: '300000',
    value: caver.utils.toPeb('1', `klay`),
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
    value: caver.utils.toPeb('1', `klay`),
    data: '0x68656c6c6f',
});
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
    ...
})
.on('error', console.error); // If an out-of-gas error, the second parameter is the receipt.
```

## sendTransaction (FEE_DELEGATED_VALUE_TRANSFER_MEMO) <a id="sendtransaction-fee_delegated_value_transfer_memo"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```

[수수료 위임 밸류 전송 메모](../../../../../../learn/transactions/fee-delegation.md#txtypefeedelegatedvaluetransfermemo) 트랜잭션을 네트워크에 보냅니다.

**매개변수**

sendTransaction의 매개 변수는 트랜잭션 객체와 콜백 함수입니다.

| 이름                | Type     | 설명                                                                                  |
| ----------------- | -------- | ----------------------------------------------------------------------------------- |
| transactionObject | Object   | 전송할 트랜잭션 오브젝트입니다.                                                                   |
| callback          | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개 변수로 오류 개체를 반환하고 두 번째 매개 변수로 결과를 반환합니다. |

`FEE_DELEGATED_VALUE_TRANSFER_MEMO` 유형의 트랜잭션 객체는 다음과 같은 구조를 가집니다:

| 이름       | Type                                | 설명                                                                                                                               |
| -------- | ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| type     | String                              | 트랜잭션 유형. "FEE_DELEGATED_VALUE_TRANSFER_MEMO" |
| from     | String                              | 이 트랜잭션 발신자의 주소입니다.                                                                                                               |
| to       | String                              | 트랜잭션의 받는 사람 주소입니다.                                                                                                               |
| value    | number \| string \| BN \| BigNumber | 트랜잭션에 대해 이체된 값(peb 단위)입니다.                                                                                    |
| data     | String                              | 전송할 메시지입니다.                                                                                                                      |
| gas      | Number                              | 트랜잭션에 대해 지불할 최대 가스 금액(사용하지 않은 가스는 환불됨).                                                                       |
| gasPrice | Number                              | (선택 사항) 발신자가 제공한 가스 가격(peb 단위). 가스 가격은 Klaytn 노드에 설정된 단위가격과 동일해야 합니다.                      |
| nonce    | Number                              | (선택 사항) nonce의 정수입니다. 생략할 경우, caver-js가 `caver.klay.getTransactionCount`를 호출하여 설정합니다.                         |

위와 같은 구조의 `FEE_DELEGATED_VALUE_TRANSFER_MEMO` 타입의 트랜잭션 객체 또는 `FEE_DELEGATED_VALUE_TRANSFER_MEMO` 타입의 `RLP 인코딩된 트랜잭션`을 발신자의 경우 [caver.klay.accounts.signTransaction](../../caver.klay.accounts.md#signtransaction)에서, 수수료 납부자의 경우 [caver.klay.accounts.feePayerSignTransaction](../../caver.klay.accounts.md#feepayersigntransaction)에서 매개변수로 사용할 수 있습니다.

수수료 납부자가 발신자가 서명한 RLP 인코딩 트랜잭션에 서명하고 네트워크에 전송하려면 다음 구조의 객체를 정의하고 `caver.klay.sendTransaction`을 호출합니다.

| 이름                   | Type   | 설명                         |
| -------------------- | ------ | -------------------------- |
| feePayer             | String | 트랜잭션의 수수료 납부자 주소입니다.       |
| senderRawTransaction | String | 발신자가 서명한 RLP 인코딩된 트랜잭션입니다. |

**리턴 값**

`callback`은 32바이트 트랜잭션 해시를 반환합니다.

`PromiEvent`: 프로미스 결합 이벤트 이미터입니다. 트랜잭션 영수증을 사용할 수 있을 때 해결됩니다. 추가로 다음과 같은 이벤트를 사용할 수 있습니다:

- `"transactionHash"`는 `String`을 반환합니다: 트랜잭션이 전송되고 트랜잭션 해시를 사용할 수 있는 직후에 발생합니다.
- `"receipt"`는 `Object`를 반환합니다: 트랜잭션 영수증을 사용할 수 있을 때 발생합니다.
- `"error"`는 `Error`를 반환합니다: 전송 중 에러가 발생하면 발생합니다. 가스 부족 오류에서 두 번째 매개 변수는 영수증입니다.

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
  value: caver.utils.toPeb('1', `klay`),
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
  value: caver.utils.toPeb('1', `klay`),
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
.on('error', console.error); // If an out-of-gas error, the second parameter is the receipt.
```

## sendTransaction (FEE_DELEGATED_VALUE_TRANSFER_MEMO_WITH_RATIO) <a id="sendtransaction-fee_delegated_value_transfer_memo_with_ratio"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```

[비율에 따른 수수료 위임 밸류 전송 메모](../../../../../../learn/transactions/partial-fee-delegation.md#txtypefeedelegatedvaluetransfermemowithratio) 트랜잭션을 네트워크에 전송합니다.

**매개변수**

sendTransaction의 매개 변수는 트랜잭션 객체와 콜백 함수입니다.

| 이름                | Type     | 설명                                                                                  |
| ----------------- | -------- | ----------------------------------------------------------------------------------- |
| transactionObject | Object   | 전송할 트랜잭션 오브젝트입니다.                                                                   |
| callback          | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개 변수로 오류 개체를 반환하고 두 번째 매개 변수로 결과를 반환합니다. |

`FEE_DELEGATED_VALUE_TRANSFER_MEMO_WITH_RATIO`타입의 수수료 위임형 트랜잭션 객체의 구조는 다음과 같습니다:

| 이름       | Type                                | 설명                                                                                                                                                                                    |
| -------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type     | String                              | 트랜잭션 유형. "FEE_DELEGATED_VALUE_TRANSFER_MEMO_WITH_RATIO" |
| from     | String                              | 이 트랜잭션 발신자의 주소입니다.                                                                                                                                                                    |
| to       | String                              | 트랜잭션의 받는 사람 주소입니다.                                                                                                                                                                    |
| value    | number \| string \| BN \| BigNumber | 트랜잭션에 대해 전송된 값(peb 단위)입니다.                                                                                                                                         |
| data     | String                              | 전송할 메시지입니다.                                                                                                                                                                           |
| gas      | Number                              | 트랜잭션에 대해 지불할 최대 가스 금액(사용하지 않은 가스는 환불됨).                                                                                                                            |
| gasPrice | Number                              | (선택 사항) 발신자가 제공한 가스 가격(peb 단위). 가스 가격은 Klaytn 노드에 설정된 단위가격과 동일해야 합니다.                                                                           |
| nonce    | Number                              | (선택 사항) nonce의 정수입니다. 생략할 경우, caver-js가 `caver.klay.getTransactionCount`를 호출하여 설정합니다.                                                                              |
| feeRatio | Number                              | 수수료 납부자의 수수료 비율입니다. 30이면 수수료의 30%는 수수료 지불자가 부담합니다. 70이면 70%는 발신자가 부담합니다. 수수료 비율의 범위는 1\~99이며, 범위를 벗어나면 트랜잭션이 승인되지 않습니다.                                                               |

위와 같은 구조의 `FEE_DELEGATED_VALUE_TRANSFER_MEMO_WITH_RATIO` 타입의 트랜잭션 객체 또는 `FEE_DELEGATED_VALUE_TRANSFER_MEMO_WITH_RATIO` 타입의 `RLP 인코딩된 트랜잭션`을 발신자의 경우 [caver.klay.accounts.signTransaction](../../caver.klay.accounts.md#signtransaction)에서, 수수료 납부자의 경우 [caver.klay.accounts.feePayerSignTransaction](../../caver.klay.accounts.md#feepayersigntransaction)에서 매개변수로 사용할 수 있습니다.

수수료 납부자가 발신자가 서명한 RLP 인코딩 트랜잭션에 서명하고 네트워크에 전송하려면 다음 구조의 객체를 정의하고 `caver.klay.sendTransaction`을 호출합니다.

| 이름                   | Type   | 설명                         |
| -------------------- | ------ | -------------------------- |
| feePayer             | String | 트랜잭션의 수수료 납부자 주소입니다.       |
| senderRawTransaction | String | 발신자가 서명한 RLP 인코딩된 트랜잭션입니다. |

**리턴 값**

`callback`은 32바이트 트랜잭션 해시를 반환합니다.

`PromiEvent`: 프로미스 결합 이벤트 이미터입니다. 트랜잭션 영수증을 사용할 수 있을 때 해결됩니다. 추가로 다음과 같은 이벤트를 사용할 수 있습니다:

- `"transactionHash"`는 `String`을 반환합니다: 트랜잭션이 전송되고 트랜잭션 해시를 사용할 수 있는 직후에 발생합니다.
- `"receipt"`는 `Object`를 반환합니다: 트랜잭션 영수증을 사용할 수 있을 때 발생합니다.
- `"error"`는 `Error`를 반환합니다: 전송 중 에러가 발생하면 발생합니다. 가스 부족 오류에서 두 번째 매개 변수는 영수증입니다.

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
  value: caver.utils.toPeb('1', `klay`),
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
  value: caver.utils.toPeb('1', `klay`),
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
.on('error', console.error); // If an out-of-gas error, the second parameter is the receipt.
```
