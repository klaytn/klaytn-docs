---
description: caver-jsユーティリティAPI。
---

# caver.utils

`caver.utils` はユーティリティ関数を提供する。

## randomHex <a href="#randomhex" id="randomhex"></a>

```javascript
caver.utils.randomHex(size)
```

指定されたバイトサイズから暗号的に強力な疑似ランダムな HEX 文字列を生成する [randomHex](https://github.com/frozeman/randomHex) ライブラリ。

**パラメータ**HEX文字列のバイトサイズ _例: _ ,_32 `` は、"0x" で始まる64文字の32バイトの HEX 文字列になります。</td> </tr> </tbody> </table> 

**戻り値**

| タイプ | Description         |
| --- | ------------------- |
| 文字列 | 生成されたランダムな HEX 文字列。 |


**例**



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




## \_ <a href="#_" id="_"></a>



```javascript
caver.utils._()
```


[は、多くの便利な JavaScript 関数のための](http://underscorejs.org) ライブラリをアンダースコアします。

詳細については、 [アンダースコアAPIリファレンス](http://underscorejs.org) を参照してください。

**例**



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


任意の値( [BigNumber.js](http://mikemcl.github.io/bignumber.js/) インスタンスを含む)を JavaScript で大きな数字を扱うために、 [BN.js](https://github.com/indutny/bn.js/) インスタンスに安全に変換します。

**パラメータ**

| 名前 | タイプ    | Description                             |
| -- | ------ | --------------------------------------- |
| 数値 | 文字列 \ | number | number to convert a big number |


**戻り値**

| タイプ    | Description                                        |
| ------ | -------------------------------------------------- |
| Object | [BN.js](https://github.com/indutny/bn.js/) インスタンス。 |


**例**



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


指定された値が [BN.js](https://github.com/indutny/bn.js/) インスタンスであるかどうかをチェックします。

**パラメータ**

| 名前 | タイプ    | Description                                        |
| -- | ------ | -------------------------------------------------- |
| bn | object | [BN.js](https://github.com/indutny/bn.js/) インスタンス。 |


**戻り値**

| タイプ     | Description                                                        |
| ------- | ------------------------------------------------------------------ |
| boolean | `指定された値が` BN.js [インスタンスの場合true](https://github.com/indutny/bn.js/) |


**例**



```javascript
> var number = new caver.utils.BN(10)
> caver.utils.isBN(number)
true
```




## isBigNumber <a href="#isbignumber" id="isbignumber"></a>



```javascript
caver.utils.isBigNumber(bignumber)
```


指定された値が [BigNumber.js](http://mikemcl.github.io/bignumber.js/) インスタンスであるかどうかを確認します。

**パラメータ**

| 名前        | タイプ    | Description                                                    |
| --------- | ------ | -------------------------------------------------------------- |
| bignumber | object | [BigNumber.js](http://mikemcl.github.io/bignumber.js/) インスタンス。 |


**戻り値**

| タイプ     | Description                                    |
| ------- | ---------------------------------------------- |
| boolean | `与えられた値が` BigNumber.js `インスタンスの場合、true` になります。 |


**例**



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


入力の sha3 を返します。

**注意**: Solidity の sha3 挙動を模倣するには、 [caver.utils.soliditySha3](caver.utils.md#soliditysha3) を使用する。

**パラメータ**

| 名前  | タイプ | Description |
| --- | --- | ----------- |
| str | 文字列 | ハッシュする文字列   |


**戻り値**

| タイプ | Description |
| --- | ----------- |
| 文字列 | 結果ハッシュ。     |


**例**



```javascript
> caver.utils.sha3('234') // taked as string
'0xc1912fee45d61c87cc5ea59dae311904cd86b84fee17cc96966216f811ce6a79'

> caver.utils.sha3(new caver.utils.bn('234')) // utils.sha3 stringify bignumberインスタンス.
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


与えられた入力パラメータのsha3を、ソリッドと同じ方法で計算します。 つまり、引数はABIに変換され、ハッシュされる前にしっかりと詰め込まれることになります。

**パラメータ**

| 名前     | タイプ    | Description               |
| ------ | ------ | ------------------------- |
| paramX | 混在しました | <p>任意のタイプ、または <code>{type: 'uint', value: '123456'}</code> または <code>{t: 'bytes', v: '0xfff456'}</code> のオブジェクト。 基本型は以下のように自動検出されます:<br>- <code>文字列</code> 非数値の UTF-8 文字列は <code>文字列</code>と解釈されます。<br>- `string</p> |


**戻り値**

| タイプ | Description |
| --- | ----------- |
| 文字列 | 結果ハッシュ。     |


**例**



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


与えられた文字列が HEX 文字列であるかどうかを確認します。

**パラメータ**

| 名前   | タイプ | Description  |
| ---- | --- | ------------ |
| 16進法 | 文字列 | 与えられたHEX文字列。 |


**戻り値**

| タイプ     | Description                             |
| ------- | --------------------------------------- |
| boolean | `与えられたパラメータが HEX 文字列の場合` true format@@2 |


**例**



```javascript
> caver.utils.isHex('0xc1912')
true

> caver.utils.isHex('c1912')
true

> caver.utils.isHex('0xZ1912')


false> caver.utils.isHex('Hello')
false
```




## isHexStrict <a href="#ishexstrict" id="ishexstrict"></a>



```javascript
caver.utils.isHexStrict(hex)
```


与えられた文字列が HEX 文字列であるかどうかを確認します。 [caver.utils.isHex](caver.utils.md#ishex) との違いは、HEXが `0x` で始まることを期待することです。

**パラメータ**

| 名前   | タイプ | Description  |
| ---- | --- | ------------ |
| 16進法 | 文字列 | 与えられたHEX文字列。 |


**戻り値**

| タイプ     | Description                             |
| ------- | --------------------------------------- |
| boolean | `与えられた文字列が HEX 文字列である場合` true format@@2 |


**例**



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


与えられた文字列が有効なKlaytnアドレスであるかを確認します。 また、アドレスに大文字と小文字が含まれているかどうかもチェックします。

**パラメータ**

| 名前      | タイプ | Description |
| ------- | --- | ----------- |
| address | 文字列 | アドレス文字列     |


**戻り値**

| タイプ     | Description                         |
| ------- | ----------------------------------- |
| boolean | `true` 与えられた文字列が有効な Klaytn アドレスの場合。 |


**例**



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
> caver.utils.toChecksumAddress('0xc1912fee45d61c87cc5ea59dae31190fffff232d')
'0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d'

> caver.utils.toChecksumAddress('0XC1912FEE45D61C87CC5EA59DAE31190FFFFF232D')
'0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d' // same as above
```




## checkAddressChecksum <a href="#checkaddresschecksum" id="checkaddresschecksum"></a>



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
| boolean | `true` when the checksum of the address is valid, `false` if it is not a checksum address, or the checksum is invalid. |


**例**



```javascript
> caver.utils.checkAddressChecksum('0xc1912fEE45d61C87Cc5EA59DaE31190FFFF232d')
true
```




## toHex <a href="#tohex" id="tohex"></a>



```javascript
caver.utils.toHex(mixed)
```


任意の値をHEXに変換します。 数値の文字列は数値として解釈されます。 テキスト文字列は UTF-8 文字列として解釈されます。

**パラメータ**

| 名前    | タイプ    | Description                               |
| ----- | ------ | ----------------------------------------- |
| mixed | 文字列 \ | number \| BN \| BigNumber | HEXに変換する入力。 |


**戻り値**

| タイプ | Description  |
| --- | ------------ |
| 文字列 | 結果の HEX 文字列。 |


**例**



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


与えられたHEX値の数を文字列として返します。

**パラメータ**

| 名前        | タイプ | Description  |
| --------- | --- | ------------ |
| hexstring | 文字列 | 変換されるHEX文字列。 |


**戻り値**

| タイプ | Description |
| --- | ----------- |
| 文字列 | 文字列としての数値。  |


**例**



```javascript
> caver.utils.hexToNumberString('0xea')
"234"
```




## hexToNumber <a href="#hextonumber" id="hextonumber"></a>



```javascript
caver.utils.hexToNumber(hex)
```


与えられたHEX値の数を返します。

**注**: これは大きな数字では役に立ちません。むしろ [caver.utils.toBN](caver.utils.md#tobn) を使用してください。

**パラメータ**

| 名前        | タイプ | Description  |
| --------- | --- | ------------ |
| hexstring | 文字列 | 変換されるHEX文字列。 |


**戻り値**

| タイプ | Description     |
| --- | --------------- |
| 数値  | 与えられたHEX値の数を表す。 |


**例**



```javascript
> caver.utils.hexToNumber('0xea')
234
```




## numberToHex <a href="#numbertohex" id="numbertohex"></a>



```javascript
caver.utils.numberToHex(number)
```


与えられた数値の HEX 表現を返します。

**パラメータ**

| 名前 | タイプ    | Description                                   |
| -- | ------ | --------------------------------------------- |
| 数値 | 文字列 \ | number \| DN \| BigNumber | 文字列または数字としての数値。 |


**戻り値**

| タイプ | Description     |
| --- | --------------- |
| 文字列 | 与えられた数値の HEX 値。 |


**例**



```javascript
> caver.utils.numberToHex('234')
'0xea'
```




## hexToUtf8 <a href="#hextoutf8" id="hextoutf8"></a>



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
> caver.utils.hexToUtf8('0x49206861766520313030e282ac')
'I have 100€'
```




## hexToAscii <a href="#hextoascii" id="hextoascii"></a>



```javascript
caver.utils.hexToAscii(hex)
```


指定された HEX 値の ASCII 文字列表現を返します。

**パラメータ**

| 名前   | タイプ | Description          |
| ---- | --- | -------------------- |
| 16進法 | 文字列 | ASCII文字列に変換するHEX文字列。 |


**戻り値**

| タイプ | Description |
| --- | ----------- |
| 文字列 | ASCII文字列。   |


**例**



```javascript
> caver.utils.hexToAscii('0x4920686176652031303021')
'I have 100!'
```




## utf8ToHex <a href="#utf8tohex" id="utf8tohex"></a>



```javascript
caver.utils.utf8ToHex(str)
caver.utils.stringToHex(str) // ALIAS
```


与えられた UTF-8 文字列の HEX 表現を返します。

**パラメータ**

| 名前  | タイプ | Description          |
| --- | --- | -------------------- |
| str | 文字列 | HEX文字列に変換するUTF-8文字列。 |


**戻り値**

| タイプ | Description |
| --- | ----------- |
| 文字列 | HEXストリング。   |


**例**



```javascript
> caver.utils.utf8ToHex('I have 100€')
'0x49206861766520313030e282ac'
```




## asciiToHex <a href="#asciitohex" id="asciitohex"></a>



```javascript
caver.utils.asciiToHex(str)
```


指定された ASCII 文字列の HEX 表現を返します。

**パラメータ**

| 名前  | タイプ | Description          |
| --- | --- | -------------------- |
| str | 文字列 | HEX文字列に変換するASCII文字列。 |


**戻り値**

| タイプ | Description |
| --- | ----------- |
| 文字列 | HEXストリング。   |


**例**



```javascript
> caver.utils.asciiToHex('I have 100!')
'0x4920686176652031303021'
```




## hexToBytes <a href="#hextobytes" id="hextobytes"></a>



```javascript
caver.utils.hexToBytes(hex)
```


与えられたHEX文字列からバイト配列を返します。

**パラメータ**

| 名前   | タイプ | Description  |
| ---- | --- | ------------ |
| 16進法 | 文字列 | 変換されるHEX文字列。 |


**戻り値**

| タイプ | Description |
| --- | ----------- |
| 行列  | バイト配列。      |


**例**



```javascript
> caver.utils.hexToBytes('0x000000ea')
[ 0, 0, 0, 234 ]
```




## bytesToHex <a href="#bytestohex" id="bytestohex"></a>



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
> caver.utils.bytesToHex([ 72, 101, 108, 108, 111, 33, 36 ])
'0x48656c6c6f2124'
```




## convertToPeb <a href="#topeb" id="topeb"></a>



```javascript
caver.utils.convertToPeb(number [, unit])
```


KLAY値をpebに変換します。

**注**: "peb" は最小の KLAY単位であり、KLAYの単位として常に "peb" を使用する必要があります。 「KLAY」に変換するのは、表示上の理由だけです。

**パラメータ**

| 名前 | タイプ    | Description                |
| -- | ------ | -------------------------- |
| 数値 | 文字列 \ | number \| DN | 値。         |
| 単位 | 文字列    | <p>(オプション、デフォルトは <code>"KLAY"</code>) 変換する KLAYの単位。 <code>number</code> will be multiplied by one of the following multipliers for the unit provided:<br>- <code>peb</code>: '1'<br>- <code>kpeb</code>: '1000'<br>- <code>Mpeb</code>: '1000000'<br>- <code>Gpeb</code>: '1000000000'<br>- <code>Ston</code>: '1000000000'<br>- <code>uKLAY</code>: '1000000000000'<br>- <code>mKLAY</code>: '1000000000000000'<br>- <code>KLAY</code>: '1000000000000000000'<br>- <code>kKLAY</code>: '1000000000000000000000'<br>- <code>MKLAY</code>: '1000000000000000000000000'<br>- <code>GKLAY</code>: '1000000000000000000000000000'<br></p> |


**戻り値**

| タイプ    | Description                                                                                         |
| ------ | --------------------------------------------------------------------------------------------------- |
| 文字列 \ | BN | number パラメータが [BN](https://github.com/indutny/bn.js/)のインスタンスの場合、BNインスタンスを返します。そうでなければ文字列を返します。 |


**例**



```javascript
> caver.utils.convertToPeb('1', 'KLAY')
'1000000000000000000'

> caver.utils.convertToPeb(caver.utils.toBN(1), 'KLAY')
<BN: de0b6b3a7640000>
```




## convertFromPeb <a href="#convertfrompeb" id="convertfrompeb"></a>



```javascript
caver.utils.convertFromPeb(number [, unit])
```


**注**: "peb" は最小の KLAY単位であり、KLAYの単位として常に "peb" を使用する必要があります。 「KLAY」に変換するのは、表示上の理由だけです。

**パラメータ**

| 名前 | タイプ    | Description                           |
| -- | ------ | ------------------------------------- |
| 数値 | 文字列 \ | number \| BN \| BigNumber | peb の値。 |
| 単位 | 文字列    | <p>(オプション、デフォルトは <code>"KLAY"</code>) "peb" を変換するKLAYの単位。 <code>number</code> will be divided by one of the following denominators for the unit provided:<br>- <code>peb</code>: '1'<br>- <code>kpeb</code>: '1000'<br>- <code>Mpeb</code>: '1000000'<br>- <code>Gpeb</code>: '1000000000'<br>- <code>Ston</code>: '1000000000'<br>- <code>uKLAY</code>: '1000000000000'<br>- <code>mKLAY</code>: '1000000000000000'<br>- <code>KLAY</code>: '1000000000000000000'<br>- <code>kKLAY</code>: '1000000000000000000000'<br>- <code>MKLAY</code>: '1000000000000000000000000'<br>- <code>GKLAY</code>: '1000000000000000000000000000'<br></p>            |


**戻り値**

| タイプ | Description |
| --- | ----------- |
| 文字列 | 文字列番号。      |


**例**



```javascript
> caver.utils.convertFromPeb('1', 'KLAY')
'0.000000000000000001'
```




## unitMap <a href="#unitmap" id="unitmap"></a>



```javascript
caver.utils.unitMap
```


可能なすべての KLAY値とペブ内の量を表示します。

**戻り値**

| タイプ    | Description                |
| ------ | -------------------------- |
| Object | <p>With the following properties:<br>- <code>peb</code>: '1'<br>- <code>kpeb</code>: '1000'<br>- <code>Mpeb</code>: '1000000'<br>- <code>Gpeb</code>: '1000000000'<br>- <code>Ston</code>: '1000000000'<br>- <code>uKLAY</code>: '1000000000000'<br>- <code>mKLAY</code>: '1000000000000000'<br>- <code>KLAY</code>: '1000000000000000000'<br>- <code>kKLAY</code>: '1000000000000000000000'<br>- <code>MKLAY</code>: '1000000000000000000000000'<br>- <code>GKLAY</code>: '1000000000000000000000000000'<br>- <code>TKLAY</code>: '1000000000000000000000000000000'<br></p> |


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
  TKLAY: '1000000000000000000000000000000'
}
```




## klayUnit <a href="#klayunit" id="klayunit"></a>



```javascript
caver.utils.klayUnit
```


すべての KLAY単位を表示します。

**戻り値**

| タイプ    | Description                                                                                         |
| ------ | --------------------------------------------------------------------------------------------------- |
| Object | Klaytn で使用される KLAYの単位が定義されたオブジェクト。 それぞれのユニットには名前と小石要素があります。 pebFactorは現在KLAYを各単位で「peb」に変換する際に使用される。 |


**例**



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




## padLeft <a href="#padleft" id="padleft"></a>



```javascript
caver.utils.padLeft(string, characterAmount [, sign])
caver.utils.leftPad(string, characterAmount [, sign]) // ALIAS
```


文字列の左側にパディングを追加します。 HEX文字列にパディングを追加するのに便利です。

**パラメータ**

| 名前              | タイプ | Description                   |
| --------------- | --- | ----------------------------- |
| 文字列             | 文字列 | 左側にパディングを追加する文字列。             |
| characterAmount | 数値  | 文字列の合計文字数。                    |
| sign            | 文字列 | (オプション) 使用する文字記号。既定値は `0` です。 |


**戻り値**

| タイプ | Description |
| --- | ----------- |
| 文字列 | パッド付き文字列。   |


**例**



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


文字列の右側にパディングを追加します。HEX 文字列にパディングを追加するのに便利です。

**パラメータ**

| 名前              | タイプ | Description                   |
| --------------- | --- | ----------------------------- |
| str             | 文字列 | 右側にパディングを追加する文字列。             |
| characterAmount | 数値  | 文字列の合計文字数。                    |
| sign            | 文字列 | (オプション) 使用する文字記号。既定値は `0` です。 |


**戻り値**

| タイプ | Description |
| --- | ----------- |
| 文字列 | パッド付き文字列。   |


**例**



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


0x 接頭辞付きの16進数文字列から先頭のゼロを削除します。

**パラメータ**

| 名前        | タイプ | Description  |
| --------- | --- | ------------ |
| hexString | 文字列 | トリムする16進文字列。 |


**戻り値**

| タイプ | Description   |
| --- | ------------- |
| 文字列 | ゼロの先頭のない16進数。 |


**例**



```javascript
> caver.utils.trimLeadingZero('0x000011')
0x11
```




## makeeven <a href="#makeeven" id="makeeven"></a>



```javascript
caver.utils.makeEven(hexString)
```


偶数の長さに文字列を返します。

**パラメータ**

| 名前        | タイプ | Description   |
| --------- | --- | ------------- |
| hexString | 文字列 | 均等にする16進数文字列。 |


**戻り値**

| タイプ | Description |
| --- | ----------- |
| 文字列 | 均一な長さの文字列。  |


**例**



```javascript
> caver.utils.makeEven('0x011')
0x0011
```




## toTwosComplement <a href="#totwoscomplement" id="totwoscomplement"></a>



```javascript
caver.utils.toTwosComplement(num)
```


負の数を2 の補数に変換します。

**パラメータ**

| 名前  | タイプ  | Description                    |
| --- | ---- | ------------------------------ |
| num | 数 \ | string \| BigNumber | 変換する数値。 |


**戻り値**

| タイプ | Description   |
| --- | ------------- |
| 文字列 | 変換された16進数文字列。 |


**例**



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


指定されたトランザクションがスマートコントラクトデプロイトランザクションの場合、 `true` を返します。 トランザクションがスマートコントラクトデプロイトランザクションでない場合、 `false` を返します。 結果は、 `transactionObject` のパラメータの値によって決定されます。 すべての必須パラメータが正しく設定されていることを確認します。

**パラメータ**

| 名前                | タイプ    | Description                                                              |
| ----------------- | ------ | ------------------------------------------------------------------------ |
| transactionObject | object | [トランザクション](caver.transaction/#class) のインスタンスで、コントラクトのデプロイトランザクションを確認します。 |


**戻り値**

| タイプ     | Description                                         |
| ------- | --------------------------------------------------- |
| boolean | `true` は、トランザクションオブジェクトがスマートコントラクトデプロイ用であることを意味します。 |


**例**



```javascript
> caver.utils.isContractDeployment(caver.transaction.legacyTransaction.create({
    to: '0x9957dfd92e4b70f91131c573293343bc5f21f215',
    value: caver.utils.toPeb(1, 'KLAY'),
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


指定した公開鍵の x 座標と y 座標を返します。 鍵暗号の詳細については、 [楕円曲線暗号](https://en.wikipedia.org/wiki/Elliptic-curve\_cryptography) を参照してください。

**注意** この機能は公開鍵が有効かどうかをチェックするロジックを含んでいません。 関数は入力の公開鍵を x と y 点だけに分割します。 公開鍵を検証するには、 [isValidPublicKey](caver.utils.md#isvalidpublickey) を使用してください。

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




## isHexPrefixed <a href="#ishexprefixed" id="ishexprefixed"></a>



```javascript
caver.utils.isHexPrefixed(input)
```


入力が 0x 接頭辞の 16 進文字列の場合は `true` を返します。それ以外の場合は `false` を返します。

**パラメータ**

| 名前    | タイプ | Description                          |
| ----- | --- | ------------------------------------ |
| input | 文字列 | パラメータが 0x 接頭辞の hex 文字列であるかどうかを決定します。 |


**戻り値**

| タイプ     | Description                              |
| ------- | ---------------------------------------- |
| boolean | `true` は、入力が 0x 接頭辞の 16 進文字列であることを意味します。 |


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




## addHexPrefix <a href="#addhexprefix" id="addhexprefix"></a>



```javascript
caver.utils.addHexPrefix(input)
```


0x 接頭辞の 16 進文字列を返します。 入力が既に 0x プレフィックスまたは非 16 進数文字列の場合、入力値はそのまま返されます。

**パラメータ**

| 名前    | タイプ | Description  |
| ----- | --- | ------------ |
| input | 文字列 | 0xで始まる文字列の値。 |


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




## stripHexPrefix <a href="#striphexprefix" id="striphexprefix"></a>



```javascript
caver.utils.stripHexPrefix(input)
```


入力から0倍のプレフィックスを取り除いた結果を返します。

**注意** caver.klay.stripHexPrefix は **v1.0.1** からサポートされています。 この機能を使用するには、 [v1.0.1](https://www.npmjs.com/package/caver-js/v/1.0.1) 以上をインストールしてください。

**パラメータ**

| 名前    | タイプ | Description        |
| ----- | --- | ------------------ |
| input | 文字列 | 0xプレフィックスを削除する文字列。 |


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




## toBuffer <a href="#tobuffer" id="tobuffer"></a>



```javascript
caver.utils.toBuffer(input)
```


この関数は入力を [Buffer](https://nodejs.org/api/buffer.html) に変換します。 `toBuffer`を使用してオブジェクトをバッファに変換するには、オブジェクトは **toArray** 関数を実装する必要があります。 文字列型入力の場合、この関数は **0x 接頭辞の hex文字列** でのみ動作します。

**パラメータ**

| 名前    | タイプ       | Description                                                              |
| ----- | --------- | ------------------------------------------------------------------------ |
| input | Buffer \ | string \| number \| Array \| BN \| BigNumber \| object バッファに変換される値。 |


**注意** `BigNumber` 型は caver-js [v1.6.4](https://www.npmjs.com/package/caver-js/v/1.6.4) でサポートされています。

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


この関数は、数値を [Buffer](https://nodejs.org/api/buffer.html) に変換します。 [caver.utils.toBuffer](caver.utils.md#tobuffer) は入力が数値の場合、この関数と同じ動作をします。

**パラメータ**

| 名前    | タイプ    | Description                                 |
| ----- | ------ | ------------------------------------------- |
| input | 文字列 \ | number \| DN \| BigNumber | バッファに変換される数値。 |


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




## isValidHash <a href="#isvalidhash" id="isvalidhash"></a>



```javascript
caver.utils.isValidHash(input)
```


入力が 32 バイトのハッシュ形式の場合は `true` を返します。それ以外の場合は `false` を返します。

**パラメータ**

| 名前    | タイプ | Description                  |
| ----- | --- | ---------------------------- |
| input | 文字列 | 32バイトハッシュフォーマットであるかどうかを調べる値。 |


**戻り値**

| タイプ     | Description                               |
| ------- | ----------------------------------------- |
| boolean | `true` は入力が 32 バイトハッシュのフォーマットであることを意味します。 |


**例**



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


入力が 0x 接頭辞の 32 バイトハッシュフォーマットの場合は `true` を返します。それ以外の場合は、 `false` を返します。 この関数は入力のみを見て、0x 接頭辞の 32 バイトハッシュの形式であるかどうかを決定します。 [caver.utils.isValidHash](caver.utils.md#isvalidhash) との違いは、HEXに `0x`の接頭辞があることを期待することです。

**パラメータ**

| 名前    | タイプ | Description                          |
| ----- | --- | ------------------------------------ |
| input | 文字列 | 0x 接頭辞付きの 32 バイトハッシュの形式であるかどうかを調べる値。 |


**戻り値**

| タイプ     | Description                                    |
| ------- | ---------------------------------------------- |
| boolean | `true` は、入力が 0x 接頭辞の 32 バイトハッシュの形式であることを意味します。 |


**例**



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


入力がトランザクションハッシュ形式の場合は `true` を返します。それ以外の場合は `false` を返します。 この関数は、入力のみを見て、トランザクションハッシュの形式であるかどうかを決定します。

**注意** この関数は廃止されています。 有効なハッシュが 32 バイトの長さであるかどうかを判断するには、 [isValidHash](caver.utils.md#isvalidhash) を使用します。

**パラメータ**

| 名前    | タイプ | Description                         |
| ----- | --- | ----------------------------------- |
| input | 文字列 | パラメータがトランザクションハッシュの形式であるかどうかを決定する値。 |


**戻り値**

| タイプ     | Description                             |
| ------- | --------------------------------------- |
| boolean | `true` は、入力がトランザクションハッシュの形式であることを意味します。 |


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




## isTxHashStrict <a href="#istxhashstrict" id="istxhashstrict"></a>



```javascript
caver.utils.isTxHashStrict(input)
```


入力がトランザクションハッシュ形式の場合は `true` を返します。それ以外の場合は `false` を返します。 この関数は、入力のみを見て、トランザクションハッシュの形式であるかどうかを決定します。 [caver.utils.isTxHash](caver.utils.md#istxhash) との違いは、HEX に `0x` の接頭辞が与えられることを期待することです。

**注意** この関数は廃止されています。 有効なハッシュが 32 バイトの長さであるかどうかを判断するには、 [isValidHashStrict](caver.utils.md#isvalidhashstrict) を使用してください。

**パラメータ**

| 名前    | タイプ | Description                         |
| ----- | --- | ----------------------------------- |
| input | 文字列 | パラメータがトランザクションハッシュの形式であるかどうかを決定する値。 |


**戻り値**

| タイプ     | Description                             |
| ------- | --------------------------------------- |
| boolean | `true` は、入力がトランザクションハッシュの形式であることを意味します。 |


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




## isValidPrivateKey <a href="#isvalidprivatekey" id="isvalidprivatekey"></a>



```javascript
caver.utils.isValidPrivateKey(privateKey)
```


`true` `privateKey` が有効な場合、それ以外の場合は `false` を返します。

**パラメータ**

| 名前         | タイプ | Description  |
| ---------- | --- | ------------ |
| privateKey | 文字列 | 検証する秘密キー文字列。 |


**戻り値**

| タイプ     | Description                         |
| ------- | ----------------------------------- |
| boolean | `true` は、privateKey が有効であることを意味します。 |


**例**



```javascript
> caver.utils.isValidPrivateKey('0x{private key}')
true

> caver.utils.isValidPrivateKey('{private key}')
true

> caver.utils.isValidPrivateKey('a5b0cd8c87e77879d64ccc064ee239ed6f71cacf9')
false
```




## isValidPublicKey <a href="#isvalidpublickey" id="isvalidpublickey"></a>



```javascript
caver.utils.isValidPublicKey(publicKey)
```


publicKey が有効な場合は `true` を返します。それ以外の場合は `false` を返します。

**パラメータ**

| 名前   | タイプ | Description |
| ---- | --- | ----------- |
| 公開キー | 文字列 | 検証する公開鍵文字列。 |


**戻り値**

| タイプ     | Description                |
| ------- | -------------------------- |
| boolean | `true` は公開鍵が有効であることを意味します。 |


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




## isValidRole <a href="#isvalidrole" id="isvalidrole"></a>



```javascript
caver.utils.isValidRole(role)
```


ロールが有効な場合は `true` を返します。それ以外の場合は `false` を返します。 `caver.wallet.keyring.role` を通じて、caver-js でサポートされているロールを確認できます。

**パラメータ**

| 名前  | タイプ | Description |
| --- | --- | ----------- |
| ロール | 文字列 | 検証するロール文字列。 |


**戻り値**

| タイプ     | Description                 |
| ------- | --------------------------- |
| boolean | `true` は、ロールが有効であることを意味します。 |


**例**



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


ブロック番号(またはブロックタグ文字列)を検証します。

ブロック番号は以下のいずれかのタイプにする必要があります:

* 定義済みブロック番号 ex:) 'latest', 'firmest', 'pending', 'genesis'
* 16進法
* 有限数

**パラメータ**

| 名前          | タイプ    | Description                                                                                                                   |
| ----------- | ------ | ----------------------------------------------------------------------------------------------------------------------------- |
| blockNumber | 文字列 \ | number | 検証するブロック番号。 This can be block number in number type or block tag(`latest`, `pending`, `earliest`, `genesis`) string. |


**戻り値**

| タイプ     | Description                          |
| ------- | ------------------------------------ |
| boolean | `true` は blockNumber が有効であることを意味します。 |


**例**



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


パラメータがあらかじめ定義されているブロックタグの場合、 `true` を返します。

**パラメータ**

| 名前              | タイプ | Description |
| --------------- | --- | ----------- |
| predefinedBlock | 文字列 | 事前定義されたブロック |


**戻り値**

| タイプ     | Description                                         |
| ------- | --------------------------------------------------- |
| boolean | `true` は、predefinedBlock が有効な定義済みブロックタグであることを意味します。 |


**例**



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


Returns `true` if sig is in the format of empty signature (`SignatureData { _v: '0x01', _r: '0x', _s: '0x' }` or `[SignatureData { _v: '0x01', _r: '0x', _s: '0x' }]`), otherwise it returns `false`.

caver-jsでは、署名またはfeePayerSignaturesが空の場合、空の署名を表す値 `[SignatureData { _v: '0x01', _r: '0x', _s: '0x' }]`がプロパティに対して返されます。 この関数は、与えられた署名が `[SignatureData { _v: '0x01', _r: '0x', _s: '0x' }]` (または 'LEGACY' トランザクションの `SignatureData { _v: '0x01', _r: '0x', _s: '0x' }` ) であるかどうかを確認するために使用されます。

**パラメータ**

| 名前  | タイプ       | Description                                                                                                                            |
| --- | --------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| sig | オブジェクト \ | Array | [SignatureData](caver.wallet/keyring.md#signaturedata) のインスタンス、または [SignatureData](caver.wallet/keyring.md#signaturedata) の配列。 |


**戻り値**

| タイプ     | Description              |
| ------- | ------------------------ |
| boolean | `true` はシグが空であることを意味します。 |


**例**



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


key が `KlaytnWalletKey` フォーマットの場合は [true](../../../../klaytn/design/accounts.md#klaytn-wallet-key-format) を返します。それ以外の場合は `false` を返します。

**パラメータ**

| 名前 | タイプ | Description                          |
| -- | --- | ------------------------------------ |
| キー | 文字列 | KlaytnWalletKeyの形式でチェックするかどうかのキー文字列。 |


**戻り値**

| タイプ     | Description                                                                                                       |
| ------- | ----------------------------------------------------------------------------------------------------------------- |
| boolean | `true` means the key is `0x{private key}0x{type}0x{address in hex}` or `{private key}0x{type}0x{address in hex}`. |


**例**



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


バッファを 0x プレフィックスの 16 進文字列に変換します。

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




## parseKlaytnWalletKey <a href="#parseklaytnwalletkey" id="parseklaytnwalletkey"></a>



```javascript
caver.utils.parseKlaytnWalletKey(key)
```


[KlaytnWalletKey](../../../../klaytn/design/accounts.md#klaytn-wallet-key-format) 文字列を「秘密キー」、「タイプ」、「アドレス」を含む配列に解析します。

**パラメータ**

| 名前 | タイプ | Description                                                                            |
| -- | --- | -------------------------------------------------------------------------------------- |
| キー | 文字列 | [KlaytnWalletKey](../../../../klaytn/design/accounts.md#klaytn-wallet-key-format) 文字列。 |


**戻り値**

| タイプ | Description            |
| --- | ---------------------- |
| 行列  | パースされたKlaytnWalletKey。 |


**例**



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


ハッシュメッセージ with Klaytn specific prefix: `keccak256("\x19Klaytn Signed Message:\n" + len(message) + message))`

**パラメータ**

| 名前      | タイプ | Description                                |
| ------- | --- | ------------------------------------------ |
| message | 文字列 | ハッシュへのメッセージ。 HEX文字列であれば、UTF-8が最初にデコードされます。 |


**戻り値**

| タイプ | Description                     |
| --- | ------------------------------- |
| 文字列 | Klaytnの特定のプレフィックスでハッシュされたメッセージ。 |


**例**



```javascript
> caver.utils.hashMessage('Hello')
'0x640bfab59b6e27468abd367888f4ab1a1c77aa2b45e76a1d3adcbd039c305917'
```




## 回復 <a href="#recover" id="recover"></a>



```javascript
caver.utils.recover(message, isHashed])
```


指定したデータに署名するために使用された Klaytn アドレスを回復します。

**パラメータ**

| 名前       | タイプ       | Description                                                                                                                                                                                                                          |
| -------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| message  | 文字列       | メッセージまたはハッシュされたメッセージのいずれか。                                                                                                                                                                                                           |
| 署名       | オブジェクト \ | Array | [SignatureData](caver.wallet/keyring.md#signaturedata) のインスタンス。                                                                                                                                                              |
| isHashed | boolean   | (optional, default: `false`) If the last parameter is `true`, the given `message` will NOT automatically be prefixed with `"\x19Klaytn Signed Message:\n" + message.length + message`, and will be assumed to be already prefixed. |


**戻り値**

| タイプ | Description                     |
| --- | ------------------------------- |
| 文字列 | このデータに署名するために使用される Klaytn アドレス。 |


**例**



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


指定したデータに署名するために使用された公開鍵を回復します。

**注意** `caver.utils.recoverPublicKey` は caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3) からサポートされています。

**パラメータ**

| 名前       | タイプ       | Description                                                                                                                                                     |
| -------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| message  | 文字列       | メッセージまたはハッシュされたメッセージのいずれか。                                                                                                                                      |
| 署名       | オブジェクト \ | Array | [SignatureData](caver.wallet/keyring.md#signaturedata) のインスタンス。                                                                                         |
| isHashed | boolean   | (optional, default: `false`) Whether the message passed as a parameter is hashed with the prefix `"\x19Klaytn Signed Message:\n" + message.length + message`. |


**戻り値**

| タイプ | Description            |
| --- | ---------------------- |
| 文字列 | このデータに署名するために使用される公開鍵。 |


**例**



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




## public KeyToAddress <a href="#publickeytoaddress" id="publickeytoaddress"></a>



```javascript
caver.utils.publicKeyToAddress('0x{public key}')
```


公開鍵から派生したアドレスを返します。 この関数は、公開鍵文字列をハッシュ化することによってアドレス形式に変換するだけです。 Klaytnの実際のアカウントとは何の関係もありません。

**注意** `caver.utils.publicKeyToAddress` は caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3) 以降サポートされています。

**パラメータ**

| 名前   | タイプ | Description      |
| ---- | --- | ---------------- |
| 公開キー | 文字列 | アドレスを取得する公開鍵文字列。 |


**戻り値**

| タイプ | Description       |
| --- | ----------------- |
| 文字列 | 公開鍵から派生したアドレス文字列。 |


**例**



```javascript
> caver.utils.publicKeyToAddress('0xb5df4d5e6b4ee7a136460b911a69030fdd42c18ed067bcc2e25eda1b851314fad994c5fe946aad01ca2e348d4ff3094960661a8bc095f358538af54aeea48ff3')
'0xA84A1CE657e9d5b383cECE6f4bA365e23Fa234Dd'
```




## compressPublicKey <a href="#compresspublickkey" id="compresspublickkey"></a>



```javascript
caver.utils.compressPublicKey(uncompressedPublicKey)
```


非圧縮公開鍵を圧縮します。

**パラメータ**

| 名前                    | タイプ | Description |
| --------------------- | --- | ----------- |
| uncompressedPublicKey | 文字列 | 非圧縮公開鍵。     |


**戻り値**

| タイプ | Description |
| --- | ----------- |
| 文字列 | 圧縮された公開鍵。   |


**例**



```javascript
> caver.utils.compressPublicKey('0x62cef87819b82f62e9c0a38c1fa7dfa089084959df86aca19ff2f6c903db2248b45dc23220ee6bcd8753b9df8ce7d58e56eabebb14479f3a0ca5cccd4bdea632')
'0x0262cef87819b82f62e9c0a38c1fa7dfa089084959df86aca19ff2f6c903db2248'
```




## DecompressPublicKey <a href="#decompresspublickkey" id="decompresspublickkey"></a>



```javascript
caver.utils.decompressPublicKey(compressedPublicKey)
```


圧縮された公開鍵を解凍します。

**パラメータ**

| 名前                  | タイプ | Description |
| ------------------- | --- | ----------- |
| compressedPublicKey | 文字列 | 圧縮された公開鍵。   |


**戻り値**

| タイプ | Description |
| --- | ----------- |
| 文字列 | 非圧縮公開鍵。     |


**例**



```javascript
> caver.utils.decompressPublicKey('0x0262cef87819b82f62e9c0a38c1fa7dfa089084959df86aca19ff2f6c903db2248')
'0x62cef87819b82f62e9c0a38c1fa7dfa089084959df86aca19ff2f6c903db2248b45dc23220ee6bc8753b9df8ce7d58e56eabebb14479f3a0ca5ccccd4bdea632'
```




## isCompressedPublicKey <a href="#iscompressedpublickey" id="iscompressedpublickey"></a>



```javascript
caver.utils.isCompressedPublicKey(publicKey)
```


公開鍵が圧縮されている場合は `true` を返します。それ以外の場合は `false` を返します。

**パラメータ**

| 名前   | タイプ | Description |
| ---- | --- | ----------- |
| 公開キー | 文字列 | 公開鍵。        |


**戻り値**

| タイプ     | Description      |
| ------- | ---------------- |
| boolean | `true` は圧縮を意味する。 |


**例**



```javascript
> caver.utils.isCompressedPublicKey('0x0262cef87819b82f62e9c0a38c1fa7dfa089084959df86aca19ff2f6c903db2248')
true
```




## decode署名 <a href="#decodesignature" id="decodesignature"></a>



```javascript
caver.utils.decodeSignature('0x{signature}')
```


'R(32 byte) + S(32 byte) + V(1byte)' で構成された生の署名データをデコードします。

**注意** `caver.utils.decodeSignature` は caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3) からサポートされている。

**パラメータ**

| 名前 | タイプ | Description                                           |
| -- | --- | ----------------------------------------------------- |
| 署名 | 文字列 | デコードする署名文字列。 R(32バイト) + S(32バイト) + V(1バイト) で構成されています。 |


**戻り値**

| タイプ    | Description                                 |
| ------ | ------------------------------------------- |
| object | `SignatureData` インスタンス。 `v`, `r` と `s` を含む。 |


**例**



```javascript
> caver.utils.decodeSignature('0xc69018da9396c4b87947e0784625af7475caf46e2af9cf57a44673ff0f625258642d8993751ae67271bcc131aa065adccf9f16fc4953f9c48f4a80d675c09ae81b')
SignatureData {
  _v: '0x1b',
  _r: '0xc69018da9396c4b87947e0784625af7475caf46e2af9cf57a44673ff0f625258',
  _s: '0x642d8993751ae67271bcc131aa065adccf9f16fc4953f9c48f4a80d675c09ae8'
}
```
