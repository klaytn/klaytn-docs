# Porting Ethereum Contract <a id="porting-ethereum-contract"></a>

In most cases, you can use Ethereum contracts on Klaytn without any modification.
However, be aware of the following two issues. 

## Solidity Support <a id="solidity-support"></a>

Klaytn is currently compatible with constantinople EVM target option. 
Backward **compatibility** is not guaranteed in other versions. 
Thus, it is highly recommended compiling solidity with constantinople option. 
Please refer [Solidity target option setting page](https://solidity.readthedocs.io/en/v0.6.0/using-the-compiler.html?highlight=compatibility#setting-the-evm-version-to-target).


The example solc command is `solc --evm-version <VERSION> contract.sol`. 
It is also possible with remix IDE.

Klaytn has been thoroughly tested with [openzepplin tests](https://docs.openzeppelin.com/learn/writing-automated-tests#test-environment). 
We run various openzepplin test suite to test Solidity 0.5.x, 0.6.x, and 0.7.x with constantinople target option. 
It passed all, but please check once more.

## Decoupled Key Pairs <a id="decoupled-key-pairs"></a>

Klaytn [decouples key pairs from addresses](../klaytn/design/accounts.md#decoupling-key-pairs-from-addresses). If user [updates account](../klaytn/design/transactions/basic.md#txtypeaccountupdate), the private key for a specific account is replaced with another one. Most cases this will not affect your business logic. However if your business logic includes ecrecover, you should consider using validateSender. For more details, refer to [here](./precompiled-contracts.md).
