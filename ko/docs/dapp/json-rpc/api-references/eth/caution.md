---
description: >-
  Klaytn에서 eth namespace apis를 사용할 때의 주의사항입니다.
---

# Namespace 주의사항 <a id="namespace-caution"></a>

Klaytn은 `eth` namespace APIs를 지원하며, 개발자들은 이더리움 기반의 SDKs 혹은 도구들을 사용하는 프로젝트를 쉽게 Klaytn으로 옮겨올 수 있습니다. (예를들어, 이더리움 도구의 엔드포인트 URL을 바꾸어 Klaytn node를 가리킬 수 있습니다.)

하지만 Klaytn과 Ethereum의 근본적인 디자인 차이가 존재하기 때문에, 몇몇 API들은 완전한 기능이 지원되지 않습니다. (예를들어, 몇몇 필드들은 항상 zero value를 가집니다.)

이 문서에서는 이러한 API들의 제한 사항들에 대해 설명합니다.

## 블록 헤더 <a id="block_header"></a>

관련된 APIs: [eth_getHeaderByNumber](./block.md#eth_getheaderbynumber), [eth_getHeaderByHash](./block.md/#eth_getheaderbyhash).

* 설명란의 :warning:을 자세히 읽으십시오.
* 설명란의 :white_check_mark: 아이콘은 해당 필드가 이더리움과 동일하다는 것을 뜻합니다.

| Ethereum 헤더 필드   | Klaytn 헤더 필드        | 설명                                                                                                                                                                                                                                                                                                                                                                     |
| ---------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| baseFeePerGas    | (added)             | :warning: Klaytn은 baseFeePerGas 스킴을 가지고 있지 않기 때문에, 해당 필드는 항상 `0x0` 값을 가집니다.                                                                                                                                                                                                                                                                                            |
| difficulty       | (added)             | :warning: Klaytn 헤더에서 해당 필드는 `blockScore`에 해당하며, `0x1`로 값이 고정되어 있습니다. This is because Klaytn's consensus mechanism is not based on PoW, indicating the technical concept of block difficulty is not applicable to Klaytn core.                                                                                                                                         |
| extraData        | extraData           | :warning: 해당 필드는 빈 값을 나타내며 항상 `0x`를 값으로 가집니다. Owing to the fact that Klaytn's `extraData` contains consensus data such as validators addresses, validators signatures, and proposer signature, it is not applicable to `eth` namespace API.                                                                                                                            |
| gasLimit         | (added)             | :warning: Klaytn은 GasLimit이 없기 때문에 해당 필드는 임의의 숫자인 `0xe8d4a50fff`(=`999999999999` in decimal)를 값으로 가집니다. At the time of writing, this figure is 30 times higher than the [block gas limit of Ethereum](https://ethereum.org/en/developers/docs/gas/#block-size). 더 자세한 내용은 [계산 비용](../../../../klaytn/design/computation/computation-cost/computation-cost.md)를 참조하십시오. |
| gasUsed          | gasUsed             | :white_check_mark: 해당 블록의 트랜잭션들에 사용된 총 가스양과 동일한 스칼라 값입니다.                                                                                                                                                                                                                                                                                                            |
|                  | governanceData(생략됨) | :warning: Ethereum 블록 헤더에는 해당 필드가 존재하지 않기 때문에 생략합니다.                                                                                                                                                                                                                                                                                                                   |
| 해시               | 해시                  | :white_check_mark: 블록의 해시입니다.                                                                                                                                                                                                                                                                                                                                        |
| logsBloom        | logsBloom           | :white_check_mark: 블록안의 로그들에 대한 블룸 필터입니다. 아직 보류 중인 블록이면 `null`입니다.                                                                                                                                                                                                                                                                                                   |
| 채굴자              | (added)             | :warning: 해당 필드는 블록 제안자의 주소를 반환합니다. 클레이튼의 [합의 메커니즘](../../../../klaytn/design/consensus-mechanism.md)은 [PBFT](../../../../klaytn/design/consensus-mechanism.md#pbft-practical-byzantine-fault-tolerance)이기 때문에, 채굴자 대신 블록 제안자를 가집니다.                                                                                                                                   |
| mixHash          | (added)             | :warning: Klaytn의 합의 메커니즘은 PoW기반이 아니기 때문에, 해당 필드는 항상 zeroHash(`0x00...`)를 값으로 가집니다.                                                                                                                                                                                                                                                                                    |
| 논스               | (added)             | :warning: Klaytn의 합의 메커니즘은 PoW기반이 아니기 때문에, 해당 필드는 항상 zeroNonce(`0x00...`)를 값으로 가집니다.                                                                                                                                                                                                                                                                                   |
| number           | number              | :white_check_mark: 블록 번호를 가집니다.                                                                                                                                                                                                                                                                                                                                      |
| parentHash       | parentHash          | :white_check_mark: 부모 블록의 해시값을 가집니다.                                                                                                                                                                                                                                                                                                                                 |
| receiptsRoot     | receiptsRoot        | :white_check_mark: 블록의 receipts 트라이 루트의 해시입니다.                                                                                                                                                                                                                                                                                                                       |
|                  | reward(생략됨)         | :warning: Ethereum 블록 헤더에는 해당 필드가 존재하지 않기 때문에 생략합니다.                                                                                                                                                                                                                                                                                                                   |
| sha3Uncles       | (added)             | :warning: Klaytn은 엉클블록이 없기 때문에, 해당 필드는 항상 빈 블록 헤더를 포함하는 목록의 RLP-encoded 바이트의 Keccak256해시인 `0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347`를 값으로 가집니다.                                                                                                                                                                                              |
| size             | size                | :white_check_mark: 블록의 바이트 크기입니다.                                                                                                                                                                                                                                                                                                                                    |
| stateRoot        | stateRoot           | :white_check_mark: 블록의 상태 트라이의 루트 해시입니다.                                                                                                                                                                                                                                                                                                                             |
| timestamp        | timestamp           | :white_check_mark: 블록이 생성되었을 때의 Unix 타임스탬프입니다.                                                                                                                                                                                                                                                                                                                       |
|                  | timestampFoS(생략됨)   | :warning: Ethereum 블록 헤더에는 해당 필드가 존재하지 않기 때문에 생략합니다.                                                                                                                                                                                                                                                                                                                   |
| totalDifficulty  | (added)             | :warning: The total difficulty of the chain until the querying block.                                                                                                                                                                                                                                                                                                  |
| transactionsRoot | transactionsRoot    | :white_check_mark: 블록의 트랜잭션 트라이의 루트 해시입니다.                                                                                                                                                                                                                                                                                                                           |


## 블록 <a id="block"></a>

관련된 APIs: [eth_getBlockByHash](./block.md/#eth_getblockbyhash), [eth_getBlockByNumber](./block.md/#eth_getblockbynumber), [eth_getUncleByBlockHashAndIndex](./block.md/#eth_getunclebyblockhashandindex), [eth_getUncleByBlockNumberAndIndex](./block.md/#eth_getunclebyblocknumberandindex).

블록 헤더와 관련된 내용은 위에서 설명하였으므로, 해당 장에서는 블록 헤더를 제외한 블록 필드에 대해 설명합니다.

* 설명란의 :warning:을 자세히 읽으십시오.
* 설명란의 :white_check_mark: 아이콘은 해당 필드가 이더리움과 동일하다는 것을 뜻합니다.

| Ethereum 헤더 필드 | Klaytn 헤더 필드  | 설명                                                                              |
| -------------- | ------------- | ------------------------------------------------------------------------------- |
|                | voteData(생략됨) | :warning: Ethereum 블록에는 해당 필드가 존재하지 않기 때문에 생략합니다.                               |
| uncles         | (added)       | :warning: Klaytn core에는 엉클블록에 관한 기술적 개념이 없기 때문에, 해당 필드는 항상 `[]`을 값으로 가집니다.      |
| transactions   | transactions  | :white_check_mark: 트랜잭션 객체의 배열이거나 또는 마지막으로 주어진 매개변수에 따라 32바이트 크기의 트랜잭션 해시입니다. |


## 트랜잭션(Transaction)<a id="transaction"></a>

관련된 APIs: [eth_getTransactionByHash](./transaction.md/#eth_gettransactionbyhash), [eth_getTransactionByBlockHashAndIndex](./transaction.md/#eth_gettransactionbyblockhashandindex), [eth_getTransactionByBlockNumberAndIndex](./transaction.md/#eth_gettransactionbyblocknumberandindex), [eth_pendingTransactions](./transaction.md/#eth_pendingtransactions).

Klaytn에는 많은 유형의 트랜잭션 타입이 있고, 데이터 구조의 필드는 유형에 따라 변합니다.

따라서 다양한 유형의 Klaytn 트랜잭션이 어떻게 Ethereum 트랜잭션으로 변환되는지 확인하여야 합니다. 몇몇 필드는 변환 과정 중 무시되거나 zero 혹은 더미 값으로 추가될 수 있습니다. 이는 변환 과정 중 일부 중요한 정보(클레이튼의 관점에서)가 손실된다는 것을 의미합니다.

본 문서에서는 [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718) 이전의 EthereumLegacyTransaction을 이더리움 트랜잭션 형식으로 정의하고 있음을 참고하십시오.

eth namespace JSON-RPC apis를 통해 Klaytn 트랜잭션들을 쿼리할 때, Klaytn 트랜잭션은 이더리움 기본 트랜잭션 형식으로 반환될 것입니다.

본 문서에서는 변환 과정을 상세히 기술합니다 (Klaytn 트랜잭션 -> 이더리움 기본 트랜잭션).

* 설명란의 :warning:을 자세히 읽으십시오.
* 설명란의 :white_check_mark: 아이콘은 해당 필드가 이더리움과 동일하다는 것을 뜻합니다.

### 공통 영역

공통 영역은 다양한 Klaytn 트랜잭션 종류와 무관합니다. 이 장에서는 공통 영역들이 어떻게 이더리움 기본 트랜잭션으로써 제공되는지를 기술합니다.

| Ethereum 기본 트랜잭션 영역 | Klaytn 트랜잭션 영역                                                                     | 설명                                                                                                                                                                                     |
| ------------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockHash           | blockHash                                                                          | :white_check_mark: 블록 해시.                                                                                                                                                            |
| blockNumber         | blockNumber                                                                        | :white_check_mark: 블록 번호.                                                                                                                                                            |
| from                | from                                                                               | :white_check_mark: 발신자의 주소.                                                                                                                                                          |
| gas                 | gas                                                                                | :white_check_mark: 발신자가 지불한 가스.                                                                                                                                                      |
| 가스 가격               | 가스 가격                                                                              | :warning: Klaytn의 맥락에서는 [단가](../../../../klaytn/design/transaction-fees/transaction-fees.md#unit-price)로도 알려져 있으며, 해당 값은 거버넌스 프로세스를 통해 시스템에서 결정됩니다.                                    |
| 해시                  | 해시                                                                                 | :white_check_mark: 트랜잭션 해시.                                                                                                                                                          |
| input               | (covered in below sections)                                                        | 해당 영역에 대한 설명은 아래의 세부 트랜잭션 항목들에서 다룹니다.                                                                                                                                                  |
| 논스                  | 논스                                                                                 | :white_check_mark: 트랜잭션 발신자가 이 트랜잭션 이전까지 전송했던 트랜잭션의 개수입니다.                                                                                                                           |
|                     | [senderTxHash](../../../../klaytn/design/transactions/README.md#sendertxhash)(생략됨) | :warning: Ethereum 기본 트랜잭션에는 해당 필드가 존재하지 않기 때문에 생략합니다.                                                                                                                                 |
|                     | signatures(생략됨)                                                                    | :warning: Ethereum 기본 트랜잭션에는 해당 필드가 존재하지 않기 때문에 생략합니다.                                                                                                                                 |
| to                  | (covered in below sections)                                                        | 해당 영역에 대한 설명은 아래의 세부 트랜잭션 항목들에서 다룹니다.                                                                                                                                                  |
| transactionIndex    | transactionIndex                                                                   | :warning: 거의 이더리움과 동일하지만, 이더리움과 다르게 Klaytn은 트랜잭션이 보류 중인 상태에서 그대로 정수를 반환합니다.                                                                                                            |
| value               | (covered in below sections)                                                        | 해당 영역에 대한 설명은 아래의 세부 트랜잭션 항목들에서 다룹니다.                                                                                                                                                  |
| 형식                  | type(변환됨)                                                                          | :warning: Klaytn에서 `type` 은 트랜잭션 타입을 문자열로 반환하지만 (예: `"LegacyTransaction"`), 이더리움과 일치하도록 16진수로 변환되었습니다 (예: `0x0`). Transaction types that are only valid in Klaytn always return `0x0`. |
|                     | typeInt(생략됨)                                                                       | :warning: Ethereum 기본 트랜잭션에는 해당 필드가 존재하지 않기 때문에 생략합니다.                                                                                                                                 |
| v                   | (added)                                                                            | :warning: Klaytn은 다중서명을 지원하므로 Klaytn의 트랜잭션은 하나 이상의 서명을 가질 수 있습니다. `signatures[0].V`는 `v` 영역의 값으로 사용됩니다.                                                                                |
| r                   | (added)                                                                            | :warning: Klaytn은 다중서명을 지원하므로 Klaytn의 트랜잭션은 하나 이상의 서명을 가질 수 있습니다. `signatures[0].R`은 `r` 영역의 값으로 사용됩니다.                                                                                |
| s                   | (added)                                                                            | :warning: Klaytn은 다중서명을 지원하므로 Klaytn의 트랜잭션은 하나 이상의 서명을 가질 수 있습니다. `signatures[0].S`는 `s` 영역의 값으로 사용됩니다.                                                                                |

### [수수료 위임](../../../../klaytn/design/transactions/fee-delegation.md)의 공통 영역
Klaytn의 다양한 [수수료 위임](../../../../klaytn/design/transactions/fee-delegation.md) 트랜잭션 유형과 상관없이, 공통 영역들이 존재합니다. 이 장은 수수료 위임의 공통 영역(위에서 다룬 공통 영역을 제외하고)이 어떻게 이더리움 기본 트랜잭션으로써 제공되는지를 기술합니다.

| Ethereum 기본 트랜잭션 영역 | Klaytn 수수료 위임 트랜잭션 영역   | 설명                                                     |
| ------------------- | ----------------------- | ------------------------------------------------------ |
|                     | feePayer(생략됨)           | :warning: Ethereum 기본 트랜잭션에는 해당 필드가 존재하지 않기 때문에 생략합니다. |
|                     | feePayerSignatures(생략됨) | :warning: Ethereum 기본 트랜잭션에는 해당 필드가 존재하지 않기 때문에 생략합니다. |

### [부분 수수료 위임](../../../../klaytn/design/transactions/partial-fee-delegation.md)의 공통 영역
Klaytn의 다양한 [부분 수수료 위임](../../../../klaytn/design/transactions/partial-fee-delegation.md) 트랜잭션 유형과 상관없이, 공통 영역들이 존재합니다. 이 장은 부분 수수료 위임의 공통 영역(위에서 다룬 공통 영역을 제외하고)이 어떻게 이더리움 기본 트랜잭션으로써 제공되는지를 기술합니다.

| Ethereum 기본 트랜잭션 영역 | Klaytn 부분 수수료 위임 트랜잭션 영역 | 설명                                                     |
| ------------------- | ------------------------ | ------------------------------------------------------ |
|                     | feeRatio(생략됨)            | :warning: Ethereum 기본 트랜잭션에는 해당 필드가 존재하지 않기 때문에 생략합니다. |

### 각 트랜잭션 유형의 비공통 영역
#### LegacyTransaction

| Ethereum 기본 트랜잭션 영역 | Klaytn 기본 트랜잭션 영역 | 설명                                                           |
| ------------------- | ----------------- | ------------------------------------------------------------ |
| input               | input             | :white_check_mark: 트랜잭션과 함께 전송된 데이터입니다.                    |
| to                  | to                | :white_check_mark: 발신자의 주소. 컨트랙트 생성 트랜잭션이라면 `null`를 반환합니다. |
| value               | value             | :white_check_mark: Peb단위로 전송된 값입니다.                        |

**Klaytn LegacyTransaction**은 아래와 같이 Ethereum 기본 트랜잭션으로써 제공됩니다.
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x0f5fa35be72c9c49a60c936ccdf0e85210c12ea227e679f32a6dc6c84c3cb859",
    "blockNumber": "0x47ef00c",
    "from": "0xbd4fa032e6afe41cacde8e3292fb129b857bfca8",
    "gas": "0x204c8e",
    "gasPrice": "0x5d21dba00",
    "hash": "0x6ad3b34e12242a2ef8daadea7ebf538f735d9cad400e1a8745263c877cfb9058",
    "input": "0xe2bbb1580...",
    "nonce": "0x22aa",
    /** "senderTxHash": "0x6ad3b34e12242a2ef8daadea7ebf538f735d9cad400e1a8745263c877cfb9058", omitted */
    /** "signatures": [ 
      { 
        "V": "0x4055", 
        "R": "0xcf815d41522d4c95d1b86b956c1101b8fef9d446358e7675e8db467ada6b7549", 
        "S": "0x39b7e32b8d689737f57ef005f13f9c65abaf89d8444b7f286a43d7df6c684d69" 
      } 
    ], omitted */
    "r": "0xcf815d41522d4c95d1b86b956c1101b8fef9d446358e7675e8db467ada6b7549", /** added */
    "s": "0x39b7e32b8d689737f57ef005f13f9c65abaf89d8444b7f286a43d7df6c684d69", /** added */
    "to": "0x0cddc42b218a109ca4cf93cbef1f8740d72af7b2",
    "transactionIndex": "0xe",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    "v": "0x4055" /** added */
    /** "typeInt": 0, omitted */
    "value": "0x0"
  }
}
```

#### ValueTransfer

| Ethereum 기본 트랜잭션 영역 | Klaytn ValueTransfer 트랜잭션 영역 | 설명                                                                                     |
| ------------------- | ---------------------------- | -------------------------------------------------------------------------------------- |
| input               | (added)                      | :warning: 해당 필드는 Klaytn ValueTransfer 트랜잭션에 존재하지 않기 때문에, 항상 빈 입력값을 뜻하는 `0x`를 값으로 가집니다. |
| to                  | to                           | :white_check_mark: 발신자의 주소.                                                          |
| value               | value                        | :white_check_mark: Peb단위로 전송된 값입니다.                                                  |

**Klaytn ValueTransfer Transaction**은 아래와 같이 Ethereum 기본 트랜잭션으로써 제공됩니다.
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x0f5fa35be72c9c49a60c936ccdf0e85210c12ea227e679f32a6dc6c84c3cb859",
    "blockNumber": "0x47ef00c",
    "from": "0xbd4fa032e6afe41cacde8e3292fb129b857bfca8",
    "gas": "0x204c8e",
    "gasPrice": "0x5d21dba00",
    "hash": "0x6ad3b34e12242a2ef8daadea7ebf538f735d9cad400e1a8745263c877cfb9058",
    "input": "0x", /** added */
    "nonce": "0x22aa",
    /** "senderTxHash": "0x6ad3b34e12242a2ef8daadea7ebf538f735d9cad400e1a8745263c877cfb9058", omitted */
    /** "signatures": [ 
      { 
        "V": "0x4055", 
        "R": "0xcf815d41522d4c95d1b86b956c1101b8fef9d446358e7675e8db467ada6b7549", 
        "S": "0x39b7e32b8d689737f57ef005f13f9c65abaf89d8444b7f286a43d7df6c684d69" 
      } 
    ], omitted */
    "r": "0xcf815d41522d4c95d1b86b956c1101b8fef9d446358e7675e8db467ada6b7549", /** added */
    "s": "0x39b7e32b8d689737f57ef005f13f9c65abaf89d8444b7f286a43d7df6c684d69", /** added */
    "to": "0x0cddc42b218a109ca4cf93cbef1f8740d72af7b2",
    "transactionIndex": "0xe",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    "v": "0x4055" /** added */
    /** "typeInt": 8, omitted */
    "value": "0x49249695"
  }
}
```

#### ValueTransferMemo

| Ethereum 기본 트랜잭션 영역 | Klaytn ValueTransferMemo 트랜잭션 영역 | 설명                                        |
| ------------------- | -------------------------------- | ----------------------------------------- |
| input               | input                            | :white_check_mark: 트랜잭션과 함께 전송된 데이터입니다. |
| to                  | to                               | :white_check_mark: 발신자의 주소.             |
| value               | value                            | :white_check_mark: Peb단위로 전송된 값입니다.     |

**Klaytn ValueTransferMemo Transaction**은 아래와 같이 Ethereum 기본 트랜잭션으로써 제공됩니다.
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x0f5fa35be72c9c49a60c936ccdf0e85210c12ea227e679f32a6dc6c84c3cb859",
    "blockNumber": "0x47ef00c",
    "from": "0xbd4fa032e6afe41cacde8e3292fb129b857bfca8",
    "gas": "0x204c8e",
    "gasPrice": "0x5d21dba00",
    "hash": "0x6ad3b34e12242a2ef8daadea7ebf538f735d9cad400e1a8745263c877cfb9058",
    "input": "0x32104204104", 
    "nonce": "0x22aa",
    /** "senderTxHash": "0x6ad3b34e12242a2ef8daadea7ebf538f735d9cad400e1a8745263c877cfb9058", omitted */
    /** "signatures": [ 
      { 
        "V": "0x4055", 
        "R": "0xcf815d41522d4c95d1b86b956c1101b8fef9d446358e7675e8db467ada6b7549", 
        "S": "0x39b7e32b8d689737f57ef005f13f9c65abaf89d8444b7f286a43d7df6c684d69" 
      } 
    ], omitted */
    "r": "0xcf815d41522d4c95d1b86b956c1101b8fef9d446358e7675e8db467ada6b7549", /** added */
    "s": "0x39b7e32b8d689737f57ef005f13f9c65abaf89d8444b7f286a43d7df6c684d69", /** added */
    "to": "0x0cddc42b218a109ca4cf93cbef1f8740d72af7b2",
    "transactionIndex": "0xe",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    "v": "0x4055" /** added */
    /** "typeInt": 16, omitted */
    "value": "0x49249695"
  }
}
```

#### SmartContractDeploy

| Ethereum 기본 트랜잭션 영역 | Klaytn SmartContractDeploy 트랜잭션 영역 | 설명                                                                            |
| ------------------- | ---------------------------------- | ----------------------------------------------------------------------------- |
|                     | codeFormat(생략됨)                    | :warning: Ethereum 기본 트랜잭션에는 해당 필드가 존재하지 않기 때문에 생략합니다.                        |
|                     | humanReadable(생략됨)                 | :warning: Ethereum 기본 트랜잭션에는 해당 필드가 존재하지 않기 때문에 생략합니다.                        |
| input               | input                              | :white_check_mark: 트랜잭션과 함께 전송된 데이터입니다.                                     |
| to                  | to                                 | :white_check_mark: 발신자의 주소. 컨트랙트 생성 트랜잭션이기 때문에, 해당 필드는 항상 `null`을 값으로 가집니다. |
| value               | value                              | :white_check_mark: Peb단위로 전송된 값입니다.                                         |

**Klaytn SmartContractDeploy Transaction**은 아래와 같이 Ethereum 기본 트랜잭션으로써 제공됩니다.
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x93ec6f013194d4a16453fd17fb98630b89d763532208a7712d12e8fcf3900f3a",
    "blockNumber": "0x4857712",
    /** "codeFormat": "0x0", omitted */
    "from": "0x760fcf5159263b7cf39b0751e7d2bb008d09147d",
    "gas": "0x5b8d80",
    "gasPrice": "0x5d21dba00",
    "hash": "0xbf230e13023aad3c3c758b07ee3d2f7eaac45b301972f1bfa49a5bf49a1ccd7c",
    /** "humanReadable": false, omitted */
    "input": "0x6080...",
    "nonce": "0x2",
    /** "senderTxHash": "0x104e27f4cd69215f0080eca9f51bf06232c107b3209e16a7c004c7b5e619c846", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "r": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9", /** added */
    "s": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec", /** added */
    "to": "null",
    "transactionIndex": "0x6",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    "v": "0x4055" /** added */
    /** "typeInt": 40, omitted */
    "value": "0x0"
  }
}
```

#### SmartContractExecution

| Ethereum 기본 트랜잭션 영역 | Klaytn SmartContractExecution 트랜잭션 영역 | 설명                                        |
| ------------------- | ------------------------------------- | ----------------------------------------- |
| input               | input                                 | :white_check_mark: 트랜잭션과 함께 전송된 데이터입니다. |
| to                  | to                                    | :white_check_mark: 스마트 컨트랙트의 주소.        |
| value               | value                                 | :white_check_mark: Peb단위로 전송된 값입니다.     |

**Klaytn SmartContractExecution Transaction**은 아래와 같이 Ethereum 기본 트랜잭션으로써 제공됩니다.
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x93ec6f013194d4a16453fd17fb98630b89d763532208a7712d12e8fcf3900f3a",
    "blockNumber": "0x4857712",
    "from": "0x760fcf5159263b7cf39b0751e7d2bb008d09147d",
    "gas": "0x5b8d80",
    "gasPrice": "0x5d21dba00",
    "hash": "0xbf230e13023aad3c3c758b07ee3d2f7eaac45b301972f1bfa49a5bf49a1ccd7c",
    "input": "0x6080...",
    "nonce": "0x2",
    /** "senderTxHash": "0x104e27f4cd69215f0080eca9f51bf06232c107b3209e16a7c004c7b5e619c846", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "r": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9", /** added */
    "s": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec", /** added */
    "to": "0x6e71df210046227af62323ae35c0ea5e606a349c",
    "transactionIndex": "0x6",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    "v": "0x4055" /** added */
    /** "typeInt": 48, omitted */
    "value": "0x6449e84e47a8a80000"
  }
}
```

#### AccountUpdate

| Ethereum 기본 트랜잭션 영역 | Klaytn AccountUpdate 트랜잭션 영역 | 설명                                                                                                                     |
| ------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
|                     | key(생략됨)                     | :warning: Ethereum 기본 트랜잭션에는 해당 필드가 존재하지 않기 때문에 생략합니다.                                                                 |
| input               | (added)                      | :warning: 해당 필드는 Klaytn AccountUpdate 트랜잭션에 존재하지 않기 때문에, 항상 빈 입력값을 뜻하는 `0x`를 값으로 가집니다.                                 |
| to                  | (added)                      | :warning: 해당 필드는 Klaytn AccoutUpdate 트랜잭션에 존재하지 않고, `from`을 필드의 값으로 주는 것이 가장 의미에 부합하기 때문에, `from`과 항상 같은 주소를 값으로 가집니다. |
| value               | (added)                      | :warning: 해당 필드는 Klaytn AccountUpdate 트랜잭션에 존재하지 않기 때문에, 항상 `0x0`을 값으로 가집니다.                                           |

**Klaytn AccountUpdate Transaction** is served as Ethereum Legacy Transaction like below.
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x93ec6f013194d4a16453fd17fb98630b89d763532208a7712d12e8fcf3900f3a",
    "blockNumber": "0x4857712",
    "from": "0x760fcf5159263b7cf39b0751e7d2bb008d09147d",
    "gas": "0x5b8d80",
    "gasPrice": "0x5d21dba00",
    "hash": "0xbf230e13023aad3c3c758b07ee3d2f7eaac45b301972f1bfa49a5bf49a1ccd7c",
    /** "key": "0x02a103bf900d727fcbb4baa9f9ffc840ba947af7c7dae52ad6ef453ab5d50942e18b2f", omitted */
    "input": "0x6080...",
    "nonce": "0x2",
    /** "senderTxHash": "0x104e27f4cd69215f0080eca9f51bf06232c107b3209e16a7c004c7b5e619c846", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "r": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9", /** added */
    "s": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec", /** added */
    "to": "0x760fcf5159263b7cf39b0751e7d2bb008d09147d", /** added */
    "transactionIndex": "0x6",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    "v": "0x4055" /** added */
    /** "typeInt": 32, omitted */
    "value": "0x6449e84e47a8a80000"
  }
}
```

#### Cancel

| Ethereum 기본 트랜잭션 영역 | Klaytn Cancel 트랜잭션 영역 | 설명                                                                                                               |
| ------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------- |
| input               | (added)               | :warning: 해당 필드는 Klaytn Cancel 트랜잭션에 존재하지 않기 때문에, 항상 빈 입력값을 뜻하는 `0x`를 값으로 가집니다.                                  |
| to                  | (added)               | :warning: 해당 필드는 Klaytn Cancel 트랜잭션에 존재하지 않고, `from`을 필드의 값으로 주는 것이 가장 의미에 부합하기 때문에, `from`과 항상 같은 주소를 값으로 가집니다. |
| value               | (added)               | :warning: 해당 필드는 Klaytn Cancel 트랜잭션에 존재하지 않기 때문에, 항상 `0x0`을 값으로 가집니다.                                            |

**Klaytn Cancel Transaction**은 아래와 같이 Ethereum 기본 트랜잭션으로써 제공됩니다.
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x93ec6f013194d4a16453fd17fb98630b89d763532208a7712d12e8fcf3900f3a",
    "blockNumber": "0x4857712",
    "from": "0x760fcf5159263b7cf39b0751e7d2bb008d09147d",
    "gas": "0x5b8d80",
    "gasPrice": "0x5d21dba00",
    "hash": "0xbf230e13023aad3c3c758b07ee3d2f7eaac45b301972f1bfa49a5bf49a1ccd7c",
    "input": "0x", /** added */
    "nonce": "0x2",
    /** "senderTxHash": "0x104e27f4cd69215f0080eca9f51bf06232c107b3209e16a7c004c7b5e619c846", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "r": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9", /** added */
    "s": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec", /** added */
    "to": "0x760fcf5159263b7cf39b0751e7d2bb008d09147d", /** added */
    "transactionIndex": "0x6",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    "v": "0x4055" /** added */
    /** "typeInt": 56, omitted */
    "value": "0x0" /** added */
  }
}
```

#### ChainDataAnchoring

| Ethereum 기본 트랜잭션 영역 | Klaytn ChainDataAnchoring 트랜잭션 영역 | 설명                                                                                                                           |
| ------------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| input               | input                             | :white_check_mark: 트랜잭션과 함께 전송된 데이터입니다.                                                                                    |
|                     | inputJSON(생략됨)                    | :warning: Ethereum 기본 트랜잭션에는 해당 필드가 존재하지 않기 때문에 생략합니다.                                                                       |
| to                  | (added)                           | :warning: 해당 필드는 Klaytn ChainDataAnchoring 트랜잭션에 존재하지 않고, `from`을 필드의 값으로 주는 것이 가장 의미에 부합하기 때문에, `from`과 항상 같은 주소를 값으로 가집니다. |
| value               | (added)                           | :warning: 해당 필드는 Klaytn ChainDataAnchoring 트랜잭션에 존재하지 않기 때문에, 항상 `0x0`을 값으로 가집니다.                                            |

**Klaytn ChainDataAnchoring Transaction**은 아래와 같이 Ethereum 기본 트랜잭션으로써 제공됩니다.
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0xfec3dab64552e3148d8dbf8fba0bdcc4f170b458683065cf47e67c35e45ac395",
    "blockNumber": "0x3052bb2",
    "from": "0x89ecb00d2a52f2d4ead1578d60928a19ad3224bd",
    "gas": "0x186a0",
    "gasPrice": "0x5d21dba00",
    "hash": "0x9d64d2fb416cb4e4c2c9a4575b627d291c5139d477356af767f35dc5a887c138",
    "input": "0xf8129412941294129.",
    /** "inputJSON": {
      "blockHash": "0x2b69e9532eddd9a25dc48c53253d8bc93a29770362a8f778fe799e3493cad626",
      "transactionsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      "parentHash": "0x094084ac3580231708c2a2dcbcf39f712a61dcc070b76a7eaaaf8b6f07a9549c",
      "receiptsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      "stateRoot": "0x768b8ae0874e4ac5e3ef9bccbeb417b4207d562b85dfb30ecf9cc8344209a5e6",
      "blockNumber": 43372800,
      "blockCount": 86400,
      "txCount": 53777
    }, omitted */
    "nonce": "0x278",
    /** "senderTxHash": "0x104e27f4cd69215f0080eca9f51bf06232c107b3209e16a7c004c7b5e619c846", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "r": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9", /** added */
    "s": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec", /** added */
    "to": "0x89ecb00d2a52f2d4ead1578d60928a19ad3224bd", /** added */
    "transactionIndex": "0x6",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    "v": "0x4055" /** added */
    /** "typeInt": 72, omitted */
    "value": "0x0" /** added */
  }
}
```

## Transaction Receipt <a id="transaction_receipt"></a>

관련된 APIs: [eth_getTransactionReceipt](./transaction.md/#eth_gettransactionreceipt).

기본적으로, Klaytn Transaction Receipt의 영역들은 트랜잭션 유형에 따라 다릅니다. Klaytn에는 많은 트랜잭션 유형이 있기 때문에, 트랜잭션 영수증의 필드들은 트랜잭션 유형에 따라 다릅니다.

eth namespace JSON-RPC apis를 통해 Klaytn 트랜잭션 영수증들을 쿼리할 때, Klaytn 트랜잭션 영수증은 이더리움 트랜잭션 영수증 형식으로 반환될 것입니다.

본 문서에서는 변환 과정을 상세히 기술합니다. (Klaytn 트랜잭션 영수증 -> 이더리움 트랜잭션 영수증).

* 설명란의 :warning:을 자세히 읽으십시오.
* 설명란의 :white_check_mark: 아이콘은 해당 필드가 이더리움과 동일하다는 것을 뜻합니다.

### 공통 영역

공통 영역은 다양한 Klaytn 트랜잭션 종류와 무관합니다. (Klaytn 트랜잭션 영수증의 영역들은 트랜잭션 종류에 따라 달라집니다.)

이 장에서는 공통 영역들이 어떻게 이더리움 트랜잭션 영수증으로써 제공되는지를 기술합니다.

| Ethereum 트랜잭션 영수증 영역 | Klaytn 트랜잭션 영수증 영역                                                                 | 설명                                                                                                                                                                                 |
| -------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockHash            | blockHash                                                                          | :white_check_mark: 블록 해시.                                                                                                                                                        |
| blockNumber          | blockNumber                                                                        | :white_check_mark: 블록 번호.                                                                                                                                                        |
| contractAddress      | contractAddress                                                                    | :white_check_mark: 컨트랙트 생성 트랜잭션이면 생성된 컨트랙트의 주소를 반환합니다. 컨트랙트 생성 트랜잭션이 아닌 경우 `null`을 반환합니다.                                                                                        |
| cumulativeGasUsed    | (added)                                                                            | :warning: 트랜잭션이 블록에서 실행되었을 때 소모한 총 가스의 양. 이더리움 영역과 같은 의미로 제공됩니다.                                                                                                                   |
| effectiveGasPrice    | (added)                                                                            | :warning: Klaytn은 고정된 가스 가격 정책을 사용하므로, gasPrice 값을 반환합니다. gasPrice([단가](../../../../klaytn/design/transaction-fees/transaction-fees.md#unit-price)라고도 함)는 거버넌스에 의해 시스템에 설정되어 있습니다. |
| from                 | from                                                                               | :white_check_mark: 발신자의 주소.                                                                                                                                                      |
|                      | gas(생략됨)                                                                           | :warning: Ethereum 트랜잭션 영수증에는 해당 필드가 존재하지 않기 때문에 생략합니다.                                                                                                                            |
| gasUsed              | gasUsed                                                                            | :white_check_mark: 이 트랜잭션에서만 사용된 가스양입니다.                                                                                                                                         |
|                      | gasPrice(생략됨)                                                                      | :warning: Ethereum 트랜잭션 영수증에는 해당 필드가 존재하지 않기 때문에 생략합니다.                                                                                                                            |
| 로그                   | 로그                                                                                 | :white_check_mark: 트랜잭션들에 의해 생성된 로그 객체의 배열입니다.                                                                                                                                   |
| logsBloom            | logsBloom                                                                          | :white_check_mark: 라이트 클라이언트가 관련된 로그를 빠르게 검색할 수 있도록 하는 블룸필터입니다.                                                                                                                  |
|                      | nonce(생략됨)                                                                         | :warning: Ethereum 트랜잭션 영수증에는 해당 필드가 존재하지 않기 때문에 생략합니다.                                                                                                                            |
|                      | [senderTxHash](../../../../klaytn/design/transactions/README.md#sendertxhash)(생략됨) | :warning: Ethereum 트랜잭션 영수증에는 해당 필드가 존재하지 않기 때문에 생략합니다.                                                                                                                            |
|                      | signatures(생략됨)                                                                    | :warning: Ethereum 트랜잭션 영수증에는 해당 필드가 존재하지 않기 때문에 생략합니다.                                                                                                                            |
| 상태                   | 상태                                                                                 | :white_check_mark: 1(성공) 혹은 0(실패)입니다.                                                                                                                                            |
| to                   | (covered in below sections)                                                        | 해당 영역에 대한 설명은 아래의 세부 트랜잭션 항목들에서 다룹니다.                                                                                                                                              |
| transactionHash      | transactionHash                                                                    | :white_check_mark: 트랜잭션 해시.                                                                                                                                                      |
| transactionIndex     | transactionIndex                                                                   | :warning: 거의 이더리움과 동일하지만, 이더리움과 다르게 Klaytn은 트랜잭션이 보류 중인 상태에서 그대로 정수를 반환합니다.                                                                                                        |
| 형식                   | type(변환됨)                                                                          | :warning: 해당 필드의 값과 데이터 타입은 변환됩니다. Klaytn에서 해당 필드의 타입은 문자열이지만(예. `"LegacyTransaction"`), 이더리움 트랜잭션 영수증과 같이 16진수로 변환되어 제공됩니다.(예. `0x`)                                              |
|                      | typeInt(생략됨)                                                                       | :warning: Ethereum 트랜잭션 영수증에는 해당 필드가 존재하지 않기 때문에 생략합니다.                                                                                                                            |

### [수수료 위임](../../../../klaytn/design/transactions/fee-delegation.md)의 공통 영역
Klaytn의 다양한 [수수료 위임](../../../../klaytn/design/transactions/fee-delegation.md) 트랜잭션 유형과 상관없이, 공통 영역들이 존재합니다. (Klaytn 트랜잭션 영수증의 영역들은 트랜잭션 종류에 따라 달라집니다.)

이 장은 수수료 위임의 공통 영역(위에서 다룬 공통 영역을 제외하고)이 어떻게 이더리움 트랜잭션 영수증으로써 제공되는지를 기술합니다.

| Ethereum 트랜잭션 영수증 영역 | Klaytn FeeDelegation Transaction Receipt Field | 설명                                                      |
| -------------------- | ---------------------------------------------- | ------------------------------------------------------- |
|                      | feePayer(생략됨)                                  | :warning: Ethereum 트랜잭션 영수증에는 해당 필드가 존재하지 않기 때문에 생략합니다. |
|                      | feePayerSignatures(생략됨)                        | :warning: Ethereum 트랜잭션 영수증에는 해당 필드가 존재하지 않기 때문에 생략합니다. |

### [부분 수수료 위임](../../../../klaytn/design/transactions/partial-fee-delegation.md)의 공통 영역
Klaytn의 다양한 [부분 수수료 위임](../../../../klaytn/design/transactions/partial-fee-delegation.md) 트랜잭션 유형과 상관없이, 공통 영역들이 존재합니다. (Klaytn 트랜잭션 영수증의 영역들은 트랜잭션 종류에 따라 달라집니다.)

이 장은 부분 수수료 위임의 공통 영역(위에서 다룬 공통 영역을 제외하고)이 어떻게 이더리움 트랜잭션 영수증으로써 제공되는지를 기술합니다.

| Ethereum 트랜잭션 영수증 영역 | Klaytn PartialFeeDelegation Transaction Receipt Field | 설명                                                      |
| -------------------- | ----------------------------------------------------- | ------------------------------------------------------- |
|                      | feeRatio(생략됨)                                         | :warning: Ethereum 트랜잭션 영수증에는 해당 필드가 존재하지 않기 때문에 생략합니다. |

### 각 트랜잭션 유형의 비공통 영역
#### 레거시 트랜잭션 영수증

| Ethereum 트랜잭션 영수증 영역 | Klaytn LegacyTransaction Receipt Field | 설명                                                           |
| -------------------- | -------------------------------------- | ------------------------------------------------------------ |
|                      | input(생략됨)                             | :warning: Ethereum 트랜잭션 영수증에는 해당 필드가 존재하지 않기 때문에 생략합니다.      |
| to                   | to                                     | :white_check_mark: 발신자의 주소. 컨트랙트 생성 트랜잭션이라면 `null`를 반환합니다. |
|                      | value(생략됨)                             | :warning: Ethereum 트랜잭션 영수증에는 해당 필드가 존재하지 않기 때문에 생략합니다.      |

**Klaytn LegacyTransaction Receipt**은 아래와 같이 Ethereum 트랜잭션 영수증으로써 제공됩니다.
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x0f5fa35be72c9c49a60c936ccdf0e85210c12ea227e679f32a6dc6c84c3cb859",
    "blockNumber": "0x47ef00c",
    "contractAddress": null,
    "cumulativeGasUsed": "0xa0dbd0", /** added */
    "effectiveGasPrice": "0x143ec7aafa", /** added */
    "from": "0xbd4fa032e6afe41cacde8e3292fb129b857bfca8",
    /** "gas": "0x204c8e", omitted */
    /** "gasPrice": "0x5d21dba00", omitted */
    "gasUsed": "0x1c278",
    /** "input": "0xe2b...", omitted */
    "logs": [
      {
        "address": "0x0cddc42b218a109ca4cf93cbef1f8740d72af7b2",
        "topics": [
          "0x90890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a15",
          "0x000000000000000000000000bd4fa032e6afe41cacde8e3292fb129b857bfca8",
          "0x0000000000000000000000000000000000000000000000000000000000000003"
        ],
        "data": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "blockNumber": "0x47ef00c",
        "transactionHash": "0x6ad3b34e12242a2ef8daadea7ebf538f735d9cad400e1a8745263c877cfb9058",
        "transactionIndex": "0xe",
        "blockHash": "0x0f5fa35be72c9c49a60c936ccdf0e85210c12ea227e679f32a6dc6c84c3cb859",
        "logIndex": "0xa",
        "removed": false
      }
    ],
    "logsBloom": "0x00...",
    /** "nonce": "0x22aa", omitted */
    /** "senderTxHash": "0x6ad3b34e12242a2ef8daadea7ebf538f735d9cad400e1a8745263c877cfb9058", omitted */
    /** "signatures": [ 
      { 
        "V": "0x4055", 
        "R": "0xcf815d41522d4c95d1b86b956c1101b8fef9d446358e7675e8db467ada6b7549", 
        "S": "0x39b7e32b8d689737f57ef005f13f9c65abaf89d8444b7f286a43d7df6c684d69" 
      } 
    ], omitted */
    "status": "0x1",
    "to": "0x0cddc42b218a109ca4cf93cbef1f8740d72af7b2",
    "transactionHash": "0x6ad3b34e12242a2ef8daadea7ebf538f735d9cad400e1a8745263c877cfb9058",
    "transactionIndex": "0xe",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    /** "typeInt": 0, omitted */
    /** "value": "0x0" omitted */
  }
}
```

#### ValueTransfer 트랜잭션 영수증

| Ethereum 트랜잭션 영수증 영역 | Klaytn ValueTransfer Transaction Receipt Field | 설명                                                      |
| -------------------- | ---------------------------------------------- | ------------------------------------------------------- |
| to                   | to                                             | :white_check_mark: 발신자의 주소.                           |
|                      | value(생략됨)                                     | :warning: Ethereum 트랜잭션 영수증에는 해당 필드가 존재하지 않기 때문에 생략합니다. |

**Klaytn ValueTransfer Transaction Receipt**은 아래와 같이 Ethereum 트랜잭션 영수증으로써 제공됩니다.
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0xa500c5bc0e0410a60961fca0a4beceb19f1af9a42c5cbcfad7818865eb0ee114",
    "blockNumber": "0x487d166",
    "contractAddress": null,
    "cumulativeGasUsed": "0xa0dbd0", /** added */
    "effectiveGasPrice": "0x143ec7aafa", /** added */
    "from": "0x5386d9f21be7034ba3aeadc7bedb5ea4dd538237",
    /** "gas": "0x5208", omitted */
    /** "gasPrice": "0x5d21dba00", omitted */
    "gasUsed": "0x5208",
    "logs": [],
    "logsBloom": "0x00...",
    /** "nonce": "0x120", omitted */
    /** "senderTxHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "status": "0x1",
    "to": "0x5994af2bfe0bdaf7f66ec3d7924e5647094718bf",
    "transactionHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf",
    "transactionIndex": "0x5",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    /** "typeInt": 8, omitted */
    /** "value": "0xa5c40c07eb33e87000" omitted */
  }
}
```

#### ValueTransferMemo 트랜잭션 영수증

| Ethereum 트랜잭션 영수증 영역 | Klaytn ValueTransferMemo Transaction Receipt Field | 설명                                                      |
| -------------------- | -------------------------------------------------- | ------------------------------------------------------- |
|                      | input(생략됨)                                         | :warning: Ethereum 트랜잭션 영수증에는 해당 필드가 존재하지 않기 때문에 생략합니다. |
| to                   | to                                                 | :white_check_mark: 발신자의 주소.                           |
|                      | value(생략됨)                                         | :warning: Ethereum 트랜잭션 영수증에는 해당 필드가 존재하지 않기 때문에 생략합니다. |

**Klaytn ValueTransferMemo Transaction**은 아래와 같이 Ethereum 트랜잭션 영수증으로써 제공됩니다.
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0xa500c5bc0e0410a60961fca0a4beceb19f1af9a42c5cbcfad7818865eb0ee114",
    "blockNumber": "0x487d166",
    "contractAddress": null,
    "cumulativeGasUsed": "0xa0dbd0", /** added */
    "effectiveGasPrice": "0x143ec7aafa", /** added */
    "from": "0x5386d9f21be7034ba3aeadc7bedb5ea4dd538237",
    /** "gas": "0x5208", omitted */
    /** "gasPrice": "0x5d21dba00", omitted */
    "gasUsed": "0x5208",
    /** "input": "0x32142912492149122", omitted */
    "logs": [],
    "logsBloom": "0x00...",
    /** "nonce": "0x120", omitted */
    /** "senderTxHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "status": "0x1",
    "to": "0x5994af2bfe0bdaf7f66ec3d7924e5647094718bf",
    "transactionHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf",
    "transactionIndex": "0x5",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    /** "typeInt": 16, omitted */
    /** "value": "0xa5c40c07eb33e87000" omitted */
  }
}
```

#### SmartContractDeploy Transaction Receipt

| Ethereum 트랜잭션 영수증 영역 | Klaytn SmartContractDeploy Transaction Receipt Field | 설명                                                                            |
| -------------------- | ---------------------------------------------------- | ----------------------------------------------------------------------------- |
|                      | codeFormat(생략됨)                                      | :warning: Ethereum 트랜잭션 영수증에는 해당 필드가 존재하지 않기 때문에 생략합니다.                       |
|                      | humanReadable(생략됨)                                   | :warning: Ethereum 트랜잭션 영수증에는 해당 필드가 존재하지 않기 때문에 생략합니다.                       |
|                      | input                                                | :warning: Ethereum 트랜잭션 영수증에는 해당 필드가 존재하지 않기 때문에 생략합니다.                       |
| to                   | to                                                   | :white_check_mark: 발신자의 주소. 컨트랙트 생성 트랜잭션이기 때문에, 해당 필드는 항상 `null`을 값으로 가집니다. |
|                      | value                                                | :warning: Ethereum 트랜잭션 영수증에는 해당 필드가 존재하지 않기 때문에 생략합니다.                       |

**Klaytn SmartContractDeploy Transaction Receipt**은 아래와 같이 Ethereum 트랜잭션 영수증으로써 제공됩니다.
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0xda357820b1d70922422219dd6d2d3507f4af32588b90a0a7f825ce36887f2de6",
    "blockNumber": "0x487d166",
    /** "codeFormat": "0x0", omitted */
    "contractAddress": null,
    "cumulativeGasUsed": "0xa0dbd0", /** added */
    "effectiveGasPrice": "0x143ec7aafa", /** added */
    "from": "0x5386d9f21be7034ba3aeadc7bedb5ea4dd538237",
    /** "gas": "0x5208", omitted */
    /** "gasPrice": "0x5d21dba00", omitted */
    "gasUsed": "0x5208",
    /** "humanReadable": false, omitted */
    /** "input": "0x6080...", omitted */
    "logs": [
      {
        "address": "0xf1ac00f758a5baf71507e1d62e2c9dab6aaaf49f",
        "topics": [
          "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0",
          "0x0000000000000000000000000000000000000000000000000000000000000000",
          "0x000000000000000000000000760fcf5159263b7cf39b0751e7d2bb008d09147d"
        ],
        "data": "0x",
        "blockNumber": "0x4857712",
        "transactionHash": "0xbf230e13023aad3c3c758b07ee3d2f7eaac45b301972f1bfa49a5bf49a1ccd7c",
        "transactionIndex": "0x6",
        "blockHash": "0x93ec6f013194d4a16453fd17fb98630b89d763532208a7712d12e8fcf3900f3a",
        "logIndex": "0x42",
        "removed": false
      }
    ],
    "logsBloom": "0x00...",
    /** "nonce": "0x120", omitted */
    /** "senderTxHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "status": "0x1",
    "to": null,
    "transactionHash": "0x7ef015c30dbe02cf68870a8b740635266e28abe25d68c4f467affe88956729c4",
    "transactionIndex": "0x5",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    /** "typeInt": 40, omitted */
    /** "value": "0x0" omitted */
  }
}
```

#### SmartContractExecution Transaction Receipt

| Ethereum 트랜잭션 영수증 영역 | Klaytn SmartContractExecution Transaction Receipt Field | 설명                                                      |
| -------------------- | ------------------------------------------------------- | ------------------------------------------------------- |
|                      | input                                                   | :warning: Ethereum 트랜잭션 영수증에는 해당 필드가 존재하지 않기 때문에 생략합니다. |
| to                   | to                                                      | :white_check_mark: 스마트 컨트랙트의 주소.                      |
|                      | value                                                   | :warning: Ethereum 트랜잭션 영수증에는 해당 필드가 존재하지 않기 때문에 생략합니다. |

**Klaytn SmartContractExecution Transaction Receipt**은 아래와 같이 Ethereum 트랜잭션 영수증으로써 제공됩니다.
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0xa500c5bc0e0410a60961fca0a4beceb19f1af9a42c5cbcfad7818865eb0ee114",
    "blockNumber": "0x487d166",
    "contractAddress": null,
    "cumulativeGasUsed": "0xa0dbd0", /** added */
    "effectiveGasPrice": "0x143ec7aafa", /** added */
    "from": "0x5386d9f21be7034ba3aeadc7bedb5ea4dd538237",
    /** "gas": "0x5208", omitted */
    /** "gasPrice": "0x5d21dba00", omitted */
    "gasUsed": "0x5208",
    /** "input": "0x32142912492149122", omitted */
    "logs": [],
    "logsBloom": "0x00...",
    /** "nonce": "0x120", omitted */
    /** "senderTxHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "status": "0x1",
    "to": "0x5994af2bfe0bdaf7f66ec3d7924e5647094718bf",
    "transactionHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf",
    "transactionIndex": "0x5",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    /** "typeInt": 48, omitted */
    /** "value": "0xa5c40c07eb33e87000" omitted */
  }
}
```

#### AccountUpdate Transaction Receipt

| Ethereum 트랜잭션 영수증 영역 | Klaytn AccountUpdate Transaction Receipt Field | 설명                                                                                                                         |
| -------------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
|                      | key(생략됨)                                       | :warning: Ethereum 트랜잭션 영수증에는 해당 필드가 존재하지 않기 때문에 생략합니다.                                                                    |
| to                   | (added)                                        | :warning: 해당 필드는 Klaytn AccoutUpdate 트랜잭션 영수증에 존재하지 않고, `from`을 필드의 값으로 주는 것이 가장 의미에 부합하기 때문에, `from`과 항상 같은 주소를 값으로 가집니다. |

**Klaytn AccountUpdate Transaction Receipt**은 아래와 같이 Ethereum 트랜잭션 영수증으로써 제공됩니다.
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0xa500c5bc0e0410a60961fca0a4beceb19f1af9a42c5cbcfad7818865eb0ee114",
    "blockNumber": "0x487d166",
    "contractAddress": null,
    "cumulativeGasUsed": "0xa0dbd0", /** added */
    "effectiveGasPrice": "0x143ec7aafa", /** added */
    "from": "0x5386d9f21be7034ba3aeadc7bedb5ea4dd538237",
    /** "gas": "0x5208", omitted */
    /** "gasPrice": "0x5d21dba00", omitted */
    "gasUsed": "0x5208",
    /** "key": "0x02a102a288c3fb864a012dbe6ca84fcd2afcd9b390cf473b4d35a0126c3164ac3e7f73", omitted */
    "logs": [],
    "logsBloom": "0x00...",
    /** "nonce": "0x120", omitted */
    /** "senderTxHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "status": "0x1",
    "to": "0x5386d9f21be7034ba3aeadc7bedb5ea4dd538237", /** added */
    "transactionHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf",
    "transactionIndex": "0x5",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    /** "typeInt": 32, omitted */
    /** "value": "0xa5c40c07eb33e87000" omitted */
  }
}
```

#### Cancel Transaction Receipt

| Ethereum 트랜잭션 영수증 영역 | Klaytn Cancel Transaction Receipt Field | 설명                                                                                                                   |
| -------------------- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| to                   | (added)                                 | :warning: 해당 필드는 Klaytn Cancel 트랜잭션 영수증에 존재하지 않고, `from`을 필드의 값으로 주는 것이 가장 의미에 부합하기 때문에, `from`과 항상 같은 주소를 값으로 가집니다. |

**Klaytn Cancel Transaction Receipt**은 아래와 같이 Ethereum 트랜잭션 영수증으로써 제공됩니다.
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0xda357820b1d70922422219dd6d2d3507f4af32588b90a0a7f825ce36887f2de6",
    "blockNumber": "0x487d166",
    "contractAddress": null,
    "cumulativeGasUsed": "0xa0dbd0", /** added */
    "effectiveGasPrice": "0x143ec7aafa", /** added */
    "from": "0x5386d9f21be7034ba3aeadc7bedb5ea4dd538237",
    /** "gas": "0x5208", omitted */
    /** "gasPrice": "0x5d21dba00", omitted */
    "gasUsed": "0x5208",
    "logs": [],
    "logsBloom": "0x00...",
    /** "nonce": "0x120", omitted */
    /** "senderTxHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "status": "0x1",
    "to": "0x5386d9f21be7034ba3aeadc7bedb5ea4dd538237", /** added */
    "transactionHash": "0x7ef015c30dbe02cf68870a8b740635266e28abe25d68c4f467affe88956729c4",
    "transactionIndex": "0x5",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    /** "typeInt": 56, omitted */
  }
}
```

#### ChainDataAnchoring Transaction Receipt

| Ethereum 트랜잭션 영수증 영역 | Klaytn ChainDataAnchoring Transaction Receipt Field | 설명                                                                                                                               |
| -------------------- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
|                      | input(생략됨)                                          | :warning: Ethereum 트랜잭션 영수증에는 해당 필드가 존재하지 않기 때문에 생략합니다.                                                                          |
|                      | inputJSON(생략됨)                                      | :warning: Ethereum 트랜잭션 영수증에는 해당 필드가 존재하지 않기 때문에 생략합니다.                                                                          |
| to                   | (added)                                             | :warning: 해당 필드는 Klaytn ChainDataAnchoring 트랜잭션 영수증에 존재하지 않고, `from`을 필드의 값으로 주는 것이 가장 의미에 부합하기 때문에, `from`과 항상 같은 주소를 값으로 가집니다. |

**Klaytn ChainDataAnchoring Transaction Receipt**은 아래와 같이 Ethereum 트랜잭션 영수증으로써 제공됩니다.
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0xda357820b1d70922422219dd6d2d3507f4af32588b90a0a7f825ce36887f2de6",
    "blockNumber": "0x487d166",
    "contractAddress": null,
    "cumulativeGasUsed": "0xa0dbd0", /** added */
    "effectiveGasPrice": "0x143ec7aafa", /** added */
    "from": "0x5386d9f21be7034ba3aeadc7bedb5ea4dd538237",
    /** "gas": "0x5208", omitted */
    /** "gasPrice": "0x5d21dba00", omitted */
    "gasUsed": "0x5208",
    /** "input": "0xf8...", omitted */
    /** "inputJSON": {
      "blockHash": "0x2b69e9532eddd9a25dc48c53253d8bc93a29770362a8f778fe799e3493cad626",
      "transactionsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      "parentHash": "0x094084ac3580231708c2a2dcbcf39f712a61dcc070b76a7eaaaf8b6f07a9549c",
      "receiptsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      "stateRoot": "0x768b8ae0874e4ac5e3ef9bccbeb417b4207d562b85dfb30ecf9cc8344209a5e6",
      "blockNumber": 43372800,
      "blockCount": 86400,
      "txCount": 53777
    }, omitted */
    "logs": [],
    "logsBloom": "0x00...",
    /** "nonce": "0x120", omitted */
    /** "senderTxHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "status": "0x1",
    "to": "0x5386d9f21be7034ba3aeadc7bedb5ea4dd538237", /** added */
    "transactionHash": "0x7ef015c30dbe02cf68870a8b740635266e28abe25d68c4f467affe88956729c4",
    "transactionIndex": "0x5",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    /** "typeInt": 72, omitted */
  }
}
```