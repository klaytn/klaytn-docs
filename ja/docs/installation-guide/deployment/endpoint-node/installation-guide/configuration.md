# 設定 <a id="configuration"></a>

EN構成は、データディレクトリを作成し、設定ファイル `kend.conf`に環境変数を設定することです。

1. ENデータディレクトリを作成します。
2. `kend.conf` で EN を設定します。

## EN データ ディレクトリ 作成 <a id="en-data-directory-creation"></a>

Klaytnブロックチェーンデータのサイズが増え続けていることを考えると、十分な大きさのストレージを使用することをお勧めします。 必要なパスにディレクトリを作成する必要があります。

```text
$ sudo mkdir -p /var/kend/data
```

## 設定ファイルを更新する <a id="update-the-configuration-file"></a>

設定ファイルの場所:

* アーカイブ配布の場合、config ディレクトリの場所のデフォルトは `$INSTALL_PATH/ken-linux-amd64/conf/` です。
* パッケージ配布の場合、config ディレクトリのデフォルトは `/etc/kend/conf/` です。

### データディレクトリを追加  <a id="add-data-directory"></a>

You should update the the data directory environment variable `$DATA_DIR` on the configuration file `kend.conf`.

```text
DATA_DIR=/var/kend/data
```

## 高速同期 \(オプション\) <a id="fast-sync-optional"></a>

各ENは、ネットワークのチェーンデータのコピーを保持します。 ノードが同期されていない場合、ネットワーク内の他のノードからこのデータを取得できます。同期と呼ばれるプロセスです。 新しいENが最初に開始されると、ネットワークからチェーンデータ全体をダウンロードする必要があります。

このプロセスを加速するには、ENを開始する前にチェーンデータのスナップショットをダウンロードして高速同期を実行することができます。 これにより、ENが最初の起動時に同期に費やす時間が大幅に短縮されます。

[Cypress スナップショットアーカイブ](http://packages.klaytn.net/cypress/chaindata/) または [Baobab スナップショット アーカイブ](http://packages.klaytn.net/baobab/chaindata/) から最新のチェーンデータ スナップショットをダウンロードします。 `kend`を開始する前に、 `kend.conf` で設定したDATA\_DIR内のスナップショットを抽出します。

例:

```bash
$ tar -C ~/kend_home -xvf klaytn-cypress-chain-latest.tar.gz
```

または

```bash
$ tar -C ~/kend_home -xvf klaytn-baobab-chain-data-latest.tar.gz
```

データが抽出された後、通常はENを開始することができます。

[Chaindata change](../../../../operation-guide/chaindata-change.md) で詳細情報を参照できます。

## <a id="en-start-stop-status"></a>

