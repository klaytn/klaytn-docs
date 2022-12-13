# FAQ <a id="faq"></a>

- [Klaytnとは？](#what-is-klaytn)
- [Klaytn 2.0とは?](#what-is-klaytn-2.0)
- [KlaytnはEthereumと同等のものをどのようにサポートしていますか?](#how-ethereum-equivalence)
- [Klaytnのガスポリシーとは何ですか？](#klaytn-gas-policy)
- [Klaytnのアカウント構造の特別な点は何ですか？](#klaytn-account-structure)
- [KlaytnからdApp開発を開始するには?](#dapp-development)
- [Klaytn はオープンソースですか?](#is-klaytn-open-source)
- [アカウントに入金するにはどうすればいいですか?](#fund-my-acconut)
- [テストと開発のためのKlaytnの公共ノードプロバイダーはありますか？](#node-providers)
- [KLAYテストを受けるための蛇口はありますか?](#are-there-faucets)
- [Public RPCのエンドポイントステータスを確認するにはどうすればいいですか?](#rpc-endpoint-status)
- [どのウォレットがKlaytnに対応していますか？](#which-wallets)
- [ヒノキとは何か、バオバブとは何か?](#what-is-cypress-what-is-baobab)
- [Klaytn SDK はありますか? どの言語で？](#klaytn-sdks)
- [Klaytn を使用するには、EN (エンドポイント ノード) をインストールして実行する必要がありますか?](#must-i-install-and-run-en)
- [ENを実行しています。ノードデータの同期が遅すぎます。](#node-data-sync-is-too-slow)
- [KlaytnでERC-20とERC-721契約を使用できますか?](#can-i-use-erc-20-and-erc-721)
- [TruffleはKlaytnのスマートコントラクト開発に使用できますか?](#can-i-use-truffle)
- [Metamaskのようなブラウザ拡張ウォレットはどこで入手できますか?](#where-can-i-get-a-browser-extension-wallet)
- [手数料支払い者のアカウントアドレスは、提供されたキーから取得されていないのはなぜですか?](#account-address-is-not-derived-from-the-key)
- [手数料委任の完全な作業サンプルはどこで見つけることができますか?](#fee-delegation-samples)


## Klaytnとは？ <a id="what-is-klaytn"></a>
Klaytnは、低遅延、高TPS、即時の最終性を備えたレイヤ1ブロックチェーンプラットフォームです。 これは、ゲームを構築し、 [メタバース](https://docs.klaytn.foundation/klaytn2/metaverse-package)を実現するための最適なブロックチェーンです。


## Klaytn 2.0とは? <a id="what-is-klaytn-2.0"></a>
Klaytn 2.0は、ブロックチェーン構築体験を促進するために、Ethereum Equivalenceと包括的なMetaverseパッケージをサポートし、メタバーに焦点を当てるようKlaytnの移行をマークします。 Klaytn 2.0 をよりよく理解するには、私たちの [ライトペーパー](https://klaytn.foundation/wp-content/uploads/Lightpaper.pdf) を参照してください。


## KlaytnはEthereumと同等のものをどのようにサポートしていますか? <a id="how-ethereum-equivalence"></a>
KlaytnはEVM互換で、すべてのEthereum London EVM機能をサポートしています。 私たちの `eth` 名前空間は、Ethereumと互換性があるように改められています。 Ethereumツールはシームレスに使用でき、EthereumのdAppsの移行も最小限の労力で可能になりました。 トランザクションの種類とフィールドもEthereumのものと同等です。


## Klaytnのガスポリシーとは何ですか？ <a id="klaytn-gas-policy"></a>
Klaytnは、裁定ボットと戦うために動的なガス料金メカニズムを採用するために、一定のガス料金ポリシーから移行しました。 詳細については、こちらの [記事](https://medium.com/klaytn/dynamic-gas-fee-pricing-mechanism-1dac83d2689) を参照してください。


## Klaytnのアカウント構造の特別な点は何ですか？ <a id="klaytn-account-structure"></a>
To provide maximum convenience for dApp developers, Klaytn has devised a way to [decouple private keys from addresses](https://klaytn-tech.medium.com/klaytn-usability-improvement-series-1-separating-keys-and-addresses-dd5e367a0744). その結果、 [multig](https://medium.com/klaytn/klaytn-usability-improvement-series-2-introducing-multisig-on-the-platform-level-85141893db01)を簡単に実装できます。 1つのアカウントに複数の秘密鍵を作成し、それぞれの鍵には異なる重みがあります。 各キーは、 [個の異なる役割](https://medium.com/klaytn/klaytn-usability-improvement-series-4-supporting-role-based-keys-on-the-platform-level-e2c912672b7b) で割り当てることができます。


## KlaytnからdApp開発を開始するには? <a id="dapp-development"></a>
Ethereumから移行する場合でも、Klaytnをゼロから構築する場合でも、必要なすべてのツールとインフラストラクチャをサポートしています。 スマートコントラクトは [Remix IDE](https://docs.klaytn.foundation/dapp/tutorials/connecting-remix) で Klaytn プラグインを使用するか、 [MetaMask](https://docs.klaytn.foundation/dapp/tutorials/connecting-metamask) ウォレットと [Kaikas](https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi) に接続することができます。 Klaytnのsdk `caver` は [caver-js](https://github.com/klaytn/caver-js) として利用できます。Klaytn で dApp を構築するには、 [チュートリアル](https://docs.klaytn.foundation/dapp/tutorials) を参照してください。


## Klaytn はオープンソースですか? <a id="is-klaytn-open-source"></a>
Klaytnは間違いなくオープンソースです！ [Github Organisation](https://github.com/klaytn) をご覧いただければ、Klaytn Documentationに [貢献](https://github.com/klaytn/klaytn-docs/blob/master/CONTRIBUTING.md) することができます。 オープンソースポリシーの詳細はこちら [](https://docs.klaytn.foundation/misc/opensource) をご覧ください。


## アカウントに入金するにはどうすればいいですか? <a id="fund-my-acconut"></a>
交換でKLAYを購入することができます。 利用可能な取引所のリストはここにあります: [Coinmarketcap](https://coinmarketcap.com/currencies/klaytn/markets/) または [Coingecko](https://www.coingecko.com/en/coins/klay#markets)


## テストと開発のためのKlaytnの公共ノードプロバイダーはありますか？ <a id="node-providers"></a>
Klaytnのパブリックノードプロバイダーとネットワークドメインについては、こちらの [リスト](https://docs.klaytn.foundation/dapp/json-rpc/public-en#public-json-rpc-endpoint-providers) を参照してください。


## KLAYテストを受けるための蛇口はありますか? <a id="are-there-faucets"></a>
開発とテストの目的のためにKLAYテストを受けることができます: [Klay Faucet](https://baobab.wallet.klaytn.foundation/faucet) [AllThatNode Faucet](https://www.allthatnode.com/faucet/klaytn.dsrv)


## Public RPCのエンドポイントステータスを確認するにはどうすればいいですか? <a id="rpc-endpoint-status"></a>
エンドポイントの稼働時間と安定性を保証することはできませんので、ノードプロバイダの状態を [こちら](https://www.allthatnode.com/klaytn.dsrv) でいつでも確認できます。


## どのウォレットがKlaytnに対応していますか？ <a id="which-wallets"></a>
KlaytnはコールドウォレットD'centだけでなく、Kaikas、MetaMaskなどの多数のホットウォレットでサポートされています。 リストはこちら [](http://klaytn.foundation/ecosystem)をご覧ください。


## ヒノキとは何か、バオバブとは何か? <a id="what-is-cypress-what-is-baobab"></a>

ヒノキはKlaytnメインネットで、バオバブはテストネットです。 以下は、各ネットワークに関する情報です。

ヒノキ主電源:
- ENダウンロード : [ダウンロードページ](../node/endpoint-node/installation-guide/download.md)から、サイプレスパッケージを選択します。
- Klaytnscope : https://scope.klaytn.com
- Klaytn Wallet: https://wallet.klaytn.com

Baobab testnet:
- ENダウンロード : [ダウンロードページ](../node/endpoint-node/installation-guide/download.md)からBaobabパッケージを選択します。
- Klaytnscope : https://baobab.scope.klaytn.com
- Klaytn Wallet: https://baobab.wallet.klaytn.found
- Baobab Faucet : https://baobab.wallet.klaytn.foundation/faucet


## Klaytn SDK はありますか? どの言語で？ <a id="klaytn-sdks"></a>

JavaScriptとJavaで公式のKlaytn SDKが提供されています。 [caver-js](../dapp/sdk/caver-js/README.md) と [caver-Java](../dapp/sdk/caver-java/README.md) を参照してください。 コミュニティの貢献は、他の言語で [Klaytn API](../dapp/json-rpc/README.md) を提供することで常に歓迎されます。

Klaytn SDK を使用して dApps をビルドする方法については、 [チュートリアル](../dapp/tutorials/README.md) を参照してください。

また、web3.js [と](../dapp/sdk/caver-js/v1.4.1/porting-from-web3.js.md) web3j [から移植ガイドライン](../dapp/sdk/caver-java/v1.4.0/porting-from-web3j.md) を確認してください。 caver-jsとcaver-javaの構文はweb3.jsやweb3jと非常に似ているため、portingは最小限で非常に簡単でなければなりません。 しかし、いいえ、web3.jsやweb3jを使用して、Klaytnに対するリクエストを行うことはできません。


## Klaytn を使用するには、EN (エンドポイント ノード) をインストールして実行する必要がありますか? <a id="must-i-install-and-run-en"></a>

はい、いいえ。 エンドポイントノードはブロックを検証し、RPCAPIを外部世界に公開します。 アプリケーションがKlaytnネットワークと相互作用するためには、常にENが必要です。 単純に Klaytn API を試してみたい方は、 [KAS (Klaytn API Service)](https://www.klaytnapi.com) を試してみてください。 KASはKlaytn Node APIサービスを提供しており、Klaytnネットワーク(バオバブとサイプレスの両方)のRPCAPIやその他の便利なAPIサービスを公開しています。 KASは、ユーザー登録後に無料のAPIリクエストを提供することに注意してください。 料金プランについては、 [KAS価格ページ](https://www.klaytnapi.com/landing/pricing) をご覧ください。


## ENを実行しています。ノードデータの同期が遅すぎます。 <a id="node-data-sync-is-too-slow"></a>

まず、あなたのHW仕様が [システム要件](../node/endpoint-node/system-requirements.md)を満たしているかどうかを確認してください。

[高速同期](../node/endpoint-node/installation-guide/configuration.md#fast-sync-optional)を確認してください。 Klaytnは毎日チェーンデータを公開しています。 チェーンデータは、ジェネシスから生成されたすべてのブロックを保存するデータベーススナップショットです。 高速同期のために最新のチェーンデータをダウンロードします。


## KlaytnでERC-20とERC-721契約を使用できますか? <a id="can-i-use-erc-20-and-erc-721"></a>

はい Klaytnはスマートコントラクト言語としてSolidityをサポートしています。 [ERC-20](../smart-contract/sample-contracts/erc-20/README.md) と [Ethereum用にSolidityで書かれたERC-721](../smart-contract/sample-contracts/erc-721/README.md) をKlaytnで展開して実行することができます。

さらにKlaytn固有のトークン標準を定義することができます。 [KIP (Klaytn Improvement Proposal)](http://kips.klaytn.foundation) に従い、ディスカッションに参加します。


## TruffleはKlaytnのスマートコントラクト開発に使用できますか? <a id="can-i-use-truffle"></a>

はい Truffleは、 [truffle-hdwallet-provider-klaytn](https://www.npmjs.com/package/truffle-hdwallet-provider-klaytn) を使用して、Klaytn でスマートコントラクトを開発する際に使用できます。 [Truffle](../toolkit/truffle.md) を参照し、設定ガイドラインに従ってください。

Truffleを初めて使用する場合 Truffleで何ができるかについては、 [Testing Guide](../smart-contract/testing-guide.md) と [Deployment Guide](../smart-contract/deploy-guide.md) を参照してください。


## Metamaskのようなブラウザ拡張ウォレットはどこで入手できますか? <a id="where-can-i-get-a-browser-extension-wallet"></a>

Klaytn web brower extension wallet [Kaikas](https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi?hl=en). Kaikasは管理外のウォレットで、KLAY取引を行い、アカウントを作成することができます。



## 手数料支払い者のアカウントアドレスは、提供されたキーから取得されていないのはなぜですか? <a id="account-address-is-not-derived-from-the-key"></a>

Klaytn [では、アカウントアドレスをキーペア](../klaytn/design/accounts.md#decoupling-key-pairs-from-addresses) から切り離すことができます。

一般的な使用例は以下のとおりです。
- アカウントの所有者は、セキュリティ上の理由からキーを変更したいと考えています。
- 口座には重み付きマルチシグまたはロールベースの鍵があり、複数の鍵ペアでアカウントを制御できます。

手数料支払い口座には通常、 [ロールベースのキー](../klaytn/design/accounts.md#accountkeyrolebased) があります。 ほとんどの場合、アカウントアドレスは RoleFeePayer キーから取得されていません。


## 手数料委任の完全な作業サンプルはどこで見つけることができますか? <a id="fee-delegation-samples"></a>

値転送の完全な動作コードを取得するには、 [手数料委任例](../dapp/tutorials/fee-delegation-example.md) をチェックしてください。

手数料委任を含むコントラクトをデプロイするには、 [JavaScriptコードスニペット](https://gist.github.com/w3kim/64a3cf5da58250474f046d4dd7f85cc8) を参照してください。 手数料委任を伴うコントラクト展開に Truffle を使用することはできません。

[複数の署名者によるトランザクションの送信](../dapp/sdk/caver-js/v1.4.1/getting-started_1.4.1.md#sending-a-transaction-with-multiple-signer) は署名の収集方法について2つの異なる方法について良い説明を与える。 関連するcaver-js APIは以下の通りです。 APIの説明のコード例を見てみましょう。
- [caver.klay.accounts.signTransaction](../dapp/sdk/caver-js/v1.4.1/api-references/caver.klay.accounts.md#signtransaction)
- [caver.klay.accounts.feePayerSignTransaction](../dapp/sdk/caver-js/v1.4.1/api-references/caver.klay.accounts.md#feepayersigntransaction)
- [caver.klay.accounts.combinesignatures](../dapp/sdk/caver-js/v1.4.1/api-references/caver.klay.accounts.md#combinesignatures)
- [caver.klay.sendSignedTransaction](../dapp/sdk/caver-js/v1.4.1/api-references/caver.klay/transaction.md#sendsignedtransaction)
