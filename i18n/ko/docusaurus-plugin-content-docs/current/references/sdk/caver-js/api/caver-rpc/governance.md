# caver.rpc.governance

`caver.rpc.governance`는 `governance` 네임스페이스를 가진 JSON-RPC 호출을 제공합니다.

## caver.rpc.governance.vote <a id="caver-rpc-governance-vote"></a>

```javascript
caver.rpc.governance.vote(key, value [, callback])
```

새 투표를 제출합니다. 거버넌스 모드에 따라 노드에 투표 권한이 있는 경우 투표를 제출할 수 있습니다. 그렇지 않은 경우 오류가 발생하고 투표가 무시됩니다.

**매개변수**

| 이름       | 유형                          | 설명                                                                                 |
| -------- | --------------------------- | ---------------------------------------------------------------------------------- |
| key      | string                      | 변경할 구성 설정의 이름입니다. 키의 형식은 "domain.field"입니다.                                        |
| value    | string \| number \| boolean | 각 키에 대한 다양한 유형의 값입니다.                                                              |
| callback | Function                    | (선택 사항) 첫 번째 매개 변수로 오류 객체를 반환하고 두 번째 매개 변수로 결과를 반환하는 선택적 콜백입니다. |

For more details about the `key` and `value` for `caver.rpc.governance.vote`, please refer to [governance_vote](../../../../../json-rpc/governance/vote).

**리턴 값**

`Promise`는 `string`을 반환합니다.

| 유형     | 설명           |
| ------ | ------------ |
| string | 투표 제출 결과입니다. |

**예시**

```javascript
> caver.rpc.governance.vote('governance.governancemode', 'ballot').then(console.log)
Your vote was successfully placed.
```

## caver.rpc.governance.showTally <a id="caver-rpc-governance-showtally"></a>

```javascript
caver.rpc.governance.showTally([callback])
```

거버넌스 투표의 현재 집계 결과를 제공합니다. 총 찬성률이 백분율로 표시됩니다. 찬성률이 50%를 넘으면 제안된 변경 사항이 통과됩니다.

**매개변수**

| 이름       | 유형       | 설명                                                                               |
| -------- | -------- | -------------------------------------------------------------------------------- |
| callback | Function | (선택 사항) 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환하는 선택적 콜백입니다. |

**리턴 값**

`Promise`는 `Array`를 반환합니다.

| 유형    | 설명                              |
| ----- | ------------------------------- |
| Array | 투표의 값과 백분율로 표시된 찬성률이 포함된 배열입니다. |

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

## caver.rpc.governance.getTotalVotingPower <a id="caver-rpc-governance-gettotalvotingpower"></a>

```javascript
caver.rpc.governance.getTotalVotingPower([callback])
```

CN이 보유한 모든 투표권의 합계를 제공합니다. 각 CN은 1.0\~2.0의 투표권을 가집니다. `"none"` 및 `"single"` 거버넌스 모드에서 `totalVotingPower`는 어떠한 정보도 제공하지 않습니다.

**매개변수**

| 이름       | 유형       | 설명                                                                               |
| -------- | -------- | -------------------------------------------------------------------------------- |
| callback | Function | (선택 사항) 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환하는 선택적 콜백입니다. |

**리턴 값**

`Promise`는 `number`를 반환합니다.

| 유형     | 설명     |
| ------ | ------ |
| number | 총 투표권. |

**예시**

```javascript
> caver.rpc.governance.getTotalVotingPower().then(console.log)
3
```

## caver.rpc.governance.getMyVotingPower <a id="caver-rpc-governance-getmyvotingpower"></a>

```javascript
caver.rpc.governance.getMyVotingPower([callback])
```

노드의 투표권을 제공합니다. 투표권은 1.0 \~ 2.0 사이일 수 있습니다. `"none"` 및 `"single"` 거버넌스 모드에서 `totalVotingPower`는 어떠한 정보도 제공하지 않습니다.

**매개변수**

| 이름       | 유형       | 설명                                                                               |
| -------- | -------- | -------------------------------------------------------------------------------- |
| callback | Function | (선택 사항) 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환하는 선택적 콜백입니다. |

**리턴 값**

`Promise`는 `number`를 반환합니다.

| 유형     | 설명       |
| ------ | -------- |
| number | 노드의 투표권. |

**예시**

```javascript
> caver.rpc.governance.getMyVotingPower().then(console.log)
1
```

## caver.rpc.governance.getMyVotes <a id="caver-rpc-governance-getmyvotes"></a>

```javascript
caver.rpc.governance.getMyVotes([callback])
```

해당 epoch에서 내 투표 정보를 제공합니다. 각 투표는 사용자 노드가 새 블록을 생성할 때 블록에 저장됩니다. 현재 epoch가 종료되면 이 정보는 지워집니다.

**매개변수**

| 이름       | 유형       | 설명                                                                                 |
| -------- | -------- | ---------------------------------------------------------------------------------- |
| callback | Function | (선택 사항) 첫 번째 매개 변수로 오류 객체를 반환하고 두 번째 매개 변수로 결과를 반환하는 선택적 콜백입니다. |

**리턴 값**

`Promise`는 `Array`를 반환합니다.

| 유형    | 설명                    |
| ----- | --------------------- |
| Array | epoch 내 노드의 투표 상태입니다. |

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

## caver.rpc.governance.getChainConfig <a id="caver-rpc-governance-getchainconfig"></a>

```javascript
caver.rpc.governance.getChainConfig([callback])
```

초기 체인 구성을 제공합니다. 초기 구성만 저장하기 때문에 투표를 통해 거버넌스가 변경된 경우 chainConfig의 결과는 현재 상태와 다를 수 있습니다. 현재 정보를 확인하려면 itemAt을 사용하세요.

**매개변수**

| 이름       | 유형       | 설명                                                                                 |
| -------- | -------- | ---------------------------------------------------------------------------------- |
| callback | Function | (선택 사항) 첫 번째 매개 변수로 오류 객체를 반환하고 두 번째 매개 변수로 결과를 반환하는 선택적 콜백입니다. |

**리턴 값**

`promise`는 `object`를 반환합니다.

| 유형     | 설명       |
| ------ | -------- |
| object | 초기 체인 구성 |

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
      mintingAmount: 6400000000000000000,
      ratio: '50/40/10',
      useGiniCoeff: true,
      deferredTxFee: true,
      stakingUpdateInterval: 60,
      proposerUpdateInterval: 30,
      minimumStake: 5000000
    },
    kip71: {
      lowerboundbasefee: 25000000000,
      upperboundbasefee: 750000000000,
      gastarget: 30000000,
      maxblockgasusedforbasefee: 60000000,
      basefeedenominator: 20
    }
  }
}
```

## caver.rpc.governance.getNodeAddress <a id="caver-rpc-governance-getnodeaddress"></a>

```javascript
caver.rpc.governance.getNodeAddress([callback])
```

사용자가 사용 중인 노드의 주소를 제공합니다. 노드키에서 파생되며 합의 메시지에 서명하는 데 사용됩니다. 그리고 "governingnode"의 값은 검증자의 노드 주소 중 하나이어야 합니다.

**매개변수**

| 이름       | 유형       | 설명                                                                                 |
| -------- | -------- | ---------------------------------------------------------------------------------- |
| callback | Function | (선택 사항) 첫 번째 매개 변수로 오류 객체를 반환하고 두 번째 매개 변수로 결과를 반환하는 선택적 콜백입니다. |

**리턴 값**

`Promise`는 `string`을 반환합니다.

| 유형     | 설명         |
| ------ | ---------- |
| string | 노드의 주소입니다. |

**예시**

```javascript
> caver.rpc.governance.getNodeAddress().then(console.log)
0xbeafcca672100a88a953fcf5e882cb763f9e3de9
```

## caver.rpc.governance.getItemsAt <a id="caver-rpc-governance-getitemsat"></a>

```javascript
caver.rpc.governance.getItemsAt([blockNumberOrTag] [, callback])
```

특정 블록의 거버넌스 항목을 반환합니다. 이는 블록의 이전 투표 결과이며 지정된 블록 번호에서 체인의 구성으로 사용됩니다.

**매개변수**

| 이름               | 유형               | 설명                                                                                       |
| ---------------- | ---------------- | ---------------------------------------------------------------------------------------- |
| blockNumberOrTag | Number \| String | (선택 사항) 블록 번호 또는 `latest` 또는 `earliest` 문자열입니다. 생략하면 `latest`이 사용됩니다. |
| callback         | Function         | (선택 사항) 첫 번째 매개 변수로 오류 객체를 반환하고 두 번째 매개 변수로 결과를 반환하는 선택적 콜백입니다.       |

**리턴 값**

`promise`는 `object`를 반환합니다.

| 유형     | 설명       |
| ------ | -------- |
| object | 거버넌스 항목. |

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
  'kip71.basefeedenominator': 20,
  'kip71.gastarget': 30000000,
  'kip71.lowerboundbasefee': 25000000000,
  'kip71.maxblockgasusedforbasefee': 60000000,
  'kip71.upperboundbasefee': 750000000000,
  'reward.deferredtxfee': true,
  'reward.minimumstake': '5000000',
  'reward.mintingamount': '6400000000000000000',
  'reward.proposerupdateinterval': 30,
  'reward.ratio': '50/40/10',
  'reward.stakingupdateinterval': 60,
  'reward.useginicoeff': true
}

> caver.rpc.governance.getItemsAt('latest').then(console.log)
```

## caver.rpc.governance.getPendingChanges <a id="caver-rpc-governance-getpendingchanges"></a>

```javascript
caver.rpc.governance.getPendingChanges([callback])
```

충분한 수의 투표를 받았지만 아직 확정되지 않은 항목의 목록을 반환합니다. 현재 epoch가 끝나면 이러한 변경 사항이 최종 확정되고 다음 epoch 이후의 epoch부터 결과가 적용됩니다.

**매개변수**

| 이름       | 유형       | 설명                                                                                 |
| -------- | -------- | ---------------------------------------------------------------------------------- |
| callback | Function | (선택 사항) 첫 번째 매개 변수로 오류 객체를 반환하고 두 번째 매개 변수로 결과를 반환하는 선택적 콜백입니다. |

**리턴 값**

`promise`는 `object`를 반환합니다.

| 유형     | 설명                          |
| ------ | --------------------------- |
| object | 키와 값으로 구성된 현재 미확정 변경 사항입니다. |

**예시**

```javascript
> caver.rpc.governance.getPendingChanges().then(console.log)
{ 'governance.governancemode': 'single' }
```

## caver.rpc.governance.getIdxCache <a id="caver-rpc-governance-getidxcache"></a>

```javascript
caver.rpc.governance.getIdxCache([callback])
```

메모리 캐시에 있는 현재 idxCache의 배열을 반환합니다. idxCache에는 거버넌스 변경이 발생한 블록 번호가 포함되어 있습니다. 캐시에는 기본적으로 최대 1000개의 블록 번호가 메모리에 저장될 수 있습니다.

**매개변수**

| 이름       | 유형       | 설명                                                                                 |
| -------- | -------- | ---------------------------------------------------------------------------------- |
| callback | Function | (선택 사항) 첫 번째 매개 변수로 오류 객체를 반환하고 두 번째 매개 변수로 결과를 반환하는 선택적 콜백입니다. |

**리턴 값**

`promise`는 `object`를 반환합니다.

| 유형    | 설명                     |
| ----- | ---------------------- |
| Array | 거버넌스 변경이 발생한 블록 번호입니다. |

**예시**

```javascript
> caver.rpc.governance.getIdxCache().then(console.log)
[ 0, 60, 321180 ]
```

## caver.rpc.governance.getIdxCacheFromDb <a id="caver-rpc-governance-getidxcachefromdb"></a>

```javascript
caver.rpc.governance.getIdxCacheFromDb([callback])
```

거버넌스 변경이 발생한 모든 블록 번호가 포함된 배열을 반환합니다. idxCacheFromDb의 결과는 [idxCache](#caver-rpc-governance-getidxcache)의 결과와 같거나 더 길어집니다.

**매개변수**

| 이름       | 유형       | 설명                                                                                 |
| -------- | -------- | ---------------------------------------------------------------------------------- |
| callback | Function | (선택 사항) 첫 번째 매개 변수로 오류 객체를 반환하고 두 번째 매개 변수로 결과를 반환하는 선택적 콜백입니다. |

**리턴 값**

`promise`는 `object`를 반환합니다.

| 유형    | 설명                     |
| ----- | ---------------------- |
| Array | 거버넌스 변경이 발생한 블록 번호입니다. |

**예시**

```javascript
> caver.rpc.governance.getIdxCacheFromDb().then(console.log)
[ 0, 60, 321180 ]
```

## caver.rpc.governance.getItemCacheFromDb <a id="caver-rpc-governance-getitemcachefromdb"></a>

```javascript
caver.rpc.governance.getItemCacheFromDb([callback])
```

주어진 블록에 저장된 거버넌스 정보를 반환합니다. 지정된 블록에 변경 사항이 저장되어 있지 않으면 이 함수는 null을 반환합니다.

**매개변수**

| 이름       | 유형       | 설명                                                                                 |
| -------- | -------- | ---------------------------------------------------------------------------------- |
| callback | Function | (선택 사항) 첫 번째 매개 변수로 오류 객체를 반환하고 두 번째 매개 변수로 결과를 반환하는 선택적 콜백입니다. |

**매개변수**

| 이름          | 유형               | 설명                                                |
| ----------- | ---------------- | ------------------------------------------------- |
| blockNumber | Number \| String | 블록 번호 또는 블록에 적용된 거버넌스 변경 사항을 쿼리하기 위한 16진수 문자열입니다. |

**리턴 값**

`promise`는 `object`를 반환합니다.

| 유형     | 설명                   |
| ------ | -------------------- |
| object | 주어진 블록에 저장된 거버넌스 정보. |

**예시**

```javascript
> caver.rpc.governance.getItemCacheFromDb(540).then(console.log)
{
  'governance.governancemode': 'single',
  'governance.governingnode': '0xbeafcca672100a88a953fcf5e882cb763f9e3de9',
  'governance.unitprice': 25000000000,
  'istanbul.committeesize': 22,
  'istanbul.epoch': 30,
  'istanbul.policy': 2,
  'kip71.basefeedenominator': 30,
  'kip71.gastarget': 30000000,
  'kip71.lowerboundbasefee': 25000000000,
  'kip71.maxblockgasusedforbasefee': 60000000,
  'kip71.upperboundbasefee': 750000000000,
  'reward.deferredtxfee': true,
  'reward.minimumstake': '5000000',
  'reward.mintingamount': '6400000000000000000',
  'reward.proposerupdateinterval': 30,
  'reward.ratio': '50/40/10',
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

해당 epoch의 모든 노드의 투표를 반환합니다. 이러한 투표는 각 블록의 헤더에서 수집됩니다.

**매개변수**

| 이름       | 유형       | 설명                                                                                 |
| -------- | -------- | ---------------------------------------------------------------------------------- |
| callback | Function | (선택 사항) 첫 번째 매개 변수로 오류 객체를 반환하고 두 번째 매개 변수로 결과를 반환하는 선택적 콜백입니다. |

**리턴 값**

`promise`는 `object`를 반환합니다.

| 유형    | 설명                         |
| ----- | -------------------------- |
| Array | 키, 값, 노드 주소로 구성된 현재 투표입니다. |

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

특정 블록의 스테이킹 정보를 반환합니다.

**매개변수**

| 이름               | 유형               | 설명                                                                                       |
| ---------------- | ---------------- | ---------------------------------------------------------------------------------------- |
| blockNumberOrTag | Number \| String | (선택 사항) 블록 번호 또는 `latest` 또는 `earliest` 문자열입니다. 생략하면 `latest`이 사용됩니다. |
| callback         | Function         | (선택 사항) 첫 번째 매개 변수로 오류 객체를 반환하고 두 번째 매개 변수로 결과를 반환하는 선택적 콜백입니다.       |

**리턴 값**

`promise`는 `object`를 반환합니다.

| 유형     | 설명                                                                                                                                                              |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| object | 스테이킹 정보. Refer to [governance_getStakingInfo](../../../../../json-rpc/governance/get-staking-info) for a description of the return result. |

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
