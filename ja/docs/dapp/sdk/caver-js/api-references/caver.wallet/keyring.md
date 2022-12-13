# caver.wallet.keyring

`caver.wallet.keyring` は、アドレスとプライベートキーを含むキーリングに関連する機能を提供するパッケージです。

## クラス <a href="#class" id="class"></a>

`キーリング` は、口座のアドレスと秘密鍵を含む構造体です。 これはcaver-jsのクラスで、ユーザは自分の [Klaytnのアカウント](../../../../../klaytn/design/accounts.md#klaytn-accounts)を使ってサインオンできます。

`Keyring` can be classified into three types depending on the type of key being stored: [SingleKeyring](keyring.md#singlekeyring) to store one address and one private key, [MultipleKeyring](keyring.md#multiplekeyring) to store one address and multiple private keys, and [RoleBasedKeyring](keyring.md#rolebasedkeyring) to store one address and one or more private keys for each role.

* [SingleKeyring](keyring.md#singlekeyring): 秘密鍵を持つユーザーの署名
* [マルチプレキーリング](keyring.md#multiplekeyring): 秘密鍵のあるユーザー記号
* [RoleBasedKeyring](keyring.md#rolebasedkeyring): ロール別の秘密鍵でユーザーが署名

### SingleKeyring <a href="#singlekeyring" id="singlekeyring"></a>

```javascript
const keyring = new caver.wallet.keyring.singing.singleKeyring(address, key)
```

`SingleKeyring` はアカウントの `アドレス` と `秘密キー` を格納するクラスです。 秘密鍵文字列を使用した SingleKeyring インスタンスを作成するには、 [caver.wallet.keyring.create](keyring.md#caver-wallet-keyring-create) を参照してください。

`SingleKeyring` はプライベートキーを使用し、ロールが割り当てられていない。

**プロパティ**

| 名前      | タイプ                                 | Description                                               |
| ------- | ----------------------------------- | --------------------------------------------------------- |
| address | 文字列                                 | アカウントのアドレス                                                |
| キー      | [PrivateKey](keyring.md#privatekey) | 内部に1つの秘密鍵を含む [PrivateKey](keyring.md#privatekey) のインスタンス。 |

### マルチプレキーリング <a href="#multiplekeyring" id="multiplekeyring"></a>

```javascript
const keyring = new caver.wallet.keyring.multipleKeyring(address, keys)
```

`MultipleKeyring` は、アカウントの `アドレス` と複数の `秘密鍵` を格納するクラスです。 秘密鍵の文字列を持つマルチプレキーのインスタンスを作成するには、 [caver.wallet.keyring.create](keyring.md#caver-wallet-keyring-create) を参照してください。

`MultipleKeyring` は、ロールが割り当てられていない秘密鍵を使用します。

**プロパティ**

| 名前      | タイプ | Description                                                 |
| ------- | --- | ----------------------------------------------------------- |
| address | 文字列 | アカウントのアドレス                                                  |
| キー      | 行列  | 内部に1つの秘密鍵を含む [PrivateKey](keyring.md#privatekey) インスタンスの配列。 |

### RoleBasedKeyring <a href="#rolebasedkeyring" id="rolebasedkeyring"></a>

```javascript
const keyring = new caver.wallet.keyring.roleBasedKeyring(address, keys)
```

`RoleBasedKeyring` は、アカウントの `アドレス` と、配列の形で役割ごとに使用される `秘密キー` を格納するクラスです。

`RoleBasedKeyring` defines `keys` which is implemented as a two-dimensional array (empty `keys` looks like `[ [], [], [] ]`) that can include multiple keys for each [role](../../../../../klaytn/design/accounts.md#roles). The first array element defines the private key(s) for `roleTransactionKey`, the second defines private key(s) for `roleAccountUpdateKey`, and the third defines the private key(s) for `roleFeePayerKey`.

**プロパティ**

| 名前      | タイプ | Description                                                                                                                                                                                                                                                                                |
| ------- | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| address | 文字列 | アカウントのアドレス                                                                                                                                                                                                                                                                                 |
| キー      | 行列  | [ロール](../../../../../klaytn/design/accounts.md#roles) ごとに使用されるキーを定義する二次元配列。 各 [ロール](../../../../../klaytn/design/accounts.md#roles) には、 [PrivateKey](keyring.md#privatekey) インスタンスが含まれます。 最初の要素は `roleTransactionKey` です。 2 番目の要素は `roleAccountUpdateKey` です。 最後の要素は `roleFeePayerKey` です。 |

以下は、各ロールに定義されたキーを直感的に使用するためのキーリングで定義されたゲッターです。 各ロールに使用されるキーは、以下のゲッターからより簡単にアクセスできます。

| 名前                   | タイプ | Description                                                                                                                 |
| -------------------- | --- | --------------------------------------------------------------------------------------------------------------------------- |
| roleTransactionKey   | 行列  | ロールTransactionKey はトランザクションに署名するために使用されます(アカウントの更新のためのトランザクションを除く)。 `keyring.roleTransactionkey` は `keys` プロパティの最初の要素を返します。 |
| roleAccountUpdateKey | 行列  | ロールAccountUpdateKey は、アカウントの更新取引に署名するために使用されます。 `keyring.roleAccountUpdateKey` は `keys` プロパティの 2 番目の要素を返します。                |
| roleFeePayerKey      | 行列  | roleFeePayerKey は、手数料支払い者としてトランザクションに署名するために使用されます。 `keyring.roleFeePayerKey` は `keys` プロパティの thrid 要素を返します。                |

### PrivateKey <a href="#privatekey" id="privatekey"></a>

```javascript
const privateKey = new caver.wallet.keyring.privateKey('0x{private key}')
```

`PrivateKey` は秘密鍵文字列を含むクラスです。 Keyringで役割ごとに使用される秘密鍵は、この `PrivateKey` インスタンスとして定義されます。

**プロパティ**

| 名前         | タイプ | Description |
| ---------- | --- | ----------- |
| privateKey | 文字列 | 秘密キー文字列。    |

### SignatureData <a href="#signaturedata" id="signaturedata"></a>

`SignatureData` は内部に署名データを含むクラスである。 `sign` または `signMessage` の結果である署名は、signatureDataとして返されます。 signatureData がどのように署名を含んでいるかを以下のように確認できます。

```javascript
const signature = new caver.wallet.keyring.signatureData(['0x1b', '0x2dfc6...', '0x15038...'])
```

**プロパティ**

| 名前 | タイプ | Description  |
| -- | --- | ------------ |
| v  | 文字列 | ECDSAリカバリID。 |
| r  | 文字列 | ECDSA 署名 r.  |
| s  | 文字列 | ECDSA 署名 s.  |

## caver.wallet.keyring.generate <a href="#caver-wallet-keyring-generate" id="caver-wallet-keyring-generate"></a>

```javascript
caver.wallet.keyring.generate([entropy])
```

ランダムに生成された秘密鍵で SingleKeyring インスタンスを生成します。

**パラメータ**

| 名前     | タイプ | Description                   |
| ------ | --- | ----------------------------- |
| エントロピー | 文字列 | (オプション) エントロピーを増加させるランダムな文字列。 |

**戻り値**

| タイプ                                       | Description                     |
| ----------------------------------------- | ------------------------------- |
| [SingleKeyring](keyring.md#singlekeyring) | ランダムに生成された単一のキーリングインスタンスが返されます。 |

**例**

```javascript
> caver.wallet.keyring.generate()
SingleKeyring {
    _address: '0x8ecdfda0281f0d36518f89e0e2444c4f98b2e718',
    _key: PrivateKey { _privateKey: '0x{private key}' }
}
```

## caver.wallet.keyring.generateSingleKey <a href="#caver-wallet-keyring-generatesinglekey" id="caver-wallet-keyring-generatesinglekey"></a>

```javascript
caver.wallet.keyring.generateSingleKey([entropy])
```

秘密キー文字列を生成します。

**パラメータ**

| 名前     | タイプ | Description                   |
| ------ | --- | ----------------------------- |
| エントロピー | 文字列 | (オプション) エントロピーを増加させるランダムな文字列。 |

**戻り値**

| タイプ | Description    |
| --- | -------------- |
| 文字列 | 秘密キー文字列が返されます。 |

**例**

```javascript
> caver.wallet.keyring.generateSingleKey()
'0x{private key}'
```

## caver.wallet.keyring.generateMultipleKeys <a href="#caver-wallet-keyring-generatemultiplekeys" id="caver-wallet-keyring-generatemultiplekeys"></a>

```javascript
caver.wallet.keyring.generateMultipleKeys(num [, entropy])
```

秘密鍵の文字列を生成します。

**パラメータ**

| 名前     | タイプ | Description                   |
| ------ | --- | ----------------------------- |
| num    | 数値  | 秘密鍵の文字列の数。                    |
| エントロピー | 文字列 | (オプション) エントロピーを増加させるランダムな文字列。 |

**戻り値**

| タイプ | Description        |
| --- | ------------------ |
| 行列  | 秘密鍵文字列を含む配列が返されます。 |

**例**

```javascript
> caver.wallet.keyring.generateMultipleKeys(3)
[
    '0x{private key1}',
    '0x{private key2}',
    '0x{private key3}'
]
```

## caver.wallet.keyring.generateRoleBasedKeys <a href="#caver-wallet-keyring-generaterolebasedkeys" id="caver-wallet-keyring-generaterolebasedkeys"></a>

```javascript
caver.wallet.keyring.generateRoleBasedKeys(numArray [, entropy])
```

それぞれの配列要素が [ロール](../../../../../klaytn/design/accounts.md#roles) ごとに定義されたキーを含む2D配列を生成します。

**パラメータ**

| 名前       | タイプ | Description                                                             |
| -------- | --- | ----------------------------------------------------------------------- |
| numArray | 行列  | それぞれの [ロール](../../../../../klaytn/design/accounts.md#roles) のキーの数を含む配列。 |
| エントロピー   | 文字列 | (オプション) エントロピーを増加させるランダムな文字列。                                           |

**戻り値**

| タイプ | Description                                                                               |
| --- | ----------------------------------------------------------------------------------------- |
| 行列  | 各 [ロール](../../../../../klaytn/design/accounts.md#roles) に対して定義されたキーを含む各配列要素の 2D 配列が返されます。 |

**例**

```javascript
> caver.wallet.keyring.generateRoleBasedKeys([2, 1, 3])
[
    [
        '0x{private key1}',
        '0x{private key2}'
    ],
    [
        '0x{private key3}'
    ],
    [
        '0x{private key4}',
        '0x{private key5}',
        '0x{private key6}'
    ]
]
```

## caver.wallet.keyring.create <a href="#caver-wallet-keyring-create" id="caver-wallet-keyring-create"></a>

```javascript
caver.wallet.keyring.create(address, key)
```

パラメータ付きキーリングインスタンスを作成します。

`キー` が秘密鍵文字列の場合、1 つの秘密鍵を使用する [SingleKeyring](keyring.md#singlekeyring) インスタンスが作成されます。 `key` が秘密鍵文字列を含む配列の場合、複数の秘密鍵を使用する [MultipleKeyring](keyring.md#multiplekeyring) インスタンスが作成されます。 If `key` is a 2D array of which each element contains the private key(s) to be used for each role, a [RoleBasedKeyring](keyring.md#rolebasedkeyring) instance is created.

**パラメータ**

| 名前      | タイプ    | Description                                                                                               |
| ------- | ------ | --------------------------------------------------------------------------------------------------------- |
| address | 文字列    | キーリングのアドレス。                                                                                               |
| キー      | 文字列 \ | Array | 秘密キーストリング、秘密キーの配列 または [ロール](../../../../../klaytn/design/accounts.md#roles) ごとに使用するキーを各要素に含む2D配列。 |

**戻り値**

| タイプ     | Description                                                                                                                                                                   |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `キーリング` | キーリングインスタンスが返されます。 `キー` パラメータに応じて、 [シングルキーリング](keyring.md#singlekeyring)、 [マルチプレキーリング](keyring.md#multiplekeyring) または [RoleBasedKeyring](keyring.md#rolebasedkeyring) になります。 |

**例**

```javascript
// Create singleKeyring which uses one private key
> caver.wallet.keyring.create('0x{address in hex}', '0x{private key}')
SingleKeyring {
    _address: '0x30fcfa9679c7141a234c1324c7e0a8b715bdfc90',
    _key: PrivateKey { _privateKey: '0x{private key}' }
}

// Create multipleKeyring which uses multiple private keys
> caver.wallet.keyring.create('0x{address in hex}', ['0x{private key1}', '0x{private key2}'])
MultipleKeyring {
    _address: '0x30fcfa9679c7141a234c1324c7e0a8b715bdfc90',
    _keys: [
        PrivateKey { _privateKey: '0x{private key1}' },
        PrivateKey { _privateKey: '0x{private key2}' }
    ]
}

// Create roleBasedKeyring which uses different private key(s) by roles
> const roleBasedKeys = [
    ['0x{private key1}', '0x{private key2}'],
    ['0x{private key3}', '0x{private key4}'],
    ['0x{private key5}', '0x{private key6}'],
]
> caver.wallet.keyring.create('0x{address in hex}', roleBasedKeys)
RoleBasedKeyring {
    _address: '0x30fcfa9679c7141a234c1324c7e0a8b715bdfc90',
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

## caver.wallet.keyring.createFromPrivateKey <a href="#caver-wallet-keyring-createfromprivatekey" id="caver-wallet-keyring-createfromprivatekey"></a>

```javascript
caver.wallet.keyring.createFromPrivateKey(key)
```

秘密鍵文字列または `KlaytnWalletKey` から [SingleKeyring](../../../../../klaytn/design/accounts.md#klaytn-wallet-key-format) インスタンスを作成します。

**パラメータ**

| 名前 | タイプ | Description                                                                                                         |
| -- | --- | ------------------------------------------------------------------------------------------------------------------- |
| キー | 文字列 | このパラメータは秘密鍵または [KlaytnWalletKey](../../../../../klaytn/design/accounts.md#klaytn-wallet-key-format)のいずれかにすることができます。 |

**戻り値**

| タイプ                                       | Description                |
| ----------------------------------------- | -------------------------- |
| [SingleKeyring](keyring.md#singlekeyring) | SingleKeyringインスタンスが返されます。 |

**例**

```javascript
// Create singleKeyring from private key string
> caver.wallet.keyring.createFromPrivateKey('0x{private key}')
SingleKeyring {
    _address: '0xaa7b43f2eab01cfd787b07ce2f2fb5d6d20a8aa0',
    _key: PrivateKey { _privateKey: '0x{private key}' }
}

// Create singleKeyring from KlaytnWalletKey
> caver.wallet.keyring.createFromPrivateKey('0x{private key}0x{type}0x{address in hex}')
SingleKeyring {
    _address: '0xaa7b43f2eab01cfd787b07ce2f2fb5d6d20a8aa0',
    _key: PrivateKey { _privateKey: '0x{private key}' }
}
```

## caver.wallet.keyring.createFromKlaytnWalletKey <a href="#caver-wallet-keyring-createfromklaytnwalletkey" id="caver-wallet-keyring-createfromklaytnwalletkey"></a>

```javascript
caver.wallet.keyring.createFromKlaytnWalletKey(klaytnWalletKey)
```

`KlaytnWalletKey` 文字列から [SingleKeyring](../../../../../klaytn/design/accounts.md#klaytn-wallet-key-format) インスタンスを作成します。

**パラメータ**

| 名前              | タイプ | Description                                                                               |
| --------------- | --- | ----------------------------------------------------------------------------------------- |
| klaytnWalletKey | 文字列 | [KlaytnWalletKey](../../../../../klaytn/design/accounts.md#klaytn-wallet-key-format) 文字列。 |

**戻り値**

| タイプ                                       | Description                |
| ----------------------------------------- | -------------------------- |
| [SingleKeyring](keyring.md#singlekeyring) | SingleKeyringインスタンスが返されます。 |

**例**

```javascript
> caver.wallet.keyring.createFromKlaytnWalletKey('0x{private key}0x{type}0 x{address in hex}')
SingleKeyring {
    _address: '0xaa7b43f2eab01cfd787b07ce2f2fb5d6d20a8aa0',
    _key: PrivateKey { _privateKey: '0x{private key}' }
}
```

## caver.wallet.keyring.createWithSingleKey <a href="#caver-wallet-keyring-createwithsinglekey" id="caver-wallet-keyring-createwithsinglekey"></a>

```javascript
caver.wallet.keyring.createWithSingleKey(address, key)
```

アドレスと秘密キー文字列から `SingleKeyring` インスタンスを作成します。

**パラメータ**

| 名前      | タイプ | Description         |
| ------- | --- | ------------------- |
| address | 文字列 | キーリングの作成に使用されるアドレス。 |
| キー      | 文字列 | 秘密キー文字列。            |

**戻り値**

| タイプ                                       | Description                |
| ----------------------------------------- | -------------------------- |
| [SingleKeyring](keyring.md#singlekeyring) | SingleKeyringインスタンスが返されます。 |

**例**

```javascript
> caver.wallet.keyring.createWithSingleKey('0x{address in hex}', '0x{private key}')
SingleKeyring {
    _address: '0xaa7b43f2eab01cfd787b07ce2f2fb5d6d20a8aa0',
    _key: PrivateKey { _privateKey: '0x{private key}' }
}
```

## caver.wallet.keyring.createWithMultipleKey <a href="#caver-wallet-keyring-createwithmultiplekey" id="caver-wallet-keyring-createwithmultiplekey"></a>

```javascript
caver.wallet.keyring.createWithMultipleKey(address, key)
```

アドレスと秘密キー文字列から `MultipleKeyring` インスタンスを作成します。

**パラメータ**

| 名前       | タイプ | Description |
| -------- | --- | ----------- |
| address  | 文字列 | キーリングのアドレス。 |
| keyArray | 行列  | 秘密鍵の文字列の配列。 |

**戻り値**

| タイプ                                      | Description                  |
| ---------------------------------------- | ---------------------------- |
| [マルチプレキーリング](keyring.md#multiplekeyring) | MultipleKeyringインスタンスが返されます。 |

**例**

```javascript
> caver.wallet.keyring.createWithMultipleKey('0x{address in hex}', ['0x{private key1}', '0x{private key2}' ])
MultipleKeyring {
    _address: '0x30fcfa9679c7141a234c1324c7e0a8b715bdfc90',
    _keys: [
        PrivateKey { _privateKey: '0x{private key1}' },
        PrivateKey { _privateKey: '0x{private key2}' }
    ]
}
```

## caver.wallet.keyring.createWithRoleBasedKey <a href="#caver-wallet-keyring-createwithrolebasedkey" id="caver-wallet-keyring-createwithrolebasedkey"></a>

```javascript
caver.wallet.keyring.createWithRoleBasedKey(address, roledBasedKeyArray)
```

`RoleBasedKeyring` インスタンスをアドレスと各配列要素がそれぞれの [ロール](../../../../../klaytn/design/accounts.md#roles) に定義されたキーを含む2D配列から作成します。

**パラメータ**

| 名前                 | タイプ | Description              |
| ------------------ | --- | ------------------------ |
| address            | 文字列 | キーリングのアドレス。              |
| roledBasedKeyArray | 行列  | ロールごとの秘密鍵文字列の配列を含む二次元配列。 |

**戻り値**

| タイプ                                             | Description                   |
| ----------------------------------------------- | ----------------------------- |
| [RoleBasedKeyring](keyring.md#rolebasedkeyring) | RoleBasedKeyringインスタンスが返されます。 |

**例**

```javascript
> const roleBasedKeys = [
    ['0x{private key1}', '0x{private key2}'],
    ['0x{private key3}', '0x{private key4}'],
    ['0x{private key5}', '0x{private key6}'],
]
> caver.wallet.keyring.createWithRoleBasedKey('0x{address in hex}', roleBasedKeys)
RoleBasedKeyring {
    _address: '0x30fcfa9679c7141a234c1324c7e0a8b715bdfc90',
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

## caver.wallet.keyring.decrypt <a href="#caver-wallet-keyring-decrypt" id="caver-wallet-keyring-decrypt"></a>

```javascript
caver.wallet.keyring.decrypt(keystore, password)
```

キーストア v3 または v4 JSON を復号化し、復号化された Keyring インスタンスを返します。

**パラメータ**

| 名前       | タイプ    | Description           |
| -------- | ------ | --------------------- |
| keystore | object | 復号するキーストア v3 または v4 。 |
| パスワード    | 文字列    | 暗号化に使用されるパスワード        |

**戻り値**

| タイプ     | Description                                                                                                                                                        |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `キーリング` | 復号されたキーリングインスタンス ([SingleKeyring](keyring.md#singlekeyring), [MultipleKeyring](keyring.md#multiplekeyring) または [RoleBasedKeyring](keyring.md#rolebasedkeyring) ) 。 |

**例**

```javascript
// Decrypt keystroe v4 (encrypted single keyring)
> caver.wallet.keyring.decrypt({ 
    version: 4,
    id: '9c12de05-0153-41c7-a8b7-849472eb5de7',
    address: '0xc02cec4d0346bf4124deeb55c5216a4138a40a8c',
    keyring: [
        { 
            ciphertext: 'eacf496cea5e80eca291251b3743bf93cdbcf7072efc3a74efeaf518e2796b15',
            cipherparams: { iv: 'd688a4319342e872cefcf51aef3ec2da' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: {
                dklen: 32,
                salt: 'c3cee502c7157e0faa42386c6d666116ffcdf093c345166c502e23bc34e6ba40',
                n: 4096,
                r: 8,
                p: 1
            },
            mac: '4b49574f3d3356fa0d04f73e07d5a2a6bbfdd185bedfa31f37f347bc98f2ef26'
        }
    ]
}, 'password')
SingleKeyring {
    _address: '0xc02cec4d0346bf4124deeb55c5216a4138a40a8c',
    _key: PrivateKey { _privateKey: '0x{private key}' }
}

// Decrypt keystroe v4 (encrypted multiple keyring)
> caver.wallet.keyring.decrypt({
    version: 4,
    id: '55da3f9c-6444-4fc1-abfa-f2eabfc57501',
    address: '0x86bce8c859f5f304aa30adb89f2f7b6ee5a0d6e2',
    keyring: [
        {
            ciphertext: '93dd2c777abd9b80a0be8e1eb9739cbf27c127621a5d3f81e7779e47d3bb22f6',
            cipherparams: { iv: '84f90907f3f54f53d19cbd6ae1496b86' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: {
                dklen: 32,
                salt: '69bf176a136c67a39d131912fb1e0ada4be0ed9f882448e1557b5c4233006e10',
                n: 4096,
                r: 8,
                p: 1,
            },
            mac: '8f6d1d234f4a87162cf3de0c7fb1d4a8421cd8f5a97b86b1a8e576ffc1eb52d2',
        },
        {
            ciphertext: '53d50b4e86b550b26919d9b8cea762cd3c637dfe4f2a0f18995d3401ead839a6',
            cipherparams: { iv: 'd7a6f63558996a9f99e7daabd289aa2c' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: {
                dklen: 32,
                salt: '966116898d90c3e53ea09e4850a71e16df9533c1f9e1b2e1a9edec781e1ad44f',
                n: 4096,
                r: 8,
                p: 1,
            },
            mac: 'bca7125e17565c672a110ace9a25755847d42b81aa7df4bb8f5ce01ef7213295',
        },
    ],
}, 'password')
MultipleKeyring {
    _address: '0x86bce8c859f5f304aa30adb89f2f7b6ee5a0d6e2',
    _keys: [
        PrivateKey { _privateKey: '0x{private key1}' },
        PrivateKey { _privateKey: '0x{private key2}' }
    ]
}

// Decrypt keystroe v4 (encrypted role-based keyring)
> caver.wallet.keyring.decrypt({
    version: 4,
    id: '55da3f9c-6444-4fc1-abfa-f2eabfc57501',
    address: '0x86bce8c859f5f304aa30adb89f2f7b6ee5a0d6e2',
    keyring: [
        [
            {
                ciphertext: '93dd2c777abd9b80a0be8e1eb9739cbf27c127621a5d3f81e7779e47d3bb22f6',
                cipherparams: { iv: '84f90907f3f54f53d19cbd6ae1496b86' },
                cipher: 'aes-128-ctr',
                kdf: 'scrypt',
                kdfparams: {
                    dklen: 32,
                    salt: '69bf176a136c67a39d131912fb1e0ada4be0ed9f882448e1557b5c4233006e10',
                    n: 4096,
                    r: 8,
                    p: 1,
                },
                mac: '8f6d1d234f4a87162cf3de0c7fb1d4a8421cd8f5a97b86b1a8e576ffc1eb52d2',
            },
            {
                ciphertext: '53d50b4e86b550b26919d9b8cea762cd3c637dfe4f2a0f18995d3401ead839a6',
                cipherparams: { iv: 'd7a6f63558996a9f99e7daabd289aa2c' },
                cipher: 'aes-128-ctr',
                kdf: 'scrypt',
                kdfparams: {
                    dklen: 32,
                    salt: '966116898d90c3e53ea09e4850a71e16df9533c1f9e1b2e1a9edec781e1ad44f',
                    n: 4096,
                    r: 8,
                    p: 1,
                },
                mac: 'bca7125e17565c672a110ace9a25755847d42b81aa7df4bb8f5ce01ef7213295',
            },
        ],
        [
            {
                ciphertext: 'f16def98a70bb2dae053f791882f3254c66d63416633b8d91c2848893e7876ce',
                cipherparams: { iv: 'f5006128a4c53bc02cada64d095c15cf' },
                cipher: 'aes-128-ctr',
                kdf: 'scrypt',
                kdfparams: {
                    dklen: 32,
                    salt: '0d8a2f71f79c4880e43ff0795f6841a24cb18838b3ca8ecaeb0cda72da9a72ce',
                    n: 4096,
                    r: 8,
                    p: 1,
                },
                mac: '38b79276c3805b9d2ff5fbabf1b9d4ead295151b95401c1e54aed782502fc90a',
            },
        ],
        [
            {
                ciphertext: '544dbcc327942a6a52ad6a7d537e4459506afc700a6da4e8edebd62fb3dd55ee',
                cipherparams: { iv: '05dd5d25ad6426e026818b6fa9b25818' },
                cipher: 'aes-128-ctr',
                kdf: 'scrypt',
                kdfparams: {
                    dklen: 32,
                    salt: '3a9003c1527f65c772c54c6056a38b0048c2e2d58dc0e584a1d867f2039a25aa',
                    n: 4096,
                    r: 8,
                    p: 1,
                },
                mac: '19a698b51409cc9ac22d63d329b1201af3c89a04a1faea3111eec4ca97f2e00f',
            },
            {
                ciphertext: 'dd6b920f02cbcf5998ed205f8867ddbd9b6b088add8dfe1774a9fda29ff3920b',
                cipherparams: { iv: 'ac04c0f4559dad80dc86c975d1ef7067' },
                cipher: 'aes-128-ctr',
                kdf: 'scrypt',
                kdfparams: {
                    dklen: 32,
                    salt: '22279c6dbcc706d7daa120022a236cfe149496dca8232b0f8159d1df999569d6',
                    n: 4096,
                    r: 8,
                    p: 1,
                },
                mac: '1c54f7378fa279a49a2f790a0adb683defad8535a21bdf2f3dadc48a7bddf517',
            },
        ],
    ],
}, 'password')
RoleBasedKeyring {
    _address: '0x86bce8c859f5f304aa30adb89f2f7b6ee5a0d6e2',
    _keys: [
        [
            PrivateKey { _privateKey: '0x{private key1}' },
            PrivateKey { _privateKey: '0x{private key2}' }
        ],
        [
            PrivateKey { _privateKey: '0x{private key3}' }
        ],
        [
            PrivateKey { _privateKey: '0x{private key4}' },
            PrivateKey { _privateKey: '0x{private key5}' }
        ]
    ]
}

// Decrypt keystroe v3 JSON
> caver.wallet.keyring.decrypt({ 
    version: 3,
    id: '43f99d36-3905-40e6-bff8-ff0dfc380037',
    address: '0xc02cec4d0346bf4124deeb55c5216a4138a40a8c',
    crypto: {
        ciphertext: 'f7296e68807837a5318502c097276a89d58d91b85e45e692aee284a27bcd0955',
        cipherparams: { iv: '03fd985d07777601078840c73cc6f7f3' },
        cipher: 'aes-128-ctr',
        kdf: 'scrypt',
        kdfparams: {
            dklen: 32,
            salt: '46f85271c43fa64ab3338c5235f1d5073bc9379d9b7ba6065c89afb816d83a8a',
            n: 4096,
            r: 8,
            p: 1
        },
     mac: '947f13cd1481fa5ba186e59418ef7600fa69e9830054d59e4d5dc67176e1f967'
    }
}, 'password')
SingleKeyring {
    _address: '0xc02cec4d0346bf4124deeb55c5216a4138a40a8c',
    _key: PrivateKey { _privateKey: '0x{private key}' }
}
```

## keyring.getPublicKey <a href="#keyring-getpublickey" id="keyring-getpublickey"></a>

```javascript
keyring.getPublicKey()
```

公開鍵文字列を返します。 `keyring` が [SingleKeyring](keyring.md#singlekeyring)のインスタンスである場合、getPublicKey は公開鍵文字列を返します。 `keyring` が [MultipleKeyring](keyring.md#multiplekeyring)のインスタンスである場合、getPublicKey は公開鍵文字列の配列を返します。 `キーリング` が [RoleBasedKeyring](keyring.md#rolebasedkeyring)のインスタンスの場合 getPublicKey は、各ロールに使用される公開キーが配列として定義される二次元配列を返します。

**パラメータ**

| 名前 | タイプ     | Description                       |
| -- | ------- | --------------------------------- |
| 圧縮 | boolean | (オプション) 圧縮形式かどうか(デフォルト: `false`)。 |

**戻り値**

| タイプ    | Description        |
| ------ | ------------------ |
| 文字列 \ | Array | キーリングの公開鍵。 |

**例**

```javascript
// Get public key with singleKeyring
> keyring.getPublicKey()
'0x49b2a...'

// Get public key with multipleKeyring
> keyring.getPublicKey()
[ '0x65b51...', '0x8d85c...' ]

// Get public key with roleBasedKeyring
> keyring.getPublicKey()
[
    [ '0x2d939...', '0x6beb4...', '0xd8f2f...' ],
    [ '0xf09cd...', '0x96a63...', '0x02000...' ],
    [ '0xc2d33...', '0x3088f...', '0xab193...' ]
]
```

## keyring.copy <a href="#keyring-copy" id="keyring-copy"></a>

```javascript
keyring.copy()
```

コピーされたキーリングインスタンスを返します。

**戻り値**

| タイプ     | Description                                                                                                                                                         |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `キーリング` | コピーされたキーリングインスタンス ([SingleKeyring](keyring.md#singlekeyring), [MultipleKeyring](keyring.md#multiplekeyring) または [RoleBasedKeyring](keyring.md#rolebasedkeyring) ) 。 |

**例**

```javascript
// When keyring is an instance of SingleKeyring
> keyring.copy()
SingleKeyring {
    _address: '0x30fcfa9679c7141a234c1324c7e0a8b715bdfc90',
    _key: PrivateKey { _privateKey: '0x{private key}' }
}

// When keyring is an instance of MultipleKeyring
> keyring.copy()
MultipleKeyring {
    _address: '0x30fcfa9679c7141a234c1324c7e0a8b715bdfc90',
    _keys: [
        PrivateKey { _privateKey: '0x{private key1}' },
        PrivateKey { _privateKey: '0x{private key2}' }
    ]
}

// When keyring is an instance of RoleBasedKeyring
> keyring.copy()
RoleBasedKeyring {
    _address: '0x30fcfa9679c7141a234c1324c7e0a8b715bdfc90',
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

## keyring.sign <a href="#keyring-sign" id="keyring-sign"></a>

```javascript
keyring.sign(transactionHash, chainId, role [, index])
```

トランザクション付きのサインプライベートキーでハッシュし、署名を返します。 ユーザーがインデックスパラメータを定義していない場合、 `keyring.sign` はロールによって使用されるすべての秘密鍵を使用してトランザクションに署名します。 `index` が定義されている場合、 `keyring.sign` はインデックスで秘密鍵を 1 つだけ使用してトランザクションに署名します。 caver-jsで使用される役割は、 `caver.wallet.keyring.role` を通して確認することができます。

トランザクションに署名するときは、 [caver.wallet.sign](./#caver-wallet-sign) または [transaction.sign](../caver.transaction/#transaction-sign) を使用することをお勧めします。

**パラメータ**

| 名前              | タイプ    | Description                                                                                                  |
| --------------- | ------ | ------------------------------------------------------------------------------------------------------------ |
| transactionHash | 文字列    | 署名するトランザクションのハッシュ文字列。                                                                                        |
| chainId         | 文字列 \ | number | KlaytnブロックチェーンプラットフォームのチェーンID。                                                                      |
| ロール             | 数値     | キーの役割を示す数値。 `caver.wallet.keyring.role` を使用できます。                                                             |
| インデックス          | 数値     | (オプション) 使用する秘密鍵のインデックス。 インデックスは、ロールごとに定義された秘密鍵の配列の長さよりも小さくなければなりません。 インデックスが定義されていない場合、このメソッドはすべての秘密鍵を使用します。 |

**戻り値**

| タイプ | Description                                   |
| --- | --------------------------------------------- |
| 行列  | [SignatureData](keyring.md#signaturedata) の配列 |

**例**

```javascript
// Using roleBasedKeyring which has two private key in roleTransactionKey
> keyring.sign('0xe9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550', '0x2810', caver.wallet.keyring.role.roleTransactionKey)
[
    SignatureData { _v: '0x5044', _r: '0x7a8b6...', _s: '0x17139...' },
    SignatureData { _v: '0x5043', _r: '0x7f978...', _s: '0x1a532...' }
] ]

// Using roleBasedKeyring which has two private key in roleTransactionKey with index
> keyring. ign('0xe9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550', '0x2810', caver.wallet.keyring.roleTransactionKey, 1)
[
    SignatureData { _v: '0x5043', _r: '0x7f978...', _s: '0x1a532...' }
]

// Using roleBasedKeyring which has two private key in roleAccountUpdateKey
> keyring.sign('0xe9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550', '0x2810', caver.wallet.keyring.role.roleAccountUpdateKey)
[
    SignatureData { _v: '0x5044', _r: '0xdbce8...', _s: '0x039a6...' },
    SignatureData { _v: '0x5044', _r: '0xf69b7...', _s: '0x71dc9...' }
] ]

// Using roleBasedKeyring which has two private key in roleAccountUpdateKey with index
> keyring. ign('0xe9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550', '0x2810', caver.wallet.keyring.roleAccountUpdateKey, 1)
[
    SignatureData { _v: '0x5044', _r: '0xf69b7...', _s: '0x71dc9...' }
]

// Using roleBasedKeyring which has two private key in roleFeePayerKey
> keyring.sign('0xe9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550', '0x2810', caver.wallet.keyring.role.roleFeePayerKey)
[
    SignatureData { _v: '0x5043', _r: '0xe48bf...', _s: '0x1cf36...' },
    SignatureData { _v: '0x5043', _r: '0x82976...', _s: '0x3c5e0...' }
]

// Using roleBasedKeyring which has two private key in roleFeePayerKey with index
> keyring.sign('0xe9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550', '0x2810', caver.wallet.keyring.role.roleFeePayerKey, 1)
[
    SignatureData { _v: '0x5043', _r: '0x82976...', _s: '0x3c5e0...' }
]
```

## keyring.ecsign <a href="#keyring-ecsign" id="keyring-ecsign"></a>

```javascript
keyring.ecsign(hash, role [, index])
```

秘密鍵を使用してハッシュされたデータを持つサインインし、V が 0 または 1 (secp256k1 曲線の y 値のパリティ) の署名を返します。

この関数は特定のトランザクションタイプにのみ使用されます。 したがって、トランザクションに署名する際には、 [caver.wallet.sign](./#caver-wallet-sign) または [transaction.sign](../caver.transaction/#transaction-sign) を使用することをお勧めします。

**パラメータ**

| 名前     | タイプ | Description                                                                                                  |
| ------ | --- | ------------------------------------------------------------------------------------------------------------ |
| hash   | 文字列 | 署名するハッシュ文字列。                                                                                                 |
| ロール    | 数値  | キーの役割を示す数値。 `caver.wallet.keyring.role` を使用できます。                                                             |
| インデックス | 数値  | (オプション) 使用する秘密鍵のインデックス。 インデックスは、ロールごとに定義された秘密鍵の配列の長さよりも小さくなければなりません。 インデックスが定義されていない場合、このメソッドはすべての秘密鍵を使用します。 |

**戻り値**

| タイプ | Description                                   |
| --- | --------------------------------------------- |
| 行列  | [SignatureData](keyring.md#signaturedata) の配列 |

**例**

```javascript
> keyring.ecsign('0xe9a11d9ef95fb437f75d07ce768d43e74f158d54b106e7d3746ce29d545b550', caver.wallet.keyring.role.transactionKey)
[
    SignatureData { _v: '0x00', _r: '0x7a8b6...', _s: '0x17139...' }
]
```

## keyring.signMessage <a href="#keyring-signmessage" id="keyring-signmessage"></a>

```javascript
keyring.signMessage(message, role [, index])
```

Klaytn固有の接頭辞でメッセージにサインします。 これは、Klaytn 固有の署名を次のように計算します。

```
sign(kecchak256("\x19Klaytn Signed Message:\n" + len(message) + message)))
```

ユーザーがindexパラメータを定義していない場合、 `keyring.signMessage` はロールによって使用されるすべての秘密鍵でメッセージに署名します。 index パラメータが与えられた場合、 `keyring.signMessage` は指定されたインデックスで一つの秘密鍵だけを使ってメッセージに署名します。 caver-js で使用される役割は `caver.wallet.keyring.role` から見つけることができます。

**パラメータ**

| 名前      | タイプ | Description                                                                                                  |
| ------- | --- | ------------------------------------------------------------------------------------------------------------ |
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
// Sign with roleTransactionKey
> keyring.signMessage('message to sign', caver.wallet.keyring.role.roleTransactionKey)
{
    messageHash: '0x9c4c1ae0aa1faf7e59eaf6fcf36a34542698197b379a9949b58c92925e74c069',
    signatures: [
        SignatureData { _v: '0x1b', _r: '0x2dfc6...', _s: '0x15038...' }
    ],
    message: 'message to sign'
}

// Sign with roleFeePayerKey and index
> keyring.signMessage('message to sign', caver.wallet.keyring.role.roleFeePayerKey, 1)
{
    messageHash: '0x9c4c1ae0aa1faf7e59eaf6fcf36a34542698197b379a9949b58c92925e74c069',
    signatures: [
        SignatureData { _v: '0x1b', _r: '0x2dfc6...', _s: '0x15038...' }
    ],
    message: 'message to sign'
}
```

## keyring.getKeyByRole <a href="#keyring-getkeybyrole" id="keyring-getkeybyrole"></a>

```javascript
keyring.getKeyByRole(role)
```

パラメータとして入力されたロールによって使用される秘密キーを返します。

**パラメータ**

| 名前  | タイプ | Description                                      |
| --- | --- | ------------------------------------------------ |
| ロール | 数値  | キーの役割を示す数値。 `caver.wallet.keyring.role` を使用できます。 |

**戻り値**

| タイプ                                   | Description                                                                                                          |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| [PrivateKey](keyring.md#privatekey)\ | Array | [PrivateKey](keyring.md#privatekey) のインスタンス、またはロールによって使用される [PrivateKey](keyring.md#privatekey) インスタンスを含む配列。 |

**例**

```javascript
// singleKeyringでのgetKeyByRole。 
// SingleKeyringは役割に関係なく同じPrivateKeyインテンスを返します。
> keyring.getKeyByRole(caver.wallet.keyring.role.roleTransactionKey)
PrivateKey { _privateKey: '0x{private key}' }

> keyring.getKeyByRole(caver.wallet.keyring.role.roleAccountUpdateKey)
PrivateKey { _privateKey: '0x{private key}' }

> keyring.getKeyByRole(caver.wallet.keyring.role.roleFeePayerKey)
PrivateKey { _privateKey: '0x{private key}' }

// getKeyByRole with multipleKeyring. 
// The multipleKeyring will also return the single same array of PrivateKey intances regardless of role
> keyring.getKeyByRole(caver.wallet.keyring.role.roleTransactionKey)
[
    PrivateKey { _privateKey: '0x{private key1}' },
    PrivateKey { _privateKey: '0x{private key2}' }
]

> keyring.getKeyByRole(caver.wallet.keyring.role.roleAccountUpdateKey)
[
    PrivateKey { _privateKey: '0x{private key1}' },
    PrivateKey { _privateKey: '0x{private key2}' }
]

> keyring.getKeyByRole(caver.wallet.keyring.role.roleFeePayerKey)
[
    PrivateKey { _privateKey: '0x{private key1}' },
    PrivateKey { _privateKey: '0x{private key2}' }
]

// getKeyByRole with roleBasedKeyring. 
// The roleBasedKeyring will return different array of PrivateKey intances depends on role
> keyring.getKeyByRole(caver.wallet.keyring.role.roleTransactionKey)
[
    PrivateKey { _privateKey: '0x{private key1}' }
]

> keyring.getKeyByRole(caver.wallet.keyring.role.roleAccountUpdateKey)
[
    PrivateKey { _privateKey: '0x{private key2}' },
    PrivateKey { _privateKey: '0x{private key3}' }
]

> keyring.getKeyByRole(caver.wallet.keyring.role.roleFeePayerKey)
[
    PrivateKey { _privateKey: '0x{private key4}' },
    PrivateKey { _privateKey: '0x{private key5}' },
    PrivateKey { _privateKey: '0x{private key6}' }
]
```

## keyring.getKlaytnWalletKey <a href="#keyring-getklaytnwalletkey" id="keyring-getklaytnwalletkey"></a>

```javascript
keyring.getKlaytnWalletKey()
```

キーリングの [KlaytnWalletKey](../../../../../klaytn/design/accounts.md#klaytn-wallet-key-format) 文字列を返します。 [MultipleKeyring](keyring.md#multiplekeyring) または [RoleBasedKeyring](keyring.md#rolebasedkeyring), [KlaytnWalletKey](../../../../../klaytn/design/accounts.md#klaytn-wallet-key-format) は使用できません。 この場合、 [keyring.encrypt](keyring.md#keyring-encrypt) を使用します。

**戻り値**

| タイプ | Description                                                                                  |
| --- | -------------------------------------------------------------------------------------------- |
| 文字列 | キーリングの [KlaytnWalletKey](../../../../../klaytn/design/accounts.md#klaytn-wallet-key-format)。 |

**例**

```javascript
> keyring.getKlaytnWalletKey()
'0x{private key}0x{type}0x{address in hex}'
```

## keyring.toAccount <a href="#keyring-toaccount" id="keyring-toaccount"></a>

```javascript
keyring.toAccount([options])
```

[Klaytn アカウント](../caver.account.md#account) の [AccountKey](../../../../../klaytn/design/accounts.md#account-key) を更新するための [アカウント](../../../../../klaytn/design/accounts.md#klaytn-accounts) インスタンスを返します。 [アカウント](../caver.account.md#account) インスタンスには公開鍵を含むことができる [AccountKey](../caver.account.md#accountkeylegacy) インスタンスがあります これはKlaytn Networkに送信され、トランザクションの検証に使用されます。 [アカウント](../caver.account.md#account)についての詳細は、 [アカウント更新](../../getting-started.md#account-update) を参照してください。

Klaytn に保存されている [アカウント](../../../../../klaytn/design/accounts.md#account-key) の [AccountKey](../../../../../klaytn/design/accounts.md#klaytn-accounts) を更新した場合に注意してください。 古い秘密鍵はもう使えません 返された [アカウント](../../getting-started.md#account-update) インスタンスの使用方法については、 [Klaytn アカウント](../caver.account.md#account) の [Klaytn アカウント](../../../../../klaytn/design/accounts.md#klaytn-accounts) の情報を更新する方法を参照してください。

キーリング内の秘密鍵の種類によって、返される [アカウント](../caver.account.md#account) インスタンスは以下のように分類されます。

* キーリングに秘密鍵文字列が含まれている場合: キーリングにアドレスを含む [アカウント](../caver.account.md#account) インスタンスと [AccountKeyPublic](../caver.account.md#accountkeypublic) のインスタンスを返します
* キーリングに秘密鍵が含まれている場合: キーリングにアドレスを含む [アカウント](../caver.account.md#account) インスタンスと [AccountKeyWeigthedMultiSig](../caver.account.md#accountkeyweightedmultisig) インスタンスを返します。
* キーリングにロール別の秘密鍵文字列が含まれている場合: キーリング内のアドレスと [AccountKeyRoleベース](../caver.account.md#account) のインスタンスを含む [アカウント](../caver.account.md#accountkeyrolebased)インスタンスを返す

**パラメータ**

| 名前    | タイプ                                                                      | Description                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ----- | ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| オプション | [WeightedMultiSigOptions](../caver.account.md#weightedmultisigoptions)\ | Array | (任意) [WeightedMultiSigOptions](../caver.account.md#weightedmultisigoptions) インスタンスには、既存のアカウントをいくつかの秘密鍵を持つアカウントに更新する際に定義される情報が含まれています。 キーリングが各ロールに異なる秘密鍵を使用する場合、配列内の各ロールに対して [WeightedMultiSigOptions](../caver.account.md#weightedmultisigoptions) インスタンスを定義する必要があります。 キーリングが複数の秘密鍵を使用し、オプションパラメータが定義されていない場合、 デフォルトの [WeightedMultiSigOptions](../caver.account.md#weightedmultisigoptions) にしきい値が 1 で、各キーの重みが 1 になります。 |

**戻り値**

| タイプ                                  | Description                                                                                                                                                                                                       |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [アカウント](../caver.account.md#account) | ユーザーが Klaytn で自分のアカウントの AccountKey を更新したときに使用するアカウントインスタンス。 既存のキーリング(または既存の秘密鍵)を新しいキーリング(または新しい秘密鍵)に置き換えたい場合は、アカウントの新しい秘密鍵(または新しい秘密鍵)を置き換えることに注意してください。 アカウント更新トランザクションを事前に Klaytn に送信して、AccountKey を更新する必要があります。 |

**例**

```javascript
// Get account with singleKeyring
> keyring.toAccount()
Account {
    _address: '0x6a3edfad6d1126020d5369e9097db39281876c5d',
    _accountKey: AccountKeyPublic { _publicKey: '0xc396b...' }
}

// Get account with multipleKeyring
> keyring.toAccount()
Account {
    _address: '0x53027503242c2f99969eeb8cb3a31f48f3668712',
    _accountKey: AccountKeyWeightedMultiSig {
        _threshold: 1,
        _weightedPublicKeys: [
            WeightedPublicKey { _weight: 1, _publicKey: '0x969c8...' },
            WeightedPublicKey { _weight: 1, _publicKey: '0x5bc06...' },
            WeightedPublicKey { _weight: 1, _publicKey: '0x33d83...' }
        ]
    }
}

// Get account with multipleKeyring and options
> keyring.toAccount(new caver.account.weightedMultiSigOptions(3, [2, 2, 3]))
Account {
    _address: '0x53027503242c2f99969eeb8cb3a31f48f3668712',
    _accountKey: AccountKeyWeightedMultiSig {
        _threshold: 3,
        _weightedPublicKeys: [
            WeightedPublicKey { _weight: 2, _publicKey: '0x969c8...' },
            WeightedPublicKey { _weight: 2, _publicKey: '0x5bc06...' },
            WeightedPublicKey { _weight: 3, _publicKey: '0x33d83...' }
        ]
    }
}

// Get account with roleBasedKeyring
> keyring.toAccount()
Account {
    _address: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _accountKey: AccountKeyRoleBased {
        _accountKeys: [
            AccountKeyWeightedMultiSig {
                _threshold: 1,
                _weightedPublicKeys: [
                    WeightedPublicKey { _weight: 1, _publicKey: '0x65b51...' },
                    WeightedPublicKey { _weight: 1, _publicKey: '0x8d85c...' }
                ] ]
            },
            AccountKeyWeightedMultiSig {
                _threshold: 1,
                _weightedPublicKeys: [
                    WeightedPublicKey { _weight: 1, _publicKey: '0x66899...' },
                    WeightedPublicKey { _weight: 1, _publicKey: '0x7705d...' }
                ]
            },
            AccountKeyWeightedMultiSig {
                _threshold: 1,
                _weightedPublicKeys: [
                    WeightedPublicKey { _weight: 1, _publicKey: '0xaa934...' },
                    WeightedPublicKey { _weight: 1, _publicKey: '0xb763f...' }
                ]
            }
        ]
    }
}

// Get account with roleBasedKeyring and options
> const options = [
    new caver.account.weightedMultiSigOptions(3, [2, 3]),
    new caver.account.weightedMultiSigOptions(2, [1, 1]),
    new caver.account.weightedMultiSigOptions(5, [3, 5])
]
> keyring.toAccount(options)
Account {
    _address: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _accountKey: AccountKeyRoleBased {
        _accountKeys: [
            AccountKeyWeightedMultiSig {
                _threshold: 3,
                _weightedPublicKeys: [
                    WeightedPublicKey { _weight: 2, _publicKey: '0x65b51...' },
                    WeightedPublicKey { _weight: 3, _publicKey: '0x8d85c...' }
                ] ]
            },
            AccountKeyWeightedMultiSig {
                _threshold: 2,
                _weightedPublicKeys: [
                    WeightedPublicKey { _weight: 1, _publicKey: '0x66899...' },
                    WeightedPublicKey { _weight: 1, _publicKey: '0x7705d...' }
                ] ]
            },
            AccountKeyWeightedMultiSig {
                _threshold: 5,
                _weightedPublicKeys: [
                    WeightedPublicKey { _weight: 3, _publicKey: '0xaa934...' },
                    WeightedPublicKey { _weight: 5, _publicKey: '0xb763f...' }
                ]
            }
        ]
    }
}
```

## keyring.encrypt <a href="#keyring-encrypt" id="keyring-encrypt"></a>

```javascript
keyring.encrypt(password [, options])
```

キーリングを暗号化し、キーストア v4 標準を返します。 詳細については、 [KIP-3](https://kips.klaytn.foundation/KIPs/kip-3) を参照してください。

**パラメータ**

| 名前    | タイプ | Description                                       |
| ----- | --- | ------------------------------------------------- |
| パスワード | 文字列 | 暗号化に使用するパスワード 暗号化された鍵ストアは、このパスワードで復号することができます。    |
| オプション | 文字列 | (オプション) `オプション` パラメーターでは、暗号化を使用するときに使用する値を指定できます。 |

**戻り値**

| タイプ    | Description     |
| ------ | --------------- |
| object | 暗号化されたキーストア v4。 |

返されたオブジェクトには以下のものが含まれています:

| 名前      | タイプ | Description                             |
| ------- | --- | --------------------------------------- |
| バージョン   | 数値  | キーストアのバージョン。                            |
| id      | 文字列 | キーストアのID。                               |
| address | 文字列 | 暗号化された [キーリング](keyring.md#class) のアドレス。 |
| keyring | 行列  | 暗号化された秘密鍵。                              |

詳細については、 [KIP-3](https://kips.klaytn.foundation/KIPs/kip-3) を参照してください。

**例**

```javascript
// Encrypt singleKeyring
> keyring.encrypt('password')
{ 
    version: 4,
    id: '9c12de05-0153-41c7-a8b7-849472eb5de7',
    address: '0xc02cec4d0346bf4124deeb55c5216a4138a40a8c',
    keyring: [
        { 
            ciphertext: 'eacf496cea5e80eca291251b3743bf93cdbcf7072efc3a74efeaf518e2796b15',
            cipherparams: { iv: 'd688a4319342e872cefcf51aef3ec2da' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: {
                dklen: 32,
                salt: 'c3cee502c7157e0faa42386c6d666116ffcdf093c345166c502e23bc34e6ba40',
                n: 4096,
                r: 8,
                p: 1
            },
            mac: '4b49574f3d3356fa0d04f73e07d5a2a6bbfdd185bedfa31f37f347bc98f2ef26'
        }
    ]
}

// Encrypt multipleKeyring
> keyring.encrypt('password')
{
    version: 4,
    id: 'b9fe7bb3-3ae9-41df-a0f2-5f20f525a290',
    address: '0x6e039858fe4c65fe6605fde722ef94a78a3fefed',
    keyring: [
        { 
            ciphertext: '91d62dd3be9a854387c2595b0a53d561b2c99c8fe4a675600a16532f48f5c750',
            cipherparams: { iv: '853b3804c6627af342a8b35474105953' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: {
                dklen: 32,
                salt: '3a3b4d9bd97413b2bef95798dc27a29c73d4802ac7258e8b126eeb909f822c72',
                n: 4096,
                r: 8,
                p: 1
            },
            mac: 'b5fe00edb3f9e5c02056b276380b30a7e61ed8e2925b898bc3d528138cd3c939'
        },
        {
            ciphertext: '494486f72355d95991ba95fd5ed7eeecf0f9a3d2fa0a94400125befb4b4c043f',
            cipherparams: { iv: '64be3daa213e359a404ec2e38c1ac9e1' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: {
                dklen: 32,
                salt: 'f089ee99bfe00f9a43b562624b9376b99963b9d4b8681c076935431dc5c98177',
                n: 4096,
                r: 8,
                p: 1
            },
            mac: '4c8a72a3acb8b07d81033a8bc91f01a4025c684e882e758acde441323a75605f'
        }
    ]
}

// Encrypt roleBasedKeyring
> keyring.encrypt('password')
{
    version: 4,
    id: '99d27cfe-8e3f-427c-bd4c-e4e3cd43955b',
    address: '0xe1d711ee2ac2dfec5b1e6ea583c8270b7575702a',
    keyring: [
        [
            {
                ciphertext: '07a3d8c1c6a01734e429bb4ea88d282b3547fa422653f9547c0544bfca011af0',
                cipherparams: { iv: '707177c48b5bfc1f88e91f10eb327b1b' },
                cipher: 'aes-128-ctr',
                kdf: 'scrypt',
                kdfparams: { dklen: 32, salt: '452f3e41d9e58b42d348b326319fc27b29ed5f5177e063087f8cb272c6b73fe3', n: 4096, r: 8, p: 1 },
                mac: 'bccd141b9056f7ee26b8e9a4ef52d231403162ed2593df8f2e6b2f2d26a737d2',
            },
            {
                ciphertext: 'c94defa5049b910eb57d46125e3dbdb9d32bfb85f3915aa96e25e75d2346970f',
                cipherparams: { iv: 'fae425c4a44c881e629ccdc0fcf53916' },
                cipher: 'aes-128-ctr',
                kdf: 'scrypt',
                kdfparams: { dklen: 32, salt: '37302d0a0625321193e482da55e19a0a51ac250cf4857ecb13112b8c88cbdf44', n: 4096, r: 8, p: 1 },
                mac: '04f7b2879b7e9604356fd4db532c981b4eaa95078c25694e591e7cc2a5c613f1',
            },
        ],

        [
            {
                ciphertext: '015ef2deab867b887fa29c866941512af848e4b547d74a39f44cc4c9ef204b5f',
                cipherparams: { iv: '230271676c4501a860b19b325b1850a6' },
                cipher: 'aes-128-ctr',
                kdf: 'scrypt',
                kdfparams: { dklen: 32, salt: 'eb73f9cacea4e0b38634679102ab5b8f0e84464c2fa3ca07d11ebcdfb7a95519', n: 4096, r: 8, p: 1 },
                mac: 'd76a0f22b2f5a23dac30be820260b3fc738083b797d5c608b23bce8a69f63256',
            },
        ],

        [
            {
                ciphertext: '70870f4dd813fc7c0c4ef64ebba03f15c81677d2558d646b3d143ab8e0d27ec2',
                cipherparams: { iv: '841be9a25127fca0cc79740763ec3e55' },
                cipher: 'aes-128-ctr',
                kdf: 'scrypt',
                kdfparams: { dklen: 32, salt: '089ef66590b699c347caddafa592c8f074948b0ca6e2957bae45d005cd55a874', n: 4096, r: 8, p: 1 },
                mac: '6e1ad546d9e3ad1f3c3419ace4c9daf34a310001875b1a3228dbfd1891030bff',
            },
        ],
    ],
}
```

## keyring.encryptV3 <a href="#keyring-encryptv3" id="keyring-encryptv3"></a>

```javascript
keyring.encryptV3(password [, options])
```

[SingleKeyring](keyring.md#singlekeyring) のインスタンスを暗号化し、キーストア v3 標準を返します。

[MultipleKeyring](keyring.md#multiplekeyring) と [RoleBasedKeyring](keyring.md#rolebasedkeyring) はencryptV3を使用できないことに注意してください。 この場合、 [keyring.encrypt](keyring.md#keyring-encrypt) をキーストア V4 標準で使用してください。

**パラメータ**

| 名前    | タイプ | Description                                             |
| ----- | --- | ------------------------------------------------------- |
| パスワード | 文字列 | 暗号化に使用するパスワード 暗号化された鍵ストアは、このパスワードで復号することができます。          |
| オプション | 文字列 | (オプション) 暗号化に使用するパスワード。 暗号化された鍵ストアは、このパスワードで復号することができます。 |

**戻り値**

| タイプ    | Description     |
| ------ | --------------- |
| object | 暗号化されたキーストア v3。 |

返されたオブジェクトには以下のものが含まれています:

| 名前      | タイプ    | Description                             |
| ------- | ------ | --------------------------------------- |
| バージョン   | 数値     | キーストアのバージョン。                            |
| id      | 文字列    | キーストアのID。                               |
| address | 文字列    | 暗号化された [キーリング](keyring.md#class) のアドレス。 |
| crypto  | object | 暗号化された秘密鍵。                              |

**例**

```javascript
> keyring.encryptV3('password')
{ 
    version: 3,
    id: '43f99d36-3905-40e6-bff8-ff0dfc380037',
    address: '0xc02cec4d0346bf4124deeb55c5216a4138a40a8c',
    crypto: {
        ciphertext: 'f7296e68807837a5318502c097276a89d58d91b85e45e692aee284a27bcd0955',
        cipherparams: { iv: '03fd985d07777601078840c73cc6f7f3' },
        cipher: 'aes-128-ctr',
        kdf: 'scrypt',
        kdfparams: {
            dklen: 32,
            salt: '46f85271c43fa64ab3338c5235f1d5073bc9379d9b7ba6065c89afb816d83a8a',
            n: 4096,
            r: 8,
            p: 1
        },
     mac: '947f13cd1481fa5ba186e59418ef7600fa69e9830054d59e4d5dc67176e1f967'
    }
}
```

## keyring.isDecoupled <a href="#keyring-isdecoupled" id="keyring-isdecoupled"></a>

```javascript
keyring.isDecoupled()
```

キーがデカップリングされている場合、 `true` を返します。

**戻り値**

| タイプ     | Description      |
| ------- | ---------------- |
| boolean | `` キーが分離されている場合。 |

**例**

```javascript
> keyring.isDecoupled()
true

> keyring.isDecoupled()
false
```
