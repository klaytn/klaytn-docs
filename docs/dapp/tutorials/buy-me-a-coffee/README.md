# Building a Buy-Me-A-Coffee dApp

## Table of Contents <a href="#table-of-contents" id="table-of-contents"></a>

* [1. Project Setup](1.-project-setup.md)
* [2. Creating a Buy Me A Coffee Smart Contract](2.-creating-bmc-contract.md)
* [3. Testing the contract’s functionalities using scripts](3.-testing-bmc-contract-using-scripts.md)
* [4. Deploying BMC Smart contract to Klaytn Testnet ](4.-deploying-bmc-contract.md)
* [5. Building the BMC Frontend with React and Web3Onboard](5.-bmc-frontend-with-react-and-web3onboard.md)
* [6. Deploying Frontend code on IPFS using Fleek](6.-deploying-frontend-to-fleek.md)
* [7. Conclusion](7.-conclusion.md)

## Introduction <a href="#1-introduction" id="1-introduction"></a>
Buy Me a Coffee (BMC) is a platform where creators get monetary support and donations from their fans or audience. These creators could be writers, artists, musicians, video creators, et al. With the help of this platform, fans may play a significant role in the success stories of creators, audiences can express their appreciation for the job that creators accomplish, and creators can monetize their work.

On a high level, Buy-me-a-Coffee simplifies the process of accepting payments for creators and enhances interactions between creators and audiences. These and more are some of the exciting features on the BMC platform. On the bright side, imagine this platform on the blockchain. Creators will now get access to more benefits, such as:

- Complete payment, as opposed to traditional BMC, which charges 5% on any support received by the creator.
- Transparency because all transactions are recorded on the blockchain.
- Directly receive support fees from fans without any intermediary.
- Decentralization, i.e., there is no central authority controlling the platform.

In this tutorial. you will build a decentralized version of the Buy Me a Coffee (BMC) platform (frontend + smart contract). This platform will be a minimalistic implementation of the traditional BMC platform where supporters can tip you, and you will be able to withdraw any tips that are delivered to the BMC smart contract as the contract's owner. Supporters will be able to send test KLAY and lovely messages together in a coffee transaction using this site. 

By the end of this guide, you will have used the following to create this dApp: 
- Solidity: to write the BMC smart contract
- NextJs and Tailwind: for building a frontend website for our BMC dApp
- Web3Onboard: to enable multiple wallet connections to Klaytn Testnet Baobab.
- Fleek: with Fleek we can host our BMC dApp on IPFS.

## Prerequisites <a href="#2-prerequisites" id="2-prerequisites"></a>
To complete this tutorial, you will need:
- [Node.js](https://nodejs.org/en/download/package-manager) 
- Familiarity with Javascript and React basics such as hooks etc
- Installation of  the necessary wallets, such as [Coinbase Wallet](https://www.coinbase.com/wallet/downloads), and [Metamask Wallet](https://metamask.io/download/)
- Test KLAY from [Faucet](https://baobab.wallet.klaytn.foundation/faucet).
- RPC Endpoint: you can obtain this from one of the supported [endpoint providers](https://docs.klaytn.foundation/content/dapp/json-rpc/public-en).
- Creation of an account on [Fleek](https://app.fleek.co/).
