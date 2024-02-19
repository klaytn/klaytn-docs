# caver.wallet

`caver.wallet` là gói quản lý các đối tượng [Keyring](./keyring.md) trong ví trong bộ nhớ. `caver.wallet` chấp nhận tất cả [SingleKeyring](./keyring.md#singlekeyring), [MultipleKeyring](./keyring.md#multiplekeyring) và [RoleBasedKeyring](./keyring.md#rolebasedkeyring), đồng thời quản lý chúng theo địa chỉ.

## Lớp <a href="#class" id="class"></a>

### KeyringContainer <a href="#keyringcontainer" id="keyringcontainer"></a>

```javascript
caver.wallet
```

`KeyringContainer` là lớp quản lý các đối tượng [SingleKeyring](./keyring.md#singlekeyring), [MultipleKeyring](./keyring.md#multiplekeyring) và [RoleBasedKeyring](./keyring.md#rolebasedkeyring). Khi Caver được khởi tạo, nó sẽ tạo một đối tượng KeyringContainer trong `caver.wallet`. Bạn có thể lưu trữ và quản lý các đối tượng keyring trong ví trong bộ nhớ thông qua `caver.wallet`.

**thuộc tính**

| Tên    | type | Mô tả                              |
| ------ | ---- | ---------------------------------- |
| length | số   | Số keyring trong keyringContainer. |

## caver.wallet.generate <a href="#caver-wallet-generate" id="caver-wallet-generate"></a>

```javascript
caver.wallet.generate(numberOfKeyrings [, entropy])
```

Tạo các đối tượng [SingleKeyring](./keyring.md#singlekeyring) trong keyringContainer với các khóa riêng tư được tạo ngẫu nhiên.

**Tham số**

| Tên              | Loại | Mô tả                                                                     |
| ---------------- | ----- | ------------------------------------------------------------------------- |
| numberOfKeyrings | số    | Số lượng đối tượng [SingleKeyring](./keyring.md#singlekeyring) cần tạo.   |
| entropy          | chuỗi | (tùy chọn) Một chuỗi ngẫu nhiên để tăng độ nhiễu loạn. |

**Giá trị trả về**

| Loại | Mô tả                               |
| ----- | ----------------------------------- |
| Mảng  | Một mảng chứa các địa chỉ được tạo. |

**Ví dụ**

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

Tạo một đối tượng keyring với các tham số đã cho và thêm nó vào `caver.wallet`.

Nếu `key` là một chuỗi khóa riêng tư thì đối tượng [SingleKeyring](./keyring.md#singlekeyring) sử dụng một khóa riêng tư sẽ được tạo. Nếu `key` là một mảng chứa các chuỗi khóa riêng tư thì một đối tượng [MultipleKeyring](./keyring.md#multiplekeyring) sử dụng nhiều khóa riêng tư sẽ được tạo. Nếu `key` là một mảng 2D trong đó mỗi phần tử chứa (các) khóa riêng được sử dụng cho mỗi vai trò thì một đối tượng [RoleBasedKeyring](./keyring.md#rolebasedkeyring) sẽ được tạo. Keyring đã tạo sẽ được thêm vào `caver.wallet`.

**Tham số**

| Tên     | Loại         | Mô tả                                                                                                                                                                  |
| ------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address | chuỗi         | Chuỗi địa chỉ.                                                                                                                                                         |
| khóa    | chuỗi \| Mảng | Chuỗi khóa riêng tư, một mảng khóa riêng hoặc mảng 2D trong đó mỗi phần tử mảng chứa các khóa được xác định cho mỗi [vai trò](../../../../../learn/accounts.md#roles). |

**Giá trị trả về**

| Loại     | Mô tả                                                                                                                                                                                                                              |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| đối tượng | Đối tượng keyring ([SingleKeyring](./keyring.md#singlekeyring), [MultipleKeyring](./keyring.md#multiplekeyring) hoặc [RoleBasedKeyring](./keyring.md#rolebasedkeyring)) được thêm vào caver.wallet được trả về. |

**Ví dụ**

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

Cập nhật keyring bên trong `caver.wallet`. Khi đối tượng `keyring` mới ([SingleKeyring](./keyring.md#singlekeyring), [MultipleKeyring](./keyring.md#multiplekeyring) hoặc [RoleBasedKeyring](./keyring.md#rolebasedkeyring)) được thông qua dưới dạng tham số thì keyring hiện tại được lưu trữ trong `caver.wallet` khớp với thuộc tính `address` của đối tượng `keyring` đã cho sẽ được tìm thấy và thay thế bằng đối tượng đã cho. Thông báo lỗi khi không tìm thấy keyring phù hợp.

**Tham số**

| Tên     | type      | Mô tả                                                                                                                                                                                                                      |
| ------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| keyring | đối tượng | Keyring mới ([SingleKeyring](./keyring.md#singlekeyring), [MultipleKeyring](./keyring.md#multiplekeyring) hoặc [RoleBasedKeyring](./keyring.md#rolebasedkeyring)) sẽ được lưu trữ trong `caver.wallet`. |

**Giá trị trả về**

| Loại     | Mô tả                                                                                                                                                                                                                        |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| đối tượng | Khóa đã cập nhật ([SingleKeyring](./keyring.md#singlekeyring), [MultipleKeyring](./keyring.md#multiplekeyring) hoặc [RoleBasedKeyring](./keyring.md#rolebasedkeyring)) được lưu trữ trong `caver.wallet`. |

**Ví dụ**

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

Trả về đối tượng keyring tương ứng với địa chỉ trong `caver.wallet`.

**Tham số**

| Tên     | Loại | Mô tả                            |
| ------- | ----- | -------------------------------- |
| address | chuỗi | Địa chỉ của keyring để truy vấn. |

**Giá trị trả về**

| Loại     | Mô tả                                                                                                                                                                                                                                       |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| đối tượng | Đối tượng keyring được tìm thấy ([SingleKeyring](./keyring.md#singlekeyring), [MultipleKeyring](./keyring.md#multiplekeyring) hoặc [RoleBasedKeyring](./keyring.md#rolebasedkeyring)) được lưu trữ trong `caver.wallet`. |

**Ví dụ**

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

Trả về `true` nếu có một chuỗi keyring khớp với địa chỉ.

**Tham số**

| Tên     | type  | Mô tả                                       |
| ------- | ----- | ------------------------------------------- |
| address | chuỗi | Địa chỉ của keyring để kiểm tra sự tồn tại. |

**Giá trị trả về**

| Loại   | Mô tả                                                                            |
| ------- | -------------------------------------------------------------------------------- |
| boolean | `true` có nghĩa là đã tồn tại một keyring khớp với địa chỉ trong `caver.wallet`. |

**Ví dụ**

```javascript
> caver.wallet.isExisted('0x386a4bb40abbfaa59cecdc3ced202475895fd569')
true
```

## caver.wallet.add <a href="#caver-wallet-add" id="caver-wallet-add"></a>

```javascript
caver.wallet.add(keyring)
```

Thêm đối tượng keyring vào `caver.wallet`. Nếu keyring đã cho mới có cùng địa chỉ với một trong các keyring đã tồn tại trong `caver.wallet` thì sẽ trả về thông báo lỗi. Trong trường hợp này, hãy sử dụng [updateKeyring](#caver-wallet-updatekeyring) để cập nhật keyring hiện có trong `caver.wallet`.

**Tham số**

| Tên     | type      | Mô tả                                                                                                                                                                                                                 |
| ------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| keyring | đối tượng | Đối tượng keyring([SingleKeyring](./keyring.md#singlekeyring), [MultipleKeyring](./keyring.md#multiplekeyring) hoặc [RoleBasedKeyring](./keyring.md#rolebasedkeyring)) để thêm vào `caver.wallet`. |

**Giá trị trả về**

| type      | Mô tả                                                                                                                                                                                                               |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| đối tượng | Keyring đã được thêm ([SingleKeyring](./keyring.md#singlekeyring), [MultipleKeyring](./keyring.md#multiplekeyring) hoặc [RoleBasedKeyring](./keyring.md#rolebasedkeyring)) trong `caver.wallet`. |

**Ví dụ**

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

Xóa keyring khỏi `caver.wallet` có địa chỉ khớp với địa chỉ của keyring đã cho.

**Tham số**

| Tên     | Loại | Mô tả                                               |
| ------- | ----- | --------------------------------------------------- |
| address | chuỗi | Địa chỉ của keyring sẽ bị xóa trong `caver.wallet`. |

**Giá trị trả về**

| Loại   | Mô tả                                          |
| ------- | ---------------------------------------------- |
| boolean | `true` nếu keyring bị xóa khỏi `caver.wallet`. |

**Ví dụ**

```javascript
> caver.wallet.remove('0x6a3edfad6d1126020d5369e9097db39281876c5d')
true
```

## caver.wallet.signMessage <a href="#caver-wallet-signmessage" id="caver-wallet-signmessage"></a>

```javascript
caver.wallet.signMessage(address, message, role [, index])
```

Ký tin nhắn bằng tiền tố dành riêng cho Klaytn bằng cách sử dụng keyring được lưu trữ trong caver.wallet. Thao tác này tính toán chữ ký dành riêng cho Klaytn bằng hàm:

```
sign(keccak256("\x19Klaytn Signed Message:\n" + len(message) + message)))
```

Nếu người dùng chưa cung cấp tham số chỉ mục, `caver.wallet.signMessage` sẽ ký tin nhắn bằng cách sử dụng tất cả các khóa riêng tư mà vai trò này sử dụng. Nếu tham số chỉ mục được cung cấp, `caver.wallet.signMessage` sẽ ký tin nhắn chỉ bằng một khóa riêng tư tại chỉ mục đã cho. Bạn có thể tìm thấy vai trò được sử dụng trong caver-js từ `caver.wallet.keyring.role`.

**Tham số**

| Tên       | Loại | Mô tả                                                                                                                                                                                                                                      |
| --------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| address   | chuỗi | Một địa chỉ của keyring sẽ được sử dụng.                                                                                                                                                                                                   |
| thông báo | chuỗi | Tin nhắn cần ký.                                                                                                                                                                                                                           |
| vai trò   | số    | Một con số biểu thị vai trò của khóa. Bạn có thể sử dụng `caver.wallet.keyring.role`.                                                                                                                                                      |
| chỉ số    | số    | (tùy chọn) Chỉ mục khóa riêng tư bạn muốn sử dụng. Chỉ mục phải nhỏ hơn độ dài của mảng các khóa riêng tư được định rõ cho mỗi vai trò. Nếu không định rõ chỉ mục, phương pháp này sẽ sử dụng tất cả các khóa riêng tư. |

**Giá trị trả về**

| Loại     | Mô tả                             |
| --------- | --------------------------------- |
| đối tượng | Một đối tượng bao gồm kết quả ký. |

Đối tượng được trả về chứa các mục sau:

| Tên         | type  | Mô tả                                                  |
| ----------- | ----- | ------------------------------------------------------ |
| messageHash | chuỗi | Hàm băm của tin nhắn có tiền tố dành riêng cho Klaytn. |
| chữ ký      | Mảng  | Một mảng [SignatureData](./keyring.md#signaturedata).  |
| thông báo   | chuỗi | Tin nhắn cần ký.                                       |

**Ví dụ**

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

Ký giao dịch với tư cách là `sender` của giao dịch và thêm `signatures` vào đối tượng giao dịch bằng cách sử dụng keyring trong `caver.wallet`.

Đối với giao dịch [Cập nhật tài khoản](../caver-transaction/basic.md#accountupdate), sử dụng [roleTransactionKey](../../../../../learn/accounts.md#roles), nếu không, hãy sử dụng [roleTransactionKey](../../../../../learn/accounts.md#roles). Nếu người dùng chưa xác định `index` thì `caver.wallet.sign` sẽ ký giao dịch bằng cách sử dụng tất cả các khóa riêng tư mà vai trò này sử dụng. Nếu `index` được xác định thì `caver.wallet.sign` sẽ ký giao dịch chỉ bằng một khóa riêng tư tại chỉ mục đã cho.

**Tham số**

| Tên         | Loại     | Mô tả                                                                                                                                                                                                                                                                                                                                                                                    |
| ----------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address     | chuỗi     | Một địa chỉ của keyring sẽ được sử dụng.                                                                                                                                                                                                                                                                                                                                                 |
| transaction | đối tượng | Một đối tượng [Giao dịch](../caver-transaction/caver-transaction.md#class).                                                                                                                                                                                                                                                                                                              |
| chỉ số      | số        | (tùy chọn) Chỉ mục khóa riêng tư bạn muốn sử dụng. Chỉ mục phải nhỏ hơn độ dài của mảng các khóa riêng tư được định rõ cho mỗi vai trò. Nếu không định rõ chỉ mục, phương pháp này sẽ sử dụng tất cả các khóa riêng tư.                                                                                                                                               |
| hasher      | hàm       | (tùy chọn) Một hàm băm để lấy hàm băm giao dịch. Nếu `hasher` được cung cấp dưới dạng tham số thì nó sẽ tính toán hàm băm giao dịch thay vì phương pháp mặc định để tính toán hàm băm giao dịch được triển khai trong caver-js. Xem [Thông tin cơ bản](../../../../../learn/transactions/basic.md) để biết chi tiết về phương pháp mặc định để tạo hàm băm giao dịch. |

**Giá trị trả về**

`Promise` trả về `object`: Giao dịch đã ký.

| Loại     | Mô tả                                                                                                  |
| --------- | ------------------------------------------------------------------------------------------------------ |
| đối tượng | Đối tượng của giao dịch đã ký. (Các) chữ ký được thêm vào `transaction.signatures`. |

Để biết thêm thông tin về các trường theo loại giao dịch, xem [caver.transaction](../caver-transaction/caver-transaction.md).

**Ví dụ**

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

Ký giao dịch với tư cách là `fee payer` của giao dịch và thêm `feePayerSignatures` vào đối tượng giao dịch bằng cách sử dụng keyring trong `caver.wallet`.

Để ký giao dịch với vai trò là người trả phí, hãy sử dụng [roleFeePayerKey](../../../../../learn/accounts.md#roles). Nếu người dùng chưa xác định `index` thì `caver.wallet.signAsFeePayer` sẽ ký giao dịch bằng cách sử dụng tất cả các khóa riêng tư mà vai trò này sử dụng. Nếu `index` được xác định thì `caver.wallet.signAsFeePayer` sẽ ký giao dịch chỉ bằng một khóa riêng tư tại chỉ mục đã cho.

Nếu `transaction.feePayer` không được xác định thì địa chỉ của keyring được tạo từ `caver.wallet` sẽ được chỉ định.

**Tham số**

| Tên         | Loại     | Mô tả                                                                                                                                                                                                                                      |
| ----------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| address     | chuỗi     | Một địa chỉ của keyring sẽ được sử dụng.                                                                                                                                                                                                   |
| transaction | đối tượng | Một đối tượng [FeeDelegatedTransaction](../caver-transaction/fee-delegation.md).                                                                                                                                                           |
| chỉ số      | số        | (tùy chọn) Chỉ mục khóa riêng tư bạn muốn sử dụng. Chỉ mục phải nhỏ hơn độ dài của mảng các khóa riêng tư được định rõ cho mỗi vai trò. Nếu không định rõ chỉ mục, phương pháp này sẽ sử dụng tất cả các khóa riêng tư. |
| hasher      | hàm       | (tùy chọn) Một hàm để lấy hàm băm giao dịch. Nếu hasher được xác định là một tham số thì tham số này dùng để lấy hàm băm giao dịch, thay vì triển khai mặc định trong caver-js.                                         |

**Giá trị trả về**

`Promise` trả về `object`: Giao dịch đã ký.

| type      | Mô tả                                                                                            |
| --------- | ------------------------------------------------------------------------------------------------ |
| đối tượng | Đối tượng của giao dịch đã ký. Kết quả ký được thêm vào trường `transaction.feePayerSignatures`. |

Để biết thêm thông tin về các trường theo loại giao dịch, xem [caver.transaction](../caver-transaction/caver-transaction.md).

**Ví dụ**

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
