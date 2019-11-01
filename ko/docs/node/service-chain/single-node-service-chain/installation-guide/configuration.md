# Configuration <a id="configuration"></a>

This page explains the configuration of a node in a single-node Service Chain.

## Creation of a Genesis File <a id="creation-of-a-genesis-file"></a>

First, you should create a new genesis file for your own service chain and initialize all service chain nodes with the same genesis file. The genesis file of the service chain is different with main chain. The `unitPrice` is set to `0` in the example below, but you can change it to the value you want.

The `genesis.json` example is given below. You can find more details in [Genesis JSON](../../genesis.md).

* 합의 노드를 위한 `geneis.json` 예시.
  * The consensus node key is `5d45c852383d12cdb38533cb7369db7ba6c298e4`.

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


## SCN Data Directory Creation <a id="scn-data-directory-creation"></a>

Klaytn 블록체인 데이터의 크기가 계속 증가한다는 사실을 고려하면 충분히 큰 스토리지를 사용하는 것이 좋습니다. You can create the data directory on your desired path.

```bash
$ mkdir -p ~/kscnd_home
```

### Initialization of a Genesis Block <a id="initialization-of-a-genesis-block"></a>

Before starting a service chain node, it is necessary to initialize the genesis block of the service chain network using `kscn` and `genesis.json`.

```bash
$ kscn init --datadir ~/kscnd_home genesis.json
...
```

All required steps are done for launching an SCN.

## Configuration of the SCN <a id="configuration-of-the-scn"></a>

`kscnd.conf` is the configuration file for the SCN.

Assume that the participated SCN in Cypress (Network ID: 8217) uses the default port and mounts a large-scale partition onto `~/kscnd_home`.  The following configuration is an example.

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

The recommended txpool sizes based on SCN type is as follows:

```
TXPOOL_EXEC_SLOTS_ALL=16384
TXPOOL_NONEXEC_SLOTS_ALL=16384
TXPOOL_EXEC_SLOTS_ACCOUNT=16384
TXPOOL_NONEXEC_SLOTS_ACCOUNT=16384
```


