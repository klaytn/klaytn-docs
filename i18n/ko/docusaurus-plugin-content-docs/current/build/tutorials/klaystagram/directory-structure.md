# 디렉터리 구조

```text
|-- contracts
|-- migrations
|-- truffle.js
|-- static
|-- src
    |-- klaytn
      |-- caver.js
      |-- KlaystagramContract.js
    |-- redux
    |-- pages
      |-- AuthPage.js
      |-- FeedPage.js
    |-- components
      |-- UploadPhoto.js
      |-- Feed.js
      |-- TransferOwnership.js
      |-- ...
    |-- styles
    |-- utils
    |-- index.js
    |-- App.js
```

`contracts/`: Solidity 컨트랙트 파일을 포함합니다.

`migrations/`: 스마트 컨트랙트 배포를 처리하는 JavaScript 파일을 포함합니다.

`truffle.js`: Truffle 구성을 포함합니다.

`static/`: 이미지 및 글꼴과 같은 정적 파일을 포함합니다.

`src/index.js`: 앱의 인덱스 파일. ReactDOM.render 로직이 여기에 있습니다.

`src/App.js`: 앱의 루트 컴포넌트 파일.

`src/styles`: 스타일시트와 관련된 전반적인 스타일 정의입니다.

`src/redux`: 컨트랙트와 상호작용하고 결과 데이터를 추적하는 API 함수를 생성합니다.

`src/klaytn`: 클레이튼과의 상호작용을 지원하는 파일들이 들어 있습니다.

- `src/klaytn/caver.js`: 설정된 설정 내에서 caver-js를 인스턴스화합니다.

  (참조) caver-js는 클레이튼 노드에 연결하고, 클레이튼에 배포된 노드 및 스마트 컨트랙트와 상호작용하는 RPC 호출 라이브러리입니다.

- `src/klaytn/Klaystagram.js`: caver-js API를 사용하여 컨트랙트 인스턴스를 생성합니다. 인스턴스를 통해 컨트랙트와 상호작용할 수 있습니다.

`src/pages`: Klaystagram 앱을 구성하는 두 개의 페이지 파일을 포함합니다.

- `src/pages/AuthPage.js`: 가입 및 로그인 양식을 포함합니다. 가입 양식에서 개인키를 생성하여 앱에서 로그인할 때 사용할 수 있습니다.

- `src/pages/FeedPage.js`: 컨트랙트에서 사진 데이터를 읽어와 사용자에게 보여줍니다. 또한 사용자는 FeedPage에서 자신의 사진을 업로드할 수 있습니다.

`src/components`: 페이지를 구성하는 컴포넌트 파일을 포함합니다.

- `src/components/Feed.js`: 컨트랙트에서 데이터를 읽고 사진을 표시합니다.

- `src/components/UploadPhoto.js`: 컨트랙트에 트랜잭션을 전송하여 사진을 업로드합니다.

- `src/components/TransferOwnership.js`: 트랜잭션을 전송하여 사진의 소유권을 이전합니다.
