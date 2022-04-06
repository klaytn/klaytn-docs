# caver.rpc.net <a id="caver-rpc-net"></a>

`caver.rpc.net`는 `net` 네임 스페이스를 가진 JSON-RPC API를 호출합니다.

## caver.rpc.net.getNetworkId <a id="caver-rpc-net-getnetworkid"></a>

```javascript
caver.rpc.net.getNetworkId([callback])
```

Returns the network identifier (network ID) of the Klaytn Node.

**Parameters**

| 이름       | 타입       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| callback | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |


**리턴값**

`Promise`는 `number`를 반환합니다.

| 타입     | 설명          |
| ------ | ----------- |
| number | 네트워크 ID입니다. |

**예시**

```javascript
> caver.rpc.net.getNetworkId().then(console.log)
1001
```

## caver.rpc.net.isListening <a id="caver-rpc-net-islistening"></a>

```javascript
caver.rpc.net.isListening([callback])
```

Returns `true` if the Klaytn Node is actively listening for network connections.

**Parameters**

| 이름       | 타입       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| callback | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |


**리턴값**

`Promise`는 `boolean`을 반환합니다.

| 타입      | 설명                                                      |
| ------- | ------------------------------------------------------- |
| boolean | 클라이언트가 연결을 수신 중이면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다. |

**예시**

```javascript
> caver.rpc.net.isListening().then(console.log)
true
```

## caver.rpc.net.getPeerCount <a id="caver-rpc-net-getpeercount"></a>

```javascript
caver.rpc.net.getPeerCount([callback])
```

Returns the number of peers currently connected to the Klaytn Node.

**Parameters**

| 이름       | 타입       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| callback | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |


**리턴값**

`Promise`는 `string`을 반환합니다.

| 타입     | 설명                             |
| ------ | ------------------------------ |
| string | 연결된 피어의 개수입니다. 이 값은 16진수 값입니다. |

**예시**

```javascript
> caver.rpc.net.getPeerCount().then(console.log)
0x3
```

## caver.rpc.net.getPeerCountByType <a id="caver-rpc-net-getpeercountbytype"></a>

```javascript
caver.rpc.net.getPeerCountByType([callback])
```

유형별 연결된 노드의 수와 연결된 모든 노드 수를 키-밸류 쌍의 형태로 반환합니다.

**Parameters**

| 이름       | 타입       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| callback | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |


**리턴값**

`Promise`는 `object`를 반환합니다.

| 타입 | 설명                                  |
| -- | ----------------------------------- |
| 객체 | 유형별 연결된 피어의 수와 연결된 모든 피어의 수를 반환합니다. |

**예시**

```javascript
> caver.rpc.net.getPeerCountByType().then(console.log)
{ en: 1, pn: 2, total: 3 }
```