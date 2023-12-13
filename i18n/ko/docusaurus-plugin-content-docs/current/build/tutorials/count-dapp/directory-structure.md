# 디렉터리 구조

```
|-- contracts
|-- migrations
|-- truffle-config.js
|-- static  
|-- src  
    |-- styles
    |-- klaytn
      |-- caver.js
    |-- components
      |-- BlockNumber.js
      |-- Auth.js
      |-- Count.js
    |-- index.js
    |-- App.js
    |-- routes.js
```

`contracts/`: 스마트 컨트랙트의 Solidity 소스 파일을 포함합니다.  

`migrations/`: 스마트 컨트랙트 배포를 처리하는 JavaScript 파일을 포함합니다.

`Truffle-config.js`: Truffle 구성 파일입니다.

`static/`: 이미지와 같은 정적 파일을 포함합니다.

`src/styles`: CSS 정의 파일.  

`src/index.js`: 튜토리얼 앱의 인덱스 파일입니다. ReactDOM.render 로직은 여기에 있습니다.  

`src/App.js`: 튜토리얼 앱의 루트 컴포넌트 파일입니다.  

`src/routes.js`: 경로 정의를 포함합니다.  

`src/components`: 프론트엔드 컴포넌트 파일을 포함합니다.  

* `src/components/BlockNumber.js`: 현재 블록 번호를 표시합니다.  

* `src/components/Auth.js`: 개인 키 또는 비밀번호가 포함된 키 저장소를 사용하여 사용자 로그인을 처리합니다.

* `src/components/Count.js`: 배포된 Count 컨트랙트와의 상호작용을 처리합니다. caver.js를 사용하여 컨트랙트 함수를 호출합니다.  

`src/klaytn`: 클레이튼과의 상호작용을 지원하는 파일들이 들어있습니다.

* `src/klaytn/caver.js`: caver-js를 인스턴스화합니다. caver-js는 클레이튼 노드에 연결하고 노드 또는 클레이튼에 배포된 스마트 컨트랙트와 상호작용할 수 있도록 도와주는 JavaScript RPC 호출 라이브러리입니다.