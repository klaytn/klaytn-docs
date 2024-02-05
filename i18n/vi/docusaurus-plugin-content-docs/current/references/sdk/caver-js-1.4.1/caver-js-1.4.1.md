# caver-js (1.4.1 hoặc sớm hơn)

`caver-js` là một thư viện API JavaScript cho phép các nhà phát triển tương tác với nút Klaytn bằng kết nối HTTP hoặc Websocket. Nó có sẵn trên [npm](https://www.npmjs.com/package/caver-js).

## Tính năng <a id="features"></a>

- Hoàn tất việc triển khai API máy khách JSON-RPC của Klaytn qua HTTP và Websocket
- Hỗ trợ giao dịch, tài khoản và các loại khóa tài khoản của Klaytn
- Gói hợp đồng thông minh JavaScript để triển khai và thực thi hợp đồng thông minh trên mạng lưới Klaytn
- Ví trong bộ nhớ để quản lý các tài khoản Klaytn
- Hỗ trợ ủy thác phí
- Hỗ trợ định dạng khóa ví Klaytn
- Mã hóa/giải mã một đối tượng giao dịch trong RLP
- Ký một đối tượng giao dịch
- Dễ dàng chuyển ứng dụng web3-js sang caver-js

## Các gói trong caver-js <a id="packages-in-caver-js"></a>

Dưới đây là các gói được cung cấp trong `caver-js`.

- [caver.klay](./api/caver.klay/caver.klay.md)
- [caver.klay.tài khoảns](./api/caver.klay.accounts.md)
- [caver.klay.Contract](./api/caver.klay.Contract.md)
- [caver.klay.net](./api/caver.klay.net.md)
- [caver.klay.abi](./api/caver.klay.abi.md)
- [caver.utils](./api/caver.utils_1.4.1.md)

## Cải thiện mã lỗi <a id="error-code-improvement"></a>

Các thông báo lỗi từ Ethereum qua web3.js thường không chỉ ra lỗi phát sinh ở đâu. `caver-js` cải thiện giao diện để nhận các thông báo lỗi từ Klaytn.

Bạn có thể tìm hiểu thêm thông tin trong giá trị của `txError` của biên lai giao dịch như dưới đây:

```text
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

## Thận trọng khi gửi giao dịch đến Klaytn <a id="caution-when-sending-a-transaction-to-klaytn"></a>

Klaytn sử dụng giá gas cố định (25 ston = 25 \* 10^9). Một giao dịch có giá khác được gửi lên mạng lưới Klaytn sẽ bị từ chối. Để biết thêm thông tin về giá gas, hãy xem [Tổng quan về đơn giá và giá gas](../../../learn/transaction-fees.md#gas-and-unit-price-overview) Bạn có thể lấy giá gas được dùng trong mạng lưới bằng cách sử dụng [caver.klay.getGasPrice](./api/caver.klay/config.md#getgasprice).

Nếu `gasPrice` không được xác định khi bạn ký hoặc gửi một giao dịch, caver-js sẽ gọi RPC [caver.klay.getGasPrice](./api/caver.klay/config.md#getgasprice) để đặt giá gas của giao dịch.

## Liên kết <a id="links"></a>

- caver-js [Kho GitHub](https://github.com/klaytn/caver-js)
- caver-js trên [npm](https://www.npmjs.com/package/caver-js)
