---
description: >-
  caver-js API liên quan đến mã hóa và giải mã ABI.
---

# caver.klay.abi <a id="caver-klay-abi"></a>

Gói `caver-klay-abi` cho phép bạn khử và mã hóa các tham số từ ABI (Giao diện nhị phân ứng dụng). Nó được sử dụng để gọi các hàm của hợp đồng thông minh đã triển khai.

## encodeFunctionSignature <a id="encodefunctionsignature"></a>

```javascript
caver.klay.abi.encodeFunctionSignature(functionSignature)
```

Mã hóa chữ ký hàm thành chữ ký ABI của nó, là 4 byte đầu tiên của hàm băm sha3 của tên hàm bao gồm các loại.

**Tham số**

| Tên               | Loại                   | Mô tả                                                                                                                                                                             |
| ----------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| functionSignature | Chuỗi &#124; Đối tượng | Chữ ký hàm hoặc đối tượng giao diện JSON của hàm cần mã hóa. Nếu đây là một chuỗi thì nó phải ở dạng `function(type, type,...)`, vd: `myFunction(uint256,uint32[],bytes10,bytes)` |

**Giá trị trả về**

| Loại  | Mô tả               |
| ----- | ------------------- |
| Chuỗi | Chữ ký ABI của hàm. |

**Ví dụ**

```javascript
// Từ một đối tượng giao diện JSON
caver.klay.abi.encodeFunctionSignature({
    name: 'myMethod',
    type: 'function',
    inputs: [{
        type: 'uint256',
        name: 'myNumber'
    },{
        type: 'string',
        name: 'myString'
    }]
})
> 0x24ee0097

// Từ một chữ ký chức năng
caver.klay.abi.encodeFunctionSignature('myMethod(uint256,string)')
> '0x24ee0097'
```

## encodeEventSignature <a id="encodeeventsignature"></a>

```javascript
caver.klay.abi.encodeEventSignature(eventSignature)
```

Mã hóa chữ ký sự kiện thành chữ ký ABI của nó, là hàm băm sha3 của tên sự kiện bao gồm các loại đầu vào.

**Tham số**

| Tên            | Loại                   | Mô tả                                                                                                                                                                           |
| -------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| eventSignature | Chuỗi &#124; Đối tượng | Chữ ký sự kiện hoặc đối tượng giao diện JSON của sự kiện cần mã hóa. Nếu đây là một chuỗi, nó phải ở dạng `event(type,type,...)`, vd: `myEvent(uint256,uint32[],bytes10,bytes)` |

**Giá trị trả về**

| Loại | Mô tả                   |
| ----- | ----------------------- |
| Chuỗi | Chữ ký ABI của sự kiện. |

**Ví dụ**

```javascript
// Từ một đối tượng giao diện JSON
caver.klay.abi.encodeEventSignature({
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
> 0xf2eeb729e636a8cb783be044acf6b7b1e2c5863735b60d6daae84c366ee87d97

// Từ một chữ ký sự kiện
caver.klay.abi.encodeEventSignature('myEvent(uint256,bytes32)')
> 0xf2eeb729e636a8cb783be044acf6b7b1e2c5863735b60d6daae84c366ee87d97
```

## encodeParameter <a id="encodeparameter"></a>

```javascript
caver.klay.abi.encodeParameter(type, parameter)
```

Mã hóa một tham số dựa trên loại của nó thành sự biểu diễn ABI của nó.

**Tham số**

| Tên     | Loại                  | Mô tả                                                                                                             |
| ------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------- |
| loại   | Chuỗi &#124; Đối tượng | Xem danh sách các loại tham số tại  [tài liệu về solidity](http://solidity.readthedocs.io/en/develop/types.html). |
| tham số | Hỗn hợp                | Tham số thực tế để mã hóa.                                                                                        |

**Return Value**

| Type   | Description                |
| ------ | -------------------------- |
| String | The ABI encoded parameter. |

**Examples**

```javascript
caver.klay.abi.encodeParameter('uint256', '2345675643')
> "0x000000000000000000000000000000000000000000000000000000008bd02b7b"

caver.klay.abi.encodeParameter('bytes32', caver.utils.rightPad('0xdf3234', 64))
> "0xdf32340000000000000000000000000000000000000000000000000000000000"

caver.klay.abi.encodeParameter('bytes', '0xdf3234')
> "0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000003df32340000000000000000000000000000000000000000000000000000000000"

caver.klay.abi.encodeParameter('bytes32[]', [caver.utils.rightPad('0xdf3234', 64), caver.utils.rightPad('0xfdfd', 64)])
> "00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002df32340000000000000000000000000000000000000000000000000000000000fdfd000000000000000000000000000000000000000000000000000000000000"
```

## encodeParameters <a id="encodeparameters"></a>

```javascript
caver.klay.abi.encodeParameters(typesArray, parameters)
```

Encodes function parameters based on its JSON interface object.

**Parameters**

| Name       | Type                                  | Description                                                                                                                                                        |
| ---------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| typesArray | Array<String&#124;Object>&#124;Object | An array with types or a JSON interface of a function. See the [solidity documentation](http://solidity.readthedocs.io/en/develop/types.html) for a list of types. |
| parameters | Array                                 | The parameters to encode.                                                                                                                                          |

**Return Value**

| Type   | Description                 |
| ------ | --------------------------- |
| String | The ABI encoded parameters. |

**Examples**

```javascript
caver.klay.abi.encodeParameters(['uint256','string'], ['2345675643', 'Hello!%'])
> "0x000000000000000000000000000000000000000000000000000000008bd02b7b0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000748656c6c6f212500000000000000000000000000000000000000000000000000"

caver.klay.abi.encodeParameters(['uint8[]','bytes32'], [['34','255'], caver.utils.rightPad('0x324567fff', 64)])
> "0x0000000000000000000000000000000000000000000000000000000000000040324567fff00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000002200000000000000000000000000000000000000000000000000000000000000ff"
```

## encodeFunctionCall <a id="encodefunctioncall"></a>

```javascript
caver.klay.abi.encodeFunctionCall(jsonInterface, parameters)
```

Encodes a function call using its JSON interface object and given parameters.

**Parameters**

| Name          | Type   | Description                              |
| ------------- | ------ | ---------------------------------------- |
| jsonInterface | Object | The JSON interface object of a function. |
| parameters    | Array  | The parameters to encode.                |

**Return Value**

| Type   | Description                                                                 |
| ------ | --------------------------------------------------------------------------- |
| String | The ABI encoded function call, which means function signature + parameters. |

**Examples**

```javascript
caver.klay.abi.encodeFunctionCall({
    name: 'myMethod',
    type: 'function',
    inputs: [{
        type: 'uint256',
        name: 'myNumber'
    },{
        type: 'string',
        name: 'myString'
    }]
}, ['2345675643', 'Hello!%'])
> "0x24ee0097000000000000000000000000000000000000000000000000000000008bd02b7b0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000748656c6c6f212500000000000000000000000000000000000000000000000000"
```

## decodeParameter <a id="decodeparameter"></a>

```javascript
caver.klay.abi.decodeParameter(type, hexString)
```

Giải mã tham số được mã hóa ABI thành loại JavaScript của nó.

**Tham số**

| Tên       | Loại              | Mô tả                                                                                                            |
| --------- | ------------------ | ---------------------------------------------------------------------------------------------------------------- |
| loại     | String&#124;Object | Xem danh sách các loại tham số tại [tài liệu về solidity](http://solidity.readthedocs.io/en/develop/types.html). |
| hexString | Mảng               | Mã byte ABI để giải mã.                                                                                          |

**Giá trị Trả về**

| Loại   | Mô tả                 |
| ------- | --------------------- |
| Hỗn hợp | Tham số được giải mã. |

**Ví dụ**

```javascript
caver.klay.abi.decodeParameter('uint256', '0x0000000000000000000000000000000000000000000000000000000000000010')
> "16"

caver.klay.abi.decodeParameter('string', '0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000848656c6c6f212521000000000000000000000000000000000000000000000000')
> "Hello!%!"
```

## decodeParameters <a id="decodeparameters"></a>

```javascript
caver.klay.abi.decodeParameters(typesArray, hexString)
```

Giải mã các tham số được mã hóa ABI thành các loại JavaScript của nó.

**Tham số**
| Tiêu đề    | Loại                                 | Mô tả                                                                                                                                                                |
| ---------- | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| typesArray | Array<String&#124;Object>&#124;Object | Một mảng có các loại hoặc một mảng đầu ra giao diện JSON. Xem danh sách các loại trong [tài liệu về solidity](http://solidity.readthedocs.io/en/develop/types.html). |
| hexString  | Chuỗi                                 | Mã byte ABI để giải mã.                                                                                                                                              |

**Giá trị trả về**

| Loại      | Mô tả                                            |
| --------- | ------------------------------------------------ |
| Đối tượng | Đối tượng kết quả chứa các tham số được giải mã. |

**Ví dụ**

```javascript
caver.klay.abi.decodeParameters(['string', 'uint256'], '0x000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000ea000000000000000000000000000000000000000000000000000000000000000848656c6c6f212521000000000000000000000000000000000000000000000000')
> Result { '0': 'Hello!%!', '1': '234' }

caver.klay.abi.decodeParameters([{
        type: 'string',
        name: 'myString'
    },{
        type: 'uint256',
        name: 'myNumber'
    }], '0x000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000ea000000000000000000000000000000000000000000000000000000000000000848656c6c6f212521000000000000000000000000000000000000000000000000')
> Result {
    '0': 'Hello!%!',
    '1': '234',
    myString: 'Hello!%!',
    myNumber: '234'
}
```

## decodeLog <a id="decodelog"></a>

```javascript
caver.klay.abi.decodeLog(inputs, hexString, topics)
```

Giải mã dữ liệu nhật ký được mã hóa ABI và dữ liệu chủ đề được lập chỉ mục.

**Tham số**
| Tiêu đề   | Loại | Mô tả                                                                                                                                       |
| --------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| đầu vào   | Mảng  | Một mảng đầu vào giao diện JSON. Xem danh sách các loại trong [tài liệu về solidity](http://solidity.readthedocs.io/en/develop/types.html). |
| hexString | Chuỗi | Mã byte ABI trong trường `dữ liệu` của nhật ký.                                                                                             |
| chủ đề    | Mảng  | Một mảng có tham số chỉ mục chủ đề của nhật ký, không có chủ đề[0] nếu đó là sự kiện không ẩn danh, ngược lại có chủ đề[0].                 |

**Giá trị trả về**

| Loại     | Mô tả                                            |
| --------- | ------------------------------------------------ |
| Đối tượng | Đối tượng kết quả chứa các tham số được giải mã. |

**Ví dụ**

```javascript
caver.klay.abi.decodeLog([{
        type: 'string',
        name: 'myString'
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
> Result {
    '0': 'Hello%!',
    '1': '62224',
    '2': '16',
    myString: 'Hello%!',
    myNumber: '62224',
    mySmallNumber: '16'
}
```

## encodeContractDeploy <a id="encodecontractdeploy"></a>

```javascript
caver.klay.abi.encodeContractDeploy(jsonInterface, hexString, params)
```

Mã hóa mã byte hợp đồng thông minh với các đối số của hàm tạo.

**Tham số**
| Tên           | Loại   | Mô tả                                                   |
| ------------- | ------- | ------------------------------------------------------- |
| jsonInterface | Mảng    | Giao diện JSON của hợp đồng.                            |
| hexString     | Chuỗi   | Một mã byte của hợp đồng thông minh sẽ được triển khai. |
| tham số       | Hỗn hợp | Các đối số để chuyển đến hàm tạo.                       |

**Giá trị trả về**

| Loại | Mô tả                                                                                             |
| ----- | ------------------------------------------------------------------------------------------------- |
| Chuỗi | Việc triển khai hợp đồng thông minh được mã hóa ABI với các đối số hàm tạo là byteCode + tham số. |

**Ví dụ**

```javascript
// Không có đối số cho hàm tạo
caver.klay.abi.encodeContractDeploy([
        {"constant": true, "inputs": [], "name": "count", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": true, "inputs": [], "name": "getBlockNumber", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": false, "inputs": [ { "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }
    ],'0x60806040526000805534801561001457600080fd5b50610116806100246000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a7230582064856de85a2706463526593b08dd790054536042ef66d3204018e6790a2208d10029')
> "0x60806040526000805534801561001457600080fd5b50610116806100246000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a7230582064856de85a2706463526593b08dd790054536042ef66d3204018e6790a2208d10029"

// Có một đối số cho hàm tạo (uint256)
caver.klay.abi.encodeContractDeploy([ 
        { "constant": true, "inputs": [], "name": "count", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": true, "inputs": [], "name": "getBlockNumber", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": false, "inputs": [ { "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, 
        { "inputs": [ { "name": "_a", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } 
    ],'0x60806040526000805534801561001457600080fd5b5060405160208061015d8339810180604052810190808051906020019092919050505050610116806100476000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a72305820ec774499bcdb89d9e570156a76249b33e99c766dfc6944e55aeeca316b41debf0029', 1)
> "0x60806040526000805534801561001457600080fd5b5060405160208061015d8339810180604052810190808051906020019092919050505050610116806100476000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a72305820ec774499bcdb89d9e570156a76249b33e99c766dfc6944e55aeeca316b41debf00290000000000000000000000000000000000000000000000000000000000000001"

// Có hai đối số cho hàm tạo (uint256, uint256)
caver.klay.abi.encodeContractDeploy([ 
        { "constant": true, "inputs": [], "name": "count", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": true, "inputs": [], "name": "getBlockNumber", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": false, "inputs": [ { "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, 
        { "inputs": [ { "name": "_a", "type": "uint256" }, { "name": "_b", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } 
    ],'0x60806040526000805534801561001457600080fd5b5060405160408061016883398101806040528101908080519060200190929190805190602001909291905050505050610116806100526000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a72305820f85b40d5ad70d0b3599200515915dca3074bcf609f27660845ecbfe882d3eeee0029', 1, 2)
> "0x60806040526000805534801561001457600080fd5b5060405160408061016883398101806040528101908080519060200190929190805190602001909291905050505050610116806100526000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a72305820f85b40d5ad70d0b3599200515915dca3074bcf609f27660845ecbfe882d3eeee002900000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002"

// Có một đối số cho hàm tạo (chuỗi)
caver.klay.abi.encodeContractDeploy([ 
        { "constant": true, "inputs": [], "name": "count", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": true, "inputs": [], "name": "getBlockNumber", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": false, "inputs": [ { "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, 
        { "inputs": [ { "name": "_a", "type": "string" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } 
    ],'0x60806040526000805534801561001457600080fd5b5060405161015d38038061015d8339810180604052810190808051820192919050505050610116806100476000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a7230582082c35290d5a3c5f9ae552e0f638388cdc57d596a0973febe5de8eb9ee6df48a60029', 'stringParams')
> "0x60806040526000805534801561001457600080fd5b5060405161015d38038061015d8339810180604052810190808051820192919050505050610116806100476000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a7230582082c35290d5a3c5f9ae552e0f638388cdc57d596a0973febe5de8eb9ee6df48a600290000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000c737472696e67506172616d730000000000000000000000000000000000000000"
```
