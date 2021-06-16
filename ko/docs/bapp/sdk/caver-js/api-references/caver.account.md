# caver.account <a id="caver-account"></a>

`caver.account`는 계정 업데이트시 사용 되며 Account에 관련된 기능을 제공하는 패키지입니다.

## Class <a id="class"></a>

### 계정 <a id="account"></a>

```javascript
const account = new caver.account(address, accountKey)
```

`Account`는 Klaytn 계정의 [AccountKey][]를 업데이트하기 위해 필요한 정보를 포함하는 클래스입니다. `caver.account` 패키지의 기본 클래스입니다. 공개키(들)을 이용해 Account 인스턴스를 만들고자 한다면 [caver.account.create](#caver-account-create)를 참고하세요.

**속성**

| 명칭         | 타입     | 설명                                                                                                                                                                                                                                                                                                                  |
| ---------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address    | string | 업데이트 할 계정의 주소입니다.                                                                                                                                                                                                                                                                                                   |
| accountKey | object | 계정에 사용될 새 accountKey입니다. [AccountKeyLegacy](#accountkeylegacy), [AccountKeyPublic](#accountkeypublic), [AccountKeyFail](#accountkeyfail), [AccountKeyWeightedMultiSig](#accountkeyweightedmultisig) 또는 [AccountKeyRoleBased](#accountkeyrolebased)의 인스턴스일 수 있습니다. 트랜잭션이 실행되면 Klaytn에 저장된 계정의 accountKey가 이렇게 변경됩니다. |


### AccountKeyLegacy <a id="accountkeylegacy"></a>

```javascript
const accountKeyLegacy = new caver.account.accountKey.accountKeyLegacy()
```

`AccountKeyLegacy`는 [AccountKeyLegacy][]를 통해 Klaytn 계정의 AccountKey를 업데이트할 때 사용됩니다. `AccountKeyLegacy`를 가지고 Account 인스턴스를 생성하고자 한다면 [caver.account.createWithAccountKeyLegacy](#caver-account-createwithaccountkeylegacy)를 참고하세요.


### AccountKeyPublic <a id="accountkeypublic"></a>

```javascript
const accountKeyPublic = new caver.account.accountKey.accountKeyPublic(publicKey)
```

`AccountKeyPublic`는 [AccountKeyPublic][]를 이용해 Klaytn 계정의 AccountKey를 업데이트할 때 사용됩니다. AccountKey를 `AccountKeyPublic`로 업데이트하면 기존의 AccountKey가 새로운 공개키로 바뀌며, 이는 Klaytn 트랜잭션 검증에 사용됩니다. 계정의 개인키를 주소로부터 분리할 때 필요한 업데이트입니다. 자세한 사항은 [AccountUpdate](../getting-started.md#account-update)와 [AccountKey][]를 참고하세요.

`AccountKeyPublic`로 Account 인스턴스를 만들고자 한다면 [caver.account.create](#caver-account-create) or [caver.account.createWithAccountKeyPublic](#caver-account-createwithaccountkeypublic)를 참고하세요.

**속성**

| 명칭        | 타입     | 설명          |
| --------- | ------ | ----------- |
| publicKey | string | 공개키 문자열입니다. |

### AccountKeyFail <a id="accountkeyfail"></a>

```javascript
const accountKeyFail = new caver.account.accountKey.accountKeyFail()
```

`AccountKeyFail`은 [AccountKeyFail][]을 통해 Klaytn 계정의 AccountKey를 업데이트할 때 사용됩니다. `AccountKeyFail`을 사용하여 Account 인스턴스를 만들고자 한다면 [caver.account.createWithAccountKeyFail](#caver-account-createwithaccountkeyfail)를 참고하세요.

### AccountKeyWeightedMultiSig <a id="accountkeyweightedmultisig"></a>

```javascript
const accountKeyWeightedMultiSig = new caver.account.accountKey.accountKeyWeightedMultiSig(threshold, weightedPublicKeys)
```

`AccountKeyWeightedMultiSig` is used to update AccountKey of an account in the Klaytn with [AccountKeyWeightedMultiSig][]. By updating your AccountKey to `AccountKeyWeightedMultiSig`, you can change your existing AccountKey into the new public key, which will be used to validate a transaction in Klaytn. 계정의 개인키를 주소로부터 분리할 때 필요한 업데이트입니다. 자세한 사항은 [AccountUpdate](../getting-started.md#account-update)와 [AccountKey][]를 참고하세요.

To create an Account instance with `AccountKeyWeightedMultiSig`, please refer to [caver.account.create](#caver-account-create) or [caver.account.createWithAccountKeyWeightedMultiSig](#caver-account-createwithaccountkeyweightedmultisig).

**속성**

| 명칭                 | 타입     | 설명                                  |
| ------------------ | ------ | ----------------------------------- |
| 임계값                | number | The validation threshold.           |
| weightedPublicKeys | Array  | The array of [WeightedPublicKey][]. |

### AccountKeyRoleBased <a id="accountkeyrolebased"></a>

```javascript
const accountKeyRoleBased = new caver.account.accountKey.accountKeyRoleBased(accountKeyArray)
```

`AccountKeyRoleBased` is used to update AccountKey of an account in the Klaytn with [AccountKeyRoleBased][]. By updating your AccountKey to `AccountKeyRoleBased`, you can change the AccountKey(s) assigned for each role, all of which are used to validate a transaction in Klaytn. See [AccountUpdate](../getting-started.md#account-update) and [AccountKey][] for more details.

To create an Account instance with `AccountKeyRoleBased`, please refer to [caver.account.create](#caver-account-create) or [caver.account.createWithAccountKeyRoleBased](#caver-account-createwithaccountkeyrolebased).

**속성**

| 명칭              | 타입    | 설명                                                                                                                                                                                                                                                                       |
| --------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| accountKeyArray | Array | The array defining accountKey to be used for each [role][]. Each role can be defined with [AccountKeyLegacy](#accountkeylegacy), [AccountKeyPublic](#accountkeypublic), [AccountKeyFail](#accountkeyfail), or [AccountKeyWeightedMultiSig](#accountkeyweightedmultisig). |

### WeightedPublicKey <a id="weightedpublickey"></a>

```javascript
const weightedPublicKey = new caver.account.accountKey.weightedPublicKey(weight, publicKey)
```

`WeightedPublicKey` contains a public key and its weight. `WeightedPublicKey` is a class that contains the public key and the weight of the key, and it is used in [AccountKeyWeightedMultiSig](#accountkeyweightedmultisig).

**속성**

| 명칭        | 타입     | 설명                                                                                                                                                                       |
| --------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 가중치       | number | The weight of public key. The weight is used to check whether the weighted sum of public keys is larger than the threshold of the [AccountKeyWeightedMultiSig][] object. |
| publicKey | string | 공개키 문자열입니다.                                                                                                                                                              |

### WeightedMultiSigOptions <a id="weightedmultisigoptions"></a>

```javascript
const weightedMultiSigOptions = new caver.account.weightedMultiSigOptions(threshold, weights)
```

`WeightedMultiSigOptions` contains a threshold and weights. `WeightedMultiSigOptions` is a class for defining the options of AccountKeyWeightedMultiSig.

**속성**

| 명칭      | 타입     | 설명                           |
| ------- | ------ | ---------------------------- |
| 임계값     | number | The validation threshold.    |
| weights | Array  | An array of weights of keys. |


## caver.account.create <a id="caver-account-create"></a>

```javascript
caver.account.create(address, accountKey [, options])
```

Generates an Account instance with an address and an accountKey.

If accountKey is a public key string, an Account instance with [AccountKeyPublic](#accountkeypublic) as accountKey is created. If accountKey is an array containing public key strings, an Account instance with [AccountKeyWeightedMultiSig](#accountkeyweightedmultisig) as accountKey is created. If options are not defined as the last parameter, it is created using a default option with a threshold of 1 and a weight of 1 for each key. If accountKey is an array containing accountKeys that are used for each role, an Account instance with [AccountKeyRoleBased](#accountkeyrolebased) is created. Options must be defined for each role with [WeightedMultiSigOptions][]. If options are not defined, the default option is used for roles that use multiple public keys. Please refer to the example below for how to use it.

**매개변수**

| 명칭         | 타입                                       | 설명                                                                                                                                      |
| ---------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| address    | string                                   | 업데이트 할 계정의 주소입니다.                                                                                                                       |
| accountKey | string &#124; Array                      | A public key string, an array of public keys, or a 2D array of which each element contains an array of key(s) to be used for each role. |
| options    | [WeightedMultiSigOptions][] &#124; Array | (optional) Options for AccountKeyWeigthedMultiSig.                                                                                      |


**리턴값**

| 타입              | 설명                                |
| --------------- | --------------------------------- |
| [계정(Account)][] | The account instance is returned. |

**예시**

```javascript
// Create an Account instance with a public key string -> Account with AccountKeyPublic
> caver.account.create('0x{address in hex}', '0x034f1...')
Account {
    _address: '0xc771822ad361898a330df0169f2382ee92f6286d',
    _accountKey: AccountKeyPublic { _publicKey: '0x034f1...' } 
}

// Create an Account instance with an array of public keys -> Account with AccountKeyWeightedMultiSig
> caver.account.create('0x{address in hex}', ['0x034f1...', '0xfe4b8...'])
Account {
    _address: '0xc771822ad361898a330df0169f2382ee92f6286d',
    _accountKey:
    AccountKeyWeightedMultiSig {
        _threshold: 1,
        _weightedPublicKeys: [ 
            WeightedPublicKey { _weight: 1, _publicKey: '0x034f1...' },
            WeightedPublicKey { _weight: 1, _publicKey: '0xfe4b8...' }
        ]
    } 
}

// Create an Account instance with an array of public keys with WeightedMultiSigOptions -> Account with AccountKeyWeightedMultiSig
> const options = new caver.account.weightedMultiSigOptions(2, [1, 1])
> caver.account.create('0x{address in hex}', ['0x034f1...', '0xfe4b8...'], options)
Account {
    _address: '0xc771822ad361898a330df0169f2382ee92f6286d',
    _accountKey:
    AccountKeyWeightedMultiSig {
        _threshold: 2,
        _weightedPublicKeys: [ 
            WeightedPublicKey { _weight: 1, _publicKey: '0x034f1...' },
            WeightedPublicKey { _weight: 1, _publicKey: '0xfe4b8...' }
        ]
    } 
}

// Create an Account instance with an array in which keys to be used for each role are defined as an array -> Account with AccountKeyRoleBased
> const publicKeys = [
    ['0xd8510...', '0xaa105...'],
    ['0xd8510...'],
    ['0xd8510...', '0xceeee...']
]
> caver.account.create('0x{address in hex}', publicKeys)
Account {
    _address: '0xc771822ad361898a330df0169f2382ee92f6286d',
    _accountKey:
    AccountKeyRoleBased {
        _accountKeys: [
            AccountKeyWeightedMultiSig { 
                _threshold: 1, 
                _weightedPublicKeys: [ 
                    WeightedPublicKey { _weight: 1, _publicKey: '0xd8510...' }, 
                    WeightedPublicKey { _weight: 1, _publicKey: '0xaa105...' } 
                ]
            },
            AccountKeyPublic { _publicKey: '0xd8510...' },
            AccountKeyWeightedMultiSig {
                _threshold: 1,
                _weightedPublicKeys: [
                    WeightedPublicKey { _weight: 1, _publicKey: '0xd8510...' },
                    WeightedPublicKey { _weight: 1, _publicKey: '0xceeee...' }
                ]
            }
        ]
    }
}

// Create an Account instance with an array in which keys to be used for each role are defined as an array with an array of WeightedMultiSigOptions -> Account with AccountKeyRoleBased
> const publicKeys = [
    ['0xd8510...', '0xaa105...'],
    ['0xd8510...'],
    ['0xd8510...', '0xceeee...']
]
> const options = [
    new caver.account.weightedMultiSigOptions(2, [1, 1]),
    new caver.account.weightedMultiSigOptions(),
    new caver.account.weightedMultiSigOptions(3, [1, 2])
]
> caver.account.create('0x{address in hex}', publicKeys, options)
Account {
    _address: '0xc771822ad361898a330df0169f2382ee92f6286d',
    _accountKey:
    AccountKeyRoleBased {
        _accountKeys: [
            AccountKeyWeightedMultiSig { 
                _threshold: 2, 
                _weightedPublicKeys: [ 
                    WeightedPublicKey { _weight: 1, _publicKey: '0xd8510...' }, 
                    WeightedPublicKey { _weight: 1, _publicKey: '0xaa105...' } 
                ]
            },
            AccountKeyPublic { _publicKey: '0xd8510...' },
            AccountKeyWeightedMultiSig {
                _threshold: 3,
                _weightedPublicKeys: [
                    WeightedPublicKey { _weight: 1, _publicKey: '0xd8510...' },
                    WeightedPublicKey { _weight: 2, _publicKey: '0xceeee...' }
                ]
            }
        ]
    }
}
```

## caver.account.createFromRLPEncoding <a id="caver-account-createfromrlpencoding"></a>

```javascript
caver.account.createFromRLPEncoding(address, rlpEncodedKey)
```

Creates an Account instance from RLP-encoded AccountKey.

**매개변수**

| 명칭            | 타입     | 설명                                       |
| ------------- | ------ | ---------------------------------------- |
| address       | string | The address of an account to be updated. |
| rlpEncodedKey | string | The RLP-encoded string of AccountKey.    |


**리턴값**

| 타입              | 설명                                |
| --------------- | --------------------------------- |
| [계정(Account)][] | The account instance is returned. |

**예시**

```javascript
> caver.account.createFromRLPEncoding('0x{address in hex}', '0x04f84b02f848e301a102c10b598a1a3ba252acc21349d61c2fbd9bc8c15c50a5599f420cccc3291f9bf9e301a1021769a9196f523c419be50c26419ebbec34d3d6aa8b59da834212f13dbec9a9c1')
Account {
    _address: '0x9ea5b871e7bef65868a0d278be3fc6cdbee543ee',
    _accountKey: 
        AccountKeyWeightedMultiSig { 
            _threshold: 2, 
            _weightedPublicKeys: [ 
                WeightedPublicKey { _weight: 1, _publicKey: '0x02c10...' },
                WeightedPublicKey { _weight: 1, _publicKey: '0x02176...' }
            ]
        }
}
```

## caver.account.createWithAccountKeyLegacy <a id="caver-account-createwithaccountkeylegacy"></a>

```javascript
caver.account.createWithAccountKeyLegacy(address)
```

Creates an Account instance which has AccountKeyLegacy as an accountKey.

**매개변수**

| 명칭      | 타입     | 설명                                       |
| ------- | ------ | ---------------------------------------- |
| address | string | The address of an account to be updated. |


**리턴값**

| 타입              | 설명                                |
| --------------- | --------------------------------- |
| [계정(Account)][] | The account instance is returned. |

**예시**

```javascript
> caver.account.createWithAccountKeyLegacy('0x{address in hex}')
Account {
  _address: '0x9ea5b871e7bef65868a0d278be3fc6cdbee543ee',
  _accountKey: AccountKeyLegacy {}
}
```

## caver.account.createWithAccountKeyPublic <a id="caver-account-createwithaccountkeypublic"></a>

```javascript
caver.account.createWithAccountKeyPublic(address, publicKey)
```

Creates an Account instance which has AccountKeyPublic as an accountKey.

**매개변수**

| 명칭        | 타입     | 설명                                       |
| --------- | ------ | ---------------------------------------- |
| address   | string | The address of an account to be updated. |
| publicKey | string | 공개키 문자열입니다.                              |


**리턴값**

| 타입              | 설명                                |
| --------------- | --------------------------------- |
| [계정(Account)][] | The account instance is returned. |

**예시**

```javascript
> caver.account.createWithAccountKeyPublic('0x{address in hex}', '0xb5a9a...')
Account {
    _address: '0x9ea5b871e7bef65868a0d278be3fc6cdbee543ee',
    _accountKey: AccountKeyPublic { _publicKey: ,'0xb5a9a...' }
}
```

## caver.account.createWithAccountKeyFail <a id="caver-account-createwithaccountkeyfail"></a>

```javascript
caver.account.createWithAccountKeyFail(address)
```

Creates an Account instance which has AccountKeyFail as an accountKey.

**매개변수**

| 명칭      | 타입     | 설명                                       |
| ------- | ------ | ---------------------------------------- |
| address | string | The address of an account to be updated. |


**리턴값**

| 타입              | 설명                                |
| --------------- | --------------------------------- |
| [계정(Account)][] | The account instance is returned. |

**예시**

```javascript
> caver.account.createWithAccountKeyFail('0x{address in hex}')
Account {
  _address: '0x9ea5b871e7bef65868a0d278be3fc6cdbee543ee',
  _accountKey: AccountKeyFail {}
}
```

## caver.account.createWithAccountKeyWeightedMultiSig <a id="caver-account-createwithaccountkeyweightedmultisig"></a>

```javascript
caver.account.createWithAccountKeyWeightedMultiSig(address, publicKeyArray [, options])
```

Creates an Account instance which has AccountKeyWeightedMultiSig as an accountKey.

**매개변수**

| 명칭             | 타입                          | 설명                                                                                           |
| -------------- | --------------------------- | -------------------------------------------------------------------------------------------- |
| address        | string                      | The address of an account to be updated.                                                     |
| publicKeyArray | Array                       | The array that includes multiple public key strings.                                         |
| options        | [WeightedMultiSigOptions][] | (optional) The [WeightedMultiSigOptions][] instance that defines threshold and weight array. |


**리턴값**

| 타입              | 설명                                |
| --------------- | --------------------------------- |
| [계정(Account)][] | The account instance is returned. |

**예시**

```javascript
// create an Account instance without options
> caver.account.createWithAccountKeyWeightedMultiSig('0x{address in hex}', ['0xb5a9a...', '0xfe4b8...'])
Account {
    _address: '0xc771822ad361898a330df0169f2382ee92f6286d',
    _accountKey:
    AccountKeyWeightedMultiSig {
        _threshold: 1,
        _weightedPublicKeys: [ 
            WeightedPublicKey { _weight: 1, _publicKey: '0xb5a9a...' },
            WeightedPublicKey { _weight: 1, _publicKey: '0xfe4b8...' }
        ]
    } 
}

// create an Account instance with options
> const options = new caver.account.weightedMultiSigOptions(2, [1, 1])
> caver.account.createWithAccountKeyWeightedMultiSig('0x{address in hex}', ['0xb5a9a...', '0xfe4b8...'], options)
Account {
    _address: '0xc771822ad361898a330df0169f2382ee92f6286d',
    _accountKey:
    AccountKeyWeightedMultiSig {
        _threshold: 2,
        _weightedPublicKeys: [ 
            WeightedPublicKey { _weight: 1, _publicKey: '0xb5a9a...' },
            WeightedPublicKey { _weight: 1, _publicKey: '0xfe4b8...' }
        ]
    } 
}
```

## caver.account.createWithAccountKeyRoleBased <a id="caver-account-createwithaccountkeyrolebased"></a>

```javascript
caver.account.createWithAccountKeyRoleBased(address, roledBasedPublicKeyArray [, options])
```

Creates an Account instance which has AccountKeyRoleBased as an accountKey.

**매개변수**

| 명칭                       | 타입     | 설명                                                                                     |
| ------------------------ | ------ | -------------------------------------------------------------------------------------- |
| address                  | string | The address of an account to be updated.                                               |
| roledBasedPublicKeyArray | Array  | A two-dimensional array containing arrays of public key strings for each role.         |
| options                  | Array  | (optional) An array that contains [WeightedMultiSigOptions][] instances for each role. |


**리턴값**

| 타입              | 설명                                |
| --------------- | --------------------------------- |
| [계정(Account)][] | The account instance is returned. |

**예시**

```javascript
// create an Account instance without options
> const publicKeys = [
    ['0x034f1...', '0xfe4b8...'],
    ['0xb5a9a...'],
    ['0x034f1...', '0xb5a9a...']
]
> caver.account.createWithAccountKeyRoleBased('0x{address in hex}', publicKeys)
Account {
    _address: '0xc771822ad361898a330df0169f2382ee92f6286d',
    _accountKey:
    AccountKeyRoleBased {
        _accountKeys: [
            AccountKeyWeightedMultiSig { 
                _threshold: 1, 
                _weightedPublicKeys: [ 
                    WeightedPublicKey { _weight: 1, _publicKey: '0x034f1...' }, 
                    WeightedPublicKey { _weight: 1, _publicKey: '0xfe4b8...' } 
                ]
            },
            AccountKeyPublic { _publicKey: '0xb5a9a...' },
            AccountKeyWeightedMultiSig {
                _threshold: 1,
                _weightedPublicKeys: [
                    WeightedPublicKey { _weight: 1, _publicKey: '0x034f1...' },
                    WeightedPublicKey { _weight: 1, _publicKey: '0xb5a9a...' }
                ]
            }
        ]
    }
}

// create an Account instance with options
> const publicKeys = [
    ['0x034f1...', '0xfe4b8...'],
    ['0xb5a9a...'],
    ['0x034f1...', '0xb5a9a...']
]
> const options = [
    new caver.account.weightedMultiSigOptions(2, [1, 1]),
    new caver.account.weightedMultiSigOptions(),
    new caver.account.weightedMultiSigOptions(3, [1, 2])
]
> caver.account.createWithAccountKeyRoleBased('0x{address in hex}', publicKeys, options)
Account {
    _address: '0xc771822ad361898a330df0169f2382ee92f6286d',
    _accountKey:
    AccountKeyRoleBased {
        _accountKeys: [
            AccountKeyWeightedMultiSig { 
                _threshold: 2, 
                _weightedPublicKeys: [ 
                    WeightedPublicKey { _weight: 1, _publicKey: '0x034f1...' }, 
                    WeightedPublicKey { _weight: 1, _publicKey: '0xfe4b8...' } 
                ]
            },
            AccountKeyPublic { _publicKey: '0xb5a9a...' },
            AccountKeyWeightedMultiSig {
                _threshold: 3,
                _weightedPublicKeys: [
                    WeightedPublicKey { _weight: 1, _publicKey: '0x034f1...' },
                    WeightedPublicKey { _weight: 2, _publicKey: '0xb5a9a...' }
                ]
            }
        ]
    }
}
```

## caver.account.accountKey.decode <a id="caver-account-accountkey-decode"></a>

```javascript
caver.account.accountKey.decode(rlpEncodedAccountKey)
```

Decodes an RLP-encoded string of AccountKey and returns an [AccountKeyLegacy](#accountkeylegacy), [AccountKeyPublic](#accountkeypublic), [AccountKeyFail](#accountkeyfail), [AccountKeyWeightedMultiSig](#accountkeyweightedmultisig) or [AccountKeyRoleBased](#accountkeyrolebased) instance.

**매개변수**

| 명칭                   | 타입     | 설명                                   |
| -------------------- | ------ | ------------------------------------ |
| rlpEncodedAccountKey | string | An RLP-encoded string of AccountKey. |


**리턴값**

| 타입                                                                                                                                                                                                                                              | 설명                                   |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| [AccountKeyLegacy](#accountkeylegacy) &#124; [AccountKeyPublic](#accountkeypublic) &#124; [AccountKeyFail](#accountkeyfail) &#124; [AccountKeyWeightedMultiSig](#accountkeyweightedmultisig) &#124; [AccountKeyRoleBased](#accountkeyrolebased) | The AccountKey instance is returned. |

**예시**

```javascript
> caver.account.accountKey.decode('0x02a102c10b598a1a3ba252acc21349d61c2fbd9bc8c15c50a5599f420cccc3291f9bf9')
AccountKeyPublic { _publicKey: '0x02c10b598a1a3ba252acc21349d61c2fbd9bc8c15c50a5599f420cccc3291f9bf9' }
```

## account.getRLPEncodingAccountKey <a id="account-getrlpencodingaccountkey"></a>

```javascript
account.getRLPEncodingAccountKey()
```

Return RLP-encoded string of AccountKey.


**리턴값**

| 타입     | 설명                                   |
| ------ | ------------------------------------ |
| string | A RLP-encoded string of AccountKey . |

**예시**

```javascript
> const account = caver.account.create('0x{address in hex}', '0x034f1...')
> account.getRLPEncodingAccountKey()
'0x02a102d851040f46d61a042a787cca34ad12bc43e51f01ad0b22270cfc25c15c4b4e22'
```

[AccountKey]: ../../../../klaytn/design/accounts.md#account-key
[AccountKeyLegacy]: ../../../../klaytn/design/accounts.md#accountkeylegacy
[AccountKeyPublic]: ../../../../klaytn/design/accounts.md#accountkeypublic
[AccountKeyFail]: ../../../../klaytn/design/accounts.md#accountkeyfail
[AccountKeyWeightedMultiSig]: ../../../../klaytn/design/accounts.md#accountkeyweightedmultisig
[AccountKeyRoleBased]: ../../../../klaytn/design/accounts.md#accountkeyrolebased
[WeightedPublicKey]: #weightedpublickey
[WeightedMultiSigOptions]: #weightedmultisigoptions
[계정(Account)]: #account
[role]: ../../../../klaytn/design/accounts.md#roles
