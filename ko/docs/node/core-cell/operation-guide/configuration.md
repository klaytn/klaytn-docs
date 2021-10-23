# 환경설정<a id="configuration"></a>

본 문서는 노드 설정시 변경할 수 있는 항목에 대해 설명합니다. Klaytn 노드 패키지는 기본값을 제공하며 별도의 환경설정은 거의 필요하지 않습니다. 실행 중인 노드의 설정을 변경했다면 해당 노드를 재시작해야 변경 사항이 반영됩니다.

## CN 환경설정 파일 위치 <a id="cn-configuration-file-location"></a>

* 컨센서스 노드 환경설정을 위한 `kcnd.conf`

이 환경설정 파일은 `conf` 디렉토리에 있습니다. 해당 디렉토리의 위치는 아카이브 배포 \(`tar.gz`\)인지 또는 패키지 배포 \(RPM\)인지에 따라 기본 설정이 다릅니다.

* 아카이브 배포의 경우 환경설정 디렉토리의 위치가 `$INSTALL_PATH/kcn-linux-amd64/conf/`으로 기본 설정되어 있습니다.
* 패키지 배포의 경우 환경설정 디렉토리의 위치가 `/etc/kcnd/conf/`으로 기본 설정되어 있습니다.

## PN 환경설정 파일 위치 <a id="pn-configuration-file-location"></a>

* 프록시 노드 환경설정을 위한 `kpnd.conf`

이 환경설정 파일은 `conf` 디렉토리에 있습니다. 해당 디렉토리의 위치는 아카이브 배포 \(`tar.gz`\)인지 또는 패키지 배포 \(RPM\)인지에 따라 기본 설정이 다릅니다.

* 아카이브 배포의 경우 환경설정 디렉토리의 위치가 `$INSTALL_PATH/kpn-linux-amd64/conf/`으로 기본 설정되어 있습니다.
* 패키지 배포의 경우 환경설정 디렉토리의 위치가 `/etc/kpnd/conf/`으로 기본 설정되어 있습니다.

## 환경설정 파일 형식  <a id="configuration-file-format"></a>

CN과 PN은 설정 파일 형식과 속성이 동일합니다.

다음은 CN의 설정 파일 샘플로, `cypress`네트워크에 참여하고 블록체인 데이터를 기본 설정 위치에 저장하게 되어 있습니다. 이때 기본으로 설정된 블록체인 데이터 저장 위치는 아카이브 배포의 경우 `~/kcnd_home`, 패키지 배포의 경우 `/var/kcnd/data`입니다.

```text
# Configuration file for the kcnd

# cypress, baobab is only available if you don't specify NETWORK_ID.
NETWORK = "cypress"
# NETWORK_ID를 명시하면 프라이빗 네트워크가 생성됩니다.
NETWORK_ID=
PORT=32323
SERVER_TYPE="fasthttp"
SYNCMODE="full"
VERBOSITY=3
MAXCONNECTIONS=100
# LDBCACHESIZE=10240
REWARDBASE="0x0"

...

DATA_DIR=
LOG_DIR=$DATA_DIR/logs
```

아래와 같이 CN의 txpool 크기를 권장합니다.

```text
TXPOOL_EXEC_SLOTS_ALL=16384
TXPOOL_NONEXEC_SLOTS_ALL=16384
TXPOOL_EXEC_SLOTS_ACCOUNT=16384
TXPOOL_NONEXEC_SLOTS_ACCOUNT=16384
```

아래와 같이 PN의 txpool 크기를 권장합니다.

```text
TXPOOL_EXEC_SLOTS_ALL=8192
TXPOOL_NONEXEC_SLOTS_ALL=8192
TXPOOL_EXEC_SLOTS_ACCOUNT=8192
TXPOOL_NONEXEC_SLOTS_ACCOUNT=8192
```

## 속성 <a id="properties"></a>

다음은 설정 파일에서 설정할 수 있는 속성입니다. CN과 PN 설정 파일은 `REWARDBASE`를 제외하고는 동일한 속성을 갖습니다.

| 명칭                             | 설명                                                                                                                                                                                                                              |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NETWORK                        | 노드가 참여할 네트워크의 이름입니다.  NETWORK_ID가 정의되지 않은 경우에 사용합니다.  ("cypress", "baobab")                                                                                                                                                     |
| NETWORK_ID                     | Klaytn 네트워크 ID입니다.  로컬 프라이빗 네트워크를 만드는 경우, 프라이빗 네트워크의 ID를 정의합니다.  다음은 사전에 구성된 네트워크에 미리 지정된 ID들입니다. <br />8217 : Cypress (메인넷) <br />1000 : Aspen 테스트넷<br />1001 : Baobab 테스트넷 |
| PORT                           | P2P 포트 (Default: "32323")                                                                                                                                                                                                       |
| SERVER_TYPE                    | JSON RPC 서버 유형  ("http", "fasthttp")                                                                                                                                                                                            |
| SYNCMODE                       | 블록체인 동기화 모드  ("fast", "full")                                                                                                                                                                                                   |
| VERBOSITY                      | 로그 상세 레벨.  (0=silent, 1=error, 2=warn, 3=info, 4=debug, 5=detail)                                                                                                                                                               |
| MAXCONNECTIONS                 | 최대로 가능한 물리적 연결 수  단일 채널 피어는 MAXCONNECTIONS 만큼의 피어와 연결할 수 있습니다.  다중 채널 피어는 MAXCONNECTIONS/2 만큼의 피어와 연결할 수 있습니다.  0으로 설정하면 네트워크 연결이 비활성화됩니다. (Default: 10)                                                                        |
| LDBCACHESIZE                   | LevelDB의 메모리 내 캐시 크기 (MiB). (Default : 768)                                                                                                                                                                                     |
| REWARDBASE                     | 블록 합의 보상을 받을 계정 주소. 이 속성은 CN에만 적용됩니다.                                                                                                                                                                                           |
| TXPOOL_EXEC_SLOTS_ALL        | 모든 계정에 대해 실행 가능한 트랜잭션 슬롯의 최대 개수 (Default: 4096)                                                                                                                                                                                 |
| TXPOOL_NONEXEC_SLOTS_ALL     | 모든 계정에 대해 실행 불가능한 트랜잭션 슬롯의 최대 개수 (Default: 1024)                                                                                                                                                                                |
| TXPOOL_EXEC_SLOTS_ACCOUNT    | 계정당 보장된 실행 가능한 트랜잭션 슬롯의 개수 (Default: 16)                                                                                                                                                                                        |
| TXPOOL_NONEXEC_SLOTS_ACCOUNT | 계정당 보장된 실행 가능한 트랜잭션 슬롯의 최대 개수 (Default: 64)                                                                                                                                                                                     |
| TXPOOL_LIFE_TIME             | 실행 불가능한 트랜잭션이 대기하는 최대 시간 (Default : 5m)                                                                                                                                                                                         |
| RPC_ENABLE                     | 1로 설정하면 HTTP-RPC 서버를 활성화합니다.                                                                                                                                                                                                    |
| RPC_API                        | 쉼표로 구분된 API 목록으로 HTTP-RPC 인터페이스를 통해 제공됩니다.  (admin, debug, klay, miner, net, personal, rpc, txpool, web3)                                                                                                                       |
| RPC_PORT                       | HTTP-RPC 서버 수신 포트 (Default: "8551")                                                                                                                                                                                             |
| RPC_ADDR                       | HTTP-RPC 서버 수신 인터페이스 (Default: "localhost")                                                                                                                                                                                     |
| RPC_CORSDOMAIN                 | 쉼표로 구분된, (브라우저에서 시행된) cross-origin 요청을 수락할 도메인 목록입니다.                                                                                                                                                                           |
| RPC_VHOSTS                     | 쉼표로 구분된, (서버에서 시행된) 요청을 수락할 가상 호스트 이름의 목록입니다. '*' 와일드 카드를 허용합니다. (Default: {"localhost"})                                                                                                                                       |
| WS_ENABLE                      | 1로 설정하면 WS-RPC 서버를 활성화합니다.                                                                                                                                                                                                      |
| WS_API                         | WS-RPC 인터페이스를 통해 제공되는 API  (admin, debug, klay, miner, net, personal, rpc, txpool, web3)                                                                                                                                        |
| WS_ADDR                        | WS-RPC 서버 수신 인터페이스                                                                                                                                                                                                              |
| WS_PORT                        | WS-RPC 서버 수신 포트 (Default : "8552")                                                                                                                                                                                              |
| WS_ORIGINS                     | 웹 소켓 요청을 수락할 Origin (Default: "localhost")                                                                                                                                                                                      |
| AUTO_RESTART                   | Restart the process when the current block has not been updated for `autorestart.timeout` (e.g., 60s, 10m and 1h) if it is set to 1.                                                                                            |
| METRICS                        | 1로 설정하면 지표 수집 및 보고를 할 수 있습니다.                                                                                                                                                                                                   |
| PROMETHEUS                     | 1로 설정하면 Prometheus Exporter를 활성화합니다.                                                                                                                                                                                            |
| DB_NO_PARALLEL_WRITE         | 1로 설정하면 퍼시스턴트 데이터베이스에 블록 데이터의 병렬 쓰기가 비활성화됩니다.                                                                                                                                                                                   |
| MULTICHANNEL                   | 1로 설정하면 블록 전파를 위한 전용 채널이 생성됩니다.                                                                                                                                                                                                 |
| SUBPORT                        | MULTICHANNEL 옵션이 활성화되었을 때 보조 수신 포트 번호입니다. (Default : "32324")                                                                                                                                                                   |
| NO_DISCOVER                    | 1로 설정되면 discovery 옵션을 비활성화합니다.                                                                                                                                                                                                  |
| BOOTNODES                      | 쉼표로 구분된, 부트스트랩 노드의 KNI 주소                                                                                                                                                                                                       |
| ADDITIONAL                     | 추가적인 command-line 옵션 (예: --txpool.nolocals)이 있는 경우 사용합니다.                                                                                                                                                                       |
| DATA_DIR                       | Klaytn 블록체인 데이터 폴더 경로                                                                                                                                                                                                           |
| LOG_DIR                        | 로그 폴더 경로                                                                                                                                                                                                                        |
