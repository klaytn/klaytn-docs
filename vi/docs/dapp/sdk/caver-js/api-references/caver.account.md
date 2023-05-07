# caver.account <a id="caver-account"></a>

`caver.account` là gói cung cấp chức năng liên quan đến Tài khoản được sử dụng khi cập nhật tài khoản.

## Lớp <a id="class"></a>

### Tài khoản <a id="account"></a>

```javascript
const account = new caver.account(address, accountKey)
```

`Tài khoản` là lớp chứa thông tin cần thiết để cập nhật [AccountKey][] của tài khoản trong nền tảng chuỗi khối Klaytn (Klaytn). Đây là lớp mặc định cho gói `caver.account`. Để tạo một phiên bản Tài khoản với (các) chuỗi khóa công khai, vui lòng tham khảo [caver.account.create](#caver-account-create).

**thuộc tính**

| Tên        | Loại      | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                        |
| ---------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| địa chỉ    | chuỗi     | Địa chỉ của tài khoản được cập nhật.                                                                                                                                                                                                                                                                                                                                                                         |
| accountKey | đối tượng | AccountKey mới sẽ được sử dụng trong tài khoản. Đây có thể là phiên bản của [AccountKeyLegacy](#accountkeylegacy), [AccountKeyPublic](#accountkeypublic), [AccountKeyFail](#accountkeyfail), [AccountKeyWeightedMultiSig](#accountkeyweightedmultisig) hoặc [AccountKeyRoleBased](#accountkeyrolebased). Khi giao dịch được thực thi, accountKey của tài khoản được lưu trữ trong Klaytn được thay đổi theo. |


### AccountKeyLegacy <a id="accountkeylegacy"></a>

```javascript
const accountKeyLegacy = new caver.account.accountKey.accountKeyLegacy()
```

`AccountKeyLegacy` is used to update the AccountKey of an account in the Klaytn with [AccountKeyLegacy][]. To create an Account instance with `AccountKeyLegacy`, please refer to [caver.account.createWithAccountKeyLegacy](#caver-account-createwithaccountkeylegacy).


### AccountKeyPublic <a id="accountkeypublic"></a>

```javascript
const accountKeyPublic = new caver.account.accountKey.accountKeyPublic(publicKey)
```

`AccountKeyPublic` is used to update the AccountKey of an account in the Klaytn with [AccountKeyPublic][]. By updating AccountKey to `AccountKeyPublic`, you can change your existing AccountKey into the new public key, which will be used to validate a transaction in Klaytn. This change is necessary when you decouple your private key from the address of your account. See [AccountUpdate](../getting-started.md#account-update) and [AccountKey][] for details.

To create an Account instance with `AccountKeyPublic`, please refer to [caver.account.create](#caver-account-create) or [caver.account.createWithAccountKeyPublic](#caver-account-createwithaccountkeypublic).

**properties**

| Name      | Type   | Description            |
| --------- | ------ | ---------------------- |
| publicKey | string | The public key string. |

### AccountKeyFail <a id="accountkeyfail"></a>

```javascript
const accountKeyFail = new caver.account.accountKey.accountKeyFail()
```

`AccountKeyFail` is used to update AccountKey of an account in the Klaytn with [AccountKeyFail][]. To create an Account instance with `AccountKeyFail`, please refer to [caver.account.createWithAccountKeyFail](#caver-account-createwithaccountkeyfail).

### AccountKeyWeightedMultiSig <a id="accountkeyweightedmultisig"></a>

```javascript
const accountKeyWeightedMultiSig = new caver.account.accountKey.accountKeyWeightedMultiSig(threshold, weightedPublicKeys)
```

`AccountKeyWeightedMultiSig` is used to update AccountKey of an account in the Klaytn with [AccountKeyWeightedMultiSig][]. By updating your AccountKey to `AccountKeyWeightedMultiSig`, you can change your existing AccountKey into the new public key, which will be used to validate a transaction in Klaytn. This change is necessary when you decouple your private key from the address of your account. See [AccountUpdate](../getting-started.md#account-update) and [AccountKey][] for details.

To create an Account instance with `AccountKeyWeightedMultiSig`, please refer to [caver.account.create](#caver-account-create) or [caver.account.createWithAccountKeyWeightedMultiSig](#caver-account-createwithaccountkeyweightedmultisig).

**properties**

| Name               | Type   | Description                         |
| ------------------ | ------ | ----------------------------------- |
| threshold          | number | The validation threshold.           |
| weightedPublicKeys | Array  | The array of [WeightedPublicKey][]. |

### AccountKeyRoleBased <a id="accountkeyrolebased"></a>

```javascript
const accountKeyRoleBased = new caver.account.accountKey.accountKeyRoleBased(accountKeyArray)
```

`AccountKeyRoleBased` is used to update AccountKey of an account in the Klaytn with [AccountKeyRoleBased][]. By updating your AccountKey to `AccountKeyRoleBased`, you can change the AccountKey(s) assigned for each role, all of which are used to validate a transaction in Klaytn. See [AccountUpdate](../getting-started.md#account-update) and [AccountKey][] for more details.

To create an Account instance with `AccountKeyRoleBased`, please refer to [caver.account.create](#caver-account-create) or [caver.account.createWithAccountKeyRoleBased](#caver-account-createwithaccountkeyrolebased).

**properties**

| Name            | Type | Description                                                                                                                                                                                                                                                                          |
| --------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| accountKeyArray | Mảng | Mảng xác định accountKey sẽ được sử dụng cho mỗi [vai trò][]. Mỗi vai trò có thể được xác định bằng [AccountKeyLegacy](#accountkeylegacy), [AccountKeyPublic](#accountkeypublic), [AccountKeyFail](#accountkeyfail), hoặc [AccountKeyWeightedMultiSig](#accountkeyweightedmultisig). |

### WeightedPublicKey <a id="weightedpublickey"></a>

```javascript
const weightedPublicKey = new caver.account.accountKey.weightedPublicKey(weight, publicKey)
```

`WeightedPublicKey` chứa khóa công khai và khối lượng của nó. `WeightedPublicKey` là một lớp chứa khóa công khai và khối lượng của khóa, đồng thời lớp này được sử dụng trong [AccountKeyWeightedMultiSig](#accountkeyweightedmultisig).

**thuộc tính**

| Tên        | Loại | Mô tả                                                                                                                                                                               |
| ---------- | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| khối lượng | số    | Khối lượng của khóa công khai. Khối lượng được sử dụng để kiểm tra tổng khối lượng của các khóa công khai có lớn hơn ngưỡng của đối tượng [AccountKeyWeightedMultiSig][] hay không. |
| publicKey  | chuỗi | Chuỗi khóa công khai.                                                                                                                                                               |

### WeightedMultiSigOptions <a id="weightedmultisigoptions"></a>

```javascript
const weightedMultiSigOptions = new caver.account.weightedMultiSigOptions(threshold, weights)
```

`WeightedMultiSigOptions` chứa ngưỡng và khối lượng. `WeightedMultiSigOptions` là một lớp để xác định các tùy chọn của AccountKeyWeightedMultiSig.

**thuộc tính**

| Tên        | Loại | Mô tả                             |
| ---------- | ---- | --------------------------------- |
| ngưỡng     | số   | Ngưỡng xác thực.                  |
| khối lượng | Mảng | Một mảng khối lượng của các khóa. |


## caver.account.create <a id="caver-account-create"></a>

```javascript
caver.account.create(address, accountKey [, options])
```

Tạo một đối tượng Tài khoản với địa chỉ và accountKey.

Nếu accountKey là một chuỗi khóa công khai, thì một đối tượng Tài khoản có [AccountKeyPublic](#accountkeypublic) làm accountKey sẽ được tạo. Nếu accountKey là một mảng chứa các chuỗi khóa công khai, thì một đối tượng Tài khoản có [AccountKeyWeightedMultiSig](#accountkeyweightedmultisig) làm accountKey sẽ được tạo. Nếu các tùy chọn không được xác định là tham số cuối cùng, nó sẽ được tạo bằng cách sử dụng tùy chọn mặc định có ngưỡng là 1 và khối lượng là 1 cho mỗi khóa. Nếu accountKey là một mảng chứa các accountKeys được sử dụng cho từng vai trò thì một đối tượng Tài khoản có [AccountKeyRoleBased](#accountkeyrolebased) sẽ được tạo. Cần xác định các tùy chọn cho từng vai trò với [WeightedMultiSigOptions][]. Nếu không xác định các tùy chọn, tùy chọn mặc định sẽ được sử dụng cho các vai trò sử dụng nhiều khóa công khai. Vui lòng tham khảo ví dụ bên dưới để biết cách sử dụng.

**Tham số**

| Tên        | Loại                                   | Mô tả                                                                                                                                               |
| ---------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| địa chỉ    | chuỗi                                   | Địa chỉ của tài khoản được cập nhật.                                                                                                                |
| accountKey | chuỗi &#124; Mảng                       | Một chuỗi khóa công khai, một mảng các khóa công khai hoặc một mảng 2D trong đó mỗi phần tử chứa một mảng (các) khóa được sử dụng cho từng vai trò. |
| tùy chọn   | [WeightedMultiSigOptions][] &#124; Mảng | (tùy chọn) Tùy chọn cho AccountKeyWeigthedMultiSig.                                                                                                 |


**Giá trị Trả về**

| Loại         | Mô tả                            |
| ------------- | -------------------------------- |
| [Tài khoản][] | Đối tượng tài khoản được trả về. |

**Ví dụ**

```javascript
// Tạo một đối tượng Tài khoản với chuỗi khóa công khai -> Account with AccountKeyPublic
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

Tạo một đối tượng Tài khoản từ AccountKey được mã hóa RLP.

**Tham số**

| Tên           | Type   | Description                              |
| ------------- | ------ | ---------------------------------------- |
| address       | string | The address of an account to be updated. |
| rlpEncodedKey | string | The RLP-encoded string of AccountKey.    |


**Return Value**

| Type        | Description                       |
| ----------- | --------------------------------- |
| [Account][] | The account instance is returned. |

**Example**

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

**Parameters**

| Name    | Type   | Description                              |
| ------- | ------ | ---------------------------------------- |
| address | string | The address of an account to be updated. |


**Return Value**

| Type        | Description                       |
| ----------- | --------------------------------- |
| [Account][] | The account instance is returned. |

**Example**

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

**Parameters**

| Name      | Type   | Description                              |
| --------- | ------ | ---------------------------------------- |
| address   | string | The address of an account to be updated. |
| publicKey | string | The public key string.                   |


**Return Value**

| Type          | Description                      |
| ------------- | -------------------------------- |
| [Tài khoản][] | Đối tượng tài khoản được trả về. |

**Ví dụ**

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

Tạo một Đối tượng tài khoản có AccountKeyFail làm accountKey.

**Tham số**

| Tên     | Loại | Mô tả                                    |
| ------- | ----- | ---------------------------------------- |
| địa chỉ | chuỗi | Địa chỉ của một tài khoản được cập nhật. |


**Giá trị Trả về**

| Loại         | Mô tả                            |
| ------------- | -------------------------------- |
| [Tài khoản][] | Đối tượng tài khoản được trả về. |

**Ví dụ**

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

Tạo một Đối tượng tài khoản có AccountKeyWeightedMultiSig làm accountKey.

**Tham số**

| Tên            | Loại                        | Mô tả                                                                                |
| -------------- | --------------------------- | ------------------------------------------------------------------------------------ |
| địa chỉ        | chuỗi                       | Địa chỉ của một tài khoản được cập nhật.                                             |
| publicKeyArray | Mảng                        | Mảng bao gồm nhiều chuỗi khóa công khai.                                             |
| tùy chọn       | [WeightedMultiSigOptions][] | (tùy chọn) Đối tượng [WeightedMultiSigOptions][] xác định ngưỡng và khối lượng mảng. |


**Giá trị Trả về**

| Loại         | Mô tả                            |
| ------------- | -------------------------------- |
| [Tài khoản][] | Đối tượng tài khoản được trả về. |

**Ví dụ**

```javascript
// tạo một Đối tượng tài khoản không có tùy chọn
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

**Parameters**

| Name                     | Type   | Description                                                                            |
| ------------------------ | ------ | -------------------------------------------------------------------------------------- |
| address                  | string | The address of an account to be updated.                                               |
| roledBasedPublicKeyArray | Array  | A two-dimensional array containing arrays of public key strings for each role.         |
| options                  | Array  | (optional) An array that contains [WeightedMultiSigOptions][] instances for each role. |


**Return Value**

| Type        | Description                       |
| ----------- | --------------------------------- |
| [Account][] | The account instance is returned. |

**Example**

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

**Parameters**

| Name                 | Type   | Description                          |
| -------------------- | ------ | ------------------------------------ |
| rlpEncodedAccountKey | string | An RLP-encoded string of AccountKey. |


**Return Value**

| Type                                                                                                                                                                                                                                            | Description                        |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| [AccountKeyLegacy](#accountkeylegacy) &#124; [AccountKeyPublic](#accountkeypublic) &#124; [AccountKeyFail](#accountkeyfail) &#124; [AccountKeyWeightedMultiSig](#accountkeyweightedmultisig) &#124; [AccountKeyRoleBased](#accountkeyrolebased) | Đối tượng AccountKey được trả lại. |

**Ví dụ**

```javascript
> caver.account.accountKey.decode('0x02a102c10b598a1a3ba252acc21349d61c2fbd9bc8c15c50a5599f420cccc3291f9bf9')
AccountKeyPublic { _publicKey: '0x02c10b598a1a3ba252acc21349d61c2fbd9bc8c15c50a5599f420cccc3291f9bf9' }
```

## account.getRLPEncodingAccountKey <a id="account-getrlpencodingaccountkey"></a>

```javascript
account.getRLPEncodingAccountKey()
```

Trả về chuỗi AccountKey được mã hóa RLP.


**Giá trị Trả về**

| Loại | Mô tả                                      |
| ----- | ------------------------------------------ |
| chuỗi | Một chuỗi được mã hóa RLP của AccountKey . |

**Ví dụ**

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
[Tài khoản]: #account
[Account]: #account
[vai trò]: ../../../../klaytn/design/accounts.md#roles
