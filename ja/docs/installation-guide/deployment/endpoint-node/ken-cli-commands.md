# ken CLI commands <a id="ken-cli-commands"></a>

`ken` は Klaytn Endpoint Node のコマンドラインインターフェイスです。

```bash
USAGE:
   ken [options] コマンド [command options] [arguments...]
```

## マーク <a id="commands"></a>

`ken` には以下のコマンドがあります。

```bash
COMMANDS:
   account Manage accounts
   attach interactive JavaScript environment(connect to node)
   console インタラクティブな JavaScript environment
   dumpconfig 設定値を表示します。
   dumpgenesis ブロックの JSON 設定を標準出力に変換します (このコマンドは Klaytn v1 から取って代わられます。 .0.)
   init        Bootstrap and initialize a new genesis block
   snapshot    A set of commands based on the snapshot
   version     Show version number
   help, h     Shows a list of commands or help for one command
```

各コマンドの詳細な使用ガイドラインを取得するには、 `-h` オプションを指定します。

```bash
$ ken account -h
Manage accounts, list all existing accounts, import a private key into a new
account, create a new account or update an existing account.
 ...
キーは <DATADIR>/keystore の下に保存されます。
単にコピーするだけでディレクトリ全体または個々のキーを klay ノード間で
転送することが安全です。

キーを定期的にバックアップしてください。

使用状況:
   kenアカウントコマンド [command options] [arguments...]

COMMANDS:
     list 既存のアカウントのサマリーを印刷する
     new アカウントを作成する
     update an existing account
     import a private key into a new account
```

```bash
$ ken init -h
init [command options] [arguments...]

init コマンドは、ネットワークの新しいジェネシスブロックと定義を初期化します。
これは破壊的な動作であり、あなたが
参加するネットワークを変更します。
 ...
```

## JavaScript コンソール <a id="javascript-console"></a>

Klaytn Endpoint Node comes with JavaScript console. From the console command line, you can initiate part of Klaytn API calls to your EN. To attach to the JavaScript console, execute the following command.

```bash
$ ken attach ~/kend_home/klay.ipc
Welcome to the Klaytn JavaScript console

!instance: Klaytn/vX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/kend_home
 modules: admin:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0

 >
```

`` コマンドを実行中のノードにアタッチし、 `コンソール` コマンドを実行してノードに接続します。

```bash
   アタッチ インタラクティブな JavaScript 環境を開始します(ノードに接続)
   コンソール インタラクティブな JavaScript 環境を開始します。
```

### モジュール API <a id="module-apis"></a>

コンソールプロンプトでモジュール名を入力すると、モジュールの利用可能なプロパティと機能が表示されます。 関数の詳細については、 [Klaytn API](../../dapp/json-rpc/api-references/README.md) を参照してください。

```javascript
> personal
{
  listAccounts: [...],
  listWallets: [...],
  deriveAccount: function(),
  ecRecover: function(),
  getListAccounts: function(callback),
  getListWallets: function(callback),
  importRawKey: function(),
  lockAccount: function(),
  ...
}

> personal.listAccounts
["0x960dba2500ab529693ef8e299210768aa0d55ec8", "0x09a04dc9ac3cd92de5ff0d45ae50ff1b618305d9", "0x36662211c072dadbf5fc1e087ddebd36df986abd", "0xbf9683cf04520eeba6d936a3478de29437c5d048"]
> 
```  
