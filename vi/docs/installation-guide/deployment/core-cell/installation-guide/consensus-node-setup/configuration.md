# Cấu hình <a id="configuration"></a>

Cấu hình NĐT dùng để tạo thư mục dữ liệu và thiết lập các giá trị trong `kcnd.conf`tập tin cấu hình.

1. Tạo thư mục dữ liệu NĐT.
2. Cài đặt khóa nút
3. Định cấu hình NĐT với `kcnd.conf`.

## Việc tạo thư mục dữ liệu NĐT <a id="cn-data-directory-creation"></a>

Kích thước của dữ liệu blockchain Klaytn sẽ luôn tăng lên thế nên cần sử dụng một dung lượng lưu trữ đủ lớn. Bạn có thể cần phải tạo thư mục trên đường dẫn bạn muốn.

```bash
$ mkdir -p /var/kcnd/data
```

## Cài đặt Khóa nút <a id="install-node-key"></a>

Để vận hành NĐT cần có`nodekey`. Nhị phân NĐT sẽ tạo ra một nút mới nếu bạn không có sẵn. Nếu bạn đã có, bạn cần chuyển `nodekey` vào thư mục dữ liệu NĐT. Cách để tạo `nodekey` là mô tả trong phần '[Before You Install](../before-you-install.md)'. Dòng lệnh sau sao chép`nodekey` vào thư mục dữ liệu NĐT.

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

As a reward of participating in the consensus of the Klaytn network, CN operator will receive KLAY. For this reason, it is required to set an address on the configuration file `kcnd.conf`.

The ways to create a new account are various, but the `kcn` also provides the functionality. You can check the help message with the following command.

```bash
$ kcn account new --help
```

One of the example of doing this procedure is as follows. First of all, you need to create a new account which the reward KLAY will be sent to.

```bash
$ kcn account new --datadir ~/kcnd_home
INFO[03/15,09:04:43 +09] [17] Setting connection type                   nodetype=cn conntype=-0
INFO[03/15,09:04:43 +09] [17] Maximum peer count                        KLAY=25 LES=0 total=25
INFO[03/15,09:04:43 +09] [17] SBN is disabled.
Your new account is locked with a password. Please give a password. Do not forget this password.
Passphrase:
Repeat passphrase:
Address: {d13f7da0032b1204f77029dc1ecbf4dae2f04241}
```

As a result of this, it will create the associated keystore on the path that you define. Next, you need to put the created address in the file `kcnd.conf` file as follows.

```text
...
REWARDBASE="d13f7da0032b1204f77029dc1ecbf4dae2f04241"
...
```

Keep in mind that the keystore and the password that you created is significantly important, so you must be careful to manage them. See more details about `kcnd.conf` on the [Configuration File](../../../../../operation-guide/configuration.md) section.

## Fast Sync \(Optional\) <a id="fast-sync-optional"></a>

Each CN maintains a copy of the network's chain data. If a node is out of sync, it can obtain this data from other nodes in the network -- a process known as syncing. When a new CN is first started, it must download the entire chain data from the network.

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

