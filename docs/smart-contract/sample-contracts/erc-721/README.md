# ERC-721

## Introduction <a id="introduction"></a>

This tutorial helps you to create an example ERC-721 compatible token that conforms to [Klaytn Token Standards](../../token-standard.md), especially [Non-fungible Token Standard \(ERC-721\)](../../token-standard.md#non-fungible-token-standard-kip-17).

[ERC-721 Non-Fungible Token Standard](https://eips.ethereum.org/EIPS/eip-721) defines three events and 10 methods as below. `supportsInterface` of ERC-721 is derived from [ERC-165 Standard Interface Detection](https://eips.ethereum.org/EIPS/eip-165) and ERC-165 is a part of ERC-721. ERC-721 compatible tokens are the token contracts that implement ERC-721 and ERC-165 interfaces as below.

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

Based on above interface, developers may customize tokens by adding new features and logics, and deploy on Klaytn network. For more information, refer to official [ERC-721 specification](https://eips.ethereum.org/EIPS/eip-721).

In this tutorial, you are going to implement `MyERC721Card.sol` which implements a card-type non-fungible token, i.e. `MyERC721Card`, which is an ERC-721 token. Each `MyERC721Card` has name and level, e.g. "King" with level 1, "Queen" with level 1.

`MyERC721Card.sol` is based on OpenZeppelin's ERC721 implementation. A major part of the code in this tutorial is forked from [OpenZeppelin 2.3 ](https://github.com/OpenZeppelin/openzeppelin-solidity/releases/tag/v2.3.0).

The rest of this tutorial is organized as follows.

* [1. Writing ERC-721 smart contract](1-erc721.md)
  * 1.1 Overall structure of `MyERC721Card` code with whole `MyERC721Card` code
  * 1.2 Take a look at important functions
* [2. Deploying smart contract](2-erc721.md)
  * 2.1 Deploying smart contract using Klaytn IDE
  * 2.2 Deploying smart contract using truffle

