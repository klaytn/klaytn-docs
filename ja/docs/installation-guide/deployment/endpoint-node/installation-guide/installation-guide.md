# Installation Guide <a id="installation-guide"></a>

`拳` の最新バージョンは [ダウンロード](download.md) ページからダウンロードできます。

## Linux Archive Distribution <a id="linux-archive-distribution"></a>

The archive file consists of the executable binary and the configuration file structured as follows.

**Note**: Do NOT alter the file structure or file name. If you change it, the node may not function correctly.

```text
- bin
  |- ken
  |- kend
- conf
  |- kend.conf
```

| File Name      | File Description     |
|:-------------- |:-------------------- |
| bin/ken        | EN 実行可能ファイル          |
| bin/kend       | EN スタート/終了スクリプト ファイル |
| conf/kend.conf | EN構成ファイル             |

### Installation <a id="installation"></a>

The installation is the uncompression of the downloaded package where you want to install the package.

```text
$ tar zxf ken-vX.X.X-linux-amd64.tar.gz
```

Or,

```text
$ tar zxf ken-baobab-vX.X.X-linux-amd64.tar.gz
```

**注**: `ken-linux-amd64/bin` パスを環境変数に追加することを推奨します。 `$PATH` `ken` と `kend` をグローバルに実行するには、 ` named@@8 format@@5 ` が必要です。 As an example,

```text
$ export PATH=$PATH:~/downloaded/path/ken-linux-amd64/bin
```

The other sections assume that the path is added to the variable.

## RPM Distribution \(RHEL/CentOS/Fedora\) <a id="rpm-rhel-centos-fedora"></a>

### Install downloaded RPM <a id="install-downloaded-rpm"></a>

You can install the downloaded RPM file with the following `yum` command.

```text
$ yum install kend-vX.X.X.el7.x86_64.rpm
```

Or,

```text
$ yum install kend-baobab-vX.X.X.el7.x86_64.rpm
```

### Install from Klaytn Yum Repo <a id="install-from-klaytn-yum-repo"></a>

あるいは、Klaytn Yum リポジトリから `kend` をインストールすることもできます。

```text
$ sudo curl -o /etc/yum.repos.d/klaytn.repo https://packages.klaytn.net/config/rhel/7/prod.repo && sudo yum install kend
```

### Installed Location <a id="installed-location"></a>

The installed files are located as follows.

| File Name | Location                 |
|:--------- |:------------------------ |
| ken       | /usr/bin/ken             |
| kend.conf | /etc/kend/conf/kend.conf |



