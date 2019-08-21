# Klaytn Token Standard

Klaytn supports Ethereum token standards, specifically ERC20 and ERC721. These standards are widely adopted among blockchain developers. Thus as of this moment Klaytn is Ethereum-compatible to provide familiar development experience to blockchain developers.

Nevertheless, note that Klaytn embraces new features that Ethereum does not provide, such as role-based accounts, fee delegation. These new features, or any other features that Klaytn will provide in the future, may require their own standards. Or even ERC20, and ERC721 standards can be powerfully upgraded when integrated with Klaytn specific features. For these reasons, Klaytn team is planning to provide various ways \(such as developers' portal and Github issues\) for developers to actively discuss ideas and propose new standards.

## Fungible Token Standard \(ERC-20\)

Fungible tokens are tokens that have properties of uniformity and divisibility. Every fungible token is interchangeable as each unit of token possesses the same value. Just like every dollar bill has the same value of one dollar. Since fungibility is essential feature to crypto currency in most cases, large proportion of blockchain tokens are fungible tokens.

To implement these properties with Solidity smart contracts, Solidity developer community has come up with ERC-20 token standard. ERC-20-compatible tokens are token contracts that implements the following interface.

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

Based on above interface, developers may customize tokens by adding new features and logics, and deploy on Klaytn network.

For more information, refer to official [ERC-20 documentation](https://eips.ethereum.org/EIPS/eip-20).

* An example implementation is available at [OpenZeppelin's ERC20.sol](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/9b3710465583284b8c4c5d2245749246bb2e0094/contracts/token/ERC20/ERC20.sol) on Github.

## Non-fungible Token Standard \(ERC-721\)

Non-fungible token \(NFT\) is a special type of token that represents a unique asset. As the name non-fungible implies, every single token is unique and non-divisible. This uniqueness of non-fungible token opens up new horizons of asset digitization. For example, it can be used to represent digital art, game items, or any kind of unique assets and allow people to trade them.

For example, a blockchain collection game [Cryptokitties](https://www.cryptokitties.co/) implements non-fungible token to represent different kitties that have different genetic information. Every kitty is unique and non-interchangeable, resulting in different values for different kitty tokens.

To implement non-fungible token, Klaytn supports ERC-721, which is the most widely adopted standard among blockchain developers. ERC-721 token contracts are contracts that implements the following interface.

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

Based on above interface, developers may customize tokens by adding new features and logics, and deploy on Klaytn network.

For more information, refer to official [ERC-721 documentation](https://eips.ethereum.org/EIPS/eip-721).

* An example implementation is available at [OpenZeppelin's ERC721.sol](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/token/ERC721/ERC721.sol) on Github.

## Token Standards for Klaytn Service Chain

Service chain refers to Klaytn's side chain that anchors to Klaytn's main blockchain network. When implementing a service chain, special type of contracts are used to support value transfer between the main chain and the service chain. These contracts are currently under development, and when they are ready, the token specifications for Klaytn service chain will be provided on KlaytnDocs.

