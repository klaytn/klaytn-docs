# caver.rpc.net

`caver.rpc.net`은 `net` 네임스페이스와 함께 JSON-RPC 호출을 제공합니다.

## caver.rpc.net.getNetworkId <a id="caver-rpc-net-getnetworkid"></a>

```javascript
caver.rpc.net.getNetworkId([callback])
```

클레이튼 노드의 네트워크 식별자(네트워크 ID)를 반환합니다.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |


**리턴 값**

`Promise`는 `number`를 반환합니다.

| 유형 | 설명 |
| --- | --- |
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

클레이튼 노드가 네트워크 연결을 적극적으로 수신 대기 중이면 `true`를 반환합니다.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |


**리턴 값**

`Promise`는 `boolean`을 반환합니다.

| 유형 | 설명 |
| --- | --- |
| bool | 들을 때 `true`, 그렇지 않으면 `false`. |

**예시**

```javascript
> caver.rpc.net.isListening().then(console.log)
true
```

## caver.rpc.net.getPeerCount <a id="caver-rpc-net-getpeercount"></a>

```javascript
caver.rpc.net.getPeerCount([callback])
```

현재 클레이튼 노드에 연결된 피어 수를 반환합니다.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |


**리턴 값**

`Promise`는 `string`을 반환합니다.

| 유형 | 설명 |
| --- | --- |
| string | 연결된 피어 수(헥사)입니다. |

**예시**

```javascript
> caver.rpc.net.getPeerCount().then(console.log)
0x3
```

## caver.rpc.net.getPeerCountByType <a id="caver-rpc-net-getpeercountbytype"></a>

```javascript
caver.rpc.net.getPeerCountByType([callback])
```

유형별로 연결된 노드 수와 키/값 쌍으로 연결된 노드의 총 수를 반환합니다.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |


**리턴 값**

`promise`는 `object`를 반환합니다.

| 유형 | 설명 |
| --- | --- |
| object | 유형별 연결된 피어 수와 연결된 총 피어 수입니다. |

**예시**

```javascript
> caver.rpc.net.getPeerCountByType().then(console.log)
{ en: 1, pn: 2, total: 3 }
```
