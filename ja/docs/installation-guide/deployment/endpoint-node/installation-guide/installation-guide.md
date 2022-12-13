# インストールガイド <a id="installation-guide"></a>

`拳` の最新バージョンは [ダウンロード](download.md) ページからダウンロードできます。

## Linux Archive Distribution <a id="linux-archive-distribution"></a>

アーカイブファイルは、実行可能バイナリと構成ファイルで構成されています。

**注**: ファイル構造やファイル名を変更しないでください。 変更すると、ノードが正しく機能しないことがあります。

```text
- bin
  |- ken
  |- kend
- conf
  |- kend.conf
```

| ファイル名          | ファイルの説明              |
|:-------------- |:-------------------- |
| bin/ken        | EN 実行可能ファイル          |
| bin/kend       | EN スタート/終了スクリプト ファイル |
| conf/kend.conf | EN構成ファイル             |

### インストール <a id="installation"></a>

インストールは、パッケージをインストールするダウンロードしたパッケージの圧縮を解除します。

```text
$ tar zxf ken-vX.X.X-linux-amd64.tar.gz
```

または

```text
$ tar zxf ken-baobab-vX.X.X-linux-amd64.tar.gz
```

**注**: `ken-linux-amd64/bin` パスを環境変数に追加することを推奨します。 `$PATH` `ken` と `kend` をグローバルに実行するには、 ` named@@8 format@@5 ` が必要です。 一例として

```text
$ export PATH=$PATH:~/downloaded/path/ken-linux-amd64/bin
```

他のセクションでは、パスが変数に追加されると仮定します。

## RPM配布 \(RHEL/CentOS/Fedora\) <a id="rpm-rhel-centos-fedora"></a>

### ダウンロードしたRPMをインストール <a id="install-downloaded-rpm"></a>

以下の `yum` コマンドでダウンロードしたRPMファイルをインストールできます。

```text
$ yum install kend-vX.X.X.el7.x86_64.rpm
```

または

```text
$ yum install kend-baobab-vX.X.X.el7.x86_64.rpm
```

### Klaytn Yum Repoからインストール <a id="install-from-klaytn-yum-repo"></a>

あるいは、Klaytn Yum リポジトリから `kend` をインストールすることもできます。

```text
$ sudo curl -o /etc/yum.repos.d/klaytn.repo https://packages.klaytn.net/config/rhel/7/prod.repo && sudo yum install kend
```

### インストールされた場所 <a id="installed-location"></a>

インストールされたファイルは以下のとおりです。

| ファイル名     | 場所                       |
|:--------- |:------------------------ |
| ken       | /usr/bin/ken             |
| kend.conf | /etc/kend/conf/kend.conf |



