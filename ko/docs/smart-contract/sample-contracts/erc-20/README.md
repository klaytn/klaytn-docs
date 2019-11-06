# ERC-20 <a id="erc-20"></a>

## 소개 <a id="introduction"></a>

이 튜토리얼은 [Klaytn 토큰 표준](../../token-standard.md)을 따르는 ERC-20 호환 토큰 예제, 특히 [대체 가능한 토큰 표준\(ERC-20\)](../../token-standard.md#fungible-token-standard-erc-20)을 생성하는 것을 돕습니다.

[ERC-20 토큰 표준](https://eips.ethereum.org/EIPS/eip-20)은 다음과 같이 두 이벤트와 아홉 메소드\(3개의 선택적 메소드\)를 정의합니다. ERC-20-호환 토큰은 다음의 인터페이스를 구현하기 위한 토큰 컨트랙트입니다.

```text
function name() public view returns (string) //optional
function symbol() public view returns (string) //optional
function decimals() public view returns (uint8) //optional
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transferFrom(address _from, address _to, uint256 _value) public returns (bool success)
function approve(address _spender, uint256 _value) public returns (bool success)
function allowance(address _owner, address _spender) public view returns (uint256 remaining)

event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

위의 인터페이스를 기반으로 개발자는 새로운 기능과 논리를 추가하여 토큰을 사용자 정의하고, Klaytn 네트워크에 배포할 수 있습니다. 자세한 내용은 공식 [ERC-20 문서](https://eips.ethereum.org/EIPS/eip-20)를 참조하세요.

이 튜토리얼에서는 ERC-20 호환 토큰인 `MyERC20.sol`을 구현할 것입니다. 이 토큰은 사전 정의된 양의 토큰을 발행하고 모든 토큰을 이를 배포한 컨트랙트 소유자에게 전송합니다.

`MyERC20.sol`은 OpenZeppelin의 ERC20 구현체를 기반으로 합니다. 이 튜토리얼에서 코드의 주요 부분은 [OpenZeppelin 2.3](https://github.com/OpenZeppelin/openzeppelin-solidity/releases/tag/v2.3.0)에서 가져온 것이며, 다음 솔리디티 파일은 `MyERC20.sol`을 구현하는 데 사용됩니다.

* [https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/IERC20.sol](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/IERC20.sol)
* [https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/ERC20.sol](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/ERC20.sol)
* [https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/ERC20Detailed.sol](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/ERC20Detailed.sol)
* [https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/math/SafeMath.sol](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/math/SafeMath.sol)

이 튜토리얼의 나머지 부분은 다음과 같이 구성됩니다.

* [1. ERC-20 스마트 컨트랙트 작성](1-erc20.md)
  * 1.1 전체 `MyERC20` 코드와 `MyERC20` 코드의 전체 구조
  * 1.2 중요 함수 살펴보기
* [2. 스마트 컨트랙트 배포](2-erc20.md)
  * 2.1 Klaytn IDE를 사용하여 스마트 컨트랙트 배포
  * 2.2 truffle을 사용하여 스마트 컨트랙트 배포
* [3. ERC-20 토큰과 Klaytn Wallet 간의 상호작용](3-erc20.md)

