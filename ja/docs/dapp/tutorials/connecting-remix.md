# Connecting Remix

![](./img//klaytnXremix.png)

## リミックスとは <a href="#what-is-remix" id="what-is-remix"></a>

Remix is a browser-based IDE (Integrated Development Environment) for developing Solidity contracts. This document will cover connecting Remix with Klaytn. If you want to know more about how to use Remix, please refer to[ **Remix docs**](https://remix-ide.readthedocs.io/en/latest/) or [**Remix IDE**](https://remix.ethereum.org/).

## EVMバージョンのセットアップ <a href="#setup-evm-version" id="setup-evm-version"></a>

Klaytn supports contracts written in Solidity, and is compatible with the **London** version of EVM. Also, Solidity version 0.8.x and lower are supported in Klaytn. Therefore, to deploy the contract on Klaytn, the contract must be compiled with the **London** EVM version.

* **solidity compiler**をクリックし、'Advanced Configurations' で **London** EVMバージョンを選択します。

![Solidity Complier](img/remix-solidity-compiler.png)

## ローカルプラグインに接続 <a href="#connect-to-a-local-plugin" id="connect-to-a-local-plugin"></a>

You need a local plugin to connect to the Klaytn network using Remix. The process is described in the following:

* **プラグインマネージャー**をクリックし、 **ローカル プラグインに接続** をクリックします。

![Plugin](../../bapp/tutorials/img/remix-environment-plugin.png)

* https://klaytn-remix-plugin.ozys.net を **URL** に入れてください。 **プラグイン名** と **表示名** で、任意の名前を使用します。

![Local Plugin](../../bapp/tutorials/img/remix-local-plugin.png)

* \[Klaytn] タブが表示されたら、Klaytnと対話する準備ができます。

## 配備環境の設定 <a href="#setting-up-the-deployment-environment" id="setting-up-the-deployment-environment"></a>

* \[Klaytn] タブをクリックします。
* 適切な \[Environment] を選択します。
* You can select **Baobab**, **Cypress**, **Injected Caver**, **Caver Provider** or **Injected Web3**.
  * **\[Baobab]**: Baobabネットワークに接続
  * **\[Cypress]**: サイプレスネットワークに接続
  * **\[Injected Caver]**: 注入された洞窟に接続します(例: Kaikas)
  * **\[Caver Provider]**: RPCをサポートするKlaytnノードに直接接続します。
  * **\[Injected Web3]**: 注入されたWeb3に接続します(例 Metamask)

![Klaytn Tab](../../bapp/tutorials/img/remix-klaytn-tab.png)

## アカウントをインポート <a href="#import-account" id="import-account"></a>

* **秘密キー** または **キーストア** からキーをインポートできます。
* **アカウント** の横にある **+**ボタンをクリックします。

![Import Keys](../../bapp/tutorials/img/remix-klaytn-import-account.png)

* 秘密鍵またはキーストアを入れてください。
* **feePayer** のキーをインポートすることもできます。 **秘密キー** のみをサポートします。

## 接続Klaytn - EN (エンドポイント ノード) を使用してリミックス <a href="#connecting-klaytn-remix-using-en" id="connecting-klaytn-remix-using-en"></a>

* [**ENドキュメント**](https://docs.klaytn.foundation/getting-started/quick-start/launch-an-en) の指示に従って、ローカル環境でエンドポイントノードを設定します。
*   [**アカウント管理**](https://docs.klaytn.foundation/getting-started/account) の手順に従ってアカウントを作成します。

    > **注意:** BaobabからPublic ENを使用する場合は、ローカル環境ではなく、使用する場合。 個人用APIが無効になっているため、アカウントに接続されません。
* 環境メニューから \[Caver Provider] を選択します。

![Caver Provider](img/env-caver-provider.png)

* Caver Provider EndpointにENのRPCアドレスを入力します。 ローカル EN (デフォルト): [http://localhost:8551](http://localhost:8551/)
* ネットワークに正常に接続すると、接続されているネットワークのチェーンIDとアカウントが表示されます。

## Connecting Klaytn - MetaMask を使ってリミックスする <a href="#connecting-klaytn-remix-using-metamask" id="connecting-klaytn-remix-using-metamask"></a>

* [**MetaMask への接続**](https://docs.klaytn.foundation/dapp/tutorials/connecting-metamask) を参照して、Klaytn と MetaMask を接続します。
* Remix Environment メニューから \[Injected Web3] を選択します。

![Injected Web3](img/env-injected-web3.png)

* MetaMask ポップアップが表示されたら、そのアカウントをクリックして選択します。
* Once you are successfully connected to the Network, you will see the Chain ID and Account of the connected network.

## Klaytn を接続 - Kaikas を使ってリミックスする <a href="#connecting-klaytn-remix-using-kaikas" id="connecting-klaytn-remix-using-kaikas"></a>

* Remix Environmentメニューで\[Injected Caver] を選択します。

![Injected Caver](img/env-injected-caver.png)

* Kaikasポップアップが表示されたら、\[Connect] をクリックします。
* Once you are successfully connected to the Network, you will see the Chain ID and Account of the connected network.

## チュートリアル: KlaytnGreeter Contract <a href="#tutorial-klaytngreeter-contract" id="tutorial-klaytngreeter-contract"></a>

We will be using the [**KlaytnGreeter**](https://docs.klaytn.foundation/smart-contract/sample-contracts/klaytngreeter) sample contract.

* KlaytnGreeter.sol を追加し、テストコードを記述します。

![Add KlaytnGreeter](../../bapp/tutorials/img/remix-add-klaytngreeter.png)

* Solidity Compile タブで \[Compile KlaytnGreeter.sol] を選択し、コントラクトコードをコンパイルします。

> It is better to turn on the 'Auto compile' option.

* Deploy & Run Transactions タブで、\[Deploy] をクリックしてコンパイルされたコントラクトをデプロイします。

![Deploy the Contract](../../bapp/tutorials/img/remix-deploy-run-tx.png)

* デプロイ済みコントラクトを表示できます。 テストまたはデバッグができます。

![Check the Contract](../../bapp/tutorials/img/remix-test-or-debug.png)
