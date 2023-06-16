# Cấu hình <a id="configuration"></a>

Cấu hình PN dùng để tạo thư mục dữ liệu và thiết lập các giá trị trong tập tin cấu hình `kpnd.conf`.

1. Tạo thư mục dữ liệu PN
2. Cài đặt khóa nút
3. Cài đặt `static-node.json`
4. Định cấu hình PN với `kpnd.conf`.

## Tạo thư mục dữ liệu PN <a id="pn-data-directory-creation"></a>

Kích thước của dữ liệu blockchain Klaytn sẽ luôn tăng lên thế nên cần sử dụng một dung lượng lưu trữ đủ lớn. Bạn có thể cần phải tạo thư mục trên đường dẫn bạn muốn.

```bash
$ mkdir -p /var/kpnd/data
```

## Cài đặt Khóa nút <a id="install-node-key"></a>

Để vận hành PN cần có `khóa nút`. Nhị phân PN Klaytn sẽ tạo ra một nút mới nếu bạn không có sẵn. Nếu bạn đã có, bạn cần chuyển `khóa nút` vào thư mục dữ liệu PN. Cách để tạo `khóa nút` được mô tả trong phần '[Trước khi bạn cài đặt](../before-you-install.md)'. Dòng lệnh sau sao chép `khóa nút` vào thư mục dữ liệu PN.

```bash
$ cp nodekey /var/kpnd/data
```

## Cài đặt `static-nodes.json` <a id="install-static-nodes-json"></a>

`static-nodes.json` nên được tạo bởi người vận hành PN. Nó chứa các địa chỉ kết nối với PN của bạn. Bạn nên thêm địa chỉ bao gồm CN và PN từ Core Cell khác. Vui lòng liên hệ qua email chính thức của Klaytn để biết thêm chi tiết \(`bootstrap@klaytn.com` cho Cypress hoặc `baobab@klaytn.com` cho Baobab\).

**static-nodes.json**

```text
[
  "kni://4f2f47f3bf35a2c576d3345e6e9c49b147d510c05832d2458709f63c3c90c76ead205975d944ed65e77dd4c6f63ebe1ef21d60da95952bc1e200e7487f4d9e1b@10.11.2.101:32323?discport=0&ntype=cn",
  "kni://8dee912aeda2ccfaa4fe421f015d4d75c2e3fd4aab75fa399b42767caad33531e57f3356b4a4af374593e33ec4320e1325aa2390a7be2489fa6b5724894680eb@10.11.2.102:32323?discport=0&ntype=pn"
]
```

URI nút của PN có trong phần '[Trước khi bạn cài đặt](../before-you-install.md)'. \(Lưu ý: Địa chỉ IP này khác với IP công khai của CN.\) Dòng lệnh sau sao chép tập tin `static-nodes.json` vào thư mục dữ liệu PN.

```bash
$ cp static-nodes.json /var/kpnd/data
```

## Cập nhật Tập tin cấu hình <a id="update-the-configuration-file"></a>

Vị trí tập tin cấu hình:

* Nếu phân bổ lưu trữ, vị trí thư mục cấu hình mặc định là `$INSTALL_PATH/kpn-linux-amd64/conf/`.
* Nếu phân bổ gói, vị trí thư mục cấu hình mặc định là `/etc/kpnd/conf/`.

### Thêm Thư mục dữ liệu  <a id="add-data-directory"></a>

Bạn nên cập nhật biến môi trường thư mục dữ liệu `$DATA_DIR`trên tập tin cấu hình `kpnd.conf`.

```text
...
DATA_DIR=/var/kpnd/data
...
```

## Đồng bộ nhanh \(Tùy chọn\) <a id="fast-sync-optional"></a>

Mỗi PN duy trì một bản sao dữ liệu chuỗi của mạng lưới. Nếu một nút không được đồng bộ, nút này có thể lấy dữ liệu này từ các nút khác trong mạng lưới -- một quá trình được gọi là đồng bộ hóa. Khi một PN mới được bắt đầu lần đầu tiên, nó phải tải xuống toàn bộ dữ liệu chuỗi từ mạng lưới.

Để đẩy nhanh quá trình này, bạn cần thực hiện đồng bộ nhanh bằng cách tải về bản thu thập dữ liệu của dữ liệu chuỗi trước khi bắt đầu PN. Điều này giúp giảm đáng kể thời gian PN cần để đồng bộ khi bắt đầu lần đầu tiên.

Tải xuống bản thu thập dữ liệu chuỗi mới nhất từ [Lưu trữ thu thập dữ liệu Cypress](http://packages.klaytn.net/cypress/chaindata/) hoặc[Lưu trữ thu thập dữ liệu Baobab](http://packages.klaytn.net/baobab/chaindata/). Trước khi bắt đầu `kpnd`, trích xuất bản thu thập dữ liệu trong DATA\_DIR mà bạn định cấu hình trong `kpnd.conf`.

Ví dụ:

```text
$ tar -C /var/kpnd/data -xvf klaytn-cypress-chaindata-latest.tar.gz
```

Hoặc,

```text
$ tar -C /var/kpnd/data -xvf klaytn-baobab-chaindata-latest.tar.gz
```

Sau khi dữ liệu được trích xuất, bạn có thể bắt đầu PN như bình thường.

Bạn có thể tham khảo thông tin chi tiết tại [Thay đổi dữ liệu chuỗi](../../../../../operation-guide/chaindata-change)
