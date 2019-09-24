# Migrating Ethereum App to Klaytn

## Table of Contents

* [1. Introduction](#1-introduction)
* [2. Klaytn has Ethereum compatibility](#2-klaytn-has-ethereum-compatibility)
* [3. Migrate node connection from Ethereum to Klaytn](#3-migrate-node-connection-from-ethereum-to-klaytn)
* [4. Interact with Klaytn node: `BlockNumber` component](#4.-interact-with-klaytn-node:-`blocknumber`-component)
* [5. Interact with the contract: `Count` component](#5.-interact-with-the-contract:-`count`-component)
  * [5-1. Deploy Count contract on Klaytn](#5-1.-deploy-count-contract-on-klaytn)
  * [5-2. Create a contract instance](#5-2.-create-a-contract-instance)
  * [5-3. Interact with contract](#5-3.-interact-with-contract)

## 1. Introduction

This tutorial is intended to give a guide to migrate an Ethereum App to Klaytn. No previous Klaytn experience is needed. A simple blockchain app will be used as a sample to show how to migrate an Ethereum App to Klaytn.  

We will focus only on the code modifications required to migrate an Ethereum App to Klaytn. If you need details on creating a Klaytn BApp, Please refer to [CountBApp Tutorial](https://docs.klaytn.com/bapp/tutorials/count-bapp).

> **Full diff code** of migration(Ethereum -> Klaytn) can be found on GitHub at  
[https://github.com/underbleu/countbapp](https://github.com/underbleu/countbapp)

#### Intended Audience

* We assume that you have basic knowledge on [React](https://reactjs.org/). Sample code is made with React.
* Basic knowledge and experience in Blockchain app is required, but no previous Klaytn experience is needed.

#### Testing Environment
CountBApp is tested in the following environment.

* MacOS Mojave 10.14.5
* Node 10.16.0 \(LTS\)
* npm 6.9.0
* Python 2.7.10

## 2. Klaytn has Ethereum compatibility

Klaytn runs similar to Ethereum except for the consensus algorithm. It even keeps compatibility with Ethereum Byzantium in RPC/API interfaces and executes smart contracts written in Solidity. Since Klaytn keeps compatibility with Ethereum, Javascript API for creating BApps are similar too. So it's easy to migrate Ethereum App to Klaytn enabling developers soft-landing on a new blockchain platform.

## 3. Migrate node connection from Ethereum to Klaytn

To migrate a BApp, you first need to change the library that makes node connection. Then you could connect to specific node by changing 'rpcURL' value. 

- In Ethereum BApp example
  - `web3` libary makes a connection, communicating with Ethereum node
  - `Ropsten testnet` 'rpcURL' is used for testing
- In Klaytn BApp example
  - `caver-js` libary makes a connection, communicating with Klaytn node
  - `Baobab testnet` 'rpcURL' is used for testing

`src/klaytn/caver.js`

```javascript
// import Web3 from 'web3'
import Caver from 'caver-js'

// const ROPSTEN_TESTNET_RPC_URL = 'https://ropsten.infura.io/'
const BAOBAB_TESTNET_RPC_URL = 'https://api.baobab.klaytn.net:8651/'

// const rpcURL = ROPSTEN_TESTNET_RPC_URL
const rpcURL = BAOBAB_TESTNET_RPC_URL

// const web3 = new Web3(rpcURL)
const caver = new Caver(rpcURL)

// export default web3
export default caver
```


## 4. Interact with Klaytn node: `BlockNumber` component
![blocknumber component](./count-bapp/images/blocknumber-component.gif)
BlockNumber component gets the current block number every 1 second (1000ms).  

By replacing the `web3` library with `caver-js`, you can simply sync Klaytn's BlockNumber in real time instead of Ethereum's BlockNumber.

>Ethereum: [`web3.eth.getBlockNumber()`](https://web3js.readthedocs.io/en/v1.2.1/web3-eth.html#getblocknumber)  
>Klaytn: [`caver.klay.getBlockNumber()`](https://docs.klaytn.com/bapp/sdk/caver-js/api-references/caver.klay/block#getblocknumber)

```js
// import web3 from 'ethereum/web3'
import caver from 'klaytn/caver'

class BlockNumber extends Component {
  state = { currentBlockNumber: '...loading' }

  getBlockNumber = async () => {
    // const blockNumber = await web3.eth.getBlockNumber()
    const blockNumber = await caver.klay.getBlockNumber()

    this.setState({ currentBlockNumber: blockNumber })
  }
  // ...
}

export default BlockNumber
```
For more detail about `BlockNumber` component, see [CountBApp tutorial - Blocknumber Component](https://docs.klaytn.com/bapp/tutorials/count-bapp/5.-frontend-code-overview/5-1.-blocknumber-component)

## 5. Interact with the contract: `Count` component

![count component](./count-bapp/images/count-component.gif)

To interact with the contract, we first need to create a instance of the depolyed contract. With the instance, we can read and write the contract's data.  

Let's learn step by step how to migrate `CountBApp` from Ethereum to Klaytn!

- 5-1. Deploy `Count` contract on Klaytn
- 5-2. Create a contract instance
- 5-3. Interact with contract

### 5-1. Deploy `Count` contract on Klaytn

To migrate CountBApp, we need to deploy a Count contract on Klaytn and get the contract address.

1. Change network properties in `truffle-config.js` to deploy contract on Klaytn
2. Get KLAY to your account at [KLAY faucet](https://baobab.wallet.klaytn.com/access?next=faucet) to receive 5 KLAY
3. Type `$ truffle deploy --network klaytn --reset`
4. `Count` contract will be deployed on Baobab testnet, Klaytn.

`truffle-config.js`
```js
// const HDWalletProvider = require("truffle-hdwallet-provider")
const HDWalletProvider = require("truffle-hdwallet-provider-klaytn")

// const NETWORK_ID = '3' // Ethereum, Ropsten testnet's network id
const NETWORK_ID = '1001' // Klaytn, Baobab testnet's network id

// const RPC_URL = 'https://ropsten.infura.io/'
const RPC_URL = 'https://api.baobab.klaytn.net:8651'

// Change it to your own private key that has enough KLAY to deploy contract
const PRIVATE_KEY = '0x3de0c90ce7e440f19eff6439390c29389f611725422b79c95f9f48c856b58277'


module.exports = {

    /* ethereum: {
      provider: () => new HDWalletProvider(PRIVATE_KEY, RPC_URL),
      network_id: NETWORK_ID,
      gas: '8500000',
      gasPrice: null,
    }, */

    klaytn: {
      provider: () => new HDWalletProvider(PRIVATE_KEY, RPC_URL),
      network_id: NETWORK_ID,
      gas: '8500000',
      gasPrice: null,
    },
  },
  compilers: {
    solc: {
      version: '0.5.6',
    },
  },
}
```

For more details about deploy contract, See [CountBapp tutorial - 6. Deploy Contract](https://docs.klaytn.com/bapp/tutorials/count-bapp/6.-deploy-contract)

### 5-2. Create a contract instance

You can create a contract instance with the `caver-js` API. The contract instance creates a connection to `Count` contract. You can call contract method through this instance.

>Ethereum : [`web3.eth.Contract(ABI, address)`](https://web3js.readthedocs.io/en/v1.2.1/web3-eth-contract.html#new-contract)  
>Klaytn : [`caver.klay.Contract(ABI, address)`](https://docs.klaytn.com/bapp/sdk/caver-js/api-references/caver.klay.contract#new-contract)

`src/components/Count.js`
```javascript
// import web3 from 'ethereum/web3'
import caver from 'klaytn/caver'

class Count extends Component {
  constructor() {
    /* const CountContract = DEPLOYED_ABI
      && DEPLOYED_ADDRESS
      && new web3.eth.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS) */

    this.countContract = DEPLOYED_ABI
      && DEPLOYED_ADDRESS
      && new cav.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS)
  }

  // ...
}
export default Count
```

### 5-3. Interact with contract

The `ABI` \(Application Binary Interface\) used to create the Count contract intance allows the `caver-js` to call contract's methods as below. You can interact with Count contract.

- Read data (call)  
`CountContract.methods.count().call()`
- Write data (send)  
`CountContract.methods.plus().send({ ... })`  
`CountContract.methods.minus().send({ ... })`

Since you created a contract instance in previous step, you dont need to modify any code in the part that uses the methods of the contract instance. BApp migration has been completed!

#### Full code: `Count` component

`src/components/Count.js`
```js
import React, { Component } from 'react'
import cx from 'classnames'

import caver from 'klaytn/caver'

import './Count.scss'

class Count extends Component {
  constructor() {
    super()
    // ** 1. Create contract instance **
    // ex:) new caver.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS)
    // You can call contract method through this instance.
    // Now you can access the instance by `this.countContract` variable.
    this.countContract = DEPLOYED_ABI
      && DEPLOYED_ADDRESS
      && new caver.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS)
    this.state = {
      count: '',
      lastParticipant: '',
      isSetting: false,
    }
  }

  intervalId = null

  getCount = async () => {
    // ** 2. Call contract method (CALL) **
    // ex:) this.countContract.methods.methodName(arguments).call()
    // You can call contract method (CALL) like above.
    // For example, your contract has a method called `count`.
    // You can call it like below:
    // ex:) this.countContract.methods.count().call()
    // It returns promise, so you can access it by .then() or, use async-await.
    const count = await this.countContract.methods.count().call()
    const lastParticipant = await this.countContract.methods.lastParticipant().call()
    this.setState({
      count,
      lastParticipant,
    })
  }

  setPlus = () => {
    const walletInstance = caver.klay.accounts.wallet && caver.klay.accounts.wallet[0]

    // Need to integrate wallet for calling contract method.
    if (!walletInstance) return

    this.setState({ settingDirection: 'plus' })

    // 3. ** Call contract method (SEND) **
    // ex:) this.countContract.methods.methodName(arguments).send(txObject)
    // You can call contract method (SEND) like above.
    // For example, your contract has a method called `plus`.
    // You can call it like below:
    // ex:) this.countContract.methods.plus().send({
    //   from: '0x952A8dD075fdc0876d48fC26a389b53331C34585', // PUT YOUR ADDRESS
    //   gas: '200000',
    // })
    this.countContract.methods.plus().send({
      from: walletInstance.address,
      gas: '200000',
    })
      .once('transactionHash', (txHash) => {
        console.log(`
          Sending a transaction... (Call contract's function 'plus')
          txHash: ${txHash}
          `
        )
      })
      .once('receipt', (receipt) => {
        console.log(`
          Received receipt! It means your transaction(calling plus function)
          is in klaytn block(#${receipt.blockNumber})
        `, receipt)
        this.setState({
          settingDirection: null,
          txHash: receipt.transactionHash,
        })
      })
      .once('error', (error) => {
        alert(error.message)
        this.setState({ settingDirection: null })
      })
  }

  setMinus = () => {
    const walletInstance = caver.klay.accounts.wallet && caver.klay.accounts.wallet[0]

    // Need to integrate wallet for calling contract method.
    if (!walletInstance) return

    this.setState({ settingDirection: 'minus' })

    // 3. ** Call contract method (SEND) **
    // ex:) this.countContract.methods.methodName(arguments).send(txObject)
    // You can call contract method (SEND) like above.
    // For example, your contract has a method called `minus`.
    // You can call it like below:
    // ex:) this.countContract.methods.minus().send({
    //   from: '0x952A8dD075fdc0876d48fC26a389b53331C34585', // PUT YOUR ADDRESS
    //   gas: '200000',
    // })

    // It returns event emitter, so after sending, you can listen on event.
    // Use .on('transactionHash') event,
    // : if you want to handle logic after sending transaction.
    // Use .once('receipt') event,
    // : if you want to handle logic after your transaction is put into block.
    // ex:) .once('receipt', (data) => {
    //   console.log(data)
    // })
    this.countContract.methods.minus().send({
      from: walletInstance.address,
      gas: '200000',
    })
      .once('transactionHash', (txHash) => {
        console.log(`
          Sending a transaction... (Call contract's function 'minus')
          txHash: ${txHash}
          `
        )
      })
      .once('receipt', (receipt) => {
        console.log(`
          Received receipt which means your transaction(calling minus function)
          is in klaytn block(#${receipt.blockNumber})
        `, receipt)
        this.setState({
          settingDirection: null,
          txHash: receipt.transactionHash,
        })
      })
      .once('error', (error) => {
        alert(error.message)
        this.setState({ settingDirection: null })
      })
  }

  componentDidMount() {
    this.intervalId = setInterval(this.getCount, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  render() {
    const { lastParticipant, count, settingDirection, txHash } = this.state
    return (
      <div className="Count">
        {Number(lastParticipant) !== 0 && (
          <div className="Count__lastParticipant">
            last participant: {lastParticipant}
          </div>
        )}
        <div className="Count__count">COUNT: {count}</div>
        <button
          onClick={this.setPlus}
          className={cx('Count__button', {
            'Count__button--setting': settingDirection === 'plus',
          })}
        >
          +
        </button>
        <button
          onClick={this.setMinus}
          className={cx('Count__button', {
            'Count__button--setting': settingDirection === 'minus',
          })}
        >
          -
        </button>
        {txHash && (
          <div className="Count__lastTransaction">
            <p className="Count__lastTransactionMessage">
              You can check your last transaction in klaytnscope:
            </p>
            <a
              target="_blank"
              href={`https://scope.klaytn.com/transaction/${txHash}`}
              className="Count__lastTransactionLink"
            >
              {txHash}
            </a>
          </div>
        )}
      </div>
    )
  }
}

export default Count
```
