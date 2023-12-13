# 클레이튼 명령어

## 클레이튼 디렉터리(일반적으로 "클레이튼 DIR") 찾는 방법

---
클레이튼 디렉터리는 `kcn` 또는 `kpn` 설정에서 확인할 수 있습니다. 설정 파일은 `/etc/kcnd/conf` 또는 `/etc/kpnd/conf` 아래에 있습니다.

```bash
cat /etc/kcnd/conf/kcnd.conf (or /etc/kpnd/conf/kpnd.conf)

# Find DATA_DIR and LOG_DIR path as below example
DATA_DIR=/var/kcnd/data/
LOG_DIR=/var/kcnd/logs/
```

## 클레이튼 콘솔에 접속하는 방법

---
클레이튼 API에 연결하여 노드 및 네트워크 상태를 확인합니다.

```bash
# execute the command below in the Klaytn DATA_DIR Path
$ sudo kcn attach klay.ipc
> 
```

## 유용한 API

```bash
# Check current block Number
  > klay.blockNumber

# Check my kni address
  > admin.nodeInfo

# Check my dode address
  > governance.nodeAddress

# Check other connected nodes
  > admin.peers

# Add or remove nodes
  > admin.addPeer("kni")
  > admin.removePeer("kni")
```

## API 결과만 가져오기

```jsx
# execute the command below in the Klaytn DATA_DIR Path
$ sudo kcn attach --exec <statement> klay.ipc

e.g.
# Check my dode address
$ sudo kcn attach --exec "governance.nodeAddress" klay.ipc
"0xda23978e6e354fbf25dd87aaf1d1bb4ed112753f"
```

## ken CLI 명령어 <a id="ken-cli-commands"></a>

'켄'은 클레이튼 엔드포인트 노드를 위한 명령줄 인터페이스입니다.

```bash
USAGE:
   ken [options] command [command options] [arguments...]
```

### 명령어 <a id="commands"></a>

`ken`에는 다음과 같은 명령이 있습니다.

```bash
COMMANDS:
   account     Manage accounts
   attach      Start an interactive JavaScript environment (connect to node)
   console     Start an interactive JavaScript environment
   dumpconfig  Show configuration values
   dumpgenesis Dump genesis block JSON configuration to stdout (This command is supoported from Klaytn v1.7.0.)
   init        Bootstrap and initialize a new genesis block
   snapshot    A set of commands based on the snapshot
   version     Show version number
   help, h     Shows a list of commands or help for one command
```

각 명령에 대한 자세한 사용 지침을 보려면 `-h` 옵션을 입력합니다.

```bash
$ ken account -h
Manage accounts, list all existing accounts, import a private key into a new
account, create a new account or update an existing account.
 ...
Keys are stored under <DATADIR>/keystore.
It is safe to transfer the entire directory or the individual keys therein
between klay nodes by simply copying.

Make sure you backup your keys regularly.

USAGE:
   ken account command [command options] [arguments...]

COMMANDS:
     list    Print summary of existing accounts
     new     Create a new account
     update  Update an existing account
     import  Import a private key into a new account
```

```bash
$ ken init -h
init [command options] [arguments...]

The init command initializes a new genesis block and definition for the network.
This is a destructive action and changes the network in which you will be
participating.
 ...
```

### JavaScript 콘솔 <a id="javascript-console"></a>

클레이튼 엔드포인트 노드는 JavaScript 콘솔과 함께 제공됩니다. 콘솔 명령줄에서 EN에 클레이튼 API 호출의 일부를 시작할 수 있습니다. JavaScript 콘솔에 접속하려면 다음 명령을 실행하세요.

```bash
$ ken attach ~/kend_home/klay.ipc
Welcome to the Klaytn JavaScript console

!instance: Klaytn/vX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/kend_home
 modules: admin:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0

 >
```

`attach` 명령은 실행 중인 노드에 연결하고, `console` 명령은 노드를 시작하여 노드에 연결합니다.  

```bash
   attach      Start an interactive JavaScript environment (connect to node)
   console     Start an interactive JavaScript environment
```

#### 모듈 API <a id="module-apis"></a>

콘솔 프롬프트에 모듈 이름을 입력하면 해당 모듈의 사용 가능한 프로퍼티와 함수를 확인할 수 있습니다. 함수에 대한 자세한 내용은 [Klaytn API](../../references/json-rpc/json-rpc.md)를 참고하세요.  

```javascript
> personal
{
  listAccounts: [...],
  listWallets: [...],
  deriveAccount: function(),
  ecRecover: function(),
  getListAccounts: function(callback),
  getListWallets: function(callback),
  importRawKey: function(),
  lockAccount: function(),
  ...
}

> personal.listAccounts
["0x960dba2500ab529693ef8e299210768aa0d55ec8", "0x09a04dc9ac3cd92de5ff0d45ae50ff1b618305d9", "0x36662211c072dadbf5fc1e087ddebd36df986abd", "0xbf9683cf04520eeba6d936a3478de29437c5d048"]
> 
```
