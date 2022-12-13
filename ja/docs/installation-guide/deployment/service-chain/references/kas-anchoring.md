デザインセクションで説明したように、サービスチェーンデータを Klaytn メインチェーンにアンカーできます。 このページでは、 [KAS (Klaytn API Service)](https://www.klaytnapi.com) を介してデータアンカーを有効にする方法を紹介します。

電源を入れたら。 サービスチェーン内のノードは、サービスチェーンの存在と不変性の証明として、チェーンデータ(ブロックデータ)を定期的にサイプレスまたはバオバブにアンカーすることができます。 これにより、サービスチェーンの安全性と信頼性が保証されます。

# KAS使用準備 <a id="preparation-with-kas"></a>
このセクションでは、データアンカーにKASを使用するための前提条件を紹介します。

## KAS登録(Klaytn API Service) <a id="sign-up-kas"></a>
まず、KASアカウントを取得するには、 [KASコンソールウェブサイト](https://www.klaytnapi.com) でKASにサインアップする必要があります。 上記のウェブサイトにアクセスし、KASに登録してください。

[![メインページ](../images/kas-main-en.png)](https://www.klaytnapi.com)

[![サインアップ](../images/kas-signup-en.png)](https://www.klaytnapi.com)

## 証明書を作成 <a id="check-credential"></a>
ログイン後、以下のように資格情報を作成できます。 `AccessKey ID` と `Secret AccessKey`または `Authorization` は KAS API を呼び出すために使用されます。

![資格情報](../images/kas-credential-en.png)

## アンカー API <a id="anchor-api"></a>
KASは、アンカーAPIを提供しています。アンカーAPIはデータアンカー用に設計されており、アンカータスクに使用するものです。

![anchor api](../images/kas-anchor-api-en.png)

## オペレーターアドレスを作成 <a id="create-kas-credential"></a>
KASを介してサービスチェーンデータをアンカーするには、KASに登録されているKlaytnアドレスがあり、実際にKlaytnにアンカートランザクションを送信します。 そのため、サービスノードを設定する前に、KAS経由で「演算子」と呼ばれるKlaytnアカウントを作成する必要があります。 このアカウントを作成するためにKASコンソールを使用してください。

重要なのは、最初に **Klaytn の** チェーンを選択し、データをアンカーする **KAS コンソールページ** の右上隅にあります。 各チェーン(サイプレス/バオバブ)の演算子を作成する必要があります。



![チェーンを選択](../images/kas-select-chain-en.png)

以下のように演算子を作成します。

![演算子を作成](../images/kas-create-operator-en.png)

その後、以下のようにオペレータリストを確認できます。 サービスチェーンノードの設定には、オペレーターのアドレスが必要です。

![演算子を作成](../images/kas-operator-list-en.png)

## サービスチェーンノードの設定 <a id="configure-service-chain-node"></a>
API資格情報を取得した後、Anchor API情報 (APIエンドポイントとパラメータ) そして、KASでオペレータアカウントを作成し、次にサービスチェーンノードを設定します。 You need to edit the configuration file (`kscnd.conf`, `kspnd.conf`, `ksend.conf`) of your service chain node like below.

`SC_SUB_BRIDGE=1` とすべての `SC_KAS_` プレフィックス項目を設定してください。

```bash
...
# サービスチェーンオプション設定
...
SC_SUB_BRIDGE=1
...

SC_KAS_ANCHOR=1                                                         # 1: enable, 0: disable
SC_KAS_ANCHOR_PERIOD=10                                                 # Anchoring block period
SC_KAS_ANCHOR_URL="https://anchor-api.klaytn.com/v1/anchor"             # Anchor API URL
SC_KAS_ANCHOR_OPERATOR="0x6A3D565C4a2a4cd0Fb3df8EDfb63a151717EA1D7"     # Operator address
SC_KAS_ANCHOR_ACCESS_KEY="KAJM4BEIR9SKJKAW1G3TT8GX"                     # Credential Access key
SC_KAS_ANCHOR_SECRET_KEY="KyD5w9ZlZQ7ejj6lDF6elb61u8JH/mXdKqhgr3yF"     # Credential Secret key
SC_KAS_ANCHOR_X_CHAIN_ID=1001                                           # Cypress: 8217, Baobab: 1001
...
```

## サービスチェーンノードの実行 <a id="run-service-chain-node"></a>
今、あなたは行って良いです。 サービスチェーンノードを実行できます。 KASアンカーAPIに関連するログメッセージが以下のように表示されます。

```bash
...
INFO[09/10,18:09:28 +09] [5] Imported new chain segment                number=86495 hash=5a20d6…cbca1b blocks=1  txs=3 elapsed=2.387ms  trieDBSize=5.10kB mgas=0.063 mgasps=26.383
INFO[09/10,18:09:28 +09] [53] Anchored a block via KAS                  blkNum=86495
INFO[09/10,18:09:29 +09] [5] Imported new chain segment                number=86496 hash=8897bc…4ea7e7 blocks=1  txs=3 elapsed=2.158ms  trieDBSize=5.10kB mgas=0.063 mgasps=29.188
INFO[09/10,18:09:29 +09] [53] Anchored a block via KAS                  blkNum=86496
INFO[09/10,18:09:30 +09] [5] Imported new chain segment                number=86497 hash=44b319…7d4247 blocks=1  txs=3 elapsed=2.346ms  trieDBSize=5.43kB mgas=0.063 mgasps=26.848
INFO[09/10,18:09:30 +09] [53] Anchored a block via KAS                  blkNum=86497
INFO[09/10,18:09:31 +09] [5] Imported new chain segment                number=86498 hash=0b98ba…73d654 blocks=1  txs=3 elapsed=2.235ms  trieDBSize=5.61kB mgas=0.063 mgasps=28.186
INFO[09/10,18:09:31 +09] [53] Anchored a block via KAS                  blkNum=86498
INFO[09/10,18:09:32 +09] [5] Imported new chain segment                number=86499 hash=4f01ab…3bc334 blocks=1  txs=3 elapsed=3.319ms  trieDBSize=5.61kB mgas=0.063 mgasps=18.977
INFO[09/10,18:09:32 +09] [53] Anchored a block via KAS                  blkNum=86499
...
```

## 取引一覧 <a id="list-of-transaction"></a>
KASコンソールのウェブサイトで 以下のように、「KAS コンソール - サービス - アンカー - オペレータ」メニューで、サービスチェーンのオペレータが送信したアンカートランザクションのリストが表示されます。

![トランザクションリストのアンカー中](../images/kas-tx-list-en.png)
