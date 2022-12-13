# caver.kct.kip37 <a id="caver-kct-kip37"></a>

`caver.kct.kip37` は、KIP-37 を Klaytn ブロックチェーンプラットフォーム(Klaytn)の JavaScript オブジェクトとして実装するスマートコントラクトを簡単に処理できます。

`caver.kct.kip37` は KIP-37 トークンコントラクトを実装するために [caver.contract](../caver.contract.md) を継承します。 `caver.kct.kip37` は `caver.contract` と同じプロパティを持ちますが、追加のメソッドは追加の機能のために実装されています。 このセクションでは、 `caver.kct.kip37` の新しく追加されたメソッドのみを紹介します。

caver-js の KIP-37 を実装するコードは [Klaytn Contracts Github Repo](https://github.com/klaytn/klaytn-contracts/tree/master/contracts/KIP/token/KIP37) で利用できます。

KIP-37についての詳細は、 [Klaytn Improvation Proposals](https://kips.klaytn.foundation/KIPs/kip-37) を参照してください。

**注意** `caver.kct.kip37` は caver-js [v1.5.7](https://www.npmjs.com/package/caver-js/v/1.5.7) でサポートされています。

## caver.kct.kip37.deploy <a id="caver-klay-kip37-deploy"></a>

```javascript
caver.kct.kip37.deploy(tokenInfo, deployer)
```
KIP-37トークンコントラクトをKlaytnブロックチェーンにデプロイします。 caver.kct.kip37.deploy を使用してデプロイされるコントラクトは、KIP-37 標準に準拠するマルチトークンです。

デプロイが成功すると、Promiseは新しい KIP37インスタンスで解決されます。

**パラメータ**

| 名前        | タイプ               | Description                                                                                                                                                                                                                                                                                                                                   |
| --------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tokenInfo | object            | KIP-37トークンコントラクトをKlaytnブロックチェーンにデプロイするために必要な情報。 詳細は以下の表をご覧ください。                                                                                                                                                                                                                                                                               |
| デプロイ者     | 文字列 &#124; オブジェクト | KIP-37 トークン・コントラクトをデプロイするキーリング・インスタンスのアドレス。 このアドレスには十分な KLAYが必要です。 詳細は [キーリング](../caver.wallet/keyring.md#caver-wallet-keyring) を参照してください。 トランザクションの送信時に使用する独自のフィールドを定義したい場合は、オブジェクト型をパラメータとして渡すことができます。 また、KIP-37 契約をデプロイする際に手数料委任を使用する場合は、オブジェクト内の手数料委任に関連する項目を定義できます。 オブジェクト内で定義できるフィールドについては、 [create](#kip37-create) のパラメータの説明を参照してください。 |

tokenInfo オブジェクトには以下を含める必要があります:

| 名前  | タイプ | Description                                                                                      |
| --- | --- | ------------------------------------------------------------------------------------------------ |
| uri | 文字列 | [トークン型 ID 置換機構](http://kips.klaytn.foundation/KIPs/kip-37#metadata) を使用して、すべてのトークン型の URI を使用します。 |

**戻り値**

`PromiEvent`: 新しいKIP37インスタンスで解決されるPromise複合イベントエミッタ。 さらに、次のイベントが発生する可能性があります。

| 名前                | タイプ    | Description                                                                                                                                             |
| ----------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| transactionHash   | 文字列    | トランザクションが送信され、トランザクションハッシュが利用可能になった直後に発生します。                                                                                                            |
| レシート|領収書|領収書|受信する | object | 取引の領収書が有効なときに発行されます。 レシートオブジェクト内のプロパティについて知りたい場合は、 [getTransactionReceipt][] を参照してください。 KIP37 インスタンスからの領収書には、'logs' 属性の代わりに 'events' 属性が abi 経由で解析されます。 |
| エラー               | エラー    | 送信中にエラーが発生した場合に発生します。                                                                                                                                   |

**例**

```javascript
// using the promise
> caver.kct.kip37.deploy({
    uri: 'https://caver.example/{id}.json',
}, '0x{address in hex}').then(console.log)
KIP37 {
...
    _address: '0x7314B733723AA4a91879b15a6FEd8962F413CB2',
    _jsonInterface: [
...
        {
            anonymous: false,
            inputs: [{ indexed: false, name: 'value', type: 'string' }, { indexed: true, name: 'id', type: 'uint256' }],
            name: 'URI',
            type: 'event',
            signature: '0x6bb7ff708619ba0610cba295a58592e0451dee2622938c8755667688daf3529b',
        }
    ] 
}

// Send object as second parameter
> caver.kct.kip37.deploy({
    uri: 'https://caver.example/{id}.json',
    },
    {
        from: '0x{address in hex}',
        feeDelegation: true,
        feePayer: '0x{address in hex}',
    }).then(console.log)

// using event emitter and promise
> caver.kct.kip37.deploy({
    uri: 'https://caver.example/{id}.json',
}, '0x{address in hex}')
.on('error', function(error) { ... })
.on('transactionHash', function(transactionHash) { ... })
.on('receipt', function(receipt) {
    console.log(receipt.contractAddress) // contains the new token contract address
})
.then(function(newKIP37Instance) {
    console.log(newKIP37Instance.options.address) // instance with the new token contract address
})
```

## caver.kct.kip37.detectInterface <a id="caver-kct-kip37-detectinterface"></a>

```javascript
caver.kct.kip37. detectInterface(contractAddress)
```
トークンコントラクトによって実装されたインターフェイスの情報を返します。 この静的関数は [kip37.detectInterface](#kip37-detectinterface) を使用します。

**パラメータ**

| 名前         | タイプ | Description           |
| ---------- | --- | --------------------- |
| コントラクトアドレス | 文字列 | KIP-37トークンコントラクトのアドレス |

**戻り値**

`Promise` returns an `object` containing the result with boolean values whether each [KIP-37 interface](https://kips.klaytn.foundation/KIPs/kip-37#kip-13-identifiers) is implemented.

**例**

```javascript
> caver.kct.kip37.detectInterface('0x{address in hex}').then(console.log)
{
    IKIP37: true,
    IKIP37Metadata: true,
    IKIP37Mintable: true,
    IKIP37Burnable: true,
    IKIP37Pausable: true,
}
```

## caver.kct.kip37.create <a id="caver-kct-kip37-create"></a>

```javascript
caver.kct.kip37.create([tokenAddress])
```
バインドされたメソッドとイベントで新しい KIP37 インスタンスを作成します。 この関数は [new KIP37](#new-kip37) と同じように動作します。

**注意** `caver.kct.kip37.create` は caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) からサポートされています。

**パラメータ**

[新しい KIP37](#new-kip37) を参照してください。


**戻り値**

[新しい KIP37](#new-kip37) を参照してください。


**例**

```javascript
// Create a KIP37 instance without a parameter
> const kip37 = caver.kct.kip37.create()

// Create a KIP37 instance with a token address
> const kip37 = caver.kct.kip37.create('0x{address in hex}')
```


## 新しい KIP37 <a id="new-kip37"></a>

```javascript
new caver.kct.kip37([tokenAddress])
```
バインドされたメソッドとイベントで新しい KIP37 インスタンスを作成します。

**パラメータ**

| 名前           | タイプ | Description                                                            |
| ------------ | --- | ---------------------------------------------------------------------- |
| tokenAddress | 文字列 | (オプション) KIP-37 トークンコントラクトのアドレス。後で `kip37.options.address = '0x1234..'` |


**戻り値**

| タイプ    | Description                             |
| ------ | --------------------------------------- |
| object | KIP37インスタンスには、バインドされたメソッドとイベントが含まれています。 |


**例**

```javascript
// Create a KIP37 instance without a parameter
> const kip37 = new caver.kct.kip37()

// Create a KIP37 instance with a token address
> const kip37 = new caver.kct.kip37('0x{address in hex}')
```


## kip37.clone <a id="kip37-clone"></a>

```javascript
kip37.clone([tokenAddress])
```
現在の KIP37 インスタンスを複製します。

**パラメータ**

| 名前           | タイプ | Description                                                                       |
| ------------ | --- | --------------------------------------------------------------------------------- |
| tokenAddress | 文字列 | (オプション) 別の KIP37 トークンをデプロイしたスマートコントラクトのアドレス。 省略された場合は、元のインスタンスでコントラクトアドレスに設定されます。 |

**戻り値**

| タイプ    | Description         |
| ------ | ------------------- |
| object | 元のKIP37インスタンスのクローン。 |


**例**

```javascript
> const kip37 = new caver.kct.kip37(address)

// Clone without a parameter
> const cloned = kip37.clone()

// Clone with the address of the new token contract
> const cloned = kip37.clone('0x{address in hex}')
```

## kip37.detectInterface <a id="kip37-detectinterface"></a>

```javascript
kip37.detectInterface()
```
トークンコントラクトによって実装されたインターフェイスの情報を返します。

**パラメータ**

なし

**戻り値**

`Promise` returns an `object` containing the result with boolean values whether each [KIP-37 interface](https://kips.klaytn.foundation/KIPs/kip-37#kip-13-identifiers) is implemented.

**例**

```javascript
> kip37.detectInterface().then(console.log)
{
    IKIP37Metadata: true,
    IKIP37Metadata: true,
    IKIP37Mintable: true,
    IKIP37Burnable: true,
    IKIP37Pausable: true,
}
```

## kip37.supportsInterface <a id="kip37-supportsinterface"></a>

```javascript
kip37.supportsInterface(interfaceId)
```
このコントラクトが `interfaceId` で定義されたインターフェイスを実装している場合、 `true` を返します。

**パラメータ**

| 名前          | タイプ | Description       |
| ----------- | --- | ----------------- |
| interfaceId | 文字列 | チェックするインターフェイスID。 |

**戻り値**

`Promise` は `boolean`: `true` を返します。このコントラクトが `interfaceId` で定義されたインターフェイスを実装している場合。

**例**

```javascript
> kip37.supportsInterface('0x6433ca1f').then(console.log)
true

> kip37.supportsInterface('0x3a2820fe').then(console.log)
false
```


## kip37.uri <a id="kip37-uri"></a>

```javascript
kip37.uri(id)
```
与えられたトークンの Uniform Resource Identifier (URI) を返します。

文字列「{id}」が任意のURIに存在する場合、この関数は16進形式の実際のトークンIDに置き換えられます。 [KIP-34 メタデータ](http://kips.klaytn.foundation/KIPs/kip-37#metadata) を参照してください。

**パラメータ**

| 名前 | タイプ                                   | Description     |
| -- | ------------------------------------- | --------------- |
| id | BigNumber &#124; string &#124; number | uriを取得するトークンID。 |

**注意** `id` パラメータは `数値` 型を受け付けますが、与えられた値が数値で上限された範囲外の場合は、値を入力してください。 AX_SAFE_INTEGER、予期しない結果やエラーが発生する可能性があります。 この場合、 `BigNumber` 型、特に `uint256` サイズの数値入力値を使用することをお勧めします。

**戻り値**

`Promise` は `文字列`: トークンの uri を返します。

**例**

```javascript
> kip37.uri('0x0').then(console.log)
'https://caver.example/00000000000000000000000000000000000000000000000000000000.json'
```


## kip37.totalSupply <a id="kip37-totalsupply"></a>

```javascript
kip37.totalSupply(id)
```
特定のトークンの総供給量を返します。

**パラメータ**

| 名前 | タイプ                                   | Description          |
| -- | ------------------------------------- | -------------------- |
| id | BigNumber &#124; string &#124; number | 合計供給量を確認するためのトークンID。 |

**注意** `id` パラメータは `数値` 型を受け付けますが、与えられた値が数値で上限された範囲外の場合は、値を入力してください。 AX_SAFE_INTEGER、予期しない結果やエラーが発生する可能性があります。 この場合、 `BigNumber` 型、特に `uint256` サイズの数値入力値を使用することをお勧めします。

**戻り値**

`Promise` は `BigNumber`: トークンの総数を返します。

**例**

```javascript
> kip37.totalSupply(0).then(console.log)
10000000000
```


## kip37. balanceOf <a id="kip37-balanceof"></a>

```javascript
kip37.balanceOf(account, id)
```
トークンタイプ `id` の `アカウント` が所有するトークンの量を返します。

**パラメータ**

| 名前    | タイプ                                   | Description        |
| ----- | ------------------------------------- | ------------------ |
| アカウント | 文字列                                   | 残高を見たいアカウントのアドレス。  |
| id    | BigNumber &#124; string &#124; number | 残高を確認するトークン ID です。 |

**注意** `id` パラメータは `数値` 型を受け付けますが、与えられた値が数値で上限された範囲外の場合は、値を入力してください。 AX_SAFE_INTEGER、予期しない結果やエラーが発生する可能性があります。 この場合、 `BigNumber` 型、特に `uint256` サイズの数値入力値を使用することをお勧めします。

**戻り値**

`Promise` は `BigNumber`を返します。

**例**

```javascript
> kip37. balanceOf('0x{address in hex}', 0).then(console.log)
20
```


## kip37. balanceOfBatch <a id="kip37-balanceofbatch"></a>

```javascript
kip37. balanceOfBatch(accounts, ids)
```
複数のアカウント/トークンペアの残高を返します。 `balanceOfBatch` is a batch operation of [balanceOf](#kip37-balanceof), and the length of arrays with `accounts` and `ids` must be the same.

**パラメータ**

| 名前    | タイプ | Description          |
| ----- | --- | -------------------- |
| アカウント | 行列  | 残高を見たいアカウントのアドレス。    |
| id    | 行列  | 残高を確認するためのトークンIDの配列。 |

**戻り値**

`Promise` returns `Array`: 複数のアカウント/トークンペアの残高。

**例**

```javascript
> kip37. balanceOfBatch(['0x{address in hex}', '0x{address in hex}'], [0, 1]).then(console.log)
[ 20, 30 ]
```


## kip37.isMinter <a id="kip37-isminter"></a>

```javascript
kip37.isMinter(address)
```
与えられたアカウントが新しいKIP37トークンを発行できるミンターである場合、 `true` を返します。

**パラメータ**

| 名前      | タイプ | Description                    |
| ------- | --- | ------------------------------ |
| address | 文字列 | 鋳造の権利を有するためにチェックされるアカウントのアドレス。 |

**戻り値**

`Promise` は `boolean`: `true` アカウントがマイナーな場合に返します。

**例**

```javascript
> kip37.isMinter('0x{address in hex}').then(console.log)
true

> kip37.isMinter('0x{address in hex}').then(console.log)
false
```


## kip37.isPauser <a id="kip37-ispauser"></a>

```javascript
kip37.isPauser(address)
```
指定されたアカウントが転送トークンを一時停止できるPauserの場合、 `true` を返します。

**パラメータ**

| 名前      | タイプ | Description                            |
| ------- | --- | -------------------------------------- |
| address | 文字列 | 転送トークンを一時停止する権利があるかどうかを確認するアカウントのアドレス。 |

**戻り値**

`Promise` は `boolean`: `true` アカウントがPauserの場合に返します。

**例**

```javascript
> kip37.isPauser('0x{address in hex}').then(console.log)
true

> kip37.isPauser('0x{address in hex}').then(console.log)
false
```


## kip37.paused <a id="kip37-paused"></a>

```javascript
kip37.paused()
```
トークンコントラクトのトランザクション(または特定のトークン)が一時停止されているかどうかを返します。

id パラメータが定義されていない場合、トークンコントラクトのトランザクションが一時停止されているかどうかを返します。 id パラメータが定義されている場合、特定のトークンが一時停止されるかどうかを返します。

**パラメータ**

| 名前 | タイプ                                   | Description                                                                         |
| -- | ------------------------------------- | ----------------------------------------------------------------------------------- |
| id | BigNumber &#124; string &#124; number | (オプション) 一時停止したかどうかを確認するトークンID。 このパラメータが省略された場合、 `paused` 関数はコントラクトが一時停止状態かどうかを返します。 |

**注意** `id` パラメータは `数値` 型を受け付けますが、与えられた値が数値で上限された範囲外の場合は、値を入力してください。 AX_SAFE_INTEGER、予期しない結果やエラーが発生する可能性があります。 この場合、 `BigNumber` 型、特に `uint256` サイズの数値入力値を使用することをお勧めします。

**戻り値**

`Promise` は `boolean`: `true` コントラクト(または特定のトークン)が一時停止された場合に返されます。

**例**

```javascript
// without token id parameter
> kip37.paused().then(console.log)
true
> kip37.paused().then(console.log)
false

// with token id parameter
> kip37.paused(0).then(console.log)
true
> kip37.paused(1).then(console.log)
false
```


## kip37.isApprovedForAll <a id="kip37-isApprovedforall"></a>

```javascript
kip37.isApprovedForAll(owner, operator)
```
指定した所有者のオペレーターの承認ステータスを問い合わせます。 指定した所有者によってオペレータが承認された場合、 `true` を返します。

**パラメータ**

| 名前  | タイプ | Description |
| --- | --- | ----------- |
| 所有者 | 文字列 | 所有者の住所      |
| 演算子 | 文字列 | 演算子のアドレス    |

**戻り値**

`Promise` は `boolean`: 演算子が承認された場合は True でなければ、 false

**例**

```javascript
> kip37.isApprovedForAll('0x{address in hex}', '0x{address in hex}').then(console.log)
true

> kip37.isApprovedForAll('0x{address in hex}', '0x{address in hex}').then(console.log)
false
```


## kip37.create <a id="kip37-create"></a>

```javascript
kip37.create(id, initialSupply [, uri] [, sendParam])
```

新しいトークン型を作成し、 `initialSupply` をミンターに割り当てます。

この方法はトランザクションをKlaytnネットワークに送信し、トランザクションの送信者にトランザクション手数料を請求することに注意してください。

**パラメータ**

| 名前            | タイプ                                   | Description                               |
| ------------- | ------------------------------------- | ----------------------------------------- |
| id            | BigNumber &#124; string &#124; number | 作成するトークンID。                               |
| initialSupply | BigNumber &#124; string &#124; number | 発行されているトークンの量                             |
| uri           | 文字列                                   | (オプション) 作成されたトークンのトークンURI。                |
| sendParam     | object                                | (オプション) トランザクションを送信するために必要なオブジェクト保持パラメータ。 |

**NOTE** The `id`, `initialSupply` parameters accept `number` type but if the fed value were out of the range capped by number.MAX_SAFE_INTEGER, it might cause an unexpected result or error. この場合、 `BigNumber` 型、特に `uint256` サイズの数値入力値を使用することをお勧めします。

`sendParam` オブジェクトには以下のものが含まれています:

| 名前            | タイプ                                             | Description                                                                                                                                                                                    |
| ------------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from          | 文字列                                             | (オプション) トランザクションを送信するアドレス。 省略した場合は、 `kip37.options.from` によって設定されます。 `sendParam` オブジェクトの `から` のいずれも `kip37.options.from` が指定されていない場合、エラーが発生します。                                                |
| ガス            | 番号 &#124; 文字列                                   | (オプション) この取引に提供されるガスの最大数(ガス制限)。 省略した場合、 `kip37.methods.approve(spender, amount).estimateGas({from})` を呼び出すことでcaver-jsによって設定されます。                                                               |
| gasPrice      | 番号 &#124; 文字列                                   | (オプション) この取引に対するペブ内のガス価格。 省略された場合、 `caver.klay.getGasPrice` を呼び出すことで caver-js によって設定されます。                                                                                                      |
| 値             | number &#124; string &#124; BN &#124; BigNumber | (オプション) peb で転送される値。                                                                                                                                                                           |
| feeDelegation | boolean                                         | (オプション、デフォルト `false`) 手数料委託トランザクションを使用するかどうか。 省略した場合は、 `kip37.options.feeDelegation` が使用されます。 両方が省略された場合、手数料の委任は使用されません。                                                                       |
| feePayer      | 文字列                                             | (オプション) 取引手数料を支払う手数料支払者の住所。 `feeDelegation` が `true`の場合、この値はトランザクションの `feePayer` フィールドに設定されます。 省略した場合は、 `kip37.options.feePayer` が使用されます。 両方が省略された場合、エラーがスローされます。                              |
| 手数料比          | 文字列                                             | (オプション) 手数料支払者が負担する取引手数料の割合。 `feeDelegation` が `true` で、 `feeRatio` が有効な値に設定されている場合、部分的な手数料委任トランザクションが使用されます。 有効範囲は1~99です。 0、または100以上の比率は許可されていません。 省略した場合は、 `kip37.options.feeRatio` が使用されます。 |

**注意** `feeDelegation`, `feePayer` と `feeRatio` は caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) からサポートされています。

**戻り値**

`Promise` は `オブジェクトを返します。` - トランザクション実行の結果を含む領収書。 レシートオブジェクト内のプロパティについて知りたい場合は、 [getTransactionReceipt][] の説明を参照してください。 KIP37 インスタンスからの領収書は、「logs」属性の代わりに、ABI を介して解析された「events」属性を持っています。

**例**

```javascript
// Send via a sendParam object with the from field given 
> kip37.create(2, '1000000000000000000', { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xf1cefd8efbde83595742dc88308143dde50e7bee39a3a0cfea92ed5df3529d61',
    blocknumber: 2823,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
...
    events: {
        TransferSingle: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 2823,
            transactionHash: '0xee8cdaa0089681d90a52c1539e75c6e26b3eb67affd4fbf70033ba010a3f0d26',
            transactionIndex: 0,
            blockHash: '0xf1cefd8efbde83595742dc88308143dde50e7bee39a3a0cfea92ed5df3529d61',
            logIndex: 0,
            id: 'log_ca64e74b',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '1': '0x0000000000000000000000000000000000000000',
                '2': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '3': '2',
                '4': '1000000000000000000',
                operator: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                from: '0x0000000000000000000000000000000000000000',
                to: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                id: '2',
                value: '1000000000000000000',
            },
            event: 'TransferSingle',
            signature: '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
            raw: {
                data: '0x...40000',
                topics: [ '0xc3d58...', '0x00...f48', '0x00...000', '0x00...f48' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.create(2, '1000000000000000000', {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.create(2, '10000000000000000').then(console.log)
```

## kip37.setApprovalForAll <a id="kip37-setApprovalforall"></a>

```javascript
kip37.setApprovalForAll(operator, approved [, sendParam])
```
指定された演算子を承認するか、または指定された演算子が所有者のすべてのトークンを転送することを許可します。

この方法はトランザクションをKlaytnネットワークに送信し、トランザクションの送信者にトランザクション手数料を請求することに注意してください。

**パラメータ**

| 名前        | タイプ     | Description                                                                                                       |
| --------- | ------- | ----------------------------------------------------------------------------------------------------------------- |
| 演算子       | 文字列     | 所有者のすべてのトークンを承認/移転することを禁止するアカウントのアドレス。                                                                            |
| 承認済み      | boolean | `true` の場合、この演算子は承認されます。 `false` の場合、演算子は無効になります。                                                                 |
| sendParam | object  | (オプション) トランザクションを送信するための定義されたパラメータを持つオブジェクト。 sendParamについての詳細は、 [kip37.create](#kip37-create) のパラメータの説明を参照してください。 |

**戻り値**

`Promise` は `オブジェクトを返します。` - トランザクション実行の結果を含む領収書。 レシートオブジェクト内のプロパティについて知りたい場合は、 [getTransactionReceipt][] の説明を参照してください。 KIP37 インスタンスからの領収書は、「logs」属性の代わりに、ABI を介して解析された「events」属性を持っています。

**例**

```javascript
// Send via a sendParam object with the from field given 
> kip37.setApprovalForAll('0x{address in hex}', true, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x0ee7be40f8b9f4d93d68235acef9fba08fde392a93a1a1743243cb9686943a47',
    blockNumber: 3289,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
...
    events: {
        ApprovalForAll: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 3289,
            transactionHash: '0x5e94aa4af5f7604f1b32129fa8463c43cae4ff118f80645bfabcc6181667b8ab',
            transactionIndex: 0,
            blockHash: '0x0ee7be40f8b9f4d93d68235acef9fba08fde392a93a1a1743243cb9686943a47',
            logIndex: 0,
            id: 'log_b1f9938f',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '1': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                '2': true,
                account: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                operator: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                approved: true,
            },
            event: 'ApprovalForAll',
            signature: '0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31',
            raw: {
                data: '0x00...001',
                topics: [ '0x17307...', '0x00...f48', '0x00...1a6' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.setApprovalForAll('0x{address in hex}', true, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.setApprovalForAll('0x{address in hex}', true).then(console.log)
```

## kip37.safeTransferFrom <a id="kip37-safetransferfrom"></a>

```javascript
kip37.safeTransferFrom(from, recipient, id, amount, data [, sendParam])
```
Safely transfers the given `amount` tokens of specific token type `id` from `from` to the `recipient`.

オーナーのトークン(オペレーター)またはトークン所有者のHim/彼女自身を送信する権限を与えられたアドレスは、このトークン転送トランザクションを実行することが期待されます。 Thus, an authorized address or the token owner should be the sender of this transaction whose address must be given at `sendParam.from` or `kip37.options.from`. `sendParam.from` と `kip37.options.from` の両方が指定されない限り、エラーが発生します。

受信者がコントラクトアドレスであった場合、 [IKIP37Receiver.onKIP37Received](https://kips.klaytn.foundation/KIPs/kip-37#kip-37-token-receiver) を実装する必要があります。 そうでなければ、転送は元に戻されます。

この方法はトランザクションをKlaytnネットワークに送信し、トランザクションの送信者にトランザクション手数料を請求することに注意してください。

**パラメータ**

| 名前        | タイプ                                   | Description                                                                                                       |
| --------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| from      | 文字列                                   | 手当メカニズムで送信されるトークンを所有するアカウントのアドレス。                                                                                 |
| 受信者       | 文字列                                   | トークンを受け取るアカウントのアドレス                                                                                               |
| id        | BigNumber &#124; string &#124; number | 転送するトークンID。                                                                                                       |
| 金額        | BigNumber &#124; string &#124; number | 転送するトークンの量                                                                                                        |
| data      | バッファ &#124; 文字列 &#124; 番号             | (オプション) 通話とともに送信する任意のデータ。                                                                                         |
| sendParam | object                                | (オプション) トランザクションを送信するための定義されたパラメータを持つオブジェクト。 sendParamについての詳細は、 [kip37.create](#kip37-create) のパラメータの説明を参照してください。 |

**注意** `id` と `amount` パラメータは `番号` の型を受け付けますが、与えられた値が数値で上限された範囲外の場合。 AX_SAFE_INTEGER、予期しない結果やエラーが発生する可能性があります。 この場合、 `BigNumber` 型、特に `uint256` サイズの数値入力値を使用することをお勧めします。

**戻り値**

`Promise` は `オブジェクトを返します。` - トランザクション実行の結果を含む領収書。 レシートオブジェクト内のプロパティについて知りたい場合は、 [getTransactionReceipt][] の説明を参照してください。 KIP37 インスタンスからの領収書は、「logs」属性の代わりに、ABI を介して解析された「events」属性を持っています。

**例**

```javascript
// Send via a sendParam object with the from field given (without data)
> kip37.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 2, 10000, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x7dbe4c5bd916ad1aafef87fe6c8b32083080df4ec07f26b6c7a487bb3cc1cf64',
    blocknumber: 3983,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
...
    events: {
        TransferSingle: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 3983,
            transactionHash: '0x0efc60b88fc55ef37eafbd18057404334dfd595ce4c2c0ff75f0922b928735e7',
            transactionIndex: 0,
            blockHash: '0x7dbe4c5bd916ad1aafef87fe6c8b32083080df4ec07f26b6c7a487bb3cc1cf64',
            logIndex: 0,
            id: 'log_cddf554f',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '1': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '2': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                '3': '2',
                '4': '1000',
                operator: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                from: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                to: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                id: '2',
                value: '1000',
            },
            event: 'TransferSingle',
            signature: '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
            raw: {
                data: '0x00...3e8',
                topics: [ '0xc3d58...', '0x00...f48', '0x00...f48', '0x00...1a6' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 2, 10000, true, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Send via a sendParam object with the from field given (with data)
> kip37.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 2, 10000, 'data' { from: '0x{address in hex}' }).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 2, 10000).then(console.log)
```

## kip37.safeBatchTransferFrom <a id="kip37-safebatchtransferfrom"></a>

```javascript
kip37.safeBatchTransferFrom(from, recipient, ids, amount, data [, sendParam])
```

安全に複数のトークンIDと値を `` から `受信者`に送信します。

オーナーのトークン(オペレーター)またはトークン所有者のHim/彼女自身を送信するために承認されたアドレスは、このトークン転送トランザクションを実行することが期待されます。 Thus, an approved address or the token owner should be the sender of this transaction whose address must be given at `sendParam.from` or `kip37.options.from`. `sendParam.from` と `kip37.options.from` の両方が指定されない限り、エラーが発生します。

受信者がコントラクトアドレスであった場合、 [IKIP37Receiver.onKIP37Received](https://kips.klaytn.foundation/KIPs/kip-37#kip-37-token-receiver) を実装する必要があります。 そうでなければ、転送は元に戻されます。

この方法はトランザクションをKlaytnネットワークに送信し、トランザクションの送信者にトランザクション手数料を請求することに注意してください。

**パラメータ**

| 名前        | タイプ                       | Description                                                                                                       |
| --------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| from      | 文字列                       | 手当メカニズムで送信されるトークンを所有するアカウントのアドレス。                                                                                 |
| 受信者       | 文字列                       | トークンを受け取るアカウントのアドレス                                                                                               |
| id        | 行列                        | 転送するトークンIDの配列。                                                                                                    |
| 金額        | 行列                        | 転送するトークン金額の配列です。                                                                                                  |
| data      | バッファ &#124; 文字列 &#124; 番号 | (オプション) 通話とともに送信するデータ。                                                                                            |
| sendParam | object                    | (オプション) トランザクションを送信するための定義されたパラメータを持つオブジェクト。 sendParamについての詳細は、 [kip37.create](#kip37-create) のパラメータの説明を参照してください。 |

**注意** `ids` と `amount` array parameters accept `number` type as an element in array しかし、供給された値が範囲外だった場合、数字によって制限されます。 AX_SAFE_INTEGER、予期しない結果やエラーが発生する可能性があります。 この場合、 `BigNumber` 型、特に `uint256` サイズの数値入力値を使用することをお勧めします。

**戻り値**

`Promise` は `オブジェクトを返します。` - トランザクション実行の結果を含む領収書。 レシートオブジェクト内のプロパティについて知りたい場合は、 [getTransactionReceipt][] の説明を参照してください。 KIP37 インスタンスからの領収書は、「logs」属性の代わりに、ABI を介して解析された「events」属性を持っています。

**例**

```javascript
// Send via a sendParam object with the from field given (without data)
> kip37.safeBatchTransferFrom('0x{address in hex}', '0x{address in hex}', [1, 2], [10, 1000], { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x9e469494463a02ec4f9e2530e014089d6be3146a5485161a530a8e6373d472a6',
    blocknumber: 4621,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
...
    events: {
        TransferBatch: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 4621,
            transactionHash: '0x557213eef8ae096bc35f5b3bee0e7cf87ecd87129b4a16d4e35a7356c341dad8',
            transactionIndex: 0,
            blockHash: '0x9e469494463a02ec4f9e2530e014089d6be3146a5485161a530a8e6373d472a6',
            logIndex: 0,
            id: 'log_b050bacc',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '1': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '2': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                '3': ['1', '2'],
                '4': ['10', '1000'],
                operator: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                from: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                to: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                ids: ['1', '2'],
                values: ['10', '1000'],
            },
            event: 'TransferBatch',
            signature: '0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb',
            raw: {
                data: '0x00...3e8',
                topics: [ '0x4a39d...', '0x00...f48', '0x00...f48', '0x00...1a6' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.safeBatchTransferFrom('0x{address in hex}', '0x{address in hex}', [1, 2], [10, 1000], {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Send via a sendParam object with the from field given (with data)
> kip37.safeBatchTransferFrom('0x{address in hex}', '0x{address in hex}', [1, 2], [10, 1000], 'data', { from: '0x{address in hex}' }).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.safeBatchTransferFrom('0x{address in hex}', '0x{address in hex}', [1, 2], [10, 1000]).then(console.log)
```

## kip37.mint <a id="kip37-mint"></a>

```javascript
kip37.mint(to, id, value [, sendParam])
```
特定のトークンタイプ `id` のトークンを生成し、変数 `に` と `値` に従ってトークンを割り当てます。 mint 関数では、 `に` と `値` をパラメータとして配列を渡すことで、特定のトークンを複数のアカウントに一度にミントできます。

この方法はトランザクションをKlaytnネットワークに送信し、トランザクションの送信者にトランザクション手数料を請求することに注意してください。

**パラメータ**

| 名前        | タイプ                                                | Description                                                                                                       |
| --------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| to        | 文字列 &#124; 配列                                      | アカウントのアドレスまたは鋳造トークンが発行されるアドレスの配列。                                                                                 |
| id        | BigNumber &#124; string &#124; number              | ミントするトークン ID です。                                                                                                  |
| 値         | BigNumber &#124; string &#124; number &#124; Array | 発行するトークンの量。 複数のアドレスを含む配列が `から` パラメータに渡された場合、値は配列の形式で渡されなければなりません。                                                 |
| sendParam | object                                             | (オプション) トランザクションを送信するための定義されたパラメータを持つオブジェクト。 sendParamについての詳細は、 [kip37.create](#kip37-create) のパラメータの説明を参照してください。 |

**注意** `id` と `値` パラメータは、 `番号` の型を受け付けますが、与えられた値が範囲外である場合は、数値で上限されます。 AX_SAFE_INTEGER、予期しない結果やエラーが発生する可能性があります。 この場合、 `BigNumber` 型、特に `uint256` サイズの数値入力値を使用することをお勧めします。

**注意** `sendParam.from` または `kip37.options.from` が与えられた場合は、MinterRole を使ったminter でなければなりません。

**戻り値**

`Promise` は `オブジェクトを返します。` - トランザクション実行の結果を含む領収書。 レシートオブジェクト内のプロパティについて知りたい場合は、 [getTransactionReceipt][] の説明を参照してください。 KIP37 インスタンスからの領収書は、「logs」属性の代わりに、ABI を介して解析された「events」属性を持っています。

**例**

```javascript
// Send via a sendParam object with the from field given (Mint the specific tokens to a account)
> kip37.mint('0x{address in hex}', 2, 1000, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xca4489a003dc781645475b7db11106da61b7438d86910920f953d8b2dab4a701',
    blocknumber: 12868,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
...
    events: {
        TransferSingle: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 12868,
            transactionHash: '0xed25e305904e6efb613a6fe8b7370488554f6508b6701e9a0167c95d341c73dc',
            transactionIndex: 0,
            blockHash: '0xca4489a003dc781645475b7db11106da61b7438d86910920f953d8b2dab4a701',
            logIndex: 0,
            id: 'log_04dffde1',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '1': '0x0000000000000000000000000000000000000000',
                '2': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                '3': '2',
                '4': '1000',
                operator: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                from: '0x0000000000000000000000000000000000000000',
                to: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                id: '2',
                value: '1000',
            },
            event: 'TransferSingle',
            signature: '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
            raw: {
                data: '0x00...3e8',
                topics: [ '0xc3d58...', '0x00...f48', '0x00...000', '0x00...1a6' ],
            },
        },
    },
}

// Send via a sendParam object with the from field given (Mint the specific tokens to the multiple accounts)
> kip37.mint(['0x{address in hex}', '0x{address in hex}'], 2, [1, 2], { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x2bf06d039e2e08c611117167df6261d1feebb12afb34fcabdda59fef2298c70f',
    blocknumber: 13378,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
...
    events: {
        TransferSingle: [
            {
                address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
                blockNumber: 13378,
                transactionHash: '0x9b367625572145d27f78c00cd18cf294883f7baced9d495e1004275ba35e0ea9',
                transactionIndex: 0,
                blockHash: '0x2bf06d039e2e08c611117167df6261d1feebb12afb34fcabdda59fef2298c70f',
                logIndex: 0,
                id: 'log_6975145c',
                returnValues: {
                    '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                    '1': '0x0000000000000000000000000000000000000000',
                    '2': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                    '3': '2',
                    '4': '1',
                    operator: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                    from: '0x0000000000000000000000000000000000000000',
                    to: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                    id: '2',
                    value: '1',
                },
                event: 'TransferSingle',
                signature: '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
                raw: {
                    data: '0x00...001',
                    topics: [ '0xc3d58...', '0x00...f48', '0x00...000', '0x00...1a6' ],
                },
            },
            {
                address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
                blockNumber: 13378,
                transactionHash: '0x9b367625572145d27f78c00cd18cf294883f7baced9d495e1004275ba35e0ea9',
                transactionIndex: 0,
                blockHash: '0x2bf06d039e2e08c611117167df6261d1feebb12afb34fcabdda59fef2298c70f',
                logIndex: 1,
                id: 'log_7fcd4837',
                returnValues: {
                    '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                    '1': '0x0000000000000000000000000000000000000000',
                    '2': '0xEc38E4B42c79299bFef43c3e5918Cdef482703c4',
                    '3': '2',
                    '4': '2',
                    operator: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                    from: '0x0000000000000000000000000000000000000000',
                    to: '0xEc38E4B42c79299bFef43c3e5918Cdef482703c4',
                    id: '2',
                    value: '2',
                },
                event: 'TransferSingle',
                signature: '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
                raw: {
                    data: '0x000...002',
                    topics: [ '0xc3d58...', '0x00...f48', '0x00...000', '0x00...3c4' ],
                },
            },
        ],
    },
}

// Using FD transaction to execute the smart contract
> kip37.mint('0x{address in hex}', 2, 1000, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.mint('0x{address in hex}', 2, 1000).then(console.log)
```

## kip37.mintBatch <a id="kip37-mintbatch"></a>

```javascript
kip37.mintBatch(to, id, values [, sendParam])
```
特定のトークンタイプ `id` の複数の KIP-37 トークンをバッチで生成し、変数 `に` と `の値` に従ってトークンを割り当てます。

この方法はトランザクションをKlaytnネットワークに送信し、トランザクションの送信者にトランザクション手数料を請求することに注意してください。

**パラメータ**

| 名前        | タイプ    | Description                                                                                                       |
| --------- | ------ | ----------------------------------------------------------------------------------------------------------------- |
| to        | 文字列    | 鋳造済みトークンが発行されるアカウントのアドレス。                                                                                         |
| id        | 行列     | ミントするトークンIDの配列。                                                                                                   |
| 値         | 行列     | トークンの配列はミントになります。                                                                                                 |
| sendParam | object | (オプション) トランザクションを送信するための定義されたパラメータを持つオブジェクト。 sendParamについての詳細は、 [kip37.create](#kip37-create) のパラメータの説明を参照してください。 |

**NOTE** The `ids` and `values` array parameters accept `number` type as an element in array, but if the fed value were out of the range capped by number.MAX_SAFE_INTEGER, it might cause an unexpected result or error. この場合、 `BigNumber` 型、特に `uint256` サイズの数値入力値を使用することをお勧めします。

**注意** `sendParam.from` または `kip37.options.from` が与えられた場合は、MinterRole を使ったminter でなければなりません。

**戻り値**

`Promise` は `オブジェクトを返します。` - トランザクション実行の結果を含む領収書。 レシートオブジェクト内のプロパティについて知りたい場合は、 [getTransactionReceipt][] の説明を参照してください。 KIP37 インスタンスからの領収書は、「logs」属性の代わりに、ABI を介して解析された「events」属性を持っています。

**例**

```javascript
// Send via a sendParam object with the from field given
> kip37.mintBatch('0x{address in hex}', [1, 2], [100, 200], { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xfcfaf73e6b275c173fb699344ddcd6fb39e8f65dbe8dbcfa4123e949c7c6d959',
    blocknumber: 13981,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
...
    events: {
        TransferBatch: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 13981,
            transactionHash: '0x3e2ddc38210eb3257379a6a59c2e6e341937a4c9e7ef848f1cd0462dfd0b3af6',
            transactionIndex: 0,
            blockHash: '0xfcfaf73e6b275c173fb699344ddcd6fb39e8f65dbe8dbcfa4123e949c7c6d959',
            logIndex: 0,
            id: 'log_d07901ef',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '1': '0x0000000000000000000000000000000000000000',
                '2': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                '3': ['1', '2'],
                '4': ['100', '200'],
                operator: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                from: '0x0000000000000000000000000000000000000000',
                to: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                ids: ['1', '2'],
                values: ['100', '200'],
            },
            event: 'TransferBatch',
            signature: '0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb',
            raw: {
                data: '0x00...0c8',
                topics: [ '0x4a39d...', '0x00...f48', '0x00...000', '0x00...1a6' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.mintBatch('0x{address in hex}', [1, 2], [100, 200], {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.mintBatch('0x{address in hex}', [1, 2], [100, 200]).then(console.log)
```


## kip37.addMinter <a id="kip37-addminter"></a>

```javascript
kip37.addMinter(account [, sendParam])
```
トークンを鋳造することが許可されているマイナーとしてアカウントを追加します。

この方法はトランザクションをKlaytnネットワークに送信し、トランザクションの送信者にトランザクション手数料を請求することに注意してください。

**パラメータ**

| 名前        | タイプ    | Description                                                                                                       |
| --------- | ------ | ----------------------------------------------------------------------------------------------------------------- |
| アカウント     | 文字列    | マイナーとして追加されるアカウントのアドレス。                                                                                           |
| sendParam | object | (オプション) トランザクションを送信するための定義されたパラメータを持つオブジェクト。 sendParamについての詳細は、 [kip37.create](#kip37-create) のパラメータの説明を参照してください。 |

**注意** `sendParam.from` または `kip37.options.from` が指定された場合は、minter でなければなりません。

**戻り値**

`Promise` は `オブジェクトを返します。` - トランザクション実行の結果を含む領収書。 レシートオブジェクト内のプロパティについて知りたい場合は、 [getTransactionReceipt][] の説明を参照してください。 KIP37 インスタンスからの領収書は、「logs」属性の代わりに、ABI を介して解析された「events」属性を持っています。

**例**

```javascript
// Send via a sendParam object with the from field given 
> kip37.addMinter('0x{address in hex}', { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x32db6b56d959a388120507a943930351ba681b3c34d1a3c609e6bc03eabdbbe3',
    blocknumber: 14172,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
...
    events: {
        MinterAdded:{
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 14172,
            transactionHash: '0xa2c492abde161356d03a23d9ba48e5fd6e69a2e1603dc0286c7c65aac65d0356',
            transactionIndex: 0,
            blockHash: '0x32db6b56d959a388120507a943930351ba681b3c34d1a3c609e6bc03eabdbbe3',
            logIndex: 0,
            id: 'log_712e7c09',
            returnValues: {
                '0': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                account: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
            },
            event: 'MinterAdded',
            signature: '0x6ae172837ea30b801fbfcdd4108aa1d5bf8ff775444fd70256b44e6bf3dfc3f6',
            raw: {
                data: '0x',
                topics: [ '0x6ae17...', '0x00...1a6' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.addMinter('0x{address in hex}', {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.addMinter('0x{address in hex}').then(console.log)
```


## kip37.renounceMinter <a id="kip37-renounceminter"></a>

```javascript
kip37.renounceMinter([sendParam])
```
トークンを鋳造する権利を放棄します。 ミンターアドレスのみがミント権限を放棄できます。

この方法はトランザクションをKlaytnネットワークに送信し、トランザクションの送信者にトランザクション手数料を請求することに注意してください。

**パラメータ**

| 名前        | タイプ    | Description                                                                                                       |
| --------- | ------ | ----------------------------------------------------------------------------------------------------------------- |
| sendParam | object | (オプション) トランザクションを送信するための定義されたパラメータを持つオブジェクト。 sendParamについての詳細は、 [kip37.create](#kip37-create) のパラメータの説明を参照してください。 |

**注意** `sendParam.from` または `kip37.options.from` が与えられた場合は、MinterRole を使ったminter でなければなりません。

**戻り値**

`Promise` は `オブジェクトを返します。` - トランザクション実行の結果を含む領収書。 レシートオブジェクト内のプロパティについて知りたい場合は、 [getTransactionReceipt][] の説明を参照してください。 KIP37 インスタンスからの領収書は、「logs」属性の代わりに、ABI を介して解析された「events」属性を持っています。

**例**

```javascript
// Send via a sendParam object with the from field given 
> kip37.renounceMinter({ from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x2122846ede9dac35a6797faf0e8eabd7fd8edf7054df27c97410ae788b6cc329',
    blocknumber: 14174,
    contractAddress: null,
    from: '0xf896c5afd69239722013ad0041ef33b5a2fdb1a6',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
...
    events: {
        MinterRemoved: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 14174,
            transactionHash: '0x4b06b298f3de6f119901a4444326d21add6fb1b9a5d69c91c998a41af8fd46c9',
            transactionIndex: 0,
            blockHash: '0x2122846ede9dac35a6797faf0e8eabd7fd8edf7054df27c97410ae788b6cc329',
            logIndex: 0,
            id: 'log_9b0f3967',
            returnValues: {
                '0': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                account: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
            },
            event: 'MinterRemoved',
            signature: '0xe94479a9f7e1952cc78f2d6baab678adc1b772d936c6583def489e524cb66692',
            raw: {
                data: '0x',
                topics: [ '0xe9447...', '0x00...1a6' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.renounceMinter({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.renounceMinter().then(console.log)
```


## kip37.burn <a id="kip37-burn"></a>

```javascript
kip37.burn(account, id, value [, sendParam])
```
特定の KIP-37 トークンを焼き付けます。

オーナーのトークン(オペレーター)またはトークン所有者のHim/彼女自身を操作するために承認されたアドレスは、このトークン転送トランザクションを実行することが期待されます。 Thus, an authorized address or the token owner should be the sender of this transaction whose address must be given at `sendParam.from` or `kip37.options.from`. `sendParam.from` と `kip37.options.from` の両方が指定されない限り、エラーが発生します。

この方法はトランザクションをKlaytnネットワークに送信し、トランザクションの送信者にトランザクション手数料を請求することに注意してください。

**パラメータ**

| 名前        | タイプ                                   | Description                                                                                                       |
| --------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| アカウント     | 文字列                                   | 破棄するトークンを所有するアカウントのアドレス。                                                                                          |
| id        | BigNumber &#124; string &#124; number | 破棄するトークンのID。                                                                                                      |
| 値         | BigNumber &#124; string &#124; number | 破棄するトークンの量。                                                                                                       |
| sendParam | object                                | (オプション) トランザクションを送信するための定義されたパラメータを持つオブジェクト。 sendParamについての詳細は、 [kip37.create](#kip37-create) のパラメータの説明を参照してください。 |

**注意** `id` と `amount` パラメータは `番号` の型を受け付けますが、与えられた値が数値で上限された範囲外の場合。 AX_SAFE_INTEGER、予期しない結果やエラーが発生する可能性があります。 この場合、 `BigNumber` 型、特に `uint256` サイズの数値入力値を使用することをお勧めします。

**戻り値**

`Promise` は `オブジェクトを返します。` - トランザクション実行の結果を含む領収書。 レシートオブジェクト内のプロパティについて知りたい場合は、 [getTransactionReceipt][] の説明を参照してください。 KIP37 インスタンスからの領収書は、「logs」属性の代わりに、ABI を介して解析された「events」属性を持っています。

**例**

```javascript
// Send via a sendParam object with the from field given 
> kip37.burn('0x{address in hex}', 2, 10, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xa42a71d838afcf27b02365fd716da4cba542f73540a9482e27c405a8bc47b456',
    blocknumber: 16076,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
...
    events: {
        TransferSingle: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 16076,
            transactionHash: '0xec16313d00d0dbf34608c84e7563bacbde04e7e9c5fbcfffae54f0161356f19c',
            transactionIndex: 0,
            blockHash: '0xa42a71d838afcf27b02365fd716da4cba542f73540a9482e27c405a8bc47b456',
            logIndex: 0,
            id: 'log_9c9ddbc9',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '1': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '2': '0x0000000000000000000000000000000000000000',
                '3': '2',
                '4': '10',
                operator: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                from: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                to: '0x0000000000000000000000000000000000000000',
                id: '2',
                value: '10',
            },
            event: 'TransferSingle',
            signature: '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
            raw: {
                data: '0x00...00a',
                topics: [ '0xc3d58...', '0x00...f48', '0x00...f48', '0x00...000' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.burn('0x{address in hex}', 2, 10, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.burn('0x{address in hex}', 2, 10).then(console.log)
```


## kip37.burnBatch <a id="kip37-burnbatch"></a>

```javascript
kip37. burnBatch(account, ids, values [, sendParam])
```
複数の KIP-37 トークンを書き込みます。

所有者のトークン(オペレータ)またはトークン所有者のHim/彼女自身の操作を許可されたアドレスは、このトークン転送トランザクションを実行することが期待されます。 Thus, the authorized one or the token owner should be the sender of this transaction whose address must be given at `sendParam.from` or `kip37.options.from`. `sendParam.from` と `kip37.options.from` の両方が指定されない限り、エラーが発生します。

この方法はトランザクションをKlaytnネットワークに送信し、トランザクションの送信者にトランザクション手数料を請求することに注意してください。

**パラメータ**

| 名前        | タイプ    | Description                                                                                                       |
| --------- | ------ | ----------------------------------------------------------------------------------------------------------------- |
| アカウント     | 文字列    | 破棄するトークンを所有するアカウントのアドレス。                                                                                          |
| id        | 行列     | 書き込むトークンのIDの配列。                                                                                                   |
| 値         | 行列     | トークンの配列は燃えることになります。                                                                                               |
| sendParam | object | (オプション) トランザクションを送信するための定義されたパラメータを持つオブジェクト。 sendParamについての詳細は、 [kip37.create](#kip37-create) のパラメータの説明を参照してください。 |

**NOTE** The `ids` and `values` array parameters accept `number` type as an element in array, but if the fed value were out of the range capped by number.MAX_SAFE_INTEGER, it might cause an unexpected result or error. この場合、 `BigNumber` 型、特に `uint256` サイズの数値入力値を使用することをお勧めします。

**戻り値**

`Promise` は `オブジェクトを返します。` - トランザクション実行の結果を含む領収書。 レシートオブジェクト内のプロパティについて知りたい場合は、 [getTransactionReceipt][] の説明を参照してください。 KIP37 インスタンスからの領収書は、「logs」属性の代わりに、ABI を介して解析された「events」属性を持っています。

**例**

```javascript
// Send via a sendParam object with the from field given 
> kip37.burnBatch('0x{address in hex}', [1, 2], [100, 200], { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xb72521aecd76dc2cde31721d32f2cbd71d8cc244cca9109d4fe2de9fe9b53ec0',
    blocknumber: 16930,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
...
    events: {
        TransferBatch: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 16930,
            transactionHash: '0xa19ee5c01ad67fd27bb2818b7cbad58ba529d5a7885d79558dea8006e7a760bf',
            transactionIndex: 0,
            blockHash: '0xb72521aecd76dc2cde31721d32f2cbd71d8cc244cca9109d4fe2de9fe9b53ec0',
            logIndex: 0,
            id: 'log_66e4d23e',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '1': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '2': '0x0000000000000000000000000000000000000000',
                '3': ['1', '2'],
                '4': ['100', '200'],
                operator: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                from: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                to: '0x0000000000000000000000000000000000000000',
                ids: ['1', '2'],
                values: ['100', '200'],
            },
            event: 'TransferBatch',
            signature: '0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb',
            raw: {
                data: '0x00...0c8',
                topics: [ '0x4a39d...', '0x00...f48', '0x00...f48', '0x00...000' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.burnBatch('0x{address in hex}', [1, 2], [100, 200], {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.burnBatch('0x{address in hex}', [1, 2], [100, 200]).then(console.log)
```


## kip37.addPauser <a id="kip37-addpauser"></a>

```javascript
kip37.addPauser(account [, sendParam])
```
契約を一時停止する権利を有するアカウントを追加します。

この方法はトランザクションをKlaytnネットワークに送信し、トランザクションの送信者にトランザクション手数料を請求することに注意してください。

**パラメータ**

| 名前        | タイプ    | Description                                                                                                       |
| --------- | ------ | ----------------------------------------------------------------------------------------------------------------- |
| アカウント     | 文字列    | 新しいポーザルにするアカウントのアドレス                                                                                              |
| sendParam | object | (オプション) トランザクションを送信するための定義されたパラメータを持つオブジェクト。 sendParamについての詳細は、 [kip37.create](#kip37-create) のパラメータの説明を参照してください。 |

**注意** `sendParam.from` または `kip37.options.from` が与えられた場合は、PauserRole を持つpauser である必要があります。

**戻り値**

`Promise` は `オブジェクトを返します。` - トランザクション実行の結果を含む領収書。 レシートオブジェクト内のプロパティについて知りたい場合は、 [getTransactionReceipt][] の説明を参照してください。 KIP37 インスタンスからの領収書は、「logs」属性の代わりに、ABI を介して解析された「events」属性を持っています。

**例**

```javascript
// Send via a sendParam object with the from field given 
> kip37.addPauser('0x{address in hex}', { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x8267759b768d486e42657216a22c2425455cbf8b12aea9f149bb7ebe3aa2d666',
    blocknumber: 17007,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
...
    events: {
        PauserAdded: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 17007,
            transactionHash: '0xe1d702bbbb44c25b5f4d18cf1e1a1745eb134d6438d5cae77611b1b73944aa93',
            transactionIndex: 0,
            blockHash: '0x8267759b768d486e42657216a22c2425455cbf8b12aea9f149bb7ebe3aa2d666',
            logIndex: 0,
            id: 'log_50e810b0',
            returnValues: {
                '0': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                account: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
            },
            event: 'PauserAdded',
            signature: '0x6719d08c1888103bea251a4ed56406bd0c3e69723c8a1686e017e7bbe159b6f8',
            raw: {
                data: '0x',
                topics: [ '0x6719d...', '0x00...1a6' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.addPauser('0x{address in hex}', {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.addPauser('0x{address in hex}').then(console.log)
```


## kip37.renouncePauser <a id="kip37-renouncepauser"></a>

```javascript
kip37.renouncePauser([sendParam])
```
契約を一時停止する権利を放棄します。 Pauser アドレスのみが一時停止権限を放棄できます。

この方法はトランザクションをKlaytnネットワークに送信し、トランザクションの送信者にトランザクション手数料を請求することに注意してください。

**パラメータ**

| 名前        | タイプ    | Description                                                                                                       |
| --------- | ------ | ----------------------------------------------------------------------------------------------------------------- |
| sendParam | object | (オプション) トランザクションを送信するための定義されたパラメータを持つオブジェクト。 sendParamについての詳細は、 [kip37.create](#kip37-create) のパラメータの説明を参照してください。 |

**注意** `sendParam.from` または `kip37.options.from` が与えられた場合は、PauserRole を持つpauser である必要があります。

**戻り値**

`Promise` は `オブジェクトを返します。` - トランザクション実行の結果を含む領収書。 レシートオブジェクト内のプロパティについて知りたい場合は、 [getTransactionReceipt][] の説明を参照してください。 KIP37 インスタンスからの領収書は、「logs」属性の代わりに、ABI を介して解析された「events」属性を持っています。

**例**

```javascript
// Send via a sendParam object with the from field given 
> kip37.renouncePauser({ from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x86b189c51df4c9390ddc7bcaefa6b5e78b9e7db645079cff33cc09ab321bc5e6',
    blocknumber: 17010,
    contractAddress: null,
    from: '0x5934a0c01baa98f3457981b8f5ce6e52ac585578',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
...
    events: {
        PauserRemoved: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 17010,
            transactionHash: '0xa0557cf370cdff56ee2f53555da3e816361125a19cc832caa9d7a62808afeda1',
            transactionIndex: 0,
            blockHash: '0x86b189c51df4c9390ddc7bcaefa6b5e78b9e7db645079cff33cc09ab321bc5e6',
            logIndex: 0,
            id: 'log_ebd8d4a4',
            returnValues: {
                '0': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                account: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
            },
            event: 'PauserRemoved',
            signature: '0xcd265ebaf09df2871cc7bd4133404a235ba12eff2041bb89d9c714a2621c7c7e',
            raw: {
                data: '0x',
                topics: [ '0xcd265...', '0x00...1a6' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.renouncePauser({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.renouncePauser().then(console.log)
```


## kip37.pause <a id="kip37-pause"></a>

```javascript
kip37.pause([id] [, sendParam])
```
トークン操作に関連する関数を一時停止します。 `id` パラメータが定義されている場合は、特定のトークンを一時停止します。 それ以外の場合は、トークンコントラクトを一時停止します。

この方法はトランザクションをKlaytnネットワークに送信し、トランザクションの送信者にトランザクション手数料を請求することに注意してください。

**パラメータ**

| 名前        | タイプ                                   | Description                                                                                                       |
| --------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| id        | BigNumber &#124; string &#124; number | (オプション) 一時停止するトークンID。 このパラメータが省略された場合、 `pause` 関数はトークンコントラクトを一時停止します。                                             |
| sendParam | object                                | (オプション) トランザクションを送信するための定義されたパラメータを持つオブジェクト。 sendParamについての詳細は、 [kip37.create](#kip37-create) のパラメータの説明を参照してください。 |

**注意** `sendParam.from` または `kip37.options.from` が与えられた場合は、PauserRole を持つpauser である必要があります。

**戻り値**

`Promise` は `オブジェクトを返します。` - トランザクション実行の結果を含む領収書。 レシートオブジェクト内のプロパティについて知りたい場合は、 [getTransactionReceipt][] の説明を参照してください。 KIP37 インスタンスからの領収書は、「logs」属性の代わりに、ABI を介して解析された「events」属性を持っています。

**例**

```javascript
// Send via a sendParam object with the from field given (pause the token contract)
> kip37.pause({ from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x004960a28a6c5b75963d28c4018d6540d5ad181c5a5f257ec8f78ebb8436be1e',
    blocknumber: 17521,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
...
    events: {
        Paused: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 17521,
            transactionHash: '0xc5f3bebe83c86f68d582240f6bb47a8f56867650c9fec3b7caf1cb5861d31af2',
            transactionIndex: 0,
            blockHash: '0x004960a28a6c5b75963d28c4018d6540d5ad181c5a5f257ec8f78ebb8436be1e',
            logIndex: 0,
            id: 'log_55bd1adc',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                account: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
            },
            event: 'Paused',
            signature: '0x62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258',
            raw: {
                data: '0x00...f48',
                topics: ['0x62e78...'],
            },
        },
    },
}

// Send via a sendParam object with the from field given (pause the specific token)
> kip37.pause(2, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x36d0618e1e30bca8199ce3bbc3d32e74bd4c25f6326c4c9e2d9292b79605155f',
    blocknumber: 17738,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
...
    events: {
        Paused: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 17738,
            transactionHash: '0x437834d4ccb944397607a81abe1bc229c44749d20c2b4f4b73ae1dd5907f79c9',
            transactionIndex: 0,
            blockHash: '0x36d0618e1e30bca8199ce3bbc3d32e74bd4c25f6326c4c9e2d9292b79605155f',
            logIndex: 0,
            id: 'log_b89719ed',
            returnValues: {
                '0': '2',
                '1': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                tokenId: '2',
                account: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
            },
            event: 'Paused',
            signature: '0xabdb1c9133626eb4f8c5f2ec7e3c60a969a2fb148a0c341a3cf6597242c8f8f5',
            raw: {
                data: '0x00...f48',
                topics: ['0xabdb1...'],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.pause({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.pause().then(console.log)
```


## kip37.unpause <a id="kip37-unpause"></a>

```javascript
kip37.unpause([id] [, sendParam])
```

一時停止したコントラクトまたは特定のトークンを再開します。 `id` パラメータが定義されている場合、特定のトークンの一時停止を解除します。 それ以外の場合は、トークンコントラクトの一時停止を解除します。

この方法はトランザクションをKlaytnネットワークに送信し、トランザクションの送信者にトランザクション手数料を請求することに注意してください。

**パラメータ**

| 名前 | タイプ                                   | Description                                                                   |
| -- | ------------------------------------- | ----------------------------------------------------------------------------- |
| id | BigNumber &#124; string &#124; number | (オプション) 一時停止を解除するトークンID。 このパラメータが省略された場合、 `unpause` 関数はトークンコントラクトの一時停止を解除します。 |

**注意** `sendParam.from` または `kip37.options.from` が与えられた場合は、PauserRole を持つpauser である必要があります。

**戻り値**

`Promise` は `オブジェクトを返します。` - トランザクション実行の結果を含む領収書。 レシートオブジェクト内のプロパティについて知りたい場合は、 [getTransactionReceipt][] の説明を参照してください。 KIP37 インスタンスからの領収書は、「logs」属性の代わりに、ABI を介して解析された「events」属性を持っています。

**例**

```javascript
// Send via a sendParam object with the from field given (unpause the token contract)
> kip37.unpause({ from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x71d47d869e6fcf7b56f071e4f3b7b5a6d83e585b36a203248544340cdada8f1d',
    blocknumber: 17524,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
...
    events: {
        Unpaused: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 17524,
            transactionHash: '0x5e67040e12297ee85a3464eae406904c32b7f3c7493cbdbc8f73a2e92b10f56d',
            transactionIndex: 0,
            blockHash: '0x71d47d869e6fcf7b56f071e4f3b7b5a6d83e585b36a203248544340cdada8f1d',
            logIndex: 0,
            id: 'log_78d5bc18',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                account: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
            },
            event: 'Unpaused',
            signature: '0x5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa',
            raw: {
                data: '0x00...f48',
                topics: ['0x5db9e...'],
            },
        },
    },
}

// Send via a sendParam object with the from field given (unpause the specific token)
> kip37.unpause(2, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x44e2005d6061eeb014889c29cce567d12664e5ef4104faa3426eacd8772790c6',
    blocknumber: 17742,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
...
    events: {
        Unpaused: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 17742,
            transactionHash: '0xed920c7b487c3133508cc37f930e4ae3b9c05f01e4ad823909c9b4aacf040f62',
            transactionIndex: 0,
            blockHash: '0x44e2005d6061eeb014889c29cce567d12664e5ef4104faa3426eacd8772790c6',
            logIndex: 0,
            id: 'log_2811c3c5',
            returnValues: {
                '0': '2',
                '1': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                tokenId: '2',
                account: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
            },
            event: 'Unpaused',
            signature: '0xfe9b5e5216db9de81757f43d20f846bea509c040a560d136b8263dd8cd764238',
            raw: {
                data: '0x00...f48',
                topics: ['0xfe9b5...'],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.unpause({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.unpause().then(console.log)
```

[getTransactionReceipt]: ../caver.rpc/klay.md#caver-rpc-klay-gettransactionreceipt
