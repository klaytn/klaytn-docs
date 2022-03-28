# caver.rpc.governance<a id="caver-rpc-governance"></a>

`caver.rpc.governance`는 `governance` 네임 스페이스를 가진 JSON-RPC API를 제공합니다.

## caver.rpc.governance.vote<a id="caver-rpc-governance-vote"></a>

```javascript
caver.rpc.governance.vote(key, value [, callback])
```

새로 투표합니다. 거버넌스 모드에 의거하여 노드가 의결권을 가지면 투표할 수 있습니다. 그렇지 않으면 오류 메시지가 반환되고 투표 행위가 무시됩니다.

**Parameters**

| 이름       | 타입                                  | 설명                                                                 |
| -------- | ----------------------------------- | ------------------------------------------------------------------ |
| key      | string                              | Key : 변경하고자 하는 환경설정의 이름입니다. 키는 domain.field의 형식으로 되어 있습니다.         |
| value    | string &#124; number &#124; boolean | 각 키에 대한 값의 타입들입니다.                                                 |
| callback | function                            | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 파라미터로, 결과를 두 번째 파라미터로 반환합니다. |

`caver.rpc.governance.vote`의 `key`나 `value`에 대한 자세한 내용은 [governance_vote](../../../../json-rpc/api-references/governance.md#governance_vote)를 참고해주세요.


**리턴값**

`Promise`는 `string`을 반환합니다.

| 타입     | 설명           |
| ------ | ------------ |
| string | 투표 제출 결과입니다. |

**예시**

```javascript
> caver.rpc.governance.vote('governance.governancemode', 'ballot').then(console.log)
Your vote was successfully placed.
```

## caver.rpc.governance.showTally<a id="caver-rpc-governance-showtally"></a>

```javascript
caver.rpc.governance.showTally([callback])
```

현재 거버넌스 표 합계를 제공합니다. 집계된 찬성률을 백분율로 나타냅니다. 찬성률이 50%인 경우 변경이 통과됩니다.

**Parameters**

| 이름       | 타입       | 설명                                                                 |
| -------- | -------- | ------------------------------------------------------------------ |
| callback | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 파라미터로, 결과를 두 번째 파라미터로 반환합니다. |

**리턴값**

`Promise`는 `array`를 반환합니다.

| 타입    | 설명                    |
| ----- | --------------------- |
| Array | 표의 값과 찬성률을 포함한 배열입니다. |

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
caver.rpc.governance.getTotalVotingPower([callback])
```

CN이 지닌 의결권의 합을 제공합니다.  각 CN은 1.0 ~ 2.0의 의결권을 가집니다. "none", "single" 거버넌스 모드에서는 totalVotingPower 속성을 통해 제공하는 정보가 없습니다.

**Parameters**

| 이름       | 타입       | 설명                                                                 |
| -------- | -------- | ------------------------------------------------------------------ |
| callback | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 파라미터로, 결과를 두 번째 파라미터로 반환합니다. |

**리턴값**

`Promise`는 `number`를 반환합니다.

| 타입     | 설명          |
| ------ | ----------- |
| number | 의결권의 총합입니다. |

**예시**

```javascript
> caver.rpc.governance.getTotalVotingPower().then(console.log)
3
```

## caver.rpc.governance.getMyVotingPower<a id="caver-rpc-governance-getmyvotingpower"></a>

```javascript
caver.rpc.governance.getMyVotingPower([callback])
```

노드의 의결권을 반환합니다. 의결권의 값은 1.0 ~ 2.0입니다. "none", "single" 거버넌스 모드에서는 totalVotingPower 속성을 통해 제공하는 정보가 없습니다.

**Parameters**

| 이름       | 타입       | 설명                                                                 |
| -------- | -------- | ------------------------------------------------------------------ |
| callback | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 파라미터로, 결과를 두 번째 파라미터로 반환합니다. |

**리턴값**

`Promise`는 `number`를 반환합니다.

| 타입     | 설명          |
| ------ | ----------- |
| number | 노드의 의결권입니다. |

**예시**

```javascript
> caver.rpc.governance.getMyVotingPower().then(console.log)
1
```

## caver.rpc.governance.getMyVotes<a id="caver-rpc-governance-getmyvotes"></a>

```javascript
caver.rpc.governance.getMyVotes([callback])
```

투표 주기 내 투표 정보를 반환합니다. 사용자의 노드가 새로운 블록을 생성할 때 각 투표가 블록에 저장됩니다. 현재 투표 주기가 종료되면 이 정보는 사라집니다.

**Parameters**

| 이름       | 타입       | 설명                                                                 |
| -------- | -------- | ------------------------------------------------------------------ |
| callback | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 파라미터로, 결과를 두 번째 파라미터로 반환합니다. |

**리턴값**

`Promise`는 `array`를 반환합니다.

| 타입    | 설명                    |
| ----- | --------------------- |
| Array | 투표 주기 내 노드의 투표 상태입니다. |

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
caver.rpc.governance.getChainConfig([callback])
```

최초 체인 환경설정을 제공합니다. 이 속성은 초기 환경설정만 저장하기 때문에 투표에 의해 거버넌스에 변경 사항이 있다면 chainConfig의 결과는 현재 상태와 달라질 것입니다. 현재 정보를 확인하려면 itemsAt을 사용하세요.

**Parameters**

| 이름       | 타입       | 설명                                                                 |
| -------- | -------- | ------------------------------------------------------------------ |
| callback | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 파라미터로, 결과를 두 번째 파라미터로 반환합니다. |

**리턴값**

`Promise`는 `object`를 반환합니다.

| 타입     | 설명              |
| ------ | --------------- |
| object | 체인의 최초 환경설정입니다. |

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
caver.rpc.governance.getNodeAddress([callback])
```

사용자의 노드 주소를 제공합니다. nodekey에서 파생되어 합의 메시지를 서명하는 데에 사용됩니다. 그리고 "governingnode"의 값은 검증자의 노드 중 하나의 주소가 되어야 합니다.

**Parameters**

| 이름       | 타입       | 설명                                                                 |
| -------- | -------- | ------------------------------------------------------------------ |
| callback | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 파라미터로, 결과를 두 번째 파라미터로 반환합니다. |

**리턴값**

`Promise`는 `string`을 반환합니다.

| 타입     | 설명         |
| ------ | ---------- |
| string | 노드의 주소입니다. |

**예시**

```javascript
> caver.rpc.governance.getNodeAddress().then(console.log)
0xbeafcca672100a88a953fcf5e882cb763f9e3de9
```

## caver.rpc.governance.getItemsAt<a id="caver-rpc-governance-getitemsat"></a>

```javascript
caver.rpc.governance.getItemsAt([blockNumberOrTag] [, callback])
```

특정 블록에서의 거버넌스 항목을 반환합니다. 이는 해당 블록의 이전 투표 결과이며, 입력으로 받은 블록 번호에서 체인의 환경설정을 하는 데에 사용됩니다.

**Parameters**

| 이름               | 타입                   | 설명                                                                                              |
| ---------------- | -------------------- | ----------------------------------------------------------------------------------------------- |
| blockNumberOrTag | number &#124; string | (선택 사항) 블록 넘버, 또는 `latest`, `earliest`, `pending` 문자열 중 하나입니다. 이 값을 생략하면 `latest`가 기본값으로 사용됩니다. |
| callback         | function             | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 파라미터로, 결과를 두 번째 파라미터로 반환합니다.                              |

**리턴값**

`Promise`는 `object`를 반환합니다.

| 타입     | 설명           |
| ------ | ------------ |
| object | 거버넌스 항목들입니다. |

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
caver.rpc.governance.getPendingChanges([callback])
```

pendingChanges은 충분한 표를 받았지만, 아직 확정되지 않은 항목들의 목록을 반환합니다. 현재 투표 기간이 끝날 때 이 항목들은 확정되어 그 결과가 다음 투표 기간 이후의 투표 기간부터 적용됩니다.

**Parameters**

| 이름       | 타입       | 설명                                                                 |
| -------- | -------- | ------------------------------------------------------------------ |
| callback | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 파라미터로, 결과를 두 번째 파라미터로 반환합니다. |

**리턴값**

`Promise`는 `object`를 반환합니다.

| 타입     | 설명                          |
| ------ | --------------------------- |
| object | 현재 보류 중인 변경 항목들의 키-밸류 쌍입니다. |

**예시**

```javascript
> caver.rpc.governance.getPendingChanges().then(console.log)
{ 'governance.governancemode': 'single' }
```

## caver.rpc.governance.getIdxCache<a id="caver-rpc-governance-getidxcache"></a>

```javascript
caver.rpc.governance.getIdxCache([callback])
```

메모리 캐시 내 현재 idxCache 배열을 반환합니다. idxCache는 거버넌스 내용이 변경되었던 블록 번호를 담고 있습니다. 캐시는 최대 1,000개의 블록 번호까지 담을 수 있도록 기본 설정되어 있습니다.

**Parameters**

| 이름       | 타입       | 설명                                                                 |
| -------- | -------- | ------------------------------------------------------------------ |
| callback | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 파라미터로, 결과를 두 번째 파라미터로 반환합니다. |

**리턴값**

`Promise`는 `object`를 반환합니다.

| 타입    | 설명                        |
| ----- | ------------------------- |
| Array | 거버넌스 내용이 변경되었던 블록의 번호입니다. |

**예시**

```javascript
> caver.rpc.governance.getIdxCache().then(console.log)
[ 0, 60, 321180 ]
```

## caver.rpc.governance.getIdxCacheFromDb<a id="caver-rpc-governance-getidxcachefromdb"></a>

```javascript
caver.rpc.governance.getIdxCacheFromDb([callback])
```

거버넌스에 변화가 한번이라도 있었던 블록의 번호를 포함하는 배열을 반환합니다. idxCacheFromDb의 결과의 길이는 [idxCache](#caver-rpc-governance-getidxcache)와 같거나 더 깁니다.

**Parameters**

| 이름       | 타입       | 설명                                                                 |
| -------- | -------- | ------------------------------------------------------------------ |
| callback | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 파라미터로, 결과를 두 번째 파라미터로 반환합니다. |

**리턴값**

`Promise`는 `object`를 반환합니다.

| 타입    | 설명                        |
| ----- | ------------------------- |
| Array | 거버넌스 내용이 변경되었던 블록의 번호입니다. |

**예시**

```javascript
> caver.rpc.governance.getIdxCacheFromDb().then(console.log)
[ 0, 60, 321180 ]
```

## caver.rpc.governance.getItemCacheFromDb<a id="caver-rpc-governance-getitemcachefromdb"></a>

```javascript
caver.rpc.governance.getItemCacheFromDb([callback])
```

특정 블록에 저장된 거버넌스 정보를 반환합니다. 해당 블록에 변경 사항이 저장되어 있지 않다면 함수는 null을 반환합니다.

**Parameters**

| 이름       | 타입       | 설명                                                                 |
| -------- | -------- | ------------------------------------------------------------------ |
| callback | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 파라미터로, 결과를 두 번째 파라미터로 반환합니다. |

**Parameters**

| 이름          | 타입                   | 설명                                          |
| ----------- | -------------------- | ------------------------------------------- |
| blockNumber | number &#124; string | 거버넌스 내용 변경이 이루어졌는지 확인할 블록의 번호, 16진수 문자열입니다. |

**리턴값**

`Promise`는 `object`를 반환합니다.

| 타입     | 설명                     |
| ------ | ---------------------- |
| object | 특정 블록에 저장된 거버넌스 정보입니다. |

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

## caver.rpc.governance.getVotes <a id="caver-rpc-governance-getvotes"></a>

```javascript
caver.rpc.governance.getVotes([callback])
```

투표 주기 내 모든 노드의 투표 상태를 반환합니다. 각 블록의 헤더로부터 이러한 정보가 수집됩니다.

**Parameters**

| 이름       | 타입       | 설명                                                                 |
| -------- | -------- | ------------------------------------------------------------------ |
| callback | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 파라미터로, 결과를 두 번째 파라미터로 반환합니다. |

**리턴값**

`Promise`는 `object`를 반환합니다.

| 타입    | 설명                            |
| ----- | ----------------------------- |
| Array | 키, 값, 노드 주소로 구성된 현재 투표 정보입니다. |

**예시**

```javascript
> caver.rpc.governance.getVotes().then(console.log)
[{
    key: 'reward.minimumstake',
    validator: '0xe733cb4d279da696f30d470f8c04decb54fcb0d2',
    value: '5000000'
}, {
    key: 'reward.useginicoeff',
    validator: '0xa5bccb4d279419abe2d470f8c04dec0789ac2d54',
    value: false
}]
```

## caver.rpc.governance.getStakingInfo <a id="caver-rpc-governance-getstakinginfo"></a>

```javascript
caver.rpc.governance.getStakingInfo([blockNumberOrTag] [, callback])
```

특정 블록에서의 스테이킹 정보를 반환합니다.

**Parameters**

| 이름               | 타입                   | 설명                                                                                              |
| ---------------- | -------------------- | ----------------------------------------------------------------------------------------------- |
| blockNumberOrTag | number &#124; string | (선택 사항) 블록 넘버, 또는 `latest`, `earliest`, `pending` 문자열 중 하나입니다. 이 값을 생략하면 `latest`가 기본값으로 사용됩니다. |
| callback         | function             | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 파라미터로, 결과를 두 번째 파라미터로 반환합니다.                              |

**리턴값**

`Promise`는 `object`를 반환합니다.

| 타입     | 설명                                                                                                                                       |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| object | 스테이킹 정보입니다. 반환값의 대한 설명은 [governance_getStakingInfo](../../../../json-rpc/api-references/governance.md#governance_getstakinginfo)을 참고하세요. |

**예시**

```javascript
> caver.rpc.governance.getStakingInfo().then(console.log)
{
  BlockNum: 321600,
  CouncilNodeAddrs: [],
  CouncilStakingAddrs: [],
  CouncilRewardAddrs: [],
  KIRAddr: '0x0000000000000000000000000000000000000000',
  KGFAddr: '0x0000000000000000000000000000000000000000',
  UseGini: false,
  Gini: -1,
  CouncilStakingAmounts: []
}
```
