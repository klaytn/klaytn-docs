# Installation Guide <a id="installation-guide"></a>

`kpn`의 최신 버전은 [Download](../download.md) 페이지에서 다운로드할 수 있습니다.

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
| bin/kpn        | PN 실행 파일           |
| bin/kpnd       | PN 시작 및 종료 스크립트 파일 |
| conf/kpnd.conf | PN 환경설정 파일         |

### Installation <a id="installation"></a>

The installation is the uncompression of the downloaded package where you want to install the package.

```bash
$ tar zxf kpn-vX.X.X-linux-amd64.tar.gz
```

Or,

```bash
$ tar zxf kpn-baobab-vX.X.X-linux-amd64.tar.gz
```

**Note**: `kpn-linux-amd64/bin` 디렉토리의 경로를 `$PATH` 환경 변수에 추가하여 `kpn`와 `kpnd`를 전역적으로 실행할 수 있도록 하세요. As an example,

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

아래와 같이 Klaytn Yum 레포지토리에서도 `kpnd`를 설치할 수 있습니다.

```bash
$ sudo curl -o /etc/yum.repos.d/klaytn.repo https://packages.klaytn.net/config/rhel/7/prod.repo && sudo yum install kpnd
```

### Installed Location <a id="installed-location"></a>

The installed files are located as follows.

| File Name | Location                 |
|:--------- |:------------------------ |
| kpn       | /usr/bin/kpn             |
| kpnd.conf | /etc/kpnd/conf/kpnd.conf |



