# Kiểm tra trạng thái nút <a id="checking-node-status"></a>

## Tình trạng xử lý <a id="process-status"></a>

Có thể kiểm tra trạng thái quy trình của SCN bằng các lệnh trạng thái `systemctl` và `kscnd`.

### systemctl <a id="systemctl"></a>

`systemctl` được cài đặt cùng với RPM, có thể kiểm tra trạng thái của SCN như sau.

```bash
$ systemctl trạng thái kscnd.service
● kscnd.service - (null)
   Loaded: loaded (/etc/rc.d/init.d/kscnd; bad; vendor preset: disabled)
   Active: active (running) since Wed 2019-01-09 11:42:39 UTC; 1 months 4 days ago
     Docs: man:systemd-sysv-generator(8)
  Process: 29636 ExecStart=/etc/rc.d/init.d/kscnd start (code=exited, trạng thái=0/SUCCESS)
 Main PID: 29641 (kscn)
   CGroup: /system.slice/kscnd.service
           └─29641 /usr/local/bin/kscn --networkid 1000 --datadir ~/kscnd_home --port 32323 --srvtype fasthttp --metrics --prometheus --verbosity 3 --txpool.global...

Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]: Starting (null)...
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal kscnd[29636]: Starting kscnd: [  OK  ]
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]: Started (null).
```

Bạn có thể kiểm tra trạng thái hiện tại như `Active: active (running)` trong ví dụ bên dưới.

### kscnd <a id="kscnd"></a>

`kscnd` được cài đặt cùng với gói; trạng thái của SCN có thể được kiểm tra như sau.

```bash
$ kscnd trạng thái
kscnd đang chạy
```

## Nhật ký <a id="logs"></a>

Nhật ký được lưu trữ trong tập tin `kscnd.out` được đặt tại đường dẫn xác định trong trường `LOG_DIR` của tập tin `kscnd.conf`. Khi nút hoạt động bình thường, bạn có thể thấy rằng mỗi khối được nhập theo từng giây như sau.

Ví dụ:

```bash
$ tail -F ~/kscnd_home/nhật ký/kscnd.out
  INFO[11/12,10:19:09 +09] [49] Khối đào đã được ghi thành công            num=11 hash=03da06…f194b0 txs=0
  INFO[11/12,10:19:09 +09] [49] Cam kết công việc đào mới                    number=12 txs=0 elapsed=236.972µs
  INFO[11/12,10:19:10 +09] [24] Đã cam kết                                 number=12 hash=470aca…be4fdf address=0xf8690562c0839C44B17AF421F7AaaA9F12dCc62b
  INFO[11/12,10:19:10 +09] [49] Khối mới đã niêm phong thành công             number=12 hash=470aca…be4fdf
  INFO[11/12,10:19:10 +09] [49] Khối đào đã được ghi thành công            num=12 hash=470aca…be4fdf txs=0
  INFO[11/12,10:19:10 +09] [49] Cam kết công việc đào mới                    number=13 txs=0 elapsed=198.221µs
  INFO[11/12,10:19:11 +09] [24] Đã cam kết                                 number=13 hash=95e4a3…14e50f address=0xf8690562c0839C44B17AF421F7AaaA9F12dCc62b
  INFO[11/12,10:19:11 +09] [49] Khối mới đã niêm phong thành công             number=13 hash=95e4a3…14e50f
  INFO[11/12,10:19:11 +09] [49] Khối đào đã được ghi thành công            num=13 hash=95e4a3…14e50f txs=0
  INFO[11/12,10:19:11 +09] [49] Cam kết công việc đào mới                    number=14 txs=0 elapsed=220.004µs
  INFO[11/12,10:19:12 +09] [24] Đã cam kết                                 number=14 hash=dcd2bc…b2aec0 address=0xf8690562c0839C44B17AF421F7AaaA9F12dCc62b
```

## Truy vấn <a id="queries"></a>

### kscn console <a id="kscn-console"></a>

Klaytn cung cấp một máy khách CLI: `kscn console`. Một cách khác để sử dụng máy khách là kết nối với quy trình thông qua IPC (giao tiếp giữa các quy trình). Tập tin IPC `klay.ipc` được đặt tại thư mục `data` trên một SCN.

Hãy thực hiện lệnh sau và kiểm tra kết quả.

```text
$ kscn attach ~/kscnd_home/klay.ipc
Chào mừng bạn đến với bảng điều khiển Klaytn JavaScript!

phiên bản: Klaytn/vX.X.X/XXXX-XXXX/goX.X.X
tại khối: 11573551 (thứ Tư ngày 13/02/2019 lúc 07:12:52 UTC)
 datadir: ~/kscnd_home
 modules: admin:1.0 debug:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0
 >
```

Bạn có thể kiểm tra các lệnh có thể sử dụng trên [Tài liệu API](../../../../../dapp/json-rpc/README.md)

Các API hữu ích để kiểm tra trạng thái của SCN:

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
4
```

Dòng lệnh trên trả lại số nút mà SCN kết nối, ngoại trừ EN trong chuỗi chính.


