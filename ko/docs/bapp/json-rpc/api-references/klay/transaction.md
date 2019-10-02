## klay_call

Executes a new message call immediately without creating a transaction on the block chain. It returns data or an error object of JSON RPC if error occurs.

**Parameters**

| 명칭          | 형식                  | 설명                                                                                                                                                      |
| ----------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| callObject  | Object              | The transaction call object.  See the next table for the object's properties.                                                                           |
| blockNumber | QUANTITY &#124; TAG | Integer block number, or the string `"latest"`, `"earliest"` or `"pending"`, see the [default block parameter](./block.md#the-default-block-parameter). |

`callObject` has the following properties:

| 명칭       | 형식           | 설명                                                                                                                                                        |
| -------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from     | 20-byte DATA | (optional) The address the transaction is sent from.                                                                                                      |
| to       | 20-byte DATA | The address the transaction is directed to.                                                                                                               |
| 가스       | QUANTITY     | (optional) Integer of the gas provided for the transaction execution. `klay_call` consumes zero gas, but this parameter may be needed by some executions. |
| gasPrice | QUANTITY     | (optional) Integer of the gasPrice used for each paid gas.                                                                                                |
| 값        | QUANTITY     | (optional) Integer of the value sent with this transaction.                                                                                               |
| data     | DATA         | (optional) Hash of the method signature and encoded parameters.                                                                                           |

**Return Value**

| 형식   | 설명                                     |
| ---- | -------------------------------------- |
| DATA | The return value of executed contract. |

Use [klay_getTransactionReceipt](#klay_gettransactionreceipt) to get the contract address, after the transaction was mined, when you created a contract.

**Error**

It returns an error object of JSON RPC if anything goes worng. For example, an error object with message  "evm: execution reverted" will be generated if a message call is terminated with `REVERT` opcode.

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "klay_call", "params": [{"from": "0x3f71029af4e252b25b9ab999f77182f0cd3bc085", "to": "0x87ac99835e67168d4f9a40580f8f5c33550ba88b", "gas": "0x100000", "gasPrice": "0x5d21dba00", "value": "0x0", "data": "0x8ada066e"}, "latest"], "id": 1}' http://localhost:8551

// Result
{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000000a"}
```


## klay_estimateGas

Generates and returns an estimate of how much gas is necessary to allow the transaction to complete. The transaction will not be added to the blockchain. Note that the estimate may be significantly more than the amount of gas actually used by the transaction, for a variety of reasons including Klaytn Virtual Machine mechanics and node performance.

**Parameters**

See [klay_call](#klay_call) parameters, expect that all properties are optional. If no gas limit is specified, the Klaytn node uses the block gas limit from the pending block as an upper bound. As a result, the returned estimate might not be enough to executed the call/transaction when the amount of gas is higher than the pending block gas limit.

**Return Value**

| 형식       | 설명                      |
| -------- | ----------------------- |
| QUANTITY | The amount of gas used. |


**예시**
```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_estimateGas","params":[{see above}],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0","id":1,
  "result": "0x5208" // 21000
}
```

## klay_estimateComputationCost

Generates and returns an estimate of how much computation cost will be spent to execute the transaction. Klaytn limits the computation cost of a transaction to `100000000` currently not to take too much time by a single transaction. The transaction will not be added to the blockchain like [klay_estimateGas](#klay_estimategas).

**Parameters**

See [klay_call](#klay_call) parameters, except that all properties are optional. If no gas limit is specified, the Klaytn node uses the default gas limit (uint64 / 2) as an upper bound.

**Return Value**

| 형식       | 설명                                   |
| -------- | ------------------------------------ |
| QUANTITY | The amount of computation cost used. |

**예시**
```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_estimateComputationCost","params":[{"from":"0x73718c4980728857f3aa5148e9d1b471efa3a7dd", "to":"0x069942a3ca0dabf495dba872533134205764bc9c", "value":"0x0", "data":"0x2a31efc7000000000000000000000000000000000000000000000000000000000000271000000000000000000000000000000000000000000000000000000000000000420000000000000000000000000000000000000000000000000000000000003039"}, "latest"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0","id":1,
  "result": "0x1e8b0ad"
}
```

## klay_getTransactionByBlockHashAndIndex

Returns information about a transaction by block hash and transaction index position. This API works only on RPC call, not on Javascript console.

**Parameters**

| 형식           | 설명                                         |
| ------------ | ------------------------------------------ |
| 32-byte DATA | Hash of a block.                           |
| QUANTITY     | Integer of the transaction index position. |

**Return Value**

See [klay_getTransactionByHash](#klay_gettransactionbyhash)

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getTransactionByBlockHashAndIndex","params":["0x451cafae98d61b7458b5cef54402830941432278184453e3ca490eb687317e68", "0x0"],"id":1}' http://localhost:8551

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


## klay_getTransactionByBlockNumberAndIndex

Returns information about a transaction by block number and transaction index position. This API works only on RPC call, not on Javascript console.

**Parameters**

| 형식                  | 설명                                                                                                                                                  |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| QUANTITY &#124; TAG | A block number, or the string `"earliest"`, `"latest"` or `"pending"`, as in the [default block parameter](./block.md#the-default-block-parameter). |
| QUANTITY            | The transaction index position.                                                                                                                     |

**Return Value**

See [klay_getTransactionByHash](#klay_gettransactionbyhash)

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getTransactionByBlockNumberAndIndex","params":["0x27", "0x0"],"id":1}' http://localhost:8551

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


## klay_getTransactionByHash

Returns the information about a transaction requested by transaction hash. This API works only on RPC call, not on Javascript console.

**Parameters**

| 형식           | 설명                     |
| ------------ | ---------------------- |
| 32-byte DATA | Hash of a transaction. |

**Return Value**

`Object` - A transaction object, or `null` when no transaction was found:

| 명칭                 | 형식           | 설명                                                                                                                                                                                                                      |
| ------------------ | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockHash          | 32-byte DATA | Hash of the block where this transaction was in. `null` when it is pending.                                                                                                                                             |
| blockNumber        | QUANTITY     | Block number where this transaction was in. `null` when it is pending.                                                                                                                                                  |
| codeFormat         | String       | (optional) The code format of smart contract code.                                                                                                                                                                      |
| feePayer           | 20-byte DATA | (optional) Address of the fee payer.                                                                                                                                                                                    |
| feePayerSignatures | Array        | (optional) An array of fee payer's signature objects. A signature object contains three fields (V, R, and S). V contains ECDSA recovery id. R contains ECDSA signature r while S contains ECDSA signature s.            |
| feeRatio           | QUANTITY     | (optional) Fee ratio of the fee payer. If it is 30, 30% of the fee will be paid by the fee payer. 70% will be paid by the sender.                                                                                       |
| from               | 20-byte DATA | Address of the sender.                                                                                                                                                                                                  |
| 가스                 | QUANTITY     | Gas provided by the sender.                                                                                                                                                                                             |
| gasPrice           | QUANTITY     | Gas price provided by the sender in peb.                                                                                                                                                                                |
| 해시                 | 32-byte DATA | Hash of the transaction.                                                                                                                                                                                                |
| humanReadable      | Boolean      | (optional) `true` if the address is humanReadable, `false` if the address is not humanReadable.                                                                                                                         |
| key                | String       | (optional) Key of the newly created account.                                                                                                                                                                            |
| input              | DATA         | (optional) The data sent along with the transaction.                                                                                                                                                                    |
| nonce              | QUANTITY     | The number of transactions made by the sender prior to this one.                                                                                                                                                        |
| senderTxHash       | 32-byte DATA | Hash of a transaction that is signed only by the sender. See [SenderTxHash](../../../../klaytn/design/transactions/README.md#sendertxhash). This value is always the same as `hash` for non fee-delegated transactions. |
| signatures         | Array        | An array of signature objects. A signature object contains three fields (V, R, and S). V contains ECDSA recovery id. R contains ECDSA signature r while S contains ECDSA signature s.                                   |
| to                 | 20-byte DATA | Address of the receiver. `null` when it is a contract creation transaction.                                                                                                                                             |
| transactionIndex   | QUANTITY     | Integer of the transaction index position in the block. `null` when it is pending.                                                                                                                                      |
| 형식                 | String       | A string representing the type of the transaction.                                                                                                                                                                      |
| typeInt            | QUANTITY     | An integer representing the type of the transaction.                                                                                                                                                                    |
| 값                  | QUANTITY     | Value transferred in peb.                                                                                                                                                                                               |


**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getTransactionByHash","params":["0xaca5d9a1ed8b86b1ef61431b2bedfc99a66eaefc3a7e1cffdf9ff53653956a67"],"id":1}' http://localhost:8551

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


## klay_getTransactionBySenderTxHash

Returns the information about a transaction requested by sender transaction hash. This API works only on RPC call, not on Javascript console. Please note that this API returns correct result only if indexing feature is enabled by `--sendertxhashindexing`. This can be checked by call [klay_isSenderTxHashIndexingEnabled](config.md#klay_isSenderTxHashIndexingEnabled).

**Parameters**

| 형식           | 설명                                                                                                                                          |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| 32-byte DATA | Hash of a transaction that is signed only by the sender. See [SenderTxHash](../../../../klaytn/design/transactions/README.md#sendertxhash). |

**Return Value**

`Object` - A transaction object, or `null` when no transaction was found:

| 명칭                 | 형식           | 설명                                                                                                                                                                                                                      |
| ------------------ | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockHash          | 32-byte DATA | Hash of the block where this transaction was in. `null` when it is pending.                                                                                                                                             |
| blockNumber        | QUANTITY     | Block number where this transaction was in. `null` when it is pending.                                                                                                                                                  |
| codeFormat         | String       | (optional) The code format of smart contract code.                                                                                                                                                                      |
| feePayer           | 20-byte DATA | Address of the fee payer.                                                                                                                                                                                               |
| feePayerSignatures | Array        | An array of fee payer's signature objects. A signature object contains three fields (V, R, and S). V contains ECDSA recovery id. R contains ECDSA signature r while S contains ECDSA signature s.                       |
| feeRatio           | QUANTITY     | (optional) Fee ratio of the fee payer. If it is 30, 30% of the fee will be paid by the fee payer. 70% will be paid by the sender.                                                                                       |
| from               | 20-byte DATA | Address of the sender.                                                                                                                                                                                                  |
| 가스                 | QUANTITY     | Gas provided by the sender.                                                                                                                                                                                             |
| gasPrice           | QUANTITY     | Gas price provided by the sender in peb.                                                                                                                                                                                |
| 해시                 | 32-byte DATA | Hash of the transaction.                                                                                                                                                                                                |
| humanReadable      | Boolean      | (optional) `true` if the address is humanReadable, `false` if the address is not humanReadable.                                                                                                                         |
| key                | String       | (optional) Key of the newly created account.                                                                                                                                                                            |
| input              | DATA         | (optional) The data sent along with the transaction.                                                                                                                                                                    |
| nonce              | QUANTITY     | The number of transactions made by the sender prior to this one.                                                                                                                                                        |
| senderTxHash       | 32-byte DATA | Hash of a transaction that is signed only by the sender. See [SenderTxHash](../../../../klaytn/design/transactions/README.md#sendertxhash). This value is always the same as `hash` for non fee-delegated transactions. |
| signatures         | Array        | An array of signature objects. A signature object contains three fields (V, R, and S). V contains ECDSA recovery id. R contains ECDSA signature r while S contains ECDSA signature s.                                   |
| to                 | 20-byte DATA | Address of the receiver. `null` when it is a contract creation transaction.                                                                                                                                             |
| transactionIndex   | QUANTITY     | Integer of the transaction index position in the block. `null` when it is pending.                                                                                                                                      |
| 형식                 | String       | A string representing the type of the transaction.                                                                                                                                                                      |
| typeInt            | QUANTITY     | An integer representing the type of the transaction.                                                                                                                                                                    |
| 값                  | QUANTITY     | Value transferred in peb.                                                                                                                                                                                               |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getTransactionBySenderTxHash","params":["0x18fe9e1007da7d20aad77778557fb8acc58c80054daba65124c8c843aadd3478"],"id":1}' http://localhost:8551

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


## klay_getTransactionReceipt

Returns the receipt of a transaction by transaction hash.

**NOTE**: The receipt is not available for pending transactions.

**Parameters**

| 명칭   | 형식           | 설명                     |
| ---- | ------------ | ---------------------- |
| Hash | 32-byte DATA | Hash of a transaction. |

**Return Value**

`Object` - A transaction receipt object, or `null` when no receipt was found

| 명칭                 | 형식                      | 설명                                                                                                                                                                                                           |
| ------------------ | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| blockHash          | 32-byte DATA            | Hash of the block where this transaction was in.                                                                                                                                                             |
| blockNumber        | QUANTITY                | The block number where this transaction was in.                                                                                                                                                              |
| codeFormat         | String                  | (optional) The code format of smart contract code.                                                                                                                                                           |
| contractAddress    | DATA                    | The contract address created, if the transaction was a contract creation, otherwise `null`.                                                                                                                  |
| feePayer           | 20-byte DATA            | (optional) Address of the fee payer.                                                                                                                                                                         |
| feePayerSignatures | Array                   | (optional) An array of fee payer's signature objects. A signature object contains three fields (V, R, and S). V contains ECDSA recovery id. R contains ECDSA signature r while S contains ECDSA signature s. |
| feeRatio           | QUANTITY                | (optional) Fee ratio of the fee payer. If it is 30, 30% of the fee will be paid by the fee payer. 70% will be paid by the sender.                                                                            |
| from               | 20-byte DATA            | Address of the sender.                                                                                                                                                                                       |
| 가스                 | QUANTITY                | Gas provided by the sender.                                                                                                                                                                                  |
| gasPrice           | QUANTITY                | Gas price provided by the sender in peb.                                                                                                                                                                     |
| gasUsed            | QUANTITY                | The amount of gas used by this specific transaction alone.                                                                                                                                                   |
| humanReadable      | Boolean                 | (optional) `true` if the address is humanReadable, `false` if the address is not humanReadable.                                                                                                              |
| key                | String                  | (optional) Key of the newly created account.                                                                                                                                                                 |
| input              | DATA                    | (optional) The data sent along with the transaction.                                                                                                                                                         |
| 로그                 | Array                   | Array of log objects, which this transaction generated.                                                                                                                                                      |
| logsBloom          | 256-byte DATA           | Bloom filter for light clients to quickly retrieve related logs.                                                                                                                                             |
| nonce              | QUANTITY                | The number of transactions made by the sender prior to this one.                                                                                                                                             |
| senderTxHash       | (optional) 32-byte DATA | Hash of the tx without the fee payer's address and signature. This value is always the same as the value of transactionHash for non fee-delegated transactions.                                              |
| signature          | Array                   | An array of signature objects. A signature object contains three fields (V, R, and S). V contains ECDSA recovery id. R contains ECDSA signature r while S contains ECDSA signature s.                        |
| 상태                 | QUANTITY                | Either `1` (success) or `0` (failure).                                                                                                                                                                       |
| txError            | QUANTITY                | (optional) detailed error code if `status` is equal to zero.                                                                                                                                                 |
| to                 | 20-byte DATA            | Address of the receiver. `null` when it is a contract creation transaction.                                                                                                                                  |
| transactionHash    | 32-byte DATA            | Hash of the transaction.                                                                                                                                                                                     |
| transactionIndex   | QUANTITY                | Integer of the transaction index position in the block.                                                                                                                                                      |
| 형식                 | String                  | A string representing the type of the transaction.                                                                                                                                                           |
| typeInt            | QUANTITY                | An integer representing the type of the transaction.                                                                                                                                                         |
| 값                  | QUANTITY                | Value transferred in peb.                                                                                                                                                                                    |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getTransactionReceipt","params":["0xaca5d9a1ed8b86b1ef61431b2bedfc99a66eaefc3a7e1cffdf9ff53653956a67"],"id":1}' http://localhost:8551

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


## klay_getTransactionReceiptBySenderTxHash

Returns the receipt of a transaction by sender transaction hash.

**NOTE**: The receipt is not available for pending transactions. Please note that this API returns correct result only if indexing feature is enabled by `--sendertxhashindexing`. This can be checked by call [klay_isSenderTxHashIndexingEnabled](config.md#klay_issendertxhashindexingenabled).

**Parameters**

| 명칭   | 형식           | 설명                                                                       |
| ---- | ------------ | ------------------------------------------------------------------------ |
| Hash | 32-byte DATA | Hash of a transaction before signing of feePayer(senderTransactionHash). |

**Return Value**

`Object` - A transaction receipt object, or `null` when no receipt was found

| 명칭                 | 형식                      | 설명                                                                                                                                                                                                |
| ------------------ | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockHash          | 32-byte DATA            | Hash of the block where this transaction was in.                                                                                                                                                  |
| blockNumber        | QUANTITY                | The block number where this transaction was in.                                                                                                                                                   |
| codeFormat         | String                  | (optional) The code format of smart contract code.                                                                                                                                                |
| contractAddress    | DATA                    | The contract address created, if the transaction was a contract creation, otherwise `null`.                                                                                                       |
| feePayer           | 20-byte DATA            | Address of the fee payer.                                                                                                                                                                         |
| feePayerSignatures | Array                   | An array of fee payer's signature objects. A signature object contains three fields (V, R, and S). V contains ECDSA recovery id. R contains ECDSA signature r while S contains ECDSA signature s. |
| feeRatio           | QUANTITY                | (optional) Fee ratio of the fee payer. If it is 30, 30% of the fee will be paid by the fee payer. 70% will be paid by the sender.                                                                 |
| from               | 20-byte DATA            | Address of the sender.                                                                                                                                                                            |
| 가스                 | QUANTITY                | Gas provided by the sender.                                                                                                                                                                       |
| gasPrice           | QUANTITY                | Gas price provided by the sender in peb.                                                                                                                                                          |
| gasUsed            | QUANTITY                | The amount of gas used by this specific transaction alone.                                                                                                                                        |
| humanReadable      | Boolean                 | (optional) `true` if the address is humanReadable, `false` if the address is not humanReadable.                                                                                                   |
| key                | String                  | (optional) Key of the newly created account.                                                                                                                                                      |
| input              | DATA                    | (optional) The data sent along with the transaction.                                                                                                                                              |
| 로그                 | Array                   | Array of log objects, which this transaction generated.                                                                                                                                           |
| logsBloom          | 256-byte DATA           | Bloom filter for light clients to quickly retrieve related logs.                                                                                                                                  |
| nonce              | QUANTITY                | The number of transactions made by the sender prior to this one.                                                                                                                                  |
| senderTxHash       | (optional) 32-byte DATA | Hash of the tx without the fee payer's address and signature. This value is always the same as the value of transactionHash for non fee-delegated transactions.                                   |
| signature          | Array                   | An array of signature objects. A signature object contains three fields (V, R, and S). V contains ECDSA recovery id. R contains ECDSA signature r while S contains ECDSA signature s.             |
| 상태                 | QUANTITY                | Either `1` (success) or `0` (failure).                                                                                                                                                            |
| txError            | QUANTITY                | (optional) detailed error code if `status` is equal to zero.                                                                                                                                      |
| to                 | 20-byte DATA            | Address of the receiver. `null` when it is a contract creation transaction.                                                                                                                       |
| transactionHash    | 32-byte DATA            | Hash of the transaction.                                                                                                                                                                          |
| transactionIndex   | QUANTITY                | Integer of the transaction index position in the block.                                                                                                                                           |
| 형식                 | String                  | A string representing the type of the transaction.                                                                                                                                                |
| typeInt            | QUANTITY                | An integer representing the type of the transaction.                                                                                                                                              |
| 값                  | QUANTITY                | Value transferred in peb.                                                                                                                                                                         |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getTransactionReceiptBySenderTxHash","params":["0x18fe9e1007da7d20aad77778557fb8acc58c80054daba65124c8c843aadd3478"],"id":1}' http://localhost:8551

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


## klay_sendRawTransaction

Creates a new message call transaction or a contract creation for signed transactions.

**Parameters**

| 형식   | 설명                           |
| ---- | ---------------------------- |
| DATA | The signed transaction data. |

**Return Value**

| 형식           | 설명                                                                             |
| ------------ | ------------------------------------------------------------------------------ |
| 32-byte DATA | The transaction hash or the zero hash if the transaction is not yet available. |

Use [klay_getTransactionReceipt](#klay_gettransactionreceipt) to get the contract address, after the transaction was mined, when you created a contract.

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_sendRawTransaction","params":[{see above}],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```


## klay_sendTransaction

Creates a new message call transaction or a contract creation if the data field contains code.

**Parameters**

| 명칭       | 형식           | 설명                                                                                                               |
| -------- | ------------ | ---------------------------------------------------------------------------------------------------------------- |
| from     | 20-byte DATA | The address from which the transaction is sent.                                                                  |
| to       | 20-byte DATA | (optional when creating a new contract) The address to which the transaction is directed.                        |
| 가스       | QUANTITY     | (optional, default: 90000) Integer of the gas provided for the transaction execution. It will return unused gas. |
| gasPrice | QUANTITY     | (optional, default: 25000000000 Peb) Integer of the gasPrice used for each paid gas.                             |
| 값        | QUANTITY     | (optional) Integer of the value sent with this transaction.                                                      |
| data     | DATA         | The compiled code of a contract or the hash of the invoked method signature and encoded parameters.              |
| nonce    | QUANTITY     | (optional) Integer of a nonce. This allows to overwrite your own pending transactions that use the same nonce.   |

**Return Value**

| 형식           | 설명                                                                              |
| ------------ | ------------------------------------------------------------------------------- |
| 32-byte DATA | The transaction hash, or the zero hash if the transaction is not yet available. |

Use [klay_getTransactionReceipt](#klay_gettransactionreceipt) to get the contract address, after the transaction was mined, when you created a contract.

**예시**

```shell
params: [{
  "from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
  "to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
  "gas": "0x76c0",
  "gasPrice": "0x5d21dba00",
  "value": "0x9184e72a",
  "data": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"
}]
```

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_sendTransaction","params":[{see above}],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0","id":1,
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```


## klay_signTransaction
Creates a rawTransaction based on the give transaction information.

**NOTE**: The address to sign with must be unlocked.

**Parameters**
| 명칭       | 형식           | 설명                                                                                                               |
| -------- | ------------ | ---------------------------------------------------------------------------------------------------------------- |
| from     | 20-byte DATA | The address from which the transaction is sent.                                                                  |
| to       | 20-byte DATA | (optional when creating a new contract) The address to which the transaction is directed.                        |
| 가스       | QUANTITY     | (optional, default: 90000) Integer of the gas provided for the transaction execution. It will return unused gas. |
| gasPrice | QUANTITY     | (optional, default: 25000000000 Peb) Integer of the gasPrice used for each paid gas.                             |
| 값        | QUANTITY     | (optional) Integer of the value sent with this transaction.                                                      |
| data     | DATA         | The compiled code of a contract or the hash of the invoked method signature and encoded parameters.              |
| nonce    | QUANTITY     | (optional) Integer of a nonce. This allows to overwrite your own pending transactions that use the same nonce.   |


**Return Value**
| 형식  | 설명                                     |
| --- | -------------------------------------- |
| raw | Signed raw transaction                 |
| tx  | Transaction information including hash |

**예시**
```shell
// Request
curl -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0", "method":"klay_signTransaction", "params":[{"from":"0x77982323172e5b6182539d3522d5a33a944206d4", "to":"0xcd6bfdb523a4d030890d28bf1eb6ef36307c9aaa", "value":"0x10000", "gas":"0x1000000", "nonce":"0x2", "gasprice":"0x25000000000"}],"id":73}' http://localhost:8551

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

## txError: Detailed Information of Transaction Failures

Klaytn provides a field `txError` in the transaction receipt to give developers more information about the reason for the failed transaction execution. This field exists only if the transaction execution is failed. To save storage and network bandwidth, `txError` contains an integer value. The below table shows the meaning of the value in `txError`.

| Error Code | 설명                                                                        |
| ---------- | ------------------------------------------------------------------------- |
| 0x02       | VM error occurs while running smart contract                              |
| 0x03       | max call depth exceeded                                                   |
| 0x04       | contract address collision                                                |
| 0x05       | contract creation code storage out of gas                                 |
| 0x06       | evm: max code size exceeded                                               |
| 0x07       | out of gas                                                                |
| 0x08       | evm: write protection                                                     |
| 0x09       | evm: execution reverted                                                   |
| 0x0a       | reached the opcode computation cost limit (100000000) for tx              |
| 0x0b       | account already exists                                                    |
| 0x0c       | not a program account (e.g., an account having code and storage)          |
| 0x0d       | Human-readable address is not supported now                               |
| 0x0e       | fee ratio is out of range [1, 99]                                         |
| 0x0f       | AccountKeyFail is not updatable                                           |
| 0x10       | different account key type                                                |
| 0x11       | AccountKeyNil cannot be initialized to an account                         |
| 0x12       | public key is not on curve                                                |
| 0x13       | key weight is zero                                                        |
| 0x14       | key is not serializable                                                   |
| 0x15       | duplicated key                                                            |
| 0x16       | weighted sum overflow                                                     |
| 0x17       | unsatisfiable threshold. Weighted sum of keys is less than the threshold. |
| 0x18       | length is zero                                                            |
| 0x19       | length too long                                                           |
| 0x1a       | nested composite type                                                     |
| 0x1b       | a legacy transaction must be with a legacy account key                    |
| 0x1c       | deprecated feature                                                        |
| 0x1d       | not supported                                                             |
| 0x1e       | smart contract code format is invalid                                     |
