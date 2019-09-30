# Check the Deployment

## caver-js를 사용해 배포된 바이트 코드 확인

배포된 스마트 컨트랙트의 바이트 코드를 확인하기 위해 `getCode`를 사용합니다.

먼저, 테스트 파일을 만들고 엽니다(open).

```bash
$ touch test-klaytn.js
$ open test-klaytn.js
```

다음 테스트 코드를 작성하세요. 방금 배포한 컨트랙트 주소를 입력해야 합니다.

```javascript
// test-klaytn.js
const Caver = require('caver-js');
const caver = new Caver('http://127.0.0.1:8551');
// 스마트 컨트랙트 주소 입력
const contractAddress = '0x65ca27ed42abeef230a37317a574058ff1372b34'
caver.klay.getCode(contractAddress).then(console.log);
```

코드를 실행하세요.

```bash
$ node test-klaytn.js
0x60806040526004361061004c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806341c0e1b514610051578063cfae321714610068575b600080fd5b34801561005d57600080fd5b506100666100f8565b005b34801561007457600080fd5b5061007d610189565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100bd5780820151818401526020810190506100a2565b50505050905090810190601f1680156100ea5780820380516001836020036101000a031916815260200191505b509250505060405180...
```

## 배포된 스마트 컨트랙트의 함수 호출

자바스크립트를 사용하여 컨트랙트의 `greet()`를 호출하세요.

**NOTE**: In order to call specific functions in smart contracts, you need an ABI \(Application Binary Interface\) file. Truffle이 계약을 배포하면, `./build/contracts/`에 `abi` 속성을 포함하는 .json 파일이 자동으로 생성됩니다.

위에서 작성한 테스트 코드에 다음 행을 추가하세요.

```javascript
// test-klaytn.js
const Caver = require('caver-js');
const caver = new Caver('http://127.0.0.1:8551');
// 스마트 컨트랙트 주소 입력
const contractAddress = '0x65ca27ed42abeef230a37317a574058ff1372b34'

caver.klay.getCode(contractAddress).then(console.log);
// 행 추가
const KlaytnGreeter = require('./build/contracts/KlaytnGreeter.json');
// 스마트 컨트랙트 주소 입력
const klaytnGreeter = new caver.klay.Contract(KlaytnGreeter.abi, contractAddress);
klaytnGreeter.methods.greet().call().then(console.log);
```

테스트 코드를 실행하세요.

```bash
$ node test-klaytn.js
0x60806040526004361061004c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806341c0e1b514610051578063cfae321714610068575b600080fd5b34801561005d57600080fd5b506100666100f8565b005b34801561007457600080fd5b5061007d610189565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100bd5780820151... # caver.klay.getCode의 결과입니다.
Hello, Klaytn # KlyatnGreeter.methods.greet()의 결과입니다.
```

**결과로 "Hello, Klaytn"을 얻으면 작업을 완료한 것입니다. 축하합니다!**

