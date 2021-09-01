# 시작하기 <a id="getting-started"></a>

## 새로운 기능

이번 caver-java 1.5.0 버전은 Common Architecture를 도입했습니다. Common Architecture란 Klaytn 개발 환경을 위한 새로운 소프트웨어 아키텍처로써 모든 Klaytn SDKs (caver-js/caver-java)가 공유합니다. Common Architecture는 여러분이 더 간편하고 더 체계적으로 개발하며 다른 프로그래밍 언어로 더 쉽게 확장하도록 설계되었습니다.

caver-java가 1.5.0으로 업데이트되면서 일부 API를 제외한 1.4.0 API는 이제 사용되지 않습니다.

caver-java 1.5.0이 새롭게 제공하는 API는 아래와 같습니다.

### caver.account

caver.account는 Klaytn 계정의 AccountKey를 업데이트하기 위한 패키지입니다. AccountKey는 1개 이상의 공개키(AccountKeyPublic, AccountKeyWeightedMultiSig, AccountKeyRoleBased) 또는 특수 타입 키(AccountKeyLegacy, AccountKeyFail)입니다.


- `caver.account`는 caver-java 1.4.0의 `caver.tx.account`를 대체합니다.

### caver.wallet

caver.wallet은 인메모리 지갑에서 Keyring 인스턴스를 관리하도록 하는 패키지입니다. Keyring이란 어떤 Klaytn 계정 주소와 그 주소의 개인키(들)를 저장하는 인스턴스입니다. 키링은 이 계정 주소가 트랜잭션에 서명할 때 사용됩니다. caver.wallet은 모든 종류의 Keyring (SingleKeyring, MultipleKeyring, RoleBasedKeyring)을 수용하며 각 Klaytn 계정 주소를 가지고 이를 관리합니다.

- `caver.wallet`은 caver-java 1.4.0의 `caver.crypto`를 대체합니다.
- `caver.wallet.KeyStore`는 caver-java 1.4.0의 `caver.wallet.WalletFile`를 대체합니다.

### caver.transaction

caver.transaction은 [Transaction](https://docs.klaytn.com/klaytn/design/transactions#transactions-overview) 관련 기능을 제공하는 패키지입니다.

- `caver.transaction`은 caver-java 1.4.0의 `caver.tx`를 대체합니다.

### caver.rpc

caver.rpc는 Klaytn 노드에 RPC 호출 기능을 제공하는 패키지입니다.

- `caver.rpc.klay`와 `caver.rpc.net`은 caver-java 1.4.0의 `Klay`, `Net` 인터페이스를 각각 대체합니다.

### caver.util

caver.utils는 유틸리티 함수를 제공합니다.

### caver.contract

`caver.contract` 패키지를 사용하면 Klaytn의 스마트 컨트랙트를 쉽게 다룰 수 있습니다. caver.contract로 스마트 컨트랙트를 배포하고 스마트 컨트랙트 함수를 호출해 실행할 수 있습니다. `caver.contract`는 먼저 스마트 컨트랙트 함수와 이벤트들을 ABI\(Application Binary Interface\)에서 변환하여 함수를 호출하고 이벤트 정보를 얻습니다.

## 준비 사항 <a id="prerequisites"></a>

### 저장소 추가<a id="adding-a-repository"></a>
IPFS를 사용하기 전 라이브러리 저장소가 추가되어야 합니다. 우선 아래 저장소를 추가합니다.

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

### 의존성 추가하기<a id="adding-a-dependency"></a>

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

JSON-RPC 요청 및 응답에 대한 세부 사항을 보려면, [LOGBack](https://logback.qos.ch/) 의존성을 프로젝트에 포함하세요. 아래는 Gradle 빌드 파일 예제입니다. Maven에도 의존성을 추가할 수 있습니다. Since caver-java uses the [SLF4J](http://www.slf4j.org/) logging facade, you can switch to your preferred logging framework instead of LOGBack.

```groovy
implementation "ch.qos.logback:logback-classic:1.2.3"
```

**참고**: 중앙 저장소에는 RC, Android 및 Java 버전이 함께 나열됩니다. 와일드 카드를 사용하여 버전을 얻어오면 플랫폼에 적합하지 않은 버전을 사용하게 될 수 있습니다.

#### 커맨드라인 도구<a id="command-line-tool"></a>

커맨드라인 도구를 사용하면 커맨드라인에서 솔리디티 스마트 컨트랙트 함수 래퍼를 생성할 수 있습니다.

**\(Homebrew\) 설치**

이를 설치하려면 Java 1.8 이상이 필요합니다.

```text
$ brew tap klaytn/klaytn
$ brew install caver-java
```

설치 후 아래와 같이 'caver-java' 명령을 실행할 수 있습니다:

```text
$ caver-java solidity generate -b <smart-contract>.bin -a <smart-contract>.abi -o <outputPath> -p <packagePath>
```

**\(기타\) 설치**

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

이 장은 `keystore file`을 사용해 KLAY를 전송하는 간단한 KLAY 전송 트랜잭션 예시를 설명합니다. 키스토어 파일은 [Klaytn Wallet](../../../toolkit/klaytn-wallet.md#how-to-receive-baobab-testnet-klay)에 생성될 수 있습니다. 테스트를 위해 KLAY가 필요한 경우 [Klaytn Wallet](../../../toolkit/klaytn-wallet.md#how-to-receive-baobab-testnet-klay)에서 Baobab testnet KLAY를 얻을 수 있습니다.

```java
public void sendingKLAY() throws IOException, CipherException, TransactionException {
        Caver caver = new Caver(Caver.BAOBAB_URL);

        //keystore json 파일을 읽음.
        File file = new File("./keystore.json");

        // keystore 복호화.
        ObjectMapper objectMapper = ObjectMapperFactory.getObjectMapper();
        KeyStore keyStore = objectMapper.readValue(file, KeyStore.class);
        AbstractKeyring keyring = caver.wallet.keyring.decrypt(keyStore, "password");

        // caver wallet에 추가
        caver.wallet.add(keyring);

        BigInteger value = new BigInteger(caver.utils.convertToPeb(BigDecimal.ONE, "KLAY"));

        // 자산 이전 트랜잭션 생성
        ValueTransfer valueTransfer = caver.transaction.valueTransfer.create(
                TxPropertyBuilder.valueTransfer()
                        .setFrom(keyring.getAddress())
                        .setTo("0x8084fed6b1847448c24692470fc3b2ed87f9eb47")
                        .setValue(value)
                        .setGas(BigInteger.valueOf(25000))
        );

        // 트랜잭션 서명
        valueTransfer.sign(keyring);

        // Klaytn으로 트랜잭션 전송
        Bytes32 result = caver.rpc.klay.sendRawTransaction(valueTransfer.getRawTransaction()).send();
        if(result.hasError()) {
            throw new RuntimeException(result.getError().getMessage());
        }

        // 트랜잭션 영수증 확인
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

`Keyring`은 Klaytn 계정 주소와 개인키(들)이 들어있는 구조입니다.

`Keyring`은 저장되는 키 종류에 따라 3가지 타입으로 나뉩니다: 주소 1개와 개인키 1개를 가지는 `SingleKeyring`, 주소 1개와 여러 개인키를 가지는 `MultipleKeyring`, 그리고 주소 1개와 키 역할별로 개인키 1개 이상을 가지는 `RoleBasedKeyring`가 있습니다.

`SingleKeyring`는 내부에 `key` 속성을 정의하며, 이 `key` 속성에 개인키 1개가 저장됩니다.

`MultipleKeyring`는 내부에 `keys` 속성을 정의하며, 이 `keys`는 여러 개인키를 저장하기 위해 배열로서 구현됩니다.

`RoleBasedKeyring`에 정의되어 있는 `keys` 속성은 개인키 배열 3개를 요소로 갖는 List 객체로서 구현되어(`keys`가 비어있으면 `[ [], [], [] ]`와 같이 보임), 각 `role`이 사용하는 여러 개의 개인키가 저장될 수 있습니다. 배열의 1번째 요소에는 `roleTransactionKey`로 사용될 개인키(들), 배열의 2번째 요소에는 `roleAccountUpdateKey`로 사용될 개인키(들), 배열의 3번째 요소에는 `roleFeePayerKey`로 사용될 개인키(들)이 저장됩니다.

### Keyring 생성<a id="creating-a-keyring"></a>

#### SingleKeyring 생성 <a id="generating-a-singlekeyring"></a>

아래와 같이 임의의 값을 사용해 SingleKeyring을 생성할 수 있습니다.

```java
SingleKeyring keyring = caver.wallet.keyring.generate();
```

#### 개인키로 SingleKeyring 생성하기 <a id="creating-a-singlekeyring-from-private-key"></a>

개인키가 있다면, 이 개인키를 사용해 Keyring을 만들 수 있습니다.

```java
String privateKey = "0x{private key in hex}";
SingleKeyring keyring = caver.wallet.keyring.createFromPrivateKey(privateKey);
```

#### 개인키와 계정 주소로 SingleKeyring 생성하기<a id="creating-a-singlekeyring-with-a-private-key-and-an-address"></a>

여러분의 Klaytn 계정 주소가 개인키로부터 생성된 것이 아니라 개인키와 별도로 분리된 것이라면, 주소와 개인키를 사용해 Keyring을 만들 수 있습니다.

```java
String address = "0x{address in hex}";
String privateKey = "0x{private key in hex}";
SingleKeyring keyring = caver.wallet.keyring.createWithSingleKey(address, privateKey);
```

또한, Klaytn 지갑 키에서 SingleKeyring 인스턴스를 생성할 수 있습니다.

```java
String klaytnWalletKey = "0x{private key}0x{type}0x{address in hex}";
SingleKeyring keyring = caver.wallet.keyring.createFromKlaytnWalletKey(klaytnWalletKey);
```

#### 여러 개인키로 MultipleKeyring 생성하기<a id="creating-a-multiplekeyring-with-multiple-private-keys"></a>

여러 개인키를 사용하고자 한다면, 주소 1개와 여러 개인키로 `MultipleKeyring`를 만들 수 있습니다. 아래 예시는 여러 개인키들로 `MultipleKeyring`를 만드는 방법을 소개합니다.

```java
String address = "0x{address in hex}";
String[] privateKeyArray = new String[] {"0x{private key#1}", "0x{private key#2}", "0x{private key#3}"};
MultipleKeyring multipleKeyring = caver.wallet.keyring.createWithMultipleKey(address, privateKeyArray);
```

#### 개인키로 RoleBasedKeyring 생성하기<a id="creating-a-rolebasedkeyring-with-role-based-private-keys"></a>

`role`마다 다른 개인키를 사용하려면 `caver.wallet.keyring.createWithRoleBasedKey`를 사용해야 합니다. 배열의 각 요소는 `RoleBasedKeyring`에 있는 각 Role에 해당됩니다. 아래 예시는 각 Role이 사용하는 개인키들로부터 `RoleBasedKeyring` 인스턴스를 만드는 방법을 소개합니다.


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

### 키스토어 json 문자열로부터 Keyrings를 caver-java에 추가하기<a id="adding-keyrings-to-caver-java"></a>

Caver-java에서 제공하는 인메모리 지갑에 Keyring을 추가하면 더 쉽게 사용할 수 있습니다. 다음 예시는 [Klaytn Wallet](https://wallet.klaytn.com/)에서 만들어진 키스토어 JSON 문자열 파일을 사용해 `caver.wallet`에 Keyring을 추가하는 방법을 설명합니다.

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

위 결과를 살펴보면 `caver.wallet`에 Keyring을 추가하면 `caver.wallet`에서 여러분의 Keyring을 조회할 수 있습니다.

사용할 주소와 개인키만 있으면 caver.wallet.newKeyring로 손쉽게 Keyring을 만들고 caver.wallet에 직접 추가할 수 있습니다.

```java
Caver caver = new Caver(Caver.MAINNET_URL);

// 주소와 개인키를 월렛에 추가 
AbstractKeyring addedSingleKeyring = caver.wallet.newKeyring("0x{address in hex}", "0x{private key1}");


// 주소와 개인키들을 월렛에 추가 
String[] privateKeyArr = new String[] {
                "0x{privateKey in hex}",
                "0x{privateKey in hex}",
                "0x{privateKey in hex}",
};

AbstractKeyring addedMultipleKeyring = caver.wallet.newKeyring('0x{address in hex}', privateKeyArr);


// 주소와 각 역할에 정의된 개인키를 월렛에 추가 
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

개인키를 사용해 `caver.wallet.newKeyring`을 실행하면 개인키 1개를 가진 Keyring 인스턴스 1개가 생성되고 이 인스턴스는 `caver.wallet`에 추가됩니다. 다수의 개인키의 경우, 여러 개인키를 가진 Keyring 인스턴스 1개가 생성되고 `caver.wallet`에 추가됩니다. Role별로 1개 이상의 개인키를 가진 2차원 배열을 인자로 넘겨주면, Role마다 서로 다른 개인키(들)을 가진 Keyring 인스턴스 1개가 생성되며 이 역시 `caver.wallet`에 추가됩니다.


`caver.wallet`에 Keyring 인스턴스를 추가하면 `caver.wallet.add` 또는 `caver.wallet.newKeyring`은 Keyring 인스턴스를 반환합니다.

## 트랜잭션 전송하기 <a id="sending-a-transaction"></a>

이 장에서는 Baobab 네트워크에서 caver-java를 사용하여 KLAY를 전송하는 방법을 보여줍니다.

### Baobab Faucet을 통해 KLAY 받기 <a id="getting-klay-via-baobab-faucet"></a>

테스트를 위해 KLAY가 필요한 경우 [Klaytn Wallet](../../../toolkit/klaytn-wallet.md#how-to-receive-baobab-testnet-klay)에서 Baobab testnet KLAY를 얻을 수 있습니다. 개인키 또는 키스토어 파일을 사용하여 Klaytn Wallet에 로그인하고 테스트를 위해 faucet을 통해 Baobab 테스트넷 KLAY를 받습니다.

### 송금 트랜잭션 전송 <a id="sending-a-value-transfer-transaction"></a>

트랜잭션 서명은 caver-java 지갑을 통해 할 수 있습니다. 트랜잭션을 네트워크에 보내려면 아래와 같이 2단계를 거쳐야합니다.

1. 트랜잭션 서명하기
    - 만약, 사용하시고 싶은 Keyring이 `caver.wallet`에 있다면, `caver.wallet.sign` 함수로 서명할 수 있습니다.
    - `caver.wallet`에 Keyring을 추가하지 않고 따로 관리한다면, `transaction.sign` 함수를 통해 트랜잭션에 서명할 수 있습니다.
2. RLP 인코딩된 서명된 트랜잭션을 `caver.rpc.klay.sendRawTransaction`을 통해 Klaytn에 전송합니다.

**참고:** 발신자의 잔액은 송금하려는 KLAY와 송금 트랜잭션 수수료를 내기에 충분해야 합니다.

#### 트랜잭션 서명하기

트랜잭션을 Klaytn에 보내기 전에 트랜잭션에 먼저 서명해야 합니다.

아래 예제는 Keyring이 `caver.wallet`에 추가되었을 때 트랜잭션에 서명하는 방법을 보여줍니다.

```java
Caver caver = new Caver(Caver.MAINNET_URL);

// caver.wallet에 키링 추가
SingleKeyring keyring = caver.wallet.keyring.createFromPrivateKey("privateKey");
caver.wallet.add(keyring);

// 자산 이동 트랜잭션 생성
ValueTransfer valueTransfer = caver.transaction.valueTransfer.create(
        TxPropertyBuilder.valueTransfer()
                .setFrom(keyring.getAddress())
                .setTo("0x176ff0344de49c04be577a3512b6991507647f72")
                .setValue(BigInteger.valueOf(1))
                .setGas(BigInteger.valueOf(30000))
);

// caver.wallet.sign으로 트랜잭션 서명
caver.wallet.sign(keyring.getAddress(), valueTransfer);
String rlpEncoded = valueTransfer.getRLPEncoding();
System.out.println("RLP-encoded string: " + rlpEncoded)
```

위 코드는 Keyring을 `caver.wallet`에 추가하고, 트랜잭션을 생성하고, `caver.wallet.sign`를 통해 이 트랜잭션에 서명합니다.

위 코드를 실행하면 아래 결과를 얻습니다. 위 코드가 실행되었을 때, RLP 인코딩된 트랜잭션 문자열은 아래와 같이 나타납니다. (결과로 얻은 RLP 인코딩된 문자열은 아래에 있는 RLP 인코딩된 문자열과 다를 수 있습니다.)

```bash
RLP-encoded string: 0x08f87e808505d21dba0082753094176ff0344de49c04be577a3512b6991507647f720194ade4883d092e2a972d70637ca7de9ab5166894a2f847f845824e44a0e1ec99789157e5cb6bc691935c204a23aaa3dc049efafca106992a5d5db2d179a0511c421d5e508fdb335b6048ca7aa84560a53a5881d531644ff178b6aa4c0a41
```

#### RLP 인코딩된 서명된 트랜잭션을 Klaytn에 전송합니다.

이제, 아래와 같이 서명된 트랜잭션을 Klaytn에 전송할 수 있습니다. 아래 예시를 직접 실행하려면 "rlpEncoding"을 위 `rlpEncoded` 값으로 대체하십시오.

```java
public String sendRawTransaction() {
  Caver caver = new Caver(Caver.BAOBAB_URL);

  String rlpEncoding = "rlpEncoding";
  String txHash = null;

  try {
      // `caver.rpc.klay.sendRawTransaction`로 트랜잭션 전송
      Bytes32 sendResult = caver.rpc.klay.sendRawTransaction(rlpEncoding).send();
      if(sendResult.hasError()) {
          // 에러 처리
      }

      txHash = sendResult.getResult();
  } catch (IOException e) {
      // 예외 처리
  }
  return txHash;

}
```

`caver.wallet` 없이 트랜잭션에 서명하고 Klaytn에 서명된 트랜잭션을 보내려면 아래 예시를 확인하십시오.

```java
Caver caver = new Caver(Caver.MAINNET_URL);

// caver.wallet에 키링 추가
SingleKeyring keyring = caver.wallet.keyring.createFromPrivateKey("privateKey");
caver.wallet.add(keyring);

// 자산 이동 트랜잭션 생성
ValueTransfer valueTransfer = caver.transaction.valueTransfer.create(
        TxPropertyBuilder.valueTransfer()
                .setFrom(keyring.getAddress())
                .setTo("0x176ff0344de49c04be577a3512b6991507647f72")
                .setValue(BigInteger.valueOf(1))
                .setGas(BigInteger.valueOf(30000))
);

// transaction.sign으로 트랜잭션 서명
valueTransfer.sign(keyring);
String rlpEncoded = valueTransfer.getRLPEncoding();

try {
    // `caver.rpc.klay.sendRawTransaction`으로 트랜잭션 서명
    Bytes32 sendResult = caver.rpc.klay.sendRawTransaction(rlpEncoded).send();
    if(sendResult.hasError()) {
        // 에러 처리
    }

    String txHash = sendResult.getResult();
    System.out.println("Transaction Hash : " + txHash);
} catch (IOException e) {
    // 예외 처리
}
```

위 코드가 실행 되었을 때, 트랜잭션 해시(txHash)는 아래 예제와 같이 나타납니다.

```bash
Transaction Hash : 0x43e8ab1a2365ad598448b4402c1cfce6a71b3a103fce3a69905613e50b978113
```

### 영수증 확인<a id="checking-receipts"></a>

`caver.rpc.klay.sendRawTransaction`을 통해 Klaytn에 트랜잭션을 전송할 때 `TransactionReceiptProcessor`를 사용하여 트랜잭션의 영수증을 받아올 수 있습니다.

다음 예시는 PollingTransactionReceiptProcessor를 사용하여 영수증을 받는 과정입니다.

```java
Caver caver = new Caver(Caver.BAOBAB_URL);
String txHash = "0x40552efbba23347d36f6f5aaba6b9aeb6602e004df62c1988d9b7b1f036e676a";

//Sleep 시간 - 1000ms
// 시도 횟수 - 15
TransactionReceiptProcessor receiptProcessor = new PollingTransactionReceiptProcessor(caver, 1000, 15);

try {
  TransactionReceipt.TransactionReceiptData receiptData = receiptProcessor.waitForTransactionReceipt(txHash);
} catch (IOException | TransactionException e) {
  // 에러 처리

}
```

위 예시와 같이 TransactionReceiptProcessor를 통해 트랜잭션을 전송한 결과를 가져올 수 있습니다. `transactionHash` 필드는 영수증 객체 내부에 정의됩니다.

트랜잭션이 블록에 추가된 후, `txHash` 문자열과`caver.rpc.klay.getTransactionReceipt` RPC 호출을 사용하여 언제든지 트랜잭션 영수증을 조회할 수 있습니다. 아래 예시는 `caver.rpc.klay.getTransactionReceipt` RPC 호출을 사용하여 영수증을 받는 방법을 보여줍니다.

```java
Caver caver = new Caver(Caver.BAOBAB_URL);
String txHash = "0x40552efbba23347d36f6f5aaba6b9aeb6602e004df62c1988d9b7b1f036e676a";

try {
  TransactionReceipt receipt = caver.rpc.klay.getTransactionReceipt(txHash).send();
  if(receipt.hasError()) {
    // 에러 처리
  }

  TransactionReceipt.TransactionReceiptData receiptData = receipt.getResult();
} catch (IOException e) {
    // 예외 처리

}
```

트랜잭션의 실행 결과는 영수증의 `status`를 통하여 확인할 수 있습니다. 리턴값에 대한 자세한 설명은 `caver.rpc.klay.getTransactionReceipt`를 참조하세요. 만약 트랜잭션 실행이 실패한다면 에러에 대한 자세한 내용은 영수증의 `txError`에서 확인할 수 있습니다. `txError`에 대한 자세한 설명은 [txError: Detailed Information of Transaction Failures](../../json-rpc/transaction-error-codes.md)를 참고하세요.


## 다른 트랜잭션 타입 실행하기 <a id="executing-other-transaction-types"></a>

Klaytn은 확장성과 성능을 위한 다양한 트랜잭션 타입을 제공합니다. 자세한 내용은 [트랜잭션](../../../klaytn/design/transactions/README.md)을 참고하세요. 이 장에서는 caver-java와 함께 사용할 수 있는 예시를 설명합니다.

### 트랜잭션 수수료 대납<a id="fee-delegation"></a>

Klaytn은 수수료 대납 기능을 제공합니다. 여기에서는, 여러분이 트랜잭션 전송자일 때 RLP 인코딩된 트랜잭션을 만드는 예시를 소개합니다.

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

위 코드가 실행되었을 때, RLP 인코딩된 문자열이 출력됩니다. (결과로 얻은 RLP 인코딩된 문자열은 아래에 있는 RLP 인코딩된 문자열과 다를 수 있습니다.)

```bash
0x09f884028505d21dba0082c35094176ff0344de49c04be577a3512b6991507647f720594f5a9079f311f9ec55170af351627aff0c5d2e287f847f845824e43a0f4b53dbd4c915cb73b9c7fa17e22106ee9640155a06ab4a7ed8661f846d2a5cca035b5bba6a26d4ccd20c65e8f31cce265c193f1c874806f9fae6b0ee9df0addf080c4c3018080
```

수수료 납부자는 트랜잭션 발신자가 서명한 RLP 인코딩된 문자열(`rawTransaction`)에 `feePayerSignatures`를 첨부한 후에 Klaytn에 트랜잭션을 전송할 수 있습니다. `caver.wallet`에 수수료 납부자 Keyring도 같이 있다면, `caver.wallet.signAsFeePayer(feePayer.address, feeDelegatedTx)`를 호출하여 수수료 납부자 서명을 `feeDelegatedTx`에 넣을 수 있습니다. 그렇지 않다면, 수수료 납부자는 트랜잭션 발신자가 서명한 RLP 인코딩된 문자열에서 `feeDelegatedTx`를 새로 만들고, 자신의 서명을 여기에 추가해야합니다. 아래 예시를 참고하십시오. 아래 예시를 직접 실행하려면 `0x{RLP-encoded string}`를 위 `rlpEncoded` 값으로 대체하십시오 .

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

위 코드가 실행되었을 때, 발신자 서명과 수수료 납부자 서명이 첨부된 RLP 인코딩된 문자열 아래와 같이 나타납니다. (실제 결과값은 아래에 있는 문자열 결과값과 다를 수 있습니다.)

```bash
0x09f8dc028505d21dba0082c35094176ff0344de49c04be577a3512b6991507647f720594f5a9079f311f9ec55170af351627aff0c5d2e287f847f845824e43a0f4b53dbd4c915cb73b9c7fa17e22106ee9640155a06ab4a7ed8661f846d2a5cca035b5bba6a26d4ccd20c65e8f31cce265c193f1c874806f9fae6b0ee9df0addf09417e7531b40ad5d7b5fa7b4ec78df64ce1cb36d24f847f845824e44a0921b7c3be69db96ce14134b306c2ada423613cb66ecc6697ee8067983c268b6ea07b86b255d1c781781315d85d7904226fb2101eb9498c4a03f3fbd30ba3ec5b79
```

이제 트랜잭션 발신자와 수수료 납부자 모두 트랜잭션에 서명했으니, 트랜잭션을 Klaytn에 전송할 수 있습니다. `0x{RLP-encoded string}`을 위 예시 코드의 RLP 인코딩된 문자열 출력값으로 대체하십시오.

```java
Caver caver = new Caver(Caver.BAOBAB_URL);

TransactionReceiptProcessor receiptProcessor = new PollingTransactionReceiptProcessor(caver, 1000, 15);

String rlpEncoded = "0x{RLP-encoded string}";
try {
  // `caver.rpc.klay.sendRawTransaction`로 트랜잭션 전송
  Bytes32 sendResult = caver.rpc.klay.sendRawTransaction(rlpEncoding).send();
  if(sendResult.hasError()) {
    // 에러 처리

  }

  String txHash = sendResult.getResult();
  TransactionReceipt.TransactionReceiptData receiptData = receiptProcessor.waitForTransactionReceipt(txHash);
} catch (IOException | TransactionException e) {
  // 예외 처리

}
```

트랜잭션의 실행 결과는 영수증의 `status`를 통하여 확인할 수 있습니다. 리턴값에 대한 자세한 설명은 `caver.rpc.klay.getTransactionReceipt`를 참조하세요. 만약 트랜잭션 실행이 실패한다면 에러에 대한 자세한 내용은 영수증의 `txError`에서 확인할 수 있습니다. `txError`에 대한 자세한 설명은 [txError: Detailed Information of Transaction Failures]를 참고해주세요.

### 계정 업데이트 <a id="account-update"></a>

여러분의 Klaytn 계정 개인키를 변경하려면 다음 3가지 사항을 반드시 알아야 합니다:

1. Klaytn은 자신에게 전송되는 모든 트랜잭션을 검증합니다.
2. 트랜잭션을 검증하려면 개인키와 짝을 이루는 공개키가 필요합니다.
3. 따라서, 기존에 사용하던 개인키를 새로운 개인키로 바꾸기 전에, **먼저** 기존 공개키를 새로운 공개키로 바꿔야 합니다. 새로운 공개키는 반드시 새로운 개인키로부터 만들어야 합니다.

위 3가지를 염두에 두면서 다음 단계들을 통해 개인키를 변경할 수 있습니다.

1. 새로운 Keyring을 만들기 위해 새 개인키(들)을 준비합니다.
2. 필요한 Keyring 타입(SingleKeyring, MultipleKeyring, RoleBasedKeyring)을 골라 Keyring을 만듭니다.
3. 새 Keyring에서 Account 인스턴스를 생성합니다. 이 Account 인스턴스는 여러분의 Klaytn 계정이 사용할 새로운 공개키를 가지고 있습니다.
4. Account 인스턴스를 입력 파라미터로 받는 AccountUpdate 트랜잭션을 Klaytn에 전송합니다.
5. 마지막으로, 기존 Keyring을 2번째 단계에서 만들었던 새 Keyring으로 교체합니다.

더 자세한 내용은 `Account Update `를 확인하십시오.

AccountKey를 변경하려면, `Account` 인스턴스를 `caver.transaction.type.AccountUpdate`의 입력 변수 객체의 `account` 필드에 넣어야 합니다. `Account` 인스턴스는 Klaytn 계정의 주소와 업데이트할 AccountKey를 담고 있습니다.

아래 코드는 Klaytn 계정 개인키를 바꾸는 것과 더불어 Klaytn 계정 AccountKey를 `AccountKeyPublic`로 바꾸는 예시입니다. 이를 위해서는 새로 사용할 개인키를 준비하셔야 합니다.

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
        // 에러 처리
        throw new TransactionException(sendResult.getError().getMessage());
    }

    String txHash = sendResult.getResult();

    TransactionReceiptProcessor receiptProcessor = new PollingTransactionReceiptProcessor(caver, 1000, 15);
    TransactionReceipt.TransactionReceiptData receiptData = receiptProcessor.waitForTransactionReceipt(txHash);
} catch (IOException | TransactionException e) {
    // 예외 처리
    e.printStackTrace();
}

senderKeyring = (SingleKeyring)caver.wallet.updateKeyring(newKeyring);
```

위 코드가 성공적으로 실행되었다면 서명 시 기존 개인키와 이에 대응되는 기존 Keyring은 트랜잭션에 더 이상 사용하실 수 없습니다. 따라서 여러분은 `caver.wallet.updateKeyring(newKeyring)`을 사용해 기존 Keyring을 `newKeyring`으로 업데이트하셔야 합니다.  업데이트되고 나면 트랜잭션 서명은 새로운 개인키로만 가능합니다.

Klaytn 계정 AccountKey를 여러 개의 `AccountKeys`로 업데이트하려면 어떻게 해야 할까요? 아래 예시는 여러분이 사용하고 싶은 개인키들을 가지고 `Account` 인스턴스를 만드는 방법을 소개합니다(`caver.account.create`로 여러 공개키를 가지고 `Account` 인스턴스를 만들 수 있습니다.). 여기에서도, 트랜잭션 객체의 `account` 필드에 Account 인스턴스를 입력 파라미터로 넣으면, 나머지 업데이트 과정은 위에서 소개한 AccountKey 1개를 업데이트하는 과정과 동일합니다.

먼저, AccountKey를 `AccountKeyWeightedMultiSig`로 업데이트하기 위해 Account 인스턴스 하나를 만들어봅니다. `AccountKeyWeightedMultiSig`로 업데이트하려면, 임계값(Threshold)과 Key별 가중치가 정의되어야 합니다. 이를 위해서는 `caver.account.weightedMultiSigOptions`를 사용하십시오. 1번째 파라미터는 임계값이고 2번째 파라미터는 Key별 가중치를 담고 있는 배열입니다.

```java
// AccountKeyWeightedMultiSig를 사용하여 개인키 3개로 account 인스턴스 생성
String[] privateKeyArr = caver.wallet.keyring.generateMultipleKeys(3);
MultipleKeyring multipleKeyring = caver.wallet.keyring.createWithMultipleKey(sender.getAddress(), privateKeyArr);

// 임계치 = 3, 각 키의 가중치 = [1, 2, 1]
BigInteger threshold = BigInteger.valueOf(3);
BigInteger[] weightedArr = new BigInteger[] {BigInteger.valueOf(1), BigInteger.valueOf(2), BigInteger.valueOf(1)};
WeightedMultiSigOptions options = new WeightedMultiSigOptions(threshold, Arrays.asList(weightedArr));

Account account = multipleKeyring.toAccount(options)
```

이제 `AccountKeyRoleBased`를 사용해 AccountKey를 업데이트합니다. `AccountKeyRoleBased`은 `AccountKey` 타입 중 하나이며 여기에는 각 `role`에서 사용하는 키가 정의되어 있습니다.

```java
// Create an account instance with roles using AccountKeyRoleBased. In the account instance created, each role has a public key that corresponds to one private key.
List<String[]> newPrivateKeyArr = caver.wallet.keyring.generateRolBasedKeys(new int[] {1,1,1});
RoleBasedKeyring newKeyring = caver.wallet.keyring.createWithRoleBasedKey(senderKeyring.getAddress(), newPrivateKeyArr);

const account = newKeyring.toAccount()
```

위 AccountKeyRoleBased는 Role마다 공개키 1개를 사용하는 예시입니다. 위 코드에서 볼 수 있듯이, 이들 각각은 개인키 1개에 대응됩니다. 각 Role마다 여러 개인키를 사용하고 싶다면 아래와 같이 각 Role마다 `caver.account.weightedMultiSigOptions`을 반드시 정의해야 합니다.

```java
// AccountKeyRoleBased를 사용해 각 역할에 대해 키 [3, 2, 3]로 account 인스턴스 생성
List<String[]> newPrivateKeyArr = caver.wallet.keyring.generateRolBasedKeys(new int[] {3, 2, 3});
RoleBasedKeyring newKeyring = caver.wallet.keyring.createWithRoleBasedKey(senderKeyring.getAddress(), newPrivateKeyArr);

WeightedMultiSigOptions[] options = new WeightedMultiSigOptions[] {
    new WeightedMultiSigOptions(BigInteger.valueOf(4), Arrays.asList(BigInteger.valueOf(2), BigInteger.valueOf(2), BigInteger.valueOf(4))),
    new WeightedMultiSigOptions(BigInteger.valueOf(2), Arrays.asList(BigInteger.valueOf(1), BigInteger.valueOf(1))),
    new WeightedMultiSigOptions(BigInteger.valueOf(3), Arrays.asList(BigInteger.valueOf(1), BigInteger.valueOf(1), BigInteger.valueOf(1))),
};

Account account = newKeyring.toAccount(Arrays.asList(options));
```

AccountKey를 `AccountKeyLegacy` 또는 `accountKeyFail`로 업데이트하고 싶다면, 아래와 같이 Account 인스턴스를 만들고 이를 트랜잭션의 `account` 필드에 할당하십시오. 나머지 업데이트 과정은 다른 AccountKey 업데이트 과정과 동일합니다.

```java
// AccountKeyLegacy로 계정 생성
Account account = caver.account.createWithAccountKeyLegacy(keyringToUpdate.address);

// AccountKeyFail로 계정 생성
Account account = caver.account.createWithAccountKeyFail(keyringToUpdate.address)
```

### 스마트 컨트랙트 <a id="smart-contract"></a>

`caver.contract` 패키지에 있는 `Contract` 클래스를 사용하면 Klaytn의 스마트 컨트랙트와 쉽게 상호작용할 수 있습니다. 스마트 컨트랙트의 모든 함수는 하위수준 ABI가 주어졌을 때 자동으로 변환되어 `contract` 인스턴스내에 저장됩니다. 이는 스마트 컨트랙트를 마치 Java의 `컨트랙트` 인스턴스와 같이 다룰 수 있게 해줍니다.


이제 아래에서 간단한 솔리디티 예제 코드를 소개하면서 스마트 컨트랙트를 어떻게 다루는지 안내합니다. 'test.sol' 파일을 만들고 아래 예시를 작성합니다.


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

이제 이 스마트 컨트랙트를 컴파일하여 바이트코드와 ABI를 얻습니다.

```text
> solc --abi --bin ./test.sol
======= ./test.sol:KVstore =======
Binary: 
608060405234801561001057600080fd5b5061051f806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063693ec85e1461003b578063e942b5161461016f575b600080fd5b6100f46004803603602081101561005157600080fd5b810190808035906020019064010000000081111561006e57600080fd5b82018360208201111561008057600080fd5b803590602001918460018302840111640100000000831117156100a257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506102c1565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610134578082015181840152602081019050610119565b50505050905090810190601f1680156101615780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102bf6004803603604081101561018557600080fd5b81019080803590602001906401000000008111156101a257600080fd5b8201836020820111156101b457600080fd5b803590602001918460018302840111640100000000831117156101d657600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561023957600080fd5b82018360208201111561024b57600080fd5b8035906020019184600183028401116401000000008311171561026d57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506103cc565b005b60606000826040518082805190602001908083835b602083106102f957805182526020820191506020810190506020830392506102d6565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390208054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103c05780601f10610395576101008083540402835291602001916103c0565b820191906000526020600020905b8154815290600101906020018083116103a357829003601f168201915b50505050509050919050565b806000836040518082805190602001908083835b6020831061040357805182526020820191506020810190506020830392506103e0565b6001836020036101000a0380198251168184511680821785525050505050509050019150509081526020016040518091039020908051906020019061044992919061044e565b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061048f57805160ff19168380011785556104bd565b828001600101855582156104bd579182015b828111156104bc5782518255916020019190600101906104a1565b5b5090506104ca91906104ce565b5090565b6104f091905b808211156104ec5760008160009055506001016104d4565b5090565b9056fea165627a7a723058203ffebc792829e0434ecc495da1b53d24399cd7fff506a4fd03589861843e14990029
Contract JSON ABI 
[{"constant":true,"inputs":[{"name":"key","type":"string"}],"name":"get","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"key","type":"string"},{"name":"value","type":"string"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
```

**참고**: 스마트 컨트랙트를 컴파일하려면 [솔리디티 컴파일러](https://solidity.readthedocs.io/en/develop/installing-solidity.html) 가 설치되어 있어야 합니다. 위 프로그램을 컴파일하려면 solc:0.5.6을 설치해야 합니다.

유형별로 스마트 컨트랙트를 배포하기 위해서는 아래와 같은 caver-java 클래스들을 사용합니다:
  - `caver.contract` 패키지의 `Contract` 클래스: 스마트 컨트랙트 트랜잭션의 발신자 또는 대납자가 수수료를 지불할 때
  - `caver.transaction`패키지의 `SmartContractDeploy`클래스: 스마트 컨트랙트 트랜잭션 발신자가 수수료를 지불할 때
  - `caver.transaction`패키지의`feeDelegatedSmartContractDeploy` 클래스: 스마트 컨트랙트 트랜잭션 수수료 납부자가 수수료를 지불할 때
  - `caver.transaction`패키지의`feeDelegatedSmartContractDeployWithRatio` 클래스: 스마트 컨트랙트 트랜잭션 수수료 납부자가 수수료를 일부 지불할 때

아래는 `caver.contract` 패키지에 있는 `Contract` 클래스를 활용하는 방법입니다. 여러분은 아래와 같이 스마트 컨트랙트를 컴파일하여 얻은 ABI와 바이트코드에서 `contract` 인스턴스를 만들 수 있습니다.

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
            // 예외 처리
        }
    }
```

위 코드를 실행하면 아래 결과를 얻습니다.

```bash
function set(string,string)
function get(string)
ContractAddress : null
```

위 결과를 보면, `contract` 인스턴스가 스마트 컨트랙트 메서드를 가지고 있음을 볼 수 있습니다. 아직 컨트랙트가 배포되지 않았으므로, `contract.getContractAddress()` 값이 null임을 확인할 수 있습니다.

만약 스마트 컨트랙트가 이미 배포되었고 배포된 컨트랙트의 주소를 알고 있다면, 아래와 같이 컨트랙트 주소를 `contract` 인스턴스 생성자의 3번째 파라미터로 넣으십시오.

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
            // 예외 처리
        }
    }
```

위 코드를 실행하면 아래 결과를 얻습니다.

```bash
function set(string,string)
function get(string)
ContractAddress : 0x3466D49256b0982E1f240b64e097FF04f99Ed4b9
```

`contract` 인스턴스는 생성될 때 컨트랙트 주소를 `contractAddress` 속성으로 가집니다. 주소에는 getter / setter 함수 (`getContractAddress()` / `setContractAddress()`)를 사용해 접근이 가능합니다.

`contract` 인스턴스가 생성되고 나면, 그 바이트코드와 생성자 인자(필요할 경우)를 아래와 같이 전달함으로써 스마트 컨트랙트를 배포할 수 있습니다.

`contract` 인스턴스의 `deploy()` 메서드가 컨트랙트 배포와 실행을 위한 트랜잭션을 보낸다는 사실에 유의하세요. 트랜잭션 전송 시에는 서명을 위해 `caver.wallet`에 있는 Keyrings를 사용합니다. 사용할 keyring은 `caver.wallet`에 서명하기 전에 먼저 추가해야 합니다.

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
            // 예외 처리
        }
    }
```

위 코드를 보면 `deployer`가 Klaytn에 컨트랙트를 배포하고 배포된 `컨트랙트` 인스턴스를 반환합니다.

```bash
ContractAddress : 0x3466D49256b0982E1f240b64e097FF04f99Ed4b9
```

컨트랙트 배포 트랜잭션 타입에 따라 스마트 컨트랙트는 다음 클래스 중 하나를 사용해 배포됩니다.
  - `caver.contract` 패키지의 `Contract` 클래스: 스마트 컨트랙트 트랜잭션의 발신자가 수수료를 지불할 때
  - `caver.transaction`패키지의 `SmartContractDeploy`클래스: 스마트 컨트랙트 트랜잭션 발신자가 수수료를 지불할 때
  - `caver.transaction`패키지의`feeDelegatedSmartContractDeploy` 클래스: 스마트 컨트랙트 트랜잭션 수수료 납부자가 수수료를 지불할 때
  - `caver.transaction`패키지의`feeDelegatedSmartContractDeployWithRatio` 클래스: 스마트 컨트랙트 트랜잭션 수수료 납부자가 수수료를 일부 지불할 때


수수료 위임 트랜잭션을 통해 스마트 컨트랙트를 배포하기 위해서는  `SendOptions`의 `feeDelegation`와 `feePayer` 필드를 아래와 같이 정의하세요.

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
            // 예외 처리
        }
    }
```

`caver.contract`를 통해 스마트 컨트랙트를 배포할 때 발신자와 수수료 납부자가 서명을 따로하는 트랜잭션을 전송하고 싶은 경우 아래 코드를 참고하세요.

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
            // 예외 처리
        }
    }
```


스마트 컨트랙트를 배포하는 트랜잭션 타입에 따라, 아래와 같은 caver-java 클래스들을 사용합니다:
  - `caver.contract` 패키지의 `Contract` 클래스: 스마트 컨트랙트 트랜잭션 발신자가 수수료를 지불할 때
  - `caver.transaction`패키지의 `SmartContractExecution` 클래스: 스마트 컨트랙트 트랜잭션 발신자가 수수료를 지불할 때
  - `caver.transaction`패키지의`FeeDelegatedSmartContractExecution` 클래스: 스마트 컨트랙트 트랜잭션 수수료 납부자가 수수료를 지불할 때
  - `caver.transaction`패키지의`FeeDelegatedSmartContractExecutionWithRatio` 클래스: 스마트 컨트랙트 트랜잭션 수수료 납부자가 수수료를 일부 지불할 때


스마트 컨트랙트 함수 실행을 설명하기 위해 아래 코드에서는 "testValue" 문자열을 컨트랙트 함수 `set`의 입력 파라미터로 전달하고 컨트랙트 실행 트랜잭션을 보냅니다.

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
            // 예외 처리
        }
    }
```

수수료 위임 트랜잭션을 통해 스마트 컨트랙트를 배포하기 위해서는 `SendOptions`의 `feeDelegation`와 `feePayer` 필드를 아래와 같이 정의하세요.


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
            // 예외 처리
        }
    }
```

`caver.contract`를 통해 스마트 컨트랙트를 배포할 때 발신자와 수수료 납부자가 서명을 따로하는 트랜잭션을 전송하고 싶은 경우 아래 코드를 참고하세요:

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
            // 예외 처리
        }
    }
```

`컨트랙트` 인스턴스를 불러와 그 함수 중 하나를 호출(트랜잭션을 전송하지 않고 호출만 함)하는 예시는 컨트랙트의 `get` 함수를 호출하는 아래 코드에서 소개합니다.

```java
    private static final String ABIJson = "[{\"constant\":true,\"inputs\":[{\"name\":\"key\",\"type\":\"string\"}],\"name\":\"get\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"key\",\"type\":\"string\"},{\"name\":\"value\",\"type\":\"string\"}],\"name\":\"set\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]\n";


    public void callContractFunction() {
        Caver caver = new Caver(Caver.DEFAULT_URL);

        try {
            Contract contract = caver.contract.create(ABIJson, '0x{address in hex}');
            List<Type> result = contract.call("get", "test");
            System.out.println((String)result.get(0).getValue());
        } catch (IOException | TransactionException | ClassNotFoundException | NoSuchMethodException | InvocationTargetException | InstantiationException | IllegalAccessException e) {
            // 예외 처리
        }
    }
```

위 코드가 실행되면, 아래와 같은 값을 얻습니다.

```bash
testValue
```

자세한 내용은 [caver-java API](https://javadoc.io/doc/com.klaytn.caver/core/)를 참고해주세요


## IPFS<a id="ipfs"></a>

IPFS(InterPlanetary File System)는 파일, 웹사이트, 어플리케이션, 데이터를 저장, 접근하는 분산 파일 시스템입니다.

Caver를 사용해서 IPFS로 파일을 업로드/다운로드할 수 있습니다.


### IPFS 연결하기 <a id="connecting-with-ipfs"></a>

`caver.ipfs` 패키지의 `IPFS` 클래스는 `Caver`에 클래스 멤버 변수로 정의되어 있으며, IPFS를 통해 `Caver`와 상호작용할 수 있습니다.

`Caver` 인스턴스를 통해 `IPFS` 인스턴스를 사요아기 위해서는 `setIPFSNode()` 메서드를 호출하여 IPFS 노드에 연결해야 합니다.

`setIPFSNode()` 함수는 다음의 매개변수를 요구합니다.
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

### IPFS를 통해 파일 업로드하기<a id="uploading-a-file-through-ipfs"></a>

`IPFS`를 통해 파일을 업로드하기 위해서는 아래의 `add()`를 사용하세요.

이 함수는 업로드된 파일의 [CID(Content Identifier)](https://docs.ipfs.io/concepts/content-addressing/#content-addressing-and-cids)를 반환합니다.


```java
String filePath = "/path/to/file";
String cid = caver.ipfs.add(filePath);
System.out.println(cid);
```

해당 코드의 실행 결과는 아래와 같습니다.

```java
QmYzW1fXbapdxkZXMQeCYoDCjVc18H8tLfMfrxXRySmQiq
```

마찬가지로 바이트 배열도 업로드할 수 있습니다.

```java
String text = "sample data";
byte[] data = text.getBytes();

String cid = caver.ipfs.add(data);
System.out.println(cid)
```

해당 코드의 실행 결과는 아래와 같습니다.

```java
QmYzW1fXbapdxkZXMQeCYoDCjVc18H8tLfMfrxXRySmQiq
```

### IPFS에서 파일 다운로드하기<a id="downloading-a-file-from-ipfs"></a>

`IPFS`에서 파일을 다운로드하기 위해서는 아래의 `get()`를 사용하세요.

이 함수는 파일의 CID를 다운받을 것을 요구합니다.

```java
String cid = "QmYzW1fXbapdxkZXMQeCYoDCjVc18H8tLfMfrxXRySmQiq";
byte[] content = caver.ipfs.get(cid);
```


### CID와 멀티해시 변환<a id="conversion-between-cid-and-multihash"></a>

`toHex()`를 사용해 CID를 [Multihash](https://multiformats.io/multihash/)로 변환할 수 있습니다.

CID는 멀티해시의 Base58 인코딩된 값입니다. `toHex()`는 CID 디코딩하고 해당하는 멀티해시를 반환합니다.

```java
String cid = "QmYtUc4iTCbbfVSDNKvtQqrfyezPPnFvE33wFmutw9PBBk";
String multihash = caver.ipfs.toHex(cid);
System.out.println(multihash);
```

해당 코드의 실행 결과는 아래와 같습니다.

```java
0x12209cbc07c3f991725836a3aa2a581ca2029198aa420b9d99bc0e131d9f3e2cbe47
```

멀티해시를 CID로 변환하기 위해서는 `fromHex()`를 사용하세요.

```java
String multihash = "0x12209cbc07c3f991725836a3aa2a581ca2029198aa420b9d99bc0e131d9f3e2cbe47";
String cid = caver.ipfs.fromHex(multihash);
System.out.println(cid);
```

해당 코드의 실행 결과는 아래와 같습니다.

```java
QmYtUc4iTCbbfVSDNKvtQqrfyezPPnFvE33wFmutw9PBBk
```

## KCT 인터페이스 식별<a id="detect kct interface"></a>

[KIP-7](https://kips.klaytn.com/KIPs/kip-7), [KIP-17](https://kips.klaytn.com/KIPs/kip-17), [KIP-37](https://kips.klaytn.com/KIPs/kip-37)와 같은 KCT (Klaytn Compatible Token; Klaytn 호환 토큰) 컨트랙트는 다양한 인터페이스를 정의, 제공하며, [KIP-13](https://kips.klaytn.com/KIPs/kip-13)를 사용하면 어떤 컨트랙트가 KCT 명세에 부합하는지 여부, 어떤 인터페이스를 구현하는지를 확인할 수 있습니다.

[KIP-13](https://kips.klaytn.com/KIPs/kip-13)는 Caver v1.5.7에서 구현되었습니다. `detectInterface()`를 사용해 모든 KCT 컨트랙트 클래스 (`KIP7`, `KIP17`, `KIP37`)의 인터페이스를 식별할 수 있습니다.

### KIP-7 인터페이스 식별 <a id="detecting-kip-7-interfaces"></a>

KIP-7 인터페이스를 식별하기 위해 `KIP7` 클래스의 `detectInterface()`를 사용할 수 있습니다. KIP-7 인터페이스 식별자와, 그 인터페이스가 지원되는 지 여부에 대한 boolean 간의 매핑을 반환합니다.

`detectInterface()`는 정적, 그리고 인스턴스 메서드 둘 다 지원하기 때문에, 필요에 맞는 메서드를 선택하여 사용할 수 있습니다.

`detectInterface()`를 통해 식별한 `KIP7`에 대한 인터페이스는 아래와 같습니다.

| 인터페이스         | KIP-13 Identifier |
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

// 정적 메서드 사용
Map<String, Boolean> resultStatic = caver.kct.kip7.detectInterface(caver, contractAddress);
String resultJson = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(resultStatic);
System.out.println(resultJson);

//인스턴스 메서드 사용
KIP7 kip7 = caver.kct.kip7.create(contractAddress);
Map<String, Boolean> resultInstance = kip7.detectInterface();
String resultJson = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(resultInstance);
System.out.println(resultJson);
```

해당 코드의 실행 결과는 아래와 같습니다.

```java
{
  "IKIP7Metatdata" : true,
  "IKIP7Burnable" : true,
  "IKIP7" : true,
  "IKIP7Pausable" : true,
  "IKIP7Mintable" : true
}
```


### KIP-17 인터페이스 식별 <a id="detecting-kip-17-interfaces"></a>

KIP-17 토큰 컨트랙트에 구현된 인터페이스를 식별하기 위해 `KIP17` 클래스의 `detectInterface()`를 사용할 수 있습니다. KIP-17 인터페이스 식별자와, 그 인터페이스가 지원 간의 매핑을 반환합니다.

`detectInterface()`는 정적, 그리고 인스턴스 메서드 둘 다 지원하기 때문에, 필요에 맞는 메서드를 선택하여 사용할 수 있습니다.

`detectInterface()`를 통해 식별한 `KIP17`에 대한 인터페이스는 아래와 같습니다.

| 인터페이스                  | KIP-13 Identifier |
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

// 정적 메서드 사용
Map<String, Boolean> resultStatic = caver.kct.kip17.detectInterface(caver, contractAddress);
String resultJson = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(resultStatic);
System.out.println(resultJson);

// 인스턴스 메서드 사용
KIP17 kip17 = caver.kct.kip17.create(contractAddress);
Map<String, Boolean> resultInstance = kip17.detectInterface();
String resultJson = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(resultInstance);
System.out.println(resultJson);
```

해당 코드의 실행 결과는 아래와 같습니다.

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

### KIP-37 인터페이스 식별 <a id="detecting-kip-37-interfaces"></a>

KIP-37 토큰 컨트랙트에 구현된 인터페이스를 식별하기 위해 `KIP37` 클래스의 `detectInterface()`를 사용할 수 있습니다. KIP-37 인터페이스 식별자와, 그 인터페이스가 지원 간의 매핑을 반환합니다.

`detectInterface()`는 정적, 그리고 인스턴스 메서드 둘 다 지원하기 때문에, 필요에 맞는 메서드를 선택하여 사용할 수 있습니다.

`detectInterface()`를 통해 식별한 `KIP37`에 대한 인터페이스는 아래와 같습니다.

| 인터페이스          | KIP-13 Identifier |
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

// 정적 메서드 사용
Map<String, Boolean> resultStatic = caver.kct.kip37.detectInterface(contractAddress);
String resultJson = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(resultStatic);
System.out.println(resultJson);

// 인스턴스 메서드 사용
KIP37 kip37 = caver.kct.kip37.create(contractAddress);
Map<String, Boolean> resultInstance = kip37.detectInterface();
String resultJson = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(resultInstance);
System.out.println(resultJson);
```

해당 코드의 실행 결과는 아래와 같습니다.

```java
{
  "IKIP37Metatdata" : true,
  "IKIP37Burnable" : true,
  "IKIP37" : true,
  "IKIP37Pausable" : true,
  "IKIP37Mintable" : true
}
```
