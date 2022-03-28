---
description: >-
  네트워크 환경을 조회하는 데에 사용되는 API입니다.
---

# net <a id="namespace-net"></a>

`net` namespace는 Klaytn 네트워크와 관련된 함수들을 제공합니다.


## net_networkID <a id="net_networkid"></a>

네트워크 식별자(네트워크 ID)를 반환합니다.

**Parameters**

없음

**리턴값**

| 타입       | 설명                                                                                                                                |
| -------- | --------------------------------------------------------------------------------------------------------------------------------- |
| QUANTITY | The integer of the network identifier.<br> - `"1001"`: Klaytn Baobab testnet.<br> - `"8217"`: Klaytn Cypress mainnet. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"net_networkID","params":[],"id":67}' https://api.baobab.klaytn.net:8651

// Result
{
    "jsonrpc":"2.0",
    "id":67,
    "result":"1001"
}
```


## net_listening <a id="net_listening"></a>

클라이언트가 네트워크 연결을 수신하고 있으면 `true`를 반환합니다.

**Parameters**

없음

**리턴값**

| 타입      | 설명                                                      |
| ------- | ------------------------------------------------------- |
| Boolean | 클라이언트가 연결을 수신 중이면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":67}' https://api.baobab.klaytn.net:8651

// Result
{
    "id":67,
    "jsonrpc":"2.0",
    "result":true
}
```


## net_peerCount <a id="net_peercount"></a>

현재 클라이언트에 연결된 피어의 수를 반환합니다.

**Parameters**

없음

**리턴값**

| 타입       | 설명                 |
| -------- | ------------------ |
| QUANTITY | 연결된 피어의 수의 정숫값입니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":74}' https://api.baobab.klaytn.net:8651

// Result
{
    "id":74,
    "jsonrpc": "2.0",
    "result": "0x3" // 2
}
```

## net_peerCountByType <a id="net_peercountbytype"></a>

유형별 연결된 노드의 수와 연결된 모든 노드 수를 키-밸류 쌍의 형태로 반환합니다.

**Parameters**

없음

**리턴값**

| 타입       | 설명                                  |
| -------- | ----------------------------------- |
| JSON 문자열 | 유형별 연결된 피어의 수와 연결된 모든 피어의 수를 반환합니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"net_peerCountByType","params":[],"id":74}' https://api.baobab.klaytn.net:8651

// Result
{
    "id":74,
    "jsonrpc": "2.0",
    "result": {"en":3,"pn":2,"total":5}
}
```

## net_version <a id="net_version"></a>

현재 Klaytn 프로토콜 버전을 반환합니다.

**Parameters**

없음

**리턴값**

| 타입       | 설명                                                                                                                                     |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| QUANTITY | The integer of the klaytn protocol version.<br> - `"1001"`: Klaytn Baobab testnet.<br> - `"8217"`: Klaytn Cypress mainnet. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}' https://api.baobab.klaytn.net:8651
// Result
{
    "jsonrpc":"2.0",
    "id":67,
    "result":"1001"
}
```