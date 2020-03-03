---
description: >-
  A caver-js object used to interact with a smart contract for KIP8.
---

# caver.klay.KIP8 <a id="caver-klay-kip8"></a>

The `caver.klay.KIP8` makes it easy to interact with smart contract that implements KIP-8 on the Klaytn blockchain. 

This allows you to interact with smart contract that implements KIP-8 as if they were JavaScript objects.

The `caver.klay.KIP8` inherits [caver.klay.Contract](caver.klay.Contract.md) and is implemented for KIP-8 token contracts. This section describes only the additional implementations of the caver.klay.KIP8 for ease usage.

The abi and bytecode used in the caver.klay.KIP8 were implemented using the example of [openzeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC721).

For more information about KIP-8, see [Klaytn Improvement Proposals](https://klaytn.github.io/kips/token).


## caver.klay.KIP8.deploy <a id="caver-klay-kip8-deploy"></a>

```javascript
caver.klay.KIP8.deploy(tokenInfo, deployer)
```
Deploys the KIP-8 token contract to the Klaytn blockchain. A contract deployed using caver.klay.KIP8.deploy is a non fungible token that follows the KIP-8 standard. 

After successful deployment, the promise will resolve with a new KIP8 instance.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| tokenInfo | Object | The informations needed to deploy KIP-8 token contract on the Klyatn blockchain. |
| deployer | String | The address of the account to which you want to deploy the KIP-8 token contract. This account must have enough KLAY to deploy. |

The tokenInfo object must contain the following:

| Name | Type | Description |
| --- | --- | --- |
| name | String | The name of the token. |
| symbol | String | The symbol of the token. |

**Return Value**

`PromiEvent`: A promise combined event emitter.  Will be resolved with new KIP8 instance. Additionally, the following events are available:

| Name | Type | Description |
| --- | --- | --- |
| transactionHash | String | Is fired right after the transaction is sent and a transaction hash is available. |
| receipt | Object | Is fired when the transaction receipt is available. Receipts from KIP8 instance will have no `logs` property, but instead an `events` property with event names as keys and events as properties. See [getPastEvents return values](caver.klay.Contract.md#getpastevents) for details about the returned event object. |
| error | Error | Is fired if an error occurs during sending. |

**Example**

```javascript
// using the promise
> caver.klay.KIP8.deploy({
    name: 'Jasmine',
    symbol: 'JAS',
}, '0x{address in hex}').then(console.log)
KIP8 {
	...
	_address: '0xfA7D967f414468083aDAd85257a2cBD6019693C2',
	_jsonInterface: [
		...
		{
			anonymous: false,
			inputs: [
				{ indexed: true, name: 'owner', type: 'address' },
     			{ indexed: true, name: 'operator', type: 'address' },
     			{ indexed: false, name: 'approved', type: 'bool' }
			],
			name: 'ApprovalForAll',
			type: 'event',
			signature: '0x17307...'
		}
	] 
}

// using event emitter and promise
> caver.klay.KIP8.deploy({
    name: 'Jasmine',
    symbol: 'JAS',
}, '0x{address in hex}')
.on('error', function(error) { ... })
.on('transactionHash', function(transactionHash) { ... })
.on('receipt', function(receipt) {
	console.log(receipt.contractAddress) // contains the new token contract address
})
.then(function(newKIP8Instance) {
	console.log(newKIP8Instance.options.address) // instance with the new token contract address
})
```


## new KIP8 <a id="new-kip8"></a>

```javascript
new caver.klay.KIP8([tokenAddress] [, jsonInterface])
```
Creates a new KIP8 instance with all its methods and events.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| tokenAddress | String | (optional) The address of the smart contract to call. Can be added later using `kip8Instance.options.address = '0x1234..'` |
| jsonInterface | Object | (optional) The JSON interface for the non fungible token contract to instantiate. The caver.klay.KIP8 operates by default based on the jsonInterface of the specification defined in KIP-8. |

**NOTE** If you send a jsonInterface as a parameter that is not an implementation of KIP-8, you will get an error when using the methods of the class.

**Return Value**

| Type | Description |
| --- | --- |
| Object | The KIP8 instance with all its methods and events. |


**Example**

```javascript
// Create KIP8 instance without parameter
> const kip8Instance = new caver.klay.KIP8()

// Create KIP8 instance with token address
> const kip8Instance = new caver.klay.KIP8('0x{address in hex}')

// Create KIP8 instance with jsonInterface(abi)
> const kip8Instance = new caver.klay.KIP8([
    {
        constant: true,
        inputs: [{ name: 'interfaceId', type: 'bytes4' }],
        name: 'supportsInterface',
        outputs: [{ name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
	...
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: 'owner', type: 'address' },
            { indexed: true, name: 'operator', type: 'address' },
            { indexed: false, name: 'approved', type: 'bool' },
        ],
        name: 'ApprovalForAll',
        type: 'event',
    },
])

// Create KIP8 instance with token address and jsonInterface(abi)
> const kip8Instance = new caver.klay.KIP8('0x{address in hex}', [
    {
        constant: true,
        inputs: [{ name: 'interfaceId', type: 'bytes4' }],
        name: 'supportsInterface',
        outputs: [{ name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
	...
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: 'owner', type: 'address' },
            { indexed: true, name: 'operator', type: 'address' },
            { indexed: false, name: 'approved', type: 'bool' },
        ],
        name: 'ApprovalForAll',
        type: 'event',
    },
])
```


## kip8Instance.clone <a id="kip8instance-clone"></a>

```javascript
kip8Instance.clone([tokenAddress])
```
Clones the current KIP8 instance.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| tokenAddress | String | (optional) The address of the new non fungible token contract to call. If omitted, it will be set by `this.options.address`. |

**Return Value**

| Type | Description |
| --- | --- |
| Object | The new cloned KIP8 instance. |


**Example**

```javascript
// Clone without parameter
> const kip8Instance = new caver.klay.KIP8(address)
> const cloned = kip8Instance.clone()

// Clone with the address of new token contract
> const kip8Instance = new caver.klay.KIP8(address)
> const cloned = kip8Instance.clone('0x{address in hex}')
```


## kip8Instance.supportsInterface <a id="kip8instance-supportsinterface"></a>

```javascript
kip8Instance.supportsInterface(interfaceId)
```
Returns `true` if this contract implements the interface defined by interfaceId.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| interfaceId | String | The interfaceId to check supported. |

**Return Value**

`Promise` returns `Boolean`: `true` if the account of address is minter.

**Example**

```javascript
> kip8Instance.supportsInterface('0x80ac58cd').then(console.log)
true

> kip8Instance.supportsInterface('0xa22cb465').then(console.log)
false
```


## kip8Instance.name <a id="kip8instance-name"></a>

```javascript
kip8Instance.name()
```
Returns the name of the token.

**Parameters**

None

**Return Value**

`Promise` returns `String`: The name of the token.

**Example**

```javascript
> kip8Instance.name().then(console.log)
Jasmine
```


## kip8Instance.symbol <a id="kip8instance-symbol"></a>

```javascript
kip8Instance.symbol()
```
Returns the symbol of the token.

**Parameters**

None

**Return Value**

`Promise` returns `String`: The symbol of the token.

**Example**

```javascript
> kip8Instance.symbol().then(console.log)
JAS
```


## kip8Instance.totalSupply <a id="kip8instance-totalsupply"></a>

```javascript
kip8Instance.totalSupply()
```
Returns the total amount of tokens stored by the contract.

**Parameters**

None

**Return Value**

`Promise` returns `BigNumber`: The total amount of tokens.

**Example**

```javascript
> kip8Instance.totalSupply().then(console.log)
10
```


## kip8Instance.tokenURI <a id="kip8instance-tokenuri"></a>

```javascript
kip8Instance.tokenURI(tokenId)
```
Returns the URI for a given token id.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| tokenId | BigNumber &#124; String &#124; Number | The id of the token. |

**NOTE** It also supports `Number` types as parameters for tokenId. But if the input parameters are out of the range supported by JavaScript Number(Number.MAX_SAFE_INTEGER), they may not work properly or may cause an error. It is recommended to use a variable of type `BigNumber` for a parameter of type `uint256`.

**Return Value**

`Promise` returns `String`: The URI of the given token.

**Example**

```javascript
> kip8Instance.tokenURI(0).then(console.log)
https://kip8.example/uri-ex-caver.json
```


## kip8Instance.tokenOfOwnerByIndex <a id="kip8instance-tokenofownerbyindex"></a>

```javascript
kip8Instance.tokenOfOwnerByIndex(owner, index)
```
Returns the token id at a given index of the tokens list of the requested owner.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| owner | String | The address of the account whose token you want to query. |
| index | BigNumber &#124; String &#124; Number | The index of the token to be searched among the tokens owned by a owner account. |

**NOTE** It also supports `Number` types as parameters for index. But if the input parameters are out of the range supported by JavaScript Number(Number.MAX_SAFE_INTEGER), they may not work properly or may cause an error. It is recommended to use a variable of type `BigNumber` for a parameter of type `uint256`.

**Return Value**

`Promise` returns `BigNumber`: The id of the token.

**Example**

```javascript
> kip8Instance.tokenOfOwnerByIndex('0x{address in hex}', 5).then(console.log)
5
```


## kip8Instance.tokenByIndex <a id="kip8instance-tokenbyindex"></a>

```javascript
kip8Instance.tokenByIndex(index)
```
Returns the token id at a given index of all the tokens in this contract. Reverts if the index is greater or equal to the total number of tokens.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| index | BigNumber &#124; String &#124; Number | The index of the token to query. |

**NOTE** It also supports `Number` types as parameters for index. But if the input parameters are out of the range supported by JavaScript Number(Number.MAX_SAFE_INTEGER), they may not work properly or may cause an error. It is recommended to use a variable of type `BigNumber` for a parameter of type `uint256`.

**Return Value**

`Promise` returns `BigNumber`: The id of the token.

**Example**

```javascript
> kip8Instance.tokenByIndex(1).then(console.log)
1
```


## kip8Instance.balanceOf <a id="kip8instance-balanceof"></a>

```javascript
kip8Instance.balanceOf(address)
```
Returns the balance of the specified address. The balance of an account in KIP-8 means that the total number of NFT(Non Fungible Token) owned by the account.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| address | String | The address of the account whose number of tokens you want to see. |

**Return Value**

`Promise` returns `BigNumber`: The account balance.

**Example**

```javascript
> kip8Instance.balanceOf('0x{address in hex}').then(console.log)
9
```


## kip8Instance.ownerOf <a id="kip8instance-ownerof"></a>

```javascript
kip8Instance.ownerOf(tokenId)
```
Returns the owner of the specified token id.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| tokenId | BigNumber &#124; String &#124; Number | The id of the token. |

**NOTE** It also supports `Number` types as parameters for tokenId. But if the input parameters are out of the range supported by JavaScript Number(Number.MAX_SAFE_INTEGER), they may not work properly or may cause an error. It is recommended to use a variable of type `BigNumber` for a parameter of type `uint256`.

**Return Value**

`Promise` returns `String`: The address of the account that owns the given token.

**Example**

```javascript
> kip8Instance.ownerOf(8).then(console.log)
0x0e0E95426343d97CC7BB913C7D7DBea065A31814
```


## kip8Instance.getApproved <a id="kip8instance-getapproved"></a>

```javascript
kip8Instance.getApproved(tokenId)
```
Returns the approved address for a token id, or zero if no address set. Reverts if the token id does not exist.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| tokenId | BigNumber &#124; String &#124; Number | The id of the token. |

**NOTE** It also supports `Number` types as parameters for tokenId. But if the input parameters are out of the range supported by JavaScript Number(Number.MAX_SAFE_INTEGER), they may not work properly or may cause an error. It is recommended to use a variable of type `BigNumber` for a parameter of type `uint256`.

**Return Value**

`Promise` returns `String`: The address of the account that owns the given token.

**Example**

```javascript
// If approved address is set
> kip8Instance.getApproved(10).then(console.log)
0x23D8E9cae17b22d3DAC65b4F7D2C737C6A7b865d

// If approved address is not set
> kip8Instance.getApproved(3).then(console.log)
0x0000000000000000000000000000000000000000
```


## kip8Instance.isApprovedForAll <a id="kip8instance-isapprovedforall"></a>

```javascript
kip8Instance.isApprovedForAll(owner, operator)
```
Returns `true` if an operator is approved by a given owner.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| owner | String | The address of an account that owns the token and has allowed the operator to transfer the token on behalf of the owner. |
| operator | String | The address of account allowed to send token on behalf of owner. |

**Return Value**

`Promise` returns `Boolean`: The address of the account that owns the given token.

**Example**

```javascript
> kip8Instance.isApprovedForAll('0x{address in hex}', '0x{address in hex}').then(console.log)
false

> kip8Instance.isApprovedForAll('0x{address in hex}', '0x{address in hex}').then(console.log)
true
```


## kip8Instance.isMinter <a id="kip8instance-isminter"></a>

```javascript
kip8Instance.isMinter(address)
```
Returns `true` if an input account is minter which have permission to mint.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| address | String | The address of the account you want to check minting permission. |

**Return Value**

`Promise` returns `Boolean`: `true` if the account of address is minter.

**Example**

```javascript
> kip8Instance.isMinter('0x{address in hex}').then(console.log)
true

> kip8Instance.isMinter('0x{address in hex}').then(console.log)
false
```


## kip8Instance.paused <a id="kip8instance-paused"></a>

```javascript
kip8Instance.paused()
```
Returns `true` if the contract is paused state, and `false` otherwise.

**Parameters**

None

**Return Value**

`Promise` returns `Boolean`: `true` if the contract is paused.

**Example**

```javascript
> kip8Instance.paused().then(console.log)
true

> kip8Instance.paused().then(console.log)
false
```


## kip8Instance.isPauser <a id="kip8instance-ispauser"></a>

```javascript
kip8Instance.isPauser(address)
```
Returns `true` if an input account is pauser which have permission to pause.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| address | String | The address of the account you want to check pausing permission. |

**Return Value**

`Promise` returns `Boolean`: `true` if the account of address is pauser.

**Example**

```javascript
> kip8Instance.isPauser('0x{address in hex}').then(console.log)
true

> kip8Instance.isPauser('0x{address in hex}').then(console.log)
false
```


## kip8Instance.approve <a id="kip8instance-approve"></a>

```javascript
kip8Instance.approve(to, tokenId [, sendParam])
```
Approves another address to transfer the given token id. The zero address indicates there is no approved address. There can only be one approved address per token at a given time. Can only be called by the token owner or an approved operator.

Note that approve method will be executed through sending a transaction to the KIP-8 token contract.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| to | String | The address of the account to use on behalf of owner for the tokenId. |
| tokenId | BigNumber &#124; String &#124; Number | The id of token the spender allows to use on behalf of the owner. |
| sendParam | Object | (optional) An object with defined parameters for sending a transaction. |

**NOTE** It also supports `Number` types as parameters for tokenId. But if the input parameters are out of the range supported by JavaScript Number(Number.MAX_SAFE_INTEGER), they may not work properly or may cause an error. It is recommended to use a variable of type `BigNumber` for a parameter of type `uint256`.

The sendParam object can contain the following:

| Name | Type | Description |
| --- | --- | --- |
| from | String | (optional) The address from which the transaction should be sent. If omitted, it will be set by `this.options.from`. If from is not defined in the sendParam object and this.options.from is not defined, an error occurs. |
| gas | Number &#124; String | (optional) The maximum gas provided for this transaction (gas limit). If omitted, it will be set by caver-js via calling `this.methods.approve(spender, tokenId).estimateGas({from})`. |
| gasPrice | Number &#124; String | (optional) The gas price in peb to use for this transaction. If omitted, it will be set by caver-js via calling `caver.klay.getGasPrice`. |
| value | Number &#124; String &#124; BN &#124; BigNumber | (optional) The value transferred for the transaction in peb. |

**Return Value**

`Promise` returns `Object` - The receipt containing the result of executing a transaction to execute a KIP-8 token contract. If you want to know about the properties inside the receipt object, see the description of the return field of [getTransactionReceipt](./caver.klay/transaction.md#gettransactionreceipt). Receipts from KIP7 instances have an 'events' attribute parsed via abi instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with a from field defined 
> kip8Instance.approve('0x{address in hex}', 10, { from: '0x{address in hex}' }).then(console.log)
{
	blockHash: '0x3875c3f3120c1773c3adeb97260808c8a385bf8427bc203d10cbc5d262f67dbc',
	blockNumber: 2650,
	contractAddress: null,
	from: '0x1147c04b90d1546d76983e19937ad2cdae8b8afd',
	...
	status: true,
	to: '0x5e0e6f1f0bdf9a263e1b1bb6e9759ba182982377',
	...
	events: {
		Approval: {
			address: '0x5E0e6F1F0bDf9A263e1B1bB6e9759Ba182982377',
			blockNumber: 2650,
			transactionHash: '0x0ae92570560d64fa103c8be1861c8625d34ac560066398d9ad0d389ad5f7e441',
			transactionIndex: 0,
			blockHash: '0x3875c3f3120c1773c3adeb97260808c8a385bf8427bc203d10cbc5d262f67dbc',
			logIndex: 0,
			id: 'log_55296c9d',
			returnValues: {
				'0': '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
				'1': '0x58746F9D739bC81713E5F5512529876F508a6166',
				'2': '2',
				owner: '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
				approved: '0x58746F9D739bC81713E5F5512529876F508a6166',
				tokenId: '2',
			},
			event: 'Approval',
			signature: '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
			raw: {
				data: '0x',
				topics: [ '0x8c5be...', '0x00...afd', '0x00...166', '0x00...002' ],
			},
		},
	},
}

// Set from in kip8Instance.options.from
// If the value of kip8Instance.options.from is set, this value is used as the default value 
// unless you specify from address in sendParam object when sending transaction with kip8Instance instance.
> kip8Instance.options.from = '0x{address in hex}'
> kip8Instance.approve('0x{address in hex}', 10).then(console.log)
```


## kip8Instance.setApprovalForAll <a id="kip8instance-setApprovalforall"></a>

```javascript
kip8Instance.setApprovalForAll(to, approved [, sendParam])
```
Sets or unsets the approval of a given operator. An operator is allowed to transfer all tokens of the sender on their behalf.

Note that setApprovalForAll method will be executed through sending a transaction to the KIP-8 token contract.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| to | String | The address of an account to allow/forbid for transfer of all tokens owned by the owner on behalf of the owner. |
| approved | Boolean | Whether to allow sending tokens on behalf of the owner. If approved is true, the to account is allowed to transfer tokens on behalf of the owner; if false, not. |
| sendParam | Object | (optional) An object with defined parameters for sending a transaction. |

The sendParam object can contain the following:

| Name | Type | Description |
| --- | --- | --- |
| from | String | (optional) The address from which the transaction should be sent. If omitted, it will be set by `this.options.from`. If from is not defined in the sendParam object and this.options.from is not defined, an error occurs. |
| gas | Number &#124; String | (optional) The maximum gas provided for this transaction (gas limit). If omitted, it will be set by caver-js via calling `this.methods.setApprovalForAll(spender, approved).estimateGas({from})`. |
| gasPrice | Number &#124; String | (optional) The gas price in peb to use for this transaction. If omitted, it will be set by caver-js via calling `caver.klay.getGasPrice`. |
| value | Number &#124; String &#124; BN &#124; BigNumber | (optional) The value transferred for the transaction in peb. |

**Return Value**

`Promise` returns `Object` - The receipt containing the result of executing a transaction to execute a KIP-8 token contract. If you want to know about the properties inside the receipt object, see the description of the return field of [getTransactionReceipt](./caver.klay/transaction.md#gettransactionreceipt). Receipts from KIP7 instances have an 'events' attribute parsed via abi instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with a from field defined 
> kip8Instance.setApprovalForAll('0x{address in hex}', false, { from: '0x{address in hex}' }).then(console.log)
{
	blockHash: '0x34379ac5b71f16f41d5171d021ca2945e02c60d9fb7f85fc0127262c2ce72b47',
	blockNumber: 3340,
	contractAddress: null,
	from: '0x1147c04b90d1546d76983e19937ad2cdae8b8afd',
	...
	status: true,
	to: '0x1f15b1a4da5437b29bfb7f248b5e344e6b16b654',
	...
	events: {
		ApprovalForAll: {
			address: '0x1f15B1A4DA5437b29BfB7f248B5e344E6b16b654',
			blockNumber: 3340,
			transactionHash: '0x72fdf23482b9cf164638e6cbdfdf56541a6189c88639e21f076a8a50ef749a50',
			transactionIndex: 0,
			blockHash: '0x34379ac5b71f16f41d5171d021ca2945e02c60d9fb7f85fc0127262c2ce72b47',
			logIndex: 0,
			id: 'log_1069ad22',
			returnValues: {
				'0': '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
				'1': '0x399bE7034F26feFB5AE683e488903B8bE5ad38b8',
				'2': false,
				owner: '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
				operator: '0x399bE7034F26feFB5AE683e488903B8bE5ad38b8',
				approved: false,
			},
			event: 'ApprovalForAll',
			signature: '0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31',
			raw: {
				data: '0x0000000000000000000000000000000000000000000000000000000000000000',
				topics: [ '0x17307...', '0x00...afd', '0x00...8b8' ],
			},
		},
	},
}

// Set from in kip8Instance.options.from
// If the value of kip8Instance.options.from is set, this value is used as the default value 
// unless you specify from address in sendParam object when sending transaction with kip8Instance instance.
> kip8Instance.options.from = '0x{address in hex}'
> kip8Instance.setApprovalForAll('0x{address in hex}', true).then(console.log)
```


## kip8Instance.transferFrom <a id="kip8instance-transferfrom"></a>

```javascript
kip8Instance.transferFrom(from, to, tokenId [, sendParam])
```
Transfers the ownership of a given token id to another address. Usage of this method is discouraged, use [safeTransferFrom](#kip8instance-safetransferfrom) whenever possible.

Note that transferFrom method will be executed through sending a transaction to the KIP-8 token contract.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| from | String | The address of the owner or approved of the given token. |
| to | String | The address of the account to receive the token. |
| tokenId | BigNumber &#124; String &#124; Number | The id of token you want to transfer. |
| sendParam | Object | (optional) An object with defined parameters for sending a transaction. |

**NOTE** It also supports `Number` types as parameters for tokenId. But if the input parameters are out of the range supported by JavaScript Number(Number.MAX_SAFE_INTEGER), they may not work properly or may cause an error. It is recommended to use a variable of type `BigNumber` for a parameter of type `uint256`.

The sendParam object can contain the following:

| Name | Type | Description |
| --- | --- | --- |
| from | String | (optional) The address from which the transaction should be sent. If omitted, it will be set by `this.options.from`. If from is not defined in the sendParam object and this.options.from is not defined, an error occurs. |
| gas | Number &#124; String | (optional) The maximum gas provided for this transaction (gas limit). If omitted, it will be set by caver-js via calling `this.methods.transferFrom(from, to, tokenId).estimateGas({from})`. |
| gasPrice | Number &#124; String | (optional) The gas price in peb to use for this transaction. If omitted, it will be set by caver-js via calling `caver.klay.getGasPrice`. |
| value | Number &#124; String &#124; BN &#124; BigNumber | (optional) The value transferred for the transaction in peb. |

**Return Value**

`Promise` returns `Object` - The receipt containing the result of executing a transaction to execute a KIP-8 token contract. If you want to know about the properties inside the receipt object, see the description of the return field of [getTransactionReceipt](./caver.klay/transaction.md#gettransactionreceipt). Receipts from KIP7 instances have an 'events' attribute parsed via abi instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with a from field defined 
> kip8Instance.transferFrom('0x{address in hex}', '0x{address in hex}', 2, { from: '0x{address in hex}' }).then(console.log)
{
	blockHash: '0x9cae3aa93d327804f333674a77d5d01d8c7908c49749b0d747b6391faa232b58',
	blockNumber: 3592,
	contractAddress: null,
	from: '0x9c4fc0ab840914a29c7deb5cc5c625a4cec3a9cd',
	...
	status: true,
	to: '0x6e611498570bbc8cb127899c4d24e156ec72473a',
	...
	events: {
		Transfer: {
			address: '0x6e611498570bBc8cb127899C4D24e156ec72473a',
			blockNumber: 3592,
			transactionHash: '0x386af961e5acda2c5bd58ec71ee52f579dc2b07a2e5ec97678453f04cc1b709a',
			transactionIndex: 0,
			blockHash: '0x9cae3aa93d327804f333674a77d5d01d8c7908c49749b0d747b6391faa232b58',
			logIndex: 0,
			id: 'log_c2ba5874',
			returnValues: {
				'0': '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
				'1': '0x045796ABC035001CF50274FcA8A2614Abf5dd6bf',
				'2': '2',
				from: '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
				to: '0x045796ABC035001CF50274FcA8A2614Abf5dd6bf',
				tokenId: '2',
			},
			event: 'Transfer',
			signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
			raw: {
				data: '0x',
				topics: [ '0xddf25...', '0x00...afd', '0x00...6bf', '0x00...002' ],
			},
		},
	},
}

// Set from in kip8Instance.options.from
// If the value of kip8Instance.options.from is set, this value is used as the default value 
// unless you specify from address in sendParam object when sending transaction with kip8Instance instance.
> kip8Instance.options.from = '0x{address in hex}'
> kip8Instance.transferFrom('0x{address in hex}', '0x{address in hex}', 2).then(console.log)
```


## kip8Instance.safeTransferFrom <a id="kip8instance-safetransferfrom"></a>

```javascript
kip8Instance.safeTransferFrom(from, to, tokenId [, data] [, sendParam])
```
Safely transfers the ownership of a given token id to another address. If the target address is a contract, it must implement IERC721Receiver.onERC721Received, which is called upon a safe transfer, and return the magic value bytes4(keccak256("onERC721Received(address,address,uint256,bytes)")); otherwise, the transfer is reverted.

Note that safeTransferFrom method will be executed through sending a transaction to the KIP-8 token contract.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| from | String | The address of the owner or approved of the given token. |
| to | String | The address of the account to receive the token. |
| tokenId | BigNumber &#124; String &#124; Number | The id of token you want to transfer. |
| data | Buffer &#124; String &#124; Number | (optional) The optional data to send along with the call. |
| sendParam | Object | (optional) An object with defined parameters for sending a transaction. |

**NOTE** It also supports `Number` types as parameters for tokenId. But if the input parameters are out of the range supported by JavaScript Number(Number.MAX_SAFE_INTEGER), they may not work properly or may cause an error. It is recommended to use a variable of type `BigNumber` for a parameter of type `uint256`.

The sendParam object can contain the following:

| Name | Type | Description |
| --- | --- | --- |
| from | String | (optional) The address from which the transaction should be sent. If omitted, it will be set by `this.options.from`. If from is not defined in the sendParam object and this.options.from is not defined, an error occurs. |
| gas | Number &#124; String | (optional) The maximum gas provided for this transaction (gas limit). If omitted, it will be set by caver-js via calling `this.methods.safeTransferFrom(from, to, tokenId[, data]).estimateGas({from})`. |
| gasPrice | Number &#124; String | (optional) The gas price in peb to use for this transaction. If omitted, it will be set by caver-js via calling `caver.klay.getGasPrice`. |
| value | Number &#124; String &#124; BN &#124; BigNumber | (optional) The value transferred for the transaction in peb. |

**Return Value**

`Promise` returns `Object` - The receipt containing the result of executing a transaction to execute a KIP-8 token contract. If you want to know about the properties inside the receipt object, see the description of the return field of [getTransactionReceipt](./caver.klay/transaction.md#gettransactionreceipt). Receipts from KIP7 instances have an 'events' attribute parsed via abi instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with a from field defined (without data)
> kip8Instance.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 9, { from: '0x{address in hex}' }).then(console.log)
{
	blockHash: '0x14c5bebc2be86081d8375ba11edba0e541be1df24c1beced1a9e82e3083a8035',
	blockNumber: 6260,
	contractAddress: null,
	from: '0x80b88b47361cec0baee1947868fc872b784cf91e',
	...
	status: true,
	to: '0xa9066e2b62483bcdf6358874cb87f9e0046e8ad3',
	...
	events: {
		Transfer: {
			address: '0xA9066e2B62483bcdf6358874CB87f9e0046E8ad3',
			blockNumber: 6260,
			transactionHash: '0x0a92436289e70018f9ebef0df5d3ce87874afd8e5058fcc08fefc6de3e0e9b36',
			transactionIndex: 0,
			blockHash: '0x14c5bebc2be86081d8375ba11edba0e541be1df24c1beced1a9e82e3083a8035',
			logIndex: 0,
			id: 'log_c9c17595',
			returnValues: {
				'0': '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
				'1': '0x0F47Ea1A10B8F7D61c894E392EfaC990A314d313',
				'2': '9',
				from: '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
				to: '0x0F47Ea1A10B8F7D61c894E392EfaC990A314d313',
				tokenId: '9',
			},
			event: 'Transfer',
			signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
			raw: {
				data: '0x',
				topics: [ '0xddf25...', '0x00...afd', '0x00...313', '0x00...009' ],
			},
		},
	},
}

// Send via a sendParam object with a from field defined (with data)
> kip8Instance.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 11, '0x1234', { from: '0x{address in hex}' }).then(console.log)

// Set from in kip8Instance.options.from
// If the value of kip8Instance.options.from is set, this value is used as the default value 
// unless you specify from address in sendParam object when sending transaction with kip8Instance instance.
> kip8Instance.options.from = '0x{address in hex}'
> kip8Instance.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 11).then(console.log)
```


## kip8Instance.addMinter <a id="kip8instance-addminter"></a>

```javascript
kip8Instance.addMinter(account [, sendParam])
```
Adds an account as a minter that has the permission of MinterRole and can mint.

Note that addMinter method will be executed through sending a transaction to the KIP-8 token contract.

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

`Promise` returns `Object` - The receipt containing the result of executing a transaction to execute a KIP-8 token contract. If you want to know about the properties inside the receipt object, see the description of the return field of [getTransactionReceipt](./caver.klay/transaction.md#gettransactionreceipt). Receipts from KIP7 instances have an 'events' attribute parsed via abi instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with a from field defined 
> kip8Instance.addMinter('0x{address in hex}', { from: '0x{address in hex}' }).then(console.log)
{
	blockHash: '0xecd0fb45a32323d5cb14558d1d9299393022d5e7284519598dbd8b14c4c55930',
	blockNumber: 8307,
	contractAddress: null,
	from: '0x1147c04b90d1546d76983e19937ad2cdae8b8afd',
	...
	status: true,
	to: '0x1595b5c1027ed36dcb32e4d39766b896d5b97ecb',
	...
	events: {
		MinterAdded: {
			address: '0x1595b5c1027ed36dCB32e4D39766b896d5B97ecb',
			blockNumber: 8307,
			transactionHash: '0xf8da21958c84aa3ed8bfa5eea0649c5b9a895efa8c7a715196e000bef4f0b8bd',
			transactionIndex: 0,
			blockHash: '0xecd0fb45a32323d5cb14558d1d9299393022d5e7284519598dbd8b14c4c55930',
			logIndex: 0,
			id: 'log_f40a92bf',
			returnValues: {
				'0': '0x90170C1E7E8C14BBf1124f52980372088BA540Dc',
				account: '0x90170C1E7E8C14BBf1124f52980372088BA540Dc',
			},
			event: 'MinterAdded',
			signature: '0x6ae172837ea30b801fbfcdd4108aa1d5bf8ff775444fd70256b44e6bf3dfc3f6',
			raw: {
				data: '0x',
				topics: [ '0x6ae17...', '0x00...0dc' ],
			},
		},
	},
}

// Set from in kip8Instance.options.from
// If the value of kip8Instance.options.from is set, this value is used as the default value 
// unless you specify from address in sendParam object when sending transaction with kip8Instance instance.
> kip8Instance.options.from = '0x{address in hex}'
> kip8Instance.addMinter('0x{address in hex}').then(console.log)
```


## kip8Instance.renounceMinter <a id="kip8instance-renounceminter"></a>

```javascript
kip8Instance.renounceMinter([sendParam])
```
Renounces privilege of MinterRole. Only address that is Minter can renounce itself from Minter role, no one else. 

Note that renounceMinter method will be executed through sending a transaction to the KIP-8 token contract.

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

`Promise` returns `Object` - The receipt containing the result of executing a transaction to execute a KIP-8 token contract. If you want to know about the properties inside the receipt object, see the description of the return field of [getTransactionReceipt](./caver.klay/transaction.md#gettransactionreceipt). Receipts from KIP7 instances have an 'events' attribute parsed via abi instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with a from field defined 
> kip8Instance.renounceMinter({ from: '0x{address in hex}' }).then(console.log)
{
	blockHash: '0xe130d7ee71a2c55b3cf4e2bce9ea26e7c2cde556c7f8288abac60121b27c26c8',
	blockNumber: 8542,
	contractAddress: null,
	from: '0xb72f5cf2627e6614984d8a9f27ee426b29191831',
	...
	status: true,
	to: '0xf9d0663fc29c48495f42c0b061cb06df6df76c34',
	...
	events: {
		MinterRemoved: {
			address: '0xF9D0663fC29c48495F42c0b061cB06Df6DF76c34',
			blockNumber: 8542,
			transactionHash: '0x557a4e7b9fd6577ffdb14c2e1f00c0009a7bbda2294502fa765250632b5b0f99',
			transactionIndex: 0,
			blockHash: '0xe130d7ee71a2c55b3cf4e2bce9ea26e7c2cde556c7f8288abac60121b27c26c8',
			logIndex: 0,
			id: 'log_04b47645',
			returnValues: {
				'0': '0xB72F5cF2627e6614984D8A9F27eE426b29191831',
				account: '0xB72F5cF2627e6614984D8A9F27eE426b29191831',
			},
			event: 'MinterRemoved',
			signature: '0xe94479a9f7e1952cc78f2d6baab678adc1b772d936c6583def489e524cb66692',
			raw: {
				data: '0x',
				topics: [ '0xe9447...', '0x00...831' ],
			},
		},
	},
}

// Set from in kip8Instance.options.from
// If the value of kip8Instance.options.from is set, this value is used as the default value 
// unless you specify from address in sendParam object when sending transaction with kip8Instance instance.
> kip8Instance.options.from = '0x{address in hex}'
> kip8Instance.renounceMinter().then(console.log)
```


## kip8Instance.mintWithTokenURI <a id="kip8instance-mintwithtokenuri"></a>

```javascript
kip8Instance.mintWithTokenURI(to, tokenId, tokenURI [, sendParam])
```
Creates token with uri and assigns them to account, increasing the total supply.

Note that mintWithTokenURI method will be executed through sending a transaction to the KIP-8 token contract.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| to | String | The address of the account to which the minted token will be allocated. |
| tokenId | BigNumber &#124; String &#124; Number | The id of token to mint. |
| tokenURI | Number | The uri of token to mint. |
| sendParam | Object | (optional) An object with defined parameters for sending a transaction. |

**NOTE** It also supports `Number` types as parameters for tokenId. But if the input parameters are out of the range supported by JavaScript Number(Number.MAX_SAFE_INTEGER), they may not work properly or may cause an error. It is recommended to use a variable of type `BigNumber` for a parameter of type `uint256`.

The sendParam object can contain the following:

| Name | Type | Description |
| --- | --- | --- |
| from | String | (optional) The address from which the transaction should be sent. If omitted, it will be set by `this.options.from`. If from is not defined in the sendParam object and this.options.from is not defined, an error occurs. |
| gas | Number &#124; String | (optional) The maximum gas provided for this transaction (gas limit). If omitted, it will be set by caver-js via calling `this.methods.mintWithTokenURI(to, tokenId, tokenURI).estimateGas({from})`. |
| gasPrice | Number &#124; String | (optional) The gas price in peb to use for this transaction. If omitted, it will be set by caver-js via calling `caver.klay.getGasPrice`. |
| value | Number &#124; String &#124; BN &#124; BigNumber | (optional) The value transferred for the transaction in peb. |

**NOTE** The from account sending the transaction must be minter with permission of MinterRole.

**Return Value**

`Promise` returns `Object` - The receipt containing the result of executing a transaction to execute a KIP-8 token contract. If you want to know about the properties inside the receipt object, see the description of the return field of [getTransactionReceipt](./caver.klay/transaction.md#gettransactionreceipt). Receipts from KIP7 instances have an 'events' attribute parsed via abi instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with a from field defined 
> kip8Instance.mintWithTokenURI('0x{address in hex}', 18, tokenURI, { from: '0x{address in hex}' }).then(console.log)
{
	blockHash: '0xd2473b9853ad33c5fa0a75187e65733614ed4f8c937d06e239768a5ca32d7c7f',
	blockNumber: 9313,
	contractAddress: null,
	from: '0x1147c04b90d1546d76983e19937ad2cdae8b8afd',
	...
	status: true,
	to: '0x7fbf73709054007f5262692f8faf27dee75ab3a6',
	...
	events: {
		Transfer: {
			address: '0x7FBf73709054007f5262692f8FaF27dEE75Ab3A6',
			blockNumber: 9313,
			transactionHash: '0x17c2eda25c8a817915e3dd77b4fb4838259e8b49ae1c0d8e369167f715a08e7f',
			transactionIndex: 0,
			blockHash: '0xd2473b9853ad33c5fa0a75187e65733614ed4f8c937d06e239768a5ca32d7c7f',
			logIndex: 0,
			id: 'log_d060e77e',
			returnValues: {
				'0': '0x0000000000000000000000000000000000000000',
				'1': '0x203ad91221290901CFDAC9399aCf664499924744',
				'2': '18',
				from: '0x0000000000000000000000000000000000000000',
				to: '0x203ad91221290901CFDAC9399aCf664499924744',
				tokenId: '18',
			},
			event: 'Transfer',
			signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
			raw: {
				data: '0x',
				topics: [ '0xddf25...', '0x00...000', '0x00...744', '0x00...012' ],
			},
		},
	},
}

// Set from in kip8Instance.options.from
// If the value of kip8Instance.options.from is set, this value is used as the default value 
// unless you specify from address in sendParam object when sending transaction with kip8Instance instance.
> kip8Instance.options.from = '0x{address in hex}'
> kip8Instance.mintWithTokenURI('0x{address in hex}', 18, tokenURI).then(console.log)
```


## kip8Instance.burn <a id="kip8instance-burn"></a>

```javascript
kip8Instance.burn(tokenId [, sendParam])
```
Destroys a specific KIP-8 token.

Note that burn method will be executed through sending a transaction to the KIP-8 token contract.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| tokenId | BigNumber &#124; String &#124; Number | The id of token to destroy. |
| sendParam | Object | (optional) An object with defined parameters for sending a transaction. |

**NOTE** It also supports `Number` types as parameters for tokenId. But if the input parameters are out of the range supported by JavaScript Number(Number.MAX_SAFE_INTEGER), they may not work properly or may cause an error. It is recommended to use a variable of type `BigNumber` for a parameter of type `uint256`.

The sendParam object can contain the following:

| Name | Type | Description |
| --- | --- | --- |
| from | String | (optional) The address from which the transaction should be sent. If omitted, it will be set by `this.options.from`. If from is not defined in the sendParam object and this.options.from is not defined, an error occurs. |
| gas | Number &#124; String | (optional) The maximum gas provided for this transaction (gas limit). If omitted, it will be set by caver-js via calling `this.methods.burn(tokenId).estimateGas({from})`. |
| gasPrice | Number &#124; String | (optional) The gas price in peb to use for this transaction. If omitted, it will be set by caver-js via calling `caver.klay.getGasPrice`. |
| value | Number &#124; String &#124; BN &#124; BigNumber | (optional) The value transferred for the transaction in peb. |

**Return Value**

`Promise` returns `Object` - The receipt containing the result of executing a transaction to execute a KIP-8 token contract. If you want to know about the properties inside the receipt object, see the description of the return field of [getTransactionReceipt](./caver.klay/transaction.md#gettransactionreceipt). Receipts from KIP7 instances have an 'events' attribute parsed via abi instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with a from field defined 
> kip8Instance.burn(14, { from: '0x{address in hex}' }).then(console.log)
{
	blockHash: '0x09d8ed5582fdd1c39b0f19f14f065659fe275a60856d86a1840535f6df1a2d51',
	blockNumber: 18237,
	contractAddress: null,
	from: '0x1147c04b90d1546d76983e19937ad2cdae8b8afd',
	...
	status: true,
	to: '0x2032e61c79a951aacef8033adca96fc3b9b747b4',
	...
	events: {
		Transfer: {
			address: '0x2032e61C79A951AACEf8033AdCa96fC3b9b747b4',
			blockNumber: 18237,
			transactionHash: '0x4e377d8d65c8565c7bc91568bcdcc0fddeb46a02a778725e437f368a8d9c6165',
			transactionIndex: 0,
			blockHash: '0x09d8ed5582fdd1c39b0f19f14f065659fe275a60856d86a1840535f6df1a2d51',
			logIndex: 0,
			id: 'log_5af49695',
			returnValues: {
				'0': '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
				'1': '0x0000000000000000000000000000000000000000',
				'2': '14',
				from: '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
				to: '0x0000000000000000000000000000000000000000',
				tokenId: '14',
			},
			event: 'Transfer',
			signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
			raw: {
				data: '0x',
				topics: [ '0xddf25...', '0x00...afd', '0x00...000', '0x00...00e' ],
			},
		},
	},
}

// Set from in kip8Instance.options.from
// If the value of kip8Instance.options.from is set, this value is used as the default value 
// unless you specify from address in sendParam object when sending transaction with kip8Instance instance.
> kip8Instance.options.from = '0x{address in hex}'
> kip8Instance.burn(14).then(console.log)
```


## kip8Instance.pause <a id="kip8instance-pause"></a>

```javascript
kip8Instance.pause([sendParam])
```
Triggers stopped state that stops sending tokens in emergency situation.

Note that pause method will be executed through sending a transaction to the KIP-8 token contract.

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

`Promise` returns `Object` - The receipt containing the result of executing a transaction to execute a KIP-8 token contract. If you want to know about the properties inside the receipt object, see the description of the return field of [getTransactionReceipt](./caver.klay/transaction.md#gettransactionreceipt). Receipts from KIP7 instances have an 'events' attribute parsed via abi instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with a from field defined 
> kip8Instance.pause({ from: '0x{address in hex}' }).then(console.log)
{
	blockHash: '0xd73c026474b2077a04808ed0ce6713821eaa8afaed476b19d22b28e483747e04',
	blockNumber: 19826,
	contractAddress: null,
	from: '0x1147c04b90d1546d76983e19937ad2cdae8b8afd',
	...
	status: true,
	to: '0x601c11f396e92436df8d9bbaff3fbfec906b7f67',
	...
	events: {
		Paused: {
			address: '0x601C11F396E92436Df8d9bBAFf3fbfEc906B7f67',
			blockNumber: 19826,
			transactionHash: '0x549f7786ca5d2c1877be20126fc51c2418194ecaa8cea536d08f72c2f01919d0',
			transactionIndex: 0,
			blockHash: '0xd73c026474b2077a04808ed0ce6713821eaa8afaed476b19d22b28e483747e04',
			logIndex: 0,
			id: 'log_93d26310',
			returnValues: {
				'0': '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
				account: '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
			},
			event: 'Paused',
			signature: '0x62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258',
			raw: {
				data: '0x0000000000000000000000001147c04b90d1546d76983e19937ad2cdae8b8afd',
				topics: ['0x62e78...'],
			},
		},
	},
}

// Set from in kip8Instance.options.from
// If the value of kip8Instance.options.from is set, this value is used as the default value 
// unless you specify from address in sendParam object when sending transaction with kip8Instance instance.
> kip8Instance.options.from = '0x{address in hex}'
> kip8Instance.pause().then(console.log)
```


## kip8Instance.unpause <a id="kip8instance-unpause"></a>

```javascript
kip8Instance.unpause([sendParam])
```
Sets normal status from the paused state where token transmission was stopped.

Note that unpause method will be executed through sending a transaction to the KIP-8 token contract.

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

`Promise` returns `Object` - The receipt containing the result of executing a transaction to execute a KIP-8 token contract. If you want to know about the properties inside the receipt object, see the description of the return field of [getTransactionReceipt](./caver.klay/transaction.md#gettransactionreceipt). Receipts from KIP7 instances have an 'events' attribute parsed via abi instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with a from field defined 
> kip8Instance.unpause({ from: '0x{address in hex}' }).then(console.log)
{
	blockHash: '0x6a9fc0c70853e696e687b119ba95971a42d91616a040ec17afe1fd4803f5a6cb',
	blockNumber: 19845,
	contractAddress: null,
	from: '0x1147c04b90d1546d76983e19937ad2cdae8b8afd',
	...
	status: true,
	to: '0x601c11f396e92436df8d9bbaff3fbfec906b7f67',
	...
	events: {
		Unpaused: {
			address: '0x601C11F396E92436Df8d9bBAFf3fbfEc906B7f67',
			blockNumber: 19845,
			transactionHash: '0x4f0d2767fc36e5062a34753bc447a2c15b476c304f8e9e013ddf06124db33229',
			transactionIndex: 0,
			blockHash: '0x6a9fc0c70853e696e687b119ba95971a42d91616a040ec17afe1fd4803f5a6cb',
			logIndex: 0,
			id: 'log_364c25d2',
			returnValues: {
				'0': '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
				account: '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
			},
			event: 'Unpaused',
			signature: '0x5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa',
			raw: {
				data: '0x0000000000000000000000001147c04b90d1546d76983e19937ad2cdae8b8afd',
				topics: ['0x5db9e...'],
			},
		},
	},
}

// Set from in kip8Instance.options.from
// If the value of kip8Instance.options.from is set, this value is used as the default value 
// unless you specify from address in sendParam object when sending transaction with kip8Instance instance.
> kip8Instance.options.from = '0x{address in hex}'
> kip8Instance.unpause().then(console.log)
```


## kip8Instance.addPauser <a id="kip8instance-addpauser"></a>

```javascript
kip8Instance.addPauser(account [, sendParam])
```
Adds an account as a pauser that has the permission of PauserRole and can pause.

Note that addPauser method will be executed through sending a transaction to the KIP-8 token contract.

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

`Promise` returns `Object` - The receipt containing the result of executing a transaction to execute a KIP-8 token contract. If you want to know about the properties inside the receipt object, see the description of the return field of [getTransactionReceipt](./caver.klay/transaction.md#gettransactionreceipt). Receipts from KIP7 instances have an 'events' attribute parsed via abi instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with a from field defined 
> kip8Instance.addPauser('0x{address in hex}', { from: '0x{address in hex}' }).then(console.log)
{
	blockHash: '0xd9f18912c9666a67a2e7445af0abe5140212955b3d35c491e5475d512fdee7d5',
	blockNumber: 20502,
	contractAddress: null,
	from: '0x1147c04b90d1546d76983e19937ad2cdae8b8afd',
	...
	status: true,
	to: '0x4010afbfbf8d94830b226fc5ff311859af806b90',
	...
	events: {
		PauserAdded: {
			address: '0x4010afbfbF8d94830b226Fc5ff311859AF806B90',
			blockNumber: 20502,
			transactionHash: '0x5f6fef2df70dcbe67e6d74e201005b618da5d53ac2f85ad31fce39226fd1b70b',
			transactionIndex: 0,
			blockHash: '0xd9f18912c9666a67a2e7445af0abe5140212955b3d35c491e5475d512fdee7d5',
			logIndex: 0,
			id: 'log_bf9f8982',
			returnValues: {
				'0': '0xD050b56bB04Da257D144e6b382318A2B8c58b0B2',
				account: '0xD050b56bB04Da257D144e6b382318A2B8c58b0B2',
			},
			event: 'PauserAdded',
			signature: '0x6719d08c1888103bea251a4ed56406bd0c3e69723c8a1686e017e7bbe159b6f8',
			raw: {
				data: '0x',
				topics: [ '0x6719d...', '0x00...0b2' ],
			},
		},
	},
}

// Set from in kip8Instance.options.from
// If the value of kip8Instance.options.from is set, this value is used as the default value 
// unless you specify from address in sendParam object when sending transaction with kip8Instance instance.
> kip8Instance.options.from = '0x{address in hex}'
> kip8Instance.addPauser('0x{address in hex}').then(console.log)
```


## kip8Instance.renouncePauser <a id="kip8instance-renouncepauser"></a>

```javascript
kip8Instance.renouncePauser([sendParam])
```
Renounces privilege of PauserRole. Only address that is Pauser can renounce itself from Pauser role, no one else. 

Note that renouncePauser method will be executed through sending a transaction to the KIP-8 token contract.

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

`Promise` returns `Object` - The receipt containing the result of executing a transaction to execute a KIP-8 token contract. If you want to know about the properties inside the receipt object, see the description of the return field of [getTransactionReceipt](./caver.klay/transaction.md#gettransactionreceipt). Receipts from KIP7 instances have an 'events' attribute parsed via abi instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with a from field defined 
> kip8Instance.renouncePauser({ from: '0x{address in hex}' }).then(console.log)
{
	blockHash: '0x32bb338ca23846478934416d1b1f4152b69a49411d61b316cff8b3a7d62ca91e',
	blockNumber: 20512,
	contractAddress: null,
	from: '0xe04cb220e94e6595427568c954b5d819392813bc',
	...
	status: true,
	to: '0x4010afbfbf8d94830b226fc5ff311859af806b90',
	...
	events: {
		PauserRemoved: {
			address: '0x4010afbfbF8d94830b226Fc5ff311859AF806B90',
			blockNumber: 20512,
			transactionHash: '0x72982fa8a8de25c961cd19bd91aa7acf0111feb8e9026e607d89843bcd8f783a',
			transactionIndex: 0,
			blockHash: '0x32bb338ca23846478934416d1b1f4152b69a49411d61b316cff8b3a7d62ca91e',
			logIndex: 0,
			id: 'log_0a9d1350',
			returnValues: {
				'0': '0xE04cB220e94E6595427568c954b5D819392813bC',
				account: '0xE04cB220e94E6595427568c954b5D819392813bC',
			},
			event: 'PauserRemoved',
			signature: '0xcd265ebaf09df2871cc7bd4133404a235ba12eff2041bb89d9c714a2621c7c7e',
			raw: {
				data: '0x',
				topics: [ '0xcd265...', '0x00...3bc' ],
			},
		},
	},
}

// Set from in kip8Instance.options.from
// If the value of kip8Instance.options.from is set, this value is used as the default value 
// unless you specify from address in sendParam object when sending transaction with kip8Instance instance.
> kip8Instance.options.from = '0x{address in hex}'
> kip8Instance.renouncePauser().then(console.log)
```