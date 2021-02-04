# 기타 <a id="miscellaneous"></a>

## klay_sha3 <a id="klay_sha3"></a>

입력된 데이터의 Keccak-256(이 해시 함수는 표준 SHA3-256가 아닙니다) 해시를 반환합니다.

**매개변수**

| 명칭   | 형식   | 설명                   |
| ---- | ---- | -------------------- |
| data | DATA | SHA3 해시로 변환할 데이터입니다. |

**리턴값**

| 형식            | 설명                          |
| ------------- | --------------------------- |
| 32바이트 크기 DATA | 입력으로 받은 데이터의 SHA3 해시 결과입니다. |


**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_sha3","params":["0x11223344"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":"0x36712aa4d0dd2f64a9ae6ac09555133a157c74ddf7c079a70c33e8b4bf70dd73"
}
```
