# Mạng lưới Orakl

## Giới thiệu

![](/img/build/tools/klaytnXorakl.png)

[Orakl Network](https://docs.orakl.network) is a decentralized oracle network that allows smart contracts to securely access off-chain data and other resources. It prides itself in being a native token oracle that provides [Data Feed](https://docs.orakl.network/developers-guide/data-feed), [VRF](https://docs.orakl.network/developers-guide/vrf), [Request-Response](https://docs.orakl.network/developers-guide/request-response) and [Proof of Reserve](https://docs.orakl.network/developers-guide/proof-of-reserve) solutions.

Với Mạng Orakl, người dùng có thể tìm nguồn ngẫu nhiên không thể đoán trước và không thiên vị trong hợp đồng thông minh của họ. Orakl Network [Verifiable Random Function (VRF)](https://docs.orakl.network/developers-guide/vrf#what-is-verifiable-random-function) allows smart contracts to generate verifiably random values, which can be used in various dApps that require randomness. Orakl Network provides developers access to the VRF services through two different account types, namely: [Permanent Account](https://docs.orakl.network/developers-guide/readme#permanent-account) or [Temporary Account](https://docs.orakl.network/developers-guide/readme#temporary-account).

In this tutorial, you will utilize the VRF functionality from Orakl Network to request for random words from inside of your smart contract.

## Điều kiện tiên quyết

- [Kaikas](https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi?hl=en)
- [Remix IDE](https://remix.ethereum.org/)
- [Kaikas](https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi?hl=en)
- [Remix IDE](https://remix.ethereum.org/)

## [Plugin Klaytn trên bản phối lại](https://klaytn.foundation/using-klaytn-plugin-on-remix/)

In the following steps, you will request for a random word in your smart contract using Orakl Network. Bắt đầu

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

Bước 4: Thực hiện các từ ngẫu nhiên

## Practical Implementation

In the example below, the contract allows us to request for random words and receive its fulfillment.

### Thực hiện thực tế

**Remix IDE**

- Trong ví dụ dưới đây, hợp đồng cung cấp cho chúng tôi quyền truy cập để yêu cầu các số ngẫu nhiên và thực hiện yêu cầu.
- Click on the **File Explorer** tab, create a new file named `consumer-vrf.sol` in the contracts folder.
- **Remix IDE**
- Điều hướng đến [Remix IDE](https://remix.ethereum.org/).
- Nhấp vào tab File Explorer, tạo một tệp mới có tên demoOraklDirectVRF.sol trong thư mục hợp đồng.
- Dán mã bên dưới trong tệp mới được tạo.
- In **Contract**, select your contract. For example, `VRFConsumer`.
- Pass in the coordinator contract address `0xDA8c0A00A372503aa6EC80f9b29Cc97C454bE499` (Baobab), `0x3F247f70DC083A2907B8E76635986fd09AA80EFb` (Cypress).
- Trong hợp đồng, chọn hợp đồng của bạn.

Ví dụ, VRFConsumer.

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

### Truyền trong địa chỉ hợp đồng điều phối viên `0xfa605ca6dc9414e0f7fa322d3fd76535b33f7a4f`.

To request for random words in your smart contract, you have to first execute the `requestRandomWordsDirect()` function. For this function to successfully execute, the user has to send KLAY (minimum of 1 KLAY) as stated previously, and supply `keyHash`, `callbackGasLimit`, `numWords`, and `refundRecipient` parameters. `keyHash` parameter uniquely defines who can fulfill the request. Orakl Network VRF provides one key hash for each Klaytn chain:

- Baobab: `0xd9af33106d664a53cb9946df5cd81a30695f5b72224ee64e798b278af812779c`
- Cypress: `0x6cff5233743b3c0321a19ae11ab38ae0ddc7ddfe1e91b162fa8bb657488fb157`

For the rest of the parameters, you can set them as follows:

- `callbackGasLimit` as `500000`,
- `numWords` as `1`, and
- set `refundRecipient` to your EOA address.

Afterwards, once the request has been fulfilled, the `sRandomWord()` function can be executed. This `sRandomWord()` function returns the random word.

- Để chức năng này thực hiện thành công, người dùng phải gửi KLAY (tối thiểu 1 KLAY) như đã nêu trước đó. Sau đó, một khi yêu cầu đã được đáp ứng, hàm `s_randomResult()` có thể được thực thi.

![](/img/build/tools/orakl-vrf-request.png)

- **sRandomWord()**: After the `VRFCoordinator` has fulfilled the random word request, the response is stored in the `sRandomWord` variable. To get the response, call the `sRandomWord()` function.

![](/img/build/tools/orakl-vrf-response.png)

Hình ảnh dưới đây minh họa điều này: You just requested for a random word and received one in your smart contract.

## Để nhận được phản hồi, hãy gọi hàm `s_response()`.

In this tutorial, you learnt how to generate a random word in your smart contract using the Orakl Network VRF solution. The Orakl Network provides more oracle services such as Data Feed, Request-Response, Proof of Reserve. For more in-depth guides on Orakl Network and how it works, please refer to the [Orakl Network documentation](https://docs.orakl.network).
