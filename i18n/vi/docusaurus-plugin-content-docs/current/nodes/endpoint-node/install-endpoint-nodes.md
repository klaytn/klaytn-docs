# Cài đặt nút Endpoint

## Tải xuống <a id="download"></a>

Bạn có thể tải về các gói cho EN tại [trang tải về](../downloads/downloads.md).

## Hướng dẫn cài đặt <a id="installation-guide"></a>

### Phân bổ lưu trữ Linux <a id="linux-archive-distribution"></a>

Tập tin lưu trữ bao gồm tập tin nhị phân thực thi và cấu hình có cấu trúc như sau.

**Lưu ý**: KHÔNG thay đổi cấu trúc hoặc tên tập tin. Nếu bạn thay đổi điều đó, nút có thể sẽ không hoạt động đúng.

```text
- bin
  |- ken
  |- kend
- conf
  |- kend.conf
```

| Tên tập tin    | Mô tả tập tin                    |
| :------------- | :------------------------------- |
| bin/ken        | Tập tin thực thi EN              |
| bin/kend       | Tập tin lệnh bắt đầu/kết thúc EN |
| conf/kend.conf | Tập tin cấu hình EN              |

Quá trình cài đặt chính là giải nén gói đã tải về tại nơi bạn muốn cài đặt gói.

```text
$ tar zxf ken-vX.X.X-linux-amd64.tar.gz
```

Hoặc,

```text
$ tar zxf ken-baobab-vX.X.X-linux-amd64.tar.gz
```

**Lưu ý**: nên thêm đường dẫn thư mục chưa giải nén `ken-linux-amd64/bin` vào biến môi trường `$PATH` để chạy `ken` và `kend` trên toàn hệ thống. Ví dụ,

```text
$ export PATH=$PATH:~/downloaded/path/ken-linux-amd64/bin
```

Các phần khác giả định rằng đường dẫn đã được thêm vào biến.

### Phân bổ RPM (RHEL/CentOS/Fedora) <a id="rpm-rhel-centos-fedora"></a>

Bạn có thể cài đặt RPM đã tải về với lệnh `yum` sau đây.

```text
$ yum install kend-vX.X.X.el7.x86_64.rpm
```

Hoặc,

```text
$ yum install kend-baobab-vX.X.X.el7.x86_64.rpm
```

### Cài đặt từ Klaytn Yum Repo <a id="install-from-klaytn-yum-repo"></a>

Ngoài ra, bạn có thể cài đặt `kend` từ Klaytn Yum repo, chạy:

```text
$ sudo curl -o /etc/yum.repos.d/klaytn.repo https://packages.klaytn.net/config/rhel/7/prod.repo && sudo yum install kend
```

### Vị trí đã cài đặt <a id="installed-location"></a>

Tập tin đã cài đặt nằm ở vị trí như sau.

| Tên tập tin | Vị trí                   |
| :---------- | :----------------------- |
| ken         | /usr/bin/ken             |
| kend.conf   | /etc/kend/conf/kend.conf |

## Cấu hình <a id="configuration"></a>

Cấu hình EN dùng để tạo thư mục dữ liệu và thiết lập các biến môi trường trong tập tin cấu hình `kend.conf`.

1. Tạo thư mục dữ liệu EN.
2. Định cấu hình EN với `kend.conf`.

### Tạo thư mục dữ liệu EN <a id="en-data-directory-creation"></a>

Kích thước của dữ liệu blockchain Klaytn sẽ luôn tăng lên nên cần sử dụng một dung lượng lưu trữ đủ lớn. Bạn cần phải tạo thư mục trên đường dẫn bạn muốn.

```text
$ sudo mkdir -p /var/kend/data
```

### Cập nhật Tập tin cấu hình <a id="update-the-configuration-file"></a>

Vị trí tập tin cấu hình:

- Nếu phân bổ lưu trữ, vị trí thư mục cấu hình mặc định là `$INSTALL_PATH/ken-linux-amd64/conf/`.
- Nếu phân bổ gói, vị trí thư mục cấu hình mặc định là `/etc/kpnd/conf/`.

#### Thêm Thư mục dữ liệu  <a id="add-data-directory"></a>

Bạn nên cập nhật biến môi trường thư mục dữ liệu `$DATA_DIR`trên tập tin cấu hình `kend.conf`.

```text
DATA_DIR=/var/kend/data
```

### Đồng bộ nhanh (Tùy chọn) <a id="fast-sync-optional"></a>

Mỗi EN duy trì một bản sao dữ liệu chuỗi của mạng lưới. Nếu một nút không được đồng bộ, nút này có thể lấy dữ liệu này từ các nút khác trong mạng lưới -- một quá trình được gọi là đồng bộ hóa. Khi một EN mới được bắt đầu lần đầu tiên, nó phải tải xuống toàn bộ dữ liệu chuỗi từ mạng lưới.

Để đẩy nhanh quá trình này, bạn cần thực hiện đồng bộ nhanh bằng cách tải về bản thu thập dữ liệu của dữ liệu chuỗi trước khi bắt đầu EN. Điều này giúp giảm đáng kể thời gian EN cần để đồng bộ khi bắt đầu lần đầu tiên.

Tải xuống bản thu thập dữ liệu chuỗi mới nhất từ [Lưu trữ thu thập dữ liệu Cypress](http://packages.klaytn.net/cypress/chaindata/) hoặc[Lưu trữ thu thập dữ liệu Baobab](http://packages.klaytn.net/baobab/chaindata/). Trước khi bắt đầu `kend`, trích xuất bản thu thập dữ liệu trong DATA_DIR mà bạn định cấu hình trong `kend.conf`.

Ví dụ:

```bash
$ tar -C ~/kend_home -xvf klaytn-cypress-chaindata-latest.tar.gz
```

Hoặc,

```bash
$ tar -C ~/kend_home -xvf klaytn-baobab-chaindata-latest.tar.gz
```

Sau khi dữ liệu được trích xuất, bạn có thể bắt đầu EN như bình thường.

Bạn có thể tham khảo thông tin chi tiết tại [Thay đổi dữ liệu chuỗi](../../misc/operation/chaindata-change.md)

## Khởi động EN <a id="startup-the-en"></a>

Bạn có thể bắt đầu hoặc dừng Nút điểm cuối bằng các lệnh sau.

**bắt đầu**

```bash
$ kend start
Starting kend: OK
```

**dừng**

```bash
$ kend stop
Shutting down kend: Killed
```

**trạng thái**

```bash
$ kend status
kend is running
```

## Thử việc cài đặt <a id="testing-the-installation"></a>

Đã đến lúc kiểm tra xem Nút điểm cuối đã được cài đặt thành công chưa và nó có hoạt động như mong đợi sau khi cài đặt không.

### Tình trạng xử lý <a id="process-status"></a>

Có thể kiểm tra trạng thái quy trình của EN bằng các lệnh trạng thái `systemctl` và `kend`.

#### systemctl <a id="systemctl"></a>

`systemctl` được cài đặt cùng với RPM; có thể kiểm tra trạng thái của EN như sau.

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

Bạn có thể kiểm tra trạng thái hiện tại như `Active: active (running)` trong ví dụ bên dưới.

#### kend <a id="kend"></a>

`kend` được cài đặt cùng với gói; trạng thái của EN có thể được kiểm tra như sau.

```bash
$ kend status
kend is running
```

### Nhật ký <a id="logs"></a>

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

### Truy vấn <a id="queries"></a>

#### ken console <a id="ken-console"></a>

Klaytn cung cấp một máy khách CLI: `ken console`. Một cách khác để sử dụng máy khách là kết nối với quy trình thông qua IPC (giao tiếp giữa các quy trình). Tập tin IPC `klay.ipc` được đặt tại thư mục `data` trên một EN.

Hãy thực hiện lệnh sau và kiểm tra kết quả.

```text
$ ken attach /var/kend/data/klay.ipc
Welcome to the Klaytn JavaScript console!

instance: Klaytn/vX.X.X/XXXX-XXXX/goX.X.X
 datadir: /var/kend/data
 modules: admin:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0
 >
```

You can check the usable commands on [API Document](../../../references/json-rpc/klay/account-created)

Các API hữu ích để kiểm tra trạng thái của EN:

- `klay.blockNumber` (để lấy số khối mới nhất)
- `net.peerCount` (để lấy số nút Klaytn được kết nối hiện tại)

#### klay.blockNumber <a id="klay-blocknumber"></a>

Bạn có thể lấy số khối mới nhất để xem các khối có được truyền đúng cách không.

```text
> klay.blockNumber
11573819
```

#### net.peerCount <a id="net-peercount"></a>

```text
> net.peerCount
14
```

Dòng lệnh trên trả về số nút mà EN kết nối đến.
