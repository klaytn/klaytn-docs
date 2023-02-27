# JSON-RPC Providers

## Public JSON RPC Endpoints

JSON-RPC エンドポイントを公開すると、独自のノードを実行せずに、Klaytn ネットワークとの相互作用を提供することで、ブロックチェーン製品をテストおよび実行できます。

独自のKlaytnエンドポイントノード(EN)を実行することは単純ではありません、それは技術的な専門知識、監視、およびコンピューティングリソースを必要とします。 ストレージ、ネットワーク帯域幅を維持するだけでなく、エンジニアリング時間とリソースを迂回するためのコストが付属しています。 ノードは定期的に最新の状態に保たれている必要があります。 それゆえ、 既存のPublic ENを使用する主な利点は、Klaytnネットワークと接続して相互作用するためのインフラストラクチャを維持することの注意を払うことなく、ブロックチェーン製品の構築とテストに専念できることです。

### Things to Consider

- ノードプロバイダは、トラフィックやノードとの相互作用に起因するいかなる損害や損失についても責任を負いません。
- トラフィックが特定のノードに集中している場合、サービスの遅延が発生する可能性があります。
- あまりにも多くのリクエストを防ぐために、レート制限はノード単位で適用されることがあり、事前の通知なしに変更される可能性があります。

### Public JSON-RPC Endpoint Providers

以下は、Klaytnのパブリックノードプロバイダーとネットワークドメインのリストです。 (06.23.2022)

#### Mainnet (Cypress) Public JSON-RPC Endpoints

これらのエンドポイントは、テストと開発の目的のためにコミュニティに提供されます。 エンドポイントの稼働時間と安定性を保証することはできませんので、商用目的では使用しないでください。

**HTTPS**

| Service Provider                                   | エンドポイント                                            | 名前空間         | Type    |
| -------------------------------------------------- | -------------------------------------------------- | ------------ | ------- |
| [Klaytn API Service](https://www.klaytnapi.com/)   | `https://public-node-api.klaytnapi.com/v1/cypress` | klay,eth,net | フル      |
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

| Service Provider                                   | Endpoints                                             | Namespaces   | Type  |
| -------------------------------------------------- | ----------------------------------------------------- | ------------ | ----- |
| [Klaytn API Service](https://www.klaytnapi.com/)   | `https://public-node-api.klaytnapi.com/v1/baobab`     | klay,eth,net | Full  |
| [Klaytn Foundation](https://www.klaytn.foundation) | `https://api.baobab.klaytn.net:8651`                  | klay,eth,net | Full  |
| Fantrie                                            | `https://baobab01.fautor.app/`                        | klay,eth,net | Full  |
|                                                    | `https://baobab02.fautor.app/`                        | klay,eth,net | Full  |
|                                                    | `https://baobab.fautor.app/archive`                   | klay,eth,net | アーカイブ |
| [すべてのノード](www.allthatnode.com)                     | `https://klaytn-baobab-rpc.allthatnode.com:8551`      | klay,eth,net | Full  |
| [BlockPI Network](https://blockpi.io/)             | `https://klaytn-baobab.blockpi.network/v1/rpc/public` | klay,eth,net | Full  |

**WebSocket**

| Service Provider                                   | Endpoints                                          | Namespaces   | Type    |
| -------------------------------------------------- | -------------------------------------------------- | ------------ | ------- |
| [Klaytn API Service](https://www.klaytnapi.com/)   | `wss://public-node-api.klaytnapi.com/v1/baobab/ws` | klay,eth,net | Full    |
| [Klaytn Foundation](https://www.klaytn.foundation) | `wss://api.baobab.klaytn.net:8652`                 | klay,eth,net | Full    |
| Fantrie                                            | `wss://baobab01.fautor.app/ws/`                    | klay,eth,net | Full    |
|                                                    | `wss://baobab02.fautor.app/ws/`                    | klay,eth,net | Full    |
|                                                    | `wss://baobab.fautor.app/archive/ws`               | klay,eth,net | Archive |

### Useful Resources

- Wallet: Klaytn Network用のブラウザ拡張ウォレットです。 [Kaikas](https://docs.klaytn.foundation/dapp/developer-tools/kaikas)

- Faucet: Baobabテストネットワーク用のテストKLAYを取得できます。 [Faucet](https://docs.klaytn.foundation/dapp/developer-tools/klaytn-wallet#how-to-receive-baobab-testnet-klay)

- Explorer: Klaytnscopeは、Klaytn Networkのブロックエクスプローラです。 [Klaytnscope](https://docs.klaytn.foundation/dapp/developer-tools/klaytnscope)

- チェーンID : バオバブ: 1001 (0x3E9), サイプレス: 8217 (0x2019)

- ガス価格: 250 ston [取引手数料](https://docs.klaytn.com/klaytn/design/transaction-fees) で修正

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

### BlockPI

BlockPI Network aims to provide high-quality, robust, and efficient RPC service. To avoid the single-point failure and limitation of scalability, the network is designed to be a distributed structure with expandable RPC nodes.

BlockPI provides free public endpoints to the Klaytn community and advanced features to paid users.  BlockPI designed two paid packages, and support Pay As You Go to fulfill flexible user needs. You can check the pricing details for each package (https://docs.blockpi.io/documentations/pricing) and the individual method cost for Klaytn  (https://docs.blockpi.io/documentations/request-unit-ru)

#### Features

* 20 requests per second on free services, and unlimited for paid packages.
* Choice of Klaytn archive node and endpoint node
* Whitelisting possible for endpoint nodes
* Supports WSS (including subscription)
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

