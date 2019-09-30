# Installation Guide

`ken`의 최신 버전은 [Download](download.md) 페이지에서 다운로드할 수 있습니다.

## Linux Archive Distribution

The archive file consists of the executable binary and the configuration file structured as follows.

**Note**: Do NOT alter the file structure or file name. If you change it, the node may not function correctly.

```text
- bin
  |- ken
  |- kend
- conf
  |- kend.conf
```

| File Name      | File Description   |
|:-------------- |:------------------ |
| bin/ken        | EN 실행 파일           |
| bin/kend       | EN 시작 및 종료 스크립트 파일 |
| conf/kend.conf | EN 환경 설정 파일        |

### Installation

The installation is the uncompression of the downloaded package where you want to install the package.

```text
$ tar zxf ken-vX.X.X-linux-amd64.tar.gz
```

Or,

```text
$ tar zxf ken-baobab-vX.X.X-linux-amd64.tar.gz
```

**Note**: it is recommended that the uncompressed directory `ken-linux-amd64/bin` path should be added to the environment variable `$PATH` to run the `ken` and `kend` globally. As an example,

```text
$ export PATH=$PATH:~/downloaded/path/ken-linux-amd64/bin
```

The other sections assume that the path is added to the variable.

## RPM Distribution \(RHEL/CentOS/Fedora\) <a id="rpm-rhel-centos-fedora"></a>

### Install downloaded RPM

You can install the downloaded RPM file with the following `yum` command.

```text
$ yum install kend-vX.X.X.el7.x86_64.rpm
```

Or,

```text
$ yum install kend-baobab-vX.X.X.el7.x86_64.rpm
```

### Install from Klaytn Yum Repo

아래와 같이 Klaytn Yum 레포지토리에서도 `kend`를 설치할 수 있습니다.

```text
$ sudo curl -o /etc/yum.repos.d/klaytn.repo http://packages.klaytn.net/config/rhel/7/prod.repo && sudo yum install kend
```

### Installed Location

The installed files are located as follows.

| File Name | Location                 |
|:--------- |:------------------------ |
| ken       | /usr/bin/ken             |
| kend.conf | /etc/kend/conf/kend.conf |



