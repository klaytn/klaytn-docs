# 기본 트랜잭션<a id="legacy-transaction"></a>

## sendTransaction (Legacy) <a id="sendtransaction-legacy"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
트랜잭션을 네트워크로 보냅니다.

참고: ` AccountKeyLegacy` 가 있는 계정 만, sendTransaction 이 가능합니다.

**Parameters**

sendTransaction의 매개 변수는 트랜잭션 객체 및 콜백 함수입니다.

| 이름                | 타입       | 설명                                                                   |
| ----------------- | -------- | -------------------------------------------------------------------- |
| transactionObject | Object   | 전송하려는 트랜잭션 객체.                                                       |
| callback          | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

` LEGACY`  유형의 트랜잭션 오브젝트의 구조는 다음과 같습니다.

| 이름    | 타입                                              | 설명                                                                                                                                                               |
| ----- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from  | String                                          | 이 트랜잭션 발신자의 주소입니다.                                                                                                                                               |
| to    | String                                          | (선택 사항) 메시지 수신자 주소이며, 트랜잭션이 컨트랙트 생성 트랜잭션일 경우 수신자 주소가 입력되지 않습니다.                                                                                                  |
| value | Number &#124; String &#124; BN &#124; BigNumber | (선택 사항) 트랜잭션으로 전송할 peb 단위로 환산된 KLAY입니다. 컨트랙트 생성 트랜잭션일 경우 (생성 함수가 KLAY를 받을 수 있게 설정되었다면) 컨트랙트가 생성 시 보유하는 KLAY입니다.                                                  |
| gas   | Number                                          | 트랜잭션에 지불할 의향이 있는 최대 가스량(사용하지 않은 가스는 환불됨).                                                                                                                        |
| 가스 가격 | Number                                          | (선택사항) 트랜잭션 발신자가 설정한 가스 가격으로 단위는 peb입니다. gasPrice는 Klaytn 노드에 설정된 unitPrice와 같아야 합니다.                                                                            |
| 데이터   | String                                          | (선택 사항) 컨트랙트의 함수를 호출할 수 있는 데이터가 담긴 [ABI byte string](http://solidity.readthedocs.io/en/latest/abi-spec.html) 또는, 컨트랙트 생성 트랜잭션일 경우 컨트랙트를 초기화(initialize)하는 코드입니다. |
| 논스    | Number                                          | (선택사항) 논스의 정숫값입니다. 생략하면 `caver.klay.getTransactionCount` 값으로 caver-js가 설정합니다.                                                                                    |

**리턴값**

`callback`은 32바이트 트랜잭션 해시를 반환합니다.

`PromiEvent`: 프로미스(promise)가 조합된 이벤트 이미터(event emitter). 트랜잭션 영수증이 준비되면 resolve 됩니다. 추가로 다음 이벤트가 발생할 수 있습니다.

- `"transactionHash"`는 `String`를 반환: 트랜잭션을 보내고 트랜잭션 해시가 준비된 직후에 발생.
- `"receipt"`는 `Object`를 반환: 트랜잭션 영수중이 중비되면 발생.
- `"error"`는 `Error`를 반환: 전송 중 에러가 발생하면 발생. 가스 부족 에러(out-of-gas)가 발생한 경우 두 번째 인자는 트랜잭션 영수증입니다.

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
