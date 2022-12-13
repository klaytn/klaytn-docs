# エンドポイントノード <a id="endpoint-node"></a>

## Intended Audience <a id="intended-audience"></a>

- [Klaytn API](../../dapp/json-rpc/README.md) を使用してトランザクションを送信したり、Klaytn ネットワークの状態をクエリしたい人は、エンドポイント ノードを介して行う必要があります。
- エンドポイントノードは、Klaytn Networkへのインターフェイスです。

## エンドポイントノードの概要 <a id="endpoint-node-overview"></a>

エンドポイントノードには、次のロールと関数があります。

- ブロックチェーンデータを同期します。
- 新たに受信したブロックを検証します。
- クエリリクエストを処理します。
- トランザクション要求をプロキシノードに送信します。

エンドポイントノードのインストールバイナリには、以下のインターフェースとユーティリティが付属しています。

- JSON-RPC API: JSON-RPCサーバーはノード内で動作し、ブロックチェーンアプリケーション開発のための [API](../../dapp/json-rpc/README.md) を公開します。 複数のノード管理 API もあります。
- コマンドラインインターフェイス: アカウント管理とノード設定機能を提供します。 ノードにアタッチされたインタラクティブな JavaScript コンソールも用意されています。 JavaScript コンソールは [caver-js API](../../dapp/sdk/caver-js/README.md) のほとんどを実装しています。 





