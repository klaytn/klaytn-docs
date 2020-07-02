# caver.rpc.net <a id="caver-rpc-net"></a>

`caver.rpc.net` provides JSON-RPC call with `net` name space.

## caver.rpc.net.getNetworkId <a id="caver-rpc-net-getnetworkid"></a>

```javascript
caver.rpc.net.getNetworkId([callback])
```

Return the network identifier (network ID) of the Klaytn Node.

**매개변수**

| 명칭       | 형식       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| callback | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |


**리턴값**

`Promise` returns `number`

| 형식     | 설명              |
| ------ | --------------- |
| number | The network id. |

**예시**

```javascript
> caver.rpc.net.getNetworkId().then(console.log)
1001
```

## caver.rpc.net.isListening <a id="caver-rpc-net-islistening"></a>

```javascript
caver.rpc.net.isListening([callback])
```

Return `true` if the Klaytn Node is actively listening for network connections.

**매개변수**

| 명칭       | 형식       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| callback | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |


**리턴값**

`프로미스`는 `boolean`을 반환합니다.

| 형식      | 설명                                                      |
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

Return the number of peers currently connected to the Klaytn Node.

**매개변수**

| 명칭       | 형식       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| callback | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |


**리턴값**

`프로미스`는 `String`를 반환합니다.

| 형식  | 설명                                    |
| --- | ------------------------------------- |
| 문자열 | The number of connected peers in hex. |

**예시**

```javascript
> caver.rpc.net.getPeerCount().then(console.log)
0x3
```

## caver.rpc.net.getPeerCountByType <a id="caver-rpc-net-getpeercountbytype"></a>

```javascript
caver.rpc.net.getPeerCountByType([callback])
```

Return the number of connected nodes by type and the total number of connected nodes with key/value pairs.

**매개변수**

| 명칭       | 형식       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| callback | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |


**리턴값**

`Promise` returns `object`

| 형식     | 설명                                  |
| ------ | ----------------------------------- |
| object | 유형별 연결된 피어의 수와 연결된 모든 피어의 수를 반환합니다. |

**예시**

```javascript
> caver.rpc.net.getPeerCountByType().then(console.log)
{ en: 1, pn: 2, total: 3 }
```