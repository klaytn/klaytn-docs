---
description: >- APIs related to the namespace "istanbul".
---

# Namespace istanbul <a id="namespace-istanbul"></a>

The namespace `istanbul` provides functions related to consensus.

## istanbul_getSnapshot <a id="istanbul_getsnapshot"></a>

Returns the state snapshot at a given block number. The state snapshot contains information such as number/hash, validator set, and governance vote of the snapshot block.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| block number |QUANTITY &#124; TAG | Integer block number, or the string `"earliest"` or `"latest"` as in the [default block parameter](./klay/block.md#the-default-block-parameter). |

**Return Value**

`Object` - A snapshot object, or `error` when no snapshot was found:

| Name | Type | Description |
| Epoch | 64-byte DATA | The number of blocks after which to checkpoint and reset the pending votes |
| Number | 64-byte DATA | The block number where the snapshot was created |
| Number | 64-byte DATA | The block number where the snapshot was created |
| ValSet | 64-byte DATA | Set of validators at the moment |
| Policy | 64-byte DATA | |
| CommiteeSize | 64-byte DATA | |
| Votes | 64-byte DATA | List of votes cast in chronological order |
| Tally | 64-byte DATA | Current vote tally to avoid recalculating |

**Example**

```shell
// Request
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"istanbul_getSnapshot","params":["latest"],"id":1}' http://localhost:8551
// Response
{"jsonrpc":"2.0","id":1,"result":{"epoch":604800,"number":3228602,"hash":"0xc03aa058e9e248fee12e12302d0f1ba9a97873765146ae5e2429b78af826a1da","votes":[],"tally":[],"validators":["0x571e53df607be94731a5qqefca1dffe5aek45g3e", ... ],"policy":2,"subgroupsize":22,"rewardAddrs":[...],"votingPower":[1000,1000,1000,1000],"weight":[0,0,0,0],"proposers":["0x5cb1a7dccbd0dc446e3640898ede8820368554c8", ... ],"proposersBlockNum":3225600}}
```

## istanbul_getSnapshotAtHash <a id="istanbul_getsnapshotAtHash"></a>

Returns the state snapshot at a given block hash.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| block hash | 32-byte DATA | The hash of a block. |

**Return Value**

See [istanbul_getSnapshot](#istanbul_getsnapshot)

**Example**

```shell
// Request
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"istanbul_getSnapshotAtHash","params":["0xc03aa058e9e248fee12e12302d0f1ba9a97873765146ae5e2429b78af826a1da"],"id":1}' http://localhost:8551
// Response
{"jsonrpc":"2.0","id":1,"result":{"epoch":604800,"number":3228602,"hash":"0xc03aa058e9e248fee12e12302d0f1ba9a97873765146ae5e2429b78af826a1da","votes":[],"tally":[],"validators":["0x571e53df607be94731a5qqefca1dffe5aek45g3e", ... ],"policy":2,"subgroupsize":22,"rewardAddrs":[...],"votingPower":[1000,1000,1000,1000],"weight":[0,0,0,0],"proposers":["0x5cb1a7dccbd0dc446e3640898ede8820368554c8", ... ],"proposersBlockNum":3225600}}
```


## istanbul_getValidators <a id="istanbul_getvalidators"></a>

Returns the list of validators at a given block number.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| block number |QUANTITY &#124; TAG | Integer block number, or the string `"earliest"` or `"latest"` as in the [default block parameter](./klay/block.md#the-default-block-parameter). |

**Return Value**

| Name | Type | Description |
| --- | --- | --- |
| validators | 20-byte DATA | List of validator addresses. |

**Example**

```shell
// Request
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"istanbul_getValidators","params":["latest"],"id":1}' http://localhost:8551
// Response
{"jsonrpc":"2.0","id":1,"result":["0x571e53df607be94731a5qqefca1dffe5aek45g3e", ... ]}
```

## istanbul_getValidatorsAtHash <a id="istanbul_getvalidatorsathash"></a>

Returns the list of authorized validators at a given block hash.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| block hash | 32-byte DATA | The hash of a block. |

**Return Value**

See [istanbul_getValidators](#istanbul_getvalidators)

**Example**

```shell
// Request
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"istanbul_getValidatorsAtHash","params":["0xc03aa058e9e248fee12e12302d0f1ba9a97873765146ae5e2429b78af826a1da"],"id":1}' http://localhost:8551
// Response
{"jsonrpc":"2.0","id":1,"result":["0x571e53df607be94731a5qqefca1dffe5aek45g3e", ... ]}
```

## istanbul_candidates <a id="istanbul_candidates"></a>

Returns the current candidates the node tries to uphold and vote on.

**Parameters**

none

**Return Value**

| account | 20-byte DATA | Address of candidate. |
| auth | boolean | A value indicating the authorization status of the candidate. |

**Example**

```shell
// Request
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"istanbul_candidates","params":[],"id":1}' http://localhost:8551           
// Response
{"jsonrpc":"2.0","id":1,"result":{"0x571e53df607be94731a5qqefca1dffe5aek45g3e":true}}
```

## istanbul_propose <a id="istanbul_propose"></a>

Injects a new authorization candidate that the validator will attempt to push through.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| account | 20-byte DATA | Address of candidate. |
| auth | boolean | A value indicating the authorization status of the candidate. |

**Return Value**

none

**Example**

```shell
// Request
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"istanbul_propose","params":["0x571e53df607be94731a5qqefca1dffe5aek45g3e", true],"id":1}' http://localhost:8551 
// Response
{"jsonrpc":"2.0","id":1,"result":null}
```

## istanbul_discard <a id="istanbul_discard"></a>

Drops a currently running candidate, stopping the validator from casting further votes (either for or against).

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| account | 20-byte DATA | Address of candidate. |

**Return Value**

none

**Example**

```shell
// Request
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"istanbul_discard","params":["0x571e53df607be94731a5qqefca1dffe5aek45g3e"],"id":1}' http://localhost:8551 
// Response
{"jsonrpc":"2.0","id":1,"result":null}
```

## istanbul_getTimeout <a id="istanbul_getTimeout"></a>

Returns istanbul config timeout. Default value is 10000ms, and if over, timeoutEvent is sent. In case of CN, the timeoutEvent contains information such as currentRound, preparesSize and commitsSize to log.


**Parameters**

None

**Return Value**

| Name | Type | Description |
| --- | --- | --- |
| timeout | int | config timeout |

**Example**

```shell
// Request
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"istanbul_getTimeout","params":[],"id":1}' http://localhost:8551 
// Response
{"jsonrpc":"2.0","id":1,"result":10000}
```