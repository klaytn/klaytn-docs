# caver.validator

Gói `caver.validator` cung cấp các hàm xác thực nên được sử dụng khi triển khai ứng dụng trên Klaytn.

**LƯU Ý** `caver.validator` được hỗ trợ kể từ caver-js phiên bản [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3).

## validateSignedMessage <a href="#validatesignedmessage" id="validatesignedmessage"></a>

```javascript
caver.validator.validateSignedMessage(message, signatures, address [, isHashed])
```

Xác thực tin nhắn đã ký bằng cách so sánh khóa công khai được khôi phục từ chữ ký với khóa tài khoản của tài khoản Klaytn.

**Tham số**

| Tên       | type              | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                             |
| --------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| thông báo | chuỗi             | Chuỗi tin nhắn thô. Nếu tin nhắn này ở dạng băm với tiền tố dành riêng cho Klaytn, tham số thứ ba sẽ được thông qua dưới dạng `true`.                                                                                                                                                                                                                                                                                             |
| chữ ký    | đối tượng \| Mảng | Một đối tượng ở định dạng `{ v, r, s }`, một đối tượng `SignatureData` hoặc một mảng `SignatureData`. Mảng '[ v, r, s ]' hoặc '[[ v, r, s ]]' cũng có thể được thông qua dưới dạng tham số và trong trường hợp này, nó được chuyển đổi nội bộ thành `SignatureData` . |
| address   | chuỗi             | Địa chỉ của tài khoản đã ký tin nhắn.                                                                                                                                                                                                                                                                                                                                                                                             |
| isHashed  | boolean           | (tùy chọn, mặc định: `false`) Liệu tin nhắn được truyền làm tham số có ở dạng băm với tiền tố `"\x19Klaytn Signed Message:\n" + message.length + message` hay không.                                                                                                                                                                                                                                           |

**Giá trị trả về**

`Promise` trả về `boolean`: Promise sẽ được xử lý bằng một giá trị boolean xác định chữ ký trên tin nhắn có hợp lệ hay không.

**Ví dụ**

```javascript
const address = '0xa84a1ce657e9d5b383cece6f4ba365e23fa234dd'
const message = 'Some Message'
const signature = [
	'0x1b',
	'0x8213e560e7bbe1f2e28fd69cbbb41c9108b84c98cd7c2c88d3c8e3549fd6ab10',
	'0x3ca40c9e20c1525348d734a6724db152b9244bff6e0ff0c2b811d61d8f874f00',
]
> caver.validator.validateSignedMessage(message, signature, address).then(console.log)


const address = '0xa84a1ce657e9d5b383cece6f4ba365e23fa234dd'
const hashedMessage = '0xa4b1069c1000981f4fdca0d62302dfff77c2d0bc17f283d961e2dc5961105b18'
const signature = [
	'0x1b',
	'0x8213e560e7bbe1f2e28fd69cbbb41c9108b84c98cd7c2c88d3c8e3549fd6ab10',
	'0x3ca40c9e20c1525348d734a6724db152b9244bff6e0ff0c2b811d61d8f874f00',
]
> caver.validator.validateSignedMessage(hashedMessage, signature, address, true).then(console.log)
```

## validateTransaction <a href="#validatetransaction" id="validatetransaction"></a>

```javascript
caver.validator.validateTransaction(tx)
```

Xác thực một giao dịch. Hàm này so sánh các khóa công khai từ khóa tài khoản của tài khoản Klaytn với các khóa công khai được khôi phục từ `signatures`. Nếu giao dịch được ủy thác phí với biến `feePayerSignatures` bên trong, hàm này sẽ so sánh các khóa công khai được khôi phục từ `feePayerSignatures` với các khóa công khai của người trả phí.

**Tham số**

| Tên | Loại     | Mô tả                                                                              |
| --- | --------- | ---------------------------------------------------------------------------------- |
| tx  | đối tượng | Đối tượng [Giao dịch](./caver-transaction/caver-transaction.md#class) để xác thực. |

**Giá trị trả về**

`Promise` trả về `boolean`: Promise sẽ được xử lý bằng một giá trị boolean xác định liệu giao dịch có hợp lệ hay không.

**Ví dụ**

```javascript
// Basic transaction will be validated with `signatures`.
const tx = caver.transaction.valueTransfer.create({...})
> caver.validator.validateTransaction(tx).then(console.log)

// Fee-delegation transaction will be validated with `signatures` and `feePayerSignatures`.
const tx = caver.transaction.feeDelegatedValueTransfer.create({...})
> caver.validator.validateTransaction(tx).then(console.log)
```

## validateSender <a href="#validatesender" id="validatesender"></a>

```javascript
caver.validator.validateSender(tx)
```

Xác thực người gửi giao dịch. Hàm này so sánh các khóa công khai của khóa tài khoản của tài khoản Klaytn với các khóa công khai được khôi phục từ `signatures`.

**Tham số**

| Tên | type      | Mô tả                                                                              |
| --- | --------- | ---------------------------------------------------------------------------------- |
| tx  | đối tượng | Đối tượng [Giao dịch](./caver-transaction/caver-transaction.md#class) để xác thực. |

**Giá trị trả về**

`Promise` trả về `boolean`: Promise sẽ được xử lý bằng giá trị boolean xác định liệu giao dịch có hợp lệ hay không.

**Ví dụ**

```javascript
const tx = caver.transaction.valueTransfer.create({...})
> caver.validator.validateSender(tx).then(console.log)
```

## validateFeePayer <a href="#validatefeepayer" id="validatefeepayer"></a>

```javascript
caver.validator.validateFeePayer(tx)
```

Xác thực người trả phí trong giao dịch. Hàm này so sánh các khóa công khai của khóa tài khoản của người trả phí với các khóa công khai được khôi phục từ `feePayerSignatures`.

**Tham số**

| Tên | Loại     | Mô tả                                                                              |
| --- | --------- | ---------------------------------------------------------------------------------- |
| tx  | đối tượng | Đối tượng [Giao dịch](./caver-transaction/caver-transaction.md#class) để xác thực. |

**Giá trị trả về**

`Promise` trả về `boolean`: Promise sẽ được xử lý bằng giá trị boolean xác định liệu giao dịch có hợp lệ hay không.

**Ví dụ**

```javascript
const tx = caver.transaction.feeDelegatedValueTransfer.create({...})
> caver.validator.validateFeePayer(tx).then(console.log)
```
