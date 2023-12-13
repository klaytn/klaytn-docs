---
설명: 스마트 컨트랙트와 상호작용하는 데 사용되는 caver-js 객체입니다.

---

# caver.klay.Contract

`caver.klay.Contract` 컨트랙트 객체를 사용하면 클레이튼 블록체인의 스마트 컨트랙트와 쉽게 상호작용할 수 있습니다. 새로운 컨트랙트 객체를 생성할 때 해당 스마트 컨트랙트의 JSON 인터페이스를 제공하면 caver가 모든 호출을 RPC를 통해 낮은 수준의 ABI 호출로 자동 변환해줍니다.

이를 통해 스마트 컨트랙트를 마치 JavaScript 객체처럼 상호작용할 수 있습니다.

## 새 컨트랙트 <a id="new-contract"></a>

```javascript
new caver.klay.Contract(jsonInterface [, address] [, options])
```

JSON 인터페이스 객체에 정의된 모든 메서드와 이벤트가 포함된 새 컨트랙트 인스턴스를 생성합니다.

**매개변수**

| 이름 | 유형 | 설명 |
| :--- | :--- | :--- |
| jsonInterface | Object | 인스턴스화할 컨트랙트의 JSON 인터페이스 |
| address | String | \(선택 사항\) 호출할 스마트 컨트랙트의 주소입니다. 나중에 `myContract.options.address = '0x1234...'`를 사용하여 추가할 수 있습니다.
| options | Object | \(선택 사항\) 컨트랙트의 옵션입니다.  자세한 내용은 아래 표를 참조하세요. |

옵션 개체에는 다음이 포함됩니다:

| 이름 | 유형 | 설명 |
| :--- | :--- | :--- |
| from | String | \(선택 사항\) 트랜잭션이 이루어져야 하는 주소입니다. |
| gasPrice | String | \(선택 사항\) 트랜잭션에 사용할 peb 단위의 가스 가격입니다. |
| gas | Number | \(선택 사항\) 트랜잭션에 제공되는 최대 가스 \(가스 한도\). |
| data | String | \(선택 사항\) 컨트랙트의 바이트 코드입니다. 컨트랙트가 배포될 때 사용됩니다. |

**리턴 값**

| 유형 | 설명 |
| :--- | :--- |
| object | 모든 메서드와 이벤트가 있는 컨트랙트 인스턴스입니다. |

**예시**

```javascript
var myContract = new caver.klay.Contract([...], '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe', {
      from: '0x1234567890123456789012345678901234567891', // default from address
      gasPrice: '25000000000' // default gas price in peb, 25 Gpeb in this case
});

var myContract = new caver.klay.Contract([...], 'myContract', {
      from: '0x1234567890123456789012345678901234567891', // default from address
      gasPrice: '25000000000' // default gas price in peb, 25 Gpeb in this case
});
```

## options <a id="options"></a>

```javascript
myContract.options
```

컨트랙트 인스턴스에 대한 `options` 객체입니다. 트랜잭션을 전송할 때 `from`, `gas` 및 `gasPrice`가 대체 값으로 사용됩니다.

**속성**

| 이름 | 유형 | 설명 |
| :--- | :--- | :--- |
| address | String | 컨트랙트가 배포된 주소입니다.  [옵션 주소](#options-address)도 참조하세요. |
| jsonInterface | Array | 컨트랙트의 JSON 인터페이스입니다.  [options.jsonInterface](#options-jsoninterface)도 참조하세요. |
| data | String | 컨트랙트의 바이트 코드입니다. 컨트랙트가 배포될 때 사용됩니다. |
| from | String | 트랜잭션을 생성할 주소입니다. |
| gasPrice | String | 트랜잭션에 사용할 peb 단위의 가스 가격입니다. |
| gas | Number | 트랜잭션에 제공되는 최대 가스 \(가스 한도\). |

**예시**

```javascript
> myContract.options;
{
    address: '0x1234567890123456789012345678901234567891',
    jsonInterface: [...],
    from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe',
    gasPrice: '10000000000000',
    gas: 1000000
}

> myContract.options.from = '0x1234567890123456789012345678901234567891'; // default from address
> myContract.options.gasPrice = '25000000000000'; // default gas price in peb
> myContract.options.gas = 5000000; // provide as fallback always 5M gas
```

## options.address <a id="options-address"></a>

```javascript
myContract.options.address
```

이 컨트랙트 인스턴스 `myContract`에 사용된 주소입니다. 이 컨트랙트에서 caver-js에 의해 생성된 모든 트랜잭션은 이 주소를 "to"로 포함합니다. 주소는 소문자로 저장됩니다.

**속성**

| 이름 | 유형 | 설명 |
| :--- | :--- | :--- |
| address | string \| `null` | 이 컨트랙트의 주소 또는 아직 설정되지 않은 경우 `null`입니다. |

**예시**

```javascript
>  myContract.options.address;
'0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae'

// set a new address
>  myContract.options.address = '0x1234FFDD...';
```

## options.jsonInterface <a id="options-jsoninterface"></a>

```javascript
myContract.options.jsonInterface
```

이 컨트랙트 `myContract`의 ABI에서 파생된 JSON 인터페이스 객체입니다.

**속성**

| 이름 | 유형 | 설명 |
| :--- | :--- | :--- |
| jsonInterface | Array | 이 컨트랙트의 JSON 인터페이스입니다. 이를 재설정하면 컨트랙트 인스턴스의 메서드와 이벤트가 다시 생성됩니다. |

**예시**

```javascript
> myContract.options.jsonInterface;
[{
      "type":"function",
      "name":"foo",
      "inputs": [{"name":"a","type":"uint256"}],
      "outputs": [{"name":"b","type":"address"}]
 },{
      "type":"event",
      "name":"Event"
      "inputs": [{"name":"a","type":"uint256","indexed":true},{"name":"b","type":"bytes32","indexed":false}],
 }]

// set a new interface
> myContract.options.jsonInterface = [...];
```

## clone <a id="clone"></a>

```javascript
myContract.clone()
```

현재 컨트랙트 인스턴스를 복제합니다.

**매개변수**

없음

**리턴 값**

| 유형 | 설명 |
| :--- | :--- |
| object | 새로 복제된 컨트랙트 인스턴스입니다. |

**예시**

```javascript
> var contract1 = new caver.klay.Contract(abi, address, {gasPrice: '12345678', from: fromAddress});
> var contract2 = contract1.clone();
> contract2.options.address = address2;
> (contract1.options.address !== contract2.options.address);
true
```

## deploy <a id="deploy"></a>

```javascript
myContract.deploy(options)
```

컨트랙트를 클레이튼 블록체인에 배포합니다. 배포가 성공하면 새로운 컨트랙트 인스턴스로 프로미스가 해결됩니다.

**매개변수**

`options`: 배포에 사용되는 옵션 객체입니다:

| 이름 | 유형 | 설명 |
| :--- | :--- | :--- |
| data | String | 컨트랙트의 바이트 코드입니다. |
| arguments | Array | \(선택 사항\) 배포 시 생성자에게 전달되는 인수입니다. |

**리턴 값**

`Object`: 트랜잭션 객체입니다:

| 유형 | 설명 |
| :--- | :--- |
| Array | 인자: 이전에 메서드에 전달된 인자입니다. 변경할 수 있습니다. |
| function | [send](#methods-mymethod-send): 컨트랙트를 배포합니다. 프로미스는 영수증 대신 새 컨트랙트 인스턴스로 해결됩니다. |
| function | [estimateGas](#methods-mymethod-estimategas): 배포에 사용되는 가스를 추정합니다. |
| function | [encodeABI](#methods-mymethod-encodeabi): 배포의 ABI(컨트랙트 데이터 + 생성자 매개변수)를 인코딩합니다. |

**예시**

```javascript
> myContract.deploy({
      data: '0x12345...',
      arguments: [123, 'My String']
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
  });

// When the data is already set as an option to the contract itself
> myContract.options.data = '0x12345...';

> myContract.deploy({
        arguments: [123, 'My String']
  })
  .send({
      from: '0x1234567890123456789012345678901234567891',
      gas: 1500000,
      value: 0,
  })
  .then(function(newContractInstance) {
      console.log(newContractInstance.options.address) // instance with the new contract address
  });

// Simply encoding
> myContract.deploy({
      data: '0x12345...',
      arguments: [123, 'My String']
  })
  .encodeABI();
'0x12345...0000012345678765432'

// Gas estimation
> myContract.deploy({
      data: '0x12345...',
      arguments: [123, 'My String']
  })
  .estimateGas(function(err, gas) {
      console.log(gas);
  });
```

## methods <a id="methods"></a>

```javascript
myContract.methods.myMethod([param1 [, param2 [, ...]]])
```

해당 메서드에 대한 트랜잭션 객체를 생성한 다음 호출, 전송, 예상 또는 ABI 인코딩할 수 있습니다.

이 스마트 컨트랙트의 방법은 다음을 통해 사용할 수 있습니다:

* 이름: `myContract.methods.myMethod(123)`
* 매개변수가 포함된 이름: `myContract.methods['myMethod(uint256)'](123)`
* 서명\*: `myContract.methods['0x58cf5f10'](123)`

이렇게 하면 JavaScript 컨트랙트 객체와 이름은 같지만 매개변수가 다른 함수를 호출할 수 있습니다.

## cf\) \*함수 서명 \(함수 선택기\) <a id="cf-function-signature-function-selector"></a>

함수 호출에 대한 호출 데이터의 처음 4바이트는 호출할 함수를 지정합니다.  
함수의 시그니처에 대한 Keccak-256 \(SHA-3\) 해시의 첫 번째 \(왼쪽, 빅 엔디안에서 고차\) 4바이트입니다.

함수 서명은 두 가지 방법으로 만들 수 있습니다.  
1. `caver.klay.abi.encodeFunctionSignature('funcName(paramType1,paramType2,...)')`
2. `caver.utils.sha3('funcName(paramType1,paramType2,...)').substr(0, 10)`

ex\)

```javascript
caver.klay.abi.encodeFunctionSignature('myMethod(uint256)')
> 0x58cf5f10

caver.utils.sha3('myMethod(uint256)').substr(0, 10)
> 0x58cf5f10
```

**매개변수**

모든 메서드의 매개변수는 JSON 인터페이스에 정의된 스마트 컨트랙트 메서드에 따라 달라집니다.

**리턴 값**

`Object`: 트랜잭션 객체입니다:

| 유형 | 설명 |
| :--- | :--- |
| Array | 인자: 이전에 메서드에 전달된 인자입니다. 변경할 수 있습니다. |
| function | [call](#methods-mymethod-call): 트랜잭션을 보내지 않고 \(스마트 컨트랙트 상태를 변경할 수 없음\) "상수" 메서드를 호출하고 Klaytn 가상머신에서 스마트 컨트랙트 메서드를 실행합니다. |
| function | [send](#methods-mymethod-send): 스마트 컨트랙트에 트랜잭션을 전송하고 해당 메서드 \(스마트 컨트랙트 상태를 변경할 수 있음\)를 실행합니다. |
| function | [estimateGas](#methods-mymethod-estimategas): 메서드가 블록체인에서 실행될 때 사용되는 가스를 추정합니다. |
| function | [encodeABI](#methods-mymethod-encodeabi): 이 메서드의 ABI를 인코딩합니다. 트랜잭션을 사용하여 메서드를 호출하거나 다른 스마트 컨트랙트 메서드에 인자로 전달하여 전송할 수 있습니다. |

**예시**

```javascript
// calling a method
> myContract.methods.myMethod(123).call({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'}, function(error, result) {
      ...
  });

// or sending and using a promise
> myContract.methods.myMethod(123).send({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
  .then(function(receipt) {
    // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
  });

// or sending and using the events
> myContract.methods.myMethod(123).send({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
  .on('transactionHash', function(hash) {
      ...
  })
  .on('receipt', function(receipt) {
      ...
  })
  .on('error', console.error);
```

## methods.myMethod.call <a id="methods-mymethod-call"></a>

```javascript
myContract.methods.myMethod([param1 [, param2 [, ...]]]).call(options [, callback])
```

"상수" 메서드를 호출하고 트랜잭션을 전송하지 않고 Klaytn 가상 머신에서 스마트 컨트랙트 메서드를 실행합니다. 호출해도 스마트 컨트랙트 상태는 변경되지 않는다는 점에 유의하세요.

**매개변수**

| 이름 | 유형 | 설명 |
| :--- | :--- | :--- |
| options | Object | \(선택 사항\) 호출에 사용되는 옵션입니다.  자세한 내용은 아래 표를 참조하세요. |
| callback | Function | \(선택 사항\) 이 콜백은 스마트 컨트랙트 메서드 실행 결과를 두 번째 인수로, 또는 오류 객체를 첫 번째 인수로 사용하여 실행됩니다. |

옵션 개체에는 다음을 포함할 수 있습니다:

| 이름 | 유형 | 설명 |
| :--- | :--- | :--- |
| from | String | \(선택 사항\) "트랜잭션"을 호출할 주소입니다. |
| gasPrice | String | \(선택 사항\) 이 "트랜잭션" 호출에 사용할 peb 단위의 가스 가격입니다. |
| gas | Number | \(선택 사항\) 이 "트랜잭션" 호출에 제공되는 최대 가스 \(가스 한도\). |

**리턴 값**

`Promise`는 `Mixed`을 반환합니다: 스마트 컨트랙트 메서드의 반환 값\(들\). 하나의 값을 반환하는 경우, 그 값 그대로 반환됩니다. 반환값이 여러 개인 경우 프로퍼티와 인덱스가 있는 객체로 반환됩니다.

**예시**

```javascript
// using the callback
> myContract.methods.myMethod(123).call({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'}, function(error, result) {
      ...
  });

// using the promise
> myContract.methods.myMethod(123).call({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
  .then(function(result) {
      ...
  });
```

```text
// Solidity: MULTI-ARGUMENT RETURN
contract MyContract {
    function myFunction() returns(uint256 myNumber, string myString) {
        return (23456, "Hello!%");
    }
}
```

```javascript
> var MyContract = new caver.klay.Contract(abi, address);
> MyContract.methods.myFunction().call().then(console.log);
Result {
      myNumber: '23456',
      myString: 'Hello!%',
      0: '23456', // these are here as fallbacks if the name is not known or given
      1: 'Hello!%'
}
```

```text
// Solidity: SINGLE-ARGUMENT RETURN
contract MyContract {
    function myFunction() returns(string myString) {
        return "Hello!%";
    }
}
```

```javascript
> var MyContract = new caver.klay.Contract(abi, address);
> MyContract.methods.myFunction().call().then(console.log);
"Hello!%"
```

## methods.myMethod.send <a id="methods-mymethod-send"></a>

```javascript
myContract.methods.myMethod([param1 [, param2 [, ...]]]).send(options [, callback])
```

스마트 컨트랙트에 트랜잭션을 전송하고 해당 메서드를 실행합니다. 스마트 컨트랙트 상태가 변경될 수 있다는 점에 유의하세요.

**매개변수**

| 이름 | 유형 | 설명 |
| :--- | :--- | :--- |
| options | Object | 전송에 사용되는 옵션입니다.  자세한 내용은 아래 표를 참조하세요. |
| callback | Function | \(선택 사항\) 이 콜백은 "transactionHash" 또는 오류 객체를 첫 번째 인수로 사용하여 먼저 실행됩니다. |

옵션 개체에는 다음을 포함할 수 있습니다:

| 이름 | 유형 | 설명 |
| :--- | :--- | :--- |
| from | String | 트랜잭션을 전송할 주소입니다. |
| gasPrice | String | \(선택 사항\) 이 트랜잭션에 사용할 peb 단위의 가스 가격입니다. |
| gas | Number | 이 트랜잭션에 제공되는 최대 가스 \(가스 한도\). |
| value | number \| string \| BN \| Bignumber | \(선택 사항\) 트랜잭션에 대해 전송된 값(단위: peb)입니다. |

**리턴 값**

`callback`은 32바이트 트랜잭션 해시를 반환합니다.

`PromiEvent`: 프로미스 결합 이벤트 이미터. 트랜잭션 영수증을 사용할 수 있을 때 해결되거나, 이 `send()`가 `someContract.deploy()`에서 호출되면, 프로미스는 새 컨트랙트 인스턴스로 해결됩니다. 또한 다음과 같은 이벤트를 사용할 수 있습니다:

| 이름 | 유형 | 설명 |
| :--- | :--- | :--- |
| transactionHash | String | 트랜잭션이 전송되고 트랜잭션 해시를 사용할 수 있는 직후에 실행됩니다. |
| receipt | Object | 트랜잭션 영수증을 사용할 수 있을 때 발생합니다.  컨트랙트에서 받은 영수증에는 `logs` 프로퍼티가 없고 대신 이벤트 이름이 키로, 이벤트가 프로퍼티로 포함된 `events` 프로퍼티가 있습니다. 반환된 이벤트 객체에 대한 자세한 내용은 [getPastEvents 반환값](#getpastevents)을 참조하세요. |
| error | Error | 전송 중 오류가 발생하면 발생합니다. 가스 부족 오류의 경우 두 번째 매개 변수는 영수증입니다. |

**예시**

```javascript
// using the callback
> myContract.methods.myMethod(123).send({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'}, function(error, transactionHash) {
    ...
  });

// using the promise
> myContract.methods.myMethod(123).send({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
  .then(function(receipt) {
    // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
  });


// using the event emitter
> myContract.methods.myMethod(123).send({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
  .on('transactionHash', function(hash) {
    ...
  })
  .on('receipt', function(receipt) {
    console.log(receipt);
  })
  .on('error', console.error); // If there is an out-of-gas error, the second parameter is the receipt.

// receipt example
{
   "transactionHash": "0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b",
   "transactionIndex": 0,
   "blockHash": "0xef95f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b46",
   "blockNumber": 3,
   "contractAddress": "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe",
   "gasUsed": 30234,
   "events": {
     "MyEvent": {
       returnValues: {
         myIndexedParam: 20,
         myOtherIndexedParam: '0x123456789...',
         myNonIndexParam: 'My String'
       },
       raw: {
         data: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
         topics: ['0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7', '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385']
       },
       event: 'MyEvent',
       signature: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
       logIndex: 0,
       transactionIndex: 0,
       transactionHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
       blockHash: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
       blockNumber: 1234,
       address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
    },
    "MyOtherEvent": {
      ...
    },
    "MyMultipleEvent":[{...}, {...}] // If there are a multiple of the same events, they will be in an array.
  }
}
```

## methods.myMethod.estimateGas <a id="methods-mymethod-estimategas"></a>

```javascript
myContract.methods.myMethod([param1 [, param2 [, ...]]]).estimateGas(options [, callback])
```

클레이튼 가상머신에서 메서드 실행이 실행될 때 소모되는 가스를 추정합니다. 추정은 나중에 트랜잭션을 전송할 때 스마트 컨트랙트의 상태가 달라질 수 있으므로 실제 사용되는 가스와 다를 수 있습니다.

**매개변수**

| 이름 | 유형 | 설명 |
| :--- | :--- | :--- |
| options | Object | \(선택 사항\) 호출에 사용되는 옵션입니다.  자세한 내용은 아래 표를 참조하세요. |
| callback | Function | \(선택 사항\) 이 콜백은 가스 추정 결과를 두 번째 인수로 사용하거나 오류 개체를 첫 번째 인수로 사용하여 실행됩니다. |

옵션 개체에는 다음을 포함할 수 있습니다:

| 이름 | 유형 | 설명 |
| :--- | :--- | :--- |
| from | String | \(선택 사항\) "트랜잭션"을 호출해야 하는 주소입니다. |
| gas | Number | \(선택 사항\) 이 호출 "트랜잭션"에 제공되는 최대 가스 \(가스 한도\). 특정 값을 설정하면 가스 부족 오류를 감지하는 데 도움이 됩니다. 모든 가스가 사용되면 동일한 숫자를 반환합니다. |
| value | number \| string \| BN \| Bignumber | \(선택 사항\) "트랜잭션" 호출을 위해 전송된 값(peb). |

**리턴 값**

`Promise`는 시뮬레이션된 호출/트랜잭션에 사용된 가스인 `Number`를 반환합니다.

**예시**

```javascript
// using the callback
> myContract.methods.myMethod(123).estimateGas({gas: 5000000}, function(error, gasAmount) {
    if(gasAmount == 5000000)
      console.log('Method ran out of gas');
  });

// using the promise
> myContract.methods.myMethod(123).estimateGas({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
  .then(function(gasAmount) {
    ...
  })
  .catch(function(error) {
    ...
  });
```

## methods.myMethod.encodeABI <a id="methods-mymethod-encodeabi"></a>

```javascript
myContract.methods.myMethod([param1 [, param2[, ...]]]).encodeABI()
```

이 메서드의 ABI를 인코딩합니다. 트랜잭션을 전송하거나 메서드를 호출하거나 다른 스마트 컨트랙트 메서드에 인자로 전달하는 데 사용할 수 있습니다.

**매개변수**

없음

**리턴 값**

| 유형 | 설명 |
| :--- | :--- |
| string | 트랜잭션 또는 호출을 통해 전송할 인코딩된 ABI 바이트 코드입니다. |

**예시**

```javascript
> myContract.methods.myMethod(123).encodeABI();
'0x58cf5f1000000000000000000000000000000000000000000000000000000000000007B'
```

## once <a id="once"></a>

```javascript
myContract.once(event [, options], callback)
```

이벤트를 구독하고 첫 번째 이벤트 또는 오류 발생 후 즉시 구독을 취소합니다. 단일 이벤트에 대해서만 실행됩니다.

**매개변수**

| 이름 | 유형 | 설명 |
| :--- | :--- | :--- |
| event | String | 컨트랙트에 있는 이벤트의 이름 또는 모든 이벤트를 가져오려면 `"allEvents"`입니다. |
| options | Object | \(옵션\) 배포에 사용되는 옵션입니다.  자세한 내용은 아래 표를 참조하세요. |
| callback | Function | 이 콜백은 첫 번째 이벤트를 두 번째 인수로 사용하거나 오류를 첫 번째 인수로 사용할 때 실행됩니다. 이벤트 구조에 대한 자세한 내용은 [getPastEvents 반환값](#getpastevents)을 참조하세요. |

옵션 개체에는 다음을 포함할 수 있습니다:

| 이름 | 유형 | 설명 |
| :--- | :--- | :--- |
| filter | Object | \(선택 사항\) 인덱싱된 매개변수를 기준으로 이벤트를 필터링할 수 있습니다: (예: `{filter: {myNumber: [12,13]}}`는 "myNumber"가 12 또는 13인 모든 이벤트를 의미합니다.) |
| topics | Array | \(선택 사항\) 이렇게 하면 이벤트 필터의 토픽을 수동으로 설정할 수 있습니다. 필터 속성과 이벤트 서명이 주어지면 `topic[0]`은 자동으로 설정되지 않습니다. |

**리턴 값**

`undefined`

**예시**

```javascript
> myContract.once('MyEvent', {
    filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
  }, function(error, event) { console.log(event); });

// event output example
{
    returnValues: {
        myIndexedParam: 20,
        myOtherIndexedParam: '0x123456789...',
        myNonIndexParam: 'My String'
    },
    raw: {
        data: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
        topics: ['0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7', '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385']
    },
    event: 'MyEvent',
    signature: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    logIndex: 0,
    transactionIndex: 0,
    transactionHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
    blockHash: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    blockNumber: 1234,
    address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
}
```

## events <a id="events"></a>

```javascript
myContract.events.MyEvent([options][, callback])
```

이벤트를 구독합니다.

**매개변수**

| 이름 | 유형 | 설명 |
| :--- | :--- | :--- |
| options | Object | \(선택 사항\) 배포에 사용되는 옵션입니다.  자세한 내용은 아래 표를 참조하세요. |
| callback | Function | \(선택 사항\) 이 콜백은 각 이벤트에 대해 두 번째 인수로 실행되거나 첫 번째 인수로 오류가 발생할 때 실행됩니다. |

옵션 개체에는 다음을 포함할 수 있습니다:

| 이름 | 유형 | 설명 |
| :--- | :--- | :--- |
| filter | Object | \(선택 사항\) 인덱싱된 매개변수를 기준으로 이벤트를 필터링할 수 있습니다: (예: `{filter: {myNumber: [12,13]}}`는 "myNumber"가 12 또는 13인 모든 이벤트를 의미합니다.) |
| fromBlock | Number | \(선택 사항\) 이벤트를 가져올 블록 번호입니다. |
| topics | Array | \(선택 사항\) 이벤트 필터의 토픽을 수동으로 설정할 수 있습니다. 필터 속성과 이벤트 서명이 주어지면 `topic[0]`은 자동으로 설정되지 않습니다. |

**리턴 값**

`EventEmitter`: 이벤트 이미터에는 다음과 같은 이벤트가 있습니다:

| 이름 | 유형 | 설명 |
| :--- | :--- | :--- |
| data | Object | 이벤트 객체를 인수로 사용하여 들어오는 각 이벤트에서 실행됩니다. |
| error | Object | 구독에 오류가 발생하면 발생합니다. |

반환된 이벤트 `Object`의 구조는 다음과 같습니다:

| 이름 | 유형 | 설명 |
| :--- | :--- | :--- |
| event | String | 이벤트 이름입니다. |
| signature | string \| `null` | 이벤트 서명, 익명 이벤트인 경우 `null`입니다. |
| address | String | 이 이벤트에서 발생한 주소입니다. |
| returnValues | Object | 이벤트에서 오는 반환값, _예: `{myVar: 1, myVar2: '0x234...'}`. |
| logIndex | Number | 블록에서 이벤트 인덱스 위치의 정수입니다. |
| transactionIndex  | Number | 이벤트가 생성된 트랜잭션의 인덱스 위치의 정수입니다. |
| transactionHash | 32-byte String | 이 이벤트가 생성된 블록의 해시입니다. 아직 보류 중이면 `null`입니다. |
| blockHash | 32-byte String | 이 이벤트가 생성된 블록의 해시입니다. 아직 보류 중인 경우 `null`. |
| blockNumber | Number | 이 로그가 생성된 블록 번호입니다. 아직 보류 중이면 `null`입니다. |
| raw.data | String | 인덱싱되지 않은 로그 매개변수가 포함된 데이터입니다. |
| raw.topics | Array | 최대 4개의 32바이트 주제가 있는 배열로, 주제 1~3에는 이벤트의 인덱싱된 매개 변수가 포함되어 있습니다. |
| id | String | 로그 식별자입니다. "log_" 문자열에 `keccak256(blockHash + transactionHash + logIndex).substr(0, 8)`를 연결하여 만듭니다.

**예시**

```javascript
> myContract.events.MyEvent({
    filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
    fromBlock: 0
  }, function(error, event) { console.log(event); })
  .on('data', function(event){
      console.log(event); // same results as the optional callback above
  })
  .on('error', console.error);

// event output example
{
    returnValues: {
        myIndexedParam: 20,
        myOtherIndexedParam: '0x123456789...',
        myNonIndexParam: 'My String'
    },
    raw: {
        data: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
        topics: ['0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7', '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385']
    },
    event: 'MyEvent',
    signature: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    logIndex: 0,
    transactionIndex: 0,
    transactionHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
    blockHash: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    blockNumber: 1234,
    address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe',
    id: 'log_41d221bc',
}
```

## events.allEvents <a id="events-allevents"></a>

```javascript
myContract.events.allEvents([options] [, callback])
```

[events](#events)와 동일하지만 이 스마트 컨트랙트에서 모든 이벤트를 수신합니다. 선택적으로 필터 속성으로 해당 이벤트를 필터링할 수 있습니다.

## getPastEvents <a id="getpastevents"></a>

```javascript
myContract.getPastEvents(event [, options] [, callback])
```

이 컨트랙트의 과거 이벤트를 가져옵니다.

**매개변수**

| 이름 | 유형 | 설명 |
| :--- | :--- | :--- |
| event | String | 컨트랙트에 있는 이벤트의 이름 또는 모든 이벤트를 가져오려면 `"allEvents"`입니다. |
| options | Object | \(옵션\) 배포에 사용되는 옵션입니다.  자세한 내용은 아래 표를 참조하세요. |
| callback | Function | \(선택 사항\) 이 콜백은 이벤트 로그 배열을 두 번째 인수로 사용하거나 오류를 첫 번째 인수로 사용하여 실행됩니다. |

options 개체는 다음을 포함할 수 있습니다:

| 이름 | 유형 | 설명 |
| :--- | :--- | :--- |
| filter | Object | \(선택 사항\) 인덱싱된 매개변수를 기준으로 이벤트를 필터링할 수 있습니다: (예: `{filter: {myNumber: [12,13]}}`는 "myNumber"가 12 또는 13인 모든 이벤트를 의미합니다.) |
| fromBlock | Number | \(선택 사항\) 이벤트를 가져올 블록 번호입니다. |
| toBlock | Number | \(선택 사항\) 최대 \(기본값은 `"latest"`)까지 이벤트를 가져올 블록 번호입니다. |
| topics | Array | \(선택 사항\) 이벤트 필터의 토픽을 수동으로 설정할 수 있습니다. 필터 속성과 이벤트 서명이 주어지면 `topic[0]`은 자동으로 설정되지 않습니다. |

**리턴 값**

`Promise`는 `Array`를 반환합니다: 주어진 이벤트 이름 및 필터와 일치하는 과거 이벤트 객체가 포함된 배열입니다.

**예시**

```javascript
> myContract.getPastEvents('MyEvent', {
      filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
      fromBlock: 0,
      toBlock: 'latest'
  }, function(error, events) { console.log(events); })
  .then(function(events) {
      console.log(events) // same results as the optional callback above
  });

[{
    returnValues: {
        myIndexedParam: 20,
        myOtherIndexedParam: '0x123456789...',
        myNonIndexParam: 'My String'
    },
    raw: {
        data: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
        topics: ['0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7', '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385']
    },
    event: 'MyEvent',
    signature: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    logIndex: 0,
    transactionIndex: 0,
    transactionHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
    blockHash: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    blockNumber: 1234,
    address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
},{
      ...
}]
```

