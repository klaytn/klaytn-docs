## klay_chainID <a id="klay_chainid"></a>

체인 ID를 반환합니다.

**Parameters**

없음

**리턴값**

| 타입       | 설명                   |
| -------- | -------------------- |
| QUANTITY | 체인 ID를 정수 형태로 반환합니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_chainID","id":1}' https://api.baobab.klaytn.net:8651

// Result
{
    "jsonrpc":"2.0",
    "id":1,
    "result":"0x7e2"
}
```


## klay_clientVersion <a id="klay_clientversion"></a>

Klaytn 노드의 현재 클라이언트 버전을 반환합니다.

**Parameters**

없음

**리턴값**

| 타입     | 설명                             |
| ------ | ------------------------------ |
| String | Klaytn 노드의 현재 클라이언트 버전을 반환합니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_clientVersion","id":1}' https://api.baobab.klaytn.net:8651

// Result
{
    "jsonrpc":"2.0",
    "id":1,
    "result":"Klaytn/v0.9.1+3518232250/linux-amd64/go1.11.2"
}
```


## klay_gasPrice <a id="klay_gasprice"></a>

peb의 현재 가스 가격을 반환합니다.

**참고**: 이더리움에서 권장 가스비를 반환하던 것과 달리 Klaytn에서는 현재 가스비를 반환하는 형태로, 이더리움과 다르게 동작하는 API 입니다.

**Parameters**

없음

**리턴값**

| 타입       | 설명                           |
| -------- | ---------------------------- |
| QUANTITY | peb의 현재 가스 가격을 정수 형태로 반환합니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_gasPrice","params":[],"id":1}' https://api.baobab.klaytn.net:8651

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0xAE9F7BCC00" // 750,000,000,000 peb = 750 ston
}
```

## klay_gasPriceAt <a id="klay_gaspriceat"></a>

입력으로 받은 peb의 블록의 단가를 반환합니다.

**참고**: 이더리움에서 권장 가스비를 반환하던 것과 달리 Klaytn에서는 현재 가스비를 반환하는 형태로, 이더리움과 다르게 동작하는 API 입니다.

**Parameters**

| 타입     | 설명                              |
| ------ | ------------------------------- |
| NUMBER | 블록 번호입니다. 이를 생략하면 최신 단가가 반환됩니다. |

**리턴값**

| 타입       | 설명                           |
| -------- | ---------------------------- |
| QUANTITY | peb의 현재 가스 가격을 정수 형태로 반환합니다. |

**예시**

```javascript
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_gasPriceAt","params":["0x64"],"id":1}' https://api.baobab.klaytn.net:8651

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0xAE9F7BCC00" // 750,000,000,000 peb = 750 ston
}
```

## klay_isParallelDBWrite <a id="klay_isparalleldbwrite"></a>

노드가 병렬로 블록체인 데이터를 쓰고 있으면 `true`를 반환합니다. 이는 기본적으로 활성화되어 있습니다.

**Parameters**

없음

**리턴값**

| 타입      | 설명                                                                                 |
| ------- | ---------------------------------------------------------------------------------- |
| Boolean | `true`이면 노드가 병렬로 블록체인 데이터를 쓰고 있다는 것입니다. 노드가 순차적으로 블록체인 데이터를 쓰고 있으면 `false`를 반환합니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_isParallelDBWrite","id":1}' https://api.baobab.klaytn.net:8651

// Result
{
    "jsonrpc":"2.0",
    "id":1,
    "result":true
}
```


## klay_isSenderTxHashIndexingEnabled <a id="klay_issendertxhashindexingenabled"></a>

노드가 트랜잭션 해시 맵핑 정보를 SenderTxHash로 색인화하고 있으면 `true`를 반환합니다. 이 설정은 기본적으로 비활성화되어 있으며 `--sendertxhashindexing`으로 활성화할 수 있습니다.

**Parameters**

없음

**리턴값**

| 타입      | 설명                                                        |
| ------- | --------------------------------------------------------- |
| Boolean | `true`이면 노드가 트랜잭션 해시 맵핑 정보를 SenderTxHash로 색인화하고 있다는 것입니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_isSenderTxHashIndexingEnabled","id":1}' https://api.baobab.klaytn.net:8651

// Result
{
    "jsonrpc":"2.0",
    "id":1,
    "result":true
}
```


## klay_protocolVersion <a id="klay_protocolversion"></a>

노드의 Klaytn 프로토콜 버전을 반환합니다.

**Parameters**

없음

**리턴값**

| 타입     | 설명                     |
| ------ | ---------------------- |
| String | 노드의 Klaytn 프로토콜 버전입니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_protocolVersion","params":[],"id":1}' https://api.baobab.klaytn.net:8651

// Result
{
   "jsonrpc":"2.0",
   "id":1,
   "result":"0x40"
}
```


## klay_rewardbase <a id="klay_rewardbase"></a>

현재 노드의 Rewardbase를 반환합니다. Rewardbase는 블록 보상을 받은 계정의 주소입니다. 컨센서스 노드(CN)의 경우에만 해당합니다.

**Parameters**

없음

**리턴값**

| 타입            | 설명                |
| ------------- | ----------------- |
| 20바이트 크기 DATA | Rewardbase 주소입니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_rewardbase","id":1}' https://api.baobab.klaytn.net:8651

// Result - If requested from non-CN nodes
{
    "jsonrpc":"2.0",
    "id":1,
    "error":{
        "code":-32000,
        "message":"rewardbase must be explicitly specified"
        }
}

// Result - If requested from CN nodes
{
    "jsonrpc":"2.0",
    "id":1,
    "result":"0x96Fd91f34Cc8da9f6338C106Ba37aA8B48FB4Fa5"
}
```

