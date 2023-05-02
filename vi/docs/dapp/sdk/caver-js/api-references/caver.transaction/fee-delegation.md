# Lớp giao dịch loại ủy thác phí <a id="fee-delegation-type-transaction-class"></a>

## FeeDelegatedValueTransfer <a id="feedelegatedvaluetransfer"></a>

```javascript
caver.transaction.feeDelegatedValueTransfer.create(transactionObject)
```

`FeeDelegatedValueTransfer` biểu thị một [giao dịch chuyển giá trị có phí ủy thác](../../../../../klaytn/design/transactions/fee-delegation.md#txtypefeedelegatedvaluetransfer). The `transactionObject` có thể có các thuộc tính dưới đây để tạo giao dịch `FeeDelegatedValueTransfer`.

`FeeDelegatedValueTransfer` có các thuộc tính sau đây giống như các biến thành viên. Thuộc tính được đánh dấu là `optional` nghĩa là các thuộc tính được tùy ý đưa ra trong `transactionObject` khi người dùng tạo giao dịch `FeeDelegatedValueTransfer`.

{% hint style="success" %}
LƯU Ý: Bạn có thể tạo một đối tượng `FeeDelegatedValueTransfer` từ chuỗi mã hóa RLP. Hãy xem ví dụ dưới đây. LƯU Ý: `caver.transaction.feeDelegatedValueTransfer.create` được hỗ trợ kể từ phiên bản caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1).

LƯU Ý: Tính đến phiên bản caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4), tính năng tạo giao dịch chỉ được hỗ trợ bằng cách sử dụng hàm `create`. Nếu bạn đang tạo giao dịch bằng cách sử dụng hàm tạo như `new caver.transaction.feeDelegatedValueTransfer({...})`, vui lòng đổi thành `caver.transaction.feeDelegatedValueTransfer.create({...})`.
{% endhint %}

**thuộc tính**

| Tên                | Loại  | Mô tả                                                                                                                                                                                                                 |
| ------------------ | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value              | chuỗi | Số lượng KLAY tính bằng peb sẽ được chuyển. Bạn có thể sử dụng hàm `caver.utils.toPeb`.                                                                                                                               |
| from               | chuỗi | Địa chỉ của người gửi.                                                                                                                                                                                                |
| to                 | chuỗi | Địa chỉ tài khoản sẽ nhận giá trị được chuyển.                                                                                                                                                                        |
| gas                | chuỗi | Giá trị phí giao dịch tối đa mà giao dịch được phép sử dụng.                                                                                                                                                          |
| signatures         | Mảng  | (tùy chọn) Mảng các chữ ký.                                                                                                                                                                                           |
| feePayerSignatures | Mảng  | (tùy chọn) Mảng các chữ ký của người trả phí.                                                                                                                                                                         |
| feePayer           | chuỗi | (tùy chọn) Địa chỉ của người trả phí.                                                                                                                                                                                 |
| nonce              | chuỗi | (tùy chọn) Giá trị được sử dụng để định danh duy nhất cho một giao dịch của người gửi. Nếu bỏ qua tham số này, `caver.rpc.klay.getTransactionCount(address, 'pending')` sẽ được sử dụng để thiết lập số dùng một lần. |
| gasPrice           | chuỗi | (tùy chọn) Một tham số nhân để tính toán số lượng token mà người gửi sẽ thanh toán. Nếu bỏ qua tham số này, `caver.rpc.klay.getGasPrice` sẽ được sử dụng để thiết lập giá gas.                                        |
| chainId            | chuỗi | (tùy chọn) Mã chuỗi của nền tảng chuỗi khối Klaytn (viết tắt là "Klaytn" trong phần còn lại của tài liệu này). Nếu bỏ qua tham số này, `caver.rpc.klay.getChainId` sẽ được sử dụng để thiết lập mã chuỗi.             |

**Ví dụ**

```javascript
// Tạo một giao dịch feeDelegatedValueTransfer
> caver.transaction.feeDelegatedValueTransfer.create({
    from: '0x{address in hex}',
    to: '0x9957dfd92e4b70f91131c573293343bc5f21f215',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 25000,
})

// Tạo một giao dịch feeDelegatedValueTransfer từ chuỗi mã hóa RLP
> caver.transaction.feeDelegatedValueTransfer.create('0x09f8d68204d219830f4240947b65b75d204abed71587c9e519a89277766ee1d00a94a94f5374fce5edbc8e2a8697c15331677e6ebf0bf845f84325a09f8e49e2ad84b0732984398749956e807e4b526c786af3c5f7416b293e638956a06bf88342092f6ff9fabe31739b2ebfa1409707ce54a54693e91a6b9bb77df0e7945a0043070275d9f6054307ee7348bd660849d90ff845f84326a0f45cf8d7f88c08e6b6ec0b3b562f34ca94283e4689021987abb6b0772ddfd80aa0298fe2c5aeabb6a518f4cbb5ff39631a5d88be505d3923374f65fdcf63c2955b')
FeeDelegatedValueTransfer {
    _type: 'TxTypeFeeDelegatedValueTransfer',
    _from: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
    _gas: '0xf4240',
    _nonce: '0x4d2',
    _gasPrice: '0x19',
    _signatures: [ SignatureData { _v: '0x25', _r: '0x9f8e4...', _s: '0x6bf88...' } ],
    _feePayer: '0x5a0043070275d9f6054307ee7348bd660849d90f',
    _feePayerSignatures: [ SignatureData { _v: '0x26', _r: '0xf45cf...', _s: '0x298fe...' } ],
    _to: '0x7b65b75d204abed71587c9e519a89277766ee1d0',
    _value: '0xa'
}
```

## FeeDelegatedValueTransferMemo <a id="feedelegatedvaluetransfermemo"></a>

```javascript
caver.transaction.feeDelegatedValueTransferMemo.create(transactionObject)
```

`FeeDelegatedValueTransferMemo` biểu thị một [giao dịch chuyển giá trị có phí ủy thác kèm ghi chú](../../../../../klaytn/design/transactions/fee-delegation.md#txtypefeedelegatedvaluetransfermemo). The `transactionObject` có thể có các thuộc tính dưới đây để tạo giao dịch `FeeDelegatedValueTransferMemo`.

`FeeDelegatedValueTransferMemo` có các thuộc tính sau đây giống như các biến thành viên. Thuộc tính được đánh dấu là `optional` nghĩa là các thuộc tính được tùy ý đưa ra trong `transactionObject` khi người dùng tạo giao dịch `FeeDelegatedValueTransferMemo`.

{% hint style="success" %}
LƯU Ý: Bạn có thể tạo một đối tượng `FeeDelegatedValueTransferMemo` từ chuỗi mã hóa RLP. Hãy xem ví dụ dưới đây. LƯU Ý: `caver.transaction.feeDelegatedValueTransferMemo.create` được hỗ trợ kể từ phiên bản caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1).

LƯU Ý: Tính đến phiên bản caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4), tính năng tạo giao dịch chỉ được hỗ trợ bằng cách sử dụng hàm `create`. Nếu bạn đang tạo giao dịch bằng cách sử dụng hàm tạo như `new caver.transaction.feeDelegatedValueTransferMemo({...})`, vui lòng đổi thành `caver.transaction.feeDelegatedValueTransferMemo.create({...})`.
{% endhint %}

**thuộc tính**

| Tên                | Loại | Mô tả                                                                                                                                                                                                                 |
| ------------------ | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value              | chuỗi | Số lượng KLAY tính bằng peb sẽ được chuyển. Bạn có thể sử dụng hàm `caver.utils.toPeb`.                                                                                                                               |
| from               | chuỗi | Địa chỉ của người gửi.                                                                                                                                                                                                |
| to                 | chuỗi | Địa chỉ tài khoản sẽ nhận giá trị được chuyển.                                                                                                                                                                        |
| input              | chuỗi | Dữ liệu gắn kèm theo giao dịch. Tin nhắn cần được truyền vào thuộc tính này.                                                                                                                                          |
| gas                | chuỗi | Giá trị phí giao dịch tối đa mà giao dịch được phép sử dụng.                                                                                                                                                          |
| signatures         | Mảng  | (tùy chọn) Mảng các chữ ký.                                                                                                                                                                                           |
| feePayerSignatures | Mảng  | (tùy chọn) Mảng các chữ ký của người trả phí.                                                                                                                                                                         |
| feePayer           | chuỗi | (tùy chọn) Địa chỉ của người trả phí.                                                                                                                                                                                 |
| nonce              | chuỗi | (tùy chọn) Giá trị được sử dụng để định danh duy nhất cho một giao dịch của người gửi. Nếu bỏ qua tham số này, `caver.rpc.klay.getTransactionCount(address, 'pending')` sẽ được sử dụng để thiết lập số dùng một lần. |
| gasPrice           | chuỗi | (tùy chọn) Một tham số nhân để tính toán số lượng token mà người gửi sẽ thanh toán. Nếu bỏ qua tham số này, `caver.rpc.klay.getGasPrice` sẽ được sử dụng để thiết lập giá gas.                                        |
| chainId            | chuỗi | (tùy chọn) Mã chuỗi của Klaytn. Nếu bỏ qua tham số này, `caver.rpc.klay.getChainId` sẽ được sử dụng để thiết lập mã chuỗi.                                                                                            |

**Ví dụ**

```javascript
// Tạo một giao dịch feeDelegatedValueTransferMemo
> caver.transaction.feeDelegatedValueTransferMemo.create({
    from: '0x{address in hex}',
    to: '0x9957dfd92e4b70f91131c573293343bc5f21f215',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 25000,
    input: '0x68656c6c6f',
})

// Tạo một giao dịch feeDelegatedValueTransferMemo từ chuỗi mã hóa RLP
> caver.transaction.feeDelegatedValueTransferMemo.create('0x11f8dc8204d219830f4240947b65b75d204abed71587c9e519a89277766ee1d00a94a94f5374fce5edbc8e2a8697c15331677e6ebf0b8568656c6c6ff845f84326a064e213aef0167fbd853f8f9989ef5d8b912a77457395ccf13d7f37009edd5c5ba05d0c2e55e4d8734fe2516ed56ac628b74c0eb02aa3b6eda51e1e25a1396093e1945a0043070275d9f6054307ee7348bd660849d90ff845f84326a087390ac14d3c34440b6ddb7b190d3ebde1a07d9a556e5a82ce7e501f24a060f9a037badbcb12cda1ed67b12b1831683a08a3adadee2ea760a07a46bdbb856fea44')
FeeDelegatedValueTransferMemo {
    _type: 'TxTypeFeeDelegatedValueTransferMemo',
    _from: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
    _gas: '0xf4240',
    _nonce: '0x4d2',
    _gasPrice: '0x19',
    _signatures: [ SignatureData { _v: '0x26', _r: '0x64e21...', _s: '0x5d0c2...' } ],
    _feePayer: '0x5a0043070275d9f6054307ee7348bd660849d90f',
    _feePayerSignatures: [ SignatureData { _v: '0x26', _r: '0x87390...', _s: '0x37bad...' } ],
    _to: '0x7b65b75d204abed71587c9e519a89277766ee1d0',
    _value: '0xa',
    _input: '0x68656c6c6f'
}
```

## FeeDelegatedAccountUpdate <a id="feedelegatedaccountupdate"></a>

```javascript
caver.transaction.feeDelegatedAccountUpdate.create(transactionObject)
```

`FeeDelegatedAccountUpdate` biểu thị một [giao dịch cập nhật tài khoản có phí ủy thác](../../../../../klaytn/design/transactions/fee-delegation.md#txtypefeedelegatedaccountupdate). The `transactionObject` có thể có các thuộc tính dưới đây để tạo giao dịch `FeeDelegatedAccountUpdate`.

`FeeDelegatedAccountUpdate` có các thuộc tính sau đây giống như các biến thành viên. Thuộc tính được đánh dấu là `optional` nghĩa là các thuộc tính được tùy ý đưa ra trong `transactionObject` khi người dùng tạo giao dịch `FeeDelegatedAccountUpdate`.

{% hint style="success" %}
LƯU Ý: Bạn có thể tạo một đối tượng `FeeDelegatedAccountUpdate` từ chuỗi mã hóa RLP. Hãy xem ví dụ dưới đây. LƯU Ý: `caver.transaction.feeDelegatedAccountUpdate.create` được hỗ trợ kể từ phiên bản caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1).

LƯU Ý: Tính đến phiên bản caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4), tính năng tạo giao dịch chỉ được hỗ trợ bằng cách sử dụng hàm `create`. Nếu bạn đang tạo giao dịch bằng cách sử dụng hàm tạo như `new caver.transaction.feeDelegatedAccountUpdate({...})`, vui lòng đổi thành `caver.transaction.feeDelegatedAccountUpdate.create({...})`.
{% endhint %}

**thuộc tính**

| Tên                | Loại      | Mô tả                                                                                                                                                                                                                 |
| ------------------ | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from               | chuỗi     | Địa chỉ của người gửi.                                                                                                                                                                                                |
| account            | [Account] | Một đối tượng [Account] chứa các thông tin cần thiết để cập nhật tài khoản của bạn.                                                                                                                                   |
| gas                | chuỗi     | Giá trị phí giao dịch tối đa mà giao dịch được phép sử dụng.                                                                                                                                                          |
| signatures         | Mảng      | (tùy chọn) Mảng các chữ ký.                                                                                                                                                                                           |
| feePayerSignatures | Mảng      | (tùy chọn) Mảng các chữ ký của người trả phí.                                                                                                                                                                         |
| feePayer           | chuỗi     | (tùy chọn) Địa chỉ của người trả phí.                                                                                                                                                                                 |
| nonce              | chuỗi     | (tùy chọn) Giá trị được sử dụng để định danh duy nhất cho một giao dịch của người gửi. Nếu bỏ qua tham số này, `caver.rpc.klay.getTransactionCount(address, 'pending')` sẽ được sử dụng để thiết lập số dùng một lần. |
| gasPrice           | chuỗi     | (tùy chọn) Một tham số nhân để tính toán số lượng token mà người gửi sẽ thanh toán. Nếu bỏ qua tham số này, `caver.rpc.klay.getGasPrice` sẽ được sử dụng để thiết lập giá gas.                                        |
| chainId            | chuỗi     | (tùy chọn) Mã chuỗi của Klaytn. Nếu bỏ qua tham số này, `caver.rpc.klay.getChainId` sẽ được sử dụng để thiết lập mã chuỗi.                                                                                            |

Để biết cách tạo một đối tượng [Account] cho mỗi loại `AccountKey`, hãy tham khảo [Bắt đầu - Cập nhật tài khoản](../../getting-started.md#account-update) hoặc [caver.account.create](../caver.account.md#caver-account-create).

**Ví dụ**

```javascript
// Tạo một giao dịch feeDelegatedAccountUpdate
> caver.transaction.feeDelegatedAccountUpdate.create({
    from: '0x{address in hex}',
    gas: 50000,
    account: caver.account.createWithAccountKeyLegacy('0x{address in hex}'),
})

// Tạo một giao dịch feeDelegatedAccountUpdate từ chuỗi mã hóa RLP
> caver.transaction.feeDelegatedAccountUpdate.create('0x21f8ea018505d21dba00830493e094ac1aec09ef5f8dde6a0baf709ea388bbd7965f72a302a103d032771e5d927fb568cdf7605496b700277d7b9bcabe7657f45602348964e396f846f844820fe99f0e1a3542288951226c66e6e8de320ddef4e0c0d6650baec828998a7ce411fea052d0766f3b84f35787d2a810f97057d215dcbe070cd890b7ccb8aaa3aac8eacc9423bf3d4eb274621e56ce65f6fa05da9e24785bb8f847f845820feaa0faca4cf91418c6fea61e9439620b656c7b0717b058fd8787865f4564a0f9974ea03a483582435426e7b2aeffe3131a678ae54c7aa948fa5442b5ded209ba373221')
FeeDelegatedAccountUpdate {
    _type: 'TxTypeFeeDelegatedAccountUpdate',
    _from: '0xac1aec09ef5f8dde6a0baf709ea388bbd7965f72',
    _gas: '0x493e0',
    _nonce: '0x1',
    _gasPrice: '0x5d21dba00',
    _signatures: [ SignatureData { _v: '0x0fe9', _r: '0x0e1a3...', _s: '0x52d07...' } ],
    _feePayer: '0x23bf3d4eb274621e56ce65f6fa05da9e24785bb8',
    _feePayerSignatures: [ SignatureData { _v: '0x0fea', _r: '0xfaca4...', _s: '0x3a483...' } ],
    _account: Account {
        _address: '0xac1aec09ef5f8dde6a0baf709ea388bbd7965f72',
        _accountKey: AccountKeyPublic { _publicKey: '0x03d03...' }
    }
}
```

## FeeDelegatedSmartContractDeploy <a id="feedelegatedsmartcontractdeploy"></a>

```javascript
caver.transaction.feeDelegatedSmartContractDeploy.create(transactionObject)
```

`FeeDelegatedSmartContractDeploy` biểu thị một [giao dịch triển khai hợp đồng thông minh có phí ủy thác](../../../../../klaytn/design/transactions/fee-delegation.md#txtypefeedelegatedsmartcontractdeploy). The `transactionObject` có thể có các thuộc tính dưới đây để tạo giao dịch `FeeDelegatedSmartContractDeploy`.

`FeeDelegatedSmartContractDeploy` có các thuộc tính sau đây giống như các biến thành viên. Thuộc tính được đánh dấu là `optional` nghĩa là các thuộc tính được tùy ý đưa ra trong `transactionObject` khi người dùng tạo giao dịch `FeeDelegatedSmartContractDeploy`.

{% hint style="success" %}
LƯU Ý: Bạn có thể tạo một đối tượng `FeeDelegatedSmartContractDeploy` từ chuỗi mã hóa RLP. Hãy xem ví dụ dưới đây. LƯU Ý: `caver.transaction.feeDelegatedSmartContractDeploy.create` được hỗ trợ kể từ phiên bản caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1).

LƯU Ý: Tính đến phiên bản caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4), tính năng tạo giao dịch chỉ được hỗ trợ bằng cách sử dụng hàm `create`. Nếu bạn đang tạo giao dịch bằng cách sử dụng hàm tạo như `new caver.transaction.feeDelegatedSmartContractDeploy({...})`, vui lòng đổi thành `caver.transaction.feeDelegatedSmartContractDeploy.create({...})`.
{% endhint %}

**thuộc tính**

| Tên                | Loại | Mô tả                                                                                                                                                                                                                                   |
| ------------------ | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from               | chuỗi | Địa chỉ của người gửi.                                                                                                                                                                                                                  |
| input              | chuỗi | Dữ liệu gắn kèm theo giao dịch. Chỉ thị biên dịch của hợp đồng thông minh sẽ được triển khai và các đối số của nó. Bạn có thể lấy dữ liệu này bằng hàm [caver.abi.encodeContractDeploy](../caver.abi.md#encodecontractdeploy).          |
| gas                | chuỗi | Giá trị phí giao dịch tối đa mà giao dịch được phép sử dụng.                                                                                                                                                                            |
| value              | chuỗi | (tùy chọn, mặc định: `'0x0'`) Số lượng KLAY tính bằng peb sẽ được chuyển. Bạn có thể sử dụng hàm `caver.utils.toPeb`.                                                                                                                   |
| to                 | chuỗi | (tùy chọn, mặc định: `'0x'`) Địa chỉ mà hợp đồng thông minh được triển khai. Hiện tại không thể xác định giá trị này. Tính năng xác định địa chỉ sẽ được hỗ trợ trong tương lai.                                                        |
| humanReadable      | logic | (tùy chọn, mặc định: `false`) Phải là giá trị false vì địa chỉ con người có thể đọc được chưa được hỗ trợ.                                                                                                                              |
| codeFormat         | chuỗi | (tùy chọn, mặc định: `'EVM'`) Định dạng mã của mã hợp đồng thông minh. Hiện tại, giá trị được hỗ trợ chỉ có EVM. Giá trị này được chuyển đổi thành chuỗi số hex sau khi được gán (ví dụ:> `EVM` được chuyển đổi thành `0x0`) bên trong. |
| signatures         | Mảng  | (tùy chọn) Mảng các chữ ký.                                                                                                                                                                                                             |
| feePayerSignatures | Mảng  | (tùy chọn) Mảng các chữ ký của người trả phí.                                                                                                                                                                                           |
| feePayer           | chuỗi | (tùy chọn) Địa chỉ của người trả phí.                                                                                                                                                                                                   |
| nonce              | chuỗi | (tùy chọn) Giá trị được sử dụng để định danh duy nhất cho một giao dịch của người gửi. Nếu bỏ qua tham số này, `caver.rpc.klay.getTransactionCount(address, 'pending')` sẽ được sử dụng để thiết lập số dùng một lần.                   |
| gasPrice           | chuỗi | (tùy chọn) Một tham số nhân để tính toán số lượng token mà người gửi sẽ thanh toán. Nếu bỏ qua tham số này, `caver.rpc.klay.getGasPrice` sẽ được sử dụng để thiết lập giá gas.                                                          |
| chainId            | chuỗi | (tùy chọn) Mã chuỗi của Klaytn. Nếu bỏ qua tham số này, `caver.rpc.klay.getChainId` sẽ được sử dụng để thiết lập mã chuỗi.                                                                                                              |

**Ví dụ**

```javascript
// Tạo một giao dịch feeDelegatedSmartContractDeploy
> caver.transaction.feeDelegatedSmartContractDeploy.create({
    from: '0x{address in hex}',
    input: '0x60806...',
    gas: 100000,
})

// Tạo một giao dịch feeDelegatedSmartContractDeploy từ chuỗi mã hóa RLP
> caver.transaction.feeDelegatedSmartContractDeploy.create('0x29f902cc808505d21dba00830dbba08080948061145252c8f2b4f110aed096435ae6ed7d5a95b901fe608060405234801561001057600080fd5b506101de806100206000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a72305820627ca46bb09478a015762806cc00c431230501118c7c26c30ac58c4e09e51c4f00298080f847f845820fe9a07abfd0f0cfb9a9c38c6e3e1a4eeb15f43aeb4b4f6dee7c3f37c07e417af89d9ba03f1e54a512c906d2e57a611b25ce4739d12928e199c3e89792b82f577f0da9ad942c8eb96e7060ab864d94e91ab16f214dc6647628f847f845820fe9a0192e3b6457f13c6ef557bd11074702d5062dd463473c483278c57f651d5b712ba03ff8638b7cc7ed86c793cb5ffe0e8a064fc94946c3aab624bb7704c62e81ec2d')
FeeDelegatedSmartContractDeploy {
    _type: 'TxTypeFeeDelegatedSmartContractDeploy',
    _from: '0x8061145252c8f2b4f110aed096435ae6ed7d5a95',
    _gas: '0xdbba0',
    _nonce: '0x0',
    _gasPrice: '0x5d21dba00',
    _signatures: [ SignatureData { _v: '0x0fe9', _r: '0x7abfd...', _s: '0x3f1e5...' } ],
    _feePayer: '0x2c8eb96e7060ab864d94e91ab16f214dc6647628',
    _feePayerSignatures: [ SignatureData { _v: '0x0fe9', _r: '0x192e3...', _s: '0x3ff86...' } ],
    _to: '0x',
    _value: '0x0',
    _input: '0x60806...',
    _humanReadable: false,
    _codeFormat: '0x0'
}
```

## FeeDelegatedSmartContractExecution <a id="feedelegatedsmartcontractexecution"></a>

```javascript
caver.transaction.feeDelegatedSmartContractExecution.create(transactionObject)
```

`FeeDelegatedSmartContractExecution` biểu thị một [giao dịch thực thi hợp đồng thông minh có phí ủy thác](../../../../../klaytn/design/transactions/fee-delegation.md#txtypefeedelegatedsmartcontractexecution). The `transactionObject` có thể có các thuộc tính dưới đây để tạo giao dịch `FeeDelegatedSmartContractExecution`.

`FeeDelegatedSmartContractExecution` có các thuộc tính sau đây giống như các biến thành viên. Thuộc tính được đánh dấu là `optional` nghĩa là các thuộc tính được tùy ý đưa ra trong `transactionObject` khi người dùng tạo giao dịch `FeeDelegatedSmartContractExecution`.

{% hint style="success" %}
LƯU Ý: Bạn có thể tạo một đối tượng `FeeDelegatedSmartContractExecution` từ chuỗi mã hóa RLP. Hãy xem ví dụ dưới đây. LƯU Ý: `caver.transaction.feeDelegatedSmartContractExecution.create` được hỗ trợ kể từ phiên bản caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1).

LƯU Ý: Tính đến phiên bản caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4), tính năng tạo giao dịch chỉ được hỗ trợ bằng cách sử dụng hàm `create`. Nếu bạn đang tạo giao dịch bằng cách sử dụng hàm tạo như `new caver.transaction.feeDelegatedSmartContractExecution({...})`, vui lòng đổi thành `caver.transaction.feeDelegatedSmartContractExecution.create({...})`.
{% endhint %}

**thuộc tính**

| Tên                | Loại  | Mô tả                                                                                                                                                                                                                                                                                        |
| ------------------ | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from               | string | The address of the sender.                                                                                                                                                                                                                                                                   |
| to                 | string | The address of the smart contract account to be executed.                                                                                                                                                                                                                                    |
| input              | string | Data attached to the transaction, used for transaction execution. The input is an encoded string that indicates a function to call and parameters to be passed to this function. You can get this encoded string through [caver.abi.encodeFunctionCall](../caver.abi.md#encodefunctioncall). |
| gas                | string | The maximum amount of transaction fee the transaction is allowed to use.                                                                                                                                                                                                                     |
| value              | string | (optional, default: `'0x0'`) The amount of KLAY in peb to be transferred. You can use `caver.utils.toPeb`.                                                                                                                                                                                   |
| signatures         | Array  | (optional) An array of signatures.                                                                                                                                                                                                                                                           |
| feePayerSignatures | Array  | (optional) An array of feePayerSignatures.                                                                                                                                                                                                                                                   |
| feePayer           | string | (optional) The address of fee payer.                                                                                                                                                                                                                                                         |
| nonce              | string | (optional) A value used to uniquely identify a sender’s transaction. If omitted, `caver.rpc.klay.getTransactionCount(address, 'pending')` will be used to set nonce.                                                                                                                         |
| gasPrice           | string | (optional) A multiplier to get how much the sender will pay in tokens. If omitted, `caver.rpc.klay.getGasPrice` will be used to set gasPrice.                                                                                                                                                |
| chainId            | string | (optional) The chain id of the Klaytn. If omitted, `caver.rpc.klay.getChainId` will be used to set chainId.                                                                                                                                                                                  |

**Example**

```javascript
// Create a feeDelegatedSmartContractExecution
> caver.transaction.feeDelegatedSmartContractExecution.create({
    from: '0x{address in hex}',
    to: '0x{address in hex}',
    input: '0xa9059...',
    gas: 90000,
})

// Create a feeDelegatedSmartContractExecution from RLP-encoded string
> caver.transaction.feeDelegatedSmartContractExecution.create('0x31f8fb8204d219830f4240947b65b75d204abed71587c9e519a89277766ee1d00a94a94f5374fce5edbc8e2a8697c15331677e6ebf0ba46353586b000000000000000000000000bc5951f055a85f41a3b62fd6f68ab7de76d299b2f845f84325a0253aea7d2c37160da45e84afbb45f6b3341cf1e8fc2df4ecc78f14adb512dc4fa022465b74015c2a8f8501186bb5e200e6ce44be52e9374615a7e7e21c41bc27b5945a0043070275d9f6054307ee7348bd660849d90ff845f84326a0e7c51db7b922c6fa2a941c9687884c593b1b13076bdf0c473538d826bf7b9d1aa05b0de2aabb84b66db8bf52d62f3d3b71b592e3748455630f1504c20073624d80')
FeeDelegatedSmartContractExecution {
    _type: 'TxTypeFeeDelegatedSmartContractExecution',
    _from: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
    _gas: '0xf4240',
    _nonce: '0x4d2',
    _gasPrice: '0x19',
    _signatures: [ SignatureData { _v: '0x25', _r: '0x253ae...', _s: '0x22465b...' } ],
    _feePayer: '0x5a0043070275d9f6054307ee7348bd660849d90f',
    _feePayerSignatures:  SignatureData { _v: '0x26', _r: '0xe7c51...', _s: '0x5b0de...' } ],
    _to: '0x7b65b75d204abed71587c9e519a89277766ee1d0',
    _value: '0xa',
    _input: '0x6353586b000000000000000000000000bc5951f055a85f41a3b62fd6f68ab7de76d299b2'
}
```

## FeeDelegatedCancel <a id="feedelegatedcancel"></a>

```javascript
caver.transaction.feeDelegatedCancel.create(transactionObject)
```

`FeeDelegatedCancel` represents a [fee delegated cancel transaction](../../../../../klaytn/design/transactions/fee-delegation.md#txtypefeedelegatedcancel). The `transactionObject` can have properties below to create a `FeeDelegatedCancel` transaction.

`FeeDelegatedCancel` has the properties below as its member variables. Properties marked as `optional` refer to properties that can be optionally defined in `transactionObject` when the user creates `FeeDelegatedCancel` transaction.

{% hint style="success" %}
NOTE: You can create an instance of `FeeDelegatedCancel` from RLP-encoded strings. Please refer to the below example. NOTE: `caver.transaction.feeDelegatedCancel.create` is supported since caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1).

NOTE: As of caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4), creating transactions is only supported using the `create` function. If you've been creating transactions using a constructor like `new caver.transaction.feeDelegatedCancel({...})`, please change it to `caver.transaction.feeDelegatedCancel.create({...})`.
{% endhint %}

**properties**

| Name               | Type   | Description                                                                                                                                                          |
| ------------------ | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from               | string | The address of the sender.                                                                                                                                           |
| gas                | string | The maximum amount of transaction fee the transaction is allowed to use.                                                                                             |
| nonce              | string | (optional) A value used to uniquely identify a sender’s transaction. If omitted, `caver.rpc.klay.getTransactionCount(address, 'pending')` will be used to set nonce. |
| signatures         | Array  | (optional) An array of signatures.                                                                                                                                   |
| feePayerSignatures | Array  | (optional) An array of feePayerSignatures.                                                                                                                           |
| feePayer           | string | (optional) The address of fee payer.                                                                                                                                 |
| gasPrice           | string | (optional) A multiplier to get how much the sender will pay in tokens. If omitted, `caver.rpc.klay.getGasPrice` will be used to set gasPrice.                        |
| chainId            | string | (optional) The chain id of the Klaytn. If omitted, `caver.rpc.klay.getChainId` will be used to set chainId.                                                          |

**Example**

```javascript
// Create a feeDelegatedCancel
> caver.transaction.feeDelegatedCancel.create({
    from: '0x{address in hex}',
    nonce: 1,
    gas: 25000,
})

// Create a feeDelegatedCancel from RLP-encoded string
> caver.transaction.feeDelegatedCancel.create('0x39f8c08204d219830f424094a94f5374fce5edbc8e2a8697c15331677e6ebf0bf845f84326a08409f5441d4725f90905ad87f03793857d124de7a43169bc67320cd2f020efa9a060af63e87bdc565d7f7de906916b2334336ee7b24d9a71c9521a67df02e7ec92945a0043070275d9f6054307ee7348bd660849d90ff845f84326a0044d5b25e8c649a1fdaa409dc3817be390ad90a17c25bc17c89b6d5d248495e0a073938e690d27b5267c73108352cf12d01de7fd0077b388e94721aa1fa32f85ec')
FeeDelegatedCancel {
    _type: 'TxTypeFeeDelegatedCancel',
    _from: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
    _gas: '0xf4240',
    _nonce: '0x4d2',
    _gasPrice: '0x19',
    _signatures: [ SignatureData { _v: '0x26', _r: '0x8409f...', _s: '0x60af6...' } ],
    _feePayer: '0x5a0043070275d9f6054307ee7348bd660849d90f',
    _feePayerSignatures: [ SignatureData { _v: '0x26', _r: '0x044d5...', _s: '0x73938...' } ]
}
```

## FeeDelegatedChainDataAnchoring <a id="feedelegatedchaindataanchoring"></a>

```javascript
caver.transaction.feeDelegatedChainDataAnchoring.create(transactionObject)
```

`FeeDelegatedChainDataAnchoring` represents a [fee delegated chain data anchoring transaction](../../../../../klaytn/design/transactions/fee-delegation.md#txtypefeedelegatedchaindataanchoring). The `transactionObject` can have properties below to create a `FeeDelegatedChainDataAnchoring` transaction.

`FeeDelegatedChainDataAnchoring` has the properties below as its member variables. Properties marked as `optional` refer to properties that can be optionally defined in `transactionObject` when the user creates `FeeDelegatedChainDataAnchoring` transaction.

{% hint style="success" %}
NOTE: You can create an instance of `FeeDelegatedChainDataAnchoring` from RLP-encoded strings. Please refer to the below example. NOTE: `caver.transaction.feeDelegatedChainDataAnchoring.create` is supported since caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1).

NOTE: As of caver-js [v1.8.1-rc.4](https://www.npmjs.com/package/caver-js/v/1.8.1-rc.4), creating transactions is only supported using the `create` function. If you've been creating transactions using a constructor like `new caver.transaction.feeDelegatedChainDataAnchoring({...})`, please change it to `caver.transaction.feeDelegatedChainDataAnchoring.create({...})`.
{% endhint %}

**properties**

| Name               | Type   | Description                                                                                                                                                          |
| ------------------ | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from               | string | The address of the sender.                                                                                                                                           |
| input              | string | Data of the service chain.                                                                                                                                           |
| gas                | string | The maximum amount of transaction fee the transaction is allowed to use.                                                                                             |
| nonce              | string | (optional) A value used to uniquely identify a sender’s transaction. If omitted, `caver.rpc.klay.getTransactionCount(address, 'pending')` will be used to set nonce. |
| signatures         | Array  | (optional) An array of signatures.                                                                                                                                   |
| feePayerSignatures | Array  | (optional) An array of feePayerSignatures.                                                                                                                           |
| feePayer           | string | (optional) The address of fee payer.                                                                                                                                 |
| gasPrice           | string | (optional) A multiplier to get how much the sender will pay in tokens. If omitted, `caver.rpc.klay.getGasPrice` will be used to set gasPrice.                        |
| chainId            | string | (optional) The chain id of the Klaytn. If omitted, `caver.rpc.klay.getChainId` will be used to set chainId.                                                          |

**Example**

```javascript
// Create a feeDelegatedChainDataAnchoring
> caver.transaction.feeDelegatedChainDataAnchoring.create({
    from: '0x{address in hex}',
    gas: 50000,
    input: '0xf8a6a...',
})

// Create a feeDelegatedChainDataAnchoring from RLP-encoded string
> caver.transaction.feeDelegatedChainDataAnchoring.create('0x49f90176118505d21dba0085174876e80094a94f5374fce5edbc8e2a8697c15331677e6ebf0bb8aff8ad80b8aaf8a8a00000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000001a00000000000000000000000000000000000000000000000000000000000000002a00000000000000000000000000000000000000000000000000000000000000003a00000000000000000000000000000000000000000000000000000000000000004058006f845f84326a0afe41edc9cce1185ab9065ca7dbfb89ab5c7bde3602a659aa258324124644142a0317848698248ba7cc057b8f0dd19a27b52ef904d29cb72823100f1ed18ba2bb39433f524631e573329a550296f595c820d6c65213ff845f84325a0309e46db21a1bf7bfdae24d9192aca69516d6a341ecce8971fc69cff481cee76a04b939bf7384c4f919880307323a5e36d4d6e029bae1887a43332710cdd48f174')
FeeDelegatedChainDataAnchoring {
    _type: 'TxTypeFeeDelegatedChainDataAnchoring',
    _from: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
    _gas: '0x174876e800',
    _nonce: '0x11',
    _gasPrice: '0x5d21dba00',
    _signatures: [ SignatureData { _v: '0x26', _r: '0xafe41...', _s: '0x31784...' } ],
    _feePayer: '0x33f524631e573329a550296f595c820d6c65213f',
    _feePayerSignatures: [ SignatureData { _v: '0x25', _r: '0x309e4...', _s: '0x4b939...' } ],
    _input: '0xf8ad8...'
}
```
