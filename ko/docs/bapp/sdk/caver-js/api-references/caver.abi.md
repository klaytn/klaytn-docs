# caver.abi <a id="caver-abi"></a>

The `caver.abi` package allows you to decode and encode parameters with an ABI (Application Binary Interface). This will be used for calling functions of a deployed smart contracts.

## encodeFunctionSignature <a id="encodefunctionsignature"></a>

```javascript
caver.abi.encodeFunctionSignature(functionSignature)
```

Encodes the function signature to its ABI signature, which are the first 4 bytes of the sha3 hash of the function name including parameter types.

**매개변수**

| 명칭                | 타입                   | 설명                                                                                                                                                                                                         |
| ----------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| functionSignature | string &#124; object | The function signature or the JSON interface object of the function to encode. If this is a string, it has to be in the form `function(type, type,...)`, e.g: `myFunction(uint256,uint32[],bytes10,bytes)` |

**리턴값**

| 타입  | 설명          |
| --- | ----------- |
| 문자열 | 함수의 ABI 서명. |

**예제**

```javascript
// From a JSON interface object
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

// From a function signature
> caver.abi.encodeFunctionSignature('myMethod(uint256,string)')
'0x24ee0097'
```

## encodeEventSignature <a id="encodeeventsignature"></a>

```javascript
caver.abi.encodeEventSignature(eventSignature)
```

Encodes the event signature to its ABI signature, which is the sha3 hash of the event name including input parameter types.

**매개변수**

| 명칭             | 타입                   | 설명                                                                                                                                                                                            |
| -------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| eventSignature | string &#124; object | The event signature or the JSON interface object of the event to encode. If this is a string, it has to be in the form `event(type,type,...)`, e.g: `myEvent(uint256,uint32[],bytes10,bytes)` |

**리턴값**

| 타입  | 설명           |
| --- | ------------ |
| 문자열 | 이벤트의 ABI 서명. |

**예제**

```javascript
// From a JSON interface object
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

// From an event signature
> caver.abi.encodeEventSignature('myEvent(uint256,bytes32)')
'0xf2eeb729e636a8cb783be044acf6b7b1e2c5863735b60d6daae84c366ee87d97'
```

## encodeParameter <a id="encodeparameter"></a>

```javascript
caver.abi.encodeParameter(type, parameter)
```

타입에 따라 매개변수를 ABI 표현으로 인코딩합니다.

**매개변수**

| 명칭        | 타입                   | 설명                                                                                                                                      |
| --------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 형식        | string &#124; object | The type of the parameter, see the [solidity documentation](http://solidity.readthedocs.io/en/develop/types.html)  for a list of types. |
| parameter | 복합                   | 인코딩할 실제 매개변수.                                                                                                                           |

**NOTE** `tuple` type is supported since caver-js [v1.6.0](https://www.npmjs.com/package/caver-js/v/1.6.0). For more details about `tuple` type, please refer to [Solidity Docs](https://docs.soliditylang.org/en/v0.6.10/abi-spec.html#handling-tuple-types).

**리턴값**

| 타입  | 설명             |
| --- | -------------- |
| 문자열 | ABI 인코딩된 매개변수. |

**예제**

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

JSON 인터페이스 객체를 기반으로 함수 매개변수를 인코딩합니다.

**매개변수**

| 명칭         | 타입                  | 설명                                                                                                                                                   |
| ---------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| typesArray | Array &#124; object | An array with types or a JSON interface of a function. 타입 목록은 [solidity documentation](http://solidity.readthedocs.io/en/develop/types.html)를 참조하세요. |
| parameters | Array               | 인코딩할 매개변수.                                                                                                                                           |

**NOTE** `tuple` type is supported since caver-js [v1.6.0](https://www.npmjs.com/package/caver-js/v/1.6.0). For more details about `tuple` type, please refer to [Solidity Docs](https://docs.soliditylang.org/en/v0.6.10/abi-spec.html#handling-tuple-types).

**리턴값**

| 타입  | 설명             |
| --- | -------------- |
| 문자열 | ABI 인코딩된 매개변수. |

**예제**

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

JSON 인터페이스 객체 및 주어진 매개변수를 사용하여 함수 호출을 인코딩합니다.

**매개변수**

| 명칭            | 타입     | 설명                 |
| ------------- | ------ | ------------------ |
| jsonInterface | object | 함수의 JSON 인터페이스 객체. |
| parameters    | Array  | 인코딩할 매개변수.         |

**리턴값**

| 타입  | 설명                                 |
| --- | ---------------------------------- |
| 문자열 | 함수 서명 + 매개변수를 의미하는 ABI 인코딩된 함수 호출. |

**예제**

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

## decodeParameter <a id="decodeparameter"></a>

```javascript
caver.abi.decodeParameter(type, hexstring)
```

ABI 인코딩된 매개변수를 자바스크립트 타입으로 디코딩합니다.

**매개변수**

| 명칭        | 타입                 | 설명                                                                                                                                     |
| --------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| 형식        | string&#124;object | The type of the parameter, see the [solidity documentation](http://solidity.readthedocs.io/en/develop/types.html) for a list of types. |
| hexstring | Array              | 디코딩할 ABI 바이트 코드.                                                                                                                       |

**NOTE** `tuple` type is supported since caver-js [v1.6.0](https://www.npmjs.com/package/caver-js/v/1.6.0). For more details about `tuple` type, please refer to [Solidity Docs](https://docs.soliditylang.org/en/v0.6.10/abi-spec.html#handling-tuple-types).

**리턴값**

| 타입 | 설명         |
| -- | ---------- |
| 복합 | 디코딩된 매개변수. |

**예제**

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

ABI 인코딩된 매개변수를 자바스크립트 타입으로 디코딩합니다.

**매개변수**
| 명칭         | 타입                  | 설명                                                                                                                                                       |
| ---------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| typesArray | Array &#124; object | An array with types or an array of JSON interface outputs. 타입 목록은 [solidity documentation](http://solidity.readthedocs.io/en/develop/types.html)를 참조하세요. |
| hexstring  | 문자열                 | 디코딩할 ABI 바이트 코드.                                                                                                                                         |

**NOTE** `tuple` type is supported since caver-js [v1.6.0](https://www.npmjs.com/package/caver-js/v/1.6.0). For more details about `tuple` type, please refer to [Solidity Docs](https://docs.soliditylang.org/en/v0.6.10/abi-spec.html#handling-tuple-types).

**리턴값**

| 타입     | 설명                     |
| ------ | ---------------------- |
| object | 디코딩된 매개변수를 포함하는 결과 객체. |

**예제**

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

ABI 인코딩된 로그 데이터 및 인덱싱된 토픽 데이터를 디코딩합니다.

**매개변수**
| 명칭        | 타입    | 설명                                                                                                                                                 |
| --------- | ----- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| inputs    | Array | An array of JSON interface inputs. 타입 목록은 [solidity documentation](http://solidity.readthedocs.io/en/develop/types.html)를 참조하세요.                   |
| hexstring | 문자열   | 로그의 `data` 필드에 있는 ABI 바이트 코드.                                                                                                                      |
| topics    | Array | An array of the index parameter topics of the log. This array doesn't have topic[0] if it is a non-anonymous event, or otherwise, it has topic[0]. |

**리턴값**

| 타입     | 설명                                             |
| ------ | ---------------------------------------------- |
| object | The result object containing the decoded logs. |

**예제**

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

Encodes smart contract bytecode with the arguments of the constructor.

**매개변수**
| 명칭            | 타입    | 설명                                               |
| ------------- | ----- | ------------------------------------------------ |
| jsonInterface | Array | 컨트랙트의 JSON 인터페이스.                                |
| hexstring     | 문자열   | 배포할 스마트 컨트랙트의 바이트코드.                             |
| params        | 복합    | (optional) Arguments to pass to the constructor. |

**리턴값**

| 타입  | 설명                                                   |
| --- | ---------------------------------------------------- |
| 문자열 | 바이트코드 + 매개변수를 의미하는 생성자 인자를 포함한 ABI 인코딩된 스마트 컨트랙트 배포. |

**예제**

```javascript
// There is no argument for constructor
> caver.abi.encodeContractDeploy([
        {"constant": true, "inputs": [], "name": "count", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": true, "inputs": [], "name": "getBlockNumber", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": false, "inputs": [ { "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }
    ],'0x60806040526000805534801561001457600080fd5b50610116806100246000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a7230582064856de85a2706463526593b08dd790054536042ef66d3204018e6790a2208d10029')
'0x60806040526000805534801561001457600080fd5b50610116806100246000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a7230582064856de85a2706463526593b08dd790054536042ef66d3204018e6790a2208d10029'

// There is one argument for constructor(uint256)
> caver.abi.encodeContractDeploy([ 
        { "constant": true, "inputs": [], "name": "count", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": true, "inputs": [], "name": "getBlockNumber", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": false, "inputs": [ { "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, 
        { "inputs": [ { "name": "_a", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } 
    ],'0x60806040526000805534801561001457600080fd5b5060405160208061015d8339810180604052810190808051906020019092919050505050610116806100476000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a72305820ec774499bcdb89d9e570156a76249b33e99c766dfc6944e55aeeca316b41debf0029', 1)
'0x60806040526000805534801561001457600080fd5b5060405160208061015d8339810180604052810190808051906020019092919050505050610116806100476000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a72305820ec774499bcdb89d9e570156a76249b33e99c766dfc6944e55aeeca316b41debf00290000000000000000000000000000000000000000000000000000000000000001'

// There are two arguments for constructor(uint256, uint256)
> caver.abi.encodeContractDeploy([ 
        { "constant": true, "inputs": [], "name": "count", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": true, "inputs": [], "name": "getBlockNumber", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": false, "inputs": [ { "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, 
        { "inputs": [ { "name": "_a", "type": "uint256" }, { "name": "_b", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } 
    ],'0x60806040526000805534801561001457600080fd5b5060405160408061016883398101806040528101908080519060200190929190805190602001909291905050505050610116806100526000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a72305820f85b40d5ad70d0b3599200515915dca3074bcf609f27660845ecbfe882d3eeee0029', 1, 2)
'0x60806040526000805534801561001457600080fd5b5060405160408061016883398101806040528101908080519060200190929190805190602001909291905050505050610116806100526000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a72305820f85b40d5ad70d0b3599200515915dca3074bcf609f27660845ecbfe882d3eeee002900000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002'

// There is one argument for constructor(string)
> caver.abi.encodeContractDeploy([ 
        { "constant": true, "inputs": [], "name": "count", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": true, "inputs": [], "name": "getBlockNumber", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": false, "inputs": [ { "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, 
        { "inputs": [ { "name": "_a", "type": "string" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } 
    ],'0x60806040526000805534801561001457600080fd5b5060405161015d38038061015d8339810180604052810190808051820192919050505050610116806100476000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a7230582082c35290d5a3c5f9ae552e0f638388cdc57d596a0973febe5de8eb9ee6df48a60029', 'stringParams')
'0x60806040526000805534801561001457600080fd5b5060405161015d38038061015d8339810180604052810190808051820192919050505050610116806100476000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a7230582082c35290d5a3c5f9ae552e0f638388cdc57d596a0973febe5de8eb9ee6df48a600290000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000c737472696e67506172616d730000000000000000000000000000000000000000'
```
