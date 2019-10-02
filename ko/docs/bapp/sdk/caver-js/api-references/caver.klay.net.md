---
description: >-
  A JavaScript wrapper to Klaytn APIs around the namespace 'net'.
---

# caver.klay.net

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


## getId

```javascript
caver.klay.net.getId([callback])
```

Gets the current network ID.

**Parameters**

| 명칭       | 형식       | 설명                                                                                                         |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `Number` - The network ID.

**예시**

```javascript
> caver.klay.net.getId().then(console.log);
1000
```


## isListening

```javascript
caver.klay.net.isListening([callback])
```

Checks if the node is listening for peers.

**Parameters**

| 명칭       | 형식       | 설명                                                                                                         |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `Boolean` - `true` if the node is listening for peers, `false` otherwise.

**예시**

```javascript
> caver.klay.net.isListening().then(console.log);
true
```


## getPeerCount

```javascript
caver.klay.net.getPeerCount([callback])
```

Gets the number of peers connected to.

**Parameters**

| 명칭       | 형식       | 설명                                                                                                         |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `Number` - The number of peers connected to.

**예시**

```javascript
> caver.klay.net.getPeerCount().then(console.log);
10
```

## peerCountByType

```javascript
caver.klay.net.peerCountByType([callback])
```

Returns the number of connected nodes by type and the total number of connected nodes with key/value pairs.

**Parameters**

| 명칭       | 형식       | 설명                                                                                                         |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `Object` - The number of connected peers by type as well as the total number of connected peers.

**예시**

```javascript
> caver.klay.net.peerCountByType().then(console.log);
{ en: 1, pn: 2, total: 3 }
```
