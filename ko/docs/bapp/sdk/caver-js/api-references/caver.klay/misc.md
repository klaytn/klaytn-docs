## sha3

```javascript
caver.klay.sha3(data[, callback])
```

Returns the Keccak-256 hash (not the standardized SHA3-256) of the given data.


**Parameters**

| 명칭       | 형식       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| data     | String   | The data to convert into a SHA3 hash.                                |
| callback | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**Return Value**

`Promise` returns `String` - The SHA3 result of the given data.

**예시**

```javascript
> caver.klay.sha3("0x11223344").then(console.log);
0x36712aa4d0dd2f64a9ae6ac09555133a157c74ddf7c079a70c33e8b4bf70dd73
```