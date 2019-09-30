# 설치 가이드

You can download the latest version of the `kcn`  on [Download](../download.md) page.

## Linux 아카이브 배포

아카이브 파일은 아래와 같이 바이너리 실행 파일과 환경 설정 파일로 구성되어 있습니다.

**Note**: 파일 구조 또는 파일 이름을 변경하지 마세요. 변경할 경우 노드가 올바르게 작동하지 않을 수 있습니다.

```text
- bin
  |- kcn
  |- kcnd
- conf
  |- kcnd.conf
```

| 파일명            | 파일 설명                            |
|:-------------- |:-------------------------------- |
| bin/kcn        | CN executable file               |
| bin/kcnd       | CN start/termination script file |
| conf/kcnd.conf | CN configuration file            |

### 설치

패키지를 설치하려는 곳에 다운로드 패키지의 압축을 해제합니다.

```bash
$ tar zxf kcn-vX.X.X-linux-amd64.tar.gz
```

또는

```bash
$ tar zxf kcn-baobab-vX.X.X-linux-amd64.tar.gz
```

**Note**: it is recommended that the uncompressed directory `kcn-linux-amd64/bin` path should be added to the environment variable `$PATH` to run the `kcn` and `kcnd` globally. 예를 들어,

```bash
$ export PATH=$PATH:~/downloaded/path/kcn-linux-amd64/bin
```

앞으로 이 경로가 환경 변수에 추가되어 있다고 가정하고 안내하겠습니다.

## RPM 배포 \(RHEL/CentOS/Fedora\)<a id="rpm-rhel-centos-fedora"></a>

### 다운로드한 RPM을 설치

아래와 같이 `yum` 명령을 사용하여 다운로드한 RPM 파일을 설치할 수 있습니다.

```bash
$ yum install kcnd-vX.X.X.el7.x86_64.rpm
```

또는

```bash
$ yum install kcnd-baobab-vX.X.X.el7.x86_64.rpm
```

### Klaytn Yum 레포지토리에서 설치

Alternatively, you can install `kcnd` from the Klaytn Yum repo, run:

```bash
$ sudo curl -o /etc/yum.repos.d/klaytn.repo http://packages.klaytn.net/config/rhel/7/prod.repo && sudo yum install kcnd
```

### 설치 위치

설치된 파일은 다음의 위치에 있습니다.

| 파일명       | 위치                       |
|:--------- |:------------------------ |
| kcn       | /usr/bin/kcn             |
| kcnd.conf | /etc/kcnd/conf/kcnd.conf |



