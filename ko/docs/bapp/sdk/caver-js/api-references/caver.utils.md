---
description: >-
  caver-js 유틸리티 API.
---

# caver.utils

`caver.utils`는 유틸리티 함수를 제공합니다.


## randomHex

```javascript
caver.utils.randomHex(size)
```
주어진 바이트 크기로부터 암호학적으로 강력한 의사 난수 HEX 문자열을 생성하기 위한 [randomHex](https://github.com/frozeman/randomHex) 라이브러리.

**매개변수**

| 명칭   | 형식     | 설명                                                                              |
| ---- | ------ | ------------------------------------------------------------------------------- |
| size | Number | HEX 문자열의 바이트 크기, *가령*, `32`는 접두어 "0x"와 64개의 문자로 구성된 32바이트의 HEX 문자열이 결과가 될 것입니다. |

**리턴값**

| 형식     | 설명               |
| ------ | ---------------- |
| String | 생성된 임의의 HEX 문자열. |

**예시**

```javascript
> caver.utils.randomHex(32);
"0xa5b9d60f32436310afebcfda832817a68921beb782fabf7915cc0460b443116a"

> caver.utils.randomHex(4);
"0x6892ffc6"

> caver.utils.randomHex(2);
"0x99d6"

> caver.utils.randomHex(1);
"0x9a"

> caver.utils.randomHex(0);
"0x"
```


## _

```javascript
caver.utils._()
```

많은 편리한 자바스크립트 함수를 위한 [underscore](http://underscorejs.org) 라이브러리.

자세한 내용은 [underscore API reference](http://underscorejs.org)를 참조하세요.

**예시**

```javascript
> var _ = caver.utils._;

> _.union([1,2],[3]);
[1,2,3]

> _.each({my: 'object'}, function(value, key){ ... });
...
```


## BN

```javascript
caver.utils.BN(mixed)
```
자바스크립트에서 큰 수로 계산하기 위한 [BN.js](https://github.com/indutny/bn.js/) 라이브러리. 자세한 내용은 [BN.js documentation](https://github.com/indutny/bn.js/)을 참조하세요.

**Parameters**

| 명칭    | 형식                   | 설명                                   |
| ----- | -------------------- | ------------------------------------ |
| mixed | String &#124; Number | BN 객체로 변환할 숫자, 숫자 문자열 또는 HEX 문자열입니다. |

**리턴값**

| 형식     | 설명                                               |
| ------ | ------------------------------------------------ |
| Object | [BN.js](https://github.com/indutny/bn.js/) 인스턴스. |

**예시**

```javascript
> var BN = caver.utils.BN;

> new BN(1234).toString();
"1234"

> new BN('1234').add(new BN('1')).toString();
"1235"

> new BN('0xea').toString();
"234"
```


## isBN

```javascript
caver.utils.isBN(bn)
```

주어진 값이 [BN.js](https://github.com/indutny/bn.js/) 인스턴스인지 확인합니다.


**매개변수**

| 명칭 | 형식     | 설명                                               |
| -- | ------ | ------------------------------------------------ |
| bn | Object | [BN.js](https://github.com/indutny/bn.js/) 인스턴스. |

**리턴값**

| 형식      | 설명                                                                 |
| ------- | ------------------------------------------------------------------ |
| Boolean | 주어진 값이 [BN.js](https://github.com/indutny/bn.js/) 인스턴스인 경우 `true`. |

**예시**

```javascript
> var number = new BN(10);
> caver.utils.isBN(number);
true
```


## isBigNumber

```javascript
caver.utils.isBigNumber(bignumber)
```

주어진 값이 [BigNumber.js](http://mikemcl.github.io/bignumber.js/) 인스턴스인지 확인합니다.


**매개변수**

| 명칭        | 형식     | 설명                                                           |
| --------- | ------ | ------------------------------------------------------------ |
| bignumber | Object | [BigNumber.js](http://mikemcl.github.io/bignumber.js/) 인스턴스. |

**리턴값**

| 형식      | 설명                                     |
| ------- | -------------------------------------- |
| Boolean | 주어진 값이 `BigNumber.js` 인스턴스인 경우 `true`. |

**예시**

```javascript
> var number = new BigNumber(10);
> caver.utils.isBigNumber(number);
true
```


## sha3

```javascript
caver.utils.sha3(string)
caver.utils.keccak256(string) // ALIAS
```
입력의 sha3을 계산합니다.

**참고**: 솔리디티의 sha3를 모방하려면 [caver.utils.soliditySha3](#soliditysha3)를 사용합니다.

**매개변수**

| 명칭     | 형식     | 설명       |
| ------ | ------ | -------- |
| string | String | 해시할 문자열. |

**리턴값**

| 형식     | 설명     |
| ------ | ------ |
| String | 결과 해시. |

**예시**

```javascript
> caver.utils.sha3('234'); // taken as string
"0xc1912fee45d61c87cc5ea59dae311904cd86b84fee17cc96966216f811ce6a79"

> caver.utils.sha3(new BN('234')); // utils.sha3 stringify bignumber instance.
"0xc1912fee45d61c87cc5ea59dae311904cd86b84fee17cc96966216f811ce6a79"

> caver.utils.sha3(234);
null // can't calculate the has of a number

> caver.utils.sha3(0xea); // same as above, just the HEX representation of the number
null

> caver.utils.sha3('0xea'); // will be converted to a byte array first, and then hashed
"0x2f20677459120677484f7104c76deb6846a2c071f9b3152c103bb12cd54d1a4a"
```


## soliditySha3


```javascript
caver.utils.soliditySha3(param1 [, param2, ...])
```

솔리디티와 같은 방식으로 주어진 입력 매개변수의 sha3를 계산합니다. 이는 인자가 해시되기 전에 ABI 변환되고 빽빽히 채워질 것을 의미합니다.

**매개변수**

| 명칭     | 형식 | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------ | -- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| paramX | 복합 | 모든 타입, 또는 `{type: 'uint', value: '123456'}` or `{t: 'bytes', v: '0xfff456'}` 객체. 기본 타입은 다음과 같이 자동 감지됩니다: <br /> - `String` 숫자가 아닌 UTF-8 문자열은 `string`으로 해석됩니다. <br /> - `String|Number|BN|HEX` 양수는 `uint256`으로 해석됩니다. <br /> - `String|Number|BN` 음수는 `int256`으로 해석됩니다. <br /> - `bool`로서 `Boolean`. <br /> - `String` `0x`으로 시작되는 16진수 문자열은 `bytes`로 해석됩니다. <br /> - `HEX` 16진수 표현은 `uint256`로서 해석됩니다.<br /> |

**리턴값**

| 형식     | 설명     |
| ------ | ------ |
| String | 결과 해시. |

**예시**

```javascript
> caver.utils.soliditySha3('234564535', '0xfff23243', true, -10);
// auto detects: uint256, bytes, bool, int256
"0x3e27a893dc40ef8a7f0841d96639de2f58a132be5ae466d40087a2cfa83b7179"

> caver.utils.soliditySha3('Hello!%'); // auto detects: string
"0x661136a4267dba9ccdf6bfddb7c00e714de936674c4bdb065a531cf1cb15c7fc"

> caver.utils.soliditySha3('234'); // auto detects: uint256
"0x61c831beab28d67d1bb40b5ae1a11e2757fa842f031a2d0bc94a7867bc5d26c2"

> caver.utils.soliditySha3(0xea); // same as above
"0x61c831beab28d67d1bb40b5ae1a11e2757fa842f031a2d0bc94a7867bc5d26c2"

> caver.utils.soliditySha3(new BN('234')); // same as above
"0x61c831beab28d67d1bb40b5ae1a11e2757fa842f031a2d0bc94a7867bc5d26c2"

> caver.utils.soliditySha3({type: 'uint256', value: '234'})); // same as above
"0x61c831beab28d67d1bb40b5ae1a11e2757fa842f031a2d0bc94a7867bc5d26c2"

> caver.utils.soliditySha3({t: 'uint', v: new BN('234')})); // same as above
"0x61c831beab28d67d1bb40b5ae1a11e2757fa842f031a2d0bc94a7867bc5d26c2"

> caver.utils.soliditySha3('0x407D73d8a49eeb85D32Cf465507dd71d507100c1');
"0x4e8ebbefa452077428f93c9520d3edd60594ff452a29ac7d2ccc11d47f3ab95b"

> caver.utils.soliditySha3({t: 'bytes', v: '0x407D73d8a49eeb85D32Cf465507dd71d507100c1'});
"0x4e8ebbefa452077428f93c9520d3edd60594ff452a29ac7d2ccc11d47f3ab95b" // same result as above

> caver.utils.soliditySha3({t: 'address', v: '0x407D73d8a49eeb85D32Cf465507dd71d507100c1'});
"0x4e8ebbefa452077428f93c9520d3edd60594ff452a29ac7d2ccc11d47f3ab95b" // same as above, but will do a checksum check, if its multi case

> caver.utils.soliditySha3({t: 'bytes32', v: '0x407D73d8a49eeb85D32Cf465507dd71d507100c1'});
"0x3c69a194aaf415ba5d6afca734660d0a3d45acdc05d54cd1ca89a8988e7625b4" // different result as above

> caver.utils.soliditySha3({t: 'string', v: 'Hello!%'}, {t: 'int8', v:-23}, {t: 'address', v: '0x85F43D8a49eeB85d32Cf465507DD71d507100C1d'});
"0xa13b31627c1ed7aaded5aecec71baf02fe123797fffd45e662eac8e06fbe4955"
```


## isHex

```javascript
caver.utils.isHex(hex)
```
주어진 문자열이 HEX 문자열인지 확인합니다.

**매개변수**

| 명칭  | 형식                | 설명           |
| --- | ----------------- | ------------ |
| hex | String &#124; HEX | 주어진 HEX 문자열. |

**Return Value**

| 형식      | 설명                         |
| ------- | -------------------------- |
| Boolean | 주어진 문자열이 HEX 문자열이면 `true`. |

**예시**

```javascript
> caver.utils.isHex('0xc1912');
true

> caver.utils.isHex(0xc1912);
true

> caver.utils.isHex('c1912');
true

> caver.utils.isHex(345);
true // this is tricky, as 345 can be a HEX representation or a number, be careful when not having a 0x in front!

> caver.utils.isHex('0xZ1912');
false

> caver.utils.isHex('Hello');
false
```


## isHexStrict


```javascript
caver.utils.isHexStrict(hex)
```
주어진 문자열이 HEX 문자열인지 확인합니다. [caver.utils.isHex](#ishex)와의 차이점은 HEX 앞에 `0x`이 붙는다는 것입니다.

**매개변수**

| 명칭  | 형식                | 설명           |
| --- | ----------------- | ------------ |
| hex | String &#124; HEX | 주어진 HEX 문자열. |

**Return Value**

| 형식      | 설명                         |
| ------- | -------------------------- |
| Boolean | 주어진 문자열이 HEX 문자열이면 `true`. |


**예시**

```javascript
> caver.utils.isHexStrict('0xc1912');
true

> caver.utils.isHexStrict(0xc1912);
false

> caver.utils.isHexStrict('c1912');
false

> caver.utils.isHexStrict(345);
false // this is tricky, as 345 can be a HEX representation or a number, be careful when not having a 0x in front!

> caver.utils.isHexStrict('0xZ1912');
false

> caver.utils.isHex('Hello');
false
```


## isAddress

```javascript
caver.utils.isAddress(address)
```
주어진 문자열이 유효한 Klaytn 주소인지 확인합니다. 주소에 대문자와 소문자가 있으면 체크섬도 검사합니다.

**매개변수**

| 명칭      | 형식     | 설명      |
| ------- | ------ | ------- |
| address | String | 주소 문자열. |

**Return Value**

| 형식      | 설명                               |
| ------- | -------------------------------- |
| Boolean | 주어진 문자열이 유효한 Klaytn 주소라면 `true`. |

**예제**

```javascript
> caver.utils.isAddress('0xc1912fee45d61c87cc5ea59dae31190fffff232d');
true

> caver.utils.isAddress('c1912fee45d61c87cc5ea59dae31190fffff232d');
true

> caver.utils.isAddress('0XC1912FEE45D61C87CC5EA59DAE31190FFFFF232D');
true // as all is uppercase, no checksum will be checked

> caver.utils.isAddress('0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d');
true

> caver.utils.isAddress('0xC1912fEE45d61C87Cc5EA59DaE31190FFFFf232d');
false // wrong checksum
```


## toChecksumAddress

```javascript
caver.utils.toChecksumAddress(address)
```
대문자 또는 소문자 Klaytn 주소를 체크섬 주소로 변환합니다.

**매개변수**

| 명칭      | 형식     | 설명      |
| ------- | ------ | ------- |
| address | String | 주소 문자열. |

**Return Value**

| 형식     | 설명      |
| ------ | ------- |
| String | 체크섬 주소. |

**Examples**

```javascript
> caver.utils.toChecksumAddress('0xc1912fee45d61c87cc5ea59dae31190fffff232d');
"0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d"

> caver.utils.toChecksumAddress('0XC1912FEE45D61C87CC5EA59DAE31190FFFFF232D');
"0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d" // same as above
```


## checkAddressChecksum

```javascript
caver.utils.checkAddressChecksum(address)
```
주어진 주소의 체크섬을 확인합니다. 또한 체크섬이 아닌 주소에서 `false`를 반환합니다.

**매개변수**

| 명칭      | 형식     | 설명      |
| ------- | ------ | ------- |
| address | String | 주소 문자열. |

**리턴값**

| 형식      | 설명                                                        |
| ------- | --------------------------------------------------------- |
| Boolean | 주소의 체크섬이 유효하면 `true`, 체크섬 주소가 아니거나 체크섬이 유효하지 않으면 `false`. |

**예제**

```javascript
> caver.utils.checkAddressChecksum('0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d');
true
```


## toHex

```javascript
caver.utils.toHex(mixed)
```
주어진 값을 HEX로 변환합니다. 숫자 문자열은 숫자로 해석됩니다. 텍스트 문자열은 UTF-8 문자열로 해석됩니다.

**매개변수**

| 명칭    | 형식                                              | 설명            |
| ----- | ----------------------------------------------- | ------------- |
| mixed | String &#124; Number &#124; BN &#124; BigNumber | HEX로 변환할 입력값. |

**리턴값**

| 형식     | 설명          |
| ------ | ----------- |
| String | 결과 HEX 문자열. |

**예제**

```javascript
> caver.utils.toHex('234');
"0xea"

> caver.utils.toHex(234);
"0xea"

> caver.utils.toHex(new BN('234'));
"0xea"

> caver.utils.toHex(new BigNumber('234'));
"0xea"

> caver.utils.toHex('I have 100€');
"0x49206861766520313030e282ac"
```


## toBN

```javascript
caver.utils.toBN(number)
```
자바스크립트에서 큰 숫자를 처리하기 위해 ([BigNumber.js](http://mikemcl.github.io/bignumber.js/)를 포함해) 주어진 값을 [BN.js](https://github.com/indutny/bn.js/) 인스턴스로 안전하게 변환합니다.

**참고**: [BN.js](https://github.com/indutny/bn.js/) 클래스의 경우 [caver.utils.BN](#bn)를 사용합니다.


**매개변수**

| 명칭     | 형식                              | 설명            |
| ------ | ------------------------------- | ------------- |
| number | String &#124; Number &#124; HEX | 큰 숫자로 변환할 숫자. |

**리턴값**

| 형식     | 설명                                               |
| ------ | ------------------------------------------------ |
| Object | [BN.js](https://github.com/indutny/bn.js/) 인스턴스. |

**Examples**

```javascript
> caver.utils.toBN(1234).toString();
"1234"

> caver.utils.toBN('1234').add(caver.utils.toBN('1')).toString();
"1235"

> caver.utils.toBN('0xea').toString();
"234"
```


## hexToNumberString

```javascript
caver.utils.hexToNumberString(hex)
```
주어진 HEX 값의 숫자 표현을 문자열로 반환합니다.

**매개변수**

| 명칭        | 형식         | 설명           |
| --------- | ---------- | ------------ |
| hexString | HEX String | 변환할 HEX 문자열. |

**리턴값**

| 형식     | 설명         |
| ------ | ---------- |
| String | 문자열로 된 숫자. |

**Examples**

```javascript
> caver.utils.hexToNumberString('0xea');
"234"
```


## hexToNumber

```javascript
caver.utils.hexToNumber(hex)
```
주어진 HEX 값을 숫자로 반환합니다.

**참고**: 큰 숫자에는 유용하지 않으며, [caver.utils.toBN](#tobn)를 대신 사용합니다.

**매개변수**

| 명칭        | 형식         | 설명           |
| --------- | ---------- | ------------ |
| hexString | HEX String | 변환할 HEX 문자열. |

**리턴값**

| 형식     | 설명                |
| ------ | ----------------- |
| Number | 주어진 HEX 값의 숫자 표현. |

**예제**

```javascript
> caver.utils.hexToNumber('0xea');
234
```


## numberToHex

```javascript
caver.utils.numberToHex(number)
```
주어진 숫자 값을 HEX 표현으로 반환합니다.

**매개변수**

| 명칭     | 형식                                              | 설명               |
| ------ | ----------------------------------------------- | ---------------- |
| number | String &#124; Number &#124; BN &#124; BigNumber | 문자열 또는 숫자로 된 숫자. |

**리턴값**

| 형식     | 설명             |
| ------ | -------------- |
| String | 주어진 숫자의 HEX 값. |

**예제**

```javascript
> caver.utils.numberToHex('234');
'0xea'
```


## hexToUtf8

```javascript
caver.utils.hexToUtf8(hex)
caver.utils.hexToString(hex) // ALIAS
```
주어진 HEX 값을 UTF-8 문자열 표현으로 반환합니다.


**매개변수**

| 명칭  | 형식     | 설명                      |
| --- | ------ | ----------------------- |
| hex | String | UTF-8 문자열로 변환할 HEX 문자열. |

**Return Value**

| 형식     | 설명                |
| ------ | ----------------- |
| String | The UTF-8 string. |

**Examples**

```javascript
> caver.utils.hexToUtf8('0x49206861766520313030e282ac');
"I have 100€"
```


## hexToAscii

```javascript
caver.utils.hexToAscii(hex)
```
Returns the ASCII string representation of a given HEX value.


**Parameters**

| 명칭  | 형식     | 설명                                         |
| --- | ------ | ------------------------------------------ |
| hex | String | A HEX string to convert to a ASCII string. |

**Return Value**

| 형식     | 설명                |
| ------ | ----------------- |
| String | The ASCII string. |

**Examples**

```javascript
> caver.utils.hexToAscii('0x4920686176652031303021');
"I have 100!"
```

## utf8ToHex

```javascript
caver.utils.utf8ToHex(string)
caver.utils.stringToHex(string) // ALIAS
```
Returns the HEX representation of a given UTF-8 string.


**Parameters**

| 명칭     | 형식     | 설명                                         |
| ------ | ------ | ------------------------------------------ |
| string | String | A UTF-8 string to convert to a HEX string. |

**Return Value**

| 형식     | 설명              |
| ------ | --------------- |
| String | The HEX string. |

**Examples**

```javascript
> caver.utils.utf8ToHex('I have 100€');
"0x49206861766520313030e282ac"
```


## asciiToHex

```javascript
caver.utils.asciiToHex(string)
```

Returns the HEX representation of a given ASCII string.


**Parameters**

| 명칭     | 형식     | 설명                                          |
| ------ | ------ | ------------------------------------------- |
| string | String | An ASCII string to convert to a HEX string. |

**Return Value**

| 형식     | 설명              |
| ------ | --------------- |
| String | The HEX string. |

**Examples**

```javascript
> caver.utils.asciiToHex('I have 100!');
"0x4920686176652031303021"
```


## hexToBytes

```javascript
caver.utils.hexToBytes(hex)
```
Returns a byte array from the given HEX string.

**Parameters**

| 명칭  | 형식         | 설명           |
| --- | ---------- | ------------ |
| hex | HEX String | 변환할 HEX 문자열. |

**Return Value**

| 형식    | 설명              |
| ----- | --------------- |
| Array | The byte array. |

**Examples**

```javascript
> caver.utils.hexToBytes('0x000000ea');
[ 0, 0, 0, 234 ]
```


## bytesToHex

```javascript
caver.utils.bytesToHex(byteArray)
```
Returns a HEX string from a byte array.

**Parameters**

| 명칭        | 형식    | 설명                       |
| --------- | ----- | ------------------------ |
| byteArray | Array | A byte array to convert. |

**Return Value**

| 형식     | 설명              |
| ------ | --------------- |
| String | The HEX string. |

**Examples**

```javascript
> caver.utils.bytesToHex([ 72, 101, 108, 108, 111, 33, 36 ]);
"0x48656c6c6f2125"
```


## toPeb

```javascript
caver.utils.toPeb(number [, unit])
```

Converts any KLAY value into peb.

**NOTE**: "peb" is the smallest KLAY unit, and you should always make calculations in peb and convert only for display reasons.

**Parameters**

| 명칭     | 형식                             | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ------ | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| number | String &#124; Number &#124; BN | The value.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 단위     | String                         | (optional, defaults to `"KLAY"`) KLAY to convert from. Possible units are:<br />- `peb`: '1' <br /> - `kpeb`: '1000' <br /> - `Mpeb`: '1000000' <br /> - `Gpeb`: '1000000000' <br /> - `Ston`: '1000000000' <br /> - `uKLAY`: '1000000000000' <br /> - `mKLAY`: '1000000000000000' <br /> - `KLAY`: '1000000000000000000' <br /> - `kKLAY`: '1000000000000000000000' <br /> - `MKLAY`: '1000000000000000000000000' <br /> - `GKLAY`: '1000000000000000000000000000' <br /> |

**Return Value**

| 형식               | 설명                                                                                                                             |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| String &#124; BN | If a number or a string is given, it returns a number string, otherwise a [BN.js](https://github.com/indutny/bn.js/) instance. |

**Examples**

```javascript
> caver.utils.toPeb('1', 'KLAY');
"1000000000000000000"
```


## fromPeb

```javascript
caver.utils.fromPeb(number [, unit])
```

**NOTE**: "peb" is the smallest KLAY unit, and you should always make calculations in KLAY and convert only for display reasons.

**Parameters**

| 명칭     | 형식                             | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| number | String &#124; Number &#124; BN | The value in peb.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 단위     | String                         | (optional, defaults to `"KLAY"`) KLAY to convert to. Possible units are:<br />- `peb`: '1' <br /> - `kpeb`: '1000' <br /> - `Mpeb`: '1000000' <br /> - `Gpeb`: '1000000000' <br /> - `Ston`: '1000000000' <br /> - `uKLAY`: '1000000000000' <br /> - `mKLAY`: '1000000000000000' <br /> - `KLAY`: '1000000000000000000' <br /> - `kKLAY`: '1000000000000000000000' <br /> - `MKLAY`: '1000000000000000000000000' <br /> - `GKLAY`: '1000000000000000000000000000' <br /> |

**Return Value**

| 형식               | 설명                                                                                                                             |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| String &#124; BN | If a number or a string is given, it returns a number string, otherwise a [BN.js](https://github.com/indutny/bn.js/) instance. |

**Examples**

```javascript
> caver.utils.fromPeb('1', 'KLAY');
"0.000000000000000001"
```


## unitMap

```javascript
caver.utils.unitMap
```

Shows all possible KLAY values and their amount in peb.

**Return Value**

| 형식     | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Object | With the following properties:<br />- `peb`: '1' <br /> - `kpeb`: '1000' <br /> - `Mpeb`: '1000000' <br /> - `Gpeb`: '1000000000' <br /> - `Ston`: '1000000000' <br /> - `uKLAY`: '1000000000000' <br /> - `mKLAY`: '1000000000000000' <br /> - `KLAY`: '1000000000000000000' <br /> - `kKLAY`: '1000000000000000000000' <br /> - `MKLAY`: '1000000000000000000000000' <br /> - `GKLAY`: '1000000000000000000000000000' <br /> |


**Examples**

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
}
```


## padLeft

```javascript
caver.utils.padLeft(string, characterAmount [, sign])
caver.utils.leftPad(string, characterAmount [, sign]) // ALIAS
```

Adds a padding on the left of a string. Useful for adding paddings to HEX strings.


**Parameters**

| 명칭              | 형식     | 설명                                                       |
| --------------- | ------ | -------------------------------------------------------- |
| string          | String | The string to add padding on the left.                   |
| characterAmount | Number | The number of characters the total string should have.   |
| sign            | String | (optional) The character sign to use, defaults to `"0"`. |

**Return Value**

| 형식     | 설명                 |
| ------ | ------------------ |
| String | The padded string. |

**Examples**

```javascript
> caver.utils.padLeft('0x3456ff', 20);
"0x000000000000003456ff"

> caver.utils.padLeft(0x3456ff, 20);
"0x000000000000003456ff"

> caver.utils.padLeft('Hello', 20, 'x');
"xxxxxxxxxxxxxxxHello"
```


## padRight

```javascript
caver.utils.padRight(string, characterAmount [, sign])
caver.utils.rightPad(string, characterAmount [, sign]) // ALIAS
```
Adds a padding on the right of a string, Useful for adding paddings to HEX strings.


**Parameters**

| 명칭              | 형식     | 설명                                                       |
| --------------- | ------ | -------------------------------------------------------- |
| string          | String | The string to add padding on the right.                  |
| characterAmount | Number | The number of characters the total string should have.   |
| sign            | String | (optional) The character sign to use, defaults to `"0"`. |

**Return Value**

| 형식     | 설명                 |
| ------ | ------------------ |
| String | The padded string. |

**Examples**

```javascript
> caver.utils.padRight('0x3456ff', 20);
"0x3456ff00000000000000"

> caver.utils.padRight(0x3456ff, 20);
"0x3456ff00000000000000"

> caver.utils.padRight('Hello', 20, 'x');
"Helloxxxxxxxxxxxxxxx"
```


## toTwosComplement

```javascript
caver.utils.toTwosComplement(number)
```

Converts a negative numer into a two's complement.


**Parameters**

| 명칭     | 형식                                    | 설명                     |
| ------ | ------------------------------------- | ---------------------- |
| number | Number &#124; String &#124; BigNumber | The number to convert. |

**Return Value**

| 형식     | 설명                        |
| ------ | ------------------------- |
| String | The converted hex string. |

**Examples**

```javascript
> caver.utils.toTwosComplement('-1');
"0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"

> caver.utils.toTwosComplement(-1);
"0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"

> caver.utils.toTwosComplement('0x1');
"0x0000000000000000000000000000000000000000000000000000000000000001"

> caver.utils.toTwosComplement(-15);
"0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1"

> caver.utils.toTwosComplement('-0x1');
"0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
```

## isContractDeployment

```javascript
caver.utils.isContractDeployment(transactionObject)
```
Returns `true` if the given transaction is a smart contract deploy transaction. It returns `false` if the transaction is not a smart contract deploy transaction. The result is determined by the values of the parameters in the `transactionObject`. Make sure all the mandatory parameters are set correctly.

**NOTE** caver.klay.isContractDeployment is supported from **v1.0.1-rc.8**. To use this feature, please install [v1.0.1-rc.8](https://www.npmjs.com/package/caver-js/v/1.0.1-rc.8) or higher.

**Parameters**

| 명칭                | 형식     | 설명                                                                                             |
| ----------------- | ------ | ---------------------------------------------------------------------------------------------- |
| transactionObject | Object | Transaction object that you want to determine if the transaction is for smart contract deploy. |

**Return Value**

| 형식      | 설명                                                                |
| ------- | ----------------------------------------------------------------- |
| Boolean | `true` means the transaction object is for smart contract deploy. |

**Examples**

```javascript
> caver.utils.isContractDeployment({
    type: 'SMART_CONTRACT_DEPLOY',
    from: '0x90B3E9A3770481345A7F17f22f16D020Bccfd33e',
    nonce: '0x8',
    data:  '0x608060405234801561001057600080fd5b506101de806100206000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a72305820627ca46bb09478a015762806cc00c431230501118c7c26c30ac58c4e09e51c4f0029',
    gas: '0x3b9ac9ff',
    gasPrice: '0x5d21dba00',
    value: '0x0',
    chainId: '0x1',
})
true

> caver.utils.isContractDeployment({
    type: 'LEGACY',
    from: '0x90B3E9A3770481345A7F17f22f16D020Bccfd33e',
    data:  '0x608060405234801561001057600080fd5b506101de806100206000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a72305820627ca46bb09478a015762806cc00c431230501118c7c26c30ac58c4e09e51c4f0029',
    gas: '0x3b9ac9ff',
})
true

> caver.utils.isContractDeployment({
    from: '0x90B3E9A3770481345A7F17f22f16D020Bccfd33e',
    data:  '0x608060405234801561001057600080fd5b506101de806100206000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a72305820627ca46bb09478a015762806cc00c431230501118c7c26c30ac58c4e09e51c4f0029',
    gas: '0x3b9ac9ff',
})
true

> caver.utils.isContractDeployment({
    type: 'ACCOUNT_UPDATE',
    from: '0x88e245dec96830f012f8fc1806bc623b3774560d',
    publicKey: '0x4ef27ba4b7d1ae09b166744c5b7ee4a7a0cc5c76b2e5d74523a0a4fb56db319162ff3255302045cd047a27141916d55615a7c1ead06e211e62119e7bc2a40def',
    nonce: '0x0',
    gas: '0x3b9ac9ff',
    chainId: '0x7e3',
    gasPrice: '0x5d21dba00',
})
false
```

## xyPointFromPublicKey

```javascript
caver.utils.xyPointFromPublicKey(publicKey)
```
Returns the x and y coordinates of the given publicKey. For more information on key cryptography, see [Elliptic-curve cryptography](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography).

**NOTE** This function does not contain any logic to check whether the public key is valid. The function only split the input publicKey into x and y points by length.

**Parameters**

| 명칭        | 형식     | 설명                                   |
| --------- | ------ | ------------------------------------ |
| publicKey | String | The publicKey to get x and y points. |

**Return Value**

| 형식    | 설명                                                                             |
| ----- | ------------------------------------------------------------------------------ |
| Array | An array storing x and y points. Index 0 has x point, and index 1 has y point. |

**Examples**

```javascript
> caver.utils.xyPointFromPublicKey('0xa5862ded55cd9c7e9ff246dbc264ca5d5c605308f59b74e581b4f089d4c8c88cb9f00df6a56493f6029af215d266c907660ea0f7a4111ea025ea9d9be418fa55')
[ 
    '0xa5862ded55cd9c7e9ff246dbc264ca5d5c605308f59b74e581b4f089d4c8c88c',
    '0xb9f00df6a56493f6029af215d266c907660ea0f7a4111ea025ea9d9be418fa55'
]
```

## isHexPrefixed

```javascript
caver.utils.isHexPrefixed(input)
```
Returns `true` if input is a 0x-prefixed hex string, otherwise it returns `false`.

**NOTE** caver.klay.isHexPrefixed is supported from **v1.0.1**. To use this feature, please install [v1.0.1](https://www.npmjs.com/package/caver-js/v/1.0.1) or higher.

**Parameters**

| 명칭    | 형식     | 설명                                                                            |
| ----- | ------ | ----------------------------------------------------------------------------- |
| input | String | The value to be determined if the parameter is 0x-prefixed hex string or not. |

**Return Value**

| 형식      | 설명                                                |
| ------- | ------------------------------------------------- |
| Boolean | `true` means the input is 0x-prefixed hex string. |

**Examples**

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

## addHexPrefix

```javascript
caver.utils.addHexPrefix(input)
```
Returns a 0x-prefixed hex string. If the input is already 0x-prefixed or a non-hex string, the input value is returned as-is.

**NOTE** caver.klay.addHexPrefix is supported from **v1.0.1**. To use this feature, please install [v1.0.1](https://www.npmjs.com/package/caver-js/v/1.0.1) or higher.

**Parameters**

| 명칭    | 형식     | 설명                                   |
| ----- | ------ | ------------------------------------ |
| input | String | String value to be prefixed with 0x. |

**Return Value**

| 형식     | 설명                                  |
| ------ | ----------------------------------- |
| String | 0x-prefixed hex string is returned. |

**Examples**

```javascript
> caver.utils.addHexPrefix('a5b0cd8c87e77879d64cc064ee239ed6f71cacf9')
'0xa5b0cd8c87e77879d64cc064ee239ed6f71cacf9'

> caver.utils.addHexPrefix('0xa5b0cd8c87e77879d64cc064ee239ed6f71cacf9')
'0xa5b0cd8c87e77879d64cc064ee239ed6f71cacf9'
```

## stripHexPrefix

```javascript
caver.utils.stripHexPrefix(input)
```
Returns the result with 0x prefix stripped from input.

**NOTE** caver.klay.stripHexPrefix is supported from **v1.0.1**. To use this feature, please install [v1.0.1](https://www.npmjs.com/package/caver-js/v/1.0.1) or higher.

**Parameters**

| 명칭    | 형식     | 설명                          |
| ----- | ------ | --------------------------- |
| input | String | String to remove 0x prefix. |

**Return Value**

| 형식     | 설명                                   |
| ------ | ------------------------------------ |
| String | A string stripped of 0x is returned. |

**Examples**

```javascript
> caver.utils.stripHexPrefix('a5b0cd8c87e77879d64cc064ee239ed6f71cacf9')
'a5b0cd8c87e77879d64cc064ee239ed6f71cacf9'

> caver.utils.stripHexPrefix('0xa5b0cd8c87e77879d64cc064ee239ed6f71cacf9')
'a5b0cd8c87e77879d64cc064ee239ed6f71cacf9'
```

## toBuffer

```javascript
caver.utils.toBuffer(input)
```
This function converts the input to a [Buffer](https://nodejs.org/api/buffer.html). To convert an Object into a Buffer using `toBuffer`, the Object must implement **toArray** function. For String type input, this function only works with a **0x-prefixed hex string**.

**NOTE** caver.klay.toBuffer is supported from **v1.1.0**. To use this feature, please install [v1.1.0](https://www.npmjs.com/package/caver-js/v/1.1.0) or higher.

**Parameters**

| 명칭    | 형식                                                                      | 설명                                     |
| ----- | ----------------------------------------------------------------------- | -------------------------------------- |
| input | Buffer &#124; String &#124; Number &#124; Array &#124; BN &#124; Object | The value to be converted to a Buffer. |

**Return Value**

| 형식     | 설명                                              |
| ------ | ----------------------------------------------- |
| Buffer | The value converted to Buffer type is returned. |

**Examples**

```javascript
// Buffer
> caver.utils.toBuffer(Buffer.alloc(0))
<Buffer >
// 0x-prefixed hex string
> caver.utils.toBuffer('0x1234')
<Buffer 12 34>
// Number
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
## numberToBuffer
```javascript
caver.utils.numberToBuffer(input)
```
This function converts a number to a [Buffer](https://nodejs.org/api/buffer.html). The [caver.utils.toBuffer](#tobuffer) has the same behavior as this function when the input is a number.

**NOTE** caver.klay.numberToBuffer is supported from **v1.1.0**. To use this feature, please install [v1.1.0](https://www.npmjs.com/package/caver-js/v/1.1.0) or higher.

**Parameters**
| 명칭    | 형식                             | 설명                                    |
| ----- | ------------------------------ | ------------------------------------- |
| input | String &#124; Number &#124; BN | A number to be converted to a Buffer. |


**Return Value**
| 형식     | 설명                                              |
| ------ | ----------------------------------------------- |
| Buffer | The value converted to Buffer type is returned. |


**Examples**
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

## isTxHash
```javascript
caver.utils.isTxHash(input)
```
Returns `true` if input is in transaction hash format, otherwise it returns `false`. This function only looks at the input and determines if it is in the format of a transaction hash. **NOTE** caver.klay.isTxHash is supported from **v1.2.0-rc.1**. To use this feature, please install [v1.2.0-rc.1](https://www.npmjs.com/package/caver-js/v/1.2.0-rc.1) or higher. **Parameters**
| 명칭    | 형식     | 설명                                                                                       |
| ----- | ------ | ---------------------------------------------------------------------------------------- |
| input | String | The value to be determined if the parameter is in the format of transaction hash or not. |


**Return Value**
| 형식      | 설명                                                       |
| ------- | -------------------------------------------------------- |
| Boolean | `true` means the input is in format of transaction hash. |


**Examples**
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
## isTxHashStrict
```javascript
caver.utils.isTxHashStrict(input)
```
Returns `true` if input is in transaction hash format, otherwise it returns `false`. This function only looks at the input and determines if it is in the format of a transaction hash. Difference to [caver.utils.isTxHash](#istxhash) is that it expects HEX to be prefixed with `0x`. **NOTE** caver.klay.isTxHashStrict is supported from **v1.2.0-rc.1**. To use this feature, please install [v1.2.0-rc.1](https://www.npmjs.com/package/caver-js/v/1.2.0-rc.1) or higher. **Parameters**
| 명칭    | 형식     | 설명                                                                                       |
| ----- | ------ | ---------------------------------------------------------------------------------------- |
| input | String | The value to be determined if the parameter is in the format of transaction hash or not. |


**Return Value**
| 형식      | 설명                                                           |
| ------- | ------------------------------------------------------------ |
| Boolean | `true` means the input is in the format of transaction hash. |


**Examples**
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
