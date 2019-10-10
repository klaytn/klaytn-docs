# 메인체인에 연결하기

이 페이지에서는 단일 노드 서비스체인을 메인체인에 연결할 것입니다.

## EN 구성 - 메인 브리지 활성화

`kend.conf`를 구성하여 메인 브리지를 활성화해야 합니다.

### 환경 설정 파일 업데이트

The `kend.conf` contains the following main-bridge properties.

| 명칭                     | 설명                                                               |
|:---------------------- |:---------------------------------------------------------------- |
| MAIN_BRIDGE            | 서비스체인 1을 사용할 수 있도록 브리지 서비스를 메인 브리지로 사용                           |
| MAIN_BRIDGE_PORT     | 브리지 수신 포트 예) 기본값: 50505                                          |
| MAIN_BRIDGE_INDEXING | 서비스체인 데이터에 빠르게 액세스하기 위해 서비스체인 트랜잭션의 트랜잭션 해시 저장 사용 예) 활성화를 위해서는 1 |

EN에서 메인 브리지를 활성화하려면 다음을 수행합니다.

* define `MAIN_BRIDGE`
* enable RPC/WS.
* add `mainbridge` API for RPC like the below example.

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



## Connect SCN to the Main Chain

You need to run an EN of the main chain as a main-bridge. And also you should determine which SCN (Service Chain Node) as a sub-bridge will connect with the EN.

### Check EN (Main-Bridge) information

#### Open EN Console

There are different way to connect the EN process. You can check the usable commands on [ken CLI commands](../../../endpoint-node/ken-cli-commands.md). This page explains the way to connect the process via IPC (inter-process communication). The IPC file `klay.ipc` is located in the data directory on an EN/SCN.

다음 명령을 실행하고 결과를 확인하세요. (If you added `mainbridge` API for RPC, you can check the bridge API like below. If there is no `mainbridge` API, you should check [EN Configuration - Enable Main-bridge](#en-configuration-enable-main-bridge) again. )

```bash
$ ken attach ~/kend_home/klay.ipc
Welcome to the Klaytn JavaScript console!

instance: Klaytn/vX.X.X/XXXX-XXXX/goX.X.X
at block: 11573551 (Wed, 13 Feb 2019 07:12:52 UTC)
 datadir: ~/kend_home
 modules: admin:1.0 mainbridge:1.0 debug:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0
 >
```

#### Get the EN's KNI

After connecting the process via IPC, you can check the EN's main-bridge KNI like below. You can refer to [Service Chain API](../../../../bapp/json-rpc/api-references/servicechain.md).

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

You should note main-bridge `kni` information of EN.

### Connect to the Main Chain

#### Open SCN Console

Likes EN case, you can connect the SCN process like below. (If you added `subbridge` API for RPC, you can check the bridge API like below. If there is no `subbridge` API, you should check [Setup Service Chain](https://docs.klaytn.com/node/sc/setup_servicechain#configuration-of-the-initial-file) again. )

```bash
$ kscn attach ~/kscnd_home/klay.ipc
Welcome to the Klaytn JavaScript console!

instance: Klaytn/vX.X.X/XXXX-XXXX/goX.X.X

 datadir: ~/kscnd_home
 modules: admin:1.0 subbridge:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 servicechain:1.0 txpool:1.0
 >
```

#### Connect SCN with EN

You can add the EN peer on SCN via IPC like below. The kni is EN's KNI which you noted previously.

```javascript
 > subbridge.addPeer("kni://08b99d2297e0a27ddeb33f3a81b59ea1c065b9adbaff9fefab0d16f65b1a8db22939a104c24447e9aca521c158922ca912476b544baf48995a382d88886e0a37@[::]:50505?discport=0")
 true
```

And then you can check the connected peers like below.

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

## Enable Anchoring

This section shows how to enable the anchoring function. If it is enabled, SCN anchors periodically the service chain block data to the main chain to obtain the security of the service chain.

### Check Chain account of SCN

If you run SCN successfully, the main chain account is generated or set by `mainchainbridgekey` file. You can check the main chain account address vi RPC like the following.

```bash
$ kscn attach ~/kscnd_home/klay.ipc
Welcome to the Klaytn JavaScript console!

instance: Klaytn/vX.X.X/XXXX-XXXX/goX.X.X

 datadir: ~/kscnd_home
 modules: admin:1.0 subbridge:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 servicechain:1.0 txpool:1.0
 > subbridge.mainChainAccount
 "0x726e5C8705892989DAB1E9982FBE0B0A92eC84Bf"
```

_This main chain account address is generated by `mainchainbridgekey` file in $dataDIR/klay directory._

### Charging Chain address

When SCN anchor the block data, SCN make an anchoring transaction by the chain account. Therefore the chain account need KLAY. You should charge enough KLAY to the chain account.

### Enable Anchoring

After charging KLAY, you can enable via RPC like below. You can refer to [Service Chain API](../../../../bapp/json-rpc/api-references/servicechain.md) for more details.

```javascript
> subbridge.anchoring(true)
true
```

## Check Anchoring

If the anchoring feature is enabled, SCN will anchor the block data to main chain. You can check the anchored data like below.

### Main-Bridge

In Main-Bridge, if chain indexing option is enabled, you can find the anchoring tx hash by a service chain block hash like below. You can refer to [Service Chain API](../../../../bapp/json-rpc/api-references/servicechain.md) for more details.

```javascript
> mainbridge.convertServiceChainBlockHashToMainChainTxHash("0xeadc6a3a29a20c13824b5df1ba05cca1ed248d046382a4f2792aac8a6e0d1880")
"0x9a68591c0faa138707a90a7506840c562328aeb7621ac0561467c371b0322d51"
```

### Sub-Bridge

In Sun-Bridge, You can check the last anchored block number like below. You can refer to [Service Chain API](../../../../bapp/json-rpc/api-references/servicechain.md) for more details.

```javascript
> subbridge.latestAnchoredBlockNumber
71025
```

