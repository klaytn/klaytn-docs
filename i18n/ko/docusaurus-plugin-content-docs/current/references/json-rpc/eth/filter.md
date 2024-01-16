# Filter

## getFilterChanges <a id="getfilterchanges"></a>

필터에 대한 폴링 메서드로, 마지막 폴링 이후의 로그 배열을 반환합니다.

**매개변수**

| 이름 | String   | 설명                                            |
| -- | -------- | --------------------------------------------- |
| id | QUANTITY | 필터 ID(_예:_, "0x16" // 22). |

**리턴 값**

`Promise`은 `Array` - 로그 객체의 배열을 반환하거나, 마지막 폴링 이후 변경된 사항이 없는 경우 빈 배열을 반환합니다.

- [klay_newBlockFilter](#klay_newblockfilter)로 생성된 필터의 경우, 반환값은 블록 해시(32-byte DATA)입니다.
- caver.klay.newPendingTransactionFilter([callback])
- [klay_newFilter](#klay_newfilter)로 생성된 필터의 경우, 로그는 다음과 같은 파라미터를 가진 객체입니다:

| 이름               | 유형           | Function                                                                                                                                               |
| ---------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| removed          | TAG          | `true` 체인 재구성으로 인해 로그가 제거된 경우. 유효한 로그인 경우 `false`.                                                                                                     |
| logIndex         | QUANTITY     | 블록에서 로그 인덱스 위치의 정수입니다. 보류 중인 로그인 경우 `null`.                                                                                                            |
| transactionIndex | QUANTITY     | 이벤트가 생성된 트랜잭션의 인덱스 위치의 정수입니다. 보류 중일 때는 `null`입니다.                                                                                                      |
| transactionHash  | 32-byte DATA | 이 로그가 생성된 트랜잭션의 해시입니다. 보류 중일 때는 `null`입니다.                                                                                                             |
| blockHash        | 32-byte DATA | 이 로그가 있는 블록의 해시입니다. 보류 중일 때는 `null`입니다.                                                                                                                |
| blockNumber      | QUANTITY     | 이 로그가 있던 블록 번호입니다. 아직 보류 중이면 `null`입니다.                                                                                                                |
| address          | 20-byte DATA | 이 로그가 발생한 주소.                                                                                                                                          |
| data             | DATA         | 로그의 인덱싱되지 않은 인수를 포함합니다.                                                                                                                                |
| topics           | Array        | 인덱싱된 로그 인수의 0\~4개 32-byte DATA 배열. (Solidity에서: 첫 번째 토픽은 이벤트 서명의 해시입니다(\*예: `Deposit(address,bytes32,uint256)`). |

_예:,_ `[null, ['option1', 'option2']]`.

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getFilterChanges","params":["0x16"],"id":73}' https://public-en-baobab.klaytn.net

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

## getFilterLogs <a id="getfilterlogs"></a>

주어진 아이디로 필터와 일치하는 모든 로그의 배열을 반환합니다.  [newBlockFilter](#newblockfilter) 또는 [newPendingTransactionFilter](#newpendingtransactionfilter)와 같은 다른 필터 생성 함수가 반환하는 필터 ID는 이 함수와 함께 사용할 수 없습니다.

클레이튼 노드의 리소스를 안전하게 관리하기 위해 두 가지 노드 설정으로 이 API의 실행을 제한할 수 있습니다.

- 단일 쿼리에서 반환되는 최대 결과 수 (기본값: 10,000개).
- 단일 쿼리의 실행 시간 제한 (기본값: 10초).

**매개변수**

| 이름 | String   | 설명       |
| -- | -------- | -------- |
| id | QUANTITY | filterId |

**리턴 값**

[getFilterChanges](#getfilterchanges)을 참조하세요.

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getFilterLogs","params":["0xd32fd16b6906e67f6e2b65dcf48fc272"],"id":1}' https://public-en-baobab.klaytn.net

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

## getPastLogs <a id="getpastlogs"></a>

`Promise`는 `Array` - 로그 객체의 배열을 반환합니다.

클레이튼 노드의 리소스를 안전하게 관리하기 위해 두 가지 노드 설정으로 이 API의 실행을 제한할 수 있습니다.

- 단일 쿼리에서 반환되는 최대 결과 수 (기본값: 10,000개).
- 단일 쿼리의 실행 시간 제한 (기본값: 10초).

Number | String

필터 옵션입니다.

| 이름                | 유형              | 설명                                                                                                                                                                                                             |
| ----------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options.fromBlock | QUANTITY \| TAG | (선택 사항, 기본값: `"latest"`) 정수 또는 16진수 블록 번호 또는 [기본 블록 매개변수](block.md#the-default-block-parameter)에서와 같이 `"earliest"`, `"latest"` 또는 `pending` 문자열입니다.                                         |
| options.toBlock   | QUANTITY \| TAG | (선택 사항, 기본값: `"latest"`) 정수 또는 16진수 블록 번호 또는 [기본 블록 매개변수](block.md#the-default-block-parameter)에 있는 `earliest`, `latest` 또는 `pending` 문자열입니다.                                               |
| address           | String \| Array | (선택 사항) 지정된 컨트랙트 내에서 생성된 로그를 가져올 주소 또는 주소 목록입니다.                                                                                                                                            |
| topics            | Array           | (선택 사항) 32바이트 데이터 토픽 배열입니다. 토픽은 순서에 따라 달라집니다. 각 토픽은 "또는" 옵션이 있는 DATA 배열일 수도 있습니다.                                                                                                           |
| blockHash         | 32-byte DATA    | (선택 사항) 반환되는 로그를 32바이트 해시 블록Hash를 사용하여 단일 블록으로 제한하는 필터 옵션입니다. 블록해시를 사용하는 것은 블록해시가 블록해시인 블록 번호를 fromBlock = toBlock으로 사용하는 것과 동일합니다. 필터 조건에 blockHash가 있으면 fromBlock이나 toBlock 모두 허용되지 않습니다. |

callback

caver.klay.getFilterChanges(filterId [, callback])

Object

```shell
"log_" 문자열에 `keccak256(blockHash + transactionHash + logIndex).substr(0, 8)`를 연결하여 만듭니다. > caver.klay.getFilterChanges('0xafb8e49bbcba9d61a3c616a3a312533e').then(console.log);
[ 
    { 
        address: '0x71e503935b7816757AA0314d4E7354dab9D39162',
        topics: [ '0xe8451a9161f9159bc887328b634789768bd596360ef07c5a5cbfb927c44051f9' ],
        data: '0x0000000000000000000000000000000000000000000000000000000000000001',
        blockNumber: 3525,
        transactionHash: '0x1b28e2c723e45a0d8978890598903f36a74397c9cea8531dc9762c39483e417f',
        transactionIndex: 0,
        blockHash: '0xb7f0bdaba93d3baaa01a5c24517da443207f774e0202f02c298e8e997a540b3d',
        logIndex: 0,
        id: 'log_c1ea867d'
    } 
] caver.klay.getFilterLogs(filterId [, callback]) 필터 객체는 [newFilter](#newfilter)를 사용하여 가져와야 합니다. callback Function (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. caver.klay.getPastLogs(options [, callback]) 주어진 옵션과 일치하는 과거 로그를 가져옵니다. options Object Number \| String (선택 사항) 로그를 가져올 가장 빠른 블록의 번호입니다. (``latest``은 가장 최근 블록을 의미합니다.) 기본값은 ``latest``입니다. (옵션) 로그를 가져올 마지막 블록의 번호입니다. (`latest`은 가장 최근 블록을 의미합니다.) 기본값은 ``latest``입니다. options.address 특정 계정과 관련된 로그만 반환됩니다. options.topics (선택 사항) 로그 항목에 표시되어야 하는 값의 배열입니다. 순서가 중요합니다. 토픽을 생략하려면 `null`, *예:*, `[null, '0x12...']`을 사용하세요. 각 주제에 대한 옵션이 포함된 배열을 전달할 수도 있습니다(예:,* `[null, ['option1', 'option2']]`). callback Function (선택 사항) 선택적 콜백으로, 첫 번째 매개 변수로 오류 개체를 반환하고 두 번째 매개 변수로 결과를 반환합니다. ``Array``에서에서 반환된 이벤트 ``Object``의 구조는 다음과 같습니다: String 이 이벤트가 발생한 곳입니다. String 인덱싱되지 않은 로그 매개변수가 포함된 데이터입니다. 최대 4개의 32바이트 주제가 있는 배열로, 주제 1~3에는 인덱싱된 로그 매개 변수가 포함되어 있습니다. Number 블록에서 이벤트 인덱스 위치의 정수입니다. Number 32-byte String 이 이벤트가 생성된 트랜잭션의 해시입니다. 32-byte String 이 이벤트가 생성된 블록의 해시입니다. Number 이 로그가 생성된 블록 번호입니다. 아직 보류 중이면 ``null``입니다. "log_" 문자열에 `keccak256(blockHash + transactionHash + logIndex).substr(0, 8)`를 연결하여 만듭니다.
```

```shell
> caver.klay.getPastLogs({
    address: "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe",
    topics: ["0x033456732123ffff2342342dd12342434324234234fd234fd23fd4f23d4234"]
})
.then(console.log);

[{
    data: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
    topics: ['0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7', '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385']
    logIndex: 0,
    transactionIndex: 0,
    transactionHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
    blockHash: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    blockNumber: 1234,
    address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe',
    id: 'log_124d61bc',
},{...}]
```

## newBlockFilter <a id="newblockfilter"></a>

노드에 필터를 생성하여 새로운 블록 도착에 대한 정보를 수신합니다.
상태가 변경되었는지 확인하려면 [getFilterChanges](#getfilterchanges)를 호출하세요.

**매개변수**

없음

**리턴 값**

| 유형       | 설명         |
| -------- | ---------- |
| QUANTITY | 필터 아이디입니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_newBlockFilter","params":[],"id":73}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc":"2.0",
  "id":73,
  "result":"0xc2f2e8168a7e38b5d979d0f7084130ee"
}
```

## newFilter <a id="newfilter"></a>

주어진 필터 옵션을 사용하여 특정 상태 변경(로그)을 수신하는 필터 객체를 생성합니다.

- 상태가 변경되었는지 확인하려면 [getFilterChanges](#getfilterchanges)를 호출하세요.
- `newFilter`에 의해 생성된 필터와 일치하는 모든 로그를 가져오려면, [getFilterLogs](#getfilterlogs)를 호출합니다.

\*\*토픽 필터 지정 시 참고 사항: \*\*주제 필터 지정 시 참고 사항
토픽은 순서에 따라 달라집니다. 토픽이 `[A, B]`인 로그가 있는 트랜잭션은 다음 토픽 필터에 의해 일치됩니다:

- `[]` "아무거나"
- `[A]` "첫 번째 위치의 A(및 그 이후의 모든 것)".
- `[null, B]` "첫 번째 위치의 모든 항목과 두 번째 위치의 B(및 그 이후의 모든 항목)"
- `[A, B]` "첫 번째 위치의 A와 두 번째 위치의 B(및 그 이후의 모든 것)"
- `[[A, B]], [A, B]]` "(A 또는 B) 첫 번째 위치 AND (A 또는 B) 두 번째 위치(및 그 이후 모든 것)"

**매개변수**

필터 옵션입니다.

| 이름                | 유형              | 설명                                                                                                                                                                      |
| ----------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options.fromBlock | QUANTITY \| TAG | (선택 사항, 기본값: `"latest"`) 정수 또는 16진수 블록 번호 또는 [기본 블록 매개변수](block.md#the-default-block-parameter)에서와 같이 `"earliest"`, `"latest"` 또는 `pending` 문자열입니다.  |
| options.toBlock   | QUANTITY \| TAG | (선택 사항, 기본값: `"latest"`) 정수 또는 16진수 블록 번호 또는 [기본 블록 매개 변수](block.md#the-default-block-parameter)에 있는 `"earliest"`, `"latest"` 또는 `"pending"` 문자열입니다. |
| address           | String \| Array | (선택 사항) 주소 또는 주소 목록입니다.                                                                                                                              |
| topics            | DATA Array      | (선택 사항) 32바이트 데이터 토픽 배열입니다. 토픽은 순서에 따라 달라집니다. 각 토픽은 "또는" 옵션이 있는 DATA 배열일 수도 있습니다.                                                                    |

:::note

참고: Klaytn v1.7.0 이전 버전에서는 정수 블록 번호, 문자열 `"earliest"` 및 `"latest"`만 사용할 수 있습니다.

:::

**리턴 값**

| 유형       | 설명       |
| -------- | -------- |
| QUANTITY | filterId |

**예시**

```shell
// Request
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_newFilter","params":[{"fromBlock":"earliest","toBlock":"latest","address":"0x87ac99835e67168d4f9a40580f8f5c33550ba88b","topics":["0xd596fdad182d29130ce218f4c1590c4b5ede105bee36690727baa6592bd2bfc8"]}],"id":1}' https://public-en-baobab.klaytn.net

// Result
{"jsonrpc":"2.0","id":1,"result":"0xd32fd16b6906e67f6e2b65dcf48fc272"}
```

## 새로운 보류 중인 트랜잭션 필터 <a id="newpendingtransactionfilter"></a>

노드에 필터를 생성하여 새로운 보류 중인 트랜잭션 도착에 대한 정보를 수신합니다.
상태가 변경되었는지 확인하려면 [getFilterChanges](#getfilterchanges)를 호출합니다.

**매개변수**

없음

callback

| 유형       | 이름         |
| -------- | ---------- |
| QUANTITY | 필터 아이디입니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_newPendingTransactionFilter","params":[],"id":73}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc":"2.0",
  "id":73,
  "result":"0x90cec22a723fcc725fb2462733c2880f"
}
```

## klay_subscribe <a id="klay_subscribe"></a>

웹소켓을 통한 RPC Pub/Sub 또는 HTTP를 통한 필터를 사용하여 특정 이벤트에 대한 새 구독을 생성합니다.
이를 통해 클라이언트는 이벤트를 폴링하는 대신 이벤트를 기다릴 수 있습니다.

노드는 생성된 각 구독에 대한 구독 ID를 반환합니다.
구독과 일치하는 각 이벤트에 대해 관련 데이터가 포함된 알림이 구독 ID와 함께 전송됩니다.
연결이 닫히면 해당 연결을 통해 만들어진 모든 구독이 제거됩니다.

Number | String

`Object` - 알림 유형: `"newHeads"` 또는 `"logs"`.

`"newHeads"`는 블록체인에 추가된 각 블록을 알려줍니다.
`"logs"`는 새 블록에 포함된 로그를 알려줍니다. 이 유형은 필터 옵션을 지정하는 두 번째 매개변수가 필요합니다. 자세한 내용은 [klay_newFilter > 매개변수](#klay_newfilter)를 참조하세요.

**리턴 값**

| 유형       | 설명                                                                |
| -------- | ----------------------------------------------------------------- |
| QUANTITY | 구독이 생성될 때의 구독 ID입니다. 구독과 일치하는 각 이벤트에 대해 관련 데이터가 포함된 알림이 함께 전달됩니다. |

**예시**

이 API는 웹소켓 도구인 [`wscat`](https://www.npmjs.com/package/wscat)과 함께 사용하기에 적합합니다.

```shell
// Request
wscat -c http://localhost:8552
> {"jsonrpc":"2.0", "id": 1, "method": "klay_subscribe", "params": ["newHeads"]}

// Result
< {"jsonrpc":"2.0","id":1,"result":"0x48bb6cb35d6ccab6eb2b4799f794c312"}
< {"jsonrpc":"2.0","method":"klay_subscription","params":{"subscription":"0x48bb6cb35d6ccab6eb2b4799f794c312","result":{"parentHash":"0xc39755b6ac01d1e8c58b1088e416204f7af5b6b66bfb4f474523292acbaa7d57","reward":"0x2b2a7a1d29a203f60e0a964fc64231265a49cd97","stateRoot":"0x12aa1d3ab0440d844c28fbc6f89d26082f39a8435b512fa487ff55c2056aceb3","number":"0x303bea4”, ... ... }}}
```

```shell
> caver.klay.getFilterLogs('0xcac08a7fc32fc625a519644187e9f690').then(console.log);
[
    {
        address: '0x55384B52a9E5091B6012717197887dd3B5779Df3',
        topics: [ '0xe8451a9161f9159bc887328b634789768bd596360ef07c5a5cbfb927c44051f9' ],
        data: '0x0000000000000000000000000000000000000000000000000000000000000001',
        blockNumber: 7217,
        transactionHash: '0xa7436c54e47dafbce696de65f6e890c96ac22c236f50ca1be28b9b568034c3b3',
        transactionIndex: 0,
        blockHash: '0xe4f27c524dacfaaccb36735deccee69b3d6c315e969779784c36bb8e14b89e01',
        logIndex: 0,
        id: 'log_2dd695a8' 
    }
]
```

## uninstallFilter <a id="uninstallfilter"></a>

주어진 아이디로 필터를 제거합니다. 감시가 더 이상 필요하지 않을 때 항상 호출해야 합니다.
노드에 설정된 시간 제한 값보다 더 오랫동안 [getFilterChanges](#getfilterchanges)를 통해 필터가 호출되지 않으면 필터가 제거됩니다.

**매개변수**

| 이름       | 유형       | 이름         |
| -------- | -------- | ---------- |
| filterId | QUANTITY | 필터 아이디입니다. |

**리턴 값**

| 유형   | 설명                                                                          |
| ---- | --------------------------------------------------------------------------- |
| bool | `Promise`는 필터가 성공적으로 제거되면 `boolean` - `true`을 반환하고, 그렇지 않으면 `false`을 반환합니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_uninstallFilter","params":["0xb"],"id":73}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": true
}
```

## klay_unsubscribe <a id="klay_unsubscribe"></a>

웹소켓을 통한 RPC Pub/Sub 또는 HTTP를 통한 필터를 사용하여 특정 구독 ID로 구독을 취소합니다.
구독을 생성한 연결만 구독을 취소할 수 있습니다.

**매개변수**

| String   | 설명         |
| -------- | ---------- |
| QUANTITY | 로그 식별자입니다. |

**리턴 값**

| String | 이름                                         |
| ------ | ------------------------------------------ |
| bool   | 구독이 성공적으로 취소되면 `true`, 그렇지 않으면 `false`입니다. |

**예시**

이 API는 웹소켓 도구인 [`wscat`](https://www.npmjs.com/package/wscat)과 함께 사용하기에 적합합니다.

```shell
// Request
> {"jsonrpc":"2.0", "id": 1, "method": "klay_unsubscribe", "params": ["0xab8ac7a4045025d0c2807d63060eea6d"]}

// Result
< {"jsonrpc":"2.0","id":1,"result":true}
```
