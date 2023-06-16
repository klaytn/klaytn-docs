# Hướng dẫn cài đặt <a id="installation-guide"></a>

Bạn có thể tải về phiên bản mới nhất của `kcn` trên trang [Tải xuống](../download.md).

## Phân bổ lưu trữ Linux <a id="linux-archive-distribution"></a>

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

### Cài đặt <a id="installation"></a>

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

## Phân bổ RPM \(RHEL/CentOS/Fedora\) <a id="rpm-rhel-centos-fedora"></a>

### Cài đặt RPM đã tải về <a id="install-downloaded-rpm"></a>

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



