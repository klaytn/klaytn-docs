# はじめに <a id="introduction"></a>

このドキュメントでは、Klaytn API の使用方法を説明します。 Toolkit API を除くほとんどの API は、リモートプロトコル \(RPC、Websocket\' や Klaytn JavaScript コンソール をサポートしています。 このドキュメントは `ken` を例として記述されていますが、ほとんどの API は `kcn` および `kpn` でも使用できます。

**注意**: リモートプロトコルと Klaytn JavaScript コンソールの両方をサポートしていないAPIはほとんどないため。 リモートプロトコルで利用可能な API は主に文書化されています。 残りの API は後で文書化します。

## APIの有効化 <a id="enabling-apis"></a>

Klaytn RPCエンドポイントを介してAPIを提供するには `--${interface}api` コマンドライン引数で `${interface}` HTTPエンドポイントでは `rpc` に、WebSocket エンドポイントでは `ws` に指定してください。

`ipc` は、Unix ソケット \(Unix\) または名前付きパイプ \(Windows\) のすべての API をフラグなしで提供します。

以下の例のように追加したい特定の API で Klaytn ノードを起動できます。 しかし、ノードを起動すると、API を変更することはできません。

例) `klay` と `net` モジュールが有効になっている Klaytn ノードを起動します:

```bash
$ ken --rpcapi klay,net --rpc --{other options}
```

HTTP RPC インターフェイスは、 `--rpc` フラグを使用して明示的に有効にする必要があります。

**注**: HTTP \(`rpc`\) または WebSocket \(`ws`\) インターフェイスを介して API を提供することで、このインターフェイス \(DApps) にアクセスできる全員が API にアクセスできます。 ブラウザタブなど)。 どのAPIを有効にするかに注意してください。 デフォルトで Klay は IPC \(`ipc`\) インターフェイスですべての API を有効にしますが、 `rpc` と `ws` 要求されたモジュールは明示的に有効にする必要があります。

インタフェースが提供する API を決定するために、 `モジュール` JSON-RPC メソッドを呼び出すことができます。 例えば、 `rpc` インターフェイス上で:

**IPC**

```bash
$ echo '{"jsonrpc":"2.0","method":"rpc_modules","params":[],"id":1}' | nc -U klay.ipc
```

**HTTP**

```bash
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"rpc_modules","params":[],"id":1}' https://public-en-baobab.klaytn.net
```

はバージョン番号を含むすべての有効なモジュールを与えます:

```text
{
   "jsonrpc":"2.0",
   "id":1,
   "result":{
      "admin":"1.0",
      "debug":"1.0",
      "istanbul":"1.0",
      "klay":"1.0",
      "eth":"1.0",
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

All other debug namespace APIs **EXCEPT FOR** the following APIs are restricted with `rpc.unsafe-debug.disable` flag:

- [VM Tracing](./api-references/debug/tracing.md) APIs, however with limited functionality (only [pre-defined tracers](./api-references/debug/tracing.md#tracing-options) are allowed)
- debug_dumpBlock, debug_dumpStateTrie, debug_getBlockRlp, debug_getModifiedAccountsByHash, debug_getModifiedAccountsByNumber, debug_getBadBlocks, debug_getModifiedStorageNodesByNumber
- debug_metrics

To set the `rpc.unsafe-debug.disable` flag, append the following line in the `kend.conf` file.

```
ADDITIONAL="$ADDITIONAL --rpc.unsafe-debug.disable"
```
