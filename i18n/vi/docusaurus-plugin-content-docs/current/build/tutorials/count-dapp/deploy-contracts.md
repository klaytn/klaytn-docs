# Triển khai hợp đồng thông minh

## 1. Sao chép Count DApp <a id="2-clone-count-dapp"></a>

### 1) Sao chép kho lưu trữ Count DApp <a id="1-clone-count-dapp-repository"></a>

```text
$ git clone https://github.com/klaytn/countbapp
```

### 2) Cài đặt & Chạy Count DApp <a id="2-install-run-count-dapp"></a>

Gói bạn vừa sao chép đã sẵn sàng khởi chạy mà không cần sửa đổi gì.

Hợp đồng mẫu đã được triển khai cho testnet Baobab và ABI hợp đồng đã bao gồm trong gói của chúng tôi.\
Mã giao diện của Count DApp ban đầu được định cấu hình để kết nối với hợp đồng thông minh trên testnet Baobab.

Nếu bạn muốn chạy ứng dụng ngay lập tức và xem ứng dụng hoạt động, hãy nhập bên dưới.

> Bạn NÊN tuân thủ môi trường thử nghiệm được đề cập ở trang đầu tiên.

```text
$ npm install
$ npm run local
```

⚠ Vui lòng kiểm tra quyền truy cập vào tập tin và thư mục nếu không thành công. Nếu bạn gặp lỗi '[Error: EACCES: permission denied](https://stackoverflow.com/questions/38323880/error-eacces-permission-denied)', lệnh `sudo chmod -R 755 /yourProjectDirectoryName` có thể hữu ích với bạn.

Ứng dụng sẽ bật lên ngay lập tức!

## 2. Soạn hợp đồng thông minh <a id="4-write-smart-contract"></a>

1. Background
2. Define the variable
3. Define functions
4. Let's do something more \
   4.1. Add a variable \ 4.2.
   4.2. Update functions

### 1) Hình nền <a id="1-background"></a>

Chúng ta sẽ tạo ra hợp đồng siêu đơn giản tên là "Count".

a. Chỉ có một biến lưu trữ gọi là `count`.\
b. Người dùng có thể tăng hoặc giảm biến `count` thêm 1. Vì thế, sẽ có 2 hàm, hàm `plus` tăng biến `count` thêm 1 và hàm `minus` giảm biến `count` đi 1. Thế là xong!

### 2) Định nghĩa biến <a id="2-define-the-variable"></a>

Trước khi đặt biến, chúng ta nên xác định phiên bản Solidity. Hãy sử dụng phiên bản ổn định 0.5.6.

```text
 solidity 0.5.6; // Specify solidity's version
```

Sau đó, chúng ta sẽ đặt tên hợp đồng là "Count".

```text
pragma solidity 0.5.6;

contract Count { // set contract names to "Count"

}
```

Chúng ta cần khai báo biến `count` là `uint` kiểu (số nguyên không dấu) và khởi tạo giá trị là 0.

```text
pragma solidity 0.5.6;

contract Count {
  uint public count = 0; // Declare count variable as uint type and initialize its value to 0.
}
```

### 3) Định nghĩa hàm <a id="3-define-functions"></a>

Chúng tôi cần hai hàm, `plus` và `minus`. Vai trò của mỗi hàm là:\
`plus` - tăng `count` thêm 1. (count = count + 1)\
`minus` - giảm `count` đi 1. (count = count - 1)

```text
pragma solidity 0.5.6;

contract Count {
  uint public count = 0;

  function plus() public { // Make a public function called 'plus'
    count = count + 1; // 'plus' function increases count variable by 1.
  }

  function minus() public { // Make a public function called 'plus'
    count = count - 1; // 'minus' function decreases count variable by 1.
  }
}
```

_LƯU Ý_\
Để cho phép hàm được gọi bên ngoài, hàm phải được khai báo `public`.

```text
function plus() public { … }
```

### 4) Let's do something more <a id="4-let-s-do-something-more"></a>

Chúng tôi muốn thêm một tính năng nữa. Việc nhớ địa chỉ ví của người tham gia gần đây nhất thì thế nào?

#### 4-1) Thêm biến <a id="4-1-add-a-variable"></a>

Vì vậy, chúng ta sẽ có một biến, `lastParticipant` có kiểu `address`:\
`address public lastParticipant;`›

```text
pragma solidity 0.5.6;

contract Count {
  uint public count = 0;
  address public lastParticipant;

  function plus() public { // Make a public function called 'plus'
    count = count + 1; // 'plus' function increases count variable by 1.
  }

  function minus() public { // Make a public function called 'plus'
    count = count - 1; // 'minus' function decreases count variable by 1.
  }
}
```

#### 4-2) Cập nhật hàm <a id="4-2-update-functions"></a>

Để theo dõi địa chỉ của người tham gia mới nhất, chúng tôi lưu địa chỉ vào `lastParticipant` như dưới đây:

```text
pragma solidity 0.5.6;

contract Count {
  uint public count = 0;
  address public lastParticipant;

  function plus() public {
    count = count + 1;
    lastParticipant = msg.sender; // store msg.sender to lastParticipant
  }

  function minus() public {
    count = count - 1;
    lastParticipant = msg.sender; // store msg.sender to lastParticipant
  }
}
```

_LƯU Ý_\
1\) `public` Nếu bạn khai báo biến hoặc hàm là `public`, bạn có thể truy cập từ bên ngoài blockchain, ví dụ: bạn có thể truy cập biến hoặc hàm này từ ứng dụng frontend của mình. Bạn có thể xem cách tương tác với phương pháp và biến public của hợp đồng từ ứng dụng frontend trong chương [Count componenent](code-overview/count-component.md).

2\) `msg.sender`\
`msg.sender` là địa chỉ khởi tạo giao dịch hiện tại.\
Để lấy được địa chỉ của người gửi giao dịch, chúng ta có thể sử dụng biến `msg.sender`.

```text
lastParticipant = msg.sender;
```

Dòng này sẽ làm cho `lastParticipant` có giá trị `msg.sender`.

## 3. Triển khai hợp đồng

1. cấu hình truffle
2. Thiết lập Triển khai
3. Triển khai

### 1) truffle configuration <a href="#1-truffle-configuration" id="1-truffle-configuration"></a>

Tập tin `truffle-config.js` mô tả cách triển khai mã hợp đồng. Bạn có thể định cấu hình các mục dưới đây trong truffle-config.js

**1) Ai sẽ triển khai hợp đồng (Tài khoản Klaytn nào sẽ triển khai hợp đồng)?**\
**2) Bạn sẽ triển khai mạng lưới nào?**\\
**3) Bạn sẵn sàng trả bao nhiêu phí gas để triển khai hợp đồng?**

Có 2 phương pháp triển khai hợp đồng, đầu tiên là dùng`khóa riêng tư`, cách thứ hai là dùng `tài khoản không bị khóa`.

#### PHƯƠNG THỨC TRIỂN KHAI 1: Bằng khóa riêng tư <a href="#deploy-method-1-by-private-key" id="deploy-method-1-by-private-key"></a>

_CẢNH BÁO: Bạn không nên để lộ khóa riêng tư của mình. Nếu không tài khoản của bạn sẽ bị xâm nhập._

Nếu bạn muốn triển khai hợp đồng của mình bằng khóa riêng, cần có tùy chọn `nhà cung cấp`.

1\) Chuyển khóa riêng tư của bạn thành đối số đầu tiên của `new HDWalletProvider()`.\
2\) Chuyển URL của nút Klaytn thành đối số thứ 2 của `new HDWalletProvider()`.

ví dụ)

```javascript
{
 ...,
 provider: new HDWalletProvider(
   'YOUR PRIVATE KEY',
   'https://public-en-baobab.klaytn.net', // If you're running full node you can set your node's rpc url.
  ),
 ...
}
```

```javascript
const HDWalletProvider = require("truffle-hdwallet-provider-klaytn");

const NETWORK_ID = '1001'
const GASLIMIT = '8500000'

/**
 * We extracted `URL`, `PRIVATE_KEY` as const variable to set value easily.
 * Set your private key and klaytn node's URL in here.
 */
const URL = `https://public-en-baobab.klaytn.net`
const PRIVATE_KEY = '0x48f5a77dbf13b436ae0325ae91efd084430d2da1123a8c273d7df5009248f90c'

module.exports = {
  networks: {
    /**
     * DEPLOY METHOD 1: By private key.
     * You shouldn't expose your private key. Otherwise, your account would be hacked!!
     */
    baobab: {
      provider: () => new HDWalletProvider(PRIVATE_KEY, URL),
      network_id: NETWORK_ID,
      gas: GASLIMIT,
      gasPrice: null,
    },
  },
}
```

Xem thuộc tính `networks` ở mã trên. Nó có khóa `baobab` gồm 4 thuộc tính, `provider`, `network_id`, `gas`, `gasPrice`.

Dòng `provider: new HDWalletProvider(PRIVATE_KEY, URL)` thông báo tài khoản người triển khai hợp đồng và URL nút mạng lưới đích.

Dòng `network_id: NETWORK_ID` chỉ ra mạng lưới trong Klaytn. Sử dụng `1001` đối với mạng lưới Baobab (testnet).

Dòng `gas: GASLIMIT` cho biết giới hạn gas bạn sẽ phải chịu để triển khai hợp đồng.

Dòng `gasPrice: null` cho truffle biết bạn trả giá bao nhiêu cho mỗi đơn vị gas. Hiện tại trong Klaytn, giá đang được cố định là `25000000000`. Nếu bạn đặt về `null`, truffle sẽ tự động đặt giá trị với giá gas cố định.

#### PHƯƠNG THỨC TRIỂN KHAI 2: Bằng cách mở khóa tài khoản (khó) <a href="#deploy-method-2-by-unlocked-account-difficult" id="deploy-method-2-by-unlocked-account-difficult"></a>

Để triển khai một hợp đồng bằng cách mở khóa tài khoản, bạn nên có nút hoàn thiện Klaytn.\
Truy cập bảng điều khiển nút Klaytn bằng cách gõ `$ klay attach http://localhost:8551` Nếu không có tài khoản Klaytn trong nút, hãy tạo bằng cách gõ `personal.newAccount()` trên bảng điều khiển.\
Nếu bạn đã có tài khoản, hãy mở khóa tài khoản qua `personal.unlockAccount()`.

Sau khi đảm bảo tài khoản đã được mở khóa,\
bạn nên đặt thuộc tính `host`, `port`, `network_id`, and `from`. 1) Mạng lưới sẽ triển khai (`host`, `port`, `network_id`)\
2\) Ai sẽ triển khai (`from`) 3) Bạn sẽ trả bao nhiêu phí gas để triển khai hợp đồng của mình (`gas`)

Đặt địa chỉ tài khoản đã mở khóa của bạn trên `from`. Nếu bạn đang chạy nút hoàn thiện Klaytn của riêng mình, hãy đặt máy chủ của nút là `host` và cổng của nút là `port`.

ví dụ)

```javascript
{
  host: 'localhost',
  port: 8551,
  from: '0xd0122fc8df283027b6285cc889f5aa624eac1d23',
  network_id: NETWORK_ID,
  gas: GASLIMIT,
  gasPrice: null,
}
```

### 2. Thiết lập triển khai (Bạn muốn triển khai hợp đồng nào?) <a href="#2-deploy-setup-which-contract-do-you-want-to-deploy" id="2-deploy-setup-which-contract-do-you-want-to-deploy"></a>

`migrations/2_deploy_contracts.js`:

```javascript
const Count = artifacts.require('./Count.sol')
const fs = require('fs')

module.exports = function (deployer) {
  deployer.deploy(Count)
    .then(() => {
    // Record recently deployed contract address to 'deployedAddress' file.
    if (Count._json) {
      // Save abi file to deployedABI.
      fs.writeFile(
        'deployedABI',
        JSON.stringify(Count._json.abi, 2),
        (err) => {
          if (err) throw err
          console.log(`The abi of ${Count._json.contractName} is recorded on deployedABI file`)
        })
    }

    fs.writeFile(
      'deployedAddress',
      Count.address,
      (err) => {
        if (err) throw err
        console.log(`The deployed contract address * ${Count.address} * is recorded on deployedAddress file`)
    })
  })
}
```

Bạn có thể chỉ định mã hợp đồng nào sẽ triển khai trong thư mục `contracts/`.\
Trước tiên, bạn hãy nhập tập tin hợp đồng của mình (`Count.sol`) vào tập tin này qua `const Count = artifacts.require('./Count.sol')`\
Sử dụng `deployer` để triển khai hợp đồng, qua `deployer.deploy(Count)`.\
Nếu bạn muốn chạy một số logic sau khi triển khai hợp đồng của mình, hãy sử dụng `.then()`.\
Chúng tôi muốn lưu trữ hợp đồng ABI và địa chỉ được triển khai trong các tập tin. Mô đun `fs` node.js được dùng cho việc này. (`fs.writeFile(filename, content, callback)`)\
Thông qua quá trình xử lý sau này, chúng tôi lưu địa chỉ hợp đồng và ABI thành `deployedABI` và `deployedAddress` trong thư mục.\
Để biết thêm thông tin về `artifacts.`, hãy truy cập trang tài liệu truffle, [https://trufflesuite.com/docs/truffle/getting-started/running-migrations#artifacts-require-](https://trufflesuite.com/docs/truffle/getting-started/running-migrations#artifacts-require-).

### 3. Triển khai <a href="#3-deploy" id="3-deploy"></a>

Bạn cần KLAY triển khai một hợp đồng. Bạn có thể nhận testnet KLAY tại vòi.

- Trong ví Klaytn, [https://baobab.wallet.klaytn.foundation/faucet](https://baobab.wallet.klaytn.foundation/faucet), có vòi cung cấp 150 KLAY cho mỗi 86400 khối trong testnet Klaytn Baobab. Sau khi tạo tài khoản Klaytn, hãy mở vòi để nhận 150 KLAY.

![deploy](/img/build/tutorials/tutorial-3deploy.gif)

Gõ `$ truffle deploy --network baobab`.\
Hợp đồng của bạn sẽ được triển khai theo các cấu hình xác định trong `truffle-config.js` và `migrations/2_deploy_contracts.js`.

cf) `--reset` option\
Sau khi triển khai hợp đồng, sẽ không có gì xảy ra nếu bạn gõ `$ truffle deploy --network baobab` một lần nữa.\
Vì truffle chỉ triển khai hợp đồng khi có thay đổi trong hợp đồng, nếu không truffle sẽ không làm gì cả.\ Nếu vẫn muốn triển khai lại hợp đồng của mình, bạn có tùy chọn `--reset`.\
Nếu bạn đưa ra tùy chọn này, truffle sẽ triển khai hợp đồng ngay cả khi nội dung của hợp đồng không thay đổi.\ ex) `$ truffle deploy --reset --network baobab`

Để tóm tắt lại,

- `truffle-config.js` định cấu hình `target network`, `deployer tài khoản` và `gas limit`.
- `migrations/2_deploy_contracts.js` định cấu hình `contract` to deploy.
- `target network`: Chúng ta triển khai hợp đồng đến nút `https://public-en-baobab.klaytn.net`.
- `deployer tài khoản`: '0xd0122fc8df283027b6285cc889f5aa624eac1d23' sẽ triển khai hợp đồng này.
- `gas limit`: Chúng ta có thể chịu phí ga tối đa '20000000' để triển khai hợp đồng.
- `contract`: Chúng ta sẽ triển khai hợp đồng Count.

Từ kết quả đầu ra của cửa số lệnh, bạn có thể xem triển khai có thành công không và tìm được địa chỉ đã triển khai.

## 4. Chạy ứng dụng

![run](/img/build/tutorials/tutorial-4run-app.gif)

Chạy ứng dụng
type `$ npm run local`
