---
description: A caver-js object used to interact with a smart contract for KIP7.
---

# caver.klay.KIP7

The `caver.klay.KIP7` helps you easily handle a smart contract that implements KIP-7 as a JavaScript object on the Klaytn blockchain.

The `caver.klay.KIP7` inherits [caver.klay.Contract](caver.klay.Contract.md) to implement the KIP-7 token contract. The `caver.klay.KIP7` holds the same properties of `caver.klay.Contract` whereas additional methods to implement extra features. This section only introduces the newly added bound methods of the `caver.klay.KIP7`.

The abi and bytecode used in the caver.klay.KIP7 were implemented using the example of [openzeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).

For more information about KIP-7, see [Klaytn Improvement Proposals](https://kips.klaytn.foundation/KIPs/kip-7).

**NOTE** `caver.klay.KIP7` is supported since caver-js [v1.4.0](https://www.npmjs.com/package/caver-js/v/1.4.0).

## caver.klay.KIP7.deploy <a id="caver-klay-kip7-deploy"></a>

```javascript
caver.klay.KIP7.deploy(tokenInfo, deployer)
```

Deploys the KIP-7 token contract to the Klaytn blockchain. A contract deployed using caver.klay.KIP7.deploy is a fungible token that follows the KIP-7 standard.

After successful deployment, the promise will be resolved with a new KIP7 instance.

**Parameters**

| Name | Type | Description |
| :--- | :--- | :--- |
| tokenInfo | Object | The information needed to deploy KIP-7 token contract on the Klaytn blockchain. See the below table for the details. |
| deployer | String | The address of the account to deploy the KIP-7 token contract. This account must have enough KLAY to deploy. |

The tokenInfo object must contain the following:

| Name | Type | Description |
| :--- | :--- | :--- |
| name | String | The name of the token. |
| symbol | String | The symbol of the token. |
| decimals | Number | The number of decimal places the token uses. |
| initialSupply | BigNumber \| String \| Number | The total amount of token to be supplied initially. |

**NOTE** The `initialSupply` parameter accepts `Number` type but if the fed value were out of the range capped by Number.MAX\_SAFE\_INTEGER, it might cause an unexpected result or error. In this case, it is recommended to use the `BigNumber` type, especially for a `uint256` sized numeric input value.

**Return Value**

`PromiEvent`: A promise combined event emitter, which is resolved with a new KIP7 instance. Additionally, the following events can occur:

| Name | Type | Description |
| :--- | :--- | :--- |
| transactionHash | String | Fired right after the transaction is sent and a transaction hash is available. |
| receipt | Object | Fired when the transaction receipt is available. If you want to know about the properties inside the receipt object, see [getTransactionReceipt](caver.klay/transaction.md#gettransactionreceipt). Receipts from KIP7 instances have an 'events' attribute parsed via abi instead of a 'logs' attribute. |
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
                     { indexed: true, name: 'spender', type: 'address' },
                     { indexed: false, name: 'value', type: 'uint256' }
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
new caver.klay.KIP7([tokenAddress])
```

Creates a new KIP7 instance with its bound methods and events.

**Parameters**

| Name | Type | Description |
| :--- | :--- | :--- |
| tokenAddress | String | \(optional\) The address of the KIP-7 token contract, which can be assigned later through `kip7Instance.options.address = '0x1234..'` |

**Return Value**

| Type | Description |
| :--- | :--- |
| Object | The KIP7 instance with its bound methods and events. |

**Example**

```javascript
// Create a KIP7 instance without a parameter
> const kip7Instance = new caver.klay.KIP7()

// Create a KIP7 instance with a token address
> const kip7Instance = new caver.klay.KIP7('0x{address in hex}')
```

## kip7Instance.clone <a id="kip7instance-clone"></a>

```javascript
kip7Instance.clone([tokenAddress])
```

Clones the current KIP7 instance.

**Parameters**

| Name | Type | Description |
| :--- | :--- | :--- |
| tokenAddress | String | \(optional\) The address of the smart contract that deployed another KIP7 token. If omitted, it will be set to the contract address in the original instance. |

**Return Value**

| Type | Description |
| :--- | :--- |
| Object | The clone of the original KIP7 instance. |

**Example**

```javascript
> const kip7Instance = new caver.klay.KIP7(address)

// Clone without a parameter
> const cloned = kip7Instance.clone()

// Clone with the address of the new token contract
> const cloned = kip7Instance.clone('0x{address in hex}')
```

## kip7Instance.supportsInterface <a id="kip7instance-supportsinterface"></a>

```javascript
kip7Instance.supportsInterface(interfaceId)
```

Returns `true` if this contract implements the interface defined by `interfaceId`.

**Parameters**

| Name | Type | Description |
| :--- | :--- | :--- |
| interfaceId | String | The interfaceId to be checked. |

**Return Value**

`Promise` returns `Boolean`: `true` if this contract implements the interface defined by `interfaceId`.

**Example**

```javascript
> kip7Instance.supportsInterface('0x65787371').then(console.log)
true
> kip7Instance.supportsInterface('0x3a2820fe').then(console.log)
false
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

Returns the number of decimal places the token uses.

**Parameters**

None

**Return Value**

`Promise` returns `Number`: The number of decimal places the token uses.

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
| :--- | :--- | :--- |
| address | String | The address of the account to be checked for its balance. |

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

Returns the amount of token that `spender` is allowed to withdraw from `owner`.

**Parameters**

| Name | Type | Description |
| :--- | :--- | :--- |
| owner | String | The address of the token owner's account. |
| spender | String | The address of the account that spends tokens in place of the owner. |

**Return Value**

`Promise` returns `BigNumber`: The remaining number of tokens that spender is allowed to spend in place of the owner.

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

Returns `true` if the given account is a minter who can issue new KIP7 tokens.

**Parameters**

| Name | Type | Description |
| :--- | :--- | :--- |
| address | String | The address of the account to be checked for having the minting right. |

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

Returns `true` if the given account is a pauser who can suspend transferring tokens.

**Parameters**

| Name | Type | Description |
| :--- | :--- | :--- |
| address | String | The address of the account to be checked for having the right to suspend transferring tokens. |

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

Returns `true` if the contract is paused, and `false` otherwise.

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

Set the `amount` of the tokens of the token owner to be spent by the `spender`.

Note that this method will submit a transaction from the owner to the Klaytn network, which will charge the transaction fee to the owner.

**Parameters**

| Name | Type | Description |
| :--- | :--- | :--- |
| spender | String | The address of the account who spends tokens in place of the owner. |
| amount | BigNumber \| String \| Number | The amount of token the spender is allowed to use. |
| sendParam | Object | \(optional\) An object holding parameters that are required for sending a transaction. |

**NOTE** The `amount` parameter accepts `Number` type but if the fed value were out of the range capped by Number.MAX\_SAFE\_INTEGER, it might cause an unexpected result or error. In this case, it is recommended to use the `BigNumber` type, especially for a `uint256` sized numeric input value.

The `sendParam` object contains the following:

| Name | Type | Description |
| :--- | :--- | :--- |
| from | String | \(optional\) The address from which the transaction should be sent. If omitted, it will be set by `this.options.from`. If neither of `from` in the `sendParam` object nor `this.options.from` were not provided, an error would occur. |
| gas | Number \| String | \(optional\) The maximum number of gas provided for this transaction \(gas limit\). If omitted, it will be set by caver-js via calling `this.methods.approve(spender, amount).estimateGas({from})`. |
| gasPrice | Number \| String | \(optional\) The gas price in peb for this transaction. If omitted, it will be set by caver-js via calling `caver.klay.getGasPrice`. |
| value | Number \| String \| BN \| BigNumber | \(optional\) The value to be transferred in peb. |

**Return Value**

`Promise` returns `Object` - The receipt containing the result of the transaction execution. If you want to know about the properties inside the receipt object, see the description of [getTransactionReceipt](caver.klay/transaction.md#gettransactionreceipt). Receipts from KIP7 instances have an 'events' attribute parsed via ABI instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with the from field given 
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

// Using kip7Instance.options.from
// If the value of kip7Instance.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7Instance instance.
> kip7Instance.options.from = '0x{address in hex}'
> kip7Instance.approve('0x{address in hex}', 10).then(console.log)
```

## kip7Instance.transfer <a id="kip7instance-transfer"></a>

```javascript
kip7Instance.transfer(recipient, amount [, sendParam])
```

Transfers the given `amount` of token from the token owner's balance to the `recipient`. The token owner should execute this token transfer with its own hands. Thus, the token owner should be the sender of this transaction whose address must be given at `sendParam.from` or `kip7Instance.options.from`. Without `sendParam.from` nor `kip7Instance.options.from` being provided, an error would occur.

Note that sending this transaction will charge the transaction fee to the transaction sender.

**Parameters**

| Name | Type | Description |
| :--- | :--- | :--- |
| recipient | String | The address of the account to receive token. |
| amount | BigNumber \| String \| Number | The amount of token to be transferred. |
| sendParam | Object | \(optional\) An object with defined parameters for sending a transaction. For more information about sendParam, refer to the parameter description of [approve](caver.klay.KIP7.md#kip7instance-approve). |

**NOTE** The `amount` parameter accepts `Number` type but if the fed value were out of the range capped by Number.MAX\_SAFE\_INTEGER, it might cause an unexpected result or error. In this case, it is recommended to use the `BigNumber` type, especially for a `uint256` sized numeric input value.

**Return Value**

`Promise` returns `Object` - The receipt containing the result of the transaction execution. If you want to know about the properties inside the receipt object, see the description of [getTransactionReceipt](caver.klay/transaction.md#gettransactionreceipt). Receipts from KIP7 instances have an 'events' attribute parsed via ABI instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with the from field given 
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

// Using kip7Instance.options.from
// If the value of kip7Instance.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7Instance instance.
> kip7Instance.options.from = '0x{address in hex}'
> kip7Instance.transfer('0x{address in hex}', 10).then(console.log)
```

## kip7Instance.safeTransfer <a id="kip7instance-safetransfer"></a>

```javascript
kip7Instance.safeTransfer(recipient, amount [, data] [, sendParam])
```

Safely transfers the given `amount` of token from the token owner's balance to the `recipient`. The token owner should execute this token transfer with its own hands. Thus, the token owner should be the sender of this transaction whose address must be given at `sendParam.from` or `kip7Instance.options.from`. Without `sendParam.from` nor `kip7Instance.options.from` being provided, an error would occur.

If the recipient was a contract address, it should implement [IKIP7Receiver.onKIP7Received](https://kips.klaytn.foundation/KIPs/kip-7#wallet-interface). Otherwise, the transfer is reverted.

Note that sending this transaction will charge the transaction fee to the transaction sender.

**Parameters**

| Name | Type | Description |
| :--- | :--- | :--- |
| recipient | String | The address of the account to receive the token. |
| amount | BigNumber \| String \| Number | The amount of token you want to transfer. |
| data | Buffer \| String \| Number | \(optional\) The optional data to send along with the call. |
| sendParam | Object | \(optional\) An object with defined parameters for sending a transaction. For more information about sendParam, refer to the parameter description of [approve](caver.klay.KIP7.md#kip7instance-approve). |

**NOTE** The `amount` parameter accepts `Number` type but if the fed value were out of the range capped by Number.MAX\_SAFE\_INTEGER, it might cause an unexpected result or error. In this case, it is recommended to use the `BigNumber` type, especially for a `uint256` sized numeric input value.

**Return Value**

`Promise` returns `Object` - The receipt containing the result of the transaction execution. If you want to know about the properties inside the receipt object, see the description of [getTransactionReceipt](caver.klay/transaction.md#gettransactionreceipt). Receipts from KIP17 instances have an 'events' attribute parsed via ABI instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with the from field given (without data)
> kip7Instance.safeTransfer('0x{address in hex}', 10, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x208cd64b95bbd91420fc6b1a7b514a8d3051d09333d79244b6b74ff2f7f3eee4',
    blockNumber: 2384,
    contractAddress: null,
    from: '0xc2c84328845a36fe0c4dcef370d24ec80cf85221',
    ...
    status: true,
    to: '0xe4aeba6306b0df023aa4b765960fa59dbe925950',
    ...
    events: {
            Transfer: {
                    address: '0xe4AeBa6306b0Df023AA4b765960fA59dbE925950',
                    blockNumber: 2384,
                    transactionHash: '0x47bb085947c282722c1ceab1f4f0380d911ce464a47a19f1e7bddfe08a13563d',
                    transactionIndex: 0,
                    blockHash: '0x208cd64b95bbd91420fc6b1a7b514a8d3051d09333d79244b6b74ff2f7f3eee4',
                    logIndex: 0,
                    id: 'log_58e5e06d',
                    returnValues: {
                            '0': '0xC2C84328845A36Fe0c4DcEf370d24ec80cF85221',
                            '1': '0x67B092d09B5e94fed58609777cc7Ac9193553B73',
                            '2': '10',
                            from: '0xC2C84328845A36Fe0c4DcEf370d24ec80cF85221',
                            to: '0x67B092d09B5e94fed58609777cc7Ac9193553B73',
                            value: '10',
                    },
                    event: 'Transfer',
                    signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
                    raw: {
                            data: '0x000000000000000000000000000000000000000000000000000000000000000a',
                            topics: [ '0xddf25...', '0x00...221', '0x00...b73' ],
                    },
            },
    },
}

// Send via a sendParam object with the from field given (with data)
> kip7Instance.safeTransfer('0x{address in hex}', 11, '0x1234', { from: '0x{address in hex}' }).then(console.log)

// Using kip7Instance.options.from
// If the value of kip7Instance.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7Instance instance.
> kip7Instance.options.from = '0x{address in hex}'
> kip7Instance.safeTransfer('0x{address in hex}', 11).then(console.log)
```

## kip7Instance.transferFrom <a id="kip7instance-transferfrom"></a>

```javascript
kip7Instance.transferFrom(sender, recipient, amount [, sendParam])
```

Transfers the given `amount` of token from the token owner's balance to the `recipient`. The address who was approved to send the token owner's tokens is expected to execute this token transferring transaction. Thus, the approved one should be the sender of this transaction whose address must be given at `sendParam.from` or `kip7Instance.options.from`. Without `sendParam.from` nor `kip7Instance.options.from` being provided, an error would occur.

Note that sending this transaction will charge the transaction fee to the transaction sender.

**Parameters**

| Name | Type | Description |
| :--- | :--- | :--- |
| sender | String | The address of the account that owns the token to be sent with allowance mechanism. |
| recipient | String | The address of the account to receive the token. |
| amount | BigNumber \| String \| Number | The amount of token you want to transfer. |
| sendParam | Object | \(optional\) An object with defined parameters for sending a transaction. For more information about sendParam, refer to the parameter description of [approve](caver.klay.KIP7.md#kip7instance-approve). |

**NOTE** The `amount` parameter accepts `Number` type but if the fed value were out of the range capped by Number.MAX\_SAFE\_INTEGER, it might cause an unexpected result or error. In this case, it is recommended to use the `BigNumber` type, especially for a `uint256` sized numeric input value.

**Return Value**

`Promise` returns `Object` - The receipt containing the result of the transaction execution. If you want to know about the properties inside the receipt object, see the description of [getTransactionReceipt](caver.klay/transaction.md#gettransactionreceipt). Receipts from KIP7 instances have an 'events' attribute parsed via ABI instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with the from field given
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

// Using kip7Instance.options.from
// If the value of kip7Instance.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7Instance instance.
> kip7Instance.options.from = '0x{address in hex}'
> kip7Instance.transferFrom('0x{address in hex}', '0x{address in hex}', 10000).then(console.log)
```

## kip7Instance.safeTransferFrom <a id="kip7instance-safetransferfrom"></a>

```javascript
kip7Instance.safeTransferFrom(sender, recipient, amount [, data] [, sendParam])
```

Safely transfers the given `amount` of token from the token owner's balance to the `recipient`. The address who was approved to send the token owner's tokens is expected to execute this token transferring transaction. Thus, the approved one should be the sender of this transaction whose address must be given at `sendParam.from` or `kip7Instance.options.from`. Without `sendParam.from` nor `kip7Instance.options.from` being provided, an error would occur.

If the recipient was a contract address, it should implement [IKIP7Receiver.onKIP7Received](https://kips.klaytn.foundation/KIPs/kip-7#wallet-interface). Otherwise, the transfer is reverted.

Note that sending this transaction will charge the transaction fee to the transaction sender.

**Parameters**

| Name | Type | Description |
| :--- | :--- | :--- |
| sender | String | The address of the account that owns the token to be sent with allowance mechanism. |
| recipient | String | The address of the account to receive the token. |
| amount | BigNumber \| String \| Number | The amount of token you want to transfer. |
| data | Buffer \| String \| Number | \(optional\) The optional data to send along with the call. |
| sendParam | Object | \(optional\) An object with defined parameters for sending a transaction. For more information about sendParam, refer to the parameter description of [approve](caver.klay.KIP7.md#kip7instance-approve). |

**NOTE** The `amount` parameter accepts `Number` type but if the fed value were out of the range capped by Number.MAX\_SAFE\_INTEGER, it might cause an unexpected result or error. In this case, it is recommended to use the `BigNumber` type, especially for a `uint256` sized numeric input value.

**Return Value**

`Promise` returns `Object` - The receipt containing the result of the transaction execution. If you want to know about the properties inside the receipt object, see the description of [getTransactionReceipt](caver.klay/transaction.md#gettransactionreceipt). Receipts from KIP17 instances have an 'events' attribute parsed via ABI instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with the from field given (without data)
> kip7Instance.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 10000, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x0d641b9cebb032f10348288623898f8aa319faa0845c5b3b7a59ac397a6a218b',
    blockNumber: 2404,
    contractAddress: null,
    from: '0x090937f5c9b83d961da29149a3c37104bc5e71b3',
    ...
    status: true,
    to: '0xe4aeba6306b0df023aa4b765960fa59dbe925950',
    ...
    events: {
            Transfer: {
                    address: '0xe4AeBa6306b0Df023AA4b765960fA59dbE925950',
                    blockNumber: 2404,
                    transactionHash: '0xed8c33facaea963f57c268134aaab48fa765e7298fd70d4bc796b1e93c12ad45',
                    transactionIndex: 0,
                    blockHash: '0x0d641b9cebb032f10348288623898f8aa319faa0845c5b3b7a59ac397a6a218b',
                    logIndex: 0,
                    id: 'log_5eaef2c3',
                    returnValues: {
                            '0': '0xC2C84328845A36Fe0c4DcEf370d24ec80cF85221',
                            '1': '0x67B092d09B5e94fed58609777cc7Ac9193553B73',
                            '2': '10000',
                            from: '0xC2C84328845A36Fe0c4DcEf370d24ec80cF85221',
                            to: '0x67B092d09B5e94fed58609777cc7Ac9193553B73',
                            value: '10000',
                    },
                    event: 'Transfer',
                    signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
                    raw: {
                            data: '0x0000000000000000000000000000000000000000000000000000000000002710',
                            topics: [ '0xddf25...', '0x00...221', '0x00...b73' ],
                    },
            },
            Approval: {
                    address: '0xe4AeBa6306b0Df023AA4b765960fA59dbE925950',
                    blockNumber: 2404,
                    transactionHash: '0xed8c33facaea963f57c268134aaab48fa765e7298fd70d4bc796b1e93c12ad45',
                    transactionIndex: 0,
                    blockHash: '0x0d641b9cebb032f10348288623898f8aa319faa0845c5b3b7a59ac397a6a218b',
                    logIndex: 1,
                    id: 'log_3f3aedf8',
                    returnValues: {
                            '0': '0xC2C84328845A36Fe0c4DcEf370d24ec80cF85221',
                            '1': '0x090937f5C9B83d961da29149a3C37104Bc5e71B3',
                            '2': '0',
                            owner: '0xC2C84328845A36Fe0c4DcEf370d24ec80cF85221',
                            spender: '0x090937f5C9B83d961da29149a3C37104Bc5e71B3',
                            value: '0',
                    },
                    event: 'Approval',
                    signature: '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
                    raw: {
                            data: '0x0000000000000000000000000000000000000000000000000000000000000000',
                            topics: [ '0x8c5be...', '0x00...221', '0x00...1b3' ],
                    },
            },
    },
}

// Send via a sendParam object with the from field given (with data)
> kip7Instance.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 11, '0x1234', { from: '0x{address in hex}' }).then(console.log)

// Using kip7Instance.options.from
// If the value of kip7Instance.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7Instance instance.
> kip7Instance.options.from = '0x{address in hex}'
> kip7Instance.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 11).then(console.log)
```

## kip7Instance.mint <a id="kip7instance-mint"></a>

```javascript
kip7Instance.mint(account, amount [, sendParam])
```

Creates the `amount` of token and issues it to the `account`, increasing the total supply of token.

Note that this method will submit a transaction to the Klaytn network, which will charge the transaction fee to the sender.

**Parameters**

| Name | Type | Description |
| :--- | :--- | :--- |
| account | String | The address of the account to which the minted token will be issued. |
| amount | BigNumber \| String \| Number | The amount of token to be minted. |
| sendParam | Object | \(optional\) An object with defined parameters for sending a transaction. For more information about sendParam, refer to the parameter description of [approve](caver.klay.KIP7.md#kip7instance-approve). |

**NOTE** The `amount` parameter accepts `Number` type but if the fed value were out of the range capped by Number.MAX\_SAFE\_INTEGER, it might cause an unexpected result or error. In this case, it is recommended to use the `BigNumber` type, especially for a `uint256` sized numeric input value.

**NOTE** If `sendParam.from` or `kip7Instance.options.from` were given, it should be a minter with MinterRole.

**Return Value**

`Promise` returns `Object` - The receipt containing the result of the transaction execution. If you want to know about the properties inside the receipt object, see the description of [getTransactionReceipt](caver.klay/transaction.md#gettransactionreceipt). Receipts from KIP7 instances have an 'events' attribute parsed via ABI instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with the from field given 
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

// Using kip7Instance.options.from
// If the value of kip7Instance.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7Instance instance.
> kip7Instance.options.from = '0x{address in hex}'
> kip7Instance.mint('0x{address in hex}', 10000).then(console.log)
```

## kip7Instance.addMinter <a id="kip7instance-addminter"></a>

```javascript
kip7Instance.addMinter(account [, sendParam])
```

Adds an account as a minter, who are permitted to mint tokens.

Note that this method will submit a transaction to the Klaytn network, which will charge the transaction fee to the sender.

**Parameters**

| Name | Type | Description |
| :--- | :--- | :--- |
| account | String | The address of the account to be added as a minter. |
| sendParam | Object | \(optional\) An object with defined parameters for sending a transaction. For more information about sendParam, refer to the parameter description of [approve](caver.klay.KIP7.md#kip7instance-approve). |

**NOTE** If `sendParam.from` or `kip7Instance.options.from` were given, it should be a minter.

**Return Value**

`Promise` returns `Object` - The receipt containing the result of the transaction execution. If you want to know about the properties inside the receipt object, see the description of [getTransactionReceipt](caver.klay/transaction.md#gettransactionreceipt). Receipts from KIP7 instances have an 'events' attribute parsed via ABI instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with the from field given 
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

// Using kip7Instance.options.from
// If the value of kip7Instance.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7Instance instance.
> kip7Instance.options.from = '0x{address in hex}'
> kip7Instance.addMinter('0x{address in hex}').then(console.log)
```

## kip7Instance.renounceMinter <a id="kip7instance-renounceminter"></a>

```javascript
kip7Instance.renounceMinter([sendParam])
```

Renounces the right to mint tokens. Only a minter address can renounce the minting right.

Note that this method will submit a transaction to the Klaytn network, which will charge the transaction fee to the sender.

**Parameters**

| Name | Type | Description |
| :--- | :--- | :--- |
| sendParam | Object | \(optional\) An object with defined parameters for sending a transaction. For more information about sendParam, refer to the parameter description of [approve](caver.klay.KIP7.md#kip7instance-approve). |

**NOTE** If `sendParam.from` or `kip7Instance.options.from` were given, it should be a minter with MinterRole.

**Return Value**

`Promise` returns `Object` - The receipt containing the result of the transaction execution. If you want to know about the properties inside the receipt object, see the description of [getTransactionReceipt](caver.klay/transaction.md#gettransactionreceipt). Receipts from KIP7 instances have an 'events' attribute parsed via ABI instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with the from field given 
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

// Using kip7Instance.options.from
// If the value of kip7Instance.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7Instance instance.
> kip7Instance.options.from = '0x{address in hex}'
> kip7Instance.renounceMinter().then(console.log)
```

## kip7Instance.burn <a id="kip7instance-burn"></a>

```javascript
kip7Instance.burn(amount [, sendParam])
```

Destroys the `amount` of tokens in the sender's balance. Without `sendParam.from` nor `kip7Instance.options.from` being provided, an error would occur.

Note that this method will submit a transaction to the Klaytn network, which will charge the transaction fee to the sender.

**Parameters**

| Name | Type | Description |
| :--- | :--- | :--- |
| amount | BigNumber \| String \| Number | The amount of token to be destroyed. |
| sendParam | Object | \(optional\) An object with defined parameters for sending a transaction. For more information about sendParam, refer to the parameter description of [approve](caver.klay.KIP7.md#kip7instance-approve). |

**NOTE** The `amount` parameter accepts `Number` type but if the fed value were out of the range capped by Number.MAX\_SAFE\_INTEGER, it might cause an unexpected result or error. In this case, it is recommended to use the `BigNumber` type, especially for a `uint256` sized numeric input value.

**Return Value**

`Promise` returns `Object` - The receipt containing the result of the transaction execution. If you want to know about the properties inside the receipt object, see the description of [getTransactionReceipt](caver.klay/transaction.md#gettransactionreceipt). Receipts from KIP7 instances have an 'events' attribute parsed via ABI instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with the from field given 
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

// Using kip7Instance.options.from
// If the value of kip7Instance.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7Instance instance.
> kip7Instance.options.from = '0x{address in hex}'
> kip7Instance.burn(1000).then(console.log)
```

## kip7Instance.burnFrom <a id="kip7instance-burnfrom"></a>

```javascript
kip7Instance.burnFrom(account, amount [, sendParam])
```

Destroys the given number of tokens from `account`. The allowance of the sender specified in `sendParam.from` or `kip7Instance.options.from` is reduced alongside the balance of `account`.

Note that this method will submit a transaction to the Klaytn network, which will charge the transaction fee to the sender.

**Parameters**

| Name | Type | Description |
| :--- | :--- | :--- |
| account | String | The address of the account that owns tokens to be burned with allowance mechanism. |
| amount | BigNumber \| String \| Number | The amount of token to be destroyed. |
| sendParam | Object | \(optional\) An object with defined parameters for sending a transaction. For more information about sendParam, refer to the parameter description of [approve](caver.klay.KIP7.md#kip7instance-approve). |

**NOTE** The `amount` parameter accepts `Number` type but if the fed value were out of the range capped by Number.MAX\_SAFE\_INTEGER, it might cause an unexpected result or error. In this case, it is recommended to use the `BigNumber` type, especially for a `uint256` sized numeric input value.

**Return Value**

`Promise` returns `Object` - The receipt containing the result of the transaction execution. If you want to know about the properties inside the receipt object, see the description of [getTransactionReceipt](caver.klay/transaction.md#gettransactionreceipt). Receipts from KIP7 instances have an 'events' attribute parsed via ABI instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with the from field given 
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

// Using kip7Instance.options.from
// If the value of kip7Instance.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7Instance instance.
> kip7Instance.options.from = '0x{address in hex}'
> kip7Instance.burnFrom('0x{address in hex}', 1000).then(console.log)
```

## kip7Instance.addPauser <a id="kip7instance-addpauser"></a>

```javascript
kip7Instance.addPauser(account [, sendParam])
```

Adds an account as a pauser that has the right to suspend the contract.

Note that this method will submit a transaction to the Klaytn network, which will charge the transaction fee to the sender.

**Parameters**

| Name | Type | Description |
| :--- | :--- | :--- |
| account | String | The address of account to be a new pauser. |
| sendParam | Object | \(optional\) An object with defined parameters for sending a transaction. For more information about sendParam, refer to the parameter description of [approve](caver.klay.KIP7.md#kip7instance-approve). |

**NOTE** If `sendParam.from` or `kip7Instance.options.from` were given, it should be a pauser with PauserRole.

**Return Value**

`Promise` returns `Object` - The receipt containing the result of the transaction execution. If you want to know about the properties inside the receipt object, see the description of [getTransactionReceipt](caver.klay/transaction.md#gettransactionreceipt). Receipts from KIP7 instances have an 'events' attribute parsed via ABI instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with the from field given 
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

// Using kip7Instance.options.from
// If the value of kip7Instance.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7Instance instance.
> kip7Instance.options.from = '0x{address in hex}'
> kip7Instance.addPauser('0x{address in hex}').then(console.log)
```

## kip7Instance.renouncePauser <a id="kip7instance-renouncepauser"></a>

```javascript
kip7Instance.renouncePauser([sendParam])
```

Renounces the right to pause the contract. Only a pauser address can renounce the pausing right.

Note that this method will submit a transaction to the Klaytn network, which will charge the transaction fee to the sender.

**Parameters**

| Name | Type | Description |
| :--- | :--- | :--- |
| sendParam | Object | \(optional\) An object with defined parameters for sending a transaction. For more information about sendParam, refer to the parameter description of [approve](caver.klay.KIP7.md#kip7instance-approve). |

**NOTE** If `sendParam.from` or `kip7Instance.options.from` were given, it should be a pauser with PauserRole.

**Return Value**

`Promise` returns `Object` - The receipt containing the result of the transaction execution. If you want to know about the properties inside the receipt object, see the description of [getTransactionReceipt](caver.klay/transaction.md#gettransactionreceipt). Receipts from KIP7 instances have an 'events' attribute parsed via ABI instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with the from field given 
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

// Using kip7Instance.options.from
// If the value of kip7Instance.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7Instance instance.
> kip7Instance.options.from = '0x{address in hex}'
> kip7Instance.renouncePauser().then(console.log)
```

## kip7Instance.pause <a id="kip7instance-pause"></a>

```javascript
kip7Instance.pause([sendParam])
```

Suspends functions related to sending tokens.

Note that this method will submit a transaction to the Klaytn network, which will charge the transaction fee to the sender.

**Parameters**

| Name | Type | Description |
| :--- | :--- | :--- |
| sendParam | Object | \(optional\) An object with defined parameters for sending a transaction. For more information about sendParam, refer to the parameter description of [approve](caver.klay.KIP7.md#kip7instance-approve). |

**NOTE** If `sendParam.from` or `kip7Instance.options.from` were given, it should be a pauser with PauserRole.

**Return Value**

`Promise` returns `Object` - The receipt containing the result of the transaction execution. If you want to know about the properties inside the receipt object, see the description of [getTransactionReceipt](caver.klay/transaction.md#gettransactionreceipt). Receipts from KIP7 instances have an 'events' attribute parsed via ABI instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with the from field given 
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

// Using kip7Instance.options.from
// If the value of kip7Instance.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7Instance instance.
> kip7Instance.options.from = '0x{address in hex}'
> kip7Instance.pause().then(console.log)
```

## kip7Instance.unpause <a id="kip7instance-unpause"></a>

```javascript
kip7Instance.unpause([sendParam])
```

Resumes the paused contract.

Note that this method will submit a transaction to the Klaytn network, which will charge the transaction fee to the sender.

**Parameters**

| Name | Type | Description |
| :--- | :--- | :--- |
| sendParam | Object | \(optional\) An object with defined parameters for sending a transaction. For more information about sendParam, refer to the parameter description of [approve](caver.klay.KIP7.md#kip7instance-approve). |

**NOTE** If `sendParam.from` or `kip7Instance.options.from` were given, it should be a pauser with PauserRole.

**Return Value**

`Promise` returns `Object` - The receipt containing the result of the transaction execution. If you want to know about the properties inside the receipt object, see the description of [getTransactionReceipt](caver.klay/transaction.md#gettransactionreceipt). Receipts from KIP7 instances have an 'events' attribute parsed via ABI instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with the from field given 
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

// Using kip7Instance.options.from
// If the value of kip7Instance.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7Instance instance.
> kip7Instance.options.from = '0x{address in hex}'
> kip7Instance.unpause().then(console.log)
```

