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

Console
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

| Client  | Method invocation             |
|:-------:| ----------------------------- |
| Console | `admin.datadir`               |
|   RPC   | `{"method": "admin_datadir"}` |

**Parameters**

None

**Return Value**

| Type | Description    |
| ---- | -------------- |
| 文字列  | `datadir` のパス。 |

**Example**

Console

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

| Client  | Method invocation           |
|:-------:| --------------------------- |
| Console | `admin.peers`               |
|   RPC   | `{"method": "admin_peers"}` |

**Parameters**

None

**Return Value**

| Type        | Description          |
| ----------- | -------------------- |
| JSON string | 接続されているすべてのピアに関する情報。 |

**Example**

Console

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

| Client  | Method invocation                              |
|:-------:| ---------------------------------------------- |
| Console | `admin.addPeer(url)`                           |
|   RPC   | `{"method": "admin_addPeer", "params": [url]}` |

**Parameters**

| 名前  | Type   | Description    |
| --- | ------ | -------------- |
| URL | string | ピアの `kni` URL。 |

**Return Value**

| Type | Description                          |
| ---- | ------------------------------------ |
| bool | `ピアが受け入れられた場合には true` `false` となります。 |

**Example**

Console
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

The method accepts a single argument kni, which means "Klaytn Network Identifier". It is similar to the [`enode`](https://github.com/ethereum/wiki/wiki/enode-url-format) concept in the geth. リストから削除されるリモートピアの URL で、ピアが削除されたか、または何らかのエラーが発生したかを示す `BOOL` を返します。

| Client  | Method invocation                                 |
|:-------:| ------------------------------------------------- |
| Console | `admin.removePeer(url)`                           |
|   RPC   | `{"method": "admin_removePeer", "params": [url]}` |

**Parameters**

| Name | Type   | Description       |
| ---- | ------ | ----------------- |
| url  | string | Peer's `kni` URL. |

**Return Value**

| Type | Description                                         |
| ---- | --------------------------------------------------- |
| bool | `true` if the peer was accepted, `false` otherwise. |

**Example**

Console
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

| Client  | Method invocation                                                   |
|:-------:| ------------------------------------------------------------------- |
| Console | `admin.startHTTP(host, port, cors, apis)`                           |
|   RPC   | `{"method": "admin_startHTTP", "params": [host, port, cors, apis]}` |

**Parameters**

| Name | Type   | Description                                                                                                                             |
| ---- | ------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| ホスト  | string | (オプション) リスナーソケットを開くためのネットワークインターフェイス (デフォルト:  `"localhost"`)。                                                                           |
| ポート  | int    | (オプション) ネットワークポートでリスナーソケットを開きます (デフォルト:  `8551`).                                                                                       |
| cors | string | (optional) [cross-origin resource sharing](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) header to use (default:  `""`). |
| apis | string | (オプション) このインターフェイス上で提供する API モジュール (デフォルト:  `"klay,net,rpc"`)。                                                                          |

**Return Value**

| Type | Description                                |
| ---- | ------------------------------------------ |
| bool | `HTTP RPCリスナーが開かれた場合、` true `false` でない場合。 |

**Example**

Console

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

| Client  | Method invocation              |
|:-------:| ------------------------------ |
| Console | `admin.stopHTTP()`             |
|   RPC   | `{"method": "admin_stopHTTP"}` |

**Parameters**

None

**Return Value**

| Type | Description                                 |
| ---- | ------------------------------------------- |
| bool | `エンドポイントが閉じられた場合は true` 、 そうでない場合は `false`。 |

**Example**

Console

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

| Client  | Method invocation                                                 |
|:-------:| ----------------------------------------------------------------- |
| Console | `admin.startWS(host, port, cors, apis)`                           |
|   RPC   | `{"method": "admin_startWS", "params": [host, port, cors, apis]}` |

**Parameters**

| Name | Type   | Description                                                                                                                             |
| ---- | ------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| host | string | (optional) network interface to open the listener socket on (default:  `"localhost"`).                                                  |
| port | int    | (オプション) ネットワークポートでリスナーソケットを開きます (デフォルト:  `8552`)。                                                                                       |
| cors | string | (optional) [cross-origin resource sharing](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) header to use (default:  `""`). |
| apis | string | (オプション) このインターフェイスを介して提供する API モジュール (デフォルト:  `"klay,net,personal"`).                                                                   |

**Return Value**

| Type | Description                                     |
| ---- | ----------------------------------------------- |
| bool | `WebSocket RPCリスナーが開かれた場合、` true `false` でない場合。 |

**Example**

Console

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

| Client  | Method invocation            |
|:-------:| ---------------------------- |
| Console | `admin.stopWS()`             |
|   RPC   | `{"method": "admin_stopWS"}` |

**Parameters**

None

**Return Value**

| Type | Description                                        |
| ---- | -------------------------------------------------- |
| bool | `true` if the endpoint was closed, `false` if not. |

**Example**

Console

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

| Client  | Method invocation                                        |
|:-------:| -------------------------------------------------------- |
| Console | `admin.exportChain(fileName)`                            |
|   RPC   | `{"method": "admin_importChain"}, "params": [fileName]}` |

**Parameters**

| Name     | Type   | Description                           |
| -------- | ------ | ------------------------------------- |
| fileName | string | ブロックチェーンをエクスポートする必要があるファイルへの完全修飾パスです。 |

**Return Value**

| Type | Description                             |
| ---- | --------------------------------------- |
| bool | `チェーンがエクスポートされた場合、` true `false` になります。 |

**Example**

Console

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

| Client  | Method invocation                                        |
|:-------:| -------------------------------------------------------- |
| Console | `admin.importChain(fileName)`                            |
|   RPC   | `{"method": "admin_importChain"}, "params": [fileName]}` |

**Parameters**

| Name     | Type   | Description                  |
| -------- | ------ | ---------------------------- |
| fileName | string | インポートされるチェーンを含むファイルへの完全修飾パス。 |

**Return Value**

| Type | Description                            |
| ---- | -------------------------------------- |
| bool | `チェーンがインポートされた場合、` true `false` になります。 |

**Example**

Console

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

`importChainFromString` は、ブロックの RLP エンコードされた文字列から Klaytn ノードにチェーンをインポートする管理メソッドです。 これは、Klaytn ノードに既存のチェーンがない場合にのみ機能します。 This method does not delete any data of the existing chain.

| Client  | Method invocation                                                          |
|:-------:| -------------------------------------------------------------------------- |
| Console | `admin.importChainFromString(blockRlp)`                                    |
|   RPC   | `{"method": "admin_importChainFromString"}, "params": [<blockRlp>]}` |

**Parameters**

| Name     | Type   | Description                                                     |
| -------- | ------ | --------------------------------------------------------------- |
| blockRlp | string | インポートするブロックを表す RLP エンコードされた文字列。 ( `debug.getBlockRlp` の戻り値に等しい) |

**Return Value**

| Type | Description                                       |
| ---- | ------------------------------------------------- |
| bool | `チェーンがインポートされた場合は true` を、そうでない場合は `false` を返します。 |

**Example**

Console

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

| Client  | Method invocation                         |
|:-------:| ----------------------------------------- |
| Console | `admin.startStateMigration()`             |
|   RPC   | `{"method": "admin_startStateMigration"}` |

**Parameters**

None

**Return Value**

| Type | Description                                        |
| ---- | -------------------------------------------------- |
| エラー  | `null` 状態の移行が開始されている場合、またはそうでない場合にエラーメッセージが表示されます。 |

**Example**

Console

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

| Client  | Method invocation                        |
|:-------:| ---------------------------------------- |
| Console | `admin.stopStateMigration()`             |
|   RPC   | `{"method": "admin_stopStateMigration"}` |

**Parameters**

None

**Return Value**

| Type  | Description                                |
| ----- | ------------------------------------------ |
| Error | `null` 状態の移行が停止された場合、またはそうでない場合にエラーが発生します。 |


**Example**

Console

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

| Client  | Method invocation                          |
|:-------:| ------------------------------------------ |
| Console | `admin.stateMigrationStatus`               |
|   RPC   | `{"method": "admin_stateMigrationStatus"}` |

**Parameters**

None

**Return Value**

| Name                 | Type    | Description                                      |
| -------------------- | ------- | ------------------------------------------------ |
| コミット済み               | int     | `commited` は状態の移行によってコピーされたtrieノードの数です。          |
| Err                  | Error   | `null` 状態の移行が正常に完了した場合、またはそうでない場合にエラーが発生します。     |
| isMigration          | bool    | `状態の移行が実行されている場合は true` 、そうでない場合は `false` にします。  |
| migrationBlockNumber | uint64  | 状態の移行が開始された blockNumber (`0 0` 状態の移行が実行されていない場合。 |
| pending              | int     | `保留中` は状態の移行によって処理されていないトライノードの数を表す。             |
| 進行状況                 | float64 | `進捗状況` がパーセントで計算された状態移行の進捗状況です。                  |
| 既読にする                | int     | `read` は、状態の移行によって読み取られたトリエノードの数を表します。           |

**Example**

Console

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

| Client  | Method invocation                             |
|:-------:| --------------------------------------------- |
| Console | `admin.saveTrieNodeCacheToDisk()`             |
|   RPC   | `{"method": "admin_saveTrieNodeCacheToDisk"}` |

**Parameters**

None

**Return Value**

| Type  | Description                                        |
| ----- | -------------------------------------------------- |
| Error | `true ノードの保存が開始されている場合は null` またはそうでない場合はエラーメッセージ。 |

**Example**

Console

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

| Client  | Method invocation                                 |
|:-------:| ------------------------------------------------- |
| Console | `admin.setMaxSubscriptionPerWSConn(limit)`        |
|   RPC   | `{"method": "admin_setMaxSubscriptionPerWSConn"}` |

**Parameters**

| Name | Type | Description                          |
| ---- | ---- | ------------------------------------ |
| 制限   | int  | 単一の WebSocket 接続あたりのサブスクリプションの最大許容数。 |

**Return Value**

| Type  | Description                                    |
| ----- | ---------------------------------------------- |
| Error | `null` もし制限が正常に設定されていれば、それ以外の場合はエラーメッセージを返します。 |

**Example**

Console

```javascript
> admin.setMaxSubscriptionPerWSConn(5)
null
```

HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_setMaxSubscriptionPerWSConn", "params":[5], "id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":null}
```
