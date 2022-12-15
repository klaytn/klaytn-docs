# Klaystagram

## 目次 <a href="#table-of-contents" id="table-of-contents"></a>

* [1. 環境設定](1.-environment-setup.md)
* [2. Clone Klaystagram DApp](2.-clone-klaystagram-dapp.md)
* [3. ディレクトリ構造](3.-directory-structure.md)
* [4. Klaystagramスマートコントラクトを書く](4.-write-klaystagram-smart-contract.md)
* [5. コントラクトを展開](5.-deploy-contract.md)
* [6. フロントエンドコードの概要](6.-frontend-code-overview.md)
* [7. FeedPage](7.-feedpage/)
  * [7-1. Connect Contract to Frontend](7.-feedpage/7-1.-connect-contract-to-frontend.md)
  * [7-2. UploadPhoto Component](7.-feedpage/7-2.-uploadphoto-component.md)
  * [7-3. Feed Component](7.-feedpage/7-3.-feed-component.md)
  * [7-4. TransferOwnership Component](7.-feedpage/7-4.-transferownership-component.md)
* [8. アプリを実行](8.-run-app.md)

## Testing Environment <a href="#testing-environment" id="testing-environment"></a>

Klaystagram DAppは以下の環境でテストされています。

* MacOS Mojave 10.14.5
* ノード 10.16.0 (LTS)
* npm 6.9.0
* Python 2.7.10

## はじめに <a href="#introduction" id="introduction"></a>

[![Klaystagram の紹介ビデオ](../../../bapp/tutorials/klaystagram/images/klaystagram-video-poster.png)](https://vimeo.com/327033594)

このチュートリアルでは、KlaytnベースのNFTフォトライセンスアプリケーションである `Klaystagram`を作成する方法を学びます。 このシンプルなWebアプリケーションには、Solidity、JavaScript、Reactの基本的な知識が必要です。

NFT は、固有の資産を表す特別な種類のトークンであるノンファンジブルトークンを指します。 non-fungible という名前が示すように、すべてのトークンは一意です。 このNFTの独自性は、資産のデジタル化の新たな視野を切り開きます。 たとえば、デジタルアート、ゲームアイテム、またはあらゆる種類のユニークな資産を表現し、人々がそれらを取引できるようにするために使用できます。 詳細については、こちらの [記事](https://coincentral.com/nfts-non-fungible-tokens/) を参照してください。

`Klaystagram`では、すべてのトークンはユーザー固有の画像を表します。 ユーザーが写真をアップロードすると、画像データとその所有権を含む一意のトークンが作成されます。 すべてのトランザクションはブロックチェーンに記録されるため、サービスプロバイダでさえアップロードされた写真を制御できません。 このチュートリアルの目的を考慮して、コア関数のみを実装します。 このチュートリアルを終えたら、もっとクールな機能を追加して、独自のクリエイティブなサービスを作りましょう。

三つの主要な機能があります。

1. **写真のアップロード** ユーザーは、Klaytnブロックチェーンの説明とともに写真をアップロードできます。 写真はトークン化されます。
2. **フィード** ユーザーはブロックチェーンにアップロードされたすべての写真を見ることができます。
3. **所有権の譲渡** 写真の所有者は、写真の所有権を別のユーザーに譲渡することができます。 取引は所有権履歴に表示されます

> **ソースコード**\
  完全なソースコードは GitHub にあります [https://github.com/klaytn/klaystagram](https://github.com/klaytn/klaystagram)

## Intended Audience <a href="#intended-audience" id="intended-audience"></a>

スマートコントラクトと相互作用するWebアプリケーションを構築します。 このチュートリアルを完了するために、観客は次の概念に精通していることが期待されます。

* [React](https://reactjs.org/) と [Redux](https://redux.js.org/) の基本的な知識があると仮定します。 このコースは初心者向けではありません。
* [Solidity](https://solidity.readthedocs.io/en/v0.5.10/) 開発における基本的な知識と経験が推奨される。 しかし、経験豊富なSW開発者は、このチュートリアルのステップバイステップガイドラインに従ってタスクを完了することができます。
* [ERC-721 トークン](http://erc721.org/) に興味のある人。
