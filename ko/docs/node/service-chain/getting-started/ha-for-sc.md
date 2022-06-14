ServiceChain에서 하나의 브리지만 사용하는 경우, 해당 브리지가 단일 실패 지점이 될 수 있습니다. 이를 해결하기 위해 두 개 이상의 브리지로 고가용성 시스템을 구축하는 방법을 설명합니다.  아래 그림과 같이 최소 두개 이상의 브릿지가 연결되어 있다면, 한 브릿지가 연결 상 문제가 있다고 하더라도 다른 브릿지를 통해 체인간 데이터 앵커링 및 토큰 전송이 정상적으로 수행될 수 있습니다.

![](../images/sc-ha-arch.png)


## 준비 사항 <a id="prerequisites"></a>
 - EN의 메인 브릿지와 SCN의 서브 브릿지가 연결되어 있습니다.  그렇지 않은 경우, [Baobab 연결](./en-scn-connection.md)을 참조하세요
 - 이번 섹션에서는 Baobab과 ServiceChain 사이에 추가로 브릿지를 하나 더 연결하는 방법을 설명합니다. <0>Baobab 연결</0>과 같은 방법으로 브리지를 하나 더 추가하여 HA를 구성할 수 있습니다.

## 1단계: EN-SCN 간에 다른 브릿지 추가 <a id="step-1-adding-another-bridge-between-en-scn"></a>

지난 [Baobab 연결](./en-scn-connection.md)에서 EN-01과 SCN-L2-01로 연결된 브릿지가 있다고 가정합니다.  이번 섹션에서는 EN-02와 SCN-L2-02 사이에 또 다른 브릿지를 추가합니다. 이전과 동일한 절차로 진행되므로 여기서는 간단히 설명합니다.


![](../images/sc-ha-add-bridge.png)

EN-02의  `conf/kend.conf`  파일에서 `SC_MAIN_BRIDGE`을 1로 설정하고, ken을 다시 시작합니다.

```console
SC_MAIN_BRIDGE=1
```

다음 명령어로 EN-02의 KNI 정보를 확인합니다.


```console
EN-02$ ken attach --datadir ~/data
> mainbridge.nodeInfo.kni
"kni://eb8f21df10c6562...25bae@[::]:50505?discport=0"
```

SCN-L2-02에 접속한 후 EN-02의 KNI 정보로 `main-bridges.json` 파일을 만듭니다.  해당 파일은 대괄호 속에 KNI 정보가 있는 형식이라는 점에 주의해야 합니다.


```console
SCN-L2-02$ echo '["kni://eb8f21df10c6562...25bae@192.168.0.5:50505?discport=0"]' > ~/data/main-bridges.json
```

아래와 같이 SCN-L2-02의 셸에서 `kscn-XXXXX-amd64/conf/kscnd.conf` 파일을 편집합니다. 브리지를 활성화하려면 `SC_SUB_BRIDGE`를 1로 설정합니다. `SC_PARENT_CHAIN_ID`는 Baobob의 `chainID 1001`로 설정합니다. `SC_ANCHORING_PERIOD`는 부모 체인(Baobab)으로 앵커링 트랜잭션을 보낼 주기를 설정하는 매개변수입니다.  이 예제에서 앵커 트랜잭션은 10개의 자식 블록마다 부모 체인(Baobab)으로 전송됩니다.
```
...
SC_SUB_BRIDGE=1
...
SC_PARENT_CHAIN_ID=1001
...
SC_ANCHORING_PERIOD=10
...
```


EN-02에서 ken을 다시 시작하면, EN-02과 SCN-L2-02 사이에 브릿지가가 자동으로 연결되고, 브릿지가 연결된 지점부터 데이터 앵커링이 시작됩니다.

EN-02와 SCN-L2-02 사이에 브릿지가 추가되어, 아래 그림과 같이 두 노드 사이에 브릿지로 연결된 것을 볼 수 있습니다.

![](../images/sc-ha-before-register.png)

## 2단계: 브릿지 스마트 컨트랙트 등록 및 구독<a id="step-2-registering-and-subscribing-the-bridge-contract"></a>

위의 그림과 같이 브릿지 컨트랙트에는 EN-01과 SCN-L2-01의 브릿지만 등록되어 있습니다.

SCN-L2-02의 kscn 콘솔에 접속하여 브릿지 등록, 구독 및 토큰 등록을 위한 명령어를 실행합니다.  브릿지 및 토큰 컨트랙트는 이전 [Cross-Chain Value Transfer](./value-transfer.md)의 2단계에서 배포 되었습니다.

```
$ kscn attach --datadir ~/data
> subbridge.registerBridge("0xCHILD_BRIDGE_ADDR", "0xPARENT_BRIDGE_ADDR")
null
> subbridge.subscribeBridge("0xCHILD_BRIDGE_ADDR", "0xPARENT_BRIDGE_ADDR")
null
> subbridge.registerToken("0xCHILD_BRIDGE_ADDR", "0xPARENT_BRIDGE_ADDR", "0xCHILD_TOKEN_ADDR", "0XPARENT_TOKEN_ADDR")
null
```

![](../images/sc-ha-before-register2.png)

추가된 브릿지에 대한 정보가 브릿지 컨트랙트에 반영되어야 합니다.  [service-chain-value-transfer-example](https://github.com/klaytn/servicechain-value-transfer-examples)의 `erc20/erc20-addOperator4HA.js` 파일에 추가된  브릿지의 자식 및 부모 오퍼레이터 정보로 변경하고 `node erc20-addOperator4HA.js`를 실행합니다.

```
// register operator
await conf.child.newInstanceBridge.methods.registerOperator("0xCHILD_BRIDGE_ADDR").send({ from: conf.child.sender, gas: 100000000, value: 0 });
await conf.parent.newInstanceBridge.methods.registerOperator("0xPARENT_BRIDGE_ADDR").send({ from: conf.parent.sender, gas: 100000000, value: 0 });
```

브리지가 여러 개인 경우 임계값을 설정하여 더욱 안전하게 토큰 전송을 할 수 있습니다.  임계값 이상의 운영자들이 토큰 전송을 요청하는 경우에만 토큰 전송이 가능해 집니다.  예를 들어 현재 예제와 같이 브릿지가 2개 있고 임계값이 2로 설정되어 있으면, 두 브릿지의 오퍼레이터들이 모두 정상적으로 토큰 전송을 요청해야만 토큰 전송이 가능합니다.  만약 하나의 브릿지가 공격을 받아서 비정상적인 요청을 보내는 경우에 토큰 전송이 실행되지 않습니다.  입계값은 기본값은 1입니다.  아래 코드의 주석을 제거하고 임계값을 설정하는 코드를 실행하면 브릿지 컨트랙트의 임계값을 변경할 수 있습니다. .

```
// // set threshold
// await conf.child.newInstanceBridge.methods.setOperatorThreshold(0, "your threshold number").send({ from: conf.child.sender, gas: 100000000, value: 0 });
// await conf.parent.newInstanceBridge.methods.setOperatorThreshold(0, "your threshold number").send({ from: conf.parent.sender, gas: 100000000, value: 0 });
```


아래 그림과 같이 브릿지 컨트랙트에 EN-02와 SCN-L2-02 사이의 브릿지가 등록되어 HA를 구성합니다.

![](../images/sc-ha-after-register.png)


HA를 위해 두 개 이상의 브릿지가 연결되면 동일한 블록에 대한 데이터 앵커링 트랜잭션이 두 번 이상 발생하고, 토큰 전송을 위한 트랜잭션도 여러 번 발생할 수 있습니다.  즉, HA 구성으로 인해 수수료가 더 발생할 수 있다는 점에 주의하셔야 합니다.