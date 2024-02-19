# Giao dịch hủy

## sendTransaction (CANCEL) <a id="sendtransaction-cancel"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```

Gửi giao dịch [Hủy](../../../../../../learn/transactions/basic.md#txtypecancel) đến mạng.

**Tham số**

Các tham số của hàm sendTransaction bao gồm một đối tượng giao dịch và một hàm callback.

| Tên               | type      | Mô tả                                                                                                                              |
| ----------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| transactionObject | Đối tượng | Đối tượng giao dịch cần gửi.                                                                                                       |
| callback          | Hàm       | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

Một đối tượng giao dịch thuộc loại `CANCEL` có cấu trúc như sau:

| Tên     | Loại | Mô tả                                                                                                                                                                                                                                                                  |
| ------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type    | Chuỗi | Loại giao dịch. "HỦY"                                                                                                                                                                                                                                                  |
| từ      | Chuỗi | Địa chỉ của người gửi giao dịch này.                                                                                                                                                                                                                                   |
| gas     | Số    | Lượng gas tối đa sẵn sàng trả cho giao dịch (sẽ hoàn lại số gas chưa được dùng đến).                                                                                                                                                                |
| giá gas | Số    | (tùy chọn) Giá gas được người gửi cung cấp theo đơn vị peb. (tùy chọn) Giá gas được người gửi cung cấp theo đơn vị peb.                                                                                                          |
| nonce   | Số    | (tùy chọn) Giá trị nguyên của số dùng một lần. Điều này cho phép thay thế giao dịch đang chờ xử lý của bạn có cùng số dùng một lần. Nếu bị bỏ qua, số lượng giao dịch sẽ được caver-js thiết lập bằng cách gọi ra `caver.klay.getTransactionCount`. |

**Giá trị trả về**

Hàm `callback` sẽ trả về hàm băm giao dịch 32 byte.

`PromiEvent`: Bộ phát hiệu ứng sự kiện kết hợp promise. Sẽ được xử lý khi có biên lai giao dịch. Ngoài ra còn có các sự kiện sau đây:

- `"transactionHash"` trả về `String`: Được kích hoạt ngay sau khi gửi giao dịch và có hàm băm giao dịch.
- `"receipt"` trả về `Object`: Được kích hoạt khi có sẵn biên lai giao dịch.
- `"error"` trả về `Error`: Được kích hoạt nếu có lỗi phát sinh trong quá trình gửi. Khi xảy ra lỗi hết gas, tham số thứ hai sẽ là biên lai.

**Ví dụ**

```javascript
const account = caver.klay.accounts.wallet.add('0x{private key}')

// using the promise
caver.klay.sendTransaction({
    type: 'CANCEL',
    from: account.address,
    nonce: 7, // It specifies target transaction having the same nonce to cancel.
    gas: '300000',
})
.then(function(receipt){
    ...
});

// using the event emitter
caver.klay.sendTransaction({
    type: 'CANCEL',
    from: account.address,
    nonce: 7, // It specifies target transaction having the same nonce to cancel.
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

## sendTransaction (FEE_DELEGATED_CANCEL) <a id="sendtransaction-fee_delegated_cancel"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```

Gửi giao dịch [Hủy có ủy thác phí](../../../../../../learn/transactions/fee-delegation.md#txtypefeedelegatedcancel) đến mạng.

**Tham số**

Các tham số của hàm sendTransaction bao gồm một đối tượng giao dịch và một hàm callback.

| Tên               | type      | Mô tả                                                                                                                              |
| ----------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| transactionObject | Đối tượng | Đối tượng giao dịch cần gửi.                                                                                                       |
| callback          | Hàm       | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

Một đối tượng giao dịch thuộc loại `FEE_DELEGATED_CANCEL` có cấu trúc như sau:

| Tên     | Loại | Mô tả                                                                                                                                                                                                                                                                  |
| ------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type    | Chuỗi | Loại giao dịch. "FEE_DELEGATED_CANCEL"                                                                                                                                                                                       |
| từ      | Chuỗi | Địa chỉ của người gửi giao dịch này.                                                                                                                                                                                                                                   |
| gas     | Số    | Lượng gas tối đa sẵn sàng trả cho giao dịch (sẽ hoàn lại số gas chưa được dùng đến).                                                                                                                                                                |
| giá gas | Số    | (tùy chọn) Giá gas được người gửi cung cấp theo đơn vị peb. Tham số gasPrice phải giống với tham số unitPrice được thiết lập trong nút Klaytn.                                                                                                      |
| nonce   | Số    | (tùy chọn) Giá trị nguyên của số dùng một lần. Điều này cho phép thay thế giao dịch đang chờ xử lý của bạn có cùng số dùng một lần. Nếu bị bỏ qua, số lượng giao dịch sẽ được caver-js thiết lập bằng cách gọi ra `caver.klay.getTransactionCount`. |

Một đối tượng giao dịch thuộc loại `FEE_DELEGATED_CANCEL` với cấu trúc như trên hoặc giao dịch `RLP-encoded transaction` thuộc loại `FEE_DELEGATED_CANCEL` có thể được sử dụng làm tham số trong [caver.klay.tài khoảns.signTransaction](../../caver.klay.accounts.md#signtransaction) đối với người gửi hoặc trong [caver.klay.tài khoảns.feePayerSignTransaction](../../caver.klay.accounts.md#feepayersigntransaction) đối với người trả phí.

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

// using the promise
const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
  type: 'FEE_DELEGATED_CANCEL',
  from: sender.address,
  nonce: 7, // It specifies target transaction having the same nonce to cancel.
  gas: '300000',
}, sender.privateKey)

caver.klay.sendTransaction({
  senderRawTransaction: senderRawTransaction,
  feePayer: feePayer.address,
})
.then(function(receipt){
    ...
});

// using the event emitter
const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
  type: 'FEE_DELEGATED_CANCEL',
  from: sender.address,
  nonce: 7, // It specifies target transaction having the same nonce to cancel.
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
.on('error', console.error); // If an out-of-gas error, the second parameter is the receipt.
```

## sendTransaction (FEE_DELEGATED_CANCEL_WITH_RATIO) <a id="sendtransaction-fee_delegated_cancel_with_ratio"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```

Gửi giao dịch [Hủy có ủy thác phí theo tỷ lệ](../../../../../../learn/transactions/partial-fee-delegation.md#txtypefeedelegatedcancelwithratio) đến mạng.

**Tham số**

Các tham số của hàm sendTransaction bao gồm một đối tượng giao dịch và một hàm callback.

| Tên               | type      | Mô tả                                                                                                                              |
| ----------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| transactionObject | Đối tượng | Đối tượng giao dịch cần gửi.                                                                                                       |
| callback          | Hàm       | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

Một đối tượng giao dịch thuộc loại `FEE_DELEGATED_CANCEL_WITH_RATIO` có cấu trúc như sau:

| Tên      | Loại | Mô tả                                                                                                                                                                                                                                                                  |
| -------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type     | Chuỗi | Loại giao dịch. "FEE_DELEGATED_CANCEL_WITH_RATIO"                                                                                                                                  |
| từ       | Chuỗi | Địa chỉ của người gửi giao dịch này.                                                                                                                                                                                                                                   |
| gas      | Số    | Lượng gas tối đa sẵn sàng trả cho giao dịch (sẽ hoàn lại số gas chưa được dùng đến).                                                                                                                                                                |
| giá gas  | Số    | (tùy chọn) Giá gas được người gửi cung cấp theo đơn vị peb. Tham số gasPrice phải giống với tham số unitPrice được thiết lập trong nút Klaytn.                                                                                                      |
| nonce    | Số    | (tùy chọn) Giá trị nguyên của số dùng một lần. Điều này cho phép thay thế giao dịch đang chờ xử lý của bạn có cùng số dùng một lần. Nếu bị bỏ qua, số lượng giao dịch sẽ được caver-js thiết lập bằng cách gọi ra `caver.klay.getTransactionCount`. |
| feeRatio | Số    | Tỷ lệ phí của người trả phí. Nếu tỷ lệ là 30 thì người trả phí phải trả 30% phí. 70% còn lại sẽ được trả bởi người gửi. Phạm vi của tỷ lệ phí là 1 \~ 99, nếu nằm ngoài phạm vi, giao dịch sẽ không được chấp nhận.                                                    |

Một đối tượng giao dịch thuộc loại `FEE_DELEGATED_CANCEL_WITH_RATIO` với cấu trúc như trên hoặc giao dịch `RLP-encoded transaction` thuộc loại `FEE_DELEGATED_CANCEL_WITH_RATIO` có thể được sử dụng làm tham số trong [caver.klay.tài khoảns.signTransaction](../../caver.klay.accounts.md#signtransaction) đối với người gửi hoặc trong [caver.klay.tài khoảns.feePayerSignTransaction](../../caver.klay.accounts.md#feepayersigntransaction) đối với người trả phí.

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

// using the promise
const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
  type: 'FEE_DELEGATED_CANCEL_WITH_RATIO',
  from: sender.address,
  nonce: 7, // It specifies target transaction having the same nonce to cancel.
  gas: '300000',
  feeRatio: 30,
}, sender.privateKey)

caver.klay.sendTransaction({
  senderRawTransaction: senderRawTransaction,
  feePayer: feePayer.address,
})
.then(function(receipt){
    ...
});

// using the event emitter
const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
  type: 'FEE_DELEGATED_CANCEL_WITH_RATIO',
  from: sender.address,
  nonce: 7, // It specifies target transaction having the same nonce to cancel.
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
.on('error', console.error); // If an out-of-gas error, the second parameter is the receipt.
```
