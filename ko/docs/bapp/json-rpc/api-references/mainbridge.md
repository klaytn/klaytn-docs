---
description: >-
  서비스체인과 연결된 메인체인 EN과 관련된 API입니다.
---

# mainbridge <a id="namespace-mainbridge"></a>

`mainbridge` namespace는 서비스체인과 관련된 함수를 제공합니다. 이 네임스페이스에서 함수를 사용하려면, 메인체인(메인넷 또는 Baobab 테스트넷)에 연결된 EN에서 `mainbridge` 옵션이 활성화되어 있어야 합니다).

## mainbridge_nodeInfo <a id="mainbridge_nodeInfo"></a>

노드의 KNI (Klaytn Network Identifier)를 포함하여 브리지 노드 정보를 반환합니다. 메인브리지 노드는 KNI를 통해 서브브리지 노드에 연결할 수 있습니다.

**매개변수**

없음

**리턴값**

| 타입          | 설명                |
| ----------- | ----------------- |
| JSON string | 브리지 노드에 대한 정보입니다. |

**예시**

```javascript
> mainbridge.nodeInfo
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

## mainbridge_addPeer  <a id="mainbridge_addPeer"></a>
서브브리지 피어 추가가 성공적으로 완료되면 `true`를 반환합니다.

피어 목록에 새 원격 노드를 추가합니다. 각 노드는 목록의 노드들과의 연결을 항상 유지하고자 하고, 만약 원격 가끔씩 연결이 끊어지면 다시 연결합니다. 이 메소드는 추적을 시작하기 위해 하나의 인자로 원격 피어의 `kni` URL를 받고, 피어 추적이 허용되었는지 또는 어떤 오류가 발생했는지를 나타내는 `BOOL`을 반환합니다.

**매개변수**

| 이름  | 타입     | 설명                |
| --- | ------ | ----------------- |
| url | string | 피어의 `kni` URL입니다. |

**리턴값**

| 타입   | 설명                                                |
| ---- | ------------------------------------------------- |
| bool | 피어 추적이 허용되면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다. |

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

## mainbridge_removePeer <a id="mainbridge_removePeer"></a>
피어 제거가 성공적으로 완료되면 `true`를 반환합니다.

`removePeer` 메소드는 추적된 정적 노드 목록에서 원격 노드의 연결을 끊고 제거합니다. 이 메소드는 추적을 시작하기 위해 하나의 인자로 원격 피어의 `kni` URL를 받고, 피어 추적이 허용되었는지 또는 어떤 오류가 발생했는지를 나타내는 `BOOL`을 반환합니다.

**매개변수**

| 명칭  | 형식  | 설명             |
| --- | --- | -------------- |
| url | 문자열 | 피어의 `kni` URL. |

**리턴값**

| 형식   | 설명                                             |
| ---- | ---------------------------------------------- |
| bool | 피어가 제거되면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다. |

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

## mainbridge_getChildChainIndexingEnabled <a id="mainbridge_getChildChainIndexingEnabled"></a>

`mainbridge_getChildChainIndexingEnabled`는 앵커링 트랜잭션의 인덱싱이 활성화되어 있는지 여부를 반환합니다.

**매개변수**

없음

**리턴값**

| 형식   | 설명                                            |
| ---- | --------------------------------------------- |
| bool | 인덱싱이 활성화된 경우 `true`를, 그렇지 않으면 `false`를 반환합니다. |

**예시**

```javascript
> mainbridge.getChildChainIndexingEnabled()
true
```

## mainbridge_convertChildChainBlockHashToParentChainTxHash <a id="mainbridge_convertChildChainBlockHashToParentChainTxHash"></a>

주어진 하위 체인 블록 해시의 앵커링 트랜잭션 해시를 반환합니다.

**매개변수**

| 형식            | 설명            |
| ------------- | ------------- |
| 32바이트 크기 DATA | 자식 체인의 블록 해시. |

**리턴값**

| 형식            | 설명                             |
| ------------- | ------------------------------ |
| 32바이트 크기 DATA | 자식 체인의 블록 정보가 포함된 앵커링 트랜잭션 해시. |

**예시**

콘솔

```javascript
> mainbridge.convertChildChainBlockHashToParentChainTxHash("0xeadc6a3a29a20c13824b5df1ba05cca1ed248d046382a4f2792aac8a6e0d1880")
"0x9a68591c0faa138707a90a7506840c562328aeb7621ac0561467c371b0322d51"
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"mainbridge_convertChildChainBlockHashToParentChainTxHash","params":["0xeadc6a3a29a20c13824b5df1ba05cca1ed248d046382a4f2792aac8a6e0d1880"],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":"0x9a68591c0faa138707a90a7506840c562328aeb7621ac0561467c371b0322d51"}
```

