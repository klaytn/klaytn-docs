# はじめに <a id="getting-started"></a>

## 前提条件 <a id="prerequisites"></a>

### 依存関係 <a id="dependency"></a>

**maven**

```groovy
<dependency>
  <groupId>com.klaytn.caver</groupId>
  <artifactId>core</artifactId>
  <version>1.4.0</version>
</dependency>
```

**gradle**

```groovy
実装 'com.klaytn.caver:core:1.4.0'
```

Android 依存関係を使用したい場合は、バージョン 文字列の末尾に -android を追加してください。 \(e.g. 1.0.1-android\)

JSON-RPC リクエストとレスポンスの詳細を見たい場合は、プロジェクトに [LOGBack](https://logback.qos.ch/) の依存関係を含めてください。 以下は Gradle ビルドファイルの例です。 依存関係を Maven にも追加できます。 caver-javaは [SLF4J](http://www.slf4j.org/) ロギングファサードを使用するため、LOGBackの代わりに好みのロギングフレームワークに切り替えることができます。

```groovy
実装 "ch.qos.logback:logback-classic:1.2.3"
```

**注**: 中央リポジトリでは、RC、Android、Java のバージョンが一緒にリストされています。 ワイルドカードを使用してバージョンを取得する場合、あなたのプラットフォームに適していないバージョンを使用している可能性があります。

### インストール <a id="installation"></a>

スマートコントラクトに関連するトランザクションを生成するには、Solidityコンパイラとcaver-javaコマンドラインツールを最初にインストールする必要があります。

#### Solidity Compiler <a id="solidity-compiler"></a>

You can install the Solidity compiler locally, following the instructions as per [the project documentation](http://solidity.readthedocs.io/en/develop/installing-solidity.html). KlaytnはSolidityバージョンを0.4.24または0.5.6にインストールすることをお勧めします。 macOS ユーザーの場合は、Homebrew を使用してバージョンをインストールできます。

```text
$ brew install klaytn/klaytn/solidity@0.4.24 # version 0.4.24
$ brew install klaytn/klaytn/solidity@0.5.6 # version 0.5.6
```

#### コマンドラインツール <a id="command-line-tool"></a>

コマンドラインツールを使用すると、コマンドラインからSolidityスマートコントラクト機能ラッパーを生成できます。

**インストール \(Homebrew\)**

これをインストールするにはJava 1.8以上が必要です。

```text
$ brew tap klaytn/klaytn
$ brew install caver-java
```

インストール後は、以下のような 'caver-java' コマンドを実行できます。

```text
$ caver-Java solidity generate -b <smart-contract>.bin -a <smart-contract>.abi -o <outputPath> -p <packagePath>
```

**インストール \(Other\)**

現在、他のパッケージマネージャーはサポートしていません。 別の解決策として、以下の CLI を構築する方法を提供します。

* caver-javaをダウンロードまたはフォークします。
* Gradle を使用してコンソールモジュールの 'shadowDistZip' タスクを実行します。 その結果、console/build/distributions/console-shadow-{version}.zipが生成されます。

  ```text
  $ ./gradlew :console:shadowDistZip
  ```

* ビルド ディレクトリの zip ファイルを解凍します

  ```text
  $ unzip ./console/build/distributions/console-shadow-{version}.zip
  ```

* バイナリファイルを実行して、以下のようなコマンドラインツールを実行します。 macOS ユーザ向けのシェルスクリプトファイルと、Window ユーザ向けのバッチファイルを見つけることができます。

  ```text
  $ ./console/build/distributions/console-shadow-{version}/bin/caver-java
  ```

## アカウントの管理 <a id="managing-accounts"></a>

### アカウントの作成 <a id="creating-an-account"></a>

トランザクションに署名するには、EC \(Elliptic Curve\) キーペアまたは Klaytn キーストアファイルを使用する必要があります。

#### ECキーペアの使用 <a id="using-an-ec-key-pair"></a>

以下のような EC 鍵ペアを使用して Klaytn アカウントを作成できます。

```java
KlayCredentials資格情報 = KlayCredentials.create(Keys.createECKeyPair());
String privateKey = Numeric.toHexStringWithPrefix(credentials.getECKeyPair()); 
String address = credentials.getAddress();
```

#### キーストアファイルの使用 <a id="using-a-keystore-file"></a>

キーストアファイルを使用して新しいアカウントを作成する場合 ( [Klaytn Wallet][] で新しいキーストアファイルを作成することもできます):

```java
KlayWalletUtils.generateNewWalletFile(
        <yourPassword>,
        new File(<walletFilePath>)
);
```

以下のようなキーストアファイルを使用してアカウントを読み込むには:

```java
KlayCredentials credentials = KlayWalletUtils.loadCredentials(<password>, <walletFilePath>);
```

## トランザクションの送信 <a id="sending-a-transaction"></a>

### Baobab Faucet経由でKLAYを取得する <a id="getting-klay-via-baobab-faucet"></a>

アカウントを作成すると、Baobab Faucet経由でBaobab testnet KLAYを受け取ることができます。 [https://baobab.wallet.klaytn.foundation/](https://baobab.wallet.klaytn.foundation/) で入手できます。 受信されたtestnet KLAYは後で取引手数料として使用されます。

### Baobabに接続中 <a id="connecting-to-baobab"></a>

Baobabのネットワークには以下のように接続できます。

```java
Caver caver = Caver.build(https://your.baobab.en.url:8651);
```

### 価値転送トランザクションの送信 <a id="sending-a-value-transfer-transaction"></a>

After you get a `Caver` instance and create an account which has some KLAY, you can send 1 peb to a certain address\(`0xe97f27e9a5765ce36a7b919b1cb6004c7209217e`\) with a gas limit `BigInteger.valueOf(100_000)` like below:

`TransactionManager` が導入され、トランザクションタイプの複雑さが非表示になります。 例えば、 `FeeDelegatedValueTransferTransaction` オブジェクトは `ValueTransferTransaction` オブジェクトから変換できます。 詳細については、 [手数料委任][] を参照してください。 手数料委任に加えて、 `TransactionManager` は `GetNonceProcessor`、 `ErrorHandler`、および `TransactionReceiptProcessor` で使用できます。

```java
TransactionManager transactionManager = new TransactionManager.Builder(caver, credentials)
        .setChaindId(ChainId.BAOBAB_TESTNET).build();

ValueTransferTransaction valueTransferTransaction = ValueTransferTransaction.create(
        credentials.getAddress(),  // fromAddress
        "0xe97f27e9a5765ce36a7b919b1cb6004c7209217e",  // toAddress
        BigInteger.ONE,  // value
        BigInteger.valueOf(100_000)  // gasLimit
);

KlayRawTransaction klayRawTransaction = transactionManager.sign(valueTransferTransaction);
String transactionHash = transactionManager.send(klayRawTransaction);

TransactionReceiptProcessor transactionReceiptProcessor = new PollingTransactionReceiptProcessor(caver, 1000, 15);  // pollingSleepDuration = 1000, pollingAttempts = 15
KlayTransactionReceipt.TransactionReceipt transactionReceipt = transactionReceiptProcessor.waitForTransactionReceipt(transactionHash);
```

`ValueTransfer` クラスを使えば、より簡単にトランザクションを作成して送信できます。 これは、 `ValueTransfer` クラスが上記のプロセスを以下のように簡単にするためです。

```java
KlayTransactionReceipt.TransactionReceipt transactionReceipt
        = ValueTransfer.create(caver, credentials, ChainId.BAOBAB_TESTNET).sendFunds(
                redentials.getAddress(),  // fromAddress
                "0xe97f27e9a5765ce36a7b919b1cb6004c7209217e",  // toAddress
                BigDecimal.ONE,  // value 
                Convert.Unit.PEB,  // unit 
                BigInteger.valueOf(100_000)  // gasLimit
            ).send();
```

### 領収書の確認 <a id="checking-receipts"></a>

`sendFunds`経由でトランザクションを送信した場合、caver-javaはデフォルトでトランザクションレシートを取得しようとします。 領収書を受け取った後、コンソールに次のログを見ることができます。

```javascript
{
   "jsonrpc":"2.0",
   "id":4,
   "result":{
      "blockHash":"0x45542cc3e3bce952f368c5da9d40f972c134fed2b2b6815231b5caf33c79dacd",
      "blockNumber":"0x39a57b",
      "contractAddress":null,
      "from":"0xe97f27e9a5765ce36a7b919b1cb6004c7209217e",
      "gas":"0x186a0",
      "gasPrice":"0x5d21dba00",
      "gasUsed":"0x5208",
      "logs":[],
      "logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      "nonce":"0x114e",
      "senderTxHash":"0x3d50b9fa9fec58443f5618ed7e0f5aec5e9a6f7269d9ff606ff87156ca5b4afd",
      "signatures":[
         {
            ...
         }
      ],
      "status":"0x1",
      "to":"0xe97f27e9a5765ce36a7b919b1cb6004c7209217e",
      "transactionHash":"0x3d50b9fa9fec58443f5618ed7e0f5aec5e9a6f7269d9ff606ff87156ca5b4afd",
      "transactionIndex":"0x1",
      "type":"TxTypeValueTransfer",
      "typeInt":8,
      "value":"0x1"
   }
}
```

このレシートでは、トランザクションの実行状況を確認できます。 領収書の 'status' フィールドが "0x1" の場合、トランザクションが正常に処理されたことを意味します。 そうでない場合、トランザクションは失敗しました。 詳細なエラーメッセージは `txError` フィールドに表示されます。 詳細については、 [txError][] を参照してください。

## 他のトランザクションタイプの送信 <a id="sending-other-transaction-types"></a>

### アカウントの更新 <a id="account-update"></a>

指定されたアカウントのキーを新しい [AccountKeyPublic][] キーに更新したい場合:

```java
AccountUpdateTransaction accountUpdateTransaction = AccountUpdateTransaction.create(
        credentials.getAddress(),  // fromAddress
        AccountKeyPublic.create(
                "0xbf8154a3c1580b5478ceec0aac319055185280ce22406c6dc227f4de85316da1",  // publicKeyX
                "0x0dc8e4b9546adcc6d1f11796e43e478bd7ffbe302917667837179f4da77591d8"  // publicKeyY
        ),  // newAccountKey
        BigInteger.valueOf(100_000)  // gasLimit
);
Account.create(caver, credentials, ChainId.BAOBAB_TESTNET).sendUpdateTransaction(accountUpdateTransaction).send();
```

アカウント キーは、口座に関連付けられたキー構造を表します。 Klaytnアカウントキーの詳細と種類を取得するには、 [AccountKey][] をご覧ください。

### スマート契約 <a id="smart-contract"></a>

caver-javaはスマートコントラクトラッパーコードの自動生成をサポートしています。 ラッパーを使用すると、スマートコントラクトを簡単にデプロイして実行できます。 ラッパーコードを生成する前に、まずスマートコントラクトをコンパイルする必要があります。 注: これは、Solidity コンパイラがコンピュータにインストールされている場合にのみ機能します。 [Solidity Compiler][] を参照してください。

```text
$ solc <contract>.sol --bin -abi --optimize -o <output-dir>/
```

次に、caver-javaの [コマンドラインツール][]を使用してラッパーコードを生成します。

```text
$ caver-Java solidity generate -b <smart-contract>.bin -a <smart-contract>.abi -o <outputPath> -p <packagePath>
```

上記のコマンドは `<smartContract>`.javaを出力します。 ラッパーコードを生成したら、以下のようにスマートコントラクトをデプロイできます。

```java
<smartContract> contract = <smartContract>.deploy(
        caver, credentials, <chainId>, <gasProvider>,
        <param1>, ..., <paramN>).send();
```

スマートコントラクトがデプロイされると、以下のようなスマートコントラクトインスタンスを作成できます。

```java
<smartContract> contract = <smartContract>.load(
        <deployedContractAddress>, caver, credentials, <chainId>, <gasProvider>
);
```

スマートコントラクトで取引するには:

```java
KlayTransactionReceipt.TransactionReceipt transactionReceipt = contract.<someMethod>(
        <param1>,
        ...).send();
```

スマートコントラクトを呼び出すには:

```java
<type> result = contract.<someMethod>(<param1>, ...).send();
```

#### 例 <a id="example"></a>

このセクションでは、Baobab testnet でスマートコントラクトをデプロイして実行する方法について説明します。 この例では、スマート契約 [ERC20Mock](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/mocks/ERC20Mock.sol) を使用しています。 コントラクトのデプロイが失敗し、空のコントラクトアドレスが返されると、RuntimeExceptionがスローされます。

```java
ERC20Mock erc20Mock = ERC20Mock.deploy(
        caver, credentials, 
        ChainId.BAOBAB_TESTNET,  // chainId
        new DefaultGasProvider(),  // gasProvider
        credentials.getAddress(),  // param1(initialAccount)
        BigInteger.valueOf(100)  // param2(initialBalance)
).send();
String deployedContractAddress = erc20Mock.getContractAddress();
```

デプロイされた ERC20Mock コントラクトのインスタンスを作成するには、次のようにします。

```java
ERC20Mock erc20Mock = ERC20Mock.load(
        deployedContractAddress, 
        caver, credentials, 
        ChainId.BAOBAB_TESTNET, // chainId 
        new DefaultGasProvider() // gasProvider
);
```

指定されたアドレス \(例: `0x2c8ad0ea2e0781db8b8c9242e07de3a5beabb71a`\) にトークンを10個転送する場合は、次のコードを使用します。

```java
KlayTransactionReceipt.TransactionReceipt transactionReceipt = erc20Mock.transfer(
        "0x2c8ad0ea2e0781db8b8c9242e07de3a5beabb71a", // toAddress
        BigInteger.valueOf(10) value
).send();
```

受信者の残高をチェックするには \(例: `0x2c8ad0ea2e0781db8b8c9242e07de3a5beabb71a`\), 以下のコードを使用します:

```java
BigInteger balance = erc20Mock.balanceOf(
        "0x2c8ad0ea2e0781db8b8c9242e07de3a5beabb71a" // owner
).send();
```

### 手数料のデリゲーション <a id="fee-delegation"></a>

Klaytnは [手数料委任][] 機能を提供しており、サービスプロバイダはユーザーの代わりに手数料を支払うことができます。

#### 値の転送 <a id="value-transfer"></a>

On the client side, client who initiates the transaction will generate a fee-delegated value transfer transaction as follows: A sender creates a default `ValueTransferTransaction` object, then [`transactionManager.sign()`](https://static.javadoc.io/com.klaytn.caver/core/1.0.2/com/klaytn/caver/tx/manager/TransactionManager.html#sign-com.klaytn.caver.tx.model.TransactionTransformer-boolean-) returns a signed `FeeDelegatedValueTransferTransaction` object if the second parameter is set to `true`.

```java
TransactionManager transactionManager = new TransactionManager.Builder(caver, credentials)
        .setChaindId(ChainId.BAOBAB_TESTNET).build();  // BAOBAB_TESTNET = 1001
ValueTransferTransaction valueTransferTransaction = ValueTransferTransaction.create(
        credentials.getAddress(),  // fromAddress
        "0xe97f27e9a5765ce36a7b919b1cb6004c7209217e",  // toAddress
        BigInteger.ONE,  // value
        BigInteger.valueOf(100_000)  // gasLimit
);
String senderRawTransaction = transactionManager.sign(valueTransferTransaction, true).getValueAsString();  // isFeeDelegated : true
```

`senderRawTransaction`が生成されます。 今、送信者は代わりに手数料を支払う手数料支払者にトランザクションを配信します。 送信者と手数料支払者の間でトランザクションを転送することはKlaytnネットワーク上で行われません。 プロトコルは自分で定義する必要があります。

手数料支払者が送信者から取引を受け取った後、手数料支払者は以下のように `FeePayerManager` クラスを使用して取引を送信できます。 `FeePayerManager.executeTransaction()` は、受信したトランザクションに手数料支払者の秘密鍵で署名し、トランザクションを Klaytn ネットワークに送信します。

```java
KlayCredentials fePayer = KlayWalletUtils.loadCredentials(<password>, <walletfilePath>);
FeePayerManager feePayerManager = new FeePayerManager.Builder(caer, feePayer)
        .setChainId(ChainId.BAOBAB_TESTNET)
        .build();
feePayerManager.executeTransaction(senderRawTransaction);
```

#### スマートコントラクト実行 <a id="smart-contract-execution"></a>

手数料委任されたスマートコントラクトの実行と上記の手数料委任された値の転送の違いは、スマートコントラクトの関数を呼び出すために入力データが必要であることです。 送信者は、以下に示すように、手数料委任されたスマートコントラクト実行トランザクションを生成できます。 [`transactionManager.sign()`](https://static.javadoc.io/com.klaytn.caver/core/1.0.2/com/klaytn/caver/tx/manager/TransactionManager.html#sign-com.klaytn.caver.tx.model.TransactionTransformer-boolean-) は `TxTypeFeeDelegatedSmartContractExecution` オブジェクトを 2 番目のパラメータに `true` を渡した場合に返すことに注意してください。 以下の例では、 `Smart Contract` で説明されている [ERC20Mock](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/mocks/ERC20Mock.sol) コントラクトの [transfer][] メソッドを呼び出します。

```java
String recipient = "0x34f773c84fcf4a0a9e2ef07c4615601d60c3442f";
BigInteger transferValue = BigInteger.valueOf(20);
Function function = new Function(
        ERC20Mock.FUNC_TRANSFER,  // FUNC_TRANSFER = "transfer"
        Arrays.asList(new Address(recipient), new Uint256(transferValue)),  // inputParameters
        Collections.emptyList()  // outputParameters
);
String data = FunctionEncoder.encode(function);

TransactionManager transactionManager = new TransactionManager.Builder(caver, credentials)
        .setChaindId(ChainId.BAOBAB_TESTNET).build();  // BAOBAB_TESTNET = 1001
SmartContractExecutionTransaction smartContractExecution = 
        SmartContractExecutionTransaction.create(
                credentials.getAddress(),  // fromAddress
                erc20Mock.getContractAddress(),  // contractAddress
                BigInteger.ZERO,  // value
                Numeric.hexStringToByteArray(data),  // data
                BigInteger.valueOf(100_000)  // gasLimit
        );
String senderRawTransaction = transactionManager.sign(smartContractExecution, true).getValueAsString();
```

After you get `senderRawTransaction`, the rest of the process using `FeePayerManager` is the same way as you saw in [fee-delegated value transfer][] above:

```java
KlayCredentials fePayer = KlayWalletUtils.loadCredentials(<password>, <walletfilePath>);
FeePayerManager feePayerManager = new FeePayerManager.Builder(caver, feePayer).build();
feePayerManager.executeTransaction(senderRawTransaction);
```
## さまざまなAccountKey 型の使用 <a id="using-various-account-key-type"></a>

caver-javaは、プラットフォームでサポートされているさまざまなタイプの [AccountKey][] をサポートする新しいクラスを導入しています。 この機能は、バージョン 1.2.0 以降でサポートされています。

### AccountKey  <a id="account-key"></a>

Klaytnプラットフォームのアカウントキーを更新するには、caver-javaは `AccountKey` インターフェイスを提供します。 以下では、 `AccountKey` の実装、 `AccountKeyPublic`、 `AccountKeyWeightedMultiSig`、および `AccountKeyRoleBased` について説明します。 アカウントを更新する方法については、 [アカウント更新](#account-update) を参照してください。

### AccountKeyPublic <a id="account-key-public"></a>

`AccountKeyPublic` は 1 つの公開鍵を持つ `AccountKey` の実装です。 次のように作成できます。

```java
ECKeyPair newKeyPair = Keys.createEcKeyPair();
AccountKeyPublic newAccountKey = AccountKeyPublic.create(newKeyPair.getPublicKey());
```

`AccountKeyPublic`で更新されたアカウントを使用するには、 `KlayCredentials` を次のように作成する必要があります。

```java
KlayCredentials validCredentails = KlayCredentials.create(newKeyPair, oldCredentials. etAddress());

// Because the account address is decoupled from the AccountKeyPublic (public key), 以下のアドレスがない場合はアカウントを使用できません。
KlayCredentials invalidCredentils = KlayCredentials.create(newKeyPair);
```

### AccountKeyWeightedMultiSig <a id="account-key-weighted-multi-sig"></a>

`AccountKeyWeightedMultiSig` は、さまざまな重みを持つ複数の公開鍵を含むアカウント鍵です。 `AccountKeyWeightedMultiSig` は、アカウントを使用するために署名する必要がある鍵の重みの閾値を定義します。 サポートされているキーの最大数は 10 です。 `AccountKeyWeightedMultiSig` を以下のように作成できます:

```java
List<AccountKeyWeightedMultiSig.WeightedPublicKey> weightedTransactionPublicKeys = new ArrayList<>();

int weight1 = 10;
int weight2 = 30;

ECKeyPair ecKeyPair1 = Keys.createEcKeyPair();
ECKeyPair ecKeyPair2 = Keys.createEcKeyPair();

AccountKeyWeightedMultiSig.WeightedPublicKey weightedPublicKey1 = AccountKeyWeightedMultiSig.WeightedPublicKey.create(
                BigInteger.valueOf(weight1),
                AccountKeyPublic.create(ecKeyPair1.getPublicKey())
);

AccountKeyWeightedMultiSig.WeightedPublicKey weightedPublicKey2 = AccountKeyWeightedMultiSig.WeightedPublicKey.create(
                BigInteger.valueOf(weight2),
                AccountKeyPublic.create(ecKeyPair2.getPublicKey())
);

weightedTransactionPublicKeys.add(weightedPublicKey1);
weightedTransactionPublicKeys.add(weightedPublicKey2);

AccountKeyWeightedMultiSig newAccountKey = AccountKeyWeightedMultiSig.create(
                BigInteger.valueOf(weight1 + weight2),
                weightedTransactionPublicKeys
);
```

`AccountKeyWeightedMultiSig`で更新されたアカウントを使用するには、 `KlayCredentials` を次のように作成できます。

```java
List<ECKeyPair> transactionECKeyPairList = new ArrayList<>();

transactionECKeyPairList.add(ecKeyPair1);
transactionECKeyPairList.add(ecKeyPair2);

KlayCredentials newCredentials = KlayCredentials.create(transactionECKeyPairList, address);
```

### AccountKeyRoleベース <a id="account-key-role-based"></a>

`AccountKeyRoleBased` は `AccountKey` のリストです。 各 `AccountKey` は、その位置に応じて特定の役割に割り当てられます。 AccountKey は `AccountKeyPublic`、`AccountKeyWeightedMultiSig`、または `AccountKeyFail` にすることができます。 `AccountKeyNil` が特定の役割に使用される場合。 その役割に対してキーは更新されず、既存の AccountKey が使用されます。 `AccountKeyFail` が使用されている場合、ロールの署名は常に失敗しますので、AccountKeyFailを使用するように注意してください。

```java
List<AccountKey> roleBasedAccountKeyList = new ArrayList<>();

ECKeyPair newKeyPair1 = Keys.createEcKeyPair(); // for RoleTransaction
roleBasedAccountKeyList.add(AccountKeyPublic.create(newKeyPair1.getPublicKey()));

ECKeyPair newKeyPair2 = Keys.createEcKeyPair(); // for RoleAccountUpdate
roleBasedAccountKeyList.add(AccountKeyPublic.create(newKeyPair2.getPublicKey()));

ECKeyPair newKeyPair3 = Keys.createEcKeyPair(); // for RoleFeePayer
roleBasedAccountKeyList.add(AccountKeyPublic.create(newKeyPair3.getPublicKey()));

newAccountKey = AccountKeyRoleBased.create(roleBasedAccountKeyList);
```

`AccountKeyRoleBased`で更新されたアカウントを使用するには、 `KlayCredentials` を次のように作成できます。

```java
List<ECKeyPair> transactionECKeyPairList = Array.asList(newKeyPair1);
List<ECKeyPair> updateECKeyPairList = Arrays.asList(newKeyPair2);
List<ECKeyPair> feePayerECKeyPairList = Array.asList(newKeyPair3);

KlayCredentials Credentials newKeyCredentials = KlayCredentials.create(transactionECKeyPairList, updateECKeyPairList, feePayerECKeyPairList, address);
```

アカウントに特定のロールのキーがない場合は、空のリストを引数として渡します。

```java
List<ECKeyPair> transactionECKeyPairList = Collections.emptyList();
List<ECKeyPair> updateECKeyPairList = Array.asList(newKeyPair2);
List<ECKeyPair> feePayerECKeyPairList = Collections.emptyList();

KlayCredentials newCredentials newCredentials = KlayCredentials.create(transactionECKeyPairList, updateECKeyPairList, feePayerECKeyPairList, address);
```

特定のロールに複数のキーを持つアカウントは、以下のように複数のキーを渡すことができます。

```java
List<ECKeyPair> transactionECKeyPairList = Collections.emptyList();
List<ECKeyPair> updateECKeyPairList = Arrays.asList(newKeyPair2-1, newKeyPair2-2, newKeyPair2-3);
List<ECKeyPair> feePayerECKeyPairList = Collections.emptyList();

KlayCredentials newCredentails = KlayCredentials.create(transactionECKeyPairList, updateECKeyPairList, feePayerECKeyPairList, address);
```

## 複数の署名者と取引を送信する <a id="sending-a-transaction-with-multiple-signers"></a>

アカウントにAccountKeyMultiSigまたはAccountKeyRoleBasedがある場合は、各キーを異なる人によって管理できます。

このセクションでは、複数の署名者がいる場合に署名を収集し、トランザクションを送信する方法について説明します。

### 連続送信者署名 <a id="sequential-sender-signing"></a>

`rawTransaction` は `txSignatures` と `feePayerSignatures` の両方を含むRLPエンコードトランザクションを持っています。 `feePayerSignature` は、取引が手数料委任トランザクションである場合にのみ含まれる。

手数料支払者が存在しない場合、トランザクションの署名と実行を繰り返し行うプロセスは、3つの部分に分けることができます。 1. RLPはトランザクションを符号化し、rawTransactionの形で署名者に送信します。 2. 受信した rawTransaction に対して、独自の鍵を持つ署名者の署名。 3. 署名されたrawTransaction を EN に送信します。 ステップ2は、複数の署名者がいる場合に繰り返すことができます。

```java
//// 1. アリスは取引を作成し、それに署名し、ボブにそれを送ります。
//// Alice Side
ValueTransferTransaction transactionTransformer = ValueTransferTransaction.create(from, to, BigInteger.ONE, GAS_LIMIT);

TransactionManager transactionManager_alice = new TransactionManager.Builder(caver, senderCredential_alice)
                    .setTransactionReceiptProcessor(new PollingTransactionReceiptProcessor(caver, 1000, 10))
                    .setChaindId(LOCAL_CHAIN_ID)
                    .build();

String rawTransaction_signed_alice = transactionManager_alice.sign(transactionTransformer).getValueAsString();

//// 2. ボブは受け取った取引に署名し、それをチャーリーに送ります。
//// Bob Side
            TransactionManager transactionManager_bob = new TransactionManager.Builder(caver, senderCredential_bob)
                    .setTransactionReceiptProcessor(new PollingTransactionReceiptProcessor(caver, 1000, 10))
                    .setChaindId(LOCAL_CHAIN_ID)
                    .build();

String rawTransaction_signed_alice_and_bob = transactionManager_bob.sign(rawTransaction_signed_alice).getValueAsString();

//// 3. Charlieは受け取った取引に署名し、それをKlaytn ENに送信します。
//// チャーリーサイド
TransactionManager transactionManager_charlie = new TransactionManager.Builder(caver, senderCredential_charlie)
                    .setTransactionReceipProcessor(new PollingTransactionReceiptProcessor(caver, 1000, 10))
                    .setChaindId(LOCAL_CHAIN_ID)
                    .build();

KlayTransactionReceipt.TransactionReceipt actionReceipt = transactionManager_charlie.executeTransaction(rawTransaction_signed_alice_and_bob);
```

### 連続課金者署名 <a id="sequential-fee-payer-signing"></a>

手数料支払者の署名は、連続的に追加することもできます。 `FeePayerManager` で署名 `feePayerSignatures` をトランザクションに蓄積します。 署名命令は重要ではありません。 `TransactionManager`で署名すると、 `txSignature` が追加されます。 `FeePayerManger`で署名すると、 `feePayerSignatures` が生のトランザクションに追加されます。

```java
//// 1. Bob は Alice から取引を受け取り、手数料支払い者として取引に署名します。
//// Bob Side
FeePayerManager feePayerManager_bob = new FeePayerManager.Builder(caver, feePayerCredentials_bob)
                    .setTransactionReceiptProcessor(new PollingTransactionReceiptProcessor(caver, 1000, 10))
                    .setChainId(LOCAL_CHAIN_ID)
                    .build();

String rawTransaction_signed_alice_and_bob = feePayerManager_bob.sign(rawTransaction_signed_alice).getValueAsString();

//// 2. Charlieは受け取った取引に署名し、それをKlaytn ENに送信します。
//// チャーリーサイド
FeePayerManager_charlie = new FeePayerManager.Builder(caer, feePayerCredentials_charlie)
                    .setTransactionReceiptProcessor(new PollingTransactionReceiptProcessor(caver, 1000, 10))
                    .setChainId(LOCAL_CHAIN_ID)
                    .build();

KlayTransactionReceipt.TransactionReceipt transactionReceipt = feePayerManager_charlie.executeTransaction(Transaction(rawTransaction_signed_alice_and_bob);
```

## Thanks to <a id="thanks-to"></a>

インスピレーションのための [web3j](https://github.com/web3j/web3j) プロジェクト。 🙂


[Klaytn Wallet]: ../../../../toolkit/klaytn-wallet.md
[txError]: ../../../json-rpc/transaction-error-codes.md
[AccountKeyPublic]: ../../../../klaytn/design/accounts.md#accountkeypublic
[AccountKey]: ../../../../klaytn/design/accounts.md#account-key
[Solidity Compiler]: #solidity-compiler
[コマンドラインツール]: #command-line-tool
[手数料委任]: ../../../../klaytn/design/transactions/README.md#fee-delegation
[transfer]: #smart-contract
[fee-delegated value transfer]: #value-transfer

