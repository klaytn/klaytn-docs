# caver-js(1.5.0 이상)

![](/img/references/klaytnXcaver-js.png)

`caver-js`는 개발자가 HTTP 또는 웹소켓 연결을 사용하여 Klaytn 노드와 상호작용할 수 있도록 해주는 JavaScript API 라이브러리입니다. [npm](https://github.com/klaytn/caver-js)에서 사용할 수 있습니다.

## 기능 <a href="#features" id="features"></a>

- HTTP와 웹소켓을 통한 클레이튼의 JSON-RPC 클라이언트 API의 완벽한 구현
- 클레이튼 트랜잭션, 계정, 계정 키 유형 지원
- 클레이튼 네트워크에서 스마트 컨트랙트를 배포하고 실행하기 위한 JavaScript 스마트 컨트랙트 패키지
- 클레이튼 계정 관리를 위한 인메모리 지갑
- 수수료 위임 지원
- 클레이튼 지갑 키 포맷 지원
- 트랜잭션 객체를 RLP로 인코딩/디코딩
- 트랜잭션 객체 서명
- web3-js 애플리케이션을 caver-js로 쉽게 포팅 가능

## caver-js의 패키지 <a href="#packages-in-caver-js" id="packages-in-caver-js"></a>

아래는 `caver-js`로 제공되는 패키지입니다.

- [caver.account](./api/caver.account.md)
- [caver.wallet.keyring](./api/caver-wallet/keyring.md)
- [caver.wallet](./api/caver-wallet/caver-wallet.md)
- [caver.transaction](./api/caver-transaction/caver-transaction.md)
- [caver.rpc](./api/caver-rpc/caver-rpc.md)
- [caver.contract](./api/caver.contract.md)
- [caver.abi](./api/caver.abi.md)
- [caver.kct](./api/caver-kct/caver-kct.md)
- [caver.validator](./api/caver.validator.md)
- [caver.utils](./api/caver.utils.md)
- [caver.ipfs](./api/caver.ipfs.md)

## 오류 코드 개선 <a href="#error-code-improvement" id="error-code-improvement"></a>

web3.js를 통한 이더리움의 에러 메시지는 에러가 어디서 발생하는지 파악하기 어렵습니다. `caver-js`는 클레이튼의 에러 메시지를 포착할 수 있도록 인터페이스를 개선합니다.

자세한 내용은 아래와 같이 트랜잭션 영수증의 `txError` 값에서 확인할 수 있습니다:

```
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

## 클레이튼에 트랜잭션을 보낼 때 주의 사항 <a href="#caution-when-sending-a-transaction-to-klaytn" id="caution-when-sending-a-transaction-to-klaytn"></a>

클레이튼은 Magma 하드포크 이후 [KIP-71](https://kips.klaytn.foundation/KIPs/kip-71)에서 제안된 새로운 가스 가격 정책을 적용하고 있습니다.

따라서 트랜잭션을 전송할 때 하드포크 적용 여부에 따라 `gasPrice` 로직을 다르게 설정해야 합니다.

Magma 하드포크 이전까지 클레이튼의 트랜잭션은 "고정 가스 가격"이 적용되었습니다. 따라서 네트워크에 제출된 다른 가격의 트랜잭션은 거부됩니다. 트랜잭션에 서명하거나 제출할 때 `gasPrice`이 정의되지 않은 경우, caver-js는 [caver.rpc.klay.getGasPrice](https://kips.klaytn.foundation/KIPs/kip-71) RPC 호출을 사용하여 가스 가격을 설정합니다.

Magma 하드포크 이후, 클레이튼은 "동적 가스비 가격 책정 메커니즘"을 사용합니다. 트랜잭션의 가스비는 Klaytn 네트워크의 기본 수수료보다 높아야 합니다. 트랜잭션에 서명하거나 제출할 때 `gasPrice`가 정의되지 않은 경우, caver-js는 `caver.rpc.klay.getGasPrice`를 사용하여 트랜잭션의 `gasPrice` 필드를 설정합니다.

### gasPrice 필드 설정 방법

caver-js는 `gasPrice`를 설정하는 다양한 방법을 제공합니다. caver-js를 사용할 때 `gasPrice` 필드를 설정하는 방법은 아래와 같습니다. 여기에 설명된 방법은 하드포크와 상관없이 사용할 수 있습니다.

#### `gasPrice` 필드를 정의하지 마십시오.

`gasPrice` 필드를 정의하지 않고 인스턴스를 생성하는 경우, 트랜잭션에 서명하기 위해 `tx.sign` 또는 `tx.signAsFeePayer`를 호출할 때 `gasPrice` 필드가 자동으로 설정됩니다.

```
const tx = caver.transaction.valueTransfer.create({ from, to, value, gas })
await tx.sign(from, tx) // Before signing, gasPrice is set inside `tx.sign`.
```

#### `tx.fillTransaction` 메서드 사용

트랜잭션의 선택적 필드가 생략된 경우 적절한 값으로 채우는 함수인 `tx.fillTransaction`을 사용할 수 있습니다.

```
const tx = caver.transaction.valueTransfer.create({ from, to, value, gas })
await tx.fillTransaction() // Fill the optional tx fields. 
```

#### `tx.suggestGasPrice` 메서드 사용

권장 가스 가격을 반환하는 `tx.suggestGasPrice`의 결과로 `gasPrice`를 설정할 수 있습니다.

```
const tx = caver.transaction.valueTransfer.create({ from, to, value, gas })
tx.gasPrice = await tx.suggestGasPrice() 
```

가스 가격에 대한 자세한 내용은 [가스 및 단가 개요](../../../learn/transaction-fees.md#gas-and-unit-price-overview)를 참조하세요.

## 링크 <a href="#links" id="links"></a>

- caver-js [GitHub 리포지토리](./api/caver-rpc/klay.md#caver-rpc-klay-getgasprice)
- caver-js [npm](https://github.com/klaytn/caver-js)
