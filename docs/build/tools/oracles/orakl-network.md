# Orakl Network

## Introduction

![](/img/build/tools/klaytnXorakl.png)

[Orakl Network](https://docs.orakl.network/docs/developers-guide/readme) is a decentralized oracle network that allows smart contracts to securely access off-chain data and other resources. It prides itself in being a Klaytn native oracle that provides Data Feed, VRF and Request-Response solutions. 

With Orakl Network, users can  source for randomness that is unpredictable and unbiased in their smart contracts. Orakl Network [Verifiable Random Function (VRF)](https://docs.orakl.network/docs/developers-guide/verifiable-random-function-vrf#what-is-verifiable-random-function) allows smart contracts to use VRF to generate verifiably random values, which can be used in various dApps that require randomness. 


Orakl Network provides developers access to the VRF services with two different payment methods, namely: [Prepayment](https://docs.orakl.network/docs/developers-guide/readme#prepayment) or [Direct Method](https://docs.orakl.network/docs/developers-guide/readme#direct-payment). In this tutorial, you will utilize the VRF functionality from Orakl Network to request for random numbers in your smart contract.


## Prerequisites

* [Kaikas](https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi?hl=en)
* [Remix IDE](https://remix.ethereum.org/)
* [Klaytn Plugin on Remix](https://klaytn.foundation/using-klaytn-plugin-on-remix/)
* Test KLAY from [Faucet](https://baobab.wallet.klaytn.foundation/faucet)

## Getting Started

In the following steps, you will request for a random number in your smart contract using Orakl Network. Let's get started!

### Step 1: Initialization for direct payment

To request for random numbers in your smart contract, you need to initialize the [VRFCoordinator](https://github.com/Bisonai-CIC/orakl/blob/master/contracts/src/v0.1/VRFCoordinator.sol) smart contract.  It is recommended to bond VRFCoordinator interface with VRFCoordinator address supplied through a constructor parameter, and use it for random word requests (requestRandomWordsPayment). The VRFCoordinator contract is currently deployed on Klaytn Testnet Baobab with the contract address [0xfa605ca6dc9414e0f7fa322d3fd76535b33f7a4f](https://baobab.scope.klaytn.com/account/0xfa605ca6dc9414e0f7fa322d3fd76535b33f7a4f)


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

### Step 2: Initialize contract state variable

In this step, we will initialize the state variables needed for our contract functionality. This includes the s_randomResult variable which stores the random number result, the s_owner variable which is used for the onlyOwner modifier, the callbackGasLimit variable, the keyHash variable and numWord variable for the amount of random numbers to be returned. 

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

### Step 3: Request random words with direct payment (consumer)

To request random numbers using the direct method, users need to send $KLAY together with a call using value property. 

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

The code above explains a function that calls the `requestRandomWordsPayment()` function defined in COORDINATOR contract, and passes keyHash, callbackGasLimit, and numWords as arguments. The payment for service is sent through msg.value to the requestRandomWordsPayment() in COORDINATOR contract. If the payment is larger than expected payment, exceeding payment is returned to the caller of requestRandomWordsPayment function, therefore it requires the user contract to define the [receive()](https://docs.soliditylang.org/en/v0.8.16/contracts.html#receive-ether-function) function as shown in the top of the code.  


### Step 4: Fulfill random words

This function is called by VRFCoordinator contract when fulfilling the random number request.

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

Now that we have the Orakl VRF solution code, let’s get to see it in action.

## Practical implementation 

In the example below, the contract provides us the access to request for random numbers and fulfill the request. 
 
### Create and Deploy Sample Code 

**Remix IDE**

* Navigate to [Remix IDE](https://remix.ethereum.org/).
* Click on the File Explorer tab, create a new file named demoOraklDirectVRF.sol in the contracts folder.
* Paste the code below in your newly created file.
* In Remix, click **Compile contract**.
* Click the Klaytn tab on your left having installed the plugin.
* Select **Environment** > **Injected Caver** - **Kaikas**.
* In Contract, select your contract. For example, VRFConsumer.
* Pass in the coordinator contract address `0xfa605ca6dc9414e0f7fa322d3fd76535b33f7a4f`.
* Click **Deploy**.

**Sample Code**

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

### Interact with Smart Contract

To request for random numbers in your smart contract, you have to first execute the `requestRandomWordsDirect()` function. For this function to successfully execute, the user has to send KLAY (minimum of 1 KLAY) as stated previously. Afterwards, once the request has been fulfilled, the `s_randomResult()` function can be executed. This s_randomResult() function returns the random number.

* **requestRandomWordsDirect()**: Will be sending 1 KLAY to execute this function. The image below illustrate this:

![](/img/build/tools/orakl-vrf-request.png)

* **s_randomResult()**: After the VRFCoordinator has fulfilled the random number request, the response is stored in the s_randomResult variable. To get the response, call the `s_response()` function.


![](/img/build/tools/orakl-vrf-response.png)


Tada 🎉! You just requested for a random number in your smart contract.

## Conclusion

In this tutorial, you learnt how to generate a random number in your smart contract using the Orakl Network VRF solution. The Orakl Network provides more oracle services such as Price-feeds, Data Request-Response and much more. For more in-depth guides on Orakl Network and how it works, please refer to the [Orakl Network Docs](https://docs.orakl.network/docs/developers-guide/readme). 
