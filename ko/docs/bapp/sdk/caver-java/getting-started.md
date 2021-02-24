# 시작하기 <a id="getting-started"></a>

## 새로운 기능

이번 caver-java 1.5.0 버전은 Common Architecture를 도입했습니다. Common Architecture is a new software architecture for Klaytn development environment, which is shared by all Klaytn SDKs (caver-js/caver-java). Common Architecture는 여러분이 더 간편하고 더 체계적으로 개발하며 다른 프로그래밍 언어로 더 쉽게 확장하도록 설계되었습니다.

caver-java가 1.5.0으로 업데이트되면서 일부 API를 제외한 1.4.0 API는 이제 사용되지 않습니다.

caver-java 1.5.0이 새롭게 제공하는 API는 아래와 같습니다.

### caver.account

caver.account is a package used to update AccountKey, which could be one or more public keys (AccountKeyPublic, AccountKeyWeightedMultiSig, and AccountKeyRoleBased) or a special type of keys (AccountKeyLegacy and AccountKeyFail), for a Klaytn account.


- `caver.account`는 caver-java 1.4.0의 `caver.tx.account`를 대체합니다.

### caver.wallet

caver.wallet은 인메모리 지갑에서 Keyring 인스턴스를 관리하도록 하는 패키지입니다. A Keyring is an instance that stores the address of a Klaytn account and its private key(s), and it is used when the address of this account signs a transaction. caver.wallet accepts all types of Keyring (SingleKeyring, MultipleKeyring, and RoleBasedKeyring) and manages them with their Klaytn account address.

- `caver.wallet`는 caver-java 1.4.0의 `caver.crypto`를 대체합니다.
- `caver.wallet.KeyStore`는 caver-java 1.4.0의 `caver.wallet.WalletFile`를 대체합니다.

### caver.transaction

caver.transaction은 [Transaction](https://docs.klaytn.com/klaytn/design/transactions#transactions-overview) 관련 기능을 제공하는 패키지입니다.

- `caver.transaction`는 caver-java 1.4.0의 `caver.tx`를 대체합니다.

### caver.rpc

caver.rpc는 Klaytn 노드에 RPC 호출을 하는 기능을 제공하는 패키지입니다.

- `caver.rpc.klay`와 `caver.rpc.net`은 caver-java 1.4.0의 `Klay`, `Net` 인터페이스를 각각 대체합니다.

### caver.util

caver.utils는 유틸리티 함수를 제공합니다.

### caver.contract

`caver.contract` 패키지를 사용하면 Klaytn의 스마트 컨트랙트를 쉽게 다룰 수 있습니다. caver.contract를 사용하면 스마트 컨트랙트를 배포하고 스마트 컨트랙트 함수를 호출해 실행할 수 있습니다. `caver.contract`는 먼저 스마트 컨트랙트 함수와 이벤트들을 ABI\(Application Binary Interface\)에서 변환하여 함수를 호출하고 이벤트 정보를 얻습니다.

## 준비 사항 <a id="prerequisites"></a>

### Adding a Repository<a id="adding-a-repository"></a>
A library repository should be added before using IPFS. Please add the following repository first.

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
allprojects {
    repositories {
        ...
        maven { url 'https://jitpack.io' }
    }
}
```

### Adding a Dependency <a id="adding-a-dependency"></a>

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


## 빠른 시작: KLAY 전송하기

이 장은 `keystore file`을 사용해 KLAY를 전송하는 간단한 KLAY 전송 트랜잭션 예시를 설명합니다. The keystore file can be created in [Klaytn Wallet](../../../toolkit/klaytn-wallet.md#how-to-receive-baobab-testnet-klay). If you need KLAY for testing, you can get Baobab testnet KLAY from the [Klaytn Wallet](../../../toolkit/klaytn-wallet.md#how-to-receive-baobab-testnet-klay).

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


## caver-java 시작하기 <a id="starting-with-caver-java"></a>

### Klaytn 노드에 접속하기<a id="connecting-to-a-klaytn-node"></a>

EN을 실행 중인 경우, 아래와 같이 호스트와 포트를 변경하여 자신의 노드에 연결할 수 있습니다:

```java
Caver caver = new Caver("http://your.en.url:8551/");
```


## Keyring 관리 <a id="managing-keyrings"></a>

`Keyring` is a structure that contains the address of the Klaytn account and the private key(s).

`Keyring` can be classified into three types depending on the type of key being stored: `SingleKeyring` to store one address and one private key, `MultipleKeyring` to store one address and multiple private keys, and `RoleBasedKeyring` to store one address and one or more private keys for each role.

`SingleKeyring` defines `key` property inside, and this `key` stores one private key.

`MultipleKeyring` defines `keys` property inside, and this `keys` is implemented as an array to store multiple private keys.

The `keys` property defined in `RoleBasedKeyring` is implemented as a List object having 3 arrays of private key(s) as its elements (empty `keys` will look like `[ [], [], [] ]`) and so that it can include multiple keys for each `role`. The first element of the array is filled with the private key(s) to be used for `roleTransactionKey`, the second element the private key(s) to be used for `roleAccountUpdateKey`, and the third element the private key(s) to be used for `roleFeePayerKey`.

### Keyring 생성<a id="creating-a-keyring"></a>

#### SingleKeyring 생성 <a id="generating-a-singlekeyring"></a>

아래와 같이 임의의 값을 사용해 SingleKeyring을 생성할 수 있습니다.

```java
SingleKeyring keyring = KeyringFactory.generate();
```

#### 개인키로 SingleKeyring 생성하기 <a id="creating-a-singlekeyring-from-private-key"></a>

개인키가 있다면, 이 개인키를 사용해 Keyring을 만들 수 있습니다.

```java
String privateKey = "0x{private key in hex}";
SingleKeyring keyring = KeyringFactory.createFromPrivateKey(privateKey);
```

#### 개인키와 계정 주소로 SingleKeyring 생성하기<a id="creating-a-singlekeyring-with-a-private-key-and-an-address"></a>

여러분의 Klaytn 계정 주소가 개인키로부터 생성된 것이 아니라 개인키와 별도로 분리된 것이라면, 주소와 개인키를 사용해 Keyring을 만들 수 있습니다.

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

#### 여러 개인키로 MultipleKeyring 생성하기<a id="creating-a-multiplekeyring-with-multiple-private-keys"></a>

If you want to use multiple private keys, you can create a `MultipleKeyring` using an address and multiple private keys. The below examples show how to create a `MultipleKeyring` with multiple private keys.

```java
String address = "0x{address in hex}";
String[] privateKeyArray = new String[] {"0x{private key#1}", "0x{private key#2}", "0x{private key#3}"};
MultipleKeyring multipleKeyring = KeyringFactory.createWithMultipleKey(address, privateKeyArray);
```

#### 개인키로 RoleBasedKeyring 생성하기<a id="creating-a-rolebasedkeyring-with-role-based-private-keys"></a>

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

위 결과를 살펴보면 `caver.wallet`에 Keyring을 추가하면 `caver.wallet`에서 여러분의 Keyring을 조회할 수 있습니다.

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

개인키를 사용해 `caver.wallet.newKeyring`을 실행하면 개인키 1개를 가진 Keyring 인스턴스 1개가 생성되고 이 인스턴스는 `caver.wallet`에 추가됩니다. For multiple private keys, a Keyring instance with multiple private keys is created and added to `caver.wallet`. When passing a 2D string array including one or more private keys for each role as an element, a Keyring instance that contains the different private key(s) for each role is created and also added to the `caver.wallet`.


`caver.wallet`에 Keyring 인스턴스를 추가하면 `caver.wallet.add` 또는 `caver.wallet.newKeyring`은 Keyring 인스턴스를 반환합니다.

## 트랜잭션 전송하기 <a id="sending-a-transaction"></a>

This section will show you how to send KLAY using caver-java on the Baobab network.

### Baobab Faucet을 통해 KLAY 받기 <a id="getting-klay-via-baobab-faucet"></a>

If you need KLAY for testing, you can get Baobab testnet KLAY from the [Klaytn Wallet](../../../toolkit/klaytn-wallet.md#how-to-receive-baobab-testnet-klay). 개인키 또는 키스토어 파일을 사용하여 Klaytn Wallet에 로그인하고 테스트를 위해 faucet을 통해 Baobab 테스트넷 KLAY를 받습니다.

### 송금 트랜잭션 전송 <a id="sending-a-value-transfer-transaction"></a>

You can use a caver-java wallet to generate a signature of a transaction. 트랜잭션을 네트워크에 보내려면 아래와 같이 2단계를 거쳐야합니다.

1. 트랜잭션 서명하기
    - 만약, 사용하시고 싶은 Keyring이 `caver.wallet`에 있다면, `caver.wallet.sign` 함수로 서명할 수 있습니다.
    - `caver.wallet`에 Keyring을 추가하지 않고 따로 관리한다면, `transaction.sign` 함수를 통해 트랜잭션에 서명할 수 있습니다.
2. RLP 인코딩된 서명된 트랜잭션을 `caver.rpc.klay.sendRawTransaction`을 통해 Klaytn에 전송합니다.

**Note:** The sender should have enough number of KLAY to be transferred and also to pay the transaction fee.

#### 트랜잭션 서명하기

트랜잭션을 Klaytn에 보내기 전에 트랜잭션에 먼저 서명해야 합니다.

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

위 코드는 Keyring을 `caver.wallet`에 추가하고, 트랜잭션을 생성하고, `caver.wallet.sign`를 통해 이 트랜잭션에 서명합니다.

위 코드를 실행하면 아래 결과를 얻습니다. 위 코드가 실행되었을 때, RLP 인코딩된 트랜잭션 문자열은 아래와 같이 나타납니다. (The RLP-encoded string output you got could be different from the string output shown below.)

```bash
RLP-encoded string: 0x08f87e808505d21dba0082753094176ff0344de49c04be577a3512b6991507647f720194ade4883d092e2a972d70637ca7de9ab5166894a2f847f845824e44a0e1ec99789157e5cb6bc691935c204a23aaa3dc049efafca106992a5d5db2d179a0511c421d5e508fdb335b6048ca7aa84560a53a5881d531644ff178b6aa4c0a41
```

#### RLP 인코딩된 서명된 트랜잭션을 Klaytn에 전송합니다.

이제, 아래와 같이 서명된 트랜잭션을 Klaytn에 전송할 수 있습니다. If you want to run the below example, replace "rlpEncoding" with the value of `rlpEncoded` in the code above.

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

`caver.wallet` 없이 트랜잭션에 서명하고 Klaytn에 서명된 트랜잭션을 보내려면 아래 예시를 확인하십시오.

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

As described in the example above, you can get the result of sending a transaction through TransactionReceiptProcessor. `transactionHash` 필드는 영수증 객체 내부에 정의됩니다.

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

트랜잭션의 실행 결과는 영수증의 `status`를 통하여 확인할 수 있습니다. For the details of the return values, see `caver.rpc.klay.getTransactionReceipt`. 만약 트랜잭션 실행이 실패한다면 에러에 대한 자세한 내용은 영수증의 `txError`에서 확인할 수 있습니다. For more information about `txError`, see [txError: Detailed Information of Transaction Failures](../../json-rpc/transaction-error-codes.md).


## 다른 트랜잭션 타입 실행하기 <a id="executing-other-transaction-types"></a>

Klaytn은 확장성과 성능을 위한 다양한 트랜잭션 타입을 제공합니다. For more information, see [Transactions](../../../klaytn/design/transactions/README.md). This section describes some examples that can be used with caver-java.

### 트랜잭션 수수료 위임 <a id="fee-delegation"></a>

Klaytn provides Fee Delegation feature. 여기에서는, 여러분이 트랜잭션 전송자일 때 RLP 인코딩된 트랜잭션을 만드는 예시를 소개합니다.

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

위 코드가 실행되었을 때, RLP 인코딩된 문자열이 출력됩니다. (The RLP-encoded string output you got could be different from the string output shown below.)

```bash
0x09f884028505d21dba0082c35094176ff0344de49c04be577a3512b6991507647f720594f5a9079f311f9ec55170af351627aff0c5d2e287f847f845824e43a0f4b53dbd4c915cb73b9c7fa17e22106ee9640155a06ab4a7ed8661f846d2a5cca035b5bba6a26d4ccd20c65e8f31cce265c193f1c874806f9fae6b0ee9df0addf080c4c3018080
```

The fee payer can send the transaction to the Klaytn after attaching the `feePayerSignatures` to the RLP-encoded string (`rawTransaction`) signed by the transaction sender. If `caver.wallet` also has the fee payer's keyring, the fee payer's signature can be injected into `feeDelegatedTx` by calling `caver.wallet.signAsFeePayer(feePayer.address, feeDelegatedTx)`. 그렇지 않다면, 수수료 납부자는 트랜잭션 발신자가 서명한 RLP 인코딩된 문자열에서 `feeDelegatedTx`를 새로 만들고, 자신의 서명을 여기에 추가해야합니다. 아래 예시를 참고하십시오. 아래 예시를 직접 실행하려면 `0x{RLP-encoded string}`를 위 `rlpEncoded` 값으로 대체하십시오 .

```java
Caver caver = new Caver(Caver.BAOBAB_URL);

SingleKeyring feePayerKeyring = KeyringFactory.createFromPrivateKey("0x{privateKey}");
caver.wallet.add(feePayerKeyring);

String rlpEncoded = "0x{RLP-encoded string}";
FeeDelegatedValueTransfer feeDelegatedValueTransfer = FeeDelegatedValueTransfer.decode(rlpEncoded);
feeDelegatedValueTransfer.setFeePayer(feePayerKeyring.getAddress());
feeDelegatedValueTransfer.setKlaytnCall(caver.rpc.klay);

caver.wallet.signAsFeePayer(feePayerKeyring.getAddress(), feeDelegatedValueTransfer);
System.out.println(feeDelegatedValueTransfer.getRLPEncoding());
```

위 코드가 실행되었을 때, 발신자 서명과 수수료 납부자 서명이 첨부된 RLP 인코딩된 문자열 아래와 같이 나타납니다. (The output you got could be different from the string output shown below.)

```bash
0x09f8dc028505d21dba0082c35094176ff0344de49c04be577a3512b6991507647f720594f5a9079f311f9ec55170af351627aff0c5d2e287f847f845824e43a0f4b53dbd4c915cb73b9c7fa17e22106ee9640155a06ab4a7ed8661f846d2a5cca035b5bba6a26d4ccd20c65e8f31cce265c193f1c874806f9fae6b0ee9df0addf09417e7531b40ad5d7b5fa7b4ec78df64ce1cb36d24f847f845824e44a0921b7c3be69db96ce14134b306c2ada423613cb66ecc6697ee8067983c268b6ea07b86b255d1c781781315d85d7904226fb2101eb9498c4a03f3fbd30ba3ec5b79
```

이제 트랜잭션 발신자와 수수료 납부자 모두 트랜잭션에 서명했으니, 트랜잭션을 Klaytn에 전송할 수 있습니다. `0x{RLP-encoded string}`을 위 예시 코드의 RLP 인코딩된 문자열 출력값으로 대체하십시오.

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

트랜잭션의 실행 결과는 영수증의 `status`를 통하여 확인할 수 있습니다. For the details of the return values, see `caver.rpc.klay.getTransactionReceipt`. 만약 트랜잭션 실행이 실패한다면 에러에 대한 자세한 내용은 영수증의 `txError`에서 확인할 수 있습니다. For more information about `txError`, see [txError: Detailed Information of Transaction Failures].

### 계정 업데이트 <a id="account-update"></a>

If you want to change the private key(s) for your Klaytn account, there are 3 important things you need to remember:

1. Klaytn은 자신에게 전송되는 모든 트랜잭션을 검증합니다.
2. The validation requires your public keys which exactly corresponds to your private key(s).
3. Thus, changing your private key(s) into the new one(s) is **always be** **preceded** by changing your old public key(s) to the new one(s). The new public key(s) must be derived from the new private key(s).

Keeping the 3 things above in your mind, you can change your private key(s) by following the steps below:

1. Prepare the new private key(s) to create a new keyring.
2. Create a keyring by its type (Single keyring, Multiple keyring, or Role-based keyring) you need.
3. 새 Keyring에서 Account 인스턴스를 생성합니다. This Account instance holds the new public key(s) for your Klaytn account.
4. Account 인스턴스를 입력 파라미터로 받는 AccountUpdate 트랜잭션을 Klaytn에 전송합니다.
5. 마지막으로, 기존 Keyring을 2번째 단계에서 만들었던 새 Keyring으로 교체합니다.

Please check `Account Update` for the details.

To change your AccountKey, you must provide an `Account` instance for the `account` field in the input argument object of `caver.transaction.type.AccountUpdate`. An `Account` instance contains the address of the Klaytn account and the AccountKey to be updated.

The code below is an example code that changes the private key(s) you use for your Klaytn account along with changing AccountKey of your Klaytn account to `AccountKeyPublic`. Don't forget to prepare your new private key(s).

```java
Caver caver = new Caver(Caver.DEFAULT_URL);
SingleKeyring senderKeyring = KeyringFactory.createFromPrivateKey("0x2359d1ae7317c01532a58b01452476b796a3ac713336e97d8d3c9651cc0aecc3");
caver.wallet.add(senderKeyring);

String newPrivateKey = KeyringFactory.generateSingleKey();
SingleKeyring newKeyring = KeyringFactory.create(senderKeyring.getAddress(), newPrivateKey);

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

If the above code is executed successfully, you are no longer able to use the old private key(s) to sign any transaction with the old keyring. 따라서 여러분은 `caver.wallet.updateKeyring(newKeyring)`을 사용해 기존 Keyring을 `newKeyring`으로 업데이트하셔야 합니다.  Once it is updated, the signing will be done by the newly updated private key(s).

Here comes how to update AccountKey of your Klaytn account with multiple `AccountKeys`? The example below explains how to create an `Account` instance with multiple private keys that what you want to use (You can create an `Account` instance with multiple public keys via `caver.account.create`). 여기에서도, 트랜잭션 객체의 `account` 필드에 Account 인스턴스를 입력 파라미터로 넣으면, 나머지 업데이트 과정은 위에서 소개한 AccountKey 1개를 업데이트하는 과정과 동일합니다.

First, let's create an Account instance to update with `AccountKeyWeightedMultiSig`. For `AccountKeyWeightedMultiSig`, a threshold and a weight for each key must be defined. To do this, use `caver.account.weightedMultiSigOptions`. 1번째 파라미터는 임계값이고 2번째 파라미터는 Key별 가중치를 담고 있는 배열입니다.

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

위 AccountKeyRoleBased는 Role마다 공개키 1개를 사용하는 예시입니다. 위 코드에서 볼 수 있듯이, 이들 각각은 개인키 1개에 대응됩니다. If you want to use multiple private keys for each role, `caver.account.weightedMultiSigOptions` must be defined for each role as shown below.

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

The `Contract` class in `caver.contract` package makes it easy to interact with smart contracts on Klaytn. All functions of a smart contract automatically converted and stored inside `contract` instance, when its low-level ABI is given. This allows you to interact with a smart contract like you handle a `contract` instance in Java.


We begin our explanation of dealing with a smart contract in Java by writing a simple solidity example code below. Create a 'test.sol' file and write down the example below.


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

Then, compile this smart contract to get its bytecode and ABI.

```text
> solc --abi --bin ./test.sol
======= ./test.sol:KVstore =======
Binary: 
608060405234801561001057600080fd5b5061051f806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063693ec85e1461003b578063e942b5161461016f575b600080fd5b6100f46004803603602081101561005157600080fd5b810190808035906020019064010000000081111561006e57600080fd5b82018360208201111561008057600080fd5b803590602001918460018302840111640100000000831117156100a257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506102c1565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610134578082015181840152602081019050610119565b50505050905090810190601f1680156101615780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102bf6004803603604081101561018557600080fd5b81019080803590602001906401000000008111156101a257600080fd5b8201836020820111156101b457600080fd5b803590602001918460018302840111640100000000831117156101d657600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561023957600080fd5b82018360208201111561024b57600080fd5b8035906020019184600183028401116401000000008311171561026d57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506103cc565b005b60606000826040518082805190602001908083835b602083106102f957805182526020820191506020810190506020830392506102d6565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390208054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103c05780601f10610395576101008083540402835291602001916103c0565b820191906000526020600020905b8154815290600101906020018083116103a357829003601f168201915b50505050509050919050565b806000836040518082805190602001908083835b6020831061040357805182526020820191506020810190506020830392506103e0565b6001836020036101000a0380198251168184511680821785525050505050509050019150509081526020016040518091039020908051906020019061044992919061044e565b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061048f57805160ff19168380011785556104bd565b828001600101855582156104bd579182015b828111156104bc5782518255916020019190600101906104a1565b5b5090506104ca91906104ce565b5090565b6104f091905b808211156104ec5760008160009055506001016104d4565b5090565b9056fea165627a7a723058203ffebc792829e0434ecc495da1b53d24399cd7fff506a4fd03589861843e14990029
Contract JSON ABI 
[{"constant":true,"inputs":[{"name":"key","type":"string"}],"name":"get","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"key","type":"string"},{"name":"value","type":"string"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
```

**참고**: 스마트 컨트랙트를 컴파일하려면 [솔리디티 컴파일러](https://solidity.readthedocs.io/en/develop/installing-solidity.html) 가 설치되어 있어야 합니다. To compile the above program, you need to install solc:0.5.6.

To deploy a smart contract by its type, you can use caver-java classes described below:
  - 스마트 컨트랙트 트랜잭션 발신자가 수수료를 지불할 때에는 `caver.contract` 패키지에 있는 `Contract` 클래스를 사용
  - 스마트 컨트랙트 트랜잭션 발신자가 수수료를 지불할 때에는 `caver.transaction`패키지에 있는 `SmartContractDeploy`클래스를 사용
  - 스마트 컨트랙트 트랜잭션 수수료 납부자가 수수료를 지불할 때에는 `caver.transaction`패키지에 있는 `feeDelegatedSmartContractDeploy` 클래스를 사용
  - 스마트 컨트랙트 트랜잭션 수수료 납부자가 수수료를 일부 지불할 때에는 `caver.transaction`패키지에 있는 `feeDelegatedSmartContractDeployWithRatio` 클래스를 사용

Here is an example of exploiting `Contract` class in `caver.contract` package. You can create a `contract` instance like below from the bytecode and ABI you get after compiling the smart contract.

```java
    private static final String ABIJson = "[{\"constant\":true,\"inputs\":[{\"name\":\"key\",\"type\":\"string\"}],\"name\":\"get\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"key\",\"type\":\"string\"},{\"name\":\"value\",\"type\":\"string\"}],\"name\":\"set\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]\n";

    public void createContractInstance() {
        Caver caver = new Caver(Caver.DEFAULT_URL);

        try {
            Contract contract = new Contract(caver, ABIJson);

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
function set(string,string)
function get(string)
ContractAddress : null
```

Looking at the output above, you can see that the `contract` instance owns the smart contract method. And since it hasn't been deployed yet, you can see that the result of `contract.getContractAddress()` is output as null.

If this contract was already deployed and you knew the contract address where this contract was deployed at, pass the contract address as the third parameter of the constructor of the `contract` instance as below.

```java
    private static final String ABIJson = "[{\"constant\":true,\"inputs\":[{\"name\":\"key\",\"type\":\"string\"}],\"name\":\"get\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"key\",\"type\":\"string\"},{\"name\":\"value\",\"type\":\"string\"}],\"name\":\"set\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]\n";

    @Test
    public void loadContract() {
        Caver caver = new Caver(Caver.DEFAULT_URL);
        String contractAddress = "0x3466D49256b0982E1f240b64e097FF04f99Ed4b9";

        try {
            Contract contract = new Contract(caver, ABIJson);

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
function set(string,string)
function get(string)
ContractAddress : 0x3466D49256b0982E1f240b64e097FF04f99Ed4b9
```

A `contract` instance stores its contract address as `contractAddress` property when it was created. The address can be accessed through getter / setter function (`getContractAddress()` / `setContractAddress()`).

Once a `contract` instance is created, you can deploy the smart contract by passing its bytecode you got after the compiling stage to the `ContractDeployParams` instance below.

Note that the `deploy()` method of the `contract` instance sends transactions for contract deployment and contract execution. For sending transactions, it uses Keyrings in `caver.wallet` to sign them. The keyring to be used must have been added to `caver.wallet` before signing.

```java
    private static final String byteCode = "608060405234801561001057600080fd5b5061051f806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063693ec85e1461003b578063e942b5161461016f575b600080fd5b6100f46004803603602081101561005157600080fd5b810190808035906020019064010000000081111561006e57600080fd5b82018360208201111561008057600080fd5b803590602001918460018302840111640100000000831117156100a257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506102c1565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610134578082015181840152602081019050610119565b50505050905090810190601f1680156101615780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102bf6004803603604081101561018557600080fd5b81019080803590602001906401000000008111156101a257600080fd5b8201836020820111156101b457600080fd5b803590602001918460018302840111640100000000831117156101d657600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561023957600080fd5b82018360208201111561024b57600080fd5b8035906020019184600183028401116401000000008311171561026d57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506103cc565b005b60606000826040518082805190602001908083835b602083106102f957805182526020820191506020810190506020830392506102d6565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390208054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103c05780601f10610395576101008083540402835291602001916103c0565b820191906000526020600020905b8154815290600101906020018083116103a357829003601f168201915b50505050509050919050565b806000836040518082805190602001908083835b6020831061040357805182526020820191506020810190506020830392506103e0565b6001836020036101000a0380198251168184511680821785525050505050509050019150509081526020016040518091039020908051906020019061044992919061044e565b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061048f57805160ff19168380011785556104bd565b828001600101855582156104bd579182015b828111156104bc5782518255916020019190600101906104a1565b5b5090506104ca91906104ce565b5090565b6104f091905b808211156104ec5760008160009055506001016104d4565b5090565b9056fea165627a7a723058203ffebc792829e0434ecc495da1b53d24399cd7fff506a4fd03589861843e14990029";

    private static final String ABIJson = "[{\"constant\":true,\"inputs\":[{\"name\":\"key\",\"type\":\"string\"}],\"name\":\"get\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"key\",\"type\":\"string\"},{\"name\":\"value\",\"type\":\"string\"}],\"name\":\"set\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]\n";

    public void deployContract() {
        Caver caver = new Caver(Caver.DEFAULT_URL);
        SingleKeyring deployer = KeyringFactory.createFromPrivateKey("0x{private key}");
        caver.wallet.add(deployer);

        try {
            Contract contract = new Contract(caver, ABIJson);
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

In the code above, the `deployer` deploys the contract to the Klaytn and returns the deployed `contract` instance.

```bash
ContractAddress : 0x3466D49256b0982E1f240b64e097FF04f99Ed4b9
```

A smart contract can be deployed using one of the following classes, depending on the type of contract deploying transaction:
  - 스마트 컨트랙트 트랜잭션 발신자가 수수료를 지불할 때에는 `caver.contract` 패키지에 있는 `Contract` 클래스를 사용
  - 스마트 컨트랙트 트랜잭션 발신자가 수수료를 지불할 때에는 `caver.transaction`패키지에 있는 `SmartContractDeploy`클래스를 사용
  - 스마트 컨트랙트 트랜잭션 수수료 납부자가 수수료를 지불할 때에는 `caver.transaction`패키지에 있는 `feeDelegatedSmartContractDeploy` 클래스를 사용
  - 스마트 컨트랙트 트랜잭션 수수료 납부자가 수수료를 일부 지불할 때에는 `caver.transaction`패키지에 있는 `feeDelegatedSmartContractDeployWithRatio` 클래스를 사용


Deploying a smart contract through fee-delegated transaction using `Contract` class in `caver.contract` package is not supported yet. To do that, `FeeDelegatedSmartContractDeploy` class (or `FeeDelegatedSmartContractDeployWithRatio` class) is used explicitly like the example below:

```java
    private static final String byteCode = "608060405234801561001057600080fd5b5061051f806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063693ec85e1461003b578063e942b5161461016f575b600080fd5b6100f46004803603602081101561005157600080fd5b810190808035906020019064010000000081111561006e57600080fd5b82018360208201111561008057600080fd5b803590602001918460018302840111640100000000831117156100a257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506102c1565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610134578082015181840152602081019050610119565b50505050905090810190601f1680156101615780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102bf6004803603604081101561018557600080fd5b81019080803590602001906401000000008111156101a257600080fd5b8201836020820111156101b457600080fd5b803590602001918460018302840111640100000000831117156101d657600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561023957600080fd5b82018360208201111561024b57600080fd5b8035906020019184600183028401116401000000008311171561026d57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506103cc565b005b60606000826040518082805190602001908083835b602083106102f957805182526020820191506020810190506020830392506102d6565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390208054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103c05780601f10610395576101008083540402835291602001916103c0565b820191906000526020600020905b8154815290600101906020018083116103a357829003601f168201915b50505050509050919050565b806000836040518082805190602001908083835b6020831061040357805182526020820191506020810190506020830392506103e0565b6001836020036101000a0380198251168184511680821785525050505050509050019150509081526020016040518091039020908051906020019061044992919061044e565b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061048f57805160ff19168380011785556104bd565b828001600101855582156104bd579182015b828111156104bc5782518255916020019190600101906104a1565b5b5090506104ca91906104ce565b5090565b6104f091905b808211156104ec5760008160009055506001016104d4565b5090565b9056fea165627a7a723058203ffebc792829e0434ecc495da1b53d24399cd7fff506a4fd03589861843e14990029";

    private static final String ABIJson = "[{\"constant\":true,\"inputs\":[{\"name\":\"key\",\"type\":\"string\"}],\"name\":\"get\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"key\",\"type\":\"string\"},{\"name\":\"value\",\"type\":\"string\"}],\"name\":\"set\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]\n";

    public void deployContractWithFeeDelegation() {
        Caver caver = new Caver(Caver.DEFAULT_URL);

        SingleKeyring deployer = KeyringFactory.createFromPrivateKey("0x{private key}");
        caver.wallet.add(deployer);

        SingleKeyring feePayer = KeyringFactory.createFromPrivateKey("0x{private key}");
        caver.wallet.add(feePayer);

        try {
            Contract contract = new Contract(caver, ABIJson);
            ContractDeployParams params = new ContractDeployParams(byteCode);

            //if smart contract has constructor, it encodes constructor params.
            //This sample contract has no constructor.
            String input = ABI.encodeContractDeploy(contract.getConstructor(), params.getBytecode(),  params.getDeployParams());

            SendOptions sendOptions = new SendOptions();
            sendOptions.setFrom(deployer.getAddress());
            sendOptions.setGas(BigInteger.valueOf(40000));

            //creates a FeeDelegatedSmartContractDeploy instance.
            FeeDelegatedSmartContractDeploy feeDelegatedSmartContractDeploy = new FeeDelegatedSmartContractDeploy.Builder()
                    .setKlaytnCall(caver.rpc.klay)
                    .setFrom(sendOptions.getFrom())
                    .setInput(input)
                    .setCodeFormat(CodeFormat.EVM)
                    .setFeePayer(feePayer.getAddress())
                    .setHumanReadable(false)
                    .setGas(sendOptions.getGas())
                    .build();

            //sign transaction using deployer's key
            caver.wallet.sign(deployer.getAddress(), feeDelegatedSmartContractDeploy);

            //sign transaction using feepayer's key
            caver.wallet.signAsFeePayer(feePayer.getAddress(), feeDelegatedSmartContractDeploy);

            //send transaction.
            Bytes32 txHashData = caver.rpc.klay.sendRawTransaction(feeDelegatedSmartContractDeploy.getRLPEncoding()).send();

            //Get transaction receipt data using transaction hash data
            TransactionReceiptProcessor receiptProcessor = new PollingTransactionReceiptProcessor(caver, 1000, 20);
            TransactionReceipt.TransactionReceiptData receipt = receiptProcessor.waitForTransactionReceipt(txHashData.getResult());


        } catch (IOException | TransactionException | ClassNotFoundException | NoSuchMethodException | InvocationTargetException | InstantiationException | IllegalAccessException e) {
            //handle exception..
        }
    }
```

To show how to execute a function in a smart contract, here we send a contract execution transaction that puts a string "testValue" as the input parameter of the contract function `set` in the example code below.

```java
    private static final String ABIJson = "[{\"constant\":true,\"inputs\":[{\"name\":\"key\",\"type\":\"string\"}],\"name\":\"get\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"key\",\"type\":\"string\"},{\"name\":\"value\",\"type\":\"string\"}],\"name\":\"set\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]\n";


    public void executeContractFunction() {
        Caver caver = new Caver(Caver.DEFAULT_URL);
        SingleKeyring executor = KeyringFactory.createFromPrivateKey("0x{private key}");
        caver.wallet.add(executor);

        try {
            Contract contract = new Contract(caver, ABIJson, "0x{address in hex}");

            SendOptions sendOptions = new SendOptions();
            sendOptions.setFrom(executor.getAddress());
            sendOptions.setGas(BigInteger.valueOf(4000000));

            TransactionReceipt.TransactionReceiptData receipt = contract.send(sendOptions, "set", "test", "testValue");
        } catch (IOException | TransactionException | ClassNotFoundException | NoSuchMethodException | InvocationTargetException | InstantiationException | IllegalAccessException e) {
            //handle exception..
        }
    }
```

Executing a smart contract through fee-delegated transaction using `Contract` class in `caver.contract` package is not supported yet. To do that, `FeeDelegatedSmartContractExecution` class (or `FeeDelegatedSmartContractExecutionWithRatio` class) is used explicitly like the example below:

```java
    private static final String ABIJson = "[{\"constant\":true,\"inputs\":[{\"name\":\"key\",\"type\":\"string\"}],\"name\":\"get\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"key\",\"type\":\"string\"},{\"name\":\"value\",\"type\":\"string\"}],\"name\":\"set\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]\n";

    public void executeContractWithFeeDelegation() {
        Caver caver = new Caver(Caver.DEFAULT_URL);

        SingleKeyring executor = KeyringFactory.createFromPrivateKey("0x{private key}");
        caver.wallet.add(executor);

        SingleKeyring feePayer = KeyringFactory.createFromPrivateKey("0x{private key}");
        caver.wallet.add(feePayer);

        try {
            Contract contract = new Contract(caver, ABIJson, "0x{address in hex}");

            SendOptions sendOptions = new SendOptions();
            sendOptions.setFrom(executor.getAddress());
            sendOptions.setGas(BigInteger.valueOf(40000));

            //encode paramter of contract's "set" function.
            String encodedParams = contract.encodeABI("set", "test", "testValue");

            //creates a FeeDelegatedSmartContractExecution instance
            FeeDelegatedSmartContractExecution feeDelegatedSmartContractExecution = new FeeDelegatedSmartContractExecution.Builder()
                    .setKlaytnCall(caver.rpc.klay)
                    .setFrom(sendOptions.getFrom())
                    .setTo(contract.getContractAddress())
                    .setGas(sendOptions.getGas())
                    .setInput(encodedParams)
                    .setFeePayer(feePayer.getAddress())
                    .build();

            //sign transaction using executor's key
            caver.wallet.sign(executor.getAddress(), feeDelegatedSmartContractExecution);

            //sign transaction using fee payer's key
            caver.wallet.signAsFeePayer(feePayer.getAddress(), feeDelegatedSmartContractExecution);

            //send transaction
            Bytes32 txHashData = caver.rpc.klay.sendRawTransaction(feeDelegatedSmartContractExecution.getRLPEncoding()).send();

            //get transaction receipt
            TransactionReceiptProcessor receiptProcessor = new PollingTransactionReceiptProcessor(caver, 1000, 20);
            TransactionReceipt.TransactionReceiptData receipt = receiptProcessor.waitForTransactionReceipt(txHashData.getResult());

        } catch (Exception e) {
            //handle exception..
        }
    }
```

To load a `contract` instance and call one of its functions (not sending a transaction but just a call): the below example shows calling a `get` function in a contract.

```java
    private static final String ABIJson = "[{\"constant\":true,\"inputs\":[{\"name\":\"key\",\"type\":\"string\"}],\"name\":\"get\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"key\",\"type\":\"string\"},{\"name\":\"value\",\"type\":\"string\"}],\"name\":\"set\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]\n";


    public void callContractFunction() {
        Caver caver = new Caver(Caver.DEFAULT_URL);

        try {
            Contract contract = new Contract(caver, ABIJson, '0x{address in hex}');
            List<Type> result = contract.call("get", "test");
            System.out.println((String)result.get(0).getValue());
        } catch (IOException | TransactionException | ClassNotFoundException | NoSuchMethodException | InvocationTargetException | InstantiationException | IllegalAccessException e) {
            //handle exception..
        }
    }
```

위 코드가 실행되면, 아래와 같은 값을 얻습니다.

```bash
testValue
```

To find more information, see [caver-java API](https://javadoc.io/doc/com.klaytn.caver/core/)


## IPFS <a id="ipfs"></a>

IPFS (InterPlanetary File System) is a distributed file system for storing and accessing files, websites, application, and data.

You can upload and download a file through IPFS with Caver.


### Connecting with IPFS <a id="connecting-with-ipfs"></a>

The `IPFS` class in the `caver.ipfs` package is defined as a class member variable in `Caver`, so you can interact with IPFS through `Caver`.

In order to use an `IPFS` instance through the `Caver` instance, you must call method `setIPFSNode()` first to connect to an IPFS node.

The function `setIPFSNode()` requires following parameters:
  - IPFS HTTP API Host URL
  - IPFS HTTP API Host port number
  - Whether the host use SSL or not.

```java
String host = "The URL of an IPFS node";
int port = 5001; // API host port number
boolean isSSL = true; // API host support ssl 
Caver caver = new Caver();
caver.ipfs.setIPFSNode(host, port, isSSL);
```

### Uploading a file through IPFS<a id="uploading-a-file-through-ipfs"></a>

To upload a file through `IPFS`, please use `add()` like below.

This function returns [CID(Content Identifier)](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids) of the uploaded file.


```java
String filePath = "/path/to/file";
String cid = caver.ipfs.add(filePath);
System.out.println(cid);
```

The execution result of the above code is shown below.

```java
QmYzW1fXbapdxkZXMQeCYoDCjVc18H8tLfMfrxXRySmQiq
```

Likewise, you can upload a byte array.

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

### Downloading a file from IPFS<a id="downloading-a-file-from-ipfs"></a>

To download a file from `IPFS`, please use `get()` like below.

This function requires CID of the file to be downloaded.

```java
String cid = "QmYzW1fXbapdxkZXMQeCYoDCjVc18H8tLfMfrxXRySmQiq";
byte[] content = caver.ipfs.get(cid);
```


### Conversion between CID and multihash <a id="conversion-between-cid-and-multihash"></a>

You can convert a CID to a [Multihash](https://multiformats.io/multihash/) using `toHex()`.

A CID is a Base58 encoded value of a multihash. `toHex()` decodes the CID and returns the corresponding multihash.

```java
String cid = "QmYtUc4iTCbbfVSDNKvtQqrfyezPPnFvE33wFmutw9PBBk";
String multihash = IPFS.toHex(cid);
System.out.println(multihash);
```

The execution result of the above code is shown below.

```java
0x12209cbc07c3f991725836a3aa2a581ca2029198aa420b9d99bc0e131d9f3e2cbe47
```

To convert a multihash to CID, please use `fromHex()`.

```java
String multihash = "0x12209cbc07c3f991725836a3aa2a581ca2029198aa420b9d99bc0e131d9f3e2cbe47";
String cid = IPFS.fromHex(multihash);
System.out.println(cid);
```

The execution result of the above code is shown below.

```java
QmYtUc4iTCbbfVSDNKvtQqrfyezPPnFvE33wFmutw9PBBk
```

## Detect KCT interface<a id="detect kct interface"></a>

KCT (Klaytn Compatible Token) contracts such as [KIP-7](https://kips.klaytn.com/KIPs/kip-7), [KIP-17](https://kips.klaytn.com/KIPs/kip-17), and [KIP-37](https://kips.klaytn.com/KIPs/kip-37) define and provide various interfaces, and [KIP-13](https://kips.klaytn.com/KIPs/kip-13) allows you to see whether a contract complies with KCT specifications and which interface it implements, by sending a query to the contract.

[KIP-13](https://kips.klaytn.com/KIPs/kip-13) was implemented in Caver v1.5.7. It could detect interface through `detectInterface()` for any of the KCT contract classes (`KIP7`, `KIP17`, and `KIP37`).

### Detecting KIP-7 Interfaces <a id="detecting-kip-7-interfaces"></a>

To detect KIP-7 interfaces, you can use `detectInterface()` in the `KIP7` class. It returns the mapping between KIP-7 interface identifier and a boolean that the interface is supported or not.

`detectInterface()` supports both static and instance methods, so you can select and use the method that suits your needs.

The interface detected through `detectInterface()` for `KIP7` is shown in the table below.

| Interface     | KIP-13 Identifier |
| ------------- | ----------------- |
| IKIP7         | 0x65787371        |
| IKIP7Metadata | 0xa219a025        |
| IKIP7Mintable | 0xeab83e20        |
| IKIP7Burnable | 0x3b5a0bf8        |
| IKIP7Pausable | 0x4d5507ff        |

```java
Caver caver = new Caver(Caver.DEFAULT_URL);
ObjectMapper mapper = new ObjectMapper();
String contractAddress = "0x{address}";

//using static method.
Map<String, Boolean> resultStatic = KIP7.detectInterface(caver, contractAddress);
String resultJson = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(resultStatic);
System.out.println(resultJson);

//using instance method.
KIP7 kip7 = new KIP7(caver, contractAddress)
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


### Detecting KIP-17 Interfaces <a id="detecting-kip-17-interfaces"></a>

To detect the interface implemented in a KIP-17 token contract, you can use `detectInterface()` in the `KIP17` class. It returns the mapping between KIP-17 interface identifier and interface support.

`detectInterface()` supports both static and instance methods, so you can select and use the method that suits your needs.

The interface detect through `detectInterface()` for `KIP17` is shown in the table below.

| Interface              | KIP-13 Identifier |
| ---------------------- | ----------------- |
| IKIP17                 | 0x80ac58cd        |
| IKIP17Metadata         | 0x5b5e139f        |
| IKIP17Enumerable       | 0x780e9d63        |
| IKIP17Mintable         | 0xeab83e20        |
| IKIP17MetadataMintable | 0xfac27f46        |
| IKIP17Burnable         | 0x42966c68        |
| IKIP17Pausable         | 0x4d5507ff        |

```java

Caver caver = new Caver(Caver.DEFAULT_URL);
ObjectMapper mapper = new ObjectMapper();
String contractAddress = "0x{address}";

//using static method.
Map<String, Boolean> resultStatic = KIP17.detectInterface(caver, contractAddress);
String resultJson = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(resultStatic);
System.out.println(resultJson);

//using instance method.
KIP17 kip17 = new KIP17(caver, contractAddress)
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

### Detecting KIP-37 interfaces <a id="detecting-kip-37-interfaces"></a>

To detect the interface implemented in a KIP-37 token contract, you can use `detectInterface()` in the `KIP37` class. It returns the mapping between KIP-37 interface identifier and interface support.

`detectInterface()` supports both static and instance methods, so you can select and use the appropriate method.

The interface detection through `detectInterface()` for `KIP37` is shown in the table below.

| Interface      | KIP-13 Identifier |
| -------------- | ----------------- |
| IKIP37         | 0x6433ca1f        |
| IKIP37Metadata | 0x0e89341c        |
| IKIP37Mintable | 0xdfd9d9ec        |
| IKIP37Burnable | 0x9e094e9e        |
| IKIP37Pausable | 0x0e8ffdb7        |


```java

Caver caver = new Caver(Caver.DEFAULT_URL);
ObjectMapper mapper = new ObjectMapper();
String contractAddress = "0x{address}";

//using static method.
Map<String, Boolean> resultStatic = KIP37.detectInterface(caver, contractAddress);
String resultJson = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(resultStatic);
System.out.println(resultJson);

//using instance method.
KIP37 kip37 = new KIP37(caver, contractAddress)
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
