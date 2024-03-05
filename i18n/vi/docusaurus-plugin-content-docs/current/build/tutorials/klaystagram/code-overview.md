# Tổng quan về mã Frontend

1. Tổng quan
2. `src/App.js`
3. `src/pages`
4. Chúng ta sẽ tìm hiểu gì?

## Tổng quan <a id="1-overview"></a>

Trong phần này, chúng ta sẽ xây dựng front-end. Mục đích chính của hướng dẫn này là tìm hiểu cách kết nối hợp đồng với mã front-end. Do đó, chúng tôi sẽ giải thích ngắn gọn mã React và tập trung vào các hàm API tương tác với hợp đồng được triển khai trên Klaytn.

```text
|-- src
    |-- klaytn
      |-- caver.js
      |-- KlaystagramContract.js
    |-- redux
      |-- auth.js
      |-- photos.js
    |-- pages
      |-- AuthPage.js
      |-- FeedPage.js
    |-- components
      |-- UploadPhoto.js
      |-- Feed.js
      |-- TransferOwnership.js
      |-- ...
    |-- App.js
```

`src/klaytn`: Chứa các tập tin giúp tương tác với chuỗi khối Klaytn.

- `src/klaytn/caver.js`: Khởi tạo caver trong cài đặt đã định cấu hình.

  cf) caver-js là thư viện RPC tạo kết nối với nút Klaytn, tương tác với nút hoặc hợp đồng thông minh được triển khai trên klaytn.

- `src/klaytn/Klaystagram.js`: Tạo một phiên bản hợp đồng bằng cách sử dụng API caver-js. Bạn có thể tương tác với hợp đồng thông qua phiên bản.

`src/redux`: Tạo các hàm API tương tác với hợp đồng và theo dõi dữ liệu sau đó.

- `redux/actions/auth.js`
- `redux/actions/photos.js`

`src/pages`: Chứa các tập tin hai trang soạn ra ứng dụng Klaystagram.

- `src/pages/AuthPage.js`: Chứa mẫu đăng ký và đăng nhập. Bạn có thể tạo khóa riêng tư trong mẫu đăng ký và sử dụng nó để đăng nhập trên ứng dụng.
- `src/pages/FeedPage.js`: Hiển thị ảnh đã đọc từ hợp đồng, hiển thị các ảnh đó đến người dùng và cung cấp tính năng tải lên.

`src/components`: Chứa các tập tin thành phần soạn ra trang.

- `src/components/Feed.js`: Đọc dữ liệu từ hợp đồng và hiển thị ảnh.
- `src/components/UploadPhoto.js`: Tải ảnh lên bằng cách gửi giao dịch đến hợp đồng.
- `src/components/TransferOwnership.js`: Chuyển quyền sở hữu ảnh bằng cách gửi giao dịch.

`src/App.js`: Tập tin thành phần gốc của ứng dụng hướng dẫn dành cho các thành phần tổng thể.

## App.js <a id="1-app-js"></a>

`'App.js'` là tập tin thành phần gốc dành cho các thành phần tổng thể. Nó render hai trang tùy thuộc vào trạng thái đăng nhập của người dùng. Mỗi trang có các hàm tương tác với hợp đồng. Bạn phải thêm phiên bản ví vào caver để gửi giao dịch đến chuỗi khối. Hãy xem xét nhanh mã cho phần tổng quan.

cf. caver-js(or `cav` in the code) là một thư viện để tương tác với mã Klaytn blockchain. Chúng ta sẽ tìm hiểu chi tiết trong chương tiếp theo - [7-1. Kết nối hợp đồng đến Frontend](./feedpage.md#7-1-connect-contract-to-frontend)

```javascript
// src/App.js

import React, { Component } from 'react'
import { connect } from 'react-redux'
import AuthPage from 'pages/AuthPage'
import FeedPage from 'pages/FeedPage'
import Nav from 'components/Nav'
import Footer from 'components/Footer'
import Modal from 'components/Modal'
import Toast from 'components/Toast'

import * as authActions from 'redux/actions/auth'

import './App.scss'

class App extends Component {
  constructor(props) {
    super(props)
    /**
     * 1. Initialize `isLoggedIn` state
     * cf) sessionStorage is internet browser's feature
     * which stores data until the browser tab is closed.
     */
    const walletFromSession = sessionStorage.getItem('walletInstance')
    const { integrateWallet, removeWallet } = this.props

    if (walletFromSession) {
      try {
        /**
         * 2-1. Integrate wallet
         * If 'walletInstance' value exists,
         * intergrateWallet method adds the instance to caver's wallet and redux store
         * cf) redux/actions/auth.js -> integrateWallet()
         */
        integrateWallet(JSON.parse(walletFromSession).privateKey)
      } catch (e) {
        /**
         * 2-2. Remove wallet
         * If value in sessionStorage is invalid wallet instance,
         * removeWallet method removes the instance from caver's wallet and redux store
         * cf) redux/actions/auth.js -> removeWallet()
         */
        removeWallet()
      }
    }
  }
  /**
   * 3. Render the page
   * Redux will initialize isLoggedIn state to true or false,
   * depending on whether walletInstance exists in the session storage
   */
  render() {
    const { isLoggedIn } = this.props
    return (
      <div className="App">
        <Modal />
        <Toast />
        {isLoggedIn && <Nav />}
        {isLoggedIn ? <FeedPage /> : <AuthPage />}
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
})

const mapDispatchToProps = (dispatch) => ({
  integrateWallet: (privateKey) => dispatch(authActions.integrateWallet(privateKey)),
  removeWallet: () => dispatch(authActions.removeWallet()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
```

cf) Ta cần `JSON.parse` vì phần `walletInstance` được lưu trữ dưới dạng chuỗi JSON.

\*\*1. Khởi chạy trạng thái `isLoggedIn` \*\*\
Để khởi chạy trạng thái `isLoggedIn`, chúng ta dùng phương pháp vòng đời `constructor` trên thành phần ứng dụng. Trạng thái này kiểm tra phiên `walletInstance` ở sessionStorage của trình duyệt trước khi thành phần được liên kết.

**2. Tích hợp/Xóa ví**\
Nếu bạn chưa từng đăng nhập trước đây, phiên `walletInstance` có thể không tồn tại. Nếu bạn từng đăng nhập, phần `walletInstance` có thể tồn tại dưới dạng chuỗi JSON ở sessionStorage.

1. Tích hợp - Nếu phiên bản ví tồn tại trong sessionStorage, hãy thử thêm phiên bản ví vào caver và cửa hàng redux.
2. Xóa - Nếu phiên bản ví trong sessionStorage không hợp lệ, hãy xóa ví khỏi ví của caver và cửa hàng redux.

```javascript
// redux/actions/auth.js

// 1. Inject wallet
export const integrateWallet = (privateKey) => (dispatch) => {
  // Make wallet instance with caver's privateKeyToAccount API
  const walletInstance = cav.klay.accounts.privateKeyToAccount(privateKey)

  // To send a transaction, add wallet instance to caver
  cav.klay.accounts.wallet.add(walletInstance)

  // To maintain logged-in status, store walletInstance at sessionStorage
  sessionStorage.setItem('walletInstance', JSON.stringify(walletInstance))

  // To access walletInstance information throughout the whole application, save it to redux store
  return dispatch({
    type: INTEGRATE_WALLET,
    payload: {
      privateKey,
      address: walletInstance.address,
    },
  })
}

// 2. Remove wallet
export const removeWallet = () => (dispatch) => {
  cav.klay.accounts.wallet.clear()
  sessionStorage.removeItem('walletInstance')
  return dispatch({
    type: REMOVE_WALLET,
  })
}
```

cf. Để biết thêm thông tin về API `privateKeyToAccount` của caver, hãy xem [caver.klay.tài khoảns.privateKeyToAccount](../../../references/sdk/caver-js-1.4.1/api/caver.klay.accounts.md#privatekeytoaccount).

**3. Kết xuất trang** Redux sẽ khởi chạy trạng thái `isLoggedIn` thành true hoặc false, tùy thuộc vào việc walletInstance có tồn tại trong phần lưu trữ phiên hay không

## `src/pages` <a id="2-src-pages"></a>

Như chúng ta đã mô tả ở [above](#1-overview), `src/pages` chứa các tập tin hai trang. Một trong những tập tin hai trang này sẽ được kết xuất trên ứng dụng, tùy thuộc vào việc người dùng đã đăng nhập hay chưa.

- `AuthPage.js`: Chứa biểu mẫu đăng nhập và đăng ký. Bạn có thể tạo khóa riêng tư trong biểu mẫu đăng ký và dùng khóa này để đăng nhập trên ứng dụng.
- `src/pages/FeedPage.js`: Đọc dữ liệu ảnh từ hợp đồng và hiển thị đến người dùng. Người dùng cũng có thể tải ảnh của họ lên.

## Chúng ta sẽ tìm hiểu gì? <a id="3-what-we-are-going-to-learn"></a>

Trong ứng dụng dựa trên blockchain, có hai cách để tương tác với hợp đồng.

1\) **Reading** dữ liệu từ hợp đồng.\
2\) **Writing** dữ liệu vào hợp đồng.

Việc đọc dữ liệu từ hợp đồng không mất phí.\
Tuy nhiên, bạn sẽ phải trả phí để viết dữ liệu vào hợp đồng (Gửi giao dịch). Vì vậy, nếu muốn viết dữ liệu, bạn phải dùng tài khoản Klaytn có KLAY để trả phí.

Trong AuthPage, `SignupForm` giúp bạn tạo tài khoản Klaytn (khóa riêng tư). Sau đó, bạn có thể đăng nhập bằng khóa riêng tư và thanh toán phí giao dịch.

Nếu bạn muốn tìm hiểu thêm về hai phương pháp đăng nhập khác nhau (khóa riêng tư / lưu trữ khóa),\
vui lòng tham chiếu [5.2. Trang Auth Component](../count-dapp/code-overview/auth-component.md).

Trong hướng dẫn này, chúng ta sẽ tập trung vào `FeedPage`, rồi từ đó tìm hiểu cách ứng dụng này **reads and writes data** từ hợp đồng/vào hợp đồng.
