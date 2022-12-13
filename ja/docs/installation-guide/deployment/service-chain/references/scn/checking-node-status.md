# ノード状態を確認中 <a id="checking-node-status"></a>

## プロセスの状態 <a id="process-status"></a>

ステータスコマンド `systemctl` と `kscnd` を使用してSCNのプロセスの状態を確認することができます。

### systemctl <a id="systemctl"></a>

`systemctl` がRPMとともにインストールされ、SCNの状態を以下のように確認することができます。

```bash
$ systemctl status kscnd.service
● kscnd.service - (null)
   Loaded: loaded (/etc/rc.d/init.d/kscnd; bad; vendor preset: disabled)
   Active: active (running) since Wed 2019-01-09 11:42:39 UTC; 1 months 4 days ago
     Docs: man:systemd-sysv-generator(8)
  Process: 29636 ExecStart=/etc/rc.d/init.d/kscnd start (code=exited, status=0/SUCCESS)
 Main PID: 29641 (kscn)
   CGroup: /system.slice/kscnd.service
           └─29641 /usr/local/bin/kscn --networkid 1000 --datadir ~/kscnd_home --port 32323 --srvtype fasthttp --metrics --prometheus --verbosity 3 --txpool.global...

Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]: 開始 (null) ...
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal kscnd[29636]: Starting kscnd: [ OK ]
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.computee.internal systemd[1]: Started (null).
```

上記の例では、 `Active: active (running)` のような現在のステータスを確認できます。

### kscnd <a id="kscnd"></a>

`kscnd` はパッケージとともにインストールされ、SCNの状態を以下のように確認することができます。

```bash
$ kscnd status
kscnd is running
```

## ログ <a id="logs"></a>

The log is stored in `kscnd.out` file located in the path defined in the `LOG_DIR` field of the `kscnd.conf` file. ノードが正常に動作すると、各ブロックが以下のようにインポートされます。

例

```bash
$ tail -F ~/kscnd_home/logs/kscnd.out
  INFO[11/12,10:19:09 +09] [49] Successfully wrote mined block            num=11 hash=03da06…f194b0 txs=0
  INFO[11/12,10:19:09 +09] [49] Commit new mining work                    number=12 txs=0 elapsed=236.972µs
  INFO[11/12,10:19:10 +09] [24] Committed                                 number=12 hash=470aca…be4fdf address=0xf8690562c0839C44B17AF421F7AaaA9F12dCc62b
  INFO[11/12,10:19:10 +09] [49] Successfully sealed new block             number=12 hash=470aca…be4fdf
  INFO[11/12,10:19:10 +09] [49] Successfully wrote mined block            num=12 hash=470aca…be4fdf txs=0
  INFO[11/12,10:19:10 +09] [49] Commit new mining work                    number=13 txs=0 elapsed=198.221µs
  INFO[11/12,10:19:11 +09] [24] Committed                                 number=13 hash=95e4a3…14e50f address=0xf8690562c0839C44B17AF421F7AaaA9F12dCc62b
  INFO[11/12,10:19:11 +09] [49] Successfully sealed new block             number=13 hash=95e4a3…14e50f
  INFO[11/12,10:19:11 +09] [49] Successfully wrote mined block            num=13 hash=95e4a3…14e50f txs=0
  INFO[11/12,10:19:11 +09] [49] Commit new mining work                    number=14 txs=0 elapsed=220.004µs
  INFO[11/12,10:19:12 +09] [24] Committed                                 number=14 hash=dcd2bc…b2aec0 address=0xf8690562c0839C44B17AF421F7AaaA9F12dCc62b
```

## クエリ <a id="queries"></a>

### kscnコンソール <a id="kscn-console"></a>

Klaytn は CLI クライアントを提供します: `kscn コンソール`。 クライアントを使用するもう一つの方法は、IPC(プロセス間通信)を介してプロセスに接続することです。 IPCファイル `klay.ipc` は、SCN の `data` ディレクトリにあります。

以下のコマンドを実行し、結果を確認してください。

```text
$ kscn attach ~/kscnd_home/klay.ipc
Klaytn JavaScript コンソールへようこそ!

instance: Klaytn/vX.X.X/XXXX-XXXX/goX.X.X
at block: 11573551 (Wed, 13 Feb 2019 07:12:52 UTC)
 datadir: ~/kscnd_home
 modules: admin:1.0 debug:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0
 >
```

使用可能なコマンドは [API ドキュメント](../../../../bapp/json-rpc/README.md) で確認できます。

SCNのステータスを確認するのに役立つAPI:

* `klay.blockNumber` (最新のブロック番号を取得する)
* `net.peerCount` (現在接続されている Klaytn ノードの数を取得する)

### klay.blockNumber <a id="klay-blocknumber"></a>

最新のブロック番号を取得して、ブロックが正しく伝播されているかどうかを確認できます。

```text
> klay.blockNumber
11573819
```

### net.peerCount <a id="net-peercount"></a>

```text
> net.peerCount
4
```

上記のコマンドラインは、メインチェーン内のENを除くSCNが接続するノードの数を返します。


