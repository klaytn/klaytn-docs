# 오라클 네트워크

## 소개

![](/img/build/tools/klaytnXorakl.png)

[Orakl Network](https://docs.orakl.network) is a decentralized oracle network that allows smart contracts to securely access off-chain data and other resources. It prides itself in being a native token oracle that provides [Data Feed](https://docs.orakl.network/developers-guide/data-feed), [VRF](https://docs.orakl.network/developers-guide/vrf), [Request-Response](https://docs.orakl.network/developers-guide/request-response) and [Proof of Reserve](https://docs.orakl.network/developers-guide/proof-of-reserve) solutions.

오라클 네트워크를 통해 사용자는 스마트 컨트랙트에서 예측 불가능하고 편향되지 않은 무작위성을 확보할 수 있습니다. Orakl Network [Verifiable Random Function (VRF)](https://docs.orakl.network/developers-guide/vrf#what-is-verifiable-random-function) allows smart contracts to generate verifiably random values, which can be used in various dApps that require randomness. Orakl Network provides developers access to the VRF services through two different account types, namely: [Permanent Account](https://docs.orakl.network/developers-guide/readme#permanent-account) or [Temporary Account](https://docs.orakl.network/developers-guide/readme#temporary-account).

In this tutorial, you will utilize the VRF functionality from Orakl Network to request for random words from inside of your smart contract.

## 전제 조건

- [Kaikas](https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi?hl=en)
- [Remix IDE](https://remix.ethereum.org/)
- [Remix 클레이튼 플러그인](https://klaytn.foundation/using-klaytn-plugin-on-remix/)
- [Faucet](https://baobab.wallet.klaytn.foundation/faucet)에서 테스트 KLAY 얻기

## 시작하기

In the following steps, you will request for a random word in your smart contract using Orakl Network. 이제 시작해보겠습니다!

### Step 1: Initialize Contract State Variables

In this step, we will define the cosumer contract and initialize the state variables needed for our contract functionality. Our consumer contract is dependent on `VRFConsumerBase` contract from which we inherit, and `IVRFCoordinator` interface that is used for calls to `VRFCoordinator` contract. Next, we define `sRandomWord` variable which we use to store the random word result and the `sOwner` variable which is used inside of `onlyOwner` modifier.

```solidity
pragma solidity ^0.8.16;

import { VRFConsumerBase } from "@bisonai/orakl-contracts/src/v0.1/VRFConsumerBase.sol";
import { IVRFCoordinator } from "@bisonai/orakl-contracts/src/v0.1/interfaces/IVRFCoordinator.sol";

contract VRFConsumer is VRFConsumerBase {
  uint256 public sRandomWord;
  address private sOwner;

  error OnlyOwner(address notOwner);
  modifier onlyOwner() {
      if (msg.sender != sOwner) {
          revert OnlyOwner(msg.sender);
      }
      _;
  }
```

### Step 2: Initialize VRF Coordinator

To request for random words in your smart contract, you need to initialize the [`VRFCoordinator`](https://github.com/Bisonai/orakl/blob/master/contracts-v0.1/src/v0.1/VRFCoordinator.sol) smart contract. It is recommended to bond `VRFCoordinator` interface with `VRFCoordinator` address supplied through a constructor parameter, and use it for random word requests (`requestRandomWords`). The `VRFCoordinator` contract is deployed both on Klaytn Baobab [0xDA8c0A00A372503aa6EC80f9b29Cc97C454bE499](https://baobab.klaytnfinder.io/account/0xDA8c0A00A372503aa6EC80f9b29Cc97C454bE499) and Klaytn Cypress [0x3F247f70DC083A2907B8E76635986fd09AA80EFb](https://www.klaytnfinder.io/account/0x3F247f70DC083A2907B8E76635986fd09AA80EFb).

```solidity
  IVRFCoordinator COORDINATOR;

  constructor(address coordinator) VRFConsumerBase(coordinator) {
      COORDINATOR = IVRFCoordinator(coordinator);
      sOwner = msg.sender;
  }
```

### Step 3: Request Random Words with Temporary Account

To request random words with a temporary account, users need to send $KLAY together with a call using value property.

```solidity
  function requestRandomWordsDirect(
      bytes32 keyHash,
      uint32 callbackGasLimit,
      uint32 numWords,
      address refundRecipient
  )
      public
      payable
      onlyOwner
      returns (uint256 requestId)
  {
    requestId = COORDINATOR.requestRandomWords{value: msg.value}(
      keyHash,
      callbackGasLimit,
      numWords,
      refundRecipient
    );
  }
```

This function calls the `requestRandomWords()` function defined in `COORDINATOR` contract, and passes `keyHash`, `callbackGasLimit`, `numWords` and `refundRecipient` as arguments. The payment for service is sent through `msg.value` to the `requestRandomWords()` in `COORDINATOR` contract. If the payment is larger than expected payment, exceeding payment is returned to the `refundRecipient` address. Eventually, it generates a request for random words. To accurately specify `msg.value` for the `requestRandomWords` function, please refer to the explanation on [how to estimate the service fee](https://docs.orakl.network/developers-guide/vrf#get-estimated-service-fee).

### Step 4: Fulfill Random Words

The `fulfillRandomWords` function is called by `VRFCoordinator` contract when fulfilling the random words request.

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
    sRandomWord = (randomWords[0] % 50) + 1;
}
```

이제 오라클 VRF 솔루션 코드가 생겼으니 실제로 작동하는 모습을 확인해 보겠습니다.

## Practical Implementation

In the example below, the contract allows us to request for random words and receive its fulfillment.

### 샘플 코드 생성 및 배포

**Remix IDE**

- [Remix IDE](https://remix.ethereum.org/)로 이동합니다.
- Click on the **File Explorer** tab, create a new file named `consumer-vrf.sol` in the contracts folder.
- 새로 생성한 파일에 아래 코드를 붙여넣습니다.
- Remix에서 **Compile contract**을 클릭합니다.
- 플러그인을 설치한 후 왼쪽의 클레이튼 탭을 클릭합니다.
- **Environment** > **Injected Caver** - **Kaikas**를 선택합니다.
- In **Contract**, select your contract. For example, `VRFConsumer`.
- Pass in the coordinator contract address `0xDA8c0A00A372503aa6EC80f9b29Cc97C454bE499` (Baobab), `0x3F247f70DC083A2907B8E76635986fd09AA80EFb` (Cypress).
- **Deploy**를 클릭합니다..

**샘플 코드**

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import {VRFConsumerBase} from "@bisonai/orakl-contracts/src/v0.1/VRFConsumerBase.sol";
import {IVRFCoordinator} from "@bisonai/orakl-contracts/src/v0.1/interfaces/IVRFCoordinator.sol";

contract VRFConsumer is VRFConsumerBase {
    uint256 public sRandomWord;
    address private sOwner;

    IVRFCoordinator COORDINATOR;

    error OnlyOwner(address notOwner);

    modifier onlyOwner() {
        if (msg.sender != sOwner) {
            revert OnlyOwner(msg.sender);
        }
        _;
    }

    constructor(address coordinator) VRFConsumerBase(coordinator) {
        sOwner = msg.sender;
        COORDINATOR = IVRFCoordinator(coordinator);
    }

    function requestRandomWordsDirect(
        bytes32 keyHash,
        uint32 callbackGasLimit,
        uint32 numWords,
        address refundRecipient
    ) public payable onlyOwner returns (uint256 requestId) {
        requestId = COORDINATOR.requestRandomWords{value: msg.value}(
            keyHash,
            callbackGasLimit,
            numWords,
            refundRecipient
        );
    }

    function fulfillRandomWords(
        uint256 /* requestId */,
        uint256[] memory randomWords
    ) internal override {
        // requestId should be checked if it matches the expected request
        // Generate random value between 1 and 50.
        sRandomWord = (randomWords[0] % 50) + 1;
    }
}
```

![](/img/build/tools/orakl-vrf-deploy.png)

### 스마트 컨트랙트와의 상호작용

To request for random words in your smart contract, you have to first execute the `requestRandomWordsDirect()` function. For this function to successfully execute, the user has to send KLAY (minimum of 1 KLAY) as stated previously, and supply `keyHash`, `callbackGasLimit`, `numWords`, and `refundRecipient` parameters. `keyHash` parameter uniquely defines who can fulfill the request. Orakl Network VRF provides one key hash for each Klaytn chain:

- Baobab: `0xd9af33106d664a53cb9946df5cd81a30695f5b72224ee64e798b278af812779c`
- Cypress: `0x6cff5233743b3c0321a19ae11ab38ae0ddc7ddfe1e91b162fa8bb657488fb157`

For the rest of the parameters, you can set them as follows:

- `callbackGasLimit` as `500000`,
- `numWords` as `1`, and
- set `refundRecipient` to your EOA address.

Afterwards, once the request has been fulfilled, the `sRandomWord()` function can be executed. This `sRandomWord()` function returns the random word.

- **requestRandomWordsDirect()**: 이 함수를 실행하기 위해 1 KLAY를 전송합니다. 아래 이미지가 이를 설명합니다:

![](/img/build/tools/orakl-vrf-request.png)

- **sRandomWord()**: After the `VRFCoordinator` has fulfilled the random word request, the response is stored in the `sRandomWord` variable. To get the response, call the `sRandomWord()` function.

![](/img/build/tools/orakl-vrf-response.png)

축하합니다! You just requested for a random word and received one in your smart contract.

## 결론

In this tutorial, you learnt how to generate a random word in your smart contract using the Orakl Network VRF solution. The Orakl Network provides more oracle services such as Data Feed, Request-Response, Proof of Reserve. For more in-depth guides on Orakl Network and how it works, please refer to the [Orakl Network documentation](https://docs.orakl.network).
