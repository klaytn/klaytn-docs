# ethers.js

![](/img/references/Klaytn-ether.js.png)

[ethers.js](https://docs.ethers.org/) là một thư viện JavaScript cho phép các nhà phát triển tương tác với các mạng chuỗi khối tương tích với EVM như Klaytn. Với các tính năng hỗ trợ của Klaytn dành cho [Sự tương đương với Ethereum](https://medium.com/klaytn/using-ethereum-tools-in-klaytn-dc068d48de04), các công cụ của Ethereum như ethers.js có thể được dùng trên Klaytn mà không cần thực hiện những sửa đổi đáng kể.

Do đó, các nhà phát triển có thể tận dụng tính tương thích này và dùng thư viện ethers.js để tương tác với một nút Klaytn.

Trong hướng dẫn này, bạn sẽ tìm hiểu cách để dùng thư viện ethers.js để gửi một giao dịch, đọc dữ liệu từ chuỗi khối và tương tác với một hợp đồng cõ sẵn trên Mạng Klaytn.


## Điều kiện tiên quyết

* Trình biên tập mã: một trình biên tập mã nguồn như [VS-Code](https://code.visualstudio.com/download).
* [Metamask](../../build/tutorials/connecting-metamask#install-metamask): được dùng để triển khai hợp đồng, ký giao dịch và tương tác với hợp đồng.
* Điểm cuối RPC: bạn có thể nhận từ một trong những [Nhà cung cấp điểm cuối](../service-providers/public-en.md) được hỗ trợ.
* KLAY thử nghiệm từ [Vòi](https://baobab.wallet.klaytn.foundation/faucet): nạp tiền vào tài khoản với một lượng KLAY vừa đủ.
* [NodeJS và NPM](https://nodejs.org/en/)


## Thiết lập dự án

Để bắt đầu, bạn cần tạo một thư mục dự án để chứa các tập tin được tạo trong hướng dẫn này.

```bash
mkdir ethers-js
cd ethers-js
```

### Cài đặt ethers.js

Để cài đặt ethers.js, hãy chạy lệnh sau trong giao diện dòng lệnh:

```bash
npm install --save ethers
```

### Khởi động ethers.js

Trong phần hướng dẫn này, chúng ta sẽ tạo một số tập tin mã lập trình để gửi giao dịch, đọc dữ liệu từ chuỗi khối và tương tác với một hợp đồng thông minh có sẵn. Để bắt đầu, bạn cần biết cách để khởi động ethers.js cho từng tập tin mã lập trình.


Nhập `ethers` vào tập tin mã lập trình.

```js
const ethers = require('ethers');
```


Sau khi nhập ethers thành công, bạn cần kết nối với Klaytn bằng cách khởi tạo một đối tượng ether.js mới `JsonRpcProvider` với một URL RPC của mạng lưới Klaytn. Thêm mã dưới đây vào mã đã có sẵn:

```js
const url = "RPC URL";
const provider = new ethers.JsonRpcProvider(url)
```
Ngoài ra, bạn cần thêm vào khóa riêng tư của mình để ký các giao dịch. Thêm mã dưới đây vào mã đã có sẵn:

```js
const privKey = "Paste Privatekey"
const signer = new ethers.Wallet(privKey, provider)
```

## Đọc dữ liệu từ chuỗi khối

Để đọc dữ liệu từ chuỗi khối, hãy tạo một tập tin `read.js` trong thư mục dự án bằng cách chạy lệnh sau:

```bash
touch read.js
```

Sau khi tạo tập tin này, hãy khởi động ethers như đã thực hiện trong phần `khởi động`. Trong phần này, bạn sẽ tìm hiểu cách đọc dữ liệu từ chuỗi khối (ví dụ như blockNumber, số dư KLAY).

Để xem hành động này, hãy dán mã sau vào `read.js`.


```js
async function getBlockNumber() {
    const blocknumber = await provider.getBlockNumber()
    console.log("blocknumber", blocknumber) 
}

async function getKlayBalance() {
    const klayBalance  = await provider.getBalance("paste wallet address")
    const formatBalance = ethers.formatEther(klayBalance)
    console.log(`You have ${formatBalance} KLAY`)
}

// call the functions below:
getBlockNumber()
getKlayBalance()

```

**Kết quả đầu ra**

Để chạy mã lập trình và đọc dữ liệu từ chuỗi khối, bạn có thể chạy lệnh sau trong giao diện dòng lệnh:

```bash
node read.js
```

Nếu giao dịch thành công, bạn sẽ thấy số khối và số tư KLAY của người dùng trong giao diện dòng lệnh của mình.


## Để gửi một giao dịch đến chuỗi khối

Để gửi một giao dịch đến chuỗi khối, hãy tạo một tập tin `send.js` mới trong thư mục dự án bằng cách chạy lệnh sau:

```bash
touch send.js
```

Sau khi tạo tập tin này, hãy khởi động ethers như đã thực hiện trong phần `khởi động`. Trong phần này, bạn sẽ tìm hiểu cách để gửi một giao dịch đến chuỗi khối (ví dụ như gửi KLAY đến một địa chỉ).

Để xem hành động này, hãy dán mã sau vào `send.js`.

```js
const ethers = require('ethers');

const url = "RPC URL";
const provider = new ethers.JsonRpcProvider(url)

const privKey = "Paste private key"
const signer = new ethers.Wallet(privKey, provider)

async function sendTx() {

    const tx = await signer.sendTransaction({
               to: "Paste recipient address",
               value: 90000000000,
               maxFeePerGas: 250000000000,
               maxPriorityFeePerGas: 250000000000,
               gasLimit: 21000,
           })

    const receipt = await tx.wait()
    console.log(receipt);

}

// call the function
sendTx();
```

**Kết quả đầu ra**

Để chạy mã lập trình và gửi dữ liệu đến chuỗi khối, bạn có thể chạy lệnh sau trong giao diện dòng lệnh:

```bash
node send.js
```

Nếu giao dịch thành công, bạn sẽ thấy biên lai giao dịch được ghi lại trong giao diện dòng lệnh của mình.

![](/img/references/send-ethers.png)

## Tương tác với hợp đồng thông minh

Để tương tác với một hợp đồng thông minh có sẵn trên Klaytn, hãy tạo một tập tin `interact.js` trong thư mục dự án bằng cách chạy lệnh sau:


```bash
touch interact.js
```

Sau khi tạo tập tin này, hãy khởi động ethers như đã thực hiện trong phần `khởi động`. Trong phần này, bạn sẽ dùng ethers.js để tương tác với một hợp đồng thông minh trên Klaytn bằng cách khởi tạo một đối tượng `Contract` bằng ABI và địa chỉ của một hợp đồng đã triển khai:

Vì mục đích của hướng dẫn này, một hợp đồng lưu trữ đơn giản đã được lập và triển khai trên [Remix IDE](../../build/tutorials/connecting-remix.md). Chúng ta sẽ gửi một giao dịch đến hợp đồng bằng cách gọi hàm `store` và đọc dữ liệu từ đó bằng cách gọi hàm `retrieve`.


Để xem hành động này, hãy dán mã sau vào `interact.js`.

```js
const ethers = require('ethers');

const url = "RPC URL";
const provider = new ethers.JsonRpcProvider(url)

const privKey = "Paste private key"
const signer = new ethers.Wallet(privKey, provider)

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
const contractAddress = "0x472a1226796b6a0918DC78d40b87d750881fdbDC";

// // For write-only contracts, provide a Signer object instead of a Provider object:

const contract = new ethers.Contract(contractAddress, abi, signer);


// send transaction to smart contract
// modify contract
async function setValue(value) {
    const tx = await contract.store(value);
    console.log(tx.hash);
}

// read contract data

async function retrieveValue() {
    const value = await contract.retrieve();
    console.log(value);
}

// call the following functions
setValue(value)
retrieveValue()
```


**Kết quả đầu ra**

Để chạy mã lập trình và tương tác với hợp đồng thông minh, bạn có thể chạy lệnh sau trong giao diện dòng lệnh:

```js
node interact.js
```

Nếu giao dịch thành công, trong giao diện dòng lệnh của mình, bạn sẽ thấy hàm băm của giao dịch và giá trị được lưu trữ.

Để được hướng dẫn sâu hơn về ethers.js, vui lòng tham khảo [tài liệu về ethers.js](https://docs.ethers.org/). Ngoài ra, bạn có thể tìm thấy cách triển khai mã đầy đủ cho hướng dẫn này trên [GitHub](https://github.com/klaytn/examples/tree/main/sdk-and-libraries-for-interacting-with-klaytn-node/ethers-js)