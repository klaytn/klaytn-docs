# caver.rpc.governance<a id="caver-rpc-governance"></a>

`caver.rpc.governance`는 `governance` 네임 스페이스를 가진 JSON-RPC API를 제공합니다.

## caver.rpc.governance.vote<a id="caver-rpc-governance-vote"></a>

```javascript
caver.rpc.governance.vote(key, value)
```

Submits a new vote. If the node has the right to vote based on the governance mode, the vote can be submitted. If not, an error will occur and the vote will be ignored.

**매개변수**

| 이름    | 타입                                  | 설명                                                                                |
| ----- | ----------------------------------- | --------------------------------------------------------------------------------- |
| key   | string                              | Name of the configuration setting to be changed. Key has the form "domain.field". |
| value | string &#124; number &#124; boolean | Various types of value for each key.                                              |

For more details about the `key` and `value` for `caver.rpc.governance.vote`, please refer to [governance_vote](../../../../json-rpc/api-references/governance.md#governance_vote).


**리턴값**

`Promise`는 `string`을 반환합니다.

| 타입     | 설명                         |
| ------ | -------------------------- |
| string | Result of vote submission. |

**예시**

```javascript
> caver.rpc.governance.vote('governance.governancemode', 'ballot').then(console.log)
Your vote was successfully placed.
```

## caver.rpc.governance.showTally<a id="caver-rpc-governance-showtally"></a>

```javascript
caver.rpc.governance.showTally()
```

Provides the current tally of governance votes. It shows the aggregate approval rate in percentage. The suggested change shall pass when the rate is over 50%.

**리턴값**

`Promise`는 `array`를 반환합니다.

| 타입    | 설명                                                                        |
| ----- | ------------------------------------------------------------------------- |
| Array | An array containing the vote's value and the approval rate in percentage. |

**예시**

```javascript
> caver.rpc.governance.showTally().then(console.log)
[
  {
    Key: 'governance.unitprice',
    Value: 25000000000,
    ApprovalPercentage: 33.33333333333333
  }
]
```

## caver.rpc.governance.getTotalVotingPower<a id="caver-rpc-governance-gettotalvotingpower"></a>

```javascript
caver.rpc.governance.getTotalVotingPower()
```

Provides the sum of all voting power that CNs have. 각 CN은 1.0 ~ 2.0의 의결권을 가집니다. In  the "none" and "single" governance modes, totalVotingPower doesn't provide any information.

**리턴값**

`Promise`는 `number`를 반환합니다.

| 타입     | 설명                  |
| ------ | ------------------- |
| number | Total Voting Power. |

**예시**

```javascript
> caver.rpc.governance.getTotalVotingPower().then(console.log)
3
```

## caver.rpc.governance.getMyVotingPower<a id="caver-rpc-governance-getmyvotingpower"></a>

```javascript
caver.rpc.governance.getMyVotingPower()
```

Provides the voting power of the node. The voting power can be anywhere between 1.0 ~ 2.0. In the "none" and "single" governance modes, totalVotingPower doesn't provide any information.

**리턴값**

`Promise`는 `number`를 반환합니다.

| 타입     | 설명                   |
| ------ | -------------------- |
| number | Node's Voting Power. |

**예시**

```javascript
> caver.rpc.governance.getMyVotingPower().then(console.log)
1
```

## caver.rpc.governance.getMyVotes<a id="caver-rpc-governance-getmyvotes"></a>

```javascript
caver.rpc.governance.getMyVotes()
```

Provides my vote information in the epoch. 사용자의 노드가 새로운 블록을 생성할 때 각 투표가 블록에 저장됩니다. 현재 투표 기간이 종료되면 이 정보는 사라집니다.

**리턴값**

`Promise`는 `array`를 반환합니다.

| 타입    | 설명                                 |
| ----- | ---------------------------------- |
| Array | Node's Voting status in the epoch. |

**예시**

```javascript
> caver.rpc.governance.getMyVotes().then(console.log)
[
  {
    Key: 'governance.unitprice',
    Value: 25000000000,
    Casted: true,
    BlockNum: 76899
  }
]
```

## caver.rpc.governance.getChainConfig<a id="caver-rpc-governance-getchainconfig"></a>

```javascript
caver.rpc.governance.getChainConfig()
```

Provides the initial chain configuration. Because it just stores the initial configuration, if there were changes in the governance made by voting, the result of chainConfig will differ from the current states. To see the current information, please use itemsAt.

**리턴값**

`Promise`는 `array`를 반환합니다.

| 타입    | 설명                                                                        |
| ----- | ------------------------------------------------------------------------- |
| Array | An array containing the vote's value and the approval rate in percentage. |

**예시**

```javascript
> caver.rpc.governance.getChainConfig().then(console.log)
{
  chainId: 10000,
  istanbul: { epoch: 30, policy: 2, sub: 22 },
  unitPrice: 25000000000,
  deriveShaImpl: 2,
  governance: {
    governingNode: '0xbeafcca672100a88a953fcf5e882cb763f9e3de9',
    governanceMode: 'single',
    reward: {
      mintingAmount: 9600000000000000000,
      ratio: '34/54/12',
      useGiniCoeff: true,
      deferredTxFee: true,
      stakingUpdateInterval: 60,
      proposerUpdateInterval: 30,
      minimumStake: 5000000
    }
  }
}
```

## caver.rpc.governance.getNodeAddress<a id="caver-rpc-governance-getnodeaddress"></a>

```javascript
caver.rpc.governance.getNodeAddress()
```

Provides the address of the node that a user is using. nodekey에서 파생되어 합의 메시지를 서명하는 데에 사용됩니다. And the value of "governingnode" has to be one of validator's node address.

**리턴값**

`Promise`는 `string`을 반환합니다.

| 타입     | 설명                     |
| ------ | ---------------------- |
| string | The address of a node. |

**예시**

```javascript
> caver.rpc.governance.getNodeAddress().then(console.log)
0xbeafcca672100a88a953fcf5e882cb763f9e3de9
```

## caver.rpc.governance.getItemsAt<a id="caver-rpc-governance-getitemsat"></a>

```javascript
caver.rpc.governance.getItemsAt([blockNumberOrTag])
```

Returns governance items at a specific block. 이는 해당 블록의 이전 투표 결과이며, 입력으로 받은 블록 번호에서 체인의 환경설정을 하는 데에 사용됩니다.

**매개변수**

| 이름               | 타입                   | 설명                                                                                              |
| ---------------- | -------------------- | ----------------------------------------------------------------------------------------------- |
| blockNumberOrTag | number &#124; string | (선택 사항) 블록 넘버, 또는 `latest`, `earliest`, `pending` 문자열 중 하나입니다. 이 값을 생략하면 `latest`가 기본값으로 사용됩니다. |

**리턴값**

`Promise`는 `object`를 반환합니다.

| 타입     | 설명                    |
| ------ | --------------------- |
| object | The governance items. |

**예시**

```javascript
> caver.rpc.governance.getItemsAt().then(console.log)
{
  'governance.governancemode': 'ballot',
  'governance.governingnode': '0xbeafcca672100a88a953fcf5e882cb763f9e3de9',
  'governance.unitprice': 25000000000,
  'istanbul.committeesize': 22,
  'istanbul.epoch': 30,
  'istanbul.policy': 2,
  'reward.deferredtxfee': true,
  'reward.minimumstake': '5000000',
  'reward.mintingamount': '9600000000000000000',
  'reward.proposerupdateinterval': 30,
  'reward.ratio': '34/54/12',
  'reward.stakingupdateinterval': 60,
  'reward.useginicoeff': true
}

> caver.rpc.governance.getItemsAt('latest').then(console.log)
```

## caver.rpc.governance.getPendingChanges<a id="caver-rpc-governance-getpendingchanges"></a>

```javascript
caver.rpc.governance.getPendingChanges()
```

Returns the list of items that have received enough number of votes but not yet finalized. 현재 투표 기간이 끝날 때 이 항목들은 확정되어 그 결과가 다음 투표 기간 이후의 투표 기간부터 적용됩니다.

**리턴값**

`Promise`는 `object`를 반환합니다.

| 타입     | 설명                                                     |
| ------ | ------------------------------------------------------ |
| object | Currently pending changes composed of keys and values. |

**예시**

```javascript
> caver.rpc.governance.getPendingChanges().then(console.log)
{ 'governance.governancemode': 'single' }
```

## caver.rpc.governance.getIdxCache<a id="caver-rpc-governance-getidxcache"></a>

```javascript
caver.rpc.governance.getIdxCache()
```

Returns an array of current idxCache in the memory cache. idxCache는 거버넌스 내용이 변경되었던 블록 번호를 담고 있습니다. 캐시는 최대 1,000개의 블록 번호까지 담을 수 있도록 기본 설정되어 있습니다.

**리턴값**

`Promise`는 `object`를 반환합니다.

| 타입    | 설명                                              |
| ----- | ----------------------------------------------- |
| Array | Block numbers where governance change happened. |

**예시**

```javascript
> caver.rpc.governance.getIdxCache().then(console.log)
[ 0, 60, 321180 ]
```

## caver.rpc.governance.getIdxCacheFromDb<a id="caver-rpc-governance-getidxcachefromdb"></a>

```javascript
caver.rpc.governance.getIdxCacheFromDb()
```

Returns an array that contains all block numbers at which any governance changes ever took place. The result of idxCacheFromDb is the same or longer than that of [idxCache](#caver-rpc-governance-getidxcache).

**리턴값**

`Promise`는 `object`를 반환합니다.

| 타입    | 설명                                              |
| ----- | ----------------------------------------------- |
| Array | Block numbers where governance change happened. |

**예시**

```javascript
> caver.rpc.governance.getIdxCacheFromDb().then(console.log)
[ 0, 60, 321180 ]
```

## caver.rpc.governance.getItemCacheFromDb<a id="caver-rpc-governance-getitemcachefromdb"></a>

```javascript
caver.rpc.governance.getItemCacheFromDb()
```

Returns the governance information stored on the given block. If no changes are stored on the given block, the function returns null.

**매개변수**

| 이름          | 타입                   | 설명                                                                                         |
| ----------- | -------------------- | ------------------------------------------------------------------------------------------ |
| blockNumber | number &#124; string | A block number, or the hex number string to query the governance change made on the block. |

**리턴값**

`Promise`는 `object`를 반환합니다.

| 타입     | 설명                                              |
| ------ | ----------------------------------------------- |
| object | Stored governance information at a given block. |

**예시**

```javascript
> caver.rpc.governance.getItemCacheFromDb(321180).then(console.log)
{
  'governance.governancemode': 'single',
  'governance.governingnode': '0xbeafcca672100a88a953fcf5e882cb763f9e3de9',
  'governance.unitprice': 25000000000,
  'istanbul.committeesize': 22,
  'istanbul.epoch': 30,
  'istanbul.policy': 2,
  'reward.deferredtxfee': true,
  'reward.minimumstake': '5000000',
  'reward.mintingamount': '9600000000000000000',
  'reward.proposerupdateinterval': 30,
  'reward.ratio': '34/54/12',
  'reward.stakingupdateinterval': 60,
  'reward.useginicoeff': true
}

> caver.rpc.governance.getItemCacheFromDb(1).then(console.log)
null
```

## caver.rpc.governance.getStakingInfo<a id="caver-rpc-governance-getstakinginfo"></a>

```javascript
caver.rpc.governance.getStakingInfo([blockNumberOrTag])
```

Returns the staking information at a specific block.

**매개변수**

| 이름               | 타입                   | 설명                                                                                              |
| ---------------- | -------------------- | ----------------------------------------------------------------------------------------------- |
| blockNumberOrTag | number &#124; string | (선택 사항) 블록 넘버, 또는 `latest`, `earliest`, `pending` 문자열 중 하나입니다. 이 값을 생략하면 `latest`가 기본값으로 사용됩니다. |

**리턴값**

`Promise`는 `object`를 반환합니다.

| 타입     | 설명                                                                                                                                                                             |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| object | Staking information. Refer to [governance_getStakingInfo](../../../../json-rpc/api-references/governance.md#governance_getstakinginfo) for a description of the return result. |

**예시**

```javascript
> caver.rpc.governance.getStakingInfo().then(console.log)
{
  BlockNum: 321600,
  CouncilNodeAddrs: [],
  CouncilStakingAddrs: [],
  CouncilRewardAddrs: [],
  KIRAddr: '0x0000000000000000000000000000000000000000',
  PoCAddr: '0x0000000000000000000000000000000000000000',
  UseGini: false,
  Gini: -1,
  CouncilStakingAmounts: []
}
```
