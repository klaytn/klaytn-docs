# caver.kct.kip7 <a id="caver-klay-kip7"></a>

`caver.kct.kip7` は、KIP-7 を Klaytn ブロックチェーンプラットフォーム(Klaytn)上で JavaScript オブジェクトとして実装するスマートコントラクトを簡単に処理できます。

`caver.kct.kip7` は KIP-7 トークン契約を実装するために [caver.contract](../caver.contract.md) を継承します。 `caver.kct.kip7` は `caver.contract` の同じプロパティを保持しますが、追加の機能を実装するための追加メソッドです。 この章では、新たに追加された `caver.kct.kip7` のバインド方法についてのみ紹介する。

caver.kct.kip7 で使用されている abi とバイトコードは [openzeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20) の例を使用して実装されました。

The code that implements KIP-7 for caver-js is available on the [Klaytn Contracts Github Repo](https://github.com/klaytn/klaytn-contracts/tree/main/contracts/KIP/token/KIP7).

KIP-7 の詳細については、 [Klaytn Improvation Proposals](https://kips.klaytn.foundation/KIPs/kip-7) を参照してください。

## caver.kct.kip7.deploy <a id="caver-klay-kip7-deploy"></a>

```javascript
caver.kct.kip7.deploy(tokenInfo, deployer)
```
KIP-7トークンコントラクトをKlaytnブロックチェーンにデプロイします。 caver.kct.kip7.deploy を使用してデプロイされるコントラクトは、KIP-7 標準に準拠する fungible トークンです。

デプロイが成功すると、Promiseは新しい KIP7 インスタンスで解決されます。

**パラメータ**

| 名前        | タイプ               | Description                                                                                                                                                                                                                                                  |
| --------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| tokenInfo | object            | KIP-7トークンコントラクトをKlaytnブロックチェーンにデプロイするために必要な情報。 詳細は以下の表をご覧ください。                                                                                                                                                                                               |
| デプロイ者     | 文字列 &#124; オブジェクト | KIP-7 トークンコントラクトをデプロイするキーリングのアドレス。 このキーリングには十分な KLAYが必要です。 トランザクションの送信時に使用する独自のフィールドを定義したい場合は、オブジェクト型をパラメータとして渡すことができます。 また、KIP-7 コントラクトをデプロイする際に手数料委任を使用する場合は、オブジェクト内の手数料委任に関連する項目を定義できます。 オブジェクト内で定義できるフィールドについては、 [承認](#kip7-approve) のパラメータの説明を参照してください。 |

tokenInfo オブジェクトには以下を含める必要があります:

| 名前            | タイプ                                   | Description        |
| ------------- | ------------------------------------- | ------------------ |
| 名前            | 文字列                                   | トークンの名前            |
| シンボル          | 文字列                                   | トークンのシンボル。         |
| decimals      | 数値                                    | トークンが使用する小数点以下の桁数。 |
| initialSupply | BigNumber &#124; string &#124; number | 最初に提供されるトークンの合計量。  |

**注意** `initialSupply` パラメータは `number` 型を受け付けますが、与えられた値が数値で上限された範囲外の場合。 AX_SAFE_INTEGER、予期しない結果やエラーが発生する可能性があります。 In this case, it is recommended to use the `BigNumber` type, especially for a `uint256` sized numeric input value.

**戻り値**

`PromiEvent`: 新しいKIP7インスタンスで解決されるPromise複合イベントエミッター。 さらに、次のイベントが発生する可能性があります。

| 名前                | タイプ    | Description                                                                                                                                          |
| ----------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| transactionHash   | 文字列    | トランザクションが送信され、トランザクションハッシュが利用可能になった直後に発生します。                                                                                                         |
| レシート|領収書|領収書|受信する | object | 取引の領収書が有効なときに発行されます。 レシートオブジェクト内のプロパティについて知りたい場合は、 [getTransactionReceipt][] を参照してください。 KIP7 インスタンスからの領収書には、'logs' 属性の代わりに 'events' 属性が abi で解析されます。 |
| エラー               | エラー    | 送信中にエラーが発生した場合に発生します。                                                                                                                                |

**例**

```javascript
// using the promise
> caver.kct.kip7.deploy({
    name: 'Jasmine',
    symbol: 'JAS',
    decimals: 18,
    initialSupply: '100000000000000000000',
}, '0x{address in hex}').then(console.log)
KIP7 {
    ...
    _address: '0x598367e443D8a2b644Fec69a2C12aF44BC283f23',
    _jsonInterface: [
...
        {
            anonymous: false,
            inputs: [
                { indexed: true, name: 'owner', type: 'address' },
                    { indexed: true, name: 'spender', type: 'address' },
                    { indexed: false, name: 'value', type: 'uint256' }
            ],
            name: 'Approval',
            type: 'event',
            signature:  '0x8c5be...'
        }
    ] 
}

// Send object as second parameter
> caver.kct.kip7.deploy({
        name: 'Jasmine',
        symbol: 'JAS',
        decimals: 18,
        initialSupply: '100000000000000000000',
    },
    {
        from: '0x{address in hex}',
        feeDelegation: true,
        feePayer: '0x{address in hex}',
    }).then(console.log)

// using event emitter and promise
> caver.kct.kip7.deploy({
    name: 'Jasmine',
    symbol: 'JAS',
    decimals: 18,
    initialSupply: '100000',
}, '0x{address in hex}')
.on('error', function(error) { ... })
.on('transactionHash', function(transactionHash) { ... })
.on('receipt', function(receipt) {
    console.log(receipt.contractAddress) // contains the new token contract address
})
.then(function(newKIP7Instance) {
    console.log(newKIP7Instance.options.address) // instance with the new token contract address
})
```

## caver.kct.kip7.detectInterface <a id="caver-kct-kip7-detectinterface"></a>

```javascript
caver.kct.kip7.detectInterface(contractAddress)
```
Returns the information of the interface implemented by the token contract. この静的関数は [kip7.detectInterface](#kip7-detectinterface) を使用します。

**パラメータ**

| 名前         | タイプ | Description          |
| ---------- | --- | -------------------- |
| コントラクトアドレス | 文字列 | KIP-7トークンコントラクトのアドレス |

**戻り値**

`Promise` returns an `object` containing the result with boolean values whether each [KIP-7 interface](https://kips.klaytn.foundation/KIPs/kip-7#kip-13-identifiers) is implemented.

**例**

```javascript
> caver.kct.kip7.detectInterface('0x{address in hex}').then(console.log)
{
    IKIP7Metadata: true,
    IKIP7Metadata: true,
    IKIP7Mintable: true,
    IKIP7Burnable: true,
    IKIP7Pausable: true,
}
```

## caver.kct.kip7.create <a id="caver-kct-kip7-create"></a>

```javascript
caver.kct.kip7.create([tokenAddress])
```
バインドされたメソッドとイベントで新しい KIP7 インスタンスを作成します。 この関数は、 [new KIP7](#new-kip7) と同じ動作をします。

**注意** `caver.kct.kip7.create` は caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) からサポートされています。

**パラメータ**

[新しい KIP7](#new-kip7) を参照してください。

**戻り値**

[新しい KIP7](#new-kip7) を参照してください。


**例**

```javascript
// Create a KIP7 instance without a parameter
> const kip7 = caver.kct.kip7.create()

// Create a KIP7 instance with a token address
> const kip7 = caver.kct.kip7.create('0x{address in hex}')
```


## 新しい KIP7 <a id="new-kip7"></a>

```javascript
new caver.kct.kip7([tokenAddress])
```
バインドされたメソッドとイベントで新しい KIP7 インスタンスを作成します。

**パラメータ**

| 名前           | タイプ | Description                                                           |
| ------------ | --- | --------------------------------------------------------------------- |
| tokenAddress | 文字列 | (オプション) KIP-7 トークンコントラクトのアドレス。これは `kip7.options.address = '0x1234..'` |


**戻り値**

| タイプ    | Description                            |
| ------ | -------------------------------------- |
| object | KIP7インスタンスには、バインドされたメソッドとイベントが含まれています。 |


**例**

```javascript
// Create a KIP7 instance without a parameter
> const kip7 = new caver.kct.kip7()

// Create a KIP7 instance with a token address
> const kip7 = new caver.kct.kip7('0x{address in hex}')
```


## kip7.clone <a id="kip7-clone"></a>

```javascript
kip7.clone([tokenAddress])
```
現在のKIP7インスタンスをクローンします。

**パラメータ**

| 名前           | タイプ | Description                                                                      |
| ------------ | --- | -------------------------------------------------------------------------------- |
| tokenAddress | 文字列 | (オプション) 別の KIP7 トークンをデプロイしたスマートコントラクトのアドレス。 省略された場合は、元のインスタンスでコントラクトアドレスに設定されます。 |

**戻り値**

| タイプ    | Description        |
| ------ | ------------------ |
| object | 元のKIP7インスタンスのクローン。 |


**例**

```javascript
> const kip7 = new caver.kct.kip7(address)

// Clone without a parameter
> const cloned = kip7.clone()

// Clone with the address of the new token contract
> const cloned = kip7.clone('0x{address in hex}')
```

## kip7.detectInterface <a id="kip7-detectinterface"></a>

```javascript
kip7.detectInterface()
```
Returns the information of the interface implemented by the token contract.

**パラメータ**

なし

**戻り値**

`Promise` returns an `object` containing the result with boolean values whether each [KIP-7 interface](https://kips.klaytn.foundation/KIPs/kip-7#kip-13-identifiers) is implemented.

**例**

```javascript
> kip7.detectInterface().then(console.log)
{
    IKIP7Metadata: true,
    IKIP7Metadata: true,
    IKIP7Mintable: true,
    IKIP7Burnable: true,
    IKIP7Pausable: true,
}
```

## kip7.supportsInterface <a id="kip7-supportsinterface"></a>

```javascript
kip7.supportsInterface(interfaceId)
```
Return `true` if this contract implements the interface defined by `interfaceId`.

**パラメータ**

| 名前          | タイプ | Description       |
| ----------- | --- | ----------------- |
| interfaceId | 文字列 | チェックするインターフェイスID。 |

**戻り値**

`Promise` は `Boolean`: `true` このコントラクトが `interfaceId` で定義されたインターフェイスを実装している場合。

**例**

```javascript
> kip7.supportsInterface('0x65787371').then(console.log)
true

> kip7.supportsInterface('0x3a2820fe').then(console.log)
false
```


## kip7.name <a id="kip7-name"></a>

```javascript
kip7.name()
```
トークンの名前を返します。

**パラメータ**

なし

**戻り値**

`Promise` returns `string`: The name of the token.

**例**

```javascript
> kip7.name().then(console.log)
Jasmine
```


## kip7.symbol <a id="kip7-symbol"></a>

```javascript
kip7.symbol()
```
トークンのシンボルを返します。

**パラメータ**

なし

**戻り値**

`Promise` returns `string`: The symbol of the token.

**例**

```javascript
> kip7.symbol().then(console.log)
NAS
```


## kip7.decimals <a id="kip7-decimals"></a>

```javascript
kip7.decimals()
```
トークンが使用する小数位の数を返します。

**パラメータ**

なし

**戻り値**

`Promise` は `番号`を返します: トークンが使用する小数点以下の桁数。

**例**

```javascript
> kip7.decimals().then(console.log)
18
```


## kip7.totalSupply <a id="kip7-totalsupply"></a>

```javascript
kip7.totalSupply()
```
トークンの総供給量を返します。

**パラメータ**

なし

**戻り値**

`Promise` returns `BigNumber`: The total number of tokens.

**例**

```javascript
> kip7.totalSupply().then(console.log)
10000000000000000000000
```


## kip7.balanceOf <a id="kip7-balanceof"></a>

```javascript
kip7.balanceOf(address)
```
指定されたアカウントアドレスの残高を返します。

**パラメータ**

| 名前      | タイプ | Description      |
| ------- | --- | ---------------- |
| address | 文字列 | 残高を確認するアカウントの住所。 |

**戻り値**

`Promise` returns `BigNumber`: The account balance.

**例**

```javascript
> kip7.balanceOf('0x{address in hex}').then(console.log)
100000
```


## kip7.allowance <a id="kip7-allowance"></a>

```javascript
kip7.allowance(owner, spender)
```
`所有者` からの引き出しを許可する `トークンの量を返します`。

**パラメータ**

| 名前  | タイプ | Description                     |
| --- | --- | ------------------------------- |
| 所有者 | 文字列 | トークン所有者のアカウントのアドレス              |
| 送金者 | 文字列 | オーナーの代わりにトークンを費やしているアカウントのアドレス。 |

**戻り値**

`Promise` は `BigNumber`を返します: 所有者の代わりに送金が許可されているトークンの残りの数。

**例**

```javascript
> kip7.allowance('0x{address in hex}', '0x{address in hex}').then(console.log)
0

> kip7.allowance('0x{address in hex}', '0x{address in hex}').then(console.log)
10
```


## kip7.isMinter <a id="kip7-isminter"></a>

```javascript
kip7.isMinter(address)
```
与えられたアカウントが新しいKIP7トークンを発行できるミンターの場合、 `true` を返します。

**パラメータ**

| 名前      | タイプ | Description                    |
| ------- | --- | ------------------------------ |
| address | 文字列 | 鋳造の権利を有するためにチェックされるアカウントのアドレス。 |

**戻り値**

`Promise` は `Boolean`: `minter の場合は true` を返します。

**例**

```javascript
> kip7.isMinter('0x{address in hex}').then(console.log)
true

> kip7.isMinter('0x{address in hex}').then(console.log)
false
```


## kip7.isPauser <a id="kip7-ispauser"></a>

```javascript
kip7.isPauser(address)
```
与えられたアカウントが転送トークンを一時停止できるPauserの場合、 `true` を返します。

**パラメータ**

| 名前      | タイプ | Description                            |
| ------- | --- | -------------------------------------- |
| address | 文字列 | 転送トークンを一時停止する権利があるかどうかを確認するアカウントのアドレス。 |

**戻り値**

`Promise` は `Boolean`: `true` アカウントがポーザルの場合。

**例**

```javascript
> kip7.isPauser('0x{address in hex}').then(console.log)
true

> kip7.isPauser('0x{address in hex}').then(console.log)
false
```


## kip7.paused <a id="kip7-paused"></a>

```javascript
kip7.paused()
```
コントラクトが一時停止されている場合は `true` を、それ以外の場合は `false` を返します。

**パラメータ**

なし

**戻り値**

`Promise` は `Boolean`: コントラクトが一時停止している場合は `true` を返します。

**例**

```javascript
> kip7.paused().then(console.log)
true

> kip7.paused().then(console.log)
false
```


## kip7を承認する <a id="kip7-approve"></a>

```javascript
kip7.approve(spender, amount [, sendParam])
```
`送金者` が使用するトークンの `金額`を設定します。

この方法は、所有者からKlaytnネットワークにトランザクションを送信し、所有者にトランザクション手数料を請求することに注意してください。

**パラメータ**

| 名前        | タイプ                                   | Description                               |
| --------- | ------------------------------------- | ----------------------------------------- |
| 送金者       | 文字列                                   | オーナーの代わりにトークンを費やしているアカウントのアドレス。           |
| 金額        | BigNumber &#124; string &#124; number | 使用できるトークンの量。                              |
| sendParam | object                                | (オプション) トランザクションを送信するために必要なオブジェクト保持パラメータ。 |

**注意** `amount` パラメータは `number` 型を受け付けますが、与えられた値が数値で上限された範囲外の場合。 AX_SAFE_INTEGER、予期しない結果やエラーが発生する可能性があります。 In this case, it is recommended to use the `BigNumber` type, especially for a `uint256` sized numeric input value.

The `sendParam` object contains the following:

| 名前            | タイプ                                             | Description                                                                                                                                                                                   |
| ------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from          | 文字列                                             | (オプション) トランザクションを送信するアドレス。 省略した場合は、 `kip7.options.from` によって設定されます。 `sendParam` オブジェクトの `から` のいずれも `kip7.options.from` が指定されていない場合、エラーが発生します。                                                 |
| ガス            | 番号 &#124; 文字列                                   | (オプション) この取引に提供されるガスの最大数(ガス制限)。 省略した場合、 `kip7.methods.approve(spender, amount).estimateGas({from})` を呼び出すことでcaver-jsによって設定されます。                                                               |
| gasPrice      | 番号 &#124; 文字列                                   | (オプション) この取引に対するペブ内のガス価格。 省略された場合、 `caver.klay.getGasPrice` を呼び出すことで caver-js によって設定されます。                                                                                                     |
| 値             | number &#124; string &#124; BN &#124; BigNumber | (オプション) peb で転送される値。                                                                                                                                                                          |
| feeDelegation | boolean                                         | (オプション、デフォルト `false`) 手数料委託トランザクションを使用するかどうか。 省略した場合は、 `kip7.options.feeDelegation` が使用されます。 両方が省略された場合、手数料の委任は使用されません。                                                                       |
| feePayer      | 文字列                                             | (オプション) 取引手数料を支払う手数料支払者の住所。 `feeDelegation` が `true`の場合、この値はトランザクションの `feePayer` フィールドに設定されます。 省略した場合は、 `kip7.options.feePayer` が使用されます。 両方が省略された場合、エラーがスローされます。                              |
| 手数料比          | 文字列                                             | (オプション) 手数料支払者が負担する取引手数料の割合。 `feeDelegation` が `true` で、 `feeRatio` が有効な値に設定されている場合、部分的な手数料委任トランザクションが使用されます。 有効範囲は1~99です。 0、または100以上の比率は許可されていません。 省略した場合は、 `kip7.options.feeRatio` が使用されます。 |

**注意** `feeDelegation`, `feePayer` と `feeRatio` は caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) からサポートされています。

**戻り値**

`Promise` returns `object` - The receipt containing the result of the transaction execution. If you want to know about the properties inside the receipt object, see the description of [getTransactionReceipt][]. KIP7 インスタンスからの領収書には、'logs' 属性の代わりに 'events' 属性が ABI 経由で解析されます。

**例**

```javascript
// Send via a sendParam object with the from field given 
> kip7.approve('0x{address in hex}', 10, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xf010a98f66b6b36943175cd5b249da54e84abed551cfa02846a2900ddab968c7',
    blocknumber: 2098,
    contractAddress: null,
    from: '0x2f7dc98bd93a0544b03d6ff428a6f4ae04b32676',
    ...
    status: true,
    to: '0x8ca777e464a83b939ae131ca037f0d8728c6929e',
...
    events: {
        Approval: {
            address: '0x8CA777e464a83b939AE131CA037F0d8728C6929e',
            blocknumber: 2098,
            transactionHash: '0xf7469c0420cb5ebb0fbf64a314bd0c9ee7517ea64dd72eefa59bc8005bbc0f99',
            transactionIndex: 0,
            blockHash: '0xf010a98f66b6b36943175cd5b249da54e84abed551cfa02846a2900ddab968c7',
            logIndex: 0,
            id: 'log_c6ec61aa',
            returnValues: {
                '0': '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
                '1': '0xe36ffD7bc4D588c480B5925B9622881F9d85ea30',
                '2': '10',
                owner: '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
                spender: '0xe36ffD7bc4D588c480B5925B9622881F9d85ea30',
                value: '10'
            },
            event: 'Approval',
            signature: '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
            raw: {
                data: '0x000000000000000000000000000000000000000000000000000000000000000a',
                topics: [ '0x8c5be...', '0x00...676', '0x00...a30' ]
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip7.approve('0x{address in hex}', 10, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip7.options.from
// If the value of kip7.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7 instance.
> kip7.options.from = '0x{address in hex}'
> kip7.approve('0x{address in hex}', 10).then(console.log)
```


## kip7.transfer <a id="kip7-transfer"></a>

```javascript
kip7.transfer(受信者, amount [, sendParam])
```
トークン所有者の残高から与えられた `amount` を `受信者` に転送します。 トークンの所有者は、自分の手でこのトークン転送を実行する必要があります。 したがって、トークンの所有者は、 `sendParam.from` または `kip7.options.from` でアドレスを与えなければならないこのトランザクションの送信者である必要があります。 `sendParam.from` または `kip7.options.from` が指定されていない場合、エラーが発生します。

Note that sending this transaction will charge the transaction fee to the transaction sender.

**パラメータ**

| 名前        | タイプ                                   | Description                                                                                            |
| --------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| 受信者       | 文字列                                   | トークンを受け取るアカウントのアドレス                                                                                    |
| 金額        | BigNumber &#124; string &#124; number | 転送するトークンの量                                                                                             |
| sendParam | object                                | (オプション) トランザクションを送信するための定義されたパラメータを持つオブジェクト。 sendParamについての詳細は、 [承認](#kip7-approve)のパラメータの説明を参照してください。 |

**注意** `amount` パラメータは `number` 型を受け付けますが、与えられた値が数値で上限された範囲外の場合。 AX_SAFE_INTEGER、予期しない結果やエラーが発生する可能性があります。 In this case, it is recommended to use the `BigNumber` type, especially for a `uint256` sized numeric input value.

**戻り値**

`Promise` returns `object` - The receipt containing the result of the transaction execution. If you want to know about the properties inside the receipt object, see the description of [getTransactionReceipt][]. KIP7 インスタンスからの領収書には、'logs' 属性の代わりに 'events' 属性が ABI 経由で解析されます。

**例**

```javascript
// Send via a sendParam object with the from field given 
> kip7.transfer('0x{address in hex}', 10, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x8a078c3a73d678cdd85d471eb21e9ed7d695f8b96fc7315cfa59c1f68be3d2bf',
    blocknumber: 1353,
    contractAddress: null,
    from: '0x2f7dc98bd93a0544b03d6ff428a6f4ae04b32676',
    ...
    status: true,
    to: '0x05871c21664e18b2906545f8831695650a8f4056',
...
    events: {
        Transfer: {
            address: '0x05871c21664E18b2906545f8831695650a8f4056',
            blocknumber: 1353,
            transactionHash: '0x8bd2b21a06241e4cfc0af1ec40e7b15444f730c7529440648aa4ed6b697f08f4',
            transactionIndex: 0,
            blockHash: '0x8a078c3a73d678cdd85d471eb21e9ed7d695f8b96fc7315cfa59c1f68be3d2bf',
            logIndex: 0,
            id: 'log_82ef7705',
            returnValues: {
                '0': '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
                '1': '0xE411cb0B61FDcC06497794fE3f49F65D5dE41f59',
                '2': '10',
                from: '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
                to: '0xE411cb0B61FDcC06497794fE3f49F65D5dE41f59',
                value: '10'
            },
            event: 'Transfer',
            signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
            raw: {
                data: '0x000000000000000000000000000000000000000000000000000000000000000a',
                topics: [ '0xddf25...', '0x00...676', '0x00...f59' ]
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip7.transfer('0x{address in hex}', 10, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip7.options.from
// If the value of kip7.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7 instance.
> kip7.options.from = '0x{address in hex}'
> kip7.transfer('0x{address in hex}', 10).then(console.log)
```

## kip7.safeTransfer <a id="kip7-safetransfer"></a>

```javascript
kip7.safeTransfer(recipient, amount [, data] [, sendParam])
```
トークン所有者の残高から与えられた `金額` を `受信者`に安全に転送します。 トークンの所有者は、自分の手でこのトークン転送を実行する必要があります。 したがって、トークンの所有者は、 `sendParam.from` または `kip7.options.from` でアドレスを与えなければならないこのトランザクションの送信者である必要があります。 `sendParam.from` または `kip7.options.from` が指定されていない場合、エラーが発生します。

受信者がコントラクトアドレスの場合、 [IKIP7Receiver.onKIP7Received](https://kips.klaytn.foundation/KIPs/kip-7#wallet-interface) を実装する必要があります。 Otherwise, the transfer is reverted.

Note that sending this transaction will charge the transaction fee to the transaction sender.

**パラメータ**

| 名前        | タイプ                                   | Description                                                                                            |
| --------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| 受信者       | 文字列                                   | トークンを受け取るアカウントのアドレス                                                                                    |
| 金額        | BigNumber &#124; string &#124; number | 転送するトークンの量                                                                                             |
| data      | バッファ &#124; 文字列 &#124; 番号             | (オプション) 通話とともに送信する任意のデータ。                                                                              |
| sendParam | object                                | (オプション) トランザクションを送信するための定義されたパラメータを持つオブジェクト。 sendParamについての詳細は、 [承認](#kip7-approve)のパラメータの説明を参照してください。 |

**注意** `amount` パラメータは `number` 型を受け付けますが、与えられた値が数値で上限された範囲外の場合。 AX_SAFE_INTEGER、予期しない結果やエラーが発生する可能性があります。 In this case, it is recommended to use the `BigNumber` type, especially for a `uint256` sized numeric input value.

**戻り値**

`Promise` returns `object` - The receipt containing the result of the transaction execution. If you want to know about the properties inside the receipt object, see the description of [getTransactionReceipt][]. KIP17 インスタンスからの領収書には、「logs」属性の代わりに、ABI を介して解析された「events」属性があります。

**例**

```javascript
// Send via a sendParam object with the from field given (without data)
> kip7.safeTransfer('0x{address in hex}', 10, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x208cd64b95bbd91420fc6b1a7b514a8d3051d09333d79244b6b74ff2f7f3eee4',
    blocknumber: 2384,
    contractAddress: null,
    from: '0xc2c84328845a36fe0c4dcef370d24ec80cf85221',
    ...
    status: true,
    to: '0xe4aeba6306b0df023aa4b765960fa59dbe925950',
...
    events: {
            Transfer: {
                    address: '0xe4AeBa6306b0Df023AA4b765960fA59dbE925950',
                    blocknumber: 2384,
                    transactionHash: '0x47bb085947c282722c1ceab1f4f0380d911ce464a47a19f1e7bddfe08a13563d',
                    transactionIndex: 0,
                    blockHash: '0x208cd64b95bbd91420fc6b1a7b514a8d3051d09333d79244b6b74ff2f7f3eee4',
                    logIndex: 0,
                    id: 'log_58e5e06d',
                    returnValues: {
                            '0': '0xC2C84328845A36Fe0c4DcEf370d24ec80cF85221',
                            '1': '0x67B092d09B5e94fed58609777cc7Ac9193553B73',
                            '2': '10',
                            from: '0xC2C84328845A36Fe0c4DcEf370d24ec80cF85221',
                            to: '0x67B092d09B5e94fed58609777cc7Ac9193553B73',
                            value: '10',
                    },
                    event: 'Transfer',
                    signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
                    raw: {
                            data: '0x000000000000000000000000000000000000000000000000000000000000000a',
                            topics: [ '0xddf25...', '0x00...221', '0x00...b73' ],
                    },
            },
    },
}

// Using FD transaction to execute the smart contract
> kip7.safeTransfer('0x{address in hex}', 10, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Send via a sendParam object with the from field given (with data)
> kip7.safeTransfer('0x{address in hex}', 11, '0x1234', { from: '0x{address in hex}' }).then(console.log)

// Using kip7.options.from
// If the value of kip7.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7 instance.
> kip7.options.from = '0x{address in hex}'
> kip7.safeTransfer('0x{address in hex}', 11).then(console.log)
```


## kip7.transferFrom <a id="kip7-transferfrom"></a>

```javascript
kip7.transferFrom(sender, recipient, amount [, sendParam])
```
トークン所有者の残高から与えられた `amount` を `受信者` に転送します。 トークン所有者のトークンを送信することが承認されたアドレスは、このトークン転送トランザクションを実行することが期待されます。 従って、承認されたものは、 `sendParam.from` または `kip7.options.from` でアドレスを与えなければならないこのトランザクションの送信者でなければなりません。 `sendParam.from` または `kip7.options.from` が指定されていない場合、エラーが発生します。

Note that sending this transaction will charge the transaction fee to the transaction sender.

**パラメータ**

| 名前        | タイプ                                   | Description                                                                                            |
| --------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| sender    | 文字列                                   | 手当メカニズムで送信されるトークンを所有するアカウントのアドレス。                                                                      |
| 受信者       | 文字列                                   | トークンを受け取るアカウントのアドレス                                                                                    |
| 金額        | BigNumber &#124; string &#124; number | 転送するトークンの量                                                                                             |
| sendParam | object                                | (オプション) トランザクションを送信するための定義されたパラメータを持つオブジェクト。 sendParamについての詳細は、 [承認](#kip7-approve)のパラメータの説明を参照してください。 |

**注意** `amount` パラメータは `number` 型を受け付けますが、与えられた値が数値で上限された範囲外の場合。 AX_SAFE_INTEGER、予期しない結果やエラーが発生する可能性があります。 In this case, it is recommended to use the `BigNumber` type, especially for a `uint256` sized numeric input value.

**戻り値**

`Promise` returns `object` - The receipt containing the result of the transaction execution. If you want to know about the properties inside the receipt object, see the description of [getTransactionReceipt][]. KIP7 インスタンスからの領収書には、'logs' 属性の代わりに 'events' 属性が ABI 経由で解析されます。

**例**

```javascript
// Send via a sendParam object with the from field given
> kip7.transferFrom('0x{address in hex}', '0x{address in hex}', 10000, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x3adec238e06a9e8d5fa09fc1e1d7c8748b64d07e89678d27e8a379a12a34974f',
    blocknumber: 2331,
    contractAddress: null,
    from: '0x01958c62ab4aec7fc282bec9491da0ef7f830ac2',
    ...
    status: true,
    to: '0x3d5eb40665d25aaa4160023c4278fa6a94ba4acb',
...
    events: {
        Transfer: {
            address: '0x3D5EB40665D25aAa4160023C4278FA6A94BA4aCb',
            blocknumber: 2331,
            transactionHash: '0x5b2232b68681f19d9b6fcd6fb03964ef105912fecb772c11c8ec9fc906be4cbf',
            transactionIndex: 0,
            blockHash: '0x3adec238e06a9e8d5fa09fc1e1d7c8748b64d07e89678d27e8a379a12a34974f',
            logIndex: 0,
            id: 'log_ae57b7a0',
            returnValues: {
                '0': '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
                '1': '0x49ff9cb8BB8CA10D7f6E1094b2Ba56c3C2DBA231',
                '2': '10000',
                from: '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
                to: '0x49ff9cb8BB8CA10D7f6E1094b2Ba56c3C2DBA231',
                value: '10000'
            },
            event: 'Transfer',
            signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
            raw: {
                data: '0x0000000000000000000000000000000000000000000000000000000000002710',
                topics: [ '0xddf25...', '0x00...676', '0x00...231' ]
            },
        },
        Approval: {
            address: '0x3D5EB40665D25aAa4160023C4278FA6A94BA4aCb',
            blocknumber: 2331,
            transactionHash: '0x5b2232b68681f19d9b6fcd6fb03964ef105912fecb772c11c8ec9fc906be4cbf',
            transactionIndex: 0,
            blockHash: '0x3adec238e06a9e8d5fa09fc1e1d7c8748b64d07e89678d27e8a379a12a34974f',
            logIndex: 1,
            id: 'log_cee37d26',
            returnValues: {
                '0': '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
                '1': '0x01958c62aB4aEC7fC282bEc9491dA0EF7F830AC2',
                '2': '0',
                owner: '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
                spender: '0x01958c62aB4aEC7fC282bEc9491dA0EF7F830AC2',
                value: '0'
            },
            event: 'Approval',
            signature: '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
            raw: {
                data: '0x0000000000000000000000000000000000000000000000000000000000000000',
                topics: [ '0x8c5be...', '0x00...676', '0x00...ac2' ]
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip7.transferFrom('0x{address in hex}', '0x{address in hex}', 10000, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip7.options.from
// If the value of kip7.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7 instance.
> kip7.options.from = '0x{address in hex}'
> kip7.transferFrom('0x{address in hex}', '0x{address in hex}', 10000).then(console.log)
```

## kip7.safeTransferFrom <a id="kip7-safetransferfrom"></a>

```javascript
kip7.safeTransferFrom(送信者、受信者、金額 [, データ] [, sendParam])
```
トークン所有者の残高から与えられた `金額` を `受信者`に安全に転送します。 トークン所有者のトークンを送信することが承認されたアドレスは、このトークン転送トランザクションを実行することが期待されます。 従って、承認されたものは、 `sendParam.from` または `kip7.options.from` でアドレスを与えなければならないこのトランザクションの送信者でなければなりません。 `sendParam.from` または `kip7.options.from` が指定されていない場合、エラーが発生します。

受信者がコントラクトアドレスの場合、 [IKIP7Receiver.onKIP7Received](https://kips.klaytn.foundation/KIPs/kip-7#wallet-interface) を実装する必要があります。 Otherwise, the transfer is reverted.

Note that sending this transaction will charge the transaction fee to the transaction sender.

**パラメータ**

| 名前        | タイプ                                   | Description                                                                                            |
| --------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| sender    | 文字列                                   | 手当メカニズムで送信されるトークンを所有するアカウントのアドレス。                                                                      |
| 受信者       | 文字列                                   | トークンを受け取るアカウントのアドレス                                                                                    |
| 金額        | BigNumber &#124; string &#124; number | 転送するトークンの量                                                                                             |
| data      | バッファ &#124; 文字列 &#124; 番号             | (オプション) 通話とともに送信する任意のデータ。                                                                              |
| sendParam | object                                | (オプション) トランザクションを送信するための定義されたパラメータを持つオブジェクト。 sendParamについての詳細は、 [承認](#kip7-approve)のパラメータの説明を参照してください。 |

**注意** `amount` パラメータは `number` 型を受け付けますが、与えられた値が数値で上限された範囲外の場合。 AX_SAFE_INTEGER、予期しない結果やエラーが発生する可能性があります。 In this case, it is recommended to use the `BigNumber` type, especially for a `uint256` sized numeric input value.

**戻り値**

`Promise` returns `object` - The receipt containing the result of the transaction execution. If you want to know about the properties inside the receipt object, see the description of [getTransactionReceipt][]. KIP17 インスタンスからの領収書には、「logs」属性の代わりに、ABI を介して解析された「events」属性があります。

**例**

```javascript
// Send via a sendParam object with the from field given (without data)
> kip7.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 10000, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x0d641b9cebb032f10348288623898f8aa319faa0845c5b3b7a59ac397a6a218b',
    blocknumber: 2404,
    contractAddress: null,
    from: '0x090937f5c9b83d961da29149a3c37104bc5e71b3',
    ...
    status: true,
    to: '0xe4aeba6306b0df023aa4b765960fa59dbe925950',
...
    events: {
            Transfer: {
                    address: '0xe4AeBa6306b0Df023AA4b765960fA59dbE925950',
                    blocknumber: 2404,
                    transactionHash: '0xed8c33facaea963f57c268134aaab48fa765e7298fd70d4bc796b1e93c12ad45',
                    transactionIndex: 0,
                    blockHash: '0x0d641b9cebb032f10348288623898f8aa319faa0845c5b3b7a59ac397a6a218b',
                    logIndex: 0,
                    id: 'log_5eaef2c3',
                    returnValues: {
                            '0': '0xC2C84328845A36Fe0c4DcEf370d24ec80cF85221',
                            '1': '0x67B092d09B5e94fed58609777cc7Ac9193553B73',
                            '2': '10000',
                            from: '0xC2C84328845A36Fe0c4DcEf370d24ec80cF85221',
                            to: '0x67B092d09B5e94fed58609777cc7Ac9193553B73',
                            value: '10000',
                    },
                    event: 'Transfer',
                    signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
                    raw: {
                            data: '0x0000000000000000000000000000000000000000000000000000000000002710',
                            topics: [ '0xddf25...', '0x00...221', '0x00...b73' ],
                    },
            },
            Approval: {
                    address: '0xe4AeBa6306b0Df023AA4b765960fA59dbE925950',
                    blocknumber: 2404,
                    transactionHash: '0xed8c33facaea963f57c268134aaab48fa765e7298fd70d4bc796b1e93c12ad45',
                    transactionIndex: 0,
                    blockHash: '0x0d641b9cebb032f10348288623898f8aa319faa0845c5b3b7a59ac397a6a218b',
                    logIndex: 1,
                    id: 'log_3f3aedf8',
                    returnValues: {
                            '0': '0xC2C84328845A36Fe0c4DcEf370d24ec80cF85221',
                            '1': '0x090937f5C9B83d961da29149a3C37104Bc5e71B3',
                            '2': '0',
                            owner: '0xC2C84328845A36Fe0c4DcEf370d24ec80cF85221',
                            spender: '0x090937f5C9B83d961da29149a3C37104Bc5e71B3',
                            value: '0',
                    },
                    event: 'Approval',
                    signature: '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
                    raw: {
                            data: '0x0000000000000000000000000000000000000000000000000000000000000000',
                            topics: [ '0x8c5be...', '0x00...221', '0x00...1b3' ],
                    },
            },
    },
}

// Using FD transaction to execute the smart contract
> kip7.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 10000, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Send via a sendParam object with the from field given (with data)
> kip7.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 11, '0x1234', { from: '0x{address in hex}' }).then(console.log)

// Using kip7.options.from
// If the value of kip7.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7 instance.
> kip7.options.from = '0x{address in hex}'
> kip7.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 11).then(console.log)
```

## kip7.mint <a id="kip7-mint"></a>

```javascript
kip7.mint(account, amount [, sendParam])
```
トークンの `金額` を作成し、 `アカウント`に発行し、トークンの総供給量を増やします。

Note that this method will submit a transaction to the Klaytn network, which will charge the transaction fee to the sender.

**パラメータ**

| 名前        | タイプ                                   | Description                                                                                            |
| --------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| アカウント     | 文字列                                   | トークンが発行されるアカウントのアドレス。                                                                                  |
| 金額        | BigNumber &#124; string &#124; number | 発行するトークンの量。                                                                                            |
| sendParam | object                                | (オプション) トランザクションを送信するための定義されたパラメータを持つオブジェクト。 sendParamについての詳細は、 [承認](#kip7-approve)のパラメータの説明を参照してください。 |

**注意** `amount` パラメータは `number` 型を受け付けますが、与えられた値が数値で上限された範囲外の場合。 AX_SAFE_INTEGER、予期しない結果やエラーが発生する可能性があります。 In this case, it is recommended to use the `BigNumber` type, especially for a `uint256` sized numeric input value.

**注意** `sendParam.from` または `kip7.options.from` が与えられた場合は、MinterRole を使ったminter でなければなりません。

**戻り値**

`Promise` returns `object` - The receipt containing the result of the transaction execution. If you want to know about the properties inside the receipt object, see the description of [getTransactionReceipt][]. KIP7 インスタンスからの領収書には、'logs' 属性の代わりに 'events' 属性が ABI 経由で解析されます。

**例**

```javascript
// Send via a sendParam object with the from field given 
> kip7.mint('0x{address in hex}', 10000, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x71e1c7c9de471ed9eb9ec2aca09beb63a654e21514b2b8d25ec93f34b810a709',
    blocknumber: 8466,
    contractAddress: null,
    from: '0x2f7dc98bd93a0544b03d6ff428a6f4ae04b32676',
    ...
    status: true,
    to: '0x54e9ad10ffcbcc2384863157c851a75a31c1e925',
...
    events: {
        Transfer: {
            address: '0x54e9Ad10FFcBCc2384863157c851A75a31C1E925',
            blocknumber: 8466,
            transactionHash: '0xef1db1544d0ba70aa06b77599a8421cee2270703cff7d0233bd09ab3561ab49a',
            transactionIndex: 0,
            blockHash: '0x71e1c7c9de471ed9eb9ec2aca09beb63a654e21514b2b8d25ec93f34b810a709',
            logIndex: 0,
            id: 'log_151f8e90',
            returnValues: {
                '0': '0x0000000000000000000000000000000000000000',
                '1': '0x4756D3c2A3DC61450D949BD9bF702b4209Fc15a0',
                '2': '10000',
                from: '0x0000000000000000000000000000000000000000',
                to: '0x4756D3c2A3DC61450D949BD9bF702b4209Fc15a0',
                value: '10000',
            },
            event: 'Transfer',
            signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
            raw: {
                data: '0x0000000000000000000000000000000000000000000000000000000000002710',
                topics: [ '0xddf25...', '0x00...000', '0x00...5a0' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip7.mint('0x{address in hex}', 10000, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip7.options.from
// If the value of kip7.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7 instance.
> kip7.options.from = '0x{address in hex}'
> kip7.mint('0x{address in hex}', 10000).then(console.log)
```


## kip7.addMinter <a id="kip7-addminter"></a>

```javascript
kip7.addMinter(account [, sendParam])
```
Adds an account as a minter, who are permitted to mint tokens.

Note that this method will submit a transaction to the Klaytn network, which will charge the transaction fee to the sender.

**パラメータ**

| 名前        | タイプ    | Description                                                                                            |
| --------- | ------ | ------------------------------------------------------------------------------------------------------ |
| アカウント     | 文字列    | マイナーとして追加されるアカウントのアドレス。                                                                                |
| sendParam | object | (オプション) トランザクションを送信するための定義されたパラメータを持つオブジェクト。 sendParamについての詳細は、 [承認](#kip7-approve)のパラメータの説明を参照してください。 |

**注意** `sendParam.from` または `kip7.options.from` が指定された場合は、minter でなければなりません。

**戻り値**

`Promise` returns `object` - The receipt containing the result of the transaction execution. If you want to know about the properties inside the receipt object, see the description of [getTransactionReceipt][]. KIP7 インスタンスからの領収書には、'logs' 属性の代わりに 'events' 属性が ABI 経由で解析されます。

**例**

```javascript
// Send via a sendParam object with the from field given 
> kip7.addMinter('0x{address in hex}', { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x169db7e80c954f7d95bbb6a5ef3065190e842d515485e1679f8f3027d1b2975f',
    blocknumber: 9593,
    contractAddress: null,
    from: '0x2f7dc98bd93a0544b03d6ff428a6f4ae04b32676',
    ...
    status: true,
    to: '0x9e2851aff794e69c58e112a3beacbf0de6587f6b',
...
    events: {
        MinterAdded: {
            address: '0x9E2851Aff794E69C58E112a3beacbF0De6587f6b',
            blocknumber: 9593,
            transactionHash: '0x11c86fe739ce3f8e6f93f5de87c9626c7cd032dd5e119171f9ec821292cd68e9',
            transactionIndex: 0,
            blockHash: '0x169db7e80c954f7d95bbb6a5ef3065190e842d515485e1679f8f3027d1b2975f',
            logIndex: 0,
            id: 'log_d93efbcd',
            returnValues: {
                '0': '0x823EA6Eb41985218D478C07E77cFBdAd233569C5',
                account: '0x823EA6Eb41985218D478C07E77cFBdAd233569C5',
            },
            event: 'MinterAdded',
            signature: '0x6ae172837ea30b801fbfcdd4108aa1d5bf8ff775444fd70256b44e6bf3dfc3f6',
            raw: {
                data: '0x',
                topics: [ '0x6ae17...', '0x00...9c5' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip7.addMinter('0x{address in hex}', {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip7.options.from
// If the value of kip7.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7 instance.
> kip7.options.from = '0x{address in hex}'
> kip7.addMinter('0x{address in hex}').then(console.log)
```


## kip7.renounceMinter <a id="kip7-renounceminter"></a>

```javascript
kip7.renounceMinter([sendParam])
```
Renounces the right to mint tokens. Only a minter address can renounce the minting right.

Note that this method will submit a transaction to the Klaytn network, which will charge the transaction fee to the sender.

**パラメータ**

| 名前        | タイプ    | Description                                                                                            |
| --------- | ------ | ------------------------------------------------------------------------------------------------------ |
| sendParam | object | (オプション) トランザクションを送信するための定義されたパラメータを持つオブジェクト。 sendParamについての詳細は、 [承認](#kip7-approve)のパラメータの説明を参照してください。 |

**注意** `sendParam.from` または `kip7.options.from` が与えられた場合は、MinterRole を使ったminter でなければなりません。

**戻り値**

`Promise` returns `object` - The receipt containing the result of the transaction execution. If you want to know about the properties inside the receipt object, see the description of [getTransactionReceipt][]. KIP7 インスタンスからの領収書には、'logs' 属性の代わりに 'events' 属性が ABI 経由で解析されます。

**例**

```javascript
// Send via a sendParam object with the from field given 
> kip7.renounceMinter({ from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xc1d96a519d9a31a1dab77111af0de73241aa212722859062a96dc3115a2eca23',
    blocknumber: 9996,
    contractAddress: null,
    from: '0x34b91db0f4c7d1381fdf054cc3d0c433b19fca16',
    ...
    status: true,
    to: '0xeba808dcd0fdbfc21a99961be42665f351487f52',
...
    events: {
        MinterRemoved: {
            address: '0xebA808dCD0Fdbfc21a99961BE42665f351487F52',
            blocknumber: 9996,
            transactionHash: '0x52328e3cfb8061915d000dc308ffd67650fa36cf4560f1fb12fdb28a7c903ac9',
            transactionIndex: 0,
            blockHash: '0xc1d96a519d9a31a1dab77111af0de73241aa212722859062a96dc3115a2eca23',
            logIndex: 0,
            id: 'log_bd3a8e46',
            returnValues: {
                '0': '0x34b91Db0F4c7D1381FdF054cc3D0c433B19fCa16',
                account: '0x34b91Db0F4c7D1381FdF054cc3D0c433B19fCa16',
            },
            event: 'MinterRemoved',
            signature: '0xe94479a9f7e1952cc78f2d6baab678adc1b772d936c6583def489e524cb66692',
            raw: {
                data: '0x',
                topics: [ '0xe9447...', '0x00...a16' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip7.renounceMinter({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip7.options.from
// If the value of kip7.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7 instance.
> kip7.options.from = '0x{address in hex}'
> kip7.renounceMinter().then(console.log)
```


## kip7.burn <a id="kip7-burn"></a>

```javascript
kip7.burn(amount [, sendParam])
```
送信者の残高内のトークンの `金額` を削除します。 `sendParam.from` または `kip7.options.from` が指定されていない場合、エラーが発生します。

Note that this method will submit a transaction to the Klaytn network, which will charge the transaction fee to the sender.

**パラメータ**

| 名前        | タイプ                                   | Description                                                                                            |
| --------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| 金額        | BigNumber &#124; string &#124; number | 破棄するトークンの量。                                                                                            |
| sendParam | object                                | (オプション) トランザクションを送信するための定義されたパラメータを持つオブジェクト。 sendParamについての詳細は、 [承認](#kip7-approve)のパラメータの説明を参照してください。 |

**注意** `amount` パラメータは `number` 型を受け付けますが、与えられた値が数値で上限された範囲外の場合。 AX_SAFE_INTEGER、予期しない結果やエラーが発生する可能性があります。 In this case, it is recommended to use the `BigNumber` type, especially for a `uint256` sized numeric input value.

**戻り値**

`Promise` returns `object` - The receipt containing the result of the transaction execution. If you want to know about the properties inside the receipt object, see the description of [getTransactionReceipt][]. KIP7 インスタンスからの領収書には、'logs' 属性の代わりに 'events' 属性が ABI 経由で解析されます。

**例**

```javascript
// Send via a sendParam object with the from field given 
> kip7.burn(1000, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x7cf9e982510d17a2fd5fca3e7a6f9ce5a25a9da6ba81d51b33129fb7fb93e0ae',
    blocknumber: 10495,
    contractAddress: null,
    from: '0x2f7dc98bd93a0544b03d6ff428a6f4ae04b32676',
    ...
    status: true,
    to: '0x0f681dbc120d9d3be997565626cd87f049f5c405',
...
    events: {
        Transfer: {
            address: '0x0f681Dbc120D9d3BE997565626CD87F049f5C405',
            blocknumber: 10495,
            transactionHash: '0x4f2de0b4310c40eeef20ae8e8d129d209195975792de86e1cd00f2345789c9f7',
            transactionIndex: 0,
            blockHash: '0x7cf9e982510d17a2fd5fca3e7a6f9ce5a25a9da6ba81d51b33129fb7fb93e0ae',
            logIndex: 0,
            id: 'log_20f6c253',
            returnValues: {
                '0': '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
                '1': '0x0000000000000000000000000000000000000000',
                '2': '1000',
                from: '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
                to: '0x0000000000000000000000000000000000000000',
                value: '1000',
            },
            event: 'Transfer',
            signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
            raw: {
                data: '0x00000000000000000000000000000000000000000000000000000000000003e8',
                topics: [ '0xddf25...', '0x00...676', '0x00...000' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip7.burn(1000, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip7.options.from
// If the value of kip7.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7 instance.
> kip7.options.from = '0x{address in hex}'
> kip7.burn(1000).then(console.log)
```


## kip7.burnFrom <a id="kip7-burnfrom"></a>

```javascript
kip7.burnFrom(account, amount [, sendParam])
```
`アカウント` から指定されたトークン数を破壊します。 `sendParam.from` または `kip7.options.from` で指定された送信者の引当金は、 `アカウント` の残高とともに引き下げられます。

Note that this method will submit a transaction to the Klaytn network, which will charge the transaction fee to the sender.

**パラメータ**

| 名前        | タイプ                                   | Description                                                                                            |
| --------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| アカウント     | 文字列                                   | 手当メカニズムで書き込まれるトークンを所有するアカウントのアドレス。                                                                     |
| 金額        | BigNumber &#124; string &#124; number | 破棄するトークンの量。                                                                                            |
| sendParam | object                                | (オプション) トランザクションを送信するための定義されたパラメータを持つオブジェクト。 sendParamについての詳細は、 [承認](#kip7-approve)のパラメータの説明を参照してください。 |

**注意** `amount` パラメータは `number` 型を受け付けますが、与えられた値が数値で上限された範囲外の場合。 AX_SAFE_INTEGER、予期しない結果やエラーが発生する可能性があります。 In this case, it is recommended to use the `BigNumber` type, especially for a `uint256` sized numeric input value.

**戻り値**

`Promise` returns `object` - The receipt containing the result of the transaction execution. If you want to know about the properties inside the receipt object, see the description of [getTransactionReceipt][]. KIP7 インスタンスからの領収書には、'logs' 属性の代わりに 'events' 属性が ABI 経由で解析されます。

**例**

```javascript
// Send via a sendParam object with the from field given 
> kip7.burnFrom('0x{address in hex}', 1000, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xcd9f3d00856a056e54697cde2621d8af779c11378c422700510d6ebf65bea0a8',
    blocknumber: 11371,
    contractAddress: null,
    from: '0x1b7bdfcfb0008d0c958da13f2dc30388271e9ef0',
    ...
    status: true,
    to: '0x50fafa2b059d26c47d26c35ccb3cd3b856ecc852',
...
    events: {
        Transfer: {
            address: '0x50fAFa2B059d26C47D26c35Ccb3Cd3b856Ecc852',
            blocknumber: 11371,
            transactionHash: '0xed37eafc35272bd7c45695b4b94c578c681a1800b1612ca82d0e4e595e947f27',
            transactionIndex: 0,
            blockHash: '0xcd9f3d00856a056e54697cde2621d8af779c11378c422700510d6ebf65bea0a8',
            logIndex: 0,
            id: 'log_a7263788',
            returnValues: {
                '0': '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
                '1': '0x0000000000000000000000000000000000000000',
                '2': '10000',
                from: '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
                to: '0x0000000000000000000000000000000000000000',
                value: '10000',
            },
            event: 'Transfer',
            signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
            raw: {
                data: '0x0000000000000000000000000000000000000000000000000000000000002710',
                topics: [ '0xddf25...', '0x00...676', '0x00...000' ],
            },
        },
        Approval: {
            address: '0x50fAFa2B059d26C47D26c35Ccb3Cd3b856Ecc852',
            blocknumber: 11371,
            transactionHash: '0xed37eafc35272bd7c45695b4b94c578c681a1800b1612ca82d0e4e595e947f27',
            transactionIndex: 0,
            blockHash: '0xcd9f3d00856a056e54697cde2621d8af779c11378c422700510d6ebf65bea0a8',
            logIndex: 1,
            id: 'log_4ca1aac4',
            returnValues: {
                '0': '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
                '1': '0x1B7BdfCFb0008D0C958dA13F2dc30388271E9eF0',
                '2': '0',
                owner: '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
                spender: '0x1B7BdfCFb0008D0C958dA13F2dc30388271E9eF0',
                value: '0',
            },
            event: 'Approval',
            signature: '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
            raw: {
                data: '0x0000000000000000000000000000000000000000000000000000000000000000',
                topics: [ '0x8c5be...', '0x00...676', '0x00...ef0' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip7.burnFrom('0x{address in hex}', 1000, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip7.options.from
// If the value of kip7.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7 instance.
> kip7.options.from = '0x{address in hex}'
> kip7.burnFrom('0x{address in hex}', 1000).then(console.log)
```


## kip7.addPauser <a id="kip7-addpauser"></a>

```javascript
kip7.addPauser(account [, sendParam])
```
Adds an account as a pauser that has the right to suspend the contract.

Note that this method will submit a transaction to the Klaytn network, which will charge the transaction fee to the sender.

**パラメータ**

| 名前        | タイプ    | Description                                                                                            |
| --------- | ------ | ------------------------------------------------------------------------------------------------------ |
| アカウント     | 文字列    | 新しいポーザルにするアカウントのアドレス                                                                                   |
| sendParam | object | (オプション) トランザクションを送信するための定義されたパラメータを持つオブジェクト。 sendParamについての詳細は、 [承認](#kip7-approve)のパラメータの説明を参照してください。 |

**注意** `sendParam.from` または `kip7.options.from` が与えられた場合は、PauserRole を持つpauser である必要があります。

**戻り値**

`Promise` returns `object` - The receipt containing the result of the transaction execution. If you want to know about the properties inside the receipt object, see the description of [getTransactionReceipt][]. KIP7 インスタンスからの領収書には、'logs' 属性の代わりに 'events' 属性が ABI 経由で解析されます。

**例**

```javascript
// Send via a sendParam object with the from field given 
> kip7.addPauser('0x{address in hex}', { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x14bcefa90f95f5db03ed9c43a77ae910b57960f4f44c786e3a650a8ad163f67a',
    blocknumber: 16524,
    contractAddress: null,
    from: '0x2f7dc98bd93a0544b03d6ff428a6f4ae04b32676',
    ...
    status: true,
    to: '0x31fee792a85ff4d714f47a151975b4979cb47308',
...
    events: {
        PauserAdded: {
            address: '0x31fee792A85ff4D714F47A151975b4979CB47308',
            blocknumber: 16524,
            transactionHash: '0x9bd0cba9f5fdc3fdae4b9f40f46f11bf42314ca2518724e78be266d46a8a9f96',
            transactionIndex: 0,
            blockHash: '0x14bcefa90f95f5db03ed9c43a77ae910b57960f4f44c786e3a650a8ad163f67a',
            logIndex: 0,
            id: 'log_d847b043',
            returnValues: {
                '0': '0x6610B93bAE66F89716C3b010ad39DF476Da9234b',
                account: '0x6610B93bAE66F89716C3b010ad39DF476Da9234b',
            },
            event: 'PauserAdded',
            signature: '0x6719d08c1888103bea251a4ed56406bd0c3e69723c8a1686e017e7bbe159b6f8',
            raw: {
                data: '0x',
                topics: [ '0x6719d...', '0x00...34b' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip7.addPauser('0x{address in hex}', {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip7.options.from
// If the value of kip7.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7 instance.
> kip7.options.from = '0x{address in hex}'
> kip7.addPauser('0x{address in hex}').then(console.log)
```


## kip7.renouncePauser <a id="kip7-renouncepauser"></a>

```javascript
kip7.renouncePauser([sendParam])
```
Renounces the right to pause the contract. Only a pauser address can renounce the pausing right.

Note that this method will submit a transaction to the Klaytn network, which will charge the transaction fee to the sender.

**パラメータ**

| 名前        | タイプ    | Description                                                                                            |
| --------- | ------ | ------------------------------------------------------------------------------------------------------ |
| sendParam | object | (オプション) トランザクションを送信するための定義されたパラメータを持つオブジェクト。 sendParamについての詳細は、 [承認](#kip7-approve)のパラメータの説明を参照してください。 |

**注意** `sendParam.from` または `kip7.options.from` が与えられた場合は、PauserRole を持つpauser である必要があります。

**戻り値**

`Promise` returns `object` - The receipt containing the result of the transaction execution. If you want to know about the properties inside the receipt object, see the description of [getTransactionReceipt][]. KIP7 インスタンスからの領収書には、'logs' 属性の代わりに 'events' 属性が ABI 経由で解析されます。

**例**

```javascript
// Send via a sendParam object with the from field given 
> kip7.renouncePauser({ from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xc0b1b4914ddc8d74e8034fe86ede1b5b88a2c16ee4d678e58fac325c589713f6',
    blocknumber: 16567,
    contractAddress: null,
    from: '0x5934a0c01baa98f3457981b8f5ce6e52ac585578',
    ...
    status: true,
    to: '0x31fee792a85ff4d714f47a151975b4979cb47308',
...
    events: {
        PauserRemoved: {
            address: '0x31fee792A85ff4D714F47A151975b4979CB47308',
            blocknumber: 16567,
            transactionHash: '0xefc93382f5609531dd16f644cf6a3b8e086c623a9fb8038984662f7260482df6',
            transactionIndex: 0,
            blockHash: '0xc0b1b4914ddc8d74e8034fe86ede1b5b88a2c16ee4d678e58fac325c589713f6',
            logIndex: 0,
            id: 'log_e9518d2f',
            returnValues: {
                '0': '0x5934a0c01baA98F3457981b8f5ce6E52ac585578',
                account: '0x5934a0c01baA98F3457981b8f5ce6E52ac585578',
            },
            event: 'PauserRemoved',
            signature: '0xcd265ebaf09df2871cc7bd4133404a235ba12eff2041bb89d9c714a2621c7c7e',
            raw: {
                data: '0x',
                topics: [ '0xcd265...', '0x00...578' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip7.renouncePauser({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip7.options.from
// If the value of kip7.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7 instance.
> kip7.options.from = '0x{address in hex}'
> kip7.renouncePauser().then(console.log)
```


## kip7.pause <a id="kip7-pause"></a>

```javascript
kip7.pause([sendParam])
```
Suspends functions related to sending tokens.

Note that this method will submit a transaction to the Klaytn network, which will charge the transaction fee to the sender.

**パラメータ**

| 名前        | タイプ    | Description                                                                                            |
| --------- | ------ | ------------------------------------------------------------------------------------------------------ |
| sendParam | object | (オプション) トランザクションを送信するための定義されたパラメータを持つオブジェクト。 sendParamについての詳細は、 [承認](#kip7-approve)のパラメータの説明を参照してください。 |

**注意** `sendParam.from` または `kip7.options.from` が与えられた場合は、PauserRole を持つpauser である必要があります。

**戻り値**

`Promise` returns `object` - The receipt containing the result of the transaction execution. If you want to know about the properties inside the receipt object, see the description of [getTransactionReceipt][]. KIP7 インスタンスからの領収書には、'logs' 属性の代わりに 'events' 属性が ABI 経由で解析されます。

**例**

```javascript
// Send via a sendParam object with the from field given 
> kip7.pause({ from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xcd5e787e738a6197df871f0d651f2a9149d5ed03fdf62e918c4eed03003ea539',
    blocknumber: 18218,
    contractAddress: null,
    from: '0x2f7dc98bd93a0544b03d6ff428a6f4ae04b32676',
    ...
    status: true,
    to: '0xfc83abf47d232739dab9610c46b3f10c8022b3ef',
...
    events: {
        Paused: {
            address: '0xFc83ABF47d232739dAb9610C46B3F10C8022b3eF',
            blocknumber: 18218,
            transactionHash: '0x0e660b8c49e8212a69f2d68324e105b4295b534d22ac0b70263d3e54d429d1bb',
            transactionIndex: 0,
            blockHash: '0xcd5e787e738a6197df871f0d651f2a9149d5ed03fdf62e918c4eed03003ea539',
            logIndex: 0,
            id: 'log_2ab0db96',
            returnValues: {
                '0': '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
                account: '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
            },
            event: 'Paused',
            signature: '0x62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258',
            raw: {
                data: '0x0000000000000000000000002f7dc98bd93a0544b03d6ff428a6f4ae04b32676',
                topics: ['0x62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258'],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip7.pause({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip7.options.from
// If the value of kip7.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7 instance.
> kip7.options.from = '0x{address in hex}'
> kip7.pause().then(console.log)
```


## kip7.unpause <a id="kip7-unpause"></a>

```javascript
kip7.unpause([sendParam])
```
Resumes the paused contract.

Note that this method will submit a transaction to the Klaytn network, which will charge the transaction fee to the sender.

**パラメータ**

| 名前        | タイプ    | Description                                                                                            |
| --------- | ------ | ------------------------------------------------------------------------------------------------------ |
| sendParam | object | (オプション) トランザクションを送信するための定義されたパラメータを持つオブジェクト。 sendParamについての詳細は、 [承認](#kip7-approve)のパラメータの説明を参照してください。 |

**注意** `sendParam.from` または `kip7.options.from` が与えられた場合は、PauserRole を持つpauser である必要があります。

**戻り値**

`Promise` returns `object` - The receipt containing the result of the transaction execution. If you want to know about the properties inside the receipt object, see the description of [getTransactionReceipt][]. KIP7 インスタンスからの領収書には、'logs' 属性の代わりに 'events' 属性が ABI 経由で解析されます。

**例**

```javascript
// Send via a sendParam object with the from field given 
> kip7.unpause({ from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xa45194ba608a0a00152f974fb1388ced326522979f4b8f19c3fab3083f1339ac',
    blocknumber: 18239,
    contractAddress: null,
    from: '0x2f7dc98bd93a0544b03d6ff428a6f4ae04b32676',
    ...
    status: true,
    to: '0xfc83abf47d232739dab9610c46b3f10c8022b3ef',
...
    events: {
        Unpaused: {
            address: '0xFc83ABF47d232739dAb9610C46B3F10C8022b3eF',
            blocknumber: 18239,
            transactionHash: '0x449dff9d7970bfe326091516ebb22aeaefb0bda59bc4e2577467618863e36c99',
            transactionIndex: 0,
            blockHash: '0xa45194ba608a0a00152f974fb1388ced326522979f4b8f19c3fab3083f1339ac',
            logIndex: 0,
            id: 'log_9c5a3823',
            returnValues: {
                '0': '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
                account: '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
            },
            event: 'Unpaused',
            signature: '0x5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa',
            raw: {
                data: '0x0000000000000000000000002f7dc98bd93a0544b03d6ff428a6f4ae04b32676',
                topics: ['0x5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa'],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip7.unpause({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip7.options.from
// If the value of kip7.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7 instance.
> kip7.options.from = '0x{address in hex}'
> kip7.unpause().then(console.log)
```

[getTransactionReceipt]: ../caver.rpc/klay.md#caver-rpc-klay-gettransactionreceipt
