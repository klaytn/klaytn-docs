# Configuration Files

This document explains the configurable properties of the node. Klaytn node package ships with good defaults and requires very little configuration. If you changed any settings of a running node, you must restart the node to reflect the changes.

## SCN Configuration File location <a id="scn-configuration-file-location"></a>

* `kscnd.conf` for configuring the Service Chain Consensus Node

이 환경설정 파일은 `conf` 디렉토리에 있습니다. 해당 디렉토리의 위치는 아카이브 배포 \(`tar.gz`\)인지 또는 패키지 배포 \(RPM\)인지에 따라 기본 설정이 다릅니다.

* For the archive distribution, the config directory location defaults to `$INSTALL_PATH/kscn-linux-amd64/conf/`.
* For the package distribution, the config directory defaults to `/etc/kscnd/conf/`.

## 환경설정 파일 형식  <a id="configuration-file-format"></a>

Below is a sample configuration file for the SCN that stores the blockchain data in the default location, which is `~/kscnd_home` with the archive distribution, `/var/kscnd/data` with the package distribution.

```text
# Configuration file for the kcnd

NETWORK=
# if you specify NETWORK_ID, a private network is created.
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

The recommended txpool sizes for SCN are as follows.

```text
TXPOOL_EXEC_SLOTS_ALL=16384
TXPOOL_NONEXEC_SLOTS_ALL=16384
TXPOOL_EXEC_SLOTS_ACCOUNT=16384
TXPOOL_NONEXEC_SLOTS_ACCOUNT=16384
```

## 속성<a id="properties"></a>

The configuration file has the following configurable properties. SCN, SPN and SEN configuration files have the same properties.

| 명칭                             | 설명                                                                                                                                                                                                                                                               |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 명칭                             | 설명                                                                                                                                                                                                                                                               |
| NETWORK                        | Network name that this node will join.  This value is used when NETWORK_ID is not defined.  ("cypress", "baobab")                                                                                                                                                |
| NETWORK_ID                     | Klaytn network ID.  If you create a local private network, you will define the network ID for your own.  Following IDs are reserved for pre-configured networks.  <br>8217 : Cypress (Main network) <br>1000 : Aspen test network <br>1001 : Baobab test network |
| PORT                           | P2P 포트                                                                                                                                                                                                                                                           |
| SERVER_TYPE                    | JSON RPC server type.  ("http", "fasthttp")                                                                                                                                                                                                                      |
| SYNCMODE                       | Blockchain sync mode.  ("fast", "full")                                                                                                                                                                                                                          |
| VERBOSITY                      | Logging verbosity.  (0=silent, 1=error, 2=warn, 3=info, 4=debug, 5=detail)                                                                                                                                                                                       |
| MAXCONNECTIONS                 | Maximum number of physical connections.  All single-channel peers can have up to MAXCONNECTIONS peers.  All multi-channel peers can have up to MAXCONNECTIONS/2 peers.  Network connection is disabled if it is set to 0.                                        |
| LDBCACHESIZE                   | LevelDB의 메모리 내 캐시 크기 (MiB).                                                                                                                                                                                                                                      |
| REWARDBASE                     | Account address that will receive block consensus rewards. This property only applies to CN.                                                                                                                                                                     |
| TXPOOL_EXEC_SLOTS_ALL        | 모든 계정에 대해 실행 가능한 트랜잭션 슬롯의 최대 개수                                                                                                                                                                                                                                  |
| TXPOOL_NONEXEC_SLOTS_ALL     | 모든 계정에 대해 실행 불가능한 트랜잭션 슬롯의 최대 개수                                                                                                                                                                                                                                 |
| TXPOOL_EXEC_SLOTS_ACCOUNT    | 계정당 보장된 실행 가능한 트랜잭션 슬롯의 개수                                                                                                                                                                                                                                       |
| TXPOOL_NONEXEC_SLOTS_ACCOUNT | 계정당 보장된 실행 가능한 트랜잭션 슬롯의 최대 개수                                                                                                                                                                                                                                    |
| TXPOOL_LIFE_TIME             | 실행 불가능한 트랜잭션이 대기하는 최대 시간                                                                                                                                                                                                                                         |
| RPC_ENABLE                     | 1로 설정하면 HTTP-RPC 서버를 활성화합니다.                                                                                                                                                                                                                                     |
| RPC_API                        | Comma-separated list of APIs offered over the HTTP-RPC interface.  (admin, debug, klay, miner, net, personal, rpc, txpool, web3)                                                                                                                                 |
| RPC_PORT                       | HTTP-RPC 서버 수신 포트                                                                                                                                                                                                                                                |
| RPC_ADDR                       | HTTP-RPC 서버 수신 인터페이스                                                                                                                                                                                                                                             |
| RPC_CORSDOMAIN                 | Comma-separated list of domains from which to accept cross-origin requests (browser enforced)                                                                                                                                                                    |
| RPC_VHOSTS                     | Comma-separated list of virtual hostnames from which to accept requests (server enforced). Accepts '*' wildcard.                                                                                                                                                 |
| WS_ENABLE                      | 1로 설정하면 WS-RPC 서버를 활성화합니다.                                                                                                                                                                                                                                       |
| WS_API                         | APIs offered over the WS-RPC interface.  (admin, debug, klay, miner, net, personal, rpc, txpool, web3)                                                                                                                                                           |
| WS_ADDR                        | WS-RPC 서버 수신 인터페이스                                                                                                                                                                                                                                               |
| WS_PORT                        | WS-RPC 서버 수신 포트                                                                                                                                                                                                                                                  |
| WS_ORIGINS                     | 웹 소켓 요청을 수락할 Origin                                                                                                                                                                                                                                              |
| SC_MAIN_BRIDGE               | Enable main bridge service if it is set to 1. Used for service chain configuration.                                                                                                                                                                              |
| SC_MAIN_BRIDGE_PORT          | Main bridge 수신 포트                                                                                                                                                                                                                                                |
| SC_MAIN_BRIDGE_INDEXING      | Enable storing transaction hash of child chain transactions for fast access to child chain data if it is set to 1.                                                                                                                                               |
| METRICS                        | 1로 설정하면 지표 수집 및 보고를 할 수 있습니다.                                                                                                                                                                                                                                    |
| PROMETHEUS                     | 1로 설정하면 Prometheus Exporter를 활성화합니다.                                                                                                                                                                                                                             |
| DB_NO_PARALLEL_WRITE         | Disable parallel writes of block data to persistent database if it is set to 1.                                                                                                                                                                                  |
| MULTICHANNEL                   | 1로 설정하면 블록 전파를 위한 전용 채널이 생성됩니다.                                                                                                                                                                                                                                  |
| SUBPORT                        | MULTICHANNEL 옵션이 활성화되었을 때 보조 수신 포트 번호입니다.                                                                                                                                                                                                                        |
| NO_DISCOVER                    | 1로 설정되면 discovery 옵션을 비활성화합니다.                                                                                                                                                                                                                                   |
| BOOTNODES                      | 쉼표로 구분된, 부트스트랩 노드의 KNI 주소                                                                                                                                                                                                                                        |
| ADDITIONAL                     | For additional command-line options. e.g) --txpool.nolocals                                                                                                                                                                                                      |
| DATA_DIR                       | Klaytn 블록체인 데이터 폴더 경로                                                                                                                                                                                                                                            |
| LOG_DIR                        | 로그 폴더 경로                                                                                                                                                                                                                                                         |


