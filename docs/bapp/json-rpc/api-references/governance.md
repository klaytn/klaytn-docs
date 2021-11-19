---
description: >-
  APIs related to the Klaytn Governance.
---

# Namespace governance <a id="namespace-governance"></a>

For the governance of the network, Klaytn provides the following APIs under `governance` namespace.

In Klaytn, there are three different governance modes.
* `none`: All nodes participating in the network have the right to change the configuration.
* `single`: Only one designated node has the right to change the configuration.
* `ballot`: All nodes which have voting power can vote for a change. When more than half of total voting power gathered, the vote passes.

Based on the governance mode, a proposer is able to cast a vote about network parameters such as unit price, minimum staking amount, etc.
In order to be a proposer, the candidate nodes are required to deposit a minimum amount of KLAY.
All the qualified nodes always are eligible to propose a block, but the chance is propositional to the stake amount.

When calculating the stake proportions to determine the number of slots to be assigned to proposers, it is possible that a slot may not be allocated any slots as a result of rounding numbers.
To a qualified node, however, it is guaranteed that a slot will be assigned.
If a node is not qualified - the node does not stake enough KLAY - it won't be given a chance to propose nor validate a block.

**Caveat**
- a governing node is always qualified in `single` mode as an exception.
- A vote will be casted when a block is proposed. This vote is applied after two epochs including the epoch where the block is proposed.

## governance_vote <a id="governance_vote"></a>

The `vote` method submits a new vote. If the node has the right to vote based on governance mode, the vote can be placed. If not, an error message will be returned and the vote will be ignored.

**Parameters**

- `Key` : Name of the configuration setting to be changed. Key has the form of `domain.field`
- `Value` : Various types of value for each key. 
  
| Key           | Description                                                  |
| -------------- | ------------------------------------------------------------ |
|`"governance.governancemode"`| `STRING`. One of the three governance modes. `"none"`, `"single"`, `"ballot"`|
| `"governance.governingnode"`| `ADDRESS`. Designated governing node's address. It only works if the governance mode is `"single"` e.g.,`"0xe733cb4d279da696f30d470f8c04decb54fcb0d2"` |
| `"governance.unitprice"`| `NUMBER`. Price of unit gas. e.g., `25000000000`|
| `"governance.addvalidator"`| `ADDRESS`. Address of a new validator candidate. e.g., `0xe733cb4d279da696f30d470f8c04decb54fcb0d2`|
| `"governance.removevalidator"`| `ADDRESS`. Address of a current validator which need to be removed. e.g., `0xe733cb4d279da696f30d470f8c04decb54fcb0d2`|
|`"istanbul.epoch"` | `NUMBER`. A period in which votes are gathered in blocks. When an epoch end, all votes which haven't been passed will be cleared. e.g., `86400`|
| `"istanbul.committeesize"`| `NUMBER`. The number of validators in a committee.(`sub` in chain configuration) e.g., `7`|
| `"reward.mintingamount"`| `STRING`. Amount of Peb minted when a block is generated. Double quotation marks are needed for a value. e.g., `"9600000000000000000"` |
| `"reward.ratio"`| `STRING`. Distribution rate for a CN/KGF/KIR separated by `"/"`. The sum of all values has to be `100`. e.g., `"34/54/12"` meaning CN 34%, KGF 54%, KIR 12% |
| `"reward.useginicoeff"`| `BOOL`. Use the Gini coefficient or not. `true`, `false`|
| `"reward.deferredtxfee"`| `BOOL`. The way of giving transaction fee to a proposer. If true, it means the tx fee will be summed up with block reward and distributed to the proposer, KIR and KGF. If not, all tx fee will be given to the proposer. `true`, `false`|
| `"reward.minimumstake"`| `STRING`. Amount of Klay required to be a CN (Consensus Node). Double quotation marks are needed for a value. e.g., `"5000000"`|


**Return Value**

| Type   | Description                          |
| ------ | ------------------------------------ |
| String | Result of vote submission |

**Example**

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

The `showTally` property provides the current tally of governance votes. It shows the aggregated approval rate in percentage. When it goes over 50%, the vote passes. 

**Parameters**

None

**Return Value**

| Type   | Description                          |
| ------ | ------------------------------------ |
| Tally  | Each vote's value and approval rate in percentage |

**Example**

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

The `totalVotingPower` property provides the sum of all voting power that CNs have. Each CN has 1.0 ~ 2.0 voting power.
In `"none"`, `"single"` governance mode, `totalVotingPower` don't provide any information. 

**Parameters**

None

**Return Value**

| Type   | Description                          |
| ------ | ------------------------------------ |
| Float  | Total Voting Power or error message  |

**Example**

```javascript
// In "ballot" governance mode
> governance.totalVotingPower
32.452

// In "none", "single" governance mode
> governance.totalVotingPower
"In current governance mode, voting power is not available"
```


## governance_myVotingPower <a id="governance_myvotingpower"></a>

The `myVotingPower` property provides the voting power of the node. The voting power can be 1.0 ~ 2.0.
In `"none"`, `"single"` governance mode, `totalVotingPower` don't provide any information. 

**Parameters**

None

**Return Value**

| Type   | Description                          |
| ------ | ------------------------------------ |
| Float  | Node's Voting Power or error message  |

**Example**

```javascript
// In "ballot" governance mode
> governance.myVotingPower
1.323

// In "none", "single" governance mode
> governance.myVotingPower
"In current governance mode, voting power is not available"
```


## governance_myVotes <a id="governance_myvotes"></a>

The `myVotes` property provides my vote information in the epoch. Each vote is stored in a block when the user's node generates a new block. After current epoch ends, this information is cleared.

**Parameters**

None

**Return Value**

| Type   | Description                          |
| ------ | ------------------------------------ |
| Vote List  | Node's Voting status in the epoch<br>- `BlockNum`: The block number that this vote is stored<br>- `Casted`: If this vote is stored in a block or not<br>- `Key/Value`: The content of the vote  |

**Example**

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

The `chainConfig` property provides the initial chain configuration. Because it just stores the initial configuration, if there were changes in the governance made by voting, the result of `chainConfig` will differ from the current states. To see the current information, please use `itemsAt`.

**Parameters**

None

**Return Value**

| Type   | Description                          |
| ------ | ------------------------------------ |
| JSON   | Current chain configuration  |

**Example**

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

The `nodeAddress` property provides the address of the node that a user is using. It is derived from the nodekey and used to sign consensus messages. And the value of `"governingnode"` has to be one of validator's node address.

**Parameters**

None

**Return Value**

| Type   | Description                          |
| ------ | ------------------------------------ |
| ADDRESS  | 20 BYTE address of a node  |

**Example**

```javascript
> governance.nodeAddress
"0xe733cb4d279da696f30d470f8c04decb54fcb0d2"
```

## governance_itemsAt <a id="governance_itemsat"></a>

The `itemsAt` returns governance items at specific block. It is the result of previous voting of the block and used as configuration for chain at the given block number.

**Parameters**

| Type          | Description                                                  |
| ------------- | ------------------------------------------------------------ |
| QUANTITY &#124; TAG | Integer or hexadecimal block number, or the string `"earliest"` or `"latest"` as in the [default block parameter](klay/block.md#the-default-block-parameter). |

{% hint style="success" %} 
NOTE: In versions earlier than Klaytn v1.7.0, only integer block number, the string `"earliest"` and `"latest"` are available.
{% endhint %}

**Return Value**x

| Type   | Description                          |
| ------ | ------------------------------------ |
| JSON   | governance items  |

**Example**

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

The `pendingChanges` returns the list of items that have received enough number of votes but not yet finalized. At the end of the current epoch, these changes will be finalized and the result will be in effect from the epoch after next epoch. 

**Parameters**

None

**Return Value**

| Type   | Description                          |
| ------ | ------------------------------------ |
| Vote List  | Currently pending changes composed of keys and values  |

**Example**
```javascript
> governance.pendingChanges
{
  reward.minimumstake: "5000000",
  reward.useginicoeff: false
}
```

## governance_votes <a id="governance_votes"></a>

The `votes` returns the votes from all nodes in the epoch. These votes are gathered from the header of each block.

**Parameters**

None

**Return Value**

| Type   | Description                          |
| ------ | ------------------------------------ |
| Vote List  | Current votes composed of keys, values and node addresses  |

**Example**
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
The `idxCache` property returns an array of current idxCache in the memory cache. idxCache contains the block numbers where governance change happened. The cache can have up to 1000 block numbers in memory by default.

**Parameters**

None

**Return Value**

| Type   | Description                          |
| ------ | ------------------------------------ |
| uint64 array  | Block numbers where governance change happened  |

**Example**
```javascript
> governance.idxCache
[0, 30]
```

## governance_idxCacheFromDb <a id="governance_idxcachefromdb"></a>
The `idxCacheFromDb` returns an array that contains all block numbers on which a governance change ever happened. The result of `idxCacheFromDb` is the same or longer than that of `idxCache`

**Parameters**

None

**Return Value**

| Type   | Description                          |
| ------ | ------------------------------------ |
| uint64 array  | Every block numbers where governance change happened  |

**Example**
```javascript
> governance.idxCacheFromDb
[0, 30]
```

## governance_itemCacheFromDb <a id="governance_itemcachefromdb"></a>
The `itemCacheFromDb` returns the governance information stored in the given block. If no changes were stored in the given block, the function returns `null`.

**Parameters**

| Type          | Description                                                  |
| ------------- | ------------------------------------------------------------ |
| uint64 | A block number to query the governance change made in the block. |

**Return Value**

| Type   | Description                          |
| ------ | ------------------------------------ |
| JSON  | Stored governance information at a given block  |

**Example**
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
## governance_getStakingInfo <a id="governance_getstakinginfo"></a>

The `getStakingInfo` returns staking information at a specific block. The result includes the following information.
- `BlockNum`: The block number at which the staking information is given.
- `CouncilNodeAddrs`: The addresses of the consensus node.
- `CouncilRewardAddrs`: The addresses to which the block reward of the associated nodes is sent.
- `CouncilStakingAddrs`: The contract addresses in which the associated nodes deploy for staking.
- `CouncilStakingAmounts`: The amount of KLAY which the associated nodes stake.
- `Gini`: Gini coefficient.
- `KIRAddr`: The contract address of KIR.
- `KGFAddr`: The contract address of KGF.
- `UseGini`: The boolean value whether or not the Gini coefficient is used.

Note that the order of all addresses and the staking amounts are matched.

**Parameters**

| Type          | Description                                                  |
| ------------- | ------------------------------------------------------------ |
| QUANTITY &#124; TAG | Integer of a block number, or the string `"earliest"`, `"latest"` or `"pending"`, as in the [default block parameter](./klay/block.md#the-default-block-parameter).

**Return Value**

| Type   | Description                          |
| ------ | ------------------------------------ |
| JSON   | Staking information |

**Example**

```javascript
> governance.getStakingInfo("latest")
{
  BlockNum: 57801600,
  CouncilNodeAddrs: ["0x99fb17d324fa0e07f23b49d09028ac0919414db6", "0x571e53df607be97431a5bbefca1dffe5aef56f4d", "0xb74ff9dea397fe9e231df545eb53fe2adf776cb2", "0x5cb1a7dccbd0dc446e3640898ede8820368554c8", "0x776817c0ef3d06d794cf01ae9afa33d7397b9b40", "0xc180ca565b34b5b63877674f5fe647e7da079022", "0x03497f51c31fe8b402df0bde90fd5a85f87aa943"],
  CouncilRewardAddrs: ["0xb2bd3178affccd9f9f5189457f1cad7d17a01c9d", "0x6559a7b6248b342bc11fbcdf9343212bbc347edc", "0x82829a60c6eac4e3e9d6ed00891c69e88537fd4d", "0xa86fd667c6a340c53cc5d796ba84dbe1f29cb2f7", "0x6e22cbe2b8bbd1df9f1d3c8ebae6d7ff5414a734", "0x24e593fb29731e54905025c230727dc28d229f77", "0x2b2a7a1d29a203f60e0a964fc64231265a49cd97"],
  CouncilStakingAddrs: ["0x12fa1ab4c3e17c1c08c1b5a945c864c8e8bf707e", "0xfd56604f1a20268ff7a0eab2ab48e25ee1e0f653", "0x1e0f6aaa9baa6081dc4910a854eebf8854c262ab", "0x5e6988415ebe0f6b088f5a676003ba60f572875a", "0xbb44998c2af35b8faee694cffe216558056d747e", "0x68cba498b7175cde9de08fc2e85ad3e9c8caefa8", "0x98efb31eeccafe35d53a6926e2a54c0858d9eebc"],
  CouncilStakingAmounts: [5000000, 5000000, 5000000, 5000000, 5000000, 5000000, 5000000],
  Gini: 0,
  KIRAddr: "0x716f89d9bc333286c79db4ebb05516897c8d208a",
  KGFAddr: "0x2bcf9d3e4a846015e7e3152a614c684de16f37c6",
  UseGini: true
}
```