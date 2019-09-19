# 5. 프론트엔드 코드 개요

1\) `src/index.js` - 어플리케이션의 엔트리 포인트  
2\) `public/index.html` - index.html  
3\) `src/routes.js` - 라우팅 정의  
4\) `src/App.js` - 어플리케이션의 루트 컴포넌트  
5\) `src/klaytn/caver.js` - Klaytn 노드와의 연결 담당

## 1\) `src/index.js`:

```javascript
import ReactDOM from 'react-dom'

import App from './App'
import renderRoutes from './routes'

import './index.scss'

// App(루트 컴포넌트)를 렌더링합니다.
ReactDOM.render(
  renderRoutes(App),
  document.getElementById('root')
)

// 핫 모듈 리플레이스먼트
if (module.hot) {
  module.hot.accept('./App.js', () => {
    const NextApp = require('./App').default
    ReactDOM.render(renderRoutes(NextApp), document.getElementById('root'))
    console.log('Hot module replaced..')
  })
}
```

`'index.js'`가 튜토리얼 어플리케이션의 메인 자바스크립트 파일이며, 어플리케이션의 엔트리 포인트입니다.

'react-dom' 라이브러리를 사용하여 컨테이너('\#root'\)에서 리액트의 구성 요소들을 DOM으로 렌더링하고 해당 컴포넌트에 대한 참조를 반환합니다. 즉 'react-dom'을 통해 튜토리얼 어플리케이션의 DOM을 `public/index.html` 파일의 `<div id="root"></div>`로 채우게 됩니다.

## 2\) `public/index.html`:

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
    <div id="root"></div> <!-- DOM will be populated into here. -->
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    -->
  </body>
</html>
```

`index.html`은 튜토리얼 어플리케이션을 렌더링하기 위한 HTML 파일입니다.

자세한 내용은 리액트 공식 사이트를 참고해주세요. [https://reactjs.org/docs/react-dom.html\#render](https://reactjs.org/docs/react-dom.html#render)

## 3\) `src/routes.js`:

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

`'routes.js'`는 본 튜토리얼 어플리케이션의 라우팅 정의를 담고 있습니다.  
루트 컴포넌트 `'App.js'`는 `'route.js'` 파일에 정의된 하위 컴포넌트들을 렌더링합니다.  
위 코드에서 브라우저의 URL 경로가 `"/"`이면 `'Count'` 컴포넌트가 rootComponent의 하위로 렌더링됩니다.

자세한 내용은 리액트 라우터의 github를 참고해주세요. <https://github.com/ReactTraining/react-router/blob/v3.2.1/docs/API.md>

## 4\) `src/App.js`:

```javascript
import React, { Component } from 'react'

import { cav } from 'klaytn/caver'
import BlockNumber from 'components/BlockNumber'
import Auth from 'components/Auth'

import './App.scss'

class App extends Component {
  componentWillMount() {
    /**
     * sessionStorage는 브라우저 탭이 닫히기 전까지 데이터를 저장하는 인터넷 브라우저의 기능입니다.
     */
    const walletFromSession = sessionStorage.getItem('walletInstance')

    // 'walletInstance'에 값이 있으면 caver 지갑에 추가합니다.
    if (walletFromSession) {
      try {
        cav.klay.accounts.wallet.add(JSON.parse(walletFromSession))
      } catch (e) {
        // sessionStorage에 있는 값이 유효하지 않은 지갑 인스턴스이면 sessionStorage에서 제거합니다.
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

`'App.js'`는 본 튜토리얼 어플리케이션의 루트 컴포넌트입니다.

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

이 루트 컴포넌트는 `BlockNumber`, `Auth`, `{this.props.children}` 컴포넌트들을 렌더링합니다.  
`{this.props.children}` 부분은 `routes.js` 파일에 따라 채워집니다.  
이때 브라우저의 URL 경로가 `/`이면 `<Count />` 컴포넌트를 렌더링합니다.

```javascript
componentWillMount() {
  /**
   * sessionStorage는 브라우저 탭이 닫히기 전까지 데이터를 저장하는 인터넷 브라우저의 기능입니다.
   */
  const walletFromSession = sessionStorage.getItem('walletInstance')

  // 'walletInstance'에 값이 있으면 caver 지갑에 추가합니다.
  if (walletFromSession) {
    try {
      cav.klay.accounts.wallet.add(JSON.parse(walletFromSession))
    } catch (e) {
      // sessionStorage에 있는 값이 유효하지 않은 지갑 인스턴스이면 sessionStorage에서 제거합니다.
      sessionStorage.removeItem('walletInstance')
    }
  }
}
```

`componentWillMount`는 브라우저의 sessionStorage에 `walletInstance` 세션이 있는지 확인합니다.  
튜토리얼 어플리케이션에 로그인한 적이 없다면 `walletInstance` 세션이 없겠죠?  
로그인을 했었다면 `walletInstance` 세션이 JSON 문자열로 존재하고 이 지갑 인스턴스를 caver 지갑에 추가할 것입니다.  
또는 `cav.klay.accounts.wallet.add(JSON.parse(walletFromSession))`을 사용하여 지갑 인스턴스를 caver 지갑에 추가할 수도 있습니다.  
`caver.klay.accounts.wallet.add`에 대한 자세한 내용은 [caver.klay.accounts.wallet.add](https://docs.klaytn.com/sdk/caverjs/caver.klay.accounts#wallet-add)를 참고해주세요.

참고\) `walletInstance` 세션이 JSON 문자열로 저장되기 때문에 `JSON.parse`가 필요합니다.

## 5\) `src/klaytn/caver.js`:

```javascript
/**
 * caver-js 라이브러리는 Klaytn 노드에 연결하게 해줍니다.
 * 'rpcURL' 값을 변경하여 특정 Klaytn 노드에 연결할 수 있습니다.
 * Klaytn 풀노드를 운용중이라면 rpcURL을 운용중인 풀노드의 URL로 설정하세요.
 * 예시) rpcURL: 'http://localhost:8551'
 * 기본으로 설정된 rpcURL은 'https://api.baobab.klaytn.net:8651/'입니다.
 */
import Caver from 'caver-js'

export const config = {
  rpcURL: 'https://api.baobab.klaytn.net:8651/'
}

export const cav = new Caver(config.rpcURL)

export default cav
```

`caver-js` 라이브러리가 Klaytn 노드에 연결하게 해줍니다.  
연결이 완료되면 노드로부터 현재 블록 번호를 가져와 컨트랙트 메서드를 호출할 수 있습니다.

'rpcURL'에 특정 Klaytn 노드를 지정하여 연결할 수 있습니다.

* Klaytn 풀노드를 운용중이라면 rpcURL을 운용중인 풀노드의 URL로 설정하세요.
    
    예를 들어, `rpcURL: 'http://localhost:8551'` 이렇게요.

* rpcURL을 변경하지 않는 경우 기본 설정값은 `'https://api.baobab.klaytn.net:8651'`입니다.