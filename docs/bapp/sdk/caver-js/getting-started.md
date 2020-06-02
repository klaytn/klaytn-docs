# Getting Started <a id="getting-started"></a>

This Getting Started is based on caver-js v1.5.0 or higher. If you are using an older version, see [Getting Started (~v1.4.1)](v1.4.1/getting-started.md).

## Prerequisites <a id="prerequisites"></a>

### Dependencies <a id="dependencies"></a>

The following packages are required to use the caver-js library.

* [Node.js](https://nodejs.org/en/download/)
* [npm](https://www.npmjs.com/get-npm)
* [gcc-c++](https://gcc.gnu.org/)
* [Solidity compiler](https://solidity.readthedocs.io/en/develop/installing-solidity.html)

**Note** caver-js can run on Node.js versions 8 and 10, and the recommended versions are:

* lts/carbon \([8.16.0](https://nodejs.org/dist/latest-v8.x/)\)
* lts/dubnium \([10.16.0](https://nodejs.org/dist/latest-v10.x/)\)

If you are already using a different version of the Node \(for example, Node v12\), use the Node Version Manager\([NVM](https://github.com/nvm-sh/nvm)\) to install and use the version supported by caver-js.

### Installation <a id="installation"></a>

To try it out, install caver-js with npm using the following command:

```text
$ npm install caver-js
```

**Note**: `package.json` file should exist on the same install path. If it does not exist, `package.json` should be generated via `npm init`.

To install a specific version of caver-js, try the following command:

```text
$ npm install caver-js@X.X.Xd
```

## Starting with caver-js <a id="starting-with-caver-js"></a>

Once you have finished installing caver-js, you can now connect caver-js with a Klaytn Node.

The examples below describe in a Node.js file. To practice the examples, first create a test file in the working directory as shown below.

```bash
$ touch test.js
```
You can see the `test.js` file created in the working directory.

Write the following code in test.js.
```javascript
// test.js file
const Caver = require('caver-js')
const caver = new Caver('https://api.baobab.klaytn.net:8651/')

async function testFunction() {
	const version = await caver.rpc.klay.getNodeInfo()
	console.log(version)
}

testFunction()
```

Save the file and run it in your console.

```bash
$ node ./test.js
```

If you see the output of console.log, proceed with the steps below.

### Connecting with a Klaytn Node

You can import the caver-js module and connect it to a Klaytn Node in the Baobab testnet as shown in the example below:

```javascript
const Caver = require('caver-js')
const caver = new Caver('https://api.baobab.klaytn.net:8651/')
```

If you are running an EN, you can connect it to your own node by changing the host and port like below:

```javascript
const Caver = require('caver-js')
const caver = new Caver('http://localhost:8551/')
```

## Managing Keyrings <a id="managing-keyrings"></a>

### Creating a Keyring <a id="creating-a-keyring"></a>

[Keyring] is used in Caver SDK, and is a class that contains the address of the account and the private key(s) to use when signing. You can use `caver-js` to create a keyring as shown below.

```javascript
const keyring = caver.wallet.keyring.generate()
console.log(keyring)
```

Below is the result of printing the keyring. Member variables defined inside the instance can be accessed by keyring.addres and keyring.keys.

```text
Keyring {
  _address: '0x9f65d63fac94b5caadfca721ad0373b5561abc85',
  _keys: [ [ PrivateKey { _privateKey: '0x{private key}' } ], [], [] ]
}
```

Also, if you own a specific private key or [KlaytnWalletKey], you can use it to create a keyring as shown below.

```javascript
// Create from a private key
const keyring = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
console.log(keyring)
```

```javascript
// Create from a KlaytnWalletKey
const keyring = caver.wallet.keyring.createFromKlaytnWalletKey('0x{private key}0x{type}0x{address in hex}')
console.log(keyring)
```

The results of `caver.wallet.keyring.createFromPrivateKey` and `caver.wallet.keyring.createFromKlaytnWalletKey`, like the resulot of `caver.wallet.keyring.generate` above, have an address defined inside and one PrivateKey instance defined in the first element of the keys array.

If [AccountKey] of your account in Klaytn network is updated, you can create a keyring using the address and the updated private key(s).

```javascript
// Create with an address and a private key
const keyring = caver.wallet.keyring.createWithSingleKey('0x{address in hex}', '0x{private key}')
console.log(keyring)
```

The result of caver.wallet.keyring.createWithSingleKey is shown below.

```text
Keyring {
  _address: '0x45c2a1e3a1c3957a06dae73ad516461c2d2c7ccc',
  _keys: [ [ PrivateKey { _privateKey: '0x{private key}' } ], [], [] ]
}
```

Let's create a Keyring instance using several private keys as shown below.

```javascript
// Create with an address and private keys
const keyring = caver.wallet.keyring.createWithMultipleKey('0x{address in hex}', [ '0x{private key}', '0x{private key}' ])
console.log(keyring)
```

Below is the output of the example above. The keys array of the created Keyring instance has multiple PrivateKey instances in the first element of the array.

```text
Keyring {
  _address: '0x45c2a1e3a1c3957a06dae73ad516461c2d2c7ccc',
  _keys: [ 
	  [  PrivateKey { _privateKey: '0x{private key}' }, PrivateKey { _privateKey: '0x{private key}' } ],
	  [],
	  []
	]
}
```

Then, let's create a Keyring instance that uses a different keys for each role as shown below.

```javascript
// Create with an address and private keys defined by each roles
const keyring = caver.wallet.keyring.createWithRoleBasedKey('0x{address in hex}', [
	[ '0x{private key}', '0x{private key}', '0x{private key}' ],
	[ '0x{private key}'],
	[ '0x{private key}', '0x{private key}' ],
])
console.log(keyring)
```

Looking at the output below, the first element of the keys array, `roleTransactionKey`, has 3 PrivateKey instances, and the second element, `roleAccountUpdateKey`, has 1 PrivateKey instance. And the last element of the array, `roleFeePayerKey`, has 2 PrivateKey instances.

```text
Keyring {
  _address: '0x45c2a1e3a1c3957a06dae73ad516461c2d2c7ccc',
  _keys: [ 
	  [  PrivateKey { _privateKey: '0x{private key}' }, PrivateKey { _privateKey: '0x{private key}' }, PrivateKey { _privateKey: '0x{private key}' } ],
	  [ PrivateKey { _privateKey: '0x{private key}' } ],
	  [ PrivateKey { _privateKey: '0x{private key}' }, PrivateKey { _privateKey: '0x{private key}' }]
	]
}
```

**Note**: Functions related to keyring ([caver.wallet.keyring]) or wallet ([caver.wallet]) do not affect the actual Klaytn network.

### Add Keyrings to caver-js <a id="add-keyrings-to-caver-js"></a>

You can use your keyring easily by using the in-memory wallet provided by caver-js. The following examples illustrate how to add an keyring to a wallet using a keyring instance and a keystore file generated by Klaytn Wallet.

```javascript
// Using a keyring instance
const keyring = caver.wallet.keyring.generate()
caver.wallet.add(keyring)

// Using a keystore file
const decrypted = caver.wallet.keyring.decrypt({
	version: 4,
	id: '55da3f9c-6444-4fc1-abfa-f2eabfc57501',
	address: '0x45c2a1e3a1c3957a06dae73ad516461c2d2c7ccc',
	keyring: [ ... ],
}, 'password')
caver.wallet.add(decrypted)
```

If you have an address and private key(s) to use, you can easily add it directly to [caver.wallet] via [caver.wallet.newKeyring].

```javascript
// Add to wallet with an address and a private key
const added = caver.wallet.newKeyring('0x{address in hex}', '0x{private key}')

// Add to wallet with an address and private keys
const added = caver.wallet.newKeyring('0x{address in hex}', ['0x{private key}', '0x{private key}', '0x{private key}'])

// Add to wallet with an address and private keys defined by each roles
const added = caver.wallet.newKeyring('0x{address in hex}', [
	['0x{private key}', '0x{private key}', '0x{private key}'],
	['0x{private key}', '0x{private key}'],
	['0x{private key}', '0x{private key}']
])
```

`caver.wallet.add` or `caver.wallet.newKeyring` returns a Keyring instance added to caver.wallet.

## Sending a Transaction <a id="sending-a-transaction"></a>

This section will show you how to send a KLAY using caver-js on the Baobab network.

### Getting KLAY via Baobab Faucet <a id="getting-klay-via-baobab-faucet"></a>

If you need KLAY for testing, you can get Baobab testnet KLAY from the [Klaytn Wallet](../../../toolkit/klaytn-wallet.md#how-to-receive-baobab-testnet-klay). Log in to the Klaytn Wallet using the private key or the keystore file and receive Baobab testnet KLAY via the faucet for testing.

### Sending a Value Transfer Transaction <a id="sending-a-value-transfer-transaction"></a>

You can use a caver-js wallet to generate a signature of a transaction. You have to go through 2 steps below to send the transaction to the network.

1. Sign to transaction
	- If the keyring you want to use is added to [caver.wallet], you can use the following functions to sign.
		- caver.wallet.signWithKey
		- caver.wallet.signWithKeys
		- caver.wallet.signFeePayerWithKey
		- caver.wallet.signFeePayerWithKeys
	- If you manage the keyring separately without adding to caver.wallet, you can sign through the transaction.
		- transaction.signWithKey
		- transaction.signWithKeys
		- transaction.signFeePayerWithKey
		- transaction.signFeePayerWithKeys
2. Send RLP-encoded string to Klaytn network via `caver.rpc.klay.sendRawTransaction`

**Note:** The sender should have enough amount of KLAY.

Below is an example of how to sign a transaction if a keyring is added to the [caver-wallet].

```javascript
// Add keyring to caver.wallet
const keyring = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
caver.wallet.add(keyring)

// Create value transfer transaction
const valueTransfer = new caver.transaction.valueTransfer({
	from: keyring.address,
	to: '0x176ff0344de49c04be577a3512b6991507647f72',
	value: 1,
	gas: 30000,
})

// Sign transaction via caver.wallet.signWithKeys
await caver.wallet.signWithKeys(keyring.address, valueTransfer)

const receipt = await caver.rpc.klay.sendRawTransaction(valueTransfer.getRLPEncoding())
console.log(receipt)
```

If you want to sign a transaction and send it to the network without using caver.wallet, see the example below.

```javascript
// Create value transfer transaction
const keyring = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
const valueTransfer = new caver.transaction.valueTransfer({
	from: keyring.address,
	to: '0x176ff0344de49c04be577a3512b6991507647f72',
	value: 1,
	gas: 30000,
})

// Sign transaction via transaction.signWithKeys
await valueTransfer.signWithKeys(keyring)

const receipt = await caver.rpc.klay.sendRawTransaction(valueTransfer.getRLPEncoding())
console.log(receipt)
```

If you have finished signing using [caver.wallet] or using the transaction's sign function, the transaction instance has signatures. You can get a RLP-encoded transaction (`rawTransaction`) using `transaction.getRLPEncoding()` as above and use this to transfer the transaction to the Klaytn network as below.

```javascript
const receipt = await caver.rpc.klay.sendRawTransaction(valueTransfer.getRLPEncoding())
console.log(receipt)
```

### Checking Receipts <a id="checking-receipts"></a>

You can use the promise or event emitter to get the receipt of the transaction when you transfer the transaction to [caver.rpc.klay.sendRawTransaction].

The following example shows how to get a receipt using promise and event emitter.

```javascript
// Using promise - async/await
const receipt = await caver.rpc.klay.sendRawTransaction(rawTransaction)
console.log(receipt)

// Using promise
caver.rpc.klay.sendRawTransaction(rawTransaction).then(console.log)

// Using event emitter
caver.rpc.klay.sendRawTransaction(rawTransaction).on('receipt', console.log)
```

As described in the example above, you can get the result of sending a transaction through the promise and event emitter. And also, if you know the transaction hash, you can query the transaction receipt using the [caver.rpc.klay.getTransactionReceipt] RPC call. The example below shows how to get a receipt using the [caver.rpc.klay.getTransactionReceipt] RPC call.

```javascript
const receipt = caver.rpc.klay.getTransactionReceipt('0xbad4dd6d80beda6c04d90f1db7e4179557ab48423d4f14295b33e38a9418e59f')
console.log(receipt)
```

The result of the transaction can be found through the status of the receipt. For a detailed description of the return values, see [caver.rpc.klay.getTransactionReceipt]. If a transaction is failed, you can check the detailed error in `txError` of the receipt. For more information about `txError`, see [txError: Detailed Information of Transaction Failures].

## Executing Other Transaction Types <a id="executing-other-transaction-types"></a>

Klaytn provides various transaction types for extensibility and performance. For more information, see [Transactions](../../../klaytn/design/transactions/README.md). This section describes various examples that can be used with caver-js.

### Fee Delegation <a id="fee-delegation"></a>

Klaytn provides [Fee Delegation] feature. Here's an example code.

When you are a sender, use the code below to make an RLP-encoded transaction:

```javascript
const sender = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
caver.wallet.add(sender)

const feeDelegatedTx = new caver.transaction.feeDelegatedValueTransfer({
	from: sender.address,
	to: '0x176ff0344de49c04be577a3512b6991507647f72',
	value: 5,
	gas: 50000,
})

await caver.wallet.signWithKeys(sender.address, feeDelegatedTx)

const rlpEncoded = feeDelegatedTx.getRLPEncoding()
```

With the signed RLP-encoded string (`rawTransaction`), the fee payer can send the transaction after attaching the feePayerSignatures. If the fee payer can access to the above feeDelegatedTx instance signed by the sender, can sign directly to feeDelegatedTx. Otherwise, you can create a transaction instance and sign it using a signed RLP-encoded string, as in the example below.

```javascript
const feePayer = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
caver.wallet.add(feePayer)

const feeDelegateTxFromRLPEncoding = new caver.transaction.feeDelegatedValueTransfer(rlpEncoded)
// Set fee payer address in transaction instance
feeDelegateTxFromRLPEncoding.feePayer = feePayer.address
await caver.wallet.signFeePayerWithKeys(feePayer.address, feeDelegateTxFromRLPEncoding)
console.log(feeDelegateTxFromRLPEncoding)
```

If you run the above code, you can see that the `signatures` signed by sender and `feePayerSignatures` signed by feePayer are defined inside feeDelegatedTxFroRLPEncoding. If both the sender and fee payer are signed, send signed transaction to the network as shown below.

```javascript
const receipt = await caver.rpc.klay.sendRawTransaction(feeDelegateTxFromRLPEncoding.getRLPEncoding())
console.log(receipt)
```

### Account Update <a id="account-update"></a>

If you want to use other private key(s), you need to send a transaction to change the accountKey of the account stored in the Klaytn network. Please check [Account Update] for the details.

In the [Account Update] transaction, the `account` field must be defined. The account field must have an [Account] instance defined. [Account] is a structure that stores information necessary for account update. The address of the account to be updated and the accountKey to be updated are defined inside.

Below is an example of how to update to [AccountKeyPublic].

```javascript
let sender = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
caver.wallet.add(sender)

const newPrivateKey = caver.wallet.keyring.generateSingleKey()
const newKeyring = caver.wallet.keyring.createWithSingleKey(sender.address, newPrivateKey)

// create an Account instance
// getPublicKey will return [ ['0x..'], [], [] ]
const account = caver.account.createWithAccountKeyPublic(sender.address, newKeyring.getPublicKey()[0][0])

const updateTx = new caver.transaction.accountUpdate({
	from: sender.address,
	account,
	gas: 50000,
})
await caver.wallet.signWithKeys(sender.address, updateTx)
const receipt = await caver.rpc.klay.sendRawTransaction(updateTx)
console.log(receipt)
```

If the above code is executed successfully, you can no longer use the old private key(s). The keyring in caver.wallet stores the old private key(s), so you must update it with the new private key(s). In the code above, `newKeyring` has a new private key, so use it to update the keyring inside caver.wallet as shown below.

```javascript
sender = caver.wallet.updateKeyring(newKeyring)
```

When the keyring inside the caver.wallet is updated as above, when using the caver.wallet to sign in the future, it is signed using the newly updated private key(s).

Do you want to update your account to various [AccountKey]? The example below explains how to create an account instance to update with various AccountKeys.

First, let's create an account to update with [AccountKeyWeightedMultiSig]. For [AccountKeyWeightedMultiSig], threshold and weight for each key must be defined. To do this, use [caver.account.weightedMultiSigOptions]. The first parameter is the threshold, and the second parameter is an array in which the weight for each key.

```javascript
// Create an account with AccountKeyWeightedMultiSig
const newPrivateKeys = caver.wallet.keyring.generateMultipleKeys(3)
const newKeyring = caver.wallet.keyring.createWithMultipleKey(sender.address, newPrivateKeys)

const options = new caver.account.weightedMultiSigOptions(3, [1, 2, 1])

const account = caver.account.createWithAccountKeyWeightedMultiSig(sender.address, newKeyring.getPublicKey()[0], options)
```

Now let's update accountKey to [AccountKeyRoleBased]. [AccountKeyRoleBased] is an AccountKey type that defines the key to use for each [role].

```javascript
// Create an account with AccountKeyRoleBased
const newPrivateKeys = caver.wallet.keyring.generateRoleBasedKeys([1, 1, 1])
const newKeyring = caver.wallet.keyring.createWithRoleBasedKey(sender.address, newPrivateKeys)

const account = caver.account.createWithAccountKeyRoleBased(sender.address, newKeyring.getPublicKey())
```

The AccountKeyRoleBased above is an example of using one private key for each role. If you want to use multiple private keys for each role, [caver.account.weightedMultiSigOptions] must be defined for each role as shown below.

```javascript
// Create an account with AccountKeyRoleBased
const newPrivateKeys = caver.wallet.keyring.generateRoleBasedKeys([3, 2, 3])
const newKeyring = caver.wallet.keyring.createWithRoleBasedKey(sender.address, newPrivateKeys)

const options = [
	new caver.account.weightedMultiSigOptions(4, [2, 2, 4]),
	new caver.account.weightedMultiSigOptions(2, [1, 1]),
	new caver.account.weightedMultiSigOptions(3, [1, 1, 1]),
]

const account = caver.account.createWithAccountKeyRoleBased(sender.address, newKeyring.getPublicKey(), options)
```

If you want to update accountKey to [AccountKeyLegacy] or [accountKeyFail], create an account as shown below and assign it to the account field of the transaction.

```javascript
// Create an account with AccountKeyLegacy
const accountKeyLegacy = caver.account.createWithAccountKeyLegacy(keyringToUpdate.address)

// Create an account with AccountKeyFail
const accountKeyFail = caver.account.createWithAccountKeyFail(keyringToUpdate.address)
```

### Smart Contract <a id="smart-contract"></a>

The [caver.contract] package makes it easy to interact with smart contracts on Klaytn. It automatically converts all methods of a smart contract into javascript calls when its low-level ABI \(Application Binary Interface\) is given. This allows you to interact with smart contracts as if they were JavaScript objects.

First, we start by compiling a smart contract to get its bytecode and ABI.

```text
> solc --abi --bin --allow-paths . ./test.sol
======= ./test.sol:Count =======
Binary: 
60806040526000805534801561001457600080fd5b50610123806100246000396000f3fe6080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60df565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260e5565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060dd6004803603602081101560c857600080fd5b810190808035906020019092919050505060ed565b005b60005481565b600043905090565b806000819055505056fea165627a7a72305820e381897039d8e48bf74b4a096bb1c4ed02f331bd1a7a4add6217b72fa888f2f10029
Contract JSON ABI 
[{"constant":true,"inputs":[],"name":"count","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getBlockNumber","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_count","type":"uint256"}],"name":"setCount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
```

**NOTE**: To compile a smart contract, you must have a solidity compiler installed.

For smart contract deployment, you can use [caver.contract] to deploy it, or you can deploy it using [caver.transaction.smartContractDeploy], [caver.transaction.feeDelegatedSmartContractDeploy] or [caver.transaction.feeDelegatedSmartContractDeployWithRatio] transaction. Here is an example of using [caver.contract].

You can create a contract instance as below using the result of compiling the smart contract.

```javascript
const abi = [{"constant":true,"inputs":[],"name":"count","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getBlockNumber","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_count","type":"uint256"}],"name":"setCount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
const contractInstance = new caver.contract(abi)
```

If the smart contract has already been deployed and you know the contract address where the smart contract was deployed, please pass the contract address to the second parameter as shown below.
```javascript
const contractInstance = new caver.contract(abi, '0x{address in hex}')
```

If the contract instance is created, you can deploy it by passing the bytecode to the `data` field as shown below.

Note that [caver.contract] sends transactions for deployment and execution. And uses keyrigs in caver.wallet to sign transactions. The keyring to be used must be added to caver.wallet.

```javascript
caver.wallet.add(keyring)

const deployedInstance = contractInstance.deploy({
    data:  '60806040526000805534801561001457600080fd5b50610123806100246000396000f3fe6080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60df565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260e5565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060dd6004803603602081101560c857600080fd5b810190808035906020019092919050505060ed565b005b60005481565b600043905090565b806000819055505056fea165627a7a72305820e381897039d8e48bf74b4a096bb1c4ed02f331bd1a7a4add6217b72fa888f2f10029',
}).send({
    from: keyring.address,
    gas: '0x4bfd200',
    value: '0x0',
})
```

The deploy function will return another contract instance that includes deployed contract address. You can check deployed contract address like below

```javascript
console.log(deployedInstance.options.address)
```

One way to invoke a specific method of a smart contract is to use it with `caver.contract` or use [caver.transaction.smartContractExecution], [caver.transaction.feeDelegatedSmartContractExecution] or [caver.transaction.feeDelegatedSmartContractExecutionWithRatio] transaction.

To transact with a smart contract:

```javascript
caver.wallet.add(keyring)

const receipt = await contractInstance.methods.setCount(1).send({from:account.address, gas:'0x4bfd200'})
console.log(receipt)
```

To call a smart contract:

```javascript
const blockNumber = await contractInstance.methods.getBlockNumber().call()
console.log(blockNumber)
```

See [caver.contract] for details.

## Sending a Transaction with multiple signer<a id="sending-a-transaction-with-multiple-signer"></a>

If the account's accountKey is AccountKeyMultiSig or AccountKeyRoleBased, the person who manages each key can be different.

This section describes how to collect signatures and send the transaction if there are multiple signers.

### Sequential sign <a id="sequential-sign"></a>
When a transaction is signed using caver.wallet or the transaction's sign function, signatures (or feePayerSignatures) are defined (or appended) inside the transaction. You can obtain the RLP-encoded string (`rawTransaction`) containing the signatures (and feePayerSignatures) by calling the `transaction.getRLPEncoding()` function of the signed transaction instance.

The following example shows how to sign a transaction sequentially with multiple private keys.
Assume the accountKey of sender is AccountKeyWeightedMultiSig which uses two private key strings and two users each have a private key.

First, User 1 signs the transaction as shown below using one private key he has.

```javascript
const user1 = caver.wallet.newKeyring('0x{address in hex}', '0x{private key}')

const vt = new caver.transaction.valueTransfer({
	from: user1.address,
	to: '0x45c2a1e3a1c3957a06dae73ad516461c2d2c7ccc',
	value: 1,
	gas: 70000,
})

await caver.wallet.signWithKeys(user1.address, vt)
console.log(vt.signatures)
```

If you run the code above, you can see that vt.signatures contains User1's signature. 

Then let's see how to sign sequentially. User1 passes RLP-encoded string that is the result of getRLPEncoding function of the signed transaction to User2.

The code below explains how to sign and append signatures with RLP-encoded string.

```javascript
const user2 = caver.wallet.newKeyring('0x{address in hex}', '0x{private key}')

const vt = new caver.transaction.valueTransfer(rlpEncoding)

await caver.wallet.signWithKeys(user2.address, vt)
console.log(vt.signatures)
```

If you run the above code, you can see that v2.signatures has User2's signature appended, and a total of 2 signatures are included.

When all users have signed, send a transaction to the network as shown below.

```javascript
const receipt = await caver.rpc.klay.sendRawTransaction(vt.getRLPEncoding())
console.log(receipt)
```

If you send a fee delegation transaction, and the fee payer uses multiple keys, you can proceed with the above logic using `caver.wallet.signFeePayerWithKeys`.

### Combine signatures from RawTransaction <a id="combine-signatures-from-rawtransaction"></a>

If you receive RLP-encoded string result of signing from several people, you can create a single RLP encoded transaction that contains all the signatures.

The example below shows how to combine and send the RLP encoded transactions.

```javascript
const vt = new caver.transaction.feeDelegatedValueTransfer({
	from: sender.address,
	to: '0x45c2a1e3a1c3957a06dae73ad516461c2d2c7ccc',
	value: 1,
	gas: 70000,
})
const combined = vt.combineSignatures([sender1SignedRLP, sender2SignedRLP, feePayer1SignedRLP, feePayer2SignedRLP])
console.log(vt)
```

If you look at the result of calling combineSignatures, you can see that signatures contain the signatures of sender1 and sender2, and feePayerSignatures contain the signatures of feePayer1 and feePayer2.

When doing `combineSignatures`, an error occurs if an RLP-encoded string signed with different transaction is included.

The combineSignatures returns an RLP-encoded string containing all signatures (and feePayerSignatures) as a result. You use this to send a transaction to the network.

```javascript
const receipt = await caver.rpc.klay.sendRawTransaction(combined)
console.log(receipt)
```

## Sample Projects <a id="sample-projects"></a>

The BApp \(Blockchain Application\) Development sample projects using caver-js are the following:

* [Count BApp](../../tutorials/count-bapp/README.md)
* [Klaystagram](../../tutorials/klaystagram/README.md)

## Links <a id="links"></a>

* caver-js [GitHub repository](https://github.com/klaytn/caver-js)
* caver-js on [npm](https://www.npmjs.com/package/caver-js)



[caver.contract]: api-references/caver.contract.md

[caver.account]: api-references/caver.account.md
[Account]: api-references/caver.account.md
[AccountKey]: ../../../klaytn/design/accounts.md#account-key
[AccountKeyLegacy]: ../../../klaytn/design/accounts.md#accountkeylegacy
[AccountKeyPublic]: ../../../klaytn/design/accounts.md#accountkeypublic
[AccountKeyFail]: ../../../klaytn/design/accounts.md#accountkeyfail
[AccountKeyWeightedMultiSig]: ../../../klaytn/design/accounts.md#accountkeyweightedmultisig
[AccountKeyRoleBased]: ../../../klaytn/design/accounts.md#accountkeyrolebase
[role]: ../../../klaytn/design/accounts.md#roles
[caver.account.weightedMultiSigOptions]: api-references/caver.account.md#weightedmultisigoptions

[caver.wallet]: api-references/caver.wallet.md
[caver.wallet.newKeyring]: api-references/caver.wallet.md#newkeyring
[caver.wallet.keyring]: api-references/caver.wallet.keyring.md
[Keyring]: api-references/caver.wallet.keyring.md
[KlaytnWalletKey]: ../../../klaytn/design/accounts.md#klaytn-wallet-key-format

[caver.rpc.klay.getTransactionReceipt]: api-references/caver.rpc/klay.md#gettransactionreceipt
[getTransactionReceipt]: api-references/caver.rpc/klay.md#gettransactionreceipt
[caver.rpc.klay.sendRawTransaction]: api-references/caver.rpc/klay.md#sendrawtransaction

[txError: Detailed Information of Transaction Failures]: ../../json-rpc/transaction-error-codes.md

[Fee Delegation]: ../../../klaytn/design/transactions/README.md#fee-delegation
[Account Update]: api-references/caver.transaction.md#accountupdate
[caver.transaction.smartContractDeploy]: api-references/caver.transaction.md#smartcontractdeploy
[caver.transaction.feeDelegatedSmartContractDeploy]: api-references/caver.transaction.md#feedelegatedsmartcontractdeploy
[caver.transaction.feeDelegatedSmartContractDeployWithRatio]: api-references/caver.transaction.md#feedelegatedsmartcontractdeploywithratio
[caver.transaction.smartContractExecution]: api-references/caver.transaction.md#smartcontractexecution
[caver.transaction.feeDelegatedSmartContractExecution]: api-references/caver.transaction.md#feedelegatedsmartcontractexecution
[caver.transaction.feeDelegatedSmartContractExecutionWithRatio]: api-references/caver.transaction.md#feedelegatedsmartcontractexecutionwithratio

