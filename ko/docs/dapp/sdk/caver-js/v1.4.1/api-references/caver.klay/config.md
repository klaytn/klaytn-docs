## gasPriceAt <a id="gaspriceat"></a>

```javascript
caver.klay.gasPriceAt([defaultBlock] [, callback])
```

주어진 블록 높이에서 유효했던 가스 단가를 peb 단위로 환산해 반환합니다.

**Parameters**

| 이름           | 타입                   | 설명                                                                                                |
| ------------ | -------------------- | ------------------------------------------------------------------------------------------------- |
| defaultBlock | Number &#124; String | (선택 사항) 이 파라미터에 값을 전달하지 않으면 [caver.klay.defaultBlock](./block.md#defaultblock)에 설정된 기본 블록을 사용합니다. |
| callback     | Function             | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다.                              |

**리턴값**

`프로미스`는 `String`을 반환 - 문자열로 표현된 peb 단위 가스 가격입니다.


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

**Parameters**

| 이름       | 타입       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`프로미스`는 `Number`를 반환 - 정수값 형태의 체인 ID입니다.

**예시**

```javascript
> caver.klay.getChainId().then(console.log);
1001
```

## getGasPrice <a id="getgasprice"></a>

```javascript
caver.klay.getGasPrice([callback])
```

Klaytn 네트워크에 정의된 단위 가격을 반환합니다.

**Parameters**

| 이름       | 타입       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`프로미스`는 `String`을 반환 - 문자열로 표현된 현재 peb 단위 가격입니다.

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

**Parameters**

| 이름       | 타입       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`프로미스`는 `String`을 반환 - Klaytn 노드의 현재 클라이언트 버전입니다.


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

**Parameters**

| 이름       | 타입       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`프로미스`는 `String`을 반환 - 노드의 Klaytn 프로토콜 버전입니다.


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

**Parameters**

| 이름       | 타입       | 설명                                                                                                 |
| -------- | -------- | -------------------------------------------------------------------------------------------------- |
| callback | Function | (optional) Optional callback function. 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 하여 실행됩니다. |

**리턴값**

`프로미스`는 `Boolean`을 반환 - `true`는 트랜잭션 수수료 납부자가 서명한 트랜잭션을 찾기 위해 노드가 트랜잭션 발신자 해시를 인덱싱하고 있음을 의미합니다. For detailed information, please see [Klaytn Platform API - klay_getTransactionBySenderTxHash](../../../../../json-rpc/api-references/klay/transaction.md#klay_gettransactionbysendertxhash) and [Klaytn Transactions - Fee Delegation and SenderTxHash](../../../../../../klaytn/design/transactions/README.md#fee-delegation).


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

**Parameters**

| 이름       | 타입       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`프로미스`는 `Boolean`을 반환 - `true`는 노드가 블록체인 데이터를 병렬로 기록하고 있음을 의미합니다. 노드가 순차적으로 블록체인 데이터를 쓰고 있으면 `false`를 반환합니다.


**예시**

```javascript
> caver.klay.isParallelDBWrite().then(console.log);
true
```

## rewardbase <a id="rewardbase"></a>

```javascript
caver.klay.rewardbase([callback])
```

현재 노드의 Rewardbase를 반환합니다. Rewardbase는 블록 보상을 받을 계정 주소입니다. Only the Klaytn Consensus Nodes (CN) have the rewardbase in their configuration. [Configuration File](../../../../../../node/core-cell/operation-guide/configuration.md)를 참조하십시오.


**Parameters**

| 이름       | 타입       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`프로미스`는 `String`을 반환 - 현재 노드의 Rewardbase입니다.

**예시**

```javascript
> caver.klay.rewardbase().then(console.log);
0xed9d108be2a9a7ea5f180ace80f31b66ea107283
```
