# caver.transaction

`caver.transaction`은 트랜잭션과 관련된 기능을 제공하는 패키지입니다.

## Class <a href="#class" id="class"></a>

각 트랜잭션 클래스는 아래 표에 자세히 설명되어 있습니다:

|                        | 기본                                                          | feeDelegation                                                                                | 부분 수수료 위임                                                                                                              |
| ---------------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| LegacyTransaction      | [LegacyTransaction](./basic.md#legacytransaction)           | N/A                                                                                          | N/A                                                                                                                    |
| ValueTransfer          | [ValueTransfer](./basic.md#valuetransfer)                   | [FeeDelegatedValueTransfer](./fee-delegation.md#feedelegatedvaluetransfer)                   | [FeeDelegatedValueTransferWithRatio](./partial-fee-delegation.md#feedelegatedvaluetransferwithratio)                   |
| ValueTransferMemo      | [ValueTransferMemo](./basic.md#valuetransfermemo)           | [FeeDelegatedValueTransferMemo](./fee-delegation.md#feedelegatedvaluetransfermemo)           | [FeeDelegatedValueTransferMemoWithRatio](./partial-fee-delegation.md#feedelegatedvaluetransfermemowithratio)           |
| SmartContractDeploy    | [SmartContractDeploy](./basic.md#smartcontractdeploy)       | [FeeDelegatedSmartContractDeploy](./fee-delegation.md#feedelegatedsmartcontractdeploy)       | [FeeDelegatedSmartContractDeployWithRatio](./partial-fee-delegation.md#feedelegatedsmartcontractdeploywithratio)       |
| SmartContractExecution | [SmartContractExecution](./basic.md#smartcontractexecution) | [FeeDelegatedSmartContractExecution](./fee-delegation.md#feedelegatedsmartcontractexecution) | [FeeDelegatedSmartContractExecutionWithRatio](./partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio) |
| AccountUpdate          | [AccountUpdate](./basic.md#accountupdate)                   | [FeeDelegatedAccountUpdate](./fee-delegation.md#feedelegatedaccountupdate)                   | [FeeDelegatedAccountUpdateWithRatio](./partial-fee-delegation.md#feedelegatedaccountupdatewithratio)                   |
| Cancel                 | [Cancel](./basic.md#cancel)                                 | [FeeDelegatedCancel](./fee-delegation.md#feedelegatedcancel)                                 | [FeeDelegatedCancelWithRatio](./partial-fee-delegation.md#feedelegatedcancelwithratio)                                 |
| ChainDataAnchoring     | [ChainDataAnchoring](./basic.md#chaindataanchoring)         | [FeeDelegatedChainDataAnchoring](./fee-delegation.md#feedelegatedchaindataanchoring)         | [FeeDelegatedChainDataAnchoringWithRatio](./partial-fee-delegation.md#feedelegatedchaindataanchoringwithratio)         |
| EthereumAccessList     | [EthereumAccessList](./basic.md#ethereumaccesslist)         | N/A                                                                                          | N/A                                                                                                                    |
| EthereumDynamicFee     | [EthereumDynamicFee](./basic.md#ethereumdynamicfee)         | N/A                                                                                          | N/A                                                                                                                    |

## caver.transaction.decode <a href="#caver-transaction-decode" id="caver-transaction-decode"></a>

```javascript
caver.transaction.decode(rlpEncoded)
```

RLP로 인코딩된 트랜잭션 문자열, Raw 트랜잭션을 디코딩하고 [Transaction](#class) 인스턴스를 반환합니다.

**매개변수**

| 이름         | 유형     | 설명                         |
| ---------- | ------ | -------------------------- |
| rlpEncoded | string | 디코딩할 RLP 인코딩된 트랜잭션 문자열입니다. |

**리턴 값**

| 유형     | 설명                                                                            |
| ------ | ----------------------------------------------------------------------------- |
| object | [Transaction](#class)의 인스턴스. 각 트랜잭션에 대한 자세한 내용은 [Transaction](#class)를 참조하세요. |

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

## caver.transaction.getTransactionByHash <a href="#caver-transaction-gettransactionbyhash" id="caver-transaction-gettransactionbyhash"></a>

```javascript
caver.transaction.getTransactionByHash('0x{transaction hash}')
```

클레이튼에서 트랜잭션을 쿼리하고 caver 트랜잭션 인스턴스로 변환합니다.

**참고** `caver.transaction.getTransactionByHash`는 caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3) 부터 지원됩니다.

**매개변수**

| 이름              | 유형     | 설명                                                |
| --------------- | ------ | ------------------------------------------------- |
| transactionHash | string | The transaction hash string to query from Klaytn. |

**리턴 값**

`promise`는 `object`를 반환합니다: [트랜잭션](#class)의 인스턴스. 클레이튼으로부터 트랜잭션 객체를 수신하지 못하면 에러가 발생합니다.

| 유형     | 설명                                                                            |
| ------ | ----------------------------------------------------------------------------- |
| object | [Transaction](#class)의 인스턴스. 각 트랜잭션에 대한 자세한 내용은 [Transaction](#class)를 참조하세요. |

**예시**

```javascript
> caver.transaction.getTransactionByHash('0x30575f5a76a4477502aa1e5e707e47f05b92c3450132529cf55764cc94f780b0').then(console.log)
LegacyTransaction {
  _type: 'TxTypeLegacyTransaction',
  _from: '0x9ce618d097ea54c00d1562cb060576ff64139f10',
  _gas: '0x81b320',
  _nonce: '0x1de',
  _gasPrice: '0x5d21dba00',
  _signatures: SignatureData {
    _v: '0x07f5',
    _r: '0x359a09ebd2842cfc9cad6fd93c299da8629292bb3a69410c73837f7ca15cfd51',
    _s: '0x6f348cc656b90e79cfc1e748c3371fbd0128b83b787a110622f3aa5143a017f8'
  },
  _to: '0x',
  _input: '0x60806...',
  _value: '0x0'
}
```

## caver.transaction.recoverPublicKeys <a href="#caver-transaction-recoverpublickeys" id="caver-transaction-recoverpublickeys"></a>

```javascript
caver.transaction.recoverPublicKeys('0x{RLP-encoded transaction}')
```

주어진 트랜잭션의 `signatures` 필드에서 공개 키 문자열을 복구합니다.

**참고** `caver.transaction.recoverPublicKeys`는 caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3) 부터 지원됩니다.

**매개변수**

| 이름    | 유형     | 설명                                                 |
| ----- | ------ | -------------------------------------------------- |
| rawTx | string | `signatures`에서 공개 키를 복구하기 위한 RLP 인코딩된 트랜잭션 문자열입니다. |

**리턴 값**

| 유형    | 설명                                 |
| ----- | ---------------------------------- |
| Array | `signatures`에서 복구한 공개키가 포함된 배열입니다. |

**예시**

```javascript
> caver.transaction.recoverPublicKeys('0x08f9010e808505d21dba008402faf0809459177716c34ac6e49e295a0e78e33522f14d61ee0194f21460730845e3652aa3cc9bc13b345e4f53984af8d5f845820feaa02b5934c6d26bb3e65edf099d79c57c743d2f70744ca09d3ba9a1099edff9f173a00797886edff4b449c1a599943e3a6003ae9e46b3f3f34862ced327e43fba3a6af845820fe9a063177648732ef855f800eb9f80f68501abb507f84c0d660286a6e0801334a1d2a0620a996623c114f2df35b11ec8ac4f3758d3ad89cf81ba13614e51908cfe9218f845820fe9a086c8ecbfd892be41d48443a2243274beb6daed3f72895045965a3baede4c350ea069ea748aff6e4c106d3a8ba597d8f134745b76f12dacb581318f9da07351511a')
[
  '0x8bb6aaeb2d96d024754d3b50babf116cece68977acbe8ba6a66f14d5217c60d96af020a0568661e7c72e753e80efe084a3aed9f9ac87bf44d09ce67aad3d4e01',
  '0xc7751c794337a93e4db041fb5401c2c816cf0a099d8fd4b1f3f555aab5dfead2417521bb0c03d8637f350df15ef6a6cb3cdb806bd9d10bc71982dd03ff5d9ddd',
  '0x3919091ba17c106dd034af508cfe00b963d173dffab2c7702890e25a96d107ca1bb4f148ee1984751e57d2435468558193ce84ab9a7731b842e9672e40dc0f22'
]
```

## caver.transaction.recoverFeePayerPublicKeys <a href="#caver-transaction-recoverfeepayerpublickeys" id="caver-transaction-recoverfeepayerpublickeys"></a>

```javascript
caver.transaction.recoverFeePayerPublicKeys('0x{RLP-encoded transaction}')
```

지정된 트랜잭션의 `feePayerSignatures` 필드에서 공개 키 문자열을 복구합니다.

**참고** `caver.transaction.recoverFeePayerPublicKeys`는 caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3) 부터 지원됩니다.

**매개변수**

| 이름    | 유형     | 설명                                                                                                                                       |
| ----- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| rawTx | string | `feePayerSignatures`에서 공개 키를 복구하기 위한 RLP 인코딩된 트랜잭션 문자열입니다. 수수료 납부자의 공개 키를 복구하려면 트랜잭션 내부에 `feePayerSignatures` 필드가 있는 수수료 위임 트랜잭션이어야 합니다. |

**리턴 값**

| 유형    | 설명                                         |
| ----- | ------------------------------------------ |
| Array | `feePayerSignatures`에서 복구한 공개키가 포함된 배열입니다. |

**예시**

```javascript
> caver.transaction.recoverFeePayerPublicKeys('0x09f901fa808505d21dba008402faf0809459177716c34ac6e49e295a0e78e33522f14d61ee019407a9a76ef778676c3bd2b334edcf581db31a85e5f8d5f845820feaa0cb2bbf04a12ec3a06163c30ce8782739ec4745a53e265aa9443f1c0d678bb871a07dd348c7d8fce6be36b661f116973d1c36cc92a389ad4a1a4053bd486060a083f845820fe9a06d5dfca992d6833c0da272578bc6ea941be45f44fb2fa114310ebe18d673ed52a04dc5cd7985c9ce7d44d46d65e65c995a4a8c97159a1eed8b2efb0510b981ab7cf845820feaa0945151edf556fbcebf832092d4534b9a3b1f3d46f85bce09e7d7211070cb57bea01617c8f918f96970baddd12f240a9824eca6b29d91eb7333adacb987f2dcd8dd94b5db72925b1b6b79299a1a49ae226cd7861083acf8d5f845820feaa086fd17d788e89a6e0639395b3c0a04f916103debd6cbe639d6f4ff5034dde3e8a00795551c551d9096234c290689767f34f2d409c95166ab18d216dbc93845ba16f845820feaa00653b6d1cdb90462094b089ce8e2fed0e3b8ec2c44125965e1a5af286644c758a0259b10e3bf594d48535fd0d95e15d095897c8d075c01dd56e7417d5943b0d53af845820fe9a0ce8d051427adab10d1dc93de49123aeab18ba8aadedce0d57ef5b7fa451b1f4fa04fe2a845d92ff48abca3e1d59637fab5f4a4e3172d91772d9bfce60760edc506')
[
  '0x2b557d80ddac3a0bbcc8a7861773ca7434c969e2721a574bb94a1e3aa5ceed3819f08a82b31682c038f9f691fb38ee4aaf7e016e2c973a1bd1e48a51f60a54ea',
  '0x1a1cfe1e2ec4b15520c57c20c2460981a2f16003c8db11a0afc282abf929fa1c1868f60f91b330c423aa660913d86acc2a0b1b15e7ba1fe571e5928a19825a7e',
  '0xdea23a89dbbde1a0c26466c49c1edd32785432389641797038c2b53815cb5c73d6cf5355986fd9a22a68bb57b831857fd1636362b383bd632966392714b60d72'
]
```

## transaction.sign <a href="#transaction-sign" id="transaction-sign"></a>

```javascript
transaction.sign(keyring [, index] [, hasher])
```

`Keyring`에 있는 개인 키로 트랜잭션 발신자로서 트랜잭션에 서명하고 트랜잭션 객체에 `signatures`을 추가합니다.

[계정 업데이트](./basic.md#accountupdate) 트랜잭션의 경우 [roleAccountUpdateKey](../../../../../learn/accounts.md#roles)를 사용하거나, 그렇지 않은 경우 [RoleBasedKeyring](../caver-wallet/keyring.md#rolebasedkeyring)에서 [roleTransactionKey](../../../../../learn/accounts.md#roles)를 사용하세요. 사용자가 `index`를 정의하지 않은 경우, `transaction.sign`은 역할에서 사용하는 모든 개인키를 사용하여 트랜잭션에 서명합니다. `index`가 정의된 경우, `transaction.sign`은 주어진 인덱스에서 하나의 개인 키만 사용하여 트랜잭션에 서명합니다.

**매개변수**

| 이름      | 유형               | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Keyring | object \| string | 개인키 문자열([KlaytnWalletKey](../../../../../learn/accounts.md#klaytn-wallet-key-format) 형식도 허용) 또는 Keyring의 인스턴스([SingleKeyring](../caver-wallet/keyring.md#singlekeyring), [MultipleKeyring](../caver-wallet/keyring.md#multiplekeyring) 또는 [RoleBasedKeyring](../../../../../learn/accounts.md#roles))의 인스턴스입니다. 개인키 문자열 또는 [KlaytnWalletKey](../../../../../learn/accounts.md#klaytn-wallet-key-format)를 파라미터로 전달하면 내부적으로 Keyring 인스턴스를 생성합니다. |
| index   | Number           | (선택 사항) 사용하려는 개인키의 인덱스입니다. 인덱스는 각 역할에 대해 정의된 개인키 배열의 길이보다 작아야 합니다. 인덱스가 정의되지 않은 경우 이 메서드는 모든 개인 키를 사용합니다.                                                                                                                                                                                                                                                                                                                                                         |
| hasher  | Function         | (선택 사항) 트랜잭션의 해시를 가져올 해시 함수입니다.                                                                                                                                                                                                                                                                                                                                                                                                                                   |

**리턴 값**

`promise`는 `object`를 반환합니다: 서명된 트랜잭션입니다.

| 유형     | 설명                                                                       |
| ------ | ------------------------------------------------------------------------ |
| object | 서명된 [Transaction](#class)의 인스턴스입니다. 서명은 `transaction.signatures`에 추가됩니다. |

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

## transaction.signAsFeePayer <a href="#transaction-signasfeepayer" id="transaction-signasfeepayer"></a>

```javascript
transaction.signAsFeePayer(keyring [, index] [, hasher])
```

트랜잭션 `fee payer`로 트랜잭션에 서명하고 `Keyring`의 개인 키로 트랜잭션 객체에 `feePayerSignatures`를 추가합니다.

수수료 납부자로서 트랜잭션에 서명하려면 `Keyring`에 [roleFeePayerKey](../../../../../learn/accounts.md#roles)를 사용하세요. 사용자가 `index`를 정의하지 않은 경우, `transaction.signAsFeePayer`는 역할에서 사용하는 모든 개인 키를 사용하여 트랜잭션에 서명합니다. `index`가 정의된 경우, `transaction.signAsFeePayer`는 지정된 인덱스에서 하나의 개인 키만 사용하여 트랜잭션에 서명합니다.

`transaction.feePayer`가 정의되지 않은 경우, 지정된 Keyring의 주소는 `transaction.feePayer`로 설정됩니다.

트랜잭션 서명에 사용할 `Keyring`을 `caver.wallet`에 추가한 경우, [caver.wallet.signAsFeePayer](../caver-wallet/caver-wallet.md#caver-wallet-signasfeepayer)를 사용할 수 있습니다.

**참고** 이 기능은 '수수료 위임' 트랜잭션 또는 '비율 수수료 위임' 트랜잭션에 대해서만 작동합니다.

**매개변수**

| 이름      | 유형               | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Keyring | object \| string | 개인키 문자열([KlaytnWalletKey](../../../../../learn/accounts.md#klaytn-wallet-key-format) 형식도 허용) 또는 Keyring의 인스턴스([SingleKeyring](../caver-wallet/keyring.md#singlekeyring), [MultipleKeyring](../caver-wallet/keyring.md#multiplekeyring) 또는 [RoleBasedKeyring](../../../../../learn/accounts.md#roles))의 인스턴스입니다. 개인키 문자열 또는 [KlaytnWalletKey](../../../../../learn/accounts.md#klaytn-wallet-key-format)를 파라미터로 전달하면 내부적으로 Keyring 인스턴스를 생성합니다. |
| index   | Number           | (선택 사항) 사용하려는 개인키의 인덱스입니다. 인덱스는 각 역할에 대해 정의된 개인키 배열의 길이보다 작아야 합니다. 인덱스가 정의되지 않은 경우 이 메서드는 모든 개인 키를 사용합니다.                                                                                                                                                                                                                                                                                                                                                         |
| hasher  | Function         | (선택 사항) 트랜잭션의 해시를 가져올 해시 함수입니다.                                                                                                                                                                                                                                                                                                                                                                                                                                   |

**리턴 값**

`promise`는 `object`를 반환합니다: 서명된 트랜잭션입니다.

| 유형     | 설명                                                                               |
| ------ | -------------------------------------------------------------------------------- |
| object | 서명된 [Transaction](#class)의 인스턴스입니다. 서명은 `transaction.feePayerSignatures`에 추가됩니다. |

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

## transaction.appendSignatures <a href="#transaction-appendsignatures" id="transaction-appendsignatures"></a>

```javascript
transaction.appendSignatures(signatures)
```

트랜잭션에 `signatures`을 추가합니다.

**매개변수**

| 이름         | 유형              | 설명                                                                                                                                                                                                                                            |
| ---------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| signatures | object \| Array | 트랜잭션에 추가할 서명입니다. [SignatureData](../caver-wallet/keyring.md#signaturedata) 인스턴스 또는 [SignatureData](../caver-wallet/keyring.md#signaturedata) 인스턴스를 포함하는 배열입니다. 각 'v', 'r', 's'가 문자열 형식으로 순차적으로 정의된 배열 또는 해당 배열을 포함하는 2D 배열도 매개변수로 사용할 수 있습니다. |

**예시**

```javascript
> transaction.appendSignatures([ '0x4e44', '0x7010e...', '0x65d6b...' ])
```

## transaction.appendFeePayerSignatures <a href="#transaction-appendfeepayersignatures" id="transaction-appendfeepayersignatures"></a>

```javascript
transaction.appendFeePayerSignatures(signatures)
```

`feePayerSignatures`을 트랜잭션에 추가합니다.

**참고** 이 기능은 '수수료 위임' 트랜잭션 또는 '비율 수수료 위임' 트랜잭션에 대해서만 작동합니다.

**매개변수**

| 이름                 | 유형              | 설명                                                                                                                                                                                                                                                   |
| ------------------ | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| feePayerSignatures | object \| Array | 트랜잭션에 추가할 수수료 지불자 서명입니다. [SignatureData](../caver-wallet/keyring.md#signaturedata) 인스턴스 또는 [SignatureData](../caver-wallet/keyring.md#signaturedata) 인스턴스가 포함된 배열입니다. 각 'v', 'r', 's'가 문자열 형식으로 순차적으로 정의된 배열 또는 해당 배열을 포함하는 2D 배열도 매개변수로 사용할 수 있습니다. |

**예시**

```javascript
> transaction.appendFeePayerSignatures([ '0x4e44', '0x7010e...', '0x65d6b...' ])
```

## transaction.combineSignedRawTransactions <a href="#transaction-combinesignatures" id="transaction-combinesignatures"></a>

```javascript
transaction.combineSignedRawTransactions(rlpEncodedTxs)
```

주어진 배열에 있는 각 RLP 인코딩된 트랜잭션 문자열의 부호를 수집하여 트랜잭션 인스턴스와 결합한 후 모든 부호를 포함하는 RLP 인코딩된 트랜잭션 문자열을 반환합니다. 트랜잭션 인스턴스가 반드시 미리 서명되어야 하는 것은 아닙니다. 트랜잭션이 "수수료 위임" 또는 "비율로 위임된 수수료" 유형인 경우, `feePayerSignatures`도 병합되어 출력 RLP 인코딩된 트랜잭션 문자열에 포함됩니다.

**매개변수**

| 이름            | 유형    | 설명                            |
| ------------- | ----- | ----------------------------- |
| rlpEncodedTxs | Array | 서명된 RLP 인코딩된 트랜잭션 문자열의 배열입니다. |

**리턴 값**

| 유형     | 설명                                                                                                                         |
| ------ | -------------------------------------------------------------------------------------------------------------------------- |
| string | 모든 `signatures`(트랜잭션이 "수수료 위임" 또는 "비율로 수수료 위임" 유형인 경우 `feePayerSignatures`)을 포함하는 RLP 인코딩된 트랜잭션 문자열입니다. |

**예시**

```javascript
> transaction.combineSignedRawTransactions(['0x09f88...'])
'0x09f885018505d21dba00830f4240947b65b75d204abed71587c9e519a89277766ee1d00a9404bb86a1b16113ebe8f57071f839b002cbcbf7d0f847f845820feaa068e56f3da7fbe7a86543eb4b244ddbcb13b2d1cb9adb3ee8a4c8b046821bc492a068c29c057055f68a7860b54184bba7967bcf42b6aae12beaf9f30933e6e730c280c4c3018080'
```

## transaction.getRLPEncoding <a href="#transaction-getrlpencoding" id="transaction-getrlpencoding"></a>

```javascript
transaction.getRLPEncoding()
```

RLP 인코딩된 트랜잭션 문자열을 반환합니다.

트랜잭션 유형별로 RLP 인코딩된 문자열을 만드는 방법에 대한 자세한 내용은 [Klaytn 디자인 - 트랜잭션](../../../../../learn/transactions/transactions.md)에서 확인할 수 있습니다.

**리턴 값**

| 유형     | 설명                    |
| ------ | --------------------- |
| string | RLP 인코딩된 트랜잭션 문자열입니다. |

**예시**

```javascript
> transaction.getRLPEncoding()
'0x09f885018505d21dba00830f4240947b65b75d204abed71587c9e519a89277766ee1d00a9404bb86a1b16113ebe8f57071f839b002cbcbf7d0f847f845820feaa068e56f3da7fbe7a86543eb4b244ddbcb13b2d1cb9adb3ee8a4c8b046821bc492a068c29c057055f68a7860b54184bba7967bcf42b6aae12beaf9f30933e6e730c280c4c3018080'
```

## transaction.getRawTransaction <a href="#transaction-getrawtransaction" id="transaction-getrawtransaction"></a>

```javascript
transaction.getRawTransaction()
```

RLP 인코딩된 트랜잭션 문자열인 `rawTransaction` 문자열을 반환합니다. 이 함수는 [transaction.getRLPEncoding](#transaction-getrlpencoding)과 동일합니다.

**리턴 값**

| 유형     | 설명                    |
| ------ | --------------------- |
| string | RLP 인코딩된 트랜잭션 문자열입니다. |

**예시**

```javascript
> transaction.getRawTransaction()
'0x09f885018505d21dba00830f4240947b65b75d204abed71587c9e519a89277766ee1d00a9404bb86a1b16113ebe8f57071f839b002cbcbf7d0f847f845820feaa068e56f3da7fbe7a86543eb4b244ddbcb13b2d1cb9adb3ee8a4c8b046821bc492a068c29c057055f68a7860b54184bba7967bcf42b6aae12beaf9f30933e6e730c280c4c3018080'
```

## transaction.getTransactionHash <a href="#transaction-gettransactionhash" id="transaction-gettransactionhash"></a>

```javascript
transaction.getTransactionHash()
```

`transactionHash`를 반환합니다.

트랜잭션 유형별 트랜잭션 해시 생성 방법에 대한 자세한 내용은 [Klaytn 디자인 - 트랜잭션](../../../../../learn/transactions/transactions.md)에서 확인할 수 있습니다.

**리턴 값**

| 유형     | 설명       |
| ------ | -------- |
| string | 트랜잭션 해시. |

**예시**

```javascript
> transaction.getTransactionHash()
'0x8ac53afbba014201b02398545653683fe0536c49707fe302c59423012c0e8697'
```

## transaction.getSenderTxHash <a href="#transaction-getsendertxhash" id="transaction-getsendertxhash"></a>

```javascript
transaction.getSenderTxHash()
```

트랜잭션의 [senderTxHash](../../../../../learn/transactions/transactions.md#sendertxhash)를 반환합니다.

[senderTxHash](../../../../../learn/transactions/transactions.md#sendertxhash)는 수수료 납부자의 주소와 서명을 제외한 트랜잭션의 해시이므로 [transactionHash](#transaction-gettransactionhash)와 [senderTxHash](../../../../../learn/transactions/transactions.md#sendertxhash)는 기본 거래에 동일하게 적용됩니다.

트랜잭션 유형별로 [senderTxHash](../../../../../learn/transactions/transactions.md#sendertxhash)를 만드는 방법에 대한 자세한 내용은 [Klaytn 디자인 - 트랜잭션](../../../../../learn/transactions/transactions.md) 문서를 참고하시기 바랍니다.

**리턴 값**

| 유형     | 설명            |
| ------ | ------------- |
| string | senderTxHash. |

**예시**

```javascript
> transaction.getSenderTxHash()
'0xb61cc1ddadb6f2ec34c9f9e6a7b6cf0a606422654d649d998587c77daa3c31fe'
```

## transaction.getRLPEncodingForSignature <a href="#transaction-getrlpencodingforsignature" id="transaction-getrlpencodingforsignature"></a>

```javascript
transaction.getRLPEncodingForSignature()
```

트랜잭션 발신자의 서명을 만들기 위해 RLP로 인코딩된 트랜잭션 문자열을 반환합니다. 반환된 RLP 인코딩된 트랜잭션 문자열은 서명과 함께 추가되지 않고 이 서명을 생성하는 데 사용됩니다.

트랜잭션 유형별로 트랜잭션 발신자의 서명을 생성하기 위해 RLP 인코딩된 트랜잭션 문자열을 만드는 방법에 대한 자세한 내용은 [Klaytn 디자인 - 트랜잭션](../../../../../learn/transactions/transactions.md)에서 확인할 수 있습니다.

**리턴 값**

| 유형     | 설명                                |
| ------ | --------------------------------- |
| string | 서명이 첨부되지 않은 RLP 인코딩된 트랜잭션 문자열입니다. |

**예시**

```javascript
> transaction.getRLPEncodingForSignature()
'0xf83fb838f709018505d21dba00830f4240947b65b75d204abed71587c9e519a89277766ee1d00a9404bb86a1b16113ebe8f57071f839b002cbcbf7d08207e38080'
```

## transaction.getRLPEncodingForFeePayerSignature <a href="#transaction-getrlpencodingforfeepayersignature" id="transaction-getrlpencodingforfeepayersignature"></a>

```javascript
transaction.getRLPEncodingForFeePayerSignature()
```

수수료 납부자의 서명을 만들기 위해 RLP로 인코딩된 트랜잭션 문자열을 반환합니다. 반환된 RLP 인코딩된 트랜잭션 문자열은 서명과 함께 추가되지 않고 이 서명을 생성하는 데 사용됩니다.

각 트랜잭션 유형에 대한 수수료 납부자의 서명을 생성하기 위해 RLP 인코딩된 트랜잭션 문자열을 만드는 방법에 대한 자세한 내용은 [Klaytn 디자인 - 트랜잭션](../../../../../learn/transactions/transactions.md)에서 확인할 수 있습니다.

**참고** 이 기능은 '수수료 위임' 트랜잭션 또는 '비율 수수료 위임' 트랜잭션에 대해서만 작동합니다.

**리턴 값**

| 유형     | 설명                                |
| ------ | --------------------------------- |
| string | 서명이 첨부되지 않은 RLP 인코딩된 트랜잭션 문자열입니다. |

**예시**

```javascript
> transaction.getRLPEncodingForFeePayerSignature()
'0xf840b838f709018505d21dba00830f4240947b65b75d204abed71587c9e519a89277766ee1d00a9404bb86a1b16113ebe8f57071f839b002cbcbf7d0808207e38080'
```

## transaction.fillTransaction <a href="#transaction-filltransaction" id="transaction-filltransaction"></a>

```javascript
transaction.fillTransaction()
```

트랜잭션의 선택적 변수를 채웁니다.

트랜잭션의 `gasPrice`, `nonce` 또는 `chainId`가 정의되지 않은 경우, 이 메서드는 이 옵션 변수의 기본값을 묻고 연결된 Klaytn 노드에 JSON RPC 호출을 전송하여 미리 설정합니다.

[caver.rpc.klay.getGasPrice](../caver-rpc/klay.md#caver-rpc-klay-getgasprice)를 사용하여 `gasPrice`를, [caver.rpc.klay.getTransactionCount](../caver-rpc/klay.md#caver-rpc-klay-gettransactioncount)를 호출하여 `nonce`를, [caver.rpc.klay.getChainId](../caver-rpc/klay.md#caver-rpc-klay-getchainid)를 호출하여 `chainId`를 가져옵니다.

**리턴 값**

`Promise`는 `void`를 반환합니다.

**예시**

```javascript
> transaction.fillTransaction()
```

## transaction.recoverPublicKeys <a href="#transaction-recoverpublickeys" id="transaction-recoverpublickeys"></a>

```javascript
transaction.recoverPublicKeys()
```

`signatures` 필드에서 공개키 문자열을 복구합니다.

**참고** `transaction.recoverPublicKeys`는 caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3) 부터 지원됩니다.

**리턴 값**

| 유형    | 설명                                 |
| ----- | ---------------------------------- |
| Array | `signatures`에서 복구한 공개키가 포함된 배열입니다. |

**예시**

```javascript
> transaction.recoverPublicKeys()
[
  '0x8bb6aaeb2d96d024754d3b50babf116cece68977acbe8ba6a66f14d5217c60d96af020a0568661e7c72e753e80efe084a3aed9f9ac87bf44d09ce67aad3d4e01',
  '0xc7751c794337a93e4db041fb5401c2c816cf0a099d8fd4b1f3f555aab5dfead2417521bb0c03d8637f350df15ef6a6cb3cdb806bd9d10bc71982dd03ff5d9ddd',
  '0x3919091ba17c106dd034af508cfe00b963d173dffab2c7702890e25a96d107ca1bb4f148ee1984751e57d2435468558193ce84ab9a7731b842e9672e40dc0f22'
]
```

## transaction.recoverFeePayerPublicKeys <a href="#transaction-recoverfeepayerpublickeys" id="transaction-recoverfeepayerpublickeys"></a>

```javascript
transaction.recoverFeePayerPublicKeys()
```

`feePayerSignatures` 필드에서 공개 키 문자열을 복구합니다.

**참고** `transaction.recoverFeePayerPublicKeys`는 caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3) 부터 지원됩니다.

**리턴 값**

| 유형    | 설명                                         |
| ----- | ------------------------------------------ |
| Array | `feePayerSignatures`에서 복구한 공개키가 포함된 배열입니다. |

**예시**

```javascript
> transaction.recoverFeePayerPublicKeys()
[
  '0x2b557d80ddac3a0bbcc8a7861773ca7434c969e2721a574bb94a1e3aa5ceed3819f08a82b31682c038f9f691fb38ee4aaf7e016e2c973a1bd1e48a51f60a54ea',
  '0x1a1cfe1e2ec4b15520c57c20c2460981a2f16003c8db11a0afc282abf929fa1c1868f60f91b330c423aa660913d86acc2a0b1b15e7ba1fe571e5928a19825a7e',
  '0xdea23a89dbbde1a0c26466c49c1edd32785432389641797038c2b53815cb5c73d6cf5355986fd9a22a68bb57b831857fd1636362b383bd632966392714b60d72'
]
```

## transaction.suggestGasPrice <a href="#transaction-suggestgasprice" id="transaction-suggestgasprice"></a>

```javascript
transaction.suggestGasPrice()
```

추천 가스 가격을 반환합니다. 이 함수는 [fillTransaction](#transaction-fillTransaction)에서 가스 가격 필드를 설정하는 데 사용됩니다.

Magma 하드포크 이전에는 `suggestGasPrice`가 네트워크의 단가를 반환합니다. Magma 하드포크 이후 `suggestGasPrice`는 `baseFee * 2`를 반환하며, 이는 가스 프라이스로 사용하는 것을 권장합니다.

**참고** `transaction.suggestGasPrice`는 caver-js [v1.9.0](https://www.npmjs.com/package/caver-js/v/1.9.0) 부터 지원됩니다.

**리턴 값**

`Promise`는 `string`을 반환합니다: 16진수 문자열로 제안된 가스 가격입니다.

| 유형     | 설명             |
| ------ | -------------- |
| string | 제안된 gas 가격입니다. |

**예시**

```javascript
> tx.suggestGasPrice().then(console.log)
0xba43b7400
```
