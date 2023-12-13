---
sidebar_label: Basic
---

# Lớp giao dịch cơ bản

## LegacyTransaction <a id="legacytransaction"></a>

```javascript
caver.transaction.legacyTransaction.create(transactionObject)
```

`LegacyTransaction` biểu thị một [giao dịch cũ](../../../../../learn/transactions/basic.md#txtypelegacytransaction). [Tài khoản Klaytn](../../../../../learn/accounts.md#klaytn-accounts) có thể thực thi `LegacyTransaction` chỉ bằng [AccountKeyLegacy (Khóa tài khoản cũ)]. `transactionObject` có thể có các thuộc tính dưới đây để tạo `LegacyTransaction`.

`LegacyTransaction` có các thuộc tính sau đây giống như các biến thành viên. Thuộc tính được đánh dấu là `optional` nghĩa là các thuộc tính được tùy ý đưa ra trong `transactionObject` khi người dùng tạo `LegacyTransaction`.

:::note

LƯU Ý: Bạn có thể tạo một phiên bản `LegacyTransaction` từ chuỗi mã hóa RLP. Hãy xem ví dụ dưới đây. LƯU Ý: `caver.transaction.legacyTransaction.create` được hỗ trợ kể từ phiên bản caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1).

LƯU Ý: Kể từ phiên bản caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4), tính năng tạo giao dịch chỉ được hỗ trợ bằng cách sử dụng hàm `create`. Nếu bạn đang tạo giao dịch bằng cách sử dụng hàm tạo như `new caver.transaction.legacyTransaction({...})`, vui lòng đổi thành `caver.transaction.legacyTransaction.create({...})`.

:::

**thuộc tính**

| Tên     | type  | Mô tả                                                                                                                                                                                                                                       |
| ------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| gas     | chuỗi | Giá trị phí giao dịch tối đa mà giao dịch được phép sử dụng.                                                                                                                                                                                |
| giá trị | chuỗi | (tùy chọn, mặc định: `'0x0'`) Số lượng KLAY tính bằng peb sẽ được chuyển. Bạn có thể sử dụng hàm `caver.utils.toPeb`.                                                                                                                       |
| từ      | chuỗi | (tùy chọn) Địa chỉ của người gửi. Nếu bỏ qua tham số này, địa chỉ của keyring được sử dụng để ký sẽ được thiết lập.                                                                                                                         |
| đến     | chuỗi | (tùy chọn, mặc định: `'0x'`) Địa chỉ tài khoản sẽ nhận giá trị được chuyển hoặc địa chỉ hợp đồng thông minh nếu giao dịch cũ thực thi hợp đồng thông minh. Nếu một giao dịch cũ triển khai hợp đồng thông minh thì không cần xác định `to`. |
| nhập    | chuỗi | (tùy chọn) Dữ liệu gắn kèm giao dịch, dùng để triển khai/thực thi hợp đồng thông minh.                                                                                                                                                      |
| chữ ký  | Mảng  | (tùy chọn) Mảng các chữ ký. Một giao dịch cũ có thể chỉ có một chữ ký.                                                                                                                                                                      |
| nonce   | chuỗi | (tùy chọn) Giá trị dùng để định danh duy nhất cho một giao dịch của người gửi. Nếu bỏ qua tham số này, `caver.rpc.klay.getTransactionCount(address, 'pending')` sẽ được sử dụng để thiết lập số dùng một lần.                               |
| giá gas | chuỗi | (tùy chọn) Một tham số nhân để tính toán số lượng token mà người gửi sẽ thanh toán. Nếu bỏ qua tham số này, `caver.rpc.klay.getGasPrice` sẽ được sử dụng để thiết lập giá gas.                                                              |
| chainId | chuỗi | (tùy chọn) Mã chuỗi của mạng lưới Klaytn. Nếu bỏ qua tham số này, `caver.rpc.klay.getChainId` sẽ được sử dụng để thiết lập mã chuỗi.                                                                                                        |

**Ví dụ**

```javascript
// Tạo một giao dịch Legacy để gửi KLAY
> caver.transaction.legacyTransaction.create({
    to: '0x9957dfd92e4b70f91131c573293343bc5f21f215',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 25000,
})

// Tạo một giao dịch Legacy để triển khai hợp đồng thông minh
> caver.transaction.legacyTransaction.create({
    input: '0x60806...',
    gas: 200000,
})

// Tạo một giao dịch Legacy để thực thi hợp đồng thông minh
> caver.transaction.legacyTransaction.create({
    to: '0xfe6c9118e56a42cbc77aa3b7ee586455e3dc5b6d', // Smart contact address
    input: '0xa9059...',
    gas: 200000,
})

// Tạo một giao dịch Legacy từ chuỗi mã hóa RLP
> caver.transaction.legacyTransaction.create('0xf8668204d219830f4240947b65b75d204abed71587c9e519a89277766ee1d00a843132333425a0b2a5a15550ec298dc7dddde3774429ed75f864c82caeb5ee24399649ad731be9a029da1014d16f2011b3307f7bbe1035b6e699a4204fc416c763def6cefd976567')
LegacyTransaction {
    _type: 'TxTypeLegacyTransaction',
    _from: '0x',
    _gas: '0xf4240',
    _nonce: '0x4d2',
    _gasPrice: '0x19',
    _signatures: SignatureData { _v: '0x25', _r: '0xb2a5a...', _s:  '0x29da1...' },
    _to: '0x7b65b75d204abed71587c9e519a89277766ee1d0',
    _input: '0x31323334',
    _value: '0xa'
}
```

## ValueTransfer <a id="valuetransfer"></a>

```javascript
caver.transaction.valueTransfer.create(transactionObject)
```

`ValueTransfer` biểu thị một [giao dịch chuyển giá trị](../../../../../learn/transactions/basic.md#txtypevaluetransfer). `transactionObject` có thể có các thuộc tính dưới đây để tạo giao dịch `ValueTransfer`.

`ValueTransfer` có các thuộc tính sau đây giống như các biến thành viên. Thuộc tính được đánh dấu là `optional` nghĩa là các thuộc tính được tùy ý đưa ra trong `transactionObject` khi người dùng tạo giao dịch `ValueTransfer`.

:::note

LƯU Ý: Bạn có thể tạo một đối tượng `ValueTransfer` từ chuỗi mã hóa RLP. Hãy xem ví dụ dưới đây. LƯU Ý: `caver.transaction.valueTransfer.create` được hỗ trợ kể từ phiên bản caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1).

LƯU Ý: Kể từ phiên bản caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4), tính năng tạo giao dịch chỉ được hỗ trợ bằng cách sử dụng hàm `create`. Nếu bạn đang tạo giao dịch bằng cách sử dụng hàm tạo như `new caver.transaction.valueTransfer({...})`, vui lòng đổi thành `caver.transaction.valueTransfer.create({...})`.

:::

**thuộc tính**

| Tên     | Loại | Mô tả                                                                                                                                                                                                         |
| ------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| giá trị | chuỗi | Số lượng KLAY tính bằng peb sẽ được chuyển. Bạn có thể sử dụng hàm `caver.utils.toPeb`.                                                                                                                       |
| từ      | chuỗi | Địa chỉ của người gửi.                                                                                                                                                                                        |
| đến     | chuỗi | Địa chỉ tài khoản sẽ nhận giá trị được chuyển.                                                                                                                                                                |
| gas     | chuỗi | Giá trị phí giao dịch tối đa mà giao dịch được phép sử dụng.                                                                                                                                                  |
| chữ ký  | Mảng  | (tùy chọn) Mảng các chữ ký.                                                                                                                                                                                   |
| nonce   | chuỗi | (tùy chọn) Giá trị dùng để định danh duy nhất cho một giao dịch của người gửi. Nếu bỏ qua tham số này, `caver.rpc.klay.getTransactionCount(address, 'pending')` sẽ được sử dụng để thiết lập số dùng một lần. |
| giá gas | chuỗi | (tùy chọn) Một tham số nhân để tính toán số lượng token mà người gửi sẽ thanh toán. Nếu bỏ qua tham số này, `caver.rpc.klay.getGasPrice` sẽ được sử dụng để thiết lập giá gas.                                |
| chainId | chuỗi | (tùy chọn) Mã chuỗi của mạng lưới Klaytn. Nếu bỏ qua tham số này, `caver.rpc.klay.getChainId` sẽ được sử dụng để thiết lập mã chuỗi.                                                                          |

**Ví dụ**

```javascript
// Tạo một giao dịch valueTransfer
> caver.transaction.valueTransfer.create({
    from: '0x{address in hex}',
    to: '0x9957dfd92e4b70f91131c573293343bc5f21f215',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 25000,
})

// Tạo một giao dịch valueTransfer từ chuỗi mã hóa RLP
> caver.transaction.valueTransfer.create('0x08f87f3a8505d21dba0083015f90948723590d5d60e35f7ce0db5c09d3938b26ff80ae01947d0104ac150f749d36bb34999bcade9f2c0bd2e6f847f845820feaa03d820b27d0997baf16f98df01c7b2b2e9734ad05b2228c4d403c2facff8397f3a01f4a44eeb8b7f0b0019162d1d6b90c401078e56fcd7495e74f7cfcd37e25f017')
ValueTransfer {
    _type: 'TxTypeValueTransfer',
    _from: '0x7d0104ac150f749d36bb34999bcade9f2c0bd2e6',
    _gas: '0x15f90',
    _nonce: '0x3a',
    _gasPrice: '0x5d21dba00',
    _signatures: [ SignatureData { _v: '0x0fea', _r: '0x3d820...', _s: '0x1f4a4...' } ],
    _to: '0x8723590d5d60e35f7ce0db5c09d3938b26ff80ae',
    _value: '0x1'
}
```

## ValueTransferMemo <a id="valuetransfermemo"></a>

```javascript
caver.transaction.valueTransferMemo.create(transactionObject)
```

`ValueTransferMemo` biểu thị một [giao dịch chuyển giá trị kèm ghi chú](../../../../../learn/transactions/basic.md#txtypevaluetransfermemo). `transactionObject` có thể có các thuộc tính dưới đây để tạo giao dịch `ValueTransferMemo`.

`ValueTransferMemo` có các thuộc tính sau đây giống như các biến thành viên. Thuộc tính được đánh dấu là `optional` nghĩa là các thuộc tính được tùy ý đưa ra trong `transactionObject` khi người dùng tạo giao dịch `ValueTransferMemo`.

:::note

LƯU Ý: Bạn có thể tạo một đối tượng `ValueTransferMemo` từ chuỗi mã hóa RLP. Hãy xem ví dụ dưới đây. LƯU Ý: `caver.transaction.valueTransferMemo.create` được hỗ trợ kể từ phiên bản caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1).

LƯU Ý: Kể từ phiên bản caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4), tính năng tạo giao dịch chỉ được hỗ trợ bằng cách sử dụng hàm `create`. Nếu bạn đang tạo giao dịch bằng cách sử dụng hàm tạo như `new caver.transaction.valueTransferMemo({...})`, vui lòng đổi thành `caver.transaction.valueTransferMemo.create({...})`.

:::

**thuộc tính**

| Tên     | type  | Mô tả                                                                                                                                                                                                         |
| ------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| giá trị | chuỗi | Số lượng KLAY tính bằng peb sẽ được chuyển. Bạn có thể sử dụng hàm `caver.utils.toPeb`.                                                                                                                       |
| từ      | chuỗi | Địa chỉ của người gửi.                                                                                                                                                                                        |
| đến     | chuỗi | Địa chỉ tài khoản sẽ nhận giá trị được chuyển.                                                                                                                                                                |
| nhập    | chuỗi | Dữ liệu gắn kèm theo giao dịch. Thông điệp cần được truyền vào thuộc tính này.                                                                                                                                |
| gas     | chuỗi | Giá trị phí giao dịch tối đa mà giao dịch được phép sử dụng.                                                                                                                                                  |
| chữ ký  | Mảng  | (tùy chọn) Mảng các chữ ký.                                                                                                                                                                                   |
| nonce   | chuỗi | (tùy chọn) Giá trị dùng để định danh duy nhất cho một giao dịch của người gửi. Nếu bỏ qua tham số này, `caver.rpc.klay.getTransactionCount(address, 'pending')` sẽ được sử dụng để thiết lập số dùng một lần. |
| giá gas | chuỗi | (tùy chọn) Một tham số nhân để tính toán số lượng token mà người gửi sẽ thanh toán. Nếu bỏ qua tham số này, `caver.rpc.klay.getGasPrice` sẽ được sử dụng để thiết lập giá gas.                                |
| chainId | chuỗi | (tùy chọn) Mã chuỗi của mạng lưới Klaytn. Nếu bỏ qua tham số này, `caver.rpc.klay.getChainId` sẽ được sử dụng để thiết lập mã chuỗi.                                                                          |

**Ví dụ**

```javascript
// Tạo một giao dịch valueTransferMemo
> caver.transaction.valueTransferMemo.create({
    from: '0x{address in hex}',
    to: '0x9957dfd92e4b70f91131c573293343bc5f21f215',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 25000,
    input: '0x68656c6c6f',
})

// Tạo một giao dịch valueTransferMemo từ chuỗi mã hóa RLP
> caver.transaction.valueTransferMemo.create('0x10f8808204d219830f4240947b65b75d204abed71587c9e519a89277766ee1d00a94a94f5374fce5edbc8e2a8697c15331677e6ebf0b8568656c6c6ff845f84325a07d2b0c89ee8afa502b3186413983bfe9a31c5776f4f820210cffe44a7d568d1ca02b1cbd587c73b0f54969f6b76ef2fd95cea0c1bb79256a75df9da696278509f3')
ValueTransferMemo {
    _type: 'TxTypeValueTransferMemo',
    _from: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
    _gas: '0xf4240',
    _nonce: '0x4d2',
    _gasPrice: '0x19',
    _signatures: [ SignatureData { _v: '0x25', _r: '0x7d2b0...', _s: '0x2b1cb...' } ],
    _to: '0x7b65b75d204abed71587c9e519a89277766ee1d0',
    _value: '0xa',
    _input: '0x68656c6c6f'
}
```

## AccountUpdate <a id="accountupdate"></a>

```javascript
caver.transaction.tài khoảnUpdate.create(transactionObject)
```

`AccountUpdate` biểu thị một [giao dịch cập nhật tài khoản](../../../../../learn/transactions/basic.md#txtypeaccountupdate). `transactionObject` có thể có các thuộc tính dưới đây để tạo giao dịch `AccountUpdate`.

`AccountUpdate` có các thuộc tính sau đây giống như các biến thành viên. Thuộc tính được đánh dấu là `optional` nghĩa là các thuộc tính được tùy ý đưa ra trong `transactionObject` khi người dùng tạo giao dịch `AccountUpdate`.


:::note

LƯU Ý: Bạn có thể tạo một đối tượng `AccountUpdate` từ chuỗi mã hóa RLP. Hãy xem ví dụ dưới đây. LƯU Ý: `caver.transaction.tài khoảnUpdate.create` được hỗ trợ kể từ phiên bản caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1).

LƯU Ý: Kể từ phiên bản caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4), tính năng tạo giao dịch chỉ được hỗ trợ bằng cách sử dụng hàm `create`. Nếu bạn đang tạo giao dịch bằng cách sử dụng hàm tạo như `new caver.transaction.tài khoảnUpdate({...})`, vui lòng đổi thành `caver.transaction.tài khoảnUpdate.create({...})`.

:::

**thuộc tính**

| Tên       | Loại         | Mô tả                                                                                                                                                                                                         |
| --------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| từ        | chuỗi         | Địa chỉ của người gửi.                                                                                                                                                                                        |
| tài khoản | [Tài khoản][] | Một đối tượng [Tài khoản][] chứa các thông tin cần thiết để cập nhật tài khoản của bạn.                                                                                                                       |
| gas       | chuỗi         | Giá trị phí giao dịch tối đa mà giao dịch được phép sử dụng.                                                                                                                                                  |
| chữ ký    | Mảng          | (tùy chọn) Mảng các chữ ký.                                                                                                                                                                                   |
| nonce     | chuỗi         | (tùy chọn) Giá trị dùng để định danh duy nhất cho một giao dịch của người gửi. Nếu bỏ qua tham số này, `caver.rpc.klay.getTransactionCount(address, 'pending')` sẽ được sử dụng để thiết lập số dùng một lần. |
| giá gas   | chuỗi         | (tùy chọn) Một tham số nhân để tính toán số lượng token mà người gửi sẽ thanh toán. Nếu bỏ qua tham số này, `caver.rpc.klay.getGasPrice` sẽ được sử dụng để thiết lập giá gas.                                |
| chainId   | chuỗi         | (tùy chọn) Mã chuỗi của mạng lưới Klaytn. Nếu bỏ qua tham số này, `caver.rpc.klay.getChainId` sẽ được sử dụng để thiết lập mã chuỗi.                                                                          |

Để biết cách tạo một đối tượng [Tài khoản][] cho mỗi `AccountKey`, hãy tham khảo [Bắt đầu - Cập nhật tài khoản](../../get-started.md#account-update) hoặc [caver.tài khoản.create](../caver.account.md#caver-account-create).

**Ví dụ**

```javascript
// Tạo giao dịch tài khoảnUpdate
> caver.transaction.tài khoảnUpdate.create({
    from: '0x{address in hex}',
    gas: 50000,
    tài khoản: caver.tài khoản.createWithAccountKeyLegacy('0x{address in hex}'),
})

// Tạo giao dịch tài khoảnUpdate từ chuỗi mã hóa RLP
> caver.transaction.tài khoảnUpdate.create('0x20f88d808505d21dba0083030d4094ffb52bc54635f840013e142ebe7c06c9c91c1625a302a102c93fcbdb2b9dbef8ee5c4748ffdce11f1f5b06d7ba71cc2b7699e38be7698d1ef847f845820fe9a09c2ca281e94567846acbeef724b1a7a5f882d581aff9984755abd92272592b8ea0344fd23d7774ae9c227809bb579387dfcd69e74ae2fe3a788617f54a4001e5ab')
AccountUpdate {
    _type: 'TxTypeAccountUpdate',
    _from: '0xffb52bc54635f840013e142ebe7c06c9c91c1625',
    _gas: '0x30d40',
    _nonce: '0x0',
    _gasPrice: '0x5d21dba00',
    _signatures: [ SignatureData { _v: '0x0fe9', _r: '0x9c2ca...', _s: '0x344fd...' } ],
    _tài khoản: Account {
        _address: '0xffb52bc54635f840013e142ebe7c06c9c91c1625',
        _tài khoảnKey: AccountKeyPublic { _publicKey: '0x02c93...' } 
    }
}
```

## SmartContractDeploy <a id="smartcontractdeploy"></a>

```javascript
caver.transaction.smartContractDeploy.create(transactionObject)
```

`SmartContractDeploy` biểu thị một [giao dịch triển khai hợp đồng thông minh](../../../../../learn/transactions/basic.md#txtypesmartcontractdeploy). `transactionObject` có thể có các thuộc tính dưới đây để tạo giao dịch `SmartContractDeploy`.

`SmartContractDeploy` có các thuộc tính sau đây giống như các biến thành viên. Thuộc tính được đánh dấu là `optional` nghĩa là các thuộc tính được tùy ý đưa ra trong `transactionObject` khi người dùng tạo giao dịch `SmartContractDeploy`.

:::note

LƯU Ý: Bạn có thể tạo một đối tượng `SmartContractDeploy` từ chuỗi mã hóa RLP. Hãy xem ví dụ dưới đây. LƯU Ý: `caver.transaction.smartContractDeploy.create` được hỗ trợ kể từ phiên bản caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1).

LƯU Ý: Kể từ phiên bản caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4), tính năng tạo giao dịch chỉ được hỗ trợ bằng cách sử dụng hàm `create`. Nếu bạn đang tạo giao dịch bằng cách sử dụng hàm tạo như `new caver.transaction.smartContractDeploy({...})`, vui lòng đổi thành `caver.transaction.smartContractDeploy.create({...})`.

:::

**thuộc tính**

| Tên           | Loại                | Mô tả                                                                                                                                                                                                                                   |
| ------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| từ            | chuỗi                | Địa chỉ của người gửi.                                                                                                                                                                                                                  |
| nhập          | chuỗi                | Dữ liệu gắn kèm theo giao dịch. Chỉ thị biên dịch của hợp đồng thông minh sẽ được triển khai và các đối số của nó. Bạn có thể lấy dữ liệu này bằng hàm [caver.abi.encodeContractDeploy](../caver.abi.md#encodecontractdeploy).          |
| gas           | chuỗi                | Giá trị phí giao dịch tối đa mà giao dịch được phép sử dụng.                                                                                                                                                                            |
| giá trị       | chuỗi                | (tùy chọn, mặc định: `'0x0'`) Số lượng KLAY tính theo đơn vị peb sẽ được chuyển và lưu vào số dư của địa chỉ hợp đồng thông minh khi hợp đồng được khởi tạo. Bạn có thể sử dụng hàm `caver.utils.toPeb`.                                |
| đến           | chuỗi                | (tùy chọn, mặc định: `'0x'`) Địa chỉ mà hợp đồng thông minh được triển khai. Hiện tại không thể xác định giá trị này. Tính năng xác định địa chỉ sẽ được hỗ trợ trong tương lai.                                                        |
| humanReadable | kiểu dữ liệu Boolean | (tùy chọn, mặc định: `false`) Phải là giá trị false vì địa chỉ con người có thể đọc được chưa được hỗ trợ.                                                                                                                              |
| codeFormat    | chuỗi                | (tùy chọn, mặc định: `'EVM'`) Định dạng mã của mã hợp đồng thông minh. Hiện tại, giá trị được hỗ trợ chỉ có EVM. Giá trị này được chuyển đổi thành chuỗi số hex sau khi được gán (ví dụ:> `EVM` được chuyển đổi thành `0x0`) bên trong. |
| chữ ký        | Mảng                 | (tùy chọn) Mảng các chữ ký.                                                                                                                                                                                                             |
| nonce         | chuỗi                | (tùy chọn) Giá trị dùng để định danh duy nhất cho một giao dịch của người gửi. Nếu bỏ qua tham số này, `caver.rpc.klay.getTransactionCount(address, 'pending')` sẽ được sử dụng để thiết lập số dùng một lần.                           |
| giá gas       | chuỗi                | (tùy chọn) Một tham số nhân để tính toán số lượng token mà người gửi sẽ thanh toán. Nếu bỏ qua tham số này, `caver.rpc.klay.getGasPrice` sẽ được sử dụng để thiết lập giá gas.                                                          |
| chainId       | chuỗi                | (tùy chọn) Mã chuỗi của mạng lưới Klaytn. Nếu bỏ qua tham số này, `caver.rpc.klay.getChainId` sẽ được sử dụng để thiết lập mã chuỗi.                                                                                                    |

**Ví dụ**

```javascript
// Tạo một giao dịch smartContractDeploy
> caver.transaction.smartContractDeploy.create({
    from: '0x{address in hex}',
    input: '0x60806...',
    gas: 100000,
})

// Tạo một giao dịch smartContractDeploy từ chuỗi mã hóa RLP
> caver.transaction.smartContractDeploy.create('0x28f9027e1f8505d21dba00830dbba0808094d91aec35bea25d379e49cfe2dff5f5775cdac1a3b9020e60806040526000805534801561001457600080fd5b506101ea806100246000396000f30060806040526004361061006d576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd1461007257806342cbb15c1461009d578063767800de146100c8578063b22636271461011f578063d14e62b814610150575b600080fd5b34801561007e57600080fd5b5061008761017d565b6040518082815260200191505060405180910390f35b3480156100a957600080fd5b506100b2610183565b6040518082815260200191505060405180910390f35b3480156100d457600080fd5b506100dd61018b565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561012b57600080fd5b5061014e60048036038101908080356000191690602001909291905050506101b1565b005b34801561015c57600080fd5b5061017b600480360381019080803590602001909291905050506101b4565b005b60005481565b600043905090565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b50565b80600081905550505600a165627a7a7230582053c65686a3571c517e2cf4f741d842e5ee6aa665c96ce70f46f9a594794f11eb00298080f847f845820fe9a0018a9f680a74e275f1f83a5c2c45e1313c52432df4595e944240b1511a4f4ba7a02d762c3417f91b81db4907db832cb28cc64df7dca3ea9be64899ab3f4812f016')
SmartContractDeploy {
    _type: 'TxTypeSmartContractDeploy',
    _from: '0xd91aec35bea25d379e49cfe2dff5f5775cdac1a3',
    _gas: '0xdbba0',
    _nonce: '0x1f',
    _gasPrice: '0x5d21dba00',
    _signatures: [ SignatureData { _v: '0x0fe9', _r: '0x018a9...', _s: '0x2d762...' } ],
    _to: '0x',
    _value: '0x0',
    _input: '0x60806...',
    _humanReadable: false,
    _codeFormat: '0x0'
}
```

## SmartContractExecution <a id="smartcontractexecution"></a>

```javascript
caver.transaction.smartContractExecution.create(transactionObject)
```

`SmartContractExecution` biểu thị một [giao dịch thực thi hợp đồng thông minh](../../../../../learn/transactions/basic.md#txtypesmartcontractexecution). `transactionObject` có thể có các thuộc tính dưới đây để tạo giao dịch `SmartContractExecution`.

`SmartContractExecution` có các thuộc tính sau đây giống như các biến thành viên. Thuộc tính được đánh dấu là `optional` nghĩa là các thuộc tính được tùy ý đưa ra trong `transactionObject` khi người dùng tạo giao dịch `SmartContractExecution`.

:::note

LƯU Ý: Bạn có thể tạo một đối tượng `SmartContractExecution` từ chuỗi mã hóa RLP. Hãy xem ví dụ dưới đây. LƯU Ý: `caver.transaction.smartContractExecution.create` được hỗ trợ kể từ phiên bản caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1).

LƯU Ý: Kể từ phiên bản caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4), tính năng tạo giao dịch chỉ được hỗ trợ bằng cách sử dụng hàm `create`. Nếu bạn đang tạo giao dịch bằng cách sử dụng hàm tạo như `new caver.transaction.smartContractExecution({...})`, vui lòng đổi thành `caver.transaction.smartContractExecution.create({...})`.

:::

**thuộc tính**

| Tên     | Loại | Mô tả                                                                                                                                                                                                                                                            |
| ------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| từ      | chuỗi | Địa chỉ của người gửi.                                                                                                                                                                                                                                           |
| đến     | chuỗi | Địa chỉ thực thi tài khoản hợp đồng thông minh.                                                                                                                                                                                                                  |
| nhập    | chuỗi | Dữ liệu được gắn kèm giao dịch, dùng để thực thi giao dịch. Đầu vào là một chuỗi mã hóa cho biết một hàm cần gọi và các tham số được truyền vào hàm này. Bạn có thể lấy dữ liệu này bằng hàm [caver.abi.encodeFunctionCall](../caver.abi.md#encodefunctioncall). |
| gas     | chuỗi | Giá trị phí giao dịch tối đa mà giao dịch được phép sử dụng.                                                                                                                                                                                                     |
| giá trị | chuỗi | (tùy chọn, mặc định: `'0x0'`) Số lượng KLAY tính bằng peb sẽ được chuyển. Bạn có thể sử dụng hàm `caver.utils.toPeb`.                                                                                                                                            |
| chữ ký  | Mảng  | (tùy chọn) Mảng các chữ ký.                                                                                                                                                                                                                                      |
| nonce   | chuỗi | (tùy chọn) Giá trị dùng để định danh duy nhất cho một giao dịch của người gửi. Nếu bỏ qua tham số này, `caver.rpc.klay.getTransactionCount(address, 'pending')` sẽ được sử dụng để thiết lập số dùng một lần.                                                    |
| giá gas | chuỗi | (tùy chọn) Một tham số nhân để tính toán số lượng token mà người gửi sẽ thanh toán. Nếu bỏ qua tham số này, `caver.rpc.klay.getGasPrice` sẽ được sử dụng để thiết lập giá gas.                                                                                   |
| chainId | chuỗi | (tùy chọn) Mã chuỗi của mạng lưới Klaytn. Nếu bỏ qua tham số này, `caver.rpc.klay.getChainId` sẽ được sử dụng để thiết lập mã chuỗi.                                                                                                                             |

**Ví dụ**

```javascript
// Tạo một giao dịch smartContractExecution
> caver.transaction.smartContractExecution.create({
    from: '0x{address in hex}',
    to: '0x{address in hex}',
    input: '0xa9059...',
    gas: 90000,
})

// Tạo một giao dịch smartContractExecution từ chuỗi mã hóa RLP
> caver.transaction.smartContractExecution.create('0x30f8c5038505d21dba00830dbba094e3cd4e1cd287235cc0ea48c9fd02978533f5ec2b80946b604e77c0fbebb5b2941bcde3ab5eb09d99ad24b844a9059cbb0000000000000000000000008a4c9c443bb0645df646a2d5bb55def0ed1e885a0000000000000000000000000000000000000000000000000000000000003039f847f845820feaa066e1650b5779f152489633f343581c07938f8b2fc92c919d4dd7c7295d0beacea067b0b79383dbcd42a3aa8ebb1aa4bcb1fc0623ef9e97bc1e9b82d96fe37b5881')
SmartContractExecution {
    _type: 'TxTypeSmartContractExecution',
    _from: '0x6b604e77c0fbebb5b2941bcde3ab5eb09d99ad24',
    _gas: '0xdbba0',
    _nonce: '0x3',
    _gasPrice: '0x5d21dba00',
    _signatures: [ SignatureData { _v: '0x0fea', _r: '0x66e16...', _s: '0x67b0b...' } ],
    _to: '0xe3cd4e1cd287235cc0ea48c9fd02978533f5ec2b',
    _value: '0x0',
    _input: '0xa9059...'
}
```

## Cancel <a id="cancel"></a>

```javascript
caver.transaction.cancel.create(transactionObject)
```

`Cancel` biểu thị một [giao dịch hủy](../../../../../learn/transactions/basic.md#txtypecancel). `transactionObject` có thể có các thuộc tính dưới đây để tạo giao dịch `Cancel`.

Giao dịch `Cancel` hủy bỏ việc thực thi giao dịch có cùng số dùng một lần trong nhóm giao dịch chờ.

`Cancel` có các thuộc tính sau đây giống như các biến thành viên. Thuộc tính được đánh dấu là `optional` nghĩa là các thuộc tính được tùy ý đưa ra trong `transactionObject` khi người dùng tạo giao dịch `Cancel`.

:::note

LƯU Ý: Bạn có thể tạo một đối tượng `Cancel` từ chuỗi mã hóa RLP. Hãy xem ví dụ dưới đây. LƯU Ý: `caver.transaction.cancel.create` được hỗ trợ kể từ phiên bản caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1).

LƯU Ý: Kể từ phiên bản caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4), tính năng tạo giao dịch chỉ được hỗ trợ bằng cách sử dụng hàm `create`. Nếu bạn đang tạo giao dịch bằng cách sử dụng hàm tạo như `new caver.transaction.xcancelxx({...})`, vui lòng đổi thành `caver.transaction.cancel.create({...})`.

:::

**thuộc tính**

| Tên     | Loại | Mô tả                                                                                                                                                                                                         |
| ------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| từ      | chuỗi | Địa chỉ của người gửi.                                                                                                                                                                                        |
| gas     | chuỗi | Giá trị phí giao dịch tối đa mà giao dịch được phép sử dụng.                                                                                                                                                  |
| nonce   | chuỗi | (tùy chọn) Giá trị dùng để định danh duy nhất cho một giao dịch của người gửi. Nếu bỏ qua tham số này, `caver.rpc.klay.getTransactionCount(address, 'pending')` sẽ được sử dụng để thiết lập số dùng một lần. |
| chữ ký  | Mảng  | (tùy chọn) Mảng các chữ ký.                                                                                                                                                                                   |
| giá gas | chuỗi | (tùy chọn) Một tham số nhân để tính toán số lượng token mà người gửi sẽ thanh toán. Nếu bỏ qua tham số này, `caver.rpc.klay.getGasPrice` sẽ được sử dụng để thiết lập giá gas.                                |
| chainId | chuỗi | (tùy chọn) Mã chuỗi của mạng lưới Klaytn. Nếu bỏ qua tham số này, `caver.rpc.klay.getChainId` sẽ được sử dụng để thiết lập mã chuỗi.                                                                          |

**Ví dụ**

```javascript
// Tạo một giao dịch cancel
> caver.transaction.cancel.create({
    from: '0x{address in hex}',
    nonce: 1,
    gas: 25000,
})

// Tạo một giao dịch cancel từ chuỗi mã hóa RLP
> caver.transaction.cancel.create('0x38f869068505d21dba00830dbba0946b604e77c0fbebb5b2941bcde3ab5eb09d99ad24f847f845820feaa0d9994ef507951a59380309f656ee8ed685becdc89b1d1a0eb1d2f72683ae14d3a07ad5d37a89781f294fab72b254ea9266e4d039ae163db4a4c4752f1fabff023b')
Cancel {
    _type: 'TxTypeCancel',
    _from: '0x6b604e77c0fbebb5b2941bcde3ab5eb09d99ad24',
    _gas: '0xdbba0',
    _nonce: '0x6',
    _gasPrice: '0x5d21dba00',
    _signatures: [ SignatureData { _v: '0x0fea', _r: '0xd9994...', _s: '0x7ad5d...' } ]
}
```

## ChainDataAnchoring <a id="chaindataanchoring"></a>

```javascript
caver.transaction.chainDataAnchoring.create(transactionObject)
```

`ChainDataAnchoring` biểu thị một [giao dịch neo dữ liệu chuỗi](../../../../../learn/transactions/basic.md#txtypechaindataanchoring). `transactionObject` có thể có các thuộc tính dưới đây để tạo giao dịch `ChainDataAnchoring`.

`ChainDataAnchoring` có các thuộc tính sau đây giống như các biến thành viên. Thuộc tính được đánh dấu là `optional` nghĩa là các thuộc tính được tùy ý đưa ra trong `transactionObject` khi người dùng tạo giao dịch `ChainDataAnchoring`.

:::note

LƯU Ý: Bạn có thể tạo một đối tượng `ChainDataAnchoring` từ chuỗi mã hóa RLP. Hãy xem ví dụ dưới đây. LƯU Ý: `caver.transaction.chainDataAnchoring.create` được hỗ trợ kể từ phiên bản caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1).

LƯU Ý: Kể từ phiên bản caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4), tính năng tạo giao dịch chỉ được hỗ trợ bằng cách sử dụng hàm `create`. Nếu bạn đang tạo giao dịch bằng cách sử dụng hàm tạo như `new caver.transaction.chainDataAnchoring({...})`, vui lòng đổi thành `caver.transaction.chainDataAnchoring.create({...})`.

:::

**thuộc tính**

| Tên     | Loại | Mô tả                                                                                                                                                                                                         |
| ------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| từ      | chuỗi | Địa chỉ của người gửi.                                                                                                                                                                                        |
| nhập    | chuỗi | Dữ liệu của chuỗi dịch vụ.                                                                                                                                                                                    |
| gas     | chuỗi | Giá trị phí giao dịch tối đa mà giao dịch được phép sử dụng.                                                                                                                                                  |
| nonce   | chuỗi | (tùy chọn) Giá trị dùng để định danh duy nhất cho một giao dịch của người gửi. Nếu bỏ qua tham số này, `caver.rpc.klay.getTransactionCount(address, 'pending')` sẽ được sử dụng để thiết lập số dùng một lần. |
| chữ ký  | Mảng  | (tùy chọn) Mảng các chữ ký.                                                                                                                                                                                   |
| giá gas | chuỗi | (tùy chọn) Một tham số nhân để tính toán số lượng token mà người gửi sẽ thanh toán. Nếu bỏ qua tham số này, `caver.rpc.klay.getGasPrice` sẽ được sử dụng để thiết lập giá gas.                                |
| chainId | chuỗi | (tùy chọn) Mã chuỗi của mạng lưới Klaytn. Nếu bỏ qua tham số này, `caver.rpc.klay.getChainId` sẽ được sử dụng để thiết lập mã chuỗi.                                                                          |

**Ví dụ**

```javascript
// Tạo một giao dịch chainDataAnchoring
> caver.transaction.chainDataAnchoring.create({
    from: '0x{address in hex}',
    gas: 50000,
    input: '0xf8a6a...',
})

// Tạo một giao dịch chainDataAnchoring từ chuỗi mã hóa RLP
> caver.transaction.chainDataAnchoring.create('0x48f9010e8204d219830f424094a94f5374fce5edbc8e2a8697c15331677e6ebf0bb8a8f8a6a00000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000001a00000000000000000000000000000000000000000000000000000000000000002a00000000000000000000000000000000000000000000000000000000000000003a0000000000000000000000000000000000000000000000000000000000000000405f845f84325a0e58b9abf9f33a066b998fccaca711553fb4df425c9234bbb3577f9d9775bb124a02c409a6c5d92277c0a812dd0cc553d7fe1d652a807274c3786df3292cd473e09')
ChainDataAnchoring {
    _type: 'TxTypeChainDataAnchoring',
    _from: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
    _gas: '0xf4240',
    _nonce: '0x4d2',
    _gasPrice: '0x19',
    _signatures: [ SignatureData { _v: '0x25', _r: '0xe58b9...', _s: '0x2c409...' } ],
    _input: '0xf8a6a...'
}
```
## EthereumAccessList <a id="ethereumaccesslist"></a>

```javascript
caver.transaction.ethereumAccessList.create(transactionObject)
```

`EthereumAccessList` biểu thị một [giao dịch danh sách tiếp cận Ethereum](../../../../../learn/transactions/basic.md#txtypeethereumaccesslist). [Tài khoản Klaytn](../../../../../learn/accounts.md#klaytn-accounts) có thể thực thi giao dịch `EthereumAccessList` chỉ bằng [AccountKeyLegacy (Khóa tài khoản cũ)]. `transactionObject` có thể có các thuộc tính dưới đây để tạo `EthereumAccessList`.

`EthereumAccessList` có các thuộc tính sau đây giống như các biến thành viên. Thuộc tính được đánh dấu là `optional` nghĩa là các thuộc tính được tùy ý đưa ra trong `transactionObject` khi người dùng tạo `EthereumAccessList`.

:::note

LƯU Ý: Bạn có thể tạo một đối tượng `EthereumAccessList` từ chuỗi mã hóa RLP. Hãy xem ví dụ dưới đây. LƯU Ý: `caver.transaction.ethereumAccessList` được hỗ trợ kể từ phiên bản caver-js [v1.8.0](https://www.npmjs.com/package/caver-js/v/1.8.0).

LƯU Ý: Kể từ phiên bản caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4), tính năng tạo giao dịch chỉ được hỗ trợ bằng cách sử dụng hàm `create`. Nếu bạn đang tạo giao dịch bằng cách sử dụng hàm tạo như `new caver.transaction.ethereumAccessList({...})`, vui lòng đổi thành `caver.transaction.ethereumAccessList.create({...})`.

:::

**thuộc tính**

| Tên        | type  | Mô tả                                                                                                                                                                                                                                                                                         |
| ---------- | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| gas        | chuỗi | Giá trị phí giao dịch tối đa mà giao dịch được phép sử dụng.                                                                                                                                                                                                                                  |
| giá trị    | chuỗi | (tùy chọn, mặc định: `'0x0'`) Số lượng KLAY tính bằng peb sẽ được chuyển. Bạn có thể sử dụng hàm `caver.utils.toPeb`.                                                                                                                                                                         |
| từ         | chuỗi | (tùy chọn) Địa chỉ của người gửi. Nếu bỏ qua tham số này, địa chỉ của keyring được sử dụng để ký sẽ được thiết lập.                                                                                                                                                                           |
| đến        | chuỗi | (tùy chọn, mặc định: `'0x'`) Địa chỉ tài khoản sẽ nhận giá trị được chuyển hoặc địa chỉ hợp đồng thông minh nếu giao dịch danh sách tiếp cận ethereum thực thi hợp đồng thông minh. Nếu một giao dịch danh sách tiếp cận ethereum triển khai hợp đồng thông minh thì không cần xác định `to`. |
| nhập       | chuỗi | (tùy chọn) Dữ liệu gắn kèm giao dịch, dùng để triển khai/thực thi hợp đồng thông minh.                                                                                                                                                                                                        |
| chữ ký     | Mảng  | (tùy chọn) Mảng các chữ ký. Một giao dịch danh sách tiếp cận ethereum có thể chỉ có một chữ ký.                                                                                                                                                                                               |
| nonce      | chuỗi | (tùy chọn) Giá trị dùng để định danh duy nhất cho một giao dịch của người gửi. Nếu bỏ qua tham số này, `caver.rpc.klay.getTransactionCount(address, 'pending')` sẽ được sử dụng để thiết lập số dùng một lần.                                                                                 |
| giá gas    | chuỗi | (tùy chọn) Một tham số nhân để tính toán số lượng token mà người gửi sẽ thanh toán. Nếu bỏ qua tham số này, `caver.rpc.klay.getGasPrice` sẽ được sử dụng để thiết lập giá gas.                                                                                                                |
| chainId    | chuỗi | (tùy chọn) Mã chuỗi của mạng lưới Klaytn. Nếu bỏ qua tham số này, `caver.rpc.klay.getChainId` sẽ được sử dụng để thiết lập mã chuỗi.                                                                                                                                                          |
| accessList | Mảng  | (tùy chọn) Là danh sách truy cập EIP-2930 chứa tất cả các khe lưu trữ và địa chỉ mà giao dịch đọc và ghi.                                                                                                                                                                                     |

**Ví dụ**

```javascript
> caver.transaction.ethereumAccessList.create({
    to: '0x9957dfd92e4b70f91131c573293343bc5f21f215',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 40000,
    accessList: [
        {
            address: '0x5430192ae264b3feff967fc08982b9c6f5694023',
            storageKeys: [
                '0x0000000000000000000000000000000000000000000000000000000000000003',
                '0x0000000000000000000000000000000000000000000000000000000000000007',
            ],
        },
    ]
})

> caver.transaction.ethereumAccessList.create('0x7801f90109822710238505d21dba00829c4094c5fb1386b60160614a8151dcd4b0ae41325d1cb801b844a9059cbb0000000000000000000000008a4c9c443bb0645df646a2d5bb55def0ed1e885a0000000000000000000000000000000000000000000000000000000000003039f85bf859945430192ae264b3feff967fc08982b9c6f5694023f842a00000000000000000000000000000000000000000000000000000000000000003a0000000000000000000000000000000000000000000000000000000000000000701a05ac25e47591243af2d6b8e7f54d608e9e0e0aeb5194d34c17852bd7e376f4857a0095a40394f33e95cce9695d5badf4270f4cc8aff0b5395cefc3a0fe213be1f30')
EthereumAccessList {
  _type: 'TxTypeEthereumAccessList',
  _from: '0x0000000000000000000000000000000000000000',
  _gas: '0x9c40',
  _nonce: '0x23',
  _chainId: '0x2710',
  _signatures: SignatureData {
    _v: '0x01',
    _r: '0x5ac25e47591243af2d6b8e7f54d608e9e0e0aeb5194d34c17852bd7e376f4857',
    _s: '0x095a40394f33e95cce9695d5badf4270f4cc8aff0b5395cefc3a0fe213be1f30'
  },
  _to: '0xc5fb1386b60160614a8151dcd4b0ae41325d1cb8',
  _input: '0xa9059cbb0000000000000000000000008a4c9c443bb0645df646a2d5bb55def0ed1e885a0000000000000000000000000000000000000000000000000000000000003039',
  _value: '0x1',
  _accessList: AccessList(0) [],
  _gasPrice: '0x5d21dba00'
}
```

## EthereumDynamicFee <a id="ethereumdynamicfee"></a>

```javascript
caver.transaction.ethereumDynamicFee.create(transactionObject)
```

`EthereumDynamicFee` biểu thị một [giao dịch phí biến đổi Ethereum](../../../../../learn/transactions/basic.md#txtypeethereumdynamicfee). [Tài khoản Klaytn](../../../../../learn/accounts.md#klaytn-accounts) có thể thực thi giao dịch `EthereumDynamicFee` chỉ bằng [AccountKeyLegacy (Khóa tài khoản cũ)]. `transactionObject` có thể có các thuộc tính dưới đây để tạo `EthereumDynamicFee`.

`EthereumDynamicFee` có các thuộc tính sau đây giống như các biến thành viên. Thuộc tính được đánh dấu là `optional` nghĩa là các thuộc tính được tùy ý đưa ra trong `transactionObject` khi người dùng tạo `EthereumDynamicFee`. Và lưu ý rằng giao dịch `EthereumDynamicFee` không sử dụng `gasPrice`, giao dịch này sử dụng `maxPriorityFeePerGas` và `maxFeePerGas`.

:::note

LƯU Ý: Bạn có thể tạo một đối tượng `EthereumDynamicFee` từ chuỗi mã hóa RLP. Hãy xem ví dụ dưới đây. LƯU Ý: `caver.transaction.ethereumDynamicFee` được hỗ trợ kể từ phiên bản caver-js [v1.8.0](https://www.npmjs.com/package/caver-js/v/1.8.0).

LƯU Ý: Kể từ phiên bản caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4), tính năng tạo giao dịch chỉ được hỗ trợ bằng cách sử dụng hàm `create`. Nếu bạn đang tạo giao dịch bằng cách sử dụng hàm tạo như `new caver.transaction.ethereumDynamicFee({...})`, vui lòng đổi thành `caver.transaction.ethereumDynamicFee.create({...})`.

:::

**thuộc tính**

| Tên                  | type  | Mô tả                                                                                                                                                                                                                                                                                |
| -------------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| gas                  | chuỗi | Giá trị phí giao dịch tối đa mà giao dịch được phép sử dụng.                                                                                                                                                                                                                         |
| giá trị              | chuỗi | (tùy chọn, mặc định: `'0x0'`) Số lượng KLAY tính bằng peb sẽ được chuyển. Bạn có thể sử dụng hàm `caver.utils.toPeb`.                                                                                                                                                                |
| từ                   | chuỗi | (tùy chọn) Địa chỉ của người gửi. Nếu bỏ qua tham số này thì sẽ được thiết lập thành địa chỉ keyring được sử dụng để ký.                                                                                                                                                             |
| đến                  | chuỗi | (tùy chọn, mặc định: `'0x'`) Địa chỉ tài khoản sẽ nhận giá trị được chuyển hoặc địa chỉ hợp đồng thông minh khi giao dịch phí biến đổi ethereum thực thi hợp đồng thông minh. Nếu một giao dịch phí biến đổi ethereum triển khai hợp đồng thông minh thì không cần xác định `to`.    |
| nhập                 | chuỗi | (tùy chọn) Dữ liệu gắn kèm giao dịch, dùng để triển khai/thực thi hợp đồng thông minh.                                                                                                                                                                                               |
| chữ ký               | Mảng  | (tùy chọn) Mảng các chữ ký. Một giao dịch phí biến đổi ethereum có thể chỉ có một chữ ký.                                                                                                                                                                                            |
| nonce                | chuỗi | (tùy chọn) Giá trị dùng để định danh duy nhất cho một giao dịch của người gửi. Nếu bỏ qua tham số này thì sẽ được thiết lập thành `caver.rpc.klay.getTransactionCount(address, 'pending')`.                                                                                          |
| maxPriorityFeePerGas | chuỗi | (tùy chọn) Giới hạn tối đa mức phí trả thêm cho giao dịch theo đơn vị peb. Do Klaytn có giá gas cố định, giá trị này nên được đặt giống với giá trị của `caver.rpc.klay.getGasPrice`. Nếu bỏ qua tham số này thì sẽ được thiết lập thành `caver.rpc.klay.getMaxPriorityFeePerGas()`. |
| maxFeePerGas         | chuỗi | (tùy chọn) Số tiền tối đa chi trả cho việc thực thi giao dịch. Do Klaytn có giá gas cố định, giá trị này nên được đặt giống với giá trị của `caver.rpc.klay.getGasPrice`. Nếu bỏ qua tham số này, giá trị `baseFeePerGas * 2 + maxPriorityFeePerGas` được đặt thành `maxFeePerGas`.  |
| chainId              | chuỗi | (tùy chọn) Mã chuỗi của mạng lưới Klaytn. Nếu bỏ qua tham số này thì sẽ được thiết lập thành `caver.rpc.klay.getChainId`.                                                                                                                                                            |
| accessList           | Mảng  | (tùy chọn) Là danh sách truy cập EIP-2930 chứa tất cả các khe lưu trữ và địa chỉ mà giao dịch đọc và ghi.                                                                                                                                                                            |

**Ví dụ**

```javascript
> caver.transaction.ethereumDynamicFee.create({
    to: '0x9957dfd92e4b70f91131c573293343bc5f21f215',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 50000,
    accessList: [
        {
            address: '0x5430192ae264b3feff967fc08982b9c6f5694023',
            storageKeys: [
                '0x0000000000000000000000000000000000000000000000000000000000000003',
                '0x0000000000000000000000000000000000000000000000000000000000000007',
            ],
        },
    ]
})

> caver.transaction.ethereumDynamicFee.create('0x7802f9010f822710258505d21dba008505d21dba00829c40941fc92c23f71a7de4cdb4394a37fc636986a0f48401b844a9059cbb0000000000000000000000008a4c9c443bb0645df646a2d5bb55def0ed1e885a0000000000000000000000000000000000000000000000000000000000003039f85bf8599467116062f1626f7b3019631f03d301b8f701f709f842a00000000000000000000000000000000000000000000000000000000000000003a0000000000000000000000000000000000000000000000000000000000000000780a04fc52da183020a27dc4b684a45404445630e946b0c1a37edeb538d4bdae63040a07d56dbcc61f42ffcbced105f838d20b8fe71e85a4d0344c7f60815fddfeae4cc')
EthereumDynamicFee {
  _type: 'TxTypeEthereumDynamicFee',
  _from: '0x0000000000000000000000000000000000000000',
  _gas: '0x9c40',
  _nonce: '0x25',
  _chainId: '0x2710',
  _signatures: SignatureData {
    _v: '0x',
    _r: '0x4fc52da183020a27dc4b684a45404445630e946b0c1a37edeb538d4bdae63040',
    _s: '0x7d56dbcc61f42ffcbced105f838d20b8fe71e85a4d0344c7f60815fddfeae4cc'
  },
  _to: '0x1fc92c23f71a7de4cdb4394a37fc636986a0f484',
  _input: '0xa9059cbb0000000000000000000000008a4c9c443bb0645df646a2d5bb55def0ed1e885a0000000000000000000000000000000000000000000000000000000000003039',
  _value: '0x1',
  _accessList: AccessList(0) [],
  _maxPriorityFeePerGas: '0x5d21dba00',
  _maxFeePerGas: '0x5d21dba00'
}
```

[AccountKeyLegacy (Khóa tài khoản cũ)]: ../../../../../learn/accounts.md#accountkeylegacy
[Tài khoản]: ../caver.account.md#account
