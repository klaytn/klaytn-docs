# A Beginner's Guide to Klaytn BApp

## Who sould read this document
This page is for developers who are new to BApp. We introduce process of creating Klaytn-based decentralized blockchain application.

## What is BApp?
DApp is abbreviated form for Decentralized Application. If you are already familiar with DApps, you can understand Klaytn's BApp in the simillar way. If not, you need to understand what BApp(Blockchain Application) is. Just as Apple and Goole provide an echosystem for building platforms and createing apps on OS, blockchain platforms(ex. Klaytn, Ethereum, EOS etc.) can also create and run application on them. Blockchain application has following features:
* It's open source and operate autonomously without any entity controlling majority.
* Storing data on blockchain.(once data is stored on the blockchain, it can't be reverted or transformed.)

## The steps one needs to undertake
BApp development isn't a simple plug-n-play project, it requires some programming skills. Also, you may need to choose one of the many development tools that works for you. This guide doesn't intend to cover details of it, rather it provides high-level overview of the steps.

Here's high-level overview of what a developer needs to do, step-by-step, to create and launch a Klaytn BApp.

1. Learn Klaytn  
BApp needs to follow a specific conceptual framework of `Klaytn`, and the only way to understand that is to learn Klaytn.  
For e.g., a BApp must be open-source and it must operate autonomously without any entity controlling majority of the crypto tokens. If you want to privide service with fee delegation, you need to understand how to fee-delegated transaction is working.

2. Meet software requirement  
There are two main development environments for implementing DApps. The backend  for creating and deploying smart contracts, and the frontend for implementing user interfaces. In order to build BApp, we need a few dependencies first

    * Node  
    the most first dependency is Node.js and npm wich comes with Node.js.  
    **NOTE:** we recommand install Nodejs by using [Node Package Manager](https://nodejs.org/en/).

    * Truffle Framework
    While there are many blockchain clients the developer can choose, we recommend [Truffle](https://www.trufflesuite.com/truffle) for a new developer. It's development environment, testing fromework and asset pipeline for blockcahins using Klaytn Virtual Machine, aiming to make life as a developer easier.
    If you want to do quick install, refer [development tool](../quick-start/install-development-tools.md) page.

    * Ganache
    Ganache is a local in-memory blockchain. You can install Ganache by [downloading it from the Truffle Framework website](https://www.trufflesuite.com/ganache). It will give a 10 external accounts with addresses on our local blockcahin. Each account is preloaded with fake ether.

3. Communicatie with the blockcahin  
The easist and most common tool to communicate with the Klaytn blockchain is `caver`. You can install caver with npm in your command line and if you wannt to know how to use it refer [caver-js](../../bapp/sdk/caver-java/porting-from-web3j.md)

4. Learn smart contract languages  
You can develop smart contract by using programming languages below.
    * [solidity](https://solidity.readthedocs.io/en/v0.5.6/) - The most popular language on Ethereum. It's procedural programming language using syntax similar to Javascript, C ++, Python.
    * [vyper](https://vyper.readthedocs.io/en/v0.1.0-beta.12/) - Security focused language, based on Python.  
    * Another language : [Bamboo](https://github.com/pirapira/bamboo), [LLL](https://lll-docs.readthedocs.io/en/latest/lll_introduction.html), [Flint](https://docs.flintlang.org)

     `Solidity` is the proprieraty language of Ethereum to write smart contracts. Klaytn also supports Solidity for contract development. It is a feature-rich langauge specifically designed for this purpose. A BApp can have its frontend code in any language, but the backend code must comprise smart contracts, hence this learning is also non-negotiable for a now BApp developer.

5. Code smart contract  
A developer coding smart contracts must follow the following broad guidelines for effectiveness:

    * Keep the computing logic and storage requirements minimal, because executing smart contracts require `gas` a measure of computing power. The `gas price` that is a certain number of crypto tokens must be paid. That means Klaytn, native cryptocurrency, needs to be spent on executing a smart contract. Simple computing logic requires less gas.
    * The code must avoid complexity, because the more complex the code is, the higher is the likelihood of errors. The outcome of a smart contract is irreversible, hence coding simple error-free smart contracts is imperative.
    * You should be aware of the known security issues for developing your contract. Please refer to [Smart contract Security Best Practices](https://consensys.github.io/smart-contract-best-practices/).

6. Deply your smart contract  
    You can deploy your smart contract by using Truffle or on [IDE](https://ide.klaytn.com/). The tool suite recommended is `Truffle` because it has the following advantages
    * A directory allows the developer to maintain all smart contracts
    * The tool can easily blend into the testing framework because the scripts can deploy the contracts in the test environment, run `truffle test`, and run regular tests.
    * Deployment using this tool suite is simple, and the required parameters can be set in the truffle-config.js file.   

    Deploy your smart contract(s) by typing `truffle deploy`.  
    **NOTE:**  the Ganache or testrpc must be running in another window.

7. Invoke the smart contract  
    Calls to the smart contracts must be in hexadecimal strings, however, there are Ethereum `contract application binary interface(ABI)` libraries to help with that.   

    ABI is interface between two program modules or OS and user program. It defines how data structures and functions are used in machine code. In Klaytn, [The Contract ABI]((https://solidity.readthedocs.io/en/v0.5.6/abi-spec.html)) is used to encode contract calls in the KVM and read data from transactions. The contrac's ABI is stored as a JSON array of function description and events.

8. Transact with the smart contract  
    When you have some klay and storing it in your account, you're ready to transact using the Klay. There are 3 ways to make transaction.

    1\) Transfer to another address as a value.  
    2\) Call a contract function which will update the state of the network, which requires gas to process your update.   
    3\) Involve a contract that updates the state of the network and accepts Klay as payment. The developer also needs to pay the fees.

9. Useful resources  
Following are the resources for the individual steps:  

    1\) [Klaytn Design](../../klaytn/design/README.md)  
    2\) [Truffle](https://github.com/trufflesuite/ganache-cli)  
    3\) [caver](../../bapp/sdk/README.md)  
    4\) [Solidity](https://solidity.readthedocs.io/en/v0.5.11/introduction-to-smart-contracts.html)  
    5\) [Github material for Truffle](https://github.com/trufflesuite/truffle)  
    6\) [material for ABI library](https://solidity.readthedocs.io/en/v0.5.11/introduction-to-smart-contracts.html)  
    7\) [Klaytn web wallet](https://wallet.klaytn.com/)

---
It was a lot of stuff. If you're feeling overwhelmed, we suggest you to take it slow and refer to this simple [tutorial](../../bapp/tutorials/bapp-on-baobab-video-lecture/1.-introduction.md).
