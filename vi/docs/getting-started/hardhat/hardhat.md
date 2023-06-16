![](./Klaytn-hardhat.png)

# Giới thiệu

Phần này sẽ hướng dẫn bạn triển khai token Soulbound cho mạng Baobab của Klaytn bằng cách dùng [Hardhat](https://hardhat.org/).

Hardhat là một môi trường phát triển hợp đồng thông minh, có thể giúp bạn:
* Phát triển và lập hợp đồng thông minh.
* Gỡ lỗi, thử nghiệm và triển khai hợp đồng thông minh và dApp.

Token Soul-bound (SBT) là các NFT không thể chuyển nhượng. Nghĩa là khi đã bạn đã có được chúng, bạn sẽ không thể bán hoặc chuyển nhượng cho người dùng khác. Để tìm hiểu thêm về SBT, cách hoạt động và trường hợp sử dụng của chúng, bạn có thể xem [bài viết tham khảo](https://vitalik.ca/general/2022/01/26/soulbound.html) được Vitalik Buterin xuất bản.

Đến cuối hướng dẫn này, bạn sẽ có thể:
* Thiết lập dự án Hardhat trên Klaytn.
* Tạo token soul-bound đơn giản.
* Lập hợp đồng thông minh bằng Hardhat.
* Kiểm tra, triển khai và tương tác với hợp đồng thông minh bằng Hardhat.
* Khám phá tính năng phân nhánh Hardhat.


# Điều kiện tiên quyết

Để làm theo hướng dẫn này, bạn cần đáp ứng các điều kiện tiên quyết sau:

* Trình biên tập mã: một trình biên tập mã nguồn như [VS-Code](https://code.visualstudio.com/download).
* [Metamask](https://docs.klaytn.foundation/dapp/tutorials/connecting-metamask#install-metamask): được dùng để triển khai hợp đồng, ký giao dịch và tương tác với hợp đồng.
* Điểm cuối RPC: bạn có thể nhận từ một trong những [Nhà cung cấp điểm cuối](https://docs.klaytn.foundation/content/dapp/json-rpc/public-en) được hỗ trợ.
* KLAY thử nghiệm từ [Vòi](https://baobab.wallet.klaytn.foundation/faucet): nạp tiền vào tài khoản với một lượng KLAY vừa đủ.
* [NodeJS và NPM](https://nodejs.org/en/)

# Thiết lập môi trường phát triển

Để tận dụng hardhat, chúng ta cần thiết lập môi trường phát triển và cài đặt hardhat. Hãy cùng thực hiện bằng các bước sau:

**Bước 1**: Tạo một thư mục dự án

```bash
mkdir soulbound-tokens
cd soulbound-tokens
```

**Bước 2**: Khởi tạo một dự án npm

Dán lệnh này vào giao diện dòng lệnh để tạo tập tin package.json

```bash
npm init -y
```

**Bước 3**: Cài đặt hardhat và các phần phụ thuộc khác:

* Dán mã dưới đây và giao diện dòng lệnh để cài đặt hardhat

```bash
npm install --save-dev hardhat
```

* Dán mã dưới đây để cài đặt các phần phụ thuộc khác

```bash
npm install dotenv @nomicfoundation/hardhat-toolbox @klaytn/contracts
```

> Lưu ý: Mã này sẽ cài đặt các phần phụ thuộc cần thiết khác cho dự án này, gồm `hardhat`, `hardhat-toolbox`,  `klaytn/contract`, `dotenv` cùng các phần khác.


**Bước 4**: Khởi tạo dự án hardhat:

Chạy lệnh dưới đây để khởi tạo một dự án hardhat

```bash
npx hardhat
```
Với hướng dẫn này, bạn sẽ chọn một dự án typescript như bên dưới:

![](./../images/hardhat/hardhat-init.png)

Sau khi khởi tạo dự án hardhat, thư mục hiện tại của bạn sẽ bao gồm:

**contracts/** – thư mục này chứa mã hợp đồng thông minh.

**scripts/** – thư mục này chứa các mã để triển khai hợp đồng trên mạng chuỗi khối.

**test/** – thư mục này chứa các bài kiểm tra đơn vị để kiểm tra hợp đồng thông minh của bạn.

**hardhat.config.ts** – tập tin này chứa các cấu hình quan trọng cho công việc của Hardhat và việc triển khai token soul-bound.

**Bước 5**: Tạo tập tin .env

Đến đây, hãy tạo tập tin .env trong thư mục dự án. Tập tin này sẽ giúp chúng ta tải các biến môi trường từ tập tin .env vào process.env.

* Dán lệnh này vào giao diện dòng lệnh để tạo tập tin .env

```bash
touch .env
```

* Sau khi tạo tập tin, hãy cấu hình sao cho tập tin .env sẽ có dạng:

```js
 KLAYTN_BAOBAB_URL= "Your Baobab RPC link"
 PRIVATE_KEY= "your private key copied from MetaMask wallet"
```

**Bước 6**: Thiết lập cấu hình Hardhat

Sửa đổi `hardhat.config.ts` bằng các cấu hình sau:

```js
require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()


module.exports = {
  solidity: "0.8.17",
  networks: {
    baobab: {
      url: process.env.KLAYTN_BAOBAB_URL || "",
      gasPrice: 250000000000,
      tài khoảns:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    }
  }
};

```

Đến đây, chúng ta đã thiết lập xong môi trường phát triển, hãy bắt đầu soạn hợp đồng thông minh cho token soul-bound.

# Tạo hợp đồng thông minh SBT

Trong phần này, bạn sẽ dùng [Hợp đồng Klaytn](https://github.com/klaytn/klaytn-contracts): một thư viện dành cho việc phát triển hợp đồng thông minh bảo mật, được xây dựng trên nền tảng mã tin cậy do cộng đồng kiểm duyệt. Đây là một phân nhánh các hợp đồng zeppelin mở.

> Lưu ý: Bạn đã cài đặt thư viện này ở **bước 3** của phần `Thiết lập môi trường phát triển`.

**Bước 1**: Chọn thư mục hợp đồng trong ngăn Trình khám phá, nhấp vào nút New File mới và tạo một tập tin có tên là `SBT.sol`

**Bước 2**: Mở tập tin và dán mã sau vào:

```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@klaytn/contracts/KIP/token/KIP17/KIP17.sol";
import "@klaytn/contracts/utils/Counters.sol";
import "@klaytn/contracts/access/Ownable.sol";

contract SoulBoundToken is KIP17, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() KIP17("SoulBoundToken", "SBT") {}

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }


    function _beforeTokenTransfer(address from, address to, uint256) pure override internal {
        require(from == address(0) || to == address(0), "This a Soulbound token. It cannot be transferred.");
    }

    function _burn(uint256 tokenId) internal override(KIP17) {
        super._burn(tokenId);
    }
}
```

**Hướng dẫn về mã**

Đây là hợp đồng thông minh của bạn. **dòng 1** cho biết Hardhat sử dụng phiên bản Solidity 0.8.7 hoặc cao hơn. Ngoài ra, dòng này còn nhập KIP17.SOL và các hợp đồng hỗ trợ khác. Từ **dòng 6-12**, một hợp đồng thông minh kế thừa KIP17 đã được tạo. Ngoài ra, tên và ký hiệu của token đã được đưa qua trong hàm tạo.

Như bạn có thể thấy trong đoạn mã trên, tên và ký hiệu của token đã được đặt lần lượt là **SoulBoundToken** và **SBT**. Bạn có thể thay đổi tên và ký hiệu của token theo mong muốn.

Điều quan trọng trong hợp đồng này là không cho phép chuyển nhượng token, khiến cho các token được phát hành mang tính chất định danh cá nhân.

# Thử nghiệm hợp đồng thông minh SBT

Trong phần này, chúng ta sẽ kiểm tra một số chức năng của hợp đồng.

**Bước 1**: Trong ngăn Trình khám phá, chọn thư mục kiểm tra và nhấp vào nút Tập tin mới và tạo một tập tin mới với tên là `sbtTest.ts`

**Bước 2**: Sao chép mã dưới đây vào tập tin `sbtTest.ts`.

```js
// This is an example test file. Hardhat will run every *.ts file in `test/`,
// so feel free to add new ones.

// Hardhat tests are normally written with Mocha and Chai.

// We import Chai to use its asserting functions here.
const { expect } = require("chai");

// We use `loadFixture` to share common setups (or fixtures) between tests.
// Using this simplifies your tests and makes them run faster, by taking
// advantage of Hardhat Network's snapshot functionality.
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

// `describe` is a Mocha function that allows you to organize your tests.
// Having your tests organized makes debugging them easier. All Mocha
// functions are available in the global scope.
//
// `describe` receives the name of a section of your test suite, and a
// callback. The callback must define the tests of that section. This callback
// can't be an async function.
describe("Token contract", function () {
  // We define a fixture to reuse the same setup in every test. We use
  // loadFixture to run this setup once, snapshot that state, and reset Hardhat
  // Network to that snapshot in every test.
  async function deployTokenFixture() {
    // Get the ContractFactory and Signers here.
    const sbt = await ethers.getContractFactory("SoulBoundToken");
    const [owner, addr1, addr2] = await ethers.getSigners();

    // To deploy our contract, we just have to call Token.deploy() and await
    // its deployed() method, which happens onces its transaction has been
    // mined.
    const sbtContract = await sbt.deploy();

    await sbtContract.deployed();

    // Fixtures can return anything you consider useful for your tests
    return { sbtContract, owner, addr1, addr2 };
  }

  // You can nest describe calls to create subsections.
  describe("Deployment", function () {
    // `it` is another Mocha function. This is the one you use to define each
    // of your tests. It receives the test name, and a callback function.
    //
    // If the callback function is async, Mocha will `await` it.
    it("Should mint SBT to owner", async function () {
      const { sbtContract, owner } = await loadFixture(deployTokenFixture);
      const safemint = await sbtContract.safeMint(owner.address);
      expect(await sbtContract.ownerOf(0)).to.equal(owner.address);
    });
  });

  describe("Transactions", function () {
    it("Should prohibit token transfer using transferFrom", async function () {
      const { sbtContract, owner, addr1 } = await loadFixture(
        deployTokenFixture
      );

      const safemintTx = await sbtContract.safeMint(owner.address);

      // prohibit token transfer of token id (0) from owner to addr1
      await expect(
        sbtContract.transferFrom(owner.address, addr1.address, 0)
      ).to.be.reverted;
  });

  it("Should prohibit token transfer using safeTransferFrom", async function () {
    const { sbtContract, owner, addr1 } = await loadFixture(
      deployTokenFixture
    );

    const safemintTx = await sbtContract.safeMint(owner.address);

    // prohibit token transfer of token id (0) from owner to addr1
    await expect(sbtContract['safeTransferFrom(address,address,uint256)'](
      owner.address,
      addr1.address,
      0 
  )).to.be.reverted;
});


});

})
```

Trong đoạn mã bạn vừa sao chép, dòng 7 & 12 cho thấy bạn đã nhập expect từ [Chai](https://www.chaijs.com/api/bdd/) và [loadFixture](https://hardhat.org/tutorial/testing-contracts#reusing-common-test-setups-with-fixtures) từ hardhat-network-helpers.

Các bài kiểm tra ở trên kiểm tra các điểm sau:

* Chủ ở hữu của mã token cụ thể và người nhận các đồng token đó có phải là cùng một người không?
* Nó có ngăn chặn việc chuyển nhượng token giữa các tài khoản không?

**Step 3**: Để chạy bài kiểm tra, hãy chạy dòng lệnh dưới đây:

```bash
npx hardhat test test/sbtTest.ts 
```

![](./../images/hardhat/sbtTest.png)

Để được hướng dẫn sâu hơn về quy trình kiểm tra, vui lòng xem phần [Hardhat testing](https://hardhat.org/hardhat-runner/docs/guides/test-contracts).

# Triển khai hợp đồng thông minh

Tập lệnh là các tập tin JavaScript/Typescript giúp bạn triển khai các hợp đồng vào mạng chuỗi khối. Trong phần này, bạn sẽ tạo tập lệnh cho hợp đồng thông minh.

**Bước 1**: Trong ngăn Trình khám phá, chọn thư mục “script” và nhấp vào nút New File và tạo một tập tin mới với tên là `sbtDeploy.ts`.

**Bước 2**: Sao chép và dán đoạn mã sau vào tập tin.

> Lưu ý: nhập địa chỉ ví MetaMask của bạn vào biến `deployerAdd`.

```js
import { ethers } from "hardhat";

async function main() {

    const deployerAddr = "Your Metamask wallet address";
    const deployer = await ethers.getSigner(deployerAddr);

    console.log(`Deploying contracts with the tài khoản: ${deployer.address}`);
    console.log(`Account balance: ${(await deployer.getBalance()).toString()}`);

  const sbt = await ethers.getContractFactory("SoulBoundToken");
  const sbtContract = await sbt.deploy();


  await sbtContract.deployed();

console.log(`Congratulations! You have just successfully deployed your soul bound tokens.`);
console.log(`SBT contract address is ${sbtContract.address}. You can verify on https://baobab.scope.klaytn.com/tài khoản/${sbtContract.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

**Bước 3**: Trong giao diện dòng lệnh, chạy lệnh sau để yêu cầu Hardhat triển khai token SBT của bạn trên Mạng thử nghiệm Klaytn (Baobab)

```bash
npx hardhat run scripts/sbtDeploy.ts --network baobab
```

![](../images/hardhat/sbtDeploy.png)

**Step 4**: Mở [Klaytnscope](https://baobab.scope.klaytn.com/) để kiểm tra xem token SBT đã được triển khai thành công hay chưa.

**Bước 5**: Sao chép và dán địa chỉ hợp đồng đã được triển khai vào trường tìm kiếm rồi nhấn Enter. Bạn sẽ thấy hợp đồng vừa được triển khai.

![](../images/hardhat/sbtKS.png)

# Phân nhánh Hardhat

Hardhat cung cấp cho các nhà phát triển chức năng mô phỏng mạng chính thức (tại bất kỳ khối cụ thể nào) thành mạng phát triển cục bộ. Một trong những lợi ích chính của tính năng này là cho phép các nhà phát triển tương tác với hợp đồng đã triển khai và cũng có thể thử nghiệm các trường hợp phức tạp.

Để tính năng này hoạt động hiệu quả, bạn cần kết nối với một nút lưu trữ. Bạn có thể đọc thêm về tính năng này [ở đây](https://hardhat.org/hardhat-network/docs/guides/forking-other-networks#forking-other-networks)

## Phân nhánh mạng chính thức
Đến đây, dự án Hardhat của chúng ta đã được thiết lập, hãy cùng phân nhánh mạng chính thức của Klaytn bằng Harhat.  Mở giao diện dòng lệnh và chạy lệnh sau

```bash
npx hardhat node --fork <YOUR ARCHIVE NODE URL>

npx hardhat node --fork https://archive-en.cypress.klaytn.net
```
Bạn cũng có thể cấu hình `hardhat.config.ts` - Mạng Hardhat để luôn thực hiện việc này:

```
networks: {
  hardhat: {
    forking: {
      url: "<YOUR ARCHIVE NODE URL>",
    }
  }
}
```

**Kết quả đầu ra**

![](../images/hardhat/hardhat-fork.png)

Sau khi chạy thành công lệnh này, giao diện dòng lệnh của bạn sẽ có dạng như hình trên.  Bạn sẽ có 20 tài khoản phát triển, đã được nạp sẵn 10.000 token thử nghiệm.


Máy chủ RPC của chuỗi được phân nhánh sẽ nhận và xử lý khối tại địa chỉ `http://127.0.0.1:8545/`.  Bạn có thể xác minh mạng lưới được phân nhánh hay chưa bằng cách truy vấn số khối mới nhất. Hãy cùng tạo một cURL đến RPC để nhận số khối.  Mở cửa sổ giao diện dòng lệnh mới và dùng lệnh sau:

```bash
curl --data '{"method":"eth_blockNumber","params":[],"id":1,"jsonrpc":"2.0"}' -H "Content-Type: application/json" -X POST localhost:8545 
```

**Kết quả đầu ra**

![](../images/hardhat/hardhat-fork-bn.png)

Kết quả đầu ra là một hệ thập lục phân như đã thấy ở trên. Để nhận số khối từ hex, hãy đổi hex thành số thập phân bằng [công cụ](https://www.rapidtables.com/convert/number/hex-to-decimal.html) này. Bạn sẽ nhận được số khối mới nhất từ lần bạn phân nhánh mạng lưới. Bạn có thể xác nhận số khối trên [klaytnscope](https://scope.klaytn.com/).

## Phân nhánh tại một khối
Với hardhat, bạn có thể mô phỏng mạng chính thức tại một khối cụ thể.  Trong trường hợp đó, hãy cùng phân nhánh chuỗi tại số khối `105701850`.

```bash
npx hardhat node --fork <YOUR ARCHIVE NODE URL> --fork-block-number 105701850

npx hardhat node --fork https://archive-en.cypress.klaytn.net --fork-block-number 105701850
```

Để xác nhận chuỗi khối được phân nhánh tại một khối cho trước, hãy mở cửa sổ giao diện dòng lệnh mới và dùng lệnh sau:

```bash
curl --data '{"method":"eth_blockNumber","params":[],"id":1,"jsonrpc":"2.0"}' -H "Content-Type: application/json" -X POST localhost:8545 
```

![](../images/hardhat/hardhat-fork-bnII.png)

Kết quả đầu ra trả về hệ thập lục phân, khi được chuyển đổi bằng [công cụ](https://www.rapidtables.com/convert/number/hex-to-decimal.html) này, nó sẽ có giá trị bằng `105701850`.


Để được hướng dẫn sâu hơn về Hardhat, vui lòng tham khảo [Tài liệu về Hardhat](https://hardhat.org/hardhat-runner/docs/getting-started). Ngoài ra, bạn có thể tìm thấy cách triển khai mã đầy đủ cho hướng dẫn này trên [GitHub](https://github.com/klaytn/examples/tree/main/hardhat/soulbound-tokens)
