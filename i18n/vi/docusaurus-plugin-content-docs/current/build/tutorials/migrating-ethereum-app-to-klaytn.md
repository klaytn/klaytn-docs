# Chuyển ứng dụng Ethereum sang Klaytn

## Mục lục <a href="#table-of-contents" id="table-of-contents"></a>

- [1. Giới thiệu](#1-introduction)
- [2. Klaytn có tính tương thích với Ethereum](#2-klaytn-has-ethereum-compatibility)
- [3. Thay đổi kết nối nút từ Ethereum sang Klaytn](#3-change-node-connection-from-ethereum-to-klaytn)
- [4. Tương tác với nút Klaytn: Thành phần `BlockNumber`](#4-interact-with-klaytn-node-blocknumber-component)
- [5. Tương tác với hợp đồng: Thành phần `Đếm`](#5-interact-with-the-contract-count-component)
  - [5-1. Triển khai hợp đồng Count trên Klaytn](#5-1-deploy-count-contract-on-klaytn)
  - [5-2. Tạo một phiên bản hợp đồng](#5-2-create-a-contract-instance)
  - [5-3. Tương tác với hợp đồng](#5-3-interact-with-contract)

## 1. Giới thiệu <a href="#1-introduction" id="1-introduction"></a>

Mục đích của hướng dẫn này là nhằm cung cấp chỉ dẫn để di chuyển ứng dụng Ethereum sang Klaytn. Với Klaytn, bạn không cần có kinh nghiệm từ trước. Một ứng dụng blockchain đơn giản sẽ được dùng làm mẫu để minh họa cách di chuyển ứng dụng Ethereum sang Klaytn.

Chúng ta sẽ chỉ tập trung vào việc thay đổi mã cần thiết để di chuyển ứng dụng Ethereum sang Klaytn. Nếu bạn cần thêm thông tin về cách tạo dApp Klaytn, vui lòng tham khảo [Hướng dẫn CountDApp](./count-dapp/count-dapp.md).

> **Source Code**\
> Mã nguồn hoàn chỉnh có trên GitHub tại [https://github.com/klaytn/countbapp](https://github.com/klaytn/countbapp)

#### Đối tượng mục tiêu <a href="#intended-audience" id="intended-audience"></a>

- Chúng tôi coi như bạn đã có kiến thức cơ bản về [React](https://reactjs.org/). Mã mẫu được tạo bằng React.
- Bạn cần có kinh nghiệm và kiến thức cơ bản về ứng dụng blockchain, nhưng không cần có kinh nghiệm có kinh nghiệm từ trước với Klaytn.

#### Môi trường thử nghiệm <a href="#testing-environment" id="testing-environment"></a>

CountDApp được thử nghiệm trong môi trường sau đây.

- MacOS Mojave 10.14.5
- Nút 10.16.0 (LTS)
- npm 6.9.0
- Python 2.7.10

## 2. Klaytn có tính tương thích với Ethereum <a href="#2-klaytn-has-ethereum-compatibility" id="2-klaytn-has-ethereum-compatibility"></a>

Môi trường hoạt động của Klaytn tương thích với Máy ảo Ethereum và thực thi các hợp đồng thông minh được viết trong Solidity. API RPC của Klaytn và các thư viện khách hàng khác duy trì hầu hết các thông số API giống với thông số của Ethereum nếu có. Do đó, việc chuyển các ứng dụng Ethereum sang Klaytn khá đơn giản. Điều này giúp các nhà phát triển dễ dàng chuyển sang nền tảng blockchain mới.

## 3. Thay đổi kết nối nút từ Ethereum sang Klaytn <a href="#3-change-node-connection-from-ethereum-to-klaytn" id="3-change-node-connection-from-ethereum-to-klaytn"></a>

Đầu tiên, bạn cần thay đổi thư viện tạo kết nối với nút. Sau đó, bạn sẽ xác định URL của nút trong "rpcURL". (thông tin cho bạn biết) [Testnet Ropsten trong Ethereum sẽ dừng hoạt động vào quý 4 năm 2022.](https://blog.ethereum.org/2022/06/21/testnet-deprecation)

- Ethereum
  - Thư viện `web3` kết nối và giao tiếp với nút Ethereum.
  - URL của `testnet Ropsten` được gán cho "rpcURL" .
- Klaytn
  - Thư viện `caver-js` dùng để kết nối và giao tiếp với nút Klaytn.
  - URL của `testnet Baobab` được gán cho "rpcURL".

`src/klaytn/caver.js`

```javascript
// import Web3 from 'web3'
import Caver from 'caver-js'

// const ROPSTEN_TESTNET_RPC_URL = 'https://ropsten.infura.io/'
const BAOBAB_TESTNET_RPC_URL = 'https://public-en-baobab.klaytn.net/'

// const rpcURL = ROPSTEN_TESTNET_RPC_URL
const rpcURL = BAOBAB_TESTNET_RPC_URL

// const web3 = new Web3(rpcURL)
const caver = new Caver(rpcURL)

// export default web3
export default caver
```

## 4. Tương tác với nút Klaytn: Thành phần `BlockNumber` <a href="#4-interact-with-klaytn-node-blocknumber-component" id="4-interact-with-klaytn-node-blocknumber-component"></a>

![blocknumber component](/img/build/tutorials/blocknumber-component.gif)

Thành phần số khối lấy số khối hiện tại trên từng giây (1000ms).

Chỉ cần thay thế thư viện `web3` bằng `caver-js`, bạn có thể đồng bộ hóa BlockNumber của Klaytn theo thời gian thực thay vì BlockNumber của Ethereum.

> Ethereum: [`web3.eth.getBlockNumber()`](https://web3js.readthedocs.io/en/v1.2.1/web3-eth.html#getblocknumber)\
> Klaytn: [`caver.klay.getBlockNumber()`](../../references/sdk/caver-js-1.4.1/api/caver.klay/block.md#getblocknumber)

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

Để biết thêm chi tiết về thành phần `BlockNumber`, hãy tham khảo [Hướng dẫn về CountDApp - Thành phần Blocknumber](count-dapp/code-overview/blocknumber-component.md).

## 5. Tương tác với hợp đồng: Thành phần `Đếm` <a href="#5-interact-with-the-contract-count-component" id="5-interact-with-the-contract-count-component"></a>

![count component](/img/build/tutorials/count-component.gif)

Để tương tác với hợp đồng, chúng ta cần tạo một phiên bản của hợp đồng đã được triển khai. Với phiên bản đó, chúng ta có thể đọc và viết dữ liệu của hợp đồng.

Hãy tìm hiểu từng bước về cách chuyển `CountDApp` từ Ethereum sang Klaytn!

- 5-1. Triển khai hợp đồng `Count` trên Klaytn
- 5-2. Tạo một phiên bản hợp đồng
- 5-3. Tương tác với hợp đồng

### 5-1. Triển khai hợp đồng `Count` trên Klaytn <a href="#5-1-deploy-count-contract-on-klaytn" id="5-1-deploy-count-contract-on-klaytn"></a>

Bước đầu tiên là triển khai hợp đồng Count trên Klaytn và lấy địa chỉ hợp đồng. Trong hầu hết trường hợp, bạn có thể dùng hợp đồng Ethereum trên Klaytn mà không cần sửa đổi. Tham khảo [Di chuyển hợp đồng Ethereum](../../build/smart-contracts/porting-ethereum-contract.md). Trong hướng dẫn này, chúng tôi sẽ sử dụng Truffle để triển khai hợp đồng.

1. Thay đổi thuộc tính mạng lưới trong `truffle-config.js` để triển khai hợp đồng trên Klaytn.
2. Nạp tiền vào tài khoản của bạn bằng [KLAY faucet](https://baobab.wallet.klaytn.foundation/access?next=faucet).
3. Nhập `$ truffle deploy --network baobab --reset`
4. Hợp đồng `Count` sẽ được triển khai trên testnet Baobab, Klaytn.

`truffle-config.js`

```js
// const HDWalletProvider = require("truffle-hdwallet-provider")
const HDWalletProvider = require("truffle-hdwallet-provider-klaytn")

// const NETWORK_ID = '3' // Ethereum, Ropsten testnet's network id
const NETWORK_ID = '1001' // Klaytn, Baobab testnet's network id

// const RPC_URL = 'https://ropsten.infura.io/'
const RPC_URL = 'https://public-en-baobab.klaytn.net'

// Change it to your own private key that has enough KLAY to deploy contract
const PRIVATE_KEY = '0x3de0c90ce7e440f19eff6439390c29389f611725422b79c95f9f48c856b58277'


module.exports = {
  networks: {
    /* ropsten: {
      provider: () => new HDWalletProvider(PRIVATE_KEY, RPC_URL),
      network_id: NETWORK_ID,
      gas: '8500000',
      gasPrice: null,
    }, */

    baobab: {
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

Để biết thêm thông tin về việc triển khai hợp đồng, hãy tham khảo [Hướng dẫn về CountDapp - Triển khai hợp đồng](count-dapp/deploy-contracts.md#3-deploy-contract).

### 5-2. Tạo một phiên bản hợp đồng <a href="#5-2-create-a-contract-instance" id="5-2-create-a-contract-instance"></a>

Bạn có thể tạo một phiên bản hợp đồng bằng API `caver-js`. Phiên bản hợp đồng này tạo một kết nối với hợp đồng `Count`. Bạn có thể gọi phương pháp hợp đồng thông qua phiên bản này.

> Ethereum : [`web3.eth.Contract(ABI, address)`](https://web3js.readthedocs.io/en/v1.2.1/web3-eth-contract.html#new-contract)\
> Klaytn : [`caver.klay.Contract(ABI, address)`](../../references/sdk/caver-js-1.4.1/api/caver.klay.Contract.md#new-contract)

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

### 5-3. Tương tác với hợp đồng <a href="#5-3-interact-with-contract" id="5-3-interact-with-contract"></a>

`ABI` (Giao diện nhị phân ứng dụng) dùng để tạo phiên bản hợp đồng Count cho phép `caver-js` gọi các phương pháp hợp đồng như sau. Bạn có thể tương tác với hợp đồng Count giống như với một đối tượng JavaScript.

- Đọc dữ liệu (call)\
  `CountContract.methods.count().call()`
- Viết dữ liệu (send)\
  `CountContract.methods.plus().send({ ... })`\
  `CountContract.methods.minus().send({ ... })`

Sau khi tạo một phiên bản hợp đồng trong bước trước, bạn không cần thay đổi bất cứ mã nào khi dùng phương pháp hợp đồng sau đó. Đã hoàn tất di chuyển dApp!

#### Mã đầy đủ: Thành phần `Đếm` <a href="#full-code-count-component" id="full-code-count-component"></a>

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
              href={`https://klaytnscope.com/tx/${txHash}`}
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
