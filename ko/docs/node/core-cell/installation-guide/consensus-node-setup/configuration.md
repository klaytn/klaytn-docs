# 환경설정<a id="configuration"></a>

CN 환경설정은 데이터 디렉토리를 생성하고 환경설정 파일 `kcnd.conf`의 여러 변수를 설정합니다.

1. CN 데이터 디렉토리 생성
2. 노드 키 설치
3. `kcnd.conf`으로 CN 환경을 설정합니다.

## CN 데이터 디렉토리 생성 <a id="cn-data-directory-creation"></a>

Klaytn 블록체인 데이터의 크기는 계속 증가하므로, 충분히 큰 스토리지를 사용하는 것을 추천합니다. 원하는 경로에 디렉토리를 생성할 수 있습니다.

```bash
$ mkdir -p /var/kcnd/data
```

## 노드 키 설치 <a id="install-node-key"></a>

CN을 작동시키기 위해 `nodekey`가 필요합니다. 만일 nodekey가 없다면 KCN 바이너리가 새로 생성해 줄 것입니다. 만일 이미 가지고 있다면 `nodekey`를 CN 데이터 디렉토리에 넣으세요. `nodekey`를 생성하는 방법은 '[Before You Install](../before-you-install.md)' 장에 설명되어 있습니다. 다음 커맨드라인은 `nodekey`를 CN 데이터 디렉토리에 복사합니다.

```bash
$ cp nodekey /var/kcnd/data
```

## 환경설정 파일 업데이트 <a id="update-the-configuration-file"></a>

환경설정 파일 위치는 다음과 같습니다.

* 아카이브 배포의 경우 환경설정 디렉토리의 위치가 `$INSTALL_PATH/kcn-linux-amd64/conf/`으로 기본 설정되어 있습니다.
* 패키지 배포의 경우 환경설정 디렉토리의 위치가 `/etc/kcnd/conf/`으로 기본 설정되어 있습니다.

### 데이터 디렉토리 추가  <a id="add-data-directory"></a>

환경설정 파일 `kcnd.conf`의 데이터 디렉토리 환경 변수 `$DATA_DIR`를 업데이트해야 합니다.

```text
...
DATA_DIR=/var/kcnd/data
...
```

### Rewardbase 설정 <a id="setup-rewardbase"></a>

Klaytn 네트워크 컨센서스에 참여한 것에 대한 보상으로, CN 운영자는 KLAY를 받습니다. 이러한 이유로 환경설정 파일 `kcnd.conf`에 주소를 설정해야 합니다.

새 계정을 만드는 방법은 다양하지만, `kcn`도 본 기능을 제공합니다. 다음 명령으로 도움말을 확인할 수 있습니다.

```bash
$ kcn account new --help
```

이 절차를 수행하는 예시 중 하나는 다음과 같습니다. 우선, KLAY 보상을 받을 새 계정을 만들어야 합니다.

```bash
$ kcn account new --datadir ~/kcnd_home
INFO[03/15,09:04:43 +09] [17] Setting connection type                   nodetype=cn conntype=-0
INFO[03/15,09:04:43 +09] [17] Maximum peer count                        KLAY=25 LES=0 total=25
INFO[03/15,09:04:43 +09] [17] SBN is disabled.
Your new account is locked with a password. Please give a password. Do not forget this password.
Passphrase:
Repeat passphrase:
Address: {d13f7da0032b1204f77029dc1ecbf4dae2f04241}
```

결과적으로 사용자가 정의한 경로에 연관된 키스토어가 생성됩니다. 다음으로, 생성된 주소를 다음과 같이 `kcnd.conf` 파일에 입력해야 합니다.

```text
...
REWARDBASE="d13f7da0032b1204f77029dc1ecbf4dae2f04241"
...
```

생성한 키스토어와 비밀번호는 매우 중요하므로 관리에 주의해야 합니다. `kcnd.conf`에 대한 자세한 내용은 [Configuration File](../../operation-guide/configuration.md) 장을 참조하세요.

## 패스트 싱크 \(선택 사항\) <a id="fast-sync-optional"></a>

각 CN은 네트워크의 체인 데이터 사본을 갖고 있습니다. 어떤 노드가 동기화되어 있지 않으면 네트워크의 다른 노드로부터 데이터를 받아옵니다 -- 동기화(syncing)라고 알려진 과정입니다. 새로운 CN이 처음 시작되면 네트워크로부터 전체 체인 데이터를 다운로드받아와야 합니다.

이 과정을 더 빠르게 하기 위해 CN을 시작하기 전에 체인 데이터의 스냅샷을 다운로드하여 패스트 싱크를 실행할 수 있습니다. 패스트 싱크는 CN이 처음 시작할 때 동기화하는 데에 드는 시간을 크게 줄일 수 있습니다.

[Cypress 스냅샷 아카이브](http://packages.klaytn.net/cypress/chaindata/) 또는 [Baobab 스냅샷 아카이브](http://packages.klaytn.net/baobab/chaindata/)에서 체인 데이터의 최신 스냅샷을 다운로드할 수 있습니다. `kcnd`을 시작하기 전에 `kcnd.conf`에서 설정한 DATA\_DIR 내의 스냅샷을 추출하세요.

예를 들어,

```bash
$ tar -C ~/kcnd_home -xvf klaytn-cypress-chaindata-latest.tar.gz
```

또는

```bash
$ tar -C ~/kcnd_home -xvf klaytn-baobab-chaindata-latest.tar.gz
```

데이터 추출 후 CN을 정상적으로 시작할 수 있습니다.

