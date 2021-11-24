# 이더리움 컨트랙트 포팅 <a id="porting-ethereum-contract"></a>

대부분의 경우 Klaytn에서 이더리움 컨트랙트를 수정 없이 사용할 수 있습니다. 그러나 다음 두 가지 문제에 유의하셔야 합니다.

## 솔리디티 지원 <a id="solidity-support"></a>

* Baobab network is currently compatible with **istanbul** Ethereum Virtual Machine (EVM).
* Cypress network is currently compatible with **constantinople** Ethereum Virtual Machine (EVM).

**NOTE**: In case of Baobab network, protocol upgrade, or the "hard fork" introduced in klaytn v1.7.0 has been enabled from block number `#75373312`. This led to a transition from **constantinople EVM** to **istanbul EVM**. Cypress mainnet has not enabled the protocol upgrade yet, but soon, it will be subject to the same protocol upgrade in the next version.

다른 EVM 버전들과의 하위 호환성은 보장되지 않습니다. Thus, it is highly recommended compiling Solidity code with the correct target option according to the protocol upgrade status.
* Baobab: --evm-version istanbul
* Cypress: --evm-version constantinople
* Others(private/service chain): determined according to the protocol upgrade status

자세한 내용은 [How to set the EVM version of solc](https://solidity.readthedocs.io/en/latest/using-the-compiler.html#setting-the-evm-version-to-target)를 참고해주세요.


An example command is shown below:

```
$ solc --evm-version istanbul contract.sol
```

## 분리된 키 쌍 <a id="decoupled-key-pairs"></a>

Klaytn [decouples key pairs from addresses](../klaytn/design/accounts.md#decoupling-key-pairs-from-addresses). If user [updates account](../klaytn/design/transactions/basic.md#txtypeaccountupdate), the private key for a specific account is replaced with another one. Most cases this will not affect your business logic. However if your business logic includes ecrecover, you should consider using validateSender. For more details, refer to [here](precompiled-contracts/precompiled-contracts.md).
