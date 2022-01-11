# Endpoint Node <a id="endpoint-node"></a>

## 튜토리얼 대상 <a id="intended-audience"></a>

- Anyone who wants to send transactions or query the state of Klaytn network using [Klaytn APIs](../../dapp/json-rpc/README.md) needs to do so via an Endpoint Node.
- 엔드포인트 노드는 Klaytn 네트워크의 인터페이스입니다.

## 엔드포인트 노드 개요 <a id="endpoint-node-overview"></a>

엔드포인트 노드는 다음과 같은 역할과 기능을 합니다.

- 블록체인 데이터를 동기화합니다.
- 새로 받은 블록을 검증합니다.
- 쿼리 요청을 처리합니다.
- 트랜잭션 요청을 프록시 노드로 전송합니다.

엔드포인트 노드 설치 바이너리는 다음의 인터페이스 및 지원 프로그램과 함께 제공됩니다.

- JSON-RPC APIs: JSON-RPC server runs inside the node, and it exposes [APIs](../../dapp/json-rpc/README.md) for Blockchain Application development. 그뿐만 아니라 노드 관리를 위한 API도 제공합니다.
- Command-line Interface: 계정 관리와 노드 환경설정 기능을 제공합니다. 또한 노드에 첨부된 대화형 자바스크립트 콘솔 창을 제공합니다. JavaScript console implements most of the [caver-js APIs](../../dapp/sdk/caver-js/README.md). 





