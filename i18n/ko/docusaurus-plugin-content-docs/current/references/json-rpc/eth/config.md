# Configuration

## eth_coinbase <a id="eth_coinbase"></a>

클라이언트 코인베이스 주소를 반환합니다.

**매개변수**

없음

**리턴 값**

| 유형           | 설명              |
| ------------ | --------------- |
| 20-byte DATA | 현재 코인베이스 주소입니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_rewardbase","id":1}' https://public-en-baobab.klaytn.net

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

## eth_etherbase <a id="eth_etherbase"></a>

클라이언트 이더베이스 주소를 반환합니다.

**매개변수**

없음

**리턴 값**

| 유형           | 설명              |
| ------------ | --------------- |
| 20-byte DATA | 현재 이더베이스 주소입니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_clientVersion","id":1}' https://public-en-baobab.klaytn.net

// Result
{
    "jsonrpc":"2.0",
    "id":1,
    "result":"Klaytn/v0.9.1+3518232250/linux-amd64/go1.11.2"
}
```

## getChainId <a id="getchainid"></a>

요청된 노드에 설정된 현재 체인아이디를 반환합니다.

**매개변수**

없음

**리턴 값**

| 유형       | 설명                |
| -------- | ----------------- |
| QUANTITY | 체인의 체인 ID를 반환합니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_chainID","id":1}' https://public-en-baobab.klaytn.net

// Result
{
    "jsonrpc":"2.0",
    "id":1,
    "result":"0x7e2"
}
```

## gasPriceAt <a id="gaspriceat"></a>

가스 가격 제안을 peb 단위로 반환합니다.

**참고**: 이 API는 이더리움과 다른 동작 방식을 가지고 있습니다. 이더리움처럼 가스 가격을 제안하는 대신 클레이튼의 가스 가격을 반환합니다.

**매개변수**

없음

**리턴 값**

| 유형       | 설명                                           |
| -------- | -------------------------------------------- |
| QUANTITY | 현재 가스 가격(단위: peb)의 정수입니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_gasPriceAt","params":["0x64"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0xAE9F7BCC00" // 250,000,000,000 peb = 250 ston
}
```
