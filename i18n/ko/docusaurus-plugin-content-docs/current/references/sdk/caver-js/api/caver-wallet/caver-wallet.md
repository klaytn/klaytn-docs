# caver.wallet

`caver.wallet`은 인메모리 지갑에서 [Keyring](./keyring.md) 인스턴스를 관리하는 패키지입니다. `caver.wallet`은 모든 [SingleKeyring](./keyring.md#singlekeyring), [MultipleKeyring](./keyring.md#multiplekeyring), [RoleBasedKeyring](./keyring.md#rolebasedkeyring)을 수용하여 주소별로 관리합니다.

## Class <a href="#class" id="class"></a>

### KeyringContainer <a href="#keyringcontainer" id="keyringcontainer"></a>

```javascript
caver.wallet
```

`KeyringContainer`는 [SingleKeyring](./keyring.md#singlekeyring), [MultipleKeyring](./keyring.md#multiplekeyring), [RoleBasedKeyring](./keyring.md#rolebasedkeyring) 인스턴스를 관리하는 클래스에 해당하는 인스턴스입니다. Caver가 인스턴스화되면 `caver.wallet`에 KeyringContainer 인스턴스를 생성합니다. `caver.wallet`을 통해 인메모리 지갑에 Keyring 인스턴스를 저장하고 관리할 수 있습니다.

**속성**

| 이름     | 유형     | 설명                                  |
| ------ | ------ | ----------------------------------- |
| length | Number | keyringContainer에 있는 Keyring의 수입니다. |

## caver.wallet.generate <a href="#caver-wallet-generate" id="caver-wallet-generate"></a>

```javascript
caver.wallet.generate(numberOfKeyrings [, entropy])
```

무작위로 생성된 개인 키를 사용하여 keyringContainer에 [SingleKeyring](./keyring.md#singlekeyring)의 인스턴스를 생성합니다.

**매개변수**

| 이름               | 유형     | 설명                                                         |
| ---------------- | ------ | ---------------------------------------------------------- |
| numberOfKeyrings | Number | 생성할 [SingleKeyring](./keyring.md#singlekeyring) 인스턴스 수입니다. |
| entropy          | String | (선택 사항) 엔트로피를 증가시킬 임의의 문자열입니다.          |

**리턴 값**

| 유형    | 설명                 |
| ----- | ------------------ |
| Array | 생성된 주소가 포함된 배열입니다. |

**예시**

```javascript
// generate without entropy
> caver.wallet.generate(3)
[
    '0xb4b0c3781082cf818bfaf5adfc73fdf59d92c1cd',
    '0x9957dfd92e4b70f91131c573293343bc5f21f215',
    '0xed2fe179c18fa528da2392532998560bd1008511'
]

// generate with entropy
> caver.wallet.generate(3, caver.utils.randomHex(32))
[
    '0xb4b0c3781082cf818bfaf5adfc73fdf59d92c1cd',
    '0x9957dfd92e4b70f91131c573293343bc5f21f215',
    '0xed2fe179c18fa528da2392532998560bd1008511'
]
```

## caver.wallet.newKeyring <a href="#caver-wallet-newkeyring" id="caver-wallet-newkeyring"></a>

```javascript
caver.wallet.newKeyring(address, key)
```

주어진 매개변수로 Keyring 인스턴스를 생성하고 `caver.wallet`에 추가합니다.

`key`가 개인키 문자열인 경우, 단일 개인키를 사용하는 [SingleKeyring](./keyring.md#singlekeyring) 인스턴스가 만들어집니다. `key`가 개인키 문자열을 포함하는 배열이면 여러 개인키를 사용하는 [MultipleKeyring](./keyring.md#multiplekeyring) 인스턴스가 만들어집니다. `key`가 각 요소에 각 역할에 사용할 개인키가 포함된 2D 배열인 경우, [RoleBasedKeyring](./keyring.md#rolebasedkeyring) 인스턴스가 만들어집니다. 생성된 Keyring은 `caver.wallet`에 추가됩니다.

**매개변수**

| 이름      | 유형              | 설명                                                                                                      |
| ------- | --------------- | ------------------------------------------------------------------------------------------------------- |
| address | String          | 주소 문자열입니다.                                                                                              |
| Key     | string \| Array | 개인 키 문자열, 개인 키 배열 또는 각 배열 요소에 각 [role](../../../../../learn/accounts.md#roles)에 대해 정의된 키가 포함된 2D 배열입니다. |

**리턴 값**

| 유형     | 설명                                                                                                                                                                                                           |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| object | caver.wallet에 추가된 Keyring 인스턴스([SingleKeyring](./keyring.md#singlekeyring), [MultipleKeyring](./keyring.md#multiplekeyring) 또는 [RoleBasedKeyring](./keyring.md#rolebasedkeyring))가 반환됩니다. |

**예시**

```javascript
// Create a instance of SingleKeyring and add to caver.wallet
> caver.wallet.newKeyring('0x{address in hex}', '0x{private key}')
SingleKeyring {
    _address: '0x386a4bb40abbfaa59cecdc3ced202475895fd569',
    _key: PrivateKey { _privateKey: '0x{private key}' }
}

// Create a instance of MultipleKeyring and add to caver.wallet
> caver.wallet.newKeyring('0x{address in hex}', ['0x{private key1}', '0x{private key2}'])
MultipleKeyring {
    _address: '0x17e7531b40ad5d7b5fa7b4ec78df64ce1cb36d24',
    _keys: [ 
        PrivateKey { _privateKey: '0x{private key1}' },
        PrivateKey { _privateKey: '0x{private key2}' }
    ]
}

// Create a instance of RoleBasedKeyring and add to caver.wallet
> const roleBasedKeys = [
    ['0x{private key1}', '0x{private key2}'],
    ['0x{private key3}', '0x{private key4}'],
    ['0x{private key5}', '0x{private key6}'],
]
> caver.wallet.newKeyring('0x{address in hex}', roleBasedKeys)
RoleBasedKeyring {
    _address: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _keys: [
        [
            PrivateKey { _privateKey: '0x{private key1}' },
            PrivateKey { _privateKey: '0x{private key2}' }
        ],
        [ 
            PrivateKey { _privateKey: '0x{private key3}' },
            PrivateKey { _privateKey: '0x{private key4}' }
        ],
        [ 
            PrivateKey { _privateKey: '0x{private key5}' },
            PrivateKey { _privateKey: '0x{private key6}' }
        ]
    ]
}
```

## caver.wallet.updateKeyring <a href="#caver-wallet-updatekeyring" id="caver-wallet-updatekeyring"></a>

```javascript
caver.wallet.updateKeyring(keyring)
```

`caver.wallet` 내부의 Keyring을 업데이트합니다. 새로운 `keyring` 인스턴스([SingleKeyring](./keyring.md#singlekeyring), [MultipleKeyring](./keyring.md#multiplekeyring) 또는 [RoleBasedKeyring](./keyring.md#rolebasedkeyring))가 파라미터로 전달되면 `caver.wallet`에 저장된 기존 Keyring 중 주어진 `keyring` 인스턴스의 `address` 속성과 일치하는 것을 찾아서 지정된 것으로 대체합니다. 일치하는 Keyring을 찾지 못하면 에러가 발생합니다.

**매개변수**

| 이름      | 유형     | 설명                                                                                                                                                                                                          |
| ------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Keyring | object | `caver.wallet`에 저장할 새 Keyring([SingleKeyring](./keyring.md#singlekeyring), [MultipleKeyring](./keyring.md#multiplekeyring) 또는 [RoleBasedKeyring](./keyring.md#rolebasedkeyring))을 입력합니다. |

**리턴 값**

| 유형     | 설명                                                                                                                                                                                                              |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| object | 업데이트된 Keyring([SingleKeyring](./keyring.md#singlekeyring), [MultipleKeyring](./keyring.md#multiplekeyring) 또는 [RoleBasedKeyring](./keyring.md#rolebasedkeyring))이 `caver.wallet`에 저장되어 있습니다. |

**예시**

```javascript
> caver.wallet.updateKeyring(newKeyring)
SingleKeyring {
    _address: '0x386a4bb40abbfaa59cecdc3ced202475895fd569',
    _key: PrivateKey { _privateKey: '0x{private key}' }
}
```

## caver.wallet.getKeyring <a href="#caver-wallet-getkeyring" id="caver-wallet-getkeyring"></a>

```javascript
caver.wallet.getKeyring(address)
```

`caver.wallet`의 주소에 해당하는 Keyring 인스턴스를 반환합니다.

**매개변수**

| 이름      | 유형     | 설명                  |
| ------- | ------ | ------------------- |
| address | String | 쿼리할 Keyring의 주소입니다. |

**리턴 값**

| 유형     | 설명                                                                                                                                                                                                             |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| object | `caver.wallet`에 저장된 검색된 Keyring 인스턴스([SingleKeyring](./keyring.md#singlekeyring), [MultipleKeyring](./keyring.md#multiplekeyring) 또는 [RoleBasedKeyring](./keyring.md#rolebasedkeyring))입니다. |

**예시**

```javascript
> caver.wallet.getKeyring('0x386a4bb40abbfaa59cecdc3ced202475895fd569')
SingleKeyring {
    _address: '0x386a4bb40abbfaa59cecdc3ced202475895fd569',
    _key: PrivateKey { _privateKey: '0x{private key}' }
}
```

## caver.wallet.isExisted <a href="#caver-wallet-isexisted" id="caver-wallet-isexisted"></a>

```javascript
caver.wallet.isExisted(address)
```

주소와 일치하는 Keyring이 있으면 `true`를 반환합니다.

**매개변수**

| 이름      | 유형     | 설명                         |
| ------- | ------ | -------------------------- |
| address | String | 존재 여부를 확인할 Keyring의 주소입니다. |

**리턴 값**

| 유형   | 설명                                                    |
| ---- | ----------------------------------------------------- |
| bool | `true`는 주소와 일치하는 Keyring이 `caver.wallet`에 존재함을 의미합니다. |

**예시**

```javascript
> caver.wallet.isExisted('0x386a4bb40abbfaa59cecdc3ced202475895fd569')
true
```

## caver.wallet.add <a href="#caver-wallet-add" id="caver-wallet-add"></a>

```javascript
caver.wallet.add(keyring)
```

`caver.wallet`에 Keyring 인스턴스를 추가합니다. 새로 주어진 Keyring이 `caver.wallet`에 이미 존재하는 Keyring 중 하나와 주소가 같으면 에러가 반환됩니다. 이 경우, [updateKeyring](#caver-wallet-updatekeyring)을 사용하여 `caver.wallet`에 있는 기존 Keyring을 업데이트하세요.

**매개변수**

| 이름      | 유형     | 설명                                                                                                                                                                                                         |
| ------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Keyring | object | `caver.wallet`에 추가할 Keyring 인스턴스([SingleKeyring](./keyring.md#singlekeyring), [MultipleKeyring](./keyring.md#multiplekeyring) 또는 [RoleBasedKeyring](./keyring.md#rolebasedkeyring))입니다. |

**리턴 값**

| 유형     | 설명                                                                                                                                                                                                    |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| object | `caver.wallet`에 추가된 Keyring([SingleKeyring](./keyring.md#singlekeyring), [MultipleKeyring](./keyring.md#multiplekeyring) 또는 [RoleBasedKeyring](./keyring.md#rolebasedkeyring))입니다. |

**예시**

```javascript
> caver.wallet.add(keyring)
SingleKeyring {
    _address: '0x386a4bb40abbfaa59cecdc3ced202475895fd569',
    _key: PrivateKey { _privateKey: '0x{private key}' }
}
```

## caver.wallet.remove <a href="#caver-wallet-remove" id="caver-wallet-remove"></a>

```javascript
caver.wallet.remove(address)
```

주어진 Keyring의 주소와 일치하는 주소가 있는 `caver.wallet`에서 Keyring을 삭제합니다.

**매개변수**

| 이름      | 유형     | 설명                                   |
| ------- | ------ | ------------------------------------ |
| address | String | `caver.wallet`에서 삭제할 Keyring의 주소입니다. |

**리턴 값**

| 유형   | 설명                                     |
| ---- | -------------------------------------- |
| bool | `caver.wallet`에서 Keyring이 제거되면 `true`. |

**예시**

```javascript
> caver.wallet.remove('0x6a3edfad6d1126020d5369e9097db39281876c5d')
true
```

## caver.wallet.signMessage <a href="#caver-wallet-signmessage" id="caver-wallet-signmessage"></a>

```javascript
caver.wallet.signMessage(address, message, role [, index])
```

caver.wallet에 저장된 Keyring을 사용하여 클레이튼 전용 접두사로 메시지에 서명합니다. 이를 통해 클레이튼 전용 서명을 계산합니다:

```
sign(keccak256("\x19Klaytn Signed Message:\n" + len(message) + message)))
```

사용자가 인덱스 매개변수를 제공하지 않은 경우, `caver.wallet.signMessage`는 역할에서 사용하는 모든 개인키를 사용하여 메시지에 서명합니다. 인덱스 매개변수를 제공한 경우, `caver.wallet.signMessage`는 주어진 인덱스에서 하나의 개인키만 사용하여 메시지에 서명합니다. caver-js에서 사용되는 역할은 `caver.wallet.keyring.role`에서 확인할 수 있습니다.

**매개변수**

| 이름      | 유형     | 설명                                                                                                                           |
| ------- | ------ | ---------------------------------------------------------------------------------------------------------------------------- |
| address | String | 사용할 Keyring의 주소입니다.                                                                                                          |
| message | String | 서명할 메시지입니다.                                                                                                                  |
| role    | Number | 키의 역할을 나타내는 숫자입니다. `caver.wallet.keyring.role`을 사용할 수 있습니다.                                                                  |
| index   | Number | (선택 사항) 사용하려는 개인키의 인덱스입니다. 인덱스는 각 역할에 대해 정의된 개인키 배열의 길이보다 작아야 합니다. 인덱스가 정의되지 않은 경우 이 메서드는 모든 개인 키를 사용합니다. |

**리턴 값**

| 유형     | 설명                 |
| ------ | ------------------ |
| object | 서명 결과를 포함하는 개체입니다. |

반환된 객체에는 다음이 포함됩니다:

| 이름          | 유형     | 설명                                                  |
| ----------- | ------ | --------------------------------------------------- |
| messageHash | String | 클레이튼 전용 접두사가 있는 메시지의 해시입니다.                         |
| signatures  | Array  | [SignatureData](./keyring.md#signaturedata)의 배열입니다. |
| message     | String | 서명할 메시지입니다.                                         |

**예시**

```javascript
// Sign message with roleTransactionKey which uses two private keys
> caver.wallet.signMessage('0x386a4bb40abbfaa59cecdc3ced202475895fd569', 'message to sign', caver.wallet.keyring.role.roleTransactionKey)
{
    messageHash: '0x9c4c1ae0aa1faf7e59eaf6fcf36a34542698197b379a9949b58c92925e74c069',
    signatures: [
        SignatureData { _v: '0x1c', _r: '0xb3239...', _s: '0x584d2...' },
        SignatureData { _v: '0x1b', _r: '0x13c64...', _s: '0x60c61...' }
    ],
    message: 'message to sign'
}

// Sign message with roleTransactionKey and index
> caver.wallet.signMessage('0x386a4bb40abbfaa59cecdc3ced202475895fd569', 'message to sign', caver.wallet.keyring.role.roleTransactionKey, 1)
{
    messageHash: '0x9c4c1ae0aa1faf7e59eaf6fcf36a34542698197b379a9949b58c92925e74c069',
    signatures: [
        SignatureData { _v: '0x1b', _r: '0x13c64...', _s: '0x60c61...' }
    ],
    message: 'message to sign'
}
```

## caver.wallet.sign <a href="#caver-wallet-sign" id="caver-wallet-sign"></a>

```javascript
caver.wallet.sign(address, transaction [, index] [, hasher])
```

트랜잭션의 `sender`로 트랜잭션에 서명하고 `caver.wallet`의 Keyring을 사용하여 트랜잭션 객체에 `signatures`을 추가합니다.

[계정 업데이트](../caver-transaction/basic.md#accountupdate) 트랜잭션의 경우, [roleTransactionKey](../../../../../learn/accounts.md#roles)를 사용하고, 그렇지 않은 경우 [roleTransactionKey](../../../../../learn/accounts.md#roles)를 사용하세요. 사용자가 `index`를 정의하지 않은 경우, `caver.wallet.sign`은 역할에서 사용하는 모든 개인 키를 사용하여 트랜잭션에 서명합니다. `index`가 정의된 경우, `caver.wallet.sign`은 주어진 인덱스에서 하나의 개인 키만 사용하여 트랜잭션에 서명합니다.

**매개변수**

| 이름           | 유형       | 설명                                                                                                                                                                                                                   |
| ------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address      | String   | 사용할 Keyring의 주소입니다.                                                                                                                                                                                                  |
| transactions | object   | [Transaction](../caver-transaction/caver-transaction.md#class)의 인스턴스입니다.                                                                                                                                             |
| index        | Number   | (선택 사항) 사용하려는 개인키의 인덱스입니다. 인덱스는 각 역할에 대해 정의된 개인 키 배열의 길이보다 작아야 합니다. 인덱스가 정의되지 않은 경우 이 메서드는 모든 개인 키를 사용합니다.                                                                                        |
| 해시어          | Function | (선택 사항) 트랜잭션 해시를 가져오는 해시 함수입니다. 매개변수로 `hasher`를 지정하면 caver-js에 구현된 트랜잭션 해시 계산의 기본 방법 대신 트랜잭션 해시를 계산합니다. 트랜잭션 해시 생성 기본 메서드에 대한 자세한 내용은 [Basic](../../../../../learn/transactions/basic.md)를 참고하세요. |

**리턴 값**

`promise`는 `object`를 반환합니다: 서명된 트랜잭션입니다.

| 유형     | 설명                                                  |
| ------ | --------------------------------------------------- |
| object | 서명된 트랜잭션 인스턴스. 서명은 `transaction.signatures`에 추가됩니다. |

트랜잭션 유형별 필드에 대한 자세한 내용은 [caver.transaction](../caver-transaction/caver-transaction.md)를 참조하세요.

**예시**

```javascript
// This example uses the ValueTransfer transaction.
// Please refer to [caver.transaction] for how to use various transaction types.
> const transaction = caver.transaction.valueTransfer.create({
    from: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    value: 1,
    gas: 30000,
})

> const customHasher = () => { ... }

// Sign a transaction with the address of RoleBasedKeyring which use two private keys for roleTransactionKey
> caver.wallet.sign('0xe7e9184c125020af5d34eab7848bab799a1dcba9', transaction).then(console.log)
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

// Sign a transaction with the address of RoleBasedKeyring which use two private keys for roleTransactionKey and index
> caver.wallet.sign('0xe7e9184c125020af5d34eab7848bab799a1dcba9', transaction, 1).then(console.log)
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

// Sign a transaction with the address of RoleBasedKeyring which use two private keys for roleTransactionKey and hasher
> caver.wallet.sign('0xe7e9184c125020af5d34eab7848bab799a1dcba9', transaction, customHasher).then(console.log)
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

// Sign a transaction with the address of RoleBasedKeyring which use two private keys for roleTransactionKey, index and hasher
> caver.wallet.sign('0xe7e9184c125020af5d34eab7848bab799a1dcba9', transaction, 0, customHasher).then(console.log)
ValueTransfer {
    _type: 'TxTypeValueTransfer',
    _from: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _gas: '0x7530',
    _signatures: [
        SignatureData { _v: '0x4e44', _r: '0x7a8b6...', _s: '0x17139...' }
    ],
    _to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    _value: '0x1',
    _chainId: '0x2710',
    _gasPrice: '0x5d21dba00',
    _nonce: '0x0'
}
```

## caver.wallet.signAsFeePayer <a href="#caver-wallet-signasfeepayer" id="caver-wallet-signasfeepayer"></a>

```javascript
caver.wallet.signAsFeePayer(address, transaction [, index] [, hasher])
```

트랜잭션의 `fee payer`로 트랜잭션에 서명하고 `caver.wallet`의 Keyring을 사용하여 트랜잭션 객체에 `feePayerSignatures`를 추가합니다.

수수료 납부자로서 트랜잭션에 서명하려면 [roleFeePayerKey](../../../../../learn/accounts.md#roles)를 사용하세요. 사용자가 `index`를 정의하지 않은 경우, `caver.wallet.signAsFeePayer`는 역할이 사용하는 모든 개인 키를 사용하여 트랜잭션에 서명합니다. `index`가 정의된 경우, `caver.wallet.signAsFeePayer`는 주어진 인덱스에서 하나의 개인 키만 사용하여 트랜잭션에 서명합니다.

`transaction.feePayer`가 정의되지 않은 경우 `caver.wallet`에서 생성된 Keyring의 주소가 할당됩니다.

**매개변수**

| 이름           | 유형       | 설명                                                                                                                           |
| ------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| address      | String   | 사용할 Keyring의 주소입니다.                                                                                                          |
| transactions | object   | [FeeDelegatedTransaction](../caver-transaction/fee-delegation.md)의 인스턴스입니다.                                                  |
| index        | Number   | (선택 사항) 사용하려는 개인키의 인덱스입니다. 인덱스는 각 역할에 대해 정의된 개인키 배열의 길이보다 작아야 합니다. 인덱스가 정의되지 않은 경우 이 메서드는 모든 개인 키를 사용합니다. |
| hash         | Function | (선택 사항) 트랜잭션 해시를 가져오는 함수입니다. hasher가 파라미터로 정의된 경우 caver-js의 기본 구현 대신 트랜잭션 해시를 가져오는 데 사용됩니다.               |

**리턴 값**

`promise`는 `object`를 반환합니다: 서명된 트랜잭션입니다.

| 유형     | 설명                                                                |
| ------ | ----------------------------------------------------------------- |
| object | 서명된 트랜잭션 인스턴스입니다. 서명 결과는 `transaction.feePayerSignatures`에 추가됩니다. |

트랜잭션 유형별 필드에 대한 자세한 내용은 [caver.transaction](../caver-transaction/caver-transaction.md)를 참조하세요.

**예시**

```javascript
// This example uses the FeeDelegatedValueTransfer transaction.
// Please refer to [caver.transaction] for how to use various transaction types.
> const transaction = caver.transaction.feeDelegatedValueTransfer.create({
    from: '0x6fddbcb99d31b8755c2b840a367f53eea4b4f45c',
    to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    value: 1,
    gas: 30000,
})

> const customHasher = () => { ... }

// Sign a transaction with the address of RoleBasedKeyring which use two private keys for roleFeePayerKey
> caver.wallet.signAsFeePayer('0xe7e9184c125020af5d34eab7848bab799a1dcba9', transaction).then(console.log)
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

// Sign a transaction with the address of RoleBasedKeyring which use two private keys for roleFeePayerKey, index
> caver.wallet.signAsFeePayer('0xe7e9184c125020af5d34eab7848bab799a1dcba9', transaction, 0).then(console.log)
FeeDelegatedValueTransfer {
    _type: 'TxTypeFeeDelegatedValueTransfer',
    _from: '0x6fddbcb99d31b8755c2b840a367f53eea4b4f45c',
    _gas: '0x7530',
    _signatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
    _feePayer: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _feePayerSignatures: [
        SignatureData { _v: '0x4e44', _r: '0x7010e...', _s: '0x65d6b...' }
    ],
    _to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    _value: '0x1',
    _chainId: '0x2710',
    _gasPrice: '0x5d21dba00',
    _nonce: '0x0'
}

// Sign a transaction with the address of RoleBasedKeyring which use two private keys for roleFeePayerKey and hasher
> caver.wallet.signAsFeePayer('0xe7e9184c125020af5d34eab7848bab799a1dcba9', transaction, customHasher).then(console.log)
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
> caver.wallet.signAsFeePayer('0xe7e9184c125020af5d34eab7848bab799a1dcba9', transaction, 0, customHasher).then(console.log)
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
