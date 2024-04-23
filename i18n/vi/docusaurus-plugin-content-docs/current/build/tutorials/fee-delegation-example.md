# Ví dụ về ủy thác phí

## Mục lục <a href="#table-of-contents" id="table-of-contents"></a>

- [1. Giới thiệu](#1-introduction)
- [2. Cách hoạt động của ủy thác phí](#2-how-fee-delegation-works)
  - 2.1 Ký giao dịch do người gửi thực hiện
  - 2.2 Ký giao dịch do người trả phí thực hiện
- [3. Máy chủ và máy khách đơn giản dành cho ủy thác phí](#3-simple-server-and-client-for-fee-delegation)
  - 3.1 Máy khách của người gửi
  - 3.2 Máy chủ của người trả phí
- [4. Chạy ví dụ](#4-run-example)
  - 4.1 Chạy `feepayer_server.js`
  - 4.2 Chạy `sender_client.js`
  - 4.3 Kiểm tra `feepayer_server.js`
  - 4.4 Phạm vi Klaytn

## 1. Giới thiệu <a href="#1-introduction" id="1-introduction"></a>

Hướng dẫn này giúp bạn sử dụng SDK caver-js để viết một ví dụ máy chủ-máy khách đơn giản nhằm minh họa cách hoạt động của giao dịch chuyển giá trị ủy thác phí trong Klaytn. Hướng dẫn và mã ví dụ đều sử dụng mạng testnet Baobab.

## 2. Cách hoạt động của ủy thác phí <a href="#2-how-fee-delegation-works" id="2-how-fee-delegation-works"></a>

Hãy xem lướt qua cách hoạt động của ủy thác phí.

### 2.1 Ký giao dịch do người gửi thực hiện <a href="#2-1-transaction-signing-by-the-sender" id="2-1-transaction-signing-by-the-sender"></a>

`Sender` luôn phải ký giao dịch trước khi gửi giao dịch.

Để ký giao dịch, hãy dùng [signTransaction](../../references/sdk/caver-js-1.4.1/api/caver.klay.accounts.md#signtransaction) nào ký giao dịch với khóa riêng tư đã cho.

```
// using the event emitter
const senderAddress = "SENDER_ADDRESS";
const senderPrivateKey = "SENDER_PRIVATEKEY";
const toAddress = "TO_ADDRESS";

const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
  type: 'FEE_DELEGATED_VALUE_TRANSFER',
  from: senderAddress,
  to: toAddress,
  gas: '300000',
  value: caver.utils.toPeb('1', 'KLAY'),
}, senderPrivateKey)
```

Nếu không có lỗi, `senderRawTransaction` sẽ có một giao dịch đã ký do `senderPrivateKey` ký.

Bây giờ, bạn cần gửi `senderRawTransaction` cho người trả phí. Có nhiều cách thực hiện khác nhau. Trong hướng dẫn này, chúng tôi sẽ cung cấp cho bạn một mã máy chủ-máy khách đơn giản để làm ví dụ về việc gửi `senderRawTransaction` cho người trả phí.

### 2.2 Ký giao dịch do người trả phí thực hiện <a href="#2-2-transaction-signing-by-the-fee-payer" id="2-2-transaction-signing-by-the-fee-payer"></a>

Khi `fee payer` nhận `senderRawTransaction`, `fee payer` ký lại `senderRawTransaction` bằng khóa riêng tư của mình và gửi giao dịch đến Klaytn. Đoạn mã dưới đây minh họa quá trình đó. Phương thức `klay.sendTransaction` ký giao dịch bằng khóa riêng tư của tài khoản đã cho trước khi gửi giao dịch. Trước khi chạy mã, hãy thay thế `"FEEPAYER_ADDRESS"` và `"PRIVATE_KEY"` bằng các giá trị thật.

Chú ý rằng khi `fee payer` đại diện cho `sender` gửi giao dịch đến Klaytn, loại `senderRawTransaction` phải là một `FEE_DELEATED` loại giao dịch. Ví dụ dưới đây gọi ra phương pháp [sendTransaction(FEE\_DELEGATED\_VALUE\_TRANSFER)](../../references/sdk/caver-js-1.4.1/api/caver.klay/transaction/sendtx-value-transfer.md#sendtransaction-fee_delegated_value_transfer), vì `senderRawTransaction` nguyên bản do người gửi tạo là [TxTypeFeeDelegatedValueTransfer](../../learn/transactions/fee-delegation.md#txtypefeedelegatedvaluetransfer).

```
const feePayerAddress = "FEEPAYER_ADDRESS";
const feePayerPrivateKey = "PRIVATE_KEY"

caver.klay.accounts.wallet.add(feePayerPrivateKey, feePayerAddress);

caver.klay.sendTransaction({
  senderRawTransaction: senderRawTransaction,
  feePayer: feePayerAddress,
})
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
    ...
})
.on('error', console.error); // If an out-of-gas error, the second parameter is the receipt.
```

## 3. Máy chủ và máy khách đơn giản dành cho ủy thác phí <a href="#3-simple-server-and-client-for-fee-delegation" id="3-simple-server-and-client-for-fee-delegation"></a>

Hãy viết một máy chủ và máy khách đơn giản bằng mã ủy thác phí trên.

### Thiết lập môi trường <a href="#3-1-environment-setup" id="3-1-environment-setup"></a>

Chúng tôi sử dụng `npm` and [caver-js](../../references/sdk/caver-js-1.4.1/get-started-1.4.1.md) để thiết lập môi trường cho ví dụ này như dưới đây.

```
$ mkdir example
$ cd example
$ npm init
$ npm install caver-js@latest
```

### 3.1 Máy khách của người gửi <a href="#3-1-sender-s-client" id="3-1-sender-s-client"></a>

Đầu tiên, chúng tôi sẽ viết một `sender_client.js` như dưới đây.

Hãy thay thế `"SENDER_ADDRESS"`, `"SENDER_PRIVATEKEY"` và `"TO_ADDRESS"` trong ví dụ bằng giá trị thật.

```javascript
var net = require('net');
var client = new net.Socket();

const Caver = require('caver-js');
const caver = new Caver('https://public-en-baobab.klaytn.net');
const senderAddress = "SENDER_ADDRESS";
const senderPrivateKey = "SENDER_PRIVATEKEY";
const toAddress = "TO_ADDRESS";

sendFeeDelegateTx = async() => {
    // sign transaction with private key of sender
    const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
      type: 'FEE_DELEGATED_VALUE_TRANSFER',
      from: senderAddress,
      to: toAddress,
      gas: '300000',
      value: caver.utils.toPeb('0.00001', 'KLAY'),
    }, senderPrivateKey)

    // send signed raw transaction to fee payer's server
    client.connect(1337, '127.0.0.1', function() {
            console.log('Connected to fee delegated service');
    });
    client.write(senderRawTransaction);

    client.on('data', function(data) {
            console.log('Received data from server: ' + data);
    });

    client.on('close', function() {
            console.log('Connection closed');
    });
}

sendFeeDelegateTx();
```

Mã trên ký một giao dịch chuyển giá trị ủy thác phí bằng `senderPrivateKey` và gửi `senderRawTransaction` đã ký đến máy chủ của người trả phí đang chạy trên cổng `1337` trên `127.0.0.1`, tức là localhost.

### 3.2 Máy chủ của người trả phí <a href="#3-2-fee-payer-s-server" id="3-2-fee-payer-s-server"></a>

Bây giờ hãy viết máy chủ của người trả phí `feepayer_server.js`, là máy chủ ký `senderRawTransaction` đã được nhận với `feePayerPrivateKey` và gửi nó đến testnet Baobab.

Hãy thay thế `"FEEPAYER_ADDRESS"` và `"FEEPAYER_PRIVATEKEY"` trong ví dụ dưới đây bằng giá trị thật.

```javascript
const Caver = require('caver-js');
const caver = new Caver('https://public-en-baobab.klaytn.net');
const feePayerAddress = "FEEPAYER_ADDRESS";
const feePayerPrivateKey = "FEEPAYER_PRIVATEKEY";

// add fee payer account
caver.klay.accounts.wallet.add(feePayerPrivateKey, feePayerAddress);

var net = require('net');


feePayerSign = (senderRawTransaction, socket) => {
    // fee payer
    caver.klay.sendTransaction({
      senderRawTransaction: senderRawTransaction,
      feePayer: feePayerAddress,
    })
    .on('transactionHash', function(hash){
        console.log('transactionHash', hash);
    })
    .on('receipt', function(receipt){
        console.log('receipt', receipt);
        socket.write('Tx hash is '+ receipt.transactionHash);
        socket.write('Sender Tx hash is '+ receipt.senderTxHash);
    })
    .on('error', console.error); // If an out-of-gas error, the second parameter is the receipt.
}

var server = net.createServer(function(socket) {
       console.log('Client is connected ...');
    socket.write('This is fee delegating service');
    socket.write('Fee payer is ' + feePayerAddress);
        socket.on('data', function(data) {
            console.log('Received data from client:', data.toString());
            feePayerSign(data.toString(), socket);
        });
});

server.listen(1337, '127.0.0.1');
console.log('Fee delegate service started ...');
```

Máy chủ nghe trên cổng `1337`.

Khi có `data` đến, nó sẽ báo hiệu `data` với `feePayerPrivateKey` và gửi đến chuỗi khối Klaytn. Giả định rằng `data` là `senderRawTransaction` từ `sender_client.js`.

## 4. Chạy ví dụ <a href="#4-run-example" id="4-run-example"></a>

Chuẩn bị hai cửa sổ lệnh, một cho `sender_client.js` và một cho `feepayer_server.js`.

### 4.1 Chạy `feepayer_server.js` <a href="#4-1-run-feepayer_server-js" id="4-1-run-feepayer_server-js"></a>

Máy chủ của người trả phí sẽ khởi động bên dưới lệnh.

```
$ node feepayer_server.js
Fee delegate service started ...
```

Máy chủ bắt đầu và đang nghe trên cổng 1337.

### 4.2 Chạy `sender_client.js` <a href="#4-2-run-sender_client-js" id="4-2-run-sender_client-js"></a>

Hãy chạy `sender_client.js` để gửi giao dịch có phí ủy thác.

```
$ node sender_client.js
Signed a fee delegated value transfer transaction.
Sending a signed transaction to fee delegated service.
Connected to fee delegated service
Received data from server: This is fee delegating service
Received data from server: Fee payer is 0x2645BA5Be42FfEe907ca8e9d88f6Ee6dAd8c1410
Received data from server: Tx hash is 0xd99086aa8188255d4ee885d9f1933b6cc062085c1196731ba599b2fb8f2dbbd7
Received data from server: Sender Tx hash is 0xe1f630547f287177a0e92198b1c67212b24fc1ad5a1f0b1f94fd6f980281fdba
```

Giao dịch sẽ được ký với khóa riêng tư `sender`; giao dịch đã ký được gửi đến dịch vụ ủy thác phí (nghĩa là máy chủ của người trả phí). Sau đó, máy chủ sẽ nhận phản hồi từ dịch vụ ủy thác phí bao gồm địa chỉ của `Fee payer`, `Tx hash`, và `Sender Tx hash`. `Tx hash` là hàm băm của giao dịch được gửi đến mạng lưới Klaytn, trong khi đó `Sender Tx hash` là hàm băm của giao dịch không có địa chỉ, chữ ký của người trả phí. Để biết thêm chi tiết, vui lòng xem [SenderTxHash](../../learn/transactions/transactions.md#sendertxhash).

### 4.3 Kiểm tra `feepayer_server.js` <a href="#4-3-check-feepayer_server-js" id="4-3-check-feepayer_server-js"></a>

Tại bảng điều khiển của máy chủ, bạn sẽ thấy kết quả đầu ra dưới đây. Đây là biên lai giao dịch từ Klaytn.

```
$ node feepayer_server.js
Fee delegate service started ...
Client is connected ...
Received data from client: 0x09f88b3a8505d21dba00830493e094fc83add44939ef818ce62dacea23697fa17257838609184e72a000940ecc24157e38b1997aace56f32ccb381b16e1710f847f8458207f5a0e636e67d01acc1f368db5e60290721e9059b13b0bf74af6d46391cc48bd31a81a0135118878be87f808e064f64fa4f13d6dc5bd9888b154ecd17f02980063b9e4280c4c3018080
transactionHash { messageHash:
   '0xa4cd7d479d19251a1981086431eff5514c5edf61731a6e5271b2a137a156f7e7',
  v: '0x07f6',
  r:
   '0xdb9c3a5b75c20f15cba9bc28eebcaff58701f57d4a226e7e3cb2bc4544b3c96c',
  s:
   '0x7646e929aa6467fa1c849f3abf37054df4cb08e6ee160f6375517ae2609f4b11',
  rawTransaction:
   '0x09f8e33a8505d21dba00830493e094fc83add44939ef818ce62dacea23697fa17257838609184e72a000940ecc24157e38b1997aace56f32ccb381b16e1710f847f8458207f5a0e636e67d01acc1f368db5e60290721e9059b13b0bf74af6d46391cc48bd31a81a0135118878be87f808e064f64fa4f13d6dc5bd9888b154ecd17f02980063b9e42942645ba5be42ffee907ca8e9d88f6ee6dad8c1410f847f8458207f6a0db9c3a5b75c20f15cba9bc28eebcaff58701f57d4a226e7e3cb2bc4544b3c96ca07646e929aa6467fa1c849f3abf37054df4cb08e6ee160f6375517ae2609f4b11',
  txHash:
   '0xd99086aa8188255d4ee885d9f1933b6cc062085c1196731ba599b2fb8f2dbbd7' }
transactionHash 0xd99086aa8188255d4ee885d9f1933b6cc062085c1196731ba599b2fb8f2dbbd7
receipt { blockHash:
   '0x1c61f03d2f0eba86c0f58ee7d1be8e8e425f47e9c46433474bd11c5a3f0528b2',
  blockNumber: 3175653,
  contractAddress: null,
  feePayer: '0x2645ba5be42ffee907ca8e9d88f6ee6dad8c1410',
  feePayerSignatures:
   [ { V: '0x7f6',
       R:
        '0xdb9c3a5b75c20f15cba9bc28eebcaff58701f57d4a226e7e3cb2bc4544b3c96c',
       S:
        '0x7646e929aa6467fa1c849f3abf37054df4cb08e6ee160f6375517ae2609f4b11' } ],
  from: '0x0ecc24157e38b1997aace56f32ccb381b16e1710',
  gas: '0x493e0',
  gasPrice: '0x5d21dba00',
  gasUsed: 31000,
  logs: [],
  logsBloom:
   '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  nonce: '0x3a',
  senderTxHash:
   '0xe1f630547f287177a0e92198b1c67212b24fc1ad5a1f0b1f94fd6f980281fdba',
  signatures:
   [ { V: '0x7f5',
       R:
        '0xe636e67d01acc1f368db5e60290721e9059b13b0bf74af6d46391cc48bd31a81',
       S:
        '0x135118878be87f808e064f64fa4f13d6dc5bd9888b154ecd17f02980063b9e42' } ],
  status: true,
  to: '0xfc83add44939ef818ce62dacea23697fa1725783',
  transactionHash:
   '0xd99086aa8188255d4ee885d9f1933b6cc062085c1196731ba599b2fb8f2dbbd7',
  transactionIndex: 0,
  type: 'TxTypeFeeDelegatedValueTransfer',
  typeInt: 9,
  value: '0x9184e72a000' }
```

### 4.4 Phạm vi Klaytn <a href="#4-4-klaytn-scope" id="4-4-klaytn-scope"></a>

You can also find the above transaction on the [Klaytnscope](https://baobab.klaytnscope.com).

Nó cho thấy giao dịch là `TxTypeFeeDelegatedValueTransfer` và `Fee payer` là `0x2645ba5be42ffee907ca8e9d88f6ee6dad8c1410` hoặc `feepayerAddress` mà bạn đã nhập, đồng thời `From` là một địa chỉ khác lẽ ra phải là `senderAddress` trong ví dụ trên.

![Fee delegated Tx](/img/build/tutorials/fee-delegation-example.png)
