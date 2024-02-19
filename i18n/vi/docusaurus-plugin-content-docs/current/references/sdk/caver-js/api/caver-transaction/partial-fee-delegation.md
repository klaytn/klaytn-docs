---
sidebar_label: "sidebar_label: Partial Fee Delegation"
---

# Lớp giao dịch loại ủy thác phí một phần

## FeeDelegatedValueTransferWithRatio <a id="feedelegatedvaluetransferwithratio"></a>

```javascript
caver.transaction.feeDelegatedValueTransferWithRatio.create(transactionObject)
```

`FeeDelegatedValueTransferWithRatio` biểu thị một [giao dịch chuyển giá trị có phí ủy thác theo tỷ lệ](../../../../../learn/transactions/partial-fee-delegation.md#txtypefeedelegatedvaluetransferwithratio). `transactionObject` có thể có các thuộc tính dưới đây để tạo giao dịch `FeeDelegatedValueTransferWithRatio`.

`FeeDelegatedValueTransferWithRatio` có các thuộc tính sau đây giống như các biến thành viên. Thuộc tính được đánh dấu là `optional` nghĩa là các thuộc tính được tùy ý đưa ra trong `transactionObject` khi người dùng tạo giao dịch `FeeDelegatedValueTransfer`.

:::note

LƯU Ý: Bạn có thể tạo một đối tượng `FeeDelegatedValueTransferWithRatio` từ chuỗi mã hóa RLP. Hãy xem ví dụ dưới đây.
LƯU Ý: `caver.transaction.feeDelegatedValueTransferWithRatio.create` được hỗ trợ kể từ phiên bản caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1).

LƯU Ý: Kể từ phiên bản caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4), tính năng tạo giao dịch chỉ được hỗ trợ bằng cách sử dụng hàm `create`. Nếu bạn đang tạo giao dịch bằng cách sử dụng hàm tạo như `new caver.transaction.feeDelegatedValueTransferWithRatio({...})`, vui lòng đổi thành `caver.transaction.feeDelegatedValueTransferWithRatio.create({...})`.

:::

**thuộc tính**

| Tên                | type  | Mô tả                                                                                                                                                                                                                            |
| ------------------ | ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| giá trị            | chuỗi | Số lượng KLAY tính bằng peb sẽ được chuyển. Bạn có thể sử dụng hàm `caver.utils.toPeb`.                                                                                                                                          |
| từ                 | chuỗi | Địa chỉ của người gửi.                                                                                                                                                                                                           |
| đến                | chuỗi | Địa chỉ tài khoản sẽ nhận giá trị được chuyển.                                                                                                                                                                                   |
| gas                | chuỗi | Giá trị phí giao dịch tối đa mà giao dịch được phép sử dụng.                                                                                                                                                                     |
| feeRatio           | chuỗi | Tỷ lệ cấu thành tỷ lệ phí giao dịch mà người trả phí sẽ phải chịu. Khoảng hợp lệ của tỷ lệ phí này là từ 1 đến 99. Tỷ lệ không được phép bằng 0 hoặc bằng và cao hơn 100.                                                        |
| chữ ký             | Mảng  | (tùy chọn) Mảng các chữ ký.                                                                                                                                                                                   |
| feePayerSignatures | Mảng  | (tùy chọn) Mảng các chữ ký của người trả phí.                                                                                                                                                                 |
| feePayer           | chuỗi | (tùy chọn) Địa chỉ của người trả phí.                                                                                                                                                                         |
| nonce              | chuỗi | (tùy chọn) Giá trị dùng để định danh duy nhất cho một giao dịch của người gửi. Nếu bỏ qua tham số này, `caver.rpc.klay.getTransactionCount(address, 'pending')` sẽ được sử dụng để thiết lập số dùng một lần. |
| giá gas            | chuỗi | (tùy chọn) Một tham số nhân để tính toán số lượng token mà người gửi sẽ thanh toán. Nếu bỏ qua tham số này, `caver.rpc.klay.getGasPrice` sẽ được sử dụng để thiết lập giá gas.                                |
| chainId            | chuỗi | (tùy chọn) Mã chuỗi của mạng lưới Klaytn. Nếu bỏ qua tham số này, `caver.rpc.klay.getChainId` sẽ được sử dụng để thiết lập mã chuỗi.                                                                          |

**Ví dụ**

```javascript
// Create a feeDelegatedValueTransferWithRatio
> caver.transaction.feeDelegatedValueTransferWithRatio({
    from: '0x{address in hex}',
    to: '0x9957dfd92e4b70f91131c573293343bc5f21f215',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 25000,
    feeRatio: 30,
})

// Create a feeDelegatedValueTransferWithRatio from RLP-encoded string
> caver.transaction.feeDelegatedValueTransferWithRatio('0x0af8d78204d219830f4240947b65b75d204abed71587c9e519a89277766ee1d00a94a94f5374fce5edbc8e2a8697c15331677e6ebf0b1ef845f84325a0dde32b8241f039a82b124fe94d3e556eb08f0d6f26d07dcc0f3fca621f1090caa01c8c336b358ab6d3a2bbf25de2adab4d01b754e2fb3b9b710069177d54c1e956945a0043070275d9f6054307ee7348bd660849d90ff845f84326a0091ecf53f91bb97bb694f2f2443f3563ac2b646d651497774524394aae396360a044228b88f275aa1ec1bab43681d21dc7e3a676786ed1906f6841d0a1a188f88a')
FeeDelegatedValueTransferWithRatio {
    _type: 'TxTypeFeeDelegatedValueTransferWithRatio',
    _from: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
    _gas: '0xf4240',
    _nonce: '0x4d2',
    _gasPrice: '0x19',
    _signatures: [ SignatureData { _v: '0x25', _r: '0xdde32...', _s: '0x1c8c3...' } ],
    _feePayer: '0x5a0043070275d9f6054307ee7348bd660849d90f',
    _feePayerSignatures: [ SignatureData { _v: '0x26', _r: '0x091ec...', _s: '0x44228...' } ],
    _feeRatio: '0x1e',
    _to: '0x7b65b75d204abed71587c9e519a89277766ee1d0',
    _value: '0xa'
}
```

## FeeDelegatedValueTransferMemoWithRatio <a id="feedelegatedvaluetransfermemowithratio"></a>

```javascript
caver.transaction.feeDelegatedValueTransferMemoWithRatio.create(transactionObject)
```

`FeeDelegatedValueTransferMemoWithRatio` biểu thị một [giao dịch chuyển giá trị có phí ủy thác theo tỷ lệ kèm ghi chú](../../../../../learn/transactions/partial-fee-delegation.md#txtypefeedelegatedvaluetransfermemowithratio). `transactionObject` có thể có các thuộc tính dưới đây để tạo giao dịch `FeeDelegatedValueTransferMemoWithRatio`.

`FeeDelegatedValueTransferMemoWithRatio` có các thuộc tính sau đây giống như các biến thành viên. Thuộc tính được đánh dấu là `optional` nghĩa là các thuộc tính được tùy ý đưa ra trong `transactionObject` khi người dùng tạo giao dịch `FeeDelegatedValueTransferMemoWithRatio`.

:::note

LƯU Ý: Bạn có thể tạo một đối tượng `FeeDelegatedValueTransferMemoWithRatio` từ chuỗi mã hóa RLP. Hãy xem ví dụ dưới đây.
LƯU Ý: `caver.transaction.feeDelegatedValueTransferMemoWithRatio.create` được hỗ trợ kể từ phiên bản caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1).

LƯU Ý: Kể từ phiên bản caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4), tính năng tạo giao dịch chỉ được hỗ trợ bằng cách sử dụng hàm `create`. Nếu bạn đang tạo giao dịch bằng cách sử dụng hàm tạo như `new caver.transaction.feeDelegatedValueTransferMemoWithRatio({...})`, vui lòng đổi thành `caver.transaction.feeDelegatedValueTransferMemoWithRatio.create({...})`.

:::

**thuộc tính**

| Tên                | Loại | Mô tả                                                                                                                                                                                                                            |
| ------------------ | ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| giá trị            | chuỗi | Số lượng KLAY tính bằng peb sẽ được chuyển. Bạn có thể sử dụng hàm `caver.utils.toPeb`.                                                                                                                                          |
| từ                 | chuỗi | Địa chỉ của người gửi.                                                                                                                                                                                                           |
| đến                | chuỗi | Địa chỉ tài khoản sẽ nhận giá trị được chuyển.                                                                                                                                                                                   |
| nhập               | chuỗi | Dữ liệu gắn kèm theo giao dịch. Thông điệp cần được truyền vào thuộc tính này.                                                                                                                                                   |
| gas                | chuỗi | Giá trị phí giao dịch tối đa mà giao dịch được phép sử dụng.                                                                                                                                                                     |
| feeRatio           | chuỗi | Tỷ lệ cấu thành tỷ lệ phí giao dịch mà người trả phí sẽ phải chịu. Khoảng hợp lệ của tỷ lệ phí này là từ 1 đến 99. Tỷ lệ không được phép bằng 0 hoặc bằng và cao hơn 100.                                                        |
| chữ ký             | Mảng  | (tùy chọn) Mảng các chữ ký.                                                                                                                                                                                   |
| feePayerSignatures | Mảng  | (tùy chọn) Mảng các chữ ký của người trả phí.                                                                                                                                                                 |
| feePayer           | chuỗi | (tùy chọn) Địa chỉ của người trả phí.                                                                                                                                                                         |
| nonce              | chuỗi | (tùy chọn) Giá trị dùng để định danh duy nhất cho một giao dịch của người gửi. Nếu bỏ qua tham số này, `caver.rpc.klay.getTransactionCount(address, 'pending')` sẽ được sử dụng để thiết lập số dùng một lần. |
| giá gas            | chuỗi | (tùy chọn) Một tham số nhân để tính toán số lượng token mà người gửi sẽ thanh toán. Nếu bỏ qua tham số này, `caver.rpc.klay.getGasPrice` sẽ được sử dụng để thiết lập giá gas.                                |
| chainId            | chuỗi | (tùy chọn) Mã chuỗi của mạng lưới Klaytn. Nếu bỏ qua tham số này, `caver.rpc.klay.getChainId` sẽ được sử dụng để thiết lập mã chuỗi.                                                                          |

**Ví dụ**

```javascript
// Create a feeDelegatedValueTransferMemoWithRatio
> caver.transaction.feeDelegatedValueTransferMemoWithRatio({
    from: '0x{address in hex}',
    to: '0x9957dfd92e4b70f91131c573293343bc5f21f215',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 25000,
    input: '0x68656c6c6f',
    feeRatio: 30,
})

// Create a feeDelegatedValueTransferMemoWithRatio from RLP-encoded string
> caver.transaction.feeDelegatedValueTransferMemoWithRatio('0x12f8dd8204d219830f4240947b65b75d204abed71587c9e519a89277766ee1d00a94a94f5374fce5edbc8e2a8697c15331677e6ebf0b8568656c6c6f1ef845f84326a0769f0afdc310289f9b24decb5bb765c8d7a87a6a4ae28edffb8b7085bbd9bc78a06a7b970eea026e60ac29bb52aee10661a4222e6bdcdfb3839a80586e584586b4945a0043070275d9f6054307ee7348bd660849d90ff845f84325a0c1c54bdc72ce7c08821329bf50542535fac74f4bba5de5b7881118a461d52834a03a3a64878d784f9af91c2e3ab9c90f17144c47cfd9951e3588c75063c0649ecd')
FeeDelegatedValueTransferMemoWithRatio {
    _type: 'TxTypeFeeDelegatedValueTransferMemoWithRatio',
    _from: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
    _gas: '0xf4240',
    _nonce: '0x4d2',
    _gasPrice: '0x19',
    _signatures: [ SignatureData { _v: '0x26', _r: '0x769f0...', _s: '0x6a7b9...' } ],
    _feePayer: '0x5a0043070275d9f6054307ee7348bd660849d90f',
    _feePayerSignatures: [ SignatureData { _v: '0x25', _r: '0xc1c54...', _s: '0x3a3a6...' } ],
    _feeRatio: '0x1e',
    _to: '0x7b65b75d204abed71587c9e519a89277766ee1d0',
    _value: '0xa',
    _input: '0x68656c6c6f'
}
```

## FeeDelegatedAccountUpdateWithRatio <a id="feedelegatedaccountupdatewithratio"></a>

```javascript
caver.transaction.feeDelegatedAccountUpdateWithRatio.create(transactionObject)
```

`FeeDelegatedAccountUpdateWithRatio` biểu thị một [giao dịch cập nhật tài khoản có phí ủy thác theo tỷ lệ](../../../../../learn/transactions/partial-fee-delegation.md#txtypefeedelegatedaccountupdatewithratio). `transactionObject` có thể có các thuộc tính dưới đây để tạo giao dịch `FeeDelegatedAccountUpdateWithRatio`.

`FeeDelegatedAccountUpdateWithRatio` có các thuộc tính sau đây giống như các biến thành viên. Thuộc tính được đánh dấu là `optional` nghĩa là các thuộc tính được tùy ý đưa ra trong `transactionObject` khi người dùng tạo giao dịch `FeeDelegatedAccountUpdateWithRatio`.

:::note

LƯU Ý: Bạn có thể tạo một đối tượng `FeeDelegatedAccountUpdateWithRatio` từ chuỗi mã hóa RLP. Hãy xem ví dụ dưới đây.
LƯU Ý: `caver.transaction.feeDelegatedAccountUpdateWithRatio.create` được hỗ trợ kể từ phiên bản caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1).

LƯU Ý: Kể từ phiên bản caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4), tính năng tạo giao dịch chỉ được hỗ trợ bằng cách sử dụng hàm `create`. Nếu bạn đang tạo giao dịch bằng cách sử dụng hàm tạo như `new caver.transaction.feeDelegatedAccountUpdateWithRatio({...})`, vui lòng đổi thành `caver.transaction.feeDelegatedAccountUpdateWithRatio.create({...})`.

:::

**thuộc tính**

| Tên                | type                                                          | Mô tả                                                                                                                                                                                                                            |
| ------------------ | ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| từ                 | chuỗi                                                         | Địa chỉ của người gửi.                                                                                                                                                                                                           |
| tài khoản          | [Account] | Một đối tượng [Account] chứa các thông tin cần thiết để cập nhật tài khoản của bạn.                                                                                          |
| gas                | chuỗi                                                         | Giá trị phí giao dịch tối đa mà giao dịch được phép sử dụng.                                                                                                                                                                     |
| feeRatio           | chuỗi                                                         | Tỷ lệ cấu thành tỷ lệ phí giao dịch mà người trả phí sẽ phải chịu. Khoảng hợp lệ của tỷ lệ phí này là từ 1 đến 99. Tỷ lệ không được phép bằng 0 hoặc bằng và cao hơn 100.                                                        |
| chữ ký             | Mảng                                                          | (tùy chọn) Mảng các chữ ký.                                                                                                                                                                                   |
| feePayerSignatures | Mảng                                                          | (tùy chọn) Mảng các chữ ký của người trả phí.                                                                                                                                                                 |
| feePayer           | chuỗi                                                         | (tùy chọn) Địa chỉ của người trả phí.                                                                                                                                                                         |
| nonce              | chuỗi                                                         | (tùy chọn) Giá trị dùng để định danh duy nhất cho một giao dịch của người gửi. Nếu bỏ qua tham số này, `caver.rpc.klay.getTransactionCount(address, 'pending')` sẽ được sử dụng để thiết lập số dùng một lần. |
| giá gas            | chuỗi                                                         | (tùy chọn) Một tham số nhân để tính toán số lượng token mà người gửi sẽ thanh toán. Nếu bỏ qua tham số này, `caver.rpc.klay.getGasPrice` sẽ được sử dụng để thiết lập giá gas.                                |
| chainId            | chuỗi                                                         | (tùy chọn) Mã chuỗi của mạng lưới Klaytn. Nếu bỏ qua tham số này, `caver.rpc.klay.getChainId` sẽ được sử dụng để thiết lập mã chuỗi.                                                                          |

Để biết cách tạo một đối tượng [Account] cho mỗi loại `AccountKey`, hãy tham khảo [Bắt đầu - Cập nhật tài khoản](../../get-started.md#account-update) hoặc [caver.tài khoản.create](../caver.account.md#caver-account-create).

**Ví dụ**

```javascript
// Create a feeDelegatedAccountUpdateWithRatio
> caver.transaction.feeDelegatedAccountUpdateWithRatio({
    from: '0x{address in hex}',
    gas: 50000,
    account: caver.account.createWithAccountKeyLegacy('0x{address in hex}'),
    feeRatio: 30,
})

// Create a feeDelegatedAccountUpdateWithRatio from RLP-encoded string
> caver.transaction.feeDelegatedAccountUpdateWithRatio('0x22f8ec018505d21dba00830493e0945c525570f2b8e7e25f3a6b5e17f2cc63b872ece7a302a102a1d2af887950891813bf7d851bce55f47246a5269a5d4be1fc0ab78d78ae0f5a1ef847f845820feaa08553a692cd8f86af4d335785468a5b4527ee1a2d0c5e18517fe39375e4e82d85a0698db3a07cc81427eb8ea877bb8af33d66abfb29526f58db6997eb99010be4fd94294f5bc8fadbd1079b191d9c47e1f217d6c987b4f847f845820feaa0a44cbc6e30f9df61633ed1714014924b8b614b315288cdfd795c5ba18d36d5d8a0011611104f18e3bb3d32508317a0ce6d31f0a71d55e2363b02a47aabbc7bf9d4')
FeeDelegatedAccountUpdateWithRatio {
    _type: 'TxTypeFeeDelegatedAccountUpdateWithRatio',
    _from: '0x5c525570f2b8e7e25f3a6b5e17f2cc63b872ece7',
    _gas: '0x493e0',
    _nonce: '0x1',
    _gasPrice: '0x5d21dba00',
    _signatures: [ SignatureData { _v: '0x0fea', _r: '0x8553a...', _s: '0x698db...' } ],
    _feePayer: '0x294f5bc8fadbd1079b191d9c47e1f217d6c987b4',
    _feePayerSignatures: [ SignatureData { _v: '0x0fea', _r: '0xa44cb...', _s: '0x01161...' } ],
    _feeRatio: '0x1e',
    _account: Account {
        _address: '0x5c525570f2b8e7e25f3a6b5e17f2cc63b872ece7',
        _accountKey: AccountKeyPublic { _publicKey: '0x02a1d...' }
    }
}
```

## FeeDelegatedSmartContractDeployWithRatio <a id="feedelegatedsmartcontractdeploywithratio"></a>

```javascript
caver.transaction.feeDelegatedSmartContractDeployWithRatio.create(transactionObject)
```

`FeeDelegatedSmartContractDeployWithRatio` biểu thị một [giao dịch triển khai hợp đồng thông minh có phí ủy thác theo tỷ lệ](../../../../../learn/transactions/partial-fee-delegation.md#txtypefeedelegatedsmartcontractdeploywithratio). `transactionObject` có thể có các thuộc tính dưới đây để tạo giao dịch `FeeDelegatedSmartContractDeployWithRatio`.

`FeeDelegatedSmartContractDeployWithRatio` có các thuộc tính sau đây giống như các biến thành viên. Thuộc tính được đánh dấu là `optional` nghĩa là các thuộc tính được tùy ý đưa ra trong `transactionObject` khi người dùng tạo giao dịch `FeeDelegatedSmartContractDeployWithRatio`.

:::note

LƯU Ý: Bạn có thể tạo một đối tượng `FeeDelegatedSmartContractDeployWithRatio` từ chuỗi mã hóa RLP. Hãy xem ví dụ dưới đây.
LƯU Ý: `caver.transaction.feeDelegatedSmartContractDeployWithRatio.create` được hỗ trợ kể từ phiên bản caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1).

LƯU Ý: Kể từ phiên bản caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4), tính năng tạo giao dịch chỉ được hỗ trợ bằng cách sử dụng hàm `create`. Nếu bạn đang tạo giao dịch bằng cách sử dụng hàm tạo như `new caver.transaction.feeDelegatedSmartContractDeployWithRatio({...})`, vui lòng đổi thành `caver.transaction.feeDelegatedSmartContractDeployWithRatio.create({...})`.

:::

**thuộc tính**

| Tên                | Loại                | Mô tả                                                                                                                                                                                                                                                                         |
| ------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| từ                 | chuỗi                | Địa chỉ của người gửi.                                                                                                                                                                                                                                                        |
| nhập               | chuỗi                | Dữ liệu gắn kèm theo giao dịch. Chỉ thị biên dịch của hợp đồng thông minh sẽ được triển khai và các đối số của nó. Bạn có thể lấy dữ liệu này bằng hàm [caver.abi.encodeContractDeploy](../caver.abi.md#encodecontractdeploy).                                                |
| gas                | chuỗi                | Giá trị phí giao dịch tối đa mà giao dịch được phép sử dụng.                                                                                                                                                                                                                  |
| feeRatio           | chuỗi                | Tỷ lệ cấu thành tỷ lệ phí giao dịch mà người trả phí sẽ phải chịu. Khoảng hợp lệ của tỷ lệ phí này là từ 1 đến 99. Tỷ lệ không được phép bằng 0 hoặc bằng và cao hơn 100.                                                                                                     |
| giá trị            | chuỗi                | (tùy chọn, mặc định: `'0x0'`) Số lượng KLAY tính bằng peb sẽ được chuyển. Bạn có thể sử dụng hàm `caver.utils.toPeb`.                                                                                                                                      |
| đến                | chuỗi                | (tùy chọn, mặc định: `'0x'`) Địa chỉ mà hợp đồng thông minh được triển khai. Hiện tại không thể xác định giá trị này. Tính năng xác định địa chỉ sẽ được hỗ trợ trong tương lai.                                                                           |
| humanReadable      | kiểu dữ liệu Boolean | (tùy chọn, mặc định: `false`) Phải là giá trị false vì địa chỉ con người có thể đọc được chưa được hỗ trợ.                                                                                                                                                 |
| codeFormat         | chuỗi                | (tùy chọn, mặc định: `'EVM'`) Định dạng mã của mã hợp đồng thông minh. Hiện tại, giá trị được hỗ trợ chỉ có EVM. Giá trị này được chuyển đổi thành chuỗi số hex sau khi được gán (ví dụ:> `EVM` được chuyển đổi thành `0x0`) bên trong. |
| chữ ký             | Mảng                 | (tùy chọn) Mảng các chữ ký.                                                                                                                                                                                                                                |
| feePayerSignatures | Mảng                 | (tùy chọn) Mảng các chữ ký của người trả phí.                                                                                                                                                                                                              |
| feePayer           | chuỗi                | (tùy chọn) Địa chỉ của người trả phí.                                                                                                                                                                                                                      |
| nonce              | chuỗi                | (tùy chọn) Giá trị dùng để định danh duy nhất cho một giao dịch của người gửi. Nếu bỏ qua tham số này, `caver.rpc.klay.getTransactionCount(address, 'pending')` sẽ được sử dụng để thiết lập số dùng một lần.                                              |
| giá gas            | chuỗi                | (tùy chọn) Một tham số nhân để tính toán số lượng token mà người gửi sẽ thanh toán. Nếu bỏ qua tham số này, `caver.rpc.klay.getGasPrice` sẽ được sử dụng để thiết lập giá gas.                                                                             |
| chainId            | chuỗi                | (tùy chọn) Mã chuỗi của mạng lưới Klaytn. Nếu bỏ qua tham số này, `caver.rpc.klay.getChainId` sẽ được sử dụng để thiết lập mã chuỗi.                                                                                                                       |

**Ví dụ**

```javascript
// Create a feeDelegatedSmartContractDeployWithRatio
> caver.transaction.feeDelegatedSmartContractDeployWithRatio({
    from: '0x{address in hex}',
    input: '0x60806...',
    gas: 100000,
    feeRatio: 30,
})

// Create a feeDelegatedSmartContractDeployWithRatio from RLP-encoded string
> caver.transaction.feeDelegatedSmartContractDeployWithRatio('0x2af902cd0e8505d21dba00830493e0808094294f5bc8fadbd1079b191d9c47e1f217d6c987b4b901fe608060405234801561001057600080fd5b506101de806100206000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a72305820627ca46bb09478a015762806cc00c431230501118c7c26c30ac58c4e09e51c4f0029801e80f847f845820fe9a08a20b415ae7cd642f7682e59b63cb81068723a18eb0d8d3ba58fa7545c4fc8a5a05ba8a86f4496f124f04293d4b0afec85ab3946b039d1f6a25424217508df586794c56a1fafa968d64d19b4b81c306ecbab6e489743f847f845820fe9a0a525cba1b73cbe33b4df9be7165f8731b848ce3deba607690896eda8791a1a96a05ea75b4da1b6744bb98bc2b9748d0eca5c47714ea1c09e26bebc5de386ff9958')
FeeDelegatedSmartContractDeployWithRatio {
    _type: 'TxTypeFeeDelegatedSmartContractDeployWithRatio',
    _from: '0x294f5bc8fadbd1079b191d9c47e1f217d6c987b4',
    _gas: '0x493e0',
    _nonce: '0xe',
    _gasPrice: '0x5d21dba00',
    _signatures: [ SignatureData { _v: '0x0fe9', _r: '0x8a20b...', _s: '0x5ba8a...' } ],
    _feePayer: '0xc56a1fafa968d64d19b4b81c306ecbab6e489743',
    _feePayerSignatures: [ SignatureData { _v: '0x0fe9', _r: '0xa525c...', _s: '0x5ea75...' } ],
    _feeRatio: '0x1e',
    _to: '0x',
    _value: '0x0',
    _input: '0x60806...',
    _humanReadable: false,
    _codeFormat: '0x0'
}
```

## FeeDelegatedSmartContractExecutionWithRatio <a id="feedelegatedsmartcontractexecutionwithratio"></a>

```javascript
caver.transaction.feeDelegatedSmartContractExecutionWithRatio.create(transactionObject)
```

`FeeDelegatedSmartContractExecutionWithRatio` biểu thị một [giao dịch thực thi hợp đồng thông minh có phí ủy thác theo tỷ lệ](../../../../../learn/transactions/partial-fee-delegation.md#txtypefeedelegatedsmartcontractexecutionwithratio). `transactionObject` có thể có các thuộc tính dưới đây để tạo giao dịch `FeeDelegatedSmartContractExecutionWithRatio`.

`FeeDelegatedSmartContractExecutionWithRatio` có các thuộc tính sau đây giống như các biến thành viên. Thuộc tính được đánh dấu là `optional` nghĩa là các thuộc tính được tùy ý đưa ra trong `transactionObject` khi người dùng tạo giao dịch `FeeDelegatedSmartContractExecutionWithRatio`.

:::note

LƯU Ý: Bạn có thể tạo một đối tượng `FeeDelegatedSmartContractExecutionWithRatio` từ chuỗi mã hóa RLP. Hãy xem ví dụ dưới đây.
LƯU Ý: `caver.transaction.feeDelegatedSmartContractExecutionWithRatio.create` được hỗ trợ kể từ phiên bản caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1).

LƯU Ý: Kể từ phiên bản caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4), tính năng tạo giao dịch chỉ được hỗ trợ bằng cách sử dụng hàm `create`. Nếu bạn đang tạo giao dịch bằng cách sử dụng hàm tạo như `new caver.transaction.feeDelegatedSmartContractExecutionWithRatio({...})`, vui lòng đổi thành `caver.transaction.feeDelegatedSmartContractExecutionWithRatio.create({...})`.

:::

**thuộc tính**

| Tên                | Loại | Mô tả                                                                                                                                                                                                                                                                 |
| ------------------ | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| từ                 | chuỗi | Địa chỉ của người gửi.                                                                                                                                                                                                                                                |
| đến                | chuỗi | Địa chỉ thực thi tài khoản hợp đồng thông minh.                                                                                                                                                                                                                       |
| nhập               | chuỗi | Dữ liệu được gắn kèm giao dịch, dùng để thực thi giao dịch. Đầu vào là một chuỗi mã hóa cho biết một hàm cần gọi và các tham số được truyền vào hàm này. Bạn có thể lấy chuỗi mã hóa này bằng hàm [caver.abi.encodeFunctionCall](../caver.abi.md#encodefunctioncall). |
| gas                | chuỗi | Giá trị phí giao dịch tối đa mà giao dịch được phép sử dụng.                                                                                                                                                                                                          |
| feeRatio           | chuỗi | Tỷ lệ cấu thành tỷ lệ phí giao dịch mà người trả phí sẽ phải chịu. Khoảng hợp lệ của tỷ lệ phí này là từ 1 đến 99. Tỷ lệ không được phép bằng 0 hoặc bằng và cao hơn 100.                                                                                             |
| giá trị            | chuỗi | (tùy chọn, mặc định: `'0x0'`) Số lượng KLAY tính bằng peb sẽ được chuyển. Bạn có thể sử dụng hàm `caver.utils.toPeb`.                                                                                                                              |
| chữ ký             | Mảng  | (tùy chọn) Mảng các chữ ký.                                                                                                                                                                                                                        |
| feePayerSignatures | Mảng  | (tùy chọn) Mảng các chữ ký của người trả phí.                                                                                                                                                                                                      |
| feePayer           | chuỗi | (tùy chọn) Địa chỉ của người trả phí.                                                                                                                                                                                                              |
| nonce              | chuỗi | (tùy chọn) Giá trị dùng để định danh duy nhất cho một giao dịch của người gửi. Nếu bỏ qua tham số này, `caver.rpc.klay.getTransactionCount(address, 'pending')` sẽ được sử dụng để thiết lập số dùng một lần.                                      |
| giá gas            | chuỗi | (tùy chọn) Một tham số nhân để tính toán số lượng token mà người gửi sẽ thanh toán. Nếu bỏ qua tham số này, `caver.rpc.klay.getGasPrice` sẽ được sử dụng để thiết lập giá gas.                                                                     |
| chainId            | chuỗi | (tùy chọn) Mã chuỗi của mạng lưới Klaytn. Nếu bỏ qua tham số này, `caver.rpc.klay.getChainId` sẽ được sử dụng để thiết lập mã chuỗi.                                                                                                               |

**Ví dụ**

```javascript
// Create a feeDelegatedSmartContractExecutionWithRatio
> caver.transaction.feeDelegatedSmartContractExecutionWithRatio({
    from: '0x{address in hex}',
    to: '0x{address in hex}',
    input: '0xa9059...',
    gas: 90000,
    feeRatio: 30,
})

// Create a feeDelegatedSmartContractExecutionWithRatio from RLP-encoded string
> caver.transaction.feeDelegatedSmartContractExecutionWithRatio('0x32f8fc8204d219830f4240947b65b75d204abed71587c9e519a89277766ee1d00a94a94f5374fce5edbc8e2a8697c15331677e6ebf0ba46353586b000000000000000000000000bc5951f055a85f41a3b62fd6f68ab7de76d299b21ef845f84326a074ccfee18dc28932396b85617c53784ee366303bce39a2401d8eb602cf73766fa04c937a5ab9401d2cacb3f39ba8c29dbcd44588cc5c7d0b6b4113cfa7b7d9427b945a0043070275d9f6054307ee7348bd660849d90ff845f84325a04a4997524694d535976d7343c1e3a260f99ba53fcb5477e2b96216ec96ebb565a00f8cb31a35399d2b0fbbfa39f259c819a15370706c0449952c7cfc682d200d7c')
FeeDelegatedSmartContractExecutionWithRatio {
    _type: 'TxTypeFeeDelegatedSmartContractExecutionWithRatio',
    _from: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
    _gas: '0xf4240',
    _nonce: '0x4d2',
    _gasPrice: '0x19',
    _signatures: [ SignatureData { _v: '0x26', _r: '0x74ccf...', _s: '0x4c937...' } ],
    _feePayer: '0x5a0043070275d9f6054307ee7348bd660849d90f',
    _feePayerSignatures: [ SignatureData { _v: '0x25', _r: '0x4a499...', _s: '0x0f8cb...' } ],
    _feeRatio: '0x1e',
    _to: '0x7b65b75d204abed71587c9e519a89277766ee1d0',
    _value: '0xa',
    _input: '0x6353586b000000000000000000000000bc5951f055a85f41a3b62fd6f68ab7de76d299b2'
}
```

## FeeDelegatedCancelWithRatio <a id="feedelegatedcancelwithratio"></a>

```javascript
caver.transaction.feeDelegatedCancelWithRatio.create(transactionObject)
```

`FeeDelegatedCancelWithRatio` biểu thị một [giao dịch hủy có phí ủy thác theo tỷ lệ](../../../../../learn/transactions/partial-fee-delegation.md#txtypefeedelegatedcancelwithratio). `transactionObject` có thể có các thuộc tính dưới đây để tạo giao dịch `FeeDelegatedCancelWithRatio`.

`FeeDelegatedCancelWithRatio` có các thuộc tính sau đây giống như các biến thành viên. Thuộc tính được đánh dấu là `optional` nghĩa là các thuộc tính được tùy ý đưa ra trong `transactionObject` khi người dùng tạo giao dịch `FeeDelegatedCancelWithRatio`.

:::note

LƯU Ý: Bạn có thể tạo một đối tượng `FeeDelegatedCancelWithRatio` từ chuỗi mã hóa RLP. Hãy xem ví dụ dưới đây.
LƯU Ý: `caver.transaction.feeDelegatedCancelWithRatio.create` được hỗ trợ kể từ phiên bản caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1).

LƯU Ý: Kể từ phiên bản caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4), tính năng tạo giao dịch chỉ được hỗ trợ bằng cách sử dụng hàm `create`. Nếu bạn đang tạo giao dịch bằng cách sử dụng hàm tạo như `new caver.transaction.feeDelegatedCancelWithRatio({...})`, vui lòng đổi thành `caver.transaction.feeDelegatedCancelWithRatio.create({...})`.

:::

**thuộc tính**

| Tên                | Loại | Mô tả                                                                                                                                                                                                                            |
| ------------------ | ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| từ                 | chuỗi | Địa chỉ của người gửi.                                                                                                                                                                                                           |
| gas                | chuỗi | Giá trị phí giao dịch tối đa mà giao dịch được phép sử dụng.                                                                                                                                                                     |
| feeRatio           | chuỗi | Tỷ lệ cấu thành tỷ lệ phí giao dịch mà người trả phí sẽ phải chịu. Khoảng hợp lệ của tỷ lệ phí này là từ 1 đến 99. Tỷ lệ không được phép bằng 0 hoặc bằng và cao hơn 100.                                                        |
| nonce              | chuỗi | (tùy chọn) Giá trị dùng để định danh duy nhất cho một giao dịch của người gửi. Nếu bỏ qua tham số này, `caver.rpc.klay.getTransactionCount(address, 'pending')` sẽ được sử dụng để thiết lập số dùng một lần. |
| chữ ký             | Mảng  | (tùy chọn) Mảng các chữ ký.                                                                                                                                                                                   |
| feePayerSignatures | Mảng  | (tùy chọn) Mảng các chữ ký của người trả phí.                                                                                                                                                                 |
| feePayer           | chuỗi | (tùy chọn) Địa chỉ của người trả phí.                                                                                                                                                                         |
| giá gas            | chuỗi | (tùy chọn) Một tham số nhân để tính toán số lượng token mà người gửi sẽ thanh toán. Nếu bỏ qua tham số này, `caver.rpc.klay.getGasPrice` sẽ được sử dụng để thiết lập giá gas.                                |
| chainId            | chuỗi | (tùy chọn) Mã chuỗi của mạng lưới Klaytn. Nếu bỏ qua tham số này, `caver.rpc.klay.getChainId` sẽ được sử dụng để thiết lập mã chuỗi.                                                                          |

**Ví dụ**

```javascript
// Create a feeDelegatedCancelWithRatio
> caver.transaction.feeDelegatedCancelWithRatio({
    from: '0x{address in hex}',
    nonce: 1,
    gas: 25000,
    feeRatio: 30,
})

// Create a feeDelegatedCancelWithRatio from RLP-encoded string
> caver.transaction.feeDelegatedCancelWithRatio('0x3af8c18204d219830f424094a94f5374fce5edbc8e2a8697c15331677e6ebf0b1ef845f84326a072efa47960bef40b536c72d7e03ceaf6ca5f6061eb8a3eda3545b1a78fe52ef5a062006ddaf874da205f08b3789e2d014ae37794890fc2e575bf75201563a24ba9945a0043070275d9f6054307ee7348bd660849d90ff845f84326a06ba5ef20c3049323fc94defe14ca162e28b86aa64f7cf497ac8a5520e9615614a04a0a0fc61c10b416759af0ce4ce5c09ca1060141d56d958af77050c9564df6bf')
FeeDelegatedCancelWithRatio {
    _type: 'TxTypeFeeDelegatedCancelWithRatio',
    _from: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
    _gas: '0xf4240',
    _nonce: '0x4d2',
    _gasPrice: '0x19',
    _signatures: [ SignatureData { _v: '0x26', _r: '0x72efa...', _s: '0x62006...' } ],
    _feePayer: '0x5a0043070275d9f6054307ee7348bd660849d90f',
    _feePayerSignatures: [ SignatureData { _v: '0x26', _r: '0x6ba5e...', _s: '0x4a0a0...' } ],
    _feeRatio: '0x1e'
}
```

## FeeDelegatedChainDataAnchoringWithRatio <a id="feedelegatedchaindataanchoringwithratio"></a>

```javascript
caver.transaction.feeDelegatedChainDataAnchoringWithRatio.create(transactionObject)
```

`FeeDelegatedChainDataAnchoringWithRatio` biểu thị một [giao dịch neo dữ liệu chuỗi có phí ủy thác theo tỷ lệ](../../../../../learn/transactions/partial-fee-delegation.md#txtypefeedelegatedchaindataanchoringwithratio). `transactionObject` có thể có các thuộc tính dưới đây để tạo giao dịch `FeeDelegatedChainDataAnchoringWithRatio`.

`FeeDelegatedChainDataAnchoringWithRatio` có các thuộc tính sau đây giống như các biến thành viên. Thuộc tính được đánh dấu là `optional` nghĩa là các thuộc tính được tùy ý đưa ra trong `transactionObject` khi người dùng tạo giao dịch `FeeDelegatedChainDataAnchoringWithRatio`.

:::note

LƯU Ý: Bạn có thể tạo một đối tượng `FeeDelegatedChainDataAnchoringWithRatio` từ chuỗi mã hóa RLP. Hãy xem ví dụ dưới đây.
LƯU Ý: `caver.transaction.feeDelegatedChainDataAnchoringWithRatio.create` được hỗ trợ kể từ phiên bản caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1).

LƯU Ý: Kể từ phiên bản caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4), tính năng tạo giao dịch chỉ được hỗ trợ bằng cách sử dụng hàm `create`. Nếu bạn đang tạo giao dịch bằng cách sử dụng hàm tạo như `new caver.transaction.feeDelegatedChainDataAnchoringWithRatio({...})`, vui lòng đổi thành `caver.transaction.feeDelegatedChainDataAnchoringWithRatio.create({...})`.

:::

**thuộc tính**

| Tên                | Loại | Mô tả                                                                                                                                                                                                                            |
| ------------------ | ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| từ                 | chuỗi | Địa chỉ của người gửi.                                                                                                                                                                                                           |
| nhập               | chuỗi | Dữ liệu của chuỗi dịch vụ.                                                                                                                                                                                                       |
| gas                | chuỗi | Giá trị phí giao dịch tối đa mà giao dịch được phép sử dụng.                                                                                                                                                                     |
| feeRatio           | chuỗi | Tỷ lệ cấu thành tỷ lệ phí giao dịch mà người trả phí sẽ phải chịu. Khoảng hợp lệ của tỷ lệ phí này là từ 1 đến 99. Tỷ lệ không được phép bằng 0 hoặc bằng và cao hơn 100.                                                        |
| nonce              | chuỗi | (tùy chọn) Giá trị dùng để định danh duy nhất cho một giao dịch của người gửi. Nếu bỏ qua tham số này, `caver.rpc.klay.getTransactionCount(address, 'pending')` sẽ được sử dụng để thiết lập số dùng một lần. |
| chữ ký             | Mảng  | (tùy chọn) Mảng các chữ ký.                                                                                                                                                                                   |
| feePayerSignatures | Mảng  | (tùy chọn) Mảng các chữ ký của người trả phí.                                                                                                                                                                 |
| feePayer           | chuỗi | (tùy chọn) Địa chỉ của người trả phí.                                                                                                                                                                         |
| giá gas            | chuỗi | (tùy chọn) Một tham số nhân để tính toán số lượng token mà người gửi sẽ thanh toán. Nếu bỏ qua tham số này, `caver.rpc.klay.getGasPrice` sẽ được sử dụng để thiết lập giá gas.                                |
| chainId            | chuỗi | (tùy chọn) Mã chuỗi của mạng lưới Klaytn. Nếu bỏ qua tham số này, `caver.rpc.klay.getChainId` sẽ được sử dụng để thiết lập mã chuỗi.                                                                          |

**Ví dụ**

```javascript
// Create a feeDelegatedChainDataAnchoringWithRatio
> caver.transaction.feeDelegatedChainDataAnchoringWithRatio({
    from: '0x{address in hex}',
    gas: 50000,
    input: '0xf8a6a...',
    feeRatio: 30,
})

// Create a feeDelegatedChainDataAnchoringWithRatio from RLP-encoded string
> caver.transaction.feeDelegatedChainDataAnchoringWithRatio('0x4af90177128505d21dba0085174876e80094a94f5374fce5edbc8e2a8697c15331677e6ebf0bb8aff8ad80b8aaf8a8a00000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000001a00000000000000000000000000000000000000000000000000000000000000002a00000000000000000000000000000000000000000000000000000000000000003a0000000000000000000000000000000000000000000000000000000000000000405800658f845f84326a0c612a243bcb3b98958e9cce1a0bc0e170291b33a7f0dbfae4b36dafb5806797da00c734423492ecc21cc53238147c359676fcec43fcc2a0e021d87bb1da49f0abf9433f524631e573329a550296f595c820d6c65213ff845f84325a0a3e40598b67e2bcbaa48fdd258b9d1dcfcc9cc134972560ba042430078a769a5a06707ea362e588e4e5869cffcd5a058749d823aeff13eb95dc1146faff561df32')
FeeDelegatedChainDataAnchoringWithRatio {
    _type: 'TxTypeFeeDelegatedChainDataAnchoringWithRatio',
    _from: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
    _gas: '0x174876e800',
    _nonce: '0x12',
    _gasPrice: '0x5d21dba00',
    _signatures: [ SignatureData { _v: '0x26', _r: '0xc612a...', _s: '0x0c734...' } ],
    _feePayer: '0x33f524631e573329a550296f595c820d6c65213f',
    _feePayerSignatures: [ SignatureData { _v: '0x25', _r: '0xa3e40...', _s: '0x6707e...' } ],
    _feeRatio: '0x58',
    _input: '0xf8ad8...'
}
```
