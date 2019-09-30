# Quick Start

시작하기 전, 몇 가지 Klaytn 관련 용어에 익숙해져 봅시다.

* **Endpoint Node \(EN\)**: A node that handles the JSON-RPC API requests to the Klaytn network. Endpoint Node는 합의에 참여하지 않습니다.
* **KLAY**: Klaytn native coin.
* **caver-js**: A JavaScript implementation of Klaytn JSON-RPC APIs.
* **Baobab**: Klaytn testnet
* **Cypress**: Klaytn mainnet

이 단계별 가이드는 Baobab 테스트넷의 Endpoint Node\(EN\)를 시작하고 새 계정으로 기본 스마트 컨트랙트를 구성하는 과정을 안내합니다. 이 튜토리얼은 EN을 설정하고 EN을 통해 스마트 컨트랙트를 배포하는 두 부분으로 구성됩니다.

> This guide uses the **Baobab** testnet because deploying a smart contract and submitting a transaction require transaction fees in KLAY. 개발 목적으로, [Baobab Faucet](https://baobab.wallet.klaytn.com/faucet)에서 테스트넷 KLAY를 얻을 수 있습니다.

## 1. Endpoint Node를 시작하고 계정에 Baobab 테스트넷 KLAY 추가하기 \(Linux, Mac\)

이 튜토리얼의 첫 번째 부분에서는 EN을 시작하고, 새 계정을 만들고, Baobab Klaytn Wallet의 Faucet으로 계정에 자금을 추가하는 방법에 대해 설명합니다.

* [Launch an Endpoint Node](launch-an-en.md)
* [Top up your Account](top-up-your-account.md)

## 2. 스마트 컨트랙트 배포: KlaytnGreeter

이 가이드의 두 번째 부분은 스마트 컨트랙트를 생성하고 이를 Klaytn Baobab 네트워크에 배포하는 방법을 보입니다. 스마트 컨트랙트를 개발하기 전에, 개발 도구를 설정하고 caver-js 및 Truffle을 설치해야 합니다.

* [Install Development Tools](install-development-tools.md)
* [Deploy a Smart Contract](deploy-a-smart-contract.md)
* [Check the Deployment](check-the-deployment.md)

