# Testing Guide
In this section, we'll introduce how to test smart contracts. Because any transaction on the blockchain is not reversible, testing your smart contract is crucial before you deploy the contract. 

## Testing with Truffle
Truffle provides an automated testing framework. This framework lets you write simple and manageable tests in two different ways:  
* In `Javascript` and `TypeScript`, for exercising your contracts from the outside world, just like application.
* In `Solidity`, for exercising your contracts in advances, bare-to-the-metal scenarios.

### 1) Getting started
We suppose that you made KlaytnGreeting project and deployed contract. The greeting message is "Hello, Klaytn".


Please refer to following page for deploying : 
* Truffle part of [Deploy guide](./deploy-guide.md).  
**NOTE:** We have made some modifications to the contract for testing.

Below is KlaytnGreeting contract source code.
```
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

    /* Newly added function for testing. */
    function setGreet(string memory _greeting) public {
        // only owner can change greeting message
        require(msg.sender == owner, "Only owner is allowed.");
        greeting = _greeting;
    }
}
```

We will testing 1) `greet()` function whether it returns "Hello, Klaytn" message properly, 2) `setGreet()` function whether it set new greeting message properly and revert when non-owner account attemps to update the greeting.

First we will install the Chai assertions library (or a different assertions library) for generic assertions, and the truffle-assertions library for the smart contract assertions.
```
npm install --save-dev chai truffle-assertions
```
### 2) Wirting test in solidity
 Solidity test contracts live alingside Javascript tests and it can be little more intuitive.

Create a file called `TestKlaytnGreeting.sol` in the `test` folder. The Truffle suite provides us with helper libraries for testing, so we need to import those.
Let's take a look an example Solidity test:
```
pragma solidity ^0.4.20;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/HashMarket.sol";
```
* Assert : It gives us access to various testing functions, like Assert.equals(), Assert.greaterThan(), etc.
* DeployedAddresses : It messages contract addresses and manage deployed address. Since every time you change your contract, you must redeploy it to a new contract address.

Now, Let's wirte a test code.
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

Run your solidity test code.
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
Oops, we failed. Let's check a error message that it said `Error: greeting message should match (Tested: Hello, Klaytn, Against: Hello Klaytn)`.
I can see that missed `',(comma)'` at *string memory expectedGreet = "Hello Klaytn"*.  
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
Congratulations! Your test has passed.

### 3) Writing test in javascript
Truffle uses the [Mocha](https://mochajs.org/) testing framework and [Chai](https://www.chaijs.com/) for assertions to provide you with a solid framework from which to write your Javascript test. Javascript test gives you many more possibilities and enables you to wirte more complex test.

Let's create a file and name it `0_KlaytnGreeting.js` at `test` directory.  
The test code is: 
```
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
If you're unfamiliar with `Mocha` unit test, please check the [Mocha document](https://mochajs.org/#getting-started).

* Use contract() instead of describe()  
Structurally, testing shouldn't be much different from Mocha's. Your tests should contain code that Mocha will recognize as an automated test. The difference between Mocah and Truffle test is the contract() function.  
**NOTE:** Use of the contract() function, the `account` array for specifying available accounts.

* Contract abstractions within your tests  
Since Truffle has no way of detecting which contracts you'll need to interact with during tests, you'll need to ask for those contracts explicitly. One way do this is using the `artifacts.require()` method. 

* `it` syntax
This describes the test we'll write and presents a message for us to know the purpose of the test. You can check test message `"#1 check Greeting message"` from output below.

* `truffle-assertion` library
This library allows you to easily test this revert functionality by offering the truffleAssert.reverts() and truffleAssert.fails() functions.

The output should looks like the following:
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
Congratulations! Your test has passed.

### 4) Specifying test
You can choose the test file to be executed.
```
truffle test ./test/0_KlaytnGreeting.js
```

For more details, please check [Truffle testing](https://www.trufflesuite.com/docs/truffle/testing/testing-your-contracts) and [Truffle commands](https://www.trufflesuite.com/docs/truffle/reference/truffle-commands#test) for details.
