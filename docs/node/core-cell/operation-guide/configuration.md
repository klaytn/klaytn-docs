# Configuration

This document explains the configurable properties of the node. Klaytn node package ships with good defaults and requires very little configuration. If you changed any settings of a running node, you must restart the node to reflect the changes.

## CN Configuration File location <a id="cn-configuration-file-location"></a>

* `kcnd.conf` for configuring the Consensus Node

The configuration file is located in the `conf` directory, whose default location depends on whether or not the installation is from an archive distribution \(`tar.gz`\) or a package distribution \(RPM\).

* For the archive distribution, the config directory location defaults to `$INSTALL_PATH/kcn-linux-amd64/conf/`.
* For the package distribution, the config directory defaults to `/etc/kcnd/conf/`.

## PN Configuration File location <a id="pn-configuration-file-location"></a>

* `kpnd.conf` for configuring the Proxy Node

The configuration file is located in the `conf` directory, whose default location depends on whether or not the installation is from an archive distribution \(`tar.gz`\) or a package distribution \(RPM\).

* For the archive distribution, the config directory location defaults to `$INSTALL_PATH/kpn-linux-amd64/conf/`.
* For the package distribution, the config directory defaults to `/etc/kpnd/conf/`.

## Configuration File Format <a id="configuration-file-format"></a>

CN and PN have the same configuration file format and the properties.

Below is a sample configuration file for the CN that participates in the `cypress` network and stores the blockchain data in the default location, which is `~/kcnd_home` with the archive distribution, `/var/kcnd/data` with the package distribution.

```text
# Configuration file for the kcnd

# cypress, baobab is only available if you don't specify NETWORK_ID.
NETWORK="cypress"
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

The recommended txpool sizes for CN are as follows.

```text
TXPOOL_EXEC_SLOTS_ALL=16384
TXPOOL_NONEXEC_SLOTS_ALL=16384
TXPOOL_EXEC_SLOTS_ACCOUNT=16384
TXPOOL_NONEXEC_SLOTS_ACCOUNT=16384
```

The recommended txpool sizes for PN are as follows.

```text
TXPOOL_EXEC_SLOTS_ALL=8192
TXPOOL_NONEXEC_SLOTS_ALL=8192
TXPOOL_EXEC_SLOTS_ACCOUNT=8192
TXPOOL_NONEXEC_SLOTS_ACCOUNT=8192
```

## Properties <a id="properties"></a>

The configuration file has the following configurable properties. CN and PN configuration files have the same properties except `REWARDBASE.`

| Name | Description |
| :--- | :--- |
| Name | Description |
| NETWORK | Network name that this node will join.  This value is used when NETWORK\_ID is not defined.  \("cypress", "baobab"\) |
| NETWORK\_ID | Klaytn network ID.  If you create a local private network, you will define the network ID for your own.  Following IDs are reserved for pre-configured networks.  8217 : Cypress \(Main network\)  1000 : Aspen test network  1001 : Baobab test network |
| PORT | P2P port. |
| SERVER\_TYPE | JSON RPC server type.  \("http", "fasthttp"\) |
| SYNCMODE | Blockchain sync mode.  \("fast", "full"\) |
| VERBOSITY | Logging verbosity.  \(0=silent, 1=error, 2=warn, 3=info, 4=debug, 5=detail\) |
| MAXCONNECTIONS | Maximum number of physical connections.  All single-channel peers can have up to MAXCONNECTIONS peers.  All multi-channel peers can have up to MAXCONNECTIONS/2 peers.  Network connection is disabled if it is set to 0. |
| LDBCACHESIZE | Size of in-memory cache in LevelDB \(MiB\). |
| REWARDBASE | Account address that will receive block consensus rewards. This property only applies to CN. |
| TXPOOL\_EXEC\_SLOTS\_ALL | Maximum number of executable transaction slots for all accounts. |
| TXPOOL\_NONEXEC\_SLOTS\_ALL | Maximum number of non-executable transaction slots for all accounts. |
| TXPOOL\_EXEC\_SLOTS\_ACCOUNT | Number of executable transaction slots guaranteed per account. |
| TXPOOL\_NONEXEC\_SLOTS\_ACCOUNT | Maximum number of non-executable transaction slots guaranteed per account. |
| TXPOOL\_LIFE\_TIME | Maximum amount of time non-executable transactions is queued. |
| RPC\_ENABLE | Enable the HTTP-RPC server if it is set to 1. |
| RPC\_API | Comma-separated list of APIs offered over the HTTP-RPC interface.  \(admin, debug, klay, miner, net, personal, rpc, txpool, web3\) |
| RPC\_PORT | HTTP-RPC server listening port. |
| RPC\_ADDR | HTTP-RPC server listening interface. |
| RPC\_CORSDOMAIN | Comma-separated list of domains from which to accept cross-origin requests \(browser enforced\) |
| RPC\_VHOSTS | Comma-separated list of virtual hostnames from which to accept requests \(server enforced\). Accepts '\*' wildcard. |
| WS\_ENABLE | Enable the WS-RPC server if it is set to 1. |
| WS\_API | APIs offered over the WS-RPC interface.  \(admin, debug, klay, miner, net, personal, rpc, txpool, web3\) |
| WS\_ADDR | WS-RPC server listening interface. |
| WS\_PORT | WS-RPC server listening port. |
| WS\_ORIGINS | Origins from which to accept websockets requests. |
| SC\_MAIN\_BRIDGE | Enable main bridge service if it is set to 1. Used for service chain configuration. |
| SC\_MAIN\_BRIDGE\_PORT | Main bridge listens on this port. |
| SC\_MAIN\_BRIDGE\_INDEXING | Enable storing transaction hash of child chain transactions for fast access to child chain data if it is set to 1. |
| AUTO\_RESTART | Restart the process when the current block has not been updated for `autorestart.timeout` \(e.g., 60s, 10m and 1h\) if it is set to 1. |
| METRICS | Enable metrics collection and reporting if it is set to 1. |
| PROMETHEUS | Enable prometheus exporter if it is set to 1. |
| DB\_NO\_PARALLEL\_WRITE | Disable parallel writes of block data to persistent database if it is set to 1. |
| MULTICHANNEL | Create a dedicated channel for block propagation if it is set to 1. |
| SUBPORT | Listening sub port number if multichannel option is enabled. |
| NO\_DISCOVER | Turn off the discovery option if it is set to 1. |
| BOOTNODES | Comma-separated kni addresses of bootstrap nodes. |
| ADDITIONAL | For additional command-line options. e.g\) --txpool.nolocals |
| DATA\_DIR | Klaytn blockchain data folder path. |
| LOG\_DIR | Log folder path. |

