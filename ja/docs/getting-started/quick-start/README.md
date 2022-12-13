# Quick Start <a id="quick-start"></a>

Before you start, let's get familiar with several Klaytn-specific terms.

* **Endpoint Node \(EN\)**: A node that handles the JSON-RPC API requests to the Klaytn network. Endpoint Node does not participate in the consensus.
* **KLAY**: Klaytn native coin.
* **caver-js**: A JavaScript implementation of Klaytn JSON-RPC APIs.
* **Baobab**: Klaytn testnet
* **Cypress**: Klaytn mainnet

This step by step guide will walk you through the process of launching an Endpoint Node \(EN\) of Baobab testnet and building a basic smart contract with your new account. The tutorial consists of two parts, setting up an EN and deploying a smart contract through your EN.

> This guide uses the **Baobab** testnet because deploying a smart contract and submitting a transaction require transaction fees in KLAY. For the development purpose, testnet KLAY can be obtained from the [Baobab faucet](https://baobab.wallet.klaytn.foundation/faucet).

## 1. Launch an Endpoint Node and Add Baobab testnet KLAY to your Account \(Linux, Mac\) <a id="1-launch-an-endpoint-node-and-add-baobab-testnet-klay-to-your-account-linux-mac"></a>

The first part of this tutorial explains how to launch an EN, create a new account, and top up your account with the faucet in the Baobab Klaytn Wallet.

* [エンドポイントノードを起動](launch-an-en.md)
* [アカウントへ入金する](top-up-your-account.md)

## 2. Deploying a Smart Contract: KlaytnGreeter <a id="2-deploying-a-smart-contract-klaytngreeter"></a>

The second of this guide shows how to create smart contracts and deploy them on the Klaytn Baobab network. Before getting into developing smart contracts, you need to set up the development tools, install caver-js and Truffle.

* [開発ツールのインストール](install-development-tools.md)
* [スマートコントラクトを展開する](deploy-a-smart-contract.md)
* [配備を確認してください](check-the-deployment.md)

