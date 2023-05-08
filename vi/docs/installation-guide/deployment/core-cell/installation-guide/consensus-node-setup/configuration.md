# Cấu hình <a id="configuration"></a>

Cấu hình NĐT dùng để tạo thư mục dữ liệu và thiết lập các giá trị trong tập tin cấu hình `kcnd.conf`.

1. Tạo thư mục dữ liệu NĐT.
2. Cài đặt khóa nút
3. Định cấu hình NĐT với `kcnd.conf`.

## Tạo thư mục dữ liệu NĐT <a id="cn-data-directory-creation"></a>

Kích thước của dữ liệu blockchain Klaytn sẽ luôn tăng lên thế nên cần sử dụng một dung lượng lưu trữ đủ lớn. Bạn có thể cần phải tạo thư mục trên đường dẫn bạn muốn.

```bash
$ mkdir -p /var/kcnd/data
```

## Cài đặt Khóa nút <a id="install-node-key"></a>

Để vận hành NĐT cần có `nodekey`. Nhị phân NĐT sẽ tạo ra một nút mới nếu bạn không có sẵn. Nếu bạn đã có, bạn cần chuyển `khóa nút` vào thư mục dữ liệu NĐT. Cách để tạo `khóa nút` là mô tả trong phần '[Trước khi bạn cài đặt](../before-you-install.md)'. Dòng lệnh sau sao chép `khóa nút` vào thư mục dữ liệu NĐT.

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

Mỗi NĐT duy trì một bản sao dữ liệu chuỗi của mạng lưới. Nếu một nút không được đồng bộ, nút này có thể lấy dữ liệu này từ các nút khác trong mạng lưới -- một quá trình được gọi là đồng bộ hóa. Khi một NĐT mới được bắt đầu lần đầu tiên, nó phải tải xuống toàn bộ dữ liệu chuỗi từ mạng lưới.

Để đẩy nhanh quá trình này, bạn cần thực hiện đồng bộ nhanh bằng cách tải về bản thu thập dữ liệu của dữ liệu chuỗi trước khi bắt đầu NĐT. Điều này giúp giảm đáng kể thời gian NĐT cần để đồng bộ khi bắt đầu lần đầu tiên.

Tải về bản thu thập dữ liệu chuỗi mới nhất từ [Lưu trữ thu thập dữ liệu Cypress](http://packages.klaytn.net/cypress/chaindata/) hoặc[Lưu trữ thu thập dữ liệu Baobab](http://packages.klaytn.net/baobab/chaindata/). Trước khi bắt đầu `kcnd`, trích xuất bản thu thập dữ liệu trong DATA\_DIR mà bạn định cấu hình trong `kcnd.conf`.

Ví dụ:

```bash
$ tar -C ~/kcnd_home -xvf klaytn-cypress-chaindata-latest.tar.gz
```

Hoặc,

```bash
$ tar -C ~/kcnd_home -xvf klaytn-baobab-chaindata-latest.tar.gz
```

Sau khi dữ liệu được trích xuất, bạn có thể bắt đầu NĐT như bình thường.

Bạn có thể tham khảo thông tin chi tiết tại [Thay đổi dữ liệu chuỗi](../../../../../operation-guide/chaindata-change.md)

