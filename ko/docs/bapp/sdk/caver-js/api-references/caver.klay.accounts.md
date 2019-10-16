---
description: >-
  계정 관리와 관련된 caver-js API.
---

# caver.klay.accounts

`caver.klay.accounts`는 Klaytn 계정과 서명 트랜잭션과 데이터를 생성하는 함수를 포함합니다.


## create

```javascript
caver.klay.accounts.create([entropy])
```
개인키와 공개키를 사용하여 계정 개체를 생성합니다.

**매개변수**

| 명칭      | 형식     | 설명                                                                                                        |
| ------- | ------ | --------------------------------------------------------------------------------------------------------- |
| entropy | String | (선택 사항) 엔트로피를 증가시키는 임의의 문자열. 아무 것도 지정하지 않으면 [randomHex](./caver.utils.md#randomhex)를 사용하여 임의의 문자열이 생성됩니다. |


**리턴값**

` Object` - 다음 구조의 계정 객체:

| 명칭                               | 형식       | 설명                                                                             |
| -------------------------------- | -------- | ------------------------------------------------------------------------------ |
| address                          | String   | 계정 주소.                                                                         |
| privateKey                       | String   | 계정 개인키. 로컬 저장소에 암호화되지 않은 상태로 공유하거나 저장해서는 안 됩니다! 또한 사용 후에는 메모리를 null로 설정하세요.    |
| signTransaction(tx [, callback]) | Function | 트랜잭션에 서명하는 함수. [caver.klay.accounts.signTransaction](#signtransaction)를 참조하세요. |
| sign(data)                       | Function | 트랜잭션에 서명하는 함수. [caver.klay.accounts.sign](#sign)를 참조하세요.                       |
| encrypt                          | Function | 주어진 비밀번호로 개인키를 암호화하는 함수입니다.                                                    |

**예시**

```javascript
> caver.klay.accounts.create();
{
    address: '0x79FF91738661760AC67b3E951c0B4f1F70F80478',
    privateKey: '0x{private key}',
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey] 
}

> caver.klay.accounts.create('entropy');
{
    address: '0x205fffB1025F4af604fEB1d3a22b46C0D2326585',
    privateKey: '0x{private key}',
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey] 
}

> caver.klay.accounts.create(caver.utils.randomHex(32));
{ 
    address: '0x62Ca8964610A9D447E1a64753a09fC8b3D40b405',
    privateKey: '0x{private key}',
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey] 
}
```


## privateKeyToAccount

```javascript
caver.klay.accounts.privateKeyToAccount(privateKey)
```
개인키에서 계정 객체를 생성합니다.

**매개변수**

| 명칭         | 형식     | 설명       |
| ---------- | ------ | -------- |
| privateKey | string | 변환할 개인키. |


**리턴값**

`Object` - 계정 객체

**예시**

```javascript
> caver.klay.accounts.privateKeyToAccount('0x{private key}');
{ 
    address: '0x62ca8964610a9d447e1a64753a09fc8b3d40b405',
    privateKey: '0x{private key}',
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey] 
}
```

## privateKeyToPublicKey

```javascript
caver.klay.accounts.privateKeyToPublicKey(privateKey)
```
주어진 개인키에서 공개키를 도출합니다.

**매개변수**

| 명칭         | 형식     | 설명       |
| ---------- | ------ | -------- |
| privateKey | string | 변환할 개인키. |


**리턴값**

`String` - 공개키 (64바이트)

**예시**

```javascript
> caver.klay.accounts.privateKeyToPublicKey('0x{private key}')
'0xbb1846722a4c27e71196e1a44611ee7174276a6c51c4830fb810cac64b0725f217cb8783625a809d1303adeeec2cf036ab74098a77a6b7f1003486e173b29aa7'
```

## signTransaction

```javascript
caver.klay.accounts.signTransaction(tx, privateKey [, callback])
```
주어진 개인키로 Klaytn 트랜잭션에 서명합니다.

**매개변수**

| 명칭         | 형식                  | 설명                                                                                                                                        |
| ---------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| tx         | Object              | 트랜잭션 객체.  트랜잭션 객체의 필드는 각 트랜잭션 타입마다 다릅니다. 각 트랜잭션에 대한 설명은 [caver.klay.sendTransaction](./caver.klay/transaction.md#sendtransaction)를 참조하세요. |
| privateKey | String &#124; Array | (선택 사항) 서명할 개인키.                                                                                                                          |
| callback   | Function            | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다.                                                                      |

**참고** `privateKey` 매개변수는 caver-js [v1.2.0-rc.3](https://www.npmjs.com/package/caver-js/v/1.2.0-rc.3) 이후 `선택적 매개변수`로 변경되었습니다. 또한 privateKey 매개변수는 caver-js [v1.2.0-rc.3](https://www.npmjs.com/package/caver-js/v/1.2.0-rc.3) 이후 개인키 문자열의 `array`를 지원합니다. privateKey를 전달하지 않으면, 트랜잭션을 서명하기 위해 `from` 또는 `feePayer` 계정이 caver.klay.accounts.wallet에 반드시 존재해야 합니다. privateKey 배열이 제공되면, 배열 내부의 모든 키로 트랜잭션이 서명됩니다.

**리턴값**

`Promise`는 `객체`를 반환: RLP 인코딩된 서명된 트랜잭션. 객체 속성은 다음과 같습니다:

| 명칭                 | 형식             | 설명                                                                                                      |
| ------------------ | -------------- | ------------------------------------------------------------------------------------------------------- |
| messageHash        | String         | 주어진 메시지의 해시.                                                                                            |
| r                  | String         | 서명의 처음 32바이트.                                                                                           |
| s                  | String         | 서명의 다음 32바이트.                                                                                           |
| v                  | String         | 복구값 + 27.                                                                                               |
| rawTransaction     | String         | caver.klay.sendSignedTransaction을 사용하여 전송할 준비가 된 RLP 인코딩된 트랜잭션.                                         |
| txHash             | 32-byte String | 트랜잭션 해시.                                                                                                |
| senderTxHash       | 32-byte String | 발신자만 서명한 트랜잭션 해시. [SenderTxHash](../../../../klaytn/design/transactions/README.md#sendertxhash)를 참조하세요. |
| signatures         | Array          | (선택 사항) 발신자의 서명(들)의 배열.                                                                                 |
| feePayerSignatures | Array          | (선택 사항) 수수료 지불자의 서명(들)의 배열.                                                                             |

**참고** signatures 및 feePayerSignatures 속성은 caver-js [v1.2.0-rc.3](https://www.npmjs.com/package/caver-js/v/1.2.0-rc.3) 이후 추가되었습니다. 발신자가 트랜잭션에 서명하면, 서명 배열이 `signatures`로 반환됩니다. 수수료 지불자가 서명하면, 서명 배열이 `feePayerSignatures`로 반환됩니다.

**예시**

```javascript
// sign legacy transaction with private key string
> caver.klay.accounts.signTransaction({
    from: '0x72519cf34d9aa14629e7ad0cad5d55a3bb398364',
    to: '0xa9d2cc2bb853163b6eadfb6f962d72f7e00bc2e6',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 900000,
}, '0x{private key}').then(console.log)
{ 
    messageHash: '0xc4f3d98b901489c2c6e7bb9a5ddb4bc807b0251c6eac671356f01b66b749141f',
    v: '0x4e44',
    r: '0x2ef0d0c59ad302bcd73823879f6e1550e4bc6e6c38be69724c71ad6e09edde82',
    s: '0x602b1064ff5a6ba4718a493e50cf9e58ca9a9addf6ed4bbbc89fbc040a3c107e',
    rawTransaction: '0xf86f808505d21dba00830dbba094a9d2cc2bb853163b6eadfb6f962d72f7e00bc2e6880de0b6b3a764000080824e44a02ef0d0c59ad302bcd73823879f6e1550e4bc6e6c38be69724c71ad6e09edde82a0602b1064ff5a6ba4718a493e50cf9e58ca9a9addf6ed4bbbc89fbc040a3c107e',
    txHash: '0x87e84bd1d9c512cfabe5ebce10597dd40bc6fe828a10e460b7c01075c76b71a5',
    senderTxHash: '0x87e84bd1d9c512cfabe5ebce10597dd40bc6fe828a10e460b7c01075c76b71a5',
    signatures: [ 
        '0x4e44',
        '0x2ef0d0c59ad302bcd73823879f6e1550e4bc6e6c38be69724c71ad6e09edde82',
        '0x602b1064ff5a6ba4718a493e50cf9e58ca9a9addf6ed4bbbc89fbc040a3c107e' 
    ] 
}

// signTransaction with private key string
> caver.klay.accounts.signTransaction({
    type: 'VALUE_TRANSFER',
    from: '0x72519cf34d9aa14629e7ad0cad5d55a3bb398364',
    to: '0xa9d2cc2bb853163b6eadfb6f962d72f7e00bc2e6',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 900000,
}, '0x{private key}').then(console.log)
{ 
    messageHash: '0xf003c68467424eed29b55d3d107167b207adb6bba66f8b9b73b7df824beb144c',
    v: '0x4e43',
    r: '0xea3bba902857eb58bed048fd1b94c5d99881e4356221d6e1e6e873401abf3a5c',
    s: '0x5e5d250db3c31a193dbe5289935755461ad78e41c1f60d3ca80ae0a97d2a9924',
    rawTransaction: '0x08f887808505d21dba00830dbba094a9d2cc2bb853163b6eadfb6f962d72f7e00bc2e6880de0b6b3a76400009472519cf34d9aa14629e7ad0cad5d55a3bb398364f847f845824e43a0ea3bba902857eb58bed048fd1b94c5d99881e4356221d6e1e6e873401abf3a5ca05e5d250db3c31a193dbe5289935755461ad78e41c1f60d3ca80ae0a97d2a9924',
    txHash: '0x1b5759e8060ac01ba94437bd115ecf471ba05e144f4874dd5b82a8379aa98a63',
    senderTxHash: '0x1b5759e8060ac01ba94437bd115ecf471ba05e144f4874dd5b82a8379aa98a63',
    signatures: [ 
        [ 
            '0x4e43',
            '0xea3bba902857eb58bed048fd1b94c5d99881e4356221d6e1e6e873401abf3a5c',
            '0x5e5d250db3c31a193dbe5289935755461ad78e41c1f60d3ca80ae0a97d2a9924' 
        ]
    ]
}

// signTransaction without privateKey parameter
> caver.klay.accounts.signTransaction({
    type: 'VALUE_TRANSFER',
    from: '0x72519cf34d9aa14629e7ad0cad5d55a3bb398364',
    to: '0xa9d2cc2bb853163b6eadfb6f962d72f7e00bc2e6',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 900000,
}).then(console.log)
{ 
    messageHash: '0xf003c68467424eed29b55d3d107167b207adb6bba66f8b9b73b7df824beb144c',
    v: '0x4e43',
    r: '0xea3bba902857eb58bed048fd1b94c5d99881e4356221d6e1e6e873401abf3a5c',
    s: '0x5e5d250db3c31a193dbe5289935755461ad78e41c1f60d3ca80ae0a97d2a9924',
    rawTransaction: '0x08f887808505d21dba00830dbba094a9d2cc2bb853163b6eadfb6f962d72f7e00bc2e6880de0b6b3a76400009472519cf34d9aa14629e7ad0cad5d55a3bb398364f847f845824e43a0ea3bba902857eb58bed048fd1b94c5d99881e4356221d6e1e6e873401abf3a5ca05e5d250db3c31a193dbe5289935755461ad78e41c1f60d3ca80ae0a97d2a9924',
    txHash: '0x1b5759e8060ac01ba94437bd115ecf471ba05e144f4874dd5b82a8379aa98a63',
    senderTxHash: '0x1b5759e8060ac01ba94437bd115ecf471ba05e144f4874dd5b82a8379aa98a63',
    signatures: [ 
        [ 
            '0x4e43',
            '0xea3bba902857eb58bed048fd1b94c5d99881e4356221d6e1e6e873401abf3a5c',
            '0x5e5d250db3c31a193dbe5289935755461ad78e41c1f60d3ca80ae0a97d2a9924' 
        ]
    ]
}

// signTransaction with array of private keys
> caver.klay.accounts.signTransaction({
    type: 'VALUE_TRANSFER',
    from: '0x72519cf34d9aa14629e7ad0cad5d55a3bb398364',
    to: '0xa9d2cc2bb853163b6eadfb6f962d72f7e00bc2e6',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 900000,
}, ['0x{private key}', '0x{private key}']).then(console.log)
{ 
    messageHash: '0xf003c68467424eed29b55d3d107167b207adb6bba66f8b9b73b7df824beb144c',
    v: '0x4e44',
    r: '0xf9e93c6dc3227a4cde633dc7a9b3c5e81ceb1879bfcf138d6205b2d49cdef60b',
    s: '0x0787d1a42c75d6d708ddb7552c6470ad15e58da6259cdf48e508f577187fad20',
    rawTransaction: '0x08f8ce808505d21dba00830dbba094a9d2cc2bb853163b6eadfb6f962d72f7e00bc2e6880de0b6b3a76400009472519cf34d9aa14629e7ad0cad5d55a3bb398364f88ef845824e44a0f9e93c6dc3227a4cde633dc7a9b3c5e81ceb1879bfcf138d6205b2d49cdef60ba00787d1a42c75d6d708ddb7552c6470ad15e58da6259cdf48e508f577187fad20f845824e43a0ea3bba902857eb58bed048fd1b94c5d99881e4356221d6e1e6e873401abf3a5ca05e5d250db3c31a193dbe5289935755461ad78e41c1f60d3ca80ae0a97d2a9924',
    txHash: '0x1dfac8cb1ab9c25de93758652f3cded2537355e2207c45ba39442b7cb700e8fd',
    senderTxHash: '0x1dfac8cb1ab9c25de93758652f3cded2537355e2207c45ba39442b7cb700e8fd',
    signatures: [ 
        [ 
            '0x4e44',
            '0xf9e93c6dc3227a4cde633dc7a9b3c5e81ceb1879bfcf138d6205b2d49cdef60b',
            '0x0787d1a42c75d6d708ddb7552c6470ad15e58da6259cdf48e508f577187fad20' 
        ],
        [ 
            '0x4e43',
            '0xea3bba902857eb58bed048fd1b94c5d99881e4356221d6e1e6e873401abf3a5c',
            '0x5e5d250db3c31a193dbe5289935755461ad78e41c1f60d3ca80ae0a97d2a9924' 
        ]
    ] 
}

// signTransaction with fee payer's private key
> caver.klay.accounts.signTransaction({
    senderRawTransaction: '0x09f886819a8505d21dba00830dbba094d05c5926b0a2f31aadcc9a9cbd3868a50104d834019476d1cc1cdb081de8627cab2c074f02ebc7bce0d0f847f845820fe9a0c5ea5b57f460bbc76101bafa2ed16228af0c0094d31a8a799e430278b4360724a0240afd7cf426e6aababdc59a3935b97aac4e059b59ba85ccedc75c95168abcfb80c4c3018080',
    feePayer: '0x6e75945404daa4130a338af01199244b1eae2a0b'
}, '0x{private key}').then(console.log)
{ 
    messageHash: '0xec121b6f7e2925166bcb1e6f14fd0b078f1168b6feca9340db7bd31998d14043',
    v: '0x4e44',
    r: '0xf68d2c65563baee7a76d5f75aaadbfecf4ae3f55b349013f740159edd38465d9',
    s: '0x5146c0bbe998a7ba6e7c8f5aef7eb5fea0b4b7429713d65e38b2435f6a575300',
    rawTransaction: '0x09f8de819a8505d21dba00830dbba094d05c5926b0a2f31aadcc9a9cbd3868a50104d834019476d1cc1cdb081de8627cab2c074f02ebc7bce0d0f847f845820fe9a0c5ea5b57f460bbc76101bafa2ed16228af0c0094d31a8a799e430278b4360724a0240afd7cf426e6aababdc59a3935b97aac4e059b59ba85ccedc75c95168abcfb946e75945404daa4130a338af01199244b1eae2a0bf847f845824e44a0f68d2c65563baee7a76d5f75aaadbfecf4ae3f55b349013f740159edd38465d9a05146c0bbe998a7ba6e7c8f5aef7eb5fea0b4b7429713d65e38b2435f6a575300',
    txHash: '0xf31ab04d9ccdb93262a4349afabd68326db0d61452c06259ed8ea91bc09ca295',
    senderTxHash: '0x1b7c0f2fc7548056e90d9690e8c397acf99eb38e622ac91ee22c2085065f8a55',
    feePayerSignatures: [ 
        [ 
            '0x4e44',
            '0xf68d2c65563baee7a76d5f75aaadbfecf4ae3f55b349013f740159edd38465d9',
            '0x5146c0bbe998a7ba6e7c8f5aef7eb5fea0b4b7429713d65e38b2435f6a575300' 
        ] 
    ] 
}

// signTransaction without fee payer's private key
> caver.klay.accounts.signTransaction({
    senderRawTransaction: '0x09f886819a8505d21dba00830dbba094d05c5926b0a2f31aadcc9a9cbd3868a50104d834019476d1cc1cdb081de8627cab2c074f02ebc7bce0d0f847f845820fe9a0c5ea5b57f460bbc76101bafa2ed16228af0c0094d31a8a799e430278b4360724a0240afd7cf426e6aababdc59a3935b97aac4e059b59ba85ccedc75c95168abcfb80c4c3018080',
    feePayer: '0x6e75945404daa4130a338af01199244b1eae2a0b'
}).then(console.log)
{ 
    messageHash: '0xec121b6f7e2925166bcb1e6f14fd0b078f1168b6feca9340db7bd31998d14043',
    v: '0x4e44',
    r: '0xf68d2c65563baee7a76d5f75aaadbfecf4ae3f55b349013f740159edd38465d9',
    s: '0x5146c0bbe998a7ba6e7c8f5aef7eb5fea0b4b7429713d65e38b2435f6a575300',
    rawTransaction: '0x09f8de819a8505d21dba00830dbba094d05c5926b0a2f31aadcc9a9cbd3868a50104d834019476d1cc1cdb081de8627cab2c074f02ebc7bce0d0f847f845820fe9a0c5ea5b57f460bbc76101bafa2ed16228af0c0094d31a8a799e430278b4360724a0240afd7cf426e6aababdc59a3935b97aac4e059b59ba85ccedc75c95168abcfb946e75945404daa4130a338af01199244b1eae2a0bf847f845824e44a0f68d2c65563baee7a76d5f75aaadbfecf4ae3f55b349013f740159edd38465d9a05146c0bbe998a7ba6e7c8f5aef7eb5fea0b4b7429713d65e38b2435f6a575300',
    txHash: '0xf31ab04d9ccdb93262a4349afabd68326db0d61452c06259ed8ea91bc09ca295',
    senderTxHash: '0x1b7c0f2fc7548056e90d9690e8c397acf99eb38e622ac91ee22c2085065f8a55',
    feePayerSignatures: [ 
        [ 
            '0x4e44',
            '0xf68d2c65563baee7a76d5f75aaadbfecf4ae3f55b349013f740159edd38465d9',
            '0x5146c0bbe998a7ba6e7c8f5aef7eb5fea0b4b7429713d65e38b2435f6a575300' 
        ] 
    ] 
}
```


## recoverTransaction

```javascript
caver.klay.accounts.recoverTransaction(rawTransaction)
```
주어진 RLP 인코딩된 트랜잭션에 서명하는 데 사용된 Klaytn 주소를 복구합니다.

**매개변수**

| 명칭        | 형식     | 설명             |
| --------- | ------ | -------------- |
| signature | String | RLP 인코딩된 트랜잭션. |

**리턴값**

| 형식     | 설명                               |
| ------ | -------------------------------- |
| String | 이 트랜잭션에 서명하는 데 사용된 Klaytn 주소입니다. |

**예시**

```js
> caver.klay.accounts.recoverTransaction('0xf86180808401ef364594f0109fc8df283027b6285cc889f5aa624eac1f5580801ca031573280d608f75137e33fc14655f097867d691d5c4c44ebe5ae186070ac3d5ea0524410802cdc025034daefcdfa08e7d2ee3f0b9d9ae184b2001fe0aff07603d9');
'0xF0109fC8DF283027b6285cc889F5aA624EaC1F55'
```


## hashMessage

```javascript
caver.klay.accounts.hashMessage(message)
```

주어진 메시지를 [caver.klay.accounts.recover](#recover)에 전달하기 위해 순서대로 해시를 취합니다. 데이터는 UTF-8 HEX 디코딩되며 다음과 같이 포함됩니다:
```
"\x19Klaytn Signed Message:\n" + message.length + message
```
keccak256로 해시를 취합니다.

**매개변수**

| 명칭      | 형식     | 설명                                        |
| ------- | ------ | ----------------------------------------- |
| message | String | 해시를 취할 메시지.  HEX 문자열인 경우 먼저 UTF-8 디코딩됩니다. |


**리턴값**

| 형식     | 설명      |
| ------ | ------- |
| String | 해시된 메시지 |


**예시**

```javascript
> caver.klay.accounts.hashMessage("Hello World")
'0xf334bf277b674260e85f1a3d2565d76463d63d29549ef4fa6d6833207576b5ba'

// the below results in the same hash
> caver.klay.accounts.hashMessage(caver.utils.utf8ToHex("Hello World"))
'0xf334bf277b674260e85f1a3d2565d76463d63d29549ef4fa6d6833207576b5ba'
```


## sign

```javascript
caver.klay.accounts.sign(data, privateKey)
```
임의의 데이터에 서명합니다. 데이터는 UTF-8 HEX 디코딩되기 전이며 다음과 같이 포함됩니다:
```
"\x19Klaytn Signed Message:\n" + message.length + message
```

**Parameters**

| 명칭         | 형식     | 설명       |
| ---------- | ------ | -------- |
| data       | String | 서명할 데이터. |
| privateKey | String | 서명할 개인키. |


**리턴값**

`String|Object`: 서명된 데이터 RLP 인코딩된 서명. 서명값은 다음과 같습니다:

| 명칭          | 형식     | 설명            |
| ----------- | ------ | ------------- |
| message     | String | 주어진 메시지.      |
| messageHash | String | 주어진 메시지의 해시.  |
| r           | String | 서명의 처음 32바이트. |
| s           | String | 서명의 다음 32바이트. |
| v           | String | 복구값 + 27      |
| signature   | String | 생성된 서명.       |


**예시**

```javascript
> caver.klay.accounts.sign('Some data', '0x{private key}');
{
    message: 'Some data',
    messageHash: '0x8ed2036502ed7f485b81feaec1c581d236a8b711e55a24077724879c8a263c2a',
    v: '0x1b',
    r: '0x4a57bcff1637346a4323a67acd7a478514d9f00576f42942d50a5ca0e4b0342b',
    s: '0x5914e19a8ebc10ce1450b00a3b9c1bf0ce01909bca3ffdead1aa3a791a97b5ac',
    signature: '0x4a57bcff1637346a4323a67acd7a478514d9f00576f42942d50a5ca0e4b0342b5914e19a8ebc10ce1450b00a3b9c1bf0ce01909bca3ffdead1aa3a791a97b5ac1b'
}
```


## recover

```javascript
caver.klay.accounts.recover(signatureObject)
caver.klay.accounts.recover(message, signature [, preFixed])
caver.klay.accounts.recover(message, v, r, s [, preFixed])
```
주어진 데이터에 서명하는 데 사용된 Klaytn 주소를 복구합니다.

**매개변수**

| 명칭                             | 형식                   | 설명                                                                                                                                                   |
| ------------------------------ | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| message &#124; signatureObject | String &#124; Object | 서명된 메시지 또는 해시. 서명 객체에 대한 자세한 내용은 아래 표를 참조하세요.                                                                                                        |
| messageHash                    | String               | 주어진 메시지의 해시.                                                                                                                                         |
| signature                      | String               | 원시(raw) RLP 인코딩된 서명, 또는 v, r, s 값인 매개변수 2-4.                                                                                                         |
| preFixed                       | Boolean              | (선택 사항, 기본값: `false`) 마지막 매개 변수가 `true`이면, 제공된 메시지에 자동으로 `"\x19Klaytn Signed Message:\n" + message.length + message`접두사가 붙지 않으며 이미 접두사가 있다고 가정합니다. |

서명 객체는 다음과 같은 값을 가집니다:

| 명칭          | 형식     | 설명                                                                                          |
| ----------- | ------ | ------------------------------------------------------------------------------------------- |
| messageHash | String | 주어진 메시지의 해시는 이미 `"\x19Klaytn Signed Message:\n" + message.length + message` 접두사가 붙어 있습니다. |
| r           | String | 서명의 처음 32바이트.                                                                               |
| s           | String | 서명의 다음 32바이트.                                                                               |
| v           | String | 복구값 + 27                                                                                    |


**리턴값**

| 형식     | 설명                              |
| ------ | ------------------------------- |
| String | 이 데이터에 서명하는 데 사용된 Klaytn 주소입니다. |


**예시**

```javascript
> caver.klay.accounts.recover({
      messageHash: '0x8ed2036502ed7f485b81feaec1c581d236a8b711e55a24077724879c8a263c2a',
      v: '0x1b',
      r: '0x4a57bcff1637346a4323a67acd7a478514d9f00576f42942d50a5ca0e4b0342b',
      s: '0x5914e19a8ebc10ce1450b00a3b9c1bf0ce01909bca3ffdead1aa3a791a97b5ac',
  })
'0x2c7536E3605D9C16a7a3D7b1898e529396a65c23'

// message, signature
> caver.klay.accounts.recover('Some data', '0x4a57bcff1637346a4323a67acd7a478514d9f00576f42942d50a5ca0e4b0342b5914e19a8ebc10ce1450b00a3b9c1bf0ce01909bca3ffdead1aa3a791a97b5ac1b');
'0x2c7536E3605D9C16a7a3D7b1898e529396a65c23'

// message, v, r, s
> caver.klay.accounts.recover('Some data', '0x1b', '0x4a57bcff1637346a4323a67acd7a478514d9f00576f42942d50a5ca0e4b0342b', '0x5914e19a8ebc10ce1450b00a3b9c1bf0ce01909bca3ffdead1aa3a791a97b5ac');
'0x2c7536E3605D9C16a7a3D7b1898e529396a65c23'
```


## encrypt

```javascript
caver.klay.accounts.encrypt(privateKey, password [, options])
```
Klaytn 키스토어 v3 표준으로 개인키를 암호화합니다.

**매개변수**

| 명칭         | 형식     | 설명                                                                                                                                     |
| ---------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| privateKey | String | 암호화할 개인키 또는 Klaytn 지갑 키.                                                                                                               |
| password   | String | 암호화에 사용되는 비밀번호.                                                                                                                        |
| options    | Object | (선택 사항) `options` 매개변수를 사용하면 암호화 사용 시 사용할 값을 지정할 수 있습니다. options 객체를 사용하여 분리된(decoupled) 계정을 암호화할 수도 있습니다. `options`사용법은 아래 예시를 참조하세요. |

**참고**: 주소에서 개인키가 분리된 경우 개인키를 암호화하는 두 가지 방법이 있습니다.
1. privateKey 매개변수와 함께 [KlaytnWalletKey](../../../../klaytn/design/accounts.md#klaytn-wallet-key-format) 포맷을 사용하세요.
2. 주소를 매개변수로 보내기 위해 `options.address`를 사용하세요.

**리턴값**

| 형식     | 설명                 |
| ------ | ------------------ |
| Object | 암호화된 키스토어 v3 JSON. |


**예시**

```javascript
> caver.klay.accounts.encrypt('0x{private key}', 'test!');
{
    version: 3,
    id: '04e9bcbb-96fa-497b-94d1-14df4cd20af6',
    address: '2c7536e3605d9c16a7a3d7b1898e529396a65c23',
    crypto: {
        ciphertext: 'a1c25da3ecde4e6a24f3697251dd15d6208520efc84ad97397e906e6df24d251',
        cipherparams: { iv: '2885df2b63f7ef247d753c82fa20038a' },
        cipher: 'aes-128-ctr',
        kdf: 'scrypt',
        kdfparams: {
            dklen: 32,
            salt: '4531b3c174cc3ff32a6a7a85d6761b410db674807b2d216d022318ceee50be10',
            n: 262144,
            r: 8,
            p: 1
        },
        mac: 'b8b010fff37f9ae5559a352a185e86f9b9c1d7f7a9f1bd4e82a5dd35468fc7f6'
    }
}

// Encrypt decoupled account - 1. Use the KlaytnWalletKey format with the privateKey parameter.
> caver.klay.accounts.encrypt('0x{private key}0x{type}0x{address in hex}', 'test');
{ 
    version: 3,
    id: '432b16f6-bf4e-4a10-af79-d6ad644b9d84',
    address: '0x3bd32d55e64d6cbe54bec4f5200e678ee8d1a990',  
    crypto: { 
        ciphertext: 'a82029d303ad21218bb51d215a88cad0ed08ee5b10016b8caf8d72163bfa6ef4',
        cipherparams: { iv: '0699a7176af8def3dc5d403c4e03f1e4' },
        cipher: 'aes-128-ctr',
        kdf: 'scrypt',
        kdfparams: { 
            dklen: 32,
            salt: '4654e7e4827221bfb7d963259f5491ecc2fced50cd24378de647a7087757c3ab', 
            n: 4096,
            r: 8,
            p: 1 
        },
        mac: '6bbc9ac1f558ae769d1977f03c6c7f71e83485bd3373866122c456be1744fddf' 
    } 
}

// Encrypt decoupled account - 2. Use the options to send the address as a parameter.
> caver.klay.accounts.encrypt('0x{private key}', 'test', { address: '0x7d46813010aee975946d6ee9c7fb887eef6b318d' });
{ 
    version: 3,
    id: '47a3ab30-d50e-4db6-8763-d91c0bfe029b',
    address: '0x7d46813010aee975946d6ee9c7fb887eef6b318d',
    crypto: { 
        ciphertext: '92b585bfd5c50634910e83e38261445036b3262d35f1ed5128be0ece69ca9d66',
        cipherparams: { iv: 'd97d47ed3a8dd5ecf3944b254729dc5f' },
        cipher: 'aes-128-ctr',
        kdf: 'scrypt',
        kdfparams: { 
            dklen: 32,
            salt: 'f736b6a1c32e602f910717e198e7da9a3bd7e39fa6962b3c3f5ade8027ebbab4',
            n: 4096,
            r: 8,
            p: 1 
        },
        mac: '8cdca022bfd580d72d250f4e296035339faa8c4d9eaa1f29d8cd441bec3f205b' 
    } 
}

// Using options objects with encryption option values
> caver.klay.accounts.encrypt('0x{private key}', 'test', {
      salt: '776ad46fde47572c58ba5b9616a661a1fbc4b9ff918300faeba04bb9ff5be04c',
      iv: Buffer.from('b62ef75e39fa396de62c51c4734b69a2', 'hex'),
      kdf: 'scrypt',
      dklen: 32,
      n: 262144,
      r: 8,
      p: 1,
      cipher: 'aes-128-cbc',
      uuid: Buffer.from('f0b40ab7d69fdd9606e2a5242dddd813', 'hex'),
    })
{ 
    version: 3,
    id: 'f0b40ab7-d69f-4d96-86e2-a5242dddd813',
    address: '0xdac9f72e27f05eca08df7a2ea2d044b3ed3a6e54',
    crypto: { 
        ciphertext: 'de3199afd50051ecef60675b3cc60170670e84945a5571cb2ec414b628a28c71844f7144c02301db9b41044c1f262562',
        cipherparams: { iv: 'b62ef75e39fa396de62c51c4734b69a2' },
        cipher: 'aes-128-cbc',
        kdf: 'scrypt',
        kdfparams: { 
            dklen: 32,
            salt: '776ad46fde47572c58ba5b9616a661a1fbc4b9ff918300faeba04bb9ff5be04c',
            n: 262144,
            r: 8,
            p: 1 
        },
        mac: 'a3c3bbc90b5c8f0ae019e428a4081c39f91876adf8441d51cafbbe37ca839b8c' 
    } 
}

> caver.klay.accounts.encrypt('0x{private key}', 'test', {
      salt: '776ad46fde47572c58ba5b9616a661a1fbc4b9ff918300faeba04bb9ff5be04c',
      iv: Buffer.from('b62ef75e39fa396de62c51c4734b69a2', 'hex'),
      kdf: 'pbkdf2',
      dklen: 32,
      c: 262144,
      cipher: 'aes-128-cbc',
      uuid: Buffer.from('f0b40ab7d69fdd9606e2a5242dddd813', 'hex'),
    })
{ 
    version: 3,
    id: 'f0b40ab7-d69f-4d96-86e2-a5242dddd813',
    address: '0xdac9f72e27f05eca08df7a2ea2d044b3ed3a6e54',
    crypto: { 
        ciphertext: '8b4b480b003af59210ba8c8815425955274c395b27e5354f7eef870f3e8ddc0e4c97bd4a30e8b60337aea2fdbbd50009',
        cipherparams: { iv: 'b62ef75e39fa396de62c51c4734b69a2' },
        cipher: 'aes-128-cbc',
        kdf: 'pbkdf2',
        kdfparams: { 
            dklen: 32,
            salt: '776ad46fde47572c58ba5b9616a661a1fbc4b9ff918300faeba04bb9ff5be04c',
            c: 262144,
            prf: 'hmac-sha256' 
        },
        mac: 'c19e889b887812920d2453bbcb87640a6246e49fc513f2d927954edab73fefab' 
    } 
}
```


## decrypt

```javascript
caver.klay.accounts.decrypt(keystoreJsonV3, password)
```
키스토어 v3 JSON을 복호화하고 복호화된 계정 객체를 반환합니다.

**매개변수**

| 명칭             | 형식     | 설명                           |
| -------------- | ------ | ---------------------------- |
| keystoreJsonV3 | String | 복호화할 암호화된 개인키가 포함된 JSON 문자열. |
| password       | String | 암호화에 사용되는 비밀번호.              |


**Return Value**

| 형식     | 설명       |
| ------ | -------- |
| Object | 복호화된 계정. |


**예시**

```javascript
> caver.klay.accounts.decrypt({
     version: 3,
     id: '04e9bcbb-96fa-497b-94d1-14df4cd20af6',
     address: '2c7536e3605d9c16a7a3d7b1898e529396a65c23',
     crypto: {
         ciphertext: 'a1c25da3ecde4e6a24f3697251dd15d6208520efc84ad97397e906e6df24d251',
         cipherparams: { iv: '2885df2b63f7ef247d753c82fa20038a' },
         cipher: 'aes-128-ctr',
         kdf: 'scrypt',
         kdfparams: {
             dklen: 32,
             salt: '4531b3c174cc3ff32a6a7a85d6761b410db674807b2d216d022318ceee50be10',
             n: 262144,
             r: 8,
             p: 1
         },
         mac: 'b8b010fff37f9ae5559a352a185e86f9b9c1d7f7a9f1bd4e82a5dd35468fc7f6'
     }
  }, 'test!');
{ 
    address: '2c7536e3605d9c16a7a3d7b1898e529396a65c23',
    privateKey: '0x{private key}',
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey]
}
```

## isDecoupled

```javascript
caver.klay.accounts.isDecoupled(key, address)
```
키가 주소에서 분리되었는지 확인합니다.

**매개변수**

| 명칭      | 형식     | 설명                                                                                                                                |
| ------- | ------ | --------------------------------------------------------------------------------------------------------------------------------- |
| key     | String | 주소에서 분리되었는지 확인하고자 하는 키. 키는 32바이트 문자열 개인키 또는 [KlaytnWalletKey](../../../../klaytn/design/accounts.md#klaytn-wallet-key-format)입니다. |
| address | String | (선택 사항) 분리 여부를 확인하는 데 사용되는 주소. 주소가 주어지지 않으면, 주소는 키에서 파생됩니다.                                                                       |


**리턴값**

| 형식      | 설명                                         |
| ------- | ------------------------------------------ |
| Boolean | 키가 주소에서 분리되었으면 `true`. 분리되지 않은 경우 `false`. |


**예시**

```javascript
> caver.klay.accounts.isDecoupled('0x{private key}', '0x{address in hex}')
true

> caver.klay.accounts.isDecoupled('0x{private key}0x{type}0x{address in hex}')
true

> caver.klay.accounts.isDecoupled('0x{private key}')
false

> caver.klay.accounts.isDecoupled('0x{private key}0x{type}0x{address in hex}')
false
```

## getLegacyAccount

```javascript
caver.klay.accounts.getLegacyAccount(key)
```
주어진 개인키에서 파생된 주소를 가진 계정을 반환합니다. [AccountKeyLegacy](../../../../klaytn/design/accounts.md#accountkeylegacy)를 참조하세요.

**매개변수**

| 명칭  | 형식     | 설명                                                                                                                                                                                   |
| --- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| key | String | 기존 계정 키가 있는 계정을 얻는 데 사용되는 매개변수입니다. 키는 32바이트 문자열 개인키 또는 [KlaytnWalletKey](../../../../klaytn/design/accounts.md#klaytn-wallet-key-format)입니다. KlaytnWalletKey에서는 개인키에 해당하는 부분만 사용됩니다. |


**리턴값**

| 형식     | 설명                                                        |
| ------ | --------------------------------------------------------- |
| Object | 주어진 값의 기존 계정 키가 있는 계정 객체입니다. 키에서 추출된 주소 정보가 있으면 함께 반환됩니다. |


**예시**

```javascript
// getLegacyAccount with raw private key format
> caver.klay.accounts.getLegacyAccount('0x{private key}')
{ 
    legacyAccount: { 
        address: '0xE26D5d4983eD62A99D7D4Bc0cE0e784782fF6B27',
        privateKey: '0x{private key}' 
    },
    klaytnWalletKeyAddress: '' 
}

// getLegacyAccount with KlaytnWalletKey format
> caver.klay.accounts.getLegacyAccount('0x{private key}0x{type}0x{address in hex}')
{ 
    legacyAccount: { 
        address: '0xE26D5d4983eD62A99D7D4Bc0cE0e784782fF6B27',
        privateKey: '0x{private key}'
    },
    klaytnWalletKeyAddress: '0xE26D5d4983eD62A99D7D4Bc0cE0e784782fF6B27'
}

// getLegacyAccount with decoupled KlaytnWalletKey format
> caver.klay.accounts.getLegacyAccount('0x{private key}0x{type}0x{address in hex}')
{ 
    legacyAccount: { 
        address: '0xE26D5d4983eD62A99D7D4Bc0cE0e784782fF6B27',
        privateKey: '0x{private key}' 
    },
    klaytnWalletKeyAddress: '0xd05c5926b0a2f31aadcc9a9cbd3868a50104d834'
}
```


## wallet

```javascript
caver.klay.accounts.wallet
```
여러 계정이 있는 인메모리 지갑을 포함합니다.  이 계정들은 [caver.klay.sendTransaction](./caver.klay/transaction.md#sendtransaction)를 사용할 때 쓸 수 있습니다.

**예시**

```javascript
> caver.klay.accounts.wallet;
Wallet {
  '0':
   { address: '0xce3bda34a14415f3bc2bcd5e61c48043857a6451',
     privateKey: '0x{private key}',
     signTransaction: [Function: signTransaction],
     sign: [Function: sign],
     encrypt: [Function: encrypt],
     getKlaytnWalletKey: [Function: getKlaytnWalletKey],
     index: 0 },
  _accounts: Accounts { ... },
  length: 1,
  defaultKeyName: 'caverjs_wallet',
  '0xce3bda34a14415f3bc2bcd5e61c48043857a6451': { ... },
  '0XCE3BDA34A14415F3BC2BCD5E61C48043857A6451': { ... },
  '0xce3bDa34A14415F3BC2bCd5E61C48043857a6451': { ... } 
}
```


## wallet.create

```javascript
caver.klay.accounts.wallet.create([numberOfAccounts] [, entropy])
```
무작위로 생성된 키 쌍을 사용하여 지갑에 하나 이상의 계정을 생성합니다. 지갑이 이미 존재하면, 덮어쓰지 않습니다.

**매개변수**

| 명칭               | 형식     | 설명                                                                                                        |
| ---------------- | ------ | --------------------------------------------------------------------------------------------------------- |
| numberOfAccounts | Number | (선택 사항) 생성할 계정 수. 빈 지갑을 만들려면 비워두세요.                                                                       |
| entropy          | String | (선택 사항) 엔트로피를 증가시키는 임의의 문자열. 아무 것도 지정하지 않으면 [randomHex](./caver.utils.md#randomhex)를 사용하여 임의의 문자열이 생성됩니다. |

**Return Value**

| 형식     | 설명     |
| ------ | ------ |
| Object | 지갑 객체. |


**예시**

```javascript
> caver.klay.accounts.wallet.create(1, 'entropy');
Wallet {
  '0': { ... },
  _accounts: Accounts { ... },
  length: 1,
  defaultKeyName: 'caverjs_wallet',
  '0xc89cdd4258e17471fbaf75283b6a952451eb7f54': { ... },
  '0XC89CDD4258E17471FBAF75283B6A952451EB7F54': { ... },
  '0xC89cDD4258e17471fBaf75283b6A952451Eb7f54': { ... }
```


## wallet.add

```javascript
caver.klay.accounts.wallet.add(account [, targetAddress])
```
개인키 또는 계정 객체를 사용하여 계정을 지갑에 추가합니다.

**참고**: 지갑에 동일한 주소가 있는 경우에는 오류가 반환됩니다. 지갑의 계정과 관련된 개인키를 변경하려면 [caver.klay.accounts.wallet.updatePrivateKey](#wallet-updateprivatekey)를 사용하세요.


**매개변수**

| 명칭            | 형식                   | 설명                                                       |
| ------------- | -------------------- | -------------------------------------------------------- |
| 계정 (Account)  | String &#124; Object | [caver.klay.accounts.create](#create)로 생성된 개인키 또는 계정 객체. |
| targetAddress | String               | 주어진 개인키와 함께 사용될 목표 주소.                                   |

**참고**: caver-js는 두 가지 유형의 개인키 형식을 지원합니다. 하나는 32바이트 문자열 타입의 원시 개인키 형식이고 다른 하나는 [KlaytnWalletKey](../../../../klaytn/design/accounts.md#klaytn-wallet-key-format)입니다.

**리턴값**

| 형식     | 설명       |
| ------ | -------- |
| Object | 추가 된 계정. |


**예시**

```javascript
> caver.klay.accounts.wallet.add('0x{private key}');
{ 
    address: '0xdac9f72e27f05eca08df7a2ea2d044b3ed3a6e54',
    privateKey: '0x{private key}',
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey],
    index: 4 
}

// Use key '0x{private key}' as a private key
// for address '0xfe9157e180c8f4c229e88d0c1763a746db8b19b4'
> caver.klay.accounts.wallet.add('0x{private key}', '0xfe9157e180c8f4c229e88d0c1763a746db8b19b4');
{ 
    address: '0xfe9157e180c8f4c229e88d0c1763a746db8b19b4',
    privateKey: '0x{private key}',
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey],
    index: 5
}

> caver.klay.accounts.wallet.add({
      privateKey: '0x{private key}',
      address: '0xb8CE9ab6943e0eCED004cDe8e3bBed6568B2Fa01'
  });
{ 
    address: '0xb8CE9ab6943e0eCED004cDe8e3bBed6568B2Fa01',
    privateKey: '0x{private key}',
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey],
    index: 6
}

// Add wallet with KlaytnWalletKey format
> caver.klay.accounts.wallet.add('0x{private key}0x{type}0x{address in hex}');
{ 
    address: '0x3bd32d55e64d6cbe54bec4f5200e678ee8d1a990',
    privateKey: '0x{private key}',
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey],
    index: 1 
}
```


## wallet.remove

```javascript
caver.klay.accounts.wallet.remove(account)
```
지갑에서 계정을 제거합니다.

**Parameters**

| 명칭           | 형식                   | 설명                |
| ------------ | -------------------- | ----------------- |
| 계정 (Account) | String &#124; Number | 지갑의 계좌 주소 또는 인덱스. |


**리턴값**

| 형식      | 설명                                   |
| ------- | ------------------------------------ |
| Boolean | 지갑이 제거된 경우 `true`. 찾을 수 없으면 `false`. |


**예시**

```javascript
> caver.klay.accounts.wallet;
Wallet {
  '0': { ... },
  _accounts: Accounts { ... },
  length: 1,
  defaultKeyName: 'caverjs_wallet',
  '0xce3bda34a14415f3bc2bcd5e61c48043857a6451': { ... },
  '0XCE3BDA34A14415F3BC2BCD5E61C48043857A6451': { ... },
  '0xce3bDa34A14415F3BC2bCd5E61C48043857a6451': { ... } 
}

> caver.klay.accounts.wallet.remove('0xce3bda34a14415f3bc2bcd5e61c48043857a6451');
true

> caver.klay.accounts.wallet.remove(3);
false
```


## wallet.clear

```javascript
caver.klay.accounts.wallet.clear()
```
지갑을 안전하게 비우고 모든 계정을 제거합니다.

**매개변수**

None

**Return Value**

| 형식     | 설명     |
| ------ | ------ |
| Object | 지갑 객체. |

**예시**

```javascript
> caver.klay.accounts.wallet.clear();
Wallet {
  _accounts: Accounts { ... },
  length: 0,
  defaultKeyName: 'caverjs_wallet' 
}
```


## wallet.encrypt

```javascript
caver.klay.accounts.wallet.encrypt(password)
```
모든 지갑 계정을 암호화하고 암호화된 키스토어 v3 객체 배열을 반환합니다.

**매개변수**

| 명칭       | 형식     | 설명             |
| -------- | ------ | -------------- |
| password | String | 암호화에 사용될 비밀번호. |


**리턴값**

| 형식    | 설명                |
| ----- | ----------------- |
| Array | 암호화된 키스토어 v3 객체들. |


**예시**

```javascript
> caver.klay.accounts.wallet.encrypt('test');
[ 
    { 
        version: 3,
        id: '2b334f59-a0bc-446c-9f25-c934e432e832',
        address: '0x57629b4a9dc137f15400a3d96ab9e1e57b7f57c7',
        crypto: { 
            ciphertext: '9ca62a29f0f634ca63dfab40a4631f9fabb689ae60e4bfb475c58c69ad060543',
            cipherparams: { iv: '3d924a71a7b4db0f2f8456068c1c7b8e' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: { 
                dklen: 32,
                salt: '42628f28de6aa8b988c425fa97d8f790ac26a6f89b44b0321c56101e7fb8bbcf',
                n: 4096,
                r: 8,
                p: 1 
                },
            mac: 'a35bc8f650aa1ff0d2316de7be1494927851e19b3e817cd16482a442912f133b' 
        } 
    },
    { 
        version: 3,
        id: '9b8b4e4f-e72c-4a28-af57-38b6838b5533',
        address: '0x4fb4006448106831a7c8c8e0d0139e05550f3d3e',
        crypto: { 
            ciphertext: '65b9350969efdfeadb357145c97992b67c4114bd1d24592e8c62dbddfab2a49f',
            cipherparams: { iv: 'b9d19c69a62745b3db409ff0879669a2' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: { 
                dklen: 32,
                salt: '914a4628a991f521d547a9da593b5daa63a1a82fcafe0282c09e80967874f36c',
                n: 4096,
                r: 8,
                p: 1 
            },
            mac: 'a9de2c54c4b29807fd21d40fe79f556a7d5b771045cbbda0a943d3ced4cacafc' 
        } 
    } 
]
```


## wallet.decrypt

```javascript
caver.klay.accounts.wallet.decrypt(keystoreArray, password)
```
키스토어 v3 객체들을 복호화합니다.

**매개변수**

| 명칭            | 형식     | 설명                     |
| ------------- | ------ | ---------------------- |
| keystoreArray | Array  | 복호화할 암호화된 키스토어 v3 객체들. |
| password      | String | 암호화에 사용된 비밀번호.         |


**리턴값**

| 형식     | 설명     |
| ------ | ------ |
| Object | 지갑 객체. |


**예시**

```javascript
> caver.klay.accounts.wallet.decrypt([ 
    { 
        version: 3,
        id: '2b334f59-a0bc-446c-9f25-c934e432e832',
        address: '0x57629b4a9dc137f15400a3d96ab9e1e57b7f57c7',
        crypto: { 
            ciphertext: '9ca62a29f0f634ca63dfab40a4631f9fabb689ae60e4bfb475c58c69ad060543',
            cipherparams: { iv: '3d924a71a7b4db0f2f8456068c1c7b8e' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: { 
                dklen: 32,
                salt: '42628f28de6aa8b988c425fa97d8f790ac26a6f89b44b0321c56101e7fb8bbcf',
                n: 4096,
                r: 8,
                p: 1 
                },
            mac: 'a35bc8f650aa1ff0d2316de7be1494927851e19b3e817cd16482a442912f133b' 
        } 
    },
    { 
        version: 3,
        id: '9b8b4e4f-e72c-4a28-af57-38b6838b5533',
        address: '0x4fb4006448106831a7c8c8e0d0139e05550f3d3e',
        crypto: { 
            ciphertext: '65b9350969efdfeadb357145c97992b67c4114bd1d24592e8c62dbddfab2a49f',
            cipherparams: { iv: 'b9d19c69a62745b3db409ff0879669a2' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: { 
                dklen: 32,
                salt: '914a4628a991f521d547a9da593b5daa63a1a82fcafe0282c09e80967874f36c',
                n: 4096,
                r: 8,
                p: 1 
            },
            mac: 'a9de2c54c4b29807fd21d40fe79f556a7d5b771045cbbda0a943d3ced4cacafc' 
        } 
    } 
], 'test');
Wallet {
  '0': { ... },
  '1': { ... },
  _accounts: Accounts { ... },
  length: 2,
  defaultKeyName: 'caverjs_wallet',
  '0x57629b4a9dc137f15400a3d96ab9e1e57b7f57c7': { ... } ,
  '0X57629B4A9DC137F15400A3D96AB9E1E57B7F57C7': { ... } ,
  '0x57629B4A9DC137F15400A3d96Ab9e1e57B7F57C7': { ... } ,
  '0x4fb4006448106831a7c8c8e0d0139e05550f3d3e': { ... } ,
  '0X4FB4006448106831A7C8C8E0D0139E05550F3D3E': { ... } ,
  '0x4fb4006448106831a7c8C8e0D0139E05550F3D3E': { ... } 
}
```

## wallet.getKlaytnWalletKey

```javascript
caver.klay.accounts.wallet.getKlaytnWalletKey(index)
caver.klay.accounts.wallet.getKlaytnWalletKey(address)
```
caver-js 지갑에 있는 계정에 대한 Klaytn 지갑 키를 반환합니다.

**매개변수**

| 명칭             | 형식                 | 설명                                                          |
| -------------- | ------------------ | ----------------------------------------------------------- |
| indexOrAddress | Number&#124;String | 지갑 주소 목록의 인덱스로, 16진수로 된 주소입니다. 주어진 값은 caver-js 지갑에 있어야 합니다. |


**리턴값**

| 형식     | 설명                                                   |
| ------ | ---------------------------------------------------- |
| String | 계정과 일치하는 KlaytnWalletKey. 이 값을 사용하면 지갑에 로그인할 수 있습니다. |


**예시**

```javascript
// With non-human-readable address
> caver.klay.accounts.wallet.getKlaytnWalletKey(0)
'0x{private key}0x{type}0x{address in hex}'

// With index of wallet list
> caver.klay.accounts.wallet.getKlaytnWalletKey(1)
'0x{private key}0x{type}0x{address in hex}'

// With an address in hexadecimal
> caver.klay.accounts.wallet.getKlaytnWalletKey('0xa9d40b07a6d06e7b7af6cf9a17fb107c9fc7fe58')
'0x{private key}0x{type}0x{address in hex}'

// If the given account does not exist in the caver-js wallet, returns an error.
> caver.klay.accounts.wallet.getKlaytnWalletKey('0x35170d0c774b8c80e9f802a7af6d0497e621c215')
Error: Failed to find account
```

## wallet.updatePrivateKey

```javascript
caver.klay.accounts.wallet.updatePrivateKey(privateKey, address)
```
지갑에 저장된 계정의 개인키 정보를 업데이트합니다.

**참고**: 이 함수는 caver-js의 지갑에 저장된 정보만을 변경합니다. 이 함수는 Klaytn 네트워크에 저장된 키 정보에는 영향을 미치지 않습니다. Klaytn 네트워크의 키는 ['ACCOUNT_UPDATE'](./caver.klay/sendtx_account_update.md#sendtransaction-account_update) 트랜잭션을 보내는 것으로 변경할 수 있습니다.

**매개변수**

| 명칭         | 형식     | 설명                 |
| ---------- | ------ | ------------------ |
| privateKey | String | 업데이트에 사용될 새로운 개인키. |
| address    | String | 지갑의 계좌 주소.         |


**리턴값**

| 형식     | 설명                       |
| ------ | ------------------------ |
| Object | 업데이트된 계정에 대한 정보가 포함된 객체. |


**예시**

```javascript
> caver.klay.accounts.wallet.updatePrivateKey('{private key}', '0xf2e2565629c7763dc0b595e8e531a31371a95f95');
{ 
    address: '0xf2e2565629c7763dc0b595e8e531a31371a95f95',
    privateKey: '0x{private key}',
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey],
    index: 0 
}
```
