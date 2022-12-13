---
description: >-
  caver-jsユーティリティAPI。
---

# caver.utils <a id="caver-utils"></a>

`caver.utils` はユーティリティ関数を提供する。


## randomHex <a id="randomhex"></a>

```javascript
caver.utils.randomHex(size)
```
指定されたバイトサイズから暗号的に強力な疑似ランダムな HEX 文字列を生成する [randomHex](https://github.com/frozeman/randomHex) ライブラリ。

**パラメータ**

| 名前  | タイプ    | Description                                                                                                               |
| --- | ------ | ------------------------------------------------------------------------------------------------------------------------- |
| サイズ | Number | The byte size for the HEX string, *e.g.*, `32` will result in a 32-byte HEX string with 64 characters preficed with "0x". |

**戻り値**

| タイプ | Description         |
| --- | ------------------- |
| 文字列 | 生成されたランダムな HEX 文字列。 |

**例**

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


## \_ <a id="\_"></a>

```javascript
caver.utils._()
```

The [underscore](http://underscorejs.org) library for many convenience JavaScript functions.

詳細については、 [アンダースコアAPIリファレンス](http://underscorejs.org) を参照してください。

**例**

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
The [BN.js](https://github.com/indutny/bn.js/) library for calculating with big numbers in JavaScript. See the [BN.js documentation](https://github.com/indutny/bn.js/) for details.

**パラメータ**

| 名前    | タイプ                  | Description                                                      |
| ----- | -------------------- | ---------------------------------------------------------------- |
| mixed | String &#124; Number | A number, number string or HEX string to convert to a BN object. |

**戻り値**

| タイプ    | Description                                        |
| ------ | -------------------------------------------------- |
| Object | [BN.js](https://github.com/indutny/bn.js/) インスタンス。 |

**例**

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

指定された値が [BN.js](https://github.com/indutny/bn.js/) インスタンスであるかどうかをチェックします。


**パラメータ**

| 名前 | タイプ    | Description                                        |
| -- | ------ | -------------------------------------------------- |
| bn | Object | [BN.js](https://github.com/indutny/bn.js/) インスタンス。 |

**戻り値**

| タイプ     | Description                                                        |
| ------- | ------------------------------------------------------------------ |
| Boolean | `指定された値が` BN.js [インスタンスの場合true](https://github.com/indutny/bn.js/) |

**例**

```javascript
> var number = new BN(10);
> caver.utils.isBN(number);
true
```


## isBigNumber <a id="isbignumber"></a>

```javascript
caver.utils.isBigNumber(bignumber)
```

指定された値が [BigNumber.js](http://mikemcl.github.io/bignumber.js/) インスタンスであるかどうかを確認します。


**パラメータ**

| 名前        | タイプ    | Description                                                    |
| --------- | ------ | -------------------------------------------------------------- |
| bignumber | Object | [BigNumber.js](http://mikemcl.github.io/bignumber.js/) インスタンス。 |

**戻り値**

| タイプ     | Description                                    |
| ------- | ---------------------------------------------- |
| Boolean | `与えられた値が` BigNumber.js `インスタンスの場合、true` になります。 |

**例**

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
入力の sha3 を返します。

**NOTE**: To mimic the sha3 behavior of Solidity use [caver.utils.soliditySha3](#soliditysha3).

**パラメータ**

| 名前  | タイプ | Description |
| --- | --- | ----------- |
| 文字列 | 文字列 | ハッシュする文字列   |

**戻り値**

| タイプ | Description |
| --- | ----------- |
| 文字列 | 結果ハッシュ。     |

**例**

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

与えられた入力パラメータのsha3を、ソリッドと同じ方法で計算します。 つまり、引数はABIに変換され、ハッシュされる前にしっかりと詰め込まれることになります。

**パラメータ**

| 名前     | タイプ    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| paramX | 混在しました | 任意のタイプ、または `{type: 'uint', value: '123456'}` または `{t: 'bytes', v: '0xfff456'}` のオブジェクト。 Basic types are autodetected as follows:<br> - `String` non numerical UTF-8 string is interpreted as `string`.<br> - `String|Number|BN|HEX` positive number is interpreted as `uint256`.<br> - `String|Number|BN` negative number is interpreted as `int256`.<br> - `Boolean` as `bool`.<br> - `String` HEX string with leading `0x` is interpreted as `bytes`.<br> - `HEX` HEX number representation is interpreted as `uint256`.<br> |

**戻り値**

| タイプ | Description |
| --- | ----------- |
| 文字列 | 結果ハッシュ。     |

**例**

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
与えられた文字列が HEX 文字列であるかどうかを確認します。

**パラメータ**

| 名前   | タイプ               | Description  |
| ---- | ----------------- | ------------ |
| 16進法 | String &#124; HEX | 与えられたHEX文字列。 |

**戻り値**

| タイプ     | Description                             |
| ------- | --------------------------------------- |
| Boolean | `与えられた文字列が HEX 文字列である場合` true format@@2 |

**例**

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
与えられた文字列が HEX 文字列であるかどうかを確認します。 Difference to [caver.utils.isHex](#ishex) is that it expects HEX to be prefixed with `0x`.

**パラメータ**

| 名前   | タイプ               | Description  |
| ---- | ----------------- | ------------ |
| 16進法 | String &#124; HEX | 与えられたHEX文字列。 |

**戻り値**

| タイプ     | Description                             |
| ------- | --------------------------------------- |
| Boolean | `与えられた文字列が HEX 文字列である場合` true format@@2 |


**例**

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
与えられた文字列が有効なKlaytnアドレスであるかを確認します。 It will also check the checksum, if the address has upper and lowercase letters.

**パラメータ**

| 名前      | タイプ | Description |
| ------- | --- | ----------- |
| address | 文字列 | アドレス文字列     |

**戻り値**

| タイプ     | Description                         |
| ------- | ----------------------------------- |
| Boolean | `true` 与えられた文字列が有効な Klaytn アドレスの場合。 |

**例**

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
大文字または小文字のKlaytnアドレスをチェックサムアドレスに変換します。

**パラメータ**

| 名前      | タイプ | Description |
| ------- | --- | ----------- |
| address | 文字列 | アドレス文字列     |

**戻り値**

| タイプ | Description |
| --- | ----------- |
| 文字列 | チェックサムのアドレス |

**例**

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
指定されたアドレスのチェックサムをチェックします。 チェックサムでないアドレスに対して `false` を返します。

**パラメータ**

| 名前      | タイプ | Description |
| ------- | --- | ----------- |
| address | 文字列 | アドレス文字列     |

**戻り値**

| タイプ     | Description                                                                                                            |
| ------- | ---------------------------------------------------------------------------------------------------------------------- |
| Boolean | `true` when the checksum of the address is valid, `false` if it is not a checksum address, or the checksum is invalid. |

**例**

```javascript
> caver.utils.checkAddressChecksum('0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d');
true
```


## toHex <a id="tohex"></a>

```javascript
caver.utils.toHex(mixed)
```
任意の値をHEXに変換します。 Number strings will interpreted as numbers. テキスト文字列は UTF-8 文字列として解釈されます。

**パラメータ**

| 名前    | タイプ                                             | Description                  |
| ----- | ----------------------------------------------- | ---------------------------- |
| mixed | String &#124; Number &#124; BN &#124; BigNumber | The input to convert to HEX. |

**戻り値**

| タイプ | Description  |
| --- | ------------ |
| 文字列 | 結果の HEX 文字列。 |

**例**

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
任意の値( [BigNumber.js](http://mikemcl.github.io/bignumber.js/) インスタンスを含む)を JavaScript で大きな数字を扱うために、 [BN.js](https://github.com/indutny/bn.js/) インスタンスに安全に変換します。

**NOTE**: For just the [BN.js](https://github.com/indutny/bn.js/) class, use [caver.utils.BN](#bn).


**パラメータ**

| 名前 | タイプ                             | Description                        |
| -- | ------------------------------- | ---------------------------------- |
| 数値 | String &#124; Number &#124; HEX | Number to convert to a big number. |

**戻り値**

| タイプ    | Description                                        |
| ------ | -------------------------------------------------- |
| Object | [BN.js](https://github.com/indutny/bn.js/) インスタンス。 |

**例**

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
与えられたHEX値の数を文字列として返します。

**パラメータ**

| 名前        | タイプ        | Description  |
| --------- | ---------- | ------------ |
| hexString | HEX String | 変換されるHEX文字列。 |

**戻り値**

| タイプ | Description |
| --- | ----------- |
| 文字列 | 文字列としての数値。  |

**例**

```javascript
> caver.utils.hexToNumberString('0xea');
"234"
```


## hexToNumber <a id="hextonumber"></a>

```javascript
caver.utils.hexToNumber(hex)
```
与えられたHEX値の数を返します。

**NOTE**: This is not useful for big numbers, rather use [caver.utils.toBN](#tobn).

**パラメータ**

| 名前        | タイプ        | Description  |
| --------- | ---------- | ------------ |
| hexString | HEX String | 変換されるHEX文字列。 |

**戻り値**

| タイプ    | Description     |
| ------ | --------------- |
| Number | 与えられたHEX値の数を表す。 |

**例**

```javascript
> caver.utils.hexToNumber('0xea');
234
```


## numberToHex <a id="numbertohex"></a>

```javascript
caver.utils.numberToHex(number)
```
与えられた数値の HEX 表現を返します。

**パラメータ**

| 名前 | タイプ                                             | Description                   |
| -- | ----------------------------------------------- | ----------------------------- |
| 数値 | String &#124; Number &#124; BN &#124; BigNumber | A number as string or number. |

**戻り値**

| タイプ | Description     |
| --- | --------------- |
| 文字列 | 与えられた数値の HEX 値。 |

**例**

```javascript
> caver.utils.numberToHex('234');
'0xea'
```


## hexToUtf8 <a id="hextoutf8"></a>

```javascript
caver.utils.hexToUtf8(hex)
caver.utils.hexToString(hex) // ALIAS
```
与えられた HEX 値の UTF-8 文字列表現を返します。


**パラメータ**

| 名前   | タイプ | Description          |
| ---- | --- | -------------------- |
| 16進法 | 文字列 | UTF-8文字列に変換するHEX文字列。 |

**戻り値**

| タイプ | Description |
| --- | ----------- |
| 文字列 | UTF-8文字列。   |

**例**

```javascript
> caver.utils.hexToUtf8('0x49206861766520313030e282ac');
"I have 100€"
```


## hexToAscii <a id="hextoascii"></a>

```javascript
caver.utils.hexToAscii(hex)
```
指定された HEX 値の ASCII 文字列表現を返します。


**パラメータ**

| 名前   | タイプ | Description                                |
| ---- | --- | ------------------------------------------ |
| 16進法 | 文字列 | A HEX string to convert to a ASCII string. |

**戻り値**

| タイプ | Description |
| --- | ----------- |
| 文字列 | ASCII文字列。   |

**例**

```javascript
> caver.utils.hexToAscii('0x4920686176652031303021');
"I have 100!"
```

## utf8ToHex <a id="utf8tohex"></a>

```javascript
caver.utils.utf8ToHex(string)
caver.utils.stringToHex(string) // ALIAS
```
与えられた UTF-8 文字列の HEX 表現を返します。


**パラメータ**

| 名前  | タイプ | Description          |
| --- | --- | -------------------- |
| 文字列 | 文字列 | HEX文字列に変換するUTF-8文字列。 |

**戻り値**

| タイプ | Description |
| --- | ----------- |
| 文字列 | HEXストリング。   |

**例**

```javascript
> caver.utils.utf8ToHex('I have 100€');
"0x49206861766520313030e282ac"
```


## asciiToHex <a id="asciitohex"></a>

```javascript
caver.utils.asciiToHex(string)
```

指定された ASCII 文字列の HEX 表現を返します。


**パラメータ**

| 名前  | タイプ | Description          |
| --- | --- | -------------------- |
| 文字列 | 文字列 | HEX文字列に変換するASCII文字列。 |

**戻り値**

| タイプ | Description |
| --- | ----------- |
| 文字列 | HEXストリング。   |

**例**

```javascript
> caver.utils.asciiToHex('I have 100!');
"0x4920686176652031303021"
```


## hexToBytes <a id="hextobytes"></a>

```javascript
caver.utils.hexToBytes(hex)
```
与えられたHEX文字列からバイト配列を返します。

**パラメータ**

| 名前   | タイプ        | Description  |
| ---- | ---------- | ------------ |
| 16進法 | HEX String | 変換されるHEX文字列。 |

**戻り値**

| タイプ | Description |
| --- | ----------- |
| 行列  | バイト配列。      |

**例**

```javascript
> caver.utils.hexToBytes('0x000000ea');
[ 0, 0, 0, 234 ]
```


## bytesToHex <a id="bytestohex"></a>

```javascript
caver.utils.bytesToHex(byteArray)
```
バイト配列からHEX文字列を返します。

**パラメータ**

| 名前        | タイプ | Description |
| --------- | --- | ----------- |
| byteArray | 行列  | 変換するバイト配列。  |

**戻り値**

| タイプ | Description |
| --- | ----------- |
| 文字列 | HEXストリング。   |

**例**

```javascript
> caver.utils.bytesToHex([ 72, 101, 108, 108, 111, 33, 36 ]);
"0x48656c6c6f2125"
```


## toPeb <a id="topeb"></a>

```javascript
caver.utils.toPeb(number [, unit])
```

KLAY値をpebに変換します。

**NOTE**: "peb" is the smallest KLAY unit, and you should always make calculations in peb and convert only for display reasons.

**パラメータ**

| 名前 | タイプ                            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| -- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 数値 | String &#124; Number &#124; BN | The value.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 単位 | 文字列                            | (optional, defaults to `"KLAY"`) KLAY to convert from. Possible units are:<br>- `peb`: '1' <br> - `kpeb`: '1000' <br> - `Mpeb`: '1000000' <br> - `Gpeb`: '1000000000' <br> - `Ston`: '1000000000' <br> - `uKLAY`: '1000000000000' <br> - `mKLAY`: '1000000000000000' <br> - `KLAY`: '1000000000000000000' <br> - `kKLAY`: '1000000000000000000000' <br> - `MKLAY`: '1000000000000000000000000' <br> - `GKLAY`: '1000000000000000000000000000' <br> |

**戻り値**

| タイプ              | Description                                                                                                                    |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| String &#124; BN | If a number or a string is given, it returns a number string, otherwise a [BN.js](https://github.com/indutny/bn.js/) instance. |

**例**

```javascript
> caver.utils.toPeb('1', 'KLAY');
"1000000000000000000"
```


## fromPeb <a id="frompeb"></a>

```javascript
caver.utils.fromPeb(number [, unit])
```

**NOTE**: "peb" is the smallest KLAY unit, and you should always make calculations in KLAY and convert only for display reasons.

**パラメータ**

| 名前 | タイプ                            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| -- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 数値 | String &#124; Number &#124; BN | The value in peb.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 単位 | 文字列                            | (optional, defaults to `"KLAY"`) KLAY to convert to. Possible units are:<br>- `peb`: '1' <br> - `kpeb`: '1000' <br> - `Mpeb`: '1000000' <br> - `Gpeb`: '1000000000' <br> - `Ston`: '1000000000' <br> - `uKLAY`: '1000000000000' <br> - `mKLAY`: '1000000000000000' <br> - `KLAY`: '1000000000000000000' <br> - `kKLAY`: '1000000000000000000000' <br> - `MKLAY`: '1000000000000000000000000' <br> - `GKLAY`: '1000000000000000000000000000' <br> |

**戻り値**

| タイプ              | Description                                                                                                                    |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| String &#124; BN | If a number or a string is given, it returns a number string, otherwise a [BN.js](https://github.com/indutny/bn.js/) instance. |

**例**

```javascript
> caver.utils.fromPeb('1', 'KLAY');
"0.000000000000000001"
```


## unitMap <a id="unitmap"></a>

```javascript
caver.utils.unitMap
```

可能なすべての KLAY値とペブ内の量を表示します。

**戻り値**

| タイプ    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Object | With the following properties:<br>- `peb`: '1' <br> - `kpeb`: '1000' <br> - `Mpeb`: '1000000' <br> - `Gpeb`: '1000000000' <br> - `Ston`: '1000000000' <br> - `uKLAY`: '1000000000000' <br> - `mKLAY`: '1000000000000000' <br> - `KLAY`: '1000000000000000000' <br> - `kKLAY`: '1000000000000000000000' <br> - `MKLAY`: '1000000000000000000000000' <br> - `GKLAY`: '1000000000000000000000000000' <br> |


**例**

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

Adds a padding on the left of a string. HEX文字列にパディングを追加するのに便利です。


**パラメータ**

| 名前              | タイプ    | Description                                              |
| --------------- | ------ | -------------------------------------------------------- |
| 文字列             | 文字列    | 左側にパディングを追加する文字列。                                        |
| characterAmount | Number | 文字列の合計文字数。                                               |
| sign            | 文字列    | (optional) The character sign to use, defaults to `"0"`. |

**戻り値**

| タイプ | Description |
| --- | ----------- |
| 文字列 | パッド付き文字列。   |

**例**

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


**パラメータ**

| 名前              | タイプ    | Description                                              |
| --------------- | ------ | -------------------------------------------------------- |
| 文字列             | 文字列    | 右側にパディングを追加する文字列。                                        |
| characterAmount | Number | 文字列の合計文字数。                                               |
| sign            | 文字列    | (optional) The character sign to use, defaults to `"0"`. |

**戻り値**

| タイプ | Description |
| --- | ----------- |
| 文字列 | パッド付き文字列。   |

**例**

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

負の数を2 の補数に変換します。


**パラメータ**

| 名前 | タイプ                                   | Description            |
| -- | ------------------------------------- | ---------------------- |
| 数値 | Number &#124; String &#124; BigNumber | The number to convert. |

**戻り値**

| タイプ | Description   |
| --- | ------------- |
| 文字列 | 変換された16進数文字列。 |

**例**

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
指定されたトランザクションがスマートコントラクトデプロイトランザクションの場合、 `true` を返します。 トランザクションがスマートコントラクトデプロイトランザクションでない場合、 `false` を返します。 結果は、 `transactionObject` のパラメータの値によって決定されます。 すべての必須パラメータが正しく設定されていることを確認します。

**NOTE** caver.klay.isContractDeployment is supported from **v1.0.1-rc.8**. この機能を使用するには、 [v1.0.1-rc.8](https://www.npmjs.com/package/caver-js/v/1.0.1-rc.8) 以上をインストールしてください。

**パラメータ**

| 名前                | タイプ    | Description                                                                                    |
| ----------------- | ------ | ---------------------------------------------------------------------------------------------- |
| transactionObject | Object | Transaction object that you want to determine if the transaction is for smart contract deploy. |

**戻り値**

| タイプ     | Description                                         |
| ------- | --------------------------------------------------- |
| Boolean | `true` は、トランザクションオブジェクトがスマートコントラクトデプロイ用であることを意味します。 |

**例**

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
指定した公開鍵の x 座標と y 座標を返します。 For more information on key cryptography, see [Elliptic-curve cryptography](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography).

**注意** この機能は公開鍵が有効かどうかをチェックするロジックを含んでいません。 関数は入力の公開鍵を x と y 点だけに分割します。

**パラメータ**

| 名前   | タイプ | Description    |
| ---- | --- | -------------- |
| 公開キー | 文字列 | XとY点を得るための公開鍵。 |

**戻り値**

| タイプ | Description                            |
| --- | -------------------------------------- |
| 行列  | x点とy点を格納する配列。 インデックス0はx点、インデックス1はy点です。 |

**例**

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

**NOTE** caver.klay.isHexPrefixed is supported from **v1.0.1**. この機能を使用するには、 [v1.0.1](https://www.npmjs.com/package/caver-js/v/1.0.1) 以上をインストールしてください。

**パラメータ**

| 名前    | タイプ | Description                          |
| ----- | --- | ------------------------------------ |
| input | 文字列 | パラメータが 0x 接頭辞の hex 文字列であるかどうかを決定します。 |

**戻り値**

| タイプ     | Description                              |
| ------- | ---------------------------------------- |
| Boolean | `true` は、入力が 0x 接頭辞の 16 進文字列であることを意味します。 |

**例**

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
0x 接頭辞の 16 進文字列を返します。 入力が既に 0x プレフィックスまたは非 16 進数文字列の場合、入力値はそのまま返されます。

**NOTE** caver.klay.addHexPrefix is supported from **v1.0.1**. この機能を使用するには、 [v1.0.1](https://www.npmjs.com/package/caver-js/v/1.0.1) 以上をインストールしてください。

**パラメータ**

| 名前    | タイプ | Description                          |
| ----- | --- | ------------------------------------ |
| input | 文字列 | String value to be prefixed with 0x. |

**戻り値**

| タイプ | Description            |
| --- | ---------------------- |
| 文字列 | 0x 接頭辞の 16 進文字列が返されます。 |

**例**

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
入力から0倍のプレフィックスを取り除いた結果を返します。

**注意** caver.klay.stripHexPrefix は **v1.0.1** からサポートされています。 この機能を使用するには、 [v1.0.1](https://www.npmjs.com/package/caver-js/v/1.0.1) 以上をインストールしてください。

**パラメータ**

| 名前    | タイプ | Description                 |
| ----- | --- | --------------------------- |
| input | 文字列 | String to remove 0x prefix. |

**戻り値**

| タイプ | Description         |
| --- | ------------------- |
| 文字列 | 0x を取り除いた文字列が返されます。 |

**例**

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
この関数は入力を [Buffer](https://nodejs.org/api/buffer.html) に変換します。 To convert an Object into a Buffer using `toBuffer`, the Object must implement **toArray** function. For String type input, this function only works with a **0x-prefixed hex string**.

**NOTE** caver.klay.toBuffer is supported from **v1.1.0**. To use this feature, please install [v1.1.0](https://www.npmjs.com/package/caver-js/v/1.1.0) or higher.

**パラメータ**

| 名前    | タイプ                                                                     | Description                            |
| ----- | ----------------------------------------------------------------------- | -------------------------------------- |
| input | Buffer &#124; String &#124; Number &#124; Array &#124; BN &#124; Object | The value to be converted to a Buffer. |

**戻り値**

| タイプ    | Description              |
| ------ | ------------------------ |
| Buffer | Buffer タイプに変換された値が返されます。 |

**例**

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
この関数は、数値を [Buffer](https://nodejs.org/api/buffer.html) に変換します。 The [caver.utils.toBuffer](#tobuffer) has the same behavior as this function when the input is a number.

**NOTE** caver.klay.numberToBuffer is supported from **v1.1.0**. To use this feature, please install [v1.1.0](https://www.npmjs.com/package/caver-js/v/1.1.0) or higher.

**パラメータ**
| 名前    | タイプ                            | Description                           |
| ----- | ------------------------------ | ------------------------------------- |
| input | String &#124; Number &#124; BN | A number to be converted to a Buffer. |


**戻り値**
| タイプ    | Description              |
| ------ | ------------------------ |
| Buffer | Buffer タイプに変換された値が返されます。 |


**例**
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
Returns `true` if input is in transaction hash format, otherwise it returns `false`. この関数は、入力のみを見て、トランザクションハッシュの形式であるかどうかを決定します。 **NOTE** caver.klay.isTxHash is supported from **v1.2.0-rc.1**. To use this feature, please install [v1.2.0-rc.1](https://www.npmjs.com/package/caver-js/v/1.2.0-rc.1) or higher. **Parameters**
| 名前    | タイプ | Description                         |
| ----- | --- | ----------------------------------- |
| input | 文字列 | パラメータがトランザクションハッシュの形式であるかどうかを決定する値。 |


**戻り値**
| タイプ     | Description                                              |
| ------- | -------------------------------------------------------- |
| Boolean | `true` means the input is in format of transaction hash. |


**例**
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
Returns `true` if input is in transaction hash format, otherwise it returns `false`. この関数は、入力のみを見て、トランザクションハッシュの形式であるかどうかを決定します。 Difference to [caver.utils.isTxHash](#istxhash) is that it expects HEX to be prefixed with `0x`. **NOTE** caver.klay.isTxHashStrict is supported from **v1.2.0-rc.1**. To use this feature, please install [v1.2.0-rc.1](https://www.npmjs.com/package/caver-js/v/1.2.0-rc.1) or higher. **Parameters**
| 名前    | タイプ | Description                         |
| ----- | --- | ----------------------------------- |
| input | 文字列 | パラメータがトランザクションハッシュの形式であるかどうかを決定する値。 |


**戻り値**
| タイプ     | Description                             |
| ------- | --------------------------------------- |
| Boolean | `true` は、入力がトランザクションハッシュの形式であることを意味します。 |


**例**
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

**パラメータ**

| 名前         | タイプ | Description  |
| ---------- | --- | ------------ |
| privateKey | 文字列 | 検証する秘密キー文字列。 |

**戻り値**

| タイプ     | Description                         |
| ------- | ----------------------------------- |
| Boolean | `true` は、privateKey が有効であることを意味します。 |

**例**

```javascript
> caver.utils.isValidPrivateKey('0x{private key}')
true

> caver.utils.isValidPrivateKey('{private key}')
true

> caver.utils.isValidPrivateKey('a5b0cd8c87e77879d64ccc064ee239ed6f71cacf9')
false
```

## isValidPublicKey <a id="isvalidpublickey"></a>

```javascript
caver.utils.isValidPublicKey(publicKey)
```
publicKey が有効な場合は `true` を返します。それ以外の場合は `false` を返します。

**NOTE** `caver.utils.isValidPublicKey` is supported since caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**パラメータ**

| 名前   | タイプ | Description |
| ---- | --- | ----------- |
| 公開キー | 文字列 | 検証する公開鍵文字列。 |

**戻り値**

| タイプ     | Description                |
| ------- | -------------------------- |
| Boolean | `true` は公開鍵が有効であることを意味します。 |

**例**

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
Returns `true` if role is valid, otherwise it returns `false`. Roles that are currently defined for AccountKeyRoleBased are `transactionKey`,`updateKey`, and `feePayerKey`.

**NOTE** `caver.utils.isValidRole` is supported since caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**パラメータ**

| 名前  | タイプ | Description |
| --- | --- | ----------- |
| ロール | 文字列 | 検証するロール文字列。 |

**戻り値**

| タイプ     | Description                 |
| ------- | --------------------------- |
| Boolean | `true` は、ロールが有効であることを意味します。 |

**例**

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

**パラメータ**

| 名前  | タイプ | Description                                   |
| --- | --- | --------------------------------------------- |
| sig | 行列  | An array of signatures to check empty or not. |

**戻り値**

| タイプ     | Description                                                                 |
| ------- | --------------------------------------------------------------------------- |
| Boolean | `true` means the sig is `[['0x01', '0x', '0x']]` or `['0x01', '0x', '0x']`. |

**例**

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
Returns `true` if key is in [KlaytnWalletKey](../../../../../klaytn/design/accounts.md#klaytn-wallet-key-format) format, otherwise it returns `false`.

**NOTE** `caver.utils.isKlaytnWalletKey` has been updated with the additional logic for a more accurate result since caver-js [v1.3.2-rc.3](https://www.npmjs.com/package/caver-js/v/1.3.2-rc.3).

**パラメータ**

| 名前 | タイプ | Description                          |
| -- | --- | ------------------------------------ |
| キー | 文字列 | KlaytnWalletKeyの形式でチェックするかどうかのキー文字列。 |

**戻り値**

| タイプ     | Description                                                                                                       |
| ------- | ----------------------------------------------------------------------------------------------------------------- |
| Boolean | `true` means the key is `0x{private key}0x{type}0x{address in hex}` or `{private key}0x{type}0x{address in hex}`. |

**例**

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
バッファを 0x プレフィックスの 16 進文字列に変換します。

**NOTE** `caver.utils.bufferToHex` is supported since caver-js [v1.3.2-rc.1](https://www.npmjs.com/package/caver-js/v/1.3.2-rc.1).

**パラメータ**

| 名前   | タイプ    | Description       |
| ---- | ------ | ----------------- |
| バッファ | Buffer | 16 進文字列に変換するバッファ。 |

**戻り値**

| タイプ | Description      |
| --- | ---------------- |
| 文字列 | 0x 接頭辞の hex 文字列。 |

**例**

```javascript
> caver.utils.bufferToHex(Buffer.from('5b9ac8', 'hex'))
'0x5b9ac8'

> caver.utils.bufferToHex(0))
'0x'
```
