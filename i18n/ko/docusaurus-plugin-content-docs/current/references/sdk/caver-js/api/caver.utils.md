---
description: caver-js 유틸리티 API.
---

# caver.utils

`caver.utils`는 유틸리티 함수를 제공합니다.

## randomHex <a href="#randomhex" id="randomhex"></a>

```javascript
caver.utils.randomHex(size)
```

[randomHex](https://github.com/frozeman/randomHex) 라이브러리는 주어진 바이트 크기에서 암호학적으로 강력한 의사 랜덤 HEX 문자열을 생성합니다.

**매개변수**

| 이름   | 유형   | 설명                                                                                               |
| ---- | ---- | ------------------------------------------------------------------------------------------------ |
| size | bool | HEX 문자열의 바이트 크기, _예: `32`는 "0x"가 접두사로 붙은 64개의 문자가 포함된 32바이트 HEX 문자열을 생성합니다. |

**리턴 값**

| 유형     | 설명                  |
| ------ | ------------------- |
| string | 짝수로 만들 16진수 문자열입니다. |

**예시**

```javascript
> caver.utils.randomHex(32)
'0x861b56754dba7769f9740c3ad70b4694aa24d604c1dba3bac7ec45978927b8de'

> caver.utils.randomHex(4)
'0x5641d6ce'

> caver.utils.randomHex(2)
'0xf058'

> caver.utils.randomHex(1)
'0x7c'

> caver.utils.randomHex(0)
'0x'
```

## underscore <a href="#underscore" id="underscore"></a>

```javascript
caver.utils._()
```

[underscore](http://underscorejs.org) 라이브러리에는 여러 가지 편리한 JavaScript 함수가 있습니다.

자세한 내용은 [underscore API 레퍼런스](http://underscorejs.org)를 참조하세요.

**예시**

```javascript
> var _ = caver.utils._

> _.union([1,2],[3])
[1,2,3]

> _.each({my: 'object'}, function(value, key){ ... })
...
```

## toBN <a href="#tobn" id="tobn"></a>

```javascript
caver.utils.toBN(number)
```

JavaScript에서 큰 숫자를 처리하기 위해 주어진 값([BigNumber.js](http://mikemcl.github.io/bignumber.js/) 인스턴스 포함)을 [BN.js](https://github.com/indutny/bn.js/) 인스턴스로 안전하게 변환합니다.

**매개변수**

| 이름   | 유형               | 설명               |
| ---- | ---------------- | ---------------- |
| bool | string \| number | 숫자를 큰 숫자로 변환합니다. |

**리턴 값**

| 유형     | 설명                                               |
| ------ | ------------------------------------------------ |
| Object | [BN.js](https://github.com/indutny/bn.js/) 인스턴스. |

**예시**

```javascript
> caver.utils.toBN(1234).toString()
'1234'

> caver.utils.toBN('1234').add(caver.utils.toBN('1')).toString()
'1235'

> caver.utils.toBN('0xea').toString()
'234'
```

## isBN <a href="#isbn" id="isbn"></a>

```javascript
caver.utils.isBN(bn)
```

주어진 값이 [BN.js](https://github.com/indutny/bn.js/) 인스턴스인지 확인합니다.

**매개변수**

| 이름   | 유형     | 설명                                                  |
| ---- | ------ | --------------------------------------------------- |
| bool | object | [BN.js](https://github.com/indutny/bn.js/) 인스턴스입니다. |

**리턴 값**

| 유형      | 설명                                                               |
| ------- | ---------------------------------------------------------------- |
| boolean | 주어진 값이 [BN.js](https://github.com/indutny/bn.js/) 인스턴스이면 `true`. |

**예시**

```javascript
> var number = new caver.utils.BN(10)
> caver.utils.isBN(number)
true
```

## isBigNumber <a href="#isbignumber" id="isbignumber"></a>

```javascript
caver.utils.isBigNumber(bignumber)
```

주어진 값이 [BigNumber.js](http://mikemcl.github.io/bignumber.js/) 인스턴스인지 확인합니다.

**매개변수**

| 이름        | 유형     | 설명                                                           |
| --------- | ------ | ------------------------------------------------------------ |
| bignumber | object | [BigNumber.js](http://mikemcl.github.io/bignumber.js/) 인스턴스. |

**리턴 값**

| 유형      | 설명                                     |
| ------- | -------------------------------------- |
| boolean | 주어진 값이 `BigNumber.js` 인스턴스인 경우 `true`. |

**예시**

```javascript
> var number = new caver.utils.BigNumber(10)
> caver.utils.isBigNumber(number)
true
```

## sha3 <a href="#sha3" id="sha3"></a>

```javascript
caver.utils.sha3(str)
caver.utils.keccak256(str) // ALIAS
```

입력의 sha3를 계산합니다.

**참고**: Solidity의 sha3 동작을 모방하려면 [caver.utils.soliditySha3](#soliditysha3)를 사용하세요.

**매개변수**

| 이름     | 유형     | 설명     |
| ------ | ------ | ------ |
| String | string | String |

**리턴 값**

| 유형     | 설명        |
| ------ | --------- |
| string | 결과 해시입니다. |

**예시**

```javascript
> caver.utils.sha3('234') // taken as string
'0xc1912fee45d61c87cc5ea59dae311904cd86b84fee17cc96966216f811ce6a79'

> caver.utils.sha3(new caver.utils.BN('234')) // utils.sha3 stringify bignumber instance.
'0xc1912fee45d61c87cc5ea59dae311904cd86b84fee17cc96966216f811ce6a79'

> caver.utils.sha3(234)
null // can't calculate the has of a number

> caver.utils.sha3(0xea) // same as above, just the HEX representation of the number
null

> caver.utils.sha3('0xea') // will be converted to a byte array first, and then hashed
'0x2f20677459120677484f7104c76deb6846a2c071f9b3152c103bb12cd54d1a4a'
```

## soliditySha3 <a href="#soliditysha3" id="soliditysha3"></a>

```javascript
caver.utils.soliditySha3(param1 [, param2, ...])
```

Solidity와 동일한 방식으로 주어진 입력 매개변수의 sha3를 계산합니다. 즉, 인수가 해시되기 전에 ABI로 변환되고 단단히 패킹됩니다.

**매개변수**

| 이름     | 유형    | 설명                                                                                                                                                                                   |
| ------ | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| paramX | Mixed | 모든 타입, 또는 `{type: 'uint', value: '123456'}` 또는 `{t: '바이트', v: '0xfff456'}`를 가진 객체. <br />기본 유형은 다음과 같이 자동 감지됩니다.<br />- `string` 숫자가 아닌 UTF-8 문자열은 `string`으로 해석됩니다.<br />- `string` |

**리턴 값**

| 유형     | 설명        |
| ------ | --------- |
| string | 결과 해시입니다. |

**예시**

```javascript
> caver.utils.soliditySha3('234564535', '0xfff23243', true, -10)
// auto detects: uint256, bytes, bool, int256
'0x3e27a893dc40ef8a7f0841d96639de2f58a132be5ae466d40087a2cfa83b7179'

> caver.utils.soliditySha3('Hello!%') // auto detects: string
'0x661136a4267dba9ccdf6bfddb7c00e714de936674c4bdb065a531cf1cb15c7fc'

> caver.utils.soliditySha3('234') // auto detects: uint256
'0x61c831beab28d67d1bb40b5ae1a11e2757fa842f031a2d0bc94a7867bc5d26c2'

> caver.utils.soliditySha3(0xea) // same as above
'0x61c831beab28d67d1bb40b5ae1a11e2757fa842f031a2d0bc94a7867bc5d26c2'

> caver.utils.soliditySha3(new caver.utils.BN('234')) // same as above
'0x61c831beab28d67d1bb40b5ae1a11e2757fa842f031a2d0bc94a7867bc5d26c2'

> caver.utils.soliditySha3({type: 'uint256', value: '234'})) // same as above
'0x61c831beab28d67d1bb40b5ae1a11e2757fa842f031a2d0bc94a7867bc5d26c2'

> caver.utils.soliditySha3({t: 'uint', v: new caver.utils.BN('234')})) // same as above
'0x61c831beab28d67d1bb40b5ae1a11e2757fa842f031a2d0bc94a7867bc5d26c2'

> caver.utils.soliditySha3('0x407D73d8a49eeb85D32Cf465507dd71d507100c1')
'0x4e8ebbefa452077428f93c9520d3edd60594ff452a29ac7d2ccc11d47f3ab95b'

> caver.utils.soliditySha3({t: 'bytes', v: '0x407D73d8a49eeb85D32Cf465507dd71d507100c1'})
'0x4e8ebbefa452077428f93c9520d3edd60594ff452a29ac7d2ccc11d47f3ab95b' // same result as above

> caver.utils.soliditySha3({t: 'address', v: '0x407D73d8a49eeb85D32Cf465507dd71d507100c1'})
'0x4e8ebbefa452077428f93c9520d3edd60594ff452a29ac7d2ccc11d47f3ab95b' // same as above, but will do a checksum check, if its multi case

> caver.utils.soliditySha3({t: 'bytes32', v: '0x407D73d8a49eeb85D32Cf465507dd71d507100c1'})
'0x3c69a194aaf415ba5d6afca734660d0a3d45acdc05d54cd1ca89a8988e7625b4' // different result as above

> caver.utils.soliditySha3({t: 'string', v: 'Hello!%'}, {t: 'int8', v:-23}, {t: 'address', v: '0x85F43D8a49eeB85d32Cf465507DD71d507100C1d'})
'0xa13b31627c1ed7aaded5aecec71baf02fe123797fffd45e662eac8e06fbe4955'
```

## isHex <a href="#ishex" id="ishex"></a>

```javascript
caver.utils.isHex(hex)
```

주어진 문자열이 HEX 문자열인지 확인합니다.

**매개변수**

| 이름  | 유형     | 설명          |
| --- | ------ | ----------- |
| HEX | string | HEX 문자열입니다. |

**리턴 값**

| 유형      | 설명                            |
| ------- | ----------------------------- |
| boolean | 주어진 매개변수가 HEX 문자열인 경우 `true`. |

**예시**

```javascript
> caver.utils.isHex('0xc1912')
true

> caver.utils.isHex('c1912')
true

> caver.utils.isHex('0xZ1912')
false

> caver.utils.isHex('Hello')
false
```

## isHexStrict <a href="#ishexstrict" id="ishexstrict"></a>

```javascript
caver.utils.isHexStrict(hex)
```

주어진 문자열이 HEX 문자열인지 확인합니다. [caver.utils.isHex](#ishex)와의 차이점은 HEX 앞에 `0x`가 붙을 것으로 예상한다는 점입니다.

**매개변수**

| 이름   | 유형     | 설명          |
| ---- | ------ | ----------- |
| bool | string | HEX 문자열입니다. |

**리턴 값**

| 유형      | 설명                           |
| ------- | ---------------------------- |
| boolean | 주어진 문자열이 HEX 문자열인 경우 `true`. |

**예시**

```javascript
> caver.utils.isHexStrict('0xc1912')
true

> caver.utils.isHexStrict('c1912')
false

> caver.utils.isHexStrict('0xZ1912')
false

> caver.utils.isHex('Hello')
false
```

## isAddress <a href="#isaddress" id="isaddress"></a>

```javascript
caver.utils.isAddress(address)
```

주어진 문자열이 유효한 클레이튼 주소인지 확인합니다. 또한 주소에 대문자와 소문자가 있는지 체크섬을 확인합니다.

**매개변수**

| 이름      | 유형     | 설명          |
| ------- | ------ | ----------- |
| address | string | 해시할 메시지입니다. |

**리턴 값**

| 유형      | 설명                                    |
| ------- | ------------------------------------- |
| boolean | 주어진 문자열이 유효한 클레이튼 주소이면 `true`를 반환합니다. |

**예시**

```javascript
> caver.utils.isAddress('0xc1912fee45d61c87cc5ea59dae31190fffff232d')
true

> caver.utils.isAddress('c1912fee45d61c87cc5ea59dae31190fffff232d')
true

> caver.utils.isAddress('0XC1912FEE45D61C87CC5EA59DAE31190FFFFF232D')
true // as all is uppercase, no checksum will be checked

> caver.utils.isAddress('0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d')
true

> caver.utils.isAddress('0xC1912fEE45d61C87Cc5EA59DaE31190FFFFf232d')
false // wrong checksum
```

## toChecksumAddress <a href="#tochecksumaddress" id="tochecksumaddress"></a>

```javascript
caver.utils.toChecksumAddress(address)
```

대문자 또는 소문자 클레이튼 주소를 체크섬 주소로 변환합니다.

**매개변수**

| 이름      | 유형     | 설명     |
| ------- | ------ | ------ |
| address | string | String |

**리턴 값**

| 유형     | 설명     |
| ------ | ------ |
| string | 체크섬 주소 |

**예시**

```javascript
> caver.utils.toChecksumAddress('0xc1912fee45d61c87cc5ea59dae31190fffff232d')
'0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d'

> caver.utils.toChecksumAddress('0XC1912FEE45D61C87CC5EA59DAE31190FFFFF232D')
'0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d' // same as above
```

## checkAddressChecksum <a href="#checkaddresschecksum" id="checkaddresschecksum"></a>

```javascript
caver.utils.checkAddressChecksum(address)
```

주어진 주소의 체크섬을 확인합니다. 체크섬이 아닌 주소에 대해서도 `false`를 반환합니다.

**매개변수**

| 이름      | 유형     | 설명     |
| ------- | ------ | ------ |
| address | string | String |

**리턴 값**

| 유형      | 설명                                                               |
| ------- | ---------------------------------------------------------------- |
| boolean | 주소의 체크섬이 유효하면 `true`, 체크섬 주소가 아니거나 체크섬이 유효하지 않으면 `false`를 반환합니다. |

**예시**

```javascript
> caver.utils.checkAddressChecksum('0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d')
true
```

## toHex <a href="#tohex" id="tohex"></a>

```javascript
caver.utils.toHex(mixed)
```

주어진 값을 HEX로 변환합니다. d제공된 단위에는 다음 승수 중 하나가 곱해집니다. 텍스트 문자열은 UTF-8 문자열로 해석됩니다.

**매개변수**

| 이름    | 유형                                  | 설명              |
| ----- | ----------------------------------- | --------------- |
| mixed | string \| number \| BN \| BigNumber | HEX로 변환할 입력입니다. |

**리턴 값**

| 유형     | 설명             |
| ------ | -------------- |
| string | 결과 HEX 문자열입니다. |

**예시**

```javascript
> caver.utils.toHex('234')
'0xea'

> caver.utils.toHex(234)
'0xea'

> caver.utils.toHex(new caver.utils.BN('234'))
'0xea'

> caver.utils.toHex(new caver.utils.BigNumber('234'))
'0xea'

> caver.utils.toHex('I have 100€')
'0x49206861766520313030e282ac'
```

## hexToNumberString <a href="#hextonumberstring" id="hextonumberstring"></a>

```javascript
caver.utils.hexToNumberString(hex)
```

주어진 HEX 값의 숫자 표현을 문자열로 반환합니다.

**매개변수**

| 이름     | 유형     | 설명              |
| ------ | ------ | --------------- |
| String | string | 변환할 HEX 문자열입니다. |

**리턴 값**

| 유형     | 설명               |
| ------ | ---------------- |
| string | 다듬을 16진수 문자열입니다. |

**예시**

```javascript
> caver.utils.hexToNumberString('0xea')
"234"
```

## hexToNumber <a href="#hextonumber" id="hextonumber"></a>

```javascript
caver.utils.hexToNumber(hex)
```

주어진 HEX 값의 숫자 표현을 반환합니다.

**참고**: 이 방법은 큰 숫자에는 유용하지 않으므로 [caver.utils.toBN](#tobn)을 사용하세요.

**파라미터**

| 이름     | 유형     | 설명              |
| ------ | ------ | --------------- |
| String | string | 변환할 HEX 문자열입니다. |

**리턴 값**

| 유형   | 설명                   |
| ---- | -------------------- |
| bool | 주어진 HEX 값의 숫자 표현입니다. |

**예시**

```javascript
> caver.utils.hexToNumber('0xea')
234
```

## numberToHex <a href="#numbertohex" id="numbertohex"></a>

```javascript
caver.utils.numberToHex(number)
```

주어진 숫자 값의 HEX 표현을 반환합니다.

**매개변수**

| 이름   | 유형                                  | 설명                     |
| ---- | ----------------------------------- | ---------------------- |
| bool | string \| number \| BN \| BigNumber | string 또는 숫자로 된 숫자입니다. |

**리턴 값**

| 유형     | 설명                |
| ------ | ----------------- |
| string | 주어진 숫자의 HEX 값입니다. |

**예시**

```javascript
> caver.utils.numberToHex('234')
'0xea'
```

## hexToUtf8 <a href="#hextoutf8" id="hextoutf8"></a>

```javascript
caver.utils.hexToUtf8(hex)
caver.utils.hexToString(hex) // ALIAS
```

주어진 HEX 값의 UTF-8 문자열 표현을 반환합니다.

**파라미터**

| 이름  | 유형     | 설명                         |
| --- | ------ | -------------------------- |
| hex | string | HEX 문자열로 변환할 UTF-8 문자열입니다. |

**리턴 값**

| 유형     | 설명     |
| ------ | ------ |
| string | String |

**예시**

```javascript
> caver.utils.hexToUtf8('0x49206861766520313030e282ac')
'I have 100€'
```

## hexToAscii <a href="#hextoascii" id="hextoascii"></a>

```javascript
caver.utils.hexToAscii(hex)
```

주어진 HEX 값의 ASCII 문자열 표현을 반환합니다.

**매개변수**

| 이름  | 유형     | 설명                         |
| --- | ------ | -------------------------- |
| hex | string | HEX 문자열로 변환할 ASCII 문자열입니다. |

**리턴 값**

| 유형     | 설명     |
| ------ | ------ |
| string | String |

**예시**

```javascript
> caver.utils.hexToAscii('0x4920686176652031303021')
'I have 100!'
```

## utf8ToHex <a href="#utf8tohex" id="utf8tohex"></a>

```javascript
caver.utils.utf8ToHex(str)
caver.utils.stringToHex(str) // ALIAS
```

주어진 UTF-8 문자열의 HEX 표현을 반환합니다.

**매개변수**

| 이름     | 유형     | 설명                         |
| ------ | ------ | -------------------------- |
| String | string | UTF-8 문자열로 변환할 HEX 문자열입니다. |

**리턴 값**

| 유형     | 설명     |
| ------ | ------ |
| string | String |

**예시**

```javascript
> caver.utils.utf8ToHex('I have 100€')
'0x49206861766520313030e282ac'
```

## asciiToHex <a href="#asciitohex" id="asciitohex"></a>

```javascript
caver.utils.asciiToHex(str)
```

주어진 ASCII 문자열의 HEX 표현을 반환합니다.

**파라미터**

| 이름     | 유형     | 설명                         |
| ------ | ------ | -------------------------- |
| String | string | ASCII 문자열로 변환할 HEX 문자열입니다. |

**리턴 값**

| 유형     | 설명     |
| ------ | ------ |
| string | String |

**예시**

```javascript
> caver.utils.asciiToHex('I have 100!')
'0x4920686176652031303021'
```

## hexToBytes <a href="#hextobytes" id="hextobytes"></a>

```javascript
caver.utils.hexToBytes(hex)
```

주어진 HEX 문자열에서 바이트 배열을 반환합니다.

**매개변수**

| 이름   | 유형     | 설명              |
| ---- | ------ | --------------- |
| bool | string | 변환할 HEX 문자열입니다. |

**리턴 값**

| 유형    | 설명         |
| ----- | ---------- |
| Array | 바이트 배열입니다. |

**예시**

```javascript
> caver.utils.hexToBytes('0x000000ea')
[ 0, 0, 0, 234 ]
```

## bytesToHex <a href="#bytestohex" id="bytestohex"></a>

```javascript
caver.utils.bytesToHex(byteArray)
```

바이트 배열에서 HEX 문자열을 반환합니다.

**매개변수**

| 이름        | 유형    | 설명             |
| --------- | ----- | -------------- |
| byteArray | Array | 변환할 바이트 배열입니다. |

**리턴 값**

| 유형     | 설명     |
| ------ | ------ |
| string | String |

**예시**

```javascript
> caver.utils.bytesToHex([ 72, 101, 108, 108, 111, 33, 36 ])
'0x48656c6c6f2124'
```

## convertToPeb <a href="#topeb" id="topeb"></a>

```javascript
caver.utils.convertToPeb(number [, unit])
```

모든 KLAY 값을 peb으로 변환합니다.

**참고**: "peb"는 가장 작은 KLAY 단위이며, 항상 "peb"를 KLAY의 단위로 사용해야 합니다. 표시상의 이유로만 "KLAY"로 변환하세요.

**매개변수**

| 이름   | 유형                     | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ---- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| bool | string \| number \| BN | 값입니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| unit | string                 | <p>(선택 사항, 기본값은 <code>"KLAY"</code>) 변환할 KLAY의 단위입니다. - <code>peb</code>: '1'- <code>kpeb</code>: '1000'- <code>Mpeb</code>: '1000000'- <code>Gpeb</code>: '1000000000'- <code>Ston</code>: '1000000000'- <code>uKLAY</code>: '1000000000000'- <code>mKLAY</code>: '1000000000000000'- <code>KLAY</code>: '1000000000000000000'- <code>kKLAY</code>: '1000000000000000000000'- <code>MKLAY</code>: '1000000000000000000000000'- <code>GKLAY</code>: '1000000000000000000000000000'</p> |

**리턴 값**

| 유형     | 설명                                                                                              |
| ------ | ----------------------------------------------------------------------------------------------- |
| String | 숫자 매개변수가 [BN](https://github.com/indutny/bn.js/)의 인스턴스인 경우 BN 인스턴스를 반환하고, 그렇지 않은 경우 문자열을 반환합니다. |

**예시**

```javascript
> caver.utils.convertToPeb('1', `klay`)
'1000000000000000000'

> caver.utils.convertToPeb(caver.utils.toBN(1), `klay`)
<BN: de0b6b3a7640000>
```

## convertFromPeb <a href="#convertfrompeb" id="convertfrompeb"></a>

```javascript
caver.utils.convertFromPeb(number [, unit])
```

**참고**: "peb"는 가장 작은 KLAY 단위이며, 항상 "peb"를 KLAY의 단위로 사용해야 합니다. 표시상의 이유로만 "KLAY"로 변환하세요.

**매개변수**

| 이름   | 유형                                  | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ---- | ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| bool | string \| number \| BN \| BigNumber | 단위가 peb인 값                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| unit | string                              | <p>(선택 사항, 기본값은 <code>"KLAY"</code>) "peb"를 변환할 KLAY 단위입니다. - <code>peb</code>: '1'- <code>kpeb</code>: '1000'- <code>Mpeb</code>: '1000000'- <code>Gpeb</code>: '1000000000'- <code>Ston</code>: '1000000000'- <code>uKLAY</code>: '1000000000000'- <code>mKLAY</code>: '1000000000000000'- <code>KLAY</code>: '1000000000000000000'- <code>kKLAY</code>: '1000000000000000000000'- <code>MKLAY</code>: '1000000000000000000000000'- <code>GKLAY</code>: '1000000000000000000000000000'</p> |

**리턴 값**

| 유형     | 설명     |
| ------ | ------ |
| string | String |

**예시**

```javascript
> caver.utils.convertFromPeb('1', `klay`)
'0.000000000000000001'
```

## unitMap <a href="#unitmap" id="unitmap"></a>

```javascript
caver.utils.unitMap
```

가능한 모든 KLAY 값과 그 양을 peb 단위로 표시합니다.

**리턴 값**

| 유형     | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Object | <p>다음 속성 포함 :- <code>peb</code>: '1'- <code>kpeb</code>: '1000'- <code>Mpeb</code>: '1000000'- <code>Gpeb</code>: '1000000000'- <code>Ston</code>: '1000000000'- <code>uKLAY</code>: '1000000000000'- <code>mKLAY</code>: '1000000000000000'- <code>KLAY</code>: '1000000000000000000'- <code>kKLAY</code>: '1000000000000000000000'- <code>MKLAY</code>: '1000000000000000000000000'- <code>GKLAY</code>: '1000000000000000000000000000'- <code>TKLAY</code>: '1000000000000000000000000000000'</p> |

**예시**

```javascript
> caver.utils.unitMap
{
  peb: '1',
  kpeb: '1000',
  Mpeb: '1000000',
  Gpeb: '1000000000',
  Ston: '1000000000',
  uKLAY: '1000000000000',
  mKLAY: '1000000000000000',
  KLAY: '1000000000000000000',
  kKLAY: '1000000000000000000000',
  MKLAY: '1000000000000000000000000',
  GKLAY: '1000000000000000000000000000',
  TKLAY: '1000000000000000000000000000000'
}
```

## klayUnit <a href="#klayunit" id="klayunit"></a>

```javascript
caver.utils.klayUnit
```

모든 KLAY 단위를 표시합니다.

**리턴 값**

| 유형     | 설명                                                                                                            |
| ------ | ------------------------------------------------------------------------------------------------------------- |
| Object | 클레이튼에서 사용되는 KLAY의 단위가 정의된 객체입니다. 각 단위에는 이름과 pebFactor가 있으며, 현재 각 단위로 변환된 KLAY를 'peb'로 변환할 때 pebFactor가 사용됩니다. |

**예시**

```javascript
> caver.utils.klayUnit
{
    peb: { unit: 'peb', pebFactor: 0 },
    kpeb: { unit: 'kpeb', pebFactor: 3 },
    Mpeb: { unit: 'Mpeb', pebFactor: 6 },
    Gpeb: { unit: 'Gpeb', pebFactor: 9 },
    ston: { unit: 'ston', pebFactor: 9 },
    uKLAY: { unit: 'uKLAY', pebFactor: 12 },
    mKLAY: { unit: 'mKLAY', pebFactor: 15 },
    KLAY: { unit: `klay`, pebFactor: 18 },
    kKLAY: { unit: 'kKLAY', pebFactor: 21 },
    MKLAY: { unit: 'MKLAY', pebFactor: 24 },
    GKLAY: { unit: 'GKLAY', pebFactor: 27 },
    TKLAY: { unit: 'TKLAY', pebFactor: 30 }
}
```

## padLeft <a href="#padleft" id="padleft"></a>

```javascript
caver.utils.padLeft(string, characterAmount [, sign])
caver.utils.leftPad(string, characterAmount [, sign]) // ALIAS
```

문자열 왼쪽에 패딩을 추가합니다. HEX 문자열에 패딩을 추가할 때 유용합니다.

**매개변수**

| 이름              | 유형     | 설명                                                 |
| --------------- | ------ | -------------------------------------------------- |
| string          | string | string 왼쪽에 패딩을 추가할 문자열입니다.                         |
| characterAmount | bool   | 전체 문자열에 포함되어야 하는 문자 수입니다.                          |
| sign            | string | (선택 사항) 사용할 문자 기호, 기본값은 `0`입니다. |

**리턴 값**

| 유형     | 설명     |
| ------ | ------ |
| string | String |

**예시**

```javascript
> caver.utils.padLeft('0x3456ff', 20)
'0x000000000000003456ff'

> caver.utils.padLeft(0x3456ff, 20)
'0x000000000000003456ff'

> caver.utils.padLeft('Hello', 20, 'x')
'xxxxxxxxxxxxxxxHello'
```

## padRight <a href="#padright" id="padright"></a>

```javascript
caver.utils.padRight(str, characterAmount [, sign])
caver.utils.rightPad(str, characterAmount [, sign]) // ALIAS
```

문자열 오른쪽에 패딩을 추가하며, HEX 문자열에 패딩을 추가할 때 유용합니다.

**매개변수**

| 이름              | 유형     | 설명                                                 |
| --------------- | ------ | -------------------------------------------------- |
| String          | string | 오른쪽에 패딩을 추가할 문자열입니다.                               |
| characterAmount | bool   | 전체 문자열에 포함되어야 하는 문자 수입니다.                          |
| sign            | string | (선택 사항) 사용할 문자 기호, 기본값은 `0`입니다. |

**리턴 값**

| 유형     | 설명     |
| ------ | ------ |
| string | String |

**예시**

```javascript
> caver.utils.padRight('0x3456ff', 20)
'0x3456ff00000000000000'

> caver.utils.padRight(0x3456ff, 20)
'0x3456ff00000000000000'

> caver.utils.padRight('Hello', 20, 'x')
'Helloxxxxxxxxxxxxxxx'
```

## trimLeadingZero <a href="#trimleadingzero" id="trimleadingzero"></a>

```javascript
caver.utils.trimLeadingZero(hexString)
```

0x 접두사가 붙은 16진수 문자열에서 선행 0을 제거합니다.

**매개변수**

| 이름     | 유형     | 설명                |
| ------ | ------ | ----------------- |
| String | string | 패딩 처리된 string입니다. |

**리턴 값**

| 유형     | 설명                    |
| ------ | --------------------- |
| string | 선행 0이 없는 16진수 문자열입니다. |

**예시**

```javascript
> caver.utils.trimLeadingZero('0x000011')
0x11
```

## makeEven <a href="#makeeven" id="makeeven"></a>

```javascript
caver.utils.makeEven(hexString)
```

문자열을 짝수 길이로 반환합니다.

**매개변수**

| 이름     | 유형     | 설명                  |
| ------ | ------ | ------------------- |
| String | string | 짝수로 만들 16진수 문자열입니다. |

**리턴 값**

| 유형     | 설명              |
| ------ | --------------- |
| string | 길이가 짝수인 문자열입니다. |

**예시**

```javascript
> caver.utils.makeEven('0x011')
0x0011
```

## toTwosComplement <a href="#totwoscomplement" id="totwoscomplement"></a>

```javascript
caver.utils.toTwosComplement(num)
```

음수를 2의 보수로 변환합니다.

**매개변수**

| 이름  | 유형                            | 설명         |
| --- | ----------------------------- | ---------- |
| num | number \| string \| BigNumber | 변환할 숫자입니다. |

**리턴 값**

| 유형     | 설명               |
| ------ | ---------------- |
| string | 변환된 16진수 문자열입니다. |

**예시**

```javascript
> caver.utils.toTwosComplement('-1')
'0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'

> caver.utils.toTwosComplement(-1)
'0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'

> caver.utils.toTwosComplement('0x1')
'0x0000000000000000000000000000000000000000000000000000000000000001'

> caver.utils.toTwosComplement(-15)
'0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1'

> caver.utils.toTwosComplement('-0x1')
'0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
```

## isContractDeployment <a href="#iscontractdeployment" id="iscontractdeployment"></a>

```javascript
caver.utils.isContractDeployment(transactionObject)
```

주어진 트랜잭션이 스마트 컨트랙트 배포 트랜잭션인 경우 `true`를 반환합니다. 트랜잭션이 스마트 컨트랙트 배포 트랜잭션이 아닌 경우 `false`를 반환합니다. 결과는 `transactionObject`의 매개변수 값에 따라 결정됩니다. 모든 필수 파라미터가 올바르게 설정되었는지 확인하세요.

**매개변수**

| 이름                | 유형     | 설명                                                                                               |
| ----------------- | ------ | ------------------------------------------------------------------------------------------------ |
| transactionObject | object | 컨트랙트 배포 트랜잭션 여부를 확인하기 위한 [Transaction](./caver-transaction/caver-transaction.md#class)의 인스턴스입니다. |

**리턴 값**

| 유형      | 설명                                     |
| ------- | -------------------------------------- |
| boolean | `true`는 트랜잭션 객체가 스마트 컨트랙트 배포용임을 의미합니다. |

**예시**

```javascript
> caver.utils.isContractDeployment(caver.transaction.legacyTransaction.create({
    to: '0x9957dfd92e4b70f91131c573293343bc5f21f215',
    value: caver.utils.toPeb(1, `klay`),
    gas: 25000,
}))
false

> caver.utils.isContractDeployment(caver.transaction.legacyTransaction.create({
    input: '0x608060405234801561001057600080fd5b506101de806100206000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a72305820627ca46bb09478a015762806cc00c431230501118c7c26c30ac58c4e09e51c4f0029',
    gas: 200000,
}))
true

> caver.utils.isContractDeployment(caver.transaction.smartContractDeploy.create({
    from: '0x88e245dec96830f012f8fc1806bc623b3774560d',
    input: '0x608060405234801561001057600080fd5b506101de806100206000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a72305820627ca46bb09478a015762806cc00c431230501118c7c26c30ac58c4e09e51c4f0029',
    gas: 100000,
}))
true

> caver.utils.isContractDeployment(caver.transaction.feeDelegatedSmartContractDeploy.create({
    from: '0x88e245dec96830f012f8fc1806bc623b3774560d',
    input: '0x608060405234801561001057600080fd5b506101de806100206000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a72305820627ca46bb09478a015762806cc00c431230501118c7c26c30ac58c4e09e51c4f0029',
    gas: 100000,
}))
true

> caver.utils.isContractDeployment(caver.transaction.feeDelegatedSmartContractDeployWithRatio.create({
    from: '0x88e245dec96830f012f8fc1806bc623b3774560d',
    input: '0x608060405234801561001057600080fd5b506101de806100206000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a72305820627ca46bb09478a015762806cc00c431230501118c7c26c30ac58c4e09e51c4f0029',
    gas: 100000,
    feeRatio: 30,
}))
true
```

## xyPointFromPublicKey <a href="#xypointfrompublickey" id="xypointfrompublickey"></a>

```javascript
caver.utils.xyPointFromPublicKey(publicKey)
```

구문 분석된 클레이튼 지갑 키입니다. 키 암호화에 대한 자세한 내용은 [타원 곡선 암호화](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography)를 참조하세요.

**참고** 이 함수에는 공개키가 유효한지 확인하는 로직이 포함되어 있지 않습니다. 이 함수는 입력된 공개키를 길이에 따라 x와 y 포인트로 분할할 뿐입니다. 공개키의 유효성을 확인하려면 [isValidPublicKey](#isvalidpublickey)를 사용하세요.

**매개변수**

| 이름        | 유형     | 설명                     |
| --------- | ------ | ---------------------- |
| publicKey | string | x 및 y 포인트를 가져올 공개키입니다. |

**리턴 값**

| 유형    | 설명                                                            |
| ----- | ------------------------------------------------------------- |
| Array | x 및 y 포인트를 저장하는 배열입니다. 인덱스 0에는 x 포인트가 있고 인덱스 1에는 y 포인트가 있습니다. |

**예시**

```javascript
> caver.utils.xyPointFromPublicKey('0xa5862ded55cd9c7e9ff246dbc264ca5d5c605308f59b74e581b4f089d4c8c88cb9f00df6a56493f6029af215d266c907660ea0f7a4111ea025ea9d9be418fa55')
[ 
    '0xa5862ded55cd9c7e9ff246dbc264ca5d5c605308f59b74e581b4f089d4c8c88c',
    '0xb9f00df6a56493f6029af215d266c907660ea0f7a4111ea025ea9d9be418fa55'
]
```

## isHexPrefixed <a href="#ishexprefixed" id="ishexprefixed"></a>

```javascript
caver.utils.isHexPrefixed(input)
```

입력이 0x 접두사가 붙은 16진수 문자열이면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다.

**매개변수**

| 이름    | 유형     | 설명                                        |
| ----- | ------ | ----------------------------------------- |
| input | string | 매개변수가 0x 접두사가 붙은 16진수 문자열인지 여부를 결정할 값입니다. |

**리턴 값**

| 유형      | 설명                                       |
| ------- | ---------------------------------------- |
| boolean | `true`는 입력이 0x 접두사가 붙은 16진수 문자열임을 의미합니다. |

**예시**

```javascript
> caver.utils.isHexPrefixed('0xa5b0cd8c87e77879d64cc064ee239ed6f71cacf9')
true

> caver.utils.isHexPrefixed('0x1')
true

> caver.utils.isHexPrefixed('0xqwer')
false

> caver.utils.isHexPrefixed('1')
false
```

## addHexPrefix <a href="#addhexprefix" id="addhexprefix"></a>

```javascript
caver.utils.addHexPrefix(input)
```

0x 접두사가 붙은 16진수 문자열을 반환합니다. 입력값이 이미 0x 접두사가 붙은 문자열이거나 16진수가 아닌 문자열이면 입력값이 그대로 반환됩니다.

**매개변수**

| 이름    | 유형     | 설명                    |
| ----- | ------ | --------------------- |
| input | string | 접두사에 0x를 붙일 문자열 값입니다. |

**리턴 값**

| 유형     | 설명                          |
| ------ | --------------------------- |
| string | 0x 접두사가 붙은 16진수 문자열이 반환됩니다. |

**예시**

```javascript
> caver.utils.addHexPrefix('a5b0cd8c87e77879d64cc064ee239ed6f71cacf9')
'0xa5b0cd8c87e77879d64cc064ee239ed6f71cacf9'

> caver.utils.addHexPrefix('0xa5b0cd8c87e77879d64cc064ee239ed6f71cacf9')
'0xa5b0cd8c87e77879d64cc064ee239ed6f71cacf9'
```

## stripHexPrefix <a href="#striphexprefix" id="striphexprefix"></a>

```javascript
caver.utils.stripHexPrefix(input)
```

입력에서 0x 접두사가 제거된 결과를 반환합니다.

**참고** caver.klay.stripHexPrefix는 **v1.0.1**부터 지원됩니다. 이 기능을 사용하려면 [v1.0.1](https://www.npmjs.com/package/caver-js/v/1.0.1) 이상을 설치하세요.

**매개변수**

| 이름    | 유형     | 설명               |
| ----- | ------ | ---------------- |
| input | string | 0x 접두사를 제거할 문자열. |

**리턴 값**

| 유형     | 설명                  |
| ------ | ------------------- |
| string | 0x가 제거된 문자열이 반환됩니다. |

**예시**

```javascript
> caver.utils.stripHexPrefix('a5b0cd8c87e77879d64cc064ee239ed6f71cacf9')
'a5b0cd8c87e77879d64cc064ee239ed6f71cacf9'

> caver.utils.stripHexPrefix('0xa5b0cd8c87e77879d64cc064ee239ed6f71cacf9')
'a5b0cd8c87e77879d64cc064ee239ed6f71cacf9'
```

## toBuffer <a href="#tobuffer" id="tobuffer"></a>

```javascript
caver.utils.toBuffer(input)
```

이 함수는 입력을 [Buffer](https://nodejs.org/api/buffer.html)로 변환합니다. `toBuffer`를 사용하여 객체를 버퍼로 변환하려면 객체가 **toArray** 함수를 구현해야 합니다. 문자열 유형 입력의 경우, 이 함수는 **0x 접두사가 붙은 16진수 문자열**에서만 작동합니다.

**매개변수**

| 이름    | 유형                                                               | 설명            |
| ----- | ---------------------------------------------------------------- | ------------- |
| input | Buffer \| string \| number \| Array \| BN \| BigNumber \| object | 버퍼로 변환할 값입니다. |

**참고** `BigNumber` 타입은 caver-js [v1.6.4](https://www.npmjs.com/package/caver-js/v/1.6.4) 부터 지원됩니다.

**리턴 값**

| 유형     | 설명                    |
| ------ | --------------------- |
| Buffer | 버퍼 유형으로 변환된 값이 반환됩니다. |

**예시**

```javascript
// Buffer
> caver.utils.toBuffer(Buffer.alloc(0))
<Buffer >

// 0x-prefixed hex string
> caver.utils.toBuffer('0x1234')
<Buffer 12 34>

// number
> caver.utils.toBuffer(1)
<Buffer 01>

// Array
> caver.utils.toBuffer([1,2,3])
<Buffer 01 02 03>

// BN
> caver.utils.toBuffer(new caver.utils.BN(255))
<Buffer ff>

// Object that implements toArray function
> caver.utils.toBuffer({toArray: function() {return [1,2,3,4]}})
<Buffer 01 02 03 04>

// null or undefined
> caver.utils.toBuffer(null)
<Buffer >

> caver.utils.toBuffer(undefined)
<Buffer >

// non 0x-prefixed hex string
> caver.utils.toBuffer('0xqwer')
Error: Failed to convert string to Buffer. 'toBuffer' function only supports 0x-prefixed hex string

// Object that does not implement toArray function
> caver.utils.toBuffer({})
Error: To convert an object to a buffer, the toArray function must be implemented inside the object
```

## numberToBuffer <a href="#numbertobuffer" id="numbertobuffer"></a>

```javascript
caver.utils.numberToBuffer(input)
```

이 함수는 숫자를 [Buffer](https://nodejs.org/api/buffer.html)로 변환합니다. [caver.utils.toBuffer](#tobuffer)는 입력이 숫자일 때 이 함수와 동일한 동작을 합니다.

**매개변수**

| 이름    | 유형                                  | 설명             |
| ----- | ----------------------------------- | -------------- |
| input | string \| number \| BN \| BigNumber | 버퍼로 변환할 숫자입니다. |

**리턴 값**

| 유형     | 설명                    |
| ------ | --------------------- |
| Buffer | 버퍼 유형으로 변환된 값이 반환됩니다. |

**예시**

```javascript
> caver.utils.numberToBuffer(1)
<Buffer 01>

> caver.utils.numberToBuffer('2')
<Buffer 02>

> caver.utils.numberToBuffer('0x3')
<Buffer 03>

> caver.utils.numberToBuffer(new caver.utils.BN(4))
<Buffer 04>
```

## isValidHash <a href="#isvalidhash" id="isvalidhash"></a>

```javascript
caver.utils.isValidHash(input)
```

입력이 32바이트 해시 형식이면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다.

**매개변수**

| 이름    | 유형     | 설명                          |
| ----- | ------ | --------------------------- |
| input | string | 32바이트 해시 형식인지 여부를 검사할 값입니다. |

**리턴 값**

| 유형      | 설명                               |
| ------- | -------------------------------- |
| boolean | `true`는 입력이 32바이트 해시 형식임을 의미합니다. |

**예시**

```javascript
// with '0x' hex prefix
> caver.utils.isValidHash('0xe9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550')
true

// without '0x' hex prefix
> caver.utils.isValidHash('e9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550')
true

> caver.utils.isValidHash('0x1')
false
```

## isValidHashStrict <a href="#isvalidhashstrict" id="isvalidhashstrict"></a>

```javascript
caver.utils.isValidHashStrict(input)
```

입력이 0x 접두사가 붙은 32바이트 해시 형식이면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다. 이 함수는 입력만 보고 입력이 0x 접두사가 붙은 32바이트 해시 형식인지 확인합니다. [caver.utils.isValidHash](#isvalidhash)와 다른 점은 HEX의 접두사가 `0x`로 시작될 것으로 예상한다는 것입니다.

**매개변수**

| 이름    | 유형     | 설명                                     |
| ----- | ------ | -------------------------------------- |
| input | string | 0x 접두사가 붙은 32바이트 해시 형식인지 여부를 검사할 값입니다. |

**리턴 값**

| 유형      | 설명                                          |
| ------- | ------------------------------------------- |
| boolean | `true`는 입력이 0x 접두사가 붙은 32바이트 해시 형식임을 의미합니다. |

**예시**

```javascript
// with '0x' hex prefix
> caver.utils.isValidHashStrict('0xe9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550')
true

// without '0x' hex prefix
> caver.utils.isValidHashStrict('e9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550')
false

> caver.utils.isValidHashStrict('0x1')
false
```

## isTxHash <a href="#istxhash" id="istxhash"></a>

```javascript
caver.utils.isTxHash(input)
```

입력이 트랜잭션 해시 형식이면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다. 이 함수는 입력만 보고 트랜잭션 해시 형식인지 여부를 판단합니다.

**참고** 이 함수는 더 이상 사용되지 않습니다. 유효한 해시의 길이가 32바이트인지 확인하려면 [isValidHash](#isvalidhash)를 사용하세요.

**파라미터**

| 이름    | 유형     | 설명                               |
| ----- | ------ | -------------------------------- |
| input | string | 매개변수가 트랜잭션 해시 형식인지 여부를 확인할 값입니다. |

**리턴 값**

| 유형      | 설명                              |
| ------- | ------------------------------- |
| boolean | `true`는 입력이 트랜잭션 해시 형식임을 의미합니다. |

**예시**

```javascript
// with '0x' hex prefix
> caver.utils.isTxHash('0xe9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550')
true

// without '0x' hex prefix
> caver.utils.isTxHash('e9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550')
true

> caver.utils.isTxHash('0x1')
false
```

## isTxHashStrict <a href="#istxhashstrict" id="istxhashstrict"></a>

```javascript
caver.utils.isTxHashStrict(input)
```

입력이 트랜잭션 해시 형식이면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다. 이 함수는 입력만 살펴보고 트랜잭션 해시 형식인지 여부를 판단합니다. [caver.utils.isTxHash](#istxhash)와 다른 점은 HEX 앞에 `0x`가 붙을 것으로 예상한다는 점입니다.

**참고** 이 함수는 더 이상 사용되지 않습니다. 유효한 해시의 길이가 32바이트인지 확인하려면 [isValidHashStrict](#isvalidhashstrict)를 사용하세요.

**매개변수**

| 이름    | 유형     | 설명                               |
| ----- | ------ | -------------------------------- |
| input | string | 매개변수가 트랜잭션 해시 형식인지 아닌지 확인할 값입니다. |

**리턴 값**

| 유형      | 설명                              |
| ------- | ------------------------------- |
| boolean | `true`는 입력이 트랜잭션 해시 형식임을 의미합니다. |

**예시**

```javascript
// with '0x' hex prefix
> caver.utils.isTxHashStrict('0xe9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550')
true

// without '0x' hex prefix
> caver.utils.isTxHashStrict('e9a11d9ef95fb437f75d07ce768d43e74f158dd54b106e7d3746ce29d545b550')
false

> caver.utils.isTxHashStrict('0x1')
false
```

## isValidPrivateKey <a href="#isvalidprivatekey" id="isvalidprivatekey"></a>

```javascript
caver.utils.isValidPrivateKey(privateKey)
```

`privateKey`가 유효하면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다.

**매개변수**

| 이름         | 유형     | 설명                    |
| ---------- | ------ | --------------------- |
| privateKey | string | 유효성을 검사할 개인 키 문자열입니다. |

**리턴 값**

| 유형      | 설명                       |
| ------- | ------------------------ |
| boolean | `true`는 개인키가 유효함을 의미합니다. |

**예시**

```javascript
> caver.utils.isValidPrivateKey('0x{private key}')
true

> caver.utils.isValidPrivateKey('{private key}')
true

> caver.utils.isValidPrivateKey('a5b0cd8c87e77879d64cc064ee239ed6f71cacf9')
false
```

## isValidPublicKey <a href="#isvalidpublickey" id="isvalidpublickey"></a>

```javascript
caver.utils.isValidPublicKey(publicKey)
```

공개키가 유효하면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다.

**매개변수**

| 이름        | 유형     | 설명                   |
| --------- | ------ | -------------------- |
| publicKey | string | 유효성을 검사할 공개키 문자열입니다. |

**리턴 값**

| 유형      | 설명                       |
| ------- | ------------------------ |
| boolean | `true`는 공개키가 유효함을 의미합니다. |

**예시**

```javascript
// validation with uncompressed public key
> caver.utils.isValidPublicKey('0xbd6405a7f14f57ecea4a6ffe774ee26d051f7eed13257c9a574055b20e42bab0e8beba92e2e675101eb2a55ba4693080d0bf14548beae7bc93b18b72d10dd350')
true

// validation with compressed public key
> caver.utils.isValidPublicKey('0x02bd6405a7f14f57ecea4a6ffe774ee26d051f7eed13257c9a574055b20e42bab0')
true

> caver.utils.isValidPublicKey('{private key}')
false

> caver.utils.isValidPublicKey('0x{private key}')
false

> caver.utils.isValidPublicKey('a5b0cd8c87e77879d64cc064ee239ed6f71cacf9')
false
```

## isValidRole <a href="#isvalidrole" id="isvalidrole"></a>

```javascript
caver.utils.isValidRole(role)
```

역할이 유효하면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다. caver-js가 지원하는 역할은 `caver.wallet.keyring.role`을 통해 확인할 수 있습니다.

**매개변수**

| 이름   | 유형     | 설명                  |
| ---- | ------ | ------------------- |
| role | string | 유효성을 검사할 역할 문자열입니다. |

**리턴 값**

| 유형      | 설명                      |
| ------- | ----------------------- |
| boolean | `true`는 역할이 유효함을 의미합니다. |

**예시**

```javascript
> caver.utils.isValidRole('roleTransactionKey')
true

> caver.utils.isValidRole('role')
false
```

## isValidBlockNumberCandidate <a href="#isvalidblocknumbercandidate" id="isvalidblocknumbercandidate"></a>

```javascript
caver.utils.isValidBlockNumberCandidate(input)
```

블록 번호(또는 블록 태그 문자열)의 유효성을 검사합니다.

블록 번호는 아래 유형 중 하나이어야 합니다:

- 사전 정의된 블록 번호 예:) 'latest', 'earliest', 'pending', 'genesis'
- hex
- 유한 숫자

**매개변수**

| 이름          | 유형               | 설명                                                                                                                   |
| ----------- | ---------------- | -------------------------------------------------------------------------------------------------------------------- |
| blockNumber | string \| number | 유효성을 검사할 블록 번호입니다. 숫자 타입의 블록 번호 또는 블록 태그(`latest`, `pending`, `earliest`, `genesis`) 문자열일 수 있습니다. |

**리턴 값**

| 유형      | 설명                         |
| ------- | -------------------------- |
| boolean | `true`는 블록 번호가 유효함을 의미합니다. |

**예시**

```javascript
> caver.utils.isValidBlockNumberCandidate('latest')
true

> caver.utils.isValidBlockNumberCandidate('0x1')
true

> caver.utils.isValidBlockNumberCandidate(1)
true
```

## isPredefinedBlockNumber <a href="#ispredefinedblocknumber" id="ispredefinedblocknumber"></a>

```javascript
caver.utils.isPredefinedBlockNumber(input)
```

매개변수가 미리 정의된 블록 태그인 경우 `true`를 반환합니다.

**매개변수**

| 이름              | 유형     | 설명            |
| --------------- | ------ | ------------- |
| predefinedBlock | string | 미리 정의된 블록입니다. |

**리턴 값**

| 유형      | 설명                                         |
| ------- | ------------------------------------------ |
| boolean | `true`는 사전 정의 블록이 유효한 사전 정의 블록 태그임을 의미합니다. |

**예시**

```javascript
> caver.utils.isPredefinedBlockNumber('latest')
true

> caver.utils.isPredefinedBlockNumber('0x1')
false
```

## isEmptySig <a href="#isemptysig" id="isemptysig"></a>

```javascript
caver.utils.isEmptySig(sig)
```

sig가 빈 서명 형식이면 `true`를 반환합니다(`SignatureData { _v: '0x01', _r: '0x', _s: '0x' }` 또는 `[SignatureData { _v: '0x01', _r: '0x', _s: '0x' }]`), 그렇지 않으면 `false`를 반환합니다.

caver-js에서 서명 또는 feePayerSignatures가 비어 있으면 해당 속성에 대해 빈 서명을 나타내는 값인 `[SignatureData { _v: '0x01', _r: '0x', _s: '0x' }]`가 반환됩니다. 이 함수는 주어진 서명이 `[SignatureData { _v: '0x01', _r: '0x', _s: '0x' }]`인지 (또는 `SignatureData { _v: '0x01', _r: '0x', _s: '0x' }`를 'LEGACY' 트랜잭션에서).

**매개변수**

| 이름  | 유형              | 설명                                                                                                                                        |
| --- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| sig | object \| Array | 비어 있는지 여부를 확인할 [SignatureData](caver-wallet/keyring.md#signaturedata)의 인스턴스 또는 [SignatureData](caver-wallet/keyring.md#signaturedata) 배열. |

**리턴 값**

| 유형      | 설명                       |
| ------- | ------------------------ |
| boolean | `true`는 서명이 비어있음을 의미합니다. |

**예시**

```javascript
> caver.utils.isEmptySig(caver.wallet.keyring.signatureData.emtpySig)
true

> caver.utils.isEmptySig([caver.wallet.keyring.signatureData.emtpySig])
true
```

## isKlaytnWalletKey <a href="#isklaytnwalletkey" id="isklaytnwalletkey"></a>

```javascript
caver.utils.isKlaytnWalletKey(key)
```

키가 [KlaytnWalletKey](caver-wallet/keyring.md#signaturedata) 형식이면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다.

**매개변수**

| 이름  | 유형     | 설명                             |
| --- | ------ | ------------------------------ |
| key | string | 클레이튼월렛키 형식인지 여부를 확인할 키 문자열입니다. |

**리턴 값**

| 유형      | 설명                                                                                                           |
| ------- | ------------------------------------------------------------------------------------------------------------ |
| boolean | `true`는 키가 `0x{private key}0x{type}0x{address in hex}` 또는 `{private key}0x{type}0x{address in hex}`라는 의미입니다. |

**예시**

```javascript
> caver.utils.isKlaytnWalletKey('0x{private key}0x{type}0x{address in hex}')
true

> caver.utils.isKlaytnWalletKey('{private key}0x{type}0x{address in hex}')
true

> caver.utils.isKlaytnWalletKey('0x{private key}')
false
```

## bufferToHex <a href="#buffertohex" id="buffertohex"></a>

```javascript
caver.utils.bufferToHex(buffer)
```

버퍼를 0x 접두사가 붙은 16진수 문자열로 변환합니다.

**매개변수**

| 이름     | 유형     | 설명                   |
| ------ | ------ | -------------------- |
| buffer | Buffer | 16진수 문자열로 변환할 버퍼입니다. |

**리턴 값**

| 유형     | 설명                      |
| ------ | ----------------------- |
| string | 0x 접두사가 붙은 16진수 문자열입니다. |

**예시**

```javascript
> caver.utils.bufferToHex(Buffer.from('5b9ac8', 'hex'))
'0x5b9ac8'

> caver.utils.bufferToHex(Buffer.alloc(0))
'0x'
```

## parseKlaytnWalletKey <a href="#parseklaytnwalletkey" id="parseklaytnwalletkey"></a>

```javascript
caver.utils.parseKlaytnWalletKey(key)
```

[KlaytnWalletKey](../../../../learn/accounts.md#klaytn-wallet-key-format) 문자열을 "개인키", "유형", "주소"가 포함된 배열로 파싱합니다.

**매개변수**

| 이름  | 유형     | 설명                                                                             |
| --- | ------ | ------------------------------------------------------------------------------ |
| key | string | [KlaytnWalletKey](../../../../learn/accounts.md#klaytn-wallet-key-format) 문자열. |

**리턴 값**

| 유형    | 설명                  |
| ----- | ------------------- |
| Array | 파싱된 KlaytnWalletKey |

**예시**

```javascript
> caver.utils.parseKlaytnWalletKey('0x{private key}0x{type}0x{address in hex}')
[
    '0x{private key}',
    '0x00',
    '0x885ebdb17c221ef695936b18a0263d6399e14d60'
]
```

## hashMessage <a href="#hashmessage" id="hashmessage"></a>

```javascript
caver.utils.hashMessage(message)
```

클레이튼 특정 접두사로 메시지를 해시합니다: `keccak256("\x19Klaytn Signed Message:\n" + len(message) + message))`.

**파라미터**

| 이름      | 유형     | 설명                                        |
| ------- | ------ | ----------------------------------------- |
| message | string | 해시할 메시지입니다. HEX 문자열인 경우 UTF-8로 먼저 디코딩됩니다. |

**리턴 값**

| 유형     | 설명                           |
| ------ | ---------------------------- |
| string | 클레이튼 특정 접두사가 포함된 해시된 메시지입니다. |

**예시**

```javascript
> caver.utils.hashMessage('Hello')
'0x640bfab59b6e27468abd367888f4ab1a1c77aa2b45e76a1d3adcbd039c305917'
```

## recover <a href="#recover" id="recover"></a>

```javascript
caver.utils.recover(message, signature [, isHashed])
```

주어진 데이터에 서명하는 데 사용된 클레이튼 주소를 복구합니다.

**매개변수**

| 이름        | 유형              | 설명                                                                                                                                                                             |
| --------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| message   | string          | 메시지 또는 해시된 메시지.                                                                                                                                                                |
| signature | object \| Array | [서명데이터](caver-wallet/keyring.md#signaturedata)의 인스턴스.                                                                                                                          |
| isHashed  | boolean         | (선택 사항, 기본값: `false`) 마지막 매개변수가 `true`인 경우, 주어진 `메시지`에 `"\x19Klaytn Signed Message:\n" + message.length + message`가 자동으로 접두사로 붙지 않으며, 이미 접두사가 붙은 것으로 간주됩니다. |

**리턴 값**

| 유형     | 설명                            |
| ------ | ----------------------------- |
| string | 이 데이터에 서명하는 데 사용된 클레이튼 주소입니다. |

**예시**

```javascript
> caver.utils.recover('message', new caver.wallet.keyring.signatureData(['0x1b', '0x50a80...', '0x021de...']))
'0xe8b3a6ef12f9506e1df9fd445f9bb4488a482122'

> caver.utils.recover('message', ['0x1b', '0x50a80...', '0x021de...'])
'0xe8b3a6ef12f9506e1df9fd445f9bb4488a482122'

> caver.utils.recover('message', { v: '0x1b', r: '0x50a80...', s: '0x021de...' })
'0xe8b3a6ef12f9506e1df9fd445f9bb4488a482122'

> caver.utils.recover('0xe960248437f2134a77a9aa0ebcbb6523aec095f23b02e25f16fd95e99b099daa', sig, true)
'0xe8b3a6ef12f9506e1df9fd445f9bb4488a482122'
```

## recoverPublicKey <a href="#recoverpublickey" id="recoverpublickey"></a>

```javascript
caver.utils.recoverPublicKey(message, signature [, isHashed])
```

주어진 데이터에 서명하는 데 사용된 공개키를 복구합니다.

**참고** `caver.utils.recoverPublicKey`는 caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3) 부터 지원됩니다.

**매개변수**

| 이름        | 유형              | 설명                                                                                                                                     |
| --------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| message   | string          | 메시지 또는 해시된 메시지.                                                                                                                        |
| signature | object \| Array | [SignatureData](caver-wallet/keyring.md#signaturedata)의 인스턴스.                                                                          |
| isHashed  | boolean         | (선택 사항, 기본값: `false`) 매개변수로 전달된 메시지가 접두사 `"\x19Klaytn Signed Message:\n" + message.length + message`로 해시되었는지 여부입니다. |

**리턴 값**

| 유형     | 설명                         |
| ------ | -------------------------- |
| string | 이 데이터를 서명하는 데 사용된 공개 키입니다. |

**예시**

```javascript
> caver.utils.recoverPublicKey('Some Message', new caver.wallet.keyring.signatureData([
	'0x1b',
	'0x8213e560e7bbe1f2e28fd69cbbb41c9108b84c98cd7c2c88d3c8e3549fd6ab10',
	'0x3ca40c9e20c1525348d734a6724db152b9244bff6e0ff0c2b811d61d8f874f00',
]))
'0xb5df4d5e6b4ee7a136460b911a69030fdd42c18ed067bcc2e25eda1b851314fad994c5fe946aad01ca2e348d4ff3094960661a8bc095f358538af54aeea48ff3'

> caver.utils.recoverPublicKey('Some Message', [
	'0x1b',
	'0x8213e560e7bbe1f2e28fd69cbbb41c9108b84c98cd7c2c88d3c8e3549fd6ab10',
	'0x3ca40c9e20c1525348d734a6724db152b9244bff6e0ff0c2b811d61d8f874f00',
])
'0xb5df4d5e6b4ee7a136460b911a69030fdd42c18ed067bcc2e25eda1b851314fad994c5fe946aad01ca2e348d4ff3094960661a8bc095f358538af54aeea48ff3'

> caver.utils.recoverPublicKey('0x8ed2036502ed7f485b81feaec1c581d236a8b711e55a24077724879c8a263c2a', {
	v: '0x1b',
	r: '0x3acab5ba6f884eccfb9642018aa6debab1310d99b7a84ae9acb8f52f567cf16a',
	s: '0x3501ae03809bf93222c4683642fa8fdc36385709c70ed8e7b883b34d66a5b8a4',
}, true)
'0xdd352dbe1c49aa9addaa3ca762de476a1b4deca3ac15fbb7fac153737b3ddb1e3249e1c2d86d5cbeaf6d30d366a211532683b59cb5f402bf3fe14989a378d45d'
```

## publicKeyToAddress <a href="#publickeytoaddress" id="publickeytoaddress"></a>

```javascript
caver.utils.publicKeyToAddress('0x{public key}')
```

공개 키에서 파생된 주소를 반환합니다. 이 함수는 단순히 공개키 문자열을 해싱하여 주소 형식으로 변환합니다. 클레이튼의 실제 계정과는 아무런 관련이 없습니다.

**참고** `caver.utils.publicKeyToAddress`는 caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3) 부터 지원됩니다.

**매개변수**

| 이름        | 유형     | 설명                  |
| --------- | ------ | ------------------- |
| publicKey | string | 주소를 가져올 공개키 문자열입니다. |

**리턴 값**

| 유형     | 설명                    |
| ------ | --------------------- |
| string | 공개 키에서 파생된 주소 문자열입니다. |

**예시**

```javascript
> caver.utils.publicKeyToAddress('0xb5df4d5e6b4ee7a136460b911a69030fdd42c18ed067bcc2e25eda1b851314fad994c5fe946aad01ca2e348d4ff3094960661a8bc095f358538af54aeea48ff3')
'0xA84A1CE657e9d5b383cECE6f4bA365e23Fa234Dd'
```

## compressPublicKey <a href="#compresspublickkey" id="compresspublickkey"></a>

```javascript
caver.utils.compressPublicKey(uncompressedPublicKey)
```

압축되지 않은 공개키를 압축합니다.

**파라미터**

| 이름                    | 유형     | 설명              |
| --------------------- | ------ | --------------- |
| uncompressedPublicKey | string | 압축되지 않은 공개키입니다. |

**리턴 값**

| 유형     | 설명           |
| ------ | ------------ |
| string | 압축된 공개 키입니다. |

**예시**

```javascript
> caver.utils.compressPublicKey('0x62cef87819b82f62e9c0a38c1fa7dfa089084959df86aca19ff2f6c903db2248b45dc23220ee6bcd8753bb9df8ce7d58e56eabebb14479f3a0ca5ccd4bdea632')
'0x0262cef87819b82f62e9c0a38c1fa7dfa089084959df86aca19ff2f6c903db2248'
```

## decompressPublicKey <a href="#decompresspublickkey" id="decompresspublickkey"></a>

```javascript
caver.utils.decompressPublicKey(compressedPublicKey)
```

압축된 공개키의 압축을 해제합니다.

**매개변수**

| 이름                  | 유형     | 설명          |
| ------------------- | ------ | ----------- |
| compressedPublicKey | string | 압축된 공개키입니다. |

**리턴 값**

| 유형     | 설명               |
| ------ | ---------------- |
| string | 압축되지 않은 공개 키입니다. |

**예시**

```javascript
> caver.utils.decompressPublicKey('0x0262cef87819b82f62e9c0a38c1fa7dfa089084959df86aca19ff2f6c903db2248')
'0x62cef87819b82f62e9c0a38c1fa7dfa089084959df86aca19ff2f6c903db2248b45dc23220ee6bcd8753bb9df8ce7d58e56eabebb14479f3a0ca5ccd4bdea632'
```

## isCompressedPublicKey <a href="#iscompressedpublickey" id="iscompressedpublickey"></a>

```javascript
caver.utils.isCompressedPublicKey(publicKey)
```

공개키가 압축되면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다.

**매개변수**

| 이름        | 유형     | 설명      |
| --------- | ------ | ------- |
| publicKey | string | 공개키입니다. |

**리턴 값**

| 유형      | 설명                    |
| ------- | --------------------- |
| boolean | `true`는 압축된 것을 의미합니다. |

**예시**

```javascript
> caver.utils.isCompressedPublicKey('0x0262cef87819b82f62e9c0a38c1fa7dfa089084959df86aca19ff2f6c903db2248')
true
```

## decodeSignature <a href="#decodesignature" id="decodesignature"></a>

```javascript
caver.utils.decodeSignature('0x{signature}')
```

'R(32바이트) + S(32바이트) + V(1바이트)'로 구성된 서명 원시 데이터를 복호화합니다.

**참고** `caver.utils.decodeSignature`는 caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3) 부터 지원됩니다.

**매개변수**

| 이름        | 유형     | 설명                                                                                                             |
| --------- | ------ | -------------------------------------------------------------------------------------------------------------- |
| signature | string | 디코딩할 서명 문자열입니다. R(32바이트) + S(32바이트) + V(1바이트)로 구성됩니다. |

**리턴 값**

| 유형     | 설명                                           |
| ------ | -------------------------------------------- |
| object | `v`, `r`, `s`를 포함하는 `SignatureData` 인스턴스입니다. |

**예시**

```javascript
> caver.utils.decodeSignature('0xc69018da9396c4b87947e0784625af7475caf46e2af9cf57a44673ff0f625258642d8993751ae67271bcc131aa065adccf9f16fc4953f9c48f4a80d675c09ae81b')
SignatureData {
  _v: '0x1b',
  _r: '0xc69018da9396c4b87947e0784625af7475caf46e2af9cf57a44673ff0f625258',
  _s: '0x642d8993751ae67271bcc131aa065adccf9f16fc4953f9c48f4a80d675c09ae8'
}
```
