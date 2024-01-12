# Deploy Smart Contracts

There are various ways of deploying a smart contract on Klaytn. This document provides a step-by-step guide to deploy a sample contract using various tools. We assume that you have a Klaytn account with enough KLAY to pay the transaction fee. To create an account, please visit [Klaytn Wallet](../../tools/wallets/klaytn-wallet.md).

## Remix Online IDE <a id="remix-ide"></a>

Open your internet browser and go to [Klaytn Plugin for Remix](https://ide.klaytn.foundation).

1. Add a new file.

![](/img/build/smart-contracts/01_deployment_ide.png)

2. Copy and paste the following sample code (or any code you want to deploy) in the new file. The code consists of two contracts called Mortal and KlaytnGreeter, and it allows you to run a simple "Hello World!".

```
pragma solidity 0.5.12;

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

3. Select Compiler in the icon panel. Choose the desired EVM environment. For the Klaytn networks, you can choose between Baobab (testnet) and Cypress (mainnet). Click `Compile` when the sample code is ready to be complied before actual deployment.

![](/img/build/smart-contracts/02_deployment_compile.png)

4. Now we can deploy the contract. Click on the Klaytn logo in the icon panel. Import an account by clicking the plus button next to `Account`. Make sure that the account has sufficient KLAY to pay for the transaction of deploying the smart contracts required.

![](/img/build/smart-contracts/05_deployment_account.png)

5. Set Gas limit and Value to send.

- You may need to set higher Gas limit if you are deploying a more complicated contract. In this example, you can leave it as it is.
- Set `Value` to 0 unless you want to send `KLAY` to the contract at the time of deployment.

6. Enter "Hello World!" as an argument for constructor function and click on `Deploy` button.

![](/img/build/smart-contracts/03_deployment_hello.png)

7. If the contract is successfully deployed, you will see the corresponding transaction receipt and detailed result in the terminal.

8. You can interact with the contract by clicking on the function buttons. The functions are represented in different colors. `constant` or `pure` functions in Solidity have blue bottons (`greet` in the example) and do not create a new transaction, so they don't cost any gas. Red buttons (`kill` in the example) represent `payable` functions that change the state on the blockchain, consume gas and can accept value. Orange buttons are for `non-payable` functions that change the contract state but do NOT accept a value.

![](/img/build/smart-contracts/06_deployment_functions.png)

For more details, please refer to this [link](../ide-and-tools/ide-and-tools.md).

## VVISP <a id="vvisp"></a>

vvisp is an easy-to-use CLI tool/framework for developing smart contracts, provided by HEACHI LABS. You can easily set environment, deploy and execute Klaytn smart contracts with a single command. Refer to the following link for more details.

- https\://henesis.gitbook.io/vvisp/deploying-smart-contracts

## solc & caver-js <a id="solc-caver-js"></a>

Another way to deploy contracts is manually compiling contracts with solc and deploying them with caver-js.

1. Create `KlaytnGreeter.sol` and write the following code.

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
}
```

2. Install solc 0.5.6.

```
$ sudo npm install -g solc@0.5.6
```

3. Compile the contract.

```
$ solcjs KlaytnGreeter.sol --bin
```

4. Install caver-js.

```
$ npm install caver-js.
```

5. Create `deploy.js` in the same directory with the following code.

```
const Caver = require("caver-js");
const caver = new Caver("https://public-en-baobab.klaytn.net")

const walletInstance = caver.klay.accounts.privateKeyToAccount(
  '0x3de0c9...' // enter your private key to deploy contract with
);
caver.klay.accounts.wallet.add(walletInstance);

const fs = require('fs')
const bytecode = fs.readFileSync('./KlaytnGreeter_sol_KlaytnGreeter.bin') // compiled output

const constructorType = ['string']  // enter appropriate constructor type
const constructorValue = ['Hello, Klaytn!']

const params = caver.klay.abi.encodeParameters(constructorType, constructorValue);

caver.klay.sendTransaction({
  from: caver.klay.accounts.wallet[0].address,
  gas: "50000000",
  data: bytecode.toString() + params.substring(2, params.length)
})
.once("receipt", receipt => {
  console.log(receipt)
})
.once("error", error => {
  console.log(error);
})
```

_NOTE_: This example is not recommended for production use. Be very careful when dealing with private keys.

6. Deploy the contract using node environment.

```
$ node deploy.js
```
