# Legacy Transaction

## sendTransaction (Legacy)

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
Sends a transaction to the network.

Note: Only the account having `AccountKeyLegacy` can send this transaction, on the other hand, externally owned account(EOA) created from `ACCOUNT_CREATION` transaction can't send a legacy transaction.

**Parameters**

| Name                       | Type                                            | 설명                                                                                                                                                                                                                                |
| -------------------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| transactionObject          | Object                                          | The transaction object to send.                                                                                                                                                                                                   |
| transactionObject.from     | String                                          | The sender address of the transaction.                                                                                                                                                                                            |
| transactionObject.to       | String                                          | (optional) The destination address of the message, left undefined for a contract-creation transaction.                                                                                                                            |
| transactionObject.value    | Number &#124; String &#124; BN &#124; BigNumber | (optional) The value transferred for the transaction in peb, also the endowment if it's a contract-creation transaction.                                                                                                          |
| transactionObject.gas      | Number                                          | The amount of gas to use for the transaction (unused gas is refunded).                                                                                                                                                            |
| transactionObject.gasPrice | Number                                          | (optional) Gas price provided by the sender in peb. The gasPrice must be the same as the unitPrice set in the Klaytn node.                                                                                                        |
| transactionObject.data     | String                                          | (optional) Either an [ABI byte string](http://solidity.readthedocs.io/en/latest/abi-spec.html) containing the data of the function call on a contract, or in the case of a contract-creation transaction the initialization code. |
| transactionObject.nonce    | Number                                          | (optional) Integer of a nonce. This allows to overwrite your own pending transactions that use the same nonce. If omitted, it will be set by caver-js via calling `caver.klay.getTransactionCount`.                               |
| callback                   | Function                                        | (optional) Optional callback, returns an error object as the first parameter and the result as the second.                                                                                                                        |

**Return Value**

The `callback` will return the 32-byte transaction hash.

`PromiEvent`: A promise combined event emitter. Will be resolved when the transaction receipt is available. Additionally the following events are available:

- `"transactionHash"` returns `String`: Is fired right after the transaction is sent and a transaction hash is available.
- `"receipt"` returns `Object`: Is fired when the transaction receipt is available.
- `"error"` returns `Error`: Is fired if an error occurs during sending. On an out-of-gas error, the second parameter is the receipt.

**Example**

```javascript
const account = caver.klay.accounts.wallet.add('0x{private key}')

var code = "0x603d80600c6000396000f3007c01000000000000000000000000000000000000000000000000000000006000350463c6888fa18114602d57005b6007600435028060005260206000f3";

// using the callback
caver.klay.sendTransaction({
    from: account.address,
    data: code // deploying a contracrt
}, function(error, hash){
    ...
});

// using the promise
caver.klay.sendTransaction({
    from: account.address,
    to: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe',
    value: '1000000000000000'
})
.then(function(receipt){
    ...
});

// using the event emitter
caver.klay.sendTransaction({
    from: account.address,
    to: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe',
    value: '1000000000000000'
})
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
    ...
})
.on('error', console.error); // If an out-of-gas error, the second parameter is the receipt.
```
