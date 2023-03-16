# エンドポイントノード <a id="endpoint-node"></a>

## Intended Audience <a id="intended-audience"></a>

- Anyone who wants to send transactions or query the state of Klaytn network using [Klaytn APIs](../../../dapp/json-rpc/README.md) needs to do so via an Endpoint Node.
- エンドポイントノードは、Klaytn Networkへのインターフェイスです。

## エンドポイントノードの概要 <a id="endpoint-node-overview"></a>

エンドポイントノードには、次のロールと関数があります。

- ブロックチェーンデータを同期します。
- 新たに受信したブロックを検証します。
- クエリリクエストを処理します。
- トランザクション要求をプロキシノードに送信します。

エンドポイントノードのインストールバイナリには、以下のインターフェースとユーティリティが付属しています。

- JSON-RPC APIs: JSON-RPC server runs inside the node, and it exposes [APIs](../../../dapp/json-rpc/README.md) for Blockchain Application development. 複数のノード管理 API もあります。
- コマンドラインインターフェイス: アカウント管理とノード設定機能を提供します。 ノードにアタッチされたインタラクティブな JavaScript コンソールも用意されています。 JavaScript console implements most of the [caver-js APIs](../../../dapp/sdk/caver-js/README.md). 





