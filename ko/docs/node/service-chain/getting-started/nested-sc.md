이번 장에서는 이전에서 구축한 ServiceChain 네트워크의 하위 계층으로 새로운 ServiceChain 네트워크를 추가하여  ServiceChain 네트워크를 계층적 구조로 구축하는 방법을 설명합니다.  추가할 ServiceChain 네트워크는 4개의 SCN으로 구성됩니다.  이전 장에서 구축한 ServiceChain 네트워크를 L2로 정의하고, 새롭게 구축할 ServiceChain 네트워크를 L3로 정의합니다.  L2와 L3 사이에 브릿지를 연결하여 계층 구조를 만들 것입니다.  이번 장에서 구성할 ServiceChain 네트워크의 전체 구조는 아래 그림과 같습니다.

![](../images/sc-nestedsc-arch.png)


## 준비 사항 <a id="prerequisites"></a>
 - [Connecting to Baobab](./nested-sc.md)에 설명된 ServiceChain 및 Baobab EN으로 구성했다고 가정합니다.  따라서 이전 섹션에서 설명한 내용은 간략하게 설명합니다.
 - 가정 및 제약
   - 하나의 EN은 ServiceChain L2의 SCN 중 하나에 일대일로만 연결될 수 있습니다.  같은 방식으로, ServiceChain의 L2에 있는 하나의 SCN은 L3에 있는 SCN 중 하나에 일대일로 연결됩니다.
   - SCN 노드는 메인 브릿지와 서브 브릿지를 동시에 가질 수 있습니다.  단, 메인 브릿지와 서브 브릿지의 포트 번호는 다르게 설정해야 합니다.  (예: 메인 브릿지 포트: 50505, 서브 브릿지 포트: 50506)
   - L2의 모든 SCN이 EN으로 브릿지가 될 필요가 없으며, 마찬가지로 L3의 SCN이 모두 L2로 연결될 필요도 없습니다.  그러나 고가용성을 위해 체인 간에 두 개 이상의 메인 브릿지 및 서브 브릿지 쌍이 있는 것이 좋습니다.  이 장에서는 L2와 L3 사이에 한 쌍만 연결을 설명하며, 만약 L2와 L3 사이의 고가용성을 보장하려면 Baobab과 L2 사이의 HA와 동일한 방식으로 구성하면 합니다.

## 1 단계 : L3를 위한 Homi 생성 및 업데이트<a id="step-1-create-and-update-homi"></a>
L3 빌드를 위한 스크립트와 구성 파일을 생성하기 위해, ServiceChain L2를 구성할 때와 마찬가지로 homi 명령을 실행합니다.  모든 Linux/Mac PC에서 `homi`를 실행할 수 있습니다.  이전 예에서 Baobab의 `chainID`는 `1001`, L2의 `chainID`는 `1002`로 설정하였으므로 편의상 L3의 `chainID`를 `1003`으로 설정합니다.  실제 블록체인 서비스를 운용할 때는 다른 ServiceChains 체인 또는 EVM 체인과의 `chainID` 충돌을 방지하기 위해서 https://chainlist.defillama.com/에 새로운 `chainID` 값을 등록하신 후에 운용하시기를 권고합니다.


```console
$ ./homi setup local --cn-num 4 --test-num 1 --servicechain --chainID 1003 --p2p-port 22323 -o homi-output
Created :  homi-output/keys/passwd1
Created :  homi-output/keys/passwd2
Created :  homi-output/keys/passwd3
Created :  homi-output/keys/passwd4
Created :  homi-output/scripts/genesis.json
Created :  homi-output/keys/nodekey1
Created :  homi-output/keys/validator1
Created :  homi-output/keys/nodekey2
Created :  homi-output/keys/validator2
Created :  homi-output/keys/nodekey3
Created :  homi-output/keys/validator3
Created :  homi-output/keys/nodekey4
Created :  homi-output/keys/validator4
Created :  homi-output/scripts/static-nodes.json
Created :  homi-output/keys_test/testkey1
Created :  homi-output/keys_test/keystore1/0xdC7218621513f71d609653d22C39d79d558d9CDC
Created :  homi-output/Klaytn.json
Created :  homi-output/Klaytn_txpool.json
```

![](../images/sc-nestedsc-ip.png)

`homi-output/scripts/static-nodes.json`에서 ServiceChain L3 노드의 IP 주소 및 포트 정보를 업데이트합니다.


```json
[
     "kni://358235ccbf97a1f...787f7@192.168.0.21:22323?discport=0&type=cn",
     "kni://14ac4e3d53de5c7...6c91d@192.168.0.22:22323?discport=0&type=cn",
     "kni://5f36a456d93da09...8e216@192.168.0.23:22323?discport=0&type=cn",
     "kni://d62fd0928b9b6e5...6badf@192.168.0.24:22323?discport=0&type=cn"
]
```

ServiceChain L3의 모든 노드(SCN-L3-01, SCN-L3-02, SCN-L3-03, SCN-L3-04)에 homi의 실행 결과물을 복사합니다.

```console
$ scp -r path/to/homi-output user@192.168.0.21:~/ 
$ scp -r path/to/homi-output user@192.168.0.22:~/ 
$ scp -r path/to/homi-output user@192.168.0.23:~/ 
$ scp -r path/to/homi-output user@192.168.0.24:~/ 
```

모든 노드들을 초기화 시킵니다.

```console
$ kscn --datadir ~/data init ~/homi-output/scripts/genesis.json
$ ls ~/data
keystore    klay        kscn
```

모든 노드들(SCN-L3-01, SCN-L3-02, SCN-L3-03 및 SCN-L3-04)에 `static-nodes.json`을 데이터 폴더 `~/data`에 복사하고 `nodekey`를 하나씩 복사합니다.

```console
$ cp   ~/homi-output/scripts/static-nodes.json   ~/data/
$ cp   ~/homi-output/keys/nodekey{1..4}   ~/data/klay/nodekey
```


## 2 단계 : L3의 SCN 설정<a id="step-2-scn-configuration"></a>


ServiceChain L3의 모든 노드들의 `conf/kscnd.conf` 파일을 아래와 같이 편집합니다. `PORT`는 ServiceChain의 기본 포트인 22323을 사용합니다.  `DATA_DIR` 은 `~/data`로 설정합니다.

```
...
PORT=22323
...
DATA_DIR=~/data
...
```

L3의 모든 노드에서 ServiceChain을 실행하고 정상적으로 동작하는지 확인합니다.


```console
$ kscnd start
Starting kscnd: OK
$ kscn attach --datadir ~/data
> klay.blockNumber
10
```

## 3 단계 : L2 메인 브릿지 설정 후 재시작<a id="step-3-restart-after-setting-L2-main-bridge"></a>

ServiceChain L2에서 메인 브릿지 역할을 할 SCN-L2-03 노드의 콘솔에 접속합니다. (주의: L3가 아니라 L2임)

![](../images/sc-nestedsc-id.png)

SCN-L2-03의 kscn 설정 파일 `conf/kscnd.conf`를 다음과 같이 편집합니다.

```console
SC_MAIN_BRIDGE=1
```

SCN-L2-03에서 kscnd를 다시 시작합니다.

```console
SCN-L2-03$ kscnd stop
SCN-L2-03$ kscnd start
```

## 4 단계 : 메인 브릿지 노드의 KNI 확인<a id="step-4-check-kni-of-main-bridge-node"></a>

SCN-L2-03 노드의 KNI 정보를 확인합니다.  이 값은 ServiceChain L3에서 서브 브릿지를 설치할 SCN-L3-01 노드의 `main-bridges.json` 파일을 생성하는 데 사용됩니다.

![](../images/sc-nestedsc-nodeinfo.png)


```console
SCN-L2-03$ kscn   attach   --datadir   ~/data
> mainbridge.nodeInfo.kni
"kni://87989a5a5dcc165...85b16b@[::]:50505?discport=0"
```



## 5단계 : L3 서브브릿지 설정<a id="step-5-configure-l3-sub-bridge"></a>

ServiceChain L3의 서브 브릿지가 있는 SCN-L3-01 노드에 접속합니다. (주의: L2 아님)  `~/data` 폴더 아래에 `main-bridges.json`을 생성합니다.  @ 뒤의 \[::\]를 4단계에서 확인했던 노드의 IP 주소로 바꿉니다.

```console
SCN-L3-01$ echo '["kni://87989a5a5dcc165...85b16b@192.168.0.13:50505?discport=0"]' > ~/data/main-bridges.json
```

서브브리지가 있는 SCN-L3-01 노드의 구성 파일 `conf/kscnd.conf`를 아래와 같이 편집합니다.  브릿지 연결을 활성화하려면 `SC_SUB_BRIDGE`를 1로 설정하고 `SC_PARENT_CHAIN_ID`는 L2의 `chainID`인 1002로 설정합니다. 데이터 엥커링을 위해 `SC_ANCHORING`을 1로 설정하면 재시작하면서 데이터 앵커링이 동작합니다.  SCN-L3-01 쉘에 접속하여 `subbridge.anchoring(true)` 명령으로 데이터 앵커링을 켜고, `subbridge.anchoring(false)` 명령으로 끌 수도 있습니다.  `SC_ANCHORING_PERIOD`는 앵커링 트랜잭션이 상위 체인으로 전송되는 주기를 결정하는 매개변수입니다.  이번 예제에서는 10으로 지정하여 10블록마다 데이터 앵커링을 수행합니다.  기본값은 1입니다.

```console
SC_SUB_BRIDGE=1
…
SC_PARENT_CHAIN_ID=1002
…
SC_ANCHORING=1
SC_ANCHORING_PERIOD=10
```

설정이 완료된 이후에 SCN-L3-01 노드의 kscnd 을 재시작합니다.

```console
SCN-L3-01$ kscnd stop
Shutting down kscnd: Killed
SCN-L3-01$ kscnd start
Starting kscnd: OK
```

`subbridge.peers.length`를 조회하여 SCN-L3-01이 SCN-L2-03에 연결되었는지 확인하고, `subbridge.latestAnchoredBlockNumber`를 죄회하여 가장 최근에 앵커링된 블록 번호로 앵커링이 진행 중인지 확인합니다.

```console
SCN-L3-01$ kscn attach --datadir ~/data
> subbridge.peers.length
1
> subbridge.latestAnchoredBlockNumber
5010
```
