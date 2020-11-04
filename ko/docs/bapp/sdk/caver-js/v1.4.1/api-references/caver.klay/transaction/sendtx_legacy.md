# Legacy

## sendTransaction \(Legacy\) <a id="sendtransaction-legacy"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```

트랜잭션을 네트워크로 보냅니다.

참고: ` AccountKeyLegacy` 가 있는 계정 만, sendTransaction 이 가능합니다.

**매개변수**

sendTransaction의 매개 변수는 트랜잭션 객체 및 콜백 함수입니다.

| 명칭                | 형식       | 설명                                                                                                             |
|:----------------- |:-------- |:-------------------------------------------------------------------------------------------------------------- |
| transactionObject | Object   | 전송하려는 트랜잭션 객체.                                                                                                 |
| callback          | Function | \(optional\) Optional callback, returns an error object as the first parameter and the result as the second. |

` LEGACY`  유형의 트랜잭션 오브젝트의 구조는 다음과 같습니다.

| 명칭       | 형식        | 설명                                                                                                                                                                                                                                    |
|:-------- |:--------- |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from     | String    | 이 트랜잭션 발신자의 주소입니다.                                                                                                                                                                                                                    |
| to       | String    | \(optional\) The destination address of the message, left undefined for a contract-creation transaction.                                                                                                                            |
| value    | Number \ | String \| BN \| BigNumber | \(optional\) The value transferred for the transaction in peb, also the endowment if it's a contract-creation transaction.                                                                            |
| gas      | Number    | The maximum amount of gas willing to pay for the transaction \(unused gas is refunded\).                                                                                                                                            |
| gasPrice | Number    | \(optional\) Gas price provided by the sender in peb. gasPrice는 Klaytn 노드에 설정된 unitPrice와 같아야 합니다.                                                                                                                                  |
| data     | String    | \(optional\) Either an [ABI byte string](http://solidity.readthedocs.io/en/latest/abi-spec.html) containing the data of the function call on a contract, or in the case of a contract-creation transaction the initialization code. |
| 논스       | Number    | \(optional\) Integer of a nonce. 생략하면 `caver.klay.getTransactionCount` 값으로 caver-js가 설정합니다.                                                                                                                                         |

**리턴값**

`callback`은 32바이트 트랜잭션 해시를 반환합니다.

`PromiEvent`: 프로미스(promise)가 조합된 이벤트 이미터(event emitter). 트랜잭션 영수증이 준비되면 resolve 됩니다. 추가로 다음 이벤트가 발생할 수 있습니다.

* `"transactionHash"`는 `String`를 반환: 트랜잭션을 보내고 트랜잭션 해시가 준비된 직후에 발생.
* `"receipt"`는 `Object`를 반환: 트랜잭션 영수중이 중비되면 발생.
* `"error"`는 `Error`를 반환: 전송 중 에러가 발생하면 발생. 가스 부족 에러(out-of-gas)가 발생한 경우 두 번째 인자는 트랜잭션 영수증입니다.

**예시**

```javascript
const account = caver.klay.accounts.wallet.add('0x{private key}')

var code = "0x603d80600c6000396000f3007c01000000000000000000000000000000000000000000000000000000006000350463c6888fa18114602d57005b6007600435028060005260206000f3";

// using the callback
caver.klay.sendTransaction({
    from: account.address,
    data: code // deploying a contracrt
}, function(error, hash){
    ...
});

// using the promise
caver.klay.sendTransaction({
    from: account.address,
    to: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe',
    value: '1000000000000000'
})
.then(function(receipt){
    ...
});

// using the event emitter
caver.klay.sendTransaction({
    from: account.address,
    to: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe',
    value: '1000000000000000'
})
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
    ...
})
.on('error', console.error); // 가스 부족 에러(out-of-gas)가 발생한 경우 두 번째 인자는 트랜잭션 영수증입니다.
```

