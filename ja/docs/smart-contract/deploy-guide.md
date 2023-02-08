# 導入ガイド <a id="deploy-guide"></a>

Klaytnにスマートコントラクトを展開するにはさまざまな方法があります。 このドキュメントでは、さまざまなツールを使用してサンプルコントラクトをデプロイするためのステップバイステップガイドを提供します。 取引手数料を支払うのに十分な KLAYを備えた Klaytn アカウントがあることを前提としています。 アカウントを作成するには、 [Klaytn Wallet](../toolkit/klaytn-wallet.md) を参照してください。

## Remix Online IDE <a id="remix-ide"></a>

Open your internet browser and go to [Klaytn Plugin for Remix](https://ide.klaytn.foundation).


- 新規ファイルを追加

![](img/deploy-with-ide/01_deployment_ide.png)


- 新しいファイルに次のサンプルコード(またはデプロイするコード)をコピーして貼り付けます。 このコードは、MortalとKlaytnGreeterと呼ばれる2つの契約で構成されており、簡単な「Hello World!」を実行することができます。

```
pragma solidity 0.5.12;

contract Mortal {
    /* Define variable owner of the type address */
    address payable owner;
    /* This function is executed at initialization and sets the owner of the contract */
    constructor () public { owner = msg.sender; }
    /* Function to recover the funds on the contract */
    function kill() public payable { if (msg.sender == owner) selfdestruct(owner); }
}

contract KlaytnGreeter is Mortal {
    /* Define variable greeting of the type string */
    string greeting;
    /* This runs when the contract is executed */
    constructor (string memory _greeting) public {
        greeting = _greeting;
    }
    /* Main function */
    function greet() public view returns (string memory) {
        return greeting;
    }
}
```

- アイコンパネルで「コンパイラー」を選択します。 希望するEVM環境を選択します。 Klaytnネットワークの場合、Baobab(testnet)とサイプレス(mainnet)のどちらかを選択できます。 実際の展開前にサンプルコードを遵守する準備ができたら、 `Compile` をクリックします。

![](img/deploy-with-ide/02_deployment_compile.png)

- 今度は契約を展開することができます。 アイコンパネルの Klaytn ロゴをクリックします。 `アカウント` の横にあるプラスボタンをクリックして口座をインポートします。 必要なスマートコントラクトを展開するトランザクションに対して支払うのに十分な KLAYがアカウントにあることを確認してください。

![](img/deploy-with-ide/05_deployment_account.png)

- 送信するガスの上限と値を設定します。
  - より複雑な契約を展開する場合は、より高いガス制限を設定する必要がある場合があります。 この例ではそのままにしておくことができます。
  - デプロイ時にコントラクトに `KLAY` を送信する場合を除き、 `値` を0に設定します。
- コンストラクタ関数の引数として "Hello World!" と入力し、 `Deploy` ボタンをクリックします。

![](img/deploy-with-ide/03_deployment_hello.png)

- コントラクトが正常に展開されると、対応するトランザクション受領と端末の詳細な結果が表示されます。

- 機能ボタンをクリックすることで、コントラクトを操作できます。 機能は異なる色で表されます。 `constant` または `純粋な` 関数は青いボトル(例では`あいさつ` )を持ち、新しいトランザクションを作成しません。 ガソリン代はかからないのです 赤色のボタン (`kill` ) は、ブロックチェーン上の状態を変更する `payable` 関数を表します。 ガスを消費し価値を受け入れることができます Orange ボタンは `non-payable` 関数で、コントラクトの状態を変更しますが、値を受け付けません。

![](img/deploy-with-ide/06_deployment_functions.png)

詳細については、こちらの [リンク](../toolkit/klaytn-ide.md)をご覧ください。

## Truffle  <a id="truffle"></a>

Truffleは、スマートコントラクトの導入と実行のための最も一般的なフレームワークです。

- 以下のコマンドでインストールします。

```
$ sudo npm install -g truffle
```

- プロジェクトディレクトリを設定し、インストール .`truffle-hdwallet-provider-klaytn`

```
$ mkdir hello-klaytn
$ cd hello-klaytn
$ truffle-init
$ npm install truffle-hdwallet-provider-klaytn
```

- `KlaytnGreeter.sol` を `/contracts` ディレクトリの下に作成し、次のコードをコピーします。

```
pragma solidity 0.5.6;

contract Mortal {
    /* Define variable owner of the type address */
    address payable owner;
    /* This function is executed at initialization and sets the owner of the contract */
    constructor () public { owner = msg.sender; }
    /* Function to recover the funds on the contract */
    function kill() public payable { if (msg.sender == owner) selfdestruct(owner); }
}

contract KlaytnGreeter is Mortal {
    /* Define variable greeting of the type string */
    string greeting;
    /* This runs when the contract is executed */
    constructor (string memory _greeting) public {
        greeting = _greeting;
    }
    /* Main function */
    function greet() public view returns (string memory) {
        return greeting;
    }
}
```

- 以下のように、 `/migrations/1_initial_migration.js` を変更します。

```
const Migrations = artifacts.require("./Migrations.sol");
const KlaytnGreeter = artifacts.require("./KlaytnGreeter.sol");
module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(KlaytnGreeter, 'Hello, Klaytn');
};
```

- Set `truffle-config.js` as below. コントラクトをデプロイするのに十分な `KLAY` を持つアカウントの秘密鍵を入力してください。

```
const HDWalletProvider = require("truffle-hdwallet-provider-klaytn");

const privateKey = "0x3de..." // Enter your private key;

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    testnet: {
      provider: () => new HDWalletProvider(privateKey, "https://your.baobab.en.url:8651"),
      network_id: '1001', //Klaytn baobab testnet's network id
      gas: '8500000',
      gasPrice: null
    },
    mainnet: {
      provider: () => new HDWalletProvider(privateKey, "https://your.cypress.en.url:8651"),
      network_id: '8217', //Klaytn mainnet's network id
      gas: '8500000',
      gasPrice: null
    }
  },
  compilers: {
    solc: {
      version: "0.5.6"
    }
  }
};
```
*注意*: 本番環境での使用にはこの例は推奨されていません。 秘密鍵を扱うときは注意してください。

- Klaytn testnet にデプロイします。

```
$ truffle deploy --network testnet
```

- Klaytn mainnetにデプロイする。

```
$ truffle deploy --network mainnet
```

詳細については、この [リンク](../toolkit/truffle.md) を参照してください。

## VVISP <a id="vvisp"></a>
vvisp は、HEACHI LABSが提供するスマートコントラクトを開発するための使いやすいCLIツール/フレームワークです。 単一のコマンドで簡単に環境を設定、デプロイ、Klaytn スマートコントラクトを実行できます。 詳細は以下のリンクをご参照ください。
- https://henesis.gitbook.io/vvisp/deploying-smart-contracts

## solc & caver-js <a id="solc-caver-js"></a>

契約をデプロイするもう1つの方法は、Solc を使用して契約を手動でコンパイルし、caver-js でそれらをデプロイすることです。

- `KlaytnGreeter.sol` を作成し、次のコードを書きます。

```
pragma solidity 0.5.6;

contract Mortal {
    /* Define variable owner of the type address */
    address payable owner;
    /* This function is executed at initialization and sets the owner of the contract */
    constructor () public { owner = msg.sender; }
    /* Function to recover the funds on the contract */
    function kill() public payable { if (msg.sender == owner) selfdestruct(owner); }
}

contract KlaytnGreeter is Mortal {
    /* Define variable greeting of the type string */
    string greeting;
    /* This runs when the contract is executed */
    constructor (string memory _greeting) public {
        greeting = _greeting;
    }
    /* Main function */
    function greet() public view returns (string memory) {
        return greeting;
    }
}
```

- Install solc 0.5.6.

```
$ sudo npm install -g solc@0.5.6
```

- 契約をコンパイルします。

```
$ solcjs KlaytnGreeter.sol --bin
```

- caver-jsをインストールする。

```
$ npm install caver-js.
```

- 同じディレクトリに `deploy.js` を次のコードで作成します。

```
const Caver = require("caver-js");
const caver = new Caver("https://api.baobab.klaytn.net:8651")

const walletInstance = caver.klay.accounts.privateKeyToAccount(
  '0x3de0c9...' // enter your private key to deploy contract with
);
caver.klay.accounts.wallet.add(walletInstance);

const fs = require('fs')
const bytecode = fs.readFileSync('./KlaytnGreeter_sol_KlaytnGreeter.bin') // compiled output

const constructorType = ['string']  // enter appropriate constructor type
const constructorValue = ['Hello, Klaytn!']

const params = caver.klay.abi.encodeParameters(constructorType, constructorValue);

caver.klay.sendTransaction({
  from: caver.klay.accounts.wallet[0].address,
  gas: "50000000",
  data: bytecode.toString() + params.substring(2, params.length)
})
.once("receipt", receipt => {
  console.log(receipt)
})
.once("error", error => {
  console.log(error);
})
```
*NOTE*: This example is not recommended for production use. Be very careful when dealing with private keys.

- ノード環境を使用してコントラクトをデプロイします。

```
$ node deploy.js
```

