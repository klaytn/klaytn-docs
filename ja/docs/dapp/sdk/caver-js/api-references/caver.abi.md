# caver.abi <a id="caver-abi"></a>

`caver.abi` パッケージでは、パラメータを ABI (Application Binary Interface) でデコードおよびエンコードできます。 これはデプロイされたスマートコントラクトの関数を呼び出すために使用されます。

## encodeFunctionSignature <a id="encodefunctionsignature"></a>

```javascript
caver.abi.encodeFunctionSignature(functionSignature)
```

関数署名を ABI 署名にエンコードします。これは、パラメータ型を含む関数名の sha3 ハッシュの最初の 4 バイトです。

**Parameters**

| Name       | Type              | Description                                                                                                                                    |
| ---------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| function署名 | 文字列 &#124; オブジェクト | エンコードする関数の関数シグネチャまたは JSON インターフェイスオブジェクト。 これが文字列の場合、 `function(type, type,...)`の形式でなければなりません。例えば: `myFunction(uint256,uint32[],bytes10,bytes)` |

**Return Value**

| Type   | Description |
| ------ | ----------- |
| string | 関数の ABI 署名。 |

**Examples**

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

イベント署名を ABI 署名にエンコードします。これは、input パラメータ型を含むイベント名の sha3 ハッシュです。

**Parameters**

| Name    | Type                 | Description                                                                                                                              |
| ------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| event署名 | string &#124; object | エンコードするイベントのイベント署名または JSON インターフェイスオブジェクト。 これが文字列の場合、 `event(type,type,...)`の形式でなければなりません。例えば: `myEvent(uint256,uint32[],bytes10,bytes)` |

**Return Value**

| Type   | Description |
| ------ | ----------- |
| string | イベントのABI署名。 |

**Examples**

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

ABI 表現にそのタイプに基づいてパラメータをエンコードします。

**Parameters**

| Name  | Type                 | Description                                                                                     |
| ----- | -------------------- | ----------------------------------------------------------------------------------------------- |
| type  | string &#124; object | 型のリストについては、 [solidity ドキュメント](http://solidity.readthedocs.io/en/develop/types.html)  を参照してください。 |
| パラメータ | 混在しました               | エンコードする実際のパラメータ。                                                                                |

**注意** `タプル` 型は caver-js [v1.6.0](https://www.npmjs.com/package/caver-js/v/1.6.0) からサポートされています。 `タプル` 型についての詳細は、 [Solidity Docs](https://docs.soliditylang.org/en/v0.6.10/abi-spec.html#handling-tuple-types) を参照してください。

**Return Value**

| Type   | Description        |
| ------ | ------------------ |
| string | ABI エンコードされたパラメータ。 |

**Examples**

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

## エンコードパラメータ <a id="encodeparameters"></a>

```javascript
caver.abi.encodeParameters(typesArray, parameters)
```

JSON インターフェイスオブジェクトに基づいて関数パラメータをエンコードします。

**Parameters**

| Name       | Type             | Description                                                                                                              |
| ---------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------ |
| typesArray | 配列 &#124; オブジェクト | 関数の型またはJSONインターフェイスを持つ配列。 型のリストについては、 [solidity ドキュメント](http://solidity.readthedocs.io/en/develop/types.html) を参照してください。 |
| パラメータ      | Array            | エンコードするパラメータ                                                                                                             |

**NOTE** `tuple` type is supported since caver-js [v1.6.0](https://www.npmjs.com/package/caver-js/v/1.6.0). For more details about `tuple` type, please refer to [Solidity Docs](https://docs.soliditylang.org/en/v0.6.10/abi-spec.html#handling-tuple-types).

**Return Value**

| Type   | Description        |
| ------ | ------------------ |
| string | ABI エンコードされたパラメータ。 |

**Examples**

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

JSONインターフェースオブジェクトと与えられたパラメータを使用して関数呼び出しをエンコードします。

**Parameters**

| Name          | Type   | Description               |
| ------------- | ------ | ------------------------- |
| jsonInterface | object | 関数の JSON インターフェイスオブジェクト。  |
| parameters    | Array  | The parameters to encode. |

**Return Value**

| Type   | Description                                 |
| ------ | ------------------------------------------- |
| string | ABI エンコードされた関数呼び出し。これは、関数シグネチャとパラメータを意味します。 |

**Examples**

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
'0x24ee009700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000748656c6c6f2125000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
```

## decodeFunctionCall <a id="decodefunctioncall"></a>

```javascript
caver.abi.decodeFunctionCall(abi, functionCall)
```

関数または関数 abi 文字列の abi オブジェクトから関数呼び出しをデコードし、パラメータを返します。

**注意** `caver.abi.decodeFunctionCall` は、caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3) からサポートされています。

**Parameters**

| Name | Type   | Description         |
| ---- | ------ | ------------------- |
| abi  | object | 関数のabiオブジェクト。       |
| 関数通話 | string | エンコードされた関数の呼び出し文字列。 |

**Return Value**

| Type   | Description                                                             |
| ------ | ----------------------------------------------------------------------- |
| object | プレーンなパラメータを含むオブジェクト。 `結果[0]` は、パラメータの順序で配列のようにアクセスするために提供されているため使用できます。 |

**Examples**

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

ABI エンコードされたパラメータを JavaScript 型にデコードします。

**Parameters**

| Name      | Type            | Description                                                                                    |
| --------- | --------------- | ---------------------------------------------------------------------------------------------- |
| type      | 文字列&#124;オブジェクト | 型のリストについては、 [solidity ドキュメント](http://solidity.readthedocs.io/en/develop/types.html) を参照してください。 |
| hexstring | Array           | デコードするABIバイトコード。                                                                               |

**NOTE** `tuple` type is supported since caver-js [v1.6.0](https://www.npmjs.com/package/caver-js/v/1.6.0). For more details about `tuple` type, please refer to [Solidity Docs](https://docs.soliditylang.org/en/v0.6.10/abi-spec.html#handling-tuple-types).

**Return Value**

| Type  | Description   |
| ----- | ------------- |
| Mixed | デコードされたパラメータ。 |

**Examples**

```javascript
> caver.abi.decodeParameter('uint256', '0x00000000000000000000000000000000000000000000000000000000000010')
'16'

> caver.abi.decodeParameter('string', '0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000')
'Hello!%')

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

ABI エンコードされたパラメータを JavaScript 型にデコードします。

**Parameters**
| Name       | Type                | Description                                                                                                                                  |
| ---------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| typesArray | Array &#124; object | 型またはJSONインターフェースの配列を持つ配列が出力されます。 See the [solidity documentation](http://solidity.readthedocs.io/en/develop/types.html) for a list of types. |
| hexstring  | string              | The ABI byte code to decode.                                                                                                                 |

**NOTE** `tuple` type is supported since caver-js [v1.6.0](https://www.npmjs.com/package/caver-js/v/1.6.0). For more details about `tuple` type, please refer to [Solidity Docs](https://docs.soliditylang.org/en/v0.6.10/abi-spec.html#handling-tuple-types).

**Return Value**

| Type   | Description              |
| ------ | ------------------------ |
| object | デコードされたパラメータを含む結果オブジェクト。 |

**Examples**

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

ABI エンコードされたログ データとインデックス付きトピックデータをデコードします。

**Parameters**
| Name      | Type   | Description                                                                                                                     |
| --------- | ------ | ------------------------------------------------------------------------------------------------------------------------------- |
| inputs    | Array  | JSON インターフェイス入力の配列。 See the [solidity documentation](http://solidity.readthedocs.io/en/develop/types.html) for a list of types. |
| hexstring | string | ログの `データ` フィールドのABIバイトコード。                                                                                                      |
| topics    | Array  | ログのインデックスパラメータトピックの配列。 この配列は、非匿名のイベントである場合、トピック[0] がありません。または、それ以外の場合、トピック[0] です。                                               |

**Return Value**

| Type   | Description           |
| ------ | --------------------- |
| object | デコードされたログを含む結果オブジェクト。 |

**Examples**

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

コンストラクタの引数でスマートコントラクトバイトコードをエンコードします。

**Parameters**
| Name          | Type   | Description               |
| ------------- | ------ | ------------------------- |
| jsonInterface | Array  | コントラクトの JSON インターフェイス。    |
| hexstring     | string | デプロイされるスマートコントラクトのバイトコード。 |
| params        | Mixed  | (オプション) コンストラクタに渡す引数。     |

**Return Value**

| Type   | Description                                                            |
| ------ | ---------------------------------------------------------------------- |
| string | コンストラクタ引数を使用した ABI エンコードされたスマートコントラクトのデプロイメントは、byteCode + パラメータを意味します。 |

**Examples**

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
