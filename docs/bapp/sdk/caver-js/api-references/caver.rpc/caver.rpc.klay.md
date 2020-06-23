# caver.rpc.klay <a id="caver-rpc-klay"></a>

`caver.rpc.klay` provides JSON-RPC call with `klay` name space.

## caver.rpc.klay.accountCreated <a id="caver-rpc-klay-accountcreated"></a>

```javascript
caver.rpc.klay.accountCreated(address [, blockNumber] [, callback])
```

Returns `true` if the account associated with the address is created in the Klaytn blockchain platform. It return `false` otherwise.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| address | string | The address of the account you want to query to see if it has been created on the network. |
| blockNumber | number &#124; string | (optional) A block number, or the string `latest`, `earliest` or `pending`. If omitted, `latest` will be used. |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `boolean`

| Type | Description |
| --- | --- |
| boolean | The existence of an input address in the Klaytn. |

**Example**

```javascript
> caver.rpc.klay.accountCreated('0x{address in hex}').then(console.log)
true
```

## caver.rpc.klay.getAccount <a id="caver-rpc-klay-getAccount"></a>

```javascript
caver.rpc.klay.getAccount(address [, blockNumber] [, callback])
```

Returns the account information of a given address in the Klaytn. For more details about the types of an account in Klaytn, please refer to [Klaytn Account Types](../../../../../klaytn/design/accounts.md#klaytn-account-types).

**NOTE** `caver.rpc.klay.getAccount` returns the account that exists on the network, so `null` is returned if the account matching the address does not exist on the actual blockchain network.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| address | string | The address of the account for which you want to get account information. |
| blockNumber | number &#124; string | (optional) A block number, or the string `latest`, `earliest` or `pending`. If omitted, `latest` will be used. |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `object`

| Type | Description |
| --- | --- |
| object | An object that contains the account information. Each account type has different attributes. |

**Example**

```javascript
// Get account with EOA
> caver.rpc.klay.getAccount('0x{address in hex}').then(console.log)
{
	accType: 1,
	account: {
		nonce: 0,
		balance: '0x',
		humanReadable: false,
		key: { keyType: 1, key: {} }
	}
}

// Get account with SCA
> caver.rpc.klay.getAccount('0x{address in hex}').then(console.log)
{
	accType: 2,
	account: {
		nonce: 1,
		balance: '0x0',
		humanReadable: false,
		key: { keyType: 3, key: {} },
		storageRoot: '0xd0ce6b9ba63cf727d48833bcaf69f398bb353e9a5b6235ac5bb3a8e95ff90ecf',
		codeHash: '7pemrmP8fcguH/ut/SYHJoUSecfUIcUyeCpMf0sBYVI=',
		codeFormat: 0
	}
}
```

## caver.rpc.klay.getAccountKey <a id="caver-rpc-klay-getaccountkey"></a>

```javascript
caver.rpc.klay.getAccountKey(address [, blockNumber] [, callback])
```

Returns the account key of a given address. If the account has [AccountKeyLegacy](../../../../../klaytn/design/accounts.md#accountkeylegacy) or the account of the given address is a [Smart Contract Account](../../../../../klaytn/design/accounts.md#smart-contract-accounts-scas), it will return an empty key value. Please refer to [Account Key](../../../../../klaytn/design/accounts.md#account-key) for more details.

**NOTE** `caver.rpc.klay.getAccountKey` returns the account key if the account exists on the network,  so `null` is returned if the account matching the address does not exist on the actual blockchain network.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| address | string | The address of the account for which you want to get account key. |
| blockNumber | number &#124; string | (optional) A block number, or the string `latest`, `earliest` or `pending`. If omitted, `latest` will be used. |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `object`

| Type | Description |
| --- | --- |
| object | An object that contains the account key information. Each account key type has different attributes. |

**Example**

```javascript
// AccountKey type: AccountKeyLegacy
> caver.rpc.klay.getAccountKey('0x{address in hex}').then(console.log)
{ keyType: 1, key: {} }

// AccountKey type: AccountKeyPublic
> caver.rpc.klay.getAccountKey('0x{address in hex}').then(console.log)
{
	keyType: 2,
	key: { x:'0xb9a4b...', y:'0x7a285...' }
}

// AccountKey type: AccountKeyFail
> caver.rpc.klay.getAccountKey('0x{address in hex}').then(console.log)
{ keyType: 3, key:{} }

// AccountKey type: AccountKeyWeightedMultiSig
> caver.rpc.klay.getAccountKey('0x{address in hex}').then(console.log)
{
	keyType: 4,
	key: {
		threshold: 2,
		keys: [
			{
				weight: 1,
				key: { x: '0xae6b7...', y: '0x79ddf...' }
			},
			{
				weight: 1,
				key: { x: '0xd4256...', y: '0xfc5e7...' }
			},
			{
				weight: 1,
				key: { x: '0xd653e...', y: '0xe974e...' }
			}
		]
	}
}

// AccountKey type: AccountKeyRoleBased
> caver.rpc.klay.getAccountKey('0x{address in hex}').then(console.log)
{
	keyType: 5,
	key: [
			{
				key: { x: '0x81965...', y: '0x18242...' },
				keyType: 2
			},
			{
				key: { x: '0x73363...', y: '0xfc3e3...' },
				keyType: 2
			},
			{
				key: { x: '0x95c92...', y: '0xef783...' },
				keyType: 2
			}
	]
}
```

## caver.rpc.klay.encodeAccountKey <a id="caver-rpc-klay-encodeaccountkey"></a>

```javascript
caver.rpc.klay.encodeAccountKey(accountKey [, callback])
```

Encodes an account key using the Recursive Length Prefix (RLP) encoding scheme. Also you can use [account.getRLPEncodingAccountKey](../caver.account.md#account-getrlpencodingaccountkey) to get RLP-encoded account key.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| accountKey | object | An object defines `keyType` and `key` inside or an instance of `AccountKey` ([AccountKeyLegacy], [AccountKeyPublic], [AccountKeyFail], [AccountKeyWeightedMultiSig] or [AccountKeyRoleBased]). |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `string`

| Type | Description |
| --- | --- |
| string | A RLP-encoded account key. |

**Example**

```javascript
// AccountKey type: AccountKeyLegacy
> caver.rpc.klay.encodeAccountKey({ keyType: 1, key: {} }).then(console.log)
0x01c0

// AccountKey type: AccountKeyPublic
> caver.rpc.klay.encodeAccountKey({
		keyType: 2,
		key: {
			x: '0xdbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8',
			y: '0x906d7170ba349c86879fb8006134cbf57bda9db9214a90b607b6b4ab57fc026e',
		},
	}).then(console.log)
0x02a102dbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8

// AccountKey type: AccountKeyFail
> caver.rpc.klay.encodeAccountKey({ keyType: 3, key: {} }).then(console.log)
0x03c0

// AccountKey type: AccountKeyWeightedMultiSig
> caver.rpc.klay.encodeAccountKey({
		keyType: 4,
		key: {
			threshold: 2,
			keys: [
				{
					weight: 1,
					key: {
						x: '0xc734b50ddb229be5e929fc4aa8080ae8240a802d23d3290e5e6156ce029b110e',
						y: '0x61a443ac3ffff164d1fb3617875f07641014cf17af6b7dc38e429fe838763712',
					},
				},
				{
					weight: 1,
					key: {
						x: '0x12d45f1cc56fbd6cd8fc877ab63b5092ac77db907a8a42c41dad3e98d7c64dfb',
						y: '0x8ef355a8d524eb444eba507f236309ce08370debaa136cb91b2f445774bff842',
					},
				},
			],
		},
	}).then(console.log)
0x04f84b02f848e301a102c734b50ddb229be5e929fc4aa8080ae8240a802d23d3290e5e6156ce029b110ee301a10212d45f1cc56fbd6cd8fc877ab63b5092ac77db907a8a42c41dad3e98d7c64dfb

// AccountKey type: AccountKeyRoleBased
> caver.rpc.klay.encodeAccountKey({
		keyType: 5,
		key: [
			{
				keyType: 2,
				key: {
					x: '0xe4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512d',
					y: '0xa5735a23ce1654b14680054a993441eae7c261983a56f8e0da61280758b5919',
				},
			},
			{
				keyType: 4,
				key: {
					threshold: 2,
					keys: [
						{
							weight: 1,
							key: {
								x: '0xe4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512d',
								y: '0xa5735a23ce1654b14680054a993441eae7c261983a56f8e0da61280758b5919',
							},
						},
						{
							weight: 1,
							key: {
								x: '0x36f6355f5b532c3c1606f18fa2be7a16ae200c5159c8031dd25bfa389a4c9c06',
								y: '0x6fdf9fc87a16ac359e66d9761445d5ccbb417fb7757a3f5209d713824596a50d',
							},
						},
					],
				},
			},
			{
				keyType: 2,
				key: {
					x: '0xc8785266510368d9372badd4c7f4a94b692e82ba74e0b5e26b34558b0f081447',
					y: '0x94c27901465af0a703859ab47f8ae17e54aaba453b7cde5a6a9e4a32d45d72b2',
				},
			},
		],
	}).then(console.log)
0x05f898a302a103e4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512db84e04f84b02f848e301a103e4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512de301a10336f6355f5b532c3c160

// Use an AccountKey instance
> const accountKey = caver.account.create('0x{address in hex}', '0xf1d2e...').accountKey
> caver.rpc.klay.encodeAccountKey(accountKey).then(console.log)
0x02a102f1d2e558cfa07151534cd406b1ac5c25d99e9c1cf925328d14fd15c6fe50df27
```

## caver.rpc.klay.decodeAccountKey <a id="caver-rpc-klay-decodeaccountkey"></a>

```javascript
caver.rpc.klay.decodeAccountKey(encodedKey [, callback])
```

Decodes a RLP-encoded account key. Also you can use [caver.account.accountKey.decode](../caver.account.md#caver-account-accountkey-decode) to decode a RLP-encoded account key.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| encodedKey | string | A RLP-encoded account key. |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `object`

| Type | Description |
| --- | --- |
| object | An object defines `keyType` and `key` inside. |

**Example**

```javascript
// AccountKey type: AccountKeyLegacy
> caver.rpc.klay.decodeAccountKey('0x01c0').then(console.log)
{ keyType: 1, key: {} }

// AccountKey type: AccountKeyPublic
> caver.rpc.klay.decodeAccountKey('0x02a102dbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8').then(console.log)
{
	keyType: 2,
	key: {
		x: '0xdbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8',
		y: '0x906d7170ba349c86879fb8006134cbf57bda9db9214a90b607b6b4ab57fc026e',
	},
}

// AccountKey type: AccountKeyFail
> caver.rpc.klay.decodeAccountKey('0x03c0').then(console.log)
{ keyType: 3, key: {} }

// AccountKey type: AccountKeyWeightedMultiSig
> caver.rpc.klay.decodeAccountKey('0x04f84b02f848e301a102c734b50ddb229be5e929fc4aa8080ae8240a802d23d3290e5e6156ce029b110ee301a10212d45f1cc56fbd6cd8fc877ab63b5092ac77db907a8a42c41dad3e98d7c64dfb').then(console.log)
{
	keyType: 4,
	key: {
		threshold: 2,
		keys: [
			{
				weight: 1,
				key: {
					x: '0xc734b50ddb229be5e929fc4aa8080ae8240a802d23d3290e5e6156ce029b110e',
					y: '0x61a443ac3ffff164d1fb3617875f07641014cf17af6b7dc38e429fe838763712',
				},
			},
			{
				weight: 1,
				key: {
					x: '0x12d45f1cc56fbd6cd8fc877ab63b5092ac77db907a8a42c41dad3e98d7c64dfb',
					y: '0x8ef355a8d524eb444eba507f236309ce08370debaa136cb91b2f445774bff842',
				},
			},
		],
	},
}


// AccountKey type: AccountKeyRoleBased
> caver.rpc.klay.decodeAccountKey('0x05f898a302a103e4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512db84e04f84b02f848e301a103e4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512de301a10336f6355f5b532c3c160').then(console.log)
{
	keyType: 5,
	key: [
		{
			keyType: 2,
			key: {
				x: '0xe4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512d',
				y: '0xa5735a23ce1654b14680054a993441eae7c261983a56f8e0da61280758b5919',
			},
		},
		{
			keyType: 4,
			key: {
				threshold: 2,
				keys: [
					{
						weight: 1,
						key: {
							x: '0xe4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512d',
							y: '0xa5735a23ce1654b14680054a993441eae7c261983a56f8e0da61280758b5919',
						},
					},
					{
						weight: 1,
						key: {
							x: '0x36f6355f5b532c3c1606f18fa2be7a16ae200c5159c8031dd25bfa389a4c9c06',
							y: '0x6fdf9fc87a16ac359e66d9761445d5ccbb417fb7757a3f5209d713824596a50d',
						},
					},
				],
			},
		},
		{
			keyType: 2,
			key: {
				x: '0xc8785266510368d9372badd4c7f4a94b692e82ba74e0b5e26b34558b0f081447',
				y: '0x94c27901465af0a703859ab47f8ae17e54aaba453b7cde5a6a9e4a32d45d72b2',
			},
		},
	],
}
```

## caver.rpc.klay.getBalance <a id="caver-rpc-klay-getbalance"></a>

```javascript
caver.rpc.klay.getBalance(address [, blockNumber] [, callback])
```

Returns the balance of the account of given address in Klaytn.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| address | string | The address of the account for which you want to get balance. |
| blockNumber | number &#124; string | (optional) A block number, or the string `latest`, `earliest` or `pending`. If omitted, `latest` will be used. |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `string`

| Type | Description |
| --- | --- |
| string | The current balance for the given address in peb. |

**Example**

```javascript
> caver.rpc.klay.getBalance('0x{address in hex}').then(console.log)
0xde0b6b3a7640000
```

## caver.rpc.klay.getCode <a id="caver-rpc-klay-getcode"></a>

```javascript
caver.rpc.klay.getCode(address [, blockNumber] [, callback])
```

Returns code at a given address.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| address | string | The address to get the code from. |
| blockNumber | number &#124; string | (optional) A block number, or the string `latest`, `earliest` or `pending`. If omitted, `latest` will be used. |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `string`

| Type | Description |
| --- | --- |
| string | The code from the given address. |

**Example**

```javascript
> caver.rpc.klay.getCode('0x{address in hex}').then(console.log)
0x60806...
```

## caver.rpc.klay.getTransactionCount <a id="caver-rpc-klay-gettransactioncount"></a>

```javascript
caver.rpc.klay.getTransactionCount(address [, blockNumber] [, callback])
```

Returns the total number of transactions sent from an address.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| address | string | The address to get the number of transactions from. |
| blockNumber | number &#124; string | (optional) A block number, or the string `latest`, `earliest` or `pending`. If omitted, `latest` will be used. |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `string`

| Type | Description |
| --- | --- |
| string | The number of transactions sent from the given address in hex. |

**Example**

```javascript
> caver.rpc.klay.getTransactionCount('0x{address in hex}').then(console.log)
0x5f
```

## caver.rpc.klay.isContractAccount <a id="caver-rpc-klay-iscontractaccount"></a>

```javascript
caver.rpc.klay.isContractAccount(address [, blockNumber] [, callback])
```

Returns `true` if an input account has a non-empty codeHash at the time of a specific block number. It returns `false` if the account is an EOA or a smart contract account which doesn't have codeHash. Please refer to [Smart Contract Account](../../../../../klaytn/design/accounts.md#smart-contract-accounts-scas) for more details.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| address | string | The address you want to check for isContractAccount. |
| blockNumber | number &#124; string | (optional) A block number, or the string `latest`, `earliest` or `pending`. If omitted, `latest` will be used. |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `boolean`

| Type | Description |
| --- | --- |
| boolean | true means the input parameter is an existing smart contract address. |

**Example**

```javascript
> caver.rpc.klay.isContractAccount('0x{address in hex}').then(console.log)
false

> caver.rpc.klay.isContractAccount('0x{address in hex}').then(console.log)
true
```

## caver.rpc.klay.sign <a id="caver-rpc-klay-sign"></a>

```javascript
caver.rpc.klay.sign(message, address [, blockNumber] [, callback])
```

Generates signed data specific to the Klaytn. Refer to [Klaytn Platform API - klay_sign](../../../../json-rpc/api-references/klay/account.md#klay_sign) to know how the signature is generated.

**NOTE**: This API provides the function to sign a message using an [imported account](../../../../json-rpc/api-references/personal.md#personal_importrawkey) in your Klaytn node. The imported account in your node must be [unlocked](../../../../json-rpc/api-references/personal.md#personal_unlockaccount) to sign the message. To sign a transaction with imported account in your Klaytn node, use [caver.rpc.klay.signTransaction](#caver-rpc-klay-signtransaction).

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| message | String | Message to sign. |
| address | String | The address of the imported account to sign the message. |
| blockNumber | number &#124; string | (optional) A block number, or the string `latest`, `earliest` or `pending`. If omitted, `latest` will be used. |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `string`

| Type | Description |
| --- | --- |
| string | The signature made from an imported account. |

**Example**

```javascript
> caver.rpc.klay.sign('0xdeadbeaf', '0x{address in hex}').then(console.log)
0x1066e052c4be821daa4d0a0cd1e9e75ccb200bb4001c2e38853ba41b712a5a226da2acd67c86a13b266e0d75d0a6e7d1551c8924af413267615a5948617c746c1c
```

## caver.rpc.klay.getAccounts <a id="caver-rpc-klay-getaccounts"></a>

```javascript
caver.rpc.klay.getAccounts([callback])
```

Returns a list of addresses owned by the Klaytn Node.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `Array`

| Type | Description |
| --- | --- |
| Array | An array of addresses owned by the Klaytn Node. |

**Example**

```javascript
> caver.rpc.klay.getAccounts().then(console.log)
[
	'0xe1531e916857d1b3a7db92f9187b96a7b43813bf',
	'0x75331c25535052157ff5110ba7d0cf940d3a9ca6'
]
```

## caver.rpc.klay.getBlockNumber <a id="caver-rpc-klay-getblocknumber"></a>

```javascript
caver.rpc.klay.getBlockNumber([callback])
```

Returns the number of the most recent block.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `string`

| Type | Description |
| --- | --- |
| string | The number of the most recent block in hex. |

**Example**

```javascript
> caver.rpc.klay.getBlockNumber().then(console.log)
0x5d39
```

## caver.rpc.klay.getBlockByNumber <a id="caver-rpc-klay-getblockbynumber"></a>

```javascript
caver.rpc.klay.getBlockByNumber(blockNumber [, returnTransactionObjects] [, callback])
```

Returns information about a block by block number. This API works only on RPC call, not on Javascript console.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| blockNumber | number &#124; string | The block number or the block which is tagged with a string (`genesis`, `latest` or `pending`). |
| returnTransactionObjects | boolean | (optional, default `false`) If `true`, the returned block will contain all transactions as objects, and if `false`, it will only contain the transaction hashes. |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `object`

| Type | Description |
| --- | --- |
| string | A block object. For detailed description of return value, please refer to [caver.rpc.klay.getBlockByHash](#caver-rpc-klay-getblockbyhash). |

**Example**

```javascript
> caver.rpc.klay.getBlockByNumber(1).then(console.log)
{
	blockscore: '0x1',
	extraData: '0xd8830...',
	gasUsed: '0x0',
	governanceData: '0x',
	hash: '0x58482921af951cf42a069436ac9338de50fd963bdbea40e396f416f9ac96a08b',
	logsBloom: '0x00000...',
	number: '0x1',
	parentHash: '0x6b7c0a49f445d39b6d7dc9ba5b593b326f3a953e75ff1fcf64b9a5fa51c2725b',
	receiptsRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
	reward: '0xddc2002b729676dfd906484d35bb02a8634d7040',
	size: '0x285',
	stateRoot: '0xb88b6110e6f73b732714bb346e6ff24beb480c0dc901a55be24e38ad1c6d5fa9',
	timestamp: '0x5ee7fe9f',
	timestampFoS: '0xd',
	totalBlockScore: '0x2',
	transactions: [],
	transactionsRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
	voteData: '0x'
}
```

## caver.rpc.klay.getBlockByHash <a id="caver-rpc-klay-getblockbyhash"></a>

```javascript
caver.rpc.klay.getBlockByHash(blockHash [, returnTransactionObjects] [, callback])
```

Returns the number of most recent block.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| blockHash | string | The block hash. |
| returnTransactionObjects | boolean | (optional, default `false`) If `true`, the returned block will contain all transactions as objects, and if `false`, it will only contain the transaction hashes. |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `object` - An object includes block:

| Name | Type | Description |
| --- | --- | --- |
| blockScore | string | Former difficulty. Always 1 in the BFT consensus engine. |
| extraData | string | The "extra data" field of this block. |
| gasUsed | string | The gas in total that was used by all transactions in this block. |
| governanceData | string | RLP encoded governance configuration |
| hash | string | Hash of the block. `null` when it is a pending block. |
| logsBloom | string | The bloom filter for the logs of the block. `null` when it is a pending block. |
| number | string | The block number. `null` when it is a pending block. |
| parentHash | string | Hash of the parent block. |
| receiptsRoot | string | The root of the receipts trie of the block. |
| reward | string | The address of the beneficiary to whom the block rewards were given. |
| size | string | Integer the size of this block in bytes. |
| stateRoot | string | The root of the final state trie of the block. |
| timestamp | string | The unix timestamp for when the block was collated. |
| timestampFoS | string | The fraction of a second of the timestamp for when the block was collated. |
| totalBlockScore | string | Integer of the total blockScore of the chain until this block. |
| transactions | Array | Array of transaction objects, or 32-byte transaction hashes depending on the `returnTransactionObjects` parameter. |
| transactionsRoot | string | The root of the transaction trie of the block. |
| voteData | string | RLP encoded governance vote of the proposer. |

**Example**

```javascript
> caver.rpc.klay.getBlockByHash('0x58482921af951cf42a069436ac9338de50fd963bdbea40e396f416f9ac96a08b').then(console.log)
{
	blockscore: '0x1',
	extraData: '0xd8830...',
	gasUsed: '0x0',
	governanceData: '0x',
	hash: '0x58482921af951cf42a069436ac9338de50fd963bdbea40e396f416f9ac96a08b',
	logsBloom: '0x00000...',
	number: '0x1',
	parentHash: '0x6b7c0a49f445d39b6d7dc9ba5b593b326f3a953e75ff1fcf64b9a5fa51c2725b',
	receiptsRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
	reward: '0xddc2002b729676dfd906484d35bb02a8634d7040',
	size: '0x285',
	stateRoot: '0xb88b6110e6f73b732714bb346e6ff24beb480c0dc901a55be24e38ad1c6d5fa9',
	timestamp: '0x5ee7fe9f',
	timestampFoS: '0xd',
	totalBlockScore: '0x2',
	transactions: [],
	transactionsRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
	voteData: '0x'
}
```

## caver.rpc.klay.getBlockReceipts <a id="caver-rpc-klay-getblockreceipts"></a>

```javascript
caver.rpc.klay.getBlockReceipts(blockHash [, callback])
```

Returns receipts included in a block identified by block hash.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| blockHash | string | The block hash. |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `Array`

| Type | Description |
| --- | --- |
| Array | The transaction receipts included in a block. If the target block contains no transaction, an empty array `[]` is returned. For detailed description of transaction receipt, please refer to [caver.rpc.klay.getTransactionReceipt](#caver-rpc-klay-gettransactionreceipt).|

**Example**

```javascript
> caver.rpc.klay.getBlockReceipts('0x4584bea6b8b2abe7f024d1e63dd0571cfd28cd5157b4f6cb2ac4160a7b0057e0').then(console.log)
[ 
	{
		blockHash: '0x4584bea6b8b2abe7f024d1e63dd0571cfd28cd5157b4f6cb2ac4160a7b0057e0',
		blockNumber: '0x5301',
		contractAddress: null,
		from: '0xddc2002b729676dfd906484d35bb02a8634d7040',
		gas: '0x61a8',
		gasPrice: '0x5d21dba00',
		gasUsed: '0x5208',
		logs: [],
		logsBloom: '0x00000...',
		nonce: '0x5e',
		senderTxHash: '0x413f080a498ae3973490c2f80e75e6a492cfcdac8be8051220bb7a964768d28c',
		signatures: [
			{ 
				V: '0x4e44',
				R: '0x98583ffa8d9a6d5f9e60e4daebb33f18e8ad4d32653c4a2fa7f12ce025af763d',
				S: '0x9b9e5257293e3b986842b6a203dd16ce46f16ed42dd3e9592fcaab9ea2696cb'
			}	
		],
		status: '0x1',
		to: '0xc0aabc441129991dd3a9363a9a43b745527ea4e7',
		transactionHash: '0x413f080a498ae3973490c2f80e75e6a492cfcdac8be8051220bb7a964768d28c',
		transactionIndex: '0x0',
		type: 'TxTypeValueTransfer',
		typeInt: 8,
		value: '0xde0b6b3a7640000'
	}
]
```

## caver.rpc.klay.getBlockTransactionCountByNumber <a id="caver-rpc-klay-getblocktransactionCountbynumber"></a>

```javascript
caver.rpc.klay.getBlockTransactionCountByNumber(blockNumber [, callback])
```

Returns the number of transactions in a block matching the given block number.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| blockNumber | number &#124; string | The block number or the blcock tag string (`genesis`, `latest` or `pending`). |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `string`

| Type | Description |
| --- | --- |
| string | The number of transactions in the given block in hex.|

**Example**

```javascript
> caver.rpc.klay.getBlockTransactionCountByNumber(21249).then(console.log)
0x1
```

## caver.rpc.klay.getBlockTransactionCountByHash <a id="caver-rpc-klay-getblocktransactionCountbyhash"></a>

```javascript
caver.rpc.klay.getBlockTransactionCountByHash(blockHash [, callback])
```

Returns the number of transactions in a block matching the given block hash.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| blockHash | string | The block hash. |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `string`

| Type | Description |
| --- | --- |
| string | The number of transactions in the given block in hex.|

**Example**

```javascript
> caver.rpc.klay.getBlockTransactionCountByHash('0x4584bea6b8b2abe7f024d1e63dd0571cfd28cd5157b4f6cb2ac4160a7b0057e0').then(console.log)
0x1
```

## caver.rpc.klay.getBlockWithConsensusInfoByNumber <a id="caver-rpc-klay-getblockwithconsensusinfobynumber"></a>

```javascript
caver.rpc.klay.getBlockWithConsensusInfoByNumber(blockNumber [, callback])
```

Returns a block with consensus information matched by the given block number.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| blockNumber | number &#124; string | The block number or the blcock tag string (`genesis`, `latest` or `pending`). |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `object`

| Type | Description |
| --- | --- |
| string | An object includes block with consensus information. For detailed description of return value, please refer to [caver.rpc.klay.getBlockWithConsensusInfoByHash](#caver-rpc-klay-getblockwithconsensusinfobyhash). |

**Example**

```javascript
> caver.rpc.klay.getBlockWithConsensusInfoByNumber(21249).then(console.log)
{
	blockscore: '0x1',
	committee: ['0xddc2002b729676dfd906484d35bb02a8634d7040', '0xa1d2665c4c9f77410844dd4c22ed11aabbd4033e'],
	extraData: '0xd8830...',
	gasUsed: '0x5208',
	governanceData: '0x',
	hash: '0x4584bea6b8b2abe7f024d1e63dd0571cfd28cd5157b4f6cb2ac4160a7b0057e0',
	logsBloom: '0x00000...',
	number: '0x5301',
	parentHash: '0x024f05c0e7428e33331104bedbfc453d481ce6a2f5e57f7fd68a4391ba6c2619',
	proposer: '0xa1d2665c4c9f77410844dd4c22ed11aabbd4033e',
	receiptsRoot: '0xe38e5532717f12f769b07ea016014bd39b74fb72def4de8442114cc2728609f2',
	reward: '0xb74837f495060f3f794dcae8fa3e0c5d3cf99d9f',
	size: '0x313',
	stateRoot: '0x9964b2d8f23da7383a32ec33c9700a76ebf4a36315c9067c2fef7568d97e1d55',
	timestamp: '0x5ee851dd',
	timestampFoS: '0x0',
	totalBlockScore: '0x5302',
	transactions: [
		{
			blockHash: '0x4584bea6b8b2abe7f024d1e63dd0571cfd28cd5157b4f6cb2ac4160a7b0057e0',
			blockNumber: '0x5301',
			contractAddress: null,
			from: '0xddc2002b729676dfd906484d35bb02a8634d7040',
			gas: '0x61a8',
			gasPrice: '0x5d21dba00',
			gasUsed: '0x5208',
			logs: [],
			logsBloom: '0x00000...',
			nonce: '0x5e',
			senderTxHash: '0x413f080a498ae3973490c2f80e75e6a492cfcdac8be8051220bb7a964768d28c',
			signatures: {
				V: '0x4e44',
				R: '0x98583ffa8d9a6d5f9e60e4daebb33f18e8ad4d32653c4a2fa7f12ce025af763d',
				S: '0x9b9e5257293e3b986842b6a203dd16ce46f16ed42dd3e9592fcaab9ea2696cb'
			},
			status: '0x1',
			to: '0xc0aabc441129991dd3a9363a9a43b745527ea4e7',
			transactionHash: '0x413f080a498ae3973490c2f80e75e6a492cfcdac8be8051220bb7a964768d28c',
			transactionIndex: '0x0',
			type: 'TxTypeValueTransfer',
			typeInt: 8,
			value: '0xde0b6b3a7640000',
		},
	],
	transactionsRoot: '0x413f080a498ae3973490c2f80e75e6a492cfcdac8be8051220bb7a964768d28c',
	voteData: '0x',
}
```

## caver.rpc.klay.getBlockWithConsensusInfoByHash <a id="caver-rpc-klay-getblockwithconsensusinfobyhash"></a>

```javascript
caver.rpc.klay.getBlockWithConsensusInfoByHash(blockHash [, callback])
```

Returns a block with consensus information matched by the given hash.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| blockHash | string | The block hash. |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `object` - A block object with consensus information (a proposer and a list of committee members), or null when no block was found:

| Name | Type | Description |
| --- | --- | --- |
| blockScore | string | Former difficulty. Always 1 in the BFT consensus engine |
| committee | Array | Array of addresses of committee members of this block. The committee is a subset of validators participated in the consensus protocol for this block. |
| extraData | string | The "extra data" field of this block. |
| gasUsed | string | The gas in total that was used by all transactions in this block. |
| governanceData | string | RLP encoded governance configuration |
| hash | string | Hash of the block. `null` when it is a pending block. |
| logsBloom | string | The bloom filter for the logs of the block. ``null`` when it is a pending block. |
| number | string | The block number. `null` when it is a pending block. |
| parentHash | string | Hash of the parent block. |
| proposer | string | The address of the block proposer. |
| receiptsRoot | string | The root of the receipts trie of the block. |
| reward | string | The address of the beneficiary to whom the block rewards were given. |
| size | string | Integer the size of this block in bytes. |
| stateRoot | string | The root of the final state trie of the block. |
| timestamp | string | The unix timestamp for when the block was collated. |
| timestampFoS | string | The fraction of a second of the timestamp for when the block was collated. |
| totalBlockScore | string | Integer of the total blockScore of the chain until this block. |
| transactions | Array | Array of transaction objects. |
| transactionsRoot | string | The root of the transaction trie of the block. |
| voteData | string | RLP encoded governance vote of the proposer |

**Example**

```javascript
> caver.rpc.klay.getBlockWithConsensusInfoByHash('0x4584bea6b8b2abe7f024d1e63dd0571cfd28cd5157b4f6cb2ac4160a7b0057e0').then(console.log)
{
	blockscore: '0x1',
	committee: ['0xddc2002b729676dfd906484d35bb02a8634d7040', '0xa1d2665c4c9f77410844dd4c22ed11aabbd4033e'],
	extraData: '0xd8830...',
	gasUsed: '0x5208',
	governanceData: '0x',
	hash: '0x4584bea6b8b2abe7f024d1e63dd0571cfd28cd5157b4f6cb2ac4160a7b0057e0',
	logsBloom: '0x00000...',
	number: '0x5301',
	parentHash: '0x024f05c0e7428e33331104bedbfc453d481ce6a2f5e57f7fd68a4391ba6c2619',
	proposer: '0xa1d2665c4c9f77410844dd4c22ed11aabbd4033e',
	receiptsRoot: '0xe38e5532717f12f769b07ea016014bd39b74fb72def4de8442114cc2728609f2',
	reward: '0xb74837f495060f3f794dcae8fa3e0c5d3cf99d9f',
	size: '0x313',
	stateRoot: '0x9964b2d8f23da7383a32ec33c9700a76ebf4a36315c9067c2fef7568d97e1d55',
	timestamp: '0x5ee851dd',
	timestampFoS: '0x0',
	totalBlockScore: '0x5302',
	transactions: [
		{
			blockHash: '0x4584bea6b8b2abe7f024d1e63dd0571cfd28cd5157b4f6cb2ac4160a7b0057e0',
			blockNumber: '0x5301',
			contractAddress: null,
			from: '0xddc2002b729676dfd906484d35bb02a8634d7040',
			gas: '0x61a8',
			gasPrice: '0x5d21dba00',
			gasUsed: '0x5208',
			logs: [],
			logsBloom: '0x00000...',
			nonce: '0x5e',
			senderTxHash: '0x413f080a498ae3973490c2f80e75e6a492cfcdac8be8051220bb7a964768d28c',
			signatures: {
				V: '0x4e44',
				R: '0x98583ffa8d9a6d5f9e60e4daebb33f18e8ad4d32653c4a2fa7f12ce025af763d',
				S: '0x9b9e5257293e3b986842b6a203dd16ce46f16ed42dd3e9592fcaab9ea2696cb'
			},
			status: '0x1',
			to: '0xc0aabc441129991dd3a9363a9a43b745527ea4e7',
			transactionHash: '0x413f080a498ae3973490c2f80e75e6a492cfcdac8be8051220bb7a964768d28c',
			transactionIndex: '0x0',
			type: 'TxTypeValueTransfer',
			typeInt: 8,
			value: '0xde0b6b3a7640000',
		},
	],
	transactionsRoot: '0x413f080a498ae3973490c2f80e75e6a492cfcdac8be8051220bb7a964768d28c',
	voteData: '0x',
}
```

## caver.rpc.klay.getCommittee <a id="caver-rpc-klay-getcommittee"></a>

```javascript
caver.rpc.klay.getCommittee([blockNumber] [, callback])
```

Returns a list of all validators in the committee at the specified block.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| blockNumber | number &#124; string | (optional) A block number, or the string `latest`, `earliest` or `pending`. If omitted, `latest` will be used. |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `Array`

| Type | Description |
| --- | --- |
| Array | Addresses of all validators in the committee at the given block. |

**Example**

```javascript
> caver.rpc.klay.getCommittee().then(console.log)
[
	'0xddc2002b729676dfd906484d35bb02a8634d7040',
	'0xa1d2665c4c9f77410844dd4c22ed11aabbd4033e'
]
```

## caver.rpc.klay.getCommitteeSize <a id="caver-rpc-klay-getcommitteesize"></a>

```javascript
caver.rpc.klay.getCommitteeSize([blockNumber] [, callback])
```

Returns the size of the committee at the specified block.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| blockNumber | number &#124; string | (optional) A block number, or the string `latest`, `earliest` or `pending`. If omitted, `latest` will be used. |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `number`

| Type | Description |
| --- | --- |
| number | The size of the committee at the given block. |

**Example**

```javascript
> caver.rpc.klay.getCommitteeSize().then(console.log)
2
```

## caver.rpc.klay.getCouncil <a id="caver-rpc-klay-getcouncil"></a>

```javascript
caver.rpc.klay.getCouncil([blockNumber] [, callback])
```

Returns a list of all validators of the council at the specified block.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| blockNumber | number &#124; string | (optional) A block number, or the string `latest`, `earliest` or `pending`. If omitted, `latest` will be used. |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `Array`

| Type | Description |
| --- | --- |
| Array | An array of validator addresses of the council at the given block, or null when no council was found. |

**Example**

```javascript
> caver.rpc.klay.getCouncil().then(console.log)
[
	'0xa1d2665c4c9f77410844dd4c22ed11aabbd4033e',
	'0xddc2002b729676dfd906484d35bb02a8634d7040'
]
```

## caver.rpc.klay.getCouncilSize <a id="caver-rpc-klay-getcouncilsize"></a>

```javascript
caver.rpc.klay.getCouncilSize([blockNumber] [, callback])
```

Returns the size of the council at the specified block.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| blockNumber | number &#124; string | (optional) A block number, or the string `latest`, `earliest` or `pending`. If omitted, `latest` will be used. |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `number`

| Type | Description |
| --- | --- |
| number | The size of the council at the given block. |

**Example**

```javascript
> caver.rpc.klay.getCouncilSize().then(console.log)
2
```

## caver.rpc.klay.getStorageAt <a id="caver-rpc-klay-getstorageat"></a>

```javascript
caver.rpc.klay.getStorageAt(address, position [, blockNumber] [, callback])
```

Returns the value from a storage position at a given address.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| address | string | The address to get the storage from. |
| position | number | The index position of the storage. For more information on `calculating the position`, refer to [klay_getStorageAt](../../../../json-rpc/api-references/klay/block.md#klay_getstorageat). |
| blockNumber | number &#124; string | (optional) A block number, or the string `latest`, `earliest` or `pending`. If omitted, `latest` will be used. |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `string`

| Type | Description |
| --- | --- |
| string | The value at this storage position. |

**Example**

```javascript
> caver.rpc.klay.getStorageAt('0x407d73d8a49eeb85d32cf465507dd71d507100c1', 0).then(console.log)
0x033456732123ffff2342342dd12342434324234234fd234fd23fd4f23d4234
```

## caver.rpc.klay.isSyncing <a id="caver-rpc-klay-issyncing"></a>

```javascript
caver.rpc.klay.isSyncing([callback])
```

Returns an object with data about the sync status or false.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `object|boolean` - `false` if the Klaytn Node is not syncing, otherwise a sync object is returned:

| Name | Type | Description |
| --- | --- | --- |
| startingBlock | string | The block number in hex where the sync started |
| currentBlock | string | The block number in hex where the node currently synced to. |
| highestBlock | string | The estimated block number in hex to sync to. |
| knownStates | string | The estimated states in hex to download. |
| pulledStates | string | The already downloaded states in hex. |

**Example**

```javascript
> caver.rpc.klay.isSyncing().then(console.log)
{
		startingBlock: 100,
		currentBlock: 312,
		highestBlock: 512,
		knownStates: 234566,
		pulledStates: 123455
}

> caver.rpc.klay.isSyncing().then(console.log)
false
```

## caver.rpc.klay.call <a id="caver-rpc-klay-call"></a>

```javascript
caver.rpc.klay.call(callObject [, blockNumber] [, callback])
```

Executes a new message call immediately without sending a transaction on the block chain. It returns data or an error object of JSON RPC if error occurs.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| callObject | object | The transaction call object. See the next table for the object's properties. |
| blockNumber | number &#124; string | (optional) A block number, or the string `latest`, `earliest` or `pending`. If omitted, `latest` will be used. |s
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

`callObject` has the following properties:

| Name | Type | Description |
| --- | --- | --- |
| to | string | The address the transaction is directed to. |
| input | string | (optional) The hash of the method signature and encoded parameters. You can use [caver.abi.encodeFunctionCall](../caver.abi.md#encodefunctioncall). |
| from | string | (optional) The address the transaction is sent from. |
| gas | string | (optional) The gas provided for the transaction execution. `klay_call` consumes zero gas, but this parameter may be needed by some executions. |
| gasPrice | string | (optional) The gasPrice used for each paid gas. |
| value | string | (optional) The value sent with this transaction in `peb`. |

**Return Value**

`Promise` returns `string`

| Type | Description |
| --- | --- |
| string | The returned data of the call. *e.g.*, a the return value of a smart contract function. |

**Example**

```javascript
> caver.rpc.klay.call({ 
		to: '0x5481a10a47C74f800BDF4955BD77550881bde91C', // contract address
		input: '0x70a08231000000000000000000000000ddc2002b729676dfd906484d35bb02a8634d7040'
	}).then(console.log)
0x0000000000000000000000000000000000000000000000000de0b6b3a7640000
```

## caver.rpc.klay.estimateGas <a id="caver-rpc-klay-estimategas"></a>

```javascript
caver.rpc.klay.estimateGas(callObject [, blockNumber] [, callback])
```

Generates and return an estimate of how much `gas` is necessary to allow the transaction to complete. The transaction from this method will not be added to the blockchain. 

**Parameters**

See [caver.rpc.klay.call](#caver-rpc-klay-call) parameters, expect that all properties are optional.

**Return Value**

`Promise` returns `string`

| Type | Description |
| --- | --- |
| string | The returned data of the call. *e.g.*, a the return value of a smart contract function. |

**Example**

```javascript
> caver.rpc.klay.estimateGas({ 
		to: '0x5481a10a47C74f800BDF4955BD77550881bde91C', // contract address
		input: '0x095ea7b300000000000000000000000028e4e077686d1aeaf54a1313ff4841181056fe32000000000000000000000000000000000000000000000000000000000000000a'
	}).then(console.log)
0xb2a0
```

## caver.rpc.klay.estimateComputationCost <a id="caver-rpc-klay-estimatecomputationcost"></a>

```javascript
caver.rpc.klay.estimateComputationCost(callObject [, blockNumber] [, callback])
```

Generates and returns an estimate of how much `computation cost` will be spent to execute the transaction. Klaytn limits the computation cost of a transaction to `100000000` currently not to take too much time by a single transaction. The transaction will not be added to the blockchain like [caver.rpc.klay.estimateGas](#caver-rpc-klay-estimategas).

**Parameters**

See [caver.rpc.klay.call](#caver-rpc-klay-call) parameters, expect that all properties are optional.

**Return Value**

`Promise` returns `string`

| Type | Description |
| --- | --- |
| string | The amount of computation cost used. |

**Example**

```javascript
> caver.rpc.klay.estimateComputationCost({ 
		to: '0x5481a10a47C74f800BDF4955BD77550881bde91C', // contract address
		input: '0x095ea7b300000000000000000000000028e4e077686d1aeaf54a1313ff4841181056fe32000000000000000000000000000000000000000000000000000000000000000a'
	}).then(console.log)
0xd761
```

## caver.rpc.klay.getTransactionByBlockHashAndIndex <a id="caver-rpc-klay-gettransactionbyblockhashandindex"></a>

```javascript
caver.rpc.klay.getTransactionByBlockHashAndIndex(blockHash, index [, callback])
```

Returns information about a transaction by `block hash` and `transaction index` position.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| blockHash | string | The block hash. |
| index | number | The transaction index position inside the block. |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `object`

| Type | Description |
| --- | --- |
| object | A transaction object, see [caver.rpc.klay.getTransactionByHash] for more detail. |

**Example**

```javascript
> caver.rpc.klay.getTransactionByBlockHashAndIndex('0xc9f643c0ebe84932c10695cbc9eb75228af09516931b58952de3e12c21a50576', 0).then(console.log)
{
	blockHash: '0xc9f643c0ebe84932c10695cbc9eb75228af09516931b58952de3e12c21a50576',
	blockNumber: '0xb7',
	from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
	gas: '0x61a8',
	gasPrice: '0x5d21dba00',
	hash: '0xdb63fb385e51fbfd84a98873c994aef622c5f1c72c5760a9ff95c55bbfd99898',
	nonce: '0x0',
	senderTxHash: '0xdb63fb385e51fbfd84a98873c994aef622c5f1c72c5760a9ff95c55bbfd99898',
	signatures: [ { V: '0x4e44', R: '0xf1a9a...', S: '0x9116c...' } ],
	to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
	transactionIndex: '0x0',
	type: 'TxTypeValueTransfer',
	typeInt: 8,
	value: '0x8ac7230489e80000'
}
```

## caver.rpc.klay.getTransactionByBlockNumberAndIndex <a id="caver-rpc-klay-gettransactionbyblocknumberandindex"></a>

```javascript
caver.rpc.klay.getTransactionByBlockNumberAndIndex(blockNumber, index [, callback])
```

Returns information about a transaction by `block number` and `transaction index` position.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| blockNumber | number &#124; string | The block number or the blcock tag string (`genesis`, `latest` or `pending`). |
| index | number | The transaction index position inside the block. |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `object`

| Type | Description |
| --- | --- |
| object | A transaction object, see [caver.rpc.klay.getTransactionByHash] for more detail. |

**Example**

```javascript
> caver.rpc.klay.getTransactionByBlockNumberAndIndex(183, 0).then(console.log)
{
	blockHash: '0xc9f643c0ebe84932c10695cbc9eb75228af09516931b58952de3e12c21a50576',
	blockNumber: '0xb7',
	from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
	gas: '0x61a8',
	gasPrice: '0x5d21dba00',
	hash: '0xdb63fb385e51fbfd84a98873c994aef622c5f1c72c5760a9ff95c55bbfd99898',
	nonce: '0x0',
	senderTxHash: '0xdb63fb385e51fbfd84a98873c994aef622c5f1c72c5760a9ff95c55bbfd99898',
	signatures: [ { V: '0x4e44', R: '0xf1a9a...', S: '0x9116c...' } ],
	to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
	transactionIndex: '0x0',
	type: 'TxTypeValueTransfer',
	typeInt: 8,
	value: '0x8ac7230489e80000'
}
```

## caver.rpc.klay.getTransactionByHash <a id="caver-rpc-klay-gettransactionbyhash"></a>

```javascript
caver.rpc.klay.getTransactionByHash(transactionHash [, callback])
```

Returns the information about a transaction requested by transaction hash.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| transactionHash | string | The transaction hash. |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `object` - A transaction object, or `null` when no transaction was found:

| Name | Type | Description |
| --- | --- | --- |
| blockHash | string | Hash of the block where this transaction was in. |
| blockNumber | string | Block number where this transaction was in. |
| codeFormat | string | (optional) The code format of smart contract code. |
| feePayer | string | (optional) Address of the fee payer. |
| feePayerSignatures | Array | (optional) An array of fee payer's signature objects. A signature object contains three fields (V, R, and S). V contains ECDSA recovery id. R contains ECDSA signature r while S contains ECDSA signature s. |
| feeRatio | string | (optional) Fee ratio of the fee payer. If it is 30, 30% of the fee will be paid by the fee payer. 70% will be paid by the sender. |
| from | string | Address of the sender. |
| gas | string | Gas provided by the sender. |
| gasPrice | string | Gas price provided by the sender in peb. |
| hash | string | Hash of the transaction. |
| humanReadable | Boolean | (optional) `true` if the address is humanReadable, `false` if the address is not humanReadable. |
| key | string | (optional) The RLP-encoded AccountKey used to update AccountKey of an Klaytn account. See [AccountKey] for more details. |
| input | string | (optional) The data sent along with the transaction. |
| nonce | string | The number of transactions made by the sender prior to this one. |
| senderTxHash | string | (optional) Hash of the tx without the fee payer's address and signature. This value is always the same as the value of `hash` for non fee-delegated transactions. |
| signatures | Array | An array of signature objects. A signature object contains three fields (V, R, and S). V contains ECDSA recovery id. R contains ECDSA signature r while S contains ECDSA signature s. |
| to | string | Address of the receiver. `null` when it is a contract deploying transaction. |
| transactionIndex | string | Integer of the transaction index position in the block.. |
| type | string | A string representing the type of the transaction. |
| typeInt | number | An integer representing the type of the transaction. |
| value | string | Value transferred in peb. |

If the transaction is in `pending` status that has not yet been processed, default values for `blockHash`, `blockNumber` and `trasnactionIndex` are returned. See the example below.

**Example**

```javascript
> caver.rpc.klay.getTransactionByHash('0x991d2e63b91104264d2886fb2ae2ccdf90551377af4e334b313abe123a5406aa').then(console.log)
{
	blockHash: '0xb273976bad5f3d40ba46839c020f61b1629e2362d351e3c9cb32268afc7cb477',
	blockNumber: '0x74c',
	codeFormat: '0x0',
	from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
	gas: '0x3d0900',
	gasPrice: '0x5d21dba00',
	hash: '0x991d2e63b91104264d2886fb2ae2ccdf90551377af4e334b313abe123a5406aa',
	humanReadable: false,
	input: '0x60806...',
	nonce: '0xa',
	senderTxHash: '0x991d2e63b91104264d2886fb2ae2ccdf90551377af4e334b313abe123a5406aa',
	signatures: [ { V: '0x4e44', R: '0xe4ac3...', S: '0x5374f...' } ],
	to: null,
	transactionIndex: '0x0',
	type: 'TxTypeSmartContractDeploy',
	typeInt: 40,
	value: '0x0',
}

// When transaction is in pending, default values for `blockHash`, `blockNumber` and `trasnactionIndex` are returned.
> caver.rpc.klay.getTransactionByHash('0x72e3838a42fbe75724a685ca03e50ff25ebc564e32d06dadf41be2190e5b11d1').then(console.log)
{
	blockHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
	blockNumber: '0x0',
	from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
	gas: '0x61a8',
	gasPrice: '0x5d21dba00',
	hash: '0x72e3838a42fbe75724a685ca03e50ff25ebc564e32d06dadf41be2190e5b11d1',
	nonce: '0xd',
	senderTxHash: '0x72e3838a42fbe75724a685ca03e50ff25ebc564e32d06dadf41be2190e5b11d1',
	signatures: [ { V: '0x4e44', R: '0x73634...', S: '0x479be...' } ],
	to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
	transactionIndex: '0x0',
	type: 'TxTypeValueTransfer',
	typeInt: 8,
	value: '0x8ac7230489e80000',
}
```

## caver.rpc.klay.getTransactionBySenderTxHash <a id="caver-rpc-klay-gettransactionbysendertxhash"></a>

```javascript
caver.rpc.klay.getTransactionBySenderTxHash(senderTxHash [, callback])
```

Returns the information about a transaction requested by sender transaction hash.

Please note that this API returns correct result only if the indexing feature is enabled in the node by `--sendertxhashindexing`. Use [caver.rpc.klay.isSenderTxHashIndexingEnabled](#caver-rpc-klay-issendertxhashindexingenabled) to check if the indexing feature is enabled or not.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| senderTxHash | string | The sender transaction hash. See [SenderTxHash] for more detail. |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `object`

| Type | Description |
| --- | --- |
| object | A transaction object, see [caver.rpc.klay.getTransactionByHash] for more details. |

**Example**

```javascript
> caver.rpc.klay.getTransactionBySenderTxHash('0x991d2e63b91104264d2886fb2ae2ccdf90551377af4e334b313abe123a5406aa').then(console.log)
{
	blockHash: '0xb273976bad5f3d40ba46839c020f61b1629e2362d351e3c9cb32268afc7cb477',
	blockNumber: '0x74c',
	codeFormat: '0x0',
	from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
	gas: '0x3d0900',
	gasPrice: '0x5d21dba00',
	hash: '0x991d2e63b91104264d2886fb2ae2ccdf90551377af4e334b313abe123a5406aa',
	humanReadable: false,
	input: '0x60806...',
	nonce: '0xa',
	senderTxHash: '0x991d2e63b91104264d2886fb2ae2ccdf90551377af4e334b313abe123a5406aa',
	signatures: [ { V: '0x4e44', R: '0xe4ac3...', S: '0x5374f...' } ],
	to: null,
	transactionIndex: '0x0',
	type: 'TxTypeSmartContractDeploy',
	typeInt: 40,
	value: '0x0',
}
```

## caver.rpc.klay.getTransactionReceipt <a id="caver-rpc-klay-gettransactionreceipt"></a>

```javascript
caver.rpc.klay.getTransactionReceipt(transactionHash [, callback])
```

Returns the receipt of a transaction by transaction hash.

**NOTE** Receipt is not available for `pending` transactions whose transactions have not yet been processed.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| transactionHash | string | The transaction hash. |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `object` - A transaction receipt object, or `null` when no receipt was found:

| Name | Type | Description |
| --- | --- | --- |
| blockHash | string | Hash of the block where this transaction was in. |
| blockNumber | string | Block number where this transaction was in. |
| codeFormat | string | (optional) The code format of smart contract code. |
| contractAddress | string | The contract address created, if the transaction was a contract creation, otherwise `null`. |
| feePayer | string | (optional) Address of the fee payer. |
| feePayerSignatures | Array | (optional) An array of fee payer's signature objects. A signature object contains three fields (V, R, and S). V contains ECDSA recovery id. R contains ECDSA signature r while S contains ECDSA signature s. |
| feeRatio | string | (optional) Fee ratio of the fee payer. If it is 30, 30% of the fee will be paid by the fee payer. 70% will be paid by the sender. |
| from | string | Address of the sender. |
| gas | string | Gas provided by the sender. |
| gasPrice | string | Gas price provided by the sender in peb. |
| gasUsed | string | The amount of gas used by this specific transaction alone. |
| humanReadable | Boolean | (optional) `true` if the address is humanReadable, `false` if the address is not humanReadable. |
| key | string | (optional) The RLP-encoded account key used to update account key of account. |
| input | string | (optional) The data sent along with the transaction. |
| logs | Array | Array of log objects, which this transaction generated. |
| logsBloom | string | Bloom filter for light clients to quickly retrieve related logs. |
| nonce | string | The number of transactions made by the sender prior to this one. |
| senderTxHash | string | (optional) Hash of a transaction that is signed only by the sender. See [SenderTxHash]. This value is always the same as `transactionHash` for non fee-delegated transactions. |
| signatures | Array | An array of signature objects. A signature object contains three fields (V, R, and S). V contains ECDSA recovery id. R contains ECDSA signature r while S contains ECDSA signature s. |
| status | string | `0x1` if the transaction was successful, `0x0` if the Klaytn Virtual Machine reverted the transaction. |
| txError | string | (optional) detailed error code if `status` is equal to `0x0`. |
| to | string | Address of the receiver. `null` when it is a contract creation transaction. |
| transactionHash | string | Hash of the transaction. |
| transactionIndex | string | Integer of the transaction index position in the block. |
| type | string | A string representing the type of the transaction. |
| typeInt | number | An integer representing the type of the transaction. |
| value | string | Value transferred in peb. |

**Example**

```javascript
> caver.rpc.klay.getTransactionReceipt('0xdb63fb385e51fbfd84a98873c994aef622c5f1c72c5760a9ff95c55bbfd99898').then(console.log)
{
	blockHash: '0xc9f643c0ebe84932c10695cbc9eb75228af09516931b58952de3e12c21a50576',
	blockNumber: '0xb7',
	contractAddress: null,
	from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
	gas: '0x61a8',
	gasPrice: '0x5d21dba00',
	gasUsed: '0x5208',
	logs: [],
	logsBloom: '0x00000...',
	nonce: '0x0',
	senderTxHash: '0xdb63fb385e51fbfd84a98873c994aef622c5f1c72c5760a9ff95c55bbfd99898',
	signatures: [ { V: '0x4e44', R: '0xf1a9a...', S: '0x9116c...' } ],
	status: '0x1',
	to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
	transactionHash: '0xdb63fb385e51fbfd84a98873c994aef622c5f1c72c5760a9ff95c55bbfd99898',
	transactionIndex: '0x0',
	type: 'TxTypeValueTransfer',
	typeInt: 8,
	value: '0x8ac7230489e80000',
}
```

## caver.rpc.klay.getTransactionReceiptBySenderTxHash <a id="caver-rpc-klay-gettransactionreceiptbysendertxhash"></a>

```javascript
caver.rpc.klay.getTransactionReceiptBySenderTxHash(senderTxHash [, callback])
```

Returns the receipt of a transaction by sender transaction hash.

Please note that this API returns correct result only if the indexing feature is enabled in the node by `--sendertxhashindexing`. Use [caver.rpc.klay.isSenderTxHashIndexingEnabled](#caver-rpc-klay-issendertxhashindexingenabled) to check if the indexing feature is enabled or not.

**NOTE** Receipt is not available for `pending` transactions whose transactions have not yet been processed.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| senderTxHash | string | The sender transaction hash. See [SenderTxHash] for more detail. |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `object`

| Type | Description |
| --- | --- |
| object | A transaction receipt object, see [caver.rpc.klay.getTransactionReceipt](#caver-rpc-klay-gettransactionreceipt) for more detail. |

**Example**

```javascript
> caver.rpc.klay.getTransactionReceiptBySenderTxHash('0xdb63fb385e51fbfd84a98873c994aef622c5f1c72c5760a9ff95c55bbfd99898').then(console.log)
{
	blockHash: '0xc9f643c0ebe84932c10695cbc9eb75228af09516931b58952de3e12c21a50576',
	blockNumber: '0xb7',
	contractAddress: null,
	from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
	gas: '0x61a8',
	gasPrice: '0x5d21dba00',
	gasUsed: '0x5208',
	logs: [],
	logsBloom: '0x00000...',
	nonce: '0x0',
	senderTxHash: '0xdb63fb385e51fbfd84a98873c994aef622c5f1c72c5760a9ff95c55bbfd99898',
	signatures: [ { V: '0x4e44', R: '0xf1a9a...', S: '0x9116c...' } ],
	status: '0x1',
	to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
	transactionHash: '0xdb63fb385e51fbfd84a98873c994aef622c5f1c72c5760a9ff95c55bbfd99898',
	transactionIndex: '0x0',
	type: 'TxTypeValueTransfer',
	typeInt: 8,
	value: '0x8ac7230489e80000',
}
```

## caver.rpc.klay.sendRawTransaction <a id="caver-rpc-klay-sendrawtransaction"></a>

```javascript
caver.rpc.klay.sendRawTransaction(signedTransaction [, callback])
```

Sends a `signed transaction` to the Klaytn. 

The `signedTransaction` parameter can be a "RLP-encoded signed transaction." You can get the RLP-encoded transaction of a signed transaction using `transaction.getRLPEncoding`. For convenience, `caver.rpc.klay.sendRawTransaction` also accepts a "signed transaction instance" as parameter.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| signedTransaction | string &#124; object | A RLP-encoded signed transaction or an instance of signed transaction. |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

| Type | Description |
| --- | --- |
| PromiEvent | A promise combined event emitter. Will be resolved when the transaction receipt is available. |

For PromiEvent, the following events are available:

- `transactionHash` returns `string`: Is fired right after the transaction is sent and a transaction hash is available.
- `receipt` returns `object`: Is fired when the transaction receipt is available. See [caver.rpc.klay.getTransactionReceipt](#caver-rpc-klay-gettransactionreceipt) for more detail.
- `error` returns ``Error``: Is fired if an error occurs during sending. On an out-of-gas error, the second parameter is the receipt.

**Example**

```javascript
// Using promise
> caver.rpc.klay.sendRawTransaction('0x08f88...').then(console.log)
{
	blockHash: '0x8bff3eb5444711f53707c1c006dac54164af6f873c0f012aff98479155de3c46',
	blockNumber: '0x18a6',
	contractAddress: null,
	from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
	gas: '0x61a8',
	gasPrice: '0x5d21dba00',
	gasUsed: '0x5208',
	logs: [],
	logsBloom: '0x00000...',
	nonce: '0xc',
	senderTxHash: '0x72ea9179350cf2943e966eaf1e1e651d4e1b50ead4b6e6a574a4297c9f0f7017',
	signatures: [ { V: '0x4e43', R: '0x3bee4...', S: '0x101a1...' } ],
	status: '0x1',
	to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
	transactionHash: '0x72ea9179350cf2943e966eaf1e1e651d4e1b50ead4b6e6a574a4297c9f0f7017',
	transactionIndex: '0x0',
	type: 'TxTypeValueTransfer',
	typeInt: 8,
	value: '0x8ac7230489e80000',
}

// Using event emitter
> caver.rpc.klay.sendRawTransaction('0x08f88...').on('transactionHash', h => {...}).on('receipt', r => {...}).on('error', console.error)
```

## caver.rpc.klay.sendTransaction <a id="caver-rpc-klay-sendtransaction"></a>

```javascript
caver.rpc.klay.sendTransaction(transaction [, callback])
```

Signs the transaction as a transaction `sender` with an "imported account's private key" in your Klyatn Node and propagates the transaction to the Klaytn.

For more information about each transaction type, refer to [Transaction].

**NOTE**: This API provides the function to sign a transaction using an [imported account](../../../../json-rpc/api-references/personal.md#personal_importrawkey) in your Klaytn node. The imported account in your node must be [unlocked](../../../../json-rpc/api-references/personal.md#personal_unlockaccount) to sign the transaction.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| transaction | object | An instance of transaction to be sent to the Klaytn. |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

| Type | Description |
| --- | --- |
| PromiEvent | A promise combined event emitter. Will be resolved when the transaction receipt is available. |

For PromiEvent, the following events are available:

- `transactionHash` returns `string`: Is fired right after the transaction is sent and a transaction hash is available.
- `receipt` returns `object`: Is fired when the transaction receipt is available. See [caver.rpc.klay.getTransactionReceipt](#caver-rpc-klay-gettransactionreceipt) for more detail.
- `error` returns ``Error``: Is fired if an error occurs during sending. On an out-of-gas error, the second parameter is the receipt.

**Example**

```javascript
> const tx = new caver.transaction.valueTransfer({
	from: '0x{address in hex}', // The address of imported account in Klaytn Node
	to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
	value: caver.utils.toPeb(10, 'KLAY'),
	gas: 25000
})
// Using promise
> caver.rpc.klay.sendTransaction(tx).then(console.log)
{
	blockHash: '0xbfce3abcad0204e363ee9e3b94d15a20c1a4b86ac6cf51dd74db2226ab5b9e99',
	blockNumber: '0x1d18',
	contractAddress: null,
	from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
	gas: '0x61a8',
	gasPrice: '0x5d21dba00',
	gasUsed: '0x5208',
	logs: [],
	logsBloom: '0x00000...',
	nonce: '0x13',
	senderTxHash: '0x2c001a776290ac55ac53a82a70a0b71e07c985fe57fd9d8e422b919d4317002e',
	signatures: [ { V: '0x4e43', R: '0xeac91...', S: '0xa0aa4...' } ],
	status: '0x1',
	to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
	transactionHash: '0x2c001a776290ac55ac53a82a70a0b71e07c985fe57fd9d8e422b919d4317002e',
	transactionIndex: '0x0',
	type: 'TxTypeValueTransfer',
	typeInt: 8,
	value: '0x8ac7230489e80000',
}

// Using event emitter
> caver.rpc.klay.sendTransaction(tx).on('transactionHash', h => {...}).on('receipt', r => {...}).on('error', console.error)
```

## caver.rpc.klay.sendTransactionAsFeePayer <a id="caver-rpc-klay-sendtransactionasfeepayer"></a>

```javascript
caver.rpc.klay.sendTransactionAsFeePayer(transaction [, callback])
```

Signs the fee delegated transaction as a transaction `fee payer` with an `imported account's private key` in your Klyatn Node and propagates the transaction to the Klaytn.

Before using `sendTransaction` as a fee payer, the transaction sender must have signed with valid signature(s) and the `nonce` must have been defined.

For more information about each transaction type, refer to [Transaction].

**NOTE**: This API provides the function to sign a transaction using an [imported account](../../../../json-rpc/api-references/personal.md#personal_importrawkey) in your Klaytn node. The imported account in your node must be [unlocked](../../../../json-rpc/api-references/personal.md#personal_unlockaccount) to sign the transaction.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| transaction | object | An instance of fee delegated transaction to send to the Klaytn. |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

| Type | Description |
| --- | --- |
| PromiEvent | A promise combined event emitter. Will be resolved when the transaction receipt is available. |

For PromiEvent, the following events are available:

- `transactionHash` returns `string`: Is fired right after the transaction is sent and a transaction hash is available.
- `receipt` returns `object`: Is fired when the transaction receipt is available. See [caver.rpc.klay.getTransactionReceipt](#caver-rpc-klay-gettransactionreceipt) for more detail.
- `error` returns ``Error``: Is fired if an error occurs during sending. On an out-of-gas error, the second parameter is the receipt.

**Example**

```javascript
> const tx = new caver.transaction.feeDelegatedValueTransfer({
	from: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
	to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
	value: caver.utils.toPeb(1, 'KLAY'),
	gas: 50000,
	nonce: 1,
	signatures: [
		[
			'0x4e43',
			'0x873e9db6d055596a8f79a6a2761bfb464cbc1b352ac1ce53770fc23bb16d929c',
			'0x15d206781cc8ac9ffb02c08545cb832e1f1700b46b886d72bb0cfeb4a230871e',
		],
	],
	feePayer: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e', // The address of imported account in Klaytn Node
})
// Using promise
> caver.rpc.klay.signTransaction(tx).then(console.log)
{
	blockHash: '0x3be2f5b17eb35d0cf83b493ddfaa96d44cba40d1839778b4a8267f4c0aa61449',
	blockNumber: '0x23ef',
	contractAddress: null,
	feePayer: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
	feePayerSignatures: [ { V: '0x4e43', R: '0x7a9ec...', S: '0x22be3...' } ],
	from: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
	gas: '0xc350',
	gasPrice: '0x5d21dba00',
	gasUsed: '0x7918',
	logs: [],
	logsBloom: '0x00000...',
	nonce: '0x1',
	senderTxHash: '0x71ca2e169a9c6c7b5bfdfa68e584314978f2abef955f8a2666325b860e2c9df5',
	signatures: [ { V: '0x4e43', R: '0x873e9...', S: '0x15d20...' } ],
	status: '0x1',
	to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
	transactionHash: '0x04fa82ce10168e05db04a235f025e5b8bc004ab36710798a512fab75a95bfc52',
	transactionIndex: '0x0',
	type: 'TxTypeFeeDelegatedValueTransfer',
	typeInt: 9,
	value: '0xde0b6b3a7640000',
}

// Using event emitter
> caver.rpc.klay.sendTransactionAsFeePayer(tx).on('transactionHash', h => {...}).on('receipt', r => {...}).on('error', console.error)
```

## caver.rpc.klay.signTransaction <a id="caver-rpc-klay-signtransaction"></a>

```javascript
caver.rpc.klay.signTransaction(transaction [, callback])
```

Signs the transaction as a transaction sender with an "imported account's private key" in your Klaytn Node.

For more information about each transaction type, refer to [Transaction].

**NOTE**: This API provides the function to sign a transaction using an [imported account](../../../../json-rpc/api-references/personal.md#personal_importrawkey) in your Klaytn node. The imported account in your node must be [unlocked](../../../../json-rpc/api-references/personal.md#personal_unlockaccount) to sign the transaction.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| transaction | object | An instance of transaction to sign. |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `object` - An object includes signed transaction:

| Name | Type | Description |
| --- | --- | --- |
| raw | string | A RLP-encoded signed transaction. |
| tx | object | The transaction object including the sender's signature. |

**Example**

```javascript
> const tx = new caver.transaction.valueTransfer({
	from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e', // The address of imported account in Klaytn Node
	to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
	value: caver.utils.toPeb(10, 'KLAY'),
	gas: 25000
})

> caver.rpc.klay.signTransaction(tx).then(console.log)
{
	raw: '0x08f88...',
	tx: {
		typeInt: 8,
		type: 'TxTypeValueTransfer',
		nonce: '0x16',
		gasPrice: '0x5d21dba00',
		gas: '0x61a8',
		to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
		value: '0x8ac7230489e80000',
		from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
		signatures: [ { V: '0x4e43', R: '0x52d64...', S: '0x1371e...' } ],
		hash: '0xe816952761caccf86ab281a00e10a36da6579c425041906a235f10959b2960b1'
	}
}
```

## caver.rpc.klay.signTransactionAsFeePayer <a id="caver-rpc-klay-signtransactionasfeepayer"></a>

```javascript
caver.rpc.klay.signTransactionAsFeePayer(transaction [, callback])
```

Signs the transaction as a transaction fee payer with an "imported account's private key" in your Klaytn Node.

For more information about each transaction type, refer to [Transaction].

**NOTE**: This API provides the function to sign a transaction using an [imported account](../../../../json-rpc/api-references/personal.md#personal_importrawkey) in your Klaytn node. The imported account in your node must be [unlocked](../../../../json-rpc/api-references/personal.md#personal_unlockaccount) to sign the transaction.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| transaction | object | An instance of transaction to sign. |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `object` - An object includes signed transaction:

| Name | Type | Description |
| --- | --- | --- |
| raw | string | A RLP-encoded signed transaction. |
| tx | object | The transaction object to sign as fee payer. |

**Example**

```javascript
> const tx = new caver.transaction.feeDelegatedValueTransfer({
	from: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
	to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
	value: caver.utils.toPeb(1, 'KLAY'),
	gas: 50000,
	nonce: 0,
	signatures: [
		[
			'0x4e43',
			'0xe87291c7311534c3e451c6f6b8cafdf7454970f98504e9af6cfdeb29757ba458',
			'0x26dcf6f3702110230b806628165e28771e1152ea864ee4c69557faccd4d3dae8',
		],
	],
	feePayer: '0xe8b3a6ef12f9506e1df9fd445f9bb4488a482122', // The address of imported account in Klaytn Node
})

> caver.rpc.klay.signTransactionAsFeePayer(tx).then(console.log)
{
	raw: '0x09f8e...',
	tx: {
		typeInt: 9,
		type: 'TxTypeFeeDelegatedValueTransfer',
		nonce: '0x0',
		gasPrice: '0x5d21dba00',
		gas: '0xc350',
		to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
		value: '0xde0b6b3a7640000',
		from: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
		signatures: [ { V: '0x4e43', R: '0xe8729...', S: '0x26dcf...' } ],
		feePayer: '0xe8b3a6ef12f9506e1df9fd445f9bb4488a482122',
		feePayerSignatures: [ { V: '0x4e43', R: '0x5cce8...', S: '0x32907...' } ],
		hash: '0xdb89281f3a44a2370d73b389bbcfb9a597f558219145cf269a0b1480f8e778cc',
	},
}
```

## caver.rpc.klay.getDecodedAnchoringTransactionByHash <a id="caver-rpc-klay-getdecodedanchoringtransactionbyhash"></a>

```javascript
caver.rpc.klay.getDecodedAnchoringTransactionByHash(transactionHash [, callback])
```

Returns the decoded anchored data in the transaction for the given transaction hash.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| transactionHash | string | The transaction hash. |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `object` - An object includes decoded anchored data:

| Name | Type | Description |
| --- | --- | --- |
| BlockHash | string | Hash of the child chain block that this anchoring transaction was performed. |
| BlockNumber | number | The child chain block number that this anchoring transaction was performed. |
| ParentHash | string | Hash of the parent block. |
| TxHash | string | The root of the transaction trie of the block. |
| StateRootHash | string | The root of the final state trie of the block. |
| ReceiptHash| string | The root of the receipts trie of the block. |
| BlockCount | number | The number of blocks generated during this anchoring period. In most cases, this number is equal to the child chain's `SC_TX_PERIOD`, with the exception of the case that this transaction was the first anchoring tx after turning on the anchoring. |
| TxCount | number | The number of transactions generated in the child chain during this anchoring period. |

**Example**

```javascript
> caver.rpc.klay.getDecodedAnchoringTransactionByHash('0x59831a092a9f0b48018848f5dd88a457efdbfabec13ea07cd769686741a1cd13').then(console.log)
{
	BlockCount: 86400,
	BlockHash: '0x3c44b2ed491be7264b9f6819c67427642447716576b6702a72f6fdc40c41abde',
	BlockNumber: 23414400,
	ParentHash: '0x735468bb091a296c45553c8f67a8d0d39ac428cbe692b1b6c494d336351477f3',
	ReceiptHash: '0x6a908d319b6f6ab4414da1afd6763d70ecc8037ec167aa8a942bc0c2af12b4ab',
	StateRootHash: '0x4a664227fb2508a2952a4695cabb88b433522af2a5dee50cc6dd4036d85bf1d3',
	TxCount: 50895,
	TxHash: '0x753a85d2c53fc34cb9108301f1cf8ff8d78dde13d42d80958e47e388008319cd',
}
```

## caver.rpc.klay.getChainId <a id="caver-rpc-klay-getchainid"></a>

```javascript
caver.rpc.klay.getChainId([callback])
```

Returns the chain ID of the chain.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `string`

| Type | Description |
| --- | --- |
| string | The chain ID of the chain. |

**Example**

```javascript
> caver.rpc.klay.getChainId().then(console.log)
0x2710
```

## caver.rpc.klay.getClientVersion <a id="caver-rpc-klay-getclientversion"></a>

```javascript
caver.rpc.klay.getClientVersion([callback])
```

Returns the current client version of a Klaytn node.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `string`

| Type | Description |
| --- | --- |
| string | The current client version of a Klaytn node. |

**Example**

```javascript
> caver.rpc.klay.getClientVersion().then(console.log)
Klaytn/v1.3.0+144494d2aa/linux-amd64/go1.13.1
```

## caver.rpc.klay.getGasPrice <a id="caver-rpc-klay-getgasprice"></a>

```javascript
caver.rpc.klay.getGasPrice([callback])
```

Returns the current price per gas in peb.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `string`

| Type | Description |
| --- | --- |
| string | The current gas price in peb. |

**Example**

```javascript
> caver.rpc.klay.getGasPrice().then(console.log)
0x5d21dba00
```

## caver.rpc.klay.getGasPriceAt <a id="caver-rpc-klay-getgaspriceat"></a>

```javascript
caver.rpc.klay.getGasPriceAt([blockNumber] [, callback])
```

Returns the current price per gas in peb for the given block.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| blockNumber | number | (optional) The block number. If omitted, latest unit price will be returned. |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `string`

| Type | Description |
| --- | --- |
| string | The current gas price in peb. |

**Example**

```javascript
> caver.rpc.klay.getGasPriceAt().then(console.log)
0x5d21dba00
```

## caver.rpc.klay.isParallelDBWrite <a id="caver-rpc-klay-isparalleldbwrite"></a>

```javascript
caver.rpc.klay.isParallelDBWrite([callback])
```

Returns true if the node is writing blockchain data in parallel manner.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `boolean`

| Type | Description |
| --- | --- |
| boolean | true means the node is writing blockchain data in parallel manner. It is false if the node is writing the data in serial manner. |

**Example**

```javascript
> caver.rpc.klay.isParallelDBWrite().then(console.log)
true
```

## caver.rpc.klay.isSenderTxHashIndexingEnabled <a id="caver-rpc-klay-issendertxhashindexingenabled"></a>

```javascript
caver.rpc.klay.isSenderTxHashIndexingEnabled([callback])
```

Returns true if the node is indexing sender transaction hash to transaction hash mapping information.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `boolean`

| Type | Description |
| --- | --- |
| boolean | true means the node is indexing sender transaction hash to transaction hash mapping information. |

**Example**

```javascript
> caver.rpc.klay.isSenderTxHashIndexingEnabled().then(console.log)
true
```

## caver.rpc.klay.getProtocolVersion <a id="caver-rpc-klay-getprotocolversion"></a>

```javascript
caver.rpc.klay.getProtocolVersion([callback])
```

Returns the Klaytn protocol version of the node.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `string`

| Type | Description |
| --- | --- |
| string | The Klaytn protocol version of the node. |

**Example**

```javascript
> caver.rpc.klay.getProtocolVersion().then(console.log)
0x40
```

## caver.rpc.klay.getRewardbase <a id="caver-rpc-klay-getrewardbase"></a>

```javascript
caver.rpc.klay.getRewardbase([callback])
```

Returns the rewardbase of the current node. Rewardbase is the address of the account where the block rewards goes to. It is only required for CNs.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `string`

| Type | Description |
| --- | --- |
| string | The rewardbase address. |

**Example**

```javascript
> caver.rpc.klay.getRewardbase().then(console.log)
0xa9b3a93b2a9fa3fdcc31addd240b04bf8db3414c
```

## caver.rpc.klay.isWriteThroughCaching <a id="caver-rpc-klay-iswritethroughcaching"></a>

```javascript
caver.rpc.klay.isWriteThroughCaching([callback])
```

Returns true if the node is using writeThroughCaching.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `boolean`

| Type | Description |
| --- | --- |
| boolean | true means the node is using write through caching. |

**Example**

```javascript
> caver.rpc.klay.isWriteThroughCaching().then(console.log)
false
```

## caver.rpc.klay.getFilterChanges <a id="caver-rpc-klay-getfilterchanges"></a>

```javascript
caver.rpc.klay.getFilterChanges(filterId [, callback])
```

Polling method for a filter, which returns an array of logs since the last poll.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| filterId | String | The filter id. |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `Array` - Array of log objects, or an empty array if nothing has changed since last poll.

- For filters created with [caver.rpc.klay.newBlockFilter](#caver-rpc-klay-newblockfilter), the returns are block hashes, *e.g.*, `["0x3454645634534..."]`.
- For filters created with [caver.rpc.klay.newPendingTransactionFilter](#caver-rpc-klay-newpendingtransactionfilter), the returns are transaction hashes, *e.g.*, `["0x6345343454645..."]`.
- For filters created with [caver.rpc.klay.newFilter](#caver-rpc-klay-newfilter), logs are objects with following parameters:

| Name | Type | Description |
| --- | --- | --- |
| logIndex | string | The log index position in the block. |
| transactionIndex | string | The transactions index position log was created from. |
| transactionHash | string| Hash of the transactions this log was created from. `null` when pending. |
| blockHash | string | Hash of the block where this log was in. `null` when pending. |
| blockNumber | string | The block number where this log was in. `null` when pending. |
| address | string | Address from which this log originated. |
| data | string | Contains the non-indexed arguments of the log. |
| topics | Array | Array of 0 to 4 32-byte DATA of indexed log arguments. (In Solidity: The first topic is the hash of the signature of the event (*e.g.*, `Deposit(address,bytes32,uint256)`), except you declared the event with the `anonymous` specifier.). |

**Example**

```javascript
> caver.rpc.klay.getFilterChanges('0xafb8e49bbcba9d61a3c616a3a312533e').then(console.log)
[ 
    { 
        address: '0x71e503935b7816757AA0314d4E7354dab9D39162',
        topics: [ '0xe8451a9161f9159bc887328b634789768bd596360ef07c5a5cbfb927c44051f9' ],
        data: '0x0000000000000000000000000000000000000000000000000000000000000001',
        blockNumber: '0xdc5',
        transactionHash: '0x1b28e2c723e45a0d8978890598903f36a74397c9cea8531dc9762c39483e417f',
        transactionIndex: '0x0',
        blockHash: '0xb7f0bdaba93d3baaa01a5c24517da443207f774e0202f02c298e8e997a540b3d',
        logIndex: '0x0'
    } 
]
```

## getFilterLogs <a id="caver-rpc-klay-getfilterlogs"></a>

```javascript
caver.rpc.klay.getFilterLogs(filterId [, callback])
```

Returns an array of all logs matching the filter with the given id. The filter object should be obtained by using [newFilter](#newfilter).  

Note that filter ids returned by other filter creation functions, such as [caver.rpc.klay.newBlockFilter](#caver-rpc-klay-newblockfilter) or [caver.rpc.klay.newPendingTransactionFilter](#caver-rpc-klay-newpendingtransactionfilter), cannot be used with this function.


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| filterId | string | The filter id. |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

See [caver.rpc.klay.getFilterChanges](#caver-rpc-klay-getfilterchanges)

**Example**

```javascript
> caver.rpc.klay.getFilterLogs('0xcac08a7fc32fc625a519644187e9f690').then(console.log);
[
    {
        address: '0x55384B52a9E5091B6012717197887dd3B5779Df3',
        topics: [ '0xe8451a9161f9159bc887328b634789768bd596360ef07c5a5cbfb927c44051f9' ],
        data: '0x0000000000000000000000000000000000000000000000000000000000000001',
        blockNumber: '0x1c31',
        transactionHash: '0xa7436c54e47dafbce696de65f6e890c96ac22c236f50ca1be28b9b568034c3b3',
        transactionIndex: '0x0',
        blockHash: '0xe4f27c524dacfaaccb36735deccee69b3d6c315e969779784c36bb8e14b89e01',
        logIndex: '0x0'
    }
]
```

## getLogs <a id="caver-rpc-klay-getlogs"></a>

```javascript
caver.rpc.klay.getLogs(options [, callback])
```

Returns an array of all logs matching a given filter object.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| options | object | The filter options. See the below table to find the description. |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

The options object can contain the following:

| Name | Type | Description |
| --- | --- | --- |
| fromBlock | number &#124; string | (optional) The block number of the earliest block to get the logs. (`"latest"` means the most recent block and `"pending"` means currently mining block.) The default value is `"latest"`. |
| toBlock | number &#124; string | (optional) The block number of the last block to get the logs. (`"latest"` means the most recent block and `"pending"` means currently mining block.). The default value is `"latest"`. |
| address | string &#124; Array | (optional) An address or a list of addresses. Only the logs related to the particular account(s) will be returned. |
| topics | Array | (optional) An array of values that must appear in the log entries. The order is important. If you want to leave topics out, use `null`, *e.g.*, `[null, '0x12...']`. You can also pass an array for each topic with options for that topic, *e.g.,* `[null, ['option1', 'option2']]`. |

**Return Value**

See [caver.rpc.klay.getFilterChanges](#caver-rpc-klay-getfilterchanges)

**Example**

```javascript
> caver.rpc.klay.getLogs({
		fromBlock: '0x1'
		toBlock: 'latest',
		address:'0x87ac99835e67168d4f9a40580f8f5c33550ba88b'
	}).then(console.log)
[
	{
		data: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
		topics: [
			'0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7', '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385
		]
		logIndex: '0x0',
		transactionIndex: '0x0',
		transactionHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
		blockHash: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
		blockNumber: '0x4d2',
		address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
	},
	{...}
]
```

## newBlockFilter <a id="caver-rpc-klay-newblockfilter"></a>

```javascript
caver.rpc.klay.newBlockFilter([callback])
```

Creates a filter in the node, to notify when a new block arrives. To check if the state has changed, call [caver.rpc.klay.getFilterChanges](#caver-rpc-klay-getfilterchanges).

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `string`

| Type | Description |
| --- | --- |
| string | A filter id. |

**Example**

```javascript
> caver.rpc.klay.newBlockFilter().then(console.log)
0xf90906914486a9c22d620e50022b38d5
```

## newFilter <a id="caver-rpc-klay-newfilter"></a>

```javascript
caver.rpc.klay.newFilter(options [, callback])
```

Creates a filter object using the given filter options, to receive the specific state changes (logs).
- To check if the state has changed, call [caver.rpc.klay.getFilterChanges](#caver-rpc-klay-getfilterchanges).
- To obtain all logs matching the filter created by `newFilter`, call [caver.rpc.klay.getFilterLogs](#caver-rpc-klay-getfilterlogs).

For detailed information about the topics in the filter object, please see [Klaytn Platform API - klay_newFilter](../../../../json-rpc/api-references/klay/filter.md#klay_newfilter).

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| options | object | The filter options. See the below table to find the description. |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

The options object can contain the following:

| Name | Type | Description |
| --- | --- | --- |
| fromBlock | number &#124; string | (optional) The block number of the earliest block to get the logs. (`"latest"` means the most recent block and `"pending"` means currently mining block.) The default value is `"latest"`. |
| toBlock | number &#124; string | (optional) The block number of the last block to get the logs. (`"latest"` means the most recent block and `"pending"` means currently mining block.). The default value is `"latest"`. |
| address | string &#124; Array | (optional) An address or a list of addresses. Only the logs related to the particular account(s) will be returned. |
| topics | Array | (optional) An array of values that must appear in the log entries. The order is important. If you want to leave topics out, use `null`, *e.g.*, `[null, '0x12...']`. You can also pass an array for each topic with options for that topic, *e.g.,* `[null, ['option1', 'option2']]`. |

**Return Value**

`Promise` returns `string`

| Type | Description |
| --- | --- |
| string | A filter id. |

**Example**

```javascript
> caver.rpc.klay.newFilter({}).then(console.log)
0x40d40cb9758c6f0d99d9c2ce9c0f823

> caver.rpc.klay.newFilter({ address: '0x55384B52a9E5091B6012717197887dd3B5779Df3' }).then(console.log)
0xd165cbf31b9d60346aada33dbefe01b
```

## newPendingTransactionFilter <a id="caver-rpc-klay-newpendingtransactionfilter"></a>

```javascript
caver.rpc.klay.newPendingTransactionFilter([callback])
```

Creates a filter in the node, to receive the information about new pending transactions arrival.
To check if the state has changed, call [caver.rpc.klay.getFilterChanges](#caver-rpc-klay-getfilterchanges).

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `string`

| Type | Description |
| --- | --- |
| string | A filter id. |

**Example**

```javascript
> caver.rpc.klay.newPendingTransactionFilter().then(console.log)
0xe62da1b2a09efcd4168398bdbf586db0
```

## uninstallFilter <a id="caver-rpc-klay-uninstallfilter"></a>

```javascript
caver.rpc.klay.uninstallFilter(filterId [, callback])
```

Uninstalls a filter with given id. Should always be called when a watch is no longer needed. Additionally, filters time out when they are not being called with [caver.rpc.klay.getFilterChanges](#caver-rpc-klay-getfilterchanges) for a period of time.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| filterId | string | The filter id. |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `boolean`

| Type | Description |
| --- | --- |
| boolean | true if the filter was successfully uninstalled, otherwise false. |

**Example**

```javascript
> caver.rpc.klay.uninstallFilter('0x1426438ffdae5abf43edf4159c5b013b').then(console.log)
true
```

## sha3 <a id="caver-rpc-klay-sha3"></a>

```javascript
caver.rpc.klay.sha3(data[, callback])
```

Returns Keccak-256 (not the standardized SHA3-256) of the given data. You can use [caver.utils.sha3](../caver.utils.md#caver-utils-sha3) instead of this.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| data | String | The data to be converted into a SHA3 hash. |
| callback | function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `string`

| Type | Description |
| --- | --- |
| string | The SHA3 result of the given data.|

**Example**

```javascript
> caver.rpc.klay.sha3('0x11223344').then(console.log)
0x36712aa4d0dd2f64a9ae6ac09555133a157c74ddf7c079a70c33e8b4bf70dd73
```

[AccountKeyLegacy]: ../caver.account.md#accountkeylegacy
[AccountKeyPublic]: ../caver.account.md#accountkeypublic
[AccountKeyFail]: ../caver.account.md#accountkeyfail
[AccountKeyWeightedMultiSig]: ../caver.account.md#accountkeyweightedmultisig
[AccountKeyRoleBased]: ../caver.account.md#accountkeyrolebased
[SenderTxHash]: ../../../../../klaytn/design/transactions/README.md#sendertxhash
[caver.rpc.klay.getTransactionByHash]: #caver-rpc-klay-gettransactionbyhash
[Transaction]: ../caver.transaction/caver.transaction.md#class
