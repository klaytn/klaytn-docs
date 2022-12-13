# 設定 <a id="configuration"></a>

CN構成は、データディレクトリを作成し、設定ファイル `kcnd.conf`に複数の値を設定します。

1. CNデータディレクトリを作成します。
2. ノードキーをインストール
3. `kcnd.conf` で CNを設定します。

## CNデータディレクトリの作成 <a id="cn-data-directory-creation"></a>

Klaytnブロックチェーンデータのサイズが常に増加していることを考慮すると、十分な大きさのストレージを使用することをお勧めします。 必要なパスにディレクトリを作成する必要があります。

```bash
$ mkdir -p /var/kcnd/data
```

## ノードキーのインストール <a id="install-node-key"></a>

CNを操作するには、 `nodekey` が必要です。 KCN バイナリがない場合、新しいバイナリが作成されます。 もしあれば、 `nodekey` を CN データディレクトリに入れる必要があります。 `nodekey` を作成する方法は、 '[インストールする前に '](../before-you-install.md)' セクションで説明されています。 次のコマンドラインは、 `nodekey` を CNデータディレクトリにコピーします。

```bash
$ cp nodekey /var/kcnd/data
```

## 設定ファイルを更新する <a id="update-the-configuration-file"></a>

設定ファイルの場所:

* アーカイブ配布の場合、config ディレクトリの場所のデフォルトは `$INSTALL_PATH/kcn-linux-amd64/conf/` です。
* パッケージ配布の場合、config ディレクトリのデフォルトは `/etc/kcnd/conf/` です。

### データディレクトリを追加  <a id="add-data-directory"></a>

You should update the the data directory environment variable `$DATA_DIR` on the configuration file `kcnd.conf`.

```text
...
DATA_DIR=/var/kcnd/data
...
```

### セットアップ報酬ベース <a id="setup-rewardbase"></a>

Klaytnネットワークのコンセンサスに参加した報酬として、CNオペレータはKLAYを受け取ります。 このため、設定ファイル `kcnd.conf` にアドレスを設定する必要があります。

新しいアカウントを作成する方法はさまざまですが、 `kcn` も機能を提供します。 以下のコマンドでヘルプメッセージを確認できます。

```bash
$ kcn account new --help
```

この手順を行う例の1つは以下のとおりです。 まず、報酬KLAYが送られる新しいアカウントを作成する必要があります。

```bash
$ kcn account new --datadir ~/kcnd_home
INFO[03/15,09:04:43 +09] [17] Setting connection type                   nodetype=cn conntype=-0
INFO[03/15,09:04:43 +09] [17] Maximum peer count                        KLAY=25 LES=0 total=25
INFO[03/15,09:04:43 +09] [17] SBN is disabled.
新しいアカウントはパスワードでロックされています。 パスワードを入力してください。 このパスワードを忘れないでください。
パスフレーズ:
パスフレーズを繰り返す:
住所: {d13f7da0032b1204f77029dc1ecbf4dae2f04241}
```

これにより、定義したパス上に、関連するキーストアが作成されます。 次に、作成したアドレスを `kcnd.conf` ファイルに以下のように置く必要があります。

```text
...
REWARDBASE="d13f7da0032b1204f77029dc1ecbf4dae2f04241"
...
```

キーストアとあなたが作成したパスワードは非常に重要なので、それらを管理するために注意が必要です。 `kcnd.conf` の詳細については、 [設定ファイル](../../operation-guide/configuration.md) セクションを参照してください。

## 高速同期 \(オプション\) <a id="fast-sync-optional"></a>

各CNは、ネットワークのチェーンデータのコピーを保持します。 ノードが同期されていない場合、ネットワーク内の他のノードからこのデータを取得できます。同期と呼ばれるプロセスです。 新しいCNが最初に開始されると、ネットワークからチェーンデータ全体をダウンロードする必要があります。

このプロセスを加速するには、CNを起動する前にチェーンデータのスナップショットをダウンロードして、高速同期を実行することができます。 これにより、CNが最初の起動時に同期に費やす時間が劇的に短縮されます。

[Cypress スナップショットアーカイブ](http://packages.klaytn.net/cypress/chaindata/) または [Baobab スナップショット アーカイブ](http://packages.klaytn.net/baobab/chaindata/) から最新のチェーンデータ スナップショットをダウンロードします。 `kcnd`を開始する前に、 `kcnd.conf` で設定したDATA\_DIR内のスナップショットを抽出します。

例:

```bash
$ tar -C ~/kcnd_home -xvf klaytn-cypress-chain-latest.tar.gz
```

または

```bash
$ tar -C ~/kcnd_home -xvf klaytn-baobab-chaindata-latest.tar.gz
```

データが抽出された後、CNを正常に開始することができます。

[Chaindata change](../../../../../operation-guide/chaindata-change.md) で詳細情報を参照できます。

