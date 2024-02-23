# caver-js(1.4.1 이하)

`caver-js`는 개발자가 HTTP 또는 웹소켓 연결을 사용하여 Klaytn 노드와 상호작용할 수 있도록 해주는 JavaScript API 라이브러리입니다. [npm](https://www.npmjs.com/package/caver-js)에서 사용할 수 있습니다.

## 기능 <a id="features"></a>

- HTTP와 웹소켓을 통한 클레이튼의 JSON-RPC 클라이언트 API의 완벽한 구현
- 클레이튼 트랜잭션, 계정, 계정 키 유형 지원
- 클레이튼 네트워크에서 스마트 컨트랙트를 배포하고 실행하기 위한 JavaScript 스마트 컨트랙트 패키지
- 클레이튼 계정 관리를 위한 인메모리 지갑
- 수수료 위임 지원
- 클레이튼 지갑 키 포맷 지원
- 트랜잭션 객체를 RLP로 인코딩/디코딩
- 트랜잭션 객체 서명
- web3-js 애플리케이션을 caver-js로 쉽게 포팅 가능

## caver-js의 패키지 <a id="packages-in-caver-js"></a>

아래는 `caver-js`로 제공되는 패키지입니다.

- [caver.klay](./api/caver.klay/caver.klay.md)
- [caver.klay.accounts](./api/caver.klay.accounts.md)
- [caver.klay.Contract](./api/caver.klay.Contract.md)
- [caver.klay.net](./api/caver.klay.net.md)
- [caver.klay.abi](./api/caver.klay.abi.md)
- [caver.utils](./api/caver.utils_1.4.1.md)

## 오류 코드 개선 <a id="error-code-improvement"></a>

web3.js를 통한 이더리움의 에러 메시지는 에러가 어디서 발생하는지 파악하기 어렵습니다. `caver-js`는 클레이튼의 에러 메시지를 포착할 수 있도록 인터페이스를 개선합니다.

자세한 내용은 아래와 같이 트랜잭션 영수증의 `txError` 값에서 확인할 수 있습니다:

```text
Error: runtime error occurred in interpreter
 {
  "blockHash": "0xe7ec35c9fff1178d52cee1d46d40627d19f828c4b06ad1a5c3807698b99acb20",
  "blockNumber": 7811,
  "contractAddress": null,
  "from": "0xa8a2d37727197cc0eb827f8c5a3a3aceb26cf59e",
  "gasUsed": 9900000000,
  "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  "status": false,
  "to": "0xf8425b0f65147969621f9390ca06139c7b439497",
  "transactionHash": "0x85ce2b307899c90144442d9b3236827ac57375c522be2435093aebfd920b8c58",
  "transactionIndex": 0,
  "txError": "0x2",
  "events": {}
}
```

## 클레이튼에 트랜잭션을 보낼 때 주의 사항 <a id="caution-when-sending-a-transaction-to-klaytn"></a>

클레이튼은 고정 가스 가격 (25 ston = 25 \* 10^9)을 사용합니다. 클레이튼 네트워크에 제출된 다른 가격의 트랜잭션은 거부됩니다. For more information about the gas price, see [GasPrice Overview](../../../learn/transaction-fees/transaction-fees.md#gas-price-overview) The price of gas used in the network can be obtained by using [caver.klay.getGasPrice](./api/caver.klay/config.md#getgasprice).

트랜잭션에 서명하거나 제출할 때 `gasPrice`이 정의되지 않은 경우, caver-js는 [caver.klay.getGasPrice](./api/caver.klay/config.md#getgasprice) RPC 호출을 사용하여 트랜잭션의 가스 가격을 설정합니다.

## 링크 <a id="links"></a>

- caver-js [GitHub 리포지토리](https://github.com/klaytn/caver-js)
- caver-js [npm](https://www.npmjs.com/package/caver-js)
