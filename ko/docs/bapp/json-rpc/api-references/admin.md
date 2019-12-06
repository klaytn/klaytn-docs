---
description: >-
  Klaytn 노드를 제어하는 API입니다.
---

# Namespace admin <a id="namespace-admin"></a>

`admin` namespace는 몇몇 비표준 RPC 메서드에 접근할 수 있게 합니다. 이를 통해  네트워크 피어와 RPC 엔드포인트 관리 등, Klaytn 인스턴스를 세밀하게 제어할 수 있습니다.


## admin_nodeInfo <a id="admin_nodeinfo"></a>

`nodeInfo` 관리 속성을 조회하여 실행 중인 Klaytn 노드에 대해 알려진 모든 세밀한 정보를 확인할 수 있습니다.  `klay`와 같은 실행 중인 애플리케이션 프로토콜에 의해 추가된 세부적인 정보뿐만 아니라 [devp2p](https://github.com/ethereum/devp2p/blob/master/README.md) P2P 오버레이 프로토콜에 참여하는 노드 자신의 일반적인 정보도 확인할 수 있습니다.

| 클라이언트 | 메서드 호출                         |
|:-----:| ------------------------------ |
|  콘솔   | `admin.nodeInfo`               |
|  RPC  | `{"method": "admin_nodeInfo"}` |

**매개변수**

없음

**리턴값**

| 형식       | 설명            |
| -------- | ------------- |
| JSON 문자열 | 노드에 대한 정보입니다. |

**예시**

콘솔
```javascript
> admin.nodeInfo
{
   kni: "kni://0bbff960d26fc12a5153ac25d7aaffd654e073a74a8b1aa65034250d47fac610ebe99a83d21d741c6121a32fb01312b49fc0633ae04e80c5eb73c3bc71c5a850@[::]:32323?discport=0",
   id: "0bbff960d26fc12a5153ac25d7aaffd654e073a74a8b1aa65034250d47fac610ebe99a83d21d741c6121a32fb01312b49fc0633ae04e80c5eb73c3bc71c5a850",
   ip: "::",
   listenAddr: "[::]:32323",
   name: "Klaytn/validator-1/vX.X.X/XXXX-XXXX/goX.X.X",
   ports: {
     discovery: 0,
     listener: 32323
   },
   protocols: {
     istanbul: {
       config: {
         chainId: 2018,
         isBFT: true,
         istanbul: {...},
         unitPrice: 0
       },
       difficulty: 52794,
       genesis: "0x42824367c973785245923a712cf2e5a99aae6a26f44e4f1ec686a0e60986644e",
       head: "0x4c3000a6f8c40b0507d8ee4a3fc5c9865df0a8d66f882366ea95473c87342005",
       network: 2017
     }
   }
}
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_nodeInfo","id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,
"result":               {"id":"377ef808aff73a397d133b3bf160df586054c98c0e6a65c8fce9560e6a0632bc975419f461803d27f28ee270287113cc2359225814debc1bfb2f811061e14c5d", "name":"Klaytn/vvX.X.X/XXXX-XXXX/goX.X.X",    "kni":"kni://377ef808aff73a397d133b3bf160df586054c98c0e6a65c8fce9560e6a0632bc975419f461803d27f28ee270287113cc2359225814debc1bfb2f811061e14c5d@[::]:32323?discport=0",
"ip":"::",
"ports":{"discovery":0,"listener":32323},
"listenAddr":"[::]:32323",
"protocols":{"istanbul":{"network":1000,"difficulty":1,"genesis":"0x06806bd8b1e086dfb7098a289da07037a3af58e793d205d20f61c88eeea9351d","config":{"chainId":1000,"istanbul":{"epoch":30000,"policy":0,"sub":7},"isBFT":true,"unitPrice":25000000000,"deriveShaImpl":0},"head":"0x06806bd8b1e086dfb7098a289da07037a3af58e793d205d20f61c88eeea9351d"}}}}
```


## admin_datadir <a id="admin_datadir"></a>

`datadir` 관리 속성을 조회하여 실행 중인 Klaytn 노드가 현재 데이터베이스를 저장하는 데에 사용하는 절대 경로를 확인할 수 있습니다. 기본으로 설정된 경로는 노드 유형(kcn, kpn, ken)과 운영체제에 따라 다릅니다.

| 클라이언트 | 메서드 호출                        |
|:-----:| ----------------------------- |
|  콘솔   | `admin.datadir`               |
|  RPC  | `{"method": "admin_datadir"}` |

**매개변수**

없음

**리턴값**

| 형식  | 설명                |
| --- | ----------------- |
| 문자열 | `datadir`의 경로입니다. |

**예시**

콘솔

```javascript
> admin.datadir
"/home/user/Library/KEN"
```
HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_datadir","id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":"/your/dir/ken/data/dd"}
```


## admin_peers <a id="admin_peers"></a>

`peers` 관리 속성을 조회하여 연결된 원격 노드에 대한 세밀한 정보를 확인할 수 있습니다. 실행 중인 애플리케이션 프로토콜에 의해 추가된 세부적인 정보뿐만 아니라 [devp2p](https://github.com/ethereum/devp2p/blob/master/README.md) P2P 오버레이 프로토콜에 참여하는 노드 자신의 일반적인 정보도 확인할 수 있습니다.

| 클라이언트 | 메서드 호출                      |
|:-----:| --------------------------- |
|  콘솔   | `admin.peers`               |
|  RPC  | `{"method": "admin_peers"}` |

**매개변수**

없음

**리턴값**

| 형식       | 설명                   |
| -------- | -------------------- |
| JSON 문자열 | 연결된 모든 피어에 대한 정보입니다. |

**예시**

콘솔

```javascript
> admin.peers
[{
    caps: ["istanbul/64"],
    id: "5d73afadf1eb4d6ccd1e10ab0f00301a1642b102fb521f170f4eaa4b3cb9a58788d1e2b387d6ce3726cb4786d034feb7dd17b5055b6d9a888520011e5756c89e",
    name: "Klaytn/validator-3/vX.X.X/XXXX-XXXX/goX.X.X",
    network: {
      inbound: true,
      localAddress: "127.0.0.1:32323",
      nodeType: "cn",
      remoteAddress: "127.0.0.1:63323",
      static: false,
      trusted: false
    },
    protocols: {
      istanbul: {
        difficulty: 52794,
        head: "0x4c3000a6f8c40b0507d8ee4a3fc5c9865df0a8d66f882366ea95473c87342005",
        version: 64
      }
    }
},  /* ... */ {
    caps: ["istanbul/64"],
    id: "8bcf4297aa6bb46121bb20a18b7af8f1eaad7e7435c71cb64109511a73c5507744bca138ee76b52d06cecedde9d88fdfddbffc5c3b80c5cbace3c326d5df5f1f",
    name: "Klaytn/validator-2/vX.X.X/XXXX-XXXX/goX.X.X",
    networks: [{
      inbound: true,
      localAddress: "127.0.0.1:32323",
      nodeType: "cn",
      remoteAddress: "127.0.0.1:63247",
      static: false,
      trusted: false
    }],
    protocols: {
      istanbul: {
        difficulty: 52794,
        head: "0x4c3000a6f8c40b0507d8ee4a3fc5c9865df0a8d66f882366ea95473c87342005",
        version: 64
      }
    }
}]
```
HTTP RPC

**참고**: 아래 IP 주소들은 예시입니다. 실행 환경에서의 실제 IP 주소로 바꿔주세요.

```shell
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_peers","id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":[{"id":"144af69d2bb030c6a2a5ceee7445dc613e200f19358547cffc353d56e6c8a5b4186a6953c028b6afd0ab3c2bfc4c86f24b0bf855d0686b964ec65cefd3deec37","name":"Klaytn/vvX.X.X/XXXX-XXXX/goX.X.X","caps":["istanbul/64"],"network":{"localAddress":"10.0.10.1:49355","remoteAddress":"10.0.0.1:32323","inbound":false,"trusted":false,"static":true},"protocols":{"istanbul":{"version":64,"difficulty":1285901,"head":"0x2d04ac52df4af08a9a0e15d5939c29decb00031e7b3f6abd05bc0c731f6b5561"}}},{"id":"a875620f67f0b12edb97d0ec269e7940f2505b1f62576f39858c37e1d7f956318c3a619239f03f806a79ccaa8e7e9b5def343c24a9fd2e9d715964e0952dd995","name":"Klaytn/vvX.X.X/XXXX-XXXX/goX.X.X","caps":["istanbul/64"],"networks":[{"localAddress":"10.0.10.2:49353","remoteAddress":"10.0.0.2:32323","inbound":false,"trusted":false,"static":true}],"protocols":{"istanbul":{"version":64,"difficulty":1285901,"head":"0x2d04ac52df4af08a9a0e15d5939c29decb00031e7b3f6abd05bc0c731f6b5561"}}},{"id":"e18d6d4e0ffac0a51028a8d49a548295ac8ac50d064f3581600799a3ae761a61f0b39c38b4195e163e01f30db616debf61b5b2ddea716bc8fb1c907ce7a1de26","name":"Klaytn/vvX.X.X/XXXX-XXXX/goX.X.X","caps":["istanbul/64"],"network":{"localAddress":"10.0.10.3:49354","remoteAddress":"10.0.0.3:32323","inbound":false,"trusted":false,"static":true},"protocols":{"istanbul":{"version":64,"difficulty":1285900,"head":"0x2e228a45c7c9b9e6729b6c66b31957d6cb62ce53e32cedf156615a4e8a2e253a"}}}]}
```


## admin_addPeer <a id="admin_addpeer"></a>

`addPeer` 관리 메서드는 추적된 정적 노드들의 목록에 새로운 원격 노드를 추가하도록 요청합니다. 각 노드는 목록의 노드들과의 연결을 항상 유지하고자 하고, 만약 원격 가끔씩 연결이 끊어지면 다시 연결합니다.

이 메서드는 한 매개변수 kni(Klaytn Network Identifier)만을 입력으로 받습니다. 이는 geth의 [`enode`](https://github.com/ethereum/wiki/wiki/enode-url-format) 개념과 유사합니다. 메서드의 입력으로 받을 kni는 추적할 원격 피어의 URL이며, 해당 피어의 추적이 허용되었는지 또는 어떤 오류가 발생했는지에 따라 `BOOL`을 반환합니다.

| 클라이언트 | 메서드 호출                                         |
|:-----:| ---------------------------------------------- |
|  콘솔   | `admin.addPeer(url)`                           |
|  RPC  | `{"method": "admin_addPeer", "params": [url]}` |

**매개변수**

| 명칭  | 형식  | 설명                |
| --- | --- | ----------------- |
| url | 문자열 | 피어의 `kni` URL입니다. |

**리턴값**

| 형식   | 설명                                                |
| ---- | ------------------------------------------------- |
| bool | 피어 추적이 허용되면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다. |

**예시**

콘솔
```javascript
> admin.addPeer("kni://a979fb575495b8d6db44f750317d0f4622bf4c2aa3365d6af7c284339968eef29b69ad0dce72a4d8db5ebb4968de0e3bec910127f134779fbcb0cb6d3331163c@10.0.0.1:32323") //This is an example address.
true
```
HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_addPeer","params":["kni://a979fb575495b8d6db44f750317d0f4622bf4c2aa3365d6af7c284339968eef29b69ad0dce72a4d8db5ebb4968de0e3bec910127f134779fbcb0cb6d3331163c@10.0.0.1:32323"],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":true}
```


## admin_removePeer <a id="admin_removepeer"></a>

`removePeer` 관리 메서드는 추적된 정적 노드들의 목록에서 노드를 제거하도록 요청합니다.

이 메서드는 한 매개변수 kni(Klaytn Network Identifier)만을 입력으로 받습니다. 이는 geth의 [`enode`](https://github.com/ethereum/wiki/wiki/enode-url-format) 개념과 유사합니다. 메서드의 입력으로 받을 kni는 목록에서 제거할 피어의 URL이며, 해당 피어가 제거되었는지 또는 어떤 오류가 발생했는지에 따라 `BOOL`을 반환합니다.

| 클라이언트 | 메서드 호출                                            |
|:-----:| ------------------------------------------------- |
|  콘솔   | `admin.removePeer(url)`                           |
|  RPC  | `{"method": "admin_removePeer", "params": [url]}` |

**매개변수**

| 명칭  | 형식  | 설명                |
| --- | --- | ----------------- |
| url | 문자열 | 피어의 `kni` URL입니다. |

**리턴값**

| 형식   | 설명                                                |
| ---- | ------------------------------------------------- |
| bool | 피어 제거가 완료되면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다. |

**예시**

콘솔
```javascript
> admin.removePeer("kni://a979fb575495b8d6db44f750317d0f4622bf4c2aa3365d6af7c284339968eef29b69ad0dce72a4d8db5ebb4968de0e3bec910127f134779fbcb0cb6d3331163c@10.0.0.1:32323") //This is an example address.
true
```
HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_removePeer","params":["kni://a979fb575495b8d6db44f750317d0f4622bf4c2aa3365d6af7c284339968eef29b69ad0dce72a4d8db5ebb4968de0e3bec910127f134779fbcb0cb6d3331163c@10.0.0.1:32323"],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":true}
```


## admin_startRPC <a id="admin_startrpc"></a>

`startRPC` 관리 메서드는 HTTP 기반의 [JSON RPC](http://www.jsonrpc.org/specification) API 웹서버를 시작하여 클라이언트 요청을 처리하도록 합니다.

이 메서드는 HTTP RPC 리스너가 열려있는지 여부를 나타내는 불리언 플래그를 반환합니다. 동시에 하나의 HTTP 엔드포인트만이 활성화될 수 있음을 참고해주세요.

| 클라이언트 | 메서드 호출                                                             |
|:-----:| ------------------------------------------------------------------ |
|  콘솔   | `admin.startRPC(host, port, cors, apis)`                           |
|  RPC  | `{"method": "admin_startRPC", "params": [host, port, cors, apis]}` |

**매개변수**

| 명칭   | 형식  | 설명                                                                                                                            |
| ---- | --- | ----------------------------------------------------------------------------------------------------------------------------- |
| host | 문자열 | (선택사항) 리스너 소켓이 열려있는 네트워크 인터페이스입니다. (기본 설정:  `"localhost"`)                                                                    |
| port | int | (선택사항) 리스너 소켓이 열려있는 네트워크 포트입니다. (기본 설정:  `8551`)                                                                              |
| cors | 문자열 | (선택사항) 사용할 [cross-origin resource sharing](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) 헤더입니다. (기본 설정:  `""`) |
| apis | 문자열 | (선택사항) 이 인터페이스를 통해 제공할 API 모듈입니다. (기본 설정:  `"klay,net,rpc"`)                                                                  |

**리턴값**

| 형식   | 설명                                                      |
| ---- | ------------------------------------------------------- |
| bool | HTTP RPC 리스너가 열리면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다. |

**예시**

콘솔

```javascript
> admin.startRPC("127.0.0.1", 8551)
true
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_startRPC","id":1, "params":["127.0.0.1", 8551, "", "klay"]}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"error":{"code":-32000,"message":"HTTP RPC already running on 127.0.0.1:8551"}}
```


## admin_stopRPC <a id="admin_stoprpc"></a>

`stopRPC` 관리 메서드는 현재 열려있는 HTTP RPC 엔드포인트를 닫습니다. 노드는 하나의 HTTP 엔드포인트를 실행할 수 있기 때문에 이 메서드에 매개변수는 필요하지 않으며, 엔드포인트가 닫혔는지 여부에 따라 불리언으로 결과를 반환합니다.

| 클라이언트 | 메서드 호출                        |
|:-----:| ----------------------------- |
|  콘솔   | `admin.stopRPC()`             |
|  RPC  | `{"method": "admin_stopRPC"}` |

**매개변수**

없음

**리턴값**

| 형식   | 설명                                               |
| ---- | ------------------------------------------------ |
| bool | 엔드포인트가 닫히면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다. |

**예시**

콘솔

```javascript
> admin.stopRPC()
true
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_stopRPC","id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":true}
```


## admin_startWS <a id="admin_startws"></a>

`startWS` 관리 메서드는 웹소켓 기반의 [JSON RPC](http://www.jsonrpc.org/specification) API 웹서버를 시작하여 클라이언트 요청을 처리하도록 합니다.

이 메서드는 웹소켓 RPC 리스너가 열려있는지 여부를 나타내는 불리언 플래그를 반환합니다. 동시에 하나의 웹소켓 엔드포인트만이 활성화될 수 있음을 참고해주세요.

| 클라이언트 | 메서드 호출                                                            |
|:-----:| ----------------------------------------------------------------- |
|  콘솔   | `admin.startWS(host, port, cors, apis)`                           |
|  RPC  | `{"method": "admin_startWS", "params": [host, port, cors, apis]}` |

**매개변수**

| 명칭   | 형식  | 설명                                                                                                                            |
| ---- | --- | ----------------------------------------------------------------------------------------------------------------------------- |
| host | 문자열 | (선택사항) 리스너 소켓이 열려있는 네트워크 인터페이스입니다. (기본 설정:  `"localhost"`)                                                                    |
| port | int | (선택사항) 리스너 소켓이 열려있는 네트워크 포트입니다. (기본 설정:  `8552`)                                                                              |
| cors | 문자열 | (선택사항) 사용할 [cross-origin resource sharing](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) 헤더입니다. (기본 설정:  `""`) |
| apis | 문자열 | (선택사항) 이 인터페이스를 통해 제공할 API 모듈입니다. (기본 설정:  `"klay,net,personal"`)                                                             |

**리턴값**

| 형식   | 설명                                                     |
| ---- | ------------------------------------------------------ |
| bool | 웹소켓 RPC 리스너가 열리면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다. |

**예시**

콘솔

```javascript
> admin.startWS("127.0.0.1", 8552)
true
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_startWS","params":["127.0.0.1", 8552, "", "klay"],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":true}
```


## admin_stopWS <a id="admin_stopws"></a>

`stopWS` 관리 메서드는 현재 열려있는 웹소켓 RPC 엔드포인트를 닫습니다. 노드는 하나의 웹소켓 엔드포인트를 실행할 수 있기 때문에 이 메서드에 매개변수는 필요하지 않으며, 엔드포인트가 닫혔는지 여부에 따라 불리언으로 결과를 반환합니다.

| 클라이언트 | 메서드 호출                       |
|:-----:| ---------------------------- |
|  콘솔   | `admin.stopWS()`             |
|  RPC  | `{"method": "admin_stopWS"}` |

**매개변수**

없음

**리턴값**

| 형식   | 설명                                               |
| ---- | ------------------------------------------------ |
| bool | 엔드포인트가 닫히면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다. |

**예시**

콘솔

```javascript
> admin.stopWS()
true
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_stopWS","id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":true}
```


## admin_exportChain <a id="admin_exportchain"></a>

`exportChain` 관리 메서드는 블록체인을 파일로 내보냅니다.

| 클라이언트 | 메서드 호출                                                   |
|:-----:| -------------------------------------------------------- |
|  콘솔   | `admin.exportChain(fileName)`                            |
|  RPC  | `{"method": "admin_importChain"}, "params": [fileName]}` |

**매개변수**

| 명칭       | 형식  | 설명                       |
| -------- | --- | ------------------------ |
| fileName | 문자열 | 블록체인을 내보낼 파일의 명확한 경로입니다. |

**리턴값**

| 형식   | 설명                                               |
| ---- | ------------------------------------------------ |
| bool | 블록체인을 내보내면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다. |

**예시**

콘솔

```javascript
> admin.exportChain("/tmp/chain.txt")
true
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_exportChain","params":["/tmp/chain.txt"],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":true}
```


## admin_importChain <a id="admin_importchain"></a>

`importChain` 관리 메서드는 내보낸 블록체인을 파일에서 노드로 가져옵니다. 이 메서드는 노드에 블록체인이 존재하지 않는 경우에만 작동합니다. 즉 기존의 데이터를 삭제하지 않습니다.

| 클라이언트 | 메서드 호출                                                   |
|:-----:| -------------------------------------------------------- |
|  콘솔   | `admin.importChain(fileName)`                            |
|  RPC  | `{"method": "admin_importChain"}, "params": [fileName]}` |

**매개변수**

| 명칭       | 형식  | 설명                             |
| -------- | --- | ------------------------------ |
| fileName | 문자열 | 가져올 블록체인을 담고 있는 파일의 명확한 경로입니다. |

**리턴값**

| 형식   | 설명                                               |
| ---- | ------------------------------------------------ |
| bool | 블록체인을 가져오면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다. |

**예시**

콘솔

```javascript
> admin.importChain("/tmp/chain.txt")
true
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"admin_importChain","params":["/tmp/chain.txt"],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":true}
```
