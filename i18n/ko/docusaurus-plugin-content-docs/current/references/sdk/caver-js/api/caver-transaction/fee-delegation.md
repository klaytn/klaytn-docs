---
sidebar_label: 수수료 위임
---

# 수수료 위임 유형 트랜잭션 클래스

## FeeDelegatedValueTransfer <a id="feedelegatedvaluetransfer"></a>

```javascript
caver.transaction.feeDelegatedValueTransfer.create(transactionObject)
```

[수수료 위임 밸류 전송 트랜잭션](../../../../../learn/transactions/fee-delegation.md#txtypefeedelegatedvaluetransfer)은 `FeeDelegatedValueTransfer`를 나타냅니다. `transactionObject`는 아래 프로퍼티를 가지고 `FeeDelegatedValueTransfer` 트랜잭션을 생성할 수 있습니다.

`FeeDelegatedValueTransfer`는 아래와 같은 프로퍼티를 멤버 변수로 가집니다. `optional`로 표시된 프로퍼티는 사용자가 `FeeDelegatedValueTransfer` 트랜잭션을 생성할 때 `transactionObject`에서 선택적으로 정의할 수 있는 프로퍼티를 나타냅니다.

:::note

참고: RLP 인코딩된 문자열에서 `FeeDelegatedValueTransfer`의 인스턴스를 생성할 수 있습니다. 아래 예시를 참고하시기 바랍니다.
참고: `caver.transaction.feeDelegatedValueTransfer.create`는 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 부터 지원됩니다.

참고: caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4)부터 트랜잭션 생성은 `create` 함수를 통해서만 지원됩니다. 기존에 `new caver.transaction.feeDelegatedValueTransfer({...})`와 같은 생성자를 사용하여 트랜잭션을 생성했다면, `caver.transaction.feeDelegatedValueTransfer.create({...})`로 변경해주시기 바랍니다.

:::

**속성**

| 이름                 | 유형     | 설명                                                                                                                                                         |
| ------------------ | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value              | String | 전송할 peb의 KLAY 양입니다. `caver.utils.toPeb`을 사용할 수 있습니다.                                                                                                       |
| from               | String | 발신자의 주소입니다.                                                                                                                                                |
| to                 | String | 전송된 값을 받을 계정 주소입니다.                                                                                                                                        |
| gas                | String | 트랜잭션이 사용할 수 있는 최대 트랜잭션 수수료 금액입니다.                                                                                                                          |
| signatures         | Array  | (선택 사항) 서명의 배열입니다.                                                                                                                      |
| feePayerSignatures | Array  | (선택 사항) 수수료 지불자 서명의 배열입니다.                                                                                                              |
| feePayer           | String | (선택 사항) 수수료 납부자의 주소입니다.                                                                                                                 |
| nonce              | String | (선택 사항) 발신자의 트랜잭션을 고유하게 식별하는 데 사용되는 값입니다. 생략하면 `caver.rpc.klay.getTransactionCount(address, 'pending')`가 nonce를 설정하는 데 사용됩니다.           |
| gasPrice           | String | (선택 사항) 발신자가 토큰으로 지불할 금액을 구하기 위한 승수입니다. 생략하면 `caver.rpc.klay.getGasPrice`가 가스 가격을 설정하는 데 사용됩니다.                                         |
| chainId            | String | (선택 사항) 클레이튼 블록체인 플랫폼의 체인 아이디(이 문서의 나머지 부분에서는 "Klaytn"으로 약칭). 생략하면 `caver.rpc.klay.getChainId`가 체인아이디를 설정하는 데 사용됩니다. |

**예시**

```javascript
// Create a feeDelegatedValueTransfer
> caver.transaction.feeDelegatedValueTransfer.create({
    from: '0x{address in hex}',
    to: '0x9957dfd92e4b70f91131c573293343bc5f21f215',
    value: caver.utils.toPeb(1, `klay`),
    gas: 25000,
})

// Create a feeDelegatedValueTransfer from RLP-encoded string
> caver.transaction.feeDelegatedValueTransfer.create('0x09f8d68204d219830f4240947b65b75d204abed71587c9e519a89277766ee1d00a94a94f5374fce5edbc8e2a8697c15331677e6ebf0bf845f84325a09f8e49e2ad84b0732984398749956e807e4b526c786af3c5f7416b293e638956a06bf88342092f6ff9fabe31739b2ebfa1409707ce54a54693e91a6b9bb77df0e7945a0043070275d9f6054307ee7348bd660849d90ff845f84326a0f45cf8d7f88c08e6b6ec0b3b562f34ca94283e4689021987abb6b0772ddfd80aa0298fe2c5aeabb6a518f4cbb5ff39631a5d88be505d3923374f65fdcf63c2955b')
FeeDelegatedValueTransfer {
    _type: 'TxTypeFeeDelegatedValueTransfer',
    _from: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
    _gas: '0xf4240',
    _nonce: '0x4d2',
    _gasPrice: '0x19',
    _signatures: [ SignatureData { _v: '0x25', _r: '0x9f8e4...', _s: '0x6bf88...' } ],
    _feePayer: '0x5a0043070275d9f6054307ee7348bd660849d90f',
    _feePayerSignatures: [ SignatureData { _v: '0x26', _r: '0xf45cf...', _s: '0x298fe...' } ],
    _to: '0x7b65b75d204abed71587c9e519a89277766ee1d0',
    _value: '0xa'
}
```

## FeeDelegatedValueTransferMemo <a id="feedelegatedvaluetransfermemo"></a>

```javascript
caver.transaction.feeDelegatedValueTransferMemo.create(transactionObject)
```

`FeeDelegatedValueTransferMemo`는 [수수료 위임 밸류 전송 메모 트랜잭션](../../../../../learn/transactions/fee-delegation.md#txtypefeedelegatedvaluetransfermemo)을 나타냅니다. `transactionObject`는 아래 프로퍼티를 가지고 `FeeDelegatedValueTransferMemo` 트랜잭션을 생성할 수 있습니다.

`FeeDelegatedValueTransferMemo`는 아래와 같은 프로퍼티를 멤버 변수로 가지고 있습니다. `optional`로 표시된 프로퍼티는 사용자가 `FeeDelegatedValueTransferMemo` 트랜잭션을 생성할 때 `transactionObject`에서 선택적으로 정의할 수 있는 프로퍼티를 나타냅니다.

:::note

참고: RLP 인코딩된 문자열에서 `FeeDelegatedValueTransferMemo`의 인스턴스를 생성할 수 있습니다. 아래 예시를 참고하시기 바랍니다.
참고: `caver.transaction.feeDelegatedValueTransferMemo.create`는 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 부터 지원됩니다.

참고: caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4)부터 트랜잭션 생성은 `create` 함수를 통해서만 지원됩니다. 기존에 `new caver.transaction.feeDelegatedValueTransferMemo({...})`와 같은 생성자를 사용하여 트랜잭션을 생성했다면, `caver.transaction.feeDelegatedValueTransferMemo.create({...})`로 변경해 주시기 바랍니다.

:::

**속성**

| 이름                 | 유형     | 설명                                                                                                                                               |
| ------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| value              | String | 전송할 peb의 KLAY 양입니다. `caver.utils.toPeb`을 사용할 수 있습니다.                                                                                             |
| from               | String | 발신자의 주소입니다.                                                                                                                                      |
| to                 | String | 전송된 값을 받을 계정 주소입니다.                                                                                                                              |
| input              | String | 트랜잭션에 첨부된 데이터입니다. 메시지는 이 프로퍼티로 전달되어야 합니다.                                                                                                        |
| gas                | String | 트랜잭션이 사용할 수 있는 최대 트랜잭션 수수료 금액입니다.                                                                                                                |
| signatures         | Array  | (선택 사항) 서명의 배열입니다.                                                                                                            |
| feePayerSignatures | Array  | (선택 사항) 수수료 납부자 서명의 배열입니다.                                                                                                    |
| feePayer           | String | (선택 사항) 수수료 납부자의 주소입니다.                                                                                                       |
| nonce              | String | (선택 사항) 발신자의 트랜잭션을 고유하게 식별하는 데 사용되는 값입니다. 생략하면 `caver.rpc.klay.getTransactionCount(address, 'pending')`가 nonce를 설정하는 데 사용됩니다. |
| gasPrice           | String | (선택 사항) 발신자가 토큰으로 지불할 금액을 구하기 위한 승수입니다. 생략하면 `caver.rpc.klay.getGasPrice`가 가스 가격을 설정하는 데 사용됩니다.                               |
| chainId            | String | (선택 사항) 클레이튼의 체인 아이디입니다. 생략하면 `caver.rpc.klay.getChainId`가 체인아이디를 설정하는 데 사용됩니다.                                               |

**예시**

```javascript
// Create a feeDelegatedValueTransferMemo
> caver.transaction.feeDelegatedValueTransferMemo.create({
    from: '0x{address in hex}',
    to: '0x9957dfd92e4b70f91131c573293343bc5f21f215',
    value: caver.utils.toPeb(1, `klay`),
    gas: 25000,
    input: '0x68656c6c6f',
})

// Create a feeDelegatedValueTransferMemo from RLP-encoded string
> caver.transaction.feeDelegatedValueTransferMemo.create('0x11f8dc8204d219830f4240947b65b75d204abed71587c9e519a89277766ee1d00a94a94f5374fce5edbc8e2a8697c15331677e6ebf0b8568656c6c6ff845f84326a064e213aef0167fbd853f8f9989ef5d8b912a77457395ccf13d7f37009edd5c5ba05d0c2e55e4d8734fe2516ed56ac628b74c0eb02aa3b6eda51e1e25a1396093e1945a0043070275d9f6054307ee7348bd660849d90ff845f84326a087390ac14d3c34440b6ddb7b190d3ebde1a07d9a556e5a82ce7e501f24a060f9a037badbcb12cda1ed67b12b1831683a08a3adadee2ea760a07a46bdbb856fea44')
FeeDelegatedValueTransferMemo {
    _type: 'TxTypeFeeDelegatedValueTransferMemo',
    _from: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
    _gas: '0xf4240',
    _nonce: '0x4d2',
    _gasPrice: '0x19',
    _signatures: [ SignatureData { _v: '0x26', _r: '0x64e21...', _s: '0x5d0c2...' } ],
    _feePayer: '0x5a0043070275d9f6054307ee7348bd660849d90f',
    _feePayerSignatures: [ SignatureData { _v: '0x26', _r: '0x87390...', _s: '0x37bad...' } ],
    _to: '0x7b65b75d204abed71587c9e519a89277766ee1d0',
    _value: '0xa',
    _input: '0x68656c6c6f'
}
```

## FeeDelegatedAccountUpdate <a id="feedelegatedaccountupdate"></a>

```javascript
caver.transaction.feeDelegatedAccountUpdate.create(transactionObject)
```

[수수료 위임 계정 업데이트 트랜잭션](../../../../../learn/transactions/fee-delegation.md#txtypefeedelegatedaccountupdate)은 `FeeDelegatedAccountUpdate`를 나타냅니다. `transactionObject`는 아래 속성을 가지고 `FeeDelegatedAccountUpdate` 트랜잭션을 생성할 수 있습니다.

`FeeDelegatedAccountUpdate`에는 아래와 같은 프로퍼티가 멤버 변수로 있습니다. `optional`로 표시된 프로퍼티는 사용자가 `FeeDelegatedAccountUpdate` 트랜잭션을 생성할 때 `transactionObject`에서 선택적으로 정의할 수 있는 프로퍼티를 나타냅니다.

:::note

참고: RLP 인코딩된 문자열에서 `FeeDelegatedAccountUpdate` 인스턴스를 생성할 수 있습니다. 아래 예시를 참고하시기 바랍니다.
참고: `caver.transaction.feeDelegatedAccountUpdate.create`는 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 부터 지원됩니다.

참고: caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4)부터 트랜잭션 생성은 `create` 함수를 통해서만 지원됩니다. 기존에 `new caver.transaction.feeDelegatedAccountUpdate({...})`와 같은 생성자를 사용하여 트랜잭션을 생성했다면, `caver.transaction.feeDelegatedAccountUpdate.create({...})`로 변경해 주시기 바랍니다.

:::

**속성**

| 이름                 | 유형                                                            | 설명                                                                                                                                               |
| ------------------ | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| from               | String                                                        | 발신자의 주소입니다.                                                                                                                                      |
| account            | [Account] | 계정을 업데이트하는 데 필요한 정보가 포함된 [Account] 인스턴스입니다.                                                  |
| gas                | String                                                        | 트랜잭션이 사용할 수 있는 최대 트랜잭션 수수료 금액입니다.                                                                                                                |
| signatures         | Array                                                         | (선택 사항) 서명의 배열입니다.                                                                                                            |
| feePayerSignatures | Array                                                         | (선택 사항) 수수료 지불자 서명의 배열입니다.                                                                                                    |
| feePayer           | String                                                        | (선택 사항) 수수료 납부자의 주소입니다.                                                                                                       |
| nonce              | String                                                        | (선택 사항) 발신자의 트랜잭션을 고유하게 식별하는 데 사용되는 값입니다. 생략하면 `caver.rpc.klay.getTransactionCount(address, 'pending')`가 nonce를 설정하는 데 사용됩니다. |
| gasPrice           | String                                                        | (선택 사항) 발신자가 토큰으로 지불할 금액을 얻기 위한 승수입니다. 생략하면 `caver.rpc.klay.getGasPrice`가 가스 가격을 설정하는 데 사용됩니다.                                |
| chainId            | String                                                        | (선택 사항) 클레이튼의 체인 아이디입니다. 생략하면 `caver.rpc.klay.getChainId`가 체인아이디를 설정하는 데 사용됩니다.                                               |

`AccountKey` 유형별로 [Account] 인스턴스를 생성하는 방법은 [시작하기 - 계정 업데이트](../../get-started.md#account-update) 또는 [caver.account.create](../caver.account.md#caver-account-create)를 참조하시기 바랍니다.

**예시**

```javascript
// Create a feeDelegatedAccountUpdate
> caver.transaction.feeDelegatedAccountUpdate.create({
    from: '0x{address in hex}',
    gas: 50000,
    account: caver.account.createWithAccountKeyLegacy('0x{address in hex}'),
})

// Create a feeDelegatedAccountUpdate from RLP-encoded string
> caver.transaction.feeDelegatedAccountUpdate.create('0x21f8ea018505d21dba00830493e094ac1aec09ef5f8dde6a0baf709ea388bbd7965f72a302a103d032771e5d927fb568cdf7605496b700277d7b9bcabe7657f45602348964e396f846f844820fe99f0e1a3542288951226c66e6e8de320ddef4e0c0d6650baec828998a7ce411fea052d0766f3b84f35787d2a810f97057d215dcbe070cd890b7ccb8aaa3aac8eacc9423bf3d4eb274621e56ce65f6fa05da9e24785bb8f847f845820feaa0faca4cf91418c6fea61e9439620b656c7b0717b058fd8787865f4564a0f9974ea03a483582435426e7b2aeffe3131a678ae54c7aa948fa5442b5ded209ba373221')
FeeDelegatedAccountUpdate {
    _type: 'TxTypeFeeDelegatedAccountUpdate',
    _from: '0xac1aec09ef5f8dde6a0baf709ea388bbd7965f72',
    _gas: '0x493e0',
    _nonce: '0x1',
    _gasPrice: '0x5d21dba00',
    _signatures: [ SignatureData { _v: '0x0fe9', _r: '0x0e1a3...', _s: '0x52d07...' } ],
    _feePayer: '0x23bf3d4eb274621e56ce65f6fa05da9e24785bb8',
    _feePayerSignatures: [ SignatureData { _v: '0x0fea', _r: '0xfaca4...', _s: '0x3a483...' } ],
    _account: Account {
        _address: '0xac1aec09ef5f8dde6a0baf709ea388bbd7965f72',
        _accountKey: AccountKeyPublic { _publicKey: '0x03d03...' }
    }
}
```

## FeeDelegatedSmartContractDeploy <a id="feedelegatedsmartcontractdeploy"></a>

```javascript
caver.transaction.feeDelegatedSmartContractDeploy.create(transactionObject)
```

[수수료 위임 스마트 컨트랙트 배포 트랜잭션](../../../../../learn/transactions/fee-delegation.md#txtypefeedelegatedsmartcontractdeploy)을 나타내는 `FeeDelegatedSmartContractDeploy`입니다. `transactionObject`는 아래 프로퍼티를 가지고 `FeeDelegatedSmartContractDeploy` 트랜잭션을 생성할 수 있습니다.

`FeeDelegatedSmartContractDeploy`는 아래와 같은 프로퍼티를 멤버 변수로 가지고 있습니다. `optional`로 표시된 프로퍼티는 사용자가 `FeeDelegatedSmartContractDeploy` 트랜잭션을 생성할 때 `transactionObject`에서 선택적으로 정의할 수 있는 프로퍼티를 나타냅니다.

:::note

참고: RLP 인코딩된 문자열에서 `FeeDelegatedSmartContractDeploy` 인스턴스를 생성할 수 있습니다. 아래 예시를 참고하시기 바랍니다.
참고: `caver.transaction.feeDelegatedSmartContractDeploy.create`는 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 부터 지원됩니다.

참고: caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4)부터 트랜잭션 생성은 `create` 함수를 통해서만 지원됩니다. 기존에 `new caver.transaction.feeDelegatedSmartContractDeploy({...})`와 같은 생성자를 사용하여 트랜잭션을 생성했다면, `caver.transaction.feeDelegatedSmartContractDeploy.create({...})`로 변경해 주시기 바랍니다.

:::

**속성**

| 이름                 | 유형      | 설명                                                                                                                                                                                       |
| ------------------ | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from               | String  | 발신자의 주소입니다.                                                                                                                                                                              |
| input              | String  | 트랜잭션에 첨부된 데이터입니다. 배포할 스마트 컨트랙트의 바이트 코드와 그 인수입니다. caver.abi.encodeContractDeploy](../caver.abi.md#encodecontractdeploy)를 통해 이 정보를 얻을 수 있습니다. |
| gas                | String  | 트랜잭션이 사용할 수 있는 최대 트랜잭션 수수료 금액입니다.                                                                                                                                                        |
| value              | String  | (선택 사항, 기본값: `'0x0'`) 전송할 peb 단위의 KLAY 금액입니다. `caver.utils.toPeb`을 사용할 수 있습니다.                                                                                        |
| to                 | String  | (선택 사항, 기본값: `'0x'`) 스마트 컨트랙트가 배포될 주소입니다. 현재 이 값은 정의할 수 없습니다. 주소 지정은 향후 지원될 예정입니다.                                                                                    |
| humanReadable      | Boolean | (선택 사항, 기본값: `false`) 사람이 읽을 수 있는 주소는 아직 지원되지 않으므로 이 값은 false이어야 합니다.                                                                                                 |
| codeFormat         | String  | (선택 사항, 기본값: `'EVM'`) 스마트 컨트랙트 코드의 코드 형식입니다. 현재 지원되는 값은 EVM만 있습니다. 이 값은 내부적으로 할당 후 16진수 문자열로 변환됩니다(예: `EVM`은 `0x0`으로 변환됨).                         |
| signatures         | Array   | (선택 사항) 서명의 배열입니다.                                                                                                                                                    |
| feePayerSignatures | Array   | (선택 사항) 수수료 지불자 서명의 배열입니다.                                                                                                                                            |
| feePayer           | String  | (선택 사항) 수수료 납부자의 주소입니다.                                                                                                                                               |
| nonce              | String  | (선택 사항) 발신자의 트랜잭션을 고유하게 식별하는 데 사용되는 값입니다. 생략하면 `caver.rpc.klay.getTransactionCount(address, 'pending')`가 nonce를 설정하는 데 사용됩니다.                                         |
| gasPrice           | String  | (선택 사항) 발신자가 토큰으로 지불할 금액을 구하기 위한 승수입니다. 생략하면 `caver.rpc.klay.getGasPrice`가 가스 가격을 설정하는 데 사용됩니다.                                                                       |
| chainId            | String  | (선택 사항) 클레이튼의 체인 아이디입니다. 생략하면 `caver.rpc.klay.getChainId`가 체인아이디를 설정하는 데 사용됩니다.                                                                                       |

**예시**

```javascript
// Create a feeDelegatedSmartContractDeploy
> caver.transaction.feeDelegatedSmartContractDeploy.create({
    from: '0x{address in hex}',
    input: '0x60806...',
    gas: 100000,
})

// Create a feeDelegatedSmartContractDeploy from RLP-encoded string
> caver.transaction.feeDelegatedSmartContractDeploy.create('0x29f902cc808505d21dba00830dbba08080948061145252c8f2b4f110aed096435ae6ed7d5a95b901fe608060405234801561001057600080fd5b506101de806100206000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a72305820627ca46bb09478a015762806cc00c431230501118c7c26c30ac58c4e09e51c4f00298080f847f845820fe9a07abfd0f0cfb9a9c38c6e3e1a4eeb15f43aeb4b4f6dee7c3f37c07e417af89d9ba03f1e54a512c906d2e57a611b25ce4739d12928e199c3e89792b82f577f0da9ad942c8eb96e7060ab864d94e91ab16f214dc6647628f847f845820fe9a0192e3b6457f13c6ef557bd11074702d5062dd463473c483278c57f651d5b712ba03ff8638b7cc7ed86c793cb5ffe0e8a064fc94946c3aab624bb7704c62e81ec2d')
FeeDelegatedSmartContractDeploy {
    _type: 'TxTypeFeeDelegatedSmartContractDeploy',
    _from: '0x8061145252c8f2b4f110aed096435ae6ed7d5a95',
    _gas: '0xdbba0',
    _nonce: '0x0',
    _gasPrice: '0x5d21dba00',
    _signatures: [ SignatureData { _v: '0x0fe9', _r: '0x7abfd...', _s: '0x3f1e5...' } ],
    _feePayer: '0x2c8eb96e7060ab864d94e91ab16f214dc6647628',
    _feePayerSignatures: [ SignatureData { _v: '0x0fe9', _r: '0x192e3...', _s: '0x3ff86...' } ],
    _to: '0x',
    _value: '0x0',
    _input: '0x60806...',
    _humanReadable: false,
    _codeFormat: '0x0'
}
```

## FeeDelegatedSmartContractExecution <a id="feedelegatedsmartcontractexecution"></a>

```javascript
caver.transaction.feeDelegatedSmartContractExecution.create(transactionObject)
```

[수수료 위임 스마트 컨트랙트 실행 트랜잭션](../../../../../learn/transactions/fee-delegation.md#txtypefeedelegatedsmartcontractexecution)을 나타냅니다. `transactionObject`는 아래 프로퍼티를 가지고 `수수료 위임 `SmartContractExecution\` 트랜잭션을 생성할 수 있습니다.

`FeeDelegatedSmartContractExecution`은 아래와 같은 프로퍼티를 멤버 변수로 가지고 있습니다. `optional`로 표시된 프로퍼티는 사용자가 `FeeDelegatedSmartContractExecution` 트랜잭션을 생성할 때 `transactionObject`에서 선택적으로 정의할 수 있는 프로퍼티를 나타냅니다.

:::note

참고: RLP 인코딩된 문자열에서 `FeeDelegatedSmartContractExecution` 인스턴스를 생성할 수 있습니다. 아래 예시를 참고하시기 바랍니다.
참고: `caver.transaction.feeDelegatedSmartContractExecution.create`는 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 부터 지원됩니다.

참고: caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4)부터 트랜잭션 생성은 `create` 함수를 통해서만 지원됩니다. 기존에 `new caver.transaction.feeDelegatedSmartContractExecution({...})`와 같은 생성자를 사용하여 트랜잭션을 생성했다면, `caver.transaction.feeDelegatedSmartContractExecution.create({...})`로 변경해 주시기 바랍니다.

:::

**속성**

| 이름                 | 유형     | 설명                                                                                                                                                                          |
| ------------------ | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from               | String | 발신자의 주소입니다.                                                                                                                                                                 |
| to                 | String | 실행할 스마트 컨트랙트 계정의 주소입니다.                                                                                                                                                     |
| input              | String | 트랜잭션 실행에 사용되는 트랜잭션에 첨부된 데이터입니다. 입력은 호출할 함수와 이 함수에 전달할 매개변수를 나타내는 인코딩된 문자열입니다. 이 인코딩된 문자열은 [caver.abi.encodeFunctionCall](../caver.abi.md#encodefunctioncall)을 통해 얻을 수 있습니다. |
| gas                | String | 트랜잭션이 사용할 수 있는 최대 트랜잭션 수수료 금액입니다.                                                                                                                                           |
| value              | String | (선택 사항, 기본값: `'0x0'`) 전송할 peb 단위의 KLAY 양입니다. `caver.utils.toPeb`을 사용할 수 있습니다.                                                                            |
| signatures         | Array  | (선택 사항) 서명의 배열입니다.                                                                                                                                       |
| feePayerSignatures | Array  | (선택 사항) 수수료 지불자 서명의 배열입니다.                                                                                                                               |
| feePayer           | String | (선택 사항) 수수료 납부자의 주소입니다.                                                                                                                                  |
| nonce              | String | (선택 사항) 발신자의 트랜잭션을 고유하게 식별하는 데 사용되는 값입니다. 생략하면 `caver.rpc.klay.getTransactionCount(address, 'pending')`가 nonce를 설정하는 데 사용됩니다.                            |
| gasPrice           | String | (선택 사항) 발신자가 토큰으로 지불할 금액을 얻기 위한 승수입니다. 생략하면 `caver.rpc.klay.getGasPrice`가 가스 가격을 설정하는 데 사용됩니다.                                                           |
| chainId            | String | (선택 사항) 클레이튼의 체인 아이디입니다. 생략하면 `caver.rpc.klay.getChainId`가 체인아이디를 설정하는 데 사용됩니다.                                                                          |

**예시**

```javascript
// Create a feeDelegatedSmartContractExecution
> caver.transaction.feeDelegatedSmartContractExecution.create({
    from: '0x{address in hex}',
    to: '0x{address in hex}',
    input: '0xa9059...',
    gas: 90000,
})

// Create a feeDelegatedSmartContractExecution from RLP-encoded string
> caver.transaction.feeDelegatedSmartContractExecution.create('0x31f8fb8204d219830f4240947b65b75d204abed71587c9e519a89277766ee1d00a94a94f5374fce5edbc8e2a8697c15331677e6ebf0ba46353586b000000000000000000000000bc5951f055a85f41a3b62fd6f68ab7de76d299b2f845f84325a0253aea7d2c37160da45e84afbb45f6b3341cf1e8fc2df4ecc78f14adb512dc4fa022465b74015c2a8f8501186bb5e200e6ce44be52e9374615a7e7e21c41bc27b5945a0043070275d9f6054307ee7348bd660849d90ff845f84326a0e7c51db7b922c6fa2a941c9687884c593b1b13076bdf0c473538d826bf7b9d1aa05b0de2aabb84b66db8bf52d62f3d3b71b592e3748455630f1504c20073624d80')
FeeDelegatedSmartContractExecution {
    _type: 'TxTypeFeeDelegatedSmartContractExecution',
    _from: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
    _gas: '0xf4240',
    _nonce: '0x4d2',
    _gasPrice: '0x19',
    _signatures: [ SignatureData { _v: '0x25', _r: '0x253ae...', _s: '0x22465b...' } ],
    _feePayer: '0x5a0043070275d9f6054307ee7348bd660849d90f',
    _feePayerSignatures:  SignatureData { _v: '0x26', _r: '0xe7c51...', _s: '0x5b0de...' } ],
    _to: '0x7b65b75d204abed71587c9e519a89277766ee1d0',
    _value: '0xa',
    _input: '0x6353586b000000000000000000000000bc5951f055a85f41a3b62fd6f68ab7de76d299b2'
}
```

## FeeDelegatedCancel <a id="feedelegatedcancel"></a>

```javascript
caver.transaction.feeDelegatedCancel.create(transactionObject)
```

[수수료 위임 취소 트랜잭션](../../../../../learn/transactions/fee-delegation.md#txtypefeedelegatedcancel)은 `FeeDelegatedCancel`을 나타냅니다. `transactionObject`는 아래 속성을 가지고 `FeeDelegatedCancel` 트랜잭션을 생성할 수 있습니다.

`FeeDelegatedCancel`은 아래와 같은 프로퍼티를 멤버 변수로 가지고 있습니다. `optional`로 표시된 프로퍼티는 사용자가 `FeeDelegatedCancel` 트랜잭션을 생성할 때 `transactionObject`에서 선택적으로 정의할 수 있는 프로퍼티를 나타냅니다.

:::note

참고: RLP 인코딩된 문자열에서 `FeeDelegatedCancel` 인스턴스를 생성할 수 있습니다. 아래 예시를 참고하시기 바랍니다.
참고: `caver.transaction.feeDelegatedCancel.create`는 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 부터 지원됩니다.

참고: caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4)부터 트랜잭션 생성은 `create` 함수를 통해서만 지원됩니다. 기존에 `new caver.transaction.feeDelegatedCancel({...})`와 같은 생성자를 사용하여 트랜잭션을 생성했다면, `caver.transaction.feeDelegatedCancel.create({...})`로 변경해주시기 바랍니다.

:::

**속성**

| 이름                 | 유형     | 설명                                                                                                                                               |
| ------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| from               | String | 발신자의 주소입니다.                                                                                                                                      |
| gas                | String | 트랜잭션이 사용할 수 있는 최대 트랜잭션 수수료 금액입니다.                                                                                                                |
| nonce              | String | (선택 사항) 발신자의 트랜잭션을 고유하게 식별하는 데 사용되는 값입니다. 생략하면 `caver.rpc.klay.getTransactionCount(address, 'pending')`가 nonce를 설정하는 데 사용됩니다. |
| signatures         | Array  | (선택 사항) 서명의 배열입니다.                                                                                                            |
| feePayerSignatures | Array  | (선택 사항) 수수료 지불자 서명의 배열입니다.                                                                                                    |
| feePayer           | String | (선택 사항) 수수료 납부자의 주소입니다.                                                                                                       |
| gasPrice           | String | (선택 사항) 발신자가 토큰으로 지불할 금액을 구하기 위한 승수입니다. 생략하면 `caver.rpc.klay.getGasPrice`가 가스 가격을 설정하는 데 사용됩니다.                               |
| chainId            | String | (선택 사항) 클레이튼의 체인 아이디입니다. 생략하면 `caver.rpc.klay.getChainId`가 체인아이디를 설정하는 데 사용됩니다.                                               |

**예시**

```javascript
// Create a feeDelegatedCancel
> caver.transaction.feeDelegatedCancel.create({
    from: '0x{address in hex}',
    nonce: 1,
    gas: 25000,
})

// Create a feeDelegatedCancel from RLP-encoded string
> caver.transaction.feeDelegatedCancel.create('0x39f8c08204d219830f424094a94f5374fce5edbc8e2a8697c15331677e6ebf0bf845f84326a08409f5441d4725f90905ad87f03793857d124de7a43169bc67320cd2f020efa9a060af63e87bdc565d7f7de906916b2334336ee7b24d9a71c9521a67df02e7ec92945a0043070275d9f6054307ee7348bd660849d90ff845f84326a0044d5b25e8c649a1fdaa409dc3817be390ad90a17c25bc17c89b6d5d248495e0a073938e690d27b5267c73108352cf12d01de7fd0077b388e94721aa1fa32f85ec')
FeeDelegatedCancel {
    _type: 'TxTypeFeeDelegatedCancel',
    _from: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
    _gas: '0xf4240',
    _nonce: '0x4d2',
    _gasPrice: '0x19',
    _signatures: [ SignatureData { _v: '0x26', _r: '0x8409f...', _s: '0x60af6...' } ],
    _feePayer: '0x5a0043070275d9f6054307ee7348bd660849d90f',
    _feePayerSignatures: [ SignatureData { _v: '0x26', _r: '0x044d5...', _s: '0x73938...' } ]
}
```

## FeeDelegatedChainDataAnchoring <a id="feedelegatedchaindataanchoring"></a>

```javascript
caver.transaction.feeDelegatedChainDataAnchoring.create(transactionObject)
```

[수수료 위임 체인 데이터 앵커링 트랜잭션](../../../../../learn/transactions/fee-delegation.md#txtypefeedelegatedchaindataanchoring)을 나타내는 `FeeDelegatedChainDataAnchoring`입니다. `transactionObject`는 아래 프로퍼티를 가지고 `FeeDelegatedChainDataAnchoring` 트랜잭션을 생성할 수 있습니다.

`FeeDelegatedChainDataAnchoring`은 아래와 같은 프로퍼티를 멤버 변수로 가지고 있습니다. `optional`로 표시된 프로퍼티는 사용자가 `FeeDelegatedChainDataAnchoring` 트랜잭션을 생성할 때 `transactionObject`에서 선택적으로 정의할 수 있는 프로퍼티를 나타냅니다.

:::note

참고: RLP 인코딩된 문자열에서 `FeeDelegatedChainDataAnchoring` 인스턴스를 생성할 수 있습니다. 아래 예시를 참고하시기 바랍니다.
참고: `caver.transaction.feeDelegatedChainDataAnchoring.create`는 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 부터 지원됩니다.

참고: caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4)부터 트랜잭션 생성은 `create` 함수를 통해서만 지원됩니다. 기존에 `new caver.transaction.feeDelegatedChainDataAnchoring({...})`와 같은 생성자를 사용하여 트랜잭션을 생성했다면, `caver.transaction.feeDelegatedChainDataAnchoring.create({...})`로 변경해주시기 바랍니다.

:::

**속성**

| 이름                 | 유형     | 설명                                                                                                                                               |
| ------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| from               | String | 발신자의 주소입니다.                                                                                                                                      |
| input              | String | 서비스 체인의 데이터입니다.                                                                                                                                  |
| gas                | String | 트랜잭션이 사용할 수 있는 최대 트랜잭션 수수료 금액입니다.                                                                                                                |
| nonce              | String | (선택 사항) 발신자의 트랜잭션을 고유하게 식별하는 데 사용되는 값입니다. 생략하면 `caver.rpc.klay.getTransactionCount(address, 'pending')`가 nonce를 설정하는 데 사용됩니다. |
| signatures         | Array  | (선택 사항) 서명의 배열입니다.                                                                                                            |
| feePayerSignatures | Array  | (선택 사항) 수수료 납부자 서명의 배열입니다.                                                                                                    |
| feePayer           | String | (선택 사항) 수수료 납부자의 주소입니다.                                                                                                       |
| gasPrice           | String | (선택 사항) 발신자가 토큰으로 지불할 금액을 구하기 위한 승수입니다. 생략하면 `caver.rpc.klay.getGasPrice`가 가스 가격을 설정하는 데 사용됩니다.                               |
| chainId            | String | (선택 사항) 클레이튼의 체인 아이디입니다. 생략하면 `caver.rpc.klay.getChainId`가 체인아이디를 설정하는 데 사용됩니다.                                               |

**예시**

```javascript
// Create a feeDelegatedChainDataAnchoring
> caver.transaction.feeDelegatedChainDataAnchoring.create({
    from: '0x{address in hex}',
    gas: 50000,
    input: '0xf8a6a...',
})

// Create a feeDelegatedChainDataAnchoring from RLP-encoded string
> caver.transaction.feeDelegatedChainDataAnchoring.create('0x49f90176118505d21dba0085174876e80094a94f5374fce5edbc8e2a8697c15331677e6ebf0bb8aff8ad80b8aaf8a8a00000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000001a00000000000000000000000000000000000000000000000000000000000000002a00000000000000000000000000000000000000000000000000000000000000003a00000000000000000000000000000000000000000000000000000000000000004058006f845f84326a0afe41edc9cce1185ab9065ca7dbfb89ab5c7bde3602a659aa258324124644142a0317848698248ba7cc057b8f0dd19a27b52ef904d29cb72823100f1ed18ba2bb39433f524631e573329a550296f595c820d6c65213ff845f84325a0309e46db21a1bf7bfdae24d9192aca69516d6a341ecce8971fc69cff481cee76a04b939bf7384c4f919880307323a5e36d4d6e029bae1887a43332710cdd48f174')
FeeDelegatedChainDataAnchoring {
    _type: 'TxTypeFeeDelegatedChainDataAnchoring',
    _from: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
    _gas: '0x174876e800',
    _nonce: '0x11',
    _gasPrice: '0x5d21dba00',
    _signatures: [ SignatureData { _v: '0x26', _r: '0xafe41...', _s: '0x31784...' } ],
    _feePayer: '0x33f524631e573329a550296f595c820d6c65213f',
    _feePayerSignatures: [ SignatureData { _v: '0x25', _r: '0x309e4...', _s: '0x4b939...' } ],
    _input: '0xf8ad8...'
}
```
