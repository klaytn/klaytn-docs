# Configuration <a id="configuration"></a>

This document explains the configurable properties of the node. Klaytn node package ships with good defaults and requires very little configuration. If you changed any settings of a running node, you must restart the node to reflect the changes.

## CN 환경설정 파일 위치 <a id="cn-configuration-file-location"></a>

* 컨센서스 노드 환경설정을 위한 `kcnd.conf`

The configuration file is located in the `conf` directory, whose default location depends on whether or not the installation is from an archive distribution \(`tar.gz`\) or a package distribution \(RPM\).

* For the archive distribution, the config directory location defaults to `$INSTALL_PATH/kcn-linux-amd64/conf/`.
* For the package distribution, the config directory defaults to `/etc/kcnd/conf/`.

## PN 환경설정 파일 위치 <a id="pn-configuration-file-location"></a>

* 프록시 노드 환경설정을 위한 `kpnd.conf`

The configuration file is located in the `conf` directory, whose default location depends on whether or not the installation is from an archive distribution \(`tar.gz`\) or a package distribution \(RPM\).

* For the archive distribution, the config directory location defaults to `$INSTALL_PATH/kpn-linux-amd64/conf/`.
* For the package distribution, the config directory defaults to `/etc/kpnd/conf/`.

## EN Configuration File location <a id="configuration-file-location"></a>

* 엔드포인트 노드 환경설정을 위한 `kend.conf`

The configuration file is located in the `conf` directory, whose default location depends on whether or not the installation is from an archive distribution \(`tar.gz`\) or a package distribution \(RPM\).

* For the archive distribution, the config directory location defaults to `$INSTALL_PATH/ken-linux-amd64/conf/`.
* For the package distribution, the config directory defaults to `/etc/kend/conf/`.


## Configuration File Format  <a id="configuration-file-format"></a>

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

아래와 같이 EN의 txpool 크기를 권장합니다.

```text
TXPOOL_EXEC_SLOTS_ALL=4096
TXPOOL_NONEXEC_SLOTS_ALL=4096
TXPOOL_EXEC_SLOTS_ACCOUNT=4096
TXPOOL_NONEXEC_SLOTS_ACCOUNT=4096
```

## Properties <a id="properties"></a>

The configuration file has the following configurable properties. CN과 PN 설정 파일은 `REWARDBASE`를 제외하고는 동일한 속성을 갖습니다.

| Name                           | Description                                                                                                                                                                                                                                                                       |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NETWORK                        | Network name that this node will join.  This value is used when NETWORK_ID is not defined.  ("cypress", "baobab")                                                                                                                                                                 |
| NETWORK_ID                     | Klaytn network ID.  If you create a local private network, you will define the network ID for your own.  Following IDs are reserved for pre-configured networks. <br>8217 : Cypress (Main network) <br>1000 : Aspen test network <br>1001 : Baobab test network |
| PORT                           | P2P port. (Default: "32323")                                                                                                                                                                                                                                                      |
| SERVER_TYPE                    | JSON RPC server type.  ("http", "fasthttp")                                                                                                                                                                                                                                       |
| SYNCMODE                       | Blockchain sync mode.  ("fast", "full")                                                                                                                                                                                                                                           |
| VERBOSITY                      | Logging verbosity.  (0=silent, 1=error, 2=warn, 3=info, 4=debug, 5=detail)                                                                                                                                                                                                        |
| MAXCONNECTIONS                 | Maximum number of physical connections.  All single-channel peers can have up to MAXCONNECTIONS peers.  All multi-channel peers can have up to MAXCONNECTIONS/2 peers.  Network connection is disabled if it is set to 0. (Default: 10)                                           |
| LDBCACHESIZE                   | Size of in-memory cache in LevelDB (MiB). (Default : 768)                                                                                                                                                                                                                         |
| REWARDBASE                     | Account address that will receive block consensus rewards. This property only applies to CN.                                                                                                                                                                                      |
| TXPOOL_EXEC_SLOTS_ALL        | Maximum number of executable transaction slots for all accounts. (Default: 4096)                                                                                                                                                                                                  |
| TXPOOL_NONEXEC_SLOTS_ALL     | Maximum number of non-executable transaction slots for all accounts. (Default: 1024)                                                                                                                                                                                              |
| TXPOOL_EXEC_SLOTS_ACCOUNT    | Number of executable transaction slots guaranteed per account. (Default: 16)                                                                                                                                                                                                      |
| TXPOOL_NONEXEC_SLOTS_ACCOUNT | Maximum number of non-executable transaction slots guaranteed per account. (Default: 64)                                                                                                                                                                                          |
| TXPOOL_LIFE_TIME             | Maximum amount of time non-executable transactions is queued. (Default : 5m)                                                                                                                                                                                                      |
| RPC_ENABLE                     | Enable the HTTP-RPC server if it is set to 1.                                                                                                                                                                                                                                     |
| RPC_API                        | Comma-separated list of APIs offered over the HTTP-RPC interface.  (admin, debug, klay, miner, net, personal, rpc, txpool, web3)                                                                                                                                                  |
| RPC_PORT                       | HTTP-RPC server listening port. (Default: "8551")                                                                                                                                                                                                                                 |
| RPC_ADDR                       | HTTP-RPC server listening interface. (Default: "localhost")                                                                                                                                                                                                                       |
| RPC_CORSDOMAIN                 | Comma-separated list of domains from which to accept cross-origin requests (browser enforced)                                                                                                                                                                                     |
| RPC_VHOSTS                     | Comma-separated list of virtual hostnames from which to accept requests (server enforced). Accepts '*' wildcard. (Default: {"localhost"})                                                                                                                                         |
| WS_ENABLE                      | Enable the WS-RPC server if it is set to 1.                                                                                                                                                                                                                                       |
| WS_API                         | APIs offered over the WS-RPC interface.  (admin, debug, klay, miner, net, personal, rpc, txpool, web3)                                                                                                                                                                            |
| WS_ADDR                        | WS-RPC server listening interface.                                                                                                                                                                                                                                                |
| WS_PORT                        | WS-RPC server listening port. (Default : "8552")                                                                                                                                                                                                                                  |
| WS_ORIGINS                     | Origins from which to accept websockets requests. (Default: "localhost")                                                                                                                                                                                                          |
| AUTO_RESTART                   | 1로 설정되었을 경우 `autorestart.timeout` (e.g., 60s, 10m, 1h) 동안 현재 블록이 업데이트되지 않았다면 프로세스를 재시작합니다.                                                                                                                                                                                        |
| METRICS                        | Enable metrics collection and reporting if it is set to 1.                                                                                                                                                                                                                        |
| PROMETHEUS                     | Enable prometheus exporter if it is set to 1.                                                                                                                                                                                                                                     |
| DB_NO_PARALLEL_WRITE         | Disable parallel writes of block data to persistent database if it is set to 1.                                                                                                                                                                                                   |
| MULTICHANNEL                   | Create a dedicated channel for block propagation if it is set to 1.                                                                                                                                                                                                               |
| SUBPORT                        | Listening sub port number if multichannel option is enabled. (Default : "32324")                                                                                                                                                                                                  |
| NO_DISCOVER                    | Turn off the discovery option if it is set to 1.                                                                                                                                                                                                                                  |
| BOOTNODES                      | Comma-separated kni addresses of bootstrap nodes.                                                                                                                                                                                                                                 |
| ADDITIONAL                     | For additional command-line options. e.g) --txpool.nolocals                                                                                                                                                                                                                       |
| DATA_DIR                       | Klaytn blockchain data folder path.                                                                                                                                                                                                                                               |
| LOG_DIR                        | Log folder path.                                                                                                                                                                                                                                                                  |
