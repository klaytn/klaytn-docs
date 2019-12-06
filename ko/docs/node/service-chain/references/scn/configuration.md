# 설정<a id="configuration"></a>

이 페이지는 컨센서스 네트워크를 구성하기 위해 SCN를 설정하는 방법을 설명합니다.

아카이브 배포를 설치한 경우 아카이브를 풀어놓은 디렉토리에서 실행 바이너리 및 설정 파일을 찾을 수 있습니다.
```bash
$ homi-darwin-amd64/bin/homi setup ...
$ kscn-darwin-amd64/bin/kscnd start
$ vi kscn-darwin-amd64/conf/kscnd.conf
```

이 후 예제에서 명령어의 전체 경로를 항상 명시하지는 않습니다.

## 제네시스 파일 생성<a id="creation-of-a-genesis-file"></a>

먼저 서비스체인의 genesis 파일과 nodekey 파일을 만들어야 합니다. 아래와 같이 homi를 사용하여 만들 수 있습니다.
```bash
$ homi setup local --cn-num 1 --servicechain -o ./homi-output
Created :  homi-output/keys/passwd1
Created :  homi-output/scripts/genesis.json
Created :  homi-output/keys/nodekey1
Created :  homi-output/keys/validator1
Created :  homi-output/scripts/static-nodes.json
Created :  homi-output/Klaytn.json
Created :  homi-output/Klaytn_txpool.json
```

아래는 genesis 파일 및 nodekey 파일의 예입니다.
```bash
$ cat homi-output/scripts/genesis.json
{
    "config": {
        "chainId": 1000,
        "istanbul": {
            "epoch": 3600,
            "policy": 0,
            "sub": 22
        },
        "unitPrice": 0,
        "deriveShaImpl": 2,
        "governance": null
    },
    "timestamp": "0x5dca0732",
    "extraData": "0x0000000000000000000000000000000000000000000000000000000000000000f85ad594f8690562c0839c44b17af421f7aaaa9f12dcc62bb8410000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c0",
    "governanceData": null,
    "blockScore": "0x1",
    "alloc": {
        "f8690562c0839c44b17af421f7aaaa9f12dcc62b": {
            "balance": "0x2540be400"
        }
    },
    "number": "0x0",
    "gasUsed": "0x0",
    "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000"
}   
```

```bash      
$ cat homi-output/keys/nodekey1                                                                                                                                 
0c28c77ce5c2ca9e495b860f190ed7dfe7bd5c1a2e5f816587eb4d3d9566df44
```

Please change the chainID in the genesis file. Use your own number to prevent a replay attack. (Do not use the same chainID with Klaytn Cypress (8217) and Baobab (1001))

If you want, you can change the pre-funded addresses by editing `"alloc"` in the genesis file. (You can find more details in [Genesis JSON](../genesis.md).)

## SCN 데이터 디렉토리 생성<a id="scn-data-directory-creation"></a>

Klaytn 블록체인 데이터의 크기가 계속 증가한다는 사실을 고려하여 충분히 큰 스토리지를 사용하는 것이 좋습니다. 원하는 경로에 데이터 디렉토리를 생성할 수 있습니다. 이 문서에서는 `~/kscnd_home`을 데이터 디렉토리로 생성합니다.

```bash
$ mkdir -p ~/kscnd_home
```

### 제네시스 블록의 초기화<a id="initialization-of-a-genesis-block"></a>
After that, you can initialize the data directory with the genesis file. Before starting a service chain node, it is necessary to initialize the genesis block of the service chain network using `kscn` and `genesis.json`.

```bash
$ kscn init --datadir ~/kscnd_home homi-output/scripts/genesis.json
  WARN[11/12,10:13:58 +09] [19] Some input value of genesis.json have been set to default or changed
  INFO[11/12,10:13:58 +09] [18] Setting connection type                   nodetype=cn conntype=0
    ...
  INFO[11/12,10:13:59 +09] [5] Using DeriveShaConcat!
  INFO[11/12,10:13:59 +09] [5] Writing custom genesis block
  INFO[11/12,10:13:59 +09] [5] Using DeriveShaConcat!
  INFO[11/12,10:13:59 +09] [47] Persisted trie from memory database       updated nodes=1 updated nodes size=80.00B time=304.931µs gcnodes=0 gcsize=0.00B gctime=0s livenodes=1 livesize=0.00B
  INFO[11/12,10:13:59 +09] [19] Successfully wrote genesis state          database=lightchaindata hash=0xc269669079fc8c06ac37435a563b8ed8ef273c1c835f3d823d2e586315319aa8
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/header
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/body
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/receipts
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/statetrie/0
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/statetrie/1
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/statetrie/2
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/statetrie/3
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/txlookup
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/misc
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/bridgeservice
```

### nodekey 설치<a id="install_nodekey"></a>
Copy `homi-output/keys/nodekey1` to the `klay` directory in the SCN's data directory like below.

```bash
$ cp homi-output/keys/nodekey1  ~/kscnd_home/klay/nodekey
```

## SCN 설정 <a id="configuration-of-the-scn"></a>

`kscnd.conf`는 SCN의 설정 파일입니다.

Assume that the SCN uses the default port and mounts a large-scale partition onto `~/kscnd_home`. In the default `kscnd.conf` file, `SC_SUB_BRIDGE` option is disabled and `DATA_DIR` is empty.
```
# Configuration file for the kscnd
...
SC_SUB_BRIDGE=0
...
DATA_DIR=
...
```

You can enable `SC_SUB_BRIDGE` to use the Anchoring/Value transfer feature. Also you should set the DATA_DIR like below.

```
# Configuration file for the kscnd
...
SC_SUB_BRIDGE=1
...
DATA_DIR=~/kscnd_home
...
```

If you want, you can further modify other options to customize your Service Chain. Otherwise, now you can finish the configuration and you are ready to run the service chain using the default configuration.


