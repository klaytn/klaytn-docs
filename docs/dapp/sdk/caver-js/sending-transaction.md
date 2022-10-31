## Sending KLAY for Beginners <a id="sending-klay-at-a-glance"></a>

Let's try sending a transaction as a simple warm-up. In this short example, we will be creating a keystore, connecting to Klaytn node, as well as creating a transaction - all of this using caver-js!

Don't worry if this is your first time using caver-js. Just follow the simple steps below.

### Prerequisites

First install the following packages.
* [Node.js](https://nodejs.org/en/download/) version ([14.16.0](https://nodejs.org/dist/latest-v14.x/))
* [npm](https://www.npmjs.com/get-npm)
* [nvm](https://github.com/nvm-sh/nvm)\)
* [Solidity compiler](https://solidity.readthedocs.io/en/develop/installing-solidity.html)
 
### 1. Create an account and download keystore <a id="1.-create-an-account-and-download-keystore"></a>
The most simple way to create an account is using the [Klaytn Online Toolkit](https://klaytn.github.io/klaytn-online-toolkit/misc/generateKeystore).

![](../images/keystore.png)

You will need KLAY to send a transaction. You can get test KLAY for the Baobab testnet from [Faucet](https://baobab.wallet.klaytn.foundation/faucet). Refer to [Klaytn Wallet](../../../toolkit/klaytn-wallet.md#how-to-receive-baobab-testnet-klay).

### 2. Download caver-js <a id="2.-download-caver-js"></a>

First, let's create a folder for our project. We will simply call it   `test`. Navigate to your command line and type:

```
mkdir test
```

Now let's navigate to our folder.

```
cd test
```

We are in our folder, so let's download caver-js. If you don't have npm and node.js already installed, download the prerequisites [here](). Make sure to use node.js version 12 or 14. And then type:

```
npm install caver-js
```

### 3. Initialize project <a id="3.-initialize-project"></a>

After your are done, let's initialize our project:

```
npm init
```

Since we are just doing a simple test, it doesn't matter how you answer the questions.

```

package name: (test) 
version: (1.0.0) 
description: 
entry point: (index.js) 
test command: 
git repository: 
keywords: 
author: 
license: (ISC) 
About to write to /Users/terri.k/test/package.json:

{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}


Is this OK? (yes)
```

### 4. Create test file <a id="4.-create-test-file"></a>

Let's create a test file named `testcaver.js`.

``` 
touch testcaver.js
```

We will be writing our code in this file to send a transaction for transfering KLAY.


### 5. Connect to Klaytn Node <a id="5.-connect-to-klaytn-node"></a> 

Since we are sending a transaction to the blockchain network, we need to connect to a Klaytn node. We will be using Klaytn's testnet Baobab.

We will import the caver-js module and connect it to a Klaytn node in the Baobab network as shown below:

```javascript
const Caver = require('caver-js')
const caver = new Caver('https://api.baobab.klaytn.net:8651/')
```

### 6. Add Keystore, Create Keyring, and Add to Caver Wallet <a id="6.-add-keystore-create-keyring-and-add-to-caver-wallet"></a> 

You need an account to make transactions on the blockchain. That account information is included in the keystore, which you need to provide along with the password. It will be decrypted, and then stored as `keyring`.

After that, the `keyring` will be stored in the wallet. Add the lines below:

```
async function testFunction() {
    // Read keystore json file
    const fs = require('fs')
	const keystore = fs.readFileSync('{keystore.json}', 'utf8')

	// Decrypt keystore and create
	const keyring = caver.wallet.keyring.decrypt(keystore, '{password}')
	console.log(keyring)

    // Add to caver.wallet
	caver.wallet.add(keyring)
```

### 7. Send Transaction <a id="7.-send-transaction"></a> 

We will now create a trasaction to transfer some KLAY. This type of transaction is called "value transfer transaction". Let's break down each parameter.

The `from` address is derived from the keystore we uploaded. The `to` address is the receiver of the KLAY, and you can use any address. For `value`, you can conveniently use `caver.utils.toPeb()` to convert KLAY into peb. Here, we will send 10 KLAY. For `gas`, 

```
	
	// Create value transfer transaction
	const vt = caver.transaction.valueTransfer.create({
		from: keyring.address,
		to: '{0x8084fed6b1847448c24692470fc3b2ed87f9eb47}',
		value: caver.utils.toPeb(10, 'KLAY'),
		gas: 25000,
	})

	// Sign to the transaction
	const signed = await caver.wallet.sign(keyring.address, vt)

	// Send transaction to the Klaytn blockchain platform (Klaytn)
	const receipt = await caver.rpc.klay.sendRawTransaction(signed)
	console.log(receipt)
}

testFunction()
```

8. Run the code
Let's run the code that we've just written:

```
node test.js
```

You will see the following result.