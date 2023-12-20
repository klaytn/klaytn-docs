# 시작하기

## 전제 조건 <a id="prerequisites"></a>

### 종속성 <a id="dependency"></a>

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
implementation 'com.klaytn.caver:core:1.4.0'
```

Android 종속성을 사용하려면 버전 문자열 끝에 -android를 추가하면 됩니다. \(예: 1.0.1-android\)

JSON-RPC 요청 및 응답에 대한 자세한 내용을 보려면 프로젝트에 [LOGBack](https://logback.qos.ch/) 의존성을 포함하세요. 아래는 Gradle 빌드 파일 예시입니다. Maven에도 해당 종속성을 추가할 수 있습니다. caver-java는 [SLF4J](http://www.slf4j.org/) 로깅 파사드를 사용하므로, LOGBack 대신 원하는 로깅 프레임워크로 전환할 수 있습니다.

```groovy
implementation "ch.qos.logback:logback-classic:1.2.3"
```

**참고**: 중앙 리포지토리에는 RC, Android, Java 버전이 함께 나열되어 있습니다. 와일드카드를 사용하여 버전을 가져오는 경우 플랫폼에 적합하지 않은 버전을 사용하고 있을 수 있습니다.

### 설치 <a id="installation"></a>

스마트 컨트랙트와 관련된 트랜잭션을 생성하려면 먼저 Solidity 컴파일러와 caver-java 명령줄 도구를 설치해야 합니다.

#### Solidity 컴파일러 <a id="solidity-compiler"></a>

Solidity 컴파일러는 [프로젝트 문서](http://solidity.readthedocs.io/en/develop/installing-solidity.html)의 지침에 따라 로컬에 설치할 수 있습니다. Klaytn은 Solidity 버전 0.4.24 또는 0.5.6을 설치할 것을 권장합니다. macOS 사용자라면 Homebrew를 통해 해당 버전을 설치할 수 있습니다:

```text
$ brew install klaytn/klaytn/solidity@0.4.24  # version 0.4.24
$ brew install klaytn/klaytn/solidity@0.5.6   # version 0.5.6
```

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

**설치 \(기타\)**

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

## 계정 관리하기 <a id="managing-accounts"></a>

### 계정 만들기 <a id="creating-an-account"></a>

트랜잭션에 서명하려면 EC \(타원 곡선\) 키 쌍 또는 Klaytn 키스토어 파일이 있어야 합니다.

#### EC 키 쌍 사용 <a id="using-an-ec-key-pair"></a>

아래와 같이 EC 키 쌍을 사용하여 클레이튼 계정을 만들 수 있습니다:

```java
KlayCredentials credentials = KlayCredentials.create(Keys.createEcKeyPair());
String privateKey = Numeric.toHexStringWithPrefix(credentials.getEcKeyPair().getPrivateKey()); 
String address = credentials.getAddress();
```

#### 키스토어 파일 사용 <a id="using-a-keystore-file"></a>

키스토어 파일로 새 계정을 생성하고 싶다면 [클레이튼 지갑]에서 새 키스토어 파일을 생성할 수도 있습니다):

```java
KlayWalletUtils.generateNewWalletFile(
        <yourPassword>,
        new File(<walletFilePath>)
);
```

아래와 같이 키스토어 파일을 사용하여 계정을 로드합니다:

```java
KlayCredentials credentials = KlayWalletUtils.loadCredentials(<password>, <walletFilePath>);
```

## 트랜잭션 보내기 <a id="sending-a-transaction"></a>

### Baobab Faucet를 통해 KLAY받기 <a id="getting-klay-via-baobab-faucet"></a>

계정 생성 후, [https://baobab.wallet.klaytn.foundation/](https://baobab.wallet.klaytn.foundation/)에서 Baobab Faucet를 통해 Baobab 테스트넷에 사용할 수 있는 Baobab 테스트넷 KLAY를 받을 수 있습니다. 받은 테스트넷 KLAY는 추후 트랜잭션 수수료로 사용됩니다.

### Baobab에 연결하기 <a id="connecting-to-baobab"></a>

아래와 같이 Baobab 네트워크에 연결할 수 있습니다:

```java
Caver caver  = Caver.build(https://your.baobab.en.url:8651);
```

### 밸류 전송 트랜잭션 보내기 <a id="sending-a-value-transfer-transaction"></a>

`Caver` 인스턴스를 얻고 KLAY가 있는 계정을 생성한 후 아래와 같이 특정 주소\(`0xe97f27e9a5765ce36a7b919b1cb6004c7209217e`\)로 가스 한도 `BigInteger.valueOf(100_000)`로 1peb를 전송할 수 있습니다:

`TransactionManager`는 트랜잭션 유형의 복잡성을 숨기기 위해 도입되었습니다. 예를 들어, `FeeDelegatedValueTransferTransaction` 객체는 `ValueTransferTransaction` 객체에서 변형될 수 있습니다. 자세한 내용은 [수수료 위임]을 참조하세요. `TransactionManager`는 수수료 위임 외에도 `GetNonceProcessor`, `ErrorHandler`, `TransactionReceiptProcessor`와 함께 사용할 수 있습니다.

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

`ValueTransfer` 클래스를 사용하면 트랜잭션을 더 쉽게 작성하고 전송할 수 있습니다. `ValueTransfer` 클래스는 위의 과정을 아래와 같이 간단하게 만들어주기 때문입니다:

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

### 영수증 확인 <a id="checking-receipts"></a>

`sendFunds`를 통해 트랜잭션을 전송하면 caver-java는 기본적으로 트랜잭션 영수증을 받으려고 시도합니다. 영수증을 받으면 콘솔에서 다음과 같은 로그를 확인할 수 있습니다.

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

이 영수증에서 트랜잭션 실행 상태를 확인할 수 있습니다. 영수증의 `status` 필드가 "0x1"이면 트랜잭션이 성공적으로 처리되었다는 뜻입니다. 그렇지 않으면 트랜잭션이 실패한 것입니다. 자세한 오류 메시지는 `txError` 필드에 표시됩니다. 자세한 내용은 [txError]를 참조하세요.

## 다른 트랜잭션 유형 전송하기 <a id="sending-other-transaction-types"></a>

### 계정 업데이트 <a id="account-update"></a>

주어진 계정의 키를 새 [AccountKeyPublic] 키로 업데이트하려는 경우:

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

계정 키는 계정과 관련된 키 구조를 나타냅니다. 클레이튼 계정 키에 대한 자세한 내용과 종류는 [AccountKey]를 참고하세요.

### 스마트 컨트랙트 <a id="smart-contract"></a>

caver-java는 스마트 컨트랙트 래퍼 코드의 자동 생성을 지원합니다. 이 래퍼를 사용하면 스마트 컨트랙트를 쉽게 배포하고 실행할 수 있습니다. 래퍼 코드를 생성하기 전에 먼저 스마트 컨트랙트를 컴파일해야 합니다. 참고: 컴퓨터에 Solidity 컴파일러가 설치되어 있는 경우에만 작동합니다. [Solidity 컴파일러]를 참조하세요.

```text
$ solc <contract>.sol --bin --abi --optimize -o <output-dir>/
```

그런 다음 caver-java의 [명령줄 도구]를 사용하여 래퍼 코드를 생성합니다.

```text
$ caver-java solidity generate -b <smart-contract>.bin -a <smart-contract>.abi -o <outputPath> -p <packagePath>
```

위 명령은 `<smartContract>`.java를 출력합니다. 래퍼 코드를 생성한 후 아래와 같이 스마트 컨트랙트를 배포할 수 있습니다:

```java
<smartContract> contract = <smartContract>.deploy(
        caver, credentials, <chainId>, <gasProvider>,
        <param1>, ..., <paramN>).send();
```

스마트 컨트랙트가 배포된 후 아래와 같이 스마트 컨트랙트 인스턴스를 생성할 수 있습니다:

```java
<smartContract> contract = <smartContract>.load(
        <deployedContractAddress>, caver, credentials, <chainId>, <gasProvider>
);
```

스마트 컨트랙트로 거래하려면:

```java
KlayTransactionReceipt.TransactionReceipt transactionReceipt = contract.<someMethod>(
        <param1>,
        ...).send();
```

스마트 컨트랙트를 호출하려면:

```java
<type> result = contract.<someMethod>(<param1>, ...).send();
```

#### 예시 <a id="example"></a>

이 섹션에서는 Baobab 테스트넷에서 스마트 컨트랙트를 배포하고 실행하는 방법을 설명합니다. 이 예제에서는 스마트 컨트랙트 [ERC20Mock](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/mocks/ERC20Mock.sol)을 사용합니다. 컨트랙트 배포에 실패하고 빈 컨트랙트 주소가 반환되면 RuntimeException이 발생합니다.

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

배포된 ERC20Mock 컨트랙트의 인스턴스를 생성합니다:

```java
ERC20Mock erc20Mock = ERC20Mock.load(
        deployedContractAddress, 
        caver, credentials, 
        ChainId.BAOBAB_TESTNET,  // chainId 
        new DefaultGasProvider()  // gasProvider
);
```

토큰 10개를 지정된 주소 \(예: `0x2c8ad0ea2e0781db8b8c9242e07de3a5beabb71a`\)로 전송하는 경우, 다음 코드를 사용하세요:

```java
KlayTransactionReceipt.TransactionReceipt transactionReceipt = erc20Mock.transfer(
        "0x2c8ad0ea2e0781db8b8c9242e07de3a5beabb71a",  // toAddress
        BigInteger.valueOf(10)  // value
).send();
```

받는 사람의 잔액 \(예: `0x2c8ad0ea2e0781db8b8c9242e07de3a5beabb71a`\)을 확인하려면 아래 코드를 사용하세요:

```java
BigInteger balance = erc20Mock.balanceOf(
        "0x2c8ad0ea2e0781db8b8c9242e07de3a5beabb71a"  // owner
).send();
```

### 수수료 위임 <a id="fee-delegation"></a>

클레이튼은 서비스 제공자가 사용자 대신 트랜잭션 수수료를 지불할 수 있는 [수수료 위임] 기능을 제공합니다.

#### 밸류 전송 <a id="value-transfer"></a>

클라이언트 측에서 트랜잭션을 개시한 클라이언트는 다음과 같이 수수료 위임 밸류 전송 트랜잭션을 생성합니다: 발신자가 기본 `ValueTransferTransaction` 객체를 생성한 다음, 두 번째 매개변수가 `true`로 설정된 경우 [`transactionManager.sign()`](https://static.javadoc.io/com.klaytn.caver/core/1.0.2/com/klaytn/caver/tx/manager/TransactionManager.html#sign-com.klaytn.caver.tx.model.TransactionTransformer-boolean-)가 서명된 `FeeDelegatedValueTransferTransaction` 객체를 반환합니다.

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

서명된 트랜잭션인 `senderRawTransaction`이 생성됩니다. 이제 발신자는 트랜잭션을 트랜잭션 수수료를 대신 지불할 수수료 납부자에게 전달합니다. 발신자와 수수료 납부자 간의 트랜잭션 전송은 Klaytn 네트워크에서 수행되지 않습니다. 프로토콜은 직접 정의해야 합니다.

수수료 납부자가 발신자로부터 트랜잭션을 받은 후, 수수료 납부자는 다음과 같이 `FeePayerManager` 클래스를 사용하여 트랜잭션을 전송할 수 있습니다. `FeePayerManager.executeTransaction()`은 받은 트랜잭션에 수수료 납부자의 개인키로 서명하고 트랜잭션을 Klaytn 네트워크에 전송합니다.

```java
KlayCredentials feePayer = KlayWalletUtils.loadCredentials(<password>, <walletfilePath>);
FeePayerManager feePayerManager = new FeePayerManager.Builder(caver, feePayer)
        .setChainId(ChainId.BAOBAB_TESTNET)
        .build();
feePayerManager.executeTransaction(senderRawTransaction);
```

#### 스마트 컨트랙트 실행 <a id="smart-contract-execution"></a>

수수료 위임 스마트 콘트랙트 실행과 위의 수수료 위임 밸류 전송의 차이점은 스마트 콘트랙트의 함수를 호출하기 위해 입력 데이터가 필요하다는 것입니다. 발신자는 아래와 같이 수수료 위임 스마트 컨트랙트 실행 트랜잭션을 생성할 수 있습니다. 참고로 두 번째 파라미터에 `true`를 전달하면 [`transactionManager.sign()`](https://static.javadoc.io/com.klaytn.caver/core/1.0.2/com/klaytn/caver/tx/manager/TransactionManager.html#sign-com.klaytn.caver.tx.model.TransactionTransformer-boolean-)는 `TxTypeFeeDelegatedSmartContractExecution` 객체를 반환합니다. 아래 예시는 [스마트 컨트랙트]에 설명된 [ERC20Mock](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/mocks/ERC20Mock.sol) 컨트랙트의 `transfer` 메서드를 호출하는 예제입니다.

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

`senderRawTransaction`을 받은 후, `FeePayerManager`를 사용한 나머지 프로세스는 위의 [수수료 위임 밸류 전송]에서 살펴본 것과 동일합니다:

```java
KlayCredentials feePayer = KlayWalletUtils.loadCredentials(<password>, <walletfilePath>);
FeePayerManager feePayerManager = new FeePayerManager.Builder(caver, feePayer).build();
feePayerManager.executeTransaction(senderRawTransaction);
```
## 다양한 계정키 유형 사용 <a id="using-various-account-key-type"></a>

caver-java는 플랫폼에서 지원하는 다양한 유형의 [AccountKey]를 지원하기 위해 새로운 클래스를 도입합니다. 이 기능은 버전 1.2.0부터 지원됩니다.

### AccountKey <a id="account-key"></a>

클레이튼 플랫폼에서 계정키를 갱신하기 위해 caver-java는 `AccountKey` 인터페이스를 제공합니다. 다음은 `AccountKey` 구현, `AccountKeyPublic`, `AccountKeyWeightedMultiSig`, `AccountKeyRoleBased`에 대해 설명합니다.
계정을 업데이트하는 방법은 [AccountUpdate](#account-update)를 참조하세요.

### AccountKeyPublic <a id="account-key-public"></a>

`AccountKeyPublic`은 하나의 공개 키로 `AccountKey`를 구현한 것입니다.
다음과 같이 만들 수 있습니다:

```java
ECKeyPair newKeyPair = Keys.createEcKeyPair();
AccountKeyPublic newAccountKey = AccountKeyPublic.create(newKeyPair.getPublicKey());
```

`AccountKeyPublic`으로 업데이트된 계정을 사용하려면 다음과 같이 `KlayCredentials`를 생성해야 합니다:

```java
KlayCredentials validCredentails = KlayCredentials.create(newKeyPair, oldCredentials.getAddress());

// Because the account address is decoupled from the AccountKeyPublic (public key), you can't use the account if you create the credentials without address as below.
KlayCredentials invalidCredentails = KlayCredentials.create(newKeyPair);
```

### AccountKeyWeightedMultiSig <a id="account-key-weighted-multi-sig"></a>

`AccountKeyWeightedMultiSig`는 다양한 가중치를 가진 여러 개의 공개키를 포함하는 계정 키입니다. `AccountKeyWeightedMultiSig`는 계정을 사용하기 위해 서명해야 하는 키의 가중치의 합계인 임계값도 정의합니다. 지원되는 키의 최대 개수는 10개입니다. `AccountKeyWeightedMultiSig`은 아래와 같이 생성할 수 있습니다:

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

`AccountKeyWeightedMultiSig`로 업데이트된 계정을 사용하려면 다음과 같이 `KlayCredentials`를 생성하면 됩니다:

```java
List<ECKeyPair> transactionECKeyPairList = new ArrayList<>();

transactionECKeyPairList.add(ecKeyPair1);
transactionECKeyPairList.add(ecKeyPair2);

KlayCredentials newCredentails = KlayCredentials.create(transactionECKeyPairList, address);
```

### AccountKeyRoleBased <a id="account-key-role-based"></a>

`AccountKeyRoleBased`는 `AccountKey`의 목록입니다. 각 `AccountKey`는 위치에 따라 특정 역할에 할당됩니다. AccountKey는 `AccountKeyPublic`, `AccountKeyWeightedMultiSig` 또는 `AccountKeyFail`이 될 수 있습니다. 특정 역할에 대해 `AccountKeyNil`을 사용하면 해당 역할에 대한 키가 업데이트되지 않고 기존 AccountKey가 사용됩니다. `AccountKeyFail`을 사용하면 역할에 대한 서명이 항상 실패하므로 AccountKeyFail을 사용할 때 주의해야 합니다.

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

`AccountKeyRoleBased`로 업데이트된 계정을 사용하려면 다음과 같이 `KlayCredentials`를 생성하면 됩니다:

```java
List<ECKeyPair> transactionECKeyPairList = Arrays.asList(newKeyPair1);
List<ECKeyPair> updateECKeyPairList = Arrays.asList(newKeyPair2);
List<ECKeyPair> feePayerECKeyPairList = Arrays.asList(newKeyPair3);

KlayCredentials newCredentails = KlayCredentials.create(transactionECKeyPairList, updateECKeyPairList, feePayerECKeyPairList, address);
```

계정에 특정 역할에 대한 키가 없는 경우 빈 List를 인수로 전달합니다.

```java
List<ECKeyPair> transactionECKeyPairList = Collections.emptyList();
List<ECKeyPair> updateECKeyPairList = Arrays.asList(newKeyPair2);
List<ECKeyPair> feePayerECKeyPairList = Collections.emptyList();

KlayCredentials newCredentails = KlayCredentials.create(transactionECKeyPairList, updateECKeyPairList, feePayerECKeyPairList, address);
```

계정에 특정 역할에 대한 여러 개의 키가 있는 경우 다음과 같이 여러 개의 키를 전달할 수 있습니다.

```java
List<ECKeyPair> transactionECKeyPairList = Collections.emptyList();
List<ECKeyPair> updateECKeyPairList = Arrays.asList(newKeyPair2-1, newKeyPair2-2, newKeyPair2-3);
List<ECKeyPair> feePayerECKeyPairList = Collections.emptyList();

KlayCredentials newCredentails = KlayCredentials.create(transactionECKeyPairList, updateECKeyPairList, feePayerECKeyPairList, address);
```

## 서명자가 여러 명인 트랜잭션 보내기 <a id="sending-a-transaction-with-multiple-signers"></a>

계정에 AccountKeyMultiSig 또는 AccountKeyRoleBased가 있는 경우, 각 키를 다른 사람이 관리할 수 있습니다.

이 섹션에서는 서명자가 여러 명인 경우 서명을 수집하고 트랜잭션을 전송하는 방법을 설명합니다.

### 순차 발신자 서명 <a id="sequential-sender-signing"></a>

`rawTransaction`에는 `txSignatures`와 `feePayerSignatures`를 모두 포함하는 RLP 인코딩된 트랜잭션이 있습니다. 수수료 위임 트랜잭션인 경우에만 `feePayerSignature`가 포함됩니다.

수수료 납부자가 없는 경우, 거래에 반복적으로 서명하고 실행하는 과정은 세 부분으로 나눌 수 있습니다. 1. 트랜잭션을 RLP 인코딩하고 서명자에게 rawTransaction 형태로 보냅니다. 2. 서명자는 수신한 RawTransaction에 대해 자신의 키로 서명합니다. 3. 서명된 rawTransaction을 EN으로 보냅니다. 서명자가 여러 명일 경우 2단계를 반복할 수 있습니다.

```java
//// 1. Alice creates a transaction, signs it, and sends it to Bob.
//// Alice Side
ValueTransferTransaction transactionTransformer = ValueTransferTransaction.create(from, to, BigInteger.ONE, GAS_LIMIT);

TransactionManager transactionManager_alice = new TransactionManager.Builder(caver, senderCredential_alice)
                    .setTransactionReceiptProcessor(new PollingTransactionReceiptProcessor(caver, 1000, 10))
                    .setChaindId(LOCAL_CHAIN_ID)
                    .build();

String rawTransaction_signed_alice = transactionManager_alice.sign(transactionTransformer).getValueAsString();

//// 2. Bob signs the received transaction and sends it to Charlie.
//// Bob Side
            TransactionManager transactionManager_bob = new TransactionManager.Builder(caver, senderCredential_bob)
                    .setTransactionReceiptProcessor(new PollingTransactionReceiptProcessor(caver, 1000, 10))
                    .setChaindId(LOCAL_CHAIN_ID)
                    .build();

String rawTransaction_signed_alice_and_bob = transactionManager_bob.sign(rawTransaction_signed_alice).getValueAsString();

//// 3. Charlie signs the received transaction and sends it to Klaytn EN.
//// Charlie Side
TransactionManager transactionManager_charlie = new TransactionManager.Builder(caver, senderCredential_charlie)
                    .setTransactionReceiptProcessor(new PollingTransactionReceiptProcessor(caver, 1000, 10))
                    .setChaindId(LOCAL_CHAIN_ID)
                    .build();

KlayTransactionReceipt.TransactionReceipt transactionReceipt = transactionManager_charlie.executeTransaction(rawTransaction_signed_alice_and_bob);
```

### 순차적 수수료 납부자 서명 <a id="sequential-fee-payer-signing"></a>

수수료 납부자 서명은 순차적으로 추가할 수도 있습니다. `FeePayerManager`로 서명하면 트랜잭션에 `feePayerSignatures`이 누적됩니다. 서명 순서는 중요하지 않습니다. `TransactionManager`로 서명하면 `txSignature`가 추가됩니다. `FeePayerManger`로 서명하면 Raw 트랜잭션에 `feePayerSignatures`가 추가됩니다.

```java
//// 1. Bob receives a transaction from Alice and signs the transaction as a fee payer.
//// Bob Side
FeePayerManager feePayerManager_bob = new FeePayerManager.Builder(caver, feePayerCredentials_bob)
                    .setTransactionReceiptProcessor(new PollingTransactionReceiptProcessor(caver, 1000, 10))
                    .setChainId(LOCAL_CHAIN_ID)
                    .build();

String rawTransaction_signed_alice_and_bob = feePayerManager_bob.sign(rawTransaction_signed_alice).getValueAsString();

//// 2. Charlie signs the received transaction and sends it to Klaytn EN.
//// Charlie Side
FeePayerManager feePayerManager_charlie = new FeePayerManager.Builder(caver, feePayerCredentials_charlie)
                    .setTransactionReceiptProcessor(new PollingTransactionReceiptProcessor(caver, 1000, 10))
                    .setChainId(LOCAL_CHAIN_ID)
                    .build();

KlayTransactionReceipt.TransactionReceipt transactionReceipt =  feePayerManager_charlie.executeTransaction(rawTransaction_signed_alice_and_bob);
```

## Thanks to <a id="thanks-to"></a>

[web3j](https://github.com/web3j/web3j) 프로젝트에서 영감을 얻었습니다.


[클레이튼 지갑]: ../../../build/tools/wallets/klaytn-wallet.md
[txError]: ../../transaction-error-codes.md
[AccountKeyPublic]: ../../../learn/accounts.md#accountkeypublic
[AccountKey]: ../../../learn/accounts.md#account-key
[Solidity 컴파일러]: #solidity-compiler
[명령줄 도구]: #command-line-tool
[수수료 위임]: ../../../learn/transactions/transactions.md#fee-delegation
[스마트 컨트랙트]: #smart-contract
[수수료 위임 밸류 전송]: #value-transfer

