# KNI <a id="KNI"></a>

**KNI (Klaytn Network Identifier)** は、Klaytn ノードを識別するための URL スキームです。 構文は以下の通りである。
```
knif://<nodeID>@<hostname>:<port>?subport=<subport>&discport=<discport>
```
![KNI scheme](../images/kni_scheme.png)

**nodeID** は、ノードの秘密鍵に対応する 512 ビットの公開鍵です。 これは、p2pネットワーク上のピアとの通信を検証するために使用されます。

**ホスト名** は `@` と `:` の間にあるノードのアドレスを記述する。 アドレスの書式は次のいずれかになります:
* IPv4 ドットdecimal (`192.0.2.1`)
* IPv6 (`[2001:db8::68]`)
* IPv4 マップIPv6 (`[2001:db8:3c4d:15::abcd:ef12]`)
* ドメイン名 (`your.node.com`)

**ポート** は、TCP を介してピアノードとの接続に使用されます。 Klaytn では、デフォルトの `ポート` は `32323` で、デフォルト `サブポート` は `32324` です。 デフォルトの `サブポート` は `kend.conf` で `ポート + 1` として設定されていることに注意してください。 TCPリスニングポートの数に応じて、Klaytnは2つの [タイプのコネクション](./multiport.md)を提供します。

**discport** は、既知の隣人が到達可能な klaytn ノードであるかどうかをチェックし、新しい接続のために隣人のアドレスをフェッチするために使われる。 これはUDPポートであることに注意してください。 デフォルトでは、UDP ポートまたは `discport`は、TCP ポートと同じポートを使用します。 ノードが `discport`に別のポートを使用する場合、 `discport` クエリパラメータによって指定することができます。

The following two URLs shows a KNI example of a node having IP address `10.0.0.1` and TCP listening port `32323` and `32324`. If `discport` is omitted, it is set to the UDP port of `32323`, same as the value of `port`.
```
knif://a979...163c@10.0.0.0.1:32323 # シングルチャネルまたはマルチチャネルのピアが省略されたサブポート
kn://a979...163c@10.0.0.0.1:32323?subport=32324 # マルチチャネルのピア
```

次の 2 つは、 `discport` の `30301` を持つノードの KNI例です。
```
kni://a979...163c@10.0.0.0.1:32323?discport=30301 # 単一チャンネルまたはマルチチャンネルピアのいずれかを省略したサブポート
kn://a979...163c@10.0.0.0.1:32323?subport=32324&discport=30301 # multi-channel peer
```

ノードのKNIの生成方法を知りたい場合は、 [ノードキー & ノードURI作成](../../node/core-cell/installation-guide/before-you-install.md#node-key-node-uri-creation) を参照してください。 The KNI scheme is used in node discovery protocol, [setting `static-nodes.json` file](../../node/core-cell/installation-guide/proxy-node-setup/configuration.md#install-static-nodes-json), [addPeer API](../../dapp/json-rpc/api-references/admin.md#admin_addpeer), [bootnodes option](../../node/endpoint-node/operation-guide/configuration.md#properties) and etc.
