---
description: >-
  서비스체인 EN과 관련된 API.
---

# Namespace subbridge <a id="namespace-subbridge"></a>

네임스페이스 `subbridge`는 서비스체인과 관련된 함수를 제공합니다. To use the functions in this namespace, the option `subbridge` should be enabled in the SEN connected to the service chain.

## subbridge_nodeInfo <a id="subbridge_nodeInfo"></a>

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

## subbridge_addPeer <a id="subbridge_addPeer"></a>
메인브리지 피어 추가가 성공적으로 완료되면 `true`을 반환합니다.

`addPeer` 메소드는 새 원격 노드를 피어 목록에 추가합니다. 각 노드는 목록의 노드들과의 연결을 항상 유지하고자 하고, 만약 원격 가끔씩 연결이 끊어지면 다시 연결합니다.

이 메소드는 추적을 시작하기 위해 하나의 인자로 원격 피어의 `kni` URL를 받고, 피어 추적이 허용되었는지 또는 어떤 오류가 발생했는지를 나타내는 `BOOL`을 반환합니다.

**매개변수**

| 명칭  | 형식  | 설명             |
| --- | --- | -------------- |
| url | 문자열 | 피어의 `kni` URL. |

**리턴값**

| 형식   | 설명                                                |
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

## subbridge_parentOperator <a id="subbridge_parentOperator"></a>
The `subbridge_parentOperator` returns the parent operator account address.

**매개변수**

none

**리턴값**

| 형식      | 설명                                     |
| ------- | -------------------------------------- |
| Account | Parent chain operator account address. |

**예시**

```javascript
> subbridge.parentOperator
"0xA057995175B93Ee0D1bdfA54f078Ad0F0116130b"
```

## subbridge_childOperator <a id="subbridge_childOperator"></a>
The `subbridge_childOperator` returns the child operator account address.

**매개변수**

none

**리턴값**

| 형식      | 설명                                    |
| ------- | ------------------------------------- |
| Account | Child chain operator account address. |

**예시**

```javascript
> subbridge.childOperator
"0x5C1C757a6Cb6c6FcEFE398674D8209FDA2A74Df4"
```

## subbridge_parentOperatorNonce <a id="subbridge_parentOperatorNonce"></a>
The `subbridge_parentOperatorNonce` returns the nonce of the parent operator account address.

**매개변수**

none

**리턴값**

| 형식       | 설명                                                                           |
| -------- | ---------------------------------------------------------------------------- |
| QUANTITY | Integer of the number of transactions sent from the parent operator account. |

**예시**

```javascript
> subbridge.parentOperatorNonce
1348
```

## subbridge_childOperatorNonce <a id="subbridge_childOperatorNonce"></a>
The `subbridge_childOperator` returns the child operator account address.

**매개변수**

none

**리턴값**

| 형식       | 설명                                                                          |
| -------- | --------------------------------------------------------------------------- |
| QUANTITY | Integer of the number of transactions sent from the child operator account. |

**예시**

```javascript
> subbridge.childOperatorNonce
1024
```

## subbridge_parentOperatorBalance <a id="subbridge_parentOperatorBalance"></a>
The `subbridge_parentOperatorBalance` returns the balance of the parent operator account.

**매개변수**

none

**리턴값**

| 형식       | 설명                                                             |
| -------- | -------------------------------------------------------------- |
| QUANTITY | Integer of the current balance of the parent operator account. |

**예시**

```javascript
> subbridge.parentOperatorBalance
1e+50
```

## subbridge_childOperatorBalance <a id="subbridge_childOperatorBalance"></a>
The `subbridge_childOperatorBalance` returns the balance of the child operator account.

**매개변수**

none

**리턴값**

| 형식       | 설명                                                            |
| -------- | ------------------------------------------------------------- |
| QUANTITY | Integer of the current balance of the child operator account. |

**예시**

```javascript
> subbridge.childOperatorBalance
1e+50
```



## subbridge_sendChainTxslimit <a id="subbridge_sendChainTxslimit"></a>

The `sendChainTxslimit` gets the maximum number of pending transactions to pick up for sending at once.

**매개변수**

없음

**리턴값**

| 형식     | 설명                                                                        |
| ------ | ------------------------------------------------------------------------- |
| Uint64 | the maximum number of pending transactions to pickup for sending at once. |

**예시**

```javascript
> subbridge.sendChainTxslimit
100
```

## subbridge_anchoring <a id="subbridge_anchoring"></a>
The `subbridge_anchoring` can enable/disable the anchoring feature of the service chain.

**매개변수**

| 명칭     | 형식   | 설명                                                         |
| ------ | ---- | ---------------------------------------------------------- |
| enable | Bool | `true` enables the anchoring feature, `false` disables it. |

**리턴값**

| 형식   | 설명                                                      |
| ---- | ------------------------------------------------------- |
| bool | `true` if the anchoring was enabled, `false` otherwise. |

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
The `subbridge_latestAnchoredBlockNumber` returns the latest anchored block number of the service chain.

**매개변수**

없음

**리턴값**

| 형식     | 설명                                |
| ------ | --------------------------------- |
| Uint64 | The latest anchored block number. |

**예시**

```javascript
> subbridge.latestAnchoredBlockNumber
71025
```

## subbridge_getReceiptFromParentChain <a id="subbridge_getReceiptFromParentChain"></a>
The `subbridge_getReceiptFromParentChain` returns the receipt of the anchoring transaction.

**매개변수**

| 형식            | 설명                                                                  |
| ------------- | ------------------------------------------------------------------- |
| 32바이트 크기 DATA | The child chain block hash that was included the anchoring tx hash. |


**리턴값**

`Object` - A transaction receipt object, or `null` when no receipt was found.

| 명칭              | 형식             | 설명                                                                                          |
| --------------- | -------------- | ------------------------------------------------------------------------------------------- |
| contractAddress | DATA           | 컨트랙트 생성 트랜잭션이면 생성된 컨트랙트의 주소를 반환합니다. 컨트랙트 생성 트랜잭션이 아닌 경우 `null`을 반환합니다. (will be deprecated) |
| gasUsed         | QUANTITY       | 이 트랜잭션에서만 사용된 가스양입니다.                                                                       |
| logs            | 배열             | 이 트랜잭션이 발생시킨 로그 객체들의 배열입니다.                                                                 |
| logsBloom       | 256바이트 크기 DATA | 라이트 클라이언트가 관련된 로그를 빠르게 검색할 수 있도록 하는 블룸필터입니다.                                                |
| status          | QUANTITY       | `1` (성공) 또는 `0` (실패)를 나타냅니다.                                                                |
| transactionHash | 32바이트 크기 DATA  | 트랜잭션의 해시입니다.                                                                                |

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
The `subbridge_deployBridge` deploys a bridge contract to the parent and child chains and returns the addresses of deployed bridge contracts. This method also registers the bridge contracts with the sub-bridge.

**매개변수**

none

**리턴값**

| 명칭           | 형식            | 설명                                          |
| ------------ | ------------- | ------------------------------------------- |
| 계정 (Account) | 20바이트 크기 DATA | Address of bridge contract on child chain.  |
| 계정 (Account) | 20바이트 크기 DATA | Address of bridge contract on parent chain. |

**예시**

```javascript
> subbridge.deployBridge()
["0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4"]
```

## subbridge_registerBridge <a id="subbridge_registerBridge"></a>
The `subbridge_registerBridge` registers already deployed bridge contracts in the parent and child chains.

**매개변수**

| 명칭           | 형식            | 설명                                          |
| ------------ | ------------- | ------------------------------------------- |
| 계정 (Account) | 20바이트 크기 DATA | Address of bridge contract on child chain.  |
| account      | 20바이트 크기 DATA | Address of bridge contract on parent chain. |

**리턴값**

| 명칭    | 형식 | 설명                                                           |
| ----- | -- | ------------------------------------------------------------ |
| error | 에러 | `null` if the registration succeeds, Error object otherwise. |

**예시**

```javascript
> subbridge.registerBridge("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4")
null

> subbridge.registerBridge("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4")
Error: bridge already exists
```

## subbridge_deregisterBridge <a id="subbridge_deregisterBridge"></a>
The `subbridge.deregisterBridge` deregisters already registered bridge contracts in the parent/child chain.

**매개변수**

| 명칭           | 형식            | 설명                                          |
| ------------ | ------------- | ------------------------------------------- |
| 계정 (Account) | 20바이트 크기 DATA | Address of bridge contract on child chain.  |
| 계정 (Account) | 20바이트 크기 DATA | Address of bridge contract on parent chain. |

**리턴값**

| 명칭    | 형식 | 설명                                                             |
| ----- | -- | -------------------------------------------------------------- |
| error | 에러 | `null` if the deregistration succeeds, Error object otherwise. |

**예시**

```javascript
> subbridge.deregisterBridge("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4")
null

> subbridge.deregisterBridge("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4")
Error: invalid bridge pair
```

## subbridge_subscribeBridge <a id="subbridge_subscribeBridge"></a>
The `subbridge_subscribeBridge` subscribes to the registered bridge contracts in the parent and child chains. If the sub-bridge node is subscribed to the bridge contract pair, cross-chain value-transfer requests are handled automatically by the sub-bridge.

**매개변수**

| 명칭           | 형식            | 설명                                          |
| ------------ | ------------- | ------------------------------------------- |
| 계정 (Account) | 20바이트 크기 DATA | Address of bridge contract on child chain.  |
| 계정 (Account) | 20바이트 크기 DATA | Address of bridge contract on parent chain. |

**리턴값**

| 명칭    | 형식 | 설명                                                          |
| ----- | -- | ----------------------------------------------------------- |
| error | 에러 | `null` if the subscribing succeeds, Error object otherwise. |

**예시**

```javascript
> subbridge.subscribeBridge("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4")
null
> subbridge.subscribeBridge("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4")
Error: already subscribed
```

## subbridge_unsubscribeBridge <a id="subbridge_unsubscribeBridge"></a>
The `subbridge_unsubscribeBridge` unsubscribes the sub-bridge from the bridge contracts in the parent and child chains. If the sub-bridge is unsubscribed from the bridge contracts, cross-chain value transfer requests can not be handled by the sub-bridge.

**매개변수**

| 명칭           | 형식            | 설명                                          |
| ------------ | ------------- | ------------------------------------------- |
| 계정 (Account) | 20바이트 크기 DATA | Address of bridge contract on child chain.  |
| 계정 (Account) | 20바이트 크기 DATA | Address of bridge contract on parent chain. |

**리턴값**

| 명칭    | 형식 | 설명                                                            |
| ----- | -- | ------------------------------------------------------------- |
| error | 에러 | `null` if the unsubscribing succeeds, Error object otherwise. |

**예시**

```javascript
> subbridge.unsubscribeBridge("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4")
null
```

## subbridge_registerToken <a id="subbridge_registerToken"></a>
The `subbridge_registerToken` registers a pair of ERC-20 or 721 tokens with the bridge contracts.

**매개변수**

| 명칭           | 형식            | 설명                                          |
| ------------ | ------------- | ------------------------------------------- |
| 계정 (Account) | 20바이트 크기 DATA | Address of bridge contract on child chain.  |
| 계정 (Account) | 20바이트 크기 DATA | Address of bridge contract on parent chain. |
| 계정 (Account) | 20바이트 크기 DATA | Address of token contract on child chain.   |
| 계정 (Account) | 20바이트 크기 DATA | Address of token contract on parent chain.  |

**리턴값**

| 명칭    | 형식 | 설명                                                           |
| ----- | -- | ------------------------------------------------------------ |
| error | 에러 | `null` if the registration succeeds, Error object otherwise. |

**예시**

```javascript
> subbridge.registerToken("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4","0xA4b0c6e12346426a09FaD70dAE0651E6Dbdd5198","0x865Cca53828C91663BFf0Ca9808827Bac552BAec")
null
> subbridge.registerToken("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4","0xA4b0c6e12346426a09FaD70dAE0651E6Dbdd5198","0x865Cca53828C91663BFf0Ca9808827Bac552BAec")
Error: token already exists
```

## subbridge_deregisterToken <a id="subbridge_deregisterToken"></a>
The `subbridge_deregisterBridge` deregisters already registered token pair from the bridge contracts.

**매개변수**

| 명칭           | 형식            | 설명                                          |
| ------------ | ------------- | ------------------------------------------- |
| 계정 (Account) | 20바이트 크기 DATA | Address of bridge contract on child chain.  |
| 계정 (Account) | 20바이트 크기 DATA | Address of bridge contract on parent chain. |
| 계정 (Account) | 20바이트 크기 DATA | Address of token contract on child chain.   |
| 계정 (Account) | 20바이트 크기 DATA | Address of token contract on parent chain.  |

**리턴값**

| 명칭    | 형식 | 설명                                                             |
| ----- | -- | -------------------------------------------------------------- |
| error | 에러 | `null` if the deregistration succeeds, Error object otherwise. |

**예시**

```javascript
> subbridge.deregisterToken("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4","0xA4b0c6e12346426a09FaD70dAE0651E6Dbdd5198","0x865Cca53828C91663BFf0Ca9808827Bac552BAec")
null
> subbridge.deregisterToken("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4","0xA4b0c6e12346426a09FaD70dAE0651E6Dbdd5198","0x865Cca53828C91663BFf0Ca9808827Bac552BAec")
Error: invalid token pair
```

## subbridge_convertRequestTxHashToHandleTxHash <a id="subbridge_convertRequestTxHashToHandleTxHash"></a>
The `subbridge_convertRequestTxHashToHandleTxHash` returns the corresponding "handle value transfer transaction" hash in the opposite chain for the given "request value transfer transaction" hash. "Request value transfer transaction" is a transaction initiated by a user, requesting a cross-chain value transfer. "Handle value transfer transaction" is the transaction created by the sub-bridge to handle the value transfer request from the user.

**매개변수**

| 명칭 | 형식            | 설명                                              |
| -- | ------------- | ----------------------------------------------- |
| 해시 | 32바이트 크기 DATA | Hash of a "request value transfer" transaction. |


**리턴값**

| 명칭 | 형식            | 설명                                                                                                                            |
| -- | ------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| 해시 | 32바이트 크기 DATA | Hash of a "handle value transfer" transaction. zero hash means there is no corresponding "handle value transfer" transaction. |


**예시**

```javascript
> subbridge.convertRequestTxHashToHandleTxHash("0xae5604f8673098436ee4eaf1b453f1a395afccd6e8eb674c60edd63ebb047622")
"0x97493d1a91d65c149763209be6535efdacf8f1b50c99daa22abf06502010b2ee"
> subbridge.convertRequestTxHashToHandleTxHash("0xc585cfd1e7047b4faae69e62e77db192d8a339701b40d6ab4adb58453b934bec")
"0x0000000000000000000000000000000000000000000000000000000000000000"
```

## subbridge_listBridge <a id="subbridge_listBridge"></a>
The `subbridge_listBridge` returns the list of all bridge contract pairs that are registered (stored) in the sub-bridge.

**매개변수**

nonce

**리턴값**

| 명칭           | 형식           | 설명                                                                       |
| ------------ | ------------ | ------------------------------------------------------------------------ |
| localAddress | 계정 (Account) | 20-byte DATA | Address of the bridge contract on child (service) chain.  |
| localAddress | 계정 (Account) | 20-byte DATA | Address of the bridge contract on parent (main) chain.    |
| subscribed   | bool         | `true` if the pair of bridge contracts is subscribed, `false` otherwise. |

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
The `subbridge_getBridgeInformation` returns the information of the given bridge contract.

**매개변수**

| 명칭           | 형식            | 설명                           |
| ------------ | ------------- | ---------------------------- |
| 계정 (Account) | 20바이트 크기 DATA | Address of a bridge contract |


**리턴값**

| 명칭               | 형식            | 설명                                                                                                                      |
| ---------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------- |
| counterPart      | 20바이트 크기 DATA | Address of the counterpart bridge contract. (Not supported yet)                                                         |
| isRunning        | bool          | `true` if the bridge contract is running, `false` otherwise.                                                            |
| isSubscribed     | bool          | `true` if the bridge contract is subscribed, `false` otherwise.                                                         |
| onServiceChain   | bool          | `true` if the bridge contact is on child (service) chain, `false` otherwise.                                            |
| pendingEventSize | QUANTITY      | Number of pending "request value transfer" events generated by the bridge contracts, not handled yet by the sub-bridge. |
| requestNonce     | QUANTITY      | Request nonce of the bridge contract.                                                                                   |
| handleNonce      | QUANTITY      | Upper handle nonce of the bridge contract.                                                                              |
| lowerHandleNonce | QUANTITY      | Lower handle nonce of the bridge contract.                                                                              |


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
The `subbridge_txPendingCount` returns the number of pending transactions in the bridge transaction pool.

**매개변수**

없음

**리턴값**

| 형식     | 설명                                                                 |
| ------ | ------------------------------------------------------------------ |
| Uint64 | The number of pending transactions in the bridge transaction pool. |

**예시**

```javascript
> subbridge.txPendingCount
2
```

## subbridge_txPending <a id="subbridge_txPending"></a>
The `subbridge_txPending` returns the list of pending transactions in the bridge transaction pool.

**매개변수**

없음

**리턴값**

| 형식       | 설명                                                           |
| -------- | ------------------------------------------------------------ |
| JSON 문자열 | List of pending transactions in the bridge transaction pool. |

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

