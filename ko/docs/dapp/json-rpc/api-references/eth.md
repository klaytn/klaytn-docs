---
description: >-
  eth namespace APIs.
---

# Namespace eth <a id="namespace-eth"></a>

`eth` namespace는 계정, 블록, 트랜잭션, 네트워크 또는 노드의 환경설정, 필터 등과 관련한 함수를 제공합니다.

이제 Klaytn은 [이더리움의 JSON-RPC API](https://eth.wiki/json-rpc/API)의 네임스페이스 `eth`를 지원합니다. 이더리움의 API 응답 본문과 일치하도록 일부 반환 값이 조정되었음을 참고하시기 바랍니다.

또한 클레이튼과 이더리움의 근본적인 설계 차이로 인해 클레이튼의 데이터 구조(트랜잭션, 블록, 트랜잭션 영수증)는 `eth` 네임스페이스 API를 통해 완전하게 지원되지 않습니다.

본 문서에 있는 [이더리움과의 차이점 개요](#differences_overview_from_ethereum)를 확인하세요.

**참고**: `eth` 네임스페이스 API들은 Klaytn v1.8.0. 부터 지원됩니다.

아래 목록에 API 함수들이 나열되어 있습니다. 아래의 모든 `eth` 네임스페이스 API들은 Klaytn에서 지원됩니다.

### [계정(Account)](./eth/account.md) <a id="account"></a>
- [eth_accounts](./eth/account.md#eth_accounts)
- [eth_getBalance](./eth/account.md#eth_getbalance)
- [eth_getCode](./eth/account.md#eth_getcode)
- [eth_getTransactionCount](./eth/account.md#eth_gettransactioncount)
- [eth_sign](./eth/account.md#eth_sign)

### [블록(Block)](./eth/block.md) <a id="block"></a>
- [eth_blockNumber](./eth/block.md#eth_blocknumber)
- [eth_getHeaderByNumber](./eth/block.md#eth_getheaderbynumber)
- [eth_getHeaderByHash](./eth/block.md#eth_getheaderbyhash)
- [eth_getBlockByNumber](./eth/block.md#eth_getblockbynumber)
- [eth_getBlockByHash](./eth/block.md#eth_getblockbyhash)
- [eth_getUncleByBlockHashAndIndex](./eth/block.md#eth_getunclebyblockhashandindex)
- [eth_getUncleByBlockNumberAndIndex](./eth/block.md#eth_getunclebyblocknumberandindex)
- [eth_getBlockTransactionCountByNumber](./eth/block.md#eth_getblocktransactioncountbynumber)
- [eth_getBlockTransactionCountByHash](./eth/block.md#eth_getblocktransactioncountbyhash)
- [eth_getUncleCountByBlockNumber](./eth/block.md#eth_getunclecountbyblocknumber)
- [eth_getUncleCountByBlockHash](./eth/block.md#eth_getunclecountbyblockhash)
- [eth_getStorageAt](./eth/block.md#eth_getstorageat)
- [eth_mining](./eth/block.md#eth_mining)
- [eth_syncing](./eth/block.md#eth_syncing)


### [트랜잭션(Transaction)](./eth/transaction.md) <a id="transaction"></a>
- [eth_call](./eth/transaction.md#eth_call)
- [eth_estimateGas](./eth/transaction.md#eth_estimategas)
- [eth_getTransactionByBlockHashAndIndex](./eth/transaction.md#eth_gettransactionbyblockhashandindex)
- [eth_getTransactionByBlockNumberAndIndex](./eth/transaction.md#eth_gettransactionbyblocknumberandindex)
- [eth_getTransactionByHash](./eth/transaction.md#eth_gettransactionbyhash)
- [eth_getTransactionReceipt](./eth/transaction.md#eth_gettransactionreceipt)
- [eth_sendRawTransaction](./eth/transaction.md#eth_sendrawtransaction)
- [eth_sendTransaction](./eth/transaction.md#eth_sendtransaction)
- [eth_signTransaction](./eth/transaction.md#eth_signtransaction)
- [eth_fillTransaction](./eth/transaction.md#eth_filltransaction)
- [eth_pendingTransactions](./eth/transaction.md#eth_pendingtransactions)

### [환경설정(Configuration)](./eth/config.md) <a id="configuration"></a>
- [eth_coinbase](./eth/config.md#eth_coinbase)
- [eth_etherbase](./eth/config.md#eth_etherbase)
- [eth_chainId](./eth/config.md#eth_chainid)
- [eth_gasPrice](./eth/config.md#eth_gasprice)


### [필터(Filter)](./eth/filter.md) <a id="filter"></a>
- [eth_getFilterChanges](./eth/filter.md#eth_getfilterchanges)
- [eth_getFilterLogs](./eth/filter.md#eth_getfilterlogs)
- [eth_getLogs](./eth/filter.md#eth_getlogs)
- [eth_newBlockFilter](./eth/filter.md#eth_newblockfilter)
- [eth_newFilter](./eth/filter.md#eth_newfilter)
- [eth_newPendingTransactionFilter](./eth/filter.md#eth_newpendingtransactionfilter)
- [eth_subscribe](./eth/filter.md#eth_subscribe)
- [eth_uninstallFilter](./eth/filter.md#eth_uninstallfilter)
- [eth_unsubscribe](./eth/filter.md#eth_unsubscribe)


### [Gas](./eth/gas.md) <a id="gas"></a>
- [eth_feeHistory](./eth/gas.md#eth_feehistory)
- [eth_maxPriorityFeePerGas](./eth/gas.md#eth_maxpriorityfeepergas)

### [기타(Miscellaneous)](./eth/misc.md) <a id="miscellaneous"></a>
- [eth_hashrate](./eth/misc.md#eth_hashrate)
- [eth_getWork](./eth/misc.md#eth_getwork)
- [eth_submitWork](./eth/misc.md#eth_submitwork)
- [eth_submitHashrate](./eth/misc.md#eth_submithashrate)

## 이더리움과의 차이점 개요 <a id="differences_overview_from_ethereum">

> eth 네임스페이스 API를 제공할 때 클레이튼과 이더리움의 차이점에 대해 더 자세히 설명하는 [주의](./eth/caution.md) 장을 확인하시기 바랍니다.

### 블록 <a id="block"></a>

관련된 APIs: [eth_getHeaderByNumber](./eth/block/#eth_getHeaderByNumber), [eth_getHeaderByHash](./eth/block/#eth_getHeaderByHash), [eth_getBlockByHash](./eth/block/#eth_getBlockByHash), [eth_getBlockByNumber](./eth/block/#eth_getBlockByNumber), [eth_getUncleByBlockHashAndIndex](./eth/block/#eth_getUncleByBlockHashAndIndex), [eth_getUncleByBlockNumberAndIndex](./eth/block/#eth_getUncleByBlockNumberAndIndex).

| 필드              | 설명                                                                                                                                                                                                                                                                                                |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| baseFeePerGas   | Klaytn은 baseFeePerGas 스킴을 가지고 있지 않기 때문에, 해당 필드는 항상 `0x0` 값을 가집니다.                                                                                                                                                                                                                                 |
| difficulty      | Klaytn 헤더에서 해당 필드는 `blockScore`에 해당하며, `0x1`로 값이 고정되어 있습니다. 이는 Klaytn의 합의 메커니즘이 작업증명을 기반으로 하지 않기 때문에, 블록 난이도라는 기술적 개념이 Klaytn 코어에 적용되지 않기 때문입니다.                                                                                                                                                  |
| extraData       | 해당 필드는 빈 값을 나타내며 항상 `0x`를 값으로 가집니다. 클레이튼의 `extraData`에는 검증자 주소, 검증자 서명, 제안자 서명 등의 합의 데이터가 포함되어 있기 때문에, `eth` 네임스페이스 API에는 적용되지 않습니다.                                                                                                                                                              |
| gasLimit        | Klaytn은 GasLimit이 없기 때문에 해당 필드는 임의의 숫자인 `0xe8d4a50fff`(=`999999999999` in decimal)를 값으로 가집니다. 이 수치는 [이더리움의 블록 가스 한도](https://ethereum.org/en/developers/docs/gas/#block-size)보다 30배 높은 수치입니다. 더 자세한 내용은 [계산 비용](../../../klaytn/design/computation/computation-cost/computation-cost.md)을 참조하십시오. |
| miner           | 해당 필드는 블록 제안자의 주소를 반환합니다. 클레이튼의 [합의 메커니즘](../../../klaytn/design/consensus-mechanism.md)은 [PBFT](../../../klaytn/design/consensus-mechanism.md#pbft-practical-byzantine-fault-tolerance)이기 때문에, 채굴자 대신 블록 제안자를 가집니다.                                                                              |
| mixHash         | Klaytn의 합의 메커니즘은 PoW기반이 아니기 때문에, 해당 필드는 항상 zeroHash(`0x00...`)를 값으로 가집니다.                                                                                                                                                                                                                         |
| nonce           | Klaytn의 합의 메커니즘은 PoW기반이 아니기 때문에, 해당 필드는 항상 zeroNonce(`0x00...`)를 값으로 가집니다.                                                                                                                                                                                                                        |
| sha3Uncles      | Klaytn은 엉클블록이 없기 때문에, 해당 필드는 항상 빈 블록 헤더를 포함하는 목록의 RLP-encoded 바이트의 Keccak256해시인 `0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347`를 값으로 가집니다.                                                                                                                                   |
| totalDifficulty | 쿼리 블록까지 체인의 총 난이도입니다.                                                                                                                                                                                                                                                                             |
| uncles          | Klaytn core에는 엉클블록에 관한 기술적 개념이 없기 때문에, 해당 필드는 항상 `[]`을 값으로 가집니다.                                                                                                                                                                                                                                  |

여기서 다루지 않은 필드는 이더리움의 블록 필드에 고정됩니다.

### 트랜잭션(Transaction)<a id="transaction"></a>

관련된 APIs: [eth_getTransactionByHash](./eth/transaction/#eth_getTransactionByHash), [eth_getTransactionByBlockHashAndIndex](./eth/transaction/#eth_getTransactionByBlockHashAndIndex), [eth_getTransactionByBlockNumberAndIndex](./eth/transaction/#eth_getTransactionByBlockNumberAndIndex), [eth_pendingTransactions](./eth/transaction/#eth_pendingTransactions).

> 클레이튼과 이더리움의 근본적인 설계 차이로 인해 클레이튼 트랜잭션은 `eth` 네임스페이스 API를 통해 완전하게 지원되지 않습니다.

| 필드       | 설명                                                                                                                                              |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| gasPrice | Klaytn의 맥락에서는 [단가](../../../klaytn/design/transaction-fees/transaction-fees.md#unit-price)로도 알려져 있으며, 해당 값은 거버넌스 프로세스를 통해 시스템에서 결정됩니다.          |
| 형식       | Klaytn에서 `type` 은 트랜잭션 타입을 문자열로 반환하지만 (예: `"LegacyTransaction"`), 이더리움과 일치하도록 16진수로 변환되었습니다 (예: `0x0`). Klaytn에서만 유효한 트랜잭션 유형은 항상 `0x0`를 반환합니다. |

Klaytn 트랜잭션은 프로토콜 수준에서도 멀티시그(이더리움 트랜잭션은 서명 필드(= v, r, s)가 하나만 있음)를 지원하기 때문에 둘 이상의 서명을 가질 수 있습니다. 이러한 맥락에서 서명(v, r, s)과 관련된 필드는 `tx.signatures[0].V`, `tx.signatures[0].R`, `tx.signatures[0].S`와 일치합니다.

여기서 다루지 않은 필드는 이더리움의 트랜잭션 필드에 고정됩니다.

### Transaction Receipt <a id="transaction_receipt"></a>

관련된 APIs: [eth_getTransactionReceipt](./eth/transaction/#eth_getTransactionReceipt).

> 클레이튼과 이더리움의 근본적인 설계 차이로 인해 이더리움 네임스페이스 API를 통해 클레이튼 트랜잭션 영수증을 완전하게 지원할 수 없습니다.

| 필드                | 설명                                                                                                                                                                    |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| effectiveGasPrice | Klaytn은 고정된 가스 가격 정책을 사용하므로, gasPrice 값을 반환합니다. gasPrice([단가](../../../klaytn/design/transaction-fees/transaction-fees.md#unit-price)라고도 함)는 거버넌스에 의해 시스템에 설정되어 있습니다. |
| transactionIndex  | 거의 이더리움과 동일하지만, 이더리움과 다르게 Klaytn은 트랜잭션이 보류 중인 상태에서 그대로 정수를 반환합니다.                                                                                                     |

여기서 다루지 않은 필드는 이더리움의 권장 필드인 트랜잭션 영수증을 따릅니다.
