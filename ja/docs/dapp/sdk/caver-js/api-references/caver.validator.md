# caver.validator

`caver.validator` パッケージは、Klaytn にアプリケーションを実装する際に使用するバリデーション関数を提供します。

**注意** `caver.validator` は caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3) でサポートされています。

## validateSignedMessage <a href="#validatesignedmessage" id="validatesignedmessage"></a>

```javascript
caver.validator.validateSignedMessage(message, signatures, address [, isHashed])
```

署名から復元された公開鍵とKlaytnアカウントのアカウント鍵を比較することで、署名されたメッセージを検証します。

**パラメータ**

| 名前         | タイプ       | Description                                                                                                                                                                                                            |
| ---------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| message    | 文字列       | 生のメッセージ文字列。 このメッセージが Klaytn 固有の接頭辞でハッシュされている場合、3番目のパラメータは `true` として渡されます。                                                                                                                                             |
| signatures | オブジェクト \ | Array | An object in the format of `{ v, r, s }`, an instance of `SignatureData`, or an array of `SignatureData`. '\[ v, r, s ]' または '\[\[ v, r, s ]]' 配列はパラメータとして渡すこともできます。 そしてこの場合、内部的に `SignatureData` 型に変換されます。 |
| address    | 文字列       | メッセージに署名したアカウントのアドレス。                                                                                                                                                                                                  |
| isHashed   | boolean   | (optional, default: `false`) Whether the message passed as a parameter is hashed with the prefix `"\x19Klaytn Signed Message:\n" + message.length + message`.                                                        |

**戻り値**

`Promise` が `boolean`を返す: promiseはメッセージ上の署名が有効かどうかのboolean値で解決されます。

**例**

```javascript
const address = '0xa84a1ce657e9d5b383cece6f4ba365e23fa234dd'
const message = 'Some Message'
const signature = [
    '0x1b',
    '0x8213e560e7bbe1f2e28fd69cbbb41c9108b84c98cd7c2c88d3c8e3549fd6ab10',
    '0x3ca40c9e20c1525348d734a6724db152b9244bff6e0ff0c2b811d61d8f874f00',
]
> caver.validator.validateSignedMessage(message, signature, address).then(console.log)


const address = '0xa84a1ce657e9d5b383cece6f4ba365e23fa234dd'
const hashedMessage = '0xa4b1069c1000981f4fdca0d62302dfff77c2d0bc17f283d961e2dc5961105b18'
const signature = [
    '0x1b',
    '0x8213e560e7bbe1f2e28fd69cbbb41c9108b84c98cd7c2c88d3c8e3549fd6ab10',
    '0x3ca40c9e20c1525348d734a6724db152b9244bff6e0ff0c2b811d61d8f874f00',
]
> caver.validator.validateSignedMessage(hashedMessage, signature, address, true).then(console.log)
```

## validateTransaction <a href="#validatetransaction" id="validatetransaction"></a>

```javascript
caver.validateTransaction(tx)
```

トランザクションを検証します。 この関数は、 `署名` から回収された公開鍵と、Klaytn アカウントのアカウント鍵からの公開鍵を比較します。 If the transaction is fee-delegated with the `feePayerSignatures` variable inside, this function compares the public keys recovered from `feePayerSignatures` with the public keys of the fee payer.

**パラメータ**

| 名前 | タイプ    | Description                                        |
| -- | ------ | -------------------------------------------------- |
| tx | object | 検証する [トランザクション](caver.transaction/#class) のインスタンス。 |

**戻り値**

`Promise` が `boolean`を返す: transacionが有効かどうかのboolean 値で解決されます。

**例**

```javascript
// Basic transaction will be validated with `signatures`
const tx = caver.transaction.valueTransfer.create({...})
> caver.validateTransaction(tx).then(console.log)

// 手数料委譲トランザクションは `signatures` と `feePayerSignatures` で検証されます。
const tx = caver.transaction.feeDelegatedValueTransfer.create({...})
> caver.validateTransaction(tx).then(console.log)
```

## validateSender <a href="#validatesender" id="validatesender"></a>

```javascript
caver.validator.validateSender(tx)
```

トランザクションの送信者を検証します。 この関数は、Klaytn アカウントのアカウント鍵の公開鍵と、 `署名` から回収された公開鍵と比較します。

**パラメータ**

| 名前 | タイプ    | Description                                        |
| -- | ------ | -------------------------------------------------- |
| tx | object | 検証する [トランザクション](caver.transaction/#class) のインスタンス。 |

**戻り値**

`Promise` が `boolean`を返す: promiseはトランザクションが有効かどうかのboolean値で解決されます。

**例**

```javascript
const tx = caver.transaction.valueTransfer.create({...})
> caver.validateSender(tx).then(console.log)
```

## validateFeePayer <a href="#validatefeepayer" id="validatefeepayer"></a>

```javascript
caver.validator.FeePayer(tx)
```

トランザクションの手数料支払い者を検証します。 この関数は、手数料支払者の口座鍵の公開鍵と `feePayerSignatures` から回収された公開鍵と比較します。

**パラメータ**

| 名前 | タイプ    | Description                                        |
| -- | ------ | -------------------------------------------------- |
| tx | object | 検証する [トランザクション](caver.transaction/#class) のインスタンス。 |

**戻り値**

`Promise` が `boolean`を返す: promiseはトランザクションが有効かどうかのboolean値で解決されます。

**例**

```javascript
const tx = caver.transaction.feeDelegatedValueTransfer.create({...})
> caver.validator.FeePayer(tx).then(console.log)
```
