# JSON-RPC公開エンドポイント

JSON-RPC エンドポイントを公開すると、独自のノードを実行せずに、Klaytn ネットワークとの相互作用を提供することで、ブロックチェーン製品をテストおよび実行できます。

独自のKlaytnエンドポイントノード(EN)を実行することは単純ではありません、それは技術的な専門知識、監視、およびコンピューティングリソースを必要とします。 ストレージ、ネットワーク帯域幅を維持するだけでなく、エンジニアリング時間とリソースを迂回するためのコストが付属しています。 ノードは定期的に最新の状態に保たれている必要があります。 それゆえ、 既存のPublic ENを使用する主な利点は、Klaytnネットワークと接続して相互作用するためのインフラストラクチャを維持することの注意を払うことなく、ブロックチェーン製品の構築とテストに専念できることです。

## 考慮すべきこと

- ノードプロバイダは、トラフィックやノードとの相互作用に起因するいかなる損害や損失についても責任を負いません。
- トラフィックが特定のノードに集中している場合、サービスの遅延が発生する可能性があります。
- あまりにも多くのリクエストを防ぐために、レート制限はノード単位で適用されることがあり、事前の通知なしに変更される可能性があります。

## JSON-RPC公開エンドポイントプロバイダー

以下は、Klaytnのパブリックノードプロバイダーとネットワークドメインのリストです。 (06.23.2022)

### Mainnet (サイプレス) パブリック JSON-RPC エンドポイント

これらのエンドポイントは、テストと開発の目的のためにコミュニティに提供されます。 エンドポイントの稼働時間と安定性を保証することはできませんので、商用目的では使用しないでください。

**HTTPS**

| Service Provider                                   | エンドポイント                                            | 名前空間         | タイプ   |
| -------------------------------------------------- | -------------------------------------------------- | ------------ | ----- |
| [Klaytn API Service](https://www.klaytnapi.com/)   | `https://public-node-api.klaytnapi.com/v1/cypress` | klay,eth,net | フル    |
| [Klaytn Foundation](https://www.klaytn.foundation) | `https://public-en-cypress.klaytn.net`             | klay,eth,net | フル    |
| Fantrie                                            | `https://klaytn01.fautor.app/`                     | klay,eth,net | フル    |
|                                                    | `https://klaytn02.fautor.app/`                     | klay,eth,net | フル    |
|                                                    | `https://klaytn03.fautor.app/`                     | klay,eth,net | フル    |
|                                                    | `https://klaytn04.fautor.app/`                     | klay,eth,net | フル    |
|                                                    | `https://klaytn05.fautor.app/`                     | klay,eth,net | フル    |
|                                                    | `https://cypress.fautor.app/archive`               | klay,eth,net | アーカイブ |
| [すべてのノード](www.allthatnode.com)                     | `https://klaytn-mainnet-rpc.allthatnode.com:8551`  | klay,eth,net | フル    |

**WebSocket**

| Service Provider                                   | エンドポイント                                             | 名前空間         | タイプ   |
| -------------------------------------------------- | --------------------------------------------------- | ------------ | ----- |
| [Klaytn API Service](https://www.klaytnapi.com/)   | `wss://public-node-api.klaytnapi.com/v1/cypress/ws` | klay,eth,net | フル    |
| [Klaytn Foundation](https://www.klaytn.foundation) | `wss://public-en-cypress.klaytn.net/ws`             | klay,eth,net | フル    |
| Fantrie                                            | `wss://klaytn01.fautor.app/ws/`                     | klay,eth,net | フル    |
|                                                    | `wss://klaytn02.fautor.app/ws/`                     | klay,eth,net | フル    |
|                                                    | `wss://klaytn03.fautor.app/ws/`                     | klay,eth,net | フル    |
|                                                    | `wss://klaytn04.fautor.app/ws/`                     | klay,eth,net | フル    |
|                                                    | `wss://klaytn05.fautor.app/ws/`                     | klay,eth,net | フル    |
|                                                    | `wss://cypress.fautor.app/archive/ws`               | klay,eth,net | アーカイブ |


## Testnet (Baobab) 公開 JSON-RPC エンドポイント

**HTTPS**

| Service Provider                                   | エンドポイント                                           | 名前空間         | タイプ   |
| -------------------------------------------------- | ------------------------------------------------- | ------------ | ----- |
| [Klaytn API Service](https://www.klaytnapi.com/)   | `https://public-node-api.klaytnapi.com/v1/baobab` | klay,eth,net | フル    |
| [Klaytn Foundation](https://www.klaytn.foundation) | `https://api.baobab.klaytn.net:8651`              | klay,eth,net | フル    |
| Fantrie                                            | `https://baobab01.fautor.app/`                    | klay,eth,net | フル    |
|                                                    | `https://baobab02.fautor.app/`                    | klay,eth,net | フル    |
|                                                    | `https://baobab.fautor.app/archive`               | klay,eth,net | アーカイブ |
| [すべてのノード](www.allthatnode.com)                     | `https://klaytn-baobab-rpc.allthatnode.com:8551`  | klay,eth,net | フル    |

**WebSocket**

| Service Provider                                   | エンドポイント                                            | 名前空間         | タイプ   |
| -------------------------------------------------- | -------------------------------------------------- | ------------ | ----- |
| [Klaytn API Service](https://www.klaytnapi.com/)   | `wss://public-node-api.klaytnapi.com/v1/baobab/ws` | klay,eth,net | フル    |
| [Klaytn Foundation](https://www.klaytn.foundation) | `wss://api.baobab.klaytn.net:8652`                 | klay,eth,net | フル    |
| Fantrie                                            | `wss://baobab01.fautor.app/ws/`                    | klay,eth,net | フル    |
|                                                    | `wss://baobab02.fautor.app/ws/`                    | klay,eth,net | フル    |
|                                                    | `wss://baobab.fautor.app/archive/ws`               | klay,eth,net | アーカイブ |

## 有用なリソース

- Wallet: Klaytn Network用のブラウザ拡張ウォレットです。 [Kaikas](https://docs.klaytn.foundation/dapp/developer-tools/kaikas)

- Faucet: Baobabテストネットワーク用のテストKLAYを取得できます。 [Faucet](https://docs.klaytn.foundation/dapp/developer-tools/klaytn-wallet#how-to-receive-baobab-testnet-klay)

- Explorer: Klaytnscopeは、Klaytn Networkのブロックエクスプローラです。 [Klaytnscope](https://docs.klaytn.foundation/dapp/developer-tools/klaytnscope)

- チェーンID : バオバブ: 1001 (0x3E9), サイプレス: 8217 (0x2019)

- ガス価格: 250 ston [取引手数料](https://docs.klaytn.com/klaytn/design/transaction-fees) で修正

