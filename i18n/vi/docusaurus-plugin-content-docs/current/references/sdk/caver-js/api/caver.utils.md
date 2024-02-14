---
description: "description: caver-js utility APIs."
---

# caver.utils

`caver.utils` cung cấp các chức năng tiện ích.

## randomHex <a href="#randomhex" id="randomhex"></a>

```javascript
caver.utils.randomHex(size)
```

Thư viện [randomHex](https://github.com/frozeman/randomHex) để tạo các chuỗi số HEX giả ngẫu nhiên được mã hóa mạnh mẽ từ một kích thước byte nhất định.

**Tham số**

| Tên  | type | Mô tả                                                                                                           |
| ---- | ---- | --------------------------------------------------------------------------------------------------------------- |
| size | số   | Kích thước byte cho chuỗi số HEX, _ví dụ:_: `32` sẽ dẫn đến chuỗi số HEX 32 byte có 64 ký tự bắt đầu bằng "0x". |

**Giá trị trả về**

| type  | Mô tả                             |
| ----- | --------------------------------- |
| chuỗi | Chuỗi số HEX ngẫu nhiên được tạo. |

**Ví dụ**

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

## _ <a href="#_" id="_"></a>

```javascript
caver.utils._()
```

Thư viện [underscore](http://underscorejs.org) dành cho nhiều hàm JavaScript thuận tiện.

Xem [tham chiếu API underscore](http://underscorejs.org) để biết chi tiết.

**Ví dụ**

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

Chuyển đổi một cách an toàn mọi giá trị đã cho (bao gồm đối tượng [BigNumber.js](http://mikemcl.github.io/bignumber.js/)) thành [BN.js](https://github.com/indutny/bn.js/) để xử lý các số lớn trong JavaScript.

**Tham số**

| Tên    | type        | Mô tả                              |
| ------ | ----------- | ---------------------------------- |
| number | chuỗi \| số | số để chuyển đổi thành một số lớn. |

**Giá trị trả về**

| Loại     | Mô tả                                                 |
| --------- | ----------------------------------------------------- |
| Đối tượng | Phiên bản [BN.js](https://github.com/indutny/bn.js/). |

**Ví dụ**

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

Kiểm tra xem một giá trị đã cho có phải là phiên bản [BN.js](https://github.com/indutny/bn.js/) hay không.

**Tham số**

| Tên | Loại     | Mô tả                                                     |
| --- | --------- | --------------------------------------------------------- |
| bn  | đối tượng | Một phiên bản [BN.js](https://github.com/indutny/bn.js/). |

**Giá trị trả về**

| Loại   | Mô tả                                                                              |
| ------- | ---------------------------------------------------------------------------------- |
| boolean | `true` nếu giá trị đã cho là phiên bản [BN.js](https://github.com/indutny/bn.js/). |

**Ví dụ**

```javascript
> var number = new caver.utils.BN(10)
> caver.utils.isBN(number)
true
```

## isBigNumber <a href="#isbignumber" id="isbignumber"></a>

```javascript
caver.utils.isBigNumber(bignumber)
```

Kiểm tra xem một giá trị đã cho có phải là phiên bản [BigNumber.js](http://mikemcl.github.io/bignumber.js/) hay không..

**Tham số**

| Tên       | Loại     | Mô tả                                                                 |
| --------- | --------- | --------------------------------------------------------------------- |
| bignumber | đối tượng | Một phiên bản [BigNumber.js](http://mikemcl.github.io/bignumber.js/). |

**Giá trị trả về**

| Loại   | Mô tả                                                  |
| ------- | ------------------------------------------------------ |
| boolean | `true` nếu giá trị đã cho là đối tượng `BigNumber.js`. |

**Ví dụ**

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

Tính toán sha3 của giá trị đầu vào.

**LƯU Ý**: Để bắt chước hành vi sha3 của việc sử dụng Solidity [caver.utils.soliditySha3](#soliditysha3).

**Tham số**

| Tên | Loại | Mô tả                    |
| --- | ----- | ------------------------ |
| str | chuỗi | Một chuỗi thành hàm băm. |

**Giá trị trả về**

| Loại | Mô tả            |
| ----- | ---------------- |
| chuỗi | Hàm băm kết quả. |

**Ví dụ**

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

Tính toán sha3 của các tham số đầu vào đã cho theo cách tương tự như solidity. Điều này có nghĩa các đối số sẽ được chuyển đổi thành ABI và đóng gói chặt chẽ trước khi đưa vào hàm băm.

**Tham số**

| Tên    | Loại   | Mô tả                                                                                                                                                                                                                                                                                           |
| ------ | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| paramX | Hỗn hợp | <p>Bất kỳ loại hoặc đối tượng nào có <code>`{type: 'uint', value: '123456'}`</code> hoặc <code>`{t: 'bytes', v: '0xfff456'}`</code>. Các loại cơ bản được tự động phát hiện như sau:<br/>- <code>string</code> chuỗi UTF-8 không phải là số được hiểu là <code>string</code>.<br/>- `string</p> |

**Giá trị trả về**

| Loại | Mô tả            |
| ----- | ---------------- |
| chuỗi | Hàm băm kết quả. |

**Ví dụ**

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

Kiểm tra xem một chuỗi đã cho có phải là chuỗi số HEX hay không.

**Tham số**

| Tên | Loại | Mô tả                |
| --- | ----- | -------------------- |
| hex | chuỗi | Chuỗi số HEX đã cho. |

**Giá trị trả về**

| Loại   | Mô tả                                      |
| ------- | ------------------------------------------ |
| boolean | `true` nếu tham số đã cho là chuỗi số HEX. |

**Ví dụ**

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

Kiểm tra xem một chuỗi đã cho có phải là chuỗi số HEX hay không. Sự khác biệt đối với [caver.utils.isHex](#ishex) là nó cho là HEX có tiền tố là `0x`.

**Tham số**

| Tên | Loại | Mô tả                |
| --- | ----- | -------------------- |
| hex | chuỗi | Chuỗi số HEX đã cho. |

**Giá trị trả về**

| Loại   | Mô tả                                            |
| ------- | ------------------------------------------------ |
| boolean | `true` nếu một chuỗi đã cho là một chuỗi số HEX. |

**Ví dụ**

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

Kiểm tra xem chuỗi đã cho có phải là địa chỉ Klaytn hợp lệ hay không. Nó cũng sẽ kiểm tra giá trị tổng kiểm nếu địa chỉ có chữ hoa và chữ thường.

**Tham số**

| Tên     | type  | Mô tả              |
| ------- | ----- | ------------------ |
| address | chuỗi | Một chuỗi địa chỉ. |

**Giá trị trả về**

| Loại   | Mô tả                                             |
| ------- | ------------------------------------------------- |
| boolean | `true` nếu chuỗi đã cho là địa chỉ Klaytn hợp lệ. |

**Ví dụ**

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

Chuyển đổi địa chỉ Klaytn viết hoa hoặc viết thường thành địa chỉ giá trị tổng kiểm.

**Tham số**

| Tên     | Loại | Mô tả              |
| ------- | ----- | ------------------ |
| address | chuỗi | Một chuỗi địa chỉ. |

**Giá trị trả về**

| Loại | Mô tả                      |
| ----- | -------------------------- |
| chuỗi | Địa chỉ giá trị tổng kiểm. |

**Ví dụ**

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

Kiểm tra giá trị tổng kiểm của một địa chỉ đã cho. Trả về `false` trên các địa chỉ không phải là giá trị tổng kiểm.

**Tham số**

| Tên     | Loại | Mô tả              |
| ------- | ----- | ------------------ |
| address | chuỗi | Một chuỗi địa chỉ. |

**Giá trị trả về**

| type    | Mô tả                                                                                                                                        |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| boolean | `true` khi giá trị tổng kiểm của địa chỉ hợp lệ, `false` nếu đó không phải là địa chỉ giá trị tổng kiểm hoặc giá trị tổng kiểm không hợp lệ. |

**Ví dụ**

```javascript
> caver.utils.checkAddressChecksum('0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d')
true
```

## toHex <a href="#tohex" id="tohex"></a>

```javascript
caver.utils.toHex(mixed)
```

Chuyển đổi giá trị đã cho bất kỳ thành HEX. Các chuỗi số sẽ được hiểu là số. Chuỗi văn bản sẽ được hiểu là chuỗi UTF-8.

**Tham số**

| Tên   | Loại                          | Mô tả                           |
| ----- | ------------------------------ | ------------------------------- |
| mixed | chuỗi \| số \| BN \| BigNumber | Đầu vào để chuyển đổi sang HEX. |

**Giá trị trả về**

| Loại | Mô tả                 |
| ----- | --------------------- |
| chuỗi | Chuỗi số HEX kết quả. |

**Ví dụ**

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

Trả về biểu diễn số của một giá trị HEX nhất định dưới dạng chuỗi.

**Tham số**

| Tên       | type  | Mô tả                             |
| --------- | ----- | --------------------------------- |
| hexstring | chuỗi | Một chuỗi số HEX được chuyển đổi. |

**Giá trị trả về**

| Loại | Mô tả               |
| ----- | ------------------- |
| chuỗi | Số dưới dạng chuỗi. |

**Ví dụ**

```javascript
> caver.utils.hexToNumberString('0xea')
"234"
```

## hexToNumber <a href="#hextonumber" id="hextonumber"></a>

```javascript
caver.utils.hexToNumber(hex)
```

Trả về biểu diễn số của một giá trị HEX đã cho.

**LƯU Ý**: Hàm này không hiệu quả với các số lớn, thay vào đó hãy sử dụng [caver.utils.toBN](#tobn).

**Tham số**

| Tên       | Loại | Mô tả                             |
| --------- | ----- | --------------------------------- |
| hexstring | chuỗi | Một chuỗi số HEX được chuyển đổi. |

**Giá trị trả về**

| Loại | Mô tả                                    |
| ----- | ---------------------------------------- |
| số    | Biểu diễn số của một giá trị HEX đã cho. |

**Ví dụ**

```javascript
> caver.utils.hexToNumber('0xea')
234
```

## numberToHex <a href="#numbertohex" id="numbertohex"></a>

```javascript
caver.utils.numberToHex(number)
```

Trả về biểu diễn HEX của một giá trị số đã cho.

**Tham số**

| Tên    | Loại                          | Mô tả                           |
| ------ | ------------------------------ | ------------------------------- |
| number | chuỗi \| số \| BN \| BigNumber | Một số dưới dạng chuỗi hoặc số. |

**Giá trị trả về**

| Loại | Mô tả                      |
| ----- | -------------------------- |
| chuỗi | Giá trị HEX của số đã cho. |

**Ví dụ**

```javascript
> caver.utils.numberToHex('234')
'0xea'
```

## hexToUtf8 <a href="#hextoutf8" id="hextoutf8"></a>

```javascript
caver.utils.hexToUtf8(hex)
caver.utils.hexToString(hex) // ALIAS
```

Trả về biểu diễn chuỗi UTF-8 của một giá trị HEX đã cho.

**Tham số**

| Tên | Loại | Mô tả                                         |
| --- | ----- | --------------------------------------------- |
| hex | chuỗi | Chuỗi số HEX để chuyển đổi thành chuỗi UTF-8. |

**Giá trị trả về**

| Loại | Mô tả        |
| ----- | ------------ |
| chuỗi | Chuỗi UTF-8. |

**Ví dụ**

```javascript
> caver.utils.hexToUtf8('0x49206861766520313030e282ac')
'I have 100€'
```

## hexToAscii <a href="#hextoascii" id="hextoascii"></a>

```javascript
caver.utils.hexToAscii(hex)
```

Trả về biểu diễn chuỗi ASCII của một giá trị HEX đã cho.

**Tham số**

| Tên | Loại | Mô tả                                                 |
| --- | ----- | ----------------------------------------------------- |
| hex | chuỗi | Một chuỗi số HEX để chuyển đổi thành một chuỗi ASCII. |

**Giá trị trả về**

| Loại | Mô tả        |
| ----- | ------------ |
| chuỗi | Chuỗi ASCII. |

**Ví dụ**

```javascript
> caver.utils.hexToAscii('0x4920686176652031303021')
'I have 100!'
```

## utf8ToHex <a href="#utf8tohex" id="utf8tohex"></a>

```javascript
caver.utils.utf8ToHex(str)
caver.utils.stringToHex(str) // ALIAS
```

Trả về biểu diễn HEX của một chuỗi UTF-8 đã cho.

**Tham số**

| Tên | Loại | Mô tả                                         |
| --- | ----- | --------------------------------------------- |
| str | chuỗi | Chuỗi UTF-8 để chuyển đổi thành chuỗi số HEX. |

**Giá trị trả về**

| Loại | Mô tả         |
| ----- | ------------- |
| chuỗi | Chuỗi số HEX. |

**Ví dụ**

```javascript
> caver.utils.utf8ToHex('I have 100€')
'0x49206861766520313030e282ac'
```

## asciiToHex <a href="#asciitohex" id="asciitohex"></a>

```javascript
caver.utils.asciiToHex(str)
```

Trả về biểu diễn HEX của một chuỗi ASCII đã cho.

**Tham số**

| Tên | Loại | Mô tả                                             |
| --- | ----- | ------------------------------------------------- |
| str | chuỗi | Một chuỗi ASCII để chuyển đổi thành chuỗi số HEX. |

**Giá trị trả về**

| type  | Mô tả         |
| ----- | ------------- |
| chuỗi | Chuỗi số HEX. |

**Ví dụ**

```javascript
> caver.utils.asciiToHex('I have 100!')
'0x4920686176652031303021'
```

## hexToBytes <a href="#hextobytes" id="hextobytes"></a>

```javascript
caver.utils.hexToBytes(hex)
```

Trả về một mảng byte từ chuỗi số HEX đã cho.

**Tham số**

| Tên | Loại | Mô tả                             |
| --- | ----- | --------------------------------- |
| hex | chuỗi | Một chuỗi số HEX được chuyển đổi. |

**Giá trị trả về**

| Loại | Mô tả      |
| ----- | ---------- |
| Mảng  | Mảng byte. |

**Ví dụ**

```javascript
> caver.utils.hexToBytes('0x000000ea')
[ 0, 0, 0, 234 ]
```

## bytesToHex <a href="#bytestohex" id="bytestohex"></a>

```javascript
caver.utils.bytesToHex(byteArray)
```

Trả về một chuỗi số HEX từ một mảng byte.

**Tham số**

| Tên       | type | Mô tả                        |
| --------- | ---- | ---------------------------- |
| byteArray | Mảng | Một mảng byte để chuyển đổi. |

**Giá trị trả về**

| type  | Mô tả         |
| ----- | ------------- |
| chuỗi | Chuỗi số HEX. |

**Ví dụ**

```javascript
> caver.utils.bytesToHex([ 72, 101, 108, 108, 111, 33, 36 ])
'0x48656c6c6f2124'
```

## convertToPeb <a href="#topeb" id="topeb"></a>

```javascript
caver.utils.convertToPeb(number [, unit])
```

Chuyển đổi giá trị KLAY bất kỳ thành peb.

**LƯU Ý**: "peb" là đơn vị KLAY nhỏ nhất và bạn phải luôn sử dụng "peb" làm đơn vị của KLAY. Chỉ chuyển đổi thành "KLAY" phục vụ mục đích hiển thị.

**Tham số**

| Tên    | Loại             | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------ | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| number | chuỗi \| số \| BN | Giá trị.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| đơn vị | chuỗi             | <p>(tùy chọn, mặc định là <code>"KLAY"</code>) Đơn vị KLAY để chuyển đổi. <code>number</code> sẽ được nhân với một trong các hệ số sau cho đơn vị được cung cấp:<br/>- <code>peb</code>: '1'<br/>- <code>kpeb</code>: '1000'<br/>- <code>Mpeb</code>: '1000000'<br/>- <code>Gpeb</code>: '1000000000'<br/>- <code>Ston</code>: '1000000000'<br/>- <code>uKLAY</code>: '1000000000000'<br/>- <code>mKLAY</code>: '1000000000000000'<br/>- <code>KLAY</code>: '1000000000000000000'<br/>- <code>kKLAY</code>: '1000000000000000000000'<br/>- <code>MKLAY</code>: '1000000000000000000000000'<br/>- <code>GKLAY</code>: '1000000000000000000000000000'<br/></p> |

**Giá trị trả về**

| Loại       | Mô tả                                                                                                                                      |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| chuỗi \| BN | Nếu tham số số là một đối tượng [BN](https://github.com/indutny/bn.js/) thì nó trả về một đối tượng BN, nếu không thì sẽ trả về một chuỗi. |

**Ví dụ**

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

**LƯU Ý**: "peb" là đơn vị KLAY nhỏ nhất và bạn phải luôn sử dụng "peb" làm đơn vị của KLAY. Chỉ chuyển đổi thành "KLAY" phục vụ mục đích hiển thị.

**Tham số**

| Tên    | Loại                          | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------ | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| number | chuỗi \| số \| BN \| BigNumber | Giá trị tính bằng peb.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| đơn vị | chuỗi                          | <p>(tùy chọn, mặc định là <code>"KLAY"</code>) Đơn vị KLAY để chuyển đổi "peb" của bạn thành. <code>number</code> sẽ được chia cho một trong các mẫu số sau cho đơn vị được cung cấp:<br/>- <code>peb</code>: '1'<br/>- <code>kpeb</code>: '1000'<br/>- <code>Mpeb</code>: '1000000'<br/>- <code>Gpeb</code>: '1000000000'<br/>- <code>Ston</code>: '1000000000'<br/>- <code>uKLAY</code>: '1000000000000'<br/>- <code>mKLAY</code>: '1000000000000000'<br/>- <code>KLAY</code>: '1000000000000000000'<br/>- <code>kKLAY</code>: '1000000000000000000000'<br/>- <code>MKLAY</code>: '1000000000000000000000000'<br/>- <code>GKLAY</code>: '1000000000000000000000000000'<br/></p> |

**Giá trị trả về**

| Loại | Mô tả     |
| ----- | --------- |
| chuỗi | Số chuỗi. |

**Ví dụ**

```javascript
> caver.utils.convertFromPeb('1', 'KLAY')
'0.000000000000000001'
```

## unitMap <a href="#unitmap" id="unitmap"></a>

```javascript
caver.utils.unitMap
```

Hiển thị tất cả các giá trị KLAY có thể có và số lượng của chúng tính bằng peb.

**Giá trị trả về**

| Loại     | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Đối tượng | <p>Với các thuộc tính sau:<br/>- <code>peb</code>: '1'<br/>- <code>kpeb</code>: '1000'<br/>- <code>Mpeb</code>: '1000000'<br/>- <code>Gpeb</code>: '1000000000'<br/>- <code>Ston</code>: '1000000000'<br/>- <code>uKLAY</code>: '1000000000000'<br/>- <code>mKLAY</code>: '1000000000000000'<br/>- <code>KLAY</code>: '1000000000000000000'<br/>- <code>kKLAY</code>: '1000000000000000000000'<br/>- <code>MKLAY</code>: '1000000000000000000000000'<br/>- <code>GKLAY</code>: '1000000000000000000000000000'<br/>- <code>TKLAY</code>: '1000000000000000000000000000000'<br/></p> |

**Ví dụ**

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

Hiển thị tất cả các đơn vị KLAY.

**Giá trị trả về**

| Loại     | Mô tả                                                                                                                                                                                                               |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Đối tượng | Một đối tượng trong đó các đơn vị của KLAY được sử dụng trong Klaytn được xác định. Mỗi đơn vị có tên và pebFactor riêng. pebFactor được sử dụng khi chuyển đổi KLAY hiện được chuyển trong mỗi đơn vị thành 'peb'. |

**Ví dụ**

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

Thêm khoảng trống vào bên trái của một chuỗi. Hữu ích khi thêm phần đệm vào chuỗi số HEX.

**Tham số**

| Tên             | Loại | Mô tả                                                                     |
| --------------- | ----- | ------------------------------------------------------------------------- |
| string          | chuỗi | Chuỗi để thêm phần đệm vào bên trái.                                      |
| characterAmount | số    | Số lượng ký tự mà tổng chuỗi phải có.                                     |
| sign            | chuỗi | (tùy chọn) Dấu hiệu ký tự để sử dụng, mặc định là `0`. |

**Giá trị trả về**

| Loại | Mô tả      |
| ----- | ---------- |
| chuỗi | Chuỗi đệm. |

**Ví dụ**

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

Thêm khoảng trống vào bên phải của chuỗi, Hữu ích khi thêm phần đệm vào chuỗi số HEX.

**Tham số**

| Tên             | Loại | Mô tả                                                                     |
| --------------- | ----- | ------------------------------------------------------------------------- |
| str             | chuỗi | Chuỗi để thêm phần đệm vào bên phải.                                      |
| characterAmount | số    | Số lượng ký tự mà tổng chuỗi phải có.                                     |
| sign            | chuỗi | (tùy chọn) Dấu hiệu ký tự để sử dụng, mặc định là `0`. |

**Giá trị trả về**

| Loại | Mô tả      |
| ----- | ---------- |
| chuỗi | Chuỗi đệm. |

**Ví dụ**

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

Xóa số 0 đứng đầu khỏi chuỗi số hex có tiền tố 0x.

**Tham số**

| Tên       | Loại | Mô tả                    |
| --------- | ----- | ------------------------ |
| hexString | chuỗi | Một chuỗi số hex để cắt. |

**Giá trị trả về**

| Loại | Mô tả                                    |
| ----- | ---------------------------------------- |
| chuỗi | Một chuỗi số hex không có số 0 đứng đầu. |

**Ví dụ**

```javascript
> caver.utils.trimLeadingZero('0x000011')
0x11
```

## makeEven <a href="#makeeven" id="makeeven"></a>

```javascript
caver.utils.makeEven(hexString)
```

Trả về một chuỗi có độ dài chẵn.

**Tham số**

| Tên       | Loại | Mô tả                            |
| --------- | ----- | -------------------------------- |
| hexString | chuỗi | Một chuỗi số hex để tạo số chẵn. |

**Giá trị trả về**

| Loại | Mô tả                     |
| ----- | ------------------------- |
| chuỗi | Một chuỗi có độ dài chẵn. |

**Ví dụ**

```javascript
> caver.utils.makeEven('0x011')
0x0011
```

## toTwosComplement <a href="#totwoscomplement" id="totwoscomplement"></a>

```javascript
caver.utils.toTwosComplement(num)
```

Chuyển đổi một số âm thành phần bù hai.

**Tham số**

| Tên | Loại                    | Mô tả             |
| --- | ------------------------ | ----------------- |
| num | số \| chuỗi \| BigNumber | Số để chuyển đổi. |

**Giá trị trả về**

| Loại | Mô tả                       |
| ----- | --------------------------- |
| chuỗi | Chuỗi số hex đã chuyển đổi. |

**Ví dụ**

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

Trả về `true` nếu giao dịch đã cho là giao dịch triển khai hợp đồng thông minh. Trả về `false` nếu giao dịch không phải là giao dịch triển khai hợp đồng thông minh. Kết quả được xác định bởi giá trị của các tham số trong `transactionObject`. Đảm bảo tất cả các tham số bắt buộc được đặt chính xác.

**Tham số**

| Tên               | Loại     | Mô tả                                                                                                                      |
| ----------------- | --------- | -------------------------------------------------------------------------------------------------------------------------- |
| transactionObject | đối tượng | Đối tượng [Giao dịch](./caver-transaction/caver-transaction.md#class) để kiểm tra giao dịch triển khai hợp đồng hay không. |

**Giá trị trả về**

| Loại   | Mô tả                                                                             |
| ------- | --------------------------------------------------------------------------------- |
| boolean | `true` nghĩa là đối tượng giao dịch dùng cho việc triển khai hợp đồng thông minh. |

**Ví dụ**

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

Trả về tọa độ x và y của publicKey đã cho. Để biết thêm thông tin về mật mã khóa, xem [Mật mã đường cong Elliptic](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography).

**LƯU Ý** Hàm này không chứa bất kỳ logic nào để kiểm tra xem khóa công khai có hợp lệ hay không. Hàm chỉ chia publicKey đầu vào thành các điểm x và y theo độ dài. Để xác thực khóa công khai, vui lòng sử dụng [isValidPublicKey](#isvalidpublickey).

**Tham số**

| Tên       | Loại | Mô tả                          |
| --------- | ----- | ------------------------------ |
| publicKey | chuỗi | PublicKey để nhận điểm x và y. |

**Giá trị trả về**

| Loại | Mô tả                                                                         |
| ----- | ----------------------------------------------------------------------------- |
| Mảng  | Một mảng lưu trữ các điểm x và y. Chỉ mục 0 có điểm x và chỉ mục 1 có điểm y. |

**Ví dụ**

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

Trả về `true` nếu đầu vào là chuỗi số hex có tiền tố 0x, nếu không nó sẽ trả về `false`.

**Tham số**

| Tên  | Loại | Mô tả                                                                              |
| ---- | ----- | ---------------------------------------------------------------------------------- |
| nhập | chuỗi | Giá trị được xác định xem tham số có phải là chuỗi số hex có tiền tố 0x hay không. |

**Giá trị trả về**

| Loại   | Mô tả                                                  |
| ------- | ------------------------------------------------------ |
| boolean | `true` nghĩa là đầu vào là chuỗi số hex có tiền tố 0x. |

**Ví dụ**

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

Trả về một chuỗi số hex có tiền tố là 0x. Nếu đầu vào đã có tiền tố 0x hoặc một chuỗi không phải hex thì giá trị đầu vào được trả về nguyên trạng.

**Tham số**

| Tên  | Loại | Mô tả                           |
| ---- | ----- | ------------------------------- |
| nhập | chuỗi | giá trị chuỗi có tiền tố là 0x. |

**Giá trị trả về**

| Loại | Mô tả                                   |
| ----- | --------------------------------------- |
| chuỗi | Chuỗi hex có tiền tố 0x sẽ được trả về. |

**Ví dụ**

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

Trả về kết quả với tiền tố 0x bị loại bỏ khỏi đầu vào.

**LƯU Ý** caver.klay.stripHexPrefix được hỗ trợ từ phiên bản **v1.0.1**. Để sử dụng tính năng này, vui lòng cài đặt phiên bản [v1.0.1](https://www.npmjs.com/package/caver-js/v/1.0.1) trở lên.

**Tham số**

| Tên  | Loại | Mô tả                    |
| ---- | ----- | ------------------------ |
| nhập | chuỗi | chuỗi để xóa tiền tố 0x. |

**Giá trị trả về**

| Loại | Mô tả                                |
| ----- | ------------------------------------ |
| chuỗi | Một chuỗi bị loại bỏ 0x được trả về. |

**Ví dụ**

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

Hàm này chuyển đổi đầu vào thành [Bộ đệm](https://nodejs.org/api/buffer.html). Để chuyển đổi một đối tượng thành Bộ đệm bằng `toBuffer`, đối tượng đó phải triển khai hàm **toArray**. Đối với đầu vào loại chuỗi, hàm này chỉ hoạt động với **chuỗi hex có tiền tố 0x**.

**Tham số**

| Tên  | Loại                                                         | Mô tả                                 |
| ---- | ------------------------------------------------------------- | ------------------------------------- |
| nhập | Bộ đệm \| chuỗi \| số \| Mảng \| BN \| BigNumber \| đối tượng | Giá trị được chuyển đổi thành Bộ đệm. |

**LƯU Ý** Loại `BigNumber` được hỗ trợ kể từ caver-js phiên bản [v1.6.4](https://www.npmjs.com/package/caver-js/v/1.6.4).

**Giá trị trả về**

| Loại  | Mô tả                                                  |
| ------ | ------------------------------------------------------ |
| Bộ đệm | Giá trị được chuyển đổi thành loại Bộ đệm được trả về. |

**Ví dụ**

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

Hàm này chuyển đổi một số thành [Bộ đệm](https://nodejs.org/api/buffer.html). [caver.utils.toBuffer](#tobuffer) ó hành vi tương tự như hàm này khi đầu vào là một số.

**Tham số**

| Tên  | Loại                          | Mô tả                                |
| ---- | ------------------------------ | ------------------------------------ |
| nhập | chuỗi \| số \| BN \| BigNumber | Một số được chuyển đổi thành Bộ đệm. |

**Giá trị trả về**

| Loại  | Mô tả                                                  |
| ------ | ------------------------------------------------------ |
| Bộ đệm | Giá trị được chuyển đổi thành loại Bộ đệm được trả về. |

**Ví dụ**

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

Trả về `true` nếu đầu vào ở định dạng hàm băm 32 byte nếu không nó sẽ trả về `false`.

**Tham số**

| Tên  | Loại | Mô tả                                                                  |
| ---- | ----- | ---------------------------------------------------------------------- |
| nhập | chuỗi | Giá trị được kiểm tra xem nó có ở định dạng hàm băm 32 byte hay không. |

**Giá trị trả về**

| Loại   | Mô tả                                                   |
| ------- | ------------------------------------------------------- |
| boolean | `true` có nghĩa là đầu vào ở định dạng hàm băm 32 byte. |

**Ví dụ**

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

Trả về `true` nếu đầu vào ở định dạng hàm băm 32 byte có tiền tố 0x, nếu không nó sẽ trả về `false`. Hàm này chỉ xem xét đầu vào và xác định xem nó có ở định dạng hàm băm 32 byte có tiền tố 0x hay không. Sự khác biệt đối với [caver.utils.isValidHash](#isvalidhash) là nó cho là HEX có tiền tố là `0x`.

**Tham số**

| Tên  | Loại | Mô tả                                                                               |
| ---- | ----- | ----------------------------------------------------------------------------------- |
| nhập | chuỗi | Giá trị được xem xét xem nó có ở định dạng hàm băm 32 byte có tiền tố 0x hay không. |

**Giá trị trả về**

| Loại   | Mô tả                                                              |
| ------- | ------------------------------------------------------------------ |
| boolean | `true` nghĩa là đầu vào ở định dạng hàm băm 32 byte có tiền tố 0x. |

**Ví dụ**

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

Trả về `true` nếu đầu vào ở định dạng hàm băm giao dịch, nếu không nó sẽ trả về `false`. Hàm này chỉ xem xét đầu vào và xác định xem nó có ở định dạng hàm băm giao dịch hay không.

**LƯU Ý** Hàm này không được dùng nữa. Sử dụng [isValidHash](#isvalidhash) để xác định xemt hàm băm hợp lệ có dài 32 byte hay không.

**Tham số**

| Tên  | Loại | Mô tả                                                                         |
| ---- | ----- | ----------------------------------------------------------------------------- |
| nhập | chuỗi | Giá trị được xác định xem tham số có ở định dạng hàm băm giao dịch hay không. |

**Giá trị trả về**

| Loại   | Mô tả                                                  |
| ------- | ------------------------------------------------------ |
| boolean | `true` nghĩa là đầu vào ở định dạng hàm băm giao dịch. |

**Ví dụ**

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

Trả về `true` nếu đầu vào ở định dạng hàm băm giao dịch, nếu không nó sẽ trả về `false`. Hàm này chỉ xem xét đầu vào và xác định xem nó có ở định dạng hàm băm giao dịch hay không. Sự khác biệt đối với [caver.utils.isTxHash](#istxhash) là nó cho là HEX có tiền tố là `0x`.

**LƯU Ý** Hàm này không được dùng nữa. Sử dụng [isValidHashStrict](#isvalidhashstrict) để xác định xem một hàm băm hợp lệ có dài 32 byte hay không.

**Tham số**

| Tên  | Loại | Mô tả                                                                         |
| ---- | ----- | ----------------------------------------------------------------------------- |
| nhập | chuỗi | Giá trị được xác định xem tham số có ở định dạng hàm băm giao dịch hay không. |

**Giá trị trả về**

| Loại   | Mô tả                                                  |
| ------- | ------------------------------------------------------ |
| boolean | `true` nghĩa là đầu vào ở định dạng hàm băm giao dịch. |

**Ví dụ**

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

Trả về `true` nếu `privateKey` hợp lệ, nếu không nó sẽ trả về `false`.

**Tham số**

| Tên        | Loại | Mô tả                         |
| ---------- | ----- | ----------------------------- |
| privateKey | chuỗi | Chuỗi khóa riêng để xác thực. |

**Giá trị trả về**

| Loại   | Mô tả                              |
| ------- | ---------------------------------- |
| boolean | `true` nghĩa là privateKey hợp lệ. |

**Ví dụ**

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

Trả về `true` nếu publicKey hợp lệ, nếu không sẽ trả về `false`.

**Tham số**

| Tên       | Loại | Mô tả                             |
| --------- | ----- | --------------------------------- |
| publicKey | chuỗi | Chuỗi khóa công khai để xác thực. |

**Giá trị trả về**

| Loại   | Mô tả                             |
| ------- | --------------------------------- |
| boolean | `true` nghĩa là publicKey hợp lệ. |

**Ví dụ**

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

Trả về `true` nếu vai trò hợp lệ, nếu không nó sẽ trả về `false`. Bạn có thể kiểm tra các vai trò được caver-js hỗ trợ thông qua `caver.wallet.keyring.role`.

**Tham số**

| Tên     | Loại | Mô tả                          |
| ------- | ----- | ------------------------------ |
| vai trò | chuỗi | Một chuỗi vai trò để xác thực. |

**Giá trị trả về**

| Loại   | Mô tả                           |
| ------- | ------------------------------- |
| boolean | `true` nghĩa là vai trò hợp lệ. |

**Ví dụ**

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

Xác thực số khối (hoặc chuỗi thẻ khối).

Số khối phải là một trong các loại dưới đây:

- số khối được xác định trước, ví dụ:) 'mới nhất', 'cũ nhất', 'đang chờ xử lý', 'khởi nguyên'
- hex
- số giới hạn

**Tham số**

| Tên         | Loại       | Mô tả                                                                                                                               |
| ----------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| blockNumber | chuỗi \| số | Số khối để xác thực. Đây có thể là số khối ở dạng số hoặc thẻ khối (`latest`, `pending`, `earliest`, `genesis`). |

**Giá trị trả về**

| Loại   | Mô tả                               |
| ------- | ----------------------------------- |
| boolean | `true` nghĩa là blockNumber hợp lệ. |

**Ví dụ**

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

Trả về `true` nếu tham số là thẻ khối được xác định trước.

**Tham số**

| Tên             | Loại | Mô tả                         |
| --------------- | ----- | ----------------------------- |
| predefinedBlock | chuỗi | Các khối được xác định trước. |

**Giá trị trả về**

| Loại   | Mô tả                                                                   |
| ------- | ----------------------------------------------------------------------- |
| boolean | `true` nghĩa là predefinedBlock là thẻ khối được xác định trước hợp lệ. |

**Ví dụ**

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

Trả về `true` nếu sig ở định dạng chữ ký trống (`SignatureData { _v: '0x01', _r: '0x', _s: '0x' }` hoặc `[SignatureData { _v: '0x01', _r: '0x', _s: '0x' }]`) còn không nó sẽ trả về `false`.

Trong caver-js, nếu signatures hoặc feePayerSignatures trống thì giá trị đại diện cho chữ ký trống, `[SignatureData { _v: '0x01', _r: '0x', _s: '0x' }]`, được trả về cho thuộc tính. Hàm này dùng để kiểm tra xem chữ ký đã cho có phải là `[SignatureData { _v: '0x01', _r: '0x', _s: '0x' }]` (hoặc `SignatureData { _v: '0x01', _r: '0x', _s: '0x' }` trong giao dịch 'LEGACY').

**Tham số**

| Tên | Loại             | Mô tả                                                                                                                                                              |
| --- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| sig | đối tượng \| Mảng | Một đối tượng [SignatureData](caver-wallet/keyring.md#signaturedata) hoặc mảng [SignatureData](caver-wallet/keyring.md#signaturedata) để kiểm tra trống hay không. |

**Giá trị trả về**

| Loại   | Mô tả                      |
| ------- | -------------------------- |
| boolean | `true` nghĩa là sig trống. |

**Ví dụ**

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

Trả về `true` nếu khóa nằm trong định dạng [KlaytnWalletKey](../../../../learn/accounts.md#klaytn-wallet-key-format), nếu không nó sẽ trả về `false`.

**Tham số**

| Tên  | Loại | Mô tả                                                              |
| ---- | ----- | ------------------------------------------------------------------ |
| khóa | chuỗi | Một chuỗi khóa để kiểm tra có định dạng KlaytnWalletKey hay không. |

**Giá trị trả về**

| Loại   | Mô tả                                                                                                                  |
| ------- | ---------------------------------------------------------------------------------------------------------------------- |
| boolean | `true` có nghĩa là khóa là `0x{private key}0x{type}0x{address in hex}` hoặc `{private key}0x{type}0x{address in hex}`. |

**Ví dụ**

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

Chuyển đổi bộ đệm thành chuỗi số hex có tiền tố 0x.

**Tham số**

| Tên    | Loại  | Mô tả                                       |
| ------ | ------ | ------------------------------------------- |
| buffer | Bộ đệm | Một bộ đệm để chuyển đổi sang chuỗi số hex. |

**Giá trị trả về**

| Loại | Mô tả                       |
| ----- | --------------------------- |
| chuỗi | Chuỗi số hex có tiền tố 0x. |

**Ví dụ**

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

Phân tích chuỗi [KlaytnWalletKey](../../../../learn/accounts.md#klaytn-wallet-key-format) thành một mảng bao gồm "khóa riêng tư", "loại", "địa chỉ".

**Tham số**

| Tên  | Loại | Mô tả                                                                                |
| ---- | ----- | ------------------------------------------------------------------------------------ |
| khóa | chuỗi | Một chuỗi [KlaytnWalletKey](../../../../learn/accounts.md#klaytn-wallet-key-format). |

**Giá trị trả về**

| Loại | Mô tả                                   |
| ----- | --------------------------------------- |
| Mảng  | KlaytnWalletKey được phân tích cú pháp. |

**Ví dụ**

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

Tin nhắn hàm băm với tiền tố dành riêng cho Klaytn: `keccak256("\x19Klaytn Signed Message:\n" + len(message) + message))`

**Tham số**

| Tên       | Loại | Mô tả                                                               |
| --------- | ----- | ------------------------------------------------------------------- |
| thông báo | chuỗi | Tin nhắn hàm băm. Nếu là chuỗi HEX, nó sẽ được giải mã UTF-8 trước. |

**Giá trị trả về**

| Loại | Mô tả                                               |
| ----- | --------------------------------------------------- |
| chuỗi | Tin nhắn hàm băm với tiền tố dành riêng cho Klaytn. |

**Ví dụ**

```javascript
> caver.utils.hashMessage('Hello')
'0x640bfab59b6e27468abd367888f4ab1a1c77aa2b45e76a1d3adcbd039c305917'
```

## recover <a href="#recover" id="recover"></a>

```javascript
caver.utils.recover(message, signature [, isHashed])
```

Khôi phục địa chỉ Klaytn dùng để ký dữ liệu đã cho.

**Tham số**

| Tên       | Loại             | Mô tả                                                                                                                                                                                                                             |
| --------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| thông báo | chuỗi             | Tin nhắn hoặc tin nhắn băm.                                                                                                                                                                                                       |
| chữ ký    | đối tượng \| Mảng | Một đối tượng [SignatureData](caver-wallet/keyring.md#signaturedata).                                                                                                                                                             |
| isHashed  | boolean           | (tùy chọn, mặc định: `false`) Nếu tham số cuối cùng là `true` thì `message` đã cho sẽ KHÔNG tự động có tiền tố là `"\x19Klaytn Signed Message:\n" + message.length + message` và sẽ được coi là đã có tiền tố. |

**Giá trị trả về**

| Loại | Mô tả                                  |
| ----- | -------------------------------------- |
| chuỗi | Địa chỉ Klaytn dùng để ký dữ liệu này. |

**Ví dụ**

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

Khôi phục khóa công khai dùng để ký dữ liệu đã cho.

**LƯU Ý** `caver.utils.recoverPublicKey` được hỗ trợ kể từ caver-js phiên bản [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3).

**Tham số**

| Tên       | Loại             | Mô tả                                                                                                                                                                                   |
| --------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| thông báo | chuỗi             | Tin nhắn hoặc tin nhắn băm.                                                                                                                                                             |
| chữ ký    | đối tượng \| Mảng | Một đối tượng [SignatureData](caver-wallet/keyring.md#signaturedata).                                                                                                                   |
| isHashed  | boolean           | (tùy chọn, mặc định: `false`) Liệu tin nhắn được truyền làm tham số có ở dạng băm với tiền tố `"\x19Klaytn Signed Message:\n" + message.length + message` hay không. |

**Giá trị trả về**

| Loại | Mô tả                                  |
| ----- | -------------------------------------- |
| chuỗi | Khóa công khai dùng để ký dữ liệu này. |

**Ví dụ**

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

Trả về một địa chỉ bắt nguồn từ khóa công khai. Hàm này chỉ đơn giản là chuyển đổi chuỗi khóa công khai thành một dạng địa chỉ bằng cách đưa nó về dạng băm. Nó không liên quan gì đến tài khoản thực trên Klaytn.

**LƯU Ý** `caver.utils.publicKeyToAddress` được hỗ trợ kể từ caver-js phiên bản [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3).

**Tham số**

| Tên       | Loại | Mô tả                                |
| --------- | ----- | ------------------------------------ |
| publicKey | chuỗi | Chuỗi khóa công khai để lấy địa chỉ. |

**Giá trị trả về**

| Loại | Mô tả                                      |
| ----- | ------------------------------------------ |
| chuỗi | Chuỗi địa chỉ bắt nguồn từ khóa công khai. |

**Ví dụ**

```javascript
> caver.utils.publicKeyToAddress('0xb5df4d5e6b4ee7a136460b911a69030fdd42c18ed067bcc2e25eda1b851314fad994c5fe946aad01ca2e348d4ff3094960661a8bc095f358538af54aeea48ff3')
'0xA84A1CE657e9d5b383cECE6f4bA365e23Fa234Dd'
```

## compressPublicKey <a href="#compresspublickkey" id="compresspublickkey"></a>

```javascript
caver.utils.compressPublicKey(uncompressedPublicKey)
```

Nén khóa công khai không nén.

**Tham số**

| Tên                   | Loại | Mô tả                     |
| --------------------- | ----- | ------------------------- |
| uncompressedPublicKey | chuỗi | Khóa công khai không nén. |

**Giá trị trả về**

| Loại | Mô tả                    |
| ----- | ------------------------ |
| chuỗi | Khóa công khai được nén. |

**Ví dụ**

```javascript
> caver.utils.compressPublicKey('0x62cef87819b82f62e9c0a38c1fa7dfa089084959df86aca19ff2f6c903db2248b45dc23220ee6bcd8753bb9df8ce7d58e56eabebb14479f3a0ca5ccd4bdea632')
'0x0262cef87819b82f62e9c0a38c1fa7dfa089084959df86aca19ff2f6c903db2248'
```

## decompressPublicKey <a href="#decompresspublickkey" id="decompresspublickkey"></a>

```javascript
caver.utils.decompressPublicKey(compressedPublicKey)
```

Giải nén khóa công khai đã nén.

**Tham số**

| Tên                 | Loại | Mô tả                    |
| ------------------- | ----- | ------------------------ |
| compressedPublicKey | chuỗi | Khóa công khai được nén. |

**Giá trị trả về**

| Loại | Mô tả                     |
| ----- | ------------------------- |
| chuỗi | Khóa công khai không nén. |

**Ví dụ**

```javascript
> caver.utils.decompressPublicKey('0x0262cef87819b82f62e9c0a38c1fa7dfa089084959df86aca19ff2f6c903db2248')
'0x62cef87819b82f62e9c0a38c1fa7dfa089084959df86aca19ff2f6c903db2248b45dc23220ee6bcd8753bb9df8ce7d58e56eabebb14479f3a0ca5ccd4bdea632'
```

## isCompressedPublicKey <a href="#iscompressedpublickey" id="iscompressedpublickey"></a>

```javascript
caver.utils.isCompressedPublicKey(publicKey)
```

Trả về `true` nếu khóa chung được nén, nếu không sẽ trả về `false`.

**Tham số**

| Tên       | Loại | Mô tả           |
| --------- | ----- | --------------- |
| publicKey | chuỗi | Khóa công khai. |

**Giá trị trả về**

| Loại   | Mô tả                        |
| ------- | ---------------------------- |
| boolean | `true` có nghĩa là được nén. |

**Ví dụ**

```javascript
> caver.utils.isCompressedPublicKey('0x0262cef87819b82f62e9c0a38c1fa7dfa089084959df86aca19ff2f6c903db2248')
true
```

## decodeSignature <a href="#decodesignature" id="decodesignature"></a>

```javascript
caver.utils.decodeSignature('0x{signature}')
```

Giải mã dữ liệu chữ ký thô bao gồm 'R(32 byte) + S(32 byte) + V(1byte)'.

**LƯU Ý** `caver.utils.decodeSignature` được hỗ trợ kể từ caver-js phiên bản [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3).

**Tham số**

| Tên    | Loại | Mô tả                                                                                                                            |
| ------ | ----- | -------------------------------------------------------------------------------------------------------------------------------- |
| chữ ký | chuỗi | Chuỗi chữ ký để giải mã. Nó bao gồm R(32bytes) + S(32bytes) + V(1byte). |

**Giá trị trả về**

| Loại     | Mô tả                                              |
| --------- | -------------------------------------------------- |
| đối tượng | Đối tượng `SignatureData` bao gồm `v`, `r` và `s`. |

**Ví dụ**

```javascript
> caver.utils.decodeSignature('0xc69018da9396c4b87947e0784625af7475caf46e2af9cf57a44673ff0f625258642d8993751ae67271bcc131aa065adccf9f16fc4953f9c48f4a80d675c09ae81b')
SignatureData {
  _v: '0x1b',
  _r: '0xc69018da9396c4b87947e0784625af7475caf46e2af9cf57a44673ff0f625258',
  _s: '0x642d8993751ae67271bcc131aa065adccf9f16fc4953f9c48f4a80d675c09ae8'
}
```
