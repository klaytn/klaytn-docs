---
sidebar_label: 부분 수수료 위임
---

# 부분 수수료 위임 유형 트랜잭션 클래스

## FeeDelegatedValueTransferWithRatio <a id="feedelegatedvaluetransferwithratio"></a>

```javascript
caver.transaction.feeDelegatedValueTransferWithRatio.create(transactionObject)
```

`FeeDelegatedValueTransferWithRatio`는 [수수료 위임 밸류 전송 비율 트랜잭션](../../../../../learn/transactions/partial-fee-delegation.md#txtypefeedelegatedvaluetransferwithratio)을 나타냅니다. `transactionObject`는 아래 프로퍼티를 가지고 `FeeDelegatedValueTransferWithRatio` 트랜잭션을 생성할 수 있습니다.

`FeeDelegatedValueTransferWithRatio`은 아래와 같은 프로퍼티를 멤버 변수로 가지고 있습니다. `optional`로 표시된 프로퍼티는 사용자가 `FeeDelegatedValueTransfer` 트랜잭션을 생성할 때 `transactionObject`에서 선택적으로 정의할 수 있는 프로퍼티를 나타냅니다.

:::note

참고: RLP 인코딩된 문자열에서 `FeeDelegatedValueTransferWithRatio`의 인스턴스를 생성할 수 있습니다. 아래 예시를 참고하시기 바랍니다.
참고: `caver.transaction.feeDelegatedValueTransferWithRatio.create`는 caver-js [v1.6.1](../../../../../learn/transactions/partial-fee-delegation.md#txtypefeedelegatedsmartcontractexecutionwithratio) 부터 지원됩니다.

참고: caver-js [v1.8.1-rc.4](../../../../../learn/transactions/partial-fee-delegation.md#txtypefeedelegatedcancelwithratio)부터 트랜잭션 생성은 `create` 함수를 통해서만 지원됩니다. 기존에 `new caver.transaction.feeDelegatedValueTransferWithRatio({...})`와 같은 생성자를 사용하여 트랜잭션을 생성했다면, `caver.transaction.feeDelegatedValueTransferWithRatio.create({...})`로 변경해 주시기 바랍니다.

:::

**속성**

| 이름                 | 유형     | 설명                                                                                                                                               |
| ------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| value              | String | 전송할 peb의 KLAY 양입니다. `caver.utils.toPeb`을 사용할 수 있습니다.                                                                                             |
| from               | String | 발신자의 주소입니다.                                                                                                                                      |
| to                 | String | 전송된 값을 받을 계정 주소입니다.                                                                                                                              |
| gas                | String | 트랜잭션이 사용할 수 있는 최대 트랜잭션 수수료 금액입니다.                                                                                                                |
| feeRatio           | String | 수수료 지불자가 부담하게 될 트랜잭션 수수료의 비율을 구성하는 비율입니다. 이 비율의 유효한 범위는 1에서 99 사이입니다. 0 또는 100 이상의 비율은 허용되지 않습니다.                                                |
| signatures         | Array  | (선택 사항) 서명의 배열입니다.                                                                                                            |
| feePayerSignatures | Array  | (선택 사항) 수수료 납부자 서명의 배열입니다.                                                                                                    |
| feePayer           | String | (선택 사항) 수수료 납부자의 주소입니다.                                                                                                       |
| nonce              | String | (선택 사항) 발신자의 트랜잭션을 고유하게 식별하는 데 사용되는 값입니다. 생략하면 `caver.rpc.klay.getTransactionCount(address, 'pending')`가 nonce를 설정하는 데 사용됩니다. |
| gasPrice           | String | (선택 사항) 발신자가 토큰으로 지불할 금액을 구하기 위한 승수입니다. 생략하면 `caver.rpc.klay.getGasPrice`가 가스 가격을 설정하는 데 사용됩니다.                               |
| chainId            | String | (선택 사항) 클레이튼 네트워크의 체인 아이디입니다. 생략하면 `caver.rpc.klay.getChainId`가 체인아이디를 설정하는 데 사용됩니다.                                          |

**예시**

```javascript
// Create a feeDelegatedValueTransferWithRatio
> caver.transaction.feeDelegatedValueTransferWithRatio({
    from: '0x{address in hex}',
    to: '0x9957dfd92e4b70f91131c573293343bc5f21f215',
    value: caver.utils.toPeb(1, `klay`),
    gas: 25000,
    feeRatio: 30,
})

// Create a feeDelegatedValueTransferWithRatio from RLP-encoded string
> caver.transaction.feeDelegatedValueTransferWithRatio('0x0af8d78204d219830f4240947b65b75d204abed71587c9e519a89277766ee1d00a94a94f5374fce5edbc8e2a8697c15331677e6ebf0b1ef845f84325a0dde32b8241f039a82b124fe94d3e556eb08f0d6f26d07dcc0f3fca621f1090caa01c8c336b358ab6d3a2bbf25de2adab4d01b754e2fb3b9b710069177d54c1e956945a0043070275d9f6054307ee7348bd660849d90ff845f84326a0091ecf53f91bb97bb694f2f2443f3563ac2b646d651497774524394aae396360a044228b88f275aa1ec1bab43681d21dc7e3a676786ed1906f6841d0a1a188f88a')
FeeDelegatedValueTransferWithRatio {
    _type: 'TxTypeFeeDelegatedValueTransferWithRatio',
    _from: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
    _gas: '0xf4240',
    _nonce: '0x4d2',
    _gasPrice: '0x19',
    _signatures: [ SignatureData { _v: '0x25', _r: '0xdde32...', _s: '0x1c8c3...' } ],
    _feePayer: '0x5a0043070275d9f6054307ee7348bd660849d90f',
    _feePayerSignatures: [ SignatureData { _v: '0x26', _r: '0x091ec...', _s: '0x44228...' } ],
    _feeRatio: '0x1e',
    _to: '0x7b65b75d204abed71587c9e519a89277766ee1d0',
    _value: '0xa'
}
```

## FeeDelegatedValueTransferMemoWithRatio <a id="feedelegatedvaluetransfermemowithratio"></a>

```javascript
caver.transaction.feeDelegatedValueTransferMemoWithRatio.create(transactionObject)
```

`FeeDelegatedValueTransferMemoWithRatio`은 [수수료 위임 밸류 전송 메모 위드 비율 트랜잭션](../../../../../learn/transactions/partial-fee-delegation.md#txtypefeedelegatedvaluetransfermemowithratio)을 나타냅니다. `transactionObject`는 아래 프로퍼티를 가지고 `FeeDelegatedValueTransferMemoWithRatio` 트랜잭션을 생성할 수 있습니다.

`FeeDelegatedValueTransferMemoWithRatio`는 아래와 같은 프로퍼티를 멤버 변수로 가집니다. `optional`로 표시된 프로퍼티는 사용자가 `FeeDelegatedValueTransferMemoWithRatio` 트랜잭션을 생성할 때 `transactionObject`에서 선택적으로 정의할 수 있는 프로퍼티를 나타냅니다.

:::note

참고: RLP 인코딩된 문자열에서 `FeeDelegatedValueTransferMemoWithRatio`의 인스턴스를 생성할 수 있습니다. 아래 예시를 참고하시기 바랍니다.
참고: `caver.transaction.feeDelegatedValueTransferMemoWithRatio.create`는 caver-js [v1.6.1](../../../../../learn/transactions/partial-fee-delegation.md#txtypefeedelegatedsmartcontractexecutionwithratio) 부터 지원됩니다.

참고: caver-js [v1.8.1-rc.4](../../../../../learn/transactions/partial-fee-delegation.md#txtypefeedelegatedcancelwithratio)부터 트랜잭션 생성은 `create` 함수를 통해서만 지원됩니다. 기존에 `new caver.transaction.feeDelegatedValueTransferMemoWithRatio({...})`와 같은 생성자를 사용하여 트랜잭션을 생성했다면, `caver.transaction.feeDelegatedValueTransferMemoWithRatio.create({...})`로 변경해 주시기 바랍니다.

:::

**속성**

| 이름                 | 유형     | 설명                                                                                                                                               |
| ------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| value              | String | 전송할 peb의 KLAY 양입니다. `caver.utils.toPeb`을 사용할 수 있습니다.                                                                                             |
| from               | String | 발신자의 주소입니다.                                                                                                                                      |
| to                 | String | 전송된 값을 받을 계정 주소입니다.                                                                                                                              |
| input              | String | 트랜잭션에 첨부된 데이터입니다. 메시지는 이 프로퍼티로 전달되어야 합니다.                                                                                                        |
| gas                | String | 트랜잭션이 사용할 수 있는 최대 트랜잭션 수수료 금액입니다.                                                                                                                |
| feeRatio           | String | 수수료 지불자가 부담하게 될 트랜잭션 수수료의 비율을 구성하는 비율입니다. 이 비율의 유효한 범위는 1에서 99 사이입니다. 0 또는 100 이상의 비율은 허용되지 않습니다.                                                |
| signatures         | Array  | (선택 사항) 서명의 배열입니다.                                                                                                            |
| feePayerSignatures | Array  | (선택 사항) 수수료 지불자 서명의 배열입니다.                                                                                                    |
| feePayer           | String | (선택 사항) 수수료 납부자의 주소입니다.                                                                                                       |
| nonce              | String | (선택 사항) 발신자의 트랜잭션을 고유하게 식별하는 데 사용되는 값입니다. 생략하면 `caver.rpc.klay.getTransactionCount(address, 'pending')`가 nonce를 설정하는 데 사용됩니다. |
| gasPrice           | String | (선택 사항) 발신자가 토큰으로 지불할 금액을 구하기 위한 승수입니다. 생략하면 `caver.rpc.klay.getGasPrice`가 가스 가격을 설정하는 데 사용됩니다.                               |
| chainId            | String | (선택 사항) 클레이튼 네트워크의 체인 아이디입니다. 생략하면 `caver.rpc.klay.getChainId`가 체인아이디를 설정하는 데 사용됩니다.                                          |

**예시**

```javascript
// Create a feeDelegatedValueTransferMemoWithRatio
> caver.transaction.feeDelegatedValueTransferMemoWithRatio({
    from: '0x{address in hex}',
    to: '0x9957dfd92e4b70f91131c573293343bc5f21f215',
    value: caver.utils.toPeb(1, `klay`),
    gas: 25000,
    input: '0x68656c6c6f',
    feeRatio: 30,
})

// Create a feeDelegatedValueTransferMemoWithRatio from RLP-encoded string
> caver.transaction.feeDelegatedValueTransferMemoWithRatio('0x12f8dd8204d219830f4240947b65b75d204abed71587c9e519a89277766ee1d00a94a94f5374fce5edbc8e2a8697c15331677e6ebf0b8568656c6c6f1ef845f84326a0769f0afdc310289f9b24decb5bb765c8d7a87a6a4ae28edffb8b7085bbd9bc78a06a7b970eea026e60ac29bb52aee10661a4222e6bdcdfb3839a80586e584586b4945a0043070275d9f6054307ee7348bd660849d90ff845f84325a0c1c54bdc72ce7c08821329bf50542535fac74f4bba5de5b7881118a461d52834a03a3a64878d784f9af91c2e3ab9c90f17144c47cfd9951e3588c75063c0649ecd')
FeeDelegatedValueTransferMemoWithRatio {
    _type: 'TxTypeFeeDelegatedValueTransferMemoWithRatio',
    _from: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
    _gas: '0xf4240',
    _nonce: '0x4d2',
    _gasPrice: '0x19',
    _signatures: [ SignatureData { _v: '0x26', _r: '0x769f0...', _s: '0x6a7b9...' } ],
    _feePayer: '0x5a0043070275d9f6054307ee7348bd660849d90f',
    _feePayerSignatures: [ SignatureData { _v: '0x25', _r: '0xc1c54...', _s: '0x3a3a6...' } ],
    _feeRatio: '0x1e',
    _to: '0x7b65b75d204abed71587c9e519a89277766ee1d0',
    _value: '0xa',
    _input: '0x68656c6c6f'
}
```

## FeeDelegatedAccountUpdateWithRatio <a id="feedelegatedaccountupdatewithratio"></a>

```javascript
caver.transaction.feeDelegatedAccountUpdateWithRatio.create(transactionObject)
```

`FeeDelegatedAccountUpdateWithRatio`은 [수수료 위임 계정 업데이트 비율 트랜잭션](../../../../../learn/transactions/partial-fee-delegation.md#txtypefeedelegatedaccountupdatewithratio)을 나타냅니다. `transactionObject`는 아래 속성을 가지고 `FeeDelegatedAccountUpdateWithRatio` 트랜잭션을 생성할 수 있습니다.

`FeeDelegatedAccountUpdateWithRatio`에는 아래와 같은 프로퍼티가 멤버 변수로 있습니다. `optional`로 표시된 프로퍼티는 사용자가 `FeeDelegatedAccountUpdateWithRatio` 트랜잭션을 생성할 때 `transactionObject`에서 선택적으로 정의할 수 있는 프로퍼티를 나타냅니다.

:::note

참고: RLP로 인코딩된 문자열에서 `FeeDelegatedAccountUpdateWithRatio` 인스턴스를 생성할 수 있습니다. 아래 예시를 참고하시기 바랍니다.
참고: `caver.transaction.feeDelegatedAccountUpdateWithRatio.create`는 caver-js [v1.6.1](../../../../../learn/transactions/partial-fee-delegation.md#txtypefeedelegatedsmartcontractexecutionwithratio) 부터 지원됩니다.

참고: caver-js [v1.8.1-rc.4](../../../../../learn/transactions/partial-fee-delegation.md#txtypefeedelegatedcancelwithratio)부터 트랜잭션 생성은 `create` 함수를 통해서만 지원됩니다. 기존에 `new caver.transaction.feeDelegatedAccountUpdateWithRatio({...})`와 같은 생성자를 사용하여 트랜잭션을 생성했다면, `caver.transaction.feeDelegatedAccountUpdateWithRatio.create({...})`로 변경해 주시기 바랍니다.

:::

**속성**

| 이름                 | 유형                                                            | 설명                                                                                                                                             |
| ------------------ | ------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| from               | String                                                        | 발신자의 주소입니다.                                                                                                                                    |
| account            | [Account] | 계정을 업데이트하는 데 필요한 정보가 포함된 [Account] 인스턴스입니다.                                                |
| gas                | String                                                        | 트랜잭션이 사용할 수 있는 최대 트랜잭션 수수료 금액입니다.                                                                                                              |
| feeRatio           | String                                                        | 수수료 지불자가 부담하게 될 트랜잭션 수수료의 비율을 구성하는 비율입니다. 이 비율의 유효한 범위는 1에서 99 사이입니다. 0 또는 100 이상의 비율은 허용되지 않습니다.                                              |
| signatures         | Array                                                         | (선택 사항) 서명의 배열입니다.                                                                                                          |
| feePayerSignatures | Array                                                         | (선택 사항) 수수료 납부자 서명의 배열입니다.                                                                                                  |
| feePayer           | String                                                        | (선택 사항) 수수료 납부자의 주소입니다.                                                                                                     |
| nonce              | String                                                        | (선택 사항) 발신자의 거래를 고유하게 식별하는 데 사용되는 값입니다. 생략하면 `caver.rpc.klay.getTransactionCount(address, 'pending')`가 nonce를 설정하는 데 사용됩니다. |
| gasPrice           | String                                                        | (선택 사항) 발신자가 토큰으로 지불할 금액을 얻기 위한 승수입니다. 생략하면 `caver.rpc.klay.getGasPrice`가 가스 가격을 설정하는 데 사용됩니다.                              |
| chainId            | String                                                        | (선택 사항) 클레이튼 네트워크의 체인 아이디입니다. 생략하면 `caver.rpc.klay.getChainId`가 체인아이디를 설정하는 데 사용됩니다.                                        |

`AccountKey` 유형별로 [Account] 인스턴스를 생성하는 방법은 [시작하기 - 계정 업데이트](../../get-started.md#account-update) 또는 [caver.account.create](../caver.account.md#caver-account-create)를 참조하시기 바랍니다.

**예시**

```javascript
// Create a feeDelegatedAccountUpdateWithRatio
> caver.transaction.feeDelegatedAccountUpdateWithRatio({
    from: '0x{address in hex}',
    gas: 50000,
    account: caver.account.createWithAccountKeyLegacy('0x{address in hex}'),
    feeRatio: 30,
})

// Create a feeDelegatedAccountUpdateWithRatio from RLP-encoded string
> caver.transaction.feeDelegatedAccountUpdateWithRatio('0x22f8ec018505d21dba00830493e0945c525570f2b8e7e25f3a6b5e17f2cc63b872ece7a302a102a1d2af887950891813bf7d851bce55f47246a5269a5d4be1fc0ab78d78ae0f5a1ef847f845820feaa08553a692cd8f86af4d335785468a5b4527ee1a2d0c5e18517fe39375e4e82d85a0698db3a07cc81427eb8ea877bb8af33d66abfb29526f58db6997eb99010be4fd94294f5bc8fadbd1079b191d9c47e1f217d6c987b4f847f845820feaa0a44cbc6e30f9df61633ed1714014924b8b614b315288cdfd795c5ba18d36d5d8a0011611104f18e3bb3d32508317a0ce6d31f0a71d55e2363b02a47aabbc7bf9d4')
FeeDelegatedAccountUpdateWithRatio {
    _type: 'TxTypeFeeDelegatedAccountUpdateWithRatio',
    _from: '0x5c525570f2b8e7e25f3a6b5e17f2cc63b872ece7',
    _gas: '0x493e0',
    _nonce: '0x1',
    _gasPrice: '0x5d21dba00',
    _signatures: [ SignatureData { _v: '0x0fea', _r: '0x8553a...', _s: '0x698db...' } ],
    _feePayer: '0x294f5bc8fadbd1079b191d9c47e1f217d6c987b4',
    _feePayerSignatures: [ SignatureData { _v: '0x0fea', _r: '0xa44cb...', _s: '0x01161...' } ],
    _feeRatio: '0x1e',
    _account: Account {
        _address: '0x5c525570f2b8e7e25f3a6b5e17f2cc63b872ece7',
        _accountKey: AccountKeyPublic { _publicKey: '0x02a1d...' }
    }
}
```

## FeeDelegatedSmartContractDeployWithRatio <a id="feedelegatedsmartcontractdeploywithratio"></a>

```javascript
caver.transaction.feeDelegatedSmartContractDeployWithRatio.create(transactionObject)
```

`FeeDelegatedSmartContractDeployWithRatio`는 [수수료 위임 스마트 컨트랙트 배포 비율 트랜잭션](../../../../../learn/transactions/partial-fee-delegation.md#txtypefeedelegatedsmartcontractdeploywithratio)를 나타냅니다. `transactionObject`는 아래 프로퍼티를 가지고 `FeeDelegatedSmartContractDeployWithRatio` 트랜잭션을 생성할 수 있습니다.

`FeeDelegatedSmartContractDeployWithRatio`은 아래와 같은 프로퍼티를 멤버 변수로 가지고 있습니다. `optional`로 표시된 프로퍼티는 사용자가 `FeeDelegatedSmartContractDeployWithRatio` 트랜잭션을 생성할 때 `transactionObject`에서 선택적으로 정의할 수 있는 프로퍼티를 나타냅니다.

:::note

참고: RLP 인코딩된 문자열에서 `FeeDelegatedSmartContractDeployWithRatio`의 인스턴스를 생성할 수 있습니다. 아래 예시를 참고하시기 바랍니다.
참고: `caver.transaction.feeDelegatedSmartContractDeployWithRatio.create`는 caver-js [v1.6.1](../../../../../learn/transactions/partial-fee-delegation.md#txtypefeedelegatedsmartcontractexecutionwithratio) 부터 지원됩니다.

참고: caver-js [v1.8.1-rc.4](../../../../../learn/transactions/partial-fee-delegation.md#txtypefeedelegatedcancelwithratio)부터 트랜잭션 생성은 `create` 함수를 통해서만 지원됩니다. 기존에 `new caver.transaction.feeDelegatedSmartContractDeployWithRatio({...})`와 같은 생성자를 사용하여 트랜잭션을 생성했다면, `caver.transaction.feeDelegatedSmartContractDeployWithRatio.create({...})`로 변경해 주시기 바랍니다.

:::

**속성**

| 이름                 | 유형      | 설명                                                                                                                                                              |
| ------------------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from               | String  | 발신자의 주소입니다.                                                                                                                                                     |
| input              | String  | 트랜잭션에 첨부된 데이터입니다. 배포할 스마트 컨트랙트의 바이트 코드와 그 인수입니다. [caver.abi.encodeContractDeploy](../caver.abi.md#encodecontractdeploy)를 통해 이 정보를 얻을 수 있습니다.                    |
| gas                | String  | 트랜잭션이 사용할 수 있는 최대 트랜잭션 수수료 금액입니다.                                                                                                                               |
| feeRatio           | String  | 수수료 지불자가 부담하게 될 트랜잭션 수수료의 비율을 구성하는 비율입니다. 이 비율의 유효한 범위는 1에서 99 사이입니다. 0 또는 100 이상의 비율은 허용되지 않습니다.                                                               |
| value              | String  | (선택 사항, 기본값: `'0x0'`) 송금할 peb 단위의 KLAY 양입니다. `caver.utils.toPeb`을 사용할 수 있습니다.                                                                |
| to                 | String  | (선택 사항, 기본값: `'0x'`) 스마트 컨트랙트가 배포될 주소입니다. 현재 이 값은 정의할 수 없습니다. 주소 지정은 향후 지원될 예정입니다.                                                           |
| humanReadable      | Boolean | (선택 사항, 기본값: `false`) 사람이 읽을 수 있는 주소는 아직 지원되지 않으므로 이 값은 false이어야 합니다.                                                                        |
| codeFormat         | String  | (선택 사항, 기본값: `'EVM'`) 스마트 컨트랙트 코드의 코드 형식입니다. 현재 지원되는 값은 EVM만 있습니다. 이 값은 내부적으로 할당 후 16진수 문자열로 변환됩니다(예: `EVM`은 `0x0`으로 변환). |
| signatures         | Array   | (선택 사항) 서명의 배열입니다.                                                                                                                           |
| feePayerSignatures | Array   | (선택 사항) 수수료 납부자 서명의 배열입니다.                                                                                                                   |
| feePayer           | String  | (선택 사항) 수수료 납부자의 주소입니다.                                                                                                                      |
| nonce              | String  | (선택 사항) 발신자의 거래를 고유하게 식별하는 데 사용되는 값입니다. 생략하면 `caver.rpc.klay.getTransactionCount(address, 'pending')`가 nonce를 설정하는 데 사용됩니다.                  |
| gasPrice           | String  | (선택 사항) 발신자가 토큰으로 지불할 금액을 구하기 위한 승수입니다. 생략하면 `caver.rpc.klay.getGasPrice`가 가스 가격을 설정하는 데 사용됩니다.                                              |
| chainId            | String  | (선택 사항) 클레이튼 네트워크의 체인 아이디입니다. 생략하면 `caver.rpc.klay.getChainId`가 체인아이디를 설정하는 데 사용됩니다.                                                         |

**예시**

```javascript
// Create a feeDelegatedSmartContractDeployWithRatio
> caver.transaction.feeDelegatedSmartContractDeployWithRatio({
    from: '0x{address in hex}',
    input: '0x60806...',
    gas: 100000,
    feeRatio: 30,
})

// Create a feeDelegatedSmartContractDeployWithRatio from RLP-encoded string
> caver.transaction.feeDelegatedSmartContractDeployWithRatio('0x2af902cd0e8505d21dba00830493e0808094294f5bc8fadbd1079b191d9c47e1f217d6c987b4b901fe608060405234801561001057600080fd5b506101de806100206000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a72305820627ca46bb09478a015762806cc00c431230501118c7c26c30ac58c4e09e51c4f0029801e80f847f845820fe9a08a20b415ae7cd642f7682e59b63cb81068723a18eb0d8d3ba58fa7545c4fc8a5a05ba8a86f4496f124f04293d4b0afec85ab3946b039d1f6a25424217508df586794c56a1fafa968d64d19b4b81c306ecbab6e489743f847f845820fe9a0a525cba1b73cbe33b4df9be7165f8731b848ce3deba607690896eda8791a1a96a05ea75b4da1b6744bb98bc2b9748d0eca5c47714ea1c09e26bebc5de386ff9958')
FeeDelegatedSmartContractDeployWithRatio {
    _type: 'TxTypeFeeDelegatedSmartContractDeployWithRatio',
    _from: '0x294f5bc8fadbd1079b191d9c47e1f217d6c987b4',
    _gas: '0x493e0',
    _nonce: '0xe',
    _gasPrice: '0x5d21dba00',
    _signatures: [ SignatureData { _v: '0x0fe9', _r: '0x8a20b...', _s: '0x5ba8a...' } ],
    _feePayer: '0xc56a1fafa968d64d19b4b81c306ecbab6e489743',
    _feePayerSignatures: [ SignatureData { _v: '0x0fe9', _r: '0xa525c...', _s: '0x5ea75...' } ],
    _feeRatio: '0x1e',
    _to: '0x',
    _value: '0x0',
    _input: '0x60806...',
    _humanReadable: false,
    _codeFormat: '0x0'
}
```

## FeeDelegatedSmartContractExecutionWithRatio <a id="feedelegatedsmartcontractexecutionwithratio"></a>

```javascript
caver.transaction.feeDelegatedSmartContractExecutionWithRatio.create(transactionObject)
```

`FeeDelegatedSmartContractExecutionWithRatio`는 [수수료 위임 스마트 컨트랙트 실행 비율 트랜잭션](../../../../../learn/transactions/partial-fee-delegation.md#txtypefeedelegatedsmartcontractexecutionwithratio)을 나타냅니다. `transactionObject`는 아래 프로퍼티를 가지고 `FeeDelegatedSmartContractExecutionWithRatio` 트랜잭션을 생성할 수 있습니다.

`FeeDelegatedSmartContractExecutionWithRatio`은 아래와 같은 프로퍼티를 멤버 변수로 가지고 있습니다. `optional`로 표시된 프로퍼티는 사용자가 `FeeDelegatedSmartContractExecutionWithRatio` 트랜잭션을 생성할 때 `transactionObject`에서 선택적으로 정의할 수 있는 프로퍼티를 나타냅니다.

:::note

참고: RLP 인코딩된 문자열에서 `FeeDelegatedSmartContractExecutionWithRatio`의 인스턴스를 생성할 수 있습니다. 아래 예시를 참고하시기 바랍니다.
참고: `caver.transaction.feeDelegatedSmartContractExecutionWithRatio.create`는 caver-js [v1.6.1](../../../../../learn/transactions/partial-fee-delegation.md#txtypefeedelegatedsmartcontractexecutionwithratio) 부터 지원됩니다.

참고: caver-js [v1.8.1-rc.4](../../../../../learn/transactions/partial-fee-delegation.md#txtypefeedelegatedcancelwithratio)부터 트랜잭션 생성은 `create` 함수를 통해서만 지원됩니다. 기존에 `new caver.transaction.feeDelegatedSmartContractExecutionWithRatio({...})`와 같은 생성자를 사용하여 트랜잭션을 생성했다면, `caver.transaction.feeDelegatedSmartContractExecutionWithRatio.create({...})`로 변경해 주시기 바랍니다.

:::

**속성**

| 이름                 | 유형     | 설명                                                                                                                                                                                                                                                 |
| ------------------ | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from               | String | 발신자의 주소입니다.                                                                                                                                                                                                                                        |
| to                 | String | 실행할 스마트 컨트랙트 계정의 주소입니다.                                                                                                                                                                                                                            |
| input              | String | 트랜잭션 실행에 사용되는 트랜잭션에 첨부된 데이터입니다. 입력은 호출할 함수와 이 함수에 전달할 매개변수를 나타내는 인코딩된 문자열입니다. 이 인코딩된 문자열은 [caver.abi.encodeFunctionCall](../../../../../learn/transactions/partial-fee-delegation.md#txtypefeedelegatedchaindataanchoringwithratio)을 통해 얻을 수 있습니다. |
| gas                | String | 트랜잭션이 사용할 수 있는 최대 트랜잭션 수수료 금액입니다.                                                                                                                                                                                                                  |
| feeRatio           | String | 수수료 납부자가 부담하게 될 트랜잭션 수수료의 비율을 구성하는 비율입니다. 이 비율의 유효한 범위는 1에서 99 사이입니다. 비율 0 또는 100 이상은 허용되지 않습니다.                                                                                                                                                   |
| value              | String | (선택 사항, 기본값: `'0x0'`) 송금할 peb 단위의 KLAY 양입니다. `caver.utils.toPeb`을 사용할 수 있습니다.                                                                                                                                                   |
| signatures         | Array  | (선택 사항) 서명의 배열입니다.                                                                                                                                                                                                              |
| feePayerSignatures | Array  | (선택 사항) 수수료 납부자 서명의 배열입니다.                                                                                                                                                                                                      |
| feePayer           | String | (선택 사항) 수수료 납부자의 주소입니다.                                                                                                                                                                                                         |
| nonce              | String | (선택 사항) 발신자의 트랜잭션을 고유하게 식별하는 데 사용되는 값입니다. 생략하면 `caver.rpc.klay.getTransactionCount(address, 'pending')`가 nonce를 설정하는 데 사용됩니다.                                                                                                   |
| gasPrice           | String | (선택 사항) 발신자가 토큰으로 지불할 금액을 구하기 위한 승수입니다. 생략하면 `caver.rpc.klay.getGasPrice`가 가스 가격을 설정하는 데 사용됩니다.                                                                                                                                 |
| chainId            | String | (선택 사항) 클레이튼 네트워크의 체인 아이디입니다. 생략하면 `caver.rpc.klay.getChainId`가 체인아이디를 설정하는 데 사용됩니다.                                                                                                                                            |

**예시**

```javascript
// Create a feeDelegatedSmartContractExecutionWithRatio
> caver.transaction.feeDelegatedSmartContractExecutionWithRatio({
    from: '0x{address in hex}',
    to: '0x{address in hex}',
    input: '0xa9059...',
    gas: 90000,
    feeRatio: 30,
})

// Create a feeDelegatedSmartContractExecutionWithRatio from RLP-encoded string
> caver.transaction.feeDelegatedSmartContractExecutionWithRatio('0x32f8fc8204d219830f4240947b65b75d204abed71587c9e519a89277766ee1d00a94a94f5374fce5edbc8e2a8697c15331677e6ebf0ba46353586b000000000000000000000000bc5951f055a85f41a3b62fd6f68ab7de76d299b21ef845f84326a074ccfee18dc28932396b85617c53784ee366303bce39a2401d8eb602cf73766fa04c937a5ab9401d2cacb3f39ba8c29dbcd44588cc5c7d0b6b4113cfa7b7d9427b945a0043070275d9f6054307ee7348bd660849d90ff845f84325a04a4997524694d535976d7343c1e3a260f99ba53fcb5477e2b96216ec96ebb565a00f8cb31a35399d2b0fbbfa39f259c819a15370706c0449952c7cfc682d200d7c')
FeeDelegatedSmartContractExecutionWithRatio {
    _type: 'TxTypeFeeDelegatedSmartContractExecutionWithRatio',
    _from: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
    _gas: '0xf4240',
    _nonce: '0x4d2',
    _gasPrice: '0x19',
    _signatures: [ SignatureData { _v: '0x26', _r: '0x74ccf...', _s: '0x4c937...' } ],
    _feePayer: '0x5a0043070275d9f6054307ee7348bd660849d90f',
    _feePayerSignatures: [ SignatureData { _v: '0x25', _r: '0x4a499...', _s: '0x0f8cb...' } ],
    _feeRatio: '0x1e',
    _to: '0x7b65b75d204abed71587c9e519a89277766ee1d0',
    _value: '0xa',
    _input: '0x6353586b000000000000000000000000bc5951f055a85f41a3b62fd6f68ab7de76d299b2'
}
```

## FeeDelegatedCancelWithRatio <a id="feedelegatedcancelwithratio"></a>

```javascript
caver.transaction.feeDelegatedCancelWithRatio.create(transactionObject)
```

`FeeDelegatedCancelWithRatio`은 [수수료 위임 취소 비율 트랜잭션](../caver.abi.md#encodefunctioncall)을 나타냅니다. `transactionObject`는 아래 프로퍼티를 가지고 `FeeDelegatedCancelWithRatio` 트랜잭션을 생성할 수 있습니다.

`FeeDelegatedCancelWithRatio`은 아래와 같은 프로퍼티를 멤버 변수로 가지고 있습니다. `optional`로 표시된 프로퍼티는 사용자가 `FeeDelegatedCancelWithRatio` 트랜잭션을 생성할 때 `transactionObject`에서 선택적으로 정의할 수 있는 프로퍼티를 나타냅니다.

:::note

참고: RLP 인코딩된 문자열에서 `FeeDelegatedCancelWithRatio`의 인스턴스를 생성할 수 있습니다. 아래 예시를 참고하시기 바랍니다.
참고: `caver.transaction.feeDelegatedCancelWithRatio.create`는 caver-js [v1.6.1](../../../../../learn/transactions/partial-fee-delegation.md#txtypefeedelegatedsmartcontractexecutionwithratio) 부터 지원됩니다.

참고: caver-js [v1.8.1-rc.4](../../../../../learn/transactions/partial-fee-delegation.md#txtypefeedelegatedcancelwithratio)부터 트랜잭션 생성은 `create` 함수를 통해서만 지원됩니다. 기존에 `new caver.transaction.feeDelegatedCancelWithRatio({...})`와 같은 생성자를 사용하여 트랜잭션을 생성했다면, `caver.transaction.feeDelegatedCancelWithRatio.create({...})`로 변경해주시기 바랍니다.

:::

**속성**

| 이름                 | 유형     | 설명                                                                                                                                               |
| ------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| from               | String | 발신자의 주소입니다.                                                                                                                                      |
| gas                | String | 트랜잭션이 사용할 수 있는 최대 트랜잭션 수수료 금액입니다.                                                                                                                |
| feeRatio           | String | 수수료 지불자가 부담하게 될 트랜잭션 수수료의 비율을 구성하는 비율입니다. 이 비율의 유효한 범위는 1에서 99 사이입니다. 0 또는 100 이상의 비율은 허용되지 않습니다.                                                |
| nonce              | String | (선택 사항) 발신자의 트랜잭션을 고유하게 식별하는 데 사용되는 값입니다. 생략하면 `caver.rpc.klay.getTransactionCount(address, 'pending')`가 nonce를 설정하는 데 사용됩니다. |
| signatures         | Array  | (선택 사항) 서명의 배열입니다.                                                                                                            |
| feePayerSignatures | Array  | (선택 사항) 수수료 지불자 서명의 배열입니다.                                                                                                    |
| feePayer           | String | (선택 사항) 수수료 납부자의 주소입니다.                                                                                                       |
| gasPrice           | String | (선택 사항) 발신자가 토큰으로 지불할 금액을 얻기 위한 승수입니다. 생략하면 `caver.rpc.klay.getGasPrice`가 가스 가격을 설정하는 데 사용됩니다.                                |
| chainId            | String | (선택 사항) 클레이튼 네트워크의 체인 아이디입니다. 생략하면 `caver.rpc.klay.getChainId`가 체인아이디를 설정하는 데 사용됩니다.                                          |

**예시**

```javascript
// Create a feeDelegatedCancelWithRatio
> caver.transaction.feeDelegatedCancelWithRatio({
    from: '0x{address in hex}',
    nonce: 1,
    gas: 25000,
    feeRatio: 30,
})

// Create a feeDelegatedCancelWithRatio from RLP-encoded string
> caver.transaction.feeDelegatedCancelWithRatio('0x3af8c18204d219830f424094a94f5374fce5edbc8e2a8697c15331677e6ebf0b1ef845f84326a072efa47960bef40b536c72d7e03ceaf6ca5f6061eb8a3eda3545b1a78fe52ef5a062006ddaf874da205f08b3789e2d014ae37794890fc2e575bf75201563a24ba9945a0043070275d9f6054307ee7348bd660849d90ff845f84326a06ba5ef20c3049323fc94defe14ca162e28b86aa64f7cf497ac8a5520e9615614a04a0a0fc61c10b416759af0ce4ce5c09ca1060141d56d958af77050c9564df6bf')
FeeDelegatedCancelWithRatio {
    _type: 'TxTypeFeeDelegatedCancelWithRatio',
    _from: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
    _gas: '0xf4240',
    _nonce: '0x4d2',
    _gasPrice: '0x19',
    _signatures: [ SignatureData { _v: '0x26', _r: '0x72efa...', _s: '0x62006...' } ],
    _feePayer: '0x5a0043070275d9f6054307ee7348bd660849d90f',
    _feePayerSignatures: [ SignatureData { _v: '0x26', _r: '0x6ba5e...', _s: '0x4a0a0...' } ],
    _feeRatio: '0x1e'
}
```

## FeeDelegatedChainDataAnchoringWithRatio <a id="feedelegatedchaindataanchoringwithratio"></a>

```javascript
caver.transaction.feeDelegatedChainDataAnchoringWithRatio.create(transactionObject)
```

`FeeDelegatedChainDataAnchoringWithRatio`는 [수수료 위임 체인 데이터 앵커링 비율 트랜잭션](https://www.npmjs.com/package/caver-js/v/1.6.1)을 나타냅니다. `transactionObject`는 아래 프로퍼티를 가지고 `FeeDelegatedChainDataAnchoringWithRatio` 트랜잭션을 생성할 수 있습니다.

`FeeDelegatedChainDataAnchoringWithRatio`은 아래와 같은 프로퍼티를 멤버 변수로 가지고 있습니다. `optional`로 표시된 프로퍼티는 사용자가 `FeeDelegatedChainDataAnchoringWithRatio` 트랜잭션을 생성할 때 `transactionObject`에서 선택적으로 정의할 수 있는 프로퍼티를 나타냅니다.

:::note

참고: RLP 인코딩된 문자열에서 `FeeDelegatedChainDataAnchoringWithRatio`의 인스턴스를 생성할 수 있습니다. 아래 예시를 참고하시기 바랍니다.
참고: `caver.transaction.feeDelegatedChainDataAnchoringWithRatio.create`는 caver-js [v1.6.1](../../../../../learn/transactions/partial-fee-delegation.md#txtypefeedelegatedsmartcontractexecutionwithratio) 부터 지원됩니다.

참고: caver-js [v1.8.1-rc.4](../../../../../learn/transactions/partial-fee-delegation.md#txtypefeedelegatedcancelwithratio)부터 트랜잭션 생성은 'create' 함수를 통해서만 지원됩니다. 기존에 `new caver.transaction.feeDelegatedChainDataAnchoringWithRatio({...})`와 같은 생성자를 사용하여 트랜잭션을 생성했다면, `caver.transaction.feeDelegatedChainDataAnchoringWithRatio.create({...})`로 변경해 주시기 바랍니다.

:::

**속성**

| 이름                 | 유형     | 설명                                                                                                                                               |
| ------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| from               | String | 발신자의 주소입니다.                                                                                                                                      |
| input              | String | 서비스 체인의 데이터입니다.                                                                                                                                  |
| gas                | String | 트랜잭션이 사용할 수 있는 최대 트랜잭션 수수료 금액입니다.                                                                                                                |
| feeRatio           | String | 수수료 납부자가 부담하게 될 트랜잭션 수수료의 비율을 구성하는 비율입니다. 이 비율의 유효한 범위는 1에서 99 사이입니다. 0 또는 100 이상의 비율은 허용되지 않습니다.                                                |
| nonce              | String | (선택 사항) 발신자의 트랜잭션을 고유하게 식별하는 데 사용되는 값입니다. 생략하면 `caver.rpc.klay.getTransactionCount(address, 'pending')`가 nonce를 설정하는 데 사용됩니다. |
| signatures         | Array  | (선택 사항) 서명의 배열입니다.                                                                                                            |
| feePayerSignatures | Array  | (선택 사항) 수수료 납부자 서명의 배열입니다.                                                                                                    |
| feePayer           | String | (선택 사항) 수수료 납부자의 주소입니다.                                                                                                       |
| gasPrice           | String | (선택 사항) 발신자가 토큰으로 지불할 금액을 구하기 위한 승수입니다. 생략하면 `caver.rpc.klay.getGasPrice`가 가스 가격을 설정하는 데 사용됩니다.                               |
| chainId            | String | (선택 사항) 클레이튼 네트워크의 체인 아이디입니다. 생략하면 `caver.rpc.klay.getChainId`가 체인아이디를 설정하는 데 사용됩니다.                                          |

**예시**

```javascript
// Create a feeDelegatedChainDataAnchoringWithRatio
> caver.transaction.feeDelegatedChainDataAnchoringWithRatio({
    from: '0x{address in hex}',
    gas: 50000,
    input: '0xf8a6a...',
    feeRatio: 30,
})

// Create a feeDelegatedChainDataAnchoringWithRatio from RLP-encoded string
> caver.transaction.feeDelegatedChainDataAnchoringWithRatio('0x4af90177128505d21dba0085174876e80094a94f5374fce5edbc8e2a8697c15331677e6ebf0bb8aff8ad80b8aaf8a8a00000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000001a00000000000000000000000000000000000000000000000000000000000000002a00000000000000000000000000000000000000000000000000000000000000003a0000000000000000000000000000000000000000000000000000000000000000405800658f845f84326a0c612a243bcb3b98958e9cce1a0bc0e170291b33a7f0dbfae4b36dafb5806797da00c734423492ecc21cc53238147c359676fcec43fcc2a0e021d87bb1da49f0abf9433f524631e573329a550296f595c820d6c65213ff845f84325a0a3e40598b67e2bcbaa48fdd258b9d1dcfcc9cc134972560ba042430078a769a5a06707ea362e588e4e5869cffcd5a058749d823aeff13eb95dc1146faff561df32')
FeeDelegatedChainDataAnchoringWithRatio {
    _type: 'TxTypeFeeDelegatedChainDataAnchoringWithRatio',
    _from: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
    _gas: '0x174876e800',
    _nonce: '0x12',
    _gasPrice: '0x5d21dba00',
    _signatures: [ SignatureData { _v: '0x26', _r: '0xc612a...', _s: '0x0c734...' } ],
    _feePayer: '0x33f524631e573329a550296f595c820d6c65213f',
    _feePayerSignatures: [ SignatureData { _v: '0x25', _r: '0xa3e40...', _s: '0x6707e...' } ],
    _feeRatio: '0x58',
    _input: '0xf8ad8...'
}
```
