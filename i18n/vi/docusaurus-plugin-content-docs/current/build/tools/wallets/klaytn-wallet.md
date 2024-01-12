# Klaytn Wallet

Klaytn Wallet is a browser-based account management tool for dApp (decentralized application) developers on Klaytn. It helps developers create new accounts or view existing account information directly through a web browser without having to run a Klaytn node locally. Klaytn Wallet also lets users transfer KLAY or Klaytn tokens to other accounts for testing purposes.

#### Important Notice on Security <a id="important-notice-on-security"></a>

> **NOTE:** Klaytn Wallet is should be used for development and testing purposes only. Do NOT use Klaytn Wallet for commercial or personal use, including storage or transfer of KLAY or Klaytn tokens. Klaytn Wallet has NOT been tested for commercial-level security and may be vulnerable to malicious attacks. Klaytn Wallet stores user's private key in the browser's local storage, which may be susceptible to attacks that exploit the browser's security vulnerabilities.

- Klaytn Wallet for the Cypress mainnet: [https://wallet.klaytn.com](https://wallet.klaytn.com)
- Klaytn Wallet for the Baobab testnet: [https://baobab.wallet.klaytn.foundation](https://baobab.wallet.klaytn.foundation)

![](/img/build/tools/00-main.png)

## Klaytn Wallet Functions <a id="klaytn-wallet-functions"></a>

Klaytn Wallet provides the following list of features.

- Account and key management
  - Create a new account
  - Load existing account using the private key or keystore file
  - Download a new keystore file
- Asset management
  - View account balance
  - Add tokens to the wallet
  - Transfer KLAY and Klaytn tokens
- Baobab testnet KLAY faucet

## Create a New Account <a id="create-a-new-account"></a>

> If you already have a Klaytn ccount, you may choose to skip this process and go to [Access Existing Account](#access-existing-account).

You can use Klaytn Wallet to create new Klaytn accounts. To create a new account, click the `Create Account` button on the menu bar on the left, and then follow the steps below.

- Step 1. Set password for your new account's keystore file
- Step 2. Download the keystore file to your local storage
- Step 3. Save your new account's Klaytn Wallet Key

### Before continuing, a few words of caution: <a id="before-continuing-a-few-words-of-caution"></a>

- NEVER share your 'Wallet Key' or 'private key'  with anyone. Giving information about your 'Wallet Key' or 'private key' means giving away complete and permanent access to your account.
- Do not keep this information on a device connected to the Internet. Hackers can steal your credentials from your local storage.
- Choose a strong password and store critical information in multiple locations.
- Klaytn is UNABLE to restore 'Wallet Key' or 'private key' in case you lose it. Take utmost care not to lose your key information.

### Step 1. Set Password for your Keystore File <a id="step-1-set-password-for-your-keystore-file"></a>

As the first step in creating a new account, you must create a password for your keystore file. A keystore file is a JSON file that securely stores your Klaytn account information, including the account's address and the private key associated with the account. A keystore file's password must be strong enough to meet Klaytn's security standard, as the password protects the private key stored within the file.

![](/img/build/tools/01-create-new-1.png)

When you click the password input form, a tooltip will appear above and it will show you, as you type in, if the entered password satisfies the security requirements. If your password meets all the requirements, `Next Step` button will be activated. !

### Step 2. Download the Keystore File <a id="step-2-download-the-keystore-file"></a>

In the second step, you download the keystore file that has been encrypted with the submitted password. Click the `Download & Next Step` button to immediately download the keystore file and move on to the last step. (Note that if the downloaded keystore file gets lost, you can download a new keystore file in the `View Account Info` menu.)

![](/img/build/tools/01-create-new-4.png)

### Step 3. Save your Klaytn Wallet key and Private Key <a id="step-3-save-your-klaytn-wallet-key-and-private-key"></a>

In the final step, you are shown the Wallet Key and the private key corresponding to your newly created account. You are strongly encouraged to store the key in a separate, disconnected storage.

For more in-depth information about Klaytn account, please visit Klaytn Docs and review the [Accounts](../../../learn/accounts.md) section.

![](/img/build/tools/01-create-new-5.png)

## Access Existing Account <a id="access-existing-account"></a>

To check your account's balance of KLAY or Klay tokens, or to transfer tokens to another account, you need to access your account. Klaytn Wallet offers two ways to access your account.

- **Using Klaytn Wallet Key or Private Key** A Klaytn Wallet Key is a string of 110 hexadecimal characters associated with an account, whereas a private key is a string of 64 hexadecimal characters (The character count does not include the "0x" prefixes that indicate hexadecimal numbers. If we count them in, a Klaytn Wallet Key is 112 characters long, and a private key is 66 characters long). Using one's private key should always be the last-ditch effort of access, only to be utilized when all else fails. This should not be the main road for anyone to access their accounts. Private keys are the most sensitive information because private keys allow complete access to an account. Therefore, it is extremely important to keep your private key safe, secure, and secret.
- **Keystore file and password** A keystore file is a JSON file that stores encrypted private key and account address information. This file is encrypted using the user-provided password.

### Access Existing Account Using Klaytn Wallet Key or Private Key <a id="access-existing-account-using-klaytn-wallet-key-or-private-key"></a>

#### Step 1. Enter the Wallet Key or Private Key <a id="step-1-enter-the-wallet-key-or-private-key"></a>

To access your account, click the `View Account Info` button from the menu bar on the left, and go to the `Private Key` tab on the screen. Enter the Klaytn Wallet Key or private key for the account you wish to access in the input box.

![](/img/build/tools/03-access-1pk-1.png)

#### Step 2. Check the Checkbox and Click 'Access' button <a id="step-2-check-the-checkbox-and-click-access-button"></a>

Click the `Access` button to go to your account page. If the key information you provided does not conform to any key format, the `Access` button will not be active.

![](/img/build/tools/03-access-1pk-2.png)

### Access Existing Account Using Keystore File and Password <a id="access-existing-account-using-keystore-file-and-password"></a>

#### Step 1. Go to the Keystore File Tab <a id="step-1-go-to-the-keystore-file-tab"></a>

Go to the `Keystore File` tab on the screen.

![](/img/build/tools/03-access-2ks-1.png)

#### Step 2. Select the Keystore File to Use <a id="step-2-select-the-keystore-file-to-use"></a>

Click the `Upload` button, and locate your keystore file.

![](/img/build/tools/03-access-2ks-2.png)

#### Step 3. Enter Keystore File Password <a id="step-3-enter-keystore-file-password"></a>

Enter the password corresponding to the selected keystore file, and click the `Access` button to go to your account page.

![](/img/build/tools/03-access-2ks-3.png)

### View Account Info <a id="view-account-info"></a>

On this page, you can check your account's address, private key, and Klaytn Wallet Key information. On the right side of the page, you can check the balance of your KLAY and other Klaytn tokens. Using Klaytn Wallet to check account balance is recommended for blockchain application developers who do not wish to unlock their accounts every time a balance check is needed, for security reasons.

![](/img/build/tools/04-balance-3.png)

## How to Add Klaytn Tokens <a id="how-to-add-klaytn-tokens"></a>

Klaytn Wallet supports KLAY and Klaytn tokens to be registered so that their balances can be checked. To register Klaytn tokens to Klaytn Wallet, please follow the steps below.

### Step 1. Access Existing Account's Information <a id="step-1-access-existing-account-s-information"></a>

Go to your account page by following the steps of [Access Existing Account](#access-existing-account).

### Step 2. Click the Add Token Button in the Balance Section <a id="step-2-click-the-add-token-button-in-the-balance-section"></a>

Click the '+' button in the bottom-right of the screen in the `Balance` area.

![](/img/build/tools/05-addtoken-3.png)

### Step 3. Enter Token Information <a id="step-3-enter-token-information"></a>

Enter the `Token Symbol`, `Token Contract Address`, and `Decimals`. After clicking the `Save` button, you will see the token listed in your account's balance section.

![](/img/build/tools/05-addtoken-4.png)

## How to Send KLAY and Tokens <a id="how-to-send-klay-and-tokens"></a>

You can send KLAY or Klaytn tokens to other accounts using Klaytn Wallet. When sending KLAY or tokens, you must have the minimum amount of KLAY in your account to pay for the transaction fee.

### Step 1. Go to 'Send KLAY & Tokens' menu <a id="step-1-go-to-send-klay-tokens-menu"></a>

Either click the `Send KLAY & Token` button from the menu bar on the left, or the same button on the main page.

![](/img/build/tools/06-send-1.png)

### Step 2. Access Your Account <a id="step-2-access-your-account"></a>

In case you have not loaded your account into the wallet yet, do so by following the steps in [Access Existing Account](#access-existing-account).

### Step 3. Select the Token to Send <a id="step-3-select-the-token-to-send"></a>

Select the token to transfer in `Step 1. Select Tokens` area.

![](/img/build/tools/06-send-3.png)

### Step 4. Select Token Transfer Information <a id="step-4-select-token-transfer-information"></a>

After selecting the token to send, move on to `Step 2. Enter the information` section and fill in the necessary information (`To Address` and `Amount to Send`), then click the `Send Transaction` button.

![](/img/build/tools/06-send-4.png)

### Step 5. Confirm the Transfer <a id="step-5-confirm-the-transfer"></a>

A confirmation page will appear. Double check the amount to transfer and the recipient address. If everything is correct, click `Yes, I'm sure`. Otherwise, you can go back to the previous page to edit the token transfer information.

![](/img/build/tools/06-send-9.png)

### Step 6. Review Transfer Details <a id="step-6-review-transfer-details"></a>

Your transaction request is completed. You can check the status of the transaction on the Klaytnscope. Clicking the `View Transaction Info` will launch Klaytnscope to show the transaction details.

![](/img/build/tools/06-send-10.png)

## How to Receive Baobab testnet KLAY <a id="how-to-receive-baobab-testnet-klay"></a>

The testnet KLAY faucet runs on the Baobab network. The faucet can be accessed from the [Baobab Klaytn Wallet](https://baobab.wallet.klaytn.foundation).

To receive testnet KLAY, you should have a valid Klaytn account.

- If you do not have an account, please create one by following the steps in [Create a New Account](#create-a-new-account).
- Load your account into the wallet by following the steps in [Access Existing Account](#access-existing-account). Testnet KLAY will be sent to the loaded account.

### Step 1. Go to the testnet KLAY Faucet <a id="step-1-go-to-the-testnet-klay-faucet"></a>

From the [Baobab Klaytn Wallet](https://baobab.wallet.klaytn.foundation), `KLAY Faucet` menu on the left bar brings you to the testnet KLAY request page.

The requested page will show your address and the current testnet KLAY balance of your account.

![](/img/build/tools/test_klay_faucet.png)

### Step 2. Run Faucet <a id="step-2-run-faucet"></a>

Clicking `Run Faucet` button will send you 5 testnet KLAY and your balance will be updated. Note that you can run the faucet for each account once every 24 hours.
