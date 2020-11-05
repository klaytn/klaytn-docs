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
- 퍼블릭 EN : https://api.cypress.klaytn.net:8651
- Klaytnscope : https://scope.klaytn.com
- Klaytn Wallet : https://wallet.klaytn.com

Baobab 테스트넷:
- EN 다운로드 : [다운로드 페이지](../node/endpoint-node/installation-guide/download.md)에서 Baobab 패키지를 선택하십시오.
- 퍼블릭 EN : https://api.baobab.klaytn.net:8651
- Klaytnscope : https://baobab.scope.klaytn.com
- Klaytn Wallet : https://baobab.wallet.klaytn.com
- Baobab Faucet : https://baobab.wallet.klaytn.com/faucet


## Klaytn SDK가 있나요? 어떤 언어를 지원하나요? <a id="klaytn-sdks"></a>

공식 Klaytn SDK는 JavaScript 및 Java로 제공됩니다. [caver-js](../bapp/sdk/caver-js/README.md)와 [caver-java](../bapp/sdk/caver-java/README.md)를 참조하세요. 다른 언어로 [Klaytn API](../bapp/json-rpc/README.md)를 제공하기 위한  커뮤니티의 참여는 언제나 환영합니다.

Klaytn SDK를 사용하여 BApp을 구축하는 방법에 대한 자세한 내용은 [튜토리얼](../bapp/tutorials/README.md)을 확인하세요.

Also, check the porting guidelines [from web3.js](../bapp/sdk/caver-js/v1.4.1/porting-from-web3.js.md) and [from web3j](../bapp/sdk/caver-java/v1.4.0/porting-from-web3j.md). caver-js 및 caver-java의 구문은 web3.js 및 web3j와 매우 유사하므로 최소의 노력으로 간단하게 포팅할 수 있습니다. 그러나, web3.js 또는 web3j를 사용하여 Klaytn에 직접 요청을 보낼 수는 없다는 점을 기억하세요.



## Klaytn을 사용하려면 엔드포인트 노드(Endpoint Node, EN)를 반드시 설치하고 실행해야하나요? <a id="must-i-install-and-run-en"></a>

상황에 따라 다릅니다. 엔드포인트 노드는 블록의 유효성을 검사하고 RPC API를 외부 세계에 노출합니다. 애플리케이션이 Klaytn 네트워크와 상호 작용하려면 항상 EN이 필요합니다. 단순히 Klaytn API를 시험해보고자 하는 사람들은 퍼블릭 EN에 연결해 사용할 수 있습니다. 퍼블릭 EN은 SLA없이 테스트 목적으로 제공된다는 점을 기억하세요. 상용 서비스에서 퍼블릭 EN을 사용하지는 마세요.

- Cypress 퍼블릭 EN : https://api.cypress.klaytn.net:8651
- Baobab 퍼블릭 EN : https://api.baobab.klaytn.net:8651

이더리움의 Infura와 유사한 KAS(Klaytn API Service)를 2020년 상반기에 출시할 예정입니다. KAS를 사용하면 자체적인 엔드포인트 노드 운영 없이 Klaytn을 사용할 수 있습니다.



## EN을 실행하는데 노드 데이터 동기화가 너무 느립니다. <a id="node-data-sync-is-too-slow"></a>

우선 HW 사양이 [시스템 요구 사항](../node/endpoint-node/system-requirements.md)을 만족하는지 확인하세요.

[패스트 싱크(Fast Sync)](../node/endpoint-node/installation-guide/configuration.md#fast-sync-optional) 방법을 확인하세요. Klaytn은 매일 체인 데이터를 게시합니다. 체인 데이터는 Genesis 이후 생성된 모든 블록을 저장하고 있는 데이터베이스의 스냅샷입니다. 패스트 싱크를 위해 최신 체인 데이터를 다운로드하세요.



## Klaytn에서 ERC-20 및 ERC-721 컨트랙트를 사용할 수 있나요? <a id="can-i-use-erc-20-and-erc-721"></a>

예. Klaytn은 스마트 컨트랙트 언어로 솔리디티(Solidity)를 지원합니다. [ERC-20](../smart-contract/sample-contracts/erc-20/README.md) and [ERC-721](../smart-contract/sample-contracts/erc-721/README.md) written in Solidity for Etherem can be deployed and executed on Klaytn.

Klaytn에 특화된 토큰 표준이 추가로 정의될 수 있습니다. Follow the [KIP (Klaytn Improvement Proposal)](http://kips.klaytn.com) and join the discussion.



## Klaytn의 스마트 컨트랙트 개발에 트러플(Truflle)을 사용할 수 있나요? <a id="can-i-use-truffle"></a>

예. [truffle-hdwallet-provider-klaytn](https://www.npmjs.com/package/truffle-hdwallet-provider-klaytn)을 이용하면 트러플로 Klaytn의 스마트 컨트랙트를 개발할 수 있습니다. [트러플(Truffle)](../toolkit/truffle.md)에 설명되어 있는  설정 방법을 참고하세요.

트러플이 처음이라면 [테스트 가이드](../smart-contract/testing-guide.md)와 [배포 가이드](../smart-contract/deploy-guide.md)를 통해 트러플이 지원하는 기능을 이해할 수 있습니다.


## Metamask와 같은 브라우저 확장 지갑은 어디서 구할 수 있나요? <a id="where-can-i-get-a-browser-extension-wallet"></a>

현재 공식 브라우저 지갑은 없습니다.

Klaytn의 브라우저 확장 지갑인 Kaikas는 2020년 상반기에 출시될 예정입니다.



## 트랜잭션 수수료 납부자의 계정 주소가 제공받은 키로 도출되지 않습니다.<a id="account-address-is-not-derived-from-the-key"></a>

Klaytn은 [계정 주소를 키 쌍과 분리할 수 있습니다](../klaytn/design/accounts.md#decoupling-key-pairs-from-addresses).

일반적인 사용 사례는 다음과 같습니다.
- 계정 소유자가 보안상의 이유로 키를 변경하고자 할 때.
- 계정이 가중치 기반 다중 서명(weighted-multisig) 또는 역할기반 키(role-based key)를 사용하는 경우, 이는 계정을 제어하기 위해 여러 개의 키 쌍을 가지는 것을 허용합니다.

수수료 납부자 계정은 일반적으로 [역할 기반 키](../klaytn/design/accounts.md#accountkeyrolebased)를 가집니다. 대부분의 경우 이 계정 주소는 RoleFeePayer 키로부터 도출되지 않습니다.


## 수수료 위임을 구현한 온전한 샘플코드를 어디에서 볼 수 있을까요? <a id="fee-delegation-samples"></a>

[트랜잭션 수수료 위임 예시](../bapp/tutorials/fee-delegation-example.md)에 밸류 트랜스퍼(Value Transfer)를 구현한 전체 코드가 제공되니 참고하세요.

컨트랙트 배포 방법은 [자바 스크립트 코드](https://gist.github.com/w3kim/64a3cf5da58250474f046d4dd7f85cc8)를 참조하세요. 트러플로는 수수료를 위임하여 컨트랙트를 배포할 수 없습니다.

[다중 서명된 트랜잭션 보내기](../bapp/sdk/caver-js/v1.4.1/getting-started_1.4.1.md#sending-a-transaction-with-multiple-signer)에 여러 개의 서명을 취합하는 두 가지 방법이 잘 설명되어 있습니다. 관련 caver-js API는 다음과 같습니다. API 설명에 있는 코드 예제를 살펴보세요.
- [caver.klay.accounts.signTransaction](../bapp/sdk/caver-js/v1.4.1/api-references/caver.klay.accounts.md#signtransaction)
- [caver.klay.accounts.feePayerSignTransaction](../bapp/sdk/caver-js/v1.4.1/api-references/caver.klay.accounts.md#feepayersigntransaction)
- [caver.klay.accounts.combinesignatures](../bapp/sdk/caver-js/v1.4.1/api-references/caver.klay.accounts.md#combinesignatures)
- [caver.klay.sendSignedTransaction](../bapp/sdk/caver-js/v1.4.1/api-references/caver.klay/transaction.md#sendsignedtransaction)
