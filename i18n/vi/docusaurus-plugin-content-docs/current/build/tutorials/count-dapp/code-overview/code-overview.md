# Tổng quan về mã Frontend

1. `src/index.js` - Điểm mở đầu ứng dụng của chúng tôi
2. `static/index.html` - index.html
3. `src/routes.js`: Chứa định nghĩa định tuyến
4. `src/App.js` - Thành phần gốc trong ứng dụng của chúng tôi
5. `src/klaytn/caver.js` - Tạo kết nối với nút Klaytn

## `src/index.js`: <a id="1-src-index-js"></a>

```javascript
import ReactDOM from 'react-dom'

import App from './App'
import renderRoutes from './routes'

import './index.scss'

// Render App(thành phần gốc).
ReactDOM.render(
  renderRoutes(App),
  document.getElementById('root')
)

// thay hot module.
if (module.hot) {
  module.hot.accept('./App.js', () => {
    const NextApp = require('./App').default
    ReactDOM.render(renderRoutes(NextApp), document.getElementById('root'))
    console.log('Đã thay hot module..')
  })
}
```

`'index.js'` là tập tin javascript chính cho ứng dụng hướng dẫn của chúng tôi. Đây là điểm khởi đầu cho ứng dụng của chúng tôi.

Nó sử dụng thư viện 'react-dom' để render một thành phần React vào DOM trong container\('\#root'\) được cấp và trả về tham chiếu đến thành phần đó. Tóm lại, qua 'react-dom' DOM ứng dụng hướng dẫn của chúng tôi sẽ được gán thành `<div id="root"></div>` trong file `public/index.html`.

## `static/index.html`: <a id="2-static-index-html"></a>

```markup
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <title>klay blockchain-based app</title>
  </head>
  <body>
    <noscript>
      Bạn cần bật JavaScript để chạy ứng dụng này.
    </noscript>
    <div id="root"></div> <!-- DOM sẽ được gán vào đây. -->
    <!--
      Đây là tập tin HTML mẫu.
      Nếu mở trực tiếp từ trình duyệt, bạn sẽ thấy một trang trống.

      Bạn có thể thêm webfonts, tag meta hoặc dữ liệu phân tích vào tập tin này.
      Bước built sẽ đặt các script bundle vào tag <body>.

      Để bắt đầu phát triển, chạy `npm start` hoặc `yarn start`.
      Để tạo bundle cho môi trường production, sử dụng `npm run build` hoặc `yarn build`.
    -->
  </body>
</html>
```

`index.html` là tập tin HTML để render ra ứng dụng hướng dẫn của chúng tôi.

Để biết thêm thông tin, hãy truy cập trang web React chính thức [https://reactjs.org/docs/react-dom.html\#render](https://reactjs.org/docs/react-dom.html#render)

## `src/routes.js`: <a id="3-src-routes-js"></a>

```javascript
import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import Count from 'components/Count'

const renderRoutes = rootComponent => (
  <Router history={browserHistory}>
    <Route component={rootComponent}>
      <Route path="/" component={Count} />
    </Route>
  </Router>
)

export default renderRoutes
```

`'routes.js'` chứa định nghĩa định tuyến cho ứng dụng hướng dẫn của chúng tôi.  
Vì là thành phần gốc, thành phần `'App.js'` render ra các thành phần con được định nghĩa trong tập tin `'route.js'`.  
Bằng mã lệnh trên, thành phần `'Count'` sẽ được render thành con của rootComponent khi đường dẫn URL của trình duyệt là `"/"`.

Để biết thêm thông tin, truy cập thư viện github React router [https://github.com/ReactTraining/react-router/blob/v3.2.1/docs/API.md](https://github.com/ReactTraining/react-router/blob/v3.2.1/docs/API.md)

## `src/App.js`: <a id="4-src-app-js"></a>

```javascript
import React, { Component } from 'react'

import { cav } from 'klaytn/caver'
import BlockNumber from 'components/BlockNumber'
import Auth from 'components/Auth'

import './App.scss'

class App extends Component {
  componentWillMount() {
    /**
     * sessionStorage là tính năng của trình duyệt internet dùng để lưu trữ dữ liệu
     * đến khi đóng tab trình duyệt.
     */
    const walletFromSession = sessionStorage.getItem('walletInstance')

    // Nếu tồn tại giá trị 'walletInstance', thêm giá trị này vào ví của caver
    if (walletFromSession) {
      try {
        cav.klay.tài khoảns.wallet.add(JSON.parse(walletFromSession))
      } catch (e) {
        // Nếu giá trị trong sessionStorage không phải là phiên bản ví hợp lệ,
        // gỡ nó khỏi sessionStorage.
        sessionStorage.removeItem('walletInstance')
      }
    }
  }

  render() {
    return (
      <div className="App">
        <BlockNumber />
        <Auth />
        {this.props.children}
      </div>
    )
  }
}

export default App
```

`'App.js'` là thành phần gốc của ứng dụng hướng dẫn của chúng tôi.

```javascript
render() {
  return (
    <div className="App">
      <BlockNumber />
      <Auth />
      {this.props.children}
    </div>
  )
}
```

Nó render `BlockNumber`, `Auth` và thành phần `{this.props.children}`.  
`{this.props.children}` sẽ được gán theo tập tin `routes.js`.  
Nếu đường dẫn url của trình duyệt là `/`, nó sẽ render thành phần `<Count />`.

```javascript
componentWillMount() {
  /**
     * sessionStorage là tính năng của trình duyệt internet dùng để lưu trữ dữ liệu
     * đến khi đóng tab trình duyệt.
   */
  const walletFromSession = sessionStorage.getItem('walletInstance')

  // Nếu tồn tại giá trị 'walletInstance', thêm giá trị này vào ví của caver
  if (walletFromSession) {
    try {
      cav.klay.tài khoảns.wallet.add(JSON.parse(walletFromSession))
    } catch (e) {
       // Nếu giá trị trong sessionStorage không phải là phiên bản ví hợp lệ,
       // gỡ nó khỏi sessionStorage.
      sessionStorage.removeItem('walletInstance')
    }
  }
}
```

`componentWillMount` kiểm tra xem có phiên `walletInstance` trong sessionStorage của trình duyệt không.  
phiên `walletInstance` có thể không tồn tại nếu bạn chưa đăng nhập vào ứng dụng hướng dẫn của chúng tôi lần nào.  
Nếu không, phiên `walletInstance` sẽ có trong chuỗi JSON string, nếu có, nó sẽ thêm một phiên bản ví vào ví của caver.  
Bạn có thể thêm một phiên bản ví vào caver bằng `cav.klay.tài khoảns.wallet.add(JSON.parse(walletFromSession))`.  
Để biết thêm thông tin về `caver.klay.tài khoảns.wallet.add`, hãy xem [caver.klay.tài khoảns.wallet.add](../../../../references/sdk/caver-js-1.4.1/api/caver.klay.accounts.md#wallet-add)

cf\) Cần có `JSON.parse` vì phiên `walletInstance` được lưu trữ là chuỗi JSON.

## `src/klaytn/caver.js`: <a id="5-src-klaytn-caver-js"></a>

```javascript
/**
 * thư viện caver-js tạo kết nối với nút klaytn.
 * Bạn có thể kết nối với node klaytn cụ thể bằng cách thay đổi giá trị của 'rpcURL'.
 * Nếu bạn đang chạy node đầy đủ klaytn, đặt rpcURL thành URL nút của mình.
 * ex) rpcURL: 'http://localhost:8551'
 */
import Caver from 'caver-js'

export const config = {
  rpcURL: 'https://public-en-baobab.klaytn.net/'
}

export const cav = new Caver(config.rpcURL)

export default cav
```

Thư viện `caver-js` tạo kết nối với nút Klaytn.  
Sau khi tạo kết nối, bạn có thể lấy được số khối hiện tại nhờ nút và gọi các phương pháp hợp đồng.

Bạn có thể kết nối với nút dành riêng cho Klaytn bằng cách chỉ định nó trong 'rpcURL'.

* Nếu bạn đang chạy node đầy đủ Klaytn, bạn có thể đặt rpcURL thành URL nút của mình.

  ví dụ, `rpcURL: 'http://localhost:8551'`  

