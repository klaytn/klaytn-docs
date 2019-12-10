이 장에서는 제공된 테스트 코드를 사용하여 Baobab 네트워크와 서비스체인 사이에 ERC-20 밸류 트랜스퍼를 활성화하는 방법을 설명합니다. 오퍼레이터 계정에 KLAY를 추가하고 브리지 및 ERC-20 컨트랙트를 배포하게 됩니다. 이 후, SCN에 컨트랙트 주소를 등록합니다. 그리고 ERC-20 밸류 트랜스퍼를 테스트할 것입니다.


## 준비 사항 <a id="prerequisites"></a>
- 서비스체인을 설치하고 서비스체인을 Baobab EN에 연결했다고 가정합니다 ([참고 링크](en-scn-connection.md)).
- 컨트랙트 배포 및 전송에 사용할 코드를 다운로드하세요 ([다운로드](https://drive.google.com/file/d/14tNU-jOAv7JwfY5xZqJlckkpO16TuS2S/view?usp=sharing)).
- `Node.js(v10.60.0)`과 `npm`을 설치하세요 ([설치방법](https://nodejs.org/en/download/package-manager/))


## ERC-20 토큰 전송<a id="erc-20-token-transfer"></a>

### 1 단계 : 운영자 계정에 KLAY 추가하기<a id="step-1-add-klay-to-the-operator-accounts"></a>
SCN에 연결하여 `subbridge.parentOperator`와 `subbridge.childOperator`를 실행하여 계정 주소를 확인하세요.
```
$ kscn attach --datadir ~/data
> subbridge.childOperator
"0x10221f7f9355017cd0c11444e7eecb99621bacce"
> subbridge.parentOperator
"0x3ce216beeafc62d20547376396e89528e1d778ca"
```

[Baobab Wallet](https://baobab.wallet.klaytn.com/)에서 테스트 계정을 만들고 Faucet에서 테스트 KLAY를 받습니다. 그 후 1 KLAY를 `parentOperator`로 보냅니다. `childOperator`는 `homi`가 생성한 테스트 계정으로부터 KLAY를 받아야 합니다([EN 설정 및 SCN 연결 참조](en-scn-connection.md)).

```
$ kscn account import ~/homi-output/keys_test/testkey1
Your new account is locked with a password. Please give a password. Do not forget this password.
Passphrase:
Repeat passphrase:
Address: {80119c31cdae67c42c8296929bb4f89b2a52cec4}
```
```
$ kscn attach --datadir ~/data
> personal.unlockAccount("80119c31cdae67c42c8296929bb4f89b2a52cec4")
Unlock account 80119c31cdae67c42c8296929bb4f89b2a52cec4
Passphrase:
True
> klay.sendTransaction({from:"80119c31cdae67c42c8296929bb4f89b2a52cec4", to:subbridge.childOperator, value: web3.toPeb(1000, "KLAY")})
"0x84caab84ebf0c4bb4ecf0a7849f1de3e479f1863a95f70c51047a7ca7bc64b33"
```
오퍼레이터 계정의 잔액이 충분한지 확인하세요.
```
> klay.getBalance(subbridge.childOperator)
1e+21
> klay.getBalance(subbridge.parentOperator)
1e+18
```

### 2 단계 : 컨트랙트 배포 <a id="step-2-deploy-contracts"></a>
SCN에 연결하고 컨트랙트 배포를 위한 노드 환경을 준비합니다. [`deploy_and_test.tar.gz`를 다운로드](https://drive.google.com/file/d/14tNU-jOAv7JwfY5xZqJlckkpO16TuS2S/view?usp=sharing)한 후 node_project 디렉토리에 압축을 해제하여 풀어놓으세요.

```bash
$ mkdir node_project
$ cd node_project
$ npm init
$ npm install caver-js
$ tar xvfz /path/to/deploy_and_transfer.tar.gz -C .
```

텍스트 편집기에서 `deploy_conf.json`을 아래와 같이 편집하세요.
- `scn` 항목에서 `ip`와 `port`를 실제 SCN 값으로 변경하세요. 여기서 포트는 kscnd.conf에 정의된 RPC_PORT입니다. 기본 설정값은  7551 입니다.
- `key`를 `homi`가 생성한 `testkey1`로 변경하세요.
- `operator`를 이전 단계에서 확인한 `subbridge.childOperator` 주소로 지정하세요.
- `en` 항목에서 `ip`와 `port`를 실제 EN 값으로 변경하세요. 여기서 포트는 kend.conf에 정의된 RPC_PORT입니다. 기본 설정값은  8551 입니다.
- `key`를 이전 단계에서 [Baobab Wallet](https://baobab.wallet.klaytn.com/)에서 생성한 테스트 계정의 개인키로 변경하세요 .
- `operator`를 이전 단계에서 확인한 `subbridge.parentOperator` 주소로 지정하세요.

```
{
     "scn" : {
         "ip": "192.168.0.1",
         "port": "7551",
         "key": "0x66cb283353589a10866b58d388e9d956e5a9c873a8c78fa4411d460c19c494ea",
         "operator": "0x10221f7f9355017cd0c11444e7eecb99621bacce"
     },
     "en" : {
         "ip": "192.168.0.5",
         "port": "8551",
         "key": "0x26f4b5ac42ceabcfd3b23a991fdbfc792d10ce700a99582fdf9185a8f163b790",
         "operator": "0x3ce216beeafc62d20547376396e89528e1d778ca"
     }
 }
```

`node deploy.js` 명령어를 실행하여 토큰을 배포하세요. 다음 단계를 위한 API 목록을 보여줄 것입니다.

```
$ node deploy.js
subbridge.registerBridge("0x5f093de8a1b1d32Fc4cF6F40357DCcD24453BAb3", "0xD1C4808960Fb4581b9A5B3B217b9a67057D84c19")
subbridge.subscribeBridge("0x5f093de8a1b1d32Fc4cF6F40357DCcD24453BAb3", "0xD1C4808960Fb4581b9A5B3B217b9a67057D84c19")
subbridge.registerToken("0x5f093de8a1b1d32Fc4cF6F40357DCcD24453BAb3", "0xD1C4808960Fb4581b9A5B3B217b9a67057D84c19", "0x96272131600EC7c64c45CE139C32F4919fBFaDC8", "0xc7858a153376764208e8F6B6B55B4a0792B67c3E")
```

### 3 단계 : 브리지 등록, 브리지 구독, 토큰 등록 <a id="step-3-register-bridge-subscribe-bridge-and-register-token"></a>
콘솔에서 위에 표시된 API를 하나씩 실행하세요.
```
$ kscn attach --datadir ~/data
> subbridge.registerBridge("0x5f093de8a1b1d32Fc4cF6F40357DCcD24453BAb3", "0xD1C4808960Fb4581b9A5B3B217b9a67057D84c19")
null
> subbridge.subscribeBridge("0x5f093de8a1b1d32Fc4cF6F40357DCcD24453BAb3", "0xD1C4808960Fb4581b9A5B3B217b9a67057D84c19")
null
> subbridge.registerToken("0x5f093de8a1b1d32Fc4cF6F40357DCcD24453BAb3", "0xD1C4808960Fb4581b9A5B3B217b9a67057D84c19", "0x96272131600EC7c64c45CE139C32F4919fBFaDC8", "0xc7858a153376764208e8F6B6B55B4a0792B67c3E")
null
```

### 4 단계 : 토큰 전송<a id="step-4-token-transfer"></a>
`node transfer.js` 명령어로 토큰을 전송하세요.
```
$ node transfer.js
requestValueTransfer..
alice balance: 100
```

결과가 `alice balance: 100`인지 확인하세요.
