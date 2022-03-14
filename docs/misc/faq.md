# FAQ <a id="faq"></a>

- [What is Cypress, what is Baobab?](#what-is-cypress-what-is-baobab)
- [Are there any Klaytn SDKs? In what languages?](#klaytn-sdks)
- [Must I install and run an EN (Endpoint Node) to use Klaytn?](#must-i-install-and-run-en)
- [I am running an EN, and node data sync is too slow.](#node-data-sync-is-too-slow)
- [Can I use ERC-20 and ERC-721 contracts on Klaytn?](#can-i-use-erc-20-and-erc-721)
- [Can I use Truffle for the smart contract development on Klaytn?](#can-i-use-truffle)
- [Where can I get a browser extension wallet like Metamask?](#where-can-i-get-a-browser-extension-wallet)
- [Why is my fee-payer account address not derived from the key provided?](#account-address-is-not-derived-from-the-key)
- [Where can I find complete working samples of fee-delegation?](#fee-delegation-samples)


## What is Cypress, what is Baobab? <a id="what-is-cypress-what-is-baobab"></a>

Cypress is the Klaytn mainnet, Baobab is a testnet.
Below is information relating to each network.

Cypress mainnet:
- EN download : Choose the Cypress package from the [download page](../node/endpoint-node/installation-guide/download.md).
- Klaytnscope : https://scope.klaytn.com
- Klaytn Wallet : https://wallet.klaytn.com

Baobab testnet:
- EN download : Choose the Baobab package from the [download page](../node/endpoint-node/installation-guide/download.md).
- Klaytnscope : https://baobab.scope.klaytn.com
- Klaytn Wallet : https://baobab.wallet.klaytn.com
- Baobab Faucet : https://baobab.wallet.klaytn.com/faucet


## Are there any Klaytn SDKs? In what languages? <a id="klaytn-sdks"></a>

Official Klaytn SDKs are provided in JavaScript and Java.
See [caver-js](../dapp/sdk/caver-js/README.md) and [caver-java](../dapp/sdk/caver-java/README.md). Community contributions are always welcome in providing [Klaytn APIs](../dapp/json-rpc/README.md) in other languages.

To learn about how to build dApps using Klaytn SDK, see [Tutorials](../dapp/tutorials/README.md).

Also, check the porting guidelines [from web3.js](../dapp/sdk/caver-js/v1.4.1/porting-from-web3.js.md) and [from web3j](../dapp/sdk/caver-java/v1.4.0/porting-from-web3j.md). Because the syntactic of caver-js and caver-java are very similar to web3.js and web3j, porting should be minimal and very straightforward. But, no, you can not use web3.js or web3j to make a request against Klaytn.



## Must I install and run an EN (Endpoint Node) to use Klaytn? <a id="must-i-install-and-run-en"></a>

Yes and No.
Endpoint node validates the blocks and exposes RPC APIs to the outer world. EN is always needed for your application to interact with the Klaytn network.
For those who simply want to try Klaytn APIs, you can try [KAS (Klaytn API Service)](https://www.klaytnapi.com).
KAS provides Klaytn Node API service that exposes RPC APIs of Klaytn networks (both Baobab and Cypress) as well as other useful API services.
Note that KAS serves free API requests after user registration. For pricing plans, please refer to [KAS pricing page](https://www.klaytnapi.com/landing/pricing).


## I am running an EN, and node data sync is too slow. <a id="node-data-sync-is-too-slow"></a>

First, check if your HW specification meets the [system requirements](../node/endpoint-node/system-requirements.md).

Check the [fast sync](../node/endpoint-node/installation-guide/configuration.md#fast-sync-optional).
Klaytn publishes the chain data every day. Chain data is a database snapshot that stores all blocks generated since the genesis. Download the latest chain data for the fast sync.



## Can I use ERC-20 and ERC-721 contracts on Klaytn? <a id="can-i-use-erc-20-and-erc-721"></a>

Yes. Klaytn supports Solidity as a smart contract language. [ERC-20](../smart-contract/sample-contracts/erc-20/README.md) and [ERC-721](../smart-contract/sample-contracts/erc-721/README.md) written in Solidity for Etherem can be deployed and executed on Klaytn.

Further Klaytn-specific token standards can be defined. Follow the [KIP (Klaytn Improvement Proposal)](http://kips.klaytn.com) and join the discussion.



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


## Where can I find complete working samples of fee-delegation? <a id="fee-delegation-samples"></a>

Check [fee-delegation-example](../dapp/tutorials/fee-delegation-example.md) to get a complete working code of value transfer.

See the [JavaScript code snippet](https://gist.github.com/w3kim/64a3cf5da58250474f046d4dd7f85cc8) for deploying a contract with fee-delegation. Note that you can not use Truffle for the contract deployment with fee-delegation.

[Sending a transaction with multiple signer](../dapp/sdk/caver-js/v1.4.1/getting-started_1.4.1.md#sending-a-transaction-with-multiple-signer) gives a good explanation about two different ways of collecting signatures.
Relevant caver-js APIs are as follows. Take a look at the code examples in the API description.
- [caver.klay.accounts.signTransaction](../dapp/sdk/caver-js/v1.4.1/api-references/caver.klay.accounts.md#signtransaction)
- [caver.klay.accounts.feePayerSignTransaction](../dapp/sdk/caver-js/v1.4.1/api-references/caver.klay.accounts.md#feepayersigntransaction)
- [caver.klay.accounts.combinesignatures](../dapp/sdk/caver-js/v1.4.1/api-references/caver.klay.accounts.md#combinesignatures)
- [caver.klay.sendSignedTransaction](../dapp/sdk/caver-js/v1.4.1/api-references/caver.klay/transaction.md#sendsignedtransaction)
