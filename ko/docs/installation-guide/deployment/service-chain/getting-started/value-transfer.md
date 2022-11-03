이번 장에서는 Baobab 네트워크와 서비스체인 간에 토큰을 전송하는 방법을 설명합니다. 운영자 계정에 KLAY를 확보하고 브릿지 컨트랙트 및 ERC-20 컨트랙트를 배포합니다. 그런 다음 SCN 서브 브릿지에 계약 주소를 등록합니다.  그리고 ERC-20 토큰 전송을 테스트합니다.


## 준비 사항 <a id="prerequisites"></a>
- 서비스체인을 구성하고, [Baobab 연결](en-scn-connection.md)의 설명에 따라 서비스체인을 Baobab EN에 연결했다고 가정합니다.
- [servicechain-value-transfer-examples](https://github.com/klaytn/servicechain-value-transfer-examples) 저장소를 복제합니다.
- `Node.js` (v14)과 `npm`을 설치합니다. ([How to install](https://nodejs.org/en/download/package-manager/))
    - 이번 예제에서는 v14를 지원하는 axios 및 caver-js를 사용합니다.


## ERC-20 Token Transfer (one-step) <a id="erc-20-token-transfer-onestep"></a>

### 1 단계 : 운영자 계정에 KLAY 추가하기<a id="step-1-add-klay-to-the-operator-accounts"></a>
SCN에 연결하여 `subbridge.parentOperator`와 `subbridge.childOperator`를 실행하여 계정 주소를 확인하세요.
```
$ kscn attach --datadir ~/data
> subbridge.childOperator
"0x10221f7f9355017cd0c11444e7eecb99621bacce"
> subbridge.parentOperator
"0x3ce216beeafc62d20547376396e89528e1d778ca"
```

![](../images/sc-vt-add-klay.png)

`subbridge.parentOperator` 및 `subbridge.childOperator`에는 트랜잭션을 보내기에 충분한 KLAY가 있어야 합니다. `subbridge.parentOperator`는 Baobab 네트워크의 계정이고 `subbridge.childOperator`는 ServiceChain 네트워크의 계정입니다. [Baobab Wallet](https://baobab.wallet.klaytn.foundation/)에서 테스트 계정을 만들고 faucet에서 테스트 KLAY를 받으세요.  그런 다음 일부 KLAY를 `parentOperator`에 전송합니다.  `childOperator`는 `homi`가 생성한 테스트 계정에서 KLAY를 가져와야 합니다([EN 설정 및 SCN 연결 가이드 참조](en-scn-connection.md)).

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
운영자 계정에 충분한 잔액이 있는지 확인하십시오.  서브브릿지가 설치된 SCN 노드의 콘솔에서 다음과 같이 조회할 수 있습니다.
```
> klay.getBalance(subbridge.childOperator)
1e+21
> subbridge.childOperatorBalance
1e+21
> subbridge.parentOperatorBalance
1e+18
```

### 2 단계 : 컨트랙트 배포 <a id="step-2-deploy-contracts"></a>
- SCN에 연결하여 컨트랙트 배포를 위한 노드 환경을 준비합니다. [servicechain-value-transfer-examples](https://github.com/klaytn/servicechain-value-transfer-examples) 저장소를 복제합니다.

![](../images/sc-vt-deploy.png)

이 단계에서는 브리지 컨트랙트와 토큰 컨트랙트를 부모 체인과 자식 체인에 모두 배포합니다. 토큰 컨트랙트는 발행/전송 테스트를 위한 것이고 브리지 컨트랙트는 토큰 전송 요청을 수신/처리하는데 사용됩니다.

```bash
$ git clone https://github.com/klaytn/servicechain-value-transfer-examples
$ cd servicechain-value-transfer-examples
$ npm install
$ cd erc20
```

텍스트 편집기에서 아래와 같이 `bridge_info.json`을 수정합니다.
- `child` 부분(ServiceChain 네트워크의 SCN 노드)에 있는 `url`을 SCN 노드 IP와 `kscnd.conf`에 있는 `RPC_PORT`의 포트 번호로 바꾸십시오.
- `child.key`를 `homi`가 생성한 `testkey1`로 교체합니다.
- `child.operator`를 이전 단계에서 조회한 `subbridge.childOperator` 주소로 설정합니다.
- `parent` 부분(Baobab 네트워크의 EN 노드)에 있는 `url`을 EN 노드 IP와 `kend.conf`의 `RPC_PORT`에 있는 포트 번호로 바꾸십시오.
- `parent.key`를 이전 단계에서 [Baobab Wallet](https://baobab.wallet.klaytn.foundation/)에서 생성한 테스트 계정의 개인 키로 대체합니다.
- `parent.operator`를 이전 단계의 `subbridge.parentOperator`로 설정합니다.

```
{
     "child" : {
         "url": "http://192.168.0.1:7551",
         "key": "0x66cb283353589a10866b58d388e9d956e5a9c873a8c78fa4411d460c19c494ea",
         "operator": "0x10221f7f9355017cd0c11444e7eecb99621bacce"
     },
     "parent" : {
         "url": "http://192.168.0.5:8551",
         "key": "0x26f4b5ac42ceabcfd3b23a991fdbfc792d10ce700a99582fdf9185a8f163b790",
         "operator": "0x3ce216beeafc62d20547376396e89528e1d778ca"
     }
 }
```

`node erc20-deploy.js`를 실행하여 토큰 컨트랙트를 배포합니다.  이 스크립트는 브리지 컨트랙트과 토큰 컨트랙트를 모두 배포하고 브릿지 쌍을 초기화하기 위한 API 사용법을 출력해 줍니다.
```
$ node erc20-deploy.js
------------------------- erc20-deploy START -------------------------
> info.bridge: 0xEa024d8101E112330f2d7B1a7e7932034E206721
> info.token: 0xbE641028610F628835C36F12bE62d54d74308D70
> info.bridge: 0xA5af6Ffe13b367626B5AdF827DdE7438E3Db4463
> info.token: 0x52F8Fa79Fa6D37b18b7AC8f9Ca835373f3C9270f
> subbridge.registerBridge("0xEa024d8101E112330f2d7B1a7e7932034E206721", "0xA5af6Ffe13b367626B5AdF827DdE7438E3Db4463")
> subbridge.subscribeBridge("0xEa024d8101E112330f2d7B1a7e7932034E206721", "0xA5af6Ffe13b367626B5AdF827DdE7438E3Db4463")
> subbridge.registerToken("0xEa024d8101E112330f2d7B1a7e7932034E206721", "0xA5af6Ffe13b367626B5AdF827DdE7438E3Db4463", "0xbE641028610F628835C36F12bE62d54d74308D70", "0x52F8Fa79Fa6D37b18b7AC8f9Ca835373f3C9270f")
------------------------- erc20-deploy END -------------------------
```

### Step 3: Token transfer <a id="step-3-token-transfer"></a>

![](../images/sc-vt-transfer.png)

`node erc20-transfer-1step.js`명령을 실행하여 토큰을 전송합니다.  ERC-20 토큰 컨트랙트의 구현을 수정하여 한번의 호출로(one-step) 토큰 전송이 가능합니다.  토큰 컨트랙트의 수정을 원하지 않거나 이미 배포된 토큰 컨트랙트가 있는 경우 [ERC-20 Token Transfer (two-step)](#erc-20-token-transfer-twostep)을 참조하십시오.

```
$ node erc20-transfer-1step.js
------------------------- erc20-transfer-1step START -------------------------
alice balance: 0
requestValueTransfer..
alice balance: 100
------------------------- erc20-transfer-1step END -------------------------
```

결과가 `alice balance: 100`이면 성공적으로 실행된 것입니다.

## ERC-20 Token Transfer (two-step) <a id="erc-20-token-transfer-twostep"></a>
2번의 호출로 토큰 전송하기 위해 <0>erc20-transfer-2step.js</0>를 실행합니다.  2번의 호출로 토큰 전송하는 예는 ERC-20 토큰 컨트랙트를 수정하지 않고 그대로 사용합니다. 먼저 (1) 브릿지 컨트랙트를 승인한 다음 (2) 컨트랙트 함수인 `requestERC20Transfer()`를 호출하는 단계로 구성됩니다. 브릿지 및 토큰 컨트랙트를 이미 배포했으므로 이번 단계에서는 컨트랙트를 배포하지 않습니다.  만약 컨트랙트를 배포하지 않은 경우 먼저 컨트랙트 배포를 진행해야 합니다.  `node erc20-deploy.js`명령으로 계약을 배포할 수 있습니다.
```
$ node erc20-transfer-2step.js
> ------------------------- erc20-transfer-2step START -------------------------
> alice balance: 100
> requestValueTransfer..
> alice balance: 200
------------------------- erc20-transfer-2step END -------------------------
```



## KIP-7 Token Transfer via ERC-20 Interface (two-step) <a id="kip-7-token-transfer-via-erc-20-interface-two-step"></a>
KIP-7은 ERC-20과 호환되는 토큰 표준입니다.  KIP-7 토큰 컨트랙트의 `requestERC20Transfer()` 함수를  호출하여 부모 체인과 자식 체인 간에 KIP-7 토큰을 전송할 수 있습니다. ERC-20 인터페이스를 통해 KIP-7 토큰을 전송하는 경우, 브릿지가 트랜잭션 발신자를 대신하여 토큰을 보낼 수 있도록 `approve()` 함수를 호출합니다.  그런 다음 `requestERC20Transfer()` 함수를 호출합니다. 아래 명령으로 브릿지 컨트랙트와 KIP-7 컨트랙트를 배포합니다.
```
$ node kip7-deploy.js
> ------------------------- kip7-deploy START -------------------------
> info.bridge: 0x04e929Cd2A08acd28a210369407D8Ca237Edd8FE
> info.token: 0xE0E2fC6C7d1eB069153E0c12a4C87B01586b39e7
> info.bridge: 0xEb502159A4B4E876B1cb423f250DCC0d276e01b6
> info.token: 0xd4f02Ca1d49674056A9ec78fbBDc9e1e97726A4F
> subbridge.registerBridge("0x04e929Cd2A08acd28a210369407D8Ca237Edd8FE", "0xEb502159A4B4E876B1cb423f250DCC0d276e01b6")
> subbridge.subscribeBridge("0x04e929Cd2A08acd28a210369407D8Ca237Edd8FE", "0xEb502159A4B4E876B1cb423f250DCC0d276e01b6")
> subbridge.registerToken("0x04e929Cd2A08acd28a210369407D8Ca237Edd8FE", "0xEb502159A4B4E876B1cb423f250DCC0d276e01b6", "0xE0E2fC6C7d1eB069153E0c12a4C87B01586b39e7", "0xd4f02Ca1d49674056A9ec78fbBDc9e1e97726A4F")
------------------------- kip7-deploy END -------------------------
```
아래 명령어는 `requestERC20Transfer()`와 함께 ERC-20 인터페이스를 사용하여 KIP-7 토큰을 보내는 예제입니다.

```
$ node kip7-transfer-2step-erc20-interface.js
> ------------------------- kip7-transfer-2step-erc20-interface START -------------------------
> alice balance: 0
> requestValueTransfer..
> alice balance: 100
> ------------------------- kip7-transfer-2step-erc20-interface END -------------------------
```

[service-chain-value-transfer-example](https://github.com/klaytn/servicechain-value-transfer-examples)을 참조하십시오.

## Native Support for KIP-7 and KIP-17 (To Be Implemented) <a id="native-support-for-kip-7-and-kip-17-to-be-implemented"></a>
현재 Klaytn 팀에서 제공하는 브릿지 컨트랙트는 토큰 전송을 위해 `requestERC20Transfer()` 및 `requestERC721Transfer()`만 지원합니다.  KIP-7 및 KIP-17에 대한 기능은 곧 지원될 예정입니다.  구현이 완료되기 까지는 위의 설명과 같이 ERC-20 인터페이스를 사용하여 KIP-7 토큰을 전송할 수 있습니다.

## ERC-721, KIP-17와 KLAY 토큰 전송<a id="value-transfer-for-erc721-kip17-and-klay"></a>
ERC-721, KIP-17, KLAY의 동작도 위와 동일합니다.  `erc721</a>`, [`kip17`](https://github.com/klaytn/servicechain-value-transfer-examples/tree/master/kip17) 및 [`klay`](https://github.com/klaytn/servicechain-value-transfer-examples/tree/master/klay) 디렉토리에 예제 소스 코드가 있습니다.</p>
