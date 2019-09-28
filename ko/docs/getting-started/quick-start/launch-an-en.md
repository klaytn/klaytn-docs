# Endpoint Node 실행

## Endpoint Node\(EN\) 다운로드 및 초기화

제공된 [ken 바이너리 패키지](../../node/endpoint-node/installation-guide/download.md)를 압축 해제하고, 파일을 klaytn 폴더에 복사합니다.  
**참고**: `ken`으로 시작하는 적합한 패키지를 다운로드하시기 바랍니다.

Mac 사용자의 경우, 다음 명령으로 다운로드한 파일을 압축 해제합니다.

```bash
$ tar zxf ken-baobab-vX.X.X-X-darwin-amd64.tar.gz
$ export PATH=$PATH:$PWD/ken-darwin-amd64/bin
```

Linux 사용자의 경우, 다음 명령으로 다운로드한 파일을 압축 해제합니다.

```bash
$ tar zxf ken-baobab-vX.X.X-X-linux-amd64.tar.gz
$ export PATH=$PATH:$PWD/ken-linux-amd64/bin
```

블록체인 데이터를 저장할 데이터 디렉토리를 만들어야 합니다. 이 튜토리얼에서는 홈 디렉터리에 `kend_home` 폴더를 생성하겠습니다.

```bash
$ mkdir -p ~/kend_home
```

## EN 구성

구성 파일인 `kend.conf`는 `ken-xxxxx-amd64/conf/`에 위치합니다. 구성 가능한 매개 변수에 대한 자세한 내용은 [EN 구성 가이드](../../node/endpoint-node/operation-guide/configuration.md)를 참조하시면 됩니다. Baobab 테스트넷의 EN을 실행하려면, 다음과 같이 `kend.conf` 파일을 업데이트하시기 바랍니다.

```text
# cypress, baobab은 NETWORK_ID를 명시하지 않은 경우에만 사용할 수 있습니다.
NETWORK = "baobab"
# NETWORK_ID를 명시하면 개인(private) 네트워크가 생성됩니다.
NETWORK_ID=
...
RPC_API="klay,net" # 추후 truffle을 위해 net 모듈을 열어야 합니다.
...
DATA_DIR=~/kend_home
```

## EN 실행

EN을 시작하려면 다음 명령을 실행합니다.

```bash
$ kend start
 Starting kend: OK
```

## EN 확인

EN이 구동 중인지 확인하려면 다음 명령을 실행합니다.

```bash
$ kend status
kend is running
```

## EN의 로그 확인

EN의 로그를 확인하려면 다음 명령을 실행합니다.

```bash
$ tail -f ~/kend_home/logs/kend.out
...
INFO[03/26,15:37:49 +09] [5] Imported new chain segment                blocks=1    txs=0  mgas=0.000  elapsed=2.135ms   mgasps=0.000    number=71340 hash=f15511…c571da cache=155.56kB
...
```

## 문제 해결

Klaytn Endpoint Node 실행에 문제가 있는 경우, [문제 해결](../../node/errors-and-troubleshooting.md)을 참고하시기 바랍니다.