# Count DApp

## 目次 <a href="#table-of-contents" id="table-of-contents"></a>

* [1. 環境設定](1.-environment-setup.md)
* [2. クローン数 DApp](2.-clone-count-dapp.md)
* [3. ディレクトリ構造](3.-directory-structure.md)
* [4. スマートコントラクトを書く](4.-write-smart-contract.md)
* [5. フロントエンドコードの概要](5.-frontend-code-overview/)
  * [5-1. ブロック番号コンポーネント](5.-frontend-code-overview/5-1.-blocknumber-component.md)
  * [5-2. Auth Component](5.-frontend-code-overview/5-2.-auth-component.md)
  * [5-3. Count Component](5.-frontend-code-overview/5-3.-count-component.md)
* [6. コントラクトを展開](6.-deploy-contract.md)
* [7. アプリを実行](7.-run-app.md)

## Testing Environment <a href="#testing-environment" id="testing-environment"></a>

CountDAppは以下の環境でテストされています。

* MacOS Mojave 10.14.5
* ノード 10.16.0 (LTS)
* npm 6.9.0
* Python 2.7.10

## はじめに <a href="#introduction" id="introduction"></a>

![intro](../../../bapp/tutorials/count-bapp/images/tutorial-1intro.gif)

このチュートリアルは、Klaytn dAppを構築するためのステップバイステップガイドを提供することを意図しています。 No previous Klaytn experience is needed. We will make a simple web app interacting with a basic smart contract, `Count`.\
Any user who has a Klaytn account can increase and decrease the current value as shown in the above gif.

> **ソースコード**\
  完全なソースコードは GitHub にあります [https://github.com/klaytn/countbapp](https://github.com/klaytn/countbapp)

## Intended Audience <a href="#intended-audience" id="intended-audience"></a>

Klaytnでブロックチェーンアプリケーションを構築する方法を学びたい人。 スマートコントラクトと相互作用するWebアプリケーションを構築します。 このチュートリアルを完了するために、観客は次の概念に精通していることが期待されます。

* [React](https://reactjs.org/) と [Redux](https://redux.js.org/) の基本的な知識があると仮定します。 このコースは初心者向けではありません。
* Solidity開発における基礎知識と経験が推奨されます。 しかし、経験豊富なSW開発者は、このチュートリアルのステップバイステップガイドラインに従ってタスクを完了することができます。
