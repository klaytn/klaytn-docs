# ERC-20 <a id="erc-20"></a>

## Introduction <a id="introduction"></a>

This tutorial helps you to create an example ERC-20 compatible token that conforms to the [Klaytn Token Standards](../../token-standard.md), especially [Fungible Token Standard \(ERC-20\)](../../token-standard.md#fungible-token-standard-kip-7).

[ERC-20 Token Standard](https://eips.ethereum.org/EIPS/eip-20) defines two events and 9 methods \(including 3 optional methods\) as below. ERC-20-compatible tokens are token contracts that implements the following interface.

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

Based on above interface, developers may customize tokens by adding new features and logics, and deploy on Klaytn network. For more information, refer to official [ERC-20 documentation](https://eips.ethereum.org/EIPS/eip-20).

In this tutorial, you are going to implement `MyERC20.sol`, an ERC-20 compatible token. This token will issue a predefined amount of tokens and sends all of the tokens to the contract owner on its deploy.

`MyERC20.sol` is based on OpenZeppelin's ERC20 implementation. A major part of the code in this tutorial is forked from [OpenZeppelin 2.3 ](https://github.com/OpenZeppelin/openzeppelin-solidity/releases/tag/v2.3.0) and following Solidity files are used to implement `MyERC20.sol`.

* [https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/IERC20.sol](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/IERC20.sol)
* [https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/ERC20.sol](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/ERC20.sol)
* [https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/ERC20Detailed.sol](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/ERC20Detailed.sol)
* [https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/math/SafeMath.sol](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/math/SafeMath.sol)

The rest of this tutorial is organized as follows.

* [1. Writing ERC-20 smart contract](1-erc20.md)
  * 1.1 Overall structure of `MyERC20` code with whole `MyERC20` code
  * 1.2 Take a look at important functions
* [2. Deploying smart contract](2-erc20.md)
  * 2.1 Deploying smart contract using Klaytn IDE
  * 2.2 Deploying smart contract using truffle
* [3. Interacting between ERC-20 token and Klaytn wallet](3-erc20.md)

