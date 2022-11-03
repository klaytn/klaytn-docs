# 브리지 설정

이 페이지는 서비스체인을 메인체인에 연결하는 방법에 대해 설명합니다.

## EN 설정 - 메인 브리지 활성화 <a id="en-configuration-enable-main-bridge"></a>

`kend.conf`를 설정하여 메인 브리지를 활성화해야 합니다.

### 환경설정 파일 업데이트 <a id="update-the-configuration-file"></a>

`kend.conf`은 다음과 같은 메인 브리지 속성을 포함합니다.

| 이름                     | 설명                                                                     |
|:---------------------- |:---------------------------------------------------------------------- |
| MAIN_BRIDGE            | 서비스체인을 위한 메인 브리지로 브리지 서비스를 활성화합니다. 활성화하려면 1로 설정하세요.                    |
| MAIN_BRIDGE_PORT     | 브리지 수신 포트. 기본값 : 50505                                                 |
| MAIN_BRIDGE_INDEXING | 서비스체인 데이터에 빠르게 액세스할 수 있도록 서비스 체인 트랜잭션 해시 인덱싱을 활성화합니다. 활성화하려면 1로 설정하세요. |

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

## SCN을 메인체인에 연결하기<a id="connect-scn-to-the-main-chain"></a>

메인체인의 EN을 메인 브리지로 실행해야 합니다. 또한 어떤 SCN(Service Chain Consensus Node)을 서브 브리지로 EN에 연결할지 결정해야 합니다.

### EN(메인 브리지) 정보 확인하기<a id="check-en-(main-bridge)-information"></a>

#### EN 콘솔 열기<a id="open-en-console"></a>

EN 프로세스를 연결하는 다른 방법이 있습니다. [ken CLI commands](../../endpoint-node/ken-cli-commands.md)에서 사용 가능한 명령을 확인할 수 있습니다. 이 페이지는 IPC(inter-process communication)를 통해 프로세스에 연결하는 방법을 설명합니다. `klay.ipc` IPC 파일은 EN/SCN의 데이터 디렉토리에 있습니다.

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

#### EN의 KNI 확인하기 <a id="get-the-ens-kni"></a>

IPC를 통해 프로세스를 연결한 후, 아래와 같이 EN의 메인 브리지 KNI를 확인할 수 있습니다. [Service Chain API](../../../bapp/json-rpc/api-references/servicechain.md)를 참조할 수 있습니다.

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

메인 브리지의 `kni`를 기억하세요.

### 메인체인에 연결하기<a id="connect-to-the-main-chain"></a>

#### SCN 콘솔 열기<a id="open-scn-console"></a>

아래와 같이 SCN 프로세스에 연결하세요. `subbridge` RPC API가 활성화되어 있어야 하며, 출력에서 subbridge 모듈을 확인할 수 있습니다. `subbridge` API가 없는 경우, [Configuration of the SCN](scn/configuration.md#configuration-of-the-scn)를 다시 확인해야 합니다.

```bash
$ kscn attach ~/kscnd_home/klay.ipc
Welcome to the Klaytn JavaScript console!

instance: Klaytn/vX.X.X/XXXX-XXXX/goX.X.X

 datadir: ~/kscnd_home
 modules: admin:1.0 subbridge:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 servicechain:1.0 txpool:1.0
 >
```

#### SCN과 EN 연결하기<a id="connect-scn-with-en"></a>

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
