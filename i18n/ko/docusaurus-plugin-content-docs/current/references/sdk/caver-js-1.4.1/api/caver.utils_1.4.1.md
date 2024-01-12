---
description: caver-js utility APIs.
---

# caver.utils

`caver.utils` provides utility functions.

## randomHex <a id="randomhex"></a>

```javascript
caver.utils.randomHex(size)
```

The [randomHex](https://github.com/frozeman/randomHex) library to generate cryptographically strong pseudo-random HEX strings from a given byte size.

**Parameters**

| Name | Type   | Description                                                                                                               |
| ---- | ------ | ------------------------------------------------------------------------------------------------------------------------- |
| size | Number | The byte size for the HEX string, _e.g._, `32` will result in a 32-byte HEX string with 64 characters preficed with "0x". |

**Return Value**

| Type   | Description                      |
| ------ | -------------------------------- |
| String | The generated random HEX string. |

**Example**

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

## _ (underscore) <a id="underscore"></a>

```javascript
caver.utils._()
```

The [underscore](http://underscorejs.org) library for many convenience JavaScript functions.

See the [underscore API reference](http://underscorejs.org) for details.

**Example**

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

The [BN.js](https://github.com/indutny/bn.js/) library for calculating with big numbers in JavaScript.
See the [BN.js documentation](https://github.com/indutny/bn.js/) for details.

**Parameters**

| Name  | Type             | Description                                                      |
| ----- | ---------------- | ---------------------------------------------------------------- |
| mixed | String \| Number | A number, number string or HEX string to convert to a BN object. |

**Return Value**

| Type   | Description                                              |
| ------ | -------------------------------------------------------- |
| Object | The [BN.js](https://github.com/indutny/bn.js/) instance. |

**Example**

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

Checks if a given value is a [BN.js](https://github.com/indutny/bn.js/) instance.

**Parameters**

| Name | Type   | Description                                            |
| ---- | ------ | ------------------------------------------------------ |
| bn   | Object | A [BN.js](https://github.com/indutny/bn.js/) instance. |

**Return Value**

| Type    | Description                                                                       |
| ------- | --------------------------------------------------------------------------------- |
| Boolean | `true` if a given value is a [BN.js](https://github.com/indutny/bn.js/) instance. |

**Example**

```javascript
> var number = new BN(10);
> caver.utils.isBN(number);
true
```

## isBigNumber <a id="isbignumber"></a>

```javascript
caver.utils.isBigNumber(bignumber)
```

Checks if a given value is a [BigNumber.js](http://mikemcl.github.io/bignumber.js/) instance.

**Parameters**

| Name      | Type   | Description                                                        |
| --------- | ------ | ------------------------------------------------------------------ |
| bignumber | Object | A [BigNumber.js](http://mikemcl.github.io/bignumber.js/) instance. |

**Return Value**

| Type    | Description                                           |
| ------- | ----------------------------------------------------- |
| Boolean | `true` if a given value is a `BigNumber.js` instance. |

**Example**

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

Calculates the sha3 of the input.

**NOTE**: To mimic the sha3 behavior of Solidity use [caver.utils.soliditySha3](#soliditysha3).

**Parameters**

| Name   | Type   | Description       |
| ------ | ------ | ----------------- |
| string | String | A string to hash. |

**Return Value**

| Type   | Description      |
| ------ | ---------------- |
| String | The result hash. |

**Example**

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

Calculates the sha3 of given input parameters in the same way solidity would.
This means arguments will be ABI converted and tightly packed before being hashed.

**Parameters**

| Name   | Type  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ------ | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| paramX | Mixed | Any type, or an object with `{type: 'uint', value: '123456'}` or `{t: 'bytes', v: '0xfff456'}`. Basic types are autodetected as follows: <br/> - `String` non numerical UTF-8 string is interpreted as `string`.<br/> - `String\\|Number\\|BN\\|HEX` positive number is interpreted as `uint256`.<br/>- `String\\|Number\\|BN` negative number is interpreted as `int256`.<br/>- `Boolean` as `bool`.<br/>- `String` HEX string with leading `0x` is interpreted as `bytes`.<br/>- `HEX` HEX number representation is interpreted as `uint256`. |

**Return Value**

| Type   | Description      |
| ------ | ---------------- |
| String | The result hash. |

**Example**

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

Checks if a given string is a HEX string.

**Parameters**

| Name | Type          | Description           |
| ---- | ------------- | --------------------- |
| hex  | String \| HEX | The given HEX string. |

**Return Value**

| Type    | Description                               |
| ------- | ----------------------------------------- |
| Boolean | `true` if a given string is a HEX string. |

**Example**

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

Checks if a given string is a HEX string. Difference to [caver.utils.isHex](#ishex) is that it expects HEX to be prefixed with `0x`.

**Parameters**

| Name | Type          | Description           |
| ---- | ------------- | --------------------- |
| hex  | String \| HEX | The given HEX string. |

**Return Value**

| Type    | Description                               |
| ------- | ----------------------------------------- |
| Boolean | `true` if a given string is a HEX string. |

**Example**

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

Checks if a given string is a valid Klaytn address.
It will also check the checksum, if the address has upper and lowercase letters.

**Parameters**

| Name    | Type   | Description        |
| ------- | ------ | ------------------ |
| address | String | An address string. |

**Return Value**

| Type    | Description                                         |
| ------- | --------------------------------------------------- |
| Boolean | `true` if a given string is a valid Klaytn address. |

**Examples**

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

Converts an upper or lowercase Klaytn address to a checksum address.

**Parameters**

| Name    | Type   | Description        |
| ------- | ------ | ------------------ |
| address | String | An address string. |

**Return Value**

| Type   | Description           |
| ------ | --------------------- |
| String | The checksum address. |

**Examples**

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

Checks the checksum of a given address. Will also return `false` on non-checksum addresses.

**Parameters**

| Name    | Type   | Description        |
| ------- | ------ | ------------------ |
| address | String | An address string. |

**Return Value**

| Type    | Description                                                                                                            |
| ------- | ---------------------------------------------------------------------------------------------------------------------- |
| Boolean | `true` when the checksum of the address is valid, `false` if it is not a checksum address, or the checksum is invalid. |

**Examples**

```javascript
> caver.utils.checkAddressChecksum('0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d');
true
```

## toHex <a id="tohex"></a>

```javascript
caver.utils.toHex(mixed)
```

Converts any given value to HEX.
Number strings will interpreted as numbers.
Text strings will be interpreted as UTF-8 strings.

**Parameters**

| Name  | Type                                | Description                  |
| ----- | ----------------------------------- | ---------------------------- |
| mixed | String \| Number \| BN \| BigNumber | The input to convert to HEX. |

**Return Value**

| Type   | Description               |
| ------ | ------------------------- |
| String | The resulting HEX string. |

**Examples**

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

Safely converts any given value (including [BigNumber.js](http://mikemcl.github.io/bignumber.js/) instances) into a [BN.js](https://github.com/indutny/bn.js/) instance, for handling big numbers in JavaScript.

**NOTE**: For just the [BN.js](https://github.com/indutny/bn.js/) class, use [caver.utils.BN](#bn).

**Parameters**

| Name   | Type                    | Description                        |
| ------ | ----------------------- | ---------------------------------- |
| number | String \| Number \| HEX | Number to convert to a big number. |

**Return Value**

| Type   | Description                                              |
| ------ | -------------------------------------------------------- |
| Object | The [BN.js](https://github.com/indutny/bn.js/) instance. |

**Examples**

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

Returns the number representation of a given HEX value as a string.

**Parameters**

| Name      | Type       | Description                   |
| --------- | ---------- | ----------------------------- |
| hexString | HEX String | A HEX string to be converted. |

**Return Value**

| Type   | Description             |
| ------ | ----------------------- |
| String | The number as a string. |

**Examples**

```javascript
> caver.utils.hexToNumberString('0xea');
"234"
```

## hexToNumber <a id="hextonumber"></a>

```javascript
caver.utils.hexToNumber(hex)
```

Returns the number representation of a given HEX value.

**NOTE**: This is not useful for big numbers, rather use [caver.utils.toBN](#tobn).

**Parameters**

| Name      | Type       | Description                   |
| --------- | ---------- | ----------------------------- |
| hexString | HEX String | A HEX string to be converted. |

**Return Value**

| Type   | Description                                     |
| ------ | ----------------------------------------------- |
| Number | The number representation of a given HEX value. |

**Examples**

```javascript
> caver.utils.hexToNumber('0xea');
234
```

## numberToHex <a id="numbertohex"></a>

```javascript
caver.utils.numberToHex(number)
```

Returns the HEX representation of a given number value.

**Parameters**

| Name   | Type                                | Description                   |
| ------ | ----------------------------------- | ----------------------------- |
| number | String \| Number \| BN \| BigNumber | A number as string or number. |

**Return Value**

| Type   | Description                        |
| ------ | ---------------------------------- |
| String | The HEX value of the given number. |

**Examples**

```javascript
> caver.utils.numberToHex('234');
'0xea'
```

## hexToUtf8 <a id="hextoutf8"></a>

```javascript
caver.utils.hexToUtf8(hex)
caver.utils.hexToString(hex) // ALIAS
```

Returns the UTF-8 string representation of a given HEX value.

**Parameters**

| Name | Type   | Description                                |
| ---- | ------ | ------------------------------------------ |
| hex  | String | A HEX string to convert to a UTF-8 string. |

**Return Value**

| Type   | Description       |
| ------ | ----------------- |
| String | The UTF-8 string. |

**Examples**

```javascript
> caver.utils.hexToUtf8('0x49206861766520313030e282ac');
"I have 100€"
```

## hexToAscii <a id="hextoascii"></a>

```javascript
caver.utils.hexToAscii(hex)
```

Returns the ASCII string representation of a given HEX value.

**Parameters**

| Name | Type   | Description                                |
| ---- | ------ | ------------------------------------------ |
| hex  | String | A HEX string to convert to a ASCII string. |

**Return Value**

| Type   | Description       |
| ------ | ----------------- |
| String | The ASCII string. |

**Examples**

```javascript
> caver.utils.hexToAscii('0x4920686176652031303021');
"I have 100!"
```

## utf8ToHex <a id="utf8tohex"></a>

```javascript
caver.utils.utf8ToHex(string)
caver.utils.stringToHex(string) // ALIAS
```

Returns the HEX representation of a given UTF-8 string.

**Parameters**

| Name   | Type   | Description                                |
| ------ | ------ | ------------------------------------------ |
| string | String | A UTF-8 string to convert to a HEX string. |

**Return Value**

| Type   | Description     |
| ------ | --------------- |
| String | The HEX string. |

**Examples**

```javascript
> caver.utils.utf8ToHex('I have 100€');
"0x49206861766520313030e282ac"
```

## asciiToHex <a id="asciitohex"></a>

```javascript
caver.utils.asciiToHex(string)
```

Returns the HEX representation of a given ASCII string.

**Parameters**

| Name   | Type   | Description                                 |
| ------ | ------ | ------------------------------------------- |
| string | String | An ASCII string to convert to a HEX string. |

**Return Value**

| Type   | Description     |
| ------ | --------------- |
| String | The HEX string. |

**Examples**

```javascript
> caver.utils.asciiToHex('I have 100!');
"0x4920686176652031303021"
```

## hexToBytes <a id="hextobytes"></a>

```javascript
caver.utils.hexToBytes(hex)
```

Returns a byte array from the given HEX string.

**Parameters**

| Name | Type       | Description                   |
| ---- | ---------- | ----------------------------- |
| hex  | HEX String | A HEX string to be converted. |

**Return Value**

| Type  | Description     |
| ----- | --------------- |
| Array | The byte array. |

**Examples**

```javascript
> caver.utils.hexToBytes('0x000000ea');
[ 0, 0, 0, 234 ]
```

## bytesToHex <a id="bytestohex"></a>

```javascript
caver.utils.bytesToHex(byteArray)
```

Returns a HEX string from a byte array.

**Parameters**

| Name      | Type  | Description              |
| --------- | ----- | ------------------------ |
| byteArray | Array | A byte array to convert. |

**Return Value**

| Type   | Description     |
| ------ | --------------- |
| String | The HEX string. |

**Examples**

```javascript
> caver.utils.bytesToHex([ 72, 101, 108, 108, 111, 33, 36 ]);
"0x48656c6c6f2125"
```

## toPeb <a id="topeb"></a>

```javascript
caver.utils.toPeb(number [, unit])
```

Converts any KLAY value into peb.

**NOTE**: "peb" is the smallest KLAY unit, and you should always make calculations in peb and convert only for display reasons.

**Parameters**

| Name   | Type                   | Description                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------ | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| number | String \| Number \| BN | The value.                                                                                                                                                                                                                                                                                                                                                                                                           |
| unit   | String                 | (optional, defaults to `"KLAY"`) KLAY to convert from. Possible units are:- `peb`: '1'  - `kpeb`: '1000'  - `Mpeb`: '1000000'  - `Gpeb`: '1000000000'  - `Ston`: '1000000000'  - `uKLAY`: '1000000000000'  - `mKLAY`: '1000000000000000'  - `KLAY`: '1000000000000000000'  - `kKLAY`: '1000000000000000000000'  - `MKLAY`: '1000000000000000000000000'  - `GKLAY`: '1000000000000000000000000000' |

**Return Value**

| Type         | Description                                                                                                                    |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| String \| BN | If a number or a string is given, it returns a number string, otherwise a [BN.js](https://github.com/indutny/bn.js/) instance. |

**Examples**

```javascript
> caver.utils.toPeb('1', 'KLAY');
"1000000000000000000"
```

## fromPeb <a id="frompeb"></a>

```javascript
caver.utils.fromPeb(number [, unit])
```

**NOTE**: "peb" is the smallest KLAY unit, and you should always make calculations in KLAY and convert only for display reasons.

**Parameters**

| Name   | Type                   | Description                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------ | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| number | String \| Number \| BN | The value in peb.                                                                                                                                                                                                                                                                                                                                                                                                  |
| unit   | String                 | (optional, defaults to `"KLAY"`) KLAY to convert to. Possible units are:- `peb`: '1'  - `kpeb`: '1000'  - `Mpeb`: '1000000'  - `Gpeb`: '1000000000'  - `Ston`: '1000000000'  - `uKLAY`: '1000000000000'  - `mKLAY`: '1000000000000000'  - `KLAY`: '1000000000000000000'  - `kKLAY`: '1000000000000000000000'  - `MKLAY`: '1000000000000000000000000'  - `GKLAY`: '1000000000000000000000000000' |

**Return Value**

| Type         | Description                                                                                                                    |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| String \| BN | If a number or a string is given, it returns a number string, otherwise a [BN.js](https://github.com/indutny/bn.js/) instance. |

**Examples**

```javascript
> caver.utils.fromPeb('1', 'KLAY');
"0.000000000000000001"
```

## unitMap <a id="unitmap"></a>

```javascript
caver.utils.unitMap
```

Shows all possible KLAY values and their amount in peb.

**Return Value**

| Type   | Description                                                                                                                                                                                                                                                                                                                                           |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Object | With the following properties:- `peb`: '1'  - `kpeb`: '1000'  - `Mpeb`: '1000000'  - `Gpeb`: '1000000000'  - `Ston`: '1000000000'  - `uKLAY`: '1000000000000'  - `mKLAY`: '1000000000000000'  - `KLAY`: '1000000000000000000'  - `kKLAY`: '1000000000000000000000'  - `MKLAY`: '1000000000000000000000000'  - `GKLAY`: '1000000000000000000000000000' |

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

## padLeft <a id="padleft"></a>

```javascript
caver.utils.padLeft(string, characterAmount [, sign])
caver.utils.leftPad(string, characterAmount [, sign]) // ALIAS
```

Adds a padding on the left of a string. Useful for adding paddings to HEX strings.

**Parameters**

| Name            | Type   | Description                                                                 |
| --------------- | ------ | --------------------------------------------------------------------------- |
| string          | String | The string to add padding on the left.                                      |
| characterAmount | Number | The number of characters the total string should have.                      |
| sign            | String | (optional) The character sign to use, defaults to `"0"`. |

**Return Value**

| Type   | Description        |
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

## padRight <a id="padright"></a>

```javascript
caver.utils.padRight(string, characterAmount [, sign])
caver.utils.rightPad(string, characterAmount [, sign]) // ALIAS
```

Adds a padding on the right of a string, Useful for adding paddings to HEX strings.

**Parameters**

| Name            | Type   | Description                                                                 |
| --------------- | ------ | --------------------------------------------------------------------------- |
| string          | String | The string to add padding on the right.                                     |
| characterAmount | Number | The number of characters the total string should have.                      |
| sign            | String | (optional) The character sign to use, defaults to `"0"`. |

**Return Value**

| Type   | Description        |
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

## toTwosComplement <a id="totwoscomplement"></a>

```javascript
caver.utils.toTwosComplement(number)
```

Converts a negative number into a two's complement.

**Parameters**

| Name   | Type                          | Description            |
| ------ | ----------------------------- | ---------------------- |
| number | Number \| String \| BigNumber | The number to convert. |

**Return Value**

| Type   | Description               |
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

## isContractDeployment <a id="iscontractdeployment"></a>

```javascript
caver.utils.isContractDeployment(transactionObject)
```

Returns `true` if the given transaction is a smart contract deploy transaction. It returns `false` if the transaction is not a smart contract deploy transaction. The result is determined by the values of the parameters in the `transactionObject`. Make sure all the mandatory parameters are set correctly.

**NOTE** caver.klay.isContractDeployment is supported from **v1.0.1-rc.8**. To use this feature, please install [v1.0.1-rc.8](https://www.npmjs.com/package/caver-js/v/1.0.1-rc.8) or higher.

**Parameters**

| Name              | Type   | Description                                                                                    |
| ----------------- | ------ | ---------------------------------------------------------------------------------------------- |
| transactionObject | Object | Transaction object that you want to determine if the transaction is for smart contract deploy. |

**Return Value**

| Type    | Description                                                       |
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

## xyPointFromPublicKey <a id="xypointfrompublickey"></a>

```javascript
caver.utils.xyPointFromPublicKey(publicKey)
```

Returns the x and y coordinates of the given publicKey. For more information on key cryptography, see [Elliptic-curve cryptography](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography).

**NOTE** This function does not contain any logic to check whether the public key is valid. The function only split the input publicKey into x and y points by length.

**Parameters**

| Name      | Type   | Description                          |
| --------- | ------ | ------------------------------------ |
| publicKey | String | The publicKey to get x and y points. |

**Return Value**

| Type  | Description                                                                    |
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

## isHexPrefixed <a id="ishexprefixed"></a>

```javascript
caver.utils.isHexPrefixed(input)
```

Returns `true` if input is a 0x-prefixed hex string, otherwise it returns `false`.

**NOTE** caver.klay.isHexPrefixed is supported from **v1.0.1**. To use this feature, please install [v1.0.1](https://www.npmjs.com/package/caver-js/v/1.0.1) or higher.

**Parameters**

| Name  | Type   | Description                                                                   |
| ----- | ------ | ----------------------------------------------------------------------------- |
| input | String | The value to be determined if the parameter is 0x-prefixed hex string or not. |

**Return Value**

| Type    | Description                                       |
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

## addHexPrefix <a id="addhexprefix"></a>

```javascript
caver.utils.addHexPrefix(input)
```

Returns a 0x-prefixed hex string. If the input is already 0x-prefixed or a non-hex string, the input value is returned as-is.

**NOTE** caver.klay.addHexPrefix is supported from **v1.0.1**. To use this feature, please install [v1.0.1](https://www.npmjs.com/package/caver-js/v/1.0.1) or higher.

**Parameters**

| Name  | Type   | Description                          |
| ----- | ------ | ------------------------------------ |
| input | String | String value to be prefixed with 0x. |

**Return Value**

| Type   | Description                         |
| ------ | ----------------------------------- |
| String | 0x-prefixed hex string is returned. |

**Examples**

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

Returns the result with 0x prefix stripped from input.

**NOTE** caver.klay.stripHexPrefix is supported from **v1.0.1**. To use this feature, please install [v1.0.1](https://www.npmjs.com/package/caver-js/v/1.0.1) or higher.

**Parameters**

| Name  | Type   | Description                 |
| ----- | ------ | --------------------------- |
| input | String | String to remove 0x prefix. |

**Return Value**

| Type   | Description                          |
| ------ | ------------------------------------ |
| String | A string stripped of 0x is returned. |

**Examples**

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

This function converts the input to a [Buffer](https://nodejs.org/api/buffer.html). To convert an Object into a Buffer using `toBuffer`, the Object must implement **toArray** function. For String type input, this function only works with a **0x-prefixed hex string**.

**NOTE** caver.klay.toBuffer is supported from **v1.1.0**. To use this feature, please install [v1.1.0](https://www.npmjs.com/package/caver-js/v/1.1.0) or higher.

**Parameters**

| Name  | Type                                                | Description                            |
| ----- | --------------------------------------------------- | -------------------------------------- |
| input | Buffer \| String \| Number \| Array \| BN \| Object | The value to be converted to a Buffer. |

**Return Value**

| Type   | Description                                     |
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

## numberToBuffer <a id="numbertobuffer"></a>

```javascript
caver.utils.numberToBuffer(input)
```

This function converts a number to a [Buffer](https://nodejs.org/api/buffer.html). The [caver.utils.toBuffer](#tobuffer) has the same behavior as this function when the input is a number.

**NOTE** caver.klay.numberToBuffer is supported from **v1.1.0**. To use this feature, please install [v1.1.0](https://www.npmjs.com/package/caver-js/v/1.1.0) or higher.

**Parameters**

| Name  | Type                   | Description                           |
| ----- | ---------------------- | ------------------------------------- |
| input | String \| Number \| BN | A number to be converted to a Buffer. |

**Return Value**

| Type   | Description                                     |
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

## isTxHash <a id="istxhash"></a>

```javascript
caver.utils.isTxHash(input)
```

Returns `true` if input is in transaction hash format, otherwise it returns `false`. This function only looks at the input and determines if it is in the format of a transaction hash.
**NOTE** caver.klay.isTxHash is supported from **v1.2.0-rc.1**. To use this feature, please install [v1.2.0-rc.1](https://www.npmjs.com/package/caver-js/v/1.2.0-rc.1) or higher.

**Parameters**

| Name  | Type   | Description                                                                              |
| ----- | ------ | ---------------------------------------------------------------------------------------- |
| input | String | The value to be determined if the parameter is in the format of transaction hash or not. |

**Return Value**

| Type    | Description                                              |
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

## isTxHashStrict <a id="istxhashstrict"></a>

```javascript
caver.utils.isTxHashStrict(input)
```

Returns `true` if input is in transaction hash format, otherwise it returns `false`. This function only looks at the input and determines if it is in the format of a transaction hash. Difference to [caver.utils.isTxHash](#istxhash) is that it expects HEX to be prefixed with `0x`.
**NOTE** caver.klay.isTxHashStrict is supported from **v1.2.0-rc.1**. To use this feature, please install [v1.2.0-rc.1](https://www.npmjs.com/package/caver-js/v/1.2.0-rc.1) or higher.

**Parameters**

| Name  | Type   | Description                                                                              |
| ----- | ------ | ---------------------------------------------------------------------------------------- |
| input | String | The value to be determined if the parameter is in the format of transaction hash or not. |

**Return Value**

| Type    | Description                                                  |
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

## isValidPrivateKey <a id="isvalidprivatekey"></a>

```javascript
caver.utils.isValidPrivateKey(privateKey)
```

Returns `true` if privateKey is valid, otherwise it returns `false`.

**Parameters**

| Name       | Type   | Description                       |
| ---------- | ------ | --------------------------------- |
| privateKey | String | A private key string to validate. |

**Return Value**

| Type    | Description                           |
| ------- | ------------------------------------- |
| Boolean | `true` means the privateKey is valid. |

**Examples**

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

Returns `true` if publicKey is valid, otherwise it returns `false`.

**NOTE** `caver.utils.isValidPublicKey` is supported since caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**Parameters**

| Name      | Type   | Description                      |
| --------- | ------ | -------------------------------- |
| publicKey | String | A public key string to validate. |

**Return Value**

| Type    | Description                          |
| ------- | ------------------------------------ |
| Boolean | `true` means the publicKey is valid. |

**Examples**

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

Returns `true` if role is valid, otherwise it returns `false`. Roles that are currently defined for AccountKeyRoleBased are `transactionKey`,` updateKey`, and `feePayerKey`.

**NOTE** `caver.utils.isValidRole` is supported since caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**Parameters**

| Name | Type   | Description                |
| ---- | ------ | -------------------------- |
| role | String | A role string to validate. |

**Return Value**

| Type    | Description                     |
| ------- | ------------------------------- |
| Boolean | `true` means the role is valid. |

**Examples**

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

Returns `true` if sig is in the format of empty signature (`[['0x01', '0x', '0x']]` or `['0x01', '0x', '0x']`), otherwise it returns `false`.

When RLP-encoding a transaction in caver-js, if signatures or feePayerSignatures is empty, the value representing an empty signature, `[['0x01', '0x', '0x']]`, is returned for the property. This function is used to check whether the given signature is `[['0x01', '0x', '0x']]` (or `['0x01', '0x', '0x']` in the 'LEGACY' transaction).

**NOTE** `caver.utils.isEmptySig` is supported since caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**Parameters**

| Name | Type  | Description                                   |
| ---- | ----- | --------------------------------------------- |
| sig  | Array | An array of signatures to check empty or not. |

**Return Value**

| Type    | Description                                                                 |
| ------- | --------------------------------------------------------------------------- |
| Boolean | `true` means the sig is `[['0x01', '0x', '0x']]` or `['0x01', '0x', '0x']`. |

**Examples**

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

Returns `true` if key is in [KlaytnWalletKey](../../../../learn/accounts.md#klaytn-wallet-key-format) format, otherwise it returns `false`.

**NOTE** `caver.utils.isKlaytnWalletKey` has been updated with the additional logic for a more accurate result since caver-js [v1.3.2-rc.3](https://www.npmjs.com/package/caver-js/v/1.3.2-rc.3).

**Parameters**

| Name | Type   | Description                                                    |
| ---- | ------ | -------------------------------------------------------------- |
| key  | String | A key string to check in the format of KlaytnWalletKey or not. |

**Return Value**

| Type    | Description                                                                                                       |
| ------- | ----------------------------------------------------------------------------------------------------------------- |
| Boolean | `true` means the key is `0x{private key}0x{type}0x{address in hex}` or `{private key}0x{type}0x{address in hex}`. |

**Examples**

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

Converts buffer to 0x-prefixed hex string.

**NOTE** `caver.utils.bufferToHex` is supported since caver-js [v1.3.2-rc.1](https://www.npmjs.com/package/caver-js/v/1.3.2-rc.1).

**Parameters**

| Name   | Type   | Description                        |
| ------ | ------ | ---------------------------------- |
| buffer | Buffer | A buffer to convert to hex string. |

**Return Value**

| Type   | Description                 |
| ------ | --------------------------- |
| String | The 0x-prefixed hex string. |

**Examples**

```javascript
> caver.utils.bufferToHex(Buffer.from('5b9ac8', 'hex'))
'0x5b9ac8'

> caver.utils.bufferToHex(Buffer.alloc(0))
'0x'
```
