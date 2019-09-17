# Klaystagram

## 목차

* [1. Environment Setup](1.-environment-setup.md)
* [2. Clone Klaystagram BApp](2.-clone-klaystagram-bapp.md)
* [3. Directory Structure](3.-directory-structure.md)
* [4. Write Klaystagram Smart Contract](4.-write-klaystagram-smart-contract.md)
* [5. Deploy Contract](5.-deploy-contract.md)
* [6. Frontend Code Overview](6.-frontend-code-overview.md)
* [7. FeedPage](7.-feedpage/README.md) 
  * [7-1. Connect Contract to Frontend](7.-feedpage/7-1.-connect-contract-to-frontend.md)
  * [7-2. UploadPhoto Component](7.-feedpage/7-2.-uploadphoto-component.md)
  * [7-3. Feed Component](7.-feedpage/7-3.-feed-component.md)
  * [7-4. TransferOwnership Component](7.-feedpage/7-4.-transferownership-component.md)
* [8. Run App](8.-run-app.md)

## 소개

[![Klaystagram Introduction Video](images/klaystagram-video-poster.png)](https://vimeo.com/327033594)

In this tutorial, we will learn how to make `Klaystagram`, a Klaytn-based NFT photo licensing application. This simple web application requires basic knowledge of Solidity, JavaScript and React.

NFT refers to a non-fungible token, which is a special type of token that represents a unique asset. As the name non-fungible implies, every single token is unique. And this uniqueness of NFT opens up new horizons of asset digitization. For example, it can be used to represent digital art, game items, or any kind of unique assets and allow people to trade them. For more information, refer to this [article](https://coincentral.com/nfts-non-fungible-tokens/).

In `Klaystagram`, every token represents users' unique pictures. When a user uploads a photo, a unique token is created containing the image data and its ownership. All transactions are recorded on the blockchain, so even service providers do not have control over the uploaded photos. Considering the purpose of this tutorial, only core functions will be implemented. After finishing this tutorial, try adding some more cool features and make your own creative service.

There are three main features.

1. **Photo upload** Users can upload photos along with descriptions on the Klaytn blockchain. The photos will be tokenized.
2. **Feed** Users can see all the photos uploaded on the blockchain.
3. **Transfer ownership** The owner of the photo can transfer ownership of the photo to another user, and the transaction will be shown in the ownership history.

> **Source Code**  
> Complete source code can be found on GitHub at <https://github.com/underbleu/klaystagram>

## 튜토리얼 대상

다만 스마트 컨트랙트와 상호작용하는 웹 어플리케이션을 구축할 것이기 때문에 다음의 개념들에 대해서 익숙하신 분들께 권장드립니다.

* [React](https://reactjs.org/)와 [Redux](https://redux.js.org/)에 대한 기본 지식이 필요합니다. 이 과정은 초보자를 위한 기본적인 설명이 없습니다.
* Basic knowledge and experience in [Solidity](https://solidity.readthedocs.io/en/v0.5.10/) development are recommended. 만약 솔리디티에 대해 잘 모르시더라도 소프트웨어 개발 경험이 어느정도 있으시다면 튜토리얼의 단계별 가이드라인을 따라 수월하게 완료하실 수 있을거에요.
* Anyone interested in [ERC-721 Tokens](http://erc721.org/).

## 테스트 환경

Klaystagram BApp is tested in the following environment.

* MacOS Mojave 10.14.5
* Node 10.16.0 \(LTS\)
* npm 6.9.0
* Python 2.7.10