# Configuration <a id="configuration"></a>

EN構成は、データディレクトリを作成し、設定ファイル `kend.conf`に環境変数を設定することです。

1. ENデータディレクトリを作成します。
2. `kend.conf` で EN を設定します。

## EN データ ディレクトリ 作成 <a id="en-data-directory-creation"></a>

Klaytnブロックチェーンデータのサイズが増え続けていることを考えると、十分な大きさのストレージを使用することをお勧めします。 必要なパスにディレクトリを作成する必要があります。

```text
$ sudo mkdir -p /var/kend/data
```

## Update the Configuration File <a id="update-the-configuration-file"></a>

Configuration File Location:

* アーカイブ配布の場合、config ディレクトリの場所のデフォルトは `$INSTALL_PATH/ken-linux-amd64/conf/` です。
* パッケージ配布の場合、config ディレクトリのデフォルトは `/etc/kend/conf/` です。

### Add Data Directory  <a id="add-data-directory"></a>

You should update the the data directory environment variable `$DATA_DIR` on the configuration file `kend.conf`.

```text
DATA_DIR=/var/kend/data
```

## Fast Sync \(Optional\) <a id="fast-sync-optional"></a>

各ENは、ネットワークのチェーンデータのコピーを保持します。 If a node is out of sync, it can obtain this data from other nodes in the network -- a process known as syncing. 新しいENが最初に開始されると、ネットワークからチェーンデータ全体をダウンロードする必要があります。

このプロセスを加速するには、ENを開始する前にチェーンデータのスナップショットをダウンロードして高速同期を実行することができます。 これにより、ENが最初の起動時に同期に費やす時間が大幅に短縮されます。

Download the latest chaindata snapshot from the [Cypress snapshot archive](http://packages.klaytn.net/cypress/chaindata/) or [Baobab snapshot archive](http://packages.klaytn.net/baobab/chaindata/). `kend`を開始する前に、 `kend.conf` で設定したDATA\_DIR内のスナップショットを抽出します。

For example:

```bash
$ tar -C ~/kend_home -xvf klaytn-cypress-chain-latest.tar.gz
```

Or,

```bash
$ tar -C ~/kend_home -xvf klaytn-baobab-chain-data-latest.tar.gz
```

データが抽出された後、通常はENを開始することができます。

[Chaindata change](../../../../operation-guide/chaindata-change.md) で詳細情報を参照できます。

## <a id="en-start-stop-status"></a>

