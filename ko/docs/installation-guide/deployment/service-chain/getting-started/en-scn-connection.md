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
   - 오직 일대일 연결만 지원되기 때문에 하나의 EN은 하나의 SCN에 연결될 수 있습니다.
   - 모든 SCN이 EN과 연결되어야 하는 것은 아닙니다.

## 0 단계 : Baobab EN 설치하기 <a id="install-baobab-en"></a>
다운로드한 kscn 패키지를 압축 해제하고, EN 서버에 EN 패키지를 압축 해제합니다.

```bash
EN-01$ tar xvf ken-baobab-vX.X.X-XXXXX-amd64.tar.gz
```

## 1 단계 : genesis.json 준비하기 <a id="step-1-preparing-genesis-json"></a>
EN 서버에서 아래 명령어로 `Baobab` 네트워크를 위한 `genesis.json`을 다운로드하세요.
```
EN-01$ curl -X GET https://packages.klaytn.net/baobab/genesis.json -o ~/genesis.json
```

## 2 단계 : EN 노드 초기화<a id="step-2-en-node-initialization"></a>
다운로드 받은 제네시스 파일을 사용해서 EN을 초기화합니다. 아래의 명령어를 실행하시면, 홈 디렉토리에 체인 데이터와 로그를 저장하는 데이터 폴더를 생성합니다. `--datadir` 지시문을 이용해 데이터 폴더를 변경할 수 있습니다.

```
EN-01$ ken --datadir ~/data init ~/genesis.json
```

## 3 단계 : EN 노드 설정<a id="step-3-configure-the-en-node"></a>
ken 설치 폴더에서 `mv kend_baobab.conf kend.conf` 명령어로 파일명을 변경하고, `conf/kend.conf` 파일을 아래와 같이 수정하세요.

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
EN 노드를 시작하고, 콘솔에서 klay.blockNumber를 조회하면 블록 동기화 상태를 확인할 수 있습니다. 조회 결과가 0이 아니라면 노드가 제대로 작동하는 것입니다. Baobab 네트워크의 모든 블록을 다운로드하는 과정에서 네트워크 조건 및 하드웨어 성능에 따라 시간이 오래 걸릴 수 있으며, [Fast Sync](../../node/endpoint-node/installation-guide/configuration.md)를 사용하여 블록을 동기화하는 것을 권장합니다.
```
EN-01$ ken attach --datadir ~/data
> klay.blockNumber
21073
```
노드를 중지하려면 `kend stop` 명령어를 사용하세요.

## 5 단계 : EN 노드의 KNI 확인<a id="step-5-check-kni-of-en-node"></a>
SCN-L2-01 노드에서 연결하는 데 사용되는 정보인 EN-01의 KNI를 잘 기억해 둡니다.  이 정보는 다음 단계에서 main-bridges.json을 생성할 때 사용됩니다.
```
EN-01$ ken attach --datadir ~/data
> mainbridge.nodeInfo.kni
"kni://0f7aa6499553...25bae@[::]:50505?discport=0"
```

![](../images/sc-en-scn-nodeInfo.png)

## 6 단계 : main-bridges.json 생성<a id="step-6-create-main-bridges-json"></a>
SCN-L2-01(참고: EN-01 아님)에 로그온하고 `~/data`에 `main-bridges.json`을 만듭니다.  `@` 문자 뒤에 있는 `[::]`를 EN-01의 IP 주소로 바꿉니다.
```
SCN-L2-01$ echo '["kni://0f7aa6499553...25bae@192.168.1.1:50505?discport=0"]' > ~/data/main-bridges.json
```

## Step 7: Configure SCN then Restart kscn <a id="step-7-configure-scn-then-restart-kscn"></a>
SCN-L2-01의 콘솔에서 `kscn-XXXXX-amd64/conf/kscnd.conf`를 편집합니다. `SC_SUB_BRIDGE`가 1로 설정되면, SCN-L2-01에서 kscn이 실행될 때 데이터 앵커링이 자동으로 동작합니다.   이 예제에서는 `SC_PARENT_CHAIN_ID`는 부모체인인 Baobab의 `chainID`가 1001이기 때문에 1001로 설정되어 있습니다. `SC_ANCHORING_PERIOD`는 앵커링 tx를 메인체인으로 보낼 주기를 결정하는 파라미터입니다.  값을 10으로 설정하면 10블록마다 앵커링을 수행하도록 노드를 구성합니다.  기본값은 1입니다.
```
...
SC_SUB_BRIDGE=1
...
SC_PARENT_CHAIN_ID=1001
...
SC_ANCHORING_PERIOD=10
...
```

다음 명령어로 kscn을 다시 시작합니다.
```
SCN-L2-01$ kscnd stop
Shutting down kscnd: Killed
SCN-L2-01$ kscnd start
Starting kscnd: OK
```

SCN-L2-01과 EN-01이 연결되었는지를 확인하기 위해서 `subbridge.peers.length`을 조회해 봅니다.
```
SCN-L2-01$ kscn attach --datadir ~/data
> subbridge.peers.length
1
```

## 앵커링<a id="anchoring"></a>
EN-01 및 SCN-L2-01 연결을 완료한 후 앵커링을 통해 상위 체인에 ServiceChain 블록 정보를 기록할 수 있습니다. 이번 예제에서는 부모체인의 운영자 계정을 충전하고 앵커링을 활성화하고 앵커링된 블록 번호를 확인합니다.

### 1 단계 : 앵커링 테스트를 위한 KLAY 얻기 <a id="step-1-get-klay-to-test-anchoring"></a>
앵커링을 사용하려면 SCN-L2-01이 Baobab에 대한 앵커링 트랜잭션을 전송해야 합니다.  따라서 `subbridge.parentOperator` 계정에는 거래 수수료를 지불하기에 충분한 KLAY가 있어야 합니다.  [Baobab Wallet Faucet](https://baobab.wallet.klaytn.foundation/)에서 일부 KLAY를 가져오고 일부 KLAY를 `parentOperator`로 전송합니다. 실제 서비스 환경에서 데이터 앵커링을 하려면 `parentOperator`에 거래 수수료에 대한 충분한 KLAY가 있어야 합니다.

```
SCN-L2-01$ kscn attach --datadir ~/data
> subbridge.parentOperator
"0x3ce216beeafc62d20547376396e89528e1d778ca"
```
![](../images/sc-en-scn-faucet.png)

### 2 단계 : 앵커링 시작 <a id="step-2-start-anchoring"></a>
엥커링을 시작하기 위해서는 다음의 명령어를 수행합니다.
```
SCN-L2-01$ kscn attach --datadir ~/data
> subbridge.anchoring(true)
true
```
앵커링이 시작된 후 `subbridge.latestAnchoredBlockNumber`를 사용하여 Baobab에 가장 최근에 앵커된 블록을 확인할 수 있습니다.  최근 앵커링된 블록을 확인하기 위해서는 EN이 Baobab 네트워크의 최신 블록으로 동기화된 이후에만 가능하다는 점에 유의하십시오.  기본적으로 SCN-L2-01은 앵커링이 활성화된 이후부터 모든 블록에 대해서 앵커링을 시도합니다. 앵커링 주기는 `SC_ANCHORING_PERIOD`를 변경하여 설정할 수 있습니다.  예를 들면 값이 10으로 설정되면 블록 번호가 10의 배수일 때마다 앵커링을 시도합니다.
```
SCN-L2-01$ kscn attach --datadir ~/data
> subbridge.latestAnchoredBlockNumber
100
```
![](../images/sc-en-scn-anchoring.png)
