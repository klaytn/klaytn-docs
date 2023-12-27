# caver.validator

`caver.validator` 패키지는 클레이튼에서 애플리케이션을 구현할 때 사용해야 하는 유효성 검사 함수를 제공합니다.

**참고** `caver.validator`는 caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3) 부터 지원됩니다.

## validateSignedMessage <a href="#validatesignedmessage" id="validatesignedmessage"></a>

```javascript
caver.validator.validateSignedMessage(message, signatures, address [, isHashed])
```

서명에서 복구한 공개키를 클레이튼 계정의 계정 키와 비교하여 서명된 메시지의 유효성을 검사합니다.

**매개변수**

| 이름 | 유형 | 설명
| ---------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| message | String | Raw 메시지 문자열입니다. 이 메시지가 클레이튼 전용 접두사로 해시된 경우, 세 번째 매개변수는 `true`로 전달되어야 합니다.                                                                                                                           |
| signatures | object \| Array | `{ v, r, s }` 형식의 객체, `SignatureData`의 인스턴스 또는 `SignatureData`의 배열입니다. '\[ v, r, s ]' 또는 '\[\[ v, r, s ]]' 배열도 파라미터로 전달할 수 있으며, 이 경우 내부적으로 `SignatureData` 타입으로 변환됩니다. |
| address | String | 메시지에 서명한 계정의 주소입니다.                                                                                                                                                                                                          |
| isHashed | boolean | (선택 사항, 기본값: `false`) 파라미터로 전달된 메시지가 접두사 `"\x19Klaytn Signed Message:\n" + message.length + message`로 해시되었는지 여부입니다.                                                                                                |

**리턴 값**

`Promise`는 `boolean`을 반환합니다: 프로미스는 메시지의 서명이 유효한지 여부에 대한 부울 값으로 확인됩니다.

**예시**

```javascript
const address = '0xa84a1ce657e9d5b383cece6f4ba365e23fa234dd'
const message = 'Some Message'
const signature = [
	'0x1b',
	'0x8213e560e7bbe1f2e28fd69cbbb41c9108b84c98cd7c2c88d3c8e3549fd6ab10',
	'0x3ca40c9e20c1525348d734a6724db152b9244bff6e0ff0c2b811d61d8f874f00',
]
> caver.validator.validateSignedMessage(message, signature, address).then(console.log)


const address = '0xa84a1ce657e9d5b383cece6f4ba365e23fa234dd'
const hashedMessage = '0xa4b1069c1000981f4fdca0d62302dfff77c2d0bc17f283d961e2dc5961105b18'
const signature = [
	'0x1b',
	'0x8213e560e7bbe1f2e28fd69cbbb41c9108b84c98cd7c2c88d3c8e3549fd6ab10',
	'0x3ca40c9e20c1525348d734a6724db152b9244bff6e0ff0c2b811d61d8f874f00',
]
> caver.validator.validateSignedMessage(hashedMessage, signature, address, true).then(console.log)
```

## validateTransaction <a href="#validatetransaction" id="validatetransaction"></a>

```javascript
caver.validator.validateTransaction(tx)
```

트랜잭션의 유효성을 검사합니다. 이 함수는 클레이튼 계정의 계정 키에서 얻은 공개키와 `signatures`에서 복구한 공개키를 비교합니다. 트랜잭션 내부에 `feePayerSignatures` 변수가 있는 수수료 위임 트랜잭션의 경우, 이 함수는 `feePayerSignatures`에서 복구한 공개키를 수수료 납부자의 공개키와 비교합니다.

**매개변수**

| 이름 | 유형 | 설명
| ---- | ------ | ------------------------------------------------------------------- |
| tx | Object | 유효성을 검사할 [Transaction](./caver-transaction/caver-transaction.md#class)의 인스턴스입니다. |

**리턴 값**

`Promise`는 `boolean`을 반환합니다: 트랜잭션이 유효한지 여부에 대한 부울 값으로 프로미스가 해결됩니다.

**예시**

```javascript
// Basic transaction will be validated with `signatures`.
const tx = caver.transaction.valueTransfer.create({...})
> caver.validator.validateTransaction(tx).then(console.log)

// Fee-delegation transaction will be validated with `signatures` and `feePayerSignatures`.
const tx = caver.transaction.feeDelegatedValueTransfer.create({...})
> caver.validator.validateTransaction(tx).then(console.log)
```

## validateSender <a href="#validatesender" id="validatesender"></a>

```javascript
caver.validator.validateSender(tx)
```

트랜잭션 발신자의 유효성을 검사합니다. 클레이튼 계정의 계정 키의 공개키와 `signatures`에서 복구한 공개키를 비교하는 함수입니다.

**매개변수**

| 이름 | 유형 | 설명
| ---- | ------ | ------------------------------------------------------------------- |
| tx | Object | 유효성을 검사할 [Transaction](./caver-transaction/caver-transaction.md#class)의 인스턴스입니다. |

**리턴 값**

`Promise`는 `boolean`을 반환합니다: 트랜잭션이 유효한지 여부에 대한 부울 값으로 프로미스가 해결됩니다.

**예시**

```javascript
const tx = caver.transaction.valueTransfer.create({...})
> caver.validator.validateSender(tx).then(console.log)
```

## validateFeePayer <a href="#validatefeepayer" id="validatefeepayer"></a>

```javascript
caver.validator.validateFeePayer(tx)
```

트랜잭션에서 수수료 납부자의 유효성을 검사합니다. 이 함수는 수수료 납부자의 계정 키의 공개키를 `feePayerSignatures`에서 복구한 공개키와 비교합니다.

**매개변수**

| 이름 | 유형 | 설명
| ---- | ------ | ------------------------------------------------------------------- |
| tx | Object | 유효성을 검사할 [Transaction](./caver-transaction/caver-transaction.md#class)의 인스턴스입니다. |

**리턴 값**

`Promise`는 `boolean`을 반환합니다: 트랜잭션이 유효한지 여부에 대한 부울 값으로 프로미스가 해결됩니다.

**예시**

```javascript
const tx = caver.transaction.feeDelegatedValueTransfer.create({...})
> caver.validator.validateFeePayer(tx).then(console.log)
```
