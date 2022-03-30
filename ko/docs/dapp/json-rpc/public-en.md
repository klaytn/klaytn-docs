# 퍼블릭 JSON-RPC 엔드포인트

퍼블릭 JSON-RPC 엔드포인트를 사용하면 클레이튼 네트워크와의 연결을 통하여 직접 노드를 운영할 필요 없이 블록체인 서비스를 테스트하고 실행할 수 있습니다.

클레이튼 엔드포인트 노드를 직접 운영하는 것은 단순한 일이 아닙니다. 기술적 지식, 지속적인 모니터링 그리고 컴퓨팅 자원도 필요합니다. 스토리지 및 네트워크 대역폭 관리 비용, 개발 시간과 자원이라는 비용도 수반되며 정기적으로 노드를 업데이트하고 유지보수해야 합니다. 따라서 퍼블릭 엔드포인트 노드를 사용하는 주된 이점은 클레이튼 네트워크에 연결하기 위한 인프라를 유지할 필요 없이 블록체인 서비스를 개발하고 테스팅하는 데 집중할 수 있게 해준다는 점입니다.

## 주의 사항

- 노드 제공자들은 트래픽이나 노드 연결에 관련되어 발생한 피해나 손실에 대해 책임을 지지 않습니다.
- 특정 노드에 트래픽이 집중되어 있는 경우 서비스 지연이 발생할 수 있습니다.
- 과도한 요청을 방지하기 위해 노드 별로 제한이 적용될 수 있으며, 이는 사전 고지 없이 변경될 수 있습니다.

## 퍼블릭 JSON-RPC 엔드포인트 목록

클레이튼의 퍼블릭 노드 및 네트워크 도메인 목록은 다음과 같습니다. (2022.03.23)

### 메인넷 (Cypress) 퍼블릭 JSON-RPC 엔드포인트

#### 서비스 제공주체: Klaytn API Service

이 엔드포인트들은 테스팅 목적으로 커뮤니티에 제공되는 것이며, 상업적인 이용은 지원하지 않습니다.

**HTTPS**

- `https://public-node-api.klaytnapi.com/v1/cypress`

**WebSocket**

- `wss://public-node-api.klaytnapi.com/v1/cypress/ws`

#### 서비스 제공주체: Fantrie

이 퍼블릭 엔드포인트들은 제3자 서비스가 커뮤니티에 제공하는 것으로, 상업적 이용을 지원할 수 있습니다. 하지만 제3자 서비스인 만큼 클레이튼은 가동 시간 및 안정성을 보장할 수 없습니다.

**HTTPS**

- `https://klaytn01.fandom.finance/`

- `https://klaytn02.fandom.finance/`

- `https://klaytn03.fandom.finance/`

- `https://klaytn04.fandom.finance/`

- `https://klaytn05.fandom.finance/`

**WebSocket**

- `wss://klaytn01.fandom.finance/ws/`

- `wss://klaytn02.fandom.finance/ws/`

- `wss://klaytn03.fandom.finance/ws/`

- `wss://klaytn04.fandom.finance/ws/`

- `wss://klaytn05.fandom.finance/ws/`


### 테스트넷 (Baobab) 퍼블릭 JSON-RPC 엔드포인트

#### 서비스 제공주체: Klaytn API Service

**HTTPS**

- `https://public-node-api.klaytnapi.com/v1/baobab`

**WebSocket**

- `https://public-node-api.klaytnapi.com/v1/baobab`

#### 서비스 제공주체: 클레이튼 재단

**HTTPS**

- `https://api.baobab.klaytn.net:8651`

**WebSocket**

- `wss://api.baobab.klaytn.net:8652`


## 유용한 정보

- 카이카스는 클레이튼 네트워크를 위한 웹 브라우저 확장 프로그램 지갑입니다. [카이카스](https://docs.klaytn.com/dapp/developer-tools/kaikas) 소개 바로가기

- 포셋(Faucet): Baobab 테스트넷을 위한 테스트 KLAY를 얻을 수 있습니다. [포셋](https://docs.klaytn.com/dapp/developer-tools/klaytn-wallet#how-to-receive-baobab-testnet-klay) 바로가기.

- 탐색기: 클레이튼 스코프는 클레이튼 네트워크의 블록 탐색기입니다. [클레이튼 스코프](https://docs.klaytn.com/dapp/developer-tools/klaytnscope) 바로가기

- ChainID : Baobab: 1001 (0x3E9), Cypress: 8217 (0x2019)

- 가스비: 750 ston로 고정 [트랜잭션 비용](https://docs.klaytn.com/klaytn/design/transaction-fees) 설명 바로가기

