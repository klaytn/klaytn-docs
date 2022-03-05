# Endpoint Node <a id="endpoint-node"></a>

## 튜토리얼 대상 <a id="intended-audience"></a>

- 엔드포인트 노드를 통해 [Klaytn APIs](../../dapp/json-rpc/README.md)를 사용하여 트랜잭션을 보내거나 클레이튼 네트워크의 상태를 쿼리하려는 분을 대상으로 합니다.
- 엔드포인트 노드는 Klaytn 네트워크의 인터페이스입니다.

## 엔드포인트 노드 개요 <a id="endpoint-node-overview"></a>

엔드포인트 노드는 다음과 같은 역할과 기능을 합니다.

- 블록체인 데이터를 동기화합니다.
- 새로 받은 블록을 검증합니다.
- 쿼리 요청을 처리합니다.
- 트랜잭션 요청을 프록시 노드로 전송합니다.

엔드포인트 노드 설치 바이너리는 다음의 인터페이스 및 지원 프로그램과 함께 제공됩니다.

- JSON-RPC APIs: JSON-RPC 서버는 노드 내에서 실행되며 블록체인 애플리케이션 개발을 위한 [APIs](../../dapp/json-rpc/README.md)를 제공합니다. 그뿐만 아니라 노드 관리를 위한 API도 제공합니다.
- Command-line Interface: 계정 관리와 노드 환경설정 기능을 제공합니다. 또한 노드에 첨부된 대화형 자바스크립트 콘솔 창을 제공합니다. 이 자바스크립트 콘솔은 대부분의 [caver-js APIs](../../dapp/sdk/caver-js/README.md)를 구현합니다. 





