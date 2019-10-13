## gasPriceAt

```javascript
caver.klay.gasPriceAt([defaultBlock] [, callback])
```

Returns the unit price of gas in peb that was effective at the given block height.

**Parameters**

| 명칭           | 형식                   | 설명                                                                                                                                     |
| ------------ | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| defaultBlock | Number &#124; String | (optional) If you don't pass this parameter, the default block set by [caver.klay.defaultBlock](./block.md#defaultblock) will be used. |
| callback     | Function             | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다.                                                                   |

**Return Value**

`Promise` returns `String` - A numeric string of the gas price in peb.


**예시**

```javascript
> caver.klay.gasPriceAt().then(console.log);
0x5d21dba00

> caver.klay.gasPriceAt('latest').then(console.log);
0x5d21dba00
```

## getChainId

```javascript
caver.klay.getChainId([callback])
```

Returns the chain ID of the chain.

**Parameters**

| 명칭       | 형식       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**Return Value**

`Promise` returns `Number` - Integer of the chain ID of the chain.

**예시**

```javascript
> caver.klay.getChainId().then(console.log);
1001
```

## getGasPrice

```javascript
caver.klay.getGasPrice([callback])
```

Returns the unit price defined in the Klaytn network.

**Parameters**

| 명칭       | 형식       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**Return Value**

`Promise` returns `String` - Number string of the current unit price in peb.

**예시**

```javascript
> caver.klay.getGasPrice().then(console.log);
"25000000000"
```

## getNodeInfo

```javascript
caver.klay.getNodeInfo([callback])
```

Returns the current client version of a Klaytn node.

**Parameters**

| 명칭       | 형식       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**Return Value**

`Promise` returns `String` - The current client version of a Klaytn node.


**예시**

```javascript
> caver.klay.getNodeInfo().then(console.log);
Klaytn/v0.10.1+fc5c37064e/linux-amd64/go1.11.2
```

## getProtocolVersion

```javascript
caver.klay.getProtocolVersion([callback])
```

Returns the Klaytn protocol version of the node.

**Parameters**

| 명칭       | 형식       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**Return Value**

`Promise` returns `String` - The Klaytn protocol version of the node.


**예시**

```javascript
> caver.klay.getProtocolVersion().then(console.log);
0x40
```

## isSenderTxHashIndexingEnabled

```javascript
caver.klay.isSenderTxHashIndexingEnabled([callback])
```

Returns `true` if the node is indexing sender transaction hash to transaction hash mapping information.

**Parameters**

| 명칭       | 형식       | 설명                                                                                                                                     |
| -------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| callback | Function | (optional) Optional callback function. The callback is fired with an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `Boolean` - `true` means the node is indexing the sender transaction hash to find the fee-payer-signed transaction. For detailed information, please see [Klaytn Platform API - klay_getTransactionBySenderTxHash](../../../../json-rpc/api-references/klay/transaction.md#klay_gettransactionbysendertxhash) and [Klaytn Transactions - Fee Delegation and SenderTxHash](../../../../../klaytn/design/transactions/README.md#fee-delegation).


**예시**

```javascript
> caver.klay.isSenderTxHashIndexingEnabled().then(console.log);
true
```

## isParallelDBWrite

```javascript
caver.klay.isParallelDBWrite([callback])
```

Returns `true` if the node is writing blockchain data in parallel manner. It is enabled by default.

**Parameters**

| 명칭       | 형식       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**Return Value**

`Promise` returns `Boolean` - `true` means the node is writing blockchain data in a parallel manner. Returns `false` if the node is writing the data in a serial manner.


**예시**

```javascript
> caver.klay.isParallelDBWrite().then(console.log);
true
```

## rewardbase

```javascript
caver.klay.rewardbase([callback])
```

Returns the rewardbase of the current node. Rewardbase is the address of the account where the block reward goes to. Only the Klaytn Consensus Nodes (CN) have the rewardbase in their configuration. See [Configuration File](../../../../../node/core-cell/operation-guide/configuration.md).


**Parameters**

| 명칭       | 형식       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**Return Value**

`Promise` returns `String` - The rewardbase of the current node.

**예시**

```javascript
> caver.klay.rewardbase().then(console.log);
0xed9d108be2a9a7ea5f180ace80f31b66ea107283
```

## writeThroughCaching

```javascript
caver.klay.writeThroughCaching([callback])
```
Returns `true` if the node is using write-through caching. If enabled, block bodies and receipts are cached to increase the read performance when they are written to persistent storage. It is `false` by default.

**Parameters**

| 명칭       | 형식       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**Return Value**

`Promise` returns `Boolean` - `true` means the node is using write through caching.

**예시**

```javascript
> caver.klay.writeThroughCaching().then(console.log);
false
```
