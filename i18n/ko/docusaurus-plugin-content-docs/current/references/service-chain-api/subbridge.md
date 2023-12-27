---
description: >-
  서비스 체인 EN과 관련된 API입니다.
---

# subbridge

`subbridge` 네임스페이스는 서비스체인과 관련된 함수를 제공합니다.
이 네임스페이스의 함수를 사용하려면 서비스 체인에 연결된 SEN에서 `subbridge` 옵션이 활성화되어 있어야 합니다.

## subbridge_nodeInfo <a id="subbridge_nodeInfo"></a>

노드의 KNI(Klaytn 네트워크 식별자)를 포함한 브리지 노드 정보를 반환합니다.
서브 브리지 노드는 KNI를 통해 메인 브리지 노드에 연결할 수 있습니다.

**매개변수**

없음

**리턴 값**

| 유형 | 설명 |
| ------ | ------------------------------------ |
| JSON string | 브리지 노드 정보입니다. |

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
메인 브리지 피어 추가가 성공적으로 완료되면 `true`를 반환합니다.

`addPeer` 메서드는 피어 목록에 새 원격 노드를 추가합니다.
노드는 이러한 노드에 대한 연결을 항상 유지하려고 시도하며, 원격 연결이 끊어질 때마다
가끔 원격 연결이 끊어지면 다시 연결합니다.

이 메서드는 추적을 시작할 원격 피어의 `kni` URL이라는 단일 인수를 받고 해당 피어가 추적에 허용되었는지 또는 오류가 발생했는지를 나타내는 `BOOL`을 반환합니다.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| url | String | 피어의 `kni` URL. |

**리턴 값**

| 유형 | 설명 |
| --- | --- |
| bool | 피어가 수락된 경우 `true`, 그렇지 않으면 `false`. |

**예시**

콘솔

```javascript
> mainbridge.addPeer("kni://a979fb...1163c@10.0.0.1:50505") // or 'subbridge.addPeer'
true
```
HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"mainbridge_addPeer","params":["kni://a979fb575495b8d6db44f750317d0f4622bf4c2aa3365d6af7c284339968eef29b69ad0dce72a4d8db5ebb4968de0e3bec910127f134779fbcb0cb6d3331163c@10.0.0.1:50505"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":true}
```

## subbridge_removePeer <a id="subbridge_removePeer"></a>
피어 제거가 성공적으로 완료되면 `true`를 반환합니다.

`removePeer` 메서드는 추적된 정적 노드 목록에서 원격 노드의 연결을 끊고 제거합니다.
이 메서드는 추적을 시작할 원격 피어의 `kni` URL이라는 단일 인수를 받고, 피어가 추적에 허용되었는지 또는 오류가 발생했는지를 나타내는 `BOOL`을 반환합니다.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| url | String | 피어의 `kni` URL. |

**리턴 값**

| 유형 | 설명 |
| --- | --- |
| bool | 피어가 제거된 경우 `true`, 그렇지 않으면 `false`. |

**예시**

콘솔

```javascript
> mainbridge.removePeer("kni://a979fb...1163c@10.0.0.1:50505") // or 'subbridge.removePeer'
true
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"mainbridge_removePeer","params":["kni://a979fb575495b8d6db44f750317d0f4622bf4c2aa3365d6af7c284339968eef29b69ad0dce72a4d8db5ebb4968de0e3bec910127f134779fbcb0cb6d3331163c@10.0.0.1:50505"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":true}
```

## subbridge_parentOperator <a id="subbridge_parentOperator"></a>
`subbridge_parentOperator`는 상위 운영자 계정 주소를 반환합니다.

**매개변수**

없음

**리턴 값**

| 유형 | 설명 |
| --- | --- |
| Account | 상위 체인 운영자 계정 주소. |

**예시**

```javascript
> subbridge.parentOperator
"0xA057995175B93Ee0D1bdfA54f078Ad0F0116130b"
```

## subbridge_childOperator <a id="subbridge_childOperator"></a>
`subbridge_childOperator`는 하위 오퍼레이터 계정 주소를 반환합니다.

**매개변수**

없음

**리턴 값**

| 유형 | 설명 |
| --- | --- |
| Account | 하위 체인 운영자 계정 주소. |

**예시**

```javascript
> subbridge.childOperator
"0x5C1C757a6Cb6c6FcEFE398674D8209FDA2A74Df4"
```

## subbridge_parentOperatorNonce <a id="subbridge_parentOperatorNonce"></a>
`subbridge_parentOperatorNonce`는 부모 오퍼레이터 계정 주소의 nonce를 반환합니다.

**매개변수**

없음

**리턴 값**

| 유형 | 설명 |
| --- | --- |
| QUANTITY | 상위 운영자 계정에서 보낸 트랜잭션 수의 정수입니다. |

**예시**

```javascript
> subbridge.parentOperatorNonce
1348
```

## subbridge_childOperatorNonce <a id="subbridge_childOperatorNonce"></a>
`subbridge_childOperatorNonce`는 하위 오퍼레이터 계정 주소를 반환합니다.

**매개변수**

없음

**리턴 값**

| 유형 | 설명 |
| --- | --- |
| QUANTITY | 하위 운영자 계정에서 보낸 트랜잭션 수의 정수입니다. |

**예시**

```javascript
> subbridge.childOperatorNonce
1024
```

## subbridge_parentOperatorBalance <a id="subbridge_parentOperatorBalance"></a>
`subbridge_parentOperatorBalance`은 부모 오퍼레이터 계정의 잔액을 반환합니다.

**매개변수**

없음

**리턴 값**

| 유형 | 설명 |
| --- | --- |
| QUANTITY | 상위 운영자 계정의 현재 잔액 정수입니다. |

**예시**

```javascript
> subbridge.parentOperatorBalance
1e+50
```

## subbridge_childOperatorBalance <a id="subbridge_childOperatorBalance"></a>
`subbridge_childOperatorBalance`은 하위 오퍼레이터 계정의 잔액을 반환합니다.

**매개변수**

없음

**리턴 값**

| 유형 | 설명 |
| --- | --- |
| QUANTITY | 하위 운영자 계정의 현재 잔액 정수입니다. |

**예시**

```javascript
> subbridge.childOperatorBalance
1e+50
```



## subbridge_sendChainTxslimit <a id="subbridge_sendChainTxslimit"></a>

`sendChainTxslimit`은 한 번에 전송할 보류 중인 트랜잭션의 최대 수를 가져옵니다.

**매개변수**

없음

**리턴 값**

| 유형 | 설명 |
| ------ | ------------------------------------ |
| Uint64 | 한 번에 전송할 보류 중인 트랜잭션의 최대 개수입니다. |

**예시**

```javascript
> subbridge.sendChainTxslimit
100
```

## subbridge_anchoring <a id="subbridge_anchoring"></a>
`subbridge_anchoring`은 서비스 체인의 앵커링 기능을 활성화/비활성화할 수 있습니다.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| enable | Bool | `true`는 앵커링 기능을 활성화하고, `false`는 비활성화합니다.

**리턴 값**

| 유형 | 설명 |
| --- | --- |
| bool | 앵커링이 활성화된 경우 `true`, 그렇지 않으면 `false`. |

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
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"subbridge_anchoring","params":[true],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":true}
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"subbridge_anchoring","params":[false],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":false}
```

## subbridge_latestAnchoredBlockNumber <a id="subbridge_latestAnchoredBlockNumber"></a>
`subbridge_latestAnchoredBlockNumber`는 서비스 체인의 최신 앵커링 블록 번호를 반환합니다.

**매개변수**

없음

**리턴 값**

| 유형 | 설명 |
| --- | --- |
| Uint64 | 최신 앵커 블록 번호입니다. |

**예시**

```javascript
> subbridge.latestAnchoredBlockNumber
71025
```

## subbridge_getReceiptFromParentChain <a id="subbridge_getReceiptFromParentChain"></a>
`subbridge_getReceiptFromParentChain`은 앵커링 트랜잭션의 영수증을 반환합니다.

**매개변수**

| 유형 | 설명 |
| ------ | ------------------------------------ |
| 32-byte DATA | 앵커링 tx 해시에 포함된 자식 체인 블록 해시입니다.  |


**리턴 값**

`Object` - 트랜잭션 영수증 객체, 영수증을 찾을 수 없는 경우 `null`입니다.

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| contractAddress | DATA | 트랜잭션이 컨트랙트 생성인 경우 생성된 컨트랙트 주소, 그렇지 않으면 `null`. (사용되지 않음) |
| gasUsed | QUANTITY | 이 특정 트랜잭션에서만 사용한 가스 양입니다. |
| logs | Array | 이 트랜잭션이 생성한 로그 오브젝트의 배열입니다. |
| logsBloom | 256-byte DATA | 라이트 클라이언트가 관련 로그를 빠르게 검색할 수 있는 블룸 필터. |
| status | QUANTITY | `1`(성공) 또는 `0`(실패) 중 하나입니다. |
| transactionHash | 32-byte DATA | 트랜잭션의 해시. |

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
`subbridge_deployBridge`는 부모와 자식 체인에 브리지 컨트랙트를 배포하고 배포된 브리지 컨트랙트의 주소를 반환합니다. 이 메서드는 또한 브리지 컨트랙트를 서브 브리지에 등록합니다.

**매개변수**

없음

**리턴 값**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| account | 20-byte DATA | 자식 체인에 있는 브리지 컨트랙트의 주소. |
| account | 20-byte DATA | 부모 체인에 있는 브리지 컨트랙트의 주소. |

**예시**

```javascript
> subbridge.deployBridge()
["0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4"]
```

## subbridge_registerBridge <a id="subbridge_registerBridge"></a>
`subbridge_registerBridge`는 부모 및 자식 체인에 이미 배포된 브리지 컨트랙트를 등록합니다.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| account | 20-byte DATA | 자식 체인에 있는 브리지 컨트랙트의 주소. |
| account | 20-byte DATA | 부모 체인에 있는 브리지 컨트랙트의 주소. |

**리턴 값**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| error | Error | 등록에 성공하면 `null`, 그렇지 않으면 오류 객체 반환 |

**예시**

```javascript
> subbridge.registerBridge("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4")
null

> subbridge.registerBridge("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4")
Error: bridge already exists
```

## subbridge_deregisterBridge <a id="subbridge_deregisterBridge"></a>
`subbridge.deregisterBridge`는 부모/자식 체인에 이미 등록된 브리지 컨트랙트의 등록을 취소합니다.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| account | 20-byte DATA | 자식 체인에 있는 브리지 컨트랙트의 주소. |
| account | 20-byte DATA | 부모 체인에 있는 브리지 컨트랙트의 주소. |

**리턴 값**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| error | Error | 등록 취소에 성공하면 `null`, 그렇지 않으면 오류 객체를 반환합니다. |

**예시**

```javascript
> subbridge.deregisterBridge("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4")
null

> subbridge.deregisterBridge("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4")
Error: invalid bridge pair
```

## subbridge_subscribeBridge <a id="subbridge_subscribeBridge"></a>
`subbridge_subscribeBridge`는 부모와 자식 체인에 등록된 브리지 컨트랙트를 구독합니다.
서브 브리지 노드가 브리지 컨트랙트 쌍에 가입되어 있으면, 크로스 체인 밸류 전송 요청은 서브 브리지에서 자동으로 처리됩니다.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| account | 20-byte DATA | 자식 체인에 있는 브리지 컨트랙트의 주소. |
| account | 20-byte DATA | 부모 체인에 있는 브리지 컨트랙트의 주소. |

**리턴 값**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| error | Error | 구독이 성공하면 `null`, 그렇지 않으면 오류 객체 반환 |

**예시**

```javascript
> subbridge.subscribeBridge("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4")
null
> subbridge.subscribeBridge("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4")
Error: already subscribed
```

## subbridge_unsubscribeBridge <a id="subbridge_unsubscribeBridge"></a>
`subbridge_unsubscribeBridge`는 부모와 자식 체인에 있는 브리지 컨트랙트에서 서브 브리지를 구독 취소합니다.
서브 브리지가 브리지 컨트랙트에서 구독을 취소하면 크로스 체인 밸류 전송 요청을 서브 브리지에서 처리할 수 없습니다.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| account | 20-byte DATA | 자식 체인에 있는 브리지 컨트랙트의 주소. |
| account | 20-byte DATA | 부모 체인에 있는 브리지 컨트랙트의 주소. |

**리턴 값**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| error | Error | 구독 취소에 성공하면 `null`, 그렇지 않으면 오류 객체 반환 |

**예시**

```javascript
> subbridge.unsubscribeBridge("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4")
null
```

## subbridge_registerToken <a id="subbridge_registerToken"></a>
`subbridge_registerToken`은 브리지 컨트랙트에 ERC-20 또는 721 토큰 한 쌍을 등록합니다.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| account | 20-byte DATA | 자식 체인에 있는 브리지 컨트랙트의 주소. |
| account | 20-byte DATA | 부모 체인에 있는 브리지 컨트랙트의 주소. |
| account | 20-byte DATA | 자식 체인에 있는 토큰 컨트랙트의 주소. |
| account | 20-byte DATA | 부모 체인에 있는 토큰 컨트랙트의 주소. |

**리턴 값**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| error | Error | 등록에 성공하면 `null`, 그렇지 않으면 오류 객체. |

**예시**

```javascript
> subbridge.registerToken("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4","0xA4b0c6e12346426a09FaD70dAE0651E6Dbdd5198","0x865Cca53828C91663BFf0Ca9808827Bac552BAec")
null
> subbridge.registerToken("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4","0xA4b0c6e12346426a09FaD70dAE0651E6Dbdd5198","0x865Cca53828C91663BFf0Ca9808827Bac552BAec")
Error: token already exists
```

## subbridge_deregisterToken <a id="subbridge_deregisterToken"></a>
`subbridge_deregisterBridge`는 이미 등록된 토큰 쌍을 브리지 컨트랙트에서 등록 취소합니다.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| account | 20-byte DATA | 자식 체인에 있는 브리지 컨트랙트의 주소. |
| account | 20-byte DATA | 부모 체인에 있는 브리지 컨트랙트의 주소. |
| account | 20-byte DATA | 자식 체인에 있는 토큰 컨트랙트의 주소. |
| account | 20-byte DATA | 부모 체인에 있는 토큰 컨트랙트의 주소. |

**리턴 값**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| error | Error | 등록 취소에 성공하면 `null`, 그렇지 않으면 오류 객체를 반환합니다. |

**예시**

```javascript
> subbridge.deregisterToken("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4","0xA4b0c6e12346426a09FaD70dAE0651E6Dbdd5198","0x865Cca53828C91663BFf0Ca9808827Bac552BAec")
null
> subbridge.deregisterToken("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4","0xA4b0c6e12346426a09FaD70dAE0651E6Dbdd5198","0x865Cca53828C91663BFf0Ca9808827Bac552BAec")
Error: invalid token pair
```

## subbridge_convertRequestTxHashToHandleTxHash <a id="subbridge_convertRequestTxHashToHandleTxHash"></a>
`subbridge_convertRequestTxHashToHandleTxHash`는 주어진 "요청 값 전송 트랜잭션" 해시에 대해 반대 체인에 있는 해당 "핸들 값 전송 트랜잭션" 해시를 반환합니다.
"요청 밸류 전송 트랜잭션"은 사용자가 교차 체인 밸류 전송을 요청하여 시작한 트랜잭션입니다.
"밸류 전송 트랜잭션 처리"는 서브 브리지가 사용자의 밸류 전송 요청을 처리하기 위해 생성하는 트랜잭션입니다.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| hash | 32-byte DATA | "요청 값 전송" 트랜잭션의 해시입니다. |


**리턴 값**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| hash | 32-byte DATA | "핸들 값 전송" 트랜잭션의 해시입니다. 해시가 0이면 해당 "핸들 값 전송" 트랜잭션이 없음을 의미합니다. |


**예시**

```javascript
> subbridge.convertRequestTxHashToHandleTxHash("0xae5604f8673098436ee4eaf1b453f1a395afccd6e8eb674c60edd63ebb047622")
"0x97493d1a91d65c149763209be6535efdacf8f1b50c99daa22abf06502010b2ee"
> subbridge.convertRequestTxHashToHandleTxHash("0xc585cfd1e7047b4faae69e62e77db192d8a339701b40d6ab4adb58453b934bec")
"0x0000000000000000000000000000000000000000000000000000000000000000"
```

## subbridge_listBridge <a id="subbridge_listBridge"></a>
`subbridge_listBridge`는 서브 브리지에 등록(저장)된 모든 브리지 컨트랙트 쌍의 목록을 반환합니다.

**매개변수**

nonce

**리턴 값**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| localAddress | account | 20-byte DATA | 자식(서비스) 체인에 있는 브리지 컨트랙트의 주소. |
| localAddress | account | 20-byte DATA | 부모(메인) 체인에 있는 브리지 컨트랙트의 주소입니다. |
| subscribed | bool | 브리지 컨트랙트 쌍이 구독된 경우 `true`, 그렇지 않으면 `false`. |

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
`subbridge_getBridgeInformation` 함수는 주어진 브리지 컨트랙트의 정보를 반환합니다.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| account | 20-byte DATA | 브리지 컨트랙트의 주소 |


**리턴 값**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| counterPart | 20-byte DATA | 상대방 브리지 컨트랙트의 주소. (아직 지원되지 않음) |
| isRunning | bool | 브리지 컨트랙트가 실행 중이면 `true`, 그렇지 않으면 `false`. |
| isSubscribed | bool | 브리지 컨트랙트가 구독 중이면 `true`, 그렇지 않으면 `false`. |
| onServiceChain | bool | 브리지 연락처가 하위(서비스) 체인에 있으면 `true`, 그렇지 않으면 `false`입니다. |
| pendingEventSize | QUANTITY | 브리지 컨트랙트에 의해 생성되었지만 하위 브리지에서 아직 처리되지 않은 보류 중인 "요청 값 전송" 이벤트의 수입니다. |
| requestNonce | QUANTITY | 브리지 컨트랙트의 요청 nonce입니다. |
| handleNonce | QUANTITY | 브리지 컨트랙트의 상위 핸들 nonce입니다. |
| lowerHandleNonce | QUANTITY | 브리지 컨트랙트의 하단 핸들 nonce입니다. |


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
`subbridge_txPendingCount`는 브리지 트랜잭션 풀에서 보류 중인 트랜잭션의 수를 반환합니다.

**매개변수**

없음

**리턴 값**

| 유형 | 설명 |
| --- | --- |
| Uint64 | 브리지 트랜잭션 풀의 보류 중인 트랜잭션 수입니다. |

**예시**

```javascript
> subbridge.txPendingCount
2
```

## subbridge_txPending <a id="subbridge_txPending"></a>
`subbridge_txPending`은 브리지 트랜잭션 풀에서 보류 중인 트랜잭션의 목록을 반환합니다.

**매개변수**

없음

**리턴 값**

| 유형 | 설명 |
| --- | --- |
| JSON string | 브리지 트랜잭션 풀의 보류 중인 트랜잭션 목록입니다. |

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

