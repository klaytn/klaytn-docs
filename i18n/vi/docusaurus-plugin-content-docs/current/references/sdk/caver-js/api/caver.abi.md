# caver.abi

Gói `caver.abi` cho phép bạn giải mã và mã hóa các tham số bằng ABI (Giao diện nhị phân ứng dụng). Gói này dùng để gọi các hàm của một hợp đồng thông minh đã triển khai.

## encodeFunctionSignature <a id="encodefunctionsignature"></a>

```javascript
caver.abi.encodeFunctionSignature(functionSignature)
```

Mã hóa chữ ký hàm thành chữ ký ABI - là 4 byte đầu tiên của hàm băm sha3 của tên hàm bao gồm các loại tham số.

**Tham số**

| Tên               | type                   | Mô tả                                                                                                                                                                                    |
| ----------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| functionSignature | chuỗi &#124; đối tượng | Chữ ký hàm hoặc đối tượng giao diện JSON của hàm cần mã hóa. Nếu đây là một chuỗi thì chuỗi này phải ở dạng `function(type, type,...)`, vd: `myFunction(uint256,uint32[],bytes10,bytes)` |

**Giá trị trả về**

| type  | Mô tả               |
| ----- | ------------------- |
| chuỗi | Chữ ký ABI của hàm. |

**Ví dụ**

```javascript
// Từ một đối tượng giao diện JSON
> caver.abi.encodeFunctionSignature({
    name: 'myMethod',
    type: 'function',
    inputs: [{
        type: 'uint256',
        name: 'myNumber'
    },{
        type: 'string',
        name: 'mystring'
    }]
})
'0x24ee0097'

// Từ một chữ ký hàm
> caver.abi.encodeFunctionSignature('myMethod(uint256,string)')
'0x24ee0097'
```

## encodeEventSignature <a id="encodeeventsignature"></a>

```javascript
caver.abi.encodeEventSignature(eventSignature)
```

Mã hóa chữ ký sự kiện thành chữ ký ABI - là hàm băm sha3 của tên sự kiện bao gồm các loại tham số đầu vào.

**Tham số**

| Tên            | type                   | Mô tả                                                                                                                                                                                     |
| -------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| eventSignature | chuỗi &#124; đối tượng | Chữ ký sự kiện hoặc đối tượng giao diện JSON của sự kiện cần mã hóa. Nếu đây là một chuỗi thì chuỗi này phải ở dạng `event(type,type,...)`, vd: `myEvent(uint256,uint32[],bytes10,bytes)` |

**Giá trị trả về**

| Loại | Mô tả                   |
| ----- | ----------------------- |
| chuỗi | Chữ ký ABI của sự kiện. |

**Ví dụ**

```javascript
// Từ một đối tượng giao diện JSON
> caver.abi.encodeEventSignature({
    name: 'myEvent',
    type: 'event',
    inputs: [{
        type: 'uint256',
        name: 'myNumber'
    },{
        type: 'bytes32',
        name: 'myBytes'
    }]
})
'0xf2eeb729e636a8cb783be044acf6b7b1e2c5863735b60d6daae84c366ee87d97'

// Từ một chữ ký sự kiện
> caver.abi.encodeEventSignature('myEvent(uint256,bytes32)')
'0xf2eeb729e636a8cb783be044acf6b7b1e2c5863735b60d6daae84c366ee87d97'
```

## encodeParameter <a id="encodeparameter"></a>

```javascript
caver.abi.encodeParameter(type, parameter)
```

Mã hóa một tham số dưới dạng ABI dựa trên loại của tham số đó.

**Tham số**

| Tên       | Loại                  | Mô tả                                                                                                             |
| --------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------- |
| type      | chuỗi &#124; đối tượng | Xem danh sách các loại tham số tại  [tài liệu về solidity](http://solidity.readthedocs.io/en/develop/types.html). |
| parameter | Hỗn hợp                | Tham số thực tế để mã hóa.                                                                                        |

**LƯU Ý** Loại `tuple` được hỗ trợ kể từ caver-js phiên bản [v1.6.0](https://www.npmjs.com/package/caver-js/v/1.6.0). Để biết thêm thông tin chi tiết về loại `tuple`, vui lòng tham khảo [Tài liệu về solidity](https://docs.soliditylang.org/en/v0.6.10/abi-spec.html#handling-tuple-types).

**Giá trị trả về**

| Loại | Mô tả                              |
| ----- | ---------------------------------- |
| chuỗi | Tham số được mã hóa dưới dạng ABI. |

**Ví dụ**

```javascript
> caver.abi.encodeParameter('uint256', '2345675643')
'0x000000000000000000000000000000000000000000000000000000008bd02b7b'

> caver.abi.encodeParameter('bytes32', caver.utils.rightPad('0xdf3234', 64))
'0xdf32340000000000000000000000000000000000000000000000000000000000'

> caver.abi.encodeParameter('bytes', '0xdf3234')
'0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000003df32340000000000000000000000000000000000000000000000000000000000'

> caver.abi.encodeParameter('bytes32[]', [caver.utils.rightPad('0xdf3234', 64), caver.utils.rightPad('0xfdfd', 64)])
'0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002df32340000000000000000000000000000000000000000000000000000000000fdfd000000000000000000000000000000000000000000000000000000000000'

> caver.abi.encodeParameter('tuple(bytes32,bool)', ['0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a18', true])
'0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a180000000000000000000000000000000000000000000000000000000000000001'

> caver.abi.encodeParameter(
    {
        components: [{ name: 'a', type: 'bytes32' }, { name: 'b', type: 'bool' }],
        name: 'tupleExample',
        type: 'tuple',
    },
    ['0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a18', true]
)
'0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a180000000000000000000000000000000000000000000000000000000000000001'
```

## encodeParameters <a id="encodeparameters"></a>

```javascript
caver.abi.encodeParameters(typesArray, parameters)
```

Mã hóa các tham số hàm dựa trên đối tượng giao diện JSON của các tham số đó.

**Tham số**

| Tên        | Loại                 | Mô tả                                                                                                                                                        |
| ---------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| typesArray | Mảng &#124; đối tượng | Một mảng có các loại hoặc giao diện JSON của hàm. Xem danh sách các loại trong [tài liệu về solidity](http://solidity.readthedocs.io/en/develop/types.html). |
| Tham số    | Mảng                  | Các tham số để mã hóa.                                                                                                                                       |

**LƯU Ý** Loại `tuple` được hỗ trợ kể từ caver-js phiên bản [v1.6.0](https://www.npmjs.com/package/caver-js/v/1.6.0). Để biết thêm thông tin chi tiết về loại `tuple`, vui lòng tham khảo [Tài liệu về solidity](https://docs.soliditylang.org/en/v0.6.10/abi-spec.html#handling-tuple-types).

**Giá trị trả về**

| Loại | Mô tả                                  |
| ----- | -------------------------------------- |
| chuỗi | Các tham số được mã hóa dưới dạng ABI. |

**Ví dụ**

```javascript
> caver.abi.encodeParameters(['uint256','string'], ['2345675643', 'Hello!%'])
'0x000000000000000000000000000000000000000000000000000000008bd02b7b0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000748656c6c6f212500000000000000000000000000000000000000000000000000'

> caver.abi.encodeParameters(['uint8[]','bytes32'], [['34','255'], caver.utils.rightPad('0x324567fff', 64)])
'0x0000000000000000000000000000000000000000000000000000000000000040324567fff00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000002200000000000000000000000000000000000000000000000000000000000000ff'

> caver.abi.encodeParameters(
    ['tuple(bytes32,bool)', 'tuple(bool,address)'],
    [
        ['0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a18', true],
        [true, '0x77656c636f6d6520746f20657468657265756d2e']
    ]
)
'0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a180000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000077656c636f6d6520746f20657468657265756d2e'

> caver.abi.encodeParameters(
    [
        {
            components: [{ name: 'a', type: 'bytes32' }, { name: 'b', type: 'bool' }],
            name: 'tupleExample',
            type: 'tuple',
        },
        {
            components: [{ name: 'c', type: 'bool' }, { name: 'd', type: 'address' }],
            name: 'tupleExample2',
            type: 'tuple',
        },
    ],
    [
        ['0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a18', true],
        [true, '0x77656c636f6d6520746f20657468657265756d2e']
    ]
)
'0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a180000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000077656c636f6d6520746f20657468657265756d2e'
```

## encodeFunctionCall <a id="encodefunctioncall"></a>

```javascript
caver.abi.encodeFunctionCall(jsonInterface, parameters)
```

Mã hóa lệnh gọi hàm bằng cách sử dụng đối tượng giao diện JSON và các tham số đã cho.

**Tham số**

| Tên           | Loại     | Mô tả                                 |
| ------------- | --------- | ------------------------------------- |
| jsonInterface | đối tượng | Đối tượng giao diện JSON của một hàm. |
| Tham số       | Mảng      | Các tham số để mã hóa.                |

**Giá trị trả về**

| Loại | Mô tả                                                 |
| ----- | ----------------------------------------------------- |
| chuỗi | Lệnh gọi hàm được mã hóa ABI là chữ ký hàm + tham số. |

**Ví dụ**

```javascript
> caver.abi.encodeFunctionCall({
    name: 'myMethod',
    type: 'function',
    inputs: [{
        type: 'uint256',
        name: 'myNumber'
    },{
        type: 'string',
        name: 'mystring'
    }]
}, ['2345675643', 'Hello!%'])
'0x24ee0097000000000000000000000000000000000000000000000000000000008bd02b7b0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000748656c6c6f212500000000000000000000000000000000000000000000000000'
```

## decodeFunctionCall <a id="decodefunctioncall"></a>

```javascript
caver.abi.decodeFunctionCall(abi, functionCall)
```

Giải mã lệnh gọi hàm từ đối tượng abi của hàm hoặc chuỗi abi của hàm và trả về các tham số.

**LƯU Ý** `caver.abi.decodeFunctionCall` được hỗ trợ kể từ caver-js phiên bản [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3).

**Tham số**

| Tên          | Loại     | Mô tả                           |
| ------------ | --------- | ------------------------------- |
| abi          | đối tượng | Đối tượng abi của hàm.          |
| functionCall | chuỗi     | Chuỗi lệnh gọi hàm được mã hóa. |

**Giá trị trả về**

| Loại     | Mô tả                                                                                                                                                       |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| đối tượng | Một đối tượng bao gồm các tham số đơn giản. Bạn có thể sử dụng `result[0]` được cung cấp để có thể truy cập giống như một mảng theo thứ tự của các tham số. |

**Ví dụ**

```javascript
> caver.abi.decodeFunctionCall({
    name: 'myMethod',
    type: 'function',
    inputs: [{
        type: 'uint256',
        name: 'myNumber'
    },{
        type: 'string',
        name: 'mystring'
    }]
}, '0x24ee0097000000000000000000000000000000000000000000000000000000008bd02b7b0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000748656c6c6f212500000000000000000000000000000000000000000000000000')
Result {
  '0': '2345675643',
  '1': 'Hello!%',
  __length__: 2,
  myNumber: '2345675643',
  mystring: 'Hello!%'
}
```

## decodeParameter <a id="decodeparameter"></a>

```javascript
caver.abi.decodeParameter(type, hexstring)
```

Giải mã tham số được mã hóa dưới dạng ABI thành loại JavaScript của tham số đó.

**Tham số**

| Tên       | Loại                | Mô tả                                                                                                            |
| --------- | -------------------- | ---------------------------------------------------------------------------------------------------------------- |
| type      | chuỗi&#124;đối tượng | Xem danh sách các loại tham số tại [tài liệu về solidity](http://solidity.readthedocs.io/en/develop/types.html). |
| hexstring | Mảng                 | Mã byte ABI để giải mã.                                                                                          |

**LƯU Ý** Loại `tuple` được hỗ trợ kể từ caver-js phiên bản [v1.6.0](https://www.npmjs.com/package/caver-js/v/1.6.0). Để biết thêm thông tin chi tiết về loại `tuple`, vui lòng tham khảo [Tài liệu về solidity](https://docs.soliditylang.org/en/v0.6.10/abi-spec.html#handling-tuple-types).

**Giá trị trả về**

| Loại   | Mô tả                 |
| ------- | --------------------- |
| Hỗn hợp | Tham số được giải mã. |

**Ví dụ**

```javascript
> caver.abi.decodeParameter('uint256', '0x0000000000000000000000000000000000000000000000000000000000000010')
'16'

> caver.abi.decodeParameter('string', '0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000848656c6c6f212521000000000000000000000000000000000000000000000000')
'Hello!%!'

> caver.abi.decodeParameter('tuple(bytes32,bool)', '0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a180000000000000000000000000000000000000000000000000000000000000001')
[ '0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a18', true ]

> caver.abi.decodeParameter(
    {
        components: [{ name: 'a', type: 'bytes32' }, { name: 'b', type: 'bool' }],
        name: 'tupleExample',
        type: 'tuple',
    },
    '0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a180000000000000000000000000000000000000000000000000000000000000001'
)
[
    '0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a18',
    true,
    a: '0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a18',
    b: true
]
```

## decodeParameters <a id="decodeparameters"></a>

```javascript
caver.abi.decodeParameters(typesArray, hexstring)
```

Giải mã các tham số được mã hóa dưới dạng ABI thành loại JavaScript của các tham số đó.

**Tham số**
| Tên        | Loại                 | Mô tả                                                                                                                                                                                  |
| ---------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| typesArray | Mảng &#124; đối tượng | Một mảng có nhiều loại hoặc một mảng các kết quả đầu ra của giao diện JSON. Xem danh sách các loại trong [tài liệu về solidity](http://solidity.readthedocs.io/en/develop/types.html). |
| hexstring  | chuỗi                 | Mã byte ABI để giải mã.                                                                                                                                                                |

**LƯU Ý** Loại `tuple` được hỗ trợ kể từ caver-js phiên bản [v1.6.0](https://www.npmjs.com/package/caver-js/v/1.6.0). Để biết thêm thông tin chi tiết về loại `tuple`, vui lòng tham khảo [Tài liệu về solidity](https://docs.soliditylang.org/en/v0.6.10/abi-spec.html#handling-tuple-types).

**Giá trị trả về**

| Loại     | Mô tả                                            |
| --------- | ------------------------------------------------ |
| đối tượng | Đối tượng kết quả chứa các tham số được giải mã. |

**Ví dụ**

```javascript
> caver.abi.decodeParameters(['string', 'uint256'], '0x000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000ea000000000000000000000000000000000000000000000000000000000000000848656c6c6f212521000000000000000000000000000000000000000000000000')
Result { '0': 'Hello!%!', '1': '234' }

> caver.abi.decodeParameters([{
        type: 'string',
        name: 'mystring'
    },{
        type: 'uint256',
        name: 'myNumber'
    }], '0x000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000ea000000000000000000000000000000000000000000000000000000000000000848656c6c6f212521000000000000000000000000000000000000000000000000')
Result {
    '0': 'Hello!%!',
    '1': '234',
    mystring: 'Hello!%!',
    myNumber: '234'
}

> caver.abi.decodeParameters(
    ['tuple(bytes32,bool)', 'tuple(bool,address)'],
    '0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a180000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000077656c636f6d6520746f20657468657265756d2e'
)
Result {
    '0': [ '0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a18', true ],
    '1': [ true, '0x77656c636f6d6520746F20657468657265756d2E' ],
}

> caver.abi.decodeParameters(
    [
        {
            components: [{ name: 'a', type: 'bytes32' }, { name: 'b', type: 'bool' }],
            name: 'tupleExample',
            type: 'tuple',
        },
        {
            components: [{ name: 'c', type: 'bool' }, { name: 'd', type: 'address' }],
            name: 'tupleExample2',
            type: 'tuple',
        },
    ],
    '0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a180000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000077656c636f6d6520746f20657468657265756d2e'
)
Result {
    '0': [
        '0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a18',
        true,
        a: '0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a18',
        b: true
    ],
    '1': [
        true,
        '0x77656c636f6d6520746F20657468657265756d2E',
        c: true,
        d: '0x77656c636f6d6520746F20657468657265756d2E'
    ],
    tupleExample: [
        '0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a18',
        true,
        a: '0xabdef18710a18a18abdef18710a18a18abdef18710a18a18abdef18710a18a18',
        b: true
    ],
    tupleExample2: [
        true,
        '0x77656c636f6d6520746F20657468657265756d2E',
        c: true,
        d: '0x77656c636f6d6520746F20657468657265756d2E'
    ]
}
```

## decodeLog <a id="decodelog"></a>

```javascript
caver.abi.decodeLog(inputs, hexstring, topics)
```

Giải mã dữ liệu bản ghi được mã hóa dưới dạng ABI và dữ liệu chủ đề được lập chỉ mục.

**Tham số**
| Tên       | Loại | Mô tả                                                                                                                                       |
| --------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| inputs    | Mảng  | Một mảng đầu vào giao diện JSON. Xem danh sách các loại trong [tài liệu về solidity](http://solidity.readthedocs.io/en/develop/types.html). |
| hexstring | chuỗi | Mã byte ABI trong trường `data` của bản ghi.                                                                                                |
| chủ đề    | Mảng  | Một mảng các chủ đề tham số chỉ mục của bản ghi. Mảng không có chủ đề[0] nếu là sự kiện không ẩn danh, nếu không, mảng sẽ có chủ đề[0].     |

**Giá trị trả về**

| Loại     | Mô tả                                      |
| --------- | ------------------------------------------ |
| đối tượng | Đối tượng kết quả chứa bản ghi đã giải mã. |

**Ví dụ**

```javascript
> caver.abi.decodeLog([{
        type: 'string',
        name: 'mystring'
    },{
        type: 'uint256',
        name: 'myNumber',
        indexed: true
    },{
        type: 'uint8',
        name: 'mySmallNumber',
        indexed: true
    }],
    '0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000748656c6c6f252100000000000000000000000000000000000000000000000000',
    ['0x000000000000000000000000000000000000000000000000000000000000f310', '0x0000000000000000000000000000000000000000000000000000000000000010'])
Result {
    '0': 'Hello%!',
    '1': '62224',
    '2': '16',
    mystring: 'Hello%!',
    myNumber: '62224',
    mySmallNumber: '16'
}
```

## encodeContractDeploy <a id="encodecontractdeploy"></a>

```javascript
caver.abi.encodeContractDeploy(jsonInterface, hexstring [, params])
```

Mã hóa bytecode hợp đồng thông minh với các đối số của hàm tạo.

**Tham số**
| Tên           | Loại   | Mô tả                                                    |
| ------------- | ------- | -------------------------------------------------------- |
| jsonInterface | Mảng    | Giao diện JSON của hợp đồng.                             |
| hexstring     | chuỗi   | Một bytecode của hợp đồng thông minh sẽ được triển khai. |
| params        | Hỗn hợp | (tùy chọn) Các đối số để chuyển đến hàm tạo.             |

**Giá trị trả về**

| Loại | Mô tả                                                                                                       |
| ----- | ----------------------------------------------------------------------------------------------------------- |
| chuỗi | Việc triển khai hợp đồng thông minh được mã hóa dưới dạng ABI với các đối số hàm tạo là byteCode + tham số. |

**Ví dụ**

```javascript
// Không có đối số cho hàm tạo
> caver.abi.encodeContractDeploy([
        {"constant": true, "inputs": [], "name": "count", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": true, "inputs": [], "name": "getBlockNumber", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": false, "inputs": [ { "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }
    ],'0x60806040526000805534801561001457600080fd5b50610116806100246000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a7230582064856de85a2706463526593b08dd790054536042ef66d3204018e6790a2208d10029')
'0x60806040526000805534801561001457600080fd5b50610116806100246000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a7230582064856de85a2706463526593b08dd790054536042ef66d3204018e6790a2208d10029'

// Có một đối số cho hàm tạo(uint256)
> caver.abi.encodeContractDeploy([ 
        { "constant": true, "inputs": [], "name": "count", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": true, "inputs": [], "name": "getBlockNumber", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": false, "inputs": [ { "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, 
        { "inputs": [ { "name": "_a", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } 
    ],'0x60806040526000805534801561001457600080fd5b5060405160208061015d8339810180604052810190808051906020019092919050505050610116806100476000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a72305820ec774499bcdb89d9e570156a76249b33e99c766dfc6944e55aeeca316b41debf0029', 1)
'0x60806040526000805534801561001457600080fd5b5060405160208061015d8339810180604052810190808051906020019092919050505050610116806100476000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a72305820ec774499bcdb89d9e570156a76249b33e99c766dfc6944e55aeeca316b41debf00290000000000000000000000000000000000000000000000000000000000000001'

// Có hai đối số cho hàm tạo(uint256, uint256)
> caver.abi.encodeContractDeploy([ 
        { "constant": true, "inputs": [], "name": "count", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": true, "inputs": [], "name": "getBlockNumber", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": false, "inputs": [ { "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, 
        { "inputs": [ { "name": "_a", "type": "uint256" }, { "name": "_b", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } 
    ],'0x60806040526000805534801561001457600080fd5b5060405160408061016883398101806040528101908080519060200190929190805190602001909291905050505050610116806100526000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a72305820f85b40d5ad70d0b3599200515915dca3074bcf609f27660845ecbfe882d3eeee0029', 1, 2)
'0x60806040526000805534801561001457600080fd5b5060405160408061016883398101806040528101908080519060200190929190805190602001909291905050505050610116806100526000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a72305820f85b40d5ad70d0b3599200515915dca3074bcf609f27660845ecbfe882d3eeee002900000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002'

// Có một đối số cho hàm tạo(chuỗi)
> caver.abi.encodeContractDeploy([ 
        { "constant": true, "inputs": [], "name": "count", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": true, "inputs": [], "name": "getBlockNumber", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": false, "inputs": [ { "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, 
        { "inputs": [ { "name": "_a", "type": "string" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } 
    ],'0x60806040526000805534801561001457600080fd5b5060405161015d38038061015d8339810180604052810190808051820192919050505050610116806100476000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a7230582082c35290d5a3c5f9ae552e0f638388cdc57d596a0973febe5de8eb9ee6df48a60029', 'stringParams')
'0x60806040526000805534801561001457600080fd5b5060405161015d38038061015d8339810180604052810190808051820192919050505050610116806100476000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a7230582082c35290d5a3c5f9ae552e0f638388cdc57d596a0973febe5de8eb9ee6df48a600290000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000c737472696e67506172616d730000000000000000000000000000000000000000'
```
