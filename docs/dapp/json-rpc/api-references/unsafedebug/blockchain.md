# Blockchain Inspection <a id="blockchain-inspection"></a>

## unsafedebug_preimage <a id="unsafedebug_preimage"></a>

Returns the preimage for a sha3 hash, if known.

| Client  | Method Invocation                                |
| :-----: | ------------------------------------------------ |
| Console | `unsafedebug.preimage(hash)`                           |
|   RPC   | `{"method": "unsafedebug_preimage", "params": [hash]}` |


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| hash | string | sha3 hash. |

**Return Value**

| Name | Type | Description |
| --- | --- | --- |
| preimage | string | Preimage for a sha3 hash. |

**Example**

Console
```javascript
> unsafedebug.preimage("0xaf953a2d01f55cfe080c0c94150a60105e8ac3d51153058a1f03dd239dd08586")
"0xdd738d9a7d987a98798123b2322d389470328420bb3d84023a8405a5523cc532235ba325235243242cb9a4758609a8604 ...  98bbd743053d0cbadaaccd4865cc0348685460ada874506ad984506ad80458ad69038fd6f908340fd9af68faf903760"
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"unsafedebug_preimage","params":["0xaf953a2d01f55cfe080c0c94150a60105e8ac3d51153058a1f03dd239dd08586"],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":"0xaf953a2d01f55cfe080c0c94150a60105e8ac3d51153058a1f03dd239dd08586")
"0xdd738d9a7d987a98798123b2322d389470328420bb3d84023a8405a5523cc532235ba325235243242cb9a4758609a8604 ...  98bbd743053d0cbadaaccd4865cc0348685460ada874506ad984506ad80458ad69038fd6f908340fd9af68faf903760"}
```


## unsafedebug_printBlock <a id="unsafedebug_printblock"></a>

Retrieves a block and returns its pretty printed form.

| Client  | Method Invocation                                    |
|:-------:|------------------------------------------------------|
| Console | `unsafedebug.printBlock(number)`                           |
| RPC     | `{"method": "unsafedebug_printBlock", "params": [number]}` |

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| block number or hash | QUANTITY &#124; TAG &#124; HASH| Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"` as in the [default block parameter](../klay/block.md#the-default-block-parameter), or block hash.|

{% hint style="success" %}
NOTE: In versions earlier than Klaytn v1.7.0, only integer type is available.
{% endhint %}

**Return Value**

| Type | Description |
| --- | --- |
| string | Dump of a block struct.|

**Example**

Console
```javascript
> unsafedebug.printBlock(65120)
"(*types.Block)(0xc436fad3b0)(Block(#65120): Size: 2.95 kB {\nMinerHash: 7a5f8d37d34be6d9d19c5f161756d607da62227bb725ddb2f372682d7a9f1445\nHeader(e96d6477acfeba8ba865c315020471dcf751aa1bddca77f469334ab0492d218f):\n[\n\tParentHash:      e768b5b7eeb1005fe130c26da744d47e042e9227cee675fa70c89ede38653aea\n\tCoinbase:         0000000000000000000000000000000000000000\n\tRewardbase:       0000000000000000000000000000000000000000\n\tRoot: ... 0xc3be927ae5c0c48a0c83a1dbdf2df737c4a708eb6dae0ccb4a7eb042ea0a6ebf\n\tS:       0x53d8bed6357f88c8bab1f3d83942aa53c14269e58016e284656b12996a5d759a\n\tHex:      f863829d9280825208949619a83fcefc5647736cfd28845fcc4f716ff53b8080820fe7a0c3be927ae5c0c48a0c83a1dbdf2df737c4a708eb6dae0ccb4a7eb042ea0a6ebfa053d8bed6357f88c8bab1f3d83942aa53c14269e58016e284656b12996a5d759a\n]\n}\n)\n"

```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"unsafedebug_printBlock","params":[65120],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":"(*types.Block)(0xc4355b05a0)(Block(#65120): Size: 2.95 kB {\nMinerHash: 7a5f8d37d34be6d9d19c5f161756d607da62227bb725ddb2f372682d7a9f1445\nHeader(e96d6477acfeba8ba865c315020471dcf751aa1bddca77f469334ab0492d218f):\n[\n\tParentHash:       e768b5b7eeb1005fe130c26da744d47e042e9227cee675fa70c89ede38653aea\n\tCoinbase:         0000000000000000000000000000000000000000\n\tRewardbase:  ... 0000000000000000000000000000000000000000\n\tRoot:             4fd68a8f550cbd9ad665bc1a8021882ced5e1859fd9e28a48cb2910532b6ef27\n\tTxSha:            e3dbb8245038adcdc849de54af1d05f0c36c4c20d2710e31d525bd012d20a193\n\tReceiptSha:       212d4f453a897e2a486c86a4b120c1a850e89753865fe7f1aafa4"}
```


## unsafedebug_setHead <a id="unsafedebug_sethead"></a>

**`WARNING`**: This API is not yet implemented and always returns "not yet implemented API" error.

Sets the current head of the local chain by block number.

**NOTE**: This is a destructive action and may severely damage your chain.
Use with *extreme* caution.

| Client  | Method Invocation                                 |
|:-------:|---------------------------------------------------|
| Console | `unsafedebug.setHead(number)`                           |
| RPC     | `{"method": "unsafedebug_setHead", "params": [number]}` |


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| number | string | The block number in hexadecimal string. |

**Return Value**

None

**Example**

Console
```javascript
> unsafedebug.setHead("0x100")
null
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"unsafedebug_setHead","params":["0x100"],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":null}
```

## unsafedebug_seedHash <a id="unsafedebug_seedhash"></a>

Retrieves the seed hash of a block.


| Client  | Method Invocation                                 |
|:-------:|---------------------------------------------------|
| Console | `unsafedebug.seedHash(number)`                           |
| RPC     | `{"method": "unsafedebug_seedHash", "params": [number]}` |


**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| number | uint64 | The block number. |

**Return Value**

| Name | Type | Description |
| --- | --- | --- |
| seedHash | string | The block seed hash. |

**Example**

Console
```javascript
> unsafedebug.seedHash(100)
"0x0000000000000000000000000000000000000000000000000000000000000000"
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"unsafedebug_seedHash","params":[100],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":"0x0000000000000000000000000000000000000000000000000000000000000000"}
```


## unsafedebug_startWarmUp <a id="unsafedebug_startwarmup"></a>

The `startWarmUp` iterates the latest state trie to warm-up the trie cache.
The iteration will be automatically stopped if 90% of the trie cache is full.
The method returns an error if it fails in starting a warm-up, or `null` if it successfully has started it.

| Client  | Method invocation                                            |
| :-----: | ------------------------------------------------------------ |
| Console | `unsafedebug.startWarmUp()`                     |
|   RPC   | `{"method": "unsafedebug_startWarmUp"}` |

**Parameters**

None

**Return Value**

| Type | Description |
| --- | --- |
| Error | `null` if a warm-up is started, or an error if not. |

**Example**

Console

```javascript
> unsafedebug.startWarmUp()
null
```

HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"unsafedebug_startWarmUp","id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":null}
```

## unsafedebug_startContractWarmUp <a id="unsafedebug_startcontractwarmup"></a>

The `startContractWarmUp` iterates the latest storage trie of the given contract address to warm-up the trie cache.
The iteration will be automatically stopped if 90% of the trie cache is full.
The method returns an error if it fails in starting a warm-up or the given address is not a contract address,
or `null` if it successfully has started it.

| Client  | Method invocation                                            |
| :-----: | ------------------------------------------------------------ |
| Console | `unsafedebug.startContractWarmUp(address)`                     |
|   RPC   | `{"method": "unsafedebug_startContractWarmUp", "params": [address]}` |

**Parameters**

| Type           | Description                                                  |
| -------------- | ------------------------------------------------------------ |
| 20-byte DATA | Contract address                               |

**Return Value**

| Type | Description |
| --- | --- |
| Error | `null` if a warm-up is started, or an error if not. |

**Example**

Console

```javascript
> unsafedebug.startContractWarmUp("0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b")
null
```

HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"unsafedebug_startContractWarmUp", "params":["0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b"], "id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":null}
```

## unsafedebug_stopWarmUp <a id="unsafedebug_stopwarmup"></a>

The `stopWarmUp` stops the currently running warm-up.
This method takes no parameters, and returns `null` or an error depending on a warm-up was stopped or not.

| Client  | Method invocation             |
| :-----: | ----------------------------- |
| Console | `unsafedebug.stopWarmUp()`             |
|   RPC   | `{"method": "stopWarmUp"}` |

**Parameters**

None

**Return Value**

| Type | Description |
| --- | --- |
| Error | `null` if a warm-up is stopped, or an error if not. |

**Example**

Console

```javascript
> unsafedebug.stopWarmUp()
true
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"unsafedebug_stopWarmUp","id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":null}
```

## unsafedebug_startCollectingTrieStats <a id="unsafedebug_startCollectingTrieStats"></a>

The `startCollectingTrieStats` iterates the latest state or storage trie to collect trie statistics. It collects storage trie statistics of the contract in the given address. If an empty address(="0x00...00") is given, it collects statistics of the whole state trie. Statistics will be logged every minute before end, containing overall and depth-by-depth information.
The method returns an error if it fails in starting a task, or `null` if it successfully has started it.

| Client  | Method invocation                                            |
| :-----: | ------------------------------------------------------------ |
| Console | `unsafedebug.startCollectingTrieStats(address)`                     |
|   RPC   | `{"method": "unsafedebug_startCollectingTrieStats", "params": [address]}` |

**Parameters**

| Type           | Description                                                  |
| -------------- | ------------------------------------------------------------ |
| 20-byte DATA | Contract address                               |

**Return Value**

| Type | Description |
| --- | --- |
| Error | `null` if collecting trie statistics task is started, or an error if not. |

**Example**

Console

```javascript
// empty address to collect whole state trie statistics
> unsafedebug.startCollectingTrieStats("0x0000000000000000000000000000000000000000")
null
// contract address to collect storage trie statistics
> unsafedebug.startCollectingTrieStats("0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b")
null
```

HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"unsafedebug_startCollectingTrieStats", "params":["0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b"], "id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":null}
```

Log

```
INFO[03/10,12:03:12 +09] [5] Started collecting trie statistics        blockNum=1491072 root=0x64af12b6374b92f6db457fa1b98fe9522d9f36ba352e3c4e01cdb75f001e8264 len(children)=16
...
INFO[03/10,12:03:12 +09] [5] Finished collecting trie statistics       elapsed=95.152412ms numNodes=133036 numLeafNodes=95948 maxDepth=9
INFO[03/10,12:03:12 +09] [5] number of leaf nodes in a depth           depth=5 numNodes=22098
INFO[03/10,12:03:12 +09] [5] number of leaf nodes in a depth           depth=6 numNodes=65309
INFO[03/10,12:03:12 +09] [5] number of leaf nodes in a depth           depth=7 numNodes=8083
INFO[03/10,12:03:12 +09] [5] number of leaf nodes in a depth           depth=8 numNodes=456
INFO[03/10,12:03:12 +09] [5] number of leaf nodes in a depth           depth=9 numNodes=2
```
