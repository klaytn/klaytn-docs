# Configuration

This page explains the configuration of a single Service Chain Node (SCN).

## Creation of SCSigner Keystore / Password Files

When you run a service chain node, you need a keystore file and the associated password file for the scsigner. You can generate the files like the following. 

### Create Your Password File

First you can generate the password file simply like below. This password file will be used to generate a keystore file and run the service chain node.

```bash
$ echo passwordString >> passwd
```

### Create Your Keystore File

You can create the keystore file with your password file like below.

```bash
$ kscn account new --datadir "./" --password ./passwd
Address: {c04ae62e6a8e084e8f00030d637380792db3dc26}
```

_You should use the generated address for the scsigner in the genesis file._

Now, you can have the keystore file and password file like below.

```bash
$ tree
.
├── keystore
│   └── UTC--2019-03-28T06-10-39.102092000Z--c04ae62e6a8e084e8f00030d637380792db3dc26
└── passwd
```

After [Initialization of a Genesis Block](#initialization-of-a-genesis-block), you will copy these files to the data directory.

## Creation of a Genesis File

First, you should create new genesis file for your own service chain and initialize all service chain nodes with the same genesis file. The genesis file of the service chain is different with main chain. To create new genesis file, you should write the scsigner address of your service chain in `governingnode`, `extraData` and `alloc` field. The `unitPrice` is set to `0` in the example below, but you can change it to the value you want.

The `genesis.json` examples follow. You can find more details in [Genesis JSON](../../genesis.md).

* `geneis.json` example for a consensus node.
  * The consensus node's scsigner is `c04ae62e6a8e084e8f00030d637380792db3dc26`.

```javascript
{
     "config": {
         "chainId": 3000,
         "clique": {
             "period": 1,
             "epoch": 604800
         },
         "unitPrice": 0
     },
     "extraData": "0x0000000000000000000000000000000000000000000000000000000000000000c04ae62e6a8e084e8f00030d637380792db3dc260000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
     "alloc": {
         "c04ae62e6a8e084e8f00030d637380792db3dc26": {
             "balance": "0x446c3b15f9926687d2c40534fdb564000000000000"
         }
     },
     "number": "0x0",
     "gasUsed": "0x0",
     "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000"
}
```


## SCN Data Directory Creation

Considering the fact that the size of Klaytn blockchain data is always increased, it is recommended to use a big enough storage. You may need to create the directory on your specific path.

```bash
$ mkdir -p ~/kscnd_home
```

### Initialization of a Genesis Block

Before starting an service chain node, it is necessary to initialize the genesis block of the service chain network using `kscn` and `genesis.json`.

```bash
$ kscn init --datadir ~/kscnd_home genesis.json
...
```

All required steps are done for launching an SCN.

### **Install SCSigner Key / Password Files**

To set scsigner for the service chain node, we need the right pair of scsigner keystore and password file. Copy the files like below. Keystore file needs a password file to unlock the account.

```bash
$ cp ./keystore/UTC--2019-...--ef28e51ef33fe0f487289c1c6e1ccdf5e571366b ~/kscnd_home/keystore
$ cp ./passwd ~/kscnd_home/
```

## Configuration of the SCN

`kscnd.conf` is the configuration file for the SCN.

Assume that the participated SCN in Cypress (Network ID: 8217) uses the default
port and mounts a large-scale partition onto `~/kscnd_home`.  The following
configuration is an example.

```
# Configuration file for the kscnd

SCSIGNER="c04ae62e6a8e084e8f00030d637380792db3dc26"
SCSIGNER_PASSWD_FILE=~/kscnd_home/passwd   # Need to right password file path for the keystore file of the scsigner address

NETWORK_ID=3000 # Set your own unique network ID which is different with known network(Klaytn Mainnet(1), Baobab(1000))

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


