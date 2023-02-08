# KlaytnGreeter

`KlaytnGreeter`는 인사말 메시지를 반환하는 간단한 컨트랙트입니다. 컨트랙트가 배포될 때 인사말 메시지가 설정됩니다.

## KlaytnGreeter 작성 <a href="#writing-klaytngreeter" id="writing-klaytngreeter"></a>

```
pragma solidity 0.5.6;
contract Mortal {
    /* address 타입의 owner변수 정의 */
    address payable owner;
    /* 이 함수는 초기화 시점에 실행되어 컨트랙트 소유자를 설정합니다 */
    constructor () public { owner = msg.sender; }
    /* 컨트랙트에서 자금을 회수하는 함수 */
    function kill() public { if (msg.sender == owner) selfdestruct(owner); }
}

contract KlaytnGreeter is Mortal {
    /* string 타입의 변수 greeting 정의 */
    string greeting;
    /* 이 함수는 컨트랙트가 생성될 딱 한번 실행됩니다 */
    constructor (string memory _greeting) public {
        greeting = _greeting;
    }
    /* 주(Main) 함수 */
    function greet() public view returns (string memory) {
        return greeting;
    }
}
```

## Deploying KlaytnGreeter using Remix Online IDE <a href="#deploying-klaytngreeter-using-klaytn-ide" id="deploying-klaytngreeter-using-klaytn-ide"></a>

* Please visit [Klaytn Plugin for Remix](https://ide.klaytn.foundation) and create a `KlaytnGreeter` contract. 완전한 소스 코드는 위에서 주어졌습니다.
* Prepare your account which will be used to deploy the contract.
  * If you do not have an account yet, create one at [https://baobab.wallet.klaytn.foundation/create](https://baobab.wallet.klaytn.foundation/create) or [https://toolkit.klaytn.foundation/account/accountKeyLegacy](https://toolkit.klaytn.foundation/account/accountKeyLegacy).
  * Get some test KLAY from the faucet - [https://baobab.wallet.klaytn.foundation/faucet](https://baobab.wallet.klaytn.foundation/faucet)
* 초기 파라미터에 인사말 메시지를 넣어 컨트랙트를 배포하세요.
* 배포 후 IDE에서 `greet`를 호출할 수 있습니다.

## 참고 <a href="#references" id="references"></a>

For the details of contract deployment and the Remix Online IDE usage guideline, please refer to the following documents.

* [Remix Online IDE](../ide-and-tools/#klaytn-ide)
* [Truffle](../ide-and-tools/#truffle)
* [배포 가이드](../deploy-guide.md)
