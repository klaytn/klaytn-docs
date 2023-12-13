# Bắt đầu

## Điều kiện tiên quyết <a id="prerequisites"></a>

### Phần phụ thuộc <a id="dependency"></a>

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

Nếu bạn muốn dùng phần phụ thuộc Android, bạn chỉ cần thêm -android vào cuối chuỗi phiên bản. \(ví dụ 1.0.1-android\)

Nếu bạn muốn xem chi tiết của các yêu cầu và phản hồi JSON-RPC, vui lòng đưa phần phụ thuộc [LOGBack](https://logback.qos.ch/) vào dự án của mình. Dưới đây là một ví dụ về tập tin xây dựng Gradle. Bạn cũng có thể thêm phần phụ thuộc vào Maven. Vì caver-java sử dụng giao diện đăng nhập [SLF4J](http://www.slf4j.org/), bạn có thể chuyển sang trình ghi bản ghi mà bạn thích thay cho LOGBack.

```groovy
implementation "ch.qos.logback:logback-classic:1.2.3"
```

**Lưu ý**: Trong kho dữ liệu trung tâm, các phiên bản RC, Andriod và Java được liệt kê cùng nhau. Nếu bạn sử dụng ký tự đại diện để lấy một phiên bản, bạn có thể dùng phải một phiên bản không phù hợp với nền tảng của mình.

### Cài đặt <a id="installation"></a>

Nếu bạn muốn tạo các giao dịch liên quan đến một hợp đồng thông minh, bạn cần cài trình biên dịch Solidity và công cụ dòng lệnh caver-java trước.

#### Trình biên dịch Solidity <a id="solidity-compiler"></a>

Bạn có thể cài đặt trình biên dịch Solidity vào máy tính của mình bằng cách làm theo hướng dẫn trong [tài liệu của dự án](http://solidity.readthedocs.io/en/develop/installing-solidity.html). Klaytn khuyên bạn nên cài đặt phiên bản Solidity 0.4.24 hoặc 0.5.6. Nếu bạn dùng macOS, bạn có thể cài đặt các phiên bản trên qua Homebrew:

```text
$ brew install klaytn/klaytn/solidity@0.4.24  # version 0.4.24
$ brew install klaytn/klaytn/solidity@0.5.6   # version 0.5.6
```

#### Công cụ dòng lệnh <a id="command-line-tool"></a>

Công cụ dòng lệnh cho phép bạn dùng dòng lệnh để tạo các lớp vỏ bọc chức năng bằng Solidity cho hợp đồng thông minh.

**Cài đặt \(Homebrew\)**

Cần có Java 1.8 trở lên để cài đặt công cụ này.

```text
$ brew tap klaytn/klaytn
$ brew install caver-java
```

Sau khi cài đặt, bạn có thể chạy lệnh "caver-java" như dưới đây:

```text
$ caver-java solidity generate -b <smart-contract>.bin -a <smart-contract>.abi -o <outputPath> -p <packagePath>
```

**Cài đặt \(Khác\)**

Hiện tại, chúng tôi không hỗ trợ các trình quản lý gói khác. Một giải pháp khác mà chúng tôi cung cấp là một phương pháp để xây dựng CLI như bên dưới.

* Tải xuống hoặc tách luồng caver-java.
* Dùng Gradle thực hiện tác vụ "shadowDistZip" trong mô-đun bảng điều khiển. Kết quả là console/build/distributions/console-shadow-{version}.zip được tạo ra.

  ```text
  $ ./gradlew :console:shadowDistZip
  ```

* Giải nén tập tin zip trong thư mục xây dựng

  ```text
  $ unzip ./console/build/distributions/console-shadow-{version}.zip
  ```

* Thực thi tập tin nhị phân để chạy công cụ dòng lệnh như dưới đây. Bạn có thể tìm thấy tập tin mã lập trình shell dành cho người dùng macOS và tập tin batch dành cho người dùng Window.

  ```text
  $ ./console/build/distributions/console-shadow-{version}/bin/caver-java
  ```

## Quản lý tài khoản <a id="managing-accounts"></a>

### Tạo một tài khoản <a id="creating-an-account"></a>

Để ký các giao dịch, bạn cần có một cặp khóa EC \(Elliptic Curve\) hoặc một tập tin lưu trữ khóa Klaytn.

#### Sử dụng một cặp khóa EC <a id="using-an-ec-key-pair"></a>

Bạn có thể tạo ra một tài khoản Klaytn bằng cặp khóa EC như dưới đây:

```java
KlayCredentials credentials = KlayCredentials.create(Keys.createEcKeyPair());
String privateKey = Numeric.toHexStringWithPrefix(credentials.getEcKeyPair().getPrivateKey()); 
String address = credentials.getAddress();
```

#### Sử dụng một tập tin lưu trữ khóa <a id="using-a-keystore-file"></a>

Nếu bạn muốn tạo một tài khoản mới bằng tập tin lưu trữ khóa (bạn cũng có thể tạo một tập tin lưu trữ khóa mới trong [Ví Klaytn][]):

```java
KlayWalletUtils.generateNewWalletFile(
        <yourPassword>,
        new File(<walletFilePath>)
);
```

Để tải một tài khoản bằng tập tin lưu trữ khóa như dưới đây:

```java
KlayCredentials credentials = KlayWalletUtils.loadCredentials(<password>, <walletFilePath>);
```

## Gửi giao dịch <a id="sending-a-transaction"></a>

### Nhận KLAY qua Vòi Baobab <a id="getting-klay-via-baobab-faucet"></a>

Sau khi tạo một tài khoản, bạn có thể nhận được một ít đồng KLAY dùng cho mạng thử nghiệm Baobab qua Vòi Baobab, có sẵn tại [https://baobab.wallet.klaytn.foundation/](https://baobab.wallet.klaytn.foundation/). Đồng KLAY dùng cho mạng thử nghiệm mà bạn nhận được sẽ được sử dụng để thanh toán phí giao dịch sau này.

### Kết nối với Baobab <a id="connecting-to-baobab"></a>

Bạn có thể kết nối với mạng Baobab như dưới đây:

```java
Caver caver  = Caver.build(https://your.baobab.en.url:8651);
```

### Gửi một giao dịch chuyển giá trị <a id="sending-a-value-transfer-transaction"></a>

Sau khi đã nhận được một đối tượng `Caver` cụ thể và tạo một tài khoản có KLAY, bạn có thể gửi 1 peb đến địa chỉ nhất định \(`0xe97f27e9a5765ce36a7b919b1cb6004c7209217e`\) với hạn mức gas `BigInteger.valueOf(100_000)` như dưới đây:

`TransactionManager` được đưa vào để ẩn bớt sự phức tạp của các loại giao dịch. Ví dụ: một đối tượng `FeeDelegatedValueTransferTransaction` có thể được chuyển đổi từ một đối tượng `ValueTransferTransaction`. Để biết thêm thông tin, hãy xem [Ủy thác phí][]. Ngoài Ủy thác phí, `TransactionManager` còn có thể được sử dụng cùng `GetNonceProcessor`, `ErrorHandler` và `TransactionReceiptProcessor`.

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

Nếu bạn sử dụng lớp `ValueTransfer`, bạn có thể biên soạn và gửi một giao dịch đi dễ dàng hơn. Đó và vì lớp `ValueTransfer` khiến các quy trình trên trở nên đơn giản hơn như dưới đây:

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

### Kiểm tra biên lai <a id="checking-receipts"></a>

Nếu bạn gửi một giao dịch qua `sendFunds`, caver-java sẽ tìm cách lấy biên lai giao dịch theo mặc định. Sau khi nhận được biên lai, bạn có thể thấy bản ghi sau trong bảng điều khiển.

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
      "nhật ký":[],
      "nhật kýBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      "nonce":"0x114e",
      "senderTxHash":"0x3d50b9fa9fec58443f5618ed7e0f5aec5e9a6f7269d9ff606ff87156ca5b4afd",
      "signatures":[
         {
            ...
         }
      ],
      "trạng thái":"0x1",
      "to":"0xe97f27e9a5765ce36a7b919b1cb6004c7209217e",
      "transactionHash":"0x3d50b9fa9fec58443f5618ed7e0f5aec5e9a6f7269d9ff606ff87156ca5b4afd",
      "transactionIndex":"0x1",
      "type":"TxTypeValueTransfer",
      "typeInt":8,
      "value":"0x1"
   }
}
```

Trong biên lai này, bạn có thể kiểm tra trạng thái của việc thực thi giao dịch. Nếu trường "trạng thái" trong biên lai là "0x1", điều này có nghĩa là giao dịch đã được xử lý thành công. Nếu không, giao dịch đã thất bại. Thông báo lỗi chi tiết được hiển thị trong trường `txError`. Để biết thêm chi tiết, hãy xem [txError][].

## Gửi các loại giao dịch khác <a id="sending-other-transaction-types"></a>

### Cập nhật tài khoản <a id="account-update"></a>

Nếu bạn muốn cập nhật khóa của một tài khoản đã cho vào khóa [AccountKeyPublic][] mới:

```java
AccountUpdateTransaction tài khoảnUpdateTransaction = AccountUpdateTransaction.create(
        credentials.getAddress(),  // fromAddress
        AccountKeyPublic.create(
                "0xbf8154a3c1580b5478ceec0aac319055185280ce22406c6dc227f4de85316da1",  // publicKeyX
                "0x0dc8e4b9546adcc6d1f11796e43e478bd7ffbe302917667837179f4da77591d8"  // publicKeyY
        ),  // newAccountKey
        BigInteger.valueOf(100_000)  // gasLimit
);
Account.create(caver, credentials, ChainId.BAOBAB_TESTNET).sendUpdateTransaction(tài khoảnUpdateTransaction).send();
```

Khóa tài khoản tương ứng với cấu trúc khóa liên kết với một tài khoản. Để biết thêm chi tiết và các loại khóa tài khoản Klaytn, vui lòng đọc [AccountKey][].

### Hợp đồng thông minh <a id="smart-contract"></a>

caver-java hỗ trợ tạo tự động mã vỏ bọc của hợp đồng thông minh. Với vỏ bọc này, bạn có thể dễ dàng triển khai và thực thi một hợp đồng thông minh. Trước khi tạo một mã vỏ bọc, bạn cần lập trước một hợp đồng thông minh. Lưu ý: Việc này chỉ có tác dụng nếu trình biên dịch Solidity đã được cài trên máy tính của bạn. Hãy xem [Trình biên dịch Solidity][].

```text
$ solc <contract>.sol --bin --abi --optimize -o <output-dir>/
```

Sau đó, tạo mã vỏ bọc bằng cách dùng [công cụ dòng lệnh][] của caver-java.

```text
$ caver-java solidity generate -b <smart-contract>.bin -a <smart-contract>.abi -o <outputPath> -p <packagePath>
```

Lệnh trên sẽ cho kết quả đầu ra `<smartContract>`.java. Sau khi tạo được mã vỏ bọc, bạn có thể triển khai hợp đồng thông minh như dưới đây:

```java
<smartContract> contract = <smartContract>.deploy(
        caver, credentials, <chainId>, <gasProvider>,
        <param1>, ..., <paramN>).send();
```

Sau khi hợp đồng thông minh đã được triển khai, bạn có thể tạo một phiên bản hợp đồng thông minh cụ thể như dưới đây:

```java
<smartContract> contract = <smartContract>.load(
        <deployedContractAddress>, caver, credentials, <chainId>, <gasProvider>
);
```

Để giao dịch với một hợp đồng thông minh:

```java
KlayTransactionReceipt.TransactionReceipt transactionReceipt = contract.<someMethod>(
        <param1>,
        ...).send();
```

Để gọi một hợp đồng thông minh:

```java
<type> result = contract.<someMethod>(<param1>, ...).send();
```

#### Ví dụ <a id="example"></a>

Phần này mô tả cách để triển khai và thực thi một hợp đồng thông minh trên mạng thử nghiệm Baobab. Trong ví dụ này, chúng ta dùng hợp đồng thông minh [ERC20Mock](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/mocks/ERC20Mock.sol). Nếu việc triển khai hợp đồng thông minh thất bại và kết quả trả về là một địa chỉ hợp đồng trống, nó sẽ ném ra RuntimeException.

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

Để tạo một đối tượng cụ thể của hợp động ERC20Mock đã triển khai:

```java
ERC20Mock erc20Mock = ERC20Mock.load(
        deployedContractAddress, 
        caver, credentials, 
        ChainId.BAOBAB_TESTNET,  // chainId 
        new DefaultGasProvider()  // gasProvider
);
```

Nếu bạn chuyển 10 token đến một địa chỉ được chỉ định \(e.g., `0x2c8ad0ea2e0781db8b8c9242e07de3a5beabb71a`\), hãy dùng mã sau:

```java
KlayTransactionReceipt.TransactionReceipt transactionReceipt = erc20Mock.transfer(
        "0x2c8ad0ea2e0781db8b8c9242e07de3a5beabb71a",  // toAddress
        BigInteger.valueOf(10)  // value
).send();
```

Để kiểm tra số dư của người nhận \(e.g., `0x2c8ad0ea2e0781db8b8c9242e07de3a5beabb71a`\), hãy dùng mã sau:

```java
BigInteger balance = erc20Mock.balanceOf(
        "0x2c8ad0ea2e0781db8b8c9242e07de3a5beabb71a"  // owner
).send();
```

### Ủy thác phí <a id="fee-delegation"></a>

Klaytn cung cấp tính năng [Ủy thác phí][], cho phép nhà cung cấp dịch vụ trả phí giao dịch thay cho người sử dụng.

#### Chuyển giá trị <a id="value-transfer"></a>

Ở phía máy khách, máy khách là người khởi tạo giao dịch sẽ tạo một giao dịch chuyển giá trị có phí được ủy thác như sau: Người gửi tạo một đối tượng `ValueTransferTransaction`, sau đó [`transactionManager.sign()`](https://static.javadoc.io/com.klaytn.caver/core/1.0.2/com/klaytn/caver/tx/manager/TransactionManager.html#sign-com.klaytn.caver.tx.model.TransactionTransformer-boolean-) trả vệ một đối tượng `FeeDelegatedValueTransferTransaction` đã được ký nếu tham số thứ hai được đặt là `true`.

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

Một giao dịch đã ký, `senderRawTransaction`, được tạo ra. Bây giờ, người gửi chuyển giao dịch đến người trả phí, người này sẽ thanh toán khoản phí giao dịch. Các giao dịch chuyển nhượng giữa người gửi và người trả phí không được thực hiện trên mạng lưới Klaytn. Giao thức phải được chính họ xác định.

Sau khi người trả phí nhận được giao dịch từ người gửi, người trả phí có thể gửi giao dịch bằng lớp `FeePayerManager` như sau. `FeePayerManager.executeTransaction()` sẽ ký giao dịch nhận được bằng khóa riêng tư của người trả phí và gửi giao dịch đến mạng lưới Klaytn.

```java
KlayCredentials feePayer = KlayWalletUtils.loadCredentials(<password>, <walletfilePath>);
FeePayerManager feePayerManager = new FeePayerManager.Builder(caver, feePayer)
        .setChainId(ChainId.BAOBAB_TESTNET)
        .build();
feePayerManager.executeTransaction(senderRawTransaction);
```

#### Thực thi hợp đồng thông minh <a id="smart-contract-execution"></a>

Sự khác biệt giữa việc thực thi hợp đồng thông minh có phí được ủy thác với việc chuyển giá trị có phí ủy thác như trên nằm ở chỗ: việc này cần có dữ liệu đầu vào để gọi một hàm của hợp đồng thông minh. Người gửi có thể tạo một giao dịch thực thi hợp đồng thông minh có phí được ủy thác như sau. Lưu ý rằng [`transactionManager.sign()`](https://static.javadoc.io/com.klaytn.caver/core/1.0.2/com/klaytn/caver/tx/manager/TransactionManager.html#sign-com.klaytn.caver.tx.model.TransactionTransformer-boolean-) trả về đối tượng `TxTypeFeeDelegatedSmartContractExecution` nếu bạn đặt `true` cho tham số thứ hai. Ví dụ dưới đây gọi phương pháp `transfer` của hợp đồng [ERC20Mock](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/mocks/ERC20Mock.sol) được mô tả trong [Smart Contract][].

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

Sau khi bạn nhận được `senderRawTransaction`, phần còn lại quả quá trình sử dụng `FeePayerManager` theo cùng một cách như đã thấy tại [fee-delegated value transfer][] ở trên:

```java
KlayCredentials feePayer = KlayWalletUtils.loadCredentials(<password>, <walletfilePath>);
FeePayerManager feePayerManager = new FeePayerManager.Builder(caver, feePayer).build();
feePayerManager.executeTransaction(senderRawTransaction);
```
## Sử dụng nhiều loại AccountKey <a id="using-various-account-key-type"></a>

caver-java mang đến nhiều lớp mới để hỗ trợ các loại [AccountKey][] khác nhau được nền tảng hỗ trợ. Tính năng này được hỗ trợ từ phiên bản 1.2.0.

### AccountKey  <a id="account-key"></a>

Để cập nhật khóa tài khoản trên nền tảng Klaytn, caver-java cung cấp giao diện `AccountKey`. Nội dung dưới đây mô tả về `AccountKey` implementations, `AccountKeyPublic`, `AccountKeyWeightedMultiSig` và `AccountKeyRoleBased`. Hãy xem [AccountUpdate](#account-update) để tìm hiểu về cách cập nhật Tài khoản.

### AccountKeyPublic <a id="account-key-public"></a>

`AccountKeyPublic` là sự triển khai của `AccountKey` với một khóa công khai. Bạn có thể tạo như sau:

```java
ECKeyPair newKeyPair = Keys.createEcKeyPair();
AccountKeyPublic newAccountKey = AccountKeyPublic.create(newKeyPair.getPublicKey());
```

Để sử dụng tài khoản được cập nhật bằng `AccountKeyPublic`, bạn cần tạo `KlayCredentials` như dưới đây:

```java
KlayCredentials validCredentails = KlayCredentials.create(newKeyPair, oldCredentials.getAddress());

// Because the tài khoản address is decoupled from the AccountKeyPublic (public key), you can't use the tài khoản if you create the credentials without address as below.
KlayCredentials invalidCredentails = KlayCredentials.create(newKeyPair);
```

### AccountKeyWeightedMultiSig <a id="account-key-weighted-multi-sig"></a>

`AccountKeyWeightedMultiSig` là một khóa tài khoản có chứa nhiều khóa công khai với trọng số khác nhau. `AccountKeyWeightedMultiSig` còn xác định ngưỡng, tổng trọng số của các khóa cần phải ký để sử dụng tài khoản. Số lượng khóa tối đa được hỗ trợ là 10. Bạn có thể tạo `AccountKeyWeightedMultiSig` như dưới đây:

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

Để sử dụng tài khoản được cập nhật bằng `AccountKeyWeightedMultiSig`, bạn có thể tạo `KlayCredentials` như sau:

```java
List<ECKeyPair> transactionECKeyPairList = new ArrayList<>();

transactionECKeyPairList.add(ecKeyPair1);
transactionECKeyPairList.add(ecKeyPair2);

KlayCredentials newCredentails = KlayCredentials.create(transactionECKeyPairList, address);
```

### AccountKeyRoleBased <a id="account-key-role-based"></a>

`AccountKeyRoleBased` là một danh sách chứa `AccountKey`. Từng `AccountKey` đươc chỉ định một vai trò cụ thể theo vị trí của nó. AccountKey có thể là `AccountKeyPublic`,`AccountKeyWeightedMultiSig` hoặc `AccountKeyFail`. Nếu `AccountKeyNil` được dùng cho một vai trò cụ thể, khóa này sẽ không được cập nhật cho vai trò đó và AccountKey hiện có sẽ được sử dụng. Nếu `AccountKeyFail` được sử dụng, việc ký cho vai trò đó sẽ luôn thất bại, vì thế, hãy cẩn thận khi dùng AccountKeyFail.

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

Để sử dụng tài khoản được cập nhật bằng `AccountKeyRoleBased`, bạn có thể tạo `KlayCredentials` như sau:

```java
List<ECKeyPair> transactionECKeyPairList = Arrays.asList(newKeyPair1);
List<ECKeyPair> updateECKeyPairList = Arrays.asList(newKeyPair2);
List<ECKeyPair> feePayerECKeyPairList = Arrays.asList(newKeyPair3);

KlayCredentials newCredentails = KlayCredentials.create(transactionECKeyPairList, updateECKeyPairList, feePayerECKeyPairList, address);
```

Nếu tài khoản không có khóa cho một vai trò cụ thể, hãy dùng Danh sách trống làm đối số.

```java
List<ECKeyPair> transactionECKeyPairList = Collections.emptyList();
List<ECKeyPair> updateECKeyPairList = Arrays.asList(newKeyPair2);
List<ECKeyPair> feePayerECKeyPairList = Collections.emptyList();

KlayCredentials newCredentails = KlayCredentials.create(transactionECKeyPairList, updateECKeyPairList, feePayerECKeyPairList, address);
```

Nếu tài khoản có nhiều khóa cho một vai trò cụ thể, bạn có thể dùng nhiều khóa như dưới đây.

```java
List<ECKeyPair> transactionECKeyPairList = Collections.emptyList();
List<ECKeyPair> updateECKeyPairList = Arrays.asList(newKeyPair2-1, newKeyPair2-2, newKeyPair2-3);
List<ECKeyPair> feePayerECKeyPairList = Collections.emptyList();

KlayCredentials newCredentails = KlayCredentials.create(transactionECKeyPairList, updateECKeyPairList, feePayerECKeyPairList, address);
```

## Gửi một giao dịch có nhiều người ký <a id="sending-a-transaction-with-multiple-signers"></a>

Nếu một tài khoản có AccountKeyMultiSig hoặc AccountKeyRoleBased, từng khóa có thể được quản lý bởi nhiều người khác nhau.

Phần này mô tả cách để thu thập nhiều chữ ký và gửi giao dịch nếu có nhiều người ký.

### Người ký ký tuần tự <a id="sequential-sender-signing"></a>

`rawTransaction` có một giao dịch mã hóa RLP chứa cả `txSignatures` lẫn `feePayerSignatures`. `feePayerSignature` chỉ được đưa vào khi giao dịch là giao dịch có phí ủy thác.

Khi không có người trả phí, quy trình ký và thực thi giao dịch lặp đi lặp lại có thể được chia thành ba phần. 1. RLP mã hóa giao dịch và gửi nó đến người ký dưới hình thức rawTransaction. 2. Người ký ký bằng khóa của riêng mình cho rawTransaction nhận được. 3. Gửi rawTransaction đã ký đến EN. Bước 2 có thể được lặp lại nếu có nhiều người ký.

```java
//// 1. Alice tạo một giao dịch, ký và gửi cho Bob.
//// Alice Side
ValueTransferTransaction transactionTransformer = ValueTransferTransaction.create(from, to, BigInteger.ONE, GAS_LIMIT);

TransactionManager transactionManager_alice = new TransactionManager.Builder(caver, senderCredential_alice)
                    .setTransactionReceiptProcessor(new PollingTransactionReceiptProcessor(caver, 1000, 10))
                    .setChaindId(LOCAL_CHAIN_ID)
                    .build();

String rawTransaction_signed_alice = transactionManager_alice.sign(transactionTransformer).getValueAsString();

//// 2. Bob ký giao dịch nhận được và gửi cho Charlie.
//// Bob Side
            TransactionManager transactionManager_bob = new TransactionManager.Builder(caver, senderCredential_bob)
                    .setTransactionReceiptProcessor(new PollingTransactionReceiptProcessor(caver, 1000, 10))
                    .setChaindId(LOCAL_CHAIN_ID)
                    .build();

String rawTransaction_signed_alice_and_bob = transactionManager_bob.sign(rawTransaction_signed_alice).getValueAsString();

//// 3. Charlie ký giao dịch nhận được và gửi đến Klaytn EN.
//// Charlie Side
TransactionManager transactionManager_charlie = new TransactionManager.Builder(caver, senderCredential_charlie)
                    .setTransactionReceiptProcessor(new PollingTransactionReceiptProcessor(caver, 1000, 10))
                    .setChaindId(LOCAL_CHAIN_ID)
                    .build();

KlayTransactionReceipt.TransactionReceipt transactionReceipt = transactionManager_charlie.executeTransaction(rawTransaction_signed_alice_and_bob);
```

### Người trả phí ký tuần tự <a id="sequential-fee-payer-signing"></a>

(Các) chữ ký của người trả phí cũng có thể được thêm vào một cách tuần tự. Ký bằng `FeePayerManager` tích lũy `feePayerSignatures` trong giao dịch. Thứ tự ký không quan trọng. Nếu bạn ký bằng `TransactionManager`, `txSignature` sẽ được thêm vào. Nếu bạn ký bằng `FeePayerManager`, `feePayerSignatures` sẽ được thêm vào giao dịch thô.

```java
//// 1. Bob nhận được giao dịch từ Alice và ký giao dịch với tư cách là người trả phí.
//// Bob Side
FeePayerManager feePayerManager_bob = new FeePayerManager.Builder(caver, feePayerCredentials_bob)
                    .setTransactionReceiptProcessor(new PollingTransactionReceiptProcessor(caver, 1000, 10))
                    .setChainId(LOCAL_CHAIN_ID)
                    .build();

String rawTransaction_signed_alice_and_bob = feePayerManager_bob.sign(rawTransaction_signed_alice).getValueAsString();

//// 2. Charlie ký giao dịch nhận được và gửi đến Klaytn EN.
//// Charlie Side
FeePayerManager feePayerManager_charlie = new FeePayerManager.Builder(caver, feePayerCredentials_charlie)
                    .setTransactionReceiptProcessor(new PollingTransactionReceiptProcessor(caver, 1000, 10))
                    .setChainId(LOCAL_CHAIN_ID)
                    .build();

KlayTransactionReceipt.TransactionReceipt transactionReceipt =  feePayerManager_charlie.executeTransaction(rawTransaction_signed_alice_and_bob);
```

## Xin cảm ơn <a id="thanks-to"></a>

Dự án [web3j](https://github.com/web3j/web3j) vì nguồn cảm hứng này. 🙂


[Ví Klaytn]: ../../../build/tools/wallets/klaytn-wallet.md
[txError]: ../../transaction-error-codes.md
[AccountKeyPublic]: ../../../learn/accounts.md#accountkeypublic
[AccountKey]: ../../../learn/accounts.md#account-key
[Trình biên dịch Solidity]: #solidity-compiler
[công cụ dòng lệnh]: #command-line-tool
[Ủy thác phí]: ../../../learn/transactions/transactions.md#fee-delegation
[Smart Contract]: #smart-contract
[fee-delegated value transfer]: #value-transfer

