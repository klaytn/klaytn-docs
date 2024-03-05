# Thiết lập nút proxy

## Tải về <a id="download"></a>

Bạn có thể tải về phiên bản mới nhất của `kpn` trên trang [Tải xuống](../../downloads/downloads.md).

## Cài đặt <a id="installation"></a>

### Phân bổ lưu trữ Linux <a id="linux-archive-distribution"></a>

Tập tin lưu trữ bao gồm tập tin nhị phân thực thi và cấu hình có cấu trúc như sau.

**Lưu ý**: KHÔNG thay đổi cấu trúc hoặc tên tập tin. Nếu bạn thay đổi điều đó, nút có thể sẽ không hoạt động đúng.

```text
- bin
  |- kpn
  |- kpnd
- conf
  |- kpnd.conf
```

| Tên tập tin    | Mô tả tập tin                    |
| :------------- | :------------------------------- |
| bin/kpn        | Tập tin thực thi PN              |
| bin/kpnd       | Tập tin lệnh bắt đầu/kết thúc PN |
| conf/kpnd.conf | Tập tin cấu hình PN              |

Quá trình cài đặt chính là giải nén gói đã tải về tại nơi bạn muốn cài đặt gói.

```bash
$ tar zxf kpn-vX.X.X-linux-amd64.tar.gz
```

Hoặc,

```bash
$ tar zxf kpn-baobab-vX.X.X-linux-amd64.tar.gz
```

**Lưu ý**: nên thêm đường dẫn thư mục chưa giải nén `kcn-linux-amd64/bin` vào biến môi trường `$PATH` để chạy `kcn` và `kcnd` trên toàn hệ thống. Ví dụ,

```bash
$ export PATH=$PATH:~/downloaded/path/kpn-linux-amd64/bin
```

Các phần khác giả định rằng đường dẫn đã được thêm vào biến.

### Phân bổ RPM (RHEL/CentOS/Fedora) <a id="rpm-rhel-centos-fedora"></a>

Bạn có thể cài đặt RPM đã tải về với lệnh `yum` sau đây.

```bash
$ yum install kpnd-vX.X.X.el7.x86_64.rpm
```

Hoặc,

```bash
$ yum install kpnd-baobab-vX.X.X.el7.x86_64.rpm
```

### Cài đặt từ Klaytn Yum Repo <a id="install-from-klaytn-yum-repo"></a>

Ngoài ra, bạn có thể cài đặt `kpnd` từ Klaytn Yum repo, chạy:

```bash
$ sudo curl -o /etc/yum.repos.d/klaytn.repo https://packages.klaytn.net/config/rhel/7/prod.repo && sudo yum install kpnd
```

### Vị trí đã cài đặt <a id="installed-location"></a>

Tập tin đã cài đặt nằm ở vị trí như sau.

| Tên tập tin | Vị trí                   |
| :---------- | :----------------------- |
| kpn         | /usr/bin/kpn             |
| kpnd.conf   | /etc/kpnd/conf/kpnd.conf |

## Cấu hình <a id="configuration"></a>

Cấu hình PN dùng để tạo thư mục dữ liệu và thiết lập các giá trị trong tập tin cấu hình `kpnd.conf`.

1. Tạo thư mục dữ liệu PN
2. Cài đặt khóa nút
3. Cài đặt `static-node.json`
4. Định cấu hình PN với `kpnd.conf`.

### Tạo thư mục dữ liệu PN <a id="pn-data-directory-creation"></a>

Kích thước của dữ liệu blockchain Klaytn sẽ luôn tăng lên thế nên cần sử dụng một dung lượng lưu trữ đủ lớn. Bạn có thể cần phải tạo thư mục trên đường dẫn bạn muốn.

```bash
$ mkdir -p /var/kpnd/data
```

### Cài đặt Khóa nút <a id="install-node-key"></a>

Để vận hành PN cần có `khóa nút`. Nhị phân PN Klaytn sẽ tạo ra một nút mới nếu bạn không có sẵn. Nếu bạn đã có, bạn cần chuyển `khóa nút` vào thư mục dữ liệu PN. Cách để tạo `khóa nút` được mô tả trong phần '[Trước khi bạn cài đặt](./before-you-install.md)'. Dòng lệnh sau sao chép `khóa nút` vào thư mục dữ liệu PN.

```bash
$ cp nodekey /var/kpnd/data
```

### Cài đặt `static-nodes.json` <a id="install-static-nodes-json"></a>

`static-nodes.json` nên được tạo bởi người vận hành PN. Nó chứa các địa chỉ kết nối với PN của bạn. Bạn nên thêm địa chỉ bao gồm CN và PN từ Core Cell khác. Vui lòng liên hệ qua email chính thức của Klaytn để biết thêm chi tiết (`bootstrap@klaytn.com` cho Cypress hoặc `baobab@klaytn.com` cho Baobab).

**static-nodes.json**

```text
[
  "kni://4f2f47f3bf35a2c576d3345e6e9c49b147d510c05832d2458709f63c3c90c76ead205975d944ed65e77dd4c6f63ebe1ef21d60da95952bc1e200e7487f4d9e1b@10.11.2.101:32323?discport=0&ntype=cn",
  "kni://8dee912aeda2ccfaa4fe421f015d4d75c2e3fd4aab75fa399b42767caad33531e57f3356b4a4af374593e33ec4320e1325aa2390a7be2489fa6b5724894680eb@10.11.2.102:32323?discport=0&ntype=pn"
]
```

URI nút của PN có trong phần '[Trước khi bạn cài đặt](./before-you-install.md)'. (Lưu ý: Địa chỉ IP này khác với IP công khai của CN.) Dòng lệnh sau sao chép tập tin `static-nodes.json` vào thư mục dữ liệu PN.

```bash
$ cp static-nodes.json /var/kpnd/data
```

### Cập nhật Tập tin cấu hình <a id="update-the-configuration-file"></a>

Vị trí tập tin cấu hình:

- Nếu phân bổ lưu trữ, vị trí thư mục cấu hình mặc định là `$INSTALL_PATH/kpn-linux-amd64/conf/`.
- Nếu phân bổ gói, vị trí thư mục cấu hình mặc định là `/etc/kpnd/conf/`.

#### Thêm Thư mục dữ liệu  <a id="add-data-directory"></a>

Bạn nên cập nhật biến môi trường thư mục dữ liệu `$DATA_DIR`trên tập tin cấu hình `kpnd.conf`.

```text
...
DATA_DIR=/var/kpnd/data
...
```

### Đồng bộ nhanh (Tùy chọn) <a id="fast-sync-optional"></a>

Mỗi PN duy trì một bản sao dữ liệu chuỗi của mạng lưới. Nếu một nút không được đồng bộ, nút này có thể lấy dữ liệu này từ các nút khác trong mạng lưới -- một quá trình được gọi là đồng bộ hóa. Khi một PN mới được bắt đầu lần đầu tiên, nó phải tải xuống toàn bộ dữ liệu chuỗi từ mạng lưới.

Để đẩy nhanh quá trình này, bạn cần thực hiện đồng bộ nhanh bằng cách tải về bản thu thập dữ liệu của dữ liệu chuỗi trước khi bắt đầu PN. Điều này giúp giảm đáng kể thời gian PN cần để đồng bộ khi bắt đầu lần đầu tiên.

Tải xuống bản thu thập dữ liệu chuỗi mới nhất từ [Lưu trữ thu thập dữ liệu Cypress](http://packages.klaytn.net/cypress/chaindata/) hoặc[Lưu trữ thu thập dữ liệu Baobab](http://packages.klaytn.net/baobab/chaindata/). Trước khi bắt đầu `kpnd`, trích xuất bản thu thập dữ liệu trong DATA_DIR mà bạn định cấu hình trong `kpnd.conf`.

Ví dụ:

```text
$ tar -C /var/kpnd/data -xvf klaytn-cypress-chaindata-latest.tar.gz
```

Hoặc,

```text
$ tar -C /var/kpnd/data -xvf klaytn-baobab-chaindata-latest.tar.gz
```

Sau khi dữ liệu được trích xuất, bạn có thể bắt đầu PN như bình thường.

Bạn có thể tham khảo thông tin chi tiết tại [Thay đổi dữ liệu chuỗi](../../../misc/operation/chaindata-change.md)

## Khởi động PN <a id="startup-the-pn"></a>

### Bắt đầu/Dừng PN  <a id="pn-start-stop"></a>

Bạn có thể bắt đầu/dừng dịch vụ Klaytn bằng lệnh `systemctl` sau đây.

**Lưu ý**: Việc này yêu cầu quyền root.

**bắt đầu**

```bash
$ systemctl start kpnd.service

```

**dừng**

```bash
$ systemctl stop kpnd.service

```

**trạng thái**

```bash
$ systemctl status kpnd.service

```

### Khắc phục sự cố <a id="troubleshooting"></a>

Nếu bạn gặp lỗi sau,

```bash
Failed to start kpnd.service: Unit not found.
```

tải lại cấu hình trình quản lý hệ thống bằng lệnh sau.

```bash
$ systemctl daemon-reload
```

## Kiểm tra Core Cell <a id="testing-the-core-cell"></a>

Đã đến lúc kiểm tra xem Core Cell đã được cài đặt thành công chưa và nó có hoạt động như mong đợi sau khi cài đặt không.

### Tình trạng xử lý <a id="process-status"></a>

Có thể kiểm tra trạng thái quy trình của PN bằng các lệnh trạng thái `systemctl` và `kpnd`.

#### systemctl <a id="systemctl"></a>

`systemctl` được cài đặt cùng với RPM, có thể kiểm tra trạng thái của PN như sau.

```bash
$ systemctl status kpnd.service
● kpnd.service - (null)
   Loaded: loaded (/etc/rc.d/init.d/kpnd; bad; vendor preset: disabled)
   Active: active (running) since Wed 2019-01-09 11:42:39 UTC; 1 months 4 days ago
     Docs: man:systemd-sysv-generator(8)
  Process: 29636 ExecStart=/etc/rc.d/init.d/kpnd start (code=exited, status=0/SUCCESS)
 Main PID: 29641 (kpn)
   CGroup: /system.slice/kpnd.service
           └─29641 /usr/local/bin/kpn --networkid 1000 --datadir /kpnd_home --port 32323 --srvtype fasthttp --metrics --prometheus --verbosity 3 --txpool.global...

Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]: Starting (null)...
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal kpnd[29636]: Starting kpnd: [  OK  ]
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]: Started (null).
```

Bạn có thể kiểm tra trạng thái hiện tại như `Active: active (running)` trong ví dụ trên.

#### kpnd <a id="kcnd-kpnd"></a>

`kpnd` được cài đặt cùng với gói và trạng thái của PN có thể được kiểm tra như sau.

```bash
$ kpnd status
kpnd is running
```

### Nhật ký <a id="logs"></a>

Nhật ký được lưu ở `kpnd.out` tại đường dẫn xác định trong trường `LOG_DIR` của tập tin `kpnd.conf` (hoặc `kpnd.conf`). Khi nút hoạt động bình thường, bạn có thể thấy rằng mỗi giây sẽ có một khối được tạo như sau.

Ví dụ:

```bash
$ tail kpnd.out
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

### bảng điều khiển kpn <a id="kcn-console-kpn-console"></a>

Klaytn cung cấp một CLI khách: `bảng điều khiển kpn` (hoặc `bảng điều khiển kpn`). Tuy nhiên, PN có thể vô hiệu hóa giao diện RPC cho máy khách vì lý do bảo mật. Một cách khác để sử dụng máy khách là kết nối với quy trình thông qua IPC (giao tiếp giữa các quy trình).

Tập tin IPC `klay.ipc` nằm ở thư mục `data` trên PN.

Hãy thực hiện lệnh sau và kiểm tra kết quả.

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

Bạn có thể kiểm tra các lệnh có thể sử dụng trên [Tài liệu API](../../../references/json-rpc/json-rpc.md)

API hữu dụng để kiểm tra trạng thái của PN:

- `klay.blockNumber` (để lấy số khối mới nhất)
- `net.peerCount` (để lấy số nút Klaytn được kết nối hiện tại)

#### klay.blockNumber  <a id="klay-blocknumber"></a>

Bạn có thể lấy số khối mới nhất để xem liệu các khối được tạo (đối với CN) hay được truyền (đối với CN và PN) đúng cách không dựa trên loại nút của bạn.

```javascript
> klay.blockNumber
11573819
```

#### net.peerCount  <a id="net-peercount"></a>

```javascript
> net.peerCount
14
```

Dòng lệnh trên trả về một giá trị khác dựa trên loại nút.

- CN: số CN được kết nối + số PN được kết nối.
- PN: số CN được kết nối + số PN được kết nối + số EN được kết nối.
