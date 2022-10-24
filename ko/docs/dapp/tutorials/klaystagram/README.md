# Klaystagram <a id="klaystagram"></a>

## 목차 <a id="table-of-contents"></a>

* [1. 개발 환경 구성](1.-environment-setup.md)
* [2. Klaystagram BApp 복제](2.-clone-klaystagram-bapp.md)
* [3. 디렉토리 구조](3.-directory-structure.md)
* [4. Klaystagram 스마트 컨트랙트 작성](4.-write-klaystagram-smart-contract.md)
* [5. 스마트 컨트랙트 배포](5.-deploy-contract.md)
* [6. 프론트엔드 코드 개요](6.-frontend-code-overview.md)
* [7. FeedPage](7.-feedpage/README.md)
  * [7-1. 스마트 컨트랙트를 프론트엔드에 연결](7.-feedpage/7-1.-connect-contract-to-frontend.md)
  * [7-2. UploadPhoto 컴포넌트](7.-feedpage/7-2.-uploadphoto-component.md)
  * [7-3. Feed 컴포넌트](7.-feedpage/7-3.-feed-component.md)
  * [7-4. TransferOwnership 컴포넌트](7.-feedpage/7-4.-transferownership-component.md)
* [8. 어플리케이션 실행](8.-run-app.md)

## 테스트 환경 <a id="testing-environment"></a>

Klaystagram BApp is tested in the following environment.

* MacOS Mojave 10.14.5
* Node 10.16.0 \(LTS\)
* npm 6.9.0
* Python 2.7.10

## 소개 <a id="introduction"></a>

[![Klaystagram 소개 영상](images/klaystagram-video-poster.png)](https://vimeo.com/327033594)

In this tutorial, we will learn how to make `Klaystagram`, a Klaytn-based NFT photo licensing application. This simple web application requires basic knowledge of Solidity, JavaScript and React.

NFT refers to a non-fungible token, which is a special type of token that represents a unique asset. As the name non-fungible implies, every single token is unique. And this uniqueness of NFT opens up new horizons of asset digitization. 예를 들어 NFT는 디지털 예술, 게임 아이템, 또는 모든 종류의 고유한 자산을 나타내고, 사람들 사이에서 이들이 거래되도록 하는 데에 사용될 수 있습니다. For more information, refer to this [article](https://coincentral.com/nfts-non-fungible-tokens/).

In `Klaystagram`, every token represents users' unique pictures. When a user uploads a photo, a unique token is created containing the image data and its ownership. All transactions are recorded on the blockchain, so even service providers do not have control over the uploaded photos. Considering the purpose of this tutorial, only core functions will be implemented. After finishing this tutorial, try adding some more cool features and make your own creative service.

There are three main features.

1. **Photo upload** 사용자는 설명이 첨부된 사진을 Klaytn 블록체인에 업로드할 수 있습니다. 업로드된 사진들은 토큰화됩니다.
2. **Feed** 사용자는 블록체인에 업로드된 모든 사진을 볼 수 있습니다.
3. **Transfer ownership** 사진에 대한 소유권은 다른 사람에게 양도될 수 있고, 이러한 소유권 양도 기록은 트랜잭션을 통해 확인할 수 있습니다.

> **Source Code**  
> Complete source code can be found on GitHub at [https://github.com/klaytn/klaystagram](https://github.com/klaytn/klaystagram)

## 튜토리얼 대상 <a id="intended-audience"></a>

다만 스마트 컨트랙트와 상호작용하는 웹 애플리케이션을 구축할 것이기 때문에 다음의 개념들에 대해서 익숙하신 분들께 권장드립니다.

* 본 튜토리얼은 [React](https://reactjs.org/)와 [Redux](https://redux.js.org/)에 대한 기본 지식이 있다고 가정하고 진행합니다. 이 과정은 초보자를 위한 기본적인 설명이 없습니다.
* Basic knowledge and experience in [Solidity](https://solidity.readthedocs.io/en/v0.5.10/) development are recommended. 만약 솔리디티에 대해 잘 모르시더라도 소프트웨어 개발 경험이 어느 정도 있으시다면 튜토리얼의 단계별 가이드라인을 따라 수월하게 완료하실 수 있을 것입니다.
* Anyone interested in [ERC-721 Tokens](http://erc721.org/).

