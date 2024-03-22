# web3.js

![](/img/references/klaytn-web3js.png)

[web3.js](https://web3js.readthedocs.io/) là một thư viện JavaScript cho phép các nhà phát triển tương tác với các mạng chuỗi khối tương tích với EVM như Klaytn. Với các tính năng hỗ trợ của Klaytn dành cho [Sự tương đương với Ethereum](https://medium.com/klaytn/using-ethereum-tools-in-klaytn-dc068d48de04), các công cụ của Ethereum như web3.js có thể được dùng trên Klaytn mà không cần thực hiện những sửa đổi đáng kể.

Do đó, các nhà phát triển có thể tận dụng tính tương thích này và dùng thư viện web3.js để tương tác với một nút Klaytn.

Trong hướng dẫn này, bạn sẽ tìm hiểu cách để dùng thư viện web3.js để gửi một giao dịch, đọc dữ liệu từ chuỗi khối và tương tác với một hợp đồng cõ sẵn trên Mạng Klaytn.

## Điều kiện tiên quyết

- Trình biên tập mã: một trình biên tập mã nguồn như [VS-Code](https://code.visualstudio.com/download).
- [Metamask](../../build/tutorials/connecting-metamask#install-metamask): được dùng để triển khai hợp đồng, ký giao dịch và tương tác với hợp đồng.
- Điểm cuối RPC: bạn có thể nhận từ một trong những [Nhà cung cấp điểm cuối](../service-providers/public-en.md) được hỗ trợ.
- KLAY thử nghiệm từ [Vòi](https://baobab.wallet.klaytn.foundation/faucet): nạp tiền vào tài khoản với một lượng KLAY vừa đủ.
- [NodeJS và NPM](https://nodejs.org/en/)

## Thiết lập dự án

Để bắt đầu, bạn cần tạo một thư mục dự án để chứa các tập tin được tạo trong hướng dẫn này.

```bash
mkdir web3-js
cd web3-js
```

### Cài đặt web3.js

Để cài đặt web3.js, hãy chạy lệnh sau trong giao diện dòng lệnh:

```bash
npm install web3
```

### Khởi động web3.js

Trong phần hướng dẫn này, chúng ta sẽ tạo một số tập tin mã lập trình để gửi giao dịch, đọc dữ liệu từ chuỗi khối và tương tác với một hợp đồng thông minh có sẵn. Để bắt đầu, bạn cần biết cách để khởi động web3.js cho từng tập tin mã lập trình.

Nhập `web3` vào tập tin mã lập trình.

```js
const { Web3 } = require('web3');
```

Sau khi nhập web3 thành công, bạn cần kết nối với Klaytn bằng cách khởi tạo một đối tượng web3.js với một URL PRC của mạng lưới Klaytn. Thêm mã dưới đây vào mã đã có sẵn:

```js
const url = "RPC URL"  
const web3 = new Web3(url);
```

Ngoài ra, bạn cần thêm vào khóa riêng tư của mình để ký các giao dịch. Add the code below to the existing code:

```js
const privateKey = "Paste private key";
```

## Thêm mã dưới đây vào mã đã có sẵn:

Để đọc dữ liệu từ chuỗi khối, hãy tạo một tập tin `read.js` trong thư mục dự án bằng cách chạy lệnh sau:

```bash
touch read.js
```

Sau khi tạo tập tin này, hãy khởi động `web3` như đã thực hiện trong phần `khởi động`. Trong phần này, bạn sẽ tìm hiểu cách đọc dữ liệu từ chuỗi khối (ví dụ như blockNumber, số dư KLAY).

Để xem hành động này, hãy dán mã sau vào `read.js`.

```js
const { Web3 } = require('web3');

const url = "RPC URL"
const web3 = new Web3(url);

async function getLatestBlock() {
    const latestBlock = await web3.eth.getBlockNumber();
    console.log(latestBlock.toString());
}

async function getKlayBalance() {
    const klayBalance  = await web3.eth.getBalance("Paste wallet address");
    const formatBalance = await web3.utils.fromWei(klayBalance, 'ether');
    console.log(`You have ${formatBalance} KLAY`);
}

// call the following functions
getLatestBlock();
getKlayBalance();

```

**Kết quả đầu ra**

Để chạy mã lập trình và đọc dữ liệu từ chuỗi khối, bạn có thể chạy lệnh sau trong giao diện dòng lệnh:

```bash
node read.js
```

Nếu giao dịch thành công, bạn sẽ thấy số khối và số dư KLAY của người dùng được ghi lại trong giao diện dòng lệnh của mình.

## Để gửi giao dịch đến chuỗi khối

Để gửi giao dịch đến chuỗi khối, hãy tạo một tập tin `send.js` mới trong thư mục dự án bằng cách chạy lệnh sau:

```bash
touch send.js
```

Sau khi tạo tập tin này, hãy khởi động `web3` như đã thực hiện trong phần `khởi động`. Trong phần này, bạn sẽ tìm hiểu cách để gửi một giao dịch đến chuỗi khối, ví dụ như gửi KLAY đến một địa chỉ.

Để xem hành động này, hãy dán mã sau vào `send.js`.

```js
const { Web3 } = require('web3');

const url = "RPC URL";
const web3 = new Web3(url);

const senderPrivateKey = "Paste private key";
const senderAddr = "Paste sender address";
const recipientAddr = "Paste recipient address";

async function sendTx() {
    const tx = await web3.eth.accounts.signTransaction({
        from: senderAddr,
        to: recipientAddr,
        value: 90000000000,
        maxFeePerGas: 250000000000,
        maxPriorityFeePerGas: 250000000000,
        gas: 21000,
    }, privateKey);

    const receipt = await web3.eth.sendSignedTransaction(tx.rawTransaction);
    console.log(receipt);
}

// call function
sendTx();
```

**Kết quả đầu ra**

Để chạy mã lập trình và gửi dữ liệu đến chuỗi khối, bạn có thể chạy lệnh sau trong giao diện dòng lệnh:

```js
node send.js
```

Nếu giao dịch thành công, bạn sẽ thấy biên lai giao dịch được ghi lại trong giao diện dòng lệnh của mình.

![](/img/references/send-web3.png)

## Tương tác với hợp đồng thông minh

Để tương tác với một hợp đồng thông minh có sẵn trên Klaytn, hãy tạo một tập tin `interact.js` trong thư mục dự án bằng cách chạy lệnh sau:

```bash
touch interact.js
```

Sau khi tạo tập tin này, hãy khởi động `web3` như đã thực hiện trong phần `khởi động`. Trong phần này, bạn sẽ dùng web3.js để tương tác với một hợp đồng thông minh trên Klaytn bằng cách khởi tạo một đối tượng `Contract` bằng ABI và địa chỉ của một hợp đồng đã triển khai.

Vì mục đích của hướng dẫn này, một hợp đồng lưu trữ đơn giản đã được lập và triển khai trên [Remix IDE](../../build/tutorials/connecting-remix.md). Chúng ta sẽ gửi một giao dịch đến hợp đồng bằng cách gọi hàm `store` và đọc dữ liệu từ đó bằng cách gọi hàm `retrieve`.

Để xem hành động này, hãy dán mã sau vào `interact.js`.

```js
const { Web3 } = require('web3');

const url = "RPC URL"  
const web3 = new Web3(url);

const privateKey = "Paste private key";

// replace with your contract ABI
const abi = [
    {
        "inputs": [],
        "name": "retrieve",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "num",
                "type": "uint256"
            }
        ],
        "name": "store",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]
    
    // replace with your contract address
    const contractAddress = "0x472a1226796b6a0918DC78d40b87d750881fdbDC"
    
    const contract = new web3.eth.Contract(abi, contractAddress);
    
    // Can replace `10` with any value you want to store
    const storeTx = contract.methods.store(10);
    
    // send transaction to smart contract
    // modify contract
    async function setValue() {
        
     // Sign Tx with private key
    const createTransaction = await web3.eth.accounts.signTransaction(
        {
          to: contractAddress,
          data: storeTx.encodeABI(),
          gas: await storeTx.estimateGas(),
          maxFeePerGas: 250000000000,
          maxPriorityFeePerGas: 250000000000,
        },
        privateKey
      );
    
      // Send Tx and Wait for Receipt
      const createReceipt = await web3.eth.sendSignedTransaction(createTransaction.rawTransaction);
      console.log(`Tx hash: ${createReceipt.transactionHash}`);

      }

      // read contract data
      async function retrieveValue() {
        // read from contract
        const tx = await contract.methods.retrieve().call();
        console.log(tx);
      }
      
      // call functions
      setValue();
      retrieveValue();

```

**Kết quả đầu ra**

Để chạy mã lập trình và tương tác với hợp đồng thông minh, bạn có thể chạy lệnh sau trong giao diện dòng lệnh:

```bash
node interact.js
```

Nếu giao dịch thành công, trong giao diện dòng lệnh của mình, bạn sẽ thấy hàm băm của giao dịch và giá trị được lưu trữ.

Để được hướng dẫn sâu hơn về web3.js, vui lòng tham khảo [tài liệu về web3.js](https://web3js.readthedocs.io/). Also, you can find the full implementation of the code for this guide on [GitHub](https://github.com/klaytn/examples/tree/main/tools/sdk-and-libraries-for-interacting-with-klaytn-node/web3-js)
