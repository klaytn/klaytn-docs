# caver.transaction

`caver.transaction` はトランザクションに関連する機能を提供するパッケージです。

## クラス <a href="#class" id="class"></a>

各トランザクションクラスは以下の表で詳細に説明されています。

|                        | 基本                                                        | 料金 委託                                                                                      | 一部手数料の委譲                                                                                                             |
| ---------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| 従来の取引                  | [従来の取引](basic.md#legacytransaction)                       | 該当なし                                                                                       | 該当なし                                                                                                                 |
| ValueTransfer          | [ValueTransfer](basic.md#valuetransfer)                   | [FeeDelegatedValueTransfer](fee-delegation.md#feedelegatedvaluetransfer)                   | [FeeDelegatedValueTransferWithRatio](partial-fee-delegation.md#feedelegatedvaluetransferwithratio)                   |
| ValueTransferMemo      | [ValueTransferMemo](basic.md#valuetransfermemo)           | [手数料委任値TransferMemo](fee-delegation.md#feedelegatedvaluetransfermemo)                      | [FeeDelegatedValueTransferMemoWithRatio](partial-fee-delegation.md#feedelegatedvaluetransfermemowithratio)           |
| SmartContractDeploy    | [SmartContractDeploy](basic.md#smartcontractdeploy)       | [FeeDelegatedSmartContractDeploy](fee-delegation.md#feedelegatedsmartcontractdeploy)       | [FeeDelegatedSmartContractDeployWithRatio](partial-fee-delegation.md#feedelegatedsmartcontractdeploywithratio)       |
| SmartContractExecution | [SmartContractExecution](basic.md#smartcontractexecution) | [FeeDelegatedSmartContractExecution](fee-delegation.md#feedelegatedsmartcontractexecution) | [FeeDelegatedSmartContractExecutionWithRatio](partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio) |
| アカウント更新                | [アカウント更新](basic.md#accountupdate)                         | [FeeDelegatedAccountUpdate](fee-delegation.md#feedelegatedaccountupdate)                   | [FeeDelegatedAccountUpdateWithRatio](partial-fee-delegation.md#feedelegatedaccountupdatewithratio)                   |
| キャンセル                  | [キャンセル](basic.md#cancel)                                  | [手数料委任キャンセル](fee-delegation.md#feedelegatedcancel)                                         | [FeeDelegatedCancelWithRatio](partial-fee-delegation.md#feedelegatedcancelwithratio)                                 |
| ChainDataAnchoring     | [ChainDataAnchoring](basic.md#chaindataanchoring)         | [FeeDelegatedChainDataAnchoring](fee-delegation.md#feedelegatedchaindataanchoring)         | [FeeDelegatedChainDataAnchoringWithRatio](partial-fee-delegation.md#feedelegatedchaindataanchoringwithratio)         |
| EthereumAccessList     | [EthereumAccessList](basic.md#ethereumaccesslist)         | 該当なし                                                                                       | 該当なし                                                                                                                 |
| EthereumDynamicFee     | [EthereumDynamicFee](basic.md#ethereumdynamicfee)         | 該当なし                                                                                       | 該当なし                                                                                                                 |

## caver.transaction.decode <a href="#caver-transaction-decode" id="caver-transaction-decode"></a>

```javascript
caver.transaction.decode(rlpEncode)
```

RLPエンコードされたトランザクション文字列、生トランザクションをデコードし、 [トランザクション](./#class) インスタンスを返します。

**パラメータ**

| 名前          | タイプ | Description                     |
| ----------- | --- | ------------------------------- |
| rlpEncodeed | 文字列 | デコードする RLP エンコードされたトランザクション文字列。 |

**戻り値**

| タイプ    | Description                                                                     |
| ------ | ------------------------------------------------------------------------------- |
| object | [トランザクション](./#class) のインスタンス 各トランザクションの詳細については、 [トランザクション](./#class) を参照してください。 |

**例**

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

## caver.transaction.getTransactionByHash <a href="#caver-transaction-gettransactionbyhash" id="caver-transaction-gettransactionbyhash"></a>

```javascript
caver.transaction.getTransactionByHash('0x{transaction hash}')
```

Klaytnからトランザクションを問い合わせ、キャバートランザクションインスタンスに変換します。

**注意** `caver.transaction.getTransactionByHash` は caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3) からサポートされています。

**パラメータ**

| 名前              | タイプ | Description                    |
| --------------- | --- | ------------------------------ |
| transactionHash | 文字列 | Klaytnから問い合わせるトランザクションハッシュ文字列。 |

**戻り値**

`Promise` が `object`を返す : [Transaction](./#class) のインスタンス。 Klaytn からのトランザクションオブジェクトの受信に失敗した場合、エラーが発生します。

| タイプ    | Description                                                                     |
| ------ | ------------------------------------------------------------------------------- |
| object | [トランザクション](./#class) のインスタンス 各トランザクションの詳細については、 [トランザクション](./#class) を参照してください。 |

**例**

```javascript
> caver.transaction.getTransactionByHash('0x30575f5a76a4477502aa1e5e707e47f05b92c3450132529cf55764cc94f780b0').then(console.log)
LegacyTransaction {
  _type: 'TxTypeLegacyTransaction',
  _from: '0x9ce618d097ea54c00d1562cb060576ff64139f10',
  _gas: '0x81b320',
  _nonce: '0x1de',
  _gasPrice: '0x5d21dba00',
  _signatures: SignatureData {
    _v: '0x07f5',
    _r: '0x359a09ebd2842cfc9cad6fd93c299da8629292bb3a69410c73837f7ca15cfd51',
    _s: '0x6f348cc656b90e79cfc1e748c3371fbd0128b83b787a110622f3aa5143a017f8'
  },
  _to: '0x',
  _input: '0x60806...',
  _value: '0x0'
}
```

## caver.transaction.recoverPublicKeys <a href="#caver-transaction-recoverpublickeys" id="caver-transaction-recoverpublickeys"></a>

```javascript
caver.transaction.recoverPublicKeys('0x{RLP-encoded transaction}')
```

指定されたトランザクションの `署名` フィールドから公開鍵文字列を復元します。

**注意** `caver.transaction.recoverPublicKeys` は caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3) からサポートされています。

**パラメータ**

| 名前    | タイプ | Description                                 |
| ----- | --- | ------------------------------------------- |
| rawTx | 文字列 | `署名` から公開鍵を回復するための RLP エンコードされたトランザクション文字列。 |

**戻り値**

| タイプ | Description           |
| --- | --------------------- |
| 行列  | `署名` から回収された公開鍵を含む配列。 |

**例**

```javascript
> caver.transaction.recoverPublicKeys('0x08f9010e808505d21dba008402faf0809459177716c34ac6e49e295a0e78e33522f14d61ee0194f21460730845e3652aa3cc9bc13b345e4f53984af8d5f845820feaa02b5934c6d26bb3e65edf099d79c57c743d2f70744ca09d3ba9a1099edff9f173a00797886edff4b449c1a599943e3a6003ae9e46b3f3f34862ced327e43fba3a6af845820fe9a063177648732ef855f800eb9f80f68501abb507f84c0d660286a6e0801334a1d2a0620a996623c114f2df35b11ec8ac4f3758d3ad89cf81ba13614e51908cfe9218f845820fe9a086c8ecbfd892be41d48443a2243274beb6daed3f72895045965a3baede4c350ea069ea748aff6e4c106d3a8ba597d8f134745b76f12dacb581318f9da07351511a')
[
  '0x8bb6aaeb2d96d024754d3b50babf116cece68977acbe8ba6a66f14d5217c60d96af020a0568661e7c72e753e80efe084a3aed9f9ac87bf44d09ce67aad3d4e01',
  '0xc7751c794337a93e4db041fb5401c2c816cf0a099d8fd4b1f3f555aab5dfead2417521bb0c03d8637f350df15ef6a6cb3cdb806bd9d10bc71982dd03ff5d9ddd',
  '0x3919091ba17c106dd034af508cfe00b963d173dffab2c7702890e25a96d107ca1bb4f148ee1984751e57d2435468558193ce84ab9a7731b842e9672e40dc0f22'
]
```

## caver.transaction.recoverFeePayerPublicKeys <a href="#caver-transaction-recoverfeepayerpublickeys" id="caver-transaction-recoverfeepayerpublickeys"></a>

```javascript
caver.transaction.recoverFeePayerPublicKeys('0x{RLP-encoded transaction}')
```

指定されたトランザクションの `feePayerSignatures` フィールドから公開鍵文字列を復元します。

**注意** `caver.transaction.recoverFeePayerPublicKeys` は caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3) からサポートされています。

**パラメータ**

| 名前    | タイプ | Description                                                                                                                                  |
| ----- | --- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| rawTx | 文字列 | `feePayerSignatures` から公開鍵を回復するための RLP エンコードされたトランザクション文字列。 手数料支払者の公開鍵を復元するには、トランザクションは `feePayerSignatures` フィールド内の手数料委任トランザクションである必要があります。 |

**戻り値**

| タイプ | Description                           |
| --- | ------------------------------------- |
| 行列  | `feePayerSignatures` から回収された公開鍵を含む配列。 |

**例**

```javascript
> caver.transaction.recoverFeePayerPublicKeys('0x09f901fa808505d21dba008402faf0809459177716c34ac6e49e295a0e78e33522f14d61ee019407a9a76ef778676c3bd2b334edcf581db31a85e5f8d5f845820feaa0cb2bbf04a12ec3a06163c30ce8782739ec4745a53e265aa9443f1c0d678bb871a07dd348c7d8fce6be36b661f116973d1c36cc92a389ad4a1a4053bd486060a083f845820fe9a06d5dfca992d6833c0da272578bc6ea941be45f44fb2fa114310ebe18d673ed52a04dc5cd7985c9ce7d44d46d65e65c995a4a8c97159a1eed8b2efb0510b981ab7cf845820feaa0945151edf556fbcebf832092d4534b9a3b1f3d46f85bce09e7d7211070cb57bea01617c8f918f96970baddd12f240a9824eca6b29d91eb7333adacb987f2dcd8dd94b5db72925b1b6b79299a1a49ae226cd7861083acf8d5f845820feaa086fd17d788e89a6e0639395b3c0a04f916103debd6cbe639d6f4ff5034dde3e8a00795551c551d9096234c290689767f34f2d409c95166ab18d216dbc93845ba16f845820feaa00653b6d1cdb90462094b089ce8e2fed0e3b8ec2c44125965e1a5af286644c758a0259b10e3bf594d48535fd0d95e15d095897c8d075c01dd56e7417d5943b0d53af845820fe9a0ce8d051427adab10d1dc93de49123aeab18ba8aadedce0d57ef5b7fa451b1f4fa04fe2a845d92ff48abca3e1d59637fab5f4a4e3172d91772d9bfce60760edc506')
[
  '0x2b557d80ddac3a0bbcc8a7861773ca7434c969e2721a574bb94a1e3aa5ceed3819f08a82b31682c038f9f691fb38ee4aaf7e016e2c973a1bd1e48a51f60a54ea',
  '0x1a1cfe1e2ec4b15520c57c20c2460981a2f16003c8db11a0afc282abf929fa1c1868f60f91b330c423aa660913d86acc2a0b1b15e7ba1fe571e5928a19825a7e',
  '0xdea23a89dbbde1a0c26466c49c1edd32785432389641797038c2b53815cb5c73d6cf5355986fd9a22a68bb57b831857fd1636362b383bd632966392714b60d72'
]
```

## transaction.sign <a href="#transaction-sign" id="transaction-sign"></a>

```javascript
transaction.sign(keyring [, index] [, hasher])
```

`キーリング` 内の秘密鍵を使用してトランザクション送信者として署名し、トランザクションオブジェクトに `署名` を追加します。

[アカウント更新](basic.md#accountupdate) トランザクションの場合は、 [roleAccountUpdateKey](../../../../../klaytn/design/accounts.md#roles)を使用するか、またはそれ以外の場合は、 [RoleBasedKeyring](../caver.wallet/keyring.md#rolebasedkeyring) で [roleTransactionKey](../../../../../klaytn/design/accounts.md#roles) を使用してください。 If the user has not defined an `index`, `transaction.sign` signs the transaction using all the private keys used by the role. `index` が定義されている場合、 `transaction.sign` は指定されたインデックスの 1 つの秘密鍵のみを使用してトランザクションに署名します。

**パラメータ**

| 名前      | タイプ       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| keyring | オブジェクト \ | string | A private key string ([KlaytnWalletKey](../../../../../klaytn/design/accounts.md#klaytn-wallet-key-format) format is also allowed) or an instance of Keyring ([SingleKeyring](../caver.wallet/keyring.md#singlekeyring), [MultipleKeyring](../caver.wallet/keyring.md#multiplekeyring) or [RoleBasedKeyring](../caver.wallet/keyring.md#rolebasedkeyring)). 秘密キー文字列または [KlaytnWalletKey](../../../../../klaytn/design/accounts.md#klaytn-wallet-key-format) がパラメータとして渡されると、キーリングインスタンスは内部的に作成されます。 |
| インデックス  | 数値        | (オプション) 使用する秘密鍵のインデックス。 インデックスは、ロールごとに定義された秘密鍵の配列の長さよりも小さくなければなりません。 インデックスが定義されていない場合、このメソッドはすべての秘密鍵を使用します。                                                                                                                                                                                                                                                                                                                                                                                                |
| ハッシャー   | 関数        | (オプション) トランザクションのハッシュを取得するハッシュ関数。                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

**戻り値**

`Promise` が `object`を返す: 署名されたトランザクション。

| タイプ    | Description                                                         |
| ------ | ------------------------------------------------------------------- |
| object | [トランザクション](./#class) のインスタンス。 署名が `transaction.signations` に追加されます。 |

**例**

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

## transaction.signAsFeePayer <a href="#transaction-signasfeepayer" id="transaction-signasfeepayer"></a>

```javascript
transaction.signAsFeePayer(keyring [, index] [, hasher])
```

トランザクションにトランザクション `手数料支払人` として署名し、 `キーリング` 内の秘密鍵を持つトランザクションオブジェクトに `feePayerSignatures`を追加します。

手数料支払者としてトランザクションに署名するには、 [keyring](../../../../../klaytn/design/accounts.md#roles) で `roleFeePayerKey` を使用してください。 If the user has not defined an `index`, `transaction.signAsFeePayer` signs the transaction using all the private keys used by the role. `index` が定義されている場合、 `transaction.signAsFeePayer` は指定されたインデックスの 1 つの秘密鍵のみを使用してトランザクションに署名します。

`transaction.feePayer` が定義されていない場合、与えられたキーリングのアドレスは `transaction.feePayer` に設定されます。

If the `keyring` to be used for signing the transaction was added to `caver.wallet`, you can use [caver.wallet.signAsFeePayer](../caver.wallet/#caver-wallet-signasfeepayer).

**注意** この関数は、「手数料委任」トランザクションまたは「レシオ付き手数料委任」トランザクションでのみ動作します。

**パラメータ**

| 名前      | タイプ       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| keyring | オブジェクト \ | string | A private key string ([KlaytnWalletKey](../../../../../klaytn/design/accounts.md#klaytn-wallet-key-format) format is also allowed) or an instance of Keyring ([SingleKeyring](../caver.wallet/keyring.md#singlekeyring), [MultipleKeyring](../caver.wallet/keyring.md#multiplekeyring) or [RoleBasedKeyring](../caver.wallet/keyring.md#rolebasedkeyring)). 秘密キー文字列または [KlaytnWalletKey](../../../../../klaytn/design/accounts.md#klaytn-wallet-key-format) がパラメータとして渡されると、キーリングインスタンスは内部的に作成されます。 |
| インデックス  | 数値        | (オプション) 使用する秘密鍵のインデックス。 インデックスは、ロールごとに定義された秘密鍵の配列の長さよりも小さくなければなりません。 インデックスが定義されていない場合、このメソッドはすべての秘密鍵を使用します。                                                                                                                                                                                                                                                                                                                                                                                                |
| ハッシャー   | 関数        | (オプション) トランザクションのハッシュを取得するハッシュ関数。                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

**戻り値**

`Promise` が `object`を返す: 署名されたトランザクション。

| タイプ    | Description                                                                 |
| ------ | --------------------------------------------------------------------------- |
| object | [トランザクション](./#class) のインスタンス。 署名は `transaction.feePayerSignatures` に追加されます。 |

**例**

```javascript
// This example uses the FeeDelegatedValueTransfer transactions.
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

## transaction.appendSignatures <a href="#transaction-appendsignatures" id="transaction-appendsignatures"></a>

```javascript
transaction.appendSignatures(signatures)
```

トランザクションに `の署名` を追加します。

**パラメータ**

| 名前         | タイプ       | Description                                                                                                                                                                                                                                            |
| ---------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| signatures | オブジェクト \ | Array | トランザクションに追加されるシグネチャ。 [SignatureData](../caver.wallet/keyring.md#signaturedata) インスタンス、または [SignatureData](../caver.wallet/keyring.md#signaturedata) インスタンスを含む配列。 それぞれの'v'、'r'の配列。 そして 's' は文字列フォーマットとして順番に定義され、配列を含む2次元配列もパラメータとして受け取ることができます。 |

**例**

```javascript
> transaction.appendSignatures([ '0x4e44', '0x7010e...', '0x65d6b...' ])
```

## transaction.appendFeePayerSignatures <a href="#transaction-appendfeepayersignatures" id="transaction-appendfeepayersignatures"></a>

```javascript
transaction.appendFeePayerSignatures(signatures)
```

`feePayerSignatures` をトランザクションに追加する。

**注意** この関数は、「手数料委任」トランザクションまたは「レシオ付き手数料委任」トランザクションでのみ動作します。

**パラメータ**

| 名前                 | タイプ       | Description                                                                                                                                                                                                                                                                             |
| ------------------ | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| feePayerSignatures | オブジェクト \ | Array | feePayerSignatures to be appended to the transaction. [SignatureData](../caver.wallet/keyring.md#signaturedata) インスタンス、または [SignatureData](../caver.wallet/keyring.md#signaturedata) インスタンスを含む配列。 それぞれの'v'、'r'の配列。 そして 's' は文字列フォーマットとして順番に定義され、配列を含む2次元配列もパラメータとして受け取ることができます。 |

**例**

```javascript
> transaction.appendFeePayerSignatures([ '0x4e44', '0x7010e...', '0x65d6b...' ])
```

## transaction.combineSignedRawTransaction <a href="#transaction-combinesignatures" id="transaction-combinesignatures"></a>

```javascript
transaction.combineSignedRawTransactions(rlpEncodedTxs)
```

指定された配列内の RLP エンコードされた各トランザクション文字列のサインを収集します。 それらをトランザクションインスタンスと組み合わせて、すべてのサインを含むRLPエンコードされたトランザクション文字列を返します。 トランザクションインスタンスは必ずしも事前に署名されていないことに注意してください。 トランザクションが「手数料委任」または「手数料委任」のいずれかのタイプの場合。 `feePayerSignatures` もマージされ、出力のRLPエンコードトランザクション文字列に含まれる。

**パラメータ**

| 名前            | タイプ | Description                |
| ------------- | --- | -------------------------- |
| rlpEncodedTxs | 行列  | RLPエンコードされたトランザクション文字列の配列。 |

**戻り値**

| タイプ | Description                                                                                                           |
| --- | --------------------------------------------------------------------------------------------------------------------- |
| 文字列 | すべての `署名` (および `feePayerSignatures` )を含む RLP エンコードされたトランザクション文字列。トランザクションが「手数料が引き渡された」または「レシオ付き手数料が委任された」いずれかのタイプの場合。 |

**例**

```javascript
> transaction.combineSignedRawTransactions(['0x09f88...'])
'0x09f885018505d21dba00830f4240947b65b75d204abed71587c9e519a89277766ee1d00a9404bb86a1b16113ebe8f57071f839b002cbcbf7d0f847f845820feaa068e56f3da7fbe7a86543eb4b244ddbcb13b2d1cb9adb3ee8a4c8b046821bc492a068c29c057055f68a7860b54184bba7967bcf42b6aae12beaf9f30933e6e730c280c4c3018080'
```

## transaction.getRLPEncoding <a href="#transaction-getrlpencoding" id="transaction-getrlpencoding"></a>

```javascript
transaction.getRLPEncoding()
```

RLP でエンコードされたトランザクション文字列を返します。

各トランザクションタイプの RLP エンコードされた文字列の作成方法については、 [Klaytn Design - トランザクション](../../../../../klaytn/design/transactions/) を参照してください。

**戻り値**

| タイプ | Description               |
| --- | ------------------------- |
| 文字列 | RLP でエンコードされたトランザクション文字列。 |

**例**

```javascript
> transaction.getRLPEncoding()
'0x09f885018505d21dba00830f4240947b65b75d204abed71587c9e519a89277766ee1d00a9404bb86a1b16113ebe8f57071f839b002cbcbf7d0f847f845820feaa068e56f3da7fbe7a86543eb4b244ddbcb13b2d1cb9adb3ee8a4c8b046821bc492a068c29c057055f68a7860b54184bba7967bcf42b6aae12beaf9f30933e6e730c280c4c3018080'
```

## transaction.getRawTransaction <a href="#transaction-getrawtransaction" id="transaction-getrawtransaction"></a>

```javascript
transaction.getRawTransaction()
```

`rawTransaction` 文字列 (RLPエンコードされたトランザクション文字列) を返します。 この関数は [transaction.getRPEncoding](./#transaction-getrlpencoding) と同じです。

**戻り値**

| タイプ | Description               |
| --- | ------------------------- |
| 文字列 | RLP でエンコードされたトランザクション文字列。 |

**例**

```javascript
> transaction.getRawTransaction()
'0x09f885018505d21dba00830f4240947b65b75d204abed71587c9e519a89277766ee1d00a9404bbb86a1b16113ebe8f57071f839b002cbcbf7d0f847f845820feaa068e56f3da7fbe7a86543eb4b244ddbcb13b2d1cb9adb3ee8a4c8b046821bc492a06829c057055faa78b54b7967bcf42b6aaaaaae12beaf933e56
```

## transaction.getTransactionHash <a href="#transaction-gettransactionhash" id="transaction-gettransactionhash"></a>

```javascript
transaction.getTransactionHash()
```

`transactionHash` を返します。

トランザクションタイプごとにトランザクションハッシュを作成する方法については、 [Klaytn Design - トランザクション](../../../../../klaytn/design/transactions/) を参照してください。

**戻り値**

| タイプ | Description   |
| --- | ------------- |
| 文字列 | トランザクションハッシュ。 |

**例**

```javascript
> transaction.getTransactionHash()
'0x8ac53afbba014201b02398545653683fe0536c49707fe302c59423012c0e8697'
```

## transaction.getSenderTxHash <a href="#transaction-getsendertxhash" id="transaction-getsendertxhash"></a>

```javascript
transaction.getSenderTxHash()
```

トランザクションの [senderTxHash](../../../../../klaytn/design/transactions/#sendertxhash) を返します。

The [senderTxHash](../../../../../klaytn/design/transactions/#sendertxhash) is a hash of the transaction except for the fee payer's address and signature, so [transactionHash](./#transaction-gettransactionhash) and [senderTxHash](../../../../../klaytn/design/transactions/#sendertxhash) are the same for basic transactions.

各トランザクションタイプの [senderTxHash](../../../../../klaytn/design/transactions/#sendertxhash) を作成する方法については、 [Klaytn Design - Transactions](../../../../../klaytn/design/transactions/) を参照してください。

**戻り値**

| タイプ | Description   |
| --- | ------------- |
| 文字列 | senderTxHash。 |

**例**

```javascript
> transaction.getSenderTxHash()
'0xb61cc1ddadb6f2ec34c9f9e6a7b6cf0a606422654d649d998587c77daa3c31fe'
```

## transaction.getRLPEncodingForSignature <a href="#transaction-getrlpencodingforsignature" id="transaction-getrlpencodingforsignature"></a>

```javascript
transaction.getRLPEncodingForSignature()
```

トランザクション送信者の署名を行うための RLP エンコードされたトランザクション文字列を返します。 返された RLP エンコードされたトランザクション文字列は、署名とともに追加されず、この署名を生成するために使用されることに注意してください。

各トランザクションタイプのトランザクション送信者の署名を生成するために、RLPエンコードされたトランザクション文字列を作成する方法についての情報。 see [Klaytn Design - トランザクション](../../../../../klaytn/design/transactions/).

**戻り値**

| タイプ | Description                        |
| --- | ---------------------------------- |
| 文字列 | 署名が添付されていないRLPエンコードされたトランザクション文字列。 |

**例**

```javascript
> transaction.getRLPEncodingForSignature()
'0xf83fb838f709018505d21dba00830f4240947b65b75d204abed71587c9e519a89277766ee1d00a9404bb86a9404b16113ebe8f57071f839b002cbcbf7d08207e380'
```

## transaction.getRLPEncodingForFeePayerSignature <a href="#transaction-getrlpencodingforfeepayersignature" id="transaction-getrlpencodingforfeepayersignature"></a>

```javascript
transaction.getRLPEncodingForFeePayerSignature()
```

手数料支払者の署名を行うための RLP エンコードされたトランザクション文字列を返します。 返された RLP エンコードされたトランザクション文字列は、署名とともに追加されず、この署名を生成するために使用されることに注意してください。

各トランザクションタイプに対する手数料支払者の署名を生成するために、RLPエンコードされたトランザクション文字列を作成する方法についての情報。 see [Klaytn Design - トランザクション](../../../../../klaytn/design/transactions/).

**注意** この関数は、「手数料委任」トランザクションまたは「レシオ付き手数料委任」トランザクションでのみ動作します。

**戻り値**

| タイプ | Description                        |
| --- | ---------------------------------- |
| 文字列 | 署名が添付されていないRLPエンコードされたトランザクション文字列。 |

**例**

```javascript
> transaction.getRLPEncodingForFeePayerSignature()
'0xf840b838f709018505d21dba00830f4240947b65b75d204abed71587c9e519a89277766ee1d00a9404b16113ebe8f57071f839b002cbcbf7d0808207e38080'
```

## transaction.fillTransaction <a href="#transaction-filltransaction" id="transaction-filltransaction"></a>

```javascript
transaction.fillTransaction()
```

トランザクション内の任意の変数で塗りつぶします。

`gasPrice`, `nonce`, またはトランザクションの `chainId` が定義されていない場合 このメソッドは、これらのオプション変数のデフォルト値を要求し、接続された Klaytn Node に JSON RPC 呼び出しを送信することによってプリセットします。

Use [caver.rpc.klay.getGasPrice](../caver.rpc/klay.md#caver-rpc-klay-getgasprice) to get `gasPrice`, [caver.rpc.klay.getTransactionCount](../caver.rpc/klay.md#caver-rpc-klay-gettransactioncount) to get `nonce` and [caver.rpc.klay.getChainId](../caver.rpc/klay.md#caver-rpc-klay-getchainid) call to get `chainId`.

**戻り値**

`Promise` `void` を返す

**例**

```javascript
> transaction.fillTransaction()
```

## transaction.recoverPublicKeys <a href="#transaction-recoverpublickeys" id="transaction-recoverpublickeys"></a>

```javascript
transaction.recoverPublicKeys()
```

`署名` フィールドから公開鍵文字列を復元します。

**注意** `transaction.recoverPublicKeys` は caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3) からサポートされています。

**戻り値**

| タイプ | Description           |
| --- | --------------------- |
| 行列  | `署名` から回収された公開鍵を含む配列。 |

**例**

```javascript
> transaction.recoverPublicKeys()
[
  '0x8bb6aaeb2d96d024754d3b50babf116cece68977acbe8ba6a66f14d5217c60d96af020a0568661e7c72e753e80efe084a3aed9f9ac87bf44d09ce67aad3d4e01',
  '0xc7751c794337a93e4db041fb5401c2c816cf0a099d8fd4b1f3f555aab5dfead2417521bb0c03d8637f350df15ef6a6cb3cdb806bd9d10bc71982dd03ff5d9ddd',
  '0x3919091ba17c106dd034af508cfe00b963d173dffab2c7702890e25a96d107ca1bb4f148ee1984751e57d2435468558193ce84ab9a7731b842e9672e40dc0f22'
]
```

## transaction.recoverFeePayerPublicKeys <a href="#transaction-recoverfeepayerpublickeys" id="transaction-recoverfeepayerpublickeys"></a>

```javascript
transaction.recoverFeePayerPublicKeys()
```

`feePayerSignatures` フィールドから公開鍵文字列を復元する。

**注意** `transaction.recoverFeePayerPublicKeys` は caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3) からサポートされています。

**戻り値**

| タイプ | Description                           |
| --- | ------------------------------------- |
| 行列  | `feePayerSignatures` から回収された公開鍵を含む配列。 |

**例**

```javascript
> transaction.recoverFeePayerPublicKeys()
[
  '0x2b557d80ddac3a0bbcc8a7861773ca7434c969e2721a574bb94a1e3aa5ceed3819f08a82b31682c038f9f691fb38ee4aaf7e016e2c973a1bd1e48a51f60a54ea',
  '0x1a1cfe1e2ec4b15520c57c20c2460981a2f16003c8db11a0afc282abf929fa1c1868f60f91b330c423aa660913d86acc2a0b1b15e7ba1fe571e5928a19825a7e',
  '0xdea23a89dbbde1a0c26466c49c1edd32785432389641797038c2b53815cb5c73d6cf5355986fd9a22a68bb57b831857fd1636362b383bd632966392714b60d72'
]
```

## transaction.suggestGasPrice <a href="#transaction-suggestgasprice" id="transaction-suggestgasprice"></a>

```javascript
transaction.suggestGasPrice()
```

リターンは、ガス価格を提案した。 この関数は、 [fillTransaction](./#transaction-fillTransaction) に gasPrice 項目を設定するために使用されます。

マグマハードフォークの前に `suggestGasPrice` はネットワークの単価を返します。 マグマハードフォークの後、 `suggestGasPrice` は gasPrice として使用することを推奨する `baseFee * 2` を返します。

**注意** `transaction.suggestGasPrice` は caver-js [v1.9.0](https://www.npmjs.com/package/caver-js/v/1.9.0) からサポートされています。

**戻り値**

`Promise` returning `string`: 16進数文字列で提案されたガス価格。

| タイプ | Description |
| --- | ----------- |
| 文字列 | ガス価格が提案された。 |

**例**

```javascript
> tx.suggestGasPrice().then(console.log)
0xba43b7400
```
