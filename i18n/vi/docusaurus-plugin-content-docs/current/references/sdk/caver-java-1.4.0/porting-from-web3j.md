# Di chuyển từ web3j

Chúng tôi đã tạo ra caver-java sao cho tương đồng với [web3j](https://github.com/web3j/web3j) nhất có thể để tạo điều kiện cho tính khả chuyển. Đoạn mã dưới đây cho thấy cách chuyển một ứng dụng được viết bằng web3j sang caver-java.

```java
/* start a client */
Web3j web3 = Web3j.build(new HttpService(<endpoint>)); // Web3j
Caver caver = Caver.build(new HttpService(<endpoint>)); // caver-java

/* get nonce */
BigInteger nonce = web3j.ethGetTransactionCount(<address>, <blockParam>).send().getTransactionCount(); // Web3j
Quantity nonce = caver.klay().getTransactionCount(<address>, <blockParam>).send().getValue(); // caver-java

/* convert unit */
Convert.toWei("1.0", Convert.Unit.ETHER).toBigInteger(); // Web3j
Convert.toPeb("1.0", Convert.Unit.KLAY).toBigInteger(); // caver-java

/* generate wallet file */
WalletUtils.generateNewWalletFile(<password>, <filepath>); // Web3j
KlayWalletUtils.generateNewWalletFile(<address>, <password>, <filepath>); // caver-java

/* load credentials */
Credentials credentials = WalletUtils.loadCrendetials(<password>, <filepath>"); // Web3j
KlayCredentials credentials = KlayWalletUtils.loadCredentials(<password>, <filepath>); // caver-java

/* Value Transfer */
TransactionReceipt transactionReceipt = Transfer.sendFunds(...),send(); // Web3j
KlayTransactionReceipt.TransactionReceipt transactionReceipt = ValueTransfer.sendFunds().send(); // caver-java
```

## <a id=""></a>
