# 設定 <a id="configuration"></a>

PN構成は、データディレクトリを作成し、設定ファイル `kpnd.conf`に複数の値を設定することです。

1. PNデータディレクトリを作成
2. ノードキーをインストール
3. `static-node.json をインストール`
4. `kpnd.conf` で PN を設定します。

## PNデータディレクトリの作成 <a id="pn-data-directory-creation"></a>

Klaytnブロックチェーンデータのサイズが常に増加していることを考慮すると、十分な大きさのストレージを使用することをお勧めします。 必要なパスにディレクトリを作成する必要があります。

```bash
$ mkdir -p /var/kpnd/data
```

## ノードキーのインストール <a id="install-node-key"></a>

プッシュ通知を操作するには、 `nodekey` が必要です。 KPNバイナリは、あなたが持っていない場合、あなたのために新しいものを作成します。 もしもあれば、 `nodekey` を PN データディレクトリに入れる必要があります。 `nodekey` を作成する方法は、「[インストールする前に](../before-you-install.md)」セクションにあります。 次のコマンドラインは `nodekey` を PN データディレクトリにコピーします。

```bash
$ cp nodekey /var/kpnd/data
```

## `static-nodes.json をインストール` <a id="install-static-nodes-json"></a>

`static-nodes.json` は PN 演算子から作成する必要があります。 PNが接続されているアドレスが含まれています。 CNを含むアドレスと、別のコアセルからPNを追加することをお勧めします。 詳細は Klaytn 公式メールにご連絡ください。\(`bootstrap@klaytn.com` はサイプレス、 `Baobab@klaytn.com` はバオバブ\)。

**static-nodes.json**

```text
[
  "kni://4f2f47f3bf35a2c576d3345e6e9c49b147d510c05832d2458709f63c3c90c76ead205975d944ed65e77dd4c6f63ebe1ef21d60da95952bc1e200e7487f4d9e1b@10.11.2.101:32323?discport=0&ntype=cn",
  "kni://8dee912aeda2ccfaa4fe421f015d4d75c2e3fd4aab75fa399b42767caad33531e57f3356b4a4af374593e33ec4320e1325aa2390a7be2489fa6b5724894680eb@10.11.2.102:32323?discport=0&ntype=pn"
]
```

PNのノードURIは「[インストール前](../before-you-install.md)」セクションにあります。 \(注: この IP アドレスは CN パブリック IP とは異なります。\' 以下のコマンドラインは `static-nodes.json` ファイルを PN データ ディレクトリにコピーします。

```bash
$ cp static-nodes.json /var/kpnd/data
```

## 設定ファイルを更新する <a id="update-the-configuration-file"></a>

設定ファイルの場所:

* アーカイブ配布の場合、config ディレクトリの場所のデフォルトは `$INSTALL_PATH/kpn-linux-amd64/conf/` です。
* パッケージ配布の場合、config ディレクトリのデフォルトは `/etc/kpnd/conf/` です。

### データディレクトリを追加  <a id="add-data-directory"></a>

You should update the the data directory environment variable `$DATA_DIR` on the configuration file `kpnd.conf`.

```text
...
DATA_DIR=/var/kpnd/data
...
```

## 高速同期 \(オプション\) <a id="fast-sync-optional"></a>

各PNは、ネットワークのチェーンデータのコピーを保持します。 ノードが同期されていない場合、ネットワーク内の他のノードからこのデータを取得できます。同期と呼ばれるプロセスです。 新しいPNが最初に開始されると、ネットワークからチェーンデータ全体をダウンロードする必要があります。

このプロセスを加速するには、PNを開始する前にチェーンデータのスナップショットをダウンロードして高速同期を実行することができます。 これにより、PNが最初の起動時に同期に費やす時間が大幅に短縮されます。

[Cypress スナップショットアーカイブ](http://packages.klaytn.net/cypress/chaindata/) または [Baobab スナップショット アーカイブ](http://packages.klaytn.net/baobab/chaindata/) から最新のチェーンデータ スナップショットをダウンロードします。 `kpnd`を開始する前に、 `kpnd.conf` で設定したDATA\_DIR内のスナップショットを抽出します。

例:

```text
$ tar -C /var/kpnd/data -xvf klaytn-cypress-chaindata-latest.tar.gz
```

または

```text
$ tar -C /var/kpnd/data -xvf klaytn-baobab-chaindata-latest.tar.gz
```

データが抽出された後、PNを正常に開始することができます。

[Chaindata change](../../../../../operation-guide/chaindata-change) で詳細情報を参照できます。
