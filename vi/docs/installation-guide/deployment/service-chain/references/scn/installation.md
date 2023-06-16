# Hướng dẫn cài đặt <a id="installation-guide"></a>

Chương này giải thích về việc cài đặt **Nút đồng thuận chuỗi dịch vụ\(SCN\)**.

## Phân bổ lưu trữ Linux <a id="linux-archive-distribution"></a>

Tập tin lưu trữ cho nút đồng thuận chuỗi dịch vụ có bố cục thư mục như sau.

| Tên tập tin     | Mô tả tập tin                     |
|:--------------- |:--------------------------------- |
| bin/kscn        | Tập tin thực thi SCN              |
| bin/kscnd       | Tập tin lệnh bắt đầu/kết thúc SCN |
| conf/kscnd.conf | Tập tin cấu hình SCN              |

Tập tin lưu trữ cho nhị phân homi có bố cục thư mục như sau.

| Tên tập tin | Mô tả tập tin         |
|:----------- |:--------------------- |
| bin/homi    | Tập tin thực thi HOMI |

### Cài đặt <a id="installation"></a>

Quá trình cài đặt chính là giải nén gói đã tải xuống.

```text
$ tar zxf kscn-vX.X.X-XXXXX-amd64.tar.gz
$ tar zxf homi-vX.X.X-XXXXX-amd64.tar.gz
```

## Phân bổ RPM \(RHEL/CentOS/Fedora\) <a id="rpm-rhel-centos-fedora"></a>

### Cài đặt <a id="installation"></a>

Bạn có thể cài đặt RPM đã tải về với lệnh `yum` sau đây.

```text
$ yum install kscnd-vX.X.X.el7.x86_64.rpm
$ yum install homi-vX.X.X.el7.x86_64.rpm
```

### Vị trí đã cài đặt <a id="scn-configuration"></a>

Gói Linux Klaytn bao gồm nhị phân thực thi và tập tin cấu hình có cấu trúc như sau.

| Tên tập tin | Vị trí                     |
|:----------- |:-------------------------- |
| kscn        | /usr/bin/kscn              |
| kscnd.conf  | /etc/kscnd/conf/kscnd.conf |
| homi        | /usr/bin/homi              |


