This section covers how to set up an EN for Baobab network and connect the EN with SCN. You will set up an EN and connect the EN with SCN. Then you will enable the Anchoring feature to write Service Chain block information on Baobab network.

## 준비 사항 <a id="prerequisites"></a>
 - Download executables.
   - ken, kend [download](https://docs.klaytn.com/node/download)
 - Minimum hardware requirements for testing
     - CPU: 4-core (Intel Xeon or equivalent), RAM: 16GB, HDD: 50GB
     - Please refer to the [endpoint node system requirements](https://docs.klaytn.com/node/endpoint-node/system-requirements) for more explanation.
     - Service Chain is installed and running.
 - Assumptions and Limitations
     - EN connects to Baobab testnet.
     - Only one SCN can connect to the EN.
     - Not every SCN has to connect to the EN.

## Step 1: Preparing genesis.json <a id="step-1-preparing-genesis-json"></a>
Connect to the EN server then download the `genesis.json` for `Baobab` network. Copy executable binaries also to the EN server.
```
$ curl -X GET http://packages.klaytn.net/baobab/genesis.json -o ~/your_path/genesis.json
```

## Step 2: EN Node Initialization <a id="step-2-en-node-initialization"></a>
The directory where chain data and logs will be stored can be assigned by using the `--datadir` directive as shown below.

```
$ ~/your_path/bin/ken --datadir ~/your_path/data init ~/your_path/homi-output/scripts/genesis.json
```

## Step 3: Configure the EN Node <a id="step-3-configure-the-en-node"></a>
```
...
NETWORK="baobab"
...
SC_MAIN_BRIDGE=1
...
DATA_DIR=~/your_path/data
...
```

## Step 4: Start the EN Node <a id="step-4-start-the-en-node"></a>
```
$ ~/your_path/bin/kend start
Starting kscnd: OK
```
You can check block sync status by watching `klay.blockNumber`. If this number is not 0, the node is working fine. To download all blocks of the Baobab network, it will take about two hours though it can vary due to network condition and hardware performance.
```
$ ~/your_path/bin/ken attach --datadir ~/your_path/data
> klay.blockNumber
21073
```
If you want to stop a node, you can use the command `kend stop`

## Step 5: Check KNI of EN Node <a id="step-5-check-kni-of-en-node"></a>
Take note of EN's KNI which is the information used to connect from an SCN node. This value will be used in the next step when generating `main-bridges.json`
```

$ ~/your_path/bin/ken attach --datadir ~/your_path/data
> mainbridge.nodeInfo.kni
"kni://0f7aa6499553cdfeb8f21df10c656252ca6039047242eb86278689a87d57a41f9f004720180d1921e9f7632a4c6476f1775a2c381568d8e8c3c9c4a8cfe25bae@[::]:50505?discport=0"
```

## Step 6: Create main-bridges.json <a id="step-6-create-main-bridges-json"></a>
Connect to an SCN (note: not the EN node) and create `main-bridges.json` on `~/your_path/data`. Replace `[::]` located after `@` letter with EN node's IP address.
```
$ echo '["kni://0f7aa6499553cdfeb8f21df10c656252ca6039047242eb86278689a87d57a41f9f004720180d1921e9f7632a4c6476f1775a2c381568d8e8c3c9c4a8cfe25bae@192.168.0.5:50505?discport=0"]' > ~/your_path/data/main-bridges.json
```

## Step 7: Configure SCN then Reboot <a id="step-7-configure-scn-then-reboot"></a>
Connect to an SCN node's shell and edit `~/your_path/conf/kscnd.conf`. `SC_TX_PERIOD` is the parameter that decides the period to send an anchoring tx to the main chain. By setting the value to 10, you configure the node to perform anchoring every 10 blocks. The default value is 1.
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

Check if the SCN is connected to the EN by checking `subbridge.peers.length`
```
$ ~/your_path/bin/kscn attach --datadir ~/your_path/data
> subbridge.peers.length
1
```

## Anchoring  <a id="anchoring"></a>
After finishing the EN and SCN connection, you can log Service Chain block information on the parent chain via Anchoring. In this section, you will top up a parent operator account, enable Anchoring, and check the anchored block number.

### Step 1: Get KLAY to test anchoring <a id="step-1-get-klay-to-test-anchoring"></a>
To do an anchoring, SCN has to make an anchoring transaction to Baobab. So `subbridge.parentOperator` account should have KLAY to pay the transaction fee. Get some KLAY from Baobab wallet faucet ([link](https://baobab.wallet.klaytn.com/)) and transfer 1 KLAY to the `subbridge.parentOperator`.
```
$ ~/your_path/bin/kscn attach --datadir ~/your_path/data
> subbridge.parentOperator
"0x3ce216beeafc62d20547376396e89528e1d778ca"
```

### Step 2: Start Anchoring <a id="step-2-start-anchoring"></a>
```
$ ~/your_path/bin/kscn attach --datadir ~/your_path/data
> subbridge.anchoring(true)
true
```
After anchoring starts, you can check the latest block anchored to Baobab by using `subbridge.latestAnchoredBlockNumber`. Please note that this only works after the EN already followed up on the latest block of Baobab. By default, SCN tries anchoring on every block from the block on which anchoring is turned on. The anchoring period can be set by changing SC_TX_PERIOD. If the value is set to 10, the node tries anchoring when the block number is a multiple of 10.
```
$ ~/your_path/bin/kscn attach --datadir ~/your_path/data
> subbridge.latestAnchoredBlockNumber
100
```
