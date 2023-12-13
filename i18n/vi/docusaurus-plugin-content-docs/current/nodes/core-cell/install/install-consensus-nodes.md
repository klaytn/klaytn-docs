# Thiết lập nút đồng thuận

## Tải về <a id="download"></a>

Bạn có thể tải về phiên bản mới nhất của `kcn` trên trang [Tải xuống](../../downloads/downloads.md).

## Cài đặt <a id="installation"></a>

### Phân bổ lưu trữ Linux <a id="linux-archive-distribution"></a>

Tập tin lưu trữ bao gồm tập tin nhị phân thực thi và cấu hình có cấu trúc như sau.

**Lưu ý**: KHÔNG thay đổi cấu trúc hoặc tên tập tin. Nếu bạn thay đổi điều đó, nút có thể sẽ không hoạt động đúng.

```text
- bin
  |- kcn
  |- kcnd
- conf
  |- kcnd.conf
```

| Tên tập tin    | Mô tả tập tin                    |
|:-------------- |:-------------------------------- |
| bin/kcn        | Tập tin thực thi CN              |
| bin/kcnd       | Tập tin lệnh bắt đầu/kết thúc CN |
| conf/kcnd.conf | Tập tin cấu hình CN              |

Quá trình cài đặt chính là giải nén gói đã tải về tại nơi bạn muốn cài đặt gói.

```bash
$ tar zxf kcn-vX.X.X-linux-amd64.tar.gz
```

Hoặc,

```bash
$ tar zxf kcn-baobab-vX.X.X-linux-amd64.tar.gz
```

**Lưu ý**: nên thêm đường dẫn thư mục chưa giải nén `kcn-linux-amd64/bin` vào biến môi trường `$PATH` để chạy `kcn` và `kcnd` trên toàn hệ thống. Ví dụ,

```bash
$ export PATH=$PATH:~/downloaded/path/kcn-linux-amd64/bin
```

Các phần khác giả định rằng đường dẫn đã được thêm vào biến.

### Phân bổ RPM \(RHEL/CentOS/Fedora\) <a id="rpm-rhel-centos-fedora"></a>

Bạn có thể cài đặt RPM đã tải về với lệnh `yum` sau đây.

```bash
$ yum install kcnd-vX.X.X.el7.x86_64.rpm
```

Hoặc,

```bash
$ yum install kcnd-baobab-vX.X.X.el7.x86_64.rpm
```

### Cài đặt từ Klaytn Yum Repo <a id="install-from-klaytn-yum-repo"></a>

Ngoài ra, bạn có thể cài đặt `kcnd` từ Klaytn Yum repo, chạy:

```bash
$ sudo curl -o /etc/yum.repos.d/klaytn.repo https://packages.klaytn.net/config/rhel/7/prod.repo && sudo yum install kcnd
```

### Vị trí đã cài đặt <a id="installed-location"></a>

Tập tin đã cài đặt nằm ở vị trí như sau.

| Tên tập tin | Vị trí                   |
|:----------- |:------------------------ |
| kcn         | /usr/bin/kcn             |
| kcnd.conf   | /etc/kcnd/conf/kcnd.conf |

## Cấu hình <a id="configuration"></a>

Cấu hình CN dùng để tạo thư mục dữ liệu và thiết lập các giá trị trong tập tin cấu hình `kcnd.conf`.

1. Tạo thư mục dữ liệu CN.
2. Cài đặt khóa nút
3. Định cấu hình CN với `kcnd.conf`.

### Tạo thư mục dữ liệu CN <a id="cn-data-directory-creation"></a>

Kích thước của dữ liệu blockchain Klaytn sẽ luôn tăng lên thế nên cần sử dụng một dung lượng lưu trữ đủ lớn. Bạn có thể cần phải tạo thư mục trên đường dẫn bạn muốn.

```bash
$ mkdir -p /var/kcnd/data
```

### Cài đặt Khóa nút <a id="install-node-key"></a>

Để vận hành CN cần có `khóa nút`. Nhị phân KCN sẽ tạo ra một nút mới nếu bạn không có sẵn. Nếu bạn đã có, bạn cần chuyển `khóa nút` vào thư mục dữ liệu CN. Cách để tạo `khóa nút` được mô tả trong phần '[Trước khi bạn cài đặt](./before-you-install.md)'. Dòng lệnh sau sao chép`khóa nút` vào thư mục dữ liệu CN.

```bash
$ cp nodekey /var/kcnd/data
```

### Cập nhật Tập tin cấu hình <a id="update-the-configuration-file"></a>

Vị trí tập tin cấu hình:

* Nếu phân bổ lưu trữ, vị trí thư mục cấu hình mặc định là `$INSTALL_PATH/kcn-linux-amd64/conf/`.
* Nếu phân bổ gói, vị trí thư mục cấu hình mặc định là `/etc/kpnd/conf/`.

#### Thêm Thư mục dữ liệu  <a id="add-data-directory"></a>

Bạn nên cập nhật biến môi trường thư mục dữ liệu `$DATA_DIR`trên tập tin cấu hình `kcnd.conf`.

```text
...
DATA_DIR=/var/kcnd/data
...
```

#### Thiếp lập Rewardbase <a id="setup-rewardbase"></a>

Người vận hành CN sẽ nhận được KLAY như phần thưởng của việc tham gia vào đồng thuận mạng lưới Klaytn. Vì lý do này, cần phải thiết lập một địa chỉ trên tập tin cấu hình `kcnd.conf`.

Có nhiều cách để tạo tài khoản mới nhưng `kcn` cũng cung cấp các chức năng. Bạn có thể xem tin nhắn trợ giúp bằng lệnh sau.

```bash
$ kcn tài khoản new --help
```

Một trong những ví dụ về việc thực quy trình này như sau. Trước hết, bạn cần tạo một tài khoản mới để gửi phần thưởng KLAY đến.

```bash
$ kcn tài khoản new --datadir ~/kcnd_home
INFO[03/15,09:04:43 +09] [17] Setting connection type                   nodetype=cn conntype=-0
INFO[03/15,09:04:43 +09] [17] Maximum peer count                        KLAY=25 LES=0 total=25
INFO[03/15,09:04:43 +09] [17] SBN is disabled.
Tài khoản mới của bạn được khóa bằng mật khẩu. Vui lòng nhập mật khẩu. Đừng quên mật khẩu này.
Cụm mật khẩu:
Nhắc lại cụm mật khẩu:
Địa chỉ: {d13f7da0032b1204f77029dc1ecbf4dae2f04241}
```

Sau đó, lưu trữ khóa liên kết sẽ được tạo trên đường dẫn bạn đã xác định. Tiếp theo, bạn cần cho địa chỉ đã tạo vào tập tin `kcnd.conf` như sau.

```text
...
REWARDBASE="d13f7da0032b1204f77029dc1ecbf4dae2f04241"
...
```

Hãy nhớ rằng lưu trữ khóa và mật khẩu mà bạn đã tạo là vô cùng quan trọng. Do đó, bạn phải quản lý chúng thật cẩn thận. Xem thêm thông tin về `kcnd.conf` trên phần [Tập tin cấu hình](../../../nodes/references/configuration-files.md).

### Đồng bộ nhanh \(Tùy chọn\) <a id="fast-sync-optional"></a>

Mỗi CN duy trì một bản sao dữ liệu chuỗi của mạng lưới. Nếu một nút không được đồng bộ, nút này có thể lấy dữ liệu này từ các nút khác trong mạng lưới -- một quá trình được gọi là đồng bộ hóa. Khi một CN mới được bắt đầu lần đầu tiên, nó phải tải xuống toàn bộ dữ liệu chuỗi từ mạng lưới.

Để đẩy nhanh quá trình này, bạn cần thực hiện đồng bộ nhanh bằng cách tải về bản thu thập dữ liệu của dữ liệu chuỗi trước khi bắt đầu CN. Điều này giúp giảm đáng kể thời gian CN cần để đồng bộ khi bắt đầu lần đầu tiên.

Tải xuống bản thu thập dữ liệu chuỗi mới nhất từ [Lưu trữ thu thập dữ liệu Cypress](http://packages.klaytn.net/cypress/chaindata/) hoặc[Lưu trữ thu thập dữ liệu Baobab](http://packages.klaytn.net/baobab/chaindata/). Trước khi bắt đầu `kcnd`, trích xuất bản thu thập dữ liệu trong DATA\_DIR mà bạn định cấu hình trong `kcnd.conf`.

Ví dụ:

```bash
$ tar -C ~/kcnd_home -xvf klaytn-cypress-chaindata-latest.tar.gz
```

Hoặc,

```bash
$ tar -C ~/kcnd_home -xvf klaytn-baobab-chaindata-latest.tar.gz
```

Sau khi dữ liệu được trích xuất, bạn có thể bắt đầu CN như bình thường.

Bạn có thể tham khảo thông tin chi tiết tại [Thay đổi dữ liệu chuỗi](../../node-migration.md)

## Khởi động CN <a id="startup-the-cn"></a>

### Bắt đầu/Dừng CN  <a id="cn-start-stop"></a>

Bạn có thể bắt đầu/dừng dịch vụ Klaytn bằng lệnh `systemctl` sau đây.

**Lưu ý**: Việc này yêu cầu quyền root.

**bắt đầu**

```bash
$ systemctl start kcnd.service

```

**dừng**

```bash
$ systemctl stop kcnd.service

```

**trạng thái**

```bash
$ systemctl trạng thái kcnd.service

```

### Khắc phục sự cố <a id="troubleshooting"></a>

Nếu bạn gặp lỗi sau,

```bash
Không thể bắt đầu kcnd.service: Không tìm thấy đơn vị.
```

tải lại cấu hình trình quản lý hệ thống bằng lệnh sau.

```bash
$ systemctl daemon-reload
```

# Kiểm tra Core Cell <a id="testing-the-core-cell"></a>

Đã đến lúc kiểm tra xem Core Cell đã được cài đặt thành công chưa và nó có hoạt động như mong đợi sau khi cài đặt không.

## Tình trạng xử lý <a id="process-status"></a>

Có thể kiểm tra trạng thái quy trình của CN bằng các lệnh trạng thái `systemctl` và `kcnd`.

### systemctl <a id="systemctl"></a>

`systemctl` được cài đặt cùng với RPM, có thể kiểm tra trạng thái của CN như sau.

```bash
$ systemctl trạng thái kcnd.service
● kcnd.service - (null)
   Loaded: loaded (/etc/rc.d/init.d/kcnd; bad; vendor preset: disabled)
   Active: active (running) since Wed 2019-01-09 11:42:39 UTC; 1 months 4 days ago
     Docs: man:systemd-sysv-generator(8)
  Process: 29636 ExecStart=/etc/rc.d/init.d/kcnd start (code=exited, trạng thái=0/SUCCESS)
 Main PID: 29641 (kcn)
   CGroup: /system.slice/kcnd.service
           └─29641 /usr/local/bin/kcn --networkid 1000 --datadir /kcnd_home --port 32323 --srvtype fasthttp --metrics --prometheus --verbosity 3 --txpool.global...

Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]: Starting (null)...
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal kcnd[29636]: Starting kcnd: [  OK  ]
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]: Started (null).
```

Bạn có thể kiểm tra trạng thái hiện tại như `Active: active (running)` trong ví dụ trên.

### kcnd <a id="kcnd-kpnd"></a>

`kcnd` được cài đặt cùng với gói và trạng thái của CN có thể được kiểm tra như sau.

```bash
$ kcnd trạng thái
kcnd is running
```

## Nhật ký <a id="logs"></a>

Nhật ký được lưu ở `kcnd.out` tại đường dẫn xác định trong trường `LOG_DIR` của tập tin `kcnd.conf`. Khi nút hoạt động bình thường, bạn có thể thấy rằng mỗi giây sẽ có một khối được tạo như sau.

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

## bảng điều khiển kcn <a id="kcn-console-kpn-console"></a>

Klaytn cung cấp một CLI khách: `bảng điều khiển kcn`. Tuy nhiên, CN có thể vô hiệu hóa giao diện RPC cho máy khách vì lý do bảo mật. Một cách khác để sử dụng máy khách là kết nối với quy trình thông qua IPC (giao tiếp giữa các quy trình).

Tập tin IPC `klay.ipc` nằm ở thư mục `data` trên CN.

Hãy thực hiện lệnh sau và kiểm tra kết quả.

```bash
$ ken attach /var/kend/data/klay.ipc
Chào mừng bạn đến với bảng điều khiển Klaytn JavaScript!

instance: Klaytn/vX.X.X/XXXX-XXXX/goX.X.X
 datadir: /var/kend/data
 modules: admin:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0
 >
```

Bạn có thể kiểm tra các lệnh có thể sử dụng trên [Tài liệu API](../../../references/json-rpc/json-rpc.md)

API hữu dụng để kiểm tra trạng thái của CN:

* `klay.blockNumber` (để lấy số khối mới nhất)
* `net.peerCount` (để lấy số nút Klaytn được kết nối hiện tại)

### klay.blockNumber  <a id="klay-blocknumber"></a>

Bạn có thể lấy số khối mới nhất để xem liệu các khối được tạo (đối với CN) hay được truyền (đối với CN và PN) đúng cách không dựa trên loại nút của bạn.

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

* CN: số CN được kết nối + số PN được kết nối.
* PN: số CN được kết nối + số PN được kết nối + số EN được kết nối.
