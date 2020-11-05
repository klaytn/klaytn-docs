---
description: >-
  Klaytn 거버넌스와 관련한 API입니다.
---

# Namespace governance <a id="namespace-governance"></a>

네트워크 거버넌스를 위해 Klaytn은 다음과 같이 `governance` namespace의 API를 제공합니다.

Klaytn에는 세 가지 거버넌스 모드가 있습니다.
* `none`: 네트워크에 참여하는 모든 노드는 환경설정을 변경할 권리가 있습니다.
* `single`: 오직 하나의 특정 노드가 환경설정을 변경할 권리를 가집니다.
* `ballot`: 의결권이 있는 모든 노드가 환경설정 변경에 투표할 수 있습니다. 전체 의결권 중 절반 이상이 모이면 해당 의제는 통과됩니다.


## governance_vote <a id="governance_vote"></a>

`vote` 메서드는 새로운 투표를 제출합니다. 거버넌스 모드에 의거하여 노드가 의결권을 가지면 투표할 수 있습니다. 그렇지 않으면 오류 메시지가 반환되고 투표 행위가 무시됩니다.

**매개변수**

- `Key` : 변경하고자 하는 환경설정의 이름입니다. 키는 `domain.field`의 형식으로 되어 있습니다.
- `Value` : 각 키에 대한 다양한 형태의 값입니다.

| Key                            | 설명                                                                                                                                               |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `"governance.governancemode"`  | `STRING`. 세 거버넌스 모드 중 하나입니다. `"none"`, `"single"`, `"ballot"` 등 세 가지 모드 중 하나를 선택합니다.                                                             |
| `"governance.governingnode"`   | `ADDRESS`. 거버넌스를 통제하는 특정 노드의 주소입니다. 거버넌스 모드가 `"single"`인 경우에만 해당합니다. 예를 들어, `"0xe733cb4d279da696f30d470f8c04decb54fcb0d2"`입니다.                   |
| `"governance.unitprice"`       | `NUMBER`. 가스당 가격입니다. 예를 들어, `25000000000`입니다.                                                                                                    |
| `"governance.addvalidator"`    | `ADDRESS`. 새로운 검증자 후보의 주소입니다. 예를 들어, `0xe733cb4d279da696f30d470f8c04decb54fcb0d2`입니다.                                                            |
| `"governance.removevalidator"` | `ADDRESS`. 제거될 검증자의 주소입니다. 예를 들어, `0xe733cb4d279da696f30d470f8c04decb54fcb0d2`입니다.                                                               |
| `"istanbul.epoch"`             | `NUMBER`. 표를 수집할 블록 단위의 시간입니다. 투표 기간이 종료되면 기간을 넘긴 투표는 무효가 됩니다. 예를 들어, `86400`입니다.                                                                |
| `"istanbul.committeesize"`     | `NUMBER`. The number of validators in a committee.(`sub` in chain configuration) e.g., `7`                                                       |
| `"reward.mintingamount"`       | `STRING`. 블록이 생성될 때 발행되는 peb의 양입니다. 값에는 큰따옴표가 필요합니다. 예를 들어, `"9600000000000000000"`입니다.                                                          |
| `"reward.ratio"`               | `STRING`. `"/"`으로 구분되는 <0>CN/KIR/PoC</0>의 분포 비율입니다. 각 값의 합은 `100`이어야 합니다. 예를 들어, `"34/54/12"`은 CN이 34%, PoC이 54%, KIR이 12%를 차지하고 있다는 것입니다.       |
| `"reward.useginicoeff"`        | `BOOL`. 지니(GINI) 계수 사용 여부입니다 `true` 또는 `false`로 설정합니다.                                                                                           |
| `"reward.deferredtxfee"`       | `BOOL`. 트랜잭션 수수료를 제안자에게 지급하는 방법입니다. true이면 트랜잭션 수수료는 블록 보상과 합산되어 제안자, KIR, PoC에게 분배됩니다. false이면 트랜잭션 수수료가 제안자에게 지급됩니다. `true` 또는 `false`로 설정합니다. |
| `"reward.minimumstake"`        | `STRING`. Amount of Klay required to be a CN (Consensus Node). 값에는 큰 따옴표가 필요합니다. 예를 들어, `"5000000"`입니다.                                          |


**리턴값**

| 형식     | 설명           |
| ------ | ------------ |
| String | 투표 제출 결과입니다. |

**예시**

```javascript
> governance.vote ("governance.governancemode", "ballot")
"Your vote was successfully placed."

> governance.vote ("governance.governingnode", "0x12345678990123456789901234567899012345678990")
"Your vote was successfully placed."

> governance.vote("istanbul.epoch", 604800)
"Your vote was successfully placed."

> governance.vote("governance.unitprice", 25000000000)
"Your vote was successfully placed."

> governance.vote("istanbul.committeesize", 7)
"Your vote was successfully placed."

> governance.vote("reward.mintingamount", "9600000000000000000")
"Your vote was successfully placed."

> governance.vote("reward.ratio", "40/30/30")
"Your vote was successfully placed."

> governance.vote("reward.useginicoeff", false)
"Your vote was successfully placed."

// If wrong data are given
> governance.vote("reward.ratio", 100)
"Your vote couldn't be placed. Please check your vote's key and value"

> governance.vote("governance.governingnode", 1234)
"Your vote couldn't be placed. Please check your vote's key and value"

// when `governancemode` is "single" and the node is not `governingnode`
> governance.vote("governance.governancemode", "ballot")
"You don't have the right to vote"
```


## governance_showTally <a id="governance_showtally"></a>

`showTally` 속성은 거버넌스 투표의 현재 집계를 제공합니다. 집계된 찬성률을 백분율로 나타냅니다. 50%가 넘으면 해당 의제는 통과됩니다.

**매개변수**

없음

**리턴값**

| 형식    | 설명                         |
| ----- | -------------------------- |
| Tally | 각 표의 가중치를 고려한 찬성률의 백분율입니다. |

**예시**

```javascript
> governance.showTally
[{
    ApprovalPercentage: 36.2,
    Key: "unitprice",
    Value: 25000000000
}, {
    ApprovalPercentage: 72.5,
    Key: "mintingamount",
    Value: "9600000000000000000"
}]
```


## governance_totalVotingPower <a id="governance_totalvotingpower"></a>

`totalVotingPower` 속성은 CN들이 보유한 의결권 합계를 나타냅니다. 각 CN은 1.0 ~ 2.0의 의결권을 가집니다. `"none"`, `"single"` 거버넌스 모드에서는 `totalVotingPower` 속성을 통해 제공하는 정보가 없습니다.

**매개변수**

없음

**리턴값**

| 형식    | 설명                      |
| ----- | ----------------------- |
| Float | 총 의결권 또는 오류 메시지를 반환합니다. |

**예시**

```javascript
// In "ballot" governance mode
> governance.totalVotingPower
32.452

// In "none", "single" governance mode
> governance.totalVotingPower
"In current governance mode, voting power is not available"
```


## governance_myVotingPower <a id="governance_myvotingpower"></a>

`myVotingPower` 속성은 나의 노드가 보유한 의결권을 나타냅니다. The voting power can be 1.0 ~ 2.0. In `"none"`, `"single"` governance mode, `totalVotingPower` don't provide any information.

**매개변수**

없음

**리턴값**

| 형식    | 설명                        |
| ----- | ------------------------- |
| Float | 노드의 의결권 또는 오류 메시지를 반환합니다. |

**예시**

```javascript
// In "ballot" governance mode
> governance.myVotingPower
1.323

// In "none", "single" governance mode
> governance.myVotingPower
"In current governance mode, voting power is not available"
```


## governance_myVotes <a id="governance_myvotes"></a>

`myVotes` 속성은 투표 기간 동안의 나의 투표 정보를 나타냅니다. 사용자의 노드가 새로운 블록을 생성할 때 각 투표가 블록에 저장됩니다. 현재 투표 기간이 종료되면 이 정보는 사라집니다.

**매개변수**

없음

**리턴값**

| 형식        | 설명                                                                                                                                                                                                                                                      |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Vote List | Node's Voting status in the epoch<br />- `BlockNum`: The block number that this vote is stored<br />- `Casted`: If this vote is stored in a block or not<br />- `Key/Value`: The content of the vote |

**예시**

```javascript
> governance.vote("governance.governancemode", "ballot")
"Your vote was successfully placed."

> governance.myVotes
[{
    BlockNum: 403,
    Casted: true,
    Key: "governance.governancemode",
    Value: "ballot"
}]

```


## governance_chainConfig <a id="governance_chainconfig"></a>

`chainConfig` 속성은 초기 체인 환경설정을 나타냅니다. 이 속성은 초기 환경설정만 저장하기 때문에 투표에 의해 거버넌스에 변경 사항이 있다면 `chainConfig`의 결과는 현재 상태와 달라질 것입니다. 현재 정보를 확인하려면 `itemsAt`을 사용하세요.

**매개변수**

없음

**리턴값**

| 형식   | 설명              |
| ---- | --------------- |
| JSON | 현재 체인의 환경설정입니다. |

**예시**

```javascript
> governance.chainConfig
{
  chainId: 1001,
  deriveShaImpl: 2,
  governance: {
    governanceMode: "ballot",
    governingNode: "0xe733cb4d279da696f30d470f8c04decb54fcb0d2",
    reward: {
      deferredTxFee: true,
      minimumStake: 5000000,
      mintingAmount: 9600000000000000000,
      proposerUpdateInterval: 3600,
      ratio: "34/54/12",
      stakingUpdateInterval: 20,
      useGiniCoeff: false
    }
  },
  istanbul: {
    epoch: 20,
    policy: 2,
    sub: 1
  },
  unitPrice: 25000000000
}
```


## governance_nodeAddress <a id="governance_nodeaddress"></a>

`nodeAddress` 속성은 사용자가 사용하고 있는 노드의 주소를 나타냅니다. nodekey에서 파생되어 합의 메시지를 서명하는 데에 사용됩니다. 그리고 `"governingnode"`의 값은 검증자의 노드 중 하나의 주소가 되어야 합니다.

**매개변수**

없음

**리턴값**

| 형식      | 설명                  |
| ------- | ------------------- |
| ADDRESS | 노드의 20바이트 길이 주소입니다. |

**예시**

```javascript
> governance.nodeAddress
"0xe733cb4d279da696f30d470f8c04decb54fcb0d2"
```

## governance_itemsAt <a id="governance_itemsat"></a>

`itemsAt`은 특정 블록에서의 거버넌스 항목을 반환합니다. 이는 해당 블록의 이전 투표 결과이며, 입력으로 받은 블록 번호에서 체인의 환경설정을 하는 데에 사용됩니다.

**매개변수**

| 형식                  | 설명                                                                                                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| QUANTITY &#124; TAG | Integer of a block number, or the string `"earliest"`, `"latest"` or `"pending"`, as in the [default block parameter](./klay/block.md#the-default-block-parameter). |

**리턴값**

| 형식   | 설명           |
| ---- | ------------ |
| JSON | 거버넌스 항목들입니다. |

**예시**

```javascript
> governance.itemsAt(89)
{
 governance.governancemode: "single",
 governance.governingnode: "0x7bf29f69b3a120dae17bca6cf344cf23f2daf208",
 governance.unitprice: 25000000000,
 istanbul.committeesize: 13,
 istanbul.epoch: 30,
 istanbul.policy: 2,
 reward.deferredtxfee: true,
 reward.minimumstake: "5000000",
 reward.mintingamount: "9600000000000000000",
 reward.proposerupdateinterval: 30,
 reward.ratio: "34/54/12",
 reward.stakingupdateinterval: 60,
 reward.useginicoeff: true
}
```
## governance_pendingChanges <a id="governance_pendingchanges"></a>

`pendingChanges`은 충분한 표를 받았지만, 아직 확정되지 않은 항목들의 목록을 반환합니다. 현재 투표 기간이 끝날 때 이 항목들은 확정되어 그 결과가 다음 투표 기간 이후의 투표 기간부터 적용됩니다.

**매개변수**

없음

**리턴값**

| 형식        | 설명                          |
| --------- | --------------------------- |
| Vote List | 현재 보류 중인 변경 항목들의 키-밸류 쌍입니다. |

**예시**
```javascript
> governance.pendingChanges
{
  reward.minimumstake: "5000000",
  reward.useginicoeff: false
}
```

## governance_votes <a id="governance_votes"></a>

`votes`는 투표 기간 중 모든 노드의 투표 상태를 반환합니다. 각 블록의 헤더로부터 이러한 정보가 수집됩니다.

**매개변수**

없음

**리턴값**

| 형식        | 설명                            |
| --------- | ----------------------------- |
| Vote List | 키, 값, 노드 주소로 구성된 현재 투표 정보입니다. |

**예시**
```javascript
> governance.votes
[{
    key: "reward.minimumstake",
    validator: "0xe733cb4d279da696f30d470f8c04decb54fcb0d2",
    value: "5000000"
}, {
    key: "reward.useginicoeff",
    validator: "0xa5bccb4d279419abe2d470f8c04dec0789ac2d54",
    value: false
}]
```

## governance_idxCache <a id="governance_idxcache"></a>
`idxCache` 속성은 메모리 캐시 내의 현재 idxCache 배열을 반환합니다. idxCache는 거버넌스 내용이 변경되었던 블록 번호를 담고 있습니다. 캐시는 최대 1,000개의 블록 번호까지 담을 수 있도록 기본 설정되어 있습니다.

**매개변수**

없음

**리턴값**

| 형식        | 설명                        |
| --------- | ------------------------- |
| uint64 배열 | 거버넌스 내용이 변경되었던 블록의 번호입니다. |

**예시**
```javascript
> governance.idxCache
[0, 30]
```

## governance_idxCacheFromDb <a id="governance_idxcachefromdb"></a>
`idxCacheFromDb`는 거버넌스 내용 변경이 이루어졌던 모든 블록의 번호를 배열로 반환합니다. `idxCacheFromDb`의 결과의 길이는 `idxCache`의 그것 이상입니다.

**매개변수**

없음

**리턴값**

| 형식        | 설명                           |
| --------- | ---------------------------- |
| uint64 배열 | 거버넌스 내용이 변경되었던 모든 블록의 번호입니다. |

**예시**
```javascript
> governance.idxCacheFromDb
[0, 30]
```

## governance_itemCacheFromDb <a id="governance_itemcachefromdb"></a>
`itemCacheFromDb`는 입력으로 받은 블록에 저장된 거버넌스 정보를 반환합니다. 해당 블록에 변경 사항이 저장되어 있지 않다면 함수는 `null`을 반환합니다.

**매개변수**

| 형식     | 설명                                |
| ------ | --------------------------------- |
| uint64 | 거버넌스 내용 변경이 이루어졌는지 확인할 블록의 번호입니다. |

**리턴값**

| 형식   | 설명                          |
| ---- | --------------------------- |
| JSON | 입력으로 받은 블록에 저장된 거버넌스 정보입니다. |

**예시**
```javascript
> governance.itemCacheFromDb(0)
{
  governance.governancemode: "single",
  governance.governingnode: "0xe733cb4d279da696f30d470f8c04decb54fcb0d2",
  governance.unitprice: 25000000000,
  istanbul.committeesize: 1,
  istanbul.epoch: 30,
  istanbul.policy: 2,
  reward.deferredtxfee: true,
  reward.minimumstake: "5000000",
  reward.mintingamount: "9600000000000000000",
  reward.proposerupdateinterval: 3600,
  reward.ratio: "34/54/12",
  reward.stakingupdateinterval: 20,
  reward.useginicoeff: false
}
```
