# Configuration

## gasPriceAt <a id="gaspriceat"></a>

```javascript
caver.klay.gasPriceAt([defaultBlock] [, callback])
```

주어진 블록 높이에서 유효했던 가스 단가를 peb 단위로 반환합니다.

**매개변수**

| 이름           | 유형               | 설명                                                                                                                 |
| ------------ | ---------------- | ------------------------------------------------------------------------------------------------------------------ |
| defaultBlock | Number \| String | (선택 사항) 이 매개변수를 전달하지 않으면 [caver.klay.defaultBlock](./block.md#defaultblock)에서 설정한 기본 블록이 사용됩니다. |
| callback     | Function         | (선택 사항) 선택적 콜백으로, 첫 번째 파라미터로 오류 객체를 반환하고 두 번째 파라미터로 결과를 반환합니다.                                  |

**리턴 값**

`Promise`는 `String` - 가스 가격을 peb 단위로 표시한 숫자 문자열을 반환합니다.

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

체인의 체인 ID를 반환합니다.

**매개변수**

| 이름       | 유형       | 설명                                                                                |
| -------- | -------- | --------------------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

`Promise`는 체인 ID의 정수인 `Number`를 반환합니다.

**예시**

```javascript
> caver.klay.getChainId().then(console.log);
1001
```

## getGasPrice <a id="getgasprice"></a>

```javascript
caver.klay.getGasPrice([callback])
```

클레이튼 네트워크에 정의된 단가를 반환합니다.

**매개변수**

| 이름       | 유형       | 설명                                                                                |
| -------- | -------- | --------------------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

`Promise`는 현재 단가의 숫자 문자열인 `String`을 반환합니다.

**예시**

```javascript
> caver.klay.getGasPrice().then(console.log);
"25000000000"
```

## getNodeInfo <a id="getnodeinfo"></a>

```javascript
caver.klay.getNodeInfo([callback])
```

Returns the current client version of a Klaytn node.

**매개변수**

| 이름       | 유형       | 설명                                                                                |
| -------- | -------- | --------------------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

`Promise`는 `String`을 반환합니다 - 클레이튼 노드의 현재 클라이언트 버전입니다.

**예시**

```javascript
> caver.klay.getNodeInfo().then(console.log);
Klaytn/v0.10.1+fc5c37064e/linux-amd64/go1.11.2
```

## getProtocolVersion <a id="getprotocolversion"></a>

```javascript
caver.klay.getProtocolVersion([callback])
```

노드의 클레이튼 프로토콜 버전을 반환합니다.
Cypress/Baobab의 현재 버전(v1.9.0 기준)은 `istanbul/65`입니다.

**매개변수**

| 이름       | 유형       | 설명                                                                                |
| -------- | -------- | --------------------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

`Promise`는 노드의 클레이튼 프로토콜 버전인 `String`을 반환합니다.

**예시**

```javascript
> caver.klay.getProtocolVersion().then(console.log);
0x40
```

## isSenderTxHashIndexingEnabled <a id="issendertxhashindexingenabled"></a>

```javascript
caver.klay.isSenderTxHashIndexingEnabled([callback])
```

노드가 발신자 트랜잭션 해시에서 트랜잭션 해시 매핑 정보로 인덱싱하는 경우 `true`를 반환합니다.

**매개변수**

| 이름       | 유형       | 설명                                                                                         |
| -------- | -------- | ------------------------------------------------------------------------------------------ |
| callback | Function | (선택 사항) 선택적 콜백 함수입니다. 콜백은 오류 객체를 첫 번째 매개변수로, 결과를 두 번째 매개변수로 사용하여 실행됩니다. |

**리턴 값**

`Promise`는 `boolean`을 반환합니다 - `true`는 노드가 수수료 납부자가 서명한 트랜잭션을 찾기 위해 발신자 트랜잭션 해시를 인덱싱하고 있다는 의미입니다. For detailed information, please see [Klaytn Platform API - klay_getTransactionBySenderTxHash](../../../../../json-rpc/klay/get-transaction-by-sender-tx-hash) and [Klaytn Transactions - Fee Delegation and SenderTxHash](../../../../../learn/transactions/transactions.md#fee-delegation).

**예시**

```javascript
> caver.klay.isSenderTxHashIndexingEnabled().then(console.log);
true
```

## isParallelDBWrite <a id="isparalleldbwrite"></a>

```javascript
caver.klay.isParallelDBWrite([callback])
```

노드가 블록체인 데이터를 병렬 방식으로 쓰고 있는 경우 `true`를 반환합니다. 기본적으로 활성화되어 있습니다.

**매개변수**

| 이름       | 유형       | 설명                                                                                |
| -------- | -------- | --------------------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

`Promise`는 `boolean`을 반환합니다 - `true`는 노드가 블록체인 데이터를 병렬 방식으로 쓰고 있다는 의미입니다. 노드가 직렬 방식으로 데이터를 쓰는 경우 `false`를 반환합니다.

**예시**

```javascript
> caver.klay.isParallelDBWrite().then(console.log);
true
```

## rewardbase <a id="rewardbase"></a>

```javascript
caver.klay.rewardbase([callback])
```

현재 노드의 rewardbase를 반환합니다. Rewardbase는 블록 보상이 전달되는 계정의 주소입니다. 클레이튼 컨센서스 노드(CN)만이 rewardbase를 구성에 가지고 있습니다. [구성 파일](../../../../../misc/operation/configuration.md)을 참조하세요.

**매개변수**

| 이름       | 유형       | 설명                                                                                |
| -------- | -------- | --------------------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

`Promise`는 현재 노드의 보상 베이스인 `String`을 반환합니다.

**예시**

```javascript
> caver.klay.rewardbase().then(console.log);
0xed9d108be2a9a7ea5f180ace80f31b66ea107283
```
