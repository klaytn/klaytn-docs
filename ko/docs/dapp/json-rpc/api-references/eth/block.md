## 기본 블록 매개변수 <a id="the-default-block-parameter"></a>

  When you send an API request with the `eth` namespace, the block height is determined by the `defaultBlock` parameter.

`defaultBlock` 매개변수를 통해 설정할 수 있는 사항들은 다음과 같습니다.

- `16진수 문자열` - 블록 번호의 정수 형태입니다.
- `"earliest" 문자열` - 제네시스 블록입니다.
- `"latest" 문자열` - 가장 최근에 채굴된 블록입니다.
- `String "pending"` - for pending state/transactions


## eth_blockNumber <a id="eth_blocknumber"></a>

가장 최근의 블록 번호를 반환합니다.

**Parameters**

없음

**리턴값**

| 타입       | 설명                            |
| -------- | ----------------------------- |
| QUANTITY | 클라이언트가 있는 현재 블록 번호의 정수 형태입니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":83,
  "result": "0xc94"
}
```


## eth_getHeaderByNumber <a id="eth_getheaderbynumber"></a>

블록 번호를 기준으로 헤더 정보를 반환합니다.

Please check the [Caution-Header](./caution.md#block_header) before using this API.

**Parameters**

| 타입                  | 설명                                                                                                                          |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| QUANTITY &#124; TAG | 정수 형태의 블록 번호 또는 [기본 블록 매개변수](#the-default-block-parameter)에서와 같이 `"earliest"`, `"latest"`, `"pending"`과 같이 상태를 나타내는 문자열입니다. |

**리턴값**

See [eth_getHeaderByHash](#eth_getheaderbyhash)

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getHeaderByNumber","params":["0x1b4"],"id":1}' http://localhost:8551
// Result
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "baseFeePerGas": "0x0",
        "difficulty": "0x1",
        "extraData": "0x",
        "gasLimit": "0xe8d4a50fff",
        "gasUsed": "0x28b484",
        "hash": "0x5de0dc71dec2e724be002dcad135b602810769ce26e16b3b06862405e08ca71b",
        "logsBloom": "0x02200022800002050000084080014015001001004b0002440401060a0830000200014041044010180010430018800119120098000800200241c2090a4020011040004400002201081800440a340020a4000820100848081020003000892050105a05000002100000200012c0800408982000085100000c4040a03814000800200812210100200010004018410d80004214800123210400082002214620100021028800120309200802008291c8e000904210080008110900010100081000101000501002010a0080311886000008000000240900400000100200a402005830200010300804020200000002310000008004004080a58000550000508000000000",
        "miner": "0xea674fdde714fd979de3edf0f56aa9716b898ec8",
        "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "nonce": "0x0000000000000000",
        "number": "0x1b4",
        "parentHash": "0x99fcd33dddd763835ba8bdc842853d973496a7e64ea2f6cf826bc2c338e23b0c",
        "receiptsRoot": "0xd3d70ed54a9274ba3191bf2d4fd8738c5d782fe17c8bfb45c03a25dc04120c35",
        "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
        "size": "0x23a",
        "stateRoot": "0x1076e6726164bd6f74720a717242584109f37c55017d004eefccf9ec3be76c18",
        "timestamp": "0x61b0a6c6",
        "totalDifficulty": "0x12",
        "transactionsRoot": "0x6ec8daca98c1005d9bbd7716b5e94180e2bf0e6b77770174563a166337369344" }
}   
```


## eth_getHeaderByHash <a id="eth_getheaderbyhash"></a>

블록 해시를 기준으로 헤더의 정보를 반환합니다.

Please check [Caution-Header](./caution.md#block_header) before using this API.

**Parameters**

| 타입            | 설명         |
| ------------- | ---------- |
| 32바이트 크기 DATA | 블록의 해시입니다. |

**리턴값**

`객체` - 헤더 객체, 또는 블록이 없는 경우 `error`를 반환합니다.

| 이름               | 타입             | 설명                                                                                                                        |
| ---------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------- |
| baseFeePerGas    | QUANTITY       | The base fee per gas.                                                                                                     |
| difficulty       | QUANTITY       | The integer of the difficulty for this block.                                                                             |
| extraData        | DATA           | 블록의 "추가 데이터"를 위한 필드입니다.                                                                                                   |
| gasLimit         | QUANTITY       | The maximum gas allowed in this block.                                                                                    |
| gasUsed          | QUANTITY       | 블록에 있는 트랜잭션들에서 사용된 가스양의 총합입니다.                                                                                            |
| 해시               | 32바이트 크기 DATA  | 블록의 해시입니다. 아직 보류 중인 블록이면 `null`입니다.                                                                                       |
| logsBloom        | 256바이트 크기 DATA | 블록의 로그를 위한 블룸필터입니다.                                                                                                       |
| 채굴자              | 20바이트 크기 DATA  | The address of the beneficiary to whom the mining rewards were given.                                                     |
| mixHash          | 32바이트 크기 DATA  | The hash which proves combined with the nonce that a sufficient amount of computation has been carried out on this block. |
| 논스               | 8-byte DATA    | The hash of the generated proof-of-work.                                                                                  |
| number           | QUANTITY       | 블록 번호입니다. 아직 보류 중인 블록이면 `null`입니다.                                                                                        |
| parentHash       | 32바이트 크기 DATA  | 이전 블록의 해시입니다.                                                                                                             |
| receiptsRoot     | 32바이트 크기 DATA  | 블록의 영수증 트라이의 루트 해시입니다.                                                                                                    |
| sha3Uncles       | 32바이트 크기 DATA  | The SHA3 of the uncles data in the block.                                                                                 |
| size             | QUANTITY       | Integer of the size of this block in bytes.                                                                               |
| stateRoot        | 32바이트 크기 DATA  | 블록의 상태 트라이의 루트 해시입니다.                                                                                                     |
| timestamp        | QUANTITY       | 블록이 생성되었을 때의 Unix 타임스탬프입니다.                                                                                               |
| totalDifficulty  | QUANTITY       | The total blockScore of the chain until this block.                                                                       |
| transactionsRoot | 32바이트 크기 DATA  | 블록의 트랜잭션 트라이의 루트 해시입니다.                                                                                                   |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getHeaderByHash","params":["0xb8deae63002d2b6aa33247c8ef545383ee0fd2282ac9b49dbbb74114389ddb5c"],"id":1}' http://localhost:8551
// Result
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "baseFeePerGas": "0x0",
        "difficulty": "0x1",
        "extraData": "0x",
        "gasLimit": "0xe8d4a50fff",
        "gasUsed": "0x28b484",
        "hash": "0xb8deae63002d2b6aa33247c8ef545383ee0fd2282ac9b49dbbb74114389ddb5c",
        "logsBloom": "0x02200022800002050000084080014015001001004b0002440401060a0830000200014041044010180010430018800119120098000800200241c2090a4020011040004400002201081800440a340020a4000820100848081020003000892050105a05000002100000200012c0800408982000085100000c4040a03814000800200812210100200010004018410d80004214800123210400082002214620100021028800120309200802008291c8e000904210080008110900010100081000101000501002010a0080311886000008000000240900400000100200a402005830200010300804020200000002310000008004004080a58000550000508000000000",
        "miner": "0xea674fdde714fd979de3edf0f56aa9716b898ec8",
        "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "nonce": "0x0000000000000000",
        "number": "0xd208de",
        "parentHash": "0x99fcd33dddd763835ba8bdc842853d973496a7e64ea2f6cf826bc2c338e23b0c",
        "receiptsRoot": "0xd3d70ed54a9274ba3191bf2d4fd8738c5d782fe17c8bfb45c03a25dc04120c35",
        "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
        "size": "0x23a",
        "stateRoot": "0x1076e6726164bd6f74720a717242584109f37c55017d004eefccf9ec3be76c18",
        "timestamp": "0x61b0a6c6",
        "totalDifficulty": "0xd208df",
        "transactionsRoot": "0x6ec8daca98c1005d9bbd7716b5e94180e2bf0e6b77770174563a166337369344"
    }
}   
```


## eth_getBlockByNumber <a id="eth_getblockbynumber"></a>

블록 번호로 조회한 블록의 정보를 반환합니다.

Please check [Caution-Block](./caution.md#block) before using this API.

**Parameters**

| 타입                  | 설명                                                                                                                                                        |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| QUANTITY &#124; TAG | Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"` as in [default block parameter](#the-default-block-parameter). |
| Boolean             | `true`이면 트랜잭션 객체 전체를 반환하고, `false`이면 트랜잭션의 해시만을 반환합니다.                                                                                                    |


**리턴값**

See [eth_getBlockByHash](#eth_getblockbyhash)

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0xd0054e", false],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "baseFeePerGas": "0x0",
    "difficulty": "0x1",
    "extraData": "0x",
    "gasLimit": "0xe8d4a50fff",
    "gasUsed": "0x44437",
    "hash": "0x456a7cbb6fada11a0ca8cec24510d89da1c52898f1087528752ae6e13973fbc5",
    "logsBloom": "0x0000100000000094000000400000080000000040000000000000000000000002000000000000000000000000004001000000200000000000000008000220000000080400000800000000000a000000000000000000000000000010000000000000002000000408000000000000000010000080101002000000000010000000100000010000200800000400000080000000000000000000000002000000102000024000080200000000000082000000000000000000000000010000000000000000100012000000000000011000000000002000201000000008000000002000000010002800000000001400000000000000000000000100000000200000000000",
    "miner": "0x1ad91ee08f21be3de0ba2ba6918e714da6b45836",
    "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "nonce": "0x0000000000000000",
    "number": "0xd0054e",
    "parentHash": "0x2b88fdb3821669357a0b8367115e30145135c44bb8f62641d4e7765a7f555d17",
    "receiptsRoot": "0xc36bc44d0b52dee954be9bbd519bddc0bf6e991af2ed6f6ba506f89f10cdb9a7",
    "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
    "size": "0x64c",
    "stateRoot": "0x123a0da1c621236e64f9b486a9a9712ec6ce07d6690acab5a18b716d17cdc29f",
    "timestamp": "0x6194f184",
    "totalDifficulty": "0xd0054f",
    "transactions": [
      "0x5b3492f8199ee2a551d991b7d00bd48967ca5e5c1c15d6e1ee9fda97e3126e9a",
      "0x8e1870262f2ba0452458280ad6ad5d54e5288623e415692c822979b7608c7297",
      "0x98053d20b01c9e56964a57084fb91ccc01b242adfb09c23534162dcbbcc094c2",
    ],
    "transactionsRoot": "0x29b9880f57c0e79d0be5aa4fcc6b4cfcbed3e51478ad8f44533acce012df8cf1",
    "uncles": []
  }
}
```


## eth_getBlockByHash <a id="eth_getblockbyhash"></a>

블록 해시를 기준으로 블록의 정보를 반환합니다.

Please check [Caution-Block](./caution.md#block) before using this API.

**Parameters**

| 타입            | 설명                                                     |
| ------------- | ------------------------------------------------------ |
| 32바이트 크기 DATA | 블록의 해시입니다.                                             |
| Boolean       | `true`이면 트랜잭션 객체 전체를 반환하고, `false`이면 트랜잭션의 해시만을 반환합니다. |

**리턴값**

`객체` - 블록 객체, 또는 블록이 없는 경우 `error`를 반환합니다.

| 이름               | 타입             | 설명                                                                                                                        |
| ---------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------- |
| baseFeePerGas    | QUANTITY       | The base fee per gas.                                                                                                     |
| difficulty       | QUANTITY       | The integer of the difficulty for this block                                                                              |
| extraData        | DATA           | 블록의 "추가 데이터"를 위한 필드입니다.                                                                                                   |
| gasLimit         | QUANTITY       | The maximum gas allowed in this block.                                                                                    |
| gasUsed          | QUANTITY       | 블록에 있는 트랜잭션들에서 사용된 가스양의 총합입니다.                                                                                            |
| 해시               | 32바이트 크기 DATA  | 블록의 해시입니다. 아직 보류 중인 블록이면 `null`입니다.                                                                                       |
| logsBloom        | 256바이트 크기 DATA | 블록의 로그를 위한 블룸필터입니다. 아직 보류 중인 블록이면 `null`입니다.                                                                              |
| 채굴자              | 20바이트 크기 DATA  | The address of the beneficiary to whom the mining rewards were given.                                                     |
| mixHash          | 32바이트 크기 DATA  | The hash which proves combined with the nonce that a sufficient amount of computation has been carried out on this block. |
| 논스               | 8-byte DATA    | The hash of the generated proof-of-work.                                                                                  |
| number           | QUANTITY       | 블록 번호입니다. 아직 보류 중인 블록이면 `null`입니다.                                                                                        |
| parentHash       | 32바이트 크기 DATA  | 이전 블록의 해시입니다.                                                                                                             |
| receiptsRoot     | 32바이트 크기 DATA  | 블록의 영수증 트라이의 루트 해시입니다.                                                                                                    |
| sha3Uncles       | 32바이트 크기 DATA  | The SHA3 of the uncles data in the block.                                                                                 |
| size             | QUANTITY       | Integer of the size of this block in bytes.                                                                               |
| stateRoot        | 32바이트 크기 DATA  | 블록의 상태 트라이의 루트 해시입니다.                                                                                                     |
| timestamp        | QUANTITY       | 블록이 생성되었을 때의 Unix 타임스탬프입니다.                                                                                               |
| totalDifficulty  | QUANTITY       | The total blockScore of the chain until this block                                                                        |
| transactionsRoot | 32바이트 크기 DATA  | 블록의 트랜잭션 트라이의 루트 해시입니다.                                                                                                   |
| transactions     | Array          | 트랜잭션 객체의 배열이거나 또는 마지막으로 주어진 매개변수에 따라 32바이트 크기의 트랜잭션 해시입니다.                                                                |
| uncles           | Array          | Array of uncle hashes.                                                                                                    |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getBlockByHash","params":["0xb8deae63002d2b6aa33247c8ef545383ee0fd2282ac9b49dbbb74114389ddb5c", true],"id":1}' http://localhost:8551

// Result
{
   "jsonrpc":"2.0",
   "id":1,
   "result":{
      difficulty: "0x1",
      extraData: "0xd8820505846b6c617988676f312e31312e328664617277696e00000000000000f89ed594e733cb4d279da696f30d470f8c04decb54fcb0d2b841f1f600d136f93a5a2d9c12a7a9f6d7ba80a047c3910a2bbc01e38bcce25e48ed2004d21f134df5efaf1f8cbb9a26e1548e57628ab258c935490c11a7cd65324701f843b841444b3efc40071b6eec2c4d2630b483710b8fc7a601432431b0161f489102d1ca02f2ef93153d0be3843aa563d34cee1716163f58711843442aedd94a56303c0400",
      gasLimit: "0xe8d4a50fff",
      gasUsed: "0x0",
      governanceData: "0x",
      hash: "0xb8deae63002d2b6aa33247c8ef545383ee0fd2282ac9b49dbbb74114389ddb5c",
      logsBloom: "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      miner: "0x0000000000000000000000000000000000000000",
      mixHash: "0x63746963616c2062797a616e74696e65206661756c7420746f6c6572616e6365",
      nonce: "0x0000000000000000",
      number: "0x1",
      parentHash: "0x73255a60e9491b5715f9bfcb7fa1143296810f629836d4cefbd1921d9173d63d",
      receiptsRoot: "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      reward: "0x0000000000000000000000000000000000000000",
      size: "0x2d7",
      stateRoot: "0xedb87f4b0f905a655c80d1768eb22b1eff2405098c4748b8364c869611e02a2b",
      timestamp: "0x5c99cbd8",
      totalDifficulty: "0x2",
      transactions: [],
      transactionsRoot: "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      uncles: [],
    }
}
```


## eth_getUncleBlockByHashAndIndex <a id="eth_getunclebyblockhashandindex"></a>

Returns information about a uncle of a block by hash and the uncle's index position. Since there are no uncles in Klaytn, it always returns `null`.

**Parameters**

| 타입            | 설명                          |
| ------------- | --------------------------- |
| 32바이트 크기 DATA | The hash of a block.        |
| QUANTITY      | The uncle's index position. |

**Return Value** `null`

**예시**
```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getUncleBlockByHashAndIndex","params":["0xb8deae63002d2b6aa33247c8ef545383ee0fd2282ac9b49dbbb74114389ddb5c", "0x1"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": null
}
```


## eth_getUncleByBlockNumberAndIndex <a id="eth_getunclebyblocknumberandindex"></a>

Returns information about a uncle of a block by number and the uncle's index position. As there are no uncles in Klaytn, it always returns `null`.

**Parameters**

| 타입                  | 설명                                                                                                                                                                |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| QUANTITY &#124; TAG | Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"` as in [default block parameter](block.md#the-default-block-parameter). |
| QUANTITY            | The uncle's index position.                                                                                                                                       |

**Return Value** `null`

**예시**
```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getUncleBlockByNumberAndIndex","params":["0xe8", "0x1"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": null
}
```


## eth_getBlockTransactionCountByNumber <a id="eth_getblocktransactioncountbynumber"></a>

블록 번호로 조회한 블록에 담긴 트랜잭션의 개수를 반환합니다.

**Parameters**

| 타입                  | 설명                                                                                                                                                                |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| QUANTITY &#124; TAG | Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"` as in [default block parameter](block.md#the-default-block-parameter). |

**리턴값**

| 타입       | 설명                           |
| -------- | ---------------------------- |
| QUANTITY | 이 블록에 담긴 트랜잭션의 개수의 정수 형태입니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0xe8"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0xa" // 10
}
```


## eth_getBlockTransactionCountByHash <a id="eth_getblocktransactioncountbyhash"></a>

블록 해시를 기준으로 조회한 특정 블록에 담긴 트랜잭션의 개수를 반환합니다.

**Parameters**

| 타입            | 설명         |
| ------------- | ---------- |
| 32바이트 크기 DATA | 블록의 해시입니다. |

**리턴값**

| 타입       | 설명                           |
| -------- | ---------------------------- |
| QUANTITY | 이 블록에 담긴 트랜잭션의 개수의 정수 형태입니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0x0c11803ab36110db993e7520908b9ba9336cca2f2dcc9b6130c481a3ccdc2621"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0x0"
}
```


## eth_getUncleCountByBlockNumber <a id="eth_getunclecountbyblocknumber"></a>

Returns the number of uncles in a block from a block matching the given block number. Since there are no uncles in Klaytn, it always returns `0x0`.

**Parameters**

| 타입                  | 설명                                                                                                                                                                |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| QUANTITY &#124; TAG | Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"` as in [default block parameter](block.md#the-default-block-parameter). |

**리턴값**

| 타입       | 설명                           |
| -------- | ---------------------------- |
| QUANTITY | 이 블록에 담긴 트랜잭션의 개수의 정수 형태입니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0xe8"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0x0" // 0
}
```


## eth_getUncleCountByBlockHash <a id="eth_getunclecountbyblockhash"></a>

Returns the number of uncles in a block from a block matching the given block hash. As there are no uncles in Klaytn, it always returns `0x0`.

**Parameters**

| 타입            | 설명         |
| ------------- | ---------- |
| 32바이트 크기 DATA | 블록의 해시입니다. |

**리턴값**

| 타입       | 설명                           |
| -------- | ---------------------------- |
| QUANTITY | 이 블록에 담긴 트랜잭션의 개수의 정수 형태입니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0x0c11803ab36110db993e7520908b9ba9336cca2f2dcc9b6130c481a3ccdc2621"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0x0"
}
```




## eth_getStorageAt <a id="eth_getstorageat"></a>

입력으로 받은 주소의 스토리지 위치에서 값을 반환합니다.

**Parameters**

| 타입                              | 설명                                                                                                                                                                               |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 20바이트 크기 DATA                   | 스토리지의 주소입니다.                                                                                                                                                                     |
| QUANTITY                        | 스토리지 내 위치의 정수 형태입니다.                                                                                                                                                             |
| QUANTITY &#124; TAG &#124; HASH | Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"` as in [default block parameter](block.md#the-default-block-parameter), or block hash. |

**리턴값**

| 타입   | 설명                         |
| ---- | -------------------------- |
| DATA | 입력으로 받은 스토리지 위치의 값을 반환합니다. |

**예시**

올바른 위치를 계산하는 것은 탐색할 스토리지에 따라 차이가 있습니다. Consider the following contract deployed at `0x295a70b2de5e3953354a6a8344e616ed314d7251` by the address `0x391694e7e0b0cce554cb130d723a9d27458f9298`.

```
contract Storage {
    uint pos0;
    mapping(address => uint) pos1;

    function Storage() {
        pos0 = 1234;
        pos1[msg.sender] = 5678;
    }
}
```

`pos0`의 값은 다음과 같이 쉽게 찾을 수 있습니다.

```shell
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' http://localhost:8551

{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}
```

맵핑의 요소를 찾는 것은 더 어렵습니다. 맵핑의 요소의 위치는 다음과 같이 계산됩니다.
```javascript
keccak(LeftPad32(key, 0), LeftPad32(map position, 0))
```

즉 `pos1["0x391694e7e0b0cce554cb130d723a9d27458f9298"]`의 스토리지를 탐색하려면 아래와 같이 그 위치를 계산해야 합니다.
```javascript
keccak(decodeHex("000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"))
```
이는 `klay` 라이브러리와 함께 제공되는 Klaytn 콘솔을 사용하여 계산할 수 있습니다.
```javascript
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> klay.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```
이제 스토리지 값을 가져오려면 다음과 같이 입력합니다.
```shell
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' http://localhost:8551

{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```


## eth_mining <a id="eth_mining"></a>

클라이언트가 새로운 블록을 채굴하고 있으면 `true`를 반환합니다.

**참고**: 현재는 트랜잭션을 재전송하기 위해 모든 노드가 기본적으로 채굴 모드입니다. Please note that the actual "mining" is only performed by the Consensus Nodes (CNs).

**Parameters**

없음

**리턴값**

| 타입      | 설명                                                  |
| ------- | --------------------------------------------------- |
| Boolean | 클라이언트가 채굴 중이면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_mining","params":[],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":true
}
```


## eth_syncing <a id="eth_syncing"></a>

동기화 상태에 대한 데이터가 있는 객체를 반환하거나 `false`를 반환합니다.

**Parameters**

없음

**리턴값**

`Object|Boolean`, 동기화 상태에 대한 데이터 객체를 반환하거나 또는 동기화하고 있지 않으면 `false` 를 반환합니다.

| 이름            | 타입       | 설명                                                       |
| ------------- | -------- | -------------------------------------------------------- |
| startingBlock | QUANTITY | 가져오기 시작하는 블록입니다(동기화가 완료되면 재설정됩니다).                       |
| currentBlock  | QUANTITY | The current block, same as `eth_blockNumber`.            |
| highestBlock  | QUANTITY | 예상되는 최신 블록 번호입니다.                                        |
| pulledStates  | QUANTITY | 지금까지 처리된 상태 항목의 개수입니다.  동기화 모드가 "fast"가 아니면 0이 반환됩니다.    |
| knownStates   | QUANTITY | 가져와야 하는 알려진 상태 항목의 개수입니다.  동기화 모드가 "fast"가 아니면 0이 반환됩니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": {
    "currentBlock":"0x3e31e",
    "highestBlock":"0x827eef",
    "knownStates":"0x0",
    "pulledStates":"0x0",
    "startingBlock":"0x0"
  }
}
// Or when not syncing
{
  "jsonrpc": "2.0",
  "id":1,
  "result": false
}
```



