# 메인체인에 연결하기

이 페이지에서는 단일 노드 서비스체인을 메인체인에 연결할 것입니다.

## EN 구성 - 메인 브리지 활성화

`kend.conf`를 구성하여 메인 브리지를 활성화해야 합니다.

### 환경 설정 파일 업데이트

`kend.conf`은 다음과 같은 메인 브리지 속성을 포함합니다.

| 명칭                     | 설명                                                               |
|:---------------------- |:---------------------------------------------------------------- |
| MAIN_BRIDGE            | 서비스체인 1을 사용할 수 있도록 브리지 서비스를 메인 브리지로 사용                           |
| MAIN_BRIDGE_PORT     | 브리지 수신 포트 예) 기본값: 50505                                          |
| MAIN_BRIDGE_INDEXING | 서비스체인 데이터에 빠르게 액세스하기 위해 서비스체인 트랜잭션의 트랜잭션 해시 저장 사용 예) 활성화를 위해서는 1 |

EN에서 메인 브리지를 활성화하려면 다음을 수행합니다.

* `MAIN_BRIDGE` 정의
* RPC/WS 활성화
* 아래 예제와 같이 RPC를 위한 `mainbridge` API 추가

```text
# Configuration file for the kend

...

# rpc options setting
RPC_ENABLE=1 # if this is set, the following options will be used
RPC_API="klay,mainbridge" # available apis: admin,debug,klay,miner,net,personal,rpc,txpool,web3,mainbridge,subbridge
RPC_PORT=8551
RPC_ADDR="0.0.0.0"
RPC_CORSDOMAIN="*"
RPC_VHOSTS="*"

# ws options setting
WS_ENABLE=1 # if this is set, the following options will be used
WS_API="klay" 
WS_ADDR="0.0.0.0"
WS_PORT=8552
WS_ORIGINS="*"

...

# service chain options setting
MAIN_BRIDGE=1
MAIN_BRIDGE_PORT=50505
MAIN_BRIDGE_INDEXING=1

...
```


### EN 다시 시작하기



## SCN을 메인체인에 연결하기

메인체인의 EN을 메인 브리지로 실행해야 합니다. 또한 서브 브리지로서 어떤 SCN(Service Chain Node)이 EN에 연결되는지 결정해야 합니다.

### EN (메인 브리지) 정보 확인하기

#### EN 콘솔 열기

EN 프로세스를 연결하는 다른 방법이 있습니다. [ken CLI commands](../../../endpoint-node/ken-cli-commands.md)에서 사용 가능한 명령을 확인할 수 있습니다. 이 페이지는 IPC(inter-process communication)를 통해 프로세스에 연결하는 방법을 설명합니다. `klay.ipc` IPC 파일은 EN/SCN의 데이터 디렉토리에 있습니다.

다음 명령을 실행하고 결과를 확인하세요. (RPC를 위해 `mainbridge` API를 추가한 경우, 아래와 같이 브릿지 API를 확인할 수 있습니다. `mainbridge` API가 없는 경우, [EN Configuration - Enable Main-bridge](#en-configuration-enable-main-bridge)를 다시 확인해야 합니다. )

```bash
$ ken attach ~/kend_home/klay.ipc
Welcome to the Klaytn JavaScript console!

instance: Klaytn/vX.X.X/XXXX-XXXX/goX.X.X
at block: 11573551 (Wed, 13 Feb 2019 07:12:52 UTC)
 datadir: ~/kend_home
 modules: admin:1.0 mainbridge:1.0 debug:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0
 >
```

#### EN의 KNI 받기

IPC를 통해 프로세스를 연결한 후, 아래와 같이 EN의 메인 브리지 KNI를 확인할 수 있습니다. [Service Chain API](../../../../bapp/json-rpc/api-references/servicechain.md)를 참조할 수 있습니다.

```javascript
> mainbridge.nodeInfo
{
  kni: "kni://08b99d2297e0a27ddeb33f3a81b59ea1c065b9adbaff9fefab0d16f65b1a8db22939a104c24447e9aca521c158922ca912476b544baf48995a382d88886e0a37@[::]:50505?discport=0",
  id: "08b99d2297e0a27ddeb33f3a81b59ea1c065b9adbaff9fefab0d16f65b1a8db22939a104c24447e9aca521c158922ca912476b544baf48995a382d88886e0a37",
  ip: "::",
  listenAddr: "[::]:50505",
  name: "-2",
  ports: {
    discovery: 0,
    listener: 50505
  },
  protocols: {
    servicechain: {
      config: {
        chainId: 2018,
        deriveShaImpl: 0,
        isBFT: true,
        istanbul: {...},
        unitPrice: 0
      },
      difficulty: 87860,
      genesis: "0x711ce9865492659977abb2758d29f68c2b0c82862d9376f25953579f64f95b58",
      head: "0x0d4b130731f1e7560e4531ac73d55ac8c6daccb178abd86af0d96b7aafded7c5",
      network: 1
    }
  }
}
```

EN의 메인 브리지 `kni` 정보에 유의해야합니다.

### 메인체인에 연결하기

#### SCN 콘솔 열기

EN의 경우와 마찬가지로 SCN 프로세스를 아래와 같이 연결할 수 있습니다. (RPC를 위해 `subbridge` API를 추가한 경우, 아래와 같이 브릿지 API를 확인할 수 있습니다. `subbridge` API가 없는 경우, [Setup Service Chain](https://docs.klaytn.com/node/sc/setup_servicechain#configuration-of-the-initial-file)를 다시 확인해야 합니다. )

```bash
$ kscn attach ~/kscnd_home/klay.ipc
Welcome to the Klaytn JavaScript console!

instance: Klaytn/vX.X.X/XXXX-XXXX/goX.X.X

 datadir: ~/kscnd_home
 modules: admin:1.0 subbridge:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 servicechain:1.0 txpool:1.0
 >
```

#### SCN과 EN 연결하기

아래와 같이 IPC를 통해 SCN에 EN 피어를 추가할 수 있습니다. kni는 앞에서 언급한 EN의 KNI입니다.

```javascript
 > subbridge.addPeer("kni://08b99d2297e0a27ddeb33f3a81b59ea1c065b9adbaff9fefab0d16f65b1a8db22939a104c24447e9aca521c158922ca912476b544baf48995a382d88886e0a37@[::]:50505?discport=0")
 true
```

그 후 아래와 같이 연결된 피어를 확인할 수 있습니다.

```javascript
 > subbridge.peers
 [{
     caps: ["servicechain/1"],
     id: "08b99d2297e0a27ddeb33f3a81b59ea1c065b9adbaff9fefab0d16f65b1a8db22939a104c24447e9aca521c158922ca912476b544baf48995a382d88886e0a37",
     name: "-1",
     networks: [{
         inbound: false,
         localAddress: "[::1]:56834",
         remoteAddress: "[::1]:50505",
         static: true,
         trusted: false
     }],
     protocols: {
       servicechain: {
         head: "0x47be444be87daaee2989998559049ee8a859540807824dd1db4a80ea6cb42293",
         version: 1
       }
     }
 }]
```

## 앵커링 활성화하기

이 장에서는 앵커링 함수를 활성화하는 방법을 보여줍니다. 활성화 된 경우, SCN은 주기적으로 서비스체인 블록 데이터를 메인체인에 앵커링하여 서비스체인의 보안을 확보합니다.

### SCN의 체인 계정 확인하기

SCN을 성공적으로 실행하면 메인체인 계정이 생성되거나 `mainchainbridgekey` 파일에 의해 설정됩니다. 다음과 같이 RPC의 메인체인 계정 주소를 확인할 수 있습니다.

```bash
$ kscn attach ~/kscnd_home/klay.ipc
Welcome to the Klaytn JavaScript console!

instance: Klaytn/vX.X.X/XXXX-XXXX/goX.X.X

 datadir: ~/kscnd_home
 modules: admin:1.0 subbridge:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 servicechain:1.0 txpool:1.0
 > subbridge.mainChainAccount
 "0x726e5C8705892989DAB1E9982FBE0B0A92eC84Bf"
```

_이 메인체인 계정 주소는 $dataDIR/klay directory 디렉토리의 `mainchainbridgekey` 파일에 의해 생성됩니다._

### 체인 주소 충전하기

SCN이 블록 데이터를 앵커링하면 SCN은 체인 계정으로 앵커링 트랜잭션을 수행합니다. 따라서 체인 계정에는 KLAY가 필요합니다. 체인 계정에 충분한 KLAY를 충전해야 합니다.

### 앵커링 활성화하기

KLAY를 충전한 후, 아래와 같이 RPC를 통해 활성화할 수 있습니다. 상세 사항을 위해 [Service Chain API](../../../../bapp/json-rpc/api-references/servicechain.md)를 참조할 수 있습니다.

```javascript
> subbridge.anchoring(true)
true
```

## 앵커링 확인하기

앵커링 기능이 활성화되면 SCN은 블록 데이터를 메인체인에 앵커링합니다. 아래와 같이 앵커링된 데이터를 확인할 수 있습니다.

### 메인 브리지

메인 브리지에서 체인 인덱싱 옵션이 활성화 된 경우, 아래와 같이 서비스체인 블록 해시로 앵커링 tx 해시를 찾을 수 있습니다. 상세 사항을 위해 [Service Chain API](../../../../bapp/json-rpc/api-references/servicechain.md)를 참조할 수 있습니다.

```javascript
> mainbridge.convertServiceChainBlockHashToMainChainTxHash("0xeadc6a3a29a20c13824b5df1ba05cca1ed248d046382a4f2792aac8a6e0d1880")
"0x9a68591c0faa138707a90a7506840c562328aeb7621ac0561467c371b0322d51"
```

### 서브 브리지

서브 브리지에서는 아래와 같이 마지막으로 앵커링된 블록 번호를 확인할 수 있습니다. 상세 사항을 위해 [Service Chain API](../../../../bapp/json-rpc/api-references/servicechain.md)를 참조할 수 있습니다.

```javascript
> subbridge.latestAnchoredBlockNumber
71025
```

