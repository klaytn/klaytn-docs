# Deploy a Smart Contract

이제 Klaytn 스마트 컨트랙트를 개발하고 배포할 준비가 되었습니다!

## 프로젝트 디렉토리 생성

우선, 소스 코드가 위치할 디렉토리를 생성하세요.

```bash
$ mkdir klaytn-testboard
$ cd klaytn-testboard
```

## Truffle 초기화

컨트랙트 배포를 위해 Truffle을 초기화하세요.

```bash
$ truffle init
```

## 간단한 솔리디티 스마트 컨트랙트 작성

`klaytn-testboard/contracts` 디렉토리에 `KlaytnGreeter.sol`를 생성합니다.

```bash
$ cd contracts
$ touch KlaytnGreeter.sol
$ vi KlaytnGreeter.sol
```

KlaytnGreeter.sol에 다음 코드를 작성하세요.

```text
pragma solidity 0.5.6;
contract Mortal {
    /* 주소 타입의 소유자(owner) 변수 정의 */
    address payable owner;
    /* 이 함수는 초기화 시점에 실행되어 컨트랙트 소유자를 설정합니다 */
    constructor () public { owner = msg.sender; }
    /* 컨트랙트에서 자금을 회수하는 함수 */
    function kill() public payable { if (msg.sender == owner) selfdestruct(owner); }
}

contract KlaytnGreeter is Mortal {
    /* 문자열 타입의 변수 greeting 정의 */
    string greeting;
    /* 이 함수는 컨트랙트가 실행될 때 작동합니다 */
    constructor (string memory _greeting) public {
        greeting = _greeting;
    }
    /* 주(Main) 함수 */
    function greet() public view returns (string memory) {
        return greeting;
    }
}
```

## 마이그레이션(Migration) 스크립트 수정

```bash
$ cd ..
$ cd migrations
$ vi 1_initial_migration.js
```

`1_initial_migration.js`를 다음과 같이 수정합니다.

```javascript
const Migrations = artifacts.require("./Migrations.sol");
const KlaytnGreeter = artifacts.require("./KlaytnGreeter.sol");
module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(KlaytnGreeter, 'Hello, Klaytn');
};
```

## Truffle을 사용하여 스마트 컨트랙트 배포

truffle.js에 Klaytn의 네트워크 정보를 입력하세요.

**`WARNING`**: Currently Klaytn Baobab network's gasPrice is fixed to 25 Gpeb \(**It returns an error if you attempt to use any other number**\).

```bash
$ cd ..
$ vi truffle-config.js
```

아래와 같이 구성을 수정합니다.

```javascript
// truffle-config.js
module.exports = {
    networks: {
        klaytn: {
            host: '127.0.0.1',
            port: 8551,
            from: '0x75a59b94889a05c03c66c3c84e9d2f8308ca4abd', // 계정 주소를 입력하세요
            network_id: '1001', // Baobab 네트워크 id
            gas: 20000000, // 트랜잭션 가스 한도
            gasPrice: 25000000000, // Baobab의 gasPrice는 25 Gpeb입니다
        },
    },
    compilers: {
      solc: {
        version: "0.5.6"    // 컴파일러 버전을 0.5.6로 지정
      }
  }
};
```

다음 명령을 사용하여 계약을 배포하세요.

**NOTE**: Use `--network` to select which network to deploy and `--reset` to overwrite.

**NOTE**: Make sure that your Klaytn node is running.

컨트랙트 주소가 \`KlaytnGreeter: 뒤에 이어 표시됩니다.

```bash
$ truffle deploy --network klaytn --reset
Using network 'klaytn'.
Running migration: 1_initial_migration.js
  Deploying Migrations...
  ... 0x0f5108bd9e51fe6bf71dfc472577e3f55519e0b5d140a99bf65faf26830acfca
  Migrations: 0x97b1b3735c8f2326a262dbbe6c574a8ea1ba0b7d
  Deploying KlaytnGreeter...
  ... 0xcba53b6090cb4a118359b27293ba95116a8f35f66ae50fbd23ae1081ce9ffb9e
  KlaytnGreeter: [SAVE THIS ADDRESS!!] # this is your smart contract address
Saving successful migration to network...
  ... 0x14eb68727ca5a0ac767441c9b7ab077336f9311f71e9854d42c617aebceeec72
Saving artifacts...
```

**`WARNING`**: It returns an error when your account is locked.

```bash
Running migration: 1_initial_migration.js
  Replacing Migrations...
  ... undefined
Error encountered, bailing. Network state unknown. Review successful transactions manually.
Error: authentication needed: password or unlock
```

계정은 다음과 같이 잠금 해제합니다.

```javascript
> personal.unlockAccount('0x775a59b94889a05c03c66c3c84e9d2f8308ca4abd')
Unlock account 0x75a59b94889a05c03c66c3c84e9d2f8308ca4abd
Passphrase:
true
```

이제 나아갈 준비가 되었습니다. 다시 배포해보세요.

