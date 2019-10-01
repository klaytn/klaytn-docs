## The Default Block Parameter

When requests are made that act on the state of Klaytn, the last default block parameter determines the height of the block.

The following options are possible for the `defaultBlock` parameter:

- `HEX String` - an integer block number
- `String "earliest"` for the earliest/genesis block
- `String "latest"` - for the latest mined block
- `String "pending"` - for the pending state/transactions


## klay_blockNumber

Returns the number of most recent block.

**Parameters**

None

**Return Value**

| 형식       | 설명                                                    |
| -------- | ----------------------------------------------------- |
| QUANTITY | Integer of the current block number the client is on. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_blockNumber","params":[],"id":83}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":83,
  "result": "0xc94"
}
```


## klay_getBlockByNumber

Returns information about a block by block number. This API works only on RPC call, not on Javascript console.

**Parameters**

| 형식                  | 설명                                                                                                                                                   |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| QUANTITY &#124; TAG | Integer of a block number, or the string `"earliest"`, `"latest"` or `"pending"`, as in the [default block parameter](#the-default-block-parameter). |
| Boolean             | If `true` it returns the full transaction objects, if `false` only the hashes of the transactions.                                                   |

**Return Value**

See [klay_getBlockByHash](#klay_getblockbyhash)

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getBlockByNumber","params":["0x1b4", true],"id":1}' http://localhost:8551

// Result
{
   "jsonrpc":"2.0",
   "id":1,
   "result":{
      difficulty: "0x1",
      extraData: "0xd8820505846b6c617988676f312e31312e328664617277696e00000000000000f89ed594e733cb4d279da696f30d470f8c04decb54fcb0d2b841559df8d4c3c83e1d1df56fceb70cb782a6a1062ab687026dd115b33df76fe03034e67bacf9662875968573f74f888d8264c7f4dd66552251e2485bc002b9aa0200f843b841337325a0e9c2736cbaf8afe7f6e5a229bcf17d0ffc3384bbaf80bda5772383fa2b22c5bd461183b428858b2937c33ddd2aff4beb8d6e429e59fbf39780cf8bb101",
      gasLimit: "0xe8d4a50fff",
      gasUsed: "0x0",
      governanceData: "0x",
      hash: "0xb1529fe2ac7c5c02106d4561b84f7fd82f16f269ec21167058a595c8c8b71bdf",
      logsBloom: "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      miner: "0x0000000000000000000000000000000000000000",
      mixHash: "0x63746963616c2062797a616e74696e65206661756c7420746f6c6572616e6365",
      nonce: "0x0000000000000000",
      number: "0x1b4",
      parentHash: "0x722ac692fbfe4de54b2aeaf4dead05c272f1597e6e45fe828cd6dd3ec771dbf4",
      receiptsRoot: "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      reward: "0x0000000000000000000000000000000000000000",
      size: "0x2d9",
      stateRoot: "0xedb87f4b0f905a655c80d1768eb22b1eff2405098c4748b8364c869611e02a2b",
      timestamp: "0x5c99cd8c",
      timestampFoS: "0xa",
      totalDifficulty: "0x1b5",
      transactions: [],
      transactionsRoot: "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      voteData: "0x"
    }
}
```


## klay_getBlockByHash

Returns information about a block by hash. This API works only on RPC call, not on Javascript console.

**Parameters**

| 형식           | 설명                                                                                                 |
| ------------ | -------------------------------------------------------------------------------------------------- |
| 32-byte DATA | Hash of a block.                                                                                   |
| Boolean      | If `true` it returns the full transaction objects, if `false` only the hashes of the transactions. |

**Return Value**

`Object` - A block object, or `null` when no block was found:

| 명칭               | 형식            | 설명                                                                                                 |
| ---------------- | ------------- | -------------------------------------------------------------------------------------------------- |
| number           | QUANTITY      | The block number. `null` when it is pending block.                                                 |
| 해시               | 32-byte DATA  | Hash of the block. `null` when it is pending block.                                                |
| parentHash       | 32-byte DATA  | Hash of the parent block.                                                                          |
| logsBloom        | 256-byte DATA | The bloom filter for the logs of the block. `null` when it is pending block.                       |
| transactionsRoot | 32-byte DATA  | The root of the transaction trie of the block.                                                     |
| stateRoot        | 32-byte DATA  | The root of the final state trie of the block.                                                     |
| receiptsRoot     | 32-byte DATA  | The root of the receipts trie of the block.                                                        |
| 보상               | 20-byte DATA  | The address of the beneficiary to whom the block rewards were given.                               |
| blockScore       | QUANTITY      | Former difficulty. Always 1 in the BFT consensus engine                                            |
| totalBlockScore  | QUANTITY      | Integer of the total blockScore of the chain until this block.                                     |
| extraData        | DATA          | The "extra data" field of this block.                                                              |
| size             | QUANTITY      | Integer the size of this block in bytes.                                                           |
| gasUsed          | QUANTITY      | The total used gas by all transactions in this block.                                              |
| timestamp        | QUANTITY      | The Unix timestamp for when the block was collated.                                                |
| timestampFoS     | QUANTITY      | The fraction of a second of the timestamp for when the block was collated.                         |
| 트랜잭션             | Array         | Array of transaction objects, or 32-byte transaction hashes depending on the last given parameter. |
| governanceData   | DATA          | RLP encoded governance configuration                                                               |
| voteData         | DATA          | RLP encoded governance vote of the proposer                                                        |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getBlockByHash","params":["0xb8deae63002d2b6aa33247c8ef545383ee0fd2282ac9b49dbbb74114389ddb5c", true],"id":1}' http://localhost:8551

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
      timestampFoS: "0x3d",
      totalDifficulty: "0x2",
      transactions: [],
      transactionsRoot: "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      voteData: "0x"
    }
}
```


## klay_getBlockReceipts

Returns receipts included in a block identified by block hash.

**Parameters**
| 형식           | 설명         |
| ------------ | ---------- |
| 32-byte DATA | Block hash |

**Return Value**

Receipts included in a block.  If the target block contains no transaction, an empty array `[]` is returned.

**예시**

```shell
// Request
curl -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0", "method":"klay_getBlockReceipts", "params":["0xdc762ed0274496e2a42278e2648d910d82468687b5415bb5eb058a96a0b93c30"],"id":73}' http://localhost:8551

// Result
{
  "jsonrpc":"2.0",
  "id":73,
  "result":[{
    "blockHash":"0xdc762ed0274496e2a42278e2648d910d82468687b5415bb5eb058a96a0b93c30",
    "blockNumber":"0x3ba38",
    "contractAddress":null,
    "from":"0x16b11cf9c2186a117b0da38315b42b1eaa03bbe5",
    "gas":"0x30d40",
    "gasPrice":"0x5d21dba00",
    "gasUsed":"0x1886c",
    "input":"0x772e5c61000000000000000000000000bf756e27c5342a1249aa4475866e9e4d7eef9b2e0000000000000000000000000000000000000000000000004563918244f40000",
    "logs":[{
      "address":"0xdbb98c72e9818ad2c93a09e35ad43ada0d4223f0",
      "topics":["0x011e8596961d1f358aff58fc5c89276f9b1f554536b7bfe20139bbc1f230e693"],
      "data":"0x000000000000000000000000bf756e27c5342a1249aa4475866e9e4d7eef9b2e0000000000000000000000000000000000000000000000004563918244f40000000000000000000000000000000000000000000000000000000000000003ba380000000000000000000000000000000000000000000000000000000000050bb8",
      "blockNumber":"0x3ba38",
      "transactionHash":"0x3b7342738291253b514940941aaa3181661e34236e02002fecdd2180ead5910e",
      "transactionIndex":"0x0",
      "blockHash":"0xdc762ed0274496e2a42278e2648d910d82468687b5415bb5eb058a96a0b93c30",
      "logIndex":"0x0",
      "removed":false
    }],
  "logsBloom":"0x00000000000000000000000000000000008000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004000000000000040000080000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "nonce":"0x58e",
    "signatures":["0x7f6","0x50b2b0f95b8a6d7018369b1933d6cebb52ef119463d1840a6181d05bf8fc29d8","0x329630f88d9d06c5f1bd7644dbf6bd6b92e4ab0e3d47122972f8294c9289e7bb"],
    "status":"0x1",
    "to":"0xdbb98c72e9818ad2c93a09e35ad43ada0d4223f0",
    "transactionIndex":"0x0",
    "txHash":"0x3b7342738291253b514940941aaa3181661e34236e02002fecdd2180ead5910e",
    "type":"TxTypeLegacyTransaction",
    "value":"0x0"
  }
}
```


## klay_getBlockTransactionCountByNumber

Returns the number of transactions in a block matching the given block number.

**Parameters**

| 형식                  | 설명                                                                                                                                                   |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| QUANTITY &#124; TAG | Integer of a block number, or the string `"earliest"`, `"latest"` or `"pending"`, as in the [default block parameter](#the-default-block-parameter). |

**Return Value**

| 형식       | 설명                                                   |
| -------- | ---------------------------------------------------- |
| QUANTITY | Integer of the number of transactions in this block. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getBlockTransactionCountByNumber","params":["0xe8"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0xa" // 10
}
```


## klay_getBlockTransactionCountByHash

Returns the number of transactions in a block from a block matching the given block hash.

**Parameters**

| 형식           | 설명              |
| ------------ | --------------- |
| 32-byte DATA | Hash of a block |

**Return Value**

| 형식       | 설명                                                   |
| -------- | ---------------------------------------------------- |
| QUANTITY | Integer of the number of transactions in this block. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getBlockTransactionCountByHash","params":["0x0c11803ab36110db993e7520908b9ba9336cca2f2dcc9b6130c481a3ccdc2621"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0x0"
}
```


## klay_getBlockWithConsensusInfoByHash

Returns a block with consensus information matched by the given hash.

**Parameters**

| 형식           | 설명               |
| ------------ | ---------------- |
| 32-byte DATA | Hash of a block. |

**Return Value**

`Object` - A block object with consensus information (a proposer and a list of committee members), or `null` when no block was found:

| 명칭               | 형식           | 설명                                                                                                                                                    |
| ---------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockScore       | QUANTITY     | Former difficulty. Always 1 in the BFT consensus engine                                                                                               |
| totalBlockScore  | QUANTITY     | Integer of the total blockScore of the chain until this block.                                                                                        |
| committee        | Array        | Array of addresses of committee members of this block. The committee is a subset of validators participated in the consensus protocol for this block. |
| gasUsed          | QUANTITY     | The total used gas by all transactions in this block.                                                                                                 |
| 해시               | 32-byte DATA | Hash of the block. `null` when it is pending block.                                                                                                   |
| number           | QUANTITY     | The block number. `null` when it is pending block.                                                                                                    |
| parentHash       | 32-byte DATA | Hash of the parent block.                                                                                                                             |
| proposer         | 20-byte DATA | The address of the block proposer.                                                                                                                    |
| receiptsRoot     | 32-byte DATA | The root of the receipts trie of the block.                                                                                                           |
| size             | QUANTITY     | Integer the size of this block in bytes.                                                                                                              |
| stateRoot        | 32-byte DATA | The root of the final state trie of the block.                                                                                                        |
| timestamp        | QUANTITY     | The Unix timestamp for when the block was collated.                                                                                                   |
| timestampFoS     | QUANTITY     | The fraction of a second of the timestamp for when the block was collated.                                                                            |
| 트랜잭션             | Array        | Array of transaction objects.                                                                                                                         |
| transactionsRoot | 32-byte DATA | The root of the transaction trie of the block.                                                                                                        |

**예시**

```shell
// Request
curl -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0", "method":"klay_getBlockWithConsensusInfoByHash", "params":["0x2f0c986bd224d85411c89c108c28caa6dad1c7f97745051920289c65924faf10"],"id":73}' http://localhost:8551

// Result
{
  "jsonrpc":"2.0",
  "id":73,
  "result":{
    "blockscore":"0x1",
    "committee":["0x3f0fd2d317878d561af836547d568123d9ad6dfc","0x3e198e3d87f79a6ffe01d7debd4b149d21a8c2c1","0x55b51257a835f877ee4c71d079629c2c22e282e1","0x946fd575c03828fde82b0f83fed0970527ef5c3b","0x96089f58b2ce2cf58f38535e269a4eaff5d4c52d","0xad36f4fa8752ef0e58ef558002ed581d3bb6bd8e","0xf156dfa0b5836685b52dd51588554b2965fdab57","0xfb42f1cc6445ed51cd025f7de4c8400aa2d609e1"],
    "extraData":"0xd7820703846b6c617988676f312e31312e35856c696e75780000000000000000f9023ff8a8943e198e3d87f79a6ffe01d7debd4b149d21a8c2c1943f0fd2d317878d561af836547d568123d9ad6dfc9455b51257a835f877ee4c71d079629c2c22e282e194946fd575c03828fde82b0f83fed0970527ef5c3b9496089f58b2ce2cf58f38535e269a4eaff5d4c52d94ad36f4fa8752ef0e58ef558002ed581d3bb6bd8e94f156dfa0b5836685b52dd51588554b2965fdab5794fb42f1cc6445ed51cd025f7de4c8400aa2d609e1b841855a27fdfa88cf2679eddde99bfa15b810b3e8b840f0f164c58c26a6ee9cad804c40d12a28702fc8f352b77b0f3fe66d47ba7ba53a5bd183614541282963ac2201f9014fb841ddf20e4b4e0b9374d5bd5cb8c3ec3beafd4695f90a9013a619381f134f442eb74698750945169f9111e754da9c9f49234b91edd3e14914894b79daa875b1b7f501b841e48b7ae162974534136733556151a37f7413c59d17103cc6fca58fc68386c12f5b7a9025eab962e14140a4c34591211b3b4a663eb30a994597579ca24cc051ba01b84183bf2ea50a6d9c4e136e7ec0647b1d04734438dcb29df805f312f13fd2e5b29d24ac5061b3f307d7fff5b70de7135a12f0b539f3b85e9cbad4d52ede0016c24101b84117f232fd6221a2a2efb416ffbf7f4ac4afb0de394c07deba9273da11aaa3c9974e6be2f197b88d3b900fbeaf0adbe69c225b125689ae765eba1f25f9cfa367e200b841042b797dd91502240451d2c9c818f2a5c2f81fe3c826f9235e1bd89c7cbd969a7754dba45b0d1b4d1949d4c5aa43d0754c63a571b09c653fd92aad0b0e38425300",
    "gasUsed":"0x0",
    "governanceData":"0x",
    "hash":"0xad273a4e43b22b4c2139d25aa79beb0bc2ede4f446306cef9b62141e21a60c7a",
    "logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "number":"0x1",
    "parentHash":"0x2c4e9c507f8481b02c60e1f7b4a018c6a0b0681c61da917cde2450490ac21205",
    "proposer":"0xfb42f1cc6445ed51cd025f7de4c8400aa2d609e1",
    "receiptsRoot":"0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
    "reward":"0xa4b4427fc87a764b6caca7a80568812fa67fea45",
    "size":"0x413",
    "stateRoot":"0xccfb9b40bb06d4bf0f6fc6e720c9356fe3e18c641d683fe2a6ecb75008e22f98",
    "timestamp":"0x5cd4ce48",
    "timestampFoS":"0x5f",
    "totalBlockScore":"0x2",
    "transactions":[
      {
        "blockHash":"0xcc5d73c789bf239d93b712267496ccf87a1cf5213fb69dbd4919117085d521de",
        "blockNumber":"0x13fa8",
        "contractAddress":null,
        "from":"0x5b5b7a718a4124eb746ae00b1ce6edcaa5ab55bc",
        "gas":"0x989680",
        "gasPrice":"0x5d21dba00",
        "gasUsed":"0xecc8","input":"0xa2320f03000000000000000000000000d3564e57bb5c6f4d983a493a946534f8e1e8b4810000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000045827b25000000000000000000000000000000000000000000000000000000000",
        "logs":[
          {
            "address":"0xd3564e57bb5c6f4d983a493a946534f8e1e8b481",
            "topics":["0xeabf7053a0bf044bb930225b51ac0017c5f6e07d9437da3be979511122dbc116","0x24da66e9f7eac6e40e8143e06bda90a5d6becc682426ac693de641cd1ddb13f8","0x0000000000000000000000005b5b7a718a4124eb746ae00b1ce6edcaa5ab55bc"],
            "data":"0x000000000000000000000000d3564e57bb5c6f4d983a493a946534f8e1e8b48100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000005c99f21900000000000000000000000000000000000000000000000000000000000000045827b25000000000000000000000000000000000000000000000000000000000",
            "blockNumber":"0x13fa8","transactionHash":"0x0d465e4b1b02f0c7f42557846274fa9a45ed325db04458df65e588124be8a85d",
            "transactionIndex":"0x0",
            "blockHash":"0xcc5d73c789bf239d93b712267496ccf87a1cf5213fb69dbd4919117085d521de",
            "logIndex":"0x0",
            "removed":false
          },
          {
            "address":"0xd3564e57bb5c6f4d983a493a946534f8e1e8b481",
            "topics":["0x7bcadb76354d2db89bb853995c4378d9f91a187f2f0c1e2aec621b848c71ecfa","0x24da66e9f7eac6e40e8143e06bda90a5d6becc682426ac693de641cd1ddb13f8","0x0000000000000000000000005b5b7a718a4124eb746ae00b1ce6edcaa5ab55bc"],
            "data":"0x000000000000000000000000000000000000000000000000000000005c99f219",
            "blockNumber":"0x13fa8",
            "transactionHash":"0x0d465e4b1b02f0c7f42557846274fa9a45ed325db04458df65e588124be8a85d",
            "transactionIndex":"0x0",
            "blockHash":"0xcc5d73c789bf239d93b712267496ccf87a1cf5213fb69dbd4919117085d521de",
            "logIndex":"0x1",
            "removed":false
          }
        ],"logsBloom":"0x00000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000008000000000000000000400000000000000000000000000000000000000000000000000000000000000000000008000100000000000100000000000020000000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000002000000000000400000000000000000000200000000040000000000000000000000040000000000000000000000000000000000000000000000000000000000000000000024000000000000000000000000000000000",
        "nonce":"0x7",
        "signatures":["0x1c","0x62bd6db227c1df4af36c3b35642a5b1ef1cde7fb4a91eca754955b2fb65e111f","0x1824f2128cf4271af6eb4ad644864220efb1f3efa12f08ef1d446c74209960e8"],
        "status":"0x1",
        "to":"0xd3564e57bb5c6f4d983a493a946534f8e1e8b481",
        "transactionIndex":"0x0",
        "txHash":"0x0d465e4b1b02f0c7f42557846274fa9a45ed325db04458df65e588124be8a85d",
        "type":"TxTypeLegacyTransaction",
        "value":"0x0"
      }
    ],
    "transactionsRoot":"0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
    "voteData":"0x"
  }
}
```


## klay_getBlockWithConsensusInfoByNumber
Returns a block with consensus information matched by the given block number.

**Parameters**

| 형식                  | 설명                                                                   |
| ------------------- | -------------------------------------------------------------------- |
| QUANTITY &#124; TAG | Integer of a block number, or the string `"earliest"` or `"latest"`. |

**Return Value**

`Object` - A block object with consensus information (a proposer and a list of committee members), or `null` when no block was found:

| 명칭               | 형식           | 설명                                                                                                                                                    |
| ---------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockScore       | QUANTITY     | Former difficulty. Always 1 in the BFT consensus engine                                                                                               |
| totalBlockScore  | QUANTITY     | Integer of the total blockScore of the chain until this block.                                                                                        |
| committee        | Array        | Array of addresses of committee members of this block. The committee is a subset of validators participated in the consensus protocol for this block. |
| gasUsed          | QUANTITY     | The total used gas by all transactions in this block.                                                                                                 |
| 해시               | 32-byte DATA | Hash of the block. `null` when it is pending block.                                                                                                   |
| number           | QUANTITY     | The block number. `null` when it is pending block.                                                                                                    |
| parentHash       | 32-byte DATA | Hash of the parent block.                                                                                                                             |
| proposer         | 20-byte DATA | The address of the block proposer.                                                                                                                    |
| receiptsRoot     | 32-byte DATA | The root of the receipts trie of the block.                                                                                                           |
| size             | QUANTITY     | Integer the size of this block in bytes.                                                                                                              |
| stateRoot        | 32-byte DATA | The root of the final state trie of the block.                                                                                                        |
| timestamp        | QUANTITY     | The Unix timestamp for when the block was collated.                                                                                                   |
| timestampFoS     | QUANTITY     | The fraction of a second of the timestamp for when the block was collated.                                                                            |
| 트랜잭션             | Array        | Array of transaction objects.                                                                                                                         |
| transactionsRoot | 32-byte DATA | The root of the transaction trie of the block.                                                                                                        |

**예시**

```shell
// Request
curl -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0", "method":"klay_getBlockWithConsensusInfoByNumber", "params":["0x1"],"id":73}'http://localhost:8551

// Result
{
  "jsonrpc":"2.0",
  "id":73,
  "result":{
    "blockscore":"0x1",
    "committee":["0x3f0fd2d317878d561af836547d568123d9ad6dfc","0x3e198e3d87f79a6ffe01d7debd4b149d21a8c2c1","0x55b51257a835f877ee4c71d079629c2c22e282e1","0x946fd575c03828fde82b0f83fed0970527ef5c3b","0x96089f58b2ce2cf58f38535e269a4eaff5d4c52d","0xad36f4fa8752ef0e58ef558002ed581d3bb6bd8e","0xf156dfa0b5836685b52dd51588554b2965fdab57","0xfb42f1cc6445ed51cd025f7de4c8400aa2d609e1"],
    "extraData":"0xd7820703846b6c617988676f312e31312e35856c696e75780000000000000000f9023ff8a8943e198e3d87f79a6ffe01d7debd4b149d21a8c2c1943f0fd2d317878d561af836547d568123d9ad6dfc9455b51257a835f877ee4c71d079629c2c22e282e194946fd575c03828fde82b0f83fed0970527ef5c3b9496089f58b2ce2cf58f38535e269a4eaff5d4c52d94ad36f4fa8752ef0e58ef558002ed581d3bb6bd8e94f156dfa0b5836685b52dd51588554b2965fdab5794fb42f1cc6445ed51cd025f7de4c8400aa2d609e1b841855a27fdfa88cf2679eddde99bfa15b810b3e8b840f0f164c58c26a6ee9cad804c40d12a28702fc8f352b77b0f3fe66d47ba7ba53a5bd183614541282963ac2201f9014fb841ddf20e4b4e0b9374d5bd5cb8c3ec3beafd4695f90a9013a619381f134f442eb74698750945169f9111e754da9c9f49234b91edd3e14914894b79daa875b1b7f501b841e48b7ae162974534136733556151a37f7413c59d17103cc6fca58fc68386c12f5b7a9025eab962e14140a4c34591211b3b4a663eb30a994597579ca24cc051ba01b84183bf2ea50a6d9c4e136e7ec0647b1d04734438dcb29df805f312f13fd2e5b29d24ac5061b3f307d7fff5b70de7135a12f0b539f3b85e9cbad4d52ede0016c24101b84117f232fd6221a2a2efb416ffbf7f4ac4afb0de394c07deba9273da11aaa3c9974e6be2f197b88d3b900fbeaf0adbe69c225b125689ae765eba1f25f9cfa367e200b841042b797dd91502240451d2c9c818f2a5c2f81fe3c826f9235e1bd89c7cbd969a7754dba45b0d1b4d1949d4c5aa43d0754c63a571b09c653fd92aad0b0e38425300",
    "gasUsed":"0x0",
    "governanceData":"0x",
    "hash":"0xad273a4e43b22b4c2139d25aa79beb0bc2ede4f446306cef9b62141e21a60c7a",
    "logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "number":"0x1",
    "parentHash":"0x2c4e9c507f8481b02c60e1f7b4a018c6a0b0681c61da917cde2450490ac21205",
    "proposer":"0xfb42f1cc6445ed51cd025f7de4c8400aa2d609e1",
    "receiptsRoot":"0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
    "reward":"0xa4b4427fc87a764b6caca7a80568812fa67fea45",
    "size":"0x413",
    "stateRoot":"0xccfb9b40bb06d4bf0f6fc6e720c9356fe3e18c641d683fe2a6ecb75008e22f98",
    "timestamp":"0x5cd4ce48",
    "timestampFoS":"0x5f",
    "totalBlockScore":"0x2",
    "transactions":[
      {
        "blockHash":"0xcc5d73c789bf239d93b712267496ccf87a1cf5213fb69dbd4919117085d521de",
        "blockNumber":"0x13fa8",
        "contractAddress":null,
        "from":"0x5b5b7a718a4124eb746ae00b1ce6edcaa5ab55bc",
        "gas":"0x989680",
        "gasPrice":"0x5d21dba00",
        "gasUsed":"0xecc8","input":"0xa2320f03000000000000000000000000d3564e57bb5c6f4d983a493a946534f8e1e8b4810000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000045827b25000000000000000000000000000000000000000000000000000000000",
        "logs":[
          {
            "address":"0xd3564e57bb5c6f4d983a493a946534f8e1e8b481",
            "topics":["0xeabf7053a0bf044bb930225b51ac0017c5f6e07d9437da3be979511122dbc116","0x24da66e9f7eac6e40e8143e06bda90a5d6becc682426ac693de641cd1ddb13f8","0x0000000000000000000000005b5b7a718a4124eb746ae00b1ce6edcaa5ab55bc"],
            "data":"0x000000000000000000000000d3564e57bb5c6f4d983a493a946534f8e1e8b48100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000005c99f21900000000000000000000000000000000000000000000000000000000000000045827b25000000000000000000000000000000000000000000000000000000000",
            "blockNumber":"0x13fa8","transactionHash":"0x0d465e4b1b02f0c7f42557846274fa9a45ed325db04458df65e588124be8a85d",
            "transactionIndex":"0x0",
            "blockHash":"0xcc5d73c789bf239d93b712267496ccf87a1cf5213fb69dbd4919117085d521de",
            "logIndex":"0x0",
            "removed":false
          },
          {
            "address":"0xd3564e57bb5c6f4d983a493a946534f8e1e8b481",
            "topics":["0x7bcadb76354d2db89bb853995c4378d9f91a187f2f0c1e2aec621b848c71ecfa","0x24da66e9f7eac6e40e8143e06bda90a5d6becc682426ac693de641cd1ddb13f8","0x0000000000000000000000005b5b7a718a4124eb746ae00b1ce6edcaa5ab55bc"],
            "data":"0x000000000000000000000000000000000000000000000000000000005c99f219",
            "blockNumber":"0x13fa8",
            "transactionHash":"0x0d465e4b1b02f0c7f42557846274fa9a45ed325db04458df65e588124be8a85d",
            "transactionIndex":"0x0",
            "blockHash":"0xcc5d73c789bf239d93b712267496ccf87a1cf5213fb69dbd4919117085d521de",
            "logIndex":"0x1",
            "removed":false
          }
        ],"logsBloom":"0x00000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000008000000000000000000400000000000000000000000000000000000000000000000000000000000000000000008000100000000000100000000000020000000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000002000000000000400000000000000000000200000000040000000000000000000000040000000000000000000000000000000000000000000000000000000000000000000024000000000000000000000000000000000",
        "nonce":"0x7",
        "signatures":["0x1c","0x62bd6db227c1df4af36c3b35642a5b1ef1cde7fb4a91eca754955b2fb65e111f","0x1824f2128cf4271af6eb4ad644864220efb1f3efa12f08ef1d446c74209960e8"],
        "status":"0x1",
        "to":"0xd3564e57bb5c6f4d983a493a946534f8e1e8b481",
        "transactionIndex":"0x0",
        "txHash":"0x0d465e4b1b02f0c7f42557846274fa9a45ed325db04458df65e588124be8a85d",
        "type":"TxTypeLegacyTransaction",
        "value":"0x0"
      }
    ],
    "transactionsRoot":"0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
    "voteData":"0x"
  }
}
```

## klay_getCommittee
Returns a list of all validators in the committee at the specified block. If the parameter is not set, returns a list of all validators in the committee at the latest block.

**Parameters**

| 명칭                   | 형식      | 설명                                                                              |
| -------------------- | ------- | ------------------------------------------------------------------------------- |
| QUANTITY  &#124; TAG | Integer | (optional) Integer of a block number, or the string `"earliest"` or `"latest"`. |

**Return Value**

`Array` - Array of addresses of all validators in the committee, or `null` when no committee was found:

| 형식                    | 설명                                            |
| --------------------- | --------------------------------------------- |
| Array of 20-byte DATA | Addresses of all validators in the committee. |

**예시**

```shell
// Request
curl -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0", "method":"klay_getCommittee", "params":["0x1b4"],"id":73}' http://localhost:8551
// Result
{
    "jsonrpc":"2.0",
    "id":73,
    "result":[
        "0x207e38864b45a538733741dc1ff92eff9d1a6159",
        "0x6d64bc82b93368a7f963d6c34483ca3893f405f6",
        "0xbc9c19f91878369776812039e4ebcdfa3c646716",
        "0xe3ed6fa287752b992f936b42360770c59731d9eb"
    ]
}
```

## klay_getCommitteeSize
Returns the size of the committee at the specified block. If the parameter is not set, returns the size of the committee at the latest block.

**Parameters**

| 명칭                   | 형식      | 설명                                                                              |
| -------------------- | ------- | ------------------------------------------------------------------------------- |
| QUANTITY  &#124; TAG | Integer | (optional) Integer of a block number, or the string `"earliest"` or `"latest"`. |

**Return Value**

`Integer` - The size of the committee, or `-1` when no committee was found:

| 형식       | 설명                      |
| -------- | ----------------------- |
| QUANTITY | The size of the council |

**예시**

```shell
// Request
curl -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0", "method":"klay_getCommitteeSize", "params":["0x1b4"],"id":73}' http://localhost:8551
// Result
{
    "jsonrpc":"2.0",
    "id":73,
    "result":4
}
```


## klay_getCouncil
Returns a list of all validators of the council at the specified block. If the parameter is not set, returns a list of all validators of the council at the latest block.

**NOTE**: `klay_getValidators` is replaced with this method and is not supported anymore.

**Parameters**

| 명칭                   | 형식      | 설명                                                                              |
| -------------------- | ------- | ------------------------------------------------------------------------------- |
| QUANTITY  &#124; TAG | Integer | (optional) Integer of a block number, or the string `"earliest"` or `"latest"`. |

**Return Value**

`Array` - Array of validator addresses of the council, or `null` when no council was found:

| 형식                    | 설명                                          |
| --------------------- | ------------------------------------------- |
| Array of 20-byte DATA | Addresses of all validators of the council. |

**예시**

```shell
// Request
curl -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0", "method":"klay_getCouncil", "params":["0x1b4"],"id":73}' http://localhost:8551
// Result
{
    "jsonrpc":"2.0",
    "id":73,
    "result":[
        "0x207e38864b45a538733741dc1ff92eff9d1a6159",
        "0x6d64bc82b93368a7f963d6c34483ca3893f405f6",
        "0xbc9c19f91878369776812039e4ebcdfa3c646716",
        "0xe3ed6fa287752b992f936b42360770c59731d9eb"
    ]
}
```

## klay_getCouncilSize
Returns the size of the council at the specified block. If the parameter is not set, returns the size of the council at the latest block.

**Parameters**

| 명칭                   | 형식      | 설명                                                                              |
| -------------------- | ------- | ------------------------------------------------------------------------------- |
| QUANTITY  &#124; TAG | Integer | (optional) Integer of a block number, or the string `"earliest"` or `"latest"`. |

**Return Value**

`Integer` - The size of the council, or `-1` when no council was found:

| 형식       | 설명                      |
| -------- | ----------------------- |
| QUANTITY | The size of the council |

**예시**

```shell
// Request
curl -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0", "method":"klay_getCouncilSize", "params":["0x1b4"],"id":73}' http://localhost:8551
// Result
{
    "jsonrpc":"2.0",
    "id":73,
    "result": 4
}
```


## klay_getStorageAt

Returns the value from a storage position at a given address.

**Parameters**

| 형식                  | 설명                                                                                                                                            |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| 20-byte DATA        | Address of the storage.                                                                                                                       |
| QUANTITY            | Integer of the position in the storage.                                                                                                       |
| QUANTITY &#124; TAG | Integer block number, or the string `"latest"`, `"earliest"` or `"pending"`, see the [default block parameter](#the-default-block-parameter). |

 **Return Value**

| 형식   | 설명                                  |
| ---- | ----------------------------------- |
| DATA | The value at this storage position. |

**예시**

Calculating the correct position depends on the storage to retrieve. Consider the following contract deployed at `0x295a70b2de5e3953354a6a8344e616ed314d7251` by address `0x391694e7e0b0cce554cb130d723a9d27458f9298`.

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

Retrieving the value of `pos0` is straight forward:

```shell
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0", "method": "klay_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' http://localhost:8551

{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}
```

Retrieving an element of the map is harder. The position of an element in the map is calculated with:
```javascript
keccak(LeftPad32(key, 0), LeftPad32(map position, 0))
```

This means to retrieve the storage on `pos1["0x391694e7e0b0cce554cb130d723a9d27458f9298"]` we need to calculate the position with:
```javascript
keccak(decodeHex("000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"))
```
The Klaytn console which comes with the `klay` library can be used to make the calculation
```javascript
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> klay.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```
Now to fetch the storage:
```shell
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0", "method": "klay_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' http://localhost:8551

{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```


## klay_mining

Returns `true` if client is actively mining new blocks.

**NOTE**: Currently, every node is on mining mode by default to resend transactions. Please note that actual "mining" process is only done by Consensus Nodes (CNs).

**Parameters**

None

**Return Value**

| 형식      | 설명                                                 |
| ------- | -------------------------------------------------- |
| Boolean | `true` if the client is mining, otherwise `false`. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_mining","params":[],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":true
}
```


## klay_syncing

Returns an object with data about the sync status or `false`.

**Parameters**

None

**Return Value**

`Object|Boolean`, an object with sync status data or `false` when not syncing:

| 명칭            | 형식       | 설명                                                                                                                 |
| ------------- | -------- | ------------------------------------------------------------------------------------------------------------------ |
| startingBlock | QUANTITY | The block at which the import started (will only be reset, after the sync reached his head).                       |
| currentBlock  | QUANTITY | The current block, same as `klay_blockNumber`.                                                                     |
| highestBlock  | QUANTITY | The estimated highest block.                                                                                       |
| pulledStates  | QUANTITY | The number of state entries processed until now.  If the sync mode is not "fast", zero is returned.                |
| knownStates   | QUANTITY | The number of known state entries that still need to be pulled.  If the sync mode is not "fast", zero is returned. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_syncing","params":[],"id":1}' http://localhost:8551

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
