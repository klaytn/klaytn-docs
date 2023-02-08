---
description: >-
  Klaytn API 중 'net' namespace에 해당하는 자바스크립트 래퍼.
---

# caver.klay.net <a id="caver-klay-net"></a>

The `caver-klay-net` package allows you to interact with the Klaytn nodes' network properties.

```javascript
var Net = require('caver-klay-net');

// "Personal.providers.givenProvider" will be set if in a Klaytn supported browser.
var net = new Net(Net.givenProvider || 'ws://some.local-or-remote.node:8552');

// or using the caver package
var Caver = require('caver');
var caver = new Caver(Caver.givenProvider || 'ws://some.local-or-remote.node:8552');
// -> caver.klay.net
```


## getId <a id="getid"></a>

```javascript
caver.klay.net.getId([callback])
```

현재 네트워크 ID를 가져옵니다.

**Parameters**

| Name     | Type     | Description                                                                                                |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`프로미스`는 `Number`를 반환합니다 - 네트워크 ID.

**Example**

```javascript
> caver.klay.net.getId().then(console.log);
1000
```


## isListening <a id="islistening"></a>

```javascript
caver.klay.net.isListening([callback])
```

노드가 피어를 수신하고 있는지 확인합니다.

**Parameters**

| Name     | Type     | Description                                                                                                |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `Boolean` - `true` if the node is listening for peers, `false` otherwise.

**Example**

```javascript
> caver.klay.net.isListening().then(console.log);
true
```


## getPeerCount <a id="getpeercount"></a>

```javascript
caver.klay.net.getPeerCount([callback])
```

연결된 피어 수를 구합니다.

**Parameters**

| Name     | Type     | Description                                                                                                |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`프로미스`는 `Number`를 반환합니다 - 연결된 피어의 수입니다.

**Example**

```javascript
> caver.klay.net.getPeerCount().then(console.log);
10
```

## peerCountByType <a id="peercountbytype"></a>

```javascript
caver.klay.net.peerCountByType([callback])
```

Returns the number of connected nodes by type and the total number of connected nodes with key/value pairs.

**Parameters**

| Name     | Type     | Description                                                                                                |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`프로미스`는 `Object`를 반환합니다 - 타입에 따른 연결된 피어의 수뿐만 아니라 연결된 모든 피어의 수.

**Example**

```javascript
> caver.klay.net.peerCountByType().then(console.log);
{ en: 1, pn: 2, total: 3 }
```
