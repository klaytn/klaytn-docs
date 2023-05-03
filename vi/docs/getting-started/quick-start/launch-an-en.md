# Khởi chạy nút điểm cuối

## Tải về và khởi chạy nút điểm cuối (EN) <a href="#download-and-initialize-an-endpoint-node-en" id="download-and-initialize-an-endpoint-node-en"></a>

Giải nén [gói nhị phân ken](../../installation-guide/download/#get-the-packages) và sao chép các tập tin vào thư mục klaytn.\
**Lưu ý**: Vui lòng tải về gói phù hợp có tên bắt đầu bằng `ken`.

Đối với người dùng Mac, giải nén tập tin đã tải về bằng lệnh sau.

```bash
$ tar zxf ken-baobab-vX.X.X-X-darwin-amd64.tar.gz
$ export PATH=$PATH:$PWD/ken-darwin-amd64/bin
```

Đối với người dùng Linux, giải nén tập tin đã tải về bằng lệnh sau.

```bash
$ tar zxf ken-baobab-vX.X.X-X-linux-amd64.tar.gz
$ export PATH=$PATH:$PWD/ken-linux-amd64/bin
```

Bạn nên tạo một thư mục dữ liệu để lưu trữ dữ liệu chuỗi khối. Trong phần hướng dẫn này, chúng ta sẽ tạo một thư mục `kend_home` trong thư mục chủ.

```bash
$ mkdir -p ~/kend_home
```

## Cấu hình EN <a href="#configuring-the-en" id="configuring-the-en"></a>

Tập tin cấu hình, `kend.conf`, được đặt dưới `ken-xxxxx-amd64/conf/`. Để biết thêm thông tin về các tham số có thể định cấu hình, bạn có thể xem [Hướng dẫn cấu hình EN](../../operation-guide/configuration.md). Để khởi chạy một EN của mạng thử nghiệm Baobab, vui lòng cập nhật tập tin `kend.conf` phù hợp như sau.

```
# cypress, baobab is only available if you don't specify NETWORK_ID.
NETWORK="baobab"
# if you specify NETWORK_ID, a private network is created.
NETWORK_ID=
...
RPC_API="klay,net" # net module should be opened for truffle later on.
...
DATA_DIR=~/kend_home
```

## Khởi chạy EN <a href="#launching-the-en" id="launching-the-en"></a>

Để khởi chạy EN, hãy thực thi lệnh sau.

```bash
$ kend start
 Starting kend: OK
```

## Kiểm tra EN <a href="#checking-the-en" id="checking-the-en"></a>

Để kiểm tra xem EN có chạy không, hãy thực thi lệnh sau.

```bash
$ kend status
kend is running
```

## Kiểm tra nhật ký của EN <a href="#checking-the-log-of-the-en" id="checking-the-log-of-the-en"></a>

Để kiểm tra nhật ký của EN, hãy thực thi lệnh sau.

```bash
$ tail -f ~/kend_home/logs/kend.out
...
INFO[03/26,15:37:49 +09] [5] Imported new chain segment                blocks=1    txs=0  mgas=0.000  elapsed=2.135ms   mgasps=0.000    number=71340 hash=f15511…c571da cache=155.56kB
...
```

## Khắc phục sự cố <a href="#troubleshooting" id="troubleshooting"></a>

Vui lòng xem mục [Khắc phục sự cố](../../operation-guide/errors-and-troubleshooting.md) nếu bạn gặp vấn đề trong việc khởi chạy Nút điểm cuối Klaytn.
