# Giao dịch tạo tài khoản

## sendTransaction (ACCOUNT_CREATION) <a id="sendtransaction-account_creation"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
Gửi giao dịch [Tạo tài khoản](../../../../../../learn/transactions/basic.md) đến mạng.

**Tham số**

| Tên                                    | type                                    | Mô tả                                                                                                                                                                                                                                                                                                    |
| -------------------------------------- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| transactionObject                      | Đối tượng                               | Đối tượng giao dịch cần gửi.                                                                                                                                                                                                                                                                             |
| transactionObject.type                 | Chuỗi                                   | Loại giao dịch "ACCOUNT_CREATION".                                                                                                                                                                                                                                                                       |
| transactionObject.from                 | Chuỗi                                   | Địa chỉ người gửi của giao dịch.                                                                                                                                                                                                                                                                         |
| transactionObject.to                   | Chuỗi                                   | Địa chỉ sẽ được tạo mới.                                                                                                                                                                                                                                                                                 |
| transactionObject.value                | Số \| Chuỗi \| BN \| Số lớn | Giá trị được chuyển cho tài khoản tạo mới theo peb.                                                                                                                                                                                                                                                      |
| transactionObject.gas                  | Số                                      | Lượng gas được sử dụng cho giao dịch (sẽ hoàn lại số gas chưa được dùng đến).                                                                                                                                                                                                                            |
| transactionObject.gasPrice             | Số                                      | (tùy chọn) Giá gas được người gửi cung cấp theo đơn vị peb. Tham số gasPrice phải giống với tham số unitPrice được thiết lập trong nút Klaytn.                                                                                                                                                           |
| transactionObject.nonce                | Số                                      | (tùy chọn) Giá trị nguyên của số dùng một lần. Nếu bị bỏ qua, số lượng giao dịch sẽ được caver-js thiết lập bằng cách gọi ra `caver.klay.getTransactionCount`.                                                                                                                                           |
| transactionObject.publicKey            | Chuỗi                                   | (tùy chọn) Nếu tạo tài khoản với khóa công khai, hãy ghi lại khóa công khai 64 byte.                                                                                                                                                                                                                     |
| transactionObject.multisig             | Chuỗi                                   | (tùy chọn) Nếu tạo tài khoản với khóa đa chữ ký, hãy ghi lại cơ chế đa chữ ký với nhiều khóa công khai. Các khóa công khai tạo thành cơ chế đa chữ ký có trọng số riêng. Đối với các giao dịch được ký bằng cơ chế đa chữ ký, tổng trọng số của các chữ ký phải lớn hơn hoặc bằng ngưỡng được thiết lập. |
| transactionObject.roleTransactionKey   | Chuỗi                                   | (tùy chọn) Nếu tạo tài khoản với khóa dựa trên vai trò, hãy ghi lại roleTransactionKey với khóa công khai hoặc khóa đa chữ ký. Khóa roleTransactionKey này được sử dụng khi ký giao dịch.                                                                                                                |
| transactionObject.roleAccountUpdateKey | Chuỗi                                   | (tùy chọn) Nếu tạo tài khoản với khóa dựa trên vai trò, hãy ghi lại roleAccountUpdateKey với khóa công khai hoặc khóa đa chữ ký. Khóa roleAccountUpdateKey này được sử dụng khi ký giao dịch AccountUpdate.                                                                                              |
| transactionObject.roleFeePayerKey      | Chuỗi                                   | (tùy chọn) Nếu tạo tài khoản với khóa dựa trên vai trò, hãy ghi lại roleFeePayerKey với khóa công khai hoặc khóa đa chữ ký. Khóa roleFeePayerKey này được sử dụng khi ký giao dịch với vai trò là người trả phí.                                                                                         |
| transactionObject.failKey              | Bool                                    | (tùy chọn) Nếu tạo tài khoản với khóa fail, hãy đặt giá trị là true                                                                                                                                                                                                                                      |
| callback                               | Hàm                                     | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai.                                                                                                                                                                                          |

**Giá trị trả về**

Hàm `callback` sẽ trả về hàm băm giao dịch 32 byte.

`PromiEvent`: Bộ phát hiệu ứng sự kiện kết hợp promise. Sẽ được xử lý khi có biên lai giao dịch. Ngoài ra còn có các sự kiện sau đây:

- `"transactionHash"` trả về `String`: Được kích hoạt ngay sau khi gửi giao dịch và có hàm băm giao dịch.
- `"receipt"` trả về `Object`: Được kích hoạt khi có sẵn biên lai giao dịch.
- `"error"` trả về `Error`: Được kích hoạt nếu có lỗi phát sinh trong quá trình gửi. Khi xảy ra lỗi hết gas, tham số thứ hai sẽ là biên lai.

**Ví dụ**

```javascript

// Trường hợp 1: Tạo tài khoản bằng khóa công khai (con người có thể đọc được)

// sử dụng promise
caver.klay.sendTransaction({
    type: 'ACCOUNT_CREATION',
    from: '0x90B3E9A3770481345A7F17f22f16D020Bccfd33e',
    to: 'colin.klaytn',
    publicKey: '0xc8785266510368d9372badd4c7f4a94b692e82ba74e0b5e26b34558b0f08144794c27901465af0a703859ab47f8ae17e54aaba453b7cde5a6a9e4a32d45d72b2',
    gas: '300000',
    value: '0x174876e800',
})
.then(function(receipt){
    ...
});

// sử dụng bộ phát hiệu ứng sự kiện
caver.klay.sendTransaction({
    type: 'ACCOUNT_CREATION',
    from: '0x90B3E9A3770481345A7F17f22f16D020Bccfd33e',
    to: 'colin.klaytn',
    publicKey: '0xc8785266510368d9372badd4c7f4a94b692e82ba74e0b5e26b34558b0f08144794c27901465af0a703859ab47f8ae17e54aaba453b7cde5a6a9e4a32d45d72b2',
    gas: '300000',
    value: '0x174876e800',
})
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
    ...
})
.on('error', console.error); // Khi xảy ra lỗi hết gas, tham số thứ hai sẽ là biên lai.

// Trường hợp 2: Tạo tài khoản bằng khóa công khai (con người không đọc được)

// sử dụng promise
caver.klay.sendTransaction({
    type: 'ACCOUNT_CREATION',
    from: '0x90B3E9A3770481345A7F17f22f16D020Bccfd33e',
    to: '0x492c06ff9f5fbd51ace4ff214bfc9ca06fe4c601',
    publicKey: '0xc8785266510368d9372badd4c7f4a94b692e82ba74e0b5e26b34558b0f08144794c27901465af0a703859ab47f8ae17e54aaba453b7cde5a6a9e4a32d45d72b2',
    gas: '300000',
    value: '0x174876e800',
})
.then(function(receipt){
    ...
});

// sử dụng bộ phát hiệu ứng sự kiện
caver.klay.sendTransaction({
    type: 'ACCOUNT_CREATION',
    from: '0x90B3E9A3770481345A7F17f22f16D020Bccfd33e',
    to: '0x492c06ff9f5fbd51ace4ff214bfc9ca06fe4c601',
    publicKey: '0xc8785266510368d9372badd4c7f4a94b692e82ba74e0b5e26b34558b0f08144794c27901465af0a703859ab47f8ae17e54aaba453b7cde5a6a9e4a32d45d72b2',
    gas: '300000',
    value: '0x174876e800',
})
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
    ...
})
.on('error', console.error); // Khi xảy ra lỗi hết gas, tham số thứ hai sẽ là biên lai.

// Trường hợp 3: Tạo tài khoản bằng khóa fail

// sử dụng promise
caver.klay.sendTransaction({
    type: 'ACCOUNT_CREATION',
    from: '0x90B3E9A3770481345A7F17f22f16D020Bccfd33e',
    to: '0x492c06ff9f5fbd51ace4ff214bfc9ca06fe4c601',
    failKey: true,
    gas: '300000',
    value: '0x174876e800',
})
.then(function(receipt){
    ...
});

// sử dụng bộ phát hiệu ứng sự kiện
caver.klay.sendTransaction({
    type: 'ACCOUNT_CREATION',
    from: '0x90B3E9A3770481345A7F17f22f16D020Bccfd33e',
    to: '0x492c06ff9f5fbd51ace4ff214bfc9ca06fe4c601',
    failKey: true,
    gas: '300000',
    value: '0x174876e800',
})
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
    ...
})
.on('error', console.error); // Khi xảy ra lỗi hết gas, tham số thứ hai sẽ là biên lai.

// Trường hợp 4: Tạo tài khoản bằng đa chữ ký có trọng số

// sử dụng promise
caver.klay.sendTransaction({
  type: 'ACCOUNT_CREATION',
  from: '0x492c06ff9f5fbd51ace4ff214bfc9ca06fe4c601',
  to: '0xbd6fa2b535f9502d3e8877cc7818df577bc3a981',
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

// sử dụng bộ phát hiệu ứng sự kiện
caver.klay.sendTransaction({
  type: 'ACCOUNT_CREATION',
  from: '0x492c06ff9f5fbd51ace4ff214bfc9ca06fe4c601',
  to: '0xbd6fa2b535f9502d3e8877cc7818df577bc3a981',
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
.on('error', console.error); // Khi xảy ra lỗi hết gas, tham số thứ hai sẽ là biên lai.

// Trường hợp 5: Tạo tài khoản bằng khóa theo vai trò

// sử dụng promise
caver.klay.sendTransaction({
  type: 'ACCOUNT_CREATION',
  from: '0x492c06ff9f5fbd51ace4ff214bfc9ca06fe4c601',
  to: '0xbd6fa2b535f9502d3e8877cc7818df577bc3a981',
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

// sử dụng bộ phát hiệu ứng sự kiện
caver.klay.sendTransaction({
  type: 'ACCOUNT_CREATION',
  from: '0x492c06ff9f5fbd51ace4ff214bfc9ca06fe4c601',
  to: '0xbd6fa2b535f9502d3e8877cc7818df577bc3a981',
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
.on('error', console.error); // Khi xảy ra lỗi hết gas, tham số thứ hai sẽ là biên lai.

```
