## gasPriceAt <a id="gaspriceat"></a>

```javascript
caver.klay.gasPriceAt([defaultBlock] [, callback])
```

Returns the unit price of gas in peb that was effective at the given block height.

**Parameters**

| Name         | Type                 | Description                                                                                                                            |
| ------------ | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| defaultBlock | Number &#124; String | (optional) If you don't pass this parameter, the default block set by [caver.klay.defaultBlock](./block.md#defaultblock) will be used. |
| callback     | Function             | (optional) Optional callback, returns an error object as the first parameter and the result as the second.                             |

**Return Value**

`Promise` returns `String` - A numeric string of the gas price in peb.


**Example**

```javascript
> caver.klay.gasPriceAt().then(console.log);
0x5d21dba00

> caver.klay.gasPriceAt('latest').then(console.log);
0x5d21dba00
```

## getChainId <a id="getchainid"></a>

```javascript
caver.klay.getChainId([callback])
```

Returns the chain ID of the chain.

**Parameters**

| Name     | Type     | Description                                                                                                |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `Number` - Integer of the chain ID of the chain.

**Example**

```javascript
> caver.klay.getChainId().then(console.log);
1001
```

## getGasPrice <a id="getgasprice"></a>

```javascript
caver.klay.getGasPrice([callback])
```

Returns the unit price defined in the Klaytn network.

**Parameters**

| Name     | Type     | Description                                                                                                |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `String` - Number string of the current unit price in peb.

**Example**

```javascript
> caver.klay.getGasPrice().then(console.log);
"25000000000"
```

## getNodeInfo <a id="getnodeinfo"></a>

```javascript
caver.klay.getNodeInfo([callback])
```

Returns the current client version of a Klaytn node.

**Parameters**

| Name     | Type     | Description                                                                                                |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `String` - The current client version of a Klaytn node.


**Example**

```javascript
> caver.klay.getNodeInfo().then(console.log);
Klaytn/v0.10.1+fc5c37064e/linux-amd64/go1.11.2
```

## getProtocolVersion <a id="getprotocolversion"></a>

```javascript
caver.klay.getProtocolVersion([callback])
```

Returns the Klaytn protocol version of the node. The current version (as of v1.9.0) of Cypress/Baobab is `istanbul/65`.

**Parameters**

| Name     | Type     | Description                                                                                                |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `String` - The Klaytn protocol version of the node.


**Example**

```javascript
> caver.klay.getProtocolVersion().then(console.log);
0x40
```

## isSenderTxHashIndexingEnabled <a id="issendertxhashindexingenabled"></a>

```javascript
caver.klay.isSenderTxHashIndexingEnabled([callback])
```

Returns `true` if the node is indexing sender transaction hash to transaction hash mapping information.

**Parameters**

| Name     | Type     | Description                                                                                                                            |
| -------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| callback | Function | (optional) Optional callback function. The callback is fired with an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `Boolean` - `true` means the node is indexing the sender transaction hash to find the fee-payer-signed transaction. For detailed information, please see [Klaytn Platform API - klay_getTransactionBySenderTxHash](../../../../../json-rpc/api-references/klay/transaction.md#klay_gettransactionbysendertxhash) and [Klaytn Transactions - Fee Delegation and SenderTxHash](../../../../../../klaytn/design/transactions/README.md#fee-delegation).


**Example**

```javascript
> caver.klay.isSenderTxHashIndexingEnabled().then(console.log);
true
```

## isParallelDBWrite <a id="isparalleldbwrite"></a>

```javascript
caver.klay.isParallelDBWrite([callback])
```

ブロックチェーンデータを並列に書き込む場合、 `true` を返します。 これはデフォルトで有効になっています。

**Parameters**

| Name     | Type     | Description                                                                                                |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` は `Boolean` - `true` を返します。 ノードがデータを連続的に書き込んでいる場合、 `false` を返します。


**Example**

```javascript
> caver.klay.isParallelDBWrite().then(console.log);
true
```

## 報酬ベース <a id="rewardbase"></a>

```javascript
caver.klay.rewardbase([callback])
```

現在のノードのリワードベースを返します。 Rewardbaseは、ブロック報酬が行われるアカウントのアドレスです。 その構成には、Klaytn Consensus Nodes(CN)のみが報酬ベースを持っています。 [構成ファイル](../../../../../../node/core-cell/operation-guide/configuration.md) を参照してください。


**Parameters**

| Name     | Type     | Description                                                                                                |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `String` - 現在のノードの報酬ベース。

**Example**

```javascript
> caver.klay.rewardbase().then(console.log);
0xed9d108be2a9a7ea5f180ace80f31b66ea107283
```