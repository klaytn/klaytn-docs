## klay_getFilterChanges <a id="klay_getfilterchanges"></a>

필터에 대한 폴링 방법으로, 최근 폴링 이후 발생한 로그를 배열의 형태로 반환합니다.

**매개변수**

| 명칭       | 형식  | 설명                                    |
| -------- | --- | ------------------------------------- |
| QUANTITY | 문자열 | The filter id (*e.g.*, "0x16" // 22). |

**리턴값**

`배열` - 로그 객체의 배열을 반환하거나 또는 최근 폴링 이후 변화가 없는 경우 빈 배열을 반환합니다.
- For filters created with [klay_newBlockFilter](#klay_newblockfilter), the return are block hashes (32-byte DATA), *e.g.*, `["0x3454645634534..."]`.
- For filters created with [klay_newPendingTransactionFilter](#klay_newpendingtransactionfilter), the return are transaction hashes (32-byte DATA), *e.g.*, `["0x6345343454645..."]`.
- For filters created with [klay_newFilter](#klay_newfilter), logs are objects with following parameters:

| 명칭               | 형식            | 설명                                                                                                                                                                                                                                                   |
| ---------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| removed          | TAG           | 체인 재구성으로 로그가 제거된 경우 `true`입니다. 유효한 로그이면 `false`입니다.                                                                                                                                                                                                  |
| logIndex         | QUANTITY      | 블록에서 로그 인덱스 위치의 정숫값입니다. 보류 중인 로그인 경우 `null`을 반환합니다.                                                                                                                                                                                                  |
| transactionIndex | QUANTITY      | 로그가 생성된 트랜잭션의 인덱스 위치의 정숫값입니다. 보류 중인 경우 `null`을 반환합니다.                                                                                                                                                                                                |
| transactionHash  | 32바이트 크기 DATA | 로그가 생성된 트랜잭션의 해시입니다. 보류 중인 경우 `null`을 반환합니다.                                                                                                                                                                                                         |
| blockHash        | 32바이트 크기 DATA | 로그가 생성된 블록의 해시입니다. 보류 중인 경우 `null`을 반환합니다.                                                                                                                                                                                                           |
| blockNumber      | QUANTITY      | 로그가 속한 블록의 번호입니다. 보류 중인 경우 `null`을 반환합니다.                                                                                                                                                                                                            |
| address          | 20바이트 크기 DATA | 로그를 발생시킨 주소입니다.                                                                                                                                                                                                                                      |
| data             | DATA          | 로그 중 인덱스화되지 않은 인수를 담고 있습니다.                                                                                                                                                                                                                          |
| topics           | DATA 배열       | 길이가 0부터 4까지인 배열로, 배열의 각 원소는 32바이트 크기 DATA 형태의 인덱스화된 로그 인수들입니다. (In Solidity: The first topic is the hash of the signature of the event (*e.g.*, `Deposit(address,bytes32,uint256)`), except you declared the event with the `anonymous` specifier.). |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getFilterChanges","params":["0x16"],"id":73}' http://localhost:8551

// Result
{
    "id":1,
    "jsonrpc":"2.0",
    "result": [{
    "logIndex": "0x1", // 1
    "blockNumber":"0x1b4", // 436
    "blockHash": "0x8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcfdf829c5a142f1fccd7d",
    "transactionHash":  "0xdf829c5a142f1fccd7d8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcf",
    "transactionIndex": "0x0", // 0
    "address": "0x16c5785ac562ff41e2dcfdf829c5a142f1fccd7d",
    "data":"0x0000000000000000000000000000000000000000000000000000000000000000",
    "topics": ["0x59ebeb90bc63057b6515673c3ecf9438e5058bca0f92585014eced636878c9a5"]
    },{
        ...
    }]
}
```


## klay_getFilterLogs <a id="klay_getfilterlogs"></a>

Returns an array of all logs matching filter with given id, which has been obtained using [klay_newFilter](#klay_newfilter).  Note that filter ids returned by other filter creation functions, such as [klay_newBlockFilter](#klay_newblockfilter) or [klay_newPendingTransactionFilter](#klay_newpendingtransactionfilter), cannot be used with this function.

**매개변수**

| 명칭       | 형식  | 설명        |
| -------- | --- | --------- |
| QUANTITY | 문자열 | 필터 ID입니다. |

**리턴값**

See [klay_getFilterChanges](#klay_getfilterchanges)

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getFilterLogs","params":["0xd32fd16b6906e67f6e2b65dcf48fc272"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":[{
      "address":"0x87ac99835e67168d4f9a40580f8f5c33550ba88b",
      "topics":["0xd596fdad182d29130ce218f4c1590c4b5ede105bee36690727baa6592bd2bfc8"],
      "data":"0x0000000000000000000000000000000000000000000000000000000000000064000000000000000000000000000000000000000000000000000000000000007b",
      "blockNumber":"0x54",
      "transactionHash":"0xcd4703cd62bd930d4652999bce8dcb75b7ade49d922fa42dc11e568c52a5fa6f",
      "transactionIndex":"0x0",
      "blockHash":"0x9a49f30f1d1876ff3913bd0aa58f328822e7a369cb13e0640b82234f26e781bb",
      "logIndex":"0x0",
      "removed":false
  }]
}
```


## klay_getLogs <a id="klay_getlogs"></a>

입력으로 받은 필터 객체와 일치하는 모든 로그를 배열 형태로 반환합니다.

**매개변수**

`객체` - 필터 객체를 구성하는 옵션은 다음과 같습니다.

| 명칭        | 형식                        | 설명                                                                                                                                                                                                                                           |
| --------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fromBlock | QUANTITY &#124; TAG       | (optional, default: `"latest"`) Integer block number, or `"latest"` for the last mined block or `"pending"`, `"earliest"` for not yet mined transactions.                                                                                    |
| toBlock   | QUANTITY &#124; TAG       | (optional, default: `"latest"`) Integer block number, or `"latest"` for the last mined block or `"pending"`, `"earliest"` for not yet mined transactions.                                                                                    |
| address   | 20-byte DATA &#124; Array | (optional) Contract address or a list of addresses from which logs should originate.                                                                                                                                                         |
| topics    | DATA 배열                   | (optional) Array of 32-byte DATA topics. 토픽은 순서에 따라 다릅니다. 각 토픽은 “or” 옵션과 함께 DATA 배열이 될 수도 있습니다.                                                                                                                                              |
| blockHash | 32바이트 크기 DATA             | (optional) A filter option that restricts the logs returned to the single block with the 32-byte hash blockHash. blockHash를 사용하면, blockHash로 지정한 블록의 번호가 fromBlock, toBlock과 같아집니다. 따라서 필터 기준에 blockHash가 있으면 fromBlock과 toBlock이 허용되지 않습니다. |

**리턴값**

See [klay_getFilterChanges](#klay_getfilterchanges)

**예제**

```shell
// Request
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getLogs","params":[{"fromBlock":"0x1","toBlock":"latest","address":"0x87ac99835e67168d4f9a40580f8f5c33550ba88b"}],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":[
    {
      "address":"0x87ac99835e67168d4f9a40580f8f5c33550ba88b",
      "topics":["0xfa9b2165fc71c1d6ffa03291c7f5d223ea363ec063d747eec9ce2d30d24855ef"],
      "data":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000060000000000000000000000000d3564e57bb5c6f4d983a493a946534f8e1e8b481000000000000000000000000000000000000000000000000000000000000001341646472657373426f6f6b436f6e747261637400000000000000000000000000",
      "blockNumber":"0xd3b5",
      "transactionHash":"0x57ca8ff0a0d454d4c5418694c21bc4ef3de26cf7cd18dd404d6a7189a826bfe0",
      "transactionIndex":"0x0",
      "blockHash":"0x279251a907c6ab1fb723595511ff401432e7c2437d54189298f53a7d33ce3a60",
      "logIndex":"0x0",
      "removed":false
    },
    {
      "address":"0x87ac99835e67168d4f9a40580f8f5c33550ba88b",
      "topics":["0xfa3e1e272694072320aad73a3fadd8876c4bf8f40899c6c7ce2fda9f4e652cfa"],
      "data":"0x00000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000300000000000000000000000041383b6ee0ea5108d6b139165a9c85351aacd39800000000000000000000000057f7439898e652fa9b5654022297588532e5e0370000000000000000000000005b5b7a718a4124eb746ae00b1ce6edcaa5ab55bc",
      "blockNumber":"0xd3b5",
      "transactionHash":"0x57ca8ff0a0d454d4c5418694c21bc4ef3de26cf7cd18dd404d6a7189a826bfe0",
      "transactionIndex":"0x0",
      "blockHash":"0x279251a907c6ab1fb723595511ff401432e7c2437d54189298f53a7d33ce3a60",
      "logIndex":"0x1",
      "removed":false
    },
    {
      "address":"0x87ac99835e67168d4f9a40580f8f5c33550ba88b",
      "topics":["0xc7b359b1e189b7d721be7f0765a8d745be718566b8e67cbd2728dae5d6fd64b6"],
      "data":"0x000000000000000000000000d3564e57bb5c6f4d983a493a946534f8e1e8b481000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000003000000000000000000000000286d09b578d6126e09296dfe6c775ea7d0cf06e9000000000000000000000000860350f6d774efd16046335c388b832b910d3f8c00000000000000000000000061a7cbdd597848494fa85cbb76f9c63ad9c06cad",
      "blockNumber":"0x14d96",
      "transactionHash":"0x73282602d2f908180f47e3c8673f41c0899cbbb2d606976c2f77188ffa57d6e7",
      "transactionIndex":"0x0",
      "blockHash":"0xa5268a093cd5df7eccde18217a7019a35ab761088312027af16682aafa704ee3",
      "logIndex":"0x1",
      "removed":false
    },
    {
      "address":"0x87ac99835e67168d4f9a40580f8f5c33550ba88b",
      "topics":["0xc7b359b1e189b7d721be7f0765a8d745be718566b8e67cbd2728dae5d6fd64b6"],
      "data":"0x000000000000000000000000d3564e57bb5c6f4d983a493a946534f8e1e8b4810000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000030000000000000000000000002f91d1b79dd06da1b622122d61e05e64562de61e0000000000000000000000006e76e0ce76dfba55060400144318d4821a58510600000000000000000000000031b93ca83b5ad17582e886c400667c6f698b8ccd",
      "blockNumber":"0x14e4e",
      "transactionHash":"0xf9d86ed451d67abc68c517f7fa0e0a7a8e3dedec23f56febda2b7f52d35185b6",
      "transactionIndex":"0x0",
      "blockHash":"0x7ddf4a0a203d40afc1706aa24b787da601e1bce326319349d0eeef6c41656fa5",
      "logIndex":"0x1",
      "removed":false
    }
  ]
}
```

```shell
// Request
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getLogs","params":[{"fromBlock":"earliest","toBlock":"latest","topics":["0xc7b359b1e189b7d721be7f0765a8d745be718566b8e67cbd2728dae5d6fd64b6"]}],"id":2}' http://localhost:8551

// Result
{
  "jsonrpc":"2.0",
  "id":2,
  "result":[
    {
      "address":"0x87ac99835e67168d4f9a40580f8f5c33550ba88b",
      "topics":["0xc7b359b1e189b7d721be7f0765a8d745be718566b8e67cbd2728dae5d6fd64b6"],
      "data":"0x000000000000000000000000d3564e57bb5c6f4d983a493a946534f8e1e8b481000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000003000000000000000000000000286d09b578d6126e09296dfe6c775ea7d0cf06e9000000000000000000000000860350f6d774efd16046335c388b832b910d3f8c00000000000000000000000061a7cbdd597848494fa85cbb76f9c63ad9c06cad",
      "blockNumber":"0x14d96",
      "transactionHash":"0x73282602d2f908180f47e3c8673f41c0899cbbb2d606976c2f77188ffa57d6e7",
      "transactionIndex":"0x0",
      "blockHash":"0xa5268a093cd5df7eccde18217a7019a35ab761088312027af16682aafa704ee3",
      "logIndex":"0x1",
      "removed":false
    },
    {
      "address":"0x87ac99835e67168d4f9a40580f8f5c33550ba88b",
      "topics":["0xc7b359b1e189b7d721be7f0765a8d745be718566b8e67cbd2728dae5d6fd64b6"],
      "data":"0x000000000000000000000000d3564e57bb5c6f4d983a493a946534f8e1e8b4810000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000030000000000000000000000002f91d1b79dd06da1b622122d61e05e64562de61e0000000000000000000000006e76e0ce76dfba55060400144318d4821a58510600000000000000000000000031b93ca83b5ad17582e886c400667c6f698b8ccd",
      "blockNumber":"0x14e4e",
      "transactionHash":"0xf9d86ed451d67abc68c517f7fa0e0a7a8e3dedec23f56febda2b7f52d35185b6",
      "transactionIndex":"0x0",
      "blockHash":"0x7ddf4a0a203d40afc1706aa24b787da601e1bce326319349d0eeef6c41656fa5",
      "logIndex":"0x1",
      "removed":false
    },
    {
      "address":"0x87ac99835e67168d4f9a40580f8f5c33550ba88b",
      "topics":["0xc7b359b1e189b7d721be7f0765a8d745be718566b8e67cbd2728dae5d6fd64b6"],
      "data":"0x000000000000000000000000d3564e57bb5c6f4d983a493a946534f8e1e8b481000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000003000000000000000000000000a2b1264624c92257dd8e7f0cac42d451061d1510000000000000000000000000b381ee81e319e5ec48f42d0b47b5e4361c9a6f740000000000000000000000003855407fa65c4c5104648b3a9e495072df62b585",
      "blockNumber":"0x14f38",
      "transactionHash":"0xc8f8c637ea9fcbe71e23fe0779b59fb10173e8c4fd7e49bce3cce76ff67d353d",
      "transactionIndex":"0x0",
      "blockHash":"0xb1717038e443f517bd7a8c37b66fb731fed573f5fa5486ebbbb5e4c9060be50b",
      "logIndex":"0x1",
      "removed":false
    },
    {
      "address":"0x87ac99835e67168d4f9a40580f8f5c33550ba88b",
      "topics":["0xc7b359b1e189b7d721be7f0765a8d745be718566b8e67cbd2728dae5d6fd64b6"],
      "data":"0x000000000000000000000000d3564e57bb5c6f4d983a493a946534f8e1e8b4810000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000030000000000000000000000009dd579f23912665b956b0cd50387b29a62052732000000000000000000000000c98a86af2eca2989c0cb2a2b8d4bb841f11e94ab000000000000000000000000f65e07b6626ab43ecea744803fa46bd4a89bfdb6",
      "blockNumber":"0x14fe7",
      "transactionHash":"0x14da1883bb2aae487ce1cb93cd39bc9bb802adbba083f337051877358150ab3f",
      "transactionIndex":"0x0",
      "blockHash":"0xcd820189f00e9a6faaea7313437b92114e69bd32e18b4a28e7763117716c6fa9",
      "logIndex":"0x1",
      "removed":false
    }
  ]
}
```


## klay_newBlockFilter <a id="klay_newblockfilter"></a>

노드에 필터를 생성하여 새로운 블록이 도착하였음을 알립니다. To check if the state has changed, call [klay_getFilterChanges](#klay_getfilterchanges).

**매개변수**

없음

**리턴값**

| 형식       | 설명        |
| -------- | --------- |
| QUANTITY | 필터 ID입니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_newBlockFilter","params":[],"id":73}' http://localhost:8551

// Result
{
  "jsonrpc":"2.0",
  "id":73,
  "result":"0xc2f2e8168a7e38b5d979d0f7084130ee"
}
```


## klay_newFilter <a id="klay_newfilter"></a>

Creates a filter object, based on filter options, to notify when the state changes (logs).
- To check if the state has changed, call [klay_getFilterChanges](#klay_getfilterchanges).
- To obtain all logs matching the filter created by `klay_newFilter`, call [klay_getFilterLogs](#klay_getfilterlogs).

**A note on specifying topic filters:** Topics are order-dependent. `[A, B]`인 토픽인 로그가 있는 트랜잭션은 다음 토픽 필터에 대응됩니다.
* `[]` "조건 없음"
* `[A]` "A in first position (and anything after)"
* `[null, B]` "anything in first position AND B in second position (and anything after)"
* `[A, B]` "A in first position AND B in second position (and anything after)"
* `[[A, B], [A, B]]` "(A OR B) in first position AND (A OR B) in second position (and anything after)"

**매개변수**

`객체` - 필터 객체를 구성하는 옵션은 다음과 같습니다.

| 명칭        | 형식                        | 설명                                                                                                                                                        |
| --------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fromBlock | QUANTITY &#124; TAG       | (optional, default: `"latest"`) Integer block number, or `"latest"` for the last mined block or `"pending"`, `"earliest"` for not yet mined transactions. |
| toBlock   | QUANTITY &#124; TAG       | (optional, default: `"latest"`) Integer block number, or `"latest"` for the last mined block or `"pending"`, `"earliest"` for not yet mined transactions. |
| address   | 20-byte DATA &#124; Array | (optional) Contract address or a list of addresses from which logs should originate.                                                                      |
| topics    | DATA 배열                   | (optional) Array of 32-byte DATA topics. 토픽은 순서에 따라 다릅니다. 각 토픽은 “or” 옵션과 함께 DATA 배열이 될 수도 있습니다.                                                           |

**리턴값**

| 형식       | 설명       |
| -------- | -------- |
| QUANTITY | 필터 ID입니다 |

**예시**

```shell
// Request
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_newFilter","params":[{"fromBlock":"earliest","toBlock":"latest","address":"0x87ac99835e67168d4f9a40580f8f5c33550ba88b","topics":["0xd596fdad182d29130ce218f4c1590c4b5ede105bee36690727baa6592bd2bfc8"]}],"id":1}' http://localhost:8551

// Result
{"jsonrpc":"2.0","id":1,"result":"0xd32fd16b6906e67f6e2b65dcf48fc272"}
```


## klay_newPendingTransactionFilter <a id="klay_newpendingtransactionfilter"></a>

노드에 필터를 생성하여 보류 상태인 새로운 트랜잭션이 도착하였음을 알립니다. To check if the state has changed, call [klay_getFilterChanges](#klay_getfilterchanges).

**매개변수**

없음

**리턴값**

| 형식       | 설명        |
| -------- | --------- |
| QUANTITY | 필터 ID입니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_newPendingTransactionFilter","params":[],"id":73}' http://localhost:8551

// Result
{
  "jsonrpc":"2.0",
  "id":73,
  "result":"0x90cec22a723fcc725fb2462733c2880f"
}
```


## klay_uninstallFilter <a id="klay_uninstallfilter"></a>

입력으로 받은 ID를 가진 필터를 제거합니다. 더는 모니터링을 하지 않으면 호출해야 합니다. Additionally, filters timeout when they are not requested with [klay_getFilterChanges](#klay_getfilterchanges) for a period of time.

**매개변수**

| 명칭 | 형식       | 설명        |
| -- | -------- | --------- |
| 필터 | QUANTITY | 필터 ID입니다. |

**리턴값**

| 형식      | 설명                                                   |
| ------- | ---------------------------------------------------- |
| Boolean | 필터가 성공적으로 제거되면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_uninstallFilter","params":["0xb"],"id":73}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": true
}
```
