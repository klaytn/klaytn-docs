# Thành phần số khối

`src/components/BlockNumber.js`:

## Thành phần `BlockNumber` <a id="blocknumber-component"></a>

1\) Mã lệnh đầy đủ\
2\) Vai trò của thành phần BlockNumber\
3\) Phương thức `getBlockNumber` chi tiết\
4\) Gọi `getBlockNumber` sau mỗi khoảng thời gian bằng nhau

### 1) Mã lệnh đầy đủ <a id="1-full-code"></a>

```javascript
import React, { Component } from 'react'

import { cav } from 'klaytn/caver'

import './BlockNumber.scss'

/**
 * BlockNumber component gets the current block number every 1 second.(1000ms)
 * current block number can be fetched through caver-js library
 * which make a connection, communicating with klaytn node.
 * cf) If you want to connect to specific klaytn node,
 * change 'rpcURL' config in klaytn/caver.js
 */
class BlockNumber extends Component {
  /**
   * BlockNumber component has a 'currentBlockNumber' state.
   */
  state = {
    currentBlockNumber: '...loading',
  }

  /**
   * 'getBlockNumber' method works
   * 1) get current block number from klaytn node by calling 'cav.klay.getBlockNumber()'
   * 2) set 'currentBlockNumber' state to the value fetched from step 1).
   */
  getBlockNumber = async () => {
    const blockNumber = await cav.klay.getBlockNumber()
    this.setState({ currentBlockNumber: blockNumber })
  }

  /**
   * intervalId value will be populated by the value returned from `setInterval`.
   * intervalId will be used to clear interval, preventing memory leak.
   */
  intervalId = null

  /**
   * In 'componentDidMount' lifecycle, call 'getBlockNumber' method intervally.
   */
  componentDidMount() {
    this.intervalId = setInterval(this.getBlockNumber, 1000)
  }

  /**
   * In 'componentWillUnmount' lifecycle, clear interval
   * which calls getBlockNumber per 1000ms.
   */
  componentWillUnmount() {
    if (this.intervalId) clearInterval(this.intervalId)
  }

  /**
   * In 'render' lifecycle, show 'currentBlockNumber' state like below:
   * <p>Block No. {currentBlockNumber}</p>
   */
  render() {
    const { currentBlockNumber } = this.state
    return (
      <div className="BlockNumber">
        <p className="BlockNumber__current">Block No. {currentBlockNumber}</p>
      </div>
    )
  }
}

export default BlockNumber
```

### 2) Vai trò của thành phần BlockNumber <a id="2-blocknumber-component-s-role"></a>

Vai trò của thành phần `BlockNumber` là hiển thị số khối hiện tải của Klaytn.\
Nó gửi yêu cầu lấy số khối hiện tại đến nút Klaytn bằng cách gọi `caver.klay.getBlockNumber()` mỗi giây. Thành phần này render lại DOM bằng `this.setState({ currentBlockNumber: blockNumber })` tùy theo phản hồi nhận về.

### 3) Phương thức `getBlockNumber` chi tiết <a id="3-getblocknumber-method-in-detail"></a>

```javascript
/**
 * 'getBlockNumber' method works
 * 1) get current block number from klaytn node by calling 'cav.klay.getBlockNumber()'
 * 2) set 'currentBlockNumber' state to the value fetched from step 1).
 */
getBlockNumber = async () => {
  const blockNumber = await cav.klay.getBlockNumber()
  this.setState({ currentBlockNumber: blockNumber })
}
```

Phương thức `getBlockNumber` được khai báo như hàm async. Khai báo một hàm như async để dễ xử lý giá trị(promise) không đồng bộ. `cav.klay.getBlockNumber` trả về một promise, và có thể xử lý kết quả đơn giản bằng cách nối thêm từ khóa `await`.

Để biết thêm thông tin về từ khóa async-await, hãy xem trang web MDN của javascript [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)

Sau khi gán số khối hiện tại được trả về từ `cav.klay.getBlockNumber()` vào `blockNumber`, chúng tôi gọi API React `this.setState`. `this.setState({ currentBlockNumber: blockNumber })` thực chất là đặt thuộc tính trạng thái `currentBlockNumber` thành `blockNumber`. `this.setState(nextState)` cập nhật trạng thái hiện tại và hoàn trả lại thành phần.

Để biết thêm thông tin về this.setState của React và cơ chế render, truy cập vào trang web chính thức của React [https://reactjs.org/docs/state-and-lifecycle.html](https://reactjs.org/docs/state-and-lifecycle.html)

### 4) Gọi `getBlockNumber` sau mỗi khoảng thời gian bằng nhau <a id="4-call-getblocknumber-intervally"></a>

```javascript
/**
 * In 'componentDidMount' lifecycle, call 'getBlockNumber' method intervally.
 */
componentDidMount() {
  this.intervalId = setInterval(this.getBlockNumber, 1000)
}
```

Vì chúng ta muốn ứng dụng hướng dẫn của mình hiển thị số khối hiện tại liên tục, chúng ta gọi hàm `getBlockNumber` mỗi giây (1000ms). Chúng ta có thể sử dụng hàm `setInterval` để thực hiện điều này. `setInterval(func, delay)` gọi hàm đã cho liên tục với độ trễ đã cho. Hàm `setInterval` trả về id của khoảng thời gian để sử dụng cho việc xóa khoảng thời gian này sau đó nên chúng ta lưu nó vào biến `this.intervalId`.

```javascript
/**
 * In 'componentWillUnmount' lifecycle, clear interval
 * which calls getBlockNumber per 1000ms.
 */
componentWillUnmount() {
  if (this.intervalId) clearInterval(this.intervalId)
}
```

Khi bỏ gắn thành phần, dừng việc lấy số khối hiện tại bằng cách loại bỏ khoảng thời gian.
