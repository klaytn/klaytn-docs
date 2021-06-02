# PrivateDebugAPI <a id="private-debug-api"></a>

## debug_chaindbProperty <a id="debug_chaindbproperty"></a>
Return leveldb properties of the chain database.

**NOTE** : This api is currently deprecated and will be available in the near future.

| Client  | Method Invocation                                         |
|:-------:|-----------------------------------------------------------|
| Console | `debug.chaindbProperty(property)`                         |
| RPC     | `{"method": "debug_chaindbProperty", "params": [string]}` |

****

**Parameters & Return Value**

| Name | Type | Description |
| --- | --- | --- |
| property | string | leveldb property. |

| Parameter | Return |
| --- | --- | 
| leveldb.num-files-at-level{n} | the number of files at level 'n' | 
| leveldb.stats | statistics of the underlying DB |
| leveldb.iostats | statistics of effective disk read and write |
| leveldb.writedelay | cumulative write delay caused by compactio |
| leveldb.sstables | sstables list for each level |
| leveldb.blockpool | block pool stats |
| leveldb.cachedblock | size of cached block |
| leveldb.openedtables | number of opened tables |
| leveldb.alivesnaps | number of alive snapshots |
| leveldb.aliveiters | number of alive iterators |

**Example**

Console
``` javascript
> debug.chaindbProperty("property")
```
HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_chaindbProperty","params":["property"],"id":1}' http://localhost:8551
```


## debug_chaindbCompact <a id="debug_chaindbcompact"></a>
Compacts the chain database if successful, otherwise it returns nil.

**NOTE** : This api is currently deprecated and will be available in the near future.

| Client  | Method Invocation                                         |
|:-------:|-----------------------------------------------------------|
| Console | `debug.chaindbCompact()`                                  |
| RPC     | `{"method": "debug_chaindbCompact", "params": []}`        |

**Parameters**

None

**Return Value**

None

**Example**

Console
``` javascript
> debug.chaindbCompact()
```
HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_chaindbCompact","params":[],"id":1}' http://localhost:8551
```


