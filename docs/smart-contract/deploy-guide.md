# Deploy Guide

There are various ways of deploying smart contract to Klaytn.

## Klaytn IDE

Open up your internet browser and go to https://ide.klaytn.com  


- Add a new file

![](img/deploy-with-ide/deploy-with-ide.001.png)


- Copy and paste the following code (or any code you want to deploy)

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
- Set compiler version. Currently you can choose between 0.4.24 and 0.5.6 (Default is 0.5.6)  

![](img/deploy-with-ide/deploy-with-ide.002.png)


- Click Run tab. At `Environment` dropdown, you can choose network to deploy contract. (Baobab is test network and Cypress is main network)

![](img/deploy-with-ide/deploy-with-ide.003.png)

- After choosing network, import account by clicking on plus button next to `Account`. Make sure to import account that has enough `KLAY` to deploy contract on the network.

![](img/deploy-with-ide/deploy-with-ide.004.png)

- Set gas limit and value to send. 
- You can set higher Gas limit if you are deploying more complicated contract. In this example, you can leave it as it is.
- Set `Value` to 0 unless you want to send `KLAY` to the contract at the time of deployment.
- Enter "Hello World!" as argument for constructor function and click on `Deploy` button. If everything goes successful, deployed contract's instance will show up below.

![](img/deploy-with-ide/deploy-with-ide.005.png)

- You can interact with contract by clicking on the function buttons. Dark blue buttons are `send` functions which can change state on blockchain and consumes gas. Light blue buttons are `call` functions which do not change state and do not require gas fee.   

![](img/deploy-with-ide/deploy-with-ide.006.png)

## Truffle 

Truffle is the most popular framework for smart contract deployment and execution. 

- Install via following  

```
$ sudo npm install -g truffle
```

- Set up project directory, and install `truffle-hdwallet-provider-klaytn` 

```
$ mkdir hello-klaytn
$ cd hello-klaytn
$ truffle init
$ npm install truffle-hdwallet-provider-klaytn
```

- Create `KlaytnGreeter.sol` under `/contracts` directory and copy the following code  

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

- Modify `/migrations/1_initial_migration.js` as following  

```
const Migrations = artifacts.require("./Migrations.sol");
const KlaytnGreeter = artifacts.require("./KlaytnGreeter.sol");
module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(KlaytnGreeter, 'Hello, Klaytn');
};
```

- Set `truffle-config.js` as below. Make sure you enter private key of an account that has enough `KLAY` to deploy contract. 

```
const HDWalletProvider = require("truffle-hdwallet-provider-klaytn");

const privateKey = "0x3de..." // Enter your private key;

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    testnet: {
      provider: () => new HDWalletProvider(privateKey, "https://api.baobab.klaytn.net:8651"),
      network_id: '1001', //Klaytn baobab testnet's network id
      gas: '8500000',
      gasPrice: null
    },
    mainnet: {
      provider: () => new HDWalletProvider(privateKey, "https://api.cypress.klaytn.net:8651"),
      network_id: '8217', //Klaytn mainnet's network id
      gas: '8500000',
      gasPrice: null
    }
  },
  compilers: {
    solc: {
      version: "0.5.6"
    }
  }
};
```
*NOTE*: This example is not recommended for production use. Be very careful when dealing with private keys.  

- Deploying on Klaytn testnet

```
$ truffle deploy --network testnet
```

- Deploying on Klaytn mainnet

```
$ truffle deploy --network mainnet
```

For more details refer to this [link](../toolkit/truffle.md)

## VVISP
vvisp is an easy-to-use cli tool/framework for developing smart contracts, provided by HEACHI LABS. You can easily set environment, deploy and execute Klaytn smart contracts with a single-command. Refer to following link for more details. 
- https://github.com/HAECHI-LABS/vvisp/blob/dev/README_KLAYTN.md

## Solc & Caver-js

Another way to deploy contracts is manually compiling contracts with solc and deploying them with caver-js.

- Create `KlaytnGreeter.sol` and write the following code  

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

- Install solc 0.5.6  

```
$ sudo npm install -g solc@0.5.6
```

- Compile contracts  

```
$ solcjs KlaytnGreeter.sol --bin
```

- Install caver-js  

```
$ npm install caver-js
```

- Create `deploy.js` in the same directory with following code  

```
const Caver = require("caver-js");
const caver = new Caver("https://api.baobab.klaytn.net:8651") // for cypress, use "https://api.cypress.klaytn.net:8651"

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
*NOTE*: This example is not recommended for production use. Be very careful when dealing with private keys.  

- Deploy contracts using node environment  

```
$ node deploy.js
```
