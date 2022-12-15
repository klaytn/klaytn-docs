Klaytnのような典型的なブロックチェーンプラットフォームでは、ほとんどのユーザーがKaikasやMetaMaskなどのシングルキーウォレットシステムに慣れており、これらはEOA（externally owned accounts）とも呼ばれる。 これらのアカウントは、従来の鍵ペア、すなわち公開鍵と秘密鍵を使用していますが、秘密鍵が単一障害点を生み出すため、理想的ではありません。

This makes EOAs unsuitable for organisational use, as a compromised private key could lead to the organisation losing all of its crypto funds—such was the case in the [Wintermute hack](https://www.certik.com/resources/blog/uGiY0j3hwOzQOMcDPGoz9-wintermute-hack-) where $162.5 million was lost.

This is where multisig wallets like Klaytn Safe come in. Unlike single key wallets, a multi-sig wallet needs multiple parties' private keys to sign and execute a transaction, removing the single point of failure and providing greater security for organisational use cases.

# What are MultiSig Wallets? <a id="What are Multisig Wallets"></a>

As the name implies, a multi-signature wallet is a digital wallet that requires two, three, or more private keys from different sources to confirm and execute a crypto transaction.


For example, you can imagine a multi-signature wallet as a safe that has three locks. The three keys required to open the safe are with three different individuals, thus requiring their joint consent to open.

Here are the main benefits of multisig wallets:


* **Store assets/funds securely:** Companies and protocols can store their funds safely without worrying about a private key leak or one bad actor moving funds without authorization.


* **Enable decentralised decision making:** Companies and business executives can make on-chain decisions on which transactions to execute.


* **Two-factor authentication:** With the help of multisig wallets, businesses and individuals can make sure that only those with access to the necessary keys can execute transactions.


Next, we will dive into Klaytn Safe, a multisig wallet for Klatyn, and how to use it to manage your funds and transactions.

# What is Klaytn Safe? <a id="What is Klaytn Safe"></a>

Klaytn Safe is a multisig wallet for the Klaytn ecosystem. It is a fork of the well-known multisig wallet [Gnosis Safe](https://gnosis-safe.io/).


# Benefits <a id="Benefits of Klaytn Safe"></a>

* **Store and transfer KLAY and KCTs (KIP7, KIP17)**: Users can deposit and transfer cryptocurrencies (KLAY) and tokens (fungible or non-fungible).

* **Flexibility and security:** The confirmation threshold gives users more flexibility and control over which transactions should be executed, and removes the single point of failure.

* **Safe apps:** Klaytn Safe's functionality is expanded by the addition of custom apps that enable batch transactions and interaction with other dApps. One example of this safe app is the **Transaction Builder** which combines and executes multiple transactions as a batch transaction.

* **Account recovery:** In the event of lost keys, Klaytn Safe accounts can be recovered as long as the confirmation threshold can still be met by the remaining keys.

