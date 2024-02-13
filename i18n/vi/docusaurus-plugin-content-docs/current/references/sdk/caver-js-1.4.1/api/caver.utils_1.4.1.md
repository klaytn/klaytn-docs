---
description: caver-js utility APIs.
---

# caver.utils

`caver.utils` cung cấp các chức năng tiện ích.

## randomHex <a id="randomhex"></a>

```javascript
caver.utils.randomHex(size)
```

Thư viện [randomHex](https://github.com/frozeman/randomHex) để tạo các chuỗi số HEX giả ngẫu nhiên được mã hóa mạnh mẽ từ một kích thước byte nhất định.một kích thước byte nhất định.

**Tham số**

| Tên        | type | Mô tả                                                                                                          |
| ---------- | ---- | -------------------------------------------------------------------------------------------------------------- |
| kích thước | Số   | Kích thước byte cho chuỗi số HEX, _ví dụ_, `32` sẽ dẫn đến chuỗi số HEX 32 byte có 64 ký tự bắt đầu bằng "0x". |

**Giá trị trả về**

| type  | Mô tả                             |
| ----- | --------------------------------- |
| Chuỗi | Chuỗi số HEX ngẫu nhiên được tạo. |

**Ví dụ**

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

## _ <a id="\_"></a>

```javascript
caver.utils._()
```

Thư viện [underscore](http://underscorejs.org) dành cho nhiều hàm JavaScript thuận tiện.

Xem [tham chiếu API underscore](http://underscorejs.org) để biết chi tiết.

**Ví dụ**

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

Thư viện [BN.js](#tobn) để tính toán với các số lớn trong JavaScript.
Xem [Tài liệu BN.js](#tobn) để biết thông tin chi tiết.

**Tham số**

| Tên     | type        | Mô tả                                                                |
| ------- | ----------- | -------------------------------------------------------------------- |
| hỗn hợp | Chuỗi \| Số | Một số, chuỗi số hoặc chuỗi số HEX để chuyển đổi thành đối tượng BN. |

**Giá trị trả về**

| Loại     | Mô tả                     |
| --------- | ------------------------- |
| Đối tượng | Phiên bản [BN.js](#tobn). |

**Ví dụ**

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

Kiểm tra xem một giá trị đã cho có phải là phiên bản [BN.js](#tobn) hay không.

**Tham số**

| Tên | Loại     | Mô tả                         |
| --- | --------- | ----------------------------- |
| bn  | Đối tượng | Một phiên bản [BN.js](#tobn). |

**Giá trị trả về**

| Loại   | Mô tả                                                  |
| ------- | ------------------------------------------------------ |
| Boolean | `true` nếu giá trị đã cho là phiên bản [BN.js](#tobn). |

**Ví dụ**

```javascript
> var number = new BN(10);
> caver.utils.isBN(number);
true
```

## isBigNumber <a id="isbignumber"></a>

```javascript
caver.utils.isBigNumber(bignumber)
```

Kiểm tra xem một giá trị đã cho có phải là phiên bản [BigNumber.js](http://mikemcl.github.io/bignumber.js/) hay không.

**Tham số**

| Tên       | Loại     | Mô tả                                                                 |
| --------- | --------- | --------------------------------------------------------------------- |
| bignumber | Đối tượng | Một phiên bản [BigNumber.js](http://mikemcl.github.io/bignumber.js/). |

**Giá trị trả về**

| Loại   | Mô tả                                                  |
| ------- | ------------------------------------------------------ |
| Boolean | `true` nếu giá trị đã cho là đối tượng `BigNumber.js`. |

**Ví dụ**

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

Tính toán sha3 của giá trị đầu vào.

**LƯU Ý**: Để bắt chước hành vi sha3 của việc sử dụng Solidity [caver.utils.soliditySha3](#soliditysha3).

**Tham số**

| Tên   | Loại | Mô tả                    |
| ----- | ----- | ------------------------ |
| chuỗi | Chuỗi | Một chuỗi thành hàm băm. |

**Giá trị trả về**

| Loại | Mô tả            |
| ----- | ---------------- |
| Chuỗi | Hàm băm kết quả. |

**Ví dụ**

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

Tính toán sha3 của các tham số đầu vào đã cho theo cách tương tự như solidity.
Điều này có nghĩa các đối số sẽ được chuyển đổi thành ABI và đóng gói chặt chẽ trước khi đưa vào hàm băm.

**Tham số**

| Tên    | Loại   | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| paramX | Hỗn hợp | Bất kỳ loại hoặc đối tượng nào có `{type: 'uint', value: '123456'}` hoặc `{t: 'bytes', v: '0xfff456'}`. Các loại cơ bản được tự động nhận diện như sau:<br/> - `String` chuỗi UTF-8 không phải là số được hiểu là `string`.<br/> - `String\\|Number\\|bn\\|HEX` được hiểu là `uint256`. - `String\\|Number\\|BN` số âm được hiểu là `int256`.<br/> - `Boolean` dưới dạng `bool`.<br/> - `String` Chuỗi số HEX với `0x` ở đầu được hiểu là `byte`.<br/> - `HEX` Biểu diễn số HEX được hiểu là `uint256`.<br/> |

**Giá trị trả về**

| Loại | Mô tả            |
| ----- | ---------------- |
| Chuỗi | Hàm băm kết quả. |

**Ví dụ**

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

Kiểm tra xem một chuỗi đã cho có phải là chuỗi số HEX hay không.

**Tham số**

| Tên | Loại        | Mô tả                |
| --- | ------------ | -------------------- |
| hex | Chuỗi \| HEX | Chuỗi số HEX đã cho. |

**Giá trị trả về**

| Loại   | Mô tả                                            |
| ------- | ------------------------------------------------ |
| Boolean | `true` nếu một chuỗi đã cho là một chuỗi số HEX. |

**Ví dụ**

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

Kiểm tra xem một chuỗi đã cho có phải là chuỗi số HEX hay không. Sự khác biệt đối với [caver.utils.isHex](#ishex) là nó cần có HEX tiền tố `0x`.

**Tham số**

| Tên | Loại        | Mô tả                |
| --- | ------------ | -------------------- |
| hex | Chuỗi \| HEX | Chuỗi số HEX đã cho. |

**Giá trị trả về**

| Loại   | Mô tả                                            |
| ------- | ------------------------------------------------ |
| Boolean | `true` nếu một chuỗi đã cho là một chuỗi số HEX. |

**Ví dụ**

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

Kiểm tra xem chuỗi đã cho có phải là địa chỉ Klaytn hợp lệ hay không.
Nó cũng sẽ kiểm tra giá trị tổng kiểm nếu địa chỉ có chữ hoa và chữ thường.

**Tham số**

| Tên     | type  | Mô tả              |
| ------- | ----- | ------------------ |
| address | Chuỗi | Một chuỗi địa chỉ. |

**Giá trị trả về**

| Loại   | Mô tả                                             |
| ------- | ------------------------------------------------- |
| Boolean | `true` nếu chuỗi đã cho là địa chỉ Klaytn hợp lệ. |

**Ví dụ**

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

Chuyển đổi địa chỉ Klaytn viết hoa hoặc viết thường thành địa chỉ giá trị tổng kiểm.

**Tham số**

| Tên     | Loại | Mô tả              |
| ------- | ----- | ------------------ |
| address | Chuỗi | Một chuỗi địa chỉ. |

**Giá trị trả về**

| Loại | Mô tả                      |
| ----- | -------------------------- |
| Chuỗi | Địa chỉ giá trị tổng kiểm. |

**Ví dụ**

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

Kiểm tra giá trị tổng kiểm của một địa chỉ đã cho. Trả về `false` trên các địa chỉ không phải là giá trị tổng kiểm.

**Tham số**

| Tên     | Loại | Mô tả              |
| ------- | ----- | ------------------ |
| address | Chuỗi | Một chuỗi địa chỉ. |

**Giá trị trả về**

| type    | Mô tả                                                                                                                                        |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Boolean | `true` khi giá trị tổng kiểm của địa chỉ hợp lệ, `false` nếu đó không phải là địa chỉ giá trị tổng kiểm hoặc giá trị tổng kiểm không hợp lệ. |

**Ví dụ**

```javascript
> caver.utils.checkAddressChecksum('0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d');
true
```

## toHex <a id="tohex"></a>

```javascript
caver.utils.toHex(mixed)
```

Chuyển đổi giá trị đã cho bất kỳ thành HEX.
Chuỗi số sẽ được hiểu là số.
Chuỗi văn bản sẽ được hiểu là chuỗi UTF-8.

**Tham số**

| Tên     | Loại                          | Mô tả                           |
| ------- | ------------------------------ | ------------------------------- |
| hỗn hợp | Chuỗi \| Số \| BN \| BigNumber | Đầu vào để chuyển đổi sang HEX. |

**Giá trị trả về**

| Loại | Mô tả                 |
| ----- | --------------------- |
| Chuỗi | Chuỗi số HEX kết quả. |

**Ví dụ**

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

Chuyển đổi một cách an toàn mọi giá trị đã cho (bao gồm đối tượng [BigNumber.js](http://mikemcl.github.io/bignumber.js/)) thành [BN.js](#tobn) để xử lý các số lớn trong JavaScript./a>) thành [BN.js](#tobn) để xử lý các số lớn trong JavaScript.

**LƯU Ý**: Chỉ với lớp [BN.js](#tobn), hãy sử dụng [caver.utils.BN](#tobn).

**Tham số**

| Tên | type               | Mô tả                              |
| --- | ------------------ | ---------------------------------- |
| số  | Chuỗi \| Số \| HEX | Số để chuyển đổi thành một số lớn. |

**Giá trị trả về**

| Loại     | Mô tả                     |
| --------- | ------------------------- |
| Đối tượng | Phiên bản [BN.js](#tobn). |

**Ví dụ**

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

Trả về biểu diễn số của một giá trị HEX nhất định dưới dạng chuỗi.

**Tham số**

| Tên       | Loại        | Mô tả                             |
| --------- | ------------ | --------------------------------- |
| hexString | Chuỗi số HEX | Một chuỗi số HEX được chuyển đổi. |

**Giá trị trả về**

| Loại | Mô tả               |
| ----- | ------------------- |
| Chuỗi | Số dưới dạng chuỗi. |

**Ví dụ**

```javascript
> caver.utils.hexToNumberString('0xea');
"234"
```

## hexToNumber <a id="hextonumber"></a>

```javascript
caver.utils.hexToNumber(hex)
```

Trả về biểu diễn số của một giá trị HEX đã cho.

**LƯU Ý**: Hàm này không hiệu quả với các số lớn, thay vào đó hãy sử dụng [caver.utils.toBN](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography).

**Tham số**

| Tên       | Loại        | Mô tả                             |
| --------- | ------------ | --------------------------------- |
| hexString | Chuỗi số HEX | Một chuỗi số HEX được chuyển đổi. |

**Giá trị trả về**

| Loại | Mô tả                                    |
| ----- | ---------------------------------------- |
| Số    | Biểu diễn số của một giá trị HEX đã cho. |

**Ví dụ**

```javascript
> caver.utils.hexToNumber('0xea');
234
```

## numberToHex <a id="numbertohex"></a>

```javascript
caver.utils.numberToHex(number)
```

Trả về biểu diễn HEX của một giá trị số đã cho.

**Tham số**

| Tên | Loại                          | Mô tả                           |
| --- | ------------------------------ | ------------------------------- |
| số  | Chuỗi \| Số \| BN \| BigNumber | Một số dưới dạng chuỗi hoặc số. |

**Giá trị trả về**

| Loại | Mô tả                      |
| ----- | -------------------------- |
| Chuỗi | Giá trị HEX của số đã cho. |

**Ví dụ**

```javascript
> caver.utils.numberToHex('234');
'0xea'
```

## hexToUtf8 <a id="hextoutf8"></a>

```javascript
caver.utils.hexToUtf8(hex)
caver.utils.hexToString(hex) // ALIAS
```

Trả về biểu diễn chuỗi UTF-8 của một giá trị HEX đã cho.

**Tham số**

| Tên | Loại | Mô tả                                         |
| --- | ----- | --------------------------------------------- |
| hex | Chuỗi | Chuỗi số HEX để chuyển đổi thành chuỗi UTF-8. |

**Giá trị trả về**

| Loại | Mô tả        |
| ----- | ------------ |
| Chuỗi | Chuỗi UTF-8. |

**Ví dụ**

```javascript
> caver.utils.hexToUtf8('0x49206861766520313030e282ac');
"I have 100€"
```

## hexToAscii <a id="hextoascii"></a>

```javascript
caver.utils.hexToAscii(hex)
```

Trả về biểu diễn chuỗi ASCII của một giá trị HEX đã cho.

**Tham số**

| Tên | Loại | Mô tả                                                 |
| --- | ----- | ----------------------------------------------------- |
| hex | Chuỗi | Một chuỗi số HEX để chuyển đổi thành một chuỗi ASCII. |

**Giá trị trả về**

| Loại | Mô tả        |
| ----- | ------------ |
| Chuỗi | Chuỗi ASCII. |

**Ví dụ**

```javascript
> caver.utils.hexToAscii('0x4920686176652031303021');
"I have 100!"
```

## utf8ToHex <a id="utf8tohex"></a>

```javascript
caver.utils.utf8ToHex(string)
caver.utils.stringToHex(string) // ALIAS
```

Trả về biểu diễn HEX của một chuỗi UTF-8 đã cho.

**Tham số**

| Tên   | Loại | Mô tả                                         |
| ----- | ----- | --------------------------------------------- |
| chuỗi | Chuỗi | Chuỗi UTF-8 để chuyển đổi thành chuỗi số HEX. |

**Giá trị trả về**

| type  | Mô tả         |
| ----- | ------------- |
| Chuỗi | Chuỗi số HEX. |

**Ví dụ**

```javascript
> caver.utils.utf8ToHex('I have 100€');
"0x49206861766520313030e282ac"
```

## asciiToHex <a id="asciitohex"></a>

```javascript
caver.utils.asciiToHex(string)
```

Trả về biểu diễn HEX của một chuỗi ASCII đã cho.

**Tham số**

| Tên   | Loại | Mô tả                                             |
| ----- | ----- | ------------------------------------------------- |
| chuỗi | Chuỗi | Một chuỗi ASCII để chuyển đổi thành chuỗi số HEX. |

**Giá trị trả về**

| Loại | Mô tả         |
| ----- | ------------- |
| Chuỗi | Chuỗi số HEX. |

**Ví dụ**

```javascript
> caver.utils.asciiToHex('I have 100!');
"0x4920686176652031303021"
```

## hexToBytes <a id="hextobytes"></a>

```javascript
caver.utils.hexToBytes(hex)
```

Trả về một mảng byte từ chuỗi số HEX đã cho.

**Tham số**

| Tên | type         | Mô tả                             |
| --- | ------------ | --------------------------------- |
| hex | Chuỗi số HEX | Một chuỗi số HEX được chuyển đổi. |

**Giá trị trả về**

| type | Mô tả      |
| ---- | ---------- |
| Mảng | Mảng byte. |

**Ví dụ**

```javascript
> caver.utils.hexToBytes('0x000000ea');
[ 0, 0, 0, 234 ]
```

## bytesToHex <a id="bytestohex"></a>

```javascript
caver.utils.bytesToHex(byteArray)
```

Trả về một chuỗi số HEX từ một mảng byte.

**Tham số**

| Tên       | Loại | Mô tả                        |
| --------- | ----- | ---------------------------- |
| byteArray | Mảng  | Một mảng byte để chuyển đổi. |

**Giá trị trả về**

| Loại | Mô tả         |
| ----- | ------------- |
| Chuỗi | Chuỗi số HEX. |

**Ví dụ**

```javascript
> caver.utils.bytesToHex([ 72, 101, 108, 108, 111, 33, 36 ]);
"0x48656c6c6f2125"
```

## toPeb <a id="topeb"></a>

```javascript
caver.utils.toPeb(number [, unit])
```

Chuyển đổi giá trị KLAY bất kỳ thành peb.

**LƯU Ý**: "peb" là đơn vị KLAY nhỏ nhất và bạn phải luôn tính toán bằng peb và chỉ chuyển đổi vì lý do hiển thị.

**Tham số**

| Tên    | Loại             | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------ | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| số     | Chuỗi \| Số \| BN | Giá trị.                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| đơn vị | Chuỗi             | (tùy chọn, mặc định là `"KLAY"`) KLAY để chuyển đổi. Các đơn vị có thể là:<br/>- `peb`: '1' <br/> - `kpeb`: '1000' <br/> - `Mpeb`: '1000000' <br/> - `Gpeb`: '1000000000' <br/> - `Ston`: '1000000000' <br/> - `uKLAY`: '1000000000000' <br/> - `mKLAY`: '1000000000000000' <br/> - `KLAY`: '1000000000000000000' <br/> - `kKLAY`: '1000000000000000000000' <br/> - `MKLAY`: '1000000000000000000000000' <br/> - `GKLAY`: '1000000000000000000000000000' <br/> |

**Giá trị trả về**

| Loại       | Mô tả                                                                                                                 |
| ----------- | --------------------------------------------------------------------------------------------------------------------- |
| Chuỗi \| BN | Nếu một số hoặc một chuỗi được cung cấp, nó sẽ trả về một chuỗi số, nếu không thì sẽ là một phiên bản [BN.js](#tobn). |

**Ví dụ**

```javascript
> caver.utils.toPeb('1', 'KLAY');
"1000000000000000000"
```

## fromPeb <a id="frompeb"></a>

```javascript
caver.utils.fromPeb(number [, unit])
```

**LƯU Ý**: "peb" là đơn vị KLAY nhỏ nhất và bạn phải luôn tính toán bằng KLAY và chỉ chuyển đổi vì lý do hiển thị.

**Tham số**

| Tên    | Loại             | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ------ | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| số     | Chuỗi \| Số \| BN | Giá trị tính bằng peb.                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| đơn vị | Chuỗi             | (tùy chọn, mặc định là `"KLAY"`) KLAY để chuyển đổi sang. Các đơn vị có thể là:<br/>- `peb`: '1' <br/> - `kpeb`: '1000' <br/> - `Mpeb`: '1000000' <br/> - `Gpeb`: '1000000000' <br/> - `Ston`: '1000000000' <br/> - `uKLAY`: '1000000000000' <br/> - `mKLAY`: '1000000000000000' <br/> - `KLAY`: '1000000000000000000' <br/> - `kKLAY`: '1000000000000000000000' <br/> - `MKLAY`: '1000000000000000000000000' <br/> - `GKLAY`: '1000000000000000000000000000' <br/> |

**Giá trị trả về**

| Loại       | Mô tả                                                                                                                 |
| ----------- | --------------------------------------------------------------------------------------------------------------------- |
| Chuỗi \| BN | Nếu một số hoặc một chuỗi được cung cấp, nó sẽ trả về một chuỗi số, nếu không thì sẽ là một phiên bản [BN.js](#tobn). |

**Ví dụ**

```javascript
> caver.utils.fromPeb('1', 'KLAY');
"0.000000000000000001"
```

## unitMap <a id="unitmap"></a>

```javascript
caver.utils.unitMap
```

Hiển thị tất cả các giá trị KLAY có thể có và số lượng của chúng tính bằng peb.

**Giá trị trả về**

| Loại     | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                       |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Đối tượng | Với các thuộc tính sau:<br/>- `peb`: '1' <br/> - `kpeb`: '1000' <br/> - `Mpeb`: '1000000' <br/> - `Gpeb`: '1000000000' <br/> - `Ston`: '1000000000' <br/> - `uKLAY`: '1000000000000' <br/> - `mKLAY`: '1000000000000000' <br/> - `KLAY`: '1000000000000000000' <br/> - `kKLAY`: '1000000000000000000000' <br/> - `MKLAY`: '1000000000000000000000000' <br/> - `GKLAY`: '1000000000000000000000000000' <br/> |

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
}
```

## padLeft <a id="padleft"></a>

```javascript
caver.utils.padLeft(string, characterAmount [, sign])
caver.utils.leftPad(string, characterAmount [, sign]) // ALIAS
```

Thêm phần đệm vào bên trái của một chuỗi. Hữu ích khi thêm phần đệm vào chuỗi số HEX.

**Tham số**

| Tên             | Loại | Mô tả                                                              |
| --------------- | ----- | ------------------------------------------------------------------ |
| chuỗi           | Chuỗi | Chuỗi để thêm phần đệm vào bên trái.                               |
| characterAmount | Số    | Số lượng ký tự mà tổng chuỗi phải có.                              |
| ký              | Chuỗi | (tùy chọn) Ký tự để sử dụng, mặc định là `"0"`. |

**Giá trị trả về**

| Loại | Mô tả      |
| ----- | ---------- |
| Chuỗi | Chuỗi đệm. |

**Ví dụ**

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

Thêm phần đệm vào bên phải của chuỗi, Hữu ích khi thêm phần đệm vào chuỗi số HEX.

**Tham số**

| Tên             | Loại | Mô tả                                                              |
| --------------- | ----- | ------------------------------------------------------------------ |
| chuỗi           | Chuỗi | Chuỗi để thêm phần đệm vào bên phải.                               |
| characterAmount | Số    | Số lượng ký tự mà tổng chuỗi phải có.                              |
| ký              | Chuỗi | (tùy chọn) Ký tự để sử dụng, mặc định là `"0"`. |

**Giá trị trả về**

| Loại | Mô tả      |
| ----- | ---------- |
| Chuỗi | Chuỗi đệm. |

**Ví dụ**

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

Chuyển đổi một số âm thành phần bù hai.

**Tham số**

| Tên | Loại                    | Mô tả              |
| --- | ------------------------ | ------------------ |
| số  | Số \| Chuỗi \| BigNumber | Số cần chuyển đổi. |

**Giá trị trả về**

| Loại | Mô tả                       |
| ----- | --------------------------- |
| Chuỗi | Chuỗi số hex đã chuyển đổi. |

**Ví dụ**

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

Trả về `true` nếu giao dịch đã cho là giao dịch triển khai hợp đồng thông minh. Trả về `false` nếu giao dịch không phải là giao dịch triển khai hợp đồng thông minh. Kết quả được xác định bởi giá trị của các tham số trong `transactionObject`. Đảm bảo tất cả các tham số bắt buộc được đặt chính xác.

**LƯU Ý** caver.klay.isContractDeployment được hỗ trợ từ **v1.0.1-rc.8**. Để sử dụng tính năng này, hãy cài đặt từ phiên bản [v1.0.1-rc.8](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography) trở lên.

**Tham số**

| Tên               | Loại     | Mô tả                                                                                                        |
| ----------------- | --------- | ------------------------------------------------------------------------------------------------------------ |
| transactionObject | Đối tượng | Đối tượng giao dịch mà bạn muốn xác định xem giao dịch có dành cho triển khai hợp đồng thông minh hay không. |

**Giá trị trả về**

| Loại   | Mô tả                                                                             |
| ------- | --------------------------------------------------------------------------------- |
| Boolean | `true` nghĩa là đối tượng giao dịch dùng cho việc triển khai hợp đồng thông minh. |

**Ví dụ**

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

Trả về tọa độ x và y của publicKey đã cho. Để biết thêm thông tin về mật mã khóa, xem [Mật mã đường cong Elliptic](../../../../learn/accounts.md#klaytn-wallet-key-format).cong Elliptic.

**LƯU Ý** Hàm này không chứa bất kỳ logic nào để kiểm tra xem khóa công khai có hợp lệ hay không. Hàm chỉ chia publicKey đầu vào thành các điểm x và y theo độ dài.

**Tham số**

| Tên       | Loại | Mô tả                          |
| --------- | ----- | ------------------------------ |
| publicKey | Chuỗi | PublicKey để nhận điểm x và y. |

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

## isHexPrefixed <a id="ishexprefixed"></a>

```javascript
caver.utils.isHexPrefixed(input)
```

Trả về `true` nếu đầu vào là một chuỗi số hex có tiền tố 0x, nếu không sẽ trả về `false`.

**LƯU Ý** caver.klay.isHexPrefixed được hỗ trợ kể từ phiên bản **v1.0.1**. Để sử dụng tính năng này, vui lòng cài đặt phiên bản [v1.0.1](../../../../learn/accounts.md#klaytn-wallet-key-format) trở lên.

**Tham số**

| Tên  | Loại | Mô tả                                                                              |
| ---- | ----- | ---------------------------------------------------------------------------------- |
| nhập | Chuỗi | Giá trị được xác định xem tham số có phải là chuỗi số hex có tiền tố 0x hay không. |

**Giá trị trả về**

| Loại   | Mô tả                                                  |
| ------- | ------------------------------------------------------ |
| Boolean | `true` nghĩa là đầu vào là chuỗi số hex có tiền tố 0x. |

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

## addHexPrefix <a id="addhexprefix"></a>

```javascript
caver.utils.addHexPrefix(input)
```

Trả về một chuỗi số hex có tiền tố là 0x. Nếu đầu vào đã có tiền tố 0x hoặc một chuỗi không phải hex thì giá trị đầu vào được trả về nguyên trạng.

**LƯU Ý** caver.klay.addHexPrefix được hỗ trợ kể từ phiên bản **v1.0.1**. Để sử dụng tính năng này, vui lòng cài đặt phiên bản [v1.0.1](../../../../learn/accounts.md#klaytn-wallet-key-format) trở lên.

**Tham số**

| Tên  | Loại | Mô tả                           |
| ---- | ----- | ------------------------------- |
| nhập | Chuỗi | Giá trị chuỗi có tiền tố là 0x. |

**Giá trị trả về**

| Loại | Mô tả                                   |
| ----- | --------------------------------------- |
| Chuỗi | Chuỗi hex có tiền tố 0x sẽ được trả về. |

**Ví dụ**

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

Trả về kết quả với tiền tố 0x bị loại bỏ khỏi đầu vào.

**LƯU Ý** caver.klay.stripHexPrefix được hỗ trợ từ phiên bản **v1.0.1**. Để sử dụng tính năng này, vui lòng cài đặt phiên bản [v1.0.1](../../../../learn/accounts.md#klaytn-wallet-key-format) trở lên.

**Tham số**

| Tên  | Loại | Mô tả                    |
| ---- | ----- | ------------------------ |
| nhập | Chuỗi | Chuỗi để xóa tiền tố 0x. |

**Giá trị trả về**

| Loại | Mô tả                                |
| ----- | ------------------------------------ |
| Chuỗi | Một chuỗi bị loại bỏ 0x được trả về. |

**Ví dụ**

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

Hàm này chuyển đổi đầu vào thành [Bộ đệm](../../../../learn/accounts.md#klaytn-wallet-key-format). Để chuyển đổi một đối tượng thành Bộ đệm bằng `toBuffer`, đối tượng đó phải triển khai hàm **toArray**. Đối với đầu vào loại chuỗi, hàm này chỉ hoạt động với **chuỗi hex có tiền tố 0x**.

**LƯU Ý** caver.klay.toBuffer được hỗ trợ từ **v1.1.0**. Để sử dụng tính năng này, hãy cài đặt [v1.1.0](../../../../learn/accounts.md#klaytn-wallet-key-format) trở lên.

**Tham số**

| Tên  | Loại                                            | Mô tả                                    |
| ---- | ------------------------------------------------ | ---------------------------------------- |
| nhập | Bộ đệm \| Chuỗi \| Số \| Mảng \| BN \| Đối tượng | Giá trị sẽ được chuyển đổi thành Bộ đệm. |

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

Hàm này chuyển đổi một số thành [Bộ đệm](../../../../learn/accounts.md#klaytn-wallet-key-format). [caver.utils.toBuffer](../../../../learn/accounts.md#klaytn-wallet-key-format) có hoạt động tương tự như hàm này khi đầu vào là một số.

**LƯU Ý** caver.klay.numberToBuffer được hỗ trợ từ **v1.1.0**. Để sử dụng tính năng này, hãy cài đặt [v1.1.0](../../../../learn/accounts.md#klaytn-wallet-key-format) trở lên.

**Tham số**

| Tên  | Loại             | Mô tả                                |
| ---- | ----------------- | ------------------------------------ |
| nhập | Chuỗi \| Số \| BN | Một số được chuyển đổi thành Bộ đệm. |

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

## isTxHash <a id="istxhash"></a>

```javascript
caver.utils.isTxHash(input)
```

Trả về `true` nếu đầu vào ở định dạng hàm băm giao dịch, nếu không sẽ trả về `false`. Hàm này chỉ xem xét đầu vào và xác định xem nó có ở định dạng hàm băm giao dịch hay không.
**LƯU Ý** caver.klay.isTxHash được hỗ trợ kể từ phiên bản **v1.2.0-rc.1**. Để sử dụng tính năng này, hãy cài đặt từ phiên bản [v1.2.0-rc.1](../../../../learn/accounts.md#klaytn-wallet-key-format) trở lên.

**Tham số**

| Tên  | Loại | Mô tả                                                                         |
| ---- | ----- | ----------------------------------------------------------------------------- |
| nhập | Chuỗi | Giá trị được xác định xem tham số có ở định dạng hàm băm giao dịch hay không. |

**Giá trị trả về**

| Loại   | Mô tả                                                  |
| ------- | ------------------------------------------------------ |
| Boolean | `true` nghĩa là đầu vào ở định dạng hàm băm giao dịch. |

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

## isTxHashStrict <a id="istxhashstrict"></a>

```javascript
caver.utils.isTxHashStrict(input)
```

Trả về `true` nếu đầu vào ở định dạng hàm băm giao dịch, nếu không sẽ trả về `false`. Hàm này chỉ xem xét đầu vào và xác định xem nó có ở định dạng hàm băm giao dịch hay không. Sự khác biệt đối với [caver.utils.isTxHash](../../../../learn/accounts.md#klaytn-wallet-key-format) là nó cho là HEX có tiền tố là `0x`.
**LƯU Ý** caver.klay.isTxHashStrict được hỗ trợ kể từ phiên bản **v1.2.0-rc.1**. Để sử dụng tính năng này, hãy cài đặt từ phiên bản [v1.2.0-rc.1](../../../../learn/accounts.md#klaytn-wallet-key-format) trở lên.

**Tham số**

| Tên  | Loại | Mô tả                                                                         |
| ---- | ----- | ----------------------------------------------------------------------------- |
| nhập | Chuỗi | Giá trị được xác định xem tham số có ở định dạng hàm băm giao dịch hay không. |

**Giá trị trả về**

| Loại   | Mô tả                                                  |
| ------- | ------------------------------------------------------ |
| Boolean | `true` nghĩa là đầu vào ở định dạng hàm băm giao dịch. |

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

## isValidPrivateKey <a id="isvalidprivatekey"></a>

```javascript
caver.utils.isValidPrivateKey(privateKey)
```

Trả về `true` nếu privateKey hợp lệ, nếu không thì trả về `false`.

**Tham số**

| Tên        | Loại | Mô tả                         |
| ---------- | ----- | ----------------------------- |
| privateKey | Chuỗi | Chuỗi khóa riêng để xác thực. |

**Giá trị trả về**

| Loại   | Mô tả                                 |
| ------- | ------------------------------------- |
| Boolean | `true` có nghĩa là privateKey hợp lệ. |

**Ví dụ**

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

Trả về `true` nếu publicKey hợp lệ, nếu không sẽ trả về `false`.

**LƯU Ý** `caver.utils.isValidPublicKey` được hỗ trợ kể từ caver-js [v1.2.0](../../../../learn/accounts.md#klaytn-wallet-key-format).

**Tham số**

| Tên       | Loại | Mô tả                             |
| --------- | ----- | --------------------------------- |
| publicKey | Chuỗi | Chuỗi khóa công khai để xác thực. |

**Giá trị trả về**

| Loại   | Mô tả                             |
| ------- | --------------------------------- |
| Boolean | `true` nghĩa là publicKey hợp lệ. |

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

## isValidRole <a id="isvalidrole"></a>

```javascript
caver.utils.isValidRole(role)
```

Trả về `true` nếu vai trò hợp lệ, nếu không sẽ trả về `false`. Các vai trò hiện được xác định cho AccountKeyRoleBased là `transactionKey`, `updateKey` và `feePayerKey`.

**LƯU Ý** `caver.utils.isValidRole` được hỗ trợ kể từ caver-js [v1.2.0](../../../../learn/accounts.md#klaytn-wallet-key-format).

**Tham số**

| Tên     | Loại | Mô tả                          |
| ------- | ----- | ------------------------------ |
| vai trò | Chuỗi | Một chuỗi vai trò để xác thực. |

**Giá trị trả về**

| Loại   | Mô tả                              |
| ------- | ---------------------------------- |
| Boolean | `true` có nghĩa là vai trò hợp lệ. |

**Ví dụ**

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

Trả về `true` nếu sig ở định dạng chữ ký trống (`[['0x01', '0x', '0x']]` hoặc `['0x01', '0x', '0x']`), nếu không sẽ trả về `false`.

Khi mã hóa RLP một giao dịch trong caver-js, nếu chữ ký hoặc phíPayerSignatures trống, thì giá trị đại diện cho chữ ký trống, `[['0x01', '0x', '0x']]`, được trả về cho thuộc tính. Hàm này dùng để kiểm tra xem chữ ký đã cho có phải là `[['0x01', '0x', '0x']]` (hay `['0x01', '0x', '0x']` trong giao dịch 'LEGACY').

**LƯU Ý** `caver.utils.isEmptySig` được hỗ trợ kể từ caver-js [v1.2.0](../../../../learn/accounts.md#klaytn-wallet-key-format).

**Tham số**

| Tên | Loại | Mô tả                                                   |
| --- | ----- | ------------------------------------------------------- |
| sig | Mảng  | Một mảng các chữ ký để kiểm tra xem có trống hay không. |

**Giá trị trả về**

| Loại   | Mô tả                                                                        |
| ------- | ---------------------------------------------------------------------------- |
| Boolean | `true` nghĩa là sig là `[['0x01', '0x', '0x']]` hoặc `['0x01', '0x', '0x']`. |

**Ví dụ**

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

Trả về `true` nếu khóa thuộc định dạng [KlaytnWalletKey](https://www.npmjs.com/package/caver-js/v/1.3.2-rc.1), nếu không sẽ trả về `false`.

**LƯU Ý** `caver.utils.isKlaytnWalletKey` đã được cập nhật với logic bổ sung để có kết quả chính xác hơn vì caver-js [v1.3.2-rc.3](https://www.npmjs.com/package/caver-js/v/1.3.2-rc.1).

**Tham số**

| Tên  | Loại | Mô tả                                                              |
| ---- | ----- | ------------------------------------------------------------------ |
| khóa | Chuỗi | Một chuỗi khóa để kiểm tra có định dạng KlaytnWalletKey hay không. |

**Giá trị trả về**

| Loại   | Mô tả                                                                                                                  |
| ------- | ---------------------------------------------------------------------------------------------------------------------- |
| Boolean | `true` có nghĩa là khóa là `0x{private key}0x{type}0x{address in hex}` hoặc `{private key}0x{type}0x{address in hex}`. |

**Ví dụ**

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

Chuyển đổi bộ đệm thành chuỗi số hex có tiền tố 0x.

**LƯU Ý** `caver.utils.bufferToHex` được hỗ trợ kể từ caver-js [v1.3.2-rc.1](https://www.npmjs.com/package/caver-js/v/1.3.2-rc.1).

**Tham số**

| Tên    | Loại  | Mô tả                                       |
| ------ | ------ | ------------------------------------------- |
| bộ đệm | Bộ đệm | Một bộ đệm để chuyển đổi sang chuỗi số hex. |

**Giá trị trả về**

| Loại | Mô tả                       |
| ----- | --------------------------- |
| Chuỗi | Chuỗi số hex có tiền tố 0x. |

**Ví dụ**

```javascript
> caver.utils.bufferToHex(Buffer.from('5b9ac8', 'hex'))
'0x5b9ac8'

> caver.utils.bufferToHex(Buffer.alloc(0))
'0x'
```
