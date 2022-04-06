## sha3 <a id="sha3"></a>

```javascript
caver.klay.sha3(data[, callback])
```

Returns the Keccak-256 hash (not the standardized SHA3-256) of the given data.


**Parameters**

| 이름       | 타입       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| 데이터      | String   | SHA3 해시로 변환할 데이터입니다.                                                 |
| callback | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`프로미스`는 `String`을 반환 - 주어진 데이터를 SHA3 해시로 변환한 결과값입니다.

**예시**

```javascript
> caver.klay.sha3("0x11223344").then(console.log);
0x36712aa4d0dd2f64a9ae6ac09555133a157c74ddf7c079a70c33e8b4bf70dd73
```
