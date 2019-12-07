This section covers how to set up a multi-node service chain. To tolerate byzantine faults, at least four nodes are required. We will set up a 4-consensus-node service chain.

 ## Prerequisites
 - 아래 실행 파일을 다운로드하세요. 다운로드 가능한 전체 목록은 [다운로드](../../download/README.md) 페이지를 참조하세요.
   - Linux
      - 서비스체인 컨센서스 노드(SCN): [kscn-v1.2.0-4-linux-amd64.tar.gz](http://packages.klaytn.net/klaytn/v1.2.0/kscn-v1.2.0-4-linux-amd64.tar.gz)
      - homi 유틸리티: [homi-v1.2.0-4-linux-amd64.tar.gz](http://packages.klaytn.net/klaytn/v1.2.0/homi-v1.2.0-4-linux-amd64.tar.gz)
   - MacOS
      - 서비스체인 컨센서스 노드(SCN): [kscn-v1.2.0-4-darwin-amd64.tar.gz](http://packages.klaytn.net/klaytn/v1.2.0/kscn-v1.2.0-4-darwin-amd64.tar.gz)
      - homi 유틸리티: [homi-v1.2.0-4-darwin-amd64.tar.gz](http://packages.klaytn.net/klaytn/v1.2.0/homi-v1.2.0-4-darwin-amd64.tar.gz)
 - 4대의 Linux 또는 MacOS 서버
 - 최소 하드웨어 요구 사항
   - CPU: 4코어(Intel Xeon 또는 동급), RAM: 16GB, HDD: 50GB
   - 자세한 설명은 [시스템 요구사항](../references/system-requirements.md)을 참조하세요.

## Step 0: Install SCN on all nodes <a id="install-scn"></a>
The installation is the uncompression of the downloaded package. Extract the SCN archive on each server.

```console
$ tar xvf kscn-vX.X.X-XXXXX-amd64.tar.gz 
x kscn-XXXXX-amd64/
x kscn-XXXXX-amd64/conf/
x kscn-XXXXX-amd64/conf/kscnd.conf
x kscn-XXXXX-amd64/bin/
x kscn-XXXXX-amd64/bin/kscnd
x kscn-XXXXX-amd64/bin/kscn
```

편의를 위해 바이너리 경로를 $PATH에 추가합니다. 노드에 있는 실제 경로를 사용하세요.
```console
$ export PATH=$PATH:~/path/to/kscn-XXXXX-amd64/bin
```

## 1 단계: genesis.json 및 nodekey 생성 <a id="step-1-create-genesis-json-and-a-key"></a>

We will use homi utility to generate the needful files. You can execute homi from any Linux/Mac PC.

First, extract the homi archive you downloaded.
```console
$ tar xvf homi-vX.X.X-XXXXX-amd64.tar.gz 
x homi-XXXXX-amd64/
x homi-XXXXX-amd64/bin/
x homi-XXXXX-amd64/bin/homi
```

Go to the `bin` folder and execute `homi` with following options to generate the files. `homi setup local --cn-num 4 --test-num 1 --servicechain --p2p-port 30000 -o homi-output`

```console
$ ./homi setup local --cn-num 4 --test-num 1 --servicechain --p2p-port 30000 -o homi-output
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

Among the outputs, we will use `nodeky*`, `genesis.json` and `static-nodes.json` in the subsequent steps.


## 2 단계: static-nodes.json 수정 <a id="step-2-customize-static-nodes-json"></a>

Open `homi-output/scripts/static-nodes.json` in a text editor then update the IP addresses and ports with the actual values of your nodes. Note the port you assigned here, the value will be used later in step 4.

```json
[
    "kni://38693ad4b17ff778b3f7bcbe6ee7fbc9a51999c443b3952e3e0838e63792f358235ccbf97a1f787f78c2558315ee3709903837f160d222ab7c4061bd9af23153@192.168.0.1:30000?discport=0\u0026ntype=cn",
     "kni://f36d969b16f7337b6f3f13ab9b0b3352ecca987cfaf744fa712b235ea3d9e14ac4e3d53de5c76c91d9b957fdfec4f48b062ce90a98695248c61a822e82c1329b@192.168.0.2:30000?discport=0\u0026ntype=cn",
     "kni://16e55d8921ab034e9538a1faf9666643b6104480397172ab443d4136208e55f36a456d93da098e2163d013a7f049171a1cfaa8986dc361c76f8d9aa9c0ab2bec@192.168.0.3:30000?discport=0\u0026ntype=cn",
     "kni://0973e792a421c1d1bedaccaf873f087ae118d895270f9cb3a81f1a31fcd21d62fd0928b9b6e56badf3c0690f67b9c7036c329103b716e6dcf9b92a4619fbbd71@192.168.0.4:30000?discport=0\u0026ntype=cn"
]
```

After you update `static-nodes.json`, upload the output folders to all SCNs.

```console
$ scp -r path/to/homi-output/ user@192.168.0.1:~/ 
```

## 3 단계: 노드 초기화 <a id="step-3-node-initialization"></a>
Now, we will initialize each node using the genesis file. On each node, execute the following command. It will create the data folder storing the chain data and logs on your home directory. You can change the data folder using the `--datadir` directive.

```console
$ kscn --datadir ~/data init ~/homi-output/scripts/genesis.json

$ ls ~/data
keystore    klay        kscn
```


## 4 단계: `nodekey` 및 `static-nodes.json` 설치 <a id="step-4-install-nodekey"></a>

On every SCNs, copy `static-nodes.json` to the data folder.
```console
$ cp ~/homi-output/scripts/static-nodes.json ~/data/
```

In step 1, we generated 4 nodekeys. Assign each node key to the SCN and copy the matching nodekey to each SCN's data folder. For example, use nodekey1 for 192.168.0.1 node and use nodekey 2, 3 and 4 for 192.168.0.2, 192.168.0.3 and 192.168.0.4 respectively.
```console
$ cp ~/homi-output/keys/nodekey{1..4} ~/data/klay/nodekey
```

## 5 단계: 노드 설정 <a id="step-5-configure-nodes"></a>

On every SCNs, go to the kscn installation folder and edit `conf/kscnd.conf` as follows.
```
...
PORT=30000
...
SC_SUB_BRIDGE=0
...
DATA_DIR=~/data
...
```

## 6 단계: 노드 시작 <a id="step-6-start-nodes"></a>
모든 SCN 노드에서 다음 명령어를 실행하세요.
```console
$ kscnd start
Starting kscnd: OK
```
You can check block generation status by watching `klay.blockNumber`. If this number is not 0, the node is working fine.
```console
$ kscn attach --datadir ~/data
> klay.blockNumber
10
```
노드를 중지하려면 `kscnd stop` 명령어를 사용하세요.

## (예) 밸류 트랜스퍼 트랜잭션 생성 및 확인 <a id="example-creation-and-confirmation-of-a-value-transfer-transaction"></a>
이제 4-노드 서비스체인이 실행 중입니다. 서비스 체인에서 밸류 트랜스퍼 트랜잭션을 실행하여 설치가 정상적으로 되었는지 확인해보죠.

### 1 단계: 테스트 계정 가져오기 <a id="step-1-import-the-test-account"></a>
`testkey1`은 1 단계에서 `homi`에 의해 자동으로 생성되었습니다. ` genesis.json`에 지정된대로 KLAY가 테스트 계정에 할당되는데, 이 역시 `homi`에 의해 자동 생성되었습니다.
```console
$ kscn account import --datadir ~/data ~/homi-output/keys_test/testkey1
Your new account is locked with a password. Please give a password. Do not forget this password.
Passphrase:
Repeat passphrase:
Address: {80119c31cdae67c42c8296929bb4f89b2a52cec4}
```

### 2 단계: 계정 잠금 해제 <a id="step-2-unlock-the-account"></a>
```console
$ kscn attach --datadir ~/data
> personal.unlockAccount("80119c31cdae67c42c8296929bb4f89b2a52cec4")
Unlock account 80119c31cdae67c42c8296929bb4f89b2a52cec4
Passphrase:
true
```

### 3 단계: 트랜잭션을 보내고 잔액 확인하기<a id="step-3-send-a-transaction-and-check-the-balance"></a>
```console
> klay.sendTransaction({from: "80119c31cdae67c42c8296929bb4f89b2a52cec4", to: "305c6cc464d5fe1e624679695a20d641a01688e1", value: 10})
"0xa0e7102e8f14200cec8d964aacc1c9ed7c22271078b2b213170c64333cbca8a3"
> klay.getBalance("305c6cc464d5fe1e624679695a20d641a01688e1")
10
```
