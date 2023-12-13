# caver.contract

`caver.contract` 객체를 사용하면 Klaytn 블록체인 플랫폼에서 스마트 컨트랙트와 쉽게 상호작용할 수 있습니다. 새로운 컨트랙트 객체를 생성할 때 해당 스마트 컨트랙트에 대한 JSON 인터페이스를 제공해야 하며, caver-js는 JavaScript로 된 컨트랙트 객체와의 모든 호출을 RPC를 통해 저수준 ABI 호출로 자동 변환해줍니다.

이를 통해 마치 JavaScript 객체처럼 스마트 컨트랙트와 상호작용할 수 있습니다.

## caver.contract.create <a href="#caver-contract-create" id="caver-contract-create"></a>

```javascript
caver.contract.create(jsonInterface [, address] [, options])
```

JSON 인터페이스 객체에 정의된 모든 메서드와 이벤트가 포함된 새 컨트랙트 인스턴스를 생성합니다. 이 함수는 [new caver.contract](#new-contract)와 동일하게 작동합니다.

**참고** `caver.contract.create`는 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 부터 지원됩니다.

**매개변수**

[new caver.contract](#new-contract)을 참조하세요.

**리턴 값**

[new caver.contract](#new-contract)을 참조하세요.

**예시**

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

## caver.contract <a href="#new-contract" id="new-contract"></a>

```javascript
new caver.contract(jsonInterface [, address] [, options])
```

JSON 인터페이스 객체에 정의된 모든 메서드와 이벤트가 포함된 새 컨트랙트 인스턴스를 생성합니다.

**매개변수**

| 이름 | 유형 | 설명
| ------------- | ------ | ------------------------------------------------------------------------------------------------------------------------ |
| jsonInterface | Object | 컨트랙트를 인스턴스화할 JSON 인터페이스 |
| address | String | (선택 사항) 호출할 스마트 컨트랙트의 주소입니다. 나중에 `myContract.options.address = '0x1234..'`를 사용하여 추가할 수 있습니다.
| options | Object | (선택 사항) 컨트랙트의 옵션입니다. 자세한 내용은 아래 표를 참조하세요.                                             |

옵션 개체에는 다음이 포함됩니다:

| 이름 | 유형 | 설명
| ------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from | String | (선택 사항) 트랜잭션이 이루어져야 하는 주소입니다.                                                                                                                                                                                                                                     |
| gasPrice | String | (선택 사항) 트랜잭션에 사용할 peb 단위의 가스 가격입니다.                                                                                                                                                                                                                                           |
| gas | Number | (선택 사항) 트랜잭션에 제공되는 최대 가스(가스 한도)입니다.                                                                                                                                                                                                                                 |
| data | String | (선택 사항) 컨트랙트의 바이트 코드입니다. 컨트랙트가 배포될 때 사용됩니다.                                                                                                                                                                                                                    |
| feeDelegation | Boolean | (선택 사항) 수수료 위임 트랜잭션을 사용할지 여부입니다.                                                                                                                                                                                                                                              |
| feePayer | String | (선택 사항) 트랜잭션 수수료를 지불하는 수수료 납부자의 주소입니다. `feeDelegation`이 `true`이면 이 값은 트랜잭션의 `feePayer` 필드에 설정됩니다.                                                                                                                                   |
| feeRatio | String | (선택 사항) 수수료 납부자가 부담하게 될 트랜잭션 수수료의 비율입니다. `feeDelegation`이 `true`이고 `feeRatio`가 유효한 값으로 설정되어 있으면 부분 수수료 위임 트랜잭션이 사용됩니다. 유효한 범위는 1에서 99 사이이며, 0 또는 100 이상의 비율은 허용되지 않습니다. |

**리턴 값**

| 유형 | 설명 |
| ------ | ------------------------------------------------------ |
| object | 모든 메서드와 이벤트가 있는 컨트랙트 인스턴스입니다. |

**예시**

```javascript
const myContract = new caver.contract([...], '0x{address in hex}', { gasPrice: '25000000000' })
```

## myContract.options <a href="#mycontract-options" id="mycontract-options"></a>

```javascript
myContract.options
```

컨트랙트 인스턴스에 대한 `options` 객체입니다. 트랜잭션을 전송할 때 `from`, `gas`, `gasPrice`, `feePayer` 및 `feeRatio`가 대체 값으로 사용됩니다.

**속성**

| 이름 | 유형 | 설명
| ------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address | String | 컨트랙트가 배포된 주소입니다.                                                                                                                                                                                                                                                        |
| jsonInterface | Array | 컨트랙트의 JSON 인터페이스입니다.                                                                                                                                                                                                                                                                |
| from | String | 컨트랙트 배포/실행 트랜잭션이 전송되는 기본 주소입니다. 트랜잭션을 생성할 때 `from` 주소가 정의되지 않은 경우, 이 `myContract.options.from`이 항상 트랜잭션을 생성하는 데 사용됩니다.                                                                 |
| gasPrice | String | 트랜잭션에 사용할 peb 단위의 가스 가격입니다.                                                                                                                                                                                                                                                      |
| gas | Number | 트랜잭션에 제공되는 최대 가스(가스 한도)입니다.                                                                                                                                                                                                                                            |
| data | String | 컨트랙트의 바이트 코드입니다. 컨트랙트가 배포될 때 사용됩니다.                                                                                                                                                                                                                               |
| feeDelegation | Boolean | (선택 사항) 수수료 위임 트랜잭션을 사용할지 여부입니다.                                                                                                                                                                                                                                              |
| feePayer | String | (선택 사항) 트랜잭션 수수료를 지불하는 수수료 납부자의 주소입니다. `feeDelegation`이 `true`이면 이 값은 트랜잭션의 `feePayer` 필드에 설정됩니다.                                                                                                                                   |
| feeRatio | String | (선택 사항) 수수료 납부자가 부담하게 될 트랜잭션 수수료의 비율입니다. `feeDelegation`이 `true`이고 `feeRatio`가 유효한 값으로 설정되어 있으면 부분 수수료 위임 트랜잭션이 사용됩니다. 유효한 범위는 1에서 99 사이이며, 0 또는 100 이상의 비율은 허용되지 않습니다. |

**참고** `feeDelegation`, `feePayer` 및 `feeRatio`는 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 부터 지원됩니다.

**예시**

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

## myContract.options.address <a href="#mycontract-options-address" id="mycontract-options-address"></a>

```javascript
myContract.options.address
```

이 컨트랙트 인스턴스 `myContract`에 사용되는 주소입니다. 이 컨트랙트에서 caver-js에 의해 생성된 모든 트랜잭션은 이 주소를 트랜잭션의 `to`로 포함합니다.

**속성**

| 이름 | 유형 | 설명
| ------- | ---------------- | ------------------------------------------------------------- |
| address | string \| `null` | 이 컨트랙트의 주소 또는 아직 설정되지 않은 경우 `null`입니다. |

**예시**

```javascript
>  myContract.options.address
'0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae'

// set a contract address
>  myContract.options.address = '0x1234FFDD...'
```

## myContract.options.jsonInterface <a href="#mycontract-options-jsoninterface" id="mycontract-options-jsoninterface"></a>

```javascript
myContract.options.jsonInterface
```

이 컨트랙트 `myContract`의 ABI에서 파생된 JSON 인터페이스 객체입니다.

**속성**

| 이름 | 유형 | 설명
| ------------- | ----- | ---------------------------------------------------------------------------------------------------------------------- |
| jsonInterface | Array | 이 컨트랙트의 JSON 인터페이스입니다. 이를 다시 설정하면 컨트랙트 인스턴스의 메서드와 이벤트가 다시 생성됩니다. |

**예시**

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

// set a new jsonInterface
> myContract.options.jsonInterface = [...]
```

## myContract.clone <a href="#mycontract-clone" id="mycontract-clone"></a>

```javascript
myContract.clone([contractAddress])
```

현재 컨트랙트 인스턴스를 복제합니다.

**매개변수**

| 이름 | 유형 | 설명
| --------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| contractAddress | String | (선택 사항) 새 컨트랙트의 주소입니다. 생략하면 원래 인스턴스의 주소로 설정됩니다(예: `myContract.options.address`). |

**리턴 값**

| 유형 | 설명 |
| ------ | --------------------------------- |
| object | 새로 복제된 컨트랙트 인스턴스입니다. |

**예시**

```javascript
> myContract.clone()
Contract {
  currentProvider: [Getter/Setter],
  ...
  _keyrings: KeyringContainer { ... }
}
```

## myContract.deploy <a href="#mycontract-deploy2" id="mycontract-deploy2"></a>

```javascript
myContract.deploy(options, byteCode [, param1 [, param2 [, ...]]])
```

컨트랙트를 Klaytn 네트워크에 배포합니다. 배포가 성공하면 새로운 컨트랙트 인스턴스로 프로미스가 해결됩니다. 기존 [myContract.deploy](#mycontract-deploy) 함수의 사용성과 달리, 이 함수는 트랜잭션을 Klaytn 네트워크에 직접 전송합니다. 반환된 객체로 `send()`를 호출할 필요가 없습니다.

**참고** `caver.wallet`에는 `options` 또는 `myContract.options`에 `from` 및 `feePayer`에 해당하는 Keyring 인스턴스가 포함되어 있어야 서명을 할 수 있습니다.

**참고** `myContract.deploy`는 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 부터 지원됩니다.

**매개변수**

| 이름 | 유형 | 설명
| ---------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| options | Object | 전송에 사용되는 옵션입니다. 자세한 내용은 [methods.methodName.send](#methods-methodname-send)의 표를 참조하세요. |
| byteCode | String | 컨트랙트의 바이트 코드입니다.                                                                                                       |
| parameters | Mixed | (선택 사항) 배포 시 생성자에게 전달되는 매개변수입니다.                                                          |

**리턴 값**

`Promise`는 `PromiEvent`를 반환합니다: 프로미스는 새 컨트랙트 인스턴스로 해결됩니다.

| 유형 | 설명 |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PromiEvent | 프로미 결합 이벤트 이미터입니다. 트랜잭션 영수증을 사용할 수 있을 때 해결됩니다. `myContract.deploy()`에서 `send()`가 호출되면, 프로미스는 새 컨트랙트 인스턴스로 해결됩니다. |

PromiEvent의 경우 다음 이벤트를 사용할 수 있습니다:

* `transactionHash`는 트랜잭션이 전송되고 트랜잭션 해시를 사용할 수 있게 된 직후에 실행됩니다. 유형은 `string`입니다.
* `receipt`: 트랜잭션 영수증을 사용할 수 있을 때 발생합니다. 자세한 내용은 [caver.rpc.klay.getTransactionReceipt](caver-rpc/klay.md#caver-rpc-klay-gettransactionreceipt) 를 참고하세요. 타입은 `object`입니다.
* `error`: 전송 중 에러가 발생하면 발생합니다. 가스 부족 에러의 경우 두 번째 파라미터는 영수증입니다. 타입은 `Error`입니다.

**예시**

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

## myContract.deploy <a href="#mycontract-deploy" id="mycontract-deploy"></a>

```javascript
myContract.deploy(options)
```

스마트 컨트랙트를 클레이튼에 배포할 때 사용한 객체를 반환합니다. `myContract.deploy({ data, arguments }).send(options)`를 호출하여 스마트 컨트랙트 배포 트랜잭션을 전송할 수 있습니다. 배포가 성공하면 새로운 컨트랙트 인스턴스로 프로미스가 해결됩니다.

**매개변수**

| 이름 | 유형 | 설명
| ------- | ------ | ------------------------------------------------------------------------------------ |
| options | Object | 배포에 사용되는 옵션 개체입니다. 아래 표에서 설명을 확인하세요. |

옵션 개체에는 다음을 포함할 수 있습니다:

| 이름 | 유형 | 설명
| --------- | ------ | -------------------------------------------------------------------------- |
| data | String | 컨트랙트의 바이트 코드입니다.                                             |
| arguments | Array | (선택 사항) 배포 시 생성자에게 전달되는 인수입니다. |

**리턴 값**

| 유형 | 설명 |
| ------ | ------------------------------------------------------------------------------------------------------------------------------ |
| object | 컨트랙트 배포를 위한 인자와 함수가 정의된 객체입니다. 아래 표에서 설명을 확인하세요. |

개체에는 다음이 포함됩니다:

| 이름 | 유형 | 설명
| --------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| arguments | Array | `옵션.인수`에 전달된 인수입니다.                                                                                                                       |
| [send](#methods-methodname-send) | Function | 컨트랙트를 Klaytn에 배포할 함수입니다. 이 함수의 결과인 프로미스는 새 컨트랙트 인스턴스로 해결됩니다.              |
| [sign](#methods-methodname-sign) | Function | 스마트 컨트랙트 배포 트랜잭션에 발신자로 서명할 함수입니다. 서명 함수는 서명된 트랜잭션을 반환합니다.                                     |
| [signAsFeePayer](#methods-methodname-signasfeepayer) | Function | 스마트 컨트랙트 배포 트랜잭션에 수수료 납부자로 서명할 함수입니다. 서명함수는 서명된 트랜잭션을 반환합니다.                        |
| [estimateGas](#methods-methodname-estimategas) | Function | 배포에 사용되는 가스를 추정하는 함수입니다. 이 함수를 실행해도 컨트랙트는 배포되지 않습니다.                                      |
| [encodeABI](#methods-methodname-encodeabi) | Function | 배포의 ABI(컨트랙트 데이터 + 생성자 매개변수)를 인코딩하는 함수입니다. 이 함수를 실행해도 컨트랙트는 배포되지 않습니다. |

**참고** `myContract.deploy({ data, arguments }).sign(옵션)` 및 `myContract.deploy({ data, arguments }).signAsFeePayer(options)`는 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1)부터 지원됩니다.

**예시**

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

## myContract.send <a href="#mycontract-send" id="mycontract-send"></a>

```javascript
myContract.send(options, methodName [, param1 [, param2 [, ...]]])
```

스마트 컨트랙트의 기능을 실행하기 위해 트랜잭션을 제출합니다. 이는 스마트 컨트랙트 상태를 변경할 수 있습니다.

이 함수에 사용되는 트랜잭션 유형은 `options` 또는 `myContract.options`에 정의된 값에 따라 달라집니다. `myContract.send`를 통해 수수료 위임 트랜잭션을 사용하려면 `feeDelegation`과 `feePayer`가 올바르게 설정되어 있어야 합니다.

* `feeDelegation`이 정의되지 않았거나 `false`로 정의되었습니다: [SmartContractExecution](./caver-transaction/basic.md#smartcontractexecution)
* `feeDelegation`이 `true`로 정의되었지만 `feePayer`가 정의되지 않은 경우: 오류를 발생시킵니다.
* `feeDelegation`이 `true`로 정의되어 있고 `feePayer`는 정의되어 있지만 `feeRatio`가 정의되어 있지 않습니다: [FeeDelegatedSmartContractExecution](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractexecution)
* `feeDelegation`은 `true`로 정의하고 `feePayer`와 `feeRatio`을 정의합니다: [FeeDelegatedSmartContractExecutionWithRatio](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio)

**참고** `caver.wallet`에는 `options` 또는 `myContract.options`에 `from` 및 `feePayer`에 해당하는 Keyring 인스턴스가 포함되어 있어야 서명을 할 수 있습니다.

**참고** `myContract.send`는 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 부터 지원됩니다.

**매개변수**

| 이름 | 유형 | 설명
| ---------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| options | Object | 전송에 사용되는 옵션입니다. 자세한 내용은 [methods.methodName.send](#methods-methodname-send)의 표를 참조하세요. |
| methodName | String | 실행할 컨트랙트 함수의 메서드 이름입니다.                                                                                 |
| parameters | Mixed | (선택 사항) 스마트 컨트랙트 함수에 전달되는 매개변수입니다.                                                            |

**리턴 값**

`Promise`는 `PromiEvent`를 반환합니다.

| 유형 | 설명 |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PromiEvent | 프로미 결합 이벤트 이미터입니다. 트랜잭션 영수증을 사용할 수 있을 때 해결됩니다. 프로미스는 새 컨트랙트 인스턴스로 해결됩니다. |

PromiEvent의 경우 다음 이벤트를 사용할 수 있습니다:

* `transactionHash`: 트랜잭션이 전송되고 트랜잭션 해시를 사용할 수 있게 된 직후에 실행됩니다. 타입은 `string`입니다.
* `receipt`: 트랜잭션 영수증을 사용할 수 있을 때 발생합니다. 자세한 내용은 [caver.rpc.klay.getTransactionReceipt](caver-rpc/klay.md#caver-rpc-klay-gettransactionreceipt) 를 참고하세요. 타입은 `object`입니다.
* `error`: 전송 중 에러가 발생하면 발생합니다. 가스 부족 에러의 경우 두 번째 파라미터는 영수증입니다. 타입은 `Error`입니다.

**예시**

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

## myContract.sign <a href="#mycontract-sign" id="mycontract-sign"></a>

```javascript
myContract.sign(options, methodName [, param1 [, param2 [, ...]]])
```

스마트 컨트랙트를 배포하거나 스마트 컨트랙트의 기능을 실행하기 위해 발신자로서 스마트 컨트랙트 트랜잭션에 서명합니다.

스마트 컨트랙트가 배포된 경우 메서드 이름에 'constructor'를 입력할 수 있는데, 예를 들어 `myContract.sign({ from, ... }, constructor, byteCode, ...)`와 같은 방식입니다.

이 함수에 사용되는 트랜잭션 유형은 `options` 또는 `myContract.options`에 정의된 값에 따라 달라집니다. `myContract.sign`을 통해 수수료 위임 트랜잭션을 사용하려면 `feeDelegation`을 `true`로 정의해야 합니다.

* `feeDelegation`이 정의되지 않았거나 `false`로 정의되었습니다: [SmartContractDeploy](./caver-transaction/basic.md#smartcontractdeploy) / [SmartContractExecution](./caver-transaction/basic.md#smartcontractexecution)
* `feeDelegation`은 `true`로 정의되어 있지만, `feeRatio`는 정의되어 있지 않습니다: [FeeDelegatedSmartContractDeploy](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractdeploy) / [FeeDelegatedSmartContractExecution](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractexecution)
* `feeDelegation`은 `true`로 정의되어 있고, `feeRatio`도 정의되어 있습니다: [FeeDelegatedSmartContractDeployWithRatio](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractdeploywithratio) / [FeeDelegatedSmartContractExecutionWithRatio](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio)

**참고** `caver.wallet`에는 `options` 또는 `myContract.options`의 `from`에 해당하는 Keyring 인스턴스가 포함되어 있어야 서명을 할 수 있습니다.

**참고** `myContract.sign`은 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 부터 지원됩니다.

**매개변수**

| 이름 | 유형 | 설명
| ---------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options | Object | 전송에 사용되는 옵션입니다. 자세한 내용은 [methods.methodName.send](#methods-methodname-send)의 표를 참조하세요.                                             |
| methodName | String | 실행할 컨트랙트 함수의 메서드 이름입니다. 스마트 컨트랙트 배포를 위한 트랜잭션에 서명하려면 메서드 이름 대신 'constructor' 문자열을 사용하세요.        |
| parameters | Mixed | (선택 사항) 스마트 컨트랙트 함수에 전달할 매개변수입니다. 스마트 컨트랙트 배포 트랜잭션에 서명하려면 byteCode와 생성자 매개변수를 전달합니다. |

**리턴 값**

[Transaction](./caver-transaction/caver-transaction.md) - 서명된 스마트 컨트랙트 트랜잭션을 반환하는 `Promise`를 반환합니다.

**예시**

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

## myContract.signAsFeePayer <a href="#mycontract-signasfeepayer" id="mycontract-signasfeepayer"></a>

```javascript
myContract.signAsFeePayer(options, methodName [, param1 [, param2 [, ...]]])
```

스마트 컨트랙트를 배포하거나 스마트 컨트랙트의 기능을 실행하기 위해 수수료 납부자로서 스마트 컨트랙트 트랜잭션에 서명합니다.

스마트 컨트랙트가 배포된 경우 메서드 이름에 'constructor'를 입력할 수 있는데, 예를 들어 `myContract.signAsFeePayer({ from, feeDelegation: true, feePayer, ... }, 'constructor', byteCode, ...)`와 같은 방식입니다.

이 함수에 사용되는 트랜잭션 유형은 `options` 또는 `myContract.options`에 정의된 값에 따라 달라집니다. `signAsFeePayer`는 트랜잭션 수수료 납부자로 서명하는 함수이므로 `feeDelegation` 필드를 `true`로 정의해야 합니다. 또한 수수료 납부자의 주소는 `feePayer` 필드에 정의되어야 합니다.

* `feeDelegation`이 정의되지 않았습니다: 에러를 발생시킵니다.
* `feeDelegation`은 정의되었지만 `feePayer`가 정의되지 않았습니다: 에러를 발생시킵니다.
* `feeDelegation` 이 `true` 로 정의되어 있고 `feePayer` 는 정의되어 있지만 `feeRatio` 가 정의되어 있지 않습니다: [FeeDelegatedSmartContractDeploy](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractdeploy) / [FeeDelegatedSmartContractExecution](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractexecution)
* `feeDelegation`은 `true`로 정의되고 `feePayer`와 `feeRatio`도 정의됩니다: [FeeDelegatedSmartContractDeployWithRatio](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractdeploywithratio) / [FeeDelegatedSmartContractExecutionWithRatio](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio)

**참고** `caver.wallet`에는 `options` 또는 `myContract.options`에 `feePayer`에 해당하는 Keyring 인스턴스가 포함되어 있어야 서명을 할 수 있습니다.

**참고** `myContract.signAsFeePayer`는 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 부터 지원됩니다.

**매개변수**

| 이름 | 유형 | 설명
| ---------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options | Object | 전송에 사용되는 옵션입니다. 자세한 내용은 [methods.methodName.send](#methods-methodname-send)의 표를 참조하세요.                                             |
| methodName | String | 실행할 컨트랙트 함수의 메서드 이름입니다. 스마트 컨트랙트 배포를 위한 트랜잭션에 서명하려면 메서드 이름 대신 'constructor' 문자열을 사용하세요.        |
| parameters | Mixed | (선택 사항) 스마트 컨트랙트 함수에 전달할 매개변수입니다. 스마트 컨트랙트 배포 트랜잭션에 서명하려면 byteCode와 생성자 매개변수를 전달합니다. |

**리턴 값**

[Transaction](./caver-transaction/caver-transaction.md) - 서명된 스마트 컨트랙트 트랜잭션을 반환하는 `Promise`를 반환합니다.

**예시**

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

## myContract.call <a href="#mycontract-call" id="mycontract-call"></a>

```javascript
myContract.call('methodName', [param1 [, param2 [, ...]]])
myContract.call(options, 'methodName', [param1 [, param2 [, ...]]])
```

상수 메서드를 호출하고 트랜잭션을 전송하지 않고 클레이튼 가상머신에서 해당 스마트 컨트랙트 메서드를 실행합니다. 호출해도 스마트 컨트랙트 상태는 변경되지 않는다는 점에 유의하세요.

**참고** `myContract.call`은 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 부터 지원됩니다.

**매개변수**

| 이름 | 유형 | 설명
| ---------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| options | Object | (선택 사항) 호출에 사용되는 옵션입니다. 자세한 내용은 [methods.methodName.call](#methods-methodname-call)의 표를 참조하세요. |
| methodName | String | 호출할 컨트랙트 함수의 메서드 이름입니다.                                                                                               |
| parameters | Mixed | (선택 사항) 스마트 컨트랙트 함수에 전달되는 매개변수입니다.                                                                       |

**리턴 값**

`Mixed`을 반환하는 `Promise` - 스마트 컨트랙트 메서드의 반환 값입니다. 단일 값을 반환하는 경우, 그 값을 그대로 반환합니다. 반환값이 여러 개인 경우 프로퍼티와 인덱스가 포함된 객체를 반환합니다.

**예시**

```javascript
> myContract.call('methodName').then(console.log)
Jasmine

> myContract.call({ from: '0x{address in hex}' }, 'methodName', 123).then(console.log)
Test Result
```

## myContract.decodeFunctionCall <a href="#mycontract-decodefunctioncall" id="mycontract-decodefunctioncall"></a>

```javascript
myContract.decodeFunctionCall(functionCall)
```

함수 호출을 디코딩하고 매개변수를 반환합니다.

**참고** `myContract.decodeFunctionCall`은 caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3) 부터 지원됩니다.

**매개변수**

| 이름 | 유형 | 설명
| ------------ | ------ | --------------------------------- |
| functionCall | String | 인코딩된 함수 호출 문자열입니다. |

**리턴 값**

| 유형 | 설명 |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| object | 일반 매개변수를 포함하는 개체입니다. 매개변수 순서대로 배열처럼 접근하도록 제공되므로 `result[0]`을 사용할 수 있습니다. |

**예시**

```javascript
// The myContract variable is instantiated with the below abi.
// [
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

## myContract.methods <a href="#mycontract-methods" id="mycontract-methods"></a>

```javascript
myContract.methods.methodName([param1 [, param2 [, ...]]])
myContract.methods['methodName']([param1 [, param2 [, ...]]])
```

해당 메서드에 대한 트랜잭션 객체를 생성한 다음 호출, 전송, 예상 또는 ABI 인코딩할 수 있습니다.

이 스마트 컨트랙트의 방법은 다음을 통해 사용할 수 있습니다:

* 메서드 이름: `myContract.methods.methodName(123)` 또는 `myContract.methods[methodName](123)`
* 메서드 프로토타입: `myContract.methods['methodName(uint256)'](123)`
* 메서드 서명: `myContract.methods['0x58cf5f10'](123)`

이렇게 하면 JavaScript 컨트랙트 객체와 이름은 같지만 매개변수가 다른 함수를 호출할 수 있습니다.

## cf) \*함수 서명(함수 선택기) <a href="#cf-function-signature-function-selector" id="cf-function-signature-function-selector"></a>

함수 호출에 대한 호출 데이터의 처음 4바이트는 호출할 함수를 지정합니다.\
함수의 서명에 대한 Keccak-256(SHA-3) 해시의 첫 번째(왼쪽, 빅 엔디안에서 고차) 4바이트입니다.

함수 서명은 두 가지 방법을 통해 지정할 수 있습니다.\
`1. caver.abi.encodefunctionSignature('funcName(paramType1,paramType2,...)')`\
`2. caver.utils.sha3('funcName(paramType1,paramType2,...)').substr(0, 10)`

예)

```javascript
caver.abi.encodefunctionSignature('methodName(uint256)')
> 0x58cf5f10

caver.utils.sha3('methodName(uint256)').substr(0, 10)
> 0x58cf5f10
```

**매개변수**

이 스마트 컨트랙트에 속하는 메서드의 매개변수로, JSON 인터페이스에 정의되어 있습니다.

**리턴 값**

`object`를 반환하는 `Promise` - 컨트랙트 실행을 위한 인자와 함수가 정의된 객체입니다:

| 이름 | 유형 | 설명
| --------------------------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| arguments | Array | 이 메서드에 전달된 인자입니다.                                                                                                                                             |
| [call](#methods-methodname-call) | Function | 트랜잭션을 보내지 않고 Klaytn 가상머신에서 스마트 컨트랙트의 상수 메서드를 호출하고 실행하는 함수입니다(스마트 컨트랙트 상태를 변경할 수 없음). |
| [send](#methods-methodname-send) | Function | 트랜잭션을 클레이튼에 전송하고 해당 메서드를 실행하는 함수 (스마트 컨트랙트 상태를 변경할 수 있음).                                                             |
| [sign](#methods-methodname-sign) | Function | 트랜잭션에 발신자로 서명할 함수입니다. 서명 함수는 서명된 트랜잭션을 반환합니다.                                                                         |
| [signAsFeePayer](#methods-methodname-signasfeepayer) | Function | 수수료 납부자로서 트랜잭션에 서명할 함수입니다. signAsFeePayer 함수는 서명된 트랜잭션을 반환합니다.                                                            |
| [estimateGas](#methods-methodname-estimategas) | Function | 해당 함수는 실행에 사용되는 가스를 추정합니다.                                                                                                                  |
| [encodeABI](#methods-methodname-encodeabi) | Function | 이 메서드의 ABI를 인코딩하는 함수입니다. 트랜잭션을 사용하여 전송하거나, 메서드를 호출하거나, 다른 스마트 컨트랙트 메서드에 인자로 전달할 수 있습니다.      |

**참고** `sign` 및 `signAsFeePayer`는 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 부터 지원됩니다.

**예시**

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

## methods.methodName.call <a href="#methods-methodname-call" id="methods-methodname-call"></a>

```javascript
myContract.methods.methodName([param1 [, param2 [, ...]]]).call(options [, callback])
myContract.methods['methodName']([param1 [, param2 [, ...]]]).call(options [, callback])
```

상수 메서드를 호출하고 트랜잭션을 전송하지 않고 클레이튼 가상머신에서 해당 스마트 컨트랙트 메서드를 실행합니다. 호출해도 스마트 컨트랙트 상태는 변경되지 않는다는 점에 유의하세요. 단축 함수로 제공되는 [myContract.call](#mycontract-call)을 사용하는 것을 권장합니다.

**매개변수**

| 이름 | 유형 | 설명 |
| -------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options | Object | (선택 사항) 호출에 사용되는 옵션입니다. 자세한 내용은 아래 표를 참조하세요.                                                                                        |
| callback | Function | (선택 사항) 이 콜백은 스마트 컨트랙트 메서드 실행 결과를 두 번째 인수로 사용하거나 오류 객체를 첫 번째 인수로 사용하여 실행됩니다. |

옵션 개체에는 다음을 포함할 수 있습니다:

| 이름 | 유형 | 설명
| -------- | ------ | -------------------------------------------------------------------------- |
| from | String | (선택 사항) 컨트랙트 메서드를 호출할 주소입니다. |
| gasPrice | String | (선택 사항) 이 호출에 사용할 peb 단위의 가스 가격입니다.                      |
| gas | Number | (선택 사항) 이 호출에 제공되는 최대 가스(가스 한도)입니다.             |

**리턴 값**

`Mixed`을 반환하는 `Promise` - 스마트 컨트랙트 메서드의 반환 값입니다. 단일 값을 반환하는 경우, 그 값을 그대로 반환합니다. 반환값이 여러 개인 경우 프로퍼티와 인덱스가 포함된 객체를 반환합니다.

**예시**

```javascript
// using the promise
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

## methods.methodName.send <a href="#methods-methodname-send" id="methods-methodname-send"></a>

```javascript
myContract.methods.methodName([param1 [, param2 [, ...]]]).send(options [, callback])
myContract.methods['methodName']([param1 [, param2 [, ...]]]).send(options [, callback])
```

스마트 컨트랙트를 배포하거나 스마트 컨트랙트의 기능을 실행하기 위해 트랜잭션을 전송합니다. 스마트 컨트랙트 상태가 변경될 수 있습니다. 바로가기 함수로 제공되는 [myContract.send](#mycontract-send)를 사용하는 것을 권장합니다.

스마트 컨트랙트를 배포할 때 메서드 이름에 'constructor'를 입력할 수 있는데, `myContract.methods.constructor` 또는 `myContract.methods['constructor']`와 같이 입력할 수 있지만, [myContract.deploy](#mycontract-deploy2) 함수를 사용하는 것을 권장합니다.

이 함수에 사용되는 트랜잭션 유형은 `options` 또는 `myContract.options`에 정의된 값에 따라 달라집니다. methods.methodName.send`를 통해 수수료 위임 트랜잭션을 사용하려면 `feeDelegation`과 `feePayer`가 올바르게 설정되어 있어야 합니다.

* `feeDelegation`이 정의되지 않았거나 `false`로 정의되었습니다: [SmartContractDeploy](./caver-transaction/basic.md#smartcontractdeploy) / [SmartContractExecution](./caver-transaction/basic.md#smartcontractexecution)
* `feeDelegation`이 `true`로 정의되었으나 `feePayer`가 정의되지 않은 경우 : 오류를 발생시킵니다.
* `feeDelegation`이 `true`로 정의되어 있고 `feePayer`는 정의되어 있지만 `feeRatio`가 정의되어 있지 않습니다: [FeeDelegatedSmartContractDeploy](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractdeploy) / [FeeDelegatedSmartContractExecution](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractexecution)
* `feeDelegation`은 `true`로 정의하고 `feePayer`와 `feeRatio`을 정의합니다: [FeeDelegatedSmartContractDeployWithRatio](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractdeploywithratio) / [FeeDelegatedSmartContractExecutionWithRatio](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio)

**참고** `caver.wallet`에는 `options` 또는 `myContract.options`에 `from` 및 `feePayer`에 해당하는 Keyring 인스턴스가 포함되어 있어야 서명을 할 수 있습니다.

**매개변수**

| 이름 | 유형 | 설명
| -------- | -------- | ----------------------------------------------------------------------------------------------------------------------- |
| options | Object | 전송에 사용되는 옵션입니다. 자세한 내용은 아래 표를 참조하세요.                                                      |
| callback | Function | (선택 사항) 이 콜백은 "transactionHash" 또는 오류 객체를 첫 번째 인수로 사용하여 먼저 실행됩니다. |

옵션 개체에는 다음을 포함할 수 있습니다:

| 이름 | 유형 | 설명
| ------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from | String | 트랜잭션을 보낼 주소입니다. 생략하면 `myContract.options.from`이 사용됩니다.                                                                                                                                                                                                                                                 |
| gas | Number | 이 트랜잭션에 제공되는 최대 가스(가스 한도)입니다.                                                                                                                                                                                                                                                                                                 |
| gasPrice | String | (선택 사항) 이 트랜잭션에 사용할 peb 단위의 가스 가격입니다.                                                                                                                                                                                                                                                                                               |
| value | number \| string \| BN \| Bignumber | (선택 사항) 이 트랜잭션에서 스마트 컨트랙트의 주소로 전송할 값(단위: pb)입니다.                                                                                                                                                                                                                                                    |
| feeDelegation | boolean | (선택 사항, 기본값 `false`) 수수료 위임 트랜잭션 사용 여부. 생략하면 `myContract.options.feeDelegation`이 사용됩니다.                                                                                                                                                                                                                        |
| feePayer | String | (선택 사항) 트랜잭션 수수료를 지불하는 수수료 납부자의 주소입니다. `feeDelegation`이 `true`인 경우, 이 값은 트랜잭션의 `feePayer` 필드로 설정됩니다. 생략하면 `myContract.options.feePayer`가 사용됩니다.                                                                                                                                   |
| feeRatio | String | (선택 사항) 수수료 납부자가 부담하게 될 트랜잭션 수수료의 비율입니다. `feeDelegation`이 `true`이고 `feeRatio`가 유효한 값으로 설정되어 있으면 부분 수수료 위임 트랜잭션이 사용됩니다. 유효한 범위는 1에서 99 사이이며, 0 또는 100 이상의 비율은 허용되지 않습니다. 생략하면 `myContract.options.feeRatio`가 사용됩니다. |

**참고** `feeDelegation`, `feePayer` 및 `feeRatio`는 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 부터 지원됩니다.

**리턴 값**

`Promise`는 `PromiEvent`를 반환합니다.

| 유형 | 설명 |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PromiEvent | 프로미 결합 이벤트 이미터입니다. 트랜잭션 영수증을 사용할 수 있을 때 해결됩니다. 프로미스는 새 컨트랙트 인스턴스로 해결됩니다. |

PromiEvent의 경우 다음 이벤트를 사용할 수 있습니다:

* `transactionHash`: 트랜잭션이 전송되고 트랜잭션 해시를 사용할 수 있게 된 직후에 실행됩니다. 타입은 `string`입니다.
* `receipt`: 트랜잭션 영수증을 사용할 수 있을 때 발생합니다. 자세한 내용은 [caver.rpc.klay.getTransactionReceipt](caver-rpc/klay.md#caver-rpc-klay-gettransactionreceipt) 를 참고하세요. 타입은 `object`입니다.
* `error`: 전송 중 에러가 발생하면 발생합니다. 가스 부족 에러의 경우 두 번째 파라미터는 영수증입니다. 타입은 `Error`입니다.

**예시**

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

## methods.methodName.sign <a href="#methods-methodname-sign" id="methods-methodname-sign"></a>

```javascript
myContract.methods.methodName([param1 [, param2 [, ...]]]).sign(options)
myContract.methods['methodName']([param1 [, param2 [, ...]]]).sign(options)
```

스마트 컨트랙트를 배포하거나 스마트 컨트랙트의 기능을 실행하기 위해 발신자로서 스마트 컨트랙트 트랜잭션에 서명합니다. 바로가기 함수로 제공되는 [myContract.sign](#mycontract-sign)을 사용하는 것을 권장합니다.

스마트 컨트랙트가 배포된 경우 메서드 이름에 'constructor'를 입력할 수 있습니다(예: `myContract.methods.constructor` 또는 `myContract.methods['constructor']`).

이 함수에 사용되는 트랜잭션 유형은 `options` 또는 `myContract.options`에 정의된 값에 따라 달라집니다. `methods.methodName.sign`을 통해 수수료 위임 트랜잭션을 사용하려면 `feeDelegation`을 `true`로 설정해야 합니다.

* `feeDelegation`이 정의되지 않았거나 `false`로 정의되었습니다: [SmartContractDeploy](./caver-transaction/basic.md#smartcontractdeploy) / [SmartContractExecution](./caver-transaction/basic.md#smartcontractexecution)
* `feeDelegation`은 `true`로 정의되어 있지만, `feeRatio`는 정의되어 있지 않습니다: [FeeDelegatedSmartContractDeploy](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractdeploy) / [FeeDelegatedSmartContractExecution](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractexecution)
* `feeDelegation`은 `true`로 정의되고, `feeRatio`와 `feeRatio`가 정의되어 있습니다: [FeeDelegatedSmartContractDeployWithRatio](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractdeploywithratio) / [FeeDelegatedSmartContractExecutionWithRatio](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio)

**참고** `caver.wallet`에는 `options` 또는 `myContract.options`의 `from`에 해당하는 Keyring 인스턴스가 포함되어 있어야 서명을 할 수 있습니다.

**참고** `methods.methodName.sign`은 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 부터 지원됩니다.

**매개변수**

| 이름 | 유형 | 설명
| ------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options | Object | 트랜잭션 생성에 사용되는 옵션입니다. 자세한 내용은 [methods.methodName.send](#methods-methodname-send)의 매개변수 표를 참조하세요. |

**리턴 값**

[Transaction](./caver-transaction/caver-transaction.md) - 서명된 스마트 컨트랙트 트랜잭션을 반환하는 `Promise`입니다.

**예시**

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

## methods.methodName.signAsFeePayer <a href="#methods-methodname-signasfeepayer" id="methods-methodname-signasfeepayer"></a>

```javascript
myContract.methods.methodName([param1 [, param2 [, ...]]]).signAsFeePayer(options)
myContract.methods['methodName']([param1 [, param2 [, ...]]]).signAsFeePayer(options)
```

스마트 컨트랙트를 배포하거나 스마트 컨트랙트의 기능을 실행하기 위해 수수료 납부자로서 스마트 컨트랙트 트랜잭션에 서명합니다. 바로가기 함수로 제공되는 [myContract.signAsFeePayer](#mycontract-signasfeepayer)를 사용하는 것을 권장합니다.

스마트 컨트랙트가 배포된 경우 메서드 이름에 'constructor'를 입력할 수 있습니다(예: `myContract.methods.constructor` 또는 `myContract.methods['constructor']`).

이 함수에 사용되는 트랜잭션 유형은 `options` 또는 `myContract.options`에 정의된 값에 따라 달라집니다. `signAsFeePayer`는 트랜잭션 수수료 납부자로 서명하는 함수이므로 `feeDelegation` 필드를 `true`로 정의해야 합니다. 또한 수수료 납부자의 주소는 `feePayer` 필드에 정의되어야 합니다.

* `feeDelegation`이 정의되지 않았습니다: 에러를 발생시킵니다.
* `feeDelegation`은 정의되었지만 `feePayer`가 정의되지 않았습니다: 에러를 발생시킵니다.
* `feeDelegation` 이 `true` 로 정의되어 있고 `feePayer` 는 정의되어 있지만 `feeRatio` 가 정의되어 있지 않습니다: [FeeDelegatedSmartContractDeploy](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractdeploy) / [FeeDelegatedSmartContractExecution](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractexecution)
* `feeDelegation`은 `true`로 정의하고 `feePayer`와 `feeRatio`을 정의합니다: [FeeDelegatedSmartContractDeployWithRatio](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractdeploywithratio) / [FeeDelegatedSmartContractExecutionWithRatio](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio)

**참고** `caver.wallet`에는 `options` 또는 `myContract.options`에 `feePayer`에 해당하는 Keyring 인스턴스가 포함되어 있어야 서명을 할 수 있습니다.

**참고** `methods.methodName.signAsFeePayer`는 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 부터 지원됩니다.

**매개변수**

| 이름 | 유형 | 설명
| ------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options | Object | 트랜잭션 생성에 사용되는 옵션입니다. 자세한 내용은 [methods.methodName.send](#methods-methodname-send)의 매개변수 표를 참조하세요. |

**리턴 값**

[Transaction](./caver-transaction/caver-transaction.md)을 반환하는 `Promise` - 서명된 스마트 컨트랙트 트랜잭션입니다.

**예시**

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

## methods.methodName.estimateGas <a href="#methods-methodname-estimategas" id="methods-methodname-estimategas"></a>

```javascript
myContract.methods.methodName([param1 [, param2 [, ...]]]).estimateGas(options [, callback])
```

클레이튼 가상머신에서 메서드 실행이 실행될 때 소모되는 가스를 추정합니다. 추정은 나중에 트랜잭션을 전송할 때 스마트 컨트랙트의 상태가 달라질 수 있으므로 실제 사용되는 가스와 다를 수 있습니다.

**매개변수**

| 이름 | 유형 | 설명
| -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| options | Object | (선택 사항) 호출에 사용되는 옵션입니다. 자세한 내용은 아래 표를 참조하세요.                                                                       |
| callback | Function | (선택 사항) 이 콜백은 가스 추정 결과를 두 번째 인수로 사용하거나 오류 개체를 첫 번째 인수로 사용하여 실행됩니다. |

옵션 개체에는 다음을 포함할 수 있습니다:

| 이름 | 유형 | 설명
| ----- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| from | String | (선택 사항) 컨트랙트 메서드를 호출할 주소입니다.                                                                                                  |
| gas | Number | (선택 사항) 이 호출에 제공되는 최대 가스(가스 한도)입니다. 특정 값을 설정하면 가스 부족 오류를 감지하는 데 도움이 됩니다. 모든 가스가 사용되면 동일한 숫자를 반환합니다. |
| value | number \| string \| BN \| Bignumber | (선택 사항) 이 컨트랙트 함수를 실행하기 위한 트랜잭션이 클레이튼으로 전송될 경우 스마트 컨트랙트의 주소로 전송될 peb 단위의 값입니다.         |

**리턴 값**

`Promise`는 `number`를 반환합니다.

| 유형 | 설명 |
| ------ | ------------------------------------------------ |
| number | 시뮬레이션된 통화/거래에 사용된 가스입니다. |

**예시**

```javascript
> myContract.methods.methodName(123).estimateGas({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
  .then(function(gasAmount) {
    ...
  })
  .catch(function(error) {
    ...
  })
```

## methods.methodName.encodeABI <a href="#methods-methodname-encodeabi" id="methods-methodname-encodeabi"></a>

```javascript
myContract.methods.methodName([param1 [, param2[, ...]]]).encodeABI()
```

이 메서드의 ABI를 인코딩합니다. 트랜잭션을 전송하거나 메서드를 호출하는 데 사용하거나 다른 스마트 컨트랙트 메서드에 인자로 전달할 수 있습니다.

**매개변수**

이 스마트 컨트랙트에 속한 메서드의 매개변수로, JSON 인터페이스에 정의되어 있습니다.

**리턴 값**

| 유형 | 설명 |
| ------ | ------------------------------------------------------------ |
| string | 트랜잭션 또는 호출을 통해 전송할 인코딩된 ABI 바이트 코드입니다. |

**예시**

```javascript
> myContract.methods.methodName(123).encodeABI()
'0x58cf5f1000000000000000000000000000000000000000000000000000000000000007B'
```

## myContract.once <a href="#mycontract-once" id="mycontract-once"></a>

```javascript
myContract.once(event [, options], callback)
```

이벤트를 구독하고 첫 번째 이벤트 또는 오류 발생 후 즉시 구독을 취소합니다. 단일 이벤트에 대해서만 실행됩니다.

**매개변수**

| 이름 | 유형 | 설명 |
| -------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| event    | String | 컨트랙트에 있는 이벤트의 이름 또는 모든 이벤트를 가져오려면 `allEvents`를 입력합니다.                                                                                                                                          |
| options  | Object | (선택 사항) 구독에 사용되는 옵션입니다. 자세한 내용은 아래 표를 참조하세요.                                                                                                                                |
| callback | Function | 이 콜백은 두 번째 인수로 첫 번째 이벤트 또는 첫 번째 인수로 오류에 대해 실행됩니다. 이벤트 구조에 대한 자세한 내용은 [myContract.getPastEvents](#getpastevents)를 참조하세요. |

옵션 객체에는 다음을 포함할 수 있습니다:

| 이름 | 유형 | 설명 |
| ------ | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| filter | Object | (선택 사항) 인덱싱된 매개변수를 기준으로 이벤트를 필터링할 수 있습니다(예: `{filter: {mynumber: [12,13]}}`는 "마이넘버"가 12 또는 13인 모든 이벤트를 의미합니다.                       |
| topics | Array | (선택 사항) 이렇게 하면 이벤트 필터의 토픽을 수동으로 설정할 수 있습니다. 필터 속성과 이벤트 서명이 주어지면 `topic[0]`이 자동으로 설정되지 않습니다. |

**리턴 값**

`Promise`는 `object`를 반환합니다 - 이벤트 객체를 반환합니다. 이벤트 객체에 대한 자세한 내용은 [myContract.getPastEvents](#getpastevents)를 참조하세요.

**예시**

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

## myContract.subscribe <a href="#mycontract-subscribe" id="mycontract-subscribe"></a>

```javascript
myContract.subscribe(event [, options], callback)
```

이벤트를 구독합니다. 이 함수는 [myContract.events.eventName](#mycontract-events)과 동일하게 작동합니다.

`subscribe` 함수가 반환한 구독 객체의 `unsubscribe` 함수를 호출하여 이벤트 구독을 취소할 수 있습니다.

**참고** `myContract.subscribe`는 caver-js [v1.9.1-rc.1](https://www.npmjs.com/package/caver-js/v/1.9.1-rc.1) 부터 지원됩니다.

**파라미터**

| 이름 | 유형 | 설명 |
| -------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| event    | String | 컨트랙트 내 이벤트 이름, 또는 모든 이벤트를 가져오려면 `allEvents`입니다.                                                                                                                                          |
| options  | Object | (선택 사항) 구독에 사용되는 옵션입니다. 자세한 내용은 아래 표를 참조하세요.                                                                                                                                |
| callback | Function | 이 콜백은 두 번째 인수로 첫 번째 이벤트 또는 첫 번째 인수로 오류에 대해 실행됩니다. 이벤트 구조에 대한 자세한 내용은 [myContract.getPastEvents](#getpastevents)를 참조하세요. |

옵션 객체에는 다음을 포함할 수 있습니다:

| 이름 | 유형 | 설명 |
| ------ | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| filter | Object | (선택 사항) 인덱싱된 매개변수를 기준으로 이벤트를 필터링할 수 있습니다(예: `{filter: {mynumber: [12,13]}}`는 "mynumber"가 12 또는 13인 모든 이벤트를 의미합니다.                       |
| topics | Array | (선택 사항) 이렇게 하면 이벤트 필터의 토픽을 수동으로 설정할 수 있습니다. 필터 속성과 이벤트 서명이 주어지면 `topic[0]`이 자동으로 설정되지 않습니다. |

**리턴 값**

`Promise`는 `object`를 반환합니다 - 이벤트 객체를 반환합니다. 이벤트 객체에 대한 자세한 내용은 [myContract.getPastEvents](#getpastevents)를 참조하세요.

**예시**

```javascript
> const subscription = myContract.subscribe('eventName', {
    filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
  }, function(error, event) { console.log(event) })
{
    returnValues: {
        myIndexedParam: 20,
        myOtherIndexedParam: '0x123456789...',
        myNonIndexParam: 'My string'
    },
    raw: {
        data: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
        topics: ['0xfd43a...', '0x7f9fa...']
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
> subscription.unsubscribe() // unsubscribe the event
```

## myContract.events <a href="#mycontract-events" id="mycontract-events"></a>

```javascript
myContract.events.eventName([options][, callback])
```

이벤트를 구독합니다.

**매개변수**

| 이름 | 유형 | 설명 |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| options  | Object | (선택 사항) 구독에 사용되는 옵션입니다. 자세한 내용은 아래 표를 참조하세요.                               |
| callback | Function | (선택 사항) 이 콜백은 각 이벤트에 대해 두 번째 인수로 실행되거나 첫 번째 인수로 오류가 발생할 때 실행됩니다. |

옵션 객체에는 다음이 포함될 수 있습니다:

| 이름 | 유형 | 설명 |
| --------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| filter    | Object | (선택 사항) 인덱싱된 매개변수(_예: `{filter: {mynumber: [12,13]}}`는 "mynumber"가 12 또는 13인 모든 이벤트를 의미합니다.                       |
| fromBlock | Number | (선택 사항) 이벤트를 가져올 블록 번호입니다.                                                                                                                 |
| topics    | Array | (선택 사항) 이벤트 필터의 토픽을 수동으로 설정할 수 있습니다. 필터 속성과 이벤트 서명이 주어지면 `topic[0]`이 자동으로 설정되지 않습니다. |

**리턴 값**

`EventEmitter`: 이벤트 이미터에는 다음과 같은 이벤트가 있습니다:

| 이름 | 유형 | 설명 |
| --------- | ------ | ----------------------------------------------------------------------------------------- |
| data      | Object | 이벤트 오브젝트를 인수로 하여 수신되는 각 이벤트에 대해 발동합니다.                        |
| connected | String | 구독이 성공적으로 연결된 후 한 번 발생합니다. 구독 ID를 반환합니다. |
| error | Object | 구독에 오류가 발생하면 발생합니다.                                           |

**참고** `connected`는 caver-js [v1.5.7](https://www.npmjs.com/package/caver-js/v/1.5.7)에서 사용할 수 있습니다.

반환되는 이벤트 `object`의 구조는 다음과 같습니다:

| 이름 | 유형 | 설명 |
| ---------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| event | string  | 이벤트 이름.                                                                                                                         |
| signature | string \| `null` |  이벤트 서명, 익명 이벤트인 경우 `null`입니다.                                                                                |
| address | String | 이 이벤트에서 발생한 주소입니다.                                                                                               |
| returnValues | Object | 이벤트에서 오는 반환값, _예: `{myVar: 1, myVar2: '0x234...'}`.                                                      |
| logIndex | Number | 블록에서 이벤트 인덱스 위치의 정수입니다.                                                                                       |
| transactionIndex | Number | 이벤트가 생성된 트랜잭션의 인덱스 위치의 정수입니다.                                                                |
| transactionHash  | 32-byte String | 이 이벤트가 생성된 트랜잭션의 해시입니다. 아직 보류 중이면 `null`입니다.                                                     |
| blockHash | 32-byte String | 이 이벤트가 생성된 블록의 해시입니다. 아직 보류 중인 경우 `null`.                                                           |
| blocknumber | Number | 이 로그가 생성된 블록 번호입니다. 아직 보류 중이면 `null`입니다.                                                                    |
| raw.data | String | 인덱싱되지 않은 로그 매개변수가 포함된 데이터입니다.                                                                                          |
| raw.topics | Array | 최대 4개의 32바이트 토픽이 포함된 배열이며, 토픽 1~3에는 이벤트의 인덱싱된 매개 변수가 포함됩니다.                                 |
| id | String | 로그 식별자입니다. "log_" 문자열에 `keccak256(blockHash + transactionHash + logIndex).substr(0, 8)`를 연결하여 만듭니다.

**예제**

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

## events.allEvents <a href="#events-allevents" id="events-allevents"></a>

```javascript
myContract.events.allEvents([options] [, callback])
```

[myContract.events](#mycontract-events)와 동일하지만 이 스마트 컨트랙트에서 모든 이벤트를 수신합니다. 선택적으로 필터 속성으로 해당 이벤트를 필터링할 수 있습니다.

## getPastEvents <a href="#getpastevents" id="getpastevents"></a>

```javascript
myContract.getPastEvents(event [, options] [, callback])
```

이 컨트랙트의 과거 이벤트를 가져옵니다.

**파라미터**

| 이름 | 유형 | 설명 |
| -------- | -------- | ----------------------------------------------------------------------------------------------------------------------------- |
| event    | String | 컨트랙트에 있는 이벤트의 이름 또는 모든 이벤트를 가져오려면 `"allEvents"`입니다.                                                    |
| options  | Object | (선택 사항) 구독에 사용되는 옵션입니다. 자세한 내용은 아래 표를 참조하세요.                                            |
| callback | Function | (선택 사항) 이 콜백은 이벤트 로그 배열을 두 번째 인수로 사용하거나 오류를 첫 번째 인수로 사용하여 실행됩니다. |

옵션 객체에는 다음이 포함될 수 있습니다:

| 이름 | 유형 | 설명 |
| --------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| filter    | Object | (선택 사항) 인덱싱된 매개변수를 기준으로 이벤트를 필터링할 수 있습니다(예: `{filter: {mynumber: [12,13]}}`는 "mynumber"가 12 또는 13인 모든 이벤트를 의미합니다.)                   |
| fromBlock | Number | (선택 사항) 이벤트를 가져올 블록 번호입니다.                                                                                                              |
| toBlock | Number | (선택 사항) 최대 이벤트를 가져올 블록 번호(기본값은 `"latest"`).                                                                                          |
| topics | Array | (선택 사항) 이벤트 필터의 토픽을 수동으로 설정할 수 있습니다. 필터 속성 및 이벤트 서명이 주어지면 `topic[0]`이 자동으로 설정되지 않습니다. |

**리턴 값**

`Promise`는 주어진 이벤트 이름 및 필터와 일치하는 과거 이벤트 개체가 포함된 배열인 `Array`를 반환합니다.

이벤트 객체에는 다음이 포함될 수 있습니다:

| 이름 | 유형 | 설명 |
| ---------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| event | String | 이벤트 이름.                                                                                                                                                                                               |
| signature | string \| `null` | 이벤트 서명, 익명 이벤트인 경우 `null`입니다.                                                                                                                                                       |
| address | String | 이 이벤트가 발생한 주소입니다.                                                                                                                                                                           |
| returnValues | Object | 이벤트에서 반환되는 반환값(예: {myVar: 1, myVar2: '0x234...'}).                                                                                                                                 |
| logIndex | Number | 블록 내 이벤트 인덱스 위치.                                                                                                                                                                        |
| transactionIndex | Number | 이벤트가 생성된 트랜잭션의 인덱스 위치.                                                                                                                                                    |
| transactionHash | String | 이 이벤트가 생성된 트랜잭션의 해시입니다.                                                                                                                                                        |
| blockHash | String | 이 이벤트가 생성된 블록의 해시입니다. 아직 보류 중이면 null입니다.                                                                                                                                |
| blockNumber | Number | 이 로그가 생성된 블록 번호. 아직 보류 중이면 null입니다.                                                                                                                                            |
| raw | Object | 개체는 `data`와 `topic`을 정의합니다. `raw.data`는 색인되지 않은 로그 매개변수를 포함합니다. `raw.topic`은 최대 4개의 32바이트 토픽이 포함된 배열이며, 토픽 1~3에는 이벤트의 인덱싱된 매개변수가 포함됩니다. |

**예제**

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
