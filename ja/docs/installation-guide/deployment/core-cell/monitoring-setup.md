# モニタリング設定 <a id="monitoring-setup"></a>


## 概要 <a id="overview"></a>

Klaytnチームは、 [http://cypress.klaytn.net:3000](http://cypress.klaytn.net:3000) でKlaytn CCNを監視するためのサイトを提供します。 CCの各CN/PNには `テレグラフ・` 監視エージェントが設置されており、メトリックを収集して監視サーバーに送信します。 インストールが完了したら、モニタリングサイトにアクセスして、Klaytn CC のメトリックを表示できます。

インストールプロセスは以下のとおりです。

1. CN/PNに `telegraf` をインストールする
2. `テレグラフ・`を設定する
3. `テレグラフ・`を開始する

## Telegraf のインストール <a id="telegraf-installation"></a>

Telegraf インストールガイド \(Amazon Linux 2 ユーザ, 以下を参照\): [https://docs.influxdata.com/telegraf/latest/introduction/installation/](https://docs.influxdata.com/telegraf/latest/introduction/installation/)

**Amazon Linux 2 の注意**

Amazon Linux 2 にTelegraph をインストールするには、以下のように InfluxData の RHEL 7 yum repo を使用します。

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

### kcnd/kpnd でモニタリングを有効にする <a id="enable-monitoring-in-kcnd-kpnd"></a>

/etc/kCND/conf/kcnd.conf

```text
...
METRICS=1
PROMETEUS=1
...
```

**チェック**

ポート61001が開いていることを確認することで、上記の2つのオプションが有効になっていることを確認できます。

```text
$ netstat -ntap | grep 61001
tcp        0      0 :::61001        :::*       LISTEN      8989/kcn
```

**Telegraf サービスの設定**

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

`/etc/telegraf/telegraf.conf` で以下を変更:

* `[[outputs.influxdb]]` セクションにコメントする

**Telegraf を開始**

```text
$ systemctl restart telegraf
```

## Grafana <a id="grafana"></a>

各CN/PNに上記の設定とエージェントがある場合は、以下のURLでメトリックを確認できます。

[http://cypress.klaytn.net:3000](http://cypress.klaytn.net:3000)

CCオペレーターとして、Slackチャンネルに会社名とメールアドレスを入力してアカウントをリクエストすることができます。 CC演算子のみがGrafanaアカウントをリクエストできますのでご注意ください。

