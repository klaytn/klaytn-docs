## gasPriceAt <a id="gaspriceat"></a>

```javascript
caver.klay.gasPriceAt([defaultBlock] [, callback])
```

Returns the unit price of gas in peb that was effective at the given block height.

**매개변수**

| 명칭           | 형식                   | 설명                                                                                                |
| ------------ | -------------------- | ------------------------------------------------------------------------------------------------- |
| defaultBlock | Number &#124; String | (선택 사항) 이 파라미터에 값을 전달하지 않으면 [caver.klay.defaultBlock](./block.md#defaultblock)에 설정된 기본 블록을 사용합니다. |
| callback     | Function             | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다.                              |

**리턴값**

`Promise` returns `String` - A numeric string of the gas price in peb.


**예시**

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

체인 ID를 반환합니다.

**매개변수**

| 명칭       | 형식       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`Promise` returns `Number` - Integer of the chain ID of the chain.

**예시**

```javascript
> caver.klay.getChainId().then(console.log);
1001
```

## getGasPrice <a id="getgasprice"></a>

```javascript
caver.klay.getGasPrice([callback])
```

Returns the unit price defined in the Klaytn network.

**매개변수**

| 명칭       | 형식       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`Promise` returns `String` - Number string of the current unit price in peb.

**예시**

```javascript
> caver.klay.getGasPrice().then(console.log);
"25000000000"
```

## getNodeInfo <a id="getnodeinfo"></a>

```javascript
caver.klay.getNodeInfo([callback])
```

Klaytn 노드의 현재 클라이언트 버전을 반환합니다.

**매개변수**

| 명칭       | 형식       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`Promise` returns `String` - The current client version of a Klaytn node.


**예시**

```javascript
> caver.klay.getNodeInfo().then(console.log);
Klaytn/v0.10.1+fc5c37064e/linux-amd64/go1.11.2
```

## getProtocolVersion <a id="getprotocolversion"></a>

```javascript
caver.klay.getProtocolVersion([callback])
```

노드의 Klaytn 프로토콜 버전을 반환합니다.

**매개변수**

| 명칭       | 형식       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`Promise` returns `String` - The Klaytn protocol version of the node.


**예시**

```javascript
> caver.klay.getProtocolVersion().then(console.log);
0x40
```

## isSenderTxHashIndexingEnabled <a id="issendertxhashindexingenabled"></a>

```javascript
caver.klay.isSenderTxHashIndexingEnabled([callback])
```

노드가 트랜잭션 해시 맵핑 정보를 SenderTxHash로 색인화하고 있으면 `true`를 반환합니다.

**매개변수**

| 명칭       | 형식       | 설명                                                                                                                                     |
| -------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| callback | Function | (optional) Optional callback function. The callback is fired with an error object as the first parameter and the result as the second. |

**리턴값**

`Promise` returns `Boolean` - `true` means the node is indexing the sender transaction hash to find the fee-payer-signed transaction. For detailed information, please see [Klaytn Platform API - klay_getTransactionBySenderTxHash](../../../../../json-rpc/api-references/klay/transaction.md#klay_gettransactionbysendertxhash) and [Klaytn Transactions - Fee Delegation and SenderTxHash](../../../../../../klaytn/design/transactions/README.md#fee-delegation).


**예시**

```javascript
> caver.klay.isSenderTxHashIndexingEnabled().then(console.log);
true
```

## isParallelDBWrite <a id="isparalleldbwrite"></a>

```javascript
caver.klay.isParallelDBWrite([callback])
```

노드가 병렬로 블록체인 데이터를 쓰고 있으면 `true`를 반환합니다. 이는 기본적으로 활성화되어 있습니다.

**매개변수**

| 명칭       | 형식       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`Promise` returns `Boolean` - `true` means the node is writing blockchain data in a parallel manner. 노드가 순차적으로 블록체인 데이터를 쓰고 있으면 `false`를 반환합니다.


**예시**

```javascript
> caver.klay.isParallelDBWrite().then(console.log);
true
```

## rewardbase <a id="rewardbase"></a>

```javascript
caver.klay.rewardbase([callback])
```

현재 노드의 Rewardbase를 반환합니다. Rewardbase is the address of the account where the block reward goes to. Only the Klaytn Consensus Nodes (CN) have the rewardbase in their configuration. See [Configuration File](../../../../../../node/core-cell/operation-guide/configuration.md).


**매개변수**

| 명칭       | 형식       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`Promise` returns `String` - The rewardbase of the current node.

**예시**

```javascript
> caver.klay.rewardbase().then(console.log);
0xed9d108be2a9a7ea5f180ace80f31b66ea107283
```

## writeThroughCaching <a id="writethroughcaching"></a>

```javascript
caver.klay.writeThroughCaching([callback])
```
노드가 write-through 캐싱을 사용하고 있으면 `true`를 반환합니다. 활성화하면, 블록 바디와 영수증을 퍼시스턴트 스토리지에 저장할 때 읽기 성능을 향상시키기 위해 캐슁됩니다. 기본적으로는 `false`로 설정되어 있습니다.

**매개변수**

| 명칭       | 형식       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`Promise` returns `Boolean` - `true` means the node is using write through caching.

**예시**

```javascript
> caver.klay.writeThroughCaching().then(console.log);
false
```
