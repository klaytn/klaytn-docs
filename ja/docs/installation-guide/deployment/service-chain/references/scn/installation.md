# Installation Guide <a id="installation-guide"></a>

この章では、 **Service Chain Consensus Node (SCN\)** のインストールについて説明します。

## Linux Archive Distribution <a id="linux-archive-distribution"></a>

Service Chain Consensus Node のアーカイブファイルには、次のディレクトリレイアウトがあります。

| File Name       | File Description     |
|:--------------- |:-------------------- |
| bin/kscn        | SCN 実行可能ファイル         |
| bin/kscnd       | SCN の開始/終了スクリプト ファイル |
| conf/kscnd.conf | SCN 設定ファイル           |

homiバイナリのアーカイブファイルには、次のディレクトリレイアウトがあります。

| File Name | File Description |
|:--------- |:---------------- |
| bin/homi  | HOMI実行可能ファイル     |

### Installation <a id="installation"></a>

The installation is the uncompression of the downloaded package.

```text
$ tar zxf kscn-vX.X.X-XXXXXXX-amd64.tar.gz
$ tar zxf homi-vX.X.XXXXX-amd64.tar.gz
```

## RPM Distribution \(RHEL/CentOS/Fedora\) <a id="rpm-rhel-centos-fedora"></a>

### Installation <a id="installation"></a>

You can install the downloaded RPM file with the following `yum` command.

```text
$ yum install kscnd-vX.X.X.el7.x86_64.rpm
$ yum install homi-vX.X.X.el7.x86_64.rpm
```

### Installed Location <a id="scn-configuration"></a>

Klaytn Linuxパッケージは、実行可能なバイナリと、以下のように構成される構成ファイルで構成されています。

| File Name  | Location                   |
|:---------- |:-------------------------- |
| kscn       | /usr/bin/kscn              |
| kscnd.conf | /etc/kscnd/conf/kscnd.conf |
| homi       | /usr/bin/homi              |


