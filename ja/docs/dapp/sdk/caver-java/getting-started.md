# はじめに <a id="getting-started"></a>

## 新着情報

caver-java1.5.0では、Common Architectureを採用しています。 Common Architecture は、Klaytn 開発環境向けの新しいソフトウェアアーキテクチャで、すべての Klaytn SDK (caver-js/caver-java) で共有されます。 開発経験を合理化し、他のプログラミング言語への拡張性を容易にするために設計されています。

caver-javaが1.5.0に更新されると、1.4.0で使用されているAPIは一部のAPIを除いて非推奨となります。

caver-java 1.5.0で新たに提供されたAPIは以下の通りです。

### caver.account

カーバー ccount は AccountKey を更新するために使用されるパッケージで、1 つ以上の公開鍵である可能性があります (AccountKeyPublic 、AccountKeyWeightedMultiSig)。 Klaytnアカウントでは、AccountKeyRoleBased)または特別な種類のキー (AccountKeyLegacyとAccountKeyFaily) を使用できます。


- `caver.account` が caver-java 1.4.0 の `caver.tx.account` を置き換えます

### caver.wallet

caver.walletは、メモリ内ウォレットのKeyringインスタンスを管理するパッケージです。 キーリングとは、Klaytnアカウントとその秘密鍵のアドレスを保存するインスタンスのことです。 この口座のアドレスが取引に署名するときに使用されます。 caver.walletはすべてのタイプのキーリング(SingleKeyring、MultipleKeyring、RoleBasedKeyring)を受け入れ、Klaytnアカウントアドレスでそれらを管理します。

- `caver.wallet` は caver-java 1.4.0 の `caver.crypto` を置き換えます
- `caver.wallet.KeyStore` は caver-Java 1.4.0 の `caver.wallet.WalletFile` を置き換えます

### caver.transaction

caver.transactionは [Transaction](https://docs.klaytn.foundation/klaytn/design/transactions#transactions-overview) に関連する機能を提供するパッケージです。

- `caver.transaction` は caver-java 1.4.0 の `caver.tx` を置き換えます

### caver.rpc

caver.rpc は、Klaytn Node の rpc 呼び出しに関連する機能を提供するパッケージです。

- `caver.rpc.klay` と `caver.rpc.net` は `Klay`に置き換えられます。 `caver-Java 1.4.0 の Net` インターフェイス

### caver.util

caver.utils はユーティリティ関数を提供します。

### caver.contract

`caver.contract` は、Klaytnのスマートコントラクトを簡単に処理できるパッケージです。 caver.contract を使用すると、スマートコントラクトを展開し、それらの機能を呼び出すことで実行できます。 `caver.contract` はまず、スマートコントラクト関数とイベントをABI\(Application Binary Interface\)から変換し、これらの関数を呼び出し、イベント情報を取得します。

## 前提条件 <a id="prerequisites"></a>

### リポジトリの追加<a id="adding-a-repository"></a>
IPFSを使用する前に、ライブラリリポジトリを追加する必要があります。 まず、次のリポジトリを追加してください。

**maven**

```groovy
<repositories>
    <repository>
        <id>jitpack.io</id>
        <url>https://jitpack.io</url>
    </repository>
</repositories>
```

**gradle**

```groovy
allproject {
    repositories {
...
        maven { url 'https://jitpack.io' }
    }
}
```

### 依存関係の追加 <a id="adding-a-dependency"></a>

**maven**

```groovy
<dependency>
  <groupId>com.klaytn.caver</groupId>
  <artifactId>core</artifactId>
  <version>1.5.0</version>
</dependency>
```

**gradle**

```groovy
実装 'com.klaytn.caver:core:1.5.0'
```

Android 依存関係を使用したい場合は、バージョン 文字列の末尾に -android を追加してください。 \(e.g. 1.0.1-android\)

JSON-RPC リクエストとレスポンスの詳細を見たい場合は、プロジェクトに [LOGBack](https://logback.qos.ch/) の依存関係を含めてください。 以下は Gradle ビルドファイルの例です。 依存関係を Maven にも追加できます。 caver-javaは [SLF4J](http://www.slf4j.org/) ロギングファサードを使用するため、LOGBackの代わりに好みのロギングフレームワークに切り替えることができます。

```groovy
実装 "ch.qos.logback:logback-classic:1.2.3"
```

**注**: 中央リポジトリでは、RC、Android、Java のバージョンが一緒にリストされています。 ワイルドカードを使用してバージョンを取得する場合、あなたのプラットフォームに適していないバージョンを使用している可能性があります。

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


## KLAYを一目で送信する

このセクションでは、KLAYを値転送トランザクションで送信するための `キーストアファイル` を使用する簡単な例を説明します。 キーストアファイルは [Klaytn Wallet](../../../toolkit/klaytn-wallet.md#how-to-receive-baobab-testnet-klay) で作成できます。 テストに KLAYが必要な場合は、 [Klaytn Wallet](../../../toolkit/klaytn-wallet.md#how-to-receive-baobab-testnet-klay) から Baobab testnet KLAYを入手できます。

```java
public void sendingKLAY() throws IOException, CipherException, TransactionException {
        Caver caver = new Caver(Caver.BAOBAB_URL);

        //Read keystore json file.
        File file = new File("./keystore.json");

        //Decrypt keystore
        ObjectMapper objectMapper = ObjectMapperFactory.getObjectMapper();
        KeyStore キーストア = objectMapper.readValue(file, KeyStore.class);
        AbstractKeyring keyring = caver.wallet.keyring.decrypt(keyStore, "password");

        //Add to caver wallet.
        caver.wallet.add(keyring);

        BigInteger value = new BigInteger(caver.utils.convertToPeb(BigDecimal.ONE, "KLAY"));

        //Create a value transfer transaction
        ValueTransfer valueTransfer = caver.transaction.valueTransfer.create(
                TxPropertyBuilder.valueTransfer()
                        .setFrom(keyring.getAddress())
                        .setTo("0x8084fed6b1847448c24692470fc3b2ed87f9eb47")
                        .setValue(value)
                        .setGas(BigInteger.valueOf(25000))
        );

        //Sign to the transaction
        valueTransfer.sign(keyring);

        //Send a transaction to the klaytn blockchain platform (Klaytn)
        Bytes32 result = caver.rpc.klay.sendRawTransaction(valueTransfer.getRawTransaction()).send();
        if(result.hasError()) {
            throw new RuntimeException(result.getError().getMessage());
        }

        //Check transaction receipt.
        TransactionReceiptProcessor transactionReceiptProcessor = new PollingTransactionReceiptProcessor(caver, 1000, 15);
        TransactionReceipt.TransactionReceiptData transactionReceipt = transactionReceiptProcessor.waitForTransactionReceipt(result.getResult());
}
```


## caver-javaから始まります <a id="starting-with-caver-java"></a>

### Klaytn ノードへの接続 <a id="connecting-to-a-klaytn-node"></a>

ENを実行している場合は、以下のようにホストとポートを変更することで、独自のノードに接続できます。

```java
Caver caver = new Caver("http://your.en.url:8551/");
```


## キーリングの管理 <a id="managing-keyrings"></a>

`キーリング` は、Klaytn アカウントのアドレスと秘密鍵を含む構造体です。

`Keyring` can be classified into three types depending on the type of key being stored: `SingleKeyring` to store one address and one private key, `MultipleKeyring` to store one address and multiple private keys, and `RoleBasedKeyring` to store one address and one or more private keys for each role.

`SingleKeyring` は `キー` プロパティを定義し、この `キー` は 1 つの秘密鍵を格納します。

`MultipleKeyring` は `keys` プロパティを定義し、この `keys` は複数の秘密鍵を格納する配列として実装されています。

The `keys` property defined in `RoleBasedKeyring` is implemented as a List object having 3 arrays of private key(s) as its elements (empty `keys` will look like `[ [], [], [] ]`) and so that it can include multiple keys for each `role`. The first element of the array is filled with the private key(s) to be used for `roleTransactionKey`, the second element the private key(s) to be used for `roleAccountUpdateKey`, and the third element the private key(s) to be used for `roleFeePayerKey`.

### キーリングの作成 <a id="creating-a-keyring"></a>

#### シングルキーリングの生成 <a id="generating-a-singlekeyring"></a>

以下のように、ランダムに 1 つのキーリングを生成できます。

```java
SingleKeyring keyring = caver.wallet.keyring.generate();
```

#### 秘密鍵からシングルキーを作成する <a id="creating-a-singlekeyring-from-private-key"></a>

また、特定の秘密鍵を所有している場合は、以下のようにキーリングを作成することができます。

```java
String privateKey = "0x{private key in hex}";
SingleKeyring keyring = caver.wallet.keyring.createFromPrivateKey(privateKey);
```

#### 秘密鍵とアドレスでシングルキーを作成する <a id="creating-a-singlekeyring-with-a-private-key-and-an-address"></a>

Klaytnアカウントの秘密鍵がアドレスから分離されている場合 指定されたアドレスと指定された秘密鍵を使用してキーリングを作成できます。

```java
String address = "0x{address in hex}";
String privateKey = "0x{private key in hex}";
SingleKeyring keyring = caver.wallet.keyring.createWithSingleKey(address, privateKey);
```

また、SlaytnウォレットキーからSingleKeyringインスタンスを取得することもできます。

```java
String klaytnWalletKey = "0x{private key}0x{type}0x{address in hex}";
SingleKeyring keyring = caver.wallet.keyring.createFromKlaytnWalletKey(klaytnWalletKey);
```

#### 複数の秘密鍵を使ったマルチプレキーの作成 <a id="creating-a-multiplekeyring-with-multiple-private-keys"></a>

複数の秘密鍵を使用する場合は、アドレスと複数の秘密鍵を使用して `MultipleKeyring` を作成できます。 以下の例では、複数の秘密鍵を持つ `MultipleKeyring` を作成する方法を示します。

```java
String address = "0x{address in hex}";
String[] privateKeyArray = new String[] {"0x{private key#1}", "0x{private key#2}", "0x{private key#3}"};
MultipleKeyring multipleKeyring = caver.wallet.keyring.createWithMultipleKey(address, privateKeyArray);
```

#### 秘密鍵でRoleBasedKeyringを作成する <a id="creating-a-rolebasedkeyring-with-role-based-private-keys"></a>

`ロール`ごとに異なる秘密鍵を使用するには、 `caver.wallet.keyring.createWithRoleBasedKey` が使用されます。 各配列要素は、 `RoleBasedKeyring` で説明されている役割を表します。 以下の例は、ロールごとに異なるキーから `RoleBasedKeyring` インスタンスを作成する方法を示しています。


```java
String address = "0x{address in hex}";
String[][] privateKeyArr = new String[][] {
        //roleTransactionKey
        {
                "0x{privateKey in hex}",
                "0x{privateKey in hex}",
                "0x{privateKey in hex}",
        },
        //roleAccountUpdateKey
        {
                "0x{privateKey in hex}",
                "0x{privateKey in hex}",
                "0x{privateKey in hex}",
        },
        //roleFeePayerKey
        {
                "0x{privateKey in hex}",
                "0x{privateKey in hex}",
                "0x{privateKey in hex}",
        },
};

RoleBasedKeyring keyring = caver.wallet.keyring.createWithRoleBasedKey(address, Arrays.asList(privateKeyArr));
```

### キーストアの json 文字列から caver-Java にキーリングを追加します。<a id="adding-keyrings-to-caver-java"></a>

caver-javaが提供するインメモリウォレットにキーリングを追加することで、より簡単にキーリングを使用できます。 The following examples illustrate how to add a keyring to `caver.wallet` using a keystore JSON file string generated by [Klaytn Wallet](https://wallet.klaytn.com/).

```java
Caver caver = new Caver(Caver.MAINNET_URL);

String password = "password";
String keyStoreJsonString = "{\n" +
        "  \"version\": 4,\n" +
        "  \"id\": \"9c12de05-0153-41c7-a8b7-849472eb5de7\",\n" +
        "  \"address\": \"0xc02cec4d0346bf4124deeb55c5216a4138a40a8c\",\n" +
        "  \"keyring\": [\n" +
        "    {\n" +
        "      \"ciphertext\": \"eacf496cea5e80eca291251b3743bf93cdbcf7072efc3a74efeaf518e2796b15\",\n" +
        "      \"cipherparams\": {\n" +
        "        \"iv\": \"d688a4319342e872cefcf51aef3ec2da\"\n" +
        "      },\n" +
        "      \"cipher\": \"aes-128-ctr\",\n" +
        "      \"kdf\": \"scrypt\",\n" +
        "      \"kdfparams\": {\n" +
        "        \"dklen\": 32,\n" +
        "        \"salt\": \"c3cee502c7157e0faa42386c6d666116ffcdf093c345166c502e23bc34e6ba40\",\n" +
        "        \"n\": 4096,\n" +
        "        \"r\": 8,\n" +
        "        \"p\": 1\n" +
        "      },\n" +
        "      \"mac\": \"4b49574f3d3356fa0d04f73e07d5a2a6bbfdd185bedfa31f37f347bc98f2ef26\"\n" +
        "    }\n" +
        "  ]\n" +
        "}";

SingleKeyring decrypt = (SingleKeyring)caver.wallet.keyring.decrypt(keyStoreJsonString, password);
System.out.println("Decrypted address : " + decrypt.getAddress());
System.out.println("Decrypted key : " + decrypt.getKey().getPrivateKey());

SingleKeyring addedKeyring = (SingleKeyring)caver.wallet.add(decrypt);
System.out.println("address : " + addedKeyring.getAddress());
System.out.println("key : " + addedKeyring.getKey().getPrivateKey());
```

```bash
Decrypted address : 0xc02cec4d0346bf4124deeb55c5216a4138a40a8c
Decrypted key : 0x93c90135ae69669e416ba5997d9274f8c8bd60748761fc421e415602d68a13a5

address : 0xc02cec4d0346bf4124deeb55c5216a4138a40a8c
key : 0x93c90135ae696696699e416ba416ba5997d9274f8c8bd607481fc421e415602d68a13a5 

 address
```

上記の出力を見ると、 `caver.wallet` に `caver.wallet` に追加した後、キーリングをクエリすることができます。

使用するアドレスと秘密鍵を持っている場合は、キーリングを簡単に作成し、caver.wallet.newKeyringを介してcaver.walletに直接追加できます。

```java
Caver caver = new Caver(Caver.MAINNET_URL);

// Add to wallet with an address and a private key
AbstractKeyring addedSingleKeyring = caver.wallet.newKeyring("0x{address in hex}", "0x{private key1}");


// Add to wallet with an address and private keys
String[] privateKeyArr = new String[] {
                "0x{privateKey in hex}",
                "0x{privateKey in hex}",
                "0x{privateKey in hex}",
};

AbstractKeyring addedMultipleKeyring = caver.wallet.newKeyring('0x{address in hex}', privateKeyArr);


// Add to wallet with an address and private keys defined by each roles
String[][] privateKeyArr = new String[][] {
                //roleTransactionKey
                {
                        "0x{privateKey in hex}",
                        "0x{privateKey in hex}",
                        "0x{privateKey in hex}",
                },
                //roleAccountUpdateKey
                {
                        "0x{privateKey in hex}",
                        "0x{privateKey in hex}",
                        "0x{privateKey in hex}",
                },
                //roleFeePayerKey
                {
                        "0x{privateKey in hex}",
                        "0x{privateKey in hex}",
                        "0x{privateKey in hex}",
                },
};

AbstractKeyring addedRoleBased = caver.wallet.newKeyring('0x{address in hex}', Arrays.asList(privateKeyArr))
```

When `caver.wallet.newKeyring` is executed with a private key, a Keyring instance with one private key is created and added to `caver.wallet`. 複数の秘密鍵については、複数の秘密鍵を持つKeyringインスタンスが作成され、 `caver.wallet`に追加されます。 When passing a 2D string array including one or more private keys for each role as an element, a Keyring instance that contains the different private key(s) for each role is created and also added to the `caver.wallet`.


`caver.wallet.add` または `caver.wallet.newKeyring` は、 `caver.wallet` に追加した後にキーリングインスタンスを返します。

## トランザクションの送信 <a id="sending-a-transaction"></a>

このセクションでは、Baobabネットワーク上でcaver-javaを使用してKLAYを送信する方法を説明します。

### Baobab Faucet経由でKLAYを取得する <a id="getting-klay-via-baobab-faucet"></a>

If you need KLAY for testing, you can get Baobab testnet KLAY from the [Klaytn Wallet](../../../toolkit/klaytn-wallet.md#how-to-receive-baobab-testnet-klay). 秘密鍵またはキーストアファイルを使用してKlaytn Walletにログインし、テスト用の蛇口からテストネットKLAYを受け取ります。

### 価値転送トランザクションの送信 <a id="sending-a-value-transfer-transaction"></a>

caver-javaウォレットを使用してトランザクションの署名を生成することができます。 トランザクションをネットワークに送信するには、以下の2つのステップを実行する必要があります。

1. 取引に署名する
    - 使用したいキーリングが `caver.wallet`に追加されている場合は、 `caver.wallet.sign` 関数で署名できます。
    - `caver.wallet`に追加せずにキーリングを個別に管理する場合は、 `transaction.sign` 関数を通じてトランザクションに署名できます。
2. `caver.rpc.klay.sendRawTransaction` を経由して、署名されたトランザクションの RLP エンコードされた文字列を Klaytn に送信します。

**注意:** 送信者は、転送するのに十分な数のKLAYを有し、取引手数料を支払う必要があります。

#### Sign a transaction

Klaytnにトランザクションを送信する前に、まずトランザクションに署名する必要があります。

以下は、キーリングが `caver.wallet` に追加された場合のトランザクションへの署名方法の例です。

```java
Caver caver = new Caver(Caver.MAINNET_URL);

// Add a keyring to caver.wallet
SingleKeyring keyring = caver.wallet.keyring.createFromPrivateKey("privateKey");
caver.wallet.add(keyring);

// Create a value transfer transaction
ValueTransfer valueTransfer = caver.transaction.valueTransfer.create(
        TxPropertyBuilder.valueTransfer()
                .setFrom(keyring.getAddress())
                .setTo("0x176ff0344de49c04be577a3512b6991507647f72")
                .setValue(BigInteger.valueOf(1))
                .setGas(BigInteger.valueOf(30000))
);

// Sign the transaction via caver.wallet.sign
caver.wallet.sign(keyring.getAddress(), valueTransfer);
String rlpEncoded = valueTransfer.getRLPEncoding();
System.out.println("RLP-encoded string: " + rlpEncoded)
```

上記のコードは `caver.wallet`にキーリングを追加し、トランザクションを作成し、 `caver.wallet.sign` を通じてトランザクションに署名します。

上記のコードを実行すると、次の結果が得られます。 上記のコードが実行されると、トランザクションの RLP エンコードされた文字列が以下に示されます。 (以下に示す文字列出力とは異なる場合があります。

```bash
RLP-encoded string: 0x08f87e808505d21dba0082753094176ff0344de49c04be577a3512b6991507647f720194ade4883d092e2a972d70637ca7de9ab5166894a2f847f845824e44a0e1ec99789157e5cb6bc691935c204a23aaa3dc049efafca106992a5d5db2d179a0511c421d5e508fdb335b6048ca7aa84560a53a5881d531644ff178b6aa4c0a41
```

#### 署名されたトランザクションの RLP エンコードされた文字列を Klaytn に送る

以下のように、署名済みのトランザクションをネットワークに送信できます。 以下の例を実行したい場合は、"rlpEncoding" を `rlpEncoded` の値に置き換えます。

```java
public String sendRawTransaction() {
  Caver caver = new Caver(Caver.BAOBAB_URL);

  String rlpEncoding = "rlpEncoding";
  String txHash = null;

  try {
      // Send the transaction using `caver.rpc.klay.sendRawTransaction`.
      Bytes32 sendResult = caver.rpc.klay.sendRawTransaction(rlpEncoding).send();
      if(sendResult.hasError()) {
          //do something to handle error
      }

      txHash = sendResult.getResult();
  } catch (IOException e) {
      // do something to handle exception
  }
  return txHash;

}
```

`caver.wallet`を使わずにトランザクションに署名してネットワークに送信したい場合は、以下の例を参照してください。

```java
Caver caver = new Caver(Caver.MAINNET_URL);

// Add a keyring to caver.wallet
SingleKeyring keyring = caver.wallet.keyring.createFromPrivateKey("privateKey");
caver.wallet.add(keyring);

// Create a value transfer transaction
ValueTransfer valueTransfer = caver.transaction.valueTransfer.create(
        TxPropertyBuilder.valueTransfer()
                .setFrom(keyring.getAddress())
                .setTo("0x176ff0344de49c04be577a3512b6991507647f72")
                .setValue(BigInteger.valueOf(1))
                .setGas(BigInteger.valueOf(30000))
);

// Sign the transaction via transaction.sign
valueTransfer.sign(keyring);
String rlpEncoded = valueTransfer.getRLPEncoding();

try {
    // Send the transaction using `caver.rpc.klay.sendRawTransaction`.
    Bytes32 sendResult = caver.rpc.klay.sendRawTransaction(rlpEncoded).send();
    if(sendResult.hasError()) {
        //do something to handle error
    }

    String txHash = sendResult.getResult();
    System.out.println("Transaction Hash : " + txHash);
} catch (IOException e) {
    // do something to handle exception
}
```

上記のコードが実行されると、トランザクションハッシュ(txHash)が以下の例のように表示されます。

```bash
トランザクションハッシュ : 0x43e8ab1a2365ad598448b4402c1cfce6a71b3a103fce3a69905613e50b978113
```

### 領収書の確認 <a id="checking-receipts"></a>

You can use the `TransactionReceiptProcessor` to get the receipt of the transaction when you transfer the transaction to the Klaytn by `caver.rpc.klay.sendRawTransaction`.

次の例は、PollingTransactionReceiptProcessorを使用してレシートを取得する方法を示しています。

```java
Caver caver = new Caver(Caver.BAOBAB_URL);
String txHash = "0x40552efbba23347d36f6f5aaba6b9aeb6602e004df62c1988d9b7b1f036e676a";

//Sleep duration - 1000ms
//Attempts count - 15
TransactionReceiptProcessor receiptProcessor = new PollingTransactionReceiptProcessor(caver, 1000, 15);

try {
  TransactionReceipt.TransactionReceiptData receiptData = receiptProcessor.waitForTransactionReceipt(txHash);
} catch (IOException | TransactionException e) {
  // do something to handle error.

}
```

上記の例で説明したように、TransactionReceiptProcessorを通じてトランザクションを送信した結果を得ることができます。 `transactionHash` フィールドは受領オブジェクト内で定義されます。

`caver.rpc.kray を使用できます。 etTransactionReceipt <code>` `txHash` 文字列を使用して、トランザクションがブロックに含まれた後、ネットワークからいつでもトランザクションの受信をクエリします。 以下の例は、 `caver.rpc.klay.getTransactionReceipt` RPCコールを使用してレシートを取得する方法を示しています。

```java
Caver caver = new Caver(Caver.BAOBAB_URL);
String txHash = "0x40552efbba23347d36f6f5aaba6b9aeb6602e004df62c1988d9b7b1f036e676a";

try {
  TransactionReceipt receipt = caver.rpc.klay.getTransactionReceipt(txHash).send();
  if(receipt.hasError()) {
    // do something to handle error

  }

  TransactionReceipt.TransactionReceiptData receiptData = receipt.getResult();
} catch (IOException e) {
    // do something to handle exception.

}
```

トランザクションの結果は、領収書の `ステータス` から確認できます。 戻り値の詳細については、 `caver.rpc.klay.getTransactionReceipt` を参照してください。 トランザクションが失敗した場合は、領収書の `txError` で詳細を確認できます。 `txError`についての詳細は、 [txError: Transaction Failures](../../json-rpc/transaction-error-codes.md) を参照してください。


## 他のトランザクションタイプの実行 <a id="executing-other-transaction-types"></a>

Klaytnは拡張性とパフォーマンスのためのさまざまなトランザクションタイプを提供します。 詳細については、 [トランザクション](../../../klaytn/design/transactions/README.md) を参照してください。 このセクションでは、caver-Java で使用できるいくつかの例について説明します。

### 手数料のデリゲーション <a id="fee-delegation"></a>

Klaytnは手数料委任機能を提供します。 あなたがこの種のトランザクションの送信者である場合、以下はRLPエンコードされたトランザクションを作る例です:

```java
Caver caver = new Caver(Caver.BAOBAB_URL);
SingleKeyring senderKeyring = caver.wallet.keyring.createFromPrivateKey("0x{privateKey}");
caver.wallet.add(senderKeyring);

FeeDelegatedValueTransfer feeDelegatedValueTransfer = caver.transaction.feeDelegatedValueTransfer.create(
        TxPropertyBuilder.feeDelegatedValueTransfer()
                .setFrom(senderKeyring.getAddress())
                .setTo("0x176ff0344de49c04be577a3512b6991507647f72")
                .setValue(BigInteger.valueOf(1))
                .setGas(BigInteger.valueOf(30000))
);

caver.wallet.sign(senderKeyring.getAddress(), feeDelegatedValueTransfer);
String rlpEncoded = feeDelegatedValueTransfer.getRLPEncoding();
System.out.println(rlpEncoded);
```

上記のコードが実行されると、RLPエンコードされた文字列が出力されます。 (The RLP-encoded string output you got could be different from the string output shown below.)

```bash
0x09f884028505d21dba0082c35094176ff0344de49c04be577a3512b6991507647f720594f5a9079f311f9ec55170af351627aff0c5d2e287f847f845824e43a0f4b53dbd4c915cb73b9c7fa17e22106ee9640155a06ab4a7ed8661f846d2a5cca035b5bba6a26d4ccd20c65e8f31cce265c193f1c874806f9fae6b0ee9df0addf080c4c3018080
```

The fee payer can send the transaction to the Klaytn after attaching the `feePayerSignatures` to the RLP-encoded string (`rawTransaction`) signed by the transaction sender. If `caver.wallet` also has the fee payer's keyring, the fee payer's signature can be injected into `feeDelegatedTx` by calling `caver.wallet.signAsFeePayer(feePayer.address, feeDelegatedTx)`. そうでなければ、 手数料支払者は、送信者によって署名された RLP エンコードされた文字列から `feeDelegatedTx` を作成し、手数料支払者の署名を追加する必要があります。 下図のように。 以下の例を実行したい場合は、 `0x{RLP-encoded string}` を `rlpEncoded` の値に置き換えてください。

```java
Caver caver = new Caver(Caver.BAOBAB_URL);

SingleKeyring feePayerKeyring = caver.wallet.keyring.createFromPrivateKey("0x{privateKey}");
caver.wallet.add(feePayerKeyring);

String rlpEncoded = "0x{RLP-encoded string}";
FeeDelegatedValueTransfer feeDelegatedValueTransfer = caver.transaction.feeDelegatedValueTransfer.decode(rlpEncoded);
feeDelegatedValueTransfer.setFeePayer(feePayerKeyring.getAddress());
feeDelegatedValueTransfer.setKlaytnCall(caver.rpc.klay);

caver.wallet.signAsFeePayer(feePayerKeyring.getAddress(), feeDelegatedValueTransfer);
System.out.println(feeDelegatedValueTransfer.getRLPEncoding());
```

上記のコードが実行されると、送信者の署名と手数料支払者の署名を含むRLPエンコードされた文字列が以下のように表示されます。 (下図の文字列出力とは異なる場合があります。

```bash
0x09f8dc028505d21dba0082c35094176ff0344de49c04be577a3512b6991507647f720594f5a9079f311f9ec55170af351627aff0c5d2e287f847f845824e43a0f4b53dbd4c915cb73b9c7fa17e22106ee9640155a06ab4a7ed8661f846d2a5cca035b5bba6a26d4ccd20c65e8f31cce265c193f1c874806f9fae6b0ee9df0addf09417e7531b40ad5d7b5fa7b4ec78df64ce1cb36d24f847f845824e44a0921b7c3be69db96ce14134b306c2ada423613cb66ecc6697ee8067983c268b6ea07b86b255d1c781781315d85d7904226fb2101eb9498c4a03f3fbd30ba3ec5b79
```

トランザクションは送信者と手数料支払者の両方によって署名され、ネットワーク経由で送信できるようになりました。 `0x{RLP-encoded string}` を上記のサンプルコードの RLPエンコードされた文字列出力に置き換えます。

```java
Caver caver = new Caver(Caver.BAOBAB_URL);

TransactionReceiptProcessor receiptProcessor = new PollingTransactionReceiptProcessor(caver, 1000, 15);

String rlpEncoded = "0x{RLP-encoded string}";
try {
  // Send the transaction using `caver.rpc.klay.sendRawTransaction`.
  Bytes32 sendResult = caver.rpc.klay.sendRawTransaction(rlpEncoding).send();
  if(sendResult.hasError()) {
    //do something to handle error

  }

  String txHash = sendResult.getResult();
  TransactionReceipt.TransactionReceiptData receiptData = receiptProcessor.waitForTransactionReceipt(txHash);
} catch (IOException | TransactionException e) {
  // do something to handle exception.

}
```

The result of the transaction can be found through the `status` of the receipt. For the details of the return values, see `caver.rpc.klay.getTransactionReceipt`. If a transaction is failed, you can check more about the error in `txError` of the receipt. `txError`についての詳細は、[txError: Transaction Failuresの詳細情報]を参照してください。

### アカウントの更新 <a id="account-update"></a>

Klaytnアカウントの秘密鍵を変更したい場合は、覚えておくべき重要なことが3つあります。

1. Klaytnはあなたが送信するすべてのトランザクションを検証します。
2. 検証には、秘密鍵と完全に一致する公開鍵が必要です。
3. したがって、秘密鍵を新しい鍵に変更することは、 **常に** **の前に** 、古い公開鍵を新しい鍵に変更することによって行われます。 新しい公開鍵は、新しい秘密鍵から派生しなければなりません。

上記の3つのことを心に留めておくと、以下の手順に従って秘密鍵を変更することができます:

1. 新しい秘密鍵を作成するために新しい秘密鍵を準備します。
2. 必要に応じてキーリング(シングルキーリング、複数キーリング、ロールベースキーリング)を作成します。
3. 新しいキーリングからAccountインスタンスを生成します。 このアカウントインスタンスは、Klaytnアカウントの新しい公開鍵を保持します。
4. AccountUpdateトランザクションをKlaytnに送信します。
5. 最後に、ステップ2で作成された新しいキーリングに古いキーリングを置き換えます。

詳細については、 `アカウントアップデート` をご確認ください。

To change your AccountKey, you must provide an `Account` instance for the `account` field in the input argument object of `caver.transaction.type.AccountUpdate`. `アカウント` インスタンスには、更新する Klaytn アカウントのアドレスと AccountKey が含まれます。

以下のコードは、Klaytnアカウントで使用する秘密鍵を `AccountKeyPublic`に変更するコードの例です。 新しい秘密鍵を準備することを忘れないでください。

```java
Caver caver = new Caver(Caver.DEFAULT_URL);
SingleKeyring senderKeyring = caver.wallet.keyring.createFromPrivateKey("0x2359d1ae7317c01532a58b01452476b796a3ac713336e97d8d3c9651cc0aecc3");
caver.wallet.add(senderKeyring);

String newPrivateKey = caver.wallet.keyring.generateSingleKey();
SingleKeyring newKeyring = caver.wallet.keyring.create(senderKeyring.getAddress(), newPrivateKey);

Account account = newKeyring.toAccount();

AccountUpdate accountUpdate = caver.transaction.accountUpdate.create(
        TxPropertyBuilder.accountUpdate()
                .setFrom(senderKeyring.getAddress())
                .setAccount(account)
                .setGas(BigInteger.valueOf(50000))
);

try {
    caver.wallet.sign(senderKeyring.getAddress(), accountUpdate);
    String rlpEncoded = accountUpdate.getRLPEncoding();

    Bytes32 sendResult = caver.rpc.klay.sendRawTransaction(rlpEncoded).send();
    if(sendResult.hasError()) {
        //do something to handle error
        throw new TransactionException(sendResult.getError().getMessage());
    }

    String txHash = sendResult.getResult();

    TransactionReceiptProcessor receiptProcessor = new PollingTransactionReceiptProcessor(caver, 1000, 15);
    TransactionReceipt.TransactionReceiptData receiptData = receiptProcessor.waitForTransactionReceipt(txHash);
} catch (IOException | TransactionException e) {
    // do something to handle exception.
    e.printStackTrace();
}

senderKeyring = (SingleKeyring)caver.wallet.updateKeyring(newKeyring);
```

上記のコードが正常に実行された場合 古い秘密鍵を使用して、古い鍵ですべての取引に署名することができなくなります。 So you must update the old keyring with the `newKeyring` through `caver.wallet.updateKeyring(newKeyring)`. 更新されると、署名は新たに更新された秘密鍵によって行われます。

ここでは、複数の `AccountKeys` を使用して Klaytn アカウントの AccountKey を更新する方法を紹介します。 The example below explains how to create an `Account` instance with multiple private keys that what you want to use (You can create an `Account` instance with multiple public keys via `caver.account.create`). トランザクションオブジェクト内の `アカウント` フィールドに作成された口座インスタンスを指定した後も同じです。 残りの左側は上記の例と同じです

まず、 `AccountKeyWeightedMultiSig` で更新するアカウントインスタンスを作成しましょう。 `AccountKeyWeightedMultiSig`では、各キーの閾値と重みを定義する必要があります。 これを行うには、 `caver.account.weitedMultiSigOptions` を使用します。 最初のパラメータはthresholdで、2番目のパラメータは各キーの重みを含む配列です。

```java
// Create an account instance with three private keys using AccountKeyWeightedMultiSig
String[] privateKeyArr = caver.wallet.keyring.generateMultipleKeys(3);
MultipleKeyring multipleKeyring = caver.wallet.keyring.createWithMultipleKey(sender.getAddress(), privateKeyArr);

// threshold = 3, the weights of the three keys = [1, 2, 1]
BigInteger threshold = BigInteger.valueOf(3);
BigInteger[] weightedArr = new BigInteger[] {BigInteger.valueOf(1), BigInteger.valueOf(2), BigInteger.valueOf(1)};
WeightedMultiSigOptions options = new WeightedMultiSigOptions(threshold, Arrays.asList(weightedArr));

Account account = multipleKeyring.toAccount(options)
```

では、 `AccountKeyRoleBased` を使ってAccountKey を更新しましょう。 `AccountKeyRoleBased` は `` ロールごとに使用するキーを定義する `AccountKey` タイプです。

```java
// AccountKeyRoleBased を使用してロールを持つアカウントインスタンスを作成します。 作成されたアカウントインスタンスでは、各ロールには1つの秘密鍵に対応する公開鍵があります。
List<String[]> newPrivateKeyArr = caver.wallet.keyring.generateRoleBasedKeys(new int[] {1,1,1});
RoleBasedKeyring newKeyring = caver.wallet.keyring.createWithRoleBasedKey(senderKeyring.getAddress(), newPrivateKeyArr);

const account = newKeyring.toAccount()
```

AccountKeyRoleBaseは、ロールごとに1つの公開鍵を使用する例です。 上のコードからわかるように、それぞれが1つの秘密鍵に対応しています。 各ロールに複数の秘密鍵を使用する場合は、 `caver.account.weitedMultiSigOptions` を以下に示すように各ロールに定義する必要があります。

```java
// Create an account instance with [3, 2, 3] keys for each role using AccountKeyRoleBased
List<String[]> newPrivateKeyArr = caver.wallet.keyring.generateRolBasedKeys(new int[] {3, 2, 3});
RoleBasedKeyring newKeyring = caver.wallet.keyring.createWithRoleBasedKey(senderKeyring.getAddress(), newPrivateKeyArr);

WeightedMultiSigOptions[] options = new WeightedMultiSigOptions[] {
    new WeightedMultiSigOptions(BigInteger.valueOf(4), Arrays.asList(BigInteger.valueOf(2), BigInteger.valueOf(2), BigInteger.valueOf(4))),
    new WeightedMultiSigOptions(BigInteger.valueOf(2), Arrays.asList(BigInteger.valueOf(1), BigInteger.valueOf(1))),
    new WeightedMultiSigOptions(BigInteger.valueOf(3), Arrays.asList(BigInteger.valueOf(1), BigInteger.valueOf(1), BigInteger.valueOf(1))),
};

Account account = newKeyring.toAccount(Arrays.asList(options));
```

If you want to update AccountKey to `AccountKeyLegacy` or `accountKeyFail`, create an Account instance as shown below and assign it to the `account` field of the transaction. 残りのアップデートプロセスは他のAccountKeyと同じです。

```java
// AccountKeyLegacy でアカウントを作成する
Account account = caver.account.createWithAccountKeyLegacy(keyringToUpdate.address);

// AccountKeyFail でアカウントを作成する
Account account = caver.account.createWithAccountKeyFail(keyringToUpdate.address)
```

### スマート契約 <a id="smart-contract"></a>

`caver.contract` パッケージの `Contract` クラスを使用すると、Klaytnのスマートコントラクトと簡単にやり取りできます。 スマートコントラクトのすべての機能は、低レベルABIが与えられた場合、 `コントラクト` インスタンス内に自動的に変換および保存されます。 これにより、Javaで `コントラクト` インスタンスを処理するようなスマートコントラクトとやりとりできます。


以下に簡単なsolidityサンプルコードを記述することで、Javaでスマートコントラクトを扱うことについて説明します。 「test.sol」ファイルを作成し、以下の例を書き留めます。


```
pragma solidity ^0.5.6;

contract KVstore {
    mapping(string=>string) store;
    function get(string memory key) public view returns (string memory) {
        return store[key];
    }
    function set(string memory key, string memory value) public {
        store[key] = value;
    }
}
```

次に、このスマートコントラクトをコンパイルして、バイトコードと ABI を取得します。

```text
> solc --abi --bin ./test.sol
======= ./test.sol:KVstore =======
Binary: 
608060405234801561001057600080fd5b5061051f806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063693ec85e1461003b578063e942b5161461016f575b600080fd5b6100f46004803603602081101561005157600080fd5b810190808035906020019064010000000081111561006e57600080fd5b82018360208201111561008057600080fd5b803590602001918460018302840111640100000000831117156100a257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506102c1565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610134578082015181840152602081019050610119565b50505050905090810190601f1680156101615780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102bf6004803603604081101561018557600080fd5b81019080803590602001906401000000008111156101a257600080fd5b8201836020820111156101b457600080fd5b803590602001918460018302840111640100000000831117156101d657600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561023957600080fd5b82018360208201111561024b57600080fd5b8035906020019184600183028401116401000000008311171561026d57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506103cc565b005b60606000826040518082805190602001908083835b602083106102f957805182526020820191506020810190506020830392506102d6565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390208054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103c05780601f10610395576101008083540402835291602001916103c0565b820191906000526020600020905b8154815290600101906020018083116103a357829003601f168201915b50505050509050919050565b806000836040518082805190602001908083835b6020831061040357805182526020820191506020810190506020830392506103e0565b6001836020036101000a0380198251168184511680821785525050505050509050019150509081526020016040518091039020908051906020019061044992919061044e565b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061048f57805160ff19168380011785556104bd565b828001600101855582156104bd579182015b828111156104bc5782518255916020019190600101906104a1565b5b5090506104ca91906104ce565b5090565b6104f091905b808211156104ec5760008160009055506001016104d4565b5090565b9056fea165627a7a723058203ffebc792829e0434ecc495da1b53d24399cd7fff506a4fd03589861843e14990029
Contract JSON ABI 
[{"constant":true,"inputs":[{"name":"key","type":"string"}],"name":"get","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"key","type":"string"},{"name":"value","type":"string"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
```

**注**: スマートコントラクトをコンパイルするには、 [solidity コンパイラ](https://solidity.readthedocs.io/en/develop/installing-solidity.html) がインストールされている必要があります。 上記のプログラムをコンパイルするには、solc:0.5.6 をインストールする必要があります。

スマートコントラクトをタイプ別に展開するには、以下のcaver-javaクラスを使用します。
  - `Contract` class in the `caver.contract` package when the sender or the charge payer of a smartcontract transaction.
  - `スマートコントラクトトランザクションの送信者が手数料を支払ったとき、` `caver.transaction` パッケージ内のSmartContractDeploy format@@4
  - `スマートコントラクトトランザクションの手数料支払い者が手数料を支払う場合、` caver.transaction `パッケージ内の feeDelegatedSmartContractDeploy` クラス
  - `スマートコントラクトトランザクションの手数料支払者が手数料を支払う場合、` caver.transaction `パッケージの feeDelegatedSmartContractDeployWithRatio` クラス

`caver.contract` パッケージで `Contract` クラスを悪用した例を示します。 スマートコントラクトをコンパイルした後に取得したバイトコードとABIから、以下のような `コントラクト` インスタンスを作成できます。

```java
    private static final String ABIJson = "[{\"constant\":true,\"inputs\":[{\"name\":\"key\",\"type\":\"string\"}],\"name\":\"get\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"key\",\"type\":\"string\"},{\"name\":\"value\",\"type\":\"string\"}],\"name\":\"set\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]\n";

    public void createContractInstance() {
        Caver caver = new Caver(Caver.DEFAULT_URL);

        try {
            Contract contract = caver.contract.create(ABIJson);

            contract.getMethods().forEach((name, method) ->{
                System.out.println(method.getType() + " " +  caver.abi.buildFunctionString(method));
            });

            System.out.println("ContractAddress : " + contract.getContractAddress());
        } catch (IOException e) {
            //handle exception..
        }
    }
```

上記のコードを実行すると、次の結果が得られます。

```bash
function set(string,string)
function get(string)
ContractAddress : null
```

上記の出力を見ると、 `contract` インスタンスがスマートコントラクトメソッドを所有していることがわかります。 そして、まだデプロイされていないので、 `contractAddress()` の結果が null として出力されていることがわかります。

この契約がすでに展開されていて、この契約が展開された契約アドレスを知っている場合。 以下のように `contract` インスタンスのコンストラクタの 3 番目のパラメータとしてコントラクトアドレスを渡します。

```java
    private static final String ABIJson = "[{\"constant\":true,\"inputs\":[{\"name\":\"key\",\"type\":\"string\"}],\"name\":\"get\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"key\",\"type\":\"string\"},{\"name\":\"value\",\"type\":\"string\"}],\"name\":\"set\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]\n";

    @Test
    public void loadContract() {
        Caver caver = new Caver(Caver.DEFAULT_URL);
        String contractAddress = "0x3466D49256b0982E1f240b64e097FF04f99Ed4b9";

        try {
            Contract contract = caver.contract.create(ABIJson, contractAddress);

            contract.getMethods().forEach((name, method) ->{
                System.out.println(method.getType() + " " +  ABI.buildFunctionString(method));
            });

            System.out.println("ContractAddress : " + contract.getContractAddress());
        } catch (IOException e) {
            //handle exception..
        }
    }
```

Running the code above gives you the following result.

```bash
function set(string, string)
function get(string)
ContractAddress : 0x3466D49256b0982E1f240b64e097FF04f99Ed4b9
```

`contract` インスタンスは、コントラクトアドレスを `contractAddress` プロパティとして保存します。 アドレスは getter / setter 関数 (`getContractAddress()` / `setContractAddress()` ) からアクセスできます。

`コントラクト` インスタンスが作成されると、 以下の例として、バイトコードとコンストラクタの引数を渡すことで、スマートコントラクトをデプロイできます。

`contract` インスタンスの `deploy()` メソッドは、コントラクトのデプロイとコントラクトの実行のためにトランザクションを送信することに注意してください。 トランザクションを送信するには、 `caver.wallet` 内の Keyrings を使用して署名します。 使用するキーリングは署名する前に `caver.wallet` に追加されている必要があります。

```java
    private static final String byteCode = "608060405234801561001057600080fd5b5061051f806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063693ec85e1461003b578063e942b5161461016f575b600080fd5b6100f46004803603602081101561005157600080fd5b810190808035906020019064010000000081111561006e57600080fd5b82018360208201111561008057600080fd5b803590602001918460018302840111640100000000831117156100a257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506102c1565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610134578082015181840152602081019050610119565b50505050905090810190601f1680156101615780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102bf6004803603604081101561018557600080fd5b81019080803590602001906401000000008111156101a257600080fd5b8201836020820111156101b457600080fd5b803590602001918460018302840111640100000000831117156101d657600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561023957600080fd5b82018360208201111561024b57600080fd5b8035906020019184600183028401116401000000008311171561026d57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506103cc565b005b60606000826040518082805190602001908083835b602083106102f957805182526020820191506020810190506020830392506102d6565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390208054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103c05780601f10610395576101008083540402835291602001916103c0565b820191906000526020600020905b8154815290600101906020018083116103a357829003601f168201915b50505050509050919050565b806000836040518082805190602001908083835b6020831061040357805182526020820191506020810190506020830392506103e0565b6001836020036101000a0380198251168184511680821785525050505050509050019150509081526020016040518091039020908051906020019061044992919061044e565b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061048f57805160ff19168380011785556104bd565b828001600101855582156104bd579182015b828111156104bc5782518255916020019190600101906104a1565b5b5090506104ca91906104ce565b5090565b6104f091905b808211156104ec5760008160009055506001016104d4565b5090565b9056fea165627a7a723058203ffebc792829e0434ecc495da1b53d24399cd7fff506a4fd03589861843e14990029";

    private static final String ABIJson = "[{\"constant\":true,\"inputs\":[{\"name\":\"key\",\"type\":\"string\"}],\"name\":\"get\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"key\",\"type\":\"string\"},{\"name\":\"value\",\"type\":\"string\"}],\"name\":\"set\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]\n";

    public void deployContract() {
        Caver caver = new Caver(Caver.DEFAULT_URL);
        SingleKeyring deployer = caver.wallet.keyring.createFromPrivateKey("0x{private key}");
        caver.wallet.add(deployer);

        try {
            Contract contract = caver.contract.create(ABIJson);
            SendOptions sendOptions = new SendOptions();
            sendOptions.setFrom(deployer.getAddress());
            sendOptions.setGas(BigInteger.valueOf(4000000));

            Contract newContract = contract.deploy(sendOptions, byteCode);
            System.out.println("Contract address : " + newContract.getContractAddress());
        } catch (IOException | TransactionException | ClassNotFoundException | NoSuchMethodException | InvocationTargetException | InstantiationException | IllegalAccessException e) {
            //handle exception..
        }
    }
```

上のコードでは、 `deployer` がコントラクトを Klaytn にデプロイし、デプロイされた `contract` インスタンスを返します。

```bash
ContractAddress : 0x3466D49256b0982E1f240b64e097FF04f99Ed4b9
```

スマートコントラクトは、トランザクションをデプロイするコントラクトの種類に応じて、次のいずれかのクラスを使用してデプロイできます。
  - `Contract` class in the `caver.contract` package when the sender or the fee payer of a smart contract transaction pays the fee
  - `SmartContractDeploy` class in the `caver.transaction` package when the sender of a smart contract transaction pays the fee
  - `feeDelegatedSmartContractDeploy` class in the `caver.transaction` package  when the fee payer of a smart contract transaction pays the fee
  - `feeDelegatedSmartContractDeployWithRatio` class in the `caver.transaction` package when the fee payer of a smart contract transaction pays the fee


手数料委託取引を通じてスマートコントラクトを展開するには 以下の例のように、 `SendOptions` クラスの `feeDelegation` と `feePayer` フィールドを定義します。

```java
    private static final String byteCode = "608060405234801561001057600080fd5b5061051f806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063693ec85e1461003b578063e942b5161461016f575b600080fd5b6100f46004803603602081101561005157600080fd5b810190808035906020019064010000000081111561006e57600080fd5b82018360208201111561008057600080fd5b803590602001918460018302840111640100000000831117156100a257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506102c1565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610134578082015181840152602081019050610119565b50505050905090810190601f1680156101615780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102bf6004803603604081101561018557600080fd5b81019080803590602001906401000000008111156101a257600080fd5b8201836020820111156101b457600080fd5b803590602001918460018302840111640100000000831117156101d657600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561023957600080fd5b82018360208201111561024b57600080fd5b8035906020019184600183028401116401000000008311171561026d57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506103cc565b005b60606000826040518082805190602001908083835b602083106102f957805182526020820191506020810190506020830392506102d6565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390208054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103c05780601f10610395576101008083540402835291602001916103c0565b820191906000526020600020905b8154815290600101906020018083116103a357829003601f168201915b50505050509050919050565b806000836040518082805190602001908083835b6020831061040357805182526020820191506020810190506020830392506103e0565b6001836020036101000a0380198251168184511680821785525050505050509050019150509081526020016040518091039020908051906020019061044992919061044e565b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061048f57805160ff19168380011785556104bd565b828001600101855582156104bd579182015b828111156104bc5782518255916020019190600101906104a1565b5b5090506104ca91906104ce565b5090565b6104f091905b808211156104ec5760008160009055506001016104d4565b5090565b9056fea165627a7a723058203ffebc792829e0434ecc495da1b53d24399cd7fff506a4fd03589861843e14990029";

    private static final String ABIJson = "[{\"constant\":true,\"inputs\":[{\"name\":\"key\",\"type\":\"string\"}],\"name\":\"get\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"key\",\"type\":\"string\"},{\"name\":\"value\",\"type\":\"string\"}],\"name\":\"set\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]\n";

    public void deployContractWithFeeDelegation() {
        Caver caver = new Caver(Caver.DEFAULT_URL);

        SingleKeyring deployer = caver.wallet.keyring.createFromPrivateKey("0x{private key}");
        caver.wallet.add(deployer);

        SingleKeyring feePayer = caver.wallet.keyring.createFromPrivateKey("0x{private key}");
        caver.wallet.add(feePayer);

        try {
            Contract contract = caver.contract.create(ABIJson);

            SendOptions sendOptionsForDeployment = new SendOptions();
            sendOptionsForDeployment.setFrom(sender.getAddress());
            sendOptionsForDeployment.setGas(BigInteger.valueOf(1000000));
            sendOptionsForDeployment.setFeeDelegation(true);
            sendOptionsForDeployment.setFeePayer(feePayer.getAddress());

            contract.deploy(sendOptionsForDeployment, byteCode);
            System.out.println("The address of deployed smart contract:" + contract.getContractAddress());


        } catch (IOException | TransactionException | ClassNotFoundException | NoSuchMethodException | InvocationTargetException | InstantiationException | IllegalAccessException e) {
            //handle exception..
        }
    }
```

If you want to send a transaction with sender and feePayer signed seperately when deploying a smart contract through `caver.contract`, refer to the code below.

```java
    private static final String byteCode = "608060405234801561001057600080fd5b5061051f806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063693ec85e1461003b578063e942b5161461016f575b600080fd5b6100f46004803603602081101561005157600080fd5b810190808035906020019064010000000081111561006e57600080fd5b82018360208201111561008057600080fd5b803590602001918460018302840111640100000000831117156100a257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506102c1565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610134578082015181840152602081019050610119565b50505050905090810190601f1680156101615780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102bf6004803603604081101561018557600080fd5b81019080803590602001906401000000008111156101a257600080fd5b8201836020820111156101b457600080fd5b803590602001918460018302840111640100000000831117156101d657600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561023957600080fd5b82018360208201111561024b57600080fd5b8035906020019184600183028401116401000000008311171561026d57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506103cc565b005b60606000826040518082805190602001908083835b602083106102f957805182526020820191506020810190506020830392506102d6565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390208054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103c05780601f10610395576101008083540402835291602001916103c0565b820191906000526020600020905b8154815290600101906020018083116103a357829003601f168201915b50505050509050919050565b806000836040518082805190602001908083835b6020831061040357805182526020820191506020810190506020830392506103e0565b6001836020036101000a0380198251168184511680821785525050505050509050019150509081526020016040518091039020908051906020019061044992919061044e565b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061048f57805160ff19168380011785556104bd565b828001600101855582156104bd579182015b828111156104bc5782518255916020019190600101906104a1565b5b5090506104ca91906104ce565b5090565b6104f091905b808211156104ec5760008160009055506001016104d4565b5090565b9056fea165627a7a723058203ffebc792829e0434ecc495da1b53d24399cd7fff506a4fd03589861843e14990029";

    private static final String ABIJson = "[{\"constant\":true,\"inputs\":[{\"name\":\"key\",\"type\":\"string\"}],\"name\":\"get\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"key\",\"type\":\"string\"},{\"name\":\"value\",\"type\":\"string\"}],\"name\":\"set\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]\n";

    public void deployContractWithFeeDelegation() {
        Caver caver = new Caver(Caver.DEFAULT_URL);

        SingleKeyring deployer = caver.wallet.keyring.createFromPrivateKey("0x{private key}");
        caver.wallet.add(deployer);

        SingleKeyring feePayer = caver.wallet.keyring.createFromPrivateKey("0x{private key}");
        caver.wallet.add(feePayer);

        try {
            Contract contract = caver.contract.create(ABIJson);

            SendOptions sendOptionsForDeployment = new SendOptions();
            sendOptionsForDeployment.setFrom(sender.getAddress());
            sendOptionsForDeployment.setGas(BigInteger.valueOf(1000000));
            sendOptionsForDeployment.setFeeDelegation(true);
            sendOptionsForDeployment.setFeePayer(feePayer.getAddress());

            AbstractTransaction signedTx = contract.sign(sendOptionsForSigning, "constructor", byteCode);

            caver.wallet.signAsFeePayer(feePayer.getAddress(), (AbstractFeeDelegatedTransaction)signedTx);
            Bytes32 txHash = caver.rpc.klay.sendRawTransaction(signedTx).send();
            TransactionReceiptProcessor receiptProcessor = new PollingTransactionReceiptProcessor(caver, 1000, 15);

            TransactionReceipt.TransactionReceiptData receiptData = receiptProcessor.waitForTransactionReceipt(txHash.getResult());
            System.out.println("The address of deployed smart contract:" + receiptData.getContractAddress());
        } catch (IOException | TransactionException | ClassNotFoundException | NoSuchMethodException | InvocationTargetException | InstantiationException | IllegalAccessException e) {
            //handle exception..
        }
    }
```


スマートコントラクトの関数をタイプ別に実行するには、以下で説明する caver-java クラスを使用できます。
  - `スマートコントラクトトランザクションの送信者が手数料を支払ったとき、` `caver.contract` パッケージ内の契約 format@@4 クラス
  - `スマートコントラクトトランザクションの送信者が手数料を支払ったとき、` `caver.transaction` パッケージ内のSmartContractExecution クラス
  - `スマートコントラクトトランザクションの手数料支払い者が手数料を支払う場合、` caver.transaction `パッケージの FeeDelegatedSmartContractExecution` クラス
  - `スマートコントラクトトランザクションの手数料支払い者が手数料を支払う場合、` caver.transaction `パッケージ内の FeeDelegatedSmartContractExecutionWithRatio` クラス


To show how to execute a function in a smart contract, here we send a contract execution transaction that puts a string "testValue" as the input parameter of the contract function `set` in the example code below.

```java
    private static final String ABIJson = "[{\"constant\":true,\"inputs\":[{\"name\":\"key\",\"type\":\"string\"}],\"name\":\"get\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"key\",\"type\":\"string\"},{\"name\":\"value\",\"type\":\"string\"}],\"name\":\"set\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]\n";


    public void executeContractFunction() {
        Caver caver = new Caver(Caver.DEFAULT_URL);
        SingleKeyring executor = caver.wallet.keyring.createFromPrivateKey("0x{private key}");
        caver.wallet.add(executor);

        try {
            Contract contract = caver.contract.create(ABIJson, "0x{address in hex}");

            SendOptions sendOptions = new SendOptions();
            sendOptions.setFrom(executor.getAddress());
            sendOptions.setGas(BigInteger.valueOf(4000000));

            TransactionReceipt.TransactionReceiptData receipt = contract.send(sendOptions, "set", "test", "testValue");
        } catch (IOException | TransactionException | ClassNotFoundException | NoSuchMethodException | InvocationTargetException | InstantiationException | IllegalAccessException e) {
            //handle exception..
        }
    }
```

手数料委託取引を通じてスマートコントラクトの機能を実行するには 以下の例のように、 `SendOptions` クラスの `feeDelegation` と `feePayer` フィールドを定義します。


```java
    private static final String ABIJson = "[{\"constant\":true,\"inputs\":[{\"name\":\"key\",\"type\":\"string\"}],\"name\":\"get\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"key\",\"type\":\"string\"},{\"name\":\"value\",\"type\":\"string\"}],\"name\":\"set\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]\n";

    public void executeContractWithFeeDelegation() {
        Caver caver = new Caver(Caver.DEFAULT_URL);

        SingleKeyring executor = caver.wallet.keyring.createFromPrivateKey("0x{private key}");
        caver.wallet.add(executor);

        SingleKeyring feePayer = caver.wallet.keyring.createFromPrivateKey("0x{private key}");
        caver.wallet.add(feePayer);

        try {
            Contract contract = caver.contract.create(ABIJson, "0x{address in hex}");

            SendOptions sendOptionsForExecution = new SendOptions();
            sendOptionsForExecution.setFrom(executor.getAddress());
            sendOptionsForExecution.setGas(BigInteger.valueOf(4000000));
            sendOptionsForExecuted.setFeeDelegation(true);
            sendOptionsForExecuted.setFeePayer(feePayer.getAddress());

            TransactionReceipt.TransactionReceiptData receipt = contract.send(sendOptions, "set", "test", "testValue");
        } catch (Exception e) {
            //handle exception..
        }
    }
```

If you want to send a transaction with sender and feePayer signed separately when executing a smart contract through `caver.contract`, refer to the code below:

```java
    private static final String ABIJson = "[{\"constant\":true,\"inputs\":[{\"name\":\"key\",\"type\":\"string\"}],\"name\":\"get\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"key\",\"type\":\"string\"},{\"name\":\"value\",\"type\":\"string\"}],\"name\":\"set\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]\n";

    public void executeContractWithFeeDelegation() {
        Caver caver = new Caver(Caver.DEFAULT_URL);

        SingleKeyring executor = caver.wallet.keyring.createFromPrivateKey("0x{private key}");
        caver.wallet.add(executor);

        SingleKeyring feePayer = caver.wallet.keyring.createFromPrivateKey("0x{private key}");
        caver.wallet.add(feePayer);

        try {
            Contract contract = caver.contract.create(ABIJson, "0x{address in hex}");

            SendOptions sendOptionsForExecution = new SendOptions();
            sendOptionsForExecution.setFrom(executor.getAddress());
            sendOptionsForExecution.setGas(BigInteger.valueOf(4000000));
            sendOptionsForExecuted.setFeeDelegation(true);
            sendOptionsForExecuted.setFeePayer(feePayer.getAddress());

            AbstractTransaction executionTx = contract.sign(sendOptionsForExecution, "set", "test", "testValue");
            caver.wallet.signAsFeePayer(feePayer.getAddress(), (AbstractFeeDelegatedTransaction)executionTx);

            Bytes32 txHash_executed = caver.rpc.klay.sendRawTransaction(executionTx).send();
            TransactionReceiptProcessor receiptProcessor = new PollingTransactionReceiptProcessor(caver, 1000, 15);

            TransactionReceipt.TransactionReceiptData receiptData = receiptProcessor.waitForTransactionReceipt(txHash_executed.getResult());
        } catch (Exception e) {
            //handle exception..
        }
    }
```

`contract` インスタンスをロードし、その関数のいずれかを呼び出すには(トランザクションを送信するだけではなく、呼び出しだけではありません): 以下の例では、コントラクト内で `get` 関数を呼び出すことを示しています。

```java
    private static final String ABIJson = "[{\"constant\":true,\"inputs\":[{\"name\":\"key\",\"type\":\"string\"}],\"name\":\"get\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"key\",\"type\":\"string\"},{\"name\":\"value\",\"type\":\"string\"}],\"name\":\"set\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]\n";


    public void callContractFunction() {
        Caver caver = new Caver(Caver.DEFAULT_URL);

        try {
            Contract contract = caver.contract.create(ABIJson, '0x{address in hex}');
            List<Type> result = contract.call("get", "test");
            System.out.println((String)result.get(0).getValue());
        } catch (IOException | TransactionException | ClassNotFoundException | NoSuchMethodException | InvocationTargetException | InstantiationException | IllegalAccessException e) {
            //handle exception..
        }
    }
```

上記のコードが実行されると、値は以下の出力として表示されます。

```bash
testValue
```

詳細については、 [caver-Java API][] を参照してください。


## IPFS <a id="ipfs"></a>

IPFS(InterPlanetary File System)は、ファイル、ウェブサイト、アプリケーション、およびデータを保存およびアクセスするための分散ファイルシステムです。

CaverでIPFS経由でファイルをアップロードしてダウンロードできます。


### IPFSへの接続 <a id="connecting-with-ipfs"></a>

The `IPFS` class in the `caver.ipfs` package is defined as a class member variable in `Caver`, so you can interact with IPFS through `Caver`.

In order to use an `IPFS` instance through the `Caver` instance, you must call method `setIPFSNode()` first to connect to an IPFS node.

関数 `setIPFSNode()` には以下のパラメータが必要です:
  - IPFS HTTP API ホスト URL
  - IPFS HTTP API ホストポート番号
  - ホストが SSL を使用するかどうか。

```java
String host = "The URL of an IPFS node";
int port = 5001; // API host port number
boolean isSSL = true; // API host support ssl 
Caver caver = new Caver();
caver.ipfs.setIPFSNode(host, port, isSSL);
```

### IPFS経由でファイルをアップロード中<a id="uploading-a-file-through-ipfs"></a>

`IPFS`を介してファイルをアップロードするには、以下のように `add()` を使用してください。

この関数は、アップロードされたファイルの [CID(Content Identifier)](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids) を返します。


```java
String filePath = "/path/to/file";
String cid = caver.ipfs.add(filePath);
System.out.println(cid);
```

上記のコードの実行結果を以下に示します。

```java
QmYzW1fXbapdxkZXMQeCYoDCjVc18H8tLfMfrxXRySmQiq
```

同様に、バイト配列をアップロードすることもできます。

```java
String text = "sample data";
byte[] data = text.getBytes();

String cid = caver.ipfs.add(data);
System.out.println(cid);
```

The execution result of the above code is shown below.

```java
QmYzW1fXbapdxkZXMQeCYoDCjVc18H8tLfMfrxXRySmQiq
```

### IPFSからファイルをダウンロード中<a id="downloading-a-file-from-ipfs"></a>

`IPFS`からファイルをダウンロードするには、以下のように `get()` を使用してください。

この機能には、ダウンロードするファイルの CID が必要です。

```java
String cid = "QmYzW1fXbapdxkZXMQeCYoDCjVc18H8tLfMfrxXRySmQiq";
byte[] content = caver.ipfs.get(cid);
```


### CIDとマルチハッシュ間の変換 <a id="conversion-between-cid-and-multihash"></a>

[toHex()](https://multiformats.io/multihash/) を使用して CID を `Multihash` に変換できます。

CID は、マルチハッシュの Base58 エンコードされた値です。 `toHex()` はCIDをデコードし、対応するマルチハッシュを返します。

```java
String cid = "QmYtUc4iTCbbfVSDNKvtQqrfyezPPnFvE33wFmutw9PBBk";
String multihash = caver.ipfs.toHex(cid);
System.out.println(multihash);
```

The execution result of the above code is shown below.

```java
0x12209cbc07c3f991725836a3aa2a581ca2029198aa420b9d99bc0e131d9f3e2cbe47
```

マルチハッシュを CID に変換するには、 `fromHex()` を使用してください。

```java
String multihash = "0x12209cbc07c3f991725836a3aa2a581ca2029198aa420b9d99bc0e131d9f3e2cbe47";
String cid = caver.ipfs.fromHex(multhash);
System.out.println(cid);
```

The execution result of the above code is shown below.

```java
QmYtUc4iTCbbfVSDNKvtQqrfyezPPnFvE33wFmutw9PBBk
```

## KCT インターフェイスを検出<a id="detect kct interface"></a>

KCT (Klaytn Compatible Token) contracts such as [KIP-7][], [KIP-17][], and [KIP-37][] define and provide various interfaces, and [KIP-13][] allows you to see whether a contract complies with KCT specifications and which interface it implements, by sending a query to the contract.

[KIP-13][] は Caver v1.5.7 で実装された. It could detect interface through `detectInterface()` for any of the KCT contract classes (`KIP7`, `KIP17`, and `KIP37`).

### KIP-7 インターフェイスの検出 <a id="detecting-kip-7-interfaces"></a>

KIP-7 インターフェイスを検出するには、 `KIP7` クラスで `detectInterface()` を使用します。 KIP-7 インターフェイス識別子とインターフェイスがサポートされているかどうかの真偽値間のマッピングを返します。

`detectInterface()` は静的メソッドとインスタンスメソッドの両方をサポートしているため、ニーズに合ったメソッドを選択して使用できます。

`KIP7` の `detectInterface()` を介して検出されたインターフェイスを以下の表に示します。

| インターフェイス      | KIP-13 Identifier |
| ------------- | ----------------- |
| IKIP7         | 0x65787371        |
| IKIP7メタデータ    | 0xa219a025        |
| IKIP7Mintable | 0xeab83e20        |
| IKIP7書き込み可能   | 0x3b5a0bf8        |
| IKIP7Pausable | 0x4d5507ff        |

```java
Caver caver = new Caver(Caver.DEFAULT_URL);
ObjectMapper mapper = new ObjectMapper();
String contractAddress = "0x{address}";

//static メソッドを使用する。
Map<String, Boolean> resultStatic = caver.kct.kip7.detectInterface(caver, contractAddress);
String resultJson = mapper.writerDefaultPrettyPrinter().writeValueAsString(resultStatic);
System.out.println(resultJson);

//インスタンスメソッドを使用する。
KIP7 kip7 = caver.kct.kip7.create(contractAddress);
Map<String, Boolean> resultInstance = kip7.detectInterface();
String resultJson = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(resultInstance);
System.out.println(resultJson);
```

The execution result of the above code is shown below.

```java
{
  "IKIP7Metatdata" : true,
  "IKIP7Burnable" : true,
  "IKIP7" : true,
  "IKIP7Pausable" : true,
  "IKIP7Mintable" : true
}
```


### KIP-17インターフェースの検出 <a id="detecting-kip-17-interfaces"></a>

KIP-17 トークンコントラクトに実装されているインターフェイスを検出するには、 `KIP17` クラスで `detectInterface()` を使用します。 KIP-17 インターフェイス識別子とインターフェイスサポート間のマッピングを返します。

`detectInterface()` supports both static and instance methods, so you can select and use the method that suits your needs.

`KIP17` の `detectInterface()` を介してインターフェイスが検出されます。

| Interface           | KIP-13 Identifier |
| ------------------- | ----------------- |
| IKIP17              | 0x80ac58cd        |
| IKIP17メタデータ         | 0x5b5e139f        |
| IKIP17<unk>         | 0x780e9d63        |
| IKIP17Mintable      | 0xeab83e20        |
| IKIP17メタデータMintable | 0xfac27f46        |
| IKIP17書き込み可能        | 0x42966c68        |
| IKIP17Pausable      | 0x4d5507ff        |

```java

Caver caver = new Caver(Caver.DEFAULT_URL);
ObjectMapper mapper = new ObjectMapper();
String contractAddress = "0x{address}";

//using static method.
Map<String, Boolean> resultStatic = caver.kct.kip17.detectInterface(caver, contractAddress);
String resultJson = mapper.writerDefaultPrettyPrinter().writeValueAsString(resultStatic);
System.out.println(resultJson);

//instance method
KIP17 kip17 = caver.kct.kip17.create(contractAddress);
Map<String, Boolean> resultInstance = kip17.detectInterface();
String resultJson = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(resultInstance);
System.out.println(resultJson);
```

The execution result of the above code is shown below.

```java
{
  "IKIP17Enumerable" : true,
  "IKIP17Metadata" : true,
  "IKIP17Burnable" : true,
  "IKIP17Mintable" : true,
  "IKIP17" : true,
  "IKIP17MetadataMintable" : true,
  "IKIP17Pausable" : true
}
```

### KIP-37 インターフェイスの検出 <a id="detecting-kip-37-interfaces"></a>

KIP-37 トークンコントラクトに実装されているインターフェイスを検出するには、 `KIP37` クラスで `detectInterface()` を使用します。 KIP-37 インターフェイス識別子とインターフェイスサポート間のマッピングを返します。

`detectInterface()` は静的メソッドとインスタンスメソッドの両方をサポートしているため、適切なメソッドを選択して使用できます。

`KIP37` の `detectInterface()` によるインターフェイスの検出を以下の表に示します。

| Interface      | KIP-13 Identifier |
| -------------- | ----------------- |
| IKIP37         | 0x6433ca1f        |
| IKIP37メタデータ    | 0x0e89341c        |
| IKIP37Mintable | 0xdfd9d9ec        |
| IKIP37書き込み可能   | 0x9e094e9e        |
| IKIP37Pausable | 0x0e8ffdb7        |


```java

Caver caver = new Caver(Caver.DEFAULT_URL);
ObjectMapper mapper = new ObjectMapper();
String contractAddress = "0x{address}";

//using static method.
Map<String, Boolean> resultStatic = caver.kct.kip37.detectInterface(contractAddress);
String resultJson = mapper.writerDefaultPrettyPrinter().writeValueAsString(resultStatic);
System.out.println(resultJson);

//instance method
KIP37 kip37 = caver.kct.kip37.create(contractAddress);
Map<String, Boolean> resultInstance = kip37.detectInterface();
String resultJson = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(resultInstance);
System.out.println(resultJson);
```

The execution result of the above code is shown below.

```java
{
  "IKIP37Metatdata" : true,
  "IKIP37Burnable" : true,
  "IKIP37" : true,
  "IKIP37Pausable" : true,
  "IKIP37Mintable" : true
}
```


[caver-Java API]: https://javadoc.io/doc/com.klaytn.caver/core/
[KIP-7]: https://kips.klaytn.foundation/KIPs/kip-7
[KIP-13]: https://kips.klaytn.foundation/KIPs/kip-13
[KIP-17]: https://kips.klaytn.foundation/KIPs/kip-17
[KIP-37]: https://kips.klaytn.foundation/KIPs/kip-37
