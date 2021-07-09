---
description: >-
  서비스체인 EN과 관련된 API.
---

# subbridge <a id="namespace-subbridge"></a>

네임스페이스 `subbridge`는 서비스체인과 관련된 함수를 제공합니다. 이 네임스페이스에 있는 함수를 사용하려면, 서비스체인에 연결된 SEN에서 `subbridge` 옵션이 활성화되어 있어야 합니다.

## subbridge_nodeInfo <a id="subbridge_nodeInfo"></a>

노드의 KNI (Klaytn Network Identifier)를 포함하여 브리지 노드 정보를 반환합니다. 서브브리지 노드는 KNI를 통해 메인브리지 노드에 연결할 수 있습니다.

**매개변수**

없음

**리턴값**

| 타입          | 설명                |
| ----------- | ----------------- |
| JSON string | 브리지 노드에 대한 정보입니다. |

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

## subbridge_addPeer <a id="subbridge_addPeer"></a>
메인브리지 피어 추가가 성공적으로 완료되면 `true`을 반환합니다.

`addPeer` 메소드는 새 원격 노드(remote node)를 피어 목록에 추가합니다. 각 노드는 목록의 노드들과의 연결을 항상 유지하고자 하고, 만약 원격 가끔씩 연결이 끊어지면 다시 연결합니다.

이 메소드는 추적을 시작하기 위해 하나의 인자로 원격 피어의 `kni` URL를 받고, 피어 추적이 허용되었는지 또는 어떤 오류가 발생했는지를 나타내는 `BOOL`을 반환합니다.

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

## subbridge_removePeer <a id="subbridge_removePeer"></a>
피어 제거가 성공적으로 완료되면 `true`을 반환합니다.

`removePeer` 메소드는 추적된 정적 노드 목록에서 원격 노드의 연결을 끊고 제거합니다. 이 메소드는 추적을 시작하기 위해 하나의 인자로 원격 피어의 `kni` URL를 받고, 피어 추적이 허용되었는지 또는 어떤 오류가 발생했는지를 나타내는 `BOOL`을 반환합니다.

**매개변수**

| 이름  | 타입     | 설명             |
| --- | ------ | -------------- |
| url | string | 피어의 `kni` URL. |

**리턴값**

| 타입   | 설명                                             |
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

## subbridge_parentOperator <a id="subbridge_parentOperator"></a>
`subbridge_parentOperator`는 부모 오퍼레이터 계정 주소를 반환합니다.

**매개변수**

없음

**리턴값**

| 타입      | 설명                     |
| ------- | ---------------------- |
| Account | 부모 체인 오퍼레이터 계정의 주소입니다. |

**예시**

```javascript
> subbridge.parentOperator
"0xA057995175B93Ee0D1bdfA54f078Ad0F0116130b"
```

## subbridge_childOperator <a id="subbridge_childOperator"></a>
`subbridge_childOperator`는 자식 오퍼레이터 계정 주소를 반환합니다.

**매개변수**

없음

**리턴값**

| 타입      | 설명                     |
| ------- | ---------------------- |
| Account | 자식 체인 오퍼레이터 계정의 주소입니다. |

**예시**

```javascript
> subbridge.childOperator
"0x5C1C757a6Cb6c6FcEFE398674D8209FDA2A74Df4"
```

## subbridge_parentOperatorNonce <a id="subbridge_parentOperatorNonce"></a>
`subbridge_parentOperatorNonce`는 부모 오퍼레이터 계정 주소의 논스를 반환합니다.

**매개변수**

없음

**리턴값**

| 타입       | 설명                        |
| -------- | ------------------------- |
| QUANTITY | 부모 오퍼레이터 계정에서 보낸 트랜잭션의 수. |

**예시**

```javascript
> subbridge.parentOperatorNonce
1348
```

## subbridge_childOperatorNonce <a id="subbridge_childOperatorNonce"></a>
`subbridge_childOperator`는 자식 오퍼레이터 계정 주소를 반환합니다.

**매개변수**

없음

**리턴값**

| 형식       | 설명                        |
| -------- | ------------------------- |
| QUANTITY | 자식 오퍼레이터 계정에서 보낸 트랜잭션의 수. |

**예시**

```javascript
> subbridge.childOperatorNonce
1024
```

## subbridge_parentOperatorBalance <a id="subbridge_parentOperatorBalance"></a>
`subbridge_parentOperatorBalance`는 부모 오퍼레이터 계정의 잔액을 반환합니다.

**매개변수**

없음

**리턴값**

| 형식       | 설명                           |
| -------- | ---------------------------- |
| QUANTITY | 부모 오퍼레이터 계정의 현재 잔액을 나타내는 정수. |

**예시**

```javascript
> subbridge.parentOperatorBalance
1e+50
```

## subbridge_childOperatorBalance <a id="subbridge_childOperatorBalance"></a>
`subbridge_childOperatorBalance`는 자식 오퍼레이터 계정의 잔액을 반환합니다.

**매개변수**

없음

**리턴값**

| 형식       | 설명                           |
| -------- | ---------------------------- |
| QUANTITY | 자식 오퍼레이터 계정의 현재 잔액을 나타내는 정수. |

**예시**

```javascript
> subbridge.childOperatorBalance
1e+50
```



## subbridge_sendChainTxslimit <a id="subbridge_sendChainTxslimit"></a>

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

## subbridge_anchoring <a id="subbridge_anchoring"></a>
`subbridge_anchoring`은 서비스체인의 앵커링 기능을 활성화/비활성화 합니다.

**매개변수**

| 명칭     | 형식   | 설명                                       |
| ------ | ---- | ---------------------------------------- |
| enable | Bool | `true`는 앵커링 기능을 활성화하고, `false`는 비활성화합니다. |

**리턴값**

| 형식   | 설명                                            |
| ---- | --------------------------------------------- |
| bool | 앵커링이 활성화될 경우 `true`를, 그렇지 않으면 `false`를 반환합니다. |

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

## subbridge_latestAnchoredBlockNumber <a id="subbridge_latestAnchoredBlockNumber"></a>
`subbridge_latestAnchoredBlockNumber`는 서비스체인의 가장 최근에 앵커링된 블록 번호를 반환합니다.

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

## subbridge_getReceiptFromParentChain <a id="subbridge_getReceiptFromParentChain"></a>
`subbridge_getReceiptFromParentChain`은 앵커링 트랜잭션의 영수증을 반환합니다.

**매개변수**

| 형식            | 설명                            |
| ------------- | ----------------------------- |
| 32바이트 크기 DATA | 앵커링 트랜잭션 해시에 포함된 자식 체인 블록 해시. |


**리턴값**

`Object` - 트랜잭션 영수증 객체를 반환하거나 영수증을 찾을 수 없는 경우 `null`을 반환.

| 명칭              | 형식             | 설명                                                                                 |
| --------------- | -------------- | ---------------------------------------------------------------------------------- |
| contractAddress | DATA           | 컨트랙트 생성 트랜잭션이면 생성된 컨트랙트의 주소를 반환합니다. 컨트랙트 생성 트랜잭션이 아닌 경우 `null`을 반환합니다. (사용 중단될 예정) |
| gasUsed         | QUANTITY       | 이 트랜잭션에서만 사용된 가스양입니다.                                                              |
| 로그              | 배열             | 이 트랜잭션이 발생시킨 로그 객체들의 배열입니다.                                                        |
| logsBloom       | 256바이트 크기 DATA | 라이트 클라이언트가 관련된 로그를 빠르게 검색할 수 있도록 하는 블룸필터입니다.                                       |
| 상태              | QUANTITY       | `1` (성공) 또는 `0` (실패)를 나타냅니다.                                                       |
| transactionHash | 32바이트 크기 DATA  | 트랜잭션 해시.                                                                           |

**예시**

```javascript
> subbridge.getReceiptFromParentChain("0x4f300d6574e71d7940c88fe08f27d9ac45cbc7b81d45c17e848d3772f64377b5")
{
  contractAddress: "0x0000000000000000000000000000000000000000",
  gasUsed: "0x9470",
  logs: [],
  logsBloom: "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  status: "0x1",
  transactionHash: "0x3641f52359f44ef2a9941ea840aed4befbace5cac28d5cc8cacd94eae211fd1e"
}
```

## subbridge_deployBridge <a id="subbridge_deployBridge"></a>
`subbridge_deployBridge`는 부모와 자식 체인에 브리지 컨트랙트를 배포하고 주소를 반환합니다. 이 메소드는 또한 브리지 컨트랙트를 서브 브리지에 등록합니다.

**매개변수**

없음

**리턴값**

| 명칭      | 형식            | 설명                      |
| ------- | ------------- | ----------------------- |
| Account | 20바이트 크기 DATA | 자식 체인에 있는 브리지 컨트랙트의 주소. |
| Account | 20바이트 크기 DATA | 부모 체인에 있는 브리지 컨트랙트의 주소. |

**예시**

```javascript
> subbridge.deployBridge()
["0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4"]
```

## subbridge_registerBridge <a id="subbridge_registerBridge"></a>
`subbridge_registerBridge`는 부모/자식 체인에 배포된 브리지 컨트랙트를 등록합니다.

**매개변수**

| 명칭      | 형식            | 설명                      |
| ------- | ------------- | ----------------------- |
| Account | 20바이트 크기 DATA | 자식 체인에 있는 브리지 컨트랙트의 주소. |
| account | 20바이트 크기 DATA | 부모 체인에 있는 브리지 컨트랙트의 주소. |

**리턴값**

| 명칭 | 형식 | 설명                                 |
| -- | -- | ---------------------------------- |
| 에러 | 에러 | 등록에 성공하면 `null`, 그렇지 않으면 Error 객체. |

**예시**

```javascript
> subbridge.registerBridge("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4")
null

> subbridge.registerBridge("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4")
Error: bridge already exists
```

## subbridge_deregisterBridge <a id="subbridge_deregisterBridge"></a>
`subbridge_deregisterBridge`는 부모/자식 체인에 있는 등록된 브리지 컨트랙트를 등록 해지합니다.

**매개변수**

| 명칭      | 형식            | 설명                      |
| ------- | ------------- | ----------------------- |
| Account | 20바이트 크기 DATA | 자식 체인에 있는 브리지 컨트랙트의 주소. |
| Account | 20바이트 크기 DATA | 부모 체인에 있는 브리지 컨트랙트의 주소. |

**리턴값**

| 명칭 | 형식 | 설명                                    |
| -- | -- | ------------------------------------- |
| 에러 | 에러 | 등록 해지에 성공하면 `null`, 그렇지 않으면 Error 객체. |

**예시**

```javascript
> subbridge.deregisterBridge("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4")
null

> subbridge.deregisterBridge("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4")
Error: invalid bridge pair
```

## subbridge_subscribeBridge <a id="subbridge_subscribeBridge"></a>
`subbridge_subscribeBridge`는 부모/자식 체인에 등록된 브리지 컨트랙트를 구독합니다. 서브 브리지 노드가 브리지 컨트랙트 쌍을 구독하면, 서브 브리지는 체인 간 밸류 트랜스퍼 요청을 자동으로 처리합니다.

**매개변수**

| 명칭      | 형식            | 설명                      |
| ------- | ------------- | ----------------------- |
| Account | 20바이트 크기 DATA | 자식 체인에 있는 브리지 컨트랙트의 주소. |
| Account | 20바이트 크기 DATA | 부모 체인에 있는 브리지 컨트랙트의 주소. |

**리턴값**

| 명칭 | 형식 | 설명                                 |
| -- | -- | ---------------------------------- |
| 에러 | 에러 | 구독에 성공하면 `null`, 그렇지 않으면 Error 객체. |

**예시**

```javascript
> subbridge.subscribeBridge("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4")
null
> subbridge.subscribeBridge("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4")
Error: already subscribed
```

## subbridge_unsubscribeBridge <a id="subbridge_unsubscribeBridge"></a>
`subbridge_unsubscribeBridge`는 부모/자식 체인의 브리지 컨트랙트 구독을 해지합니다. 서브 브리지가 브리지 컨트랙트 쌍의 구독을 해지하면, 서브 브리지는 체인 간 밸류 트랜스퍼 요청을 더 이상 처리하지 못합니다.

**매개변수**

| 명칭      | 형식            | 설명                      |
| ------- | ------------- | ----------------------- |
| Account | 20바이트 크기 DATA | 자식 체인에 있는 브리지 컨트랙트의 주소. |
| Account | 20바이트 크기 DATA | 부모 체인에 있는 브리지 컨트랙트의 주소. |

**리턴값**

| 명칭 | 형식 | 설명                                    |
| -- | -- | ------------------------------------- |
| 에러 | 에러 | 구독 해지에 성공하면 `null`, 그렇지 않으면 Error 객체. |

**예시**

```javascript
> subbridge.unsubscribeBridge("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4")
null
```

## subbridge_registerToken <a id="subbridge_registerToken"></a>
`subbridge_registerToken`은 한 쌍의 ERC-20 또는 721 토큰을 브리지 컨트랙트에 등록합니다.

**매개변수**

| 명칭      | 형식            | 설명                      |
| ------- | ------------- | ----------------------- |
| Account | 20바이트 크기 DATA | 자식 체인에 있는 브리지 컨트랙트의 주소. |
| Account | 20바이트 크기 DATA | 부모 체인에 있는 브리지 컨트랙트의 주소. |
| Account | 20바이트 크기 DATA | 자식 체인에 있는 토큰 컨트랙트의 주소.  |
| Account | 20바이트 크기 DATA | 부모 체인에 있는 토큰 컨트랙트의 주소.  |

**리턴값**

| 명칭 | 형식 | 설명                                 |
| -- | -- | ---------------------------------- |
| 에러 | 에러 | 등록에 성공하면 `null`, 그렇지 않으면 Error 객체. |

**예시**

```javascript
> subbridge.registerToken("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4","0xA4b0c6e12346426a09FaD70dAE0651E6Dbdd5198","0x865Cca53828C91663BFf0Ca9808827Bac552BAec")
null
> subbridge.registerToken("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4","0xA4b0c6e12346426a09FaD70dAE0651E6Dbdd5198","0x865Cca53828C91663BFf0Ca9808827Bac552BAec")
Error: token already exists
```

## subbridge_deregisterToken <a id="subbridge_deregisterToken"></a>
`subbridge_deregisterBridge`는 브리지 컨트랙트에 등록된 한 쌍의 토큰 컨트랙트를 등록 취소합니다.

**매개변수**

| 명칭      | 형식            | 설명                      |
| ------- | ------------- | ----------------------- |
| Account | 20바이트 크기 DATA | 자식 체인에 있는 브리지 컨트랙트의 주소. |
| Account | 20바이트 크기 DATA | 부모 체인에 있는 브리지 컨트랙트의 주소. |
| Account | 20바이트 크기 DATA | 자식 체인에 있는 토큰 컨트랙트의 주소.  |
| Account | 20바이트 크기 DATA | 부모 체인에 있는 토큰 컨트랙트의 주소.  |

**리턴값**

| 명칭 | 형식 | 설명                                    |
| -- | -- | ------------------------------------- |
| 에러 | 에러 | 등록 해지에 성공하면 `null`, 그렇지 않으면 Error 객체. |

**예시**

```javascript
> subbridge.deregisterToken("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4","0xA4b0c6e12346426a09FaD70dAE0651E6Dbdd5198","0x865Cca53828C91663BFf0Ca9808827Bac552BAec")
null
> subbridge.deregisterToken("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4","0xA4b0c6e12346426a09FaD70dAE0651E6Dbdd5198","0x865Cca53828C91663BFf0Ca9808827Bac552BAec")
Error: invalid token pair
```

## subbridge_convertRequestTxHashToHandleTxHash <a id="subbridge_convertRequestTxHashToHandleTxHash"></a>
`subbridge_convertRequestTxHashToHandleTxHash`는 주어진 "request value transfer transaction" 해시에 상응하는 반대편 체인에 있는 "handle value transfer transaction" 해시를 리턴합니다. "Request value transfer transaction"은 사용자가 체인 간 밸류 트랜스퍼를 요청하기 위해 생성한 트랜잭션입니다. "Handle value transfer transaction"은 서브 브리지가 사용자의 밸류 트랜스퍼 요청을 처리하기 위해 생성한 트랜잭션입니다.

**매개변수**

| 명칭 | 형식            | 설명                                 |
| -- | ------------- | ---------------------------------- |
| 해시 | 32바이트 크기 DATA | "request value transfer" 트랜잭션의 해시. |


**리턴값**

| 명칭 | 형식            | 설명                                                                                    |
| -- | ------------- | ------------------------------------------------------------------------------------- |
| 해시 | 32바이트 크기 DATA | "handle value transfer" 트랜잭션의 해시. 0 해시는 대응하는 "handle value transfer" 트랜잭션이 없음을 의미합니다. |


**예시**

```javascript
> subbridge.convertRequestTxHashToHandleTxHash("0xae5604f8673098436ee4eaf1b453f1a395afccd6e8eb674c60edd63ebb047622")
"0x97493d1a91d65c149763209be6535efdacf8f1b50c99daa22abf06502010b2ee"
> subbridge.convertRequestTxHashToHandleTxHash("0xc585cfd1e7047b4faae69e62e77db192d8a339701b40d6ab4adb58453b934bec")
"0x0000000000000000000000000000000000000000000000000000000000000000"
```

## subbridge_listBridge <a id="subbridge_listBridge"></a>
`subbridge_listBridge`는 서브 브리지에 등록(저장)되어 있는 모든 브리지 컨트랙트 쌍의 리스트를 반환합니다.

**매개변수**

논스

**리턴값**

| 명칭           | 형식      | 설명                                      |
| ------------ | ------- | --------------------------------------- |
| localAddress | Account | 20-byte DATA | 자식 체인에 있는 브리지 컨트랙트의 주소.  |
| localAddress | Account | 20-byte DATA | 부모 체인에 있는 브리지 컨트랙트의 주소.  |
| subscribed   | bool    | 브리지 컨트랙트 쌍이 구독 중이면 `true`, 아니면 `false`. |

**예시**

```javascript
> subbridge.listBridge
[{
    localAddress: "0x27caeba831d98b5fbb1d81ce0ed20801702f443a",
    remoteAddress: "0x22c41ae528627b790233d2e59ea520be12350eb5",
    subscribed: true
}, {
    localAddress: "0x376b72abe1b29cace831bd3f5acdfa967814c9cd",
    remoteAddress: "0x53160735f7cc6ff75e48619f368bb94daff66a1b",
    subscribed: false
}, {
    localAddress: "0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a",
    remoteAddress: "0x23dab942822021bbd6d551ef51003208924877e4",
    subscribed: false
}]
```

## subbridge_getBridgeInformation <a id="subbridge_getBridgeInformation"></a>
`subbridge_getBridgeInformation`은 주어진 브리지 컨트랙트의 정보를 반환합니다.

**매개변수**

| 명칭      | 형식            | 설명           |
| ------- | ------------- | ------------ |
| Account | 20바이트 크기 DATA | 브리지 컨트랙트의 주소 |


**리턴값**

| 명칭               | 형식            | 설명                                                                                    |
| ---------------- | ------------- | ------------------------------------------------------------------------------------- |
| counterPart      | 20바이트 크기 DATA | 상대방 브리지 컨트랙트의 주소. (아직 지원하지 않음)                                                        |
| isRunning        | bool          | 브리지 컨트랙트가 실행 중이면 `true`, 아니면 `false`.                                                 |
| isSubscribed     | bool          | 브리지 컨트랙트가 구독 중이면 `true`, 아니면 `false`.                                                 |
| onServiceChain   | bool          | 브리지 컨트랙트가 자식 체인에 있으면 `true`, 아니면 `false`.                                             |
| pendingEventSize | QUANTITY      | 브리지 컨트랙트가 생성한 "request value transfer" 이벤트 중 서브 브리지가 아직 처리하지 않아 pending 상태에 있는 것의 개수. |
| requestNonce     | QUANTITY      | 브리지 컨트랙트의 request 논스.                                                                 |
| handleNonce      | QUANTITY      | 브리지 컨트랙트의 upper handle 논스.                                                            |
| lowerHandleNonce | QUANTITY      | 브리지 컨트랙트의 lower handle 논스.                                                            |


**예시**

```javascript
> subbridge.getBridgeInformation("0x27caeba831d98b5fbb1d81ce0ed20801702f443a")
{
  counterPart: "0x0000000000000000000000000000000000000000",
  handleNonce: 0,
  lowerHandleNonce: 0,
  isRunning: true,
  isSubscribed: true,
  onServiceChain: true,
  pendingEventSize: 0,
  requestNonce: 0
}
```

## subbridge_txPendingCount <a id="subbridge_txPendingCount"></a>
`subbridge_txPendingCount`는 브리지 트랜잭션 풀에 있는 pending 트랜잭션 개수를 반환합니다.

**매개변수**

없음

**리턴값**

| 형식     | 설명                              |
| ------ | ------------------------------- |
| Uint64 | 브리지 트랜잭션 풀에 있는 pending 트랜잭션의 수. |

**예시**

```javascript
> subbridge.txPendingCount
2
```

## subbridge_txPending <a id="subbridge_txPending"></a>
`subbridge_txPending`은 브리지 트랜잭션 풀에 있는 pending 트랜잭션 목록을 반환합니다.

**매개변수**

없음

**리턴값**

| 형식       | 설명                              |
| -------- | ------------------------------- |
| JSON 문자열 | 브리지 트랜잭션 풀에 있는 pending 트랜잭션 목록. |

**예시**

```javascript
> subbridge.txPending
{
  0xa057995175b93ee0d1bdfa54f078ad0f0116130b: [{
      from: "0xa057995175b93ee0d1bdfa54f078ad0f0116130b",
      gas: "0x186a0",
      gasPrice: "0x5d21dba00",
      hash: "0x284c8f5bc82ef987c3a14fc8dac7933beb528777745987ff790014441f26ca03",
      input: "0xf8a9a063f41a6ec8e2f8074c30fccf11f2b8479e7ebd8a0e5aa0c171623bc1f3812e33a056e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421a0f845557d8dc2175974f29c2e9d12b1a57f634acaafdf56ae7033201a0796bedea056e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421a09109530b191b47ca3d91012faba70fcf307f13b030f19d932cab38f2c1ece7b78304157c",
      nonce: "0x41589",
      signatures: [{...}],
      type: "TxTypeChainDataAnchoring",
      typeInt: 72
  }, {
      from: "0xa057995175b93ee0d1bdfa54f078ad0f0116130b",
      gas: "0x186a0",
      gasPrice: "0x5d21dba00",
      hash: "0x4dd093916a419608091da28b5d7ffc6e34d894ddaac96328f1904bfef93a4ad0",
      input: "0xf8a9a05b0dd6cc938916e37b17b602690399987b4e8540a14a494626d85e947f721a10a056e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421a063f41a6ec8e2f8074c30fccf11f2b8479e7ebd8a0e5aa0c171623bc1f3812e33a056e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421a09109530b191b47ca3d91012faba70fcf307f13b030f19d932cab38f2c1ece7b78304157d",
      nonce: "0x4158a",
      signatures: [{...}],
      type: "TxTypeChainDataAnchoring",
      typeInt: 72
  }]
}
```

