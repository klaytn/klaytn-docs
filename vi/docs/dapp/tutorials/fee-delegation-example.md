# Ví dụ về ủy thác phí

## Mục lục <a href="#table-of-contents" id="table-of-contents"></a>

* [1. Giới thiệu](fee-delegation-example.md#1-introduction)
* [2. Cách hoạt động của ủy thác phí](fee-delegation-example.md#2-how-fee-delegation-works)
  * 2.1 Ký giao dịch do người gửi thực hiện
  * 2.2 Ký giao dịch do người trả phí thực hiện
* [3. Máy chủ và máy khách đơn giản dành cho ủy thác phí](fee-delegation-example.md#3-simple-server-and-client-for-fee-delegation)
  * 3.1 Máy khách của người gửi
  * 3.2 Máy chủ của người trả phí
* [4. Chạy ví dụ](fee-delegation-example.md#4-run-example)
  * 4.1 Chạy `feepayer_server.js`
  * 4.2 Chạy `sender_client.js`
  * 4.3 Kiểm tra `feepayer_server.js`
  * 4.4 Phạm vi Klaytn

## 1. Giới thiệu <a href="#1-introduction" id="1-introduction"></a>

Hướng dẫn này giúp bạn sử dụng SDK caver-js để viết một ví dụ máy chủ-máy khách đơn giản nhằm minh họa cách hoạt động của giao dịch chuyển giá trị được ủy thác có phí trong Klaytn. Hướng dẫn và mã ví dụ đều sử dụng mạng testnet Baobab.

## 2. Cách hoạt động của ủy thác phí <a href="#2-how-fee-delegation-works" id="2-how-fee-delegation-works"></a>

Hãy xem lướt qua cách hoạt động của ủy thác phí.

### 2.1 Ký giao dịch do người gửi thực hiện <a href="#2-1-transaction-signing-by-the-sender" id="2-1-transaction-signing-by-the-sender"></a>

`Sender` luôn phải ký giao dịch trước khi gửi giao dịch.

Để ký giao dịch, hãy dùng [signTransaction](../sdk/caver-js/v1.4.1/api-references/caver.klay.accounts.md#signtransaction) nào ký giao dịch với khóa riêng tư đã cho.

```
// sử dụng bộ phát hiệu ứng sự kiện
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

Bây giờ, bạn cần gửi `senderRawTransaction` tới người trả phí. Có nhiều cách thực hiện khác nhau. Trong hướng dẫn này, chúng tôi sẽ cung cấp cho bạn một mã máy chủ-máy khách đơn giản để ví dụ về việc gửi `senderRawTransaction` cho người trả phí.

### 2.2 Ký giao dịch do người trả phí thực hiện <a href="#2-2-transaction-signing-by-the-fee-payer" id="2-2-transaction-signing-by-the-fee-payer"></a>

Khi `fee payer` nhận `senderRawTransaction`, `fee payer` ký lại `senderRawTransaction` bằng khóa riêng tư của mình và gửi giao dịch đến Klaytn. Đoạn mã dưới đây minh họa quá trình đó. Phương thức `klay.sendTransaction` ký giao dịch bằng khóa riêng tư của tài khoản đã cho trước khi gửi giao dịch. Trước khi chạy mã, hãy thay thế `"FEEPAYER_ADDRESS"` và `"PRIVATE_KEY"` bằng các giá trị thật.

Chú ý rằng khi `fee payer` đại diện cho `sender` gửi giao dịch tới Klaytn, loại `senderRawTransaction` phải là một `FEE_DELEATED` loại giao dịch. Ví dụ dưới đây gọi ra phương thức [sendTransaction(FEE\_DELEGATED\_VALUE\_TRANSFER)](../sdk/caver-js/v1.4.1/api-references/caver.klay/sendtx\_value\_transfer.md#sendtransaction-fee\_delegated\_value\_transfer), vì `senderRawTransaction` nguyên bản do người gửi tạo là [TxTypeFeeDelegatedValueTransfer](../../klaytn/design/transactions/fee-delegation.md#txtypefeedelegatedvaluetransfer).

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
.on('error', console.error); // Nếu có lỗi hết gas thì tham số thứ 2 là biên lai.
```

## 3. Máy chủ và máy khách đơn giản dành cho ủy thác phí <a href="#3-simple-server-and-client-for-fee-delegation" id="3-simple-server-and-client-for-fee-delegation"></a>

Hãy viết một máy chủ và máy khách đơn giản bằng mã ủy thác phí trên.

### Thiết lập môi trường <a href="#3-1-environment-setup" id="3-1-environment-setup"></a>

Chúng ta sử dụng `npm` and [caver-js](../sdk/caver-js/v1.4.1/getting-started\_1.4.1.md) để thiết lập môi trường cho ví dụ này như dưới đây.

```
$ mkdir example
$ cd example
$ npm init
$ npm install caver-js@latest
```

### 3.1 Máy khách của người gửi <a href="#3-1-sender-s-client" id="3-1-sender-s-client"></a>

Đầu tiên, chúng ta sẽ viết một `sender_client.js` như dưới đây.

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
    // ký giao dịch với khóa riêng tư của người gửi
    const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
      type: 'FEE_DELEGATED_VALUE_TRANSFER',
      from: senderAddress,
      to: toAddress,
      gas: '300000',
      value: caver.utils.toPeb('0.00001', 'KLAY'),
    }, senderPrivateKey)

    // gửi giao dịch thô đã ký đến máy chủ của người trả phí
    client.connect(1337, '127.0.0.1', function() {
            console.log('Đã kết nối với dịch vụ ủy thác phí');
    });
    client.write(senderRawTransaction);

    client.on('data', function(data) {
            console.log('Đã nhận dữ liệu từ máy chủ: ' + data);
    });

    client.on('close', function() {
            console.log('Kết nối đã đóng');
    });
}

sendFeeDelegateTx();
```

The above code signs a fee delegated value transfer transaction with `senderPrivateKey` and sends the signed `senderRawTransaction` to the fee payer's server which is running on port `1337` on `127.0.0.1`, i.e. localhost.

### 3.2 Fee payer's server <a href="#3-2-fee-payer-s-server" id="3-2-fee-payer-s-server"></a>

Now let's write the fee payer's server, `feepayer_server.js`, which signs received `senderRawTransaction` with `feePayerPrivateKey` and sends it to Baobab testnet.

In the below example, please replace `"FEEPAYER_ADDRESS"` and `"FEEPAYER_PRIVATEKEY"` with actual values.

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

The server listens on port `1337`.

When there is incoming `data`, it signs the `data` with `feePayerPrivateKey` and sends it to the Klaytn blockchain. It assumes that the `data` is `senderRawTransaction` from the `sender_client.js`.

## 4. Run example <a href="#4-run-example" id="4-run-example"></a>

Prepare two terminals, one for `sender_client.js` and another for `feepayer_server.js`.

### 4.1 Run `feepayer_server.js` <a href="#4-1-run-feepayer_server-js" id="4-1-run-feepayer_server-js"></a>

Below the command will start the fee payer's server.

```
$ node feepayer_server.js
Fee delegate service started ...
```

The server starts and is now listening on port 1337.

### 4.2 Run `sender_client.js` <a href="#4-2-run-sender_client-js" id="4-2-run-sender_client-js"></a>

Let's run `sender_client.js` to send a fee delegated transaction.

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

It will sign a transaction with the `sender` private key and send the signed transaction to the fee delegated service (i.e., fee payer's server). Then it will receive the response from the fee delegate service including the `Fee payer` address, `Tx hash`, and `Sender Tx hash`. `Tx hash` is hash of a transaction submitted to the Klaytn network, while `Sender Tx hash` is hash of a transaction without the fee payer's address and signature. For more details, please take a look at [SenderTxHash](../../klaytn/design/transactions/#sendertxhash).

### 4.3 Check `feepayer_server.js` <a href="#4-3-check-feepayer_server-js" id="4-3-check-feepayer_server-js"></a>

On the server's console, you will see below outputs. It prints the transaction receipt from the Klaytn.

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

### 4.4 Klaytn scope <a href="#4-4-klaytn-scope" id="4-4-klaytn-scope"></a>

You can also find the above transaction on the [Klaytn scope](https://baobab.scope.klaytn.com).

It shows that the transaction is `TxTypeFeeDelegatedValueTransfer` and `Fee payer` is `0x2645ba5be42ffee907ca8e9d88f6ee6dad8c1410` or `feepayerAddress` that you entered, while `From` is a different address which should be the `senderAddress` in above example.

![Fee delegated Tx](../../bapp/tutorials/img/fee-delegation-example.png)
