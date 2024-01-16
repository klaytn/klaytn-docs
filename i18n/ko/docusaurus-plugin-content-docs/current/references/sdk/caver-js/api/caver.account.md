# caver.account

`caver.account`는 계정을 업데이트할 때 사용하는 계정과 관련된 기능을 제공하는 패키지입니다.

## 클래스 <a id="class"></a>

### 계정 <a id="account"></a>

```javascript
const account = new caver.account(address, accountKey)
```

`Account`는 클레이튼 블록체인 플랫폼(Klaytn)에서 계정의 [AccountKey]를 업데이트하는 데 필요한 정보를 담고 있는 클래스입니다. 이 클래스는 `caver.account` 패키지의 기본 클래스입니다. 공개키 문자열로 계정 인스턴스를 생성하려면 [caver.account.create](#caver-account-createwithaccountkeyweightedmultisig)를 참고하시기 바랍니다.

**속성**

| 이름         | 유형     | 설명                                                                                                                                                                                                                                                                                                                |
| ---------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address    | String | 업데이트할 계정의 주소입니다.                                                                                                                                                                                                                                                                                                  |
| accountKey | Object | 계정에 사용할 새 계정 키입니다. 이것은 [AccountKeyLegacy](#accountkeylegacy), [AccountKeyPublic](#accountkeypublic), [AccountKeyFail](#accountkeyfail), [AccountKeyWeightedMultiSig](#accountkeyweightedmultisig) 또는 [AccountKeyRoleBased](#accountkeyrolebased)의 인스턴스가 될 수 있습니다. 트랜잭션이 실행되면 클레이튼에 저장된 계정의 AccountKey가 이렇게 변경됩니다. |

### AccountKeyLegacy <a id="accountkeylegacy"></a>

```javascript
const accountKeyLegacy = new caver.account.accountKey.accountKeyLegacy()
```

`AccountKeyLegacy`는 클레이튼에서 계정의 AccountKey를 [AccountKeyLegacy]로 업데이트할 때 사용합니다. `AccountKeyLegacy`로 계정 인스턴스를 생성하려면 [caver.account.createWithAccountKeyLegacy](#caver-account-createwithaccountkeylegacy)를 참고하시기 바랍니다.

### AccountKeyPublic <a id="accountkeypublic"></a>

```javascript
const accountKeyPublic = new caver.account.accountKey.accountKeyPublic(publicKey)
```

`AccountKeyPublic`은 클레이튼에서 계정의 AccountKey를 [AccountKeyPublic]으로 업데이트하는 데 사용됩니다. AccountKey를 `AccountKeyPublic`으로 업데이트하면 기존 AccountKey를 새로운 공개키로 변경할 수 있으며, 이 공개키는 Klaytn에서 트랜잭션의 유효성을 검사하는 데 사용될 것입니다. 이 변경은 개인키를 계정 주소에서 분리할 때 필요합니다. 자세한 내용은 [AccountUpdate](../get-started.md#account-update) 및 [AccountKey]를 참조하세요.

`AccountKeyPublic`으로 계정 인스턴스를 생성하려면 [caver.account.create](#caver-account-createwithaccountkeyweightedmultisig) 또는 [caver.account.createWithAccountKeyPublic](#caver-account-createwithaccountkeypublic)을 참조하시기 바랍니다.

**속성**

| 이름        | 유형     | 설명           |
| --------- | ------ | ------------ |
| publicKey | String | 공개 키 문자열입니다. |

### AccountKeyFail <a id="accountkeyfail"></a>

```javascript
const accountKeyFail = new caver.account.accountKey.accountKeyFail()
```

`AccountKeyFail`은 [AccountKeyFail]로 클레이튼에서 계정의 AccountKey를 업데이트할 때 사용합니다. `AccountKeyFail`로 계정 인스턴스를 생성하려면 [caver.account.createWithAccountKeyFail](#caver-account-createwithaccountkeyfail)을 참고하시기 바랍니다.

### AccountKeyWeightedMultiSig <a id="accountkeyweightedmultisig"></a>

```javascript
const accountKeyWeightedMultiSig = new caver.account.accountKey.accountKeyWeightedMultiSig(threshold, weightedPublicKeys)
```

`AccountKeyWeightedMultiSig`는 클레이튼에서 계정의 AccountKey를 [AccountKeyWeightedMultiSig]로 업데이트하는 데 사용됩니다. AccountKey를 `AccountKeyWeightedMultiSig`로 업데이트하면 기존 AccountKey를 새로운 공개키로 변경할 수 있으며, 이 공개키는 클레이튼에서 트랜잭션의 유효성을 검사하는 데 사용됩니다. 이 변경은 개인키를 계정 주소에서 분리할 때 필요합니다. 자세한 내용은 [AccountUpdate](../get-started.md#account-update) 및 [AccountKey]를 참조하세요.

`AccountKeyWeightedMultiSig`를 사용하여 계정 인스턴스를 생성하려면 [caver.account.create](#caver-account-createwithaccountkeyweightedmultisig) 또는 [caver.account.createWithAccountKeyWeightedMultiSig](#caver-account-createwithaccountkeyweightedmultisig)를 참조하시기 바랍니다.

**속성**

| 이름                 | 유형     | 설명                          |
| ------------------ | ------ | --------------------------- |
| threshold          | Number | 유효성 검사 임계값입니다.              |
| weightedPublicKeys | Array  | [WeightedPublicKey]의 배열입니다. |

### 계정키 역할 기반 <a id="accountkeyrolebased"></a>

```javascript
const accountKeyRoleBased = new caver.account.accountKey.accountKeyRoleBased(accountKeyArray)
```

`AccountKeyRoleBased`는 클레이튼에서 계정의 AccountKey를 [AccountKeyRoleBased]로 업데이트하는 데 사용됩니다. 계정키를 `AccountKeyRoleBased`로 업데이트하면 각 역할에 할당된 계정키를 변경할 수 있으며, 이 계정키들은 모두 클레이튼에서 트랜잭션의 유효성을 검사하는 데 사용됩니다. 자세한 내용은 [AccountUpdate](../get-started.md#account-update) 및 [AccountKey]를 참조하세요.

`AccountKeyRoleBased`를 사용하여 계정 인스턴스를 생성하려면 [caver.account.create](#caver-account-createwithaccountkeyweightedmultisig) 또는 [caver.account.createWithAccountKeyRoleBased](#caver-account-createwithaccountkeyrolebased)를 참조하시기 바랍니다.

**속성**

| 이름              | 유형    | 설명                                                                                                                                                                                                                                  |
| --------------- | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accountKeyArray | Array | 각 [role]에 사용할 계정키를 정의하는 배열입니다. 각 역할은 [AccountKeyLegacy](#accountkeylegacy), [AccountKeyPublic](#accountkeypublic), [AccountKeyFail](#accountkeyfail) 또는 [AccountKeyWeightedMultiSig](#accountkeyweightedmultisig)를 사용하여 정의할 수 있습니다. |

### WeightedPublicKey <a id="weightedpublickey"></a>

```javascript
const weightedPublicKey = new caver.account.accountKey.weightedPublicKey(weight, publicKey)
```

`WeightedPublicKey`는 공개키와 그 가중치를 포함합니다. `WeightedPublicKey`는 공개키와 키의 가중치를 포함하는 클래스로, [AccountKeyWeightedMultiSig](#accountkeyweightedmultisig)에서 사용됩니다.

**속성**

| 이름        | 유형     | 설명                                                                                    |
| --------- | ------ | ------------------------------------------------------------------------------------- |
| weight    | Number | 공개키의 가중치입니다. 가중치는 공개키의 가중치 합이 [AccountKeyWeightedMultiSig] 개체의 임계값보다 큰지 확인하는 데 사용됩니다. |
| publicKey | String | 공개키 문자열입니다.                                                                           |

### 가중 다중 서명 옵션 <a id="weightedmultisigoptions"></a>

```javascript
const weightedMultiSigOptions = new caver.account.weightedMultiSigOptions(threshold, weights)
```

`WeightedMultiSigOptions`은 임계값과 가중치를 포함합니다. `WeightedMultiSigOptions`은 계정키 가중다중서명의 옵션을 정의하기 위한 클래스입니다.

**속성**

| 이름        | 유형     | 설명             |
| --------- | ------ | -------------- |
| threshold | Number | 유효성 검사 임계값입니다. |
| weights   | Array  | 키의 가중치 배열입니다.  |

## caver.account.create <a id="caver-account-create"></a>

```javascript
caver.account.create(address, accountKey [, options])
```

주소와 계정키가 있는 계정 인스턴스를 생성합니다.

accountKey가 공개 키 문자열인 경우, [AccountKeyPublic](#accountkeypublic)을 accountKey로 하는 계정 인스턴스가 만들어집니다. accountKey가 공개 키 문자열을 포함하는 배열인 경우, [AccountKeyWeightedMultisig](#accountkeyweightedmultisig)를 accountKey로 하는 계정 인스턴스가 만들어집니다. 옵션이 마지막 매개변수로 정의되지 않은 경우 임계값이 1이고 각 키에 가중치가 1인 기본 옵션을 사용하여 생성됩니다. 계정 키가 각 역할에 사용되는 계정 키가 포함된 배열인 경우에는 [AccountKeyRoleBased](#accountkeyrolebased)을 가진 계정 인스턴스가 만들어집니다. 옵션은 각 역할에 대해 [WeightedMultiSigOptions]를 사용하여 정의해야 합니다. 옵션을 정의하지 않으면 여러 개의 공개키를 사용하는 역할에 기본 옵션이 사용됩니다. 사용 방법은 아래 예시를 참조하세요.

**매개변수**

| 이름         | 유형                                 | 설명                                                       |
| ---------- | ---------------------------------- | -------------------------------------------------------- |
| address    | String                             | 업데이트할 계정의 주소입니다.                                         |
| accountKey | String \| Array                    | 공개 키 문자열, 공개 키 배열 또는 각 요소에 각 역할에 사용할 키 배열이 포함된 2D 배열입니다. |
| options    | [WeightedMultiSigOptions] \| Array | (선택 사항) 계정 키 가중 다중 서명에 대한 옵션입니다.      |

**리턴 값**

| 유형        | 설명              |
| --------- | --------------- |
| [Account] | 계정 인스턴스가 반환됩니다. |

**Example**

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

RLP 인코딩된 AccountKey에서 계정 인스턴스를 생성합니다.

**매개변수**

| 이름            | 유형     | 설명                     |
| ------------- | ------ | ---------------------- |
| address       | String | 업데이트할 계정의 주소입니다.       |
| rlpEncodedKey | String | 계정 키의 RLP 인코딩된 문자열입니다. |

**리턴 값**

| 유형        | 설명              |
| --------- | --------------- |
| [Account] | 계정 인스턴스가 반환됩니다. |

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

AccountKeyLegacy를 계정 키로 가진 계정 인스턴스를 생성합니다.

**매개변수**

| 이름      | Type   | 설명               |
| ------- | ------ | ---------------- |
| address | String | 업데이트할 계정의 주소입니다. |

**리턴 값**

| 유형        | 설명              |
| --------- | --------------- |
| [Account] | 계정 인스턴스가 반환됩니다. |

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

AccountKeyPublic을 계정 키로 가진 계정 인스턴스를 만듭니다.

**매개변수**

| 이름        | 유형     | 설명               |
| --------- | ------ | ---------------- |
| address   | String | 업데이트할 계정의 주소입니다. |
| publicKey | String | 공개 키 문자열입니다.     |

**리턴 값**

| 유형        | 설명              |
| --------- | --------------- |
| [Account] | 계정 인스턴스가 반환됩니다. |

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

AccountKeyFail을 계정 키로 가진 계정 인스턴스를 생성합니다.

**매개변수**

| 이름      | 유형     | Description      |
| ------- | ------ | ---------------- |
| address | String | 업데이트할 계정의 주소입니다. |

**리턴 값**

| 유형        | 설명              |
| --------- | --------------- |
| [Account] | 계정 인스턴스가 반환됩니다. |

**예시**

```javascript
> caver.account.createWithAccountKeyFail('0x{address in hex}')
Account {
  _address: '0x9ea5b871e7bef65868a0d278be3fc6cdbee543ee',
  _accountKey: AccountKeyFail {}
}
```

## caver.account.createWithAccountKeyWeightedMultisig <a id="caver-account-createwithaccountkeyweightedmultisig"></a>

```javascript
caver.account.createWithAccountKeyWeightedMultiSig(address, publicKeyArray [, options])
```

AccountKeyWeightedMultiSig를 계정 키로 사용하는 계정 인스턴스를 생성합니다.

**매개변수**

| 이름             | 유형                        | 설명                                                            |
| -------------- | ------------------------- | ------------------------------------------------------------- |
| address        | String                    | 업데이트할 계정의 주소입니다.                                              |
| publicKeyArray | Array                     | 여러 공개 키 문자열이 포함된 배열입니다.                                       |
| options        | [WeightedMultiSigOptions] | (선택 사항) 임계값 및 가중치 배열을 정의하는 [WeightedMultiSigOptions] 인스턴스입니다. |

**리턴 값**

| 유형        | 설명              |
| --------- | --------------- |
| [Account] | 계정 인스턴스가 반환됩니다. |

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

AccountKeyRoleBased를 계정 키로 가진 계정 인스턴스를 만듭니다.

**매개변수**

| 이름                       | 유형     | 설명                                                           |
| ------------------------ | ------ | ------------------------------------------------------------ |
| address                  | String | 업데이트할 계정의 주소입니다.                                             |
| roledBasedPublicKeyArray | Array  | 각 역할에 대한 공개 키 문자열 배열이 포함된 2차원 배열입니다.                         |
| options                  | Array  | (선택 사항) 각 역할에 대한 [WeightedMultiSigOptions] 인스턴스를 포함하는 배열입니다. |

**Return Value**

| 유형        | 설명              |
| --------- | --------------- |
| [Account] | 계정 인스턴스가 반환됩니다. |

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

계정키의 RLP 인코딩된 문자열을 디코딩하여 [AccountKeyLegacy](#accountkeylegacy), [AccountKeyPublic](#accountkeypublic), [AccountKeyFail](#accountkeyfail), [AccountKeyWeightedMultiSig](#accountkeyweightedmultisig) 또는 [AccountKeyRoleBased](#accountkeyrolebased) 인스턴스를 반환합니다.

**매개변수**

| 이름                   | 유형     | 설명                     |
| -------------------- | ------ | ---------------------- |
| rlpEncodedAccountKey | string | 계정 키의 RLP 인코딩된 문자열입니다. |

**리턴 값**

| 유형                                                                                                                                                                                                                              | 설명                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| [AccountKeyLegacy](#accountkeylegacy) \| [AccountKeyPublic](#accountkeypublic) \| [AccountKeyFail](#accountkeyfail) \| [AccountKeyWeightedMultiSig](#accountkeyweightedmultisig) \| [AccountKeyRoleBased](#accountkeyrolebased) | 계정 키 인스턴스가 반환됩니다. |

**예시**

```javascript
> caver.account.accountKey.decode('0x02a102c10b598a1a3ba252acc21349d61c2fbd9bc8c15c50a5599f420cccc3291f9bf9')
AccountKeyPublic { _publicKey: '0x02c10b598a1a3ba252acc21349d61c2fbd9bc8c15c50a5599f420cccc3291f9bf9' }
```

## account.getRLPEncodingAccountKey <a id="account-getrlpencodingaccountkey"></a>

```javascript
``JavaScript
account.getRLPEncodingAccountKey()
```

Return RLP-encoded string of AccountKey.

**리턴 값**

| 유형     | 설명                                   |
| ------ | ------------------------------------ |
| String | A RLP-encoded string of AccountKey . |

**예시**

````javascript
account.getRLPEncodingAccountKey()
```javascript
> const account = caver.account.create('0x{주소 in hex}', '0x034f1...')
> account.getRLPEncodingAccountKey()
'0x02a102d851040f46d61a042a787cca34ad12bc43e51f01ad0b22270cfc25c15c4b4e22'
````

[AccountKey]: ../../../../learn/accounts.md#account-key

[AccountKeyLegacy]: ../../../../learn/accounts.md#accountkeylegacy

[AccountKeyPublic]: ../../../../learn/accounts.md#accountkeypublic

[AccountKeyFail]: ../../../../learn/accounts.md#accountkeyfail

[AccountKeyWeightedMultiSig]: ../../../../learn/accounts.md#accountkeyweightedmultisig

[AccountKeyRoleBased]: ../../../../learn/accounts.md#accountkeyrolebased

[WeightedPublicKey]: #weightedpublickey

[WeightedMultiSigOptions]: #weightedmultisigoptions

[Account]: #account

[role]: ../../../../learn/accounts.md#roles
