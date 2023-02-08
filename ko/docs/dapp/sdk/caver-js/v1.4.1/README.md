# Introduction <a id="introduction"></a>

`caver-js` is a JavaScript API library that allows developers to interact with a Klaytn node using a HTTP or Websocket connection. It is available on [npm](https://www.npmjs.com/package/caver-js).

## Features <a id="features"></a>

* Complete implementation of Klaytn’s JSON-RPC client API over HTTP and Websocket
* Support of Klaytn transaction, account, and account key types
* JavaScript smart contract package to deploy and execute a smart contract on the Klaytn network
* In-memory wallet for managing Klaytn accounts
* Support of fee-delegation
* Support of the Klaytn wallet key format
* Encoding/decoding of a transaction object in RLP
* Signing of a transaction object
* Easy to port web3-js application to caver-js

## Packages in caver-js <a id="packages-in-caver-js"></a>

Below are packages provided in `caver-js`.

* [caver.klay](api-references/caver.klay.md)
* [caver.klay.accounts](api-references/caver.klay.accounts.md)
* [caver.klay.Contract](api-references/caver.klay.Contract.md)
* [caver.klay.net](api-references/caver.klay.net.md)
* [caver.klay.abi](api-references/caver.klay.abi.md)
* [caver.utils](api-references/caver.utils_1.4.1.md)

## Error Code Improvement <a id="error-code-improvement"></a>

The error messages from Ethereum via web3.js are hardly figuring out where the error occurs. `caver-js` improves the interface to catch error messages from Klaytn.

More details can be found in the value of `txError` of the transaction receipt like the below:

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

## Caution when Sending a Transaction to Klaytn <a id="caution-when-sending-a-transaction-to-klaytn"></a>

Klaytn은 고정된 가스 가격 \(25 ston = 25 \* 10^9\)을 사용합니다. Klaytn 네트워크에 제출된 다른 가스 가격의 트랜잭션은 거절됩니다. 가스 가격에 대한 자세한 내용은 [Gas and Unit Price Overview](../../../../klaytn/design/transaction-fees/transaction-fees.md#gas-and-unit-price-overview)를 참조하세요. 네트워크에서 사용되는 가스 가격은 [caver.klay.getGasPrice](api-references/caver.klay/config.md#getgasprice)를 사용하여 얻을 수 있습니다.

만일 트랜잭션을 서명할 때나 제출할 때 `gasPrice`가 정의되지 않았을 경우, caver-js는 트랜잭션 가스 가격을 설정하기 위해 [caver.klay.getGasPrice](api-references/caver.klay/config.md#getgasprice) RPC 호출을 사용합니다.

## Links <a id="links"></a>

* caver-js [GitHub repository](https://github.com/klaytn/caver-js)
* caver-js on [npm](https://www.npmjs.com/package/caver-js)


