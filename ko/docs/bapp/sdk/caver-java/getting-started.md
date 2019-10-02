# 시작하기

## Prerequisites

### Dependency

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

If you want to use Android dependency, just append -android at the end of the version string. \(e.g. 1.0.1-android\)

If you want to see details of the JSON-RPC requests and responses, please include [LOGBack](https://logback.qos.ch/) dependency in your project. Below is a Gradle build file example. You can add the dependency to Maven as well. Since caver-java uses the [SLF4J](https://www.slf4j.org/) logging facade, you can switch to your preferred logging framework instead of LOGBack.

```groovy
implementation "ch.qos.logback:logback-classic:1.2.3"
```

### 설치

If you want to generate transactions related with a smart contract, you need to install a Solidity compiler and caver-java commmand-line tool first.

#### Solidity Compiler

You can install the Solidity compiler locally, following the instructions as per [the project documentation](http://solidity.readthedocs.io/en/develop/installing-solidity.html). Klaytn recommends you to install Solidity version either 0.4.24 or 0.5.6. If you are a macOS user, you can install the versions via Homebrew:

```text
$ brew install klaytn/klaytn/solidity@0.4.24  # version 0.4.24
$ brew install klaytn/klaytn/solidity@0.5.6   # version 0.5.6
```

#### Command-line Tool

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

* Download or fork caver-java.
* Do task 'shadowDistZip' in the console module using Gradle. As a result, console/build/distributions/console-shadow-{version}.zip is generated.

  ```text
  $ ./gradlew :console:shadowDistZip
  ```

* Unzip the zip file in the build directory

  ```text
  $ unzip ./console/build/distributions/console-shadow-{version}.zip
  ```

* Execute the binary file to run the command-line tool like below. You can find a shell script file for macOS users and a batch file for Window users.

  ```text
  $ ./console/build/distributions/console-shadow-{version}/bin/caver-java
  ```

## 계정 관리

### Creating an Account

In order to sign transactions, you need to have either an EC \(Elliptic Curve\) key pair or a Klaytn keystore file.

#### Using an EC Key Pair

You can create a Klaytn account using an EC key pair like below:

```java
KlayCredentials credentials = KlayCredentials.create(Keys.createEcKeyPair());
String privateKey = Numeric.toHexStringWithPrefix(credentials.getEcKeyPair().getPrivateKey()); 
String address = credentials.getAddress();
```

#### Using a Keystore File

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

## Sending a Transaction

### Getting KLAY via Baobab Faucet

After creating an account, you can receive some Baobab testnet KLAY for the Baobab testnet via Baobab Faucet, available at [https://baobab.wallet.klaytn.com/](https://baobab.wallet.klaytn.com/). The received testnet KLAY will be used for transaction fee later.

### Connecting to Baobab

You can use a Klaytn public EN \([https://api.baobab.klaytn.net:8651](https://api.baobab.klaytn.net:8651)\) to connect to the Baobab testnet.

```java
Caver caver  = Caver.build(Caver.BAOBAB_URL);  // Caver.BAOBAB_URL = https://api.baobab.klaytn.net:8651
```

### 송금 트랜잭션 전송

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

### Checking Receipts

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

## Sending Other Transaction Types

### Account Update

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

### 스마트 컨트랙트

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

To transact with a smart contract:

```java
KlayTransactionReceipt.TransactionReceipt transactionReceipt = contract.<someMethod>(
        <param1>,
        ...).send();
```

To call a smart contract:

```java
<type> result = contract.<someMethod>(<param1>, ...).send();
```

#### 예시

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

### 트랜잭션 비용 위임

Klaytn provides [Fee Delegation](../../../klaytn/design/transactions/README.md#fee-delegation) feature which allows service providers to pay transaction fees instead of the users.

#### Value Transfer

On the client side, client who initiates the transaction will generate a fee-delegated value transfer transaction as follows: A sender creates a default `ValueTransferTransaction` object, then [`transactionManager.sign()`](https://static.javadoc.io/com.klaytn.caver/core/1.0.1/com/klaytn/caver/tx/manager/TransactionManager.html#sign-com.klaytn.caver.tx.model.TransactionTransformer-boolean-) returns a signed `FeeDelegatedValueTransferTransaction` object if the second parameter is set to `true`.

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

#### Smart Contract Execution

The difference between fee-delegated smart contract execution and fee-delegated value transfer above is that this needs input data to call a function of a smart contract. A sender can generate a fee-delegated smart contract execution transaction as shown below. Note that [`transactionManager.sign()`](https://static.javadoc.io/com.klaytn.caver/core/1.0.1/com/klaytn/caver/tx/manager/TransactionManager.html#sign-com.klaytn.caver.tx.model.TransactionTransformer-boolean-) returns a `TxTypeFeeDelegatedSmartContractExecution` object if you pass `true` to the second parameter. The example below invokes the `transfer` method of [ERC20Mock](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/mocks/ERC20Mock.sol) contract which is described in [Smart Contract](#smart-contract).

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

## Thanks to

The [web3j](https://github.com/web3j/web3j) project for the inspiration. 🙂
