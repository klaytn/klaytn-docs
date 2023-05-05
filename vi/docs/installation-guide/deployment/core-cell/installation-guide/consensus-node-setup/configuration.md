# Cấu hình <a id="configuration"></a>

Cấu hình NĐT dùng để tạo thư mục dữ liệu và thiết lập các giá trị trong tập tin cấu hình `kcnd.conf`.

1. Tạo thư mục dữ liệu NĐT.
2. Cài đặt khóa nút
3. Định cấu hình NĐT với `kcnd.conf`.

## Việc tạo thư mục dữ liệu NĐT <a id="cn-data-directory-creation"></a>

Kích thước của dữ liệu blockchain Klaytn sẽ luôn tăng lên thế nên cần sử dụng một dung lượng lưu trữ đủ lớn. Bạn có thể cần phải tạo thư mục trên đường dẫn bạn muốn.

```bash
$ mkdir -p /var/kcnd/data
```

## Cài đặt Khóa nút <a id="install-node-key"></a>

Để vận hành NĐT cần có `nodekey`. Nhị phân NĐT sẽ tạo ra một nút mới nếu bạn không có sẵn. Nếu bạn đã có, bạn cần chuyển `nodekey` vào thư mục dữ liệu NĐT. Cách để tạo `nodekey` là mô tả trong phần '[Trước khi bạn cài đặt](../before-you-install.md)'. Dòng lệnh sau sao chép`nodekey` vào thư mục dữ liệu NĐT.

```bash
$ cp nodekey /var/kcnd/data
```

## Cập nhật Tập tin cấu hình <a id="update-the-configuration-file"></a>

Vị trí tập tin cấu hình:

* Đối với việc phân bổ lưu trữ, vị trí thư mục cấu hình mặc định là `$INSTALL_PATH/kcn-linux-amd64/conf/`.
* Đối với việc phân bổ lưu trữ, vị trí thư mục cấu hình mặc định là `/etc/kcnd/conf/`.

### Thêm Thư mục dữ liệu  <a id="add-data-directory"></a>

Bạn nên cập nhật biến môi trường thư mục dữ liệu `$DATA_DIR`trên tập tin cấu hình `kcnd.conf`.

```text
...
DATA_DIR=/var/kcnd/data
...
```

### Thiếp lập Rewardbase <a id="setup-rewardbase"></a>

Người vận hành NĐT sẽ nhận được KLAY như phần thưởng của việc tham gia vào đồng thuận mạng lưới Klaytn. Vì lý do này, cần phải thiết lập một địa chỉ trên tập tin cấu hình `kcnd.conf`.

Có nhiều cách để tạo tài khoản mới nhưng `kcn` cũng cung cấp các chức năng. Bạn có thể xem tin nhắn trợ giúp bằng lệnh sau.

```bash
$ kcn account new --help
```

Một trong những ví dụ về việc thực quy trình này như sau. Trước hết, bạn cần tạo một tài khoản mới để gửi phần thưởng KLAY đến.

```bash
$ kcn account new --datadir ~/kcnd_home
INFO[03/15,09:04:43 +09] [17] Setting connection type                   nodetype=cn conntype=-0
INFO[03/15,09:04:43 +09] [17] Maximum peer count                        KLAY=25 LES=0 total=25
INFO[03/15,09:04:43 +09] [17] SBN is disabled.
Tài khoản mới của được khóa bằng mật khẩu. Vui lòng nhập mật khẩu. Đừng quên mật khẩu này.
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

Hãy nhớ rằng lưu trữ khóa và mật khẩu mà bạn đã tạo là vô cùng quan trọng. Do đó, bạn phải quản lý chúng thật cẩn thận. Xem thêm thông tin về `kcnd.conf` trên phần [Tập tin cấu hình](../../../../../operation-guide/configuration.md).

## Đồng bộ nhanh \(Tùy chọn\) <a id="fast-sync-optional"></a>

Mỗi NĐT duy trì một bản sao dữ liệu chuỗi của mạng lưới. If a node is out of sync, it can obtain this data from other nodes in the network -- a process known as syncing. When a new CN is first started, it must download the entire chain data from the network.

To accelerate this process, you may perform a fast sync by downloading a snapshot of the chain data before starting the CN. This can dramatically reduce the time the CN will spend syncing on first start.

Download the latest chaindata snapshot from the [Cypress snapshot archive](http://packages.klaytn.net/cypress/chaindata/) or [Baobab snapshot archive](http://packages.klaytn.net/baobab/chaindata/). Before starting `kcnd`, extract the snapshot inside the DATA\_DIR you configured in `kcnd.conf`.

For example:

```bash
$ tar -C ~/kcnd_home -xvf klaytn-cypress-chaindata-latest.tar.gz
```

Or,

```bash
$ tar -C ~/kcnd_home -xvf klaytn-baobab-chaindata-latest.tar.gz
```

After the data is extracted, you may start the CN normally.

You can refer to detailed information in the [Chaindata change](../../../../../operation-guide/chaindata-change.md)

