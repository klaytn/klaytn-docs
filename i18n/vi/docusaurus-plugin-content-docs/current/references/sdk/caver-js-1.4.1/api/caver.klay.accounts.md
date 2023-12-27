---
description: >-
  API caver-js API liên quan đến việc quản lý tài khoản.

---

# caver.klay.accounts

`caver.klay.tài khoảns` chứa các hàm để tạo tài khoản Klaytn và ký các giao dịch cũng như dữ liệu.


## create <a id="create"></a>

```javascript
caver.klay.tài khoảns.create([entropy])
```
Tạo một đối tượng tài khoản với khóa riêng tư và khóa công khai.

**Tham số**

| Tên           | type  | Mô tả                                                                                                                                                                                          |
| ------------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| độ nhiễu loạn | Chuỗi | (tùy chọn) Một chuỗi ngẫu nhiên để tăng độ nhiễu loạn. Nếu không có chuỗi nào được cung cấp, một chuỗi ngẫu nhiên sẽ được tạo bằng cách sử dụng [randomHex](./caver.utils_1.4.1.md#randomhex). |


**Giá trị trả về**

`Đối tượng` - Đối tượng tài khoản có cấu trúc như sau:

| Tên                              | Loại | Mô tả                                                                                                                                                                            |
| -------------------------------- | ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address                          | Chuỗi | Địa chỉ tài khoản.                                                                                                                                                               |
| privateKey                       | Chuỗi | Khóa riêng tư của tài khoản. Khóa này tuyệt đối không được chia sẻ hoặc lưu trữ không được mã hóa trong bộ nhớ cục bộ! Ngoài ra, hãy đảm bảo vô hiệu hóa bộ nhớ sau khi sử dụng. |
| signTransaction(tx [, callback]) | Hàm   | Hàm dùng để ký giao dịch. Xem [caver.klay.tài khoảns.signTransaction](#signtransaction).                                                                                         |
| sign(data)                       | Hàm   | Hàm dùng để ký giao dịch. Xem [caver.klay.tài khoảns.sign](#sign).                                                                                                               |
| mã hóa                           | Hàm   | Hàm dùng để mã hóa khóa riêng tư với mật khẩu đã cho.                                                                                                                            |

**Ví dụ**

```javascript
> caver.klay.tài khoảns.create();
{
    address: '0x79FF91738661760AC67b3E951c0B4f1F70F80478',
    privateKey: '0x{private key}',
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey] 
}

> caver.klay.tài khoảns.create('entropy');
{
    address: '0x205fffB1025F4af604fEB1d3a22b46C0D2326585',
    privateKey: '0x{private key}',
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey] 
}

> caver.klay.tài khoảns.create(caver.utils.randomHex(32));
{ 
    address: '0x62Ca8964610A9D447E1a64753a09fC8b3D40b405',
    privateKey: '0x{private key}',
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey] 
}
```

## createWithAccountKey <a id="createwithaccountkey"></a>

```javascript
caver.klay.tài khoảns.createWithAccountKey(address, tài khoảnKey)
```
Tạo một phiên bản Tài khoản với AccountKey đã cho. Tài khoản dùng để quản lý địa chỉ và AccountKey của tài khoản.

**LƯU Ý** Đây chỉ là một cấu trúc dữ liệu được sử dụng trong caver-js. Phương thức này không tạo hoặc cập nhật tài khoản trong mạng lưới Klaytn. **LƯU Ý** `caver.klay.tài khoảns.createWithAccountKey` được hỗ trợ kể từ caver-js phiên bản [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**Tham số**

| Tên          | type                               | Mô tả                                                                                                                                                                                                                                   |
| ------------ | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address      | Chuỗi                              | Địa chỉ của tài khoản.                                                                                                                                                                                                                  |
| tài khoảnKey | Chuỗi \| Mảng \| Đối tượng | Phiên bản AccountKey (`AccountKeyPublic`, `AccountKeyMultiSig` hoặc `AccountKeyRoleBased`) hoặc cấu trúc dữ liệu chứa thông tin khóa (chuỗi khóa riêng tư, mảng chuỗi khóa riêng tư hoặc một đối tượng xác định khóa cho từng vai trò). |


**Giá trị trả về**

`Đối tượng` - Một phiên bản Tài khoản được trả về với các thuộc tính sau:

| Tên                              | Loại                              | Mô tả                                                                                                                                                                                                                                                                                                                      |
| -------------------------------- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address                          | Chuỗi                              | Địa chỉ của tài khoản.                                                                                                                                                                                                                                                                                                     |
| privateKey                       | Chuỗi                              | Chuỗi khóa mặc định của tài khoảnKey mà tài khoản có. Thuộc tính này được để lại cho khả năng tương thích ngược. privateKey chỉ đại diện cho khóa mặc định của tài khoảnKey, do đó, bạn không nên sử dụng privateKey để ký hoặc gửi giao dịch. Bạn nên sử dụng transactionKey, updateKey hoặc feePayerKey trong ngữ cảnh.  |
| tài khoảnKeyType                 | Chuỗi                              | Loại tài tài khoảnKey tài khoản có. Đây có thể là `AccountKeyPublic`, `AccountKeyMultiSig` hoặc `AccountKeyRoleBased`                                                                                                                                                                                                      |
| tài khoảnKey                     | Đối tượng                          | Khóa của tài khoản. Đây có thể là AccountKeyPublic, AccountKeyMultiSig hoặc AccountKeyRoleBased.                                                                                                                                                                                                                           |
| khóa                             | Chuỗi \| Mảng \| Đối tượng | Tất cả các khóa bên trong tài khoảnKey mà tài khoản có. Đối với AccountKeyPublic, đây là một chuỗi khóa riêng tư; đối với AccountKeyMultiSig, điều này trả về một mảng chứa tất cả các chuỗi khóa riêng tư. Trong trường hợp AccountKeyRoleBased, một đối tượng có các khóa được liên kết với từng vai trò sẽ được trả về. |
| transactionKey                   | Chuỗi \| Mảng                  | Khóa được sử dụng cho [RoleTransaction](../../../../learn/accounts.md#roles). AccountKeyPublic hoặc AccountKeyMultiSig không bị ràng buộc với bất kỳ vai trò nào, do đó, transactionKey giữ giá trị giống như các khóa. các khóa.                                                                             |
| updateKey                        | Chuỗi \| Mảng                  | Khóa được sử dụng cho [RoleAccountUpdate](../../../../learn/accounts.md#roles). AccountKeyPublic hoặc AccountKeyMultiSig không bị ràng buộc với bất kỳ vai trò nào, vì vậy updateKey giữ giá trị giống như các khóa.khóa.                                                                                     |
| feePayerKey                      | Chuỗi \| Mảng                  | Khóa được sử dụng cho [RoleFeePayer](../../../../learn/accounts.md#roles). AccountKeyPublic hoặc AccountKeyMultiSig không bị ràng buộc với bất kỳ vai trò nào, do đó, feePayerKey giữ cùng một giá trị như các khóa.                                                                                          |
| signTransaction(tx [, callback]) | Hàm                                | Hàm dùng để ký giao dịch. Xem [caver.klay.tài khoảns.signTransaction](#signtransaction).                                                                                                                                                                                                                                   |
| sign(data)                       | Hàm                                | Hàm dùng để ký giao dịch. Xem [caver.klay.tài khoảns.sign](#sign).                                                                                                                                                                                                                                                         |
| mã hóa                           | Hàm                                | Hàm dùng để mã hóa Tài khoản với mật khẩu đã cho.                                                                                                                                                                                                                                                                          |
| getKlaytnWalletKey               | Hàm                                | Hàm dùng để lấy [Khóa Ví Klaytn](../../../../learn/accounts.md#klaytn-wallet-key-format).                                                                                                                                                                                                                     |

**Ví dụ**

```javascript
// Tạo tài khoản với AccountKeyPublic
> caver.klay.tài khoảns.createWithAccountKey('0x62ca8964610a9d447e1a64753a09fc8b3d40b405', '0x{private key}')
Account {
    address: [Getter/Setter],
    tài khoảnKey: [Getter/Setter],
    privateKey: [Getter/Setter],
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey] 
}

// Tạo một tài khoản với AccountKeyMultiSig
> caver.klay.tài khoảns.createWithAccountKey('0x62ca8964610a9d447e1a64753a09fc8b3d40b405', ['0x{private key}', '0x{private key}'])
Account {
    address: [Getter/Setter],
    tài khoảnKey: [Getter/Setter],
    privateKey: [Getter/Setter],
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey] 
}

// Tạo một tài khoản với AccountKeyRoleBased
> caver.klay.tài khoảns.createWithAccountKey('0x62ca8964610a9d447e1a64753a09fc8b3d40b405', {
    transactionKey: ['0x{private key}', '0x{private key}'], '0x{private key}',
    updateKey: ['0x{private key}', '0x{private key}', '0x{private key}'],
    feePayerKey: ['0x{private key}', '0x{private key}', '0x{private key}']
})
Account {
    address: [Getter/Setter],
    tài khoảnKey: [Getter/Setter],
    privateKey: [Getter/Setter],
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey] 
}
```

## createWithAccountKeyPublic <a id="createwithaccountkeypublic"></a>

```javascript
caver.klay.tài khoảns.createWithAccountKeyPublic(address, tài khoảnKey)
```
Tạo một phiên bản Tài khoản với AccountKeyPublic.

**LƯU Ý** `caver.klay.tài khoảns.createWithAccountKeyPublic` được hỗ trợ kể từ caver-js phiên bản [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**Tham số**

| Tên          | Loại                  | Mô tả                                                |
| ------------ | ---------------------- | ---------------------------------------------------- |
| address      | Chuỗi                  | Địa chỉ của tài khoản.                               |
| tài khoảnKey | Chuỗi \| Đối tượng | Phiên bản AccountKeyPublic hoặc chuỗi khóa riêng tư. |


**Giá trị trả về**

`Đối tượng` - Phiên bản tài khoản, xem [caver.klay.tài khoảns.createWithAccountKey](#createwithaccountkey).

**Ví dụ**

```javascript
> caver.klay.tài khoảns.createWithAccountKeyPublic('0x62ca8964610a9d447e1a64753a09fc8b3d40b405', '0x{private key}')
Account {
    address: [Getter/Setter],
    tài khoảnKey: [Getter/Setter],
    privateKey: [Getter/Setter],
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey] 
}
```

## createWithAccountKeyMultiSig <a id="createwithaccountkeymultisig"></a>

```javascript
caver.klay.tài khoảns.createWithAccountKeyMultiSig(address, tài khoảnKey)
```
Tạo một phiên bản tài khoản với AccountKeyMultiSig.

**LƯU Ý** `caver.klay.tài khoảns.createWithAccountKeyMultiSig` được hỗ trợ kể từ caver-js phiên bản [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**Tham số**

| Tên          | type                   | Mô tả                                                                   |
| ------------ | ---------------------- | ----------------------------------------------------------------------- |
| address      | Chuỗi                  | Địa chỉ của tài khoản.                                                  |
| tài khoảnKey | Chuỗi \| Đối tượng | Một phiên bản AccountKeyMultiSig hoặc một mảng các chuỗi khóa riêng tư. |


**Giá trị trả về**

`Đối tượng` - Phiên bản tài khoản, xem [caver.klay.tài khoảns.createWithAccountKey](#createwithaccountkey).

**Ví dụ**

```javascript
> caver.klay.tài khoảns.createWithAccountKeyMultiSig('0x62ca8964610a9d447e1a64753a09fc8b3d40b405', ['0x{private key}', '0x{private key}'])
Account {
    address: [Getter/Setter],
    tài khoảnKey: [Getter/Setter],
    privateKey: [Getter/Setter],
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey] 
}
```

## createWithAccountKeyRoleBased <a id="createwithaccountkeyrolebased"></a>

```javascript
caver.klay.tài khoảns.createWithAccountKeyRoleBased(address, tài khoảnKey)
```
Tạo một phiên bản tài khoản với AccountKeyRoleBased.

**LƯU Ý** `caver.klay.tài khoảns.createWithAccountKeyRoleBased` được hỗ trợ kể từ caver-js phiên bản [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**Tham số**

| Tên          | Loại                  | Mô tả                                                                                |
| ------------ | ---------------------- | ------------------------------------------------------------------------------------ |
| address      | Chuỗi                  | Địa chỉ của tài khoản.                                                               |
| tài khoảnKey | Chuỗi \| Đối tượng | Một phiên bản AccountKeyRoleBased hoặc một đối tượng xác định khóa cho từng vai trò. |


**Giá trị trả về**

`Đối tượng` - Phiên bản tài khoản, xem [caver.klay.tài khoảns.createWithAccountKey](#createwithaccountkey).

**Ví dụ**

```javascript
> caver.klay.tài khoảns.createWithAccountKeyRoleBased('0x62ca8964610a9d447e1a64753a09fc8b3d40b405', {
    transactionKey: ['0x{private key}', '0x{private key}', '0x{private key}'],
    updateKey: ['0x{private key}', '0x{private key}', '0x{private key}'],
    feePayerKey: ['0x{private key}', '0x{private key}', '0x{private key}']
})
Account {
    address: [Getter/Setter],
    tài khoảnKey: [Getter/Setter],
    privateKey: [Getter/Setter],
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey] 
}
```

## createAccountKey <a id="createaccountkey"></a>

```javascript
caver.klay.tài khoảns.createAccountKey(key)
```
Tạo phiên bản của `AccountKeyPublic`, `AccountKeyMultiSig` hoặc `AccountKeyRoleBased` tùy thuộc vào loại tham số.

AccountKey là cấu trúc dữ liệu dùng để quản lý khóa trong caver-js. Sử dụng AccountKeyPublic nếu bạn muốn sử dụng một khóa riêng tư, AccountKeyMultiSig nếu bạn muốn sử dụng nhiều khóa riêng tư hoặc AccountKeyRoleBased nếu bạn muốn sử dụng một khóa khác cho từng vai trò.

**LƯU Ý** `caver.klay.tài khoảns.createAccountKey` được hỗ trợ kể từ caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**Tham số**

| Tên  | Loại                              | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ---- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| khóa | Chuỗi \| Mảng \| Đối tượng | Khóa để tạo AccountKey. Nếu `key` là một chuỗi khóa riêng tư, thì một phiên bản AccountKeyPublic sẽ được tạo. Nếu `key` là một mảng chứa nhiều chuỗi khóa riêng tư, thì một phiên bản AccountKeyMultiSig sẽ được tạo. Nếu `key` là một đối tượng xác định khóa (chuỗi khóa riêng tư hoặc một mảng các chuỗi khóa riêng tư) cho mỗi vai trò, thì một phiên bản AccountKeyRoleBased sẽ được tạo. Phiên bản AccountKeyRoleBased có thể có AccountKeyPublic hoặc AccountKeyMultiSig cho mỗi vai trò. |


**Giá trị trả về**

`Đối tượng` - Một phiên bản AccountKeyPublic, AccountKeyMultiSig hoặc AccountKeyRoleBased được trả về với các thuộc tính sau:

| Tên            | Loại                              | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                       |
| -------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| loại          | Chuỗi                              | Loại phiên bản AccountKey.                                                                                                                                                                                                                                                                                                                                                                                                  |
| defaultKey     | Chuỗi                              | Khóa riêng tư mặc định của AccountKey. Khóa riêng tư mặc định đại diện cho một chuỗi khóa riêng tư được xác định cho AccountKeyPublic và một chuỗi khóa riêng tư trong chỉ mục thứ 0 của mảng nếu là AccountKeyMultiSig. Đối với AccountKeyRoleBased, khóa này đại diện cho khóa mặc định của AccountKey được tìm thấy đầu tiên, trong đó AccountKey được tìm kiếm theo thứ tự sau: transactionkey, updateKey, feePayerKey. |
| khóa           | Chuỗi \| Mảng \| Đối tượng | Tất cả các khóa riêng tư được xác định bên trong phiên bản AccountKey. Đối với AccountKeyPublic, đây là một chuỗi khóa riêng tư; đối với AccountKeyMultiSig, điều này trả về một mảng chứa tất cả các chuỗi khóa riêng tư. Trong trường hợp AccountKeyRoleBased, một đối tượng có các khóa được liên kết với từng vai trò sẽ được trả về.                                                                                   |
| transactionKey | Chuỗi \| Mảng                  | Khóa được sử dụng cho [RoleTransaction](../../../../learn/accounts.md#roles). AccountKeyPublic hoặc AccountKeyMultiSig không bị ràng buộc với bất kỳ vai trò nào, do đó, transactionKey giữ giá trị giống như các khóa. các khóa.                                                                                                                                                                              |
| updateKey      | Chuỗi \| Mảng                  | Khóa được sử dụng cho [RoleAccountUpdate](../../../../learn/accounts.md#roles). AccountKeyPublic hoặc AccountKeyMultiSig không bị ràng buộc với bất kỳ vai trò nào, vì vậy updateKey giữ giá trị giống như các khóa.khóa.                                                                                                                                                                                      |
| feePayerKey    | Chuỗi \| Mảng                  | Khóa được sử dụng cho [RoleFeePayer](../../../../learn/accounts.md#roles). AccountKeyPublic hoặc AccountKeyMultiSig không bị ràng buộc với bất kỳ vai trò nào, do đó, feePayerKey giữ cùng một giá trị như các khóa.                                                                                                                                                                                           |

**Ví dụ**

```javascript
// Tạo một AccountKeyPublic
> caver.klay.tài khoảns.createAccountKey('0x{private key}')
AccountKeyPublic {
    _key: '0x{private key}'
}

// Tạo một AccountKeyMultiSig
> caver.klay.tài khoảns.createAccountKey(['0x{private key}', '0x{private key}'])
AccountKeyMultiSig {
    _keys: [ 
      '0x{private key}',
      '0x{private key}'
    ]
}

// Tạo một AccountKeyRoleBased
> caver.klay.tài khoảns.createAccountKey({
    transactionKey: '0x{private key}',
    updateKey: ['0x{private key}', '0x{private key}'],
    feePayerKey: '0x{private key}'
})
AccountKeyRoleBased {
    _transactionKey:
        AccountKeyPublic {
            _key: '0x{private key}'
        },
    _updateKey:
        AccountKeyMultiSig {
            _keys: [
                '0x{private key}',
                '0x{private key}'
            ] 
        },
    _feePayerKey:
        AccountKeyPublic {
            _key: '0x{private key}' 
        }
}
```

## createAccountKeyPublic <a id="createaccountkeypublic"></a>

```javascript
caver.klay.tài khoảns.createAccountKeyPublic(key)
```
Tạo phiên bản của `AccountKeyPublic` với chuỗi khóa riêng tư đã cho.

**LƯU Ý** `caver.klay.tài khoảns.createAccountKeyPublic` được hỗ trợ kể từ caver-js phiên bản [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**Tham số**

| Tên  | type  | Mô tả                                                 |
| ---- | ----- | ----------------------------------------------------- |
| khóa | Chuỗi | Một chuỗi khóa riêng tư dùng để tạo AccountKeyPublic. |


**Giá trị trả về**

`Đối tượng` - Phiên bản AccountKeyPublic, xem [caver.klay.tài khoảns.createAccountKey](#createaccountkey).


**Ví dụ**

```javascript
> caver.klay.tài khoảns.createAccountKeyPublic('0x{private key}')
AccountKeyPublic {
    _key: '0x{private key}'
}
```

## createAccountKeyMultiSig <a id="createaccountkeymultisig"></a>

```javascript
caver.klay.tài khoảns.createAccountKeyMultiSig(keys)
```
Tạo phiên bản của `AccountKeyMultiSig` với nhiều khóa riêng tư đã cho.

**LƯU Ý** `caver.klay.tài khoảns.createAccountKeyMultiSig` được hỗ trợ kể từ caver-js phiên bản [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**Tham số**

| Tên  | Loại | Mô tả                                                            |
| ---- | ----- | ---------------------------------------------------------------- |
| khóa | Mảng  | Một mảng các chuỗi khóa riêng tư dùng để tạo AccountKeyMultiSig. |


**Giá trị trả về**

`Đối tượng` - Phiên bản AccountKeyMultiSig, xem [caver.klay.tài khoảns.createAccountKey](#createaccountkey).


**Ví dụ**

```javascript
> caver.klay.tài khoảns.createAccountKeyMultiSig(['0x{private key}', '0x{private key}'])
AccountKeyMultiSig {
    _keys: [ 
      '0x{private key}',
      '0x{private key}'
    ]
}
```

## createAccountKeyRoleBased <a id="createaccountkeyrolebased"></a>

```javascript
caver.klay.tài khoảns.createAccountKeyRoleBased(keyObject)
```
Tạo phiên bản của `AccountKeyRoleBased` với các khóa đã cho được liên kết với từng vai trò.

**LƯU Ý** `caver.klay.tài khoảns.createAccountKeyRoleBased` được hỗ trợ kể từ caver-js phiên bản [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**Tham số**

| Tên       | type      | Mô tả                                                                                                                            |
| --------- | --------- | -------------------------------------------------------------------------------------------------------------------------------- |
| keyObject | Đối tượng | Một đối tượng có các cặp khóa vai trò. Khóa cho mỗi vai trò có thể là chuỗi khóa riêng tư hoặc một mảng các chuỗi khóa riêng tư. |


**Giá trị trả về**

`Đối tượng` - Phiên bản AccountKeyRoleBased, xem [caver.klay.tài khoảns.createAccountKey](#createaccountkey).


**Ví dụ**

```javascript
> caver.klay.tài khoảns.createAccountKeyRoleBased({
    transactionKey: '0x{private key}',
    updateKey: ['0x{private key}', '0x{private key}'],
    feePayerKey: '0x{private key}'
})
AccountKeyRoleBased {
    _transactionKey:
        AccountKeyPublic {
            _key: '0x{private key}'
        },
    _updateKey:
        AccountKeyMultiSig {
            _keys: [
                '0x{private key}',
                '0x{private key}'
            ] 
        },
    _feePayerKey:
        AccountKeyPublic {
            _key: '0x{private key}' 
        }
}
```

## tài khoảnKeyToPublicKey <a id="accountkeytopublickey"></a>

```javascript
caver.klay.tài khoảns.tài khoảnKeyToPublicKey(tài khoảnKey)
```
Hàm này chuyển đổi khóa riêng tư của AccountKey thành khóa công khai.

**NOTE** `caver.klay.tài khoảns.tài khoảnKeyToPublicKey` được hỗ trợ kể từ caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**Tham số**

| Tên          | Loại                              | Mô tả                                                                                                                                                                                                                                   |
| ------------ | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tài khoảnKey | Chuỗi \| Mảng \| Đối tượng | Phiên bản AccountKey (`AccountKeyPublic`, `AccountKeyMultiSig` hoặc `AccountKeyRoleBased`) hoặc cấu trúc dữ liệu chứa thông tin khóa (chuỗi khóa riêng tư, mảng chuỗi khóa riêng tư hoặc một đối tượng xác định khóa cho từng vai trò). |

**Giá trị trả về**

| Loại                              | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Chuỗi \| Mảng \| Đối tượng | Nếu tham số là một phiên bản AccountKeyPublic hoặc một chuỗi khóa riêng tư, thì một chuỗi khóa công khai sẽ được trả về. Nếu tham số là một phiên bản AccountKeyMultiSig hoặc một mảng các chuỗi khóa riêng tư, thì một mảng các chuỗi khóa công khai sẽ được trả về. Nếu tham số là một phiên bản AccountKeyRoleBased hoặc một đối tượng xác định khóa (chuỗi khóa riêng tư hoặc một mảng các chuỗi khóa riêng tư) đối với mỗi vai trò, thì một đối tượng có vai trò và khóa công khai (chuỗi khóa công khai hoặc một mảng các chuỗi khóa công khai) được trả về. |


**Ví dụ**

```javascript
// Chuyển đổi chuỗi khóa riêng tư
> caver.klay.tài khoảns.tài khoảnKeyToPublicKey('0x{private key}')
'0x67f20d1198abcdc036a4d8f3ea0cf837527716c90f71d0b0410dfe3e1b405eded9ea818eedd5e8ad79658b2cdf4862ab0956a6f7fd0a4886afe6110b2e9803a4'

// Chuyển đổi một mảng các chuỗi khóa riêng tư
> caver.klay.tài khoảns.tài khoảnKeyToPublicKey(['0x{private key}', '0x{private key}'])
[
    '0x67f20d1198abcdc036a4d8f3ea0cf837527716c90f71d0b0410dfe3e1b405eded9ea818eedd5e8ad79658b2cdf4862ab0956a6f7fd0a4886afe6110b2e9803a4',
    '0x7c5415f99628618b3fe78e14606c83a22488769b3361e3758c7c98a204a23b615cf07af65490895d70a7b7e7e885fc2f597d65ea69ed586c7ae7cb0241656036'
]

// Chuyển đổi khóa theo vai trò
> caver.klay.tài khoảns.tài khoảnKeyToPublicKey({transactionKey: ['0x{private key}', '0x{private key}'], updateKey: '0x{private key}', feePayerKey: ['0x{private key}', '0x{private key}']})
{ 
    transactionKey: [
        '0x67f20d1198abcdc036a4d8f3ea0cf837527716c90f71d0b0410dfe3e1b405eded9ea818eedd5e8ad79658b2cdf4862ab0956a6f7fd0a4886afe6110b2e9803a4',
        '0x7c5415f99628618b3fe78e14606c83a22488769b3361e3758c7c98a204a23b615cf07af65490895d70a7b7e7e885fc2f597d65ea69ed586c7ae7cb0241656036'
    ],
    updateKey: '0x21aa42e0232e6c7607a0028bcbd690400b92574c44b17af8b036f3f4f01b0586f90578976a040debf6aecef4a5d00b5315b8c82e999ed8e5fbacd5fcbee82080',
    feePayerKey: [
        '0xb82bb74e902b1fa3594c7cc8bd33a727eb1c85a9bfc991327a0215fc413eafe0b3723cc7f3c6e79981b409e82b8bf7033fed2d2878c26502bea64f84d592b167',
        '0x39acd887f32ccecd1b13c890854d2dfd0016f0be477155d81a848e971ff59412b0e4c0b5bfc1fd548b971f98cd9ef19367309d0475033fda3c8028ba9df27734'
    ]
}
```

## privateKeyToAccount <a id="privatekeytoaccount"></a>

```javascript
caver.klay.tài khoảns.privateKeyToAccount(privateKey)
```
Tạo một đối tượng tài khoản từ khóa riêng tư.

**Tham số**

| Tên        | Loại | Mô tả                             |
| ---------- | ----- | --------------------------------- |
| privateKey | chuỗi | Khóa riêng tư dùng để chuyển đổi. |


**Giá trị trả về**

`Đối tượng` - Đối tượng tài khoản

**Ví dụ**

```javascript
> caver.klay.tài khoảns.privateKeyToAccount('0x{private key}');
{ 
    address: '0x62ca8964610a9d447e1a64753a09fc8b3d40b405',
    privateKey: '0x{private key}',
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey] 
}
```

## privateKeyToPublicKey <a id="privatekeytopublickey"></a>

```javascript
caver.klay.tài khoảns.privateKeyToPublicKey(privateKey)
```
Nhận khóa công khai từ khóa riêng tư đã cho

**Tham số**

| Tên        | Loại | Mô tả                             |
| ---------- | ----- | --------------------------------- |
| privateKey | chuỗi | Khóa riêng tư dùng để chuyển đổi. |


**Giá trị trả về**

`Chuỗi` - Khóa công khai (64 byte)

**Ví dụ**

```javascript
> caver.klay.tài khoảns.privateKeyToPublicKey('0x{private key}')
'0xbb1846722a4c27e71196e1a44611ee7174276a6c51c4830fb810cac64b0725f217cb8783625a809d1303adeeec2cf036ab74098a77a6b7f1003486e173b29aa7'
```

## createAccountForUpdate <a id="createaccountforupdate"></a>

```javascript
caver.klay.tài khoảns.createAccountForUpdate(address, tài khoảnKey, options)
```
Tạo phiên bản của `AccountForUpdate`. AccountForUpdate chứa địa chỉ của tài khoản và khóa công khai mới để cập nhật.

`AccountForUpdate` có thể được sử dụng trong đối tượng giao dịch cập nhật tài khoản (`ACCOUNT_UPDATE`, `FEE_DELEGATED_ACCOUNT_UPDATE` hoặc `FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO`) dưới dạng `khóa`. Nếu bạn muốn biết cách sử dụng `AccountForUpdate` trong giao dịch, hãy xem [Cập nhật tài khoản với AccountForUpdate](../get-started-1.4.1.md#account-update-with-accountforupdate).

Tham số tài khoảnKey của caver.klay.tài khoảns.createAccountForUpdate phải là khóa riêng tư.

Bạn có thể tạo phiên bản AccountForUpdate bằng khóa công khai với [caver.klay.tài khoảns.createAccountForUpdateWithPublicKey](#createaccountforupdatewithpublickey).

Bạn cũng có thể dùng [caver.klay.tài khoảns.createAccountForUpdateWithLegacyKey](#createaccountforupdatewithlegacykey) để tạo phiên bản AccountForUpdate dùng để cập nhật lên [AccountKeyLegacy](../../../../learn/accounts.md#accountkeylegacy) và [caver.klay.tài khoảns.createAccountForUpdateWithFailKey](#createaccountforupdatewithfailkey) để tạo phiên bản AccountForUpdate dùng để cập nhật lên [AccountKeyFail](../../../../learn/accounts.md#accountkeyfail).

**LƯU Ý** `caver.klay.tài khoảns.createAccountForUpdate` được hỗ trợ kể từ caver-js phiên bản [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**Tham số**

| Tên          | type                               | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------ | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address      | Chuỗi                              | Địa chỉ của tài khoản.                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| tài khoảnKey | Chuỗi \| Mảng \| Đối tượng | Phiên bản AccountKey (`AccountKeyPublic`, `AccountKeyMultiSig` hoặc `AccountKeyRoleBased`) hoặc thông tin khóa tương đương (chuỗi khóa riêng tư, mảng các chuỗi khóa riêng tư hoặc đối tượng xác định (các) khóa với (các) vai trò). Nếu tài khoảnKey không phải là một phiên bản AccountKey, thì phương pháp này sẽ gọi nội bộ [caver.klay.tài khoảns.createAccountKey](#createaccountkey) để tạo một phiên bản AccountKey từ thông tin khóa đã cho. |
| tùy chọn     | Đối tượng                          | Một đối tượng tùy chọn chứa ngưỡng và trọng số. Điều này là bắt buộc khi sử dụng AccountKeyMultiSig. Cách sử dụng được minh họa trong ví dụ dưới đây.                                                                                                                                                                                                                                                                                                   |

**Giá trị trả về**

`Đối tượng` - Một phiên bản AccountForUpdate được trả về với các thuộc tính sau:

| Tên          | type      | Mô tả                                                                  |
| ------------ | --------- | ---------------------------------------------------------------------- |
| address      | Chuỗi     | Địa chỉ của tài khoản sẽ được cập nhật.                                |
| keyForUpdate | Đối tượng | Một đối tượng chứa khóa công khai mới được lấy từ tài khoảnKey đã cho. |


**Ví dụ**

```javascript
// Tạo AccountForUpdate cho AccountKeyPublic
> caver.klay.tài khoảns.createAccountForUpdate('0x5B4EF8e2417DdE1b9B80BcfC35d1bfeF3D7234ef', '0x{private key}')
AccountForUpdate {
    address: '0x5B4EF8e2417DdE1b9B80BcfC35d1bfeF3D7234ef',
    keyForUpdate: { 
        publicKey: '0x24c32ee4f908ceed89e7501de2980fcb1d2add69080d3921f86c49de863eb2d507e24d9aaf91328b7f7cef2a94b538cb33b3f8cdd64925855ce0a4bf6e11f3db'
    }
}

// Tạo AccountForUpdate cho AccountKeyMultiSig với đối tượng tùy chọn
> caver.klay.tài khoảns.createAccountForUpdate('0x5B4EF8e2417DdE1b9B80BcfC35d1bfeF3D7234ef', ['0x{private key}', '0x{private key}'], { threshold: 2, weight: [1,1] })
AccountForUpdate {
    address: '0x5B4EF8e2417DdE1b9B80BcfC35d1bfeF3D7234ef',
    keyForUpdate: {
        multisig: {
            threshold: 2,
            keys: [
                {
                    weight: 1, 
                    publicKey: '0xc89f551ce9c569cf978f4f64833e447f177a83eda4f1883d770360ab35002dbdeb2d502cd33217238add013ea1c4ff5055ceda46473569824e336d0d64e9eeb2'
                },
                {
                    weight: 1, 
                    publicKey: '0xab0837fa3d61cf33dc4f3af4aca692d8c939566e1abbca0036fa3b29cd55b38a387f73baf59510d96680062bd129dd2bb8dcbb5ea5ed16c881f83a3251f73600'
                }
            ]
        }
    }
}

// Tạo AccountForUpdate cho AccountKeyRoleBased với đối tượng tùy chọn
> caver.klay.tài khoảns.createAccountForUpdate('0x5B4EF8e2417DdE1b9B80BcfC35d1bfeF3D7234ef', { transactionKey: '0x{private key}', updateKey: ['0x{private key}', '0x{private key}'], feePayerKey: '0x{private key}' }, { updateKey: { threshold: 2, weight: [1,1] } })
AccountForUpdate {
    address: '0x5B4EF8e2417DdE1b9B80BcfC35d1bfeF3D7234ef',
    keyForUpdate: { 
        roleTransactionKey: { 
            publicKey: '0x2b4a1d4ca1ee828f17e8c4c0ac0c0c46cf08f4b27fafc01e4b3481a4fe0891cacf315ed10b1df85bfd6797ea6c5ebafac437a7564eff355b11ad1e3d6e6c43a7'
        },
        roleAccountUpdateKey: { 
            multisig: { 
                threshold: 2,
                keys: [
                    { 
                        weight: 1,
                        publicKey: '0x26156615c8e503d96cd332a2fba6aab88b6156b983c89f586bcfc0443c0a7f2372d892d73c66d30f726f8269c75920a082eb2e57f6662d855389bb922ee263f3'
                    },
                    {
                        weight: 1,
                        publicKey: '0xafc139d2bcace02fa3d4b12926f976cf672f35a6ea2bc0f7e2e6d2ada0dd28f672acb8dcaedc694d6134a2f6c4aae472c9d67d30f760e16e742e01758c4daf83'
                    }
                ]
            }
        },
        roleFeePayerKey: {
            publicKey: '0xe55d39e147a0d5542d4bb965aeaa01e918c81a332ce47e0d3173179fe5b68c8c9264bec516d50bea0a7da7c3d8f98e124761a9b27434221d138ff8e22d932a0a'
        }
    }
}

// Tạo AccountForUpdate cho AccountKeyRoleBased với khóa kế thừa hoặc khóa lỗi
// Khi cập nhật khóa được sử dụng cho một vai trò cụ thể trong AccountKeyRoleBased thành AccountKeyLegacy hoặc AccountKeyFailKey, hãy xác định vai trò cần cập nhật như sau.
> caver.klay.tài khoảns.createAccountForUpdate('0x5B4EF8e2417DdE1b9B80BcfC35d1bfeF3D7234ef', { transactionKey: 'legacyKey', updateKey: 'failKey' })
AccountForUpdate {
    address: '0x5B4EF8e2417DdE1b9B80BcfC35d1bfeF3D7234ef',
    keyForUpdate: {
        roleTransactionKey: { legacyKey: true },
        roleAccountUpdateKey: { failKey: true }
    }
}
```

## createAccountForUpdateWithPublicKey <a id="createaccountforupdatewithpublickey"></a>

```javascript
caver.klay.tài khoảns.createAccountForUpdateWithPublicKey(address, keyForUpdate, options)
```
Tạo một phiên bản `AccountForUpdate` bằng khóa công khai của khóa mới cần cập nhật.

`AccountForUpdate` có thể được sử dụng trong đối tượng giao dịch cập nhật tài khoản (`ACCOUNT_UPDATE`, `FEE_DELEGATED_ACCOUNT_UPDATE` hoặc `FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO`) dưới dạng `khóa`. Nếu bạn muốn biết cách sử dụng `AccountForUpdate` trong giao dịch, hãy xem [Cập nhật tài khoản với AccountForUpdate](../get-started-1.4.1.md#account-update-with-accountforupdate).

**NOTE** `caver.klay.tài khoảns.createAccountForUpdateWithPublicKey` được hỗ trợ kể từ caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**Tham số**

| Tên          | Loại                              | Mô tả                                                                                                                                                                                                                                                                                   |
| ------------ | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address      | Chuỗi                              | Địa chỉ của tài khoản.                                                                                                                                                                                                                                                                  |
| keyForUpdate | Chuỗi \| Mảng \| Đối tượng | Khóa công khai của khóa mới cần cập nhật. Giá trị này là một chuỗi khóa công khai khi khóa là AccountKeyPublic, một mảng chuỗi khóa công khai khi AccountKeyMultiSig, một đối tượng khi khóa là AccountKeyRoleBased.                                                                    |
| tùy chọn     | Đối tượng                          | Một đối tượng tùy chọn chứa ngưỡng và trọng số. Điều này là bắt buộc khi sử dụng AccountKeyMultiSig. Nếu bạn sử dụng AccountkeyMultiSig làm một trong các khóa trong AccountKeyRoleBased, hãy chỉ định vai trò của ngưỡng và trọng số. Cách sử dụng được minh họa trong ví dụ dưới đây. |

**Giá trị trả về**

`Đối tượng` - Phiên bản AccountForUpdate, xem [caver.klay.tài khoảns.createAccountForUpdate](#createaccountforupdate).


**Ví dụ**

```javascript
// Tạo AccountForUpdate cho AccountKeyPublic
> caver.klay.tài khoảns.createAccountForUpdateWithPublicKey('0x5B4EF8e2417DdE1b9B80BcfC35d1bfeF3D7234ef', '0x24c32ee4f908ceed89e7501de2980fcb1d2add69080d3921f86c49de863eb2d507e24d9aaf91328b7f7cef2a94b538cb33b3f8cdd64925855ce0a4bf6e11f3db')
AccountForUpdate {
    address: '0x5B4EF8e2417DdE1b9B80BcfC35d1bfeF3D7234ef',
    keyForUpdate: { 
        publicKey: '0x24c32ee4f908ceed89e7501de2980fcb1d2add69080d3921f86c49de863eb2d507e24d9aaf91328b7f7cef2a94b538cb33b3f8cdd64925855ce0a4bf6e11f3db'
    }
}

// Tạo AccountForUpdate cho AccountKeyMultiSig với đối tượng tùy chọn
> caver.klay.tài khoảns.createAccountForUpdateWithPublicKey('0x5B4EF8e2417DdE1b9B80BcfC35d1bfeF3D7234ef', ['0xc89f551ce9c569cf978f4f64833e447f177a83eda4f1883d770360ab35002dbdeb2d502cd33217238add013ea1c4ff5055ceda46473569824e336d0d64e9eeb2', '0xab0837fa3d61cf33dc4f3af4aca692d8c939566e1abbca0036fa3b29cd55b38a387f73baf59510d96680062bd129dd2bb8dcbb5ea5ed16c881f83a3251f73600'], { threshold: 2, weight: [1,1] })
AccountForUpdate {
    address: '0x5B4EF8e2417DdE1b9B80BcfC35d1bfeF3D7234ef',
    keyForUpdate: {
        multisig: {
            threshold: 2,
            keys: [
                {
                    weight: 1, 
                    publicKey: '0xc89f551ce9c569cf978f4f64833e447f177a83eda4f1883d770360ab35002dbdeb2d502cd33217238add013ea1c4ff5055ceda46473569824e336d0d64e9eeb2'
                },
                {
                    weight: 1, 
                    publicKey: '0xab0837fa3d61cf33dc4f3af4aca692d8c939566e1abbca0036fa3b29cd55b38a387f73baf59510d96680062bd129dd2bb8dcbb5ea5ed16c881f83a3251f73600'
                }
            ]
        }
    }
}

// Tạo AccountForUpdate cho AccountKeyRoleBased với đối tượng tùy chọn
> caver.klay.tài khoảns.createAccountForUpdateWithPublicKey('0x5B4EF8e2417DdE1b9B80BcfC35d1bfeF3D7234ef', { transactionKey: '0x2b4a1d4ca1ee828f17e8c4c0ac0c0c46cf08f4b27fafc01e4b3481a4fe0891cacf315ed10b1df85bfd6797ea6c5ebafac437a7564eff355b11ad1e3d6e6c43a7', updateKey: ['0x26156615c8e503d96cd332a2fba6aab88b6156b983c89f586bcfc0443c0a7f2372d892d73c66d30f726f8269c75920a082eb2e57f6662d855389bb922ee263f3', '0xafc139d2bcace02fa3d4b12926f976cf672f35a6ea2bc0f7e2e6d2ada0dd28f672acb8dcaedc694d6134a2f6c4aae472c9d67d30f760e16e742e01758c4daf83'], feePayerKey: '0xe55d39e147a0d5542d4bb965aeaa01e918c81a332ce47e0d3173179fe5b68c8c9264bec516d50bea0a7da7c3d8f98e124761a9b27434221d138ff8e22d932a0a' }, { updateKey: { threshold: 2, weight: [1,1] } })
AccountForUpdate {
    address: '0x5B4EF8e2417DdE1b9B80BcfC35d1bfeF3D7234ef',
    keyForUpdate: { 
        roleTransactionKey: { 
            publicKey: '0x2b4a1d4ca1ee828f17e8c4c0ac0c0c46cf08f4b27fafc01e4b3481a4fe0891cacf315ed10b1df85bfd6797ea6c5ebafac437a7564eff355b11ad1e3d6e6c43a7'
        },
        roleAccountUpdateKey: { 
            multisig: { 
                threshold: 2,
                keys: [
                    { 
                        weight: 1,
                        publicKey: '0x26156615c8e503d96cd332a2fba6aab88b6156b983c89f586bcfc0443c0a7f2372d892d73c66d30f726f8269c75920a082eb2e57f6662d855389bb922ee263f3'
                    },
                    {
                        weight: 1,
                        publicKey: '0xafc139d2bcace02fa3d4b12926f976cf672f35a6ea2bc0f7e2e6d2ada0dd28f672acb8dcaedc694d6134a2f6c4aae472c9d67d30f760e16e742e01758c4daf83'
                    }
                ]
            }
        },
        roleFeePayerKey: {
            publicKey: '0xe55d39e147a0d5542d4bb965aeaa01e918c81a332ce47e0d3173179fe5b68c8c9264bec516d50bea0a7da7c3d8f98e124761a9b27434221d138ff8e22d932a0a'
        }
    }
}
```

## createAccountForUpdateWithLegacyKey <a id="createaccountforupdatewithlegacykey"></a>

```javascript
caver.klay.tài khoảns.createAccountForUpdateWithLegacyKey(address)
```
Tạo một phiên bản AccountForUpdate để cập nhật khóa của tài khoản bằng [AccountKeyLegacy](../../../../learn/accounts.md#accountkeylegacy). Đảm bảo rằng bạn có khóa riêng tư khớp với địa chỉ tài khoản của mình trước khi cập nhật lên AccountKeyLegacy.

`AccountForUpdate` có thể được sử dụng trong đối tượng giao dịch cập nhật tài khoản (`ACCOUNT_UPDATE`, `FEE_DELEGATED_ACCOUNT_UPDATE` hoặc `FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO`) dưới dạng `khóa`. Nếu bạn muốn biết cách sử dụng `AccountForUpdate` trong giao dịch, hãy xem [Cập nhật tài khoản với AccountForUpdate](../get-started-1.4.1.md#account-update-with-accountforupdate).

**Lưu ý** `caver.klay.tài khoảns.createAccountForUpdateWithLegacyKey` được hỗ trợ kể từ caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**Tham số**

| Tên     | Loại | Mô tả                  |
| ------- | ----- | ---------------------- |
| address | Chuỗi | Địa chỉ của tài khoản. |

**Giá trị trả về**

`Đối tượng` - Phiên bản AccountForUpdate, xem [caver.klay.tài khoảns.createAccountForUpdate](#createaccountforupdate).


**Ví dụ**

```javascript
// Tạo AccountForUpdate cho AccountKeyLegacy
> caver.klay.tài khoảns.createAccountForUpdateWithLegacyKey('0x5B4EF8e2417DdE1b9B80BcfC35d1bfeF3D7234ef')
AccountForUpdate {
    address: '0x5B4EF8e2417DdE1b9B80BcfC35d1bfeF3D7234ef',
    keyForUpdate: { legacyKey: true } 
}
```

## createAccountForUpdateWithFailKey <a id="createaccountforupdatewithfailkey"></a>

```javascript
caver.klay.tài khoảns.createAccountForUpdateWithFailKey(address)
```
Tạo một phiên bản AccountForUpdate để cập nhật khóa của tài khoản bằng [AccountKeyFail](../../../../learn/accounts.md#accountkeyfail). Các giao dịch được gửi bởi một tài khoản có AccountKeyFail luôn không thành công trong quá trình xác thực.

`AccountForUpdate` có thể được sử dụng trong đối tượng giao dịch cập nhật tài khoản (`ACCOUNT_UPDATE`, `FEE_DELEGATED_ACCOUNT_UPDATE` hoặc `FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO`) dưới dạng `khóa`. Nếu bạn muốn biết cách sử dụng `AccountForUpdate` trong giao dịch, hãy xem [Cập nhật tài khoản với AccountForUpdate](../get-started-1.4.1.md#account-update-with-accountforupdate).

**LƯU Ý** `caver.klay.tài khoảns.createAccountForUpdateWithFailKey` được hỗ trợ kể từ caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**Tham số**

| Tên     | Loại | Mô tả                  |
| ------- | ----- | ---------------------- |
| address | Chuỗi | Địa chỉ của tài khoản. |

**Giá trị trả về**

`Đối tượng` - Phiên bản AccountForUpdate, xem [caver.klay.tài khoảns.createAccountForUpdate](#createaccountforupdate).


**Ví dụ**

```javascript
// Tạo AccountForUpdate cho AccountKeyFail
> caver.klay.tài khoảns.createAccountForUpdateWithFailKey('0x5B4EF8e2417DdE1b9B80BcfC35d1bfeF3D7234ef')
AccountForUpdate {
    address: '0x5B4EF8e2417DdE1b9B80BcfC35d1bfeF3D7234ef',
    keyForUpdate: { failKey: true } 
}
```

## signTransaction <a id="signtransaction"></a>

```javascript
caver.klay.tài khoảns.signTransaction(tx [, privateKey] [, callback])
```

Ký một giao dịch Klaytn bằng một khóa riêng tư đã cho.

Vì caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0) nên phương pháp này lấy một giao dịch được mã hóa RLP làm một đầu vào cũng như một đối tượng giao dịch thuần. Xem [caver.klay.sendTransaction](./caver.klay/transaction/transaction.md#sendtransaction) để biết các loại đối tượng giao dịch khác nhau. Về cơ bản, phương pháp này ký với tư cách là người gửi. Nếu bạn muốn ký với tư cách là người trả phí, bạn nên sử dụng [caver.klay.tài khoảns.feePayerSignTransaction](#feepayersigntransaction). Tuy nhiên, người trả phí vẫn có thể ký bằng phương pháp này bằng cách chuyển một đối tượng, `{senderRawTransaction: rawTransaction, feePayer: feePayerAddress}`, dưới dạng `tx`. senderRawTransaction phải là giao dịch loại FEE_DELEGATED_.

Ngoài ra, vì caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0), signTransaction giữ chữ ký/feePayerSignatures hiện có trong giao dịch đầu vào và nối (các) chữ ký của người ký vào đó.

Xem [Gửi Giao dịch có nhiều người ký](../get-started-1.4.1.md#sending-a-transaction-with-multiple-signer) để biết cách kết hợp chữ ký của nhiều người dùng thành một rawTransaction duy nhất.

**Tham số**

| Tên        | Loại                  | Mô tả                                                                                                                                                                                                                                                                                  |
| ---------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tx         | Chuỗi \| Đối tượng | Đối tượng giao dịch hoặc chuỗi giao dịch được mã hóa RLP (rawTransaction). Các thuộc tính của một đối tượng giao dịch khác nhau tùy thuộc vào loại giao dịch. Để biết mô tả về từng loại giao dịch, hãy xem [caver.klay.sendTransaction](./caver.klay/transaction/transaction.md#sendtransaction). |
| privateKey | Chuỗi \| Mảng      | (tùy chọn) Khóa riêng tư dùng để ký.                                                                                                                                                                                                                                                   |
| callback   | Hàm                    | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai.                                                                                                                                                                         |

**LƯU Ý** Tham số `privateKey` đã được thay đổi thành `tham số tùy chọn` kể từ caver-js [v1.2.0-rc.3](https://www.npmjs.com/package/caver-js/v/1.2.0-rc.3). Ngoài ra, tham số privateKey hỗ trợ `mảng` của các chuỗi khóa riêng tư kể từ caver-js [v1.2.0-rc.3](https://www.npmjs.com/package/caver-js/v/1.2.0-rc.3). Nếu bạn không chuyển khóa riêng tư, tài khoản `từ` hoặc `feePayer` phải tồn tại trong caver.klay.tài khoảns.wallet để ký giao dịch. Nếu một mảng privateKeys được cung cấp, thì giao dịch được ký bằng tất cả các khóa bên trong mảng.

**LƯU Ý** Tham số `tx` chấp nhận giao dịch được mã hóa RLP kể từ caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**Giá trị trả về**

`Promise` trả về `Đối tượng`: Giao dịch đã ký được mã hóa RLP. Các thuộc tính đối tượng như sau:

| Tên                | Loại         | Mô tả                                                                                                                                 |
| ------------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| messageHash        | Chuỗi         | Hàm băm của thông báo đã cho.                                                                                                         |
| r                  | Chuỗi         | Chữ ký ECDSA r.                                                                                                                       |
| s                  | Chuỗi         | Chữ ký ECDSA s.                                                                                                                       |
| v                  | Chuỗi         | Mã khôi phục ECDSA.                                                                                                                   |
| rawTransaction     | Chuỗi         | Giao dịch được mã hóa RLP, sẵn sàng gửi bằng cách sử dụng caver.klay.sendSignedTransaction.                                           |
| txHash             | Chuỗi 32 byte | Hàm băm của giao dịch.                                                                                                                |
| senderTxHash       | Chuỗi 32 byte | Hàm băm của một giao dịch chỉ được người gửi ký. Xem [SenderTxHash](../../../../learn/transactions/transactions.md#sendertxhash) |
| chữ ký             | Mảng          | (tùy chọn) Một mảng (các) chữ ký của người gửi.                                                                                       |
| feePayerSignatures | Mảng          | (tùy chọn) Một mảng (các) chữ ký của người trả phí.                                                                                   |

**LƯU Ý** Các thuộc tính signature và feePayerSignatures đã được thêm từ caver-js [v1.2.0-rc.3](https://www.npmjs.com/package/caver-js/v/1.2.0-rc.3). Nếu người gửi ký giao dịch, mảng chữ ký sẽ được trả về trong `signatures`. Nếu người trả phí ký, mảng chữ ký sẽ được trả về trong `feePayerSignatures`.

**LƯU Ý** `txHash` và `senderTxHash` trong đối tượng kết quả có thể không phải là giá trị cuối cùng. Nếu chữ ký của người gửi khác được thêm vào, txHash và người gửiTxHash sẽ thay đổi. Nếu chữ ký của người trả phí được thêm vào, txHash sẽ thay đổi.

**Ví dụ**

```javascript
// ký giao dịch kế thừa với chuỗi khóa riêng tư
> caver.klay.tài khoảns.signTransaction({
    from: '0x72519cf34d9aa14629e7ad0cad5d55a3bb398364',
    to: '0xa9d2cc2bb853163b6eadfb6f962d72f7e00bc2e6',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 900000,
}, '0x{private key}').then(console.log)
{ 
    messageHash: '0xc4f3d98b901489c2c6e7bb9a5ddb4bc807b0251c6eac671356f01b66b749141f',
    v: '0x4e44',
    r: '0x2ef0d0c59ad302bcd73823879f6e1550e4bc6e6c38be69724c71ad6e09edde82',
    s: '0x602b1064ff5a6ba4718a493e50cf9e58ca9a9addf6ed4bbbc89fbc040a3c107e',
    rawTransaction: '0xf86f808505d21dba00830dbba094a9d2cc2bb853163b6eadfb6f962d72f7e00bc2e6880de0b6b3a764000080824e44a02ef0d0c59ad302bcd73823879f6e1550e4bc6e6c38be69724c71ad6e09edde82a0602b1064ff5a6ba4718a493e50cf9e58ca9a9addf6ed4bbbc89fbc040a3c107e',
    txHash: '0x87e84bd1d9c512cfabe5ebce10597dd40bc6fe828a10e460b7c01075c76b71a5',
    senderTxHash: '0x87e84bd1d9c512cfabe5ebce10597dd40bc6fe828a10e460b7c01075c76b71a5',
    signatures: [ 
        '0x4e44',
        '0x2ef0d0c59ad302bcd73823879f6e1550e4bc6e6c38be69724c71ad6e09edde82',
        '0x602b1064ff5a6ba4718a493e50cf9e58ca9a9addf6ed4bbbc89fbc040a3c107e' 
    ] 
}

// signTransaction với chuỗi khóa riêng tư
> caver.klay.tài khoảns.signTransaction({
    type: 'VALUE_TRANSFER',
    from: '0x72519cf34d9aa14629e7ad0cad5d55a3bb398364',
    to: '0xa9d2cc2bb853163b6eadfb6f962d72f7e00bc2e6',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 900000,
}, '0x{private key}').then(console.log)
{ 
    messageHash: '0xf003c68467424eed29b55d3d107167b207adb6bba66f8b9b73b7df824beb144c',
    v: '0x4e43',
    r: '0xea3bba902857eb58bed048fd1b94c5d99881e4356221d6e1e6e873401abf3a5c',
    s: '0x5e5d250db3c31a193dbe5289935755461ad78e41c1f60d3ca80ae0a97d2a9924',
    rawTransaction: '0x08f887808505d21dba00830dbba094a9d2cc2bb853163b6eadfb6f962d72f7e00bc2e6880de0b6b3a76400009472519cf34d9aa14629e7ad0cad5d55a3bb398364f847f845824e43a0ea3bba902857eb58bed048fd1b94c5d99881e4356221d6e1e6e873401abf3a5ca05e5d250db3c31a193dbe5289935755461ad78e41c1f60d3ca80ae0a97d2a9924',
    txHash: '0x1b5759e8060ac01ba94437bd115ecf471ba05e144f4874dd5b82a8379aa98a63',
    senderTxHash: '0x1b5759e8060ac01ba94437bd115ecf471ba05e144f4874dd5b82a8379aa98a63',
    signatures: [ 
        [ 
            '0x4e43',
            '0xea3bba902857eb58bed048fd1b94c5d99881e4356221d6e1e6e873401abf3a5c',
            '0x5e5d250db3c31a193dbe5289935755461ad78e41c1f60d3ca80ae0a97d2a9924' 
        ]
    ]
}

// signTransaction không có tham số privateKey
> caver.klay.tài khoảns.signTransaction({
    type: 'VALUE_TRANSFER',
    from: '0x72519cf34d9aa14629e7ad0cad5d55a3bb398364',
    to: '0xa9d2cc2bb853163b6eadfb6f962d72f7e00bc2e6',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 900000,
}).then(console.log)
{ 
    messageHash: '0xf003c68467424eed29b55d3d107167b207adb6bba66f8b9b73b7df824beb144c',
    v: '0x4e43',
    r: '0xea3bba902857eb58bed048fd1b94c5d99881e4356221d6e1e6e873401abf3a5c',
    s: '0x5e5d250db3c31a193dbe5289935755461ad78e41c1f60d3ca80ae0a97d2a9924',
    rawTransaction: '0x08f887808505d21dba00830dbba094a9d2cc2bb853163b6eadfb6f962d72f7e00bc2e6880de0b6b3a76400009472519cf34d9aa14629e7ad0cad5d55a3bb398364f847f845824e43a0ea3bba902857eb58bed048fd1b94c5d99881e4356221d6e1e6e873401abf3a5ca05e5d250db3c31a193dbe5289935755461ad78e41c1f60d3ca80ae0a97d2a9924',
    txHash: '0x1b5759e8060ac01ba94437bd115ecf471ba05e144f4874dd5b82a8379aa98a63',
    senderTxHash: '0x1b5759e8060ac01ba94437bd115ecf471ba05e144f4874dd5b82a8379aa98a63',
    signatures: [ 
        [ 
            '0x4e43',
            '0xea3bba902857eb58bed048fd1b94c5d99881e4356221d6e1e6e873401abf3a5c',
            '0x5e5d250db3c31a193dbe5289935755461ad78e41c1f60d3ca80ae0a97d2a9924' 
        ]
    ]
}

// signTransaction với mảng khóa riêng tư
> caver.klay.tài khoảns.signTransaction({
    type: 'VALUE_TRANSFER',
    from: '0x72519cf34d9aa14629e7ad0cad5d55a3bb398364',
    to: '0xa9d2cc2bb853163b6eadfb6f962d72f7e00bc2e6',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 900000,
}, ['0x{private key}', '0x{private key}']).then(console.log)
{ 
    messageHash: '0xf003c68467424eed29b55d3d107167b207adb6bba66f8b9b73b7df824beb144c',
    v: '0x4e44',
    r: '0xf9e93c6dc3227a4cde633dc7a9b3c5e81ceb1879bfcf138d6205b2d49cdef60b',
    s: '0x0787d1a42c75d6d708ddb7552c6470ad15e58da6259cdf48e508f577187fad20',
    rawTransaction: '0x08f8ce808505d21dba00830dbba094a9d2cc2bb853163b6eadfb6f962d72f7e00bc2e6880de0b6b3a76400009472519cf34d9aa14629e7ad0cad5d55a3bb398364f88ef845824e44a0f9e93c6dc3227a4cde633dc7a9b3c5e81ceb1879bfcf138d6205b2d49cdef60ba00787d1a42c75d6d708ddb7552c6470ad15e58da6259cdf48e508f577187fad20f845824e43a0ea3bba902857eb58bed048fd1b94c5d99881e4356221d6e1e6e873401abf3a5ca05e5d250db3c31a193dbe5289935755461ad78e41c1f60d3ca80ae0a97d2a9924',
    txHash: '0x1dfac8cb1ab9c25de93758652f3cded2537355e2207c45ba39442b7cb700e8fd',
    senderTxHash: '0x1dfac8cb1ab9c25de93758652f3cded2537355e2207c45ba39442b7cb700e8fd',
    signatures: [ 
        [ 
            '0x4e44',
            '0xf9e93c6dc3227a4cde633dc7a9b3c5e81ceb1879bfcf138d6205b2d49cdef60b',
            '0x0787d1a42c75d6d708ddb7552c6470ad15e58da6259cdf48e508f577187fad20' 
        ],
        [ 
            '0x4e43',
            '0xea3bba902857eb58bed048fd1b94c5d99881e4356221d6e1e6e873401abf3a5c',
            '0x5e5d250db3c31a193dbe5289935755461ad78e41c1f60d3ca80ae0a97d2a9924' 
        ]
    ] 
}

//signTransaction với khóa riêng tư của người trả phí
> caver.klay.tài khoảns.signTransaction({
    senderRawTransaction: '0x09f886819a8505d21dba00830dbba094d05c5926b0a2f31aadcc9a9cbd3868a50104d834019476d1cc1cdb081de8627cab2c074f02ebc7bce0d0f847f845820fe9a0c5ea5b57f460bbc76101bafa2ed16228af0c0094d31a8a799e430278b4360724a0240afd7cf426e6aababdc59a3935b97aac4e059b59ba85ccedc75c95168abcfb80c4c3018080',
    feePayer: '0x6e75945404daa4130a338af01199244b1eae2a0b'
}, '0x{private key}').then(console.log)
{ 
    messageHash: '0xec121b6f7e2925166bcb1e6f14fd0b078f1168b6feca9340db7bd31998d14043',
    v: '0x4e44',
    r: '0xf68d2c65563baee7a76d5f75aaadbfecf4ae3f55b349013f740159edd38465d9',
    s: '0x5146c0bbe998a7ba6e7c8f5aef7eb5fea0b4b7429713d65e38b2435f6a575300',
    rawTransaction: '0x09f8de819a8505d21dba00830dbba094d05c5926b0a2f31aadcc9a9cbd3868a50104d834019476d1cc1cdb081de8627cab2c074f02ebc7bce0d0f847f845820fe9a0c5ea5b57f460bbc76101bafa2ed16228af0c0094d31a8a799e430278b4360724a0240afd7cf426e6aababdc59a3935b97aac4e059b59ba85ccedc75c95168abcfb946e75945404daa4130a338af01199244b1eae2a0bf847f845824e44a0f68d2c65563baee7a76d5f75aaadbfecf4ae3f55b349013f740159edd38465d9a05146c0bbe998a7ba6e7c8f5aef7eb5fea0b4b7429713d65e38b2435f6a575300',
    txHash: '0xf31ab04d9ccdb93262a4349afabd68326db0d61452c06259ed8ea91bc09ca295',
    senderTxHash: '0x1b7c0f2fc7548056e90d9690e8c397acf99eb38e622ac91ee22c2085065f8a55',
    feePayerSignatures: [ 
        [ 
            '0x4e44',
            '0xf68d2c65563baee7a76d5f75aaadbfecf4ae3f55b349013f740159edd38465d9',
            '0x5146c0bbe998a7ba6e7c8f5aef7eb5fea0b4b7429713d65e38b2435f6a575300' 
        ] 
    ] 
}

// signTransaction không có khóa riêng tư của người trả phí
> caver.klay.tài khoảns.signTransaction({
    senderRawTransaction: '0x09f886819a8505d21dba00830dbba094d05c5926b0a2f31aadcc9a9cbd3868a50104d834019476d1cc1cdb081de8627cab2c074f02ebc7bce0d0f847f845820fe9a0c5ea5b57f460bbc76101bafa2ed16228af0c0094d31a8a799e430278b4360724a0240afd7cf426e6aababdc59a3935b97aac4e059b59ba85ccedc75c95168abcfb80c4c3018080',
    feePayer: '0x6e75945404daa4130a338af01199244b1eae2a0b'
}).then(console.log)
{ 
    messageHash: '0xec121b6f7e2925166bcb1e6f14fd0b078f1168b6feca9340db7bd31998d14043',
    v: '0x4e44',
    r: '0xf68d2c65563baee7a76d5f75aaadbfecf4ae3f55b349013f740159edd38465d9',
    s: '0x5146c0bbe998a7ba6e7c8f5aef7eb5fea0b4b7429713d65e38b2435f6a575300',
    rawTransaction: '0x09f8de819a8505d21dba00830dbba094d05c5926b0a2f31aadcc9a9cbd3868a50104d834019476d1cc1cdb081de8627cab2c074f02ebc7bce0d0f847f845820fe9a0c5ea5b57f460bbc76101bafa2ed16228af0c0094d31a8a799e430278b4360724a0240afd7cf426e6aababdc59a3935b97aac4e059b59ba85ccedc75c95168abcfb946e75945404daa4130a338af01199244b1eae2a0bf847f845824e44a0f68d2c65563baee7a76d5f75aaadbfecf4ae3f55b349013f740159edd38465d9a05146c0bbe998a7ba6e7c8f5aef7eb5fea0b4b7429713d65e38b2435f6a575300',
    txHash: '0xf31ab04d9ccdb93262a4349afabd68326db0d61452c06259ed8ea91bc09ca295',
    senderTxHash: '0x1b7c0f2fc7548056e90d9690e8c397acf99eb38e622ac91ee22c2085065f8a55',
    feePayerSignatures: [ 
        [ 
            '0x4e44',
            '0xf68d2c65563baee7a76d5f75aaadbfecf4ae3f55b349013f740159edd38465d9',
            '0x5146c0bbe998a7ba6e7c8f5aef7eb5fea0b4b7429713d65e38b2435f6a575300' 
        ] 
    ] 
}
```

## signTransactionWithHash <a id="signtransactionwithhash"></a>

```javascript
caver.klay.tài khoảns.signTransactionWithHash(txHash, privateKeys [, chainId] [, callback])
```

Ký một giao dịch Klaytn với hàm băm giao dịch đã cho và khóa riêng tư.

**LƯU Ý** `caver.klay.tài khoảns.signTransactionWithHash` được hỗ trợ kể từ caver-js [v1.3.2-rc.2](https://www.npmjs.com/package/caver-js/v/1.3.2-rc.2).

**Tham số**

| Tên         | type              | Mô tả                                                                                                                                                           |
| ----------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| txHash      | Chuỗi             | Hàm băm của giao dịch cần ký.                                                                                                                                   |
| privateKeys | Chuỗi \| Mảng | Khóa riêng tư dùng để ký.                                                                                                                                       |
| chainId     | Chuỗi \| Số   | (tùy chọn) chainId của chuỗi. Nếu bị bỏ qua, giá trị này sẽ được caver-js thiết lập bằng cách gọi ra [caver.klay.getChainId](./caver.klay/config.md#getchainid) |
| callback    | Hàm               | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai.                                                  |

**Giá trị trả về**

`Promise` trả về `Mảng`: Một mảng chữ ký

Mỗi đối tượng chữ ký trong mảng có các giá trị sau:
| Tên | Loại | Mô tả               |
| --- | ----- | ------------------- |
| V   | Chuỗi | Mã khôi phục ECDSA. |
| R   | Chuỗi | Chữ ký ECDSA r.     |
| S   | Chuỗi | Chữ ký ECDSA s.     |

**Ví dụ**

```javascript
// ký giao dịch với khóa riêng tư và id chuỗi
> caver.klay.tài khoảns.signTransactionWithHash('0x583d887614e1ce674c05fcd050a661f0631c23ed1f95fa43fefcc25e6383bca1', '0x{priavte key}', '0x3e9').then(console.log)
[
    {
        V: '0x07f5',
        R: '0x66eb2dbb90295b7541de72f2d34002bac3f00a94501453b310b25a0da62446a5',
        S: '0x1c7c3aefabc042b055489f5b899df55439fe1851858d61e8eb6c4b44be35c227'
    }
]

// ký giao dịch với khóa riêng tư
> caver.klay.tài khoảns.signTransactionWithHash('0x583d887614e1ce674c05fcd050a661f0631c23ed1f95fa43fefcc25e6383bca1', '0x{priavte key}').then(console.log)
[
    {
        V: '0x07f5',
        R: '0x66eb2dbb90295b7541de72f2d34002bac3f00a94501453b310b25a0da62446a5',
        S: '0x1c7c3aefabc042b055489f5b899df55439fe1851858d61e8eb6c4b44be35c227'
    }
]

// ký giao dịch với nhiều khóa riêng tư và id chuỗi
> caver.klay.tài khoảns.signTransactionWithHash('0x583d887614e1ce674c05fcd050a661f0631c23ed1f95fa43fefcc25e6383bca1', ['0x{priavte key}', '0x{priavte key}'], '0x3e9').then(console.log)
[
    {
        V: '0x07f5',
        R: '0x66eb2dbb90295b7541de72f2d34002bac3f00a94501453b310b25a0da62446a5',
        S: '0x1c7c3aefabc042b055489f5b899df55439fe1851858d61e8eb6c4b44be35c227'
    },
    {
        V: '0x07f6',
        R: '0x946ce0288ee98b56160fadae8ec38e36828cf764f897f68f93157a2dc286d4aa',
        S: '0x049ab3f5e91cec831124bdb10782e38de3a02a803ca2dd61a50da81cf5c4f8ef'
    }
]

// ký giao dịch với nhiều khóa riêng tư
> caver.klay.tài khoảns.signTransactionWithHash('0x583d887614e1ce674c05fcd050a661f0631c23ed1f95fa43fefcc25e6383bca1', ['0x{priavte key}', '0x{priavte key}']).then(console.log)
[
    {
        V: '0x07f5',
        R: '0x66eb2dbb90295b7541de72f2d34002bac3f00a94501453b310b25a0da62446a5',
        S: '0x1c7c3aefabc042b055489f5b899df55439fe1851858d61e8eb6c4b44be35c227'
    },
    {
        V: '0x07f6',
        R: '0x946ce0288ee98b56160fadae8ec38e36828cf764f897f68f93157a2dc286d4aa',
        S: '0x049ab3f5e91cec831124bdb10782e38de3a02a803ca2dd61a50da81cf5c4f8ef'
    }
]
```

## feePayerSignTransaction <a id="feepayersigntransaction"></a>

```javascript
caver.klay.tài khoảns.feePayerSignTransaction(tx, feePayerAddress [, privateKey] [, callback])
```

Ký một giao dịch với tư cách là người trả phí.

Người trả phí có thể ký vào FEE_DELEGATED_ transaction. Đối tượng giao dịch hoặc giao dịch được mã hóa RLP có thể được chuyển thành đối số.

Nếu privateKay không được cung cấp, thì feePayerKey của tài khoản của người trả phí bên trong ví trong bộ nhớ caver-js sẽ được sử dụng.

feePayerSignTransaction giữ các chữ ký/feePayerSignatures hiện có trong giao dịch đầu vào và thêm (các) chữ ký của người trả phí vào giao dịch đó.

Xem [Gửi Giao dịch có nhiều người ký](../get-started-1.4.1.md#sending-a-transaction-with-multiple-signer) để biết cách kết hợp chữ ký của nhiều người dùng thành một rawTransaction duy nhất.

**Lưu ý** `caver.klay.tài khoảns.feePayerSignTransaction` được hỗ trợ kể từ caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**Tham số**


| Tên             | type                   | Mô tả                                                                                                                                                                                                                                                                                  |
| --------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tx              | Chuỗi \| Đối tượng | Đối tượng giao dịch hoặc chuỗi giao dịch được mã hóa RLP (rawTransaction). Các thuộc tính của một đối tượng giao dịch khác nhau tùy thuộc vào loại giao dịch. Để biết mô tả về từng loại giao dịch, hãy xem [caver.klay.sendTransaction](./caver.klay/transaction/transaction.md#sendtransaction). |
| feePayerAddress | Chuỗi                  | Địa chỉ của người trả phí.                                                                                                                                                                                                                                                             |
| privateKey      | Chuỗi \| Mảng      | (tùy chọn) Khóa riêng tư dùng để ký.                                                                                                                                                                                                                                                   |
| callback        | Hàm                    | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai.                                                                                                                                                                         |

**Giá trị trả về**

`Promise` trả về `Đối tượng`: Giao dịch đã ký được mã hóa RLP. Các thuộc tính đối tượng như sau:

| Tên                | Loại         | Mô tả                                                                                                                                 |
| ------------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| messageHash        | Chuỗi         | Hàm băm của thông báo đã cho.                                                                                                         |
| v                  | Chuỗi         | Mã khôi phục ECDSA.                                                                                                                   |
| r                  | Chuỗi         | Chữ ký ECDSA r.                                                                                                                       |
| s                  | Chuỗi         | Chữ ký ECDSA s.                                                                                                                       |
| rawTransaction     | Chuỗi         | Giao dịch được mã hóa RLP, sẵn sàng được gửi bằng cách sử dụng caver.klay.sendSignedTransaction.                                      |
| txHash             | Chuỗi 32 byte | Hàm băm của giao dịch.                                                                                                                |
| senderTxHash       | Chuỗi 32 byte | Hàm băm của một giao dịch chỉ được người gửi ký. Xem [SenderTxHash](../../../../learn/transactions/transactions.md#sendertxhash) |
| feePayerSignatures | Mảng          | Một mảng (các) chữ ký của người trả phí.                                                                                              |

**LƯU Ý** `txHash` và `senderTxHash` trong đối tượng kết quả có thể không phải là giá trị cuối cùng. Nếu chữ ký của người gửi khác được thêm vào, txHash và người gửiTxHash sẽ thay đổi. Nếu chữ ký của người trả phí được thêm vào, txHash sẽ thay đổi.

**Ví dụ**

```javascript
// feePayerSignTransaction với đối tượng giao dịch
> caver.klay.tài khoảns.feePayerSignTransaction({
    type: 'FEE_DELEGATED_VALUE_TRANSFER',
    from: '0x9230c09295dd8b9c02b6ae138ffe3133b58b25c1',
    to: '0x715139255d5e300b431722ec9666ac2350cbf523',
    value: 1,
    gas: 900000,
}, '0x2e4351e950d8d43444ac789cc9e87ba35340ad52', '0x90300d268bb2bad69f5b24e2ac1409a9416cc814254b356ce96b3f75c4364716').then(console.log)
{
    messageHash: '0x4cc0a423199d374d412cd3f92777a8f82bfc47b701d0df1f82b0d932802c955e',
    v: '0x4e44',
    r: '0x2a2cdce5dd2fea8e717f94457700ca9cfa43fd5b09b57b1c8dc9cd2e73ac2730',
    s: '0x4fdf1e4483f8c07c5ea180eea1af11fcd7fc32f6b6dded39eb8cb4a1f2e9f5a7',
    rawTransaction: '0x09f899808505d21dba00830dbba094715139255d5e300b431722ec9666ac2350cbf52301949230c09295dd8b9c02b6ae138ffe3133b58b25c1c4c3018080942e4351e950d8d43444ac789cc9e87ba35340ad52f847f845824e44a02a2cdce5dd2fea8e717f94457700ca9cfa43fd5b09b57b1c8dc9cd2e73ac2730a04fdf1e4483f8c07c5ea180eea1af11fcd7fc32f6b6dded39eb8cb4a1f2e9f5a7',
    txHash: '0xead2cdf961090d014044de7ac78e3f9522b430edcd0ea4d3299811464ed636ea',
    senderTxHash: '0x5e0bfce81dca4d6ec5ebeaff8a55fe5dd6d77e6292ee0548c12d7a7aaaff1300',
    feePayerSignatures: [
        [
            '0x4e44',
            '0x2a2cdce5dd2fea8e717f94457700ca9cfa43fd5b09b57b1c8dc9cd2e73ac2730',
            '0x4fdf1e4483f8c07c5ea180eea1af11fcd7fc32f6b6dded39eb8cb4a1f2e9f5a7'
        ]
    ]
}

// feePayerSignTransaction với đối tượng giao dịch xác định chữ ký
// rawTransaction in result will include signatures
> caver.klay.tài khoảns.feePayerSignTransaction({
    type: 'FEE_DELEGATED_VALUE_TRANSFER',
    from: '0x9230c09295dd8b9c02b6ae138ffe3133b58b25c1',
    to: '0x715139255d5e300b431722ec9666ac2350cbf523',
    value: 1,
    gas: 900000,
    signatures: [['0x4e44', '0xd31041fe47da32fe03cf644186f50f39beaa969f73deb189d1a51706715215ec', '0x335961d9b38027a01d6b97842c036725a8d4781b5010c47ddb85756687c2def9']]
}, '0x2e4351e950d8d43444ac789cc9e87ba35340ad52', '0x90300d268bb2bad69f5b24e2ac1409a9416cc814254b356ce96b3f75c4364716').then(console.log)
{
    messageHash: '0x4cc0a423199d374d412cd3f92777a8f82bfc47b701d0df1f82b0d932802c955e',
    v: '0x4e44',
    r: '0x2a2cdce5dd2fea8e717f94457700ca9cfa43fd5b09b57b1c8dc9cd2e73ac2730',
    s: '0x4fdf1e4483f8c07c5ea180eea1af11fcd7fc32f6b6dded39eb8cb4a1f2e9f5a7',
    rawTransaction: '0x09f8dd808505d21dba00830dbba094715139255d5e300b431722ec9666ac2350cbf52301949230c09295dd8b9c02b6ae138ffe3133b58b25c1f847f845824e44a0d31041fe47da32fe03cf644186f50f39beaa969f73deb189d1a51706715215eca0335961d9b38027a01d6b97842c036725a8d4781b5010c47ddb85756687c2def9942e4351e950d8d43444ac789cc9e87ba35340ad52f847f845824e44a02a2cdce5dd2fea8e717f94457700ca9cfa43fd5b09b57b1c8dc9cd2e73ac2730a04fdf1e4483f8c07c5ea180eea1af11fcd7fc32f6b6dded39eb8cb4a1f2e9f5a7',
    txHash: '0x19006aa7228aa50000bab00ecccde8232516b8e1dce6835528d57561a79b5d3d',
    senderTxHash: '0x7aa6d0b4146020ae38c07c2c9efc26030bd667b9256981379b8cbc86acfd5b27',
    feePayerSignatures: [
        [
            '0x4e44',
            '0x2a2cdce5dd2fea8e717f94457700ca9cfa43fd5b09b57b1c8dc9cd2e73ac2730',
            '0x4fdf1e4483f8c07c5ea180eea1af11fcd7fc32f6b6dded39eb8cb4a1f2e9f5a7'
        ]
    ]
}

// feePayerSignTransaction với đối tượng giao dịch xác định phíPayerSignatures
> caver.klay.tài khoảns.feePayerSignTransaction({
    type: 'FEE_DELEGATED_VALUE_TRANSFER',
    from: '0x9230c09295dd8b9c02b6ae138ffe3133b58b25c1',
    to: '0x715139255d5e300b431722ec9666ac2350cbf523',
    value: 1,
    gas: 900000,
    feePayerSignatures: [['0x4e44', '0x2a2cdce5dd2fea8e717f94457700ca9cfa43fd5b09b57b1c8dc9cd2e73ac2730', '0x4fdf1e4483f8c07c5ea180eea1af11fcd7fc32f6b6dded39eb8cb4a1f2e9f5a7']]
}, '0x2e4351e950d8d43444ac789cc9e87ba35340ad52', ['0xa39599bb66c9f2346f789398d72232e9f218a0ec37e7bcf61cf40e52d860e3f7', '0x8d4c1ffd743faefc711e72f17ff370419ece777c6be2e6a84ac1986806fd57ea']).then(console.log)
{
    messageHash: '0x4cc0a423199d374d412cd3f92777a8f82bfc47b701d0df1f82b0d932802c955e',
    v: '0x4e44',
    r: '0x2a2cdce5dd2fea8e717f94457700ca9cfa43fd5b09b57b1c8dc9cd2e73ac2730',
    s: '0x4fdf1e4483f8c07c5ea180eea1af11fcd7fc32f6b6dded39eb8cb4a1f2e9f5a7',
    rawTransaction: '0x09f90127808505d21dba00830dbba094715139255d5e300b431722ec9666ac2350cbf52301949230c09295dd8b9c02b6ae138ffe3133b58b25c1c4c3018080942e4351e950d8d43444ac789cc9e87ba35340ad52f8d5f845824e44a02a2cdce5dd2fea8e717f94457700ca9cfa43fd5b09b57b1c8dc9cd2e73ac2730a04fdf1e4483f8c07c5ea180eea1af11fcd7fc32f6b6dded39eb8cb4a1f2e9f5a7f845824e44a0ec9ab57810b1f02960f2150b7931aefde5d8df9333b436ff11bc9666783358e3a055602d262c0b0ead09359ab0f00138dd7b5754d02694b4ee118bc99c9d8c44adf845824e44a030afe3d18d5a9e2b54d30326de856dbf9cf797e7ade2317d53675913129f863ca0711ab4c6cd60935c0b633679aac55f58443becd4194317f69746d2e829ad881c',
    txHash: '0x2226428e0ca7221ba091d34efbb6e1575e90affc3901550850b479fbfe00f084',
    senderTxHash: '0x5e0bfce81dca4d6ec5ebeaff8a55fe5dd6d77e6292ee0548c12d7a7aaaff1300',
    feePayerSignatures: [
        [
            '0x4e44',
            '0x2a2cdce5dd2fea8e717f94457700ca9cfa43fd5b09b57b1c8dc9cd2e73ac2730',
            '0x4fdf1e4483f8c07c5ea180eea1af11fcd7fc32f6b6dded39eb8cb4a1f2e9f5a7'
        ],
        [
            '0x4e44',
            '0xec9ab57810b1f02960f2150b7931aefde5d8df9333b436ff11bc9666783358e3',
            '0x55602d262c0b0ead09359ab0f00138dd7b5754d02694b4ee118bc99c9d8c44ad'
        ],
        [
            '0x4e44',
            '0x30afe3d18d5a9e2b54d30326de856dbf9cf797e7ade2317d53675913129f863c',
            '0x711ab4c6cd60935c0b633679aac55f58443becd4194317f69746d2e829ad881c'
        ]
    ]
}

// feePayerSignTransaction với chuỗi giao dịch được mã hóa RLP (rawTransaction)
> caver.klay.tài khoảns.feePayerSignTransaction('0x09f885808505d21dba00830dbba094715139255d5e300b431722ec9666ac2350cbf52301949230c09295dd8b9c02b6ae138ffe3133b58b25c1f847f845824e44a0d31041fe47da32fe03cf644186f50f39beaa969f73deb189d1a51706715215eca0335961d9b38027a01d6b97842c036725a8d4781b5010c47ddb85756687c2def980c4c3018080', '0x2e4351e950d8d43444ac789cc9e87ba35340ad52', '0x90300d268bb2bad69f5b24e2ac1409a9416cc814254b356ce96b3f75c4364716').then(console.log)
{
    messageHash: '0x4cc0a423199d374d412cd3f92777a8f82bfc47b701d0df1f82b0d932802c955e',
    v: '0x4e44',
    r: '0x2a2cdce5dd2fea8e717f94457700ca9cfa43fd5b09b57b1c8dc9cd2e73ac2730',
    s: '0x4fdf1e4483f8c07c5ea180eea1af11fcd7fc32f6b6dded39eb8cb4a1f2e9f5a7',
    rawTransaction: '0x09f8dd808505d21dba00830dbba094715139255d5e300b431722ec9666ac2350cbf52301949230c09295dd8b9c02b6ae138ffe3133b58b25c1f847f845824e44a0d31041fe47da32fe03cf644186f50f39beaa969f73deb189d1a51706715215eca0335961d9b38027a01d6b97842c036725a8d4781b5010c47ddb85756687c2def9942e4351e950d8d43444ac789cc9e87ba35340ad52f847f845824e44a02a2cdce5dd2fea8e717f94457700ca9cfa43fd5b09b57b1c8dc9cd2e73ac2730a04fdf1e4483f8c07c5ea180eea1af11fcd7fc32f6b6dded39eb8cb4a1f2e9f5a7',
    txHash: '0x19006aa7228aa50000bab00ecccde8232516b8e1dce6835528d57561a79b5d3d',
    senderTxHash: '0x7aa6d0b4146020ae38c07c2c9efc26030bd667b9256981379b8cbc86acfd5b27',
    feePayerSignatures: [
        [
            '0x4e44',
            '0x2a2cdce5dd2fea8e717f94457700ca9cfa43fd5b09b57b1c8dc9cd2e73ac2730',
            '0x4fdf1e4483f8c07c5ea180eea1af11fcd7fc32f6b6dded39eb8cb4a1f2e9f5a7'
        ]
    ]
}
```

## recoverTransaction <a id="recovertransaction"></a>

```javascript
caver.klay.tài khoảns.recoverTransaction(rawTransaction)
```
Khôi phục địa chỉ Klaytn đã được sử dụng để ký giao dịch được mã hóa RLP đã cho.

**Tham số**

| Tên    | Loại | Mô tả                      |
| ------ | ----- | -------------------------- |
| chữ ký | Chuỗi | Giao dịch được mã hóa RLP. |

**Giá trị trả về**

| Loại | Mô tả                                            |
| ----- | ------------------------------------------------ |
| Chuỗi | Địa chỉ Klaytn được sử dụng để ký giao dịch này. |

**Ví dụ**

```js
> caver.klay.tài khoảns.recoverTransaction('0xf86180808401ef364594f0109fc8df283027b6285cc889f5aa624eac1f5580801ca031573280d608f75137e33fc14655f097867d691d5c4c44ebe5ae186070ac3d5ea0524410802cdc025034daefcdfa08e7d2ee3f0b9d9ae184b2001fe0aff07603d9');
'0xF0109fC8DF283027b6285cc889F5aA624EaC1F55'
```


## hashMessage <a id="hashmessage"></a>

```javascript
caver.klay.tài khoảns.hashMessage(message)
```

Hàm băm thông báo đã cho để chuyển thông báo đó đến [caver.klay.tài khoảns.recover](#recover). Dữ liệu sẽ được giải mã UTF-8 HEX và được bọc như sau:
```
"\x19Klaytn Signed Message:\n" + message.length + message
```
và hàm băm bằng keccak256.

**Tham số**

| Tên       | Loại | Mô tả                                                                    |
| --------- | ----- | ------------------------------------------------------------------------ |
| thông báo | Chuỗi | Thông báo hàm băm.  Nếu là chuỗi số HEX, nó sẽ được giải mã UTF-8 trước. |


**Giá trị trả về**

| Loại | Mô tả             |
| ----- | ----------------- |
| Chuỗi | Thông báo hàm băm |


**Ví dụ**

```javascript
> caver.klay.tài khoảns.hashMessage("Hello World")
'0xf334bf277b674260e85f1a3d2565d76463d63d29549ef4fa6d6833207576b5ba'

// các kết quả dưới đây trong cùng một hàm băm
> caver.klay.tài khoảns.hashMessage(caver.utils.utf8ToHex("Hello World"))
'0xf334bf277b674260e85f1a3d2565d76463d63d29549ef4fa6d6833207576b5ba'
```


## ký <a id="sign"></a>

```javascript
caver.klay.tài khoảns.sign(data, privateKey)
```
Ký dữ liệu tùy ý. Dữ liệu này trước khi UTF-8 HEX được giải mã và được bọc như sau:
```
"\x19Klaytn Signed Message:\n" + message.length + message
```

**Tham số**

| Tên        | Loại | Mô tả                     |
| ---------- | ----- | ------------------------- |
| data       | Chuỗi | Các dữ liệu để ký.        |
| privateKey | Chuỗi | Khóa riêng tư dùng để ký. |


**Giá trị trả về**

`Chuỗi|Đối tượng`: Chữ ký mã hóa RLP dữ liệu đã ký. Các giá trị chữ ký như sau:

| Tên         | Loại | Mô tả                         |
| ----------- | ----- | ----------------------------- |
| thông báo   | Chuỗi | Thông điệp đã cho.            |
| messageHash | Chuỗi | Hàm băm của thông báo đã cho. |
| r           | Chuỗi | Chữ ký ECDSA r.               |
| s           | Chuỗi | Chữ ký ECDSA s.               |
| v           | Chuỗi | Mã khôi phục ECDSA.           |
| chữ ký      | Chuỗi | Chữ ký được tạo.              |


**Ví dụ**

```javascript
> caver.klay.tài khoảns.sign('Some data', '0x{private key}');
{
    message: 'Some data',
    messageHash: '0x8ed2036502ed7f485b81feaec1c581d236a8b711e55a24077724879c8a263c2a',
    v: '0x1b',
    r: '0x4a57bcff1637346a4323a67acd7a478514d9f00576f42942d50a5ca0e4b0342b',
    s: '0x5914e19a8ebc10ce1450b00a3b9c1bf0ce01909bca3ffdead1aa3a791a97b5ac',
    signature: '0x4a57bcff1637346a4323a67acd7a478514d9f00576f42942d50a5ca0e4b0342b5914e19a8ebc10ce1450b00a3b9c1bf0ce01909bca3ffdead1aa3a791a97b5ac1b'
}
```


## khôi phục <a id="recover"></a>

```javascript
caver.klay.tài khoảns.recover(signatureĐối tượng)
caver.klay.tài khoảns.recover(message, signature [, preFixed])
caver.klay.tài khoảns.recover(message, v, r, s [, preFixed])
```
Khôi phục địa chỉ Klaytn đã được sử dụng để ký dữ liệu đã cho.

**Tham số**

| Tên                              | Loại                  | Mô tả                                                                                                                                                                                                      |
| -------------------------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| thông báo \| signatureObject | Chuỗi \| Đối tượng | Thông báo đã ký hoặc hàm băm. Để biết thông tin chi tiết về đối tượng chữ ký, hãy xem bảng bên dưới.                                                                                                       |
| messageHash                      | Chuỗi                  | Hàm băm của thông báo đã cho.                                                                                                                                                                              |
| chữ ký                           | Chuỗi                  | Chữ ký được mã hóa RLP thô, HOẶC tham số 2-4 dưới dạng giá trị v, r, s.                                                                                                                                    |
| preFixed                         | Boolean                | (tùy chọn, mặc định: `false`) Nếu tham số cuối cùng là `true`, thông báo đã cho sẽ KHÔNG tự động có tiền tố là `"\x19Klaytn Signed Message:\n" + message.length + message` và được cho là đã có tiền tố. |

Đối tượng chữ ký có các giá trị sau:

| Tên         | Loại | Mô tả                                                                                                        |
| ----------- | ----- | ------------------------------------------------------------------------------------------------------------ |
| messageHash | Chuỗi | Hàm băm của thông báo đã cho đã có tiền tố là `"\x19Klaytn Signed Message:\n" + message.length + message`. |
| r           | Chuỗi | Chữ ký ECDSA r.                                                                                              |
| s           | Chuỗi | Chữ ký ECDSA s.                                                                                              |
| v           | Chuỗi | Mã khôi phục ECDSA.                                                                                          |


**Giá trị trả về**

| type  | Mô tả                                          |
| ----- | ---------------------------------------------- |
| Chuỗi | Địa chỉ Klaytn được sử dụng để ký dữ liệu này. |


**Ví dụ**

```javascript
> caver.klay.tài khoảns.recover({
      messageHash: '0x8ed2036502ed7f485b81feaec1c581d236a8b711e55a24077724879c8a263c2a',
      v: '0x1b',
      r: '0x4a57bcff1637346a4323a67acd7a478514d9f00576f42942d50a5ca0e4b0342b',
      s: '0x5914e19a8ebc10ce1450b00a3b9c1bf0ce01909bca3ffdead1aa3a791a97b5ac',
  })
'0x2c7536E3605D9C16a7a3D7b1898e529396a65c23'

// thông báo, chữ ký
> caver.klay.tài khoảns.recover('Some data', '0x4a57bcff1637346a4323a67acd7a478514d9f00576f42942d50a5ca0e4b0342b5914e19a8ebc10ce1450b00a3b9c1bf0ce01909bca3ffdead1aa3a791a97b5ac1b');
'0x2c7536E3605D9C16a7a3D7b1898e529396a65c23'

// thông báo, v, r, s
> caver.klay.tài khoảns.recover('Some data', '0x1b', '0x4a57bcff1637346a4323a67acd7a478514d9f00576f42942d50a5ca0e4b0342b', '0x5914e19a8ebc10ce1450b00a3b9c1bf0ce01909bca3ffdead1aa3a791a97b5ac');
'0x2c7536E3605D9C16a7a3D7b1898e529396a65c23'
```

## combineSignatures <a id="combinesignatures"></a>

```javascript
caver.klay.tài khoảns.combineSignatures(rawTransactions)
```

Kết hợp mảng các chuỗi giao dịch được mã hóa RLP thành một chuỗi giao dịch được mã hóa RLP duy nhất. Tất cả chuỗi giao dịch được mã hóa RLP mà bạn muốn kết hợp đều phải ký cùng một giao dịch.

combineSignatures loại bỏ các bản sao trong chữ ký hoặc feePayerSignatures.

**Lưu ý** `caver.klay.tài khoảns.combineSignatures` được hỗ trợ kể từ caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**Tham số**

| Tên            | Loại | Mô tả                                                          |
| -------------- | ----- | -------------------------------------------------------------- |
| rawTransaction | Mảng  | Một mảng các chuỗi giao dịch được mã hóa RLP (rawTransaction). |

**Giá trị trả về**

`Promise` trả về `Đối tượng`: Một giao dịch được mã hóa RLP. Các thuộc tính đối tượng như sau:

| Tên                | Loại         | Mô tả                                                                                                                                                                                                             |
| ------------------ | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rawTransaction     | Chuỗi         | Giao dịch được mã hóa RLP, sẵn sàng được gửi bằng cách sử dụng caver.klay.sendSignedTransaction.                                                                                                                  |
| txHash             | Chuỗi 32 byte | Hàm băm của giao dịch.                                                                                                                                                                                            |
| senderTxHash       | Chuỗi 32 byte | Hàm băm của một giao dịch chỉ được người gửi ký. Xem [SenderTxHash](../../../../learn/transactions/transactions.md#sendertxhash)                                                                             |
| chữ ký             | Mảng          | (tùy chọn) Tất cả các chữ ký trong giao dịch được mã hóa RLP kết hợp (rawTransaction). Nếu không có chữ ký, thuộc tính `signatures` sẽ không được trả về trong đối tượng kết quả.                                 |
| feePayerSignatures | Mảng          | (tùy chọn) Tất cả các feePayerSignatures trong giao dịch được mã hóa RLP kết hợp (rawTransaction). Nếu không có feePayerSignatures, thuộc tính `feePayerSignatures` sẽ không được trả về trong đối tượng kết quả. |

**LƯU Ý** `txHash` và `senderTxHash` trong đối tượng kết quả có thể không phải là giá trị cuối cùng. Nếu chữ ký của người gửi khác được thêm vào, txHash và người gửiTxHash sẽ thay đổi. Nếu chữ ký của người trả phí được thêm vào, txHash sẽ thay đổi.

**Ví dụ**

```javascript
> caver.klay.tài khoảns.combineSignatures([
    '0x39f8b6128505d21dba00830dbba094596c3b874dc5775c3969b09a3115f453c20a59abf88ef845824e44a0f530749561d1cf87571b2c3050ded6acc94621eb984335129f4057e843109e30a0738aef5227c29c022167d9e95f4090b9a49ef550d5deaaa25c1f6298ea3a5292f845824e43a01fa5a80bb06f5787b1ac81d8b48578627be7a3b725d2e3722a85b0e31f71a445a003dff23bb2947d1819ec91eb695e8bc8b96bc591a2b855fa1495f5bbf896b91780c4c3018080',
    '0x39f90155128505d21dba00830dbba094596c3b874dc5775c3969b09a3115f453c20a59abf88ef845824e44a0f530749561d1cf87571b2c3050ded6acc94621eb984335129f4057e843109e30a0738aef5227c29c022167d9e95f4090b9a49ef550d5deaaa25c1f6298ea3a5292f845824e44a06a28576af9368a2056ba61d21390f484b487eba2210ee99b76615441a78f375da05d39f38e05d2ea80c2c1150374ca77d46b119d040101ebfc593f2a1963da409694120d8dc88b44fd8aa4dfab82c4078c7a7ee6c1edf88ef845824e44a00ca8405f35535cf82105a0596fcbd5c4cf228ce0d269c760246f9e10d6820566a02f905e44a2db94fe985158f81979cbcb7ba138cb1f2fb82bc9bd043701ec2025f845824e44a0feb42d7ed1519f93ddbc3093834934c6c7a15d843dfc8e7d14f78ecf3aa1d848a0271a2e8caf98d6ab79f9f4f6fdbe1c01e85aeea503b350ec69c6580320d53b06',
]).then(console.log)
{
    rawTransaction: '0x39f9019c128505d21dba00830dbba094596c3b874dc5775c3969b09a3115f453c20a59abf8d5f845824e44a0f530749561d1cf87571b2c3050ded6acc94621eb984335129f4057e843109e30a0738aef5227c29c022167d9e95f4090b9a49ef550d5deaaa25c1f6298ea3a5292f845824e43a01fa5a80bb06f5787b1ac81d8b48578627be7a3b725d2e3722a85b0e31f71a445a003dff23bb2947d1819ec91eb695e8bc8b96bc591a2b855fa1495f5bbf896b917f845824e44a06a28576af9368a2056ba61d21390f484b487eba2210ee99b76615441a78f375da05d39f38e05d2ea80c2c1150374ca77d46b119d040101ebfc593f2a1963da409694120d8dc88b44fd8aa4dfab82c4078c7a7ee6c1edf88ef845824e44a00ca8405f35535cf82105a0596fcbd5c4cf228ce0d269c760246f9e10d6820566a02f905e44a2db94fe985158f81979cbcb7ba138cb1f2fb82bc9bd043701ec2025f845824e44a0feb42d7ed1519f93ddbc3093834934c6c7a15d843dfc8e7d14f78ecf3aa1d848a0271a2e8caf98d6ab79f9f4f6fdbe1c01e85aeea503b350ec69c6580320d53b06',
    txHash: '0x3dac67978ffca834e6ff188e5937d81daab0669a7871f6ffae4ede53fb2a20ac',
    senderTxHash: '0xbb29f73faca65b39b1d33d94e23343f48f22a05531989d031f557460b08f27d4',
    signatures: [
        [
            '0x4e44',
            '0xf530749561d1cf87571b2c3050ded6acc94621eb984335129f4057e843109e30',
            '0x738aef5227c29c022167d9e95f4090b9a49ef550d5deaaa25c1f6298ea3a5292',
        ],
        [
            '0x4e43',
            '0x1fa5a80bb06f5787b1ac81d8b48578627be7a3b725d2e3722a85b0e31f71a445',
            '0x03dff23bb2947d1819ec91eb695e8bc8b96bc591a2b855fa1495f5bbf896b917',
        ],
        [
            '0x4e44',
            '0x6a28576af9368a2056ba61d21390f484b487eba2210ee99b76615441a78f375d',
            '0x5d39f38e05d2ea80c2c1150374ca77d46b119d040101ebfc593f2a1963da4096',
        ],
    ],
    feePayerSignatures: [
        [
            '0x4e44',
            '0x0ca8405f35535cf82105a0596fcbd5c4cf228ce0d269c760246f9e10d6820566',
            '0x2f905e44a2db94fe985158f81979cbcb7ba138cb1f2fb82bc9bd043701ec2025',
        ],
        [
            '0x4e44',
            '0xfeb42d7ed1519f93ddbc3093834934c6c7a15d843dfc8e7d14f78ecf3aa1d848',
            '0x271a2e8caf98d6ab79f9f4f6fdbe1c01e85aeea503b350ec69c6580320d53b06',
        ],
    ],
}
```

## getRawTransactionWithSignatures <a id="getrawtransactionwithsignatures"></a>

```javascript
caver.klay.tài khoảns.getRawTransactionWithSignatures(tx [, callback])
```

Trả về chuỗi giao dịch được mã hóa RLP đã ký từ một đối tượng giao dịch nhất định. Đối tượng giao dịch phải cung cấp chữ ký và feePayerSignatures.

**Lưu ý** `caver.klay.tài khoảns.getRawTransactionWithSignatures` được hỗ trợ kể từ caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**Tham số**

| Tên | Loại     | Mô tả                                                                                                                                                                                                                                                                     |
| --- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tx  | Đối tượng | Một đối tượng giao dịch bao gồm chữ ký và feePayerSignatures. Các thuộc tính của một đối tượng giao dịch khác nhau tùy thuộc vào loại giao dịch. Để biết mô tả về từng loại giao dịch, hãy xem [caver.klay.sendTransaction](./caver.klay/transaction/transaction.md#sendtransaction). |

**Giá trị trả về**

`Promise` trả về `Đối tượng`: Một giao dịch được mã hóa RLP. Các thuộc tính đối tượng như sau:

| Tên                | Loại         | Mô tả                                                                                                                                                                                                     |
| ------------------ | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rawTransaction     | Chuỗi         | Giao dịch được mã hóa RLP, sẵn sàng được gửi bằng cách sử dụng caver.klay.sendSignedTransaction.                                                                                                          |
| txHash             | Chuỗi 32 byte | Hàm băm của giao dịch.                                                                                                                                                                                    |
| senderTxHash       | Chuỗi 32 byte | Hàm băm của một giao dịch chỉ được người gửi ký. Xem [SenderTxHash](../../../../learn/transactions/transactions.md#sendertxhash)                                                                     |
| chữ ký             | Mảng          | (tùy chọn) Tất cả các chữ ký trong giao dịch được mã hóa RLP (rawTransaction). Nếu không có chữ ký, thuộc tính `signatures` sẽ không được trả về trong đối tượng kết quả.                                 |
| feePayerSignatures | Mảng          | (tùy chọn) Tất cả các feePayerSignatures trong giao dịch được mã hóa RLP (rawTransaction). Nếu không có feePayerSignatures, thuộc tính `feePayerSignatures` sẽ không được trả về trong đối tượng kết quả. |

**LƯU Ý** `txHash` và `senderTxHash` chứa trong đối tượng kết quả có thể không phải là giá trị cuối cùng. Nếu chữ ký của người gửi được thêm vào, txHash và người gửiTxHash sẽ khác nhau. Nếu chữ ký của người trả phí được thêm vào, txHash sẽ khác.

**Ví dụ**

```javascript
// nhận rawTransaction có chữ ký
> caver.klay.tài khoảns.getRawTransactionWithSignatures({
    type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
    from: '0x85fd20bcbd1dcf73073c0abfa72afbde5e8c9a79',
    to: '0x6757d85d8b636044ef3bd2904daf8883cd2e3381',
    data: '0xd14e62b80000000000000000000000000000000000000000000000000000000000000005',
    gas: '0xdbba0',
    chainId: '0x2710',
    gasPrice: '0x5d21dba00',
    nonce: '0xf',
    humanReadable: false,
    signatures: [
        [
            '0x4e43',
            '0x9610d4f6d6f55e44f5f29f1a08538c9871d39c7295834db5a28b7358cf23a8a6',
            '0x6dc41f04c570a08a20aadc8eb4801aa3ee68b11f280e14d0e458f97f8c708175',
        ],
        [
            '0x4e44',
            '0x35cc2637cd68799f9a71c8e79fb5171351dd3cb5402dc0a3f291728527c9db48',
            '0x7e3ac1ac64094ebc49c41ff6cb57b8f8eae18f5d7f2db0900117d816a1e30594',
        ],
        [
            '0x4e44',
            '0xfc4fe6436212d35a2417e3414119608f626400bd265fba0417f80a7cf9694a20',
            '0x7d0f996f41355b18781833a6e227356db03bcec71d0c16a4d7249eaa3fe89507',
        ],
    ],
}).then(console.log)
{
    rawTransaction: '0x31f901380f8505d21dba00830dbba0946757d85d8b636044ef3bd2904daf8883cd2e3381809485fd20bcbd1dcf73073c0abfa72afbde5e8c9a79a4d14e62b80000000000000000000000000000000000000000000000000000000000000005f8d5f845824e43a09610d4f6d6f55e44f5f29f1a08538c9871d39c7295834db5a28b7358cf23a8a6a06dc41f04c570a08a20aadc8eb4801aa3ee68b11f280e14d0e458f97f8c708175f845824e44a035cc2637cd68799f9a71c8e79fb5171351dd3cb5402dc0a3f291728527c9db48a07e3ac1ac64094ebc49c41ff6cb57b8f8eae18f5d7f2db0900117d816a1e30594f845824e44a0fc4fe6436212d35a2417e3414119608f626400bd265fba0417f80a7cf9694a20a07d0f996f41355b18781833a6e227356db03bcec71d0c16a4d7249eaa3fe8950780c4c3018080',
    txHash: '0x94e6edb47fa258671745a433f1a08f5546b18a634f43e854c2bec1a40a7e8df0',
    senderTxHash: '0xcb1138abbef61a42cc846957b72a27329e80395911593f201f49c70c06408385',
    signatures: [
        [
            '0x4e43',
            '0x9610d4f6d6f55e44f5f29f1a08538c9871d39c7295834db5a28b7358cf23a8a6',
            '0x6dc41f04c570a08a20aadc8eb4801aa3ee68b11f280e14d0e458f97f8c708175',
        ],
        [
            '0x4e44',
            '0x35cc2637cd68799f9a71c8e79fb5171351dd3cb5402dc0a3f291728527c9db48',
            '0x7e3ac1ac64094ebc49c41ff6cb57b8f8eae18f5d7f2db0900117d816a1e30594',
        ],
        [
            '0x4e44',
            '0xfc4fe6436212d35a2417e3414119608f626400bd265fba0417f80a7cf9694a20',
            '0x7d0f996f41355b18781833a6e227356db03bcec71d0c16a4d7249eaa3fe89507',
        ],
    ],
}

// nhận rawTransaction với chữ ký và phíPayerSignatures
> caver.klay.tài khoảns.getRawTransactionWithSignatures({
    type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
    from: '0x85fd20bcbd1dcf73073c0abfa72afbde5e8c9a79',
    to: '0x6757d85d8b636044ef3bd2904daf8883cd2e3381',
    data: '0xd14e62b80000000000000000000000000000000000000000000000000000000000000005',
    gas: '0xdbba0',
    chainId: '0x2710',
    gasPrice: '0x5d21dba00',
    nonce: '0xf',
    humanReadable: false,
    signatures: [
        [
            '0x4e43',
            '0x9610d4f6d6f55e44f5f29f1a08538c9871d39c7295834db5a28b7358cf23a8a6',
            '0x6dc41f04c570a08a20aadc8eb4801aa3ee68b11f280e14d0e458f97f8c708175',
        ],
        [
            '0x4e44',
            '0x35cc2637cd68799f9a71c8e79fb5171351dd3cb5402dc0a3f291728527c9db48',
            '0x7e3ac1ac64094ebc49c41ff6cb57b8f8eae18f5d7f2db0900117d816a1e30594',
        ],
        [
            '0x4e44',
            '0xfc4fe6436212d35a2417e3414119608f626400bd265fba0417f80a7cf9694a20',
            '0x7d0f996f41355b18781833a6e227356db03bcec71d0c16a4d7249eaa3fe89507',
        ],
    ],
    feePayer: '0x918f31cce0d9582882663fe9099226d3912c9d13',
    feePayerSignatures: [
        [
            '0x4e44',
            '0x5991f915a32ad719da138efecdcc3d169ad71fde31eba03be91991681d53f881',
            '0x3653c82d6d99839699c3dfea470fcc777cda5b6185a1678c19d5fd7605c04a97',
        ],
    ],
}).then(console.log)
{
    rawTransaction: '0x31f901900f8505d21dba00830dbba0946757d85d8b636044ef3bd2904daf8883cd2e3381809485fd20bcbd1dcf73073c0abfa72afbde5e8c9a79a4d14e62b80000000000000000000000000000000000000000000000000000000000000005f8d5f845824e43a09610d4f6d6f55e44f5f29f1a08538c9871d39c7295834db5a28b7358cf23a8a6a06dc41f04c570a08a20aadc8eb4801aa3ee68b11f280e14d0e458f97f8c708175f845824e44a035cc2637cd68799f9a71c8e79fb5171351dd3cb5402dc0a3f291728527c9db48a07e3ac1ac64094ebc49c41ff6cb57b8f8eae18f5d7f2db0900117d816a1e30594f845824e44a0fc4fe6436212d35a2417e3414119608f626400bd265fba0417f80a7cf9694a20a07d0f996f41355b18781833a6e227356db03bcec71d0c16a4d7249eaa3fe8950794918f31cce0d9582882663fe9099226d3912c9d13f847f845824e44a05991f915a32ad719da138efecdcc3d169ad71fde31eba03be91991681d53f881a03653c82d6d99839699c3dfea470fcc777cda5b6185a1678c19d5fd7605c04a97',
    txHash: '0xf015dd519c909a80c111219ab2c5139d01a2e4121f801e8f45e519eafd421db6',
    senderTxHash: '0xcb1138abbef61a42cc846957b72a27329e80395911593f201f49c70c06408385',
    signatures: [
        [
            '0x4e43',
            '0x9610d4f6d6f55e44f5f29f1a08538c9871d39c7295834db5a28b7358cf23a8a6',
            '0x6dc41f04c570a08a20aadc8eb4801aa3ee68b11f280e14d0e458f97f8c708175',
        ],
        [
            '0x4e44',
            '0x35cc2637cd68799f9a71c8e79fb5171351dd3cb5402dc0a3f291728527c9db48',
            '0x7e3ac1ac64094ebc49c41ff6cb57b8f8eae18f5d7f2db0900117d816a1e30594',
        ],
        [
            '0x4e44',
            '0xfc4fe6436212d35a2417e3414119608f626400bd265fba0417f80a7cf9694a20',
            '0x7d0f996f41355b18781833a6e227356db03bcec71d0c16a4d7249eaa3fe89507',
        ],
    ],
    feePayerSignatures: [
        [
            '0x4e44',
            '0x5991f915a32ad719da138efecdcc3d169ad71fde31eba03be91991681d53f881',
            '0x3653c82d6d99839699c3dfea470fcc777cda5b6185a1678c19d5fd7605c04a97',
        ],
    ],
}
```

## mã hóa <a id="encrypt"></a>

```javascript
caver.klay.tài khoảns.encrypt(encryptTarget, password [, options])
```
Mã hóa tài khoản theo tiêu chuẩn lưu trữ khóa Klaytn. Để biết thêm thông tin, vui lòng tham khảo [KIP-3](https://kips.klaytn.foundation/KIPs/kip-3).

**LƯU Ý** Vì caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0), `caver.klay.tài khoảns.encrypt` mã hóa bằng cách sử dụng tiêu chuẩn kho khóa v4 để mã hóa các loại AccountKey khác nhau (AccountKeyPublic, AccountKeyMultiSig, AccountKeyRoleBased). Nếu bạn muốn mã hóa tài khoản bằng kho khóa v3, vui lòng sử dụng [caver.klay.tài khoảns.encryptV3](#encryptv3).

**Tham số**

| Tên           | Loại                              | Mô tả                                                                                                                                                                                                                                                                                                                                                   |
| ------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| encryptTarget | Chuỗi \| Mảng \| Đối tượng | Khóa riêng tư hoặc khóa ví Klaytn dùng để mã hóa. Vì caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0), nên EncryptTarget cũng có thể là một phiên bản của Account hoặc AccountKey (AccountKeyPublic, AccountKeyMultiSig hoặc AccountKeyRoleBased), một mảng các chuỗi khóa riêng tư hoặc một đối tượng xác định các khóa theo vai trò. |
| mật khẩu      | Chuỗi                              | Mật khẩu được sử dụng cho việc mã hóa.                                                                                                                                                                                                                                                                                                                  |
| tùy chọn      | Đối tượng                          | (tùy chọn) Tham số `options` cho phép bạn chỉ định các giá trị sẽ sử dụng khi sử dụng mã hóa. Bạn cũng có thể sử dụng đối tượng tùy chọn để mã hóa các tài khoản tách rời. Xem ví dụ bên dưới để biết cách sử dụng `options`.                                                                                                                           |

**LƯU Ý** Nếu không thể trích xuất địa chỉ tài khoản từ EncryptTarget (khi AccountKeyMultiSig, AccountKeyRoleBased, một mảng các chuỗi khóa riêng tư hoặc một đối tượng xác định các khóa theo vai trò) hoặc nếu tài khoản là riêng tư khóa được tách rời khỏi địa chỉ, bạn phải chỉ định địa chỉ trong đối tượng tùy chọn.

**LƯU Ý**: Có hai cách mã hóa khóa riêng tư khi tài khoản có khóa riêng tư tách rời khỏi địa chỉ.
1. Sử dụng định dạng [KlaytnWalletKey](../../../../learn/accounts.md#klaytn-wallet-key-format) với tham số privateKey.
2. Sử dụng `options.address` để gửi địa chỉ dưới dạng tham số.

**Giá trị trả về**

| Loại     | Mô tả                                                                                                                                                                          |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Đối tượng | Kho khóa được mã hóa JSON. Vì caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0) nên kho khóa v4 sẽ được sử dụng. Ví dụ dưới đây minh họa cả kho khóa v3 và v4. |


**Ví dụ**

```javascript
// mã hóa thành kho khóa v4 JSON.
// Mã hóa bằng chuỗi khóa riêng tư
> caver.klay.tài khoảns.encrypt('0x{private key}', 'test')
{
    version: 4,
    id: '6b4c9eb2-9dc6-46d4-88b6-bb1fa511ead1',
    address: '0x5aac93bcce8834c02600c2df7f031bc76f37276c',
    keyring: [
        {
            ciphertext: 'eda10e7b55de386aeb212f99644cdbfa52b96bf07747e74e5e60bd6c39fa88aa',
            cipherparams: { iv: 'd626fa3c140c93b27fb995264bee9c4e' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: { dklen: 32, salt: 'e85fd7a0801ed5221a769844a225a3663886e0e235fbc972c31a129df5cadb6c', n: 4096, r: 8, p: 1 },
            mac: 'bc19774bf5db92919273ca72f8f3137019d658e7850e31ff454635db4a1d5dbe',
        },
    ],
}

// Mã hóa bằng một mảng các chuỗi khóa riêng tư
> caver.klay.tài khoảns.encrypt(['0x{private key}', '0x{private key}'], 'test', { address: '0xe1d711ee2ac2dfec5b1e6ea583c8270b7575702a' })
{
    version: 4,
    id: 'ae5e94fc-0ab4-4a54-8655-4fab51b92e4a',
    address: '0xe1d711ee2ac2dfec5b1e6ea583c8270b7575702a',
    keyring: [
        {
            ciphertext: 'd84db9f8cd5206cf9dae524fbb15f4c09c93f447352cb3a6ac3ef182f9056686',
            cipherparams: { iv: '7a7bc290306bf39db79b425a5fe7333b' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: { dklen: 32, salt: '35cc3deab2a096ae1d2d62a2c1cb7d0c5481d9127cae3c35b1540be2b9fc2175', n: 4096, r: 8, p: 1 },
            mac: '87eecd98c857e4c416b63a3731fcf811cb055adf2967d5272e4aa77974dbf2a6',
        },
        {
            ciphertext: '8d6c3036fecbd6976734711ec69068180b4e5ec90e06797d92be8243eae35f19',
            cipherparams: { iv: '191fcc2402b82d7039bd651b29f42cbc' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: { dklen: 32, salt: 'cbf12acbba50120783aa0ad4ff35f11daa8972dcb728e11445dd1ec38be2e091', n: 4096, r: 8, p: 1 },
            mac: '216b8a04022234d8127eafb9bdb3a72b18f6c94a05469d9bbd76d26e67cb63a2',
        },
    ],
}

// Mã hóa với một đối tượng
> caver.klay.tài khoảns.encrypt({ transactionKey: ['0x{private key}', '0x{private key}'], updateKey: '0x{private key}', feePayerKey: '0x{private key}'}, 'test', { address: '0xe1d711ee2ac2dfec5b1e6ea583c8270b7575702a' })
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

// Mã hóa tài khoản tách rời - 1. Sử dụng định dạng KlaytnWalletKey với tham số privateKey.
> caver.klay.tài khoảns.encrypt('0x{private key}0x{type}0x{address in hex}', 'test')
{
    version: 4,
    id: 'f320306e-4d67-4982-b1a9-7b455c744579',
    address: '0x7d46813010aee975946d6ee9c7fb887eef6b318d',
    keyring: [
        {
            ciphertext: '745d306663b7cc09dbe6f3dbbf76d252bd5cb53613c6369e7e481edbf0bb31d1',
            cipherparams: { iv: '0c502b449247166e6f3338346b82ea3d' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: { dklen: 32, salt: '171efaa9c12aa03d488c547651a3d1b2c745e305dffcaf4ad658ed1ae18882d8', n: 4096, r: 8, p: 1 },
            mac: '8cb52aff70971b9fd2b467b47aa493ae90e8823f4ff5cfafcf7c2e06a5aa2298',
        },
    ],
}

// Mã hóa tài khoản tách rời - 2. Sử dụng các tùy chọn để gửi địa chỉ dưới dạng tham số.
> caver.klay.tài khoảns.encrypt('0x{private key}', 'test', { address: '0x7d46813010aee975946d6ee9c7fb887eef6b318d' })
{
    version: 4,
    id: '2675a321-9054-48ae-97d8-bafa22ec07f5',
    address: '0x7d46813010aee975946d6ee9c7fb887eef6b318d',
    keyring: [
        {
            ciphertext: 'aa51496d861a129c91e2fb92807afb7603156336b4681a6bf1569634fb51d330',
            cipherparams: { iv: 'cc4fda2a72f2904a7bd342318cc9a61f' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: { dklen: 32, salt: '672160453667bbe34c9a3adf997e92d1bd734ab28f6078807cad902b5b47fd92', n: 4096, r: 8, p: 1 },
            mac: '51ec88d578f94f1307f0d025cac4b0e6c0544498baa05266f0114d06c57155b4',
        },
    ],
}

// Sử dụng các đối tượng tùy chọn với các giá trị tùy chọn mã hóa (scrypt)
> caver.klay.tài khoảns.encrypt('0x{private key}', 'test', {
    salt: '776ad46fde47572c58ba5b9616a661a1fbc4b9ff918300faeba04bb9ff5be04c',
    iv: Buffer.from('b62ef75e39fa396de62c51c4734b69a2', 'hex'),
    kdf: 'scrypt',
    dklen: 32,
    n: 262144,
    r: 8,
    p: 1,
    cipher: 'aes-128-cbc',
    uuid: Buffer.from('f0b40ab7d69fdd9606e2a5242dddd813', 'hex'),
})
{
    version: 4,
    id: 'f0b40ab7-d69f-4d96-86e2-a5242dddd813',
    address: '0x5aac93bcce8834c02600c2df7f031bc76f37276c',
    keyring: [
        {
            ciphertext: 'd73c42f72b6c46c352442db20d04ea7bf571df29a01641e028ab97891069fad191a93b0082650ac4c951c75f400cc545',
            cipherparams: { iv: 'b62ef75e39fa396de62c51c4734b69a2' },
            cipher: 'aes-128-cbc',
            kdf: 'scrypt',
            kdfparams: { dklen: 32, salt: '776ad46fde47572c58ba5b9616a661a1fbc4b9ff918300faeba04bb9ff5be04c', n: 262144, r: 8, p: 1 },
            mac: '9a200c73ef48129a33ffef7c7246e8a08c4bcd308b18e341f25199f4f974dcd0',
        },
    ],
}

// Sử dụng các đối tượng tùy chọn với các giá trị tùy chọn mã hóa (pbkdf2)
> caver.klay.tài khoảns.encrypt('0x{private key}', 'test', {
    salt: '776ad46fde47572c58ba5b9616a661a1fbc4b9ff918300faeba04bb9ff5be04c',
    iv: Buffer.from('b62ef75e39fa396de62c51c4734b69a2', 'hex'),
    kdf: 'pbkdf2',
    dklen: 32,
    c: 262144,
    cipher: 'aes-128-cbc',
    uuid: Buffer.from('f0b40ab7d69fdd9606e2a5242dddd813', 'hex'),
})
{
    version: 4,
    id: 'f0b40ab7-d69f-4d96-86e2-a5242dddd813',
    address: '0x5aac93bcce8834c02600c2df7f031bc76f37276c',
    keyring: [
        {
            ciphertext: '58802ef723041431ec089041c23ae0d4b6b4d8fe56c920f587296b95b7645df439c3917da4f8a119ee0300609f4448d0',
            cipherparams: { iv: 'b62ef75e39fa396de62c51c4734b69a2' },
            cipher: 'aes-128-cbc',
            kdf: 'pbkdf2',
            kdfparams: { dklen: 32, salt: '776ad46fde47572c58ba5b9616a661a1fbc4b9ff918300faeba04bb9ff5be04c', c: 262144, prf: 'hmac-sha256' },
            mac: '2cac2a4dccb9127c6f7335135cfc5a8dda6c58cd4429cd3466b89d5d506f5930',
        },
    ],
}

// mã hóa vào kho khóa v3 JSON. (Nếu bạn muốn mã hóa thành kho khóa v3, hãy sử dụng phiên bản cũ hơn caver-js v1.2.0.)
// Mã hóa bằng chuỗi khóa riêng tư
> caver.klay.tài khoảns.encrypt('0x{private key}', 'test!')
{
    version: 3,
    id: '04e9bcbb-96fa-497b-94d1-14df4cd20af6',
    address: '2c7536e3605d9c16a7a3d7b1898e529396a65c23',
    crypto: {
        ciphertext: 'a1c25da3ecde4e6a24f3697251dd15d6208520efc84ad97397e906e6df24d251',
        cipherparams: { iv: '2885df2b63f7ef247d753c82fa20038a' },
        cipher: 'aes-128-ctr',
        kdf: 'scrypt',
        kdfparams: { dklen: 32, salt: '4531b3c174cc3ff32a6a7a85d6761b410db674807b2d216d022318ceee50be10', n: 262144, r: 8, p: 1 },
        mac: 'b8b010fff37f9ae5559a352a185e86f9b9c1d7f7a9f1bd4e82a5dd35468fc7f6'
    }
}
```

## encryptV3 <a id="encryptv3"></a>

```javascript
caver.klay.tài khoảns.encryptV3(encryptTarget, password [, options])
```
Mã hóa tài khoản theo tiêu chuẩn kho khóa v3 Klaytn.

**LƯU Ý** `caver.klay.tài khoảns.encryptV3` được hỗ trợ kể từ caver-js [v1.3.2-rc.1](https://www.npmjs.com/package/caver-js/v/1.3.2-rc.1).

**Tham số**

| Tên           | Loại                  | Mô tả                                                                                                                                                                                                                                   |
| ------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| encryptTarget | Chuỗi \| Đối tượng | Khóa riêng tư, khóa ví Klaytn hoặc phiên bản Tài khoản hoặc AccountKeyPublic dùng để mã hóa.                                                                                                                                            |
| mật khẩu      | Chuỗi                  | Mật khẩu được sử dụng cho việc mã hóa.                                                                                                                                                                                                  |
| tùy chọn      | Đối tượng              | (tùy chọn) Tham số `options` cho phép bạn chỉ định các giá trị sẽ sử dụng khi sử dụng mã hóa. Bạn cũng có thể sử dụng đối tượng `tùy chọn` để mã hóa các tài khoản tách rời. Xem ví dụ thứ ba bên dưới để biết cách sử dụng `tùy chọn`. |

**LƯU Ý**: Có hai cách mã hóa khóa riêng tư khi tài khoản có khóa riêng tư tách rời khỏi địa chỉ.
1. Sử dụng [KlaytnWalletKey](../../../../learn/accounts.md#klaytn-wallet-key-format) làm tham số `encryptTarget`.
2. Sử dụng địa chỉ làm tham số `options.address` để gửi địa chỉ dưới dạng một trong các tham số. Xem ví dụ thứ ba bên dưới để biết cách sử dụng.

**Giá trị trả về**

| Loại     | Mô tả                         |
| --------- | ----------------------------- |
| Đối tượng | Kho khóa được mã hóa v3 JSON. |


**Ví dụ**

```javascript
// mã hóa thành JSON kho khóa v3 bằng một chuỗi khóa riêng tư.
> caver.klay.tài khoảns.encryptV3('0x{private key}', 'test!')
{
    version: 3,
    id: 'ff07b774-b572-4c76-a925-9e7650fb0488',
    address: '0x4abe737d3c57dce9152988c714e9e4b341647650',
    crypto: {
        ciphertext: '5a1c898fd89a7521e0034d297a46f029def59632416aef724a1f466f3c416958',
        cipherparams: { iv: '8304ad468f10db5529fa480bfc170df7' },
        cipher: 'aes-128-ctr',
        kdf: 'scrypt',
        kdfparams: { dklen: 32, salt: '3a98ebac3da3ad0edf7f1f237c86a3dd71a77002e4908991579ed52910c6f082', n: 4096, r: 8, p: 1 },
        mac: 'a5ed79b91ffe30baa22b2622bffbab97ea5cf893ba96249c7854e2d19295cc3d',
    },
}

// encrypt to kho khóa v3 JSON with KlaytnWalletKey.
> caver.klay.tài khoảns.encryptV3('0x{private key}0x{type}0x{address in hex}', 'test!')
{
    version: 3,
    id: 'ff07b774-b572-4c76-a925-9e7650fb0488',
    address: '0x4abe737d3c57dce9152988c714e9e4b341647650',
    crypto: {
        ciphertext: '5a1c898fd89a7521e0034d297a46f029def59632416aef724a1f466f3c416958',
        cipherparams: { iv: '8304ad468f10db5529fa480bfc170df7' },
        cipher: 'aes-128-ctr',
        kdf: 'scrypt',
        kdfparams: { dklen: 32, salt: '3a98ebac3da3ad0edf7f1f237c86a3dd71a77002e4908991579ed52910c6f082', n: 4096, r: 8, p: 1 },
        mac: 'a5ed79b91ffe30baa22b2622bffbab97ea5cf893ba96249c7854e2d19295cc3d',
    },
}

// encrypt to kho khóa v3 JSON with address field in options.
> caver.klay.tài khoảns.encryptV3('0x{private key}', 'test!', { address: '0x4abe737d3c57dce9152988c714e9e4b341647650' })
{
    version: 3,
    id: 'ff07b774-b572-4c76-a925-9e7650fb0488',
    address: '0x4abe737d3c57dce9152988c714e9e4b341647650',
    crypto: {
        ciphertext: '5a1c898fd89a7521e0034d297a46f029def59632416aef724a1f466f3c416958',
        cipherparams: { iv: '8304ad468f10db5529fa480bfc170df7' },
        cipher: 'aes-128-ctr',
        kdf: 'scrypt',
        kdfparams: { dklen: 32, salt: '3a98ebac3da3ad0edf7f1f237c86a3dd71a77002e4908991579ed52910c6f082', n: 4096, r: 8, p: 1 },
        mac: 'a5ed79b91ffe30baa22b2622bffbab97ea5cf893ba96249c7854e2d19295cc3d',
    },
}
```


## giải mã <a id="decrypt"></a>

```javascript
caver.klay.tài khoảns.decrypt(keystoreJsonV3, password)
```
Giải mã JSON kho khóa v3 hoặc v4 và trả về đối tượng tài khoản đã giải mã.

**LƯU Ý** Vì caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0), `caver.klay.tài khoảns.decrypt` có thể giải mã kho khóa v4.

**Tham số**

| Tên          | Loại | Mô tả                                                  |
| ------------ | ----- | ------------------------------------------------------ |
| keystoreJson | Chuỗi | Chuỗi JSON chứa tài khoản được mã hóa dùng để giải mã. |
| mật khẩu     | Chuỗi | Mật khẩu được sử dụng cho việc mã hóa.                 |


**Giá trị trả về**

| Loại     | Mô tả                   |
| --------- | ----------------------- |
| Đối tượng | Tài khoản được giải mã. |


**Ví dụ**

```javascript
// Giải mã kho khóa v4 JSON
> caver.klay.tài khoảns.decrypt({
    version: 4,
    id: '6b4c9eb2-9dc6-46d4-88b6-bb1fa511ead1',
    address: '0x5aac93bcce8834c02600c2df7f031bc76f37276c',
    keyring: [
        {
            ciphertext: 'eda10e7b55de386aeb212f99644cdbfa52b96bf07747e74e5e60bd6c39fa88aa',
            cipherparams: { iv: 'd626fa3c140c93b27fb995264bee9c4e' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: { dklen: 32, salt: 'e85fd7a0801ed5221a769844a225a3663886e0e235fbc972c31a129df5cadb6c', n: 4096, r: 8, p: 1 },
            mac: 'bc19774bf5db92919273ca72f8f3137019d658e7850e31ff454635db4a1d5dbe',
        },
    ],
}, 'test')
Account {
    address: [Getter/Setter],
    tài khoảnKey: [Getter/Setter],
    privateKey: [Getter/Setter],
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey]
}

// Giải mã keystroe v3 JSON
> caver.klay.tài khoảns.decrypt({
     version: 3,
     id: '04e9bcbb-96fa-497b-94d1-14df4cd20af6',
     address: '2c7536e3605d9c16a7a3d7b1898e529396a65c23',
     crypto: {
         ciphertext: 'a1c25da3ecde4e6a24f3697251dd15d6208520efc84ad97397e906e6df24d251',
         cipherparams: { iv: '2885df2b63f7ef247d753c82fa20038a' },
         cipher: 'aes-128-ctr',
         kdf: 'scrypt',
         kdfparams: {
             dklen: 32,
             salt: '4531b3c174cc3ff32a6a7a85d6761b410db674807b2d216d022318ceee50be10',
             n: 262144,
             r: 8,
             p: 1
         },
         mac: 'b8b010fff37f9ae5559a352a185e86f9b9c1d7f7a9f1bd4e82a5dd35468fc7f6'
     }
  }, 'test!')
Account {
    address: [Getter/Setter],
    tài khoảnKey: [Getter/Setter],
    privateKey: [Getter/Setter],
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey]
}
```

## isDecoupled <a id="isdecoupled"></a>

```javascript
caver.klay.tài khoảns.isDecoupled(key, address)
```
Xác định xem khóa có được tách rời khỏi địa chỉ hay không.

**Tham số**

| Tên     | Loại | Mô tả                                                                                                                                                                                                 |
| ------- | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| khóa    | Chuỗi | Khóa dùng để xác định xem có tách rời khỏi địa chỉ hay không. Khóa có thể là khóa riêng tư chuỗi 32 byte hoặc [KlaytnWalletKey](../../../../learn/accounts.md#klaytn-wallet-key-format). |
| address | Chuỗi | (tùy chọn) Địa chỉ được sử dụng để xác định xem có được tách rời hay không. Nếu không có địa chỉ nào được cung cấp, thì địa chỉ được lấy từ khóa.                                                     |


**Giá trị trả về**

| Loại   | Mô tả                                                                             |
| ------- | --------------------------------------------------------------------------------- |
| Boolean | `true` nếu khóa được tách rời khỏi địa chỉ. `false` nếu khóa không được tách rời. |


**Ví dụ**

```javascript
> caver.klay.tài khoảns.isDecoupled('0x{private key}', '0x{address in hex}')
true

> caver.klay.tài khoảns.isDecoupled('0x{private key}0x{type}0x{address in hex}')
true

> caver.klay.tài khoảns.isDecoupled('0x{private key}')
false

> caver.klay.tài khoảns.isDecoupled('0x{private key}0x{type}0x{address in hex}')
false
```

## getLegacyAccount <a id="getlegacyaccount"></a>

```javascript
caver.klay.tài khoảns.getLegacyAccount(key)
```
Trả về một tài khoản có địa chỉ suy ra từ khóa riêng tư đã cho. Xem [AccountKeyLegacy](../../../../learn/accounts.md#accountkeylegacy).

**Tham số**

| Tên  | Loại | Mô tả                                                                                                                                                                                                                                                                         |
| ---- | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| khóa | Chuỗi | Tham số được sử dụng để lấy tài khoản có khóa tài khoản cũ. Khóa có thể là khóa riêng tư chuỗi 32 byte hoặc [KlaytnWalletKey](../../../../learn/accounts.md#klaytn-wallet-key-format). Trong KlaytnWalletKey, chỉ phần tương ứng với khóa riêng tư được sử dụng. |


**Giá trị trả về**

| Loại     | Mô tả                                                                                                                                              |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Đối tượng | Đối tượng tài khoản có khóa tài khoản cũ của giá trị đã cho. Nếu có thông tin địa chỉ được trích xuất từ khóa này thì nó sẽ được trả về cùng nhau. |


**Ví dụ**

```javascript
// getLegacyAccount với định dạng khóa riêng tư thô
> caver.klay.tài khoảns.getLegacyAccount('0x{private key}')
{ 
    legacyAccount: { 
        address: '0xE26D5d4983eD62A99D7D4Bc0cE0e784782fF6B27',
        privateKey: '0x{private key}' 
    },
    klaytnWalletKeyAddress: '' 
}

// getLegacyAccount với định dạng KlaytnWalletKey
> caver.klay.tài khoảns.getLegacyAccount('0x{private key}0x{type}0x{address in hex}')
{ 
    legacyAccount: { 
        address: '0xE26D5d4983eD62A99D7D4Bc0cE0e784782fF6B27',
        privateKey: '0x{private key}'
    },
    klaytnWalletKeyAddress: '0xE26D5d4983eD62A99D7D4Bc0cE0e784782fF6B27'
}

// getLegacyAccount với định dạng KlaytnWalletKey tách rời
> caver.klay.tài khoảns.getLegacyAccount('0x{private key}0x{type}0x{address in hex}')
{ 
    legacyAccount: { 
        address: '0xE26D5d4983eD62A99D7D4Bc0cE0e784782fF6B27',
        privateKey: '0x{private key}' 
    },
    klaytnWalletKeyAddress: '0xd05c5926b0a2f31aadcc9a9cbd3868a50104d834'
}
```


## ví <a id="wallet"></a>

```javascript
caver.klay.tài khoảns.wallet
```
Chứa ví trong bộ nhớ với nhiều tài khoản.  Các tài khoản này có thể được sử dụng khi sử dụng [caver.klay.sendTransaction](./caver.klay/transaction/transaction.md#sendtransaction).

**Ví dụ**

```javascript
> caver.klay.tài khoảns.wallet;
Wallet {
  '0':
   { address: '0xce3bda34a14415f3bc2bcd5e61c48043857a6451',
     privateKey: '0x{private key}',
     signTransaction: [Function: signTransaction],
     sign: [Function: sign],
     encrypt: [Function: encrypt],
     getKlaytnWalletKey: [Function: getKlaytnWalletKey],
     index: 0 },
  _tài khoảns: Accounts { ... },
  length: 1,
  defaultKeyName: 'caverjs_wallet',
  '0xce3bda34a14415f3bc2bcd5e61c48043857a6451': { ... },
  '0XCE3BDA34A14415F3BC2BCD5E61C48043857A6451': { ... },
  '0xce3bDa34A14415F3BC2bCd5E61C48043857a6451': { ... } 
}
```


## wallet.create  <a id="wallet-create"></a>

```javascript
caver.klay.tài khoảns.wallet.create([numberOfAccounts] [, entropy])
```
Tạo một hoặc nhiều tài khoản trong ví bằng các cặp khóa được tạo ngẫu nhiên. Nếu ví đã tồn tại, chúng sẽ không bị ghi đè.

**Tham số**

| Tên              | Loại | Mô tả                                                                                                                                                                                          |
| ---------------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| numberOfAccounts | Số    | (tùy chọn) Số lượng tài khoản cần tạo. Để trống để tạo ví trống.                                                                                                                               |
| độ nhiễu loạn    | Chuỗi | (tùy chọn) Một chuỗi ngẫu nhiên để tăng độ nhiễu loạn. Nếu không có chuỗi nào được cung cấp, một chuỗi ngẫu nhiên sẽ được tạo bằng cách sử dụng [randomHex](./caver.utils_1.4.1.md#randomhex). |

**Giá trị trả về**

| Loại     | Mô tả         |
| --------- | ------------- |
| Đối tượng | Đối tượng ví. |


**Ví dụ**

```javascript
> caver.klay.tài khoảns.wallet.create(1, 'entropy');
Wallet {
  '0': { ... },
  _tài khoảns: Accounts { ... },
  length: 1,
  defaultKeyName: 'caverjs_wallet',
  '0xc89cdd4258e17471fbaf75283b6a952451eb7f54': { ... },
  '0XC89CDD4258E17471FBAF75283B6A952451EB7F54': { ... },
  '0xC89cDD4258e17471fBaf75283b6A952451Eb7f54': { ... }
```


## wallet.add <a id="wallet-add"></a>

```javascript
caver.klay.tài khoảns.wallet.add(tài khoản [, targetAddress])
```
Thêm một tài khoản sử dụng khóa riêng tư hoặc đối tượng tài khoản vào ví.

**LƯU Ý**: Nếu có cùng một địa chỉ tồn tại bên trong ví, hệ thống sẽ trả về lỗi. Nếu bạn muốn thay đổi khóa riêng tư được liên kết với tài khoản trong ví, vui lòng sử dụng [caver.klay.tài khoảns.wallet.updatePrivateKey](#wallet-updateprivatekey).


**Tham số**

| Tên           | Loại                  | Mô tả                                                                                         |
| ------------- | ---------------------- | --------------------------------------------------------------------------------------------- |
| tài khoản     | Chuỗi \| Đối tượng | Khóa riêng tư hoặc đối tượng tài khoản được tạo bằng [caver.klay.tài khoảns.create](#create). |
| targetAddress | Chuỗi                  | Một địa chỉ đích sẽ được sử dụng với một khóa riêng tư đã cho.                                |

**LƯU Ý**: caver-js hỗ trợ hai loại định dạng khóa riêng tư. Một là định dạng khóa riêng tư thô của loại chuỗi 32 byte và định dạng còn lại là [KlaytnWalletKey](../../../../learn/accounts.md#klaytn-wallet-key-format).

**Giá trị trả về**

| Loại     | Mô tả              |
| --------- | ------------------ |
| Đối tượng | Tài khoản đã thêm. |


**Ví dụ**

```javascript
> caver.klay.tài khoảns.wallet.add('0x{private key}');
{ 
    address: '0xdac9f72e27f05eca08df7a2ea2d044b3ed3a6e54',
    privateKey: '0x{private key}',
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey],
    index: 4 
}

// Sử dụng khóa '0x{private key}' như là khóa riêng tư
// cho địa chỉ '0xfe9157e180c8f4c229e88d0c1763a746db8b19b4'
> caver.klay.tài khoảns.wallet.add('0x{private key}', '0xfe9157e180c8f4c229e88d0c1763a746db8b19b4');
{ 
    address: '0xfe9157e180c8f4c229e88d0c1763a746db8b19b4',
    privateKey: '0x{private key}',
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey],
    index: 5
}

> caver.klay.tài khoảns.wallet.add({
      privateKey: '0x{private key}',
      address: '0xb8CE9ab6943e0eCED004cDe8e3bBed6568B2Fa01'
  });
{ 
    address: '0xb8CE9ab6943e0eCED004cDe8e3bBed6568B2Fa01',
    privateKey: '0x{private key}',
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey],
    index: 6
}

// Thêm ví có định dạng KlaytnWalletKey
> caver.klay.tài khoảns.wallet.add('0x{private key}0x{type}0x{address in hex}');
{ 
    address: '0x3bd32d55e64d6cbe54bec4f5200e678ee8d1a990',
    privateKey: '0x{private key}',
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey],
    index: 1 
}
```


## wallet.getAccount <a id="wallet-getaccount"></a>

```javascript
caver.klay.tài khoảns.wallet.getAccount(addressOrIndex)
```
Trả về tài khoản tương ứng với địa chỉ trong `caver.klay.tài khoảns.wallet`.


**Tham số**

| Tên            | Loại           | Mô tả                                                                                                                         |
| -------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| addressOrIndex | Chuỗi \| Số | Một chỉ mục trong danh sách địa chỉ ví, hoặc một địa chỉ ở dạng thập lục phân. Giá trị đã cho phải tồn tại trong ví caver-js. |

**Giá trị trả về**

| Loại     | Mô tả               |
| --------- | ------------------- |
| Đối tượng | Tài khoản trong ví. |


**Ví dụ**

```javascript
> caver.klay.tài khoảns.wallet.getAccount('0x{address in hex}')
Account {
    address: [Getter/Setter],
    tài khoảnKey: [Getter/Setter],
    privateKey: [Getter/Setter],
    signTransaction: [Function: signTransaction],
    feePayerSignTransaction: [Function: feePayerSignTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey],
    index: 0
}

> caver.klay.tài khoảns.wallet.getAccount(0)
Account {
    address: [Getter/Setter],
    tài khoảnKey: [Getter/Setter],
    privateKey: [Getter/Setter],
    signTransaction: [Function: signTransaction],
    feePayerSignTransaction: [Function: feePayerSignTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey],
    index: 0
}
```


## wallet.remove <a id="wallet-remove"></a>

```javascript
caver.klay.tài khoảns.wallet.remove(tài khoản)
```
Xóa tài khoản khỏi ví.

**Tham số**

| Tên       | Loại           | Mô tả                                    |
| --------- | --------------- | ---------------------------------------- |
| tài khoản | Chuỗi \| Số | Địa chỉ tài khoản hoặc chỉ mục trong ví. |


**Giá trị trả về**

| Loại   | Mô tả                                                |
| ------- | ---------------------------------------------------- |
| Boolean | `true` nếu ví đã bị xóa. `false` nếu không tìm thấy. |


**Ví dụ**

```javascript
> caver.klay.tài khoảns.wallet;
Wallet {
  '0': { ... },
  _tài khoảns: Accounts { ... },
  length: 1,
  defaultKeyName: 'caverjs_wallet',
  '0xce3bda34a14415f3bc2bcd5e61c48043857a6451': { ... },
  '0XCE3BDA34A14415F3BC2BCD5E61C48043857A6451': { ... },
  '0xce3bDa34A14415F3BC2bCd5E61C48043857a6451': { ... } 
}

> caver.klay.tài khoảns.wallet.remove('0xce3bda34a14415f3bc2bcd5e61c48043857a6451');
true

> caver.klay.tài khoảns.wallet.remove(3);
false
```


## wallet.clear <a id="wallet-clear"></a>

```javascript
caver.klay.tài khoảns.wallet.clear()
```
Làm trống ví một cách an toàn và xóa tất cả các tài khoản của ví.

**Tham số**

Không có

**Giá trị trả về**

| Loại     | Mô tả         |
| --------- | ------------- |
| Đối tượng | Đối tượng ví. |

**Ví dụ**

```javascript
> caver.klay.tài khoảns.wallet.clear();
Wallet {
  _tài khoảns: Accounts { ... },
  length: 0,
  defaultKeyName: 'caverjs_wallet' 
}
```


## wallet.encrypt <a id="wallet-encrypt"></a>

```javascript
caver.klay.tài khoảns.wallet.encrypt(password)
```
Mã hóa tất cả các tài khoản ví và trả về một mảng các đối tượng kho khóa v3 được mã hóa.

**Tham số**

| Tên      | Loại | Mô tả                                  |
| -------- | ----- | -------------------------------------- |
| mật khẩu | Chuỗi | Mật khẩu được sử dụng cho việc mã hóa. |


**Giá trị trả về**

| Loại | Mô tả                                  |
| ----- | -------------------------------------- |
| Mảng  | Các đối tượng kho khóa v3 được mã hóa. |


**Ví dụ**

```javascript
> caver.klay.tài khoảns.wallet.encrypt('test');
[ 
    { 
        version: 3,
        id: '2b334f59-a0bc-446c-9f25-c934e432e832',
        address: '0x57629b4a9dc137f15400a3d96ab9e1e57b7f57c7',
        crypto: { 
            ciphertext: '9ca62a29f0f634ca63dfab40a4631f9fabb689ae60e4bfb475c58c69ad060543',
            cipherparams: { iv: '3d924a71a7b4db0f2f8456068c1c7b8e' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: { 
                dklen: 32,
                salt: '42628f28de6aa8b988c425fa97d8f790ac26a6f89b44b0321c56101e7fb8bbcf',
                n: 4096,
                r: 8,
                p: 1 
                },
            mac: 'a35bc8f650aa1ff0d2316de7be1494927851e19b3e817cd16482a442912f133b' 
        } 
    },
    { 
        version: 3,
        id: '9b8b4e4f-e72c-4a28-af57-38b6838b5533',
        address: '0x4fb4006448106831a7c8c8e0d0139e05550f3d3e',
        crypto: { 
            ciphertext: '65b9350969efdfeadb357145c97992b67c4114bd1d24592e8c62dbddfab2a49f',
            cipherparams: { iv: 'b9d19c69a62745b3db409ff0879669a2' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: { 
                dklen: 32,
                salt: '914a4628a991f521d547a9da593b5daa63a1a82fcafe0282c09e80967874f36c',
                n: 4096,
                r: 8,
                p: 1 
            },
            mac: 'a9de2c54c4b29807fd21d40fe79f556a7d5b771045cbbda0a943d3ced4cacafc' 
        } 
    } 
]
```


## wallet.decrypt <a id="wallet-decrypt"></a>

```javascript
caver.klay.tài khoảns.wallet.decrypt(keystoreArray, password)
```
Giải mã các đối tượng kho khóa v3.

**Tham số**

| Tên           | Loại | Mô tả                                                  |
| ------------- | ----- | ------------------------------------------------------ |
| keystoreArray | Mảng  | Các đối tượng kho khóa v3 được mã hóa dùng để giải mã. |
| mật khẩu      | Chuỗi | Mật khẩu đã được sử dụng cho việc mã hóa.              |


**Giá trị trả về**

| Loại     | Mô tả         |
| --------- | ------------- |
| Đối tượng | Đối tượng ví. |


**Ví dụ**

```javascript
> caver.klay.tài khoảns.wallet.decrypt([ 
    { 
        version: 3,
        id: '2b334f59-a0bc-446c-9f25-c934e432e832',
        address: '0x57629b4a9dc137f15400a3d96ab9e1e57b7f57c7',
        crypto: { 
            ciphertext: '9ca62a29f0f634ca63dfab40a4631f9fabb689ae60e4bfb475c58c69ad060543',
            cipherparams: { iv: '3d924a71a7b4db0f2f8456068c1c7b8e' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: { 
                dklen: 32,
                salt: '42628f28de6aa8b988c425fa97d8f790ac26a6f89b44b0321c56101e7fb8bbcf',
                n: 4096,
                r: 8,
                p: 1 
                },
            mac: 'a35bc8f650aa1ff0d2316de7be1494927851e19b3e817cd16482a442912f133b' 
        } 
    },
    { 
        version: 3,
        id: '9b8b4e4f-e72c-4a28-af57-38b6838b5533',
        address: '0x4fb4006448106831a7c8c8e0d0139e05550f3d3e',
        crypto: { 
            ciphertext: '65b9350969efdfeadb357145c97992b67c4114bd1d24592e8c62dbddfab2a49f',
            cipherparams: { iv: 'b9d19c69a62745b3db409ff0879669a2' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: { 
                dklen: 32,
                salt: '914a4628a991f521d547a9da593b5daa63a1a82fcafe0282c09e80967874f36c',
                n: 4096,
                r: 8,
                p: 1 
            },
            mac: 'a9de2c54c4b29807fd21d40fe79f556a7d5b771045cbbda0a943d3ced4cacafc' 
        } 
    } 
], 'test');
Wallet {
  '0': { ... },
  '1': { ... },
  _tài khoảns: Accounts { ... },
  length: 2,
  defaultKeyName: 'caverjs_wallet',
  '0x57629b4a9dc137f15400a3d96ab9e1e57b7f57c7': { ... } ,
  '0X57629B4A9DC137F15400A3D96AB9E1E57B7F57C7': { ... } ,
  '0x57629B4A9DC137F15400A3d96Ab9e1e57B7F57C7': { ... } ,
  '0x4fb4006448106831a7c8c8e0d0139e05550f3d3e': { ... } ,
  '0X4FB4006448106831A7C8C8E0D0139E05550F3D3E': { ... } ,
  '0x4fb4006448106831a7c8C8e0D0139E05550F3D3E': { ... } 
}
```

## wallet.getKlaytnWalletKey <a id="wallet-getklaytnwalletkey"></a>

```javascript
caver.klay.tài khoảns.wallet.getKlaytnWalletKey(index)
caver.klay.tài khoảns.wallet.getKlaytnWalletKey(address)
```
Trả lại khóa ví Klaytn cho tài khoản trên ví của caver-js.

**Tham số**

| Tên            | Loại         | Mô tả                                                                                                                    |
| -------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------ |
| indexOrAddress | Số\|Chuỗi | Một chỉ mục trong danh sách địa chỉ ví, một địa chỉ ở dạng thập lục phân. Giá trị đã cho phải tồn tại trong ví caver-js. |


**Giá trị trả về**

| Loại | Mô tả                                                                          |
| ----- | ------------------------------------------------------------------------------ |
| Chuỗi | KlaytnWalletKey khớp với tài khoản. Giá trị này cho phép bạn đăng nhập vào ví. |


**Ví dụ**

```javascript
// Với địa chỉ con người không đọc được
> caver.klay.tài khoảns.wallet.getKlaytnWalletKey(0)
'0x{private key}0x{type}0x{address in hex}'

// Với chỉ mục của danh sách ví
> caver.klay.tài khoảns.wallet.getKlaytnWalletKey(1)
'0x{private key}0x{type}0x{address in hex}'

// Với một địa chỉ ở dạng thập lục phân
> caver.klay.tài khoảns.wallet.getKlaytnWalletKey('0xa9d40b07a6d06e7b7af6cf9a17fb107c9fc7fe58')
'0x{private key}0x{type}0x{address in hex}'

// Nếu tài khoản đã cho không tồn tại trong ví caver-js, sẽ trả về lỗi.
> caver.klay.tài khoảns.wallet.getKlaytnWalletKey('0x35170d0c774b8c80e9f802a7af6d0497e621c215')
Lỗi: Không thể tìm thấy tài khoản
```

## wallet.updatePrivateKey <a id="wallet-updateprivatekey"></a>

```javascript
caver.klay.tài khoảns.wallet.updatePrivateKey(privateKey, address)
```
Cập nhật thông tin khóa riêng tư của tài khoản được lưu trữ trong ví.

**LƯU Ý**: Hàm này chỉ thay đổi thông tin được lưu trữ trong ví của caver-js. Hàm này không ảnh hưởng đến thông tin quan trọng được lưu trữ trên mạng lưới Klaytn. Có thể thay đổi các khóa trong mạng lưới Klaytn bằng cách gửi một giao dịch ['ACCOUNT_UPDATE'](./caver.klay/transaction/sendtx-account-update.md#sendtransaction-account_update).

**LƯU Ý** `updatePrivateKey` chỉ hoạt động nếu tài khoảnKey của tài khoản là AccountKeyPublic. Vì caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0) hỗ trợ AccountKeys (AccountKeyPublic, AccountKeyMultiSig, AccountKeyRoleBased), `privateKey` trở thành thuộc tính chỉ đọc tham chiếu đến defaultKey của tài khoảnKey. Phương thức này không trực tiếp cập nhật `privateKey`, thay vào đó cập nhật tài khoảnKey. Phương thức này được duy trì để tương thích ngược. Hiện tại, nên sử dụng [caver.klay.tài khoảns.wallet.updateAccountKey](#wallet-updateaccountkey) chung chung hơn.

**Tham số**

| Tên        | Loại | Mô tả                                          |
| ---------- | ----- | ---------------------------------------------- |
| privateKey | Chuỗi | Khóa riêng tư mới sẽ được sử dụng để cập nhật. |
| address    | Chuỗi | Địa chỉ tài khoản trong ví.                    |


**Giá trị trả về**

| Loại     | Mô tả                                                                                             |
| --------- | ------------------------------------------------------------------------------------------------- |
| Đối tượng | Phiên bản tài khoản với tài khoảnKey mới. Phiên bản Tài khoản nằm trong ví caver-js trong bộ nhớ. |


**Ví dụ**

```javascript
> caver.klay.tài khoảns.wallet.updatePrivateKey('0x{private key}', '0xf2e2565629c7763dc0b595e8e531a31371a95f95');
Account {
    address: [Getter/Setter],
    tài khoảnKey: [Getter/Setter],
    privateKey: [Getter/Setter],
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey],
    index: 0
}
```

## wallet.updateAccountKey <a id="wallet-updateaccountkey"></a>

```javascript
caver.klay.tài khoảns.wallet.updateAccountKey(address, tài khoảnKey)
```
Cập nhật thông tin khóa tài khoản của tài khoản được lưu trữ trong ví. Khi bạn cập nhật tài khoảnKey của tài khoản, privateKey cũng sẽ được cập nhật thành defaultKey của tài khoảnKey mới.

Nếu tham số tài khoảnKey là một chuỗi khóa riêng tư, thì tài khoảnKey của tài khoản được cập nhật bằng phiên bản `AccountKeyPublic`. Nếu tham số tài khoảnKey là một mảng có nhiều chuỗi khóa riêng tư, thì tài khoảnKey của tài khoản được cập nhật bằng phiên bản `AccountKeyMultiSig`. Nếu tham số tài khoảnKey là một đối tượng có các khóa được xác định theo vai trò, thì tài khoảnKey của tài khoản được cập nhật bằng phiên bản `AccountKeyRoleBased`.

**LƯU Ý**: Hàm này chỉ thay đổi thông tin được lưu trữ trong ví của caver-js. Hàm này không ảnh hưởng đến thông tin quan trọng được lưu trữ trên mạng lưới Klaytn. Có thể thay đổi các khóa trong mạng lưới Klaytn bằng cách gửi một giao dịch ['ACCOUNT_UPDATE'](./caver.klay/transaction/sendtx-account-update.md#sendtransaction-account_update).

**LƯU Ý** `caver.klay.tài khoảns.wallet.updateAccountKey` được hỗ trợ kể từ caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**Tham số**

| Tên          | Loại                              | Mô tả                                                                                                                                                                                                                                   |
| ------------ | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address      | Chuỗi                              | Địa chỉ tài khoản trong ví.                                                                                                                                                                                                             |
| tài khoảnKey | Chuỗi \| Mảng \| Đối tượng | Phiên bản AccountKey (`AccountKeyPublic`, `AccountKeyMultiSig` hoặc `AccountKeyRoleBased`) hoặc cấu trúc dữ liệu chứa thông tin khóa (chuỗi khóa riêng tư, mảng chuỗi khóa riêng tư hoặc một đối tượng xác định khóa cho từng vai trò). |


**Giá trị trả về**

| Loại     | Mô tả                                                                                             |
| --------- | ------------------------------------------------------------------------------------------------- |
| Đối tượng | Phiên bản tài khoản với tài khoảnKey mới. Phiên bản Tài khoản nằm trong ví caver-js trong bộ nhớ. |


**Ví dụ**

```javascript
// Cập nhật lên AccountKeyPublic bằng chuỗi khóa riêng tư
> caver.klay.tài khoảns.wallet.updateAccountKey('0xf2e2565629c7763dc0b595e8e531a31371a95f95', '0x{private key}')
Account {
    address: [Getter/Setter],
    tài khoảnKey: [Getter/Setter],
    privateKey: [Getter/Setter],
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey],
    index: 0
}

// Cập nhật lên AccountKeyMultiSig với một loạt các chuỗi khóa riêng tư
> caver.klay.tài khoảns.wallet.updateAccountKey('0xf2e2565629c7763dc0b595e8e531a31371a95f95', ['0x{private key}', '0x{private key}', '0x{private key}'])
Account {
    address: [Getter/Setter],
    tài khoảnKey: [Getter/Setter],
    privateKey: [Getter/Setter],
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey],
    index: 0
}

// Cập nhật lên AccountKeyRoleBased với đối tượng xác định khóa theo vai trò
> caver.klay.tài khoảns.wallet.updateAccountKey('0x2F66043C35e2389dA0B5401c3C592b2002d60bAc', {
    transactionKey: '0x1e9c7960af2f1ed4b4ceff012b1eb2c1d31e57c9d52c5e9814d35a71726f02ed',
    updateKey: ['0x3ceef924ce849bc243f2df92ae2ac7105182a4ccfcab5df6978280643dad5f3b', '0x655594f750be408b44582d36362e364565644c5974a8eba44e00f91f7274329e'],
    feePayerKey: '0xf0089574637af59838755588f622ac12e7e8c1156aae928e1a1af2cd62736924'
})
Account {
    address: [Getter/Setter],
    tài khoảnKey: [Getter/Setter],
    privateKey: [Getter/Setter],
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey],
    index: 0
}
```
