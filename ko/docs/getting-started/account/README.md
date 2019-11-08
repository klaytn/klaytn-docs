# 계정 관리 <a id="account-management"></a>

**`경고`**: 비밀번호를 기억하세요. 계정 비밀번호를 잊어버린 경우, 해당 계정에 액세스할 수 없습니다. **여기에는** _**비밀번호 찾기**_ **옵션이 없습니다. 절대 잊지 말아주세요.**

Klaytn은 개발자가 계정을 관리할 수 있도록 두 가지 편리한 명령행 도구인 `ken`과 `자바스크립트 콘솔`을 제공합니다. 개인키를 암호화되지 않은 형식으로 내보내는 것은 지원되지 않습니다.

## ken <a id="ken"></a>

Klaytn 엔드포인트 노드 바이너리 `ken`은 `account` 명령을 통해 계정 관리 기능을 제공합니다. `account` 명령으로 새 계정을 만들고, 기존의 모든 계정을 나열하고, 개인키를 새 계정으로 가져오고, 최신 키 형식으로 옮기거나(migrate), 암호를 변경할 수 있습니다.

### 사용법 <a id="usage"></a>

```bash
$ ken account <command> [options...] [arguments...]
```

**명령어**

```bash
$ ken account -help
...
COMMANDS:
     list    Print summary of existing accounts
     new     Create a new account
     update  Update an existing account
     import  Import a private key into a new account
...
```

`ken account <command> --help`로 하위 명령에 대한 정보를 얻을 수 있습니다.

```text
$ ken account list --help
list [command options] [arguments...]

Print a short summary of all accounts

KLAY OPTIONS:
  --dbtype value                        Blockchain storage database type ("leveldb", "badger") (default: "leveldb")
  --datadir "/Users/ethan/Library/KEN"  Data directory for the databases and keystore
  --keystore                            Directory for the keystore (default = inside the datadir)

DATABASE OPTIONS:
  --db.no-partitioning  Disable partitioned databases for persistent storage
```

### 데이터 디렉토리 <a id="data-directory"></a>

키스토어 파일은 `<DATADIR>/keystore`에 저장됩니다. 아래와 같이 데이터 디렉토리를 지정할 수 있습니다. `--datadir` 옵션과 함께 `ken account` 명령을 실행하는 것이 권장됩니다. 계정을 엔드포인트 노드와 원활하게 공유할 수 있도록 `kend.conf`에 설정된 데이터 디렉토리가 `DATA_DIR`을 가리키도록 하세요.

```bash
$ ken account new --datadir <DATADIR>
$ ken account new --datadir "~/kend_home"
```

데이터 디렉토리를 지정하지 않으면, 기본 위치는 다음과 같습니다.

* Mac: `~/Library/KEN`
* Linux: `~/.ken`

## 자바스크립트 콘솔 <a id="javascript-console"></a>

자바스크립트 콘솔에 연결하려면, EN이 실행 상태에 있어야합니다. 자세한 내용은 [EN 시작하기](../quick-start/launch-an-en.md)를 살펴보세요. EN을 시작하고 다음과 같이 콘솔에 연결하세요.

### 사용법 <a id="usage"></a>

```bash
$ kend start
Starting kend: OK

$ ken attach ~/kend_home/klay.ipc
Welcome to the Klaytn JavaScript console!

instance: Klaytn/vX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/kend_home
 modules: admin:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0

>
```

**명령어**

`personal` 또는 `klay`를 입력해 사용 가능한 함수 목록을 가져옵니다. 이 튜토리얼에서는 다음 함수들을 확인할 수 있습니다.

```bash
> personal.newAccount()
> personal.importRawKey()
> personal.unlockAccount()
> klay.accounts
> klay.getBalance()
```

### 데이터 디렉토리 <a id="data-directory"></a>

계정을 만들 때 키스토어 파일은 `<DATADIR>/keystore`에 저장됩니다. `<DATADIR>`은 `kend.conf`에 설정된 `DATA_DIR`입니다. 주어진 예시와 함께 빠른 시작 가이드를 따랐다면, `~/kend_home`일 것입니다.

