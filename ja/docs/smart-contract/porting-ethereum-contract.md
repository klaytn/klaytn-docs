# Ethereumコントラクトのエクスポート <a id="porting-ethereum-contract"></a>

ほとんどの場合、KlaytnでEthereum契約を変更することなく使用できます。 ただし、以下の2つの問題に注意してください。

## Solidity Support <a id="solidity-support"></a>

* Baobabネットワークは現在 **ロンドン** イーサリアム仮想マシン(EVM)と互換性があります。
* サイプレスネットワークは現在 **ロンドン** イーサリアム仮想マシン(EVM)と互換性があります。

{% hint style="success" %}
v1.7.0 Protocol Upgrade - **イスタンブール** ハードフォークアイテムと Klaytn 自身のアイテムを含む互換性のない変更。 Baobabネットワークの場合はブロック番号 `#75,373,312` から有効になり、サイプレスネットワークの場合は `#86,816,005` から有効になりました。

v1.7.3 プロトコルアップグレード - **ロンドン** のハードフォークからの基本料金を含む互換性のない変更。 Baobabネットワークの場合はブロック番号 `#80,295,291` から有効になり、サイプレスネットワークの場合は `#86,816,005` から有効になりました。

v1.8.0 プロトコルアップグレード - **ロンドン** ハードフォークからの基本手数料を含む互換性のない変更。 Baobabネットワークの場合はブロック番号 `#86,513,895` から有効になり、サイプレスネットワークの場合は `#86,816,005` から有効になりました。
{% endhint %}

Backward compatibility is not guaranteed with other EVM versions on Klaytn. したがって、プロトコルのアップグレードステータスに従って、Solidityコードを正しいターゲットオプションでコンパイルすることを強くお勧めします。
* バオバブ: --evm-version London
* キプロス: --evm-version London
* Others(private/service chain): プロトコルのアップグレードステータスに従って決定されます

Please refer to [how to set the EVM version of solc](https://solidity.readthedocs.io/en/latest/using-the-compiler.html#setting-the-evm-version-to-target).


コマンドの例を以下に示します。

```
$ solc --evm-version ロンドンcontract.sol
```

## Decoupled Key Pairs <a id="decoupled-key-pairs"></a>

Klaytn [は、アドレス](../klaytn/design/accounts.md#decoupling-key-pairs-from-addresses) からキーペアを分離します。 ユーザ [がアカウント](../klaytn/design/transactions/basic.md#txtypeaccountupdate)を更新した場合、特定のアカウントの秘密鍵は別のものに置き換えられます。 ほとんどの場合、これはビジネスロジックには影響しません。 しかし、ビジネスロジックにecrecoverが含まれている場合は、validateSenderの使用を検討する必要があります。 詳細は [こちら](precompiled-contracts/precompiled-contracts.md) をご覧ください。
