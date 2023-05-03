## eth_coinbase <a id="eth_coinbase"></a>

클라이언트 코인베이스 주소를 반환합니다.

**매개변수**

없음

**리턴값**

| 타입             | 설명                  |
| -------------- | ------------------- |
| 20 바이트 크기 DATA | 현재 코인베이스 주소를 반환합니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_coinbase","params":[],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0xc94770007dda54cF92009BFF0dE90c06F603a09f"
}
```


## eth_etherbase <a id="eth_etherbase"></a>

클라이언트 이더베이스 주소를 반환합니다.

**매개변수**

없음

**리턴값**

| 타입             | 설명                  |
| -------------- | ------------------- |
| 20 바이트 크기 DATA | 현재 이더베이스 주소를 반환합니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_etherbase","params":[],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0xc94770007dda54cF92009BFF0dE90c06F603a09f"
}
```


## eth_chainId <a id="eth_chainid"></a>

요청을 받은 노드의 현재 체인 id를 반환합니다.

**매개변수**

없음

**리턴값**

| 타입       | 설명                       |
| -------- | ------------------------ |
| QUANTITY | 요청을 받은 노드의 체인 id를 반환합니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0x2019"
}
```


## eth_gasPrice <a id="eth_gasprice"></a>

peb의 현재 가스 가격을 반환합니다.

**참고**: 이더리움에서 권장 가스비를 반환하던 것과 달리 Klaytn에서는 현재 가스비를 반환하는 형태로, 이더리움과 다르게 동작하는 API 입니다.

**매개변수**

없음

**리턴값**

| Type     | Description                  |
| -------- | ---------------------------- |
| QUANTITY | peb의 현재 가스 가격을 정수 형태로 반환합니다. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0xAE9F7BCC00" // 250,000,000,000 peb = 250 ston (Gwei)
}
```
