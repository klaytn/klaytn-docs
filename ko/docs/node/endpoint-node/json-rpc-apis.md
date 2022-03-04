엔드포인트 노드는 JSON-RPC API로 접근할 수 있습니다. 다음과 같이 API를 활성화하거나 비활성화할 수 있습니다. For the detailed API specification, please refer to the [JSON-RPC APIs](../../dapp/json-rpc/api-references/README.md).

**NOTE**: HTTP (`rpc`) 또는 웹소켓 (`ws`) 인터페이스를 통한 API를 제공하는 것은 인터페이스 (DApp, 브라우저 탭 등)에 접근할 수 있는 누구에게나 API에 접근할 수 있도록 하는 것입니다. 활성화한 API들에 대해 주의하세요. 기본적으로 Klaytn에서는 IPC (`ipc`) 인터페이스를 통한 모든 API가 활성화되어 있지만, `rpc`와 `ws`의 경우 모듈을 직접 활성화해야 합니다.

## API 활성화  <a id="enabling-apis"></a>

### 커맨드라인을 통한 활성화 <a id="from-commandline"></a>
Klaytn RPC 엔드포인트를 통해 API를 제공하려면 커맨드라인의 `--${interface}api` 인자를 통해 지정해주세요. 즉 `${interface}`을 HTTP 엔드포인트의 경우 `rpc`으로, 웹소켓 엔드포인트의 경우 `ws`로 설정해주세요.

`ipc`는 플래그 없이 unix 소켓 (Unix) 또는 명명된 파이프 (Windows) 엔드포인트를 통한 API를 제공합니다.

아래 예시처럼 추가하고자 하는 특정 API와 함께 Klaytn 노드를 실행할 수 있습니다. 하지만 노드를 시작한 이후에는 API를 변경할 수 없다는 점을 유의해주세요.

예시) `klay`와 `net` 모듈을 활성화하며 Klaytn 노드 실행하기

```shell
$ ken --rpcapi klay,net --rpc --{other options}
```

HTTP RPC 인터페이스는 `--rpc` 플래그를 사용해 명시적으로 활성화해야 합니다.

### 환경설정을 통한 활성화 <a id="using-configuration"></a>

`RPC_ENABLE`, `RPC_API`, `WS_ENABLE`, `WS_API` 속성을 [환경설정 파일](operation-guide/configuration.md)에서 업데이트하세요.

## 활성화된 API 조회 <a id="querying-enabled-apis"></a>

`modules` JSON-RPC 메서드를 호출하여 인터페이스가 제공하는 API를 확인하세요. 예를 들어 `rpc` 인터페이스의 경우 다음과 같습니다.

**IPC**

```javascript
$ echo '{"jsonrpc":"2.0","method":"rpc_modules","params":[],"id":1}' | nc -U klay.ipc
```

**HTTP**

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"rpc_modules","params":[],"id":1}' https://api.baobab.klaytn.net:8651
```

위 명령은 버전 번호를 포함하여 모든 활성화된 모듈을 제공합니다.

```
{
   "jsonrpc":"2.0",
   "id":1,
   "result":{
      "admin":"1.0",
      "debug":"1.0",
      "klay":"1.0",
      "miner":"1.0",
      "net":"1.0",
      "personal":"1.0",
      "rpc":"1.0",
      "txpool":"1.0",
      "web3":"1.0"
   }
}
```

