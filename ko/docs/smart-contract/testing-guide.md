# 테스트 가이드 <a id="testing-guide"></a>
이 장에서는 스마트 컨트랙트를 테스트하는 방법을 소개합니다. 블록체인의 트랜잭션은 되돌릴 수 없으므로 스마트 컨트랙트를 배포하기 전에 테스트하는 것이 매우 중요합니다.

## 트러플(Truffle)로 테스트하기 <a id="testing-with-truffle"></a>
트러플은 자동 테스트 프레임워크를 제공합니다. 이 프레임워크를 사용하여 간단하고 관리 가능한 테스트를 작성할 수 있는 방법이 두 가지 있습니다.
* `Javascript` 및 `TypeScript`를 이용하여 블록체인 외부에서 컨트랙트를 실행하는 애플리케이션처럼 작성
* `Solidity`를 활용하여 컨트랙트 함수를 직접 호출

### 1) 시작하기 <a id="1-getting-started"></a>
[트러플을 활용한 배포 가이드](./deploy-guide.md#truffle)를 따라 스마트 컨트랙트를 생성하고 배포하겠습니다. 다만 배포하기 전에 스마트 컨트랙트 테스트를 위해 값 설정 함수 `setGreet` 함수를 추가합니다. 소스 코드는 아래와 같습니다.


**참고:** 테스트를 위해 스마트 컨트랙트의 일부를 수정하였습니다.

아래는 KlaytnGreeting 컨트랙트의 소스 코드입니다.
```
pragma solidity 0.5.6;
contract Mortal {
    /* 주소 타입의 소유자(owner) 변수 정의 */
    address payable owner;
    /* 이 함수는 초기화 시점에 실행되어 컨트랙트 소유자를 설정합니다 */
    constructor () public { owner = msg.sender; }
    /* 컨트랙트에서 자금을 회수하는 함수 */
    function kill() public payable { if (msg.sender == owner) selfdestruct(owner); }
}

contract KlaytnGreeter is Mortal {
    /* 문자열 타입의 변수 greeting 정의 */
    string greeting;
    /* 이 함수는 컨트랙트가 실행될 때 작동합니다 */
    constructor (string memory _greeting) public {
        greeting = _greeting;
    }
    /* 주(Main) 함수 */
    function greet() public view returns (string memory) {
        return greeting;
    }
}

    /* 테스트를 위해 새로 추가된 함수입니다 */
    function setGreet(string memory _greeting) public {
        // 소유자(owner)만 greeting 메세지를 수정할 수 있습니다
        require(msg.sender == owner, "Only owner is allowed.");
        greeting = _greeting;
    }
}
```

1) `greet()` 함수가 "Hello, Klaytn"이라는 메세지를 잘 출력하는지, 2) `setGreet()` 함수가 새로 설정된 greeting 메세지를 잘 출력하고 소유자가 아닌 계정이 greeting을 업데이트하려고 할 때 revert를 하는지 테스트해보겠습니다.

먼저 일반적인 어설션(assertions)을 위해  Chai 어설션 라이브러리를 설치하고 (또는 사용하고 있는 다른 어설션 라이브러리도 괜찮습니다), 스마트 컨트랙트 어설션을 위해 truffle-assertions 라이브러리를 설치합니다.
```
npm install --save-dev chai truffle-assertions
```
### 2) 솔리디티로 테스트 작성하기 <a id="2-writing-test-in-solidity"></a>
솔리디티로 테스트하는 것은 자바스크립트로 테스트하는 것보다 조금 더 직관적일 수 있습니다. 솔리디티 테스트 컨트랙트는 자바스크립트 테스트와 함께 .sol 파일로 제공됩니다.

`test` 폴더에 `TestKlaytnGreeting.sol`이란 이름의 파일을 생성합니다. 트러플 제품군은 테스트를 위한 헬퍼(helper) 라이브러리를 제공하므로, 이들을 불러옵니다. 솔리디티 테스트 예시를 살펴봅시다.
```
pragma solidity ^0.5.6;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/HashMarket.sol";
```
* Assert : `Assert.equals()`, `Assert.greaterThan()` 등과 같은 다양한 테스트 함수에 액세스할 수 있도록 합니다.
* DeployedAddresses : 컨트랙트를 변경할 때마다, 반드시 새 주소로 재배포해야 합니다. 이 라이브러리를 통해 배포된 컨트랙트 주소를 얻을 수 있습니다.

이제 테스트 코드를 작성해 봅시다.
```
pragma solidity ^0.5.6;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/KlaytnGreeter.sol";

contract TestKlaytnGreeter {

    function testGreetingMessage() public {
        // DeployedAddresses.KlaytnGreeter()는 컨트랙트 주소를 다룹니다.
        KlaytnGreeter greeter = KlaytnGreeter(DeployedAddresses.KlaytnGreeter());

        string memory expectedGreet = "Hello Klaytn";

        string memory greet = greeter.greet();

        Assert.equal(greet, expectedGreet, "greeting message should match");
    }
}
```

솔리디티 테스트 코드를 실행하세요.
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


  0 passing (5s)
  1 failing

  1) TestKlaytnGreeter
       testGreetingMessage:
     Error: greeting message should match (Tested: Hello, Klaytn, Against: Hello Klaytn)
      at result.logs.forEach.log (/Users/jieunkim/.nvm/versions/node/v10.16.0/lib/node_modules/truffle/build/webpack:/packages/core/lib/testing/soliditytest.js:71:1)
      at Array.forEach (<anonymous>)
      at processResult (/Users/jieunkim/.nvm/versions/node/v10.16.0/lib/node_modules/truffle/build/webpack:/packages/core/lib/testing/soliditytest.js:69:1)
      at process._tickCallback (internal/process/next_tick.js:68:7)
```
앗, 실패했습니다. 오류 메시지 `Error: greeting message should match (Tested: Hello, Klaytn, Against: Hello Klaytn)`를 확인해봅시다. I can notice the missed `',(comma)'` at *string memory expectedGreet = "Hello Klaytn"*.  
Fix the code and run the test again.
```
$ truffle test
# Output
Using network 'development'.


Compiling your contracts...
===========================
> Compiling ./test/TestKlaytnGreeter.sol



  TestKlaytnGreeter
    ✓ testGreetingMessage (58ms)


  1 passing (5s)
```
축하합니다! 테스트가 통과되었습니다.

### 3) 자바스크립트로 테스트 작성하기 <a id="3-writing-test-in-javascript"></a>
트러플은 자바스크립트 테스트를 위한 견고한 프레임워크를 제공하기 위해 [Mocha](https://mochajs.org/) 테스트 프레임워크 및 [Chai](https://www.chaijs.com/) 어설션 라이브러리를 사용합니다. 자바스크립트 테스트는 더 많은 유연성을 제공하며 더 복잡한 테스트를 작성할 수 있게 합니다.

Let's create a file and name it `0_KlaytnGreeting.js` under `test` directory.  
The test code is:
```javascript
// KlaytnGreeter 컨트랙트와 직접 상호작용
const KlaytnGreeter = artifacts.require("./KlaytnGreeter.sol");
const truffleAssert = require('truffle-assertions');

contract("KlaytnGreeter", async(accounts) => {
    // 컨트랙트 인스턴스를 상위 레벨에 저장해
    // 모든 함수에서 접근할 수 있도록 합니다.
    var klaytnGreeterInstance;
    var owner = accounts[0];
    var greetMsg = "Hello, Klaytn";

    // 각 테스트가 진행되기 전에 실행됩니다.
    before(async function() {
        // set contract instance into a variable
        klaytnGreeterInstance = await KlaytnGreeter.new(greetMsg, {from:owner});
    })

    it("#1 check Greeting message", async function() {
        // set the expected greeting message
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
        var fakeOwner = accounts[1];        
        await truffleAssert.fails(klaytnGreeterInstance.setGreet(greetMsg, { from:fakeOwner }));
    });
});
```
만일 `Mocha` 유닛 테스트에 익숙하지 않다면, [Mocha 문서](https://mochajs.org/#getting-started)를 참조하시길 바랍니다.

* Use contract() instead of describe()  
  Structurally, the Truffle test code shouldn't be much different from the usual test code of Mocha. 테스트에는 Mocha가 자동화된 테스트임을 인지할 수 있도록 하는 코드가 포함되어야 합니다. The difference between Mocha and Truffle test is the contract() function.  
  **NOTE** the use of the `contract()` function, and the `accounts` array for specifying available Klaytn accounts.

* Contract abstractions within your tests  
  Since Truffle has no way of detecting which contract you'll need to interact with during test, you should specify the contract explicitly. 이를 수행하는 한 방법은 `artifacts.require()` 메소드를 사용하는 것입니다.

* `it` syntax  
  This represents each test case with description. 테스트 실행 시 콘솔에 설명이 출력됩니다.

* `truffle-assertion` library  
  This library allows you to easily test reverts or other failures by offering the `truffleAssert.reverts()` and `truffleAssert.fails()` functions.

출력은 다음과 같아야 합니다:
```
Using network 'development'.


Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.



  Contract: KlaytnGreeter
    ✓ #1 check Greeting message
    ✓ #2 update greeting message. (46ms)
    ✓ #3 [Failure test] Only owner can change greeting.


  3 passing (158ms)
```
축하합니다! 테스트가 통과되었습니다.

### 4) 테스트 지정하기 <a id="4-specifying-test"></a>
실행할 테스트 파일을 선택할 수 있습니다.
```
truffle test ./test/0_KlaytnGreeting.js
```

자세한 내용은 [Truffle testing](https://www.trufflesuite.com/docs/truffle/testing/testing-your-contracts) 및 [Truffle commands](https://www.trufflesuite.com/docs/truffle/reference/truffle-commands#test)을 참조하시길 바랍니다.
