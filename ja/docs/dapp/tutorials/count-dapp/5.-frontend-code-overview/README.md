# 5. フロントエンドコードの概要 <a id="5-frontend-code-overview"></a>

1\) `src/index.js` - Entry point of our app  
2\) `static/index.html` - index.html  
3\) `src/routes.js` - Contains route definition  
4\) `src/App.js` - Root component of our app  
5\) `src/klaytn/caver.js` - Makes a connection with a Klaytn node

## 1\) `src/index.js`: <a id="1-src-index-js"></a>

```javascript
import ReactDOM from 'react-dom'

import App from './App'
import renderRoute from './routes'

import './index.scs'

// Render App(root component).
ReactDOM.render(
  renderRoutes(App),
  document.getElementById('root')
)

// hot module replacement.
if (module.hot) {
  module.hot.accept('./App.js', () => {
    const NextApp = require('./App').default
    ReactDOM.render(renderRoutes(NextApp), document.getElementById('root'))
    console.log('Hot module replaced..')
  })
}
```

`'index.js'` はチュートリアルアプリ用のメインの javascript ファイルです。 アプリのエントリポイントです。

与えられた container\('\#root'\' のDOMにReact 要素をレンダリングし、コンポーネントへの参照を返すために、'react-dom' ライブラリを使用します。 要するに、「react-dom」を通じて、チュートリアルアプリのDOMは `<div id="root"></div>` `public/index.html` ファイルに表示されます。

## 2\) `static/index.html`: <a id="2-static-index-html"></a>

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
      You need to enable JavaScript to run this app.
    </noscript>
    <div id="root"></div> <!-- DOM がここに入力されます。 -->
    <!--
      この HTML ファイルはテンプレートです。
      ブラウザで直接開くと、空のページが表示されます。

      このファイルにwebfonts、metaタグ、または解析を追加できます。
      ビルドステップでは、バンドルされたスクリプトが <body> タグに配置されます。

      開発を開始するには、`npm start` または `yarn start` を実行します。
      プロダクションバンドルを作成するには、`npm run build` または `yarn build` を使用します。
    -->
  </body>
</html>
```

`index.html` はチュートリアルアプリをレンダリングするための HTML ファイルです。

詳細については、React の公式サイトを参照してください [https://reactjs.org/docs/react-dom.html\#render](https://reactjs.org/docs/react-dom.html#render)

## 3\) `src/routes.js`: <a id="3-src-routes-js"></a>

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

`'routes.js'` contains the route definition for our tutorial app.  
As a root component, `'App.js'` component renders child components defined in `'route.js'` file.  
By above code, `'Count'` component would be rendered as a children of rootComponent when browser's URL path is `"/"`.

For further information, visit React router github [https://github.com/ReactTraining/react-router/blob/v3.2.1/docs/API.md](https://github.com/ReactTraining/react-router/blob/v3.2.1/docs/API.md)

## 4\) `src/App.js`: <a id="4-src-app-js"></a>

```javascript
import React, { Component } from 'react'

import { cav } from 'klaytn/caver'
import BlockNumber from 'components/BlockNumber'
import Auth from 'components/Auth'

import './App.scss'

class App extends Component {
  componentWillMount() {
    /**
     * sessionStorage is internet browser's feature which stores data
     * until the browser tab is closed.
     */
    const walletFromSession = sessionStorage.getItem('walletInstance')

    // If 'walletInstance' value exists, add it to caver's wallet
    if (walletFromSession) {
      try {
        cav.klay.accounts.wallet.add(JSON.parse(walletFromSession))
      } catch (e) {
        // If value in sessionStorage is invalid wallet instance,
        // remove it from sessionStorage.
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

`'App.js'` はチュートリアルアプリのルートコンポーネントです。

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

It renders `BlockNumber`, `Auth` and `{this.props.children}` component.  
`{this.props.children}` will be populated according to `routes.js` file.  
If your browser's url path is `/`, it will render `<Count />` component.

```javascript
componentWillMount() {
  /**
   * sessionStorage は、ブラウザータブが閉じられるまでデータ
   * を格納するインターネットブラウザーの機能です。
   */
  const walletFromSession = sessionStorage.getItem('walletInstance')

  // If 'walletInstance' value exists, add it to caver's wallet
  if (walletFromSession) {
    try {
      cav.klay.accounts.wallet.add(JSON.parse(walletFromSession))
    } catch (e) {
      // If value in sessionStorage is invalid wallet instance,
      // remove it from sessionStorage.
      sessionStorage.removeItem('walletInstance')
    }
  }
}
```

`componentWillMount` checks if there is a `walletInstance` session in the browser's sessionStorage.  
`walletInstance` session may not exist if you have never logged in our tutorial app.  
Otherwise, `walletInstance` session will exist as a JSON string, if so, it attempts to add the wallet instance to the caver's wallet.  
You can add a wallet instance to caver through `cav.klay.accounts.wallet.add(JSON.parse(walletFromSession))`.  
For further information related `caver.klay.accounts.wallet.add`, see [caver.klay.accounts.wallet.add](../../../sdk/caver-js/v1.4.1/api-references/caver.klay.accounts.md#wallet-add)

cf\) `JSON.parse` は `walletInstance` セッションが JSON 文字列として格納されているため必要です。

## 5\) `src/klaytn/caver.js`: <a id="5-src-klaytn-caver-js"></a>

```javascript
/**
 * caver-js ライブラリは klaytn ノードと接続します。
 * 'rpcURL' の値を変更することで特定の klaytn ノードに接続できます。
 * klaytn フルノードを実行している場合は、rpcURL にノードの URL を設定します。
 * ex) rpcURL: 'http://localhost:8551'
 */
import Caver from 'caver-js'

export const config = {
  rpcURL: 'https://api.baobab.klaytn.net:8651/'
}

export const cav = new Caver(config.rpcURL)

export default cav
```

`caver-js` library makes a connection to a Klaytn node.  
After the connection is made, you can get the current block number from the node and invoke contract methods.

「rpcURL」で特定の Klaytn ノードに接続することができます。

* Klaytnフルノードを実行している場合は、rpcURLをノードのURLに設定できます。

  例えば、 `rpcURL: 'http://localhost:8551'`  

