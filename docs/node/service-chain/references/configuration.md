# Configuration <a id="configuration"></a>

This page explains the configuration of a SCN.

If you installed archive distribution, you can find the binaries and the config file in the directories you extracted the archives. Below is an example of command execution.
```bash
$ homi-darwin-amd64/bin/homi setup ...
$ kscn-darwin-amd64/bin/kscnd start
$ vi kscn-darwin-amd64/conf/kscnd.conf
```

In this tutorial, we will not always specify the full path to the command.
 
## Creation of a Genesis File <a id="creation-of-a-genesis-file"></a>

First, you should create a genesis file and a nodekey file for your own service chain. You can create them using homi like below.
```bash
$ homi setup local --cn-num 1 --servicechain -o ./homi-output
Created :  homi-output/keys/passwd1
Created :  homi-output/scripts/genesis.json
Created :  homi-output/keys/nodekey1
Created :  homi-output/keys/validator1
Created :  homi-output/scripts/static-nodes.json
Created :  homi-output/Klaytn.json
Created :  homi-output/Klaytn_txpool.json
```
 
Below are examples of genesis file and nodekey file.
```bash
$ cat homi-output/scripts/genesis.json
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
    "timestamp": "0x5dca0732",
    "extraData": "0x0000000000000000000000000000000000000000000000000000000000000000f85ad594f8690562c0839c44b17af421f7aaaa9f12dcc62bb8410000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c0",
    "governanceData": null,
    "blockScore": "0x1",
    "alloc": {
        "f8690562c0839c44b17af421f7aaaa9f12dcc62b": {
            "balance": "0x2540be400"
        }
    },
    "number": "0x0",
    "gasUsed": "0x0",
    "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000"
}   
```

```bash      
$ cat homi-output/keys/nodekey1                                                                                                                                 
0c28c77ce5c2ca9e495b860f190ed7dfe7bd5c1a2e5f816587eb4d3d9566df44
```

Please change the chainID in the genesis file. Use your own number to prevent a replay attack.
(Do not use the same chainID with Klaytn Cypress (8217) and Baobab (1001))

If you want, you can change the pre-funded addresses by editing `"alloc"` in the genesis file.
(You can find more details in [Genesis JSON](../../genesis.md).)

## SCN Data Directory Creation <a id="scn-data-directory-creation"></a>

Considering the fact that the size of Klaytn blockchain data keeps increasing, it is recommended to use a big enough storage. 
You can create the data directory on your desired path.
In this document, we create `~/kscnd_home` as a data directory. 

```bash
$ mkdir -p ~/kscnd_home
```

### Initialization of a Genesis Block <a id="initialization-of-a-genesis-block"></a>
After that, you can initialize the data directory with the genesis file.
Before starting a service chain node, it is necessary to initialize the genesis block of the service chain network using `kscn` and `genesis.json`.

```bash
$ kscn init --datadir ~/kscnd_home homi-output/scripts/genesis.json
  WARN[11/12,10:13:58 +09] [19] Some input value of genesis.json have been set to default or changed
  INFO[11/12,10:13:58 +09] [18] Setting connection type                   nodetype=cn conntype=0
    ...
  INFO[11/12,10:13:59 +09] [5] Using DeriveShaConcat!
  INFO[11/12,10:13:59 +09] [5] Writing custom genesis block
  INFO[11/12,10:13:59 +09] [5] Using DeriveShaConcat!
  INFO[11/12,10:13:59 +09] [47] Persisted trie from memory database       updated nodes=1 updated nodes size=80.00B time=304.931µs gcnodes=0 gcsize=0.00B gctime=0s livenodes=1 livesize=0.00B
  INFO[11/12,10:13:59 +09] [19] Successfully wrote genesis state          database=lightchaindata hash=0xc269669079fc8c06ac37435a563b8ed8ef273c1c835f3d823d2e586315319aa8
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/header
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/body
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/receipts
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/statetrie/0
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/statetrie/1
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/statetrie/2
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/statetrie/3
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/txlookup
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/misc
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/bridgeservice
```

### Install nodekey <a id="install_nodekey"></a>
Copy `homi-output/keys/nodekey1` to the `klay` directory in the SCN's data directory like below. 

```bash
$ cp homi-output/keys/nodekey1  ~/kscnd_home/klay/nodekey
```

## Configuration of the SCN <a id="configuration-of-the-scn"></a>

`kscnd.conf` is the configuration file for the SCN.

Assume that the SCN uses the default port and mounts a large-scale partition onto `~/kscnd_home`.
In the default `kscnd.conf` file, `SC_SUB_BRIDGE` option is disabled and `DATA_DIR` is empty.
```
# Configuration file for the kscnd
...
SC_SUB_BRIDGE=0
...
DATA_DIR=
...
```
  
You can enable `SC_SUB_BRIDGE` to use the Anchoring/Value transfer feature.
Also you should set the DATA_DIR like below. 

```
# Configuration file for the kscnd
...
SC_SUB_BRIDGE=1
...
DATA_DIR=~/kscnd_home
...
```

If you want, you can further modify other options to customize your Service Chain.
Otherwise, now you can finish the configuration and you are ready to run the service chain using the default configuration.

## SCN Configuration File location <a id="scn-configuration-file-location"></a>

* `kscnd.conf` for configuring the Service Chain Consensus Node

The configuration file is located in the `conf` directory, whose default location depends on whether or not the installation is from an archive distribution \(`tar.gz`\) or a package distribution \(RPM\).

* For the archive distribution, the config directory location defaults to `$INSTALL_PATH/kscn-linux-amd64/conf/`.
* For the package distribution, the config directory defaults to `/etc/kscnd/conf/`.

## Configuration File Format  <a id="configuration-file-format"></a>

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

## Properties <a id="properties"></a>

The configuration file has the following configurable properties.

<table>
  <thead>
    <tr>
      <th style="text-align:left">Name</th>
      <th style="text-align:left">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">Name</td>
      <td style="text-align:left">Description</td>
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

