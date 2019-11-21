# 설치 가이드 <a id="installation-guide"></a>

This chapter explains the **Service Chain Consensus Node \(SCN\)** installation. If you want to use Anchroing/Value transfer features, you need an Endpoint Node (EN) that connects to the Main Chain. EN 설치에 대해서는 [EN Installation Guide](../../../endpoint-node/installation-guide/)를 읽으세요.

## Linux 아카이브 배포 <a id="linux-archive-distribution"></a>

The archive file for Service Chain Consensus Node has the following directory layout.

| 파일명             | 파일 설명               |
|:--------------- |:------------------- |
| bin/kscn        | SCN 실행 파일           |
| bin/kscnd       | SCN 시작 및 종료 스크립트 파일 |
| conf/kscnd.conf | SCN 환경설정 파일         |

The archive file for homi binary has the following directory layout.

| 파일명      | 파일 설명                |
|:-------- |:-------------------- |
| bin/homi | HOMI executable file |

### 설치 <a id="installation"></a>

다운로드한 패키지를 압축 해제해 설치합니다.

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

Klaytn Linux 패키지는 아래와 같이 바이너리 실행 파일과 환경설정 파일로 구성되어 있습니다.

| 파일명        | 위치                         |
|:---------- |:-------------------------- |
| kscn       | /usr/bin/kscn              |
| kscnd.conf | /etc/kscnd/conf/kscnd.conf |
| homi       | /usr/bin/homi              |


