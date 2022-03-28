# KlaytnGreeter <a id="klaytngreeter"></a>

`KlaytnGreeter`는 인사말 메시지를 반환하는 간단한 컨트랙트입니다. 컨트랙트가 배포될 때 인사말 메시지가 설정됩니다.

## KlaytnGreeter 작성 <a id="writing-klaytngreeter"></a>

```text
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

## Klaytn IDE를 사용하여 KlaytnGreeter 배포 <a id="deploying-klaytngreeter-using-klaytn-ide"></a>

* [Klaytn IDE 웹사이트](https://ide.klaytn.com)를 방문하고 `KlaytnGreeter` 컨트랙트를 생성합니다. 완전한 소스 코드는 위에서 주어졌습니다.
* 컨트랙트를 배포하는 데 사용할 계정을 준비하세요.
  * 아직 계정이 없으면, [https://baobab.wallet.klaytn.com/create](https://baobab.wallet.klaytn.com/create)에서 하나를 생성하세요.
  * Faucet에서 테스트 KLAY를 받으세요 - [https://baobab.wallet.klaytn.com/faucet](https://baobab.wallet.klaytn.com/faucet)
* 초기 파라미터에 인사말 메시지를 넣어 컨트랙트를 배포하세요.
* 배포 후 IDE에서 `greet`를 호출할 수 있습니다.

## 참고 <a id="references"></a>

컨트랙트 배포 및 Klaytn IDE 사용 가이드에 대한 자세한 내용은 다음 문서를 참조하세요.

* [Klaytn IDE](../ide-and-tools/README.md#klaytn-ide)
* [트러플(Truffle)](../ide-and-tools/README.md#truffle)
* [배포 가이드](../deploy-guide.md)



