---
description: 네임스페이스 'net'을 둘러싼 Klaytn API에 대한 JavaScript 래퍼입니다.
---

# caver.klay.net

`caver-klay-net` 패키지를 사용하면 클레이튼 노드의
네트워크 속성과 상호작용할 수 있습니다.

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

| 이름       | 유형       | 설명                                                                                |
| -------- | -------- | --------------------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

`Promise`는 `Number`를 반환합니다 - 네트워크 ID를 반환합니다.

**예시**

```javascript
> caver.klay.net.getId().then(console.log);
1000
```

## isListening <a id="islistening"></a>

```javascript
caver.klay.net.isListening([callback])
```

노드가 피어를 수신 대기 중인지 확인합니다.

**파라미터**

| 이름       | 유형       | 설명                                                                                |
| -------- | -------- | --------------------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

`Promise`는 노드가 피어를 수신 중이면 `boolean` - `true`을 반환합니다.

**예시**

```javascript
> caver.klay.net.isListening().then(console.log);
true
```

## getPeerCount <a id="islistening"></a>

```javascript
caver.klay.net.getPeerCount([callback])
```

연결된 피어 수를 가져옵니다.

**파라미터**

| 이름       | 유형       | 설명                                                                                |
| -------- | -------- | --------------------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

`Promise`는 `number`를 반환합니다 - 연결된 피어의 수입니다.

**예시**

```javascript
> caver.klay.net.getPeerCount().then(console.log);
10
```

## peerCountByType <a id="getpeercount"></a>

```javascript
caver.klay.net.peerCountByType([callback])
```

유형별로 연결된 노드 수와 키/값 쌍으로 연결된 노드의 총 수를 반환합니다.

**매개변수**

| 이름       | 유형       | 설명                                                                                |
| -------- | -------- | --------------------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

`Promise`는 `Object`를 반환합니다 - 유형별 연결된 피어 수와 연결된 총 피어 수를 반환합니다.

**예시**

```javascript
> caver.klay.net.peerCountByType().then(console.log);
{ en: 1, pn: 2, total: 3 }
```
