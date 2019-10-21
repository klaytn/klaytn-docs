# Guide for EN Setup and SCN connection
This section covers how to setup EN for Baobab network and connect EN with SCN.
You will setup EN and connect EN with SCN. Then you will enable Anchoring feature to write Service Chain block information on Baobab network.

## Prerequisites
 - Preparing executables
   - ken, kend [download](https://docs.klaytn.com/node/download)
 - Minimal requirements for testing hardware
     - CPU: 4-cores (Intel Xeon or equivalent), RAM: 16GB, HDD: 50GB
     - Pleaser refer to [here](https://docs.klaytn.com/node/endpoint-node/system-requirements) for detailed requirements
 - Assumption
     - SCN nodes are ready and set
     - EN connects to baobab testnet
     - Only one SCN node can connect to a single EN
     - Not every SCN have to be connected to an EN

## Step 1: Preparing genesis.json
Connect to the EN node then download the `genesis.json` for `baobab` network. Copy executable binaries also to the EN node.
```
$ curl -X GET http://packages.klaytn.net/baobab/genesis.json -o ~/your_path/genesis.json
```

## Step 2: EN Node Initialization
The directory where chain data and logs are stored can be assigned by using the `--datadir` directive as shown below.

```
$ ~/your_path/bin/ken --datadir ~/your_path/data init ~/your_path/homi-output/scripts/genesis.json
```

## Step 3: Configure the EN Node
```
...
NETWORK="baobab"
...
SC_MAIN_BRIDGE=1
...
DATA_DIR=~/your_path/data
...
```

## Step 4: Start the EN Node
```
$ ~/your_path/bin/kend start
Starting kscnd: OK
```
You can check block generation status by watching klay.blockNumber. If this number is not 0, it is working fine. To download all blocks of Baobab network, it will take about two hours though it can vary because of network condition and hardware performance.
```
$ ~/your_path/bin/ken attach --datadir ~/your_path/data
> klay.blockNumber
21073
```
When you want to stop a node, you can use the command `kend stop`

## Step 5: Check KNI of EN Node
Check EN's KNI which is the information to connect from a SCN node. This value will be used in the next step while generating `main-bridges.json`
```

$ ~/your_path/bin/ken attach --datadir ~/your_path/data
> mainbridge.nodeInfo.kni
"kni://0f7aa6499553cdfeb8f21df10c656252ca6039047242eb86278689a87d57a41f9f004720180d1921e9f7632a4c6476f1775a2c381568d8e8c3c9c4a8cfe25bae@[::]:50505?discport=0"
```

## Step 6: Create main-bridges.json
Connect to a SCN node (Note: not the EN node) and create `main-bridges.json` on `~/your_path/data`. Replace `[::]` located after `@` letter with EN node's IP address.
```
$ echo '["kni://0f7aa6499553cdfeb8f21df10c656252ca6039047242eb86278689a87d57a41f9f004720180d1921e9f7632a4c6476f1775a2c381568d8e8c3c9c4a8cfe25bae@192.168.0.5:50505?discport=0"]' > ~/your_path/data/main-bridges.json
```

## Step 7: Configure SCN then Reboot
Connect to an SCN node's shell and edit `~/your_path/conf/kscnd.conf`.
`SC_TX_PERIOD` is the parameter that decides the period to send an anchoring tx to the main chain. By setting the value to 10, you can configure the node to perform anchoring every 10 blocks. The default value is 1.
```
...
SC_SUB_BRIDGE=1
...
SC_PARENT_CHAIN_ID=1001
...
SC_TX_PERIOD=10
...
```

Reboot the SCN node
```
$ ~/your_path/bin/kscnd stop
Shutting down kscnd: Killed
$ ~/your_path/bin/kscnd start
Starting kscnd: OK
```

Check if the SCN node is connected to the EN by checking `subbridge.peers.length`
```
$ ~/your_path/bin/kscn attach --datadir ~/your_path/data
> subbridge.peers.length
1
```

## Anchoring 
After setup EN and SCN, you can save Service Chain block information on parent chain via Anchoring.
In this section, you will charge parent operator account, enable Anchoring, and check the anchored block number.

## Step 1: Charge KLAY to test anchoring
To do an anchoring, SCN have to make an anchoring transaction at Baobab. So `subbridge.parentOperator` account should have some KLAY. Getting some KLAY from Baobab wallet faucet ([link](https://baobab.wallet.klaytn.com/)) and transfer 1 KLAY to the `subbridge.parentOperator`.
```
$ ~/your_path/bin/kscn attach --datadir ~/your_path/data
> subbridge.parentOperator
"0x3ce216beeafc62d20547376396e89528e1d778ca"
```

## Step 2: Start Anchoring
```
$ ~/your_path/bin/kscn attach --datadir ~/your_path/data
> subbridge.anchoring(true)
true
```
After anchoring is started, you can check the latest block anchored to Baobab by using `subbridge.latestAnchoredBlockNumber`. Please note that this only works after the EN already followed up the latest block of Baobab. Basically, SCN node tries anchoring on every block from the block on which anchoring is turned on. The anchoring period can be set by changing SC_TX_PERIOD. If the value is set to 10, the node tries anchoring when the block number is a multiple of 10.
```
$ ~/your_path/bin/kscn attach --datadir ~/your_path/data
> subbridge.latestAnchoredBlockNumber
100
```
