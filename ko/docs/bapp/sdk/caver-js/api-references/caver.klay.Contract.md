---
description: >-
  스마트 컨트랙트와 상호작용하는 데 사용되는 caver-js 객체입니다.
---

# caver.klay.Contract <a id="caver-klay-contract"></a>

`caver.klay.Contract` 객체는 Klaytn 블록체인의 스마트 컨트랙트와 상호작용하는 것을 쉽게합니다.  새 컨트랙트 객체를 생성할 때, 각 스마트 컨트랙트의 JSON 인터페이스를 제출하면 caver는 RPC를 통해 모든 호출을 저레벨 ABI 호출로 자동 변환할 것입니다.

이를 통해 스마트 컨트랙트가 마치 자바스크립트 객체인 것처럼 스마트 컨트랙트와 상호작용할 수 있습니다.

## new contract <a id="new-contract"></a>

```javascript
new caver.klay.Contract(jsonInterface [, address] [, options])
```
JSON 인터페이스 오브젝트에 정의된 모든 메소드 및 이벤트로 새 컨트랙트 인스턴스를 생성합니다.

**매개변수**

| 명칭            | 형식  | 설명                                                                                        |
| ------------- | --- | ----------------------------------------------------------------------------------------- |
| jsonInterface | 객체  | 컨트랙트를 인스턴스화하기 위한 JSON 인터페이스                                                               |
| address       | 문자열 | (선택 사항) 호출할 스마트 컨트랙트의 주소. `myContract.options.address = '0x1234..'`를 사용하여 나중에 추가할 수 있습니다. |
| options       | 객체  | (선택 사항) 컨트랙트 옵션.  자세한 내용은 아래 표를 참조하세요.                                                    |

옵션 개체에는 다음이 포함됩니다:

| 명칭       | 형식     | 설명                                       |
| -------- | ------ | ---------------------------------------- |
| from     | 문자열    | (선택 사항) 트랜잭션이 만들어진 송신자 주소.               |
| gasPrice | 문자열    | (선택 사항) 트랜잭션에 사용할 peb 단위의 가스 가격.         |
| gas      | Number | (선택 사항) 트랜잭션에 규정된 최대 가스 (가스 제한).         |
| data     | 문자열    | (선택 사항) 컨트랙트의 바이트 코드. 컨트랙트가 배포될 때 사용됩니다. |


**리턴값**

| 형식 | 설명                         |
| -- | -------------------------- |
| 객체 | 모든 메소드와 이벤트가 있는 컨트랙트 인스턴스. |


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
컨트랙트 인스턴스에 대한 `options` 객체. `from`, `gas` 및 `gasPrice`는 트랜잭션을 보낼 때의 fallback 값으로 사용됩니다.

**속성**

| 명칭            | 형식     | 설명                                                                        |
| ------------- | ------ | ------------------------------------------------------------------------- |
| address       | 문자열    | 컨트랙트가 배포된 주소.  [options.address](#optionsaddress)를 참조하세요.                 |
| jsonInterface | 배열     | 컨트랙트의 JSON 인터페이스.  [options.jsonInterface](#optionsjsoninterface)를 참조하세요. |
| data          | 문자열    | 컨트랙트의 바이트 코드. 컨트랙트가 배포될 때 사용됩니다.                                          |
| from          | 문자열    | 트랜잭션이 만들어진 송신자 주소.                                                        |
| gasPrice      | 문자열    | 트랜잭션에 사용할 peb 단위의 가스 가격.                                                  |
| gas           | Number | 트랜잭션에 제공된 최대 가스 (가스 제한).                                                  |


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
이 컨트랙트 인스턴스 `myContract`에 사용된 주소.  이 컨트랙트에서 caver-js에 의해 생성된 모든 트랜잭션은 이 주소를 "to"로써 포함할 것입니다.  주소는 소문자로 저장됩니다.

**속성**

| 명칭      | 형식                   | 설명                                      |
| ------- | -------------------- | --------------------------------------- |
| address | String &#124; `null` | 이 컨트랙트의 주소이거나, 아직 설정되지 않은 경우 `null`입니다. |

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
이 컨트랙트 `myContract`의 ABI에서 파생된 JSON 인터페이스 객체.

**속성**

| 명칭            | 형식 | 설명                                                         |
| ------------- | -- | ---------------------------------------------------------- |
| jsonInterface | 배열 | 이 컨트랙트의 JSON 인터페이스. 이를 재설정하면 컨트랙트 인스턴스의 메소드 및 이벤트가 재생성됩니다. |


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

**리턴값**

| 형식 | 설명                |
| -- | ----------------- |
| 객체 | 새로 복제된 컨트랙트 인스턴스. |


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
컨트랙트를 Klaytn 블록체인에 배포합니다.  성공적으로 배포한 후, promise는 새로운 컨트랙트 인스턴스로 resolve될 것입니다.

**매개변수**

`options`: 배포에 사용되는 옵션 객체:

| 명칭        | 형식  | 설명                         |
| --------- | --- | -------------------------- |
| data      | 문자열 | 컨트랙트의 바이트 코드.              |
| arguments | 배열  | (선택 사항) 배포시 생성자에게 전달되는 인자. |

**리턴값**

`Object`: 트랜잭션 객체:

| 형식       | 설명                                                                                           |
| -------- | -------------------------------------------------------------------------------------------- |
| 배열       | arguments: 이전에 메소드에 전달되었던 인자. 이들은 변경될 수 있습니다.                                                |
| Function | [send](#methodsmymethodsend): 컨트랙트를 배포합니다. promise는 영수증(receipt) 대신 새 컨트랙트 인스턴스로 resolve됩니다. |
| Function | [estimateGas](#methodsmymethodestimategas): 배포에 사용되는 가스를 추정합니다.                              |
| Function | [encodeABI](#methodsmymethodencodeabi): 컨트랙트 데이터 + 생성자 매개변수인 배포 ABI를 암호화합니다.                 |

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
호출, 전송, 추정 또는 ABI 인코딩될 수 있는 해당 메소드에 대한 트랜잭션 객체를 생성합니다.

이 스마트 컨트랙트의 메소드는 다음을 통해 이용할 수 있습니다:

- 이름: `myContract.methods.myMethod(123)`
- 매개변수가 있는 이름: `myContract.methods['myMethod(uint256)'](123)`
- 서명*: `myContract.methods['0x58cf5f10'](123)`

이를 통해 자바스크립트 컨트랙트 객체로부터 이름은 같지만 매개변수가 다른 함수를 호출할 수 있습니다.


## cf) \*Function signature (Function selector)   <a id="cf-function-signature-function-selector"></a>
함수 호출에 대한 호출 데이터의 처음 4바이트는 호출할 함수를 지정합니다. 함수 서명의 Keccak-256 (SHA-3) 해시의 첫 번째 (왼쪽, 빅-인디언의 높은 순) 4바이트입니다.

함수 서명은 두 가지 방법으로 만들 수 있습니다. `1. caver.klay.abi.encodeFunctionSignature('funcName(paramType1,paramType2,...)')` `2. caver.utils.sha3('funcName(paramType1,paramType2,...)').substr(0, 10)`

예시)
```javascript
caver.klay.abi.encodeFunctionSignature('myMethod(uint256)')
> 0x58cf5f10

caver.utils.sha3('myMethod(uint256)').substr(0, 10)
> 0x58cf5f10
```

**매개변수**

모든 메소드의 매개변수는 JSON 인터페이스에 정의된 스마트 컨트랙트 메소드에 의존합니다.

**리턴값**

`Object`: 트랜잭션 객체:

| 형식       | 설명                                                                                                                        |
| -------- | ------------------------------------------------------------------------------------------------------------------------- |
| 배열       | arguments: 이전에 메소드에 전달되었던 인자. 이들은 변경될 수 있습니다.                                                                             |
| Function | [call](#methodsmymethodcall): "constant" 메소드를 호출하고 트랜잭션을 보내지 않고 Klaytn 가상머신에서 스마트 콘트랙트 메소드를 실행합니다(스마트 컨트랙트 상태를 변경할 수 없음). |
| Function | [send](#methodsmymethodsend): 스마트 컨트랙트로 트랜잭션을 전송하고 그 메소드를 실행합니다(스마트 컨트랙트 상태를 변경할 수 있음).                                   |
| Function | [estimateGas](#methodsmymethodestimategas): 블록체인에서 수행될 때 사용되는 가스를 추정합니다.                                                  |
| Function | [encodeABI](#methodsmymethodencodeabi): 이 메소드에 대한 ABI를 인코딩합니다. 트랜잭션을 사용하여 메소드를 호출하거나 인수로써 다른 스마트 컨트랙트 메소드에 전달될 수 있습니다.    |

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
트랜잭션을 보내지 않고서 "constant" 메소드를 호출하고 Klaytn 가상머신에서 스마트 컨트랙트 메소드를 실행합니다.  이러한 호출은 스마트 컨트랙트 상태를 변경할 수 없음에 유의하세요.

**매개변수**

| 명칭       | 형식       | 설명                                                                    |
| -------- | -------- | --------------------------------------------------------------------- |
| options  | 객체       | (선택 사항) 호출에 사용되는 옵션.  자세한 내용은 아래 표를 참조하세요.                            |
| callback | Function | (선택 사항) 이 콜백은 스마트 컨트랙트 메소드 실행 결과를 두 번째 인수로, 또는 오류 객체를 첫 번째 인수로 발생합니다. |

옵션 개체에는 다음이 포함됩니다:

| 명칭       | 형식     | 설명                                      |
| -------- | ------ | --------------------------------------- |
| from     | 문자열    | (선택 사항) 호출 "트랜잭션" 송신자 주소.               |
| gasPrice | 문자열    | (선택 사항) 이 호출 "트랜잭션"에 사용할 peb 단위의 가스 가격. |
| gas      | Number | (선택 사항) 호출 "트랜잭션"에 규정된 최대 가스 (가스 제한).   |

**리턴값**

`Promise`가 `Mixed`를 반환합니다: 스마트 컨트랙트 메소드의 리턴값(들). 하나를 반환하면, 그대로 반환됩니다.  여러 리턴값을 가지면, 속성과 인덱스로 구성된 객체로써 반환합니다.

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

```solidity
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

```solidity
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
스마트 컨트랙트에 트랜잭션을 보내고 그 메소드를 실행합니다.  이러한 호출은 스마트 컨트랙트 상태를 변경할 수 있음에 유의하세요.

**매개변수**

| 명칭       | 형식       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| options  | 객체       | 전송에 사용되는 옵션.  자세한 내용은 아래 표를 참조하세요.                                   |
| callback | Function | (선택 사항) 이 콜백은 먼저 "transactionHash"로, 아니면 첫 번째 인수로 오류 객체를 사용하여 발생합니다. |

옵션 개체에는 다음이 포함됩니다:

| 명칭       | 형식                                              | 설명                               |
| -------- | ----------------------------------------------- | -------------------------------- |
| from     | 문자열                                             | 트랜잭션을 보낼 송신자 주소.                 |
| gasPrice | 문자열                                             | (선택 사항) 트랜잭션에 사용할 peb 단위의 가스 가격. |
| gas      | Number                                          | (선택 사항) 트랜잭션에 규정된 최대 가스 (가스 제한). |
| value    | Number &#124; String &#124; BN &#124; BigNumber | (선택 사항) 트랜잭션에 의해 전송된 peb 단위의 값.  |

**리턴값**

`callback`은 32바이트 트랜잭션 해시를 반환합니다.

`PromiEvent`: 프로미스(promise)가 조합된 이벤트 이미터(event emitter).  트랜잭션 영수증을 사용할 수 있을 때, 또는 이 `send()`가 `someContract.deploy()`에서 호출될 경우, 프로미스는 새로운 컨트랙트 인스턴스와 함께 해결(resolve)됩니다.  추가로 다음과 같은 이벤트를 사용할 수 있습니다:

| 명칭              | 형식  | 설명                                                                                                                                                                                  |
| --------------- | --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| transactionHash | 문자열 | 트랜잭션이 전송된 직후 및 트랜잭션 해시를 사용할 수 있을 때 발생합니다.                                                                                                                                           |
| receipt         | 객체  | 트랜잭션 영수증을 사용할 수 있을 때 발생합니다.  컨트랙트의 영수증에는 `logs` 속성이 없지만, 대신 이벤트 이름을 키로, 이벤트를 속성으로 하는 `events` 속성이 있습니다. 반환된 이벤트 객체에 대한 세부 사항은 [getPastEvents return values](#getpastevents)을 참조하세요. |
| error           | 에러  | 전송 중 오류가 발생하면 발생됩니다. 가스 부족 에러(out-of-gas)가 발생한 경우 두 번째 인자는 트랜잭션 영수증입니다.                                                                                                             |


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
Klaytn 가상머신에서 실행될 때 메소드 실행에 걸리는 가스를 추정합니다.  나중에 트랜잭션을 전송할 때 스마트 컨트랙트의 상태가 달라질 수 있기 때문에, 추정은 실제 사용된 가스와 차이가 있을 수 있습니다.

**매개변수**

| 명칭       | 형식       | 설명                                                             |
| -------- | -------- | -------------------------------------------------------------- |
| options  | 객체       | (선택 사항) 호출에 사용되는 옵션.  자세한 내용은 아래 표를 참조하세요.                     |
| callback | Function | (선택 사항) 이 콜백은 가스 추정 결과를 두 번째 인수로, 또는 오류 객체를 첫 번째 인수로 하여 발생합니다. |

옵션 개체에는 다음이 포함됩니다:

| 명칭    | 형식                                              | 설명                                                                                                   |
| ----- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| from  | 문자열                                             | (선택 사항) 호출 "트랜잭션"이 만들어진 송신자 주소.                                                                      |
| gas   | Number                                          | (선택 사항) 호출 "트랜잭션"에 규정된 최대 가스 (가스 제한). 특정 값을 설정하면 가스 부족 오류를 감지하는 데 도움이 됩니다. 모든 가스가 사용되면 같은 숫자를 반환합니다. |
| value | Number &#124; String &#124; BN &#124; BigNumber | (선택 사항) 호출 "트랜잭션"에 의해 전송된 peb 단위의 값.                                                                 |

**리턴값**

`Promise`는 `Number`를 반환합니다 - 모의 호출/트랜잭션에 사용된 가스.

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
이 메소드에 대한 ABI를 인코딩합니다.  트랜잭션을 전송하는 데 사용되거나, 메소드를 호출하거나, 인수로써 다른 스마트 컨트랙트 메소드에 전달될 수 있습니다.


**매개변수**

없음

**리턴값**

| 형식  | 설명                                  |
| --- | ----------------------------------- |
| 문자열 | 트랜잭션 또는 호출을 통해 전송할 인코딩된 ABI 바이트 코드. |


**예시**

```javascript
> myContract.methods.myMethod(123).encodeABI();
'0x58cf5f1000000000000000000000000000000000000000000000000000000000000007B'
```


## once <a id="once"></a>

```javascript
myContract.once(event [, options], callback)
```
이벤트를 구독하고 첫 번째 이벤트 또는 오류 직후에 구독을 취소합니다.  단일 이벤트에 대해서만 발생합니다.

**매개변수**

| 명칭       | 형식       | 설명                                                                                                                          |
| -------- | -------- | --------------------------------------------------------------------------------------------------------------------------- |
| event    | 문자열      | 컨트랙트, 또는 모든 이벤트를 받기 위한 `"allEvents"`에서의 이벤트 이름.                                                                             |
| options  | 객체       | (선택 사항) 배포에 사용되는 옵션.  자세한 내용은 아래 표를 참조하세요.                                                                                  |
| callback | Function | 이 콜백은 첫 번째 이벤트를 두 번째 인수로, 또는 오류를 첫 번째 인수로 하여 발생됩니다. 이벤트 객체에 대한 세부 사항은 [getPastEvents return values](#getpastevents)를 참조하세요. |

옵션 개체에는 다음이 포함됩니다:

| 명칭     | 형식 | 설명                                                                                                         |
| ------ | -- | ---------------------------------------------------------------------------------------------------------- |
| 필터     | 객체 | (선택 사항) 인덱스 파라미터에 의해 이벤트를 필터링, *가령*, `{filter: {myNumber: [12,13]}}`는 "myNumber"가 12 또는 13안 모든 이벤트를 의미합니다. |
| topics | 배열 | (선택 사항) 이벤트 필터에 대한 주제를 수동으로 설정할 수 있습니다. 필터 특성 및 이벤트 서명이 제공되면, `topic[0]` 가 자동으로 설정되지 않습니다.                 |

**리턴값**

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

| 명칭       | 형식       | 설명                                                          |
| -------- | -------- | ----------------------------------------------------------- |
| options  | 객체       | (선택 사항) 배포에 사용되는 옵션.  자세한 내용은 아래 표를 참조하세요.                  |
| callback | Function | (선택 사항) 이 콜백은 각 이벤트를 두 번째 인수로, 또는 오류 객체를 첫 번째 인수로 하여 발생합니다. |

옵션 개체에는 다음이 포함됩니다:

| 명칭        | 형식     | 설명                                                                                                         |
| --------- | ------ | ---------------------------------------------------------------------------------------------------------- |
| 필터        | 객체     | (선택 사항) 인덱스 파라미터에 의해 이벤트를 필터링, *가령*, `{filter: {myNumber: [12,13]}}`는 "myNumber"가 12 또는 13안 모든 이벤트를 의미합니다. |
| fromBlock | Number | (선택 사항) 이벤트를 가져올 시작 블록 번호.                                                                                 |
| topics    | 배열     | (선택 사항) 이벤트 필터에 대한 주제를 수동으로 설정할 수 있습니다. 필터 특성 및 이벤트 서명이 제공되면, `topic[0]` 가 자동으로 설정되지 않습니다.                 |


**리턴값**

`EventEmitter`: 이벤트 이미터는 다음 이벤트를 가집니다:

| 명칭    | 형식 | 설명                           |
| ----- | -- | ---------------------------- |
| data  | 객체 | 이벤트 객체를 인수로 각 수신 이벤트를 발생합니다. |
| error | 객체 | 구독 오류가 발생하면 발생합니다.           |

반환된 이벤트 `Object`의 구조는 다음과 같습니다:

| 명칭               | 형식                   | 설명                                                                                                     |
| ---------------- | -------------------- | ------------------------------------------------------------------------------------------------------ |
| event            | 문자열                  | 이벤트 이름.                                                                                                |
| signature        | String &#124; `null` | 이벤트 서명, 익명의 이벤트인 경우 `null`.                                                                            |
| address          | 문자열                  | 이 이벤트가 발생한 주소.                                                                                         |
| returnValues     | 객체                   | 이벤트에서 오는 리턴값, *가령*, `{myVar: 1, myVar2: '0x234...'}`.                                                  |
| logIndex         | Number               | 블록에서 이벤트 인덱스 위치의 정수값.                                                                                  |
| transactionIndex | Number               | 이벤트가 생성된 트랜잭션의 인덱스 위치의 정수값.                                                                            |
| transactionHash  | 32-byte String       | 이 이벤트가 생성된 블록의 해시. 아직 보류 중인 경우 `null`.                                                                 |
| blockHash        | 32-byte String       | 이 이벤트가 생성된 블록의 해시. 아직 보류 중인 경우 `null`.                                                                 |
| blockNumber      | Number               | 이 로그가 생성된 블록 번호. 아직 보류 중인 경우 `null`.                                                                   |
| raw.data         | 문자열                  | 색인화되지 않은 로그 매개변수를 포함하는 데이터.                                                                            |
| raw.topics       | 배열                   | 최대 4개의 32바이트 주제를 가진 배열, 주제 1-3은 이벤트의 색인화된 매개변수가 포함됩니다.                                                 |
| id               | 문자열                  | 로그 식별자. `keccak256(blockHash + transactionHash + logIndex).substr(0, 8)`을 사용하여 "log_" 문자열을 연결하여 작성됩니다. |

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
[events](#events)와 동일하지만 이 스마트 컨트랙트에서 모든 이벤트를 수신합니다. 선택적으로 filter 속성은 해당 이벤트를 필터링할 수 있습니다.


## getPastEvents <a id="getpastevents"></a>

```javascript
myContract.getPastEvents(event [, options] [, callback])
```
이 컨트랙트의 이전 이벤트를 가져옵니다.

**매개변수**

| 명칭       | 형식       | 설명                                                                |
| -------- | -------- | ----------------------------------------------------------------- |
| event    | 문자열      | 컨트랙트, 또는 모든 이벤트를 받기 위한 `"allEvents"`에서의 이벤트 이름.                   |
| options  | 객체       | (선택 사항) 배포에 사용되는 옵션.  자세한 내용은 아래 표를 참조하세요.                        |
| callback | Function | (선택 사항) 이 콜백은 이벤트 로그들의 배열을 두 번째 인수로, 또는 오류 객체를 첫 번째 인수로 하여 발생합니다. |

옵션 개체에는 다음이 포함됩니다:

| 명칭        | 형식     | 설명                                                                                                         |
| --------- | ------ | ---------------------------------------------------------------------------------------------------------- |
| 필터        | 객체     | (선택 사항) 인덱스 파라미터에 의해 이벤트를 필터링, *가령*, `{filter: {myNumber: [12,13]}}`는 "myNumber"가 12 또는 13안 모든 이벤트를 의미합니다. |
| fromBlock | Number | (선택 사항) 이벤트를 가져올 시작 블록 번호.                                                                                 |
| toBlock   | Number | (선택 사항) 이벤트를 가져올 끝 블록 번호(기본값은 `"latest"`).                                                                 |
| topics    | 배열     | (선택 사항) 이벤트 필터에 대한 주제를 수동으로 설정할 수 있습니다. 필터 특성 및 이벤트 서명이 제공되면, `topic[0]` 가 자동으로 설정되지 않습니다.                 |

**리턴값**

`프로미스`는 `Array`를 반환합니다: 주어진 이벤트 이름 및 필터와 부합하는 이젠 이벤트 객체가 있는 배열.

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



