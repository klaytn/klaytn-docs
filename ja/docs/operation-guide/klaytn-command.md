# よく使われるKlaytnコマンド <a id="klaytn-command"></a>



## Klaytn Directoryの検索方法 (通常は「Klaytn DIR」)

---
Klaytn ディレクトリは `kcn` または `kpn` の設定で確認できます。 Config ファイルは `/etc/kcnd/conf` または `/etc/kpnd/conf` の下にあります。

```bash
cat /etc/kcnd/conf/kcnd.conf (または /etc/kpnd/conf/kpnd.conf)

# 以下の例として、DATA_DIRとLOG_DIRのパスを見つける
DIR=/var/kcnd/data/
LOG_DIR=/var/kcnd/logs/
```

## Klaytn コンソールに接続する方法

---
ノードとネットワークの状態を確認するには、Klaytn APIに接続してください。

```bash
# 以下のコマンドを Klaytn DATA_DIR パスで実行
$ sudo kcn attach klay.ipc
> 
```

## 便利な API

```bash
# Check current block Number
  > klay.blockNumber

# Check my kni address
  > admin.nodeInfo

# Check my dode address
  > governance.nodeAddress

# Check other connected nodes
  > admin.peers

# Add or remove nodes
  > admin.addPeer("kni")
  > admin.removePeer("kni")
```

## API 結果のみを取得する方法

```jsx
# execute the command below in the Klaytn DATA_DIR Path
$ sudo kcn attach --exec <statement> klay.ipc

e.g.
# Check my dode address
$ sudo kcn attach --exec "governance.nodeAddress" klay.ipc
"0xda23978e6e354fbf25dd87aaf1d1bb4ed112753f"
```
