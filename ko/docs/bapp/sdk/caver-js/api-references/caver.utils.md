- - -
description: >- caver-js utility APIs.
- - -

# caver.utils <a id="caver-utils"></a>

`caver.utils`는 유틸리티 함수를 제공합니다.


## randomHex <a id="randomhex"></a>

```javascript
caver.utils.randomHex(size)
```
주어진 바이트 크기로부터 암호학적으로 강력한 의사 난수 HEX 문자열을 생성하기 위한 [randomHex](https://github.com/frozeman/randomHex) 라이브러리.

**매개변수**

| 명칭   | 타입     | 설명                                                                                                                        |
| ---- | ------ | ------------------------------------------------------------------------------------------------------------------------- |
| size | number | The byte size for the HEX string, *e.g.*, `32` will result in a 32-byte HEX string with 64 characters prefixed with "0x". |

**리턴값**

| 타입  | 설명               |
| --- | ---------------- |
| 문자열 | 생성된 임의의 HEX 문자열. |

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

## \_ <a id="\_"></a>

```javascript
caver.utils._()
```

The [underscore](http://underscorejs.org) library for many convenient JavaScript functions.

자세한 내용은 [underscore API reference](http://underscorejs.org)를 참조하세요.

**예시**

```javascript
> var _ = caver.utils._

> _.union([1,2],[3])
[1,2,3]

> _.each({my: 'object'}, function(value, key){ ... })
...
```

## toBN <a id="tobn"></a>

```javascript
caver.utils.toBN(number)
```
Safely converts any given value (including [Bignumber.js](http://mikemcl.github.io/bignumber.js/) instances) into a [BN.js](https://github.com/indutny/bn.js/) instance, for handling big numbers in JavaScript.

**매개변수**

| 명칭     | 타입                   | 설명                                 |
| ------ | -------------------- | ---------------------------------- |
| number | string &#124; number | number to convert to a big number. |

**리턴값**

| 타입     | 설명                                               |
| ------ | ------------------------------------------------ |
| Object | [BN.js](https://github.com/indutny/bn.js/) 인스턴스. |

**예제**

```javascript
> caver.utils.toBN(1234).toString()
'1234'

> caver.utils.toBN('1234').add(caver.utils.toBN('1')).toString()
'1235'

> caver.utils.toBN('0xea').toString()
'234'
```


## isBN <a id="isbn"></a>

```javascript
caver.utils.isBN(bn)
```

주어진 값이 [BN.js](https://github.com/indutny/bn.js/) 인스턴스인지 확인합니다.


**매개변수**

| 명칭 | 타입     | 설명                                               |
| -- | ------ | ------------------------------------------------ |
| bn | object | [BN.js](https://github.com/indutny/bn.js/) 인스턴스. |

**리턴값**

| 타입      | 설명                                                                 |
| ------- | ------------------------------------------------------------------ |
| boolean | 주어진 값이 [BN.js](https://github.com/indutny/bn.js/) 인스턴스인 경우 `true`. |

**예시**

```javascript
> var number = new BN(10)
> caver.utils.isBN(number)
true
```


## isBigNumber <a id="isbignumber"></a>

```javascript
caver.utils.isBigNumber(bignumber)
```

Checks if a given value is a [Bignumber.js](http://mikemcl.github.io/bignumber.js/) instance.

**매개변수**

| 명칭        | 타입     | 설명                                                                 |
| --------- | ------ | ------------------------------------------------------------------ |
| bignumber | object | A [Bignumber.js](http://mikemcl.github.io/bignumber.js/) instance. |

**리턴값**

| 타입      | 설명                                                    |
| ------- | ----------------------------------------------------- |
| boolean | `true` if a given value is a `Bignumber.js` instance. |

**예시**

```javascript
> var number = new Bignumber(10)
> caver.utils.isBigNumber(number)
true
```


## sha3 <a id="sha3"></a>

```javascript
caver.utils.sha3(str)
caver.utils.keccak256(str) // ALIAS
```
입력의 sha3을 계산합니다.

**참고**: 솔리디티의 sha3를 모방하려면 [caver.utils.soliditySha3](#soliditysha3)를 사용합니다.

**매개변수**

| 명칭  | 타입  | 설명       |
| --- | --- | -------- |
| str | 문자열 | 해시할 문자열. |

**리턴값**

| 타입  | 설명     |
| --- | ------ |
| 문자열 | 결과 해시. |

**예시**

```javascript
> caver.utils.sha3('234') // taken as string
'0xc1912fee45d61c87cc5ea59dae311904cd86b84fee17cc96966216f811ce6a79'

> caver.utils.sha3(new BN('234')) // utils.sha3 stringify bignumber instance.
'0xc1912fee45d61c87cc5ea59dae311904cd86b84fee17cc96966216f811ce6a79'

> caver.utils.sha3(234)
null // can't calculate the has of a number

> caver.utils.sha3(0xea) // same as above, just the HEX representation of the number
null

> caver.utils.sha3('0xea') // will be converted to a byte array first, and then hashed
'0x2f20677459120677484f7104c76deb6846a2c071f9b3152c103bb12cd54d1a4a'
```

## soliditySha3 <a id="soliditysha3"></a>

```javascript
caver.utils.soliditySha3(param1 [, param2, ...])
```

솔리디티와 같은 방식으로 주어진 입력 매개변수의 sha3를 계산합니다. 이는 인자가 해시되기 전에 ABI 변환되고 빽빽히 채워질 것을 의미합니다.

**매개변수**

| 명칭     | 타입 | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------ | -- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| paramX | 복합 | 모든 타입, 또는 `{type: 'uint', value: '123456'}` or `{t: 'bytes', v: '0xfff456'}` 객체. Basic types are autodetected as follows:<br> - `string` non numerical UTF-8 string is interpreted as `string`.<br> - `string|number|BN|HEX` positive number is interpreted as `uint256`.<br> - `string|number|BN` negative number is interpreted as `int256`.<br> - `boolean` as `bool`.<br> - `string` HEX string with leading `0x` is interpreted as `bytes`.<br> - `HEX` HEX number representation is interpreted as `uint256`.<br> |

**리턴값**

| 타입  | 설명     |
| --- | ------ |
| 문자열 | 결과 해시. |

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

> caver.utils.soliditySha3(new BN('234')) // same as above
'0x61c831beab28d67d1bb40b5ae1a11e2757fa842f031a2d0bc94a7867bc5d26c2'

> caver.utils.soliditySha3({type: 'uint256', value: '234'})) // same as above
'0x61c831beab28d67d1bb40b5ae1a11e2757fa842f031a2d0bc94a7867bc5d26c2'

> caver.utils.soliditySha3({t: 'uint', v: new BN('234')})) // same as above
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


## isHex <a id="ishex"></a>

```javascript
caver.utils.isHex(hex)
```
주어진 문자열이 HEX 문자열인지 확인합니다.

**매개변수**

| 명칭  | 타입  | 설명           |
| --- | --- | ------------ |
| hex | 문자열 | 주어진 HEX 문자열. |

**리턴값**

| 타입      | 설명                                           |
| ------- | -------------------------------------------- |
| boolean | `true` if a given parameter is a HEX string. |

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

## isHexStrict <a id="ishexstrict"></a>

```javascript
caver.utils.isHexStrict(hex)
```
주어진 문자열이 HEX 문자열인지 확인합니다. [caver.utils.isHex](#ishex)와의 차이점은 HEX 앞에 `0x`이 붙는다는 것입니다.

**매개변수**

| 명칭  | 타입  | 설명           |
| --- | --- | ------------ |
| hex | 문자열 | 주어진 HEX 문자열. |

**리턴값**

| 타입      | 설명                         |
| ------- | -------------------------- |
| boolean | 주어진 문자열이 HEX 문자열이면 `true`. |


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


## isAddress <a id="isaddress"></a>

```javascript
caver.utils.isAddress(address)
```
주어진 문자열이 유효한 Klaytn 주소인지 확인합니다. It will also check the checksum if the address has upper and lowercase letters.

**매개변수**

| 명칭      | 타입  | 설명      |
| ------- | --- | ------- |
| address | 문자열 | 주소 문자열. |

**리턴값**

| 타입      | 설명                               |
| ------- | -------------------------------- |
| boolean | 주어진 문자열이 유효한 Klaytn 주소라면 `true`. |

**예제**

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


## toChecksumAddress <a id="tochecksumaddress"></a>

```javascript
caver.utils.toChecksumAddress(address)
```
대문자 또는 소문자 Klaytn 주소를 체크섬(Checksum) 주소로 변환합니다.

**매개변수**

| 명칭      | 타입  | 설명      |
| ------- | --- | ------- |
| address | 문자열 | 주소 문자열. |

**리턴값**

| 타입  | 설명                |
| --- | ----------------- |
| 문자열 | 체크섬(Checksum) 주소. |

**예제**

```javascript
> caver.utils.toChecksumAddress('0xc1912fee45d61c87cc5ea59dae31190fffff232d')
'0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d'

> caver.utils.toChecksumAddress('0XC1912FEE45D61C87CC5EA59DAE31190FFFFF232D')
'0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d' // same as above
```


## checkAddressChecksum <a id="checkaddresschecksum"></a>

```javascript
caver.utils.checkAddressChecksum(address)
```
주어진 주소의 체크섬(Checksum)을 확인합니다. 또한 체크섬이 아닌 주소에서 `false`를 반환합니다.

**매개변수**

| 명칭      | 타입  | 설명      |
| ------- | --- | ------- |
| address | 문자열 | 주소 문자열. |

**리턴값**

| 타입      | 설명                                                        |
| ------- | --------------------------------------------------------- |
| boolean | 주소의 체크섬이 유효하면 `true`, 체크섬 주소가 아니거나 체크섬이 유효하지 않으면 `false`. |

**예제**

```javascript
> caver.utils.checkAddressChecksum('0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d')
true
```

## toHex <a id="tohex"></a>

```javascript
caver.utils.toHex(mixed)
```
주어진 값을 HEX로 변환합니다. The numeric strings will be interpreted as numbers. 텍스트 문자열은 UTF-8 문자열로 해석됩니다.

**매개변수**

| 명칭    | 타입                                              | 설명            |
| ----- | ----------------------------------------------- | ------------- |
| mixed | string &#124; number &#124; BN &#124; Bignumber | HEX로 변환할 입력값. |

**리턴값**

| 타입  | 설명          |
| --- | ----------- |
| 문자열 | 결과 HEX 문자열. |

**예제**

```javascript
> caver.utils.toHex('234')
'0xea'

> caver.utils.toHex(234)
'0xea'

> caver.utils.toHex(new BN('234'))
'0xea'

> caver.utils.toHex(new Bignumber('234'))
'0xea'

> caver.utils.toHex('I have 100€')
'0x49206861766520313030e282ac'
```

## hexToNumberString <a id="hextonumberstring"></a>

```javascript
caver.utils.hexToNumberString(hex)
```

주어진 HEX 값의 숫자 표현을 문자열로 반환합니다.

**매개변수**

| 명칭        | 타입  | 설명           |
| --------- | --- | ------------ |
| hexstring | 문자열 | 변환할 HEX 문자열. |

**리턴값**

| 타입  | 설명         |
| --- | ---------- |
| 문자열 | 문자열로 된 숫자. |

**예제**

```javascript
> caver.utils.hexToNumberString('0xea')
"234"
```

## hexToNumber <a id="hextonumber"></a>

```javascript
caver.utils.hexToNumber(hex)
```
주어진 HEX 값을 숫자로 반환합니다.

**참고**: 큰 숫자에는 유용하지 않으며, [caver.utils.toBN](#tobn)를 대신 사용합니다.

**매개변수**

| 명칭        | 타입  | 설명           |
| --------- | --- | ------------ |
| hexstring | 문자열 | 변환할 HEX 문자열. |

**리턴값**

| 타입     | 설명                |
| ------ | ----------------- |
| number | 주어진 HEX 값의 숫자 표현. |

**예제**

```javascript
> caver.utils.hexToNumber('0xea')
234
```

## numberToHex <a id="numbertohex"></a>

```javascript
caver.utils.numberToHex(number)
```
주어진 숫자 값을 HEX 표현으로 반환합니다.

**매개변수**

| 명칭     | 타입                                              | 설명               |
| ------ | ----------------------------------------------- | ---------------- |
| number | string &#124; number &#124; BN &#124; Bignumber | 문자열 또는 숫자로 된 숫자. |

**리턴값**

| 타입  | 설명             |
| --- | -------------- |
| 문자열 | 주어진 숫자의 HEX 값. |

**예제**

```javascript
> caver.utils.numberToHex('234')
'0xea'
```

## hexToUtf8 <a id="hextoutf8"></a>

```javascript
caver.utils.hexToUtf8(hex)
caver.utils.hexToString(hex) // ALIAS
```
주어진 HEX 값을 UTF-8 문자열 표현으로 반환합니다.

**매개변수**

| 명칭  | 타입  | 설명                      |
| --- | --- | ----------------------- |
| hex | 문자열 | UTF-8 문자열로 변환할 HEX 문자열. |

**리턴값**

| 타입  | 설명         |
| --- | ---------- |
| 문자열 | UTF-8 문자열. |

**예제**

```javascript
> caver.utils.hexToUtf8('0x49206861766520313030e282ac')
'I have 100€'
```

## hexToAscii <a id="hextoascii"></a>

```javascript
caver.utils.hexToAscii(hex)
```
주어진 HEX 값을 ASCII 문자열 표현으로 반환합니다.

**매개변수**

| 명칭  | 타입  | 설명                                          |
| --- | --- | ------------------------------------------- |
| hex | 문자열 | A HEX string to convert to an ASCII string. |

**리턴값**

| 타입  | 설명         |
| --- | ---------- |
| 문자열 | ASCII 문자열. |

**예제**

```javascript
> caver.utils.hexToAscii('0x4920686176652031303021')
'I have 100!'
```

## utf8ToHex <a id="utf8tohex"></a>

```javascript
caver.utils.utf8ToHex(str)
caver.utils.stringToHex(str) // ALIAS
```
주어진 UTF-8 문자열을 HEX 표현으로 반환합니다.


**매개변수**

| 명칭  | 타입  | 설명                      |
| --- | --- | ----------------------- |
| str | 문자열 | HEX 문자열로 변환할 UTF-8 문자열. |

**리턴값**

| 타입  | 설명       |
| --- | -------- |
| 문자열 | HEX 문자열. |

**예제**

```javascript
> caver.utils.utf8ToHex('I have 100€')
'0x49206861766520313030e282ac'
```

## asciiToHex <a id="asciitohex"></a>

```javascript
caver.utils.asciiToHex(str)
```

주어진 ASCII 문자열을 HEX 표현으로 반환합니다.

**매개변수**

| 명칭  | 타입  | 설명                      |
| --- | --- | ----------------------- |
| str | 문자열 | HEX 문자열로 변환할 ASCII 문자열. |

**리턴값**

| 타입  | 설명       |
| --- | -------- |
| 문자열 | HEX 문자열. |

**예제**

```javascript
> caver.utils.asciiToHex('I have 100!')
'0x4920686176652031303021'
```

## hexToBytes <a id="hextobytes"></a>

```javascript
caver.utils.hexToBytes(hex)
```
주어진 HEX 문자열을 바이트 배열으로 반환합니다.

**매개변수**

| 명칭  | 타입  | 설명           |
| --- | --- | ------------ |
| hex | 문자열 | 변환할 HEX 문자열. |

**리턴값**

| 타입 | 설명      |
| -- | ------- |
| 배열 | 바이트 배열. |

**예제**

```javascript
> caver.utils.hexToBytes('0x000000ea')
[ 0, 0, 0, 234 ]
```

## bytesToHex <a id="bytestohex"></a>

```javascript
caver.utils.bytesToHex(byteArray)
```
바이트 배열을 HEX 문자열으로 반환합니다.

**매개변수**

| 명칭        | 타입 | 설명          |
| --------- | -- | ----------- |
| byteArray | 배열 | 변환할 바이트 배열. |

**리턴값**

| 타입  | 설명       |
| --- | -------- |
| 문자열 | HEX 문자열. |

**예제**

```javascript
> caver.utils.bytesToHex([ 72, 101, 108, 108, 111, 33, 36 ])
'0x48656c6c6f2124'
```

## convertToPeb <a id="topeb"></a>

```javascript
caver.utils.convertToPeb(number [, unit])
```

모든 KLAY 값을 peb로 변환합니다.

**NOTE**: "peb" is the smallest KLAY unit, and you should always use "peb" as the unit of KLAY. Convert to "KLAY" only for display reasons.

**매개변수**

| 명칭     | 타입                             | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------ | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| number | string &#124; number &#124; BN | 값.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| unit   | 문자열                            | (optional, defaults to `"KLAY"`) The unit of KLAY to convert from. `number` will be multiplied by one of the following multipliers for the unit provided:<br>- `peb`: '1' <br> - `kpeb`: '1000' <br> - `Mpeb`: '1000000' <br> - `Gpeb`: '1000000000' <br> - `Ston`: '1000000000' <br> - `uKLAY`: '1000000000000' <br> - `mKLAY`: '1000000000000000' <br> - `KLAY`: '1000000000000000000' <br> - `kKLAY`: '1000000000000000000000' <br> - `MKLAY`: '1000000000000000000000000' <br> - `GKLAY`: '1000000000000000000000000000' <br> |

**리턴값**

| 타입               | 설명                                                                                                                               |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| string &#124; BN | If the number parameter is an instance of [BN](https://github.com/indutny/bn.js/), it returns a BN instance, otherwise a string. |

**예제**

```javascript
> caver.utils.convertToPeb('1', 'KLAY')
'1000000000000000000'

> caver.utils.convertToPeb(caver.utils.toBN(1), 'KLAY')
<BN: de0b6b3a7640000>
```

## convertFromPeb <a id="convertfrompeb"></a>

```javascript
caver.utils.convertFromPeb(number [, unit])
```

**NOTE**: "peb" is the smallest KLAY unit, and you should always use "peb" as the unit of KLAY. Convert to "KLAY" only for display reasons.

**매개변수**

| 명칭     | 타입                             | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| number | string &#124; number &#124; BN | peb 단위의 값.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| unit   | 문자열                            | (optional, defaults to `"KLAY"`) The unit of KLAY to convert your "peb" into. `number` will be divided by one of the following denominators for the unit provided:<br>- `peb`: '1' <br> - `kpeb`: '1000' <br> - `Mpeb`: '1000000' <br> - `Gpeb`: '1000000000' <br> - `Ston`: '1000000000' <br> - `uKLAY`: '1000000000000' <br> - `mKLAY`: '1000000000000000' <br> - `KLAY`: '1000000000000000000' <br> - `kKLAY`: '1000000000000000000000' <br> - `MKLAY`: '1000000000000000000000000' <br> - `GKLAY`: '1000000000000000000000000000' <br> |

**리턴값**

| 타입  | 설명                 |
| --- | ------------------ |
| 문자열 | The string number. |

**예제**

```javascript
> caver.utils.convertFromPeb('1', 'KLAY')
'0.000000000000000001'
```

## unitMap <a id="unitmap"></a>

```javascript
caver.utils.unitMap
```

가능한 모든 KLAY 값과 그 양을 peb로 표시합니다.

**리턴값**

| 타입     | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Object | With the following properties:<br>- `peb`: '1' <br> - `kpeb`: '1000' <br> - `Mpeb`: '1000000' <br> - `Gpeb`: '1000000000' <br> - `Ston`: '1000000000' <br> - `uKLAY`: '1000000000000' <br> - `mKLAY`: '1000000000000000' <br> - `KLAY`: '1000000000000000000' <br> - `kKLAY`: '1000000000000000000000' <br> - `MKLAY`: '1000000000000000000000000' <br> - `GKLAY`: '1000000000000000000000000000' <br> - `TKLAY`: '1000000000000000000000000000000' <br> |


**예제**

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

## klayUnit <a id="klayunit"></a>

```javascript
caver.utils.klayUnit
```

Shows all KLAY units.

**리턴값**

| 타입     | 설명                                                                                                                                                                                        |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Object | An object in which the units of KLAY used in Klaytn are defined. Each unit has its name and pebFactor. pebFactor is used when converting KLAY currently translated in each unit to 'peb'. |


**예제**

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
    KLAY: { unit: 'KLAY', pebFactor: 18 },
    kKLAY: { unit: 'kKLAY', pebFactor: 21 },
    MKLAY: { unit: 'MKLAY', pebFactor: 24 },
    GKLAY: { unit: 'GKLAY', pebFactor: 27 },
    TKLAY: { unit: 'TKLAY', pebFactor: 30 }
}
```


## padLeft <a id="padleft"></a>

```javascript
caver.utils.padLeft(string, characterAmount [, sign])
caver.utils.leftPad(string, characterAmount [, sign]) // ALIAS
```

Adds padding on the left of a string. HEX 문자열에 패딩을 추가하는 데 유용합니다.


**매개변수**

| 명칭              | 타입     | 설명                                                     |
| --------------- | ------ | ------------------------------------------------------ |
| 문자열             | 문자열    | 왼쪽에 패딩을 추가할 문자열.                                       |
| characterAmount | number | 총 문자열이 가질 문자 개수.                                       |
| sign            | 문자열    | (optional) The character sign to use, defaults to `0`. |

**리턴값**

| 타입  | 설명       |
| --- | -------- |
| 문자열 | 패딩된 문자열. |

**예제**

```javascript
> caver.utils.padLeft('0x3456ff', 20)
'0x000000000000003456ff'

> caver.utils.padLeft(0x3456ff, 20)
'0x000000000000003456ff'

> caver.utils.padLeft('Hello', 20, 'x')
'xxxxxxxxxxxxxxxHello'
```

## padRight <a id="padright"></a>

```javascript
caver.utils.padRight(str, characterAmount [, sign])
caver.utils.rightPad(str, characterAmount [, sign]) // ALIAS
```
Adds padding on the right of a string, Useful for adding paddings to HEX strings.

**매개변수**

| 명칭              | 타입     | 설명                                                     |
| --------------- | ------ | ------------------------------------------------------ |
| str             | 문자열    | 오른쪽에 패딩을 추가할 문자열.                                      |
| characterAmount | number | 총 문자열이 가질 문자 개수.                                       |
| sign            | 문자열    | (optional) The character sign to use, defaults to `0`. |

**리턴값**

| 타입  | 설명       |
| --- | -------- |
| 문자열 | 패딩된 문자열. |

**예제**

```javascript
> caver.utils.padRight('0x3456ff', 20)
'0x3456ff00000000000000'

> caver.utils.padRight(0x3456ff, 20)
'0x3456ff00000000000000'

> caver.utils.padRight('Hello', 20, 'x')
'Helloxxxxxxxxxxxxxxx'
```


## toTwosComplement <a id="totwoscomplement"></a>

```javascript
caver.utils.toTwosComplement(num)
```

음수를 2의 보수로 변환합니다.

**매개변수**

| 명칭  | 타입                                    | 설명      |
| --- | ------------------------------------- | ------- |
| num | number &#124; string &#124; Bignumber | 변환할 숫자. |

**리턴값**

| 타입  | 설명           |
| --- | ------------ |
| 문자열 | 변환된 HEX 문자열. |

**예제**

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

## isContractDeployment <a id="iscontractdeployment"></a>

```javascript
caver.utils.isContractDeployment(transactionObject)
```

주어진 트랜잭션이 스마트 컨트랙트 배포 트랜잭션인 경우 `true`를 반환합니다. 주어진 트랜잭션이 스마트 컨트랙트 배포 트랜잭션이 아닌 경우 `false`를 반환합니다. 결과는 `transactionObject`의 매개변수 값에 의해 결정됩니다. 모든 필수 매개변수가 올바르게 설정되었는지 확인하세요.

**매개변수**

| 명칭                | 타입     | 설명                                                                          |
| ----------------- | ------ | --------------------------------------------------------------------------- |
| transactionObject | object | An instance of [Transaction][] to check contract deploy transaction or not. |

**리턴값**

| 타입      | 설명                                     |
| ------- | -------------------------------------- |
| boolean | `true`는 트랜잭션 객체가 스마트 컨트랙트 배포용임을 의미합니다. |

**예제**

```javascript
> caver.utils.isContractDeployment(new caver.transaction.legacyTransaction({
    to: '0x9957dfd92e4b70f91131c573293343bc5f21f215',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 25000,
}))
false

> caver.utils.isContractDeployment(new caver.transaction.legacyTransaction({
    input: '0x608060405234801561001057600080fd5b506101de806100206000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a72305820627ca46bb09478a015762806cc00c431230501118c7c26c30ac58c4e09e51c4f0029',
    gas: 200000,
}))
true

> caver.utils.isContractDeployment(new caver.transaction.smartContractDeploy({
    from: '0x88e245dec96830f012f8fc1806bc623b3774560d',
    input: '0x608060405234801561001057600080fd5b506101de806100206000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a72305820627ca46bb09478a015762806cc00c431230501118c7c26c30ac58c4e09e51c4f0029',
    gas: 100000,
}))
true

> caver.utils.isContractDeployment(new caver.transaction.feeDelegatedSmartContractDeploy({
    from: '0x88e245dec96830f012f8fc1806bc623b3774560d',
    input: '0x608060405234801561001057600080fd5b506101de806100206000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a72305820627ca46bb09478a015762806cc00c431230501118c7c26c30ac58c4e09e51c4f0029',
    gas: 100000,
}))
true

> caver.utils.isContractDeployment(new caver.transaction.feeDelegatedSmartContractDeployWithRatio({
    from: '0x88e245dec96830f012f8fc1806bc623b3774560d',
    input: '0x608060405234801561001057600080fd5b506101de806100206000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a72305820627ca46bb09478a015762806cc00c431230501118c7c26c30ac58c4e09e51c4f0029',
    gas: 100000,
    feeRatio: 30,
}))
true
```

## xyPointFromPublicKey <a id="xypointfrompublickey"></a>

```javascript
caver.utils.xyPointFromPublicKey(publicKey)
```

주어진 공개키의 x와 y 좌표를 반환합니다. 키 암호화에 대한 자세한 내용은 [타원 곡선 암호화](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography)를 참조하세요.

**참고** 이 함수에는 공개키가 유효한지 확인하는 로직이 없습니다. 이 함수는 단지 입력한 공개키를 길이에 따라 x와 y 좌표로만 나눕니다. To validate public key, please use [isValidPublicKey](#isvalidpublickey).

**매개변수**

| 명칭        | 타입  | 설명                   |
| --------- | --- | -------------------- |
| publicKey | 문자열 | x와 y 좌표를 얻고자 하는 공개키. |

**리턴값**

| 타입 | 설명                                                  |
| -- | --------------------------------------------------- |
| 배열 | x 및 y 좌표를 저장하는 배열. 인덱스 0에는 x 점을, 인덱스 1에는 y 점을 가집니다. |

**예제**

```javascript
> caver.utils.xyPointFromPublicKey('0xa5862ded55cd9c7e9ff246dbc264ca5d5c605308f59b74e581b4f089d4c8c88cb9f00df6a56493f6029af215d266c907660ea0f7a4111ea025ea9d9be418fa55')
[ 
    '0xa5862ded55cd9c7e9ff246dbc264ca5d5c605308f59b74e581b4f089d4c8c88c',
    '0xb9f00df6a56493f6029af215d266c907660ea0f7a4111ea025ea9d9be418fa55'
]
```

## isHexPrefixed <a id="ishexprefixed"></a>

```javascript
caver.utils.isHexPrefixed(input)
```
Returns `true` if the input is a 0x-prefixed hex string, otherwise it returns `false`.

**매개변수**

| 명칭    | 타입  | 설명                               |
| ----- | --- | -------------------------------- |
| input | 문자열 | 0x 접두사가 있는 16진수 문자열인지 여부를 판별할 값. |

**리턴값**

| 타입      | 설명                                       |
| ------- | ---------------------------------------- |
| boolean | `true`은 입력이 0x 접두사가 있는 16진수 문자열임을 의미합니다. |

**예제**

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

## addHexPrefix <a id="addhexprefix"></a>

```javascript
caver.utils.addHexPrefix(input)
```
0x 접두사가 있는 16진수 문자열을 반환합니다. 입력이 이미 0x 접두사 꼴이거나 또는 16진수 문자열이 아닌 경우, 입력 값은 그대로 반환됩니다.

**매개변수**

| 명칭    | 타입  | 설명                                   |
| ----- | --- | ------------------------------------ |
| input | 문자열 | string value to be prefixed with 0x. |

**리턴값**

| 타입  | 설명                          |
| --- | --------------------------- |
| 문자열 | 0x 접두사가 있는 16진수 문자열이 반환됩니다. |

**예제**

```javascript
> caver.utils.addHexPrefix('a5b0cd8c87e77879d64cc064ee239ed6f71cacf9')
'0xa5b0cd8c87e77879d64cc064ee239ed6f71cacf9'

> caver.utils.addHexPrefix('0xa5b0cd8c87e77879d64cc064ee239ed6f71cacf9')
'0xa5b0cd8c87e77879d64cc064ee239ed6f71cacf9'
```

## stripHexPrefix <a id="striphexprefix"></a>

```javascript
caver.utils.stripHexPrefix(input)
```
입력에서 0x 접두사가 제거된 결과를 반환합니다.

**참고** caver.klay.stripHexPrefix는 **v1.0.1**에서 지원됩니다. 이 기능을 사용하려면 [v1.0.1](https://www.npmjs.com/package/caver-js/v/1.0.1) 또는 그 이상을 설치하세요.

**매개변수**

| 명칭    | 타입  | 설명                          |
| ----- | --- | --------------------------- |
| input | 문자열 | string to remove 0x prefix. |

**리턴값**

| 타입  | 설명                  |
| --- | ------------------- |
| 문자열 | 0x가 제거된 문자열이 반환됩니다. |

**예제**

```javascript
> caver.utils.stripHexPrefix('a5b0cd8c87e77879d64cc064ee239ed6f71cacf9')
'a5b0cd8c87e77879d64cc064ee239ed6f71cacf9'

> caver.utils.stripHexPrefix('0xa5b0cd8c87e77879d64cc064ee239ed6f71cacf9')
'a5b0cd8c87e77879d64cc064ee239ed6f71cacf9'
```

## toBuffer <a id="tobuffer"></a>

```javascript
caver.utils.toBuffer(input)
```
이 함수는 입력을 [버퍼](https://nodejs.org/api/buffer.html)로 변환합니다. To convert an object into a Buffer using `toBuffer`, the object must implement **toArray** function. For string type input, this function only works with a **0x-prefixed hex string**.

**매개변수**

| 명칭    | 타입                                                                      | 설명         |
| ----- | ----------------------------------------------------------------------- | ---------- |
| input | Buffer &#124; string &#124; number &#124; Array &#124; BN &#124; object | 버퍼로 변환할 값. |

**리턴값**

| 타입     | 설명                    |
| ------ | --------------------- |
| Buffer | 버퍼 유형으로 변환된 값이 반환됩니다. |

**예제**

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

## numberToBuffer <a id="numbertobuffer"></a>

```javascript
caver.utils.numberToBuffer(input)
```

이 함수는 숫자를 [버퍼](https://nodejs.org/api/buffer.html)로 변환합니다. 입력이 숫자인 경우 [caver.utils.toBuffer](#tobuffer)는 이 함수와 동일하게 동작합니다.

**매개변수**

| 명칭    | 타입                             | 설명          |
| ----- | ------------------------------ | ----------- |
| input | string &#124; number &#124; BN | 버퍼로 변환할 숫자. |

**리턴값**

| 타입     | 설명                    |
| ------ | --------------------- |
| Buffer | 버퍼 유형으로 변환된 값이 반환됩니다. |

**예제**

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

## isValidHash <a id="isvalidhash"></a>

```javascript
caver.utils.isValidHash(input)
```

Returns `true` if the input is in 32-bytes hash format, otherwise it returns `false`.

**매개변수**

| 명칭    | 타입  | 설명                                                                     |
| ----- | --- | ---------------------------------------------------------------------- |
| input | 문자열 | The value to be examined that if it is in 32-bytes hash format or not. |

**리턴값**

| 타입      | 설명                                                        |
| ------- | --------------------------------------------------------- |
| boolean | `true` means the input is in the format of 32-bytes hash. |

**예제**

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

## isValidHashStrict <a id="isvalidhashstrict"></a>

```javascript
caver.utils.isValidHashStrict(input)
```

Returns `true` if the input is in 0x-prefixed 32-bytes hash format, otherwise it returns `false`. This function only looks at the input and determines if it is in the format of 0x-prefixed 32-bytes hash. Difference to [caver.utils.isValidHash](#isvalidhash) is that it expects HEX to be prefixed with `0x`.

**매개변수**

| 명칭    | 타입  | 설명                                                                                        |
| ----- | --- | ----------------------------------------------------------------------------------------- |
| input | 문자열 | The value to be examined that if it is in the format of 0x-prefixed 32-bytes hash or not. |

**리턴값**

| 타입      | 설명                                                                    |
| ------- | --------------------------------------------------------------------- |
| boolean | `true` means the input is in the format of 0x-prefixed 32-bytes hash. |

**예제**
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

## isTxHash <a id="istxhash"></a>

```javascript
caver.utils.isTxHash(input)
```

Returns `true` if the input is in transaction hash format, otherwise it returns `false`. 이 함수는 입력값만 보고 트랜잭션 해시 형식인지를 판별합니다.

**NOTE** This function has been deprecated. Use [isValidHash](#isvalidhash) to determine if a valid hash is 32 bytes long.

**매개변수**

| 명칭    | 타입  | 설명                                 |
| ----- | --- | ---------------------------------- |
| input | 문자열 | 매개변수가 트랜잭션 해시 형식인지 여부를 판별하고자 하는 값. |

**리턴값**

| 타입      | 설명                               |
| ------- | -------------------------------- |
| boolean | `true`는 입력값이 트랜잭션 해시 형식임을 의미합니다. |

**예제**

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

## isTxHashStrict <a id="istxhashstrict"></a>

```javascript
caver.utils.isTxHashStrict(input)
```

Returns `true` if the input is in transaction hash format, otherwise it returns `false`. 이 함수는 입력값만 보고 트랜잭션 해시 형식인지를 판별합니다. [caver.utils.isTxHash](#istxhash)와의 차이점은 HEX 앞에 `0x`이 붙는다는 것입니다.

**NOTE** This function has been deprecated. Use [isValidHashStrict](#isvalidhashstrict) to determine if a valid hash is 32 bytes long.

**매개변수**

| 명칭    | 타입  | 설명                                 |
| ----- | --- | ---------------------------------- |
| input | 문자열 | 매개변수가 트랜잭션 해시 형식인지 여부를 판별하고자 하는 값. |

**리턴값**

| 타입      | 설명                               |
| ------- | -------------------------------- |
| boolean | `true`는 입력값이 트랜잭션 해시 형식임을 의미합니다. |

**예제**

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

## isValidPrivateKey <a id="isvalidprivatekey"></a>

```javascript
caver.utils.isValidPrivateKey(privateKey)
```
Returns `true` if `privateKey` is valid, otherwise it returns `false`.

**매개변수**

| 명칭         | 타입  | 설명                   |
| ---------- | --- | -------------------- |
| privateKey | 문자열 | 유효성을 검사할 개인키 문자열입니다. |

**리턴값**

| 타입      | 설명                              |
| ------- | ------------------------------- |
| boolean | `true`는 privateKey가 유효함을 의미합니다. |

**예제**

```javascript
> caver.utils.isValidPrivateKey('0x{private key}')
true

> caver.utils.isValidPrivateKey('{private key}')
true

> caver.utils.isValidPrivateKey('a5b0cd8c87e77879d64cc064ee239ed6f71cacf9')
false
```

## isValidPublicKey <a id="isvalidpublickey"></a>

```javascript
caver.utils.isValidPublicKey(publicKey)
```
publicKey가 유효하면 `true`, 그렇지 않으면 `false`를 반환합니다.

**매개변수**

| 명칭        | 타입  | 설명                   |
| --------- | --- | -------------------- |
| publicKey | 문자열 | 유효성을 검사할 공개키 문자열입니다. |

**리턴값**

| 타입      | 설명                             |
| ------- | ------------------------------ |
| boolean | `true`는 publicKey가 유효함을 의미합니다. |

**예제**

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

## isValidRole <a id="isvalidrole"></a>

```javascript
caver.utils.isValidRole(role)
```
Returns `true` if a role is valid, otherwise it returns `false`. You can check roles supported by caver-js through `caver.wallet.keyring.role`.

**매개변수**

| 명칭   | 타입  | 설명                    |
| ---- | --- | --------------------- |
| role | 문자열 | 유효성을 검사할 role 문자열입니다. |

**리턴값**

| 타입      | 설명                        |
| ------- | ------------------------- |
| boolean | `true`는 role이 유효함을 의미합니다. |

**예제**

```javascript
> caver.utils.isValidRole('roleTransactionKey')
true

> caver.utils.isValidRole('role')
false
```

## isEmptySig <a id="isemptysig"></a>

```javascript
caver.utils.isEmptySig(sig)
```
Returns `true` if sig is in the format of empty signature (`SignatureData { _v: '0x01', _r: '0x', _s: '0x' }` or `[SignatureData { _v: '0x01', _r: '0x', _s: '0x' }]`), otherwise it returns `false`.

In caver-js, if signatures or feePayerSignatures is empty, the value representing an empty signature, `[SignatureData { _v: '0x01', _r: '0x', _s: '0x' }]`, is returned for the property. This function is used to check whether the given signature is `[SignatureData { _v: '0x01', _r: '0x', _s: '0x' }]` (or `SignatureData { _v: '0x01', _r: '0x', _s: '0x' }` in the 'LEGACY' transaction).

**매개변수**

| 명칭  | 타입                  | 설명                                                                                    |
| --- | ------------------- | ------------------------------------------------------------------------------------- |
| sig | object &#124; Array | An instance of [SignatureData][] or array of [SignatureData][] to check empty or not. |

**리턴값**

| 타입      | 설명                             |
| ------- | ------------------------------ |
| boolean | `true` means the sig is empty. |

**예제**

```javascript
> caver.utils.isEmptySig(caver.wallet.keyring.signatureData.emtpySig)
true

> caver.utils.isEmptySig([caver.wallet.keyring.signatureData.emtpySig])
true
```

## isKlaytnWalletKey <a id="isklaytnwalletkey"></a>

```javascript
caver.utils.isKlaytnWalletKey(key)
```
Returns `true` if key is in [KlaytnWalletKey][] format, otherwise it returns `false`.

**매개변수**

| 명칭  | 타입  | 설명                                 |
| --- | --- | ---------------------------------- |
| key | 문자열 | KlaytnWalletKey 포맷인지 확인할 키 문자열입니다. |

**리턴값**

| 타입      | 설명                                                                                                         |
| ------- | ---------------------------------------------------------------------------------------------------------- |
| boolean | `true`면 키는 `0x{private key}0x{type}0x{address in hex}` 또는 `{private key}0x{type}0x{address in hex}` 포맷입니다. |

**예제**

```javascript
> caver.utils.isKlaytnWalletKey('0x{private key}0x{type}0x{address in hex}')
true

> caver.utils.isKlaytnWalletKey('{private key}0x{type}0x{address in hex}')
true

> caver.utils.isKlaytnWalletKey('0x{private key}')
false
```

## bufferToHex <a id="buffertohex"></a>

```javascript
caver.utils.bufferToHex(buffer)
```
버퍼를 "0x"가 접두어인 16진수 문자열로 바꿉니다.

**매개변수**

| 명칭     | 타입     | 설명                  |
| ------ | ------ | ------------------- |
| buffer | Buffer | 16진수 문자열로 바꿀 버퍼입니다. |

**리턴값**

| 타입  | 설명                      |
| --- | ----------------------- |
| 문자열 | 0x 접두어가 있는 16진수 문자열입니다. |

**예제**

```javascript
> caver.utils.bufferToHex(Buffer.from('5b9ac8', 'hex'))
'0x5b9ac8'

> caver.utils.bufferToHex(Buffer.alloc(0))
'0x'
```

## parseKlaytnWalletKey <a id="parseklaytnwalletkey"></a>

```javascript
caver.utils.parseKlaytnWalletKey(key)
```

Parses [KlaytnWalletKey][] string to an array which includes "private key", "type", "address".

**매개변수**

| 명칭  | 타입  | 설명                            |
| --- | --- | ----------------------------- |
| key | 문자열 | A [KlaytnWalletKey][] string. |

**리턴값**

| 타입 | 설명                          |
| -- | --------------------------- |
| 배열 | The parsed KlaytnWalletKey. |

**예제**

```javascript
> caver.utils.parseKlaytnWalletKey('0x{private key}0x{type}0x{address in hex}')
[
    '0x{private key}',
    '0x00',
    '0x885ebdb17c221ef695936b18a0263d6399e14d60'
]
```

## hashMessage <a id="hashmessage"></a>

```javascript
caver.utils.hashMessage(message)
```

Hashes message with Klaytn specific prefix: `keccak256("\x19Klaytn Signed Message:\n" + len(message) + message))`

**매개변수**

| 명칭      | 타입  | 설명                                       |
| ------- | --- | ---------------------------------------- |
| message | 문자열 | 해시를 취할 메시지. HEX 문자열인 경우 먼저 UTF-8 디코딩됩니다. |

**리턴값**

| 타입  | 설명                                              |
| --- | ----------------------------------------------- |
| 문자열 | The hashed message with Klaytn specific prefix. |

**예제**

```javascript
> caver.utils.hashMessage('Hello')
'0x640bfab59b6e27468abd367888f4ab1a1c77aa2b45e76a1d3adcbd039c305917'
```

## recover <a id="recover"></a>

```javascript
caver.utils.recover(message, signature [, preFixed])
```

주어진 데이터에 서명하는 데 사용된 Klaytn 주소를 복구합니다.

**매개변수**

| 명칭       | 타입      | 설명                                                                                                                                                                                                                           |
| -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| message  | 문자열     | Either message or hashed message.                                                                                                                                                                                            |
| 서명 값입니다. | object  | An instance of [SignatureData][].                                                                                                                                                                                            |
| preFixed | boolean | (optional, default: `false`) If the last parameter is `true`, the given `message` will NOT automatically be prefixed with `"\x19Klaytn Signed Message:\n" + message.length + message`, and be assumed as already prefixed. |

**리턴값**

| 타입  | 설명                              |
| --- | ------------------------------- |
| 문자열 | 이 데이터에 서명하는 데 사용된 Klaytn 주소입니다. |

**예제**

```javascript
> const sig = new caver.wallet.keyring.signatureData(['0x1b', '0x50a80...', '0x021de...'])

> caver.utils.recover('message', sig)
'0xe8b3a6ef12f9506e1df9fd445f9bb4488a482122'

> caver.utils.recover('0xe960248437f2134a77a9aa0ebcbb6523aec095f23b02e25f16fd95e99b099daa', sig, true)
'0xe8b3a6ef12f9506e1df9fd445f9bb4488a482122'
```

## compressPublicKey <a id="compresspublicKkey"></a>

```javascript
caver.utils.compressPublicKey(uncompressedPublicKey)
```

Compresses the uncompressed public key.

**매개변수**

| 명칭                    | 타입  | 설명                          |
| --------------------- | --- | --------------------------- |
| uncompressedPublicKey | 문자열 | An uncompressed public key. |

**리턴값**

| 타입  | 설명                       |
| --- | ------------------------ |
| 문자열 | A compressed public key. |

**예제**

```javascript
> caver.utils.compressPublicKey('0x62cef87819b82f62e9c0a38c1fa7dfa089084959df86aca19ff2f6c903db2248b45dc23220ee6bcd8753bb9df8ce7d58e56eabebb14479f3a0ca5ccd4bdea632')
'0x0262cef87819b82f62e9c0a38c1fa7dfa089084959df86aca19ff2f6c903db2248'
```

## decompressPublicKey <a id="decompresspublicKkey"></a>

```javascript
caver.utils.decompressPublicKey(compressedPublicKey)
```

Decompresses the compressed public key.

**매개변수**

| 명칭                  | 타입  | 설명                       |
| ------------------- | --- | ------------------------ |
| compressedPublicKey | 문자열 | A compressed public key. |

**리턴값**

| 타입  | 설명                          |
| --- | --------------------------- |
| 문자열 | An uncompressed public key. |

**예제**

```javascript
> caver.utils.decompressPublicKey('0x0262cef87819b82f62e9c0a38c1fa7dfa089084959df86aca19ff2f6c903db2248')
'0x62cef87819b82f62e9c0a38c1fa7dfa089084959df86aca19ff2f6c903db2248b45dc23220ee6bcd8753bb9df8ce7d58e56eabebb14479f3a0ca5ccd4bdea632'
```

[Transaction]: ./caver.transaction/README.md#class
[SignatureData]: ./caver.wallet/keyring.md#signaturedata
[KlaytnWalletKey]: ../../../../klaytn/design/accounts.md#klaytn-wallet-key-format
