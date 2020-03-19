# Kaikas <a id="kaikas"></a>

Kaikas는 Klaytn 네트워크를 위한 웹 브라우저 확장 프로그램 지갑입니다. Kaikas는 구글 크롬과 모질라 파이어폭스에서 사용 가능하며, 웹 브라우저를 통해 Klaytn 네트워크와 상호 작용할 수 있는 안전하고 유용한 방법을 제공합니다. Kaikas를 통해 KLAY를 포함한 Klaytn 기반 토큰들을 보관하거나 전송할 수 있습니다. 그리고 웹 기반 블록체인 애플리케이션(BApp)과 실시간 연동해 트랜잭션 서명을 대신 수행할 수 있습니다.

* 크롬 웹 스토어 다운로드: [link](https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi)
* 파이어폭스 애드온 스토어 다운로드: [link](https://addons.mozilla.org/ko/firefox/addon/kaikas/)

Kaikas와 연동하여 BApp을 개발하고자 하시는 분들은 [https://docs.kaikas.io](https://docs.kaikas.io)에서 자세한 내용을 참고하시기 바랍니다.

## PC 웹 브라우저 기반의 탈중앙화 HD 월렛

Kaikas는 크롬과 파이어폭스 웹 브라우저의 확장 프로그램으로 작동됩니다. Kaikas는 데스크탑 브라우저 환경에서 최적화된 애플리케이션입니다.

Kaikas는 사용자가 스스로 자신의 계정과 보안키를 생성 및 관리하는 구조입니다. Kaikas의 모든 트랜잭션 내용은 Klaytn에 기록되며, 누구든지 Klaytn 네트워크의 블록 탐색기인 [Klaytnscope](./klaytnscope.md)를 통해 확인할 수 있습니다.

Kaikas는 단일 시드 구문으로 트리 구조의 키를 무한대로 생성하는 '계층 결정적(Hierarchical Deterministic)' 지갑으로 개발됐습니다.  시드 구문은 니모닉 코드 단어(mnemonic code words)로 구성되어 일반적인 숫자 및 알파벳 조합의 시드 대비 기억하고 보관하기 쉽습니다. 사용자의 프라이빗 키는 암호화된 형태로 사용자 웹 브라우저에 저장됩니다.

Kaikas는 위와 같은 구조를 통해 지갑 사용성, 편의성은 물론 투명성과 보안성을 높였습니다. However, it is vital that users be responsible for their personal account management (i.e., if a user does not remember his/her seed phrase, there is no other way to restore his/her accounts.)

## Supporting various Klaytn networks and tokens

Kaikas allows you to store and transact with all Klaytn-based tokens including KLAY. Tokens that are not loaded by default can be inserted by pasting in their contract address. You can even store and transact your own Klaytn-based custom tokens on Kaikas!

Kaikas supports Klaytn's Baobab testnet as well as the Cypress mainnet. Moreover, those developing their own Klaytn-based blockchain applications may connect to their private networks to send and receive the tokens.

## Signing web-based BApp transactions

Kaikas can be connected with web-based Klaytn BApps. You can use your Kaikas account to sign transactions/data presented to you by the applications.

Kaikas can also be used to handle fee delegation. By using Kaikas, BApp develops and operators can sign the fee transactions.
