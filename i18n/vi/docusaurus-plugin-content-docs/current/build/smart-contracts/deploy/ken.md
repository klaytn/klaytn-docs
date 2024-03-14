# Triển khai hợp đồng thông minh sử dụng KEN

![](/img/build/get-started/klaytnXken.png)

Trước khi bắt đầu, hãy làm quen với một số thuật ngữ riêng của Klaytn.

- **Nút điểm cuối (EN)**: Nút xử lý các yêu cầu API JSON-RPC gửi đến mạng lưới Klaytn. Nút điểm cuối không tham gia vào thuật toán đồng thuận.
- **KLAY**: đồng tiền mặc định của Klaytn.
- **caver-js**: Triển khai JavaScript của API JSON-RPC của Klaytn.
- **Baobab**: mạng thử nghiệm của Klaytn
- **Cypress**: mạng chính thức của Klaytn

Hướng dẫn từng bước này sẽ hỗ trợ bạn trong quá trình khởi chạy Nút điểm cuối (EN) của mạng thử nghiệm Baobab và xây dựng hợp đồng thông minh cơ bản bằng tài khoản mới của bạn. Hướng dẫn này bao gồm hai phần, thiết lập một EN và triển khai một hợp đồng thông mình qua EN của bạn.

> Hướng dẫn này sử dụng mạng thử nghiệm **Baobab** bởi vì việc triển khai hợp đồng thông minh và gửi giao dịch sẽ cần đến phí giao dịch tính bằng KLAY. Vì mục đích phát triển, bạn có thể nhận KLAY cho mạng thử nghiệm từ [vòi Baobab](https://baobab.wallet.klaytn.foundation/faucet).

## Khởi chạy nút điểm cuối <a href="#launch-an-en" id="launch-an-en"></a>

### Tải xuống và khởi chạy nút điểm cuối (EN) <a href="#download-and-initialize-an-endpoint-node-en" id="download-and-initialize-an-endpoint-node-en"></a>

Giải nén [gói nhị phân ken](../../../nodes/downloads/downloads.md#get-the-packages) và sao chép các tập tin vào thư mục klaytn.
**Lưu ý**: Hãy tải về gói phù hợp có tên bắt đầu bằng `ken`.

**Lưu ý**: Hãy tải về gói phù hợp có tên bắt đầu bằng `ken`.

Đối với người dùng Mac, hãy giải nén tập tin đã tải về bằng lệnh sau.

```bash
$ tar zxf ken-baobab-vX.X.X-X-darwin-amd64.tar.gz
$ export PATH=$PATH:$PWD/ken-darwin-amd64/bin
```

Đối với người dùng Linux, hãy giải nén tập tin đã tải về bằng lệnh sau.

```bash
$ tar zxf ken-baobab-vX.X.X-X-linux-amd64.tar.gz
$ export PATH=$PATH:$PWD/ken-linux-amd64/bin
```

Bạn nên tạo một thư mục dữ liệu để lưu trữ dữ liệu chuỗi khối. Trong phần hướng dẫn này, chúng ta sẽ tạo một thư mục `kend_home` trong thư mục chính.

```bash
$ mkdir -p ~/kend_home
```

### Cấu hình EN <a href="#configuring-the-en" id="configuring-the-en"></a>

Tập tin cấu hình, `kend.conf`, trong `ken-xxxxx-amd64/conf/`. Để biết thêm thông tin về các tham số có thể định cấu hình, bạn có thể xem phần [Hướng dẫn cấu hình EN](../../../misc/operation/configuration.md). Để khởi chạy một EN của mạng thử nghiệm Baobab, hãy cập nhật tập tin `kend.conf` phù hợp như sau.

```
# cypress, baobab is only available if you don't specify NETWORK_ID.
NETWORK="baobab"
# if you specify NETWORK_ID, a private network is created.
NETWORK_ID=
...
RPC_API="klay,net" # net module should be opened for truffle later on.
...
DATA_DIR=~/kend_home
```

### Khởi chạy EN <a href="#launching-the-en" id="launching-the-en"></a>

Để khởi chạy EN, hãy thực thi lệnh sau.

```bash
$ kend start
 Starting kend: OK
```

### Kiểm tra EN <a href="#checking-the-en" id="checking-the-en"></a>

Để kiểm tra xem EN có đang chạy hay không, hãy thực thi lệnh sau.

```bash
$ kend status
kend is running
```

### Kiểm tra bản ghi của EN <a href="#checking-the-log-of-the-en" id="checking-the-log-of-the-en"></a>

Để kiểm tra bản ghi của EN, hãy thực thi lệnh sau.

```bash
$ tail -f ~/kend_home/logs/kend.out
...
INFO[03/26,15:37:49 +09] [5] Imported new chain segment                blocks=1    txs=0  mgas=0.000  elapsed=2.135ms   mgasps=0.000    number=71340 hash=f15511…c571da cache=155.56kB
...
```

### Khắc phục sự cố <a href="#troubleshooting" id="troubleshooting"></a>

Xem phần mục [Khắc phục sự cố](../../../misc/operation/troubleshooting.md) nếu bạn gặp vấn đề trong việc khởi chạy Nút điểm cuối Klaytn.

## Nạp tiền vào tài khoản <a id="top-up-your-account"></a>

### Kết nối với Bảng điều khiển <a id="attaching-to-the-console"></a>

Nút điểm cuối Klaytn đi kèm bảng điều khiển JavaScript. Từ dòng lệnh của bảng điều khiển, bạn có thể khởi tạo một phần của các lệnh gọi ra API Klaytn đến EN của mình. Để đính kèm vào bảng điều khiển JavaScript, hãy thực thi lệnh sau.

```bash
$ ken attach ~/kend_home/klay.ipc
Welcome to the Klaytn JavaScript console

!instance: Klaytn/vX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/kend_home
 modules: admin:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0
 
 >
```

**LƯU Ý**: Bạn phải đợi đến khi đã tải về tất cả các khối. Nhập `klay.blockNumber` vào bảng điều khiển và kiểm tra xem nó có khớp với số khối hiện tại hay không [tại đây](https://baobab.scope.klaytn.com/)

**LƯU Ý**: Gõ `klay` hoặc`personal` để nhận danh sách các hàm có sẵn.

### Tạo tài khoản Klaytn mới <a id="creating-a-new-klaytn-account"></a>

Để tạo một tài khoản Klaytn mới từ bảng điều khiển JavaScript, hãy thực thi lệnh sau. Mã khóa riêng tư của bạn sẽ được mã hóa bằng cụm mật khẩu mà bạn nhập.

```javascript
> personal.newAccount()
Passphrase:  # enter your passphrase
Repeat passphrase:
"0x75a59b94889a05c03c66c3c84e9d2f8308ca4abd" # created account address
```

Tập tin lưu trữ khóa sẽ được tạo trong thư mục `keystore` thuộc thư mục dữ liệu EN, `DATA_DIR` đặt trong `kend.conf`. Nếu bạn làm theo hướng dẫn mặc định bắt đầu nhanh, thư mục đó sẽ là `~/kend_home/keystore/`.

```javascript
$ ls ~/kend_home/keystore/
UTC--2019-06-24T11-20-15.590879000Z--75a59b94889a05c03c66c3c84e9d2f8308ca4abd
```

### Mở khóa tài khoản Klaytn <a id="unlocking-the-klaytn-account"></a>

Để mở khóa một tài khoản đã tạo, hãy thực thi lệnh sau. Lệnh này sẽ mở khóa tài khoản trong 300 giây.

**Note**: If you want to manually set the unlock duration, refer to this [link](../../../../references/json-rpc/personal/unlock-account).

**`CẢNH BÁO`**: Việc mở khóa một tài khoản có thể rất nguy hiểm nếu không được thực hiện thận trọng. Có khả năng token của bạn sẽ bị hacker lấy mất nếu hacker xâm nhập được EN của bạn. Để sử dụng phương pháp an toàn hơn, hãy tham khảo mục [hướng dẫn triển khai bằng mã khóa riêng tư](../../tutorials/count-dapp/deploy-contracts.md#deploy-method-1-by-private-key)

```javascript
> personal.unlockAccount('75a59b94889a05c03c66c3c84e9d2f8308ca4abd') # account address to unlock
Unlock account 75a59b94889a05c03c66c3c84e9d2f8308ca4abd
Passphrase: # enter your passphrase
true
```

### Nhận KLAY cho mạng thử nghiệm từ Vòi Baobab <a id="getting-testnet-klay-from-the-baobab-faucet"></a>

- Sử dụng vòi Baobab trong Ví Klaytn.

- Truy cập [https://baobab.wallet.klaytn.foundation](https://baobab.wallet.klaytn.foundation/).

- Bạn có thể tạo tài khoản mới từ Ví, hoặc dùng tập tin lưu trữ khóa mà bạn đã tạo từ bảng điều khiển JavaScript EN ở trên để đăng nhập vào Ví.

- Đi đến “Vòi KLAY” từ trình đơn ngăn bên trái, nhấp vào nút “Run Faucet” để nhận 150 KLAY.

  Bạn có thể mở vòi KLAY mỗi 24 giờ một lần.

- Nếu bạn đã tạo một tài khoản mới để nhận KLAY, hãy gửi số KLAY đó đến tài khoản đã được tạo trên EN.

### Kiểm tra số dư trong tài khoản <a id="checking-the-balance-in-your-account"></a>

Để xem số dư của tài khoản, hãy thực thi lệnh sau.

Đơn vị mặc định là peb (1 KLAY = 10^18 peb). Bạn có thể tìm hiểu thêm thông tin về các đơn vị của KLAY trong phần [Các đơn vị của KLAY](../../../learn/klaytn-native-coin-klay.md#units-of-klay).

```javascript
> klay.getBalance('75a59b94889a05c03c66c3c84e9d2f8308ca4abd') # enter your account address
1e+21  # 1000 KLAY
```

### Thoát bảng điều khiển <a id="exiting-the-console"></a>

Để thoát bảng điều khiển javascript, hãy thực thi lệnh sau.

```javascript
> exit
$
```

## Cài đặt các công cụ phát triển <a id="install-development-tools"></a>

### Cài đặt caver-js <a id="installing-caver-js"></a>

Chúng tôi đề nghị bạn nên tạo một thư mục dự án klaytn để:

```bash
$ mkdir $HOME/klaytn
```

> Bạn cần cài đặt `npm` và `node.js` để tiếp tục. Vui lòng tham khảo [get-npm](https://www.npmjs.com/get-npm) và [node.js](https://nodejs.org/en/) để xem cách cài đặt trên hệ thống của bạn.

[caver-js](../../../references/sdk/caver-js/caver-js.md) là bộ khung RPC JSON dành cho mạng lưới Klaytn (tương đương với web3.js trong Ethereum). Trước khi cài đặt caver-js, bạn phải tạo tập tin `package.json` qua lệnh `npm init`, sau đó gõ `npm install caver-js` để cài đặt caver-js.

```bash
$ npm init # initialize npm at the klaytn project directory
$ npm install caver-js
```

**LƯU Ý**: Nếu bạn đã cài đặt caver-js, vui lòng cập nhật lên phiên bản mới nhất.

```bash
$ npm cache clean --force # initialize npm cache
$ npm install caver-js@latest # update caver-js to the latest version
```

Nếu bạn nhận được các lỗi sau khi cập nhật caver-js, hãy xóa thư mục `.git` trong thư mục `websocket`.

```bash
npm ERR! path /Users/username/klaytn/node_modules/websocket
npm ERR! code EISGIT
npm ERR! git /Users/username/klaytn/node_modules/websocket: Appears to be a git repo or submodule.
npm ERR! git     /Users/username/klaytn/node_modules/websocket
npm ERR! git Refusing to remove it. Update manually,
npm ERR! git or move it out of the way first.

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/username/.npm/_logs/2019-06-25T01_49_37_032Z-debug.log​

$ rm /Users/username/klaytn/node_modules/websocket/.git
```

**Lưu ý:** Đối với tất cả các chức năng gọi ra hàm bắt đầu bằng `web3.eth...` in web3.js, nên được thay thế bằng `caver.klay...`.

`web3.eth.sendTransaction({ ... })` (X)

`caver.klay.sendTransaction({ ... })` (O)

### Cài đặt Truffle <a id="installing-truffle"></a>

Trong bài hướng dẫn này, Truffle được sử dụng để lập và triển khai hợp đồng thông minh được viết bằng Solidity. Hiện tại, Klaytn hỗ trợ Truffle phiên bản 4.1.15. Để biết thêm thông tin về Truffle, hãy tham khảo các trang sau:

- Kho lưu trữ Truffle - [https://github.com/trufflesuite/truffle](https://github.com/trufflesuite/truffle)
- Tài liệu Truffle - [https://trufflesuite.com/docs](https://trufflesuite.com/docs)​

Chúng ta có thể cài đặt Truffle theo hai cách

- 1\) theo cách toàn cục bằng npm, thực thi các lệnh sau:

```bash
$ sudo npm install -g truffle@4.1.15
$ cd /usr/local/lib/node_modules/truffle
$ sudo npm install solc@0.5.6
$ cd -
```

hoặc

- 2\) theo cách cục bộ, nghĩa là tại thư mục trong máy bạn, thực thi các lệnh sau:

```bash
# Assuming you are in $HOME/klaytn/.
$ npm install truffle@4.1.15
$ cd node_modules/truffle
$ npm install solc@0.5.6
$ cd -
$ ln -s node_modules/truffle/build/cli.bundled.js truffle
$ export PATH=`pwd`:$PATH
```

### Cài đặt vvisp <a id="installing-vvisp"></a>

vvisp là một công cụ/bộ khung cli dễ sử dụng để phát triển các hợp đồng thông minh, do [HEACHI LABS](https://henesis.io/) cung cấp. Bạn có thể dễ dàng thiết lập môi trường, triển khai và thực thi các hợp đồng thông minh Klaytn với một lệnh duy nhất. Nó hỗ trợ bộ khung Truffle, vì vậy, các nhà phát triển đã quen thuộc với Truffle có thể dễ dàng sử dụng vvisp.

Ở đây, chúng tôi giới thiệu cách cài đặt vvisp và sử dụng công cụ này để thiết lập môi trường phát triển Klaytn dApp.

- kho lưu trữ vvisp - [https://github.com/HAECHI-LABS/vvisp](https://github.com/HAECHI-LABS/vvisp)
- tài liệu vvisp - [https://github.com/HAECHI-LABS/vvisp/blob/dev/README_KLAYTN.md](https://github.com/HAECHI-LABS/vvisp/blob/dev/README_KLAYTN.md)

bạn có thể dễ dàng cài đặt vvisp nếu có npm hoặc yarn bằng cách thực thi lệnh sau:

```bash
$ npm install -g @haechi-labs/vvisp
# or if you use yarn
$ yarn global add @haechi-labs/vvisp
```

Sau khi cài đặt xong, bạn có thể sử dụng lệnh vvisp để đảm bảo công cụ này đã được cài đặt đúng cách. **LƯU Ý**: Bạn nên sử dụng phiên bản cao hơn **v2.1.0**.

```bash
$ vvisp
Usage: vvisp <command> [options]

where <command> is one of: compile, console, deploy-contract, deploy-service, flatten, gen-script, init

Options:
  -v, --version  output the version number
  -h, --help     output usage information

Commands:

   compile [files...]                       compile the smart contracts

   console [script-api-path]                run interactive shell to execute contract scripts

   deploy-contract <file> [arguments...]    deploy the smart contracts

   deploy-service                           deploy or upgrade smart contract service using the deployment configure file

   flatten <files...>                       flatten the smart contracts

   gen-script [files...]                    generate javascript libraries communicating the smart contracts

   init [name]                              initialize directory to use vvisp

# you can check installed version.
$ vvisp --version
v2.1.0
```

## Triển khai hợp đồng thông minh <a id="deploy-a-smart-contract"></a>

Đến đây, chúng ta đã sẵn sàng phát triển và triển khai các hợp đồng thông minh Klaytn!

### Tạo thư mục dự án <a id="creating-a-project-directory"></a>

Trước tiên, hãy tạo một thư mục có chứa mã nguồn.

```bash
$ mkdir klaytn-testboard
$ cd klaytn-testboard
```

### Khởi chạy Truffle <a id="initializing-truffle"></a>

Khởi chạy Truffle để triển khai hợp đồng.

```bash
$ truffle init
```

### Soạn một hợp đồng thông minh đơn giản bằng Solidity <a id="writing-a-simple-smart-contract-in-solidity"></a>

Tạo `KlaytnGreeter.sol` trong thư mục `klaytn-testboard/contracts`.

```bash
$ cd contracts
$ touch KlaytnGreeter.sol
$ vi KlaytnGreeter.sol
```

Viết mã sau trong KlaytnGreeter.sol.

```text
pragma solidity 0.5.6;
contract Mortal {
    /* Define variable owner of the type address */
    address payable owner;
    /* This function is executed at initialization and sets the owner of the contract */
    constructor () public { owner = msg.sender; }
    /* Function to recover the funds on the contract */
    function kill() public payable { if (msg.sender == owner) selfdestruct(owner); }
}

contract KlaytnGreeter is Mortal {
    /* Define variable greeting of the type string */
    string greeting;
    /* This runs when the contract is executed */
    constructor (string memory _greeting) public {
        greeting = _greeting;
    }
    /* Main function */
    function greet() public view returns (string memory) {
        return greeting;
    }
}
```

### Sửa đổi tập lệnh di chuyển <a id="modifying-the-migration-script"></a>

```bash
$ cd ..
$ cd migrations
$ vi 1_initial_migration.js
```

Sửa đổi `1_initial_migration.js` như sau.

```javascript
const Migrations = artifacts.require("./Migrations.sol");
const KlaytnGreeter = artifacts.require("./KlaytnGreeter.sol");
module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(KlaytnGreeter, 'Hello, Klaytn');
};
```

### Triển khai hợp đồng thông minh bằng Truffle <a id="deploying-a-smart-contract-using-truffle"></a>

Nhập thông tin mạng của Klaytn vào truffle.js.

**`WARNING`**: Hiện tại, gasPrice của mạng Baobab Klaytn được đặt cố định là 25 Gpeb (**Kết quả trả về là lỗi nếu bạn cố gắng dùng số khác**).

```bash
$ cd ..
$ vi truffle-config.js
```

Sửa đổi cấu hình như sau

```javascript
// truffle-config.js
module.exports = {
    networks: {
        klaytn: {
            host: '127.0.0.1',
            port: 8551,
            from: '0x75a59b94889a05c03c66c3c84e9d2f8308ca4abd', // enter your account address
            network_id: '1001', // Baobab network id
            gas: 20000000, // transaction gas limit
            gasPrice: 25000000000, // gasPrice of Baobab is 25 Gpeb
        },
    },
    compilers: {
      solc: {
        version: "0.5.6"    // Specify compiler's version to 0.5.6
      }
  }
};
```

Triển khai hợp đồng bằng lệnh sau.

**LƯU Ý**: Sử dụng `--network` để chọn mạng cần triển khai và `--reset` để ghi đè.

**LƯU Ý**: Đảm bảo rằng nút Klaytn của bạn đang chạy.

Địa chỉ hợp đồng của bạn được hiển thị sau \`KlaytnGreeter:

```bash
$ truffle deploy --network klaytn --reset
Using network 'klaytn'.
Running migration: 1_initial_migration.js
  Deploying Migrations...
  ... 0x0f5108bd9e51fe6bf71dfc472577e3f55519e0b5d140a99bf65faf26830acfca
  Migrations: 0x97b1b3735c8f2326a262dbbe6c574a8ea1ba0b7d
  Deploying KlaytnGreeter...
  ... 0xcba53b6090cb4a118359b27293ba95116a8f35f66ae50fbd23ae1081ce9ffb9e
  KlaytnGreeter: [SAVE THIS ADDRESS!!] # this is your smart contract address
Saving successful migration to network...
  ... 0x14eb68727ca5a0ac767441c9b7ab077336f9311f71e9854d42c617aebceeec72
Saving artifacts...
```

**`CẢNH BÁO`**: Kết quả trả về sẽ là lỗi khi tài khoản của bạn bị khóa.

```bash
Running migration: 1_initial_migration.js
  Replacing Migrations...
  ... undefined
Error encountered, bailing. Network state unknown. Review successful transactions manually.
Error: authentication needed: password or unlock
```

Đây là cách bạn mở khóa tài khoản.

```javascript
> personal.unlockAccount('0x775a59b94889a05c03c66c3c84e9d2f8308ca4abd')
Unlock account 0x75a59b94889a05c03c66c3c84e9d2f8308ca4abd
Passphrase:
true
```

Vậy là bạn đã sẵn sàng. Hãy thử triển khai lại.

## Kiểm tra quy trình triển khai <a id="check-the-deployment"></a>

### Kiểm tra chỉ thị biên dịch đã triển khai bằng caver-js <a id="checking-the-deployed-byte-code-using-caver-js"></a>

Sử dụng `getCode` để kiểm tra chỉ thị biên dịch của hợp đồng thông minh đã triển khai.

Trước tiên, hãy tạo và mở một tệp thử nghiệm.

```bash
$ touch test-klaytn.js
$ open test-klaytn.js
```

Viết mã kiểm tra sau. Đảm bảo bạn nhập địa chỉ hợp đồng mà bạn vừa triển khai.

```javascript
// test-klaytn.js
const Caver = require('caver-js');
const caver = new Caver('http://127.0.0.1:8551');
// enter your smart contract address
const contractAddress = '0x65ca27ed42abeef230a37317a574058ff1372b34'
caver.klay.getCode(contractAddress).then(console.log);
```

Chạy mã.

```bash
$ node test-klaytn.js
0x60806040526004361061004c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806341c0e1b514610051578063cfae321714610068575b600080fd5b34801561005d57600080fd5b506100666100f8565b005b34801561007457600080fd5b5061007d610189565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100bd5780820151818401526020810190506100a2565b50505050905090810190601f1680156100ea5780820380516001836020036101000a031916815260200191505b509250505060405180...
```

### Gọi ra các hàm trong Hợp đồng thông minh đã triển khai <a id="calling-functions-in-the-deployed-smart-contract"></a>

Dùng JavaScript để gọi ra`greet()` trong hợp đồng.

**LƯU Ý**: Để gọi ra các hàm cụ thể trong hợp đồng thông minh, bạn cần tập tin ABI (Giao dịch nhị phân ứng dụng). Khi triển khai hợp đồng của bạn, Truffle sẽ tự động tạo một tập tin .json tại `./build/contracts/` trong đó có chứa thuộc tính `abi`.

Nối các dòng sau vào mã kiểm tra được viết ở trên.

```javascript
// test-klaytn.js
const Caver = require('caver-js');
const caver = new Caver('http://127.0.0.1:8551');
// enter your smart contract address
const contractAddress = '0x65ca27ed42abeef230a37317a574058ff1372b34'

caver.klay.getCode(contractAddress).then(console.log);
// add lines
const KlaytnGreeter = require('./build/contracts/KlaytnGreeter.json');
// enter your smart contract address
const klaytnGreeter = new caver.klay.Contract(KlaytnGreeter.abi, contractAddress);
klaytnGreeter.methods.greet().call().then(console.log);
```

Chạy mã kiểm tra.

```bash
$ node test-klaytn.js
0x60806040526004361061004c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806341c0e1b514610051578063cfae321714610068575b600080fd5b34801561005d57600080fd5b506100666100f8565b005b34801561007457600080fd5b5061007d610189565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100bd5780820151... # This is from caver.klay.getCode
Hello, Klaytn # This is from KlyatnGreeter.methods.greet()
```

**Nếu nhận được dòng "Hello, Klaytn", bạn đã hoàn thành nhiệm vụ. Xin chúc mừng!**
