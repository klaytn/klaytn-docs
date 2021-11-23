# Porting Ethereum Contract <a id="porting-ethereum-contract"></a>

In most cases, you can use Ethereum contracts on Klaytn without any modification.
However, be aware of the following two issues.  

## Solidity Support <a id="solidity-support"></a>

* Baobab network is currently compatible with **istanbul** Ethereum Virtual Machine (EVM).
* Cypress network is currently compatible with **constantinople** Ethereum Virtual Machine (EVM).

**NOTE**: In case of Baobab network, protocol upgrade, or the "hard fork" introduced in klaytn v1.7.0 has been enabled from block number `#75373312`. This led to a transition from **constantinople EVM** to **istanbul EVM**.
Cypress mainnet has not enabled the protocol upgrade yet, but soon, it will be subject to the same protocol upgrade in the next version. 

Backward compatibility is not guaranteed with other EVM versions on Klaytn.
Thus, it is highly recommended compiling Solidity code with the correct target option according to the protocol upgrade status.
* baobab: istanbul
* cypress: constantinople
* other(private/service chain): determined according to the protocol upgrade status

Please refer to [how to set the EVM version of solc](https://solidity.readthedocs.io/en/latest/using-the-compiler.html#setting-the-evm-version-to-target).


An example command is shown below:

```
$ solc --evm-version istanbul contract.sol
```

## Decoupled Key Pairs <a id="decoupled-key-pairs"></a>

Klaytn [decouples key pairs from addresses](../klaytn/design/accounts.md#decoupling-key-pairs-from-addresses). If user [updates account](../klaytn/design/transactions/basic.md#txtypeaccountupdate), the private key for a specific account is replaced with another one. Most cases this will not affect your business logic. However if your business logic includes ecrecover, you should consider using validateSender. For more details, refer to [here](precompiled-contracts/precompiled-contracts.md).
