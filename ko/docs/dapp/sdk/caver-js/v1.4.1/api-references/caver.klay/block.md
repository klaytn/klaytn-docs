## defaultBlock <a id="defaultblock"></a>

```javascript
caver.klay.defaultBlock
```

기본 블록은 특정 메서드들에서 사용됩니다.  You can override it by passing in the defaultBlock as the last parameter.  기본값은 `"latest"`입니다.

- [caver.klay.getBalance()](./account.md#getbalance)
- [caver.klay.getCode()](./account.md#getcode)
- [caver.klay.getTransactionCount()](./account.md#gettransactioncount)
- [caver.klay.getStorageAt()](#getstorageat)
- [caver.klay.call()](./transaction.md#call)
- [new caver.klay.Contract()](../caver.klay.Contract.md#new-contract) -> [myContract.methods.myMethod().call()](../caver.klay.Contract.md#methods-mymethod-call)

**속성**

기본 블록 파라미터는 다음 중 하나일 수 있습니다.

- 숫자: 블록 번호
- `"genesis"` - String: 제네시스 블록
- `"latest"` - String: The latest block (current head of the blockchain)

기본값은 `"latest"`입니다.

**예시**

```javascript
> caver.klay.defaultBlock;
"latest"

// set the default block
> caver.klay.defaultBlock = 1000;
```

## getBlockNumber <a id="getblocknumber"></a>

```javascript
caver.klay.getBlockNumber([callback])
```

현재 블록 번호를 반환합니다.

**Parameters**

| 이름       | 타입       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`프로미스`는 `Number`를 반환 - 가장 최신 블록의 블록 번호입니다.

**예시**

```javascript
> caver.klay.getBlockNumber().then(console.log);
2744
```

## getBlock <a id="getblock"></a>

```javascript
caver.klay.getBlock(blockHashOrBlockNumber [, returnTransactionObjects] [, callback])
```
블록 해시 또는 블록 번호와 매칭되는 블록을 반환합니다.

**Parameters**

| 이름                       | 타입                   | 설명                                                                                                                                                           |
| ------------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| blockHashOrBlockNumber   | String &#124; Number | The block hash or block number. Or the string `"genesis"`, or `"latest"`.                                                                                    |
| returnTransactionObjects | Boolean              | (optional, default `false`) If `true`, the returned block will contain all transactions as objects, if `false` it will only contains the transaction hashes. |
| callback                 | Function             | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다.                                                                                         |

**리턴값**

`프로미스`는 `Object`를 반환 - 블록 객체입니다.

| 이름               | 타입              | 설명                                                                          |
| ---------------- | --------------- | --------------------------------------------------------------------------- |
| blockScore       | QUANTITY        | 이전 난이도입니다. BFT 합의 엔진에서는 항상 1입니다.                                            |
| extraData        | String          | 블록의 "추가 데이터"를 위한 필드입니다.                                                     |
| gasUsed          | Number          | 블록에 있는 트랜잭션들에서 사용된 가스양의 총합입니다.                                              |
| governanceData   | DATA            | RLP 인코딩된 거버넌스 설정입니다.                                                        |
| 해시               | 32-byte String  | 블록의 해시입니다. 아직 보류 중인 블록이면 `null`입니다.                                         |
| logsBloom        | 256-byte String | 블록의 로그를 위한 블룸필터입니다. 아직 보류 중인 블록이면 `null`입니다.                                |
| number           | Number          | 블록 번호입니다. 아직 보류 중인 블록이면 `null`입니다.                                          |
| parentHash       | 32-byte String  | 이전 블록의 해시입니다.                                                               |
| receiptsRoot     | 32바이트 크기 DATA   | 블록의 영수증 트라이의 루트 해시입니다.                                                      |
| reward           | 20바이트 크기 DATA   | 블록 보상을 받을 수혜자의 주소입니다.                                                       |
| size             | Number          | 블록의 바이트 크기의 정수 형태입니다.                                                       |
| stateRoot        | 32-byte String  | 블록의 상태 트라이의 루트 해시입니다.                                                       |
| timestamp        | Number          | 블록이 생성되었을 때의 Unix 타임스탬프입니다.                                                 |
| timestampFoS     | QUANTITY        | 블록이 생성되었을 때의 타임스탬프 중 초 단위 부분입니다.                                            |
| totalBlockScore  | QUANTITY        | 본 블록까지 체인 내 모든 블록의 blockScore 값의 합입니다.                                      |
| transactions     | Array           | 트랜잭션 객체의 배열이거나 또는 `returnTransactionObjects` 매개변수에 따라 32바이트 크기의 트랜잭션 해시입니다. |
| transactionsRoot | 32-byte String  | 블록의 트랜잭션 트라이의 루트 해시입니다.                                                     |
| voteData         | DATA            | 제안자의 RLP 인코딩된 거버넌스 투표입니다.                                                   |

**예시**

```javascript
> caver.klay.getBlock(19097).then(console.log);
{ 
    blockscore: '0x1',
    extraData: '0xd7820a01846b6c617988676f312e31312e32856c696e75780000000000000000f8b3ea94715dd3ce7a285f21111715a2ba5537414d40506b9471959675eeb7c7ec1e0c74f206a9c488d7f178d4b8418e55cfb464eed804671bbee503f2dcacae9349f23aa3c42fc43349f96ef08bb07c1039541a3b768af32384c8e29ec7e673356a6b0ea4c6d88604ae8abae4303201f843b841386a3fbd09cd3a7c82c0b8fdc9ae8c3e624be5f12553dde42bed456093e40c113aa36fb7015b578611e2cd2ee979e6017b15be7d3cc645f455b32e8607c85d7100',
    gasUsed: '0x5208',
    governanceData: '0x',
    hash: '0x6ccef34eb59fab927705d344f080f449b576c0626e4aa3e20f569feb8df6e283',
    logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    number: '0x4a99',
    parentHash: '0x3b56b598828368d86b175a78ba21845125372851154840c6b1b318da910849c2',
    receiptsRoot: '0xe38e5532717f12f769b07ea016014bd39b74fb72def4de8442114cc2728609f2',
    reward: '0x59e6931f46b091f4ecbc39e8626fc0be7d3fcdeb',
    size: '0x314',
    stateRoot: '0xc65b3e3f1c32c33c095507d6d37e2a8a5589b178b5b03a1365295908ac92c40c',
    timestamp: '0x5d11f951',
    timestampFoS: '0x0',
    totalBlockScore: '0x4a9a',
    transactions: [ '0xac418c96f7386a3343d149eeb29e48e28905525dda2e5afe55b0661f9ab01aca' ],
    transactionsRoot: '0xac418c96f7386a3343d149eeb29e48e28905525dda2e5afe55b0661f9ab01aca',
    voteData: '0x' 
}
```

## getBlockReceipts <a id="getblockreceipts"></a>

```javascript
caver.klay.getBlockReceipts(blockHash [, callback])
```
주어진 블록 해시와 매칭된 블록에 있는 트랜잭션 영수증 목록을 반환합니다.

**Parameters**

| 이름        | 타입       | 설명                                                                   |
| --------- | -------- | -------------------------------------------------------------------- |
| blockHash | String   | 블록의 해시입니다.                                                           |
| callback  | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`프로미스`는 `Array`를 반환 - 블록에 있는 영수증들입니다.  조회하고자 하는 블록이 트랜잭션을 담고 있지 않으면 빈 배열 `[]`이 반환됩니다.


**예시**

```javascript
> caver.klay.getBlockReceipts('0x6ccef34eb59fab927705d344f080f449b576c0626e4aa3e20f569feb8df6e283').then(console.log);
[ 
    { 
        blockHash: '0x6ccef34eb59fab927705d344f080f449b576c0626e4aa3e20f569feb8df6e283',
        blockNumber: '0x4a99',
        contractAddress: null,
        from: '0x71959675eeb7c7ec1e0c74f206a9c488d7f178d4',
        gas: '0x493e0',
        gasPrice: '0x5d21dba00',
        gasUsed: '0x5208',
        logs: [],
        logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
        nonce: '0x2',
        senderTxHash: '0xac418c96f7386a3343d149eeb29e48e28905525dda2e5afe55b0661f9ab01aca',
        signatures: [ 
            { 
                V: '0x4e43',
                R: '0xa857ef0676d7e65697cadeaf1654b2facd71d0b9f942d695f3972a1f7c34c25c',
                S: '0x43fba9e5c2c16511f951e27957f1279ea3c1f913b27f9fbb2a8dcb5884e37e3d'
            } 
        ],
        status: '0x1',
        to: '0xef5cd886c7f8d85fbe8023291761341acbb4da01',
        transactionHash: '0xac418c96f7386a3343d149eeb29e48e28905525dda2e5afe55b0661f9ab01aca',
        transactionIndex: '0x0',
        type: 'TxTypeValueTransfer',
        typeInt: 8,
        value: '0xde0b6b3a7640000' 
    } 
]

> caver.klay.getBlockReceipts('0x6275712cd6ec769603f1560819ad226ea29216881c495c778ca68f0c1cd6e550').then(console.log);
[]
```

## getBlockTransactionCount <a id="getblocktransactioncount"></a>

```javascript
caver.klay.getBlockTransactionCount(blockHashOrBlockNumber [, callback])
```
주어진 블록에 담긴 트랜잭션의 개수를 반환합니다.

**Parameters**

| 이름                     | 타입                   | 설명                                                                   |
| ---------------------- | -------------------- | -------------------------------------------------------------------- |
| blockHashOrBlockNumber | String &#124; Number | The block number or hash. Or the string `"genesis"`, or `"latest"`.  |
| callback               | Function             | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`프로미스`는 `Number`를 반환 - 주어진 블록에 담긴 트랜잭션 개수입니다.

**예시**

```javascript
> caver.klay.getBlockTransactionCount("0x407d73d8a49eeb85d32cf465507dd71d507100c1").then(console.log);
1
```


## getBlockWithConsensusInfo <a id="getblockwithconsensusinfo"></a>

```javascript
caver.klay.getBlockWithConsensusInfo(blockHashOrBlockNumber [, callback])
```

주어진 블록 해시 또는 블록 번호로 조회한 블록을 합의에 대한 정보와 함께 반환합니다.

**Parameters**

| 이름                     | 타입                   | 설명                                                                   |
| ---------------------- | -------------------- | -------------------------------------------------------------------- |
| blockHashOrBlockNumber | String &#124; Number | The block hash or block number. 또는 `"genesis"` 아니면 `"latest"`.       |
| callback               | Function             | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`Promise` returns `Object` - A block object with consensus information (a proposer and a list of committee members) The block object contains:

| 이름               | 타입              | 설명                                                                       |
| ---------------- | --------------- | ------------------------------------------------------------------------ |
| blockScore       | QUANTITY        | 이전 난이도입니다. BFT 합의 엔진에서는 항상 1입니다.                                         |
| committee        | Array           | 블록 생성에 관여한 위원회 멤버들의 주소의 배열입니다. 위원회란 블록 생성을 위한 합의 프로토콜에 참여한 검증자들 중 일부입니다. |
| extraData        | String          | 블록의 "추가 데이터"를 위한 필드입니다.                                                  |
| gasUsed          | QUANTITY        | 블록에 있는 트랜잭션들에서 사용된 가스양의 총합입니다.                                           |
| governanceData   | DATA            | RLP 인코딩된 거버넌스 설정입니다.                                                     |
| 해시               | 32바이트 크기 DATA   | 블록의 해시입니다. 아직 보류 중인 블록이면 `null`입니다.                                      |
| logsBloom        | 256-byte String | 블록의 로그를 위한 블룸필터입니다. 아직 보류 중인 블록이면 `null`입니다.                             |
| number           | QUANTITY        | 블록 번호입니다. 아직 보류 중인 블록이면 `null`입니다.                                       |
| parentHash       | 32바이트 크기 DATA   | 이전 블록의 해시입니다.                                                            |
| proposer         | 20바이트 크기 DATA   | 블록 제안자의 주소입니다.                                                           |
| receiptsRoot     | 32바이트 크기 DATA   | 블록의 영수증 트라이의 루트 해시입니다.                                                   |
| reward           | 20바이트 크기 DATA   | 블록 보상을 받을 수혜자의 주소입니다.                                                    |
| size             | QUANTITY        | 블록의 바이트 크기의 정수 형태입니다.                                                    |
| stateRoot        | 32바이트 크기 DATA   | 블록의 상태 트라이의 루트 해시입니다.                                                    |
| timestamp        | QUANTITY        | 블록이 생성되었을 때의 Unix 타임스탬프입니다.                                              |
| timestampFoS     | QUANTITY        | 블록이 생성되었을 때의 타임스탬프 중 초 단위 부분입니다.                                         |
| totalBlockScore  | QUANTITY        | 본 블록까지 체인 내 모든 블록의 blockScore 값의 합입니다.                                   |
| transactions     | Array           | 트랜잭션 객체의 배열입니다.                                                          |
| transactionsRoot | 32바이트 크기 DATA   | 블록의 트랜잭션 트라이의 루트 해시입니다.                                                  |
| voteData         | DATA            | 제안자의 RLP 인코딩된 거버넌스 투표입니다.                                                |

**예제**
```javascript
> caver.klay.getBlockWithConsensusInfo(19097).then(console.log);
{ 
    blockscore: '0x1',
    committee: [ 
        '0x715dd3ce7a285f21111715a2ba5537414d40506b',
        '0x71959675eeb7c7ec1e0c74f206a9c488d7f178d4' 
    ],
    extraData: '0xd7820a01846b6c617988676f312e31312e32856c696e75780000000000000000f8b3ea94715dd3ce7a285f21111715a2ba5537414d40506b9471959675eeb7c7ec1e0c74f206a9c488d7f178d4b8418e55cfb464eed804671bbee503f2dcacae9349f23aa3c42fc43349f96ef08bb07c1039541a3b768af32384c8e29ec7e673356a6b0ea4c6d88604ae8abae4303201f843b841386a3fbd09cd3a7c82c0b8fdc9ae8c3e624be5f12553dde42bed456093e40c113aa36fb7015b578611e2cd2ee979e6017b15be7d3cc645f455b32e8607c85d7100',
    gasUsed: '0x5208',
    governanceData: '0x',
    hash: '0x6ccef34eb59fab927705d344f080f449b576c0626e4aa3e20f569feb8df6e283',
    logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    number: '0x4a99',
    parentHash: '0x3b56b598828368d86b175a78ba21845125372851154840c6b1b318da910849c2',
    proposer: '0x715dd3ce7a285f21111715a2ba5537414d40506b',
    receiptsRoot: '0xe38e5532717f12f769b07ea016014bd39b74fb72def4de8442114cc2728609f2',
    reward: '0x59e6931f46b091f4ecbc39e8626fc0be7d3fcdeb',
    size: '0x314',
    stateRoot: '0xc65b3e3f1c32c33c095507d6d37e2a8a5589b178b5b03a1365295908ac92c40c',
    timestamp: '0x5d11f951',
    timestampFoS: '0x0',
    totalBlockScore: '0x4a9a',
    transactions: [ 
        { 
            blockHash: '0x6ccef34eb59fab927705d344f080f449b576c0626e4aa3e20f569feb8df6e283',
            blockNumber: '0x4a99',
            contractAddress: null,
            from: '0x71959675eeb7c7ec1e0c74f206a9c488d7f178d4',
            gas: '0x493e0',
            gasPrice: '0x5d21dba00',
            gasUsed: '0x5208',
            logs: [],
            logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
            nonce: '0x2',
            senderTxHash: '0xac418c96f7386a3343d149eeb29e48e28905525dda2e5afe55b0661f9ab01aca',
            signatures: [ 
                { 
                    V: '0x4e43',
                    R: '0xa857ef0676d7e65697cadeaf1654b2facd71d0b9f942d695f3972a1f7c34c25c',
                    S: '0x43fba9e5c2c16511f951e27957f1279ea3c1f913b27f9fbb2a8dcb5884e37e3d' 
                } 
            ],
            status: '0x1',
            to: '0xef5cd886c7f8d85fbe8023291761341acbb4da01',
            transactionHash: '0xac418c96f7386a3343d149eeb29e48e28905525dda2e5afe55b0661f9ab01aca',
            transactionIndex: '0x0',
            type: 'TxTypeValueTransfer',
            typeInt: 8,
            value: '0xde0b6b3a7640000' 
        } 
    ],
    transactionsRoot: '0xac418c96f7386a3343d149eeb29e48e28905525dda2e5afe55b0661f9ab01aca',
    voteData: '0x' 
}
```

## getCommittee <a id="getcommittee"></a>

```javascript
caver.klay.getCommittee([defaultBlock] [, callback])
```

어떤 블록 시간에서 위원회에 속한 검증자 목록을 반환합니다. 매개변수를 설정하지 않으면 최신 블록에서 위원회에 속한 검증자 목록을 반환합니다.

**Parameters**

| 이름           | 타입                   | 설명                                                                                                                          |
| ------------ | -------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| defaultBlock | Number &#124; String | (optional) If you pass this parameter, it will not use the default block set with [caver.klay.defaultBlock](#defaultblock). |
| callback     | Function             | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다.                                                        |

**리턴값**

`프로미스`는 `Array`를 반환 - 위원회에 있는 모든 검증자의 주소들이 담긴 배열입니다.

**예시**

```javascript
> caver.klay.getCommittee().then(console.log);
[
    "0x207e38864b45a538733741dc1ff92eff9d1a6159",
    "0x6d64bc82b93368a7f963d6c34483ca3893f405f6",
    "0xbc9c19f91878369776812039e4ebcdfa3c646716",
    "0xe3ed6fa287752b992f936b42360770c59731d9eb"
]
```

## getCommitteeSize <a id="getcommitteesize"></a>

```javascript
caver.klay.getCommitteeSize([defaultBlock] [, callback])
```

어떤 블록 시간에서 위원회의 구성원 수를 반환합니다. 매개변수를 설정하지 않으면 최신 블록에서의 위원회 구성원 수를 반환합니다.

**Parameters**

| 이름           | 타입                   | 설명                                                                                                                          |
| ------------ | -------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| defaultBlock | Number &#124; String | (optional) If you pass this parameter, it will not use the default block set with [caver.klay.defaultBlock](#defaultblock). |
| callback     | Function             | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다.                                                        |

**리턴값**

`프로미스`는 `Number`를 반환 - 위원회의 크기입니다.

**예시**

```javascript
> caver.klay.getCommitteeSize().then(console.log);
4
```

## getCouncil <a id="getcouncil"></a>
**참고**: `getValidators`은 이 메서드로 대체되어 더 이상 지원하지 않습니다.

```javascript
caver.klay.getCouncil([defaultBlock] [, callback])
```

어떤 블록 시간에서 council에 속한 검증자 목록을 반환합니다. 매개변수를 설정하지 않으면 최신 블록에서 council에 속한 검증자 목록을 반환합니다.

**Parameters**

| 이름           | 타입                   | 설명                                                                                                                          |
| ------------ | -------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| defaultBlock | Number &#124; String | (optional) If you pass this parameter, it will not use the default block set with [caver.klay.defaultBlock](#defaultblock). |
| callback     | Function             | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다.                                                        |

**리턴값**

`프로미스`는 `Array`를 반환 - 위원회에 있는 모든 검증자들의 주소들이 담긴 배열입니다.

**예시**

```javascript
> caver.klay.getCouncil().then(console.log);
[
    "0x207e38864b45a538733741dc1ff92eff9d1a6159",
    "0x6d64bc82b93368a7f963d6c34483ca3893f405f6",
    "0xbc9c19f91878369776812039e4ebcdfa3c646716",
    "0xe3ed6fa287752b992f936b42360770c59731d9eb"
]
```

## getCouncilSize <a id="getcouncilsize"></a>

```javascript
caver.klay.getCouncilSize([defaultBlock] [, callback])
```

어떤 블록 시간에서 council의 구성원 수를 반환합니다. 매개변수를 설정하지 않으면 최신 블록에서의 council 구성원 수를 반환합니다.

**Parameters**

| 이름           | 타입                   | 설명                                                                                                                          |
| ------------ | -------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| defaultBlock | Number &#124; String | (optional) If you pass this parameter, it will not use the default block set with [caver.klay.defaultBlock](#defaultblock). |
| callback     | Function             | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다.                                                        |

**리턴값**

`프로미스`는 `Number`를 반환 - 카운슬의 크기입니다.

**예시**

```javascript
> caver.klay.getCouncilSize().then(console.log);
4
```


## getStorageAt <a id="getstorageat"></a>

```javascript
caver.klay.getStorageAt(address, position [, defaultBlock] [, callback])
```
주소를 사용해 특정 위치에 있는 스토리지를 반환합니다.

**Parameters**

| 이름           | 타입                   | 설명                                                                                                                          |
| ------------ | -------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| 주소           | String               | 스토리지를 얻고 싶은 주소입니다.                                                                                                          |
| position     | Number               | 스토리지 인덱스 위치입니다.                                                                                                             |
| defaultBlock | Number &#124; String | (optional) If you pass this parameter, it will not use the default block set with [caver.klay.defaultBlock](#defaultblock). |
| callback     | Function             | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다.                                                        |

**리턴값**

`프로미스`는 `String`을 반환 - 주어진 위치의 스토리지에 있는 값입니다.

**예시**

```javascript
> caver.klay.getStorageAt("0x407d73d8a49eeb85d32cf465507dd71d507100c1", 0).then(console.log);
"0x033456732123ffff2342342dd12342434324234234fd234fd23fd4f23d4234"
```


## isMining <a id="ismining"></a>

```javascript
caver.klay.isMining([callback])
```

클라이언트가 새로운 블록을 채굴하고 있으면 `true`를 반환합니다.

**Parameters**

| 이름       | 타입       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |


**리턴값**

`프로미스`는 `Boolean`을 반환합니다 - 클라이언트가 블록을 채굴중이면 `true`, 그렇지 않을 경우 `false`.

**예시**

```javascript
> caver.klay.isMining().then(console.log);
true
```

## isSyncing <a id="issyncing"></a>

```javascript
caver.klay.isSyncing([callback])
```

노드가 현재 싱크중인지 확인하고 싱크중이면 싱크 객체를 반환하고 싱크중이 아니면 `false`를 반환합니다.

**Parameters**

| 이름       | 타입       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |


**리턴값**

`프로미스`는 `Object|Boolean`을 반환 - 노드가 현재 싱크중이면 싱크 객체를 반환하고 싱크중이 아니면 `false`를 반환합니다.

| 이름            | 타입     | 설명                              |
| ------------- | ------ | ------------------------------- |
| startingBlock | Number | 싱크가 시작된 블록의 번호입니다.              |
| currentBlock  | Number | 현재 노드가 이미 싱크한 상태인 블록의 블록 번호입니다. |
| highestBlock  | Number | 싱크해야 할 블록 번호 추정값입니다.            |
| knownStates   | Number | 앞으로 다운로드할 상태(state) 추정값입니다.     |
| pulledStates  | Number | 이미 다운로드한 상태(state)입니다.          |

**예시**

```javascript
> caver.klay.isSyncing().then(console.log);
{
    startingBlock: 100,
    currentBlock: 312,
    highestBlock: 512,
    knownStates: 234566,
    pulledStates: 123455
}
```
