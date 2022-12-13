# KlaytnGreeter <a id="klaytngreeter"></a>

`KlaytnGreeter` は挨拶メッセージを返すシンプルなコントラクトです。 コントラクトがデプロイされると挨拶メッセージが設定されます。

## KlaytnGreeter を書く <a id="writing-klaytngreeter"></a>

```text
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

## Klaytn IDE を使用して KlaytnGreeter をデプロイする <a id="deploying-klaytngreeter-using-klaytn-ide"></a>

* [Klaytn IDE のウェブサイト](https://ide.klaytn.foundation) にアクセスして `KlaytnGreeter` 契約を作成してください。 完全なソースコードは上記のとおりです。
* コントラクトを展開するために使用されるアカウントを準備します。
  * まだアカウントをお持ちでない場合は、 [https://baobab.wallet.klaytn.foundation/create](https://baobab.wallet.klaytn.foundation/create) でアカウントを作成してください。
  * 蛇口からKLAYテストを受ける - [https://baobab.wallet.klaytn.foundation/faucet](https://baobab.wallet.klaytn.foundation/faucet)
* 最初のパラメータである挨拶メッセージを使用してコントラクトをデプロイします。
* デプロイ後、IDEから `挨拶` を呼び出すことができます。

## 参照 <a id="references"></a>

コントラクトデプロイメントの詳細と、Klaytn IDEの使用ガイドラインについては、以下のドキュメントを参照してください。

* [Klaytn IDE](../ide-and-tools/README.md#klaytn-ide)
* [Truffle](../ide-and-tools/README.md#truffle)
* [導入ガイド](../deploy-guide.md)



