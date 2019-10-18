---
description: >-
  ABI 인코딩 및 디코딩과 관련된 caver-js API.
---

# caver.klay.abi

`caver-klay-abi` 패키지는 ABI(Application Binary Interface)의 매개변수를 디코드 및 인코드할 수 있도록 합니다. 배포된 스마트 컨트랙트의 함수를 호출하는 데 사용됩니다.

## encodeFunctionSignature

```javascript
caver.klay.abi.encodeFunctionSignature(functionSignature)
```

타입을 포함한 함수 이름의 sha3 해시의 첫 4바이트인 ABI 서명으로 함수 서명을 인코딩합니다.

**매개변수**

| 명칭                | 형식                   | 설명                                                                                                                             |
| ----------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| functionSignature | String &#124; Object | 인코딩할 함수의 함수 서명 또는 JSON 인터페이스 객체. 문자열인 경우 `function(type,type,...)` 형식이어야 합니다. 예시: `myFunction(uint256,uint32[],bytes10,bytes)` |

**리턴값**

| 형식     | 설명          |
| ------ | ----------- |
| String | 함수의 ABI 서명. |

**예제**

```javascript
// From a JSON interface object
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

// From a function signature
caver.klay.abi.encodeFunctionSignature('myMethod(uint256,string)')
> '0x24ee0097'
```

## encodeEventSignature

```javascript
caver.klay.abi.encodeEventSignature(eventSignature)
```

입력 타입을 포함한 이벤트 이름의 sha3 해시의 ABI 서명으로 이벤트 서명을 인코딩합니다.

**매개변수**

| 명칭             | 형식                   | 설명                                                                                                                         |
| -------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| eventSignature | String &#124; Object | 인코딩할 이벤트의 이벤트 서명 또는 JSON 인터페이스 객체. 문자열인 경우 `event(type,type,...)` 형식이어야 합니다. 예시: `myEvent(uint256,uint32[],bytes10,bytes)` |

**Return Value**

| 형식     | 설명           |
| ------ | ------------ |
| String | 이벤트의 ABI 서명. |

**예제**

```javascript
// From a JSON interface object
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

// From an event signature
caver.klay.abi.encodeEventSignature('myEvent(uint256,bytes32)')
> 0xf2eeb729e636a8cb783be044acf6b7b1e2c5863735b60d6daae84c366ee87d97
```

## encodeParameter

```javascript
caver.klay.abi.encodeParameter(type, parameter)
```

타입에 따라 매개변수를 ABI 표현으로 인코딩합니다.

**Parameters**

| 명칭        | 형식                   | 설명                                                                                                     |
| --------- | -------------------- | ------------------------------------------------------------------------------------------------------ |
| type      | String &#124; Object | 매개변수 타입, 타입 목록은 [solidity documentation](http://solidity.readthedocs.io/en/develop/types.html)를 참조하세요. |
| parameter | 복합                   | 인코딩할 실제 매개변수.                                                                                          |

**리턴값**

| 형식     | 설명             |
| ------ | -------------- |
| String | ABI 인코딩된 매개변수. |

**예제**

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

## encodeParameters

```javascript
caver.klay.abi.encodeParameters(typesArray, parameters)
```

JSON 인터페이스 객체를 기반으로 함수 매개변수를 인코딩합니다.

**매개변수**

| 명칭         | 형식                                    | 설명                                                                                                                      |
| ---------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| typesArray | Array<String&#124;Object>&#124;Object | 타입 또는 함수의 JSON 인터페이스의 배열. 타입 목록은 [solidity documentation](http://solidity.readthedocs.io/en/develop/types.html)를 참조하세요. |
| parameters | Array                                 | 인코딩할 매개변수.                                                                                                              |

**리턴값**

| 형식     | 설명             |
| ------ | -------------- |
| String | ABI 인코딩된 매개변수. |

**예제**

```javascript
caver.klay.abi.encodeParameters(['uint256','string'], ['2345675643', 'Hello!%'])
> "0x000000000000000000000000000000000000000000000000000000008bd02b7b0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000748656c6c6f212500000000000000000000000000000000000000000000000000"

caver.klay.abi.encodeParameters(['uint8[]','bytes32'], [['34','255'], caver.utils.rightPad('0x324567fff', 64)])
> "0x0000000000000000000000000000000000000000000000000000000000000040324567fff00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000002200000000000000000000000000000000000000000000000000000000000000ff"
```

## encodeFunctionCall

```javascript
caver.klay.abi.encodeFunctionCall(jsonInterface, parameters)
```

JSON 인터페이스 객체 및 주어진 매개변수를 사용하여 함수 호출을 인코딩합니다.

**매개변수**

| 명칭            | 형식     | 설명                 |
| ------------- | ------ | ------------------ |
| jsonInterface | Object | 함수의 JSON 인터페이스 객체. |
| parameters    | Array  | 인코딩할 매개변수.         |

**Return Value**

| 형식     | 설명                                 |
| ------ | ---------------------------------- |
| String | 함수 서명 + 매개변수를 의미하는 ABI 인코딩된 함수 호출. |

**예제**

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

## decodeParameter

```javascript
caver.klay.abi.decodeParameter(type, hexString)
```

ABI 인코딩된 매개변수를 자바스크립트 타입으로 디코딩합니다.

**매개변수**

| 명칭        | 형식                 | 설명                                                                                                     |
| --------- | ------------------ | ------------------------------------------------------------------------------------------------------ |
| type      | String&#124;Object | 매개변수 타입, 타입 목록은 [solidity documentation](http://solidity.readthedocs.io/en/develop/types.html)를 참조하세요. |
| hexString | Array              | 디코딩할 ABI 바이트 코드.                                                                                       |

**리턴값**

| 형식 | 설명         |
| -- | ---------- |
| 복합 | 디코딩된 매개변수. |

**Examples**

```javascript
caver.klay.abi.decodeParameter('uint256', '0x0000000000000000000000000000000000000000000000000000000000000010')
> "16"

caver.klay.abi.decodeParameter('string', '0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000848656c6c6f212521000000000000000000000000000000000000000000000000')
> "Hello!%!"
```

## decodeParameters

```javascript
caver.klay.abi.decodeParameters(typesArray, hexString)
```

ABI 인코딩된 매개변수를 자바스크립트 타입으로 디코딩합니다.

**Parameters**
| 명칭         | 형식                                    | 설명                                                                                                                            |
| ---------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| typesArray | Array<String&#124;Object>&#124;Object | 타입 또는 함수의 JSON 인터페이스 출력 배열의 배열. 타입 목록은 [solidity documentation](http://solidity.readthedocs.io/en/develop/types.html)를 참조하세요. |
| hexString  | String                                | 디코딩할 ABI 바이트 코드.                                                                                                              |

**Return Value**

| 형식     | 설명                     |
| ------ | ---------------------- |
| Object | 디코딩된 매개변수를 포함하는 결과 객체. |

**예제**

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

## decodeLog

```javascript
caver.klay.abi.decodeLog(inputs, hexString, topics)
```

ABI 인코딩된 로그 데이터 및 인덱싱된 토픽 데이터를 디코딩합니다.

**매개변수**
| 명칭        | 형식     | 설명                                                                                                              |
| --------- | ------ | --------------------------------------------------------------------------------------------------------------- |
| inputs    | Array  | JSON 인터페이스 입력 배열. 타입 목록은 [solidity documentation](http://solidity.readthedocs.io/en/develop/types.html)를 참조하세요. |
| hexString | String | 로그의 `data` 필드에 있는 ABI 바이트 코드.                                                                                   |
| topics    | Array  | 만일 비-익명 이벤트일 경우 topic[0] 없이, 그렇지 않은 경우에는 topic[0]을 포함한 로그의 인덱스 매개변수 topics의 배열.                                 |

**리턴값**

| 형식     | 설명                     |
| ------ | ---------------------- |
| Object | 디코딩된 매개변수를 포함하는 결과 객체. |

**Examples**

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

## encodeContractDeploy

```javascript
caver.klay.abi.encodeContractDeploy(jsonInterface, hexString, params)
```

생성자의 인자를 포함한 스마트 컨트랙트 바이트코드를 인코딩합니다.

**매개변수**
| 명칭            | 형식     | 설명                   |
| ------------- | ------ | -------------------- |
| jsonInterface | Array  | 컨트랙트의 JSON 인터페이스.    |
| hexString     | String | 배포할 스마트 컨트랙트의 바이트코드. |
| params        | 복합     | 생성자에 전달할 인자.         |

**Return Value**

| 형식     | 설명                                                   |
| ------ | ---------------------------------------------------- |
| String | 바이트코드 + 매개변수를 의미하는 생성자 인자를 포함한 ABI 인코딩된 스마트 컨트랙트 배포. |

**Examples**

```javascript
// There is no argument for constructor
caver.klay.abi.encodeContractDeploy([
        {"constant": true, "inputs": [], "name": "count", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": true, "inputs": [], "name": "getBlockNumber", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": false, "inputs": [ { "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }
    ],'0x60806040526000805534801561001457600080fd5b50610116806100246000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a7230582064856de85a2706463526593b08dd790054536042ef66d3204018e6790a2208d10029')
> "0x60806040526000805534801561001457600080fd5b50610116806100246000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a7230582064856de85a2706463526593b08dd790054536042ef66d3204018e6790a2208d10029"

// There is one argument for constructor(uint256)
caver.klay.abi.encodeContractDeploy([ 
        { "constant": true, "inputs": [], "name": "count", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": true, "inputs": [], "name": "getBlockNumber", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": false, "inputs": [ { "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, 
        { "inputs": [ { "name": "_a", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } 
    ],'0x60806040526000805534801561001457600080fd5b5060405160208061015d8339810180604052810190808051906020019092919050505050610116806100476000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a72305820ec774499bcdb89d9e570156a76249b33e99c766dfc6944e55aeeca316b41debf0029', 1)
> "0x60806040526000805534801561001457600080fd5b5060405160208061015d8339810180604052810190808051906020019092919050505050610116806100476000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a72305820ec774499bcdb89d9e570156a76249b33e99c766dfc6944e55aeeca316b41debf00290000000000000000000000000000000000000000000000000000000000000001"

// There are two arguments for constructor(uint256, uint256)
caver.klay.abi.encodeContractDeploy([ 
        { "constant": true, "inputs": [], "name": "count", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": true, "inputs": [], "name": "getBlockNumber", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": false, "inputs": [ { "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, 
        { "inputs": [ { "name": "_a", "type": "uint256" }, { "name": "_b", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } 
    ],'0x60806040526000805534801561001457600080fd5b5060405160408061016883398101806040528101908080519060200190929190805190602001909291905050505050610116806100526000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a72305820f85b40d5ad70d0b3599200515915dca3074bcf609f27660845ecbfe882d3eeee0029', 1, 2)
> "0x60806040526000805534801561001457600080fd5b5060405160408061016883398101806040528101908080519060200190929190805190602001909291905050505050610116806100526000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a72305820f85b40d5ad70d0b3599200515915dca3074bcf609f27660845ecbfe882d3eeee002900000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002"

// There is one argument for constructor(string)
caver.klay.abi.encodeContractDeploy([ 
        { "constant": true, "inputs": [], "name": "count", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": true, "inputs": [], "name": "getBlockNumber", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": false, "inputs": [ { "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, 
        { "inputs": [ { "name": "_a", "type": "string" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } 
    ],'0x60806040526000805534801561001457600080fd5b5060405161015d38038061015d8339810180604052810190808051820192919050505050610116806100476000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a7230582082c35290d5a3c5f9ae552e0f638388cdc57d596a0973febe5de8eb9ee6df48a60029', 'stringParams')
> "0x60806040526000805534801561001457600080fd5b5060405161015d38038061015d8339810180604052810190808051820192919050505050610116806100476000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a7230582082c35290d5a3c5f9ae552e0f638388cdc57d596a0973febe5de8eb9ee6df48a600290000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000c737472696e67506172616d730000000000000000000000000000000000000000"
```
