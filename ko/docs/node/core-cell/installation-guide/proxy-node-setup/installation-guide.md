# 설치 가이드 <a id="installation-guide"></a>

`kpn`의 최신 버전은 [Download](../download.md) 페이지에서 다운로드할 수 있습니다.

## Linux 아카이브 배포 <a id="linux-archive-distribution"></a>

아카이브 파일은 아래와 같이 바이너리 실행 파일과 환경설정 파일로 구성되어 있습니다.

**Note**: 파일 구조 또는 파일 이름을 변경하지 마세요. 변경할 경우 노드가 올바르게 작동하지 않을 수 있습니다.

```text
- bin
  |- kpn
  |- kpnd
- conf
  |- kpnd.conf
```

| 파일명            | 파일 설명              |
|:-------------- |:------------------ |
| bin/kpn        | PN 실행 파일           |
| bin/kpnd       | PN 시작 및 종료 스크립트 파일 |
| conf/kpnd.conf | PN 환경설정 파일         |

### 설치 <a id="installation"></a>

패키지를 설치하려는 곳에 다운로드 패키지의 압축을 해제합니다.

```bash
$ tar zxf kpn-vX.X.X-linux-amd64.tar.gz
```

또는

```bash
$ tar zxf kpn-baobab-vX.X.X-linux-amd64.tar.gz
```

**Note**: `kpn-linux-amd64/bin` 디렉토리의 경로를 `$PATH` 환경 변수에 추가하여 `kpn`와 `kpnd`를 전역적으로 실행할 수 있도록 하세요. 예를 들어,

```bash
$ export PATH=$PATH:~/downloaded/path/kpn-linux-amd64/bin
```

앞으로 이 경로가 환경 변수에 추가되어 있다고 가정하고 안내하겠습니다.

## RPM 배포 \(RHEL/CentOS/Fedora\)<a id="rpm-rhel-centos-fedora"></a>

### 다운로드한 RPM을 설치 <a id="install-downloaded-rpm"></a>

아래와 같이 `yum` 명령을 사용하여 다운로드한 RPM 파일을 설치할 수 있습니다.

```bash
$ yum install kpnd-vX.X.X.el7.x86_64.rpm
```

또는

```bash
$ yum install kpnd-baobab-vX.X.X.el7.x86_64.rpm
```

### Klaytn Yum 레포지토리에서 설치 <a id="install-from-klaytn-yum-repo"></a>

아래와 같이 Klaytn Yum 레포지토리에서도 `kpnd`를 설치할 수 있습니다.

```bash
$ sudo curl -o /etc/yum.repos.d/klaytn.repo https://packages.klaytn.net/config/rhel/7/prod.repo && sudo yum install kpnd
```

### 설치 위치 <a id="installed-location"></a>

설치된 파일은 다음의 위치에 있습니다.

| 파일명       | 위치                       |
|:--------- |:------------------------ |
| kpn       | /usr/bin/kpn             |
| kpnd.conf | /etc/kpnd/conf/kpnd.conf |



