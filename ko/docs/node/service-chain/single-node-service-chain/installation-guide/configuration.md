# 설정<a id="configuration"></a>

이 페이지는 단일 노드로 구성된 서비스체인을 만들기 위해 어떻게 노드를 설정해야 하는지 설명합니다.

## 제네시스 파일 생성 <a id="creation-of-a-genesis-file"></a>

먼저, 서비스체인을 위한 새 제네시스 파일을 생성하고 동일한 제네시스 파일로 모든 서비스체인 노드를 초기화해야 합니다. 서비스체인의 제네시스 파일은 메인체인과 다릅니다. 아래 예시에서 `unitPrice`은 `0`으로 설정되어 있는데, 원하는 값으로 변경할 수 있습니다.

아래는 `genesis.json` 파일의 예입니다. [Genesis JSON](../../genesis.md)에서 더 자세한 내용을 확인할 수 있습니다.

* 컨센서스 노드를 위한 `geneis.json` 예시.
  * 컨센서스 노드 키는 `5d45c852383d12cdb38533cb7369db7ba6c298e4`입니다.

```json
{
    "config": {
        "chainId": 1000,
        "istanbul": {
            "epoch": 3600,
            "policy": 0,
            "sub": 22
        },
        "unitPrice": 0,
        "deriveShaImpl": 2,
        "governance": null
    },
    "timestamp": "0x5dad1614",
    "extraData": "0x0000000000000000000000000000000000000000000000000000000000000000f85ad5945d45c852383d12cdb38533cb7369db7ba6c298e4b8410000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c0",
    "governanceData": null,
    "blockScore": "0x1",
    "alloc": {
        "5d45c852383d12cdb38533cb7369db7ba6c298e4": {
            "balance": "0x2540be400"
        }
    },
    "number": "0x0",
    "gasUsed": "0x0",
    "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000"
}
```


## SCN 데이터 디렉토리 생성 <a id="scn-data-directory-creation"></a>

Klaytn 블록체인 데이터의 크기가 계속 증가한다는 사실을 고려하면 충분히 큰 스토리지를 사용하는 것이 좋습니다. 원하는 경로에 데이터 디렉토리를 생성합니다.

```bash
$ mkdir -p ~/kscnd_home
```

### 제네시스 블록의 초기화 <a id="initialization-of-a-genesis-block"></a>

서비스체인 노드를 시작하기 전에, `kscn` 및 `genesis.json`을 사용하여 서비스체인 네트워크의 제네시스 블록을 초기화해야 합니다.

```bash
$ kscn init --datadir ~/kscnd_home genesis.json
...
```

SCN을 시작하기 위해 필요한 모든 단계가 완료되었습니다.

## SCN 설정 <a id="configuration-of-the-scn"></a>

`kscnd.conf`는 SCN의 설정 파일입니다.

Cypress (Network ID: 8217)에 참여한 SCN이 기본 포트를 사용하고 대규모 파티션을 `~/kscnd_home`에 마운트한다고 가정합니다.  다음은 설정 파일의 예입니다.

```
# Configuration file for the kscnd

SCSIGNER="" #deprecated 
SCSIGNER_PASSWD_FILE= #deprecated

NETWORK_ID=3000 # Set your own unique network ID which should be different from the known networks (Klaytn Mainnet(1), Baobab(1000))

PORT=22323 # if EN (main-bridge) and SCN (sub-bridge) on same instance, use different port with EN.(EN: 32323, SCN:22323)

SERVER_TYPE="fasthttp"
SYNCMODE="full"
VERBOSITY=3

# txpool options setting
TXPOOL_EXEC_SLOTS_ALL=16384
TXPOOL_NONEXEC_SLOTS_ALL=16384
TXPOOL_EXEC_SLOTS_ACCOUNT=16384
TXPOOL_NONEXEC_SLOTS_ACCOUNT=16384

# rpc options setting
RPC_ENABLE=1 # if this is set, the following options will be used
RPC_API="klay,subbridge" # available apis: admin,debug,klay,miner,net,personal,rpc,txpool,web3,mainbridge,subbridge
RPC_PORT=7551         # if main-bridge and sub-bridge on same instance, us different port with main-bridge.(main: 8551, sub:7551)
RPC_ADDR="0.0.0.0"
RPC_CORSDOMAIN="*"
RPC_VHOSTS="*"

# ws options setting
WS_ENABLE=1 # if this is set, the following options will be used
WS_API="klay"
WS_ADDR="0.0.0.0"
WS_PORT=7552    # if main-bridge and sub-bridge on same instance, us different port with main-bridge.(main: 8552, sub:7552)
WS_ORIGINS="*"

# service chain options setting
MAIN_BRIDGE=0 # if this is set, the following options will be used.
MAIN_BRIDGE_PORT=50505
MAIN_INDEXING=1

SC_SUB_BRIDGE=1
SC_SUB_BRIDGE_PORT=50506    # if main-bridge and sub-bridge on same instance, us different port with main-bridge.(main: 50505, sub:50506)
SC_TX_PERIOD=1
SC_TX_LIMIT=1000
SC_PARENT_CHAIN_WS="ws://0.0.0.0:8552"  # This url is the noted RPC web socket of main-bridge.

# Setting 1 is to enable options, otherwise disabled.
METRICS=1
PROMETHEUS=1
NO_DISCOVER=1
DB_NO_PARALLEL_WRITE=0
MULTICHANNEL=1
SUBPORT=$((PORT + 1)) # used for multi channel option
VTRECOVERY=1 # value transfer recovery

# Raw options e.g.) "--txpool.nolocals"
ADDITIONAL=""

DATA_DIR=~/kscnd_home
LOG_DIR=$DATA_DIR/logs
```

SCN 타입에 권장되는 txpool 크기는 다음과 같습니다:

```
TXPOOL_EXEC_SLOTS_ALL=16384
TXPOOL_NONEXEC_SLOTS_ALL=16384
TXPOOL_EXEC_SLOTS_ACCOUNT=16384
TXPOOL_NONEXEC_SLOTS_ACCOUNT=16384
```


