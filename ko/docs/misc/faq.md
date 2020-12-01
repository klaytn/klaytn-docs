# FAQ <a id="faq"></a>

- [Cypress, Baobab이 무엇인가요?](#what-is-cypress-what-is-baobab)
- [Klaytn SDK가 있나요? 어떤 언어를 지원하나요?](#klaytn-sdks)
- [Klaytn을 사용하려면 엔드포인트 노드(Endpoint Node, EN)를 반드시 설치하고 실행해야하나요?](#must-i-install-and-run-en)
- [EN을 실행하는데 노드 데이터 동기화가 너무 느립니다.](#node-data-sync-is-too-slow)
- [Klaytn에서 ERC-20 및 ERC-721 컨트랙트를 사용할 수 있나요?](#can-i-use-erc-20-and-erc-721)
- [Klaytn의 스마트 컨트랙트 개발에 트러플(Truflle)을 사용할 수 있나요?](#can-i-use-truffle)
- [Metamask와 같은 브라우저 확장 지갑은 어디서 구할 수 있나요?](#where-can-i-get-a-browser-extension-wallet)
- [트랜잭션 수수료 납부자의 계정 주소가 제공받은 키로 도출되지 않습니다.](#account-address-is-not-derived-from-the-key)
- [수수료 위임을 구현한 온전한 샘플코드를 어디에서 볼 수 있을까요?](#fee-delegation-samples)


## Cypress, Baobab이 무엇인가요? <a id="what-is-cypress-what-is-baobab"></a>

Cypress는 Klaytn의 메인넷 이름이고, Baobab은 테스트넷입니다. 아래는 각 네트워크와 관련된 정보입니다.

Cypress 메인넷:
- EN 다운로드 : [다운로드 페이지](../node/endpoint-node/installation-guide/download.md)에서 Cypress 패키지를 선택하십시오.
- Klaytnscope : https://scope.klaytn.com
- Klaytn Wallet : https://wallet.klaytn.com

Baobab 테스트넷:
- EN 다운로드 : [다운로드 페이지](../node/endpoint-node/installation-guide/download.md)에서 Baobab 패키지를 선택하십시오.
- Klaytnscope : https://baobab.scope.klaytn.com
- Klaytn Wallet : https://baobab.wallet.klaytn.com
- Baobab Faucet : https://baobab.wallet.klaytn.com/faucet


## Klaytn SDK가 있나요? 어떤 언어를 지원하나요? <a id="klaytn-sdks"></a>

공식 Klaytn SDK는 JavaScript 및 Java로 제공됩니다. [caver-js](../bapp/sdk/caver-js/README.md)와 [caver-java](../bapp/sdk/caver-java/README.md)를 참조하세요. 다른 언어로 [Klaytn API](../bapp/json-rpc/README.md)를 제공하기 위한  커뮤니티의 참여는 언제나 환영합니다.

Klaytn SDK를 사용하여 BApp을 구축하는 방법에 대한 자세한 내용은 [튜토리얼](../bapp/tutorials/README.md)을 확인하세요.

Also, check the porting guidelines [from web3.js](../bapp/sdk/caver-js/v1.4.1/porting-from-web3.js.md) and [from web3j](../bapp/sdk/caver-java/v1.4.0/porting-from-web3j.md). caver-js 및 caver-java의 구문은 web3.js 및 web3j와 매우 유사하므로 최소의 노력으로 간단하게 포팅할 수 있습니다. 그러나, web3.js 또는 web3j를 사용하여 Klaytn에 직접 요청을 보낼 수는 없다는 점을 기억하세요.



## Klaytn을 사용하려면 엔드포인트 노드(Endpoint Node, EN)를 반드시 설치하고 실행해야하나요? <a id="must-i-install-and-run-en"></a>

상황에 따라 다릅니다. 엔드포인트 노드는 블록의 유효성을 검사하고 RPC API를 외부 세계에 노출합니다. 애플리케이션이 Klaytn 네트워크와 상호 작용하려면 항상 EN이 필요합니다. For those who simply want to try Klaytn APIs, you can try [KAS (Klaytn API Service)](https://www.klaytnapi.com). KAS provides Klaytn Node API service that exposes RPC APIs of Klaytn networks (both Baobab and Cypress) as well as other useful API services. Note that KAS serves free API requests after user registration. For pricing plans, please refer to [KAS pricing page](https://www.klaytnapi.com/landing/pricing).


## EN을 실행하는데 노드 데이터 동기화가 너무 느립니다. <a id="node-data-sync-is-too-slow"></a>

First, check if your HW specification meets the [system requirements](../node/endpoint-node/system-requirements.md).

Check the [fast sync](../node/endpoint-node/installation-guide/configuration.md#fast-sync-optional). Klaytn publishes the chain data every day. Chain data is a database snapshot that stores all blocks generated since the genesis. Download the latest chain data for the fast sync.



## Klaytn에서 ERC-20 및 ERC-721 컨트랙트를 사용할 수 있나요? <a id="can-i-use-erc-20-and-erc-721"></a>

Yes. Klaytn supports Solidity as a smart contract language. [ERC-20](../smart-contract/sample-contracts/erc-20/README.md) and [ERC-721](../smart-contract/sample-contracts/erc-721/README.md) written in Solidity for Etherem can be deployed and executed on Klaytn.

Further Klaytn-specific token standards can be defined. Follow the [KIP (Klaytn Improvement Proposal)](http://kips.klaytn.com) and join the discussion.



## Klaytn의 스마트 컨트랙트 개발에 트러플(Truflle)을 사용할 수 있나요? <a id="can-i-use-truffle"></a>

Yes. Truffle can be used in developing smart contracts on Klaytn with [truffle-hdwallet-provider-klaytn](https://www.npmjs.com/package/truffle-hdwallet-provider-klaytn). See [Truffle](../toolkit/truffle.md) and follow the configuration guideline.

If you are new to Truffle, see [Testing Guide](../smart-contract/testing-guide.md) and [Deployment Guide](../smart-contract/deploy-guide.md) to get a rough idea on what you can do with Truffle.


## Metamask와 같은 브라우저 확장 지갑은 어디서 구할 수 있나요? <a id="where-can-i-get-a-browser-extension-wallet"></a>

No official browser wallets at the moment.

Kaikas, a browser extension wallet of Klaytn will be released in 1H 2020.



## 트랜잭션 수수료 납부자의 계정 주소가 제공받은 키로 도출되지 않습니다.<a id="account-address-is-not-derived-from-the-key"></a>

In Klaytn, [the account address can be decoupled from the key pair](../klaytn/design/accounts.md#decoupling-key-pairs-from-addresses).

Common use cases are as follows.
- The account owner wants to change the key for security reasons.
- The account has a weighted-multisig or a role-based key that allows having multiple key pairs to control the account.

Fee-payer accounts usually have a [role-based key](../klaytn/design/accounts.md#accountkeyrolebased). In most cases, the account address is not derived from the RoleFeePayer key.


## 수수료 위임을 구현한 온전한 샘플코드를 어디에서 볼 수 있을까요? <a id="fee-delegation-samples"></a>

Check [fee-delegation-example](../bapp/tutorials/fee-delegation-example.md) to get a complete working code of value transfer.

See the [JavaScript code snippet](https://gist.github.com/w3kim/64a3cf5da58250474f046d4dd7f85cc8) for deploying a contract with fee-delegation. Note that you can not use Truffle for the contract deployment with fee-delegation.

[Sending a transaction with multiple signer](../bapp/sdk/caver-js/v1.4.1/getting-started_1.4.1.md#sending-a-transaction-with-multiple-signer) gives a good explanation about two different ways of collecting signatures. Relevant caver-js APIs are as follows. Take a look at the code examples in the API description.
- [caver.klay.accounts.signTransaction](../bapp/sdk/caver-js/v1.4.1/api-references/caver.klay.accounts.md#signtransaction)
- [caver.klay.accounts.feePayerSignTransaction](../bapp/sdk/caver-js/v1.4.1/api-references/caver.klay.accounts.md#feepayersigntransaction)
- [caver.klay.accounts.combinesignatures](../bapp/sdk/caver-js/v1.4.1/api-references/caver.klay.accounts.md#combinesignatures)
- [caver.klay.sendSignedTransaction](../bapp/sdk/caver-js/v1.4.1/api-references/caver.klay/transaction.md#sendsignedtransaction)
