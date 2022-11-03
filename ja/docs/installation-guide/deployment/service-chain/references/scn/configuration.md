# Configuration <a id="configuration"></a>

This page explains the configuration of SCNs to form a consensus network.

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

Please change the chainID in the genesis file. Use your own number to prevent a replay attack. (Do not use the same chainID with Klaytn Cypress (8217) and Baobab (1001))

If you want, you can change the pre-funded addresses by editing `"alloc"` in the genesis file. (You can find more details in [Genesis JSON](../genesis.md).)

## SCN Data Directory Creation <a id="scn-data-directory-creation"></a>

Considering the fact that the size of Klaytn blockchain data keeps increasing, it is recommended to use a big enough storage. You can create the data directory on your desired path. In this document, we create `~/kscnd_home` as a data directory.

```bash
$ mkdir -p ~/kscnd_home
```

### Initialization of a Genesis Block <a id="initialization-of-a-genesis-block"></a>
After that, you can initialize the data directory with the genesis file. Before starting a service chain node, it is necessary to initialize the genesis block of the service chain network using `kscn` and `genesis.json`.

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

Assume that the SCN uses the default port and mounts a large-scale partition onto `~/kscnd_home`. In the default `kscnd.conf` file, `SC_SUB_BRIDGE` option is disabled and `DATA_DIR` is empty.
```
# Configuration file for the kscnd
...
SC_SUB_BRIDGE=0
...
DATA_DIR=
...
```

You can enable `SC_SUB_BRIDGE` to use the Anchoring/Value transfer feature. Also you should set the DATA_DIR like below.

```
# Configuration file for the kscnd
...
SC_SUB_BRIDGE=1
...
DATA_DIR=~/kscnd_home
...
```

If you want, you can further modify other options to customize your Service Chain. Otherwise, now you can finish the configuration and you are ready to run the service chain using the default configuration.


