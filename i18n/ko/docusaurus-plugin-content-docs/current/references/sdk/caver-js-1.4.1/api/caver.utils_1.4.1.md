---
description: caver-js 유틸리티 API.
---

# caver.utils

`caver.utils`는 유틸리티 함수를 제공합니다.

## randomHex <a id="randomhex"></a>

```javascript
caver.utils.randomHex(size)
```

[randomHex](https://github.com/frozeman/randomHex) 라이브러리는 주어진 바이트 크기에서 암호학적으로 강력한 의사 랜덤 HEX 문자열을 생성합니다.

**매개변수**

| 이름   | 유형     | 설명                                                                                    |
| ---- | ------ | ------------------------------------------------------------------------------------- |
| size | Number | HEX 문자열의 바이트 크기(예: `32`)는 "0x"로 접두사가 붙은 64자의 32바이트 HEX 문자열을 생성합니다. |

**리턴 값**

| 유형     | 설명                  |
| ------ | ------------------- |
| String | 생성된 임의의 HEX 문자열입니다. |

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

## underscore <a id="underscore"></a>

```javascript
caver.utils._()
```

[underscore](http://underscorejs.org) 라이브러리에는 여러 가지 편리한 JavaScript 함수가 있습니다.

자세한 내용은 [underscore API 레퍼런스](http://underscorejs.org)를 참조하세요.

**예시**

```javascript
> var _ = caver.utils._;

> _.union([1,2],[3]);
[1,2,3]

> _.each({my: 'object'}, function(value, key){ ... });
...
```

## BN <a id="bn"></a>

```javascript
caver.utils.BN(mixed)
```

JavaScript에서 큰 숫자로 계산하기 위한 [BN.js](https://github.com/indutny/bn.js/) 라이브러리입니다.
자세한 내용은 [BN.js 문서](https://github.com/indutny/bn.js/)를 참조하세요.

**매개변수**

| 이름    | 유형               | 설명                                   |
| ----- | ---------------- | ------------------------------------ |
| mixed | String \| Number | 숫자, 숫자 문자열 또는 HEX 문자열을 BN 개체로 변환합니다. |

**리턴 값**

| 유형     | 설명                                                  |
| ------ | --------------------------------------------------- |
| Object | [BN.js](https://github.com/indutny/bn.js/) 인스턴스입니다. |

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

## isBN <a id="isbn"></a>

```javascript
caver.utils.isBN(bn)
```

주어진 값이 [BN.js](https://github.com/indutny/bn.js/) 인스턴스인지 확인합니다.

**매개변수**

| 이름 | 유형     | 설명                                                  |
| -- | ------ | --------------------------------------------------- |
| bn | Object | [BN.js](https://github.com/indutny/bn.js/) 인스턴스입니다. |

**리턴 값**

| 유형      | 설명                                                                 |
| ------- | ------------------------------------------------------------------ |
| Boolean | 주어진 값이 [BN.js](https://github.com/indutny/bn.js/) 인스턴스인 경우 `true`. |

**예시**

```javascript
> var number = new BN(10);
> caver.utils.isBN(number);
true
```

## isBigNumber <a id="isbignumber"></a>

```javascript
caver.utils.isBigNumber(bignumber)
```

주어진 값이 [BigNumber.js](http://mikemcl.github.io/bignumber.js/) 인스턴스인지 확인합니다.

**매개변수**

| 이름        | 유형     | 설명                                                           |
| --------- | ------ | ------------------------------------------------------------ |
| bignumber | Object | [BigNumber.js](http://mikemcl.github.io/bignumber.js/) 인스턴스. |

**리턴 값**

| 유형      | 설명                                     |
| ------- | -------------------------------------- |
| Boolean | 주어진 값이 `BigNumber.js` 인스턴스인 경우 `true`. |

**예시**

```javascript
> var number = new BigNumber(10);
> caver.utils.isBigNumber(number);
true
```

## sha3 <a id="sha3"></a>

```javascript
caver.utils.sha3(string)
caver.utils.keccak256(string) // ALIAS
```

입력의 sha3를 계산합니다.

**참고**: Solidity의 sha3 동작을 모방하려면 [caver.utils.soliditySha3](#soliditysha3)를 사용하세요.

**매개변수**

| 이름     | 유형     | 설명          |
| ------ | ------ | ----------- |
| string | String | 해시할 문자열입니다. |

**리턴 값**

| 유형     | 설명        |
| ------ | --------- |
| String | 결과 해시입니다. |

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

## soliditySha3 <a id="soliditysha3"></a>

```javascript
caver.utils.soliditySha3(param1 [, param2, ...])
```

Solidity와 동일한 방식으로 주어진 입력 파라미터의 sha3를 계산합니다.
즉, 인수가 해시되기 전에 ABI로 변환되고 단단히 패킹됩니다.

**매개변수**

| 이름     | 유형    | 설명                                                                                                                                                                                                                                                                           |
| ------ | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| paramX | Mixed | 모든 유형 또는 `{유형: 'uint', 값: '123456'}` 또는 `{t: '바이트', v: '0xfff456'}`를 가진 객체입니다. 기본 유형은 다음과 같이 자동 감지됩니다: <br /> - `String` 숫자가 아닌 UTF-8 문자열은 `string`으로 해석됩니다.<br /> - `String\\|Number\\|BN\\|HEX` 양수는 `uint256`으로 해석됩니다.<br />- `String\\|Number\\|BN` 음수는 `int256`으로 해석됩니다. |

**리턴 값**

| 유형     | 설명        |
| ------ | --------- |
| String | 결과 해시입니다. |

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

## isHex <a id="ishex"></a>

```javascript
caver.utils.isHex(hex)
```

주어진 문자열이 HEX 문자열인지 확인합니다.

**매개변수**

| 이름  | 유형            | 설명              |
| --- | ------------- | --------------- |
| hex | string \| HEX | 주어진 HEX 문자열입니다. |

**리턴 값**

| 유형      | 설명                           |
| ------- | ---------------------------- |
| Boolean | 주어진 문자열이 HEX 문자열인 경우 `true`. |

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

## isHexStrict <a id="ishexstrict"></a>

```javascript
caver.utils.isHexStrict(hex)
```

주어진 문자열이 HEX 문자열인지 확인합니다. [caver.utils.isHex](#ishex)와의 차이점은 HEX 앞에 `0x`가 붙을 것으로 예상한다는 점입니다.

**매개변수**

| 이름  | 유형            | 설명              |
| --- | ------------- | --------------- |
| hex | string \| HEX | 주어진 HEX 문자열입니다. |

**리턴 값**

| 유형      | 설명                           |
| ------- | ---------------------------- |
| Boolean | 주어진 문자열이 HEX 문자열인 경우 `true`. |

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

## isAddress <a id="isaddress"></a>

```javascript
caver.utils.isAddress(address)
```

주어진 문자열이 유효한 클레이튼 주소인지 확인합니다.
주소에 대문자와 소문자가 있는 경우 체크섬도 확인합니다.

**매개변수**

| 이름      | 유형     | 설명      |
| ------- | ------ | ------- |
| address | String | 주소 문자열. |

**리턴 값**

| 유형      | 설명                               |
| ------- | -------------------------------- |
| Boolean | 주어진 문자열이 유효한 클레이튼 주소인 경우 `true`. |

**예시**

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

## toChecksumAddress <a id="tochecksumaddress"></a>

```javascript
caver.utils.toChecksumAddress(address)
```

클레이튼 대문자 또는 소문자 주소를 체크섬 주소로 변환합니다.

**매개변수**

| 이름      | 유형     | 설명         |
| ------- | ------ | ---------- |
| address | String | 주소 문자열입니다. |

**리턴 값**

| 유형     | 설명         |
| ------ | ---------- |
| String | 체크섬 주소입니다. |

**예시**

```javascript
> caver.utils.toChecksumAddress('0xc1912fee45d61c87cc5ea59dae31190fffff232d');
"0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d"

> caver.utils.toChecksumAddress('0XC1912FEE45D61C87CC5EA59DAE31190FFFFF232D');
"0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d" // same as above
```

## checkAddressChecksum <a id="checkaddresschecksum"></a>

```javascript
caver.utils.checkAddressChecksum(address)
```

주어진 주소의 체크섬을 확인합니다. 체크섬이 아닌 주소에 대해서는 `false`를 반환합니다.

**매개변수**

| 이름      | 유형     | 설명         |
| ------- | ------ | ---------- |
| address | String | 주소 문자열입니다. |

**리턴 값**

| 유형      | 설명                                                               |
| ------- | ---------------------------------------------------------------- |
| Boolean | 주소의 체크섬이 유효하면 `true`, 체크섬 주소가 아니거나 체크섬이 유효하지 않으면 `false`를 반환합니다. |

**예시**

```javascript
> caver.utils.checkAddressChecksum('0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d');
true
```

## toHex <a id="tohex"></a>

```javascript
caver.utils.toHex(mixed)
```

주어진 값을 HEX로 변환합니다.
숫자 문자열은 숫자로 해석됩니다.
텍스트 문자열은 UTF-8 문자열로 해석됩니다.

**파라미터**

| 이름    | 유형                                  | 설명              |
| ----- | ----------------------------------- | --------------- |
| mixed | String \| Number \| BN \| BigNumber | HEX로 변환할 입력입니다. |

**리턴 값**

| 유형     | 설명                        |
| ------ | ------------------------- |
| String | HEX 문자열에 패딩을 추가할 때 유용합니다. |

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

## toBN <a id="tobn"></a>

```javascript
caver.utils.toBN(number)
```

JavaScript에서 큰 숫자를 처리하기 위해 주어진 값([BigNumber.js](http://mikemcl.github.io/bignumber.js/) 인스턴스 포함)을 [BN.js](https://github.com/indutny/bn.js/) 인스턴스로 안전하게 변환합니다.

**참고**: [BN.js](https://github.com/indutny/bn.js/) 클래스만 사용하려면 [caver.utils.BN](#bn)을 사용하세요.

**매개변수**

| object | 유형                      | 설명               |
| ------ | ----------------------- | ---------------- |
| number | String \| Number \| HEX | 큰 숫자로 변환할 숫자입니다. |

**리턴 값**

| 유형     | 설명                                               |
| ------ | ------------------------------------------------ |
| Object | [BN.js](https://github.com/indutny/bn.js/) 인스턴스. |

**예시**

```javascript
> caver.utils.toBN(1234).toString();
"1234"

> caver.utils.toBN('1234').add(caver.utils.toBN('1')).toString();
"1235"

> caver.utils.toBN('0xea').toString();
"234"
```

## hexToNumberString <a id="hextonumberstring"></a>

```javascript
caver.utils.hexToNumberString(hex)
```

주어진 HEX 값의 숫자 표현을 문자열로 반환합니다.

**매개변수**

| 이름        | 유형         | 설명              |
| --------- | ---------- | --------------- |
| hexString | HEX String | 변환할 HEX 문자열입니다. |

**리턴 값**

| 유형     | 설명                |
| ------ | ----------------- |
| String | string 형태의 숫자입니다. |

**예시**

```javascript
> caver.utils.hexToNumberString('0xea');
"234"
```

## hexToNumber <a id="hextonumber"></a>

```javascript
caver.utils.hexToNumber(hex)
```

주어진 HEX 값의 숫자 표현을 반환합니다.

**참고**: 이 방법은 큰 숫자에는 유용하지 않으므로 [caver.utils.toBN](#tobn)을 사용하세요.

**매개변수**

| 이름        | 유형         | 설명              |
| --------- | ---------- | --------------- |
| hexString | HEX String | 변환할 HEX 문자열입니다. |

**리턴 값**

| 유형     | 설명                   |
| ------ | -------------------- |
| Number | 주어진 HEX 값의 숫자 표현입니다. |

**예시**

```javascript
> caver.utils.hexToNumber('0xea');
234
```

## numberToHex <a id="numbertohex"></a>

```javascript
caver.utils.numberToHex(number)
```

주어진 숫자 값의 HEX 표현을 반환합니다.

**매개변수**

| 이름     | 유형                                  | 설명                     |
| ------ | ----------------------------------- | ---------------------- |
| number | String \| Number \| BN \| BigNumber | string 또는 숫자로 된 숫자입니다. |

**리턴 값**

| 유형     | 설명                |
| ------ | ----------------- |
| String | 주어진 숫자의 HEX 값입니다. |

**예시**

```javascript
> caver.utils.numberToHex('234');
'0xea'
```

## hexToUtf8 <a id="hextoutf8"></a>

```javascript
caver.utils.hexToUtf8(hex)
caver.utils.hexToString(hex) // ALIAS
```

주어진 HEX 값의 UTF-8 문자열 표현을 반환합니다.

**파라미터**

| 이름  | 유형     | 설명                         |
| --- | ------ | -------------------------- |
| hex | String | HEX 문자열로 변환할 UTF-8 문자열입니다. |

**리턴 값**

| 유형     | 설명            |
| ------ | ------------- |
| String | UTF-8 문자열입니다. |

**예시**

```javascript
> caver.utils.hexToUtf8('0x49206861766520313030e282ac');
"I have 100€"
```

## hexToAscii <a id="hextoascii"></a>

```javascript
caver.utils.hexToAscii(hex)
```

주어진 HEX 값의 ASCII 문자열 표현을 반환합니다.

**매개변수**

| 이름  | 유형     | 설명                         |
| --- | ------ | -------------------------- |
| hex | String | HEX 문자열로 변환할 ASCII 문자열입니다. |

**리턴 값**

| 유형     | 설명            |
| ------ | ------------- |
| String | ASCII 문자열입니다. |

**예시**

```javascript
> caver.utils.hexToAscii('0x4920686176652031303021');
"I have 100!"
```

## utf8ToHex <a id="utf8tohex"></a>

```javascript
caver.utils.utf8ToHex(string)
caver.utils.stringToHex(string) // ALIAS
```

주어진 UTF-8 문자열의 HEX 표현을 반환합니다.

**매개변수**

| 이름     | 유형     | 설명                         |
| ------ | ------ | -------------------------- |
| string | String | UTF-8 문자열로 변환할 HEX 문자열입니다. |

**리턴 값**

| 유형     | 설명          |
| ------ | ----------- |
| String | HEX 문자열입니다. |

**예시**

```javascript
> caver.utils.utf8ToHex('I have 100€');
"0x49206861766520313030e282ac"
```

## asciiToHex <a id="asciitohex"></a>

```javascript
caver.utils.asciiToHex(string)
```

주어진 ASCII 문자열의 HEX 표현을 반환합니다.

**파라미터**

| 이름     | 유형     | 설명                         |
| ------ | ------ | -------------------------- |
| string | String | ASCII 문자열로 변환할 HEX 문자열입니다. |

**리턴 값**

| 유형     | 설명          |
| ------ | ----------- |
| String | HEX 문자열입니다. |

**예시**

```javascript
> caver.utils.asciiToHex('I have 100!');
"0x4920686176652031303021"
```

## hexToBytes <a id="hextobytes"></a>

```javascript
caver.utils.hexToBytes(hex)
```

주어진 HEX 문자열에서 바이트 배열을 반환합니다.

**매개변수**

| 이름  | 유형         | 설명              |
| --- | ---------- | --------------- |
| hex | HEX String | 변환할 HEX 문자열입니다. |

**리턴 값**

| 유형    | 설명         |
| ----- | ---------- |
| Array | 바이트 배열입니다. |

**예시**

```javascript
> caver.utils.hexToBytes('0x000000ea');
[ 0, 0, 0, 234 ]
```

## bytesToHex <a id="bytestohex"></a>

```javascript
caver.utils.bytesToHex(byteArray)
```

바이트 배열에서 HEX 문자열을 반환합니다.

**매개변수**

| 이름        | 유형    | 설명             |
| --------- | ----- | -------------- |
| byteArray | Array | 변환할 바이트 배열입니다. |

**리턴 값**

| 유형     | 설명          |
| ------ | ----------- |
| String | HEX 문자열입니다. |

**예시**

```javascript
> caver.utils.bytesToHex([ 72, 101, 108, 108, 111, 33, 36 ]);
"0x48656c6c6f2125"
```

## toPeb <a id="topeb"></a>

```javascript
caver.utils.toPeb(number [, unit])
```

모든 KLAY 값을 peb으로 변환합니다.

**참고**: 'peb'는 가장 작은 KLAY 단위이며, 항상 peb 단위로 계산하고 표시상의 이유로만 변환해야 합니다.

**매개변수**

| 이름     | 유형                     | 설명                                                                                                                                                                                                                                                                                                                                                                                     |
| ------ | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| number | String \| Number \| BN | 값입니다.                                                                                                                                                                                                                                                                                                                                                                                  |
| unit   | String                 | (선택 사항, 기본값은 `"KLAY"`) 변환할 KLAY입니다. 가능한 단위는 다음과 같습니다: - `peb`: '1' - `kpeb`: '1000' - `Mpeb`: '1000000' - `Gpeb`: '1000000000' - `Ston`: '1000000000' - `uKLAY`: '1000000000000' - `mKLAY`: '1000000000000000' - `KLAY`: '1000000000000000000' - `kKLAY`: '1000000000000000000000' - `MKLAY`: '1000000000000000000000000' - `GKLAY`: '1000000000000000000000000000' |

**리턴 값**

| 유형           | 설명                                                                                            |
| ------------ | --------------------------------------------------------------------------------------------- |
| string \| BN | 숫자 또는 문자열이 지정되면 숫자 문자열을 반환하고, 그렇지 않으면 [BN.js](https://github.com/indutny/bn.js/) 인스턴스를 반환합니다. |

**예제**

```javascript
> caver.utils.toPeb('1', `klay`);
"1000000000000000000"
```

## fromPeb <a id="frompeb"></a>

```javascript
caver.utils.fromPeb(number [, unit])
```

**참고**: 'peb'는 가장 작은 KLAY 단위이며, 항상 KLAY로 계산하고 표시상의 이유로만 변환해야 합니다.

**매개변수**

| 이름     | 유형                     | 설명                                                                                                                                                                                                                                                                                                                                                                                     |
| ------ | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| number | String \| Number \| BN | 단위 값입니다.                                                                                                                                                                                                                                                                                                                                                                               |
| unit   | String                 | (선택 사항, 기본값은 `"KLAY"`) 변환할 KLAY입니다. 가능한 단위는 다음과 같습니다: - `peb`: '1' - `kpeb`: '1000' - `Mpeb`: '1000000' - `Gpeb`: '1000000000' - `Ston`: '1000000000' - `uKLAY`: '1000000000000' - `mKLAY`: '1000000000000000' - `KLAY`: '1000000000000000000' - `kKLAY`: '1000000000000000000000' - `MKLAY`: '1000000000000000000000000' - `GKLAY`: '1000000000000000000000000000' |

**리턴 값**

| 유형           | 설명                                                                                            |
| ------------ | --------------------------------------------------------------------------------------------- |
| string \| BN | 숫자 또는 문자열이 지정되면 숫자 문자열을 반환하고, 그렇지 않으면 [BN.js](https://github.com/indutny/bn.js/) 인스턴스를 반환합니다. |

**예시**

```javascript
> caver.utils.fromPeb('1', `klay`);
"0.000000000000000001"
```

## unitMap <a id="unitmap"></a>

```javascript
caver.utils.unitMap
```

가능한 모든 KLAY 값과 그 양을 peb 단위로 표시합니다.

**리턴 값**

| 유형     | 설명                                                                                                                                                                                                                                                                                                                      |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Object | 다음 속성 포함 :- `peb`: '1' - `kpeb`: '1000' - `Mpeb`: '1000000' - `Gpeb`: '1000000000' - `Ston`: '1000000000' - `uKLAY`: '1000000000000' - `mKLAY`: '1000000000000000' - `KLAY`: '1000000000000000000' - `kKLAY`: '1000000000000000000000' - `MKLAY`: '1000000000000000000000000' - `GKLAY`: '1000000000000000000000000000' |

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
}
```

## padLeft <a id="padleft"></a>

```javascript
caver.utils.padLeft(string, characterAmount [, sign])
caver.utils.leftPad(string, characterAmount [, sign]) // ALIAS
```

문자열 왼쪽에 패딩을 추가합니다. HEX 문자열에 패딩을 추가할 때 유용합니다.

**매개변수**

| 이름              | 유형     | 설명                                                   |
| --------------- | ------ | ---------------------------------------------------- |
| string          | String | 왼쪽에 패딩을 추가할 문자열입니다.                                  |
| characterAmount | Number | 전체 문자열에 포함되어야 하는 문자 수입니다.                            |
| sign            | String | (선택 사항) 사용할 문자 기호, 기본값은 `"0"`입니다. |

**리턴 값**

| 유형     | 설명          |
| ------ | ----------- |
| String | 패딩된 문자열입니다. |

**예시**

```javascript
> caver.utils.padLeft('0x3456ff', 20);
"0x000000000000003456ff"

> caver.utils.padLeft(0x3456ff, 20);
"0x000000000000003456ff"

> caver.utils.padLeft('Hello', 20, 'x');
"xxxxxxxxxxxxxxxHello"
```

## padRight <a id="padright"></a>

```javascript
caver.utils.padRight(string, characterAmount [, sign])
caver.utils.rightPad(string, characterAmount [, sign]) // ALIAS
```

문자열의 오른쪽에 패딩을 추가합니다.

**매개변수**

| 이름              | 유형     | 설명                                                   |
| --------------- | ------ | ---------------------------------------------------- |
| string          | String | 오른쪽에 패딩을 추가할 문자열입니다.                                 |
| characterAmount | Number | 전체 문자열에 포함되어야 하는 문자 수입니다.                            |
| sign            | String | (선택 사항) 사용할 문자 기호, 기본값은 `"0"`입니다. |

**리턴 값**

| 유형     | 설명          |
| ------ | ----------- |
| String | 패딩된 문자열입니다. |

**예시**

```javascript
> caver.utils.padRight('0x3456ff', 20);
"0x3456ff00000000000000"

> caver.utils.padRight(0x3456ff, 20);
"0x3456ff00000000000000"

> caver.utils.padRight('Hello', 20, 'x');
"Helloxxxxxxxxxxxxxxx"
```

## toTwosComplement <a id="totwoscomplement"></a>

```javascript
caver.utils.toTwosComplement(number)
```

음수를 2의 보수로 변환합니다.

**매개변수**

| 이름     | 유형                            | 설명         |
| ------ | ----------------------------- | ---------- |
| number | number \| string \| BigNumber | 변환할 숫자입니다. |

**리턴 값**

| 로그 유형  | 설명               |
| ------ | ---------------- |
| String | 변환된 16진수 문자열입니다. |

**예시**

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

## isContractDeployment <a id="iscontractdeployment"></a>

```javascript
caver.utils.isContractDeployment(transactionObject)
```

주어진 트랜잭션이 스마트 컨트랙트 배포 트랜잭션이면 `true`를 반환합니다. 트랜잭션이 스마트 컨트랙트 배포 트랜잭션이 아닌 경우 `false`를 반환합니다. 결과는 `transactionObject`의 매개변수 값에 따라 결정됩니다. 모든 필수 파라미터가 올바르게 설정되었는지 확인하세요.

**참고** caver.klay.isContractDeployment는 **v1.0.1-rc.8**부터 지원됩니다. 이 기능을 사용하려면 [v1.0.1-rc.8](https://www.npmjs.com/package/caver-js/v/1.0.1-rc.8) 이상을 설치하시기 바랍니다.

**매개변수**

| 이름                | 유형     | 설명                                          |
| ----------------- | ------ | ------------------------------------------- |
| transactionObject | Object | 트랜잭션이 스마트 컨트랙트 배포용 트랜잭션인지 확인하려는 트랜잭션 개체입니다. |

**리턴 값**

| 유형      | 설명                                     |
| ------- | -------------------------------------- |
| Boolean | `true`는 트랜잭션 객체가 스마트 컨트랙트 배포용임을 의미합니다. |

**예시**

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

## xyPointFromPublicKey <a id="xypointfrompublickey"></a>

```javascript
caver.utils.xyPointFromPublicKey(publicKey)
```

주어진 공개키의 x와 y 좌표를 반환합니다. 키 암호화에 대한 자세한 내용은 [타원곡선 암호화](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography)를 참조하세요.

**참고** 이 함수에는 공개키가 유효한지 확인하는 로직이 포함되어 있지 않습니다. 이 함수는 입력된 공개키를 길이에 따라 x와 y 포인트로 분할할 뿐입니다.

**매개변수**

| 이름        | 유형     | 설명                      |
| --------- | ------ | ----------------------- |
| publicKey | String | x 및 y 포인트를 가져올 공개 키입니다. |

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

## isHexPrefixed <a id="ishexprefixed"></a>

```javascript
caver.utils.isHexPrefixed(input)
```

입력이 0x 접두사가 붙은 16진수 문자열이면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다.

**참고** caver.klay.isHexPrefixed는 **v1.0.1**부터 지원됩니다. 이 기능을 사용하려면 [v1.0.1](https://www.npmjs.com/package/caver-js/v/1.0.1) 이상을 설치하세요.

**매개변수**

| 이름    | 유형     | 설명                                        |
| ----- | ------ | ----------------------------------------- |
| input | String | 매개변수가 0x 접두사가 붙은 16진수 문자열인지 여부를 결정할 값입니다. |

**리턴 값**

| 유형      | 설명                                       |
| ------- | ---------------------------------------- |
| Boolean | `true`는 입력이 0x 접두사가 붙은 16진수 문자열임을 의미합니다. |

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

## addHexPrefix <a id="addhexprefix"></a>

```javascript
caver.utils.addHexPrefix(input)
```

0x 접두사가 붙은 16진수 문자열을 반환합니다. 입력에 이미 0x 접두사가 붙었거나 16진수가 아닌 문자열이면 입력값이 그대로 반환됩니다.

**참고** caver.klay.addHexPrefix는 **v1.0.1**부터 지원됩니다. 이 기능을 사용하려면 [v1.0.1](https://www.npmjs.com/package/caver-js/v/1.0.1) 이상을 설치하세요.

**매개변수**

| 이름    | 유형     | 설명                    |
| ----- | ------ | --------------------- |
| input | String | 접두사에 0x를 붙일 문자열 값입니다. |

**리턴 값**

| 유형     | 설명                          |
| ------ | --------------------------- |
| String | 0x 접두사가 붙은 16진수 문자열이 반환됩니다. |

**예시**

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

**참고** caver.klay.stripHexPrefix는 **v1.0.1**부터 지원됩니다. 이 기능을 사용하려면 [v1.0.1](https://www.npmjs.com/package/caver-js/v/1.0.1) 이상을 설치하세요.

**매개변수**

| 이름    | 유형     | 설명                  |
| ----- | ------ | ------------------- |
| input | String | 0x 접두사를 제거할 문자열입니다. |

**리턴 값**

| 유형     | 파일 설명               |
| ------ | ------------------- |
| String | 0x가 제거된 문자열이 반환됩니다. |

**예시**

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

이 함수는 입력을 [Buffer](https://nodejs.org/api/buffer.html)로 변환합니다. `toBuffer`를 사용하여 객체를 버퍼로 변환하려면 객체에 **toArray** 함수가 구현되어 있어야 합니다. 문자열 타입 입력의 경우, 이 함수는 **0x 접두사가 붙은 16진수 문자열**에서만 작동합니다.

**참고** caver.klay.toBuffer는 **v1.1.0**부터 지원됩니다. 이 기능을 사용하려면 [v1.1.0](https://www.npmjs.com/package/caver-js/v/1.1.0) 이상을 설치하세요.

**매개변수**

| 이름    | 유형                                                  | 설명            |
| ----- | --------------------------------------------------- | ------------- |
| input | Buffer \| string \| number \| Array \| BN \| Object | 버퍼로 변환할 값입니다. |

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

## numberToBuffer <a id="numbertobuffer"></a>

```javascript
caver.utils.numberToBuffer(input)
```

이 함수는 숫자를 [Buffer](https://nodejs.org/api/buffer.html)로 변환합니다. 입력이 숫자일 때 [caver.utils.toBuffer](#tobuffer)는 이 함수와 동일한 동작을 합니다.

**참고** caver.klay.numberToBuffer는 **v1.1.0**부터 지원됩니다. 이 기능을 사용하려면 [v1.1.0](https://www.npmjs.com/package/caver-js/v/1.1.0) 이상을 설치하세요.

**매개변수**

| 이름    | 유형                     | 설명             |
| ----- | ---------------------- | -------------- |
| input | String \| Number \| BN | 버퍼로 변환할 숫자입니다. |

**리턴 값**

| 유형     | 설명                    |
| ------ | --------------------- |
| Buffer | 버퍼 타입으로 변환된 값이 반환됩니다. |

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

## isTxHash <a id="istxhash"></a>

```javascript
caver.utils.isTxHash(input)
```

입력이 트랜잭션 해시 형식이면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다. 이 함수는 입력만 보고 트랜잭션 해시 형식인지 여부를 판단합니다.
**참고** caver.klay.isTxHash는 **v1.2.0-rc.1**부터 지원됩니다. 이 기능을 사용하려면 [v1.2.0-rc.1](https://www.npmjs.com/package/caver-js/v/1.2.0-rc.1) 이상을 설치하시기 바랍니다.

**파라미터**

| 이름    | 유형     | 설명                               |
| ----- | ------ | -------------------------------- |
| input | String | 파라미터가 트랜잭션 해시 형식인지 아닌지 확인할 값입니다. |

**리턴 값**

| 유형      | 설명                              |
| ------- | ------------------------------- |
| Boolean | `true`는 입력이 트랜잭션 해시 형식임을 의미합니다. |

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

## isTxHashStrict <a id="istxhashstrict"></a>

```javascript
caver.utils.isTxHashStrict(input)
```

입력이 트랜잭션 해시 형식이면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다. 이 함수는 입력만 보고 트랜잭션 해시 형식인지 여부를 판단합니다. [caver.utils.isTxHash](#istxhash)와 다른 점은 HEX 앞에 `0x`가 붙을 것으로 예상한다는 것입니다.
**참고** caver.klay.isTxHashStrict는 **v1.2.0-rc.1**부터 지원됩니다. 이 기능을 사용하려면 [v1.2.0-rc.1](https://www.npmjs.com/package/caver-js/v/1.2.0-rc.1) 이상을 설치하시기 바랍니다.

**매개변수**

| 이름    | 유형     | 설명                               |
| ----- | ------ | -------------------------------- |
| input | String | 파라미터가 트랜잭션 해시 형식인지 아닌지 확인할 값입니다. |

**리턴 값**

| 유형      | 설명                              |
| ------- | ------------------------------- |
| Boolean | `true`는 입력이 트랜잭션 해시 형식임을 의미합니다. |

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

## isValidPrivateKey <a id="isvalidprivatekey"></a>

```javascript
caver.utils.isValidPrivateKey(privateKey)
```

privateKey가 유효하면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다.

**파라미터**

| 이름         | 유형     | 설명                   |
| ---------- | ------ | -------------------- |
| privateKey | String | 유효성을 검사할 개인키 문자열입니다. |

**리턴 값**

| 유형      | 설명                       |
| ------- | ------------------------ |
| Boolean | `true`는 개인키가 유효함을 의미합니다. |

**예시**

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

공개키가 유효하면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다.

**참고** `caver.utils.isValidPublicKey`는 caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0) 부터 지원됩니다.

**매개변수**

| 이름        | 유형     | 설명                   |
| --------- | ------ | -------------------- |
| publicKey | String | 유효성을 검사할 공개키 문자열입니다. |

**리턴 값**

| 유형      | 설명                       |
| ------- | ------------------------ |
| Boolean | `true`는 공개키가 유효함을 의미합니다. |

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

## isValidRole <a id="isvalidrole"></a>

```javascript
caver.utils.isValidRole(role)
```

역할이 유효하면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다. 현재 AccountKeyRoleBased에 정의된 역할은 `transactionKey`,` updateKey`, `feePayerKey`입니다.

**참고** `caver.utils.isValidRole`은 caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0) 부터 지원됩니다.

**파라미터**

| 이름   | 유형     | 설명                  |
| ---- | ------ | ------------------- |
| role | String | 유효성을 검사할 역할 문자열입니다. |

**리턴 값**

| 유형      | 설명                      |
| ------- | ----------------------- |
| Boolean | `true`는 역할이 유효함을 의미합니다. |

**예제**

```javascript
> caver.utils.isValidRole('transactionKey')
true

> caver.utils.isValidRole('updateKey')
true

> caver.utils.isValidRole('feePayerKey')
true

> caver.utils.isValidRole('role')
false
```

## isEmptySig <a id="isemptysig"></a>

```javascript
caver.utils.isEmptySig(sig)
```

sig가 빈 서명 형식(`[['0x01', '0x', '0x']]` 또는 `['0x01', '0x', '0x']`)인 경우 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다.

caver-js에서 트랜잭션을 RLP 인코딩할 때, 서명 또는 feePayerSignatures가 비어 있으면 빈 서명을 나타내는 값인 `[['0x01', '0x', '0x']]`가 해당 속성에 대해 반환됩니다. 이 함수는 주어진 서명이 `[['0x01', '0x', '0x']]`(또는 'LEGACY' 트랜잭션에서는 `['0x01', '0x', '0x']`)인지 여부를 확인하는 데 사용됩니다.

**참고** `caver.utils.isEmptySig`는 caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0) 부터 지원됩니다.

**매개변수**

| 이름  | 유형    | 설명                       |
| --- | ----- | ------------------------ |
| sig | Array | 비어 있는지 여부를 확인할 서명 배열입니다. |

**리턴 값**

| 유형      | 설명                                                                      |
| ------- | ----------------------------------------------------------------------- |
| Boolean | `true`는 시그가 `[['0x01', '0x', '0x']]` 또는 `['0x01', '0x', '0x']`임을 의미합니다. |

**예시**

```javascript
> caver.utils.isEmptySig([['0x01', '0x', '0x']])
true

> caver.utils.isEmptySig(['0x01', '0x', '0x'])
true

> caver.utils.isValidRole([['0x25', '0xf3d0cd43661cabf53425535817c5058c27781f478cb5459874feaa462ed3a29a', '0x6748abe186269ff10b8100a4b7d7fea274b53ea2905acbf498dc8b5ab1bf4fbc']])
false
```

## isKlaytnWalletKey <a id="isklaytnwalletkey"></a>

```javascript
caver.utils.isKlaytnWalletKey(key)
```

키가 [KlaytnWalletKey](../../../../learn/accounts.md#klaytn-wallet-key-format) 형식이면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다.

**참고** `caver.utils.isKlaytnWalletKey`는 caver-js [v1.3.2-rc.3](https://www.npmjs.com/package/caver-js/v/1.3.2-rc.3) 이후 보다 정확한 결과를 위해 추가 로직으로 업데이트되었습니다.

**매개변수**

| signatures | 유형     | 설명                                     |
| ---------- | ------ | -------------------------------------- |
| key        | String | KlaytnWalletKey 형식인지 여부를 확인할 키 문자열입니다. |

**리턴 값**

| 유형      | 설명                                                               |
| ------- | ---------------------------------------------------------------- |
| Boolean | `true`는 키가 `0x{개인키}0x{유형}0x{주소}` 또는 `{개인키}0x{유형}0x{주소}`라는 의미입니다. |

**예시**

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

버퍼를 0x 접두사가 붙은 16진수 문자열로 변환합니다.

**참고** `caver.utils.bufferToHex`는 caver-js [v1.3.2-rc.1](https://www.npmjs.com/package/caver-js/v/1.3.2-rc.1) 부터 지원됩니다.

**파라미터**

| 이름     | 유형     | 설명                   |
| ------ | ------ | -------------------- |
| buffer | Buffer | 16진수 문자열로 변환할 버퍼입니다. |

**리턴 값**

| 유형     | 설명                      |
| ------ | ----------------------- |
| String | 0x 접두사가 붙은 16진수 문자열입니다. |

**예제**

```javascript
> caver.utils.bufferToHex(Buffer.from('5b9ac8', 'hex'))
'0x5b9ac8'

> caver.utils.bufferToHex(Buffer.alloc(0))
'0x'
```
