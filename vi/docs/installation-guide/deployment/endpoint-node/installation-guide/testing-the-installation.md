# Thử việc cài đặt <a id="testing-the-installation"></a>

Đã đến lúc kiểm tra xem Nút điểm cuối đã được cài đặt thành công chưa và nó có hoạt động như mong đợi sau khi cài đặt không.

## Tình trạng xử lý <a id="process-status"></a>

Có thể kiểm tra trạng thái quy trình của EN bằng các lệnh trạng thái `systemctl` và `kend`.

### systemctl <a id="systemctl"></a>

`systemctl` được cài đặt cùng với RPM; có thể kiểm tra trạng thái của EN như sau.

```bash
$ systemctl trạng thái kend.service
● kend.service - (null)
   Loaded: loaded (/etc/rc.d/init.d/kend; bad; vendor preset: disabled)
   Active: active (running) since Wed 2019-01-09 11:42:39 UTC; 1 months 4 days ago
     Docs: man:systemd-sysv-generator(8)
  Process: 29636 ExecStart=/etc/rc.d/init.d/kend start (code=exited, trạng thái=0/SUCCESS)
 Main PID: 29641 (ken)
   CGroup: /system.slice/kend.service
           └─29641 /usr/local/bin/ken --networkid 1000 --datadir /kend_home --port 32323 --srvtype fasthttp --metrics --prometheus --verbosity 3 --txpool.global...

Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]: Starting (null)...
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal kend[29636]: Starting kend: [  OK  ]
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]: Started (null).
```

Bạn có thể kiểm tra trạng thái hiện tại như `Active: active (running)` trong ví dụ bên dưới.

### kend <a id="kend"></a>

`kend` được cài đặt cùng với gói; trạng thái của EN có thể được kiểm tra như sau.

```bash
$ kend trạng thái
kend is running
```

## Nhật ký <a id="logs"></a>

Nhật ký được lưu trữ trong tập tin `kend.out` được đặt tại đường dẫn xác định trong trường `LOG_DIR` của tập tin `kend.conf`. Khi nút hoạt động bình thường, bạn có thể thấy rằng mỗi khối được nhập theo từng giây như sau.

Ví dụ:

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

## Truy vấn <a id="queries"></a>

### ken console <a id="ken-console"></a>

Klaytn cung cấp một máy khách CLI: `ken console`. Một cách khác để sử dụng máy khách là kết nối với quy trình thông qua IPC (giao tiếp giữa các quy trình). Tập tin IPC `klay.ipc` được đặt tại thư mục `data` trên một EN.

Hãy thực hiện lệnh sau và kiểm tra kết quả.

```text
$ ken attach /var/kend/data/klay.ipc
Chào mừng bạn đến với bảng điều khiển Klaytn JavaScript!

instance: Klaytn/vX.X.X/XXXX-XXXX/goX.X.X
 datadir: /var/kend/data
 modules: admin:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0
 >
```

Bạn có thể kiểm tra các lệnh có thể sử dụng trên [Tài liệu API](../../../../dapp/json-rpc/README.md)

Các API hữu ích để kiểm tra trạng thái của EN:

* `klay.blockNumber` (để lấy số khối mới nhất)
* `net.peerCount` (để lấy số nút Klaytn được kết nối hiện tại)

### klay.blockNumber <a id="klay-blocknumber"></a>

Bạn có thể lấy số khối mới nhất để xem các khối có được truyền đúng cách không.

```text
> klay.blockNumber
11573819
```

### net.peerCount <a id="net-peercount"></a>

```text
> net.peerCount
14
```

Dòng lệnh trên trả về số nút mà EN kết nối đến.





