# Porting Ethereum Contract

In most cases, you can use Ethereum contracts on Klaytn without any modification.
However be aware of the following two issues. 

## Solidity version

Klaytn officially supports Solidity v0.4.24 and v0.5.6. These two versions have been thoroughly tested. 
Other versions should run without any issues, but we still highly recommand using those two versions.  

## Decoupled key pairs

Klaytn [decouples key pairs from addresses](../klaytn/design/accounts#decoupling-key-pairs-from-addresses). If user [updates account](../klaytn/design/transactions/basic.md#txtypeaccountupdate), the private key for a specific account is replaced with another one. Most cases this will not affect your business logic. However if your business logic includes ecrecover, you should consider using validateSender. For more details, refer to [here](./precompiled-contracts.md).
