# Giao dịch cũ

## sendTransaction (Legacy) <a id="sendtransaction-legacy"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```

Gửi một giao dịch đến mạng.

Lưu ý: Chỉ tài khoản có khóa `AccountKeyLegacy` mới có thể gửi giao dịch này.

**Tham số**

Các tham số của hàm sendTransaction bao gồm một đối tượng giao dịch và một hàm callback.

| Tên               | type      | Mô tả                                                                                                                              |
| ----------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| transactionObject | Đối tượng | Đối tượng giao dịch cần gửi.                                                                                                       |
| callback          | Hàm       | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

Một đối tượng giao dịch thuộc loại `LEGACY` có cấu trúc như sau:

| Tên     | Loại                       | Mô tả                                                                                                                                                                                                                      |
| ------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| từ      | Chuỗi                       | Địa chỉ của người gửi giao dịch này.                                                                                                                                                                                       |
| đến     | Chuỗi                       | (tùy chọn) Địa chỉ đích của thông điệp, đối với giao dịch tạo hợp đồng, giá trị là không xác định.                                                                                                      |
| giá trị | Số \| Chuỗi \| BN \| Số lớn | (tùy chọn) Giá trị được chuyển cho giao dịch theo peb cùng với số tiền được chuyển nếu đó là giao dịch tạo hợp đồng.                                                                                    |
| gas     | Số                          | Lượng gas tối đa sẵn sàng trả cho giao dịch (sẽ hoàn lại số gas chưa được dùng đến).                                                                                                                    |
| giá gas | Số                          | (tùy chọn) Giá gas được người gửi cung cấp theo đơn vị peb. Tham số gasPrice phải giống với tham số unitPrice được thiết lập trong nút Klaytn.                                                          |
| data    | Chuỗi                       | (tùy chọn) Đây là một [chuỗi ABI byte](http://solidity.readthedocs.io/en/latest/abi-spec.html) chứa dữ liệu của lệnh gọi hàm trên hợp đồng hoặc là mã khởi tạo trong trường hợp giao dịch tạo hợp đồng. |
| nonce   | Số                          | (tùy chọn) Giá trị nguyên của số dùng một lần. Nếu bị bỏ qua, số lượng giao dịch sẽ được caver-js thiết lập bằng cách gọi ra `caver.klay.getTransactionCount`.                                          |

**Giá trị trả về**

Hàm `callback` sẽ trả về hàm băm giao dịch 32 byte.

`PromiEvent`: Bộ phát hiệu ứng sự kiện kết hợp promise. Sẽ được xử lý khi có biên lai giao dịch. Ngoài ra còn có các sự kiện sau đây:

- `"transactionHash"` trả về `String`: Được kích hoạt ngay sau khi gửi giao dịch và có hàm băm giao dịch.
- `"receipt"` trả về `Object`: Được kích hoạt khi có sẵn biên lai giao dịch.
- `"error"` trả về `Error`: Được kích hoạt nếu có lỗi phát sinh trong quá trình gửi. Khi xảy ra lỗi hết gas, tham số thứ hai sẽ là biên lai.

**Ví dụ**

```javascript
const account = caver.klay.accounts.wallet.add('0x{private key}')

var code = "0x603d80600c6000396000f3007c01000000000000000000000000000000000000000000000000000000006000350463c6888fa18114602d57005b6007600435028060005260206000f3";

// using the callback
caver.klay.sendTransaction({
    from: account.address,
    data: code // deploying a contracrt
}, function(error, hash){
    ...
});

// using the promise
caver.klay.sendTransaction({
    from: account.address,
    to: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe',
    value: '1000000000000000'
})
.then(function(receipt){
    ...
});

// using the event emitter
caver.klay.sendTransaction({
    from: account.address,
    to: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe',
    value: '1000000000000000'
})
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
    ...
})
.on('error', console.error); // If an out-of-gas error, the second parameter is the receipt.
```
