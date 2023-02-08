# Klaytn ウォレット <a id="klaytn-wallet"></a>

Klaytn Walletはブラウザベースのアカウント管理ツールで、KlaytnのdApp(分散アプリケーション)開発者向けです。 これは、Klaytn ノードをローカルで実行することなく、開発者が新しいアカウントを作成したり、Webブラウザを介して既存のアカウント情報を直接表示したりするのに役立ちます。 Klaytn Walletを使用すると、KLAYまたはKlaytnトークンを他のアカウントに転送することもできます。

#### セキュリティに関する重要なお知らせ <a id="important-notice-on-security"></a>

> **ご注意ください:** Klaytn Walletは開発とテストの目的でのみ使用する必要があります。 KLAYまたはKlaytnトークンの保管または転送を含む、商用または個人用にKlaytnウォレットを使用しないでください。 Klaytn Walletは商業レベルのセキュリティでテストされておらず、悪意のある攻撃に対して脆弱である可能性があります。 Klaytn Walletはユーザーの秘密鍵をブラウザのローカルストレージに保存します。これはブラウザのセキュリティ脆弱性を悪用する攻撃の影響を受けやすくなる可能性があります。

* Klaytn Wallet for the Cypress mainnet: [https://wallet.klaytn.com](https://wallet.klaytn.com)
* Klaytn Wallet for the Baobab testnet: [https://baobab.wallet.klaytn.found](https://baobab.wallet.klaytn.foundation)

![](img/00-main.png)

## Klaytn ウォレット関数 <a id="klaytn-wallet-functions"></a>

Klaytn Walletは以下の機能のリストを提供します。

* アカウントと鍵管理
  * 新しいアカウントを作成
  * 秘密鍵またはキーストアファイルを使用して既存のアカウントを読み込む
  * 新しいキーストアファイルをダウンロード
* 資産管理
  * アカウント残高を表示
  * ウォレットにトークンを追加
  * KLAYとKlaytnトークンを転送する
* Baobab testnet KLAY faucet

## 新しいアカウントを作成 <a id="create-a-new-account"></a>

> すでにKlaytn ccountをお持ちの場合は、このプロセスをスキップし、 [既存のアカウントにアクセス](#access-existing-account) することを選択できます。

Klaytn Walletを使って新しいKlaytnアカウントを作成することができます。 新しいアカウントを作成するには、左側のメニューバーの `Create Account` ボタンをクリックし、以下の手順に従います。

* Step 1. 新しいアカウントのキーストアファイルのパスワードを設定する
* Step 2. キーストアファイルをローカルストレージにダウンロード
* Step 3. 新しいアカウントのKlaytnウォレットキーを保存

### 続行する前に、警告のいくつかの単語: <a id="before-continuing-a-few-words-of-caution"></a>

* 「ウォレットキー」または「秘密キー」を誰とでも共有することはありません。 あなたの「ウォレットキー」または「秘密キー」に関する情報を与えることは、あなたのアカウントに完全かつ永続的なアクセスを与えることを意味します。
* インターネットに接続されているデバイスにこの情報を保存しないでください。 ハッカーはローカルストレージから資格情報を盗むことができます。
* 強力なパスワードを選択し、複数の場所に重要な情報を保存します。
* Klaytnは紛失した場合に備えて「ウォレットキー」または「秘密キー」を復元できません。 重要な情報を失わないように注意してください。

### Step 1. キーストアファイルのパスワードを設定 <a id="step-1-set-password-for-your-keystore-file"></a>

新しいアカウントを作成する最初のステップとして、キーストアファイルのパスワードを作成する必要があります。 キーストアファイルは、Klaytnアカウント情報を安全に保存するJSONファイルです。 アカウントのアドレスとアカウントに関連付けられた秘密鍵を含む。 鍵ストアファイルのパスワードは、ファイル内に保存されている秘密鍵をパスワードで保護するため、Klaytnのセキュリティ標準を満たすのに十分な強度を持たなければなりません。

![](img/01-create-new-1.png)

パスワード入力フォームをクリックすると、ツールチップが上に表示され、表示されます。 入力時に入力したパスワードがセキュリティ要件を満たしていれば パスワードがすべての要件を満たしている場合は、 `次のステップ` ボタンが有効になります。 !

### Step 2. キーストアファイルをダウンロード <a id="step-2-download-the-keystore-file"></a>

2番目のステップでは、送信されたパスワードで暗号化されたキーストアファイルをダウンロードします。 `Download & Next Step` ボタンをクリックして、直ちにキーストアファイルをダウンロードし、最後のステップに移動します。 (ダウンロードしたキーストアファイルが失われた場合は、 `アカウント情報を表示` メニューから新しいキーストアファイルをダウンロードできます。

![](img/01-create-new-4.png)

### Step 3. Klaytnウォレットキーとプライベートキーを保存 <a id="step-3-save-your-klaytn-wallet-key-and-private-key"></a>

最後のステップでは、新しく作成したアカウントに対応するWalletキーと秘密鍵が表示されます。 キーを別の接続されていないストレージに保存することを強くお勧めします。

Klaytnアカウントの詳細については、Klaytn Docsを参照して、 [Accounts](../klaytn/design/accounts.md) セクションを確認してください。

![](img/01-create-new-5.png)

## 既存のアカウントにアクセス <a id="access-existing-account"></a>

KLAYまたはKlayトークンの残高を確認したり、トークンを別のアカウントに転送するには、アカウントにアクセスする必要があります。 Klaytn Walletはあなたのアカウントにアクセスする2つの方法を提供しています。

* **Klaytn Walletキーまたはプライベートキーの使用** Klaytn Walletキーはアカウントに関連付けられた110の16進数文字の文字列です。 一方、秘密鍵は16進数64文字の文字列です(16進数を示す"0x"プレフィックスは含まれません)。 それらを数えると、Klaytn Walletキーは112文字、秘密キーは66文字です)。 他のすべてが失敗したときにのみ利用されるために、自分の秘密鍵を使用することは常にアクセスの最後の溝の努力でなければなりません。 これは、誰もが自分のアカウントにアクセスするための主要な道であるべきではありません。 秘密鍵はアカウントへの完全なアクセスを可能にするため、秘密鍵は最も機密情報です。 したがって、秘密鍵を安全に、安全に、そして秘密に保つことは極めて重要です。
* **キーストアファイルとパスワード** キーストアファイルは、暗号化された秘密鍵とアカウントアドレス情報を保存する JSON ファイルです。 このファイルは、ユーザーが提供するパスワードを使用して暗号化されます。

### Klaytnウォレットキーまたは秘密鍵を使用して既存のアカウントにアクセス <a id="access-existing-account-using-klaytn-wallet-key-or-private-key"></a>

#### Step 1. ウォレットキーまたは秘密鍵を入力してください <a id="step-1-enter-the-wallet-key-or-private-key"></a>

To access your account, click the `View Account Info` button from the menu bar on the left, and go to the `Private Key` tab on the screen. 入力ボックスにアクセスしたいアカウントのKlaytnウォレットキーまたは秘密キーを入力します。

![](img/03-access-1pk-1.png)

#### Step 2. チェックボックスにチェックを入れ、「アクセス」ボタンをクリックします。 <a id="step-2-check-the-checkbox-and-click-access-button"></a>

`アクセス` ボタンをクリックして、アカウントページに移動します。 提供されたキー情報がいかなるキーフォーマットにも適合しない場合、 `Access` ボタンはアクティブになりません。

![](img/03-access-1pk-2.png)

### キーストアファイルとパスワードを使用して既存のアカウントにアクセス <a id="access-existing-account-using-keystore-file-and-password"></a>

#### Step 1. キーストアのファイルタブに移動します <a id="step-1-go-to-the-keystore-file-tab"></a>

画面の `キーストアファイル` タブに移動します。

![](img/03-access-2ks-1.png)

#### Step 2. 使用するキーストアファイルを選択 <a id="step-2-select-the-keystore-file-to-use"></a>

`アップロード` ボタンをクリックし、キーストアファイルを探します。

![](img/03-access-2ks-2.png)

#### Step 3. キーストアのファイルパスワードを入力してください <a id="step-3-enter-keystore-file-password"></a>

選択したキーストアファイルに対応するパスワードを入力し、 `アクセス` ボタンをクリックしてアカウントページに移動します。

![](img/03-access-2ks-3.png)

### アカウント情報を表示 <a id="view-account-info"></a>

このページでは、アカウントのアドレス、秘密鍵、Klaytn Walletキー情報を確認できます。 ページの右側では、KLAYと他のKlaytnトークンの残高を確認できます。 Klaytn Walletを使用してアカウントの残高を確認することは、残高チェックが必要なときにアカウントのロックを解除したくないブロックチェーンアプリケーション開発者に推奨されます。 セキュリティ上の理由で

![](img/04-balance-3.png)

## Klaytnトークンを追加する方法 <a id="how-to-add-klaytn-tokens"></a>

Klaytn WalletはKLAYとKlaytnトークンを登録して残高を確認することができます。 KlaytnトークンをKlaytn Walletに登録するには、以下の手順に従ってください。

### Step 1. 既存のアカウントの情報にアクセス <a id="step-1-access-existing-account-s-information"></a>

[既存のアカウントへのアクセス](#access-existing-account) の手順に従って、アカウントページに移動します。

### Step 2. 残高セクションのトークン追加ボタンをクリックします <a id="step-2-click-the-add-token-button-in-the-balance-section"></a>

`残高` 領域の画面右下の「+」ボタンをクリックします。

![](img/05-addtoken-3.png)

### Step 3. トークン情報を入力 <a id="step-3-enter-token-information"></a>

`トークンシンボル`、 `トークンコントラクトアドレス`、および `小数点数` を入力します。 `Save` ボタンをクリックすると、アカウントの残高セクションに表示されるトークンが表示されます。

![](img/05-addtoken-4.png)

## KLAYとトークンの送信方法 <a id="how-to-send-klay-and-tokens"></a>

KLAYまたはKlaytnトークンを他のアカウントに送るには、Klaytn Walletを使用します。 KLAYまたはトークンを送信する場合、取引手数料の支払いには、お客様の口座に最低額のKLAYを記載する必要があります。

### Step 1. 「KLAY & トークンを送信」メニューに移動 <a id="step-1-go-to-send-klay-tokens-menu"></a>

左側のメニューバーから `KLAY & トークンを送信` ボタンをクリックするか、メインページの同じボタンをクリックします。

![](img/06-send-1.png)

### Step 2. アカウントにアクセス <a id="step-2-access-your-account"></a>

まだウォレットにアカウントを読み込んでいない場合は、 [既存のアカウントにアクセス](#access-existing-account)の手順に従ってください。

### Step 3. 送信するトークンを選択 <a id="step-3-select-the-token-to-send"></a>

`ステップ 1で転送するトークンを選択します。 トークン` エリアを選択します。

![](img/06-send-3.png)

### Step 4. トークン転送情報を選択 <a id="step-4-select-token-transfer-information"></a>

送信するトークンを選択した後、 `ステップ2に移動します。 Enter the information` section and fill in the necessary information (`To Address` and `Amount to Send`), then click the `Send Transaction` button.

![](img/06-send-4.png)

### ステップ5 送金手続きを確認する <a id="step-5-confirm-the-transfer"></a>

確認ページが表示されます。 送金額と受取人の住所を再確認してください。 すべてが正しい場合は、 `はい、` をクリックしてください。 そうでなければ、トークン転送情報を編集するために前のページに戻ることができます。

![](img/06-send-9.png)

### ステップ6. 転送の詳細を確認する <a id="step-6-review-transfer-details"></a>

トランザクションリクエストが完了しました。 トランザクションのステータスはKlaytnscopeで確認できます。 `トランザクション情報を表示する` をクリックすると、Klaytnscopeが起動し、トランザクションの詳細が表示されます。

![](img/06-send-10.png)

## バオバブテストネットKLAYの受け取り方法 <a id="how-to-receive-baobab-testnet-klay"></a>

テストネットKLAY蛇口はBaobabネットワーク上で動作します。 The faucet can be accessed from the [Baobab Klaytn Wallet](https://baobab.wallet.klaytn.foundation).

To receive testnet KLAY, you should have a valid Klaytn account.

* アカウントをお持ちでない場合は、 [新規アカウントの作成](#create-a-new-account) の手順に従ってアカウントを作成してください。
* [既存のアカウントにアクセス](#access-existing-account)の手順に従って、アカウントをウォレットにロードします。 Testnet KLAY will be sent to the loaded account.

### Step 1. テストネットKLAYファケットに移動 <a id="step-1-go-to-the-testnet-klay-faucet"></a>

[Baobab Klaytn Wallet](https://baobab.wallet.klaytn.foundation), `KLAYFaucet` メニューから、テストネットKLAYリクエストページに移動します。

リクエストされたページには、あなたのアドレスと現在のアカウントのtestnet KLAY残高が表示されます。

![](img/test_klay_faucet.png)

### Step 2. Run Faucet <a id="step-2-run-faucet"></a>

`Run Faucet` ボタンをクリックすると、5つのtestnet KLAYが送信され、残高が更新されます。 Note that you can run the faucet for each account once every 24 hours.
