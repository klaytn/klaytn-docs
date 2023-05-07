# Giám sát thiết lập <a id="monitoring-setup"></a>


## Tổng quan <a id="overview"></a>

Đội ngũ Klaytn cung cấp một trang web để theo dõi Mạng lưới Core Cell Klaytn tại [http://cypress.klaytn.net:3000](http://cypress.klaytn.net:3000). Tác nhân giám sát `telegraf` được cài đặt trong mỗi NĐT/NP của CC để thu thập số liệu và gửi chúng đến máy chủ giám sát. Sau khi cài đặt, bạn có thể truy cập trang web giám sát để xem số liệu của CC Klaytn.

Quá trình cài đặt như sau:

1. Cài đặt `telegraf` trong NĐT/NP
2. Định cấu hình `telegraf`
3. Bắt đầu `telegraf`

## Cài đặt Telegraf <a id="telegraf-installation"></a>

Hướng dẫn cài đặt Telegraf \(Người dùng Amazon Linux 2, xem bên dưới\): [https://docs.influxdata.com/telegraf/latest/introduction/installation/](https://docs.influxdata.com/telegraf/latest/introduction/installation/)

**Lưu ý cho Amazon Linux 2**

Để cài đặt Telegraph trên Amazon Linux 2, bạn có thể sử dụng RHEL 7 yum repo của InfluxData nhuw sau:

```text
cat <<EOF | sudo tee /etc/yum.repos.d/influxdb.repo
[influxdb]
name = InfluxDB Repository - RHEL 7
baseurl = https://repos.influxdata.com/rhel/7/\$basearch/stable
enabled = 1
gpgcheck = 1
gpgkey = https://repos.influxdata.com/influxdb.key
EOF
```

## Thiết lập Telegraf <a id="telegraf-setup"></a>

### Kích hoạt giám sát trong kcnd/kpnd <a id="enable-monitoring-in-kcnd-kpnd"></a>

/etc/kcnd/conf/kcnd.conf

```text
...
METRICS=1
PROMETHEUS=1
...
```

**Kiểm tra**

Bạn có thể xác nhận rằng hai tùy chọn trên đã được kích hoạt bằng cách kiểm tra xem cổng 61001 có đang mở hay không.

```text
$ netstat -ntap | grep 61001
tcp        0      0 :::61001        :::*       LISTEN      8989/kcn
```

**Định cấu hình dịch vụ Telegraf**

Copy the following file to the `telegraf` configuration directory \(`/etc/telegraf/telegraf.d/`\), and edit `nodetype`, `instance`, and `hostname` appropriately for each node:

```text
[global_tags]
  # Change "cn" to "pn" for PN installation
  nodetype = "cn"

  # The CN/PN name (e.g. `example-cn`, `example-pn`)
  instance = "<hostname>"

[agent]
  # The CN/PN name (e.g. `example-cn`, `example-pn`)
  hostname = "<hostname>"

[[outputs.influxdb]]
  urls = [ "http://localhost:" ]
  database = "klaytn_cypress"

[[inputs.prometheus]]
  urls = [ "http://localhost:61001/metrics" ]
```

Change the following in `/etc/telegraf/telegraf.conf`:

* Comment out the `[[outputs.influxdb]]` section

**Start Telegraf**

```text
$ systemctl restart telegraf
```

## Grafana <a id="grafana"></a>

If each CN/PN has the above configuration and agent, you can check the metrics at the following URL:

[http://cypress.klaytn.net:3000](http://cypress.klaytn.net:3000)

As a CC operator, you may request an account by providing your company name and email address in the Slack channel. Please note that only CC operators are allowed to request a Grafana account.

