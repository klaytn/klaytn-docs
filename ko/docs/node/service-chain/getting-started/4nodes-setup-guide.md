이 장에서는 다중 노드 서비스 체인을 설정하는 방법에 대해 설명합니다. 비잔틴 결함을 허용하려면 최소 4개의 노드가 필요합니다. 우리는 4개의 컨센서스 노드로 구성된 서비스 체인을 설정해볼 것입니다.

## 준비 사항 <a id="prerequisites"></a>
 - [Download](../../download/README.md)에서 `kscn`, `homi` 바이너리 패키지를 다운로드하세요.
 - 4대의 Linux 또는 MacOS 서버
 - 최소 하드웨어 요구 사항
   - CPU: 4코어(Intel Xeon 또는 동급), RAM: 16GB, HDD: 50GB
   - 자세한 설명은 [시스템 요구사항](../references/system-requirements.md)을 참조하세요.

## 0 단계: 모든 노드에 SCN 설치하기 <a id="install-scn"></a>
설치는 다운로드 한 패키지의 압축을 해제하기만 하면 됩니다. 각 서버에서 SCN 아카이브를 압축 해제하세요.

```console
$ tar xvf kscn-vX.X.X-XXXXX-amd64.tar.gz 
x kscn-XXXXX-amd64/
x kscn-XXXXX-amd64/conf/
x kscn-XXXXX-amd64/conf/kscnd.conf
x kscn-XXXXX-amd64/bin/
x kscn-XXXXX-amd64/bin/kscnd
x kscn-XXXXX-amd64/bin/kscn
```

편의를 위해 바이너리 경로를 $PATH에 추가합니다. 각 노드에 있는 실제 경로를 사용하세요.
```console
$ export PATH=$PATH:~/path/to/kscn-XXXXX-amd64/bin
```

## 1 단계: genesis.json 및 nodekey 생성 <a id="step-1-create-genesis-json-and-a-key"></a>

우리는 homi 유틸리티를 사용하여 필요한 파일을 생성할 것입니다. homi 실행은 어디에서 하든 Linux/Mac PC이기만 하면 상관 없습니다.

먼저 다운로드 한 homi 아카이브를 추출하세요.
```console
$ tar xvf homi-vX.X.X-XXXXX-amd64.tar.gz 
x homi-XXXXX-amd64/
x homi-XXXXX-amd64/bin/
x homi-XXXXX-amd64/bin/homi
```

`bin` 폴더로 이동하여 `homi`를 다음 옵션과 함께 실행하면 필요한 파일을 생성할 수 있습니다. `homi setup local --cn-num 4 --test-num 1 --servicechain --p2p-port 30000 -o homi-output`

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

결과물 중 이어지는 단계에서 우리가 사용할 파일은 `nodeky*`, `genesis.json` 그리고 `static-nodes.json`입니다.


## 2 단계: static-nodes.json 수정 <a id="step-2-customize-static-nodes-json"></a>

`homi-output/scripts/static-nodes.json`을 텍스트 편집기에서 열고, IP 주소와 포트를 실제 노드 값으로 업데이트하세요. 여기에서 사용한 포트 값을 기억하세요. 이 값은 나중에 4 단계에서 사용됩니다.

```json
[
    "kni://38693ad4b17ff778b3f7bcbe6ee7fbc9a51999c443b3952e3e0838e63792f358235ccbf97a1f787f78c2558315ee3709903837f160d222ab7c4061bd9af23153@192.168.0.1:30000?discport=0\u0026ntype=cn",
     "kni://f36d969b16f7337b6f3f13ab9b0b3352ecca987cfaf744fa712b235ea3d9e14ac4e3d53de5c76c91d9b957fdfec4f48b062ce90a98695248c61a822e82c1329b@192.168.0.2:30000?discport=0\u0026ntype=cn",
     "kni://16e55d8921ab034e9538a1faf9666643b6104480397172ab443d4136208e55f36a456d93da098e2163d013a7f049171a1cfaa8986dc361c76f8d9aa9c0ab2bec@192.168.0.3:30000?discport=0\u0026ntype=cn",
     "kni://0973e792a421c1d1bedaccaf873f087ae118d895270f9cb3a81f1a31fcd21d62fd0928b9b6e56badf3c0690f67b9c7036c329103b716e6dcf9b92a4619fbbd71@192.168.0.4:30000?discport=0\u0026ntype=cn"
]
```

`static-nodes.json`을 업데이트한 후, 결과 폴더(homi_output)를 모든 SCN에 업로드하세요.

```console
$ scp -r path/to/homi-output/ user@192.168.0.1:~/ 
```

## 3 단계: 노드 초기화 <a id="step-3-node-initialization"></a>
이제, genesis 파일을 사용하여 각 노드를 초기화합니다. 각 노드에서 다음 명령을 실행하세요. 이 명령어는 체인 데이터와 로그를 저장하는 데이터 폴더를 홈 디렉토리에 생성합니다. `-datadir` 지시어로 데이터 폴더 위치를 변경할 수 있습니다.

```console
$ kscn --datadir ~/data init ~/homi-output/scripts/genesis.json

$ ls ~/data
keystore    klay        kscn
```


## 4 단계: `nodekey` 및 `static-nodes.json` 설치 <a id="step-4-install-nodekey"></a>

모든 SCN에서 `static-nodes.json`을 데이터 폴더에 복사하세요.
```console
$ cp ~/homi-output/scripts/static-nodes.json ~/data/
```

1 단계에서 4개의 nodekey를 생성했습니다. 각 nodekey를 SCN에 하나씩 할당하고 각 SCN의 데이터 폴더에 맞는 것을 복사하세요. 예를 들어, 192.168.0.1 노드에는 nodekey1을 사용하고 192.168.0.2, 192.168.0.3, 192.168.0.4에는 nodekey 2, 3, 4를 사용하는거죠.
```console
$ cp ~/homi-output/keys/nodekey{1..4} ~/data/klay/nodekey
```

## 5 단계: 노드 설정 <a id="step-5-configure-nodes"></a>

모든 SCN에서 kscn 설치 폴더로 이동하여 `conf/kscnd.conf`를 다음과 같이 편집하세요.
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
`klay.blockNumber`로 블록 생성 상태를 확인할 수 있습니다. 이 숫자가 0이 아니면 노드가 제대로 동작하는 것입니다.
```console
$ kscn attach --datadir ~/data
> klay.blockNumber
10
```
노드를 중지하려면 `kscnd stop` 명령어를 사용하세요.

## (예) 밸류 트랜스퍼 트랜잭션 생성 및 확인 <a id="example-creation-and-confirmation-of-a-value-transfer-transaction"></a>
이제 4-노드 서비스체인이 실행 중입니다. 서비스체인에서 밸류 트랜스퍼 트랜잭션을 실행하여 설치가 정상적으로 되었는지 확인해보죠.

### 1 단계: 테스트 계정 가져오기 <a id="step-1-import-the-test-account"></a>
`testkey1`은 1 단계에서 `homi`에 의해 자동으로 생성되었습니다. `genesis.json`에 지정된 대로 KLAY가 테스트 계정에 할당되는데, 이 역시 `homi`에 의해 자동 생성되었습니다.
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
