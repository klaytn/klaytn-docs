# ストレージレイヤー <a id="storage-layer"></a>

## Migração da Fortaleza <a id="state-migration"></a>

ブロックがブロックチェーンに追加されるにつれて、チェーンデータも積み上げられます。 ノード操作にはチェーンデータが必要なので、trieというデータ構造としてノードストレージに保存されます。 そして最終的にはLevelDBというデータベースに収められています したがって、より多くのブロックで、コストの増加とともに、ストレージ内のチェーンデータが増えます。 そのため、Klaytnは「State Migration」という機能を提供し、必要なストレージ容量を減らすことができます。

ステートマイグレーションはチェーンデータのほとんどを構成する状態トライをターゲットにしています。 新しいブロックを処理するために必要とされない状態の trie ノードを削除します。 特定のブロックの state trie root からアクセス可能な状態の trie ノードのみを残します。 ステート移行後、ノード同期に必要な最新データのみが残ります。 ターゲットブロックの状態トリエノードと新たに追加されたブロックで構成されます。

ステート移行後、ノードは以前のブロックからターゲットブロックまで古い状態を読み取ることができないことに注意してください。 言い換えれば、 `klay_getBalance` API を使用して古いブロック番号から残高を返すことはできません。

More details on the mechanism of State Migration can be found below: [Klaytn v1.5.0 State Migration: Saving Node Storage](https://medium.com/klaytn/klaytn-v1-5-0-state-migration-saving-node-storage-1358d87e4a7a) [Klaytn State Migration: An Efficient Way to Reduce Blockchain Data](https://medium.com/klaytn/klaytn-state-migration-an-efficient-way-to-reduce-blockchain-data-6615a3b36523)

To use State Migration, please refer to [`Chaindata Migration`](https://docs.klaytn.foundation/content/operation-guide/chaindata-migration) page of Operation Guide.