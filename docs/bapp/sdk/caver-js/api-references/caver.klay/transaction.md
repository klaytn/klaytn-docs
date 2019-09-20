## call

```javascript
caver.klay.call(callObject [, defaultBlock] [, callback])
```
Executes a message call transaction, which is directly executed in the Klaytn
Virtual Machine of the node, but never mined into the blockchain.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| callObject | Object | A transaction object with the difference that for calls the from property is optional as well. [An encoded function call](../caver.klay.abi.md#encodefunctioncall) must be set in the data field of the transaction object. |
| defaultBlock | Number &#124; String | (optional) If you pass this parameter, it will not use the default block set with [caver.klay.defaultBlock](./block.md#defaultblock). |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

``Promise`` returns ``String``: The returned data of the call, *e.g.*, a smart contract functions return value.

**Example**

```javascript
> caver.klay.call({
    to: "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe", // contract address
    data: "0xc6888fa10000000000000000000000000000000000000000000000000000000000000003"
})
.then(console.log);

"0x000000000000000000000000000000000000000000000000000000000000000a"
```

## estimateGas

```javascript
caver.klay.estimateGas(callObject [, callback])
```
Executes a message call or transaction and returns the amount of the gas used for the simulated call/transaction.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| callObject | Object | A transaction object with the difference that for calls the from property is optional as well. [An encoded function call](../caver.klay.abi.md#encodefunctioncall) must be set in the data field of the transaction object. |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

``Promise`` returns ``Number`` - the used gas for the simulated call/transaction.

**Example**

```javascript
> caver.klay.estimateGas({
    to: "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe",
    data: "0xc6888fa10000000000000000000000000000000000000000000000000000000000000003"
})
.then(console.log);

40
```

## estimateComputationCost

```javascript
caver.klay.estimateComputationCost(callObject [, defaultBlock] [, callback])
```
Generates and returns an estimate of how much computation cost will be spent to execute the transaction.
Klaytn limits the computation cost of a transaction to `100000000` currently not to take too much time by a single transaction.
The transaction will not be added to the blockchain.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| callObject | Object | A transaction object with the difference that for calls the from property is optional as well. [An encoded function call](../caver.klay.abi.md#encodefunctioncall) must be set in the data field of the transaction object. |
| defaultBlock | Number &#124; String | (optional) If you don't pass this parameter, the default block set by [caver.klay.defaultBlock](./block.md#defaultblock) will be used. |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

``Promise`` returns ``Number`` - The amount of computation cost used.

**Example**

```javascript
> caver.klay.estimateComputationCost({
        to: '0xf796b2F18507Ec8F8C19e9F0c03092888093ebAc',
        data : '0xd14e62b80000000000000000000000000000000000000000000000000000000000000022'
    }).then(console.log);
0x5773

// With 'latest' block tag
> caver.klay.estimateComputationCost({
        to: '0xf796b2F18507Ec8F8C19e9F0c03092888093ebAc',
        data : '0xd14e62b80000000000000000000000000000000000000000000000000000000000000022'
    }, 'latest').then(console.log);
0x5773
```

## decodeTransaction

```javascript
caver.klay.decodeTransaction(rawTransaction)
```
Returns a transaction object containing all decoded values from the given `rawTransaction`, an RLP-encoded transaction.
The v, r, s and payerV, payerR, and payerS of the result returned by the decodeTransaction are the value of the 0th index of the signature of each sender and fee payer.

**NOTE** caver.klay.decodeTransaction is supported from **v1.0.1-rc.8**.  To use this feature, please install [v1.0.1-rc.8](https://www.npmjs.com/package/caver-js/v/1.0.1-rc.8) or higher.

**NOTE** To support multiple signature, `signature` and `feePayerSignature` properties have been added since caver-js [v1.2.0-rc.1](https://www.npmjs.com/package/caver-js/v/1.2.0-rc.1).

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| rawTransaction | String | RLP encoded transaction data. |

**Return Value**

| Type | Description |
| ---- | ----------- |
| Object | A transaction object. Depending on the transaction type, the returned transaction object has different properties. For the list of properties included in each transaction type, see [SendTransaction](#sendtransaction). |

**Example**

```javascript
// Basic Transaction
> caver.klay.decodeTransaction('0xf86b038505d21dba00843b9ac9ff94d03227635c90c7986f0e3a4e551cefbca8c5531685174876e8008026a06fc7412ad1801b4790e7a5a5097fdbef01bc9fe1b970d08232184d110226c221a04665f772edbc4ba4dfbf189d89a9b9cb1e5cdcea0fd5a8b1a497b9c275e5267c')
{ 
    type: 'LEGACY',
    nonce: '0x03',
    gasPrice: '0x05d21dba00',
    gas: '0x3b9ac9ff',
    to: '0xd03227635c90c7986f0e3a4e551cefbca8c55316',
    value: '0x174876e800',
    data: '0x',
    v: '0x26',
    r: '0x6fc7412ad1801b4790e7a5a5097fdbef01bc9fe1b970d08232184d110226c221',
    s: '0x4665f772edbc4ba4dfbf189d89a9b9cb1e5cdcea0fd5a8b1a497b9c275e5267c',
    signature: [ 
        '0x26',
        '0x6fc7412ad1801b4790e7a5a5097fdbef01bc9fe1b970d08232184d110226c221',
        '0x4665f772edbc4ba4dfbf189d89a9b9cb1e5cdcea0fd5a8b1a497b9c275e5267c' 
    ]
}

// Fee Delegation
> caver.klay.decodeTransaction('0x09f8dd2c8505d21dba00830dbba094a36960d00c9cbf10e80928eead73ff308193bde70194ad8d5b8c7da3746df7de39c41fa572d660aa8e91f847f845824e43a099c0a4c85bb9f2c0be2646b963201680e2f76128e4fd1f54d3f9cf80d1d117e7a069b62aa6640c8aa3606a67869fe062dde1c61a60aea5c5161550ff11ee71c24b946a4b71a6796c2fd376fb0526385e0783da86a039f847f845824e43a0bdfdc50649c8f52930a330b2e44d92f8943b28c7ff7edd8ff7f2f95e617c0d77a06e96bdd983494f6967f1a26d2f0ae991a4e8ebef1ac3c9029251a18c19002ab3')
{ 
    type: 'FEE_DELEGATED_VALUE_TRANSFER',
    nonce: '0x2c',
    gasPrice: '0x05d21dba00',
    gas: '0x0dbba0',
    to: '0xa36960d00c9cbf10e80928eead73ff308193bde7',
    value: '0x01',
    from: '0xad8d5b8c7da3746df7de39c41fa572d660aa8e91',
    v: '0x4e43',
    r: '0x99c0a4c85bb9f2c0be2646b963201680e2f76128e4fd1f54d3f9cf80d1d117e7',
    s: '0x69b62aa6640c8aa3606a67869fe062dde1c61a60aea5c5161550ff11ee71c24b',
    signature: [
        [ 
            '0x4e43',
            '0x99c0a4c85bb9f2c0be2646b963201680e2f76128e4fd1f54d3f9cf80d1d117e7',
            '0x69b62aa6640c8aa3606a67869fe062dde1c61a60aea5c5161550ff11ee71c24b' 
        ] 
    ],
    feePayer: '0x6a4b71a6796c2fd376fb0526385e0783da86a039',
    payerV: '0x4e43',
    payerR: '0xbdfdc50649c8f52930a330b2e44d92f8943b28c7ff7edd8ff7f2f95e617c0d77',
    payerS: '0x6e96bdd983494f6967f1a26d2f0ae991a4e8ebef1ac3c9029251a18c19002ab3',
    feePayerSignature: [ 
        [ 
            '0x4e43',
            '0xbdfdc50649c8f52930a330b2e44d92f8943b28c7ff7edd8ff7f2f95e617c0d77',
            '0x6e96bdd983494f6967f1a26d2f0ae991a4e8ebef1ac3c9029251a18c19002ab3' 
        ] 
    ]
}

// Partial Fee Delegation
> caver.klay.decodeTransaction('0x2af902ca0a8505d21dba00843b9ac9ff80809490b3e9a3770481345a7f17f22f16d020bccfd33eb901fe608060405234801561001057600080fd5b506101de806100206000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a72305820627ca46bb09478a015762806cc00c431230501118c7c26c30ac58c4e09e51c4f0029802180f845f84325a0d8cdc1219df8bbca8a00255420a5bec0f602e6266b76ce7dcf5b0b26bd7fe3b9a05557496a3a17f784c3eb40acbb526dfbc20ae6b00c633a0186d804cd9137b13e9433f524631e573329a550296f595c820d6c65213ff845f84325a041a4c4bf0e3039d04472beae4135a14c26ae4c88bad08d5f0acf61f7c0eb60dfa03d1658f38e5c2089d64985fb33cb13db2e41cde6958ba2cfcfaba685a7f565e2')
{ 
    type: 'FEE_DELEGATED_SMART_CONTRACT_DEPLOY_WITH_RATIO',
    nonce: '0x0a',
    gasPrice: '0x05d21dba00',
    gas: '0x3b9ac9ff',
    to: '0x',
    value: '0x',
    from: '0x90b3e9a3770481345a7f17f22f16d020bccfd33e',
    data: '0x608060405234801561001057600080fd5b506101de806100206000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a72305820627ca46bb09478a015762806cc00c431230501118c7c26c30ac58c4e09e51c4f0029',
    humanReadable: false,
    feeRatio: '0x21',
    codeFormat: '0x',
    v: '0x25',
    r: '0xd8cdc1219df8bbca8a00255420a5bec0f602e6266b76ce7dcf5b0b26bd7fe3b9',
    s: '0x5557496a3a17f784c3eb40acbb526dfbc20ae6b00c633a0186d804cd9137b13e',
    signature: [ 
        [ 
            '0x25',
            '0xd8cdc1219df8bbca8a00255420a5bec0f602e6266b76ce7dcf5b0b26bd7fe3b9',
            '0x5557496a3a17f784c3eb40acbb526dfbc20ae6b00c633a0186d804cd9137b13e' 
        ] 
    ],
    feePayer: '0x33f524631e573329a550296f595c820d6c65213f',
    payerV: '0x25',
    payerR: '0x41a4c4bf0e3039d04472beae4135a14c26ae4c88bad08d5f0acf61f7c0eb60df',
    payerS: '0x3d1658f38e5c2089d64985fb33cb13db2e41cde6958ba2cfcfaba685a7f565e2',
    feePayerSignature: [ 
        [ 
            '0x25',
            '0x41a4c4bf0e3039d04472beae4135a14c26ae4c88bad08d5f0acf61f7c0eb60df',
            '0x3d1658f38e5c2089d64985fb33cb13db2e41cde6958ba2cfcfaba685a7f565e2' 
        ] 
    ]
}
```

## getTransaction

```javascript
caver.klay.getTransaction(transactionHash [, callback])
```
Returns a transaction matching the given transaction hash.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| transactionHash | String | The transaction hash. |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `Object` - A transaction object its hash `transactionHash`:

| Name | Type | Description |
| --- | --- | --- |
| blockHash | 32-byte DATA | Hash of the block where this transaction was in. `null` when it is pending. |
| blockNumber | QUANTITY | Block number where this transaction was in. `null` when it is pending. |
| codeFormat | String | (optional) The code format of smart contract code. |
| feePayer | 20-byte DATA | (optional) Address of the fee payer. |
| feePayerSignatures | Array | (optional) An array of fee payer's signature objects. A signature object contains three fields (V, R, and S). V contains ECDSA recovery id. R contains ECDSA signature r while S contains ECDSA signature s. |
| feeRatio | QUANTITY | (optional) Fee ratio of the fee payer. If it is 30, 30% of the fee will be paid by the fee payer. 70% will be paid by the sender. |
| from | 20-byte DATA | Address of the sender. |
| gas | QUANTITY | Gas provided by the sender. |
| gasPrice | QUANTITY | Gas price provided by the sender in peb. |
| hash | 32-byte DATA | Hash of the transaction. |
| humanReadable | Boolean | (optional) `true` if the address is humanReadable, `false` if the address is not humanReadable. |
| key | String | (optional) Key of the newly created account. |
| input | DATA | (optional) The data sent along with the transaction. |
| nonce | QUANTITY | The number of transactions made by the sender prior to this one. |
| senderTxHash | 32-byte DATA | (optional) Hash of the tx without the fee payer's address and signature. This value is always the same as the value of `hash` for non fee-delegated transactions. |
| signatures | Array | An array of signature objects. A signature object contains three fields (V, R, and S). V contains ECDSA recovery id. R contains ECDSA signature r while S contains ECDSA signature s. |
| to | 20-byte DATA | Address of the receiver. `null` when it is a contract creation transaction. |
| transactionIndex | QUANTITY | Integer of the transaction index position in the block. `null` when it is pending. |
| type | String | A string representing the type of the transaction. |
| typeInt | QUANTITY | An integer representing the type of the transaction.  |
| value | QUANTITY | Value transferred in peb. |


**Example**

```javascript
> caver.klay.getTransaction('0x2d26f602cfbb4c662931592bf2c4ee18d29f09683be5b9e8d589ff935fca0b97')
  .then(console.log);
{ 
    blockHash: '0xd6f3bc2bd7853ed423677766b5332c3e55d900abf4252ede196661cd58e817a6',
    blockNumber: 141766,
    from: '0x8948Ab8526fDA9a7349Ee8FCa5372e46d0268777',
    gas: 20000000,
    gasPrice: '25000000000',
    hash: '0x2d26f602cfbb4c662931592bf2c4ee18d29f09683be5b9e8d589ff935fca0b97',
    input: '0x',
    nonce: 8,
    signatures:[{ 
        V: '0xfe9',
        R: '0x76a0ac07a371fe3849f46a115d62830e611e62fab91714bb66fe18a937557666',
        S: '0x1daace52366434ab11287d4f5ebe9c87f314e45d13f05093bbcdd5862fcf462e' 
    }],
    to: '0x2259cFDae62F9853f84298aAf20C999391B1c6a3',
    transactionIndex: 0,
    type: 'TxTypeLegacyTransaction',
    typeInt: 0,
    value: '1' 
}
```

## getTransactionBySenderTxHash

```javascript
caver.klay.getTransactionBySenderTxHash(senderTxHash [, callback])
```
Returns the information about the transaction identified by the given `senderTxHash`.
Please note that this API returns correct result only if the indexing feature is enabled in the node by `--sendertxhashindexing`.
Use [isSenderTxHashIndexingEnabled](./config.md#issendertxhashindexingenabled) to check if the indexing feature is enabled or not.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| senderTxHash | String | Hash of a transaction that is signed only by the sender. See [SenderTxHash](../../../../../klaytn/design/transactions/README.md#sendertxhash). |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `Object` - A transaction object, or `null` when no transaction was found:

| Name | Type | Description |
| --- | --- | --- |
| blockHash | 32-byte DATA | Hash of the block where this transaction was in. `null` when it is pending. |
| blockNumber | QUANTITY | Block number where this transaction was in. `null` when it is pending. |
| codeFormat | String | (optional) The code format of smart contract code. |
| feePayer | 20-byte DATA | Address of the fee payer. |
| feePayerSignatures | Array | An array of fee payer's signature objects. A signature object contains three fields (V, R, and S). V contains ECDSA recovery id. R contains ECDSA signature r while S contains ECDSA signature s. |
| feeRatio | QUANTITY | (optional) Fee ratio of the fee payer. If it is 30, 30% of the fee will be paid by the fee payer. 70% will be paid by the sender. |
| from | 20-byte DATA | Address of the sender. |
| gas | QUANTITY | Gas provided by the sender. |
| gasPrice | QUANTITY | Gas price provided by the sender in peb. |
| hash | 32-byte DATA | Hash of the transaction. |
| humanReadable | Boolean | (optional) `true` if the address is humanReadable, `false` if the address is not humanReadable. |
| key | String | (optional) Key of the newly created account. |
| input | DATA | (optional) The data sent along with the transaction. |
| nonce | QUANTITY | The number of transactions made by the sender prior to this one. |
| senderTxHash | 32-byte DATA | Hash of a transaction that is signed only by the sender. See [SenderTxHash](../../../../../klaytn/design/transactions/README.md#sendertxhash). This value is always the same as `hash` for non fee-delegated transactions. |
| signatures | Array | An array of signature objects. A signature object contains three fields (V, R, and S). V contains ECDSA recovery id. R contains ECDSA signature r while S contains ECDSA signature s. |
| to | 20-byte DATA | Address of the receiver. `null` when it is a contract creation transaction. |
| transactionIndex | QUANTITY | Integer of the transaction index position in the block. `null` when it is pending. |
| type | String | A string representing the type of the transaction. |
| typeInt | QUANTITY | An integer representing the type of the transaction.  |
| value | QUANTITY | Value transferred in peb. |


**Example**

```javascript
> caver.klay.getTransactionBySenderTxHash('0x8c0b092fed92a6619666efd582f7d71fbc3d784781072dd26741715b3731ab22').then(console.log);
{
    blockHash: '0x56e950bd9283c11ad2dab7cfcbacd9164aff2f6cbeb99dd2a7b754eb210753af',
    blockNumber: 773,
    codeFormat: '0x0',
    feePayer: '0xabae1fe62aebbfabeff072eb815d54c3359a45f4',
    feePayerSignatures: [
        { 
            V: '0x4e43',
            R: '0x16293eefe0f13228ae47af67ecfe659448d8f80d9667a67a25d82c72b5ee246a',
            S: '0x3c4043324bee41a6cbab905d3b4e740a3a18fde021260fc1196f73d2ab037b91' } ],
    feeRatio: '0x14',
    from: '0x3F0E31836C7AABb4C9e9B19d5D61359a9139E949',
    gas: 900000,
    gasPrice: '25000000000',
    hash: '0x2ab7665d25f8f64969fa03b8d5e40a70485bb56a4e72ca2fe1e467fff904c173',
    humanReadable: false,
    input: '0x6080604052600080556040516020806101fa8339810180604052810190808051906020019092919050505080600081905550506101b9806100416000396000f300608060405260043610610062576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd1461006757806342cbb15c14610092578063a87d942c146100bd578063d14e62b8146100e8575b600080fd5b34801561007357600080fd5b5061007c610108565b6040518082815260200191505060405180910390f35b34801561009e57600080fd5b506100a761010e565b6040518082815260200191505060405180910390f35b3480156100c957600080fd5b506100d2610116565b6040518082815260200191505060405180910390f35b6101066004803603810190808035906020019092919050505061014c565b005b60005481565b600043905090565b60007f7197668b8690d2324050bc9ad83b2b5ca0b3f5336cb178ffa2aa07006b51b65160405160405180910390a1600054905090565b7fe8451a9161f9159bc887328b634789768bd596360ef07c5a5cbfb927c44051f9816040518082815260200191505060405180910390a180600081905550505600a165627a7a723058203cb41ebe3d7128a72c997645693c64789a9b5fdeae26158fb28b55e567e805c700290000000000000000000000000000000000000000000000000000000000000001',
    nonce: 9,
    senderTxHash: '0x8c0b092fed92a6619666efd582f7d71fbc3d784781072dd26741715b3731ab22',
    signatures: [
        { 
            V: '0x4e43',
            R: '0x1b48ee0508d242c9568d7e09212d62137080d68d86c1d067b31b4bb4196c9960',
            S: '0x24982f60b37859d7c39d7bd9c00b446196b3a08b27f80dbc9ceca8ee52513b11' 
        } 
    ],
    to: null,
    transactionIndex: 0,
    type: 'TxTypeFeeDelegatedSmartContractDeployWithRatio',
    typeInt: 42,
    value: '1'
}
```

## getTransactionFromBlock

```javascript
caver.klay.getTransactionFromBlock(hashStringOrNumber, indexNumber [, callback])
```

Returns a transaction based on a block hash or number and the transactions index position.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| hashStringOrNumber | String | A block number or hash. Or the string ``"genesis"``, ``"latest"`` or ``"pending"``. |
| indexNumber | Number | The transactions index position. |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Object` - A transaction object, see [caver.klay.getTransaction](#gettransaction)

**Examples**

```javascript
> caver.klay.getTransactionFromBlock('0x4534534534', 2).then(console.log);
// see caver.klay.getTransaction
```

## getTransactionReceipt

```javascript
caver.klay.getTransactionReceipt(hash [, callback])
```
Returns the receipt of a transaction by transaction hash.


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| hash | String | The transaction hash |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Object` - A transaction receipt object, or `null` when no receipt was found:

| Name | Type | Description |
| --- | --- | --- |
| blockHash | 32-byte String | Hash of the block where this transaction was in. |
| blockNumber | Number | Block number where this transaction was in. |
| codeFormat | String | (optional) The code format of smart contract code. |
| contractAddress | DATA | The contract address created, if the transaction was a contract creation, otherwise `null`. |
| feePayer | 20-byte DATA | (optional) Address of the fee payer. |
| feePayerSignatures | Array | (optional) An array of fee payer's signature objects. A signature object contains three fields (V, R, and S). V contains ECDSA recovery id. R contains ECDSA signature r while S contains ECDSA signature s. |
| feeRatio | QUANTITY | (optional) Fee ratio of the fee payer. If it is 30, 30% of the fee will be paid by the fee payer. 70% will be paid by the sender. |
| from | 20-byte DATA | Address of the sender. |
| gas | QUANTITY | Gas provided by the sender. |
| gasPrice | QUANTITY | Gas price provided by the sender in peb. |
| gasUsed | QUANTITY | The amount of gas used by this specific transaction alone. |
| humanReadable | Boolean | (optional) `true` if the address is humanReadable, `false` if the address is not humanReadable. |
| key | String | (optional) Key of the newly created account. |
| input | DATA | (optional) The data sent along with the transaction. |
| logs | Array | Array of log objects, which this transaction generated. |
| logsBloom | 256-byte DATA | Bloom filter for light clients to quickly retrieve related logs. |
| nonce | QUANTITY | The number of transactions made by the sender prior to this one. |
| senderTxHash | 32-byte DATA | (optional) Hash of a transaction that is signed only by the sender. See [SenderTxHash](../../../../../klaytn/design/transactions/README.md#sendertxhash). This value is always the same as `transactionHash` for non fee-delegated transactions. |
| signatures | Array | An array of signature objects. A signature object contains three fields (V, R, and S). V contains ECDSA recovery id. R contains ECDSA signature r while S contains ECDSA signature s. |
| status | Boolean | `true` if the transaction was successful, `false` if the Klaytn Virtual Machine reverted the transaction. |
| txError | QUANTITY | (optional) detailed error code if `status` is equal to zero. |
| to | 20-byte DATA | Address of the receiver. `null` when it is a contract creation transaction. |
| transactionHash | 32-byte DATA | Hash of the transaction. |
| transactionIndex | QUANTITY | Integer of the transaction index position in the block. |
| type | String | A string representing the type of the transaction. |
| typeInt | QUANTITY | An integer representing the type of the transaction. |
| value | QUANTITY | Value transferred in peb. |

**Example**

```javascript
> caver.klay.getTransactionReceipt('0x9108f22693de7b16ece4db2c8d11c004feae31973acc2ecb9dbd61cd57bb0d7b')
  .then(console.log);
{ 
    blockHash: '0x62f0b4e4d2c0fdeda968bf82688a6b4426fb0b75c83ebd39a04633e087060f00',
    blockNumber: 140949,
    contractAddress: null,
    from: '0x8948ab8526fda9a7349ee8fca5372e46d0268777',
    gas: '0x1312d00',
    gasPrice: '0x5d21dba00',
    gasUsed: 21000,
    input: '0x',
    logs: [],
    logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    nonce: '0x6',
    signatures: [{ 
        V:'0xfe9',
        R:'0x95e5fc90a27b4a364f4047072474147fb8885213acbc4ac89902da28ddea3931',
        S:'0xeebe7d37c047f6a7b841da5c6ff2849eb6f99b689666da30f48b60a12028e59' 
    }],
    status: true,
    to: '0x2259cfdae62f9853f84298aaf20c999391b1c6a3',
    transactionHash: '0x9108f22693de7b16ece4db2c8d11c004feae31973acc2ecb9dbd61cd57bb0d7b',
    transactionIndex: 0,
    type: 'TxTypeLegacyTransaction',
    typeInt: 0,
    value: '0x1'
}
```

## getTransactionReceiptBySenderTxHash

```javascript
caver.klay.getTransactionReceiptBySenderTxHash(senderTxHash [, callback])
```
Returns the receipt of a transaction identified by the given `senderTxHash`.

**NOTE**: The receipt is not available for pending transactions.
Please note that this API returns correct result only if the indexing feature is enabled in the node by `--sendertxhashindexing`.
This can be checked by calling [isSenderTxHashIndexingEnabled](./config.md#issendertxhashindexingenabled).


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| senderTxHash | String | Hash of a transaction that is signed only by the sender. See [SenderTxHash](../../../../../klaytn/design/transactions/README.md#sendertxhash). |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Object` - A transaction receipt object, or `null` when no receipt was found:

| Name | Type | Description |
| --- | --- | --- |
| blockHash | 32-byte String | Hash of the block where this transaction was in. |
| blockNumber | Number | Block number where this transaction was in. |
| codeFormat | String | (optional) The code format of smart contract code. |
| contractAddress | DATA | The contract address created, if the transaction was a contract creation, otherwise `null`. |
| feePayer | 20-byte DATA | Address of the fee payer. |
| feePayerSignatures | Array | An array of fee payer's signature objects. A signature object contains three fields (V, R, and S). V contains ECDSA recovery id. R contains ECDSA signature r while S contains ECDSA signature s. |
| feeRatio | QUANTITY | (optional) Fee ratio of the fee payer. If it is 30, 30% of the fee will be paid by the fee payer. 70% will be paid by the sender. |
| from | 20-byte DATA | Address of the sender. |
| gas | QUANTITY | Gas provided by the sender. |
| gasPrice | QUANTITY | Gas price provided by the sender in peb. |
| gasUsed | QUANTITY | The amount of gas used by this specific transaction alone. |
| humanReadable | Boolean | (optional) `true` if the address is humanReadable, `false` if the address is not humanReadable. |
| key | String | (optional) Key of the newly created account. |
| input | DATA | (optional) The data sent along with the transaction. |
| logs | Array | Array of log objects, which this transaction generated. |
| logsBloom | 256-byte DATA | Bloom filter for light clients to quickly retrieve related logs. |
| nonce | QUANTITY | The number of transactions made by the sender prior to this one. |
| senderTxHash | 32-byte DATA | Hash of a transaction that is signed only by the sender. See [SenderTxHash](../../../../../klaytn/design/transactions/README.md#sendertxhash). This value is always the same as `transactionHash` for non fee-delegated transactions. |
| signatures | Array | An array of signature objects. A signature object contains three fields (V, R, and S). V contains ECDSA recovery id. R contains ECDSA signature r while S contains ECDSA signature s. |
| status | Boolean | `true` if the transaction was successful, `false` if the Klaytn Virtual Machine reverted the transaction. |
| txError | QUANTITY | (optional) detailed error code if `status` is equal to zero. |
| to | 20-byte DATA | Address of the receiver. `null` when it is a contract creation transaction. |
| transactionHash | 32-byte DATA | Hash of the transaction. |
| transactionIndex | QUANTITY | Integer of the transaction index position in the block. |
| type | String | A string representing the type of the transaction. |
| typeInt | QUANTITY | An integer representing the type of the transaction. |
| value | QUANTITY | Value transferred in peb. |

**Example**

```javascript
> caver.klay.getTransactionReceiptBySenderTxHash('0x8c0b092fed92a6619666efd582f7d71fbc3d784781072dd26741715b3731ab22').then(console.log);
{
    blockHash: '0x56e950bd9283c11ad2dab7cfcbacd9164aff2f6cbeb99dd2a7b754eb210753af',
    blockNumber: 773,
    codeFormat: '0x0',
    contractAddress: '0x71163abc3b051bC2Af71e7c68eD0ffeA6182cde1',
    feePayer: '0xabae1fe62aebbfabeff072eb815d54c3359a45f4',
    feePayerSignatures: [
        { 
            V: '0x4e43',
            R: '0x16293eefe0f13228ae47af67ecfe659448d8f80d9667a67a25d82c72b5ee246a',
            S: '0x3c4043324bee41a6cbab905d3b4e740a3a18fde021260fc1196f73d2ab037b91' 
        }
    ],
    feeRatio: '0x14',
    from: '0x3f0e31836c7aabb4c9e9b19d5d61359a9139e949',
    gas: '0xdbba0',
    gasPrice: '0x5d21dba00',
    gasUsed: 235217,
    humanReadable: false,
    input: '0x6080604052600080556040516020806101fa8339810180604052810190808051906020019092919050505080600081905550506101b9806100416000396000f300608060405260043610610062576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd1461006757806342cbb15c14610092578063a87d942c146100bd578063d14e62b8146100e8575b600080fd5b34801561007357600080fd5b5061007c610108565b6040518082815260200191505060405180910390f35b34801561009e57600080fd5b506100a761010e565b6040518082815260200191505060405180910390f35b3480156100c957600080fd5b506100d2610116565b6040518082815260200191505060405180910390f35b6101066004803603810190808035906020019092919050505061014c565b005b60005481565b600043905090565b60007f7197668b8690d2324050bc9ad83b2b5ca0b3f5336cb178ffa2aa07006b51b65160405160405180910390a1600054905090565b7fe8451a9161f9159bc887328b634789768bd596360ef07c5a5cbfb927c44051f9816040518082815260200191505060405180910390a180600081905550505600a165627a7a723058203cb41ebe3d7128a72c997645693c64789a9b5fdeae26158fb28b55e567e805c700290000000000000000000000000000000000000000000000000000000000000001',
    logs: [],
    logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    nonce: '0x9',
    senderTxHash: '0x8c0b092fed92a6619666efd582f7d71fbc3d784781072dd26741715b3731ab22',
    signatures: [ 
        { 
            V: '0x4e43',
            R: '0x1b48ee0508d242c9568d7e09212d62137080d68d86c1d067b31b4bb4196c9960',
            S: '0x24982f60b37859d7c39d7bd9c00b446196b3a08b27f80dbc9ceca8ee52513b11' 
        }
    ],
    status: true,
    to: null,
    transactionHash: '0x2ab7665d25f8f64969fa03b8d5e40a70485bb56a4e72ca2fe1e467fff904c173',
    transactionIndex: 0,
    type: 'TxTypeFeeDelegatedSmartContractDeployWithRatio',
    typeInt: 42,
    value: '0x1'
}
```


## sendSignedTransaction
Sends an already signed transaction, generated using `caver.klay.accounts.signTransaction`
```javascript
caver.klay.sendSignedTransaction(signedTransactionData [, callback])
```

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| signedTransactionData | String | Signed transaction data in HEX format. |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

| Type | Description |
| --- | --- |
| PromiEvent | A promise combined event emitter. Will be resolved when the transaction receipt is available. |

For PromiEvent, the following events are available:

- ``"transactionHash"`` returns ``String``: Is fired right after the transaction is sent and a transaction hash is available.
- ``"receipt"`` returns ``Object``: Is fired when the transaction receipt is available.
- ``"error"`` returns ``Error``: Is fired if an error occurs during sending. On an out-of-gas error, the second parameter is the receipt.

**Example**

```javascript
const privateKey = "PRIVATE_KEY";

const txObject = {
  gasPrice: '25000000000',
  gasLimit: '30000',
  to: '0x0000000000000000000000000000000000000000',
  data: '0xff',
  value: caver.utils.toPeb(1, 'KLAY'),
};

caver.klay.accounts.signTransaction(txObject, privateKey)
  .then(({ rawTransaction }) => {
    caver.klay.sendSignedTransaction(rawTransaction)
      .on('receipt', console.log)
  });
```


## sendTransaction
- [sendTransaction (Legacy)](./sendtx_legacy.md#sendtransaction-legacy)
- [sendTransaction (VALUE_TRANSFER)](./sendtx_value_transfer.md#sendtransaction-value_transfer)
- [sendTransaction (FEE_DELEGATED_VALUE_TRANSFER)](./sendtx_value_transfer.md#sendtransaction-fee_delegated_value_transfer)
- [sendTransaction (FEE_DELEGATED_VALUE_TRANSFER_WITH_RATIO)](./sendtx_value_transfer.md#sendtransaction-fee_delegated_value_transfer_with_ratio)
- [sendTransaction (VALUE_TRANSFER_MEMO)](./sendtx_value_transfer_memo.md#sendtransaction-value_transfer_memo)
- [sendTransaction (FEE_DELEGATED_VALUE_TRANSFER_MEMO)](./sendtx_value_transfer_memo.md#sendtransaction-fee_delegated_value_transfer_memo)
- [sendTransaction (FEE_DELEGATED_VALUE_TRANSFER_MEMO_WITH_RATIO)](./sendtx_value_transfer_memo.md#sendtransaction-fee_delegated_value_transfer_memo_with_ratio)
- [sendTransaction (ACCOUNT_UPDATE)](./sendtx_account_update.md#sendtransaction-account_update)
- [sendTransaction (FEE_DELEGATED_ACCOUNT_UPDATE)](./sendtx_account_update.md#sendtransaction-fee_delegated_account_update)
- [sendTransaction (FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO)](./sendtx_account_update.md#sendtransaction-fee_delegated_account_update_with_ratio)
- [sendTransaction (SMART_CONTRACT_DEPLOY)](./sendtx_smart_contract_deploy.md#sendtransaction-smart_contract_deploy)
- [sendTransaction (FEE_DELEGATED_SMART_CONTRACT_DEPLOY)](./sendtx_smart_contract_deploy.md#sendtransaction-fee_delegated_smart_contract_deploy)
- [sendTransaction (FEE_DELEGATED_SMART_CONTRACT_DEPLOY_WITH_RATIO)](./sendtx_smart_contract_deploy.md#sendtransaction-fee_delegated_smart_contract_deploy_with_ratio)
- [sendTransaction (SMART_CONTRACT_EXECUTION)](./sendtx_smart_contract_execution.md#sendtransaction-smart_contract_execution)
- [sendTransaction (FEE_DELEGATED_SMART_CONTRACT_EXECUTION)](./sendtx_smart_contract_execution.md#sendtransaction-fee_delegated_smart_contract_execution)
- [sendTransaction (FEE_DELEGATED_SMART_CONTRACT_EXECUTION_WITH_RATIO)](./sendtx_smart_contract_execution.md#sendtransaction-fee_delegated_smart_contract_execution_with_ratio)
- [sendTransaction (CANCEL)](./sendtx_cancel.md#sendtransaction-cancel)
- [sendTransaction (FEE_DELEGATED_CANCEL)](./sendtx_cancel.md#sendtransaction-fee_delegated_cancel)
- [sendTransaction (FEE_DELEGATED_CANCEL_WITH_RATIO)](./sendtx_cancel.md#sendtransaction-fee_delegated_cancel_with_ratio)


## signTransaction

```javascript
caver.klay.signTransaction(transactionObject [, callback])
```
Signs a transaction. This account needs to be unlocked.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| transactionObject | Object | The transaction data to sign. |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `Object` - The RLP encoded transaction. The `raw` property can be used to send the transaction using [caver.klay.sendSignedTransaction](#sendsignedtransaction).

**Example**

```javascript
> caver.klay.signTransaction({
    nonce: 0,
    from: "0xEB014f8c8B418Db6b45774c326A0E64C78914dC0",
    gasPrice: '25000000000',
    gas: "21000",
    to: '0x3535353535353535353535353535353535353535',
    value: "1000000000000000000",
    data: ""
}).then(console.log);

{
    raw: '0xf86c808504a817c800825208943535353535353535353535353535353535353535880de0b6b3a76400008025a04f4c17305743700648bc4f6cd3038ec6f6af0df73e31757007b7f59df7bee88da07e1941b264348e80c78c4027afc65a87b0a5e43e86742b8ca0823584c6788fd0',
    tx: {
        nonce: '0x0',
        gasPrice: '25000000000',
        gas: '0x5208',
        to: '0x3535353535353535353535353535353535353535',
        value: '0xde0b6b3a7640000',
        input: '0x',
        v: '0x25',
        r: '0x4f4c17305743700648bc4f6cd3038ec6f6af0df73e31757007b7f59df7bee88d',
        s: '0x7e1941b264348e80c78c4027afc65a87b0a5e43e86742b8ca0823584c6788fd0',
        hash: '0xda3be87732110de6c1354c83770aae630ede9ac308d9f7b399ecfba23d923384'
    }
}
```
