# ERC-721 예제 <a id="erc-721-example"></a>

## 소개 <a id="introduction"></a>

이 튜토리얼은 [Klaytn 토큰 표준](../../token-standard.md)([대체 불가 토큰 표준인 ERC-721과 호환](../../token-standard.md#non-fungible-token-standard-kip-17))을 따르는 토큰을 만드는 방법을 소개합니다.

[ERC-721 대체 불가능한 토큰 표준](https://eips.ethereum.org/EIPS/eip-721)은 아래와 같은 3개의 이벤트와 10개의 메소드를 정의합니다. ERC-721의 `supportsInterface`는 [ERC-165 표준 인터페이스 검출](https://eips.ethereum.org/EIPS/eip-165)에서 파생되었으며 ERC-165는 ERC-721의 일부분입니다. ERC-721 호환 토큰은 ERC-721 및 ERC-165 인터페이스를 구현한 토큰 컨트랙트입니다.

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);

function balanceOf(address _owner) external view returns (uint256);
function ownerOf(uint256 _tokenId) external view returns (address);
function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes data) external payable;
function safeTransferFrom(address _from, address _to, uint256 _tokenId) external payable;
function transferFrom(address _from, address _to, uint256 _tokenId) external payable;
function approve(address _approved, uint256 _tokenId) external payable;
function setApprovalForAll(address _operator, bool _approved) external;
function getApproved(uint256 _tokenId) external view returns (address);
function isApprovedForAll(address _owner, address _operator) external view returns (bool);
function supportsInterface(bytes4 interfaceID) external view returns (bool);
```

위의 인터페이스를 기반으로 개발자는 새로운 기능과 논리를 추가하여 토큰을 사용자 정의하고, Klaytn 네트워크에 배포할 수 있습니다. 자세한 내용은 공식 [ERC-721 스펙](https://eips.ethereum.org/EIPS/eip-721)을 참조하세요.

이 튜토리얼에서는 카드 타입의 대체 불가능한 토큰, 즉 ERC-721 토큰인 `MyERC721Card`의 구현체인 `MyERC721Card.sol`를 구현할 것입니다. 각 `MyERC721Card`는 이름과 레벨, 가령 레벨 1의 "왕(King)", 레벨 1의 "여왕(Queen)"을 가집니다.

`MyERC721Card.sol`은 OpenZeppelin의 ERC721 구현체를 기반으로 합니다. 이 튜토리얼에서 코드의 주요 부분은 [OpenZeppelin 2.3](https://github.com/OpenZeppelin/openzeppelin-solidity/releases/tag/v2.3.0)에서 가져왔습니다.

이 튜토리얼의 나머지 부분은 다음과 같이 구성됩니다.

* [1. ERC-721 스마트 컨트랙트 작성](./1-erc721.md)
  - 1.1 전체 `MyERC721Card` 코드와 `MyERC721Card` 코드의 전체 구조
  - 1.2 중요 함수 살펴보기
* [2. 스마트 컨트랙트 배포](./2-erc721.md)
  - 2.1 Klaytn IDE를 사용하여 스마트 컨트랙트 배포
  - 2.2 truffle을 사용하여 스마트 컨트랙트 배포
