# Kaikas DApp Integration

## Table of Contents

1. [UI Libraries](#1-ui-libraries)
2. [Utility Libraries](#2-utility-libraries)
3. [Providers](#3-providers)


## Introduction
[Kaikas][Kaikas] is a blockchain wallet, similar to [Metamask][Metamask], with additional support for Klaytn-specific [Transactions][Klaytn-Transactions] & [Accounts][Klaytn-Accounts]. This article will guide you through integrating [Kaikas][Kaikas] with a decentralized application (dApp), from High-level (abstract) to Low-level (fine-grained) implementations. 

For the sake of this guide, we will be dividing Kaikas dApp integration into three main categories:

* UI Libraries
* Utility libraries
* Providers


:::note
The aforementioned libraries use `Providers` under the hood. 
:::  


## 1. UI Libraries

Many dApps utilize frontend frameworks for state management & delivering reactive services. The recommended way to integrate Kaikas with such dApps is to use a UI Library built on the same framework.

UI Libraries provide components for user interactions, like `ConnectWallet` component. They also save you the hassle of managing low-level states, like Multiple Accounts & Multiple Networks. You can look at the underlying [Utility Library](#2-utility-libraries) or [Provider](#3-providers) for complex or low-level interactions.

While most UI libraries have built-in support for [Metamask][Metamask], integrating Kaikas is also easy since its [API][Klaytn-API] is built on [Metamask's][Metamask-API]. Even if a library doesn't natively support Kaikas, extending it for Kaikas integration is straightforward. For example, these are 2 popular libraries for [React][React] or [Next.js][Next.js]:

- [Web3Modal](#1i-web3modal-example)
- [Web3-Onboard](#1ii-web3-onboard-example)

### 1i. Web3Modal example

![Web3Modal Hero Banner](https://web3modal.com/images/hero-banner.png)

By [WalletConnect][WalletConnect], [Web3Modal][Web3Modal] offers the following **Features:**

- Buttons + Modals for Connect Wallet, Account information, & Network information
- Support for [Email Wallets][Email Wallets], [Coinbase][Coinbase] accounts, & [EIP-4361][EIP-4361]

**Considerations:**

- Using [@web3modal/wagmi][web3modal-wagmi], you have to commit to their frontend stack of [Wagmi][Wagmi] & [Tanstack Query][Tanstack-Query]
- Requires a `projectId` [signup w/ WalletConnect](https://cloud.walletconnect.com/sign-in)

:::note
Example Code: [kaikas-web3modal](https://github.com/klaytn/examples/tree/main/tools/wallet-libraries/kaikas-web3modal)
:::  

### 1ii. Web3-Onboard example

![Web3-Onboard Graphic](https://onboard.blocknative.com/_app/immutable/assets/connect-modal.b7439c5e.svg)

By [Blocknative][Blocknative], [Web3-Onboard][Web3-Onboard] offers the following **Features:**

- Configurable Onboard text
- Modals for Connect Wallet, Switch Account, & Switch Network
- [Notification Components][Web3-Onboard-customNotifications]
- (Optional) Register API Key(s) to fetch & render real-time data

**Considerations:**

- You'll have to write your Buttons

:::note
Example Code: [kaikas-web3onboard-react](https://github.com/klaytn/examples/tree/main/tools/wallet-libraries/kaikas-web3onboard-react)
::: 

## 2. Utility Libraries

Libraries like [caver-js](#2i-caver-js) & [ethers.js](#2ii-ethersjs-example) abstract just enough to streamline blockchain interactions while still being able to call [Provider](#3-providers) APIs directly.

Using Utility Libraries to connect an account or send native tokens (e.g., KLAY/ETH) will be no different, *in terms of syntax & lines of code*, from calling Providers directly. Where libraries mainly improve are in the following areas:

- Smart Contract interactions
  - These involve ABIs, encoding inputs, & decoding outputs. Without a library, the code for these can be verbose & error-prone.
- Error-handling
  - string error codes/messages are mapped to error Classes with custom properties & methods.
- Documentation & Type-safety

### 2i. caver-js

[caver-js][caver-js] provides first-party support for [Klaytn-specific methods][Klaytn-API]:

- Transaction, Account, & Account Key types
- Fee Delegation

:::note
Example Code: [kaikas-caverjs](https://github.com/klaytn/examples/tree/main/tools/wallet-libraries/kaikas-caverjs)
::: 

### 2ii. ethers.js example

[ethers.js][ethers.js] is the [most popular](https://npmtrends.com/caver-js-vs-ethers-vs-viem-vs-web3) JavaScript Utility Library for interacting with the blockchain. It aims to be:

- Extensive: support for multiple wallet formats, languages, & functions
- Robust: comprehensive tests, documentation, & typing

:::note
Example Code: [kaikas-ethersjs](https://github.com/klaytn/examples/tree/main/tools/wallet-libraries/kaikas-ethersjs)
::: 

## 3. Providers

At the lowest level is the Provider, [`window.klaytn`][Klaytn-Provider] (Kaikas itself). You might prefer [Utility Libraries](#2-utility-libraries), but knowledge of Provider APIs helps debug & understand how dependent libraries work. Referring to [Klaytn's JSON-RPC API][Klaytn-API] is necessary for using Klaytn-specific methods like [`klay_getAccount`][Klaytn-API-getAccount], [`klay_sendTransactionAsFeePayer`][Klaytn-API-sendTransactionAsFeePayer], & more.

[Blocknative]: https://www.blocknative.com
[Coinbase]: https://www.coinbase.com
[EIP-4361]: https://docs.login.xyz/general-information/siwe-overview/eip-4361
[Email Wallets]: https://walletconnect.com/blog/web3modal-web3-email-login-wallets
[Klaytn-Accounts]: https://docs.klaytn.foundation/docs/learn/accounts
[Klaytn-Provider]: https://docs.kaikas.io/02_api_reference/01_klaytn_provider
[Klaytn-Transactions]: https://docs.klaytn.foundation/docs/learn/transactions
[Kaikas]: https://docs.kaikas.io
[Klaytn-API]: https://docs.klaytn.foundation/docs/references/json-rpc
[Klaytn-API-getAccount]: https://docs.klaytn.foundation/docs/references/json-rpc/klay/get-account
[Klaytn-API-sendTransactionAsFeePayer]: https://docs.klaytn.foundation/docs/references/json-rpc/klay/send-transaction-as-fee-payer
[Metamask]: https://metamask.io
[Metamask-API]: https://docs.metamask.io/wallet/reference/json-rpc-api
[Next.js]: https://nextjs.org
[React]: https://react.dev
[Tanstack-Query]: https://tanstack.com/query
[Wagmi]: https://wagmi.sh
[WalletConnect]: https://walletconnect.com
[Web3Modal]: https://web3modal.com
[Web3-Onboard]: https://onboard.blocknative.com
[Web3-Onboard-customNotifications]: https://onboard.blocknative.com/docs/modules/core#customnotification
[caver-js]: https://github.com/klaytn/caver-js
[ethers.js]: https://docs.ethers.io/v6
[web3modal-wagmi]: https://www.npmjs.com/package/@web3modal/wagmi