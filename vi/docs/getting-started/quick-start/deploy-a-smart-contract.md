# Triển khai hợp đồng thông minh <a id="deploy-a-smart-contract"></a>

Đến đây, chúng ta đã sẵn sàng phát triển và triển khai các hợp đồng thông minh Klaytn!

## Tạo thư mục dự án <a id="creating-a-project-directory"></a>

Trước tiên, hãy tạo một thư mục có chứa mã nguồn.

```bash
$ mkdir klaytn-testboard
$ cd klaytn-testboard
```

## Khởi chạy Truffle <a id="initializing-truffle"></a>

Khởi chạy Truffle để triển khai hợp đồng.

```bash
$ truffle init
```

## Soạn một hợp đồng thông minh đơn giản bằng Solidify <a id="writing-a-simple-smart-contract-in-solidity"></a>

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

## Sửa đổi tập lệnh di chuyển <a id="modifying-the-migration-script"></a>

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

## Triển khai hợp đồng thông minh bằng Truffle <a id="deploying-a-smart-contract-using-truffle"></a>

Nhập thông tin mạng của Klaytn vào truffle.js.

**`WARNING`**: Hiện tại, gasPrice của mạng Baobab Klaytn được đặt cố định là 25 Gpeb \(**Kết quả trả về là lỗi nếu bạn cố gắng dùng số khác**\).

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

