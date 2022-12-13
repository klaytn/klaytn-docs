# インストールガイド <a id="installation-guide"></a>

`kpn`  の最新バージョンは [ダウンロード](../download.md) ページでダウンロードできます。

## Linux Archive Distribution <a id="linux-archive-distribution"></a>

アーカイブファイルは、実行可能バイナリと構成ファイルで構成されています。

**注**: ファイル構造やファイル名を変更しないでください。 変更すると、ノードが正しく機能しないことがあります。

```text
- bin
  |- kpn
  |- kpnd
- conf
  |- kpnd.conf
```

| ファイル名          | ファイルの説明            |
|:-------------- |:------------------ |
| bin/kpn        | PN 実行可能ファイル        |
| bin/kpnd       | PNスタート/終了スクリプトファイル |
| conf/kpnd.conf | PN設定ファイル           |

### インストール <a id="installation"></a>

インストールは、パッケージをインストールするダウンロードしたパッケージの圧縮を解除します。

```bash
$ tar zxf kpn-vX.X.X-linux-amd64.tar.gz
```

または

```bash
$ tar zxf kpn-baobab-vX.X.X-linux-amd64.tar.gz
```

**注**: `kpn-linux-amd64/bin` パスを環境変数 `$PATH` に `kpn` と `kpnd` をグローバルに実行することを推奨します。 一例として

```bash
$ export PATH=$PATH:~/downloaded/path/kpn-linux-amd64/bin
```

他のセクションでは、パスが変数に追加されると仮定します。

## RPM配布 \(RHEL/CentOS/Fedora\) <a id="rpm-rhel-centos-fedora"></a>

### ダウンロードしたRPMをインストール <a id="install-downloaded-rpm"></a>

以下の `yum` コマンドでダウンロードしたRPMファイルをインストールできます。

```bash
$ yum install kpnd-vX.X.X.el7.x86_64.rpm
```

または

```bash
$ yum install kpnd-baobab-vX.X.X.el7.x86_64.rpm
```

### Klaytn Yum Repoからインストール <a id="install-from-klaytn-yum-repo"></a>

あるいは、Klaytn Yum リポジトリから `kpnd` をインストールすることもできます。

```bash
$ sudo curl -o /etc/yum.repos.d/klaytn.repo https://packages.klaytn.net/config/rhel/7/prod.repo && sudo yum install kpnd
```

### インストールされた場所 <a id="installed-location"></a>

インストールされたファイルは以下のとおりです。

| ファイル名     | 場所                       |
|:--------- |:------------------------ |
| kpn       | /usr/bin/kpn             |
| kpnd.conf | /etc/kpnd/conf/kpnd.conf |



