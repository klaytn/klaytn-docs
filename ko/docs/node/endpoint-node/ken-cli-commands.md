# ken CLI 명령어

`ken` Klaytn Endpoint Node의 명령 줄 인터페이스(CLI)입니다.

```bash
USAGE:
   ken [options] command [command options] [arguments...]
```

## 명령어

`ken`에는 다음의 명령어들이 있습니다.

```bash
명령어:
   account     계정을 관리합니다
   attach      대화형 자바스크립트 환경을 시작합니다 (노드에 연결합니다)
   console     대화형 자바스크립트 환경을 시작합니다
   dumpconfig  환경 설정값을 나타냅니다
   init        제네시스 블록을 부트스트랩하고 초기화합니다
   version     버전 번호를 나타냅니다
   help, h     명령어 리스트 또는 명령어에 대한 도움말을 나타냅니다
```

`-h` 옵션을 사용하여 각 명령에 대한 자세한 사용법을 확인해주세요.

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

## 자바스크립트 콘솔

Klaytn Endpoint Node는 자바스크립트 콘솔과 함께 제공됩니다. 콘솔 명령 행에서 EN을 향한 Klaytn API 호출의 일부를 시작할 수 있습니다. 자바스크립트 콘솔에 연결하려면 다음 명령을 실행하세요.

```bash
$ ken attach ~/kend_home/klay.ipc
Welcome to the Klaytn JavaScript console

!instance: Klaytn/vX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/kend_home
 modules: admin:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0

 >
```

명령어 `attach`는 이미 실행 중인 노드에 연결하고, 명령어 `console`은 노드를 새로 실행시키고 연결합니다.

```bash
   attach       대화형 자바스크립트 환경을 시작합니다 (노드에 연결합니다)
   console      대화형 자바스크립트 환경을 시작합니다
```

### Module APIs

If you type the module name on the console prompt, you will see the available properties and functions of the module. For the details of functions, please see [Klaytn API](../../bapp/json-rpc/api-references/README.md).

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
