---
description: >-
  Klaytnノードを制御するためのAPI。
---

# ネームスペース管理者 <a id="namespace-admin"></a>

名前空間 `管理者` を使用すると、いくつかの非標準RPCメソッドにアクセスできます。 これらは、ネットワークピアとRPC エンドポイント管理を含むがこれらに限定されない、Klaytnインスタンスに対する 細かい制御を可能にします。


## admin_nodeInfo <a id="admin_nodeinfo"></a>

`nodeInfo` の管理プロパティは、ネットワークの粒度で Klaytn ノードを実行していることがわかっているすべての情報を照会することができます。 These include general information about the node itself as a participant of the [devp2p](https://github.com/ethereum/devp2p/blob/master/README.md) P2P overlay protocol, as well as specialized information added by each of the running application protocols, e.g., `klay`.

| クライアント | メソッドの起動                        |
|:------:| ------------------------------ |
| コンソール  | `admin.nodeInfo`               |
|  RPC   | `{"method": "admin_nodeInfo"}` |

**パラメータ**

なし

**戻り値**

| タイプ     | Description |
| ------- | ----------- |
| JSON文字列 | ノード情報       |

**例**

コンソール
```javascript
> admin.nodeInfo
{
   kni: "kni://0bbff960d26fc12a5153ac25d7aaffd654e073a74a8b1aa65034250d47fac610ebe99a83d21d741c6121a32fb01312b49fc0633ae04e80c5eb73c3bc71c5a850@[::]:32323?discport=0",
   id: "0bbff960d26fc12a5153ac25d7aaffd654e073a74a8b1aa65034250d47fac610ebe99a83d21d741c6121a32fb01312b49fc0633ae04e80c5eb73c3bc71c5a850",
   ip: "::",
   listenAddr: "[::]:32323",
   name: "Klaytn/validator-1/vX.X.X/XXXX-XXXX/goX.X.X",
   ports: {
     discovery: 0,
     listener: 32323
   },
   protocols: {
     istanbul: {
       config: {
         chainId: 2018,
         isBFT: true,
         istanbul: {...},
         unitPrice: 0
       },
       difficulty: 52794,
       genesis: "0x42824367c973785245923a712cf2e5a99aae6a26f44e4f1ec686a0e60986644e",
       head: "0x4c3000a6f8c40b0507d8ee4a3fc5c9865df0a8d66f882366ea95473c87342005",
       network: 2017
     }
   }
}
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_nodeInfo","id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,
"result":               {"id":"377ef808aff73a397d133b3bf160df586054c98c0e6a65c8fce9560e6a0632bc975419f461803d27f28ee270287113cc2359225814debc1bfb2f811061e14c5d", "name":"Klaytn/vvX.X.X/XXXX-XXXX/goX.X.X",    "kni":"kni://377ef808aff73a397d133b3bf160df586054c98c0e6a65c8fce9560e6a0632bc975419f461803d27f28ee270287113cc2359225814debc1bfb2f811061e14c5d@[::]:32323?discport=0",
"ip":"::",
"ports":{"discovery":0,"listener":32323},
"listenAddr":"[::]:32323",
"protocols":{"istanbul":{"network":1000,"difficulty":1,"genesis":"0x06806bd8b1e086dfb7098a289da07037a3af58e793d205d20f61c88eeea9351d","config":{"chainId":1000,"istanbul":{"epoch":30000,"policy":0,"sub":7},"isBFT":true,"unitPrice":25000000000,"deriveShaImpl":0},"head":"0x06806bd8b1e086dfb7098a289da07037a3af58e793d205d20f61c88eeea9351d"}}}}
```


## admin_datadir <a id="admin_datadir"></a>

`datadir` の管理プロパティは、現在実行されている Klaytn ノード がすべてのデータベースを保存するために使用する絶対パスを照会できます。 デフォルトのパスは、ノードタイプ (kcn, kpn, ken) と OS タイプによって異なります。

| クライアント | メソッドの起動                       |
|:------:| ----------------------------- |
| コンソール  | `admin.datadir`               |
|  RPC   | `{"method": "admin_datadir"}` |

**パラメータ**

なし

**戻り値**

| タイプ | Description    |
| --- | -------------- |
| 文字列 | `datadir` のパス。 |

**例**

コンソール

```javascript
> admin.datadir
"/home/user/Library/KEN"
```
HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_datadir","id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":"/your/dir/ken/data/dd"}
```


## admin_peers <a id="admin_peers"></a>

`ピア` の管理プロパティは、ネットワーク粒度の接続された リモートノードについて知られているすべての情報について照会できます。 These include general information about the nodes themselves as participants of the [devp2p](https://github.com/ethereum/devp2p/blob/master/README.md) P2P overlay protocol, as well as specialized information added by each of the running application protocols.

| クライアント | メソッドの起動                     |
|:------:| --------------------------- |
| コンソール  | `admin.peers`               |
|  RPC   | `{"method": "admin_peers"}` |

**パラメータ**

なし

**戻り値**

| タイプ     | Description          |
| ------- | -------------------- |
| JSON文字列 | 接続されているすべてのピアに関する情報。 |

**例**

コンソール

```javascript
> admin.peers
[{
    caps: ["istanbul/64"],
    id: "5d73afadf1eb4d6ccd1e10ab0f00301a1642b102fb521f170f4eaa4b3cb9a58788d1e2b387d6ce3726cb4786d034feb7dd17b5055b6d9a888520011e5756c89e",
    name: "Klaytn/validator-3/vX.X.X/XXXX-XXXX/goX.X.X",
    network: {
      inbound: true,
      localAddress: "127.0.0.1:32323",
      nodeType: "cn",
      remoteAddress: "127.0.0.1:63323",
      static: false,
      trusted: false
    },
    protocols: {
      istanbul: {
        difficulty: 52794,
        head: "0x4c3000a6f8c40b0507d8ee4a3fc5c9865df0a8d66f882366ea95473c87342005",
        version: 64
      }
    }
},  /* ... */ {
    caps: ["istanbul/64"],
    id: "8bcf4297aa6bb46121bb20a18b7af8f1eaad7e7435c71cb64109511a73c5507744bca138ee76b52d06cecedde9d88fdfddbffc5c3b80c5cbace3c326d5df5f1f",
    name: "Klaytn/validator-2/vX.X.X/XXXX-XXXX/goX.X.X",
    networks: [{
      inbound: true,
      localAddress: "127.0.0.1:32323",
      nodeType: "cn",
      remoteAddress: "127.0.0.1:63247",
      static: false,
      trusted: false
    }],
    protocols: {
      istanbul: {
        difficulty: 52794,
        head: "0x4c3000a6f8c40b0507d8ee4a3fc5c9865df0a8d66f882366ea95473c87342005",
        version: 64
      }
    }
}]
```
HTTP RPC

**注**: 以下に示すすべてのIPアドレスを例として示します。 実行環境の実際のIPアドレスに置き換えてください。

```shell
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_peers","id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":[{"id":"144af69d2bb030c6a2a5eee7445dc613e200f19358547c35d56e6c8a5b4186a6953c028b6afd0ab3c2bfc4c86f24b0b0f8656fd6651fd3de
```


## admin_addPeer <a id="admin_addpeer"></a>

`addPeer` は、追跡された静的な ノードのリストに新しいリモートノードを追加するよう要求する管理方法です。 ノードは常にこれらのノードへの接続を維持しようとします リモート接続が切断された場合、 をしばらく毎に再接続します。

このメソッドは単一の引数ナイフを受け取り、これは「Klaytn Network Identifier」を意味します。 これは、 [`enode`](https://github.com/ethereum/wiki/wiki/enode-url-format) のゲスの概念に似ています。 トラッキングを開始するリモートピアの URL です。 `BOOL` は、ピアが トラッキングのために受け入れられたか、またはエラーが発生したかを示します。

| クライアント | メソッドの起動                                        |
|:------:| ---------------------------------------------- |
| コンソール  | `admin.addPeer(url)`                           |
|  RPC   | `{"method": "admin_addPeer", "params": [url]}` |

**パラメータ**

| 名前  | タイプ | Description    |
| --- | --- | -------------- |
| URL | 文字列 | ピアの `kni` URL。 |

**戻り値**

| タイプ  | Description                          |
| ---- | ------------------------------------ |
| bool | `ピアが受け入れられた場合には true` `false` となります。 |

**例**

コンソール
```javascript
> admin.addPeer("kni://a979fb575495b8d6db44f750317d0f4622bf4c2aa3365d6af7c284339968eef29b69ad0dce72a4d8db5ebb4968de0e3bec910127f134779fbcb0cb6d3331163c@10.0.0.1:32323") //これは例アドレスです。
true
```
HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_addPeer","params":["kni://a979fb575495b8d6db44f750317d0f4622bf4c2aa3365d6af7c284339968eef29b69ad0dce72a4d8db5ebb4968de0e3bec910127f134779fbcb0cb6d3331163c@10.0.0.1:32323"],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":true}
```


## admin_removePeer <a id="admin_removepeer"></a>

`removePeer` は、追跡された静的な ノードのリストからノードを削除するよう要求する管理方法です。

このメソッドは単一の引数ナイフを受け取り、これは「Klaytn Network Identifier」を意味します。 これは、 [`enode`](https://github.com/ethereum/wiki/wiki/enode-url-format) のゲスの概念に似ています。 リストから削除されるリモートピアの URL で、ピアが削除されたか、または何らかのエラーが発生したかを示す `BOOL` を返します。

| クライアント | メソッドの起動                                           |
|:------:| ------------------------------------------------- |
| コンソール  | `admin.removePeer(url)`                           |
|  RPC   | `{"method": "admin_removePeer", "params": [url]}` |

**パラメータ**

| 名前  | タイプ | Description    |
| --- | --- | -------------- |
| URL | 文字列 | ピアの `kni` URL。 |

**戻り値**

| タイプ  | Description                          |
| ---- | ------------------------------------ |
| bool | `ピアが受け入れられた場合には true` `false` となります。 |

**例**

コンソール
```javascript
> admin.removePeer("kni://a979fb575495b8d6db44f750317d0f4622bf4c2aa3365d6af7c284339968eef29b69ad0dce72a4d8db5ebb4968de0e3bec910127f134779fbcb0cb6d3331163c@10.0.0.1:323") //これは例アドレスです。
true
```
HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_removePeer","params":["kni://a979fb575495b8d6db44f750317d0f4622bf4c2aa3365d6af7c284339968eef29b69ad0dce72a4d8db5ebb4968de0e3bec910127f134779fbcb0cb6d3331163c@10.0.0.1:32323"],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":true}
```

## admin_startHTTP <a id="admin_starthttp"></a>

**注意**: この API は `admin_startRPC` を置き換えます。 `admin_startRPC` はまもなく廃止されます。

`startHTTP` は HTTP ベースの [JSON RPC](http://www.jsonrpc.org/specification) クライアントのリクエストを処理する API ウェブサーバーを開始する管理メソッドです。

このメソッドは、HTTP RPCリスナーが開かれたかどうかを指定するブーリアンフラグを返します。 注意:HTTPエンドポイントはいつでも有効にすることができます。

| クライアント | メソッドの起動                                                             |
|:------:| ------------------------------------------------------------------- |
| コンソール  | `admin.startHTTP(host, port, cors, apis)`                           |
|  RPC   | `{"method": "admin_startHTTP", "params": [host, port, cors, apis]}` |

**パラメータ**

| 名前   | タイプ | Description                                                                                                                             |
| ---- | --- | --------------------------------------------------------------------------------------------------------------------------------------- |
| ホスト  | 文字列 | (オプション) リスナーソケットを開くためのネットワークインターフェイス (デフォルト:  `"localhost"`)。                                                                           |
| ポート  | int | (オプション) ネットワークポートでリスナーソケットを開きます (デフォルト:  `8551`).                                                                                       |
| cors | 文字列 | (optional) [cross-origin resource sharing](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) header to use (default:  `""`). |
| apis | 文字列 | (オプション) このインターフェイス上で提供する API モジュール (デフォルト:  `"klay,net,rpc"`)。                                                                          |

**戻り値**

| タイプ  | Description                                |
| ---- | ------------------------------------------ |
| bool | `HTTP RPCリスナーが開かれた場合、` true `false` でない場合。 |

**例**

コンソール

```javascript
> admin.startHTTP("127.0.0.1", 8551)
true
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_startHTTP","id":1, "params":["127.0.0.01", 8551, "", "klay"]}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"error":{"code":-32000,"message":":"HTTPRPCはすでに127.0.0.11:8551"}}
```


## admin_stopHTTP <a id="admin_stophttp"></a>

**注意**: この API は `admin_stopRPC` を置き換えます。 `admin_stopRPC` はまもなく廃止されます。

`stopHTTP` は、現在開いている HTTP RPC エンドポイントを閉じる管理方法です。 ノードは単一の HTTP エンドポイントしか実行できないため、このメソッドはパラメータを取りません。 エンドポイントが閉じられているかどうかの真偽値を返します。

| クライアント | メソッドの起動                        |
|:------:| ------------------------------ |
| コンソール  | `admin.stopHTTP()`             |
|  RPC   | `{"method": "admin_stopHTTP"}` |

**パラメータ**

なし

**戻り値**

| タイプ  | Description                                 |
| ---- | ------------------------------------------- |
| bool | `エンドポイントが閉じられた場合は true` 、 そうでない場合は `false`。 |

**例**

コンソール

```javascript
> admin.stopHTTP()
true
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_stopHTTP","id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":true}
```


## admin_startWS <a id="admin_startws"></a>

`startWS` はクライアントのリクエストを処理するために WebSocket ベースの [JSON RPC](http://www.jsonrpc.org/specification) API Webserver を開始する管理メソッドです。

このメソッドは、WebSocket RPCリスナーが開かれたかどうかを指定するブーリアンフラグを返します。 ご注意ください。WebSocketエンドポイントはいつでも有効にすることができます。

| クライアント | メソッドの起動                                                           |
|:------:| ----------------------------------------------------------------- |
| コンソール  | `admin.startWS(host, port, cors, apis)`                           |
|  RPC   | `{"method": "admin_startWS", "params": [host, port, cors, apis]}` |

**パラメータ**

| 名前   | タイプ | Description                                                                                                                             |
| ---- | --- | --------------------------------------------------------------------------------------------------------------------------------------- |
| ホスト  | 文字列 | (オプション) リスナーソケットを開くためのネットワークインターフェイス (デフォルト:  `"localhost"`)。                                                                           |
| ポート  | int | (オプション) ネットワークポートでリスナーソケットを開きます (デフォルト:  `8552`)。                                                                                       |
| cors | 文字列 | (optional) [cross-origin resource sharing](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) header to use (default:  `""`). |
| apis | 文字列 | (オプション) このインターフェイスを介して提供する API モジュール (デフォルト:  `"klay,net,personal"`).                                                                   |

**戻り値**

| タイプ  | Description                                     |
| ---- | ----------------------------------------------- |
| bool | `WebSocket RPCリスナーが開かれた場合、` true `false` でない場合。 |

**例**

コンソール

```javascript
> admin.startWS("127.0.0.1", 8552)
true
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_startWS","params":["127.0.0.1", 8552, "", "klay"],"id":1}) https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":true}
```


## admin_stopWS <a id="admin_stopws"></a>

`stopWS` は現在開いているWebSocket RPCエンドポイントを閉じる管理方法です。 ノードが実行できるのは単一のWebSocketエンドポイントのみです。 このメソッドはパラメータを取りません。エンドポイントが閉じているかどうかに関わらず、真偽値を返します。

| クライアント | メソッドの起動                      |
|:------:| ---------------------------- |
| コンソール  | `admin.stopWS()`             |
|  RPC   | `{"method": "admin_stopWS"}` |

**パラメータ**

なし

**戻り値**

| タイプ  | Description                                 |
| ---- | ------------------------------------------- |
| bool | `エンドポイントが閉じられた場合は true` 、 そうでない場合は `false`。 |

**例**

コンソール

```javascript
> admin.stopWS()
true
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_stopWS","id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":true}
```


## admin_exportChain <a id="admin_exportchain"></a>

`exportChain` は、ブロックチェーンをファイルにエクスポートする管理方法です。

| クライアント | メソッドの起動                                                  |
|:------:| -------------------------------------------------------- |
| コンソール  | `admin.exportChain(fileName)`                            |
|  RPC   | `{"method": "admin_importChain"}, "params": [fileName]}` |

**パラメータ**

| 名前       | タイプ | Description                           |
| -------- | --- | ------------------------------------- |
| fileName | 文字列 | ブロックチェーンをエクスポートする必要があるファイルへの完全修飾パスです。 |

**戻り値**

| タイプ  | Description                             |
| ---- | --------------------------------------- |
| bool | `チェーンがエクスポートされた場合、` true `false` になります。 |

**例**

コンソール

```javascript
> admin.exportChain("/tmp/chain.txt")
true
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_exportChain","params":["/tmp/chain.txt"],"id":1}) https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":true}
```


## admin_importChain <a id="admin_importchain"></a>

`importChain` は、エクスポートされたチェーンをファイルからノードにインポートする管理方法です。 このメソッドは、Klaytn ノードに存在しないブロックのみをインポートします。 このメソッドは、既存のチェーンのデータを削除しません。

| クライアント | メソッドの起動                                                  |
|:------:| -------------------------------------------------------- |
| コンソール  | `admin.importChain(fileName)`                            |
|  RPC   | `{"method": "admin_importChain"}, "params": [fileName]}` |

**パラメータ**

| 名前       | タイプ | Description                  |
| -------- | --- | ---------------------------- |
| fileName | 文字列 | インポートされるチェーンを含むファイルへの完全修飾パス。 |

**戻り値**

| タイプ  | Description                            |
| ---- | -------------------------------------- |
| bool | `チェーンがインポートされた場合、` true `false` になります。 |

**例**

コンソール

```javascript
> admin.importChain("/tmp/chain.txt")
true
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_importChain","params":["/tmp/chain.txt"],"id":1}) https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":true}
```

## admin_importChainFromString <a id="admin_importchainfromstring"></a>

`importChainFromString` は、ブロックの RLP エンコードされた文字列から Klaytn ノードにチェーンをインポートする管理メソッドです。 これは、Klaytn ノードに既存のチェーンがない場合にのみ機能します。 このメソッドは、既存のチェーンのデータを削除しません。

| クライアント | メソッドの起動                                                                    |
|:------:| -------------------------------------------------------------------------- |
| コンソール  | `admin.importChainFromString(blockRlp)`                                    |
|  RPC   | `{"method": "admin_importChainFromString"}, "params": [<blockRlp>]}` |

**パラメータ**

| 名前       | タイプ | Description                                                     |
| -------- | --- | --------------------------------------------------------------- |
| blockRlp | 文字列 | インポートするブロックを表す RLP エンコードされた文字列。 ( `debug.getBlockRlp` の戻り値に等しい) |

**戻り値**

| タイプ  | Description                                       |
| ---- | ------------------------------------------------- |
| bool | `チェーンがインポートされた場合は true` を、そうでない場合は `false` を返します。 |

**例**

コンソール

```javascript
> admin.importChainFromString("f9071...080c0")
true
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_importChainFromString","params":["f9071...080c0"],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":true}
```

## admin_startStateMigration <a id="admin_startstatemigration"></a>

`startStateMigration` は、ステートの移行を開始し、古いstate/storage trieノードを削除する管理メソッドです。 これにより、Klaytn ノードのストレージスペースを節約できます。 状態移行の開始に失敗した場合は、メソッドはエラーを返します。開始に成功した場合は `null` です。 注: ステートの移行後、ノードは以前の状態で API を提供することはできません。

| クライアント | メソッドの起動                                   |
|:------:| ----------------------------------------- |
| コンソール  | `admin.startStateMigration()`             |
|  RPC   | `{"method": "admin_startStateMigration"}` |

**パラメータ**

なし

**戻り値**

| タイプ | Description                                        |
| --- | -------------------------------------------------- |
| エラー | `null` 状態の移行が開始されている場合、またはそうでない場合にエラーメッセージが表示されます。 |

**例**

コンソール

```javascript
> admin.startStateMigration()
null
```

HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_startStateMigration","id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":null}
```


## admin_stopStateMigration <a id="admin_stopstatemigration"></a>

`stopStateMigration` は現在実行中の状態移行を停止する管理方法です。 このメソッドはパラメータを取らず、 `null` を返すか、状態の移行が停止したかどうかにかかわらずエラーを返します。

| クライアント | メソッドの起動                                  |
|:------:| ---------------------------------------- |
| コンソール  | `admin.stopStateMigration()`             |
|  RPC   | `{"method": "admin_stopStateMigration"}` |

**パラメータ**

なし

**戻り値**

| タイプ | Description                                |
| --- | ------------------------------------------ |
| エラー | `null` 状態の移行が停止された場合、またはそうでない場合にエラーが発生します。 |


**例**

コンソール

```javascript
> admin.stopStateMigration()
true
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_stopStateMigration","id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":null}
```

## admin_stateMigrationStatus <a id="admin_statemigrationstatus"></a>

`stateMigrationStatus` は、状態移行の状態情報を返す管理メソッドです。 このメソッドはパラメータを取らず、現在実行中の状態マイグレーションの状態を返します。

| クライアント | メソッドの起動                                    |
|:------:| ------------------------------------------ |
| コンソール  | `admin.stateMigrationStatus`               |
|  RPC   | `{"method": "admin_stateMigrationStatus"}` |

**パラメータ**

なし

**戻り値**

| 名前                   | タイプ     | Description                                      |
| -------------------- | ------- | ------------------------------------------------ |
| コミット済み               | int     | `commited` は状態の移行によってコピーされたtrieノードの数です。          |
| Err                  | エラー     | `null` 状態の移行が正常に完了した場合、またはそうでない場合にエラーが発生します。     |
| isMigration          | bool    | `状態の移行が実行されている場合は true` 、そうでない場合は `false` にします。  |
| migrationBlockNumber | uint64  | 状態の移行が開始された blockNumber (`0 0` 状態の移行が実行されていない場合。 |
| pending              | int     | `保留中` は状態の移行によって処理されていないトライノードの数を表す。             |
| 進行状況                 | float64 | `進捗状況` がパーセントで計算された状態移行の進捗状況です。                  |
| 既読にする                | int     | `read` は、状態の移行によって読み取られたトリエノードの数を表します。           |

**例**

コンソール

```javascript
> admin.stateMigrationStatus
{
  committed: 1585169,
  err: "null",
  isMigration: true,
  migrationBlockNumber: 32527233,
  pending: 27677,
  progress: 0.3662109375,
  read: 1587473
}
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_stateMigrationStatus","id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":{"committed":14995692,"err":"null","isMigrationBlockNumber":32630836,"pending":19699,"progress":25,"read:14997777}}
```

## admin_saveTrieNodeCacheToDisk <a id="admin_saveTrieNodeCacheToDisk"></a>

`saveTrieNodeCacheToDisk` は、キャッシュされた trie ノードをディスクに保存し、ノードの再起動時に再利用する管理方法です。 キャッシュされたトライノードデータは  `$DATA_DIR/fastcache` に格納され、ロードされます。 このメソッドは、保存プロセスがすでにトリガーされている場合や、trieノードキャッシュが無効になっている場合にエラーを返します。 この機能は Klaytn 1.5.3 以降でサポートされています。

| クライアント | メソッドの起動                                       |
|:------:| --------------------------------------------- |
| コンソール  | `admin.saveTrieNodeCacheToDisk()`             |
|  RPC   | `{"method": "admin_saveTrieNodeCacheToDisk"}` |

**パラメータ**

なし

**戻り値**

| タイプ | Description                                        |
| --- | -------------------------------------------------- |
| エラー | `true ノードの保存が開始されている場合は null` またはそうでない場合はエラーメッセージ。 |

**例**

コンソール

```javascript
> admin.saveTrieNodeCacheToDisk()
null
```

HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_saveTrieNodeCacheToDisk", "id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":null}
```

## admin_setMaxSubscriptionPerWSConn <a id="admin_setMaxSubscriptionPerWSConn"></a>

`setMaxSubscriptionPerWSConn` は、単一の WebSocket 接続あたりの最大許容数を設定する管理方法です。 例えば、 最大数が5に設定され、ユーザーが `klay_subscribe` APIを通じて5つ以上のサブスクリプションを要求する場合 「WebSocket接続には最大5件のサブスクリプションが許可されています」というエラーメッセージが表示されます。 この機能は Klaytn 1.6.0 以降でサポートされています。

| クライアント | メソッドの起動                                           |
|:------:| ------------------------------------------------- |
| コンソール  | `admin.setMaxSubscriptionPerWSConn(limit)`        |
|  RPC   | `{"method": "admin_setMaxSubscriptionPerWSConn"}` |

**パラメータ**

| 名前 | タイプ | Description                          |
| -- | --- | ------------------------------------ |
| 制限 | int | 単一の WebSocket 接続あたりのサブスクリプションの最大許容数。 |

**戻り値**

| タイプ | Description                                    |
| --- | ---------------------------------------------- |
| エラー | `null` もし制限が正常に設定されていれば、それ以外の場合はエラーメッセージを返します。 |

**例**

コンソール

```javascript
> admin.setMaxSubscriptionPerWSConn(5)
null
```

HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_setMaxSubscriptionPerWSConn", "params":[5], "id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":null}
```
