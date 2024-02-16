# Bắt đầu

## Điều kiện tiên quyết <a id="prerequisites"></a>

### Phần phụ thuộc <a id="dependencies"></a>

Cần có các gói sau đây để dùng thư viện caver-js.

- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm)
- [gcc-c++](https://gcc.gnu.org/)
- [Trình biên dịch Solidity](https://solidity.readthedocs.io/en/develop/installing-solidity.html)

**Lưu ý** caver-js có thể chạy trên Node.js phiên bản 8 và 10, và các phiên bản được khuyên dùng là:

- lts/carbon ([8.16.0](https://nodejs.org/dist/latest-v8.x/))
- lts/dubnium ([10.16.0](https://nodejs.org/dist/latest-v10.x/))

Nếu bạn đã dùng một phiên bản khác của Node (ví dụ như Node v12), hãy dùng Trình quản lý phiên bản Node([VNM](https://github.com/nvm-sh/nvm)) để cài đặt và sử dụng phiên bản được caver-js hỗ trợ.

### Cài đặt <a id="installation"></a>

Để thử dùng, hãy cài đặt caver-js với npm bằng cách dùng lệnh sau:

```text
$ npm install caver-js
```

**Lưu ý**: tập tin `package.json` phải tồn tại trên cùng một đường dẫn cài đặt. Nếu nó không tồn tại, `package.json` phải được tạo qua `npm init`.

Để cài đặt một phiên bản caver-js cụ thể, hãy thử lệnh sau:

```text
$ npm install caver-js@X.X.X
```

## Bắt đầu với caver-js <a id="starting-with-caver-js"></a>

Khi đã cài xong caver-js, bạn có thể kết nối caver-js với một Nút Klaytn.

Bạn có thể nhập mô-đun caver-js và kết nối nó với một Nút Klaytn trong mạng thử nghiệm Baobab như trong ví dụ dưới đây:

```text
$ node
> const Caver = require('caver-js')
> const caver = new Caver('https://public-en-baobab.klaytn.net/')
```

Nếu bạn đang chạy một EN, bạn có thể kết nối nó với nút của riêng mình bằng cách thay đổi máy chủ và cổng như dưới đây:

```text
$ node
> const Caver = require('caver-js')
> const caver = new Caver('https://your.en.url:8651/')
```

## Quản lý tài khoản <a id="managing-accounts"></a>

### Tạo một tài khoản <a id="creating-an-account"></a>

Bạn có thể dùng `caver-js` để tạo một tài khoản như dưới đây. Bạn cũng có thể tạo một tài khoản qua [Ví Klaytn](../../../build/tools/wallets/klaytn-wallet.md#create-a-new-account).

```text
> const account = caver.klay.accounts.create()

> account
{ address: '0x3bd32d55e64d6cbe54bec4f5200e678ee8d1a990',
  privateKey: '0x{private key}',
  ... }
```

**Lưu ý**: Các hàm liên quan đến \[caver.klay.tài khoảns]\[] không có tác dụng đối với mạng lưới Klaytn thật.

### Thêm tài khoản vào caver-js <a id="add-accounts-to-caver-js"></a>

Bạn có thể dễ dàng dùng tài khoản của mình bằng cách sử dụng ví trong bôn nhớ mà caver-js cung cấp. Các ví dụ dưới đây minh họa cách để thêm một tài khoản vào ví bằng một đối tượng tài khoản và một tập tin lưu trữ khóa được tạo bởi Ví Klaytn.

```text
// Using an account object
> caver.klay.accounts.wallet.add(caver.klay.accounts.create())
{ 
    address: '0xebec0df19ed2f8b4070dec94d55a69077c544403',
    privateKey: '0x{private key}',
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey],
    index: 0 
}

// Using a keystore file.
> const decryptedAccount = caver.klay.accounts.decrypt({
        "version": 3,
        "id": "7c05d545-85ce-46c9-b6e9-9110d6597931",
        "address": "0x460406d822b5908504353deabc890e0de61eb42b",
        "crypto": {
            "ciphertext": "d2a84b99312215ca2d8ea43b251dc94fd55c3fc4a0c283538ef114d20251bf4a",
            "cipherparams": {
                "iv": "21b4298e33b8a61549f6abbecbd4d347"
            },
            "cipher": "aes-128-ctr",
            "kdf": "scrypt",
            "kdfparams": {
                "dklen": 32,
                "salt": "6c7a1618ee5525b10ddbcf0f0879214200984f583faf55af5dd2a7a0b7a58fd6",
                "n": 4096,
                "r": 8,
                "p": 1
            },
            "mac": "99e4c25ac8acf1571d4161f2c40db92a391aefd42ec871e23601a7af446432a7"
        }
    }, 'password')
> caver.klay.accounts.wallet.add(decryptedAccount)
{ 
    address: '0x460406d822b5908504353deabc890e0de61eb42b',
    privateKey: '0x{private key}',
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey] 
}
```

Tài khoản thêm vào ví caver-js có thể được dùng cho `sendTransaction`.

## Gửi giao dịch <a id="sending-a-transaction"></a>

Phần này sẽ hướng dẫn bạn các để gửi KLAY bằng caver-js trên mạng Baobab.

### Nhận KLAY qua Vòi Baobab <a id="getting-klay-via-baobab-faucet"></a>

Nếu bạn cần KLAY để thử nghiệm, bạn có thể nhận KLAY dùng trong mạng thử nghiệm Baobab từ [Ví Klaytn](../../../build/tools/wallets/klaytn-wallet.md#how-to-receive-baobab-testnet-klay). Hãy đăng nhập vào Ví Wallet bằng khóa riêng tư hoặc tập tin lưu trữ khóa, và nhận KLAY dùng cho mạng thử nghiệm Baobab qua vòi để thử nghiệm.

### Gửi một giao dịch chuyển giá trị <a id="sending-a-value-transfer-transaction"></a>

Bạn có thể sử dụng ví caver-js để tạo chữ ký của giao dịch. Nếu bạn có một tài khoản trong ví caver-js, việc tạo chữ ký sẽ được thực hiện bằng khóa riêng tư bên trong ví caver-js khi bạn thực thi `caver.klay.sendTransaction`. Lưu ý rằng `caver.klay.sendTransaction` thực hiể cả việc tạo chữ ký và gửi giao dịch cùng một lúc.

```text
// If you have not added an account to caver-js's wallet, add it to your wallet by running 'caver.klay.accounts.wallet.add'.
// If the same account is already in the wallet, 'Error: Account exists with {hex in address}' is returned. In this case, you can use the address string in the `from` field to reference the account in the wallet.

> const account = caver.klay.accounts.wallet.add('0x{private key}')

> caver.klay.sendTransaction({
    type: 'VALUE_TRANSFER',
    from: account.address',
    to: '0xeF5cd886C7f8d85fbe8023291761341aCBb4DA01',
    gas: '300000',
    value: 1,
  }).then(console.log)
{ 
    blockHash: '0x5e9f427c9550a6f7575bcf60aba9257634884519a6273a23e8eefee2a696cce4',
    blockNumber: 3841096,
    contractAddress: null,
    from: '0x3bd32d55e64d6cbe54bec4f5200e678ee8d1a990',
    ...
    status: true,
    to: '0xef5cd886c7f8d85fbe8023291761341acbb4da01',
    transactionHash: '0xb09f6d26734074a259f6cbe4d509d2bf40f6f0a4559081354527ae211dd9d00f',
    transactionIndex: 1,
    type: 'TxTypeValueTransfer',
    typeInt: 8,
    value: '0x1' 
}
```

Nếu bạn muốn tạo một chữ ký trực tiếp từ khóa riêng tư mà không dùng đến ví caver-js, bạn cần thực hiện các bước sau đây:

1. `caver.klay.tài khoảns.signTransaction` - Quy tình ký một giao dịch bằng khóa riêng tư và nhận một giao dịch mã hóa RLP.
2. `caver.klay.sendSignedTransaction` - gửi giao dịch mã hóa RLP đến nút kết nối với caver-js.

Trước tiên, để ký giao dịch, hãy chỉ định người gửi, người nhận và khóa riêng tư sao cho phù hợp như được hiển thị dưới đây:

**Lưu ý:** Người gửi phải có đủ lượng KLAY.

```text
> caver.klay.accounts.signTransaction({
    type: 'VALUE_TRANSFER',
    from: '0x71959675eeb7c7ec1e0c74f206a9c488d7f178d4',
    to: '0xeF5cd886C7f8d85fbe8023291761341aCBb4DA01',
    gas: '300000',
    value: caver.utils.toPeb('1', 'KLAY'),
  }, '0x{private key}').then((result)=>{
      rawTransaction = result.rawTransaction
  })
```

Bạn có thể nhận một giao dịch mã hóa RLP (`rawTransaction`) bằng \[caver.klay.tài khoảns.signTransaction]\[] như trên, và dùng nó để chuyển giao dịch đến mạng lưới Klaytn như dưới đây.

```text
> caver.klay.sendSignedTransaction(rawTransaction).on('transactionHash', console.log)
0xac418c96f7386a3343d149eeb29e48e28905525dda2e5afe55b0661f9ab01aca
```

Như thể hiện trong ví dụ trên, bạn có thể gửi một yêu cầu và dùng lớp phát sinh sự kiện để nhận hàm băm của giao dịch đã gửi bằng cách gọi `.on('transactionHash', console.log)`.

### Kiểm tra biên lai <a id="checking-receipts"></a>

Bạn có thể dùng đối tượng promise hoặc lớp phát sinh sự kiện để nhận biên lai của giao dịch trước khi chuyển giao dịch đó đến [caver.klay.sendSignedTransaction](api/caver.klay/transaction/transaction.md#sendsignedtransaction) hoặc [caver.klay.sendTransaction](api/caver.klay/transaction/transaction.md#sendtransaction).

Ví dụ dưới đây cho thấy cách để nhận biên lai bằng đối tượng promise và lớp phát sinh sự kiện.

```text
// Using promise
> caver.klay.sendSignedTransaction(rawTransaction).then(console.log)
{ 
    blockHash: '0x6ccef34eb59fab927705d344f080f449b576c0626e4aa3e20f569feb8df6e283',
    blockNumber: 19097,
    contractAddress: null,
    from: '0x71959675eeb7c7ec1e0c74f206a9c488d7f178d4',
    ...
    status: true,
    to: '0xef5cd886c7f8d85fbe8023291761341acbb4da01',
    transactionHash: '0xac418c96f7386a3343d149eeb29e48e28905525dda2e5afe55b0661f9ab01aca',
    transactionIndex: 0,
    type: 'TxTypeValueTransfer',
    typeInt: 8,
    value: '0xde0b6b3a7640000' 
}

// Using event emitter
> caver.klay.sendSignedTransaction(rawTransaction).on('receipt', console.log)
{ 
    blockHash: '0x6ccef34eb59fab927705d344f080f449b576c0626e4aa3e20f569feb8df6e283',
    blockNumber: 19097,
    contractAddress: null,
    from: '0x71959675eeb7c7ec1e0c74f206a9c488d7f178d4',
    ...
    status: true,
    to: '0xef5cd886c7f8d85fbe8023291761341acbb4da01',
    transactionHash: '0xac418c96f7386a3343d149eeb29e48e28905525dda2e5afe55b0661f9ab01aca',
    transactionIndex: 0,
    type: 'TxTypeValueTransfer',
    typeInt: 8,
    value: '0xde0b6b3a7640000' 
}
```

Như mô tả trong ví dụ trên, bạn có thể nhận được kết quả của việc gửi giao dịch thông qua đối tượng promise hoặc lớp phát sinh sự kiện. Và ngoài ra, nếu bạn biết hàm băm của giao dịch, bạn có thể truy vấn biên lai của giao dịch bằng phương pháp gọi RPC [caver.klay.getTransactionReceipt][]. Ví dụ dưới đây cho thấy cách để lấy biên lai bằng cách gọi RPC [caver.klay.getTransactionReceipt][].

```text
> caver.klay.getTransactionReceipt('0xbad4dd6d80beda6c04d90f1db7e4179557ab48423d4f14295b33e38a9418e59f').then(console.log)
{ 
    blockHash: '0xd56ac90d552f924f228683f78854c0ffd9f29498f985892f726326a860378a53',
    blockNumber: 3827075,
    contractAddress: null,
    from: '0x3bd32d55e64d6cbe54bec4f5200e678ee8d1a990',
    gas: '0x493e0',
    gasPrice: '0x5d21dba00',
    gasUsed: 21000,
    logs: [],
    logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    nonce: '0x2',
    senderTxHash: '0xbad4dd6d80beda6c04d90f1db7e4179557ab48423d4f14295b33e38a9418e59f',
    signatures: [ 
        { 
            V: '0x7f5',
            R: '0x30222c5c4a16e9053492ab90b1555585f2f4da3712de9f3e1f9ca8ce952f4aeb',
            S: '0x621d65429322d3ed961ca04a00cf050ee85b35fa69aaa300a41bf483febdc91' 
        } 
    ],
    status: true,
    to: '0xef5cd886c7f8d85fbe8023291761341acbb4da01',
    transactionHash: '0xbad4dd6d80beda6c04d90f1db7e4179557ab48423d4f14295b33e38a9418e59f',
    transactionIndex: 2,
    type: 'TxTypeValueTransfer',
    typeInt: 8,
    value: '0xde0b6b3a7640000' 
}
```

Bạn có thể tìm thấy kết quả của giao dịch qua `trạng thái` của biên lai. Để xem mô ta chi tiết về các giá trị trả về, hãy tham khảo [getTransactionReceipt][]. Nếu một giao dịch thất bại, bạn có thể kiểm tra lỗi chi tiết tại `txError` của biên lai. Để biết thêm thông tin về `txError`, hãy xem \[txError: Thông tin chi tiết về các lỗi giao dịch]\[].

## Thực thi các loại giao dịch khác <a id="executing-other-transaction-types"></a>

Klaytn cung cấp nhiều loại giao dịch đa dạng để đẩy mạnh khả năng mở rộng và hiệu suất. Để biết thêm thông tin, hãy xem [Giao dịch](../../../learn/transactions/transactions.md). Mục này mô tả một số ví dụ khác nhau mà bạn có thể sử dụng với caver-js.

### Ủy thác phí <a id="fee-delegation"></a>

Klaytn cung cấp tính năng \[Ủy thác phí]\[]. Dưới đây là mã ví dụ.

Khi bạn là người gửi, hãy dùng mã dưới đây để tạo một đối tượng giao dịch mã hóa RLP:

```text
> caver.klay.accounts.signTransaction({
    type: 'FEE_DELEGATED_VALUE_TRANSFER',
    from: '0x3bd32d55e64d6cbe54bec4f5200e678ee8d1a990',
    to: '0xeF5cd886C7f8d85fbe8023291761341aCBb4DA01',
    gas: '300000',
    value: caver.utils.toPeb('1', 'KLAY'),
  }, '0x{private key}').then((ret)=>{rawTransaction = ret.rawTransaction})

> rawTransaction
'0x09f88d038505d21dba00830493e094ef5cd886c7f8d85fbe8023291761341acbb4da01880de0b6b3a7640000943bd32d55e64d6cbe54bec4f5200e678ee8d1a990f847f8458207f5a0a48374bbf227fbbdcb28f3360d0cc1f5e36922be409a3edd8b0c6fa5aa5c57dda07e15ebe1c9dd78d1c0f36a5f7970e578c2e57d9360cd25928674d1c05d7e161d80c4c3018080'
```

Với đối tượng giao dịch mã hóa RLP đã ký (`rawTransaction`), người trả phí có thể gửi giao dịch sau khi đính kèm chữ ký của mình. Người trả phí đặt `rawTransaction` thành senderRawTransaction và ký bằng địa chỉ của người trả phí như trong ví dụ dưới đây.

```text
// If you have not added a fee payer account to caver-js's wallet, add it to your wallet by running 'caver.klay.accounts.wallet.add'.
// If an account is already added to the wallet, 'Error: Account is existed with {hex in address}' is returned. In this case, please use the account's address instead of `feePayer.address`.
> const feePayer = caver.klay.accounts.wallet.add('0x{private key}')

> caver.klay.sendTransaction({
    senderRawTransaction: rawTransaction,
    feePayer: feePayer.address,
  }).then(console.log)
{ 
    blockHash: '0xf0c4ef717a674ffaea8bf68597c936ce8a3773dab1e1f6f42508963f124bc301',
    blockNumber: 3840725,
    ...
    transactionHash: '0x8d1fea7710bc351540257a4ae7f2274d66ddd7f62bcdb6f1f77893cecb659405',
    transactionIndex: 2,
    type: 'TxTypeFeeDelegatedValueTransfer',
    typeInt: 9,
    value: '0xde0b6b3a7640000' 
}
```

**LƯU Ý**: Tài khoản của người trả phí phải nằm trong ví caver-js.

### Cập nhật tài khoản <a id="account-update"></a>

Nếu bạn muốn thay đổi khóa của tài khoản, hãy gửi một giao dịch như dưới đây. Vui lòng xem \[Cập nhật tài khoản]\[] để biết trường giao dịch tương ứng theo loại khóa.

```text
// If you have not added an account to caver-js's wallet, add it to your wallet by running 'caver.klay.accounts.wallet.add'.
// If the same account is already in the wallet, 'Error: Account exists with {hex in address}' is returned. In this case, you can use the address string in the `from` field to reference the account in the wallet.
> const account = caver.klay.accounts.wallet.add('0x{private key}')

> caver.klay.sendTransaction({
    type: 'ACCOUNT_UPDATE',
    from: account.address,
    publicKey:  '0x9016de15ebb219b1e8bc732070df93a28903e5799d0cd24a807a5afabf4601f7e5ab312b5a682dd8c0e72e71e67552174d5082cde25db3626a5b025f97f8a005',
    gas: '300000',
}).then(console.log);
```

### Hợp đồng thông minh <a id="smart-contract"></a>

Gói [caver.klay.Contract][] giúp việc tương tác với hợp đồng thông minh trên Klaytn trở nên dễ dàng hơn. Nó tự động chuyển đổi tất cả các phương pháp của hợp đồng thông minh thành những cuộc gọi javascript khi ABI mức độ thấp (Giao diện nhị phân ứng dụng) được đưa ra. Điều này cho phép bạn tương tác với các hợp đồng thông minh như thể chúng là các đối tượng JavaScript.

Trước tiên, chúng ta bắt đầu bằng việc lập một hợp đồng thông minh để nhận chỉ thị biên dịch và ABI của nó.

```text
> solc --abi --bin --allow-paths . ./test.sol
======= ./test.sol:Count =======
Binary: 
60806040526000805534801561001457600080fd5b50610123806100246000396000f3fe6080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60df565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260e5565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060dd6004803603602081101560c857600080fd5b810190808035906020019092919050505060ed565b005b60005481565b600043905090565b806000819055505056fea165627a7a72305820e381897039d8e48bf74b4a096bb1c4ed02f331bd1a7a4add6217b72fa888f2f10029
Contract JSON ABI 
[{"constant":true,"inputs":[],"name":"count","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getBlockNumber","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_count","type":"uint256"}],"name":"setCount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
```

**LƯU Ý**: Để lập một hợp đồng thông minh, bạn phải cài đặt trước trình biên dịch solidity.

Đối với việc triển khai hợp đồng thông minh, bạn có thể dùng [caver.klay.Contract][] để triển khai, hoặc bạn có thể triên khai bằng cách sử dụng giao dịch [SMART\_CONTRACT\_DEPLOY][SMART_CONTRACT_DEPLOY]. Dưới đây là một ví dụ về việc sử dụng [caver.klay.Contract][].

Nếu phiên bản hợp đồng cụ thể được tạo ra, bạn có thể triển khai nó bằng cách đưa chỉ thị biên dịch vào trường `data` như dưới đây:

```text
// If you have not added an account to caver-js's wallet, add it to your wallet by running 'caver.klay.accounts.wallet.add'.
// If the same account is already in the wallet, 'Error: Account exists with {hex in address}' is returned. In this case, you can use the address string in the `from` field to reference the account in the wallet.
> const account = caver.klay.accounts.wallet.add('0x{private key}')

> contractInstance.deploy({
    data:  '60806040526000805534801561001457600080fd5b50610123806100246000396000f3fe6080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60df565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260e5565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060dd6004803603602081101560c857600080fd5b810190808035906020019092919050505060ed565b005b60005481565b600043905090565b806000819055505056fea165627a7a72305820e381897039d8e48bf74b4a096bb1c4ed02f331bd1a7a4add6217b72fa888f2f10029',
}).send({
    from: account.address,
    gas: '0x4bfd200',
    value: '0x0',
}).then(console.log)
{ 
    blockHash: '0x71426773ed65f307bdfac5070ac54f11f406086bbe8dfa170215ed4190f176ed',
    blockNumber: 226,
    codeFormat: '0x0',
    contractAddress: '0xC9f0b868e5103b6823171a2Df85E7B696660E466',
    from: '0x71959675eeb7c7ec1e0c74f206a9c488d7f178d4',
    gas: '0x4bfd200',
    gasPrice: '0x5d21dba00',
    gasUsed: 149017,
    humanReadable: false,
    input: '0x60806040526000805534801561001457600080fd5b50610123806100246000396000f3fe6080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60df565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260e5565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060dd6004803603602081101560c857600080fd5b810190808035906020019092919050505060ed565b005b60005481565b600043905090565b806000819055505056fea165627a7a72305820e381897039d8e48bf74b4a096bb1c4ed02f331bd1a7a4add6217b72fa888f2f10029',
    ...
    type: 'TxTypeSmartContractDeploy',
    typeInt: 40,
    value: '0x0',
    events: {} 
}
```

Bạn có thể tìm thấy địa chỉ hợp đồng đã triển khai tại `contractAddress` của biên lai giao dịch. Trước kh gửi một giao dịch triển khai hợp đồng thông minh, hãy đặt địa chỉ thành địa chỉ của phiên bản hợp đồng cụ thể như dưới đây:

```text
> contractInstance.options.address = '0xC9f0b868e5103b6823171a2Df85E7B696660E466'
'0xC9f0b868e5103b6823171a2Df85E7B696660E466'
```

Một cách để gọi một phương pháp cụ thể của hợp đồng thông minh là sử dụng nó với `caver.klay.Contract` hoặc dùng [SMART\_CONTRACT\_EXECUTION][SMART_CONTRACT_EXECUTION].

Để giao dịch với một hợp đồng thông minh:

```text
// If you have not added an account to caver-js's wallet, add it to your wallet by running 'caver.klay.accounts.wallet.add'.
// If the same account is already in the wallet, 'Error: Account exists with {hex in address}' is returned. In this case, you can use the address string in the `from` field to reference the account in the wallet.
> const account = caver.klay.accounts.wallet.add('0x{private key}')

> contractInstance.methods.setCount(1).send({from:account.address, gas:'0x4bfd200'}).then(console.log)
{ 
    blockHash: '0x159f8515102951bca9c403b2b1b37850ca01a08dffb9a763837f55a6d518bbb6',
    blockNumber: 644,
    contractAddress: null,
    from: '0x71959675eeb7c7ec1e0c74f206a9c488d7f178d4',
    gas: '0x4bfd200',
    gasPrice: '0x5d21dba00',
    gasUsed: 44875,
    input: '0xd14e62b80000000000000000000000000000000000000000000000000000000000000001',
    ...
    type: 'TxTypeSmartContractExecution',
    typeInt: 48,
    value: '0x0',
    events: {} 
}
```

Để gọi một hợp đồng thông minh:

```text
> contractInstance.methods.getBlockNumber().call().then(console.log)
2194
```

Xem [caver.klay.Contract][] để tìm hiểu chi tiết.

## Sử dụng nhiều loại AccountKey <a id="using-various-accountkey-types"></a>

caver-js mang đến nhiều lớp mới để hỗ trợ các loại [AccountKey][] khác nhau được nền tảng hỗ trợ.

Các ví dụ dưới đây mô tả ví dụ trong một tập tin Node.js. Để thực hành các ví dụ này, trước tiên, hãy tạo một tập tin thử nghiệm trong thư mục làm việc như sau.

```bash
$ touch test.js
```

Bạn có thể thấy tập tin `test.js` được tạo ra trong thư mục làm việc.

Viết mã sau trong test.js.

```javascript
// test.js file
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	const version = await caver.klay.getNodeInfo()
	console.log(version)
}

testFunction()
```

Lưu tập tin và chạy nó trong bảng điều khiển của bạn.

```bash
$ node ./test.js
```

Nếu bạn thấy kết quả đầu ra của console.log, hãy tiếp tục với các bước dưới đây.

**LƯU Ý** Các lớp trên được hỗ trợ kể từ caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

### Tài khoản <a id="account"></a>

Tài khoản là một lớp có chứa địa chỉ và khóa của một tài khoản. Một lớp Tài khoản có [AccountKey](#accountkey), có thể là loại [AccountKeyPublic](#accountkeypublic), [AccountKeyMultiSig](#accountkeymultisig), hoặc [AccountKeyRoleBased](#accountkeyrolebased).

Gói caver.klay.tài khoảns sử dụng [AccountKeyPublic](#accountkeypublic), theo mặc định sẽ chứa và quản lý chuỗi khóa riêng tư.

Ví dụ dưới đây tạo một tài khoản với AccountKeyPublic là tài khoảnKey.

```javascript
// test.js file
async function testFunction() {
	// Create random account with accountKeyPublic by default
	const account = caver.klay.accounts.create()
	printAccount(account)

    // Create account with specific private key string
    const privateKey = caver.klay.accounts.create().privateKey
    const accountFromKey = caver.klay.accounts.privateKeyToAccount(privateKey)
    printAccount(accountFromKey)
}

function printAccount(account) {
	console.log(`address: ${account.address}`)
	console.log(`privateKey: ${account.privateKey}`)
	console.log(`accountKeyType: ${account.accountKeyType}`)
	console.log(`accountKey`)
    console.log(account.accountKey)
	console.log(`account.keys: ${account.keys}`)
	console.log(`account.transactionKey: ${account.transactionKey}`)
	console.log(`account.updateKey: ${account.updateKey}`)
	console.log(`account.feePayerKey: ${account.feePayerKey}\n`)
}
```

printAccount ở trên cho thấy cách sử dụng các thuộc tính của đối tượng Tài khoản cụ thể. Các thuộc tính bên trong Tài khoản như sau.

| Tên thuộc tính   | Mô tả                                                                                                                                                                                                                                                                                                                      |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address          | Địa chỉ của tài khoản.                                                                                                                                                                                                                                                                                                     |
| privateKey       | Chuỗi khóa mặc định của tài khoảnKey mà tài khoản có. Thuộc tính này được để lại cho khả năng tương thích ngược. privateKey chỉ tương ứng với khóa mặc định của tài khoảnKey, do đó, bạn không nên sử dụng privateKey để ký hoặc gửi giao dịch. Bạn nên sử dụng transactionKey, updateKey hoặc feePayerKey trong ngữ cảnh. |
| tài khoảnKeyType | Loại tài khoảnKey mà tài khoản có. Đây có thể là `AccountKeyPublic`, `AccountKeyMultiSig` hoặc `AccountKeyRoleBased`                                                                                                                                                                                                       |
| tài khoảnKey     | Khóa của tài khoản. Đây có thể là AccountKeyPublic, AccountKeyMultiSig hoặc AccountKeyRoleBased.                                                                                                                                                                                                                           |
| keys             | Tất cả các khóa bên trong tài khoảnKey mà tài khoản có.                                                                                                                                                                                                                                                                    |
| transactionKey   | Khóa được sử dụng cho [RoleTransaction](../../../learn/accounts.md#roles). AccountKeyPublic hoặc AccountKeyMultiSig không bị ràng buộc với bất kỳ vai trò nào, do đó, transactionKey giữ giá trị giống như các khóa.                                                                                                       |
| updateKey        | Khóa được sử dụng cho [RoleAccountUpdate](../../../learn/accounts.md#roles). AccountKeyPublic hoặc AccountKeyMultiSig không bị ràng buộc với bất kỳ vai trò nào, vì vậy updateKey giữ giá trị giống như các khóa.                                                                                                          |
| feePayerKey      | Khóa được sử dụng cho [RoleFeePayer](../../../learn/accounts.md#roles). AccountKeyPublic hoặc AccountKeyMultiSig không bị ràng buộc với bất kỳ vai trò nào, do đó, feePayerKey giữ cùng một giá trị như các khóa.                                                                                                          |

**LƯU Ý** `transactionKey`, `updateKey` và `feePayerKey` trả về một chuỗi khóa riêng tư hoặc một mảng gồm nhiều chuỗi khóa riêng tư cần được dùng cho vai trò. Vì thế, thay vì dùng thuộc tính privateKey, bạn nên dùng `transactionKey`, `updateKey` và `feePayerKey` tùy tình huống phù hợp mà không phải lo lắng về loại tài khoảnKey.

Nội dung giải thích về các lớp AccountKey khác nhau được cung cấp trong phần [AccountKey](#accountkey).

### AccountKey  <a id="accountkey"></a>

AccountKey là một cấu trúc dữ liệu có chứa các khóa của một tài khoản. Một tài khoản có thể có một chuỗi khóa riêng tư hoặc nhiều chuỗi khóa riêng tư để sử dụng cho việc ký tên. Tài khoản cũng có thể quản lý các khỏa riêng tư bằng [roles](../../../learn/accounts.md#roles).

Để hỗ trợ cho cấu trúc này, caver-js giới thiệu các lớp mới gồm AccountKeyPublic, AccountKeyMultiSig và AccountKeyRoleBased.

Để tạo một AccountKey, hãy dùng `caver.klay.tài khoảns.createAccountKey`. Hàm này xác định AccountKey nào cần được tạo dựa theo loại của tham số. Nó sẽ tạo ra AccountKeyPublic nếu một chuỗi khóa riêng tư trở thành tham số, hoặc AccountKeyMultiSig nếu một mảng gồm nhiều chuỗi khóa riêng tư trở thành tham số. Và nếu có một đối tượng chứa khóa khác nhau cho từng vai trò, nó sẽ tạo ra AccountKeyRoleBased.

**LƯU Ý** Các lớp cho `AccountKey` được xác định trong caver-js là các cấu trúc dữ liệu có chứa khóa riêng tư để sử dụng trong caver-js. Nó có thể khác với khóa trong tài khoản của bạn trên mạng lưới Klaytn.

#### AccountKeyPublic  <a id="accountkeypublic"></a>

AccountKeyPublic là một lớp dùng để chứa và quản lý một chuỗi khóa riêng tư đơn lẻ.

Phần dưới đây mô tả cách để cập nhật tài khoản bằng AccountKeyPublic. Hãy viết mã dưới đây vào testFunction() và chạy mã.

```javascript
const privateKey = caver.klay.accounts.create().privateKey
const accountKey = caver.klay.accounts.createAccountKey(privateKey)

console.log(accountKey)
console.log(`type: ${accountKey.type}`)
console.log(`keys: ${accountKey.keys}`)
console.log(`transactionKey: ${accountKey.transactionKey}`)
console.log(`updateKey: ${accountKey.updateKey}`)
console.log(`feePayerKey: ${accountKey.feePayerKey}`)
```

AccountKeyPublic lưu trữ và quản lý một chuỗi khóa riêng tư, vì thế, nếu bạn chạy ví dụ trên, bạn sẽ thấy `keys`, `transactionKey`, `updateKey` và `feePayerKey` đều tương ứng với cùng một chuỗi khóa riêng tư.

Hãy xem ví dụ dưới đây về việc tạo một Tài khoản với AccountKeyPublic là tài khoảnKey của nó.

```javascript
const privateKey = caver.klay.accounts.create().privateKey
const accountKey = caver.klay.accounts.createAccountKey(privateKey)

const address = caver.klay.accounts.create().address

// Create an Account instance with a private key string
const accountFromStringKey = caver.klay.accounts.createWithAccountKey(address, privateKey)

// Create an Account instance with an AccountKeyPublic instance
const accountFromAccountKey = caver.klay.accounts.createWithAccountKey(address, accountKey)
```

#### AccountKeyMultiSig  <a id="accountkeymultisig"></a>

AccountKeyMultiSig là một lớp dùng để chứa và quản lý nhiều chuỗi khóa riêng tư.

Phần dưới đây mô tả cách để cập nhật tài khoản bằng AccountKeyMultiSig. Hãy viết mã dưới đây vào testFunction() và chạy mã.

```javascript
const privateKeyArray = [caver.klay.accounts.create().privateKey, caver.klay.accounts.create().privateKey, caver.klay.accounts.create().privateKey]
const accountKey = caver.klay.accounts.createAccountKey(privateKeyArray)

console.log(accountKey)
console.log(`type: ${accountKey.type}`)
console.log(`keys: ${accountKey.keys}`)
console.log(`transactionKey: ${accountKey.transactionKey}`)
console.log(`updateKey: ${accountKey.updateKey}`)
console.log(`feePayerKey: ${accountKey.feePayerKey}`)
```

AccountKeyMultiSig lưu trữ và quản lý các chuỗi khóa riêng tư, vì thế, nếu bạn chạy ví dụ trên, bạn sẽ thấy `keys`, `transactionKey`, `updateKey` và `feePayerKey` đều tương ứng với các chuỗi khóa riêng tư giống nhau.

Nếu bạn không chỉ định một khóa riêng tư (hoặc một mảng các chuỗi khóa riêng tư) để dùng khi ký một giao dịch, caver-js sẽ tìm một tài khoản từ ví trong bộ nhớ trùng khớp với `from` hoặc `fee payer` và dùng nó để ký. Trong trường hợp này, nếu tài khoản của bạn có nhiều khóa riêng tư, caver-js sẽ ký giao dịch bằng tất cả các khóa đó.

Hãy xem ví dụ dưới đây về việc tạo một Tài khoản với AccountKeyMultiSig là tài khoảnKey của nó.

```javascript
const privateKeyArray = [caver.klay.accounts.create().privateKey, caver.klay.accounts.create().privateKey]
const accountKey = caver.klay.accounts.createAccountKey(privateKeyArray)

const address = caver.klay.accounts.create().address

// Create Account instance with an array of private key strings
const accountFromStringKey = caver.klay.accounts.createWithAccountKey(address, privateKeyArray)

// Create Account instance with AccountKeyMultiSig instance
const accountFromAccountKey = caver.klay.accounts.createWithAccountKey(address, accountKey)
```

#### AccountKeyRoleBased  <a id="accountkeyrolebased"></a>

AccountKeyRoleBased là một lớp dùng để lưu trữ và quản lý các khóa cho từng vai trò. Từng vai trò có thể có một chuỗi khóa riêng tư hoặc nhiều chuỗi khóa riêng tư.

Phần dưới đây mô tả cách để cập nhật tài khoản bằng AccountKeyRoleBased. Hãy viết mã dưới đây vào testFunction() và chạy mã.

```javascript
const keyobject = {
    transactionKey: [caver.klay.accounts.create().privateKey, caver.klay.accounts.create().privateKey, caver.klay.accounts.create().privateKey],
    updateKey: caver.klay.accounts.create().privateKey,
    feePayerKey: [caver.klay.accounts.create().privateKey, caver.klay.accounts.create().privateKey, caver.klay.accounts.create().privateKey]
}
const accountKey = caver.klay.accounts.createAccountKey(keyobject)

console.log(accountKey)
console.log(`type: ${accountKey.type}`)
console.log(`keys:`)
console.log(accountKey.keys)
console.log(`transactionKey: ${accountKey.transactionKey}`)
console.log(`updateKey: ${accountKey.updateKey}`)
console.log(`feePayerKey: ${accountKey.feePayerKey}`)
```

AccountKeyRoleBased lưu trữ và quản lý các khóa theo vai trò, vì thế, nếu bạn chạy ví dụ trên, bạn sẽ thấy ba vai trò (transactionKey, updateKey, feePayerKey) được xác định trong thuộc tính `keys`. Vì thế, không như AccountKey khác ([AccountKeyPublic](#accountkeypublic) or [AccountKeyMultiSig](#accountkeymultisig)), từng transactionKey, updateKey và feePayerKey đều tương ứng với một khóa khác nhau.

Hãy xem ví dụ dưới đây về việc tạo một Tài khoản với AccountKeyRoleBased là tài khoảnKey của nó.

```javascript
const keyobject = {
    transactionKey: [caver.klay.accounts.create().privateKey, caver.klay.accounts.create().privateKey, caver.klay.accounts.create().privateKey],
    updateKey: caver.klay.accounts.create().privateKey,
    feePayerKey: [caver.klay.accounts.create().privateKey, caver.klay.accounts.create().privateKey, caver.klay.accounts.create().privateKey]
}
const accountKey = caver.klay.accounts.createAccountKey(keyobject)

const address = caver.klay.accounts.create().address

// Create Account instance with an object that defines key by role
const accountFromStringKey = caver.klay.accounts.createWithAccountKey(address, keyobject)

// Create Account instance with AccountKeyRoleBased instance
const accountFromAccountKey = caver.klay.accounts.createWithAccountKey(address, accountKey)
```

Qua các ví dụ trên, bạn sẽ thấy cách để dùng Tài khoản và các loại AccountKey khác nhau trong caver-js.

Hãy lưu ý rằng các ví dụ này không làm ảnh hưởng đến mạng lưới Klaytn. Nếu bạn muốn dùng tài khoản của mình với một loại khóa tài khoản cụ thể, ví dụ như AccountKeyPublic, AccountKeyMultiSig hoặc AccountKeyRoleBased, bạn phải gửi một giao dịch cập nhật tài khoản đến mạng lưới Klaytn.

[AccountFỏUpdate](#accountforupdate) sau đây giải thích cách để cập nhật tài khoản bằng cách gửi một giao dịch đến mạng lưới Klaytn.

### AccountForUpdate  <a id="accountforupdate"></a>

AccountForUpdate là một lớp được thiết kế để giúp việc cập nhật tài khoản bằng các giao dịch trở nên dễ dàng hơn.

AccountForUpdate chỉ chứa khóa công khai để dùng cho việc cập nhật tài khoản và địa chỉ của tài khoản cần cập nhật.

Các ví dụ dưới đây bắt đầu bằng việc cập nhật tài khoản bằng tài khoảnKey. Trong tài khoản phải có đủ KLAY để dùng khi thử nghiệm. KLAY thử nghiệm cho mạng Baobab có sẵn qua [Vòi Baobab](../../../build/tools/wallets/klaytn-wallet.md#how-to-receive-baobab-testnet-klay).

#### Tạo một AccountForUpdate  <a id="create-an-accountforupdate"></a>

Hãy bắt đầu bằng cách tạo một AccountForUpdate.

Bạn có thể tạo bằng cách gọi `createAccountForUpdate()` với địa chỉ tài khoản đích và khóa mới mà bạn muốn sử dụng.

```javascript
const account = caver.klay.accounts.create()

// AccountForUpdate with AccountKeyPublic
const privateKeyString = caver.klay.accounts.create().privateKey
const accountForUpdateForAccountKeyPublic = caver.klay.accounts.createAccountForUpdate(account.address, privateKeyString)

// AccountForUpdate with AccountKeyMultiSig
const privateKeyArray = [caver.klay.accounts.create().privateKey, caver.klay.accounts.create().privateKey]
const multiSigOptions = { threshold: 2, weight: [1, 1] }
const accountForUpdateForAccountKeyMultiSig = caver.klay.accounts.createAccountForUpdate(account.address, privateKeyArray, multiSigOptions)

// AccountForUpdate with AccountKeyRoleBased
const keyObject = {
    transactionKey: [caver.klay.accounts.create().privateKey, caver.klay.accounts.create().privateKey],
    updateKey: caver.klay.accounts.create().privateKey,
    feePayerKey: caver.klay.accounts.create().privateKey,
}
const roleBasedOptions = { transactionKey: { threshold: 2, weight: [1, 1] } }
const accountForUpdateForAccountKeyRoleBased = caver.klay.accounts.createAccountForUpdate(account.address, keyObject, roleBasedOptions)

// AccountForUpdate with LegacyKey
const accountForUpdateForLegacyKey = caver.klay.accounts.createAccountForUpdateWithLegacyKey(account.address)

// AccountForUpdate with FailKey
const accountForUpdateForFailKey = caver.klay.accounts.createAccountForUpdateWithFailKey(account.address)
```

**LƯU Ý** Nếu bạn muốn cập nhật với nhiều chuỗi khóa riêng tư, bạn phải xác định ngưỡng và trọng số trong đối tượng tùy chọn.

#### Cập nhật tài khoản với AccountForUpdate  <a id="account-update-with-accountforupdate"></a>

Bạn có thể dễ dàng tạo một giao dịch cập nhật tài khoản bằng AccountForUpdate vừa được tạo ở trên.

Có ba loại giao dịch dùng để cập nhật một tài khoản: `ACCOUNT_UPDATE`, `FEE_DELEGATED_ACCOUNT_UPDATE` và `FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO`.

Trong ví dụ bên dưới, `tài khoản` là một tài khoản có đủ số dư KLAY, và `tài khoảnForUpdate` là một đối tượng AccountForUpdate cụ thể có chứa khóa mới và địa chỉ tài khoản đích. `tài khoảnForUpdate được tạo ra bằng `caver.klay.tài khoảns.createAccountForUpdate\`.

Ví dụ dưới đây cho thấy cách để tạo một giao dịch bằng AccountForUpdate và gửi nó đến mạng lưới Klaytn.

```javascript
const updateTx = {
    type: 'ACCOUNT_UPDATE',
    from: account.address,
    key: accountForUpdate,
    gas: 300000,
}

// Sign transaction with updateKey of account
const signed = await caver.klay.accounts.signTransaction(updateTx, account.updateKey)

// Send account update transaction
const receipt = await caver.klay.sendSignedTransaction(signed)
console.log(receipt)

// Get accountKey from Klaytn network
const updatedKey = await caver.klay.getAccountKey(account.address)
console.log(updatedKey)
```

Nếu bạn muốn dùng giao dịch `FEE_DELEGATED_ACCOUNT_UPDATE`, hãy xem ví dụ dưới đây.

```javascript
const updateTx = {
    type: 'FEE_DELEGATED_ACCOUNT_UPDATE',
    from: account.address,
    key: accountForUpdate,
    gas: 300000,
}

// Sender signs transaction with updateKey of account
const senderSigned = await caver.klay.accounts.signTransaction(updateTx, account.updateKey)

// Fee payer signs transaction with feePayerKey of fee payer
const feePayerSigned = await caver.klay.accounts.feePayerSignTransaction(senderSigned.rawTransaction, feePayer.address, feePayer.feePayerKey)

// Send fee delegated account update transaction
const receipt = await caver.klay.sendSignedTransaction(feePayerSigned)
console.log(receipt)

// Get accountKey from Klaytn network
const updatedKey = await caver.klay.getAccountKey(account.address)
console.log(updatedKey)
```

**Lưu ý** `caver.klay.tài khoảns.feePayerSignTransaction` được hỗ trợ kể từ caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

Nếu bạn muốn dùng giao dịch `FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO`, hãy xác định `updateTx` trong ví dụ trên như sau:

```javascript
const updateTx = {
    type: 'FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO',
    from: account.address,
    key: accountForUpdate,
    gas: 300000,
    feeRatio: 30,
}
```

Nếu tài khoản của bạn đã được cập nhật thành công, khóa cũ sẽ không còn sử dụng được nữa. Cập nhật `tài khoảnKey` của tài khoản được lưu trữ trong caver-js như sau.

Khi trực tiếp cập nhật thuộc tính `tài khoảnKey` của một tài khoản, giá trị chỉ định phải là một đối tượng cụ thể của AccountKeyPublic, AccountKeyMultiSig hoặc AccountKeyRoleBased.

```javascript
const accountKey = caver.klay.accounts.createAccountKey(newKey)
account.accountKey = accountKey
```

Nếu tài khoản của bạn nằm trong ví trong bộ nhớ của caver-js, hãy cập nhật như sau.

```javascript
// Add account to in-memory wallet
caver.klay.accounts.wallet.add(account)

caver.klay.accounts.wallet.updateAccountKey(account.address, newKey)
```

Giờ bạn đã sẵn sàng sử dụng tài khoản được cập nhật trong caver-js.

## Gửi một giao dịch có nhiều người ký<a id="sending-a-transaction-with-multiple-signer"></a>

Nếu tài khoảnKey của tài khoản là AccountKeyMultiSig hoặc AccountKeyRoleBased, có thể có nhiều người khác nhau quản lý từng khóa.

Phần này mô tả cách để thu thập nhiều chữ ký và gửi giao dịch nếu có nhiều người ký.

### Ký tuần tự <a id="sequential-sign"></a>

Đối tượng kết quả của \[caver.klay.tài khoảns.signTransaction]\[] có một trường rawTransaction.

`rawTransaction` có một giao dịch mã hóa RLP chứa cả `signatures` và `feePayerSignatures`. `feePayerSignature` chỉ được đưa vào khi giao dịch là giao dịch có phí ủy thác.

Ví dụ sau đây cho thấy cách để tuần tự ký một giao dịch với nhiều khóa riêng tư.
Giả sử transactionKey của tài khoản có hai chuỗi khóa riêng tư.

```javascript
const tx = {
    type: 'VALUE_TRANSFER',
    from: account.address,
    to: caver.klay.accounts.create().address,
    value: 1,
    gas: 900000,
}

// Sign with transactionKey[0]
const user1Signed = await caver.klay.accounts.signTransaction(tx, account.transactionKey[0])

// Append sender's signatures with transactionKey[1]
const user2Signed = await caver.klay.accounts.signTransaction(user1Signed.rawTransaction, account.transactionKey[1])

const receipt = await caver.klay.sendSignedTransaction(user2Signed)
console.log(receipt)
```

Hãy xem ví dụ dưới đây để biết cách ký với khóa của người trả phí, loại khóa là AccountKeyRoleBased. Giả sử người trả phí có ba chuỗi khóa riêng tư trong feePayerKey.

```javascript
const tx = {
    type: 'FEE_DELEGATED_VALUE_TRANSFER',
    from: account.address,
    to: caver.klay.accounts.create().address,
    value: 1,
    gas: 900000,
}

// Sign with transactionKey[0] and transactionKey[1]
const userSigned = await caver.klay.accounts.signTransaction(tx, [account.transactionKey[0], account.transactionKey[1]])

// Fee payer signs transaction with feePayerKey[0]
const feePayer1Signed = await caver.klay.accounts.feePayerSignTransaction(userSigned.rawTransaction, feePayer.address, feePayer.feePayerKey[0])

// Append feePayerSignatures with feePayerKey[1] and feePayerKey[2]
const feePayer2Signed = await caver.klay.accounts.feePayerSignTransaction(feePayer1Signed.rawTransaction, feePayer.address, [feePayer.feePayerKey[1], feePayer.feePayerKey[2]])

const receipt = await caver.klay.sendSignedTransaction(feePayer2Signed)
console.log(receipt)
```

**Lưu ý** `caver.klay.tài khoảns.feePayerSignTransaction` được hỗ trợ kể từ caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

Nếu tài khoản mà bạn dùng đã tồn tại trong ví trong bộ nhớ của caver-js, bạn không cần phải dùng (các) khóa cho `signTransaction` hoặc `feePayerSignTransaction`. Xem ví dụ bên dưới.

```javascript
const tx = {
    type: 'FEE_DELEGATED_VALUE_TRANSFER_WITH_RATIO',
    from: account.address,
    to: caver.klay.accounts.create().address,
    value: 1,
    gas: 900000,
    feeRatio: 10,
}

// Sign with transactionKey[0] and transactionKey[1]
const userSigned = await caver.klay.accounts.signTransaction(tx)

// Fee payer signs transaction with feePayerKey[0], feePayerKey[1] and feePayerKey[2]
const feePayerSigned = await caver.klay.accounts.feePayerSignTransaction(userSigned.rawTransaction, feePayer.address)

const receipt = await caver.klay.sendSignedTransaction(feePayerSigned)
console.log(receipt)
```

### Kết hợp các chữ ký từ RawTransaction <a id="combine-signatures-from-rawtransaction"></a>

Nếu bạn nhận được đối tượng kết quả của `caver.klay.tài khoảns.signTransaction` hoặc `caver.klay.tài khoảns.feePayerSignTransaction` từ nhiều người, bạn có thể tạo một giao dịch mã hóa RLP duy nhất có chứa tất cả thông tin chữ ký.

Ví dụ dưới đây cho thấy cách để kết hợp và gửi các giao dịch mã hóa RLP.

```javascript
const tx = {
    type: 'FEE_DELEGATED_VALUE_TRANSFER',
    from: account.address,
    to: caver.klay.accounts.create().address,
    value: 1,
    gas: 900000,
}

// Sign with transactionKey[0]
const user1Signed = await caver.klay.accounts.signTransaction(tx, account.transactionKey[0])

// Sign with transactionKey[1]
const user2Signed = await caver.klay.accounts.signTransaction(tx, account.transactionKey[1])

// Fee payer signs transaction with feePayerKey[0]
const feePayer1Signed = await caver.klay.accounts.feePayerSignTransaction(tx, feePayer.address, feePayer.feePayerKey[0])

// Fee payer signs transaction with feePayerKey[1]
const feePayer2Signed = await caver.klay.accounts.feePayerSignTransaction(tx, feePayer.address, feePayer.feePayerKey[1])

// Fee payer signs transaction with feePayerKey[2]
const feePayer3Signed = await caver.klay.accounts.feePayerSignTransaction(tx, feePayer.address, feePayer.feePayerKey[2])

const rawTransactionArray = [user1Signed.rawTransaction, user2Signed.rawTransaction, feePayer1Signed.rawTransaction, feePayer2Signed.rawTransaction, feePayer3Signed.rawTransaction]
const combined = await caver.klay.accounts.combineSignatures(rawTransactionArray)

const receipt = await caver.klay.sendSignedTransaction(combined)
console.log(receipt)
```

**Lưu ý** `caver.klay.tài khoảns.combineSignatures` được hỗ trợ kể từ caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

### Gửi đối tượng giao dịch bằng Signatures và FeePayerSignatures <a id="send-transaction-object-with-signatures-and-feepayersignatures"></a>

Nếu bạn chỉ nhận được `signatures` hoặc `feePayerSignatures` từ nhiều người ký, bạn có thể gửi một giao dịch như dưới đây:

```javascript
const tx = {
    type: 'FEE_DELEGATED_VALUE_TRANSFER_WITH_RATIO',
    from: account.address,
    to: caver.klay.accounts.create().address,
    value: 1,
    gas: 900000,
    feeRatio: 10,
}

// Sign with transactionKey[0] and transactionKey[1]
const { signatures } = await caver.klay.accounts.signTransaction(tx)

// Fee payer signs transaction with feePayerKey[0], feePayerKey[1] and feePayerKey[2]
const { feePayerSignatures } = await caver.klay.accounts.feePayerSignTransaction(tx, feePayer.address)

// Fill in the missing information in the tx object.
tx.signatures = signatures
tx.feePayer = feePayer.address
tx.feePayerSignatures = feePayerSignatures

const receipt = await caver.klay.sendSignedTransaction(tx)
console.log(receipt)
```

Bạn cũng có thể gọi `caver.klay.tài khoảns.getRawTransactionWithSignatures` để nhận một giao dịch mã hóa RLP có chứa các chữ ký và feePayerSignatures của đối tượng giao dịch.

```javascript
const tx = {
    type: 'FEE_DELEGATED_VALUE_TRANSFER_WITH_RATIO',
    from: account.address,
    to: caver.klay.accounts.create().address,
    value: 1,
    gas: 900000,
    feeRatio: 10,
}

// Sign with transactionKey[0] and transactionKey[1]
const { signatures } = await caver.klay.accounts.signTransaction(tx)

// Fee payer signs transaction with feePayerKey[0], feePayerKey[1] and feePayerKey[2]
const { feePayerSignatures } = await caver.klay.accounts.feePayerSignTransaction(tx, feePayer.address)

// Fill in the missing information in the tx object.
tx.signatures = signatures
tx.feePayer = feePayer.address
tx.feePayerSignatures = feePayerSignatures

const { rawTransaction } = await caver.klay.accounts.getRawTransactionWithSignatures(tx)
console.log(rawTransaction)
```

**Lưu ý** `caver.klay.tài khoảns.getRawTransactionWithSignatures` được hỗ trợ kể từ caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

## Dự án mẫu <a id="sample-projects"></a>

Bạn có thể tìm thấy các dự án mẫu để phát triển dApp (Ứng dụng phi tập trung) dùng canver-js dưới đây:

- [Count DApp](../../../build/tutorials/count-dapp/count-dapp.md)
- [Klaystagram](../../../build/tutorials/klaystagram/klaystagram.md)

## Liên kết <a id="links"></a>

- caver-js [Kho GitHub](https://github.com/klaytn/caver-js)
- caver-js trên [npm](https://www.npmjs.com/package/caver-js)

[caver.klay.Contract]: api/caver.klay.Contract.md

[caver.klay.accounts]: api/caver.klay.accounts.md

[caver.klay.accounts.signTransaction]: api/caver.klay.accounts.md#signtransaction

[caver.klay.getTransactionReceipt]: api/caver.klay/transaction/transaction.md#gettransactionreceipt

[getTransactionReceipt]: api/caver.klay/transaction/transaction.md#gettransactionreceipt

[txError: Detailed Information of Transaction Failures]: ../../transaction-error-codes.md

[Fee Delegation]: ../../../learn/transactions/transactions.md#fee-delegation

[AccountKey]: ../../../learn/accounts.md#account-key

[Account Update]: api/caver.klay/transaction/sendtx-account-update.md

[SMART_CONTRACT_DEPLOY]: api/caver.klay/transaction/sendtx-smart-contract-deploy.md

[SMART_CONTRACT_EXECUTION]: api/caver.klay/transaction/sendtx-smart-contract-execution.md
