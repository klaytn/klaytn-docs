# 환경 설정

The CN configuration is to create a data directory and set up several values in the configuration file `kcnd.conf`.

1. Create the CN data directory.
2. Install node key
3. Configure the CN with `kcnd.conf`.

## CN Data Directory Creation

Considering the fact that the size of Klaytn blockchain data is always increased, it is recommended to use a big enough storage. You may need to create the directory on your desired path.

```bash
$ mkdir -p /var/kcnd/data
```

## Install Node Key

In order to operate a CN, a `nodekey` is required. The KCN binary will create a new one for you if you do not have it. If you have one, you need to put your `nodekey` into the CN data directory. The way to create a `nodekey` is described in the '[Before You Install](../before-you-install.md)' section. The following command line copies the `nodekey` into the CN data directory.

```bash
$ cp nodekey /var/kcnd/data
```

## 환경 설정 파일 업데이트

환경 설정 파일 위치는 다음과 같습니다.

* For the archive distribution, the config directory location defaults to `$INSTALL_PATH/kcn-linux-amd64/conf/`.
* For the package distribution, the config directory defaults to `/etc/kcnd/conf/`.

### 데이터 디렉토리 추가

환경 설정 파일 `kcnd.conf`의 데이터 디렉토리 환경 변수 `$DATA_DIR`를 업데이트해야 합니다.

```text
...
DATA_DIR=/var/kcnd/data
...
```

### Setup Rewardbase

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

Keep in mind that the keystore and the password that you created is significantly important, so you must be careful to manage them. See more details about `kcnd.conf` on the [Configuration File](../../operation-guide/configuration.md) section.

## Fast Sync \(선택 사항\)

Each CN maintains a copy of the network's chain data. 어떤 노드가 동기화되어 있지 않으면 네트워크의 다른 노드로부터 데이터를 받아옵니다 -- 동기화(syncing)라고 알려진 과정입니다. When a new CN is first started, it must download the entire chain data from the network.

To accelerate this process, you may perform a fast sync by downloading a snapshot of the chain data before starting the CN. This can dramatically reduce the time the CN will spend syncing on first start.

[Cypress 스냅샷 아카이브](http://packages.klaytn.net/cypress/chaindata/) 또는 [Baobab 스냅샷 아카이브](http://packages.klaytn.net/baobab/chaindata/)에서 체인 데이터의 최신 스냅샷을 다운로드할 수 있습니다. Before starting `kcnd`, extract the snapshot inside the DATA\_DIR you configured in `kcnd.conf`.

예를 들어,

```bash
$ tar -C ~/kcnd_home -xvf klaytn-cypress-chaindata-latest.tar.gz
```

또는

```bash
$ tar -C ~/kcnd_home -xvf klaytn-baobab-chaindata-latest.tar.gz
```

After the data is extracted, you may start the CN normally.

