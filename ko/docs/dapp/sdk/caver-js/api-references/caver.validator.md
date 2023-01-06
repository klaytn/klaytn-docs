# caver.validator

`caver.validator` 패키지는 Klaytn에 애플리케이션을 구현할 때 사용되는 검증 함수를 제공합니다.

**NOTE** `caver.validator`는 caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3) 이후로 제공됩니다.

## validateSignedMessage <a href="#validatesignedmessage" id="validatesignedmessage"></a>

```javascript
caver.validator.validateSignedMessage(message, signatures, address [, isHashed])
```

서명에서 복구된 퍼블릭 키를 Klaytn 계정의 계정 키와 비교하여 서명된 메시지를 검증합니다.

**파라미터**

| 이름       | 타입        | 설명                                                                                                                                                                                    |
| -------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 메시지      | string    | 메시지 문자열입니다. 메시지가 Klaytn 고유의 접두사로 해시화되어 있다면, 세 번째 파라미터는 `true`로 전달되어야 합니다.                                                                                                             |
| 서명       | object \ | Array | `{ v, r, s }` 형식의 객체, `SignatureData`의 인스턴스, 또는 `SignatureData`의 배열입니다. '\[ v, r, s ]' 또는 '\[\[ v, r, s ]]' 배열 또한 파라미터로 전달될 수 있습니다. 이 경우 내부적으로 `SignatureData` 타입으로 변환됩니다. |
| address  | string    | 메시지에 서명하는 계정 주소입니다.                                                                                                                                                                   |
| isHashed | boolean   | (선택 사항, 기본값: `false`) 마지막 매개 변수가 `true`이면, 주어진 `message`에는 자동적으로 `"\x19Klaytn Signed Message:\n" + message.length + message`가 접두사로 붙지 않을 것이며, 이미 접두사가 있다고 간주될 것입니다.                 |

**리턴값**

`Promise`는 `PromiEvent`를 반환: Promise가 새로운 컨트랙트 인스턴스와 함께 해결(resolved)됩니다.

**예제**

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

트랜잭션을 검증합니다. 이 함수는 `signatures`에서 복구된 퍼블릭 키와 Klaytn 계정 키의 퍼블릭 키를 비교합니다. 만약 트랜잭션이 `feePayerSignatures` 변수와 함께 수수료가 위임되었다면, 이 함수는 수수료 지불자의 퍼블릭 키의 `feePayerSignatures`에서 복구된 퍼블릭 키들을 비교합니다.

**파라미터**

| 이름 | 타입 | 설명                                                           |
| -- | -- | ------------------------------------------------------------ |
| tx | 객체 | 검증할 [feePayerSignatures](caver.transaction/#class)의 인스턴스입니다. |

**리턴값**

`Promise`는 `PromiEvent`를 반환: 트랜잭션이 유효한지 여부에 따라 Promise가 불리언 값과 함께 해결(resolved)됩니다.

**예제**

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

트랜잭션 발신자를 검증합니다. 이 함수는 `signatures`에서 복구된 퍼블릭 키와 Klaytn 계정 키의 퍼블릭 키를 비교합니다.

**파라미터**

| 이름 | 타입 | 설명                                                           |
| -- | -- | ------------------------------------------------------------ |
| tx | 객체 | 검증할 [feePayerSignatures](caver.transaction/#class)의 인스턴스입니다. |

**리턴값**

`Promise`는 `boolean`을 반환: 트랜잭션이 유효한지 여부에 따라 Promise가 불리언 값과 함께 해결(resolved)됩니다.

**예제**

```javascript
const tx = caver.transaction.valueTransfer.create({...})
> caver.validator.validateSender(tx).then(console.log)
```

## validateFeePayer <a href="#validatefeepayer" id="validatefeepayer"></a>

```javascript
caver.validator.validateFeePayer(tx)
```

트랜잭션의 수수료 납부자를 검증합니다. 이 함수는 `feePayerSignatures`에서 복구된 퍼블릭 키와 수수료 납부자 계정의 퍼블릭 키를 비교합니다.

**파라미터**

| 이름 | 타입 | 설명                                                           |
| -- | -- | ------------------------------------------------------------ |
| tx | 객체 | 검증할 [feePayerSignatures](caver.transaction/#class)의 인스턴스입니다. |

**리턴값**

`Promise`는 `boolean`을 반환: 트랜잭션이 유효한지 여부에 따라 Promise가 불리언 값과 함께 해결(resolved)됩니다.

**예제**

```javascript
const tx = caver.transaction.feeDelegatedValueTransfer.create({...})
> caver.validator.validateFeePayer(tx).then(console.log)
```
