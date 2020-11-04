# caver.rpc.net

`caver.rpc.net`는 `net` 네임 스페이스를 가진 JSON-RPC API를 호출합니다.

## caver.rpc.net.getNetworkId <a id="caver-rpc-net-getnetworkid"></a>

```javascript
caver.rpc.net.getNetworkId([callback])
```

Return the network identifier \(network ID\) of the Klaytn Node.

**매개변수**

| 명칭       | 형식       | 설명                                                                                                             |
|:-------- |:-------- |:-------------------------------------------------------------------------------------------------------------- |
| callback | function | \(optional\) Optional callback, returns an error object as the first parameter and the result as the second. |

**리턴값**

`프로미스`는 `Number`을 반환합니다.

| 형식     | 설명          |
|:------ |:----------- |
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

Klaytn 노드가 네트워크 연결을 수신하고 있으면 `true`를 반환합니다.

**매개변수**

| 명칭       | 형식       | 설명                                                                                                             |
|:-------- |:-------- |:-------------------------------------------------------------------------------------------------------------- |
| callback | function | \(optional\) Optional callback, returns an error object as the first parameter and the result as the second. |

**리턴값**

`프로미스`는 `boolean`을 반환합니다.

| 형식      | 설명                                                      |
|:------- |:------------------------------------------------------- |
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

현재 Klaytn 노드에 연결된 피어의 수를 반환합니다.

**매개변수**

| 명칭       | 형식       | 설명                                                                                                             |
|:-------- |:-------- |:-------------------------------------------------------------------------------------------------------------- |
| callback | function | \(optional\) Optional callback, returns an error object as the first parameter and the result as the second. |

**리턴값**

`프로미스`는 `String`를 반환합니다.

| 형식  | 설명                             |
|:--- |:------------------------------ |
| 문자열 | 연결된 피어의 개수입니다. 이 값은 16진수 값입니다. |

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

**매개변수**

| 명칭       | 형식       | 설명                                                                                                             |
|:-------- |:-------- |:-------------------------------------------------------------------------------------------------------------- |
| callback | function | \(optional\) Optional callback, returns an error object as the first parameter and the result as the second. |

**리턴값**

`프로미스`는 `Object`를 반환합니다.

| 형식     | 설명                                  |
|:------ |:----------------------------------- |
| object | 유형별 연결된 피어의 수와 연결된 모든 피어의 수를 반환합니다. |

**예시**

```javascript
> caver.rpc.net.getPeerCountByType().then(console.log)
{ en: 1, pn: 2, total: 3 }
```

