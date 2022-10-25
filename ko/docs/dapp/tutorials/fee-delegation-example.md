# 트랜잭션 수수료 위임 예시 <a id="fee-delegation-example"></a>

## 목차 <a id="table-of-contents"></a>

* [1. 소개](#1-introduction)
* [2. 트랜잭션 수수료 위임 작동 방식](#2-how-fee-delegation-works)
  * 2.1 트랜잭션 발신자에 의한 서명
  * 2.2 트랜잭션 수수료 납부자에 의한 서명
* [3. 트랜잭션 수수료 위임을 위한 간단한 서버와 클라이언트](#3-simple-server-and-client-for-fee-delegation)
  * 3.1 트랜잭션 발신자의 클라이언트
  * 3.2 트랜잭션 수수료 납부자의 서버
* [4. 예제 실행](#4-run-example)
  * 4.1 `feepayer_server.js` 실행
  * 4.2 `sender_client.js` 실행
  * 4.3 `feepayer_server.js` 확인
  * 4.4  Klaytnscope

## 1. 소개 <a id="1-introduction"></a>

본 튜토리얼은 caver-js SDK를 활용하여 간단한 서버-클라이언트를 예제를 구축할 수 있도록 함으로써 Klaytn에서 어떻게 트랜잭션 수수료가 위임된 송금 트랜잭션이 작동되는지 보여줍니다. 튜토리얼과 예제의 코드는 Baobab 테스트넷을 사용하고 있습니다.

## 2. 트랜잭션 수수료 위임 작동 방식 <a id="2-how-fee-delegation-works"></a>

Let's skim through how fee delegation works.

### 2.1 트랜잭션 발신자에 의한 서명 <a id="2-1-transaction-signing-by-the-sender"></a>

`Sender`\(트랜잭션 발신자\)는 트랜잭션을 전송하기 전에 항상 트랜잭션을 서명해야 합니다.

트랜잭션을 서명하려면 개인키로 트랜잭션 서명을 하는 [signTransaction](../sdk/caver-js/v1.4.1/api-references/caver.klay.accounts.md#signtransaction)을 실행하세요.

```text
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

에러가 발생하지 않았다면  `senderRawTransaction` 실행 결과 `senderPrivateKey`를 통해 서명된 트랜잭션을 확인하실 수 있을 것입니다.

이제 트랜잭션 수수료 납부자에게 `senderRawTransaction`를 전송해야 합니다. 전송하는 방법은 여러 가지가 있습니다. 여기서는 `senderRawTransaction`를 트랜잭션 수수료 납부자에게 전송하는 예제로 간단한 서버-클라이언트 코드를 보여 드리겠습니다.

### 2.2 트랜잭션 수수료 납부자에 의한 서명 <a id="2-2-transaction-signing-by-the-fee-payer"></a>

`fee payer`\(트랜잭션 수수료 납부자\)가 `senderRawTransaction`를 받으면, `fee payer`\(트랜잭션 수수료 납부자\)는 본인의 개인키로 한번 더 `senderRawTransaction`를 서명한 후 Klaytn에 전송합니다. 다음 코드는 위 과정을 구현한 것입니다. `klay.sendTransaction` 메서드는 트랜잭션을 전송하기 전에 지정한 계정의 개인키로 트랜잭션을 서명합니다. 아래 코드를 실행하기 전에 `"FEEPAYER_ADDRESS"`와 `"PRIVATE_KEY"`는 각각 트랜잭션 수수료 납부자의 주소와 납부자의 개인키로 바꿔주세요.

이때 `fee payer`\(트랜잭션 수수료 납부자\)가 `sender`\(트랜잭션 발신자\)를 대신하여 트랜잭션을 Klaytn에 제출하는 경우, `senderRawTransaction`의 타입은 반드시 `FEE_DELEATED`이어야 합니다. 아래 예제에서는 트랜잭션 발신자가 생성한 [senderRawTransaction](../sdk/caver-js/v1.4.1/api-references/caver.klay/sendtx_value_transfer.md#sendtransaction-fee_delegated_value_transfer)가 `TxTypeFeeDelegatedValueTransfer` 타입이었기 때문에 [sendTransaction\(FEE\_DELEGATED\_VALUE\_TRANSFER\)](../../klaytn/design/transactions/fee-delegation.md#txtypefeedelegatedvaluetransfer) 메서드가 호출되었습니다.

```text
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
.on('error', console.error); // 가스 부족 에러(out-of-gas)가 발생한 경우 두 번째 인자는 트랜잭션 영수증입니다.
```

## 3. 트랜잭션 수수료 위임을 위한 간단한 서버와 클라이언트 <a id="3-simple-server-and-client-for-fee-delegation"></a>

위의 트랜잭션 수수료 위임 코드를 활용하여 간단한 서버와 클라이언트를 구축해보겠습니다.

### 3.1 환경설정 <a id="3-1-environment-setup"></a>

위 예제의 환경설정을 위해 `npm`과 [caver-js](../sdk/caver-js/v1.4.1/getting-started_1.4.1.md)을 사용하여 아래와 같이 설정합니다.

```text
$ mkdir example
$ cd example
$ npm init
$ npm install caver-js@latest
```

### 3.1 트랜잭션 발신자의 클라이언트 <a id="3-1-sender-s-client"></a>

먼저 다음과 같이 `sender_client.js`를 작성해주세요.

여기서 `"SENDER_ADDRESS"`, `"SENDER_PRIVATEKEY"`, `"TO_ADDRESS"`를 각각 실제 발신자의 주소, 개인키, 수신자로 바꿔주세요.

```javascript
var net = require('net');
var client = new net.Socket();

const Caver = require('caver-js');
const caver = new Caver('https://api.baobab.klaytn.net:8651');
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

The above code signs a fee delegated value transfer transaction with `senderPrivateKey` and sends the signed `senderRawTransaction` to the fee payer's server which is running on port `1337` on `127.0.0.1`, i.e. localhost.

### 3.2 트랜잭션 수수료 납부자의 서버 <a id="3-2-fee-payer-s-server"></a>

이제 트랜잭션 수수료 납부자의 서버인 `feepayer_server.js`를 작성해봅시다. 이 서버는 수신한 `senderRawTransaction`를 `feePayerPrivateKey`로 서명한 후 Baobab 테스트넷에 전송합니다.

아래 예제의 `"FEEPAYER_ADDRESS"`와 `"FEEPAYER_PRIVATEKEY"`는 각각 실제 트랜잭션 수수료 납부자의 주소와 개인키로 바꿔주세요.

```javascript
const Caver = require('caver-js');
const caver = new Caver('https://api.baobab.klaytn.net:8651');
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

이 서버는 `1337`번 포트에서 수신 대기 중입니다.

`data`가 들어오면 `feePayerPrivateKey`로 `data`를 서명하고 Klaytn 블록체인으로 전송할거에요. 이때 `data`는 `sender_client.js`로부터 전송받은 `senderRawTransaction`입니다.

## 4. 예제 실행 <a id="4-run-example"></a>

`sender_client.js`를 실행할 터미널과 `feepayer_server.js`를 실행할 터미널, 총 두 개의 터미널을 준비해주세요.

### 4.1 `feepayer_server.js` 실행 <a id="4-1-run-feepayer_server-js"></a>

아래 명령어는 트랜잭션 수수료 납부자의 서버를 실행시킵니다.

```text
$ node feepayer_server.js
Fee delegate service started ...
```

서버가 실행되고 1337번 포트에서 수신 대기 중이네요.

### 4.2 `sender_client.js` 실행 <a id="4-2-run-sender_client-js"></a>

이제 `sender_client.js`를 실행하여 트랜잭션 수수료가 위임된 트랜잭션을 전송해봅시다.

```text
$ node sender_client.js
Signed a fee delegated value transfer transaction.
Sending a signed transaction to fee delegated service.
Connected to fee delegated service
Received data from server: This is fee delegating service
Received data from server: Fee payer is 0x2645BA5Be42FfEe907ca8e9d88f6Ee6dAd8c1410
Received data from server: Tx hash is 0xd99086aa8188255d4ee885d9f1933b6cc062085c1196731ba599b2fb8f2dbbd7
Received data from server: Sender Tx hash is 0xe1f630547f287177a0e92198b1c67212b24fc1ad5a1f0b1f94fd6f980281fdba
```

`sender`\(트랜잭션 발신자\)의 개인키로 트랜잭션을 서명한 후 트랜잭션 수수료 위임 서비스\(예를 들면 트랜잭션 수수료 납부자의 서버\)로 서명된 트랜잭션을 전송합니다. 이후 트랜잭션 수수료 위임 서비스로부터 `Fee payer`\(트랜잭션 수수료 납부자\) 의 주소, `Tx hash`, `Sender Tx hash`가 포함된 응답을 받습니다. 이때 `Tx hash`는 Klaytn 네트워크에 제출된 트랜잭션의 해시이고, `Sender Tx hash`는 트랜잭션 수수료 납부자의 주소와 서명을 제외한 나머지 부분에 대한 해시입니다. 더 자세한 내용은 [SenderTxHash](../../klaytn/design/transactions/README.md#sendertxhash)를 참고해주세요.

### 4.3 `feepayer_server.js` 확인 <a id="4-3-check-feepayer_server-js"></a>

트랜잭션 수수료 납부자의 서버를 구동중인 콘솔에서 아래와 같은 출력을 확인할 수 있습니다. Klaytn에서의 트랜잭션 영수증을 출력하는 것이에요.

```text
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

### 4.4  Klaytnscope <a id="4-4-klaytn-scope"></a>

위 트랜잭션은 [Klaytnscope](https://baobab.scope.klaytn.com)에서도 확인할 수 있습니다.

위의 예제는 이 트랜잭션의 타입이`TxTypeFeeDelegatedValueTransfer`이고 `Fee payer` \(트랜잭션 수수료 납부자\)의 주소가 `0x2645ba5be42ffee907ca8e9d88f6ee6dad8c1410`, 즉 `feepayerAddress`에 입력된 주소임을 나타냅니다. 이때 `From`은 `Fee payer`와는 다른 주소로, 위 예제에서의 <0>senderAddress</0>임을 확인할 수 있습니다.

![트랜잭션 수수료가 위임된 트랜잭션](./img/fee-delegation-example.png)

