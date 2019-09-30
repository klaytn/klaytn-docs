# Configuration

This document explains the configurable properties of the node. Klaytn node package ships with good defaults and requires very little configuration. If you changed any settings of a running node, you must restart the node to reflect the changes.

## CN Configuration File location

* `kcnd.conf` for configuring the Consensus Node

The configuration file is located in the `conf` directory, whose default location depends on whether or not the installation is from an archive distribution \(`tar.gz`\) or a package distribution \(RPM\).

* For the archive distribution, the config directory location defaults to `$INSTALL_PATH/kcn-linux-amd64/conf/`.
* For the package distribution, the config directory defaults to `/etc/kcnd/conf/`.

## PN Configuration File location

* `kpnd.conf` for configuring the Proxy Node

The configuration file is located in the `conf` directory, whose default location depends on whether or not the installation is from an archive distribution \(`tar.gz`\) or a package distribution \(RPM\).

* For the archive distribution, the config directory location defaults to `$INSTALL_PATH/kpn-linux-amd64/conf/`.
* For the package distribution, the config directory defaults to `/etc/kpnd/conf/`.

## Configuration File Format

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

## Properties

The configuration file has the following configurable properties. CN and PN configuration files have the same properties except `REWARDBASE.`

<table>
  <thead>
    <tr>
      <th style="text-align:left">Name</th>
      <th style="text-align:left">설명</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">Name</td>
      <td style="text-align:left">설명</td>
    </tr>
    <tr>
      <td style="text-align:left">NETWORK</td>
      <td style="text-align:left">
        <p>Network name that this node will join.</p>
        <p>This value is used when NETWORK_ID is not defined.</p>
        <p>(&quot;cypress&quot;, &quot;baobab&quot;)</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">NETWORK_ID</td>
      <td style="text-align:left">
        <p>Klaytn network ID.</p>
        <p>If you create a local private network, you will define the network ID
          for your own.</p>
        <p>Following IDs are reserved for pre-configured networks.</p>
        <p>8217 : Cypress (Main network)</p>
        <p>1000 : Aspen test network</p>
        <p>1001 : Baobab test network</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">PORT</td>
      <td style="text-align:left">P2P port.</td>
    </tr>
    <tr>
      <td style="text-align:left">SERVER_TYPE</td>
      <td style="text-align:left">
        <p>JSON RPC server type.</p>
        <p>(&quot;http&quot;, &quot;fasthttp&quot;)</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">SYNCMODE</td>
      <td style="text-align:left">
        <p>Blockchain sync mode.</p>
        <p>(&quot;fast&quot;, &quot;full&quot;)</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">VERBOSITY</td>
      <td style="text-align:left">
        <p>Logging verbosity.</p>
        <p>(0=silent, 1=error, 2=warn, 3=info, 4=debug, 5=detail)</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">MAXCONNECTIONS</td>
      <td style="text-align:left">
        <p>Maximum number of physical connections.</p>
        <p>All single-channel peers can have up to <code>MAXCONNECTIONS</code> peers.</p>
        <p>All multi-channel peers can have up to <code>MAXCONNECTIONS</code>/2 peers.</p>
        <p>Network connection is disabled if it is set to 0.</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">LDBCACHESIZE</td>
      <td style="text-align:left">Size of in-memory cache in LevelDB (MiB).</td>
    </tr>
    <tr>
      <td style="text-align:left">REWARDBASE</td>
      <td style="text-align:left">Account address that will receive block consensus rewards. This property
        only applies to CN.</td>
    </tr>
    <tr>
      <td style="text-align:left">TXPOOL_EXEC_SLOTS_ALL</td>
      <td style="text-align:left">Maximum number of executable transaction slots for all accounts.</td>
    </tr>
    <tr>
      <td style="text-align:left">TXPOOL_NONEXEC_SLOTS_ALL</td>
      <td style="text-align:left">Maximum number of non-executable transaction slots for all accounts.</td>
    </tr>
    <tr>
      <td style="text-align:left">TXPOOL_EXEC_SLOTS_ACCOUNT</td>
      <td style="text-align:left">Number of executable transaction slots guaranteed per account.</td>
    </tr>
    <tr>
      <td style="text-align:left">TXPOOL_NONEXEC_SLOTS_ACCOUNT</td>
      <td style="text-align:left">Maximum number of non-executable transaction slots guaranteed per account.</td>
    </tr>
    <tr>
      <td style="text-align:left">TXPOOL_LIFE_TIME</td>
      <td style="text-align:left">Maximum amount of time non-executable transactions is queued.</td>
    </tr>
    <tr>
      <td style="text-align:left">RPC_ENABLE</td>
      <td style="text-align:left">Enable the HTTP-RPC server if it is set to 1.</td>
    </tr>
    <tr>
      <td style="text-align:left">RPC_API</td>
      <td style="text-align:left">
        <p>Comma-separated list of APIs offered over the HTTP-RPC interface.</p>
        <p>(admin, debug, klay, miner, net, personal, rpc, txpool, web3)</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">RPC_PORT</td>
      <td style="text-align:left">HTTP-RPC server listening port.</td>
    </tr>
    <tr>
      <td style="text-align:left">RPC_ADDR</td>
      <td style="text-align:left">HTTP-RPC server listening interface.</td>
    </tr>
    <tr>
      <td style="text-align:left">RPC_CORSDOMAIN</td>
      <td style="text-align:left">Comma-separated list of domains from which to accept cross-origin requests
        (browser enforced)</td>
    </tr>
    <tr>
      <td style="text-align:left">RPC_VHOSTS</td>
      <td style="text-align:left">Comma-separated list of virtual hostnames from which to accept requests
        (server enforced). Accepts &apos;*&apos; wildcard.</td>
    </tr>
    <tr>
      <td style="text-align:left">WS_ENABLE</td>
      <td style="text-align:left">Enable the WS-RPC server if it is set to 1.</td>
    </tr>
    <tr>
      <td style="text-align:left">WS_API</td>
      <td style="text-align:left">
        <p>APIs offered over the WS-RPC interface.</p>
        <p>(admin, debug, klay, miner, net, personal, rpc, txpool, web3)</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">WS_ADDR</td>
      <td style="text-align:left">WS-RPC server listening interface.</td>
    </tr>
    <tr>
      <td style="text-align:left">WS_PORT</td>
      <td style="text-align:left">WS-RPC server listening port.</td>
    </tr>
    <tr>
      <td style="text-align:left">WS_ORIGINS</td>
      <td style="text-align:left">Origins from which to accept websockets requests.</td>
    </tr>
    <tr>
      <td style="text-align:left">SC_MAIN_BRIDGE</td>
      <td style="text-align:left">Enable main bridge service if it is set to 1. Used for service chain configuration.</td>
    </tr>
    <tr>
      <td style="text-align:left">SC_MAIN_BRIDGE_PORT</td>
      <td style="text-align:left">Main bridge listens on this port.</td>
    </tr>
    <tr>
      <td style="text-align:left">SC_MAIN_BRIDGE_INDEXING</td>
      <td style="text-align:left">Enable storing transaction hash of child chain transactions for fast access
        to child chain data if it is set to 1.</td>
    </tr>
    <tr>
      <td style="text-align:left">METRICS</td>
      <td style="text-align:left">Enable metrics collection and reporting if it is set to 1.</td>
    </tr>
    <tr>
      <td style="text-align:left">PROMETHEUS</td>
      <td style="text-align:left">Enable prometheus exporter if it is set to 1.</td>
    </tr>
    <tr>
      <td style="text-align:left">DB_NO_PARALLEL_WRITE</td>
      <td style="text-align:left">Disable parallel writes of block data to persistent database if it is
        set to 1.</td>
    </tr>
    <tr>
      <td style="text-align:left">MULTICHANNEL</td>
      <td style="text-align:left">Create a dedicated channel for block propagation if it is set to 1.</td>
    </tr>
    <tr>
      <td style="text-align:left">SUBPORT</td>
      <td style="text-align:left">Listening sub port number if multichannel option is enabled.</td>
    </tr>
    <tr>
      <td style="text-align:left">NO_DISCOVER</td>
      <td style="text-align:left">Turn off the discovery option if it is set to 1.</td>
    </tr>
    <tr>
      <td style="text-align:left">BOOTNODES</td>
      <td style="text-align:left">Comma-separated kni addresses of bootstrap nodes.</td>
    </tr>
    <tr>
      <td style="text-align:left">ADDITIONAL</td>
      <td style="text-align:left">For additional command-line options. e.g) --txpool.nolocals</td>
    </tr>
    <tr>
      <td style="text-align:left">DATA_DIR</td>
      <td style="text-align:left">Klaytn blockchain data folder path.</td>
    </tr>
    <tr>
      <td style="text-align:left">LOG_DIR</td>
      <td style="text-align:left">Log folder path.</td>
    </tr>
  </tbody>
</table>