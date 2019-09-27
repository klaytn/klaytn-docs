# Truffle

## Truffle과의 호환성

Klaytn에서는 솔리디티로 작성된 스마트 컨트랙트를 Truffle을 통해 컴파일하고 배포할 수 있습니다. 현재 Klaytn은 Truffle 최신 버전인 v5.0.26까지 지원합니다. Truffle에 대한 자세한 내용은 아래 웹 사이트를 참고해주세요.

* [Truffle 개요](https://truffleframework.com/docs/truffle/overview)
* [Truffle 레포지토리](https://github.com/trufflesuite/truffle)

다음과 같이 Truffle을 설치할 수 있습니다.

```text
$ sudo npm install -g truffle
```

로컬 EN을 실행 중인 경우 Truffle 프레임워크를 사용하여 직접 컨트랙트를 배포할 수 있습니다. 자세한 내용은 [링크](../getting-started/quick-start/deploy-a-smart-contract.md#deploying-a-smart-contract-using-truffle)를 참고해주세요.

원격 EN 노드로 배포하려면 [truffle-hdwallet-provider-klaytn](https://www.npmjs.com/package/truffle-hdwallet-provider-klaytn)을 사용해야 합니다.

## truffle-hdwallet-provider-klaytn 환경 설정

truffle-hdwallet-provider-klaytn은 truffle-hdwallet-provider에서 파생된 자바스크립트 HD 지갑 제공자입니다.

다음과 같이 설치하세요.

```text
$ npm install truffle-hdwallet-provider-klaytn
```

아래와 같이 `truffle-config.js`를 설정하세요.

### 니모닉 사용

```javascript
const HDWalletProvider = require("truffle-hdwallet-provider-klaytn");

const mnemonic = "mountains supernatural bird ...";

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // 모든 네트워크 ID에 대해서
    },
    testnet: {
      provider: () => new HDWalletProvider(mnemonic, "https://api.baobab.klaytn.net:8651"),
      network_id: '1001', // Klaytn baobab 테스트넷의 네트워크 ID
      gas: '8500000',
      gasPrice: null
    },
    mainnet: {
      provider: () => new HDWalletProvider(mnemonic, "https://api.cypress.klaytn.net:8651"),
      network_id: '8217', // Klaytn 메인넷의 네트워크 ID
      gas: '8500000',
      gasPrice: null
    }
  }
};
```

### 개인키 사용

```javascript
const HDWalletProvider = require("truffle-hdwallet-provider-klaytn");

const privateKey = "0x123 ...";

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // 모든 네트워크 ID에 대해
    },
    testnet: {
      provider: () => new HDWalletProvider(privateKey, "https://api.baobab.klaytn.net:8651"),
      network_id: '1001', // Klaytn baobab 테스트넷의 네트워크 ID
      gas: '8500000',
      gasPrice: null
    },
    mainnet: {
      provider: () => new HDWalletProvider(privateKey, "https://api.cypress.klaytn.net:8651"),
      network_id: '8217', //Klaytn 메인넷의 네트워크 ID
      gas: '8500000',
      gasPrice: null
    }
  }
};
```

**경고: 니모닉 및 개인키가 노출되지 않도록 주의하세요.**

Klaytn 테스트넷에 배포

```bash
$ truffle deploy --network testnet
```

Klaytn 메인넷에 배포

```bash
$ truffle deploy --network mainnet
```