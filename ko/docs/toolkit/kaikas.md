# Kaikas <a id="kaikas"></a>

Kaikas는 Klaytn 네트워크를 위한 웹 브라우저 확장 프로그램 지갑입니다. Kaikas는 구글 크롬과 모질라 파이어폭스에서 사용 가능하며, 웹 브라우저를 통해 Klaytn 네트워크와 상호 작용할 수 있는 안전하고 유용한 방법을 제공합니다. Kaikas를 통해 KLAY를 포함한 Klaytn 기반 토큰들을 보관하거나 전송할 수 있습니다. You are also able to sign requests from web-based Klaytn BApps (Blockchain Applications) in realtime.

* 크롬 웹 스토어 다운로드: [link](https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi)
* 파이어폭스 애드온 스토어 다운로드: [link](https://addons.mozilla.org/ko/firefox/addon/kaikas/)

Kaikas와 연동하여 BApp을 개발하고자 하시는 분들은 [https://docs.kaikas.io](https://docs.kaikas.io)에서 자세한 내용을 참고하시기 바랍니다.

## PC 웹 브라우저 기반의 탈중앙화 HD 월렛

Kaikas는 크롬과 파이어폭스 웹 브라우저의 확장 프로그램으로 작동됩니다. Kaikas는 데스크탑 브라우저 환경에서 최적화된 애플리케이션입니다.

Kaikas offers manageability of user accounts and keys. Kaikas의 모든 트랜잭션 내용은 Klaytn에 기록되며, 누구든지 Klaytn 네트워크의 블록 탐색기인 [Klaytnscope](./klaytnscope.md)를 통해 확인할 수 있습니다.

Kaikas는 단일 시드 구문으로 트리 구조의 키를 무한대로 생성하는 '계층 결정적(Hierarchical Deterministic)' 지갑으로 개발됐습니다.  시드 구문은 니모닉 코드 단어(mnemonic code words)로 구성되어 일반적인 숫자 및 알파벳 조합의 시드 대비 기억하고 보관하기 쉽습니다. Users' private keys are encrypted and stored in their browsers.

Kaikas는 위와 같은 구조를 통해 지갑 사용성, 편의성은 물론 투명성과 보안성을 높였습니다. However, it is vital for users to be responsible for managing their personal accounts. For example, if a user couldn't remember his/her seed phrase, there would be no other way to restore his/her accounts.

## 클레이튼 기반의 다양한 환경과 토큰 지원

Kaikas는 KLAY를 포함한 모든 종류의 Klaytn 기반 토큰을 지원합니다. Kaikas에 디폴트로 탑재되지 않은 코인이라도 토큰 어드레스를 등록해 이용하실 수 있습니다. 뿐만 아니라, 사용자가 직접 개발한 클레이튼 기반의 커스텀 토큰을 Kaikas에 추가해 보관하거나 지인에게 전송할 수도 있습니다.

사용자는 Klaytn의 Baobab 테스트넷과 Cypress 메인넷 환경에서 Kaikas를 이용할 수 있습니다. Moreover, Kaikas supports the private chains for Klaytn-based blockchain application developers who may wish to circulate custom tokens in their private network.

## 웹기반 BApp에서 요청하는 트랜잭션 서명 수행

Kaikas simply bridges the gap between you and Klaytn BApps, empowering you to sign transactions/data flowing to you from BApps with Kaikas account. Kaikas is also an aidful utility for developers to handle [fee-delegated transactions](/docs/klaytn/design/transactions/README.md#fee-delegation). Using Kaikas, both transaction senders and fee payers can swiftly sign the fee-delegated transactions.
