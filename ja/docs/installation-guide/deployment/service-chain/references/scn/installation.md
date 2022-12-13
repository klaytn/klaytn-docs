# インストールガイド <a id="installation-guide"></a>

この章では、 **Service Chain Consensus Node (SCN\)** のインストールについて説明します。

## Linux Archive Distribution <a id="linux-archive-distribution"></a>

Service Chain Consensus Node のアーカイブファイルには、次のディレクトリレイアウトがあります。

| ファイル名           | ファイルの説明              |
|:--------------- |:-------------------- |
| bin/kscn        | SCN 実行可能ファイル         |
| bin/kscnd       | SCN の開始/終了スクリプト ファイル |
| conf/kscnd.conf | SCN 設定ファイル           |

homiバイナリのアーカイブファイルには、次のディレクトリレイアウトがあります。

| ファイル名    | ファイルの説明      |
|:-------- |:------------ |
| bin/homi | HOMI実行可能ファイル |

### インストール <a id="installation"></a>

The installation is the uncompression of the downloaded package.

```text
$ tar zxf kscn-vX.X.X-XXXXXXX-amd64.tar.gz
$ tar zxf homi-vX.X.XXXXX-amd64.tar.gz
```

## RPM配布 \(RHEL/CentOS/Fedora\) <a id="rpm-rhel-centos-fedora"></a>

### インストール <a id="installation"></a>

以下の `yum` コマンドでダウンロードしたRPMファイルをインストールできます。

```text
$ yum install kscnd-vX.X.X.el7.x86_64.rpm
$ yum install homi-vX.X.X.el7.x86_64.rpm
```

### インストールされた場所 <a id="scn-configuration"></a>

Klaytn Linuxパッケージは、実行可能なバイナリと、以下のように構成される構成ファイルで構成されています。

| ファイル名      | 場所                         |
|:---------- |:-------------------------- |
| kscn       | /usr/bin/kscn              |
| kscnd.conf | /etc/kscnd/conf/kscnd.conf |
| homi       | /usr/bin/homi              |


