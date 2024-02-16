# Account

## defaultAccount <a id="defaultaccount"></a>

```javascript
caver.klay.defaultAccount
```

Địa chỉ mặc định này được dùng làm thuộc tính `from` mặc định nếu không có thuộc tính `from` nào được chỉ định trong các tham số của các phương pháp sau đây:
property is specified in parameters of the following methods:

- [caver.klay.sendTransaction()](./transaction/sendtx-legacy.md#sendtransaction-legacy)
- [caver.klay.call()](./transaction/transaction.md#call)
- [new caver.klay.Contract()](../caver.klay.Contract.md#new-contract) -> [myContract.methods.myMethod().call()](../caver.klay.Contract.md#methods-mymethod-call)
- [new caver.klay.Contract()](../caver.klay.Contract.md#new-contract) -> [myContract.methods.myMethod().send()](../caver.klay.Contract.md#methods-mymethod-send)

**Thuộc tính**

`String` 20 byte - Địa chỉ Klaytn bất kỳ.  Bạn cần có khóa riêng tư của địa chỉ đó ở trong nút mạng hoặc hệ thống lưu trữ khóa của bạn.
that address in your node or keystore.  Địa chỉ mặc định là `undefined`.

**Ví dụ**

```javascript
> caver.klay.defaultAccount;
undefined

// set the default account
> caver.klay.defaultAccount = '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe';
```

## tài khoảnCreated <a id="accountcreated"></a>

```javascript
caver.klay.accountCreated(address [, defaultBlock] [, callback])
```

Hàm sẽ trả về giá trị `true` nếu tài khoản liên kết với địa chỉ được tạo. Nếu không hàm sẽ trả về `false`.

**LƯU Ý** Hàm tài khoảnCreated kiểm tra xem tài khoản có tồn tại trên mạng hay không, do đó ngay cả khi cặp khóa được tạo, nếu tài khoản khớp với địa chỉ không tồn tại trên mạng chuỗi khối thực tế, hàm sẽ trả về giá trị false.

**Tham số**

| Tên          | type        | Mô tả                                                                                                                                                                               |
| ------------ | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address      | Chuỗi       | Địa chỉ của tài khoản mà bạn muốn truy vấn xem tài khoản đã được tạo trong mạng hay chưa.                                                                                           |
| defaultBlock | Số \| Chuỗi | (tùy chọn) Nếu bạn truyền tham số này thì tham số này sẽ không sử dụng khối mặc định được thiết lập bằng hàm [caver.klay.defaultBlock](./block.md#defaultblock). |
| callback     | Hàm         | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai.                                                  |

**Giá trị trả về**

`Promise` trả về `Boolean` - Tồn tại địa chỉ đầu vào.

**Ví dụ**

```javascript
> caver.klay.accountCreated('0x7e6ea9e6f24567cd9edb92e6e2d9b94bdae8a47f').then(console.log);
true

> caver.klay.accountCreated('0x6a616d696e652e6b6c6179746t00000000000000').then(console.log);
false
```

## getAccount <a id="getaccount"></a>

```javascript
caver.klay.getAccount(address[, defaultBlock] [, callback])
```

Trả về thông tin tài khoản của một địa chỉ cho trước. Có hai loại tài khoản trong Klaytn: Tài khoản sở hữu bên ngoài (EOA) và Tài khoản hợp đồng thông minh. Xem phần [Tài khoản Klaytn](../../../../../learn/accounts.md#klaytn-accounts).

**LƯU Ý** Hàm getAccount trả về tài khoản tồn tại trong mạng, do đó ngay cả khi cặp khóa được tạo, nếu tài khoản khớp với địa chỉ không tồn tại trên mạng chuỗi khối thực tế, hàm sẽ trả về giá trị null.

**Tham số**

| Tên          | Loại       | Mô tả                                                                                                                                                                               |
| ------------ | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address      | Chuỗi       | Địa chỉ của tài khoản mà bạn muốn có thông tin tài khoản.                                                                                                                           |
| defaultBlock | Số \| Chuỗi | (tùy chọn) Nếu bạn truyền tham số này thì tham số này sẽ không sử dụng khối mặc định được thiết lập bằng hàm [caver.klay.defaultBlock](./block.md#defaultblock). |
| callback     | Hàm         | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai.                                                  |

**Giá trị trả về**

`Promise` trả về một đối tượng JSON - Một đối tượng JSON chứa thông tin tài khoản.

**Ví dụ**

```javascript
> caver.klay.getAccount('0x52791fcf7900a64a6bcab8b89a78ae4cc60da01c').then(console.log);
{ 
  accType: 1,
  account:
  { 
     nonce: 3,
     balance: '0x446c3b15f9926687c8e202d20c14b7ffe02e7e3000',
     humanReadable: false,
     key: { keyType: 1, key: {} } 
  } 
}

> caver.klay.getAccount('0x52791fcf7900a64a6bcab8b89a78ae4cc60da01c', 'latest').then(console.log);
{ 
  accType: 1,
  account:
  { 
     nonce: 3,
     balance: '0x446c3b15f9926687c8e202d20c14b7ffe02e7e3000',
     humanReadable: false,
     key: { keyType: 1, key: {} } 
  } 
}
```

## getAccounts <a id="getaccounts"></a>

```javascript
caver.klay.getAccounts([callback])
```

Trả về danh sách các tài khoản mà nút kiểm soát.

**Tham số**

| Tên      | type | Mô tả                                                                                                                              |
| -------- | ---- | ---------------------------------------------------------------------------------------------------------------------------------- |
| callback | Hàm  | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `Array` - Mảng các địa chỉ mà nút kiểm soát.

**Ví dụ**

```javascript
> caver.klay.getAccounts().then(console.log);
["0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe", "0xDCc6960376d6C6dEa93647383FfB245CfCed97Cf"]
```

## getAccountKey <a id="getaccountkey"></a>

```javascript
caver.klay.getAccountKey(address [, defaultBlock] [, callback])
```

Trả về mã khóa tài khoản của Tài khoản sở hữu bên ngoài (EOA) của địa chỉ cho trước. Nếu tài khoản có AccountKeyLegacy hoặc tài khoản của địa chỉ đã cho là Tài khoản hợp đồng thông minh, hàm sẽ trả về một giá trị mã khóa trống. Xem phần [Khóa tài khoản](../../../../../learn/accounts.md#account-key).

**LƯU Ý** Hàm getAccountKey trả về mã khóa tài khoản nếu tài khoản tồn tại trên mạng, do đó ngay cả khi cặp khóa được tạo, nếu tài khoản khớp với địa chỉ không tồn tại trên mạng chuỗi khối thực tế, hàm sẽ trả về giá trị null.

**Tham số**

| Tên          | Loại       | Mô tả                                                                                                                                                                               |
| ------------ | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address      | Chuỗi       | Địa chỉ của tài khoản mà bạn muốn có mã khóa tài khoản.                                                                                                                             |
| defaultBlock | Số \| Chuỗi | (tùy chọn) Nếu bạn truyền tham số này thì tham số này sẽ không sử dụng khối mặc định được thiết lập bằng hàm [caver.klay.defaultBlock](./block.md#defaultblock). |
| callback     | Hàm         | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai.                                                  |

**Giá trị trả về**

`Promise` trả về `Object` - Khóa tài khoản bao gồm (các) khóa công khai và loại khóa.

**Ví dụ**

```javascript
// AccountKey type: AccountKeyLegacy
> caver.klay.getAccountKey('0x7e6ea9e6f24567cd9edb92e6e2d9b94bdae8a47f').then(console.log);
{ keyType: 1, key: {} }

// AccountKey type: AccountKeyPublic
> caver.klay.getAccountKey('0xe1be6edd35b68cbf69fe9376ed7320476cf18b5c').then(console.log);
{
  keyType: 2,
  key:{
    x:'0xb9a4b266083c05deb3ce95055510c34c84b8bb2ad1e0a687fafaf15118511e59',
    y:'0x7a28526d3d076d019f8856a56f1fefff33c6100e9f3a190e85d9c754aae7513d'
  }
}

// AccountKey type: AccountKeyFail
> caver.klay.getAccountKey('0xf6d69a7a006d7ab2dcef79195698f6c30895e7d5').then(console.log);
{
  keyType: 3,
  key:{}
}

// AccountKey type: AccountKeyWeightedMultiSig
> caver.klay.getAccountKey('0x676b02b1cb59bd86577f15ff17fb0d59d8ca1ab6').then(console.log);
{
  keyType: 4,
  key: {
    threshold: 2,
    keys: [
      {
        weight: 1,
        key: {
          x: '0xae6b72d7ce2c11520ac00cbd1c4da216171a96eae1ae3a0a1f979a554c9063ae',
          y: '0x79ddf38c8717030512f3ca6f304408a3beb51519b918b8d62a55ff4a8c165fea'
        }
      },
      {
        weight: 1,
        key: {
          x: '0xd4256fc43f42b3313b7204e42a82893a8d9b562f6c9b39456ee989339949c67c',
          y: '0xfc5e78e71b26f5a93b5bec454e4d63947576ffd23b4df624579ff4eb67a2a29b'
        }
      },
      {
        weight: 1,
        key: {
          x: '0xd653eae5f0e9cd6bfe4c3929f4c4f28c94f3bd183eafafee2d73db38a020d9d8',
          y: '0xe974e859b5be80755dedaebe937ac49800cbac483ca304179050a177e9ca0270'
        }
      }
    ]
  }
}

// AccountKey type: AccountKeyRoleBased
> caver.klay.getAccountKey('0x73436db2404853b41e4398d3cf094f1cce57f3bd').then(console.log);
{
  keyType: 5,
  key: [
      {
        key: {
          x: '0x819659d4f08e08d4bd97c6ce5ed2c2eb914201a5b3731eb9d208128df24b97dd',
          y: '0x1824267ab9e55f5a3fb1030f0299fa73fc0037305d5b1d90100e2131af41c010'
        },
        keyType: 2
      },
      {
        key: {
          x: '0x73363604ca8776a2883b02046361b7eb6bd11f4fc10700ee51c525bcded134c1',
          y: '0xfc3e3cb3f4f5b709df5a2075107bc73c8618440c08456bafc44ee6f27f9e6326'
        },
        keyType: 2
      },
      {
        key: {
          x: '0x95c920eb2571dff37baecdbbee32897e6e448c6725c5ab73569cc6f659684307',
          y: '0xef7839023c48acf710ad322356c12b7c5b7f475515ba7d5834f41a993f42b8f9'
        },
        keyType: 2
      }
  ]
}
```

## getBalance <a id="getbalance"></a>

```javascript
caver.klay.getBalance(address [, defaultBlock] [, callback])
```

Lấy số dư của một địa chỉ tại một khối nhất định.

**Tham số**

| Tên          | Loại       | Mô tả                                                                                                                                                                               |
| ------------ | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address      | Chuỗi       | Địa chỉ để nhận số dư.                                                                                                                                                              |
| defaultBlock | Số \| Chuỗi | (tùy chọn) Nếu bạn truyền tham số này thì tham số này sẽ không sử dụng khối mặc định được thiết lập bằng hàm [caver.klay.defaultBlock](./block.md#defaultblock). |
| callback     | Hàm         | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai.                                                  |

**Giá trị trả về**

`Promise` trả về `String` - Số dư hiện tại của địa chỉ đã cho tính bằng đơn vị peb.

**Ví dụ**

```javascript
> caver.klay.getBalance("0x407d73d8a49eeb85d32cf465507dd71d507100c1").then(console.log);
"1000000000000"
```

## getCode <a id="getcode"></a>

```javascript
caver.klay.getCode(address [, defaultBlock] [, callback])
```

Lấy mã tại một địa chỉ cụ thể.

**Tham số**

| Tên          | type        | Mô tả                                                                                                                                                                               |
| ------------ | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address      | Chuỗi       | Địa chỉ để nhận số dư từ đó.                                                                                                                                                        |
| defaultBlock | Số \| Chuỗi | (tùy chọn) Nếu bạn truyền tham số này thì tham số này sẽ không sử dụng khối mặc định được thiết lập bằng hàm [caver.klay.defaultBlock](./block.md#defaultblock). |
| callback     | Hàm         | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai.                                                  |

**Giá trị trả về**

`Promise` trả về `String` - Dữ liệu ở địa chỉ đã cho `address`.

**Ví dụ**

```javascript
> caver.klay.getCode("0xd5677cf67b5aa051bb40496e68ad359eb97cfbf8").then(console.log);
"0x600160008035811a818181146012578301005b601b6001356025565b8060005260206000f25b600060078202905091905056"

```

## getTransactionCount <a id="gettransactioncount"></a>

```javascript
caver.klay.getTransactionCount(address [, blockNumber] [, callback])
```

Nhận số lượng giao dịch đã gửi từ địa chỉ này.

**Tham số**

| Tên         | Loại       | Mô tả                                                                                                                                                                                                                                          |
| ----------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address     | Chuỗi       | Địa chỉ để nhận số lượng giao dịch từ đó.                                                                                                                                                                                                      |
| blockNumber | số \| chuỗi | (tùy chọn) Số khối, chuỗi `pending` để lấy số dùng một lần đang chờ xử lý hoặc chuỗi `earliest` hoặc `latest` giống như trong [tham số khối mặc định](./block.md#defaultblock). Nếu bỏ qua, chuỗi `latest` sẽ được sử dụng. |
| callback    | Hàm         | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai.                                                                                                             |

**Giá trị trả về**

| Loại | Mô tả                                           |
| ----- | ----------------------------------------------- |
| Số    | Số lượng giao dịch đã gửi từ địa chỉ nhất định. |

**Ví dụ**

```javascript
> caver.klay.getTransactionCount("0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe")
  .then(console.log);
1
```

## isContractAccount <a id="iscontractaccount"></a>

```javascript
caver.klay.isContractAccount(address [, defaultBlock] [, callback])
```

Trả về `true` nếu tài khoản đầu vào có codeHash không trống vào thời điểm có số khối cụ thể. Trả về `false` nếu tài khoản là EOA hoặc tài khoản hợp đồng thông minh không có codeHash.

**Tham số**

| Tên          | Loại       | Mô tả                                                                                                                                                                               |
| ------------ | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address      | Chuỗi       | Địa chỉ của tài khoản mà bạn muốn kiểm tra thuộc tính isContractAccount.                                                                                                            |
| defaultBlock | Số \| Chuỗi | (tùy chọn) Nếu bạn truyền tham số này thì tham số này sẽ không sử dụng khối mặc định được thiết lập bằng hàm [caver.klay.defaultBlock](./block.md#defaultblock). |
| callback     | Hàm         | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai.                                                  |

**Giá trị trả về**

`Promise` trả về `Boolean` - `true` nghĩa là tham số đầu vào là địa chỉ hợp đồng thông minh hiện có.

**Ví dụ**

```javascript
> caver.klay.isContractAccount('0x7e6ea9e6f24567cd9edb92e6e2d9b94bdae8a47f').then(console.log);
true

> caver.klay.isContractAccount('0x407d73d8a49eeb85d32cf465507dd71d507100c1').then(console.log);
false
```

## ký <a id="sign"></a>

```javascript
caver.klay.sign(message, address [, callback])
```

Tạo dữ liệu đã ký cụ thể cho mạng lưới Klaytn. Tham khảo [API Nền tảng Klaytn - klay_sign](../../../../../references/json-rpc/klay/account.md#klay_sign) để biết cách tạo chữ ký.

**LƯU Ý**: API này hỗ trợ chức năng ký thông báo bằng cách sử dụng tài khoản đã tồn tại trên nút của bạn. Tài khoản trong nút phải ở trạng thái mở khóa để ký thông báo. Sử dụng hàm [caver.klay.signTransaction](./transaction/transaction.md#signtransaction) để ký giao dịch.

**Tham số**

| Tên       | type  | Mô tả                                                                                                                              |
| --------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------- |
| thông báo | Chuỗi | Thông báo cần ký.                                                                                                                  |
| address   | Chuỗi | Địa chỉ của tài khoản dùng để ký thông báo.                                                                                        |
| callback  | Hàm   | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `String` - Chữ ký thông báo được ký bằng khóa riêng tư của tài khoản.

**Ví dụ**

```javascript
> caver.klay.sign('Message to sign', '0x1427ac5d0f1c3174ee6ea05d29a9b05fd31d7579').then(console.log)
0xde8bd2f5a45de6b1baea57ed0219735ab60f0ef55c5e31a4b774824abea31bfc34c8bdbca43ed4155e8e6a8e0d11d7aba191ba025e0487ada2bcc422252b81591b
```
