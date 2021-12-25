# caver.contract <a id="caver-contract"></a>

`caver.contract` 객체는 Klaytn 블록체인과 스마트 컨트랙트 간의 상호작용을 쉽게 만들어 줍니다. 새 컨트랙트 객체를 생성할 때 해당 스마트 컨트랙트를 위해 JSON 인터페이스를 제공해야 하는데, 이때 caver-js가 자바스크립트로 작성된 컨트랙트 객체와의 모든 호출을 RPC를 통해 하위 수준의 ABI 호출로 자동 변환시켜줍니다.

이를 통해 스마트 컨트랙트가 마치 자바스크립트 객체인 것처럼 스마트 컨트랙트와 상호작용할 수 있습니다.

## caver.contract.create<a id="caver-contract-create"></a>

```javascript
caver.contract.create(jsonInterface [, address] [, options])
```
JSON 인터페이스 오브젝트에 정의된 모든 메소드 및 이벤트로 새 컨트랙트 인스턴스를 생성합니다. 이 함수는 [new caver.contract](#new-contract)와 동일하게 작동합니다.

**참고** `caver.contract.create`는 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1)부터 지원됩니다.

**매개변수**

[new caver.contract](#new-contract)를 참고하세요.

**리턴값**

[new caver.contract](#new-contract)를 참고하세요.


**Example**

```javascript
const contract = caver.contract.create([
    {
        constant: true,
        inputs: [{ name: 'interfaceId', type: 'bytes4' }],
        name: 'supportsInterface',
        outputs: [{ name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    ...
  ], '0x{address in hex}')
```

## caver.contract <a id="new-contract"></a>

```javascript
new caver.contract(jsonInterface [, address] [, options])
```
JSON 인터페이스 오브젝트에 정의된 모든 메소드 및 이벤트로 새 컨트랙트 인스턴스를 생성합니다.

**매개변수**

| 이름            | 타입     | 설명                                                                                        |
| ------------- | ------ | ----------------------------------------------------------------------------------------- |
| jsonInterface | object | 컨트랙트를 인스턴스화하기 위한 JSON 인터페이스                                                               |
| address       | string | (선택 사항) 호출할 스마트 컨트랙트의 주소. `myContract.options.address = '0x1234..'`를 사용하여 나중에 추가할 수 있습니다. |
| options       | object | (선택 사항) 컨트랙트 옵션. 자세한 내용은 아래 표를 참조하세요.                                                     |

옵션 개체에는 다음이 포함됩니다:

| 이름            | 타입      | 설명                                                                                                                                                                           |
| ------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from          | string  | (선택 사항) 트랜잭션이 만들어진 송신자 주소.                                                                                                                                                   |
| gasPrice      | string  | (선택 사항) 트랜잭션에 사용할 peb 단위의 가스 가격.                                                                                                                                             |
| gas           | number  | (선택 사항) 트랜잭션에 규정된 최대 가스 (가스 제한).                                                                                                                                             |
| data          | string  | (선택 사항) 컨트랙트의 바이트 코드. 컨트랙트가 배포될 때 사용됩니다.                                                                                                                                     |
| feeDelegation | boolean | (선택 사항) 수수료 위임 트랜잭션 사용 여부를 나타냅니다.                                                                                                                                            |
| feePayer      | string  | (선택 사항) 트랜잭션 수수료를 부담하는 수수료 납부자의 주소입니다. `feeDelegation`이 `true`일 때, 값은 트랜잭션의 `feePayer` 필드에 설정됩니다.                                                                            |
| feeRatio      | string  | (optional) Fee payer가 부담하게될 트랜잭션 수수료의 비율입니다. `feeDelegation`이 `true`이며, `feeRatio`가 유효한 값으로 설정되었을 경우, 부분 수수료 위임 트랜잭션이 사용됩니다. 유효한 범위는 1에서 99 사이입니다. 0이나 100 이상의 값은 허용되지 않습니다. |

**리턴값**

| 타입     | 설명                         |
| ------ | -------------------------- |
| object | 모든 메소드와 이벤트가 있는 컨트랙트 인스턴스. |


**Example**

```javascript
const myContract = new caver.contract([...], '0x{address in hex}', { gasPrice: '25000000000' })
```

## myContract.options<a id="mycontract-options"></a>

```javascript
myContract.options
```

컨트랙트 인스턴스에 대한 `options` 객체. `from`, `gas`, `gasPrice`, `feePayer` 그리고 `feeRatio`는 트랜잭션 전송시 대체값으로 사용됩니다.

**속성**

| 이름            | 타입      | 설명                                                                                                                                                                           |
| ------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address       | string  | 컨트랙트가 배포된 주소.                                                                                                                                                                |
| jsonInterface | Array   | 컨트랙트의 JSON 인터페이스.                                                                                                                                                            |
| from          | string  | 컨트랙트 배포/실행 트랜잭션을 전송하는 기본 주소입니다. 트랜잭션 생성시 `from` 주소가 정의되어 있지 않다면, 트랜잭션 생성시 항상 `myContract.options.from`가 사용됩니다.                                                               |
| gasPrice      | string  | 트랜잭션에 사용할 peb 단위의 가스 가격.                                                                                                                                                     |
| gas           | number  | 트랜잭션에 제공된 최대 가스 (가스 제한).                                                                                                                                                     |
| data          | string  | 컨트랙트의 바이트 코드. 컨트랙트가 배포될 때 사용됩니다.                                                                                                                                             |
| feeDelegation | boolean | (선택 사항) 수수료 위임 트랜잭션 사용 여부를 나타냅니다.                                                                                                                                            |
| feePayer      | string  | (선택 사항) 트랜잭션 수수료를 부담하는 수수료 납부자의 주소입니다. `feeDelegation`이 `true`일 때, 값은 트랜잭션의 `feePayer` 필드에 설정됩니다.                                                                            |
| feeRatio      | string  | (optional) Fee payer가 부담하게될 트랜잭션 수수료의 비율입니다. `feeDelegation`이 `true`이며, `feeRatio`가 유효한 값으로 설정되었을 경우, 부분 수수료 위임 트랜잭션이 사용됩니다. 유효한 범위는 1에서 99 사이입니다. 0이나 100 이상의 값은 허용되지 않습니다. |

**참고** `feeDelegation`, `feePayer`, 그리고 `feeRatio`는 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 이후부터 지원됩니다.


**Example**

```javascript
> myContract.options
{
  address: [Getter/Setter],
  jsonInterface: [Getter/Setter],
  from: [Getter/Setter],
  feePayer: [Getter/Setter],
  feeDelegation: [Getter/Setter],
  feeRatio: [Getter/Setter],
  gasPrice: [Getter/Setter],
  gas: [Getter/Setter],
  data: [Getter/Setter]
}

> myContract.options.from = '0x1234567890123456789012345678901234567891' // default from address
> myContract.options.gasPrice = '25000000000000' // default gas price in peb
> myContract.options.gas = 5000000 // provide as fallback always 5M gas
> myContract.options.feeDelegation = true // use fee delegation transaction
> myContract.options.feePayer = '0x1234567890123456789012345678901234567891' // default fee payer address
> myContract.options.feeRatio = 20 // default fee ratio when send partial fee delegation transaction
```


## myContract.options.address<a id="mycontract-options-address"></a>

```javascript
myContract.options.address
```

이 컨트랙트 인스턴스 `myContract`에 사용된 주소입니다. 해당 컨트랙트에서 caver-js에 의해 생성된 모든 트랜잭션에 이 주소가 `to`로서 포함될 것입니다.

**속성**

| 이름      | 타입                   | 설명                                      |
| ------- | -------------------- | --------------------------------------- |
| address | string &#124; `null` | 이 컨트랙트의 주소이거나, 아직 설정되지 않은 경우 `null`입니다. |

**Example**

```javascript
>  myContract.options.address
'0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae'

// 컨트랙트 주소 설정
>  myContract.options.address = '0x1234FFDD...'
```

## myContract.options.jsonInterface<a id="mycontract-options-jsoninterface"></a>

```javascript
myContract.options.jsonInterface
```
이 컨트랙트 `myContract`의 ABI에서 파생된 JSON 인터페이스 객체.

**속성**

| 이름            | 타입    | 설명                                                         |
| ------------- | ----- | ---------------------------------------------------------- |
| jsonInterface | Array | 이 컨트랙트의 JSON 인터페이스. 이를 재설정하면 컨트랙트 인스턴스의 메소드 및 이벤트가 재생성됩니다. |


**Example**

```javascript
> myContract.options.jsonInterface
[
  {
    constant: true,
    inputs: [ { name: 'interfaceId', type: 'bytes4' } ],
    name: 'supportsInterface',
    outputs: [ { name: '', type: 'bool' } ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
    signature: '0x01ffc9a7',
  },
  ...
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'owner', type: 'address' },
      { indexed: true, name: 'spender', type: 'address' },
      { indexed: false, name: 'value', type: 'uint256' }
    ],
    name: 'Approval',
    type: 'event',
    signature: '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
  },
]

// 새 jsonInterface 설정
> myContract.options.jsonInterface = [...]
```


## myContract.clone<a id="mycontract-clone"></a>

```javascript
myContract.clone([contractAddress])
```

현재 컨트랙트 인스턴스를 복제합니다.

**매개변수**

| 이름              | 타입     | 설명                                                                                 |
| --------------- | ------ | ---------------------------------------------------------------------------------- |
| contractAddress | String | (선택 사항) 새 컨트랙트의 주소입니다. 미입력시 오리지널 인스턴스(예: `myContract.options.address`)의 주소로 설정됩니다. |

**리턴값**

| 타입     | 설명                |
| ------ | ----------------- |
| object | 새로 복제된 컨트랙트 인스턴스. |


**Example**

```javascript
> myContract.clone()
Contract {
  currentProvider: [Getter/Setter],
  ...
  _keyrings: KeyringContainer { ... }
}
```

## myContract.deploy<a id="mycontract-deploy2"></a>

```javascript
myContract.deploy(options, byteCode [, param1 [, param2 [, ...]]])
```

컨트랙트를 Klaytn 네트워크에 배포합니다. 성공적으로 배포된 후, Promise는 새로운 컨트랙트 인스턴스와 함께 해결(resolved)될 것입니다. 기존의 [myContract.deploy](#mycontract-deploy) 함수 사용성과는 다르게, 이 함수는 Klaytn 네트워크에 직접 트랜잭션을 전송합니다. 반환된 객체와 함께 `send()`를 호출할 필요가 없습니다.

**NOTE** 서명을 하기 위해서는 `caver.wallet`가 `options`나 `myContract.options`의 `from`와 `feePayer`에 해당하는 키링 인스턴스를 포함해야 합니다.

**참고** `myContract.deploy`는 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1)부터 지원됩니다.

**매개변수**

| 이름         | 타입     | 설명                                                                                     |
| ---------- | ------ | -------------------------------------------------------------------------------------- |
| options    | object | 전송에 사용되는 옵션입니다. 자세한 사항은 [methods.methodName.send](#methods-methodname-send)의 표를 참고하세요. |
| byteCode   | string | 컨트랙트의 바이트 코드입니다.                                                                       |
| parameters | 복합     | (선택 사항) 배포시 생성자에게 전달되는 파라미터입니다.                                                        |


**리턴값**

`Promise`는 `PromiEvent`를 반환: Promise가 새로운 컨트랙트 인스턴스와 함께 해결(resolved)됩니다.

| 타입         | 설명                                                                                                                                                           |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| PromiEvent | Promise가 조합된 이벤트 이미터(event emitter)입니다. 트랜잭션 영수증이 준비되면 해결(resolve)됩니다. `myContract.deploy()`에서 `send()`가 호출될 경우, Promise는 새로운 컨트랙트 인스턴스와 함께 해결(resolved)됩니다. |

PromiEvent에서는 다음 이벤트가 발생할 수 있습니다.

- `"transactionHash"`: 트랜잭션이 전송되고 트랜잭션 해시가 준비된 직후에 발생합니다. 타입은 `string`입니다.
- `receipt`: 트랜잭션 영수중이 준비되면 발생합니다. 자세한 내용은 [caver.rpc.klay.getTransactionReceipt](./caver.rpc/klay.md#caver-rpc-klay-gettransactionreceipt)를 참조하세요. 타입은 `object`입니다.
- `error`: 전송 중 에러가 발생하면 발생합니다. 가스 부족 에러(out-of-gas)가 발생한 경우 두 번째 인자는 트랜잭션 영수증입니다. 타입은 `error`입니다.

**Example**

```javascript
// Deploy a smart contract without constructor arguments
> myContract.deploy({
      from: '0x{address in hex}',
      gas: 1500000,
  }, '0x{byte code}')
  .on('error', function(error) { ... })
  .on('transactionHash', function(transactionHash) { ... })
  .on('receipt', function(receipt) {
     console.log(receipt.contractAddress) // contains the new contract address
   })
  .then(function(newContractInstance) {
      console.log(newContractInstance.options.address) // instance with the new contract address
  })

// Deploy a smart contract with constructor arguments
> myContract.deploy({
      from: '0x{address in hex}',
      gas: 1500000,
  }, '0x{byte code}', 'keyString', ...)
  .on('error', function(error) { ... })
  .on('transactionHash', function(transactionHash) { ... })
  .on('receipt', function(receipt) {
     console.log(receipt.contractAddress) 
   })
  .then(function(newContractInstance) {
      console.log(newContractInstance.options.address)
  })

// Deploy a smart contract with fee delegation transaction (TxTypeFeeDelegatedSmartContractDeploy)
> myContract.deploy({
      from: '0x{address in hex}',
      feeDelegation: true,
      feePayer: '0x{address in hex}',
      gas: 1500000,
  }, '0x{byte code}')
  .on('error', function(error) { ... })
  .on('transactionHash', function(transactionHash) { ... })
  .on('receipt', function(receipt) {
     console.log(receipt.contractAddress)
   })
  .then(function(newContractInstance) {
      console.log(newContractInstance.options.address)
  })

// Deploy a smart contract with partial fee delegation transaction (TxTypeFeeDelegatedSmartContractDeployWithRatio)
> myContract.deploy({
      from: '0x{address in hex}',
      feeDelegation: true,
      feePayer: '0x{address in hex}',
      feeRatio: 30,
      gas: 1500000,
  }, '0x{byte code}')
  .on('error', function(error) { ... })
  .on('transactionHash', function(transactionHash) { ... })
  .on('receipt', function(receipt) {
     console.log(receipt.contractAddress)
   })
  .then(function(newContractInstance) {
      console.log(newContractInstance.options.address)
  })
```

## myContract.deploymyContract.deploy<a id="mycontract-deploy"></a>

```javascript
myContract.deploy(options)
```

Klaytn에 스마트 컨트랙트를 배포할 때 사용되는 객체를 반환합니다. `myContract.deploy({ data, arguments }).send(options)`를 호출함으로써 스마트 컨트랙트 배포 트랜잭션을 전송할 수 있습니다. 성공적으로 배포된 후, Promise는 새로운 컨트랙트 인스턴스와 함께 해결(resolved)될 것입니다.

**매개변수**

| 이름      | 타입     | 설명                                      |
| ------- | ------ | --------------------------------------- |
| options | object | 배포에 사용되는 옵션 객체입니다. 자세한 내용은 아래 표를 참조하세요. |

옵션 개체에는 다음이 포함됩니다:

| 이름        | 타입     | 설명                            |
| --------- | ------ | ----------------------------- |
| data      | string | 컨트랙트의 바이트 코드.                 |
| arguments | Array  | (선택 사항) 배포시 생성자에게 전달되는 인자입니다. |

**리턴값**

| 타입     | 설명                                                                                                     |
| ------ | ------------------------------------------------------------------------------------------------------ |
| object | An object in which arguments and functions for contract distribution are defined. 자세한 내용은 아래 표를 참조하세요. |

The object contains the following:

| 이름                                                   | 타입       | 설명                                                                                                                                                                 |
| ---------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| arguments                                            | Array    | The arguments passed in `options.arguments`.                                                                                                                       |
| [send](#methods-methodname-send)                     | function | The function that will deploy the contract to the Klaytn. The promise as the result of this function will be resolved with the new contract instance.              |
| [sign](#methods-methodname-sign)                     | function | The function that will sign a smart contract deploy transaction as a sender. The sign function will return signed transaction.                                     |
| [signAsFeePayer](#methods-methodname-signasfeepayer) | function | The function that will sign a smart contract deploy transaction as a fee payer. The signAsFeePayer function will return signed transaction.                        |
| [estimateGas](#methods-methodname-estimategas)       | function | The function that will estimate the gas used for the deployment. The execution of this function does not deploy the contract.                                      |
| [encodeABI](#methods-methodname-encodeabi)           | function | The function that encodes the ABI of the deployment, which is contract data + constructor parameters. The execution of this function does not deploy the contract. |

**참고** `myContract.deploy({ data, arguments }).sign(options)` and `myContract.deploy({ data, arguments }).signAsFeePayer(options)`는 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1)부터 지원됩니다.

**Example**

```javascript
> myContract.deploy({
      data: '0x12345...',
      arguments: [123, 'My string']
  })
  .send({
      from: '0x1234567890123456789012345678901234567891',
      gas: 1500000,
      value: 0,
  }, function(error, transactionHash) { ... })
  .on('error', function(error) { ... })
  .on('transactionHash', function(transactionHash) { ... })
  .on('receipt', function(receipt) {
     console.log(receipt.contractAddress) // contains the new contract address
   })
  .then(function(newContractInstance) {
      console.log(newContractInstance.options.address) // instance with the new contract address
  })

// When the data is already set as an option to the contract itself
> myContract.options.data = '0x12345...'

> myContract.deploy({
        arguments: [123, 'My string']
  })
  .send({
      from: '0x1234567890123456789012345678901234567891',
      gas: 1500000,
      value: 0,
  })
  .then(function(newContractInstance) {
      console.log(newContractInstance.options.address) // instance with the new contract address
  })

// Simply encoding
> myContract.deploy({
      data: '0x12345...',
      arguments: [123, 'My string']
  })
  .encodeABI()
'0x12345...0000012345678765432'

// Gas estimation
> myContract.deploy({
      data: '0x12345...',
      arguments: [123, 'My string']
  })
  .estimateGas(function(err, gas) {
      console.log(gas)
  })
```


## myContract.send<a id="mycontract-send"></a>

```javascript
myContract.send(options, methodName [, param1 [, param2 [, ...]]])
```

스마트 컨트랙트 함수를 실행하기 위한 트랜잭션을 보냅니다. 이러한 호출은 스마트 컨트랙트의 상태를 변경할 수 있습니다.

이 함수에 사용되는 트랜잭션 타입은 `options`나 `myContract.options`에 정의된 값에 따라 결정됩니다. `myContract.send`를 통해 수수료 위임 트랜잭션을 사용하고 싶다면, `feeDelegation`와 `feePayer`를 올바르게 설정해야 합니다.

- `feeDelegation`이 정의되지 않았거나 `false`로 정의: [SmartContractExecution][]
- `feeDelegation`가 `true`로 정의되었지만, `feePayer`가 정의되지 않음: 에러 반환.
- `feeDelegation`가 `true`로 정의되었고`feePayer`도 정의되었지만, `feeRatio`가 정의되지 않음: [FeeDelegatedSmartContractExecution][]
- `feeDelegation`가 `true`로 정의되었고`feePayer`와 `feeRatio`도 정의되었음: [FeeDelegatedSmartContractExecutionWithRatio][]

**NOTE** 서명을 하기 위해서는 `caver.wallet`가 `options`나 `myContract.options`의 `from`과 `feePayer`에 해당하는 키링 인스턴스를 포함해야 합니다.

**참고** `myContract.send`는 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1)부터 지원됩니다.

**매개변수**

| 이름         | 타입     | 설명                                                                                  |
| ---------- | ------ | ----------------------------------------------------------------------------------- |
| options    | object | 전송에 사용되는 옵션. 자세한 사항은 [methods.methodName.send](#methods-methodname-send)의 표를 참고하세요. |
| methodName | string | 실행할 컨트랙트 함수의 메서드 이름입니다.                                                             |
| parameters | 복합     | (선택 사항) 스마트 컨트랙트 함수에 전달되는 파라미터입니다.                                                  |

**리턴값**

`Promise` returns `PromiEvent`

| 타입         | 설명                                                                                                                                     |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| PromiEvent | 프로미스(promise)가 조합된 이벤트 이미터(event emitter). 트랜잭션 영수증이 준비되면 해결(resolve)됩니다. The promise will be resolved with the new contract instance. |

PromiEvent에서는 다음 이벤트가 발생할 수 있습니다.

- `"transactionHash"`: 트랜잭션이 전송되고 트랜잭션 해시가 준비된 직후에 발생합니다. 타입은 `string`입니다.
- `receipt`: 트랜잭션 영수중이 준비되면 발생합니다. 자세한 내용은 [caver.rpc.klay.getTransactionReceipt](./caver.rpc/klay.md#caver-rpc-klay-gettransactionreceipt)를 참조하세요. 타입은 `object`입니다.
- `error`: 전송 중 에러가 발생하면 발생합니다. 가스 부족 에러(out-of-gas)가 발생한 경우 두 번째 인자는 트랜잭션 영수증입니다. 타입은 `error`입니다.

**Example**

```javascript
// Send a SmartContractExecution and use the promise
> myContract.send({ from: '0x{address in hex}', gas: 1000000 }, 'methodName', 123).then(console.log)
{
  blockHash: '0x294202dcd1d3c422880e2a209b9cd70ce7036300536c78ab74130c5717cb90da',
  blockNumber: 16342,
  contractAddress: null,
  from: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  gas: '0xf4240',
  gasPrice: '0x5d21dba00',
  gasUsed: 47411,
  input: '0x983b2...',
  logsBloom: '0x00800...',
  nonce: '0x1cd',
  senderTxHash: '0xe3f50d2bab2c462ef99379860d2b634d85a0c9fba4e2b189daf1d96bd4bbf8ff',
  signatures: [ { V: '0x4e43', R: '0x2ba27...', S: '0x50d37...' } ],
  status: true,
  to: '0x361870b50834a6afc3358e81a3f7f1b1eb9c7e55',
  transactionHash: '0xe3f50d2bab2c462ef99379860d2b634d85a0c9fba4e2b189daf1d96bd4bbf8ff',
  transactionIndex: 0,
  type: 'TxTypeSmartContractExecution',
  typeInt: 48,
  value: '0x0',
  events: {...}
}

// Send a SmartContractExecution and use the event emitter
> myContract.send({ from: '0x{address in hex}', gas: 1000000 }, 'methodName', 123)
  .on('transactionHash', function(hash) {
    ...
  })
  .on('receipt', function(receipt) {
    console.log(receipt)
  })
  .on('error', console.error)

// Send a FeeDelegatedSmartContractExecution
> myContract.send({
    from: '0x{address in hex}',
    gas: 1000000,
    feeDelegation: true,
    feePayer: '0x{address in hex}',
  }, 'methodName', 123).then(console.log)
{
  blockHash: '0x149e36f279577c306fccb9779a0274e802501c32f7054c951f592778bd5c168a',
  blockNumber: 16458,
  contractAddress: null,
  feePayer: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  feePayerSignatures: [ { V: '0x4e43', R: '0x48c28...', S: '0x18413...' } ],
  from: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  gas: '0xf4240',
  gasPrice: '0x5d21dba00',
  gasUsed: 57411,
  input: '0x983b2d5600000000000000000000000022bb89bd35e7b12bd25bea4165cf0f9330032f8c',
  logsBloom: '0x00800...',
  nonce: '0x1f5',
  senderTxHash: '0x5b06ca5046229e066c11dfc0c74fcbc98509294370981f9b142378a8f2bd5fe8',
  signatures: [ { V: '0x4e44', R: '0xfb707...', S: '0x641c6...' } ],
  status: true,
  to: '0x361870b50834a6afc3358e81a3f7f1b1eb9c7e55',
  transactionHash: '0x0e04be479ad06ec87acbf49abd44f16a56390c736f0a7354860ebc7fc0f92e13',
  transactionIndex: 1,
  type: 'TxTypeFeeDelegatedSmartContractExecution',
  typeInt: 49,
  value: '0x0',
  events: {...}
}

// Send a FeeDelegatedSmartContractExecutionWithRatio
> myContract.send({
    from: '0x{address in hex}',
    gas: 1000000,
    feeDelegation: true,
    feePayer: '0x{address in hex}',
    feeRatio: 30,
  }, 'methodName', 123).then(console.log)
{
  blockHash: '0x8f0a0137cf7e0fea503c818910140246437db36121871bc54b2ebc688873b3f3',
  blockNumber: 16539,
  contractAddress: null,
  feePayer: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  feePayerSignatures: [ { V: '0x4e43', R: '0x80db0...', S: '0xf8c7c...' } ],
  feeRatio: '0x1e',
  from: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  gas: '0xf4240',
  gasPrice: '0x5d21dba00',
  gasUsed: 62411,
  input: '0x983b2d560000000000000000000000007ad1a538041fa3ba1a721f87203cb1a3822b8eaa',
  logsBloom: '0x00800...',
  nonce: '0x219',
  senderTxHash: '0x14c7b674a0e253b31c85c7be8cbfe4bf9d86e66e940fcae34b854e25eab1ce15',
  signatures: [ { V: '0x4e43', R: '0xd57ef...', S: '0xe14f3...' } ],
  status: true,
  to: '0x361870b50834a6afc3358e81a3f7f1b1eb9c7e55',
  transactionHash: '0xfbf00ec189aeb0941d554384f1660ffdac7768b3af2bb1526bcb3983215c1183',
  transactionIndex: 0,
  type: 'TxTypeFeeDelegatedSmartContractExecutionWithRatio',
  typeInt: 50,
  value: '0x0',
  events: {...}
}
```

## myContract.sign<a id="mycontract-sign"></a>

```javascript
myContract.sign(options, methodName [, param1 [, param2 [, ...]]])
```

스마트 컨트랙트 배포 또는 스마트 컨트랙트 함수 실행을 위해 발신자로서 스마트 컨트랙트 트랜잭션에 서명합니다.

스마트 컨트랙트가 배포되었다면 `myContract.sign({ from, ... }, 'constructor', byteCode, ...)`와 같이 'constructor'를 methodName에 입력할 수 있습니다.

이 함수에 사용되는 트랜잭션 타입은 `options`나 `myContract.options`에 정의된 값에 따라 결정됩니다. `myContract.sign`를 통해 수수료 위임 트랜잭션을 사용하고 싶다면, `feeDelegation`dl `true`로 정의되어야 합니다.

- `feeDelegation`이 정의되지 않았거나 `false`로 정의: [SmartContractDeploy][] / [SmartContractExecution][]
- `feeDelegation`가 `true`로 정의되었지만 [feeRatio][]가 정의되지 않음: [FeeDelegatedSmartContractDeploy][] / [FeeDelegatedSmartContractExecution][]
- `feeDelegation`가 `true`로 정의되었고 [feeRatio][]도 정의되었음: [FeeDelegatedSmartContractDeployWithRatio][] / [FeeDelegatedSmartContractExecutionWithRatio][]

**NOTE** 서명을 하기 위해서는 `caver.wallet`가 `options`나 `myContract.options`의 `from`에 해당하는 키링 인스턴스를 포함해야 합니다.

**참고** `myContract.sign`은 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1)부터 지원됩니다.

**매개변수**

| 이름         | 타입     | 설명                                                                                         |
| ---------- | ------ | ------------------------------------------------------------------------------------------ |
| options    | object | 전송에 사용되는 옵션. 자세한 사항은 [methods.methodName.send](#methods-methodname-send)의 표를 참고하세요.        |
| methodName | string | 실행할 컨트랙트 함수의 메서드 이름입니다. 스마트 컨트랙트 배포를 위해 트랜잭션에 서명하고 싶다면 메서드 이름 대신 'constructor' 문자열을 사용하세요. |
| parameters | 복합     | (선택 사항) 스마트 컨트랙트 함수에 전달되는 파라미터입니다. 스마트 컨트랙트 배포 트랜잭션에 서명하고 싶다면 바이트코드와 생성자 파라미터를 전달하세요.      |

**리턴값**

`Promise`는 [Transaction](./caver.transaction/README.md)을 반환 - 서명된 스마트 컨트랙트 트랜잭션입니다.

**Example**

```javascript
// Sign a SmartContractDeploy
> myContract.sign({ from: '0x{address in hex}', gas: 1000000 }, 'constructor', byteCode, 123).then(console.log)
SmartContractDeploy {
  _type: 'TxTypeSmartContractDeploy',
  _from: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x4e43', _r: '0xeb6b5...', _s: '0x5e4f9...' } ],
  _to: '0x',
  _value: '0x0',
  _input: '0x60806...',
  _humanReadable: false,
  _codeFormat: '0x0',
  _chainId: '0x2710',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x2a5'
}

// Sign a FeeDelegatedSmartContractDeploy
> myContract.sign({ from: '0x{address in hex}', feeDelegation: true, gas: 1000000 }, 'constructor', byteCode, 123).then(console.log)
FeeDelegatedSmartContractDeploy {
  _type: 'TxTypeFeeDelegatedSmartContractDeploy',
  _from: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x4e43', _r: '0xee0f5...', _s: '0x31cbf...' } ],
  _feePayer: '0x0000000000000000000000000000000000000000',
  _feePayerSignatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
  _to: '0x',
  _value: '0x0',
  _input: '0x60806...',
  _humanReadable: false,
  _codeFormat: '0x0',
  _chainId: '0x2710',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x320'
}

// Sign a FeeDelegatedSmartContractDeployWithRatio
> myContract.sign({ from: keyring.address, feeDelegation: true, feeRatio: 30, gas: 1000000 }, 'constructor', byteCode, 123).then(console.log)
FeeDelegatedSmartContractDeployWithRatio {
  _type: 'TxTypeFeeDelegatedSmartContractDeployWithRatio',
  _from: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x4e44', _r: '0x4c2b0...', _s: '0x47df8...' } ],
  _feePayer: '0x0000000000000000000000000000000000000000',
  _feePayerSignatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
  _feeRatio: '0x1e',
  _to: '0x',
  _value: '0x0',
  _input: '0x60806...',
  _humanReadable: false,
  _codeFormat: '0x0',
  _chainId: '0x2710',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x306'
}

// Sign a SmartContractExecution
> myContract.sign({ from: '0x{address in hex}', gas: 1000000 }, 'methodName', 123).then(console.log)
SmartContractExecution {
  _type: 'TxTypeSmartContractExecution',
  _from: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x4e44', _r: '0xb2846...', _s: '0x422c1...' } ],
  _to: '0x361870b50834a6afc3358e81a3f7f1b1eb9c7e55',
  _value: '0x0',
  _input: '0x983b2...',
  _chainId: '0x2710',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x23b'
}

// Sign a FeeDelegatedSmartContractExecution
> myContract.sign({
    from: '0x{address in hex}',
    gas: 1000000,
    feeDelegation: true,
  }, 'methodName', 123).then(console.log)
FeeDelegatedSmartContractExecution {
  _type: 'TxTypeFeeDelegatedSmartContractExecution',
  _from: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x4e43', _r: '0xf7676...', _s: '0x42673...' } ],
  _feePayer: '0x0000000000000000000000000000000000000000',
  _feePayerSignatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
  _to: '0x361870b50834a6afc3358e81a3f7f1b1eb9c7e55',
  _value: '0x0',
  _input: '0x983b2...',
  _chainId: '0x2710',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x254'
}

// Sign a FeeDelegatedSmartContractExecutionWithRatio
> myContract.sign({
    from: '0x{address in hex}',
    gas: 1000000,
    feeDelegation: true,
    feeRatio: 30,
  }, 'methodName', 123).then(console.log)
FeeDelegatedSmartContractExecutionWithRatio {
  _type: 'TxTypeFeeDelegatedSmartContractExecutionWithRatio',
  _from: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x4e44', _r: '0x58b06...', _s: '0x637ff...' } ],
  _feePayer: '0x0000000000000000000000000000000000000000',
  _feePayerSignatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
  _feeRatio: '0x1e',
  _to: '0x361870b50834a6afc3358e81a3f7f1b1eb9c7e55',
  _value: '0x0',
  _input: '0x983b2...',
  _chainId: '0x2710',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x262'
}
```

## myContract.signAsFeePayer<a id="mycontract-signasfeepayer"></a>

```javascript
myContract.signAsFeePayer(options, methodName [, param1 [, param2 [, ...]]])
```

스마트 컨트랙트 배포 또는 스마트 컨트랙트 함수 실행을 위해 수수료 납부자로서 스마트 컨트랙트 트랜잭션에 서명합니다.

스마트 컨트랙트가 배포되었다면 `myContract.signAsFeePayer({ from, feeDelegation: true, feePayer, ... }, 'constructor', byteCode, ...)`와 같이 methodName에 'constructor'를 입력할 수 있습니다.

이 함수에 사용되는 트랜잭션 타입은 `options`나 `myContract.options`에 정의된 값에 따라 결정됩니다. `signAsFeePayer`는 트랜잭션 수수료 납부자로서 서명하는 함수이기 때문에 `feeDelegation` 필드는 `true`로 정의되어야 합니다. 수수료 납부자의 주소 또한 `feePayer` 필드에 정의되어 있어야 합니다.

- `feeDelegation`이 정의되지 않음: 에러 반환.
- `feeDelegation`이 정의되었지만, `feePayer`는 정의되지 않음: 에러 반환.
- `feeDelegation`은 `true`로 정의가 되어있고 `feePayer`도 정의되지 않음, `feeRatio`는 정의되어 있지 않음: [FeeDelegatedSmartContractDeploy][] / [FeeDelegatedSmartContractExecution][]
- `feeDelegation`가 `true`로 정의되었고 `feePayer`와 [feeRatio][]도 정의되었음: [FeeDelegatedSmartContractDeployWithRatio][] / [FeeDelegatedSmartContractExecutionWithRatio][]

**NOTE** 서명을 하기 위해서는 `caver.wallet`가 `options`나 `myContract.options`의 `feePayer`에 해당하는 키링 인스턴스를 포함해야 합니다.

**참고** `myContract. signAsFeePayer`는 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1)부터 지원됩니다.

**매개변수**

| 이름         | 타입     | 설명                                                                                         |
| ---------- | ------ | ------------------------------------------------------------------------------------------ |
| options    | object | 전송에 사용되는 옵션. 자세한 사항은 [methods.methodName.send](#methods-methodname-send)의 표를 참고하세요.        |
| methodName | string | 실행할 컨트랙트 함수의 메서드 이름입니다. 스마트 컨트랙트 배포를 위해 트랜잭션에 서명하고 싶다면 메서드 이름 대신 'constructor' 문자열을 사용하세요. |
| parameters | 복합     | (선택 사항) 스마트 컨트랙트 함수에 전달되는 파라미터입니다. 스마트 컨트랙트 배포 트랜잭션에 서명하고 싶다면 바이트코드와 생성자 파라미터를 전달하세요.      |

**리턴값**

`Promise`는 [Transaction](./caver.transaction/README.md)을 반환 - 서명된 스마트 컨트랙트 트랜잭션입니다.

**Example**

```javascript
// Sign a FeeDelegatedSmartContractDeploy
> myContract.signAsFeePayer({ from: '0x{address in hex}', feeDelegation: true, feePayer: '0x{address in hex}', gas: 1000000 }, 'constructor', byteCode, 123).then(console.log)
FeeDelegatedSmartContractDeploy {
  _type: 'TxTypeFeeDelegatedSmartContractDeploy',
  _from: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
  _feePayer: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _feePayerSignatures: [ SignatureData { _v: '0x4e43', _r: '0xe0641...', _s: '0x1d21e...' } ],
  _to: '0x',
  _value: '0x0',
  _input: '0x60806...',
  _humanReadable: false,
  _codeFormat: '0x0',
  _chainId: '0x2710',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x32a'
}

// Sign a FeeDelegatedSmartContractDeployWithRatio
> myContract.signAsFeePayer({ from: keyring.address, feeDelegation: true, feePayer: '0x{address in hex}', feeRatio: 30, gas: 1000000 }, 'constructor', byteCode, 123).then(console.log)
FeeDelegatedSmartContractDeployWithRatio {
  _type: 'TxTypeFeeDelegatedSmartContractDeployWithRatio',
  _from: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
  _feePayer: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _feePayerSignatures: [ SignatureData { _v: '0x4e44', _r: '0x307bd...', _s: '0x75110...' } ],
  _feeRatio: '0x1e',
  _to: '0x',
  _value: '0x0',
  _input: '0x60806...',
  _humanReadable: false,
  _codeFormat: '0x0',
  _chainId: '0x2710',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x359'
}

// Sign a FeeDelegatedSmartContractExecution
> myContract.signAsFeePayer({
    from: '0x{address in hex}',
    gas: 1000000,
    feeDelegation: true,
    feePayer: '0x{address in hex}',
  }, 'methodName', 123).then(console.log)
FeeDelegatedSmartContractExecution {
  _type: 'TxTypeFeeDelegatedSmartContractExecution',
  _from: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
  _feePayer: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _feePayerSignatures: [ SignatureData { _v: '0x4e43', _r: '0xc58ba...', _s: '0x76fdb...' } ],
  _to: '0x4a9d979707aede18fa674711f3b2fe110fac4e7e',
  _value: '0x0',
  _input: '0x983b2...',
  _chainId: '0x2710',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x36c'
}

// Sign a FeeDelegatedSmartContractExecutionWithRatio
> myContract.signAsFeePayer({
    from: '0x{address in hex}',
    gas: 1000000,
    feeDelegation: true,
    feePayer: '0x{address in hex}',
    feeRatio: 30,
  }, 'methodName', 123).then(console.log)
FeeDelegatedSmartContractExecutionWithRatio {
  _type: 'TxTypeFeeDelegatedSmartContractExecutionWithRatio',
  _from: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
  _feePayer: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _feePayerSignatures: [ SignatureData { _v: '0x4e44', _r: '0xeb78d...', _s: '0x2864d...' } ],
  _feeRatio: '0x1e',
  _to: '0x4a9d979707aede18fa674711f3b2fe110fac4e7e',
  _value: '0x0',
  _input: '0x983b2...',
  _chainId: '0x2710',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x37b'
}
```

## myContract.call<a id="mycontract-call"></a>

```javascript
myContract.call('methodName', [param1 [, param2 [, ...]]])
myContract.call(options, 'methodName', [param1 [, param2 [, ...]]])
```

상수형 메서드를 호출하며 트랜잭션을 보내지 않고 그 스마트 컨트랙트 메서드를 Klaytn 가상머신에서 실행합니다. 이러한 호출은 스마트 컨트랙트 상태를 변경할 수 없음에 유의하세요.

**참고** `myContract.call`는 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1)부터 지원됩니다.

**매개변수**

| 이름         | 타입     | 설명                                                                                                                             |
| ---------- | ------ | ------------------------------------------------------------------------------------------------------------------------------ |
| options    | object | (optional) The options used for calling. See the table in [methods.methodName.call](#methods-methodname-call) for the details. |
| methodName | string | The method name of the contract function to call.                                                                              |
| parameters | 복합     | (선택 사항) 스마트 컨트랙트 함수에 전달되는 파라미터입니다.                                                                                             |


**리턴값**

`Promise`가 `Mixed`를 반환: 스마트 컨트랙트 메서드의 리턴값(들) 입니다. 하나의 값을 반환하면, 그대로 반환됩니다. 다수의 반환값이 있는 경우 속성과 인덱스로 구성된 객체로서 반환됩니다.

**Example**

```javascript
> myContract.call('methodName').then(console.log)
Jasmine

> myContract.call({ from: '0x{address in hex}' }, 'methodName', 123).then(console.log)
Test Result
```

## myContract.decodeFunctionCall<a id="mycontract-decodefunctioncall"></a>

```javascript
myContract.decodeFunctionCall(functionCall)
```

Decodes a function call and returns parameters.

**NOTE** `myContract.decodeFunctionCall` is supported since caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3).

**매개변수**

| 이름           | 타입     | 설명                                |
| ------------ | ------ | --------------------------------- |
| functionCall | string | The encoded function call string. |

**리턴값**

| 타입     | 설명                                                                                                                                            |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| object | An object which includes plain params. You can use `result[0]` as it is provided to be accessed like an array in the order of the parameters. |

**예제**

```javascript
// The myContract variable is instantiated with the below abi.
/ [
//   {
//     constant: true,
//     inputs: [{ name: 'key', type: 'string' }],
//     name: 'get',
//     outputs: [{ name: '', type: 'string' }],
//     payable: false,
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     constant: false,
//     inputs: [{ name: 'key', type: 'string' }, { name: 'value', type: 'string' }],
//     name: 'set',
//     outputs: [],
//     payable: false,
//     stateMutability: 'nonpayable',
//     type: 'function',
//   },
// ]
> myContract.decodeFunctionCall('0xe942b5160000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000036b65790000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000576616c7565000000000000000000000000000000000000000000000000000000')
Result {
  '0': '2345675643',
  '1': 'Hello!%',
  __length__: 2,
  myNumber: '2345675643',
  mystring: 'Hello!%'
}
```


## myContract.methods<a id="mycontract-methods"></a>

```javascript
myContract.methods.methodName([param1 [, param2 [, ...]]])
myContract.methods['methodName']([param1 [, param2 [, ...]]])
```
호출, 전송, 추정 또는 ABI 인코딩될 수 있는 해당 메소드에 대한 트랜잭션 객체를 생성합니다.

이 스마트 컨트랙트의 메서드는 다음을 통해 이용할 수 있습니다:

- 메서드 이름: `myContract.methods.methodName(123)` 또는 `myContract.methods[methodName](123)`
- 메서드 프로토타입: `myContract.methods['methodName(uint256)'](123)`
- 메서드 서명: `myContract.methods['0x58cf5f10'](123)`

이를 통해 자바스크립트 컨트랙트 객체로부터 이름은 같지만 매개변수가 다른 함수를 호출할 수 있습니다.

## cf) \*function signature (function selector)<a id="cf-function-signature-function-selector"></a>
The first four bytes of the call data for a function call specifies the function to be called.  
It is the first (left, high-order in big-endian) four bytes of the Keccak-256 (SHA-3) hash of the signature of the function.

함수 서명은 두 가지 방식으로 가능합니다.  
`1. caver.abi.encodefunctionSignature('funcName(paramType1,paramType2,...)')`  
`2. caver.utils.sha3('funcName(paramType1,paramType2,...)').substr(0, 10)`

ex)
```javascript
caver.abi.encodefunctionSignature('methodName(uint256)')
> 0x58cf5f10

caver.utils.sha3('methodName(uint256)').substr(0, 10)
> 0x58cf5f10
```

**매개변수**

JSON 인터페이스에 정의된 스마트 컨트랙트 메서드에 속하는 모든 메서드의 매개변수

**리턴값**

`Promise`는 `object`를 반환 - 컨트랙트 실행을 위한 인자와 함수가 정의되어 있는 객체입니다:

| 이름                                                   | 타입       | 설명                                                                                                                                                                               |
| ---------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| arguments                                            | Array    | The arguments passed to this method.                                                                                                                                             |
| [call](#methods-methodname-call)                     | function | The function that will call and execute a constant method in its smart contract on Klaytn Virtual Machine without sending a transaction (cannot alter the smart contract state). |
| [send](#methods-methodname-send)                     | function | The function that will send a transaction to the Klaytn and execute its method (can alter the smart contract state).                                                             |
| [sign](#methods-methodname-sign)                     | function | The function that will sign a transaction as a sender. The sign function will return signed transaction.                                                                         |
| [signAsFeePayer](#methods-methodname-signasfeepayer) | function | The function that will sign a transaction as a fee payer. The signAsFeePayer function will return signed transaction.                                                            |
| [estimateGas](#methods-methodname-estimategas)       | function | The that function will estimate the gas used for the execution.                                                                                                                  |
| [encodeABI](#methods-methodname-encodeabi)           | function | The function that encodes the ABI for this method. This can be sent using a transaction, calling the method, or passing into another smart contract method as its argument.      |

**참고** `sign`과 `signAsFeePayer`는 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1)부터 지원됩니다.

**Example**

```javascript
// Calling a method
> myContract.methods.methodName(123).call({ ... }, function(error, result) { ... })
> myContract.methods.methodName(123).call({ ... }).then((result) => { ... })

// Sending basic transaction and using the promise
> myContract.methods.methodName(123).send({
    from: '0x{address in hex}',
    ...
  }).then(function(receipt) {
    // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
  })

// Sending basic transaction and using the eventEmitter
> myContract.methods.methodName(123).send({
    from: '0x{address in hex}',
    ...
  }).on('transactionHash', function(hash) {
      ...
  })
  .on('receipt', function(receipt) {
      ...
  })
  .on('error', console.error)

// Sending fee delegation transaction and using the promise
> myContract.methods.methodName(123).send({
    from: '0x{address in hex}',
    feePayer: '0x{fee-payer address}',
    feeDelegation: true,f
    ...
  }).then(function(receipt) {
    // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
  })

// Sending partial fee delegation transaction and using the promise
> myContract.methods.methodName(123).send({
    from: '0x{address in hex}',
    feePayer: '0x{fee-payer address}',
    feeDelegation: true,
    feeRatio: 30,
    ...
  }).then(function(receipt) {
    // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
  })

// sign the basic transaction
> myContract.methods.methodName(123).sign({
    from: '0x{address in hex}',
    feeDelegation: true,
    ...
  }).then(function(signedTx) { ... })

// sign the fee delegation transaction
> myContract.methods.methodName(123).sign({
    from: '0x{address in hex}',
    feeDelegation: true,
    ...
  }).then(function(signedTx) { ... })

// sign the partial fee delegation transaction
> myContract.methods.methodName(123).sign({
    from: '0x{address in hex}',
    feeDelegation: true,
    feeRatio: 30,
    ...
  }).then(function(signedTx) { ... })

// sign the fee delegation transaction as a fee payer
> myContract.methods.methodName(123).signAsFeePayer({
    from: '0x{address in hex}',
    feePayer: '0x{fee-payer address}',
    feeDelegation: true,
    ...
  }).then(function(signedTx) { ... })

// sign the partial fee delegation transaction as a fee payer
> myContract.methods.methodName(123).signAsFeePayer({
    from: '0x{address in hex}',
    feePayer: '0x{fee-payer address}',
    feeDelegation: true,
    feeRatio: 30,
    ...
  }).then(function(signedTx) { ... })
```


## methods.methodName.call<a id="methods-methodname-call"></a>

```javascript
myContract.methods.methodName([param1 [, param2 [, ...]]]).call(options [, callback])
myContract.methods['methodName']([param1 [, param2 [, ...]]]).call(options [, callback])
```

상수형 메서드를 호출하며 트랜잭션을 보내지 않고 그 스마트 컨트랙트 메서드를 Klaytn 가상머신에서 실행합니다.  이러한 호출은 스마트 컨트랙트 상태를 변경할 수 없음에 유의하세요. 단축함수로서 제공되는 [myContract.call](#mycontract-call)를 사용하는 것이 제안됩니다.

**매개변수**

| 이름       | 타입       | 설명                                                                                                                                                                   |
| -------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options  | object   | (optional) The options used for calling. 자세한 내용은 아래 표를 참조하세요.                                                                                                        |
| callback | function | (optional) This callback will be fired with the result of the smart contract method execution as the second argument, or with an error object as the first argument. |

옵션 개체에는 다음이 포함됩니다:

| 이름       | 타입     | 설명                                                                         |
| -------- | ------ | -------------------------------------------------------------------------- |
| from     | string | (optional) The address which calling contract methods should be made from. |
| gasPrice | string | (optional) The gas price in peb to use for this call.                      |
| gas      | number | (optional) The maximum gas provided for this call (gas limit).             |

**리턴값**

`Promise`가 `Mixed`를 반환: 스마트 컨트랙트 메서드의 리턴값(들) 입니다. 하나를 반환하면, 그대로 반환됩니다. 다수의 반환값이 있는 경우 속성과 인덱스로 구성된 객체로서 반환됩니다.

**Example**

```javascript
// promise 사용
> myContract.methods.methodName(123).call({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
  .then(function(result) {
      ...
  })
```

```solidity
// Solidity: MULTIPLE RETURN VALUES
contract MyContract {
    function myFunction() public returns(uint256 myNumber, string memory myString) {
        return (23456, "Hello!%");
    }
}
```

```javascript
> var MyContract = new caver.contract(abi, address)
> MyContract.methods.myfunction().call().then(console.log)
Result {
      mynumber: '23456',
      mystring: 'Hello!%',
      0: '23456',
      1: 'Hello!%'
}
```

```solidity
// Solidity: SINGLE RETURN VALUE
contract MyContract {
    function myfunction() public returns(string memory mystring) {
        return "Hello!%";
    }
}
```

```javascript
> var MyContract = new caver.contract(abi, address)
> MyContract.methods.myfunction().call().then(console.log)
"Hello!%"
```


## methods.methodName.send<a id="methods-methodname-send"></a>

```javascript
myContract.methods.methodName([param1 [, param2 [, ...]]]).send(options [, callback])
myContract.methods['methodName']([param1 [, param2 [, ...]]]).send(options [, callback])
```

Will send a transaction to deploy the smart contract or execute the function of the smart contract. 이러한 호출은 스마트 컨트랙트의 상태를 변경할 수 있습니다. It is recommended to use [myContract.send](#mycontract-send) provided as a short-cut function.

If a smart contract is deployed, 'constructor' can be entered in the methodName, such as `myContract.methods.constructor` or `myContract.methods['constructor']`, but it is recommended to use the [myContract.deploy](#mycontract-deploy2) function.

이 함수에 사용되는 트랜잭션 타입은 `options`나 `myContract.options`에 정의된 값에 따라 결정됩니다. If you want to use a fee-delegated transaction through `methods.methodName.send`, `feeDelegation` and `feePayer` should be set properly.

- `feeDelegation`이 정의되지 않았거나 `false`로 정의: [SmartContractDeploy][] / [SmartContractExecution][]
- `feeDelegation`가 `true`로 정의되었지만, `feePayer`가 정의되지 않음: 에러 반환.
- `feeDelegation`은 `true`로 정의가 되어있고 `feePayer`도 정의되지 않음, `feeRatio`는 정의되어 있지 않음: [FeeDelegatedSmartContractDeploy][] / [FeeDelegatedSmartContractExecution][]
- `feeDelegation`가 `true`로 정의되었고 `feePayer`와 [feeRatio][]도 정의되었음: [FeeDelegatedSmartContractDeployWithRatio][] / [FeeDelegatedSmartContractExecutionWithRatio][]

**NOTE** 서명을 하기 위해서는 `caver.wallet`가 `options`나 `myContract.options`의 `from`와 `feePayer`에 해당하는 키링 인스턴스를 포함해야 합니다.

**매개변수**

| 이름       | 타입       | 설명                                                                                                                      |
| -------- | -------- | ----------------------------------------------------------------------------------------------------------------------- |
| options  | object   | 전송에 사용되는 옵션. 자세한 내용은 아래 표를 참조하세요.                                                                                       |
| callback | function | (optional) This callback will be fired first with the "transactionHash", or with an error object as the first argument. |

옵션 개체에는 다음이 포함됩니다:

| 이름            | 타입                                              | 설명                                                                                                                                                                                                                                   |
| ------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| from          | string                                          | 트랜잭션을 보낼 송신자 주소. If omitted, `myContract.options.from` will be used.                                                                                                                                                                 |
| gas           | number                                          | The maximum gas provided for this transaction (gas limit).                                                                                                                                                                           |
| gasPrice      | string                                          | (선택 사항) 트랜잭션에 사용할 peb 단위의 가스 가격.                                                                                                                                                                                                     |
| value         | number &#124; string &#124; BN &#124; Bignumber | (optional) The value in peb to be transferred to the address of the smart contract by this transaction.                                                                                                                              |
| feeDelegation | boolean                                         | (optional, default `false`) 수수료 위임 트랜잭션 사용 여부를 나타냅니다. If omitted, `myContract.options.feeDelegation` will be used.                                                                                                                   |
| feePayer      | string                                          | (선택 사항) 트랜잭션 수수료를 부담하는 수수료 납부자의 주소입니다. `feeDelegation`이 `true`일 때, 값은 트랜잭션의 `feePayer` 필드에 설정됩니다. If omitted, `myContract.options.feePayer` will be used.                                                                            |
| feeRatio      | string                                          | (optional) Fee payer가 부담하게될 트랜잭션 수수료의 비율입니다. `feeDelegation`이 `true`이며, `feeRatio`가 유효한 값으로 설정되었을 경우, 부분 수수료 위임 트랜잭션이 사용됩니다. 유효한 범위는 1에서 99 사이입니다. 0이나 100 이상의 값은 허용되지 않습니다. If omitted, `myContract.options.feeRatio` will be used. |

**참고** `feeDelegation`, `feePayer`, 그리고 `feeRatio`는 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 이후부터 지원됩니다.

**리턴값**

`Promise` returns `PromiEvent`

| 타입         | 설명                                                                                                                                     |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| PromiEvent | 프로미스(promise)가 조합된 이벤트 이미터(event emitter). 트랜잭션 영수증이 준비되면 해결(resolve)됩니다. The promise will be resolved with the new contract instance. |

PromiEvent에서는 다음 이벤트가 발생할 수 있습니다.

- `"transactionHash"`: 트랜잭션이 전송되고 트랜잭션 해시가 준비된 직후에 발생합니다. 타입은 `string`입니다.
- `receipt`: 트랜잭션 영수중이 준비되면 발생합니다. 자세한 내용은 [caver.rpc.klay.getTransactionReceipt](./caver.rpc/klay.md#caver-rpc-klay-gettransactionreceipt)를 참조하세요. 타입은 `object`입니다.
- `error`: 전송 중 에러가 발생하면 발생합니다. 가스 부족 에러(out-of-gas)가 발생한 경우 두 번째 인자는 트랜잭션 영수증입니다. 타입은 `error`입니다.

**Example**

```javascript
// using the promise
> myContract.methods.methodName(123).send({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
  .then(function(receipt) {
    // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
  })


// using the event emitter
> myContract.methods.methodName(123).send({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
  .on('transactionHash', function(hash) {
    ...
  })
  .on('receipt', function(receipt) {
    console.log(receipt)
  })
  .on('error', console.error) // If there is an out-of-gas error, the second parameter is the receipt.

// receipt example
{
   "transactionHash": "0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b",
   "transactionIndex": 0,
   "blockHash": "0xef95f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b46",
   "blocknumber": 3,
   "contractAddress": "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe",
   "gasUsed": 30234,
   "events": {
     "eventName": {
       returnValues: {
         myIndexedParam: 20,
         myOtherIndexedParam: '0x123456789...',
         myNonIndexParam: 'My string'
       },
       raw: {
         data: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
         topics: ['0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7', '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385']
       },
       event: 'eventName',
       signature: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
       logIndex: 0,
       transactionIndex: 0,
       transactionHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
       blockHash: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
       blocknumber: 1234,
       address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
    },
    "MyOtherEvent": {
      ...
    },
    "MyMultipleEvent":[{...}, {...}] // If there are multiples of the same events, they will be in an array.
  }
}

// Deploy the contract
> myContract.methods.constructor('0x{byte code}', 123).send({ from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe', gas: 1000000 })
> myContract.methods['constructor']('0x{byte code}', 123).send({ from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe', gas: 1000000 })
```

## methods.methodName.sign <a id="methods-methodname-sign"></a>

```javascript
myContract.methods.methodName([param1 [, param2 [, ...]]]).sign(options)
myContract.methods['methodName']([param1 [, param2 [, ...]]]).sign(options)
```

스마트 컨트랙트 배포 또는 스마트 컨트랙트 함수 실행을 위해 발신자로서 스마트 컨트랙트 트랜잭션에 서명합니다. It is recommended to use [myContract.sign](#mycontract-sign) provided as a short-cut function.

If a smart contract is deployed, 'constructor' can be entered in the methodName, such as `myContract.methods.constructor` or `myContract.methods['constructor']`.

이 함수에 사용되는 트랜잭션 타입은 `options`나 `myContract.options`에 정의된 값에 따라 결정됩니다. If you want to use a fee-delegated transaction through `methods.methodName.sign`, `feeDelegation` should be defined as `true`.

- `feeDelegation`이 정의되지 않았거나 `false`로 정의: [SmartContractDeploy][] / [SmartContractExecution][]
- `feeDelegation`가 `true`로 정의되었지만 [feeRatio][]가 정의되지 않음: [FeeDelegatedSmartContractDeploy][] / [FeeDelegatedSmartContractExecution][]
- `feeDelegation`가 `true`로 정의되었고 [feeRatio][]도 정의되었음: [FeeDelegatedSmartContractDeployWithRatio][] / [FeeDelegatedSmartContractExecutionWithRatio][]

**NOTE** 서명을 하기 위해서는 `caver.wallet`가 `options`나 `myContract.options`의 `from`에 해당하는 키링 인스턴스를 포함해야 합니다.

**NOTE** `methods.methodName.sign` is supported since caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1).

**매개변수**

| 이름      | 타입     | 설명                                                                                                                                           |
| ------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| options | object | The options used for creating a transaction. See the parameter table in [methods.methodName.send](#methods-methodname-send) for the details. |

**리턴값**

`Promise`는 [Transaction](./caver.transaction/README.md)을 반환 - 서명된 스마트 컨트랙트 트랜잭션입니다.

**Example**

```javascript
// Sign a SmartContractDeploy transaction
> myContract.methods.constructor(byteCode, 123).sign({ from: '0x{address in hex}', gas: 1000000 }).then(console.log)
SmartContractDeploy {
  _type: 'TxTypeSmartContractDeploy',
  _from: '0x60498fefbf1705a3db8d7bb5c80d5238956343e5',
  _gas: '0xf4240',
  _signatures: [
    SignatureData {
      _v: '0x07f6',
      _r: '0x26a05...',
      _s: '0x3e3e4...'
    }
  ],
  _to: '0x',
  _value: '0x0',
  _input: '0x60806...',
  _humanReadable: false,
  _codeFormat: '0x0',
  _chainId: '0x3e9',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x2f6'
}
> myContract.methods['constructor'](byteCode, 123).sign({ from: '0x{address in hex}', gas: 1000000 }).then(console.log)

// Sign a FeeDelegatedSmartContractDeploy transaction
> myContract.methods.constructor(byteCode, 123).sign({ from: '0x{address in hex}', feeDelegation: true, gas: 1000000 }).then(console.log)
FeeDelegatedSmartContractDeploy {
  _type: 'TxTypeFeeDelegatedSmartContractDeploy',
  _from: '0x60498fefbf1705a3db8d7bb5c80d5238956343e5',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x07f5', _r: '0xa74f7...', _s: '0x0991e...' } ],
  _feePayer: '0x0000000000000000000000000000000000000000',
  _feePayerSignatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
  _to: '0x',
  _value: '0x0',
  _input: '0x60806...',
  _humanReadable: false,
  _codeFormat: '0x0',
  _chainId: '0x3e9',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x2f6'
}
> myContract.methods['constructor'](byteCode, 123).sign({ from: '0x{address in hex}', feeDelegation: true, gas: 1000000 }).then(console.log)

// Sign a SmartContractExecution transaction
> myContract.methods.methodName('0x...').sign({ from: '0x{address in hex}', gas: 1000000 }).then(console.log)
SmartContractExecution {
  _type: 'TxTypeSmartContractExecution',
  _from: '0x60498fefbf1705a3db8d7bb5c80d5238956343e5',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x07f5', _r: '0xafbf9...', _s: '0x10ea0...' } ],
  _to: '0xbc6723431a57abcacc4016ae664ee778d313ca6e',
  _value: '0x0',
  _input: '0x983b2d5600000000000000000000000060498fefbf1705a3db8d7bb5c80d5238956343e5',
  _chainId: '0x3e9',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x2f6'
}

> myContract.methods['methodName']('0x...').sign({ from: '0x{address in hex}', gas: 1000000 }).then(console.log)

// Sign a FeeDelegatedSmartContractExecution transaction
> myContract.methods.methodName('0x...').sign({ from: '0x{address in hex}', feeDelegation: true, gas: 1000000 }).then(console.log)
FeeDelegatedSmartContractExecution {
  _type: 'TxTypeFeeDelegatedSmartContractExecution',
  _from: '0x60498fefbf1705a3db8d7bb5c80d5238956343e5',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x07f6', _r: '0xdfc14...', _s: '0x38b9c...' } ],
  _feePayer: '0x0000000000000000000000000000000000000000',
  _feePayerSignatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
  _to: '0xbc6723431a57abcacc4016ae664ee778d313ca6e',
  _value: '0x0',
  _input: '0x983b2d5600000000000000000000000060498fefbf1705a3db8d7bb5c80d5238956343e5',
  _chainId: '0x3e9',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x2f6'
}
> myContract.methods['methodName']('0x...').sign({ from: '0x{address in hex}', feeDelegation: true, gas: 1000000 }).then(console.log)
```

## methods.methodName.signAsFeePayer <a id="methods-methodname-signasfeepayer"></a>

```javascript
myContract.methods.methodName([param1 [, param2 [, ...]]]).signAsFeePayer(options)
myContract.methods['methodName']([param1 [, param2 [, ...]]]).signAsFeePayer(options)
```

스마트 컨트랙트 배포 또는 스마트 컨트랙트 함수 실행을 위해 수수료 납부자로서 스마트 컨트랙트 트랜잭션에 서명합니다. It is recommended to use [myContract.signAsFeePayer](#mycontract-signasfeepayer) provided as a short-cut function.

If a smart contract is deployed, 'constructor' can be entered in the methodName, such as `myContract.methods.constructor` or `myContract.methods['constructor']`.

이 함수에 사용되는 트랜잭션 타입은 `options`나 `myContract.options`에 정의된 값에 따라 결정됩니다. `signAsFeePayer`는 트랜잭션 수수료 납부자로서 서명하는 함수이기 때문에 `feeDelegation` 필드는 `true`로 정의되어야 합니다. 수수료 납부자의 주소 또한 `feePayer` 필드에 정의되어 있어야 합니다.

- `feeDelegation`이 정의되지 않음: 에러 반환.
- `feeDelegation`이 정의되었지만, `feePayer`는 정의되지 않음: 에러 반환.
- `feeDelegation`은 `true`로 정의가 되어있고 `feePayer`도 정의되지 않음, `feeRatio`는 정의되어 있지 않음: [FeeDelegatedSmartContractDeploy][] / [FeeDelegatedSmartContractExecution][]
- `feeDelegation`가 `true`로 정의되었고 `feePayer`와 [feeRatio][]도 정의되었음: [FeeDelegatedSmartContractDeployWithRatio][] / [FeeDelegatedSmartContractExecutionWithRatio][]

**NOTE** 서명을 하기 위해서는 `caver.wallet`가 `options`나 `myContract.options`의 `feePayer`에 해당하는 키링 인스턴스를 포함해야 합니다.

**NOTE** `methods.methodName.signAsFeePayer` is supported since caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1).

**매개변수**

| 이름      | 타입     | 설명                                                                                                                                           |
| ------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| options | object | The options used for creating a transaction. See the parameter table in [methods.methodName.send](#methods-methodname-send) for the details. |

**리턴값**

`Promise`는 [Transaction](./caver.transaction/README.md)을 반환 - 서명된 스마트 컨트랙트 트랜잭션입니다.

**Example**

```javascript
// Sign a FeeDelegatedSmartContractDeploy transaction
> myContract.methods.constructor(byteCode, 123).signAsFeePayer({ from: '0x{address in hex}', feeDelegation: true, feePayer: '0x{address in hex}', gas: 1000000 }).then(console.log)
> FeeDelegatedSmartContractDeploy {
  _type: 'TxTypeFeeDelegatedSmartContractDeploy',
  _from: '0x60498fefbf1705a3db8d7bb5c80d5238956343e5',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
  _feePayer: '0x60498fefbf1705a3db8d7bb5c80d5238956343e5',
  _feePayerSignatures: [ SignatureData { _v: '0x07f6', _r: '0x2c385...', _s: '0x7fa79...' } ],
  _to: '0x',
  _value: '0x0',
  _input: '0x60806...',
  _humanReadable: false,
  _codeFormat: '0x0',
  _chainId: '0x3e9',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x2f6'
}
> myContract.methods['constructor'](byteCode, 123).signAsFeePayer({ from: '0x{address in hex}', feeDelegation: true, feePayer: '0x{address in hex}', gas: 1000000 }).then(console.log)

// Sign a FeeDelegatedSmartContractExecution transaction
> myContract.methods.methodName(123).signAsFeePayer({ from: '0x{address in hex}', feeDelegation: true, feePayer: '0x{address in hex}', gas: 1000000 }).then(console.log)
> FeeDelegatedSmartContractExecution {
  _type: 'TxTypeFeeDelegatedSmartContractExecution',
  _from: '0x60498fefbf1705a3db8d7bb5c80d5238956343e5',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
  _feePayer: '0x60498fefbf1705a3db8d7bb5c80d5238956343e5',
  _feePayerSignatures: [ SignatureData { _v: '0x07f6', _r: '0x793eb...', _s: '0x0f776...' } ],
  _to: '0x294b2618f29714732cfc202d7be53bf5efee90dd',
  _value: '0x0',
  _input: '0x983b2d5600000000000000000000000060498fefbf1705a3db8d7bb5c80d5238956343e5',
  _chainId: '0x3e9',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x2f6'
}
> myContract.methods['methodName'](123).signAsFeePayer({ from: '0x{address in hex}', feeDelegation: true, feePayer: '0x{address in hex}', gas: 1000000 }).then(console.log)
```

## methods.methodName.estimateGas <a id="methods-methodname-estimategas"></a>

```javascript
myContract.methods.methodName([param1 [, param2 [, ...]]]).estimateGas(options [, callback])
```

Will estimate the gas that a method execution will take when executed in the Klaytn Virtual Machine. The estimation can differ from the actual gas used when later sending a transaction, as the state of the smart contract can be different at that time.

**매개변수**

| 이름       | 타입       | 설명                                                                                                                                                  |
| -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| options  | object   | (optional) The options used for calling. 자세한 내용은 아래 표를 참조하세요.                                                                                       |
| callback | function | (optional) This callback will be fired with the result of the gas estimation as the second argument, or with an error object as the first argument. |

옵션 개체에는 다음이 포함됩니다:

| 이름    | 타입                                              | 설명                                                                                                                                                                     |
| ----- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from  | string                                          | (optional) The address from which calling the contract method should be made.                                                                                          |
| gas   | number                                          | (optional) The maximum gas provided for this call (gas limit). 특정 값을 설정하면 가스 부족 오류를 감지하는 데 도움이 됩니다. 모든 가스가 사용되면 같은 숫자를 반환합니다.                                          |
| value | number &#124; string &#124; BN &#124; Bignumber | (optional) The value in peb that would be transferred to the address of the smart contract if the transaction for executing this contract function was sent to Klaytn. |

**리턴값**

`Promise`는 `number`를 반환합니다.

| 타입     | 설명                                               |
| ------ | ------------------------------------------------ |
| number | The used gas for the simulated call/transaction. |

**Example**

```javascript
> myContract.methods.methodName(123).estimateGas({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
  .then(function(gasAmount) {
    ...
  })
  .catch(function(error) {
    ...
  })
```


## methods.methodName.encodeABI <a id="methods-methodname-encodeabi"></a>

```javascript
myContract.methods.methodName([param1 [, param2[, ...]]]).encodeABI()
```

이 메소드에 대한 ABI를 인코딩합니다. This can be used to send a transaction or call a method, or pass it into another smart contract method as arguments.


**매개변수**

JSON 인터페이스에 정의된 스마트 컨트랙트 메서드에 속하는 모든 메서드의 매개변수

**리턴값**

| 타입     | 설명                                  |
| ------ | ----------------------------------- |
| string | 트랜잭션 또는 호출을 통해 전송할 인코딩된 ABI 바이트 코드. |


**Example**

```javascript
> myContract.methods.methodName(123).encodeABI()
'0x58cf5f1000000000000000000000000000000000000000000000000000000000000007B'
```


## myContract.once <a id="mycontract-once"></a>

```javascript
myContract.once(event [, options], callback)
```

Subscribes to an event and unsubscribes immediately after the first event or error. 단일 이벤트에 대해서만 발생합니다.

**매개변수**

| 이름       | 타입       | 설명                                                                                                                                        |
| -------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| event    | string   | The name of the event in the contract, or `allEvents` to get all events.                                                                  |
| options  | object   | (optional) The options used for subscription. 자세한 내용은 아래 표를 참조하세요.                                                                        |
| callback | function | 이 콜백은 첫 번째 이벤트를 두 번째 인수로, 또는 오류를 첫 번째 인수로 하여 발생됩니다. See [myContract.getPastEvents](#getpastevents) for details about the event structure. |

옵션 개체에는 다음이 포함됩니다:

| 이름     | 타입     | 설명                                                                                                                                                                    |
| ------ | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 필터     | object | (optional) Lets you filter events by indexed parameters, *e.g.*, `{filter: {mynumber: [12,13]}}` means all events where "mynumber" is 12 or 13.                       |
| topics | Array  | (optional) This allows you to manually set the topics for the event filter. Given the filter property and event signature, `topic[0]` would not be set automatically. |

**리턴값**

`Promise` returns `object` - An event object. For more detail about event object, please refer to [myContract.getPastEvents](#getpastevents).

**Example**

```javascript
> myContract.once('eventName', {
    filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
  }, function(error, event) { console.log(event) })

// event output example
{
    returnValues: {
        myIndexedParam: 20,
        myOtherIndexedParam: '0x123456789...',
        myNonIndexParam: 'My string'
    },
    raw: {
        data: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
        topics: ['0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7', '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385']
    },
    event: 'eventName',
    signature: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    logIndex: 0,
    transactionIndex: 0,
    transactionHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
    blockHash: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    blocknumber: 1234,
    address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
}
```


## myContract.events <a id="mycontract-events"></a>

```javascript
myContract.events.eventName([options][, callback])
```

이벤트를 구독합니다.

**매개변수**

| 이름       | 타입       | 설명                                                                                                               |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| options  | object   | (optional) The options used for subscription. 자세한 내용은 아래 표를 참조하세요.                                               |
| callback | function | (optional) This callback will be fired for each event as the second argument, or an error as the first argument. |

옵션 개체에는 다음이 포함됩니다:

| 이름        | 타입     | 설명                                                                                                                                                                    |
| --------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 필터        | object | (optional) Lets you filter events by indexed parameters, *e.g.*, `{filter: {mynumber: [12,13]}}` means all events where "mynumber" is 12 or 13.                       |
| fromBlock | number | (optional) The block number from which to get events.                                                                                                                 |
| topics    | Array  | (optional) This allows you to manually set the topics for the event filter. Given the filter property and event signature, `topic[0]` would not be set automatically. |


**리턴값**

`EventEmitter`: 이벤트 이미터는 다음 이벤트를 가집니다:

| 이름        | 타입     | 설명                                                                                        |
| --------- | ------ | ----------------------------------------------------------------------------------------- |
| data      | object | Fires on each incoming event with the event object as an argument.                        |
| connected | string | Fires once after the subscription successfully connected. It returns the subscription ID. |
| error     | object | 구독 오류가 발생하면 발생합니다.                                                                        |

**NOTE** `connected` is available with caver-js [v1.5.7](https://www.npmjs.com/package/caver-js/v/1.5.7).

The structure of the returned event `object` looks as follows:

| 이름               | 타입                   | 설명                                                                                                      |
| ---------------- | -------------------- | ------------------------------------------------------------------------------------------------------- |
| event            | string               | 이벤트 이름.                                                                                                 |
| 서명 값입니다.         | string &#124; `null` | The event signature, `null` if it is an anonymous event.                                                |
| address          | string               | 이 이벤트가 발생한 주소.                                                                                          |
| returnValues     | object               | The return values coming from the event, *e.g.*, `{myVar: 1, myVar2: '0x234...'}`.                      |
| logIndex         | number               | 블록에서 이벤트 인덱스 위치의 정수값.                                                                                   |
| transactionIndex | number               | 이벤트가 생성된 트랜잭션의 인덱스 위치의 정수값.                                                                             |
| transactionHash  | 32바이트 문자열            | 이 이벤트가 생성된 트랜잭션의 해시. 아직 보류 중인 경우 `null`.                                                                |
| blockHash        | 32바이트 문자열            | 이 이벤트가 생성된 블록의 해시. 아직 보류 중인 경우 `null`.                                                                  |
| blocknumber      | number               | 이 로그가 생성된 블록 번호. 아직 보류 중인 경우 `null`.                                                                    |
| raw.data         | string               | 색인화되지 않은 로그 매개변수를 포함하는 데이터.                                                                             |
| raw.topics       | Array                | An array with a maximum of four 32-byte topics, and topic 1-3 contains indexed parameters of the event. |
| id               | string               | 로그 식별자. `keccak256(blockHash + transactionHash + logIndex).substr(0, 8)`을 사용하여 "log_" 문자열을 연결하여 작성됩니다.  |

**Example**

```javascript
> myContract.events.eventName({
    filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
    fromBlock: 0
  }, function(error, event) { console.log(event) })
  .on('connected', function(subscriptionId){
      console.log(subscriptionId)
  })
  .on('data', function(event){
      console.log(event) // same results as the optional callback above
  })
  .on('error', console.error)

// event output example
{
    returnValues: {
        myIndexedParam: 20,
        myOtherIndexedParam: '0x123456789...',
        myNonIndexParam: 'My string'
    },
    raw: {
        data: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
        topics: ['0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7', '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385']
    },
    event: 'eventName',
    signature: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    logIndex: 0,
    transactionIndex: 0,
    transactionHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
    blockHash: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    blocknumber: 1234,
    address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe',
    id: 'log_41d221bc',
}
```


## events.allEvents <a id="events-allevents"></a>

```javascript
myContract.events.allEvents([options] [, callback])
```
Same as [myContract.events](#mycontract-events) but receives all events from this smart contract. 선택적으로 filter 속성은 해당 이벤트를 필터링할 수 있습니다.


## getPastEvents <a id="getpastevents"></a>

```javascript
myContract.getPastEvents(event [, options] [, callback])
```
이 컨트랙트의 이전 이벤트를 가져옵니다.

**매개변수**

| 이름       | 타입       | 설명                                                                                                                            |
| -------- | -------- | ----------------------------------------------------------------------------------------------------------------------------- |
| event    | string   | 컨트랙트, 또는 모든 이벤트를 받기 위한 `"allEvents"`에서의 이벤트 이름.                                                                               |
| options  | object   | (optional) The options used for subscription. 자세한 내용은 아래 표를 참조하세요.                                                            |
| callback | function | (optional) This callback will be fired with an array of event logs as the second argument, or an error as the first argument. |

옵션 개체에는 다음이 포함됩니다:

| 이름        | 타입     | 설명                                                                                                                                                                 |
| --------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 필터        | object | (optional) Lets you filter events by indexed parameters, *e.g.*, `{filter: {mynumber: [12,13]}}` means all events where "mynumber" is 12 or 13.                    |
| fromBlock | number | (optional) The block number from which to get events.                                                                                                              |
| toBlock   | number | (optional) The block number to get events up to (defaults to `"latest"`).                                                                                          |
| topics    | Array  | (optional) This allows manually setting the topics for the event filter. Given the filter property and event signature, `topic[0]` would not be set automatically. |

**리턴값**

`Promise` returns `Array` - An array with the past event objects, matching the given event name and filter.

An event object can contain the following:

| 이름               | 타입                   | 설명                                                                                                                                                                                                            |
| ---------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| event            | string               | 이벤트 이름.                                                                                                                                                                                                       |
| 서명 값입니다.         | string &#124; `null` | The event signature, `null` if it’s an anonymous event.                                                                                                                                                       |
| address          | string               | Address this event originated from.                                                                                                                                                                           |
| returnValues     | object               | The return values coming from the event, e.g. {myVar: 1, myVar2: '0x234...'}.                                                                                                                                 |
| logIndex         | number               | The event index position in the block.                                                                                                                                                                        |
| transactionIndex | number               | The transaction’s index position the event was created in.                                                                                                                                                    |
| transactionHash  | string               | The hash of the transaction this event was created in.                                                                                                                                                        |
| blockHash        | string               | The hash of the block this event was created in. null when it’s still pending.                                                                                                                                |
| blockNumber      | number               | The block number this log was created in. null when still pending.                                                                                                                                            |
| raw              | object               | An object defines `data` and `topic`. `raw.data` containing non-indexed log parameter. `raw.topic` is an array with a maximum of four 32 Byte topics, and topic 1-3 contains indexed parameters of the event. |

**Example**

```javascript
> myContract.getPastEvents('eventName', {
      filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
      fromBlock: 0,
      toBlock: 'latest'
  }, function(error, events) { console.log(events) })
  .then(function(events) {
      console.log(events) // same results as the optional callback above
  })

[{
    returnValues: {
        myIndexedParam: 20,
        myOtherIndexedParam: '0x123456789...',
        myNonIndexParam: 'My string'
    },
    raw: {
        data: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
        topics: ['0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7', '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385']
    },
    event: 'eventName',
    signature: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    logIndex: 0,
    transactionIndex: 0,
    transactionHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
    blockHash: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    blocknumber: 1234,
    address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
},{
      ...
}]
```

[SmartContractDeploy]: ./caver.transaction/basic.md#smartcontractdeploy
[SmartContractExecution]: ./caver.transaction/basic.md#smartcontractexecution
[feeRatio]: ./caver.transaction/fee-delegation.md#feedelegatedsmartcontractdeploy
[FeeDelegatedSmartContractDeploy]: ./caver.transaction/fee-delegation.md#feedelegatedsmartcontractdeploy
[FeeDelegatedSmartContractExecution]: ./caver.transaction/fee-delegation.md#feedelegatedsmartcontractexecution
[feeRatio]: ./caver.transaction/partial-fee-delegation.md#feedelegatedsmartcontractdeploywithratio
[FeeDelegatedSmartContractDeployWithRatio]: ./caver.transaction/partial-fee-delegation.md#feedelegatedsmartcontractdeploywithratio
[FeeDelegatedSmartContractExecutionWithRatio]: ./caver.transaction/partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio
