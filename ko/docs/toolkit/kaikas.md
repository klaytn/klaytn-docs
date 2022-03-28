# Kaikas <a id="kaikas"></a>

Kaikas는 Klaytn 네트워크를 위한 웹 브라우저 확장 프로그램 지갑입니다. Kaikas는 구글 크롬과 모질라 파이어폭스에서 사용 가능하며, 웹 브라우저를 통해 Klaytn 네트워크와 상호 작용할 수 있는 안전하고 유용한 방법을 제공합니다. Kaikas를 통해 KLAY를 포함한 Klaytn 기반 토큰들을 보관하거나 전송할 수 있습니다. You are also able to sign requests from web-based dApps (Decentralized Applications) in realtime.

* 크롬 웹 스토어 다운로드: [link](https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi)

For developers, please visit [https://docs.kaikas.io](https://docs.kaikas.io) to learn how you can develop dApps using Kaikas.

## PC 웹 브라우저 기반의 탈중앙화 HD 월렛

Kaikas는 크롬과 파이어폭스 웹 브라우저의 확장 프로그램으로 작동됩니다. Kaikas는 데스크탑 브라우저 환경에서 최적화된 애플리케이션입니다.

Kaikas는 사용자 계정과 계정 키를 쉽게 관리하도록 돕습니다. All transactions are transparently recorded on the Klaytn blockchain, so anybody can access the transaction history by using [Klaytnscope][].

Kaikas는 단일 시드 구문(single seed phrase)으로 트리 구조의 키를 무한대로 생성하는 '계층 결정적(Hierarchical Deterministic)' 지갑으로 개발됐습니다. 시드 구문은 니모닉 코드 단어(mnemonic code words)로 구성되어 일반적인 숫자 및 알파벳 조합의 시드 대비 기억하고 보관하기 쉽습니다. 사용자 개인키는 암호화되어 사용자 웹 브라우저에 저장됩니다.

Kaikas는 위와 같은 구조를 통해 지갑 사용성, 편의성은 물론 투명성과 보안성을 높였습니다. 하지만, 사용자는 자신의 개인 계정을 책임지고 관리해야 합니다. 예를 들어, 사용자가 자신의 시드 구문을 기억하지 못하면 사용자 계정을 복구할 수 있는 방법은 없습니다.

## 클레이튼 기반의 다양한 환경과 토큰 지원

Kaikas는 KLAY를 포함한 모든 종류의 Klaytn 기반 토큰을 지원합니다. Kaikas에 디폴트로 탑재되지 않은 코인이라도 토큰 어드레스를 등록해 이용하실 수 있습니다. 뿐만 아니라, 사용자가 직접 개발한 클레이튼 기반의 커스텀 토큰을 Kaikas에 추가해 보관하거나 지인에게 전송할 수도 있습니다.

사용자는 Klaytn의 Baobab 테스트넷과 Cypress 메인넷 환경에서 Kaikas를 이용할 수 있습니다. Moreover, Kaikas supports the private chains for Klaytn-based dApp developers who may wish to circulate custom tokens in their private network.

## Signing web-based dApp transactions

Kaikas simply bridges the gap between you and dApps, empowering you to sign transactions/data flowing to you from dApps with Kaikas account. 또 Kaikas는 [fee-delegated transactions](/klaytn/design/transactions/README.md#fee-delegation)를 다루는 개발자들에게 매우 유용한 유틸리티입니다. Kaikas를 사용하면 트랜잭션 발신자와 수수료 납부자 모두 수수료 위임 트랜잭션에 매우 손쉽게 서명할 수 있습니다.


[Klaytnscope]: ./klaytnscope.md
