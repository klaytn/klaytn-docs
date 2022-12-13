# caver.account <a id="caver-account"></a>

`caver.account` は、アカウントの更新時に使用されるアカウントに関連する機能を提供するパッケージです。

## クラス <a id="class"></a>

### アカウント <a id="account"></a>

```javascript
const account = new caver.account(address, accountKey)
```

`アカウント` は、Klaytn ブロックチェーンプラットフォーム(Klaytn)のアカウントの [AccountKey][] を更新するために必要な情報を含むクラスです。 これは `caver.account` パッケージのデフォルトクラスです。 公開鍵文字列を使用してアカウントインスタンスを作成するには、 [caver.account.create](#caver-account-create) を参照してください。

**プロパティ**

| 名前         | タイプ    | Description                                                                                                                                                                                                                                                                                                                              |
| ---------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address    | 文字列    | 更新されるアカウントのアドレス                                                                                                                                                                                                                                                                                                                          |
| accountKey | object | アカウントで使用される新しいアカウントキー This can be an instance of [AccountKeyLegacy](#accountkeylegacy), [AccountKeyPublic](#accountkeypublic), [AccountKeyFail](#accountkeyfail), [AccountKeyWeightedMultiSig](#accountkeyweightedmultisig) or [AccountKeyRoleBased](#accountkeyrolebased). トランザクションが実行されると、Klaytn に保存されているアカウントの accountKey がこれに変更されます。 |


### AccountKeyLegacy <a id="accountkeylegacy"></a>

```javascript
const accountKeyLegacy = new caver.account.accountKey.accountKeyLegacy()
```

`AccountKeyLegacy` は [AccountKeyLegacy][] で Klaytn のアカウントの AccountKey を更新するために使用されます。 `AccountKeyLegacy`を使用してアカウントインスタンスを作成するには、 [caver.account.createWithAccountKeyLegacy](#caver-account-createwithaccountkeylegacy) を参照してください。


### AccountKeyPublic <a id="accountkeypublic"></a>

```javascript
const accountKeyPublic = new caver.account.accountKey.accountKeyPublic(publicKey)
```

`AccountKeyPublic` は [AccountKeyPublic][] で Klaytn のアカウントの AccountKey を更新するために使用されます。 AccountKey を `AccountKeyPublic`に更新することで 既存のAccountKeyを新しい公開鍵に変更して、Klaytnでトランザクションを検証するために使用します。 この変更は、お客様のアカウントのアドレスから秘密鍵を切り離す際に必要です。 詳細は [AccountUpdate](../getting-started.md#account-update) と [AccountKey][] を参照してください。

`AccountKeyPublic`を使用してアカウントインスタンスを作成するには、 [caver.account.create](#caver-account-create) または [caver.account.createWithAccountKeyPublic](#caver-account-createwithaccountkeypublic) を参照してください。

**プロパティ**

| 名前   | タイプ | Description |
| ---- | --- | ----------- |
| 公開キー | 文字列 | 公開鍵の文字列。    |

### AccountKeyFail <a id="accountkeyfail"></a>

```javascript
const accountKeyFail = new caver.account.accountKey.accountKeyFail()
```

`AccountKeyFail` は [AccountKeyFail][] で Klaytn のアカウントの AccountKey を更新するために使用されます。 `AccountKeyFail`を使用してアカウントインスタンスを作成するには、 [caver.account.createWithAccountKeyFail](#caver-account-createwithaccountkeyfail) を参照してください。

### AccountKeyWeightedMultiSig <a id="accountkeyweightedmultisig"></a>

```javascript
const accountKeyWeightedMultiSig = new caver.account.accountKey.accountKeyWeightedMultiSig(threshold, weitedPublicKeys)
```

`AccountKeyWeightedMultiSig` は [AccountKeyWeightedMultiSig][] で Klaytn のアカウントの AccountKey を更新するために使用されます。 AccountKey を `AccountKeyWeightedMultiSig`に更新することで、 既存のAccountKeyを新しい公開鍵に変更して、Klaytnでトランザクションを検証するために使用します。 この変更は、お客様のアカウントのアドレスから秘密鍵を切り離す際に必要です。 詳細は [AccountUpdate](../getting-started.md#account-update) と [AccountKey][] を参照してください。

`AccountKeyWeightedMultiSig`を使用してアカウントインスタンスを作成するには、 [caver.account.create](#caver-account-create) または [caver.account.createWithAccountKeyWeightedMultiSig](#caver-account-createwithaccountkeyweightedmultisig) を参照してください。

**プロパティ**

| 名前               | タイプ | Description                |
| ---------------- | --- | -------------------------- |
| threshold        | 数値  | 検証閾値。                      |
| weitedPublicKeys | 行列  | [WeightedPublicKey][] の配列。 |

### AccountKeyRoleベース <a id="accountkeyrolebased"></a>

```javascript
const accountKeyRoleBased(accountKeyRoleBased) = new caver.account.accountKey.accountKeyRoleBased(accountKeyArray)
```

`AccountKeyRoleBased` は [AccountKeyRoleBased][] で Klaytn のアカウントの AccountKey を更新するために使用されます。 AccountKey を `AccountKeyRoleBased`に更新する 各ロールに割り当てられたAccountKeyを変更できます。これらはすべてKlaytnでトランザクションを検証するために使用されます。 詳細は [AccountUpdate](../getting-started.md#account-update) と [AccountKey][] を参照してください。

`AccountKeyRoleBased`を使用してアカウントインスタンスを作成するには、 [caver.account.create](#caver-account-create) または [caver.account.createWithAccountKeyRoleBased](#caver-account-createwithaccountkeyrolebased) を参照してください。

**プロパティ**

| 名前              | タイプ | Description                                                                                                                                                                                                                      |
| --------------- | --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accountKeyArray | 行列  | [ロール][] ごとに使用するaccountKey を定義する配列。 各ロールは [AccountKeyLegacy](#accountkeylegacy), [AccountKeyPublic](#accountkeypublic), [AccountKeyFail](#accountkeyfail), または [AccountKeyWeightedMultiSig](#accountkeyweightedmultisig) で定義できます。 |

### WeightedPublicKey <a id="weightedpublickey"></a>

```javascript
const weitedPublicKey = new caver.account.accountKey.weightedPublicKey(weight, publicKey)
```

`WeightedPublicKey` には公開鍵とその重みが含まれている。 `WeightedPublicKey` is a class that contains the public key and the weight of the key, and it is used in [AccountKeyWeightedMultiSig](#accountkeyweightedmultisig).

**プロパティ**

| 名前     | タイプ | Description                                                                               |
| ------ | --- | ----------------------------------------------------------------------------------------- |
| weight | 数値  | 公開鍵の重量。 ウェイトは、公開鍵の加重合計が [AccountKeyWeightedMultiSig][] オブジェクトの閾値よりも大きいかどうかを確認するために使用されます。 |
| 公開キー   | 文字列 | 公開鍵の文字列。                                                                                  |

### WeightedMultiSigOptions <a id="weightedmultisigoptions"></a>

```javascript
const weightedMultiSigOptions = new caver.account.weitedMultiSigOptions(threshold, weights)
```

`WeightedMultiSigOptions` にしきい値と重みが含まれている。 `WeightedMultiSigOptions` は AccountKeyWeightedMultiSigのオプションを定義するためのクラスです。

**プロパティ**

| 名前        | タイプ | Description |
| --------- | --- | ----------- |
| threshold | 数値  | 検証閾値。       |
| ウエイト数     | 行列  | キーの重みの配列。   |


## caver.account.create <a id="caver-account-create"></a>

```javascript
caver.account.create(address, accountKey [, options])
```

アドレスとaccountKey を使用してアカウントインスタンスを生成します。

accountKey が公開鍵文字列の場合、accountKey として [AccountKeyPublic](#accountkeypublic) を持つアカウントインスタンスが作成されます。 accountKey が公開鍵文字列を含む配列である場合、accountKey として [AccountKeyWeightedMultiSig](#accountkeyweightedmultisig) を含むアカウントインスタンスが作成されます。 オプションが最後のパラメータとして定義されていない場合 これはデフォルトのオプションを使用して作成され、しきい値は 1 で、各キーについて重みは 1 です。 accountKey が各ロールに使用されるアカウントキーを含む配列である場合、 [AccountKeyRole](#accountkeyrolebased) を含む Account インスタンスが作成されます。 [WeightedMultiSigOptions][] を持つ役割ごとにオプションを定義する必要があります。 オプションが定義されていない場合、複数の公開鍵を使用するロールにはデフォルトオプションが使用されます。 使用方法は以下の例をご参照ください。

**パラメータ**

| 名前         | タイプ                                      | Description                                       |
| ---------- | ---------------------------------------- | ------------------------------------------------- |
| address    | 文字列                                      | 更新されるアカウントのアドレス                                   |
| accountKey | 文字列 &#124; 配列                            | 公開鍵文字列、公開鍵の配列。 または、各要素がロールごとに使用されるキーの配列を含む2D配列です。 |
| オプション      | [WeightedMultiSigOptions][] &#124; Array | (オプション) AccountKeyWeigthedMultiSigのオプション。         |


**戻り値**

| タイプ       | Description        |
| --------- | ------------------ |
| [アカウント][] | アカウントインスタンスが返されます。 |

**例**

```javascript
// 公開鍵文字列でアカウントインスタンスを作成する -> AccountKeyPublic でアカウントを作成
> caver.account.create('0x{address in hex}', '0x034f1...')
Account {
    _address: '0xc771822ad361898a330df0169f2382ee92f6286d',
    _accountKey: AccountKeyPublic { _publicKey: '0x034f1...' } 
}

// 公開鍵の配列を持つアカウントインスタンスを作成する -> AccountKeyWeightedMultiSig
> caver. ccount.create('0x{address in hex}', ['0x034f1...', '0xfe4b8...'])
Account {
    _address: '0xc771822ad361898a330df0169f2382ee92f6286d',
    _accountKey:
    AccountKeyWeightedMultiSig {
        _threshold: 1,
        _weightedPublicKeys: [ 
            WeightedPublicKey { _weight: 1, _publicKey: '0x034f1...' },
            WeightedPublicKey { _weight: 1, _publicKey: '0xfe4b8...' }
        ]
    } 
}

// Create an Account instance with an array of public keys with WeightedMultiSigOptions -> Account with AccountKeyWeightedMultiSig
> const options = new caver.account.weightedMultiSigOptions(2, [1, 1])
> caver.account.create('0x{address in hex}', ['0x034f1...', '0xfe4b8...'], options)
Account {
    _address: '0xc771822ad361898a330df0169f2382ee92f6286d',
    _accountKey:
    AccountKeyWeightedMultiSig {
        _threshold: 2,
        _weightedPublicKeys: [ 
            WeightedPublicKey { _weight: 1, _publicKey: '0x034f1...' },
            WeightedPublicKey { _weight: 1, _publicKey: '0xfe4b8...' }
        ]
    } 
}

// Create an Account instance with an array in which keys to be used for each role are defined as an array -> Account with AccountKeyRoleBased
> const publicKeys = [
    ['0xd8510...', '0xaa105...'],
    ['0xd8510...'],
    ['0xd8510...', '0xceeee...']
]
> caver.account.create('0x{address in hex}', publicKeys)
Account {
    _address: '0xc771822ad361898a330df0169f2382ee92f6286d',
    _accountKey:
    AccountKeyRoleBased {
        _accountKeys: [
            AccountKeyWeightedMultiSig { 
                _threshold: 1, 
                _weightedPublicKeys: [ 
                    WeightedPublicKey { _weight: 1, _publicKey: '0xd8510...' }, 
                    WeightedPublicKey { _weight: 1, _publicKey: '0xaa105...' } 
                ]
            },
            AccountKeyPublic { _publicKey: '0xd8510...' },
            AccountKeyWeightedMultiSig {
                _threshold: 1,
                _weitedPublicKeys: [
                    WeightedPublicKey { _weight: 1, _publicKey: '0xd8510...' },
                    WeightedPublicKey { _weight: 1, _publicKey: '0xceee...' }
                ]
            }
        ]
    }
}

// Create an Account instance with an array in which keys to be used for each role are defined as an array with an array of WeightedMultiSigOptions -> Account with AccountKeyRoleBased
> const publicKeys = [
    ['0xd8510...', '0xaa105...'],
    ['0xd8510...'],
    ['0xd8510...', '0xceeee...']
]
> const options = [
    new caver.account.weightedMultiSigOptions(2, [1, 1]),
    new caver.account.weightedMultiSigOptions(),
    new caver.account.weightedMultiSigOptions(3, [1, 2])
]
> caver.account.create('0x{address in hex}', publicKeys, options)
Account {
    _address: '0xc771822ad361898a330df0169f2382ee92f6286d',
    _accountKey:
    AccountKeyRoleBased {
        _accountKeys: [
            AccountKeyWeightedMultiSig { 
                _threshold: 2, 
                _weightedPublicKeys: [ 
                    WeightedPublicKey { _weight: 1, _publicKey: '0xd8510...' }, 
                    WeightedPublicKey { _weight: 1, _publicKey: '0xaa105...' } 
                ]
            },
            AccountKeyPublic { _publicKey: '0xd8510...' },
            AccountKeyWeightedMultiSig {
                _threshold: 3,
                _weitedPublicKeys: [
                    WeightedPublicKey { _weight: 1, _publicKey: '0xd8510...' },
                    WeightedPublicKey { _weight: 2, _publicKey: '0xceee...' }
                ]
            }
        ]
    }
}
```

## caver.account.createFromRLPEncoding <a id="caver-account-createfromrlpencoding"></a>

```javascript
caver.account.createFromRLPEncoding(address, rlpEncodedKey)
```

RLPエンコードされたAccountKeyからAccountインスタンスを作成します。

**パラメータ**

| 名前            | タイプ | Description                   |
| ------------- | --- | ----------------------------- |
| address       | 文字列 | 更新されるアカウントのアドレス               |
| rlpEncodedKey | 文字列 | AccountKey の RLP エンコードされた文字列。 |


**戻り値**

| タイプ       | Description        |
| --------- | ------------------ |
| [アカウント][] | アカウントインスタンスが返されます。 |

**例**

```javascript
> caver.account.createFromRLPEncoding('0x{address in hex}', '0x04f84b02f848e301a102c10b598a1a3ba252acc21349d61c2fbd9bc8c15c50a5599f420cccc3291f9bf9e301a1021769a9196f523c419be50c26419ebbec34d3d6aa8b59da834212f13dbec9a9c1')
Account {
    _address: '0x9ea5b871e7bef65868a0d278be3fc6cdbee543ee',
    _accountKey: 
        AccountKeyWeightedMultiSig { 
            _threshold: 2, 
            _weightedPublicKeys: [ 
                WeightedPublicKey { _weight: 1, _publicKey: '0x02c10...' },
                WeightedPublicKey { _weight: 1, _publicKey: '0x02176...' }
            ]
        }
}
```

## caver.account.createWithAccountKeyLegacy <a id="caver-account-createwithaccountkeylegacy"></a>

```javascript
caver.account.createWithAccountKeyLegacy(address)
```

AccountKeyLegacyをaccountKeyとするAccountインスタンスを作成します。

**パラメータ**

| 名前      | タイプ | Description     |
| ------- | --- | --------------- |
| address | 文字列 | 更新されるアカウントのアドレス |


**戻り値**

| タイプ       | Description        |
| --------- | ------------------ |
| [アカウント][] | アカウントインスタンスが返されます。 |

**例**

```javascript
> caver.account.createWithAccountKeyLegacy('0x{address in hex}')
Account {
  _address: '0x9ea5b871e7bef65868a0d278be3fc6cdbee543ee',
  _accountKey: AccountKeyLegacy {}
}
```

## caver.account.createWithAccountKeyPublic <a id="caver-account-createwithaccountkeypublic"></a>

```javascript
caver.account.createWithAccountKeyPublic(address, publicKey)
```

AccountKeyPublic を accountKey とするアカウントインスタンスを作成します。

**パラメータ**

| 名前      | タイプ | Description     |
| ------- | --- | --------------- |
| address | 文字列 | 更新されるアカウントのアドレス |
| 公開キー    | 文字列 | 公開鍵の文字列。        |


**戻り値**

| タイプ       | Description        |
| --------- | ------------------ |
| [アカウント][] | アカウントインスタンスが返されます。 |

**例**

```javascript
> caver.account.createWithAccountKeyPublic('0x{address in hex}', '0xb5a9a...')
Account {
    _address: '0x9ea5b871e7bef65868a0d278be3fc6cdbee543ee',
    _accountKey: AccountKeyPublic { _publicKey: ,'0xb5a9a...' }
}
```

## caver.account.createWithAccountKeyFail <a id="caver-account-createwithaccountkeyfail"></a>

```javascript
caver.account.createWithAccountKeyFail(address)
```

AccountKeyFail をaccountKey として AccountKeyインスタンスを作成します。

**パラメータ**

| 名前      | タイプ | Description     |
| ------- | --- | --------------- |
| address | 文字列 | 更新されるアカウントのアドレス |


**戻り値**

| タイプ       | Description        |
| --------- | ------------------ |
| [アカウント][] | アカウントインスタンスが返されます。 |

**例**

```javascript
> caver.account.createWithAccountKeyFail('0x{address in hex}')
Account {
  _address: '0x9ea5b871e7bef65868a0d278be3fc6cdbee543ee',
  _accountKey: AccountKeyFail {}
}
```

## caver.account.createWithAccountKeyWeightedMultiSig <a id="caver-account-createwithaccountkeyweightedmultisig"></a>

```javascript
caver.account.createWithAccountKeyWeightedMultiSig(address, publicKeyArray [, options])
```

AccountKeyWeightedMultiSigをaccountKeyとするAccountインスタンスを作成します。

**パラメータ**

| 名前             | タイプ                         | Description                                                |
| -------------- | --------------------------- | ---------------------------------------------------------- |
| address        | 文字列                         | 更新されるアカウントのアドレス                                            |
| publicKeyArray | 行列                          | 複数の公開鍵文字列を含む配列。                                            |
| オプション          | [WeightedMultiSigOptions][] | (オプション) しきい値と重み配列を定義する [WeightedMultiSigOptions][] インスタンス。 |


**戻り値**

| タイプ       | Description        |
| --------- | ------------------ |
| [アカウント][] | アカウントインスタンスが返されます。 |

**例**

```javascript
// オプションのないアカウントインスタンスを作成する
> caver.account.createWithAccountKeyWeightedMultiSigg('0x{address in hex}', ['0xb5a9a...', '0xfe4b8...'])
Account {
    _address: '0xc771822ad361898a330df0169f2382ee92f6286d',
    _accountKey:
    AccountKeyWeightedMultiSig {
        _threshold: 1,
        _weightedPublicKeys: [ 
            WeightedPublicKey { _weight: 1, _publicKey: '0xb5a9a...' },
            WeightedPublicKey { _weight: 1, _publicKey: '0xfe4b8...' }
        ]
    } 
}

// create an Account instance with options
> const options = new caver.account.weightedMultiSigOptions(2, [1, 1])
> caver.account.createWithAccountKeyWeightedMultiSig('0x{address in hex}', ['0xb5a9a...', '0xfe4b8...'], options)
Account {
    _address: '0xc771822ad361898a330df0169f2382ee92f6286d',
    _accountKey:
    AccountKeyWeightedMultiSig {
        _threshold: 2,
        _weightedPublicKeys: [ 
            WeightedPublicKey { _weight: 1, _publicKey: '0xb5a9a...' },
            WeightedPublicKey { _weight: 1, _publicKey: '0xfe4b8...' }
        ]
    } 
}
```

## caver.account.createWithAccountKeyRoleBased <a id="caver-account-createwithaccountkeyrolebased"></a>

```javascript
caver.account.createWithAccountKeyRoleBased(address, roledBasedPublicKeyArray [, options])
```

AccountKeyRoleベースのAccountKeyを持つAccountインスタンスを作成します。

**パラメータ**

| 名前                       | タイプ | Description                                             |
| ------------------------ | --- | ------------------------------------------------------- |
| address                  | 文字列 | 更新されるアカウントのアドレス                                         |
| roledBasedPublicKeyArray | 行列  | ロールごとの公開鍵文字列の配列を含む二次元配列。                                |
| オプション                    | 行列  | (オプション) ロールごとの [WeightedMultiSigOptions][] インスタンスを含む配列。 |


**戻り値**

| タイプ       | Description        |
| --------- | ------------------ |
| [アカウント][] | アカウントインスタンスが返されます。 |

**例**

```javascript
// オプションのないアカウントインスタンスを作成する
> const publicKeys = [
    ['0x034f1...', '0xfe4b8...'],
    ['0xb5a9a...'],
    ['0x034f1...', '0xb5a9a...']
]
> caver.account.createWithAccountKeyRoleBased('0x{address in hex}', publicKeys)
Account {
    _address: '0xc771822ad361898a330df0169f2382ee92f6286d',
    _accountKey:
    AccountKeyRoleBased {
        _accountKeys: [
            AccountKeyWeightedMultiSig { 
                _threshold: 1, 
                _weightedPublicKeys: [ 
                    WeightedPublicKey { _weight: 1, _publicKey: '0x034f1...' }, 
                    WeightedPublicKey { _weight: 1, _publicKey: '0xfe4b8...' } 
                ]
            },
            AccountKeyPublic { _publicKey: '0xb5a9a...' },
            AccountKeyWeightedMultiSig {
                _threshold: 1,
                _weitedPublicKeys: [
                    WeightedPublicKey { _weight: 1, _publicKey: '0x034f1...' },
                    WeightedPublicKey { _weight: 1, _publicKey: '0xb5a9a...' }
                ]
            }
        ]
    }
}

// オプション
> const publicKeys = [
    ['0x034f1. .', '0xfe4b8...'],
    ['0xb5a9a...'],
    ['0x034f1...', '0xb5a9a...']
]
> const options = [
    new caver.account.weightedMultiSigOptions(2, [1, 1]),
    new caver.account.weightedMultiSigOptions(),
    new caver.account.weightedMultiSigOptions(3, [1, 2])
]
> caver.account.createWithAccountKeyRoleBased('0x{address in hex}', publicKeys, options)
Account {
    _address: '0xc771822ad361898a330df0169f2382ee92f6286d',
    _accountKey:
    AccountKeyRoleBased {
        _accountKeys: [
            AccountKeyWeightedMultiSig { 
                _threshold: 2, 
                _weightedPublicKeys: [ 
                    WeightedPublicKey { _weight: 1, _publicKey: '0x034f1...' }, 
                    WeightedPublicKey { _weight: 1, _publicKey: '0xfe4b8...' } 
                ]
            },
            AccountKeyPublic { _publicKey: '0xb5a9a...' },
            AccountKeyWeightedMultiSig {
                _threshold: 3,
                _weitedPublicKeys: [
                    WeightedPublicKey { _weight: 1, _publicKey: '0x034f1...' },
                    WeightedPublicKey { _weight: 2, _publicKey: '0xb5a9a...' }
                ]
            }
        ]
    }
}
```

## caver.account.accountKey.decode <a id="caver-account-accountkey-decode"></a>

```javascript
caver.account.accountKey.decode(rlpEncodedAccountKey)
```

Decodes an RLP-encoded string of AccountKey and returns an [AccountKeyLegacy](#accountkeylegacy), [AccountKeyPublic](#accountkeypublic), [AccountKeyFail](#accountkeyfail), [AccountKeyWeightedMultiSig](#accountkeyweightedmultisig) or [AccountKeyRoleBased](#accountkeyrolebased) instance.

**パラメータ**

| 名前                   | タイプ | Description                    |
| -------------------- | --- | ------------------------------ |
| rlpEncodedAccountKey | 文字列 | AccountKey の RLP でエンコードされた文字列。 |


**戻り値**

| タイプ                                                                                                                                                                                                                                             | Description              |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| [AccountKeyLegacy](#accountkeylegacy) &#124; [AccountKeyPublic](#accountkeypublic) &#124; [AccountKeyFail](#accountkeyfail) &#124; [AccountKeyWeightedMultiSig](#accountkeyweightedmultisig) &#124; [AccountKeyRoleBased](#accountkeyrolebased) | AccountKey インスタンスが返されます。 |

**例**

```javascript
> caver.account.accountKey.decode('0x02a102c10b598a1a3ba252acc21349d61c2fbd9bc8c15c50a5599f420cccc3291f9bf9')
KeyPublic { _publicKey: '0x02c10b598a1a3ba252acc21349d61c2fbd9bc8c15c50a5599f420cccc3291f9bf9' }
```

## account.getRLPEncodingAccountKey <a id="account-getrlpencodingaccountkey"></a>

```javascript
account.getRLPEncodingAccountKey()
```

AccountKey の RLP エンコードされた文字列を返します。


**戻り値**

| タイプ | Description                   |
| --- | ----------------------------- |
| 文字列 | AccountKey の RLP エンコードされた文字列。 |

**例**

```javascript
> const account = caver.account.create('0x{address in hex}', '0x034f1...')
> account.getRLPEncodingAccountKey()
'0x02a102d851040f46d61a042a787cca34ad12bc43e51f01ad0b22270cfc25c15c4b4e22'
```

[AccountKey]: ../../../../klaytn/design/accounts.md#account-key
[AccountKeyLegacy]: ../../../../klaytn/design/accounts.md#accountkeylegacy
[AccountKeyPublic]: ../../../../klaytn/design/accounts.md#accountkeypublic
[AccountKeyFail]: ../../../../klaytn/design/accounts.md#accountkeyfail
[AccountKeyWeightedMultiSig]: ../../../../klaytn/design/accounts.md#accountkeyweightedmultisig
[AccountKeyRoleBased]: ../../../../klaytn/design/accounts.md#accountkeyrolebased
[WeightedPublicKey]: #weightedpublickey
[WeightedMultiSigOptions]: #weightedmultisigoptions
[アカウント]: #account
[ロール]: ../../../../klaytn/design/accounts.md#roles
