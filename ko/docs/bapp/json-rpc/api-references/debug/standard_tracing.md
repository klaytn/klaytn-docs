# VM Standard Tracing <a id="vm-standard-tracing"></a>

## debug_standardTraceBadBlockToFile <a id="debug_standardtracebadblocktofile"></a>

Similar to [debug_traceBadBlock](./tracing.md#debug_tracebadblock), `standardTraceBadBlockToFile` accepts a bad block hash and will replay the bad block. 추적 결과가 포함된 파일명 목록을 반환합니다. Note that the files will be stored in the machine that serves this API.


| 클라이언트 | 메서드 호출                                                                  |
|:-----:| ----------------------------------------------------------------------- |
|  콘솔   | `debug.standardTraceBadBlockToFile(hash, [options])`                    |
|  RPC  | `{"method": "debug_standardTraceBadBlockToFile", "params": [hash, {}]}` |

**매개변수**

| 명칭      | 형식            | 설명                                                         |
| ------- | ------------- | ---------------------------------------------------------- |
| 해시      | 32바이트 크기 DATA | 블록의 해시입니다.                                                 |
| options | object        | See [standard tracing options](#standard-tracing-options). |

**리턴값**

| 형식      | 설명                                                                                                                                                                     |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| JSON 배열 | 파일명의 목록입니다. 각 파일은 트랜잭션 추적 결과를 나타냅니다. 파일명 형식은 `block_{first 4 bytes of the block hash}-{transaction index}-{first 4 bytes of the transaction hash}-{random string}`입니다. |

**예시**

콘솔
```javascript
> debug.standardTraceBadBlockToFile("0x1d5ba00e313a81ae6d409d459c153327072665d9ea2f47608369722baf0cfbb6")
["/var/folders/v9/z3vq7j4d42b2jq_vxsv0km6h0000gn/T/block_0x1d5ba00e-0-0xae6f8ed4-701973544", "/var/folders/v9/z3vq7j4d42b2jq_vxsv0km6h0000gn/T/block_0x1d5ba00e-1-0x2e37321f-918920039"]
```

HTTP RPC
```shell
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_standardTraceBadBlockToFile","params":["0x1d5ba00e313a81ae6d409d459c153327072665d9ea2f47608369722baf0cfbb6"],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":["/var/folders/v9/z3vq7j4d42b2jq_vxsv0km6h0000gn/T/block_0x1d5ba00e-0-0xae6f8ed4-608268252","/var/folders/v9/z3vq7j4d42b2jq_vxsv0km6h0000gn/T/block_0x1d5ba00e-1-0x2e37321f-315574667"]}
```


## debug_standardTraceBlockToFile <a id="debug_standardtraceblocktofile"></a>

Similar to [debug_traceBlock](./tracing.md#debug_traceblock), `standardTraceBlockToFile` accepts a block hash and will replay the block that is already present in the database. It returns a list of file names containing tracing result. Note that the files will be stored in the machine that serves this API.

| 클라이언트 | 메서드 호출                                                               |
|:-----:| -------------------------------------------------------------------- |
|  콘솔   | `debug.standardTraceBlockToFile(hash, [options])`                    |
|  RPC  | `{"method": "debug_standardTraceBlockToFile", "params": [hash, {}]}` |

**매개변수**

| 명칭      | 형식            | 설명                                                         |
| ------- | ------------- | ---------------------------------------------------------- |
| 해시      | 32바이트 크기 DATA | 블록의 해시입니다.                                                 |
| options | object        | See [standard tracing options](#standard-tracing-options). |

**리턴값**

| 형식      | 설명                                                                                                                                                                     |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| JSON 배열 | 파일명의 목록입니다. 각 파일은 트랜잭션 추적 결과를 나타냅니다. 파일명 형식은 `block_{first 4 bytes of the block hash}-{transaction index}-{first 4 bytes of the transaction hash}-{random string}`입니다. |

**예시**

콘솔
```javascript
> debug.standardTraceBlockToFile("0x485fff444481ee28debe50639f312f44e0a09342161a8906a99cf325cc2512a4")
["/var/folders/v9/z3vq7j4d42b2jq_vxsv0km6h0000gn/T/block_0x485fff44-0-0xfe8210fc-141224302"]
```

HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_standardTraceBlockToFile","params":["0x485fff444481ee28debe50639f312f44e0a09342161a8906a99cf325cc2512a4"],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":["/var/folders/v9/z3vq7j4d42b2jq_vxsv0km6h0000gn/T/block_0x485fff44-0-0xfe8210fc-288181237"]}
```


## 표준 추적 옵션 <a id="standard-tracing-options"></a>

You may give trace API function a secondary optional argument, which specifies the options for this specific call. 다음의 옵션들을 사용할 수 있습니다.

- `disableStorage`: `BOOL`. Setting this to true will disable storage capture (default = false).
- `disableMemory`: `BOOL`. Setting this to true will disable memory capture (default = false).
- `disableStack`: `BOOL`. Setting this to true will disable stack capture (default = false).
- `txHash`: `string`. 이 옵션으로 설정한 트랜잭션만 추적합니다.


