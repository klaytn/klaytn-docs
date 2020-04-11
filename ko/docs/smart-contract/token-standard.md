# Klaytn Compatible Tokens \(KCTs\) <a id="klaytn-compatible-tokens-kcts"></a>

Klaytn 호환 토큰(KCT, Klaytn Compatible Token)는 특정 기술 스펙을 구현한 특별한 타입의 스마트 컨트랙트입니다. Klaytn에서 토큰을 발행하려는 모든 사람들은 스펙을 따라야 합니다.

Klaytn 토큰 표준은 [KIP-7](https://kips.klaytn.com/KIPs/kip-7), [KIP-17](https://kips.klaytn.com/KIPs/kip-17)과 같이 정의되어 있습니다.

Other KCTs can be defined to meet certain technical specifications. If anyone who needs another token standards, please visit [Klaytn Improvement Proposal](https://github.com/klaytn/KIPs) and propose a new token standard.

## Fungible Token Standard \(KIP-7\) <a id="fungible-token-standard-kip-7"></a>

대체 가능한 토큰은 균등성과 가분(可分)성을 가진 토큰입니다. 각 토큰 단위는 동일한 가치를 가지므로 모든 가용 토큰은 서로 호환됩니다. 모든 달러 지폐가 동일하게 1달러 가치인 것과 같습니다. 대부분의 경우 대체 가능성은 암호 화폐에 필수적인 기능이기 때문에, 블록체인 토큰 중 많은 비율이 대체 가능한 토큰입니다.

To implement these properties with smart contracts, KIP-7 token standard can be used. KIP-7-compatible tokens implement the following interface. Please note that [KIP-13](https://kips.klaytn.com/KIPs/kip-13) must be implemented together. For wallet applications, [wallet interface](https://kips.klaytn.com/KIPs/kip-7#wallet-interface) can be implemented.

```solidity
// IKIP7
event Transfer(address indexed from, address indexed to, uint256 value);
event Approval(address indexed owner, address indexed spender, uint256 value);

function totalSupply() external view returns (uint256);
function balanceOf(address account) external view returns (uint256);
function transfer(address recipient, uint256 amount) external returns (bool);
function allowance(address owner, address spender) external view returns (uint256);
function approve(address spender, uint256 amount) external returns (bool);
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
function safeTransfer(address recipient, uint256 amount, bytes data) external;
function safeTransfer(address recipient, uint256 amount) external;
function safeTransferFrom(address sender, address recipient, uint256 amount, bytes data) external;
function safeTransferFrom(address sender, address recipient, uint256 amount) external;

// IKIP7Metadata (optional)
function name() external view returns (string memory);
function symbol() external view returns (string memory);
function decimals() external view returns (uint8);

// IKIP7Mintable (optional)
function mint(address _to, uint256 _amount) external returns (bool);
function isMinter(address _account) external view returns (bool);
function addMinter(address _account) external;
function renounceMinter() external;

// IKIP7Burnable (optional)
function burn(uint256 _amount) external;
function burnFrom(address _account, uint256 _amount) external;

// IKIP7Pausable (optional)
event Paused(address _account);
event Unpaused(address _account);

function paused() external view returns (bool);
function pause() external;
function unpause() external;
function isPauser(address _account) external view returns (bool);
function addPauser(address _account) external;
function renouncePauser() external;
```

Based on the interface above, developers may customize tokens by adding new features and logics, and deploy them on Klaytn network.

For more information, refer to official [KIP-7 documentation](https://kips.klaytn.com/KIPs/kip-7).

* An example implementation is available at [https://github.com/klaytn/caver-js/blob/dev/packages/caver-klay/caver-klay-kct/contract/token/KIP7/KIP7.sol](https://github.com/klaytn/caver-js/blob/dev/packages/caver-klay/caver-klay-kct/contract/token/KIP7/KIP7.sol) on Github.

## Non-fungible Token Standard \(KIP-17\) <a id="non-fungible-token-standard-kip-17"></a>

대체 불가능한 토큰 표준(NFT, Non-fungible token)은 고유한 자산을 나타내는 특수한 토큰 유형입니다. 대체 불가능한이라는 명칭에서 알 수 있듯이, 각각의 모든 토큰은 고유하고 나눠질 수 없습니다. 대체 불가능한 토큰의 이런 고유한 특성이 자산의 디지털화를 위한 새 지평을 열어줍니다. 예를 들어 NFT는 디지털 예술, 게임 아이템, 또는 모든 종류의 고유한 자산을 나타내고, 사람들 사이에서 이들이 거래되도록 하는 데에 사용될 수 있습니다.

예를 들어, 블록체인 수집 게임인 [크립토키티](https://www.cryptokitties.co/)는 다른 유전 정보를 가진 고양이를 표현하기 위해 대체 불가능한 토큰을 구현합니다. 모든 고양이는 고유하고 상호 교환이 불가능하며, 그 결과 고양이 토큰마다 다른 가치를 가집니다.

To implement non-fungible token, [KIP-17](https://kips.klaytn.com/KIPs/kip-17) can be used. KIP-17 token contracts implement the following interface. Please note that [KIP-13](https://kips.klaytn.com/KIPs/kip-13) must be implemented together. For wallet applications, [wallet interface](https://kips.klaytn.com/KIPs/kip-17#wallet-interface) can be implemented.

```solidity
// IKIP17
event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);

function balanceOf(address _owner) external view returns (uint256);
function ownerOf(uint256 _tokenId) external view returns (address);
function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes _data) external payable;
function safeTransferFrom(address _from, address _to, uint256 _tokenId) external payable;
function transferFrom(address _from, address _to, uint256 _tokenId) external payable;
function approve(address _approved, uint256 _tokenId) external payable;
function setApprovalForAll(address _operator, bool _approved) external;
function getApproved(uint256 _tokenId) external view returns (address);
function isApprovedForAll(address _owner, address _operator) external view returns (bool);

// IKIP17Metadata (optional)
function name() external view returns (string _name);
function symbol() external view returns (string _symbol);
function tokenURI(uint256 _tokenId) external view returns (string);

// IKIP17Enumerable (optional)
function totalSupply() external view returns (uint256);
function tokenByIndex(uint256 _index) external view returns (uint256);
function tokenOfOwnerByIndex(address _owner, uint256 _index) external view returns (uint256);

// IKIP17Mintable (optional)
function mint(address _to, uint256 _tokenId) public returns (bool);
function isMinter(address _account) public view returns (bool);
function addMinter(address _account) public;
function renounceMinter() public;

// IKIP17MetadataMintable (optional)
function mintWithTokenURI(address _to, uint256 _tokenId, string memory _tokenURI) public returns (bool);
function isMinter(address _account) public view returns (bool);
function addMinter(address _account) public;
function renounceMinter() public;

// IKIP17Burnable (optional)
function burn(uint256 _tokenId) public;

// IKIP17Pausable (optional)
event Paused(address _account);
event Unpaused(address _account);
function paused() public view returns (bool);
function pause() public;
function unpause() public;
function isPauser(address _account) public view returns (bool);
function addPauser(address _account) public;
function renouncePauser() public;
```

Based on above interface, developers may customize tokens by adding new features and logics, and deploy them on Klaytn network.

For more information, refer to official [KIP-17 documentation](https://kips.klaytn.com/KIPs/kip-17).

* An example implementation is available at [https://github.com/klaytn/caver-js/blob/dev/packages/caver-klay/caver-klay-kct/contract/token/KIP17/KIP17.sol](https://github.com/klaytn/caver-js/blob/dev/packages/caver-klay/caver-klay-kct/contract/token/KIP17/KIP17.sol) on Github.

## Klaytn 서비스체인에 대한 토큰 표준 <a id="token-standards-for-klaytn-service-chain"></a>

서비스체인은 Klaytn의 메인 블록체인 네트워크에 기반을 두는 Klaytn의 사이드체인을 의미합니다. 서비스체인을 구현할 때, 주 체인과 서비스체인간의 가치 전송을 지원하기 위해 특별한 유형의 컨트랙트가 사용됩니다. 이 컨트랙트는 현재 개발 중에 있으며, 준비가 완료되면 Klaytn 서비스체인을 위한 토큰 스펙이 KlaytnDocs에 제공될 것입니다.

## Notes on ERC-20 and ERC-721 <a id="notes-on-erc-20-and-erc-721"></a>
Since Klaytn published KIP-7 and KIP-17 as its token standards, it is recommended to implement fungible and non-fungible token contracts according to KIP-7 and KIP-17, respectively, rather than following ERC-20 and ERC-721. KIP-7 and KIP-17 are based on ERC-20 and ERC-721, but they are tailored for Klaytn and thus more suitable on Klaytn ecosystem. ERC-20 and ERC-721 are still available on Klaytn network. However, they may not be supported on other tools involved in Klaytn ecosystem. For more information about the differences on token standards, please visit [KIP-7](https://kips.klaytn.com/KIPs/kip-7#differences-with-erc-20) and [KIP-17](https://kips.klaytn.com/KIPs/kip-17#differences-from-erc-721).
