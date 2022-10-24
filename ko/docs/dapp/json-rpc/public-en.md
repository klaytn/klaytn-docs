# 퍼블릭 JSON-RPC 엔드포인트

퍼블릭 JSON-RPC 엔드포인트를 사용하면 클레이튼 네트워크와의 연결을 통하여 직접 노드를 운영할 필요 없이 블록체인 서비스를 테스트하고 실행할 수 있습니다.

클레이튼 엔드포인트 노드를 직접 운영하는 것은 단순한 일이 아닙니다. 기술적 지식, 지속적인 모니터링 그리고 컴퓨팅 자원도 필요합니다. 스토리지 및 네트워크 대역폭 관리 비용, 개발 시간과 자원이라는 비용도 수반되며 정기적으로 노드를 업데이트하고 유지보수해야 합니다. 따라서 퍼블릭 엔드포인트 노드를 사용하는 주된 이점은 클레이튼 네트워크에 연결하기 위한 인프라를 유지할 필요 없이 블록체인 서비스를 개발하고 테스팅하는 데 집중할 수 있게 해준다는 점입니다.

## 주의 사항

- 노드 제공자들은 트래픽이나 노드 연결에 관련되어 발생한 피해나 손실에 대해 책임을 지지 않습니다.
- 특정 노드에 트래픽이 집중되어 있는 경우 서비스 지연이 발생할 수 있습니다.
- 과도한 요청을 방지하기 위해 노드 별로 제한이 적용될 수 있으며, 이는 사전 고지 없이 변경될 수 있습니다.

## 퍼블릭 JSON-RPC 엔드포인트 목록

클레이튼의 퍼블릭 노드 및 네트워크 도메인 목록은 다음과 같습니다. (06.23.2022)

### 메인넷 (Cypress) 퍼블릭 JSON-RPC 엔드포인트

Please keep in mind that these endpoints are provided to the community for testing and development purposes. Since we cannot guarantee uptime and stability of the endpoints, do not use them for commercial purposes.

**HTTPS**

| 서비스 제공자                                            | Endpoints                                          | Namespaces         | 타입      |
| -------------------------------------------------- | -------------------------------------------------- | ------------------ | ------- |
| [Klaytn API Service](https://www.klaytnapi.com/)   | `https://public-node-api.klaytnapi.com/v1/cypress` | klay,eth,net,debug | Full    |
| [Klaytn Foundation](https://www.klaytn.foundation) | `https://public-en-cypress.klaytn.net`             | klay,eth,net,debug | Full    |
| Fantrie                                            | `https://klaytn01.fandom.finance/`                 | klay,eth,net,debug | Full    |
|                                                    | `https://klaytn02.fandom.finance/`                 | klay,eth,net,debug | Full    |
|                                                    | `https://klaytn03.fandom.finance/`                 | klay,eth,net,debug | Full    |
|                                                    | `https://klaytn04.fandom.finance/`                 | klay,eth,net,debug | Full    |
|                                                    | `https://klaytn05.fandom.finance/`                 | klay,eth,net,debug | Full    |
|                                                    | `https://cypress.fandom.finance/archive`           | klay,eth,net,debug | Archive |
| [All That Node](www.allthatnode.com)               | `https://klaytn-mainnet-rpc.allthatnode.com:8551`  | klay,eth,net       | Full    |

**WebSocket**

| 서비스 제공자                                            | Endpoints                                           | Namespaces         | 타입      |
| -------------------------------------------------- | --------------------------------------------------- | ------------------ | ------- |
| [Klaytn API Service](https://www.klaytnapi.com/)   | `wss://public-node-api.klaytnapi.com/v1/cypress/ws` | klay,eth,net,debug | Full    |
| [Klaytn Foundation](https://www.klaytn.foundation) | `wss://public-en-cypress.klaytn.net/ws`             | klay,eth,net,debug | Full    |
| Fantrie                                            | `wss://klaytn01.fandom.finance/ws/`                 | klay,eth,net,debug | Full    |
|                                                    | `wss://klaytn02.fandom.finance/ws/`                 | klay,eth,net,debug | Full    |
|                                                    | `wss://klaytn03.fandom.finance/ws/`                 | klay,eth,net,debug | Full    |
|                                                    | `wss://klaytn04.fandom.finance/ws/`                 | klay,eth,net,debug | Full    |
|                                                    | `wss://klaytn05.fandom.finance/ws/`                 | klay,eth,net,debug | Full    |
|                                                    | `wss://cypress.fandom.finance/archive/ws`           | klay,eth,net,debug | Archive |


## Testnet (Baobab) Public JSON-RPC Endpoints

**HTTPS**

| 서비스 제공자                                            | Endpoints                                         | Namespaces         | 타입      |
| -------------------------------------------------- | ------------------------------------------------- | ------------------ | ------- |
| [Klaytn API Service](https://www.klaytnapi.com/)   | `https://public-node-api.klaytnapi.com/v1/baobab` | klay,eth,net,debug | Full    |
| [Klaytn Foundation](https://www.klaytn.foundation) | `https://api.baobab.klaytn.net:8651`              | klay,eth,net       | Full    |
| Fantrie                                            | `https://baobab01.fandom.finance/`                | klay,eth,net,debug | Full    |
|                                                    | `https://baobab02.fandom.finance/`                | klay,eth,net,debug | Full    |
|                                                    | `https://baobab.fandom.finance/archive`           | klay,eth,net,debug | Archive |
| [All That Node](www.allthatnode.com)               | `https://klaytn-baobab-rpc.allthatnode.com:8551`  | klay,eth,net       | Full    |

**WebSocket**

| 서비스 제공자                                            | Endpoints                                          | Namespaces         | 타입      |
| -------------------------------------------------- | -------------------------------------------------- | ------------------ | ------- |
| [Klaytn API Service](https://www.klaytnapi.com/)   | `wss://public-node-api.klaytnapi.com/v1/baobab/ws` | klay,eth,net,debug | Full    |
| [Klaytn Foundation](https://www.klaytn.foundation) | `wss://api.baobab.klaytn.net:8652`                 | klay,eth,net       | Full    |
| Fantrie                                            | `wss://baobab01.fandom.finance/ws/`                | klay,eth,net,debug | Full    |
|                                                    | `wss://baobab02.fandom.finance/ws/`                | klay,eth,net,debug | Full    |
|                                                    | `wss://baobab.fandom.finance/archive/ws`           | klay,eth,net,debug | Archive |

## Useful Resources

- Wallet: Kaikas is a browser extension wallet for the Klaytn Network. [Kaikas](https://docs.klaytn.foundation/dapp/developer-tools/kaikas)

- Faucet: You can obtain test KLAY for the Baobab test network. [Faucet](https://docs.klaytn.foundation/dapp/developer-tools/klaytn-wallet#how-to-receive-baobab-testnet-klay)

- Explorer: Klaytnscope is the block explorer for the Klaytn Network. [Klaytnscope](https://docs.klaytn.foundation/dapp/developer-tools/klaytnscope)

- ChainID : Baobab: 1001 (0x3E9), Cypress: 8217 (0x2019)

- Gas price: Fixed at 250 ston [Transaction Fees](https://docs.klaytn.com/klaytn/design/transaction-fees)

