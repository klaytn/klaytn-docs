# caver.validator

`caver.validator` 패키지는 Klaytn에 애플리케이션을 구현할 때 사용되는 검증 함수를 제공합니다.

**NOTE** `caver.validator`는 caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3) 이후로 제공됩니다.

## validateSignedMessage <a href="#validatesignedmessage" id="validatesignedmessage"></a>

```javascript
caver.validator.validateSignedMessage(message, signatures, address [, isHashed])
```

서명에서 복구된 퍼블릭 키를 Klaytn 계정의 계정 키와 비교하여 서명된 메시지를 검증합니다.

**파라미터**

| 이름       | 타입        | 설명                                                                                                                                                                                                                                                                      |
| -------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 메시지      | string    | The raw message string. If this message is hashed with the Klaytn-specific prefix, the third parameter should be passed as `true`.                                                                                                                                      |
| 서명       | object \ | Array | An object in the format of `{ v, r, s }`, an instance of `SignatureData`, or an array of `SignatureData`. '\[ v, r, s ]' or '\[\[ v, r, s ]]' array can also be passed as a parameter, and in this case, it is internally converted to `SignatureData` type. |
| address  | string    | The address of the account that signed the message.                                                                                                                                                                                                                     |
| isHashed | boolean   | (optional, default: `false`) Whether the message passed as a parameter is hashed with the prefix `"\x19Klaytn Signed Message:\n" + message.length + message`.                                                                                                         |

**리턴값**

`Promise` returning `boolean`: The promise will be resolved with a boolean value of whether the signature on the message is valid or not.

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

Validates a transaction. This function compares the public keys from the account key of the Klaytn account with the public keys recovered from `signatures`. If the transaction is fee-delegated with the `feePayerSignatures` variable inside, this function compares the public keys recovered from `feePayerSignatures` with the public keys of the fee payer.

**파라미터**

| 이름 | 타입 | 설명                                                                  |
| -- | -- | ------------------------------------------------------------------- |
| tx | 객체 | An instance of [Transaction](caver.transaction/#class) to validate. |

**리턴값**

`Promise` returning `boolean`: The promise will be resolved with a boolean value of whether the transacion is valid or not.

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

Validates the sender of the transaction. This function compares the public keys of the account key of the Klaytn account with the public keys recovered from `signatures`.

**파라미터**

| 이름 | 타입 | 설명                                                                  |
| -- | -- | ------------------------------------------------------------------- |
| tx | 객체 | An instance of [Transaction](caver.transaction/#class) to validate. |

**리턴값**

`Promise` returning `boolean`: The promise will be resolved with a boolean value of whether the transaction is valid or not.

**예제**

```javascript
const tx = caver.transaction.valueTransfer.create({...})
> caver.validator.validateSender(tx).then(console.log)
```

## validateFeePayer <a href="#validatefeepayer" id="validatefeepayer"></a>

```javascript
caver.validator.validateFeePayer(tx)
```

Validates a fee payer in the transaction. This function compares the public keys of the account key of the fee payer with the public keys recovered from `feePayerSignatures`.

**파라미터**

| 이름 | 타입 | 설명                                                                  |
| -- | -- | ------------------------------------------------------------------- |
| tx | 객체 | An instance of [Transaction](caver.transaction/#class) to validate. |

**리턴값**

`Promise` returning `boolean`: The promise will be resolved with a boolean value of whether the transaction is valid or not.

**예제**

```javascript
const tx = caver.transaction.feeDelegatedValueTransfer.create({...})
> caver.validator.validateFeePayer(tx).then(console.log)
```
