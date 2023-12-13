# 기타

## eth_hashrate <a id="eth_hashrate"></a>

노드가 채굴 중인 초당 해시 수를 반환합니다.

클레이튼에는 작업증명 메커니즘이 없기 때문에 항상 `0x0`을 반환한다는 점에 유의하세요.

**매개변수**

없음

**리턴 값**

| 유형 | 설명
|----------|----------------------------------|
| QUANTITY | 초당 해시 수입니다.

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

클레이튼에는 작업증명 메커니즘이 없기 때문에 항상 `0`을 반환한다는 점에 유의하세요.

**매개변수**

없음

**리턴 값**

| 유형 | 설명
|----------|----------------------------------|
| QUANTITY | 초당 해시 수입니다.

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
```

## eth_getWork <a id="eth_getwork"></a>

현재 블록의 해시, 시드해시, 충족해야 할 경계 조건("target")을 반환합니다.

클레이튼에는 작업증명 메커니즘이 없으므로 항상 `errNoMiningWork`를 반환한다는 점에 유의하시기 바랍니다.

**파라미터**

없음

**리턴 값**

| 유형 | 설명 |
|-----------------------|-------------------------------------------------------------------------------------------------------------------------------|
| 32-byte DATA Array | 현재 블록 헤더 pow-hash 목록, DAG에 사용되는 시드 해시, 경계 조건("target"), 2^256 / difficulty. |

**예시**

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


## eth_submitWork <a id="eth_submitWork"></a>

작업 증명 솔루션을 제출할 때 사용합니다.

클레이튼에는 작업증명 메커니즘이 없으므로 항상 `false`를 반환한다는 점에 유의하세요.

**파라미터**

| 유형 | 설명 |
|--------------|----------------------------------|
| 8-byte DATA | 발견한 nonce(64비트) |
| 32-byte DATA | 헤더의 pow-hash (256비트) |
| 32-byte DATA | 믹스 다이제스트 (256비트) |

**리턴 값**

| 유형 | 설명 |
|-----------|--------------------------------------------------------------------|
| bool | 제공된 솔루션이 유효하면 참을 반환하고, 그렇지 않으면 거짓을 반환합니다.   |

**예제**

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

마이닝 해시레이트를 제출할 때 사용됩니다.

클레이튼에는 작업증명 메커니즘이 없으므로 항상 `false`를 반환한다는 점에 유의하시기 바랍니다.

**파라미터**

| 이름 | 유형 | 설명 |
|----------|--------------|------------------------------------------------------------------|
| hashrate | 32-byte DATA | 해시레이트의 16진수 문자열 표현(32바이트). |
| id | 32-byte DATA | 클라이언트를 식별하는 임의의 16진수(32바이트) ID입니다.        |

**리턴 값**

| 유형 | 설명 |
|-----------|--------------------------------------------------------------------------|
| bool | 제출이 성공적으로 완료되면 true를 반환하고 그렇지 않으면 false를 반환합니다. |

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