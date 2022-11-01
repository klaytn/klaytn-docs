# Monitoring Setup <a id="monitoring-setup"></a>


## Overview <a id="overview"></a>

The Klaytn team provides a site for monitoring the Klaytn CCN at [http://cypress.klaytn.net:3000](http://cypress.klaytn.net:3000). The `telegraf` monitoring agent is installed in each CN/PN of the CC to collect metrics and send them to the monitoring server. Once installed, you may visit the monitoring site to view the metrics of the Klaytn CCs.

The installation process is as follows:

1. Install `telegraf` in the CN/PNs
2. Configure `telegraf`
3. Start `telegraf`

## Telegraf Installation <a id="telegraf-installation"></a>

Telegraf Installation Guide \(Amazon Linux 2 users, see below\): [https://docs.influxdata.com/telegraf/latest/introduction/installation/](https://docs.influxdata.com/telegraf/latest/introduction/installation/)

**Note for Amazon Linux 2**

To install Telegraph on Amazon Linux 2, you may use InfluxData's RHEL 7 yum repo as follows:

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

## Telegraf Setup <a id="telegraf-setup"></a>

### Enable monitoring in kcnd/kpnd <a id="enable-monitoring-in-kcnd-kpnd"></a>

/etc/kcnd/conf/kcnd.conf

```text
...
METRICS=1
PROMETHEUS=1
...
```

**Check**

You may confirm that the above two options are enabled by checking that port 61001 is open.

```text
$ netstat -ntap | grep 61001
tcp        0      0 :::61001        :::*       LISTEN      8989/kcn
```

**Configure Telegraf service**

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

