# Getting Started \(~v1.4.0\)

## 준비 사항 <a id="prerequisites"></a>

### 의존성 <a id="dependency"></a>

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

안드로이드 의존성을 사용하려면, 버전 문자열 끝에 -android를 추가하세요. \(가령 1.0.1-android\)

JSON-RPC 요청 및 응답에 대한 세부 사항을 보려면, [LOGBack](https://logback.qos.ch/) 의존성을 프로젝트에 포함하세요. 아래는 Gradle 빌드 파일 예제입니다. Maven에도 의존성을 추가할 수 있습니다. caver-java가 [SLF4J](https://www.slf4j.org/) 로깅 퍼사드(logging facade)를 사용하기 때문에, LOGBack 대신 선호하는 로깅 프레임워크로 전환할 수 있습니다.

```groovy
implementation "ch.qos.logback:logback-classic:1.2.3"
```

**참고**: 중앙 저장소에는 RC, Android 및 Java 버전이 함께 나열됩니다. 와일드 카드를 사용하여 버전을 얻어오면 플랫폼에 적합하지 않은 버전을 사용하게 될 수 있습니다.

### 설치 <a id="installation"></a>

스마트 컨트랙트와 관련된 트랜잭션을 생성하려면 먼저 솔리디티 컴파일러와 caver-java 커맨드라인 도구를 설치해야 합니다.

#### 솔리디티 컴파일러 <a id="solidity-compiler"></a>

[프로젝트 문서](http://solidity.readthedocs.io/en/develop/installing-solidity.html)의 지침에 따라 솔리디티 컴파일러를 로컬로 설치할 수 있습니다. Klaytn은 솔리디티 버전을 0.4.24 또는 0.5.6으로 설치할 것을 권장합니다. macOS 사용자인 경우 Homebrew를 통해 버전을 지정해서 설치할 수 있습니다:

```text
$ brew install klaytn/klaytn/solidity@0.4.24  # version 0.4.24
$ brew install klaytn/klaytn/solidity@0.5.6   # version 0.5.6
```

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

## 계정 관리 <a id="managing-accounts"></a>

### 계정 생성 <a id="creating-an-account"></a>

트랜잭션에 서명하려면 EC \(Elliptic Curve\) 키 쌍 또는 Klaytn 키스토어 파일이 있어야 합니다.

#### EC 키 쌍 사용 <a id="using-an-ec-key-pair"></a>

아래와 같이 EC 키 쌍을 사용하여 Klaytn 계정을 만들 수 있습니다:

```java
KlayCredentials credentials = KlayCredentials.create(Keys.createEcKeyPair());
String privateKey = Numeric.toHexStringWithPrefix(credentials.getEcKeyPair().getPrivateKey()); 
String address = credentials.getAddress();
```

#### 키스토어 파일 사용 <a id="using-a-keystore-file"></a>

If you want to create a new account with a keystore file \(you can also create a new keystore file in [Klaytn Wallet](https://github.com/ground-x/klaytn-docs/tree/01611e64b6eb1715a79681389e1b0cc482622683/docs/bapp/toolkit/klaytn-wallet.md)\):

```java
KlayWalletUtils.generateNewWalletFile(
        <yourPassword>,
        new File(<walletFilePath>)
);
```

아래와 같이 키스토어 파일을 사용하여 계정을 로드하려면:

```java
KlayCredentials credentials = KlayWalletUtils.loadCredentials(<password>, <walletFilePath>);
```

## 트랜잭션 전송하기 <a id="sending-a-transaction"></a>

### Baobab Faucet을 통해 KLAY 받기 <a id="getting-klay-via-baobab-faucet"></a>

계정을 만든 후 [https://baobab.wallet.klaytn.com/](https://baobab.wallet.klaytn.com/)에 있는 Baobab Faucet을 통해 Baobab 테스트넷에 대한 약간의 Baobab 테스트넷 KLAY를 받을 수 있습니다. 수신된 테스트넷 KLAY는 나중에 트랜잭션 수수료로 사용될 것입니다.

### Baobab 연결 <a id="connecting-to-baobab"></a>

Baobab 테스트넷에 연결하기 위해 Klaytn 공개 EN \([https://api.baobab.klaytn.net:8651](https://api.baobab.klaytn.net:8651)\)을 사용할 수 있습니다.

```java
Caver caver  = Caver.build(Caver.BAOBAB_URL);  // Caver.BAOBAB_URL = https://api.baobab.klaytn.net:8651
```

### 송금 트랜잭션 전송 <a id="sending-a-value-transfer-transaction"></a>

`Caver` 인스턴스를 얻고 약간의 KLAY가 있는 계정을 만든 후, 아래처럼 가스 한도 `BigInteger.valueOf(100_000)`로 특정 주소\(`0xe97f27e9a5765ce36a7b919b1cb6004c7209217e`\)에게 1 peb를 보낼 수 있습니다.

`TransactionManager`는 트랜잭션 타입의 복잡성을 숨기기 위해 도입되었습니다. 예를 들어, `FeeDelegatedValueTransferTransaction` 객체는 `ValueTransferTransaction` 객체로 변환될 수 있습니다. For more details, see [Fee Delegation](https://github.com/ground-x/klaytn-docs/tree/01611e64b6eb1715a79681389e1b0cc482622683/docs/bapp/klaytn/design/transactions/README.md#fee-delegation). 수수료 위임 외에도 `TransactionManager`는 `GetNonceProcessor`, `ErrorHandler`, `TransactionReceiptProcessor`와 함께 사용될 수 있습니다.

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

`ValueTransfer` 클래스를 사용하는 경우, 더 쉽게 트랜잭션을 구성하고 전송할 수 있습니다. 이는 `ValueTransfer` 클래스가 위와 같은 프로세스를 아래와 같이 간단하게 만들기 때문입니다:

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

### 영수증 확인<a id="checking-receipts"></a>

`sendFunds`을 통해 트랜잭션을 보내는 경우, caver-java는 기본적으로 트랜잭션 영수증을 받으려 합니다. 영수증을 받으면 콘솔에 다음 로그가 표시됩니다.

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

이 영수증에서 트랜잭션 실행 상태를 확인할 수 있습니다. 영수증의 '상태'필드가 "0x1"이면 트랜잭션이 성공적으로 처리되었음을 의미합니다. 그렇지 않으면 트랜잭션이 실패한 것입니다. 자세한 오류 메시지는 `txError` 필드에 표시됩니다. For more detail, see [txError](https://github.com/ground-x/klaytn-docs/tree/01611e64b6eb1715a79681389e1b0cc482622683/docs/bapp/sdk/json-rpc/transaction-error-codes.md).

## 다른 트랜잭션 타입 보내기 <a id="sending-other-transaction-types"></a>

### 계정 업데이트 <a id="account-update"></a>

If you want to update the key of the given account to a new [AccountKeyPublic](https://github.com/ground-x/klaytn-docs/tree/01611e64b6eb1715a79681389e1b0cc482622683/docs/bapp/klaytn/design/accounts.md#accountkeypublic) key:

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

계정 키는 계정과 연결된 키 구조를 나타냅니다. To get more details and types about the Klaytn account key, please read [AccountKey](https://github.com/ground-x/klaytn-docs/tree/01611e64b6eb1715a79681389e1b0cc482622683/docs/bapp/klaytn/design/accounts.md#account-key).

### 스마트 컨트랙트 <a id="smart-contract"></a>

caver-java는 스마트 컨트랙트 래퍼 코드의 자동 생성을 지원합니다. 랩퍼를 사용하면 스마트 컨트랙트를 쉽게 배포하고 실행할 수 있습니다. 랩퍼 코드를 생성하기 전, 먼저 스마트 컨트랙트를 컴파일해야 합니다. 참고: 컴퓨터에 솔리디티 컴파일러가 설치된 경우에만 작동합니다. See [Solidity Compiler](getting-started_1.4.0.md#solidity-compiler).

```text
$ solc <contract>.sol --bin --abi --optimize -o <output-dir>/
```

Then, generate the wrapper code using caver-java’s [command-line tool](getting-started_1.4.0.md#command-line-tool).

```text
$ caver-java solidity generate -b <smart-contract>.bin -a <smart-contract>.abi -o <outputPath> -p <packagePath>
```

위의 명령은 `<smartContract>`.java를 출력할 것입니다. 랩퍼 코드를 생성 한 후, 다음과 같이 스마트 컨트랙트를 배포할 수 있습니다:

```java
<smartContract> contract = <smartContract>.deploy(
        caver, credentials, <chainId>, <gasProvider>,
        <param1>, ..., <paramN>).send();
```

스마트 컨트랙트가 배포된 후, 아래와 같이 스마트 컨트랙트 인스턴스를 만들 수 있습니다:

```java
<smartContract> contract = <smartContract>.load(
        <deployedContractAddress>, caver, credentials, <chainId>, <gasProvider>
);
```

스마트 컨트랙트로 트랜잭션을 생성하려면:

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

이 장에서는 Baobab 테스트넷에서 스마트 컨트랙트를 배포하고 실행하는 방법에 대해 설명합니다. 이 예제에서는 스마트 컨트랙트 [ERC20Mock](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/mocks/ERC20Mock.sol)을 사용합니다. 만일 컨트랙트 배포에 실패하고 빈 컨트랙트 주소가 반환되면 RuntimeException이 발생합니다.

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

배포된 ERC20Mock 컨트랙트의 인스턴스를 작성하려면 다음을 수행하세요:

```java
ERC20Mock erc20Mock = ERC20Mock.load(
        deployedContractAddress, 
        caver, credentials, 
        ChainId.BAOBAB_TESTNET,  // chainId 
        new DefaultGasProvider()  // gasProvider
);
```

만일 10개의 토큰을 특정 주소\(가령 `0x2c8ad0ea2e0781db8b8c9242e07de3a5beabb71a`\)로 전송하는 경우, 다음 코드를 사용하세요:

```java
KlayTransactionReceipt.TransactionReceipt transactionReceipt = erc20Mock.transfer(
        "0x2c8ad0ea2e0781db8b8c9242e07de3a5beabb71a",  // toAddress
        BigInteger.valueOf(10)  // value
).send();
```

수신자\(가령 `0x2c8ad0ea2e0781db8b8c9242e07de3a5beabb71a`\)의 잔액을 확인하려는 경우, 다음 코드를 사용하세요:

```java
BigInteger balance = erc20Mock.balanceOf(
        "0x2c8ad0ea2e0781db8b8c9242e07de3a5beabb71a"  // owner
).send();
```

### 트랜잭션 수수료 위임 <a id="fee-delegation"></a>

Klaytn provides [Fee Delegation](https://github.com/ground-x/klaytn-docs/tree/01611e64b6eb1715a79681389e1b0cc482622683/docs/bapp/klaytn/design/transactions/README.md#fee-delegation) feature which allows service providers to pay transaction fees instead of the users.

#### 밸류 트랜스퍼(Value Transfer)<a id="value-transfer"></a>

클라이언트 측에서, 트랜잭션을 발생시킨 클라이언트는 다음과 같이 수수료가 위임된 밸류 트랜스퍼를 생성합니다: 발신자가 기본 `ValueTransferTransaction` 객체를 생성하고, 만일 두 번째 매개변수가 `true`로 설정되어 있을 경우 [`transactionManager.sign()`](https://static.javadoc.io/com.klaytn.caver/core/1.0.2/com/klaytn/caver/tx/manager/TransactionManager.html#sign-com.klaytn.caver.tx.model.TransactionTransformer-boolean-)가 서명된 `FeeDelegatedValueTransferTransaction` 객체를 반환합니다.

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

서명된 트랜잭션 `senderRawTransaction`이 생성됩니다. 이제 발신자는 트랜잭션을 트랜잭션 수수료를 대신 지불할 수수료 납부자에게 전달합니다. Klaytn 네트워크에서는 발신자와 수수료 납부자 간의 트랜잭션 전송이 수행되지 않습니다. 프로토콜이 스스로 정의해야 합니다.

수수료 납부자가 발신자로부터 트랜잭션을 받은 후, 수수료 납부자는 다음 `FeePayerManager` 클래스를 사용해 트랜잭션을 전송할 수 있습니다: `FeePayerManager.executeTransaction()`는 수신한 트랜잭션을 수수료 납부자의 개인키로 서명하고 트랜잭션을 Klaytn 네트워크로 전송합니다.

```java
KlayCredentials feePayer = KlayWalletUtils.loadCredentials(<password>, <walletfilePath>);
FeePayerManager feePayerManager = new FeePayerManager.Builder(caver, feePayer)
        .setChainId(ChainId.BAOBAB_TESTNET)
        .build();
feePayerManager.executeTransaction(senderRawTransaction);
```

#### 스마트 컨트랙트 실행 <a id="smart-contract-execution"></a>

수수료 위임 스마트 컨트랙트 실행과 위의 수수료 위임 벨류 트랜스퍼의 차이는 스마트 컨트랙트 함수를 호출하기 위해서는 입력 데이터가 필요하다는 것입니다. 발신자는 아래와 같이 수수료 위임 스마트 컨트랙트 실행 트랜잭션을 생성할 수 있습니다. 만일 두 번째 매개변수를 `true`로 전달하면 [`transactionManager.sign()`](https://static.javadoc.io/com.klaytn.caver/core/1.0.2/com/klaytn/caver/tx/manager/TransactionManager.html#sign-com.klaytn.caver.tx.model.TransactionTransformer-boolean-)이 `TxTypeFeeDelegatedSmartContractExecution` 객체를 반환함에 유의하세요. The example below invokes the `transfer` method of [ERC20Mock](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/mocks/ERC20Mock.sol) contract which is described in [Smart Contract](getting-started_1.4.0.md#smart-contract).

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

After you get `senderRawTransaction`, the rest of the process using `FeePayerManager` is the same way as you saw in [fee-delegated value transfer](getting-started_1.4.0.md#value-transfer) above:

```java
KlayCredentials feePayer = KlayWalletUtils.loadCredentials(<password>, <walletfilePath>);
FeePayerManager feePayerManager = new FeePayerManager.Builder(caver, feePayer).build();
feePayerManager.executeTransaction(senderRawTransaction);
```

## 다양한 AccountKey 타입 사용 <a id="using-various-account-key-type"></a>

caver-java introduces new classes to support the various types of [AccountKey](https://github.com/ground-x/klaytn-docs/tree/01611e64b6eb1715a79681389e1b0cc482622683/docs/bapp/klaytn/design/accounts.md#account-key) supported by the platform. 이 기능은 버전 1.2.0부터 지원됩니다.

### AccountKey <a id="account-key"></a>

Klaytn 플랫폼에서 계정 키를 업데이트하기 위해 caver-java는 `AccountKey` 인터페이스를 제공합니다.. 다음은 `AccountKey`의 구현체인 `AccountKeyPublic`, `AccountKeyWeightedMultiSig` 그리고 `AccountKeyRoleBased`를 설명합니다. See [Account Update](getting-started_1.4.0.md#account-update) for how to update an Account.

### AccountKeyPublic <a id="account-key-public"></a>

`AccountKeyPublic`은 `AccountKey`의 구현체로 하나의 공개키를 가지고 있습니다. 생성 방법은 다음과 같습니다.

```java
ECKeyPair newKeyPair = Keys.createEcKeyPair();
AccountKeyPublic newAccountKey = AccountKeyPublic.create(newKeyPair.getPublicKey());
```

`AccountKeyPublic`으로 업데이트한 계정을 사용하려면 `KlayCredentials`를 아래와 같이 생성하여야 합니다.

```java
KlayCredentials validCredentails = KlayCredentials.create(newKeyPair, oldCredentials.getAddress());

// Because the account address is decoupled from the AccountKeyPublic (public key), you can't use the account if you create the credentials without address as below.
KlayCredentials invalidCredentails = KlayCredentials.create(newKeyPair);
```

### AccountKeyWeightedMultiSig <a id="account-key-weighted-multi-sig"></a>

`AccountKeyWeightedMultiSig`는 여러 개의 가중 공개키를 가진 계정 키입니다. `AccountKeyWeightedMultiSig`는 또한 임계 값을 정의하는데, 계정을 사용하기 위해서는 서명한 키의 가중치 합이 해당 임계값을 넘어야 합니다.  최대 10개의 키를 가질 수 있습니다. `AccountKeyWeightedMultiSig`는 아래와 같이 생성할 수 있습니다.

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

`AccountKeyWeightedMultiSig`으로 업데이트한 계정을 사용하려면 `KlayCredentials`를 아래와 같이 생성하여야 합니다.

```java
List<ECKeyPair> transactionECKeyPairList = new ArrayList<>();

transactionECKeyPairList.add(ecKeyPair1);
transactionECKeyPairList.add(ecKeyPair2);

KlayCredentials newCredentails = KlayCredentials.create(transactionECKeyPairList, address);
```

### AccountKeyRoleBased <a id="account-key-role-based"></a>

`AccountKeyRoleBased`는 `AccountKey`의 리스트입니다. 각 `AccountKey`는 위치에 따라 특정 역할(Role)에 배정됩니다. AccountKey는 `AccountKeyPublic`, `AccountKeyWeightedMultiSig` 또는 `AccountKeyFail`이 될 수 있습니다. `AccountKeyNil`이 특정 역할(Role)에 지정된 경우 해당 역할이 주어진 키로 업데이트 되는 것이 아니라 기존의 AccountKey가 사용됩니다. `AccountKeyFail`이 사용된 경우, 해당 역할로 서명한 것은 언제나 실패하므로 AccountKeyFail을 사용할때는 주의가 필요합니다.

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

`AccountKeyRoleBased`로 업데이트한 계정을 사용하려면 `KlayCredentials`를 아래와 같이 생성하여야 합니다.

```java
List<ECKeyPair> transactionECKeyPairList = Arrays.asList(newKeyPair1);
List<ECKeyPair> updateECKeyPairList = Arrays.asList(newKeyPair2);
List<ECKeyPair> feePayerECKeyPairList = Arrays.asList(newKeyPair3);

KlayCredentials newCredentails = KlayCredentials.create(transactionECKeyPairList, updateECKeyPairList, feePayerECKeyPairList, address);
```

계정에 특정 역할에 대한 키가 없으면 빈 리스트를 인수로 전달하세요.

```java
List<ECKeyPair> transactionECKeyPairList = Collections.emptyList();
List<ECKeyPair> updateECKeyPairList = Arrays.asList(newKeyPair2);
List<ECKeyPair> feePayerECKeyPairList = Collections.emptyList();

KlayCredentials newCredentails = KlayCredentials.create(transactionECKeyPairList, updateECKeyPairList, feePayerECKeyPairList, address);
```

계정에 특정 역할에 대한 키가 여러 개 있는 경우 다음과 같이 여러 개의 키를 전달할 수 있습니다.

```java
List<ECKeyPair> transactionECKeyPairList = Collections.emptyList();
List<ECKeyPair> updateECKeyPairList = Arrays.asList(newKeyPair2-1, newKeyPair2-2, newKeyPair2-3);
List<ECKeyPair> feePayerECKeyPairList = Collections.emptyList();

KlayCredentials newCredentails = KlayCredentials.create(transactionECKeyPairList, updateECKeyPairList, feePayerECKeyPairList, address);
```

## 다중 서명된 트랜잭션 보내기<a id="sending-a-transaction-with-multiple-signers"></a>

AccountKeyMultiSig 또는 AccountKeyRoleBased를 가지고 있는 계정은 각 키를 다른 사람이 관리하고 있을 수 있습니다.

이 장에서는 서명하는 사람이 여럿인 경우 서명을 수집하고 트랜잭션을 보내는 방법에 대해 설명합니다.

### 순차적 발신자(Sender) 서명<a id="sequential-sender-signing"></a>

`rawTransaction`은 RLP 인코딩된 트랜잭션으로 `txSignatures`와 `feePayerSignatures`를 가지고 있습니다. `feePayerSignature`는 수수료 위임 트랜잭션인 경우에만 포함됩니다.

수수료 납부자가 없는 경우, 트랜잭션에 반복적으로 서명하고 실행하는 절차는 세 부분으로 나눌 수 있습니다. 1. 트랜잭션을 RLP 인코딩하여 rawTransaction 형식으로 서명자에게 보냅니다. 2. 서명자는 수신한 rawTransaction을 자신의 키로 서명합니다. 3. 서명한 rawTransaction을 EN으로 보냅니다. 서명자가 여럿인 경우 2단계를 반복할 수 있습니다.

```java
//// 1. Alice는 트랜잭션을 생성하고 서명한 후 Bob에게 보냅니다.
//// Alice Side
ValueTransferTransaction transactionTransformer = ValueTransferTransaction.create(from, to, BigInteger.ONE, GAS_LIMIT);

TransactionManager transactionManager_alice = new TransactionManager.Builder(caver, senderCredential_alice)
                    .setTransactionReceiptProcessor(new PollingTransactionReceiptProcessor(caver, 1000, 10))
                    .setChaindId(LOCAL_CHAIN_ID)
                    .build();

String rawTransaction_signed_alice = transactionManager_alice.sign(transactionTransformer).getValueAsString();

//// 2. Bob은 받은 트랜잭션에 서명하고 이를 Charlie에게 보냅니다.
//// Bob Side
            TransactionManager transactionManager_bob = new TransactionManager.Builder(caver, senderCredential_bob)
                    .setTransactionReceiptProcessor(new PollingTransactionReceiptProcessor(caver, 1000, 10))
                    .setChaindId(LOCAL_CHAIN_ID)
                    .build();

String rawTransaction_signed_alice_and_bob = transactionManager_bob.sign(rawTransaction_signed_alice).getValueAsString();

//// 3. Charlie는 받은 트랜잭션에 서명하고 Klaytn EN으로 보냅니다.
//// Charlie Side
TransactionManager transactionManager_charlie = new TransactionManager.Builder(caver, senderCredential_charlie)
                    .setTransactionReceiptProcessor(new PollingTransactionReceiptProcessor(caver, 1000, 10))
                    .setChaindId(LOCAL_CHAIN_ID)
                    .build();

KlayTransactionReceipt.TransactionReceipt transactionReceipt = transactionManager_charlie.executeTransaction(rawTransaction_signed_alice_and_bob);
```

### 순차적 수수료 납부자(Fee Payer) 서명<a id="sequential-fee-payer-signing"></a>

Fee-payer signature\(s\) can also be added sequentially. `FeePayerManager`로 서명하면 트랜잭션의 `feePayerSignatures`가 누적됩니다. 서명 순서는 중요하지 않습니다. `TransactionManager`로 서명하면 `txSignature`에 추가됩니다. `FeePayerManger`로 서명하면 raw transaction의  `feePayerSignatures`에 추가됩니다.

```java
//// 1. Bob은 Alice로부터 트랜잭션을 받아 수수료 납부자로 서명합니다.
//// Bob Side
FeePayerManager feePayerManager_bob = new FeePayerManager.Builder(caver, feePayerCredentials_bob)
                    .setTransactionReceiptProcessor(new PollingTransactionReceiptProcessor(caver, 1000, 10))
                    .setChainId(LOCAL_CHAIN_ID)
                    .build();

String rawTransaction_signed_alice_and_bob = feePayerManager_bob.sign(rawTransaction_signed_alice).getValueAsString();

//// 2. Charlie는 받은 트랜잭션에 서명하고 Klaytn EN으로 보냅니다.
//// Charlie Side
FeePayerManager feePayerManager_charlie = new FeePayerManager.Builder(caver, feePayerCredentials_charlie)
                    .setTransactionReceiptProcessor(new PollingTransactionReceiptProcessor(caver, 1000, 10))
                    .setChainId(LOCAL_CHAIN_ID)
                    .build();

KlayTransactionReceipt.TransactionReceipt transactionReceipt =  feePayerManager_charlie.executeTransaction(rawTransaction_signed_alice_and_bob);
```

## 감사를 표합니다 <a id="thanks-to"></a>

[web3j](https://github.com/web3j/web3j) 프로젝트에서 영감을 받았습니다. 🙂

