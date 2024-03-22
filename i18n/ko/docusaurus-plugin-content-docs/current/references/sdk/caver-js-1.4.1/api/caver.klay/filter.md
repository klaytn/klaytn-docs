# Filter

## getFilterChanges <a id="getfilterchanges"></a>

```javascript
caver.klay.getFilterChanges(filterId [, callback])
```

필터에 대한 폴링 메서드로, 마지막 폴링 이후의 로그 배열을 반환합니다.

**매개변수**

| 이름       | 유형       | 설명                                                                                |
| -------- | -------- | --------------------------------------------------------------------------------- |
| filterId | String   | 필터 아이디입니다.                                                                        |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

`Promise`은 `Array` - 로그 객체의 배열을 반환하거나, 마지막 폴링 이후 변경된 사항이 없는 경우 빈 배열을 반환합니다.

`Array`에서 반환된 로그 `Object`의 구조는 다음과 같습니다:

| 이름               | 유형           | 설명                                                                                                                                                     |
| ---------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| address          | 20-byte DATA | 이 로그가 발생한 주소.                                                                                                                                          |
| topics           | DATA Array   | 인덱싱된 로그 인수의 0\~4개 32-byte DATA 배열. (Solidity에서: 첫 번째 토픽은 이벤트 서명의 해시입니다(\*예: `Deposit(address,bytes32,uint256)`). |
| data             | DATA         | 로그의 인덱싱되지 않은 인수를 포함합니다.                                                                                                                                |
| blockNumber      | QUANTITY     | 이 로그가 있던 블록 번호입니다. 보류 중일 때는 `null`입니다.                                                                                                                 |
| transactionHash  | 32-byte DATA | 이 로그가 생성된 트랜잭션의 해시입니다. 보류 중일 때 `null`, 트랜잭션이 실행되었지만 블록이 확인되지 않은 경우의 에지 케이스입니다.                                                                         |
| transactionIndex | QUANTITY     | 정수. 이 로그가 생성된 트랜잭션의 인덱스입니다. 보류 중일 때는 `null`입니다.                                                                                                        |
| blockHash        | 32-byte DATA | 이 로그가 있는 블록의 해시입니다. 보류 중일 때는 `null`입니다.                                                                                                                |
| logIndex         | QUANTITY     | 블록에서 로그 인덱스 위치의 정수입니다. 보류 중인 로그인 경우 `null`.                                                                                                            |
| id               | String       | 로그 식별자입니다. "log_" 문자열에 `keccak256(blockHash + transactionHash + logIndex).substr(0, 8)`를 연결하여 만듭니다.                               |

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

주어진 아이디로 필터와 일치하는 모든 로그의 배열을 반환합니다. 필터 객체는 [newFilter](#newfilter)를 사용하여 가져와야 합니다.\
[newBlockFilter](#newblockfilter) 또는 [newPendingTransactionFilter](#newpendingtransactionfilter)와 같은 다른 필터 생성 함수가 반환하는 필터 ID는 이 함수와 함께 사용할 수 없습니다.

**매개변수**

| 이름       | 유형       | 설명                                                                                |
| -------- | -------- | --------------------------------------------------------------------------------- |
| filterId | String   | 필터 아이디입니다.                                                                        |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

[getFilterChanges](#getfilterchanges)을 참조하세요.

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

주어진 옵션과 일치하는 과거 로그를 가져옵니다.

**매개변수**

| 이름                | 유형               | 설명                                                                                                                                                                                                               |
| ----------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options           | Object           | 필터 옵션입니다.                                                                                                                                                                                                        |
| options.fromBlock | Number \| String | (선택 사항) 로그를 가져올 가장 빠른 블록의 번호입니다. (`latest`은 가장 최근 블록을 의미합니다.) 기본값은 `latest`입니다.                                                                                            |
| options.toBlock   | Number \| String | (옵션) 로그를 가져올 마지막 블록의 번호입니다. (`latest`은 가장 최근 블록을 의미합니다.) 기본값은 `latest`입니다.                                                                                                 |
| options.address   | String \| Array  | (선택 사항) 주소 또는 주소 목록입니다. 특정 계정과 관련된 로그만 반환됩니다.                                                                                                                                                 |
| options.topics    | Array            | (선택 사항) 로그 항목에 표시되어야 하는 값의 배열입니다. 순서가 중요합니다. 토픽을 생략하려면 `null`, _예:_, `[null, '0x12...']`을 사용하세요. 각 주제에 대한 옵션이 포함된 배열을 전달할 수도 있습니다(예:,\* `[null, ['option1', 'option2']]`). |
| callback          | Function         | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다.                                                                                                                                |

**리턴 값**

`Promise`는 `Array` - 로그 객체의 배열을 반환합니다.

`Array`에서에서 반환된 이벤트 `Object`의 구조는 다음과 같습니다:

| 이름               | 유형             | 설명                                                                                                                       |
| ---------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------ |
| address          | String         | 이 이벤트가 발생한 곳입니다.                                                                                                         |
| data             | String         | 인덱싱되지 않은 로그 매개변수가 포함된 데이터입니다.                                                                                            |
| topics           | Array          | 최대 4개의 32바이트 주제가 있는 배열로, 주제 1\~3에는 인덱싱된 로그 매개 변수가 포함되어 있습니다.                                                             |
| logIndex         | Number         | 블록에서 이벤트 인덱스 위치의 정수입니다.                                                                                                  |
| transactionIndex | Number         | 이벤트가 생성된 트랜잭션의 인덱스 위치의 정수입니다.                                                                                            |
| transactionHash  | 32-byte String | 이 이벤트가 생성된 트랜잭션의 해시입니다.                                                                                                  |
| blockHash        | 32-byte String | 이 이벤트가 생성된 블록의 해시입니다. 아직 보류 중이면 `null`입니다.                                                                               |
| blockNumber      | Number         | 이 로그가 생성된 블록 번호입니다. 아직 보류 중이면 `null`입니다.                                                                                 |
| id               | String         | 로그 식별자입니다. "log_" 문자열에 `keccak256(blockHash + transactionHash + logIndex).substr(0, 8)`를 연결하여 만듭니다. |

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

노드에 필터를 생성하여 새로운 블록 도착에 대한 정보를 수신합니다.
상태가 변경되었는지 확인하려면 [getFilterChanges](#getfilterchanges)를 호출하세요.

**매개변수**

| 이름       | 유형       | 설명                                                                                      |
| -------- | -------- | --------------------------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백입니다. 콜백은 오류 객체를 첫 번째 매개변수로, 결과를 두 번째 매개변수로 사용하여 실행됩니다. |

**리턴 값**

`Promise`는 `String` - 필터 아이디를 반환합니다.

**예시**

```javascript
> caver.klay.newBlockFilter().then(console.log);
0x9ca049dc8b0788ee05724e45fc4137f1
```

## newFilter <a id="newfilter"></a>

```javascript
caver.klay.newFilter(options [, callback])
```

주어진 필터 옵션을 사용하여 특정 상태 변경(로그)을 수신하는 필터 객체를 생성합니다.

- 상태가 변경되었는지 확인하려면 [getFilterChanges](#getfilterchanges)를 호출합니다.
- `newFilter`에 의해 생성된 필터와 일치하는 모든 로그를 가져오려면, [getFilterLogs](#getfilterlogs)를 호출합니다.

For detailed information about topic filters, please see [Klaytn Platform API - klay_newFilter](../../../../../json-rpc/klay/new-filter).

**매개변수**

| 이름                | 유형               | 설명                                                                                                                                                                                                     |
| ----------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| options           | Object           | 필터 옵션입니다.                                                                                                                                                                                              |
| options.fromBlock | Number \| String | (선택 사항) 이벤트를 쿼리할 가장 최근 블록 높이의 번호입니다. (특수 태그가 있으며, `latest`은 가장 최근 블록을 의미함). 기본값은 `latest`입니다.                                                                    |
| options.toBlock   | Number \| String | (선택 사항) 이벤트를 쿼리할 마지막 블록 높이의 번호입니다(특수 태그가 있으며, `latest`는 가장 최근에 확인된 블록을 의미함). 기본값은 `latest`입니다.                                                                   |
| options.address   | String \| Array  | (선택 사항) 지정된 컨트랙트 내에서 생성된 로그를 가져올 주소 또는 주소 목록입니다.                                                                                                                                    |
| options.topics    | Array            | (선택 사항) 로그 항목에서 검색할 값의 배열입니다. 순서가 중요합니다. 주어진 위치의 모든 항목을 일치시키려면 `null`, \*예: \*, `[null, '0x12...']`을 사용하세요. 배열을 전달하여 그 중 하나를 일치시킬 수도 있습니다.  _예:,_ `[null, ['option1', 'option2']]`. |
| callback          | Function         | (선택 사항) 선택적 콜백으로, 첫 번째 매개 변수로 오류 개체를 반환하고 두 번째 매개 변수로 결과를 반환합니다.                                                                                                                    |

**리턴 값**

`Promise`는 필터 ID인 `String`을 반환합니다.

**예시**

```javascript
> caver.klay.newFilter({}).then(console.log);
0x40d40cb9758c6f0d99d9c2ce9c0f823

> caver.klay.newFilter({address: "0x55384B52a9E5091B6012717197887dd3B5779Df3"}).then(console.log);
0xd165cbf31b9d60346aada33dbefe01b
```

## 새로운 보류 중인 트랜잭션 필터 <a id="newpendingtransactionfilter"></a>

```javascript
caver.klay.newPendingTransactionFilter([callback])
```

노드에 필터를 생성하여 새로운 보류 중인 트랜잭션 도착에 대한 정보를 수신합니다.
상태가 변경되었는지 확인하려면 [getFilterChanges](#getfilterchanges)를 호출하세요.

**매개변수**

| 이름       | 유형       | 설명                                                                                |
| -------- | -------- | --------------------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

`Promise`는 필터 ID인 `String`을 반환합니다.

**예시**

```javascript
> caver.klay.newPendingTransactionFilter().then(console.log);
0x1426438ffdae5abf43edf4159c5b013b
```

## uninstallFilter <a id="uninstallfilter"></a>

```javascript
caver.klay.uninstallFilter(filterId [, callback])
```

주어진 아이디로 필터를 제거합니다. 모니터링이 더 이상 필요하지 않은 경우 즉시 필터를 제거할 것을 강력히 권장합니다.
노드에 설정된 시간 제한 값보다 더 오랫동안 [getFilterChanges](#getfilterchanges)를 통해 필터가 호출되지 않으면 필터가 제거됩니다. 기본 설정은 5분입니다.

**매개변수**

| 이름       | 유형       | 설명                                                                                |
| -------- | -------- | --------------------------------------------------------------------------------- |
| filterId | String   | 필터 아이디입니다.                                                                        |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

`Promise`는 필터가 성공적으로 제거되면 `boolean` - `true`을 반환하고, 그렇지 않으면 `false`을 반환합니다.

**예시**

```javascript
> caver.klay.uninstallFilter('0x1426438ffdae5abf43edf4159c5b013b').then(console.log);
true
```
