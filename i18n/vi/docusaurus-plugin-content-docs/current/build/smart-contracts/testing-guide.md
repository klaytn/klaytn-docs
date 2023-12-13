# Hướng dẫn kiểm thử

Trong phần này, chúng tôi sẽ giới thiệu cách kiểm thử các hợp đồng thông minh. Các giao dịch trên blockchain không thể hoàn tác. Do đó, việc kiểm thử hợp đồng thông minh của bạn trước khi triển khai có vai trò rất quan trọng.

## Kiểm thử bằng Truffle <a href="#testing-with-truffle" id="testing-with-truffle"></a>

Truffle cung cấp công cụ kiểm thử tự động. Công cụ này cho phép bạn viết các kiểm thử đơn giản và dễ quản lý theo hai cách khác nhau:

* Bằng `Javascript` và `TypeScript`, để thực hiện kiểm thử các hợp đồng từ bên ngoài, giống như ứng dụng.
* Bằng `Solidity`, để thực hiện kiểm thử trước các hợp đồng, trong các tình huống không có hệ điều hành hoặc ứng dụng.

### 1) Bắt đầu <a href="#1-getting-started" id="1-getting-started"></a>

Chúng ta sẽ làm theo [Hướng dẫn triển khai bằng Truffle](./deploy/deploy.md#truffle) để tạo và triển khai một hợp đồng. Tuy nhiên, trước khi triển khai, chúng ta sẽ thêm một hàm thiết lập `setGreet` vào hợp đồng nhằm mục đích kiểm thử. Mã nguồn được đưa ra như sau.

**LƯU Ý:** Chúng tôi đã thực hiện một số sửa đổi với hợp đồng nhằm mục đích kiểm thử.

Dưới đây là mã nguồn của hợp đồng KlaytnGreeting.

```
pragma solidity 0.5.6;

hợp đồng Mortal {
    /* Xác định biến chủ sở hữu của loại hợp đồng */
    address payable owner;
    /* Hàm này được thực thi khi khởi tạo và thiết lập chủ sở hữu hợp đồng */
    constructor () public { owner = msg.sender; }
    /* Hàm khôi phục số dư trên hợp đồng */
    function kill() public payable { if (msg.sender == owner) selfdestruct(owner); }
}

hợp đồng KlaytnGreeter là Mortal {
    /* Xác định biến lời chào của loại chuỗi */
    string greeting;
    /* Hàm này chạy khi hợp đồng được thực thi */
    constructor (string memory _greeting) public {
        greeting = _greeting;
    }
    /* Hàm chính */
    function greet() public view returns (string memory) {
        return greeting;
    }

    /* Hàm mới thêm để kiểm thử. */
    function setGreet(string memory _greeting) public {
        // only owner can change greeting message
        require(msg.sender == owner, "Only owner is allowed.");
        greeting = _greeting;
    }
}
```

Chúng ta sẽ kiểm thử 1) hàm `greet()` để xem nó có trả về thông báo "Hello, Klaytn" một cách chính xác không, 2) hàm `setGreet()` để xem nó có thiết lập thông báo chào mừng mới một cách chính xác không và hoàn ngược khi tài khoản không phải là chủ sở hữu cố gắng cập nhật thông báo chào mừng không.

Đầu tiên, chúng ta sẽ cài đặt thư viện công cụ khẳng định Chai (hoặc bất kỳ thư viện công cụ khẳng định khác bạn sử dụng) cho các khẳng định chung và thư viện công cụ khẳng định truffle cho các khẳng định trong hợp đồng thông minh.

```
npm install --save-dev chai truffle-assertions
```

### 2) Viết kiểm thử bằng Solidity <a href="#2-writing-test-in-solidity" id="2-writing-test-in-solidity"></a>

Kiểm thử bằng Solidity có thể trực quan hơn một chút so với kiểm thử bằng JavaScript. Các hợp đồng kiểm thử Solidity được lưu trữ cùng với các kiểm thử JavaScript dưới dạng tập tin .sol.

Tạo một tập tin có tên là `TestKlaytnGreeting.sol` trong thư mục `test`. Bộ công cụ Truffle cung cấp các thư viện hỗ trợ kiểm thử, vì vậy chúng ta cần nhập các thư viện này. Hãy cùng xem ví dụ kiểm thử bằng Solidity dưới đây:

```
pragma solidity ^0.5.6;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/HashMarket.sol";
```

* Assert : Cho phép chúng ta truy cập vào các hàm kiểm thử khác nhau, như `Assert.equals()`, `Assert.greaterThan()`, v.v.
* DeployedAddresses : Mỗi khi bạn thay đổi hợp đồng của mình, bạn phải triển khai lại hợp đồng để có một địa chỉ mới. Bạn có thể lấy các địa chỉ hợp đồng đã triển khai thông qua thư viện này.

Bây giờ, hãy cùng viết mã kiểm thử.

```
pragma solidity ^0.5.6;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/KlaytnGreeter.sol";

contract TestKlaytnGreeter {

    function testGreetingMessage() public {
        // DeployedAddresses.KlaytnGreeter() handles contract address.
        KlaytnGreeter greeter = KlaytnGreeter(DeployedAddresses.KlaytnGreeter());

        string memory expectedGreet = "Hello Klaytn";

        string memory greet = greeter.greet();

        Assert.equal(greet, expectedGreet, "greeting message should match");
    }
}
```

Chạy mã kiểm thử Solidity của bạn.

```
$ truffle test
# Output
Using network 'development'.


Compiling your contracts...
===========================
> Compiling ./test/TestKlaytnGreeter.sol



  TestKlaytnGreeter
    1) testGreetingMessage

    Events emitted during test:
    ---------------------------


    ---------------------------


  0 thành công (5s)
  1 lỗi

  1) TestKlaytnGreeter
       testGreetingMessage:
     Error: greeting message should match (Tested: Hello, Klaytn, Against: Hello Klaytn)
      at result.nhật ký.forEach.log (/Users/jieunkim/.nvm/versions/node/v10.16.0/lib/node_modules/truffle/build/webpack:/packages/core/lib/testing/soliditytest.js:71:1)
      at Array.forEach (<anonymous>)
      at processResult (/Users/jieunkim/.nvm/versions/node/v10.16.0/lib/node_modules/truffle/build/webpack:/packages/core/lib/testing/soliditytest.js:69:1)
      at process._tickCallback (internal/process/next_tick.js:68:7)
```

Đã xảy ra lỗi. Hãy kiểm tra thông báo lỗi,`Error: greeting message should match (Tested: Hello, Klaytn, Against: Hello Klaytn)`. Tôi để ý thấy thiếu dấu `',(comma)'` ở _bộ nhớ chuỗi expectedGreet = "Hello Klaytn"_.\
Sửa mã và chạy thử lần nữa.

```
$ truffle test
# Output
Using network 'development'.


Compiling your contracts...
===========================
> Compiling ./test/TestKlaytnGreeter.sol



  TestKlaytnGreeter
    ✓ testGreetingMessage (58ms)


  1 thành công (5s)
```

Xin chúc mừng! Bạn đã kiểm thử thành công.

### 3) Viết kiểm thử bằng JavaScript <a href="#3-writing-test-in-javascript" id="3-writing-test-in-javascript"></a>

Truffle sử dụng công cụ kiểm thử [Mocha](https://mochajs.org/) và thư viện công cụ khẳng định [Chai](https://www.chaijs.com/) để cung cấp công cụ vững chắc cho kiểm thử bằng JavaScript. Kiểm thử bằng JavaScript linh hoạt hơn và cho phép bạn viết các kiểm thử phức tạp hơn.

Hãy tạo một tập tin và đặt tên là `0_KlaytnGreeting.js` dưới thư mục `test`.\
Mã kiểm thử là:

```javascript
// Tương tác trực tiếp với hợp đồng KlaytnGreeter
const KlaytnGreeter = artifacts.require("./KlaytnGreeter.sol");
const truffleAssert = require('truffle-assertions');

contract("KlaytnGreeter", async(tài khoảns) => {
    // lưu trữ phiên bản hợp đồng ở cấp cao hơn 
    // cho phép truy cập từ tất cả các hàm.
    var klaytnGreeterInstance;
    var owner = tài khoảns[0];
    var greetMsg = "Hello, Klaytn";

    // Đoạn mã này sẽ chạy trước khi mỗi kiểm thử được thực hiện.
    before(async function() {
        // thiết lập phiên bản hợp đồng vào biến
        klaytnGreeterInstance = await KlaytnGreeter.new(greetMsg, {from:owner});
    })

    it("#1 check Greeting message", async function() {
        // thiết lập thông báo chào mừng dự kiến
        var expectedGreeting = greetMsg;
        var greet= await klaytnGreeterInstance.greet();
        assert.equal(expectedGreeting, greet, "greeting message should match");

    })

    it("#2 update greeting message.", async function() {
        var newGreeting = "Hi, Klaytn";

        await klaytnGreeterInstance.setGreet(newGreeting, { from:owner });
        var greet = await klaytnGreeterInstance.greet();
        assert.equal(newGreeting, greet, "greeting message should match");
    });

    it("#3 [Failure test] Only owner can change greeting.", async function() {
        var fakeOwner = tài khoảns[1];        
        await truffleAssert.fails(klaytnGreeterInstance.setGreet(greetMsg, { from:fakeOwner }));
    });
});
```

Nếu bạn không quen thuộc với kiểm thử đơn vị `Mocha`, vui lòng tham khảo [tài liệu Mocha](https://mochajs.org/#getting-started).

* Sử dụng `contract()` thay vì `describe()`\
Về mặt cấu trúc, mã kiểm thử của Truffle không nên khác biệt nhiều so với mã kiểm thử thông thường của Mocha. Kiểm thử của bạn nên chứa mã giúp Mocha nhận ra đó là kiểm thử tự động. Khác biệt giữa kiểm thử Mocha và kiểm thử Truffle là việc sử dụng hàm contract().\ **LƯU Ý** sử dụng hàm `contract()` và sử dụng mảng `tài khoảns` để chỉ định các tài khoản Klaytn đang có sẵn.
* Tóm tắt hợp đồng trong các kiểm thử\
Vì Truffle không có phương pháp nào để phát hiện hợp đồng nào bạn cần tương tác trong suốt quá trình kiểm thử, bạn phải nêu chi tiết hợp đồng một cách rõ ràng. Một trong các giải pháp là sử dụng phương pháp `artifacts.require()`.
* cú pháp `it`\
Cú pháp này thể hiện mỗi trường hợp kiểm thử cùng với mô tả. Mô tả sẽ được in ra trên bảng điều khiển khi chạy kiểm thử.
* thư viện `truffle-assertion`\
Thư viện này cho phép bạn dễ dàng kiểm thử các trường hợp hoàn ngược hoặc các lỗi khác bằng cách sử dụng hàm `truffleAssert.reverts()` và `truffleAssert.fails()`.

Kết quả phải như sau:

```
Using network 'development'.


Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.



  Contract: KlaytnGreeter
    ✓ #1 check Greeting message
    ✓ #2 update greeting message. (46ms)
    ✓ #3 [Failure test] Only owner can change greeting.


  3 thành công (158ms)
```

Xin chúc mừng! Bạn đã kiểm thử thành công.

### 4) Chỉ định kiểm thử <a href="#4-specifying-test" id="4-specifying-test"></a>

Bạn có thể lựa chọn tập tin kiểm thử cần thực thi.

```
truffle test ./test/0_KlaytnGreeting.js
```

Để biết thêm thông tin, vui lòng tham khảo [kiểm thử Truffle](https://www.trufflesuite.com/docs/truffle/testing/testing-your-contracts) và [các lệnh Truffle](https://www.trufflesuite.com/docs/truffle/reference/truffle-commands#test).
