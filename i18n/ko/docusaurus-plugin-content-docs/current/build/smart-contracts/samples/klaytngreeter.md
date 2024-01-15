# KlaytnGreeter

`KlaytnGreeter`는 인사말 메시지를 반환하는 간단한 컨트랙트입니다. 인사말 메시지는 컨트랙트가 배포될 때 설정됩니다.

## KlaytnGreeter 작성하기 <a href="#writing-klaytngreeter" id="writing-klaytngreeter"></a>

```
pragma solidity 0.5.6;
contract Mortal {
    /* Define variable owner of the type address */
    address payable owner;
    /* This function is executed at initialization and sets the owner of the contract */
    constructor () public { owner = msg.sender; }
    /* Function to recover the funds on the contract */
    function kill() public { if (msg.sender == owner) selfdestruct(owner); }
}

contract KlaytnGreeter is Mortal {
    /* Define variable greeting of the type string */
    string greeting;
    /* This runs once when the contract is created */
    constructor (string memory _greeting) public {
        greeting = _greeting;
    }
    /* Main function */
    function greet() public view returns (string memory) {
        return greeting;
    }
}
```

## Remix 온라인 IDE를 사용하여 KlaytnGreeter 배포하기 <a href="#deploying-klaytngreeter-using-klaytn-ide" id="deploying-klaytngreeter-using-klaytn-ide"></a>

- [Remix용 클레이튼 플러그인](https://ide.klaytn.foundation)을 방문하여 `KlaytnGreeter` 컨트랙트를 생성하세요. 전체 소스코드는 위 링크에서 확인할 수 있습니다.
- 컨트랙트 배포에 사용할 계정을 준비합니다.
  - 아직 계정이 없다면 [https://baobab.wallet.klaytn.foundation/create](https://baobab.wallet.klaytn.foundation/create) 또는 [https://toolkit.klaytn.foundation/account/accountKeyLegacy](https://toolkit.klaytn.foundation/account/accountKeyLegacy)에서 계정을 생성합니다.
  - https\://baobab.wallet.klaytn.foundation/faucet](https\://baobab.wallet.klaytn.foundation/faucet)에서 테스트 KLAY를 받습니다.
- 초기 파라미터인 인사말 메시지와 함께 컨트랙트를 배포합니다.
- 배포 후, IDE에서 `greet`를 호출할 수 있습니다.

## 참조 <a href="#references" id="references"></a>

컨트랙트 배포에 대한 자세한 내용과 Remix Online IDE 사용 가이드라인은 다음 문서를 참조하세요.

- [Remix 온라인 IDE](../../smart-contracts/ide-and-tools/ide-and-tools.md#klaytn-ide)
- [Truffle](../../smart-contracts/ide-and-tools/ide-and-tools.md##truffle)
- [디플로이 가이드](../deploy/deploy.md)
