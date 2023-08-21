## klay_call <a id="klay_call"></a>

블록체인에 트랜잭션을 생성하지 않고 즉시 새 메시지 호출을 합니다. 결과 데이터를 반환하거나 또는 에러가 발생하면 JSON RPC의 에러 객체를 반환합니다.

**Parameters**

| Name              | Type                            | Description                                                                                                                                                                            |
| ----------------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| callObject        | Object                          | The transaction call object.  See the next table for the object's properties.                                                                                                          |
| blockNumberOrHash | QUANTITY &#124; TAG &#124; HASH | Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"` as in the [default block parameter](./block.md#the-default-block-parameter), or block hash. |

{% hint style="success" %}
NOTE: In versions earlier than Klaytn v1.7.0, only integer block number, the string `"earliest"` and `"latest"` are available.
{% endhint %}

`callObject` has the following properties:

| Name     | Type         | Description                                                                                                                                                |
| -------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from     | 20-byte DATA | (선택 사항) 트랜잭션을 발신한 주소입니다.                                                                                                                                   |
| to       | 20-byte DATA | (새 트랜잭션 배포 테스트 시 선택 사항) 트랜잭션을 수신하는 주소입니다.                                                                                                                  |
| gas      | QUANTITY     | (선택 사항) 트랜잭션 실행을 위해 설정한 가스양의 정숫값입니다. `klay_call`은 가스를 소비하지 않지만 트랜잭션 실행 중 일부에서 이 매개변수가 필요할 수 있습니다.                                                          |
| gasPrice | QUANTITY     | (선택 사항) 가스당 가격, 즉 gasPrice의 정숫값입니다.                                                                                                                        |
| value    | QUANTITY     | (선택 사항) 트랜잭션을 통해 전송하고자 하는 송금액의 정숫값입니다.                                                                                                                     |
| input    | DATA         | (optional) Hash of the method signature and encoded parameters. It replaces `data` field, but 'data` field is still supported for backward compatibility. |

**Return Value**

| Type | Description       |
| ---- | ----------------- |
| DATA | 실행된 컨트랙트의 리턴값입니다. |

컨트랙트를 배포했다면 [klay_getTransactionReceipt](#klay_gettransactionreceipt)를 사용해 컨트랙트 주소를 확인하세요.

**Error**

문제가 발생할 경우 JSON RPC의 에러 객체를 반환합니다. 예를 들어, 어떤 메시지 호출이 `REVERT` opcode로 종료되면 "evm: execution reverted"라는 메시지의 에러 객체가 생성됩니다.

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "klay_call", "params": [{"from": "0x3f71029af4e252b25b9ab999f77182f0cd3bc085", "to": "0x87ac99835e67168d4f9a40580f8f5c33550ba88b", "gas": "0x100000", "gasPrice": "0x5d21dba00", "value": "0x0", "input": "0x8ada066e"}, "latest"], "id": 1}' https://public-en-baobab.klaytn.net

// Result
{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000000a"}
```

## klay_estimateGas <a id="klay_estimategas"></a>

Generates and returns an estimate of how much gas is necessary to allow the transaction to complete. 이때 발생한 트랜잭션은 블록체인에 추가되지 않습니다. Klaytn 가상머신의 메커니즘, 노드 성능 등의 다양한 원인에 의해 추정치가 실제 사용된 가스양보다 훨씬 클 수도 있습니다.

**Parameters**

| Name       | Type   | Description                                                                   |
| ---------- | ------ | ----------------------------------------------------------------------------- |
| callObject | Object | The transaction call object.  See the next table for the object's properties. |

`callObject` has the following properties:

| Name     | Type         | Description                                                                                                                                                |
| -------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from     | 20-byte DATA | (optional) The address the transaction is sent from.                                                                                                       |
| to       | 20-byte DATA | (optional when testing the deployment of a new contract) The address the transaction is directed to.                                                       |
| gas      | QUANTITY     | (선택 사항) 가스 추정을 위해 제공되는 가스 한도의 정숫값입니다. 가스 한도를 지정하지 않으면 Klaytn 노드는 지정된 가스 한도를 상한으로 설정합니다.                                                                    |
| gasPrice | QUANTITY     | (optional) Integer of the gasPrice used for each paid gas.                                                                                                 |
| value    | QUANTITY     | (optional) Integer of the value sent with this transaction.                                                                                                |
| input    | DATA         | (optional) Hash of the method signature and encoded parameters. It replaces `data` field, but 'data` field is still supported for backward compatibility. |

**Return Value**

| Type     | Description             |
| -------- | ----------------------- |
| QUANTITY | The amount of gas used. |


**Example**
```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "klay_estimateGas", "params": [{"from": "0x3f71029af4e252b25b9ab999f77182f0cd3bc085", "to": "0x87ac99835e67168d4f9a40580f8f5c33550ba88b", "gas": "0x100000", "gasPrice": "0x5d21dba00", "value": "0x0", "input": "0x8ada066e"}], "id": 1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc": "2.0","id":1,
  "result": "0x5208" // 21000
}
```

## klay_estimateComputationCost <a id="klay_estimatecomputationcost"></a>

트랜잭션을 실행하는 데에 들 연산 비용의 추정치를 생성하여 반환합니다. Klaytn은 한 트랜잭션을 실행하는 데에 너무 많은 시간이 걸리지 않도록 하기 위해 현재 트랜잭션당 연산 비용을 `100000000`으로 제한합니다. 이때 발생한 트랜잭션은 [klay_estimateGas](#klay_estimategas)와 마찬가지로 블록체인에 추가되지 않습니다.

**Parameters**

[klay_call](#klay_call)의 매개변수들을 보면 모든 속성이 선택사항인 것을 볼 수 있습니다. 하지만 가스 한도를 지정하지 않으면, Klaytn 노드는 기본 가스 한도(uint64 / 2) 를 상한으로 설정합니다.

**Return Value**

| Type     | Description   |
| -------- | ------------- |
| QUANTITY | 사용된 연산 비용입니다. |

**Example**
```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_estimateComputationCost","params":[{"from":"0x73718c4980728857f3aa5148e9d1b471efa3a7dd", "to":"0x069942a3ca0dabf495dba872533134205764bc9c", "value":"0x0", "input":"0x2a31efc7000000000000000000000000000000000000000000000000000000000000271000000000000000000000000000000000000000000000000000000000000000420000000000000000000000000000000000000000000000000000000000003039"}, "latest"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc": "2.0","id":1,
  "result": "0x1e8b0ad"
}
```

## klay_getTransactionByBlockHashAndIndex <a id="klay_gettransactionbyblockhashandindex"></a>

Returns information about a transaction by block hash and transaction index position. This API works only on RPC call, not on JavaScript console.

**Parameters**

| Type         | Description                                |
| ------------ | ------------------------------------------ |
| 32-byte DATA | Hash of a block.                           |
| QUANTITY     | Integer of the transaction index position. |

**Return Value**

[klay_getTransactionByHash](#klay_gettransactionbyhash)를 참고하세요.

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getTransactionByBlockHashAndIndex","params":["0x451cafae98d61b7458b5cef54402830941432278184453e3ca490eb687317e68", "0x0"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":{
    "blockHash":"0x0591ceb74102fc4ed54b66d27e869224d481e9f44170b25ed4a5654675043198",
    "blockNumber":"0x27",
    "from":"0xe02837b9d671e0848e599c374416f383f8910e45",
    "gas":"0xf4240",
    "gasPrice":"0x5d21dba00",
    "hash":"0x451cafae98d61b7458b5cef54402830941432278184453e3ca490eb687317e68",
    "input":"0x",
    "nonce":"0x1",
    "senderTxHash":"0x451cafae98d61b7458b5cef54402830941432278184453e3ca490eb687317e68",
    "signatures":[
      {
        "V":"0xfea",
        "R":"0x1924d0f36e05d368a37b8130b85067f21f0ea1d35b87bf137216cdc3c844c762",
        "S":"0x31d61be4d5cf677e60ad0fa0214e75c3167509c8d8905d7c6f85979b5f32eead"
      }
    ],
    "to":"0x44d827f98430784c8e3401748d8ba92c43df4546",
    "transactionIndex":"0x0",
    "type":"TxTypeLegacyTransaction",
    "typeInt":0,
    "value":"0xde0b6b3a7640000"
  }
}
```


## klay_getTransactionByBlockNumberAndIndex <a id="klay_gettransactionbyblocknumberandindex"></a>

Returns information about a transaction by block number and transaction index position. This API works only on RPC call, not on JavaScript console.

**Parameters**

| Type                | Description                                                                                                                                                              |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| QUANTITY &#124; TAG | Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"`  as in the [default block parameter](./block.md#the-default-block-parameter). |
| QUANTITY            | The transaction index position.                                                                                                                                          |

{% hint style="success" %}
NOTE: In versions earlier than Klaytn v1.7.0, only integer block number, the string `"earliest"` and `"latest"` are available.
{% endhint %}

**Return Value**

See [klay_getTransactionByHash](#klay_gettransactionbyhash)

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getTransactionByBlockNumberAndIndex","params":["0x27", "0x0"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":{
    "blockHash":"0x0591ceb74102fc4ed54b66d27e869224d481e9f44170b25ed4a5654675043198",
    "blockNumber":"0x27",
    "from":"0xe02837b9d671e0848e599c374416f383f8910e45",
    "gas":"0xf4240",
    "gasPrice":"0x5d21dba00",
    "hash":"0x451cafae98d61b7458b5cef54402830941432278184453e3ca490eb687317e68",
    "input":"0x",
    "nonce":"0x1",
    "senderTxHash":"0x451cafae98d61b7458b5cef54402830941432278184453e3ca490eb687317e68",
    "signatures":[
      {
        "V":"0xfea",
        "R":"0x1924d0f36e05d368a37b8130b85067f21f0ea1d35b87bf137216cdc3c844c762",
        "S":"0x31d61be4d5cf677e60ad0fa0214e75c3167509c8d8905d7c6f85979b5f32eead"
      }
    ],
    "to":"0x44d827f98430784c8e3401748d8ba92c43df4546",
    "transactionIndex":"0x0",
    "type":"TxTypeLegacyTransaction",
    "typeInt":0,
    "value":"0xde0b6b3a7640000"
  }
}
```


## klay_getTransactionByHash <a id="klay_gettransactionbyhash"></a>

Returns the information about a transaction requested by transaction hash. This API works only on RPC call, not on JavaScript console.

**Parameters**

| Type         | Description            |
| ------------ | ---------------------- |
| 32-byte DATA | Hash of a transaction. |

**Return Value**

`Object` - A transaction object, or `null` when no transaction was found:

| Name               | Type         | Description                                                                                                                                                                |
| ------------------ | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockHash          | 32-byte DATA | Hash of the block where this transaction was in. `null` when it is pending.                                                                                                |
| blockNumber        | QUANTITY     | Block number where this transaction was in. `null` when it is pending.                                                                                                     |
| codeFormat         | String       | (선택사항) 스마트 컨트랙트 코드의 코드 형식입니다.                                                                                                                                              |
| feePayer           | 20-byte DATA | (선택사항) 트랜잭션 수수료 납부자의 주소입니다.                                                                                                                                                |
| feePayerSignatures | Array        | (선택사항) 트랜잭션 수수료 납부자의 서명 객체들로 이루어진 배열입니다. 각 서명 객체에는 (V, R, S) 등 세 필드가 있습니다. V는 ECDSA 복구 ID를 담고 있습니다. R은 ECDSA 서명 r을 담고 있고 S는 ECDSA 서명 s를 담고 있습니다.                           |
| feeRatio           | QUANTITY     | (선택사항) 트랜잭션 수수료 납부자의 부담 비율입니다. 이 값이 30이면, 트랜잭션 수수료의 30%를 트랜잭션 수수료 납부자가 지불합니다. 나머지 70%는 트랜잭션 발신자가 지불합니다.                                                                    |
| from               | 20-byte DATA | Address of the sender.                                                                                                                                                     |
| gas                | QUANTITY     | Gas provided by the sender.                                                                                                                                                |
| gasPrice           | QUANTITY     | Gas price provided by the sender in peb.                                                                                                                                   |
| hash               | 32-byte DATA | Hash of the transaction.                                                                                                                                                   |
| humanReadable      | Boolean      | (선택사항) Human-Readable Address이면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다.                                                                                                      |
| key                | String       | (선택사항) 새로 생성된 계정의 키입니다.                                                                                                                                                    |
| input              | DATA         | (선택사항) 트랜잭션과 함께 전송된 데이터입니다.                                                                                                                                                |
| nonce              | QUANTITY     | The number of transactions made by the sender prior to this one.                                                                                                           |
| senderTxHash       | 32-byte DATA | 트랜잭션 발신자만 서명한 트랜잭션의 해시입니다. 이에 대한 자세한 내용은 [SenderTxHash](../../../../klaytn/design/transactions/README.md#sendertxhash)를 참고하세요. 이 값은 수수료 위임된 트랜잭션이 아닌 경우의 `hash`와 항상 동일합니다. |
| signature          | Array        | 서명 객체의 배열입니다. A signature object contains three fields (V, R, and S). V contains ECDSA recovery id. R contains ECDSA signature r while S contains ECDSA signature s.       |
| to                 | 20-byte DATA | Address of the receiver. `null` when it is a contract creation transaction.                                                                                                |
| transactionIndex   | QUANTITY     | Integer of the transaction index position in the block. `null` when it is pending.                                                                                         |
| type               | String       | 트랜잭션의 유형을 나타내는 문자열입니다.                                                                                                                                                     |
| typeInt            | QUANTITY     | An integer representing the type of the transaction.                                                                                                                       |
| value              | QUANTITY     | peb로 전송된 값입니다.                                                                                                                                                             |


**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getTransactionByHash","params":["0xaca5d9a1ed8b86b1ef61431b2bedfc99a66eaefc3a7e1cffdf9ff53653956a67"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":{
    "blockHash":"0x4d97cf1f686a925ed4f1ad42c635cedb54974fe23a2941c7825e1ed3163c0e41",
    "blockNumber":"0x7008",
    "feePayer":"0xa9d2cc2bb853163b6eadfb6f962d72f7e00bc2e6",
    "feePayerSignatures":[
      {
        "V":"0x4e44",
        "R":"0xa665e17d92e1c671c8b062cecb19790d49138a21854fc15c460c91035b1884e",
        "S":"0x17165688acc01736f1221a39399e3aac7e1ece14731fcab31631e3e4a59b7441"
      }
    ],
    "from":"0xab0833d744a8943fe3c783f9cc70c13cbd70fcf4",
    "gas":"0xdbba0",
    "gasPrice":"0x5d21dba00",
    "hash":"0xaca5d9a1ed8b86b1ef61431b2bedfc99a66eaefc3a7e1cffdf9ff53653956a67",
    "nonce":"0x26",
    "senderTxHash":"0x18fe9e1007da7d20aad77778557fb8acc58c80054daba65124c8c843aadd3478",
    "signatures":[
      {
        "V":"0x4e44",
        "R":"0x1b6bb3d996d903d0528565d13e8d9d122b2220ed09c5baf384114193a6977027",
        "S":"0x20c506ce9f1bdd42183c40c44f414a3930f339f856e8be3cfcdf5ca0852fd378"
      }
    ],
    "to":"0x15a9119104e1bf0ec6d408b3cc188685e4402a2c",
    "transactionIndex":"0x0",
    "type":"TxTypeFeeDelegatedValueTransfer",
    "typeInt":9,
    "value":"0x1"
  }
}
```


## klay_getTransactionBySenderTxHash <a id="klay_gettransactionbysendertxhash"></a>

발신자 트랜잭션 해시로 조회한 트랜잭션의 정보를 반환합니다. This API works only on RPC call, not on JavaScript console. 이 API는 `--sendertxhashindexing`에 의해 인덱싱 기능이 활성화되어 있을 때만 올바른 결과를 반환합니다. [klay_isSenderTxHashIndexingEnabled](config.md#klay_issendertxhashindexingenabled)를 호출하여 확인할 수 있습니다.

**Parameters**

| Type         | Description                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| 32-byte DATA | Hash of a transaction that is signed only by the sender. See [SenderTxHash](../../../../klaytn/design/transactions/README.md#sendertxhash). |

**Return Value**

`Object` - A transaction object, or `null` when no transaction was found:

| Name               | Type         | Description                                                                                                                                                                                                             |
| ------------------ | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockHash          | 32-byte DATA | Hash of the block where this transaction was in. `null` when it is pending.                                                                                                                                             |
| blockNumber        | QUANTITY     | Block number where this transaction was in. `null` when it is pending.                                                                                                                                                  |
| codeFormat         | String       | (optional) The code format of smart contract code.                                                                                                                                                                      |
| feePayer           | 20-byte DATA | 트랜잭션 수수료 납부자의 주소입니다.                                                                                                                                                                                                    |
| feePayerSignatures | Array        | 트랜잭션 수수료 납부자의 서명 객체들로 이루어진 배열입니다. A signature object contains three fields (V, R, and S). V contains ECDSA recovery id. R contains ECDSA signature r while S contains ECDSA signature s.                                |
| feeRatio           | QUANTITY     | (optional) Fee ratio of the fee payer. If it is 30, 30% of the fee will be paid by the fee payer. 70% will be paid by the sender.                                                                                       |
| from               | 20-byte DATA | Address of the sender.                                                                                                                                                                                                  |
| gas                | QUANTITY     | Gas provided by the sender.                                                                                                                                                                                             |
| gasPrice           | QUANTITY     | Gas price provided by the sender in peb.                                                                                                                                                                                |
| hash               | 32-byte DATA | Hash of the transaction.                                                                                                                                                                                                |
| humanReadable      | Boolean      | (optional) `true` if the address is humanReadable, `false` if the address is not humanReadable.                                                                                                                         |
| key                | String       | (optional) Key of the newly created account.                                                                                                                                                                            |
| input              | DATA         | (optional) The data sent along with the transaction.                                                                                                                                                                    |
| nonce              | QUANTITY     | The number of transactions made by the sender prior to this one.                                                                                                                                                        |
| senderTxHash       | 32-byte DATA | Hash of a transaction that is signed only by the sender. See [SenderTxHash](../../../../klaytn/design/transactions/README.md#sendertxhash). This value is always the same as `hash` for non fee-delegated transactions. |
| signature          | Array        | An array of signature objects. A signature object contains three fields (V, R, and S). V contains ECDSA recovery id. R contains ECDSA signature r while S contains ECDSA signature s.                                   |
| to                 | 20-byte DATA | Address of the receiver. `null` when it is a contract creation transaction.                                                                                                                                             |
| transactionIndex   | QUANTITY     | Integer of the transaction index position in the block. `null` when it is pending.                                                                                                                                      |
| type               | String       | A string representing the type of the transaction.                                                                                                                                                                      |
| typeInt            | QUANTITY     | An integer representing the type of the transaction.                                                                                                                                                                    |
| value              | QUANTITY     | Value transferred in peb.                                                                                                                                                                                               |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getTransactionBySenderTxHash","params":["0x18fe9e1007da7d20aad77778557fb8acc58c80054daba65124c8c843aadd3478"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":{
    "blockHash":"0x4d97cf1f686a925ed4f1ad42c635cedb54974fe23a2941c7825e1ed3163c0e41",
    "blockNumber":"0x7008",
    "feePayer":"0xa9d2cc2bb853163b6eadfb6f962d72f7e00bc2e6",
    "feePayerSignatures":[
      {
        "V":"0x4e44",
        "R":"0xa665e17d92e1c671c8b062cecb19790d49138a21854fc15c460c91035b1884e",
        "S":"0x17165688acc01736f1221a39399e3aac7e1ece14731fcab31631e3e4a59b7441"
      }
    ],
    "from":"0xab0833d744a8943fe3c783f9cc70c13cbd70fcf4",
    "gas":"0xdbba0",
    "gasPrice":"0x5d21dba00",
    "hash":"0xaca5d9a1ed8b86b1ef61431b2bedfc99a66eaefc3a7e1cffdf9ff53653956a67",
    "nonce":"0x26",
    "senderTxHash":"0x18fe9e1007da7d20aad77778557fb8acc58c80054daba65124c8c843aadd3478",
    "signatures":[
      {
        "V":"0x4e44",
        "R":"0x1b6bb3d996d903d0528565d13e8d9d122b2220ed09c5baf384114193a6977027",
        "S":"0x20c506ce9f1bdd42183c40c44f414a3930f339f856e8be3cfcdf5ca0852fd378"
      }
    ],
    "to":"0x15a9119104e1bf0ec6d408b3cc188685e4402a2c",
    "transactionIndex":"0x0",
    "type":"TxTypeFeeDelegatedValueTransfer",
    "typeInt":9,
    "value":"0x1"
  }
}
```


## klay_getTransactionReceipt <a id="klay_gettransactionreceipt"></a>

Returns the receipt of a transaction by transaction hash.

**NOTE**: The receipt is not available for pending transactions.

**Parameters**

| Name | Type         | Description            |
| ---- | ------------ | ---------------------- |
| Hash | 32-byte DATA | Hash of a transaction. |

**Return Value**

`Object` - A transaction receipt object, or `null` when no receipt was found

| Name               | Type                    | Description                                                                                                                                                                                                  |
| ------------------ | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| blockHash          | 32-byte DATA            | Hash of the block where this transaction was in.                                                                                                                                                             |
| blockNumber        | QUANTITY                | The block number where this transaction was in.                                                                                                                                                              |
| codeFormat         | String                  | (optional) The code format of smart contract code.                                                                                                                                                           |
| contractAddress    | DATA                    | The contract address created, if the transaction was a contract creation, otherwise `null`.                                                                                                                  |
| feePayer           | 20-byte DATA            | (optional) Address of the fee payer.                                                                                                                                                                         |
| feePayerSignatures | Array                   | (optional) An array of fee payer's signature objects. A signature object contains three fields (V, R, and S). V contains ECDSA recovery id. R contains ECDSA signature r while S contains ECDSA signature s. |
| feeRatio           | QUANTITY                | (optional) Fee ratio of the fee payer. If it is 30, 30% of the fee will be paid by the fee payer. 70% will be paid by the sender.                                                                            |
| from               | 20-byte DATA            | Address of the sender.                                                                                                                                                                                       |
| gas                | QUANTITY                | Gas provided by the sender.                                                                                                                                                                                  |
| effectiveGasPrice  | QUANTITY                | The actual value per gas deducted from the senders account.                                                                                                                                                  |
| gasPrice           | QUANTITY                | Gas price provided by the sender in peb.                                                                                                                                                                     |
| gasUsed            | QUANTITY                | The amount of gas used by this specific transaction alone.                                                                                                                                                   |
| humanReadable      | Boolean                 | (optional) `true` if the address is humanReadable, `false` if the address is not humanReadable.                                                                                                              |
| key                | String                  | (optional) Key of the newly created account.                                                                                                                                                                 |
| input              | DATA                    | (optional) The data sent along with the transaction.                                                                                                                                                         |
| logs               | Array                   | Array of log objects, which this transaction generated.                                                                                                                                                      |
| logsBloom          | 256-byte DATA           | Bloom filter for light clients to quickly retrieve related logs.                                                                                                                                             |
| nonce              | QUANTITY                | The number of transactions made by the sender prior to this one.                                                                                                                                             |
| senderTxHash       | (optional) 32-byte DATA | Hash of the tx without the fee payer's address and signature. This value is always the same as the value of transactionHash for non fee-delegated transactions.                                              |
| signature          | Array                   | An array of signature objects. A signature object contains three fields (V, R, and S). V contains ECDSA recovery id. R contains ECDSA signature r while S contains ECDSA signature s.                        |
| status             | QUANTITY                | Either `1` (success) or `0` (failure).                                                                                                                                                                       |
| txError            | QUANTITY                | (optional) detailed error code if `status` is equal to zero.                                                                                                                                                 |
| to                 | 20-byte DATA            | Address of the receiver. `null` when it is a contract creation transaction.                                                                                                                                  |
| transactionHash    | 32-byte DATA            | Hash of the transaction.                                                                                                                                                                                     |
| transactionIndex   | QUANTITY                | Integer of the transaction index position in the block.                                                                                                                                                      |
| type               | String                  | A string representing the type of the transaction.                                                                                                                                                           |
| typeInt            | QUANTITY                | An integer representing the type of the transaction.                                                                                                                                                         |
| value              | QUANTITY                | Value transferred in peb.                                                                                                                                                                                    |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getTransactionReceipt","params":["0xaca5d9a1ed8b86b1ef61431b2bedfc99a66eaefc3a7e1cffdf9ff53653956a67"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":{
    "blockHash":"0x4d97cf1f686a925ed4f1ad42c635cedb54974fe23a2941c7825e1ed3163c0e41",
    "blockNumber":"0x7008",
    "contractAddress":null,
    "feePayer":"0xa9d2cc2bb853163b6eadfb6f962d72f7e00bc2e6",
    "feePayerSignatures":[
      {
        "V":"0x4e44",
        "R":"0xa665e17d92e1c671c8b062cecb19790d49138a21854fc15c460c91035b1884e",
        "S":"0x17165688acc01736f1221a39399e3aac7e1ece14731fcab31631e3e4a59b7441"
      }
    ],
    "effectiveGasPrice":"0x5d21dba00",
    "from":"0xab0833d744a8943fe3c783f9cc70c13cbd70fcf4",
    "gas":"0xdbba0",
    "gasPrice":"0x5d21dba00",
    "gasUsed":"0x7918",
    "logs":[],
    "logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "nonce":"0x26",
    "senderTxHash":"0x18fe9e1007da7d20aad77778557fb8acc58c80054daba65124c8c843aadd3478",
    "signatures":[
      {
        "V":"0x4e44",
        "R":"0x1b6bb3d996d903d0528565d13e8d9d122b2220ed09c5baf384114193a6977027",
        "S":"0x20c506ce9f1bdd42183c40c44f414a3930f339f856e8be3cfcdf5ca0852fd378"
      }
    ],
    "status":"0x1",
    "to":"0x15a9119104e1bf0ec6d408b3cc188685e4402a2c",
    "transactionHash":"0xaca5d9a1ed8b86b1ef61431b2bedfc99a66eaefc3a7e1cffdf9ff53653956a67",
    "transactionIndex":"0x0",
    "type":"TxTypeFeeDelegatedValueTransfer",
    "typeInt":9,
    "value":"0x1"
  }
}
```


## klay_getTransactionReceiptBySenderTxHash <a id="klay_gettransactionreceiptbysendertxhash"></a>

SenderTxHash로 조회한 트랜잭션의 영수증을 반환합니다.

**NOTE**: The receipt is not available for pending transactions. Please note that this API returns correct result only if indexing feature is enabled by `--sendertxhashindexing`. This can be checked by call [klay_isSenderTxHashIndexingEnabled](config.md#klay_issendertxhashindexingenabled).

**Parameters**

| Name | Type         | Description                                                                |
| ---- | ------------ | -------------------------------------------------------------------------- |
| Hash | 32-byte DATA | 트랜잭션 납부자(feePayer)에 의해 서명되기 이전의 트랜잭션의 해시입니다. (즉 senderTransactionHash입니다.) |

**Return Value**

`Object` - A transaction receipt object, or `null` when no receipt was found

| Name               | Type                 | Description                                                                                                                                                                                       |
| ------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockHash          | 32-byte DATA         | Hash of the block where this transaction was in.                                                                                                                                                  |
| blockNumber        | QUANTITY             | The block number where this transaction was in.                                                                                                                                                   |
| codeFormat         | String               | (optional) The code format of smart contract code.                                                                                                                                                |
| contractAddress    | DATA                 | The contract address created, if the transaction was a contract creation, otherwise `null`.                                                                                                       |
| feePayer           | 20-byte DATA         | Address of the fee payer.                                                                                                                                                                         |
| feePayerSignatures | Array                | An array of fee payer's signature objects. A signature object contains three fields (V, R, and S). V contains ECDSA recovery id. R contains ECDSA signature r while S contains ECDSA signature s. |
| feeRatio           | QUANTITY             | (optional) Fee ratio of the fee payer. If it is 30, 30% of the fee will be paid by the fee payer. 70% will be paid by the sender.                                                                 |
| from               | 20-byte DATA         | Address of the sender.                                                                                                                                                                            |
| gas                | QUANTITY             | Gas provided by the sender.                                                                                                                                                                       |
| gasPrice           | QUANTITY             | Gas price provided by the sender in peb.                                                                                                                                                          |
| gasUsed            | QUANTITY             | 이 트랜잭션에서만 사용된 가스양입니다.                                                                                                                                                                             |
| humanReadable      | Boolean              | (optional) `true` if the address is humanReadable, `false` if the address is not humanReadable.                                                                                                   |
| key                | String               | (optional) Key of the newly created account.                                                                                                                                                      |
| input              | DATA                 | (optional) The data sent along with the transaction.                                                                                                                                              |
| logs               | Array                | Array of log objects, which this transaction generated.                                                                                                                                           |
| logsBloom          | 256-byte DATA        | Bloom filter for light clients to quickly retrieve related logs.                                                                                                                                  |
| nonce              | QUANTITY             | The number of transactions made by the sender prior to this one.                                                                                                                                  |
| senderTxHash       | (선택사항) 32바이트 크기 DATA | 트랜잭션 수수료 납부자의 주소와 서명이 없는 트랜잭션 해시입니다. 이 값은 수수료 위임된 트랜잭션이 아닌 경우의 transactionHash의 값과 항상 동일합니다.                                                                                                      |
| signature          | Array                | An array of signature objects. A signature object contains three fields (V, R, and S). V contains ECDSA recovery id. R contains ECDSA signature r while S contains ECDSA signature s.             |
| status             | QUANTITY             | Either `1` (success) or `0` (failure).                                                                                                                                                            |
| txError            | QUANTITY             | (선택사항) `status`가 0이면 상세한 오류 코드를 나타냅니다.                                                                                                                                                            |
| to                 | 20-byte DATA         | Address of the receiver. `null` when it is a contract creation transaction.                                                                                                                       |
| transactionHash    | 32-byte DATA         | Hash of the transaction.                                                                                                                                                                          |
| transactionIndex   | QUANTITY             | Integer of the transaction index position in the block.                                                                                                                                           |
| type               | String               | A string representing the type of the transaction.                                                                                                                                                |
| typeInt            | QUANTITY             | An integer representing the type of the transaction.                                                                                                                                              |
| value              | QUANTITY             | Value transferred in peb.                                                                                                                                                                         |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getTransactionReceiptBySenderTxHash","params":["0x18fe9e1007da7d20aad77778557fb8acc58c80054daba65124c8c843aadd3478"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":{
    "blockHash":"0x4d97cf1f686a925ed4f1ad42c635cedb54974fe23a2941c7825e1ed3163c0e41",
    "blockNumber":"0x7008",
    "contractAddress":null,
    "feePayer":"0xa9d2cc2bb853163b6eadfb6f962d72f7e00bc2e6",
    "feePayerSignatures":[
      {
        "V":"0x4e44",
        "R":"0xa665e17d92e1c671c8b062cecb19790d49138a21854fc15c460c91035b1884e",
        "S":"0x17165688acc01736f1221a39399e3aac7e1ece14731fcab31631e3e4a59b7441"
      }
    ],
    "from":"0xab0833d744a8943fe3c783f9cc70c13cbd70fcf4",
    "gas":"0xdbba0",
    "gasPrice":"0x5d21dba00",
    "gasUsed":"0x7918",
    "logs":[],
    "logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "nonce":"0x26",
    "senderTxHash":"0x18fe9e1007da7d20aad77778557fb8acc58c80054daba65124c8c843aadd3478",
    "signatures":[
      {
        "V":"0x4e44",
        "R":"0x1b6bb3d996d903d0528565d13e8d9d122b2220ed09c5baf384114193a6977027",
        "S":"0x20c506ce9f1bdd42183c40c44f414a3930f339f856e8be3cfcdf5ca0852fd378"
      }
    ],
    "status":"0x1",
    "to":"0x15a9119104e1bf0ec6d408b3cc188685e4402a2c",
    "transactionHash":"0xaca5d9a1ed8b86b1ef61431b2bedfc99a66eaefc3a7e1cffdf9ff53653956a67",
    "transactionIndex":"0x0",
    "type":"TxTypeFeeDelegatedValueTransfer",
    "typeInt":9,
    "value":"0x1"
  }
}
```


## klay_sendRawTransaction <a id="klay_sendrawtransaction"></a>

Creates a new message call transaction or a contract creation for signed transactions.

**Parameters**

| Type | Description                  |
| ---- | ---------------------------- |
| DATA | The signed transaction data. |

**Return Value**

| Type         | Description                                                                    |
| ------------ | ------------------------------------------------------------------------------ |
| 32-byte DATA | The transaction hash or the zero hash if the transaction is not yet available. |

If you deployed a contract, use [klay_getTransactionReceipt](#klay_gettransactionreceipt) to get the contract address.

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_sendRawTransaction","params":[{see above}],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```


## klay_sendTransaction <a id="klay_sendtransaction"></a>

주어진 파라미터로 트랜잭션을 구성한 다음, 트랜잭션 발신자의 개인키로 트랜잭션에 서명하고 트랜잭션을 Klaytn 네트워크에 전송합니다.

**NOTE**: The address to sign with must be unlocked.

**Parameters**

필수적으로 있어야 하는 파라미터들은 트랜잭션 타입에 따라 다릅니다. [Working with Klaytn Transaction Types](./transaction/transaction-type-support.md)에서 적절한 파라미터를 확인하십시오.

**Return Value**

| Type         | Description |
| ------------ | ----------- |
| 32-byte DATA | 트랜잭션 해시     |

If you deployed a contract, use [klay_getTransactionReceipt](#klay_gettransactionreceipt) to get the contract address.

**Example**

```shell
params: [{
  "from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
  "to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
  "gas": "0x76c0",
  "gasPrice": "0x5d21dba00",
  "value": "0x9184e72a",
  "input": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"
}]
```

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_sendTransaction","params":[{see above}],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc": "2.0","id":1,
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```


## klay_sendTransactionAsFeePayer <a id="klay_sendtransactionasfeepayer"></a>

주어진 파라미터로 트랜잭션을 구성한 다음, 트랜잭션 수수료 납부자의 개인키로 트랜잭션에 서명하고 트랜잭션을 Klaytn 네트워크에 전송합니다. 이 API는 오직 수수료 위임 트랜잭션(부분 수수료 위임 트랜잭션 포함)들만 지원합니다.

**참고**: 서명하려는 트랜잭션 수수료 납부자의 주소는 잠금 해제되어 있어야 합니다.

**Parameters**

The required parameters depend on the transaction type. Check the proper parameters in [Working with Klaytn Transaction Types](./transaction/transaction-type-support.md).

**Return Value**

| Type         | Description          |
| ------------ | -------------------- |
| 32-byte DATA | The transaction hash |

If you deployed a contract, use [klay_getTransactionReceipt](#klay_gettransactionreceipt) to get the contract address.

**Example**

```shell
params: [{
  "typeInt": 18,
  "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d",
  "to": "0x44711E89b0c23845b5B2ed9D3716BA42b8a3e075",
  "gas": "0x4a380",
  "gasPrice": "0x5d21dba00",
  "nonce": "0x2c",
  "value": "0xf4",
  "input": "0xb3f98adc0000000000000000000000000000000000000000000000000000000000000001",
  "feePayer": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d",
  "feeRatio": 30,
  "signatures": [{
    "V": "0x4e43", 
    "R": "0xd3ff5ca7bdd0120d79e8aa875593d05022fe74ce2b7a0594218d53c0fdca7fa9", 
    "S": "0x2c100e69d2455afc9393e017514063da18b18db6f7e811d0aeaf6002515b58ef"
  }]
}]
```

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_sendTransactionAsFeePayer","params":[{see above}],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc": "2.0","id":1,
  "result": "0x77ec2d910d0b96585373e2d6508f2b2d8c2af7d0060d2012e1cb2f0ee9d74830"
}
```

## klay_signTransaction <a id="klay_signtransaction"></a>

주어진 파라미터로 트랜잭션을 구성한 다음, 트랜잭션 발신자의 개인키로 트랜잭션에 서명합니다. 이 메서드는 발신자 서명을 생성하거나, 최종적으로 Klaytn 네트워크에 전송할 준비를 마친 raw Transaction을 만들 때 사용할 수 있습니다.

**NOTE**: The address to sign with must be unlocked.

**Parameters**

The required parameters depend on the transaction type. Check the proper parameters in [Working with Klaytn Transaction Types](./transaction/transaction-type-support.md).

**Return Value**

| Type | Description                |
| ---- | -------------------------- |
| raw  | 서명된 rawTransaction을 반환합니다. |
| tx   | 발신자 서명을 포함한 트랜잭션 객체입니다.    |

**Example**
```shell
// Request
curl -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0", "method":"klay_signTransaction", "params":[{"from":"0x77982323172e5b6182539d3522d5a33a944206d4", "to":"0xcd6bfdb523a4d030890d28bf1eb6ef36307c9aaa", "value":"0x10000", "gas":"0x1000000", "nonce":"0x2", "gasprice":"0x25000000000"}],"id":73}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc":"2.0",
  "id":73,
  "result":{
    "raw":"0xf86c0286025000000000840100000094cd6bfdb523a4d030890d28bf1eb6ef36307c9aaa8301000080820fe8a056d2ddd231c3c111687ab351d339240db18cd721e5aa33c601dd4fc3927fb4d1a03443443392517aa7da082aa0a00b9ee5e3e1ee007d22e57cd9ff55b5ddbf4a64",
    "tx":{
      "nonce":"0x2",
      "gasPrice":"0x5d21dba00",
      "gas":"0x1000000",
      "to":"0xcd6bfdb523a4d030890d28bf1eb6ef36307c9aaa",
      "value":"0x10000",
      "input":"0x",
      "v":"0xfe8",
      "r":"0x56d2ddd231c3c111687ab351d339240db18cd721e5aa33c601dd4fc3927fb4d1",
      "s":"0x3443443392517aa7da082aa0a00b9ee5e3e1ee007d22e57cd9ff55b5ddbf4a64",
      "hash":"0xb53cc9128a19c3916c0de1914725b7337bba84666c2556d8682c72ca34c6874c"
    }
  }
}
```


## klay_signTransactionAsFeePayer <a id="klay_signtransactionasfeepayer"></a>

주어진 파라미터로 트랜잭션을 구성한 다음, 트랜잭션 수수료 납부자의 개인키로 트랜잭션에 서명합니다. 이 메서드는 트랜잭션 수수료 납부자 서명을 생성하거나, 최종적으로 Klaytn 네트워크에 전송할 준비를 마친 raw Transaction을 만들 때 사용할 수 있습니다. 수수료 납부자 서명을 추출하고 싶다면, 결과값에서 `feePayerSignatures`을 사용하십시오. 발신자 서명이 첨부되어 있지 않다면( `tx`에 있는 `signatures` 가 비어 있는 상태), `raw` 트랜잭션은 최종 상태가 아닙니다.

**NOTE**: The fee payer address to sign with must be unlocked.

**Parameters**

The required parameters depend on the transaction type. Check the proper parameters in [Working with Klaytn Transaction Types](./transaction/transaction-type-support.md).

**Return Value**

| Type | Description                      |
| ---- | -------------------------------- |
| raw  | Signed raw transaction           |
| tx   | 트랜잭션 수수료 납부자 서명을 포함한 트랜잭션 객체입니다. |

**Example**
```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "klay_signTransactionAsFeePayer", "params": [{"typeInt": 17, "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d", "to": "0x44711E89b0c23845b5B2ed9D3716BA42b8a3e075", "gas": "0x76c0", "gasPrice": "0x5d21dba00", "value": "0xf4", "input": "0xb3f98adc0000000000000000000000000000000000000000000000000000000000000001", "feePayer": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d"}], "id": 83}' http://127.0.0.1:8551

// Result
{
    "id": 83,
    "jsonrpc": "2.0",
    "result": {
        "raw": "0x11f8ba358505d21dba008276c09444711e89b0c23845b5b2ed9d3716ba42b8a3e07581f494cd01b2b44584fb143824c1ea0231bebaea826b9da4b3f98adc0000000000000000000000000000000000000000000000000000000000000001c094cd01b2b44584fb143824c1ea0231bebaea826b9df847f845824e43a0b34470d1bb588a6afe8f170333ca147e805727aa1911353ed544c31ad4863beca020322c2727091ff79458a87a424b53a4b08cc3d7d485e002e8bf0add13974507",
        "tx": {
            "feePayer": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d",
            "feePayerSignatures": [
                {
                    "R": "0xb34470d1bb588a6afe8f170333ca147e805727aa1911353ed544c31ad4863bec",
                    "S": "0x20322c2727091ff79458a87a424b53a4b08cc3d7d485e002e8bf0add13974507",
                    "V": "0x4e43"
                }
            ],
            "from": "0xcd01b2b44584fb143824c1ea0231bebaea826b9d",
            "gas": "0x76c0",
            "gasPrice": "0x5d21dba00",
            "hash": "0x9e76f754b884d7853814a39c0e51fcefcef6f55b872f00ddad9724c9638128b3",
            "input": "0xb3f98adc0000000000000000000000000000000000000000000000000000000000000001",
            "nonce": "0x35",
            "signatures": [],
            "to": "0x44711e89b0c23845b5b2ed9d3716ba42b8a3e075",
            "type": "TxTypeFeeDelegatedValueTransferMemo",
            "typeInt": 17,
            "value": "0xf4"
        }
    }
}
```


## txError: 트랜잭션 실행 실패에 대한 상세한 설명 <a id="txerror-detailed-information-of-transaction-failures"></a>

Klaytn은 트랜잭션 영수증의 `txError` 필드를 통해 트랜잭션 실행이 실패한 원인을 알려드립니다. 이 필드는 트랜잭션 실행이 실패한 경우에만 존재합니다. 스토리지와 네트워크 대역폭을 절약하기 위해 `txError`는 정숫값으로 표현됩니다. 아래 표는 `txError` 코드와 의미를 설명합니다.

| Error Code | Description                                   |
| ---------- | --------------------------------------------- |
| 0x02       | 스마트 컨트랙트 실행 도중 VM 오류가 발생하였습니다.                |
| 0x03       | 최대 호출 뎁스를 초과하였습니다.                            |
| 0x04       | 컨트랙트 주소가 충돌합니다.                               |
| 0x05       | 컨트랙트 생성 코드의 스토리지의 가스가 부족합니다.                  |
| 0x06       | evm: 최대 코드 크기를 초과하였습니다.                       |
| 0x07       | 가스가 부족합니다.                                    |
| 0x08       | evm: 쓰기가 방지되어 있습니다.                           |
| 0x09       | evm: 실행이 번복되었습니다.                             |
| 0x0a       | 트랜잭션의 Opcode 연산 비용의 한계가 (100000000)에 도달하였습니다. |
| 0x0b       | 계정이 이미 존재합니다.                                 |
| 0x0c       | 프로그램 계정(예를 들어, 코드 및 스토리지를 갖고 있는 계정)이 아닙니다.    |
| 0x0d       | Human-readable address가 지원되지 않습니다.            |
| 0x0e       | 트랜잭션 수수료의 비율이 [1, 99] 범위를 벗어났습니다.             |
| 0x0f       | AccountKeyFail을 업데이트할 수 없습니다.                 |
| 0x10       | 다른 계정 키 유형입니다.                                |
| 0x11       | AccountKeyNil을 계정으로 초기화할 수 없습니다.              |
| 0x12       | 공개키가 곡선상에 없습니다.                               |
| 0x13       | 키의 weight가 0입니다.                              |
| 0x14       | 키를 일련화할 수 없습니다.                               |
| 0x15       | 중복된 키입니다.                                     |
| 0x16       | 가중 합 오버플로우가 발생하였습니다.                          |
| 0x17       | 만족시킬 수 없는 임계 값입니다. 키들의 가중 합이 임계 값보다 작습니다.     |
| 0x18       | 길이가 0입니다.                                     |
| 0x19       | 길이가 너무 깁니다.                                   |
| 0x1a       | nested composite 타입입니다.                       |
| 0x1b       | 기존 트랜잭션은 기존 계정 키를 사용해야 합니다.                   |
| 0x1c       | 더는 지원하지 않는 기능입니다.                             |
| 0x1d       | 지원하지 않습니다.                                    |
| 0x1e       | 스마트 컨트랙트 코드 형식이 잘못되었습니다.                      |

## klay_getDecodedAnchoringTransactionByHash <a id="klay_getDecodedAnchoringTransactionByHash"></a>

주어진 트랜잭션 해시에 대응하는 트랜잭션의 앵커링 데이터를 디코딩하여 반환합니다.

**Parameters**

| Type         | Description            |
| ------------ | ---------------------- |
| 32-byte DATA | Hash of a transaction. |

**Return Value**

| Name          | Type         | Description                                                                                                     |
| ------------- | ------------ | --------------------------------------------------------------------------------------------------------------- |
| BlockHash     | 32-byte DATA | 이 앵커링 트랜잭션이 수행된 자식 체인의 블록 해시입니다.                                                                                |
| BlockNumber   | QUANTITY     | 이 앵커링 트랜잭션이 수행된 자식 체인의 블록 번호입니다.                                                                                |
| ParentHash    | 32-byte DATA | Hash of the parent block.                                                                                       |
| TxHash        | 32-byte DATA | The root of the transaction trie of the block.                                                                  |
| StateRootHash | 32-byte DATA | The root of the final state trie of the block.                                                                  |
| ReceiptHash   | 32-byte DATA | The root of the receipts trie of the block.                                                                     |
| BlockCount    | QUANTITY     | 이 앵커링 주기 동안 생성된 블록 수입니다. 대부분의 경우 이 숫자는 자식 체인의 `SC_TX_PERIOD`와 같은데, 다만 이 트랜잭션이 앵커링을 활성화한 후 첫 번째 트랜잭션인 경우만 예외입니다. |
| TxCount       | QUANTITY     | 이 앵커링 주기 동안 자식 체인에서 생성된 트랜잭션 수 입니다.                                                                             |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getDecodedAnchoringTransactionByHash","params":["0x499350bc5e2f6fee1ba78b4d40a7a1db0a64f3c091112e6798a02ed9a4140084"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
   "jsonrpc":"2.0",
   "id":1,
   "result":{
      "BlockCount":1,
      "BlockHash":"0xcf5f591836d70a1da8e6bb8e5b2c5739329ca0e535b91e239b332af2e1b7f1f4",
      "BlockNumber":1055,
      "ParentHash":"0x70f6115a5b597f29791d3b5e3f129df54778f69ae669842cc81ec8c432fee37c",
      "ReceiptHash":"0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      "StateRootHash":"0x654773348f77a6788c76c93946340323c9b39399d0aa173f6b23fe082848d056",
      "TxCount":0,
      "TxHash":"0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421"
   }
}
```

```javascript
> klay.getDecodedAnchoringTransactionByHash("0x499350bc5e2f6fee1ba78b4d40a7a1db0a64f3c091112e6798a02ed9a4140084")
{
  BlockCount: 1,
  BlockHash: "0xcf5f591836d70a1da8e6bb8e5b2c5739329ca0e535b91e239b332af2e1b7f1f4",
  BlockNumber: 1055,
  ParentHash: "0x70f6115a5b597f29791d3b5e3f129df54778f69ae669842cc81ec8c432fee37c",
  ReceiptHash: "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
  StateRootHash: "0x654773348f77a6788c76c93946340323c9b39399d0aa173f6b23fe082848d056",
  TxCount: 0,
  TxHash: "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421"
}
```


## klay_resend <a id="klay_resend"></a>

Resends a transaction.

It will remove the given transaction from the pool and reinsert it with the new gas price and limit.

**NOTE**: The address to sign with must be unlocked.

**Parameters**:

| Name            | Type     | Description                                                                          |
| --------------- | -------- | ------------------------------------------------------------------------------------ |
| transactionArgs | Object   | An object of transaction arguments. See the table below for the object's properties. |
| gas price       | QUANTITY | Integer of the gasPrice to change                                                    |
| gas             | QUANTITY | (optional) Integer of the gas to change                                              |

The required parameters for transactionArgs depend on the transaction type. Check the proper parameters in [Working with Klaytn Transaction Types](./transaction/transaction-type-support.md).

**Return Value**

| Type         | Description          |
| ------------ | -------------------- |
| 32-byte DATA | The transaction hash |


**Example**

```shell
> var tx = klay.pendingTransactions()[0]
> klay.resend(tx, 750000000000, 300000)
```

