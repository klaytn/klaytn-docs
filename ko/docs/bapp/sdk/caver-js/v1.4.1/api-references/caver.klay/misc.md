## sha3 <a id="sha3"></a>

```javascript
caver.klay.sha3(data[, callback])
```

입력으로 받은 데이터의 Keccak-256(이 해시 함수는 표준 SHA3-256가 아닙니다) 해시를 반환합니다.


**매개변수**

| 명칭       | 형식       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| data     | String   | SHA3 해시로 변환할 데이터입니다.                                                 |
| callback | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`Promise` returns `String` - The SHA3 result of the given data.

**예시**

```javascript
> caver.klay.sha3("0x11223344").then(console.log);
0x36712aa4d0dd2f64a9ae6ac09555133a157c74ddf7c079a70c33e8b4bf70dd73
```
