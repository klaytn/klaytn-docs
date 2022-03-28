# VM 표준 추적 <a id="vm-standard-tracing"></a>

## debug_standardTraceBadBlockToFile <a id="debug_standardtracebadblocktofile"></a>

[debug_traceBadBlock](./tracing.md#debug_tracebadblock)과 유사하게 `standardTraceBadBlockToFile`는 잘못된 블록 해시를 입력으로 받아 잘못된 해당 블록을 재실행합니다. 추적 결과가 포함된 파일명 목록을 반환합니다. 이 파일들은 API를 제공하는 머신에 저장이 됩니다.


| 클라이언트 | 메서드 호출                                                                  |
|:-----:| ----------------------------------------------------------------------- |
|  콘솔   | `debug.standardTraceBadBlockToFile(hash, [options])`                    |
|  RPC  | `{"method": "debug_standardTraceBadBlockToFile", "params": [hash, {}]}` |

**Parameters**

| 이름      | 타입            | 설명                                            |
| ------- | ------------- | --------------------------------------------- |
| 해시      | 32바이트 크기 DATA | 블록의 해시입니다.                                    |
| options | object        | [표준 추적 옵션](#standard-tracing-options)을 참고하세요. |

**리턴값**

| 타입         | 설명                                                                                                                                                                     |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| JSON array | 파일명의 목록입니다. 각 파일은 트랜잭션 추적 결과를 나타냅니다. 파일명 형식은 `block_{first 4 bytes of the block hash}-{transaction index}-{first 4 bytes of the transaction hash}-{random string}`입니다. |

**예시**

콘솔
```javascript
> debug.standardTraceBadBlockToFile("0x1d5ba00e313a81ae6d409d459c153327072665d9ea2f47608369722baf0cfbb6")
["/var/folders/v9/z3vq7j4d42b2jq_vxsv0km6h0000gn/T/block_0x1d5ba00e-0-0xae6f8ed4-701973544", "/var/folders/v9/z3vq7j4d42b2jq_vxsv0km6h0000gn/T/block_0x1d5ba00e-1-0x2e37321f-918920039"]
```

HTTP RPC
```shell
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_standardTraceBadBlockToFile","params":["0x1d5ba00e313a81ae6d409d459c153327072665d9ea2f47608369722baf0cfbb6"],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":["/var/folders/v9/z3vq7j4d42b2jq_vxsv0km6h0000gn/T/block_0x1d5ba00e-0-0xae6f8ed4-608268252","/var/folders/v9/z3vq7j4d42b2jq_vxsv0km6h0000gn/T/block_0x1d5ba00e-1-0x2e37321f-315574667"]}
```


## debug_standardTraceBlockToFile <a id="debug_standardtraceblocktofile"></a>

[debug_traceBlock](./tracing.md#debug_traceblock)과 유사하게 `standardTraceBlockToFile`은 블록 해시를 받아 데이터베이스에 존재하는 해당 블록을 재실행합니다. 추적 결과가 포함된 파일명 목록을 반환합니다. 이 파일들은 API를 제공하는 머신에 저장이 됩니다.

| 클라이언트 | 메서드 호출                                                               |
|:-----:| -------------------------------------------------------------------- |
|  콘솔   | `debug.standardTraceBlockToFile(hash, [options])`                    |
|  RPC  | `{"method": "debug_standardTraceBlockToFile", "params": [hash, {}]}` |

**Parameters**

| 이름      | 타입            | 설명                                            |
| ------- | ------------- | --------------------------------------------- |
| 해시      | 32바이트 크기 DATA | 블록의 해시입니다.                                    |
| options | object        | [표준 추적 옵션](#standard-tracing-options)을 참고하세요. |

**리턴값**

| 타입         | 설명                                                                                                                                                                     |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| JSON array | 파일명의 목록입니다. 각 파일은 트랜잭션 추적 결과를 나타냅니다. 파일명 형식은 `block_{first 4 bytes of the block hash}-{transaction index}-{first 4 bytes of the transaction hash}-{random string}`입니다. |

**예시**

콘솔
```javascript
> debug.standardTraceBlockToFile("0x485fff444481ee28debe50639f312f44e0a09342161a8906a99cf325cc2512a4")
["/var/folders/v9/z3vq7j4d42b2jq_vxsv0km6h0000gn/T/block_0x485fff44-0-0xfe8210fc-141224302"]
```

HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_standardTraceBlockToFile","params":["0x485fff444481ee28debe50639f312f44e0a09342161a8906a99cf325cc2512a4"],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":["/var/folders/v9/z3vq7j4d42b2jq_vxsv0km6h0000gn/T/block_0x485fff44-0-0xfe8210fc-288181237"]}
```


## 표준 추적 옵션 <a id="standard-tracing-options"></a>

추적 API 함수에 보조적으로 필수적이지 않은 매개변수를 전달할 수도 있습니다. 이들은 특정 호출을 지정하는 옵션 역할을 합니다. 다음의 옵션들을 사용할 수 있습니다.

- `disableStorage`: `BOOL`. 이 옵션을 true로 설정하면 스토리지 캡처가 비활성화됩니다.(기본 설정: false)
- `disableMemory`: `BOOL`. 이 옵션을 true로 설정하면 메모리 캡처가 비활성화됩니다.(기본 설정: false)
- `disableStack`: `BOOL`. 이 옵션을 true로 설정하면 스택 캡처가 비활성화됩니다.(기본 설정: false)
- `txHash`: `string`. 이 옵션으로 설정한 트랜잭션만 추적합니다.


