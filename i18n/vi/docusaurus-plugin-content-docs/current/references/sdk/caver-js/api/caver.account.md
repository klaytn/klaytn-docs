# caver.account

`caver.tài khoản` là gói cung cấp chức năng liên quan đến Tài khoản được sử dụng khi cập nhật tài khoản.

## Lớp <a id="class"></a>

### Tài khoản <a id="account"></a>

```javascript
const account = new caver.account(address, accountKey)
```

`Account` là lớp chứa thông tin cần thiết để cập nhật [AccountKey][] của tài khoản trong nền tảng chuỗi khối Klaytn (Klaytn). Đây là lớp mặc định cho gói `caver.tài khoản`. Để tạo một Đối tượng tài khoản với (các) chuỗi khóa công khai, vui lòng tham khảo [caver.tài khoản.create](#caver-account-create).

**thuộc tính**

| Tên          | type      | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------ | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address      | chuỗi     | Địa chỉ của tài khoản được cập nhật.                                                                                                                                                                                                                                                                                                                                                                             |
| tài khoảnKey | đối tượng | AccountKey mới sẽ được sử dụng trong tài khoản. Đây có thể là đối tượng [AccountKeyLegacy](#accountkeylegacy), [AccountKeyPublic](#accountkeypublic), [AccountKeyFail](#accountkeyfail), [AccountKeyWeightedMultiSig](#accountkeyweightedmultisig) hoặc [AccountKeyRoleBased](#accountkeyrolebased). Khi giao dịch được thực hiện, tài khoảnKey của tài khoản được lưu trữ trong Klaytn cũng được thay đổi theo. |

### AccountKeyLegacy <a id="accountkeylegacy"></a>

```javascript
const accountKeyLegacy = new caver.account.accountKey.accountKeyLegacy()
```

`AccountKeyLegacy` dùng để cập nhật AccountKey của tài khoản trong Klaytn bằng [AccountKeyLegacy][]. Để tạo Đối tượng tài khoản với `AccountKeyLegacy`, vui lòng tham khảo [caver.tài khoản.createWithAccountKeyLegacy](#caver-account-createwithaccountkeylegacy).

### AccountKeyPublic <a id="accountkeypublic"></a>

```javascript
const accountKeyPublic = new caver.account.accountKey.accountKeyPublic(publicKey)
```

`AccountKeyPublic` dùng để cập nhật AccountKey của tài khoản trong Klaytn bằng [AccountKeyPublic][]. Bằng cách cập nhật AccountKey thành `AccountKeyPublic`, bạn có thể thay đổi AccountKey hiện tại của mình thành khóa công khai mới, khóa này sẽ dùng để xác thực giao dịch trong Klaytn. Thay đổi này là cần thiết khi bạn tách khóa riêng tư khỏi địa chỉ tài khoản của mình. Xem [AccountUpdate](../get-started.md#account-update) và [AccountKey][] để biết chi tiết.

Để tạo Đối tượng tài khoản với `AccountKeyPublic`, vui lòng tham khảo [caver.tài khoản.create](#caver-account-create) hoặc [caver.tài khoản.createWithAccountKeyPublic](#caver-account-createwithaccountkeypublic).

**thuộc tính**

| Tên       | Loại | Mô tả                 |
| --------- | ----- | --------------------- |
| publicKey | chuỗi | Chuỗi khóa công khai. |

### AccountKeyFail <a id="accountkeyfail"></a>

```javascript
const accountKeyFail = new caver.account.accountKey.accountKeyFail()
```

`AccountKeyFail` dùng để cập nhật AccountKey của tài khoản trong Klaytn bằng [AccountKeyFail][]. Để tạo Đối tượng tài khoản với `AccountKeyFail`, vui lòng tham khảo [caver.tài khoản.createWithAccountKeyFail](#caver-account-createwithaccountkeyfail).

### AccountKeyWeightedMultiSig <a id="accountkeyweightedmultisig"></a>

```javascript
const accountKeyWeightedMultiSig = new caver.account.accountKey.accountKeyWeightedMultiSig(threshold, weightedPublicKeys)
```

`AccountKeyWeightedMultiSig` dùng để cập nhật AccountKey của một tài khoản trong Klaytn với [AccountKeyWeightedMultiSig][]. Bằng cách cập nhật AccountKey của bạn thành `AccountKeyWeightedMultiSig`, bạn có thể thay đổi AccountKey hiện tại của mình thành khóa công khai mới, khóa này sẽ dùng để xác thực giao dịch trong Klaytn. Thay đổi này là cần thiết khi bạn tách khóa riêng tư khỏi địa chỉ tài khoản của mình. Xem [AccountUpdate](../get-started.md#account-update) và [AccountKey][] để biết chi tiết.

Để tạo Đối tượng tài khoản với `AccountKeyWeightedMultiSig`, vui lòng tham khảo [caver.tài khoản.create](#caver-account-create) hoặc [caver.tài khoản.createWithAccountKeyWeightedMultiSig](#caver-account-createwithaccountkeyweightedmultisig).

**thuộc tính**

| Tên                | type | Mô tả                       |
| ------------------ | ---- | --------------------------- |
| threshold          | số   | Ngưỡng xác thực.            |
| weightedPublicKeys | Mảng | Mảng [WeightedPublicKey][]. |

### AccountKeyRoleBased <a id="accountkeyrolebased"></a>

```javascript
const accountKeyRoleBased = new caver.account.accountKey.accountKeyRoleBased(accountKeyArray)
```

`AccountKeyRoleBased` dùng để cập nhật AccountKey của một tài khoản trong Klaytn với [AccountKeyRoleBased][]. Bằng cách cập nhật AccountKey của bạn thành `AccountKeyRoleBased`, bạn có thể thay đổi (các) AccountKey được chỉ định cho mỗi vai trò, tất cả đều dùng để xác thực giao dịch trong Klaytn. Xem [AccountUpdate](../get-started.md#account-update) và [AccountKey][] để biết thêm chi tiết.

Để tạo Đối tượng tài khoản với `AccountKeyRoleBased`, vui lòng tham khảo [caver.tài khoản.create](#caver-account-create) hoặc [caver.tài khoản.createWithAccountKeyRoleBased](#caver-account-createwithaccountkeyrolebased).

**thuộc tính**

| Tên               | Loại | Mô tả                                                                                                                                                                                                                                                                                    |
| ----------------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tài khoảnKeyArray | Mảng  | Mảng xác định tài khoảnKey sẽ được sử dụng cho mỗi \[vai trò]\[]. Mỗi vai trò có thể được xác định bằng [AccountKeyLegacy](#accountkeylegacy), [AccountKeyPublic](#accountkeypublic), [AccountKeyFail](#accountkeyfail), hoặc [AccountKeyWeightedMultiSig](#accountkeyweightedmultisig). |

### WeightedPublicKey <a id="weightedpublickey"></a>

```javascript
const weightedPublicKey = new caver.account.accountKey.weightedPublicKey(weight, publicKey)
```

`WeightedPublicKey` chứa khóa công khai và trọng số của nó. `WeightedPublicKey` là một lớp chứa khóa công khai và trọng số của khóa, đồng thời lớp này được sử dụng trong [AccountKeyWeightedMultiSig](#accountkeyweightedmultisig).

**thuộc tính**

| Tên       | Loại | Mô tả                                                                                                                                                                 |
| --------- | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| weight    | số    | Trọng số của khóa công khai. Trọng số dùng để kiểm tra tổng trọng số của các khóa công khai có lớn hơn ngưỡng của đối tượng [AccountKeyWeightedMultiSig][] hay không. |
| publicKey | chuỗi | Chuỗi khóa công khai.                                                                                                                                                 |

### WeightedMultiSigOptions <a id="weightedmultisigoptions"></a>

```javascript
const weightedMultiSigOptions = new caver.account.weightedMultiSigOptions(threshold, weights)
```

`WeightedMultiSigOptions` chứa ngưỡng và các trọng số. `WeightedMultiSigOptions` là một lớp để xác định các tùy chọn của AccountKeyWeightedMultiSig.

**thuộc tính**

| Tên       | type | Mô tả                           |
| --------- | ---- | ------------------------------- |
| threshold | số   | Ngưỡng xác thực.                |
| weights   | Mảng | Một mảng trọng số của các khóa. |

## caver.tài khoản.create <a id="caver-account-create"></a>

```javascript
caver.account.create(address, accountKey [, options])
```

Tạo một Đối tượng tài khoản với địa chỉ và tài khoảnKey.

Nếu tài khoảnKey là một chuỗi khóa công khai, một Đối tượng tài khoản có [AccountKeyPublic](#accountkeypublic) làm tài khoảnKey sẽ được tạo. Nếu tài khoảnKey là một mảng chứa các chuỗi khóa công khai thì một Đối tượng tài khoản có [AccountKeyWeightedMultiSig](#accountkeyweightedmultisig) làm tài khoảnKey sẽ được tạo. Nếu các tùy chọn không được xác định là tham số cuối cùng, nó sẽ được tạo bằng cách sử dụng tùy chọn mặc định có ngưỡng là 1 và trọng số là 1 cho mỗi khóa. Nếu tài khoảnKey là một mảng chứa các tài khoảnKeys được sử dụng cho mỗi vai trò thì một Đối tượng tài khoản có [AccountKeyRoleBased](#accountkeyrolebased) sẽ được tạo. Cần xác định các tùy chọn cho mỗi vai trò với [WeightedMultiSigOptions][]. Nếu không xác định các tùy chọn, tùy chọn mặc định sẽ được sử dụng cho các vai trò sử dụng nhiều khóa công khai. Vui lòng tham khảo ví dụ bên dưới để biết cách sử dụng.

**Tham số**

| Tên          | Loại                               | Mô tả                                                                                                                                                                 |
| ------------ | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address      | chuỗi                               | Địa chỉ của tài khoản được cập nhật.                                                                                                                                  |
| tài khoảnKey | chuỗi \| Mảng                       | Một chuỗi khóa công khai, một mảng các khóa công khai hoặc một mảng 2D trong đó mỗi phần tử chứa một mảng (các) khóa được sử dụng cho mỗi vai trò. |
| tùy chọn     | [WeightedMultiSigOptions][] \| Mảng | (tùy chọn) Tùy chọn cho AccountKeyWeigthedMultiSig.                                                                                                |

**Giá trị trả về**

| Loại           | Mô tả                            |
| --------------- | -------------------------------- |
| \[Tài khoản]\[] | Đối tượng tài khoản được trả về. |

**Ví dụ**

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

## caver.tài khoản.createFromRLPEncoding <a id="caver-account-createfromrlpencoding"></a>

```javascript
caver.account.createFromRLPEncoding(address, rlpEncodedKey)
```

Tạo một Đối tượng tài khoản từ AccountKey được mã hóa RLP.

**Tham số**

| Tên           | Loại | Mô tả                                    |
| ------------- | ----- | ---------------------------------------- |
| address       | chuỗi | Địa chỉ của một tài khoản được cập nhật. |
| rlpEncodedKey | chuỗi | Chuỗi được mã hóa RLP của AccountKey.    |

**Giá trị trả về**

| Loại           | Mô tả                            |
| --------------- | -------------------------------- |
| \[Tài khoản]\[] | Đối tượng tài khoản được trả về. |

**Ví dụ**

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

## caver.tài khoản.createWithAccountKeyLegacy <a id="caver-account-createwithaccountkeylegacy"></a>

```javascript
caver.account.createWithAccountKeyLegacy(address)
```

Tạo một Đối tượng tài khoản có AccountKeyLegacy làm tài khoảnKey.

**Tham số**

| Tên     | Loại | Mô tả                                    |
| ------- | ----- | ---------------------------------------- |
| address | chuỗi | Địa chỉ của một tài khoản được cập nhật. |

**Giá trị trả về**

| Loại           | Mô tả                            |
| --------------- | -------------------------------- |
| \[Tài khoản]\[] | Đối tượng tài khoản được trả về. |

**Ví dụ**

```javascript
> caver.account.createWithAccountKeyLegacy('0x{address in hex}')
Account {
  _address: '0x9ea5b871e7bef65868a0d278be3fc6cdbee543ee',
  _accountKey: AccountKeyLegacy {}
}
```

## caver.tài khoản.createWithAccountKeyPublic <a id="caver-account-createwithaccountkeypublic"></a>

```javascript
caver.account.createWithAccountKeyPublic(address, publicKey)
```

Tạo một Đối tượng tài khoản có AccountKeyPublic làm tài khoảnKey.

**Tham số**

| Tên       | Loại | Mô tả                                    |
| --------- | ----- | ---------------------------------------- |
| address   | chuỗi | Địa chỉ của một tài khoản được cập nhật. |
| publicKey | chuỗi | Chuỗi khóa công khai.                    |

**Giá trị trả về**

| Loại           | Mô tả                            |
| --------------- | -------------------------------- |
| \[Tài khoản]\[] | Đối tượng tài khoản được trả về. |

**Ví dụ**

```javascript
> caver.account.createWithAccountKeyPublic('0x{address in hex}', '0xb5a9a...')
Account {
    _address: '0x9ea5b871e7bef65868a0d278be3fc6cdbee543ee',
    _accountKey: AccountKeyPublic { _publicKey: ,'0xb5a9a...' }
}
```

## caver.tài khoản.createWithAccountKeyFail <a id="caver-account-createwithaccountkeyfail"></a>

```javascript
caver.account.createWithAccountKeyFail(address)
```

Tạo một Đối tượng tài khoản có AccountKeyFail làm tài khoảnKey.

**Tham số**

| Tên     | Loại | Mô tả                                    |
| ------- | ----- | ---------------------------------------- |
| address | chuỗi | Địa chỉ của một tài khoản được cập nhật. |

**Giá trị trả về**

| Loại           | Mô tả                            |
| --------------- | -------------------------------- |
| \[Tài khoản]\[] | Đối tượng tài khoản được trả về. |

**Ví dụ**

```javascript
> caver.account.createWithAccountKeyFail('0x{address in hex}')
Account {
  _address: '0x9ea5b871e7bef65868a0d278be3fc6cdbee543ee',
  _accountKey: AccountKeyFail {}
}
```

## caver.tài khoản.createWithAccountKeyWeightedMultiSig <a id="caver-account-createwithaccountkeyweightedmultisig"></a>

```javascript
caver.account.createWithAccountKeyWeightedMultiSig(address, publicKeyArray [, options])
```

Tạo một Đối tượng tài khoản có AccountKeyWeightedMultiSig làm tài khoảnKey.

**Tham số**

| Tên            | type                        | Mô tả                                                                                  |
| -------------- | --------------------------- | -------------------------------------------------------------------------------------- |
| address        | chuỗi                       | Địa chỉ của một tài khoản được cập nhật.                                               |
| publicKeyArray | Mảng                        | Mảng bao gồm nhiều chuỗi khóa công khai.                                               |
| tùy chọn       | [WeightedMultiSigOptions][] | (tùy chọn) Đối tượng [WeightedMultiSigOptions][] xác định ngưỡng và trọng số của mảng. |

**Giá trị trả về**

| Loại           | Mô tả                            |
| --------------- | -------------------------------- |
| \[Tài khoản]\[] | Đối tượng tài khoản được trả về. |

**Ví dụ**

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

## caver.tài khoản.createWithAccountKeyRoleBased <a id="caver-account-createwithaccountkeyrolebased"></a>

```javascript
caver.account.createWithAccountKeyRoleBased(address, roledBasedPublicKeyArray [, options])
```

Tạo một Đối tượng tài khoản có AccountKeyRoleBased làm tài khoảnKey.

**Tham số**

| Tên                      | Loại | Mô tả                                                                               |
| ------------------------ | ----- | ----------------------------------------------------------------------------------- |
| address                  | chuỗi | Địa chỉ của một tài khoản được cập nhật.                                            |
| roledBasedPublicKeyArray | Mảng  | Một mảng hai chiều chứa các mảng chuỗi khóa công khai cho mỗi vai trò.              |
| tùy chọn                 | Mảng  | (tùy chọn) Một mảng chứa các đối tượng [WeightedMultiSigOptions][] cho mỗi vai trò. |

**Giá trị trả về**

| Loại           | Mô tả                            |
| --------------- | -------------------------------- |
| \[Tài khoản]\[] | Đối tượng tài khoản được trả về. |

**Ví dụ**

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

## caver.tài khoản.tài khoảnKey.decode <a id="caver-account-accountkey-decode"></a>

```javascript
caver.account.accountKey.decode(rlpEncodedAccountKey)
```

Giải mã chuỗi được mã hóa RLP của AccountKey và trả về [AccountKeyLegacy](#accountkeylegacy), [AccountKeyPublic](#accountkeypublic), [AccountKeyFail](#accountkeyfail), [AccountKeyWeightedMultiSig](#accountkeyweightedmultisig) hoặc đối tượng [AccountKeyRoleBased](#accountkeyrolebased).

**Tham số**

| Tên                  | Loại | Mô tả                                     |
| -------------------- | ----- | ----------------------------------------- |
| rlpEncodedAccountKey | chuỗi | Một chuỗi được mã hóa RLP của AccountKey. |

**Giá trị trả về**

| type                                                                                                                                                                                                                            | Mô tả                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| [AccountKeyLegacy](#accountkeylegacy) \| [AccountKeyPublic](#accountkeypublic) \| [AccountKeyFail](#accountkeyfail) \| [AccountKeyWeightedMultiSig](#accountkeyweightedmultisig) \| [AccountKeyRoleBased](#accountkeyrolebased) | Đối tượng AccountKey được trả về. |

**Ví dụ**

```javascript
> caver.account.accountKey.decode('0x02a102c10b598a1a3ba252acc21349d61c2fbd9bc8c15c50a5599f420cccc3291f9bf9')
AccountKeyPublic { _publicKey: '0x02c10b598a1a3ba252acc21349d61c2fbd9bc8c15c50a5599f420cccc3291f9bf9' }
```

## tài khoản.getRLPEncodingAccountKey <a id="account-getrlpencodingaccountkey"></a>

```javascript
account.getRLPEncodingAccountKey()
```

Trả về chuỗi được mã hóa RLP của AccountKey.

**Giá trị trả về**

| Loại | Mô tả                                      |
| ----- | ------------------------------------------ |
| chuỗi | Một chuỗi được mã hóa RLP của AccountKey . |

**Ví dụ**

```javascript
> const account = caver.account.create('0x{address in hWeightedMultiSigOptionsex}', '0x034f1...')
> account.getRLPEncodingAccountKey()
'0x02a102d851040f46d61a042a787cca34ad12bc43e51f01ad0b22270cfc25c15c4b4e22'
```

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
