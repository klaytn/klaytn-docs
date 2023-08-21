# Connecting MetaMask

![](./img/klaytnXmetamask.png)

> **注**: MetaMaskは主にEthereum用のウォレットとして使用されています。 しかし、同一のアドレス構造により、Klaytnと互換性があります。 Klaytnには [Kaikas](../developer-tools/#kaikas)と呼ばれるブラウザ拡張ウォレットもありますので、Remixを除いて基本的にMetaMaskと同じ機能を提供します。

## ステップ1. メタマスクをインストール <a href="#install-metamask" id="install-metamask"></a>

* この例ではChromeブラウザを使用します。 ([**Chrome をインストール**](https://www.google.com/intl/en\_us/chrome/))
*   [**MetaMask 拡張機能**](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) を Chrome に追加します。

    > **注意:** 別のブラウザを使用している場合は、追加インストールが必要になる場合があります。
* メタマスクを起動するには、Chromeブラウザの右上隅にあるアイコンをクリックします。

## ステップ 2. メタマスクウォレットを生成 <a href="#generate-a-metamask" id="generate-a-metamask"></a>

![Create a Wallet](../../bapp/tutorials/img/new-to-metamask.png)

* \format@@0 をクリックします。
* パスワードを設定
*   12語のシードフレーズが与えられます。安全な場所に戻してください。

    > **注意:** シードフレーズでのみウォレットを復元できます。 シードフレーズを他の人と共有すると、あなたのすべての資金が失われる可能性があります。 したがって、手動で書き留めるか、オフラインのデバイスに保存することをお勧めします。

![Seed phrase and Wallet](../../bapp/tutorials/img/metamask-secret-backup.png)

## ステップ3 Klaytn Cypress Network(メインネット)に接続します <a href="#connect-to-klaytn-cypress-network-mainnet" id="connect-to-klaytn-cypress-network-mainnet"></a>

> 簡単な方法があります [Klaytn Cypress Network(メインネット)](https://chainlist.org/chain/8217) にウォレットを接続します。

* デフォルトでEthereum Mainnetにある上部ネットワークタブをクリックし、\format@@0を選択します。
* Klaytn チェーンのエンドポイント ノード (EN) データを入力します。
  * Cypress
    * ネットワーク名: Klaytn Cypress
    * New RPC URL: (Default: [https://public-en-cypress.klaytn.net](https://public-en-cypress.klaytn.net))
    * Block Explorer URL: [https://scope.klaytn.com/](https://scope.klaytn.com/)
    * チェーン ID: 8217
    * 通貨記号: KLY
* \[Save] をクリックして、Klaytn Cypress Networkを追加します。

![Network Setup and Custom RPC](../../bapp/tutorials/img/metamask-add-cypress-1.png) ![Network Setup and Custom RPC](../../bapp/tutorials/img/metamask-add-cypress-2.png)

## ステップ4 KLAYを送る <a href="#send-klay" id="send-klay"></a>

**Note:** The following steps require KLAY.

* メインページの \[Send] をクリックし、受信者のアドレスとKLAYの金額を入力します。

![Send KLAY 1](img/metamask-send-klay-1.png)

**NOTE:** Sending KLAY requires a transaction, for which you need KLAY.

* Klaytn v1.9.0以降、 [動的ガス料金メカニズム](https://medium.com/klaytn/dynamic-gas-fee-pricing-mechanism-1dac83d2689) が既存の固定価格ポリシーを置き換えました。
* したがって、固定ガス料金を手動で設定する必要はありません。
* 送金する金額と手数料を確認し、\[Confirm] をクリックしてKLAY送金を完了します。 その後メインページにリダイレクトされます。
* メインページの \[Activity] をクリックして取引履歴を確認します。

![Send KLAY 2](img/metamask-send-klay-2.png)

## Klaytn Baobab ネットワーク（テストネット）に接続する <a href="#connect-to-klaytn-baobab-network-testnet" id="connect-to-klaytn-baobab-network-testnet"></a>

### KLAYを取得してトランザクションを作成する

> **注意:** このチュートリアルでは、ネットワークに接続するためにTestnet(Baobab)のPublic ENを使用します。 テストを実行しているときは必ずBaobabを使用してください。

> Here's a simple way. [Klaytn Baobab ネットワーク(テストネット)](https://chainlist.org/chain/1001) に財布を接続します。

* Baobab
  * ネットワーク名: Klaytn Baobab
  * New RPC URL: [https://public-en-baobab.klaytn.net](https://public-en-baobab.klaytn.net)
  * Block Explorer URL: [https://baobab.scope.klaytn.com/](https://baobab.scope.klaytn.com/)
  * チェーン ID: 1001
  * Currency Symbol: KLAY
* \[Save] をクリックしてKlaytn Baobab Networkを追加します。

![Network Setup](img/connect-testnet-1.png)

* Klaytn Walletの接続をテストするには、KLAYが必要なトランザクションを作成する必要があります。
* 右上隅のケバブメニュー(3つのドット)をクリックし、\format@@0を選択します。
* 秘密鍵を取得するには、\[Export Private Key]をクリックしてください。

![Export Private Key](img/connect-testnet-2.png)

* Baobab Testnetを使用する場合、 [**Klaytn Faucet**](https://baobab.wallet.klaytn.foundation/access?next=faucet) でTest Klayを入手できます。
* Klaytn Walletの秘密鍵を入力し、\[Access] をクリックしてログインします。 (秘密鍵の前に0xを取り付けます。
* Click \[Run Faucet]. 150 Testnet KLAYがあなたのアカウントに送信され、残高はそれに応じて更新されます。 Testnet KLAYは、アカウントごとに24時間ごとにFaucetから請求することができます。

![Obtain KLAY from Faucet](img/connect-testnet-3.png)

* メタマスクに戻り、受け取ったKLAYを確認してください。

![Check your balance](img/connect-testnet-4.png)