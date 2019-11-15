## getFilterChanges <a id="getfilterchanges"></a>

```javascript
caver.klay.getFilterChanges(filterId [, callback])
```

Polling method for a filter, which returns an array of logs since the last poll.

**매개변수**

| 명칭       | 형식       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| filterId | String   | The filter id.                                                       |
| callback | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`Promise` returns `Array` - Array of log objects, or an empty array if nothing has changed since last poll.

The structure of the returned log `Object` in the `Array` looks as follows:

| 명칭               | 형식            | 설명                                                                                                                                                                                      |
| ---------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address          | 20바이트 크기 DATA | 로그를 발생시킨 주소입니다.                                                                                                                                                                         |
| topics           | DATA 배열       | 길이가 0부터 4까지인 배열로, 배열의 각 원소는 32바이트 크기 DATA 형태의 인덱스화된 로그 인수들입니다. (솔리디티의 경우 `anonymous` 지정자로 이벤트를 선언하지 않았다면 배열의 첫 번째 원소는 이벤트에 대한 서명의 해시입니다. (*예를 들어*, `Deposit(address,bytes32,uint256)`)) |
| data             | DATA          | 로그 중 인덱스화되지 않은 인수를 담고 있습니다.                                                                                                                                                             |
| blockNumber      | QUANTITY      | 로그가 속한 블록의 번호입니다. 보류 중인 경우 `null`을 반환합니다.                                                                                                                                               |
| transactionHash  | 32바이트 크기 DATA | Hash of the transaction that this log was created from. `null` when pending, an edge case when the transaction has been executed, but the block has not been confirmed.                 |
| transactionIndex | QUANTITY      | Integer. The index of the transaction that this log was created from. 보류 중인 경우 `null`을 반환합니다.                                                                                           |
| blockHash        | 32바이트 크기 DATA | 로그가 생성된 블록의 해시입니다. 보류 중인 경우 `null`을 반환합니다.                                                                                                                                              |
| logIndex         | QUANTITY      | 블록에서 로그 인덱스 위치의 정숫값입니다. 보류 중인 로그인 경우 `null`을 반환합니다.                                                                                                                                     |
| id               | String        | 로그 식별자. It is made by concatenating "log_" string with `keccak256(blockHash + transactionHash + logIndex).substr(0, 8)`                                                                 |

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

Returns an array of all logs matching the filter with the given id. The filter object should be obtained using [newFilter](#newfilter). Note that filter ids returned by other filter creation functions, such as [newBlockFilter](#newblockfilter) or [newPendingTransactionFilter](#newpendingtransactionfilter), cannot be used with this function.

**매개변수**

| 명칭       | 형식       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| filterId | String   | The filter id.                                                       |
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

Gets past logs, matching the given options.

**매개변수**

| 명칭                | 형식                   | 설명                                                                                                                                                                                                                                                                                    |
| ----------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options           | 객체                   | The filter options.                                                                                                                                                                                                                                                                   |
| options.fromBlock | Number &#124; String | (optional) The number of the earliest block to get the logs. (`"latest"` means the most recent block and `"pending"` means currently mining block.) The default value is `"latest"`.                                                                                                  |
| options.toBlock   | Number &#124; String | (optional) The number of the last block to get the logs. (`"latest"` means the most recent block and `"pending"` means currently mining block.). The default value is `"latest"`.                                                                                                     |
| options.address   | String &#124; Array  | (optional) An address or a list of addresses. Only the logs related to the particular account(s) will be returned.                                                                                                                                                                    |
| options.topics    | 배열                   | (optional) An array of values that must appear in the log entries. The order is important. If you want to leave topics out, use `null`, *e.g.*, `[null, '0x12...']`. You can also pass an array for each topic with options for that topic, *e.g.,* `[null, ['option1', 'option2']]`. |
| callback          | Function             | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다.                                                                                                                                                                                                                  |

**리턴값**

`Promise` returns `Array` - Array of log objects.

The structure of the returned event `Object` in the `Array` looks as follows:

| 명칭               | 형식             | 설명                                                                                                     |
| ---------------- | -------------- | ------------------------------------------------------------------------------------------------------ |
| address          | String         | From which this event originated from.                                                                 |
| data             | String         | 색인화되지 않은 로그 매개변수를 포함하는 데이터.                                                                            |
| topics           | 배열             | An array with max 4 32-byte topics, topic 1-3 contains indexed parameters of the log.                  |
| logIndex         | Number         | 블록에서 이벤트 인덱스 위치의 정수값.                                                                                  |
| transactionIndex | Number         | Integer of the transaction's index position, the event was created in.                                 |
| transactionHash  | 32-byte String | Hash of the transaction this event was created in.                                                     |
| blockHash        | 32-byte String | Hash of the block where this event was created in. `null` when its still pending.                      |
| blockNumber      | Number         | The block number where this log was created in. 아직 보류 중인 경우 `null`.                                    |
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

Creates a filter in the node to receive the information about new block arrival. To check if the state has changed, call [getFilterChanges](#getfilterchanges).

**매개변수**

| 명칭       | 형식       | 설명                                                                                                                            |
| -------- | -------- | ----------------------------------------------------------------------------------------------------------------------------- |
| callback | Function | (optional) Optional callback. The callback is fired with an error object as its first parameter and the result as the second. |

**리턴값**

`Promise` returns `String` - A filter id.

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

For detailed information about topic filters, please see [Klaytn Platform API - klay_newFilter](../../../../json-rpc/api-references/klay/filter.md#klay_newfilter).



**매개변수**

| 명칭                | 형식                   | 설명                                                                                                                                                                                                                                                                                  |
| ----------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options           | 객체                   | The filter options.                                                                                                                                                                                                                                                                 |
| options.fromBlock | Number &#124; String | (optional) The number of the earliest block height to query the events. (There are special tags, `"latest"` means the most recent block and `"pending"` means currently mining block). The default value is `"latest"`.                                                             |
| options.toBlock   | Number &#124; String | (optional) The number of the last block height to query the events (There are special tags,`"latest"` means the most recent confirmed block and `"pending"` means currently mining block). The default value is `"latest"`.                                                         |
| options.address   | String &#124; Array  | (optional) An address or a list of addresses to get logs generated inside the given contract(s).                                                                                                                                                                                    |
| options.topics    | 배열                   | (optional) An array of values to search for in the log entries. The order is important. If you want to match everything in the given position, use `null`, *e.g.*, `[null, '0x12...']`. You can also pass an array to match one of them.  *e.g.,* `[null, ['option1', 'option2']]`. |
| callback          | Function             | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다.                                                                                                                                                                                                                |


**리턴값**

`Promise` returns `String` - A filter id.

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

Creates a filter in the node, to receive the information about new pending transactions arrival. To check if the state has changed, call [getFilterChanges](#getfilterchanges).

**매개변수**

| 명칭       | 형식       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`Promise` returns `String` - A filter id.

**예시**

```javascript
> caver.klay.newPendingTransactionFilter().then(console.log);
0x1426438ffdae5abf43edf4159c5b013b
```

## uninstallFilter <a id="uninstallfilter"></a>

```javascript
caver.klay.uninstallFilter(filterId [, callback])
```

Removes the filter with the given id. It is strongly recommended to immediately remove the filter if monitoring is no longer needed. A filter will be removed if the filter has not been invoked through [getFilterChanges](#getfilterchanges) for more than the timeout value set in the node. The default configuration is 5 minutes.

**매개변수**

| 명칭       | 형식       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| filterId | String   | The filter id.                                                       |
| callback | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`Promise` returns `Boolean` - `true` if the filter was successfully uninstalled, otherwise `false`.

**예시**

```javascript
> caver.klay.uninstallFilter('0x1426438ffdae5abf43edf4159c5b013b').then(console.log);
true
```
