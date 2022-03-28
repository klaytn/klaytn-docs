This section covers how to connect your 4-node service chain to the Baobab network. You will set up a Baobab EN and connect the EN with one of your SCNs. Then you will enable the Anchoring feature to write service chain block information on Baobab network.

## 준비 사항 <a id="prerequisites"></a>
 - Download the Baobab EN executable below. For the full list of downloadables, see [Download](../../download/README.md).
   - Linux
      - [ken-baobab-v1.5.0-0-linux-amd64.tar.gz](http://packages.klaytn.net/klaytn/v1.5.0/ken-baobab-v1.5.0-0-linux-amd64.tar.gz)
   - MacOS
      - [ken-baobab-v1.5.0-0-darwin-10.10-amd64.tar.gz](http://packages.klaytn.net/klaytn/v1.5.0/ken-baobab-v1.5.0-0-darwin-10.10-amd64.tar.gz)
 - EN용 Linux 또는 MacOS 서버 1대
 - 테스트를 위한 최소 하드웨어 요구 사항
   - CPU: 4코어(Intel Xeon 또는 동급), RAM: 16GB, HDD: 50GB
   - 자세한 설명은 [시스템 요구사항](../references/system-requirements.md)을 참조하세요.
   - 서비스체인은 설치되어 실행 중입니다.
 - 가정 및 제약
   - EN은 Baobab 테스트넷에 연결됩니다.
   - 하나의 SCN만 EN에 연결할 수 있습니다.
   - 모든 SCN이 EN에 연결될 필요는 없습니다.

## 0 단계 : Baobab EN 설치하기 <a id="install-baobab-en"></a>
다운로드한 패키지를 압축 해제해 설치합니다. Extract the archive on the EN server.

```bash
$ tar xvf ken-baobab-vX.X.X-XXXXX-amd64.tar.gz
```

## 1 단계 : genesis.json 준비하기 <a id="step-1-preparing-genesis-json"></a>
EN 서버에서 아래 명령어로 `Baobab` 네트워크를 위한 `genesis.json`을 다운로드하세요.
```
$ curl -X GET https://packages.klaytn.net/baobab/genesis.json -o ~/genesis.json
```

## 2 단계 : EN 노드 초기화<a id="step-2-en-node-initialization"></a>
Now, we will initialize the EN node using the genesis file. Execute the following command. It will create the data folder storing the chain data and logs on your home directory. You can change the data folder using the `--datadir` directive.

```
$ ken --datadir ~/data init ~/genesis.json
```

## 3 단계 : EN 노드 설정<a id="step-3-configure-the-en-node"></a>
Go to the ken installation folder and rename `mv kend_baobab.conf kend.conf`, then edit `conf/kend.conf` as follows.

```
...
NETWORK="baobab"
...
SC_MAIN_BRIDGE=1
...
DATA_DIR=~/data
...
```

## 4 단계 : EN 노드 시작<a id="step-4-start-the-en-node"></a>
```
$ kend start
Starting kscnd: OK
```
You can check block sync status by watching `klay.blockNumber`. If this number is not 0, the node is working fine. To download all blocks of the Baobab network, it will take about 1 to 2 days though it can vary due to network condition and hardware performance.
```
$ ken attach --datadir ~/data
> klay.blockNumber
21073
```
노드를 중지하려면 `kend stop` 명령어를 사용하세요.

## 5 단계 : EN 노드의 KNI 확인<a id="step-5-check-kni-of-en-node"></a>
Take note of EN's KNI which is the information used to connect from an SCN node. This value will be used in the next step when generating `main-bridges.json`
```

$ ken attach --datadir ~/data
> mainbridge.nodeInfo.kni
"kni://0f7aa6499553cdfeb8f21df10c656252ca6039047242eb86278689a87d57a41f9f004720180d1921e9f7632a4c6476f1775a2c381568d8e8c3c9c4a8cfe25bae@[::]:50505?discport=0"
```

## 6 단계 : main-bridges.json 생성<a id="step-6-create-main-bridges-json"></a>
Log on to an SCN (note: not the EN node) and create `main-bridges.json` on `~/data`. Replace `[::]` located after `@` letter with EN node's IP address.
```
$ echo '["kni://0f7aa6499553cdfeb8f21df10c656252ca6039047242eb86278689a87d57a41f9f004720180d1921e9f7632a4c6476f1775a2c381568d8e8c3c9c4a8cfe25bae@192.168.0.5:50505?discport=0"]' > ~/data/main-bridges.json
```

## 7 단계 : SCN 설정 후 재부팅<a id="step-7-configure-scn-then-reboot"></a>
From the SCN node's shell, edit `kscn-XXXXX-amd64/conf/kscnd.conf`. `SC_ANCHORING_PERIOD` is the parameter that decides the period to send an anchoring tx to the main chain. By setting the value to 10, you configure the node to perform anchoring every 10 blocks. The default value is 1.
```
...
SC_SUB_BRIDGE=1
...
SC_PARENT_CHAIN_ID=1001
...
SC_ANCHORING_PERIOD=10
...
```

SCN 노드 재부팅
```
$ kscnd stop
Shutting down kscnd: Killed
$ kscnd start
Starting kscnd: OK
```

`subbridge.peers.length`를 검사하여 SCN이 EN에 연결되어 있는지 확인하세요.
```
$ kscn attach --datadir ~/data
> subbridge.peers.length
1
```

## 앵커링<a id="anchoring"></a>
After finishing the EN and SCN connection, you can log Service Chain block information on the parent chain via Anchoring. In this section, you will top up a parent operator account, enable Anchoring, and check the anchored block number.

### 1 단계 : 앵커링 테스트를 위한 KLAY 얻기 <a id="step-1-get-klay-to-test-anchoring"></a>
To do an anchoring, SCN has to make an anchoring transaction to Baobab. So `subbridge.parentOperator` account should have KLAY to pay the transaction fee. Get some KLAY from [Baobab Wallet Faucet](https://baobab.wallet.klaytn.com/) and transfer 1 KLAY to the `subbridge.parentOperator`.
```
$ kscn attach --datadir ~/data
> subbridge.parentOperator
"0x3ce216beeafc62d20547376396e89528e1d778ca"
```

### 2 단계 : 앵커링 시작 <a id="step-2-start-anchoring"></a>
```
$ kscn attach --datadir ~/data
> subbridge.anchoring(true)
true
```
After anchoring starts, you can check the latest block anchored to Baobab by using `subbridge.latestAnchoredBlockNumber`. Please note that this only works after the EN already followed up on the latest block of Baobab. By default, SCN tries anchoring on every block from the block on which anchoring is turned on. The anchoring period can be set by changing SC_ANCHORING_PERIOD. If the value is set to 10, the node tries anchoring when the block number is a multiple of 10.
```
$ kscn attach --datadir ~/data
> subbridge.latestAnchoredBlockNumber
100
```
