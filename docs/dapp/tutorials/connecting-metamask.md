# Connecting MetaMask <a id="connecting-metamask"></a>

> **Note**: MetaMask is mostly used as a wallet for Ethereum, but it is also compatible with Klaytn due to the identical address structures. Klaytn also has a browser extension wallet called [Kaikas](../developer-tools/README.md#kaikas), so it basically provides the same features as MetaMask, except for Remix.

## Step 1. Install MetaMask <a id="install-metamask"></a>

* We will be using Chrome browser in this example. ([**Install Chrome**](https://www.google.com/intl/en_us/chrome/))

* Add [**MetaMask Extension**](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) to Chrome.

  >  **Note:** You may need additional installations if you are using another browser. 

* You can start MetaMask by clicking on the icon in the upper right-hand corner of your chrome browser.


## Step 2. Generate a MetaMask Wallet <a id="generate-a-metamask"></a>

![Create a Wallet](./img/new-to-metamask.png)

* Click on [Create a Wallet].
* Set a password.
* You will be given a 12 word seed phrase; back it up somewhere secure.

  > **Note:** You can only restore your wallet with the seed phrase. Sharing your seed phrase with others may result in losing all of your funds. Therefore, it is recommended that you either write it down manually or store it in an offline device.

![Seed phrase and Wallet](./img/metamask-secret-backup.png)


## Step 3. Connect to Klaytn Network <a id="connect-to-klaytn-network"></a>

* Click on the Network tab, which is on Ethereum Mainnet as default and select [Custom RPC].

* Enter the Endpoint Node (EN) data of the Klaytn chain.

  * Cypress
    * Network Name: Klaytn Cypress
    * New RPC URL: (Default: [https://public-node-api.klaytnapi.com/v1/cypress](https://public-node-api.klaytnapi.com/v1/cypress))
    * Block Explorer URL: [https://scope.klaytn.com/](https://scope.klaytn.com/)
    * Chain ID: 8217
  * Baobab
    * Network Name: Klaytn Baobab
    * New RPC URL: [https://api.baobab.klaytn.net:8651](https://api.baobab.klaytn.net:8651)
    * Block Explorer URL: [https://baobab.scope.klaytn.com/](https://baobab.scope.klaytn.com/)
    * Chain ID: 1001
  * Common
    * Currency Symbol: KLAY


* Click [Save] to add Klaytn Cypress Network.

![Network Setup and Custom RPC](./img/metamask-add-cypress-1.png)
![Network Setup and Custom RPC](./img/metamask-add-cypress-2.png)


## Step 4. Set Gas Price and Send KLAY <a id="send-klay"></a>
**Note:** The following steps require KLAY.

* Click [Send] on the main page and enter the recipient address and the amount of KLAY.

![Send KLAY 1](./img/metamask-send-klay-1.png)

* Klaytn has a fixed gas fee, so it's important to set the right amount.
* Click on `Turn on Enhanced Gas Fee UI in Settings` to set gas fee.
* Set the `Enable Enhanced Gas Fee UI` toggle to ON and exit Settings.

![Send KLAY 2](./img/metamask-send-klay-2.png)

* Return to the `SENDING KLAY` window and set a fixed gas fee instead of using the market price.
* Click [Market] and then select [Advanced] in the `Edit gas fee`window.
* Enter fixed gas fee for Max base fee and Priority Fee.
   * Baobab gas fee: 750, Cypress gas fee: 750
* And check `Always use these values and advanced setting as default` to not repeat this process next time.

![Send KLAY 3](./img/metamask-send-klay-3.png)
![Send KLAY 4](./img/metamask-send-klay-4.png)

**NOTE:** Sending KLAY requires a transaction, for which you need KLAY.

* Check the amount to send and the transaction fee and click [Confirm] to complete the KLAY transfer, after which you will be redirected to the main page.
* Click [Activity] on the main page to confirm the transaction history.

![Send KLAY 5](./img/metamask-send-klay-5.png)


## Klaytn Baobab Network - Obtain KLAY to make a transaction <a id="obtain-klay-to-make-a-transaction"></a>
> **Note:** This tutorial uses Public EN of the Testnet (Baobab) to connect to the network. Make sure to use Baobab when you are running a test.

* Click [Save] to add Klaytn Baobab Network.

![Network Setup and Custom RPC](./img/metamask-add-baobab.png)

* To test the connection of the Klaytn Wallet, you will need to make a transaction, which requires KLAY.
* Click on the kebab menu (three dots) in the upper right corner and select [Account details].
* Click [Export Private Key] to obtain your private key.

![Export Private Key](./img/metamask-obtain-private-key.png)

* When using Baobab Testnet, you can obtain Test Klay in [**Klaytn Faucet**](https://baobab.wallet.klaytn.foundation/access?next=faucet).
* Enter your private key on Klaytn Wallet and log in by clicking [Access]. (Attach 0x in front of the private key.)
* Click [Run Faucet]. 5 Testnet KLAY will be sent to your account and the balance will be updated accordingly. You can claim Testnet KLAY from Faucet once every 24 hours per account.

![Account Sign-in and KLAY Faucet](./img/metamask-klay-faucet.png)

* Come back to MetaMask and confirm the KLAY that you received.
* You can follow step 4 for the Klaytn Baobab Network.

![Balance](./img/metamask-klay-received.png)