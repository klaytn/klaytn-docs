# 레거시

## sendTransaction (Legacy) <a id="sendtransaction-legacy"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
트랜잭션을 네트워크에 보냅니다.

참고: `AccountKeyLegacy`가 있는 계정만 이 트랜잭션을 보낼 수 있습니다.

**매개변수**

sendTransaction의 매개 변수는 트랜잭션 객체와 콜백 함수입니다.

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| transactionObject | Object | 전송할 트랜잭션 오브젝트입니다. |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개 변수로 오류 개체를 반환하고 두 번째 매개 변수로 결과를 반환합니다. |

`LEGACY` 타입의 트랜잭션 객체는 다음과 같은 구조를 가집니다:

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| from | String | 이 트랜잭션 발신자의 주소입니다. |
| to | String | (선택 사항) 컨트랙트 생성 트랜잭션에 대해 정의되지 않은 메시지의 대상 주소입니다. |
| value | number &#124; string &#124; BN &#124; BigNumber | (선택 사항) 트랜잭션에 대해 전송된 값(컨트랙트 생성 트랜잭션인 경우 엔다우먼트도 포함). |
| gas | Number | 트랜잭션에 대해 지불할 최대 가스 금액(미사용 가스는 환불됨). |
| gasPrice | Number | (선택 사항) 발신자가 peb 단위로 제공한 가스 가격입니다. 가스 가격은 Klaytn 노드에 설정된 단위가격과 동일해야 합니다. |
| data | String | (선택 사항) 컨트랙트에서 함수 호출 데이터를 포함하는 [ABI 바이트 문자열](http://solidity.readthedocs.io/en/latest/abi-spec.html) 또는 컨트랙트 생성 트랜잭션의 경우 초기화 코드입니다. |
| nonce | Number | (선택 사항) nonce의 정수입니다. 생략할 경우, caver-js가 `caver.klay.getTransactionCount`를 호출하여 설정합니다. |

**리턴 값**

`callback`은 32바이트 트랜잭션 해시를 반환합니다.

`PromiEvent`: 프로미스 결합 이벤트 이미터. 트랜잭션 영수증을 사용할 수 있을 때 해결됩니다. 추가로 다음과 같은 이벤트를 사용할 수 있습니다:

- ``"transactionHash"``는 ``String``을 반환합니다: 트랜잭션이 전송되고 트랜잭션 해시를 사용할 수 있는 직후에 발생합니다.
- ``"receipt"``는 ``Object``를 반환합니다: 트랜잭션 영수증을 사용할 수 있을 때 발생합니다.
- ``"error"``는 ``Error``를 반환합니다: 전송 중 에러가 발생하면 발생합니다. 가스 부족 오류에서 두 번째 매개 변수는 영수증입니다.

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
.on('error', console.error); // If an out-of-gas error, the second parameter is the receipt.
```
