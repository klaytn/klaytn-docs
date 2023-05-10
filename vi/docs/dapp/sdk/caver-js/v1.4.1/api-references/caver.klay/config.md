## gasPriceAt <a id="gaspriceat"></a>

```javascript
caver.klay.gasPriceAt([defaultBlock] [, callback])
```

Trả về đơn giá của gas tính bằng đơn vị peb có hiệu lực tại chiều cao khối nhất định.

**Tham số**

| Tên          | Loại            | Mô tả                                                                                                                                            |
| ------------ | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| defaultBlock | Số &#124; Chuỗi | (tùy chọn) Nếu bạn truyền tham số này, khối mặc định được thiết lập bằng hàm [caver.klay.defaultBlock](./block.md#defaultblock) sẽ được sử dụng. |
| callback     | Hàm             | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số đầu tiên và kết quả làm tham số thứ hai.                                  |

**Giá trị trả về**

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

Returns `true` if the node is writing blockchain data in parallel manner. It is enabled by default.

**Parameters**

| Name     | Type     | Description                                                                                                |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `Boolean` - `true` means the node is writing blockchain data in a parallel manner. Returns `false` if the node is writing the data in a serial manner.


**Example**

```javascript
> caver.klay.isParallelDBWrite().then(console.log);
true
```

## rewardbase <a id="rewardbase"></a>

```javascript
caver.klay.rewardbase([callback])
```

Returns the rewardbase of the current node. Rewardbase is the address of the account where the block reward goes to. Only the Klaytn Consensus Nodes (CN) have the rewardbase in their configuration. See [Configuration File](../../../../../../node/core-cell/operation-guide/configuration.md).


**Parameters**

| Name     | Type     | Description                                                                                                |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `String` - The rewardbase of the current node.

**Example**

```javascript
> caver.klay.rewardbase().then(console.log);
0xed9d108be2a9a7ea5f180ace80f31b66ea107283
```
