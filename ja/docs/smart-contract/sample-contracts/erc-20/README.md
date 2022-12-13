# ERC-20 <a id="erc-20"></a>

## はじめに <a id="introduction"></a>

This tutorial helps you to create an example ERC-20 compatible token that conforms to the [Klaytn Token Standards](../../token-standard.md), especially [Fungible Token Standard \(ERC-20\)](../../token-standard.md#fungible-token-standard-kip-7).

[ERC-20 トークン標準](https://eips.ethereum.org/EIPS/eip-20) は以下のように2つのイベントと9つのメソッド \(3つのオプションメソッドを含む) を定義しています。 ERC-20互換トークンは、以下のインターフェイスを実装したトークンコントラクトです。

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

上記のインターフェイスに基づいて、開発者は新しい機能とロジックを追加し、Klaytnネットワークにデプロイすることでトークンをカスタマイズできます。 詳細については、公式の [ERC-20 ドキュメント](https://eips.ethereum.org/EIPS/eip-20) を参照してください。

このチュートリアルでは、ERC-20互換のトークンである `MyERC20.sol`を実装します。 このトークンはあらかじめ定義された量のトークンを発行し、そのデプロイ時にコントラクト所有者にすべてのトークンを送信します。

`MyERC20.sol` は OpenZeppelinのERC20実装に基づいている。 A major part of the code in this tutorial is forked from [OpenZeppelin 2.3 ](https://github.com/OpenZeppelin/openzeppelin-solidity/releases/tag/v2.3.0) and following Solidity files are used to implement `MyERC20.sol`.

* [https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/IERC20.sol](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/IERC20.sol)
* [https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/ERC20.sol](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/ERC20.sol)
* [https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/ERC20Detailed.sol](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/ERC20Detailed.sol)
* [https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/math/SafeMath.sol](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/math/SafeMath.sol)

このチュートリアルの残りの部分は以下のように構成されています。

* [1. ERC-20スマートコントラクトを書く](1-erc20.md)
  * 1.1 `MyERC20` コード全体の `MyERC20` コードの全体構造
  * 1.2 重要な関数を見る
* [2. スマートコントラクトの導入](2-erc20.md)
  * 2.1 Klaytn IDE を使用したスマートコントラクトの導入
  * 2.2 トリュフを使用したスマートコントラクトの導入
* [3. ERC-20トークンとKlaytnウォレットの間で相互作用する](3-erc20.md)

