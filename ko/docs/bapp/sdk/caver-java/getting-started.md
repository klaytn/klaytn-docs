# 시작하기 <a id="getting-started"></a>

## 준비 사항 <a id="prerequisites"></a>

### 의존성 <a id="dependency"></a>

**maven**

```groovy
<dependency>
  <groupId>com.klaytn.caver</groupId>
  <artifactId>core</artifactId>
  <version>1.0.1</version>
</dependency>
```

**gradle**

```groovy
implementation 'com.klaytn.caver:core:1.0.1'
```

안드로이드 의존성을 사용하려면, 버전 문자열 끝에 -android를 추가하세요. \(가령 1.0.1-android\)

JSON-RPC 요청 및 응답에 대한 세부 사항을 보려면, [LOGBack](https://logback.qos.ch/) 의존성을 프로젝트에 포함하세요. 아래는 Gradle 빌드 파일 예제입니다. Maven에도 의존성을 추가할 수 있습니다. caver-java가 [SLF4J](https://www.slf4j.org/) 로깅 퍼사드(logging facade)를 사용하기 때문에, LOGBack 대신 선호하는 로깅 프레임워크로 전환할 수 있습니다.

```groovy
implementation "ch.qos.logback:logback-classic:1.2.3"
```

**Note**: In the central repository, the RC, Android, and Java versions are listed together. If you use wildcards to get a version, you may be using a version that is not appropriate for your platform.

### 설치 <a id="installation"></a>

If you want to generate transactions related with a smart contract, you need to install a Solidity compiler and caver-java commmand-line tool first.

#### 솔리디티 컴파일러 <a id="solidity-compiler"></a>

You can install the Solidity compiler locally, following the instructions as per [the project documentation](http://solidity.readthedocs.io/en/develop/installing-solidity.html). Klaytn recommends you to install Solidity version either 0.4.24 or 0.5.6. If you are a macOS user, you can install the versions via Homebrew:

```text
$ brew install klaytn/klaytn/solidity@0.4.24  # version 0.4.24
$ brew install klaytn/klaytn/solidity@0.5.6   # version 0.5.6
```

#### 커맨드라인 도구<a id="command-line-tool"></a>

The command-line tool allows you to generate Solidity smart contract function wrappers from the command line.

**Installation \(Homebrew\)**

Java 1.8+ is required to install this.

```text
$ brew tap klaytn/klaytn
$ brew install caver-java
```

After installation you can run command 'caver-java' like below:

```text
$ caver-java solidity generate -b <smart-contract>.bin -a <smart-contract>.abi -o <outputPath> -p <packagePath>
```

**Installation \(Other\)**

Currently, we do not support other package managers. As another solution, we provide a method to build the CLI below.

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

In order to sign transactions, you need to have either an EC \(Elliptic Curve\) key pair or a Klaytn keystore file.

#### EC 키 쌍 사용 <a id="using-an-ec-key-pair"></a>

You can create a Klaytn account using an EC key pair like below:

```java
KlayCredentials credentials = KlayCredentials.create(Keys.createEcKeyPair());
String privateKey = Numeric.toHexStringWithPrefix(credentials.getEcKeyPair().getPrivateKey()); 
String address = credentials.getAddress();
```

#### 키스토어 파일 사용 <a id="using-a-keystore-file"></a>

If you want to create a new account with a keystore file (you can also create a new keystore file in [Klaytn Wallet](../../../toolkit/klaytn-wallet.md)):

```java
KlayWalletUtils.generateNewWalletFile(
        <yourPassword>,
        new File(<walletFilePath>)
);
```

To load an account using a keystore file like below:

```java
KlayCredentials credentials = KlayWalletUtils.loadCredentials(<password>, <walletFilePath>);
```

## 트랜잭션 발신 <a id="sending-a-transaction"></a>

### Baobab Faucet을 통해 KLAY 받기 <a id="getting-klay-via-baobab-faucet"></a>

After creating an account, you can receive some Baobab testnet KLAY for the Baobab testnet via Baobab Faucet, available at [https://baobab.wallet.klaytn.com/](https://baobab.wallet.klaytn.com/). The received testnet KLAY will be used for transaction fee later.

### Baobab 연결 <a id="connecting-to-baobab"></a>

You can use a Klaytn public EN \([https://api.baobab.klaytn.net:8651](https://api.baobab.klaytn.net:8651)\) to connect to the Baobab testnet.

```java
Caver caver  = Caver.build(Caver.BAOBAB_URL);  // Caver.BAOBAB_URL = https://api.baobab.klaytn.net:8651
```

### 송금 트랜잭션 전송 <a id="sending-a-value-transfer-transaction"></a>

After you get a `Caver` instance and create an account which has some KLAY, you can send 1 peb to a certain address\(`0xe97f27e9a5765ce36a7b919b1cb6004c7209217e`\) with a gas limit `BigInteger.valueOf(100_000)` like below:

`TransactionManager` is introduced to hide the complexity of transaction types. For example, a `FeeDelegatedValueTransferTransaction` object can be transformed from a `ValueTransferTransaction` object. For more details, see [Fee Delegation](../../../klaytn/design/transactions/README.md#fee-delegation). In addition to Fee Delegation, `TransactionManager` can be used with `GetNonceProcessor`, `ErrorHandler`, and `TransactionReceiptProcessor`.

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

If you use `ValueTransfer` class, you can more easily compose and send a transaction. This is because `ValueTransfer` class makes the processes above simple like below:

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

If you send a transaction via `sendFunds`, caver-java tries to get a transaction receipt by default. After you get a receipt, you can see the following log in the console.

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

In this receipt, you can check the status of the transaction execution. If the 'status' field in the receipt is "0x1", it means the transaction is processed successfully. If not, the transaction failed. The detailed error message is presented in the `txError` field. For more detail, see [txError](../../json-rpc/transaction-error-codes.md).

## 다른 트랜잭션 타입 보내기 <a id="sending-other-transaction-types"></a>

### 계정 업데이트 <a id="account-update"></a>

If you want to update the key of the given account to a new [AccountKeyPublic](../../../klaytn/design/accounts.md#accountkeypublic) key:

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

계정 키는 계정과 연결된 키 구조를 나타냅니다. To get more details and types about the Klaytn account key, please read [Account Key](../../../klaytn/design/accounts.md#account-key).

### 스마트 컨트랙트 <a id="smart-contract"></a>

caver-java supports auto-generation of smart contract wrapper code. Using the wrapper, you can easily deploy and execute a smart contract. Before generating a wrapper code, you need to compile the smart contract first. Note: This will only work if a Solidity compiler is installed in your computer. See [Solidity Compiler](#solidity-compiler).

```text
$ solc <contract>.sol --bin --abi --optimize -o <output-dir>/
```

Then, generate the wrapper code using caver-java’s [command-line tool](#command-line-tool).

```text
$ caver-java solidity generate -b <smart-contract>.bin -a <smart-contract>.abi -o <outputPath> -p <packagePath>
```

Above command will output `<smartContract>`.java. After generating the wrapper code, you can deploy your smart contract like below:

```java
<smartContract> contract = <smartContract>.deploy(
        caver, credentials, <chainId>, <gasProvider>,
        <param1>, ..., <paramN>).send();
```

After the smart contract has been deployed, you can create a smart contract instance like below:

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

This section describes how to deploy and execute a smart contract on the Baobab testnet. In this example, we use a smart contract [ERC20Mock](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/mocks/ERC20Mock.sol). If contract deployment fails and an empty contract address is returned, it will throw RuntimeException.

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

To create an instance of the deployed ERC20Mock contract:

```java
ERC20Mock erc20Mock = ERC20Mock.load(
        deployedContractAddress, 
        caver, credentials, 
        ChainId.BAOBAB_TESTNET,  // chainId 
        new DefaultGasProvider()  // gasProvider
);
```

If you transfer 10 tokens to a specified address \(e.g., `0x2c8ad0ea2e0781db8b8c9242e07de3a5beabb71a`\), use the following code:

```java
KlayTransactionReceipt.TransactionReceipt transactionReceipt = erc20Mock.transfer(
        "0x2c8ad0ea2e0781db8b8c9242e07de3a5beabb71a",  // toAddress
        BigInteger.valueOf(10)  // value
).send();
```

To check the balance of the recipient \(e.g., `0x2c8ad0ea2e0781db8b8c9242e07de3a5beabb71a`\), use the code below:

```java
BigInteger balance = erc20Mock.balanceOf(
        "0x2c8ad0ea2e0781db8b8c9242e07de3a5beabb71a"  // owner
).send();
```

### 트랜잭션 수수료 위임 <a id="fee-delegation"></a>

Klaytn provides [Fee Delegation](../../../klaytn/design/transactions/README.md#fee-delegation) feature which allows service providers to pay transaction fees instead of the users.

#### 밸류 트랜스퍼(Value Transfer)<a id="value-transfer"></a>

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

A signed transaction, `senderRawTransaction`, is generated. Now the sender delivers the transaction to the fee payer who will pay for the transaction fee instead. Transferring transactions between the sender and the fee payer is not performed on the Klaytn network. The protocol should be defined by themselves.

After the fee payer gets the transaction from the sender, the fee payer can send the transaction using the `FeePayerManager` class as follows. `FeePayerManager.executeTransaction()` will sign the received transaction with the fee payer's private key and send the transaction to the Klaytn network.

```java
KlayCredentials feePayer = KlayWalletUtils.loadCredentials(<password>, <walletfilePath>);
FeePayerManager feePayerManager = new FeePayerManager.Builder(caver, feePayer)
        .setChainId(ChainId.BAOBAB_TESTNET)
        .build();
feePayerManager.executeTransaction(senderRawTransaction);
```

#### 스마트 컨트랙트 실행 <a id="smart-contract-execution"></a>

The difference between fee-delegated smart contract execution and fee-delegated value transfer above is that this needs input data to call a function of a smart contract. A sender can generate a fee-delegated smart contract execution transaction as shown below. Note that [`transactionManager.sign()`](https://static.javadoc.io/com.klaytn.caver/core/1.0.2/com/klaytn/caver/tx/manager/TransactionManager.html#sign-com.klaytn.caver.tx.model.TransactionTransformer-boolean-) returns a `TxTypeFeeDelegatedSmartContractExecution` object if you pass `true` to the second parameter. The example below invokes the `transfer` method of [ERC20Mock](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/mocks/ERC20Mock.sol) contract which is described in [Smart Contract](#smart-contract).

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

After you get `senderRawTransaction`, the rest of the process using `FeePayerManager` is the same way as you saw in [fee-delegated value transfer](#value-transfer) above:

```java
KlayCredentials feePayer = KlayWalletUtils.loadCredentials(<password>, <walletfilePath>);
FeePayerManager feePayerManager = new FeePayerManager.Builder(caver, feePayer).build();
feePayerManager.executeTransaction(senderRawTransaction);
```

## 감사를 표합니다 <a id="thanks-to"></a>

The [web3j](https://github.com/web3j/web3j) project for the inspiration. 🙂

