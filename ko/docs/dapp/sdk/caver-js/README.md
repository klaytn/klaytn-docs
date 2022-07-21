# 소개 <a id="introduction"></a>

`caver-js`는 개발자가 HTTP 또는 웹소켓 연결을 사용하여 Klaytn 노드와 상호작용할 수 있도록 하는 자바스크립트 API 라이브러리입니다. [npm](https://www.npmjs.com/package/caver-js) 이용이 가능합니다.

## 주요 기능 <a id="features"></a>

* HTTP 및 웹소켓을 통한 Klaytn의 JSON-RPC 클라이언트 API의 완전한 구현
* Klaytn 트랜잭션, 계정 및 계정 키 유형 지원
* Klaytn 네트워크에서 스마트 컨트랙트를 배포하고 실행하기위한 자바스크립트 스마트 컨트랙트 패키지
* Klaytn 계정 관리를 위한 인메모리 지갑
* 수수료 위임 지원
* Klaytn Wallet 키 형식 지원
* RLP에서 트랜잭션 오브젝트의 인코딩/디코딩
* 트랜잭션 객체의 서명
* web3-js 애플리케이션을 caver-js로 쉽게 포팅

## caver-js의 패키지 <a id="packages-in-caver-js"></a>

아래는 `caver-js`로 제공되는 패키지들입니다.

* [caver.account](api-references/caver.account.md)
* [caver.wallet.keyring](api-references/caver.wallet/keyring.md)
* [caver.wallet](api-references/caver.wallet/README.md)
* [caver.transaction](api-references/caver.transaction/README.md)
* [caver.rpc](api-references/caver.rpc/README.md)
* [caver.contract](api-references/caver.contract.md)
* [caver.abi](api-references/caver.abi.md)
* [caver.kct](api-references/caver.kct/README.md)
* [caver.validator](api-references/caver.validator.md)
* [caver.utils](api-references/caver.utils.md)
* [caver.ipfs](api-references/caver.ipfs.md)

## 오류 코드 개선 <a id="error-code-improvement"></a>

web3.js를 통한 Ethereum의 오류 메시지로는 오류가 발생한 위치를 거의 파악하지 못합니다. `caver-js`는 Klaytn에서 오류 메시지를 포착하도록 인터페이스를 개선합니다.

자세한 내용은 아래와 같이 트랜잭션 영수증의 `txError` 값에서 찾을 수 있습니다:

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

## Klaytn에 트랜잭션을 보낼 때 주의사항 <a id="caution-when-sending-a-transaction-to-klaytn"></a>

Klaytn has a new gas price policy since the Magma hard fork which enabled the [KIP-71](https://kips.klaytn.foundation/KIPs/kip-71).

Therefore, you need to set the `gasPrice` logic differently when sending a transaction, depending on whether the hard fork is applicable or not.

Until the Magma hard fork, transactions on Klaytn have been subject to a "fixed gas price". Therefore, transactions with any other price submitted to the network are rejected. If `gasPrice` is not defined when you sign or submit a transaction, caver-js uses [caver.rpc.klay.getGasPrice][] RPC call to set the gas price.

After the Magma hard fork, Klaytn uses a "dynamic gas fee pricing mechanism". The gas price of the transaction should be higher than the base fee of the Klaytn network. If `gasPrice` is not defined when you sign or submit a transaction, caver-js sets the `gasPrice` field of the transaction using `caver.rpc.klay.getGasPrice`.

### How to set gasPrice field

caver-js provides various ways to set the `gasPrice`. Ways to set the `gasPrice` field when using caver-js are suggested below. The methods described here can be used regardless of the hard fork.

#### Do not define `gasPrice` field

If you create an instance without defining the `gasPrice` field, the `gasPrice` field is automatically set when you call `tx.sign` or `tx.signAsFeePayer` to sign a transaction.

```
const tx = caver.transaction.valueTransfer.create({ from, to, value, gas })
await tx.sign(from, tx) // Before signing, gasPrice is set inside `tx.sign`.
```

#### Use `tx.fillTransaction` method

You can use `tx.fillTransaction`, a function that fills the optional fields of a transaction with appropriate values when they are omitted.

```
const tx = caver.transaction.valueTransfer.create({ from, to, value, gas })
await tx.fillTransaction() // Fill the optional tx fields. 
```

#### Use `tx.suggestGasPrice` method

You can set the `gasPrice` with the result of `tx.suggestGasPrice` which returns the recommended gas price.

```
const tx = caver.transaction.valueTransfer.create({ from, to, value, gas })
tx.gasPrice = await tx.suggestGasPrice() 
```

For more information about the gas price, see [Gas and Unit Price Overview](../../../klaytn/design/transaction-fees/transaction-fees.md#gas-and-unit-price-overview) The price of gas used in the network can be obtained by using [caver.rpc.klay.getGasPrice][].

## 링크 <a id="links"></a>

* caver-js [깃허브 레포지토리](https://github.com/klaytn/caver-js)
* caver-js on [npm](https://www.npmjs.com/package/caver-js)

[caver.rpc.klay.getGasPrice]: api-references/caver.rpc/klay.md#caver-rpc-klay-getgasprice
