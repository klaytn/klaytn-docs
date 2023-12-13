# 기타

## sha3 <a id="sha3"></a>

```javascript
caver.klay.sha3(data[, callback])
```

주어진 데이터의 Keccak-256 해시(표준화된 SHA3-256이 아님)를 반환합니다.


**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| data | String | SHA3 해시로 변환할 데이터입니다. |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

`Promise`는 주어진 데이터의 SHA3 결과인 `String`을 반환합니다.

**예시**

```javascript
> caver.klay.sha3("0x11223344").then(console.log);
0x36712aa4d0dd2f64a9ae6ac09555133a157c74ddf7c079a70c33e8b4bf70dd73
```
