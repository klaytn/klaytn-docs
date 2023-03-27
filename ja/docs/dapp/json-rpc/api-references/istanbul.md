---
description: '>- 名前空間 "istanbul" に関連したAPI。'
---

# Namespace istanbul <a id="namespace-istanbul"></a>

名前空間 `istanbul` は、コンセンサスに関連する関数を提供します。

## istanbul_getSnapshot <a id="istanbul_getsnapshot"></a>

指定されたブロック番号の状態スナップショットを返します。 stateスナップショットには、スナップショットブロックのnumber/hash、バリデータセット、ガバナンス投票などの情報が含まれます。

**Parameters**

| Name         | Type                | Description                                                                                                      |
| ------------ | ------------------- | ---------------------------------------------------------------------------------------------------------------- |
| block number | QUANTITY &#124; TAG | 整数のブロック番号、 `"firmest"` または `"latest"` の文字列。 [デフォルトのブロックパラメータ](./klay/block.md#the-default-block-parameter) のように。 |

**Return Value**

`Object` - スナップショットが見つからなかった場合のスナップショットオブジェクト、または `エラー`。

| Name | Type | Type | Description| | Epoch | 64バイトデータ | チェックポイントして保留中の投票をリセットするブロックの数 | | Number | 64バイトデータ | スナップショットが作成されたブロック番号 | | Number | 64バイトデータ | スナップショットが作成されたブロック番号 | | ValSet | 64バイトデータ | 瞬時にバリデータのセット | | ポリシー | 64バイトデータ | 64バイトデータ | | コミットサイズ | 64バイトデータ | 64バイトデータ | | 投票 | 64バイトデータ | 時系列順にキャストされる投票のリスト | | Tally | 64バイトデータ | 現在の投票 |

**Example**

```shell
// Request
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"istanbul_getSnapshot","params":["latest"],"id":1}' https://public-en-baobab.klaytn.net
// Response
{"jsonrpc":"2.0","id":1,"result":{"epoch":604800,"number":3228602,"hash":"0xc03aa058e9e248fee12e12302d0f1ba9a97873765146ae5e2429b78af826a1da","votes":[],"tally":[],"validators":["0x571e53df607be94731a5qqefca1dffe5aek45g3e", ... ],"policy":2,"subgroupsize":22,"rewardAddrs":[...],"votingPower":[1000,1000,1000,1000],"weight":[0,0,0,0],"proposers":["0x5cb1a7dccbd0dc446e3640898ede8820368554c8", ... ],"proposersBlockNum":3225600}}
```

## istanbul_getSnapshotAtHash <a id="istanbul_getsnapshotAtHash"></a>

指定されたブロックハッシュの状態スナップショットを返します。

**Parameters**

| Name      | Type         | Description          |
| --------- | ------------ | -------------------- |
| ハッシュをブロック | 32-byte DATA | The hash of a block. |

**Return Value**

See [istanbul_getSnapshot](#istanbul_getsnapshot)

**Example**

```shell
// Request
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"istanbul_getSnapshotAtHash","params":["0xc03aa058e9e248fee12e12302d0f1ba9a97873765146ae5e2429b78af826a1da"],"id":1}' https://public-en-baobab.klaytn.net
// Response
{"jsonrpc":"2.0","id":1,"result":{"epoch":604800,"number":3228602,"hash":"0xc03aa058e9e248fee12e12302d0f1ba9a97873765146ae5e2429b78af826a1da","votes":[],"tally":[],"validators":["0x571e53df607be94731a5qqefca1dffe5aek45g3e", ... ],"policy":2,"subgroupsize":22,"rewardAddrs":[...],"votingPower":[1000,1000,1000,1000],"weight":[0,0,0,0],"proposers":["0x5cb1a7dccbd0dc446e3640898ede8820368554c8", ... ],"proposersBlockNum":3225600}}
```


## istanbul_getValidators <a id="istanbul_getvalidators"></a>

指定されたブロック番号のバリデータのリストを返します。

**Parameters**

| Name         | Type                | Description                                                                                                                                      |
| ------------ | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| block number | QUANTITY &#124; TAG | Integer block number, or the string `"earliest"` or `"latest"` as in the [default block parameter](./klay/block.md#the-default-block-parameter). |

**Return Value**

| Name  | Type         | Description     |
| ----- | ------------ | --------------- |
| バリデータ | 20-byte DATA | バリデータアドレスの一覧です。 |

**Example**

```shell
// Request
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"istanbul_getValidators","params":["latest"],"id":1}' https://public-en-baobab.klaytn.net
// Response
{"jsonrpc":"2.0","id":1,"result":["0x571e53df607be94731a5qqefca1dffe5aek45g3e", ... ]}
```

## istanbul_getValidatorsAtHash <a id="istanbul_getvalidatorsathash"></a>

指定されたブロックハッシュの承認済みバリデータのリストを返します。

**Parameters**

| Name       | Type         | Description          |
| ---------- | ------------ | -------------------- |
| block hash | 32-byte DATA | The hash of a block. |

**Return Value**

See [istanbul_getValidators](#istanbul_getvalidators)

**Example**

```shell
// Request
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"istanbul_getValidatorsAtHash","params":["0xc03aa058e9e248fee12e12302d0f1ba9a97873765146ae5e2429b78af826a1da"],"id":1}' https://public-en-baobab.klaytn.net
// Response
{"jsonrpc":"2.0","id":1,"result":["0x571e53df607be94731a5qqefca1dffe5aek45g3e", ... ]}
```

## istanbul_candidates <a id="istanbul_candidates"></a>

ノードが支持して投票しようとする現在の候補を返します。

**Parameters**

なし

**Return Value**

| account | 20バイトデータ | 候補者のアドレス。 | | auth|boolean 候補の認可状況を示す値。 |

**Example**

```shell
// Request
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"istanbul_candidates","params":[],"id":1}' https://public-en-baobab.klaytn.net           
// Response
{"jsonrpc":"2.0","id":1,"result":{"0x571e53df607be94731a5qqefca1dffe5aek45g3e":true}}
```

## istanbul_proposal <a id="istanbul_propose"></a>

バリデータがプッシュ通知を試みる新しい認証候補を注入します。

**Parameters**

| Name    | Type         | Description      |
| ------- | ------------ | ---------------- |
| account | 20-byte DATA | 候補者の住所。          |
| 認証する    | boolean      | 候補者の承認ステータスを示す値。 |

**Return Value**

none

**Example**

```shell
// Request
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"istanbul_propose","params":["0x571e53df607be94731a5qqefca1dffe5aek45g3e", true],"id":1}' https://public-en-baobab.klaytn.net 
// Response
{"jsonrpc":"2.0","id":1,"result":null}
```

## istanbul_discard <a id="istanbul_discard"></a>

現在実行中の候補者を削除し、検証者がさらに投票を行うことを停止します(for または against のいずれか)。

**Parameters**

| Name    | Type         | Description           |
| ------- | ------------ | --------------------- |
| account | 20-byte DATA | Address of candidate. |

**Return Value**

none

**Example**

```shell
// Request
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"istanbul_discard","params":["0x571e53df607be94731a5qqefca1dffe5aek45g3e"],"id":1}' https://public-en-baobab.klaytn.net 
// Response
{"jsonrpc":"2.0","id":1,"result":null}
```

## istanbul_getTimeout <a id="istanbul_getTimeout"></a>

Returns istanbul config timeout. デフォルト値は 10000ms で、終了した場合は timeoutEvent が送信されます。 CNの場合、timeoutEventにはcurrentRound、preparesSize、logにcommitsSizeなどの情報が含まれます。


**Parameters**

None

**Return Value**

| Name   | Type | Description |
| ------ | ---- | ----------- |
| タイムアウト | int  | 設定のタイムアウト   |

**Example**

```shell
// Request
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"istanbul_getTimeout","params":[],"id":1}' https://public-en-baobab.klaytn.net 
// Response
{"jsonrpc":"2.0","id":1,"result":10000}
```