# 설치 가이드 <a id="installation-guide"></a>

This chapter explains the **Service Chain Consensus Node \(SCN\)** installation.

## Linux 아카이브 배포 <a id="linux-archive-distribution"></a>

The archive file for Service Chain Consensus Node has the following directory layout.

| 파일명             | 파일 설명                             |
|:--------------- |:--------------------------------- |
| bin/kscn        | SCN executable file               |
| bin/kscnd       | SCN start/termination script file |
| conf/kscnd.conf | SCN configuration file            |

The archive file for homi binary has the following directory layout.

| 파일명      | 파일 설명                |
|:-------- |:-------------------- |
| bin/homi | HOMI executable file |

### 설치 <a id="installation"></a>

The installation is the uncompression of the downloaded package.

```text
$ tar zxf kscn-vX.X.X-XXXXX-amd64.tar.gz
$ tar zxf homi-vX.X.X-XXXXX-amd64.tar.gz
```

## RPM 배포 \(RHEL/CentOS/Fedora\)<a id="rpm-rhel-centos-fedora"></a>

### 설치 <a id="installation"></a>

아래와 같이 `yum` 명령을 사용하여 다운로드한 RPM 파일을 설치할 수 있습니다.

```text
$ yum install kscnd-vX.X.X.el7.x86_64.rpm
$ yum install homi-vX.X.X.el7.x86_64.rpm
```

### 설치 위치 <a id="scn-configuration"></a>

The Klaytn Linux package consists of the executable binary and the configuration file structured as follows.

| 파일명        | 위치                         |
|:---------- |:-------------------------- |
| kscn       | /usr/bin/kscn              |
| kscnd.conf | /etc/kscnd/conf/kscnd.conf |
| homi       | /usr/bin/homi              |


