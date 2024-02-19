# Gửi KLAY dành cho người mới bắt đầu

Để khởi động đơn giản, hãy cùng thử gửi đi một giao dịch. Trong ví dụ ngắn này, chúng ta sẽ tạo ra một lưu trữ khóa, kết nối với nút Klaytn, cũng như tạo ra một giao dịch - tất cả đều dùng caver-js!

Đừng lo lắng nếu đây là lần đầu tiên bạn dùng caver-js. Bạn chỉ cần làm theo các bước đơn giản dưới đây.

## Điều kiện tiên quyết

Trước tiên, hãy cài đặt các gói sau.

- [Node.js](https://nodejs.org/en/download/) phiên bản ([14.16.0](https://nodejs.org/dist/latest-v14.x/))
- [npm](https://www.npmjs.com/get-npm)
- [nvm](https://github.com/nvm-sh/nvm)
- [Trình biên dịch Solidity](https://solidity.readthedocs.io/en/develop/installing-solidity.html)

_Lưu ý:_ Nếu bạn nhận được lỗi `nvm: command not found` sau khi cài đặt nvm, hãy tham khảo [troubleshooting guide](https://github.com/nvm-sh/nvm/issues/2060).

## 1. Tạo một Tài khoản và Tải xuống Lưu trữ khóa <a id="1.-create-an-account-and-download-keystore"></a>

Cách đơn giản nhất để tạo một tài khoản và dùng [Bộ công cụ trực tuyến của Klaytn](https://toolkit.klaytn.foundation/misc/generateKeystore).

![Klaytn Online Toolkit](/img/references/keystore.png)

Hãy tải về tập tin lưu trữ khóa, và đổi thành một cái tên đơn giản hơn, ví dụ như `keystore.json`.

\*\*Bạn cần KLAY để gửi một giao dịch. \*\* Bạn có thể nhận KLAY thử nghiệm cho mạng thử nghiệm Baobab từ [Vòi](https://baobab.wallet.klaytn.foundation/faucet). Hãy tham khảo [Ví Klaytn](../../../build/tools/wallets/klaytn-wallet.md#how-to-receive-baobab-testnet-klay) để xem hướng dẫn chi tiết.

## 2. Khởi động dự án <a id="2.-initialize-project"></a>

Trước tiên, hãy tạo một thư mục cho dự án. Chúng ta sẽ đặt tên nó là `test` cho đơn giản. Điều hướng đến dòng lệnh và gõ:

```
mkdir test
```

Bây giờ, hãy điều hướng đến thư mục.

```
cd test
```

Chúng ta đang ở trong thư mục, tại đây ta sẽ tải về caver-js. Nhưng trước đó, ta sẽ phải kiểm tra phiên bản `node.js` vì ta cần dùng phiên bản 12 hoặc 14.

Bạn có thể kiểm tra phiên bản như sau:

```
node --version
```

Nếu phiên bản không phải là 12 hoặc 14, **hãy đảm bảo bạn sẽ thay phiên bản khác**. Ở đây, ta sẽ dùng phiên bản ([14.16.0](https://nodejs.org/dist/latest-v14.x/)). Hãy gõ `nvm use 14.16.0` để thay đổi phiên bản node.

Bây giờ, hãy khởi động dự án:

```
npm init
```

Vì chúng ta chỉ đang thử nghiệm đơn giản, bạn trả lời các câu hỏi thế nào cũng không quan trọng. Hãy cứ bấm `enter`.

```

package name: (test) 
version: (1.0.0) 
description: 
entry point: (index.js) 
test command: 
git repository: 
keywords: 
author: 
license: (ISC) 
About to write to /Users/terri.k/test/package.json:

{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}


Is this OK? (yes)
```

Ngoài ra, bạn có thể chỉ gõ lệnh dưới đây để bỏ qua việc nhấn `enter`:

```
npm init -y
```

## 3. Tải xuống caver-js <a id="3.-download-caver-js"></a>

Và bây giờ, chúng ta đã sẵn sàng để cài đặt caver-js.

```
npm install caver-js
```

Ngoài ra, hãy thêm mô-đun dưới đây vào bởi vì chúng ta cần nó:

```
npm i read
```

## 4. Taọ tập tin thử nghiệm <a id="4.-create-test-file"></a>

Hãy cùng tạo một tập tin thử nghiệm tên là `testcaver.js` như sau:

```
touch testcaver.js
```

Chúng ta sẽ viết mã vào tập tin này để gửi một giao dịch nhằm chuyển KLAY.

## 5. Kết nối với Nút Klaytn <a id="5.-connect-to-klaytn-node"></a>

Vì chúng ta sẽ gửi một giao dịch đến mạng chuỗi khối, chúng ta cần kết nối với một nút Klaytn. Chúng ta sẽ dùng Baobab, mạng thử nghiệm của Klaytn.

Chúng ta sẽ nhập `caver-js` và mô-đun `read` và kết nối với một nút Klaytn trong mạng thử nghiệm Baobab như sau:

```javascript
const Caver = require('caver-js')
const read = require('read')
const caver = new Caver('https://public-en-baobab.klaytn.net/')
```

## 6. Cung cấp Lưu trữ khóa, Tạo Keyring và Thêm vào Ví Caver <a id="6.-add-keystore-create-keyring-and-add-to-caver-wallet"></a>

Bạn cần một tài khoản để tạo giao dịch trên chuỗi khối. Thông tin tài khoản đó được bao gồm trong lưu trữ khóa. Bằng cách dùng hàm `loadPassword()`, chúng ta có thể triển khai lời nhắc mật khẩu trên giao diện dòng lệnh. Hàm sẽ có dạng:

```
async function loadPassword() {
    return new Promise((resolve, reject)=> {
        read({ prompt: 'Password: ', silent: true }, function(er, password) {
            if(er) {
                reject(er)
                return
            }
            resolve(password)
        })

    })

}
```

Mật khẩu được nhập từ lời nhắc cùng với tập tin lưu trữ khóa có sẵn trong cùng thư mục sẽ được giải mã và lưu trữ thành `keyring`.

Sau đó, `keyring` sẽ được lưu trữ trong ví. Hãy thêm vào các dòng dưới đây:

```
async function sendKlay() {
// Read keystore json file
  const fs = require('fs')
	const keystore = fs.readFileSync('./keystore.json', 'utf8')
	const password = await loadPassword()

	// Decrypt keystore and create
	const keyring = caver.wallet.keyring.decrypt(keystore, password)
	console.log(keyring)

    // Add to caver.wallet
	caver.wallet.add(keyring)

	}
```

## 7. Gửi giao dịch <a id="7.-send-transaction"></a>

Giờ chũng ta sẽ tạo một giao dịch để chuyển một ít KLAY. Loại giao dịch này được gọi là "giao dịch chuyển giá trị". Hãy cùng phân tích từng tham số.

Địa chỉ `from` sẽ được lấy từ lưu trữ khóa mà chúng ta đã tải lên. Địa chỉ `to` là bên nhận KLAY, và bạn có thể dùng địa chỉ bất kỳ. Đối với `value`, bạn có teher sử dụng luôn `caver.utils.toPeb()` để quy đổi KLAY thành peb. Ở đây, chúng ta sẽ gửi 10 KLAY. Đối với `gas`,

```
	
	// Create value transfer transaction
	const vt = caver.transaction.valueTransfer.create({
		from: keyring.address,
		to: '0x8084fed6b1847448c24692470fc3b2ed87f9eb47',
		value: caver.utils.toPeb(10, 'KLAY'),
		gas: 25000,
	})

	// Sign to the transaction
	const signed = await caver.wallet.sign(keyring.address, vt)

	// Send transaction to the Klaytn blockchain platform (Klaytn)
	const receipt = await caver.rpc.klay.sendRawTransaction(signed)
	console.log(receipt)
}
```

Đừng quên thêm vào dòng cuối cùng:

```
sendKlay()
```

## 8. Chạy mã <a id="8.-run-the-code"></a>

Hãy chạy mã mà chúng ta vừa viết:

```
node testcaver.js
```

![Type your password](/img/references/prompt.png)

Kết quả sẽ giống như sau:

```
SingleKeyring {
  _address: '0x658750eaa5d4db896d9ad0de79e00d551e0bf808',
  _key: PrivateKey {
    _privateKey: '0xea296e1bc67ba18a9ca87161c9e4fe486bb805ffff4f7a453f621a45e341e076'
  }
}
{
  blockHash: '0x0c29221072f049cf08ec2112755cbc0bc55289de5337faf2911147a4d8229693',
  blockNumber: '0x64e399d',
  contractAddress: null,
  effectiveGasPrice: '0x5d21dba00',
  from: '0x658750eaa5d4db896d9ad0de79e00d551e0bf808',
  gas: '0x61a8',
  gasPrice: '0xba43b7400',
  gasUsed: '0x5208',
  logs: [],
  logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  nonce: '0x0',
  senderTxHash: '0xdef371f3b194de1d6b6b678a3181e0e961549f2bc8f6391f97f48c8ea995225e',
  signatures: [
    {
      V: '0x7f6',
      R: '0x6425f98285f8e680a9cbfe32de824cceedd7fdca91ba9f7fa513898bc0d01ea8',
      S: '0x37718277df2a7a940212c9adb411f52d79d8cced784177c41224dca1a1ef122c'
    }
  ],
  status: '0x1',
  to: '0x7f1d6235b79688169fd6e15c4e8f540d6799dc75',
  transactionHash: '0xdef371f3b194de1d6b6b678a3181e0e961549f2bc8f6391f97f48c8ea995225e',
  transactionIndex: '0x2',
  type: 'TxTypeValueTransfer',
  typeInt: 8,
  value: '0x8ac7230489e80000'
}
```

Bạn có thể xem chi tiết giao dịch trong [Klaytnfinder](https://baobab.klaytnfinder.io/) hoặc [Klaytnscope](https://scope.klaytn.com) bằng cách dùng `transactionHash`.

## 9. Toàn bộ mã <a id="9.-run-the-code"></a>

```
const Caver = require('caver-js')
const read = require('read')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function sendKLAY() {
    // Read keystore json file
    	const fs = require('fs')
	const keystore = fs.readFileSync('./keystore.json', 'utf8')
	const password = await loadPassword()

	// Decrypt keystore and create
	const keyring = caver.wallet.keyring.decrypt(keystore, password)
	console.log(keyring)

    // Add to caver.wallet
	caver.wallet.add(keyring)

    // Create value transfer transaction
	const vt = caver.transaction.valueTransfer.create({
		from: keyring.address,
		to: '0x7f1D6235B79688169fd6e15C4E8f540d6799dC75',
		value: caver.utils.toPeb(10, 'KLAY'),
		gas: 25000,
	})

	// Sign to the transaction
	const signed = await caver.wallet.sign(keyring.address, vt)

	// Send transaction to the Klaytn blockchain platform (Klaytn)
	const receipt = await caver.rpc.klay.sendRawTransaction(signed)
	console.log(receipt)
}

async function loadPassword() {
    var read = require('read')

    return new Promise((resolve, reject)=> {
        read({ prompt: 'Password: ', silent: true }, function(er, password) {
            if(er) {
                reject(er)
                return
            }
            resolve(password)
        })

    })

}

sendKLAY()
```

Hi vọng bạn cảm thấy tự tin về việc gửi một giao dịch bằng caver-js. Nếu bạn gặp trục trặc hoặc có bất kỳ câu hỏi nào, hãy truy cập [Diễn đàn Klaytn](https://forum.klaytn.foundation/) để được trợ giúp.
