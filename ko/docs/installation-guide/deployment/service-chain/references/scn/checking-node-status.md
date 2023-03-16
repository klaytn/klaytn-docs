# 노드 상태 확인<a id="checking-node-status"></a>

## Process Status <a id="process-status"></a>

`systemctl`과 `kscnd`의 status 명령어를 사용하여 SCN의 프로세스 상태를 확인할 수 있습니다.

### systemctl <a id="systemctl"></a>

`systemctl`은 RPM과 함께 설치되며 SCN의 상태는 다음과 같이 확인할 수 있습니다.

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

Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]: Starting (null)...
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal kscnd[29636]: Starting kscnd: [  OK  ]
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]: Started (null).
```

You can check the current status such as `Active: active (running)` in the example above.

### kscnd <a id="kscnd"></a>

`kscnd`는 패키지와 함께 설치되며 SCN의 상태는 다음과 같이 확인할 수 있습니다.

```bash
$ kscnd status
kscnd is running
```

## Logs <a id="logs"></a>

로그는 `kscnd.out` 파일에 저장되어 있고, 이 파일은 `kscnd.conf` 파일의 `LOG_DIR` 필드에서 정의된 경로에 있습니다. When the node works properly, you can see that each block is imported per second as follows.

Example:

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

## Queries <a id="queries"></a>

### kscn 콘솔 <a id="kscn-console"></a>

Klaytn은 `kscn console`이라는 CLI 클라이언트를 제공합니다. Another way of using the client is to connect to the process via IPC (inter-process communication). `klay.ipc` IPC 파일은 SCN의 `data` 디렉토리에 있습니다.

Please execute the following command and check out the result.

```text
$ kscn attach ~/kscnd_home/klay.ipc
Welcome to the Klaytn JavaScript console!

instance: Klaytn/vX.X.X/XXXX-XXXX/goX.X.X
at block: 11573551 (Wed, 13 Feb 2019 07:12:52 UTC)
 datadir: ~/kscnd_home
 modules: admin:1.0 debug:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0
 >
```

You can check the usable commands on [API Document](../../../../../dapp/json-rpc/README.md)

SCN의 상태를 확인하기 위해 다음의 API를 사용할 수 있습니다.

* `klay.blockNumber` (to get the latest block number)
* `net.peerCount` (to get the number of the connected Klaytn nodes currently)

### klay.blockNumber <a id="klay-blocknumber"></a>

You can get the latest block number to see if blocks are propagated properly.

```text
> klay.blockNumber
11573819
```

### net.peerCount <a id="net-peercount"></a>

```text
> net.peerCount
4
```

위 명령은 메인체인의 EN을 제외하고 SCN이 연결한 노드의 수를 반환합니다.


