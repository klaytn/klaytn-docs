# caver-js (1.5.0 trở lên)

![](/img/references/klaytnXcaver-js.png)

`caver-js` là một thư viện API JavaScript cho phép các nhà phát triển tương tác với nút Klaytn bằng kết nối HTTP hoặc Websocket. Nó có sẵn trên [npm](https://www.npmjs.com/package/caver-js).

## Tính năng <a href="#features" id="features"></a>

- Hoàn tất việc triển khai API máy khách JSON-RPC của Klaytn qua HTTP và Websocket
- Hỗ trợ giao dịch, tài khoản và các loại khóa tài khoản của Klaytn
- Gói hợp đồng thông minh JavaScript để triển khai và thực thi hợp đồng thông minh trên mạng lưới Klaytn
- Ví trong bộ nhớ để quản lý các tài khoản Klaytn
- Hỗ trợ ủy thác phí
- Hỗ trợ định dạng khóa ví Klaytn
- Mã hóa/giải mã một đối tượng giao dịch trong RLP
- Ký một đối tượng giao dịch
- Dễ dàng chuyển ứng dụng web3-js sang caver-js

## Các gói trong caver-js <a href="#packages-in-caver-js" id="packages-in-caver-js"></a>

Dưới đây là các gói được cung cấp trong `caver-js`.

- [caver.tài khoản](./api/caver.account.md)
- [caver.wallet.keyring](./api/caver-wallet/keyring.md)
- [caver.wallet](./api/caver-wallet/caver-wallet.md)
- [caver.transaction](./api/caver-transaction/caver-transaction.md)
- [caver.rpc](./api/caver-rpc/caver-rpc.md)
- [caver.contract](./api/caver.contract.md)
- [caver.abi](./api/caver.abi.md)
- [caver.kct](./api/caver-kct/caver-kct.md)
- [caver.validator](./api/caver.validator.md)
- [caver.utils](./api/caver.utils.md)
- [caver.ipfs](./api/caver.ipfs.md)

## Cải thiện mã lỗi <a href="#error-code-improvement" id="error-code-improvement"></a>

Các thông báo lỗi từ Ethereum qua web3.js thường không chỉ ra lỗi phát sinh ở đâu. `caver-js` cải thiện giao diện để nhận các thông báo lỗi từ Klaytn.

Bạn có thể tìm hiểu thêm thông tin trong giá trị của `txError` của biên lai giao dịch như dưới đây:

```
Error: runtime error occurred in interpreter
 {
  "blockHash": "0xe7ec35c9fff1178d52cee1d46d40627d19f828c4b06ad1a5c3807698b99acb20",
  "blockNumber": 7811,
  "contractAddress": null,
  "from": "0xa8a2d37727197cc0eb827f8c5a3a3aceb26cf59e",
  "gasUsed": 9900000000,
  "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  "status": false,
  "to": "0xf8425b0f65147969621f9390ca06139c7b439497",
  "transactionHash": "0x85ce2b307899c90144442d9b3236827ac57375c522be2435093aebfd920b8c58",
  "transactionIndex": 0,
  "txError": "0x2",
  "events": {}
}
```

## Thận trọng khi gửi giao dịch đến Klaytn <a href="#caution-when-sending-a-transaction-to-klaytn" id="caution-when-sending-a-transaction-to-klaytn"></a>

Klaytn có chính sách giá gas mới kể từ đợt nâng cấp căn bản của Magma, kích hợt [KIP-71](https://kips.klaytn.foundation/KIPs/kip-71).

Vì thế, bạn cần đặt logic `gasPrice` theo cách khác khi gửi giao dịch, tùy vào việc nâng cấp căn bản có áp dụng được hay không.

Trước thời điểm nâng cấp căn bản của Magma, các giao dịch trên Klaytn tuân theo "giá gas cố định". Vì thế, các giao dịch với mức giá khác gửi lên mạng đều bị từ chối. Nếu `gasPrice` không được xác định khi bạn ký hoặc gửi một giao dịch, caver-js sẽ gọi RPC [caver.rpc.klay.getGasPrice](./api/caver-rpc/klay.md#caver-rpc-klay-getgasprice) để đặt giá gas.

Sau đợt nâng cấp căn bản của Magma, Klaytn sử dụng "cơ chế định giá phí gas động". Giá gas của giao dịch phải cao hơn mức phí cơ sở của mạng lưới Klaytn. Nếu `gasPrice` không được xác định khi bạn ký hoặc gửi một giao dịch, caver-js sẽ thiết lập trường `gasPrice` của giao dịch bằng cách sử dụng `caver.rpc.klay.getGasPrice`.

### Cách để đặt trường gasPrice

caver-js cung cấp nhiều cách để đặt `gasPrice`. Các cách để đặt trường `gasPrice` khi dùng caver-js được đề xuất bên dưới. Bạn có thể dùng các phương pháp được mô tả ở đây bất kể đã có nâng cấp căn bản hay chưa.

#### Không xác định trường `gasPrice`

Nếu bạn tạo một đối tượng cụ thể mà không xác định trường `gasPrice`, trường `gasPrice` sẽ được đặt tự động khi bạn gọi `tx.sign` hoặc `tx.signAsFeePayer` để ký một giao dịch.

```
const tx = caver.transaction.valueTransfer.create({ from, to, value, gas })
await tx.sign(from, tx) // Before signing, gasPrice is set inside `tx.sign`.
```

#### Dùng phương pháp `tx.fillTransaction`

Bạn có thể dùng `tx.fillTransaction`, hàm này điền giá trị phù hợp vào các trường không bắt buộc của giao dịch khi chúng bị bỏ trống.

```
const tx = caver.transaction.valueTransfer.create({ from, to, value, gas })
await tx.fillTransaction() // Fill the optional tx fields. 
```

#### Dùng phương pháp `tx.suggestGasPrice`

Bạn có thể đặt `gasPrice` với kết quả của `tx.suggestGasPrice`, trả về giá gas được đề xuất.

```
const tx = caver.transaction.valueTransfer.create({ from, to, value, gas })
tx.gasPrice = await tx.suggestGasPrice() 
```

Để biết thêm thông tin về giá gas, hãy xem [Tổng quan về đơn giá và giá gas](../../../learn/transaction-fees.md#gas-and-unit-price-overview) Bạn có thể lấy giá gas được dùng trong mạng lưới bằng cách sử dụng [caver.rpc.klay.getGasPrice](./api/caver-rpc/klay.md#caver-rpc-klay-getgasprice).

## Liên kết <a href="#links" id="links"></a>

- caver-js [Kho GitHub](https://github.com/klaytn/caver-js)
- caver-js trên [npm](https://www.npmjs.com/package/caver-js)
