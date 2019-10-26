---
description: >-
  서비스체인 EN과 관련된 API.
---

# 네임스페이스 서브브리지

네임스페이스 `subbridge`는 서비스체인과 관련된 함수를 제공합니다. 이 네임스페이스에서 함수를 사용하려면, 서비스체인에 연결된 SEN에서 `subbridge` 옵션이 활성화되어 있어야 합니다.

## subbridge_nodeInfo

노드의 KNI (Klaytn Network Identifier)를 포함하여 브리지 노드 정보를 반환합니다. 서브브리지 노드는 KNI를 통해 메인브리지 노드에 연결할 수 있습니다.

**매개변수**

없음

**리턴값**

| 형식       | 설명             |
| -------- | -------------- |
| JSON 문자열 | 브리지 노드에 대한 정보. |

**예시**

```javascript
> subbridge.nodeInfo
{
  kni: "kni://f8a1f0cd1e2bebeece571e4fda16e215218fd4b9bc2eddd924f7cd5b5f950fcec8f4b8cd3851390d1d0bacf1b15e1c4a38c882252e429a28d16eeb6edbacd726@[::]:50505?discport=0",
  id: "f8a1f0cd1e2bebeece571e4fda16e215218fd4b9bc2eddd924f7cd5b5f950fcec8f4b8cd3851390d1d0bacf1b15e1c4a38c882252e429a28d16eeb6edbacd726",
  ip: "::",
  listenAddr: "[::]:50505",
  name: "-2",
  ports: {
    discovery: 0,
    listener: 50505
  },
  protocols: {
    servicechain: {
      config: {
        chainId: 2018,
        deriveShaImpl: 0,
        isBFT: true,
        istanbul: {...},
        unitPrice: 0
      },
      difficulty: 87860,
      genesis: "0x711ce9865492659977abb2758d29f68c2b0c82862d9376f25953579f64f95b58",
      head: "0x0d4b130731f1e7560e4531ac73d55ac8c6daccb178abd86af0d96b7aafded7c5",
      network: 1
    }
  }
}
```

## subbridge_addPeer
메인브리지 피어 추가가 성공적으로 완료되면 `true`을 반환합니다.

`addPeer` 메소드는 새 원격 노드를 피어 목록에 추가합니다. 각 노드는 목록의 노드들과의 연결을 항상 유지하고자 하고, 만약 원격 가끔씩 연결이 끊어지면 다시 연결합니다.

이 메소드는 추적을 시작하기 위해 하나의 인자로 원격 피어의 `kni` URL를 받고, 피어 추적이 허용되었는지 또는 어떤 오류가 발생했는지를 나타내는 `BOOL`을 반환합니다.

**매개변수**

| 명칭  | 형식  | 설명             |
| --- | --- | -------------- |
| url | 문자열 | 피어의 `kni` URL. |

**리턴값**

| 형식  | 설명                                                |
| --- | ------------------------------------------------- |
| 불리언 | 피어 추적이 허용되면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다. |

**예시**

콘솔

```javascript
> mainbridge.addPeer("kni://a979fb...1163c@10.0.0.1:50505") // or 'subbridge.addPeer'
true
```
HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"mainbridge_addPeer","params":["kni://a979fb575495b8d6db44f750317d0f4622bf4c2aa3365d6af7c284339968eef29b69ad0dce72a4d8db5ebb4968de0e3bec910127f134779fbcb0cb6d3331163c@10.0.0.1:50505"],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":true}
```

## subbridge_removePeer
피어 제거가 성공적으로 완료되면 `true`을 반환합니다.

`removePeer` 메소드는 추적된 정적 노드 목록에서 원격 노드의 연결을 끊고 제거합니다. 이 메소드는 추적을 시작하기 위해 하나의 인자로 원격 피어의 `kni` URL를 받고, 피어 추적이 허용되었는지 또는 어떤 오류가 발생했는지를 나타내는 `BOOL`을 반환합니다.

**매개변수**

| 명칭  | 형식  | 설명             |
| --- | --- | -------------- |
| url | 문자열 | 피어의 `kni` URL. |

**리턴값**

| 형식  | 설명                                             |
| --- | ---------------------------------------------- |
| 불리언 | 피어가 제거되면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다. |

**예시**

콘솔

```javascript
> mainbridge.removePeer("kni://a979fb...1163c@10.0.0.1:50505") // or 'subbridge.removePeer'
true
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"mainbridge_removePeer","params":["kni://a979fb575495b8d6db44f750317d0f4622bf4c2aa3365d6af7c284339968eef29b69ad0dce72a4d8db5ebb4968de0e3bec910127f134779fbcb0cb6d3331163c@10.0.0.1:50505"],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":true}
```

## subbridge_sendChainTxslimit

`sendChainTxslimit`은 한 번에 보내기 위해 대기 중인 보류 트랜잭션 수의 최댓값을 가져옵니다.

**매개변수**

없음

**리턴값**

| 형식     | 설명                                |
| ------ | --------------------------------- |
| Uint64 | 한 번에 보내기 위해 대기 중인 보류 트랜잭션 수의 최대값. |

**예시**

```javascript
> subbridge.sendChainTxslimit
100
```

## subbridge_anchoring
`subbridge.anchoring`은 서비스체인의 앵커 기능을 활성화/비활성화할 수 있습니다.

**매개변수**

| 명칭     | 형식   | 설명                                       |
| ------ | ---- | ---------------------------------------- |
| enable | Bool | `true`는 앵커링 기능을 활성화하고, `false`는 비활성화합니다. |

**리턴값**

| 형식  | 설명                                            |
| --- | --------------------------------------------- |
| 불리언 | 앵커링이 활성화될 경우 `true`를, 그렇지 않으면 `false`를 반환합니다. |

**예시**

콘솔

```javascript
> subbridge.anchoring(true)
true
> subbridge.anchoring(false)
false
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"subbridge_anchoring","params":[true],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":true}
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"subbridge_anchoring","params":[false],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":false}
```

## subbridge_latestAnchoredBlockNumber
`subbridge.latestAnchoredBlockNumber`는 서비스체인의 가장 최근에 앵커링된 블록 번호를 반환합니다.

**매개변수**

없음

**리턴값**

| 형식     | 설명                 |
| ------ | ------------------ |
| Uint64 | 가장 최근에 앵커링된 블록 번호. |

**예시**

```javascript
> subbridge.latestAnchoredBlockNumber
71025
```
