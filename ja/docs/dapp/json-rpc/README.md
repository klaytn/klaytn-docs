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

