# Configuration <a id="configuration"></a>

PN 환경설정은 데이터 디렉토리를 생성하고 환경설정 파일 `kpnd.conf`의 여러 변수를 설정합니다.

1. PN 데이터 디렉토리 생성하기
2. Install node key
3. `static-node.json` 설치하기
4. `kpnd.conf`으로 PN 환경설정하기

## PN 데이터 디렉토리 생성 <a id="pn-data-directory-creation"></a>

Considering the fact that the size of Klaytn blockchain data is always increased, it is recommended to use a big enough storage. You may need to create the directory on your desired path.

```bash
$ mkdir -p /var/kpnd/data
```

## Install Node Key <a id="install-node-key"></a>

PN을 작동시키기 위해 `nodekey`가 필요합니다. 만일 nodekey가 없다면 KCN 바이너리가 새로 생성해 줄 것입니다. 이미 가지고 있다면 `nodekey`를 PN 데이터 디렉토리에 넣어주세요. `nodekey`를 생성하는 방법은 "[Before You Install](../before-you-install.md)" 장에 설명되어 있습니다. 다음 커맨드라인은 `nodekey`를 PN 데이터 디렉토리에 복사합니다.

```bash
$ cp nodekey /var/kpnd/data
```

## `static-nodes.json` 설치하기 <a id="install-static-nodes-json"></a>

`static-nodes.json`은 PN 운영자로부터 생성되어야 합니다. PN이 연결된 주소들이 포함되어 있습니다. CN 및 다른 코어 셀의 PN을 포함해 주소를 추가하는 것이 좋습니다. 자세한 내용은 Klaytn 공식 이메일로 문의하세요.(Cypress 문의는 `bootstrap@klaytn.com` 또는 Baobab 문의는 `baobab@klaytn.com`\).

**static-nodes.json**

```text
[
  "kni://4f2f47f3bf35a2c576d3345e6e9c49b147d510c05832d2458709f63c3c90c76ead205975d944ed65e77dd4c6f63ebe1ef21d60da95952bc1e200e7487f4d9e1b@10.11.2.101:32323?discport=0&ntype=cn",
  "kni://8dee912aeda2ccfaa4fe421f015d4d75c2e3fd4aab75fa399b42767caad33531e57f3356b4a4af374593e33ec4320e1325aa2390a7be2489fa6b5724894680eb@10.11.2.102:32323?discport=0&ntype=pn"
]
```

PN의 노드 URI는 "[Before You Install](../before-you-install.md)" 장에 있습니다. \(참고: 이 IP 주소는 CN 공개 IP와 다릅니다.\) 다음 커맨드라인은 `static-nodes.json` 파일을 PN 데이터 디렉토리에 복사합니다.

```bash
$ cp static-nodes.json /var/kpnd/data
```

## Update the Configuration File <a id="update-the-configuration-file"></a>

Configuration File Location:

* 아카이브 배포의 경우 환경설정 디렉토리의 위치가 `$INSTALL_PATH/kpn-linux-amd64/conf/`으로 기본 설정되어 있습니다.
* 패키지 배포의 경우 환경설정 디렉토리의 위치가 `/etc/kpnd/conf/`으로 기본 설정되어 있습니다.

### Add Data Directory  <a id="add-data-directory"></a>

환경설정 파일 `kpnd.conf`의 데이터 디렉토리 환경 변수 `$DATA_DIR`를 업데이트해야 합니다.

```text
...
DATA_DIR=/var/kpnd/data
...
```

## Fast Sync \(Optional\) <a id="fast-sync-optional"></a>

각 PN은 네트워크의 체인 데이터 사본을 갖고 있습니다. If a node is out of sync, it can obtain this data from other nodes in the network -- a process known as syncing. 새로운 PN이 처음 시작되면 네트워크로부터 전체 체인 데이터를 다운로드 받아와야 합니다.

이 과정을 더 빠르게 하려면 PN을 시작하기 전에 체인 데이터의 스냅샷을 다운로드하여 패스트 싱크를 실행할 수 있습니다. 패스트 싱크는 PN이 처음 시작할 때 동기화하는 데에 드는 시간을 크게 줄일 수 있습니다.

Download the latest chaindata snapshot from the [Cypress snapshot archive](http://packages.klaytn.net/cypress/chaindata/) or [Baobab snapshot archive](http://packages.klaytn.net/baobab/chaindata/). `kpnd`을 시작하기 전에 `kpnd.conf`에서 설정한 DATA\_DIR 내의 스냅샷을 추출하세요.

For example:

```text
$ tar -C /var/kpnd/data -xvf klaytn-cypress-chaindata-latest.tar.gz
```

Or,

```text
$ tar -C /var/kpnd/data -xvf klaytn-baobab-chaindata-latest.tar.gz
```

데이터 추출 후 PN을 정상적으로 시작할 수 있습니다.

더 자세한 내용은 [Chaindata change](../../../../../operation-guide/chaindata-change)를 참고하세요.
