---
description: >-
  Klaytn API 중 'net' namespace에 해당하는 자바스크립트 래퍼.
---

# caver.klay.net <a id="caver-klay-net"></a>

`caver-klay` 패키지를 사용하면 Klaytn 노드의 네트워크 속성과 상호작용할 수 있습니다.

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

**매개변수**

| 명칭       | 형식       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`프로미스`는 `Number`를 반환합니다 - 네트워크 ID.

**예시**

```javascript
> caver.klay.net.getId().then(console.log);
1000
```


## isListening <a id="islistening"></a>

```javascript
caver.klay.net.isListening([callback])
```

노드가 피어를 수신하고 있는지 확인합니다.

**매개변수**

| 명칭       | 형식       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`Promise`는 `Boolean`을 반환합니다 - 만일 노드가 피어를 수신하고 있는 경우 `true`, 그렇지 않을 경우 `false`.

**예시**

```javascript
> caver.klay.net.isListening().then(console.log);
true
```


## getPeerCount <a id="getpeercount"></a>

```javascript
caver.klay.net.getPeerCount([callback])
```

연결된 피어 수를 구합니다.

**매개변수**

| 명칭       | 형식       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`프로미스`는 `Number`를 반환합니다 - 연결된 피어의 수입니다.

**예시**

```javascript
> caver.klay.net.getPeerCount().then(console.log);
10
```

## peerCountByType <a id="peercountbytype"></a>

```javascript
caver.klay.net.peerCountByType([callback])
```

유형별 연결된 노드의 수와 연결된 모든 노드 수를 키-밸류 쌍의 형태로 반환합니다.

**매개변수**

| 명칭       | 형식       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`프로미스`는 `Object`를 반환합니다 - 타입에 따른 연결된 피어의 수뿐만 아니라 연결된 모든 피어의 수.

**예시**

```javascript
> caver.klay.net.peerCountByType().then(console.log);
{ en: 1, pn: 2, total: 3 }
```
