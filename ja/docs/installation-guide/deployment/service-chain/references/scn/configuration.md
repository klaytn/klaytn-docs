# Configuration <a id="configuration"></a>

このページでは、コンセンサスネットワークを形成するためのSCNの構成について説明します。

アーカイブ配布物をインストールした場合は、抽出したディレクトリにバイナリとconfigファイルを見つけることができます。 以下はコマンド実行の例です。
```bash
$ homi-darwin-amd64/bin/homi setup ...
$ kscn-darwin-amd64/bin/kscnd start
$ vi kscn-darwin-amd64/conf/kscnd.conf
```

このチュートリアルでは、コマンドへのフルパスを必ずしも指定しません。

## Genesis ファイルの作成 <a id="creation-of-a-genesis-file"></a>

まず、独自のサービスチェーンのためのジェネシスファイルとnodekeyファイルを作成する必要があります。 homiを使って以下のように作成できます。
```bash
$ homi setup --gen-type local --cn-num 1 --servicechain -o ./homi-output
Created :  homi-output/keys/passwd1
Created :  homi-output/scripts/genesis.json
Created :  homi-output/keys/nodekey1
Created :  homi-output/keys/validator1
Created :  homi-output/scripts/static-nodes.json
Created :  homi-output/Klaytn.json
Created :  homi-output/Klaytn_txpool.json
```

以下は genesis ファイルと nodekey ファイルの例です。
```bash
$ cat homi-output/scripts/genesis.json
{
    "config": {
        "chainId": 1000,
        "istanbul": {
            "epoch": 3600,
            "policy": 0,
            "sub": 22
        },
        "unitPrice": 0,
        "deriveShaImpl": 2,
        "governance": null
    },
    "timestamp": "0x5dca0732",
    "extraData": "0x0000000000000000000000000000000000000000000000000000000000000000f85ad594f8690562c0839c44b17af421f7aaaa9f12dcc62bb8410000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c0",
    "governanceData": null,
    "blockScore": "0x1",
    "alloc": {
        "f8690562c0839c44b17af421f7aaaa9f12dcc62b": {
            "balance": "0x2540be400"
        }
    },
    "number": "0x0",
    "gasUsed": "0x0",
    "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000"
}   
```

```bash      
$ cat homi-output/keys/nodekey1                                                                                                                                 
0c28c77ce5c2ca9e495b860f190ed7dfe7bd5c1a2e5f816587eb4d3d9566df44
```

生成ファイル内の chainID を変更してください。 自分の番号を使ってリプレイ攻撃を防ぎましょう。 (Klaytn Cypress (8217) と Baobab (1001) で同じチェーンIDを使用しないでください)

必要に応じて、genesis ファイルの `"alloc"` を編集することで、事前に資金を供給されたアドレスを変更できます。 (詳細は [Genesis JSON](../genesis.md) をご覧ください。

## SCN Data Directory Creation <a id="scn-data-directory-creation"></a>

Considering the fact that the size of Klaytn blockchain data keeps increasing, it is recommended to use a big enough storage. 任意のパスにデータディレクトリを作成できます。 このドキュメントでは、データディレクトリとして `~/kscnd_home` を作成します。

```bash
$ mkdir -p ~/kscnd_home
```

### Genesis Blockの初期化 <a id="initialization-of-a-genesis-block"></a>
その後、データディレクトリを genesis ファイルで初期化することができます。 Before starting a service chain node, it is necessary to initialize the genesis block of the service chain network using `kscn` and `genesis.json`.

```bash
$ kscn init --datadir ~/kscnd_home homi-output/scripts/genesis.json
  WARN[11/12,10:13:58 +09] [19] Some input value of genesis.json have been set to default or changed
  INFO[11/12,10:13:58 +09] [18] Setting connection type                   nodetype=cn conntype=0
    ...
  INFO[11/12,10:13:59 +09] [5] DeriveShareConcatを使用!
  INFO[11/12,10:13:59 +09] [5] カスタム生成ブロックを書く
  INFO[11/12,10:13:59 +09] [5] DeriveShaConcatを使う!
  INFO[11/12,10:13:59 +09] [47] Persisted trie from memory database       updated nodes=1 updated nodes size=80.00B time=304.931µs gcnodes=0 gcsize=0.00B gctime=0s livenodes=1 livesize=0.00B
  INFO[11/12,10:13:59 +09] [19] Successfully wrote genesis state          database=lightchaindata hash=0xc269669079fc8c06ac37435a563b8ed8ef273c1c835f3d823d2e586315319aa8
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/header
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/body
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/receipts
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/statetrie/0
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/statetrie/1
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/statetrie/2
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/statetrie/3
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/txlookup
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/misc
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/bridgeservice
```

### ノードキーをインストール <a id="install_nodekey"></a>
`homi-output/keys/nodekey1` を `klay` ディレクトリに以下のようにコピーします。

```bash
$ cp homi-output/keys/nodekey1 ~/kscnd_home/klay/nodekey
```

## SCNの構成 <a id="configuration-of-the-scn"></a>

`kscnd.conf` は SCN の設定ファイルです。

SCNはデフォルトのポートを使用し、 `~/kscnd_home` に大規模なパーティションをマウントすると仮定します。 デフォルトの `kscnd.conf` ファイルでは、 `SC_SUB_BRIDGE` オプションが無効になっており、 `DATA_DIR` が空です。
```
# kscnd の設定ファイル
...
SC_SUB_BRIDGE=0
...
DATA_DIR=
...
```

`SC_SUB_BRIDGE` を有効にして、アンカー/値転送機能を使用できます。 また、以下のようにDATA_DIRを設定してください。

```
# Configuration file for the kscnd
...
SC_SUB_BRIDGE=1
...
DATA_DIR=~/kscnd_home
...
```

必要に応じて、サービスチェーンをカスタマイズするために他のオプションをさらに変更することができます。 それ以外の場合は、設定を完了することができ、デフォルト設定を使用してサービスチェーンを実行する準備が整いました。


