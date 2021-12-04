# Truffle <a id="truffle"></a>

## 트러플(Truffle)과의 호환성 <a id="compatibility-with-truffle"></a>

Klaytn에서는 솔리디티로 작성된 스마트 컨트랙트를 트러플을 통해 컴파일하고 배포할 수 있습니다. 현재 Klaytn은 트러플 최신 버전인 v5.0.26까지 지원합니다. 트러플에 대한 자세한 내용은 아래 웹 사이트를 참고해주세요.

- [트러플 개요](https://trufflesuite.com/docs/truffle/overview)
- [트러플 레포지토리](https://github.com/trufflesuite/truffle)

다음과 같이 트러플을 설치할 수 있습니다.

```text
$ sudo npm install -g truffle
```

로컬 EN을 실행 중인 경우 트러플 프레임워크를 사용하여 직접 컨트랙트를 배포할 수 있습니다. 자세한 내용은 [링크](../getting-started/quick-start/deploy-a-smart-contract.md#deploying-a-smart-contract-using-truffle)를 참고해주세요.

원격 EN 노드로 배포하려면 [truffle-hdwallet-provider-klaytn](https://www.npmjs.com/package/truffle-hdwallet-provider-klaytn)을 사용해야 합니다.

## truffle-hdwallet-provider-klaytn 환경설정 <a id="configuring-truffle-hdwallet-provider-klaytn"></a>

truffle-hdwallet-provider-klaytn은 truffle-hdwallet-provider에서 파생된 자바스크립트 HD 지갑 제공자입니다.

다음과 같이 설치하세요.

```text
$ nvm use 10
$ yarn install truffle-hdwallet-provider-klaytn@1.0.18
```

```text
$ nvm use 12 # for node v12 and higher
$ yarn install truffle-hdwallet-provider-klaytn@1.4.1
```

아래와 같이 `truffle-config.js`를 설정하세요.

### 니모닉(Mnemonic) 사용 <a id="using-a-mnemonic"></a>

```javascript
const HDWalletProvider = require("truffle-hdwallet-provider-klaytn");

const mnemonic = "mountains supernatural bird ...";

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8551,
      network_id: "*", // Match any network id
    },
    klaytn: {
      provider: () => {
        const mnemonic = JSON.parse(
          fs.readFileSync(path.resolve(__dirname) + "/mnemonics.js")
        );

        return new HDWalletProvider(
          mnemonic,
          "http://localhost:8551",
          0,
          mnemonic.length
        );
      },
      network_id: "1001", //Klaytn baobab testnet's network id
      gas: "8500000",
      gasPrice: null,
    },
    kasBaobab: {
      provider: () => {
        const option = {
          headers: [
            {
              name: "Authorization",
              value:
                "Basic " +
                Buffer.from(accessKeyId + ":" + secretAccessKey).toString(
                  "base64"
                ),
            },
            { name: "x-chain-id", value: "1001" },
          ],
          keepAlive: false,
        };
        return new HDWalletProvider(
          mnemonic,
          new Caver.providers.HttpProvider(
            "https://node-api.klaytnapi.com/v1/klaytn",
            option
          )
        );
      },
      network_id: "1001", //Klaytn baobab testnet's network id
      gas: "8500000",
      gasPrice: "25000000000",
    },
    kasCypress: {
      provider: () => {
        const option = {
          headers: [
            {
              name: "Authorization",
              value:
                "Basic " +
                Buffer.from(accessKeyId + ":" + secretAccessKey).toString(
                  "base64"
                ),
            },
            { name: "x-chain-id", value: "8217" },
          ],
          keepAlive: false,
        };
        return new HDWalletProvider(
          cypressMnemonic,
          new Caver.providers.HttpProvider(
            "https://node-api.klaytnapi.com/v1/klaytn",
            option
          )
        );
      },
      network_id: "8217", //Klaytn baobab testnet's network id
      gas: "8500000",
      gasPrice: "25000000000",
    },
    baobab: {
      provider: () => {
        return new HDWalletProvider(mnemonic, "http://your.baobab.en:8551");
      },
      network_id: "1001", //Klaytn baobab testnet's network id
      gas: "8500000",
      gasPrice: null,
    },
    cypress: {
      provider: () => {
        return new HDWalletProvider(mnemonic, "http://your.cypress.en:8551");
      },
      network_id: "8217", //Klaytn mainnet's network id
      gas: "8500000",
      gasPrice: null,
    },
  },
};
```

### 개인키(Private Key) 사용 <a id="using-a-private-key"></a>

```javascript
const HDWalletProvider = require("truffle-hdwallet-provider-klaytn");

const privateKey = "0x123 ...";

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8551,
      network_id: "*", // Match any network id
    },
    klaytn: {
      provider: () => {
        const pks = JSON.parse(
          fs.readFileSync(path.resolve(__dirname) + "/privateKeys.js")
        );

        return new HDWalletProvider(
          pks,
          "http://localhost:8551",
          0,
          pks.length
        );
      },
      network_id: "1001", //Klaytn baobab testnet's network id
      gas: "8500000",
      gasPrice: null,
    },
    kasBaobab: {
      provider: () => {
        const option = {
          headers: [
            {
              name: "Authorization",
              value:
                "Basic " +
                Buffer.from(accessKeyId + ":" + secretAccessKey).toString(
                  "base64"
                ),
            },
            { name: "x-chain-id", value: "1001" },
          ],
          keepAlive: false,
        };
        return new HDWalletProvider(
          privateKey,
          new Caver.providers.HttpProvider(
            "https://node-api.klaytnapi.com/v1/klaytn",
            option
          )
        );
      },
      network_id: "1001", //Klaytn baobab testnet's network id
      gas: "8500000",
      gasPrice: "25000000000",
    },
    kasCypress: {
      provider: () => {
        const option = {
          headers: [
            {
              name: "Authorization",
              value:
                "Basic " +
                Buffer.from(accessKeyId + ":" + secretAccessKey).toString(
                  "base64"
                ),
            },
            { name: "x-chain-id", value: "8217" },
          ],
          keepAlive: false,
        };
        return new HDWalletProvider(
          cypressPrivateKey,
          new Caver.providers.HttpProvider(
            "https://node-api.klaytnapi.com/v1/klaytn",
            option
          )
        );
      },
      network_id: "8217", //Klaytn baobab testnet's network id
      gas: "8500000",
      gasPrice: "25000000000",
    },
    baobab: {
      provider: () => {
        return new HDWalletProvider(privateKey, "http://your.baobab.en:8551");
      },
      network_id: "1001", //Klaytn baobab testnet's network id
      gas: "8500000",
      gasPrice: null,
    },
    cypress: {
      provider: () => {
        return new HDWalletProvider(privateKey, "http://your.cypress.en:8551");
      },
      network_id: "8217", //Klaytn mainnet's network id
      gas: "8500000",
      gasPrice: null,
    },
  },
};
```

**경고: 니모닉 및 개인키가 노출되지 않도록 주의하세요.**

Klaytn에 배포

```bash
$ truffle deploy --network baobab  # testnet
$ truffle deploy --network cypress # mainnet
```

Klaytn에 트랜잭션 생성하기 ([Truffle Docs quick start - Creating a project](https://www.trufflesuite.com/docs/truffle/quickstart#creating-a-project)의 예시 사용)

```bash
$ truffle console --network baobab
truffle(baobab)> Migrations.deployed().then(function(instance) {return instance.setCompleted(3)}) // making transaction
{
  tx: '0x734676311194c1ab8e004e2990e414b7b47a9d0a8506682707f5db03fa6dcee0',
  receipt: {
    blockHash: '0xdf9d77ef893a70b3a3f073525cdf5b2ee36620a3ac81815437788e4cf121678d',
    blockNumber: 65284860,
    contractAddress: null,
    from: '0x50c82047a414d2aad88ae67a5f02c311d2d86e69',
    gas: '0x500000',
    gasPrice: '0x5d21dba00',
    gasUsed: 27001,
    input: '0xfdacd5760000000000000000000000000000000000000000000000000000000000000003',
    logs: [],
    logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    nonce: '0x1047',
    senderTxHash: '0x734676311194c1ab8e004e2990e414b7b47a9d0a8506682707f5db03fa6dcee0',
    signatures: [ [Object] ],
    status: true,
    to: '0x69527b5f0078ae1757b631af155fa9be21ef6a85',
    transactionHash: '0x734676311194c1ab8e004e2990e414b7b47a9d0a8506682707f5db03fa6dcee0',
    transactionIndex: 0,
    type: 'TxTypeLegacyTransaction',
    typeInt: 0,
    value: '0x0',
    cumulativeGasUsed: undefined,
    rawLogs: []
  },
  logs: []
}

truffle(baobab)> Migrations.deployed().then(function(instance) {return instance.last_completed_migration.call()}) // read public variable
BN { negative: 0, words: [ 3, <1 empty item> ], length: 1, red: null }
```
