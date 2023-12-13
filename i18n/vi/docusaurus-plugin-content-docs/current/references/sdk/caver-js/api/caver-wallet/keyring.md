# caver.wallet.keyring

`caver.wallet.keyring` là một gói cung cấp hàm liên quan đến Keyring bao gồm địa chỉ và (các) khóa riêng tư.

## Lớp <a href="#class" id="class"></a>

`Keyring` là một cấu trúc chứa địa chỉ của một tài khoản và (các) khóa riêng tư. Đây là một lớp trong caver-js cho phép người dùng đăng nhập bằng [tài khoản Klaytn](../../../../../learn/accounts.md#klaytn-accounts) của chính họ.

`Keyring` có thể được phân thành ba loại, tùy thuộc vào loại khóa được lưu trữ: [SingleKeyring](#singlekeyring) để lưu trữ một địa chỉ và một khóa riêng tư, [MultipleKeyring](#multiplekeyring) để lưu trữ một địa chỉ và nhiều khóa riêng tư và [RoleBasedKeyring](#rolebasedkeyring) để lưu trữ một địa chỉ và một hoặc nhiều khóa riêng tư cho mỗi vai trò.

* [SingleKeyring](#singlekeyring): Người dùng ký bằng khóa riêng tư
* [MultipleKeyring](#multiplekeyring): Người dùng ký bằng các khóa riêng tư
* [RoleBasedKeyring](#rolebasedkeyring): Người dùng ký bằng (các) khóa riêng tư theo vai trò

### SingleKeyring <a href="#singlekeyring" id="singlekeyring"></a>

```javascript
const keyring = new caver.wallet.keyring.singleKeyring(address, key)
```

`SingleKeyring` là lớp lưu trữ `address` của tài khoản và `private key`. Để tạo đối tượng SingleKeyring bằng chuỗi khóa riêng tư, vui lòng tham khảo [caver.wallet.keyring.create](#caver-wallet-keyring-create).

`SingleKeyring` sử dụng khóa riêng tư không được chỉ định vai trò.

**thuộc tính**

| Tên     | type                                | Mô tả                                                                               |
| ------- | ----------------------------------- | ----------------------------------------------------------------------------------- |
| address | chuỗi                               | Địa chỉ của tài khoản.                                                              |
| khóa    | [PrivateKey](#privatekey) | Một đối tượng [PrivateKey](#privatekey) chứa một khóa riêng tư bên trong. |

### MultipleKeyring <a href="#multiplekeyring" id="multiplekeyring"></a>

```javascript
const keyring = new caver.wallet.keyring.multipleKeyring(address, keys)
```

`MultipleKeyring` là lớp lưu trữ `address` của tài khoản và nhiều `private key`. Để tạo một đối tượng MultipleKeyring với các chuỗi khóa riêng tư, vui lòng tham khảo [caver.wallet.keyring.create](#caver-wallet-keyring-create).

`MultipleKeyring` sử dụng các khóa riêng tư không được chỉ định vai trò.

**thuộc tính**

| Tên     | Loại | Mô tả                                                                                        |
| ------- | ----- | -------------------------------------------------------------------------------------------- |
| address | chuỗi | Địa chỉ của tài khoản.                                                                       |
| keys    | Mảng  | Một mảng các đối tượng [PrivateKey](#privatekey) chứa một khóa riêng tư bên trong. |

### RoleBasedKeyring <a href="#rolebasedkeyring" id="rolebasedkeyring"></a>

```javascript
const keyring = new caver.wallet.keyring.roleBasedKeyring(address, keys)
```

`RoleBasedKeyring` là lớp lưu trữ `address` của tài khoản và `private key` được sử dụng cho mỗi vai trò ở dạng một mảng.

`RoleBasedKeyring` xác định `keys` được triển khai dưới dạng mảng hai chiều (`keys` trống giống như `[ [], [], [] ]`) có thể bao gồm nhiều khóa cho mỗi [vai trò](../../../../../learn/accounts.md#roles). Phần tử mảng đầu tiên xác định (các) khóa riêng tư cho `roleTransactionKey`, phần tử thứ hai xác định (các) khóa riêng tư cho `roleAccountUpdateKey` và phần tử thứ ba xác định (các) khóa riêng tư cho `roleFeePayerKey`.

**thuộc tính**

| Tên     | type  | Mô tả                                                                                                                                                                                                                                                                                                                                                                                       |
| ------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address | chuỗi | Địa chỉ của tài khoản.                                                                                                                                                                                                                                                                                                                                                                      |
| keys    | Mảng  | Mảng hai chiều xác định các khóa được sử dụng cho mỗi [vai trò](../../../../../learn/accounts.md#roles). Mỗi [vai trò](../../../../../learn/accounts.md#roles) bao gồm (các) đối tượng [PrivateKey](#privatekey). Phần tử đầu tiên trong phần này là `roleTransactionKey`. Phần tử thứ hai là `roleAccountUpdateKey`. Phần tử cuối cùng là `roleFeePayerKey`. |

Dưới đây là một getter được xác định trong keyring để sử dụng trực quan khóa được xác định cho từng vai trò. Khóa được sử dụng cho từng vai trò có thể được truy cập dễ dàng hơn thông qua getter bên dưới.

| Tên                  | Loại | Mô tả                                                                                                                                                                       |
| -------------------- | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| roleTransactionKey   | Mảng  | roleTransactionKey dùng để ký các giao dịch (ngoại trừ các giao dịch để cập nhật tài khoản). `keyring.roleTransactionkey` sẽ trả về phần tử đầu tiên của thuộc tính `keys`. |
| roleAccountUpdateKey | Mảng  | roleAccountUpdateKey dùng để ký các giao dịch cập nhật tài khoản. `keyring.roleAccountUpdateKey` sẽ trả về phần tử thứ hai của thuộc tính `keys`.                           |
| roleFeePayerKey      | Mảng  | roleFeePayerKey dùng để ký các giao dịch với tư cách là người trả phí. `keyring.roleFeePayerKey` sẽ trả về phần tử thứ ba của thuộc tính `keys`.                            |

### PrivateKey <a href="#privatekey" id="privatekey"></a>

```javascript
const privateKey = new caver.wallet.keyring.privateKey('0x{private key}')
```

`PrivateKey` là lớp chứa chuỗi khóa riêng. Khóa riêng tư được sử dụng cho từng vai trò trong Keyring được xác định là đối tượng `PrivateKey` này.

**thuộc tính**

| Tên        | Loại | Mô tả                |
| ---------- | ----- | -------------------- |
| privateKey | chuỗi | Chuỗi khóa riêng tư. |

### SignatureData <a href="#signaturedata" id="signaturedata"></a>

`SignatureData` là lớp chứa dữ liệu chữ ký bên trong. Chữ ký là kết quả của `sign` hoặc `signMessage` sẽ được trả về dưới dạng signatureData. Bạn có thể xem cách signatureData chứa (các) chữ ký bên trong như bên dưới.

```javascript
const signature = new caver.wallet.keyring.signatureData(['0x1b', '0x2dfc6...', '0x15038...'])
```

**thuộc tính**

| Tên | type  | Mô tả               |
| --- | ----- | ------------------- |
| v   | Chuỗi | Mã khôi phục ECDSA. |
| r   | Chuỗi | Chữ ký ECDSA r.     |
| s   | Chuỗi | Chữ ký ECDSA s.     |

## caver.wallet.keyring.generate <a href="#caver-wallet-keyring-generate" id="caver-wallet-keyring-generate"></a>

```javascript
caver.wallet.keyring.generate([entropy])
```

Tạo một đối tượng SingleKeyring với khóa riêng tư được tạo ngẫu nhiên.

**Tham số**

| Tên     | Loại | Mô tả                                                  |
| ------- | ----- | ------------------------------------------------------ |
| entropy | chuỗi | (tùy chọn) Một chuỗi ngẫu nhiên để tăng độ nhiễu loạn. |

**Giá trị trả về**

| Loại                                     | Mô tả                                                      |
| ----------------------------------------- | ---------------------------------------------------------- |
| [SingleKeyring](#singlekeyring) | Một đối tượng keyring đơn được tạo ngẫu nhiên được trả về. |

**Ví dụ**

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

Tạo một chuỗi khóa riêng tư.

**Tham số**

| Tên     | Loại | Mô tả                                                  |
| ------- | ----- | ------------------------------------------------------ |
| entropy | chuỗi | (tùy chọn) Một chuỗi ngẫu nhiên để tăng độ nhiễu loạn. |

**Giá trị trả về**

| Loại | Mô tả                            |
| ----- | -------------------------------- |
| chuỗi | Chuỗi khóa riêng tư được trả về. |

**Ví dụ**

```javascript
> caver.wallet.keyring.generateSingleKey()
'0x{private key}'
```

## caver.wallet.keyring.generateMultipleKeys <a href="#caver-wallet-keyring-generatemultiplekeys" id="caver-wallet-keyring-generatemultiplekeys"></a>

```javascript
caver.wallet.keyring.generateMultipleKeys(num [, entropy])
```

Tạo chuỗi khóa riêng tư.

**Tham số**

| Tên     | Loại | Mô tả                                                  |
| ------- | ----- | ------------------------------------------------------ |
| num     | số    | Số chuỗi khóa riêng tư.                                |
| entropy | chuỗi | (tùy chọn) Một chuỗi ngẫu nhiên để tăng độ nhiễu loạn. |

**Giá trị trả về**

| Loại | Mô tả                                                 |
| ----- | ----------------------------------------------------- |
| Mảng  | Một mảng bao gồm các chuỗi khóa riêng tư được trả về. |

**Ví dụ**

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

Tạo một mảng 2D trong đó mỗi phần tử mảng chứa các khóa được xác định cho từng [vai trò](../../../../../learn/accounts.md#roles).

**Tham số**

| Tên      | Loại | Mô tả                                                                                            |
| -------- | ----- | ------------------------------------------------------------------------------------------------ |
| numArray | Mảng  | Một mảng chứa số lượng khóa cho mỗi [vai trò](../../../../../learn/accounts.md#roles). |
| entropy  | chuỗi | (tùy chọn) Một chuỗi ngẫu nhiên để tăng độ nhiễu loạn.                                           |

**Giá trị trả về**

| Loại | Mô tả                                                                                                                                         |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Mảng  | Trả về một mảng 2D trong đó mỗi phần tử mảng chứa các khóa được xác định cho mỗi [vai trò](../../../../../learn/accounts.md#roles). |

**Ví dụ**

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

Tạo một đối tượng Keyring với các tham số.

Nếu `key` là một chuỗi khóa riêng tư thì đối tượng [SingleKeyring](#singlekeyring) sử dụng một khóa riêng tư sẽ được tạo. Nếu `key` là một mảng chứa các chuỗi khóa riêng tư thì một đối tượng [MultipleKeyring](#multiplekeyring) sử dụng nhiều khóa riêng tư sẽ được tạo. Nếu `key` là một mảng 2D trong đó mỗi phần tử chứa (các) khóa riêng được sử dụng cho mỗi vai trò thì một đối tượng [RoleBasedKeyring](#rolebasedkeyring) sẽ được tạo.

**Tham số**

| Tên     | Loại    | Mô tả                                                                                                                                                                                  |
| ------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address | chuỗi    | Một địa chỉ của keyring.                                                                                                                                                               |
| khóa    | chuỗi \ | Mảng | Chuỗi khóa riêng tư, một mảng khóa riêng tư hoặc mảng 2D trong đó mỗi phần tử chứa (các) khóa được sử dụng cho mỗi [vai trò](../../../../../learn/accounts.md#roles). |

**Giá trị trả về**

| Loại     | Mô tả                                                                                                                                                                                                                   |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Keyring` | Đối tượng keyring được trả về. Tùy thuộc vào tham số `key`, nó có thể là [SingleKeyring](#singlekeyring), [MultipleKeyring](#multiplekeyring) hoặc [RoleBasedKeyring](#rolebasedkeyring). |

**Ví dụ**

```javascript
// Tạo singleKeyring sử dụng một khóa riêng tư
> caver.wallet.keyring.create('0x{address in hex}', '0x{private key}')
SingleKeyring {
    _address: '0x30fcfa9679c7141a234c1324c7e0a8b715bdfc90',
    _key: PrivateKey { _privateKey: '0x{private key}' }
}

// Tạo multipleKeyring sử dụng nhiều khóa riêng tư
> caver.wallet.keyring.create('0x{address in hex}', ['0x{private key1}', '0x{private key2}'])
MultipleKeyring {
    _address: '0x30fcfa9679c7141a234c1324c7e0a8b715bdfc90',
    _keys: [
        PrivateKey { _privateKey: '0x{private key1}' },
        PrivateKey { _privateKey: '0x{private key2}' }
    ]
}

// Tạo roleBasedKeyring sử dụng (các) khóa riêng tư khác nhau theo vai trò
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

Tạo đối tượng `SingleKeyring` từ chuỗi khóa riêng tư hoặc [KlaytnWalletKey](../../../../../learn/accounts.md#klaytn-wallet-key-format).

**Tham số**

| Tên  | type  | Mô tả                                                                                                                            |
| ---- | ----- | -------------------------------------------------------------------------------------------------------------------------------- |
| khóa | chuỗi | Tham số này có thể là khóa riêng tư hoặc [KlaytnWalletKey](../../../../../learn/accounts.md#klaytn-wallet-key-format). |

**Giá trị trả về**

| Loại                                     | Mô tả                                |
| ----------------------------------------- | ------------------------------------ |
| [SingleKeyring](#singlekeyring) | Đối tượng SingleKeyring được trả về. |

**Ví dụ**

```javascript
// Tạo singleKeyring từ chuỗi khóa riêng tư
> caver.wallet.keyring.createFromPrivateKey('0x{private key}')
SingleKeyring {
    _address: '0xaa7b43f2eab01cfd787b07ce2f2fb5d6d20a8aa0',
    _key: PrivateKey { _privateKey: '0x{private key}' }
}

// Tạo singleKeyring từ KlaytnWalletKey
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

Tạo đối tượng `SingleKeyring` từ chuỗi [KlaytnWalletKey](../../../../../learn/accounts.md#klaytn-wallet-key-format).

**Tham số**

| Tên             | Loại | Mô tả                                                                                         |
| --------------- | ----- | --------------------------------------------------------------------------------------------- |
| klaytnWalletKey | chuỗi | Chuỗi [KlaytnWalletKey](../../../../../learn/accounts.md#klaytn-wallet-key-format). |

**Giá trị trả về**

| Loại                                     | Mô tả                                |
| ----------------------------------------- | ------------------------------------ |
| [SingleKeyring](#singlekeyring) | Đối tượng SingleKeyring được trả về. |

**Ví dụ**

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

Tạo đối tượng `SingleKeyring` từ địa chỉ và chuỗi khóa riêng tư.

**Tham số**

| Tên     | Loại | Mô tả                        |
| ------- | ----- | ---------------------------- |
| address | chuỗi | Địa chỉ dùng để tạo keyring. |
| khóa    | chuỗi | Chuỗi khóa riêng tư.         |

**Giá trị trả về**

| type                                      | Mô tả                                |
| ----------------------------------------- | ------------------------------------ |
| [SingleKeyring](#singlekeyring) | Đối tượng SingleKeyring được trả về. |

**Ví dụ**

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

Tạo đối tượng `MultipleKeyring` từ một địa chỉ và chuỗi khóa riêng tư.

**Tham số**

| Tên      | Loại | Mô tả                         |
| -------- | ----- | ----------------------------- |
| address  | chuỗi | Một địa chỉ của keyring.      |
| keyArray | Mảng  | Một mảng chuỗi khóa riêng tư. |

**Giá trị trả về**

| Loại                                         | Mô tả                                  |
| --------------------------------------------- | -------------------------------------- |
| [MultipleKeyring](#multiplekeyring) | Đối tượng MultipleKeyring được trả về. |

**Ví dụ**

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

Tạo một đối tượng `RoleBasedKeyring` từ một địa chỉ và một mảng 2D trong đó mỗi phần tử mảng chứa các khóa được xác định cho mỗi [vai trò](../../../../../learn/accounts.md#roles).

**Tham số**

| Tên                | type  | Mô tả                                                              |
| ------------------ | ----- | ------------------------------------------------------------------ |
| address            | chuỗi | Một địa chỉ của keyring.                                           |
| roledBasedKeyArray | Mảng  | Mảng hai chiều chứa các mảng chuỗi khóa riêng tư cho từng vai trò. |

**Giá trị trả về**

| Loại                                           | Mô tả                                   |
| ----------------------------------------------- | --------------------------------------- |
| [RoleBasedKeyring](#rolebasedkeyring) | Đối tượng RoleBasedKeyring được trả về. |

**Ví dụ**

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

Giải mã JSON lưu trữ khóa v3 hoặc v4 và trả về đối tượng Keyring đã giải mã.

**Tham số**

| Tên      | Loại     | Mô tả                               |
| -------- | --------- | ----------------------------------- |
| keystore | đối tượng | Lưu trữ khóa v3 hoặc v4 để giải mã. |
| password | chuỗi     | Mật khẩu dùng để mã hóa.            |

**Giá trị trả về**

| Loại     | Mô tả                                                                                                                                                                        |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Keyring` | Đối tượng khóa được giải mã ([SingleKeyring](#singlekeyring), [MultipleKeyring](#multiplekeyring) hoặc [RoleBasedKeyring](#rolebasedkeyring)). |

**Ví dụ**

```javascript
// Giải mã lưu trữ khóa v4 (khóa đơn được mã hóa)
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

// Giải mã lưu trữ khóa v4 (mã hóa nhiều khóa)
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

// Giải mã lưu trữ khóa v4 (khóa dựa trên vai trò được mã hóa)
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

// Giải mã lưu trữ khóa v3 JSON
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

Trả về (các) chuỗi khóa công khai. Nếu `keyring` là đối tượng [SingleKeyring](#singlekeyring) thì getPublicKey sẽ trả về một chuỗi khóa công khai. Nếu `keyring` là đối tượng [MultipleKeyring](#multiplekeyring) thì getPublicKey sẽ trả về một mảng các chuỗi khóa công khai. Nếu `keyring` là đối tượng [RoleBasedKeyring](#rolebasedkeyring) thì getPublicKey sẽ trả về một mảng hai chiều trong đó (các) khóa công khai được sử dụng cho mỗi vai trò được xác định dưới dạng một mảng.

**Tham số**

| Tên        | Loại   | Mô tả                                                        |
| ---------- | ------- | ------------------------------------------------------------ |
| compressed | boolean | (tùy chọn) Có ở định dạng nén hay không (mặc định: `false`). |

**Giá trị trả về**

| Loại    | Mô tả                              |
| -------- | ---------------------------------- |
| chuỗi \ | Mảng | Khóa công khai của keyring. |

**Ví dụ**

```javascript
// Nhận khóa công khai với singleKeyring
> keyring.getPublicKey()
'0x49b2a...'

// Nhận khóa công khai bằng multipleKeyring
> keyring.getPublicKey()
[ '0x65b51...', '0x8d85c...' ]

// Nhận khóa công khai với roleBasedKeyring
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

Trả về một đối tượng keyring đã sao chép.

**Giá trị trả về**

| Loại     | Mô tả                                                                                                                                                                         |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Keyring` | Đối tượng khóa được sao chép ([SingleKeyring](#singlekeyring), [MultipleKeyring](#multiplekeyring) hoặc [RoleBasedKeyring](#rolebasedkeyring)). |

**Ví dụ**

```javascript
// Khi keyring là một đối tượng SingleKeyring
> keyring.copy()
SingleKeyring {
    _address: '0x30fcfa9679c7141a234c1324c7e0a8b715bdfc90',
    _key: PrivateKey { _privateKey: '0x{private key}' }
}

// Khi keyring là một đối tượng MultipleKeyring
> keyring.copy()
MultipleKeyring {
    _address: '0x30fcfa9679c7141a234c1324c7e0a8b715bdfc90',
    _keys: [
        PrivateKey { _privateKey: '0x{private key1}' },
        PrivateKey { _privateKey: '0x{private key2}' }
    ]
}

// Khi keyring là một đối tượng RoleBasedKeyring
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

Ký với transactionHash bằng (các) khóa riêng tư và trả về (các) chữ ký. Nếu người dùng chưa xác định tham số chỉ mục, `keyring.sign` sẽ ký giao dịch bằng tất cả các khóa riêng tư mà vai trò này sử dụng. Nếu `index` được xác định thì `keyring.sign` ký giao dịch chỉ sử dụng một khóa riêng tư tại chỉ mục. Bạn có thể kiểm tra vai trò được sử dụng trong caver-js thông qua `caver.wallet.keyring.role`.

Khi ký giao dịch, bạn nên sử dụng [caver.wallet.sign](./caver-wallet.md#caver-wallet-sign) hoặc [transaction.sign](../caver-transaction/caver-transaction.md#transaction-sign).

**Tham số**

| Tên             | Loại    | Mô tả                                                                                                                                                                                                                   |
| --------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| transactionHash | chuỗi    | Chuỗi hàm băm của một giao dịch để ký.                                                                                                                                                                                  |
| chainId         | chuỗi \ | số | Id chuỗi của nền tảng chuỗi khối Klaytn.                                                                                                                                                                           |
| vai trò         | số       | Một con số biểu thị vai trò của khóa. Bạn có thể sử dụng `caver.wallet.keyring.role`.                                                                                                                                   |
| chỉ số          | số       | (tùy chọn) Chỉ mục khóa riêng tư bạn muốn sử dụng. Chỉ mục phải nhỏ hơn độ dài của mảng các khóa riêng tư được định rõ cho mỗi vai trò. Nếu không định rõ chỉ mục, phương pháp này sẽ sử dụng tất cả các khóa riêng tư. |

**Giá trị trả về**

| Loại | Mô tả                                               |
| ----- | --------------------------------------------------- |
| Mảng  | Một mảng [SignatureData](#signaturedata). |

**Ví dụ**

```javascript
// Sử dụng roleBasedKeyring có hai khóa riêng tư trong roleTransactionKey
> keyring.sign('0xe9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550', '0x2810', caver.wallet.keyring.role.roleTransactionKey)
[
    SignatureData { _v: '0x5044', _r: '0x7a8b6...', _s: '0x17139...' },
    SignatureData { _v: '0x5043', _r: '0x7f978...', _s: '0x1a532...' }
]

// Sử dụng roleBasedKeyring có hai khóa riêng tư trong roleTransactionKey với chỉ mục
> keyring.sign('0xe9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550', '0x2810', caver.wallet.keyring.role.roleTransactionKey, 1)
[
    SignatureData { _v: '0x5043', _r: '0x7f978...', _s: '0x1a532...' }
]

// Sử dụng roleBasedKeyring có hai khóa riêng tư trong roleAccountUpdateKey
> keyring.sign('0xe9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550', '0x2810', caver.wallet.keyring.role.roleAccountUpdateKey)
[
    SignatureData { _v: '0x5044', _r: '0xdbce8...', _s: '0x039a6...' },
    SignatureData { _v: '0x5044', _r: '0xf69b7...', _s: '0x71dc9...' }
]

// Sử dụng roleBasedKeyring có hai khóa riêng tư trong roleAccountUpdateKey có chỉ mục
> keyring.sign('0xe9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550', '0x2810', caver.wallet.keyring.role.roleAccountUpdateKey, 1)
[
    SignatureData { _v: '0x5044', _r: '0xf69b7...', _s: '0x71dc9...' }
]

// Sử dụng roleBasedKeyring có hai khóa riêng tư trong roleFeePayerKey
> keyring.sign('0xe9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550', '0x2810', caver.wallet.keyring.role.roleFeePayerKey)
[
    SignatureData { _v: '0x5043', _r: '0xe48bf...', _s: '0x1cf36...' },
    SignatureData { _v: '0x5043', _r: '0x82976...', _s: '0x3c5e0...' }
]

// Sử dụng roleBasedKeyring có hai khóa riêng tư trong roleFeePayerKey có chỉ mục
> keyring.sign('0xe9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550', '0x2810', caver.wallet.keyring.role.roleFeePayerKey, 1)
[
    SignatureData { _v: '0x5043', _r: '0x82976...', _s: '0x3c5e0...' }
]
```

## keyring.ecsign <a href="#keyring-ecsign" id="keyring-ecsign"></a>

```javascript
keyring.ecsign(hash, role [, index])
```

Ký với dữ liệu ở dạng băm bằng khóa riêng tư và trả về chữ ký trong đó V là 0 hoặc 1 (tính chẵn lẻ của giá trị y của đường cong secp256k1).

Hàm này chỉ được sử dụng cho một số loại giao dịch nhất định. Do đó, bạn nên sử dụng [caver.wallet.sign](./caver-wallet.md#caver-wallet-sign) hoặc [transaction.sign](../caver-transaction/caver-transaction.md#transaction-sign) khi ký giao dịch.

**Tham số**

| Tên     | Loại | Mô tả                                                                                                                                                                                                                   |
| ------- | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| hash    | chuỗi | Chuỗi hàm băm để ký.                                                                                                                                                                                                    |
| vai trò | số    | Một con số biểu thị vai trò của khóa. Bạn có thể sử dụng `caver.wallet.keyring.role`.                                                                                                                                   |
| chỉ số  | số    | (tùy chọn) Chỉ mục khóa riêng tư bạn muốn sử dụng. Chỉ mục phải nhỏ hơn độ dài của mảng các khóa riêng tư được định rõ cho mỗi vai trò. Nếu không định rõ chỉ mục, phương pháp này sẽ sử dụng tất cả các khóa riêng tư. |

**Giá trị trả về**

| type | Mô tả                                               |
| ---- | --------------------------------------------------- |
| Mảng | Một mảng [SignatureData](#signaturedata). |

**Ví dụ**

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

Ký tin nhắn với tiền tố dành riêng cho Klaytn. Thao tác này tính toán chữ ký dành riêng cho Klaytn bằng hàm:

```
sign(keccak256("\x19Klaytn Signed Message:\n" + len(message) + message)))
```

Nếu người dùng chưa định rõ tham số chỉ mục, `keyring.signMessage` sẽ ký tin nhắn bằng tất cả các khóa riêng tư do vai trò này sử dụng. Nếu có tham số chỉ mục, `keyring.signMessage` sẽ ký tin nhắn chỉ bằng một khóa riêng tư tại chỉ mục đã cho. Bạn có thể tìm thấy vai trò được sử dụng trong caver-js thông qua `caver.wallet.keyring.role`.

**Tham số**

| Tên       | Loại | Mô tả                                                                                                                                                                                                                   |
| --------- | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| thông báo | chuỗi | Tin nhắn cần ký.                                                                                                                                                                                                        |
| vai trò   | số    | Một con số biểu thị vai trò của khóa. Bạn có thể sử dụng `caver.wallet.keyring.role`.                                                                                                                                   |
| chỉ số    | số    | (tùy chọn) Chỉ mục khóa riêng tư bạn muốn sử dụng. Chỉ mục phải nhỏ hơn độ dài của mảng các khóa riêng tư được định rõ cho mỗi vai trò. Nếu không định rõ chỉ mục, phương pháp này sẽ sử dụng tất cả các khóa riêng tư. |

**Giá trị trả về**

| type      | Mô tả                             |
| --------- | --------------------------------- |
| đối tượng | Một đối tượng bao gồm kết quả ký. |

Đối tượng được trả về chứa các mục sau:

| Tên         | Loại | Mô tả                                                  |
| ----------- | ----- | ------------------------------------------------------ |
| messageHash | chuỗi | Hàm băm của tin nhắn có tiền tố dành riêng cho Klaytn. |
| chữ ký      | Mảng  | Một mảng [SignatureData](#signaturedata).    |
| thông báo   | chuỗi | Tin nhắn cần ký.                                       |

**Ví dụ**

```javascript
// Ký với roleTransactionKey
> keyring.signMessage('message to sign', caver.wallet.keyring.role.roleTransactionKey)
{
    messageHash: '0x9c4c1ae0aa1faf7e59eaf6fcf36a34542698197b379a9949b58c92925e74c069',
    signatures: [
        SignatureData { _v: '0x1b', _r: '0x2dfc6...', _s: '0x15038...' }
    ],
    message: 'message to sign'
}

// Ký với roleFeePayerKey và chỉ mục
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

Trả về (các) khóa riêng tư được sử dụng bởi vai trò đã nhập làm tham số.

**Tham số**

| Tên     | Loại | Mô tả                                                                                 |
| ------- | ----- | ------------------------------------------------------------------------------------- |
| vai trò | số    | Một con số biểu thị vai trò của khóa. Bạn có thể sử dụng `caver.wallet.keyring.role`. |

**Giá trị trả về**

| Loại                                  | Mô tả                                                                                                                                                 |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| [PrivateKey](#privatekey) \ | Mảng | Một đối tượng [PrivateKey](#privatekey) hoặc một mảng chứa các đối tượng [PrivateKey](#privatekey) mà vai trò này sử dụng. |

**Ví dụ**

```javascript
// getKeyByRole với singleKeyring. 
// SingleKeyring sẽ trả về cùng một đối tượng PrivateKey duy nhất bất kể vai trò.
> keyring.getKeyByRole(caver.wallet.keyring.role.roleTransactionKey)
PrivateKey { _privateKey: '0x{private key}' }

> keyring.getKeyByRole(caver.wallet.keyring.role.roleAccountUpdateKey)
PrivateKey { _privateKey: '0x{private key}' }

> keyring.getKeyByRole(caver.wallet.keyring.role.roleFeePayerKey)
PrivateKey { _privateKey: '0x{private key}' }

// getKeyByRole với multipleKeyring. 
// MultipleKeyring cũng sẽ trả về cùng một mảng các đối tượng PrivateKey bất kể vai trò
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

// getKeyByRole với roleBasedKeyring. 
// roleBasedKeyring sẽ trả về các mảng đối tượng PrivateKey khác nhau tùy thuộc vào vai trò
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

Trả về chuỗi [KlaytnWalletKey](../../../../../learn/accounts.md#klaytn-wallet-key-format) cho keyring. Với [MultipleKeyring](#multiplekeyring) hoặc [RoleBasedKeyring](#rolebasedkeyring), bạn không thể sử dụng [KlaytnWalletKey](../../../../../learn/accounts.md#klaytn-wallet-key-format). Trong trường hợp này, hãy sử dụng [keyring.encrypt](#keyring-encrypt).

**Giá trị trả về**

| Loại | Mô tả                                                                                               |
| ----- | --------------------------------------------------------------------------------------------------- |
| chuỗi | [KlaytnWalletKey](../../../../../learn/accounts.md#klaytn-wallet-key-format) của keyring. |

**Ví dụ**

```javascript
> keyring.getKlaytnWalletKey()
'0x{private key}0x{type}0x{address in hex}'
```

## keyring.toAccount <a href="#keyring-toaccount" id="keyring-toaccount"></a>

```javascript
keyring.toAccount([options])
```

Trả về đối tượng [Tài khoản](../caver.account.md#account) để cập nhật [AccountKey](../../../../../learn/accounts.md#account-key) của [tài khoản Klaytn](../../../../../learn/accounts.md#klaytn-accounts). Đối tượng [Tài khoản](../caver.account.md#account) có một đối tượng [AccountKey](../caver.account.md#accountkeylegacy) có thể chứa (các) khóa công khai bên trong. Khóa này sẽ được gửi đến Mạng Klaytn và được dùng để xác thực giao dịch. Để biết thêm chi tiết về [Tài khoản](../caver.account.md#account), xem [Cập nhật tài khoản](../../get-started.md#account-update).

Lưu ý rằng nếu bạn cập nhật [AccountKey](../../../../../learn/accounts.md#account-key) của [Tài khoản](../../../../../learn/accounts.md#klaytn-accounts) được lưu trữ trong Klaytn thì (các) khóa riêng tư cũ sẽ không thể sử dụng được nữa. Xem [Bắt đầu](../../get-started.md#account-update) về cách sử dụng đối tượng [Tài khoản](../caver.account.md#account) được trả về để cập nhật thông tin trong [tài khoản Klaytn](../../../../../learn/accounts.md#klaytn-accounts) của bạn trên Klaytn.

Tùy thuộc vào loại (các) khóa riêng tư trong keyring, các đối tượng [Tài khoản](../caver.account.md#account) được trả về có thể được phân loại như sau.

* Khi keyring chứa chuỗi khóa riêng tư: Trả về đối tượng [Tài khoản](../caver.account.md#account) bao gồm địa chỉ trong khóa và đối tượng [AccountKeyPublic](../caver.account.md#accountkeypublic)
* Khi keyring chứa chuỗi khóa riêng tư: Trả về đối tượng [Tài khoản](../caver.account.md#account) bao gồm địa chỉ trong khóa và đối tượng [AccountKeyWeigthedMultiSig](../caver.account.md#accountkeyweightedmultisig)
* Khi keyring chứa các chuỗi khóa riêng tư khác nhau theo vai trò: Trả về đối tượng [Tài khoản](../caver.account.md#account) bao gồm địa chỉ trong khóa và đối tượng [AccountKeyRoleBased](../caver.account.md#accountkeyrolebased)

**Tham số**

| Tên      | Loại                                                                       | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| -------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tùy chọn | [WeightedMultiSigOptions](../caver.account.md#weightedmultisigoptions) \ | Mảng | (tùy chọn) Đối tượng [WeightedMultiSigOptions](../caver.account.md#weightedmultisigoptions) chứa thông tin sẽ được xác định khi cập nhật tài khoản hiện tại của bạn thành tài khoản có nhiều khóa riêng tư. Nếu quá trình tạo keyring sử dụng các khóa riêng tư khác nhau cho mỗi vai trò thì đối tượng [WeightedMultiSigOptions](../caver.account.md#weightedmultisigoptions) phải được xác định cho mỗi vai trò trong một mảng. Nếu keyring sử dụng nhiều khóa riêng tư và tham số tùy chọn không được xác định thì [WeightedMultiSigOptions](../caver.account.md#weightedmultisigoptions) mặc định với ngưỡng 1 và trọng số 1 cho mỗi khóa sẽ được sử dụng. |

**Giá trị trả về**

| Loại                                    | Mô tả                                                                                                                                                                                                                                                                                                                                                                               |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Tài khoản](../caver.account.md#account) | Đối tượng Tài khoản sẽ được sử dụng khi người dùng cập nhật AccountKey cho tài khoản của họ trong Klaytn. Lưu ý rằng nếu bạn muốn thay thế chuỗi khóa hiện tại (hoặc (các) khóa riêng tư hiện có) bằng một keyring mới (hoặc (các) khóa riêng tư mới) cho tài khoản của mình thì bạn phải cập nhật AccountKey của mình bằng cách gửi giao dịch Cập nhật tài khoản đến Klaytn trước. |

**Ví dụ**

```javascript
// Nhận tài khoản với singleKeyring
> keyring.toAccount()
Account {
    _address: '0x6a3edfad6d1126020d5369e9097db39281876c5d',
    _tài khoảnKey: AccountKeyPublic { _publicKey: '0xc396b...' }
}

// Nhận tài khoản với multipleKeyring
> keyring.toAccount()
Account {
    _address: '0x53027503242c2f99969eeb8cb3a31f48f3668712',
    _tài khoảnKey: AccountKeyWeightedMultiSig {
        _threshold: 1,
        _weightedPublicKeys: [
            WeightedPublicKey { _weight: 1, _publicKey: '0x969c8...' },
            WeightedPublicKey { _weight: 1, _publicKey: '0x5bc06...' },
            WeightedPublicKey { _weight: 1, _publicKey: '0x33d83...' }
        ]
    }
}

// Nhận tài khoản với multipleKeyring và tùy chọn
> keyring.toAccount(new caver.tài khoản.weightedMultiSigOptions(3, [2, 2, 3]))
Account {
    _address: '0x53027503242c2f99969eeb8cb3a31f48f3668712',
    _tài khoảnKey: AccountKeyWeightedMultiSig {
        _threshold: 3,
        _weightedPublicKeys: [
            WeightedPublicKey { _weight: 2, _publicKey: '0x969c8...' },
            WeightedPublicKey { _weight: 2, _publicKey: '0x5bc06...' },
            WeightedPublicKey { _weight: 3, _publicKey: '0x33d83...' }
        ]
    }
}

// Nhận tài khoản với roleBasedKeyring
> keyring.toAccount()
Account {
    _address: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _tài khoảnKey: AccountKeyRoleBased {
        _tài khoảnKeys: [
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

// Nhận tài khoản với roleBasedKeyring và tùy chọn
> const options = [
    new caver.tài khoản.weightedMultiSigOptions(3, [2, 3]),
    new caver.tài khoản.weightedMultiSigOptions(2, [1, 1]),
    new caver.tài khoản.weightedMultiSigOptions(5, [3, 5])
]
> keyring.toAccount(options)
Account {
    _address: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _tài khoảnKey: AccountKeyRoleBased {
        _tài khoảnKeys: [
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

Mã hóa keyring và trả về tiêu chuẩn lưu trữ khóa v4. Để biết thêm thông tin, vui lòng tham khảo [KIP-3](https://kips.klaytn.foundation/KIPs/kip-3).

**Tham số**

| Tên      | Loại | Mô tả                                                                                      |
| -------- | ----- | ------------------------------------------------------------------------------------------ |
| password | chuỗi | Mật khẩu dùng để mã hóa. Lưu trữ khóa được mã hóa có thể được giải mã bằng mật khẩu này.   |
| tùy chọn | chuỗi | (tùy chọn) Tham số `options` cho phép bạn chỉ định các giá trị sẽ sử dụng khi dùng mã hóa. |

**Giá trị trả về**

| Loại     | Mô tả                        |
| --------- | ---------------------------- |
| đối tượng | Lưu trữ khóa được mã hóa v4. |

Đối tượng được trả về chứa các mục sau:

| Tên     | Loại | Mô tả                                                  |
| ------- | ----- | ------------------------------------------------------ |
| version | số    | Đối tượng của lưu trữ khóa.                            |
| id      | chuỗi | Id của lưu trữ khóa.                                   |
| address | chuỗi | Địa chỉ trong [Keyring](#class) được mã hóa. |
| keyring | Mảng  | (Các) khóa riêng tư được mã hóa.                       |

Để biết thêm thông tin, vui lòng tham khảo [KIP-3](https://kips.klaytn.foundation/KIPs/kip-3).

**Ví dụ**

```javascript
// Mã hóa singleKeyring
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

// Mã hóa multipleKeyring
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

// Mã hóa roleBasedKeyring
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

Mã hóa đối tượng [SingleKeyring](#singlekeyring) và trả về tiêu chuẩn lưu trữ khóa v3.

Lưu ý rằng [MultipleKeyring](#multiplekeyring) và [RoleBasedKeyring](#rolebasedkeyring) không thể sử dụng encryptV3. Trong trường hợp này, vui lòng sử dụng [keyring.encrypt](#keyring-encrypt) với tiêu chuẩn lưu trữ khóa V4.

**Tham số**

| Tên      | Loại | Mô tả                                                                                               |
| -------- | ----- | --------------------------------------------------------------------------------------------------- |
| password | chuỗi | Mật khẩu dùng để mã hóa. Lưu trữ khóa được mã hóa có thể được giải mã bằng mật khẩu này.            |
| tùy chọn | chuỗi | (tùy chọn) Mật khẩu dùng để mã hóa. Lưu trữ khóa được mã hóa có thể được giải mã bằng mật khẩu này. |

**Giá trị trả về**

| Loại     | Mô tả                        |
| --------- | ---------------------------- |
| đối tượng | Lưu trữ khóa được mã hóa v3. |

Đối tượng được trả về chứa các mục sau:

| Tên     | Loại     | Mô tả                                                |
| ------- | --------- | ---------------------------------------------------- |
| version | số        | Đối tượng của lưu trữ khóa.                          |
| id      | chuỗi     | Id của lưu trữ khóa.                                 |
| address | chuỗi     | Địa chỉ của [Keyring](#class) được mã hóa. |
| crypto  | đối tượng | Khóa riêng tư được mã hóa.                           |

**Ví dụ**

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

Trả về `true` nếu keyring có khóa tách rời.

**Giá trị trả về**

| Loại   | Mô tả                                |
| ------- | ------------------------------------ |
| boolean | `true` nếu keyring có khóa tách rời. |

**Ví dụ**

```javascript
> keyring.isDecoupled()
true

> keyring.isDecoupled()
false
```
