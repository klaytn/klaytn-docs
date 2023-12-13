# caver.wallet.keyring

`caver.wallet.keyring`은 주소와 개인키를 포함한 Keyring 관련 기능을 제공하는 패키지입니다.

## Class <a href="#class" id="class"></a>

`Keyring`은 계정의 주소와 개인키를 담고 있는 구조체입니다. 사용자가 자신의 [클레이튼 계정](../../../../../learn/accounts.md#klaytn-accounts)을 사용하여 로그인할 수 있도록 하는 caver-js의 클래스입니다.

`Keyring`은 저장하는 키의 종류에 따라 세 가지 유형으로 분류할 수 있습니다: 하나의 주소와 하나의 개인키를 저장하는 [SingleKeyring](#singlekeyring), 하나의 주소와 여러 개인키를 저장하는 [MultipleKeyring](#multiplekeyring), 각 역할별로 하나의 주소와 하나 이상의 개인키를 저장하는 [RoleBasedKeyring](#rolebasedkeyring)입니다.

* [SingleKeyring](#singlekeyring): 사용자가 하나의 개인 키로 서명
* [MultipleKeyring](#multiplekeyring): 사용자가 여러 개인 키로 서명
* [RoleBasedKeyring](#rolebasedkeyring): 사용자가 역할별 개인 키로 서명합니다.

### SingleKeyring <a href="#singlekeyring" id="singlekeyring"></a>

```javascript
const keyring = new caver.wallet.keyring.singleKeyring(address, key)
```

`SingleKeyring`은 계정의 `address`와 `private `key`를 저장하는 클래스입니다. 개인키 문자열로 SingleKeyring 인스턴스를 생성하려면 [caver.wallet.keyring.create](#caver-wallet-keyring-create)를 참고하시기 바랍니다.

`SingleKeyring`은 역할이 할당되지 않은 개인키를 사용합니다.

**속성**

| 이름 | 유형 | 설명
| ------- | ----------------------------------- | ------------------------------------------------------------------------------------- |
| address | String | 계정의 주소입니다.                                                           |
| Key | [PrivateKey](#privatekey) | 내부에 하나의 개인키가 포함된 [PrivateKey](#privatekey)의 인스턴스입니다. |

### MultipleKeyring <a href="#multiplekeyring" id="multiplekeyring"></a>

```javascript
const keyring = new caver.wallet.keyring.multipleKeyring(address, keys)
```

`MultipleKeyring`은 계정의 `address`와 여러 개의 `private `key`를 저장하는 클래스입니다. 개인키 문자열로 MultipleKeyring 인스턴스를 생성하려면 [caver.wallet.keyring.create](#caver-wallet-keyring-create)를 참조하시기 바랍니다.

`MultipleKeyring`은 역할이 할당되지 않은 개인 키를 사용합니다.

**속성**

| 이름 | 유형 | 설명
| ------- | ------ | -------------------------------------------------------------------------------------------- |
| address | String | 계정의 주소입니다.                                                                  |
| keys | Array | 내부에 하나의 개인키를 포함하는 [PrivateKey](#privatekey) 인스턴스의 배열입니다. |

### RoleBasedKeyring <a href="#rolebasedkeyring" id="rolebasedkeyring"></a>

```javascript
const keyring = new caver.wallet.keyring.roleBasedKeyring(address, keys)
```

`RoleBasedKeyring`은 계정의 `address`와 각 역할에 사용할 `private `key`를 배열 형태로 저장하는 클래스입니다.

`RoleBasedKeyring`은 각 [role](../../../../../learn/accounts.md#roles)에 대한 여러 키를 포함할 수 있는 2차원 배열(빈 `key`는 `[ [], [], [] ]`처럼 보입니다)로 구현되는 `key`를 정의합니다. 첫 번째 배열 요소는 `roleTransactionKey`에 대한 개인 키를 정의하고, 두 번째 요소는 `roleAccountUpdateKey`에 대한 개인 키를 정의하며, 세 번째 요소는 `roleFeePayerKey`에 대한 개인 키를 정의합니다.

**속성**

| 이름 | 유형 | 설명
| ------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address | String | 계정의 주소입니다.                                                                                                                                                                                                                                                                                                                                                       |
| Key | Array | 각 [role](../../../../../learn/accounts.md#roles)에 사용되는 키를 정의하는 2차원 배열입니다. 각 [role](../../../../../learn/accounts.md#roles)에는 [PrivateKey](#privatekey) 인스턴스가 포함됩니다. 첫 번째 요소는 `roleTransactionKey`입니다. 두 번째 요소는 `roleAccountUpdateKey`입니다. 마지막 요소는 `roleFeePayerKey`입니다. |

아래는 각 역할에 정의된 키를 직관적으로 사용할 수 있도록 Keyring에 정의된 게터입니다. 각 역할에 사용되는 키는 아래의 게터를 통해 더 쉽게 접근할 수 있습니다.

| 이름 | 유형 | 설명
| -------------------- | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| roleTransactionKey | Array | 트랜잭션 서명에 사용된 RoleTransaction 키입니다(계정 업데이트용 트랜잭션 제외). `keyring.roleTransactionkey`는 `keys` 속성의 첫 번째 요소를 반환합니다. |
| roleAccountUpdateKey | Array | 계정 업데이트 트랜잭션에 서명하는 데 사용되는 roleAccountUpdateKey입니다. `keyring.roleAccountUpdateKey`는 `keys` 속성의 두 번째 요소를 반환합니다.                              |
| roleFeePayerKey | Array | 수수료 납부자로서 트랜잭션에 서명하는 데 사용되는 역할 수수료 납부자 키입니다. `keyring.roleFeePayerKey`는 `keys` 속성의 세 번째 요소를 반환합니다.                                         |

### PrivateKey <a href="#privatekey" id="privatekey"></a>

```javascript
const privateKey = new caver.wallet.keyring.privateKey('0x{private key}')
```

`PrivateKey`는 개인 키 문자열을 포함하는 클래스입니다. Keyring의 각 역할에 사용되는 개인 키는 이 `PrivateKey` 인스턴스로 정의됩니다.

**속성**

| 이름 | 유형 | 설명
| ---------- | ------ | ----------------------- |
| privateKey | String | 개인키 문자열입니다. |

### SignatureData <a href="#signaturedata" id="signaturedata"></a>

`SignatureData`는 내부에 서명 데이터를 포함하는 클래스입니다. `sign` 또는 `signMessage`의 결과인 서명은 signatureData로 반환됩니다. 아래와 같이 signatureData 내부에 서명이 어떻게 포함되어 있는지 확인할 수 있습니다.

```javascript
const signature = new caver.wallet.keyring.signatureData(['0x1b', '0x2dfc6...', '0x15038...'])
```

**속성**

| 이름 | 유형 | 설명
| ---- | ------ | ------------------ |
| v | String | ECDSA 복구 ID. |
| r | String | ECDSA 서명 r. |
| s | String | ECDSA 서명 s. |

## caver.wallet.keyring.generate <a href="#caver-wallet-keyring-generate" id="caver-wallet-keyring-generate"></a>

```javascript
caver.wallet.keyring.generate([entropy])
```

무작위로 생성된 개인 키로 싱글키잉 인스턴스를 생성합니다.

**매개변수**

| 이름 | 유형 | 설명
| ------- | ------ | ----------------------------------------------- |
| entropy | String | (선택 사항) 엔트로피를 높이기 위한 임의의 문자열입니다. |

**리턴 값**

| 유형 | 설명 |
| ----------------------------------------- | --------------------------------------------------------- |
| [SingleKeyring](#singlekeyring) | 무작위로 생성된 단일 Keyring 인스턴스가 반환됩니다. |

**예시**

```javascript
> caver.wallet.keyring.generate()
SingleKeyring {
    _address: '0x8ecdfda0281f0d36518f89e0e2444c4f98b2e718',
    _key: PrivateKey { _privateKey: '0x{private key}' }
}
```

## caver.wallet.keyring.generateSingleKey <a href="#caver-wallet-keyring-generatesinglekey" id="caver-wallet-keyring-generatesinglekey"></a>

```javascript
caver.wallet.keyring.generateSingleKey([entropy])
```

개인 키 문자열을 생성합니다.

**매개변수**

| 이름 | 유형 | 설명
| ------- | ------ | ----------------------------------------------- |
| entropy | String | (선택 사항) 엔트로피를 높이기 위한 임의의 문자열입니다. |

**리턴 값**

| 유형 | 설명 |
| ------ | ----------------------------------- |
| string | 개인 키 문자열이 반환됩니다. |

**예시**

```javascript
> caver.wallet.keyring.generateSingleKey()
'0x{private key}'
```

## caver.wallet.keyring.generateMultipleKeys <a href="#caver-wallet-keyring-generatemultiplekeys" id="caver-wallet-keyring-generatemultiplekeys"></a>

```javascript
caver.wallet.keyring.generateMultipleKeys(num [, entropy])
```

개인 키 문자열을 생성합니다.

**매개변수**

| 이름 | 유형 | 설명
| ------- | ------ | ----------------------------------------------- |
| number | Number | 개인키 문자열의 수입니다.              |
| entropy | String | (선택 사항) 엔트로피를 높이기 위한 임의의 문자열입니다. |

**리턴 값**

| 유형 | 설명 |
| ----- | ------------------------------------------------------- |
| Array | 개인 키 문자열이 포함된 배열이 반환됩니다. |

**예시**

```javascript
> caver.wallet.keyring.generateMultipleKeys(3)
[
    '0x{private key1}',
    '0x{private key2}',
    '0x{private key3}'
]
```

## caver.wallet.keyring.generateRoleBasedKeys <a href="#caver-wallet-keyring-generaterolebasedkeys" id="caver-wallet-keyring-generaterolebasedkeys"></a>

```javascript
caver.wallet.keyring.generateRoleBasedKeys(numArray [, entropy])
```

각 배열 요소에 각 [role](../../../../../learn/accounts.md#roles)에 대해 정의된 키가 포함된 2D 배열을 생성합니다.

**매개변수**

| 이름 | 유형 | 설명
| -------- | ------ | ------------------------------------------------------------------------------------------------------- |
| numArray | Array | 각 [role](../../../../../learn/accounts.md#roles)에 대한 키 수가 포함된 배열입니다. |
| entropy | String | (선택 사항) 엔트로피를 높이기 위한 임의의 문자열입니다.                                                         |

**리턴 값**

| 유형 | 설명 |
| ----- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Array | 각 배열 요소에 각 [role](../../../../../learn/accounts.md#roles)에 대해 정의된 키가 포함된 2D 배열이 반환됩니다. |

**예시**

```javascript
> caver.wallet.keyring.generateRoleBasedKeys([2, 1, 3])
[
    [
        '0x{private key1}',
        '0x{private key2}'
    ],
    [
        '0x{private key3}'
    ],
    [
        '0x{private key4}',
        '0x{private key5}',
        '0x{private key6}'
    ]
]
```

## caver.wallet.keyring.create <a href="#caver-wallet-keyring-create" id="caver-wallet-keyring-create"></a>

```javascript
caver.wallet.keyring.create(address, key)
```

매개변수가 있는 Keyring 인스턴스를 생성합니다.

`key`가 개인키 문자열인 경우, 단일 개인키를 사용하는 [SingleKeyring](#singlekeyring) 인스턴스가 생성됩니다. `key`가 개인키 문자열을 포함하는 배열인 경우 여러 개인키를 사용하는 [MultipleKeyring](#multiplekeyring) 인스턴스가 생성됩니다. `key`가 각 요소에 각 역할에 사용할 개인키가 포함된 2D 배열인 경우, [RoleBasedKeyring](#rolebasedkeyring) 인스턴스가 만들어집니다.

**매개변수**

| 이름 | 유형 | 설명
| ------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address | String | Keyring의 주소입니다.                                                                                                                                                            |
| Key | string \| Array | 개인 키 문자열, 개인 키 배열 또는 각 요소에 각 [role](../../../../../learn/accounts.md#roles)에 사용할 키가 포함된 2D 배열입니다. |

**리턴 값**

| 유형 | 설명 |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Keyring` | Keyring 인스턴스가 반환됩니다. `key` 매개변수에 따라 [SingleKeyring](#singlekeyring), [MultipleKeyring](#multiplekeyring) 또는 [RoleBasedKeyring](#rolebasedkeyring)이 될 수 있습니다. |

**예시**

```javascript
// Create singleKeyring which uses one private key
> caver.wallet.keyring.create('0x{address in hex}', '0x{private key}')
SingleKeyring {
    _address: '0x30fcfa9679c7141a234c1324c7e0a8b715bdfc90',
    _key: PrivateKey { _privateKey: '0x{private key}' }
}

// Create multipleKeyring which uses multiple private keys
> caver.wallet.keyring.create('0x{address in hex}', ['0x{private key1}', '0x{private key2}'])
MultipleKeyring {
    _address: '0x30fcfa9679c7141a234c1324c7e0a8b715bdfc90',
    _keys: [
        PrivateKey { _privateKey: '0x{private key1}' },
        PrivateKey { _privateKey: '0x{private key2}' }
    ]
}

// Create roleBasedKeyring which uses different private key(s) by roles
> const roleBasedKeys = [
    ['0x{private key1}', '0x{private key2}'],
    ['0x{private key3}', '0x{private key4}'],
    ['0x{private key5}', '0x{private key6}'],
]
> caver.wallet.keyring.create('0x{address in hex}', roleBasedKeys)
RoleBasedKeyring {
    _address: '0x30fcfa9679c7141a234c1324c7e0a8b715bdfc90',
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

## caver.wallet.keyring.createFromPrivateKey <a href="#caver-wallet-keyring-createfromprivatekey" id="caver-wallet-keyring-createfromprivatekey"></a>

```javascript
caver.wallet.keyring.createFromPrivateKey(key)
```

개인키 문자열 또는 [KlaytnWalletKey](../../../../../learn/accounts.md#klaytn-wallet-key-format)에서 `SingleKeyring` 인스턴스를 생성합니다.

**매개변수**

| 이름 | 유형 | 설명
| ---- | ------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| Key | String | 이 파라미터는 개인키 또는 [KlaytnWalletKey](../../../../../learn/accounts.md#klaytn-wallet-key-format) 중 하나만 입력할 수 있습니다. |

**리턴 값**

| 유형 | 설명 |
| ----------------------------------------- | --------------------------------------- |
| [SingleKeyring](#singlekeyring) | SingleKeyring 인스턴스가 반환됩니다. |

**예시**

```javascript
// Create singleKeyring from private key string
> caver.wallet.keyring.createFromPrivateKey('0x{private key}')
SingleKeyring {
    _address: '0xaa7b43f2eab01cfd787b07ce2f2fb5d6d20a8aa0',
    _key: PrivateKey { _privateKey: '0x{private key}' }
}

// Create singleKeyring from KlaytnWalletKey
> caver.wallet.keyring.createFromPrivateKey('0x{private key}0x{type}0x{address in hex}')
SingleKeyring {
    _address: '0xaa7b43f2eab01cfd787b07ce2f2fb5d6d20a8aa0',
    _key: PrivateKey { _privateKey: '0x{private key}' }
}
```

## caver.wallet.keyring.createFromKlaytnWalletKey <a href="#caver-wallet-keyring-createfromklaytnwalletkey" id="caver-wallet-keyring-createfromklaytnwalletkey"></a>

```javascript
caver.wallet.keyring.createFromKlaytnWalletKey(klaytnWalletKey)
```

[KlaytnWalletKey](../../../../../learn/accounts.md#klaytn-wallet-key-format) 문자열에서 `SingleKeyring` 인스턴스를 생성합니다.

**매개변수**

| 이름 | 유형 | 설명
| --------------- | ------ | ------------------------------------------------------------------------------------------------ |
| klaytnWalletKey | String | [KlaytnWalletKey](../../../../../learn/accounts.md#klaytn-wallet-key-format) 문자열입니다. |

**리턴 값**

| 유형 | 설명 |
| ----------------------------------------- | --------------------------------------- |
| [SingleKeyring](#singlekeyring) | SingleKeyring 인스턴스가 반환됩니다. |

**예시**

```javascript
> caver.wallet.keyring.createFromKlaytnWalletKey('0x{private key}0x{type}0x{address in hex}')
SingleKeyring {
    _address: '0xaa7b43f2eab01cfd787b07ce2f2fb5d6d20a8aa0',
    _key: PrivateKey { _privateKey: '0x{private key}' }
}
```

## caver.wallet.keyring.createWithSingleKey <a href="#caver-wallet-keyring-createwithsinglekey" id="caver-wallet-keyring-createwithsinglekey"></a>

```javascript
caver.wallet.keyring.createWithSingleKey(address, key)
```

주소와 개인키 문자열에서 `SingleKeyring` 인스턴스를 생성합니다.

**매개변수**

| 이름 | 유형 | 설명
| ------- | ------ | --------------------------------------------- |
| address | String | Keyring을 만드는 데 사용할 주소입니다. |
| Key | String | 개인 키 문자열입니다.                         |

**리턴 값**

| 유형 | 설명 |
| ----------------------------------------- | --------------------------------------- |
| [SingleKeyring](#singlekeyring) | SingleKeyring 인스턴스가 반환됩니다. |

**예시**

```javascript
> caver.wallet.keyring.createWithSingleKey('0x{address in hex}', '0x{private key}')
SingleKeyring {
    _address: '0xaa7b43f2eab01cfd787b07ce2f2fb5d6d20a8aa0',
    _key: PrivateKey { _privateKey: '0x{private key}' }
}
```

## caver.wallet.keyring.createWithMultipleKey <a href="#caver-wallet-keyring-createwithmultiplekey" id="caver-wallet-keyring-createwithmultiplekey"></a>

```javascript
caver.wallet.keyring.createWithMultipleKey(address, key)
```

주소와 개인키 문자열에서 `MultipleKeyring` 인스턴스를 생성합니다.

**매개변수**

| 이름 | 유형 | 설명
| -------- | ------ | -------------------------------- |
| address | String | Keyring의 주소입니다.           |
| keyArray | Array | 개인 키 문자열 배열입니다. |

**리턴 값**

| 유형 | 설명 |
| --------------------------------------------- | ----------------------------------------- |
| [MultipleKeyring](#multiplekeyring) | MultipleKeyring 인스턴스가 반환됩니다. |

**예시**

```javascript
> caver.wallet.keyring.createWithMultipleKey('0x{address in hex}', ['0x{private key1}', '0x{private key2}' ])
MultipleKeyring {
    _address: '0x30fcfa9679c7141a234c1324c7e0a8b715bdfc90',
    _keys: [
        PrivateKey { _privateKey: '0x{private key1}' },
        PrivateKey { _privateKey: '0x{private key2}' }
    ]
}
```

## caver.wallet.keyring.createWithRoleBasedKey <a href="#caver-wallet-keyring-createwithrolebasedkey" id="caver-wallet-keyring-createwithrolebasedkey"></a>

```javascript
caver.wallet.keyring.createWithRoleBasedKey(address, roledBasedKeyArray)
```

주소와 각 배열 요소가 각 [role](../../../../../learn/accounts.md#roles)에 대해 정의된 키를 포함하는 2D 배열에서 `RoleBasedKeyring` 인스턴스를 생성합니다.

**매개변수**

| 이름 | 유형 | 설명
| ------------------ | ------ | ------------------------------------------------------------------------------- |
| address | String | Keyring의 주소입니다.                                                          |
| roledBasedKeyArray | Array | 각 역할에 대한 개인 키 문자열 배열이 포함된 2차원 배열입니다. |

**리턴 값**

| 유형 | 설명 |
| ----------------------------------------------- | ------------------------------------------ |
| [RoleBasedKeyring](#rolebasedkeyring) | RoleBasedKeyring 인스턴스가 반환됩니다. |

**예시**

```javascript
> const roleBasedKeys = [
    ['0x{private key1}', '0x{private key2}'],
    ['0x{private key3}', '0x{private key4}'],
    ['0x{private key5}', '0x{private key6}'],
]
> caver.wallet.keyring.createWithRoleBasedKey('0x{address in hex}', roleBasedKeys)
RoleBasedKeyring {
    _address: '0x30fcfa9679c7141a234c1324c7e0a8b715bdfc90',
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

## caver.wallet.keyring.decrypt <a href="#caver-wallet-keyring-decrypt" id="caver-wallet-keyring-decrypt"></a>

```javascript
caver.wallet.keyring.decrypt(keystore, password)
```

키스토어 v3 또는 v4 JSON을 복호화하고 복호화된 Keyring 인스턴스를 반환합니다.

**매개변수**

| 이름 | 유형 | 설명
| -------- | ------ | --------------------------------- |
| keystore | Object | 복호화할 키 저장소 v3 또는 v4입니다. |
| password | String | 암호화에 사용되는 비밀번호입니다. |

**리턴 값**

| 유형 | 설명 |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Keyring` | 복호화된 Keyring 인스턴스([SingleKeyring](#singlekeyring), [MultipleKeyring](#multiplekeyring) 또는 [RoleBasedKeyring](#rolebasedkeyring))입니다. |

**예시**

```javascript
// Decrypt keystroe v4 (encrypted single keyring)
> caver.wallet.keyring.decrypt({ 
    version: 4,
    id: '9c12de05-0153-41c7-a8b7-849472eb5de7',
    address: '0xc02cec4d0346bf4124deeb55c5216a4138a40a8c',
    keyring: [
        { 
            ciphertext: 'eacf496cea5e80eca291251b3743bf93cdbcf7072efc3a74efeaf518e2796b15',
            cipherparams: { iv: 'd688a4319342e872cefcf51aef3ec2da' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: {
                dklen: 32,
                salt: 'c3cee502c7157e0faa42386c6d666116ffcdf093c345166c502e23bc34e6ba40',
                n: 4096,
                r: 8,
                p: 1
            },
            mac: '4b49574f3d3356fa0d04f73e07d5a2a6bbfdd185bedfa31f37f347bc98f2ef26'
        }
    ]
}, 'password')
SingleKeyring {
    _address: '0xc02cec4d0346bf4124deeb55c5216a4138a40a8c',
    _key: PrivateKey { _privateKey: '0x{private key}' }
}

// Decrypt keystroe v4 (encrypted multiple keyring)
> caver.wallet.keyring.decrypt({
    version: 4,
    id: '55da3f9c-6444-4fc1-abfa-f2eabfc57501',
    address: '0x86bce8c859f5f304aa30adb89f2f7b6ee5a0d6e2',
    keyring: [
        {
            ciphertext: '93dd2c777abd9b80a0be8e1eb9739cbf27c127621a5d3f81e7779e47d3bb22f6',
            cipherparams: { iv: '84f90907f3f54f53d19cbd6ae1496b86' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: {
                dklen: 32,
                salt: '69bf176a136c67a39d131912fb1e0ada4be0ed9f882448e1557b5c4233006e10',
                n: 4096,
                r: 8,
                p: 1,
            },
            mac: '8f6d1d234f4a87162cf3de0c7fb1d4a8421cd8f5a97b86b1a8e576ffc1eb52d2',
        },
        {
            ciphertext: '53d50b4e86b550b26919d9b8cea762cd3c637dfe4f2a0f18995d3401ead839a6',
            cipherparams: { iv: 'd7a6f63558996a9f99e7daabd289aa2c' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: {
                dklen: 32,
                salt: '966116898d90c3e53ea09e4850a71e16df9533c1f9e1b2e1a9edec781e1ad44f',
                n: 4096,
                r: 8,
                p: 1,
            },
            mac: 'bca7125e17565c672a110ace9a25755847d42b81aa7df4bb8f5ce01ef7213295',
        },
    ],
}, 'password')
MultipleKeyring {
    _address: '0x86bce8c859f5f304aa30adb89f2f7b6ee5a0d6e2',
    _keys: [
        PrivateKey { _privateKey: '0x{private key1}' },
        PrivateKey { _privateKey: '0x{private key2}' }
    ]
}

// Decrypt keystroe v4 (encrypted role-based keyring)
> caver.wallet.keyring.decrypt({
    version: 4,
    id: '55da3f9c-6444-4fc1-abfa-f2eabfc57501',
    address: '0x86bce8c859f5f304aa30adb89f2f7b6ee5a0d6e2',
    keyring: [
        [
            {
                ciphertext: '93dd2c777abd9b80a0be8e1eb9739cbf27c127621a5d3f81e7779e47d3bb22f6',
                cipherparams: { iv: '84f90907f3f54f53d19cbd6ae1496b86' },
                cipher: 'aes-128-ctr',
                kdf: 'scrypt',
                kdfparams: {
                    dklen: 32,
                    salt: '69bf176a136c67a39d131912fb1e0ada4be0ed9f882448e1557b5c4233006e10',
                    n: 4096,
                    r: 8,
                    p: 1,
                },
                mac: '8f6d1d234f4a87162cf3de0c7fb1d4a8421cd8f5a97b86b1a8e576ffc1eb52d2',
            },
            {
                ciphertext: '53d50b4e86b550b26919d9b8cea762cd3c637dfe4f2a0f18995d3401ead839a6',
                cipherparams: { iv: 'd7a6f63558996a9f99e7daabd289aa2c' },
                cipher: 'aes-128-ctr',
                kdf: 'scrypt',
                kdfparams: {
                    dklen: 32,
                    salt: '966116898d90c3e53ea09e4850a71e16df9533c1f9e1b2e1a9edec781e1ad44f',
                    n: 4096,
                    r: 8,
                    p: 1,
                },
                mac: 'bca7125e17565c672a110ace9a25755847d42b81aa7df4bb8f5ce01ef7213295',
            },
        ],
        [
            {
                ciphertext: 'f16def98a70bb2dae053f791882f3254c66d63416633b8d91c2848893e7876ce',
                cipherparams: { iv: 'f5006128a4c53bc02cada64d095c15cf' },
                cipher: 'aes-128-ctr',
                kdf: 'scrypt',
                kdfparams: {
                    dklen: 32,
                    salt: '0d8a2f71f79c4880e43ff0795f6841a24cb18838b3ca8ecaeb0cda72da9a72ce',
                    n: 4096,
                    r: 8,
                    p: 1,
                },
                mac: '38b79276c3805b9d2ff5fbabf1b9d4ead295151b95401c1e54aed782502fc90a',
            },
        ],
        [
            {
                ciphertext: '544dbcc327942a6a52ad6a7d537e4459506afc700a6da4e8edebd62fb3dd55ee',
                cipherparams: { iv: '05dd5d25ad6426e026818b6fa9b25818' },
                cipher: 'aes-128-ctr',
                kdf: 'scrypt',
                kdfparams: {
                    dklen: 32,
                    salt: '3a9003c1527f65c772c54c6056a38b0048c2e2d58dc0e584a1d867f2039a25aa',
                    n: 4096,
                    r: 8,
                    p: 1,
                },
                mac: '19a698b51409cc9ac22d63d329b1201af3c89a04a1faea3111eec4ca97f2e00f',
            },
            {
                ciphertext: 'dd6b920f02cbcf5998ed205f8867ddbd9b6b088add8dfe1774a9fda29ff3920b',
                cipherparams: { iv: 'ac04c0f4559dad80dc86c975d1ef7067' },
                cipher: 'aes-128-ctr',
                kdf: 'scrypt',
                kdfparams: {
                    dklen: 32,
                    salt: '22279c6dbcc706d7daa120022a236cfe149496dca8232b0f8159d1df999569d6',
                    n: 4096,
                    r: 8,
                    p: 1,
                },
                mac: '1c54f7378fa279a49a2f790a0adb683defad8535a21bdf2f3dadc48a7bddf517',
            },
        ],
    ],
}, 'password')
RoleBasedKeyring {
    _address: '0x86bce8c859f5f304aa30adb89f2f7b6ee5a0d6e2',
    _keys: [
        [
            PrivateKey { _privateKey: '0x{private key1}' },
            PrivateKey { _privateKey: '0x{private key2}' }
        ],
        [
            PrivateKey { _privateKey: '0x{private key3}' }
        ],
        [
            PrivateKey { _privateKey: '0x{private key4}' },
            PrivateKey { _privateKey: '0x{private key5}' }
        ]
    ]
}

// Decrypt keystroe v3 JSON
> caver.wallet.keyring.decrypt({ 
    version: 3,
    id: '43f99d36-3905-40e6-bff8-ff0dfc380037',
    address: '0xc02cec4d0346bf4124deeb55c5216a4138a40a8c',
    crypto: {
        ciphertext: 'f7296e68807837a5318502c097276a89d58d91b85e45e692aee284a27bcd0955',
        cipherparams: { iv: '03fd985d07777601078840c73cc6f7f3' },
        cipher: 'aes-128-ctr',
        kdf: 'scrypt',
        kdfparams: {
            dklen: 32,
            salt: '46f85271c43fa64ab3338c5235f1d5073bc9379d9b7ba6065c89afb816d83a8a',
            n: 4096,
            r: 8,
            p: 1
        },
     mac: '947f13cd1481fa5ba186e59418ef7600fa69e9830054d59e4d5dc67176e1f967'
    }
}, 'password')
SingleKeyring {
    _address: '0xc02cec4d0346bf4124deeb55c5216a4138a40a8c',
    _key: PrivateKey { _privateKey: '0x{private key}' }
}
```

## keyring.getPublicKey <a href="#keyring-getpublickey" id="keyring-getpublickey"></a>

```javascript
keyring.getPublicKey()
```

공개 키 문자열을 반환합니다. `keyring`이 [SingleKeyring](#singlekeyring)의 인스턴스인 경우, getPublicKey는 공개키 문자열을 반환합니다. `keyring`이 [MultipleKeyring](#multiplekeyring)의 인스턴스인 경우, getPublicKey는 공개 키 문자열 배열을 반환합니다. `keyring`이 [RoleBasedKeyring](#rolebasedkeyring)의 인스턴스인 경우, getPublicKey는 각 역할에 사용되는 공개키가 배열로 정의된 2차원 배열을 반환합니다.

**매개변수**

| 이름 | 유형 | 설명
| ---------- | ------- | ------------------------------------------------------------------ |
| compressed | Boolean | (선택 사항) 압축 형식인지 여부(기본값: `false`). |

**리턴 값**

| 유형 | 설명 |
| --------------- | ------------------------------ |
| string \| Array | Keyring의 공개 키입니다. |

**예시**

```javascript
// Get public key with singleKeyring
> keyring.getPublicKey()
'0x49b2a...'

// Get public key with multipleKeyring
> keyring.getPublicKey()
[ '0x65b51...', '0x8d85c...' ]

// Get public key with roleBasedKeyring
> keyring.getPublicKey()
[
    [ '0x2d939...', '0x6beb4...', '0xd8f2f...' ],
    [ '0xf09cd...', '0x96a63...', '0x02000...' ],
    [ '0xc2d33...', '0x3088f...', '0xab193...' ]
]
```

## keyring.copy <a href="#keyring-copy" id="keyring-copy"></a>

```javascript
keyring.copy()
```

복사된 Keyring 인스턴스를 반환합니다.

**리턴 값**

| 유형 | 설명 |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Keyring` | 복사된 Keyring 인스턴스 ([SingleKeyring](#singlekeyring), [MultipleKeyring](#multiplekeyring) 또는 [RoleBasedKeyring](#rolebasedkeyring))입니다. |

**예시**

```javascript
// When keyring is an instance of SingleKeyring
> keyring.copy()
SingleKeyring {
    _address: '0x30fcfa9679c7141a234c1324c7e0a8b715bdfc90',
    _key: PrivateKey { _privateKey: '0x{private key}' }
}

// When keyring is an instance of MultipleKeyring
> keyring.copy()
MultipleKeyring {
    _address: '0x30fcfa9679c7141a234c1324c7e0a8b715bdfc90',
    _keys: [
        PrivateKey { _privateKey: '0x{private key1}' },
        PrivateKey { _privateKey: '0x{private key2}' }
    ]
}

// When keyring is an instance of RoleBasedKeyring
> keyring.copy()
RoleBasedKeyring {
    _address: '0x30fcfa9679c7141a234c1324c7e0a8b715bdfc90',
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

## keyring.sign <a href="#keyring-sign" id="keyring-sign"></a>

```javascript
keyring.sign(transactionHash, chainId, role [, index])
```

트랜잭션 해시를 사용하여 개인 키로 서명하고 서명을 반환합니다. 사용자가 인덱스 매개변수를 정의하지 않은 경우, `keyring.sign`은 역할에서 사용하는 모든 개인 키를 사용하여 트랜잭션에 서명합니다. `index`가 정의된 경우 `keyring.sign`은 인덱스에서 하나의 개인 키만 사용하여 트랜잭션에 서명합니다. caver-js에서 사용되는 역할은 `caver.wallet.keyring.role`을 통해 확인할 수 있습니다.

트랜잭션에 서명할 때는 [caver.wallet.sign](./caver-wallet.md#caver-wallet-sign) 또는 [transaction.sign](../caver-transaction/caver-transaction.md#transaction-sign)을 사용하는 것을 권장합니다.

**매개변수**

| 이름 | 유형 | 설명
| --------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| transactionHash | String | 서명할 트랜잭션의 해시 문자열입니다.                                                                                                                                                                                      |
| chainId | string \| number | 클레이튼 블록체인 플랫폼의 체인 아이디입니다.                                                                                                                                                                                |
| role | Number | 키의 역할을 나타내는 숫자입니다. `caver.wallet.keyring.role`을 사용할 수 있습니다.                                                                                                                                              |
| index | Number | (선택 사항) 사용하려는 개인키의 인덱스입니다. 인덱스는 각 역할에 대해 정의된 개인키 배열의 길이보다 작아야 합니다. 인덱스가 정의되지 않은 경우 이 메서드는 모든 개인 키를 사용합니다. |

**리턴 값**

| 유형 | 설명 |
| ----- | ------------------------------------------------------ |
| Array | [SignatureData](#signaturedata)의 배열입니다. |

**예시**

```javascript
// Using roleBasedKeyring which has two private key in roleTransactionKey
> keyring.sign('0xe9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550', '0x2810', caver.wallet.keyring.role.roleTransactionKey)
[
    SignatureData { _v: '0x5044', _r: '0x7a8b6...', _s: '0x17139...' },
    SignatureData { _v: '0x5043', _r: '0x7f978...', _s: '0x1a532...' }
]

// Using roleBasedKeyring which has two private key in roleTransactionKey with index
> keyring.sign('0xe9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550', '0x2810', caver.wallet.keyring.role.roleTransactionKey, 1)
[
    SignatureData { _v: '0x5043', _r: '0x7f978...', _s: '0x1a532...' }
]

// Using roleBasedKeyring which has two private key in roleAccountUpdateKey
> keyring.sign('0xe9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550', '0x2810', caver.wallet.keyring.role.roleAccountUpdateKey)
[
    SignatureData { _v: '0x5044', _r: '0xdbce8...', _s: '0x039a6...' },
    SignatureData { _v: '0x5044', _r: '0xf69b7...', _s: '0x71dc9...' }
]

// Using roleBasedKeyring which has two private key in roleAccountUpdateKey with index
> keyring.sign('0xe9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550', '0x2810', caver.wallet.keyring.role.roleAccountUpdateKey, 1)
[
    SignatureData { _v: '0x5044', _r: '0xf69b7...', _s: '0x71dc9...' }
]

// Using roleBasedKeyring which has two private key in roleFeePayerKey
> keyring.sign('0xe9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550', '0x2810', caver.wallet.keyring.role.roleFeePayerKey)
[
    SignatureData { _v: '0x5043', _r: '0xe48bf...', _s: '0x1cf36...' },
    SignatureData { _v: '0x5043', _r: '0x82976...', _s: '0x3c5e0...' }
]

// Using roleBasedKeyring which has two private key in roleFeePayerKey with index
> keyring.sign('0xe9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550', '0x2810', caver.wallet.keyring.role.roleFeePayerKey, 1)
[
    SignatureData { _v: '0x5043', _r: '0x82976...', _s: '0x3c5e0...' }
]
```

## keyring.ecsign <a href="#keyring-ecsign" id="keyring-ecsign"></a>

```javascript
keyring.ecsign(hash, role [, index])
```

개인 키를 사용하여 해시된 데이터로 서명하고 V가 0 또는 1(secp256k1 곡선의 y값 패리티)인 서명을 반환합니다.

이 함수는 특정 트랜잭션 유형에만 사용됩니다. 따라서 트랜잭션에 서명할 때는 [caver.wallet.sign](./caver-wallet.md#caver-wallet-sign) 또는 [transaction.sign](../caver-transaction/caver-transaction.md#transaction-sign)을 사용하는 것을 권장합니다.

**매개변수**

| 이름 | 유형 | 설명
| ----- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| hash | String | 서명할 해시 문자열입니다.                                                                                                                                                                                                       |
| role | Number | 키의 역할을 나타내는 숫자입니다. `caver.wallet.keyring.role`을 사용할 수 있습니다.                                                                                                                                              |
| index | Number | (선택 사항) 사용하려는 개인키의 인덱스입니다. 인덱스는 각 역할에 대해 정의된 개인키 배열의 길이보다 작아야 합니다. 인덱스가 정의되지 않은 경우 이 메서드는 모든 개인 키를 사용합니다. |

**리턴 값**

| 유형 | 설명 |
| ----- | ------------------------------------------------------ |
| Array | [SignatureData](#signaturedata)의 배열입니다. |

**예시**

```javascript
> keyring.ecsign('0xe9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550', caver.wallet.keyring.role.roleTransactionKey)
[
    SignatureData { _v: '0x00', _r: '0x7a8b6...', _s: '0x17139...' }
]
```

## keyring.signMessage <a href="#keyring-signmessage" id="keyring-signmessage"></a>

```javascript
keyring.signMessage(message, role [, index])
```

클레이튼 전용 접두사로 메시지에 서명합니다. 클레이튼 전용 서명을 계산합니다:

```
sign(keccak256("\x19Klaytn Signed Message:\n" + len(message) + message)))
```

사용자가 인덱스 매개변수를 정의하지 않은 경우 `keyring.signMessage`는 역할에서 사용하는 모든 개인 키로 메시지에 서명합니다. 인덱스 매개변수를 지정한 경우, `keyring.signMessage`는 지정된 인덱스에서 하나의 개인키만 사용하여 메시지에 서명합니다. caver-js에서 사용되는 역할은 `caver.wallet.keyring.role`을 통해 확인할 수 있습니다.

**매개변수**

| 이름 | 유형 | 설명
| ------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| message | String | 서명할 메시지입니다.                                                                                                                                                                                                           |
| role | Number | 키의 역할을 나타내는 숫자입니다. `caver.wallet.keyring.role`을 사용할 수 있습니다.                                                                                                                                              |
| index | Number | (선택 사항) 사용하려는 개인키의 인덱스입니다. 인덱스는 각 역할에 대해 정의된 개인키 배열의 길이보다 작아야 합니다. 인덱스가 정의되지 않은 경우 이 메서드는 모든 개인 키를 사용합니다. |

**리턴 값**

| 유형 | 설명 |
| ------ | ---------------------------------------------- |
| object | 서명 결과를 포함하는 개체입니다. |

반환된 객체에는 다음이 포함됩니다:

| 이름 | 유형 | 설명
| ----------- | ------ | ------------------------------------------------------ |
| messageHash | String | 클레이튼 전용 접두사가 있는 메시지의 해시입니다.       |
| signatures | Array | [SignatureData](#signaturedata)의 배열입니다. |
| message | String | 서명할 메시지입니다.                                   |

**예시**

```javascript
// Sign with roleTransactionKey
> keyring.signMessage('message to sign', caver.wallet.keyring.role.roleTransactionKey)
{
    messageHash: '0x9c4c1ae0aa1faf7e59eaf6fcf36a34542698197b379a9949b58c92925e74c069',
    signatures: [
        SignatureData { _v: '0x1b', _r: '0x2dfc6...', _s: '0x15038...' }
    ],
    message: 'message to sign'
}

// Sign with roleFeePayerKey and index
> keyring.signMessage('message to sign', caver.wallet.keyring.role.roleFeePayerKey, 1)
{
    messageHash: '0x9c4c1ae0aa1faf7e59eaf6fcf36a34542698197b379a9949b58c92925e74c069',
    signatures: [
        SignatureData { _v: '0x1b', _r: '0x2dfc6...', _s: '0x15038...' }
    ],
    message: 'message to sign'
}
```

## keyring.getKeyByRole <a href="#keyring-getkeybyrole" id="keyring-getkeybyrole"></a>

```javascript
keyring.getKeyByRole(role)
```

매개변수로 입력한 역할이 사용하는 개인키를 반환합니다.

**매개변수**

| 이름 | 유형 | 설명
| ---- | ------ | --------------------------------------------------------------------------------- |
| role | Number | 키의 역할을 나타내는 숫자입니다. `caver.wallet.keyring.role`을 사용할 수 있습니다. |

**리턴 값**

| 유형 | 설명 |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| [PrivateKey](#privatekey) \| Array | [PrivateKey](#privatekey)의 인스턴스 또는 역할에서 사용하는 [PrivateKey](#privatekey) 인스턴스가 포함된 배열입니다. |

**예시**

```javascript
// getKeyByRole with singleKeyring. 
// The singleKeyring will return the single same PrivateKey intance regardless of role.
> keyring.getKeyByRole(caver.wallet.keyring.role.roleTransactionKey)
PrivateKey { _privateKey: '0x{private key}' }

> keyring.getKeyByRole(caver.wallet.keyring.role.roleAccountUpdateKey)
PrivateKey { _privateKey: '0x{private key}' }

> keyring.getKeyByRole(caver.wallet.keyring.role.roleFeePayerKey)
PrivateKey { _privateKey: '0x{private key}' }

// getKeyByRole with multipleKeyring. 
// The multipleKeyring will also return the single same array of PrivateKey intances regardless of role
> keyring.getKeyByRole(caver.wallet.keyring.role.roleTransactionKey)
[
    PrivateKey { _privateKey: '0x{private key1}' },
    PrivateKey { _privateKey: '0x{private key2}' }
]

> keyring.getKeyByRole(caver.wallet.keyring.role.roleAccountUpdateKey)
[
    PrivateKey { _privateKey: '0x{private key1}' },
    PrivateKey { _privateKey: '0x{private key2}' }
]

> keyring.getKeyByRole(caver.wallet.keyring.role.roleFeePayerKey)
[
    PrivateKey { _privateKey: '0x{private key1}' },
    PrivateKey { _privateKey: '0x{private key2}' }
]

// getKeyByRole with roleBasedKeyring. 
// The roleBasedKeyring will return different array of PrivateKey intances depends on role
> keyring.getKeyByRole(caver.wallet.keyring.role.roleTransactionKey)
[
    PrivateKey { _privateKey: '0x{private key1}' }
]

> keyring.getKeyByRole(caver.wallet.keyring.role.roleAccountUpdateKey)
[
    PrivateKey { _privateKey: '0x{private key2}' },
    PrivateKey { _privateKey: '0x{private key3}' }
]

> keyring.getKeyByRole(caver.wallet.keyring.role.roleFeePayerKey)
[
    PrivateKey { _privateKey: '0x{private key4}' },
    PrivateKey { _privateKey: '0x{private key5}' },
    PrivateKey { _privateKey: '0x{private key6}' }
]
```

## keyring.getKlaytnWalletKey <a href="#keyring-getklaytnwalletkey" id="keyring-getklaytnwalletkey"></a>

```javascript
keyring.getKlaytnWalletKey()
```

Keyring에 대한 [KlaytnWalletKey](../../../../../learn/accounts.md#klaytn-wallet-key-format) 문자열을 반환합니다. [MultipleKeyring](#multiplekeyring) 또는 [RoleBasedKeyring](#rolebasedkeyring)의 경우, [KlaytnWalletKey](../../../../../learn/accounts.md#klaytn-wallet-key-format)를 사용할 수 없습니다. 이 경우, [Keyring.암호화](#keyring-encrypt)를 사용하세요.

**리턴 값**

| 유형 | 설명 |
| ------ | -------------------------------------------------------------------------------------------------------- |
| string | Keyring의 [KlaytnWalletKey](../../../../../learn/accounts.md#klaytn-wallet-key-format)입니다. |

**예시**

```javascript
> keyring.getKlaytnWalletKey()
'0x{private key}0x{type}0x{address in hex}'
```

## keyring.toAccount <a href="#keyring-toaccount" id="keyring-toaccount"></a>

```javascript
keyring.toAccount([options])
```

[클레이튼 계정](../../../../../learn/accounts.md#klaytn-accounts)의 [AccountKey](../../../../../learn/accounts.md#account-key)를 업데이트하기 위한 [Account](../../../../../learn/accounts.md#klaytn-accounts) 인스턴스를 반환합니다. [Account](../../../../../learn/accounts.md#klaytn-accounts) 인스턴스에는 클레이튼 네트워크에 전송되어 트랜잭션 검증에 사용되는 공개키를 포함할 수 있는 [AccountKey](../caver.account.md#accountkeylegacy) 인스턴스가 있습니다. [Account](../../../../../learn/accounts.md#klaytn-accounts)에 대한 자세한 내용은 [AccountUpdate](../../../../../learn/accounts.md#klaytn-accounts)를 참고하세요.

클레이튼에 저장된 [Account](../../../../../learn/accounts.md#account-key)의 [AccountKey](../../../../../learn/accounts.md#klaytn-accounts)를 업데이트하면 이전 개인키는 더 이상 사용할 수 없으므로 주의하세요. 클레이튼에서 반환된 [Account](../../../../../learn/accounts.md#klaytn-accounts) 인스턴스를 사용하여 [클레이튼 계정](../caver.account.md#account)의 정보를 업데이트하는 방법은 [시작하기](../../../../../learn/accounts.md#klaytn-accounts)를 참고하시기 바랍니다.

Keyring에 있는 개인키의 유형에 따라 반환된 [Account](../../../../../learn/accounts.md#klaytn-accounts) 인스턴스는 다음과 같이 분류할 수 있습니다.

* Keyring에 개인키 문자열이 포함된 경우: Keyring의 주소가 포함된 [Account](../../../../../learn/accounts.md#klaytn-accounts) 인스턴스와 [AccountKeyPublic](../caver.account.md#accountkeypublic)의 인스턴스를 반환합니다.
* Keyring에 개인 키 문자열이 포함된 경우: Keyring에 있는 주소를 포함하는 [Account](../../../../../learn/accounts.md#klaytn-accounts) 인스턴스와 [AccountKeyWeigthedMultiSig](../caver.account.md#accountkeyweightedmultisig) 인스턴스를 반환합니다.
* Keyring에 역할별로 다른 개인키 문자열이 포함된 경우: Keyring의 주소가 포함된 [Account](../../../../../learn/accounts.md#klaytn-accounts) 인스턴스와 [AccountKeyRoleBased](../caver.account.md#accountkeyrolebased)의 인스턴스를 반환합니다.

**매개변수**

| 이름 | 유형 | 설명
| ------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options | [WeightedMultiSigOptions](../caver.account.md#weightedmultisigoptions) \| Array | (선택 사항) 기존 계정을 여러 개인 키가 있는 계정으로 업데이트할 때 정의해야 하는 정보가 포함된 [WeightedMultiSigOptions](../caver.account.md#weightedmultisigoptions) 인스턴스입니다. Keyring이 각 역할에 대해 서로 다른 개인키를 사용하는 경우, 배열의 각 역할에 대해 [WeightedMultiSigOptions](../caver.account.md#weightedmultisigoptions) 인스턴스를 정의해야 합니다. Keyring이 둘 이상의 개인 키를 사용하고 옵션 매개변수가 정의되지 않은 경우, 임계값이 1이고 각 키에 대한 가중치가 1인 기본 [WeightedMultiSigOptions](../caver.account.md#weightedmultisigoptions)가 사용됩니다. |

**리턴 값**

| 유형 | 설명 |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Account](../../../../../learn/accounts.md#klaytn-accounts) | 사용자가 클레이튼에서 계정에 대한 AccountKey를 업데이트할 때 사용할 계정 인스턴스입니다. 계정의 기존 Keyring(또는 기존 개인키)을 새 Keyring(또는 새 개인키)으로 바꾸려면, 미리 계정 업데이트 트랜잭션을 클레이튼에 전송하여 계정키를 업데이트해야 합니다. |

**예시**

```javascript
// Get account with singleKeyring
> keyring.toAccount()
Account {
    _address: '0x6a3edfad6d1126020d5369e9097db39281876c5d',
    _accountKey: AccountKeyPublic { _publicKey: '0xc396b...' }
}

// Get account with multipleKeyring
> keyring.toAccount()
Account {
    _address: '0x53027503242c2f99969eeb8cb3a31f48f3668712',
    _accountKey: AccountKeyWeightedMultiSig {
        _threshold: 1,
        _weightedPublicKeys: [
            WeightedPublicKey { _weight: 1, _publicKey: '0x969c8...' },
            WeightedPublicKey { _weight: 1, _publicKey: '0x5bc06...' },
            WeightedPublicKey { _weight: 1, _publicKey: '0x33d83...' }
        ]
    }
}

// Get account with multipleKeyring and options
> keyring.toAccount(new caver.account.weightedMultiSigOptions(3, [2, 2, 3]))
Account {
    _address: '0x53027503242c2f99969eeb8cb3a31f48f3668712',
    _accountKey: AccountKeyWeightedMultiSig {
        _threshold: 3,
        _weightedPublicKeys: [
            WeightedPublicKey { _weight: 2, _publicKey: '0x969c8...' },
            WeightedPublicKey { _weight: 2, _publicKey: '0x5bc06...' },
            WeightedPublicKey { _weight: 3, _publicKey: '0x33d83...' }
        ]
    }
}

// Get account with roleBasedKeyring
> keyring.toAccount()
Account {
    _address: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _accountKey: AccountKeyRoleBased {
        _accountKeys: [
            AccountKeyWeightedMultiSig {
                _threshold: 1,
                _weightedPublicKeys: [
                    WeightedPublicKey { _weight: 1, _publicKey: '0x65b51...' },
                    WeightedPublicKey { _weight: 1, _publicKey: '0x8d85c...' }
                ]
            },
            AccountKeyWeightedMultiSig {
                _threshold: 1,
                _weightedPublicKeys: [
                    WeightedPublicKey { _weight: 1, _publicKey: '0x66899...' },
                    WeightedPublicKey { _weight: 1, _publicKey: '0x7705d...' }
                ]
            },
            AccountKeyWeightedMultiSig {
                _threshold: 1,
                _weightedPublicKeys: [
                    WeightedPublicKey { _weight: 1, _publicKey: '0xaa934...' },
                    WeightedPublicKey { _weight: 1, _publicKey: '0xb763f...' }
                ]
            }
        ]
    }
}

// Get account with roleBasedKeyring and options
> const options = [
    new caver.account.weightedMultiSigOptions(3, [2, 3]),
    new caver.account.weightedMultiSigOptions(2, [1, 1]),
    new caver.account.weightedMultiSigOptions(5, [3, 5])
]
> keyring.toAccount(options)
Account {
    _address: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _accountKey: AccountKeyRoleBased {
        _accountKeys: [
            AccountKeyWeightedMultiSig {
                _threshold: 3,
                _weightedPublicKeys: [
                    WeightedPublicKey { _weight: 2, _publicKey: '0x65b51...' },
                    WeightedPublicKey { _weight: 3, _publicKey: '0x8d85c...' }
                ]
            },
            AccountKeyWeightedMultiSig {
                _threshold: 2,
                _weightedPublicKeys: [
                    WeightedPublicKey { _weight: 1, _publicKey: '0x66899...' },
                    WeightedPublicKey { _weight: 1, _publicKey: '0x7705d...' }
                ]
            },
            AccountKeyWeightedMultiSig {
                _threshold: 5,
                _weightedPublicKeys: [
                    WeightedPublicKey { _weight: 3, _publicKey: '0xaa934...' },
                    WeightedPublicKey { _weight: 5, _publicKey: '0xb763f...' }
                ]
            }
        ]
    }
}
```

## keyring.encrypt <a href="#keyring-encrypt" id="keyring-encrypt"></a>

```javascript
keyring.encrypt(password [, options])
```

Keyring을 암호화하고 키스토어 v4 표준을 반환합니다. 자세한 내용은 [KIP-3](https://kips.klaytn.foundation/KIPs/kip-3)을 참조하세요.

**매개변수**

| 이름 | 유형 | 설명
| -------- | ------ | ---------------------------------------------------------------------------------------------------- |
| password | String | 암호화에 사용할 비밀번호입니다. 암호화된 키 저장소는 이 비밀번호로 해독할 수 있습니다. |
| options | String | (선택 사항) `options` 매개 변수를 사용하면 암호화를 사용할 때 사용할 값을 지정할 수 있습니다.       |

**리턴 값**

| 유형 | 설명 |
| ------ | -------------------------- |
| object | 암호화된 키 저장소 v4. |

반환된 객체에는 다음이 포함됩니다:

| 이름 | 유형 | 설명
| ------- | ------ | --------------------------------------------------------- |
| version | Number | 키스토어의 버전입니다.                                  |
| id | String | 키 저장소의 ID입니다.                                       |
| address | String | 암호화된 [Keyring](#class)의 주소입니다. |
| Keyring | Array | 암호화된 개인 키입니다.                             |

자세한 내용은 [KIP-3](https://kips.klaytn.foundation/KIPs/kip-3)를 참조하세요.

**예시**

```javascript
// Encrypt singleKeyring
> keyring.encrypt('password')
{ 
    version: 4,
    id: '9c12de05-0153-41c7-a8b7-849472eb5de7',
    address: '0xc02cec4d0346bf4124deeb55c5216a4138a40a8c',
    keyring: [
        { 
            ciphertext: 'eacf496cea5e80eca291251b3743bf93cdbcf7072efc3a74efeaf518e2796b15',
            cipherparams: { iv: 'd688a4319342e872cefcf51aef3ec2da' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: {
                dklen: 32,
                salt: 'c3cee502c7157e0faa42386c6d666116ffcdf093c345166c502e23bc34e6ba40',
                n: 4096,
                r: 8,
                p: 1
            },
            mac: '4b49574f3d3356fa0d04f73e07d5a2a6bbfdd185bedfa31f37f347bc98f2ef26'
        }
    ]
}

// Encrypt multipleKeyring
> keyring.encrypt('password')
{
    version: 4,
    id: 'b9fe7bb3-3ae9-41df-a0f2-5f20f525a290',
    address: '0x6e039858fe4c65fe6605fde722ef94a78a3fefed',
    keyring: [
        { 
            ciphertext: '91d62dd3be9a854387c2595b0a53d561b2c99c8fe4a675600a16532f48f5c750',
            cipherparams: { iv: '853b3804c6627af342a8b35474105953' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: {
                dklen: 32,
                salt: '3a3b4d9bd97413b2bef95798dc27a29c73d4802ac7258e8b126eeb909f822c72',
                n: 4096,
                r: 8,
                p: 1
            },
            mac: 'b5fe00edb3f9e5c02056b276380b30a7e61ed8e2925b898bc3d528138cd3c939'
        },
        {
            ciphertext: '494486f72355d95991ba95fd5ed7eeecf0f9a3d2fa0a94400125befb4b4c043f',
            cipherparams: { iv: '64be3daa213e359a404ec2e38c1ac9e1' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: {
                dklen: 32,
                salt: 'f089ee99bfe00f9a43b562624b9376b99963b9d4b8681c076935431dc5c98177',
                n: 4096,
                r: 8,
                p: 1
            },
            mac: '4c8a72a3acb8b07d81033a8bc91f01a4025c684e882e758acde441323a75605f'
        }
    ]
}

// Encrypt roleBasedKeyring
> keyring.encrypt('password')
{
    version: 4,
    id: '99d27cfe-8e3f-427c-bd4c-e4e3cd43955b',
    address: '0xe1d711ee2ac2dfec5b1e6ea583c8270b7575702a',
    keyring: [
        [
            {
                ciphertext: '07a3d8c1c6a01734e429bb4ea88d282b3547fa422653f9547c0544bfca011af0',
                cipherparams: { iv: '707177c48b5bfc1f88e91f10eb327b1b' },
                cipher: 'aes-128-ctr',
                kdf: 'scrypt',
                kdfparams: { dklen: 32, salt: '452f3e41d9e58b42d348b326319fc27b29ed5f5177e063087f8cb272c6b73fe3', n: 4096, r: 8, p: 1 },
                mac: 'bccd141b9056f7ee26b8e9a4ef52d231403162ed2593df8f2e6b2f2d26a737d2',
            },
            {
                ciphertext: 'c94defa5049b910eb57d46125e3dbdb9d32bfb85f3915aa96e25e75d2346970f',
                cipherparams: { iv: 'fae425c4a44c881e629ccdc0fcf53916' },
                cipher: 'aes-128-ctr',
                kdf: 'scrypt',
                kdfparams: { dklen: 32, salt: '37302d0a0625321193e482da55e19a0a51ac250cf4857ecb13112b8c88cbdf44', n: 4096, r: 8, p: 1 },
                mac: '04f7b2879b7e9604356fd4db532c981b4eaa95078c25694e591e7cc2a5c613f1',
            },
        ],

        [
            {
                ciphertext: '015ef2deab867b887fa29c866941512af848e4b547d74a39f44cc4c9ef204b5f',
                cipherparams: { iv: '230271676c4501a860b19b325b1850a6' },
                cipher: 'aes-128-ctr',
                kdf: 'scrypt',
                kdfparams: { dklen: 32, salt: 'eb73f9cacea4e0b38634679102ab5b8f0e84464c2fa3ca07d11ebcdfb7a95519', n: 4096, r: 8, p: 1 },
                mac: 'd76a0f22b2f5a23dac30be820260b3fc738083b797d5c608b23bce8a69f63256',
            },
        ],

        [
            {
                ciphertext: '70870f4dd813fc7c0c4ef64ebba03f15c81677d2558d646b3d143ab8e0d27ec2',
                cipherparams: { iv: '841be9a25127fca0cc79740763ec3e55' },
                cipher: 'aes-128-ctr',
                kdf: 'scrypt',
                kdfparams: { dklen: 32, salt: '089ef66590b699c347caddafa592c8f074948b0ca6e2957bae45d005cd55a874', n: 4096, r: 8, p: 1 },
                mac: '6e1ad546d9e3ad1f3c3419ace4c9daf34a310001875b1a3228dbfd1891030bff',
            },
        ],
    ],
}
```

## keyring.encryptV3 <a href="#keyring-encryptv3" id="keyring-encryptv3"></a>

```javascript
keyring.encryptV3(password [, options])
```

[SingleKeyring](#singlekeyring)의 인스턴스를 암호화하고 키스토어 v3 표준을 반환합니다.

[MultipleKeyring](#multiplekeyring) 및 [RoleBasedKeyring](#rolebasedkeyring)은 encryptV3를 사용할 수 없습니다. 이 경우 키스토어 V4 표준과 함께 [keyring.encrypt](#keyring-encrypt)를 사용해 주세요.

**매개변수**

| 이름 | 유형 | 설명
| -------- | ------ | --------------------------------------------------------------------------------------------------------------- |
| password | String | 암호화에 사용할 비밀번호입니다. 암호화된 키 저장소는 이 비밀번호로 해독할 수 있습니다.            |
| options | String | (선택 사항) 암호화에 사용할 비밀번호입니다. 이 비밀번호를 사용하여 암호화된 키 저장소의 암호를 해독할 수 있습니다. |

**리턴 값**

| 유형 | 설명 |
| ------ | -------------------------- |
| object | 암호화된 키 저장소 v3. |

반환된 객체에는 다음이 포함됩니다:

| 이름 | 유형 | 설명
| ------- | ------ | ----------------------------------------------------- |
| version | Number | 키스토어의 버전입니다.                              |
| id | String | 키 저장소의 ID입니다.                                   |
| address | String | 암호화된 [Keyring](#class)의 주소입니다. |
| crypto | Object | 암호화된 개인 키입니다.                            |

**예시**

```javascript
> keyring.encryptV3('password')
{ 
    version: 3,
    id: '43f99d36-3905-40e6-bff8-ff0dfc380037',
    address: '0xc02cec4d0346bf4124deeb55c5216a4138a40a8c',
    crypto: {
        ciphertext: 'f7296e68807837a5318502c097276a89d58d91b85e45e692aee284a27bcd0955',
        cipherparams: { iv: '03fd985d07777601078840c73cc6f7f3' },
        cipher: 'aes-128-ctr',
        kdf: 'scrypt',
        kdfparams: {
            dklen: 32,
            salt: '46f85271c43fa64ab3338c5235f1d5073bc9379d9b7ba6065c89afb816d83a8a',
            n: 4096,
            r: 8,
            p: 1
        },
     mac: '947f13cd1481fa5ba186e59418ef7600fa69e9830054d59e4d5dc67176e1f967'
    }
}
```

## keyring.isDecoupled <a href="#keyring-isdecoupled" id="keyring-isdecoupled"></a>

```javascript
keyring.isDecoupled()
```

키링에 분리된 키가 있으면 `true`를 반환합니다.

**리턴 값**

| 유형 | 설명 |
| ------- | ------------------------------------ |
| boolean | 키링에 분리된 키가 있으면 `true`를 반환합니다. |

**예시**

```javascript
> keyring.isDecoupled()
true

> keyring.isDecoupled()
false
```
