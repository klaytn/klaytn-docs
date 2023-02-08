# caver.rpc.governance <a id="caver-rpc-governance"></a>

`caver.rpc.governance` は `ガバナンス` の名前空間を持つ JSON-RPC コールを提供します。

## caver.rpc.goverance.vote <a id="caver-rpc-governance-vote"></a>

```javascript
caver.rpc.goverance.vote(key, value [, callback])
```

新しい投票を送信します。 ノードにガバナンスモードに基づいて投票する権利がある場合、投票を送信することができます。 そうでない場合、エラーが発生し、投票は無視されます。

**Parameters**

| Name     | Type                         | Description                                                 |
| -------- | ---------------------------- | ----------------------------------------------------------- |
| key      | string                       | 設定の名前を変更します。 キーには "domain.field" というフォームがあります。              |
| value    | 文字列 &#124; 番号 &#124; boolean | 各キーの値の様々なタイプ。                                               |
| callback | function                     | (オプション) エラーオブジェクトを最初のパラメータとし、結果を2番目のパラメータとして返すオプションのコールバック。 |

`キー` と `値` の `caver.rpc.goverance.vote`の詳細については、 [governance_vote](../../../../json-rpc/api-references/governance.md#governance_vote) を参照してください。


**Return Value**

`Promise` returns `string`

| Type   | Description |
| ------ | ----------- |
| string | 投票提出の結果     |

**Example**

```javascript
> caver.rpc.governance.vote('governance.goverancemode', 'ballot').then(console.log)
投票に成功しました。
```

## caver.rpc.goverance.showTally <a id="caver-rpc-governance-showtally"></a>

```javascript
caver.rpc.governance.showTally([callback])
```

ガバナンス票の現在の集計を提供します。 これは、総承認率をパーセントで表示します。 料金が50%を超えると、提案された変更は通過しなければなりません。

**Parameters**

| Name     | Type     | Description                                                                                                      |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| callback | function | (optional) Optional callback, which returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` は `Array` を返します。

| Type  | Description    |
| ----- | -------------- |
| Array | 投票の値と承認率を含む行列。 |

**Example**

```javascript
> caver.rpc.goverance.showTally().then(console.log)
[
  {
    Key: 'governance.unitprice',
    Value: 25000000000,
    ApprovalPercentage: 33.33333333333333
  }
]
```

## caver.rpc.goverance.getTotalVotingPower <a id="caver-rpc-governance-gettotalvotingpower"></a>

```javascript
caver.rpc.goverance.getTotalVotingPower([callback])
```

CNが持っているすべての投票権の合計を提供します。 Each CN has 1.0 ~ 2.0 voting power. 「なし」および「シングル」ガバナンスモードでは、totalVotingPowerは情報を提供しません。

**Parameters**

| Name     | Type     | Description                                                                                                      |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| callback | function | (optional) Optional callback, which returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `number`

| Type   | Description |
| ------ | ----------- |
| number | 総投票力        |

**Example**

```javascript
> caver.rpc.goverance.getTotalVotingPower().then(console.log)
3
```

## caver.rpc.goverance.getMyVotingPower <a id="caver-rpc-governance-getmyvotingpower"></a>

```javascript
caver.rpc.goverance.getMyVotingPower([callback])
```

ノードの投票力を提供します。 投票力は1.0〜2.0の間でどこにでもすることができます。 「なし」および「シングル」ガバナンスモードでは、totalVotingPowerは情報を提供しません。

**Parameters**

| Name     | Type     | Description                                                                                                      |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| callback | function | (optional) Optional callback, which returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `number`

| Type   | Description |
| ------ | ----------- |
| number | ノードの投票力。    |

**Example**

```javascript
> caver.rpc.goverance.getMyVotingPower().then(console.log)
1
```

## caver.rpc.goverance.getMyVotes <a id="caver-rpc-governance-getmyvotes"></a>

```javascript
caver.rpc.governance.getMyVotes([callback])
```

エポックに投票情報を提供します。 Each vote is stored in a block when the user's node generates a new block. After current epoch ends, this information is cleared.

**Parameters**

| Name     | Type     | Description                                                                                                      |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| callback | function | (optional) Optional callback, which returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `Array`

| Type  | Description      |
| ----- | ---------------- |
| Array | 時限におけるノードの投票の状態。 |

**Example**

```javascript
> caver.rpc.governance.getMyVotes().then(console.log)
[
  {
    キー: 'governance.unitprice',
    値: 25000000000,
    キャスト: true,
    BlockNum: 76899
  }
]
```

## caver.rpc.governance.getChainConfig <a id="caver-rpc-governance-getchainconfig"></a>

```javascript
caver.rpc.governance.getChainConfig([callback])
```

最初のチェーン構成を提供します。 最初の構成だけが保存されているので、投票によって行われたガバナンスの変更があった場合。 chainConfig の結果は現在の状態と異なります。 現在の情報を見るには、itemsAtを使用してください。

**Parameters**

| Name     | Type     | Description                                                                                                      |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| callback | function | (optional) Optional callback, which returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` は `オブジェクト` を返す

| Type   | Description |
| ------ | ----------- |
| object | 最初のチェーン構成   |

**Example**

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

## caver.rpc.goverance.getNodeAddress <a id="caver-rpc-governance-getnodeaddress"></a>

```javascript
caver.rpc.goverance.getNodeAddress([callback])
```

ユーザーが使用しているノードのアドレスを提供します。 It is derived from the nodekey and used to sign consensus messages. そして、"goveringnode" の値は、バリデータのノードアドレスの 1 つでなければなりません。

**Parameters**

| Name     | Type     | Description                                                                                                      |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| callback | function | (optional) Optional callback, which returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `string`

| Type   | Description |
| ------ | ----------- |
| string | ノードのアドレス    |

**Example**

```javascript
> caver.rpc.goverance.getNodeAddress().then(console.log)
0xbeafcca672100a88a953fcf5e882cb763f9e3de9
```

## caver.rpc.governance.getItemsAt <a id="caver-rpc-governance-getitemsat"></a>

```javascript
caver.rpc.governance.getItemsAt([blockNumberOrTag] [, callback])
```

特定のブロックのガバナンス項目を返します。 It is the result of previous voting of the block and used as configuration for chain at the given block number.

**Parameters**

| Name             | Type                 | Description                                                                                                      |
| ---------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------- |
| blockNumberOrTag | number &#124; string | (オプション) ブロック番号、文字列 `最新の` または `最も早く`。 If omitted, `latest` will be used.                                          |
| callback         | function             | (optional) Optional callback, which returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `object`

| Type   | Description |
| ------ | ----------- |
| object | ガバナンス項目です   |

**Example**

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

## caver.rpc.goverance.getPendingChanges <a id="caver-rpc-governance-getpendingchanges"></a>

```javascript
caver.rpc.goverance.getPendingChanges([callback])
```

十分な票数を受け取ったがまだ確定していないアイテムのリストを返します。 At the end of the current epoch, these changes will be finalized and the result will be in effect from the epoch after next epoch.

**Parameters**

| Name     | Type     | Description                                                                                                      |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| callback | function | (optional) Optional callback, which returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `object`

| Type   | Description             |
| ------ | ----------------------- |
| object | 現在保留中の変更はキーと値で構成されています。 |

**Example**

```javascript
> caver.rpc.goverance.getPendingChanges().then(console.log)
{ 'governance.governancemode': 'single' }
```

## caver.rpc.governance.getIdxCache <a id="caver-rpc-governance-getidxcache"></a>

```javascript
caver.rpc.governance.getIdxCache([callback])
```

メモリーキャッシュ内の現在の idxCache の配列を返します。 idxCache contains the block numbers where governance change happened. The cache can have up to 1000 block numbers in memory by default.

**Parameters**

| Name     | Type     | Description                                                                                                      |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| callback | function | (optional) Optional callback, which returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `object`

| Type  | Description          |
| ----- | -------------------- |
| Array | ガバナンスの変更が起こったブロック番号。 |

**Example**

```javascript
> caver.rpc.goverance.getIdxCache().then(console.log)
[ 0, 60, 321180 ]
```

## caver.rpc.governance.getIdxCacheFromDb <a id="caver-rpc-governance-getidxcachefromdb"></a>

```javascript
caver.rpc.governance.getIdxCacheFromDb([callback])
```

ガバナンスが変更されたすべてのブロック番号を含む配列を返します。 idxCacheFromDb の結果は [idxCache](#caver-rpc-governance-getidxcache) と同じまたはそれ以上です。

**Parameters**

| Name     | Type     | Description                                                                                                      |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| callback | function | (optional) Optional callback, which returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `object`

| Type  | Description                                     |
| ----- | ----------------------------------------------- |
| Array | Block numbers where governance change happened. |

**Example**

```javascript
> caver.rpc.goverance.getIdxCacheFromDb().then(console.log)
[ 0, 60, 321180 ]
```

## caver.rpc.governance.getItemCacheFromDb <a id="caver-rpc-governance-getitemcachefromdb"></a>

```javascript
caver.rpc.governance.getItemCacheFromDb([callback])
```

与えられたブロックに格納されているガバナンス情報を返します。 与えられたブロックに変更が保存されていない場合、関数は null を返します。

**Parameters**

| Name     | Type     | Description                                                                                                      |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| callback | function | (optional) Optional callback, which returns an error object as the first parameter and the result as the second. |

**Parameters**

| Name        | Type                 | Description                                  |
| ----------- | -------------------- | -------------------------------------------- |
| blockNumber | number &#124; string | ブロック番号、またはブロックで行われたガバナンスの変更をクエリするための16進数文字列。 |

**Return Value**

`Promise` returns `object`

| Type   | Description           |
| ------ | --------------------- |
| object | 特定のブロックに保存されたガバナンス情報。 |

**Example**

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

## caver.rpc.goverance.getVotes <a id="caver-rpc-governance-getvotes"></a>

```javascript
caver.rpc.governance.getVotes([callback])
```

エポック内のすべてのノードから投票を返します。 These votes are gathered from the header of each block.

**Parameters**

| Name     | Type     | Description                                                                                                      |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| callback | function | (optional) Optional callback, which returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `object`

| Type  | Description              |
| ----- | ------------------------ |
| Array | キー、値、ノードアドレスで構成された現在の投票。 |

**Example**

```javascript
> caver.rpc.goverance.getVotes().then(console.log)
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

## caver.rpc.goverance.getStakingInfo <a id="caver-rpc-governance-getstakinginfo"></a>

```javascript
caver.rpc.governance.getStakingInfo([blockNumberOrTag] [, callback])
```

特定のブロックにステーキング情報を返します。

**Parameters**

| Name             | Type                 | Description                                                                                                      |
| ---------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------- |
| blockNumberOrTag | number &#124; string | (optional) A block number, or the string `latest` or `earliest`. If omitted, `latest` will be used.              |
| callback         | function             | (optional) Optional callback, which returns an error object as the first parameter and the result as the second. |

**Return Value**

`Promise` returns `object`

| Type   | Description                                                                                                                                |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| object | ステーキング情報。 戻り値の説明については、 [governance_getStakingInfo](../../../../json-rpc/api-references/governance.md#governance_getstakinginfo) を参照してください。 |

**Example**

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
