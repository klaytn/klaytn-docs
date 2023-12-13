# caver.account

`caver.tài khoản` là gói cung cấp chức năng liên quan đến Tài khoản được sử dụng khi cập nhật tài khoản.

## Lớp <a id="class"></a>

### Tài khoản <a id="account"></a>

```javascript
const tài khoản = new caver.tài khoản(address, tài khoảnKey)
```

`Account` là lớp chứa thông tin cần thiết để cập nhật [AccountKey][] của tài khoản trong nền tảng chuỗi khối Klaytn (Klaytn). Đây là lớp mặc định cho gói `caver.tài khoản`. Để tạo một Đối tượng tài khoản với (các) chuỗi khóa công khai, vui lòng tham khảo [caver.tài khoản.create](#caver-account-create).

**thuộc tính**

| Tên          | type      | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------ | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address      | chuỗi     | Địa chỉ của tài khoản được cập nhật.                                                                                                                                                                                                                                                                                                                                                                                       |
| tài khoảnKey | đối tượng | AccountKey mới sẽ được sử dụng trong tài khoản. Đây có thể là đối tượng [AccountKeyLegacy](#accountkeylegacy), [AccountKeyPublic](#accountkeypublic), [AccountKeyFail](#accountkeyfail), [AccountKeyWeightedMultiSig](#accountkeyweightedmultisig) hoặc [AccountKeyRoleBased](#accountkeyrolebased). Khi giao dịch được thực hiện, tài khoảnKey của tài khoản được lưu trữ trong Klaytn cũng được thay đổi theo. |


### AccountKeyLegacy <a id="accountkeylegacy"></a>

```javascript
const tài khoảnKeyLegacy = new caver.tài khoản.tài khoảnKey.tài khoảnKeyLegacy()
```

`AccountKeyLegacy` dùng để cập nhật AccountKey của tài khoản trong Klaytn bằng [AccountKeyLegacy][]. Để tạo Đối tượng tài khoản với `AccountKeyLegacy`, vui lòng tham khảo [caver.tài khoản.createWithAccountKeyLegacy](#caver-account-createwithaccountkeylegacy).


### AccountKeyPublic <a id="accountkeypublic"></a>

```javascript
const tài khoảnKeyPublic = new caver.tài khoản.tài khoảnKey.tài khoảnKeyPublic(publicKey)
```

`AccountKeyPublic` dùng để cập nhật AccountKey của tài khoản trong Klaytn bằng [AccountKeyPublic][]. Bằng cách cập nhật AccountKey thành `AccountKeyPublic`, bạn có thể thay đổi AccountKey hiện tại của mình thành khóa công khai mới, khóa này sẽ dùng để xác thực giao dịch trong Klaytn. Thay đổi này là cần thiết khi bạn tách khóa riêng tư khỏi địa chỉ tài khoản của mình. Xem [AccountUpdate](../get-started.md#account-update) và [AccountKey][] để biết chi tiết.

Để tạo Đối tượng tài khoản với `AccountKeyPublic`, vui lòng tham khảo [caver.tài khoản.create](#caver-account-create) hoặc [caver.tài khoản.createWithAccountKeyPublic](#caver-account-createwithaccountkeypublic).

**thuộc tính**

| Tên       | Loại | Mô tả                 |
| --------- | ----- | --------------------- |
| publicKey | chuỗi | Chuỗi khóa công khai. |

### AccountKeyFail <a id="accountkeyfail"></a>

```javascript
const tài khoảnKeyFail = new caver.tài khoản.tài khoảnKey.tài khoảnKeyFail()
```

`AccountKeyFail` dùng để cập nhật AccountKey của tài khoản trong Klaytn bằng [AccountKeyFail][]. Để tạo Đối tượng tài khoản với `AccountKeyFail`, vui lòng tham khảo [caver.tài khoản.createWithAccountKeyFail](#caver-account-createwithaccountkeyfail).

### AccountKeyWeightedMultiSig <a id="accountkeyweightedmultisig"></a>

```javascript
const tài khoảnKeyWeightedMultiSig = new caver.tài khoản.tài khoảnKey.tài khoảnKeyWeightedMultiSig(threshold, weightedPublicKeys)
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
const tài khoảnKeyRoleBased = new caver.tài khoản.tài khoảnKey.tài khoảnKeyRoleBased(tài khoảnKeyArray)
```

`AccountKeyRoleBased` dùng để cập nhật AccountKey của một tài khoản trong Klaytn với [AccountKeyRoleBased][]. Bằng cách cập nhật AccountKey của bạn thành `AccountKeyRoleBased`, bạn có thể thay đổi (các) AccountKey được chỉ định cho mỗi vai trò, tất cả đều dùng để xác thực giao dịch trong Klaytn. Xem [AccountUpdate](../get-started.md#account-update) và [AccountKey][] để biết thêm chi tiết.

Để tạo Đối tượng tài khoản với `AccountKeyRoleBased`, vui lòng tham khảo [caver.tài khoản.create](#caver-account-create) hoặc [caver.tài khoản.createWithAccountKeyRoleBased](#caver-account-createwithaccountkeyrolebased).

**thuộc tính**

| Tên               | Loại | Mô tả                                                                                                                                                                                                                                                                                          |
| ----------------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tài khoảnKeyArray | Mảng  | Mảng xác định tài khoảnKey sẽ được sử dụng cho mỗi [vai trò][]. Mỗi vai trò có thể được xác định bằng [AccountKeyLegacy](#accountkeylegacy), [AccountKeyPublic](#accountkeypublic), [AccountKeyFail](#accountkeyfail), hoặc [AccountKeyWeightedMultiSig](#accountkeyweightedmultisig). |

### WeightedPublicKey <a id="weightedpublickey"></a>

```javascript
const weightedPublicKey = new caver.tài khoản.tài khoảnKey.weightedPublicKey(weight, publicKey)
```

`WeightedPublicKey` chứa khóa công khai và trọng số của nó. `WeightedPublicKey` là một lớp chứa khóa công khai và trọng số của khóa, đồng thời lớp này được sử dụng trong [AccountKeyWeightedMultiSig](#accountkeyweightedmultisig).

**thuộc tính**

| Tên       | Loại | Mô tả                                                                                                                                                                 |
| --------- | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| weight    | số    | Trọng số của khóa công khai. Trọng số dùng để kiểm tra tổng trọng số của các khóa công khai có lớn hơn ngưỡng của đối tượng [AccountKeyWeightedMultiSig][] hay không. |
| publicKey | chuỗi | Chuỗi khóa công khai.                                                                                                                                                 |

### WeightedMultiSigOptions <a id="weightedmultisigoptions"></a>

```javascript
const weightedMultiSigOptions = new caver.tài khoản.weightedMultiSigOptions(threshold, weights)
```

`WeightedMultiSigOptions` chứa ngưỡng và các trọng số. `WeightedMultiSigOptions` là một lớp để xác định các tùy chọn của AccountKeyWeightedMultiSig.

**thuộc tính**

| Tên       | type | Mô tả                           |
| --------- | ---- | ------------------------------- |
| threshold | số   | Ngưỡng xác thực.                |
| weights   | Mảng | Một mảng trọng số của các khóa. |


## caver.tài khoản.create <a id="caver-account-create"></a>

```javascript
caver.tài khoản.create(address, tài khoảnKey [, options])
```

Tạo một Đối tượng tài khoản với địa chỉ và tài khoảnKey.

Nếu tài khoảnKey là một chuỗi khóa công khai, một Đối tượng tài khoản có [AccountKeyPublic](#accountkeypublic) làm tài khoảnKey sẽ được tạo. Nếu tài khoảnKey là một mảng chứa các chuỗi khóa công khai thì một Đối tượng tài khoản có [AccountKeyWeightedMultiSig](#accountkeyweightedmultisig) làm tài khoảnKey sẽ được tạo. Nếu các tùy chọn không được xác định là tham số cuối cùng, nó sẽ được tạo bằng cách sử dụng tùy chọn mặc định có ngưỡng là 1 và trọng số là 1 cho mỗi khóa. Nếu tài khoảnKey là một mảng chứa các tài khoảnKeys được sử dụng cho mỗi vai trò thì một Đối tượng tài khoản có [AccountKeyRoleBased](#accountkeyrolebased) sẽ được tạo. Cần xác định các tùy chọn cho mỗi vai trò với [WeightedMultiSigOptions][]. Nếu không xác định các tùy chọn, tùy chọn mặc định sẽ được sử dụng cho các vai trò sử dụng nhiều khóa công khai. Vui lòng tham khảo ví dụ bên dưới để biết cách sử dụng.

**Tham số**

| Tên          | Loại                                   | Mô tả                                                                                                                                              |
| ------------ | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| address      | chuỗi                                   | Địa chỉ của tài khoản được cập nhật.                                                                                                               |
| tài khoảnKey | chuỗi &#124; Mảng                       | Một chuỗi khóa công khai, một mảng các khóa công khai hoặc một mảng 2D trong đó mỗi phần tử chứa một mảng (các) khóa được sử dụng cho mỗi vai trò. |
| tùy chọn     | [WeightedMultiSigOptions][] &#124; Mảng | (tùy chọn) Tùy chọn cho AccountKeyWeigthedMultiSig.                                                                                                |


**Giá trị trả về**

| Loại         | Mô tả                            |
| ------------- | -------------------------------- |
| [Tài khoản][] | Đối tượng tài khoản được trả về. |

**Ví dụ**

```javascript
// Tạo một Đối tượng tài khoản với chuỗi khóa công khai -> Account with AccountKeyPublic
> caver.tài khoản.create('0x{address in hex}', '0x034f1...')
Account {
    _address: '0xc771822ad361898a330df0169f2382ee92f6286d',
    _tài khoảnKey: AccountKeyPublic { _publicKey: '0x034f1...' } 
}

// Tạo một Đối tượng tài khoản với một mảng các khóa công khai -> Account with AccountKeyWeightedMultiSig
> caver.tài khoản.create('0x{address in hex}', ['0x034f1...', '0xfe4b8...'])
Tài khoản {
    _address: '0xc771822ad361898a330df0169f2382ee92f6286d',
    _tài khoảnKey:
    AccountKeyWeightedMultiSig {
        _threshold: 1,
        _weightedPublicKeys: [ 
            WeightedPublicKey { _weight: 1, _publicKey: '0x034f1...' },
            WeightedPublicKey { _weight: 1, _publicKey: '0xfe4b8...' }
        ]
    } 
}

// Tạo một Đối tượng tài khoản với một mảng các khóa công khai với WeightedMultiSigOptions -> Account with AccountKeyWeightedMultiSig
> const options = new caver.tài khoản.weightedMultiSigOptions(2, [1, 1])
> caver.tài khoản.create('0x{address in hex}', ['0x034f1...', '0xfe4b8...'], options)
Account {
    _address: '0xc771822ad361898a330df0169f2382ee92f6286d',
    _tài khoảnKey:
    AccountKeyWeightedMultiSig {
        _threshold: 2,
        _weightedPublicKeys: [ 
            WeightedPublicKey { _weight: 1, _publicKey: '0x034f1...' },
            WeightedPublicKey { _weight: 1, _publicKey: '0xfe4b8...' }
        ]
    } 
}

// Tạo một Đối tượng tài khoản với một mảng trong đó các khóa được sử dụng cho mỗi vai trò được xác định dưới dạng một mảng -> Account with AccountKeyRoleBased
> const publicKeys = [
    ['0xd8510...', '0xaa105...'],
    ['0xd8510...'],
    ['0xd8510...', '0xceeee...']
]
> caver.tài khoản.create('0x{address in hex}', publicKeys)
Account {
    _address: '0xc771822ad361898a330df0169f2382ee92f6286d',
    _tài khoảnKey:
    AccountKeyRoleBased {
        _tài khoảnKeys: [
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

// Tạo một Đối tượng tài khoản với một mảng trong đó các khóa được sử dụng cho mỗi vai trò được xác định là một mảng với một mảng WeightedMultiSigOptions -> Account with AccountKeyRoleBased
> const publicKeys = [
    ['0xd8510...', '0xaa105...'],
    ['0xd8510...'],
    ['0xd8510...', '0xceeee...']
]
> const options = [
    new caver.tài khoản.weightedMultiSigOptions(2, [1, 1]),
    new caver.tài khoản.weightedMultiSigOptions(),
    new caver.tài khoản.weightedMultiSigOptions(3, [1, 2])
]
> caver.tài khoản.create('0x{address in hex}', publicKeys, options)
Account {
    _address: '0xc771822ad361898a330df0169f2382ee92f6286d',
    _tài khoảnKey:
    AccountKeyRoleBased {
        _tài khoảnKeys: [
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
caver.tài khoản.createFromRLPEncoding(address, rlpEncodedKey)
```

Tạo một Đối tượng tài khoản từ AccountKey được mã hóa RLP.

**Tham số**

| Tên           | Loại | Mô tả                                    |
| ------------- | ----- | ---------------------------------------- |
| address       | chuỗi | Địa chỉ của một tài khoản được cập nhật. |
| rlpEncodedKey | chuỗi | Chuỗi được mã hóa RLP của AccountKey.    |


**Giá trị trả về**

| Loại         | Mô tả                            |
| ------------- | -------------------------------- |
| [Tài khoản][] | Đối tượng tài khoản được trả về. |

**Ví dụ**

```javascript
> caver.tài khoản.createFromRLPEncoding('0x{address in hex}', '0x04f84b02f848e301a102c10b598a1a3ba252acc21349d61c2fbd9bc8c15c50a5599f420cccc3291f9bf9e301a1021769a9196f523c419be50c26419ebbec34d3d6aa8b59da834212f13dbec9a9c1')
Account {
    _address: '0x9ea5b871e7bef65868a0d278be3fc6cdbee543ee',
    _tài khoảnKey: 
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
caver.tài khoản.createWithAccountKeyLegacy(address)
```

Tạo một Đối tượng tài khoản có AccountKeyLegacy làm tài khoảnKey.

**Tham số**

| Tên     | Loại | Mô tả                                    |
| ------- | ----- | ---------------------------------------- |
| address | chuỗi | Địa chỉ của một tài khoản được cập nhật. |


**Giá trị trả về**

| Loại         | Mô tả                            |
| ------------- | -------------------------------- |
| [Tài khoản][] | Đối tượng tài khoản được trả về. |

**Ví dụ**

```javascript
> caver.tài khoản.createWithAccountKeyLegacy('0x{address in hex}')
Account {
  _address: '0x9ea5b871e7bef65868a0d278be3fc6cdbee543ee',
  _tài khoảnKey: AccountKeyLegacy {}
}
```

## caver.tài khoản.createWithAccountKeyPublic <a id="caver-account-createwithaccountkeypublic"></a>

```javascript
caver.tài khoản.createWithAccountKeyPublic(address, publicKey)
```

Tạo một Đối tượng tài khoản có AccountKeyPublic làm tài khoảnKey.

**Tham số**

| Tên       | Loại | Mô tả                                    |
| --------- | ----- | ---------------------------------------- |
| address   | chuỗi | Địa chỉ của một tài khoản được cập nhật. |
| publicKey | chuỗi | Chuỗi khóa công khai.                    |


**Giá trị trả về**

| Loại         | Mô tả                            |
| ------------- | -------------------------------- |
| [Tài khoản][] | Đối tượng tài khoản được trả về. |

**Ví dụ**

```javascript
> caver.tài khoản.createWithAccountKeyPublic('0x{address in hex}', '0xb5a9a...')
Tài khoản {
    _address: '0x9ea5b871e7bef65868a0d278be3fc6cdbee543ee',
    _tài khoảnKey: AccountKeyPublic { _publicKey: ,'0xb5a9a...' }
}
```

## caver.tài khoản.createWithAccountKeyFail <a id="caver-account-createwithaccountkeyfail"></a>

```javascript
caver.tài khoản.createWithAccountKeyFail(address)
```

Tạo một Đối tượng tài khoản có AccountKeyFail làm tài khoảnKey.

**Tham số**

| Tên     | Loại | Mô tả                                    |
| ------- | ----- | ---------------------------------------- |
| address | chuỗi | Địa chỉ của một tài khoản được cập nhật. |


**Giá trị trả về**

| Loại         | Mô tả                            |
| ------------- | -------------------------------- |
| [Tài khoản][] | Đối tượng tài khoản được trả về. |

**Ví dụ**

```javascript
> caver.tài khoản.createWithAccountKeyFail('0x{address in hex}')
Account {
  _address: '0x9ea5b871e7bef65868a0d278be3fc6cdbee543ee',
  _tài khoảnKey: AccountKeyFail {}
}
```

## caver.tài khoản.createWithAccountKeyWeightedMultiSig <a id="caver-account-createwithaccountkeyweightedmultisig"></a>

```javascript
caver.tài khoản.createWithAccountKeyWeightedMultiSig(address, publicKeyArray [, options])
```

Tạo một Đối tượng tài khoản có AccountKeyWeightedMultiSig làm tài khoảnKey.

**Tham số**

| Tên            | type                        | Mô tả                                                                                  |
| -------------- | --------------------------- | -------------------------------------------------------------------------------------- |
| address        | chuỗi                       | Địa chỉ của một tài khoản được cập nhật.                                               |
| publicKeyArray | Mảng                        | Mảng bao gồm nhiều chuỗi khóa công khai.                                               |
| tùy chọn       | [WeightedMultiSigOptions][] | (tùy chọn) Đối tượng [WeightedMultiSigOptions][] xác định ngưỡng và trọng số của mảng. |


**Giá trị trả về**

| Loại         | Mô tả                            |
| ------------- | -------------------------------- |
| [Tài khoản][] | Đối tượng tài khoản được trả về. |

**Ví dụ**

```javascript
// tạo một Đối tượng tài khoản không có tùy chọn
> caver.tài khoản.createWithAccountKeyWeightedMultiSig('0x{address in hex}', ['0xb5a9a...', '0xfe4b8...'])
Tài khoản {
    _address: '0xc771822ad361898a330df0169f2382ee92f6286d',
    _tài khoảnKey:
    AccountKeyWeightedMultiSig {
        _threshold: 1,
        _weightedPublicKeys: [ 
            WeightedPublicKey { _weight: 1, _publicKey: '0xb5a9a...' },
            WeightedPublicKey { _weight: 1, _publicKey: '0xfe4b8...' }
        ]
    } 
}

// tạo một Đối tượng tài khoản với các tùy chọn
> const options = new caver.tài khoản.weightedMultiSigOptions(2, [1, 1])
> caver.tài khoản.createWithAccountKeyWeightedMultiSig('0x{address in hex}', ['0xb5a9a...', '0xfe4b8...'], options)
Account {
    _address: '0xc771822ad361898a330df0169f2382ee92f6286d',
    _tài khoảnKey:
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
caver.tài khoản.createWithAccountKeyRoleBased(address, roledBasedPublicKeyArray [, options])
```

Tạo một Đối tượng tài khoản có AccountKeyRoleBased làm tài khoảnKey.

**Tham số**

| Tên                      | Loại | Mô tả                                                                               |
| ------------------------ | ----- | ----------------------------------------------------------------------------------- |
| address                  | chuỗi | Địa chỉ của một tài khoản được cập nhật.                                            |
| roledBasedPublicKeyArray | Mảng  | Một mảng hai chiều chứa các mảng chuỗi khóa công khai cho mỗi vai trò.              |
| tùy chọn                 | Mảng  | (tùy chọn) Một mảng chứa các đối tượng [WeightedMultiSigOptions][] cho mỗi vai trò. |


**Giá trị trả về**

| Loại         | Mô tả                            |
| ------------- | -------------------------------- |
| [Tài khoản][] | Đối tượng tài khoản được trả về. |

**Ví dụ**

```javascript
// tạo một Đối tượng tài khoản không có tùy chọn
> const publicKeys = [
    ['0x034f1...', '0xfe4b8...'],
    ['0xb5a9a...'],
    ['0x034f1...', '0xb5a9a...']
]
> caver.tài khoản.createWithAccountKeyRoleBased('0x{address in hex}', publicKeys)
Account {
    _address: '0xc771822ad361898a330df0169f2382ee92f6286d',
    _tài khoảnKey:
    AccountKeyRoleBased {
        _tài khoảnKeys: [
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

// tạo một Đối tượng tài khoản có các tùy chọn
> const publicKeys = [
    ['0x034f1...', '0xfe4b8...'],
    ['0xb5a9a...'],
    ['0x034f1...', '0xb5a9a...']
]
> const options = [
    new caver.tài khoản.weightedMultiSigOptions(2, [1, 1]),
    new caver.tài khoản.weightedMultiSigOptions(),
    new caver.tài khoản.weightedMultiSigOptions(3, [1, 2])
]
> caver.tài khoản.createWithAccountKeyRoleBased('0x{address in hex}', publicKeys, options)
Account {
    _address: '0xc771822ad361898a330df0169f2382ee92f6286d',
    _tài khoảnKey:
    AccountKeyRoleBased {
        _tài khoảnKeys: [
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
caver.tài khoản.tài khoảnKey.decode(rlpEncodedAccountKey)
```

Giải mã chuỗi được mã hóa RLP của AccountKey và trả về [AccountKeyLegacy](#accountkeylegacy), [AccountKeyPublic](#accountkeypublic), [AccountKeyFail](#accountkeyfail), [AccountKeyWeightedMultiSig](#accountkeyweightedmultisig) hoặc đối tượng [AccountKeyRoleBased](#accountkeyrolebased).

**Tham số**

| Tên                  | Loại | Mô tả                                     |
| -------------------- | ----- | ----------------------------------------- |
| rlpEncodedAccountKey | chuỗi | Một chuỗi được mã hóa RLP của AccountKey. |


**Giá trị trả về**

| type                                                                                                                                                                                                                                                      | Mô tả                             |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| [AccountKeyLegacy](#accountkeylegacy) &#124; [AccountKeyPublic](#accountkeypublic) &#124; [AccountKeyFail](#accountkeyfail) &#124; [AccountKeyWeightedMultiSig](#accountkeyweightedmultisig) &#124; [AccountKeyRoleBased](#accountkeyrolebased) | Đối tượng AccountKey được trả về. |

**Ví dụ**

```javascript
> caver.tài khoản.tài khoảnKey.decode('0x02a102c10b598a1a3ba252acc21349d61c2fbd9bc8c15c50a5599f420cccc3291f9bf9')
AccountKeyPublic { _publicKey: '0x02c10b598a1a3ba252acc21349d61c2fbd9bc8c15c50a5599f420cccc3291f9bf9' }
```

## tài khoản.getRLPEncodingAccountKey <a id="account-getrlpencodingaccountkey"></a>

```javascript
tài khoản.getRLPEncodingAccountKey()
```

Trả về chuỗi được mã hóa RLP của AccountKey.


**Giá trị trả về**

| Loại | Mô tả                                      |
| ----- | ------------------------------------------ |
| chuỗi | Một chuỗi được mã hóa RLP của AccountKey . |

**Ví dụ**

```javascript
> const tài khoản = caver.tài khoản.create('0x{address in hex}', '0x034f1...')
> tài khoản.getRLPEncodingAccountKey()
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
[Tài khoản]: #account
[vai trò]: ../../../../learn/accounts.md#roles