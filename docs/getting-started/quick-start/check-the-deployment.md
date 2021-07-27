# Check the Deployment <a id="check-the-deployment"></a>

## Checking the Deployed Byte Code using caver-js <a id="checking-the-deployed-byte-code-using-caver-js"></a>

Use `getCode` for checking the byte code of the deployed smart contract.

First, create a test file and open it.

```bash
$ touch test-klaytn.js
$ open test-klaytn.js
```

Write the following test code. Make sure you enter the contract address you just deployed.

```javascript
// test-klaytn.js
const Caver = require('caver-js');
const caver = new Caver('http://127.0.0.1:8551');
// enter your smart contract address
const contractAddress = '0x65ca27ed42abeef230a37317a574058ff1372b34'
caver.klay.getCode(contractAddress).then(console.log);
```

Run the code.

```bash
$ node test-klaytn.js
0x60806040526004361061004c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806341c0e1b514610051578063cfae321714610068575b600080fd5b34801561005d57600080fd5b506100666100f8565b005b34801561007457600080fd5b5061007d610189565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100bd5780820151818401526020810190506100a2565b50505050905090810190601f1680156100ea5780820380516001836020036101000a031916815260200191505b509250505060405180...
```

## Calling functions in the Deployed Smart Contract <a id="calling-functions-in-the-deployed-smart-contract"></a>

Use JavaScript to call the `greet()` in the contract.

**NOTE**: In order to call specific functions in smart contracts, you need an ABI \(Application Binary Interface\) file. When Truffle deploys your contract, it automatically creates .json file at `./build/contracts/` which contains `abi` property.

Append the following lines to the test code written above.

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

Run the test code.

```bash
$ node test-klaytn.js
0x60806040526004361061004c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806341c0e1b514610051578063cfae321714610068575b600080fd5b34801561005d57600080fd5b506100666100f8565b005b34801561007457600080fd5b5061007d610189565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100bd5780820151... # This is from caver.klay.getCode
Hello, Klaytn # This is from KlyatnGreeter.methods.greet()
```

**If you got "Hello, Klaytn", you've completed the task. Congrats!**

