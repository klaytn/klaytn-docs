# Giao dịch cập nhật tài khoản

## sendTransaction (ACCOUNT_UPDATE) <a id="sendtransaction-account_update"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```

Gửi giao dịch [Cập nhật tài khoản](../../../../../../learn/transactions/basic.md#txtypeaccountupdate) đến mạng.

**Tham số**

Các tham số của hàm sendTransaction bao gồm một đối tượng giao dịch và một hàm callback.

| Tên               | type      | Mô tả                                                                                                                              |
| ----------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| transactionObject | Đối tượng | Đối tượng giao dịch cần gửi.                                                                                                       |
| callback          | Hàm       | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

Một đối tượng giao dịch loại `ACCOUNT_UPDATE` có cấu trúc như sau: Lưu ý rằng khi cung cấp khóa mới, bạn chỉ nên cung cấp một trong các giá trị dưới đây phù hợp với loại khóa.
Note that when you provide the new key, you should provide just one of the below depending on the key type. Nếu cung cấp nhiều hơn một khóa, bạn sẽ nhận được lỗi 'khóa trùng lặp'. Từ phiên bản caver-js v1.2.0, nên sử dụng `key` với đối tượng `AccountForUpdate`.

- khóa
- legacyKey
- publicKey
- multisig
- roleTransactionKey, roleAccountUpdateKey, roleFeePayerKey
- failKey

| Tên                  | Loại     | Mô tả                                                                                                                                                                                                                                                                                                       |
| -------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type                 | Chuỗi     | Loại giao dịch. "ACCOUNT_UPDATE"                                                                                                                                                                                                                                                       |
| từ                   | Chuỗi     | Địa chỉ của người gửi giao dịch này. Tài khoản này sẽ được cập nhật bằng giao dịch này.                                                                                                                                                                                                                     |
| gas                  | Số        | Lượng gas tối đa sẵn sàng trả cho giao dịch (sẽ hoàn lại số gas chưa được dùng đến).                                                                                                                                                                                                     |
| giá gas              | Số        | (tùy chọn) Giá gas được người gửi cung cấp theo đơn vị peb. Tham số gasPrice phải giống với tham số unitPrice được thiết lập trong nút Klaytn.                                                                                                                                           |
| nonce                | Số        | (tùy chọn) Giá trị nguyên của số dùng một lần. Nếu bị bỏ qua, số lượng giao dịch sẽ được caver-js thiết lập bằng cách gọi ra `caver.klay.getTransactionCount`.                                                                                                                           |
| khóa                 | Đối tượng | (tùy chọn) Một đối tượng `AccountForUpdate` chứa địa chỉ và khóa sẽ được sử dụng khi cập nhật tài khoản. Để biết cách tạo một đối tượng AccountForUpdate cho mỗi loại khóa, hãy xem [caver.klay.tài khoảns.createAccountForUpdate](../../caver.klay.accounts.md#createaccountforupdate). |
| legacyKey            | Bool      | (tùy chọn) Nếu muốn cập nhật tài khoản để có khóa kế thừa, hãy đặt giá trị này thành true.                                                                                                                                                                                               |
| publicKey            | Chuỗi     | (tùy chọn) Nếu muốn cập nhật tài khoản để có khóa công khai, hãy ghi ra khóa công khai 64 byte.                                                                                                                                                                                          |
| multisig             | Đối tượng | (tùy chọn) Nếu muốn cập nhật tài khoản để có khóa đa chữ ký, hãy ghi ra danh sách các khóa công khai có trọng số tạo thành khóa đa chữ ký. Cơ chế đa chữ ký cũng xác định ngưỡng. Khi ký một giao dịch, tổng trọng số của các chữ ký phải lớn hơn hoặc bằng ngưỡng được thiết lập.       |
| roleTransactionKey   | Đối tượng | (tùy chọn) Nếu muốn cập nhật tài khoản để có khóa theo vai trò, hãy ghi ra khóa roleTransactionKey. Khóa roleTransactionKey có thể là khóa công khai hoặc khóa đa chữ ký. Khóa roleTransactionKey này sẽ được sử dụng khi ký một giao dịch.                                              |
| roleAccountUpdateKey | Đối tượng | (tùy chọn) Nếu muốn cập nhật tài khoản để có khóa theo vai trò, hãy ghi ra khóa roleAccountUpdateKey. Khóa roleAccountUpdateKey có thể là khóa công khai hoặc khóa đa chữ ký. Khóa roleAccountUpdateKey này sẽ được sử dụng khi ký giao dịch AccountUpdate.                              |
| roleFeePayerKey      | Đối tượng | (tùy chọn) Nếu muốn cập nhật tài khoản để có khóa theo vai trò, hãy ghi ra khóa roleFeePayerKey. Khóa roleFeePayerKey có thể là khóa công khai hoặc khóa đa chữ ký. Khóa roleFeePayerKey này sẽ được sử dụng khi ký giao dịch với vai trò là người trả phí.                              |
| failKey              | Bool      | (tùy chọn) Nếu muốn cập nhật tài khoản để có khóa fail, hãy đặt giá trị này thành true.                                                                                                                                                                                                  |

Nếu bạn gọi ra hàm `caver.klay.sendTransaction` với một đối tượng giao dịch thuộc loại `ACCOUNT_UPDATE` như trên, caver-js sẽ gửi đối tượng này đến mạng sau khi ký bằng khóa của tài khoản người gửi (`from`) trong ví trong bộ nhớ.

**Giá trị trả về**

Hàm `callback` sẽ trả về hàm băm giao dịch 32 byte.

`PromiEvent`: Bộ phát hiệu ứng sự kiện kết hợp promise. Sẽ được xử lý khi có biên lai giao dịch. Ngoài ra còn có các sự kiện sau đây:

- `"transactionHash"` trả về `String`: Được kích hoạt ngay sau khi gửi giao dịch và có hàm băm giao dịch.
- `"receipt"` trả về `Object`: Được kích hoạt khi có sẵn biên lai giao dịch.
- `"error"` trả về `Error`: Được kích hoạt nếu có lỗi phát sinh trong quá trình gửi. Khi xảy ra lỗi hết gas, tham số thứ hai sẽ là biên lai.

**Ví dụ**

```javascript
const account = caver.klay.accounts.wallet.add('0x{private key}')

// Case 1: Updating account with an AccountForUpdate instance

const accountForUpdate = caver.klay.accounts.createAccountForUpdate(account.address, '0x{private key}')

// using the promise
caver.klay.sendTransaction({
    type: 'ACCOUNT_UPDATE',
    from: account.address,
    key: accountForUpdate,
    gas: '300000',
})
.then(function(receipt){
    ...
})

// using the event emitter
caver.klay.sendTransaction({
    type: 'ACCOUNT_UPDATE',
    from: account.address,
    key: accountForUpdate,
    gas: '300000',
})
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
    ...
})
.on('error', console.error)

// Case 2: Updating account with legacy key

// using the promise
caver.klay.sendTransaction({
    type: 'ACCOUNT_UPDATE',
    from: account.address,
    legacyKey: true,
    gas: '300000',
})
.then(function(receipt){
    ...
});

// using the event emitter
caver.klay.sendTransaction({
    type: 'ACCOUNT_UPDATE',
    from: account.address,
    legacyKey: true,
    gas: '300000',
})
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
    ...
})
.on('error', console.error); // If an out-of-gas error, the second parameter is the receipt.

// Case 3: Updating account with public key

// using the promise
caver.klay.sendTransaction({
    type: 'ACCOUNT_UPDATE',
    from: account.address,
    publicKey: '0x9016de15ebb219b1e8bc732070df93a28903e5799d0cd24a807a5afabf4601f7e5ab312b5a682dd8c0e72e71e67552174d5082cde25db3626a5b025f97f8a005',
    gas: '300000',
})
.then(function(receipt){
    ...
});

// using the event emitter
caver.klay.sendTransaction({
    type: 'ACCOUNT_UPDATE',
    from: account.address,
    publicKey: '0x9016de15ebb219b1e8bc732070df93a28903e5799d0cd24a807a5afabf4601f7e5ab312b5a682dd8c0e72e71e67552174d5082cde25db3626a5b025f97f8a005',
    gas: '300000',
})
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
    ...
})
.on('error', console.error); // If an out-of-gas error, the second parameter is the receipt.

// Case 4: Updating account with fail key

// using the promise
caver.klay.sendTransaction({
    type: 'ACCOUNT_UPDATE',
    from: account.address,
    failKey: true,
    gas: '300000',
})
.then(function(receipt){
    ...
});

// using the event emitter
caver.klay.sendTransaction({
    type: 'ACCOUNT_UPDATE',
    from: account.address,
    failKey: true,
    gas: '300000',
})
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
    ...
})
.on('error', console.error); // If an out-of-gas error, the second parameter is the receipt.

// Case 5: Updating account with weighted-multisig

// using the promise
caver.klay.sendTransaction({
  type: 'ACCOUNT_UPDATE',
  from: account.address,
  multisig: {
    threshold: 3,
    keys: [
      { weight: 1, publicKey: '0xb1a73e06009a6ba4816e24018e70fbd6f95b584c61bc704473da5102ac118d3121ce7fc64a7ba5004d487c49865047a7a3d7aa8baec5d9b2c2568f44110daab8' },
      { weight: 1, publicKey: '0x24b437235528893f079b15d65b33a355f315b7a521374f899ae3b3c29c546659dc6bc129cb8de49ccc05617cebf78224a622b9cd238a4fe3b04a5d1f8036efbe' },
      { weight: 1, publicKey: '0x354acd6ef039e69ffc31a690bf6aa748ca76a3dd98c5108793c5e0863a80d3477ebb1fac8c7d3e9a9f6cf57777db28f8ea3efb3937cb17101878b910ee66c527' },
      { weight: 1, publicKey: '0x9016de15ebb219b1e8bc732070df93a28903e5799d0cd24a807a5afabf4601f7e5ab312b5a682dd8c0e72e71e67552174d5082cde25db3626a5b025f97f8a005' },
    ],
  },
  gas: '300000',
})
.then(function(receipt){
    ...
});

// using the event emitter
caver.klay.sendTransaction({
  type: 'ACCOUNT_UPDATE',
  from: account.address,
  multisig: {
    threshold: 3,
    keys: [
      { weight: 1, publicKey: '0xb1a73e06009a6ba4816e24018e70fbd6f95b584c61bc704473da5102ac118d3121ce7fc64a7ba5004d487c49865047a7a3d7aa8baec5d9b2c2568f44110daab8' },
      { weight: 1, publicKey: '0x24b437235528893f079b15d65b33a355f315b7a521374f899ae3b3c29c546659dc6bc129cb8de49ccc05617cebf78224a622b9cd238a4fe3b04a5d1f8036efbe' },
      { weight: 1, publicKey: '0x354acd6ef039e69ffc31a690bf6aa748ca76a3dd98c5108793c5e0863a80d3477ebb1fac8c7d3e9a9f6cf57777db28f8ea3efb3937cb17101878b910ee66c527' },
      { weight: 1, publicKey: '0x9016de15ebb219b1e8bc732070df93a28903e5799d0cd24a807a5afabf4601f7e5ab312b5a682dd8c0e72e71e67552174d5082cde25db3626a5b025f97f8a005' },
    ],
  },
  gas: '300000',
})
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
    ...
})
.on('error', console.error); // If an out-of-gas error, the second parameter is the receipt.

// Case 6: Updating account with role-based key

// using the promise
caver.klay.sendTransaction({
  type: 'ACCOUNT_UPDATE',
  from: account.address,
  roleTransactionKey: {
    publicKey: '0xe4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512d0a5735a23ce1654b14680054a993441eae7c261983a56f8e0da61280758b5919',
  },
  roleAccountUpdateKey: {
    publicKey: '0x36f6355f5b532c3c1606f18fa2be7a16ae200c5159c8031dd25bfa389a4c9c066fdf9fc87a16ac359e66d9761445d5ccbb417fb7757a3f5209d713824596a50d',
  },
  roleFeePayerKey: {
    publicKey: '0xc8785266510368d9372badd4c7f4a94b692e82ba74e0b5e26b34558b0f08144794c27901465af0a703859ab47f8ae17e54aaba453b7cde5a6a9e4a32d45d72b2',
  },
  gas: '300000',
})
.then(function(receipt){
    ...
});

// using the event emitter
caver.klay.sendTransaction({
  type: 'ACCOUNT_UPDATE',
  from: account.address,
  roleTransactionKey: {
    publicKey: '0xe4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512d0a5735a23ce1654b14680054a993441eae7c261983a56f8e0da61280758b5919',
  },
  roleAccountUpdateKey: {
    publicKey: '0x36f6355f5b532c3c1606f18fa2be7a16ae200c5159c8031dd25bfa389a4c9c066fdf9fc87a16ac359e66d9761445d5ccbb417fb7757a3f5209d713824596a50d',
  },
  roleFeePayerKey: {
    publicKey: '0xc8785266510368d9372badd4c7f4a94b692e82ba74e0b5e26b34558b0f08144794c27901465af0a703859ab47f8ae17e54aaba453b7cde5a6a9e4a32d45d72b2',
  },
  gas: '300000',
})
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
    ...
})
.on('error', console.error); // If an out-of-gas error, the second parameter is the receipt.
```

## sendTransaction (FEE_DELEGATED_ACCOUNT_UPDATE) <a id="sendtransaction-fee_delegated_account_update"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```

Gửi giao dịch [Cập nhật tài khoản có ủy thác phí](../../../../../../learn/transactions/fee-delegation.md#txtypefeedelegatedaccountupdate) đến mạng.

Có hai cách cho phép người trả phí ký một giao dịch và gửi giao dịch đến mạng.

1. Gọi ra `caver.klay.sendTransaction` với một đối tượng, `{senderRawTransaction: rawTransaction, feePayer: feePayerAddress}`, sử dụng định dạng giao dịch cho người trả phí. Trong trường hợp này, tài khoản của người trả phí phải tồn tại trong ví caver-js trong bộ nhớ.
2. Ký bằng hàm [caver.klay.tài khoảns.feePayerSignTransaction](../../caver.klay.accounts.md#feepayersigntransaction) và gửi đến mạng thông qua [caver.klay.sendSignedTransaction](./transaction.md#sendsignedtransaction)

Ví dụ ở đây chỉ mô tả cách sử dụng hàm `caver.klay.sendTransaction`.

Để biết thông tin về cách gửi sử dụng hàm `caver.klay.tài khoảns.feePayerSignTransaction` và `caver.klay.sendSignedTransaction`, hãy xem [caver.klay.tài khoảns.feePayerSignTransaction](../../caver.klay.accounts.md#feepayersigntransaction) và [Gửi giao dịch với nhiều người ký](../../../get-started-1.4.1.md#sending-a-transaction-with-multiple-signer).

**Tham số**

Các tham số của hàm sendTransaction bao gồm một đối tượng giao dịch và một hàm callback.

| Tên               | type      | Mô tả                                                                                                                              |
| ----------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| transactionObject | Đối tượng | Đối tượng giao dịch cần gửi.                                                                                                       |
| callback          | Hàm       | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

Một đối tượng giao dịch thuộc loại `FEE_DELEGATED_ACCOUNT_UPDATE` có cấu trúc như sau:

| Tên                  | Loại     | Mô tả                                                                                                                                                                                                                                                                                                       |
| -------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type                 | Chuỗi     | Loại giao dịch. "FEE_DELEGATED_ACCOUNT_UPDATE"                                                                                                                                                                                               |
| từ                   | Chuỗi     | Địa chỉ của người gửi giao dịch này. Tài khoản này sẽ được cập nhật bằng giao dịch này.                                                                                                                                                                                                                     |
| gas                  | Số        | Lượng gas tối đa sẵn sàng trả cho giao dịch (sẽ hoàn lại số gas chưa được dùng đến).                                                                                                                                                                                                     |
| giá gas              | Số        | (tùy chọn) Giá gas được người gửi cung cấp theo đơn vị peb. Tham số gasPrice phải giống với tham số unitPrice được thiết lập trong nút Klaytn.                                                                                                                                           |
| nonce                | Số        | (tùy chọn) Giá trị nguyên của số dùng một lần. Nếu bị bỏ qua, số lượng giao dịch sẽ được caver-js thiết lập bằng cách gọi ra `caver.klay.getTransactionCount`.                                                                                                                           |
| khóa                 | Đối tượng | (tùy chọn) Một đối tượng `AccountForUpdate` chứa địa chỉ và khóa sẽ được sử dụng khi cập nhật tài khoản. Để biết cách tạo một đối tượng AccountForUpdate cho mỗi loại khóa, hãy xem [caver.klay.tài khoảns.createAccountForUpdate](../../caver.klay.accounts.md#createaccountforupdate). |
| legacyKey            | Bool      | (tùy chọn) Nếu muốn cập nhật tài khoản để có khóa kế thừa, hãy đặt giá trị này thành true.                                                                                                                                                                                               |
| publicKey            | Chuỗi     | (tùy chọn) Nếu muốn cập nhật tài khoản để có khóa công khai, hãy ghi ra khóa công khai 64 byte.                                                                                                                                                                                          |
| multisig             | Đối tượng | (tùy chọn) Nếu muốn cập nhật tài khoản để có khóa đa chữ ký, hãy ghi ra danh sách các khóa công khai có trọng số tạo thành khóa đa chữ ký. Cơ chế đa chữ ký cũng xác định ngưỡng. Khi ký một giao dịch, tổng trọng số của các chữ ký phải lớn hơn hoặc bằng ngưỡng được thiết lập.       |
| roleTransactionKey   | Đối tượng | (tùy chọn) Nếu muốn cập nhật tài khoản để có khóa theo vai trò, hãy ghi ra khóa roleTransactionKey. Khóa roleTransactionKey có thể là khóa công khai hoặc khóa đa chữ ký. Khóa roleTransactionKey này sẽ được sử dụng khi ký một giao dịch.                                              |
| roleAccountUpdateKey | Đối tượng | (tùy chọn) Nếu muốn cập nhật tài khoản để có khóa theo vai trò, hãy ghi ra khóa roleAccountUpdateKey. Khóa roleAccountUpdateKey có thể là khóa công khai hoặc khóa đa chữ ký. Khóa roleAccountUpdateKey này sẽ được sử dụng khi ký giao dịch AccountUpdate.                              |
| roleFeePayerKey      | Đối tượng | (tùy chọn) Nếu muốn cập nhật tài khoản để có khóa theo vai trò, hãy ghi ra khóa roleFeePayerKey. Khóa roleFeePayerKey có thể là khóa công khai hoặc khóa đa chữ ký. Khóa roleFeePayerKey này sẽ được sử dụng khi ký giao dịch với vai trò là người trả phí.                              |
| failKey              | Bool      | (tùy chọn) Nếu muốn cập nhật tài khoản để có khóa fail, hãy đặt giá trị này thành true.                                                                                                                                                                                                  |

Một đối tượng giao dịch thuộc loại `FEE_DELEGATED_ACCOUNT_UPDATE` với cấu trúc như trên hoặc giao dịch `RLP-encoded transaction` thuộc loại `FEE_DELEGATED_ACCOUNT_UPDATE` có thể được sử dụng làm tham số trong [caver.klay.tài khoảns.signTransaction](../../caver.klay.accounts.md#signtransaction) đối với người gửi hoặc trong [caver.klay.tài khoảns.feePayerSignTransaction](../../caver.klay.accounts.md#feepayersigntransaction) đối với người trả phí.

Để người trả phí ký một giao dịch mã hóa RLP mà người gửi đã ký và gửi đến mạng, hãy xác định một đối tượng có cấu trúc như sau và gọi ra hàm `caver.klay.sendTransaction`.

| Tên                  | Loại | Mô tả                                    |
| -------------------- | ----- | ---------------------------------------- |
| feePayer             | Chuỗi | Địa chỉ người trả phí của giao dịch.     |
| senderRawTransaction | Chuỗi | Giao dịch mã hóa RLP mà người gửi đã ký. |

**Giá trị trả về**

Hàm `callback` sẽ trả về hàm băm giao dịch 32 byte.

`PromiEvent`: Bộ phát hiệu ứng sự kiện kết hợp promise. Sẽ được xử lý khi có biên lai giao dịch. Ngoài ra còn có các sự kiện sau đây:

- `"transactionHash"` trả về `String`: Được kích hoạt ngay sau khi gửi giao dịch và có hàm băm giao dịch.
- `"receipt"` trả về `Object`: Được kích hoạt khi có sẵn biên lai giao dịch.
- `"error"` trả về `Error`: Được kích hoạt nếu có lỗi phát sinh trong quá trình gửi. Khi xảy ra lỗi hết gas, tham số thứ hai sẽ là biên lai.

**Ví dụ**

```javascript
const sender = caver.klay.accounts.wallet.add('0x{private key}')
const feePayer = caver.klay.accounts.wallet.add('0x{private key}')

const accountForUpdate = caver.klay.accounts.createAccountForUpdate(sender.address, '0x{private key}')

// using the promise
const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
    type: 'FEE_DELEGATED_ACCOUNT_UPDATE',
    from: sender.address,
    key: accountForUpdate,
    gas: '300000',
}, sender.privateKey)

caver.klay.sendTransaction({
    senderRawTransaction: senderRawTransaction,
    feePayer: feePayer.address,
})
.then(function(receipt){
    ...
})

// using the event emitter
const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
    type: 'FEE_DELEGATED_ACCOUNT_UPDATE',
    from: sender.address,
    key: accountForUpdate,
    gas: '300000',
}, sender.privateKey)

caver.klay.sendTransaction({
    senderRawTransaction: senderRawTransaction,
    feePayer: feePayer.address,
})
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
    ...
})
.on('error', console.error)

```

## sendTransaction (FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO) <a id="sendtransaction-fee_delegated_account_update_with_ratio"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```

Gửi giao dịch [Cập nhật tài khoản có ủy thác phí theo tỷ lệ](../../../../../../learn/transactions/partial-fee-delegation.md#txtypefeedelegatedaccountupdatewithratio) đến mạng.

Có hai cách cho phép người trả phí ký một giao dịch và gửi giao dịch đến mạng.

1. Gọi ra hàm `caver.klay.sendTransaction` với định dạng giao dịch của người trả phí (Một đối tượng xác định `senderRawTransaction` và `feepayer`). Trong trường hợp này, tài khoản của người trả phí phải tồn tại trong ví trong bộ nhớ của hàm caver-js.
2. Ký bằng hàm [caver.klay.tài khoảns.feePayerSignTransaction](../../caver.klay.accounts.md#feepayersigntransaction) và gửi đến mạng thông qua [caver.klay.sendSignedTransaction](./transaction.md#sendsignedtransaction)

Ví dụ ở đây chỉ mô tả cách sử dụng hàm `caver.klay.sendTransaction`.

Để biết thông tin về cách gửi sử dụng hàm `caver.klay.tài khoảns.feePayerSignTransaction` và `caver.klay.sendSignedTransaction`, hãy xem [caver.klay.tài khoảns.feePayerSignTransaction](../../caver.klay.accounts.md#feepayersigntransaction) và [Gửi giao dịch với nhiều người ký](../../../get-started-1.4.1.md#sending-a-transaction-with-multiple-signer).

**Tham số**

Các tham số của hàm sendTransaction bao gồm một đối tượng giao dịch và một hàm callback.

| Tên               | type      | Mô tả                                                                                                                              |
| ----------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| transactionObject | Đối tượng | Đối tượng giao dịch cần gửi.                                                                                                       |
| callback          | Hàm       | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

Loại đối tượng giao dịch thuần của giao dịch `FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO` có cấu trúc như sau:

| Tên                  | Loại     | Mô tả                                                                                                                                                                                                                                                                                                       |
| -------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type                 | Chuỗi     | Loại giao dịch "FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO".                                                                                                                                          |
| từ                   | Chuỗi     | Địa chỉ của người gửi giao dịch này. Tài khoản này sẽ được cập nhật bằng giao dịch này.                                                                                                                                                                                                                     |
| gas                  | Số        | Lượng gas tối đa sẵn sàng trả cho giao dịch (sẽ hoàn lại số gas chưa được dùng đến).                                                                                                                                                                                                     |
| giá gas              | Số        | (tùy chọn) Giá gas được người gửi cung cấp theo đơn vị peb. Tham số gasPrice phải giống với tham số unitPrice được thiết lập trong nút Klaytn.                                                                                                                                           |
| nonce                | Số        | (tùy chọn) Giá trị nguyên của số dùng một lần. Nếu bị bỏ qua, số lượng giao dịch sẽ được caver-js thiết lập bằng cách gọi ra `caver.klay.getTransactionCount`.                                                                                                                           |
| khóa                 | Đối tượng | (tùy chọn) Một đối tượng `AccountForUpdate` chứa địa chỉ và khóa sẽ được sử dụng khi cập nhật tài khoản. Để biết cách tạo một đối tượng AccountForUpdate cho mỗi loại khóa, hãy xem [caver.klay.tài khoảns.createAccountForUpdate](../../caver.klay.accounts.md#createaccountforupdate). |
| legacyKey            | Bool      | (tùy chọn) Nếu muốn cập nhật tài khoản để có khóa kế thừa, hãy đặt giá trị này thành true.                                                                                                                                                                                               |
| publicKey            | Chuỗi     | (tùy chọn) Nếu muốn cập nhật tài khoản để có khóa công khai, hãy ghi ra khóa công khai 64 byte.                                                                                                                                                                                          |
| multisig             | Đối tượng | (tùy chọn) Nếu muốn cập nhật tài khoản để có khóa đa chữ ký, hãy ghi ra danh sách các khóa công khai có trọng số tạo thành khóa đa chữ ký. Cơ chế đa chữ ký cũng xác định ngưỡng. Khi ký một giao dịch, tổng trọng số của các chữ ký phải lớn hơn hoặc bằng ngưỡng được thiết lập.       |
| roleTransactionKey   | Đối tượng | (tùy chọn) Nếu muốn cập nhật tài khoản để có khóa theo vai trò, hãy ghi ra khóa roleTransactionKey. Khóa roleTransactionKey có thể là khóa công khai hoặc khóa đa chữ ký. Khóa roleTransactionKey này sẽ được sử dụng khi ký một giao dịch.                                              |
| roleAccountUpdateKey | Đối tượng | (tùy chọn) Nếu muốn cập nhật tài khoản để có khóa theo vai trò, hãy ghi ra khóa roleAccountUpdateKey. Khóa roleAccountUpdateKey có thể là khóa công khai hoặc khóa đa chữ ký. Khóa roleAccountUpdateKey này sẽ được sử dụng khi ký giao dịch AccountUpdate.                              |
| roleFeePayerKey      | Đối tượng | (tùy chọn) Nếu muốn cập nhật tài khoản để có khóa theo vai trò, hãy ghi ra khóa roleFeePayerKey. Khóa roleFeePayerKey có thể là khóa công khai hoặc khóa đa chữ ký. Khóa roleFeePayerKey này sẽ được sử dụng khi ký giao dịch với vai trò là người trả phí.                              |
| failKey              | Bool      | (tùy chọn) Nếu muốn cập nhật tài khoản để có khóa fail, hãy đặt giá trị này thành true.                                                                                                                                                                                                  |

Một đối tượng giao dịch thuộc loại `FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO` với cấu trúc như trên hoặc giao dịch `RLP-encoded transaction` thuộc loại `FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO` có thể được sử dụng làm tham số trong [caver.klay.tài khoảns.signTransaction](../../caver.klay.accounts.md#signtransaction) đối với người gửi hoặc trong [caver.klay.tài khoảns.feePayerSignTransaction](../../caver.klay.accounts.md#feepayersigntransaction) đối với người trả phí.

Để người trả phí ký một giao dịch mã hóa RLP mà người gửi đã ký và gửi đến mạng, hãy xác định một đối tượng có cấu trúc như sau và gọi ra hàm `caver.klay.sendTransaction`.

| Tên                  | Loại | Mô tả                                    |
| -------------------- | ----- | ---------------------------------------- |
| feePayer             | Chuỗi | Địa chỉ người trả phí của giao dịch.     |
| senderRawTransaction | Chuỗi | Giao dịch mã hóa RLP mà người gửi đã ký. |

**Giá trị trả về**

Hàm `callback` sẽ trả về hàm băm giao dịch 32 byte.

`PromiEvent`: Bộ phát hiệu ứng sự kiện kết hợp promise. Sẽ được xử lý khi có biên lai giao dịch. Ngoài ra còn có các sự kiện sau đây:

- `"transactionHash"` trả về `String`: Được kích hoạt ngay sau khi gửi giao dịch và có hàm băm giao dịch.
- `"receipt"` trả về `Object`: Được kích hoạt khi có sẵn biên lai giao dịch.
- `"error"` trả về `Error`: Được kích hoạt nếu có lỗi phát sinh trong quá trình gửi. Khi xảy ra lỗi hết gas, tham số thứ hai sẽ là biên lai.

**Ví dụ**

```javascript
const sender = caver.klay.accounts.wallet.add('0x{private key}')
const feePayer = caver.klay.accounts.wallet.add('0x{private key}')

const accountForUpdate = caver.klay.accounts.createAccountForUpdate(sender.address, '0x{private key}')

// using the promise
const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
    type: 'FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO',
    from: sender.address,
    key: accountForUpdate,
    gas: '300000',
    feeRatio: 30,
}, sender.privateKey)

caver.klay.sendTransaction({
    senderRawTransaction: senderRawTransaction,
    feePayer: feePayer.address,
})
.then(function(receipt){
    ...
})

// using the event emitter
const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
    type: 'FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO',
    from: sender.address,
    key: accountForUpdate,
    gas: '300000',
    feeRatio: 30,
}, sender.privateKey)

caver.klay.sendTransaction({
    senderRawTransaction: senderRawTransaction,
    feePayer: feePayer.address,
})
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
    ...
})
.on('error', console.error)
```
