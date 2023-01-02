# KlaytnGreeter

`KlaytnGreeter` は挨拶メッセージを返すシンプルなコントラクトです。 コントラクトがデプロイされると挨拶メッセージが設定されます。

## KlaytnGreeter を書く <a href="#writing-klaytngreeter" id="writing-klaytngreeter"></a>

```
pragma solidity 0.5.6;
contract Mortal {
    /* Define variable owner of the type address */
    address payable owner;
    /* This function is executed at initialization and sets the owner of the contract */
    constructor () public { owner = msg.sender; }
    /* Function to recover the funds on the contract */
    function kill() public { if (msg.sender == owner) selfdestruct(owner); }
}

contract KlaytnGreeter is Mortal {
    /* Define variable greeting of the type string */
    string greeting;
    /* This runs once when the contract is created */
    constructor (string memory _greeting) public {
        greeting = _greeting;
    }
    /* Main function */
    function greet() public view returns (string memory) {
        return greeting;
    }
}
```

## Deploying KlaytnGreeter using Remix Online IDE <a href="#deploying-klaytngreeter-using-klaytn-ide" id="deploying-klaytngreeter-using-klaytn-ide"></a>

* Please visit [Klaytn Plugin for Remix](https://ide.klaytn.foundation) and create a `KlaytnGreeter` contract. 完全なソースコードは上記のとおりです。
* コントラクトを展開するために使用されるアカウントを準備します。
  * If you do not have an account yet, create one at [https://baobab.wallet.klaytn.foundation/create](https://baobab.wallet.klaytn.foundation/create) or [https://toolkit.klaytn.foundation/account/accountKeyLegacy](https://toolkit.klaytn.foundation/account/accountKeyLegacy).
  * 蛇口からKLAYテストを受ける - [https://baobab.wallet.klaytn.foundation/faucet](https://baobab.wallet.klaytn.foundation/faucet)
* 最初のパラメータである挨拶メッセージを使用してコントラクトをデプロイします。
* デプロイ後、IDEから `挨拶` を呼び出すことができます。

## 参照 <a href="#references" id="references"></a>

For the details of contract deployment and the Remix Online IDE usage guideline, please refer to the following documents.

* [Remix Online IDE](../ide-and-tools/#klaytn-ide)
* [Truffle](../ide-and-tools/#truffle)
* [導入ガイド](../deploy-guide.md)
