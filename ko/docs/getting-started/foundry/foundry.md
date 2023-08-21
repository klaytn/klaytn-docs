![](./klaytn-foundry.png)

# Introduction
Foundry는 Rust로 작성된 스마트 컨트랙트 개발 프레임워크로, 개발자들이 계약을 관리하고 컴파일하고, 테스트를 실행하고, 계약을 배포하며, 커맨드 라인을 통해 솔리디티 스크립트로 네트워크와 상호 작용할 수 있게 해줍니다.

Foundry는 다음과 같이 네 가지 주요 CLI 도구로 구성되어 있으며, 이를 통해 빠르고 모듈식 스마트 계약 개발이 가능합니다:

* [Forge](https://github.com/foundry-rs/foundry/tree/master/forge): Forge를 사용하여 스마트 컨트랙트를 배포하고, 테스트하고, 컴파일할 수 있습니다.
* [Cast](https://github.com/foundry-rs/foundry/tree/master/cast): Cast는 EVM 스마트 컨트랙트와 상호 작용하는 것을 간단하게 만들었습니다. Cast는 체인 데이터를 얻는 것, 트랜잭션을 보내는 것과 그 외의 것들도 포함합니다.
* [Anvil](https://github.com/foundry-rs/foundry/tree/master/anvil): 로컬 노드를 구동해야 하나요? Anvil은 Foundry에서 제공하는 로컬 노드 환경입니다.
* [Chisel](https://github.com/foundry-rs/foundry/blob/master/chisel): 빠르고 유용하며 자세한 솔리디티 REPL입니다.

여러분은 가이드를 통해서 아래 사항을 진행할 수 있습니다:
* 간단한 Foundry 프로젝트를 생성합니다.
* Foundry를 사용하여 샘플 스마트 컨트랙트를 컴파일하고 테스트합니다.
* Foundry를 사용하여 Klaytn Baobab 네트워크에 스마트 컨트랙트를 배포합니다.
* Cast와 Anvil을 사용하여 메인넷을 포크하는 방법을 탐색합니다.

# Pre-requisites
아래 내용은 튜토리얼을 따르기 위한 필수 요구 사항입니다:

* 코드 에디터: [VS-Code](https://code.visualstudio.com/download)와 같은 소스 코드 에디터
* [MetaMask](https://docs.klaytn.foundation/dapp/tutorials/connecting-metamask#install-metamask): 컨트랙트를 배포하고, 트랜잭션에 서명하고, 컨트랙트와 상호 작용하는 데 사용됩니다.
* RPC Endpoint: 지원되는 [Endpoint Providers](https://docs.klaytn.foundation/content/dapp/json-rpc/public-en) 중 하나에서 이를 얻을 수 있습니다.
* [Faucet](https://baobab.wallet.klaytn.foundation/faucet)에서 테스트 KLAY 받기: 충분한 KLAY로 계정에 자금을 입금합니다.
* [Rust](https://www.rust-lang.org/tools/install)와 [Foundry](https://github.com/foundry-rs/foundry#installation)를 설치합니다.

# Setting Up Your Development Environment
Foundry 설치가 성공적인지 확인하려면 아래 명령어를 실행하세요:

```bash
forge -V
```
**Output**

![](./../images/foundry/forge-version.png)

Foundry를 성공적으로 설치한 후, 이제 foundry에서 사용 가능한 CLI 도구 (forge, cast, anvil, chisel)에 접근할 수 있습니다. 다음 단계로 foundry 프로젝트를 설정해봅시다:

**1 단계**: 새 프로젝트를 시작하려면 아래 명령어를 실행하세요:

```bash
forge init foundry_example 
```
**2 단계**: 프로젝트 폴더로 이동하세요.

```bash 
cd foundry_example
ls   
```
Foundry 프로젝트를 초기화한 후, 현재 디렉토리에는 아래 내용이 포함되어야 합니다:
* **src**: 스마트 컨트랙트를 위한 기본 디렉토리입니다.
* **tests**: 테스트를 위한 기본 디렉토리입니다.
* **foundry.toml**: 기본 프로젝트 구성 파일입니다.
* **lib**: 프로젝트 종속성을 위한 기본 디렉토리입니다.
* **script**: Solidity 스크립팅 파일을 위한 기본 디렉토리입니다.

# 스마트 컨트랙트의 예시
이번 장에서는 초기화된 Foundry 프로젝트에서 샘플 카운터 컨트랙트를 사용할 것입니다. `src/` 폴더 안의 `counter.sol` 파일은 다음과 같아야 합니다:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
contract Counter {
    uint256 public number;
    function setNumber(uint256 newNumber) public {
        number = newNumber;
    }
    function increment() public {
        number++;
    }
}
```
**코드 설명**

이것이 여러분이 작성한 스마트 컨트랙트입니다. **1행**은 솔리디티 버전 0.8.13 이상을 사용함을 보여줍니다. **4행에서 12행**까지, `Counter`라는 스마트 컨트랙트가 생성됩니다. 이 컨트랙트는 단순히 **setNumber** 함수를 사용하여 새 숫자를 저장하고, **increment** 함수를 호출하여 그 숫자를 증가시킵니다.

# Testing smart contract
Foundry는 다른 스마트 컨트랙트 개발 프레임워크에서 자바스크립트로 테스트를 작성하는 것과 달리, 솔리디티로 테스트를 작성할 수 있게 해줍니다. 우리가 초기화한 Foundry 프로젝트에서, `test/Counter.t.sol`은 솔리디티로 작성된 테스트의 예시입니다. 코드는 다음과 같습니다:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "forge-std/Test.sol";
import "../src/Counter.sol";
contract CounterTest is Test {
    Counter public counter;
    function setUp() public {
        counter = new Counter();
        counter.setNumber(0);
    }
    function testIncrement() public {
        counter.increment();
        assertEq(counter.number(), 1);
    }
    function testSetNumber(uint256 x) public {
        counter.setNumber(x);
        assertEq(counter.number(), x);
    }
}
```
위의 코드는 forge의 표준 라이브러리와 Counter.sol을 가져왔음을 보여줍니다.

위의 테스트들은 아래 내용을 확인합니다:
* 숫자가 증가하고 있나요?
* 숫자가 설정된 숫자와 같나요?

테스트가 잘 작동하는지 확인하려면 다음 명령어를 실행하세요:

```bash
forge test
```
**Output**

![](./../images/foundry/forge-test.png)

테스트 작성, 고급 테스팅 및 기타 기능에 대해 자세히 알고 싶다면, [Foundry의 문서](https://book.getfoundry.sh/forge/tests)를 참조하세요.

# 스마트 컨트랙트 컨트랙트 컴파일하기
아래 명령어를 통해 여러분의 컨트랙트를 컴파일하세요:

```bash
forge build 
```

# 스마트 컨트랙트 배포하기

Foundry를 사용하여 컨트랙트를 배포하려면, 계약을 배포할 계정의 RPC URL과 개인 키를 제공해야 합니다. Klaytn의 [rpc-provider](https://docs.klaytn.foundation/content/dapp/json-rpc/public-en) 목록을 확인하여 rpc-url을 찾고, [MetaMask](https://docs.klaytn.foundation/dapp/tutorials/connecting-metamask#install-metamask)를 사용하여 계정을 생성하세요.

**1단계**: Klaytn Baobab 네트워크에 계약을 배포하려면 아래의 명령어를 실행하세요:

```bash
$ forge create --rpc-url <your_rpc_url> --private-key <your_private_key> src/Counter.sol:Counter
```

**예시**

```bash
forge create --rpc-url https://klaytn-baobab-rpc.allthatnode.com:8551/qtKkeUE8ZEPI2cs0OHloJ6seI4Wfy36N --private-key hhdhdhdhprivatekeyhdhdhdhud src/Counter.sol:Counter
```

**주의 사항: private key 인수를 MetaMask에서의 귀하의 개인 키로 교체하세요. 개인 키를 노출하지 않도록 매우 주의하세요.**

**Output**

![](./../images/foundry/foundry-create.png)

**2단계**: 카운터 컨트랙트가 성공적으로 배포되었는지 확인하기 위해 [Klaytnscope](https://baobab.scope.klaytn.com/tx/0x669e39c9661fdab59aa34989b58b3f89376a93f846a0c71d2858918f58a307e2?tabId=internalTx)를 엽니다.

**Step 3**: Copy and paste the transaction hash in the search field and press Enter. You should see the recently deployed contract.

![](./../images/foundry/forge-scope.png)

# Interacting with the contract

After successfully deploying your smart contract, you will want to call and execute functions right. Let's get to interact with the deployed contracts on Klaytn Baobab Network using [Cast](https://book.getfoundry.sh/reference/cast/cast-send.html).  In this section, you will learn how to use the [cast call](https://book.getfoundry.sh/reference/cast/cast-call) to execute the `read-only` function and [cast send](https://book.getfoundry.sh/reference/cast/cast-send) to execute `write` functions.

**A. cast call**: To get the number stored in the contract, you will be calling the `number` function. Run the command below to see this in action.

```bash
cast call YOUR_CONTRACT_ADDRESS "number()" --rpc-url RPC-API-ENDPOINT-HERE
```
**Example**

```bash
cast call 0xe4d576c447733da7ca9197e88d34a74c3c865cff "number()" --rpc-url https://klaytn-baobab-rpc.allthatnode.com:8551/qtKkeUE8ZEPI2cs0OHloJ6seI4Wfy36N
```

**Output**

![](./../images/foundry/cast-call-number.png)

You should get this data in hexadecimal format:

```bash
0x0000000000000000000000000000000000000000000000000000000000000000
```
However to get your desired result, use cast to convert the above result. In this case, the data is a number, so you can convert it into base 10 to get the result 0:

```bash
cast --to-base 0x0000000000000000000000000000000000000000000000000000000000000000 10
```
**Output**

![](./../images/foundry/cast-call-0.png)

**B. cast send**: To sign and publish a transaction such as executing a `setNumber` function in the counter contract, run the command below:

```bash
cast send --rpc-url=<RPC-URL> <CONTRACT-ADDRESS> “setNumber(uint256)” arg --private-key=<PRIVATE-KEY>
```
**Example**

```bash
cast send --rpc-url=https://klaytn-baobab-rpc.allthatnode.com:8551/qtKkeUE8ZEPI2cs0OHloJ6seI4Wfy36N  0xe4d576c447733da7ca9197e88d34a74c3c865cff "setNumber(uint256)"  10 --private-key=<private key>
```
**Output**

![](./../images/foundry/cast-send-setNum.png)

**Crosscheck Number**

```bash
cast call 0xe4d576c447733da7ca9197e88d34a74c3c865cff "number()" --rpc-url https://klaytn-baobab-rpc.allthatnode.com:8551/qtKkeUE8ZEPI2cs0OHloJ6seI4Wfy36N
```

**Output**

![](./../images/foundry/cast-call-10.png)

You should get this data in hexadecimal format:

```bash
0x000000000000000000000000000000000000000000000000000000000000000a
```
However to get your desired result, use cast to convert the above result. In this case, the data is a number, so you can convert it into base 10 to get the result 10:

```bash
cast --to-base 0x000000000000000000000000000000000000000000000000000000000000000a 10
```
**Output**

![](./../images/foundry/cast-call-result-10.png)

# Forking Mainnet with Cast and Anvil
Foundry allows us to fork the mainnet to a local development network ([Anvil](https://book.getfoundry.sh/reference/anvil/)). Also, you can interact and test with contracts on a real network using [Cast](https://book.getfoundry.sh/reference/cast/).

## Getting Started

Now that you have your Foundry project up and running, you can fork the mainnet (cypress) by running the command below:

```bash
anvil --fork-url rpc-url
```
**Example**
```bash
anvil --fork-url https://archive-en.cypress.klaytn.net
```
**Output**

![](./../images/foundry/anvil-localnode.png)

After successfully running this command, your terminal looks like the above image. You'll have 10 accounts created with their public and private keys as well 10,000 prefunded tokens. The forked chain's RPC server is listening at `127.0.0.1:8545`.

To verify you have forked the network, you can query the latest block number:

```bash
curl --data '{"method":"eth_blockNumber","params":[],"id":1,"jsonrpc":"2.0"}' -H "Content-Type: application/json" -X POST localhost:8545 
```
You can convert the result from the task above using [hex to decimal](https://www.rapidtables.com/convert/number/hex-to-decimal.html). You should get the latest block number from the time you forked the network. To verify this, cross-reference the block number on [Klaytnscope](https://klaytnscope.com/block/118704896?tabId=txList).

## Illustration
In this section, you will learn how to transfer oUSDC tokens from someone who holds oUSDC to an account created by Anvil (0x70997970C51812dc3A010C7d01b50e0d17dc79C8 - Bob)

**Transferring oUSDC**

Go to Klaytnscope and search for holders of oUSDC tokens (here). Let's pick a random account. In this example, we will be using `0x8e61241e0525bd45cfc43dd7ba0229b422545bca`.

Let's export our contracts and accounts as environment variables:

```bash
export BOB=0x70997970C51812dc3A010C7d01b50e0d17dc79C8
export oUSDC=0x754288077d0ff82af7a5317c7cb8c444d421d103
export oUSDCHolder=0x8e61241e0525bd45cfc43dd7ba0229b422545bca
```
We can check Bob’s balance using cast call:

```bash
cast call $oUSDC \
  "balanceOf(address)(uint256)" \
  $BOB
```
**Output**

![](./../images/foundry/oUsdcBob4.png)

Similarly, we can also check our oUSDC holder’s balance using cast call:

```bash
cast call $oUSDC \
  "balanceOf(address)(uint256)" \
  $oUSDCHolder
```
**Output**

![](./../images/foundry/oUsdcHolder4.png)

Let's transfer some tokens from the lucky user to Alice using cast send:

```bash
cast rpc anvil_impersonateAccount $oUSDCHolder
cast send $oUSDC \
--from $oUSDCHolder\
  "transfer(address,uint256)(bool)" \
  $BOB \
 1000000
```
**Output**

![](./../images/foundry/cast-send.png)

Let's check that the transfer worked:

```bash
cast call $oUSDC \
  "balanceOf(address)(uint256)" \
  $BOB
```
**Output**

![](./../images/foundry/oUsdcBobAfter.png)

```bash
cast call $oUSDC \
  "balanceOf(address)(uint256)" \
  $oUSDCHolder
```
**Output**

![](./../images/foundry/oUsdcHolderAfter.png)

For more in-depth guide on foundry, please refer to [Foundry Docs](https://book.getfoundry.sh/). Also, you can find the full implementation of the code for this guide on [GitHub](https://github.com/klaytn/examples/tree/main/foundry).

