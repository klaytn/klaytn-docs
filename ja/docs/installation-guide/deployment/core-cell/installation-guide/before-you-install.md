# インストールする前に <a id="before-you-install"></a>

Klaytn パッケージをインストールする前に、ノード URI を登録するために関連付けられたノード情報を作成する必要があります。 CC演算子にはKgenパッケージが用意されていますので、以下の手順に従ってください。

1. `kgen` パッケージをダウンロード
2. ノードキー & ノード URI 作成
3. ノード URI 登録

## Download `kgen` Package <a id="download-kgen-package"></a>

まず、オペレーティングシステムに応じて、最新バージョンの `kgen` パッケージを [ダウンロード](download.md) ページでダウンロードできます。

`kgen` のバイナリファイルは `bin` ディレクトリの下にあります。

## ノードキー & ノード URI 作成 <a id="node-key-node-uri-creation"></a>

ノードキーとノード URI は最初に一度だけ作成されます。 ノード URI は、コア セル ネットワークの他のコア セルと共有する必要があります。 CNは他のCNと接続し、PNはCNと一部のPNは作成されたノードURIを使用して接続します。 ダウンロードした `kgen` を使用してノードキーに基づいてノード URI が作成されます。 以下のコマンドラインは `nodekey` と `node_info.json` を作成します。

`kgen` は、関連するIPとポート番号を以下のように取ります。

```text
$ kgen --ip "123.456.789.012" --port 32323 --file
$ ls
nodekey node_info.json
```

`nodekey` は 64 バイトの 16 進数文字列で、内部的にノードで使用される秘密鍵です。 この秘密鍵は Klaytn データディレクトリに存在し、それを失わないように注意してください。

```text
$ cat nodekey
f08f2118c455a6c9b5e035d3571e570a719ea61771e268546e796a264acc2b
$ mv nodekey ~/kcnd_home
```

作成されたファイル `node_info.json` には以下の内容が含まれます。

| キー名         | Description                   | Example                                                                                                                                                                 |
|:----------- |:----------------------------- |:----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NodeAddress | 関連付けられたノードのアドレス               | 0xc8a23d67f2471066fa1b07270651fea7e5c0cf78                                                                                                                              |
| NodeKey     | ノードキー \(a.k.a private key\) | aaa7248dfdf19418ae9121a0f39db39c5c27a3e404ea7c1b8e020ca8dbe7e71a                                                                                                        |
| NodeURI     | node URI                      | kni://4f2f47f3bf35a2c576d3345e6e9c49b147d510c05832d2458709f63c3c90c76ead205975d944ed65e77dd4c6f63ebe1ef21d60da95952bc1e200e7487f4d9e1b@123.456.789.012:32323?discport=0 |

`node_info.json` には以下のように JSON 形式のノード情報が含まれています。

```text
$ cat node_info.json
{
    "NodeAddress": "0xc8a23d67f2471066fa1b07270651fea7e5c0cf78",
    "NodeKey": "aaa7248dfdf19418ae9121a0f39db39c5c27a3e404ea7c1b8e020ca8dbe7e71a",
    "NodeURI": "kni://4f2f47f3bf35a2c576d3345e6e9c49b147d510c05832d2458709f63c3c90c76ead205975d944ed65e77dd4c6f63ebe1ef21d60da95952bc1e200e7487f4d9e1b@123.456.789.012:32323?discport=0"
}
```

## ノード URI 登録 <a id="node-uri-enrollment"></a>

作成されたノード URI は、Core Cell Network \(CCN\) に参加するために登録する必要があります。 入学手続きは以下のとおりです。

1. `kgen` \(`node_info.json`\) に関連する IP とポート番号を含むノード URI を作成します。
2. 情報を公式のKlaytnメールアドレス\(`bootstrap@klaytn.com` の Cypress または `baob@klaytn.com` の Baobab\) に送信します。

登録された情報は、公式のKlaytnメールアドレスに送信されます。 フォーマットは以下の通りです。

CNの場合

```text
Company: Kakao
CN URI : kni://
4f2f47f3bf35a2c576d3345e6e9c49b147d510c05832d2458709f63c3c90c76ead205975d944ed65e77dd4c6f63ebe1ef21d60da95952bc1e200e7487f4d9e1b@123.456.789.012:32323?discport=0
```

PNの場合

```text
Company: Kakao
PN URI : kni://
4f2f47f3bf35a2c576d3345e6e9c49b147d510c05832d2458709f63c3c90c76ead205975d944ed65e77dd4c6f63ebe1ef21d60da95952bc1e200e7487f4d9e1b@123.456.789.012:32323?discport=0
```

