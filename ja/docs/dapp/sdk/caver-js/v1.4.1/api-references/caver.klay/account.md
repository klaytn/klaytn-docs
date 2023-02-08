## defaultAccount <a id="defaultaccount"></a>

```javascript
caver.klay.defaultAccount
```

This default address is used as the default `from` property, if no `from` property is specified in parameters of the following methods:

- [caver.klay.sendTransaction()](./sendtx_legacy.md#sendtransaction-legacy)
- [caver.klay.call()](./transaction.md#call)
- [new caver.klay.Contract()](../caver.klay.Contract.md#new-contract) -> [myContract.methods.myMethod().call()](../caver.klay.Contract.md#methods-mymethod-call)
- [new caver.klay.Contract()](../caver.klay.Contract.md#new-contract) -> [myContract.methods.myMethod().send()](../caver.klay.Contract.md#methods-mymethod-send)

**Property**

20byte `String` - Any Klaytn address.  ノードまたはキーストア内の アドレスの秘密鍵を持っている必要があります。  デフォルトは `未定義` です。

**Example**

```javascript
> caver.klay.defaultAccount;
undefined

// デフォルトアカウントを設定する
> caver.klay.defaultAccount = '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe';
```

## アカウント作成 <a id="accountcreated"></a>

```javascript
caver.klay.accountCreated(address [, defaultBlock] [, callback])
```

Returns `true` if the account associated with the address is created. It returns `false` otherwise.

**注意** accountアカウントがネットワーク上に存在するかどうかを確認するので、キーペアが作成された場合でも確認できます。 実際のブロックチェーンネットワーク上にアドレスに一致するアカウントが存在しない場合は、false が返されます。

**Parameters**

| Name         | Type          | Description                                                                                                |
| ------------ | ------------- | ---------------------------------------------------------------------------------------------------------- |
| address      | String        | The address of the account you want to query to see if it has been created on the network.                 |
| defaultBlock | 数値 &#124; 文字列 | (オプション) このパラメータを渡すと、 [caver.klay.defaultBlock](./block.md#defaultblock) で設定されたデフォルトのブロックは使用しません。           |
| callback     | Function      | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` は `Boolean` - 入力アドレスの存在。

**Example**

```javascript
> caver.klay.accountCreated('0x7e6ea9e6f24567cd9edb92e6e2d9b94bdae8a47f').then(console.log);
true

> caver.klay.accountCreated('0x6a616d696e652e6b6c6179746t000000').then(console.log);
false
```

## getAccount <a id="getaccount"></a>

```javascript
caver.klay.getAccount(address[, defaultBlock] [, callback])
```

Returns the account information of a given address. There are two different account types in Klaytn: Externally Owned Account (EOA) and Smart Contract Account. [Klaytn アカウント](../../../../../../klaytn/design/accounts.md#klaytn-accounts) を参照してください。

**注意** getAccount はネットワーク上に存在するアカウントを返します。 実際のブロックチェーンネットワーク上にアドレスに一致するアカウントが存在しない場合、nullが返されます。

**Parameters**

| Name         | Type                 | Description                                                                                                                           |
| ------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| address      | String               | The address of the account for which you want to get account information.                                                             |
| defaultBlock | Number &#124; String | (optional) If you pass this parameter, it will not use the default block set with [caver.klay.defaultBlock](./block.md#defaultblock). |
| callback     | Function             | (optional) Optional callback, returns an error object as the first parameter and the result as the second.                            |

**Return Value**

`Promise` は JSON オブジェクト - アカウント情報を含む JSON オブジェクトを返します。

**Example**

```javascript
> caver.klay.getAccount('0x52791fcf7900a64a6bcab8b89a78ae4cc60da01c').then(console.log);
{ 
  accType: 1,
  account:
  { 
     nonce: 3,
     balance: '0x446c3b15f9926687c8e202d20c14b7ffe02e7e3000',
     humanReadable: false,
     key: { keyType: 1, key: {} } 
  } 
}

> caver.klay.getAccount('0x52791fcf7900a64a6bcab8b89a78ae4cc60da01c', 'latest').then(console.log);
{ 
  accType: 1,
  account:
  { 
     nonce: 3,
     balance: '0x446c3b15f9926687c8e202d20c14b7ffe02e7e3000',
     humanReadable: false,
     key: { keyType: 1, key: {} } 
  } 
}
```


## getAccounts <a id="getaccounts"></a>

```javascript
caver.klay.getAccounts([callback])
```

ノードが制御するアカウントのリストを返します。

**Parameters**

| Name     | Type     | Description                                                                                                |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` は `Array` を返します。

**Example**

```javascript
> caver.klay.getAccounts().then(console.log);
["0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe", "0xDCc6960376d6C6dEa93647383FB245CfCed97CF"]
```


## getAccountKey <a id="getaccountkey"></a>

```javascript
caver.klay.getAccountKey(address [, defaultBlock] [, callback])
```

指定されたアドレスの外部所有アカウント(EOA)のアカウントキーを返します。 If the account has AccountKeyLegacy or the account of the given address is a Smart Contract Account, it will return an empty key value. [アカウントキー](../../../../../../klaytn/design/accounts.md#account-key) をご覧ください。

**注意** getAccountKey は、アカウントがネットワーク上に存在する場合、アカウントキーを返すため、キーペアが作成されても返されます。 実際のブロックチェーンネットワーク上にアドレスに一致するアカウントが存在しない場合、nullが返されます。

**Parameters**

| Name         | Type                 | Description                                                                                                                           |
| ------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| address      | String               | アカウントキーを取得したいアカウントのアドレス                                                                                                               |
| defaultBlock | Number &#124; String | (optional) If you pass this parameter, it will not use the default block set with [caver.klay.defaultBlock](./block.md#defaultblock). |
| callback     | Function             | (optional) Optional callback, returns an error object as the first parameter and the result as the second.                            |

**Return Value**

`Promise` は `Object を返します。` - アカウントキーは公開鍵とキータイプで構成されます。

**Example**

```javascript
// AccountKey type: AccountKeyLegacy
> caver.klay.getAccountKey('0x7e6ea9e6f24567cd9edb92e6e2d9b94bdae8a47f').then(console.log);
{ keyType: 1, key: {} }

// AccountKey type: AccountKeyPublic
> caver.klay.getAccountKey('0xe1be6edd35b68cbf69fe9376ed7320476cf18b5c').then(console.log);
{
  keyType: 2,
  key:{
    x:'0xb9a4b266083c05deb3ce95055510c34c84b8bb2ad1e0a687fafaf15118511e59',
    y:'0x7a28526d3d076d019f8856a56f1fefff33c6100e9f3a190e85d9c754aae7513d'
  }
}

// AccountKey type: AccountKeyFail
> caver.klay.getAccountKey('0xf6d69a7a006d7ab2dcef79195698f6c30895e7d5').then(console.log);
{
  keyType: 3,
  key:{}
}

// AccountKey type: AccountKeyWeightedMultiSig
> caver.klay.getAccountKey('0x676b02b1cb59bd86577f15ff17fb0d59d8ca1ab6').then(console.log);
{
  keyType: 4,
  key: {
    threshold: 2,
    keys: [
      {
        weight: 1,
        key: {
          x: '0xae6b72d7ce2c11520ac00cbd1c4da216171a96eae1ae3a0a1f979a554c9063ae',
          y: '0x79ddf38c8717030512f3ca6f304408a3beb51519b918b8d62a55ff4a8c165fea'
        }
      },
      {
        weight: 1,
        key: {
          x: '0xd4256fc43f42b3313b7204e42a82893a8d9b562f6c9b39456ee989339949c67c',
          y: '0xfc5e78e71b26f5a93b5bec454e4d63947576ffd23b4df624579ff4eb67a2a29b'
        }
      },
      {
        weight: 1,
        key: {
          x: '0xd653eae5f0e9cd6bfe4c3929f4c4f28c94f3bd183eafafee2d73db38a020d9d8',
          y: '0xe974e859b5be80755dedaebe937ac49800cbac483ca304179050a177e9ca0270'
        }
      }
    ]
  }
}

// AccountKey type: AccountKeyRoleBased
> caver.klay.getAccountKey('0x73436db2404853b41e4398d3cf094f1cce57f3bd').then(console.log);
{
  keyType: 5,
  key: [
      {
        key: {
          x: '0x819659d4f08e08d4bd97c6ce5ed2c2eb914201a5b3731eb9d208128df24b97dd',
          y: '0x1824267ab9e55f5a3fb1030f0299fa73fc0037305d5b1d90100e2131af41c010'
        },
        keyType: 2
      },
      {
        key: {
          x: '0x73363604ca8776a2883b02046361b7eb6bd11f4fc10700ee51c525bcded134c1',
          y: '0xfc3e3cb3f4f5b709df5a2075107bc73c8618440c08456bafc44ee6f27f9e6326'
        },
        keyType: 2
      },
      {
        key: {
          x: '0x95c920eb2571dff37baecdbbee32897e6e448c6725c5ab73569cc6f659684307',
          y: '0xef7839023c48acf710ad322356c12b7c5b7f475515ba7d5834f41a993f42b8f9'
        },
        keyType: 2
      }
  ]
}
```

## getBalance <a id="getbalance"></a>

```javascript
caver.klay.getBalance(address [, defaultBlock] [, callback])
```
指定されたブロックのアドレスの残高を取得します。

**Parameters**

| Name         | Type                 | Description                                                                                                                           |
| ------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| address      | String               | 残高を取得するためのアドレス                                                                                                                        |
| defaultBlock | Number &#124; String | (optional) If you pass this parameter, it will not use the default block set with [caver.klay.defaultBlock](./block.md#defaultblock). |
| callback     | Function             | (optional) Optional callback, returns an error object as the first parameter and the result as the second.                            |

**Return Value**

`Promise` は `String` - peb 内の指定されたアドレスの現在の残高。

**Example**

```javascript
> caver.klay.getBalance("0x407d73d8a49eeb85d32cf465507dd71d507100c1").then(console.log);
"100000000000000"
```



## getCode <a id="getcode"></a>

```javascript
caver.klay.getCode(address [, defaultBlock] [, callback])
```
特定のアドレスでコードを取得します。

**Parameters**

| Name         | Type                 | Description                                                                                                                           |
| ------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| address      | String               | The address to get the code from.                                                                                                     |
| defaultBlock | Number &#124; String | (optional) If you pass this parameter, it will not use the default block set with [caver.klay.defaultBlock](./block.md#defaultblock). |
| callback     | Function             | (optional) Optional callback, returns an error object as the first parameter and the result as the second.                            |

**Return Value**

`Promise` returns `String` - 指定されたアドレス `アドレス` のデータ。

**Example**

```javascript
> caver.klay.getCode("0xd5677cf67b5aa051bb40496e68ad359eb97cfbf8").then(console.log);
"0x600160008035811a8181146012578301005b601b6001356025565b806000526060078202905091905056"

```



## getTransactionCount <a id="gettransactioncount"></a>

```javascript
caver.klay.getTransactionCount(address [, blockNumber] [, callback])
```
このアドレスから送信されたトランザクションの数を取得します。

**Parameters**

| Name        | Type                 | Description                                                                                                                                                                                                  |
| ----------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| address     | String               | The address to get the number of transactions from.                                                                                                                                                          |
| blockNumber | number &#124; string | (optional) A block number, the string `pending` for the pending nonce, or the string `earliest` or `latest` as in the [default block parameter](./block.md#defaultblock). If omitted, `latest` will be used. |
| callback    | Function             | (optional) Optional callback, returns an error object as the first parameter and the result as the second.                                                                                                   |

**Return Value**

| Type   | Description                 |
| ------ | --------------------------- |
| Number | 指定されたアドレスから送信されたトランザクションの数。 |

**Example**

```javascript
> caver.klay.getTransactionCount("0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe")
  .then(console.log);
1
```

## isContractAccount <a id="iscontractaccount"></a>

```javascript
caver.klay.isContractAccount(address [, defaultBlock] [, callback])
```

Returns `true` if an input account has a non-empty codeHash at the time of a specific block number. It returns `false` if the account is an EOA or a smart contract account which doesn't have codeHash.

**Parameters**

| Name         | Type                 | Description                                                                                                                           |
| ------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| address      | String               | isContractAccountをチェックしたいアカウントのアドレス。                                                                                                  |
| defaultBlock | Number &#124; String | (optional) If you pass this parameter, it will not use the default block set with [caver.klay.defaultBlock](./block.md#defaultblock). |
| callback     | Function             | (optional) Optional callback, returns an error object as the first parameter and the result as the second.                            |

**Return Value**

`Promise` は `Boolean` - `true` を返します。入力パラメータが既存のスマートコントラクトアドレスであることを意味します。

**Example**

```javascript
> caver.klay.isContractAccount('0x7e6ea9e6f24567cd9edb92e6e2d9b94bdae8a47f').then(console.log);
true

> caver.klay.isContract('0x407d73d8a49eeb85d32cf465507dd71d507100c1').then(console.log);
false
```

## sign <a id="sign"></a>

```javascript
caver.klay.sign(message, address [, callback])
```

Klaytn ネットワークに固有の署名付きデータを生成します。 署名がどのように生成されるかについては、 [Klaytn Platform API - klay_sign](../../../../../json-rpc/api-references/klay/account.md#klay_sign) を参照してください。

**注意**: このAPIは、ノードに存在するアカウントを使用してメッセージに署名する機能を提供します。 メッセージに署名するには、ノード内のアカウントをロック解除する必要があります。 トランザクションに署名するには、 [caver.klay.signTransaction](./transaction.md#signtransaction) を使用してください。

**Parameters**

| Name     | Type     | Description                                                                                                |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| message  | String   | Message to sign.                                                                                           |
| address  | String   | メッセージに署名するアカウントのアドレス。                                                                                      |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `String` - アカウントの秘密鍵で署名されたメッセージ署名。

**Example**

```javascript
> caver.klay.sign('Message to sign', '0x1427ac5d0f1c3174ee6ea05d29a9b05fd31d7579').then(console.log)
0xde8bd2f5a45de6b1baea57ed0219735ab60f0ef55c5e31a4b774824abea31bfc34c8bdbca43ed4155e8e6a8e0d11d7aba1911ba025e0487ada2bccc422252b81591b
```
