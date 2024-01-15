# 오라클 네트워크

## 소개

![](/img/build/tools/klaytnXorakl.png)

[오라클 네트워크](https://docs.orakl.network/docs/developers-guide/readme)는 스마트 컨트랙트가 오프체인 데이터 및 기타 리소스에 안전하게 접근할 수 있도록 하는 탈중앙화 오라클 네트워크입니다. 오라클은 데이터 피드, VRF, 요청-응답 솔루션을 제공하는 클레이튼 네이티브 오라클이라는 자부심을 가지고 있습니다.

오라클 네트워크를 통해 사용자는 스마트 컨트랙트에서 예측 불가능하고 편향되지 않은 무작위성을 확보할 수 있습니다. 오라클 네트워크 [검증 가능한 랜덤 함수(VRF)](https://docs.orakl.network/docs/developers-guide/verifiable-random-function-vrf#what-is-verifiable-random-function)는 스마트 컨트랙트가 VRF를 사용하여 검증 가능한 랜덤 값을 생성할 수 있도록 하며, 이는 무작위성이 필요한 다양한 dApp에서 사용될 수 있습니다.

오라클 네트워크는 개발자에게 두 가지 결제 방법을 통해 VRF 서비스에 대한 액세스를 제공합니다: [Prepayment](https://docs.orakl.network/docs/developers-guide/readme#prepayment) 또는 [Direct Method](https://docs.orakl.network/docs/developers-guide/readme#direct-payment). 이 튜토리얼에서는 오라클 네트워크의 VRF 기능을 활용하여 스마트 컨트랙트에서 난수를 요청합니다.

## 전제 조건

- [Kaikas](https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi?hl=en)
- [Remix IDE](https://remix.ethereum.org/)
- [Remix 클레이튼 플러그인](https://klaytn.foundation/using-klaytn-plugin-on-remix/)
- [Faucet](https://baobab.wallet.klaytn.foundation/faucet)에서 테스트 KLAY 얻기

## 시작하기

다음 단계에서는 오라클 네트워크를 사용하여 스마트 컨트랙트에서 난수를 요청합니다. 이제 시작해보겠습니다!

### 1단계: 직접 결제를 위한 초기화

스마트 컨트랙트에서 난수 요청을 하려면 [VRFCoordinator](https://github.com/Bisonai-CIC/orakl/blob/master/contracts/src/v0.1/VRFCoordinator.sol) 스마트 컨트랙트를 초기화해야 합니다.  생성자 파라미터를 통해 제공된 VRFCoordinator 주소와 VRFCoordinator 인터페이스를 본딩하여 난수 요청(requestRandomWordsPayment)에 사용하는 것을 권장합니다. 현재 클레이튼 테스트넷 Baobab에 컨트랙트 주소 [0xfa605ca6dc9414e0f7fa322d3fd76535b33f7a4f](https://baobab.scope.klaytn.com/account/0xfa605ca6dc9414e0f7fa322d3fd76535b33f7a4f)로 VRFCoordinator 컨트랙트가 배포되어 있습니다.

```solidity
import "@bisonai/orakl-contracts/src/v0.1/VRFConsumerBase.sol";
import "@bisonai/orakl-contracts/src/v0.1/interfaces/VRFCoordinatorInterface.sol";

contract VRFConsumer is VRFConsumerBase {
  VRFCoordinatorInterface COORDINATOR;
  constructor(address coordinator) VRFConsumerBase(coordinator) {
      COORDINATOR = VRFCoordinatorInterface(coordinator);
  }
}
```

### 2단계: 컨트랙트 상태 변수 초기화

이 단계에서는 컨트랙트 기능에 필요한 상태 변수를 초기화합니다. 여기에는 난수 결과를 저장하는 s_randomResult 변수, onlyOwner 수정자에 사용되는 s_owner 변수, callbackGasLimit 변수, 반환할 난수의 양을 나타내는 keyHash 변수 및 numWord 변수가 포함됩니다.

```solidity
  uint256 public s_randomResult;

  address private sOwner;

   bytes32 keyHash = 0x47ede773ef09e40658e643fe79f8d1a27c0aa6eb7251749b268f829ea49f2024;

   uint32 callbackGasLimit = 500000;

   uint32 numWords = 1;

  error OnlyOwner(address notOwner);
  modifier onlyOwner() {
      if (msg.sender != sOwner) {
          revert OnlyOwner(msg.sender);
      }
      _;
  }
  constructor(address coordinator) VRFConsumerBase(coordinator) {
      COORDINATOR = VRFCoordinatorInterface(coordinator);
      sOwner = msg.sender;
  }
```

### 3단계: 직접 결제로 무작위 단어 요청(소비자)

직접 메서드를 사용하여 난수를 요청하려면 사용자는 value 속성을 사용하여 호출과 함께 $KLAY를 보내야 합니다.

```solidity

receive() external payable {}

function requestRandomWordsDirect(
    bytes32 keyHash,
    uint32 callbackGasLimit,
    uint32 numWords
)
    public
    payable
    onlyOwner
    returns (uint256 requestId)
{
  requestId = COORDINATOR.requestRandomWordsPayment{value: msg.value}(
    keyHash,
    callbackGasLimit,
    numWords
  );
}
```

위 코드는 COORDINATOR 컨트랙트에 정의된 `requestRandomWordsPayment()` 함수를 호출하고 키해시, 콜백가스한도, 눔워즈를 인자로 전달하는 함수에 대해 설명합니다. 서비스 대금은 msg.value를 통해 COORDINATOR 컨트랙트의 requestRandomWordsPayment()로 전송됩니다. 결제 금액이 예상 결제 금액보다 클 경우 초과 결제 금액은 requestRandomWordsPayment 함수의 호출자에게 반환되므로 사용자 컨트랙트에서 코드 상단에 표시된 것처럼 [receive()](https://docs.soliditylang.org/en/v0.8.16/contracts.html#receive-ether-function) 함수를 정의해야 합니다.

### 4단계: 무작위 단어 채우기

이 함수는 난수 요청을 이행할 때 VRFCoordinator 컨트랙트에 의해 호출됩니다.

```solidity
function fulfillRandomWords(
    uint256 /* requestId */,
    uint256[] memory randomWords
)
    internal
    override
{
    // requestId should be checked if it matches the expected request
    // Generate random value between 1 and 50.
    s_randomResult = (randomWords[0] % 50) + 1;
}
```

이제 오라클 VRF 솔루션 코드가 생겼으니 실제로 작동하는 모습을 확인해 보겠습니다.

## 실제 구현

아래 예시에서 컨트랙트는 당사가 난수를 요청하고 요청을 이행할 수 있는 권한을 제공합니다.

### 샘플 코드 생성 및 배포

**Remix IDE**

- [Remix IDE](https://remix.ethereum.org/)로 이동합니다.
- 파일 탐색기 탭을 클릭하고 contracts 폴더에 demoOraklDirectVRF.sol이라는 새 파일을 생성합니다.
- 새로 생성한 파일에 아래 코드를 붙여넣습니다.
- Remix에서 **Compile contract**을 클릭합니다.
- 플러그인을 설치한 후 왼쪽의 클레이튼 탭을 클릭합니다.
- **Environment** > **Injected Caver** - **Kaikas**를 선택합니다.
- Contract에서 컨트랙트를 선택합니다. (예: VRFConsumer)
- 코디네이터 컨트랙트 주소 `0xfa605ca6dc9414e0f7fa322d3fd76535b33f7a4f`를 전달합니다.
- **Deploy**를 클릭합니다..

**샘플 코드**

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;
import "@bisonai/orakl-contracts/src/v0.1/VRFConsumerBase.sol";
import "@bisonai/orakl-contracts/src/v0.1/interfaces/VRFCoordinatorInterface.sol";
contract VRFConsumer is VRFConsumerBase {
  VRFCoordinatorInterface COORDINATOR;
  // stores random number after request;
  uint256 public s_randomResult;
  // stores owner
  address private sOwner;
   bytes32 keyHash = 0x47ede773ef09e40658e643fe79f8d1a27c0aa6eb7251749b268f829ea49f2024;
   uint32 callbackGasLimit = 500000;
   uint32 numWords = 1;
  error OnlyOwner(address notOwner);
  modifier onlyOwner() {
      if (msg.sender != sOwner) {
          revert OnlyOwner(msg.sender);
      }
      _;
  }
  constructor(address coordinator) VRFConsumerBase(coordinator) {
      COORDINATOR = VRFCoordinatorInterface(coordinator);
      sOwner = msg.sender;
  }
  // https://baobab.scope.klaytn.com/account/0xfa605ca6dc9414e0f7fa322d3fd76535b33f7a4f
  receive() external payable {}
function requestRandomWordsDirect()
    public
    payable
    onlyOwner
    returns (uint256 requestId)
{
  requestId = COORDINATOR.requestRandomWordsPayment{value: msg.value}(
    keyHash,
    callbackGasLimit,
    numWords
  );
}
function fulfillRandomWords(
    uint256 /* requestId */,
    uint256[] memory randomWords
)
    internal
    override
{
    // requestId should be checked if it matches the expected request
    // Generate random value between 1 and 50.
    s_randomResult = (randomWords[0] % 50) + 1;
}
}
```

![](/img/build/tools/orakl-vrf-deploy.png)

### 스마트 컨트랙트와의 상호작용

스마트 컨트랙트에서 난수를 요청하려면 먼저 `requestRandomWordsDirect()` 함수를 실행해야 합니다. 이 함수가 성공적으로 실행되려면 앞서 설명한 대로 사용자가 KLAY(최소 1 KLAY)를 보내야 합니다. 이후 요청이 완료되면 `s_randomResult()` 함수를 실행할 수 있습니다. 이 s_randomResult() 함수는 난수를 반환합니다.

- **requestRandomWordsDirect()**: 이 함수를 실행하기 위해 1 KLAY를 전송합니다. 아래 이미지가 이를 설명합니다:

![](/img/build/tools/orakl-vrf-request.png)

- **s_randomResult()**: VRFCoordinator가 난수 요청을 수행한 후 응답은 s_randomResult 변수에 저장됩니다. 응답을 얻으려면 `s_response()` 함수를 호출합니다.

![](/img/build/tools/orakl-vrf-response.png)

축하합니다! 방금 스마트 컨트랙트에 난수를 요청하셨습니다.

## 결론

이 튜토리얼에서는 오라클 네트워크 VRF 솔루션을 사용하여 스마트 콘트랙트에서 난수를 생성하는 방법을 배웠습니다. 오라클 네트워크는 가격 피드, 데이터 요청-응답 등과 같은 더 많은 오라클 서비스를 제공합니다. 오라클 네트워크와 작동 방식에 대한 자세한 가이드는 [오라클 네트워크 문서](https://docs.orakl.network/docs/developers-guide/readme)를 참고하시기 바랍니다.
