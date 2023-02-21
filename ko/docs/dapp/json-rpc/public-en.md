# JSON-RPC Providers

## Public JSON RPC Endpoints

퍼블릭 JSON-RPC 엔드포인트를 사용하면 클레이튼 네트워크와의 연결을 통하여 직접 노드를 운영할 필요 없이 블록체인 서비스를 테스트하고 실행할 수 있습니다.

클레이튼 엔드포인트 노드를 직접 운영하는 것은 단순한 일이 아닙니다. 기술적 지식, 지속적인 모니터링 그리고 컴퓨팅 자원도 필요합니다. 스토리지 및 네트워크 대역폭 관리 비용, 개발 시간과 자원이라는 비용도 수반되며 정기적으로 노드를 업데이트하고 유지보수해야 합니다. 따라서 퍼블릭 엔드포인트 노드를 사용하는 주된 이점은 클레이튼 네트워크에 연결하기 위한 인프라를 유지할 필요 없이 블록체인 서비스를 개발하고 테스팅하는 데 집중할 수 있게 해준다는 점입니다.

### Things to Consider

- 노드 제공자들은 트래픽이나 노드 연결에 관련되어 발생한 피해나 손실에 대해 책임을 지지 않습니다.
- 특정 노드에 트래픽이 집중되어 있는 경우 서비스 지연이 발생할 수 있습니다.
- 과도한 요청을 방지하기 위해 노드 별로 제한이 적용될 수 있으며, 이는 사전 고지 없이 변경될 수 있습니다.

### Public JSON-RPC Endpoint Providers

클레이튼의 퍼블릭 노드 및 네트워크 도메인 목록은 다음과 같습니다. (06.23.2022)

#### Mainnet (Cypress) Public JSON-RPC Endpoints

Please keep in mind that these endpoints are provided to the community for testing and development purposes. Since we cannot guarantee uptime and stability of the endpoints, do not use them for commercial purposes.

**HTTPS**

| Service Provider                                   | Endpoints                                          | Namespaces   | Type    |
| -------------------------------------------------- | -------------------------------------------------- | ------------ | ------- |
| [Klaytn API Service](https://www.klaytnapi.com/)   | `https://public-node-api.klaytnapi.com/v1/cypress` | klay,eth,net | Full    |
| [Klaytn Foundation](https://www.klaytn.foundation) | `https://public-en-cypress.klaytn.net`             | klay,eth,net | Full    |
| Fantrie                                            | `https://cypress.fautor.app/archive`               | klay,eth,net | Archive |
| [All That Node](www.allthatnode.com)               | `https://klaytn-mainnet-rpc.allthatnode.com:8551`  | klay,eth,net | Full    |
| [BlockPI Network](https://blockpi.io/)             | `https://klaytn.blockpi.network/v1/rpc/public`     | klay,eth,net | Full    |

**WebSocket**

| Service Provider                                   | Endpoints                                           | Namespaces   | Type    |
| -------------------------------------------------- | --------------------------------------------------- | ------------ | ------- |
| [Klaytn API Service](https://www.klaytnapi.com/)   | `wss://public-node-api.klaytnapi.com/v1/cypress/ws` | klay,eth,net | Full    |
| [Klaytn Foundation](https://www.klaytn.foundation) | `wss://public-en-cypress.klaytn.net/ws`             | klay,eth,net | Full    |
| Fantrie                                            | `wss://cypress.fautor.app/archive/ws`               | klay,eth,net | Archive |


### Testnet (Baobab) Public JSON-RPC Endpoints

**HTTPS**

| Service Provider                                   | Endpoints                                             | Namespaces   | Type    |
| -------------------------------------------------- | ----------------------------------------------------- | ------------ | ------- |
| [Klaytn API Service](https://www.klaytnapi.com/)   | `https://public-node-api.klaytnapi.com/v1/baobab`     | klay,eth,net | Full    |
| [Klaytn Foundation](https://www.klaytn.foundation) | `https://api.baobab.klaytn.net:8651`                  | klay,eth,net | Full    |
| Fantrie                                            | `https://baobab01.fautor.app/`                        | klay,eth,net | Full    |
|                                                    | `https://baobab02.fautor.app/`                        | klay,eth,net | Full    |
|                                                    | `https://baobab.fautor.app/archive`                   | klay,eth,net | Archive |
| [All That Node](www.allthatnode.com)               | `https://klaytn-baobab-rpc.allthatnode.com:8551`      | klay,eth,net | Full    |
| [BlockPI Network](https://blockpi.io/)             | `https://klaytn-baobab.blockpi.network/v1/rpc/public` | klay,eth,net | Full    |

**WebSocket**

| Service Provider                                   | Endpoints                                          | Namespaces   | Type    |
| -------------------------------------------------- | -------------------------------------------------- | ------------ | ------- |
| [Klaytn API Service](https://www.klaytnapi.com/)   | `wss://public-node-api.klaytnapi.com/v1/baobab/ws` | klay,eth,net | Full    |
| [Klaytn Foundation](https://www.klaytn.foundation) | `wss://api.baobab.klaytn.net:8652`                 | klay,eth,net | Full    |
| Fantrie                                            | `wss://baobab01.fautor.app/ws/`                    | klay,eth,net | Full    |
|                                                    | `wss://baobab02.fautor.app/ws/`                    | klay,eth,net | Full    |
|                                                    | `wss://baobab.fautor.app/archive/ws`               | klay,eth,net | Archive |

### Useful Resources

- Wallet: Kaikas is a browser extension wallet for the Klaytn Network. [Kaikas](https://docs.klaytn.foundation/dapp/developer-tools/kaikas)

- Faucet: You can obtain test KLAY for the Baobab test network. [Faucet](https://docs.klaytn.foundation/dapp/developer-tools/klaytn-wallet#how-to-receive-baobab-testnet-klay)

- Explorer: Klaytnscope is the block explorer for the Klaytn Network. [Klaytnscope](https://docs.klaytn.foundation/dapp/developer-tools/klaytnscope)

- ChainID : Baobab: 1001 (0x3E9), Cypress: 8217 (0x2019)

- Gas price: Fixed at 250 ston [Transaction Fees](https://docs.klaytn.com/klaytn/design/transaction-fees)

## Subscription-based JSON-RPC providers

By using node services, you can focus on developing your application or product on Klaytn instead of spending your resources on node operation. Below is a list of node providers.

### Klaytn API Service (KAS)

KAS provides various APIs to support easier and quicker blockchain application development. You can dramatically reduce development time, operate a stable service, and save costs.

#### Features

* 10,000 requests per day (100 requests per second) for the free plan
* Community support for the free plan, and ticket support for paid plans (Starter, Pro, and Pro Plus)
* Klaytn Node API, Token History API, Wallet API, Anchor API, KIP-7, 17, 37 API and Metadata API

#### References

* [Docs](https://www.klaytnapi.com/en/resource/docs/readme)
* [Subscription](https://www.klaytnapi.com/en/landing/pricings)
* [Website](https://www.klaytnapi.com/en/landing/main)

### Tatum

Tatum is the fastest way to build, test and run blockchain apps. We offer the most flexible platform for developers to turn their blockchain ideas into reality fast.

#### Features

* 5 requests per second for the free plan, and 200 requests per second for the paid plans (Start, Basic)
* Community support

#### References

* [Docs](https://apidoc.tatum.io/tag/Klaytn?\_gl=1\*1dhfv8u\*\_ga\*MzY5NDMyNzg5LjE2NDQ1NTk1MzA.\*\_ga\_BH6F6RKJW6\*MTY2MjAxNDQ0OS4xNy4xLjE2NjIwMTQ2MTQuMjQuMC4w)
* [Pricing](https://tatum.io/pricing)
* [Website](https://tatum.io/)

### BlockPi

BlockPI Network aims to provide high-quality, robust, and efficient RPC service. To avoid the single-point failure and limitation of scalability, the network is designed to be a distributed structure with expandable RPC nodes.

BlockPI provides free public endpoints to the Klaytn community and advanced features to paid users.  BlockPI designed two paid packages, and support Pay As You Go to fulfill flexible user needs. You can check the pricing details for each package (https://docs.blockpi.io/documentations/pricing) and the individual method cost for Klaytn  (https://docs.blockpi.io/documentations/request-unit-ru)

#### Features

* 20 requests per second on free services, and unlimited for paid packages.
* Choice of Klaytn archive node and endpoint node
* Whitelisting possible for endpoint nodes
* WSS available and subscription coming soon
* Supports tracing

#### References

* [Docs](https://docs.blockpi.io/)
* [Subscription](https://dashboard.blockpi.io/wallet/overview)
* [Website](https://blockpi.io/)

### Pocket Network

Pocket Network is the TCP/IP of Web3 node infrastructure – a multi-chain relay protocol that incentivizes RPC nodes to provide DApps and their users with unstoppable Web3 access.

Pocket supports dozens of blockchains, with more being added all the time.

#### Features

* Decentralized RPC Protocol and Marketplace
* 250,000 Requests Per Day Free Tier (up to two applications, with unlimited endpoints)
* Public Endpoints
* Pay-As-You-Go-plan (if you need more than 250,000 requests per day)
* 30+ Blockchains Supported
* 25,000 + Nodes earning POKT for serving applications
* Archival Node, Archival Node w/ Tracing, & Testnet Node Support
* No Single Point of Failure
* Zero Downtime
* Cost-Effective Near-Zero Tokenomics (stake POKT once for network bandwidth)
* No monthly sunk costs, turn your infrastructure into an asset
* Load-Balancing built into the Protocol
* Infinitely scale the number of requests per day and nodes per hour as you go
* The most private, censorship-resistant option
* Hands-on developer support

#### References

* [Docs](https://docs.pokt.network/api-docs/klaytn-evm/#/)
* [Website](https://docs.pokt.network/)
* [Pocket Portal](https://bit.ly/ETHorg\_POKTportal) dashboard and analytics

### ANKR

Ankr's distributed node network creates a powerful synergy, allowing developers to connect easily and securely to public endpoints. With fine-tuned caching that optimizes resource usage, Ankr guarantees fast RPC requests together with low latency performance for superior efficiency when building decentralized applications.

#### Features

* 500 requests per second on the free plan, and 1,500 on the premium. It is upgradable on request.
* Discord and Support Portal for the free plan, and dedicated support for the premium.
* WebSocket is available for the premium plan.

#### References

* [Docs](https://www.ankr.com/docs/build-blockchain/overview)
* [Subscription](https://www.ankr.com/rpc/pricing/)
* [Website](https://www.ankr.com/rpc/)

