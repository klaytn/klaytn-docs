# Kaikas

Kaikas는 Klaytn 네트워크를 위한 웹 브라우저 확장 프로그램 지갑입니다. Available in Google Chrome, Kaikas provides a secure and usable means to interact with the Klaytn network via web browser. Kaikas를 통해 KLAY를 포함한 Klaytn 기반 토큰들을 보관하거나 전송할 수 있습니다. You are also able to sign requests from web-based Klaytn BApps \(Blockchain Applications\) in realtime.

* 크롬 웹 스토어 다운로드: [link](https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi)

Kaikas와 연동하여 BApp을 개발하고자 하시는 분들은 [https://docs.kaikas.io](https://docs.kaikas.io)에서 자세한 내용을 참고하시기 바랍니다.

## PC 웹 브라우저 기반의 탈중앙화 HD 월렛

Kaikas is a web browser extension available in Chrome. Kaikas는 데스크탑 브라우저 환경에서 최적화된 애플리케이션입니다.

Kaikas는 사용자 계정과 계정 키를 쉽게 관리하도록 돕습니다. All transactions are transparently recorded on the Klaytn blockchain, so anybody can access the transaction history by using [Klaytnscope](klaytnscope.md).

Kaikas is a Hierarchical Deterministic \(HD\) wallet, meaning that it generates a hierarchical tree-like structure of private/public keys indefinitely from a single seed phrase. 시드 구문은 니모닉 코드 단어(mnemonic code words)로 구성되어 일반적인 숫자 및 알파벳 조합의 시드 대비 기억하고 보관하기 쉽습니다. 사용자 개인키는 암호화되어 사용자 웹 브라우저에 저장됩니다.

Kaikas는 위와 같은 구조를 통해 지갑 사용성, 편의성은 물론 투명성과 보안성을 높였습니다. 하지만, 사용자는 자신의 개인 계정을 책임지고 관리해야 합니다. 예를 들어, 사용자가 자신의 시드 구문을 기억하지 못하면 사용자 계정을 복구할 수 있는 방법은 없습니다.

## 클레이튼 기반의 다양한 환경과 토큰 지원

Kaikas는 KLAY를 포함한 모든 종류의 Klaytn 기반 토큰을 지원합니다. Kaikas에 디폴트로 탑재되지 않은 코인이라도 토큰 어드레스를 등록해 이용하실 수 있습니다. 뿐만 아니라, 사용자가 직접 개발한 클레이튼 기반의 커스텀 토큰을 Kaikas에 추가해 보관하거나 지인에게 전송할 수도 있습니다.

사용자는 Klaytn의 Baobab 테스트넷과 Cypress 메인넷 환경에서 Kaikas를 이용할 수 있습니다. 더불어, Kaikas는 개인 네트워크에서 커스톰 토큰을 발행하려는 Klaytn BApp 개발자를 위해 프라이빗 체인도 지원합니다.

## 웹기반 BApp에서 요청하는 트랜잭션 서명 수행

Kaikas는 개발자 여러분과 Klaytn BApp을 잇는 다리이며, Kaikas 계정으로 여러 BApp에서 들어오는 트랜잭션/데이터에 서명할 수 있도록 합니다. Kaikas is also an aidful utility for developers to handle [fee-delegated transactions](https://github.com/ground-x/klaytn-docs/tree/879a4ff51d970839781ead9e87f3843eeb54915e/klaytn/design/transactions/README.md#fee-delegation). Kaikas를 사용하면 트랜잭션 발신자와 수수료 납부자 모두 수수료 위임 트랜잭션에 매우 손쉽게 서명할 수 있습니다.

