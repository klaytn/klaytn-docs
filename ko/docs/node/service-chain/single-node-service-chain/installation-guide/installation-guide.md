# 설치 가이드

This chapter explains the **Service Chain Node \(SCN\)** installation. You need an Endpoint Node \(EN\) that connects to the Main Chain as well. For the EN installation, read the [EN Installation Guide](../../../endpoint-node/installation-guide/).

## Linux 아카이브 배포

아카이브 파일은 아래와 같이 바이너리 실행 파일과 환경 설정 파일로 구성되어 있습니다.

```text
- bin
  |- kscn
  |- kscnd
- conf
  |- kscnd.conf
```

| 파일명             | 파일 설명                             |
|:--------------- |:--------------------------------- |
| bin/kscn        | SCN executable file               |
| bin/kscnd       | SCN start/termination script file |
| conf/kscnd.conf | SCN configuration file            |

### 설치

The installation is the uncompression of the downloaded package.

```text
$ tar zxf kscn-vX.X.X-XXXXX-amd64.tar.gz
```

## RPM 배포 \(RHEL/CentOS/Fedora\)<a id="rpm-rhel-centos-fedora"></a>

### 설치

아래와 같이 `yum` 명령을 사용하여 다운로드한 RPM 파일을 설치할 수 있습니다.

```text
$ yum install kscnd-vX.X.X.el7.x86_64.rpm
```

### 설치 위치 <a id="scn-configuration"></a>

The Klaytn Linux package consists of the executable binary and the configuration file structured as follows.

| 파일명        | 위치                         |
|:---------- |:-------------------------- |
| kscn       | /usr/bin/kscn              |
| kscnd.conf | /etc/kscnd/conf/kscnd.conf |


