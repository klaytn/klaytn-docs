이 장에서는 4개 노드 서비스체인을 Baobab 네트워크에 연결하는 방법을 설명합니다. Baobab EN을 구축하고 여러분의 SCN 중 하나와 연결할 것입니다. 그리고 나서 서비스체인의 블록 정보를 Baobab 네트워크에 저장하는 앵커링 기능을 사용해 볼 것입니다.

![](../images/sc-en-scn-arch.png)

## 준비 사항 <a id="prerequisites"></a>
 - EN용 Linux 또는 MacOS 서버 1대
 - 테스트를 위한 최소 하드웨어 요구 사항
   - CPU: 4코어(Intel Xeon 또는 동급), RAM: 16GB, HDD: 50GB
   - 자세한 설명은 [시스템 요구사항](../references/system-requirements.md)을 참조하세요.
 - Baobab EN 실행파일을 다운로드하세요. 다운로드할 수 있는 바이너리의 전체 목록을 보려면 [Download](../../download/README.md)을 참고하세요.
 - 가정 및 제약
   - 서비스 체인이 설치되어 실행 중입니다. 네트워크를 설치하기 위해서는 [4개 노드 서비스 체인 설치하기](4nodes-setup-guide.md)를 참고해주세요.
   - Baobab EN.
   - 오직 1대1 연결만 지원되기 때문에 하나의 EN은 하나의 SCN에 연결될 수 있습니다.
   - 모든 SCN이 EN과 연결되어야 하는 것은 아닙니다.

## 0 단계 : Baobab EN 설치하기 <a id="install-baobab-en"></a>
다운로드한 kscn 패키지를 압축 해제하고, 각 서버에 SCN 아카이브를 추출합니다.

```bash
EN-01$ tar xvf ken-baobab-vX.X.X-XXXXX-amd64.tar.gz
```

## 1 단계 : genesis.json 준비하기 <a id="step-1-preparing-genesis-json"></a>
EN 서버에서 아래 명령어로 `Baobab` 네트워크를 위한 `genesis.json`을 다운로드하세요.
```
EN-01$ curl -X GET https://packages.klaytn.net/baobab/genesis.json -o ~/genesis.json
```

## 2 단계 : EN 노드 초기화<a id="step-2-en-node-initialization"></a>
이제 제네시스 파일을 사용해서 각 노드를 초기화해보겠습니다. 아래의 명령어를 실행하세요. 여러분의 홈 디렉토리에 체인 데이터와 로그를 저장하는 데이터 폴더를 생성할 것입니다. `--datadir` 지시문을 이용해 데이터 폴더를 변경할 수 있습니다.

```
EN-01$ ken --datadir ~/data init ~/genesis.json
```

## 3 단계 : EN 노드 설정<a id="step-3-configure-the-en-node"></a>
ken 설치 폴더에서 `mv kend_baobab.conf kend.conf`의 이름을 변경한 뒤 아래와 같이 `conf/kend.conf`를 수정하세요.

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
EN-01$ kend start
Starting kscnd: OK
```
You can check block sync status by watching `klay.blockNumber`. If this number is not 0, the node is working fine. Downloading all blocks on the Baobab network may take a long time depending on network conditions and hardware performance, so we recommend using [Fast Sync](../../node/endpoint-node/installation-guide/configuration.md) to synchronize blocks.
```
EN-01$ ken attach --datadir ~/data
> klay.blockNumber
21073
```
If you want to stop a node, you can use the command `kend stop`

## 5 단계 : EN 노드의 KNI 확인<a id="step-5-check-kni-of-en-node"></a>
Take note of EN-01's KNI which is the information used to connect from an SCN-L2-01 node. This value will be used in the next step when generating `main-bridges.json`.
```
EN-01$ ken attach --datadir ~/data
> mainbridge.nodeInfo.kni
"kni://0f7aa6499553...25bae@[::]:50505?discport=0"
```

![](../images/sc-en-scn-nodeInfo.png)

## 6 단계 : main-bridges.json 생성<a id="step-6-create-main-bridges-json"></a>
Log on to an SCN-L2-01 (note: not the EN-01 node) and create `main-bridges.json` on `~/data`. Replace `[::]` located after `@` letter with EN-01 node's IP address.
```
SCN-L2-01$ echo '["kni://0f7aa6499553...25bae@192.168.1.1:50505?discport=0"]' > ~/data/main-bridges.json
```

## Step 7: Configure SCN then Restart kscn <a id="step-7-configure-scn-then-restart-kscn"></a>
From the SCN-L2-01 node's shell, edit `kscn-XXXXX-amd64/conf/kscnd.conf`. If `SC_SUB_BRIDGE` is set to 1, data anchoring starts automatically when the SCN-L2-01 node starts. In this example, `SC_PARENT_CHAIN_ID` is set to 1001 because the `chainID` of the parent chain, Baobab, is 1001. `SC_ANCHORING_PERIOD` is the parameter that decides the period to send an anchoring tx to the main chain. By setting the value to 10, you configure the node to perform anchoring every 10 blocks. The default value is 1.
```
...
SC_SUB_BRIDGE=1
...
SC_PARENT_CHAIN_ID=1001
...
SC_ANCHORING_PERIOD=10
...
```

Restart kscn by executing the following command:
```
SCN-L2-01$ kscnd stop
Shutting down kscnd: Killed
SCN-L2-01$ kscnd start
Starting kscnd: OK
```

Check if the SCN-L2-01 is connected to the EN-01 by checking `subbridge.peers.length`
```
SCN-L2-01$ kscn attach --datadir ~/data
> subbridge.peers.length
1
```

## 앵커링<a id="anchoring"></a>
After finishing the EN-01 and SCN-L2-01 connection, you can log ServiceChain block information on the parent chain via Anchoring. In this section, you will top up a parent operator account, enable Anchoring, and check the anchored block number.

### 1 단계 : 앵커링 테스트를 위한 KLAY 얻기 <a id="step-1-get-klay-to-test-anchoring"></a>
Anchoring requires SCN-L2-01 to make an anchoring transaction to Baobab. So `subbridge.parentOperator` account should have enough KLAY to pay the transaction fee. Get some KLAY from [Baobab Wallet Faucet](https://baobab.wallet.klaytn.foundation/) and transfer some KLAY to the `parentOperator`. For data anchoring in real service, `parentOperator` needs to have enough KLAY for transaction fee.

```
SCN-L2-01$ kscn attach --datadir ~/data
> subbridge.parentOperator
"0x3ce216beeafc62d20547376396e89528e1d778ca"
```
![](../images/sc-en-scn-faucet.png)

### 2 단계 : 앵커링 시작 <a id="step-2-start-anchoring"></a>
To start anchoring, execute the following command:
```
SCN-L2-01$ kscn attach --datadir ~/data
> subbridge.anchoring(true)
true
```
After anchoring starts, you can check the latest block anchored to Baobab by using `subbridge.latestAnchoredBlockNumber`. Please note that this only works after the EN already followed up on the latest block of Baobab. By default, SCN-L2-01 tries anchoring on every block from the block on which anchoring is turned on. The anchoring period can be set by changing `SC_ANCHORING_PERIOD`. If the value is set to 10, the node tries anchoring when the block number is a multiple of 10.
```
SCN-L2-01$ kscn attach --datadir ~/data
> subbridge.latestAnchoredBlockNumber
100
```
![](../images/sc-en-scn-anchoring.png)
