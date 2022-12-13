# テストガイド <a id="testing-guide"></a>
このセクションでは、スマートコントラクトのテスト方法を紹介します。 ブロックチェーン上のトランザクションは元に戻せないため、コントラクトを展開する前にスマートコントラクトをテストすることが重要です。

## Truffleでテスト <a id="testing-with-truffle"></a>
Truffleは自動テストフレームワークを提供します。 このフレームワークでは、シンプルで管理可能な2つの方法でテストを作成できます。
* `Javascript` と `TypeScript`では、アプリケーションと同じように、外部から契約を行使することができます。
* `Solidity`では、事前に契約を行使するため、金属から金属へのまれなシナリオ。

### 1) はじめに <a id="1-getting-started"></a>
Truffle [を使用した](./deploy-guide.md#truffle) 導入ガイド に従ってコントラクトを作成し、それを導入します。 しかし、デプロイする前に、テスト目的のためにsetter 関数 `setGreet` をコントラクトに追加します。 ソースコードは以下の通りです。


**注意:** テストのための契約をいくつか変更しました。

以下は、KlaytnGreet契約のソースコードです。
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

    /* Newly added function for testing. */
    function setGreet(string memory _greeting) public {
        // only owner can change greeting message
        require(msg.sender == owner, "Only owner is allowed.");
        greeting = _greeting;
    }
}
```

We will test 1) `greet()` function whether it returns "Hello, Klaytn" message properly, 2) `setGreet()` function whether it set new greeting message properly and reverts when non-owner account attempts to update the greeting.

最初に、Chai アサーションライブラリ(またはあなたが使用する他のアサーションライブラリ)を一般的なアサーションにインストールします。 スマートコントラクトアサーション用のトリュフアサーションライブラリです
```
npm install --save-dev chai truffle-assertions
```
### 2) 硬度でのライティングテスト <a id="2-writing-test-in-solidity"></a>
Solidityを使ったテストは、JavaScriptのテストよりも少し直感的に行えます。 Solidityテストコントラクトは、JavaScriptテストと共に.solファイルとして動作します。

`テスト` フォルダに `TestKlaytnGreeting.sol` というファイルを作成します。 Truffleスイートにはテスト用のヘルパーライブラリが用意されていますので、インポートする必要があります。 Solidity testの例を見てみましょう。
```
プラグマのソリッド ^0.5.6;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/HashMarket.sol";
```
* Assert : `Assert.equals()`, `Assert.greaterThan()`など、様々なテスト関数にアクセスすることができます。
* DeployedAddresses : コントラクトを変更するたびに、新しいアドレスに再デプロイする必要があります。 このライブラリからデプロイされたコントラクトアドレスを取得できます。

では、テストコードを書いてみましょう。
```
pragma solidity ^0.5.6;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/KlaytnGreeter.sol";

contract TestKlaytnGreeter {

    function testGreetingMessage() public {
        // DeployedAddresses.KlaytnGreeter() handles contract address.
        KlaytnGreeter greeter = KlaytnGreeter(DeployedAddresses.KlaytnGreeter());

        string memory expectedGreet = "Hello Klaytn";

        string memory greet = greeter.greet();

        Assert.equal(greet, expectedGreet, "greeting message should match");
    }
}
```

堅牢性テストコードを実行します。
```
$ truffle test
# Output
ネットワークの 'development' を使う。


契約をコンパイルしています...
===========================
> Compiling ./test/TestKlaytnGreeter.sol



  TestKlaytnGreeter
    1) testGreetingMessage

    Events emitted during test:
    ---------------------------


    ---------------------------


  0 passing (5s)
  1 failing

  1) TestKlaytnGreeter
       testGreetingMessage:
     Error: greeting message should match (Tested: Hello, Klaytn, Against: Hello Klaytn)
      at result.logs.forEach.log (/Users/jieunkim/.nvm/versions/node/v10.16.0/lib/node_modules/truffle/build/webpack:/packages/core/lib/testing/soliditytest.js:71:1)
      at Array.forEach (<anonymous>)
      at processResult (/Users/jieunkim/.nvm/versions/node/v10.16.0/lib/node_modules/truffle/build/webpack:/packages/core/lib/testing/soliditytest.js:69:1)
      at process._tickCallback (internal/process/next_tick.js:68:7)
```
失敗しました。 エラーメッセージを確認してみましょう。`エラー: グリーティングメッセージが一致するはずです(テスト: Hello, Klaytn, Agst: Hello Klaytn)`. I can notice the missed `',(comma)'` at *string memory expectedGreet = "Hello Klaytn"*.  
Fix the code and run the test again.
```
$ truffle test
# Output
ネットワークの 'development' を使う。


契約をコンパイルしています...
===================================
> Compiling ./test/TestKlaytnGreeter.sol



  TestKlaytnGreeter
    ✓ testGreetingMessage (58ms)


  1 passing (5s)
```
おめでとうございます テストは合格しました。

### 3) JavaScriptでテストを書く <a id="3-writing-test-in-javascript"></a>
Truffleは [Mocha](https://mochajs.org/) テストフレームワークを使用し、 [Chai](https://www.chaijs.com/) assertionライブラリをJavaScriptテスト用の固体フレームワークを提供します。 JavaScriptテストでは、より柔軟性が高く、より複雑なテストを書くことができます。

`test` ディレクトリの下に `0_KlaytnGreeting.js` というファイルを作成しましょう。  
テストコードは次のとおりです:
```javascript
// Interacting directly with KlaytnGreeter contract
const KlaytnGreeter = artifacts.require("./KlaytnGreeter.sol");
const truffleAssert = require('truffle-assertions');

contract("KlaytnGreeter", async(accounts) => {
    // store the contract instance at a higher level 
    // to enable access from all functions.
    var klaytnGreeterInstance;
    var owner = accounts[0];
    var greetMsg = "Hello, Klaytn";

    // This will run before each test proceed.
    before(async function() {
        // set contract instance into a variable
        klaytnGreeterInstance = await KlaytnGreeter.new(greetMsg, {from:owner});
    })

    it("#1 check Greeting message", async function() {
        // set the expected greeting message
        var expectedGreeting = greetMsg;
        var greet= await klaytnGreeterInstance.greet();
        assert.equal(expectedGreeting, greet, "greeting message should match");

    })

    it("#2 update greeting message.", async function() {
        var newGreeting = "Hi, Klaytn";

        await klaytnGreeterInstance.setGreet(newGreeting, { from:owner });
        var greet = await klaytnGreeterInstance.greet();
        assert.equal(newGreeting, greet, "greeting message should match");
    });

    it("#3 [Failure test] Only owner can change greeting.", async function() {
        var fakeOwner = accounts[1];        
        await truffleAssert.fails(klaytnGreeterInstance.setGreet(greetMsg, { from:fakeOwner }));
    });
});
```
`Mocha` ユニットテストに慣れていない場合は、 [Mocha ドキュメント](https://mochajs.org/#getting-started) を確認してください。

* describe() の代わりに contract() を使用する  
  構造的には、Truffleテストコードは通常のMochaテストコードと大きく異なるべきではありません。 テストには、Mocha が自動テストとして認識するコードが含まれている必要があります。 The difference between Mocha and Truffle test is the contract() function.  
  **NOTE** the use of the `contract()` function, and the `accounts` array for specifying available Klaytn accounts.

* テスト内のコントラクト抽象化  
  Truffleにはテスト中にどのコントラクトを使用する必要があるかを検出する方法がありません。 明示的に契約書を指定すべきだ これを行う一つの方法は、 `artifacts.require()` メソッドを使用することです。

* `それ` 構文  
  これは説明を持つ各テストケースを表します。 説明はテスト実行時にコンソールに表示されます。

* `truffle-assertion` library  
  This library allows you to easily test reverts or other failures by offering the `truffleAssert.reverts()` and `truffleAssert.fails()` functions.

出力は次のようにする必要があります:
```
ネットワーク「開発」を使用しています。


契約をコンパイルしています...
===================================
> すべてが最新で、コンパイルするものは何もありません。



  契約: KlaytnGreeter
    ✓ #1 check挨拶メッセージ
    ✓ #2 updateグリーティングメッセージ。 (46ms)
    ✓ #3 [失敗テスト] オーナーのみが挨拶を変更できます。


  3通（158ms）
```
おめでとうございます テストは合格しました。

### 4) テストの指定 <a id="4-specifying-test"></a>
実行するテストファイルを選択できます。
```
トリュフテスト ./test/0_KlaytnGreeting.js
```

詳細については、 [Truffle testing](https://www.trufflesuite.com/docs/truffle/testing/testing-your-contracts) と [Truffle commands](https://www.trufflesuite.com/docs/truffle/reference/truffle-commands#test) をご確認ください。
