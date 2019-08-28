# Connect to Main Chain

In this page, we will connect the single-node Service Chain to the Main Chain.

## EN Configuration - Enable Main-bridge

You should enable main-bridge by configuring `kend.conf`.

### Update the Configuration File

The `kend.conf` contains the following main-bridge properties.

| Name                       | Description                                                                                                            |
|:-------------------------- |:---------------------------------------------------------------------------------------------------------------------- |
| MAIN\_BRIDGE             | Enable bridge service as main bridge for service chain 1 to be enabled                                                 |
| MAIN\_BRIDGE\_PORT     | bridge listen port e.g\) default: 50505                                                                               |
| MAIN\_BRIDGE\_INDEXING | Enable storing transaction hash of service chain transaction for fast access to service chain data e.g\) 1 to enabled |


To enable main-bridge on EN, you should do like below.

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

*You should note the `WS_PORT` to use for `SC_MAIN_CHAIN_WS` in* [*Setup Service Chain*]()_._

### Restart the EN

## Connect SCN to the Main Chain

You need to run an EN of the main chain as a main-bridge. And also you should determine which SCN \(Service Chain Node\) as a sub-bridge will connect with the EN.

### Check EN \(Main-Bridge\) information

#### Open EN Console

There are different way to connect the EN process. You can check the usable commands on [API Document](https://docs.klaytn.com/api) This page explains the way to connect the process via IPC \(inter-process communication\). The IPC file `klay.ipc` is located in the data directory on an EN/SCN.

Please execute the following command and check out the result. \(If you added `mainbridge` API for RPC, you can check the bridge API like below. If there is no `mainbridge` API, you should check [Operate EN as Main-bridge](https://docs.klaytn.com/node/sc/setup_main-bridge#configuration-of-the-initial-file) again. \)

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

After connecting the process via IPC, you can check the EN's main-bridge KNI like below. You can refer to [Service Chain API](https://docs.klaytn.com/api/servicechain).

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

Likes EN case, you can connect the SCN process like below. \(If you added `subbridge` API for RPC, you can check the bridge API like below. If there is no `subbridge` API, you should check [Setup Service Chain](https://docs.klaytn.com/node/sc/setup_servicechain#configuration-of-the-initial-file) again. \)

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

*This main chain account address is generated by `mainchainbridgekey` file in $dataDIR/klay directory.*

### Charging Chain address

When SCN anchor the block data, SCN make an anchoring transaction by the chain account. Therefore the chain account need KLAY. You should charge enough KLAY to the chain account.

### Enable Anchoring

After charging KLAY, you can enable via RPC like below. You can refer to [Service Chain API]() for more details.

```javascript
> subbridge.anchoring(true)
true
```

## Check Anchoring

If the anchoring feature is enabled, SCN will anchor the block data to main chain. You can check the anchored data like below.

### Main-Bridge

In Main-Bridge, if chain indexing option is enabled, you can find the anchoring tx hash by a service chain block hash like below. You can refer to [Service Chain API]() for more details.

```javascript
> mainbridge.convertServiceChainBlockHashToMainChainTxHash("0xeadc6a3a29a20c13824b5df1ba05cca1ed248d046382a4f2792aac8a6e0d1880")
"0x9a68591c0faa138707a90a7506840c562328aeb7621ac0561467c371b0322d51"
```

### Sub-Bridge

In Sun-Bridge, You can check the last anchored block number like below. You can refer to [Service Chain API]() for more details.

```javascript
> subbridge.latestAnchoredBlockNumber
71025
```