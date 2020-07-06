# Getting Started <a id="getting-started"></a>

## Prerequisites <a id="prerequisites"></a>

### Dependency <a id="dependency"></a>

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

If you want to use Android dependency, just append -android at the end of the version string. \(e.g. 1.0.1-android\)

If you want to see details of the JSON-RPC requests and responses, please include [LOGBack](https://logback.qos.ch/) dependency in your project. Below is a Gradle build file example. You can add the dependency to Maven as well. Since caver-java uses the [SLF4J](https://www.slf4j.org/) logging facade, you can switch to your preferred logging framework instead of LOGBack.

```groovy
implementation "ch.qos.logback:logback-classic:1.2.3"
```

**Note**: In the central repository, the RC, Android, and Java versions are listed together. If you use wildcards to get a version, you may be using a version that is not appropriate for your platform.

#### Command-line Tool <a id="command-line-tool"></a>

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


## Sending KLAY at a glance

This section describes a simple example of using a `keystore file` to send KLAY with a value transfer transaction. The keystore file can be created in [Klaytn Wallet](../../../toolkit/klaytn-wallet.md#how-to-receive-baobab-testnet-klay). If you need KLAY for testing, you can get Baobab testnet KLAY from the [Klaytn Wallet](../../../toolkit/klaytn-wallet.md#how-to-receive-baobab-testnet-klay).

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

        //Create value transfer transaction
        ValueTransfer valueTransfer = new ValueTransfer.Builder()
                .setKlaytnCall(caver.rpc.getKlay())
                .setFrom(keyring.getAddress())
                .setTo("0x8084fed6b1847448c24692470fc3b2ed87f9eb47")
                .setValue(value)
                .setGas(BigInteger.valueOf(25000))
                .build();

        //Sign to the transaction
        valueTransfer.sign(keyring);

        //Send transaction to the klaytn blockchain platform (Klaytn)
        Bytes32 result = caver.rpc.klay.sendRawTransaction(valueTransfer.getRawTransaction()).send();
        if(result.hasError()) {
            throw new RuntimeException(result.getError().getMessage());
        }

        //Check transaction receipt.
        TransactionReceiptProcessor transactionReceiptProcessor = new PollingTransactionReceiptProcessor(caver, 1000, 15);
        if(result.hasError()) {
            throw new RuntimeException(result.getError().getMessage());
        }

        TransactionReceipt.TransactionReceiptData transactionReceipt = transactionReceiptProcessor.waitForTransactionReceipt(result.getResult());
    }
```


## Starting with caver-java <a id="starting-with-caver-java"></a>

### Connecting to a Klaytn Node <a id="connecting-to-a-klaytn-node"></a>

You can import the caver-java module and connect it to a Klaytn Node in the Baobab testnet as shown in the example below:

```java
Caver caver = new Caver(Caver.BAOBAB_URL); // Caver.BAOBAB_URL = https://api.baobab.klaytn.net:8651
```

If you are running an EN, you can connect it to your own node by changing the host and port like below:

```java
Caver caver = new Caver("http://localhost:8551/");
```


## Managing Keyrings <a id="managing-keyrings"></a>

[Keyring] is a structure that contains the address of the Klaytn account and the private key(s). 

[Keyring] can be classified into three types depending on the type of key being stored: [SingleKeyring] to store one address and one private key, [MultipleKeyring] to store one address and multiple private keys, and [RoleBasedKeyring] to store one address and one or more private keys for each role.

[SingleKeyring] defines `key` property inside, and this `key` store one private key.

[MultipleKeyring] defines `keys` property inside, and this `keys` is implemented as an array to store multiple private keys.

The `keys` property defined in [RoleBasedKeyring] is implemented as a List with an array of elements (empty `keys` will look like `[ [], [], [] ]`) that can include multiple keys for each [role]. The first element of the array is filled with the private key(s) to be used for `roleTransactionKey`, the second element the private key(s) to be used for `roleAccountUpdateKey`, and the third element the private key(s) to be used for `roleFeePayerKey`.

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

also you can derived SingleKeyring instance from Klaytn wallet key.

```java
String klaytnWalletKey = "0x{private key}0x{type}0x{address in hex}";
SingleKeyring keyring = KeyringFactory.createFromKlaytnWalletKey(klaytnWalletKey);
```

#### Creating a MultipleKeyring with multiple private keys <a id="creating-a-multiplekeyring-with-multiple-private-keys"></a>

If you want to use multiple private keys, you can create a [MultipleKeyring] using an address and multiple private keys. The below examples show how to create a [MultipleKeyring] with multiple private keys.

```java
String address = "0x{address in hex}";
String[] privateKeyArray = new String[] {"0x{private key#1}", "0x{private key#2}", "0x{prviate key#3}"};
MultipleKeyring multipleKeyring = MultipleKeyring multipleKeyring = KeyringFactory.createWithMultipleKey(address, privateKeyArray);
```

#### Creating a RoleBasedKeyring with private keys <a id="creating-a-rolebasedkeyring-with-role-based-private-keys"></a>

To use different private key(s) for each [role], `KeyringFactory.createWithRoleBasedKey` is used instead. Each array element represents a role described in [RoleBasedKeyring]. The example below shows how to create a [RoleBasedKeyring] instance from different keys for each role.

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

### Adding Keyrings to caver-java <a id="adding-keyrings-to-caver-java"></a>

You can use a keyring easily by using the in-memory wallet provided by caver-java. The following examples illustrate how to add a keyring to a wallet using a keyring instance and a keystore file generated by [Klaytn Wallet](https://wallet.klaytn.com/).

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

caver.wallet.add(decrypt);
System.out.println("address : " + decrypt.getAddress());
System.out.println("key : " + decrypt.getKey());
```

```bash
Decrypted address : 0xc02cec4d0346bf4124deeb55c5216a4138a40a8c
Decrypted key : 0x93c90135ae69669e416ba5997d9274f8c8bd60748761fc421e415602d68a13a5

address : 0xc02cec4d0346bf4124deeb55c5216a4138a40a8c
key : 0x93c90135ae69669e416ba5997d9274f8c8bd60748761fc421e415602d68a13a5
```

Looking at the output above, you can query your keyring from `caver.wallet` after adding it to `caver.wallet`.

If you have an address and private key(s) to use, you can easily create a keyring and add it directly to [caver.wallet] via [caver.wallet.newKeyring].

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

When `caver.wallet.newKeyring` is executed with a private key, a Keyring instance with one private key is created and added to `caver.wallet`. For multiple private keys, a Keyring instance with multiple private keys is created. When passing one or more private keys for each role as arguments, a Keyring instance with a different private key(s) for each role is created and also added to the `caver.wallet`.

`caver.wallet.add` or `caver.wallet.newKeyring` returns a Keyring instance after adding it to `caver.wallet`.
