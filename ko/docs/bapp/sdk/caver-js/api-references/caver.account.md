# caver.account <a id="caver-account"></a>

`caver.account`는 계정 업데이트시 사용 되며 Account에 관련된 기능을 제공하는 패키지입니다.

## Class <a id="class"></a>

### 계정 <a id="account"></a>

```javascript
const account = new caver.account(address, accountKey)
```

`Account`는 Klaytn 계정의 [AccountKey][]를 업데이트하기 위해 필요한 정보를 포함하는 클래스입니다. `caver.account` 패키지의 기본 클래스입니다. 공개키(들)을 이용해 Account 인스턴스를 만들고자 한다면 [caver.account.create](#caver-account-create)를 참고하세요.

**속성**

| 이름         | 타입     | 설명                                                                                                                                                                                                                                                                                                                  |
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

| 이름        | 타입     | 설명          |
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

`AccountKeyWeightedMultiSig`는 [AccountKeyWeightedMultiSig][]를 사용해 Klaytn 계정의 AccountKey를 업데이트할 때 사용합니다. AccountKey를 `AccountKeyWeightedMultiSig`로 업데이트하면 기존의 AccountKey가 새로운 공개키로 바뀌며, 이는 Klaytn 트랜잭션 검증에 사용됩니다. 계정의 개인키를 주소로부터 분리할 때 필요한 업데이트입니다. 자세한 사항은 [AccountUpdate](../getting-started.md#account-update)와 [AccountKey][]를 참고하세요.

`AccountKeyWeightedMultiSig`로 Account 인스턴스를 만들고자 한다면 [caver.account.create](#caver-account-create) or [caver.account.createWithAccountKeyWeightedMultiSig](#caver-account-createwithaccountkeyweightedmultisig)를 참고하세요.

**속성**

| 이름                 | 타입     | 설명                            |
| ------------------ | ------ | ----------------------------- |
| 임계값                | number | 검증 임계값입니다.                    |
| weightedPublicKeys | Array  | [WeightedPublicKey][]의 배열입니다. |

### AccountKeyRoleBased <a id="accountkeyrolebased"></a>

```javascript
const accountKeyRoleBased = new caver.account.accountKey.accountKeyRoleBased(accountKeyArray)
```

`AccountKeyRoleBased`는 [AccountKeyRoleBased][]를 통해 Klaytn 계정의 AccountKey를 업데이트할 때 사용됩니다. AccountKey를 `AccountKeyRoleBased`로 업데이트함으로써 Klaytn 트랜잭션 검증에 사용되는 각 역할에 할당된 AccountKey(들)을 변경할 수 있습니다. 자세한 사항은 [AccountUpdate](../getting-started.md#account-update)와 [AccountKey][]를 참고하세요.

`AccountKeyRoleBased`로 Account 인스턴스를 만들고자 한다면 [caver.account.create](#caver-account-create) or [caver.account.createWithAccountKeyRoleBased](#caver-account-createwithaccountkeyrolebased)를 참고하세요.

**속성**

| 이름              | 타입    | 설명                                                                                                                                                                                                                                                 |
| --------------- | ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accountKeyArray | Array | 각 [역할][]에 사용되는 키를 정의하는 배열입니다. 각 역할은 [AccountKeyLegacy, [AccountKeyPublic](#accountkeypublic), [AccountKeyFail](#accountkeyfail), [AccountKeyWeightedMultiSig](#accountkeyweightedmultisig) 또는 AccountKeyRoleBased](#accountkeylegacy)로 정의될 수 있습니다. |

### WeightedPublicKey <a id="weightedpublickey"></a>

```javascript
const weightedPublicKey = new caver.account.accountKey.weightedPublicKey(weight, publicKey)
```

`WeightedPublicKey` contains a public key and its weight. `WeightedPublicKey`는 공개키와 그 가중치를 포함하는 클래스로, [AccountKeyWeightedMultiSig](#accountkeyweightedmultisig)에 사용됩니다.

**속성**

| 이름        | 타입     | 설명                                                                                        |
| --------- | ------ | ----------------------------------------------------------------------------------------- |
| 가중치       | number | 공개키의 가중치입니다. 공개키의 가중치 합계가 [AccountKeyWeightedMultiSig][] 객체의 임계값을 초과하는지 여부를 확인하는 데 사용됩니다. |
| publicKey | string | 공개키 문자열입니다.                                                                               |

### WeightedMultiSigOptions <a id="weightedmultisigoptions"></a>

```javascript
const weightedMultiSigOptions = new caver.account.weightedMultiSigOptions(threshold, weights)
```

`WeightedMultiSigOptions`는 임계값과 가중치를 포함합니다. `WeightedMultiSigOptions`는 AccountKeyWeightedMultiSig의 옵션을 정의하는 클래스입니다.

**속성**

| 이름  | 타입     | 설명            |
| --- | ------ | ------------- |
| 임계값 | number | 검증 임계값입니다.    |
| 가중치 | Array  | 키 가중치의 배열입니다. |


## caver.account.create <a id="caver-account-create"></a>

```javascript
caver.account.create(address, accountKey [, options])
```

주소와 accountKey를 지닌 Account 인스턴스를 생성합니다.

accountKey가 공개키 문자열인 경우, accountKey가 [AccountKeyPublic](#accountkeypublic)인 Account 인스턴스가 생성됩니다. accountKey가 공개키 문자열을 포함한 배열인 경우, accountKey가 [AccountKeyWeightedMultiSig](#accountkeyweightedmultisig)인 Account 인스턴스가 생성됩니다. 옵션들이 마지막 파라미터로 정의되지 않은 경우 기본값으로 임계값이 1, 각 키의 가중치가 1로 설정되어 생성됩니다. accountKey가 각 역할에 사용되는 accountKeys를 포함한 배열인 경우, [AccountKeyRoleBased](#accountkeyrolebased)를 지닌 Account 인스턴스가 생성됩니다. 옵션들은 [WeightedMultiSigOptions][]를 통해 각 역할에 정의되어야 합니다. 옵션들이 정의되어 있지 않다면, 다수의 공개키를 사용하는 역할들에 대해 기본 옵션이 사용됩니다. 사용법은 아래 예시를 참고하세요.

**Parameters**

| 이름         | 타입                                       | 설명                                                                 |
| ---------- | ---------------------------------------- | ------------------------------------------------------------------ |
| address    | string                                   | 업데이트 할 계정의 주소입니다.                                                  |
| accountKey | string &#124; Array                      | 공개키 문자열, 공개키(들)의 배열, 또는 각 요소가 각 역할에 사용될 키(들) 의 배열을 포함하는 2차원 배열입니다. |
| options    | [WeightedMultiSigOptions][] &#124; Array | (선택 사항) AccountKeyWeigthedMultiSig에 대한 옵션들입니다.                     |


**리턴값**

| 타입              | 설명                   |
| --------------- | -------------------- |
| [계정(Account)][] | Account 인스턴스가 반환됩니다. |

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

RLP 인코딩된 AccountKey로부터 Account 인스턴스를 생성합니다.

**Parameters**

| 이름            | 타입     | 설명                           |
| ------------- | ------ | ---------------------------- |
| address       | string | 업데이트 할 계정의 주소입니다.            |
| rlpEncodedKey | string | AccountKey의 RLP 인코딩된 문자열입니다. |


**리턴값**

| 타입              | 설명                   |
| --------------- | -------------------- |
| [계정(Account)][] | Account 인스턴스가 반환됩니다. |

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

AccountKeyLegacy를 accountKey로 지닌 Account 인스턴스를 생성합니다.

**Parameters**

| 이름      | 타입     | 설명                |
| ------- | ------ | ----------------- |
| address | string | 업데이트 할 계정의 주소입니다. |


**리턴값**

| 타입              | 설명                   |
| --------------- | -------------------- |
| [계정(Account)][] | Account 인스턴스가 반환됩니다. |

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

AccountKeyPublic를 accountKey로 지닌 Account 인스턴스를 생성합니다.

**Parameters**

| 이름        | 타입     | 설명                |
| --------- | ------ | ----------------- |
| address   | string | 업데이트 할 계정의 주소입니다. |
| publicKey | string | 공개키 문자열입니다.       |


**리턴값**

| 타입              | 설명                   |
| --------------- | -------------------- |
| [계정(Account)][] | Account 인스턴스가 반환됩니다. |

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

AccountKeyFail를 accountKey로 지닌 Account 인스턴스를 생성합니다.

**Parameters**

| 이름      | 타입     | 설명                |
| ------- | ------ | ----------------- |
| address | string | 업데이트 할 계정의 주소입니다. |


**리턴값**

| 타입              | 설명                   |
| --------------- | -------------------- |
| [계정(Account)][] | Account 인스턴스가 반환됩니다. |

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

AccountKeyWeightedMultiSig를 accountKey로 지닌 Account 인스턴스를 생성합니다.

**Parameters**

| 이름             | 타입                          | 설명                                                             |
| -------------- | --------------------------- | -------------------------------------------------------------- |
| address        | string                      | 업데이트 할 계정의 주소입니다.                                              |
| publicKeyArray | Array                       | 다수의 공개키 문자열을 포함한 배열입니다.                                        |
| options        | [WeightedMultiSigOptions][] | (선택 사항) 임계값과 가중치 배열을 정의하는 [WeightedMultiSigOptions][] 인스턴스입니다. |


**리턴값**

| 타입              | 설명                   |
| --------------- | -------------------- |
| [계정(Account)][] | Account 인스턴스가 반환됩니다. |

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

AccountKeyRoleBased를 accountKey로 지닌 Account 인스턴스를 생성합니다.

**Parameters**

| 이름                       | 타입     | 설명                                                             |
| ------------------------ | ------ | -------------------------------------------------------------- |
| address                  | string | 업데이트 할 계정의 주소입니다.                                              |
| roledBasedPublicKeyArray | Array  | 각 역할에 대해 공개키 문자열의 배열을 포함하고 있는 2차원 배열입니다.                       |
| options                  | Array  | (선택 사항) 각 역할에 대해 [WeightedMultiSigOptions][] 인스턴스를 포함하는 배열입니다. |


**리턴값**

| 타입              | 설명                   |
| --------------- | -------------------- |
| [계정(Account)][] | Account 인스턴스가 반환됩니다. |

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

AccountKey의 RLP 인코딩된 문자열을 디코딩하며, [AccountKeyLegacy](#accountkeylegacy), [AccountKeyPublic](#accountkeypublic), [AccountKeyFail](#accountkeyfail), [AccountKeyWeightedMultiSig](#accountkeyweightedmultisig) 또는 [AccountKeyRoleBased](#accountkeyrolebased) 인스턴스를 반환합니다.

**Parameters**

| 이름                   | 타입     | 설명                           |
| -------------------- | ------ | ---------------------------- |
| rlpEncodedAccountKey | string | AccountKey의 RLP 인코딩된 문자열입니다. |


**리턴값**

| 타입                                                                                                                                                                                                                                              | 설명                      |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| [AccountKeyLegacy](#accountkeylegacy) &#124; [AccountKeyPublic](#accountkeypublic) &#124; [AccountKeyFail](#accountkeyfail) &#124; [AccountKeyWeightedMultiSig](#accountkeyweightedmultisig) &#124; [AccountKeyRoleBased](#accountkeyrolebased) | AccountKey 인스턴스가 반환됩니다. |

**예시**

```javascript
> caver.account.accountKey.decode('0x02a102c10b598a1a3ba252acc21349d61c2fbd9bc8c15c50a5599f420cccc3291f9bf9')
AccountKeyPublic { _publicKey: '0x02c10b598a1a3ba252acc21349d61c2fbd9bc8c15c50a5599f420cccc3291f9bf9' }
```

## account.getRLPEncodingAccountKey <a id="account-getrlpencodingaccountkey"></a>

```javascript
account.getRLPEncodingAccountKey()
```

AccountKey의 RLP 인코딩된 문자열을 반환합니다.


**리턴값**

| 타입     | 설명                            |
| ------ | ----------------------------- |
| string | AccountKey의 RLP 인코딩된 문자열입니다 . |

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
[역할]: ../../../../klaytn/design/accounts.md#roles
