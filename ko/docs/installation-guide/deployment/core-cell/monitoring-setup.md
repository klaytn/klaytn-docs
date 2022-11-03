# 모니터링 설정 <a id="monitoring-setup"></a>


## 개요 <a id="overview"></a>

Klaytn 팀은 Klaytn CCN을 모니터링할 수 있는 사이트([http://cypress.klaytn.net:3000](http://cypress.klaytn.net:3000))를 제공합니다. `telegraf` 모니터링 에이전트는 CC의 각 CN/PN에 설치되어 지표를 수집하고 이를 모니터링 서버로 보냅니다. 일단 설치되면 모니터링 사이트를 방문하여 Klaytn CC의 지표들을 볼 수 있습니다.

설치 과정은 다음과 같습니다.

1. CN/PN에서 `telegraf` 설치하기
2. `telegraf` 환경설정하기
3. `telegraf` 시작하기

## Telegraf 설치 <a id="telegraf-installation"></a>

Telegraf 설치 안내서 \(Amazon Linux 2 사용자, 아래 참조\): [https://docs.influxdata.com/telegraf/latest/introduction/installation/](https://docs.influxdata.com/telegraf/latest/introduction/installation/)

**Amazon Linux 2에 대한 참고 사항**

Amazon Linux 2에 Telegraph를 설치하려면, 다음과 같이 InfluxData의 RHEL 7 yum repo를 사용해야 합니다:

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

## Telegraf 설정 <a id="telegraf-setup"></a>

### kcnd/kpnd에서 모니터링 활성화 <a id="enable-monitoring-in-kcnd-kpnd"></a>

/etc/kcnd/conf/kcnd.conf

```text
...
METRICS=1
PROMETHEUS=1
...
```

**Check**

포트 61001이 열려 있는지 확인하여 위의 두 가지 옵션이 활성화되어 있는지 확인할 수 있습니다.

```text
$ netstat -ntap | grep 61001
tcp        0      0 :::61001        :::*       LISTEN      8989/kcn
```

**Telegraf 서비스 환경설정**

다음 파일을 `telegraf` 환경설정 디렉토리 (`/etc/telegraf/telegraf.d/`\)에 복사하고, `nodetype`, `instance`, `hostname`를 각 노드에 적합하게 수정하세요.

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

`/etc/telegraf/telegraf.conf`에서 다음을 변경하세요:

* `[[outputs.influxdb]]` 장을 주석 처리 하세요.

**Telegraf 시작하기**

```text
$ systemctl restart telegraf
```

## Grafana <a id="grafana"></a>

각 CN/PN이 위의 환경설정 및 에이전트를 가진 경우, 다음 URL에서 지표들을 확인할 수 있습니다.

[http://cypress.klaytn.net:3000](http://cypress.klaytn.net:3000)

CC 운영자는 슬랙 채널에 회사 이름과 이메일 주소를 제공하시고 계정을 요청할 수 있습니다. CC 운영자만이 Grafana 계정을 요청할 수 있습니다.

