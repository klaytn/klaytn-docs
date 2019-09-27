# 테스트 가이드

이 섹션에서는 스마트 컨트랙트를 테스트하는 방법을 소개합니다. 블록체인의 그 어떤 트랜잭션도 되돌릴 수 없으므로 스마트 컨트랙트를 배포하기 전에 테스트하는 것이 중요합니다.

## Truffle로 테스트하기

Truffle은 자동 테스트 프레임워크를 제공합니다. 이 프레임워크를 사용하여 간단하고 관리 가능한 테스트를 작성할 수 있는 방법이 두 가지 있습니다.

* 어플리케이션과 같이 외부에서 컨트랙트를 실행할 때 `Javascript` 및 `TypeScript`를 활용
* 베어 메탈 머신의 경우 미리 컨트랙트를 실행해볼 때 `Solidity`를 활용

### 1) 시작하기

[Truffle을 활용한 배포 가이드](./deploy-guide.md#truffle)를 따라 스마트 컨트랙트를 생성하고 배포하겠습니다. 아직 배포하기 전에 스마트 컨트랙트 테스트 목적을 위해 값 설정 함수 `setGreet` 함수를 추가합니다. 소스 코드는 아래와 같습니다.

**참고:** 테스트를 위해 스마트 컨트랙트의 일부를 수정하였습니다.

아래는 KlaytnGreeting 컨트랙트의 소스 코드입니다.

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
    

1) `greet()` 함수가 "Hello, Klaytn"이라는 메세지를 잘 출력하는지, 2) `setGreet()` 함수가 새로 설정된 greeting 메세지를 잘 출력하고 소유자가 아닌 계정이 greeting을 업데이트하려고 할 때 revert를 하는지 테스트해보겠습니다.

먼저 일반적인 단언문(assertions)을 위해 Chai 단언문 라이브러리를 설치하고 (또는 사용하고 계신 다른 단언문 라이브러리도 괜찮습니다), 스마트 컨트랙트 단언문을 위해 truffle-assertions 라이브러리를 설치합니다.

    npm install --save-dev chai truffle-assertions
    

### 2) 솔리디티로 테스트 작성하기

솔리디티로 테스트하는 것은 자바스크립트로 테스트하는 것보다 조금 더 직관적일 수 있습니다. 솔리디티 테스트 컨트랙트는 자바스크립트 테스트와 함께 .sol 파일로 제공됩니다.

`test` 폴더에 `TestKlaytnGreeting.sol`이란 이름의 파일을 생성합니다. The Truffle suite provides us with helper libraries for testing, so we need to import those. Let's take a look at the example Solidity test:

    pragma solidity ^0.5.6;
    
    import "truffle/Assert.sol";
    import "truffle/DeployedAddresses.sol";
    import "../contracts/HashMarket.sol";
    

* Assert : It gives us access to various testing functions, like `Assert.equals()`, `Assert.greaterThan()`, etc.
* DeployedAddresses : Every time you change your contract, you must redeploy it to a new address. You can get the deployed contract addresses through this library. 

Now, Let's wirte a test code.

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
    

Run your solidity test code.

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
    

Oops, we failed. Let's check the error message,`Error: greeting message should match (Tested: Hello, Klaytn, Against: Hello Klaytn)`. I can notice the missed `',(comma)'` at *string memory expectedGreet = "Hello Klaytn"*.  
Fix the code and run the test again.

    $ truffle test
    # Output
    Using network 'development'.
    
    
    Compiling your contracts...
    ===========================
    > Compiling ./test/TestKlaytnGreeter.sol
    
    
    
      TestKlaytnGreeter
        ✓ testGreetingMessage (58ms)
    
    
      1 passing (5s)
    

Congratulations! Your test has passed.

### 3) Writing test in JavaScript

Truffle uses the [Mocha](https://mochajs.org/) testing framework and [Chai](https://www.chaijs.com/) assertion library to provide a solid framework for JavaScript test. JavaScript test gives you more flexibility and enables you to write more complex tests.

Let's create a file and name it `0_KlaytnGreeting.js` under `test` directory.  
The test code is:

```javascript
// Interacting directly with KlaytnGreeter contract
const KlaytnGreeter = artifacts.require("./KlaytnGreeter.sol");
const truffleAssert = require('truffle-assertions');

contract("KlaytnGreeter", async(accounts) => {
    // store the contract instance at a higher level 
    // to enable access from all functions.
    var klaytnGreeterInstance;
    var owner = accounts[0];
    var greetMsg = "Hello, Klaytn";

    // This will run before each test proceed.
    before(async function() {
        // set contract instnace into a variable
        klaytnGreeterInstance = await KlaytnGreeter.new(greetMsg, {from:owner});
    })

    it("#1 check Greeting message", async function() {
        // set the expected greeting messge
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

If you are unfamiliar with `Mocha` unit test, please check the [Mocha document](https://mochajs.org/#getting-started).

* Use contract() instead of describe()  
    Structurally, the Truffle test code shouldn't be much different from the usual test code of Mocha. Your test should contain the code that Mocha will recognize it as an automated test. The difference between Mocha and Truffle test is the contract() function.  
    **NOTE** the use of the `contract()` function, and the `accounts` array for specifying available Klaytn accounts.

* Contract abstractions within your tests  
    Since Truffle has no way of detecting which contract you'll need to interact with during test, you should specify the contract explicitly. One way to do this is by using the `artifacts.require()` method.

* `it` syntax  
    This represents each test case with description. The description will print on the console on test-run.

* `truffle-assertion` library  
    This library allows you to easily test reverts or other failures by offering the `truffleAssert.reverts()` and `truffleAssert.fails()` functions.

The output should like the following:

    Using network 'development'.
    
    
    Compiling your contracts...
    ===========================
    > Everything is up to date, there is nothing to compile.
    
    
    
      Contract: KlaytnGreeter
        ✓ #1 check Greeting message
        ✓ #2 update greeting message. (46ms)
        ✓ #3 [Failure test] Only owner can change greeting.
    
    
      3 passing (158ms)
    

Congratulations! Your test has passed.

### 4) Specifying test

You can choose the test file to be executed.

    truffle test ./test/0_KlaytnGreeting.js
    

For more details, please check [Truffle testing](https://www.trufflesuite.com/docs/truffle/testing/testing-your-contracts) and [Truffle commands](https://www.trufflesuite.com/docs/truffle/reference/truffle-commands#test) for details.