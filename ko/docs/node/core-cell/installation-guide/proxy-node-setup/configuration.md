# 환경 설정

The PN configuration is to create a data directory and set up several values in the configuration file `kpnd.conf`.

1. Create a PN Data Directory
2. Install node key
3. Install `static-node.json`
4. Configure the PN with `kpnd.conf`.

## PN Data Directory Creation

Considering the fact that the size of Klaytn blockchain data is always increased, it is recommended to use a big enough storage. You may need to create the directory on your desired path.

```bash
$ mkdir -p /var/kpnd/data
```

## Install Node Key

In order to operate a PN, a `nodekey` is required. The KPN binary will create a new one for you if you do not have it. If you have one, you need to put your `nodekey` into the PN data directory. The way to create a `nodekey` is in the "[Before You Install](../before-you-install.md)" section. The following command line copies the `nodekey` into the PN data directory.

```bash
$ cp nodekey /var/kpnd/data
```

## Install `static-nodes.json`

The `static-nodes.json` should be created from the PN operator. It contains the addresses that your PN is connected to. It is recommended to add the addresses including your CN and a PN from another Core Cell. Please contact to the Klaytn official email for more details \(`bootstrap@klaytn.com` for Cypress or `baobab@klaytn.com` for Baobab\).

**static-nodes.json**

```text
[
  "kni://4f2f47f3bf35a2c576d3345e6e9c49b147d510c05832d2458709f63c3c90c76ead205975d944ed65e77dd4c6f63ebe1ef21d60da95952bc1e200e7487f4d9e1b@10.11.2.101:32323?discport=0&ntype=cn",
  "kni://8dee912aeda2ccfaa4fe421f015d4d75c2e3fd4aab75fa399b42767caad33531e57f3356b4a4af374593e33ec4320e1325aa2390a7be2489fa6b5724894680eb@10.11.2.102:32323?discport=0&ntype=pn"
]
```

The node URI of the PN is in the "[Before You Install](../before-you-install.md)" section. \(Note: This IP address is different from CN public IP.\) The following command line copies the `static-nodes.json` file into the PN data directory.

```bash
$ cp static-nodes.json /var/kpnd/data
```

## 환경 설정 파일 업데이트

환경 설정 파일 위치는 다음과 같습니다.

* For the archive distribution, the config directory location defaults to `$INSTALL_PATH/kpn-linux-amd64/conf/`.
* For the package distribution, the config directory defaults to `/etc/kpnd/conf/`.

### 데이터 디렉토리 추가

환경 설정 파일 `kpnd.conf`의 데이터 디렉토리 환경 변수 `$DATA_DIR`를 업데이트해야 합니다.

```text
...
DATA_DIR=/var/kpnd/data
...
```

## Fast Sync \(선택 사항\)

Each PN maintains a copy of the network's chain data. 어떤 노드가 동기화되어 있지 않으면 네트워크의 다른 노드로부터 데이터를 받아옵니다 -- 동기화(syncing)라고 알려진 과정입니다. When a new PN is first started, it must download the entire chain data from the network.

To accelerate this process, you may perform a fast sync by downloading a snapshot of the chain data before starting the PN. This can dramatically reduce the time the PN will spend syncing on first start.

[Cypress 스냅샷 아카이브](http://packages.klaytn.net/cypress/chaindata/) 또는 [Baobab 스냅샷 아카이브](http://packages.klaytn.net/baobab/chaindata/)에서 체인 데이터의 최신 스냅샷을 다운로드할 수 있습니다. Before starting `kpnd`, extract the snapshot inside the DATA\_DIR you configured in `kpnd.conf`.

예를 들어,

```text
$ tar -C /var/kpnd/data -xvf klaytn-cypress-chaindata-latest.tar.gz
```

또는

```text
$ tar -C /var/kpnd/data -xvf klaytn-baobab-chaindata-latest.tar.gz
```

After the data is extracted, you may start the PN normally.

