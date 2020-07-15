# 시작하기 <a id="getting-started"></a>

## 새로운 기능

이번 caver-java 1.5.0 버전은 Common Architecture를 도입했습니다. Common Architecture란 Klaytn 개발 환경을 위한 새로운 소프트웨어 아키텍처로써 모든 Klaytn SDKs (caver-js/caver-java)가 공유합니다. Common Architecture는 여러분이 더 간편하고 더 체계적으로 개발하며 다른 프로그래밍 언어로 더 쉽게 확장하도록 설계되었습니다.

caver-java가 1.5.0으로 업데이트되면서 일부 API를 제외한 1.4.0 API는 이제 사용되지 않습니다.

caver-java 1.5.0이 새롭게 제공하는 API는 아래와 같습니다.

### caver.account

caver.account is a package used to update AccountKey, which could be one or more public keys (AccountKeyPublic, AccountKeyWeightedMultiSig, and AccountKeyRoleBased) or a special type of keys (AccountKeyLegacy and AccountKeyFail), for a Klaytn account.


- `caver.account`는 caver-java 1.4.0의 `caver.tx.account`를 대체합니다.

### caver.wallet

caver.wallet은 인메모리 지갑에서 Keyring 인스턴스를 관리하도록 하는 패키지입니다. Keyring이란 어떤 Klaytn 계정 주소와 그 주소의 개인키(들)를 저장하는 인스턴스입니다. 키링은 이 계정 주소가 트랜잭션에 서명할 때 사용됩니다. caver.wallet은 모든 종류의 Keyring(SingleKeyring, MultipleKeyring, and RoleBasedKeyring)을 수용하며 각 keyring에 저장된 Klaytn 계정 주소를 가지고 keyring을 관리합니다.

- `caver.wallet` replaces `caver.crypto` in caver-java 1.4.0
- `caver.wallet.KeyStore` replaces `caver.wallet.WalletFile` in caver-java 1.4.0

### caver.transaction

caver.transaction is a package that provides functionality related to [Transaction](https://docs.klaytn.com/klaytn/design/transactions#transactions-overview).

- `caver.transaction` replaces `caver.tx` in caver-java 1.4.0

### caver.rpc

caver.rpc is a package that provides functionality related to rpc call with Klaytn Node.

- `caver.rpc.klay` and `caver.rpc.net` replaces `Klay`, `Net` interfaces in caver-java 1.4.0, respectively

### caver.util

caver.utils provides utility functions.

## 준비 사항 <a id="prerequisites"></a>

### 의존성 <a id="dependency"></a>

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
implementation 'com.klaytn.caver:core:1.5.0'
```

안드로이드 의존성을 사용하려면, 버전 문자열 끝에 -android를 추가하세요. \(가령 1.0.1-android\)

JSON-RPC 요청 및 응답에 대한 세부 사항을 보려면, [LOGBack](https://logback.qos.ch/) 의존성을 프로젝트에 포함하세요. 아래는 Gradle 빌드 파일 예제입니다. Maven에도 의존성을 추가할 수 있습니다. caver-java가 [SLF4J](https://www.slf4j.org/) 로깅 퍼사드(logging facade)를 사용하기 때문에, LOGBack 대신 선호하는 로깅 프레임워크로 전환할 수 있습니다.

```groovy
implementation "ch.qos.logback:logback-classic:1.2.3"
```

**참고**: 중앙 저장소에는 RC, Android 및 Java 버전이 함께 나열됩니다. 와일드 카드를 사용하여 버전을 얻어오면 플랫폼에 적합하지 않은 버전을 사용하게 될 수 있습니다.

#### 커맨드라인 도구<a id="command-line-tool"></a>

커맨드라인 도구를 사용하면 커맨드라인에서 솔리디티 스마트 컨트랙트 함수 래퍼를 생성할 수 있습니다.

**설치 \(Homebrew\)**

이를 설치하려면 Java 1.8 이상이 필요합니다.

```text
$ brew tap klaytn/klaytn
$ brew install caver-java
```

설치 후 아래와 같이 'caver-java' 명령을 실행할 수 있습니다:

```text
$ caver-java solidity generate -b <smart-contract>.bin -a <smart-contract>.abi -o <outputPath> -p <packagePath>
```

**설치 \(기타\)**

현재 다른 패키지 관리자는 지원하지 않습니다. 다른 솔루션으로, 아래 CLI를 구축하는 방법을 제공합니다.

* caver-java를 다운로드하거나 포크(fork)하세요.
* Gradle을 사용하여 콘솔 모듈에서 'shadowDistZip' 작업을 수행하세요. 그 결과 console/build/distributions/console-shadow-{version}.zip이 생성됩니다.

  ```text
  $ ./gradlew :console:shadowDistZip
  ```

* 빌드 디렉토리에서 zip 파일을 압축 해제하세요.

  ```text
  $ unzip ./console/build/distributions/console-shadow-{version}.zip
  ```

* 바이너리 파일을 실행하여 아래와 같이 커맨드라인 도구를 실행하세요. macOS 사용자용 쉘 스크립트 파일과 Window 사용자용 배치 파일을 찾을 수 있습니다.

  ```text
  $ ./console/build/distributions/console-shadow-{version}/bin/caver-java
  ```


## Sending KLAY at a glance

This section describes a simple example of using a `keystore file` to send KLAY with a value transfer transaction. The keystore file can be created in [Klaytn Wallet](../../../toolkit/klaytn-wallet.md#how-to-receive-baobab-testnet-klay). 테스트를 위해 KLAY가 필요한 경우 [Klaytn Wallet](../../../toolkit/klaytn-wallet.md#how-to-receive-baobab-testnet-klay)에서 Baobab testnet KLAY를 얻을 수 있습니다.

```java
public void sendingKLAY() throws IOException, CipherException, TransactionException {
        Caver caver = new Caver(Caver.BAOBAB_URL);

        //Read keystore json file.
        File file = new File("./keystore.json");

        //Decrypt keystore.
        ObjectMapper objectMapper = ObjectMapperFactory.getObjectMapper();
        KeyStore keyStore = objectMapper.readValue(file, KeyStore.class);
        AbstractKeyring keyring = KeyringFactory.decrypt(keyStore, "password");

        //Add to caver wallet.
        caver.wallet.add(keyring);

        BigInteger value = new BigInteger(Utils.convertToPeb(BigDecimal.ONE, "KLAY"));

        //Create a value transfer transaction
        ValueTransfer valueTransfer = new ValueTransfer.Builder()
                .setKlaytnCall(caver.rpc.getKlay())
                .setFrom(keyring.getAddress())
                .setTo("0x8084fed6b1847448c24692470fc3b2ed87f9eb47")
                .setValue(value)
                .setGas(BigInteger.valueOf(25000))
                .build();

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


## Starting with caver-java <a id="starting-with-caver-java"></a>

### Connecting to a Klaytn Node <a id="connecting-to-a-klaytn-node"></a>

You can import the caver-java module and connect it to a Klaytn Node in the Baobab testnet as shown in the example below:

```java
Caver caver = new Caver(Caver.BAOBAB_URL); // Caver.BAOBAB_URL = https://api.baobab.klaytn.net:8651
```

EN을 실행 중인 경우, 아래와 같이 호스트와 포트를 변경하여 자신의 노드에 연결할 수 있습니다:

```java
Caver caver = new Caver("http://localhost:8551/");
```


## Managing Keyrings <a id="managing-keyrings"></a>

`Keyring` is a structure that contains the address of the Klaytn account and the private key(s).

`Keyring` can be classified into three types depending on the type of key being stored: `SingleKeyring` to store one address and one private key, `MultipleKeyring` to store one address and multiple private keys, and `RoleBasedKeyring` to store one address and one or more private keys for each role.

`SingleKeyring` defines `key` property inside, and this `key` stores one private key.

`MultipleKeyring` defines `keys` property inside, and this `keys` is implemented as an array to store multiple private keys.

The `keys` property defined in `RoleBasedKeyring` is implemented as a List object having 3 arrays of private key(s) as its elements (empty `keys` will look like `[ [], [], [] ]`) and so that it can include multiple keys for each `role`. The first element of the array is filled with the private key(s) to be used for `roleTransactionKey`, the second element the private key(s) to be used for `roleAccountUpdateKey`, and the third element the private key(s) to be used for `roleFeePayerKey`.

### Creating a Keyring <a id="creating-a-keyring"></a>

#### Generating a SingleKeyring <a id="generating-a-singlekeyring"></a>

You can randomly generate a single keyring as shown below.

```java
SingleKeyring keyring = KeyringFactory.generate();
```

#### Creating a SingleKeyring from private key <a id="creating-a-singlekeyring-from-private-key"></a>

Also, if you own a specific private key, you can use it to create a keyring as shown below.

```java
String privateKey = "0x{private key in hex}";
SingleKeyring keyring = KeyringFactory.createFromPrivateKey(privateKey);
```

#### Creating a SingleKeyring with a private key and an address <a id="creating-a-singlekeyring-with-a-private-key-and-an-address"></a>

If your private key for your Klaytn account is decoupled from the address, you can create a keyring using the given address and the given private key like below.

```java
String address = "0x{address in hex}";
String privateKey = "0x{private key in hex}";
SingleKeyring keyring = KeyringFactory.createWithSingleKey(address, privateKey);
```

Also, you can derive SingleKeyring instance from Klaytn wallet key.

```java
String klaytnWalletKey = "0x{private key}0x{type}0x{address in hex}";
SingleKeyring keyring = KeyringFactory.createFromKlaytnWalletKey(klaytnWalletKey);
```

#### Creating a MultipleKeyring with multiple private keys <a id="creating-a-multiplekeyring-with-multiple-private-keys"></a>

If you want to use multiple private keys, you can create a `MultipleKeyring` using an address and multiple private keys. The below examples show how to create a `MultipleKeyring` with multiple private keys.

```java
String address = "0x{address in hex}";
String[] privateKeyArray = new String[] {"0x{private key#1}", "0x{private key#2}", "0x{private key#3}"};
MultipleKeyring multipleKeyring = KeyringFactory.createWithMultipleKey(address, privateKeyArray);
```

#### Creating a RoleBasedKeyring with private keys <a id="creating-a-rolebasedkeyring-with-role-based-private-keys"></a>

To use different private key(s) for each `role`, `KeyringFactory.createWithRoleBasedKey` is used. Each array element represents a role described in `RoleBasedKeyring`. The example below shows how to create a `RoleBasedKeyring` instance from different keys for each role.


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

RoleBasedKeyring keyring = KeyringFactory.createWithRoleBasedKey(address, Arrays.asList(privateKeyArr));
```

### Adding Keyrings to caver-java from a keystore json string.<a id="adding-keyrings-to-caver-java"></a>

You can use a keyring more easily by adding it to the in-memory wallet provided by caver-java. The following examples illustrate how to add a keyring to `caver.wallet` using a keystore JSON file string generated by [Klaytn Wallet](https://wallet.klaytn.com/).

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

SingleKeyring decrypt = (SingleKeyring)KeyringFactory.decrypt(keyStoreJsonString, password);
System.out.println("Decrypted address : " + decrypt.getAddress());
System.out.println("Decrypted key : " + decrypt.getKey());

AbstractKeyring addedKeyring = caver.wallet.add(decrypt);
System.out.println("address : " + addedKeyring.getAddress());
System.out.println("key : " + addedKeyring.getKey());
```

```bash
Decrypted address : 0xc02cec4d0346bf4124deeb55c5216a4138a40a8c
Decrypted key : 0x93c90135ae69669e416ba5997d9274f8c8bd60748761fc421e415602d68a13a5

address : 0xc02cec4d0346bf4124deeb55c5216a4138a40a8c
key : 0x93c90135ae69669e416ba5997d9274f8c8bd60748761fc421e415602d68a13a5
```

Looking at the output above, you can query your keyring from `caver.wallet` after adding it to `caver.wallet`.

If you have an address and private key(s) to use, you can easily create a keyring and add it directly to caver.wallet via caver.wallet.newKeyring.

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

When `caver.wallet.newKeyring` is executed with a private key, a Keyring instance with one private key is created and added to `caver.wallet`. For multiple private keys, a Keyring instance with multiple private keys is created and added to `caver.wallet`. When passing a 2D string array including one or more private keys for each role as an element, a Keyring instance that contains the different private key(s) for each role is created and also added to the `caver.wallet`.


`caver.wallet.add` or `caver.wallet.newKeyring` returns a Keyring instance after adding it to `caver.wallet`.

## 트랜잭션 발신 <a id="sending-a-transaction"></a>

This section will show you how to send KLAY using caver-java on the Baobab network.

### Baobab Faucet을 통해 KLAY 받기 <a id="getting-klay-via-baobab-faucet"></a>

테스트를 위해 KLAY가 필요한 경우 [Klaytn Wallet](../../../toolkit/klaytn-wallet.md#how-to-receive-baobab-testnet-klay)에서 Baobab testnet KLAY를 얻을 수 있습니다. 개인키 또는 키스토어 파일을 사용하여 Klaytn Wallet에 로그인하고 테스트를 위해 faucet을 통해 Baobab 테스트넷 KLAY를 받습니다.

### 송금 트랜잭션 전송 <a id="sending-a-value-transfer-transaction"></a>

You can use a caver-java wallet to generate a signature of a transaction. You have to go through two steps below to send the transaction to the network.

1. Sign a transaction
    - If the keyring you want to use is added to `caver.wallet`, you can use `caver.wallet.sign` function to sign.
    - If you manage the keyring separately without adding it to `caver.wallet`, you can sign the transaction through `transaction.sign` function.
2. Send the RLP-encoded string of the signed transaction to the Klaytn via `caver.rpc.klay.sendRawTransaction`.

**Note:** The sender should have enough number of KLAY to be transferred and also to pay the transaction fee.

#### Sign a transaction

Before sending a transaction to Klaytn, you should sign a transaction first.

Below is an example of how to sign a transaction if a keyring is added to the `caver.wallet`.

```java
Caver caver = new Caver(Caver.MAINNET_URL);

// Add a keyring to caver.wallet
SingleKeyring keyring = KeyringFactory.createFromPrivateKey("privateKey");
caver.wallet.add(keyring);

// Create a value transfer transaction
ValueTransfer valueTransfer = new ValueTransfer.Builder()
        .setKlaytnCall(caver.rpc.klay)
        .setFrom(keyring.getAddress())
        .setTo("0x176ff0344de49c04be577a3512b6991507647f72")
        .setValue(BigInteger.valueOf(1))
        .setGas(BigInteger.valueOf(30000))
        .build();

// Sign the transaction via caver.wallet.sign
caver.wallet.sign(keyring.getAddress(), valueTransfer);
String rlpEncoded = valueTransfer.getRLPEncoding();
System.out.println("RLP-encoded string: " + rlpEncoded)
```

The above code adds a keyring to `caver.wallet`, creates a transaction, and signs the transaction through `caver.wallet.sign`.

Running the above code gives you the following result. When the above code is executed, the RLP-encoded string of the transaction is shown below. (The RLP-encoded string output you got could be different from the string output shown below.)

```bash
RLP-encoded string: 0x08f87e808505d21dba0082753094176ff0344de49c04be577a3512b6991507647f720194ade4883d092e2a972d70637ca7de9ab5166894a2f847f845824e44a0e1ec99789157e5cb6bc691935c204a23aaa3dc049efafca106992a5d5db2d179a0511c421d5e508fdb335b6048ca7aa84560a53a5881d531644ff178b6aa4c0a41
```

#### Send the RLP-encoded string of the signed transaction to the Klaytn

Now you can send a signed transaction to the network like below. If you want to run the below example, replace "rlpEncoding" with the value of `rlpEncoded` in the code above.

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

If you want to sign a transaction and send it to the network without `caver.wallet`, see the example below.

```java
Caver caver = new Caver(Caver.MAINNET_URL);

// Add a keyring to caver.wallet
SingleKeyring keyring = KeyringFactory.createFromPrivateKey("privateKey");
caver.wallet.add(keyring);

// Create a value transfer transaction
ValueTransfer valueTransfer = new ValueTransfer.Builder()
        .setKlaytnCall(caver.rpc.klay)
        .setFrom(keyring.getAddress())
        .setTo("0x176ff0344de49c04be577a3512b6991507647f72")
        .setValue(BigInteger.valueOf(1))
        .setGas(BigInteger.valueOf(30000))
        .build();

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

When the above code is executed, the transaction hash (txHash) is printed like the example below.

```bash
Transaction Hash : 0x43e8ab1a2365ad598448b4402c1cfce6a71b3a103fce3a69905613e50b978113
```

### 영수증 확인<a id="checking-receipts"></a>

You can use the `TransactionReceiptProcessor` to get the receipt of the transaction when you transfer the transaction to the Klaytn by `caver.rpc.klay.sendRawTransaction`.

The following example shows how to get a receipt using PollingTransactionReceiptProcessor.

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

As described in the example above, you can get the result of sending a transaction through TransactionReceiptProcessor. The `transactionHash` field is defined inside the receipt object.

You can use `caver.rpc.klay.getTransactionReceipt` RPC call with `txHash` string to query the receipt of a transaction at any time from the network after the transaction is included in a block. The example below shows how to get a receipt using the `caver.rpc.klay.getTransactionReceipt` RPC call.

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

The result of the transaction can be found through the `status` of the receipt. For the details of the return values, see `caver.rpc.klay.getTransactionReceipt`. If a transaction is failed, you can check more about the error in `txError` of the receipt. `txError`에 대한 자세한 설명은 [txError: Detailed Information of Transaction Failures](../../../json-rpc/transaction-error-codes.md)를 참고하세요.


## 다른 트랜잭션 타입 실행하기 <a id="executing-other-transaction-types"></a>

Klaytn은 확장성과 성능을 위한 다양한 트랜잭션 타입을 제공합니다. 자세한 내용은 [트랜잭션](../../../klaytn/design/transactions/README.md)을 참고하세요. This section describes some examples that can be used with caver-java.

### 트랜잭션 수수료 위임 <a id="fee-delegation"></a>

Klaytn provides Fee Delegation feature. Here's an example of making a RLP-encoded transaction when you are a sender of this kind of transaction:

```java
Caver caver = new Caver(Caver.BAOBAB_URL);
SingleKeyring senderKeyring = KeyringFactory.createFromPrivateKey("0x{privateKey}");
caver.wallet.add(senderKeyring);

FeeDelegatedValueTransfer feeDelegatedValueTransfer = new FeeDelegatedValueTransfer.Builder()
        .setKlaytnCall(caver.rpc.klay)
        .setFrom(senderKeyring.getAddress())
        .setTo("0x176ff0344de49c04be577a3512b6991507647f72")
        .setValue(BigInteger.valueOf(1))
        .setGas(BigInteger.valueOf(30000))
        .build();

caver.wallet.sign(senderKeyring.getAddress(), feeDelegatedValueTransfer);
String rlpEncoded = feeDelegatedValueTransfer.getRLPEncoding();
System.out.println(rlpEncoded);
```

When the above code is executed, the RLP-encoded string will be printed. (The RLP-encoded string output you got could be different from the string output shown below.)

```bash
0x09f884028505d21dba0082c35094176ff0344de49c04be577a3512b6991507647f720594f5a9079f311f9ec55170af351627aff0c5d2e287f847f845824e43a0f4b53dbd4c915cb73b9c7fa17e22106ee9640155a06ab4a7ed8661f846d2a5cca035b5bba6a26d4ccd20c65e8f31cce265c193f1c874806f9fae6b0ee9df0addf080c4c3018080
```

The fee payer can send the transaction to the Klaytn after attaching the `feePayerSignatures` to the RLP-encoded string (`rawTransaction`) signed by the transaction sender. If `caver.wallet` also has the fee payer's keyring, the fee payer's signature can be injected into `feeDelegatedTx` by calling `caver.wallet.signAsFeePayer(feePayer.address, feeDelegatedTx)`. Otherwise, the fee payer has to create a `feeDelegatedTx` from the RLP-encoded string signed by the sender and add the fee payer's sign onto it, as illustrated below. If you want to run the below example, replace `0x{RLP-encoded string}` with the value of `rlpEncoded` above.

```java
Caver caver = new Caver(Caver.BAOBAB_URL);

SingleKeyring feePayerKeyring = KeyringFactory.createFromPrivateKey("0x{privateKey}");
caver.wallet.add(feePayerKeyring);

String rlpEncoded = "0x{RLP-encoded string}";
FeeDelegatedValueTransfer feeDelegatedValueTransfer = FeeDelegatedValueTransfer.decode(rlpEncoded);
feeDelegatedValueTransfer.setFeePayer(feePayerKeyring.getAddress());

caver.wallet.signAsFeePayer(feePayerKeyring.getAddress(), feeDelegatedValueTransfer);
System.out.println(feeDelegatedValueTransfer.getRLPEncoding());
```

When the above code is executed, the RLP-encoded string including the sender's signatures and fee payer's signatures is printed like below. (The output you got could be different from the string output shown below.)

```bash
0x09f8dc028505d21dba0082c35094176ff0344de49c04be577a3512b6991507647f720594f5a9079f311f9ec55170af351627aff0c5d2e287f847f845824e43a0f4b53dbd4c915cb73b9c7fa17e22106ee9640155a06ab4a7ed8661f846d2a5cca035b5bba6a26d4ccd20c65e8f31cce265c193f1c874806f9fae6b0ee9df0addf09417e7531b40ad5d7b5fa7b4ec78df64ce1cb36d24f847f845824e44a0921b7c3be69db96ce14134b306c2ada423613cb66ecc6697ee8067983c268b6ea07b86b255d1c781781315d85d7904226fb2101eb9498c4a03f3fbd30ba3ec5b79
```

The transaction is now signed by both the sender and the fee payer, and it can now be sent over the network. Replace `0x{RLP-encoded string}` with the RLP-encoded string output of the example code above.

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

The result of the transaction can be found through the `status` of the receipt. For the details of the return values, see `caver.rpc.klay.getTransactionReceipt`. If a transaction is failed, you can check more about the error in `txError` of the receipt. `txError`에 대한 자세한 설명은 [txError: Detailed Information of Transaction Failures](../../../json-rpc/transaction-error-codes.md)를 참고하세요.

### 계정 업데이트 <a id="account-update"></a>

If you want to change the private key(s) for your Klaytn account, there are 3 important things you need to remember:

1. Klaytn validates every transaction you send to it.
2. The validation requires your public keys which exactly corresponds to your private key(s).
3. Thus, changing your private key(s) into the new one(s) is **always be** **preceded** by changing your old public key(s) to the new one(s). The new public key(s) must be derived from the new private key(s).

Keeping the 3 things above in your mind, you can change your private key(s) by following the steps below:

1. Prepare the new private key(s) to create a new keyring.
2. Create a keyring by its type (Single keyring, Multiple keyring, or Role-based keyring) you need.
3. Generate an Account instance from the new keyring. This Account instance holds the new public key(s) for your Klaytn account.
4. Send AccountUpdate transaction including Account instance to Klaytn.
5. Finally, replace your old keyring to the new one that was created in Step 2.

Please check `Account Update` for the details.

To change your AccountKey, you must provide an `Account` instance for the `account` field in the input argument object of `caver.transaction.type.AccountUpdate`. An `Account` instance contains the address of the Klaytn account and the AccountKey to be updated.

The code below is an example code that changes the private key(s) you use for your Klaytn account along with changing AccountKey of your Klaytn account to `AccountKeyPublic`. Don't forget to prepare your new private key(s).

```java
Caver caver = new Caver(Caver.BAOBAB_URL);
SingleKeyring senderKeyring = KeyringFactory.createFromPrivateKey("0x{privateKey}");
caver.wallet.add(senderKeyring);

String newPrivateKey = KeyringFactory.generateSingleKey();
SingleKeyring newKeyring = KeyringFactory.createFromPrivateKey(newPrivateKey);

Account account = newKeyring.toAccount();

AccountUpdate accountUpdate = new AccountUpdate.Builder()
        .setKlaytnCall(caver.rpc.klay)
        .setFrom(senderKeyring.getAddress())
        .setAccount(account)
        .setGas(BigInteger.valueOf(50000))
        .build();

try {
    caver.wallet.sign(senderKeyring.getAddress(), accountUpdate);
    String rlpEncoded = accountUpdate.getRLPEncoding();

    Bytes32 sendResult = caver.rpc.klay.sendRawTransaction(rlpEncoded).send();
    if(sendResult.hasError()) {
        //do something to handle error
    }

    String txHash = sendResult.getResult();

    TransactionReceiptProcessor receiptProcessor = new PollingTransactionReceiptProcessor(caver, 1000, 15);
    TransactionReceipt.TransactionReceiptData receiptData = receiptProcessor.waitForTransactionReceipt(txHash);
} catch (IOException | TransactionException e) {
    // do something to handle exception.
}

senderKeyring = caver.wallet.updateKeyring(newKeyring);
```

If the above code is executed successfully, you are no longer able to use the old private key(s) to sign any transaction with the old keyring. So you must update the old keyring with the `newKeyring` through `caver.wallet.updateKeyring(newKeyring)`. Once it is updated, the signing will be done by the newly updated private key(s).

Here comes how to update AccountKey of your Klaytn account with multiple `AccountKeys`? The example below explains how to create an `Account` instance with multiple private keys that what you want to use (You can create an `Account` instance with multiple public keys via `caver.account.create`). Same again, after feeding the account instance created to the `account` field inside the transaction object, the left rest of the updating process is just the same as the above example.

First, let's create an Account instance to update with `AccountKeyWeightedMultiSig`. For `AccountKeyWeightedMultiSig`, a threshold and a weight for each key must be defined. To do this, use `caver.account.weightedMultiSigOptions`. The first parameter is the threshold, and the second parameter is an array containing the weight for each key.

```java
// Create an account instance with three private keys using AccountKeyWeightedMultiSig
String[] privateKeyArr = KeyringFactory.generateMultipleKeys(3);
MultipleKeyring multipleKeyring = KeyringFactory.createWithMultipleKey(sender.getAddress(), privateKeyArr);

// threshold = 3, the weights of the three keys = [1, 2, 1]
BigInteger threshold = BigInteger.valueOf(3);
BigInteger[] weightedArr = new BigInteger[] {BigInteger.valueOf(1), BigInteger.valueOf(2), BigInteger.valueOf(1)};
WeightedMultiSigOptions options = new WeightedMultiSigOptions(threshold, Arrays.asList(weightedArr));

Account account = multipleKeyring.toAccount(options)
```

Now let's update AccountKey using `AccountKeyRoleBased`. `AccountKeyRoleBased` is an `AccountKey` type that defines the key to use for each `role`.

```java
// Create an account instance with roles using AccountKeyRoleBased. In the account instance created, each role has a public key that corresponds to one private key.
List<String[]> newPrivateKeyArr = KeyringFactory.generateRolBasedKeys(new int[] {1,1,1});
RoleBasedKeyring newKeyring = KeyringFactory.createWithRoleBasedKey(senderKeyring.getAddress(), newPrivateKeyArr);

const account = newKeyring.toAccount()
```

The AccountKeyRoleBased above is an example of using one public key for each role. As you can see from the code above, each of them corresponds to one private key. If you want to use multiple private keys for each role, `caver.account.weightedMultiSigOptions` must be defined for each role as shown below.

```java
// Create an account instance with [3, 2, 3] keys for each role using AccountKeyRoleBased
List<String[]> newPrivateKeyArr = KeyringFactory.generateRolBasedKeys(new int[] {3, 2, 3});
RoleBasedKeyring newKeyring = KeyringFactory.createWithRoleBasedKey(senderKeyring.getAddress(), newPrivateKeyArr);

WeightedMultiSigOptions[] options = new WeightedMultiSigOptions[] {
    new WeightedMultiSigOptions(BigInteger.valueOf(4), Arrays.asList(BigInteger.valueOf(2), BigInteger.valueOf(2), BigInteger.valueOf(4))),
    new WeightedMultiSigOptions(BigInteger.valueOf(2), Arrays.asList(BigInteger.valueOf(1), BigInteger.valueOf(1))),
    new WeightedMultiSigOptions(BigInteger.valueOf(3), Arrays.asList(BigInteger.valueOf(1), BigInteger.valueOf(1), BigInteger.valueOf(1))),
};

Account account = newKeyring.toAccount(Arrays.asList(options));
```

If you want to update AccountKey to `AccountKeyLegacy` or `accountKeyFail`, create an Account instance as shown below and assign it to the `account` field of the transaction. The rest of the update process is same to that of other AccountKey.

```java
// Create an account with AccountKeyLegacy
Account account = Account.createWithAccountKeyLegacy(keyringToUpdate.address);

// Create an account with AccountKeyFail
Account account = Account.createWithAccountKeyFail(keyringToUpdate.address)
```

### 스마트 컨트랙트 <a id="smart-contract"></a>

This is not supported yet.