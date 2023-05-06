# Cấu hình <a id="configuration"></a>

Cấu hình NP dùng để tạo thư mục dữ liệu và thiết lập các giá trị trong tập tin cấu hình `kpnd.conf`.

1. Tạo thư mục dữ liệu NP
2. Cài đặt khóa nút
3. Cài đặt `static-node.json`
4. Định cấu hình NP với `kpnd.conf`.

## Việc tạo thư mục dữ liệu NP <a id="pn-data-directory-creation"></a>

Kích thước của dữ liệu blockchain Klaytn sẽ luôn tăng lên thế nên cần sử dụng một dung lượng lưu trữ đủ lớn. Bạn có thể cần phải tạo thư mục trên đường dẫn bạn muốn.

```bash
$ mkdir -p /var/kpnd/data
```

## Cài đặt Khóa nút <a id="install-node-key"></a>

Để vận hành NP cần có `nodekey`. Nhị phân NP Klaytn sẽ tạo ra một nút mới nếu bạn không có sẵn. Nếu bạn đã có, bạn cần chuyển `khóa nút` vào thư mục dữ liệu NP. Cách để tạo `khóa nút` là mô tả trong phần '[Trước khi bạn cài đặt](../before-you-install.md)'. Dòng lệnh sau sao chép `khóa nút` vào thư mục dữ liệu NP.

```bash
$ cp nodekey /var/kpnd/data
```

## Cài đặt `static-nodes.json` <a id="install-static-nodes-json"></a>

`static-nodes.json` nên được tạo bởi nhà vận hành NP. Nó chứa các địa chỉ kết nối với NP của bạn. Bạn nên thêm địa chỉ bao gồm NĐT và NP từ Core Cell khác. Vui lòng liên hệ qua email chính thức của Klaytn để biết thêm chi tiết \(`bootstrap@klaytn.com` cho Cypress hoặc `baobab@klaytn.com` cho Baobab\).

**static-nodes.json**

```text
[
  "kni://4f2f47f3bf35a2c576d3345e6e9c49b147d510c05832d2458709f63c3c90c76ead205975d944ed65e77dd4c6f63ebe1ef21d60da95952bc1e200e7487f4d9e1b@10.11.2.101:32323?discport=0&ntype=cn",
  "kni://8dee912aeda2ccfaa4fe421f015d4d75c2e3fd4aab75fa399b42767caad33531e57f3356b4a4af374593e33ec4320e1325aa2390a7be2489fa6b5724894680eb@10.11.2.102:32323?discport=0&ntype=pn"
]
```

URI nút của NP có trong phần '[Trước khi bạn cài đặt](../before-you-install.md)'. \(Lưu ý: Địa chỉ IP này khác với IP công khai của NĐT.\) Dòng lệnh sau sao chép tệp `static-nodes.json` vào thư mục dữ liệu NP.

```bash
$ cp static-nodes.json /var/kpnd/data
```

## Cập nhật Tập tin cấu hình <a id="update-the-configuration-file"></a>

Vị trí tập tin cấu hình:

* Đối với việc phân bổ lưu trữ, vị trí thư mục cấu hình mặc định là `$INSTALL_PATH/kpn-linux-amd64/conf/`.
* Đối với việc phân bổ lưu trữ, vị trí thư mục cấu hình mặc định là `/etc/kpnd/conf/`.

### Thêm Thư mục dữ liệu  <a id="add-data-directory"></a>

Bạn nên cập nhật biến môi trường thư mục dữ liệu `$DATA_DIR`trên tập tin cấu hình `kpnd.conf`.

```text
...
DATA_DIR=/var/kpnd/data
...
```

## Đồng bộ nhanh \(Tùy chọn\) <a id="fast-sync-optional"></a>

Mỗi NP duy trì một bản sao dữ liệu chuỗi của mạng lưới. Nếu một nút không được đồng bộ, nút này có thể lấy dữ liệu này từ các nút khác trong mạng lưới -- một quá trình được gọi là đồng bộ hóa. Khi một NP mới được bắt đầu lần đầu tiên, nó phải tải xuống toàn bộ dữ liệu chuỗi từ mạng lưới.

Để đẩy nhanh quá trình này, bạn cần thực hiện đồng bộ nhanh bằng cách tải về bản thu thập dữ liệu của dữ liệu chuỗi trước khi bắt đầu NP. Điều này giúp giảm đáng kể thời gian NP cần để đồng bộ khi bắt đầu lần đầu tiên.

Tải về bản thu thập dữ liệu chuỗi mới nhất từ [Lưu trữ thu thập dữ liệu Cypress](http://packages.klaytn.net/cypress/chaindata/) hoặc[Lưu trữ thu thập dữ liệu Baobab](http://packages.klaytn.net/baobab/chaindata/). Trước khi bắt đầu `kpnd`, trích xuất bản thu thập dữ liệu trong DATA\_DIR mà bạn định cấu hình trong `kpnd.conf`.

Ví dụ:

```text
$ tar -C /var/kpnd/data -xvf klaytn-cypress-chaindata-latest.tar.gz
```

Hoặc,

```text
$ tar -C /var/kpnd/data -xvf klaytn-baobab-chaindata-latest.tar.gz
```

Sau khi dữ liệu được trích xuất, bạn có thể bắt đầu NP như bình thường.

Bạn có thể tham khảo thông tin chi tiết tại [Thay đổi dữ liệu chuỗi](../../../../../operation-guide/chaindata-change)
