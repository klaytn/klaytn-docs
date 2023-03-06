![](./images/Klaytn-ether.js.png)

# Introduction

[ethers.js](https://docs.ethers.org/v5/) is a JavaScript library that allows developers to interact with EVM-compatible blockchain networks like Klaytn. With Klaytn supporting features for [Ethereum Equivalence](https://medium.com/klaytn/using-ethereum-tools-in-klaytn-dc068d48de04), Ethereum tools such as ethers.js can be used on Klaytn without any significant modifications.

Thus, developers can leverage this compatibility and use the ethers.js library to interact with a Klaytn node.

In this guide, you'll learn how to use the ethers.js library to send a transaction, read data from the blockchain and interact with an existing contract on the Klaytn Network.


# Prerequisites

* Code-Editor: a source-code editor such as [VS-Code](https://code.visualstudio.com/download).
* [Metamask](https://docs.klaytn.foundation/dapp/tutorials/connecting-metamask#install-metamask): used to deploy the contracts, sign transactions and interact with the contracts.
* RPC Endpoint: you can get this from one of the supported [Endpoint Providers](https://docs.klaytn.foundation/content/dapp/json-rpc/public-en).
* Test KLAY from [Faucet](https://baobab.wallet.klaytn.foundation/faucet): fund your account with sufficient KLAY.
* [NodeJS and NPM](https://nodejs.org/en/)


# Setup Project

To get started, you need to create a project directory to house the files to be created in this guide.

```js
mkdir ethers-sample
cd ethers-sample
```

## Install ethers.js

To install ethers.js, run the following command in your terminal:

```js
npm install --save ethers
```

## Initialize ethers.js

In this tutorial, we would be creating a bunch of script files to send transactions, read data from the blockchain, and also interact with an existing smart contract. To get started, you need to know how to initialize ethers.js for each of your script files.


Import `ethers` into your script file.

```js
const ethers = require('ethers');
```


After successfully importing ethers, you need to connect to Klaytn by instantiating a new ethers.js `JsonRpcProvider` object with an RPC URL of the Klaytn network. Add the code below to the existing code:

```js
const url = 'RPC URL';
const provider = new ethers.JsonRpcProvider(url)
```

# Reading data from the blockchain

To read data from the blockchain, create a new `read.js` file in your project folder by running this command:

```bash
touch read.js
```

After creating this file, initialize ethers as done in the `initialize` section. In this section, you will learn how to read data from the blockchain (e.g., blockNumber, KLAY balance).

To see this in action, paste the following code in your `read.js`.


```js
async function getBlockNumber() {
    const blocknumber = await provider.getBlockNumber()
    console.log("blocknumber", blocknumber)
    
}

async function getKlayBalance() {

    const klayBalance  = await provider.getBalance("paste wallet address")
    const formatBalance = ethers.formatEther(klayBalance)
    console.log(`You have ${formatBalance} KLAY`)
    
}

// call the functions below:
getBlockNumber()
getKlayBalance()

```

**Output**

To run the script and read data from the blockchain, you can run the following command in your terminal: 

```bash
node read.js
```

If the transaction was succesful, you'll see the block number and user’s KLAY balance in your terminal.


# Sending a transaction to the blockchain

To send a transaction to the blockchain, create a new `send.js` file in your project folder by running this command:

```bash
touch send.js
```

After creating this file, initialize ethers as done in the `initialize` section. In this section, you will learn how to send a transaction to the blockchain (e.g., send KLAY to an address).

To see this in action, paste the following code in your `send.js`.

```js
const privKey = “Paste Privatekey”
const signer = new ethers.Wallet(privKey, provider)


async function sendTx() {

    const tx = await signer.sendTransaction({
               to: "0x8B93b7d7Ed0960e9A0090851334e19b3c451E4E9",
               value: 90000000000,
               maxFeePerGas: 250000000000,
               maxPriorityFeePerGas: 250000000000,
               gasLimit: 21000,
           })
    
    const receipt = await tx.wait()
    console.log(receipt);
    
}

// call the function
sendTx();
```

**Output**

To run the script and send data to the blockchain, you can run the following command in your terminal: 

```bash
node send.js
```

If the transaction was succesful, you'll see the transaction receipt been logged in your terminal.

# Interact with smart contracts

To interact with an existing smart contract on Klaytn, create a new `interact.js` file in your project folder by running this command:


```bash
touch interact.js
```

After creating this file, initialize ethers as done in the `initialize` section. In this section, you will use ethers.js to interact with a smart contract on Klaytn by instantiating a `Contract` object using the ABI and address of a deployed contract:

For the purpose of this guide, a simple_storage contract was compiled and deployed on [Remix IDE](https://docs.klaytn.foundation/content/dapp/tutorials/connecting-remix). We will be sending a transaction to the contract by calling the `store` function and also reading from it by calling the `retrieve` function.


To see this in action, paste the following code in your `interact.js`.

```js
// replace with your contract abi
const abi = [
    {
        "inputs": [],
        "name": "retrieve",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "num",
                "type": "uint256"
            }
        ],
        "name": "store",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

// replace with your contract address
const contractAddress = "0x472a1226796b6a0918DC78d40b87d750881fdbDC";

// // For write-only contracts, provide a Signer object instead of a Provider object:

const contract = new ethers.Contract(contractAddress, abi, signer);


// send transaction to smart contract
// modify contract
async function setValue(value) {
    const tx = await contract.store(value);
    console.log(tx.hash);
}

// read contract data

async function retrieveValue() {
    const value = await contract.retrieve();
    console.log(value);
}

// call the following functions
setValue(value)
retrieveValue()
```


**Output**

To run the script and interact with smart contracts, you can run the following command in your terminal: 

```js
node interact.js
```

If the transaction was successful, in your terminal you'll see the transaction hash and the value stored.

For more in-depth guide on ethers.js, please refer to [ethers.js docs](https://docs.ethers.org/v5/)