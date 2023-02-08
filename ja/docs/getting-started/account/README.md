# アカウント管理 <a id="account-management"></a>

**`警告`**: パスワードを記憶してください。 アカウントのパスワードを紛失すると、そのアカウントにアクセスできなくなります。 **ここに** _**パスワードを忘れた**_ **オプションはありません。 決して忘れないでください。**

Klaytnは、開発者がアカウントを管理するための2つの便利なコマンドラインツール、 `ken` と `JavaScript コンソール`を提供します。 秘密鍵を暗号化されていない形式でエクスポートすることはサポートされていません。

## <unk> <a id="ken"></a>

Klaytn Endpoint Node binary `ken` は `account` コマンドを介してアカウント管理を提供します。 コマンド `アカウント` を使用すると、新しいアカウントを作成できます。 秘密鍵を新しいアカウントにインポートし、最新の鍵形式に移行し、パスワードを変更します。

### 使用法 <a id="usage"></a>

```bash
$ ken account <command> [options...] [arguments...]
```

**マーク**

```bash
$ ken account -help
...
コメント:
     list 既存の口座の概要
     new アカウントを作成
     更新 既存の口座を更新
     import a private key into a new account
...
```

サブコマンドについての情報は `ken account <command> --help` で取得できます。

```text
$ ken account list --help
list [command options] [arguments...]

Print a short summary of all accounts

KLAY OPTIONS:
  --dbtype value                        Blockchain storage database type ("leveldb", "badger") (default: "leveldb")
  --datadir "/Users/ethan/Library/KEN"  Data directory for the databases and keystore
  --keystore                            Directory for the keystore (default = inside the datadir)

DATABASE OPTIONS:
  --db.no-partitioning  Disable partitioned databases for persistent storage
```

### データディレクトリ <a id="data-directory"></a>

キーストアファイルは `<DATADIR>/keystore` の下に保存されます。 データディレクトリは以下のように指定できます。 `--datadir` オプションで `ken account` コマンドを実行することを強くお勧めします。 `kend.conf` に設定された `DATA_DIR` をデータディレクトリポイントにして、エンドポイントノードとアカウントをシームレスに共有します。

```bash
$ ken account new --datadir <DATADIR>
$ ken account new --datadir "~/kend_home"
```

dataディレクトリを指定しない場合、デフォルトの場所は以下のとおりです。

* Mac: `~/Library/KEN`
* Linux: `~/.ken`

## JavaScript コンソール <a id="javascript-console"></a>

JavaScript コンソールに接続するには、EN が実行中の状態である必要があります。 詳細については、 [EN](../quick-start/launch-an-en.md) の起動を参照してください。 ENを起動し、次のようにコンソールに接続します。

### Usage <a id="usage"></a>

```bash
$ kend start
Starting kend: OK

$ ken attach ~/kend_home/klay.ipc
Klaytn JavaScript コンソールへようこそ!

instance: Klaytn/vX.X.X/XXXX-XXXX-XXXX/goX.X
 datadir: ~/kend_home
 modules: admin:1.0 debug:1.0 governance:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0

>
```

**Commands**

利用可能な関数のリストを取得するには、 `personal` または `klay` と入力します。 このチュートリアルでは、以下の機能をご紹介します。

```bash
> personal.newAccount()
> personal.importRawKey()
> personal.unlockAccount()
> klay.accounts
> klay.getBalance()
```

### Data Directory <a id="data-directory"></a>

アカウントを作成すると、キーストアファイルは `<DATADIR>/keystore` の下に保存されます。 `<DATADIR>` は `kend.conf` で設定された `DATA_DIR` です。 与えられた例でクイックスタートガイドに従う場合は、 `~/kend_home` でなければなりません。

