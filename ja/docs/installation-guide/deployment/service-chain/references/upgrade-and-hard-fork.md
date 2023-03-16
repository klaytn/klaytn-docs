# Upgrade & Hard Fork

KlaytnとそのServiceChainは、常に新しい機能を開発し、バグを修正するための新しいバージョンをリリースしています。 このページは、ServiceChainバイナリをアップグレードし、ServiceChainのハードフォークブロック番号を設定するためのガイドです。

## アップグレードする <a href="#upgrade" id="upgrade"></a>

このセクションでは、ServiceChainバイナリをアップグレードする方法を示します。

**注意** ServiceChainバイナリをアップグレードすることは不可逆的であり、後方互換性がないため、古いバージョンにダウングレードすることはできません。 詳細については、リリースノートを参照してください。 たとえば、 [Klaytn v1.9.0 リリースノート](https://medium.com/klaytn/klaytn-v1-9-0-release-notes-medium-58e4644f7544) は次のように述べています。

> 注意: このバージョンは、スナップショットの同期をサポートするためにデータベースのバージョンを更新します。 v1.9.0にアップデートしてから、既存のデータを含む古いバージョンにダウングレードすることはできません。

KlaytnおよびServiceChainの最新バージョンのバイナリは、以下のいずれかのリンクから入手できます。

* [Klaytn Docs](../../../download/README.md)
* [Klaytn Github Repository](https://github.com/klaytn/klaytn/releases)

ServiceChainバイナリをアップグレードするには、ServiceChainノードを停止し、バイナリを置き換えます。 たとえば、以下のコマンドを使用して SCN ノードを停止し、バイナリを新しいものに置き換えることができます。

```bash
$ kscnd stop
shuting down kscnd: OK
$ cp /path/to/new/kscn /path/to/original/kscn
```

アップグレード後、ServiceChainノードを再起動できます。 ただし、ServiceChainでハードフォークを有効にする予定である場合は、ServiceChainノードを抑制する必要があります。 ServiceChainハードフォークの手順については、 [ハードフォーク](upgrade-and-hard-fork.md#hard-fork) を参照してください。

```bash
$ kscnd start
```

## ハードフォーク <a href="#hard-fork" id="hard-fork"></a>

このセクションでは、Klaytn [ハードフォーク](../../../../misc/klaytn-history.md) を ServiceChain に適用する手順について説明します。

ハードフォークをServiceChainに適用するには、次のようにする必要があります。

1. ハードフォークの適切なブロック番号を選択してください
2. ServiceChainバイナリをハードフォークをサポートするバージョンにアップグレードします
3. ServiceChainでハードフォークブロック番号を設定する

### 1. Pick an appropriate block number for the hard fork <a href="#1-pick-an-appropriate-block-number-for-the-hard-fork" id="1-pick-an-appropriate-block-number-for-the-hard-fork"></a>

ServiceChain の Javascript コンソールで、以下のように現在のブロック番号を確認できます。

```bash
$ kscn attach ~/kscnd_home/klay.ipc
Welcome to the Klaytn JavaScript console!

instance: Klaytn/vX.X.X/XXXX-XXXXXX/goX.X.X
 datadir: ~/kscnd_home
 modules: admin:1.0 debug:1.0 eth:1.0 governance:1.0 klay:1.0 klay:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0

> klay.blockNumber
1234
```

今、あなたはハードフォークをアクティブにするために適切なブロック番号を選択する必要があります。 現在のブロックとハードフォークのブロックの間に十分な数のブロックがあることを確認してください(毎秒生成されます)。

### 2. ServiceChainバイナリをアップグレード <a href="#2-upgrade-the-servicechain-binary" id="2-upgrade-the-servicechain-binary"></a>

ServiceChainバイナリのアップグレード方法については、このページの [Upgrade](upgrade-and-hard-fork.md#upgrade) セクションを参照してください。 今のところ、ServiceChainノードをダウンさせる(または停止する)ことを確認してください。 ハードフォークのブロック番号を設定した後、再起動します。

### 3. ハードフォークブロック番号を設定する <a href="#3-set-the-hard-fork-block-number" id="3-set-the-hard-fork-block-number"></a>

所望のハードフォークをサポートするバージョンで ServiceChain バイナリをアップグレードした場合 更新されたジェネシスでチェーン設定を再初期化することで、ServiceChain内のハードフォークブロック番号を設定できます。

#### ジェネシスを更新し、すべてのServiceChainノードのチェーン設定を再初期化します <a href="#update-genesis-and-re-initialize-chain-config-for-all-servicechain-nodes" id="update-genesis-and-re-initialize-chain-config-for-all-servicechain-nodes"></a>

まず、 `genesis.json` の `config` フィールドにハードフォーク番号を指定します。 たとえば、ServiceChainでMagmaハードフォークをアクティブにしようとしている場合。 `magmaCompatibleBlock` は `config` フィールドに以下のように指定する必要があります。

```json
{
  "config": {
    "chainId": 1000,
    "istanbulCompatibleBlock": 0,
    ...
    "magmaCompatibleBlock": 1500,
...
  },
  ...
}
```

チェーン構成でハードフォークを有効にするには、以前のハードフォークを有効にする必要があります。 つまり、マグマハードフォークを有効にするには、EthTxTypeハードフォークがすでに有効になっている必要があります。 チェーン構成で先行するハードフォークの互換性のあるブロック番号のフィールドがない場合は、それらも追加する必要があります。

たとえば、マグマのハードフォークブロック番号と `遺伝子を設定したい場合などです。 son <code> は` の `ethTxTypeCompatibleBlock` を `config` フィールドに以下のように持っていません:

```json
{
  "config": {
    "chainId": 1000,
    "istanbulCompatibleBlock": 0,
    "londonCompatibleBlock": 0,
    "istanbul": {
      "epoch": 3600,
      "policy":0,
      "sub":21
    },
    ...
  }
}
```

`ethTxTypeCompatibleBlock` も追加しなければなりません。 `config` フィールドに `magmaCompatibleBlock` を追加する場合は、以下のようにします。

```json
{
  "config": {
    "chainId": 1000,
    "istanbulCompatibleBlock": 0,
    "londonCompatibleBlock": 0,
    "ethTxTypeCompatibleBlock": 1500,
    "magmaCompatibleBlock": 1500,
    "istanbul": {
      "epoch": 3600,
      "policy":0,
      "sub":21
    },
    ...
  }
}
```

Klaytn ハードフォークの歴史は、 [Klaytn Docs](../../../../misc/klaytn-history.md) にあります。

必要なハードフォークで `genesis.json` を更新した場合は、チェーン設定を再初期化して変更を適用します。

```bash
$ kscn --datadir /path/to/data/directory init /path/to/genesis.json
```

**注意** チェーンの設定を再初期化すると、以下のエラーログが出力されるのは普通です。

```
ERROR[08/02,09:12:39 Z] [48] ガバナンス指数は同じまたはそれ以上の最近のものが存在します。 ガバナンスインデックスの書き込み newIdx=0 govIdxes=[0]
```

#### 更新されたチェーン設定を確認する <a href="#confirm-the-updated-chain-config" id="confirm-the-updated-chain-config"></a>

次に、ServiceChainノードを再起動します。 たとえば、SCN ノードを以下のコマンドで再起動できます。

```bash
$ kscnd start
```

次に、SCN の Javascript コンソールで、更新されたチェーン構成を確認できます。

```bash
$ kscn attach ~/kscnd_home/klay.ipc
Welcome to the Klaytn JavaScript console!

インスタンス: Klaytn/vX.X.X/XXXX-XXXXXX/goX.X
 datadir: ~/kscnd_home
 modules: admin:1.0 debug:1.0 eth:1.0 governance:1.0 klay:1.0 klay:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0

> goverance.chainConfig.magmaCompatibleBlock
1500
```

## いくつかのハードフォークの詳細 <a href="#some-hard-fork-specifics" id="some-hard-fork-specifics"></a>

このセクションでは、特定のハードフォークの詳細について説明します。

### Magma <a href="#magma" id="magma"></a>

マグマハードフォークは、KIP-71、動的ガス料金を導入します。 これは、ガス価格の上限と下限を含みます。

デフォルトでは、上限は `75000000000000` に設定されており、下限値は `250000000000000`に設定されています。 SCN ノードの Javascript コンソールで、 [governance API](../../../../dapp/json-rpc/api-references/governance.md) を使用してこれらの境界を変更することができます。 明らかに、下限は上限を超えることはできません。

ガス価格を静的な値に設定する ガス価格の上限と下限を同じ値に設定する必要があります たとえば、SCN ノードの Javascript コンソールで `0` `governance.vote` API を使用して、ガス価格を format@@4 に設定できます。

```bash
$ kscn attach ~/kscnd_home/klay.ipc
Welcome to the Klaytn JavaScript console!

instance: Klaytn/vX.X.X/XXXX-XXXXXX/goX.X
 datadir: ~/kscnd_home
 modules: admin:1.0 debug:1.0 eth:1.0 governance:1.0 istanbul:1.0 klay:1. net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0

> governance.vote("kip71.lowerboundbasefee", 0)
"あなたの投票は準備されています。 ノードがプロポーザとしてブロックを生成したときにブロックヘッダに入れられるか、適用されます。 投票が重複している場合があります。
> goverance.vote("kip71.upperboundbasefee", 0)
"あなたの投票は準備されています。 It will be put into the block header or applied when your node generates a block as a proposer. Note that your vote may be duplicate."
```

**注** マグマのハードフォークの有効化にかかわらず、ガバナンス投票とその更新が利用可能です。 つまり、ガバナンス投票はマグマのハードフォークの活性化の前に行うこともできます。

ガス価格の上限と下限を更新するための投票が成功した場合 これらの変更は、2 istanbulエポック(エポックはブロック番号の値を持つ)の後に有効になります。

たとえば、エポックが3600の場合 ガソリン価格の上限と下限を更新するための投票は#4000ブロックに配置されています ブロック#10800から始まる変更が有効になります。 詳細には、ブロック#7200で最初のエポックに達したときに投票が確定されます。 変更は2番目のエポック(ブロック#10800)に適用されます。

エポックを確認するには、以下のように `goveranace.itemsAt` API を使用します。

```javascript
> governance.itemsAt(klay.blockNumber)
{
  governance.governancemode: "none",
  governance.governingnode: "0x05ad406f31e22b74f18c9ed65ed1ccd349bbbee0",
  governance.unitprice: 0,
  istanbul.committeesize: 21,
  istanbul.epoch: 3600,
  istanbul.policy: 0,
  kip71.basefeedenominator: 20,
  kip71.gastarget: 30000000,
  kip71.lowerboundbasefee: 25000000000,
  kip71.maxblockgasusedforbasefee: 60000000,
  kip71.upperboundbasefee: 750000000000,
  reward.deferredtxfee: false,
  reward.minimumstake: "2000000",
  reward.mintingamount: "9600000000000000000",
  reward.proposerupdateinterval: 3600,
  reward.useginicoeff: false
}
```

`istanbul.epoch` には3600ブロックの値があり、通常は1時間かかります。

時期も、 `governance.vote` API を使用して変更できます。

```javascript
> goverance.vote("istanbul.epoch", 60)
"あなたの投票は準備されています。 It will be put into the block header or applied when your node generates a block as a proposer. Note that your vote may be duplicate."
```
