# インストールガイド <a id="installation-guide"></a>

`kcn`  の最新バージョンは [ダウンロード](../download.md) ページでダウンロードできます。

## Linux Archive Distribution <a id="linux-archive-distribution"></a>

アーカイブファイルは、実行可能バイナリと構成ファイルで構成されています。

**注**: ファイル構造やファイル名を変更しないでください。 変更すると、ノードが正しく機能しないことがあります。

```text
- bin
  |- kcn
  |- kcnd
- conf
  |- kcnd.conf
```

| ファイル名          | ファイルの説明          |
|:-------------- |:---------------- |
| bin/kcn        | CN 実行可能ファイル      |
| bin/kcnd       | CN開始/終了スクリプトファイル |
| conf/kcnd.conf | CN設定ファイル         |

### インストール <a id="installation"></a>

インストールは、パッケージをインストールするダウンロードしたパッケージの圧縮を解除します。

```bash
$ tar zxf kcn-vX.X.X-linux-amd64.tar.gz
```

または

```bash
$ tar zxf kcn-baobab-vX.X.X-linux-amd64.tar.gz
```

**注**: `kcn-linux-amd64/bin` パスを環境変数 `$PATH` に追加して、 `kcn` と `kcnd` をグローバルに実行することを推奨します。 一例として

```bash
$ export PATH=$PATH:~/downloaded/path/kcn-linux-amd64/bin
```

他のセクションでは、パスが変数に追加されると仮定します。

## RPM配布 \(RHEL/CentOS/Fedora\) <a id="rpm-rhel-centos-fedora"></a>

### ダウンロードしたRPMをインストール <a id="install-downloaded-rpm"></a>

以下の `yum` コマンドでダウンロードしたRPMファイルをインストールできます。

```bash
$ yum install kcnd-vX.X.X.el7.x86_64.rpm
```

または

```bash
$ yum install kcnd-baobab-vX.X.X.el7.x86_64.rpm
```

### Klaytn Yum Repoからインストール <a id="install-from-klaytn-yum-repo"></a>

あるいは、Klaytn Yum リポジトリから `kcnd` をインストールすることもできます。

```bash
$ sudo curl -o /etc/yum.repos.d/klaytn.repo https://packages.klaytn.net/config/rhel/7/prod.repo && sudo yum install kcnd
```

### インストールされた場所 <a id="installed-location"></a>

インストールされたファイルは以下のとおりです。

| ファイル名     | 場所                       |
|:--------- |:------------------------ |
| kcn       | /usr/bin/kcn             |
| kcnd.conf | /etc/kCND/conf/kcnd.conf |



