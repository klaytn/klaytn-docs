# caver.wallet <a id="caver-wallet"></a>

`caver.wallet` is a package that manages [Keyring][] instances in in-memory wallet. `caver.wallet` accepts all [SingleKeyring][], [MultipleKeyring][], and [RoleBasedKeyring][], and manages them by address.

## Class <a id="class"></a>

### KeyringContainer <a id="keyringcontainer"></a>

```javascript
caver.wallet
```

`KeyringContainer` is a class that manages [SingleKeyring][], [MultipleKeyring][], and [RoleBasedKeyring][] instances. When Caver is instantiated, it creates a KeyringContainer instance in the `caver.wallet`. You can store and manage keyring instances in the in-memory wallet through `caver.wallet`.

**속성**

| 명칭     | 타입     | 설명                                          |
| ------ | ------ | ------------------------------------------- |
| length | number | The number of keyrings in keyringContainer. |

## caver.wallet.generate <a id="caver-wallet-generate"></a>

```javascript
caver.wallet.generate(numberOfKeyrings [, entropy])
```

Generates instances of [SingleKeyring][] in the keyringContainer with randomly generated private keys.

**매개변수**

| 명칭               | 타입     | 설명                                                   |
| ---------------- | ------ | ---------------------------------------------------- |
| numberOfKeyrings | number | The number of [SingleKeyring][] instances to create. |
| entropy          | 문자열    | (optional) A random string to increase entropy.      |

**리턴값**

| 타입    | 설명                                                  |
| ----- | --------------------------------------------------- |
| Array | An array containing the addresses of the generated. |

**예시**

```javascript
// generate without entropy
> caver.wallet.generate(3)
[
    '0xb4b0c3781082cf818bfaf5adfc73fdf59d92c1cd',
    '0x9957dfd92e4b70f91131c573293343bc5f21f215',
    '0xed2fe179c18fa528da2392532998560bd1008511'
]

// generate with entropy
> caver.wallet.generate(3, caver.utils.randomHex(32))
[
    '0xb4b0c3781082cf818bfaf5adfc73fdf59d92c1cd',
    '0x9957dfd92e4b70f91131c573293343bc5f21f215',
    '0xed2fe179c18fa528da2392532998560bd1008511'
]
```

## caver.wallet.newKeyring <a id="caver-wallet-newkeyring"></a>

```javascript
caver.wallet.newKeyring(address, key)
```

Creates a keyring instance with given parameters and adds it to the `caver.wallet`.

If `key` is a private key string, a [SingleKeyring][] instance that uses a single private key is created. If `key` is an array containing private key strings, a [MultipleKeyring][] instance that use multiple private keys is created. If `key` is a 2D array of which each element contains the private key(s) to be used for each role, a [RoleBasedKeyring][] instance is created. The keyring created is added to `caver.wallet`.

**매개변수**

| 명칭      | 타입                  | 설명                                                                                                                                   |
| ------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| address | 문자열                 | The address string.                                                                                                                  |
| key     | string &#124; Array | The private key string, an array of private keys, or a 2D array of which each array element contains keys defined for each [role][]. |

**리턴값**

| 타입     | 설명                                                                                                                       |
| ------ | ------------------------------------------------------------------------------------------------------------------------ |
| object | The keyring instance ([SingleKeyring][], [MultipleKeyring][] or [RoleBasedKeyring][]) added to caver.wallet is returned. |

**예시**

```javascript
// Create a instance of SingleKeyring and add to caver.wallet
> caver.wallet.newKeyring('0x{address in hex}', '0x{private key}')
SingleKeyring {
    _address: '0x386a4bb40abbfaa59cecdc3ced202475895fd569',
    _key: PrivateKey { _privateKey: '0x{private key}' }
}

// Create a instance of MultipleKeyring and add to caver.wallet
> caver.wallet.newKeyring('0x{address in hex}', ['0x{private key1}', '0x{private key2}'])
MultipleKeyring {
    _address: '0x17e7531b40ad5d7b5fa7b4ec78df64ce1cb36d24',
    _keys: [ 
        PrivateKey { _privateKey: '0x{private key1}' },
        PrivateKey { _privateKey: '0x{private key2}' }
    ]
}

// Create a instance of RoleBasedKeyring and add to caver.wallet
> const roleBasedKeys = [
    ['0x{private key1}', '0x{private key2}'],
    ['0x{private key3}', '0x{private key4}'],
    ['0x{private key5}', '0x{private key6}'],
]
> caver.wallet.newKeyring('0x{address in hex}', roleBasedKeys)
RoleBasedKeyring {
    _address: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _keys: [
        [
            PrivateKey { _privateKey: '0x{private key1}' },
            PrivateKey { _privateKey: '0x{private key2}' }
        ],
        [ 
            PrivateKey { _privateKey: '0x{private key3}' },
            PrivateKey { _privateKey: '0x{private key4}' }
        ],
        [ 
            PrivateKey { _privateKey: '0x{private key5}' },
            PrivateKey { _privateKey: '0x{private key6}' }
        ]
    ]
}
```

## caver.wallet.updateKeyring <a id="caver-wallet-updatekeyring"></a>

```javascript
caver.wallet.updateKeyring(keyring)
```

Updates the keyring inside the `caver.wallet`. When a new `keyring` instance ([SingleKeyring][], [MultipleKeyring][] or [RoleBasedKeyring][]) is passed as a parameter, the existing keyring stored in the `caver.wallet` that matches the `address` property of the given `keyring` instance is found and replaced with the given one. An error occurs when the matching keyring is not found.

**매개변수**

| 명칭      | 타입     | 설명                                                                                                               |
| ------- | ------ | ---------------------------------------------------------------------------------------------------------------- |
| keyring | object | The new keyring ([SingleKeyring][], [MultipleKeyring][] or [RoleBasedKeyring][]) to be stored in `caver.wallet`. |

**리턴값**

| 타입     | 설명                                                                                                             |
| ------ | -------------------------------------------------------------------------------------------------------------- |
| object | The updated keyring ([SingleKeyring][], [MultipleKeyring][] or [RoleBasedKeyring][]) stored in `caver.wallet`. |

**예시**

```javascript
> caver.wallet.updateKeyring(newKeyring)
SingleKeyring {
    _address: '0x386a4bb40abbfaa59cecdc3ced202475895fd569',
    _key: PrivateKey { _privateKey: '0x{private key}' }
}
```

## caver.wallet.getKeyring <a id="caver-wallet-getkeyring"></a>

```javascript
caver.wallet.getKeyring(address)
```

Returns the keyring instance corresponding to the address in `caver.wallet`.

**매개변수**

| 명칭      | 타입  | 설명                               |
| ------- | --- | -------------------------------- |
| address | 문자열 | The address of keyring to query. |

**리턴값**

| 타입     | 설명                                                                                                                    |
| ------ | --------------------------------------------------------------------------------------------------------------------- |
| object | The found keyring instance ([SingleKeyring][], [MultipleKeyring][] or [RoleBasedKeyring][]) stored in `caver.wallet`. |

**예시**

```javascript
> caver.wallet.getKeyring('0x386a4bb40abbfaa59cecdc3ced202475895fd569')
SingleKeyring {
    _address: '0x386a4bb40abbfaa59cecdc3ced202475895fd569',
    _key: PrivateKey { _privateKey: '0x{private key}' }
}
```

## caver.wallet.add <a id="caver-wallet-add"></a>

```javascript
caver.wallet.add(keyring)
```

Adds an instance of keyring to the `caver.wallet`. If the newly given keyring has the same address with one of the keyrings that already exist in `caver.wallet`, an error is returned. In this case, use [updateKeyring](#caver-wallet-updatekeyring) to update the existing keyring in `caver.wallet`.

**매개변수**

| 명칭      | 타입     | 설명                                                                                                              |
| ------- | ------ | --------------------------------------------------------------------------------------------------------------- |
| keyring | object | A keyring instance (([SingleKeyring][], [MultipleKeyring][] or [RoleBasedKeyring][])) to add to `caver.wallet`. |

**리턴값**

| 타입     | 설명                                                                                                    |
| ------ | ----------------------------------------------------------------------------------------------------- |
| object | The added keyring ([SingleKeyring][], [MultipleKeyring][] or [RoleBasedKeyring][]) in `caver.wallet`. |

**예시**

```javascript
> caver.wallet.add(keyring)
SingleKeyring {
    _address: '0x386a4bb40abbfaa59cecdc3ced202475895fd569',
    _key: PrivateKey { _privateKey: '0x{private key}' }
}
```

## caver.wallet.remove <a id="caver-wallet-remove"></a>

```javascript
caver.wallet.remove(address)
```

Deletes the keyring from `caver.wallet` whose address matches the address of the given keyring.

**매개변수**

| 명칭      | 타입  | 설명                                                         |
| ------- | --- | ---------------------------------------------------------- |
| address | 문자열 | An address of the keyring to be deleted in `caver.wallet`. |

**리턴값**

| 타입      | 설명                                                |
| ------- | ------------------------------------------------- |
| boolean | `true` if keyring is removed from `caver.wallet`. |

**예시**

```javascript
> caver.wallet.remove('0x6a3edfad6d1126020d5369e9097db39281876c5d')
true
```

## caver.wallet.signMessage <a id="caver-wallet-signmessage"></a>

```javascript
caver.wallet.signMessage(address, message, role [, index])
```

Signs the message with Klaytn-specific prefix using keyring stored in caver.wallet. This calculates a Klaytn-specific signature with:

```
sign(keccak256("\x19Klaytn Signed Message:\n" + len(message) + message)))
```

If the user has not provided the index parameter, `caver.wallet.signMessage` signs message using all the private keys used by the role. If the index parameter is given, `caver.wallet.signMessage` signs message using only one private key at the given index. The role used in caver-js can be found from `caver.wallet.keyring.role`.

**매개변수**

| 명칭      | 타입     | 설명                                                                                                                                                                                                                             |
| ------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| address | 문자열    | An address of the keyring to be used.                                                                                                                                                                                          |
| 메시지     | 문자열    | The message to sign.                                                                                                                                                                                                           |
| role    | number | A number indicating the role of the key. You can use `caver.wallet.keyring.role`.                                                                                                                                              |
| index   | number | (optional) The index of the private key you want to use. The index must be less than the length of the array of the private keys defined for each role. If an index is not defined, this method will use all the private keys. |

**리턴값**

| 타입     | 설명                                             |
| ------ | ---------------------------------------------- |
| object | An object that includes the result of signing. |

The returned object contains the following:

| 명칭          | 타입    | 설명                                               |
| ----------- | ----- | ------------------------------------------------ |
| messageHash | 문자열   | The hash of message with Klaytn-specific prefix. |
| signatures  | Array | An array of [SignatureData][].                   |
| 메시지         | 문자열   | The message to sign.                             |

**예시**

```javascript
// Sign message with roleTransactionKey which uses two private keys
> caver.wallet.signMessage('0x386a4bb40abbfaa59cecdc3ced202475895fd569', 'message to sign', caver.wallet.keyring.role.roleTransactionKey)
{
    messageHash: '0x9c4c1ae0aa1faf7e59eaf6fcf36a34542698197b379a9949b58c92925e74c069',
    signatures: [
        SignatureData { _v: '0x1c', _r: '0xb3239...', _s: '0x584d2...' },
        SignatureData { _v: '0x1b', _r: '0x13c64...', _s: '0x60c61...' }
    ],
    message: 'message to sign'
}

// Sign message with roleTransactionKey and index
> caver.wallet.signMessage('0x386a4bb40abbfaa59cecdc3ced202475895fd569', 'message to sign', caver.wallet.keyring.role.roleTransactionKey, 1)
{
    messageHash: '0x9c4c1ae0aa1faf7e59eaf6fcf36a34542698197b379a9949b58c92925e74c069',
    signatures: [
        SignatureData { _v: '0x1b', _r: '0x13c64...', _s: '0x60c61...' }
    ],
    message: 'message to sign'
}
```

## caver.wallet.sign <a id="caver-wallet-sign"></a>

```javascript
caver.wallet.sign(address, transaction [, index] [, hasher])
```

Signs the transaction as a `sender` of the transaction and appends `signatures` in the transaction object using the keyring in `caver.wallet`.

For [Account Update][] transaction, use [roleTransactionKey][], otherwise, use [roleTransactionKey][]. If the user has not defined an `index`, `caver.wallet.sign` signs the transaction using all the private keys used by the role. If `index` is defined, the `caver.wallet.sign` signs the transaction using only one private key at the given index.

**매개변수**

| 명칭      | 타입       | 설명                                                                                                                                                                                                                                                                                                                                                            |
| ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address | 문자열      | An address of the keyring to be used.                                                                                                                                                                                                                                                                                                                         |
| 트랜잭션    | object   | An instance of [Transaction][].                                                                                                                                                                                                                                                                                                                               |
| index   | number   | (optional) The index of the private key you want to use. The index must be less than the length of the array of the private keys defined for each role. If an index is not defined, this method will use all the private keys.                                                                                                                                |
| hasher  | function | (optional) A hash function to get the transaction hash. If `hasher` is given as a parameter, it calculates the transaction hash instead of the default method for calculating transaction hash implemented in caver-js. See [Basic](../../../../../klaytn/design/transactions/basic.md) for details about the default method for transaction hash generation. |

**리턴값**

`Promise` returning `object`: The signed transaction.

| 타입     | 설명                                                                                   |
| ------ | ------------------------------------------------------------------------------------ |
| object | A signed transaction instance. The sign(s) is added to the `transaction.signatures`. |

For more information about fields by transaction type, see [caver.transaction][].

**예시**

```javascript
// This example uses the ValueTransfer transaction.
// Please refer to [caver.transaction] for how to use various transaction types.
> const transaction = caver.transaction.valueTransfer.create({
    from: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    value: 1,
    gas: 30000,
})

> const customHasher = () => { ... }

// Sign a transaction with the address of RoleBasedKeyring which use two private keys for roleTransactionKey
> caver.wallet.sign('0xe7e9184c125020af5d34eab7848bab799a1dcba9', transaction).then(console.log)
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

// Sign a transaction with the address of RoleBasedKeyring which use two private keys for roleTransactionKey and index
> caver.wallet.sign('0xe7e9184c125020af5d34eab7848bab799a1dcba9', transaction, 1).then(console.log)
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

// Sign a transaction with the address of RoleBasedKeyring which use two private keys for roleTransactionKey and hasher
> caver.wallet.sign('0xe7e9184c125020af5d34eab7848bab799a1dcba9', transaction, customHasher).then(console.log)
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

// Sign a transaction with the address of RoleBasedKeyring which use two private keys for roleTransactionKey, index and hasher
> caver.wallet.sign('0xe7e9184c125020af5d34eab7848bab799a1dcba9', transaction, 0, customHasher).then(console.log)
ValueTransfer {
    _type: 'TxTypeValueTransfer',
    _from: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _gas: '0x7530',
    _signatures: [
        SignatureData { _v: '0x4e44', _r: '0x7a8b6...', _s: '0x17139...' }
    ],
    _to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    _value: '0x1',
    _chainId: '0x2710',
    _gasPrice: '0x5d21dba00',
    _nonce: '0x0'
}
```

## caver.wallet.signAsFeePayer <a id="caver-wallet-signasfeepayer"></a>

```javascript
caver.wallet.signAsFeePayer(address, transaction [, index] [, hasher])
```

Signs the transaction as `fee payer` of the transaction and appends `feePayerSignatures` in the transaction object using the keyring in `caver.wallet`.

For signing a transaction as a fee payer, use [roleFeePayerKey][]. If the user has not defined an `index`, `caver.wallet.signAsFeePayer` signs the transaction using all the private keys used by the role. If `index` is defined, the `caver.wallet.signAsFeePayer` signs the transaction using only one private key at the given index.

If the `transaction.feePayer` is not defined, the address of keyring which is founded from `caver.wallet` is assigned.

**매개변수**

| 명칭      | 타입       | 설명                                                                                                                                                                                                                             |
| ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| address | 문자열      | An address of the keyring to be used.                                                                                                                                                                                          |
| 트랜잭션    | object   | An instance of [FeeDelegatedTransaction][].                                                                                                                                                                                    |
| index   | number   | (optional) The index of the private key you want to use. The index must be less than the length of the array of the private keys defined for each role. If an index is not defined, this method will use all the private keys. |
| hasher  | function | (optional) A function to get the transaction hash. If hasher is defined as a parameter, this is used to get the transaction hash instead of a default implementation in caver-js.                                              |

**리턴값**

`Promise` returning `object`: The signed transaction.

| 타입     | 설명                                                                                                     |
| ------ | ------------------------------------------------------------------------------------------------------ |
| object | A signed transaction instance. The signing result is appended to the `transaction.feePayerSignatures`. |

For more information about fields by transaction type, see [caver.transaction][].

**예시**

```javascript
// This example uses the FeeDelegatedValueTransfer transaction.
// Please refer to [caver.transaction] for how to use various transaction types.
> const transaction = caver.transaction.feeDelegatedValueTransfer.create({
    from: '0x6fddbcb99d31b8755c2b840a367f53eea4b4f45c',
    to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    value: 1,
    gas: 30000,
})

> const customHasher = () => { ... }

// Sign a transaction with the address of RoleBasedKeyring which use two private keys for roleFeePayerKey
> caver.wallet.signAsFeePayer('0xe7e9184c125020af5d34eab7848bab799a1dcba9', transaction).then(console.log)
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

// Sign a transaction with the address of RoleBasedKeyring which use two private keys for roleFeePayerKey, index
> caver.wallet.signAsFeePayer('0xe7e9184c125020af5d34eab7848bab799a1dcba9', transaction, 0).then(console.log)
FeeDelegatedValueTransfer {
    _type: 'TxTypeFeeDelegatedValueTransfer',
    _from: '0x6fddbcb99d31b8755c2b840a367f53eea4b4f45c',
    _gas: '0x7530',
    _signatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
    _feePayer: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _feePayerSignatures: [
        SignatureData { _v: '0x4e44', _r: '0x7010e...', _s: '0x65d6b...' }
    ],
    _to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    _value: '0x1',
    _chainId: '0x2710',
    _gasPrice: '0x5d21dba00',
    _nonce: '0x0'
}

// Sign a transaction with the address of RoleBasedKeyring which use two private keys for roleFeePayerKey and hasher
> caver.wallet.signAsFeePayer('0xe7e9184c125020af5d34eab7848bab799a1dcba9', transaction, customHasher).then(console.log)
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
> caver.wallet.signAsFeePayer('0xe7e9184c125020af5d34eab7848bab799a1dcba9', transaction, 0, customHasher).then(console.log)
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

[role]: ../../../../../klaytn/design/accounts.md#roles
[roleTransactionKey]: ../../../../../klaytn/design/accounts.md#roles
[roleFeePayerKey]: ../../../../../klaytn/design/accounts.md#roles
[Keyring]: ./keyring.md
[SingleKeyring]: ./keyring.md#singlekeyring
[MultipleKeyring]: ./keyring.md#multiplekeyring
[RoleBasedKeyring]: ./keyring.md#rolebasedkeyring
[SignatureData]: ./keyring.md#signaturedata

[Transaction]: ../caver.transaction/README.md#class
[FeeDelegatedTransaction]: ../caver.transaction/fee-delegation.md
[Account Update]: ../caver.transaction/basic.md#accountupdate
[caver.transaction]: ../caver.transaction/README.md
