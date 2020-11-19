이 장에서는 4-노드 서비스체인을 Baobab 네트워크에 연결하는 방법을 설명합니다. Baobab EN을 설정하고 EN을 SCN 중 하나와 연결할 것입니다. 그 후 앵커링 기능을 사용하여 서비스체인 블록 정보를 Baobab 네트워크에 기록할 것입니다.

## 준비 사항 <a id="prerequisites"></a>
 - 아래 Baobab EN 실행 파일을 다운로드하세요. 다운로드 가능한 전체 목록은 [다운로드](../../download/README.md) 페이지를 참조하세요.
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
설치는 다운로드 한 패키지의 압축을 해제하기만 하면 됩니다. 서버에서 EN 아카이브를 압축 해제하세요.

```bash
$ tar xvf ken-baobab-vX.X.X-XXXXX-amd64.tar.gz
```

## 1 단계 : genesis.json 준비하기 <a id="step-1-preparing-genesis-json"></a>
EN 서버에서 아래 명령어로 `Baobab` 네트워크를 위한 `genesis.json`을 다운로드하세요.
```
$ curl -X GET https://packages.klaytn.net/baobab/genesis.json -o ~/genesis.json
```

## 2 단계 : EN 노드 초기화<a id="step-2-en-node-initialization"></a>
이제, genesis 파일을 사용하여 EN 노드를 초기화합니다. 노드에서 다음 명령을 실행하세요. 이 명령어는 체인 데이터와 로그를 저장하는 데이터 폴더를 홈 디렉토리에 생성합니다. `-datadir` 지시어로 데이터 폴더 위치를 변경할 수 있습니다.

```
$ ken --datadir ~/data init ~/genesis.json
```

## 3 단계 : EN 노드 설정<a id="step-3-configure-the-en-node"></a>
ken 설치 폴더로 이동하여 `conf/kend.conf`를 다음과 같이 편집하세요.

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
`klay.blockNumber`로 블록 동기화 상태를 확인할 수 있습니다. 이 숫자가 0이 아니면 노드가 제대로 동작하는 것입니다. Baobab 네트워크의 모든 블록을 다운로드하려면 네트워크 상태 및 하드웨어 성능에 따라 다를 수 있지만 약 2시간이 걸립니다.
```
$ ken attach --datadir ~/data
> klay.blockNumber
21073
```
노드를 중지하려면 `kend stop` 명령어를 사용하세요.

## 5 단계 : EN 노드의 KNI 확인<a id="step-5-check-kni-of-en-node"></a>
SCN 노드에서 연결하기 위해 필요한 정보인 EN의 KNI를 기록해 두세요. 이 값은 다음 단계에서 `main-bridges.json`을 생성할 때 사용합니다.
```

$ ken attach --datadir ~/data
> mainbridge.nodeInfo.kni
"kni://0f7aa6499553cdfeb8f21df10c656252ca6039047242eb86278689a87d57a41f9f004720180d1921e9f7632a4c6476f1775a2c381568d8e8c3c9c4a8cfe25bae@[::]:50505?discport=0"
```

## 6 단계 : main-bridges.json 생성<a id="step-6-create-main-bridges-json"></a>
SCN에 로긴하여 (주의: EN이 아닙니다) `~/data` 폴더 아래에 `main-bridges.json`을 생성하세요. `@` 뒤에 위치한 `[::]`를 EN 노드의 IP 주소로 변경하세요.
```
$ echo '["kni://0f7aa6499553cdfeb8f21df10c656252ca6039047242eb86278689a87d57a41f9f004720180d1921e9f7632a4c6476f1775a2c381568d8e8c3c9c4a8cfe25bae@192.168.0.5:50505?discport=0"]' > ~/data/main-bridges.json
```

## 7 단계 : SCN 설정 후 재부팅<a id="step-7-configure-scn-then-reboot"></a>
SCN 노드의 쉘에서 `kscn-XXXXX-amd64/conf/kscnd.conf`를 편집하세요. `SC_TX_PERIOD`는 앵커링 트랜잭션을 메인 체인에 보내는 주기를 결정하는 파라메터입니다. 값을 10으로 지정하여 10개의 블록마다 앵커링을 수행하도록 노드를 설정합니다. 기본값은 1입니다.
```
...
SC_SUB_BRIDGE=1
...
SC_PARENT_CHAIN_ID=1001
...
SC_TX_PERIOD=10
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
EN과 SCN 연결이 완료되면 앵커링을 통해 부모 체인에 서비스체인 블록 정보를 기록할 수 있습니다. 이 장에서는 부모 오퍼레이터 계정의 잔고를 채우고, 앵커링을 활성화한 다음, 앵커링된 블록 번호를 확인해 볼 것입니다.

### 1 단계 : 앵커링 테스트를 위한 KLAY 얻기 <a id="step-1-get-klay-to-test-anchoring"></a>
앵커링을 하려면 SCN은 앵커링 트랜잭션을 바오밥에 생성해야 합니다. 따라서 `subbridge.parentOperator` 계정은 트랜잭션 수수료 납부를 위해 KLAY를 가지고 있어야 합니다. [Baobab Wallet Faucet](https://baobab.wallet.klaytn.com/)에서 KLAY를 받은 후 1 KLAY를 `subbridge.parentOperator`로 전송하세요.
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
앵커링이 시작된 후 `subbridge.latestAnchoredBlockNumber`를 사용하여 마지막으로 Baobab에 앵커링된 블록을 확인할 수 있습니다. 이는 EN이 최신 Baobab 블록까지 다운로드 한 후에만 작동한다는 것을 기억하세요. 기본적으로, SCN은 앵커링을 활성화한 블록부터 시작해 모든 블록에서 앵커링을 시도합니다. 앵커링 주기는  SC_TX_PERIOD를 변경하여 설정할 수 있습니다. 값이 10으로 설정되면 블록 번호가 10의 배수일때 노드가 앵커링을 시도합니다.
```
$ kscn attach --datadir ~/data
> subbridge.latestAnchoredBlockNumber
100
```
