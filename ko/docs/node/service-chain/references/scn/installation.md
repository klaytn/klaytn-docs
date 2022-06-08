# 설치 가이드 <a id="installation-guide"></a>

이 장에서는 **서비스체인 컨센서스 노드 \(SCN\)** 설치에 대해 설명합니다.

## Linux 아카이브 배포 <a id="linux-archive-distribution"></a>

서비스체인 컨센서스 노드의 아카이브 파일은 다음과 같은 디렉토리 레이아웃을 가집니다.

| 파일명             | 파일 설명               |
|:--------------- |:------------------- |
| bin/kscn        | SCN 실행 파일           |
| bin/kscnd       | SCN 시작 및 종료 스크립트 파일 |
| conf/kscnd.conf | SCN 환경설정 파일         |

homi 바이너리의 아카이브 파일은 다음과 같은 디렉토리 레이아웃을 가집니다.

| 파일명      | 파일 설명      |
|:-------- |:---------- |
| bin/homi | HOMI 실행 파일 |

### 설치 <a id="installation"></a>

다운로드한 kscn 패키지를 압축 해제하고,

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


