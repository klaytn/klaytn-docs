# Fee Delegation Example

## 目次 <a href="#table-of-contents" id="table-of-contents"></a>

* [1. はじめに](fee-delegation-example.md#1-introduction)
* [2. 手数料委任の仕組み](fee-delegation-example.md#2-how-fee-delegation-works)
  * 2.1 送信者によるトランザクション署名
  * 2.2 手数料支払者による取引署名
* [3. シンプルなサーバーと手数料の委任のためのクライアント](fee-delegation-example.md#3-simple-server-and-client-for-fee-delegation)
  * 3.1 Senderのクライアント
  * 3.2 手数料支払者のサーバー
* [4. サンプルを実行](fee-delegation-example.md#4-run-example)
  * 4.1 `feepayer_server.js を実行します`
  * 4.2 Run `sender_client.js`
  * 4.3 `feepayer_server.js をチェック`
  * 4.4 Klaytn スコープ

## 1. はじめに <a href="#1-introduction" id="1-introduction"></a>

このチュートリアルでは、caver-js SDKを使用して、単純なサーバークライアントの例を作成して、Klaytnで手数料委任された値転送トランザクションがどのように機能するかを説明するのに役立ちます。 このチュートリアルとサンプルコードは Baobab testnet を使用します。

## 2. 手数料委任の仕組み <a href="#2-how-fee-delegation-works" id="2-how-fee-delegation-works"></a>

手数料委任の仕組みを詳しく見てみましょう。

### 2.1 送信者によるトランザクション署名 <a href="#2-1-transaction-signing-by-the-sender" id="2-1-transaction-signing-by-the-sender"></a>

`Sender` はトランザクションを送信する前に常にトランザクションに署名する必要があります。

トランザクションに署名するには、 [signTransaction](../sdk/caver-js/v1.4.1/api-references/caver.klay.accounts.md#signtransaction) を使用して、与えられた秘密鍵を持つトランザクションに署名します。

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

エラーがなければ、 `senderRawTransaction` は `senderPrivateKey` によって署名された署名されたトランザクションを持ちます。

次に、 `senderRawTransaction` を手数料支払い者に送信する必要があります。 これを実現するには様々な方法があります。 このチュートリアルでは、 `senderRawTransaction` を手数料支払者に送信する例として、シンプルなサーバークライアントコードを提供します。

### 2.2 手数料支払者による取引署名 <a href="#2-2-transaction-signing-by-the-fee-payer" id="2-2-transaction-signing-by-the-fee-payer"></a>

When `fee payer` receives the `senderRawTransaction`, `fee payer` signs the `senderRawTransaction` again with their private key and sends the transaction to Klaytn. 以下のコードスニペットはプロセスを示しています。 `klay.sendTransaction` メソッドはトランザクションを送信する前に、指定された口座の秘密鍵でトランザクションに署名します。 コードを実行する前に、 `"FEEPAYER_ADDRESS"` と `"PRIVATE_KEY"` を実際の値に置き換えてください。

Note that when the `fee payer` submits the transaction to Klaytn on behalf of the `sender`, the `senderRawTransaction` type must be a `FEE_DELEATED` type of transaction. 以下の例では、 [sendTransaction(FEE\_DELEGATED\_VALUE\_TRANSFER)](../sdk/caver-js/v1.4.1/api-references/caver.klay/sendtx\_value\_transfer.md#sendtransaction-fee\_delegated\_value\_transfer) メソッドが呼び出されます。送信者によって生成された `senderRawTransaction` が [TxTypeFeeDelegatedValueTransfer](../../klaytn/design/transactions/fee-delegation.md#txtypefeedelegatedvaluetransfer) であったためです。

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
.on('error', console.error); // ガス漏れの場合、2番目のパラメータはレシートです。
```

## 3. シンプルなサーバーと手数料の委任のためのクライアント <a href="#3-simple-server-and-client-for-fee-delegation" id="3-simple-server-and-client-for-fee-delegation"></a>

上記の手数料委託コードを使ってシンプルなサーバーとクライアントを書いてみましょう。

### 3.1 環境のセットアップ <a href="#3-1-environment-setup" id="3-1-environment-setup"></a>

以下のように、 `npm` と [caver-js](../sdk/caver-js/v1.4.1/getting-started\_1.4.1.md) を使用して環境をセットアップします。

```
$ mkdir example
$ cd example
$ npm init
$ npm install caver-js@latest
```

### 3.1 Senderのクライアント <a href="#3-1-sender-s-client" id="3-1-sender-s-client"></a>

まず、 `sender_client.js` を以下のように書きます。

例では、 `"SENDER_ADDRESS"`, `"SENDER_PRIVATEKEY"` と `"TO_ADDRESS"` を実際の値に置き換えてください。

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

### 3.2 手数料支払者のサーバー <a href="#3-2-fee-payer-s-server" id="3-2-fee-payer-s-server"></a>

では、手数料支払者のサーバー `feepayer_serverを書いてみましょう。 s <code> ,`は `senderRawTransaction` を `feePayerPrivateKey` で受信し、Baobab testnet に送信します。

以下の例では、 `"FEEPAYER_ADDRESS"` と `"FEEPAYER_PRIVATEKEY"` を実際の値に置き換えてください。

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

サーバーはポート `1337` をリッスンします。

受信する `データ`がある場合、 `データ` に `feePayerPrivateKey` で署名し、それを Klaytn ブロックチェーンに送信します。 `データ` が `sender_client.js` の `senderRawTransaction` であることを前提としています。

## 4. サンプルを実行 <a href="#4-run-example" id="4-run-example"></a>

`sender_client.js` と `feepayer_server.js` の 2 つの端末を準備します。

### 4.1 `feepayer_server.js を実行します` <a href="#4-1-run-feepayer_server-js" id="4-1-run-feepayer_server-js"></a>

コマンドの下に料金支払者のサーバーが起動します。

```
$ node feepayer_server.js
手数料委任サービス開始 ...
```

サーバーが起動し、現在ポート1337でリッスンしています。

### 4.2 Run `sender_client.js` <a href="#4-2-run-sender_client-js" id="4-2-run-sender_client-js"></a>

手数料委任トランザクションを送信するために、 `sender_client.js` を実行しましょう。

```
$ node sender_client.js
委任された手数料の転送トランザクションに署名しました。
手数料委任されたサービスに署名された取引を送信します。
手数料委任サービスに接続しました
サーバーからデータを受信しました: これは手数料委任サービスです
サーバーからデータを受信しました: 手数料支払者は0x2645BA5Be42FfEe907ca8e9d88f6Ee6dAd8c1410
サーバーからデータを受信しました: Txハッシュは0xd99086aa8188255d4ee885d9f1933b6c062085c1196731ba599b2fb8f2dbbbbd777です
サーバーからデータを受信しました: Sender Txハッシュは0xe1f630547f287177a0e92198b1c672
```

それは `送信者` の秘密鍵で取引に署名し、署名された取引を手数料委任サービスに送信します(i. 手数料支払者のサーバー Then it will receive the response from the fee delegate service including the `Fee payer` address, `Tx hash`, and `Sender Tx hash`. `Tx hash` is hash of a transaction submitted to the Klaytn network, while `Sender Tx hash` is hash of a transaction without the fee payer's address and signature. 詳細については、 [SenderTxHash](../../klaytn/design/transactions/#sendertxhash) をご覧ください。

### 4.3 `feepayer_server.js をチェック` <a href="#4-3-check-feepayer_server-js" id="4-3-check-feepayer_server-js"></a>

サーバーのコンソールには、以下の出力が表示されます。 それはKlaytnからの取引の領収書を印刷します。

```
$ node feepayer_server.js
手数料委任サービス開始 ...
クライアントが接続されています...
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

### 4.4 Klaytn スコープ <a href="#4-4-klaytn-scope" id="4-4-klaytn-scope"></a>

上記のトランザクションは [Klaytn scope](https://baobab.scope.klaytn.com) にも記載されています。

It shows that the transaction is `TxTypeFeeDelegatedValueTransfer` and `Fee payer` is `0x2645ba5be42ffee907ca8e9d88f6ee6dad8c1410` or `feepayerAddress` that you entered, while `From` is a different address which should be the `senderAddress` in above example.

![手数料（Tx）](../../bapp/tutorials/img/fee-delegation-example.png)
