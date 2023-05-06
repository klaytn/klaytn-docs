# Thử Core Cell <a id="testing-the-core-cell"></a>

Đã đến lúc kiểm tra xem Core Cell đã được cài đặt thành công chưa và nó có hoạt động như mong đợi sau khi cài đặt không.

## Tình trạng xử lý <a id="process-status"></a>

Có thể kiểm tra trạng thái quy trình của NĐT/NP bằng các lệnh trạng thái `systemctl` và `kcnd/kpnd`.

### systemctl <a id="systemctl"></a>

`systemctl` được cài đặt cùng với RPM, có thể kiểm tra trạng thái của NĐT/NP như sau.

```bash
$ systemctl status kcnd.service
● kcnd.service - (null)
   Loaded: loaded (/etc/rc.d/init.d/kcnd; bad; vendor preset: disabled)
   Active: active (running) since Wed 2019-01-09 11:42:39 UTC; 1 months 4 days ago
     Docs: man:systemd-sysv-generator(8)
  Process: 29636 ExecStart=/etc/rc.d/init.d/kcnd start (code=exited, status=0/SUCCESS)
 Main PID: 29641 (kcn)
   CGroup: /system.slice/kcnd.service
           └─29641 /usr/local/bin/kcn --networkid 1000 --datadir /kcnd_home --port 32323 --srvtype fasthttp --metrics --prometheus --verbosity 3 --txpool.global...

Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]: Starting (null)...
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal kcnd[29636]: Starting kcnd: [  OK  ]
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]: Started (null).
```

Bạn có thể kiểm tra trạng thái hiện tại như `Active: active (running)` trong ví dụ trên.

### kcnd (kpnd) <a id="kcnd-kpnd"></a>

`kcnd` (hoặc `kpnd`) được cài đặt cùng với gói và trạng thái của NĐT/NP có thể được kiểm tra như sau.

```bash
$ kcnd status
kcnd is running
```

## Nhật ký <a id="logs"></a>

Nhật ký được lưu ở `kcnd.out` (hoặc `kpnd.out`) tại đường dẫn xác định trong trường `LOG_DIR` của tập tin `kcnd.conf` (hoặc `kpnd.conf`). Khi nút hoạt động bình thường, bạn có thể thấy rằng mỗi giây sẽ có một khối được tạo như sau.

Ví dụ:

```bash
$ tail kcnd.out
INFO[02/13,07:02:24 Z] [35] Commit new mining work                    number=11572924 txs=0 elapsed=488.336µs
INFO[02/13,07:02:25 Z] [5] Imported new chain segment                blocks=1 txs=0 mgas=0.000     elapsed=1.800ms   mgasps=0.000       number=11572924 hash=f46d09…ffb2dc cache=1.59mB
INFO[02/13,07:02:25 Z] [35] Commit new mining work                    number=11572925 txs=0 elapsed=460.485µs
INFO[02/13,07:02:25 Z] [35] 🔗 block reached canonical chain           number=11572919 hash=01e889…524f02
INFO[02/13,07:02:26 Z] [14] Committed                                 address=0x1d4E05BB72677cB8fa576149c945b57d13F855e4 hash=1fabd3…af66fe number=11572925
INFO[02/13,07:02:26 Z] [5] Imported new chain segment                blocks=1 txs=0 mgas=0.000     elapsed=1.777ms   mgasps=0.000       number=11572925 hash=1fabd3…af66fe cache=1.59mB
INFO[02/13,07:02:26 Z] [35] Commit new mining work                    number=11572926 txs=0 elapsed=458.665µs
INFO[02/13,07:02:27 Z] [14] Committed                                 address=0x1d4E05BB72677cB8fa576149c945b57d13F855e4 hash=60b9aa…94f648 number=11572926
INFO[02/13,07:02:27 Z] [5] Imported new chain segment                blocks=1 txs=0 mgas=0.000     elapsed=1.783ms   mgasps=0.000       number=11572926 hash=60b9aa…94f648 cache=1.59mB
INFO[02/13,07:02:27 Z] [35] Commit new mining work                    number=11572927 txs=0 elapsed=483.436µs
```

## kcn console (kpn console) <a id="kcn-console-kpn-console"></a>

Klaytn cung cấp một CLI khách: `kcn console` (hoặc `kpn console`). Tuy nhiên, NĐT/NP có thể vô hiệu hóa giao diện RPC cho máy khách vì lý do bảo mật. Một cách khác để sử dụng máy khách là kết nối với quy trình thông qua IPC (giao tiếp giữa các quy trình).

Tập tin IPC `klay.ipc` nằm ở thư mục `data` trên NĐT/NP.

Hãy thực hiện lệnh sau và kiểm tra kết quả.

Trong trường hợp NP,

```bash
$ ken attach /var/kend/data/klay.ipc
Welcome to the Klaytn JavaScript console!

instance: Klaytn/vX.X.X/XXXX-XXXX/goX.X.X
 datadir: /var/kend/data
 modules: admin:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0
 >
```

Trong trường hợp NP,

```bash
 $ kpn attach /var/kpnd/data/klay.ipc
 Welcome to the Klaytn JavaScript console!

 instance: Klaytn/vX.X.X/XXXX-XXXX/goX.X.X
 coinbase: 0x67f68fdd9740fd7a1ac366294f05a3fd8df0ed40
 at block: 11573551 (Wed, 13 Feb 2019 07:12:52 UTC)
  datadir: /var/kpnd/data
  modules: admin:1.0 debug:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0
  >
```

Bạn có thể kiểm tra các lệnh có thể sử dụng trên [Tài liệu API](../../../dapp/json-rpc/README.md)

API hữu dụng để kiểm tra trạng thái cảu NĐT/NP:

* `klay.blockNumber` (để lấy số khối mới nhất)
* `net.peerCount` (để lấy số nút Klaytn được kết nối hiện tại)

### klay.blockNumber  <a id="klay-blocknumber"></a>

Bạn có thể lấy số khối mới nhất để xem liệu các khối được tạo (đối với NĐT) hay được truyền (đối với NĐT và NP) đúng cách không dựa trên loại nút của bạn.

```javascript
> klay.blockNumber
11573819
```

### net.peerCount  <a id="net-peercount"></a>

```javascript
> net.peerCount
14
```

Dòng lệnh trên trả về một giá trị khác dựa trên loại nút.

* NĐT: số NĐT được kết nối + số NP được kết nối.
* Np: số NĐT được kết nối + số NP được kết nối + số NĐC được kết nối.



