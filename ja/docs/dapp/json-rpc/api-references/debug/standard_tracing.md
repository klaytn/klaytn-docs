# VM標準トレース <a id="vm-standard-tracing"></a>

## debug_standardTraceBadBlockToFile <a id="debug_standardtracebadblocktofile"></a>

[debug_traceBadBlock](./tracing.md#debug_tracebadblock), `standardTraceBadBlockToFile` と同様に、不正なブロックハッシュを受け入れ、不良 ブロックを再生します。 トレース結果を含むファイル名のリストを返します。 ファイルはこの API を提供するマシンに保存されます。


| Client  | Method Invocation                                                       |
|:-------:| ----------------------------------------------------------------------- |
| Console | `debug.standardTraceBadBlockToFile(hash, [options])`                    |
|   RPC   | `{"method": "debug_standardTraceBadBlockToFile", "params": [hash, {}]}` |

**Parameters**

| Name  | Type         | Description                                         |
| ----- | ------------ | --------------------------------------------------- |
| hash  | 32-byte DATA | ブロックのハッシュ。                                          |
| オプション | object       | [標準トレースオプション](#standard-tracing-options) を参照してください。 |

**Return Value**

| Type   | Description                                                                                                                                                                   |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| JSON配列 | ファイル名のリスト。 それぞれがトランザクションのトレース結果を表します。 ファイル名のフォーマットは `block_{first 4 bytes of the block hash}-{transaction index}-{first 4 bytes of the transaction hash}-{random string}` です。 |

**Example**

Console
```javascript
> debug.standardTraceBadBlockToFile("0x1d5ba00e313a81ae6d409d459c153327072665d9ea2f47608369722baf0cfbb6")
["/var/folders/v9/z3vq7j4d42b2jq_vxsv0km6h0000gn/T/block_0x1d5ba00e-0-0xae6f8ed4-701973544", "/var/foldq7j4d42baf0cfb6")
```

HTTP RPC
```shell
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_standardTraceBadBlockToFile","params":["0x1d5ba00e313a81ae6d409d459c153327072665d9ea2f47608369722baf0cfbb6"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":["/var/folders/v9/z3vq7j4d42b2jq_vxsv0km6h0000gn/T/block_0x1d5ba00e-0-0xae6f8ed4-608268252","/var/folders/v9/z3vq7j4d42b2jq_vxsv0km6h0000gn/T/block_0x1d5ba00e-1-0x2e37321f-315574667"]}
```


## debug_standardTraceBlockToFile <a id="debug_standardtraceblocktofile"></a>

Similar to [debug_traceBlock](./tracing.md#debug_traceblock), `standardTraceBlockToFile` accepts a block hash and will replay the block that is already present in the database. トレース結果を含むファイル名のリストを返します。 ファイルはこの API を提供するマシンに保存されることに注意してください。

| Client  | Method Invocation                                                    |
|:-------:| -------------------------------------------------------------------- |
| Console | `debug.standardTraceBlockToFile(hash, [options])`                    |
|   RPC   | `{"method": "debug_standardTraceBlockToFile", "params": [hash, {}]}` |

**Parameters**

| Name    | Type         | Description                                                |
| ------- | ------------ | ---------------------------------------------------------- |
| hash    | 32-byte DATA | Hash of a block.                                           |
| options | object       | See [standard tracing options](#standard-tracing-options). |

**Return Value**

| Type       | Description                                                                                                                                                                                                                  |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| JSON array | A list of file names. Each represents a tracing result of a transaction. The format of a file name is `block_{first 4 bytes of the block hash}-{transaction index}-{first 4 bytes of the transaction hash}-{random string}`. |

**Example**

Console
```javascript
> debug.standardTraceBlockToFile("0x485fff444481ee28debe50639f312f44e0a09342161a8906a99cf325cc2512a4")
["/var/folders/v9/3vq7j4d42b2jq_vxsv0km6km6h0000gn/T/block_0x485fff44-0-0xfe8210fc-141224302"]
```

HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_standardTraceBlockToFile","params":["0x485fff444481ee28debe50639f312f44e0a09342161a8906a99cf325cc2512a4"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":["/var/folders/v9/z3vq7j4d42b2jq_vxsv0km6h0000gn/T/block_0x485fff44-0-0xfe8210fc-288181237"]}
```


## 標準トレーシングオプション <a id="standard-tracing-options"></a>

トレースAPI関数に、この特定の呼び出しのオプションを 指定する2番目のオプション引数を与えることができます。 利用可能なオプションは次のとおりです。

- `disableStorage`: `BOOL`. true に設定すると、ストレージキャプチャが無効になります (デフォルト = false)。
- `disableMemory`: `BOOL`. これをtrueに設定すると、メモリキャプチャが無効になります(既定値はfalse)。
- `disableStack`: `BOOL`. これをtrueに設定するとスタックキャプチャが無効になります(デフォルトはfalse)。
- `txHash`: `string`. この値を設定すると、指定されたトランザクションのみトレースされます。


