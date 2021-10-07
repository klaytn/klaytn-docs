# 소개 <a id="introduction"></a>

본 장에서는 Klaytn API 사용법에 대해 알아봅니다. Toolkit API를 제외한 다른 대부분의 API들은 원격 프로토콜 \(RPC, 웹소켓\)과 Klaytn 자바스크립트 콘솔을 지원합니다. 본 내용은 `ken`을 예시로 들어 작성되었으나 대부분의 API는 `kcn`과 `kpn`에서도 마찬가지로 사용할 수 있습니다.

**참고**: 몇몇 API가 원격 프로토콜과 Klaytn 자바스크립트 콘솔을 지원하지 않기 때문에 원격 프로토콜에서 사용 가능한 API를 위주로 다루고 있습니다. 그 외 API는 추후에 문서화될 예정입니다.

## API 활성화 <a id="enabling-apis"></a>

Klaytn RPC 엔드포인트를 통해 API를 제공하려면 커맨드라인의 `--${interface}api` 인자를 통해 지정해주세요. 즉 `${interface}`을 HTTP 엔드포인트의 경우 `rpc`으로, 웹소켓 엔드포인트의 경우 `ws`로 설정해주세요.

`ipc`는 플래그 없이 unix 소켓 \(Unix\) 또는 명명된 파이프 \(Windows\) 엔드포인트를 통한 API를 제공합니다.

아래 예시처럼 추가하고자 하는 특정 API와 함께 Klaytn 노드를 실행할 수 있습니다. 하지만 노드를 시작한 이후에는 API를 변경할 수 없다는 점을 유의해주세요.

예시\) `klay`와 `net` 모듈을 활성화하며 Klaytn 노드 실행하기

```bash
$ ken --rpcapi klay,net --rpc --{other options}
```

HTTP RPC 인터페이스는 `--rpc` 플래그를 사용해 명시적으로 활성화해야 합니다.

**참고**: HTTP \(`rpc`\) 또는 웹소켓 \(`ws`\) 인터페이스를 통한 API를 제공하는 것은 인터페이스 \(DApp, 브라우저 탭 등\)에 접근할 수 있는 누구에게나 API에 접근할 수 있도록 하는 것입니다. 활성화한 API들에 대해 주의하세요. 기본적으로 Klaytn에서는 IPC \(`ipc`\) 인터페이스를 통한 모든 API가 활성화되어 있지만, `rpc`와 `ws`의 경우 모듈을 직접 활성화해야 합니다.

`modules` JSON-RPC 메서드를 호출하여 인터페이스가 제공하는 API를 확인하세요. 예를 들어 `rpc` 인터페이스의 경우 다음과 같습니다.

**IPC**

```bash
$ echo '{"jsonrpc":"2.0","method":"rpc_modules","params":[],"id":1}' | nc -U klay.ipc
```

**HTTP**

```bash
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"rpc_modules","params":[],"id":1}' http://localhost:8551
```

위 명령은 버전 번호를 포함하여 모든 활성화된 모듈을 제공합니다.

```text
{
   "jsonrpc":"2.0",
   "id":1,
   "result":{
      "admin":"1.0",
      "debug":"1.0",
      "istanbul":"1.0",
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

