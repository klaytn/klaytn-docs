# 기타

## eth_hashrate <a id="eth_hashrate"></a>

노드가 채굴 중인 초당 해시 수를 반환합니다.

클레이튼에는 작업증명 메커니즘이 없기 때문에 항상 `0x0`을 반환한다는 점에 유의하세요.

DATA

없음

**리턴 값**

| 유형   | 설명          |
| ---- | ----------- |
| DATA | 초당 해시 수입니다. |

**예시**

```shell
JSON
```

## eth_getHashrate <a id="eth_gethashrate"></a>

노드가 채굴 중인 초당 해시 수를 반환합니다.

클레이튼에는 작업증명 메커니즘이 없기 때문에 항상 `0`을 반환한다는 점에 유의하세요.

**매개변수**

없음

**리턴 값**

| 유형   | 설명          |
| ---- | ----------- |
| DATA | 초당 해시 수입니다. |

유형

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_sha3","params":["0x11223344"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":"0x36712aa4d0dd2f64a9ae6ac09555133a157c74ddf7c079a70c33e8b4bf70dd73"
}
```

## eth_getWork <a id="eth_getwork"></a>

현재 블록의 해시, 시드해시, 충족해야 할 경계 조건("target")을 반환합니다.

클레이튼에는 작업증명 메커니즘이 없으므로 항상 `errNoMiningWork`를 반환한다는 점에 유의하시기 바랍니다.

**매개변수**

없음

**리턴 값**

| 유형           | 설명                                                                                             |
| ------------ | ---------------------------------------------------------------------------------------------- |
| 20-byte DATA | 현재 블록 헤더 pow-hash 목록, DAG에 사용되는 시드 해시, 경계 조건("target"), 2^256 / difficulty. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_forkStatus","params":["latest"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "EthTxType": true,
    "Istanbul": true,
    "KIP103": false,
    "Kore": true,
    "London": true,
    "Magma": true,
    "Shanghai": false
  }
}
```

## eth_submitWork <a id="eth_submitWork"></a>

작업 증명 솔루션을 제출할 때 사용합니다.

클레이튼에는 작업증명 메커니즘이 없으므로 항상 `false`를 반환한다는 점에 유의하세요.

**파라미터**

| 유형           | 설명                                      |
| ------------ | --------------------------------------- |
| 20-byte DATA | 발견한 nonce(64비트)      |
| 32-byte DATA | 헤더의 pow-hash (256비트) |
| 32-byte DATA | 믹스 다이제스트 (256비트)     |

**리턴 값**

| 유형   | 설명                                        |
| ---- | ----------------------------------------- |
| bool | 제공된 솔루션이 유효하면 참을 반환하고, 그렇지 않으면 거짓을 반환합니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_recoverFromTransaction","params":["0x08f88307850ba43b74008366926694000000000000000000000000000000000000dead843b9aca00945bd2fb3c21564c023a4a735935a2b7a238c4cceaf847f8458207f6a09c57511347c7b88c3539a6584b4d57991f6c4665ffcde89da0e9895eb078bef7a0296f4fd2a765567e034f4754cf31a9902c49d6a1d465a2e3fd10b165476cffa8", "latest"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":"0xe15cd70a41dfb05e7214004d7d054801b2a2f06b"
}
```

## eth_submitHashrate <a id="eth_submithashrate"></a>

마이닝 해시레이트를 제출할 때 사용됩니다.

클레이튼에는 작업증명 메커니즘이 없으므로 항상 `false`를 반환한다는 점에 유의하시기 바랍니다.

**매개변수**

| 이름       | 유형           | 설명                                                    |
| -------- | ------------ | ----------------------------------------------------- |
| hashrate | 32-byte DATA | 해시레이트의 16진수 문자열 표현(32바이트).         |
| id       | 32-byte DATA | 클라이언트를 식별하는 임의의 16진수(32바이트) ID입니다. |

복구된 주소.

| 유형   | 설명                                              |
| ---- | ----------------------------------------------- |
| bool | 제출이 성공적으로 완료되면 true를 반환하고 그렇지 않으면 false를 반환합니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{
  "jsonrpc":"2.0",
  "method":"klay_recoverFromMessage"
  ,"params":[
"0xA2a8854b1802D8Cd5De631E690817c253d6a9153",
"0xdeadbeef", 
"0x1e6338d6e4a8d688a25de78cf2a92efec9a92e52eb8425acaaee8c3957e68cdb3f91bdc483f0ed05a0da26eca3be4c566d087d90dc2ca293be23b2a9de0bcafc1c", 
"latest"
], 
  "Id":1
}
' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":"0xa2a8854b1802d8cd5de631e690817c253d6a9153"
}
```

## klay_createAccessList <a id="klay_createaccesslist"></a>

이 메서드는 주어진 `Transaction`을 기반으로 `accessList`를 생성합니다.
`accessList`에는 발신자 계정과 사전 컴파일을 제외한 트랜잭션이 읽고 쓴 모든 스토리지 슬롯과 주소가 포함됩니다.
이 메서드는 [`klay_call`](./transaction.md#klay_call)과 동일한 트랜잭션 호출 객체 및 `blockNumberOrTag` 객체를 사용합니다.
accessList는 가스비 증가로 인해 접근이 불가능해진 컨트랙트를 해제하는 데 사용할 수 있습니다.
트랜잭션에 `accessList`를 추가해도 액세스 목록이 없는 트랜잭션에 비해 가스 사용량이 줄어들지는 않습니다.

**매개변수**

| 이름               | 유형              | 설명                                                                                                                                                                                                |
| ---------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| callObject       | Object          | 트랜잭션 호출 오브젝트. 개체의 속성은 [`klay_call`](./transaction.md#klay_call)을 참조하세요.                                                                                                                           |
| blockNumberOrTag | QUANTITY \| TAG | 정수 또는 16진수 블록 번호 또는 [기본 블록 매개변수](./block.md#the-default-block-parameter)에서와 같이 문자열 `"earliest"`, `"latest"` 또는 `"pending"`입니다. 블록 번호는 필수이며 지정된 트랜잭션이 실행되어야 하는 컨텍스트(상태)를 정의합니다. |

**리턴 값**

| 유형     | 설명                                                   |
| ------ | ---------------------------------------------------- |
| Object | 트랜잭션에 사용된 주소 및 저장 키 목록과 액세스 목록이 추가될 때 소비된 가스를 반환합니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_createAccessList", "params": [{"from": "0x8cd02c6cbd8375b39b06577f8d50c51d86e8d5cd", "data": "0x608060806080608155"}, "latest"], "id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": {
    "accessList": [{
      "address": "0xa02457e5dfd32bda5fc7e1f1b008aa5979568150",
      "storageKeys": ["0x0000000000000000000000000000000000000000000000000000000000000081"]
    }],
    "gasUsed": "0x128ee"
  }
}
```
