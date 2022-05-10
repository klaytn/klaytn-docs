# 빠른 시작 안내서<a id="quick-start"></a>

시작하기 전에 몇 가지 Klaytn 관련 용어에 익숙해져 봅시다.

* **엔드포인트 노드 \(EN\)**: Klaytn 네트워크에 대한 JSON-RPC API 요청을 처리하는 노드입니다. 엔드포인트 노드는 합의에 참여하지 않습니다.
* **KLAY**: Klaytn 네이티브(native) 코인.
* **caver-js**: Klaytn JSON-RPC API의 자바스크립트 구현체
* **Baobab**: Klaytn 테스트넷
* **Cypress**: Klaytn 메인넷

이 단계별 가이드는 Baobab 테스트넷의 엔드포인트 노드\(EN\)를 시작하고 새 계정으로 기본 스마트 컨트랙트를 구성하는 과정을 안내합니다. 이 튜토리얼은 EN을 설정하고 EN을 통해 스마트 컨트랙트를 배포하는 두 부분으로 구성됩니다.

> 스마트 컨트랙트를 배포하고 트랜잭션을 제출하려면 트랜잭션 수수료로 KLAY가 필요하기 때문에, 이 가이드는 **Baobab** 테스트넷을 사용합니다. For the development purpose, testnet KLAY can be obtained from the [Baobab faucet](https://baobab.wallet.klaytn.foundation/faucet).

## 1. 엔드포인트 노드를 시작하고 계정에 Baobab 테스트넷 KLAY 받기 \(Linux, Mac\) <a id="1-launch-an-endpoint-node-and-add-baobab-testnet-klay-to-your-account-linux-mac"></a>

이 튜토리얼의 첫 번째 부분에서는 EN을 시작하고, 새 계정을 만들고, Baobab Klaytn Wallet의 Faucet으로 계정에 토큰을 받는 방법에 대해 설명합니다.

* [Endpoint Node 실행](launch-an-en.md)
* [계정에 자금 추가하기](top-up-your-account.md)

## 2. 스마트 컨트랙트 배포: KlaytnGreeter <a id="2-deploying-a-smart-contract-klaytngreeter"></a>

이 가이드의 두 번째 부분은 스마트 컨트랙트를 생성하고 이를 Klaytn Baobab 네트워크에 배포하는 방법을 보여줍니다. 스마트 컨트랙트를 개발하기 전에, 개발 도구를 설정하고 caver-js 및 트러플을 설치해야 합니다.

* [개발 도구 설치하기](install-development-tools.md)
* [스마트 컨트랙트 배포](deploy-a-smart-contract.md)
* [배포 확인](check-the-deployment.md)

