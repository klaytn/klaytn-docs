---
description: >-
  caver-js APIs related to ABI encoding and decoding.
---

# caver.klay.abi <a id="caver-klay-abi"></a>

The `caver-klay-abi` package allows you to de- and encode parameters from an ABI (Application Binary Interface). This will be used for calling functions of a deployed smart-contract.

## encodeFunctionSignature <a id="encodefunctionsignature"></a>

```javascript
caver.klay.abi.encodeFunctionSignature(functionSignature)
```

Encodes the function signature to its ABI signature, which are the first 4 bytes of the sha3 hash of the function name including types.

**パラメータ**

| 名前         | タイプ                  | Description                                                                                                                                               |
| ---------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| function署名 | String &#124; Object | エンコードする関数の関数シグネチャまたは JSON インターフェイスオブジェクト。 If String it has to be in the form `function(type,type,...)`, e.g: `myFunction(uint256,uint32[],bytes10,bytes)` |

**戻り値**

| タイプ | Description |
| --- | ----------- |
| 文字列 | 関数の ABI 署名。 |

**例**

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

## encodeEventSignature <a id="encodeeventsignature"></a>

```javascript
caver.klay.abi.encodeEventSignature(eventSignature)
```

Encodes the event signature to its ABI signature, which is the sha3 hash of the event name including input types.

**パラメータ**

| 名前      | タイプ                  | Description                                                                                                                                          |
| ------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| event署名 | String &#124; Object | エンコードするイベントのイベント署名または JSON インターフェイスオブジェクト。 If string it has to be in the form `event(type,type,...)`, e.g: `myEvent(uint256,uint32[],bytes10,bytes)` |

**戻り値**

| タイプ | Description |
| --- | ----------- |
| 文字列 | イベントのABI署名。 |

**例**

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

## encodeParameter <a id="encodeparameter"></a>

```javascript
caver.klay.abi.encodeParameter(type, parameter)
```

ABI 表現にそのタイプに基づいてパラメータをエンコードします。

**パラメータ**

| 名前    | タイプ                  | Description                                                                                     |
| ----- | -------------------- | ----------------------------------------------------------------------------------------------- |
| タイプ   | String &#124; Object | 型のリストについては、 [solidity ドキュメント](http://solidity.readthedocs.io/en/develop/types.html)  を参照してください。 |
| パラメータ | 混在しました               | エンコードする実際のパラメータ。                                                                                |

**戻り値**

| タイプ | Description        |
| --- | ------------------ |
| 文字列 | ABI エンコードされたパラメータ。 |

**例**

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

## エンコードパラメータ <a id="encodeparameters"></a>

```javascript
caver.klay.abi.encodeParameters(typesArray, parameters)
```

JSON インターフェイスオブジェクトに基づいて関数パラメータをエンコードします。

**パラメータ**

| 名前         | タイプ                                   | Description                                                                                                              |
| ---------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| typesArray | Array<String&#124;Object>&#124;Object | 関数の型またはJSONインターフェイスを持つ配列。 型のリストについては、 [solidity ドキュメント](http://solidity.readthedocs.io/en/develop/types.html) を参照してください。 |
| パラメータ      | 行列                                    | エンコードするパラメータ                                                                                                             |

**戻り値**

| タイプ | Description        |
| --- | ------------------ |
| 文字列 | ABI エンコードされたパラメータ。 |

**例**

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

JSONインターフェースオブジェクトと与えられたパラメータを使用して関数呼び出しをエンコードします。

**パラメータ**

| 名前            | タイプ    | Description              |
| ------------- | ------ | ------------------------ |
| jsonInterface | Object | 関数の JSON インターフェイスオブジェクト。 |
| パラメータ         | 行列     | エンコードするパラメータ             |

**戻り値**

| タイプ | Description                                 |
| --- | ------------------------------------------- |
| 文字列 | ABI エンコードされた関数呼び出し。これは、関数シグネチャとパラメータを意味します。 |

**例**

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

ABI エンコードされたパラメータを JavaScript 型にデコードします。

**パラメータ**

| 名前        | タイプ                | Description                                                                                    |
| --------- | ------------------ | ---------------------------------------------------------------------------------------------- |
| タイプ       | String&#124;Object | 型のリストについては、 [solidity ドキュメント](http://solidity.readthedocs.io/en/develop/types.html) を参照してください。 |
| hexString | 行列                 | デコードするABIバイトコード。                                                                               |

**戻り値**

| タイプ    | Description   |
| ------ | ------------- |
| 混在しました | デコードされたパラメータ。 |

**例**

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

ABI エンコードされたパラメータを JavaScript 型にデコードします。

**パラメータ**
| 名前         | タイプ                                   | Description                                                                                                                                           |
| ---------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| typesArray | Array<String&#124;Object>&#124;Object | An array with types or a JSON interface outputs array. 型のリストについては、 [solidity ドキュメント](http://solidity.readthedocs.io/en/develop/types.html) を参照してください。 |
| hexString  | 文字列                                   | デコードするABIバイトコード。                                                                                                                                      |

**戻り値**

| タイプ    | Description              |
| ------ | ------------------------ |
| Object | デコードされたパラメータを含む結果オブジェクト。 |

**例**

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

ABI エンコードされたログ データとインデックス付きトピックデータをデコードします。

**パラメータ**
| 名前        | タイプ | Description                                                                                                                      |
| --------- | --- | -------------------------------------------------------------------------------------------------------------------------------- |
| inputs    | 行列  | A JSON interface inputs array. 型のリストについては、 [solidity ドキュメント](http://solidity.readthedocs.io/en/develop/types.html) を参照してください。    |
| hexString | 文字列 | ログの `データ` フィールドのABIバイトコード。                                                                                                       |
| トピック      | 行列  | An array with the index parameter topics of the log, without the topic[0] if its a non-anonymous event, otherwise with topic[0]. |

**戻り値**

| タイプ    | Description              |
| ------ | ------------------------ |
| Object | デコードされたパラメータを含む結果オブジェクト。 |

**例**

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

Encode smart contract bytecode with the arguments of the constructor.

**パラメータ**
| 名前            | タイプ    | Description                           |
| ------------- | ------ | ------------------------------------- |
| jsonInterface | 行列     | コントラクトの JSON インターフェイス。                |
| hexString     | 文字列    | デプロイされるスマートコントラクトのバイトコード。             |
| params        | 混在しました | Arguments to pass to the constructor. |

**戻り値**

| タイプ | Description                                                            |
| --- | ---------------------------------------------------------------------- |
| 文字列 | コンストラクタ引数を使用した ABI エンコードされたスマートコントラクトのデプロイメントは、byteCode + パラメータを意味します。 |

**例**

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
