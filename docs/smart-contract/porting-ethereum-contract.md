# Porting Ethereum Contract

In most cases, you can use Ethereum contracts on Klaytn without any modification. However, be aware of the following two issues.

## Solidity Support <a id="solidity-support"></a>

Klaytn is currently compatible with **Constantinople** Ethereum Virtual Machine (EVM) version. 
Backward compatibility is not guaranteed with other EVM versions on Klaytn.
Thus, it is highly recommended to compile Solidity code with the Constantinople target option. 
Please refer to [how to set the EVM version of solc](https://solidity.readthedocs.io/en/latest/using-the-compiler.html#setting-the-evm-version-to-target).


An example command is shown below:

```
$ solc --evm-version constantinople contract.sol
```

Klaytn has been thoroughly tested with [OpenZeppelin tests](https://docs.openzeppelin.com/learn/writing-automated-tests#test-environment). 
We run the OpenZeppelin test suite to test various Solidity versions (0.5.x, 0.6.x, and 0.7.x) with the Constantinople target option on Klaytn.

## Decoupled Key Pairs <a id="decoupled-key-pairs"></a>

Klaytn [decouples key pairs from addresses](../klaytn/design/accounts.md#decoupling-key-pairs-from-addresses). If user [updates account](../klaytn/design/transactions/basic.md#txtypeaccountupdate), the private key for a specific account is replaced with another one. Most cases this will not affect your business logic. However if your business logic includes ecrecover, you should consider using validateSender. For more details, refer to [here](precompiled-contracts.md).
