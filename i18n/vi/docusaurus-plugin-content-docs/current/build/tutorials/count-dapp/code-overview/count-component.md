# Thành phần Count

`src/components/Count.js` thực hiện như sau,

## Thành phần `Đếm` <a href="#count-component" id="count-component"></a>

1\) Mã lệnh đầy đủ\
2\) Vai trò của thành phần `Count`\
3\) Cách tương tác với hợp đồng?\ 4) Tương tác với hợp đồng: phương pháp `getCount`\
5\) Tương tác với hợp đồng: phương pháp `setPlus`\
6\) Vòng đời giao dịch

### 1. Mã lệnh đầy đủ <a href="#1-full-code" id="1-full-code"></a>

```javascript
import React, { Component } from 'react'
import cx from 'classnames'

import { cav } from 'klaytn/caver'

import './Count.scss'

class Count extends Component {
  constructor() {
    super()
    // ** 1. Create contract instance **
    // ex:) new cav.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS)
    // You can call contract method through this instance.
    // Now you can access the instance by `this.countContract` variable.
    this.countContract = DEPLOYED_ABI
      && DEPLOYED_ADDRESS
      && new cav.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS)
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
    const walletInstance = cav.klay.accounts.wallet && cav.klay.accounts.wallet[0]

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
    try{
      this.countContract.send({
        from: walletInstance.address,
        gas: '200000',
      }, 'plus')
        .then((receipt) => {
          console.log(`
            Received receipt! It means your transaction(calling plus function)
            is in klaytn block(#${receipt.blockNumber})
          `, receipt)
          this.setState({
            settingDirection: null,
            txHash: receipt.transactionHash,
          })
        })
    } catch (error) {
      alert(err.message)
      this.setState({ settingDirection: null })
    }
  }

  setMinus = () => {
    const walletInstance = cav.klay.accounts.wallet && cav.klay.accounts.wallet[0]

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
    try{
      this.countContract.send({
        from: walletInstance.address,
        gas: '200000',
      }, 'minus')
        .then((receipt) => {
          console.log(`
            Received receipt! It means your transaction(calling minus function)
            is in klaytn block(#${receipt.blockNumber})
          `, receipt)
          this.setState({
            settingDirection: null,
            txHash: receipt.transactionHash,
          })
        })
    } catch (error) {
      alert(err.message)
      this.setState({ settingDirection: null })
    }
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
        {lastParticipant && (
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
              You can check your last transaction in klaytn scope:
            </p>
            <a
              target="_blank"
              href={`https://baobab.klaytnfinder.io/tx/${txHash}`}
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

### 2. Vai trò của thành phần`Count` <a href="#2-count-component-s-role" id="2-count-component-s-role"></a>

Vai trò của thành phần `'Count'` là tương tác với hợp đồng Count được triển khai trên blockchain Klaytn.

Trong Count.sol, chúng ta khai báo vài biến và hàm như dưới đây:

- `count`
- `lastParticipant`
- `plus` - tăng biến lưu trữ `count` thêm 1. (count = count + 1)\\
- `minus` - giảm biến lưu trữ `count` đi 1. (count = count - 1)

Trong thành phần Count.js, chúng ta có phương pháp tương tác với các hàm và biến của hợp đồng Count.

### 3. Cách tương tác với hợp đồng? <a href="#3-how-to-interact-with-contract" id="3-how-to-interact-with-contract"></a>

Để tương tác với hợp đồng, chúng ta cần một phiên bản hợp đồng của hợp đồng được triển khai.\
Phiên bản hợp đồng này có thể được tạo ra từ API `caver.klay.Contract(ABI, contractAddress)` của caver-js. Để biết thêm thông tin, hãy xem [caver.klay.Contract](../../../../references/sdk/caver-js-1.4.1/api/caver.klay.Contract.md#new-contract).

Với `Hợp đồng ABI`(Giao diện Nhị phân ứng dụng), caver có thể gọi phương pháp hợp đồng như là một hàm cục bộ,\
ví dụ)\ `contractInstance.methods.count().call()`\
`contractInstance.methods.plus().send({ ... })`\
`contractInstance.methods.minus().send({ ... })`

`Địa chỉ hợp đồng` có thể thấy trong tập tin `build/contracts/Count.json` sau khi biên dịch và triển khai hợp đồng. Để dễ dàng cho việc chạy thử, chúng tôi triển khai hợp đồng lên testnet Klaytn và đẩy tập tin `deployedABI` và `deployedAddress` vào thư mục. Những tập tin này bao gồm ABI của hợp đồng Count và địa chỉ hợp đồng được triển khai.\
Nhờ cấu hình webpack, chúng tôi có thể truy cập tập tin qua các biến. (`DEPLOYED_ADDRESS`, `DEPLOYED_ABI`)

Ví dụ)\
`DEPLOYED_ADDRESS` trả về địa chỉ hợp đồng được triển khai.\
`DEPLOYED_ABI` trả về ABI hợp đồng Count.

```javascript
constructor() {
  super()
  // ** 1. Create contract instance **
  // ex:) new cav.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS)
  // You can call contract method through this instance.
  // Now you can access the instance by `this.countContract` variable.
  this.countContract = DEPLOYED_ABI
    && DEPLOYED_ADDRESS
    && new cav.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS)
  ...
}
```

`this.countContract = new cav.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS)` tạo phiên bản hợp đồng để tương tác với hợp đồng `Count` được triển khai, bằng cách truyền `DEPLOYED_ABI` và `DEPLOYED_ADDRESS` đến API `cav.klay.Contract`. Và phiên bản hợp đồng này được lưu vào `this.countContract`.

### 4. Tương tác với hợp đồng: phương pháp `getCount` <a href="#4-interact-with-contract-getcount-method" id="4-interact-with-contract-getcount-method"></a>

```javascript
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
```

Vì chúng tôi có phiên bản hợp đồng, chúng tôi có thể gọi phương pháp hợp đồng. Phiên bản hợp đồng có một thuộc tính, `phương pháp`.\
Nó chứa các hàm của hợp đồng, ví dụ: `count`, `lastParticipant`, `plus`, và `minus`.

Trong mã lệnh ở trên, hàm `getCount` được khai báo là `async`, vì lệnh gọi hàm hợp đồng trả về đối tượng promise. Chúng ta có thể tìm nạp `count` bằng cách gọi `this.countContract.methods.count().call()`.

Chúng ta có thể tìm nạp địa chỉ `lastParticipant` bằng cách gọi `this.countContract.methods.lastParticipant().call()`.

Để biết thêm thông tin về lệnh gọi phương pháp hợp đồng, hãy xem [caver.klay.Contract](../../../../references/sdk/caver-js-1.4.1/api/caver.klay.Contract.md#methods)

Chúng tôi muốn tìm nạp giá trị biến `count` sau mỗi 1 giây, giá trị này có thể lấy được bằng `setInterval`.
Nó cũng giống như cách tìm nạp `getBlockNumber` trong `BlockNumber.js` bằng cách gọi `caver.klay.getBlockNumber()` sau mỗi khoảng thời gian bằng nhau.

```javascript
componentDidMount() {
  this.intervalId = setInterval(this.getCount, 1000)
}

componentWillUnmount() {
  clearInterval(this.intervalId)
}
```

Nó cũng giống như cách tìm nạp `getBlockNumber` trong `BlockNumber.js` bằng cách gọi `caver.klay.getBlockNumber()` sau mỗi khoảng thời gian bằng nhau.
5\) Tương tác với hợp đồng: phương pháp `setPlus` <a href="#5-interact-with-contract-setplus-method" id="5-interact-with-contract-setplus-method"></a>

### Hàm `setPlus` là phần quan trọng nhất trong thành phần Count.

```javascript
setPlus = () => {
  const walletInstance = cav.klay.accounts.wallet && cav.klay.accounts.wallet[0]

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
  try{
    this.countContract.send({
      from: walletInstance.address,
      gas: '200000',
    }, 'plus')
      .then((receipt) => {
        console.log(`
          Received receipt! It means your transaction(calling plus function)
          is in klaytn block(#${receipt.blockNumber})
        `, receipt)
        this.setState({
          settingDirection: null,
          txHash: receipt.transactionHash,
        })
      })
  } catch (error) {
    alert(err.message)
    this.setState({ settingDirection: null })
  }
}
```

Nó tương tác với hợp đồng bằng cách gọi hàm hợp đồng `plus`.
Tuy nhiên, không giống `count` và `lastParticipant` chỉ đọc dữ liệu, hàm `plus` **ghi dữ liệu** vào blockchain Klaytn.\
Đọc dữ liệu thì miễn phí, tuy nhiên ghi dữ liệu phát sinh chi phí sử dụng hoạt động tính toán và lưu trữ.
Sự kiện `transactionHash` sẽ kích hoạt khi bạn nhận được hàm băm giao dịch. Vì hàm này cũng là phương pháp hợp đồng, nó nằm trong `this.counterContract.methods`.
`receipt` được kích hoạt,khi bạn có thể nhận được biên lai giao dịch. Tuy nhiên, không giống `count` và `lastParticipant` chỉ đọc dữ liệu, hàm `plus` **ghi dữ liệu** vào blockchain Klaytn.\
Đọc dữ liệu thì miễn phí, tuy nhiên ghi dữ liệu phát sinh chi phí sử dụng hoạt động tính toán và lưu trữ.
Đọc dữ liệu thì miễn phí, tuy nhiên ghi dữ liệu phát sinh chi phí sử dụng hoạt động tính toán và lưu trữ.

Chi phí được đo bằng lượng `gas` đã sử dụng.
`error` được kích hoạt khi có lỗi xảy ra trong quá trình gửi giao dịch.
Reading data is free, however writing data incurs cost for the use of computation and storage. Vì lý do này, việc gửi giao dịch cần thuộc tính `from:` để thông báo cho node Klaytn chịu trách nhiệm cho phí giao dịch.

Thuộc tính `gas:` định nghĩa lượng gas tối đa người gửi giao dịch muốn trả cho giao dịch. Để gửi giao dịch, sử dụng `.send()` thay cho `.call()`.
Sự kiện `transactionHash` sẽ kích hoạt khi bạn nhận được hàm băm giao dịch.

```javascript
this.countContract.methods.plus().send({
  from: walletInstance.address,
  gas: '200000',
})
```

6. Vòng đời giao dịch <a href="#6-transaction-life-cycle" id="6-transaction-life-cycle"></a>
   `receipt` được kích hoạt,khi bạn có thể nhận được biên lai giao dịch.

```javascript
.send({
  from: ...,
  gas: ...
})
```

### Sau khi gửi giao dịch, bạn có thể nhận được trạng thái giao dịch trong suốt vòng đời.

```javascript
try{
  this.countContract.send({
    from: walletInstance.address,
    gas: '200000',
  }, 'plus')
    .then((receipt) => {
      console.log(`
        Received receipt! It means your transaction(calling plus function)
        is in klaytn block(#${receipt.blockNumber})
      `, receipt)
      this.setState({
        settingDirection: null,
        txHash: receipt.transactionHash,
      })
    })
} catch (error) {
  alert(err.message)
  this.setState({ settingDirection: null })
}
```

Sự kiện `transactionHash` sẽ kích hoạt khi bạn nhận được hàm băm giao dịch.
`error` được kích hoạt khi có lỗi xảy ra trong quá trình gửi giao dịch.
3-a.

Sự kiện này vẫn chạy trước khi gửi giao dịch lên mạng. `receipt` được kích hoạt,khi bạn có thể nhận được biên lai giao dịch.

Điều này có nghĩa là giao dịch của bạn đã đi vào khối. Bạn có thể lấy được số khối chứa giao dịch của mình bằng `receipt.blockNumber`. `error` được kích hoạt khi có lỗi xảy ra trong quá trình gửi giao dịch.

cf) `settingDirection` được sử dụng để hiển thị một chỉ báo đang tải về(gif).
3-a.

Khi giao dịch đã nằm trong khối, gỡ chỉ báo đang tải bằng cách gán `null` cho `settingDirection`.
Kiểm tra giao dịch trong `https://baobab.scope.klaytn.com/tx/${txHash}`. Bạn có thể gọi hàm này bằng cách nhấp vào nút +.

```javascript
<button
  onClick={this.setPlus}
  className={cx('Count__button', {
    'Count__button--setting': settingDirection === 'plus',
  })}
>
  +
</button>
```

Tóm lại, sau khi nhấp vào nút +,

Bạn sẽ gửi một giao dịch, giao dịch này sẽ gọi phương pháp hợp đồng `plus`.

1. Ngay sau khi gửi giao dịch, bạn sẽ nhận được hàm băm giao dịch.\
   3-a.
   3-a.
2. Sau khi giao dịch của bạn đã được xử lý và nằm trong khối, bạn sẽ nhận được biên lai biên lai giao dịch.\ 3-b.
   3-a. Nếu có lỗi khi gửi giao dịch, bạn sẽ nhận được thông báo lỗi.
   Kiểm tra giao dịch trong `https://baobab.scope.klaytn.com/tx/${txHash}`.
   3-b. Và khối `receipt` sẽ không bao giờ được gọi. Mã lệnh đầy đủ gọi phương pháp `plus` như dưới đây:

Tôi kiểm tra giao dịch của mình trong blockchain thế nào?

```javascript
try{
  this.countContract.send({
    from: walletInstance.address,
    gas: '200000',
  }, 'plus')
    .then((receipt) => {
      console.log(`
        Received receipt! It means your transaction(calling plus function)
        is in klaytn block(#${receipt.blockNumber})
      `, receipt)
      this.setState({
        settingDirection: null,
        txHash: receipt.transactionHash,
      })
    })
} catch (error) {
  alert(err.message)
  this.setState({ settingDirection: null })
}
```

### <a href="#how-can-i-check-my-transaction-in-the-blockchain" id="how-can-i-check-my-transaction-in-the-blockchain"></a> Sau khi gửi giao dịch, bạn có thể kiểm tra thông tin giao dịch bằng Klaytnscope. Kiểm tra giao dịch trong `https://baobab.scope.klaytn.com/tx/${txHash}`.&#xA;Kiểm tra giao dịch trong `https://baobab.scope.klaytn.com/tx/${txHash}`.

![check-transaction](/img/build/tutorials/tutorial-check-your-transaction.gif)

B
Check it in `https://baobab.scope.klaytn.com/tx/${txHash}`.
