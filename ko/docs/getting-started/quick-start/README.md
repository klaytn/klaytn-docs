# 빠른 시작 안내서<a id="quick-start"></a>

![](../images/klaytnXken.png)

Before you start, let's get familiar with several Klaytn-specific terms.

* **엔드포인트 노드 \(EN\)**: Klaytn 네트워크에 대한 JSON-RPC API 요청을 처리하는 노드입니다. 엔드포인트 노드는 합의에 참여하지 않습니다.
* **KLAY**: Klaytn 네이티브(native) 코인.
* **caver-js**: Klaytn JSON-RPC API의 자바스크립트 구현체
* **Baobab**: Klaytn 테스트넷
* **Cypress**: Klaytn 메인넷

This step by step guide will walk you through the process of launching an Endpoint Node \(EN\) of Baobab testnet and building a basic smart contract with your new account. The tutorial consists of two parts, setting up an EN and deploying a smart contract through your EN.

> 스마트 컨트랙트를 배포하고 트랜잭션을 제출하려면 트랜잭션 수수료로 KLAY가 필요하기 때문에, 이 가이드는 **Baobab** 테스트넷을 사용합니다. For the development purpose, testnet KLAY can be obtained from the [Baobab faucet](https://baobab.wallet.klaytn.foundation/faucet).

## 1. 엔드포인트 노드를 시작하고 계정에 Baobab 테스트넷 KLAY 받기 \(Linux, Mac\) <a id="1-launch-an-endpoint-node-and-add-baobab-testnet-klay-to-your-account-linux-mac"></a>

The first part of this tutorial explains how to launch an EN, create a new account, and top up your account with the faucet in the Baobab Klaytn Wallet.

* [Launch an Endpoint Node](launch-an-en.md)
* [Top up your Account](top-up-your-account.md)

## 2. 스마트 컨트랙트 배포: KlaytnGreeter <a id="2-deploying-a-smart-contract-klaytngreeter"></a>

The second of this guide shows how to create smart contracts and deploy them on the Klaytn Baobab network. Before getting into developing smart contracts, you need to set up the development tools, install caver-js and Truffle.

* [Install Development Tools](install-development-tools.md)
* [Deploy a Smart Contract](deploy-a-smart-contract.md)
* [Check the Deployment](check-the-deployment.md)

