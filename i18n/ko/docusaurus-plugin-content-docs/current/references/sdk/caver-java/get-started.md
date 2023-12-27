# 시작하기

## 새로운 기능

caver-java 1.5.0에서는 Common Architecture를 채택했습니다. 커먼 아키텍처는 클레이튼 개발 환경을 위한 새로운 소프트웨어 아키텍처로, 모든 클레이튼 SDK(caver-js/caver-java)에서 공유할 수 있습니다. 간소화된 개발 환경과 다른 프로그래밍 언어로의 손쉬운 확장을 위해 설계되었습니다.

caver-java가 1.5.0으로 업데이트됨에 따라 1.4.0에서 사용되던 API는 일부 API를 제외하고 더 이상 사용되지 않습니다.

caver-java 1.5.0에서 새롭게 제공되는 API는 다음과 같습니다.

### caver.account

caver.account는 클레이튼 계정에 대해 하나 이상의 공개키(AccountKeyPublic, AccountKeyWeightedMultiSig, AccountKeyRoleBased) 또는 특수한 유형의 키(AccountKeyLegacy, AccountKeyFail)일 수 있는 계정키를 업데이트하는 데 사용되는 패키지입니다.


- caver-java 1.4.0에서 `caver.account`가 `caver.tx.account`를 대체합니다.

### caver.wallet

caver.wallet은 인메모리 지갑에서 Keyring 인스턴스를 관리하는 패키지입니다. Keyring은 클레이튼 계정의 주소와 개인키를 저장하는 인스턴스로, 이 계정의 주소가 트랜잭션에 서명할 때 사용됩니다. caver.wallet은 모든 유형의 Keyring(SingleKeyring, MultipleKeyring, RoleBasedKeyring)을 허용하고 클레이튼 계정 주소로 Keyring을 관리합니다.

- `caver.wallet`은 caver-java 1.4.0의 `caver.crypto`를 대체합니다.
- `caver.wallet.KeyStore`은 caver-java 1.4.0의 `caver.wallet.WalletFile`을 대체합니다.

### caver.transaction

caver.transaction은 [Transaction](../../../learn/transactions/transactions.md#transactions-overview)과 관련된 기능을 제공하는 패키지입니다.

- caver-java 1.4.0에서 `caver.transaction`은 `caver.tx`를 대체합니다.

### caver.rpc

caver.rpc는 클레이튼 노드에서 rpc 호출과 관련된 기능을 제공하는 패키지입니다.

- caver-java 1.4.0에서 `caver.rpc.klay`와 `caver.rpc.net`은 각각 `Klay`, `Net` 인터페이스를 대체합니다.

### caver.util

caver.utils는 유틸리티 함수를 제공합니다.

### caver.contract

`caver.contract`는 클레이튼에서 스마트 컨트랙트를 쉽게 다룰 수 있도록 도와주는 패키지입니다. caver.contract를 사용하면 스마트 컨트랙트를 배포하고 함수를 호출하여 실행할 수 있습니다. `caver.contract`는 먼저 스마트 컨트랙트 함수와 이벤트를 ABI(Application Binary Interface)에서 변환하고, 해당 함수를 호출하여 이벤트 정보를 가져옵니다.

## 전제 조건 <a id="prerequisites"></a>

### 리포지토리 추가하기<a id="adding-a-repository"></a>
IPFS를 사용하기 전에 라이브러리 리포지토리를 추가해야 합니다. 먼저 다음 리포지토리를 추가하세요.

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

### 종속성 추가하기 <a id="adding-a-dependency"></a>

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

Android 종속성을 사용하려면 버전 문자열 끝에 -android를 추가하면 됩니다. \(예: 1.0.1-android)

JSON-RPC 요청 및 응답에 대한 자세한 내용을 보려면 프로젝트에 [LOGBack](https://logback.qos.ch/) 의존성을 포함하세요. 아래는 Gradle 빌드 파일 예시입니다. Maven에도 해당 종속성을 추가할 수 있습니다. caver-java는 [SLF4J](http://www.slf4j.org/) 로깅 파사드를 사용하므로, LOGBack 대신 원하는 로깅 프레임워크로 전환할 수 있습니다.

```groovy
implementation "ch.qos.logback:logback-classic:1.2.3"
```

**참고**: 중앙 리포지토리에는 RC, Android, Java 버전이 함께 나열되어 있습니다. 와일드카드를 사용하여 버전을 가져오는 경우 플랫폼에 적합하지 않은 버전을 사용하고 있을 수 있습니다.

#### 명령줄 도구 <a id="command-line-tool"></a>

명령줄 도구를 사용하면 명령줄에서 Solidity 스마트 컨트랙트 함수 래퍼를 생성할 수 있습니다.

**설치 \(Homebrew\)**

설치하려면 Java 1.8 이상이 필요합니다.

```text
$ brew tap klaytn/klaytn
$ brew install caver-java
```

설치 후 아래와 같이 'caver-java' 명령을 실행할 수 있습니다:

```text
$ caver-java solidity generate -b <smart-contract>.bin -a <smart-contract>.abi -o <outputPath> -p <packagePath>
```

**설치 (기타)**

현재 다른 패키지 관리자는 지원하지 않습니다. 다른 해결책으로 아래에서 CLI를 빌드하는 방법을 제공합니다.

* caver-java를 다운로드하거나 포크합니다.
* Gradle을 사용하여 콘솔 모듈에서 'shadowDistZip' 작업을 수행합니다. 그 결과 `console/build/distributions/console-shadow-{version}.zip`이 생성됩니다.

  ```text
  $ ./gradlew :console:shadowDistZip
  ```

* 빌드 디렉터리에 있는 zip 파일의 압축을 풉니다.

  ```text
  $ unzip ./console/build/distributions/console-shadow-{version}.zip
  ```

* 바이너리 파일을 실행하면 아래와 같이 명령줄 도구가 실행됩니다. macOS 사용자를 위한 셸 스크립트 파일과 Window 사용자를 위한 배치 파일을 찾을 수 있습니다.

  ```text
  $ ./console/build/distributions/console-shadow-{version}/bin/caver-java
  ```


## KLAY 보내기 한 눈에 보기

여기서는 `keystore file`을 이용해 밸류 전송 트랜잭션과 함께 KLAY를 보내는 간단한 예시를 설명합니다. 키스토어 파일은 [Klaytn Wallet](../../../build/tools/wallets/klaytn-wallet.md#how-to-receive-baobab-testnet-klay)에서 생성할 수 있습니다. 테스트용으로 KLAY가 필요한 경우, [Klaytn Wallet](../../../build/tools/wallets/klaytn-wallet.md#how-to-receive-baobab-testnet-klay)에서 Baobab 테스트넷 KLAY를 받을 수 있습니다.

```java
public void sendingKLAY() throws IOException, CipherException, TransactionException {
        Caver caver = new Caver(Caver.BAOBAB_URL);

        //Read keystore json file.
        File file = new File("./keystore.json");

        //Decrypt keystore.
        ObjectMapper objectMapper = ObjectMapperFactory.getObjectMapper();
        KeyStore keyStore = objectMapper.readValue(file, KeyStore.class);
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


## caver-java로 시작하기 <a id="starting-with-caver-java"></a>

### 클레이튼 노드에 연결하기 <a id="connecting-to-a-klaytn-node"></a>

EN을 실행 중인 경우 아래와 같이 호스트와 포트를 변경하여 자체 노드에 연결할 수 있습니다:

```java
Caver caver = new Caver("http://your.en.url:8551/");
```


## Keyring 관리하기 <a id="managing-keyrings"></a>

`Keyring`은 클레이튼 계정의 주소와 개인키를 담고 있는 구조입니다.

`Keyring`은 저장하는 키의 종류에 따라 하나의 주소와 하나의 개인키를 저장하는 `SingleKeyring`, 하나의 주소와 다수의 개인키를 저장하는 `MultiKeyring`, 각 역할별로 하나의 주소와 하나 이상의 개인키를 저장하는 `RoleBasedKeyring` 등 세 가지 유형으로 분류할 수 있습니다.

`SingleKeyring`은 내부에 `key` 속성을 정의하며, 이 `key`는 하나의 개인키를 저장합니다.

`MultipleKeyring`은 내부에 `key` 프로퍼티를 정의하고, 이 `key`는 여러 개인키를 저장하기 위해 배열로 구현됩니다.

`RoleBasedKeyring`에 정의된 `key` 속성은 3개의 개인 키 배열을 요소로 갖는 목록 객체로 구현되며(빈 `key`는 `[ [], [], [] ]`처럼 보입니다), 각 `role`에 대해 여러 키를 포함할 수 있도록 구현됩니다. 배열의 첫 번째 요소는 `roleTransactionKey`에 사용할 개인 키로, 두 번째 요소는 `roleAccountUpdateKey`에 사용할 개인 키로, 세 번째 요소는 `roleFeePayerKey`에 사용할 개인 키로 채워집니다.

### Keyring 만들기 <a id="creating-a-keyring"></a>

#### SingleKeyring 생성하기 <a id="generating-a-singlekeyring"></a>

아래와 같이 하나의 열쇠고리를 무작위로 생성할 수 있습니다.

```java
SingleKeyring keyring = caver.wallet.keyring.generate();
```

#### 개인 키로 SingleKeyring 만들기 <a id="creating-a-singlekeyring-from-private-key"></a>

또한 특정 개인키를 소유하고 있는 경우 이를 사용하여 아래와 같이 Keyring을 만들 수 있습니다.

```java
String privateKey = "0x{private key in hex}";
SingleKeyring keyring = caver.wallet.keyring.createFromPrivateKey(privateKey);
```

#### 개인키와 주소로 SingleKeyring 만들기 <a id="creating-a-singlekeyring-with-a-private-key-and-an-address"></a>

클레이튼 계정의 개인키가 주소와 분리되어 있는 경우, 아래와 같이 주어진 주소와 개인키를 사용하여 Keyring을 만들 수 있습니다.

```java
String address = "0x{address in hex}";
String privateKey = "0x{private key in hex}";
SingleKeyring keyring = caver.wallet.keyring.createWithSingleKey(address, privateKey);
```

또한 클레이튼 지갑 키에서 SingleKeyring 인스턴스를 파생할 수 있습니다.

```java
String klaytnWalletKey = "0x{private key}0x{type}0x{address in hex}";
SingleKeyring keyring = caver.wallet.keyring.createFromKlaytnWalletKey(klaytnWalletKey);
```

#### 여러 개의 개인 키가 있는 MultipleKeyring 만들기 <a id="creating-a-multiplekeyring-with-multiple-private-keys"></a>

여러 개의 개인키를 사용하려면 주소와 여러 개의 개인키를 사용하여 `MultipleKeyring`을 생성하면 됩니다. 아래 예시는 여러 개의 개인키를 사용하여 `MultipleKeyring`을 생성하는 방법을 보여줍니다.

```java
String address = "0x{address in hex}";
String[] privateKeyArray = new String[] {"0x{private key#1}", "0x{private key#2}", "0x{private key#3}"};
MultipleKeyring multipleKeyring = caver.wallet.keyring.createWithMultipleKey(address, privateKeyArray);
```

#### 개인 키를 사용하여 RoleBasedKeyring 만들기 <a id="creating-a-rolebasedkeyring-with-role-based-private-keys"></a>

각 `role`에 대해 서로 다른 개인키를 사용하려면 `caver.wallet.keyring.createWithRoleBasedKey`가 사용됩니다. 각 배열 요소는 `RoleBasedKeyring`에 설명된 역할을 나타냅니다. 아래 예시는 각 역할에 대해 서로 다른 키로 `RoleBasedKeyring` 인스턴스를 생성하는 방법을 보여줍니다.


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

### 키스토어 JSON string에서 caver-java에 Keyring 추가하기.<a id="adding-keyrings-to-caver-java"></a>

caver-java에서 제공하는 인메모리 지갑에 Keyring을 추가하면 더 쉽게 사용할 수 있습니다. 아래 예시는 [클레이튼 지갑](https://wallet.klaytn.com/)에서 생성한 키스토어 JSON 파일 문자열을 사용하여 `caver.wallet`에 Keyring을 추가하는 방법을 설명합니다.

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
key : 0x93c90135ae69669e416ba5997d9274f8c8bd60748761fc421e415602d68a13a5
```

위의 출력을 보면, `caver.wallet`에 Keyring을 추가한 후 `caver.wallet`에서 Keyring을 조회할 수 있습니다.

사용할 주소와 개인키가 있는 경우, caver.wallet.newKeyring을 통해 쉽게 Keyring을 생성하고 caver.wallet에 바로 추가할 수 있습니다.

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

`caver.wallet.newKeyring`을 개인키와 함께 실행하면 하나의 개인키를 가진 Keyring 인스턴스가 생성되어 `caver.wallet`에 추가됩니다. 개인키가 여러 개인인 경우, 개인키가 여러 개인인 Keyring 인스턴스가 생성되어 `caver.wallet`에 추가됩니다. 역할별로 하나 이상의 개인키가 포함된 2D 문자열 배열을 요소로 전달하면 역할별로 다른 개인키가 포함된 Keyring 인스턴스가 생성되어 `caver.wallet`에 추가됩니다.


`caver.wallet.add` 또는 `caver.wallet.newKeyring`은 `caver.wallet`에 추가한 후 Keyring 인스턴스를 반환합니다.

## 트랜잭션 보내기 <a id="sending-a-transaction"></a>

이 섹션에서는 Baobab 네트워크에서 caver-java를 사용하여 KLAY를 전송하는 방법을 보여드리겠습니다.

### Baobab Faucet를 통해 KLAY받기 <a id="getting-klay-via-baobab-faucet"></a>

테스트를 위해 KLAY가 필요한 경우, [Klaytn 지갑](../../../build/tools/wallets/klaytn-wallet.md#how-to-receive-baobab-testnet-klay)에서 Baobab 테스트넷 KLAY를 받을 수 있습니다. 개인키 또는 키스토어 파일을 사용하여 클레이튼 지갑에 로그인하고 테스트용 Faucet를 통해 Baobab 테스트넷 KLAY를 받습니다.

### 밸류 전송 트랜잭션 보내기 <a id="sending-a-value-transfer-transaction"></a>

caver-java 지갑을 사용하여 트랜잭션의 서명을 생성할 수 있습니다. 트랜잭션을 네트워크에 전송하려면 아래의 두 단계를 거쳐야 합니다.

1. 트랜잭션 서명하기
	- 사용하고자 하는 Keyring이 `caver.wallet`에 추가되어 있다면 `caver.wallet.sign` 함수를 사용하여 서명할 수 있습니다.
	- `caver.wallet`에 추가하지 않고 Keyring을 별도로 관리하고 있다면 `transaction.sign` 함수를 통해 트랜잭션에 서명할 수 있습니다.
2. 서명된 트랜잭션의 RLP 인코딩된 문자열을 `caver.rpc.klay.sendRawTransaction`을 통해 클레이튼에 전송합니다.

**참고: **송금자는 송금할 KLAY와 트랜잭션 수수료를 지불할 수 있을 만큼 충분한 KLAY를 보유하고 있어야 합니다.

#### 트랜잭션 체결

트랜잭션을 클레이튼에 보내기 전에 먼저 트랜잭션에 서명해야 합니다.

아래는 `caver.wallet`에 Keyring이 추가된 경우 트랜잭션에 서명하는 방법의 예시입니다.

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

위 코드는 `caver.wallet`에 Keyring을 추가하고 트랜잭션을 생성한 후 `caver.wallet.sign`을 통해 트랜잭션에 서명합니다.

위 코드를 실행하면 다음과 같은 결과를 얻을 수 있습니다. 위 코드가 실행되면 트랜잭션의 RLP 인코딩된 문자열이 아래와 같이 출력됩니다. (실제로 받은 RLP 인코딩된 문자열 출력은 아래 표시된 문자열 출력과 다를 수 있습니다).

```bash
RLP-encoded string: 0x08f87e808505d21dba0082753094176ff0344de49c04be577a3512b6991507647f720194ade4883d092e2a972d70637ca7de9ab5166894a2f847f845824e44a0e1ec99789157e5cb6bc691935c204a23aaa3dc049efafca106992a5d5db2d179a0511c421d5e508fdb335b6048ca7aa84560a53a5881d531644ff178b6aa4c0a41
```

#### 서명된 트랜잭션의 RLP 인코딩된 문자열을 Klaytn으로 보냅니다.

이제 아래와 같이 서명된 트랜잭션을 네트워크에 전송할 수 있습니다. 아래 예제를 실행하려면 위 코드에서 "rlpEncoding"을 `rlpEncoded` 값으로 바꾸세요.

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

`caver.wallet` 없이 트랜잭션에 서명하고 네트워크에 전송하려면 아래 예시를 참조하세요.

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

위 코드가 실행되면 아래 예시와 같이 트랜잭션 해시(txHash)가 출력됩니다.

```bash
Transaction Hash : 0x43e8ab1a2365ad598448b4402c1cfce6a71b3a103fce3a69905613e50b978113
```

### 영수증 확인 <a id="checking-receipts"></a>

`TransactionReceiptProcessor`를 사용하면 `caver.rpc.klay.sendRawTransaction`으로 클레이튼에 트랜잭션을 전송할 때 트랜잭션의 영수증을 받을 수 있습니다.

다음 예는 PollingTransactionReceiptProcessor를 사용하여 영수증을 가져오는 방법을 보여줍니다.

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

위의 예시에서 설명한 것처럼 TransactionReceiptProcessor를 통해 트랜잭션을 전송한 결과를 얻을 수 있습니다. `transactionHash` 필드는 영수증 객체 내부에 정의되어 있습니다.

트랜잭션이 블록에 포함된 후 네트워크에서 언제든지 트랜잭션 영수증을 조회하기 위해 `txHash` 문자열과 함께 `caver.rpc.klay.getTransactionReceipt` RPC 호출을 사용할 수 있습니다. 아래 예시는 `caver.rpc.klay.getTransactionReceipt` RPC 호출을 사용하여 영수증을 가져오는 방법을 보여줍니다.

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

트랜잭션의 결과는 영수증의 `status`를 통해 확인할 수 있습니다. 반환 값에 대한 자세한 내용은 `caver.rpc.klay.getTransactionReceipt`을 참조하세요. 트랜잭션이 실패한 경우, 영수증의 `txError`에서 오류에 대한 자세한 내용을 확인할 수 있습니다. txError`에 대한 자세한 내용은 [txError: 트랜잭션 실패 상세 정보](../../transaction-error-codes.md)를 참고하세요.


## 다른 트랜잭션 유형 실행하기 <a id="executing-other-transaction-types"></a>

클레이튼은 확장성과 성능을 위해 다양한 트랜잭션 유형을 제공합니다. 자세한 내용은 [Transaction](../../../learn/transactions/transactions.md)을 참고하세요. 이 섹션에서는 caver-java와 함께 사용할 수 있는 몇 가지 예제를 설명합니다.

### 수수료 위임 <a id="fee-delegation"></a>

클레이튼은 수수료 위임 기능을 제공합니다. 다음은 여러분이 트랜잭션의 발신자일 때 RLP로 인코딩된 트랜잭션을 만드는 예시입니다:

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

위 코드를 실행하면 RLP로 인코딩된 문자열이 출력됩니다. (출력되는 RLP 인코딩된 문자열은 아래 표시된 문자열 출력과 다를 수 있습니다).

```bash
0x09f884028505d21dba0082c35094176ff0344de49c04be577a3512b6991507647f720594f5a9079f311f9ec55170af351627aff0c5d2e287f847f845824e43a0f4b53dbd4c915cb73b9c7fa17e22106ee9640155a06ab4a7ed8661f846d2a5cca035b5bba6a26d4ccd20c65e8f31cce265c193f1c874806f9fae6b0ee9df0addf080c4c3018080
```

수수료 납부자는 트랜잭션 발신자가 서명한 RLP 인코딩된 문자열(`rawTransaction`)에 `feePayerSignatures`를 첨부한 후 트랜잭션을 Klaytn에 전송할 수 있습니다. `caver.wallet`에 수수료 납부자의 Keyring이 있는 경우, `caver.wallet.signAsFeePayer(feePayer.address, feeDelegatedTx)`를 호출하여 수수료 납부자의 서명을 `feeDelegatedTx`에 주입할 수 있습니다. 그렇지 않으면, 수수료 납부자는 아래 그림과 같이 발신자가 서명한 RLP 인코딩 문자열에서 `feeDelegatedTx`를 생성하고 여기에 수수료 납부자의 서명을 추가해야 합니다. 아래 예제를 실행하려면 위의 `0x{RLP 인코딩된 문자열}`을 `rlpEncoded` 값으로 바꾸면 됩니다.

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

위 코드를 실행하면 발신자의 서명과 수수료 납부자의 서명이 포함된 RLP 인코딩된 문자열이 아래와 같이 출력됩니다. (실제 출력되는 문자열은 아래 표시된 문자열 출력과 다를 수 있습니다.)

```bash
0x09f8dc028505d21dba0082c35094176ff0344de49c04be577a3512b6991507647f720594f5a9079f311f9ec55170af351627aff0c5d2e287f847f845824e43a0f4b53dbd4c915cb73b9c7fa17e22106ee9640155a06ab4a7ed8661f846d2a5cca035b5bba6a26d4ccd20c65e8f31cce265c193f1c874806f9fae6b0ee9df0addf09417e7531b40ad5d7b5fa7b4ec78df64ce1cb36d24f847f845824e44a0921b7c3be69db96ce14134b306c2ada423613cb66ecc6697ee8067983c268b6ea07b86b255d1c781781315d85d7904226fb2101eb9498c4a03f3fbd30ba3ec5b79
```

이제 트랜잭션에 발신자와 수수료 납부자가 모두 서명했으며 네트워크를 통해 전송할 수 있습니다. 위 예제 코드의 `0x{RLP 인코딩된 문자열}`을 RLP 인코딩된 문자열 출력으로 바꿉니다.

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

트랜잭션의 결과는 영수증의 `status`를 통해 확인할 수 있습니다. 반환 값에 대한 자세한 내용은 `caver.rpc.klay.getTransactionReceipt`을 참조하세요. 트랜잭션이 실패한 경우, 영수증의 `txError`에서 오류에 대한 자세한 내용을 확인할 수 있습니다. txError`에 대한 자세한 내용은 [txError: 트랜잭션 실패 상세 정보](../../transaction-error-codes.md)를 참고하세요.

### 계정 업데이트 <a id="account-update"></a>

클레이튼 계정의 개인키를 변경하려면 3가지 중요한 사항을 기억해야 합니다:

1. 클레이튼은 여러분이 보내는 모든 트랜잭션의 유효성을 검사합니다.
2. 유효성 검사에는 여러분의 개인키와 정확히 일치하는 공개키가 필요합니다.
3. 따라서 개인키를 새 키로 변경하려면 기존 공개키를 새 키로 변경하는 것이 **항상** **전제되어야 합니다. 새 공개 키는 새 개인 키에서 파생되어야 합니다.

위의 세 가지 사항을 염두에 두고 아래 단계에 따라 개인키를 변경할 수 있습니다:

1. 새 Keyring을 만들 새 개인키를 준비합니다.
2. 필요한 유형(SingleKeyring, MultipleKeyring 또는 RoleBasedKeyring)에 따라 Keyring을 만듭니다.
3. 새 Keyring에서 계정 인스턴스를 생성합니다. 이 계정 인스턴스는 클레이튼 계정의 새 공개키를 보관합니다.
4. 계정 인스턴스를 포함한 계정 업데이트 트랜잭션을 클레이튼에 전송합니다.
5. 마지막으로 기존 Keyring을 2단계에서 생성한 새 Keyring으로 교체합니다.

자세한 내용은 `계정 업데이트`에서 확인하세요.

AccountKey를 변경하려면 `caver.transaction.type.AccountUpdate`의 입력 인자 객체에서 `account` 필드에 `Account` 인스턴스를 제공해야 합니다. `Account` 인스턴스에는 업데이트할 클레이튼 계정의 주소와 계정키가 포함되어 있습니다.

아래 코드는 클레이튼 계정에 사용하는 개인키를 변경하는 예시 코드로, 클레이튼 계정의 AccountKey를 `AccountKeyPublic`으로 변경하는 코드입니다. 새로운 개인키를 준비하는 것을 잊지 마세요.

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

위 코드가 성공적으로 실행되면 더 이상 이전 Keyring으로 트랜잭션에 서명할 때 이전 개인키를 사용할 수 없습니다. 따라서 `caver.wallet.updateKeyring(newKeyring)`을 통해 기존 Keyring을 `newKeyring`으로 업데이트해야 합니다. 업데이트가 완료되면 새로 업데이트된 개인 키로 서명이 수행됩니다.

클레이튼 계정의 AccountKey를 여러 개의 `AccountKey`로 업데이트하는 방법은 어떻게 하나요? 아래 예시는 사용하고자 하는 프라이빗 키가 여러 개 있는 `Account` 인스턴스를 생성하는 방법을 설명합니다(`caver.account.create`를 통해 여러 개의 퍼블릭 키가 있는 `Account` 인스턴스를 생성할 수 있습니다). 생성한 계정 인스턴스를 트랜잭션 오브젝트 내부의 `account` 필드에 입력한 후 나머지 업데이트 과정은 위 예시와 동일합니다.

먼저, `AccountKeyWeightedMultiSig`로 업데이트할 계정 인스턴스를 생성해 보겠습니다. `AccountKeyWeightedMultiSig`의 경우 각 키에 대한 임계값과 가중치를 정의해야 합니다. 이를 위해 `caver.account.weightedMultiSigOptions`을 사용합니다. 첫 번째 매개변수는 임계값이고 두 번째 매개변수는 각 키에 대한 가중치를 포함하는 배열입니다.

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

이제 `AccountKeyRoleBased`를 사용하여 AccountKey를 업데이트해 보겠습니다. `AccountKeyRoleBased`는 각 `role`에 사용할 키를 정의하는 `AccountKey` 유형입니다.

```java
// Create an account instance with roles using AccountKeyRoleBased. In the account instance created, each role has a public key that corresponds to one private key.
List<String[]> newPrivateKeyArr = caver.wallet.keyring.generateRolBasedKeys(new int[] {1,1,1});
RoleBasedKeyring newKeyring = caver.wallet.keyring.createWithRoleBasedKey(senderKeyring.getAddress(), newPrivateKeyArr);

const account = newKeyring.toAccount()
```

위의 AccountKeyRoleBased는 각 역할에 대해 하나의 공개 키를 사용하는 예시입니다. 위 코드에서 볼 수 있듯이 각 공개 키는 하나의 개인 키에 해당합니다. 각 역할에 여러 개의 개인키를 사용하려면 아래와 같이 각 역할에 대해 `caver.account.weightedMultiSigOptions`을 정의해야 합니다.

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

AccountKey를 `AccountKeyLegacy` 또는 `accountKeyFail`로 업데이트하려면 아래와 같이 Account 인스턴스를 생성하고 트랜잭션의 `account` 필드에 할당합니다. 나머지 업데이트 과정은 다른 계정 키와 동일합니다.

```java
// Create an account with AccountKeyLegacy
Account account = caver.account.createWithAccountKeyLegacy(keyringToUpdate.address);

// Create an account with AccountKeyFail
Account account = caver.account.createWithAccountKeyFail(keyringToUpdate.address)
```

### 스마트 컨트랙트 <a id="smart-contract"></a>

`caver.contract` 패키지의 `Contract` 클래스를 사용하면 Klaytn에서 스마트 컨트랙트와 쉽게 상호작용할 수 있습니다. 스마트 컨트랙트의 모든 함수는 로우레벨 ABI가 주어지면 `contract` 인스턴스 안에 자동으로 변환되어 저장됩니다. 이를 통해 Java에서 `contract` 인스턴스를 다루는 것처럼 스마트 컨트랙트와 상호작용할 수 있습니다.


아래에 간단한 Solidity 예제 코드를 작성하는 것으로 Java에서 스마트 컨트랙트를 다루는 방법에 대한 설명을 시작하겠습니다. 'test.sol' 파일을 생성하고 아래 예제를 작성합니다.


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

그런 다음 이 스마트 컨트랙트를 컴파일하여 바이트코드와 ABI를 얻습니다.

```text
> solc --abi --bin ./test.sol
======= ./test.sol:KVstore =======
Binary: 
608060405234801561001057600080fd5b5061051f806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063693ec85e1461003b578063e942b5161461016f575b600080fd5b6100f46004803603602081101561005157600080fd5b810190808035906020019064010000000081111561006e57600080fd5b82018360208201111561008057600080fd5b803590602001918460018302840111640100000000831117156100a257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506102c1565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610134578082015181840152602081019050610119565b50505050905090810190601f1680156101615780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102bf6004803603604081101561018557600080fd5b81019080803590602001906401000000008111156101a257600080fd5b8201836020820111156101b457600080fd5b803590602001918460018302840111640100000000831117156101d657600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561023957600080fd5b82018360208201111561024b57600080fd5b8035906020019184600183028401116401000000008311171561026d57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506103cc565b005b60606000826040518082805190602001908083835b602083106102f957805182526020820191506020810190506020830392506102d6565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390208054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103c05780601f10610395576101008083540402835291602001916103c0565b820191906000526020600020905b8154815290600101906020018083116103a357829003601f168201915b50505050509050919050565b806000836040518082805190602001908083835b6020831061040357805182526020820191506020810190506020830392506103e0565b6001836020036101000a0380198251168184511680821785525050505050509050019150509081526020016040518091039020908051906020019061044992919061044e565b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061048f57805160ff19168380011785556104bd565b828001600101855582156104bd579182015b828111156104bc5782518255916020019190600101906104a1565b5b5090506104ca91906104ce565b5090565b6104f091905b808211156104ec5760008160009055506001016104d4565b5090565b9056fea165627a7a723058203ffebc792829e0434ecc495da1b53d24399cd7fff506a4fd03589861843e14990029
Contract JSON ABI 
[{"constant":true,"inputs":[{"name":"key","type":"string"}],"name":"get","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"key","type":"string"},{"name":"value","type":"string"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
```

**참고**: 스마트 컨트랙트를 컴파일하기 위해서는 [Solidity 컴파일러](https://solidity.readthedocs.io/en/develop/installing-solidity.html)가 설치되어 있어야 합니다. 위 프로그램을 컴파일하려면 solc:0.5.6을 설치해야 합니다.

스마트 컨트랙트를 유형별로 배포하려면 아래에 설명된 caver-java 클래스를 사용할 수 있습니다:
  - 스마트 컨트랙트 트랜잭션의 발신자 또는 수수료 납부자가 수수료를 지불할 때 `caver.contract` 패키지의 `Contract` 클래스
  - 스마트 컨트랙트 트랜잭션의 발신자가 수수료를 지불할 때 `caver.transaction` 패키지의 `SmartContractDeploy` 클래스
  - 스마트 컨트랙트 트랜잭션의 수수료 지불자가 수수료를 지불할 때 `caver.transaction` 패키지에 있는 `feeDelegatedSmartContractDeploy` 클래스
  - 스마트 컨트랙트 트랜잭션의 수수료 납부자가 수수료를 지불할 때 `caver.transaction` 패키지의 `feeDelegatedSmartContractDeployWithRatio` 클래스

다음은 `caver.contract` 패키지의 `Contract` 클래스를 활용하는 예제입니다. 스마트 컨트랙트를 컴파일한 후 받은 바이트코드와 ABI로 아래와 같이 `contract` 인스턴스를 생성할 수 있습니다.

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

위의 코드를 실행하면 다음과 같은 결과가 표시됩니다.

```bash
function set(string,string)
function get(string)
ContractAddress : null
```

위의 출력을 보면 `contract` 인스턴스가 스마트 컨트랙트 메서드를 소유하고 있음을 알 수 있습니다. 그리고 아직 배포되지 않았기 때문에 `contract.getContractAddress()`의 결과가 null로 출력되는 것을 볼 수 있습니다.

이 컨트랙트가 이미 배포되었고 이 컨트랙트가 배포된 컨트랙트 주소를 알고 있다면, 아래와 같이 `contract` 인스턴스 생성자의 세 번째 파라미터로 컨트랙트 주소를 전달합니다.

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

위의 코드를 실행하면 다음과 같은 결과가 표시됩니다.

```bash
function set(string,string)
function get(string)
ContractAddress : 0x3466D49256b0982E1f240b64e097FF04f99Ed4b9
```

`contract` 인스턴스는 생성 시 컨트랙트 주소를 `contractAddress` 프로퍼티로 저장합니다. 이 주소는 게터/세터 함수를 통해 액세스할 수 있습니다(`getContractAddress()` / `setContractAddress()`).

`contract` 인스턴스가 생성되면, 아래 예시처럼 바이트코드와 생성자의 인자(배포에 필요한 경우)를 전달하여 스마트 컨트랙트를 배포할 수 있습니다.

`contract` 인스턴스의 `deploy()` 메서드는 컨트랙트 배포 및 컨트랙트 실행을 위한 트랜잭션을 전송합니다. 트랜잭션을 전송할 때 `caver.wallet`의 Keyring을 사용하여 서명합니다. 서명하기 전에 사용할 Keyring이 `caver.wallet`에 추가되어 있어야 합니다.

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

위 코드에서 `deployer`는 컨트랙트를 Klaytn에 배포하고 배포된 `contract` 인스턴스를 반환합니다.

```bash
ContractAddress : 0x3466D49256b0982E1f240b64e097FF04f99Ed4b9
```

스마트 컨트랙트는 트랜잭션을 배포하는 컨트랙트 유형에 따라 다음 클래스 중 하나를 사용하여 배포할 수 있습니다:
  - 스마트 컨트랙트 트랜잭션의 발신자 또는 수수료 납부자가 수수료를 지불하는 경우 `caver.contract` 패키지의 `Contract` 클래스
  - 스마트 컨트랙트 트랜잭션의 발신자가 수수료를 지불하는 경우 `caver.transaction` 패키지의 `SmartContractDeploy` 클래스
  - 스마트 컨트랙트 트랜잭션의 수수료 지불자가 수수료를 지불할 때 `caver.transaction` 패키지에 있는 `feeDelegatedSmartContractDeploy` 클래스
  - 스마트 컨트랙트 트랜잭션의 수수료 납부자가 수수료를 지불할 때 `caver.transaction` 패키지의 `feeDelegatedSmartContractDeployWithRatio` 클래스


수수료 위임 트랜잭션을 통해 스마트 컨트랙트를 배포하려면 아래 예시와 같이 `SendOptions` 클래스에서 `feeDelegation` 및 `feePayer` 필드를 정의합니다.

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

`caver.contract`을 통해 스마트 컨트랙트를 배포할 때 발신자와 수수료 납부자가 별도로 서명된 트랜잭션을 전송하려면 아래 코드를 참고하세요.

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


스마트 컨트랙트의 기능을 유형별로 실행하려면 아래에 설명된 caver-java 클래스를 사용할 수 있습니다:
  - 스마트 컨트랙트 트랜잭션의 발신자가 수수료를 지불할 때 `caver.contract` 패키지의 `Contract` 클래스
  - 스마트 컨트랙트 트랜잭션의 발신자가 수수료를 지불할 때 `caver.transaction` 패키지의 `SmartContractExecution` 클래스
  - 스마트 컨트랙트 트랜잭션의 수수료 지불자가 수수료를 지불할 때 `caver.transaction` 패키지에 있는 `FeeDelegatedSmartContractExecution` 클래스
  - 스마트 컨트랙트 트랜잭션의 수수료 납부자가 수수료를 지불할 때 `caver.transaction` 패키지에 있는 `FeeDelegatedSmartContractExecutionWithRatio` 클래스


스마트 컨트랙트에서 함수를 실행하는 방법을 보여드리기 위해 아래 예시 코드에서 컨트랙트 함수 `set`의 입력 파라미터로 문자열 "testValue"를 넣는 컨트랙트 실행 트랜잭션을 전송합니다.

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

수수료 위임 트랜잭션을 통해 스마트 컨트랙트의 기능을 실행하려면 아래 예시와 같이 `SendOptions` 클래스에서 `feeDelegation` 및 `feePayer` 필드를 정의합니다.


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

`caver.contract`을 통해 스마트 컨트랙트를 실행할 때 발신자와 수수료 납부자가 별도로 서명된 트랜잭션을 전송하려면 아래 코드를 참고하세요:

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

`contract` 인스턴스를 로드하고 해당 함수 중 하나를 호출하려면(트랜잭션을 전송하는 것이 아니라 호출만): 아래 예시는 컨트랙트에서 `get` 함수를 호출하는 것을 보여줍니다.

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

위 코드를 실행하면 아래와 같이 값이 출력됩니다.

```bash
testValue
```

자세한 내용은 [caver-java API]를 참조하세요.


## IPFS <a id="ipfs"></a>

IPFS(InterPlanetary File System)는 파일, 웹사이트, 애플리케이션 및 데이터를 저장하고 액세스하기 위한 분산 파일 시스템입니다.

Caver로 IPFS를 통해 파일을 업로드하고 다운로드할 수 있습니다.


### IPFS로 연결하기 <a id="connecting-with-ipfs"></a>

`caver.ipfs` 패키지의 `IPFS` 클래스는 `Caver`의 클래스 멤버 변수로 정의되어 있으므로 `Caver`를 통해 IPFS와 상호 작용할 수 있습니다.

`Caver` 인스턴스를 통해 `IPFS` 인스턴스를 사용하려면, 먼저 `setIPFSNode()` 메서드를 호출하여 IPFS 노드에 연결해야 합니다.

`setIPFSNode()` 함수에는 다음 파라미터가 필요합니다:
  - IPFS HTTP API 호스트 URL
  - IPFS HTTP API 호스트 포트 번호
  - 호스트가 SSL을 사용하는지 여부.

```java
String host = "The URL of an IPFS node";
int port = 5001; // API host port number
boolean isSSL = true; // API host support ssl 
Caver caver = new Caver();
caver.ipfs.setIPFSNode(host, port, isSSL);
```

### IPFS를 통해 파일 업로드하기<a id="uploading-a-file-through-ipfs"></a>

`IPFS`를 통해 파일을 업로드하려면 아래와 같이 `add()`를 사용하세요.

이 함수는 업로드한 파일의 [CID(Content Identifier)](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids)를 반환합니다.


```java
String filePath = "/path/to/file";
String cid = caver.ipfs.add(filePath);
System.out.println(cid);
```

위 코드의 실행 결과는 아래와 같습니다.

```java
QmYzW1fXbapdxkZXMQeCYoDCjVc18H8tLfMfrxXRySmQiq
```

마찬가지로 바이트 배열을 업로드할 수도 있습니다.

```java
String text = "sample data";
byte[] data = text.getBytes();

String cid = caver.ipfs.add(data);
System.out.println(cid);
```

위 코드의 실행 결과는 아래와 같습니다.

```java
QmYzW1fXbapdxkZXMQeCYoDCjVc18H8tLfMfrxXRySmQiq
```

### IPFS에서 파일 다운로드하기<a id="downloading-a-file-from-ipfs"></a>

`IPFS`에서 파일을 다운로드하려면 아래와 같이 `get()`을 사용하세요.

이 기능을 사용하려면 다운로드할 파일의 CID가 필요합니다.

```java
String cid = "QmYzW1fXbapdxkZXMQeCYoDCjVc18H8tLfMfrxXRySmQiq";
byte[] content = caver.ipfs.get(cid);
```


### CID와 멀티해시 간 변환 <a id="conversion-between-cid-and-multihash"></a>

`toHex()`를 사용하여 CID를 [Multihash](https://multiformats.io/multihash/)로 변환할 수 있습니다.

CID는 멀티해시의 Base58 인코딩된 값입니다. `toHex()`는 CID를 디코딩하고 해당 멀티해시를 반환합니다.

```java
String cid = "QmYtUc4iTCbbfVSDNKvtQqrfyezPPnFvE33wFmutw9PBBk";
String multihash = caver.ipfs.toHex(cid);
System.out.println(multihash);
```

위 코드의 실행 결과는 아래와 같습니다.

```java
0x12209cbc07c3f991725836a3aa2a581ca2029198aa420b9d99bc0e131d9f3e2cbe47
```

멀티해시를 CID로 변환하려면 `fromHex()`를 사용하세요.

```java
String multihash = "0x12209cbc07c3f991725836a3aa2a581ca2029198aa420b9d99bc0e131d9f3e2cbe47";
String cid = caver.ipfs.fromHex(multihash);
System.out.println(cid);
```

위 코드의 실행 결과는 아래와 같습니다.

```java
QmYtUc4iTCbbfVSDNKvtQqrfyezPPnFvE33wFmutw9PBBk
```

## KCT 인터페이스 감지<a id="detect kct interface"></a>

[KIP-7], [KIP-17], [KIP-37] 등 KCT(Klaytn Compatible Token) 컨트랙트에서는 다양한 인터페이스를 정의하여 제공하고 있으며, [KIP-13]에서는 컨트랙트에 쿼리를 전송하여 컨트랙트가 KCT 사양을 준수하는지, 어떤 인터페이스를 구현하고 있는지 확인할 수 있습니다.

[KIP-13]은 Caver v1.5.7에서 구현되었습니다. KCT 컨트랙트 클래스(`KIP7`, `KIP17`, `KIP37`)에 대해 `detectInterface()`를 통해 인터페이스를 감지할 수 있습니다.

### KIP-7 인터페이스 감지하기 <a id="detecting-kip-7-interfaces"></a>

KIP-7 인터페이스를 감지하려면 `KIP7` 클래스에서 `detectInterface()`를 사용할 수 있습니다.
이 함수는 KIP-7 인터페이스 식별자와 인터페이스가 지원되는지 여부에 대한 부울 사이의 매핑을 반환합니다.

`detectInterface()`는 정적 메서드와 인스턴스 메서드를 모두 지원하므로 필요에 맞는 메서드를 선택해 사용할 수 있습니다.

`KIP7`에 대해 `detectInterface()`를 통해 탐지된 인터페이스는 아래 표와 같습니다.

|인터페이스|KIP-13 식별자|
|---|---|
|IKIP7|0x65787371|
|IKIP7Metadata|0xa219a025|
|IKIP7Mintable|0xeab83e20|
|IKIP7Burnable|0x3b5a0bf8|
|IKIP7Pausable|0x4d5507ff|

```java
Caver caver = new Caver(Caver.DEFAULT_URL);
ObjectMapper mapper = new ObjectMapper();
String contractAddress = "0x{address}";

//using static method.
Map<String, Boolean> resultStatic = caver.kct.kip7.detectInterface(caver, contractAddress);
String resultJson = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(resultStatic);
System.out.println(resultJson);

//using instance method.
KIP7 kip7 = caver.kct.kip7.create(contractAddress);
Map<String, Boolean> resultInstance = kip7.detectInterface();
String resultJson = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(resultInstance);
System.out.println(resultJson);
```

위 코드의 실행 결과는 아래와 같습니다.

```java
{
  "IKIP7Metatdata" : true,
  "IKIP7Burnable" : true,
  "IKIP7" : true,
  "IKIP7Pausable" : true,
  "IKIP7Mintable" : true
}
```


### KIP-17 인터페이스 감지하기 <a id="detecting-kip-17-interfaces"></a>

KIP-17 토큰 컨트랙트에 구현된 인터페이스를 감지하려면 `KIP17` 클래스에서 `detectInterface()`를 사용하면 됩니다.
이 함수는 KIP-17 인터페이스 식별자와 인터페이스 지원 간의 매핑을 반환합니다.

`detectInterface()`는 정적 메서드와 인스턴스 메서드를 모두 지원하므로 필요에 맞는 메서드를 선택해 사용할 수 있습니다.

`KIP17`에 대해 `detectInterface()`를 통해 탐지된 인터페이스는 아래 표와 같습니다.

|인터페이스|KIP-13 식별자|
|---|---|
|IKIP17|0x80ac58cd|
|IKIP17Metadata|0x5b5e139f|
|IKIP17Enumerable|0x780e9d63|
|IKIP17Mintable|0xeab83e20|
|IKIP17MetadataMintable|0xfac27f46|
|IKIP17Burnable|0x42966c68|
|IKIP17Pausable|0x4d5507ff|

```java

Caver caver = new Caver(Caver.DEFAULT_URL);
ObjectMapper mapper = new ObjectMapper();
String contractAddress = "0x{address}";

//using static method.
Map<String, Boolean> resultStatic = caver.kct.kip17.detectInterface(caver, contractAddress);
String resultJson = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(resultStatic);
System.out.println(resultJson);

//using instance method.
KIP17 kip17 = caver.kct.kip17.create(contractAddress);
Map<String, Boolean> resultInstance = kip17.detectInterface();
String resultJson = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(resultInstance);
System.out.println(resultJson);
```

위 코드의 실행 결과는 아래와 같습니다.

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

### KIP-37 인터페이스 감지하기 <a id="detecting-kip-37-interfaces"></a>

KIP-37 토큰 컨트랙트에 구현된 인터페이스를 감지하려면 `KIP37` 클래스에서 `detectInterface()`를 사용하면 됩니다.
이 함수는 KIP-37 인터페이스 식별자와 인터페이스 지원 간의 매핑을 반환합니다.

`detectInterface()`는 정적 메서드와 인스턴스 메서드를 모두 지원하므로 적절한 메서드를 선택하여 사용할 수 있습니다.

`KIP37`에 대한 `detectInterface()`를 통한 인터페이스 검출은 아래 표와 같습니다.

| 인터페이스 | KIP-13 식별자 |
|---|---|
| IKIP37 | 0x6433ca1f |
| IKIP37Metadata | 0x0e89341c |
| IKIP37Mintable | 0xdfd9d9ec |
| IKIP37Burnable | 0x9e094e9e |
| IKIP37Pausable | 0x0e8ffdb7


```java

Caver caver = new Caver(Caver.DEFAULT_URL);
ObjectMapper mapper = new ObjectMapper();
String contractAddress = "0x{address}";

//using static method.
Map<String, Boolean> resultStatic = caver.kct.kip37.detectInterface(contractAddress);
String resultJson = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(resultStatic);
System.out.println(resultJson);

//using instance method.
KIP37 kip37 = caver.kct.kip37.create(contractAddress);
Map<String, Boolean> resultInstance = kip37.detectInterface();
String resultJson = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(resultInstance);
System.out.println(resultJson);
```

위 코드의 실행 결과는 아래와 같습니다.

```java
{
  "IKIP37Metatdata" : true,
  "IKIP37Burnable" : true,
  "IKIP37" : true,
  "IKIP37Pausable" : true,
  "IKIP37Mintable" : true
}
```


[caver-java API]: https://javadoc.io/doc/com.klaytn.caver/core/
[KIP-7]: https://kips.klaytn.foundation/KIPs/kip-7
[KIP-13]: https://kips.klaytn.foundation/KIPs/kip-13
[KIP-17]: https://kips.klaytn.foundation/KIPs/kip-17
[KIP-37]: https://kips.klaytn.foundation/KIPs/kip-37

