# Sending Transactions

This page gives an explaination about how to send transactions using JSON-RPC APIs.

## Send Legacy Transactions

The below APIs accepts [TxTypeLegacyTransaction](../../klaytn/design/transactions/basic.md#txtypelegacytransaction).
- [klay_sendTransaction](api-references/platform/transaction.md#klay_sendtransaction)
- [klay_signTransaction](api-references/platform/transaction.md#klay_signtransaction)

You can either use `klay_sendTransaction` or get a raw transaction then send it through `[klay_sendRawTransaction](api-references/platform/transaction.md#klay_sendrawtransaction)`. 
The below three have the same effect.

* 1. klay_sendTransaction

* 1. klay_signTransaction
* 2. klay_sendRawTransaction

* 1. RLP encoding
* 2. klay_sendRawTransaction

## Send Klaytn-specific Transactions

To send Klaytn specific transactions, you should first serialize the transaction using RLP-encoding, and sent it through `klay_sendRawTransaction`.

* 1. RLP encoding
* 2. klay_sendRawTransaction

RLP serialization process of each transaction type is explained in the [Transaction](../../klaytn/design/transactions/README.md) chapter.  

