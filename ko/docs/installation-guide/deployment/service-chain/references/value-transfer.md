Klaytn 디자인 장에 설명된대로 서비스체인은 부모/자식 체인간 밸류(KLAY, ERC-20 및 ERC-721) 트랜스퍼를 지원합니다. 이 페이지는 SCN에서 밸류 트랜스퍼 기능을 활성화하는 방법을 보여줍니다.

EN과 SCN을 설정한 후 체인 간 밸류 트랜스퍼를 활성화하려면 다음 절차가 필요합니다.

1. 브리지 오퍼레이터 계정의 주소를 확인하고 브리지 오퍼레이터 계정에 KLAY를 추가하세요.
2. 브리지 컨트랙트를 부모/자식 체인에 배포하세요.
3. 부모/자식 체인에 토큰(ERC-20 또는 721) 컨트랙트를 배포하세요. (KLAY 전송만 필요하면 3 & 4 단계는 건너뛰세요.) 부모/자식 체인에 있는 브리지 컨트랙트에 토큰 컨트랙트를 등록하세요.
4. 부모/자식 체인에 있는 브리지 컨트랙트에 토큰 컨트랙트를 등록하세요.
5. 부모/자식 체인에 있는 브리지 컨트랙트를 구독하세요.

각 단계를 수행하기 전에 동작 메커니즘을 이해하기 위해 개략적인 시스템 구조를 살펴 보겠습니다.

# 시스템 구조<a id="system-architecture"></a>
그림 1은 브리지/토큰 컨트랙트 및 브리지 노드가 있는 서비스체인의 시스템 구조입니다.

아래 컨트랙트들은 메인/서브 브리지를 통해 서로 통신하여 사용자의 밸류 트랜스퍼 요청을 처리합니다.
- 브리지 컨트랙트
- ERC-20 컨트랙트 (필요한 경우)
- ERC-721 컨트랙트 (필요한 경우)

![그림 1. 서비스체인 구조](../images/sc_arch.png)

# 브리지 오퍼레이터 계정<a id="bridge-operator-account"></a>
For ServiceChain, there are two operator accounts: parent chain bridge operator account, service chain bridge operator account. 각 오퍼레이터 계정은 트랜잭션 서명에 사용됩니다. 만일 트랜잭션이 부모체인으로 가치를 전송하면 부모 체인 브리지 오퍼레이터 계정이 트랜잭션에 서명합니다. 자식 체인으로 자치를 전송할때는 자식 체인 브리지 오퍼레이터 계정이 사용됩니다. 사용자가 "request value transfer" 트랜잭션을 제출하면 서브 브리지는 브리지 오퍼레이터 계정이 서명한 "handle value transfer" 트랜잭션을 생성합니다. 따라서 부모 체인 브리지 운영자는 트랜잭션 수수료를 부모 체인에 지불할 수 있는 충분한 KLAY 잔액이 필요합니다. 서비스체인의 가스 가격이 0이 아닌 값으로 설정되어 있다면 서비스체인 브리지 오퍼레이터도 KLAY 잔액을 보유해야 합니다.

## 키스토어와 패스워드 파일<a id="keystore-and-password-file"></a>
SCN이 부팅될 때 제공된 키가 없으면 부모/자식 오퍼레이터를 위한 키스토어 파일 및 패스워드 파일이 자동으로 생성됩니다. 특정 계정을 오퍼레이터로 사용하려면 해당 계정의 키를 제공하면 됩니다. SCN을 부팅하기 전에 아래 파일들을 지정된 경로에 넣으세요. 패스워드 파일에는 키스토어 파일의 비밀번호 문자열이 있어야 합니다. 패스워드 파일 이름은 해당 키스토어 파일의 계정 주소여야 합니다.

**파일**
- 키스토어 파일 : `UTC--2019-10-21T04-05-41.493850000Z--2ed72a9d7fe5da7672fd21567e07302431649b0b`
- 패스워드 파일 : `0x2eD72a9D7fe5da7672fD21567e07302431649B0B`

**파일 경로**
- 부모 체인 브리지 오퍼레이터 : $datadir/ parent_bridge_account
- 자식 체인 브리지 오퍼레이터 : $datadir/ child_bridge_account

```javascript
> pwd
/$dataDIR/child_bridge_account

> ls
0x2eD72a9D7fe5da7672fD21567e07302431649B0B
UTC--2019-10-21T04-05-41.493850000Z--2ed72a9d7fe5da7672fd21567e07302431649b0b

> cat 0x2eD72a9D7fe5da7672fD21567e07302431649B0B
%S~f5qqM38cB47jL%

> cat UTC--2019-10-21T04-05-41.493850000Z--2ed72a9d7fe5da7672fd21567e07302431649b0b
{"address":"2ed72a9d7fe5da7672fd21567e07302431649b0b","crypto":{"cipher":"aes-128-ctr","ciphertext":"6486509e8158bf4984608cbc5562cf2c9a27cd988a98e543731b39251144e633","cipherparams":{"iv":"96d7e5b6a936278c0797faae6cb3d903"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"8928ba41b8228af19390ec881c51452fa3ea973ad2c253ca0f5bc9197a8b24c4"},"mac":"9c8ec63694c20a473e0ea33840e7d16e9f1a20afc52b3244b703a3ac0a66cfa3"},"id":"9ae10527-7fd3-4aae-a4eb-316af211494e","version":3}
```
## 브리지 오퍼레이터 주소 확인 <a id="check-bridge-operator-addresses"></a>
SCN을 성공적으로 실행했다면 다음과 같이 RPC API를 사용하여 부모/자식 체인 브리지 오퍼레이터 주소를 확인할 수 있습니다.

```
$ kscn attach ~/kscnd_home/klay.ipc
Welcome to the Klaytn JavaScript console!

instance: Klaytn/vvX.X.X/XXXX-XXXX/goX.X.X

 datadir: ~/kscnd_home
 modules: admin:1.0 subbridge:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 servicechain:1.0 txpool:1.0

> subbridge.parentOperator
"0xA057995175B93Ee0D1bdfA54f078Ad0F0116130b"
> subbridge.childOperator
"0x5C1C757a6Cb6c6FcEFE398674D8209FDA2A74Df4"
```

상세 사항은 [subbridge API](../../../bapp/json-rpc/api-references/subbridge.md#subbridge_parentOperator)를 참조하세요.

## 브리지 오퍼레이터에게 KLAY 보내기 <a id="send-klay-to-bridge-operators"></a>
앵커링과 마찬가지로 부모 체인 브리지 오퍼레이터는 밸류 트랜스퍼 트랜잭션을 생성하기 위해 KLAY가 필요합니다. 서비스체인의 가스 가격이 0이 아닌 값으로 설정되어 있다면 서비스체인 브리지 오퍼레이터도 KLAY 잔액을 보유해야 합니다.

오퍼레이터 계정에 잔액을 보충한 후 아래와 같이 잔액을 확인할 수 있습니다.

**부모 체인 브리지 오퍼레이터**
```
$ kscn attach ~/kscnd_home/klay.ipc
Welcome to the Klaytn JavaScript console!

 instance: Klaytn/vvX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/kscnd_home
 modules: admin:1.0 subbridge:1.0 debug:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0

> subbridge.parentOperatorBalance
1e+50
```

**자식 체인 브리지 오퍼레이터**
```
$ kscn attach ~/kscnd_home/klay.ipc
Welcome to the Klaytn JavaScript console!

 instance: Klaytn/vvX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/kscnd_home
 modules: admin:1.0 subbridge:1.0 debug:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0

> subbridge.childOperatorBalance
1e+50
```

# 브리지 컨트랙트<a id="bridge-contract"></a>
체인 간 밸류 트랜스퍼를 위해서는 브리지 컨트랙트를 부모/자식 체인에 배포해야 합니다. 사용자는 브리지 컨트랙트에 KLAY 전송을 요청하여 KLAY를 다른 체인으로 보낼 수 있습니다. 또한 토큰 컨트랙트가 브리지 컨트랙트에 등록된 경우 브리지 컨트랙트는 부모 체인과 자식 체인 간의 토큰 전송을 처리할 수 있습니다.

## 배포<a id="deployment"></a>
서브 브리지는 브리지 컨트랙트 배포 API를 제공합니다. 아래와 같이 단일 RPC 호출을 사용하여 브리지 컨트랙트를 두 체인에 모두 배포할 수 있습니다. 이 일을 하기 전에 메인 브리지와 서브 브리지가 연결되어 있어야 합니다.  자세한 가이드라인은 [브리지 설정](bridge-configuration.md)을 참조하세요.

```javascript
$ kscn attach ~/kscnd_home/klay.ipc
Welcome to the Klaytn JavaScript console!

instance: Klaytn/vvX.X.X/XXXX-XXXX/goX.X.X

 datadir: ~/kscnd_home
 modules: admin:1.0 subbridge:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 servicechain:1.0 txpool:1.0

> subbridge.deployBridge()
["0x27caeba831d98b5fbb1d81ce0ed20801702f443a", "0x22c41ae528627b790233d2e59ea520be12350eb5"]

> subbridge.listBridge
[{
    localAddress: "0x27caeba831d98b5fbb1d81ce0ed20801702f443a",
    remoteAddress: "0x22c41ae528627b790233d2e59ea520be12350eb5",
    subscribed: false
}]
```
상세 사항은 [subbridge API](../../../bapp/json-rpc/api-references/subbridge.md#subbridge_deployBridge)를 참조하세요.

`subbridge_listBridge`는 브리지 컨트랙트 주소 및 구독 상태를 보여줍니다. 서브 브리지는 브리지 컨트랙트 주소 목록을 파일에 저장합니다. 재부팅시 서브 브리지는 파일에서 브리지 컨트랙트 목록을 다시 로드합니다.

## 구독(Subscribe)<a id="subscribing"></a>
브리지 컨트랙트를 배포한 후 서브 브리지가 배포된 브리지 컨트랙트를 구독해야 밸류 트랜스퍼가 가능합니다. 이는 다른 RPC API인 `subbridge_subscribeBridge`를 호출하여 수행할 수 있습니다.

```javascript
> subbridge.subscribeBridge("0x27caeba831d98b5fbb1d81ce0ed20801702f443a", "0x22c41ae528627b790233d2e59ea520be12350eb5")
null

> subbridge.listBridge
[{
    localAddress: "0x27caeba831d98b5fbb1d81ce0ed20801702f443a",
    remoteAddress: "0x22c41ae528627b790233d2e59ea520be12350eb5",
    subscribed: true
}]
```

## 상태 확인<a id="checking-status"></a>
구독을 하면 SCN은 사용자의 "request value transfer" 트랜잭션을 자동으로 처리합니다. 이 장에서는 브리지 컨트랙트 상태를 확인하는 방법에 대해 설명합니다.

브리지 컨트랙트에는 `requestNonce`와 `handleNonce` 두 개의 논스가 있습니다. 체인 내부 트랜잭션과 달리, 서브 브리지는 높은 논스 값을 가진 트랜잭션 요청을 먼저 처리할 수 있습니다.
- requestNonce : 사용자가 이 브리지 컨트랙트에 요청한 "체인 간 밸류 트랜스퍼" 요청 수 입니다.
- handleNonce : 서브 브리지가 처리한 가장 높은 논스.
- lowerHandleNonce : 서브 브리지가 처리해야 하는 가장 낮은 논스.

따라서 논스가 다음과 같이 업데이트 되면 체인 간 밸류 트랜스퍼가 정상적으로 처리되고 있다고 말할 수 있습니다.
- 부모 체인 브리지 컨트랙트의 "handleNonce"와 "lowerHandleNonce" 값이 자식 체인 브리지 컨트랙트의 "requestNonce" 값을 향해 증가합니다.
- "handleNonce"와 "lowerHandleNonce" 값이 부모 체인 브리지 컨트랙트의 "requestNonce" 값을 향해 증가합니다.

"handleNonce"가 상대 브리지 컨트랙트의 "requestNonce"와 같고 "lowerHandleNonce"가  "handleNonce"보다 1만큼 크면 사용자 요청이 모두 처리 된 것입니다.

### 로그 <a id="log"></a>
Below is a typical log output from a SCN during normal operation. 1초마다 브리지 컨트랙트의 상태가 출력됩니다.
```
INFO[10/16,19:37:40 +09] [45] VT : Parent -> Child Chain                request=8699 handle=4826 lowerHandle=4826 pending=3873
INFO[10/16,19:37:40 +09] [45] VT : Child -> Parent Chain                request=7894 handle=4207 lowerHandle=4207 pending=3687
```
이 로그는 request, handle, lowerHandle 그리고 pending 논스를 보여줍니다. 각각의 값의 의미는 아래와 같습니다.

- request : 구독한 모든 브리지 컨트랙트의 밸류 트랜스퍼 요청 논스의 합.
- handle : 구독한 모든 브리지 컨트랙트의 upper handle nonce의 합.
- lowerHandle : 구독한 모든 브리지 컨트랙트의 lower handle nonce의 합.
- pending : `request`와 ` lowerHandle`의 차이.

### RPC API <a id="rpc-api"></a>
다음과 같이 브리지 컨트랙트의 상태를 확인할 수 있습니다. 상세 사항은 [subbridge API](../../../bapp/json-rpc/api-references/subbridge.md#subbridge_getBridgeInformation)를 참조하세요.

```javascript
> subbridge.getBridgeInformation("0x27caeba831d98b5fbb1d81ce0ed20801702f443a")
{
  counterPart: "0x22c41ae528627b790233d2e59ea520be12350eb5",
  handleNonce: 0,
  lowerHandleNonce: 0,
  isRunning: true,
  isSubscribed: true,
  onServiceChain: true,
  pendingEventSize: 0,
  requestNonce: 0
}
```

# 토큰 컨트랙트(ERC-20/721) <a id="token-contract-erc-20-721"></a>
서비스체인은 ERC-20/721 전송도 지원합니다. 이를 지원하기 위해 서비스체인 호환 ERC-20/721토큰 컨트랙트를 부모/자식 체인에 모두 배포해야 합니다. For the ERC-20/721 token contract code, you can refer to the [Token standard](../../../../smart-contract/token-standard.md).

## 배포<a id="deployment"></a>
SCN은 아직 ERC-20/721 토큰을 배포하는 API를 지원하지 않습니다. caver-js를 통해 토큰을 배포해야 합니다. ERC-20/721 컨트랙트를 배포할 때 올바른 브리지 오퍼레이터 계정을 사용해야 합니다. 부모 체인에 배포할 때는 부모 오퍼레이터 계정을 사용하고 자식 체인에 배포할 때는 자식 오퍼레이터 계정을 사용하세요. 잘못된 계정으로 토큰 컨트랙트를 배포한 경우 밸류 트랜스퍼가 작동하지 않으며 올바른 계정으로 토큰 컨트랙트를 다시 배포해야 합니다.

## 등록(Register)  <a id="register"></a>
토큰 컨트랙트를 배포한 후에는 아래와 같이 부모/자식 체인의 브리지 컨트랙트에 토큰 컨트랙트를 등록해야합니다.
```javascript
> subbridge.registerToken("0x27caeba831d98b5fbb1d81ce0ed20801702f443a", "0x22c41ae528627b790233d2e59ea520be12350eb5", "0x376b72abe1b29cace831bd3f5acdfa967814c9cd", "0x53160735f7cc6ff75e48619f368bb94daff66a1b")
null
```

이 명령은 자식 체인 토큰("0x376b72abe1b29cace831bd3f5acdfa967814c9cd")을 자식 체인 브리지 컨트랙트("0x27caeba831d98b5fbb1d81ce0ed20801702f443a")에 등록합니다. 그리고 부모 체인 토큰("0x53160735f7cc6ff75e48619f368bb94daff66a1b")을 부모 체인 브리지 컨트랙트("0x22c41ae528627b790233d2e59ea520be12350eb5")에 등록합니다.

상세 사항은 [Service Chain API](../../../bapp/json-rpc/api-references/subbridge.md#subbridge_registerToken)를 참조하세요.

# 밸류 트랜스퍼 요청<a id="request-value-transfer"></a>
이 장에서는 사용자가 밸류 트랜스퍼를 요청하기 위해 컨트랙트 메서드를 호출하는 방법에 대해 설명합니다. 0값 (KLAY/ERC-20) 전송 요청은 허용하지 않습니다.

## KLAY 전송<a id="klay-transfer"></a>
사용자는 아래 메서드를 사용하여 "request value transfer" 트랙잭션을 **브리지 컨트랙트**에 요청할 수 있습니다.

### fallback <a id="fallback"></a>

사용자가 브리지의 fallback 함수를 호출하면 이는 상대 체인으로 KLAY 전송을 요청하는데, 전송받는 주소는 요청한 사용자의 계정 주소와 동일합니다.

```solidity
function () external payable;
```

### requestKLAYTransfer <a id="requestklaytransfer"></a>

사용자가 `_to`를 지정하여 이 함수를 호출하면, 이는 상대 체인의 `_to` 주소로 KLAY 전송을 요청합니다.

```solidity
function requestKLAYTransfer(address _to, uint256 _value, bytes calldata _extraData) external payable
```

## ERC-20 전송<a id="erc-20-transfer"></a>

### 브리지 컨트랙트를 통한 2단계 요청 <a id="2-step-request-via-bridge-contract"></a>
사용자는 아래 함수를 사용하여 "request value transfer" 트랜잭션을 브리지 컨트랙트에 요청할 수 있는데, 이 전에 토큰이 브리지 컨트랙트를 [approve](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md#approve)했어야 합니다.

```solidity
function requestERC20Transfer(address _tokenAddress, address _to, uint256 _value,uint256 _feeLimit,bytes memory _extraData) external
```

### ERC-20 컨트랙트를 통한 1단계 요청 <a id="1-step-request-via-erc-20-contract"></a>
사용자는 아래 메서드를 사용하여 "request value transfer" 트랜잭션을 **ERC-20 컨트랙트에** 직접 요청할 수 있는데, 이 때는 토큰이 브리지 컨트랙트를 approve하지 않아도 됩니다. 단, ERC-20 컨트랙트가 이 함수를 반드시 구현해야 합니다.

```solidity
function requestValueTransfer(uint256 _amount, address _to, uint256 _feeLimit, bytes calldata _extraData) external
```

## ERC-721 전송<a id="erc-721-transfer"></a>

### 브리지 컨트랙트를 통한 2단계 요청 <a id="2-step-request-via-bridge-contract"></a>
사용자는 아래 함수를 사용하여 "request value transfer" 트랜잭션을 브리지 컨트랙트에 요청할 수 있는데, 이 전에 토큰이 브리지 컨트랙트를 [approve](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md#approve)했어야 합니다.

```solidity
function requestERC721Transfer(address _tokenAddress, address _to, uint256 _tokenId, bytes memory _extraData) external
```

### ERC-721 컨트랙트를 통한 1단계 요청 <a id="1-step-request-via-erc-721-contract"></a>
사용자는 아래 메서드를 사용하여 "request value transfer" 트랜잭션을 **ERC-721 컨트랙트에** 직접 요청할 수 있는데, 이 때는 토큰이 브리지 컨트랙트를 approve하지 않아도 됩니다. 단, ERC-721 컨트랙트가 이 함수를 반드시 구현해야 합니다.

```solidity
function requestValueTransfer(uint256 _uid, address _to) external
```

# Value Transfer Recovery
Value transfer request may be fail for a number of reasons. Say you requested KLAY transfer from subbridge to mainbridge or from mainbridge to subbridge. In that case, the bridge contract on the receiver side must have enough KLAY than the requested amount of KLAY. If not, the transfer would fail without error notification in the return value. A feature of value transfer recovery finds unhandled events and insert them into event pool again in a given interval, which means the failed transaction can be succeed again when the counterpart bridge can successfully handle that event. In case of the above example, the failed transaction would be eventually handled by value transfer recovery when the counterpart bridge has enough KLAY. In order to set the value transfer recovery as default, you need to set two properties:
```
SC_VTRECOVERY=1
SC_VTRECOVERY_INTERVAL=5
```
The value transfer recovery runs automatically by set `SC_VTRECOVERY=1`. `SC_VTRECOVERY_INTERVAL` means an interval how often the value transfer recovery is executed.

# Collecting Fee for KLAY/ERC-20 transfer <a id="collecting-fee-for-klay-erc-20-transfer"></a>
In ServiceChain, there is a fee collecting feature for KLAY/ERC-20 transfers.

**To be updated soon.**

# Customizing your Bridge Contract  <a id="customizing-your-bridge-contract"></a>
In ServiceChain, you can use your own customized Bridge contract that inherits from the original Bridge contract for your own unique service. This section explains how to customize the Bridge contract and presents the example code.

**It will be updated soon.**

