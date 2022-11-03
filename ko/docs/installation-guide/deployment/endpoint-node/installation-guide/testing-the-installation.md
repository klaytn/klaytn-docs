# 설치 테스트 <a id="testing-the-installation"></a>

엔드포인트 노드가 성공적으로 설치되어 잘 작동하는지 점검해보겠습니다.

## 프로세스 상태 <a id="process-status"></a>

상태 명령 `systemctl`과 `kend`을 사용하여 EN의 프로세스 상태를 확인할 수 있습니다.

### systemctl <a id="systemctl"></a>

`systemctl`은 RPM과 함께 설치되며 EN의 상태는 다음과 같이 확인할 수 있습니다.

```bash
$ systemctl status kend.service
● kend.service - (null)
   Loaded: loaded (/etc/rc.d/init.d/kend; bad; vendor preset: disabled)
   Active: active (running) since Wed 2019-01-09 11:42:39 UTC; 1 months 4 days ago
     Docs: man:systemd-sysv-generator(8)
  Process: 29636 ExecStart=/etc/rc.d/init.d/kend start (code=exited, status=0/SUCCESS)
 Main PID: 29641 (ken)
   CGroup: /system.slice/kend.service
           └─29641 /usr/local/bin/ken --networkid 1000 --datadir /kend_home --port 32323 --srvtype fasthttp --metrics --prometheus --verbosity 3 --txpool.global...

Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]: Starting (null)...
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal kend[29636]: Starting kend: [  OK  ]
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]: Started (null).
```

위 예시처럼 `Active: active (running)` 등의 현재 상태를 확인할 수 있습니다.

### kend <a id="kend"></a>

`kend`은 패키지와 함께 설치되며 EN의 상태는 다음과 같이 확인할 수 있습니다.

```bash
$ kend status
kend is running
```

## 로그 <a id="logs"></a>

로그는 `kend.out` 파일에 저장되어 있고, 이 파일은 `LOG_DIR` field of the `kend.conf` 파일의 <0>LOG_DIR</0> 필드에서 정의된 경로에 있습니다. 노드가 제대로 작동하면 다음과 같이 매초 블록을 가져오는 것을 볼 수 있습니다.

예시:

```bash
$ tail kend.out
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

## 쿼리 <a id="queries"></a>

### ken 콘솔 <a id="ken-console"></a>

Klaytn은 `ken console`이라는 CLI 클라이언트를 제공합니다. 클라이언트를 사용하는 또 다른 방법은 IPC (inter-process communication)를 통해 프로세스에 연결하는 것입니다. `klay.ipc` IPC 파일은 EN의 `data` 디렉토리에 있습니다.

다음 명령을 실행하고 결과를 확인하세요.

```text
$ ken attach /var/kend/data/klay.ipc
Welcome to the Klaytn JavaScript console!

instance: Klaytn/vX.X.X/XXXX-XXXX/goX.X.X
 datadir: /var/kend/data
 modules: admin:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0
 >
```

You can check the usable commands on [API Document](../../../dapp/json-rpc/README.md)

EN의 상태를 확인하는 유용한 API는 다음과 같습니다.

* `klay.blockNumber` (최신 블록 번호를 가져옵니다)
* `net.peerCount` (현재 연결된 Klaytn 노드의 수를 가져옵니다)

### klay.blockNumber <a id="klay-blocknumber"></a>

최신 블록 번호를 가져와 블록이 제대로 전파되었는지 확인할 수 있습니다.

```text
> klay.blockNumber
11573819
```

### net.peerCount <a id="net-peercount"></a>

```text
> net.peerCount
14
```

위 명령은 EN이 연결한 노드의 수를 반환합니다.





