エンドポイントノードは JSON-RPC API を公開します。 API の有効化/無効化は以下のとおりです。 For the detailed API specification, please refer to the [JSON-RPC APIs](../../../dapp/json-rpc/README.md).

**NOTE**: Offering an API over the HTTP (`rpc`) or WebSocket (`ws`) interfaces will give everyone access to the APIs who can access this interface (DApps, browser tabs, etc). どのAPI を有効にするかに注意してください。 デフォルトで表示 Klaytn は IPC (`ipc`) インターフェイス上ですべての API を有効にしますが、必要な `rpc` と `ws` モジュールは明示的に有効にする必要があります。

## APIの有効化  <a id="enabling-apis"></a>

### コマンドラインから <a id="from-commandline"></a>
Klaytn RPCエンドポイントを介してAPIを提供するには `--${interface}api` コマンドライン引数で HTTP エンドポイントの `${interface}` が `rpc` で、WebSocket エンドポイントの `ws` で指定してください。

`ipc` は、フラグなしで unix ソケット (Unix) または命名されたパイプ (Windows) エンドポイントを介してすべての API を提供します。

You can launch a Klaytn node with specific APIs you want to add like the example below. But keep in mind that you can't change APIs once you launch the node.

例) `klay` と `net` モジュールが有効になっている Klaytn ノードを起動します:

```shell
$ ken --rpcapi klay,net --rpc --{other options}
```

The HTTP RPC interface must be explicitly enabled using the `--rpc` flag.

### 設定の使用 <a id="using-configuration"></a>

Please update the `RPC_ENABLE`, `RPC_API`, `WS_ENABLE` and  `WS_API` properties in the [Configuration File](../../../operation-guide/configuration.md).

## 有効なAPIのクエリ <a id="querying-enabled-apis"></a>

To determine which APIs an interface provides, the `modules` JSON-RPC method can be invoked. の例 `rpc` インターフェイス:

**IPC**

```javascript
$ echo '{"jsonrpc":"2.0","method":"rpc_modules","params":[],"id":1}' | nc -U klay.ipc
```

**HTTP**

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"rpc_modules","params":[],"id":1}' https://public-en-baobab.klaytn.net
```

will give all enabled modules including the version number:

```
{
   "jsonrpc":"2.0",
   "id":1,
   "result":{
      "admin":"1.0",
      "debug":"1.0",
      "klay":"1.0",
      "miner":"1.0",
      "net":"1.0",
      "personal":"1.0",
      "rpc":"1.0",
      "txpool":"1.0",
      "web3":"1.0"
   }
}
```

## Disabling unsafe debug APIs <a id="disabling-unsafe-debug-apis"></a>

Some debug namespace APIs are unsafe/unappropriate to be opened to public. We recommend you to provide the debug namespace APIs to authorized users only. However, if you want to maintain a public EN and provide debug namespace APIs to the public, we strongly recommend you to set the `rpc.unsafe-debug.disable` flag which will disable APIs that are unsafe/unappropriate to be opened to the public and enable only a subset of the debug namespace APIs.

The enabled APIs are as follows:

- [VM Tracing](../../../dapp/json-rpc/api-references/debug/tracing.md) APIs, however with limited functionality (only [pre-defined tracers](../../../dapp/json-rpc/api-references/debug/tracing.md#tracing-options) are allowed)
- debug_dumpBlock, debug_dumpStateTrie, debug_getBlockRlp, debug_getModifiedAccountsByHash, debug_getModifiedAccountsByNumber, debug_getBadBlocks, debug_getModifiedStorageNodesByNumber
- debug_metrics

To set the `rpc.unsafe-debug.disable` flag, append the following line in the `kend.conf` file.

```
ADDITIONAL="$ADDITIONAL --rpc.unsafe-debug.disable"
```
