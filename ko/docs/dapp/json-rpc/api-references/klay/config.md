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

Returns a suggestion for a gas price in peb.

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
  "result": "0xAE9F7BCC00" // 250,000,000,000 peb = 250 ston
}
```

## klay_gasPriceAt <a id="klay_gaspriceat"></a>

Returns different values based on the condition described below. The unit of the return value is peb.

- If `baseFee` is undefined in the header, it returns the unit price from the governance parameter
- If the block is a pending block, it returns the gas price of the txpool.
- Otherwise, it returns the base fee of the given block.


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
  "result": "0xAE9F7BCC00" // 250,000,000,000 peb = 250 ston
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

노드가 트랜잭션 해시 맵핑 정보를 SenderTxHash로 색인화하고 있으면 `true`를 반환합니다. It is disabled by default and can be enabled by `--sendertxhashindexing`.

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

노드의 Klaytn 프로토콜 버전을 반환합니다. The current version (as of v1.9.0) of Cypress/Baobab is `istanbul/65`.

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

현재 노드의 Rewardbase를 반환합니다. Rewardbase is the address of the account where the block rewards goes to. 컨센서스 노드(CN)의 경우에만 해당합니다.

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

