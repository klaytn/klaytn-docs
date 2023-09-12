# Installation Guide <a id="installation-guide"></a>

`kpn`  の最新バージョンは [ダウンロード](../download.md) ページでダウンロードできます。

## Linux Archive Distribution <a id="linux-archive-distribution"></a>

The archive file consists of the executable binary and the configuration file structured as follows.

**Note**: Do NOT alter the file structure or file name. If you change it, the node may not function correctly.

```text
- bin
  |- kpn
  |- kpnd
- conf
  |- kpnd.conf
```

| File Name      | File Description   |
|:-------------- |:------------------ |
| bin/kpn        | PN 実行可能ファイル        |
| bin/kpnd       | PNスタート/終了スクリプトファイル |
| conf/kpnd.conf | PN設定ファイル           |

### Installation <a id="installation"></a>

The installation is the uncompression of the downloaded package where you want to install the package.

```bash
$ tar zxf kpn-vX.X.X-linux-amd64.tar.gz
```

Or,

```bash
$ tar zxf kpn-baobab-vX.X.X-linux-amd64.tar.gz
```

**注**: `kpn-linux-amd64/bin` パスを環境変数 `$PATH` に `kpn` と `kpnd` をグローバルに実行することを推奨します。 As an example,

```bash
$ export PATH=$PATH:~/downloaded/path/kpn-linux-amd64/bin
```

The other sections assume that the path is added to the variable.

## RPM Distribution \(RHEL/CentOS/Fedora\) <a id="rpm-rhel-centos-fedora"></a>

### Install downloaded RPM <a id="install-downloaded-rpm"></a>

You can install the downloaded RPM file with the following `yum` command.

```bash
$ yum install kpnd-vX.X.X.el7.x86_64.rpm
```

Or,

```bash
$ yum install kpnd-baobab-vX.X.X.el7.x86_64.rpm
```

### Install from Klaytn Yum Repo <a id="install-from-klaytn-yum-repo"></a>

あるいは、Klaytn Yum リポジトリから `kpnd` をインストールすることもできます。

```bash
$ sudo curl -o /etc/yum.repos.d/klaytn.repo https://packages.klaytn.net/config/rhel/7/prod.repo && sudo yum install kpnd
```

### Installed Location <a id="installed-location"></a>

The installed files are located as follows.

| File Name | Location                 |
|:--------- |:------------------------ |
| kpn       | /usr/bin/kpn             |
| kpnd.conf | /etc/kpnd/conf/kpnd.conf |


