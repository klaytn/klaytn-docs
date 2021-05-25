# Truffle <a id="truffle"></a>

## Compatibility with Truffle <a id="compatibility-with-truffle"></a>

In Klaytn, a smart contract written in Solidity can be compiled and deployed via Truffle. At the moment, Klaytn supports up to Truffle v5.0.26, the latest version at the time of writing. Please find details about Truffle on the websites below.

* [Truffle overview](https://trufflesuite.com/docs/truffle/overview)
* [Truffle repository](https://github.com/trufflesuite/truffle)

You can install Truffle as the following:

```text
$ sudo npm install -g truffle
```

If you have a local EN running, you can deploy contracts directly with truffle framework. For more details, refer to this [link](../getting-started/quick-start/deploy-a-smart-contract.md#deploying-a-smart-contract-using-truffle).

If you want to deploy with a remote EN node, you should use [truffle-hdwallet-provider-klaytn](https://www.npmjs.com/package/truffle-hdwallet-provider-klaytn).

## Configuring truffle-hdwallet-provider-klaytn <a id="configuring-truffle-hdwallet-provider-klaytn"></a>

truffle-hdwallet-provider-klaytn is a JavaScript HD wallet provider forked from truffle-hdwallet-provider.

Install as the following

```text
$ npm install truffle-hdwallet-provider-klaytn
```

Set `truffle-config.js` as below.

### Using a mnemonic <a id="using-a-mnemonic"></a>

```javascript
const HDWalletProvider = require("truffle-hdwallet-provider-klaytn");

const mnemonic = "mountains supernatural bird ...";

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    testnet: {
      provider: () => new HDWalletProvider(mnemonic, "https://your.baobab.en.url.:8651"),
      network_id: '1001', //Klaytn baobab testnet's network id
      gas: '8500000',
      gasPrice: null
    },
    mainnet: {
      provider: () => new HDWalletProvider(mnemonic, "https://your.cypress.en.url:8651"),
      network_id: '8217', //Klaytn mainnet's network id
      gas: '8500000',
      gasPrice: null
    }
  }
};
```

### Using a private key <a id="using-a-private-key"></a>

```javascript
const HDWalletProvider = require("truffle-hdwallet-provider-klaytn");

const privateKey = "0x123 ...";

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    testnet: {
      provider: () => new HDWalletProvider(privateKey, "https://your.baobab.en.url:8651"),
      network_id: '1001', //Klaytn baobab testnet's network id
      gas: '8500000',
      gasPrice: null
    },
    mainnet: {
      provider: () => new HDWalletProvider(privateKey, "https://your.cypress.en.url:8651"),
      network_id: '8217', //Klaytn mainnet's network id
      gas: '8500000',
      gasPrice: null
    }
  }
};
```

**WARNING: Be very careful not to expose your mneomonic or private key.**

Deploying on Klaytn testnet

```bash
$ truffle deploy --network testnet
```

Deploying on Klaytn mainnet

```bash
$ truffle deploy --network mainnet
```


