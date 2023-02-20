## eth_hashrate <a id="eth_hashrate"></a>

노드가 채굴 중인 초당 해시 수를 반환합니다.

Klaytn은 PoW 메커니즘이 없기 때문에, 항상 `0x0`을 반환합니다.

**파라미터**

없음

**리턴값**

| 타입       | 설명      |
| -------- | ------- |
| QUANTITY | 초당 해시 수 |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_hashrate","params":[],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0x0"
}
```

## eth_getHashrate <a id="eth_gethashrate"></a>

노드가 채굴 중인 초당 해시 수를 반환합니다.

Klaytn은 PoW 메커니즘이 없기 때문에, 항상 `0`을 반환합니다.

**파라미터**

없음

**리턴값**

| 타입       | 설명      |
| -------- | ------- |
| QUANTITY | 초당 해시 수 |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getHashrate","params":[],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": 0
}
``

## eth_getWork <a id="eth_getwork"></a>

Returns the hash of the current block, the seedHash, and the boundary condition to be met ("target").

Please note that it always return `errNoMiningWork` because there is no PoW mechanism in Klaytn.

**Parameters**

None

**Return Value**

| Type                  | Description                                                                                                                   |
|-----------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Array of 32-byte DATA | List of current block header pow-hash, the seed hash used for the DAG, the boundary condition ("target"), 2^256 / difficulty. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getWork","params":[],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "error": {
    "code": -32000,
    "message": "no mining work available yet"
  }
}
```


## eth_submitWork <a id="eth_submitwork"></a>

proof-of-work 솔루션을 제출하기 위해 사용됩니다.

Klaytn은 PoW 메커니즘이 없기 때문에, 항상 `false`을 반환합니다.

**파라미터**

| 타입             | 설명                    |
| -------------- | --------------------- |
| 8 바이트 크기 DATA  | 찾은 논스 (64 bits)       |
| 32 바이트 크기 DATA | 헤더의 pow-해시 (256 bits) |
| 32 바이트 크기 DATA | 믹스 다이제스트 (256 bits)   |

**리턴값**

| 타입      | 설명                                            |
| ------- | --------------------------------------------- |
| Boolean | 만약 제출된 솔루션이 유효하면 true를, 그렇지 않으면 false을 반환합니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_submitWork","params":["0x0000000000000001", "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef", "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": false
}
```


## eth_submitHashrate <a id="eth_submithashrate"></a>

채굴 해시레이트를 제출하기 위해 사용됩니다.

Klaytn은 PoW 메커니즘이 없기 때문에, 항상 `false`을 반환합니다.

**파라미터**

| 이름     | 타입             | 설명                                 |
| ------ | -------------- | ---------------------------------- |
| 해시 레이트 | 32 바이트 크기 DATA | 16진수 문자열 (32 바이트 크기) 로 나타낸 해시 레이트  |
| id     | 32 바이트 크기 DATA | 클라이언트를 식별하는 임의의 16진수(32 바이트 크기) ID |

**리턴값**

| 타입      | 설명                                               |
| ------- | ------------------------------------------------ |
| Boolean | 제출이 성공적으로 완료되면 true를 반환하고, 그렇지 않으면 false를 반환합니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_submithashrate","params":["0x5", "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": false
}
```


