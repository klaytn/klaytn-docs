# caver.wallet

`caver.wallet` は [キーリング](keyring.md) インスタンスをインメモリウォレットで管理するパッケージです。 `caver.wallet` はすべての [SingleKeyring](keyring.md#singlekeyring)、 [MultipleKeying](keyring.md#multiplekeyring)、 [RoleBasedKeyring](keyring.md#rolebasedkeyring)を受け入れ、アドレス別に管理します。

## クラス <a href="#class" id="class"></a>

### KeyringContainer <a href="#keyringcontainer" id="keyringcontainer"></a>

```javascript
caver.wallet
```

`KeyringContainer` は [SingleKeyring](keyring.md#singlekeyring)、 [MultipleKeyring](keyring.md#multiplekeyring)、および [RoleBasedKeyring](keyring.md#rolebasedkeyring) インスタンスを管理するクラスです。 Caverがインスタンス化されると、 `caver.wallet`内にKeyringContainerインスタンスが生成されます。 `caver.wallet`から、インメモリウォレット内のキーリングインスタンスを保存および管理できます。

**プロパティ**

| 名前 | タイプ | Description                |
| -- | --- | -------------------------- |
| 長さ | 数値  | keyringContainer内のキーリングの数。 |

## caver.wallet.generate <a href="#caver-wallet-generate" id="caver-wallet-generate"></a>

```javascript
caver.wallet.generate(numberOfKeyrings [, entropy])
```

ランダムに生成された秘密鍵を使用して [SingleKeyring](keyring.md#singlekeyring) を keyringContainer に生成します。

**パラメータ**

| 名前               | タイプ | Description                                              |
| ---------------- | --- | -------------------------------------------------------- |
| numberOfKeyrings | 数値  | 作成する [SingleKeyring](keyring.md#singlekeyring) インスタンスの数。 |
| エントロピー           | 文字列 | (オプション) エントロピーを増加させるランダムな文字列。                            |

**戻り値**

| タイプ | Description     |
| --- | --------------- |
| 行列  | 生成されたアドレスを含む配列。 |

**例**

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

## caver.wallet.newKeyring <a href="#caver-wallet-newkeyring" id="caver-wallet-newkeyring"></a>

```javascript
caver.wallet.newKeyring(address, key)
```

与えられたパラメータを持つキーリングインスタンスを作成し、 `caver.wallet`に追加します。

`キー` が秘密鍵文字列の場合、1 つの秘密鍵を使用する [SingleKeyring](keyring.md#singlekeyring) インスタンスが作成されます。 `key` が秘密鍵文字列を含む配列の場合、複数の秘密鍵を使用する [MultipleKeyring](keyring.md#multiplekeyring) インスタンスが作成されます。 If `key` is a 2D array of which each element contains the private key(s) to be used for each role, a [RoleBasedKeyring](keyring.md#rolebasedkeyring) instance is created. 作成されたキーリングは `caver.wallet` に追加されます。

**パラメータ**

| 名前      | タイプ    | Description                                                                                                        |
| ------- | ------ | ------------------------------------------------------------------------------------------------------------------ |
| address | 文字列    | アドレス文字列                                                                                                            |
| キー      | 文字列 \ | Array | 秘密キーストリング、秘密キーの配列 または、それぞれの配列要素が [ロール](../../../../../klaytn/design/accounts.md#roles) のために定義されたキーを含む2D配列。 |

**戻り値**

| タイプ    | Description                                                                                                                                                                         |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| object | cave.walletに追加されたキーリングインスタンス ([SingleKeyring](keyring.md#singlekeyring), [MultipleKeyring](keyring.md#multiplekeyring) または [RoleBasedKeyring](keyring.md#rolebasedkeyring)) が返されます。 |

**例**

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

## caver.wallet.updateKeyring <a href="#caver-wallet-updatekeyring" id="caver-wallet-updatekeyring"></a>

```javascript
caver.wallet.updateKeyring(keyring)
```

`caver.wallet` 内のキーリングを更新します。 When a new `keyring` instance ([SingleKeyring](keyring.md#singlekeyring), [MultipleKeyring](keyring.md#multiplekeyring) or [RoleBasedKeyring](keyring.md#rolebasedkeyring)) is passed as a parameter, the existing keyring stored in the `caver.wallet` that matches the `address` property of the given `keyring` instance is found and replaced with the given one. 一致するキーリングが見つからない場合にエラーが発生します。

**パラメータ**

| 名前      | タイプ    | Description                                                                                                                                                                     |
| ------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| keyring | object | 新しいキーリング ([SingleKeyring](keyring.md#singlekeyring), [MultipleKeyring](keyring.md#multiplekeyring) または [RoleBasedKeyring](keyring.md#rolebasedkeyring)) `caver.wallet` に保存されます。 |

**戻り値**

| タイプ    | Description                                                                                                                                                                             |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| object | 更新されたキーリング ([SingleKeyring](keyring.md#singlekeyring), [MultipleKeyring](keyring.md#multiplekeyring) または [RoleBasedKeyring](keyring.md#rolebasedkeyring)) `caver.wallet` に保存されているキーリング。 |

**例**

```javascript
> caver.wallet.updateKeyring(newKeyring)
SingleKeyring {
    _address: '0x386a4bb40abbfaa59cecdc3ced202475895fd569',
    _key: PrivateKey { _privateKey: '0x{private key}' }
}
```

## caver.wallet.getKeyring <a href="#caver-wallet-getkeyring" id="caver-wallet-getkeyring"></a>

```javascript
caver.wallet.getKeyring(address)
```

`caver.wallet`のアドレスに対応するキーリングインスタンスを返します。

**パラメータ**

| 名前      | タイプ | Description      |
| ------- | --- | ---------------- |
| address | 文字列 | クエリするキーリングのアドレス。 |

**戻り値**

| タイプ    | Description                                                                                                                                                                                 |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| object | 見つかったキーリングインスタンス ([SingleKeyring](keyring.md#singlekeyring), [MultipleKeyring](keyring.md#multiplekeyring) または [RoleBasedKeyring](keyring.md#rolebasedkeyring)) が `caver.wallet` に保存されています。 |

**例**

```javascript
> caver.wallet.getKeyring('0x386a4bb40abbfaa59cecdc3ced202475895fd569')
SingleKeyring {
    _address: '0x386a4bb40abbfaa59cecdc3ced202475895fd569',
    _key: PrivateKey { _privateKey: '0x{private key}' }
}
```

## caver.wallet.isExisted <a href="#caver-wallet-isexisted" id="caver-wallet-isexisted"></a>

```javascript
caver.wallet.isExisted(address)
```

アドレスに一致するキーリングがある場合は `true` を返します。

**パラメータ**

| 名前      | タイプ | Description        |
| ------- | --- | ------------------ |
| address | 文字列 | 存在を確認するキーリングのアドレス。 |

**戻り値**

| タイプ     | Description                                            |
| ------- | ------------------------------------------------------ |
| boolean | `true` は、アドレスと一致するキーリングが `caver.wallet` に存在することを意味します。 |

**例**

```javascript
> caver.wallet.isExisted('0x386a4bb40abbfaa59cecdc3ced202475895fd569')
true
```

## caver.wallet.add <a href="#caver-wallet-add" id="caver-wallet-add"></a>

```javascript
caver.wallet.add(keyring)
```

`caver.wallet` にキーリングのインスタンスを追加します。 If the newly given keyring has the same address with one of the keyrings that already exist in `caver.wallet`, an error is returned. この場合、 [caver.wallet](./#caver-wallet-updatekeyring) 内の既存のキーリングを更新するには `updateKeyring` を使用します。

**パラメータ**

| 名前      | タイプ    | Description                                                                                                                                                                      |
| ------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| keyring | object | キーリングインスタンス ([SingleKeyring](keyring.md#singlekeyring), [MultipleKeyring](keyring.md#multiplekeyring) または [RoleBasedKeyring](keyring.md#rolebasedkeyring)) を追加する `caver.wallet`. |

**戻り値**

| タイプ    | Description                                                                                                                                                                  |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| object | [caver.wallet](keyring.md#singlekeyring)に追加されたキーリング ( [SingleKeyring](keyring.md#multiplekeyring) , [MultipleKeyring](keyring.md#rolebasedkeyring)または `RoleBasedKeyring` ) 。 |

**例**

```javascript
> caver.wallet.add(keyring)
SingleKeyring {
    _address: '0x386a4bb40abbfaa59cecdc3ced202475895fd569',
    _key: PrivateKey { _privateKey: '0x{private key}' }
}
```

## caver.wallet.remove <a href="#caver-wallet-remove" id="caver-wallet-remove"></a>

```javascript
caver.wallet.remove(address)
```

指定されたキーリングのアドレスと一致するアドレスの `caver.wallet` からキーリングを削除します。

**パラメータ**

| 名前      | タイプ | Description                      |
| ------- | --- | -------------------------------- |
| address | 文字列 | `caver.wallet` で削除されるキーリングのアドレス。 |

**戻り値**

| タイプ     | Description                                       |
| ------- | ------------------------------------------------- |
| boolean | `` キーリングが `caver.wallet` から削除された場合、true </code> 。 |

**例**

```javascript
> caver.wallet.remove('0x6a3edfad6d1126020d5369e9097db39281876c5d')
true
```

## caver.wallet.signMessage <a href="#caver-wallet-signmessage" id="caver-wallet-signmessage"></a>

```javascript
caver.wallet.signMessage(address, message, role [, index])
```

caver.walletに保存されているキーリングを使用して、Klaytn固有のプレフィックスでメッセージに署名します。 これは、Klaytn 固有の署名を次のように計算します。

```
sign(kecchak256("\x19Klaytn Signed Message:\n" + len(message) + message)))
```

ユーザーがindexパラメータを提供していない場合、 `caver.wallet.signMessage` はロールによって使用されるすべての秘密鍵を使用してメッセージに署名します。 index パラメータが与えられた場合、 `caver.wallet.signMessage` は与えられたインデックスで秘密鍵を 1 つだけ使ってメッセージに署名します。 caver-js で使用される役割は `caver.wallet.keyring.role` から見つけることができます。

**パラメータ**

| 名前      | タイプ | Description                                                                                                  |
| ------- | --- | ------------------------------------------------------------------------------------------------------------ |
| address | 文字列 | 使用するキーリングのアドレス。                                                                                              |
| message | 文字列 | 署名するメッセージ。                                                                                                   |
| ロール     | 数値  | キーの役割を示す数値。 `caver.wallet.keyring.role` を使用できます。                                                             |
| インデックス  | 数値  | (オプション) 使用する秘密鍵のインデックス。 インデックスは、ロールごとに定義された秘密鍵の配列の長さよりも小さくなければなりません。 インデックスが定義されていない場合、このメソッドはすべての秘密鍵を使用します。 |

**戻り値**

| タイプ    | Description     |
| ------ | --------------- |
| object | 署名の結果を含むオブジェクト。 |

返されたオブジェクトには以下のものが含まれています:

| 名前          | タイプ | Description                                   |
| ----------- | --- | --------------------------------------------- |
| messageHash | 文字列 | メッセージのハッシュと Klaytn 固有の接頭辞。                    |
| signatures  | 行列  | [SignatureData](keyring.md#signaturedata) の配列 |
| message     | 文字列 | 署名するメッセージ。                                    |

**例**

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

## caver.wallet.sign <a href="#caver-wallet-sign" id="caver-wallet-sign"></a>

```javascript
caver.wallet.sign(address, transaction [, index] [, hasher])
```

Signs the transaction as a `sender` of the transaction and appends `signatures` in the transaction object using the keyring in `caver.wallet`.

[Account Update](../caver.transaction/basic.md#accountupdate) transaction, use [roleTransactionKey](../../../../../klaytn/design/accounts.md#roles), other, use [roleTransactionKey](../../../../../klaytn/design/accounts.md#roles). If the user has not defined an `index`, `caver.wallet.sign` signs the transaction using all the private keys used by the role. `index` が定義されている場合、 `caver.wallet.sign` は指定されたインデックスで 1 つの秘密鍵のみを使用してトランザクションに署名します。

**パラメータ**

| 名前          | タイプ    | Description                                                                                                                                                                                                                                |
| ----------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| address     | 文字列    | 使用するキーリングのアドレス。                                                                                                                                                                                                                            |
| transaction | object | [トランザクション](../caver.transaction/#class) のインスタンス                                                                                                                                                                                            |
| インデックス      | 数値     | (オプション) 使用する秘密鍵のインデックス。 インデックスは、ロールごとに定義された秘密鍵の配列の長さよりも小さくなければなりません。 インデックスが定義されていない場合、このメソッドはすべての秘密鍵を使用します。                                                                                                                               |
| ハッシャー       | 関数     | (オプション) トランザクションハッシュを取得するためのハッシュ関数。 `hasher` がパラメータとして与えられた場合 caver-jsで実装されたトランザクションハッシュを計算するためのデフォルトメソッドの代わりにトランザクションハッシュを計算します。 トランザクションハッシュ生成のデフォルトメソッドの詳細については、 [Basic](../../../../../klaytn/design/transactions/basic.md) を参照してください。 |

**戻り値**

`Promise` が `object`を返す: 署名されたトランザクション。

| タイプ    | Description                                                |
| ------ | ---------------------------------------------------------- |
| object | 署名されたトランザクションインスタンス。 記号が `transaction.signations` に追加されます。 |

トランザクションタイプ別のフィールドの詳細については、 [cave.transaction](../caver.transaction/) を参照してください。

**例**

```javascript
// This example uses the ValueTransfer transaction.
// 各種トランザクションタイプの使用方法については、 [caver.transaction] を参照してください。
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

## caver.wallet.signAsFeePayer <a href="#caver-wallet-signasfeepayer" id="caver-wallet-signasfeepayer"></a>

```javascript
caver.wallet.signAsFeePayer(address, transaction [, index] [, hasher])
```

Signs the transaction as `fee payer` of the transaction and appends `feePayerSignatures` in the transaction object using the keyring in `caver.wallet`.

手数料支払者としてトランザクションに署名するには、 [roleFeePayerKey](../../../../../klaytn/design/accounts.md#roles) を使用してください。 If the user has not defined an `index`, `caver.wallet.signAsFeePayer` signs the transaction using all the private keys used by the role. `index` が定義されている場合、 `caver.wallet.signAsFeePayer` は指定されたインデックスの 1 つの秘密鍵のみを使用してトランザクションに署名します。

`transaction.feePayer` が定義されていない場合、 `caver.wallet` から生成されたキーリングのアドレスが割り当てられます。

**パラメータ**

| 名前          | タイプ    | Description                                                                                                  |
| ----------- | ------ | ------------------------------------------------------------------------------------------------------------ |
| address     | 文字列    | 使用するキーリングのアドレス。                                                                                              |
| transaction | object | [FeeDelegatedTransaction](../caver.transaction/fee-delegation.md) のインスタンス                                    |
| インデックス      | 数値     | (オプション) 使用する秘密鍵のインデックス。 インデックスは、ロールごとに定義された秘密鍵の配列の長さよりも小さくなければなりません。 インデックスが定義されていない場合、このメソッドはすべての秘密鍵を使用します。 |
| ハッシャー       | 関数     | (オプション) トランザクションハッシュを取得するための関数。 hasherがパラメータとして定義されている場合、これはcaver-jsのデフォルトの実装ではなくトランザクションハッシュを取得するために使用されます。 |

**戻り値**

`Promise` が `object`を返す: 署名されたトランザクション。

| タイプ    | Description                                                           |
| ------ | --------------------------------------------------------------------- |
| object | 署名されたトランザクションインスタンス。 署名の結果は `transaction.feePayerSignatures` に追加されます。 |

トランザクションタイプ別のフィールドの詳細については、 [cave.transaction](../caver.transaction/) を参照してください。

**例**

```javascript
// This example uses the FeeDelegatedValueTransfer transactions.
// 各種トランザクションタイプの使用方法については、 [caver.transaction] を参照してください。
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
