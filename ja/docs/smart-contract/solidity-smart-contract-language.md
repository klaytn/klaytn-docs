# Solidity - スマートコントラクト言語 <a id="solidity-smart-contract-language"></a>

この章では、Solidityが公式ウェブサイトで既によく文書化されているため、Solidityで書かれた高レベルの概念、開発プロセス、および例についてのみ説明します。 言語の仕様や実装については、以下の [リファレンス](#references) を参照してください。 この章の内容は、 [リファレンス](#references)に記載されている様々なウェブサイトに基づいています。

## SolidityとKlaytn <a id="solidity-and-klaytn"></a>

[Solidity](https://github.com/ethereum/solidity) は、Ethereumプラットフォーム上でスマートコントラクトを実装するための高レベルの静的型、契約指向言語である。 SolidityはもともとEthereum用に設計されていましたが、スマートコントラクトを書くのに十分な一般的です。 したがって、Klaytnなどの他のブロックチェーンプラットフォームでも使用できます。

Klaytnは **London** Ethereum Virtual Machine (EVM)バージョンと公式に互換性があります。 後方互換性は、Klaytnの他のEVMバージョンでは保証されません。 したがって、イスタンブールのターゲットオプションでSolidityコードをコンパイルすることを強くお勧めします。 [Solc の EVM バージョンの設定方法](https://solidity.readthedocs.io/en/latest/using-the-compiler.html#setting-the-evm-version-to-target) を参照してください。

{% hint style="success" %}
v1.7.0 Protocol Upgrade - incompatible changes including **Istanbul** hard fork items and Klaytn's own items. It has been enabled from block number `#75,373,312` in case of Baobab network and `#86,816,005` for the Cypress network.

v1.7.3 Protocol Upgrade - incompatible changes including Base Fee from the **London** hard fork. It has been enabled from block number `#80,295,291` in case of Baobab network and `#86,816,005` for the Cypress network.

v1.8.0 Protocol Upgrade - incompatible changes including Base Fee from the **London** hard fork. It has been enabled from block number `#86,513,895` in case of Baobab network and `#86,816,005` for the Cypress network.
{% endhint %}

[Remix](https://remix.ethereum.org/) \(ブラウザベースのIDE\) や [Truffle](https://github.com/trufflesuite/truffle) \(開発フレームワーク\) などの開発ツールは、Klaytn のスマートコントラクトを開発する際に利用できます。 KlaytnチームはEthereumの開発ツールとKlaytnの間の互換性を維持しようとしますが、必要に応じて、Klaytnスマートコントラクト開発者にこれらのツールの拡張バージョンまたは更新バージョンを提供することを選択することができます。

スマートコントラクトを開発するためにRemix や Truffle を利用するのは便利ですが、Solidity コンパイラはローカルで使用できます。 以下のウェブページに記載されている指示に従って、それを構築またはインストールすることによって、

* [Solidity コンパイラのインストール](https://docs.soliditylang.org/en/latest/installing-solidity.html)

2つのコマンドラインSolidityコンパイラがあります。

* _solc_: フル機能のコンパイラ。
  * Solidity documentation でカバーされています
* _solcjs_: _solc 用の Javascript バインド_
  * 別のプロジェクト [solc-js](https://github.com/ethereum/solc-js) としてメンテナンスされます
  * _solcjs_のコマンドラインオプションは _solc_ のものと互換性がありません。

Solidityを始めるのに役立つ他の材料には、以下のものがあります。

* [上位の堅牢なチュートリアル](https://medium.com/coinmonks/top-solidity-tutorials-4e7adcacced8)

## スマートコントラクトの作成方法 <a id="how-to-write-a-smart-contract"></a>

このセクションでは、Solidityソースコードの例を紹介し、スマートコントラクトの見た目とコントラクトの書き方を読者に提供します。 ここに含まれるコードは説明目的のみを目的として提供されていることに注意してください。 コード内で。 `(require)` は、 `(オプション)` は、その行が必ずしも必要ではないことを示しています。 シンボル `Ln:` は Solidity コードの一部ではなく、行番号を表示するためにここに含まれています。 実際の使用を目的としたソースコードにこれらの記号を含めないでください。

```text
L01: pragma solidity 0.5.12;   // (required) version pragma
L02:
L03: import "filename";        // (optional) importing other source files
L04:
L05: // (optional) smart contract definition
L06: contract UserStorage {
L07:    mapping(address => uint) userData;  // state variable
L08:
L09:    function set(uint x) public {
L10:       userData[msg.sender] = x;
L11:    }
L12:
L13:    function get() public view returns (uint) {
L14:       return userData[msg.sender];
L15:    }
L16:
L17:    function getUserData(address user) public view returns (uint) {
L18:       return userData[user];
L19:    }
L20: }
```

上記のコードは自明でなければなりません。 他のプログラミング言語に詳しい人はこのセクションで次の説明を省いて 次のセクションに進むことができます しかし、コードが何をするのか、Solidityが最初のプログラミング言語である人のために明確に理解していない人のために。 ソースコードの簡単な説明を以下に示します:

* The parties of the code starting with a double forward slash \(`//`\) are comments rusted instead; コードを注釈して説明するのに使われます  コンパイラーはコメントを無視します。
* `L01` の `プラグマ` 文は、最小コンパイラバージョンを示します。  - `import` statement in `L03` imported all global symbols from "`filename`".  `filename` は実際のファイル名でなければなりません。
* `L05` - `L20` は `UserStorage` と呼ばれるスマートコントラクトを定義します。  キーワード `contract` はコントラクト名の前にあり、コードがスマートコントラクトを表すと宣言します。  Solidity の契約はオブジェクト指向言語のクラスと似ている。  各コントラクトには、状態変数、関数修飾子、イベント、構造体型、列挙型の宣言を含めることができます。  さらに、契約は他の契約から継承することができます。  サンプルコードには、1 つのコントラクト定義が含まれていますが、1 つの Solidity ファイルには複数のコントラクト定義が含まれている場合があります。
* `L07`, `userData` はマッピング型の状態変数です。  状態変数は、コントラクトストレージに恒久的に保存されます。  state 変数 `userData` は、 `アドレス` と `uint` の値の間でマッピングを維持します。  `アドレス` 型は 20 バイトアドレス \(Klaytn は Ethereum\に似た 20 バイトアドレスを使用します)。
* `L09` は、メッセージの送信者の `ユーザーデータ` の値 `x` を保存するパブリック関数 `` を定義します。  The variable `msg.sender` is a special variable defined in Solidity that represents the address of the message \(_i.e._, current call\) sender.  キーワード `public` は、関数がコントラクトインターフェイスの一部であり、外部または内部で呼び出すことができることを意味します。
* `L13` で `` と `getUserData` を `L17` で `view`で宣言します。 つまり、関数は state 変数を変更しないと約束します。  これらの宣言には `returns (uint)`が含まれており、これは `uint` の値を返すことを意味します。

Solidity 言語の構文とセマンティクスの詳細については、 [Solidity ドキュメント](https://docs.soliditylang.org/) を参照してください。

## コンパイル、デプロイ、および実行する方法 <a id="how-to-compile-deploy-and-execute"></a>

Solidityコードをコンパイルする一つの方法は、コマンドラインコンパイラ _solc_を使用することです。 このコンパイラは、単純なバイナリやアセンブリから抽象構文ツリー \(parse tree\) まで、さまざまな出力を生成できます。 Assuming that the code above is saved in `UserStorage.sol` \(`L03` is excluded in the source file shown above\), some examples of compiling the file `UserStorage.sol` are as follows.

```bash
$ solc --bin UserStorage.sol
```

* このコマンドはコンパイル出力をバイナリ _、すなわち_、バイトコードとして出力します。

```bash
solc -o 出力 --bin -ast -asm UserStorage.sol
```

* The compiler generates a binary \(by `--bin`\), an abstract syntax tree \(by `--ast`\), and assembly code \(by `--asm`\) as separate files in the `output` directory.

```bash
solc --optimize --bin UserStorage.sol
```

* パフォーマンスを向上させるため、 `--optimize` フラグを使用して、コンパイル中にオプティマイザを有効にすることができます。

スマートコントラクトのコンパイル、デプロイ、実行のためのいくつかのリソースは以下のとおりです。

* [Solidityコマンドラインコンパイラの使用](https://docs.soliditylang.org/en/latest/using-the-compiler.html)
* [Remix を使用してコントラクトをコンパイルする](https://remix-ide.readthedocs.io/en/stable/compile.html)
* [リミックスでトランザクションを実行中](https://remix-ide.readthedocs.io/en/stable/run.html)
* [Remix Learneth チュートリアル](https://remix-ide.readthedocs.io/en/latest/remix_tutorials_learneth.html)
* [Truffleで契約をコンパイルする](https://trufflesuite.com/docs/truffle/getting-started/compiling-contracts)
* [Truffleでコントラクトを展開中](https://trufflesuite.com/docs/truffle/getting-started/running-migrations)

NOTE: This section will be updated in the future.

## スマートコントラクトのデバッグ <a id="debugging-smart-contracts"></a>

他のプログラミング言語で書かれたコードをデバッグするよりも、Solidityコードをデバッグするのが難しいのは、デバッグツールが不足しているからです。 以下に、Solidity デバッグのためのいくつかのリソースを示します。

* [Remix によるトランザクションのデバッグ](https://remix-ide.readthedocs.io/en/latest/debugger.html)
* [Remix でのトランザクションのデバッグに関するチュートリアル](https://remix-ide.readthedocs.io/en/latest/tutorial_debug.html)
* [Truffleによるコントラクトのデバッグ](https://trufflesuite.com/docs/truffle/getting-started/using-the-truffle-debugger/)

NOTE: This section will be updated in the future.

## スマートコントラクトのベストプラクティス <a id="smart-contract-best-practices"></a>

セキュリティ上の懸念とコード品質の問題をスマートコントラクトから排除するには、Solidityプログラミングのベストプラクティスを勉強し、従うことが重要です。 ここでは、Solidityのベストプラクティスの参照を示します。

* [スマートコントラクトセキュリティのベストプラクティス](https://github.com/ConsenSys/smart-contract-best-practices)

NOTE: This section will be updated in the future.

## References <a id="references"></a>

* [Solidity GitHub page](https://github.com/ethereum/solidity)
* [Solidity ドキュメント](https://solidity.readthedocs.io/en/latest/index.html)
* [Remix ドキュメント](https://remix-ide.readthedocs.io/en/latest/)
* [トリュフのドキュメント](https://trufflesuite.com/docs/truffle/)
