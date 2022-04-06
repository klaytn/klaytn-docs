# Fee delegation type transaction class <a id="fee-delegation-type-transaction-class"></a>

## FeeDelegatedValueTransfer <a id="feedelegatedvaluetransfer"></a>

```javascript
caver.transaction.feeDelegatedValueTransfer.create(transactionObject)
```

`FeeDelegatedValueTransfer`는 [수수료 위임 KLAY 전송 트랜잭션](../../../../../klaytn/design/transactions/fee-delegation.md#txtypefeedelegatedvaluetransfer)을 나타냅니다. `transactionObject`는 `FeeDelegatedValueTransfer` 트랜잭션을 생성하기 위해 아래와 같은 속성들을 가질 수 있습니다.

`FeeDelegatedValueTransfer`는 멤버변수로서 아래와 같은 속성들을 가지고 있습니다. `선택 사항`인 속성들은 사용자가 `FeeDelegatedValueTransfer` 트랜잭션을 생성할 때 `transactionObject`에 선택적으로 주어질 수 있는 속성들을 뜻합니다.

{% hint style="success" %}
NOTE: You can create an instance of `FeeDelegatedValueTransfer` from RLP-encoded strings. 아래 예시를 참고해주세요. NOTE: `caver.transaction.feeDelegatedValueTransfer.create` is supported since caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1).

NOTE: As of caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4), creating transactions is only supported using the `create` function. If you've been creating transactions using a constructor like `new caver.transaction.feeDelegatedValueTransfer({...})`, please change it to `caver.transaction.feeDelegatedValueTransfer.create({...})`.
{% endhint %}

**속성**

| 이름              | 타입     | 설명                                                                                                                         |
| --------------- | ------ | -------------------------------------------------------------------------------------------------------------------------- |
| value           | string | peb로 나타낸 전송될 KLAY 양입니다. `caver.utils.toPeb`를 사용할 수 있습니다.                                                                   |
| from            | string | 발신자의 주소입니다.                                                                                                                |
| to              | string | 전송되는 KLAY를 받을 계정 주소입니다.                                                                                                    |
| gas             | string | 트랜잭션에서 사용하도록 허락된 최대 트랜잭션 수수료입니다.                                                                                           |
| 서명              | Array  | (선택 사항) 서명의 배열입니다.                                                                                                         |
| 트랜잭션 수수료 납부자 서명 | Array  | (선택 사항) 수수료 납부자의 서명의 배열입니다.                                                                                                |
| feePayer        | string | (선택 사항) 수수료 납부자의 주소입니다.                                                                                                    |
| 논스              | string | (선택 사항) 발신자의 트랜잭션을 고유하게 식별하기 위해 사용되는 값입니다. 미입력시 논스 설정을 위해 `caver.rpc.klay.getTransactionCount(address, 'pending')`가 사용됩니다. |
| 가스 가격           | string | (선택 사항) 발신자가 지불할 토큰양을 구하기 위한 승수입니다. 미입력시 gasPrice 설정을 위해 `caver.rpc.klay.getGasPrice`가 사용됩니다.                              |
| chainId         | string | (선택 사항) Klaytn 블록체인의 체인 ID입니다. 미입력시 chainId 설정을 위해 `caver.rpc.klay.getChainId`가 사용됩니다.                                     |

**예시**

```javascript
// feeDelegatedValueTransfer 생성
> caver.transaction.feeDelegatedValueTransfer.create({
    from: '0x{address in hex}',
    to: '0x9957dfd92e4b70f91131c573293343bc5f21f215',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 25000,
})

// RLP-인코딩 문자열에서 feeDelegatedValueTransfer 생성
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

`FeeDelegatedValueTransferMemo`는 [수수료 위임 KLAY 전송 메모 트랜잭션](../../../../../klaytn/design/transactions/fee-delegation.md#txtypefeedelegatedvaluetransfermemo)을 나타냅니다. `transactionObject`는 `FeeDelegatedValueTransferMemo` 트랜잭션을 생성하기 위해 아래와 같은 속성들을 가질 수 있습니다.

`FeeDelegatedValueTransferMemo`는 멤버변수로서 아래와 같은 속성들을 가지고 있습니다. `선택 사항`인 속성들은 사용자가 `FeeDelegatedValueTransferMemo` 트랜잭션을 생성할 때 `transactionObject`에 선택적으로 주어질 수 있는 속성들을 뜻합니다.

{% hint style="success" %}
NOTE: You can create an instance of `FeeDelegatedValueTransferMemo` from RLP-encoded strings. 아래 예시를 참고해주세요. NOTE: `caver.transaction.feeDelegatedValueTransferMemo.create` is supported since caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1).

NOTE: As of caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4), creating transactions is only supported using the `create` function. If you've been creating transactions using a constructor like `new caver.transaction.feeDelegatedValueTransferMemo({...})`, please change it to `caver.transaction.feeDelegatedValueTransferMemo.create({...})`.
{% endhint %}

**속성**

| 이름              | 타입     | 설명                                                                                                                         |
| --------------- | ------ | -------------------------------------------------------------------------------------------------------------------------- |
| value           | string | peb로 나타낸 전송될 KLAY 양입니다. `caver.utils.toPeb`를 사용할 수 있습니다.                                                                   |
| from            | string | 발신자의 주소입니다.                                                                                                                |
| to              | string | 전송되는 KLAY를 받을 계정 주소입니다.                                                                                                    |
| input           | string | 트랜잭션에 첨부되는 데이터입니다. 메시지는 이 속성으로 전달되어야 합니다.                                                                                  |
| gas             | string | 트랜잭션에서 사용하도록 허락된 최대 트랜잭션 수수료입니다.                                                                                           |
| 서명              | Array  | (선택 사항) 서명의 배열입니다.                                                                                                         |
| 트랜잭션 수수료 납부자 서명 | Array  | (선택 사항) 수수료 납부자의 서명의 배열입니다.                                                                                                |
| feePayer        | string | (선택 사항) 수수료 납부자의 주소입니다.                                                                                                    |
| 논스              | string | (선택 사항) 발신자의 트랜잭션을 고유하게 식별하기 위해 사용되는 값입니다. 미입력시 논스 설정을 위해 `caver.rpc.klay.getTransactionCount(address, 'pending')`가 사용됩니다. |
| 가스 가격           | string | (선택 사항) 발신자가 지불할 토큰양을 구하기 위한 승수입니다. 미입력시 gasPrice 설정을 위해 `caver.rpc.klay.getGasPrice`가 사용됩니다.                              |
| chainId         | string | (선택 사항) Klaytn의 체인 ID입니다. 미입력시 chainId 설정을 위해 `caver.rpc.klay.getChainId`가 사용됩니다.                                          |

**예시**

```javascript
// feeDelegatedValueTransferMemo 생성
> caver.transaction.feeDelegatedValueTransferMemo.create({
    from: '0x{address in hex}',
    to: '0x9957dfd92e4b70f91131c573293343bc5f21f215',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 25000,
    input: '0x68656c6c6f',
})

// RLP-인코딩 문자열로 feeDelegatedValueTransferMemo 생성
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

## FeeDelegatedAccountUpdate<a id="feedelegatedaccountupdate"></a>

```javascript
caver.transaction.feeDelegatedAccountUpdate.create(transactionObject)
```

`FeeDelegatedAccountUpdate`는 [수수료 위임 계정 업데이트 트랜잭션](../../../../../klaytn/design/transactions/fee-delegation.md#txtypefeedelegatedaccountupdate)을 나타냅니다. `transactionObject`는 `FeeDelegatedAccountUpdate`를 생성하기 위해 아래와 같은 속성들을 가질 수 있습니다.

`FeeDelegatedAccountUpdate`는 멤버변수로서 아래와 같은 속성들을 가지고 있습니다. `선택 사항`인 속성들은 사용자가 `FeeDelegatedAccountUpdate` 트랜잭션을 생성할 때 `transactionObject`에 선택적으로 주어질 수 있는 속성들을 뜻합니다.

{% hint style="success" %}
NOTE: You can create an instance of `FeeDelegatedAccountUpdate` from RLP-encoded strings. 아래 예시를 참고해주세요. NOTE: `caver.transaction.feeDelegatedAccountUpdate.create` is supported since caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1).

NOTE: As of caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4), creating transactions is only supported using the `create` function. If you've been creating transactions using a constructor like `new caver.transaction.feeDelegatedAccountUpdate({...})`, please change it to `caver.transaction.feeDelegatedAccountUpdate.create({...})`.
{% endhint %}

**속성**

| 이름              | 타입        | 설명                                                                                                                         |
| --------------- | --------- | -------------------------------------------------------------------------------------------------------------------------- |
| from            | string    | 발신자의 주소입니다.                                                                                                                |
| account         | [Account] | 계정 업데이트에 필요한 정보를 포함하고 있는 [Account] 인스턴스입니다.                                                                                |
| gas             | string    | 트랜잭션에서 사용하도록 허락된 최대 트랜잭션 수수료입니다.                                                                                           |
| 서명              | Array     | (선택 사항) 서명의 배열입니다.                                                                                                         |
| 트랜잭션 수수료 납부자 서명 | Array     | (선택 사항) 수수료 납부자의 서명의 배열입니다.                                                                                                |
| feePayer        | string    | (선택 사항) 수수료 납부자의 주소입니다.                                                                                                    |
| 논스              | string    | (선택 사항) 발신자의 트랜잭션을 고유하게 식별하기 위해 사용되는 값입니다. 미입력시 논스 설정을 위해 `caver.rpc.klay.getTransactionCount(address, 'pending')`가 사용됩니다. |
| 가스 가격           | string    | (선택 사항) 발신자가 지불할 토큰양을 구하기 위한 승수입니다. 미입력시 gasPrice 설정을 위해 `caver.rpc.klay.getGasPrice`가 사용됩니다.                              |
| chainId         | string    | (선택 사항) Klaytn의 체인 ID입니다. 미입력시 chainId 설정을 위해 `caver.rpc.klay.getChainId`가 사용됩니다.                                          |

각 `AccountKey`에 대해 [Account] 인스턴스를 생성하는 방법은 [Getting Started - Account Update](../../getting-started.md#account-update) 또는 [caver.account.create](../caver.account.md#caver-account-create)를 참고하세요.

**예시**

```javascript
// feeDelegatedAccountUpdate 생성
> caver.transaction.feeDelegatedAccountUpdate.create({
    from: '0x{address in hex}',
    gas: 50000,
    account: caver.account.createWithAccountKeyLegacy('0x{address in hex}'),
})

// RLP-인코딩 문자열에서 feeDelegatedAccountUpdate 생성
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

## FeeDelegatedSmartContractDeploy<a id="feedelegatedsmartcontractdeploy"></a>

```javascript
caver.transaction.feeDelegatedSmartContractDeploy.create(transactionObject)
```

`FeeDelegatedSmartContractDeploy`는 [수수료 위임 스마트 컨트랙트 배포 트랜잭션](../../../../../klaytn/design/transactions/fee-delegation.md#txtypefeedelegatedsmartcontractdeploy)을 나타냅니다. `transactionObject`는 `FeeDelegatedSmartContractDeploy` 트랜잭션을 생성하기 위해 아래와 같은 속성들을 가질 수 있습니다.

`FeeDelegatedSmartContractDeploy`는 멤버변수로서 아래와 같은 속성들을 가지고 있습니다. `선택 사항`인 속성들은 사용자가 `FeeDelegatedSmartContractDeploy` 트랜잭션을 생성할 때 `transactionObject`에 선택적으로 주어질 수 있는 속성들을 뜻합니다.

{% hint style="success" %}
NOTE: You can create an instance of `FeeDelegatedSmartContractDeploy` from RLP-encoded strings. 아래 예시를 참고해주세요. NOTE: `caver.transaction.feeDelegatedSmartContractDeploy.create` is supported since caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1).

NOTE: As of caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4), creating transactions is only supported using the `create` function. If you've been creating transactions using a constructor like `new caver.transaction.feeDelegatedSmartContractDeploy({...})`, please change it to `caver.transaction.feeDelegatedSmartContractDeploy.create({...})`.
{% endhint %}

**속성**

| 이름              | 타입      | 설명                                                                                                                                         |
| --------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| from            | string  | 발신자의 주소입니다.                                                                                                                                |
| input           | string  | 트랜잭션에 첨부되는 데이터입니다. 배포될 스마트 컨트랙트의 바이트 코드와 그 아규먼트들입니다. [caver.abi.encodeContractDeploy](../caver.abi.md#encodecontractdeploy)를 통해 얻을 수 있습니다. |
| gas             | string  | 트랜잭션에서 사용하도록 허락된 최대 트랜잭션 수수료입니다.                                                                                                           |
| value           | string  | (선택 사항, default: `'0x0'`) peb로 나타낸 전송될 KLAY 양입니다. `caver.utils.toPeb`를 사용할 수 있습니다.                                                         |
| to              | string  | (선택 사항, default: `'0x'`) 스마트 컨트랙트가 배포되는 주소입니다. 현재는 이 값이 정의되지 않습니다. 특정 주소를 지정하는 기능은 향후 지원될 예정입니다.                                           |
| humanReadable   | boolean | (선택 사항, default: `false`) 인간이 읽을 수 있는 형식의 주소는 아직 지원되지 않기 때문에 이 값은 false입니다.                                                                |
| codeFormat      | string  | (선택 사항, default: `"EVM"`) 스마트 컨트랙트의 코드 포맷입니다. 현재는 오직 EVM만 지원됩니다. 이 값은 할당 후 내부적으로 16진수로 변환됩니다(e.g. `EVM`이 converted to `0x0`).              |
| 서명              | Array   | (선택 사항) 서명의 배열입니다.                                                                                                                         |
| 트랜잭션 수수료 납부자 서명 | Array   | (선택 사항) 수수료 납부자의 서명의 배열입니다.                                                                                                                |
| feePayer        | string  | (선택 사항) 수수료 납부자의 주소입니다.                                                                                                                    |
| 논스              | string  | (선택 사항) 발신자의 트랜잭션을 고유하게 식별하기 위해 사용되는 값입니다. 미입력시 논스 설정을 위해 `caver.rpc.klay.getTransactionCount(address, 'pending')`가 사용됩니다.                 |
| 가스 가격           | string  | (선택 사항) 발신자가 지불할 토큰양을 구하기 위한 승수입니다. 미입력시 gasPrice 설정을 위해 `caver.rpc.klay.getGasPrice`가 사용됩니다.                                              |
| chainId         | string  | (선택 사항) Klaytn의 체인 ID입니다. 미입력시 chainId 설정을 위해 `caver.rpc.klay.getChainId`가 사용됩니다.                                                          |

**예시**

```javascript
// feeDelegatedSmartContractDeploy 생성
> caver.transaction.feeDelegatedSmartContractDeploy.create({
    from: '0x{address in hex}',
    input: '0x60806...',
    gas: 100000,
})

// RLP-인코딩 문자열에서 feeDelegatedSmartContractDeploy 생성
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

`FeeDelegatedSmartContractExecution`는 [수수료 위임 스마트 컨트랙트 실행 트랜잭션](../../../../../klaytn/design/transactions/fee-delegation.md#txtypefeedelegatedsmartcontractexecution)을 나타냅니다. `transactionObject`는 `FeeDelegatedSmartContractExecution` 트랜잭션을 생성하기 위해 아래와 같은 속성들을 가질 수 있습니다.

`FeeDelegatedSmartContractExecution` 는 멤버변수로서 아래와 같은 속성들을 가지고 있습니다. `선택 사항`인 속성들은 사용자가 `FeeDelegatedSmartContractExecution` 트랜잭션을 생성할 때 `transactionObject`에 선택적으로 주어질 수 있는 속성들을 뜻합니다.

{% hint style="success" %}
NOTE: You can create an instance of `FeeDelegatedSmartContractExecution` from RLP-encoded strings. 아래 예시를 참고해주세요. NOTE: `caver.transaction.feeDelegatedSmartContractExecution.create` is supported since caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1).

NOTE: As of caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4), creating transactions is only supported using the `create` function. If you've been creating transactions using a constructor like `new caver.transaction.feeDelegatedSmartContractExecution({...})`, please change it to `caver.transaction.feeDelegatedSmartContractExecution.create({...})`.
{% endhint %}

**속성**

| 이름              | 타입     | 설명                                                                                                                                                                |
| --------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from            | string | 발신자의 주소입니다.                                                                                                                                                       |
| to              | string | 실행할 스마트 컨트랙트 계정의 주소입니다.                                                                                                                                           |
| input           | string | 트랜잭션 실행에 이용되며 트랜잭션에 첨부되는 데이터입니다. 호출할 함수와 전달될 파라미터들을 나타내는 엔코딩된 문자열입니다. [caver.abi.encodeFunctionCall](../caver.abi.md#encodefunctioncall)를 통해 엔코딩된 문자열을 얻을 수 있습니다. |
| gas             | string | 트랜잭션에서 사용하도록 허락된 최대 트랜잭션 수수료입니다.                                                                                                                                  |
| value           | string | (선택 사항, default: `'0x0'`) peb로 나타낸 전송될 KLAY 양입니다. `caver.utils.toPeb`를 사용할 수 있습니다.                                                                                |
| 서명              | Array  | (선택 사항) 서명의 배열입니다.                                                                                                                                                |
| 트랜잭션 수수료 납부자 서명 | Array  | (선택 사항) 수수료 납부자의 서명의 배열입니다.                                                                                                                                       |
| feePayer        | string | (선택 사항) 수수료 납부자의 주소입니다.                                                                                                                                           |
| 논스              | string | (선택 사항) 발신자의 트랜잭션을 고유하게 식별하기 위해 사용되는 값입니다. 미입력시 논스 설정을 위해 `caver.rpc.klay.getTransactionCount(address, 'pending')`가 사용됩니다.                                        |
| 가스 가격           | string | (선택 사항) 발신자가 지불할 토큰양을 구하기 위한 승수입니다. 미입력시 gasPrice 설정을 위해 `caver.rpc.klay.getGasPrice`가 사용됩니다.                                                                     |
| chainId         | string | (선택 사항) Klaytn의 체인 ID입니다. 미입력시 chainId 설정을 위해 `caver.rpc.klay.getChainId`가 사용됩니다.                                                                                 |

**예시**

```javascript
// feeDelegatedSmartContractExecution 생성
> caver.transaction.feeDelegatedSmartContractExecution.create({
    from: '0x{address in hex}',
    to: '0x{address in hex}',
    input: '0xa9059...',
    gas: 90000,
})

// RLP-인코딩 문자열에서 feeDelegatedSmartContractExecution 생성
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

`FeeDelegatedCancel`은 [수수료 위임 취소 트랜잭션](../../../../../klaytn/design/transactions/fee-delegation.md#txtypefeedelegatedcancel)을 나타냅니다. `transactionObject`는 `FeeDelegatedCancel`을 생성하기 위해 아래와 같은 속성들을 가질 수 있습니다.

`FeeDelegatedCancel`은 멤버변수로서 아래와 같은 속성들을 가지고 있습니다. `선택 사항`인 속성들은 사용자가 `FeeDelegatedCancel` 트랜잭션을 생성할 때 `transactionObject`에 선택적으로 주어질 수 있는 속성들을 뜻합니다.

{% hint style="success" %}
NOTE: You can create an instance of `FeeDelegatedCancel` from RLP-encoded strings. 아래 예시를 참고해주세요. NOTE: `caver.transaction.feeDelegatedCancel.create` is supported since caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1).

NOTE: As of caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4), creating transactions is only supported using the `create` function. If you've been creating transactions using a constructor like `new caver.transaction.feeDelegatedCancel({...})`, please change it to `caver.transaction.feeDelegatedCancel.create({...})`.
{% endhint %}

**속성**

| 이름              | 타입     | 설명                                                                                                                         |
| --------------- | ------ | -------------------------------------------------------------------------------------------------------------------------- |
| from            | string | 발신자의 주소입니다.                                                                                                                |
| gas             | string | 트랜잭션에서 사용하도록 허락된 최대 트랜잭션 수수료입니다.                                                                                           |
| 논스              | string | (선택 사항) 발신자의 트랜잭션을 고유하게 식별하기 위해 사용되는 값입니다. 미입력시 논스 설정을 위해 `caver.rpc.klay.getTransactionCount(address, 'pending')`가 사용됩니다. |
| 서명              | Array  | (선택 사항) 서명의 배열입니다.                                                                                                         |
| 트랜잭션 수수료 납부자 서명 | Array  | (선택 사항) 수수료 납부자의 서명의 배열입니다.                                                                                                |
| feePayer        | string | (선택 사항) 수수료 납부자의 주소입니다.                                                                                                    |
| 가스 가격           | string | (선택 사항) 발신자가 지불할 토큰양을 구하기 위한 승수입니다. 미입력시 gasPrice 설정을 위해 `caver.rpc.klay.getGasPrice`가 사용됩니다.                              |
| chainId         | string | (선택 사항) Klaytn의 체인 ID입니다. 미입력시 chainId 설정을 위해 `caver.rpc.klay.getChainId`가 사용됩니다.                                          |

**예시**

```javascript
// feeDelegatedCancel 생성
> caver.transaction.feeDelegatedCancel.create({
    from: '0x{address in hex}',
    nonce: 1,
    gas: 25000,
})

// RLP-인코딩 문자열에서 feeDelegatedCancel 생성
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

## FeeDelegatedChainDataAnchoring<a id="feedelegatedchaindataanchoring"></a>

```javascript
caver.transaction.feeDelegatedChainDataAnchoring.create(transactionObject)
```

`FeeDelegatedChainDataAnchoring`은 [수수료 위임 체인 데이터 앵커링 트랜잭션](../../../../../klaytn/design/transactions/fee-delegation.md#txtypefeedelegatedchaindataanchoring)을 나타냅니다. `transactionObject`는 `FeeDelegatedChainDataAnchoring` 트랜잭션을 생성하기 위해 아래와 같은 속성들을 가질 수 있습니다.

`FeeDelegatedChainDataAnchoring`은 멤버변수로서 아래와 같은 속성들을 가지고 있습니다. `선택 사항`인 속성들은 사용자가 `FeeDelegatedChainDataAnchoring` 트랜잭션을 생성할 때 `transactionObject`에 선택적으로 주어질 수 있는 속성들을 뜻합니다.

{% hint style="success" %}
NOTE: You can create an instance of `FeeDelegatedChainDataAnchoring` from RLP-encoded strings. 아래 예시를 참고해주세요. NOTE: `caver.transaction.feeDelegatedChainDataAnchoring.create` is supported since caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1).

NOTE: As of caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4), creating transactions is only supported using the `create` function. If you've been creating transactions using a constructor like `new caver.transaction.feeDelegatedChainDataAnchoring({...})`, please change it to `caver.transaction.feeDelegatedChainDataAnchoring.create({...})`.
{% endhint %}

**속성**

| 이름              | 타입     | 설명                                                                                                                         |
| --------------- | ------ | -------------------------------------------------------------------------------------------------------------------------- |
| from            | string | 발신자의 주소입니다.                                                                                                                |
| input           | string | 서비스체인의 데이터입니다.                                                                                                             |
| gas             | string | 트랜잭션에서 사용하도록 허락된 최대 트랜잭션 수수료입니다.                                                                                           |
| 논스              | string | (선택 사항) 발신자의 트랜잭션을 고유하게 식별하기 위해 사용되는 값입니다. 미입력시 논스 설정을 위해 `caver.rpc.klay.getTransactionCount(address, 'pending')`가 사용됩니다. |
| 서명              | Array  | (선택 사항) 서명의 배열입니다.                                                                                                         |
| 트랜잭션 수수료 납부자 서명 | Array  | (선택 사항) 수수료 납부자의 서명의 배열입니다.                                                                                                |
| feePayer        | string | (선택 사항) 수수료 납부자의 주소입니다.                                                                                                    |
| 가스 가격           | string | (선택 사항) 발신자가 지불할 토큰양을 구하기 위한 승수입니다. 미입력시 gasPrice 설정을 위해 `caver.rpc.klay.getGasPrice`가 사용됩니다.                              |
| chainId         | string | (선택 사항) Klaytn의 체인 ID입니다. 미입력시 chainId 설정을 위해 `caver.rpc.klay.getChainId`가 사용됩니다.                                          |

**예시**

```javascript
// feeDelegatedChainDataAnchoring 생성
> caver.transaction.feeDelegatedChainDataAnchoring.create({
    from: '0x{address in hex}',
    gas: 50000,
    input: '0xf8a6a...',
})

// RLP-인코딩 문자열에서 feeDelegatedChainDataAnchoring 생성
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
