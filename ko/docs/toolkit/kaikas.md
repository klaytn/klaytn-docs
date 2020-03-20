# Kaikas <a id="kaikas"></a>

Kaikas는 Klaytn 네트워크를 위한 웹 브라우저 확장 프로그램 지갑입니다. Kaikas는 구글 크롬과 모질라 파이어폭스에서 사용 가능하며, 웹 브라우저를 통해 Klaytn 네트워크와 상호 작용할 수 있는 안전하고 유용한 방법을 제공합니다. Kaikas를 통해 KLAY를 포함한 Klaytn 기반 토큰들을 보관하거나 전송할 수 있습니다. 그리고 웹 기반 블록체인 애플리케이션(BApp)과 실시간 연동해 트랜잭션 서명을 대신 수행할 수 있습니다.

* 크롬 웹 스토어 다운로드: [link](https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi)
* 파이어폭스 애드온 스토어 다운로드: [link](https://addons.mozilla.org/ko/firefox/addon/kaikas/)

Kaikas와 연동하여 BApp을 개발하고자 하시는 분들은 [https://docs.kaikas.io](https://docs.kaikas.io)에서 자세한 내용을 참고하시기 바랍니다.

## PC 웹 브라우저 기반의 탈중앙화 HD 월렛

Kaikas는 크롬과 파이어폭스 웹 브라우저의 확장 프로그램으로 작동됩니다. Kaikas는 데스크탑 브라우저 환경에서 최적화된 애플리케이션입니다.

Kaikas는 사용자가 스스로 자신의 계정과 보안키를 생성 및 관리하는 구조입니다. Kaikas의 모든 트랜잭션 내용은 Klaytn에 기록되며, 누구든지 Klaytn 네트워크의 블록 탐색기인 [Klaytnscope](./klaytnscope.md)를 통해 확인할 수 있습니다.

Kaikas는 단일 시드 구문으로 트리 구조의 키를 무한대로 생성하는 '계층 결정적(Hierarchical Deterministic)' 지갑으로 개발됐습니다.  시드 구문은 니모닉 코드 단어(mnemonic code words)로 구성되어 일반적인 숫자 및 알파벳 조합의 시드 대비 기억하고 보관하기 쉽습니다. 사용자의 프라이빗 키는 암호화된 형태로 사용자 웹 브라우저에 저장됩니다.

Kaikas는 위와 같은 구조를 통해 지갑 사용성, 편의성은 물론 투명성과 보안성을 높였습니다. 동시에 사용자로부터 일정 수준 이상의 책임이 요구됩니다. 사용자가 보안키 복구에 필요한 시드 구문을 기억하지 못하는 경우, 계정을 복구할 수 있는 방법은 없습니다.

## 클레이튼 기반의 다양한 환경과 토큰 지원

Kaikas는 KLAY를 포함한 모든 종류의 Klaytn 기반 토큰을 지원합니다. Kaikas에 디폴트로 탑재되지 않은 코인이라도 토큰 어드레스를 등록해 이용하실 수 있습니다. 뿐만 아니라, 사용자가 직접 개발한 클레이튼 기반의 커스텀 토큰을 Kaikas에 추가해 보관하거나 지인에게 전송할 수도 있습니다.

사용자는 Klaytn의 Baobab 테스트넷과 Cypress 메인넷 환경에서 Kaikas를 이용할 수 있습니다. 뿐만 아니라, 자체적인 블록체인 애플리케이션(BApp)을 개발하고 관리하는 분들은 프라이빗 네트워크를 연결해서 디지털 자산을 안전하게 주고 받을 수도 있습니다.

## 웹기반 BApp에서 요청하는 트랜잭션 서명 수행

사용자는 Kaikas를 Klaytn 기반 블록체인 애플리케이션(BApp)과도 연동해 이용할 수 있습니다. 해당 애플리케이션에서 요청하는 모든 종류의 트랜잭션을 Kaikas를 이용해 대신 서명할 수 있습니다.

Kaikas는 또한 Klaytn의 주요 특징인 '수수료 대납(fee delegation)' 형식 또한 지원합니다. BApp 개발/운영자라면 대납 트랜잭션에 대한 서명을 요청하거나 수수료 납부를 위한 서명을 할 때에도 Kaikas를 이용할 수 있습니다.
