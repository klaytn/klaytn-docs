# caver.contract

`caver.contract` オブジェクトを使用すると、Klaytn ブロックチェーンプラットフォーム上のスマートコントラクトと簡単にやり取りできます。 新しいコントラクトオブジェクトを作成するとき。 そのスマートコントラクトと caver-js には、JSON インターフェイスを提供する必要があります。これにより、javascript 内のコントラクトオブジェクトを使用したすべてのコールが自動的にRPC経由で低レベルの ABI コールに変換されます。

これにより、JavaScript オブジェクトであるかのようにスマートコントラクトとやり取りできます。

## caver.contract.create <a href="#caver-contract-create" id="caver-contract-create"></a>

```javascript
caver.contract.create(jsonInterface [, address] [, options])
```

JSON インターフェイスオブジェクトで定義されているすべてのメソッドとイベントを使用して、新しいコントラクトインスタンスを作成します。 この関数は、 [new caver.contract](caver.contract.md#new-contract) と同じように動作します。

**注意** `caver.contract.create` は caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) からサポートされています。

**パラメータ**

[new caver.contract](caver.contract.md#new-contract) を参照してください。

**戻り値**

[new caver.contract](caver.contract.md#new-contract) を参照してください。

**例**

```javascript
const contract = caver.contract.create([
    {
        constant: true,
        inputs: [{ name: 'interfaceId', type: 'bytes4' }],
        name: 'supportsInterface',
        outputs: [{ name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    ...
  ]、'0x{address in hex}')
```

## caver.contract <a href="#new-contract" id="new-contract"></a>

```javascript
new caver.contract(jsonInterface [, address] [, options])
```

JSON インターフェイスオブジェクトで定義されているすべてのメソッドとイベントを使用して、新しいコントラクトインスタンスを作成します。

**パラメータ**

| 名前            | タイプ    | Description                                                            |
| ------------- | ------ | ---------------------------------------------------------------------- |
| jsonInterface | object | インスタンス化するコントラクトの JSON インターフェイス                                         |
| address       | 文字列    | (オプション) 通話するスマートコントラクトのアドレス。 `myContract.options.address = '0x1234..'` |
| オプション         | object | (オプション) 契約のオプション。 詳細は以下の表をご覧ください。                                      |

options オブジェクトには次のものが含まれています。

| 名前            | タイプ     | Description                                                                                                                                         |
| ------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| from          | 文字列     | (オプション) トランザクションを行うべきアドレス。                                                                                                                          |
| gasPrice      | 文字列     | (オプション) 取引に使用するペブ内のガス価格。                                                                                                                            |
| ガス            | 数値      | (オプション) 取引に提供される最大ガス(ガス制限)。                                                                                                                         |
| data          | 文字列     | (オプション) コントラクトのバイトコード。 コントラクトがデプロイされるときに使用されます。                                                                                                     |
| feeDelegation | boolean | (オプション) 手数料委譲トランザクションを使用するかどうか。                                                                                                                     |
| feePayer      | 文字列     | (オプション) 取引手数料を支払う手数料支払者の住所。 `feeDelegation` が `true`の場合、この値はトランザクションの `feePayer` フィールドに設定されます。                                                      |
| 手数料比          | 文字列     | (オプション) 手数料支払者が負担する取引手数料の割合。 `feeDelegation` が `true` で、 `feeRatio` が有効な値に設定されている場合、部分的な手数料委任トランザクションが使用されます。 有効範囲は1~99です。 0、または100以上の比率は許可されていません。 |

**戻り値**

| タイプ    | Description                   |
| ------ | ----------------------------- |
| object | すべてのメソッドとイベントを持つコントラクトインスタンス。 |

**例**

```javascript
const myContract = new caver.contract([...], '0x{address in hex}', { gasPrice: '25000000000' })
```

## myContract.options <a href="#mycontract-options" id="mycontract-options"></a>

```javascript
myContract.options
```

コントラクトインスタンスの `オプション` オブジェクト。 `from`, `gas`, `gasPrice`, `feePayer` and `feeRatio` are used as fallback values when sending transactions.

**プロパティー**

| 名前            | タイプ     | Description                                                                                                                                         |
| ------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| address       | 文字列     | コントラクトがデプロイされているアドレス。                                                                                                                               |
| jsonInterface | 行列      | コントラクトの JSON インターフェイス。                                                                                                                              |
| from          | 文字列     | コントラクトのデプロイ/実行トランザクションが送信されるデフォルトのアドレス。 トランザクションを作成する際に、 `の` アドレスが定義されていない場合、この `myContract.options.from` は常にトランザクションを作成するために使用されます。                |
| gasPrice      | 文字列     | 取引に使用するペブ内のガス価格。                                                                                                                                    |
| ガス            | 数値      | 取引に提供される最大ガス (ガス限度)。                                                                                                                                |
| data          | 文字列     | 契約のバイトコード コントラクトがデプロイされるときに使用されます。                                                                                                                  |
| feeDelegation | boolean | (オプション) 手数料委譲トランザクションを使用するかどうか。                                                                                                                     |
| feePayer      | 文字列     | (オプション) 取引手数料を支払う手数料支払者の住所。 `feeDelegation` が `true`の場合、この値はトランザクションの `feePayer` フィールドに設定されます。                                                      |
| 手数料比          | 文字列     | (オプション) 手数料支払者が負担する取引手数料の割合。 `feeDelegation` が `true` で、 `feeRatio` が有効な値に設定されている場合、部分的な手数料委任トランザクションが使用されます。 有効範囲は1~99です。 0、または100以上の比率は許可されていません。 |

**注意** `feeDelegation`, `feePayer` と `feeRatio` は caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) からサポートされています。

**例**

```javascript
> myContract.options
{
  address: [Getter/Setter],
  jsonInterface: [Getter/Setter],
  from: [Getter/Setter],
  feePayer: [Getter/Setter],
  feeDelegation: [Getter/Setter],
  feeRatio: [Getter/Setter],
  gasPrice: [Getter/Setter],
  gas: [Getter/Setter],
  data: [Getter/Setter]
}

> myContract.options.from = '0x1234567890123456789012345678901234567891' // default from address
> myContract.options.gasPrice = '25000000000000' // default gas price in peb
> myContract.options.gas = 5000000 // provide as fallback always 5M gas
> myContract.options.feeDelegation = true // use fee delegation transaction
> myContract.options.feePayer = '0x1234567890123456789012345678901234567891' // default fee payer address
> myContract.options.feeRatio = 20 // default fee ratio when send partial fee delegation transaction
```

## myContract.options.address <a href="#mycontract-options-address" id="mycontract-options-address"></a>

```javascript
myContract.options.address
```

このコントラクトインスタンスに使用されるアドレス `myContract`. この契約からcaver-jsによって生成されたすべてのトランザクションは、トランザクションの `〜` としてこのアドレスを含みます。

**属性**

| 名前      | タイプ    | Description                                                            |
| ------- | ------ | ---------------------------------------------------------------------- |
| address | 文字列 \ | `null` | The address for this contract or `null` if it is not yet set. |

**例**

```javascript
>  myContract.options.address
'0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae'

// コントラクトアドレスを設定
>  myContract.options.address = '0x1234FFDD...'
```

## myContract.options.jsonInterface <a href="#mycontract-options-jsoninterface" id="mycontract-options-jsoninterface"></a>

```javascript
myContract.options.jsonInterface
```

この契約 `myContract` の ABI から派生した JSON インターフェイスオブジェクト。

**属性**

| 名前            | タイプ | Description                                                        |
| ------------- | --- | ------------------------------------------------------------------ |
| jsonInterface | 行列  | このコントラクトの JSON インターフェイス。 これを再設定すると、コントラクトインスタンスのメソッドとイベントが再生成されます。 |

**例**

```javascript
> myContract.options.jsonInterface
[
  {
    constant: true,
    inputs: [ { name: 'interfaceId', type: 'bytes4' } ],
    name: 'supportsInterface',
    outputs: [ { name: '', type: 'bool' } ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
    signature: '0x01ffc9a7',
  },
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
    signature: '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
  },
]

// set a new jsonInterface
> myContract.options.jsonInterface = [...]
```

## myContract.clone <a href="#mycontract-clone" id="mycontract-clone"></a>

```javascript
myContract.clone([contractAddress])
```

現在のコントラクトインスタンスを複製します。

**パラメータ**

| 名前         | タイプ | Description                                                                       |
| ---------- | --- | --------------------------------------------------------------------------------- |
| コントラクトアドレス | 文字列 | (オプション) 新規契約の住所。 省略された場合、元のインスタンス内のアドレスに設定されます (例: `myContract.options.address`)。 |

**戻り値**

| タイプ    | Description        |
| ------ | ------------------ |
| object | 新しい複製コントラクトインスタンス。 |

**例**

```javascript
> myContract.clone()
Contract {
  currentProvider: [Getter/Setter],
...
  _keyrings: KeyringContainer { ... }
}
```

## myContract.deploy <a href="#mycontract-deploy2" id="mycontract-deploy2"></a>

```javascript
myContract.deploy(options, byteCode [, param1 [, param2 [, ...]]])
```

コントラクトを Klaytn ネットワークにデプロイします。 デプロイが正常に完了すると、Promiseは新しいコントラクトインスタンスで解決されます。 既存の [myContract.deploy](caver.contract.md#mycontract-deploy) 関数のユーザビリティとは異なり、この関数はトランザクションを Klaytn ネットワークに直接送信します。 返されるオブジェクトで `send()` を呼び出す必要はありません。

**NOTE** `caver.wallet` must contains keyring instances corresponding to `from` and `feePayer` in `options` or `myContract.options` to make signatures.

**注意** `myContract.deploy` は caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) からサポートされています。

**パラメータ**

| 名前       | タイプ    | Description                                                                                           |
| -------- | ------ | ----------------------------------------------------------------------------------------------------- |
| オプション    | object | 送信に使用するオプション 詳細は [methods.methodName.send](caver.contract.md#methods-methodname-send) のテーブルを参照してください。 |
| byteCode | 文字列    | 契約のバイトコード                                                                                             |
| パラメータ    | 混在しました | (オプション) デプロイ時にコンストラクタに渡されるパラメータ。                                                                      |

**戻り値**

`Promise` が `PromiEvent`を返す。Promiseは新しいコントラクトインスタンスで解決されます。

| タイプ        | Description                                                                                                                 |
| ---------- | --------------------------------------------------------------------------------------------------------------------------- |
| PromiEvent | Promise複合イベントエミッター。 これは、取引の領収書が利用可能であるときに解決されます。 `send()` が `myContract.deploy()`から呼び出された場合、promiseは新しいコントラクトインスタンスで解決されます。 |

PromiEvent の場合、次のイベントを使用できます。

* `transactionHash`: トランザクションが送信され、トランザクションハッシュが利用可能になった直後に発生します。 その型は `文字列` です。
* `領収書`: 領収書が入手可能な場合に発行されます。 詳細は [caver.rpc.klay.getTransactionReceipt](caver.rpc/klay.md#caver-rpc-klay-gettransactionreceipt) を参照してください。 その型は `オブジェクト` です。
* `error`: 送信中にエラーが発生した場合に発生します。 ガス欠エラーでは、2 番目のパラメータはレシートです。 その型は `エラー` です。

**例**

```javascript
// Deploy a smart contract without constructor arguments
> myContract.deploy({
      from: '0x{address in hex}',
      gas: 1500000,
  }, '0x{byte code}')
  .on('error', function(error) { ... })
  .on('transactionHash', function(transactionHash) { ... })
  .on('receipt', function(receipt) {
     console.log(receipt.contractAddress) // contains the new contract address
   })
  .then(function(newContractInstance) {
      console.log(newContractInstance.options.address) // instance with the new contract address
  })

// Deploy a smart contract with constructor arguments
> myContract.deploy({
      from: '0x{address in hex}',
      gas: 1500000,
  }, '0x{byte code}', 'keyString', ...)
  .on('error', function(error) { ... })
  .on('transactionHash', function(transactionHash) { ... })
  .on('receipt', function(receipt) {
     console.log(receipt.contractAddress) 
   })
  .then(function(newContractInstance) {
      console.log(newContractInstance.options.address)
  })

// Deploy a smart contract with fee delegation transaction (TxTypeFeeDelegatedSmartContractDeploy)
> myContract.deploy({
      from: '0x{address in hex}',
      feeDelegation: true,
      feePayer: '0x{address in hex}',
      gas: 1500000,
  }, '0x{byte code}')
  .on('error', function(error) { ... })
  .on('transactionHash', function(transactionHash) { ... })
  .on('receipt', function(receipt) {
     console.log(receipt.contractAddress)
   })
  .then(function(newContractInstance) {
      console.log(newContractInstance.options.address)
  })

// Deploy a smart contract with partial fee delegation transaction (TxTypeFeeDelegatedSmartContractDeployWithRatio)
> myContract.deploy({
      from: '0x{address in hex}',
      feeDelegation: true,
      feePayer: '0x{address in hex}',
      feeRatio: 30,
      gas: 1500000,
  }, '0x{byte code}')
  .on('error', function(error) { ... })
  .on('transactionHash', function(transactionHash) { ... })
  .on('receipt', function(receipt) {
     console.log(receipt.contractAddress)
   })
  .then(function(newContractInstance) {
      console.log(newContractInstance.options.address)
  })
```

## myContract.deploy <a href="#mycontract-deploy" id="mycontract-deploy"></a>

```javascript
myContract.deploy(options)
```

スマートコントラクトを Klaytn にデプロイするときに使用されるオブジェクトを返します。 `myContract.deploy({ data, arguments }).send(options)` を呼び出すことで、スマートコントラクトデプロイトランザクションを送信できます。 デプロイが正常に完了すると、Promiseは新しいコントラクトインスタンスで解決されます。

**パラメータ**

| 名前    | タイプ    | Description                                     |
| ----- | ------ | ----------------------------------------------- |
| オプション | object | デプロイに使用される options オブジェクト。 詳細については、以下の表をご覧ください。 |

optionsオブジェクトには以下を含めることができます:

| 名前   | タイプ | Description                   |
| ---- | --- | ----------------------------- |
| data | 文字列 | 契約のバイトコード                     |
| 引数   | 行列  | (オプション) デプロイ時にコンストラクタに渡される引数。 |

**戻り値**

| タイプ    | Description                                      |
| ------ | ------------------------------------------------ |
| object | コントラクト配布の引数と関数が定義されたオブジェクト。 詳細については、以下の表をご覧ください。 |

オブジェクトには次のものが含まれています:

| 名前                                                                    | タイプ | Description                                                                     |
| --------------------------------------------------------------------- | --- | ------------------------------------------------------------------------------- |
| 引数                                                                    | 行列  | `options.arguments` で渡される引数。                                                    |
| [送信](caver.contract.md#methods-methodname-send)                       | 関数  | コントラクトをKlaytnにデプロイする関数。 この関数の結果としての Promise は、新しいコントラクトインスタンスで解決されます。           |
| [sign](caver.contract.md#methods-methodname-sign)                     | 関数  | 送信者としてスマートコントラクトデプロイトランザクションに署名する機能。 sign関数は署名されたトランザクションを返します。                 |
| [signAsFeePayer](caver.contract.md#methods-methodname-signasfeepayer) | 関数  | 手数料支払者としてスマートコントラクトデプロイトランザクションに署名する機能。 signAsFeePayer 関数は署名されたトランザクションを返します。   |
| [推定ガス](caver.contract.md#methods-methodname-estimategas)              | 関数  | 展開に使用されるガスを推定する機能。 この関数の実行はコントラクトをデプロイしません。                                     |
| [encodeABI](caver.contract.md#methods-methodname-encodeabi)           | 関数  | デプロイメントの ABI をエンコードする関数、つまりコントラクトデータ + コンストラクタパラメータです。 この関数の実行はコントラクトをデプロイしません。 |

**注意** `myContract.deploy({ data, arguments }).sign(options)` と `myContract.deploy({ data, arguments }).signAsFeePayer(options)` は caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) からサポートされています。

**例**

```javascript
> myContract.deploy({
      data: '0x12345...',
      arguments: [123, 'My string']
  })
  .send({
      from: '0x1234567890123456789012345678901234567891',
      gas: 1500000,
      value: 0,
  }, function(error, transactionHash) { ... })
  .on('error', function(error) { ... })
  .on('transactionHash', function(transactionHash) { ... })
  .on('receipt', function(receipt) {
     console.log(receipt.contractAddress) // contains the new contract address
   })
  .then(function(newContractInstance) {
      console.log(newContractInstance.options.address) // instance with the new contract address
  })

// When the data is already set as an option to the contract itself
> myContract.options.data = '0x12345...'

> myContract.deploy({
        arguments: [123, 'My string']
  })
  .send({
      from: '0x1234567890123456789012345678901234567891',
      gas: 1500000,
      value: 0,
  })
  .then(function(newContractInstance) {
      console.log(newContractInstance.options.address) // instance with the new contract address
  })

// Simply encoding
> myContract.deploy({
      data: '0x12345...',
      arguments: [123, 'My string']
  })
  .encodeABI()
'0x12345...0000012345678765432'

// Gas estimation
> myContract.deploy({
      data: '0x12345...',
      arguments: [123, 'My string']
  })
  .estimateGas(function(err, gas) {
      console.log(gas)
  })
```

## myContract.send <a href="#mycontract-send" id="mycontract-send"></a>

```javascript
myContract.send(options, methodName [, param1 [, param2 [, ...]]])
```

スマートコントラクトの機能を実行するためのトランザクションを送信します。 これはスマートコントラクト状態を変更することができます。

この関数で使用されるトランザクションタイプは、 `オプション` または `myContract.options` で定義された値によって異なります。 `myContract.send`, `feeDelegation` , `feePayer` を正しく設定する必要があります。

* `feeDelegation` が `false`に定義されていないか、定義されていません : [SmartContractExecution](caver.transaction/basic.md#smartcontractexecution)
* `feeDelegation` は `true`に定義されていますが、 `feePayer` は定義されていません: エラーをスローします。
* `feeDelegation` は `true` と `feePayer` が定義されていますが、 `feeRatio` が定義されていません: [FeeDelegatedSmartContractExecution](caver.transaction/fee-delegation.md#feedelegatedsmartcontractexecution)
* `feeDelegation` は `true` と `feePayer` と `feeRatio` が定義されています: [FeeDelegatedSmartContractExecutionWithRatio](caver.transaction/partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio)

**NOTE** `caver.wallet` must contains keyring instances corresponding to `from` and `feePayer` in `options` or `myContract.options` to make signatures.

**注意** `myContract.send` は caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 以降でサポートされています。

**パラメータ**

| 名前         | タイプ    | Description                                                                                           |
| ---------- | ------ | ----------------------------------------------------------------------------------------------------- |
| オプション      | object | 送信に使用するオプション 詳細は [methods.methodName.send](caver.contract.md#methods-methodname-send) のテーブルを参照してください。 |
| methodName | 文字列    | 実行するコントラクト関数のメソッド名。                                                                                   |
| パラメータ      | 混在しました | (オプション) スマートコントラクト機能に渡されるパラメータ。                                                                       |

**戻り値**

`Promise` は `PromiEvent` を返します

| タイプ        | Description                                                                      |
| ---------- | -------------------------------------------------------------------------------- |
| PromiEvent | Promise複合イベントエミッター。 これは、取引の領収書が利用可能であるときに解決されます。 Promiseは新しいコントラクトインスタンスで解決されます。 |

PromiEvent の場合、次のイベントを使用できます。

* `transactionHash`: トランザクションが送信され、トランザクションハッシュが利用可能になった直後に発生します。 その型は `文字列` です。
* `領収書`: 領収書が入手可能な場合に発行されます。 詳細は [caver.rpc.klay.getTransactionReceipt](caver.rpc/klay.md#caver-rpc-klay-gettransactionreceipt) を参照してください。 その型は `オブジェクト` です。
* `error`: 送信中にエラーが発生した場合に発生します。 ガス欠エラーでは、2 番目のパラメータはレシートです。 その型は `エラー` です。

**例**

```javascript
// Send a SmartContractExecution and use the promise
> myContract.send({ from: '0x{address in hex}', gas: 1000000 }, 'methodName', 123).then(console.log)
{
  blockHash: '0x294202dcd1d3c422880e2a209b9cd70ce7036300536c78ab74130c5717cb90da',
  blockNumber: 16342,
  contractAddress: null,
  from: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  gas: '0xf4240',
  gasPrice: '0x5d21dba00',
  gasUsed: 47411,
  input: '0x983b2...',
  logsBloom: '0x00800...',
  nonce: '0x1cd',
  senderTxHash: '0xe3f50d2bab2c462ef99379860d2b634d85a0c9fba4e2b189daf1d96bd4bbf8ff',
  signatures: [ { V: '0x4e43', R: '0x2ba27...', S: '0x50d37...' } ],
  status: true,
  to: '0x361870b50834a6afc3358e81a3f7f1b1eb9c7e55',
  transactionHash: '0xe3f50d2bab2c462ef99379860d2b634d85a0c9fba4e2b189daf1d96bd4bbf8ff',
  transactionIndex: 0,
  type: 'TxTypeSmartContractExecution',
  typeInt: 48,
  value: '0x0',
  events: {...}
}

// SmartContractExecutionを送信し、イベントエミッタを使用
> myContract. end({ from: '0x{address in hex}', gas: 1000000 }, 'methodName', 123)
  .on('transactionHash', function(hash) {
...
  })
  .on('receipt', function(receipt) {
    console.log(receipt)
  })
  .on('error', console.error)

// Send a FeeDelegatedSmartContractExecution
> myContract.send({
    from: '0x{address in hex}',
    gas: 1000000,
    feeDelegation: true,
    feePayer: '0x{address in hex}',
  }, 'methodName', 123).then(console.log)
{
  blockHash: '0x149e36f279577c306fccb9779a0274e802501c32f7054c951f592778bd5c168a',
  blockNumber: 16458,
  contractAddress: null,
  feePayer: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  feePayerSignatures: [ { V: '0x4e43', R: '0x48c28...', S: '0x18413...' } ],
  from: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  gas: '0xf4240',
  gasPrice: '0x5d21dba00',
  gasUsed: 57411,
  input: '0x983b2d5600000000000000000000000022bb89bd35e7b12bd25bea4165cf0f9330032f8c',
  logsBloom: '0x00800...',
  nonce: '0x1f5',
  senderTxHash: '0x5b06ca5046229e066c11dfc0c74fcbc98509294370981f9b142378a8f2bd5fe8',
  signatures: [ { V: '0x4e44', R: '0xfb707...', S: '0x641c6...' } ],
  status: true,
  to: '0x361870b50834a6afc3358e81a3f7f1b1eb9c7e55',
  transactionHash: '0x0e04be479ad06ec87acbf49abd44f16a56390c736f0a7354860ebc7fc0f92e13',
  transactionIndex: 1,
  type: 'TxTypeFeeDelegatedSmartContractExecution',
  typeInt: 49,
  value: '0x0',
  events: {...}
}

// Send a FeeDelegatedSmartContractExecutionWithRatio
> myContract.send({
    from: '0x{address in hex}',
    gas: 1000000,
    feeDelegation: true,
    feePayer: '0x{address in hex}',
    feeRatio: 30,
  }, 'methodName', 123).then(console.log)
{
  blockHash: '0x8f0a0137cf7e0fea503c818910140246437db36121871bc54b2ebc688873b3f3',
  blockNumber: 16539,
  contractAddress: null,
  feePayer: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  feePayerSignatures: [ { V: '0x4e43', R: '0x80db0...', S: '0xf8c7c...' } ],
  feeRatio: '0x1e',
  from: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  gas: '0xf4240',
  gasPrice: '0x5d21dba00',
  gasUsed: 62411,
  input: '0x983b2d560000000000000000000000007ad1a538041fa3ba1a721f87203cb1a3822b8eaa',
  logsBloom: '0x00800...',
  nonce: '0x219',
  senderTxHash: '0x14c7b674a0e253b31c85c7be8cbfe4bf9d86e66e940fcae34b854e25eab1ce15',
  signatures: [ { V: '0x4e43', R: '0xd57ef...', S: '0xe14f3...' } ],
  status: true,
  to: '0x361870b50834a6afc3358e81a3f7f1b1eb9c7e55',
  transactionHash: '0xfbf00ec189aeb0941d554384f1660ffdac7768b3af2bb1526bcb3983215c1183',
  transactionIndex: 0,
  type: 'TxTypeFeeDelegatedSmartContractExecutionWithRatio',
  typeInt: 50,
  value: '0x0',
  events: {...}
}
```

## myContract.sign <a href="#mycontract-sign" id="mycontract-sign"></a>

```javascript
myContract.sign(options, methodName [, param1 [, param2 [, ...]]])
```

送信者としてスマートコントラクトトランザクションに署名し、スマートコントラクトを展開したり、スマートコントラクトの機能を実行したりします。

スマートコントラクトがデプロイされた場合、methodName に 'constructor' を入力することができます。例えば `myContract.sign({ from, ... }, 'constructor', byteCode, ...)`.

この関数で使用されるトランザクションタイプは、 `オプション` または `myContract.options` で定義された値によって異なります。 `myContract.sign`, `feeDelegation` を `true` と定義する必要があります。

* `feeDelegation` は `false`に定義されていません。 [SmartContractDeploy](caver.transaction/basic.md#smartcontractdeploy) / [SmartContractExecution](caver.transaction/basic.md#smartcontractexecution)
* `feeDelegation` は `true`に定義されていますが、 `feeRatio` は定義されていません: [FeeDelegatedSmartContractDeploy](caver.transaction/fee-delegation.md#feedelegatedsmartcontractdeploy) / [FeeDelegatedSmartContractExecution](caver.transaction/fee-delegation.md#feedelegatedsmartcontractexecution)
* `feeDelegation` は `true` と `feeRatio` が定義されています: [FeeDelegatedSmartContractDeployWithRatio](caver.transaction/partial-fee-delegation.md#feedelegatedsmartcontractdeploywithratio) / [FeeDelegatedSmartContractExecutionWithRatio](caver.transaction/partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio)

**NOTE** `caver.wallet` must contains keyring instances corresponding to `from` in `options` or `myContract.options` to make signatures.

**注意** `myContract.sign` は caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) からサポートされています。

**パラメータ**

| 名前         | タイプ    | Description                                                                                           |
| ---------- | ------ | ----------------------------------------------------------------------------------------------------- |
| オプション      | object | 送信に使用するオプション 詳細は [methods.methodName.send](caver.contract.md#methods-methodname-send) のテーブルを参照してください。 |
| methodName | 文字列    | 実行するコントラクト関数のメソッド名。 スマートコントラクトをデプロイするためのトランザクションに署名したい場合は、メソッド名の代わりに 'constructor' 文字列を使用してください。      |
| パラメータ      | 混在しました | (オプション) スマートコントラクト機能に渡されるパラメータ。 スマートコントラクトデプロイトランザクションに署名したい場合は、byteCode と constructor パラメータを渡します。    |

**戻り値**

`Promise` returning [Transaction](caver.transaction/) - 署名されたスマートコントラクトトランザクション。

**例**

```javascript
// Sign a SmartContractDeploy
> myContract.sign({ from: '0x{address in hex}', gas: 1000000 }, 'constructor', byteCode, 123).then(console.log)
SmartContractDeploy {
  _type: 'TxTypeSmartContractDeploy',
  _from: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x4e43', _r: '0xeb6b5...', _s: '0x5e4f9...' } ],
  _to: '0x',
  _value: '0x0',
  _input: '0x60806...',
  _humanReadable: false,
  _codeFormat: '0x0',
  _chainId: '0x2710',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x2a5'
}

// Sign a FeeDelegatedSmartContractDeploy
> myContract.sign({ from: '0x{address in hex}', feeDelegation: true, gas: 1000000 }, 'constructor', byteCode, 123).then(console.log)
FeeDelegatedSmartContractDeploy {
  _type: 'TxTypeFeeDelegatedSmartContractDeploy',
  _from: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x4e43', _r: '0xee0f5...', _s: '0x31cbf...' } ],
  _feePayer: '0x0000000000000000000000000000000000000000',
  _feePayerSignatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
  _to: '0x',
  _value: '0x0',
  _input: '0x60806...',
  _humanReadable: false,
  _codeFormat: '0x0',
  _chainId: '0x2710',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x320'
}

// Sign a FeeDelegatedSmartContractDeployWithRatio
> myContract.sign({ from: keyring.address, feeDelegation: true, feeRatio: 30, gas: 1000000 }, 'constructor', byteCode, 123).then(console.log)
FeeDelegatedSmartContractDeployWithRatio {
  _type: 'TxTypeFeeDelegatedSmartContractDeployWithRatio',
  _from: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x4e44', _r: '0x4c2b0...', _s: '0x47df8...' } ],
  _feePayer: '0x0000000000000000000000000000000000000000',
  _feePayerSignatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
  _feeRatio: '0x1e',
  _to: '0x',
  _value: '0x0',
  _input: '0x60806...',
  _humanReadable: false,
  _codeFormat: '0x0',
  _chainId: '0x2710',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x306'
}

// Sign a SmartContractExecution
> myContract.sign({ from: '0x{address in hex}', gas: 1000000 }, 'methodName', 123).then(console.log)
SmartContractExecution {
  _type: 'TxTypeSmartContractExecution',
  _from: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x4e44', _r: '0xb2846...', _s: '0x422c1...' } ],
  _to: '0x361870b50834a6afc3358e81a3f7f1b1eb9c7e55',
  _value: '0x0',
  _input: '0x983b2...',
  _chainId: '0x2710',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x23b'
}

// Sign a FeeDelegatedSmartContractExecution
> myContract.sign({
    from: '0x{address in hex}',
    gas: 1000000,
    feeDelegation: true,
  }, 'methodName', 123).then(console.log)
FeeDelegatedSmartContractExecution {
  _type: 'TxTypeFeeDelegatedSmartContractExecution',
  _from: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x4e43', _r: '0xf7676...', _s: '0x42673...' } ],
  _feePayer: '0x0000000000000000000000000000000000000000',
  _feePayerSignatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
  _to: '0x361870b50834a6afc3358e81a3f7f1b1eb9c7e55',
  _value: '0x0',
  _input: '0x983b2...',
  _chainId: '0x2710',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x254'
}

// Sign a FeeDelegatedSmartContractExecutionWithRatio
> myContract.sign({
    from: '0x{address in hex}',
    gas: 1000000,
    feeDelegation: true,
    feeRatio: 30,
  }, 'methodName', 123).then(console.log)
FeeDelegatedSmartContractExecutionWithRatio {
  _type: 'TxTypeFeeDelegatedSmartContractExecutionWithRatio',
  _from: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x4e44', _r: '0x58b06...', _s: '0x637ff...' } ],
  _feePayer: '0x0000000000000000000000000000000000000000',
  _feePayerSignatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
  _feeRatio: '0x1e',
  _to: '0x361870b50834a6afc3358e81a3f7f1b1eb9c7e55',
  _value: '0x0',
  _input: '0x983b2...',
  _chainId: '0x2710',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x262'
}
```

## myContract.signAsFeePayer <a href="#mycontract-signasfeepayer" id="mycontract-signasfeepayer"></a>

```javascript
myContract.signAsFeePayer(options, methodName [, param1 [, param2 [, ...]]])
```

料金支払者としてスマートコントラクト取引に署名し、スマートコントラクトを展開したり、スマートコントラクトの機能を実行したりします。

If a smart contract is deployed, 'constructor' can be entered in the methodName, such as `myContract.signAsFeePayer({ from, feeDelegation: true, feePayer, ... }, 'constructor', byteCode, ...)`.

この関数で使用されるトランザクションタイプは、 `オプション` または `myContract.options` で定義された値によって異なります。 The `signAsFeePayer` is a function that signs as a transaction fee payer, so `feeDelegation` field must be defined as `true`. また、手数料支払者のアドレスは、 `feePayer` フィールドに定義する必要があります。

* `feeDelegation` が定義されていません : エラーを投げます。
* `feeDelegation` が定義されているが、 `feePayer` が定義されていない: エラーを投げる。
* `feeDelegation` is defined to `true` and `feePayer` is defined, but `feeRatio` is not defined: [FeeDelegatedSmartContractDeploy](caver.transaction/fee-delegation.md#feedelegatedsmartcontractdeploy) / [FeeDelegatedSmartContractExecution](caver.transaction/fee-delegation.md#feedelegatedsmartcontractexecution)
* `feeDelegation` is defined to `true` and `feePayer` and `feeRatio` are defined: [FeeDelegatedSmartContractDeployWithRatio](caver.transaction/partial-fee-delegation.md#feedelegatedsmartcontractdeploywithratio) / [FeeDelegatedSmartContractExecutionWithRatio](caver.transaction/partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio)

**NOTE** `caver.wallet` must contains keyring instances corresponding to `feePayer` in `options` or `myContract.options` to make signatures.

**注** `myContract.signAsFeePayer` は caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 以降サポートされています。

**パラメータ**

| 名前         | タイプ    | Description                                                                                           |
| ---------- | ------ | ----------------------------------------------------------------------------------------------------- |
| オプション      | object | 送信に使用するオプション 詳細は [methods.methodName.send](caver.contract.md#methods-methodname-send) のテーブルを参照してください。 |
| methodName | 文字列    | 実行するコントラクト関数のメソッド名。 スマートコントラクトをデプロイするためのトランザクションに署名したい場合は、メソッド名の代わりに 'constructor' 文字列を使用してください。      |
| パラメータ      | 混在しました | (オプション) スマートコントラクト機能に渡されるパラメータ。 スマートコントラクトデプロイトランザクションに署名したい場合は、byteCode と constructor パラメータを渡します。    |

**戻り値**

`Promise` returning [Transaction](caver.transaction/) - 署名されたスマートコントラクトトランザクション。

**例**

```javascript
// Sign a FeeDelegatedSmartContractDeploy
> myContract.signAsFeePayer({ from: '0x{address in hex}', feeDelegation: true, feePayer: '0x{address in hex}', gas: 1000000 }, 'constructor', byteCode, 123).then(console.log)
FeeDelegatedSmartContractDeploy {
  _type: 'TxTypeFeeDelegatedSmartContractDeploy',
  _from: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
  _feePayer: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _feePayerSignatures: [ SignatureData { _v: '0x4e43', _r: '0xe0641...', _s: '0x1d21e...' } ],
  _to: '0x',
  _value: '0x0',
  _input: '0x60806...',
  _humanReadable: false,
  _codeFormat: '0x0',
  _chainId: '0x2710',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x32a'
}

// Sign a FeeDelegatedSmartContractDeployWithRatio
> myContract.signAsFeePayer({ from: keyring.address, feeDelegation: true, feePayer: '0x{address in hex}', feeRatio: 30, gas: 1000000 }, 'constructor', byteCode, 123).then(console.log)
FeeDelegatedSmartContractDeployWithRatio {
  _type: 'TxTypeFeeDelegatedSmartContractDeployWithRatio',
  _from: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
  _feePayer: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _feePayerSignatures: [ SignatureData { _v: '0x4e44', _r: '0x307bd...', _s: '0x75110...' } ],
  _feeRatio: '0x1e',
  _to: '0x',
  _value: '0x0',
  _input: '0x60806...',
  _humanReadable: false,
  _codeFormat: '0x0',
  _chainId: '0x2710',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x359'
}

// Sign a FeeDelegatedSmartContractExecution
> myContract.signAsFeePayer({
    from: '0x{address in hex}',
    gas: 1000000,
    feeDelegation: true,
    feePayer: '0x{address in hex}',
  }, 'methodName', 123).then(console.log)
FeeDelegatedSmartContractExecution {
  _type: 'TxTypeFeeDelegatedSmartContractExecution',
  _from: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
  _feePayer: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _feePayerSignatures: [ SignatureData { _v: '0x4e43', _r: '0xc58ba...', _s: '0x76fdb...' } ],
  _to: '0x4a9d979707aede18fa674711f3b2fe110fac4e7e',
  _value: '0x0',
  _input: '0x983b2...',
  _chainId: '0x2710',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x36c'
}

// Sign a FeeDelegatedSmartContractExecutionWithRatio
> myContract.signAsFeePayer({
    from: '0x{address in hex}',
    gas: 1000000,
    feeDelegation: true,
    feePayer: '0x{address in hex}',
    feeRatio: 30,
  }, 'methodName', 123).then(console.log)
FeeDelegatedSmartContractExecutionWithRatio {
  _type: 'TxTypeFeeDelegatedSmartContractExecutionWithRatio',
  _from: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
  _feePayer: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _feePayerSignatures: [ SignatureData { _v: '0x4e44', _r: '0xeb78d...', _s: '0x2864d...' } ]、
  _feeRatio: '0x1e',
  _to: '0x4a9d979707aede18fa674711f3b2fe110fac4e7e',
  _value: '0x0',
  _input: '0x983b2...',
  _chainId: '0x2710',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x37b'
}
```

## myContract.call <a href="#mycontract-call" id="mycontract-call"></a>

```javascript
myContract.call('methodName', [param1 [, param2 [, ...]]])
myContract.call(options, 'methodName', [param1 [, param2 [, ...]]])
```

トランザクションを送信することなく、定数メソッドを呼び出し、Klaytn Virtual Machine内でスマートコントラクトメソッドを実行します。 通話はスマートコントラクトの状態を変更できません。

**注意** `myContract.call` は caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) からサポートされています。

**パラメータ**

| 名前         | タイプ    | Description                                                                                                    |
| ---------- | ------ | -------------------------------------------------------------------------------------------------------------- |
| オプション      | object | (オプション) 通話に使用するオプション。 詳細は [methods.methodName.call](caver.contract.md#methods-methodname-call) のテーブルを参照してください。 |
| methodName | 文字列    | 呼び出すコントラクト関数のメソッド名。                                                                                            |
| パラメータ      | 混在しました | (オプション) スマートコントラクト機能に渡されるパラメータ。                                                                                |

**戻り値**

`Promise` return `Mixed` - スマートコントラクトメソッドの戻り値。 単一の値を返す場合はそのまま返されます。 複数の戻り値がある場合は、プロパティとインデックスを持つオブジェクトを返します。

**例**

```javascript
> myContract.call('methodName').then(console.log)
Jasmine

> myContract.call({ from: '0x{address in hex}' }, 'methodName', 123).then(console.log)
テスト結果
```

## myContract.decodeFunctionCall <a href="#mycontract-decodefunctioncall" id="mycontract-decodefunctioncall"></a>

```javascript
myContract.decodeFunctionCall(functionCall)
```

関数呼び出しをデコードし、パラメータを返します。

**注** `myContract.decodeFunctionCall` は caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3) からサポートされています。

**パラメータ**

| 名前   | タイプ | Description         |
| ---- | --- | ------------------- |
| 関数通話 | 文字列 | エンコードされた関数の呼び出し文字列。 |

**戻り値**

| タイプ    | Description                                                             |
| ------ | ----------------------------------------------------------------------- |
| object | プレーンなパラメータを含むオブジェクト。 `結果[0]` は、パラメータの順序で配列のようにアクセスするために提供されているため使用できます。 |

**例**

```javascript
// The myContract variable is instantiated with the belower abi.
// [
//   {
//     constant: true,
//     inputs: [{ name: 'key', type: 'string' }],
//     name: 'get',
//     outputs: [{ name: '', type: 'string' }],
//     payable: false,
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     constant: false,
//     inputs: [{ name: 'key', type: 'string' }, { name: 'value', type: 'string' }],
//     name: 'set',
//     outputs: [],
//     payable: false,
//     stateMutability: 'nonpayable',
//     type: 'function',
//   },
// ]
> myContract.decodeFunctionCall('0xe942b5160000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000036b65790000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000576616c7565000000000000000000000000000000000000000000000000000000')
Result {
  '0': '2345675643',
  '1': 'Hello!%',
  __length__: 2,
  myNumber: '2345675643',
  mystring: 'Hello!%'
}
```

## myContract.methods <a href="#mycontract-methods" id="mycontract-methods"></a>

```javascript
myContract.methods.methodName([param1 [, param2 [, ...]]])
myContract.methods['methodName']([param1 [, param2 [, ...]]])
```

そのメソッドのトランザクションオブジェクトを作成します。このオブジェクトは、sent、推定、ABI エンコードと呼ばれます。

このスマートコントラクトのメソッドは以下で利用できます：

* Method name: `myContract.methods.methodName(123)` or `myContract.methods[methodName](123)`
* Method prototype: `myContract.methods['methodName(uint256)'](123)`
* メソッドシグネチャ: `myContract.methods['0x58cf5f10'](123)`

これにより、同じ名前の関数を呼び出すことができますが、JavaScript コントラクトオブジェクトとは異なるパラメータを呼び出すことができます。

## cf) \*関数シグネチャ（関数セレクタ） <a href="#cf-function-signature-function-selector" id="cf-function-signature-function-selector"></a>

関数呼び出しのコールデータの最初の4バイトは、呼び出される関数を指定します。 これは、関数の署名の Keccak-256 (SHA-3) ハッシュの最初の4バイト(左、大エンディアンでは高次)です。

関数署名は、2つの異なるメソッドを介して与えることができます。 \
`1. caver.abi.encodefunctionSignature('funcName(paramType1,paramType2,...)')`\
`2. caver.utils.sha3('funcName(paramType1,paramType2,...)').substr(0, 10)`

ex)

```javascript
caver.abi.encodefunctionSignature('methodName(uint256)')
> 0x58cf5f10

caver.utils.sha3('methodName(uint256)').substr(0, 10)
> 0x58cf5f10
```

**パラメータ**

このスマートコントラクトに属するメソッドのパラメータは、JSON インターフェイスで定義されます。

**戻り値**

`Promise` returning `object` - コントラクト実行のための引数と関数が定義されたオブジェクト。

| 名前                                                                    | タイプ | Description                                                                           |
| --------------------------------------------------------------------- | --- | ------------------------------------------------------------------------------------- |
| 引数                                                                    | 行列  | このメソッドに渡された引数。                                                                        |
| [通話](caver.contract.md#methods-methodname-call)                       | 関数  | Klaytn Virtual Machine上のスマートコントラクトで一定のメソッドを呼び出して実行する関数(スマートコントラクトの状態を変更することはできません)。   |
| [送信](caver.contract.md#methods-methodname-send)                       | 関数  | トランザクションをKlaytnに送信し、そのメソッドを実行する関数(スマートコントラクト状態を変更することができます)。                          |
| [sign](caver.contract.md#methods-methodname-sign)                     | 関数  | 送信者としてトランザクションに署名する関数。 sign関数は署名されたトランザクションを返します。                                     |
| [signAsFeePayer](caver.contract.md#methods-methodname-signasfeepayer) | 関数  | 手数料支払者として取引に署名する機能。 signAsFeePayer 関数は署名されたトランザクションを返します。                             |
| [推定ガス](caver.contract.md#methods-methodname-estimategas)              | 関数  | その関数は、実行に使用されるガスを推定します。                                                               |
| [encodeABI](caver.contract.md#methods-methodname-encodeabi)           | 関数  | このメソッドのABIをエンコードする関数。 これはトランザクションを使ってメソッドを呼び出したり、別のスマートコントラクトメソッドに引数として渡したりすることができます。 |

**注意** `記号` と `signAsFeePayer` は caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) からサポートされています。

**例**

```javascript
// Calling a method
> myContract.methods.methodName(123).call({ ... }, function(error, result) { ... })
> myContract.methods.methodName(123).call({ ... }).then((result) => { ... })

// Sending basic transaction and using the promise
> myContract.methods.methodName(123).send({
    from: '0x{address in hex}',
    ...
  }).then(function(receipt) {
    // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
  })

// Sending basic transaction and using the eventEmitter
> myContract.methods.methodName(123).send({
    from: '0x{address in hex}',
    ...
  }).on('transactionHash', function(hash) {
...
  })
  .on('receipt', function(receipt) {
...
  })
  .on('error', console.error)

// Sending fee delegation transaction and using the promise
> myContract.methods.methodName(123).send({
    from: '0x{address in hex}',
    feePayer: '0x{fee-payer address}',
    feeDelegation: true,f
    ...
  }).then(function(receipt) {
    // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
  })

// Sending partial fee delegation transaction and using the promise
> myContract.methods.methodName(123).send({
    from: '0x{address in hex}',
    feePayer: '0x{fee-payer address}',
    feeDelegation: true,
    feeRatio: 30,
    ...
  }).then(function(receipt) {
    // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
  })

// sign the basic transaction
> myContract.methods.methodName(123).sign({
    from: '0x{address in hex}',
    feeDelegation: true,
    ...
  }).then(function(signedTx) { ... })

// 手数料委任トランザクションに署名
> myContract.methods.methodName(123).sign({
    from: '0x{address in hex}',
    feeDelegation: true,
...
  }).then(function(signedTx) { ... })

// sign the partial fee delegation transaction
> myContract.methods.methodName(123).sign({
    from: '0x{address in hex}',
    feeDelegation: true,
    feeRatio: 30,
    ...
  }).then(function(signedTx) { ... })

// sign the fee delegation transaction as a fee payer
> myContract.methods.methodName(123).signAsFeePayer({
    from: '0x{address in hex}',
    feePayer: '0x{fee-payer address}',
    feeDelegation: true,
    ...
  }).then(function(signedTx) { ... })

// sign the partial fee delegation transaction as a fee payer
> myContract.methods.methodName(123).signAsFeePayer({
    from: '0x{address in hex}',
    feePayer: '0x{fee-payer address}',
    feeDelegation: true,
    feeRatio: 30,
    ...
  }).then(function(signedTx) { ... })
```

## methods.methodName.call <a href="#methods-methodname-call" id="methods-methodname-call"></a>

```javascript
myContract.methods.methodName([param1 [, param2 [, ...]]]).call(options [, callback])
myContract.methods['methodName']([param1 [, param2 [, ...]]).call(options [, callback])
```

トランザクションを送信することなく、定数メソッドを呼び出し、Klaytn Virtual Machine内でスマートコントラクトメソッドを実行します。 通話はスマートコントラクトの状態を変更できません。 ショートカット関数として提供されている [myContract.call](caver.contract.md#mycontract-call) を使用することをお勧めします。

**パラメータ**

| 名前       | タイプ    | Description                                                                              |
| -------- | ------ | ---------------------------------------------------------------------------------------- |
| オプション    | object | (オプション) 通話に使用するオプション。 詳細は以下の表をご覧ください。                                                    |
| callback | 関数     | (オプション) このコールバックは、2 番目の引数としてスマートコントラクトメソッドの実行の結果で発行されます。 または error オブジェクトを最初の引数として指定します。 |

optionsオブジェクトには以下を含めることができます:

| 名前       | タイプ | Description                        |
| -------- | --- | ---------------------------------- |
| from     | 文字列 | (オプション) コントラクトメソッドを呼び出すアドレス。       |
| gasPrice | 文字列 | (オプション) この呼び出しに使用するペブ内のガス価格。       |
| ガス       | 数値  | (オプション) この呼び出しのために提供される最大ガス(ガス制限)。 |

**戻り値**

`Promise` return `Mixed` - スマートコントラクトメソッドの戻り値。 単一の値を返す場合はそのまま返されます。 複数の戻り値がある場合は、プロパティとインデックスを持つオブジェクトを返します。

**例**

```javascript
// using the promise
> myContract.methods.methodName(123).call({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
  .then(function(result) {
...
  })
```

```solidity
// Solidity: MULTIPLE RETURN VALUES
contract MyContract {
    function myFunction() public returns(uint256 myNumber, string memory myString) {
        return (23456, "Hello!%");
    }
}
```

```javascript
> var MyContract = new caver.contract(abi, address)
> MyContract.methods.myfunction().call().then(console.log)
Result {
      mynumber: '23456',
      mystring: 'Hello!%',
      0: '23456',
      1: 'Hello!%'
}
```

```solidity
// Solidity: SINGLE RETURN VALUE
contract MyContract {
    function myfunction() public returns(string memory mystring) {
        return "Hello!%";
    }
}
```

```javascript
> var MyContract = new caver.contract(abi, address)
> MyContract.methods.myfunction().then(console.log)
"Hello!%"
```

## methods.methodName.send <a href="#methods-methodname-send" id="methods-methodname-send"></a>

```javascript
myContract.methods.methodName([param1 [, param2 [, ...]]]).send(options [, callback])
myContract.methods['methodName']([param1 [, param2 [, ...]]).send(options [, callback])
```

スマートコントラクトを展開するトランザクションを送信するか、スマートコントラクトの機能を実行します。 これはスマートコントラクト状態を変更することができます。 ショートカット関数として提供されている [myContract.send](caver.contract.md#mycontract-send) を使用することをお勧めします。

If a smart contract is deployed, 'constructor' can be entered in the methodName, such as `myContract.methods.constructor` or `myContract.methods['constructor']`, but it is recommended to use the [myContract.deploy](caver.contract.md#mycontract-deploy2) function.

この関数で使用されるトランザクションタイプは、 `オプション` または `myContract.options` で定義された値によって異なります。 `methods.methodName.send`, `feeDelegation` , `feePayer` を正しく設定してください。

* `feeDelegation` は `false`に定義されていません。 [SmartContractDeploy](caver.transaction/basic.md#smartcontractdeploy) / [SmartContractExecution](caver.transaction/basic.md#smartcontractexecution)
* `feeDelegation` は `true`に定義されていますが、 `feePayer` は定義されていません: エラーをスローします。
* `feeDelegation` is defined to `true` and `feePayer` is defined, but `feeRatio` is not defined: [FeeDelegatedSmartContractDeploy](caver.transaction/fee-delegation.md#feedelegatedsmartcontractdeploy) / [FeeDelegatedSmartContractExecution](caver.transaction/fee-delegation.md#feedelegatedsmartcontractexecution)
* `feeDelegation` is defined to `true` and `feePayer` and `feeRatio` are defined: [FeeDelegatedSmartContractDeployWithRatio](caver.transaction/partial-fee-delegation.md#feedelegatedsmartcontractdeploywithratio) / [FeeDelegatedSmartContractExecutionWithRatio](caver.transaction/partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio)

**NOTE** `caver.wallet` must contains keyring instances corresponding to `from` and `feePayer` in `options` or `myContract.options` to make signatures.

**パラメータ**

| 名前       | タイプ    | Description                                                                      |
| -------- | ------ | -------------------------------------------------------------------------------- |
| オプション    | object | 送信に使用するオプション 詳細は以下の表をご覧ください。                                                     |
| callback | 関数     | (オプション) このコールバックは、最初に "transactionHash" を使用するか、最初の引数として error オブジェクトを使用して実行されます。 |

optionsオブジェクトには以下を含めることができます:

| 名前            | タイプ     | Description                                                                                                                                                                                         |
| ------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from          | 文字列     | トランザクションを送信するアドレス 省略した場合は、 `myContract.options.from` が使用されます。                                                                                                                                       |
| ガス            | 数値      | この取引に提供される最大ガス (ガス限度額)。                                                                                                                                                                             |
| gasPrice      | 文字列     | (オプション) この取引に使用するペブ内のガス価格。                                                                                                                                                                          |
| 値             | 数 \    | 文字列 \| BN \| Bignumber | (任意) このトランザクションによってスマートコントラクトのアドレスに転送されるpebの値。                                                                                                                           |
| feeDelegation | boolean | (オプション、デフォルト `false`) 手数料委託トランザクションを使用するかどうか。 省略した場合は、 `myContract.options.feeDelegation` が使用されます。                                                                                                  |
| feePayer      | 文字列     | (オプション) 取引手数料を支払う手数料支払者の住所。 `feeDelegation` が `true`の場合、この値はトランザクションの `feePayer` フィールドに設定されます。 省略した場合は、 `myContract.options.feePayer` が使用されます。                                                      |
| 手数料比          | 文字列     | (オプション) 手数料支払者が負担する取引手数料の割合。 `feeDelegation` が `true` で、 `feeRatio` が有効な値に設定されている場合、部分的な手数料委任トランザクションが使用されます。 有効範囲は1~99です。 0、または100以上の比率は許可されていません。 省略した場合は、 `myContract.options.feeRatio` が使用されます。 |

**注意** `feeDelegation`, `feePayer` と `feeRatio` は caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) からサポートされています。

**戻り値**

`Promise` は `PromiEvent` を返します

| タイプ        | Description                                                                      |
| ---------- | -------------------------------------------------------------------------------- |
| PromiEvent | Promise複合イベントエミッター。 これは、取引の領収書が利用可能であるときに解決されます。 Promiseは新しいコントラクトインスタンスで解決されます。 |

PromiEvent の場合、次のイベントを使用できます。

* `transactionHash`: トランザクションが送信され、トランザクションハッシュが利用可能になった直後に発生します。 その型は `文字列` です。
* `領収書`: 領収書が入手可能な場合に発行されます。 詳細は [caver.rpc.klay.getTransactionReceipt](caver.rpc/klay.md#caver-rpc-klay-gettransactionreceipt) を参照してください。 その型は `オブジェクト` です。
* `error`: 送信中にエラーが発生した場合に発生します。 ガス欠エラーでは、2 番目のパラメータはレシートです。 その型は `エラー` です。

**例**

```javascript
// using the promise
> myContract.methods.methodName(123).send({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
  .then(function(receipt) {
    // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
  })


// using the event emitter
> myContract.methods.methodName(123).send({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
  .on('transactionHash', function(hash) {
    ...
  })
  .on('receipt', function(receipt) {
    console.log(receipt)
  })
  .on('error', console.error) // ガス不足のエラーがある場合、2 番目のパラメータは領収書です。

// receipt example
{
   "transactionHash": "0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b",
   "transactionIndex": 0,
   "blockHash": "0xef95f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b46",
   "blocknumber": 3,
   "contractAddress": "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe",
   "gasUsed": 30234,
   "events": {
     "eventName": {
       returnValues: {
         myIndexedParam: 20,
         myOtherIndexedParam: '0x123456789...',
         myNonIndexParam: 'My string'
       },
       raw: {
         data: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
         topics: ['0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7', '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385']
       },
       event: 'eventName',
       signature: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
       logIndex: 0,
       transactionIndex: 0,
       transactionHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
       blockHash: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
       blocknumber: 1234,
       address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
    },
    "MyOtherEvent": {
      ...
    },
    "MyMultipleEvent":[{...}, {...}] // もし同じイベントの複数がある場合、配列になります。
  }
}

// コントラクトをデプロイ
> myContract.methods.constructor('0x{byte code}', 123).send({ from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe', gas: 1000000 })
> myContract.methods['0x constructor']('0x{byte code}', 123).send({ from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe', gas: 1000000 })
```

## methods.methodName.sign <a href="#methods-methodname-sign" id="methods-methodname-sign"></a>

```javascript
myContract.methods.methodName([param1 [, param2 [, ...]]]).sign(options)
myContract.methods['methodName']([param1 [, param2 [, ...]]).sign(options)
```

送信者としてスマートコントラクトトランザクションに署名し、スマートコントラクトを展開したり、スマートコントラクトの機能を実行したりします。 ショートカット関数として提供されている [myContract.sign](caver.contract.md#mycontract-sign) を使用することをお勧めします。

スマートコントラクトがデプロイされた場合、'constructor' は `myContract.methods.constructor` や `myContract.methods['constructor']` などのメソッド名に入力できます。

この関数で使用されるトランザクションタイプは、 `オプション` または `myContract.options` で定義された値によって異なります。 `methods.methodName.sign`, `feeDelegation` を `true` と定義する必要があります。

* `feeDelegation` は `false`に定義されていません。 [SmartContractDeploy](caver.transaction/basic.md#smartcontractdeploy) / [SmartContractExecution](caver.transaction/basic.md#smartcontractexecution)
* `feeDelegation` は `true`に定義されていますが、 `feeRatio` は定義されていません: [FeeDelegatedSmartContractDeploy](caver.transaction/fee-delegation.md#feedelegatedsmartcontractdeploy) / [FeeDelegatedSmartContractExecution](caver.transaction/fee-delegation.md#feedelegatedsmartcontractexecution)
* `feeDelegation` は `true` と `feeRatio` が定義されています: [FeeDelegatedSmartContractDeployWithRatio](caver.transaction/partial-fee-delegation.md#feedelegatedsmartcontractdeploywithratio) / [FeeDelegatedSmartContractExecutionWithRatio](caver.transaction/partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio)

**NOTE** `caver.wallet` must contains keyring instances corresponding to `from` in `options` or `myContract.options` to make signatures.

**注意** `methods.methodName.sign` は caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) からサポートされています。

**パラメータ**

| 名前    | タイプ    | Description                                                                                                    |
| ----- | ------ | -------------------------------------------------------------------------------------------------------------- |
| オプション | object | 取引の作成に使用されるオプション 詳細は [methods.methodName.send](caver.contract.md#methods-methodname-send) のパラメータテーブルを参照してください。 |

**戻り値**

`Promise` returning [Transaction](caver.transaction/) - 署名されたスマートコントラクトトランザクション。

**例**

```javascript
// Sign a SmartContractDeploy transaction
> myContract.methods.constructor(byteCode, 123).sign({ from: '0x{address in hex}', gas: 1000000 }).then(console.log)
SmartContractDeploy {
  _type: 'TxTypeSmartContractDeploy',
  _from: '0x60498fefbf1705a3db8d7bb5c80d5238956343e5',
  _gas: '0xf4240',
  _signatures: [
    SignatureData {
      _v: '0x07f6',
      _r: '0x26a05...',
      _s: '0x3e3e4...'
    }
  ],
  _to: '0x',
  _value: '0x0',
  _input: '0x60806...',
  _humanReadable: false,
  _codeFormat: '0x0',
  _chainId: '0x3e9',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x2f6'
}
> myContract.methods['constructor'](byteCode, 123).sign({ from: '0x{address in hex}', gas: 1000000 }).then(console.log)

// Sign a FeeDelegatedSmartContractDeploy transaction
> myContract.methods.constructor(byteCode, 123).sign({ from: '0x{address in hex}', feeDelegation: true, gas: 1000000 }).then(console.log)
FeeDelegatedSmartContractDeploy {
  _type: 'TxTypeFeeDelegatedSmartContractDeploy',
  _from: '0x60498fefbf1705a3db8d7bb5c80d5238956343e5',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x07f5', _r: '0xa74f7...', _s: '0x0991e...' } ],
  _feePayer: '0x0000000000000000000000000000000000000000',
  _feePayerSignatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
  _to: '0x',
  _value: '0x0',
  _input: '0x60806...',
  _humanReadable: false,
  _codeFormat: '0x0',
  _chainId: '0x3e9',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x2f6'
}
> myContract.methods['constructor'](byteCode, 123).sign({ from: '0x{address in hex}', feeDelegation: true, gas: 1000000 }).then(console.log)

// Sign a SmartContractExecution transaction
> myContract.methods.methodName('0x...').sign({ from: '0x{address in hex}', gas: 1000000 }).then(console.log)
SmartContractExecution {
  _type: 'TxTypeSmartContractExecution',
  _from: '0x60498fefbf1705a3db8d7bb5c80d5238956343e5',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x07f5', _r: '0xafbf9...', _s: '0x10ea0...' } ],
  _to: '0xbc6723431a57abcacc4016ae664ee778d313ca6e',
  _value: '0x0',
  _input: '0x983b2d5600000000000000000000000060498fefbf1705a3db8d7bb5c80d5238956343e5',
  _chainId: '0x3e9',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x2f6'
}

> myContract.methods['methodName']('0x...').sign({ from: '0x{address in hex}', gas: 1000000 }).then(console.log)

// Sign a FeeDelegatedSmartContractExecution transaction
> myContract.methods.methodName('0x...').sign({ from: '0x{address in hex}', feeDelegation: true, gas: 1000000 }).then(console.log)
FeeDelegatedSmartContractExecution {
  _type: 'TxTypeFeeDelegatedSmartContractExecution',
  _from: '0x60498fefbf1705a3db8d7bb5c80d5238956343e5',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x07f6', _r: '0xdfc14...', _s: '0x38b9c...' } ],
  _feePayer: '0x0000000000000000000000000000000000000000',
  _feePayerSignatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
  _to: '0xbc6723431a57abcacc4016ae664ee778d313ca6e',
  _value: '0x0',
  _input: '0x983b2d5600000000000000000000000060498fefbf1705a3db8d7bb5c80d5238956343e5',
  _chainId: '0x3e9',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x2f6'
}
> myContract.methods['methodName']('0x...').sign({ from: '0x{address in hex}', feeDelegation: true, gas: 1000000 }).then(console.log)
```

## methods.methodName.signAsFeePayer <a href="#methods-methodname-signasfeepayer" id="methods-methodname-signasfeepayer"></a>

```javascript
myContract.methods.methodName([param1 [, param2 [, ...]]]).signAsFeePayer(options)
myContract.methods['methodName']([param1 [, param2 [, ...]]).signAsFeePayer(options)
```

料金支払者としてスマートコントラクト取引に署名し、スマートコントラクトを展開したり、スマートコントラクトの機能を実行したりします。 ショートカット関数として [myContract.signAsFeePayer](caver.contract.md#mycontract-signasfeepayer) を使用することをお勧めします。

スマートコントラクトがデプロイされた場合、'constructor' は `myContract.methods.constructor` や `myContract.methods['constructor']` などのメソッド名に入力できます。

この関数で使用されるトランザクションタイプは、 `オプション` または `myContract.options` で定義された値によって異なります。 The `signAsFeePayer` is a function that signs as a transaction fee payer, so `feeDelegation` field must be defined as `true`. また、手数料支払者のアドレスは、 `feePayer` フィールドに定義する必要があります。

* `feeDelegation` が定義されていません : エラーを投げます。
* `feeDelegation` が定義されているが、 `feePayer` が定義されていない: エラーを投げる。
* `feeDelegation` is defined to `true` and `feePayer` is defined, but `feeRatio` is not defined: [FeeDelegatedSmartContractDeploy](caver.transaction/fee-delegation.md#feedelegatedsmartcontractdeploy) / [FeeDelegatedSmartContractExecution](caver.transaction/fee-delegation.md#feedelegatedsmartcontractexecution)
* `feeDelegation` is defined to `true` and `feePayer` and `feeRatio` are defined: [FeeDelegatedSmartContractDeployWithRatio](caver.transaction/partial-fee-delegation.md#feedelegatedsmartcontractdeploywithratio) / [FeeDelegatedSmartContractExecutionWithRatio](caver.transaction/partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio)

**NOTE** `caver.wallet` must contains keyring instances corresponding to `feePayer` in `options` or `myContract.options` to make signatures.

**注意** `methods.methodName.signAsFeePayer` は caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) からサポートされています。

**パラメータ**

| 名前    | タイプ    | Description                                                                                                    |
| ----- | ------ | -------------------------------------------------------------------------------------------------------------- |
| オプション | object | 取引の作成に使用されるオプション 詳細は [methods.methodName.send](caver.contract.md#methods-methodname-send) のパラメータテーブルを参照してください。 |

**戻り値**

`Promise` returning [Transaction](caver.transaction/) - 署名されたスマートコントラクトトランザクション。

**例**

```javascript
// Sign a FeeDelegatedSmartContractDeploy transaction
> myContract.methods.constructor(byteCode, 123).signAsFeePayer({ from: '0x{address in hex}', feeDelegation: true, feePayer: '0x{address in hex}', gas: 1000000 }).then(console.log)
> FeeDelegatedSmartContractDeploy {
  _type: 'TxTypeFeeDelegatedSmartContractDeploy',
  _from: '0x60498fefbf1705a3db8d7bb5c80d5238956343e5',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
  _feePayer: '0x60498fefbf1705a3db8d7bb5c80d5238956343e5',
  _feePayerSignatures: [ SignatureData { _v: '0x07f6', _r: '0x2c385...', _s: '0x7fa79...' } ],
  _to: '0x',
  _value: '0x0',
  _input: '0x60806...',
  _humanReadable: false,
  _codeFormat: '0x0',
  _chainId: '0x3e9',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x2f6'
}
> myContract.methods['constructor'](byteCode, 123).signAsFeePayer({ from: '0x{address in hex}', feeDelegation: true, feePayer: '0x{address in hex}', gas: 1000000 }).then(console.log)

// Sign a FeeDelegatedSmartContractExecution transaction
> myContract.methods.methodName(123).signAsFeePayer({ from: '0x{address in hex}', feeDelegation: true, feePayer: '0x{address in hex}', gas: 1000000 }).then(console.log)
> FeeDelegatedSmartContractExecution {
  _type: 'TxTypeFeeDelegatedSmartContractExecution',
  _from: '0x60498fefbf1705a3db8d7bb5c80d5238956343e5',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
  _feePayer: '0x60498fefbf1705a3db8d7bb5c80d5238956343e5',
  _feePayerSignatures: [ SignatureData { _v: '0x07f6', _r: '0x793eb...', _s: '0x0f776...' } ],
  _to: '0x294b2618f29714732cfc202d7be53bf5efee90dd',
  _value: '0x0',
  _input: '0x983b2d5600000000000000000000000060498fefbf1705a3db8d7bb5c80d5238956343e5',
  _chainId: '0x3e9',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x2f6'
}
> myContract.methods['methodName'](123).signAsFeePayer({ from: '0x{address in hex}', feeDelegation: true, feePayer: '0x{address in hex}', gas: 1000000 }).then(console.log)
```

## methods.methodName.estimateGas <a href="#methods-methodname-estimategas" id="methods-methodname-estimategas"></a>

```javascript
myContract.methods.methodName([param1 [, param2 [, ...]]]).estimateGas(options [, callback])
```

Klaytn Virtual Machineで実行される場合、メソッド実行がかかるガスを推定します。 見積もりは、後で取引を送るときに使用される実際のガスと異なる場合があります。 その時点でスマートコントラクトの状態は異なります

**パラメータ**

| 名前       | タイプ    | Description                                                              |
| -------- | ------ | ------------------------------------------------------------------------ |
| オプション    | object | (オプション) 通話に使用するオプション。 詳細は以下の表をご覧ください。                                    |
| callback | 関数     | (オプション) このコールバックは、第2引数としてのガス推定の結果で発生します。 または error オブジェクトを最初の引数として指定します。 |

optionsオブジェクトには以下を含めることができます:

| 名前   | タイプ  | Description                                                                                              |
| ---- | ---- | -------------------------------------------------------------------------------------------------------- |
| from | 文字列  | (オプション) コントラクトメソッドを呼び出すアドレス。                                                                             |
| ガス   | 数値   | (オプション) この呼び出しのために提供される最大ガス(ガス制限)。 特定の値を設定すると、ガスエラーを検出するのに役立ちます。 すべてのガスが使用されている場合は、同じ数を返します。             |
| 値    | 数 \ | string \| BN \| Bignumber | (任意) このコントラクト関数を実行するためのトランザクションがKlaytnに送信された場合、スマートコントラクトのアドレスに転送されるpebの値。 |

**戻り値**

`Promise` は `番号` を返します。

| タイプ | Description                    |
| --- | ------------------------------ |
| 数値  | シミュレートされたコール/トランザクションに使用されるガス。 |

**例**

```javascript
> myContract.methods.methodName(123).estimateGas({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
  .then(function(gasAmount) {
...
  })
  .catch(function(error) {
...
  })
```

## methods.methodName.encodeABI <a href="#methods-methodname-encodeabi" id="methods-methodname-encodeabi"></a>

```javascript
myContract.methods.methodName([param1 [, param2[, ...]]]).encodeABI()
```

ABI をこのメソッドのエンコードします。 これはトランザクションを送信したりメソッドを呼び出したり、引数として別のスマートコントラクトメソッドに渡すために使用できます。

**パラメータ**

このスマートコントラクトに属するメソッドのパラメータは、JSON インターフェイスで定義されます。

**戻り値**

| タイプ | Description                              |
| --- | ---------------------------------------- |
| 文字列 | トランザクションまたはコールを介して送信するエンコードされたABIバイトコード。 |

**例**

```javascript
> myContract.methods.methodName(123).encodeABI()
'0x58cf5f10000000000000000000000000000000000000000000000007B'
```

## myContract.once <a href="#mycontract-once" id="mycontract-once"></a>

```javascript
myContract.once(event [, options], callback)
```

イベントを購読し、最初のイベントまたはエラーの直後に購読を解除します。 単一のイベントに対してのみ発火します。

**パラメータ**

| 名前       | タイプ    | Description                                                                                                                                   |
| -------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| イベント     | 文字列    | すべてのイベントを取得するには、コントラクト内のイベントの名前、 `allEvents` を指定します。                                                                                          |
| オプション    | object | (オプション) サブスクリプションに使用されるオプション。 詳細は以下の表をご覧ください。                                                                                                 |
| callback | 関数     | このコールバックは、最初のイベントを 2 番目の引数として、または 1 番目の引数としてエラーが発生します。 イベント構造の詳細については、 [myContract.getPastEvents](caver.contract.md#getpastevents) を参照してください。 |

optionsオブジェクトには以下を含めることができます:

| 名前    | タイプ    | Description                                                                                                                                     |
| ----- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| フィルター | object | (optional) Lets you filter events by indexed parameters, _e.g._, `{filter: {mynumber: [12,13]}}` means all events where "mynumber" is 12 or 13. |
| トピック  | 行列     | (オプション) イベントフィルタのトピックを手動で設定できます。 フィルター プロパティとイベント署名が与えられた場合、 `トピック[0]` は自動的に設定されません。                                                            |

**戻り値**

`Promise` は `オブジェクトを返します。` - イベントオブジェクト。 イベントオブジェクトの詳細については、 [myContract.getPastEvents](caver.contract.md#getpastevents) を参照してください。

**例**

```javascript
> myContract.once('eventName', {
    filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
  }, function(error, event) { console.log(event) })

// event output example
{
    returnValues: {
        myIndexedParam: 20,
        myOtherIndexedParam: '0x123456789...',
        myNonIndexParam: 'My string'
    },
    raw: {
        data: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
        topics: ['0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7', '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385']
    },
    event: 'eventName',
    signature: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    logIndex: 0,
    transactionIndex: 0,
    transactionHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
    blockHash: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    blocknumber: 1234,
    address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
}
```

## myContract.subscribe <a href="#mycontract-subscribe" id="mycontract-subscribe"></a>

```javascript
myContract.subscribe(event [, options], callback)
```

Subscribes to an event. この関数は [myContract.events.eventName](caver.contract.md#mycontract-events) と同じように動作します。

`subscribe` 関数によって返されるサブスクリプションオブジェクトの `unsubscribe` 関数を呼び出すことで、イベントの配信を停止することができます。

**注意** `myContract.subscribe` は caver-js [v1.9.1-rc.1](https://www.npmjs.com/package/caver-js/v/1.9.1-rc.1) からサポートされています。

**パラメータ**

| 名前       | タイプ    | Description                                                                                                                                   |
| -------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| イベント     | 文字列    | すべてのイベントを取得するには、コントラクト内のイベントの名前、 `allEvents` を指定します。                                                                                          |
| オプション    | object | (オプション) サブスクリプションに使用されるオプション。 詳細は以下の表をご覧ください。                                                                                                 |
| callback | 関数     | このコールバックは、最初のイベントを 2 番目の引数として、または 1 番目の引数としてエラーが発生します。 イベント構造の詳細については、 [myContract.getPastEvents](caver.contract.md#getpastevents) を参照してください。 |

optionsオブジェクトには以下を含めることができます:

| 名前    | タイプ    | Description                                                                                                                                     |
| ----- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| フィルター | object | (optional) Lets you filter events by indexed parameters, _e.g._, `{filter: {mynumber: [12,13]}}` means all events where "mynumber" is 12 or 13. |
| トピック  | 行列     | (オプション) イベントフィルタのトピックを手動で設定できます。 フィルター プロパティとイベント署名が与えられた場合、 `トピック[0]` は自動的に設定されません。                                                            |

**戻り値**

`Promise` は `オブジェクトを返します。` - イベントオブジェクト。 イベントオブジェクトの詳細については、 [myContract.getPastEvents](caver.contract.md#getpastevents) を参照してください。

**例**

```javascript
> const subscription = myContract.subscribe('eventName', {
    filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
  }, function(error, event) { console.log(event) })
{
    returnValues: {
        myIndexedParam: 20,
        myOtherIndexedParam: '0x123456789...',
        myNonIndexParam: 'My string'
    },
    raw: {
        data: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
        topics: ['0xfd43a...', '0x7f9fa...']
    },
    event: 'eventName',
    signature: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    logIndex: 0,
    transactionIndex: 0,
    transactionHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
    blockHash: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    blocknumber: 1234,
    address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
}
> subscription.unsubscribe() // unsubscribe the event
```

## myContract.events <a href="#mycontract-events" id="mycontract-events"></a>

```javascript
myContract.events.eventName([options][, callback])
```

Subscribes to an event.

**パラメータ**

| 名前       | タイプ    | Description                                                    |
| -------- | ------ | -------------------------------------------------------------- |
| オプション    | object | (オプション) サブスクリプションに使用されるオプション。 詳細は以下の表をご覧ください。                  |
| callback | 関数     | (オプション) このコールバックは、2 番目の引数として各イベントに対して、または 1 番目の引数としてエラーが発生します。 |

optionsオブジェクトには以下を含めることができます:

| 名前     | タイプ    | Description                                                                                                                                     |
| ------ | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| フィルター  | object | (optional) Lets you filter events by indexed parameters, _e.g._, `{filter: {mynumber: [12,13]}}` means all events where "mynumber" is 12 or 13. |
| ブロックから | 数値     | (オプション) イベントを取得するブロック番号。                                                                                                                        |
| トピック   | 行列     | (オプション) イベントフィルタのトピックを手動で設定できます。 フィルター プロパティとイベント署名が与えられた場合、 `トピック[0]` は自動的に設定されません。                                                            |

**戻り値**

`EventEmitter`: The event emitter has the following events:

| 名前   | タイプ    | Description                                     |
| ---- | ------ | ----------------------------------------------- |
| data | object | 受信する各イベントに event オブジェクトを引数として発生します。             |
| 接続済み | 文字列    | サブスクリプションが正常に接続された後、一度発生します。 サブスクリプションIDを返します。  |
| エラー  | object | Fires when an error in the subscription occurs. |

**注意** `接続した` は caver-js [v1.5.7](https://www.npmjs.com/package/caver-js/v/1.5.7) で利用できます。

返されるイベント `オブジェクト` の構造は、次のようになります。

| 名前               | タイプ      | Description                                                                                                                               |
| ---------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| イベント             | 文字列      | The event name.                                                                                                                           |
| 署名               | 文字列 \   | `null` | The event signature, `null` if it is an anonymous event.                                                                         |
| address          | 文字列      | Address which from this event originated.                                                                                                 |
| returnValues     | object   | The return values coming from the event, _e.g._, `{myVar: 1, myVar2: '0x234...'}`.                                                        |
| logIndex         | 数値       | Integer of the event index position in the block.                                                                                         |
| transactionIndex | 数値       | Integer of the transaction's index position where the event was created.                                                                  |
| transactionHash  | 32バイト文字列 | このイベントが作成されたトランザクションのハッシュ。 `null` when it is still pending.                                                                               |
| blockHash        | 32バイト文字列 | Hash of the block this event was created in. `null` when it is still pending.                                                             |
| blocknumber      | 数値       | The block number this log was created in. `null` when still pending.                                                                      |
| raw.data         | 文字列      | The data containing non-indexed log parameter.                                                                                            |
| raw.topics       | 行列       | 最大 4 つの 32 バイトのトピックと、topic 1-3 の配列には、イベントのインデックス付きパラメータが含まれます。                                                                            |
| id               | 文字列      | A log identifier. It is made through concatenating "log\_" string with `keccak256(blockHash + transactionHash + logIndex).substr(0, 8)` |

**例**

```javascript
> myContract.events.eventName({
    filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
    fromBlock: 0
  }, function(error, event) { console.log(event) })
  .on('connected', function(subscriptionId){
      console.log(subscriptionId)
  })
  .on('data', function(event){
      console.log(event) // same results as the optional callback above
  })
  .on('error', console.error)

// event output example
{
    returnValues: {
        myIndexedParam: 20,
        myOtherIndexedParam: '0x123456789...',
        myNonIndexParam: 'My string'
    },
    raw: {
        data: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
        topics: ['0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7', '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385']
    },
    event: 'eventName',
    signature: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    logIndex: 0,
    transactionIndex: 0,
    transactionHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
    blockHash: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    blocknumber: 1234,
    address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe',
    id: 'log_41d221bc',
}
```

## events.allEvents <a href="#events-allevents" id="events-allevents"></a>

```javascript
myContract.events.allEvents([options] [, callback])
```

[myContract.events](caver.contract.md#mycontract-events) と同じですが、このスマートコントラクトからすべてのイベントを受信します。 Optionally, the filter property can filter those events.

## getPastEvents <a href="#getpastevents" id="getpastevents"></a>

```javascript
myContract.getPastEvents(event [, options] [, callback])
```

Gets past events for this contract.

**パラメータ**

| 名前       | タイプ    | Description                                                                |
| -------- | ------ | -------------------------------------------------------------------------- |
| イベント     | 文字列    | The name of the event in the contract, or `"allEvents"` to get all events. |
| オプション    | object | (オプション) サブスクリプションに使用されるオプション。 詳細は以下の表をご覧ください。                              |
| callback | 関数     | (オプション) このコールバックは、2 番目の引数としてイベントログの配列、または 1 番目の引数としてエラーが発生します。             |

To options object can contain the following:

| 名前      | タイプ    | Description                                                                                                                                     |
| ------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| フィルター   | object | (optional) Lets you filter events by indexed parameters, _e.g._, `{filter: {mynumber: [12,13]}}` means all events where "mynumber" is 12 or 13. |
| ブロックから  | 数値     | (オプション) イベントを取得するブロック番号。                                                                                                                        |
| toBlock | 数値     | (オプション) イベントを最大にするためのブロック番号 (デフォルトは `"latest"`)。                                                                                                |
| トピック    | 行列     | (オプション) イベントフィルタのトピックを手動で設定できます。 フィルター プロパティとイベント署名が与えられた場合、 `トピック[0]` は自動的に設定されません。                                                            |

**戻り値**

`Promise` は `Array` を返します。

イベントオブジェクトには以下を含めることができます:

| 名前               | タイプ    | Description                                                                                                                                     |
| ---------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| イベント             | 文字列    | The event name.                                                                                                                                 |
| 署名               | 文字列 \ | `null` | 匿名イベントの場合はイベントシグネチャ、 `null` です。                                                                                                        |
| address          | 文字列    | このイベントの発信元にアドレスを指定します。                                                                                                                          |
| returnValues     | object | イベントからの戻り値、例: {myVar: 1, myVar2: '0x234...'}。                                                                                                   |
| logIndex         | 数値     | ブロック内のイベントインデックスの位置。                                                                                                                            |
| transactionIndex | 数値     | イベントが作成されたトランザクションのインデックス位置。                                                                                                                    |
| transactionHash  | 文字列    | このイベントが作成されたトランザクションのハッシュ。                                                                                                                      |
| blockHash        | 文字列    | このイベントが作成されたブロックのハッシュ。保留中の場合は null です。                                                                                                          |
| blockNumber      | 数値     | このログが作成されたブロック番号。保留中はnullです。                                                                                                                    |
| raw              | object | オブジェクトは、 `データ` と `トピック` を定義します。 `インデックスされていないログパラメータを含む raw.data`。 `raw.topic` は最大 4 つの 32 バイトのトピックを持つ配列で、topic 1-3 はイベントのインデックス付きパラメータを含んでいます。 |

**例**

```javascript
> myContract.getPastEvents('eventName', {
      filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
      fromBlock: 0,
      toBlock: 'latest'
  }, function(error, events) { console.log(events) })
  .then(function(events) {
      console.log(events) // same results as the optional callback above
  })

[{
    returnValues: {
        myIndexedParam: 20,
        myOtherIndexedParam: '0x123456789...',
        myNonIndexParam: 'My string'
    },
    raw: {
        data: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
        topics: ['0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7', '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385']
    },
    event: 'eventName',
    signature: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    logIndex: 0,
    transactionIndex: 0,
    transactionHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
    blockHash: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    blocknumber: 1234,
    address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
},{
      ...
}]
```
