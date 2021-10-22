## klay_getFilterChanges <a id="klay_getfilterchanges"></a>

필터에 대한 폴링 방법으로, 최근 폴링 이후 발생한 로그를 배열의 형태로 반환합니다.

**매개변수**

| 이름       | 타입     | 설명                               |
| -------- | ------ | -------------------------------- |
| QUANTITY | string | 필터 ID(*예를 들어*, "0x16" // 22)입니다. |

**리턴값**

`배열` - 로그 객체의 배열을 반환하거나 또는 최근 폴링 이후 변화가 없는 경우 빈 배열을 반환합니다.
- [klay_newBlockFilter](#klay_newblockfilter)로 생성된 필터의 경우 블록 해시(32바이트 크기의 DATA)를 반환합니다. *예*. `["0x3454645634534..."]`.
- [klay_newPendingTransactionFilter](#klay_newpendingtransactionfilter)로 생성된 필터의 경우 트랜잭션 해시(32바이트 크기의 DATA)를 반환합니다. *예*. `["0x6345343454645..."]`.
- [klay_newFilter](#klay_newfilter)로 생성된 필터의 경우 로그는 다음의 매개변수들을 가지는 객체입니다.

| 이름               | 타입            | 설명                                                                                                                                                                              |
| ---------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| removed          | TAG           | 체인 재구성으로 로그가 제거된 경우 `true`입니다. 유효한 로그이면 `false`입니다.                                                                                                                             |
| logIndex         | QUANTITY      | 블록에서 로그 인덱스 위치의 정숫값입니다. 보류 중인 로그인 경우 `null`을 반환합니다.                                                                                                                             |
| transactionIndex | QUANTITY      | 로그가 생성된 트랜잭션의 인덱스 위치의 정숫값입니다. 보류 중인 경우 `null`을 반환합니다.                                                                                                                           |
| transactionHash  | 32바이트 크기 DATA | 로그가 생성된 트랜잭션의 해시입니다. 보류 중인 경우 `null`을 반환합니다.                                                                                                                                    |
| blockHash        | 32바이트 크기 DATA | 로그가 생성된 블록의 해시입니다. 보류 중인 경우 `null`을 반환합니다.                                                                                                                                      |
| blockNumber      | QUANTITY      | 로그가 속한 블록의 번호입니다. 보류 중인 경우 `null`을 반환합니다.                                                                                                                                       |
| address          | 20바이트 크기 DATA | 로그를 발생시킨 주소입니다.                                                                                                                                                                 |
| data             | DATA          | 로그 중 인덱스화되지 않은 인수를 담고 있습니다.                                                                                                                                                     |
| topics           | DATA 배열       | 길이가 0부터 4까지인 배열로, 배열의 각 원소는 32바이트 크기 DATA 형태의 인덱스화된 로그 인수들입니다. (솔리디티의 경우 `anonymous` 지정자로 이벤트를 선언하지 않았다면 첫 번째 토픽은 이벤트에 대한 서명의 해시입니다. (*예*. `Deposit(address,bytes32,uint256)`)) |

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

입력된 필터 ID와 일치하는 모든 로그를 배열 형태로 반환합니다. 필터 ID는 [klay_newFilter](#klay_newfilter)를 통해 얻을 수 있습니다.  이때 [klay_newBlockFilter](#klay_newblockfilter), [klay_newPendingTransactionFilter](#klay_newpendingtransactionfilter)와 같은 다른 필터 생성 함수를 통해 얻은 필터 ID는 본 함수에 사용할 수 없습니다.

이 API의 실행은 Klaytn 노드 자원의 안전한 관리를 위해 2개로 제한될 수 있습니다.
- 한 번의 조회당 반환되는 최대 숫자 (기본값: 10.000)
- 한 번의 조회당 실행 시간 (기본값: 10초)

**매개변수**

| 이름       | 타입     | 설명        |
| -------- | ------ | --------- |
| QUANTITY | string | 필터 ID입니다. |

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

이 API의 실행은 Klaytn 노드 자원의 안전한 관리를 위해 2개로 제한될 수 있습니다.
- 한 번의 조회당 반환되는 최대 숫자 (기본값: 10.000)
- 한 번의 조회당 실행 시간 (기본값: 10초)

**매개변수**

`Object` - 필터 객체를 구성하는 옵션은 다음과 같습니다.

| 이름        | 타입                          | 설명                                                                                                                                                                                              |
| --------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fromBlock | QUANTITY &#124; TAG         | (optional, default: `"latest"`) Integer or hexadecimal block number, or the string `"earliest"` or `"latest"` as in the [default block parameter](block.md#the-default-block-parameter).        |
| toBlock   | QUANTITY &#124; TAG         | (optional, default: `"latest"`) Integer or hexadecimal block number, or the string `"earliest"` or `"latest"` as in the [default block parameter](block.md#the-default-block-parameter).        |
| address   | 20바이트 크기의 DATA &#124; Array | (선택 사항) 로그를 발생시킨 컨트랙트 주소 또는 주소들의 목록입니다.                                                                                                                                                         |
| topics    | DATA array                  | (선택 사항) 32바이트 크기 DATA 형태의 토픽으로 이루어진 배열입니다. 토픽은 순서에 따라 다릅니다. 각 토픽은 “or” 옵션과 함께 DATA 배열이 될 수도 있습니다.                                                                                               |
| blockHash | 32바이트 크기 DATA               | (선택 사항) 32바이트 길이의 해시 blockHash를 사용하여 단일 블록으로 반환된 로그를 제한하는 필터 옵션입니다. blockHash를 사용하면, blockHash로 지정한 블록의 번호가 fromBlock, toBlock과 같아집니다. 따라서 필터 기준에 blockHash가 있으면 fromBlock과 toBlock이 허용되지 않습니다. |

{% hint style="success" %}
NOTE: In versions earlier than Klaytn v1.7.0, only integer block number, the string `"earliest"` and `"latest"` are available.
{% endhint %}

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

노드에 필터를 생성하여 새로운 블록이 도착하였음을 알립니다. 상태가 변경되었는지 확인하려면 [klay_getFilterChanges](#klay_getfilterchanges)를 호출하세요.

**매개변수**

없음

**리턴값**

| 타입       | 설명        |
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
- 상태가 변경되었는지 확인하려면 [klay_getFilterChanges](#klay_getfilterchanges)를 호출하세요.
- `klay_newFilter`로 생성된 필터와 일치하는 모든 로그를 가져오려면 [klay_getFilterLogs](#klay_getfilterlogs)를 호출하세요.

**A note on specifying topic filters:** Topics are order-dependent. A transaction with a log with topics `[A, B]` will be matched by the following topic filters:
* `[]` "조건 없음"
* `[A]` "A가 첫 번째 위치에 있음 (이후에는 무엇이든 와도 됨)"
* `[null, B]` "첫 번째 위치에 어떤 것이 있으며 B가 두 번째 위치에 있음 (이후에는 무엇이든 있어도 됨)"
* `[A, B]` "A가 첫 번째 위치에 있으며 B가 두 번째 위치에 있음 (이후에는 무엇이든 있어도 됨)"
* `[[A, B], [A, B]]` "(A 또는 B)가 첫 번째 위치에 있으며 (A 또는 B)가 두 번째 위치에 있음 (이후에는 무엇이든 있어도 됨)"

**매개변수**

`Object` - 필터 객체를 구성하는 옵션은 다음과 같습니다.

| 이름        | 타입                          | 설명                                                                                                                                                                                       |
| --------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fromBlock | QUANTITY &#124; TAG         | (optional, default: `"latest"`) Integer or hexadecimal block number, or the string `"earliest"` or `"latest"` as in the [default block parameter](block.md#the-default-block-parameter). |
| toBlock   | QUANTITY &#124; TAG         | (optional, default: `"latest"`) Integer or hexadecimal block number, or the string `"earliest"` or `"latest"` as in the [default block parameter](block.md#the-default-block-parameter). |
| address   | 20바이트 크기의 DATA &#124; Array | (선택 사항) 로그를 발생시킨 컨트랙트 주소 또는 주소들의 목록입니다.                                                                                                                                                  |
| topics    | DATA array                  | (선택 사항) 32바이트 크기 DATA 형태의 토픽으로 이루어진 배열입니다. 토픽은 순서에 따라 다릅니다. 각 토픽은 “or” 옵션과 함께 DATA 배열이 될 수도 있습니다.                                                                                        |

{% hint style="success" %}
NOTE: In versions earlier than Klaytn v1.7.0, only integer block number, the string `"earliest"` and `"latest"` are available.
{% endhint %}

**리턴값**

| 타입       | 설명       |
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

Creates a filter in the node, to notify when new pending transactions arrive. 상태가 변경되었는지 확인하려면 [klay_getFilterChanges](#klay_getfilterchanges)를 호출하세요.

**매개변수**

없음

**리턴값**

| 타입       | 설명        |
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

## klay_subscribe <a id="klay_subscribe"></a>

Creates a new subscription to specific events by using either RPC Pub/Sub over WebSockets or filters over HTTP. It allows clients to wait for events instead of polling for them.

The node will return a subscription id for each subscription created. For each event that matches the subscription, a notification with relevant data is sent together with the subscription id. If a connection is closed, all subscriptions created over the connection are removed.

**매개변수**

`Object` - A notification type: `"newHeads"` or `"logs"`.


`"newHeads"` notifies you of each block added to the blockchain. `"logs"` notifies you of logs included in new blocks. This type requires a second parameter that specifies filter options. For more details, go to [klay_newFilter > parameters](https://docs.klaytn.com/bapp/json-rpc/api-references/klay/filter#klay_newfilter).

**리턴값**

| 타입       | 설명                                                                        |
| -------- | ------------------------------------------------------------------------- |
| QUANTITY | 구독이 생성될 때의 구독 ID입니다. 구독에 일치하는 모든 이벤트에 대해서는 관계된 데이터와 구독 ID를 포함한 알림이 전달됩니다. |


**예시**

This API is appropriate for use with a WebSocket tool, [`wscat`](https://www.npmjs.com/package/wscat).

```shell
// Request
wscat -c http://localhost:8552
> {"jsonrpc":"2.0", "id": 1, "method": "klay_subscribe", "params": ["newHeads"]}

// Result
< {"jsonrpc":"2.0","id":1,"result":"0x48bb6cb35d6ccab6eb2b4799f794c312"}
< {"jsonrpc":"2.0","method":"klay_subscription","params":{"subscription":"0x48bb6cb35d6ccab6eb2b4799f794c312","result":{"parentHash":"0xc39755b6ac01d1e8c58b1088e416204f7af5b6b66bfb4f474523292acbaa7d57","reward":"0x2b2a7a1d29a203f60e0a964fc64231265a49cd97","stateRoot":"0x12aa1d3ab0440d844c28fbc6f89d26082f39a8435b512fa487ff55c2056aceb3","number":"0x303bea4”, ... ... }}}
```

```shell
// Request
wscat -c http://localhost:8552
> {"jsonrpc":"2.0", "id": 1, "method": "klay_subscribe", "params": ["logs", {"fromBlock":"earliest","toBlock":"latest","address":"0x87ac99835e67168d4f9a40580f8f5c33550ba88b","topics":["0xd596fdad182d29130ce218f4c1590c4b5ede105bee36690727baa6592bd2bfc8"]}]}

// Result
< {"jsonrpc":"2.0","id":1,"result":"0xbdab16c8e4ae1b9e6930c78359de3e0e"}
< {"jsonrpc":"2.0","method":"klay_subscription","params":{"subscription":"0xbdab16c8e4ae1b9e6930c78359de3e0e","result":{"address":"0x2e4bb340e26caffb4073d7f1151f37d17524cdbc","topics":["0xb1a7310b1a46c788fcf30784cad70442d5232acaef480b0c094c76bee8d9c77d"],"data":"0x0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000d2588fe96a34c56a5d0a484cb603bc16fc5cdbbc","blockNumber":"0x3041201","transactionHash":"0xdacdebc77006fc566f65448524a0bc770056d8c7a05244bc7bfb2123b1bd398c","transactionIndex":"0x0","blockHash":"0x899b2dbfe96a34ce5d965dbcfcf39d072b4ce1097d479923e6b6355f3e2609ec","logIndex":"0x0","removed":false}}}
```


## klay_uninstallFilter <a id="klay_uninstallfilter"></a>

Uninstalls a filter with given id. Should always be called when watch is no longer needed. Additionally, filters timeout when they are not requested with [klay_getFilterChanges](#klay_getfilterchanges) for a period of time.

**매개변수**

| 이름     | 타입       | 설명        |
| ------ | -------- | --------- |
| filter | QUANTITY | 필터 ID입니다. |

**리턴값**

| 타입      | 설명                                                   |
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


## klay_unsubscribe <a id="klay_unsubscribe"></a>

Cancels the subscription with a specific subscription id by using either RPC Pub/Sub over WebSockets or filters over HTTP. Only the connection that created a subscription can unsubscribe from it.

**매개변수**

| 타입       | 설명        |
| -------- | --------- |
| QUANTITY | 구독 ID입니다. |

**리턴값**

| 타입      | 설명                                                   |
| ------- | ---------------------------------------------------- |
| Boolean | 구독이 성공적으로 취소되면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다. |


**예시**

This API is appropriate for use with a WebSocket tool, [`wscat`](https://www.npmjs.com/package/wscat).

```shell
// Request
> {"jsonrpc":"2.0", "id": 1, "method": "klay_unsubscribe", "params": ["0xab8ac7a4045025d0c2807d63060eea6d"]}

// Result
< {"jsonrpc":"2.0","id":1,"result":true}
```
