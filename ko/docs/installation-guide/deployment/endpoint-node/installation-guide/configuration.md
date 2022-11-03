# 환경설정<a id="configuration"></a>

EN 환경설정은 데이터 디렉토리를 생성하고 환경설정 파일 `kend.conf`의 환경 변수를 설정합니다.

1. EN 데이터 디렉토리를 생성합니다.
2. `kend.conf`으로 EN 환경을 설정합니다.

## EN 데이터 디렉토리 생성<a id="en-data-directory-creation"></a>

Klaytn 블록체인 데이터의 크기가 계속 증가한다는 사실을 고려하면 충분히 큰 스토리지를 사용하는 것이 좋습니다. 원하는 경로에 디렉토리를 생성합니다.

```text
$ sudo mkdir -p /var/kend/data
```

## 환경설정 파일 업데이트 <a id="update-the-configuration-file"></a>

환경설정 파일 위치는 다음과 같습니다.

* 아카이브 배포의 경우 환경설정 디렉토리의 위치가 `$INSTALL_PATH/ken-linux-amd64/conf/`으로 기본 설정되어 있습니다.
* 패키지 배포의 경우 환경설정 디렉토리의 위치가 `/etc/kend/conf/`으로 기본 설정되어 있습니다.

### 데이터 디렉토리 추가  <a id="add-data-directory"></a>

환경설정 파일 `kend.conf`의 데이터 디렉토리 환경 변수 `$DATA_DIR`를 업데이트해야 합니다.

```text
DATA_DIR=/var/kend/data
```

## 패스트 싱크 \(선택 사항\) <a id="fast-sync-optional"></a>

각 EN은 네트워크의 체인 데이터 사본을 갖고 있습니다. 어떤 노드가 동기화되어 있지 않으면 네트워크의 다른 노드로부터 데이터를 받아옵니다 -- 동기화(syncing)라고 알려진 과정입니다. 새로운 EN이 처음 시작되면 네트워크로부터 전체 체인 데이터를 다운로드받아와야 합니다.

이 과정을 더 빠르게 하기 위해 EN을 시작하기 전에 체인 데이터의 스냅샷을 다운로드하여 패스트 싱크를 실행할 수 있습니다. 패스트 싱크는 EN이 처음 시작할 때 동기화하는 데에 드는 시간을 크게 줄일 수 있습니다.

[Cypress 스냅샷 아카이브](http://packages.klaytn.net/cypress/chaindata/) 또는 [Baobab 스냅샷 아카이브](http://packages.klaytn.net/baobab/chaindata/)에서 체인 데이터의 최신 스냅샷을 다운로드할 수 있습니다. `kend`을 시작하기 전에 `kend.conf`에서 설정한 DATA\_DIR 내의 스냅샷을 추출하세요.

예를 들어,

```bash
$ tar -C ~/kend_home -xvf klaytn-cypress-chaindata-latest.tar.gz
```

또는

```bash
$ tar -C ~/kend_home -xvf klaytn-baobab-chaindata-latest.tar.gz
```

데이터 추출 후 EN을 정상적으로 시작할 수 있습니다.

## <a id="en-start-stop-status"></a>

