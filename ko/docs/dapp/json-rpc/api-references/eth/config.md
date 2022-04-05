## eth_coinbase <a id="eth_coinbase"></a>

Returns the client coinbase address.

**Parameters**

없음

**리턴값**

| 타입            | 설명                            |
| ------------- | ----------------------------- |
| 20바이트 크기 DATA | The current coinbase address. |

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

Returns the client etherbase address.

**Parameters**

없음

**리턴값**

| 타입            | 설명                             |
| ------------- | ------------------------------ |
| 20바이트 크기 DATA | The current etherbase address. |

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

Return current chainId set on the requested node.

**Parameters**

없음

**리턴값**

| 타입       | 설명                                  |
| -------- | ----------------------------------- |
| QUANTITY | Chain id set on the requested node. |

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

**NOTE**: This API has different behavior from Ethereum's and returns a gas price of Klaytn instead of suggesting a gas price as in Ethereum.

**Parameters**

없음

**리턴값**

| 타입       | 설명                           |
| -------- | ---------------------------- |
| QUANTITY | peb의 현재 가스 가격을 정수 형태로 반환합니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0xAE9F7BCC00" // 750,000,000,000 peb = 750 ston (Gwei)
}
```
