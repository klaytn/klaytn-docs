이 장에서는 여러 노드로 서비스체인을 구성하는 법을 설명합니다. `chainID`를 1002로 구별하여 4개의 컨센서스 노드로 구성된 서비스체인을 설치할 것입니다.

![](../images/sc-4scn-arch.png)


## 준비 사항 <a id="prerequisites"></a>
 - [Download](../../download/README.md)에서 `kscn`, `homi` 바이너리 패키지를 다운로드하세요.
 - 4대의 Linux 또는 MacOS 서버
 - 최소 하드웨어 요구 사항
   - CPU: 4코어(Intel Xeon 또는 동급), RAM: 16GB, HDD: 50GB
   - 자세한 설명은 [시스템 요구사항](../references/system-requirements.md)을 참조하세요.

## 0 단계: 모든 노드에 SCN 설치하기 <a id="install-scn"></a>
다운로드한 kscn 패키지를 압축 해제하고, 압축해제된 파일들을 각 노드로 복사합니다.

```console
$ tar xvf kscn-vX.X.X-XXXXX-amd64.tar.gz
x kscn-XXXXX-amd64/
x kscn-XXXXX-amd64/conf/
x kscn-XXXXX-amd64/conf/kscnd.conf
x kscn-XXXXX-amd64/bin/
x kscn-XXXXX-amd64/bin/kscnd
x kscn-XXXXX-amd64/bin/kscn
```

편의상 바이너리 경로를 $PATH로 추가하겠습니다. 여러분의 노드에서는 실제 경로를 사용하세요.
```console
$ export PATH=$PATH:~/path/to/kscn-XXXXX-amd64/bin
```

SCN은 RHEL, CentOS와 Fedora와 같은 다양한 RPM 배포판을 제공합니다. 더 자세한 내용은 [Installation](../references/scn/installation.md)를 참조하십시오.

```console
$ curl -o /etc/yum.repos.d/klaytn.repo https://packages.klaytn.net/config/rhel/7/prod.repo
  % Total % Received % Xferd Average Speed Time Time Time Current Dload Upload Total Spent Left Speed
     100 118 100 118 0 0 1113 0 --:--:-- --:--:-- --:--:-- 1102 

$ yum list | grep klaytn 
packages-klaytn-prod 31 kB/s | 2.9 kB 00:00 
homi.x86_64           v1.8.0-0.el7      packages-klaytn-prod 
kbnd.x86_64           v1.8.0-0.el7      packages-klaytn-prod 
kcnd.x86_64           v1.8.0-0.el7      packages-klaytn-prod 
kcnd-baobab.x86_64    v1.8.0-0.el7      packages-klaytn-prod 
kend.x86_64           v1.8.0-0.el7      packages-klaytn-prod 
kend-baobab.x86_64    v1.8.0-0.el7      packages-klaytn-prod 
kgen.x86_64           v1.8.0-0.el7      packages-klaytn-prod 
kpnd.x86_64           v1.8.0-0.el7      packages-klaytn-prod 
kpnd-baobab.x86_64    v1.8.0-0.el7      packages-klaytn-prod 
kscnd.x86_64          v1.8.0-0.el7      packages-klaytn-prod 
ksend.x86_64          v1.8.0-0.el7      packages-klaytn-prod 
kspnd.x86_64          v1.8.0-0.el7      packages-klaytn-prod 

$ yum install kscnd
```

## 1 단계: genesis.json 및 nodekey 생성 <a id="step-1-create-genesis-json-and-a-key"></a>

homi 유틸리티를 사용해 필요한 파일을 생성할 것입니다. `homi`는 클레이튼 블록체인의 환경설정을 위해 필요한 스크립트, 환경설정 파일 그리고 프라이빗 키들을 자동으로 생성하는 유틸리티입니다. Linux와 Mac PC 모두에서 homi를 실행할 수 있습니다.

먼저 다운로드 한 homi 아카이브를 추출하십시오.
```console
$ tar xvf homi-vX.X.X-XXXXX-amd64.tar.gz
x homi-XXXXX-amd64/
x homi-XXXXX-amd64/bin/
x homi-XXXXX-amd64/bin/homi
```

`bin` 폴더로 가서 파일 생성을 위해 다음의 옵션과 함께 `homi`를 실행하세요. `homi setup local --cn-num 4 --test-num 1 --servicechain --chainID 1002 --p2p-port 22323 -o homi-output` Baobab의 `chainID`는 1001이기 때문에, 편의 상 본 예제에서는 서비스 체인의 `chainID`를 1002로 하겠습니다. 실제 서비스를 출시하기 위해 블록체인을 운영하는 경우, 다른 서비스 체인과 겹치지 않도록 https://chainlist.defillama.com/에서 새로운 chainID를 등록한 뒤에 사용할 것을 권장합니다. 서비스체인의 포트는 기본값이 22323으로 설정되어 있습니다.

```console
$ ./homi setup local --cn-num 4 --test-num 1 --servicechain --chainID 1002 --p2p-port 22323 -o homi-output
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

결과물 중 다음 단계에서 우리가 사용할 파일은 `nodeky*`, `genesis.json` 그리고 `static-nodes.json`입니다.


## 2 단계: static-nodes.json 수정 <a id="step-2-customize-static-nodes-json"></a>

문서 편집기에서 `homi-output/scripts/static-nodes.json`를 열고 IP 주소 및 포트를 여러분 노드의 실제 값으로 업데이트 해주세요. 이 예제에서는 서비스체인의 각 SCN 노드의 IP가 아래 그림과 같다고 가정합니다. 여러분이 여기에 설정한 포트값은 4 단계에서 사용될 것이므로 꼭 기억해주세요.

![](../images/sc-4scn-ip.png)

```json
[
     "kni://38693ad4b17ff77...23153@192.168.0.1:22323?discport=0\u0026ntype=cn",
     "kni://f36d969b16f7337...1329b@192.168.0.2:22323?discport=0\u0026ntype=cn",
     "kni://16e55d8921ab034...b2bec@192.168.0.3:22323?discport=0\u0026ntype=cn",
     "kni://0973e792a421c1d...bbd71@192.168.0.4:22323?discport=0\u0026ntype=cn"
]
```

`static-nodes.json`을 업데이트한 후, 결과 폴더(`homi-output`)를 모든 SCN에 업로드하세요. 이 예제에서는 SCN-L2-01, SCN-L2-02, SCN-L2-03, SCN-L2-04 노드입니다.

```console
$ scp -r path/to/homi-output/ user@192.168.0.1:~/
$ scp -r path/to/homi-output/ user@192.168.0.2:~/
$ scp -r path/to/homi-output/ user@192.168.0.3:~/
$ scp -r path/to/homi-output/ user@192.168.0.4:~/
```

## 3 단계: 노드 초기화 <a id="step-3-node-initialization"></a>
이제 제네시스 파일을 사용해서 각 노드를 초기화해보겠습니다. 개별 노드에서 아래의 명령을 실행합니다. 홈 디렉토리에 체인 데이터와 로그를 저장하는 데이터 폴더를 생성합니다. `--datadir` 지시문을 이용해 데이터 폴더를 변경할 수 있습니다. 이 예제에서 우리는 데이터 폴더를 `\~/data`에 지정했습니다.

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

1 단계에서 우리는 4개의 노드키(nodekey)를 생성했습니다. 각각의 노드키를 SCN에 할당한 뒤, 매칭되는 `nodekey`를 각각 SCN 데이터 폴더에 복사하세요. 예를 들어 SCN-L2-01(192.168.0.1) 노드에는 `nodekey1`를 SCN-L2-02(192.168.0.2), SCN-L2-03(192.168.0.3) 그리고 SCN-L2-04(192.168.0.4)에는 `nodekey2`, `nodekey3`와 `nodekey4`를 각각 사용합니다.
```console
$ cp ~/homi-output/keys/nodekey{1..4} ~/data/klay/nodekey
```

![](../images/sc-4scn-nodekey.png)

## 5 단계: 노드 설정 <a id="step-5-configure-nodes"></a>

모든 SCN에서 kscn 설치 폴더로 이동하여 `conf/kscnd.conf`를 다음과 같이 편집하세요. `PORT`는 `homi`를 설치하는 데 사용하는 포트이며,  `SC_SUB_BRIDGE`는 다음 장에서 브릿지를 연결하는 데 필요합니다. 현재는 0으로 설정하겠습니다. `DATA_DIR`에서 3 단계에 설정한 데이터 폴더를 입력합니다.
```
...
PORT=22323
...
SC_SUB_BRIDGE=0
...
DATA_DIR=~/data
...
```

## 6 단계: 노드 시작 <a id="step-6-start-nodes"></a>
모든 SCN에서 다음 명령을 실행하세요.
```console
$ kscnd start
Starting kscnd: OK
```
`klay.blockNumber`를 보면서 블록 생성 상태를 확인할 수 있습니다. 조회 결과가 0이 아니라면 노드가 제대로 작동하는 것입니다.
```console
$ kscn attach --datadir ~/data
> klay.blockNumber
10
```
노드를 중지하고 싶으면 `kscnd stop` 명령을 사용할 수 있습니다.

## (예) 토큰 전송 트랜잭션 생성 및 확인 <a id="example-creation-and-confirmation-of-a-value-transfer-transaction"></a>
이제 4개의 노드로 구성된 서비스체인이 작동하고 있습니다. 서비스체인이 잘 동작하는지 확인하기 위해 서비스체인에서 토큰 전송 트랜잭션을 실행해 보겠습니다.

![](../images/sc-4scn-test.png)

### 1 단계: 테스트 계정 가져오기 <a id="step-1-import-the-test-account"></a>
`testkey1`는 1 단계에서 `homi`를 통해 자동으로 생성되었습니다. `homi`에 의해 생성된 `genesis.json`에 설명되어 있듯, KLAY는 테스트 계정에 지급되어 있습니다.


```console
$ kscn account import --datadir ~/data ~/homi-output/keys_test/testkey1
Your new account is locked with a password. Please give a password. Do not forget this password.
Passphrase:
Repeat passphrase:
Address: {80119c31cdae67c42c8296929bb4f89b2a52cec4}
```

### 2 단계: 계정 잠금 해제 <a id="step-2-unlock-the-account"></a>
계정의 잠금 해제는 `testkey1`를 가져온 SCN의 콘솔을 통해서만 가능합니다.
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

{% hint style="info" %}
가장 단순한 형태의 서비스 체인은 SCN를 하나만 가지고 있는 것입니다. 이 예제에서는 4개 노드를 가진 서비스 체인을 설명했습니다. 하지만 필요에 따라 단일 노드 서비스 체인도 구축할 수 있습니다. 1 단계 'genesis.json 및 nodekeys 생성하기'에서 `--cn-num 4` 대신 `--cn-num 1`를 homi에 전달하면 됩니다.

비잔틴 장애를 견뎌내기 위해서는 최소 4개의 노드가 필요합니다. BTF 알고리즘 하에서 높은 가용성을 보장하기 위한 SCN의 최소값은 4입니다. 2개의 SCN인 경우 하나에 장애가 생길 경우 다른 하나가 혼자서 합의를 이루지 못하기 때문에 가용성을 보장하지 못 합니다.
{% endhint %}