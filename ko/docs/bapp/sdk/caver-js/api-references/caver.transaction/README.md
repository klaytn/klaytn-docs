# caver.transaction <a id="caver-transaction"></a>

`caver.transaction` is a package that provides functionality related to Transaction.

## Class <a id="class"></a>

Each transaction class is described in detail with the table below:

|                        | 일반 트랜잭션                                                   | 수수료 위임 트랜잭션                                                                                | 수수료 부분 위임 트랜잭션                                                                                                       |
|:---------------------- |:--------------------------------------------------------- |:------------------------------------------------------------------------------------------ |:-------------------------------------------------------------------------------------------------------------------- |
| LegacyTransaction      | [LegacyTransaction](basic.md#legacytransaction)           | N/A                                                                                        | N/A                                                                                                                  |
| ValueTransfer          | [ValueTransfer](basic.md#valuetransfer)                   | [FeeDelegatedValueTransfer](fee-delegation.md#feedelegatedvaluetransfer)                   | [FeeDelegatedValueTransferWithRatio](partial-fee-delegation.md#feedelegatedvaluetransferwithratio)                   |
| ValueTransferMemo      | [ValueTransferMemo](basic.md#valuetransfermemo)           | [FeeDelegatedValueTransferMemo](fee-delegation.md#feedelegatedvaluetransfermemo)           | [FeeDelegatedValueTransferMemoWithRatio](partial-fee-delegation.md#feedelegatedvaluetransfermemowithratio)           |
| SmartContractDeploy    | [SmartContractDeploy](basic.md#smartcontractdeploy)       | [FeeDelegatedSmartContractDeploy](fee-delegation.md#feedelegatedsmartcontractdeploy)       | [FeeDelegatedSmartContractDeployWithRatio](partial-fee-delegation.md#feedelegatedsmartcontractdeploywithratio)       |
| SmartContractExecution | [SmartContractExecution](basic.md#smartcontractexecution) | [FeeDelegatedSmartContractExecution](fee-delegation.md#feedelegatedsmartcontractexecution) | [FeeDelegatedSmartContractExecutionWithRatio](partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio) |
| AccountUpdate          | [AccountUpdate](basic.md#accountupdate)                   | [FeeDelegatedAccountUpdate](fee-delegation.md#feedelegatedaccountupdate)                   | [FeeDelegatedAccountUpdateWithRatio](partial-fee-delegation.md#feedelegatedaccountupdatewithratio)                   |
| Cancel                 | [Cancel](basic.md#cancel)                                 | [FeeDelegatedCancel](fee-delegation.md#feedelegatedcancel)                                 | [FeeDelegatedCancelWithRatio](partial-fee-delegation.md#feedelegatedcancelwithratio)                                 |
| ChainDataAnchoring     | [ChainDataAnchoring](basic.md#chaindataanchoring)         | [FeeDelegatedChainDataAnchoring](fee-delegation.md#feedelegatedchaindataanchoring)         | [FeeDelegatedChainDataAnchoringWithRatio](partial-fee-delegation.md#feedelegatedchaindataanchoringwithratio)         |


## caver.transaction.decode <a id="caver-transaction-decode"></a>

```javascript
caver.transaction.decode(rlpEncoded)
```

Decodes RLP-encoded transaction string, a raw transaction, and returns a [Transaction][] instance.

**매개변수**

| 명칭         | 타입     | 설명                                          |
| ---------- | ------ | ------------------------------------------- |
| rlpEncoded | string | A RLP-encoded transaction string to decode. |

**리턴값**

| 타입     | 설명                                                                                         |
| ------ | ------------------------------------------------------------------------------------------ |
| object | An instance of [Transaction][]. For details of each transaction, refer to [Transaction][]. |

**예시**

```javascript
> caver.transaction.decode('0x08f87...')
ValueTransfer {
    _type: 'TxTypeValueTransfer',
    _from: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
    _gas: '0xf4240',
    _nonce: '0x4d2',
    _gasPrice: '0x19',
    _signatures: [ 
        SignatureData { _v: '0x25', _r: '0xf3d0c...', _s: '0x6748a...' }
    ],
    _to: '0x7b65b75d204abed71587c9e519a89277766ee1d0',
    _value: '0xa'
}
```

## transaction.sign <a id="transaction-sign"></a>

```javascript
transaction.sign(keyring [, index] [, hasher])
```

Signs the transaction as a transaction sender with the private key(s) in the `keyring` and appends `signatures` in the transaction object.

For [Account Update] transaction, use [roleAccountUpdateKey], or otherwise, use [roleTransactionKey] in [RoleBasedKeyring][]. If the user has not defined an `index`, `transaction.sign` signs the transaction using all the private keys used by the role. If `index` is defined, the `transaction.sign` signs the transaction using only one private key at the given index.

**매개변수**

| 명칭      | 타입                   | 설명                                                                                                                                                                                                                                                                                   |
| ------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| keyring | object &#124; string | A private key string ([KlaytnWalletKey][] format is also allowed) or an instance of Keyring ([SingleKeyring][], [MultipleKeyring][] or [RoleBasedKeyring][]). If a private key string or a [KlaytnWalletKey][] is passed as a parameter, the keyring instance is created internally. |
| index   | number               | (optional) The index of the private key you want to use. The index must be less than the length of the array of the private keys defined for each role. If an index is not defined, this method will use all the private keys.                                                       |
| hasher  | Function             | (optional) The hash function to get the hash of the transaction.                                                                                                                                                                                                                     |

**리턴값**

`Promise` returning `object`: The signed transaction.

| 타입     | 설명                                                                                                |
| ------ | ------------------------------------------------------------------------------------------------- |
| object | An instance of signed [Transaction][]. The signature is appended to the `transaction.signatures`. |

**예시**

```javascript
// This example uses the ValueTransfer transaction.
> const transaction = caver.transaction.valueTransfer.create({
    from: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    value: 1,
    gas: 30000,
})

> const customHasher = () => { ... }

// Sign a transaction with the roleBasedKeyring which use two private keys for roleTransactionKey
> transaction.sign(roleBasedKeyring).then(console.log)
ValueTransfer {
    _type: 'TxTypeValueTransfer',
    _from: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _gas: '0x7530',
    _signatures: [
        SignatureData { _v: '0x4e43', _r: '0xd78a2...', _s: '0x379e9...' },
        SignatureData { _v: '0x4e43', _r: '0x70a58...', _s: '0x2ab28...' }
    ],
    _to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    _value: '0x1',
    _chainId: '0x2710',
    _gasPrice: '0x5d21dba00',
    _nonce: '0x0'
}

// Sign a transaction with the roleBasedKeyring which use two private keys for roleTransactionKey and index
> transaction.sign(roleBasedKeyring, 1).then(console.log)
ValueTransfer {
    _type: 'TxTypeValueTransfer',
    _from: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _gas: '0x7530',
    _signatures: [
        SignatureData { _v: '0x4e43', _r: '0x70a58...', _s: '0x2ab28...' }
    ],
    _to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    _value: '0x1',
    _chainId: '0x2710',
    _gasPrice: '0x5d21dba00',
    _nonce: '0x0'
}

// Sign a transaction with the roleBasedKeyring which use two private keys for roleTransactionKey and hasher
> transaction.sign(roleBasedKeyring, customHasher).then(console.log)
ValueTransfer {
    _type: 'TxTypeValueTransfer',
    _from: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _gas: '0x7530',
    _signatures: [
        SignatureData { _v: '0x4e44', _r: '0x7a8b6...', _s: '0x17139...' },
        SignatureData { _v: '0x4e43', _r: '0x7f978...', _s: '0x1a532...' }
    ],
    _to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    _value: '0x1',
    _chainId: '0x2710',
    _gasPrice: '0x5d21dba00',
    _nonce: '0x0'
}

// Sign a transaction with the roleBasedKeyring which use two private keys for roleTransactionKey, index and hasher
> transaction.sign(roleBasedKeyring, 1, customHasher).then(console.log)
ValueTransfer {
    _type: 'TxTypeValueTransfer',
    _from: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _gas: '0x7530',
    _signatures: [
        SignatureData { _v: '0x4e43', _r: '0x7f978...', _s: '0x1a532...' }
    ],
    _to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    _value: '0x1',
    _chainId: '0x2710',
    _gasPrice: '0x5d21dba00',
    _nonce: '0x0'
}
```

## transaction.signAsFeePayer <a id="transaction-signasfeepayer"></a>

```javascript
transaction.signAsFeePayer(keyring [, index] [, hasher])
```

Signs the transaction as a transaction `fee payer` and appends `feePayerSignatures` in the transaction object with the private key(s) in the `keyring`.

For signing a transaction as a fee payer, use [roleFeePayerKey] in `keyring`. If the user has not defined an `index`, `transaction.signAsFeePayer` signs the transaction using all the private keys used by the role. If `index` is defined, the `transaction.signAsFeePayer` signs the transaction using only one private key at the given index.

If the `transaction.feePayer` is not defined, the address of the given keyring is set to `transaction.feePayer`.

If the `keyring` to be used for signing the transaction was added to `caver.wallet`, you can use [caver.wallet.signAsFeePayer](../caver.wallet/README.md#caver-wallet-signasfeepayer).

**NOTE** This function works only for "fee-delegated" transactions or "fee-delegated with ratio" transactions.

**매개변수**

| 명칭      | 타입                   | 설명                                                                                                                                                                                                                                                                                   |
| ------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| keyring | object &#124; string | A private key string ([KlaytnWalletKey][] format is also allowed) or an instance of Keyring ([SingleKeyring][], [MultipleKeyring][] or [RoleBasedKeyring][]). If the private key string or [KlaytnWalletKey][] is passed as a parameter, the keyring instance is created internally. |
| index   | number               | (optional) The index of the private key you want to use. The index must be less than the length of the array of the private keys defined for each role. If an index is not defined, this method will use all the private keys.                                                       |
| hasher  | Function             | (optional) The hash function to get the hash of the transaction.                                                                                                                                                                                                                     |

**리턴값**

`Promise` returning `object`: The signed transaction.

| 타입     | 설명                                                                                                        |
| ------ | --------------------------------------------------------------------------------------------------------- |
| object | An instance of signed [Transaction][]. The signature is appended to the `transaction.feePayerSignatures`. |

**예시**

```javascript
// This example uses the FeeDelegatedValueTransfer transaction.
> const transaction = caver.transaction.feeDelegatedValueTransfer.create({
    from: '0x6fddbcb99d31b8755c2b840a367f53eea4b4f45c',
    to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    value: 1,
    gas: 30000,
})

> const customHasher = () => { ... }

// Sign a transaction with the address of RoleBasedKeyring which use two private keys for roleFeePayerKey
> transaction.signAsFeePayer(roleBasedKeyring).then(console.log)
FeeDelegatedValueTransfer {
    _type: 'TxTypeFeeDelegatedValueTransfer',
    _from: '0x6fddbcb99d31b8755c2b840a367f53eea4b4f45c',
    _gas: '0x7530',
    _signatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
    _feePayer: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _feePayerSignatures: [
        SignatureData { _v: '0x4e44', _r: '0x7010e...', _s: '0x65d6b...' },
        SignatureData { _v: '0x4e43', _r: '0x96ef2...', _s: '0x77f34...' }
    ],
    _to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    _value: '0x1',
    _chainId: '0x2710',
    _gasPrice: '0x5d21dba00',
    _nonce: '0x0'
}

// Sign a transaction with the address of RoleBasedKeyring which use two private keys for roleFeePayerKey and index
> transaction.signAsFeePayer(roleBasedKeyring, 1).then(console.log)
FeeDelegatedValueTransfer {
    _type: 'TxTypeFeeDelegatedValueTransfer',
    _from: '0x6fddbcb99d31b8755c2b840a367f53eea4b4f45c',
    _gas: '0x7530',
    _signatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
    _feePayer: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _feePayerSignatures: [
        SignatureData { _v: '0x4e43', _r: '0x96ef2...', _s: '0x77f34...' }
    ],
    _to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    _value: '0x1',
    _chainId: '0x2710',
    _gasPrice: '0x5d21dba00',
    _nonce: '0x0'
}

// Sign a transaction with the address of RoleBasedKeyring which use two private keys for roleFeePayerKey and hasher
> transaction.signAsFeePayer(roleBasedKeyring, customHasher).then(console.log)
FeeDelegatedValueTransfer {
    _type: 'TxTypeFeeDelegatedValueTransfer',
    _from: '0x6fddbcb99d31b8755c2b840a367f53eea4b4f45c',
    _gas: '0x7530',
    _signatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
    _feePayer: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _feePayerSignatures: [
        SignatureData { _v: '0x4e43', _r: '0xe48bf...', _s: '0x1cf36...' },
        SignatureData { _v: '0x4e43', _r: '0x82976...', _s: '0x3c5e0...' }
    ],
    _to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    _value: '0x1',
    _chainId: '0x2710',
    _gasPrice: '0x5d21dba00',
    _nonce: '0x0'
}

// Sign a transaction with the address of RoleBasedKeyring which use two private keys for roleFeePayerKey, index and hasher
> transaction.signAsFeePayer(roleBasedKeyring, 1, customHasher).then(console.log)
FeeDelegatedValueTransfer {
    _type: 'TxTypeFeeDelegatedValueTransfer',
    _from: '0x6fddbcb99d31b8755c2b840a367f53eea4b4f45c',
    _gas: '0x7530',
    _signatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
    _feePayer: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _feePayerSignatures: [
        SignatureData { _v: '0x4e43', _r: '0x82976...', _s: '0x3c5e0...' }
    ],
    _to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    _value: '0x1',
    _chainId: '0x2710',
    _gasPrice: '0x5d21dba00',
    _nonce: '0x0'
}
```

## transaction.appendSignatures <a id="transaction-appendsignatures"></a>

```javascript
transaction.appendSignatures(signatures)
```

Appends `signatures` to the transaction.

**매개변수**

| 명칭         | 타입                  | 설명                                                                                                                                                                                                                                                                                          |
| ---------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| signatures | object &#124; Array | The signatures to be appended to the transaction. [SignatureData][] instance or an array containing [SignatureData][] instances. An array in which each 'v', 'r', and 's' are sequentially defined as string formats or a 2D array containing those arrays can also be taken as parameters. |

**예시**

```javascript
> transaction.appendSignatures([ '0x4e44', '0x7010e...', '0x65d6b...' ])
```

## transaction.appendFeePayerSignatures <a id="transaction-appendfeepayersignatures"></a>

```javascript
transaction.appendFeePayerSignatures(signatures)
```

Appends `feePayerSignatures` to the transaction.

**NOTE** This function works only for "fee-delegated" transactions or "fee-delegated with ratio" transactions.

**매개변수**

| 명칭                 | 타입                  | 설명                                                                                                                                                                                                                                                                                                  |
| ------------------ | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| feePayerSignatures | object &#124; Array | The feePayerSignatures to be appended to the transaction. [SignatureData][] instance or an array containing [SignatureData][] instances. An array in which each 'v', 'r', and 's' are sequentially defined as string formats or a 2D array containing those arrays can also be taken as parameters. |

**예시**

```javascript
> transaction.appendFeePayerSignatures([ '0x4e44', '0x7010e...', '0x65d6b...' ])
```

## transaction.combineSignedRawTransactions <a id="transaction-combinesignatures"></a>

```javascript
transaction.combineSignedRawTransactions(rlpEncodedTxs)
```

Collects signs in each RLP-encoded transaction string in the given array, combines them with the transaction instance, and returns a RLP-encoded transaction string which includes all signs. Note that the transaction instance doesn't necessarily be signed in advance. If the transaction is either a type of "fee-delegated" or "fee-delegated with ratio", `feePayerSignatures` is also merged and included in the output RLP-encoded transaction string.

**매개변수**

| 명칭            | 타입    | 설명                                                  |
| ------------- | ----- | --------------------------------------------------- |
| rlpEncodedTxs | Array | An array of signed RLP-encoded transaction strings. |

**리턴값**

| 타입     | 설명                                                                                                                                                                           |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| string | A RLP-encoded transaction string which includes all `signatures` (and `feePayerSignatures` if transaction is a type of either "fee-delgated" or "fee-delegated with ratio"). |

**예시**

```javascript
> transaction.combineSignedRawTransactions(['0x09f88...'])
'0x09f885018505d21dba00830f4240947b65b75d204abed71587c9e519a89277766ee1d00a9404bb86a1b16113ebe8f57071f839b002cbcbf7d0f847f845820feaa068e56f3da7fbe7a86543eb4b244ddbcb13b2d1cb9adb3ee8a4c8b046821bc492a068c29c057055f68a7860b54184bba7967bcf42b6aae12beaf9f30933e6e730c280c4c3018080'
```

## transaction.getRLPEncoding <a id="transaction-getrlpencoding"></a>

```javascript
transaction.getRLPEncoding()
```

Returns a RLP-encoded transaction string.

For information on how to make the RLP-encoded string for each transaction type, see [Klaytn Design - Transactions][].

**리턴값**

| 타입     | 설명                                |
| ------ | --------------------------------- |
| string | A RLP-encoded transaction string. |

**예시**

```javascript
> transaction.getRLPEncoding()
'0x09f885018505d21dba00830f4240947b65b75d204abed71587c9e519a89277766ee1d00a9404bb86a1b16113ebe8f57071f839b002cbcbf7d0f847f845820feaa068e56f3da7fbe7a86543eb4b244ddbcb13b2d1cb9adb3ee8a4c8b046821bc492a068c29c057055f68a7860b54184bba7967bcf42b6aae12beaf9f30933e6e730c280c4c3018080'
```

## transaction.getRawTransaction <a id="transaction-getrawtransaction"></a>

```javascript
transaction.getRawTransaction()
```

Returns a `rawTransaction` string (a RLP-encoded transaction string). This function is same with [transaction.getRLPEncoding](#transaction-getrlpencoding).

**리턴값**

| 타입     | 설명                                |
| ------ | --------------------------------- |
| string | A RLP-encoded transaction string. |

**예시**

```javascript
> transaction.getRawTransaction()
'0x09f885018505d21dba00830f4240947b65b75d204abed71587c9e519a89277766ee1d00a9404bb86a1b16113ebe8f57071f839b002cbcbf7d0f847f845820feaa068e56f3da7fbe7a86543eb4b244ddbcb13b2d1cb9adb3ee8a4c8b046821bc492a068c29c057055f68a7860b54184bba7967bcf42b6aae12beaf9f30933e6e730c280c4c3018080'
```

## transaction.getTransactionHash <a id="transaction-gettransactionhash"></a>

```javascript
transaction.getTransactionHash()
```

Returns a `transactionHash`.

For information on how to make the transaction hash for each transaction type, see [Klaytn Design - Transactions][].

**리턴값**

| 타입     | 설명                 |
| ------ | ------------------ |
| string | A transactionHash. |

**예시**

```javascript
> transaction.getTransactionHash()
'0x8ac53afbba014201b02398545653683fe0536c49707fe302c59423012c0e8697'
```

## transaction.getSenderTxHash <a id="transaction-getsendertxhash"></a>

```javascript
transaction.getSenderTxHash()
```

Returns a [senderTxHash][] of transaction.

The [senderTxHash][] is a hash of the transaction except for the fee payer's address and signature, so [transactionHash](#transaction-gettransactionhash) and [senderTxHash][] are the same for basic transactions.

For information on how to make the [senderTxHash][] for each transaction type, see [Klaytn Design - Transactions][].

**리턴값**

| 타입     | 설명              |
| ------ | --------------- |
| string | A senderTxHash. |

**예시**

```javascript
> transaction.getSenderTxHash()
'0xb61cc1ddadb6f2ec34c9f9e6a7b6cf0a606422654d649d998587c77daa3c31fe'
```

## transaction.getRLPEncodingForSignature <a id="transaction-getrlpencodingforsignature"></a>

```javascript
transaction.getRLPEncodingForSignature()
```

Returns a RLP-encoded transaction string for making the signature of the transaction sender. Note that the returned RLP-encoded transaction string is not added with the signature and rather is used to generate this signature.

For information on how to make a RLP-encoded transaction string to generate the transaction sender's signature for each transaction type, see [Klaytn Design - Transactions][].

**리턴값**

| 타입     | 설명                                                               |
| ------ | ---------------------------------------------------------------- |
| string | A RLP-encoded transaction string without any signature attached. |

**예시**

```javascript
> transaction.getRLPEncodingForSignature()
'0xf83fb838f709018505d21dba00830f4240947b65b75d204abed71587c9e519a89277766ee1d00a9404bb86a1b16113ebe8f57071f839b002cbcbf7d08207e38080'
```

## transaction.getRLPEncodingForFeePayerSignature <a id="transaction-getrlpencodingforfeepayersignature"></a>

```javascript
transaction.getRLPEncodingForFeePayerSignature()
```

Returns a RLP-encoded transaction string for making the signature of the fee payer. Note that the returned RLP-encoded transaction string is not added with the signature and rather is used to generate this signature.

For information on how to make a RLP-encoded transaction string to generate the fee payer's signature for each transaction type, see [Klaytn Design - Transactions][].

**NOTE** This function works only for "fee-delegated" transactions or "fee-delegated with ratio" transactions.

**리턴값**

| 타입     | 설명                                                               |
| ------ | ---------------------------------------------------------------- |
| string | A RLP-encoded transaction string without any signature attached. |

**예시**

```javascript
> transaction.getRLPEncodingForFeePayerSignature()
'0xf840b838f709018505d21dba00830f4240947b65b75d204abed71587c9e519a89277766ee1d00a9404bb86a1b16113ebe8f57071f839b002cbcbf7d0808207e38080'
```

## transaction.fillTransaction <a id="transaction-filltransaction"></a>

```javascript
transaction.fillTransaction()
```

Fills in the optional variables in transaction.

If the `gasPrice`, `nonce`, or `chainId` of the transaction are not defined, this method asks the default values for these optional variables and preset them by sending JSON RPC call to the connected Klaytn Node.

Use [caver.rpc.klay.getGasPrice][] to get `gasPrice`, [caver.rpc.klay.getTransactionCount][] to get `nonce` and [caver.rpc.klay.getChainId][] call to get `chainId`.

**리턴값**

`Promise` returning `void`

**예시**

```javascript
> transaction.fillTransaction()
```

[Klaytn Design - Transactions]: ../../../../../klaytn/design/transactions/README.md
[senderTxHash]: ../../../../../klaytn/design/transactions/README.md#sendertxhash
[Transaction]: #class
[KlaytnWalletKey]: ../../../../../klaytn/design/accounts.md#klaytn-wallet-key-format
[SingleKeyring]: ../caver.wallet/keyring.md#singlekeyring
[MultipleKeyring]: ../caver.wallet/keyring.md#multiplekeyring
[RoleBasedKeyring]: ../caver.wallet/keyring.md#rolebasedkeyring
[SignatureData]: ../caver.wallet/keyring.md#signaturedata
[caver.rpc.klay.getGasPrice]: ../caver.rpc/klay.md#caver-rpc-klay-getgasprice
[caver.rpc.klay.getTransactionCount]: ../caver.rpc/klay.md#caver-rpc-klay-gettransactioncount
[caver.rpc.klay.getChainId]: ../caver.rpc/klay.md#caver-rpc-klay-getchainid
