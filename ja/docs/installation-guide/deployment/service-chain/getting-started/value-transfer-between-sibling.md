このセクションでは、ServiceChainニュートルク間の値転送を有効にする方法を説明します。 ServiceChainによって提供される主な機能は、データアンカーと値転送を個別に使用できます。 つまり、他の機能を使用するかどうかに関係なく、データのアンカーまたは値転送のみを使用できます。

下図のように、Baobabに2つのServiceChain(chainID 1002と1004)が接続されている場合。 各サービスチェーンは Baobab を使用してデータアンカーを実行するため、データアンカーは互いに必要とされず、値転送のみが必要になります。

2 つの ServiceChain 間にブリッジがない場合、値を転送するには、まず、ServiceChain (chainID 1002) から baobab (chainID 1001) に値を転送します。 そして、再びバオバブ(chainID 1001)からServiceChain(chainID 1004)に値を転送します。 これは、ServiceChain (chainID 1002) から一度に ServiceChain (chainID 1004) に直接値転送を提供するよりも非効率です。 そのため、ServiceChains間のブリッジを直接作成することで、効率的に値を転送することができます。

![](../images/sc-vt-between-sibling-arch.png)

## Prerequisites <a id="prerequisites"></a>
- 我々は、あなたが2つのServiceChainをインストールしたと仮定します, 各サービスチェーンは、バオバブENに接続されています. [Baobab](en-scn-connection.md) への接続を参照してください。
- また、 [クロスチェーン・バリュー転送](value-transfer.md) を通じて値の転送を経験したことを想定しています。

上図のように [Baobab](en-scn-connection.md) への接続を繰り返し、ServiceChain(chianID 1004)を追加インストールします。

ノードは 1 つのメインブリッジと 1 つのサブブリッジしか持つことができません。 この例では、説明の便宜のために、SCN-L2-03 と SCN-L2-07 にブリッジを接続します。 これはまだメインブリッジとサブブリッジの両方を持たないノードです

![](../images/sc-vt-between-sibling-bridge.png)

## ステップ1: SCN-L2-03 ノードのKNIを確認する <a id="step-1-check-kni-of-scn-node"></a>
SCN-L2-03のKNIはSCNノードから接続するために使用される情報です。 この値は `main-bridges.json` を生成するときに次のステップで使用されます。

```
SCN-L2-03$ kscn attach --datadir ~/data
> mainbridge.nodeInfo.kni
"kn://...39047242eb86278689...@[::]:50505?discport=0"
```

## ステップ 2: main-bridges.json を作成 <a id="step-2-create-main-bridges-json"></a>
SCN-L2-07 (注: chianID 1004) にログオンし、 `~/data` に `main-bridges.json` を作成します。 Replace `[::]` located after `@` letter with EN node's IP address.
```
$ echo '["kni://...39047242eb86278689...@192.168.0.3:50505?discport=0"]' > ~/data/main-bridges.json
```

## ステップ3：SCNを構成して再起動する <a id="step-3-configure-scn-then-restart"></a>
SCN-L2-07 ノードのシェルから `kscn-XXXXX-amd64/conf/kscnd.conf` を編集します。 各ServiceChainはすでにBaobab ENで固定されているため、兄弟間のアンカーは必要ありません。 そこで、 `SC_ANCHORING` を 0 に設定します。

```
...
SC_SUB_BRIDGE=1
...
SC_PARENT_CHAIN_ID=1002
...
SC_ANCHORING=0
...
```

SCN-L2-07 ノードで kscnd を再起動します
```
SCN-L2-07$ kscnd stop
Shuting down kscnd: Killed
SCN-L2-07$ kscnd start
Starting kscnd: OK
```

SCN-L2-07がSCN-L2-03に接続されているかどうかを確認する `subbridge.peers.length`
```
SCN-L2-07$ kscn attach --datadir ~/data
> subbridge.peers.length
1
```

価値転送の場合 chainID 1002に対応する情報がメインブリッジ情報として使用され、chainID 1004に対応する情報がサブブリッジとして設定されている場合。 [クロスチェーン値転送](value-transfer.md)のように、兄弟要素間で値の転送が可能です。
