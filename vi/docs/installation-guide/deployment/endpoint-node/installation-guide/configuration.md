# Cấu hình <a id="configuration"></a>

Cấu hình NĐC dùng để tạo thư mục dữ liệu và thiết lập các biến môi trường trong tập tin cấu hình `kend.conf`.

1. Tạo thư mục dữ liệu NĐC.
2. Định cấu hình NĐC với `kend.conf`.

## Tạo thư mục dữ liệu NĐC <a id="en-data-directory-creation"></a>

Kích thước của dữ liệu blockchain Klaytn sẽ luôn tăng lên nên cần sử dụng một dung lượng lưu trữ đủ lớn. Bạn cần phải tạo thư mục trên đường dẫn bạn muốn.

```text
$ sudo mkdir -p /var/kend/data
```

## Cập nhật Tập tin cấu hình <a id="update-the-configuration-file"></a>

Vị trí tập tin cấu hình:

* Đối với việc phân bổ lưu trữ, vị trí thư mục cấu hình mặc định là `$INSTALL_PATH/ken-linux-amd64/conf/`.
* Đối với việc phân bổ lưu trữ, vị trí thư mục cấu hình mặc định là `/etc/kend/conf/`.

### Thêm Thư mục dữ liệu  <a id="add-data-directory"></a>

Bạn nên cập nhật biến môi trường thư mục dữ liệu `$DATA_DIR`trên tập tin cấu hình `kend.conf`.

```text
DATA_DIR=/var/kend/data
```

## Đồng bộ nhanh \(Tùy chọn\) <a id="fast-sync-optional"></a>

Mỗi NĐC duy trì một bản sao dữ liệu chuỗi của mạng lưới. Nếu một nút không được đồng bộ, nút này có thể lấy dữ liệu này từ các nút khác trong mạng lưới -- một quá trình được gọi là đồng bộ hóa. Khi một NĐC mới được bắt đầu lần đầu tiên, nó phải tải xuống toàn bộ dữ liệu chuỗi từ mạng lưới.

Để đẩy nhanh quá trình này, bạn cần thực hiện đồng bộ nhanh bằng cách tải về bản thu thập dữ liệu của dữ liệu chuỗi trước khi bắt đầu NĐC. Điều này giúp giảm đáng kể thời gian NĐC cần để đồng bộ khi bắt đầu lần đầu tiên.

Tải về bản thu thập dữ liệu chuỗi mới nhất từ [Lưu trữ thu thập dữ liệu Cypress](http://packages.klaytn.net/cypress/chaindata/) hoặc[Lưu trữ thu thập dữ liệu Baobab](http://packages.klaytn.net/baobab/chaindata/). Trước khi bắt đầu `kend`, trích xuất bản thu thập dữ liệu trong DATA\_DIR mà bạn định cấu hình trong `kend.conf`.

Ví dụ:

```bash
$ tar -C ~/kend_home -xvf klaytn-cypress-chaindata-latest.tar.gz
```

Hoặc,

```bash
$ tar -C ~/kend_home -xvf klaytn-baobab-chaindata-latest.tar.gz
```

Sau khi dữ liệu được trích xuất, bạn có thể bắt đầu NĐC như bình thường.

Bạn có thể tham khảo thông tin chi tiết tại [Thay đổi dữ liệu chuỗi](../../../../operation-guide/chaindata-change.md)

## <a id="en-start-stop-status"></a>

