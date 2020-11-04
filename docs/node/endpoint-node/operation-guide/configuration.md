# Configuration <a id="configuration"></a>

This document explains the configurable properties of the Endpoint Node. Klaytn node package ships with good defaults and requires very little configuration. If you changed any settings of a running node, you must restart the node to reflect the changes.

## Configuration File location <a id="configuration-file-location"></a>

* `kend.conf` for configuring the Endpoint Node

The configuration file is located in the `conf` directory, whose default location depends on whether or not the installation is from an archive distribution \(`tar.gz`\) or a package distribution \(RPM\).

* For the archive distribution, the config directory location defaults to `$INSTALL_PATH/ken-linux-amd64/conf/`.
* For the package distribution, the config directory defaults to `/etc/kend/conf/`.

## Configuration File Format  <a id="configuration-file-format"></a>

Below is a sample configuration file for the EN that participates in the `cypress` network and stores the blockchain data in the default location, which is `~/kend_home` with the archive distribution, `/var/kend/data` with the package distribution.

```text
# Configuration file for the kend

# cypress, baobab is only available if you don't specify NETWORK_ID.
NETWORK="cypress"
# if you specify NETWORK_ID, a private network is created.
NETWORK_ID=
PORT=32323
SERVER_TYPE="fasthttp"
SYNCMODE="full"
VERBOSITY=3
MAXCONNECTIONS=10
# LDBCACHESIZE=10240

...

DATA_DIR=
LOG_DIR=$DATA_DIR/logs
```

The recommended txpool sizes for EN are as follows. 

```text
TXPOOL_EXEC_SLOTS_ALL=4096
TXPOOL_NONEXEC_SLOTS_ALL=4096
TXPOOL_EXEC_SLOTS_ACCOUNT=4096
TXPOOL_NONEXEC_SLOTS_ACCOUNT=4096
```

## Properties <a id="properties"></a>

The configuration file has the following configurable properties. 


| Name | Description |
| --- | --- |
| Name | Description |
| NETWORK | Network name that this node will join.  This value is used when NETWORK_ID is not defined.  ("cypress", "baobab") |
| NETWORK_ID | Klaytn network ID.  If you create a local private network, you will define the network ID for your own.  Following IDs are reserved for pre-configured networks. <br>8217 : Cypress (Main network) <br>1000 : Aspen test network <br>1001 : Baobab test network |
| PORT | P2P port. |
| SERVER_TYPE | JSON RPC server type.  ("http", "fasthttp") |
| SYNCMODE | Blockchain sync mode.  ("fast", "full") |
| VERBOSITY | Logging verbosity.  (0=silent, 1=error, 2=warn, 3=info, 4=debug, 5=detail) |
| MAXCONNECTIONS | Maximum number of physical connections.  All single-channel peers can have up to MAXCONNECTIONS peers.  All multi-channel peers can have up to MAXCONNECTIONS/2 peers.  Network connection is disabled if it is set to 0.  |
| LDBCACHESIZE | Size of in-memory cache in LevelDB (MiB). |
| TXPOOL_EXEC_SLOTS_ALL | Maximum number of executable transaction slots for all accounts. |
| TXPOOL_NONEXEC_SLOTS_ALL | Maximum number of non-executable transaction slots for all accounts. |
| TXPOOL_EXEC_SLOTS_ACCOUNT | Number of executable transaction slots guaranteed per account. |
| TXPOOL_NONEXEC_SLOTS_ACCOUNT | Maximum number of non-executable transaction slots guaranteed per account. |
| TXPOOL_LIFE_TIME | Maximum amount of time non-executable transactions is queued. |
| RPC_ENABLE | Enable the HTTP-RPC server if it is set to 1. |
| RPC_API | Comma-separated list of APIs offered over the HTTP-RPC interface.  (admin, debug, klay, miner, net, personal, rpc, txpool, web3) |
| RPC_PORT | HTTP-RPC server listening port. |
| RPC_ADDR | HTTP-RPC server listening interface. |
| RPC_CORSDOMAIN | Comma-separated list of domains from which to accept cross-origin requests (browser enforced) |
| RPC_VHOSTS | Comma-separated list of virtual hostnames from which to accept requests (server enforced). Accepts '*' wildcard. |
| WS_ENABLE | Enable the WS-RPC server if it is set to 1. |
| WS_API | APIs offered over the WS-RPC interface.  (admin, debug, klay, miner, net, personal, rpc, txpool, web3) |
| WS_ADDR | WS-RPC server listening interface. |
| WS_PORT | WS-RPC server listening port. |
| WS_ORIGINS | Origins from which to accept websockets requests. |
| SC_MAIN_BRIDGE | Enable main bridge service if it is set to 1. Used for service chain configuration. |
| SC_MAIN_BRIDGE_PORT | Main bridge listens on this port. |
| SC_MAIN_BRIDGE_INDEXING | Enable storing transaction hash of child chain transactions for fast access to child chain data if it is set to 1. |
| METRICS | Enable metrics collection and reporting if it is set to 1. |
| PROMETHEUS | Enable prometheus exporter if it is set to 1. |
| DB_NO_PARALLEL_WRITE | Disable parallel writes of block data to persistent database if it is set to 1. |
| MULTICHANNEL | Create a dedicated channel for block propagation if it is set to 1. |
| SUBPORT | Listening sub port number if multichannel option is enabled. |
| NO_DISCOVER | Turn off the discovery option if it is set to 1. |
| BOOTNODES | Comma-separated kni addresses of bootstrap nodes. |
| ADDITIONAL | For additional command-line options. e.g) --txpool.nolocals |
| DATA_DIR | Klaytn blockchain data folder path. |
| LOG_DIR | Log folder path. |

