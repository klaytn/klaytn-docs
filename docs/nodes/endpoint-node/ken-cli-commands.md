<<<<<<<< HEAD:docs/nodes/references/klaytn-command.md
<<<<<<<< HEAD:i18n/ko/docusaurus-plugin-content-docs/current/nodes/endpoint-node/ken-cli-commands.md
# ken CLI 명령어
========
# Klaytn Command

## How to find the Klaytn Directory (Normally “Klaytn DIR”)

---
You can check Klaytn directory at `kcn` or `kpn` config. Config file is located under `/etc/kcnd/conf` or `/etc/kpnd/conf`.

```bash
cat /etc/kcnd/conf/kcnd.conf (or /etc/kpnd/conf/kpnd.conf)

# Find DATA_DIR and LOG_DIR path as below example
DATA_DIR=/var/kcnd/data/
LOG_DIR=/var/kcnd/logs/
```

## How to connect to Klaytn Console

---
Connect to Klaytn API to check node and network status.

```bash
# execute the command below in the Klaytn DATA_DIR Path
$ sudo kcn attach klay.ipc
> 
```

## Useful APIs

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

## How to get the API Result only

```jsx
# execute the command below in the Klaytn DATA_DIR Path
$ sudo kcn attach --exec <statement> klay.ipc

e.g.
# Check my dode address
$ sudo kcn attach --exec "governance.nodeAddress" klay.ipc
"0xda23978e6e354fbf25dd87aaf1d1bb4ed112753f"
```

## ken CLI commands <a id="ken-cli-commands"></a>
>>>>>>>> 57b3cf827 (Replaced with Docusaurus platform and restructured content):docs/nodes/references/klaytn-command.md

'켄'은 클레이튼 엔드포인트 노드를 위한 명령줄 인터페이스입니다.
========
# ken CLI Commands
>>>>>>>> f2acba07983e56516eef4ec8e2afd0eb0efff551:docs/nodes/endpoint-node/ken-cli-commands.md

```bash
USAGE:
   ken [options] command [command options] [arguments...]
```

<<<<<<<< HEAD:docs/nodes/references/klaytn-command.md
<<<<<<<< HEAD:i18n/ko/docusaurus-plugin-content-docs/current/nodes/endpoint-node/ken-cli-commands.md
## 명령어 <a id="commands"></a>
========
### Commands <a id="commands"></a>
>>>>>>>> 57b3cf827 (Replaced with Docusaurus platform and restructured content):docs/nodes/references/klaytn-command.md

`ken`에는 다음과 같은 명령이 있습니다.
========
## Commands

`ken`has the following commands.
>>>>>>>> f2acba07983e56516eef4ec8e2afd0eb0efff551:docs/nodes/endpoint-node/ken-cli-commands.md

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

<<<<<<<< HEAD:docs/nodes/references/klaytn-command.md
각 명령에 대한 자세한 사용 지침을 보려면 `-h` 옵션을 입력합니다.
========
To get a detailed usage guideline for each command, give -h option.
>>>>>>>> f2acba07983e56516eef4ec8e2afd0eb0efff551:docs/nodes/endpoint-node/ken-cli-commands.md

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

<<<<<<<< HEAD:docs/nodes/references/klaytn-command.md
<<<<<<<< HEAD:i18n/ko/docusaurus-plugin-content-docs/current/nodes/endpoint-node/ken-cli-commands.md
## JavaScript 콘솔 <a id="javascript-console"></a>
========
### JavaScript Console <a id="javascript-console"></a>
>>>>>>>> 57b3cf827 (Replaced with Docusaurus platform and restructured content):docs/nodes/references/klaytn-command.md
========
## JavaScript Console
>>>>>>>> f2acba07983e56516eef4ec8e2afd0eb0efff551:docs/nodes/endpoint-node/ken-cli-commands.md

클레이튼 엔드포인트 노드는 JavaScript 콘솔과 함께 제공됩니다. 콘솔 명령줄에서 EN에 클레이튼 API 호출의 일부를 시작할 수 있습니다. JavaScript 콘솔에 접속하려면 다음 명령을 실행하세요.

```bash
$ ken attach ~/kend_home/klay.ipc
Welcome to the Klaytn JavaScript console

!instance: Klaytn/vX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/kend_home
 modules: admin:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0

 >
```

<<<<<<<< HEAD:docs/nodes/references/klaytn-command.md
`attach` 명령은 실행 중인 노드에 연결하고, `console` 명령은 노드를 시작하여 노드에 연결합니다.  
========
attach command connects to the running node, while console command launches a node and connects to it.
>>>>>>>> f2acba07983e56516eef4ec8e2afd0eb0efff551:docs/nodes/endpoint-node/ken-cli-commands.md

```bash
   attach      Start an interactive JavaScript environment (connect to node)
   console     Start an interactive JavaScript environment
```

<<<<<<<< HEAD:docs/nodes/references/klaytn-command.md
<<<<<<<< HEAD:i18n/ko/docusaurus-plugin-content-docs/current/nodes/endpoint-node/ken-cli-commands.md
### 모듈 API <a id="module-apis"></a>

콘솔 프롬프트에 모듈 이름을 입력하면 해당 모듈의 사용 가능한 프로퍼티와 함수를 확인할 수 있습니다. 함수에 대한 자세한 내용은 [Klaytn API](../../references/json-rpc/json-rpc.md)를 참고하세요.  
========
#### Module APIs <a id="module-apis"></a>
========
### Module APIs
>>>>>>>> f2acba07983e56516eef4ec8e2afd0eb0efff551:docs/nodes/endpoint-node/ken-cli-commands.md

If you type the module name on the console prompt, you will see the available properties and functions of the module. For the details of functions, please see [Klaytn API](../../references/json-rpc/json-rpc.md).  
>>>>>>>> 57b3cf827 (Replaced with Docusaurus platform and restructured content):docs/nodes/references/klaytn-command.md

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
