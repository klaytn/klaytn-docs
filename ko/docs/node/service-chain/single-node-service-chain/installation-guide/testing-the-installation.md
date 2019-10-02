# 설치 테스트

## 프로세스 상태

It is possible to check the status of SCN's process using the status commands `systemctl` and `kscnd`.

### systemctl

`systemctl` is installed along with the RPM, and the status of SCN can be checked as follows.

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

위 예시처럼 `Active: active (running)` 등의 현재 상태를 확인할 수 있습니다.

### kscnd

`kscnd` is installed along with the package, and the status of SCN can be checked as follows.

```bash
$ kscnd status
kscnd is running
```

## 로그

로그는 `kscnd.out` 파일에 저장되어 있고, 이 파일은 `LOG_DIR` field of the `kscnd.conf` 파일의 <0>LOG_DIR</0> 필드에서 정의된 경로에 있습니다. 노드가 제대로 작동하면 다음과 같이 매초 블록을 가져오는 것을 볼 수 있습니다.

예시:

```bash
$ tail kscnd.out
INFO[02/13,07:02:24 Z] [35] Commit new mining work                    number=11572924 txs=0 elapsed=488.336µs
INFO[02/13,07:02:25 Z] [5] Imported new chain segment                blocks=1 txs=0 mgas=0.000     elapsed=1.800ms   mgasps=0.000       number=11572924 hash=f46d09…ffb2dc cache=1.59mB
INFO[02/13,07:02:25 Z] [35] Commit new mining work                    number=11572925 txs=0 elapsed=460.485µs
INFO[02/13,07:02:25 Z] [35] 🔗 block reached canonical chain           number=11572919 hash=01e889…524f02
INFO[02/13,07:02:26 Z] [14] Committed                                 address=0x1d4E05BB72677cB8fa576149c945b57d13F855e4 hash=1fabd3…af66fe number=11572925
INFO[02/13,07:02:26 Z] [5] Imported new chain segment                blocks=1 txs=0 mgas=0.000     elapsed=1.777ms   mgasps=0.000       number=11572925 hash=1fabd3…af66fe cache=1.59mB
INFO[02/13,07:02:26 Z] [35] Commit new mining work                    number=11572926 txs=0 elapsed=458.665µs
INFO[02/13,07:02:27 Z] [14] Committed                                 address=0x1d4E05BB72677cB8fa576149c945b57d13F855e4 hash=60b9aa…94f648 number=11572926
INFO[02/13,07:02:27 Z] [5] Imported new chain segment                blocks=1 txs=0 mgas=0.000     elapsed=1.783ms   mgasps=0.000       number=11572926 hash=60b9aa…94f648 cache=1.59mB
INFO[02/13,07:02:27 Z] [35] Commit new mining work      
```

## 쿼리

### kscn console

Klaytn provides a CLI client: `kscn console`. Another way of using the client is to connect to the process via IPC (inter-process communication). The IPC file `klay.ipc` is located in the `data` directory on an SCN.

다음 명령을 실행하고 결과를 확인하세요.

```text
$ kscn attach ~/kscnd_home/klay.ipc
Welcome to the Klaytn JavaScript console!

instance: Klaytn/vX.X.X/XXXX-XXXX/goX.X.X
at block: 11573551 (Wed, 13 Feb 2019 07:12:52 UTC)
 datadir: ~/kscnd_home
 modules: admin:1.0 debug:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0
 >
```

[API 문서](../../../../bapp/json-rpc/README.md)를 보시면 유용한 명령어들을 확인할 수 있습니다.

The useful APIs to check the status of SCN:

* `klay.blockNumber` (to get the latest block number)
* `net.peerCount` (to get the number of the connected Klaytn nodes currently)

### klay.blockNumber

최신 블록 번호를 가져와 블록이 제대로 전파되었는지 확인할 수 있습니다.

```text
> klay.blockNumber
11573819
```

### net.peerCount

```text
> net.peerCount
4
```

The above command line returns the number of nodes that the SCN connects to  without EN in main chain..



