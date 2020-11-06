## getFilterChanges <a id="getfilterchanges"></a>

```javascript
caver.klay.getFilterChanges(filterId [, callback])
```

필터에 대한 폴링 방법으로, 마지막 폴링 이후 발생한 로그를 배열의 형태로 반환합니다.

**매개변수**

| 명칭       | 형식       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| filterId | String   | 필터 ID입니다.                                                            |
| callback | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`프로미스`는 `배열`을 반환합니다 - 로그 객체의 배열을 반환하거나 또는 최근 폴링 이후 변화가 없는 경우 빈 배열을 반환합니다.

`Array`에 담겨 반환된 로그 `Object`의 구조는 다음과 같습니다:

| 명칭               | 형식            | 설명                                                                                                                                                                                                                                                   |
| ---------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address          | 20바이트 크기 DATA | 로그를 발생시킨 주소입니다.                                                                                                                                                                                                                                      |
| topics           | DATA 배열       | 길이가 0부터 4까지인 배열로, 배열의 각 원소는 32바이트 크기 DATA 형태의 인덱스화된 로그 인수들입니다. (In Solidity: The first topic is the hash of the signature of the event (*e.g.*, `Deposit(address,bytes32,uint256)`), except you declared the event with the `anonymous` specifier.). |
| data             | DATA          | 로그 중 인덱스화되지 않은 인수를 담고 있습니다.                                                                                                                                                                                                                          |
| blockNumber      | QUANTITY      | 로그가 속한 블록의 번호입니다. 보류 중인 경우 `null`을 반환합니다.                                                                                                                                                                                                            |
| transactionHash  | 32바이트 크기 DATA | 이 로그를 생성한 트랜잭션의 해시입니다. 트랜잭션이 보류 상태이면 `null`입니다. 보류 상태란 트랜잭션이 실행되었지만 블록이 검증되지 않은 경계 조건(edge case)입니다.                                                                                                                                                 |
| transactionIndex | QUANTITY      | 정수. 이 로그를 생성한 트랜잭션의 인덱스입니다. 보류 중인 경우 `null`을 반환합니다.                                                                                                                                                                                                  |
| blockHash        | 32바이트 크기 DATA | 로그가 생성된 블록의 해시입니다. 보류 중인 경우 `null`을 반환합니다.                                                                                                                                                                                                           |
| logIndex         | QUANTITY      | 블록에서 로그 인덱스 위치의 정숫값입니다. 보류 중인 로그인 경우 `null`을 반환합니다.                                                                                                                                                                                                  |
| id               | String        | 로그 식별자. It is made by concatenating "log_" string with `keccak256(blockHash + transactionHash + logIndex).substr(0, 8)`                                                                                                                              |

**예시**

```javascript
> caver.klay.getFilterChanges('0xafb8e49bbcba9d61a3c616a3a312533e').then(console.log);
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
]
```

## getFilterLogs <a id="getfilterlogs"></a>

```javascript
caver.klay.getFilterLogs(filterId [, callback])
```

입력으로 받은 필터 ID값을 가진 필터 객체를 찾고, 이 필터 객체에 해당하는 모든 로그를 배열 형태로 반환합니다. The filter object should be obtained using [newFilter](#newfilter). Note that filter ids returned by other filter creation functions, such as [newBlockFilter](#newblockfilter) or [newPendingTransactionFilter](#newpendingtransactionfilter), cannot be used with this function.

**매개변수**

| 명칭       | 형식       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| filterId | String   | 필터 ID입니다.                                                            |
| callback | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

See [getFilterChanges](#getfilterchanges)

**예시**

```javascript
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


## getPastLogs <a id="getpastlogs"></a>

```javascript
caver.klay.getPastLogs(options [, callback])
```

주어진 옵션에 맞는 과거 로그를 얻습니다.

**매개변수**

| 명칭                | 형식                   | 설명                                                                                                                                                                                                                                                                           |
| ----------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options           | Object               | 필터 옵션.                                                                                                                                                                                                                                                                       |
| options.fromBlock | Number &#124; String | (optional) The number of the earliest block to get the logs. (`"latest"` means the most recent block.) The default value is `"latest"`.                                                                                                                                      |
| options.toBlock   | Number &#124; String | (optional) The number of the last block to get the logs. (`"latest"` means the most recent block.). 기본값은 `"latest"`입니다.                                                                                                                                                      |
| options.address   | String &#124; Array  | (optional) An address or a list of addresses. Only the logs related to the particular account(s) will be returned.                                                                                                                                                           |
| options.topics    | 배열                   | (optional) An array of values that must appear in the log entries. 값들의 순서는 중요합니다. If you want to leave topics out, use `null`, *e.g.*, `[null, '0x12...']`. You can also pass an array for each topic with options for that topic, *e.g.,* `[null, ['option1', 'option2']]`. |
| callback          | Function             | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다.                                                                                                                                                                                                         |

**리턴값**

`프로미스`는 `Array`를 반환: 로그 객체들이 있는 배열입니다.

`Array`에 담겨 반환된 이벤트 `Object`의 구조는 다음과 같습니다:

| 명칭               | 형식             | 설명                                                                                                     |
| ---------------- | -------------- | ------------------------------------------------------------------------------------------------------ |
| address          | String         | 이벤트가 발생한 곳입니다.                                                                                         |
| data             | String         | 색인화되지 않은 로그 매개변수를 포함하는 데이터.                                                                            |
| topics           | 배열             | 최대 4개의 32바이트 주제를 가진 배열, 주제 1-3은 로그의 색인화된 매개변수가 포함됩니다.                                                  |
| logIndex         | Number         | 블록에서 이벤트 인덱스 위치의 정수값.                                                                                  |
| transactionIndex | Number         | 이벤트가 생성된 트랜잭션의 인덱스 위치의 정수값.                                                                            |
| transactionHash  | 32-byte String | 이 이벤트가 생성된 트랜잭션의 해시.                                                                                   |
| blockHash        | 32-byte String | 이 이벤트가 생성된 블록의 해시. 아직 보류 중인 경우 `null`.                                                                 |
| blockNumber      | Number         | 이 로그가 생성된 블록 번호. 아직 보류 중인 경우 `null`.                                                                   |
| id               | String         | 로그 식별자. `keccak256(blockHash + transactionHash + logIndex).substr(0, 8)`을 사용하여 "log_" 문자열을 연결하여 작성됩니다. |

**예시**

```javascript
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

```javascript
caver.klay.newBlockFilter([callback])
```

새로운 블록이 도착했다는 정보를 받기 위해 노드에 필터를 만듭니다. To check if the state has changed, call [getFilterChanges](#getfilterchanges).

**매개변수**

| 명칭       | 형식       | 설명                                                                                        |
| -------- | -------- | ----------------------------------------------------------------------------------------- |
| callback | Function | (optional) Optional callback. 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 하여 실행됩니다. |

**리턴값**

`프로미스`는 `String`을 반환 - 필터 ID입니다.

**예시**

```javascript
> caver.klay.newBlockFilter().then(console.log);
0x9ca049dc8b0788ee05724e45fc4137f1
```

## newFilter <a id="newfilter"></a>

```javascript
caver.klay.newFilter(options [, callback])
```
Creates a filter object using the given filter options, to receive the specific state changes (logs).
- To check if the state has changed, call [getFilterChanges](#getfilterchanges).
- To obtain all logs matching the filter created by `newFilter`, call [getFilterLogs](#getfilterlogs).

For detailed information about topic filters, please see [Klaytn Platform API - klay_newFilter](../../../../../json-rpc/api-references/klay/filter.md#klay_newfilter).



**매개변수**

| 명칭                | 형식                   | 설명                                                                                                                                                                                                                                                       |
| ----------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options           | Object               | 필터 옵션.                                                                                                                                                                                                                                                   |
| options.fromBlock | Number &#124; String | (optional) The number of the earliest block height to query the events. (There are special tags, `"latest"` means the most recent block). 기본값은 `"latest"`입니다.                                                                                            |
| options.toBlock   | Number &#124; String | (optional) The number of the last block height to query the events (There are special tags,`"latest"` means the most recent confirmed block). 기본값은 `"latest"`입니다.                                                                                        |
| options.address   | String &#124; Array  | (optional) An address or a list of addresses to get logs generated inside the given contract(s).                                                                                                                                                         |
| options.topics    | 배열                   | (optional) An array of values to search for in the log entries. 값들의 순서는 중요합니다. If you want to match everything in the given position, use `null`, *e.g.*, `[null, '0x12...']`. 배열을 입력하여 여러 개 중 하나를 찾을 수 있습니다.  *e.g.,* `[null, ['option1', 'option2']]`. |
| callback          | Function             | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다.                                                                                                                                                                                     |


**리턴값**

`프로미스`는 `String`을 반환 - 필터 ID입니다.

**예시**

```javascript
> caver.klay.newFilter({}).then(console.log);
0x40d40cb9758c6f0d99d9c2ce9c0f823

> caver.klay.newFilter({address: "0x55384B52a9E5091B6012717197887dd3B5779Df3"}).then(console.log);
0xd165cbf31b9d60346aada33dbefe01b
```

## newPendingTransactionFilter <a id="newpendingtransactionfilter"></a>

```javascript
caver.klay.newPendingTransactionFilter([callback])
```

보류 상태의 트랜잭션이 새롭게 도착했다는 정보를 받기 위해 노드에 필터를 만듭니다. To check if the state has changed, call [getFilterChanges](#getfilterchanges).

**매개변수**

| 명칭       | 형식       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`프로미스`는 `String`을 반환 - 필터 ID입니다.

**예시**

```javascript
> caver.klay.newPendingTransactionFilter().then(console.log);
0x1426438ffdae5abf43edf4159c5b013b
```

## uninstallFilter <a id="uninstallfilter"></a>

```javascript
caver.klay.uninstallFilter(filterId [, callback])
```

주어진 ID를 가진 필터를 제거합니다. 모니터링이 불필요하다면 즉시 필터를 제거하는 것을 강력하게 권장합니다. A filter will be removed if the filter has not been invoked through [getFilterChanges](#getfilterchanges) for more than the timeout value set in the node. 기본 설정은 5분 입니다.

**매개변수**

| 명칭       | 형식       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| filterId | String   | 필터 ID입니다.                                                            |
| callback | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`프로미스`는 `Boolean`을 반환합니다 - 필터가 잘 제거 되었으면 `true`, 그렇지 않으면 `false`입니다.

**예시**

```javascript
> caver.klay.uninstallFilter('0x1426438ffdae5abf43edf4159c5b013b').then(console.log);
true
```
