# Basic type transaction class <a id="basic-type-transaction-class"></a>

## 레거시 트랜잭션<a id="legacytransaction"></a>

```javascript
caver.transaction.legacyTransaction.create(transactionObject)
new caver.transaction.legacyTransaction(transactionObject)
```

`LegacyTransaction`은 [레거시 트랜잭션](../../../../../klaytn/design/transactions/basic.md#txtypelegacytransaction)을 의미합니다. A [Klaytn account](../../../../../klaytn/design/accounts.md#klaytn-accounts) can execute a `LegacyTransaction` only with [AccountKeyLegacy][]. The `transactionObject` can have properties below to create a `LegacyTransaction`.

`LegacyTransaction` has the properties below as its member variables. Properties marked as `optional` refer to properties that can be optionally given in `transactionObject` when the user creates `LegacyTransaction`.

**NOTE** You can create an instance of `LegacyTransaction` from RLP-encoded string. Please refer to the below example. **NOTE** `caver.transaction.legacyTransaction.create` is supported since caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1).

**속성**

| 명칭         | 타입  | 설명                                                                                                                                                                                                                                                   |
| ---------- | --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| gas        | 문자열 | 트랜잭션에서 사용하도록 허락된 최대 트랜잭션 수수료입니다.                                                                                                                                                                                                                     |
| value      | 문자열 | (optional, default: `'0x0'`) The amount of KLAY in peb to be transferred. You can use `caver.utils.toPeb`.                                                                                                                                           |
| from       | 문자열 | (optional) The address of the sender. If omitted, the keyring address used for signing will be set.                                                                                                                                                  |
| to         | 문자열 | (optional, default: `'0x'`) The account address that will receive the transferred value or smart contact address if a legacy transaction execute smart contract. If a legacy transaction deploys a smart contract, `to` does not need to be defined. |
| input      | 문자열 | (optional) Data attached to the transaction, used for smart contract deployment/execution.                                                                                                                                                           |
| signatures | 배열  | (optional) An array of signatures. A legacy transaction can have only one signature.                                                                                                                                                                 |
| 논스         | 문자열 | (optional) A value used to uniquely identify a sender’s transaction. If omitted, `caver.rpc.klay.getTransactionCount(address, 'pending')` will be used to set nonce.                                                                                 |
| gasPrice   | 문자열 | (optional) A multiplier to get how much the sender will pay in tokens. If omitted, `caver.rpc.klay.getGasPrice` will be used to set gasPrice.                                                                                                        |
| chainId    | 문자열 | (optional) The chain id of the Klaytn network. If omitted, `caver.rpc.klay.getChainId` will be used to set chainId.                                                                                                                                  |

**예시**

```javascript
// Create a legacyTransaction for sending KLAY
> caver.transaction.legacyTransaction.create({
    to: '0x9957dfd92e4b70f91131c573293343bc5f21f215',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 25000,
})

// Create a legacyTransaction to deploy smart contract
> caver.transaction.legacyTransaction.create({
    input: '0x60806...',
    gas: 200000,
})

// Create a legacyTransaction to execute smart contract
> caver.transaction.legacyTransaction.create({
    to: '0xfe6c9118e56a42cbc77aa3b7ee586455e3dc5b6d', // Smart contact address
    input: '0xa9059...',
    gas: 200000,
})

// Create a legacyTransaction from RLP-encoded string
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

`ValueTransfer` represents a [value transfer transaction](../../../../../klaytn/design/transactions/basic.md#txtypevaluetransfer). The `transactionObject` can have properties below to create a `ValueTransfer` transaction.

`ValueTransfer` has the properties below as its member variables. Properties marked as `optional` refer to properties that can be optionally given in `transactionObject` when the user creates `ValueTransfer` transaction.

**NOTE** You can create an instance of `ValueTransfer` from RLP-encoded string. Please refer to the below example.

**NOTE** `caver.transaction.valueTransfer.create` is supported since caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1).

**속성**

| 명칭         | 타입  | 설명                                                                                                                                                                   |
| ---------- | --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value      | 문자열 | The amount of KLAY in peb to be transferred. You can use `caver.utils.toPeb`.                                                                                        |
| from       | 문자열 | 발신자의 주소입니다.                                                                                                                                                          |
| to         | 문자열 | 전송되는 KLAY를 받을 계정 주소입니다.                                                                                                                                              |
| gas        | 문자열 | 트랜잭션에서 사용하도록 허락된 최대 트랜잭션 수수료입니다.                                                                                                                                     |
| signatures | 배열  | (optional) An array of signatures.                                                                                                                                   |
| 논스         | 문자열 | (optional) A value used to uniquely identify a sender’s transaction. If omitted, `caver.rpc.klay.getTransactionCount(address, 'pending')` will be used to set nonce. |
| gasPrice   | 문자열 | (optional) A multiplier to get how much the sender will pay in tokens. If omitted, `caver.rpc.klay.getGasPrice` will be used to set gasPrice.                        |
| chainId    | 문자열 | (optional) The chain id of the Klaytn network. If omitted, `caver.rpc.klay.getChainId` will be used to set chainId.                                                  |

**예시**

```javascript
// Create a valueTransfer
> caver.transaction.valueTransfer.create({
    from: '0x{address in hex}',
    to: '0x9957dfd92e4b70f91131c573293343bc5f21f215',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 25000,
})

// Create a valueTransfer from RLP-encoded string
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

`ValueTransferMemo` represents a [value transfer memo transaction](../../../../../klaytn/design/transactions/basic.md#txtypevaluetransfermemo). The `transactionObject` can have properties below to create a `ValueTransferMemo` transaction.

`ValueTransferMemo` has the properties below as its member variables. Properties marked as `optional` refer to properties that can be optionally given in `transactionObject` when the user creates `ValueTransferMemo` transaction.

**NOTE** You can create an instance of `ValueTransferMemo` from RLP-encoded string. Please refer to the below example.

**NOTE** `caver.transaction.valueTransferMemo.create` is supported since caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1).

**속성**

| 명칭         | 타입  | 설명                                                                                                                                                                   |
| ---------- | --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value      | 문자열 | The amount of KLAY in peb to be transferred. You can use `caver.utils.toPeb`.                                                                                        |
| from       | 문자열 | 발신자의 주소입니다.                                                                                                                                                          |
| to         | 문자열 | 전송되는 KLAY를 받을 계정 주소입니다.                                                                                                                                              |
| input      | 문자열 | 트랜잭션에 첨부되는 데이터입니다. The message should be passed to this property.                                                                                                    |
| gas        | 문자열 | 트랜잭션에서 사용하도록 허락된 최대 트랜잭션 수수료입니다.                                                                                                                                     |
| signatures | 배열  | (optional) An array of signatures.                                                                                                                                   |
| 논스         | 문자열 | (optional) A value used to uniquely identify a sender’s transaction. If omitted, `caver.rpc.klay.getTransactionCount(address, 'pending')` will be used to set nonce. |
| gasPrice   | 문자열 | (optional) A multiplier to get how much the sender will pay in tokens. If omitted, `caver.rpc.klay.getGasPrice` will be used to set gasPrice.                        |
| chainId    | 문자열 | (optional) The chain id of the Klaytn network. If omitted, `caver.rpc.klay.getChainId` will be used to set chainId.                                                  |

**예시**

```javascript
// Create a valueTransferMemo
> caver.transaction.valueTransferMemo.create({
    from: '0x{address in hex}',
    to: '0x9957dfd92e4b70f91131c573293343bc5f21f215',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 25000,
    input: '0x68656c6c6f',
})

// Create a valueTransferMemo from RLP-encoded string
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

`AccountUpdate` represents a [account update transaction](../../../../../klaytn/design/transactions/basic.md#txtypeaccountupdate). The `transactionObject` can have properties below to create an `AccountUpdate` transaction.

`AccountUpdate` has the properties below as its member variables. Properties marked as `optional` refer to properties that can be optionally given in `transactionObject` when the user creates `AccountUpdate` transaction.


**NOTE** You can create an instance of `AccountUpdate` from RLP-encoded string. Please refer to the below example.

**NOTE** `caver.transaction.accountUpdate.create` is supported since caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1).

**속성**

| 명칭           | 타입              | 설명                                                                                                                                                                   |
| ------------ | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from         | 문자열             | 발신자의 주소입니다.                                                                                                                                                          |
| 계정 (Account) | [계정(Account)][] | An [Account][] instance that contains the information needed to update your account.                                                                                 |
| gas          | 문자열             | 트랜잭션에서 사용하도록 허락된 최대 트랜잭션 수수료입니다.                                                                                                                                     |
| signatures   | 배열              | (optional) An array of signatures.                                                                                                                                   |
| 논스           | 문자열             | (optional) A value used to uniquely identify a sender’s transaction. If omitted, `caver.rpc.klay.getTransactionCount(address, 'pending')` will be used to set nonce. |
| gasPrice     | 문자열             | (optional) A multiplier to get how much the sender will pay in tokens. If omitted, `caver.rpc.klay.getGasPrice` will be used to set gasPrice.                        |
| chainId      | 문자열             | (optional) The chain id of the Klaytn network. If omitted, `caver.rpc.klay.getChainId` will be used to set chainId.                                                  |

For how to create an [Account][] instance for each `AccountKey`, refer to [Getting Started - Account Update](../../getting-started.md#account-update) or [caver.account.create](../caver.account.md#caver-account-create).

**예시**

```javascript
// Create a accountUpdate
> caver.transaction.accountUpdate.create({
    from: '0x{address in hex}',
    gas: 50000,
    account: caver.account.createWithAccountKeyLegacy('0x{address in hex}'),
})

// Create a accountUpdate from RLP-encoded string
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

`SmartContractDeploy` represents a [smart contract deploy transaction](../../../../../klaytn/design/transactions/basic.md#txtypesmartcontractdeploy). The `transactionObject` can have properties below to create a `SmartContractDeploy` transaction.

`SmartContractDeploy` has the properties below as its member variables. Properties marked as `optional` refer to properties that can be optionally given in `transactionObject` when the user creates `SmartContractDeploy` transaction.

**NOTE** You can create an instance of `SmartContractDeploy` from RLP-encoded string. Please refer to the below example.

**NOTE** `caver.transaction.smartContractDeploy.create` is supported since caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1).

**속성**

| 명칭            | 타입      | 설명                                                                                                                                                                                                                       |
| ------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| from          | 문자열     | 발신자의 주소입니다.                                                                                                                                                                                                              |
| input         | 문자열     | 트랜잭션에 첨부되는 데이터입니다. The byte code of the smart contract to be deployed and its arguments. You can get this through [caver.abi.encodeContractDeploy](../caver.abi.md#encodecontractdeploy).                                |
| gas           | 문자열     | 트랜잭션에서 사용하도록 허락된 최대 트랜잭션 수수료입니다.                                                                                                                                                                                         |
| value         | 문자열     | (optional, default: `'0x0'`) The amount of KLAY in peb to be transferred to and stored in the balance of the smart contract address when the contract is initialized. You can use `caver.utils.toPeb`.                   |
| to            | 문자열     | (optional, default: `'0x'`) Address to which the smart contract is deployed. Currently, this value cannot be defined. 특정 주소를 지정하는 기능은 향후 지원될 예정입니다.                                                                      |
| humanReadable | boolean | (optional, default: `false`) This must be false since human-readable address is not supported yet.                                                                                                                       |
| codeFormat    | 문자열     | (optional, default: `'EVM'`) The code format of smart contract code. The supported value, for now, is EVM only. This value is converted to hex string after the assignment(e.g> `EVM` is converted to `0x0`) internally. |
| signatures    | 배열      | (optional) An array of signatures.                                                                                                                                                                                       |
| 논스            | 문자열     | (optional) A value used to uniquely identify a sender’s transaction. If omitted, `caver.rpc.klay.getTransactionCount(address, 'pending')` will be used to set nonce.                                                     |
| gasPrice      | 문자열     | (optional) A multiplier to get how much the sender will pay in tokens. If omitted, `caver.rpc.klay.getGasPrice` will be used to set gasPrice.                                                                            |
| chainId       | 문자열     | (optional) The chain id of the Klaytn network. If omitted, `caver.rpc.klay.getChainId` will be used to set chainId.                                                                                                      |

**예시**

```javascript
// Create a smartContractDeploy
> caver.transaction.smartContractDeploy.create({
    from: '0x{address in hex}',
    input: '0x60806...',
    gas: 100000,
})

// Create a smartContractDeploy from RLP-encoded string
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

`SmartContractExecution` represents a [smart contract execution transaction](../../../../../klaytn/design/transactions/basic.md#txtypesmartcontractexecution). The `transactionObject` can have properties below to create a `SmartContractExecution` transaction.

`SmartContractExecution` has the properties below as its member variables. Properties marked as `optional` refer to properties that can be optionally given in `transactionObject` when the user creates `SmartContractExecution` transaction.

**NOTE** You can create an instance of `SmartContractExecution` from RLP-encoded string. Please refer to the below example.

**NOTE** `caver.transaction.smartContractExecution.create` is supported since caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1).

**속성**

| 명칭         | 타입  | 설명                                                                                                                                                                                                                                           |
| ---------- | --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from       | 문자열 | 발신자의 주소입니다.                                                                                                                                                                                                                                  |
| to         | 문자열 | 실행할 스마트 컨트랙트 계정의 주소입니다.                                                                                                                                                                                                                      |
| input      | 문자열 | 트랜잭션 실행에 이용되며 트랜잭션에 첨부되는 데이터입니다. The input is an encoded string that indicates a function to call and parameters to be passed to this function. You can get this through [caver.abi.encodeFunctionCall](../caver.abi.md#encodefunctioncall). |
| gas        | 문자열 | 트랜잭션에서 사용하도록 허락된 최대 트랜잭션 수수료입니다.                                                                                                                                                                                                             |
| value      | 문자열 | (optional, default: `'0x0'`) The amount of KLAY in peb to be transferred. You can use `caver.utils.toPeb`.                                                                                                                                   |
| signatures | 배열  | (optional) An array of signatures.                                                                                                                                                                                                           |
| 논스         | 문자열 | (optional) A value used to uniquely identify a sender’s transaction. If omitted, `caver.rpc.klay.getTransactionCount(address, 'pending')` will be used to set nonce.                                                                         |
| gasPrice   | 문자열 | (optional) A multiplier to get how much the sender will pay in tokens. If omitted, `caver.rpc.klay.getGasPrice` will be used to set gasPrice.                                                                                                |
| chainId    | 문자열 | (optional) The chain id of the Klaytn network. If omitted, `caver.rpc.klay.getChainId` will be used to set chainId.                                                                                                                          |

**예시**

```javascript
// Create a smartContractExecution
> caver.transaction.smartContractExecution.create({
    from: '0x{address in hex}',
    to: '0x{address in hex}',
    input: '0xa9059...',
    gas: 90000,
})

// Create a smartContractExecution from RLP-encoded string
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

`Cancel` represents a [cancel transaction](../../../../../klaytn/design/transactions/basic.md#txtypecancel). The `transactionObject` can have properties below to create a `Cancel` transaction.

`Cancel` transaction cancels the execution of the transaction with the same nonce in the transaction pool.

`Cancel` has the properties below as its member variables. Properties marked as `optional` refer to properties that can be optionally given in `transactionObject` when the user creates `Cancel` transaction.

**NOTE** You can create an instance of `Cancel` from RLP-encoded string. Please refer to the below example.

**NOTE** `caver.transaction.cancel.create` is supported since caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1).


**속성**

| 명칭         | 타입  | 설명                                                                                                                                                                   |
| ---------- | --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from       | 문자열 | 발신자의 주소입니다.                                                                                                                                                          |
| gas        | 문자열 | 트랜잭션에서 사용하도록 허락된 최대 트랜잭션 수수료입니다.                                                                                                                                     |
| 논스         | 문자열 | (optional) A value used to uniquely identify a sender’s transaction. If omitted, `caver.rpc.klay.getTransactionCount(address, 'pending')` will be used to set nonce. |
| signatures | 배열  | (optional) An array of signatures.                                                                                                                                   |
| gasPrice   | 문자열 | (optional) A multiplier to get how much the sender will pay in tokens. If omitted, `caver.rpc.klay.getGasPrice` will be used to set gasPrice.                        |
| chainId    | 문자열 | (optional) The chain id of the Klaytn network. If omitted, `caver.rpc.klay.getChainId` will be used to set chainId.                                                  |

**예시**

```javascript
// Create a cancel
> caver.transaction.cancel.create({
    from: '0x{address in hex}',
    nonce: 1,
    gas: 25000,
})

// Create a cancel from RLP-encoded string
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

## ChainDataAnchoring <a id="chaindataanchoring"></a>

```javascript
caver.transaction.chainDataAnchoring.create(transactionObject)
new caver.transaction.chainDataAnchoring(transactionObject)
```

`ChainDataAnchoring` represents a [chain data anchoring transaction](../../../../../klaytn/design/transactions/basic.md#txtypechaindataanchoring). The `transactionObject` can have properties below to create a `ChainDataAnchoring` transaction.

`ChainDataAnchoring` has the properties below as its member variables. Properties marked as `optional` refer to properties that can be optionally given in `transactionObject` when the user creates `ChainDataAnchoring` transaction.

**NOTE** You can create an instance of `ChainDataAnchoring` from RLP-encoded string. Please refer to the below example.

**NOTE** `caver.transaction.chainDataAnchoring.create` is supported since caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1).

**속성**

| 명칭         | 타입  | 설명                                                                                                                                                                   |
| ---------- | --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from       | 문자열 | 발신자의 주소입니다.                                                                                                                                                          |
| input      | 문자열 | 서비스체인의 데이터입니다.                                                                                                                                                       |
| gas        | 문자열 | 트랜잭션에서 사용하도록 허락된 최대 트랜잭션 수수료입니다.                                                                                                                                     |
| 논스         | 문자열 | (optional) A value used to uniquely identify a sender’s transaction. If omitted, `caver.rpc.klay.getTransactionCount(address, 'pending')` will be used to set nonce. |
| signatures | 배열  | (optional) An array of signatures.                                                                                                                                   |
| gasPrice   | 문자열 | (optional) A multiplier to get how much the sender will pay in tokens. If omitted, `caver.rpc.klay.getGasPrice` will be used to set gasPrice.                        |
| chainId    | 문자열 | (optional) The chain id of the Klaytn network. If omitted, `caver.rpc.klay.getChainId` will be used to set chainId.                                                  |

**예시**

```javascript
// Create a chainDataAnchoring
> caver.transaction.chainDataAnchoring.create({
    from: '0x{address in hex}',
    gas: 50000,
    input: '0xf8a6a...',
})

// Create a chainDataAnchoring from RLP-encoded string
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
[Account]: ../caver.account.md#account
