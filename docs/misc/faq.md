# FAQ <a id="faq"></a>

- [What is Cypress, what is Baobab?](#what-is-cypress-what-is-baobab)
- [Are there any Klaytn SDKs? In what languages?](#klaytn-sdks)
- [Must I install and run an EN (Endpoint Node) to use Klaytn?](#must-i-install-and-run-en)
- [I am running EN, and node data sync is too slow.](#node-data-sync-is-too-slow)
- [Can I use ERC-20 and ERC-721 contracts on Klaytn?](#can-i-use-erc-20-and-erc-721)
- [Can I use Truffle for the smart contract development on Klaytn?](#can-i-use-truffle)
- [Where can I get a browser extension wallet like Metamask?](#where-can-i-get-a-browser-extension-wallet)
- [Why is my fee-payer account address not derived from the key provided?](#account-address-is-not-derived-from-the-key)


## What is Cypress, what is Baobab? <a id="what-is-cypress-what-is-baobab"></a>

Cypress is the Klaytn mainnet, Baobab is a testnet.
Below is information relating to each network.

Cypress mainnet:
- EN download : Choose the Cypress package from the [download page](../node/endpoint-node/installation-guide/download.md).
- Public EN : https://api.cypress.klaytn.net:8651
- Klaytnscope : https://scope.klaytn.com
- Klaytn Wallet : https://wallet.klaytn.com

Baobab testnet:
- EN download : Choose the Baobab package from the [download page](../node/endpoint-node/installation-guide/download.md).
- Public EN : https://api.baobab.klaytn.net:8651
- Klaytnscope : https://baobab.scope.klaytn.com
- Klaytn Wallet : https://baobab.wallet.klaytn.com
- Baobab Faucet : https://baobab.wallet.klaytn.com/faucet


## Are there any Klaytn SDKs? In what languages? <a id="klaytn-sdks"></a>

Official Klaytn SDKs are provided in JavaScript and Java.
See [caver-js](../bapp/sdk/caver-js/README.md) and [caver-java](../bapp/sdk/caver-java/README.md). Community contributions are always welcome in providing [Klaytn APIs](../bapp/json-rpc/README.md) in other languages.

To learn about how to build BApp using Klaytn SDK, see [Tutorials](../bapp/tutorials/README.md).

Also, check the porting guidelines [from web3.js](../bapp/sdk/caver-js/porting-from-web3.js.md) and [from web3j](../bapp/sdk/caver-java/porting-from-web3j.md). Because the syntactic of caver-js and caver-java are very similar to web3.js and web3j, porting should be minimal and very straightforward. But, no, you can not use web3.js or web3j to make a request against Klaytn.



## Must I install and run an EN (Endpoint Node) to use Klaytn? <a id="must-i-install-and-run-en"></a>

Yes and No.
There are public ENs you can simply connect to. Note that they are provided as a testing purpose without SLA. Do not use them in production.

- Cypress Public EN : https://api.cypress.klaytn.net:8651
- Baobab Public EN : https://api.baobab.klaytn.net:8651

KAS (Klaytn API Service), similar to Infura for Ethereum, will be released in 1H 2020. With KAS, you can use Klaytn without running own Endpoint Node.



## I am running an EN, and node data sync is too slow. <a id="node-data-sync-is-too-slow"></a>

First, check if your HW specification meets the [system requirements](../node/endpoint-node/system-requirements.md).

Check the [fast sync](../node/endpoint-node/installation-guide/configuration.md#fast-sync-optional).
Klaytn publishes the chain data every day. Download the lasted chain data for the fast sync.



## Can I use ERC-20 and ERC-721 contracts on Klaytn? <a id="can-i-use-erc-20-and-erc-721"></a>

Yes. Klaytn Virtual Machine (KLVM) is compatible with EVM bytecode. [ERC-20](../smart-contract/sample-contracts/erc-20/README.md) and [ERC-721](../smart-contract/sample-contracts/erc-20/README.md) written in Solidity for Etherem can be deployed and executed on Klaytn.

Further Klaytn-specific token standards can be defined. Follow the [KIP (Klaytn Improvement Proposal)]() and join the discussion.



## Can I use Truffle for the smart contract development on Klaytn? <a id="can-i-use-truffle"></a>

Yes. Truffle can be used in developing smart contracts on Klaytn with [truffle-hdwallet-provider-klaytn](https://www.npmjs.com/package/truffle-hdwallet-provider-klaytn).
See [Truffle](../toolkit/truffle.md) and follow the configuration guideline.

If you are new to Truffle, see [Testing Guide](../smart-contract/testing-guide.md) and [Deployment Guide](../smart-contract/deploy-guide.md) to get a rough idea on what you can do with Truffle.


## Where can I get a browser extension wallet like Metamask? <a id="where-can-i-get-a-browser-extension-wallet"></a>

No official browser wallets at the moment.

Kaikas, a browser extension wallet of Klaytn will be released in 1H 2020.



## Why is my fee-payer account address not derived from the key provided? <a id="account-address-is-not-derived-from-the-key"></a>

In Klaytn, [the account address can be decoupled from the key pair](../klaytn/design/accounts.md#decoupling-key-pairs-from-addresses).

Common use cases are as follows.
- The account owner wants to change the key for security reasons.
- The account has a weighted-multisig or a role-based key that allows having multiple key pairs to control the account.

Fee-payer accounts usually have a [role-based key](../klaytn/design/accounts.md#accountkeyrolebased). In most cases, the account address is not derived from the RoleFeePayer key.



