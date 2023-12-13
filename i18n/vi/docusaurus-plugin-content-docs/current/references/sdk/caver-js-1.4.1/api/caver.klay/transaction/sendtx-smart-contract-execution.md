# Giao dịch thực thi hợp đồng thông minh

## sendTransaction (SMART_CONTRACT_EXECUTION) <a id="sendtransaction-smart_contract_execution"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
Gửi giao dịch [Thực thi hợp đồng thông minh](../../../../../../learn/transactions/basic.md#txtypesmartcontractexecution) đến mạng.

**Tham số**

Các tham số của hàm sendTransaction bao gồm một đối tượng giao dịch và một hàm callback.

| Tên               | type      | Mô tả                                                                                                           |
| ----------------- | --------- | --------------------------------------------------------------------------------------------------------------- |
| transactionObject | Đối tượng | Đối tượng giao dịch cần gửi.                                                                                    |
| callback          | Hàm       | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

Một đối tượng giao dịch thuộc loại `SMART_CONTRACT_EXECUTION` có cấu trúc như sau:

| Tên     | Loại                                   | Mô tả                                                                                                                                                                                                        |
| ------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| type    | Chuỗi                                   | Loại giao dịch. "SMART_CONTRACT_EXECUTION"                                                                                                                                                                 |
| từ      | Chuỗi                                   | Địa chỉ của người gửi giao dịch này.                                                                                                                                                                         |
| đến     | Chuỗi                                   | Địa chỉ của hợp đồng thông minh được triển khai.                                                                                                                                                             |
| giá trị | Số &#124; Chuỗi &#124; BN &#124; Số lớn | (tùy chọn) Giá trị được chuyển cho giao dịch theo peb. Để chấp nhận chuyển giá trị, hàm của hợp đồng mà giao dịch này sẽ thực thi phải được khai báo là 'payable'. Nếu bỏ qua, tham số này sẽ được đặt về 0. |
| gas     | Số                                      | Lượng gas tối đa sẵn sàng trả cho giao dịch (sẽ hoàn lại số gas chưa được dùng đến).                                                                                                                         |
| giá gas | Số                                      | (tùy chọn) Giá gas được người gửi cung cấp theo đơn vị peb. Tham số gasPrice phải giống với tham số unitPrice được thiết lập trong nút Klaytn.                                                               |
| nonce   | Số                                      | (tùy chọn) Giá trị nguyên của số dùng một lần. Nếu bị bỏ qua, số lượng giao dịch sẽ được caver-js thiết lập bằng cách gọi ra `caver.klay.getTransactionCount`.                                               |
| data    | Chuỗi                                   | Dữ liệu đầu vào của hợp đồng thông minh.                                                                                                                                                                     |

**Giá trị trả về**

Hàm `callback` sẽ trả về hàm băm giao dịch 32 byte.

`PromiEvent`: Bộ phát hiệu ứng sự kiện kết hợp promise. Sẽ được xử lý khi có biên lai giao dịch. Ngoài ra còn có các sự kiện sau đây:

- `"transactionHash"` trả về `String`: Được kích hoạt ngay sau khi gửi giao dịch và có hàm băm giao dịch.
- `"receipt"` trả về `Object`: Được kích hoạt khi có sẵn biên lai giao dịch.
- `"error"` trả về `Error`: Được kích hoạt nếu có lỗi phát sinh trong quá trình gửi. Khi xảy ra lỗi hết gas, tham số thứ hai sẽ là biên lai.

**Ví dụ**

```javascript
const tài khoản = caver.klay.tài khoảns.wallet.add('0x{private key}')

// Gọi ra hàm hợp đồng thông minh

// sử dụng promise
caver.klay.sendTransaction({
    type: 'SMART_CONTRACT_EXECUTION',
    from: tài khoản.address,
    to: '0x1d389d91886fd0af55f44c56e1240eb6162ddff8',
    data: '0x6353586b0000000000000000000000001d389d91886fd0af55f44c56e1240eb6162ddff8',
    gas: '300000',
    value: '0x174876e800',
})
.then(function(receipt){
    ...
});

// sử dụng bộ phát hiệu ứng sự kiện
caver.klay.sendTransaction({
    type: 'SMART_CONTRACT_EXECUTION',
    from: tài khoản.address,
    to: '0x1d389d91886fd0af55f44c56e1240eb6162ddff8',
    data: '0x6353586b0000000000000000000000001d389d91886fd0af55f44c56e1240eb6162ddff8',
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
```


## sendTransaction (FEE_DELEGATED_SMART_CONTRACT_EXECUTION) <a id="sendtransaction-fee_delegated_smart_contract_execution"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
Gửi giao dịch [Thực thi hợp đồng thông minh có ủy thác phí](../../../../../../learn/transactions/fee-delegation.md#txtypefeedelegatedsmartcontractexecution) đến mạng.

**Tham số**

Các tham số của hàm sendTransaction bao gồm một đối tượng giao dịch và một hàm callback.

| Tên               | type      | Mô tả                                                                                                           |
| ----------------- | --------- | --------------------------------------------------------------------------------------------------------------- |
| transactionObject | Đối tượng | Đối tượng giao dịch cần gửi.                                                                                    |
| callback          | Hàm       | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

Một đối tượng giao dịch thuộc loại `FEE_DELEGATED_SMART_CONTRACT_EXECUTION` có cấu trúc như sau:

| Tên     | Loại                                   | Mô tả                                                                                                                                                                                                        |
| ------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| type    | Chuỗi                                   | Loại giao dịch. "FEE_DELEGATED_SMART_CONTRACT_EXECUTION"                                                                                                                                                 |
| từ      | Chuỗi                                   | Địa chỉ của người gửi giao dịch này.                                                                                                                                                                         |
| đến     | Chuỗi                                   | Địa chỉ của hợp đồng thông minh được triển khai.                                                                                                                                                             |
| giá trị | Số &#124; Chuỗi &#124; BN &#124; Số lớn | (tùy chọn) Giá trị được chuyển cho giao dịch theo peb. Để chấp nhận chuyển giá trị, hàm của hợp đồng mà giao dịch này sẽ thực thi phải được khai báo là 'payable'. Nếu bỏ qua, tham số này sẽ được đặt về 0. |
| gas     | Số                                      | Lượng gas tối đa sẵn sàng trả cho giao dịch (sẽ hoàn lại số gas chưa được dùng đến).                                                                                                                         |
| giá gas | Số                                      | (tùy chọn) Giá gas được người gửi cung cấp theo đơn vị peb. Tham số gasPrice phải giống với tham số unitPrice được thiết lập trong nút Klaytn.                                                               |
| nonce   | Số                                      | (tùy chọn) Giá trị nguyên của số dùng một lần. Nếu bị bỏ qua, số lượng giao dịch sẽ được caver-js thiết lập bằng cách gọi ra `caver.klay.getTransactionCount`.                                               |
| data    | Chuỗi                                   | Dữ liệu đầu vào của hợp đồng thông minh.                                                                                                                                                                     |

Một đối tượng giao dịch thuộc loại `FEE_DELEGATED_SMART_CONTRACT_EXECUTION` với cấu trúc như trên hoặc giao dịch `RLP-encoded transaction` thuộc loại `FEE_DELEGATED_SMART_CONTRACT_EXECUTION` có thể được sử dụng làm tham số trong [caver.klay.tài khoảns.signTransaction](../../caver.klay.accounts.md#signtransaction) đối với người gửi hoặc trong [caver.klay.tài khoảns.feePayerSignTransaction](../../caver.klay.accounts.md#feepayersigntransaction) đối với người trả phí.

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
const sender = caver.klay.tài khoảns.wallet.add('0x{private key}')
const feePayer = caver.klay.tài khoảns.wallet.add('0x{private key}')

// sử dụng promise
const { rawTransaction: senderRawTransaction } = await caver.klay.tài khoảns.signTransaction({
  type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
  from: sender.address,
  to:   '0xe56a7260015ad92dd48a305ed232090e51e02391',
  data: '0x6353586b0000000000000000000000001d389d91886fd0af55f44c56e1240eb6162ddff8',
  gas:  '300000',
  value: caver.utils.toPeb('1', 'KLAY'),
}, sender.privateKey)

caver.klay.sendTransaction({
  senderRawTransaction: senderRawTransaction,
  feePayer: feePayer.address,
})
.then(function(receipt){
    ...
});

// sử dụng bộ phát hiệu ứng sự kiện
const { rawTransaction: senderRawTransaction } = await caver.klay.tài khoảns.signTransaction({
  type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
  from: sender.address,
  to:   '0xe56a7260015ad92dd48a305ed232090e51e02391',
  data: '0x6353586b0000000000000000000000001d389d91886fd0af55f44c56e1240eb6162ddff8',
  gas:  '300000',
  value: caver.utils.toPeb('1', 'KLAY'),
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
.on('error', console.error); // Khi xảy ra lỗi hết gas, tham số thứ hai sẽ là biên lai.
```


## sendTransaction (FEE_DELEGATED_SMART_CONTRACT_EXECUTION_WITH_RATIO) <a id="sendtransaction-fee_delegated_smart_contract_execution_with_ratio"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
Gửi giao dịch [Thực thi hợp đồng thông minh có ủy thác phí theo tỷ lệ](../../../../../../learn/transactions/partial-fee-delegation.md#txtypefeedelegatedsmartcontractexecutionwithratio) đến mạng.

**Tham số**

Các tham số của hàm sendTransaction bao gồm một đối tượng giao dịch và một hàm callback.

| Tên               | type      | Mô tả                                                                                                           |
| ----------------- | --------- | --------------------------------------------------------------------------------------------------------------- |
| transactionObject | Đối tượng | Đối tượng giao dịch cần gửi.                                                                                    |
| callback          | Hàm       | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

Một đối tượng giao dịch thuộc loại `FEE_DELEGATED_SMART_CONTRACT_EXECUTION_WITH_RATIO` có cấu trúc như sau:

| Tên      | Loại                                   | Mô tả                                                                                                                                                                                                              |
| -------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| type     | Chuỗi                                   | Loại giao dịch. "FEE_DELEGATED_SMART_CONTRACT_EXECUTION_WITH_RATIO"                                                                                                                                          |
| từ       | Chuỗi                                   | Địa chỉ của người gửi giao dịch này.                                                                                                                                                                               |
| đến      | Chuỗi                                   | Địa chỉ của hợp đồng thông minh được triển khai.                                                                                                                                                                   |
| giá trị  | Số &#124; Chuỗi &#124; BN &#124; Số lớn | (tùy chọn) Giá trị được chuyển cho giao dịch theo peb. Để chấp nhận chuyển giá trị, hàm của hợp đồng mà giao dịch này sẽ thực thi phải được khai báo là 'payable'. Nếu bỏ qua, tham số này sẽ được đặt về 0.       |
| gas      | Số                                      | Lượng gas tối đa sẵn sàng trả cho giao dịch (sẽ hoàn lại số gas chưa được dùng đến).                                                                                                                               |
| giá gas  | Số                                      | (tùy chọn) Giá gas được người gửi cung cấp theo đơn vị peb. Tham số gasPrice phải giống với tham số unitPrice được thiết lập trong nút Klaytn.                                                                     |
| nonce    | Số                                      | (tùy chọn) Giá trị nguyên của số dùng một lần. Nếu bị bỏ qua, số lượng giao dịch sẽ được caver-js thiết lập bằng cách gọi ra `caver.klay.getTransactionCount`.                                                     |
| data     | Chuỗi                                   | Dữ liệu đầu vào của hợp đồng thông minh.                                                                                                                                                                           |
| feeRatio | Số                                      | Tỷ lệ phí của người trả phí. Nếu tỷ lệ là 30 thì người trả phí phải trả 30% phí. 70% còn lại sẽ được trả bởi người gửi. Phạm vi của tỷ lệ phí là 1 ~ 99, nếu nằm ngoài phạm vi, giao dịch sẽ không được chấp nhận. |

Một đối tượng giao dịch thuộc loại `FEE_DELEGATED_SMART_CONTRACT_EXECUTION_WITH_RATIO` với cấu trúc như trên hoặc giao dịch `RLP-encoded transaction` thuộc loại `FEE_DELEGATED_SMART_CONTRACT_EXECUTION_WITH_RATIO` có thể được sử dụng làm tham số trong [caver.klay.tài khoảns.signTransaction](../../caver.klay.accounts.md#signtransaction) đối với người gửi hoặc trong [caver.klay.tài khoảns.feePayerSignTransaction](../../caver.klay.accounts.md#feepayersigntransaction) đối với người trả phí.

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
const sender = caver.klay.tài khoảns.wallet.add('0x{private key}')
const feePayer = caver.klay.tài khoảns.wallet.add('0x{private key}')

// sử dụng promise
const { rawTransaction: senderRawTransaction } = await caver.klay.tài khoảns.signTransaction({
  type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION_WITH_RATIO',
  from: sender.address,
  to:   '0xe56a7260015ad92dd48a305ed232090e51e02391',
  data: '0x6353586b0000000000000000000000001d389d91886fd0af55f44c56e1240eb6162ddff8',
  gas: '300000',
  value: caver.utils.toPeb('1', 'KLAY'),
  feeRatio: 30,
}, sender.privateKey)

caver.klay.sendTransaction({
  senderRawTransaction: senderRawTransaction,
  feePayer: feePayer.address,
})
.then(function(receipt){
    ...
});

// sử dụng bộ phát hiệu ứng sự kiện
const { rawTransaction: senderRawTransaction } = await caver.klay.tài khoảns.signTransaction({
  type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION_WITH_RATIO',
  from: sender.address,
  to:   '0xe56a7260015ad92dd48a305ed232090e51e02391',
  data: '0x6353586b0000000000000000000000001d389d91886fd0af55f44c56e1240eb6162ddff8',
  gas: '300000',
  value: caver.utils.toPeb('1', 'KLAY'),
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
.on('error', console.error); // Khi xảy ra lỗi hết gas, tham số thứ hai sẽ là biên lai.
```


