# 이더리움 컨트랙트 포팅 <a id="porting-ethereum-contract"></a>

대부분의 경우 Klaytn에서 이더리움 컨트랙트를 수정 없이 사용할 수 있습니다. 그러나 다음 두 가지 문제에 유의하셔야 합니다.

## 솔리디티 지원 <a id="solidity-support"></a>

* Baobab 네트워크는 현재 **London** Ethereum Virtual Machine(EVM)과 호환 가능합니다.
* Cypress 네트워크는 현재 **Constantinople** Ethereum Virtual Machine(EVM)과 호환 가능합니다.

{% hint style="success" %}
v1.7.0 프로토콜 업그레이드 - **Istanbul** 하드포크 및 Klaytn의 자체 사항들을 포함하는 비호환 변경이 적용됩니다. It has been enabled from block number `#75,373,312` in case of Baobab network and `#86,816,005` for the Cypress network.

v1.7.3 프로토콜 업그레이드 - **London** 하드 포크의 Base Fee를 포함한 비호환 변경이 적용됩니다. It has been enabled from block number `#80,295,291` in case of Baobab network and `#86,816,005` for the Cypress network.

v1.8.0 Protocol Upgrade - incompatible changes including Base Fee from the **London** hard fork. It has been enabled from block number `#86,513,895` in case of Baobab network and `#86,816,005` for the Cypress network.
{% endhint %}

다른 EVM 버전들과의 하위 호환성은 보장되지 않습니다. Thus, it is highly recommended compiling Solidity code with the correct target option according to the protocol upgrade status.
* Baobab: --evm-version london
* Cypress: --evm-version constantinople
* 그 외(private/service chain): 프로토콜 업그레이드 상태에 따라 결정

자세한 내용은 [How to set the EVM version of solc](https://solidity.readthedocs.io/en/latest/using-the-compiler.html#setting-the-evm-version-to-target)를 참고해주세요.


An example command is shown below:

```
$ solc --evm-version london contract.sol
```

## 분리된 키 쌍 <a id="decoupled-key-pairs"></a>

Klaytn [decouples key pairs from addresses](../klaytn/design/accounts.md#decoupling-key-pairs-from-addresses). If user [updates account](../klaytn/design/transactions/basic.md#txtypeaccountupdate), the private key for a specific account is replaced with another one. Most cases this will not affect your business logic. However if your business logic includes ecrecover, you should consider using validateSender. For more details, refer to [here](precompiled-contracts/precompiled-contracts.md).
