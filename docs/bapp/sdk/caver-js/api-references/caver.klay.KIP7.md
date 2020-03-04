---
description: >-
  A caver-js object used to interact with a smart contract for KIP7.
---

# caver.klay.KIP7 <a id="caver-klay-kip7"></a>

The `caver.klay.KIP7` makes it easy to interact with smart contract that implements KIP-7 on the Klaytn blockchain. 

This allows you to interact with smart contract that implements KIP-7 as if it is a JavaScript object.

The `caver.klay.KIP7` inherits [caver.klay.Contract](caver.klay.Contract.md) and implements KIP-7 token contracts. This section describes only the additional implementations of the caver.klay.KIP7 for ease to use.

The abi and bytecode used in the caver.klay.KIP7 were implemented using the example of [openzeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).

For more information about KIP-7, see [Klaytn Improvement Proposals](https://klaytn.github.io/kips/KIPs/kip-7-fungible_token).

**NOTE** `caver.klay.KIP7` is supported since caver-js [v1.4.0-rc.1](https://www.npmjs.com/package/caver-js/v/1.4.0-rc.1).

## caver.klay.KIP7.deploy <a id="caver-klay-kip7-deploy"></a>

```javascript
caver.klay.KIP7.deploy(tokenInfo, deployer)
```
Deploys the KIP-7 token contract to the Klaytn blockchain. A contract deployed using caver.klay.KIP7.deploy is a fungible token that follows the KIP-7 standard. 

After successful deployment, the promise will resolve with a new KIP7 instance.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| tokenInfo | Object | The information needed to deploy KIP-7 token contract on the Klaytn blockchain. See below table to find the description. |
| deployer | String | The address of the account to deploy the KIP-7 token contract. This account must have enough KLAY to deploy. |

The tokenInfo object must contain the following:

| Name | Type | Description |
| --- | --- | --- |
| name | String | The name of the token. |
| symbol | String | The symbol of the token. |
| decimals | Number | The number of decimals the token uses. |
| initialSupply | BigNumber &#124; String &#124; Number | The total number of tokens at the deployment. |

**NOTE** It also supports `Number` types as parameters for initialSupply. But if the input parameters are out of the range supported by JavaScript Number(Number.MAX_SAFE_INTEGER), they may not work properly or may cause an error. It is recommended to use a variable of type `BigNumber` for a parameter of type `uint256`.

**Return Value**

`PromiEvent`: A promise combined event emitter.  Will be resolved with new KIP7 instance. Additionally, the following events are available:

| Name | Type | Description |
| --- | --- | --- |
| transactionHash | String | Fired right after the transaction is sent and a transaction hash is available. |
| receipt | Object | Fired when the transaction receipt is available. If you want to know about the properties inside the receipt object, see the description of [getTransactionReceipt](./caver.klay/transaction.md#gettransactionreceipt). Receipts from KIP7 instances have an 'events' attribute parsed via abi instead of a 'logs' attribute. |
| error | Error | Fired if an error occurs during sending. |

**Example**

```javascript
// using the promise
> caver.klay.KIP7.deploy({
    name: 'Jasmine',
    symbol: 'JAS',
    decimals: 18,
    initialSupply: '100000000000000000000',
}, '0x{address in hex}').then(console.log)
KIP7 {
	...
	_address: '0x598367e443D8a2b644Fec69a2C12aF44BC283f23',
	_jsonInterface: [
		...
		{
			anonymous: false,
			inputs: [
				{ indexed: true, name: 'owner', type: 'address' },
     				{ indexed: true, name: 'approved', type: 'address' },
     				{ indexed: true, name: 'tokenId', type: 'uint256' }
			],
			name: 'Approval',
			type: 'event',
			signature:  '0x8c5be...'
		}
	] 
}

// using event emitter and promise
> caver.klay.KIP7.deploy({
    name: 'Jasmine',
    symbol: 'JAS',
    decimals: 18,
    initialSupply: '100000',
}, '0x{address in hex}')
.on('error', function(error) { ... })
.on('transactionHash', function(transactionHash) { ... })
.on('receipt', function(receipt) {
	console.log(receipt.contractAddress) // contains the new token contract address
})
.then(function(newKIP7Instance) {
	console.log(newKIP7Instance.options.address) // instance with the new token contract address
})
```


## new KIP7 <a id="new-kip7"></a>

```javascript
new caver.klay.KIP7([tokenAddress] [, jsonInterface])
```
Creates a new KIP7 instance with all its methods and events.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| tokenAddress | String | (optional) The address of the smart contract to call, which can be assigned later through `kip7Instance.options.address = '0x1234..'` |
| abi | Object | (optional) The custom ABI in the JSON format for the fungible token contract. If omitted, it uses ABI described in the specification of KIP-7. |

**NOTE** If you send a jsonInterface as a parameter that is not an implementation of KIP-7, you will get an error when using the methods of the class.

**Return Value**

| Type | Description |
| --- | --- |
| Object | The KIP7 instance with all its methods and events. |


**Example**

```javascript
// Create a KIP7 instance without parameter
> const kip7Instance = new caver.klay.KIP7()

// Create a KIP7 instance with token address
> const kip7Instance = new caver.klay.KIP7('0x{address in hex}')

// Create a KIP7 instance with jsonInterface(abi)
> const kip7Instance = new caver.klay.KIP7([
    {
        constant: true,
        inputs: [],
        name: 'name',
        outputs: [{ name: '', type: 'string' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
	...
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: 'owner', type: 'address' },
            { indexed: true, name: 'spender', type: 'address' },
            { indexed: false, name: 'value', type: 'uint256' },
        ],
        name: 'Approval',
        type: 'event',
    },
])

// Create a KIP7 instance with token address and ABI
> const kip7Instance = new caver.klay.KIP7('0x{address in hex}', [
    {
        constant: true,
        inputs: [],
        name: 'name',
        outputs: [{ name: '', type: 'string' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
	...
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: 'owner', type: 'address' },
            { indexed: true, name: 'spender', type: 'address' },
            { indexed: false, name: 'value', type: 'uint256' },
        ],
        name: 'Approval',
        type: 'event',
    },
])
```


## kip7Instance.clone <a id="kip7instance-clone"></a>

```javascript
kip7Instance.clone([tokenAddress])
```
Clones the current KIP7 instance.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| tokenAddress | String | (optional) The address of the new fungible token contract to call. If omitted, it will be set by `this.options.address`. |

**Return Value**

| Type | Description |
| --- | --- |
| Object | The new cloned KIP7 instance. |


**Example**

```javascript
> const kip7Instance = new caver.klay.KIP7(address)

// Clone without a parameter
> const cloned = kip7Instance.clone()

// Clone with the address of the new token contract
> const cloned = kip7Instance.clone('0x{address in hex}')
```


## kip7Instance.name <a id="kip7instance-name"></a>

```javascript
kip7Instance.name()
```
Returns the name of the token.

**Parameters**

None

**Return Value**

`Promise` returns `String`: The name of the token.

**Example**

```javascript
> kip7Instance.name().then(console.log)
Jasmine
```


## kip7Instance.symbol <a id="kip7instance-symbol"></a>

```javascript
kip7Instance.symbol()
```
Returns the symbol of the token.

**Parameters**

None

**Return Value**

`Promise` returns `String`: The symbol of the token.

**Example**

```javascript
> kip7Instance.symbol().then(console.log)
JAS
```


## kip7Instance.decimals <a id="kip7instance-decimals"></a>

```javascript
kip7Instance.decimals()
```
Returns the number of decimals the token uses.

**Parameters**

None

**Return Value**

`Promise` returns `Number`: The number of decimals the token uses.

**Example**

```javascript
> kip7Instance.decimals().then(console.log)
18
```


## kip7Instance.totalSupply <a id="kip7instance-totalsupply"></a>

```javascript
kip7Instance.totalSupply()
```
Returns the total token supply.

**Parameters**

None

**Return Value**

`Promise` returns `BigNumber`: The total number of tokens.

**Example**

```javascript
> kip7Instance.totalSupply().then(console.log)
100000000000000000000
```


## kip7Instance.balanceOf <a id="kip7instance-balanceof"></a>

```javascript
kip7Instance.balanceOf(address)
```
Returns the balance of the given account address.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| address | String | The address of the account to check the balance. |

**Return Value**

`Promise` returns `BigNumber`: The account balance.

**Example**

```javascript
> kip7Instance.balanceOf('0x{address in hex}').then(console.log)
100000
```


## kip7Instance.allowance <a id="kip7instance-allowance"></a>

```javascript
kip7Instance.allowance(owner, spender)
```
Returns the amount which `spender` is still allowed to withdraw from `owner`.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| owner | String | The address of the account that set the spender to use the tokens on behalf of the owner. |
| spender | String | The address of the account approved the amount that can be used on behalf of the owner. |

**Return Value**

`Promise` returns `BigNumber`: The remaining number of tokens that spender will be allowed to spend on behalf of owner.

**Example**

```javascript
> kip7Instance.allowance('0x{address in hex}', '0x{address in hex}').then(console.log)
0

> kip7Instance.allowance('0x{address in hex}', '0x{address in hex}').then(console.log)
10
```


## kip7Instance.isMinter <a id="kip7instance-isminter"></a>

```javascript
kip7Instance.isMinter(address)
```
Returns `true` if the given account is a minter which has permission to mint.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| address | String | The address of the account to check minting permission. |

**Return Value**

`Promise` returns `Boolean`: `true` if the account is a minter.

**Example**

```javascript
> kip7Instance.isMinter('0x{address in hex}').then(console.log)
true

> kip7Instance.isMinter('0x{address in hex}').then(console.log)
false
```


## kip7Instance.isPauser <a id="kip7instance-ispauser"></a>

```javascript
kip7Instance.isPauser(address)
```
Returns `true` if the given account is a pauser which has permission to suspend transferring tokens.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| address | String | The address of the account to check permission to suspend transferring tokens. |

**Return Value**

`Promise` returns `Boolean`: `true` if the account is a pauser.

**Example**

```javascript
> kip7Instance.isPauser('0x{address in hex}').then(console.log)
true

> kip7Instance.isPauser('0x{address in hex}').then(console.log)
false
```


## kip7Instance.paused <a id="kip7instance-paused"></a>

```javascript
kip7Instance.paused()
```
Returns `true` if the contract is in the paused state, and `false` otherwise.

**Parameters**

None

**Return Value**

`Promise` returns `Boolean`: `true` if the contract is paused.

**Example**

```javascript
> kip7Instance.paused().then(console.log)
true

> kip7Instance.paused().then(console.log)
false
```


## kip7Instance.approve <a id="kip7instance-approve"></a>

```javascript
kip7Instance.approve(spender, amount [, sendParam])
```
Sets `amount` as the allowance of `spender` over the caller’s tokens. 

Note that the approve method will submit a transaction to the Klaytn network, which will charge the transaction fee to the sender.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| spender | String | The address of the account to spend tokens on behalf of the owner. |
| amount | BigNumber &#124; String &#124; Number | The amount of tokens the spender allows to use. |
| sendParam | Object | (optional) An object with defined parameters for sending a transaction. |

**NOTE** It also supports `Number` types as parameters for amount. But if the input parameters are out of the range supported by JavaScript Number(Number.MAX_SAFE_INTEGER), they may not work properly or may cause an error. It is recommended to use a variable of type `BigNumber` for a parameter of type `uint256`.

The sendParam object can contain the following:

| Name | Type | Description |
| --- | --- | --- |
| from | String | (optional) The address from which the transaction should be sent. If omitted, it will be set by `this.options.from`. If from is not defined in the sendParam object and this.options.from is not defined, an error occurs. |
| gas | Number &#124; String | (optional) The maximum gas provided for this transaction (gas limit). If omitted, it will be set by caver-js via calling `this.methods.approve(spender, amount).estimateGas({from})`. |
| gasPrice | Number &#124; String | (optional) The gas price in peb to use for this transaction. If omitted, it will be set by caver-js via calling `caver.klay.getGasPrice`. |
| value | Number &#124; String &#124; BN &#124; BigNumber | (optional) The value transferred for the transaction in peb. |

**Return Value**

`Promise` returns `Object` - The receipt containing the result of executing a transaction to execute a KIP-7 token contract. If you want to know about the properties inside the receipt object, see the description of the return field of [getTransactionReceipt](./caver.klay/transaction.md#gettransactionreceipt). Receipts from KIP7 instances have an 'events' attribute parsed via abi instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with a from field defined 
> kip7Instance.approve('0x{address in hex}', 10, { from: '0x{address in hex}' }).then(console.log)
{
	blockHash: '0xf010a98f66b6b36943175cd5b249da54e84abed551cfa02846a2900ddab968c7',
	blockNumber: 2098,
	contractAddress: null,
	from: '0x2f7dc98bd93a0544b03d6ff428a6f4ae04b32676',
	...
	status: true,
	to: '0x8ca777e464a83b939ae131ca037f0d8728c6929e',
	...
	events: {
		Approval: {
			address: '0x8CA777e464a83b939AE131CA037F0d8728C6929e',
			blockNumber: 2098,
			transactionHash: '0xf7469c0420cb5ebb0fbf64a314bd0c9ee7517ea64dd72eefa59bc8005bbc0f99',
			transactionIndex: 0,
			blockHash: '0xf010a98f66b6b36943175cd5b249da54e84abed551cfa02846a2900ddab968c7',
			logIndex: 0,
			id: 'log_c6ec61aa',
			returnValues: {
				'0': '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
				'1': '0xe36ffD7bc4D588c480B5925B9622881F9d85ea30',
				'2': '10',
				owner: '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
				spender: '0xe36ffD7bc4D588c480B5925B9622881F9d85ea30',
				value: '10'
			},
			event: 'Approval',
			signature: '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
			raw: {
				data: '0x000000000000000000000000000000000000000000000000000000000000000a',
				topics: [ '0x8c5be...', '0x00...676', '0x00...a30' ]
			},
		},
	},
}

// Set from in kip7Instance.options.from
// If the value of kip7Instance.options.from is set, this value is used as the default value 
// unless you specify from address in sendParam object when sending transaction with kip7Instance instance.
> kip7Instance.options.from = '0x{address in hex}'
> kip7Instance.approve('0x{address in hex}', 10).then(console.log)
```


## kip7Instance.transfer <a id="kip7instance-transfer"></a>

```javascript
kip7Instance.transfer(recipient, amount [, sendParam])
```
Moves amount tokens from the caller’s account to recipient.

Note that the transfer method will submit a transaction to the Klaytn network, which will charge the transaction fee to the sender.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| recipient | String | The address of the account to receive the token. |
| amount | BigNumber &#124; String &#124; Number | The amount of tokens you want to transfer. |
| sendParam | Object | (optional) An object with defined parameters for sending a transaction. |

**NOTE** It also supports `Number` types as parameters for amount. But if the input parameters are out of the range supported by JavaScript Number(Number.MAX_SAFE_INTEGER), they may not work properly or may cause an error. It is recommended to use a variable of type `BigNumber` for a parameter of type `uint256`.

The sendParam object can contain the following:

| Name | Type | Description |
| --- | --- | --- |
| from | String | (optional) The address from which the transaction should be sent. If omitted, it will be set by `this.options.from`. If from is not defined in the sendParam object and this.options.from is not defined, an error occurs. |
| gas | Number &#124; String | (optional) The maximum gas provided for this transaction (gas limit). If omitted, it will be set by caver-js via calling `this.methods.transfer(recipient, amount).estimateGas({from})`. |
| gasPrice | Number &#124; String | (optional) The gas price in peb to use for this transaction. If omitted, it will be set by caver-js via calling `caver.klay.getGasPrice`. |
| value | Number &#124; String &#124; BN &#124; BigNumber | (optional) The value transferred for the transaction in peb. |

**Return Value**

`Promise` returns `Object` - The receipt containing the result of executing a transaction to execute a KIP-7 token contract. If you want to know about the properties inside the receipt object, see the description of the return field of [getTransactionReceipt](./caver.klay/transaction.md#gettransactionreceipt). Receipts from KIP7 instances have an 'events' attribute parsed via abi instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with a from field defined 
> kip7Instance.transfer('0x{address in hex}', 10, { from: '0x{address in hex}' }).then(console.log)
{
	blockHash: '0x8a078c3a73d678cdd85d471eb21e9ed7d695f8b96fc7315cfa59c1f68be3d2bf',
	blockNumber: 1353,
	contractAddress: null,
	from: '0x2f7dc98bd93a0544b03d6ff428a6f4ae04b32676',
	...
	status: true,
	to: '0x05871c21664e18b2906545f8831695650a8f4056',
	...
	events: {
		Transfer: {
			address: '0x05871c21664E18b2906545f8831695650a8f4056',
			blockNumber: 1353,
			transactionHash: '0x8bd2b21a06241e4cfc0af1ec40e7b15444f730c7529440648aa4ed6b697f08f4',
			transactionIndex: 0,
			blockHash: '0x8a078c3a73d678cdd85d471eb21e9ed7d695f8b96fc7315cfa59c1f68be3d2bf',
			logIndex: 0,
			id: 'log_82ef7705',
			returnValues: {
				'0': '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
				'1': '0xE411cb0B61FDcC06497794fE3f49F65D5dE41f59',
				'2': '10',
				from: '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
				to: '0xE411cb0B61FDcC06497794fE3f49F65D5dE41f59',
				value: '10'
			},
			event: 'Transfer',
			signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
			raw: {
				data: '0x000000000000000000000000000000000000000000000000000000000000000a',
				topics: [ '0xddf25...', '0x00...676', '0x00...f59' ]
			},
		},
	},
}

// Set from in kip7Instance.options.from
// If the value of kip7Instance.options.from is set, this value is used as the default value 
// unless you specify from address in sendParam object when sending transaction with kip7Instance instance.
> kip7Instance.options.from = '0x{address in hex}'
> kip7Instance.transfer('0x{address in hex}', 10).then(console.log)
```


## kip7Instance.transferFrom <a id="kip7instance-transferfrom"></a>

```javascript
kip7Instance.transferFrom(sender, recipient, amount [, sendParam])
```
Moves amount tokens from sender to recipient using the allowance mechanism. amount is then deducted from the caller’s allowance.

Note that transferFrom method will submit a transaction to the Klaytn network, which will charge the transaction fee to the sender.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| sender | String | The address of the account that owns the token to be sent with allowance mechanism. |
| recipient | String | The address of the account to receive the token. |
| amount | BigNumber &#124; String &#124; Number | The amount of tokens you want to transfer. |
| sendParam | Object | (optional) An object with defined parameters for sending a transaction. |

**NOTE** It also supports `Number` types as parameters for amount. But if the input parameters are out of the range supported by JavaScript Number(Number.MAX_SAFE_INTEGER), they may not work properly or may cause an error. It is recommended to use a variable of type `BigNumber` for a parameter of type `uint256`.

The sendParam object can contain the following:

| Name | Type | Description |
| --- | --- | --- |
| from | String | (optional) The address from which the transaction should be sent. If omitted, it will be set by `this.options.from`. If from is not defined in the sendParam object and this.options.from is not defined, an error occurs. |
| gas | Number &#124; String | (optional) The maximum gas provided for this transaction (gas limit). If omitted, it will be set by caver-js via calling `this.methods.transferFrom(sender, recipient, amount).estimateGas({from})`. |
| gasPrice | Number &#124; String | (optional) The gas price in peb to use for this transaction. If omitted, it will be set by caver-js via calling `caver.klay.getGasPrice`. |
| value | Number &#124; String &#124; BN &#124; BigNumber | (optional) The value transferred for the transaction in peb. |

**Return Value**

`Promise` returns `Object` - The receipt containing the result of executing a transaction to execute a KIP-7 token contract. If you want to know about the properties inside the receipt object, see the description of the return field of [getTransactionReceipt](./caver.klay/transaction.md#gettransactionreceipt). Receipts from KIP7 instances have an 'events' attribute parsed via abi instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with a from field defined 
> kip7Instance.transferFrom('0x{address in hex}', '0x{address in hex}', 10000, { from: '0x{address in hex}' }).then(console.log)
{
	blockHash: '0x3adec238e06a9e8d5fa09fc1e1d7c8748b64d07e89678d27e8a379a12a34974f',
	blockNumber: 2331,
	contractAddress: null,
	from: '0x01958c62ab4aec7fc282bec9491da0ef7f830ac2',
	...
	status: true,
	to: '0x3d5eb40665d25aaa4160023c4278fa6a94ba4acb',
	...
	events: {
		Transfer: {
			address: '0x3D5EB40665D25aAa4160023C4278FA6A94BA4aCb',
			blockNumber: 2331,
			transactionHash: '0x5b2232b68681f19d9b6fcd6fb03964ef105912fecb772c11c8ec9fc906be4cbf',
			transactionIndex: 0,
			blockHash: '0x3adec238e06a9e8d5fa09fc1e1d7c8748b64d07e89678d27e8a379a12a34974f',
			logIndex: 0,
			id: 'log_ae57b7a0',
			returnValues: {
				'0': '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
				'1': '0x49ff9cb8BB8CA10D7f6E1094b2Ba56c3C2DBA231',
				'2': '10000',
				from: '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
				to: '0x49ff9cb8BB8CA10D7f6E1094b2Ba56c3C2DBA231',
				value: '10000'
			},
			event: 'Transfer',
			signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
			raw: {
				data: '0x0000000000000000000000000000000000000000000000000000000000002710',
				topics: [ '0xddf25...', '0x00...676', '0x00...231' ]
			},
		},
		Approval: {
			address: '0x3D5EB40665D25aAa4160023C4278FA6A94BA4aCb',
			blockNumber: 2331,
			transactionHash: '0x5b2232b68681f19d9b6fcd6fb03964ef105912fecb772c11c8ec9fc906be4cbf',
			transactionIndex: 0,
			blockHash: '0x3adec238e06a9e8d5fa09fc1e1d7c8748b64d07e89678d27e8a379a12a34974f',
			logIndex: 1,
			id: 'log_cee37d26',
			returnValues: {
				'0': '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
				'1': '0x01958c62aB4aEC7fC282bEc9491dA0EF7F830AC2',
				'2': '0',
				owner: '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
				spender: '0x01958c62aB4aEC7fC282bEc9491dA0EF7F830AC2',
				value: '0'
			},
			event: 'Approval',
			signature: '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
			raw: {
				data: '0x0000000000000000000000000000000000000000000000000000000000000000',
				topics: [ '0x8c5be...', '0x00...676', '0x00...ac2' ]
			},
		},
	},
}

// Set from in kip7Instance.options.from
// If the value of kip7Instance.options.from is set, this value is used as the default value 
// unless you specify from address in sendParam object when sending transaction with kip7Instance instance.
> kip7Instance.options.from = '0x{address in hex}'
> kip7Instance.transferFrom('0x{address in hex}', '0x{address in hex}', 10000).then(console.log)
```


## kip7Instance.mint <a id="kip7instance-mint"></a>

```javascript
kip7Instance.mint(account, amount [, sendParam])
```
Creates amount tokens and assigns them to account, increasing the total supply.

Note that mint method will submit a transaction to the Klaytn network, which will charge the transaction fee to the sender.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| account | String | The address of the account to which the minted token will be allocated. |
| amount | BigNumber &#124; String &#124; Number | The amount of tokens to mint. |
| sendParam | Object | (optional) An object with defined parameters for sending a transaction. |

**NOTE** It also supports `Number` types as parameters for amount. But if the input parameters are out of the range supported by JavaScript Number(Number.MAX_SAFE_INTEGER), they may not work properly or may cause an error. It is recommended to use a variable of type `BigNumber` for a parameter of type `uint256`.

The sendParam object can contain the following:

| Name | Type | Description |
| --- | --- | --- |
| from | String | (optional) The address from which the transaction should be sent. If omitted, it will be set by `this.options.from`. If from is not defined in the sendParam object and this.options.from is not defined, an error occurs. |
| gas | Number &#124; String | (optional) The maximum gas provided for this transaction (gas limit). If omitted, it will be set by caver-js via calling `this.methods.mint(account, amount).estimateGas({from})`. |
| gasPrice | Number &#124; String | (optional) The gas price in peb to use for this transaction. If omitted, it will be set by caver-js via calling `caver.klay.getGasPrice`. |
| value | Number &#124; String &#124; BN &#124; BigNumber | (optional) The value transferred for the transaction in peb. |

**NOTE** The from account sending the transaction must be minter with permission of MinterRole.

**Return Value**

`Promise` returns `Object` - The receipt containing the result of executing a transaction to execute a KIP-7 token contract. If you want to know about the properties inside the receipt object, see the description of the return field of [getTransactionReceipt](./caver.klay/transaction.md#gettransactionreceipt). Receipts from KIP7 instances have an 'events' attribute parsed via abi instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with a from field defined 
> kip7Instance.mint('0x{address in hex}', 10000, { from: '0x{address in hex}' }).then(console.log)
{
	blockHash: '0x71e1c7c9de471ed9eb9ec2aca09beb63a654e21514b2b8d25ec93f34b810a709',
	blockNumber: 8466,
	contractAddress: null,
	from: '0x2f7dc98bd93a0544b03d6ff428a6f4ae04b32676',
	...
	status: true,
	to: '0x54e9ad10ffcbcc2384863157c851a75a31c1e925',
	...
	events: {
		Transfer: {
			address: '0x54e9Ad10FFcBCc2384863157c851A75a31C1E925',
			blockNumber: 8466,
			transactionHash: '0xef1db1544d0ba70aa06b77599a8421cee2270703cff7d0233bd09ab3561ab49a',
			transactionIndex: 0,
			blockHash: '0x71e1c7c9de471ed9eb9ec2aca09beb63a654e21514b2b8d25ec93f34b810a709',
			logIndex: 0,
			id: 'log_151f8e90',
			returnValues: {
				'0': '0x0000000000000000000000000000000000000000',
				'1': '0x4756D3c2A3DC61450D949BD9bF702b4209Fc15a0',
				'2': '10000',
				from: '0x0000000000000000000000000000000000000000',
				to: '0x4756D3c2A3DC61450D949BD9bF702b4209Fc15a0',
				value: '10000',
			},
			event: 'Transfer',
			signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
			raw: {
				data: '0x0000000000000000000000000000000000000000000000000000000000002710',
				topics: [ '0xddf25...', '0x00...000', '0x00...5a0' ],
			},
		},
	},
}

// Set from in kip7Instance.options.from
// If the value of kip7Instance.options.from is set, this value is used as the default value 
// unless you specify from address in sendParam object when sending transaction with kip7Instance instance.
> kip7Instance.options.from = '0x{address in hex}'
> kip7Instance.mint('0x{address in hex}', 10000).then(console.log)
```


## kip7Instance.addMinter <a id="kip7instance-addminter"></a>

```javascript
kip7Instance.addMinter(account [, sendParam])
```
Adds an account as a minter that has the permission of MinterRole and can mint.

Note that addMinter method will submit a transaction to the Klaytn network, which will charge the transaction fee to the sender.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| account | String | The address of account to add as minter. |
| sendParam | Object | (optional) An object with defined parameters for sending a transaction. |

The sendParam object can contain the following:

| Name | Type | Description |
| --- | --- | --- |
| from | String | (optional) The address from which the transaction should be sent. If omitted, it will be set by `this.options.from`. If from is not defined in the sendParam object and this.options.from is not defined, an error occurs. |
| gas | Number &#124; String | (optional) The maximum gas provided for this transaction (gas limit). If omitted, it will be set by caver-js via calling `this.methods.addMinter(account).estimateGas({from})`. |
| gasPrice | Number &#124; String | (optional) The gas price in peb to use for this transaction. If omitted, it will be set by caver-js via calling `caver.klay.getGasPrice`. |
| value | Number &#124; String &#124; BN &#124; BigNumber | (optional) The value transferred for the transaction in peb. |

**NOTE** The from account sending the transaction must be minter with permission of MinterRole.

**Return Value**

`Promise` returns `Object` - The receipt containing the result of executing a transaction to execute a KIP-7 token contract. If you want to know about the properties inside the receipt object, see the description of the return field of [getTransactionReceipt](./caver.klay/transaction.md#gettransactionreceipt). Receipts from KIP7 instances have an 'events' attribute parsed via abi instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with a from field defined 
> kip7Instance.addMinter('0x{address in hex}', { from: '0x{address in hex}' }).then(console.log)
{
	blockHash: '0x169db7e80c954f7d95bbb6a5ef3065190e842d515485e1679f8f3027d1b2975f',
	blockNumber: 9593,
	contractAddress: null,
	from: '0x2f7dc98bd93a0544b03d6ff428a6f4ae04b32676',
	...
	status: true,
	to: '0x9e2851aff794e69c58e112a3beacbf0de6587f6b',
	...
	events: {
		MinterAdded: {
			address: '0x9E2851Aff794E69C58E112a3beacbF0De6587f6b',
			blockNumber: 9593,
			transactionHash: '0x11c86fe739ce3f8e6f93f5de87c9626c7cd032dd5e119171f9ec821292cd68e9',
			transactionIndex: 0,
			blockHash: '0x169db7e80c954f7d95bbb6a5ef3065190e842d515485e1679f8f3027d1b2975f',
			logIndex: 0,
			id: 'log_d93efbcd',
			returnValues: {
				'0': '0x823EA6Eb41985218D478C07E77cFBdAd233569C5',
				account: '0x823EA6Eb41985218D478C07E77cFBdAd233569C5',
			},
			event: 'MinterAdded',
			signature: '0x6ae172837ea30b801fbfcdd4108aa1d5bf8ff775444fd70256b44e6bf3dfc3f6',
			raw: {
				data: '0x',
				topics: [ '0x6ae17...', '0x00...9c5' ],
			},
		},
	},
}

// Set from in kip7Instance.options.from
// If the value of kip7Instance.options.from is set, this value is used as the default value 
// unless you specify from address in sendParam object when sending transaction with kip7Instance instance.
> kip7Instance.options.from = '0x{address in hex}'
> kip7Instance.addMinter('0x{address in hex}').then(console.log)
```


## kip7Instance.renounceMinter <a id="kip7instance-renounceminter"></a>

```javascript
kip7Instance.renounceMinter([sendParam])
```
Renounces privilege of MinterRole. Only address that is Minter can renounce itself from Minter role, no one else. 

Note that renounceMinter method will submit a transaction to the Klaytn network, which will charge the transaction fee to the sender.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| sendParam | Object | (optional) An object with defined parameters for sending a transaction. |

The sendParam object can contain the following:

| Name | Type | Description |
| --- | --- | --- |
| from | String | (optional) The address from which the transaction should be sent. If omitted, it will be set by `this.options.from`. If from is not defined in the sendParam object and this.options.from is not defined, an error occurs. |
| gas | Number &#124; String | (optional) The maximum gas provided for this transaction (gas limit). If omitted, it will be set by caver-js via calling `this.methods.renounceMinter().estimateGas({from})`. |
| gasPrice | Number &#124; String | (optional) The gas price in peb to use for this transaction. If omitted, it will be set by caver-js via calling `caver.klay.getGasPrice`. |
| value | Number &#124; String &#124; BN &#124; BigNumber | (optional) The value transferred for the transaction in peb. |

**NOTE** The from account sending the transaction must be minter with permission of MinterRole.

**Return Value**

`Promise` returns `Object` - The receipt containing the result of executing a transaction to execute a KIP-7 token contract. If you want to know about the properties inside the receipt object, see the description of the return field of [getTransactionReceipt](./caver.klay/transaction.md#gettransactionreceipt). Receipts from KIP7 instances have an 'events' attribute parsed via abi instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with a from field defined 
> kip7Instance.renounceMinter({ from: '0x{address in hex}' }).then(console.log)
{
	blockHash: '0xc1d96a519d9a31a1dab77111af0de73241aa212722859062a96dc3115a2eca23',
	blockNumber: 9996,
	contractAddress: null,
	from: '0x34b91db0f4c7d1381fdf054cc3d0c433b19fca16',
	...
	status: true,
	to: '0xeba808dcd0fdbfc21a99961be42665f351487f52',
	...
	events: {
		MinterRemoved: {
			address: '0xebA808dCD0Fdbfc21a99961BE42665f351487F52',
			blockNumber: 9996,
			transactionHash: '0x52328e3cfb8061915d000dc308ffd67650fa36cf4560f1fb12fdb28a7c903ac9',
			transactionIndex: 0,
			blockHash: '0xc1d96a519d9a31a1dab77111af0de73241aa212722859062a96dc3115a2eca23',
			logIndex: 0,
			id: 'log_bd3a8e46',
			returnValues: {
				'0': '0x34b91Db0F4c7D1381FdF054cc3D0c433B19fCa16',
				account: '0x34b91Db0F4c7D1381FdF054cc3D0c433B19fCa16',
			},
			event: 'MinterRemoved',
			signature: '0xe94479a9f7e1952cc78f2d6baab678adc1b772d936c6583def489e524cb66692',
			raw: {
				data: '0x',
				topics: [ '0xe9447...', '0x00...a16' ],
			},
		},
	},
}

// Set from in kip7Instance.options.from
// If the value of kip7Instance.options.from is set, this value is used as the default value 
// unless you specify from address in sendParam object when sending transaction with kip7Instance instance.
> kip7Instance.options.from = '0x{address in hex}'
> kip7Instance.renounceMinter().then(console.log)
```


## kip7Instance.burn <a id="kip7instance-burn"></a>

```javascript
kip7Instance.burn(amount [, sendParam])
```
Destroys amount tokens from the caller.

Note that burn method will submit a transaction to the Klaytn network, which will charge the transaction fee to the sender.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| amount | BigNumber &#124; String &#124; Number | The amount of tokens to destroy. |
| sendParam | Object | (optional) An object with defined parameters for sending a transaction. |

**NOTE** It also supports `Number` types as parameters for amount. But if the input parameters are out of the range supported by JavaScript Number(Number.MAX_SAFE_INTEGER), they may not work properly or may cause an error. It is recommended to use a variable of type `BigNumber` for a parameter of type `uint256`.

The sendParam object can contain the following:

| Name | Type | Description |
| --- | --- | --- |
| from | String | (optional) The address from which the transaction should be sent. If omitted, it will be set by `this.options.from`. If from is not defined in the sendParam object and this.options.from is not defined, an error occurs. |
| gas | Number &#124; String | (optional) The maximum gas provided for this transaction (gas limit). If omitted, it will be set by caver-js via calling `this.methods.burn(amount).estimateGas({from})`. |
| gasPrice | Number &#124; String | (optional) The gas price in peb to use for this transaction. If omitted, it will be set by caver-js via calling `caver.klay.getGasPrice`. |
| value | Number &#124; String &#124; BN &#124; BigNumber | (optional) The value transferred for the transaction in peb. |

**Return Value**

`Promise` returns `Object` - The receipt containing the result of executing a transaction to execute a KIP-7 token contract. If you want to know about the properties inside the receipt object, see the description of the return field of [getTransactionReceipt](./caver.klay/transaction.md#gettransactionreceipt). Receipts from KIP7 instances have an 'events' attribute parsed via abi instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with a from field defined 
> kip7Instance.burn(1000, { from: '0x{address in hex}' }).then(console.log)
{
	blockHash: '0x7cf9e982510d17a2fd5fca3e7a6f9ce5a25a9da6ba81d51b33129fb7fb93e0ae',
	blockNumber: 10495,
	contractAddress: null,
	from: '0x2f7dc98bd93a0544b03d6ff428a6f4ae04b32676',
	...
	status: true,
	to: '0x0f681dbc120d9d3be997565626cd87f049f5c405',
	...
	events: {
		Transfer: {
			address: '0x0f681Dbc120D9d3BE997565626CD87F049f5C405',
			blockNumber: 10495,
			transactionHash: '0x4f2de0b4310c40eeef20ae8e8d129d209195975792de86e1cd00f2345789c9f7',
			transactionIndex: 0,
			blockHash: '0x7cf9e982510d17a2fd5fca3e7a6f9ce5a25a9da6ba81d51b33129fb7fb93e0ae',
			logIndex: 0,
			id: 'log_20f6c253',
			returnValues: {
				'0': '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
				'1': '0x0000000000000000000000000000000000000000',
				'2': '1000',
				from: '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
				to: '0x0000000000000000000000000000000000000000',
				value: '1000',
			},
			event: 'Transfer',
			signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
			raw: {
				data: '0x00000000000000000000000000000000000000000000000000000000000003e8',
				topics: [ '0xddf25...', '0x00...676', '0x00...000' ],
			},
		},
	},
}

// Set from in kip7Instance.options.from
// If the value of kip7Instance.options.from is set, this value is used as the default value 
// unless you specify from address in sendParam object when sending transaction with kip7Instance instance.
> kip7Instance.options.from = '0x{address in hex}'
> kip7Instance.burn(1000).then(console.log)
```


## kip7Instance.burnFrom <a id="kip7instance-burnfrom"></a>

```javascript
kip7Instance.burnFrom(account, amount [, sendParam])
```
Destroys amount tokens from account is then deducted from the caller’s allowance.

Note that burnFrom method will submit a transaction to the Klaytn network, which will charge the transaction fee to the sender.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| account | String | The address of the account that owns the token to be burned with allowance mechanism. |
| amount | BigNumber &#124; String &#124; Number | The amount of tokens to destroy. |
| sendParam | Object | (optional) An object with defined parameters for sending a transaction. |

**NOTE** It also supports `Number` types as parameters for amount. But if the input parameters are out of the range supported by JavaScript Number(Number.MAX_SAFE_INTEGER), they may not work properly or may cause an error. It is recommended to use a variable of type `BigNumber` for a parameter of type `uint256`.

The sendParam object can contain the following:

| Name | Type | Description |
| --- | --- | --- |
| from | String | (optional) The address from which the transaction should be sent. If omitted, it will be set by `this.options.from`. If from is not defined in the sendParam object and this.options.from is not defined, an error occurs. |
| gas | Number &#124; String | (optional) The maximum gas provided for this transaction (gas limit). If omitted, it will be set by caver-js via calling `this.methods.burnFrom(account, amount).estimateGas({from})`. |
| gasPrice | Number &#124; String | (optional) The gas price in peb to use for this transaction. If omitted, it will be set by caver-js via calling `caver.klay.getGasPrice`. |
| value | Number &#124; String &#124; BN &#124; BigNumber | (optional) The value transferred for the transaction in peb. |

**Return Value**

`Promise` returns `Object` - The receipt containing the result of executing a transaction to execute a KIP-7 token contract. If you want to know about the properties inside the receipt object, see the description of the return field of [getTransactionReceipt](./caver.klay/transaction.md#gettransactionreceipt). Receipts from KIP7 instances have an 'events' attribute parsed via abi instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with a from field defined 
> kip7Instance.burnFrom('0x{address in hex}', 1000, { from: '0x{address in hex}' }).then(console.log)
{
	blockHash: '0xcd9f3d00856a056e54697cde2621d8af779c11378c422700510d6ebf65bea0a8',
	blockNumber: 11371,
	contractAddress: null,
	from: '0x1b7bdfcfb0008d0c958da13f2dc30388271e9ef0',
	...
	status: true,
	to: '0x50fafa2b059d26c47d26c35ccb3cd3b856ecc852',
	...
	events: {
		Transfer: {
			address: '0x50fAFa2B059d26C47D26c35Ccb3Cd3b856Ecc852',
			blockNumber: 11371,
			transactionHash: '0xed37eafc35272bd7c45695b4b94c578c681a1800b1612ca82d0e4e595e947f27',
			transactionIndex: 0,
			blockHash: '0xcd9f3d00856a056e54697cde2621d8af779c11378c422700510d6ebf65bea0a8',
			logIndex: 0,
			id: 'log_a7263788',
			returnValues: {
				'0': '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
				'1': '0x0000000000000000000000000000000000000000',
				'2': '10000',
				from: '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
				to: '0x0000000000000000000000000000000000000000',
				value: '10000',
			},
			event: 'Transfer',
			signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
			raw: {
				data: '0x0000000000000000000000000000000000000000000000000000000000002710',
				topics: [ '0xddf25...', '0x00...676', '0x00...000' ],
			},
		},
		Approval: {
			address: '0x50fAFa2B059d26C47D26c35Ccb3Cd3b856Ecc852',
			blockNumber: 11371,
			transactionHash: '0xed37eafc35272bd7c45695b4b94c578c681a1800b1612ca82d0e4e595e947f27',
			transactionIndex: 0,
			blockHash: '0xcd9f3d00856a056e54697cde2621d8af779c11378c422700510d6ebf65bea0a8',
			logIndex: 1,
			id: 'log_4ca1aac4',
			returnValues: {
				'0': '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
				'1': '0x1B7BdfCFb0008D0C958dA13F2dc30388271E9eF0',
				'2': '0',
				owner: '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
				spender: '0x1B7BdfCFb0008D0C958dA13F2dc30388271E9eF0',
				value: '0',
			},
			event: 'Approval',
			signature: '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
			raw: {
				data: '0x0000000000000000000000000000000000000000000000000000000000000000',
				topics: [ '0x8c5be...', '0x00...676', '0x00...ef0' ],
			},
		},
	},
}

// Set from in kip7Instance.options.from
// If the value of kip7Instance.options.from is set, this value is used as the default value 
// unless you specify from address in sendParam object when sending transaction with kip7Instance instance.
> kip7Instance.options.from = '0x{address in hex}'
> kip7Instance.burnFrom('0x{address in hex}', 1000).then(console.log)
```


## kip7Instance.addPauser <a id="kip7instance-addpauser"></a>

```javascript
kip7Instance.addPauser(account [, sendParam])
```
Adds an account as a pauser that has the permission of PauserRole and can pause.

Note that addPauser method will submit a transaction to the Klaytn network, which will charge the transaction fee to the sender.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| account | String | The address of account to add as pauser. |
| sendParam | Object | (optional) An object with defined parameters for sending a transaction. |

The sendParam object can contain the following:

| Name | Type | Description |
| --- | --- | --- |
| from | String | (optional) The address from which the transaction should be sent. If omitted, it will be set by `this.options.from`. If from is not defined in the sendParam object and this.options.from is not defined, an error occurs. |
| gas | Number &#124; String | (optional) The maximum gas provided for this transaction (gas limit). If omitted, it will be set by caver-js via calling `this.methods.addPauser(account).estimateGas({from})`. |
| gasPrice | Number &#124; String | (optional) The gas price in peb to use for this transaction. If omitted, it will be set by caver-js via calling `caver.klay.getGasPrice`. |
| value | Number &#124; String &#124; BN &#124; BigNumber | (optional) The value transferred for the transaction in peb. |

**NOTE** The from account sending the transaction must be pauser with permission of PauserRole.

**Return Value**

`Promise` returns `Object` - The receipt containing the result of executing a transaction to execute a KIP-7 token contract. If you want to know about the properties inside the receipt object, see the description of the return field of [getTransactionReceipt](./caver.klay/transaction.md#gettransactionreceipt). Receipts from KIP7 instances have an 'events' attribute parsed via abi instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with a from field defined 
> kip7Instance.addPauser('0x{address in hex}', { from: '0x{address in hex}' }).then(console.log)
{
	blockHash: '0x14bcefa90f95f5db03ed9c43a77ae910b57960f4f44c786e3a650a8ad163f67a',
	blockNumber: 16524,
	contractAddress: null,
	from: '0x2f7dc98bd93a0544b03d6ff428a6f4ae04b32676',
	...
	status: true,
	to: '0x31fee792a85ff4d714f47a151975b4979cb47308',
	...
	events: {
		PauserAdded: {
			address: '0x31fee792A85ff4D714F47A151975b4979CB47308',
			blockNumber: 16524,
			transactionHash: '0x9bd0cba9f5fdc3fdae4b9f40f46f11bf42314ca2518724e78be266d46a8a9f96',
			transactionIndex: 0,
			blockHash: '0x14bcefa90f95f5db03ed9c43a77ae910b57960f4f44c786e3a650a8ad163f67a',
			logIndex: 0,
			id: 'log_d847b043',
			returnValues: {
				'0': '0x6610B93bAE66F89716C3b010ad39DF476Da9234b',
				account: '0x6610B93bAE66F89716C3b010ad39DF476Da9234b',
			},
			event: 'PauserAdded',
			signature: '0x6719d08c1888103bea251a4ed56406bd0c3e69723c8a1686e017e7bbe159b6f8',
			raw: {
				data: '0x',
				topics: [ '0x6719d...', '0x00...34b' ],
			},
		},
	},
}

// Set from in kip7Instance.options.from
// If the value of kip7Instance.options.from is set, this value is used as the default value 
// unless you specify from address in sendParam object when sending transaction with kip7Instance instance.
> kip7Instance.options.from = '0x{address in hex}'
> kip7Instance.addPauser('0x{address in hex}').then(console.log)
```


## kip7Instance.renouncePauser <a id="kip7instance-renouncepauser"></a>

```javascript
kip7Instance.renouncePauser([sendParam])
```
Renounces privilege of PauserRole. Only address that is Pauser can renounce itself from Pauser role, no one else. 

Note that renouncePauser method will submit a transaction to the Klaytn network, which will charge the transaction fee to the sender.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| sendParam | Object | (optional) An object with defined parameters for sending a transaction. |

The sendParam object can contain the following:

| Name | Type | Description |
| --- | --- | --- |
| from | String | (optional) The address from which the transaction should be sent. If omitted, it will be set by `this.options.from`. If from is not defined in the sendParam object and this.options.from is not defined, an error occurs. |
| gas | Number &#124; String | (optional) The maximum gas provided for this transaction (gas limit). If omitted, it will be set by caver-js via calling `this.methods.renouncePauser().estimateGas({from})`. |
| gasPrice | Number &#124; String | (optional) The gas price in peb to use for this transaction. If omitted, it will be set by caver-js via calling `caver.klay.getGasPrice`. |
| value | Number &#124; String &#124; BN &#124; BigNumber | (optional) The value transferred for the transaction in peb. |

**NOTE** The from account sending the transaction must be pauser with permission of PauserRole.

**Return Value**

`Promise` returns `Object` - The receipt containing the result of executing a transaction to execute a KIP-7 token contract. If you want to know about the properties inside the receipt object, see the description of the return field of [getTransactionReceipt](./caver.klay/transaction.md#gettransactionreceipt). Receipts from KIP7 instances have an 'events' attribute parsed via abi instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with a from field defined 
> kip7Instance.renouncePauser({ from: '0x{address in hex}' }).then(console.log)
{
	blockHash: '0xc0b1b4914ddc8d74e8034fe86ede1b5b88a2c16ee4d678e58fac325c589713f6',
	blockNumber: 16567,
	contractAddress: null,
	from: '0x5934a0c01baa98f3457981b8f5ce6e52ac585578',
	...
	status: true,
	to: '0x31fee792a85ff4d714f47a151975b4979cb47308',
	...
	events: {
		PauserRemoved: {
			address: '0x31fee792A85ff4D714F47A151975b4979CB47308',
			blockNumber: 16567,
			transactionHash: '0xefc93382f5609531dd16f644cf6a3b8e086c623a9fb8038984662f7260482df6',
			transactionIndex: 0,
			blockHash: '0xc0b1b4914ddc8d74e8034fe86ede1b5b88a2c16ee4d678e58fac325c589713f6',
			logIndex: 0,
			id: 'log_e9518d2f',
			returnValues: {
				'0': '0x5934a0c01baA98F3457981b8f5ce6E52ac585578',
				account: '0x5934a0c01baA98F3457981b8f5ce6E52ac585578',
			},
			event: 'PauserRemoved',
			signature: '0xcd265ebaf09df2871cc7bd4133404a235ba12eff2041bb89d9c714a2621c7c7e',
			raw: {
				data: '0x',
				topics: [ '0xcd265...', '0x00...578' ],
			},
		},
	},
}

// Set from in kip7Instance.options.from
// If the value of kip7Instance.options.from is set, this value is used as the default value 
// unless you specify from address in sendParam object when sending transaction with kip7Instance instance.
> kip7Instance.options.from = '0x{address in hex}'
> kip7Instance.renouncePauser().then(console.log)
```


## kip7Instance.pause <a id="kip7instance-pause"></a>

```javascript
kip7Instance.pause([sendParam])
```
Triggers stopped state that stops sending tokens in emergency situation.

Note that pause method will submit a transaction to the Klaytn network, which will charge the transaction fee to the sender.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| sendParam | Object | (optional) An object with defined parameters for sending a transaction. |

The sendParam object can contain the following:

| Name | Type | Description |
| --- | --- | --- |
| from | String | (optional) The address from which the transaction should be sent. If omitted, it will be set by `this.options.from`. If from is not defined in the sendParam object and this.options.from is not defined, an error occurs. |
| gas | Number &#124; String | (optional) The maximum gas provided for this transaction (gas limit). If omitted, it will be set by caver-js via calling `this.methods.pause().estimateGas({from})`. |
| gasPrice | Number &#124; String | (optional) The gas price in peb to use for this transaction. If omitted, it will be set by caver-js via calling `caver.klay.getGasPrice`. |
| value | Number &#124; String &#124; BN &#124; BigNumber | (optional) The value transferred for the transaction in peb. |

**NOTE** The from account sending the transaction must be pauser with permission of PauserRole.

**Return Value**

`Promise` returns `Object` - The receipt containing the result of executing a transaction to execute a KIP-7 token contract. If you want to know about the properties inside the receipt object, see the description of the return field of [getTransactionReceipt](./caver.klay/transaction.md#gettransactionreceipt). Receipts from KIP7 instances have an 'events' attribute parsed via abi instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with a from field defined 
> kip7Instance.pause({ from: '0x{address in hex}' }).then(console.log)
{
	blockHash: '0xcd5e787e738a6197df871f0d651f2a9149d5ed03fdf62e918c4eed03003ea539',
	blockNumber: 18218,
	contractAddress: null,
	from: '0x2f7dc98bd93a0544b03d6ff428a6f4ae04b32676',
	...
	status: true,
	to: '0xfc83abf47d232739dab9610c46b3f10c8022b3ef',
	...
	events: {
		Paused: {
			address: '0xFc83ABF47d232739dAb9610C46B3F10C8022b3eF',
			blockNumber: 18218,
			transactionHash: '0x0e660b8c49e8212a69f2d68324e105b4295b534d22ac0b70263d3e54d429d1bb',
			transactionIndex: 0,
			blockHash: '0xcd5e787e738a6197df871f0d651f2a9149d5ed03fdf62e918c4eed03003ea539',
			logIndex: 0,
			id: 'log_2ab0db96',
			returnValues: {
				'0': '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
				account: '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
			},
			event: 'Paused',
			signature: '0x62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258',
			raw: {
				data: '0x0000000000000000000000002f7dc98bd93a0544b03d6ff428a6f4ae04b32676',
				topics: ['0x62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258'],
			},
		},
	},
}

// Set from in kip7Instance.options.from
// If the value of kip7Instance.options.from is set, this value is used as the default value 
// unless you specify from address in sendParam object when sending transaction with kip7Instance instance.
> kip7Instance.options.from = '0x{address in hex}'
> kip7Instance.pause().then(console.log)
```


## kip7Instance.unpause <a id="kip7instance-unpause"></a>

```javascript
kip7Instance.unpause([sendParam])
```
Sets normal status from the paused state where token transmission was stopped.

Note that unpause method will submit a transaction to the Klaytn network, which will charge the transaction fee to the sender.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| sendParam | Object | (optional) An object with defined parameters for sending a transaction. |

The sendParam object can contain the following:

| Name | Type | Description |
| --- | --- | --- |
| from | String | (optional) The address from which the transaction should be sent. If omitted, it will be set by `this.options.from`. If from is not defined in the sendParam object and this.options.from is not defined, an error occurs. |
| gas | Number &#124; String | (optional) The maximum gas provided for this transaction (gas limit). If omitted, it will be set by caver-js via calling `this.methods.unpause().estimateGas({from})`. |
| gasPrice | Number &#124; String | (optional) The gas price in peb to use for this transaction. If omitted, it will be set by caver-js via calling `caver.klay.getGasPrice`. |
| value | Number &#124; String &#124; BN &#124; BigNumber | (optional) The value transferred for the transaction in peb. |

**NOTE** The from account sending the transaction must be pauser with permission of PauserRole.

**Return Value**

`Promise` returns `Object` - The receipt containing the result of executing a transaction to execute a KIP-7 token contract. If you want to know about the properties inside the receipt object, see the description of the return field of [getTransactionReceipt](./caver.klay/transaction.md#gettransactionreceipt). Receipts from KIP7 instances have an 'events' attribute parsed via abi instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with a from field defined 
> kip7Instance.unpause({ from: '0x{address in hex}' }).then(console.log)
{
	blockHash: '0xa45194ba608a0a00152f974fb1388ced326522979f4b8f19c3fab3083f1339ac',
	blockNumber: 18239,
	contractAddress: null,
	from: '0x2f7dc98bd93a0544b03d6ff428a6f4ae04b32676',
	...
	status: true,
	to: '0xfc83abf47d232739dab9610c46b3f10c8022b3ef',
	...
	events: {
		Unpaused: {
			address: '0xFc83ABF47d232739dAb9610C46B3F10C8022b3eF',
			blockNumber: 18239,
			transactionHash: '0x449dff9d7970bfe326091516ebb22aeaefb0bda59bc4e2577467618863e36c99',
			transactionIndex: 0,
			blockHash: '0xa45194ba608a0a00152f974fb1388ced326522979f4b8f19c3fab3083f1339ac',
			logIndex: 0,
			id: 'log_9c5a3823',
			returnValues: {
				'0': '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
				account: '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
			},
			event: 'Unpaused',
			signature: '0x5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa',
			raw: {
				data: '0x0000000000000000000000002f7dc98bd93a0544b03d6ff428a6f4ae04b32676',
				topics: ['0x5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa'],
			},
		},
	},
}

// Set from in kip7Instance.options.from
// If the value of kip7Instance.options.from is set, this value is used as the default value 
// unless you specify from address in sendParam object when sending transaction with kip7Instance instance.
> kip7Instance.options.from = '0x{address in hex}'
> kip7Instance.unpause().then(console.log)
```
