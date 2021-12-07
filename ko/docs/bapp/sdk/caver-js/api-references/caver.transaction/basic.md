# Basic type transaction class <a id="basic-type-transaction-class"></a>

## 레거시 트랜잭션<a id="legacytransaction"></a>

```javascript
caver.transaction.legacyTransaction.create(transactionObject)
new caver.transaction.legacyTransaction(transactionObject)
```

`LegacyTransaction`은 [레거시 트랜잭션](../../../../../klaytn/design/transactions/basic.md#txtypelegacytransaction)을 의미합니다. [Klaytn 계정](../../../../../klaytn/design/accounts.md#klaytn-accounts)은 [AccountKeyLegacy][]을 사용해야만 `LegacyTransaction`을 실행할 수 있습니다. `transactionObject`는 `LegacyTransaction`을 생성하기 위해 아래와 같은 속성들을 가질 수 있습니다.

`LegacyTransaction`는 멤버변수로서 아래와 같은 속성들을 가지고 있습니다. `선택 사항`인 속성들은 사용자가 `LegacyTransaction`를 생성할 때 `transactionObject`에 선택적으로 주어질 수 있는 속성들을 뜻합니다.

**참고** RLP 인코딩된 문자열로부터 `LegacyTransaction` 인스턴스를 생성할 수 있습니다. 아래 예시를 참고해주세요. **참고** `caver.transaction.legacyTransaction.create`는 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1)부터 지원됩니다.

**속성**

| 이름         | 타입     | 설명                                                                                                                                |
| ---------- | ------ | --------------------------------------------------------------------------------------------------------------------------------- |
| gas        | string | 트랜잭션에서 사용하도록 허락된 최대 트랜잭션 수수료입니다.                                                                                                  |
| value      | string | (선택 사항, default: `'0x0'`) peb로 나타낸 전송될 KLAY 양입니다. `caver.utils.toPeb`를 사용할 수 있습니다.                                                |
| from       | string | (선택 사항) 발신자의 주소입니다. 미입력시 서명에 사용되는 키링 주소로 설정됩니다.                                                                                   |
| to         | string | (선택 사항, default: `'0x'`) 전송받는 계정 주소, 또는 기본 트랜잭션이 스마트 컨트랙트를 실행하는 경우 스마트 컨트랙트 주소입니다. 기본 트랜잭션이 스마트 컨트랙트를 배포하는 경우 `to`는 정의될 필요가 없습니다. |
| input      | string | (선택 사항) 스마트 컨트랙트의 배포와 실행에 사용되는 트랜잭션에 첨부된 데이터입니다.                                                                                  |
| signatures | 배열     | (선택 사항) 서명의 배열입니다. 기본 트랜잭션은 하나의 서명만 받을 수 있습니다.                                                                                    |
| nonce      | string | (선택 사항) 발신자의 트랜잭션을 고유하게 식별하기 위해 사용되는 값입니다. 미입력시 논스 설정을 위해 `caver.rpc.klay.getTransactionCount(address, 'pending')`가 사용됩니다.        |
| gasPrice   | string | (선택 사항) 발신자가 지불할 토큰양을 구하기 위한 승수입니다. 미입력시 gasPrice 설정을 위해 `caver.rpc.klay.getGasPrice`가 사용됩니다.                                     |
| chainId    | string | (선택 사항) Klaytn 네트워크의 체인 ID입니다. 미입력시 chainId 설정을 위해 `caver.rpc.klay.getChainId`가 사용됩니다.                                            |

**Example**

```javascript
// KLAY 전송을 위한 legacyTransaction 생성
> caver.transaction.legacyTransaction.create({
    to: '0x9957dfd92e4b70f91131c573293343bc5f21f215',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 25000,
})

// 스마트 컨트랙트 배포를 위한 legacyTransaction 생성
> caver.transaction.legacyTransaction.create({
    input: '0x60806...',
    gas: 200000,
})

// 스마트 컨트랙트 실행을 위한 legacyTransaction 생성
> caver.transaction.legacyTransaction.create({
    to: '0xfe6c9118e56a42cbc77aa3b7ee586455e3dc5b6d', // Smart contact address
    input: '0xa9059...',
    gas: 200000,
})

// RLP-인코딩 문자열에서 부터 legacyTransaction 생성
> caver.transaction.legacyTransaction.create('0xf8668204d219830f4240947b65b75d204abed71587c9e519a89277766ee1d00a843132333425a0b2a5a15550ec298dc7dddde3774429ed75f864c82caeb5ee24399649ad731be9a029da1014d16f2011b3307f7bbe1035b6e699a4204fc416c763def6cefd976567')
LegacyTransaction {
    _type: 'TxTypeLegacyTransaction',
    _from: '0x',
    _gas: '0xf4240',
    _nonce: '0x4d2',
    _gasPrice: '0x19',
    _signatures: SignatureData { _v: '0x25', _r: '0xb2a5a...', _s:  '0x29da1...' },
    _to: '0x7b65b75d204abed71587c9e519a89277766ee1d0',
    _input: '0x31323334',
    _value: '0xa'
}
```

## ValueTransfer <a id="valuetransfer"></a>

```javascript
caver.transaction.valueTransfer.create(transactionObject)
new caver.transaction.valueTransfer(transactionObject)
```

`ValueTransfer`는 [KLAY 전송 트랜잭션](../../../../../klaytn/design/transactions/basic.md#txtypevaluetransfer)을 나타냅니다. `transactionObject`는 `ValueTransfer`를 생성하기 위해 아래와 같은 속성들을 가질 수 있습니다.

`ValueTransfer`는 멤버변수로서 아래와 같은 속성들을 가지고 있습니다. `선택 사항`인 속성들은 사용자가 ` ValueTransfer` 트랜잭션을 생성할 때 `transactionObject`에 선택적으로 주어질 수 있는 속성들을 뜻합니다.

**참고** RLP 인코딩된 문자열로부터 ` ValueTransfer` 인스턴스를 생성할 수 있습니다. 아래 예시를 참고해주세요.

**참고** `caver.transaction.valueTransfer.create`는 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1)부터 지원됩니다.

**속성**

| 이름         | 타입     | 설명                                                                                                                         |
| ---------- | ------ | -------------------------------------------------------------------------------------------------------------------------- |
| value      | string | peb로 나타낸 전송될 KLAY 양입니다. `caver.utils.toPeb`를 사용할 수 있습니다.                                                                   |
| from       | string | 발신자의 주소입니다.                                                                                                                |
| to         | string | 전송되는 KLAY를 받을 계정 주소입니다.                                                                                                    |
| gas        | string | 트랜잭션에서 사용하도록 허락된 최대 트랜잭션 수수료입니다.                                                                                           |
| signatures | 배열     | (선택 사항) 서명의 배열입니다.                                                                                                         |
| nonce      | string | (선택 사항) 발신자의 트랜잭션을 고유하게 식별하기 위해 사용되는 값입니다. 미입력시 논스 설정을 위해 `caver.rpc.klay.getTransactionCount(address, 'pending')`가 사용됩니다. |
| gasPrice   | string | (선택 사항) 발신자가 지불할 토큰양을 구하기 위한 승수입니다. 미입력시 gasPrice 설정을 위해 `caver.rpc.klay.getGasPrice`가 사용됩니다.                              |
| chainId    | string | (선택 사항) Klaytn 네트워크의 체인 ID입니다. 미입력시 chainId 설정을 위해 `caver.rpc.klay.getChainId`가 사용됩니다.                                     |

**Example**

```javascript
// valueTransfer 생성
> caver.transaction.valueTransfer.create({
    from: '0x{address in hex}',
    to: '0x9957dfd92e4b70f91131c573293343bc5f21f215',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 25000,
})

// RLP-인코딩 문자열에서 valueTransfer 생성
> caver.transaction.valueTransfer.create('0x08f87f3a8505d21dba0083015f90948723590d5d60e35f7ce0db5c09d3938b26ff80ae01947d0104ac150f749d36bb34999bcade9f2c0bd2e6f847f845820feaa03d820b27d0997baf16f98df01c7b2b2e9734ad05b2228c4d403c2facff8397f3a01f4a44eeb8b7f0b0019162d1d6b90c401078e56fcd7495e74f7cfcd37e25f017')
ValueTransfer {
    _type: 'TxTypeValueTransfer',
    _from: '0x7d0104ac150f749d36bb34999bcade9f2c0bd2e6',
    _gas: '0x15f90',
    _nonce: '0x3a',
    _gasPrice: '0x5d21dba00',
    _signatures: [ SignatureData { _v: '0x0fea', _r: '0x3d820...', _s: '0x1f4a4...' } ],
    _to: '0x8723590d5d60e35f7ce0db5c09d3938b26ff80ae',
    _value: '0x1'
}
```

## ValueTransferMemo <a id="valuetransfermemo"></a>

```javascript
caver.transaction.valueTransferMemo.create(transactionObject)
new caver.transaction.valueTransferMemo(transactionObject)
```

`ValueTransferMemo`는 [KLAY 전송 메모 트랜잭션](../../../../../klaytn/design/transactions/basic.md#txtypevaluetransfermemo)을 나타냅니다. `transactionObject`는 ` ValueTransferMemo`를 생성하기 위해 아래와 같은 속성들을 가질 수 있습니다.

` ValueTransferMemo`는 멤버변수로서 아래와 같은 속성들을 가지고 있습니다. `선택 사항`인 속성들은 사용자가 ` ValueTransferMemo` 트랜잭션을 생성할 때 `transactionObject`에 선택적으로 제공될 수 있는 속성들을 뜻합니다.

**참고** RLP 인코딩된 문자열로부터 ` ValueTransferMemo` 인스턴스를 생성할 수 있습니다. 아래 예시를 참고해주세요.

**참고** `caver.transaction.valueTransferMemo.create`는 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1)부터 지원됩니다.

**속성**

| 이름         | 타입     | 설명                                                                                                                         |
| ---------- | ------ | -------------------------------------------------------------------------------------------------------------------------- |
| value      | string | peb로 나타낸 전송될 KLAY 양입니다. `caver.utils.toPeb`를 사용할 수 있습니다.                                                                   |
| from       | string | 발신자의 주소입니다.                                                                                                                |
| to         | string | 전송되는 KLAY를 받을 계정 주소입니다.                                                                                                    |
| input      | string | 트랜잭션에 첨부되는 데이터입니다. 메시지는 이 속성으로 전달되어야 합니다.                                                                                  |
| gas        | string | 트랜잭션에서 사용하도록 허락된 최대 트랜잭션 수수료입니다.                                                                                           |
| signatures | 배열     | (선택 사항) 서명의 배열입니다.                                                                                                         |
| 논스         | string | (선택 사항) 발신자의 트랜잭션을 고유하게 식별하기 위해 사용되는 값입니다. 미입력시 논스 설정을 위해 `caver.rpc.klay.getTransactionCount(address, 'pending')`가 사용됩니다. |
| gasPrice   | string | (선택 사항) 발신자가 지불할 토큰양을 구하기 위한 승수입니다. 미입력시 gasPrice 설정을 위해 `caver.rpc.klay.getGasPrice`가 사용됩니다.                              |
| chainId    | string | (선택 사항) Klaytn 네트워크의 체인 ID입니다. 미입력시 chainId 설정을 위해 `caver.rpc.klay.getChainId`가 사용됩니다.                                     |

**Example**

```javascript
// valueTransferMemo 생성
> caver.transaction.valueTransferMemo.create({
    from: '0x{address in hex}',
    to: '0x9957dfd92e4b70f91131c573293343bc5f21f215',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 25000,
    input: '0x68656c6c6f',
})

// RLP-인코딩 문자열에서 valueTransferMemo 생성
> caver.transaction.valueTransferMemo.create('0x10f8808204d219830f4240947b65b75d204abed71587c9e519a89277766ee1d00a94a94f5374fce5edbc8e2a8697c15331677e6ebf0b8568656c6c6ff845f84325a07d2b0c89ee8afa502b3186413983bfe9a31c5776f4f820210cffe44a7d568d1ca02b1cbd587c73b0f54969f6b76ef2fd95cea0c1bb79256a75df9da696278509f3')
ValueTransferMemo {
    _type: 'TxTypeValueTransferMemo',
    _from: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
    _gas: '0xf4240',
    _nonce: '0x4d2',
    _gasPrice: '0x19',
    _signatures: [ SignatureData { _v: '0x25', _r: '0x7d2b0...', _s: '0x2b1cb...' } ],
    _to: '0x7b65b75d204abed71587c9e519a89277766ee1d0',
    _value: '0xa',
    _input: '0x68656c6c6f'
}
```

## AccountUpdate <a id="accountupdate"></a>

```javascript
caver.transaction.accountUpdate.create(transactionObject)
new caver.transaction.accountUpdate(transactionObject)
```

`AccountUpdate`는 [계정 업데이트 트랜잭션](../../../../../klaytn/design/transactions/basic.md#txtypeaccountupdate)을 나타냅니다. `transactionObject`는 `AccountUpdate`를 생성하기 위해 아래와 같은 속성들을 가질 수 있습니다.

`AccountUpdate`는 멤버변수로서 아래와 같은 속성들을 가지고 있습니다. `선택 사항`인 속성들은 사용자가 `AccountUpdate` 트랜잭션을 생성할 때 `transactionObject`에 선택적으로 주어질 수 있는 속성들을 뜻합니다.


**참고** RLP 인코딩된 문자열로부터 `AccountUpdate` 인스턴스를 생성할 수 있습니다. 아래 예시를 참고해주세요.

**참고** `caver.transaction.accountUpdate.create`는 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1)부터 지원됩니다.

**속성**

| 이름         | 타입              | 설명                                                                                                                         |
| ---------- | --------------- | -------------------------------------------------------------------------------------------------------------------------- |
| from       | string          | 발신자의 주소입니다.                                                                                                                |
| account    | [계정(Account)][] | 계정 업데이트를 위해 필요한 정보를 포함하고 있는 [계정][] 인스턴스입니다.                                                                                |
| gas        | string          | 트랜잭션에서 사용하도록 허락된 최대 트랜잭션 수수료입니다.                                                                                           |
| signatures | 배열              | (선택 사항) 서명의 배열입니다.                                                                                                         |
| 논스         | string          | (선택 사항) 발신자의 트랜잭션을 고유하게 식별하기 위해 사용되는 값입니다. 미입력시 논스 설정을 위해 `caver.rpc.klay.getTransactionCount(address, 'pending')`가 사용됩니다. |
| gasPrice   | string          | (선택 사항) 발신자가 지불할 토큰양을 구하기 위한 승수입니다. 미입력시 gasPrice 설정을 위해 `caver.rpc.klay.getGasPrice`가 사용됩니다.                              |
| chainId    | string          | (선택 사항) Klaytn 네트워크의 체인 ID입니다. 미입력시 chainId 설정을 위해 `caver.rpc.klay.getChainId`가 사용됩니다.                                     |

각 `AccountKey`에 대해 [계정][] 인스턴스를 생성하는 방법은 [Getting Started - Account Update](../../getting-started.md#account-update) 또는 [caver.account.create](../caver.account.md#caver-account-create)를 참고하세요.

**Example**

```javascript
// accountUpdate 생성
> caver.transaction.accountUpdate.create({
    from: '0x{address in hex}',
    gas: 50000,
    account: caver.account.createWithAccountKeyLegacy('0x{address in hex}'),
})

// RLP-인코딩 문자열에서 accountUpdate 생성
> caver.transaction.accountUpdate.create('0x20f88d808505d21dba0083030d4094ffb52bc54635f840013e142ebe7c06c9c91c1625a302a102c93fcbdb2b9dbef8ee5c4748ffdce11f1f5b06d7ba71cc2b7699e38be7698d1ef847f845820fe9a09c2ca281e94567846acbeef724b1a7a5f882d581aff9984755abd92272592b8ea0344fd23d7774ae9c227809bb579387dfcd69e74ae2fe3a788617f54a4001e5ab')
AccountUpdate {
    _type: 'TxTypeAccountUpdate',
    _from: '0xffb52bc54635f840013e142ebe7c06c9c91c1625',
    _gas: '0x30d40',
    _nonce: '0x0',
    _gasPrice: '0x5d21dba00',
    _signatures: [ SignatureData { _v: '0x0fe9', _r: '0x9c2ca...', _s: '0x344fd...' } ],
    _account: Account {
        _address: '0xffb52bc54635f840013e142ebe7c06c9c91c1625',
        _accountKey: AccountKeyPublic { _publicKey: '0x02c93...' }
    }
}
```

## SmartContractDeploy <a id="smartcontractdeploy"></a>

```javascript
caver.transaction.smartContractDeploy.create(transactionObject)
new caver.transaction.smartContractDeploy(transactionObject)
```

`SmartContractDeploy`는 [스마트 컨트랙트 배포 트랜잭션](../../../../../klaytn/design/transactions/basic.md#txtypesmartcontractdeploy)을 나타냅니다. `transactionObject`는 `SmartContractDeploy`를 생성하기 위해 아래와 같은 속성들을 가질 수 있습니다.

`SmartContractDeploy`는 멤버변수로서 아래와 같은 속성들을 가지고 있습니다. `선택 사항`인 속성들은 사용자가 `SmartContractDeploy` 트랜잭션을 생성할 때 `transactionObject`에 선택적으로 주어질 수 있는 속성들을 뜻합니다.

**참고** RLP 인코딩된 문자열로부터 `SmartContractDeploy` 인스턴스를 생성할 수 있습니다. 아래 예시를 참고해주세요.

**참고** `caver.transaction.smartContractDeploy.create`는 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1)부터 지원됩니다.

**속성**

| 이름            | 타입      | 설명                                                                                                                                         |
| ------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| from          | string  | 발신자의 주소입니다.                                                                                                                                |
| input         | string  | 트랜잭션에 첨부되는 데이터입니다. 배포될 스마트 컨트랙트의 바이트 코드와 그 아규먼트들입니다. [caver.abi.encodeContractDeploy](../caver.abi.md#encodecontractdeploy)를 통해 얻을 수 있습니다. |
| gas           | string  | 트랜잭션에서 사용하도록 허락된 최대 트랜잭션 수수료입니다.                                                                                                           |
| value         | string  | (선택 사항, default: `'0x0'`) 컨트랙트가 초기화되었을 때 스마트 컨트랙트 주소에 전송 및 저장될 peb으로 나타낸 KLAY 양입니다. `caver.utils.toPeb`를 사용할 수 있습니다.                       |
| to            | string  | (선택 사항, default: `'0x'`) 스마트 컨트랙트가 배포되는 주소입니다. 현재는 이 값이 정의되지 않습니다. 특정 주소를 지정하는 기능은 향후 지원될 예정입니다.                                           |
| humanReadable | boolean | (선택 사항, default: `false`) 인간이 읽을 수 있는 형식의 주소는 아직 지원되지 않기 때문에 이 값은 false입니다.                                                                |
| codeFormat    | string  | (선택 사항, default: `"EVM"`) 스마트 컨트랙트의 코드 포맷입니다. 현재는 오직 EVM만 지원됩니다. 이 값은 할당 후 내부적으로 16진수로 변환됩니다(e.g. `EVM`이 converted to `0x0`).              |
| signatures    | 배열      | (선택 사항) 서명의 배열입니다.                                                                                                                         |
| nonce         | string  | (선택 사항) 발신자의 트랜잭션을 고유하게 식별하기 위해 사용되는 값입니다. 미입력시 논스 설정을 위해 `caver.rpc.klay.getTransactionCount(address, 'pending')`가 사용됩니다.                 |
| gasPrice      | string  | (선택 사항) 발신자가 지불할 토큰양을 구하기 위한 승수입니다. 미입력시 gasPrice 설정을 위해 `caver.rpc.klay.getGasPrice`가 사용됩니다.                                              |
| chainId       | string  | (선택 사항) Klaytn 네트워크의 체인 ID입니다. 미입력시 chainId 설정을 위해 `caver.rpc.klay.getChainId`가 사용됩니다.                                                     |

**Example**

```javascript
// smartContractDeploy 생성
> caver.transaction.smartContractDeploy.create({
    from: '0x{address in hex}',
    input: '0x60806...',
    gas: 100000,
})

// RLP-인코딩 문자열에서 smartContractDeploy 생성
> caver.transaction.smartContractDeploy.create('0x28f9027e1f8505d21dba00830dbba0808094d91aec35bea25d379e49cfe2dff5f5775cdac1a3b9020e60806040526000805534801561001457600080fd5b506101ea806100246000396000f30060806040526004361061006d576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd1461007257806342cbb15c1461009d578063767800de146100c8578063b22636271461011f578063d14e62b814610150575b600080fd5b34801561007e57600080fd5b5061008761017d565b6040518082815260200191505060405180910390f35b3480156100a957600080fd5b506100b2610183565b6040518082815260200191505060405180910390f35b3480156100d457600080fd5b506100dd61018b565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561012b57600080fd5b5061014e60048036038101908080356000191690602001909291905050506101b1565b005b34801561015c57600080fd5b5061017b600480360381019080803590602001909291905050506101b4565b005b60005481565b600043905090565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b50565b80600081905550505600a165627a7a7230582053c65686a3571c517e2cf4f741d842e5ee6aa665c96ce70f46f9a594794f11eb00298080f847f845820fe9a0018a9f680a74e275f1f83a5c2c45e1313c52432df4595e944240b1511a4f4ba7a02d762c3417f91b81db4907db832cb28cc64df7dca3ea9be64899ab3f4812f016')
SmartContractDeploy {
    _type: 'TxTypeSmartContractDeploy',
    _from: '0xd91aec35bea25d379e49cfe2dff5f5775cdac1a3',
    _gas: '0xdbba0',
    _nonce: '0x1f',
    _gasPrice: '0x5d21dba00',
    _signatures: [ SignatureData { _v: '0x0fe9', _r: '0x018a9...', _s: '0x2d762...' } ],
    _to: '0x',
    _value: '0x0',
    _input: '0x60806...',
    _humanReadable: false,
    _codeFormat: '0x0'
}
```

## SmartContractExecution <a id="smartcontractexecution"></a>

```javascript
caver.transaction.smartContractExecution.create(transactionObject)
new caver.transaction.smartContractExecution(transactionObject)
```

`SmartContractExecution`는 [스마트 컨트랙트 실행 트랜잭션](../../../../../klaytn/design/transactions/basic.md#txtypesmartcontractexecution)을 나타냅니다. `transactionObject`는 `SmartContractExecution`를 생성하기 위해 아래와 같은 속성들을 가질 수 있습니다.

`SmartContractExecution`은 멤버변수로서 아래와 같은 속성들을 가지고 있습니다. `선택 사항`인 속성들은 사용자가 `SmartContractExecution` 트랜잭션을 생성할 때 `transactionObject`에 선택적으로 주어질 수 있는 속성들을 뜻합니다.

**참고** RLP 인코딩된 문자열로부터 `SmartContractExecution` 인스턴스를 생성할 수 있습니다. 아래 예시를 참고해주세요.

**참고** `caver.transaction.smartContractExecution.create`는 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1)부터 지원됩니다.

**속성**

| 이름         | 타입     | 설명                                                                                                                                                      |
| ---------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from       | string | 발신자의 주소입니다.                                                                                                                                             |
| to         | string | 실행할 스마트 컨트랙트 계정의 주소입니다.                                                                                                                                 |
| input      | string | 트랜잭션 실행에 이용되며 트랜잭션에 첨부되는 데이터입니다. 호출할 함수와 전달될 파라미터들을 나타내는 엔코딩된 문자열입니다. [caver.abi.encodeFunctionCall](../caver.abi.md#encodefunctioncall)를 통해 얻을 수 있습니다. |
| gas        | string | 트랜잭션에서 사용하도록 허락된 최대 트랜잭션 수수료입니다.                                                                                                                        |
| value      | string | (선택 사항, default: `'0x0'`) peb로 나타낸 전송될 KLAY 양입니다. `caver.utils.toPeb`를 사용할 수 있습니다.                                                                      |
| signatures | 배열     | (선택 사항) 서명의 배열입니다.                                                                                                                                      |
| nonce      | string | (선택 사항) 발신자의 트랜잭션을 고유하게 식별하기 위해 사용되는 값입니다. 미입력시 논스 설정을 위해 `caver.rpc.klay.getTransactionCount(address, 'pending')`가 사용됩니다.                              |
| gasPrice   | string | (선택 사항) 발신자가 지불할 토큰양을 구하기 위한 승수입니다. 미입력시 gasPrice 설정을 위해 `caver.rpc.klay.getGasPrice`가 사용됩니다.                                                           |
| chainId    | string | (선택 사항) Klaytn 네트워크의 체인 ID입니다. 미입력시 chainId 설정을 위해 `caver.rpc.klay.getChainId`가 사용됩니다.                                                                  |

**Example**

```javascript
// smartContractExecution 생성
> caver.transaction.smartContractExecution.create({
    from: '0x{address in hex}',
    to: '0x{address in hex}',
    input: '0xa9059...',
    gas: 90000,
})

// RLP-인코딩 문자열에서 smartContractExecution 생성
> caver.transaction.smartContractExecution.create('0x30f8c5038505d21dba00830dbba094e3cd4e1cd287235cc0ea48c9fd02978533f5ec2b80946b604e77c0fbebb5b2941bcde3ab5eb09d99ad24b844a9059cbb0000000000000000000000008a4c9c443bb0645df646a2d5bb55def0ed1e885a0000000000000000000000000000000000000000000000000000000000003039f847f845820feaa066e1650b5779f152489633f343581c07938f8b2fc92c919d4dd7c7295d0beacea067b0b79383dbcd42a3aa8ebb1aa4bcb1fc0623ef9e97bc1e9b82d96fe37b5881')
SmartContractExecution {
    _type: 'TxTypeSmartContractExecution',
    _from: '0x6b604e77c0fbebb5b2941bcde3ab5eb09d99ad24',
    _gas: '0xdbba0',
    _nonce: '0x3',
    _gasPrice: '0x5d21dba00',
    _signatures: [ SignatureData { _v: '0x0fea', _r: '0x66e16...', _s: '0x67b0b...' } ],
    _to: '0xe3cd4e1cd287235cc0ea48c9fd02978533f5ec2b',
    _value: '0x0',
    _input: '0xa9059...'
}
```

## Cancel <a id="cancel"></a>

```javascript
caver.transaction.cancel.create(transactionObject)
new caver.transaction.cancel(transactionObject)
```

`LegacyTransaction`은 [취소 트랜잭션](../../../../../klaytn/design/transactions/basic.md#txtypecancel)을 의미합니다. `transactionObject`는 `Cancel` 트랜잭션을 생성하기 위해 아래와 같은 속성들을 가질 수 있습니다.

`Cancel`은 트랜잭션 풀에서 같은 논스를 가진 트랜잭션 실행을 취소합니다.

`Cancel`는 멤버변수로서 아래와 같은 속성들을 가지고 있습니다. `선택 사항`인 속성들은 사용자가 `Cancel` 트랜잭션을 생성할 때 `transactionObject`에 선택적으로 주어질 수 있는 속성들을 뜻합니다.

**참고** RLP 인코딩된 문자열로부터 `Cancel` 인스턴스를 생성할 수 있습니다. 아래 예시를 참고해주세요.

**참고** `caver.transaction.cancel.create`는 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1)부터 지원됩니다.


**속성**

| 이름         | 타입     | 설명                                                                                                                         |
| ---------- | ------ | -------------------------------------------------------------------------------------------------------------------------- |
| from       | string | 발신자의 주소입니다.                                                                                                                |
| gas        | string | 트랜잭션에서 사용하도록 허락된 최대 트랜잭션 수수료입니다.                                                                                           |
| nonce      | string | (선택 사항) 발신자의 트랜잭션을 고유하게 식별하기 위해 사용되는 값입니다. 미입력시 논스 설정을 위해 `caver.rpc.klay.getTransactionCount(address, 'pending')`가 사용됩니다. |
| signatures | 배열     | (선택 사항) 서명의 배열입니다.                                                                                                         |
| gasPrice   | string | (선택 사항) 발신자가 지불할 토큰양을 구하기 위한 승수입니다. 미입력시 gasPrice 설정을 위해 `caver.rpc.klay.getGasPrice`가 사용됩니다.                              |
| chainId    | string | (선택 사항) Klaytn 네트워크의 체인 ID입니다. 미입력시 chainId 설정을 위해 `caver.rpc.klay.getChainId`가 사용됩니다.                                     |

**Example**

```javascript
// cancel 생성
> caver.transaction.cancel.create({
    from: '0x{address in hex}',
    nonce: 1,
    gas: 25000,
})

// RLP-인코딩 문자열에서 cancel 생성
> caver.transaction.cancel.create('0x38f869068505d21dba00830dbba0946b604e77c0fbebb5b2941bcde3ab5eb09d99ad24f847f845820feaa0d9994ef507951a59380309f656ee8ed685becdc89b1d1a0eb1d2f72683ae14d3a07ad5d37a89781f294fab72b254ea9266e4d039ae163db4a4c4752f1fabff023b')
Cancel {
    _type: 'TxTypeCancel',
    _from: '0x6b604e77c0fbebb5b2941bcde3ab5eb09d99ad24',
    _gas: '0xdbba0',
    _nonce: '0x6',
    _gasPrice: '0x5d21dba00',
    _signatures: [ SignatureData { _v: '0x0fea', _r: '0xd9994...', _s: '0x7ad5d...' } ]
}
```

## ChainDataAnchoring<a id="chaindataanchoring"></a>

```javascript
caver.transaction.chainDataAnchoring.create(transactionObject)
new caver.transaction.chainDataAnchoring(transactionObject)
```

`ChainDataAnchoring`은 [체인 데이터 앵커링 트랜잭션](../../../../../klaytn/design/transactions/basic.md#txtypechaindataanchoring)을 나타냅니다. `transactionObject`는 `ChainDataAnchoring` 트랜잭션을 생성하기 위해 아래와 같은 속성들을 가질 수 있습니다.

`ChainDataAnchoring`은 멤버변수로서 아래와 같은 속성들을 가지고 있습니다. `선택 사항`인 속성들은 사용자가 `ChainDataAnchoring` 트랜잭션을 생성할 때 `transactionObject`에 선택적으로 주어질 수 있는 속성들을 뜻합니다.

**참고** RLP 인코딩된 문자열로부터 `ChainDataAnchoring` 인스턴스를 생성할 수 있습니다. 아래 예시를 참고해주세요.

**참고** `caver.transaction.chainDataAnchoring.create`는 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1)부터 지원됩니다.

**속성**

| 이름         | 타입     | 설명                                                                                                                         |
| ---------- | ------ | -------------------------------------------------------------------------------------------------------------------------- |
| from       | string | 발신자의 주소입니다.                                                                                                                |
| input      | string | 서비스체인의 데이터입니다.                                                                                                             |
| gas        | string | 트랜잭션에서 사용하도록 허락된 최대 트랜잭션 수수료입니다.                                                                                           |
| nonce      | string | (선택 사항) 발신자의 트랜잭션을 고유하게 식별하기 위해 사용되는 값입니다. 미입력시 논스 설정을 위해 `caver.rpc.klay.getTransactionCount(address, 'pending')`가 사용됩니다. |
| signatures | 배열     | (선택 사항) 서명의 배열입니다.                                                                                                         |
| gasPrice   | string | (선택 사항) 발신자가 지불할 토큰양을 구하기 위한 승수입니다. 미입력시 gasPrice 설정을 위해 `caver.rpc.klay.getGasPrice`가 사용됩니다.                              |
| chainId    | string | (선택 사항) Klaytn 네트워크의 체인 ID입니다. 미입력시 chainId 설정을 위해 `caver.rpc.klay.getChainId`가 사용됩니다.                                     |

**Example**

```javascript
// chainDataAnchoring 생성
> caver.transaction.chainDataAnchoring.create({
    from: '0x{address in hex}',
    gas: 50000,
    input: '0xf8a6a...',
})

// RLP-인코딩 문자열에서 chainDataAnchoring 생성
> caver.transaction.chainDataAnchoring.create('0x48f9010e8204d219830f424094a94f5374fce5edbc8e2a8697c15331677e6ebf0bb8a8f8a6a00000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000001a00000000000000000000000000000000000000000000000000000000000000002a00000000000000000000000000000000000000000000000000000000000000003a0000000000000000000000000000000000000000000000000000000000000000405f845f84325a0e58b9abf9f33a066b998fccaca711553fb4df425c9234bbb3577f9d9775bb124a02c409a6c5d92277c0a812dd0cc553d7fe1d652a807274c3786df3292cd473e09')
ChainDataAnchoring {
    _type: 'TxTypeChainDataAnchoring',
    _from: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
    _gas: '0xf4240',
    _nonce: '0x4d2',
    _gasPrice: '0x19',
    _signatures: [ SignatureData { _v: '0x25', _r: '0xe58b9...', _s: '0x2c409...' } ],
    _input: '0xf8a6a...'
}
```

[AccountKeyLegacy]: ../../../../../klaytn/design/accounts.md#accountkeylegacy
[계정(Account)]: ../caver.account.md#account
[계정]: ../caver.account.md#account
