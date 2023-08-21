---
description: >-
  Klaytn Governance に関連する API 。
---

# ネームスペースのガバナンスについて <a id="namespace-governance"></a>

ネットワークのガバナンスのために、Klaytnは `ガバナンス` 名前空間の下で以下のAPIを提供します。

Klaytnには3つの異なるガバナンスモードがあります。
* `none`: ネットワークに参加しているすべてのノードには、設定を変更する権利があります。
* `single`: 1つの指定ノードのみが構成を変更する権利を有する。
* `<unk>`: 投票権を持つすべてのノードが変更に投票できます。 総投票権の半分以上を集めると、投票は通過します。

ガバナンスモードに基づいて、提案者はユニット価格、最小投資額などのネットワークパラメータについて投票することができます。 提案者になるためには、候補ノードは最低限のKLAY金額を入金する必要があります。 すべての適格ノードは常にブロックを提案する資格がありますが、チャンスはステーク量に提案されます。

一定期間内に提案者になるスロットの数(チャンスの数)を決定するためにステーキングプロポーションを計算する場合 番号の丸めにより、ノードにスロットが割り当てられない可能性があります。 ただし、スロットは、KLAYの最小量を預けた修飾ノードに保証されます。

つまり、 ノードが修飾されていない場合 - ノードは十分な量のKLAYをステークしていません。ブロックの提案や検証を行う機会は与えられません。

**注意**
- 準拠ノードは例外として `single` モードで常に修飾されます。
- ブロックが提案されると投票が行われます。 この投票は、ブロックが提案されているエポックを含む2つのエポックの後に適用されます。 例外として、addValidator/removeValidatorのみが即座に適用されます。
## governance_vote <a id="governance_vote"></a>

`vote` メソッドは新しい投票を提出します。 ノードにガバナンスモードに基づいて投票する権利がある場合、投票を行うことができます。 そうでない場合は、エラーメッセージが返され、投票は無視されます。

**Parameters**

- `Key` : 変更する設定の名前。 キーは `domain.field` のフォームを持っています
- `値` : 各キーの値の種類。

| キー                                  | Description                                                                                                                                                                                                                                                                                       |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `"governance.goverancemode"`        | `STRING`. 三つのガバナンスモードの一つ。 `"none"`, `"single"`, `"ballot"`                                                                                                                                                                                                                                        |
| `"governance.governingnode"`        | `アドレス`. 指定された管理ノードのアドレス。 ガバナンスモードが `"single"` などの場合にのみ動作します。`"0xe733cb4d279da696f30d470f8c04decb54fcb0d2"`                                                                                                                                                                                        |
| `"governance.unitprice"`            | `NUMBER`. ユニットガスの価格。 例えば、 `25000000000`                                                                                                                                                                                                                                                           |
| `"governance.addvalidator"`         | `ADDRESS`. 新しいバリデータ候補のアドレス。 e.g., `0xe733cb4d279da696f30d470f8c04decb54fcb0d2`                                                                                                                                                                                                                    |
| `"governance.removevalidator"`      | `ADDRESS`. 削除する必要がある現在のバリデータのアドレス。 e.g., `0xe733cb4d279da696f30d470f8c04decb54fcb0d2`                                                                                                                                                                                                             |
| `"governance.deriveshaimpl"`        | `NUMBER`. Policy to generate the transaction hash and receipt hash in a block header. See [here](https://github.com/klaytn/klaytn/blob/v1.10.0/blockchain/types/derive_sha.go#L34) for available options. e.g., `2` (DeriveShaConcat)                                                             |
| `"governance.govparamcontract"`     | `ADDRESS`. Address of the GovParam contract. e.g., `0xe733cb4d279da696f30d470f8c04decb54fcb0d2`                                                                                                                                                                                                   |
| `"istanbul.epoch"`                  | `NUMBER`. A period in which votes are gathered in blocks. When an epoch end, all votes which haven't been passed will be cleared. e.g., `86400`                                                                                                                                                   |
| `"istanbul.committeesize"`          | `NUMBER`. The number of validators in a committee.(`sub` in chain configuration) e.g., `7`                                                                                                                                                                                                        |
| `"reward.mintingamount"`            | `STRING`. Amount of Peb minted when a block is generated. Double quotation marks are needed for a value. e.g., `"9600000000000000000"`                                                                                                                                                            |
| `"reward.ratio"`                    | `STRING`. Distribution rate for a CN/KGF/KIR separated by `"/"`. The sum of all values has to be `100`. e.g., `"50/40/10"` meaning CN 50%, KGF 40%, KIR 10%                                                                                                                                       |
| `"reward.kip82ratio"`               | `STRING`. Distribution ratio of the block proposer to stakers separated by `"/"`. The sum of all values has to be `"100"`. See [KIP-82](https://github.com/klaytn/kips/blob/master/KIPs/kip-82.md) for further details. e.g., `"20/80"` means that the proposer takes 20% while stakers take 80%. |
| `"reward.useginicoeff"`             | `BOOL`. Use the Gini coefficient or not. `true`, `false`                                                                                                                                                                                                                                          |
| `"reward.deferredtxfee"`            | `BOOL`. The way of giving transaction fee to a proposer. If true, it means the tx fee will be summed up with block reward and distributed to the proposer, KIR and KGF. If not, all tx fee will be given to the proposer. `true`, `false`                                                         |
| `"reward.minimumstake"`             | `STRING`. Amount of Klay required to be a CN (Consensus Node). Double quotation marks are needed for a value. e.g., `"5000000"`                                                                                                                                                                   |
| `"kip71.lowerboundbasefee"`         | `NUMBER`. The lowest possible base fee. See [KIP-71](https://github.com/klaytn/kips/blob/main/KIPs/kip-71.md) for further details. e.g., `25000000000`                                                                                                                                            |
| `"kip71.upperboundbasefee"`         | `NUMBER`. The highest possible base fee. e.g., `750000000000`                                                                                                                                                                                                                                     |
| `"kip71.gastarget"`                 | `NUMBER`. The block gas that base fee wants to achieve. The base fee increases when parent block contains more than gas target, and decreases when parent block contains less than gas target. e.g., `30000000`                                                                                   |
| `"kip71.basefeedenominator"`        | `NUMBER`. Controls how fast base fee changes. e.g., `20`                                                                                                                                                                                                                                          |
| `"kip71.maxblockgasusedforbasefee"` | `NUMBER`. The maximum block gas perceived in base fee calculation. e.g., `60000000`                                                                                                                                                                                                               |


**Return Value**

| Type | Description |
| ---- | ----------- |
| 文字列  | 投票提出の結果     |

**Example**

```javascript
> governance.vote ("governance.goverancemode", "ballot")
"あなたの投票は正常に配置されました。

> governance.vote ("governance.goveringnode", "0x12345678990123456789901234567899090")
"Your vote was successfully placed."

> governance.vote("istanbul.epoch", 604800)
"投票が正常に行われました。

> governance.vote("governance.unitprice", 250000000)
"あなたの投票は正常に配置されました。

> governance.vote("istanbul.commiticesize", 7)
"あなたの投票は正常に配置されました。

> governance.vote("reward.mintingamount", "9600000000000000000")
"あなたの投票は正常に行われました。

> governance.vote("reward.ratio", "40/30/30")
"あなたの投票は正常に配置されました。

> governance.vote("reward.useginicoeff", false)
"投票に成功しました。

// If wrong data are given
> governance.vote("reward.ratio", 100)
"Your vote could not be placed. Please check your vote's key and value"

> governance.vote("governance.goveringnode", 1234)
"Your vote could not be placed. Please check your vote's key and value"

// when `governancemode` is "single" and the node is not `governingnode`
> governance.vote("governance.governancemode", "ballot")
"You don't have the right to vote"
```


## governance_showTally <a id="governance_showtally"></a>

`showTally` プロパティは、現在のガバナンス投票の集計を提供します。 これは、集計された承認率をパーセントで示しています。 50%を超えると、投票は通過します。

**Parameters**

None

**Return Value**

| Type | Description        |
| ---- | ------------------ |
| タリー  | 各投票の値と承認率（パーセンテージ） |

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

`totalVotingPower` プロパティは、CNが持つすべての投票電力の合計を提供します。 各CNには1.0〜2.0の投票力があります。 `"none"`, `"single"` ガバナンスモード, `totalVotingPower` では情報は提供されません。

**Parameters**

None

**Return Value**

| Type  | Description     |
| ----- | --------------- |
| Float | 総投票力またはエラーメッセージ |

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

`myVotingPower` プロパティは、ノードの投票電力を提供します。 投票力は1.0〜2.0です。 In `"none"`, `"single"` governance mode, `totalVotingPower` don't provide any information.

**Parameters**

None

**Return Value**

| Type  | Description        |
| ----- | ------------------ |
| Float | ノードの投票力またはエラーメッセージ |

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

`myVotes` プロパティは、私の投票時の情報を提供します。 ユーザーのノードが新しいブロックを生成すると、各投票はブロックに保存されます。 現在のエポックが終了すると、この情報はクリアされます。

**Parameters**

None

**Return Value**

| Type | Description                                                                                                             |
| ---- | ----------------------------------------------------------------------------------------------------------------------- |
| 投票一覧 | 時代のノードの投票状況<br>- `BlockNum`: この投票が保存されているブロック番号<br>- `キャスト`: この投票がブロックに保存されているかどうか<br>- `キー/値`: 投票の内容 |

**Example**

```javascript
> governance.vote("governance.goverancemode", "ballot")
"あなたの投票は正常に配置されました。

> goverance.myVotes
[{
    BlockNum: 403,
    Casted: true,
    Key: "governancemode",
    Value: "ballot"
}]

```

## governance_getChainConfig <a id="governance_getchainconfig"></a>

The `getChainConfig` returns the chain configuration at a specific block. If the parameter is not set, it returns the chain configuration at the latest block.

**Parameters**

| Type                | Description                                                                                                                                                                |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| QUANTITY &#124; TAG | Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"` as in the [default block parameter](klay/block.md#the-default-block-parameter). |

{% hint style="success" %}
NOTE: The block number can be larger than the latest block number, in which case the API returns the tentative value based on the current chain state. The future governance parameters are subject to change via additional governance votes or GovParam contract state changes.
{% endhint %}

**Return Value**

| Type | Description                                   |
| ---- | --------------------------------------------- |
| JSON | Chain configuration at the given block number |

**Example**

```javascript
> governance.getChainConfig()
{
  chainId: 1001,
  deriveShaImpl: 0,
  ethTxTypeCompatibleBlock: 86513895,
  governance: {
    govParamContract: "0x84214cec245d752a9f2faf355b59ddf7f58a6edb",
    governanceMode: "single",
    governingNode: "0x99fb17d324fa0e07f23b49d09028ac0919414db6",
    kip71: {
      basefeedenominator: 20,
      gastarget: 30000000,
      lowerboundbasefee: 25000000000,
      maxblockgasusedforbasefee: 60000000,
      upperboundbasefee: 750000000000
    },
    reward: {
      deferredTxFee: true,
      kip82ratio: "20/80",
      minimumStake: 5000000,
      mintingAmount: 6400000000000000000,
      proposerUpdateInterval: 3600,
      ratio: "50/40/10",
      stakingUpdateInterval: 86400,
      useGiniCoeff: true
    }
  },
  istanbul: {
    epoch: 604800,
    policy: 2,
    sub: 22
  },
  istanbulCompatibleBlock: 75373312,
  koreCompatibleBlock: 111736800,
  londonCompatibleBlock: 80295291,
  magmaCompatibleBlock: 98347376,
  unitPrice: 250000000000
}
```

## governance_chainConfig <a id="governance_chainconfig"></a>

The `chainConfig` property provides the latest chain configuration. This is equivalent to `chainConfigAt()` with an empty parameter.

{% hint style="warning" %}
`governance_chainConfig` API will be deprecated since Klaytn v1.11 (see [klaytn#1783](https://github.com/klaytn/klaytn/pull/1783)). Use <a href="#governance_getchainconfig">`governance_getChainConfig`</a> instead.

NOTE: the RPC API will be deprecated since v1.11. However, the `governance.chainConfig` property in the Klaytn JavaScript console is removed since Klaytn v1.10.2.
{% endhint %}

{% hint style="success" %}
NOTE: In versions earlier than Klaytn v1.10.0, this API returned the initial chain configuration. However, due to its confusing name, it is updated since Klaytn v1.10.0. To query the initial chain configuration, use `chainConfigAt(0)` instead.
{% endhint %}

**Parameters**

None

**Return Value**

| Type | Description                 |
| ---- | --------------------------- |
| JSON | Current chain configuration |

**Example**

```javascript
> governance.chainConfig
{
  chainId: 1001,
  deriveShaImpl: 2,
  governance: {
    govParamContract: "0x0000000000000000000000000000000000000000",
    governanceMode: "ballot",
    governingNode: "0xe733cb4d279da696f30d470f8c04decb54fcb0d2",
    kip71: {
      basefeedenominator: 20,
      gastarget: 30000000,
      lowerboundbasefee: 25000000000,
      maxblockgasusedforbasefee: 60000000,
      upperboundbasefee: 750000000000
    },
    reward: {
      deferredTxFee: true,
      kip82ratio: "20/80",
      minimumStake: 5000000,
      mintingAmount: 6400000000000000000,
      proposerUpdateInterval: 3600,
      ratio: "50/40/10",
      stakingUpdateInterval: 20,
      useGiniCoeff: false
    }
  },
  istanbul: {
    epoch: 20,
    policy: 2,
    sub: 1
  },
  istanbulCompatibleBlock: 0,
  koreCompatibleBlock: 0,
  londonCompatibleBlock: 0,
  magmaCompatibleBlock: 0,
  unitPrice: 25000000000
}
```

## governance_chainConfigAt <a id="governance_chainconfigat"></a>

The `chainConfigAt` returns the chain configuration at a specific block. If the parameter is not set, it returns the chain configuration at the latest block.

{% hint style="warning" %}
`governance_chainConfigAt` API will be deprecated since Klaytn v1.11 (see [klaytn#1783](https://github.com/klaytn/klaytn/pull/1783)). Use <a href="#governance_getchainconfig">`governance_getChainConfig`</a> instead.
{% endhint %}

**Parameters**

| Type                | Description                                                                                                                                                                |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| QUANTITY &#124; TAG | Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"` as in the [default block parameter](klay/block.md#the-default-block-parameter). |

{% hint style="success" %}
NOTE: The block number can be larger than the latest block number, in which case the API returns the tentative value based on the current chain state. The future governance parameters are subject to change via additional governance votes or GovParam contract state changes.
{% endhint %}

**Return Value**

| Type | Description                                   |
| ---- | --------------------------------------------- |
| JSON | Chain configuration at the given block number |

**Example**

```javascript
> governance.chainConfigAt()
{
  chainId: 1001,
  deriveShaImpl: 2,
  governance: {
    govParamContract: "0x0000000000000000000000000000000000000000",
    governanceMode: "ballot",
    governingNode: "0xe733cb4d279da696f30d470f8c04decb54fcb0d2",
    kip71: {
      basefeedenominator: 20,
      gastarget: 30000000,
      lowerboundbasefee: 25000000000,
      maxblockgasusedforbasefee: 60000000,
      upperboundbasefee: 750000000000
    },
    reward: {
      deferredTxFee: true,
      kip82ratio: "20/80",
      minimumStake: 5000000,
      mintingAmount: 6400000000000000000,
      proposerUpdateInterval: 3600,
      ratio: "50/40/10",
      stakingUpdateInterval: 20,
      useGiniCoeff: false
    }
  },
  istanbul: {
    epoch: 20,
    policy: 2,
    sub: 1
  },
  istanbulCompatibleBlock: 0,
  koreCompatibleBlock: 0,
  londonCompatibleBlock: 0,
  magmaCompatibleBlock: 0,
  unitPrice: 25000000000
}
```

## governance_nodeAddress <a id="governance_nodeaddress"></a>

The `nodeAddress` property provides the address of the node that a user is using. It is derived from the nodekey and used to sign consensus messages. And the value of `"governingnode"` has to be one of validator's node address.

**Parameters**

None

**Return Value**

| Type    | Description               |
| ------- | ------------------------- |
| ADDRESS | 20 BYTE address of a node |

**Example**

```javascript
> governance.nodeAddress
"0xe733cb4d279da696f30d470f8c04decb54fcb0d2"
```

## governance_getParams <a id="governance_getparams"></a>

The `getParams` returns governance parameters at a specific block.

**Parameters**

| Type                | Description                                                                                                                                                                |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| QUANTITY &#124; TAG | Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"` as in the [default block parameter](klay/block.md#the-default-block-parameter). |

{% hint style="success" %}
NOTE: The block number can be larger than the latest block number, in which case the API returns the tentative value based on the current chain state. The future governance parameters are subject to change via additional governance votes or GovParam contract state changes.
{% endhint %}

**Return Value**

| Type | Description           |
| ---- | --------------------- |
| JSON | governance parameters |

**Example**

```javascript
> governance.getParams(89)
{
  governance.deriveshaimpl: 2,
  governance.governancemode: "single",
  governance.governingnode: "0x99fb17d324fa0e07f23b49d09028ac0919414db6",
  governance.govparamcontract: "0x0000000000000000000000000000000000000000",
  governance.unitprice: 25000000000,
  istanbul.committeesize: 22,
  istanbul.epoch: 604800,
  istanbul.policy: 2,
  kip71.basefeedenominator: 20,
  kip71.gastarget: 30000000,
  kip71.lowerboundbasefee: 25000000000,
  kip71.maxblockgasusedforbasefee: 60000000,
  kip71.upperboundbasefee: 750000000000,
  reward.deferredtxfee: true,
  reward.kip82ratio: "20/80",
  reward.minimumstake: "5000000",
  reward.mintingamount: "9600000000000000000",
  reward.proposerupdateinterval: 3600,
  reward.ratio: "34/54/12",
  reward.stakingupdateinterval: 86400,
  reward.useginicoeff: true
}
```

## governance_itemsAt <a id="governance_itemsat"></a>

The `itemsAt` returns governance parameters at a specific block.

{% hint style="warning" %}
`governance_itemsAt` API will be deprecated since Klaytn v1.11 (see [klaytn#1783](https://github.com/klaytn/klaytn/pull/1783)). Use <a href="#governance_getparams">`governance_getParams`</a> instead.
{% endhint %}

**Parameters**

| Type                | Description                                                                                                                                                                |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| QUANTITY &#124; TAG | Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"` as in the [default block parameter](klay/block.md#the-default-block-parameter). |

{% hint style="success" %}
NOTE: In versions earlier than Klaytn v1.7.0, only integer block number, the string `"earliest"` and `"latest"` are available.
{% endhint %}

{% hint style="success" %}
NOTE: The block number can be larger than the latest block number, in which case the API returns the tentative value based on the current chain state. The future governance parameters are subject to change via additional governance votes or GovParam contract state changes.
{% endhint %}

**Return Value**

| Type | Description      |
| ---- | ---------------- |
| JSON | governance items |

**Example**

```javascript
> governance.itemsAt(89)
{
  governance.deriveshaimpl: 2,
  governance.governancemode: "single",
  governance.governingnode: "0x7bf29f69b3a120dae17bca6cf344cf23f2daf208",
  governance.govparamcontract: "0x0000000000000000000000000000000000000000",
  governance.unitprice: 25000000000,
  istanbul.committeesize: 13,
  istanbul.epoch: 30,
  istanbul.policy: 2,
  kip71.basefeedenominator: 20,
  kip71.gastarget: 30000000,
  kip71.lowerboundbasefee: 25000000000,
  kip71.maxblockgasusedforbasefee: 60000000,
  kip71.upperboundbasefee: 750000000000,
  reward.deferredtxfee: true,
  reward.kip82ratio: "20/80",
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

| Type      | Description                                           |
| --------- | ----------------------------------------------------- |
| Vote List | Currently pending changes composed of keys and values |

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

| Type      | Description                                               |
| --------- | --------------------------------------------------------- |
| Vote List | Current votes composed of keys, values and node addresses |

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

| Type         | Description                                    |
| ------------ | ---------------------------------------------- |
| uint64 array | Block numbers where governance change happened |

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

| Type         | Description                                          |
| ------------ | ---------------------------------------------------- |
| uint64 array | Every block numbers where governance change happened |

**Example**
```javascript
> governance.idxCacheFromDb
[0, 30]
```

## governance_itemCacheFromDb <a id="governance_itemcachefromdb"></a>
The `itemCacheFromDb` returns the governance information stored in the given block. If no changes were stored in the given block, the function returns `null`.

**Parameters**

| Type   | Description                                                      |
| ------ | ---------------------------------------------------------------- |
| uint64 | A block number to query the governance change made in the block. |

**Return Value**

| Type | Description                                    |
| ---- | ---------------------------------------------- |
| JSON | Stored governance information at a given block |

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
  reward.mintingamount: "6400000000000000000",
  reward.proposerupdateinterval: 3600,
  reward.ratio: "50/40/10",
  reward.stakingupdateinterval: 20,
  reward.useginicoeff: false
}
```
## governance_getStakingInfo <a id="governance_getstakinginfo"></a>

The `getStakingInfo` returns staking information at a specific block. The result includes the following information.
- `BlockNum`: ステーキング情報が与えられるブロック番号。
- `CouncilNodeAdds`: コンセンサスノードのアドレス。
- `CouncilRewardAdrs`: 関連するノードのブロック報酬が送信されるアドレス。
- `CouncilStakingAdrs`: 関連するノードがステークのためにデプロイするコントラクトアドレス。
- `CouncilStakingAmounts`: 関連するノードがステークするKLAYの量。
- `ジニ`: ジニ係数.
- `KIRAddr`: KIRのコントラクトアドレス。
- `PoCAddr`: KGFのコントラクトアドレス。 PoCはKGFの以前の名前です。
- `UseGini`: ジニ係数を使用するかどうかの真偽値。

Note that the order of all addresses and the staking amounts are matched.

**Parameters**

| Type                | Description                                                                                                                                                         |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| QUANTITY &#124; TAG | Integer of a block number, or the string `"earliest"`, `"latest"` or `"pending"`, as in the [default block parameter](./klay/block.md#the-default-block-parameter). |

**Return Value**

| Type | Description         |
| ---- | ------------------- |
| JSON | Staking information |

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
  PoCAddr: "0x2bcf9d3e4a846015e7e3152a614c684de16f37c6",
  UseGini: true
}
```