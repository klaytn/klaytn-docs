# ERC-721 例 <a id="erc-721-example"></a>

## はじめに <a id="introduction"></a>

This tutorial helps you to create an example ERC-721 compatible token that conforms to [Klaytn Token Standards](../../token-standard.md), especially [Non-fungible Token Standard (ERC-721)](../../token-standard.md#non-fungible-token-standard-kip-17).

[ERC-721 Non-Fungible Token Standard](https://eips.ethereum.org/EIPS/eip-721) では、以下の3つのイベントと10のメソッドを定義しています。 `supportsInterface` の ERC-721 は [ERC-165 標準インターフェイス検出](https://eips.ethereum.org/EIPS/eip-165) に由来し、ERC-165 は ERC-721 の一部です。 ERC-721互換のトークンは、以下のようにERC-721およびERC-165インターフェイスを実装するトークンコントラクトです。

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

上記のインターフェイスに基づいて、開発者は新しい機能とロジックを追加し、Klaytnネットワークにデプロイすることでトークンをカスタマイズできます。 詳細は公式 [ERC-721 仕様](https://eips.ethereum.org/EIPS/eip-721) を参照してください。

In this tutorial, you are going to implement `MyERC721Card.sol` which implements a card-type non-fungible token, i.e. `MyERC721Card`,  which is an ERC-721 token. それぞれの `MyERC721Card` には名前とレベルがあります。例えば、レベル1の「キング」、レベル1の「クイーン」です。

`MyERC721Card.sol` は OpenZeppelin の ERC721 実装に基づいています。 このチュートリアルのコードの大部分は、 [OpenZeppelin 2.3 ](https://github.com/OpenZeppelin/openzeppelin-solidity/releases/tag/v2.3.0) からフォークされています。

このチュートリアルの残りの部分は以下のように構成されています。

* [1. ERC-721スマートコントラクトを書く](./1-erc721.md)
  - 1.1 `MyERC721Card` コード全体の `MyERC721Card` の全体構造
  - 1.2 重要な関数を見る
* [2. スマートコントラクトの導入](./2-erc721.md)
  - 2.1 Deploying smart contract using Remix Online IDE
  - 2.2 トリュフを使用したスマートコントラクトの導入
