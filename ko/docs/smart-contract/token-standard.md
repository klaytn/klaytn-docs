# Klaytn 호환 토큰 <a id="klaytn-compatible-tokens"></a>

Klaytn 호환 토큰(KCT, Klaytn Compatible Token)는 특정 기술 스펙을 구현한 특별한 타입의 스마트 컨트랙트입니다. Klaytn에서 토큰을 발행하려는 모든 사람들은 스펙을 따라야 합니다.

Klaytn은 이더리움 토큰 표준을, 특히 ERC20과 ERC721를 지원합니다. 이러한 표준은 블록체인 개발자들 사이에서 널리 채택되고 있습니다. 따라서 현재 Klaytn은 블록체인 개발자에게 친숙한 개발 경험을 제공하기 위해 이더리움과 호환됩니다.

그럼에도 불구하고 Klaytn은 역할 기반 계정, 수수료 위임과 같이 이더리움이 제공하지 않는 새로운 기능을 수용합니다. 이러한 새로운 기능 또는 Klaytn이 향후 제공할 다른 기능에는 자체 표준이 필요할 수도 있습니다. 이러한 이유로, Klaytn 팀은 개발자가 아이디어를 적극적으로 논의하고 새로운 표준을 제안할 수있는 다양한 방법\(개발자 포털 및 깃허브 이슈 등\)을 제공 할 계획입니다.

## 대체 가능한 토큰 표준 \(ERC-20\) <a id="fungible-token-standard-erc-20"></a>

대체 가능한 토큰은 균등성과 가분(可分)성을 가진 토큰입니다. 각 토큰 단위는 동일한 가치를 가지므로 모든 가용 토큰은 서로 호환됩니다. 모든 달러 지폐가 1달러와 가치가 동일한 것과 같습니다. 대부분의 경우 대체 가능성은 암호 화폐에 필수적인 기능이기 때문에, 블록체인 토큰 중 많은 비율이 대체 가능한 토큰입니다.

솔리디티 스마트 컨트랙트로 이러한 속성을 구현하기 위해, 솔리디티 개발자 커뮤니티는 ERC-20 토큰 표준을 제안했습니다. ERC-20-호환 토큰은 다음의 인터페이스를 구현하기 위한 토큰 컨트랙트입니다.

```text
event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)

function name() public view returns (string) //optional
function symbol() public view returns (string) //optional
function decimals() public view returns (uint8) //optional
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transferFrom(address _from, address _to, uint256 _value) public returns (bool success)
function approve(address _spender, uint256 _value) public returns (bool success)
function allowance(address _owner, address _spender) public view returns (uint256 remaining)
```

위의 인터페이스를 기반으로 개발자는 새로운 기능과 논리를 추가하여 토큰을 사용자 정의하고, Klaytn 네트워크에 배포할 수 있습니다.

자세한 내용은 공식 [ERC-20 문서](https://eips.ethereum.org/EIPS/eip-20)를 참조하세요.

* 깃허브의 [OpenZeppelin의 ERC20.sol](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/9b3710465583284b8c4c5d2245749246bb2e0094/contracts/token/ERC20/ERC20.sol)에서 예시 구현체를 확인할 수 있습니다.

## 대체 불가능한 토큰 표준 \(ERC-721\) <a id="non-fungible-token-standard-erc-721"></a>

대체 불가능한 토큰 표준(NFT, Non-fungible token)은 고유한 자산을 나타내는 특수한 토큰 유형입니다. 대체 불가능한이라는 명칭에서 알 수 있듯이, 각각의 모든 토큰은 고유하고 나눠질 수 없습니다. 대체 불가능한 토큰의 이런 고유한 특성이 자산의 디지털화 시대의 새 지평을 열어줍니다. 예를 들어 NFT는 디지털 예술, 게임 아이템, 또는 모든 종류의 고유한 자산을 나타내고, 사람들 사이에서 이들이 거래되도록 하는 데에 사용될 수 있습니다.

예를 들어, 블록체인 수집 게임인 [크립토키티](https://www.cryptokitties.co/)는 다른 유전 정보를 가진 고양이를 표현하기 위해 대체 불가능한 토큰을 구현합니다. 모든 고양이는 고유하고 상호 교환이 불가능하며, 그 결과 고양이 토큰마다 다른 가치를 가집니다.

대체 불가능한 토큰을 구현하기 위해, Klaytn은 블록체인 개발자들 사이에서 가장 널리 채택된 표준인 ERC-721을 지원합니다. ERC-721 토큰 컨트랙트는 다음의 인터페이스를 구현하기 위한 컨트랙트입니다.

```text
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

위의 인터페이스를 기반으로 개발자는 새로운 기능과 논리를 추가하여 토큰을 사용자 정의하고, Klaytn 네트워크에 배포할 수 있습니다.

자세한 내용은 공식 [ERC-721 문서](https://eips.ethereum.org/EIPS/eip-721)를 참조하세요.

* 깃허브의 [OpenZeppelin의 ERC721.sol](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/token/ERC721/ERC721.sol)에서 예시 구현체를 확인할 수 있습니다.

## Klaytn 서비스체인에 대한 토큰 표준 <a id="token-standards-for-klaytn-service-chain"></a>

서비스체인은 Klaytn의 주 블록체인 네트워크에 기반을 두는 Klaytn의 사이드체인을 의미합니다. 서비스체인을 구현할 때, 주 체인과 서비스체인간의 가치 전송을 지원하기 위해 특별한 유형의 컨트랙트가 사용됩니다. 이 컨트랙트는 현재 개발 중에 있으며, 준비가 완료되면 Klaytn 서비스체인을 위한 토큰 스펙이 KlaytnDocs에 제공될 것입니다.

