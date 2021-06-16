# caver.transaction <a id="caver-transaction"></a>

`caver.transaction`는 트랜잭션 관련 기능을 제공하는 패키지입니다.

## Class <a id="class"></a>

각 트랜잭션 클래스에 대한 자세한 설명이 있습니다:

|                        | 일반 트랜잭션                                                   | 수수료 위임 트랜잭션                                                                                | 수수료 부분 위임 트랜잭션                                                                                                       |
|:---------------------- |:--------------------------------------------------------- |:------------------------------------------------------------------------------------------ |:-------------------------------------------------------------------------------------------------------------------- |
| LegacyTransaction      | [LegacyTransaction](basic.md#legacytransaction)           | N/A                                                                                        | N/A                                                                                                                  |
| ValueTransfer          | [ValueTransfer](basic.md#valuetransfer)                   | [FeeDelegatedValueTransfer](fee-delegation.md#feedelegatedvaluetransfer)                   | [FeeDelegatedValueTransferWithRatio](partial-fee-delegation.md#feedelegatedvaluetransferwithratio)                   |
| ValueTransferMemo      | [ValueTransferMemo](basic.md#valuetransfermemo)           | [FeeDelegatedValueTransferMemo](fee-delegation.md#feedelegatedvaluetransfermemo)           | [FeeDelegatedValueTransferMemoWithRatio](partial-fee-delegation.md#feedelegatedvaluetransfermemowithratio)           |
| SmartContractDeploy    | [SmartContractDeploy](basic.md#smartcontractdeploy)       | [FeeDelegatedSmartContractDeploy](fee-delegation.md#feedelegatedsmartcontractdeploy)       | [FeeDelegatedSmartContractDeployWithRatio](partial-fee-delegation.md#feedelegatedsmartcontractdeploywithratio)       |
| SmartContractExecution | [SmartContractExecution](basic.md#smartcontractexecution) | [FeeDelegatedSmartContractExecution](fee-delegation.md#feedelegatedsmartcontractexecution) | [FeeDelegatedSmartContractExecutionWithRatio](partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio) |
| AccountUpdate          | [AccountUpdate](basic.md#accountupdate)                   | [FeeDelegatedAccountUpdate](fee-delegation.md#feedelegatedaccountupdate)                   | [FeeDelegatedAccountUpdateWithRatio](partial-fee-delegation.md#feedelegatedaccountupdatewithratio)                   |
| Cancel                 | [Cancel](basic.md#cancel)                                 | [FeeDelegatedCancel](fee-delegation.md#feedelegatedcancel)                                 | [FeeDelegatedCancelWithRatio](partial-fee-delegation.md#feedelegatedcancelwithratio)                                 |
| ChainDataAnchoring     | [ChainDataAnchoring](basic.md#chaindataanchoring)         | [FeeDelegatedChainDataAnchoring](fee-delegation.md#feedelegatedchaindataanchoring)         | [FeeDelegatedChainDataAnchoringWithRatio](partial-fee-delegation.md#feedelegatedchaindataanchoringwithratio)         |


## caver.transaction.decode <a id="caver-transaction-decode"></a>

```javascript
caver.transaction.decode(rlpEncoded)
```

RLP 인코딩된 트랜잭션 문자열, 원시(raw) 트랜잭션을 디코딩하여 [트랜잭션][] 인스턴스를 반환합니다.

**매개변수**

| 명칭         | 타입     | 설명                         |
| ---------- | ------ | -------------------------- |
| rlpEncoded | string | 디코딩할 RLP 인코딩된 트랜잭션 문자열입니다. |

**리턴값**

| 타입     | 설명                                                     |
| ------ | ------------------------------------------------------ |
| object | [트랜잭션][]의 인스턴스입니다. 각 트랜잭션에 대한 자세한 설명은 [트랜잭션][]을 참고하세요. |

**예시**

```javascript
> caver.transaction.decode('0x08f87...')
ValueTransfer {
    _type: 'TxTypeValueTransfer',
    _from: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
    _gas: '0xf4240',
    _nonce: '0x4d2',
    _gasPrice: '0x19',
    _signatures: [ 
        SignatureData { _v: '0x25', _r: '0xf3d0c...', _s: '0x6748a...' }
    ],
    _to: '0x7b65b75d204abed71587c9e519a89277766ee1d0',
    _value: '0xa'
}
```

## transaction.sign <a id="transaction-sign"></a>

```javascript
transaction.sign(keyring [, index] [, hasher])
```

트랜잭션 발송자로서 `keyring` 내 개인키로 트랜잭션에 서명하며, 트랜잭션 객체에 `signatures`를 첨부합니다.

[Account Update] 트랜잭션을 위해서는 [roleAccountUpdateKey]를 사용하고, 그 외에는 [RoleBasedKeyring][] 내 [roleTransactionKey]를 사용합니다. 사용자가 `index`를 정의하지 않았다면, `transaction.sign`이 해당 역할에 의해 사용되는 모든 개인키를 가지고 트랜잭션에 서명합니다. `index`가 정의되어 있다면, `transaction.sign`이 주어진 인덱스에 대응하는 하나의 개인키를 가지고 트랜잭션에 서명합니다.

**매개변수**

| 명칭      | 타입                   | 설명                                                                                                                                                                                                   |
| ------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| keyring | object &#124; string | 개인키 문자열([KlaytnWalletKey][] 형식도 가능) 또는 Keyring ([SingleKeyring][], [MultipleKeyring][] 또는 [RoleBasedKeyring][])의 인스턴스입니다. 만약 개인키 문자열이나 [KlaytnWalletKey][]가 파라미터로 전달되었다면, 내부적으로 Keyring 인스턴스가 생성됩니다. |
| index   | number               | (선택 사항) 사용하고자 하는 개인키의 인덱스입니다. 인덱스는 각각의 역할에 정의된 개인키들의 배열 길이보다 작아야 합니다. 인덱스가 정의되지 않았을 경우, 이 메서드는 모든 개인키를 사용합니다.                                                                                        |
| hasher  | Function             | (선택 사항) 트랜잭션의 해시를 구하기 위한 해시 함수입니다.                                                                                                                                                                   |

**리턴값**

`Promise`는 `객체`를 반환: 서명된 트랜잭션입니다.

| 타입     | 설명                                                           |
| ------ | ------------------------------------------------------------ |
| object | 서명된 [트랜잭션][]의 인스턴스입니다. `transaction.signatures`에 첨부되는 서명입니다. |

**예시**

```javascript
// This example uses the ValueTransfer transaction.
> const transaction = caver.transaction.valueTransfer.create({
    from: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    value: 1,
    gas: 30000,
})

> const customHasher = () => { ... }

// Sign a transaction with the roleBasedKeyring which use two private keys for roleTransactionKey
> transaction.sign(roleBasedKeyring).then(console.log)
ValueTransfer {
    _type: 'TxTypeValueTransfer',
    _from: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _gas: '0x7530',
    _signatures: [
        SignatureData { _v: '0x4e43', _r: '0xd78a2...', _s: '0x379e9...' },
        SignatureData { _v: '0x4e43', _r: '0x70a58...', _s: '0x2ab28...' }
    ],
    _to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    _value: '0x1',
    _chainId: '0x2710',
    _gasPrice: '0x5d21dba00',
    _nonce: '0x0'
}

// Sign a transaction with the roleBasedKeyring which use two private keys for roleTransactionKey and index
> transaction.sign(roleBasedKeyring, 1).then(console.log)
ValueTransfer {
    _type: 'TxTypeValueTransfer',
    _from: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _gas: '0x7530',
    _signatures: [
        SignatureData { _v: '0x4e43', _r: '0x70a58...', _s: '0x2ab28...' }
    ],
    _to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    _value: '0x1',
    _chainId: '0x2710',
    _gasPrice: '0x5d21dba00',
    _nonce: '0x0'
}

// Sign a transaction with the roleBasedKeyring which use two private keys for roleTransactionKey and hasher
> transaction.sign(roleBasedKeyring, customHasher).then(console.log)
ValueTransfer {
    _type: 'TxTypeValueTransfer',
    _from: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _gas: '0x7530',
    _signatures: [
        SignatureData { _v: '0x4e44', _r: '0x7a8b6...', _s: '0x17139...' },
        SignatureData { _v: '0x4e43', _r: '0x7f978...', _s: '0x1a532...' }
    ],
    _to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    _value: '0x1',
    _chainId: '0x2710',
    _gasPrice: '0x5d21dba00',
    _nonce: '0x0'
}

// Sign a transaction with the roleBasedKeyring which use two private keys for roleTransactionKey, index and hasher
> transaction.sign(roleBasedKeyring, 1, customHasher).then(console.log)
ValueTransfer {
    _type: 'TxTypeValueTransfer',
    _from: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _gas: '0x7530',
    _signatures: [
        SignatureData { _v: '0x4e43', _r: '0x7f978...', _s: '0x1a532...' }
    ],
    _to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    _value: '0x1',
    _chainId: '0x2710',
    _gasPrice: '0x5d21dba00',
    _nonce: '0x0'
}
```

## transaction.signAsFeePayer <a id="transaction-signasfeepayer"></a>

```javascript
transaction.signAsFeePayer(keyring [, index] [, hasher])
```

트랜잭션 `fee payer` (수수료 납부자)로서 서명하며, `keyring` 내 개인키를 사용하여 트랜잭션 객체에 `feePayerSignatures`를 첨부합니다.

수수료 납부자로서 트랜잭션에 서명하기 위해서는 `keyring`의 [roleFeePayerKey]를 사용합니다. 사용자가 `index`를 정의하지 않았다면, `transaction.signAsFeePayer`이 해당 역할에 의해 사용되는 모든 개인키를 가지고 트랜잭션에 서명합니다. `index`가 정의되어 있다면, `transaction.signAsFeePayer`이 주어진 인덱스에 대응하는 하나의 개인키를 가지고 트랜잭션에 서명합니다.

`transaction.feePayer`가 정의되어 있지 않은 경우, 주어진 Keyring의 주소는 `transaction.feePayer`로 설정됩니다.

트랜잭션 서명에 사용될 `keyring`이 `caver.wallet`에 추가되었다면, [caver.wallet.signAsFeePayer](../caver.wallet/README.md#caver-wallet-signasfeepayer)을 사용할 수 있습니다.

**참고** 이 함수는 "수수료 대납" 트랜잭션 또는 "수수료 부분 대납" 트랜잭션에서만 작동합니다.

**매개변수**

| 명칭      | 타입                   | 설명                                                                                                                                                                                                   |
| ------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| keyring | object &#124; string | 개인키 문자열([KlaytnWalletKey][] 형식도 가능) 또는 Keyring ([SingleKeyring][], [MultipleKeyring][] 또는 [RoleBasedKeyring][])의 인스턴스입니다. 만약 개인키 문자열이나 [KlaytnWalletKey][]가 파라미터로 전달되었다면, 내부적으로 Keyring 인스턴스가 생성됩니다. |
| index   | number               | (선택 사항) 사용하고자 하는 개인키의 인덱스입니다. 인덱스는 각각의 역할에 정의된 개인키들의 배열 길이보다 작아야 합니다. 인덱스가 정의되지 않았을 경우, 이 메서드는 모든 개인키를 사용합니다.                                                                                        |
| hasher  | Function             | (선택 사항) 트랜잭션의 해시를 구하기 위한 해시 함수입니다.                                                                                                                                                                   |

**리턴값**

`Promise`는 `객체`를 반환: 서명된 트랜잭션입니다.

| 타입     | 설명                                                                   |
| ------ | -------------------------------------------------------------------- |
| object | 서명된 [트랜잭션][]의 인스턴스입니다. `transaction.feePayerSignatures`에 첨부되는 서명입니다. |

**예시**

```javascript
// This example uses the FeeDelegatedValueTransfer transaction.
> const transaction = caver.transaction.feeDelegatedValueTransfer.create({
    from: '0x6fddbcb99d31b8755c2b840a367f53eea4b4f45c',
    to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    value: 1,
    gas: 30000,
})

> const customHasher = () => { ... }

// Sign a transaction with the address of RoleBasedKeyring which use two private keys for roleFeePayerKey
> transaction.signAsFeePayer(roleBasedKeyring).then(console.log)
FeeDelegatedValueTransfer {
    _type: 'TxTypeFeeDelegatedValueTransfer',
    _from: '0x6fddbcb99d31b8755c2b840a367f53eea4b4f45c',
    _gas: '0x7530',
    _signatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
    _feePayer: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _feePayerSignatures: [
        SignatureData { _v: '0x4e44', _r: '0x7010e...', _s: '0x65d6b...' },
        SignatureData { _v: '0x4e43', _r: '0x96ef2...', _s: '0x77f34...' }
    ],
    _to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    _value: '0x1',
    _chainId: '0x2710',
    _gasPrice: '0x5d21dba00',
    _nonce: '0x0'
}

// Sign a transaction with the address of RoleBasedKeyring which use two private keys for roleFeePayerKey and index
> transaction.signAsFeePayer(roleBasedKeyring, 1).then(console.log)
FeeDelegatedValueTransfer {
    _type: 'TxTypeFeeDelegatedValueTransfer',
    _from: '0x6fddbcb99d31b8755c2b840a367f53eea4b4f45c',
    _gas: '0x7530',
    _signatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
    _feePayer: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _feePayerSignatures: [
        SignatureData { _v: '0x4e43', _r: '0x96ef2...', _s: '0x77f34...' }
    ],
    _to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    _value: '0x1',
    _chainId: '0x2710',
    _gasPrice: '0x5d21dba00',
    _nonce: '0x0'
}

// Sign a transaction with the address of RoleBasedKeyring which use two private keys for roleFeePayerKey and hasher
> transaction.signAsFeePayer(roleBasedKeyring, customHasher).then(console.log)
FeeDelegatedValueTransfer {
    _type: 'TxTypeFeeDelegatedValueTransfer',
    _from: '0x6fddbcb99d31b8755c2b840a367f53eea4b4f45c',
    _gas: '0x7530',
    _signatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
    _feePayer: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _feePayerSignatures: [
        SignatureData { _v: '0x4e43', _r: '0xe48bf...', _s: '0x1cf36...' },
        SignatureData { _v: '0x4e43', _r: '0x82976...', _s: '0x3c5e0...' }
    ],
    _to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    _value: '0x1',
    _chainId: '0x2710',
    _gasPrice: '0x5d21dba00',
    _nonce: '0x0'
}

// Sign a transaction with the address of RoleBasedKeyring which use two private keys for roleFeePayerKey, index and hasher
> transaction.signAsFeePayer(roleBasedKeyring, 1, customHasher).then(console.log)
FeeDelegatedValueTransfer {
    _type: 'TxTypeFeeDelegatedValueTransfer',
    _from: '0x6fddbcb99d31b8755c2b840a367f53eea4b4f45c',
    _gas: '0x7530',
    _signatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
    _feePayer: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _feePayerSignatures: [
        SignatureData { _v: '0x4e43', _r: '0x82976...', _s: '0x3c5e0...' }
    ],
    _to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    _value: '0x1',
    _chainId: '0x2710',
    _gasPrice: '0x5d21dba00',
    _nonce: '0x0'
}
```

## transaction.appendSignatures <a id="transaction-appendsignatures"></a>

```javascript
transaction.appendSignatures(signatures)
```

트랜잭션에 `signatures`를 첨부합니다.

**매개변수**

| 명칭         | 타입                  | 설명                                                                                                                                                                                         |
| ---------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| signatures | object &#124; Array | 트랜잭션에 첨부될 서명(signatures)입니다. [SignatureData][] 인스턴스 또는 [SignatureData][] 인스턴스들을 포함한 배열입니다. An array in which 각각의 'v', 'r', 's'가 순차적으로 문자열로 정의된 배열, 또는 이러한 배열을 포함한 2D 배열이 파라미터로 사용될 수 있습니다. |

**예시**

```javascript
> transaction.appendSignatures([ '0x4e44', '0x7010e...', '0x65d6b...' ])
```

## transaction.appendFeePayerSignatures <a id="transaction-appendfeepayersignatures"></a>

```javascript
transaction.appendFeePayerSignatures(signatures)
```

트랜잭션에 `feePayerSignatures`를 첨부합니다.

**참고** 이 함수는 "수수료 대납" 트랜잭션 또는 "수수료 부분 대납" 트랜잭션에서만 작동합니다.

**매개변수**

| 명칭                 | 타입                  | 설명                                                                                                                                                                                                         |
| ------------------ | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| feePayerSignatures | object &#124; Array | 트랜잭션에 추가될 수수료 납부자 서명(feePayerSignatures)입니다. [SignatureData][] 인스턴스 또는 [SignatureData][] 인스턴스들을 포함한 배열입니다. An array in which 각각의 'v', 'r', 's'가 순차적으로 문자열로 정의된 배열, 또는 이러한 배열을 포함한 2D 배열이 파라미터로 사용될 수 있습니다. |

**예시**

```javascript
> transaction.appendFeePayerSignatures([ '0x4e44', '0x7010e...', '0x65d6b...' ])
```

## transaction.combineSignedRawTransactions <a id="transaction-combinesignatures"></a>

```javascript
transaction.combineSignedRawTransactions(rlpEncodedTxs)
```

주어진 배열의 각 RLP 인코딩된 트랜잭션 문자열에서 서명을 받아 트랜잭션 인스턴스와 결합시킵니다. 그리고 모든 서명을 포함한 RLP 인코딩된 트랜잭션 문자열을 반환합니다. 트랜잭션 인스턴스에 미리 서명을 하지 않아도 됩니다. 트랜잭션이 "수수료 위임" 또는 "수수료 부분 위임" 트랜잭션 중 하나에 해당될 경우, `feePayerSignatures` 또한 RLP 인코딩된 트랜잭션 문자열에 포함됩니다.

**매개변수**

| 명칭            | 타입    | 설명                               |
| ------------- | ----- | -------------------------------- |
| rlpEncodedTxs | Array | 서명을 받은 RLP 인코딩된 트랜잭션 문자열의 배열입니다. |

**리턴값**

| 타입     | 설명                                                                                                                |
| ------ | ----------------------------------------------------------------------------------------------------------------- |
| string | `signatures` (만약 트랜잭션이 "수수료 위임" 또는 "수수료 부분 위임" 트랜잭션 중 하나에 해당할 경우 `feePayerSignatures`)를 포함할 RLP 인코딩된 트랜잭션 문자열입니다. |

**예시**

```javascript
> transaction.combineSignedRawTransactions(['0x09f88...'])
'0x09f885018505d21dba00830f4240947b65b75d204abed71587c9e519a89277766ee1d00a9404bb86a1b16113ebe8f57071f839b002cbcbf7d0f847f845820feaa068e56f3da7fbe7a86543eb4b244ddbcb13b2d1cb9adb3ee8a4c8b046821bc492a068c29c057055f68a7860b54184bba7967bcf42b6aae12beaf9f30933e6e730c280c4c3018080'
```

## transaction.getRLPEncoding <a id="transaction-getrlpencoding"></a>

```javascript
transaction.getRLPEncoding()
```

RLP 인코딩된 트랜잭션 문자열을 반환합니다.

각 트랜잭션 타입에서 RLP 인코딩된 문자열을 만드는 방법은 [Klaytn Design - Transactions][]를 참고하세요.

**리턴값**

| 타입     | 설명                    |
| ------ | --------------------- |
| string | RLP 인코딩된 트랜잭션 문자열입니다. |

**예시**

```javascript
> transaction.getRLPEncoding()
'0x09f885018505d21dba00830f4240947b65b75d204abed71587c9e519a89277766ee1d00a9404bb86a1b16113ebe8f57071f839b002cbcbf7d0f847f845820feaa068e56f3da7fbe7a86543eb4b244ddbcb13b2d1cb9adb3ee8a4c8b046821bc492a068c29c057055f68a7860b54184bba7967bcf42b6aae12beaf9f30933e6e730c280c4c3018080'
```

## transaction.getRawTransaction <a id="transaction-getrawtransaction"></a>

```javascript
transaction.getRawTransaction()
```

`rawTransaction` 문자열을 반환합니다(RLP 인코딩된 트랜잭션 문자열). 이 함수는 [transaction.getRLPEncoding](#transaction-getrlpencoding)과 동일합니다.

**리턴값**

| 타입     | 설명                    |
| ------ | --------------------- |
| string | RLP 인코딩된 트랜잭션 문자열입니다. |

**예시**

```javascript
> transaction.getRawTransaction()
'0x09f885018505d21dba00830f4240947b65b75d204abed71587c9e519a89277766ee1d00a9404bb86a1b16113ebe8f57071f839b002cbcbf7d0f847f845820feaa068e56f3da7fbe7a86543eb4b244ddbcb13b2d1cb9adb3ee8a4c8b046821bc492a068c29c057055f68a7860b54184bba7967bcf42b6aae12beaf9f30933e6e730c280c4c3018080'
```

## transaction.getTransactionHash <a id="transaction-gettransactionhash"></a>

```javascript
transaction.getTransactionHash()
```

`transactionHash`를 반환합니다.

각 트랜잭션 타입에서 트랜잭션 해시를 구하는 방법은 [Klaytn Design - Transactions][]를 참고하세요.

**리턴값**

| 타입     | 설명                           |
| ------ | ---------------------------- |
| string | 트랜잭션 해시(transactionHash)입니다. |

**예시**

```javascript
> transaction.getTransactionHash()
'0x8ac53afbba014201b02398545653683fe0536c49707fe302c59423012c0e8697'
```

## transaction.getSenderTxHash <a id="transaction-getsendertxhash"></a>

```javascript
transaction.getSenderTxHash()
```

트랜잭션의 [senderTxHash][]를 반환합니다.

[senderTxHash][]는 수수료 납부자 주소와 서명을 제외한 트랜잭션의 해시입니다. 따라서 [transactionHash](#transaction-gettransactionhash)와 [senderTxHash][]는 기본 트랜잭션에서 동일합니다.

각 트랜잭션 타입에서  [senderTxHash][]를 만드는 방법은 [Klaytn Design - Transactions][]를 참고하세요.

**리턴값**

| 타입     | 설명                             |
| ------ | ------------------------------ |
| string | 전송자의 트랜잭션 해시(senderTxHash)입니다. |

**예시**

```javascript
> transaction.getSenderTxHash()
'0xb61cc1ddadb6f2ec34c9f9e6a7b6cf0a606422654d649d998587c77daa3c31fe'
```

## transaction.getRLPEncodingForSignature <a id="transaction-getrlpencodingforsignature"></a>

```javascript
transaction.getRLPEncodingForSignature()
```

트랜잭션 전송자의 서명을 만들기 위한 RLP 인코딩된 트랜잭션 문자열을 반환합니다. 반환된 RLP 인코딩된 트랜잭션 문자열은 서명에 추가되는 것이 아니라, 이 서명을 생성하는 데 사용된다는 점을 참고하세요.

각 트랜잭션 타입에서 트랜잭션 전송자의 서명을 생성하기 위한 RLP 인코딩된 트랜잭션 문자열을 구하는 방법은 [Klaytn Design - Transactions][]를 참고하세요.

**리턴값**

| 타입     | 설명                                |
| ------ | --------------------------------- |
| string | 서명이 첨부되지 않은 RLP 인코딩된 트랜잭션 문자열입니다. |

**예시**

```javascript
> transaction.getRLPEncodingForSignature()
'0xf83fb838f709018505d21dba00830f4240947b65b75d204abed71587c9e519a89277766ee1d00a9404bb86a1b16113ebe8f57071f839b002cbcbf7d08207e38080'
```

## transaction.getRLPEncodingForFeePayerSignature <a id="transaction-getrlpencodingforfeepayersignature"></a>

```javascript
transaction.getRLPEncodingForFeePayerSignature()
```

수수료 납부자의 서명을 생성하기 위한 RLP 인코딩된 트랜잭션 문자열을 반환합니다. 반환된 RLP 인코딩된 트랜잭션 문자열은 서명에 추가되는 것이 아니라, 이 서명을 생성하는 데 사용된다는 점을 참고하세요.

각 트랜잭션 타입에서 트랜잭션 전송자의 서명을 생성하기 위한 RLP 인코딩된 트랜잭션 문자열을 구하는 방법은 [Klaytn Design - Transactions][]를 참고하세요.

**참고** 이 함수는 "수수료 대납" 트랜잭션 또는 "수수료 부분 대납" 트랜잭션에서만 작동합니다.

**리턴값**

| 타입     | 설명                                |
| ------ | --------------------------------- |
| string | 서명이 첨부되지 않은 RLP 인코딩된 트랜잭션 문자열입니다. |

**예시**

```javascript
> transaction.getRLPEncodingForFeePayerSignature()
'0xf840b838f709018505d21dba00830f4240947b65b75d204abed71587c9e519a89277766ee1d00a9404bb86a1b16113ebe8f57071f839b002cbcbf7d0808207e38080'
```

## transaction.fillTransaction <a id="transaction-filltransaction"></a>

```javascript
transaction.fillTransaction()
```

트랜잭션의 선택 사항 변수들을 기입해 줍니다.

이 메서드는 트랜잭션의 선택 변수 `gasPrice`, `nonce`, 또는 `chainId`가 정의되지 않은 경우, 각각의 기본값을 조회하여 연결된 Klaytn Node에 JSON RPC 호출을 함으로서 이 값들을 지정시킵니다.

`gasPrice`는 [caver.rpc.klay.getGasPrice][], `nonce`는 [caver.rpc.klay.getTransactionCount][], `chainId`는 [caver.rpc.klay.getChainId][]에서 구할 수 있습니다.

**리턴값**

`Promise`는 `void`을 반환합니다.

**예시**

```javascript
> transaction.fillTransaction()
```

[Klaytn Design - Transactions]: ../../../../../klaytn/design/transactions/README.md
[senderTxHash]: ../../../../../klaytn/design/transactions/README.md#sendertxhash
[트랜잭션]: #class
[KlaytnWalletKey]: ../../../../../klaytn/design/accounts.md#klaytn-wallet-key-format
[SingleKeyring]: ../caver.wallet/keyring.md#singlekeyring
[MultipleKeyring]: ../caver.wallet/keyring.md#multiplekeyring
[RoleBasedKeyring]: ../caver.wallet/keyring.md#rolebasedkeyring
[SignatureData]: ../caver.wallet/keyring.md#signaturedata
[caver.rpc.klay.getGasPrice]: ../caver.rpc/klay.md#caver-rpc-klay-getgasprice
[caver.rpc.klay.getTransactionCount]: ../caver.rpc/klay.md#caver-rpc-klay-gettransactioncount
[caver.rpc.klay.getChainId]: ../caver.rpc/klay.md#caver-rpc-klay-getchainid
