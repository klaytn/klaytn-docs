# Sending Transactions

This page gives an explaination about how to send transactions using JSON-RPC APIs.

## Legacy Transactions

The below APIs accept [TxTypeLegacyTransaction] as their input. Other transaction types will be supported in the near future.

- [klay_sendTransaction] - Sends a transaction to the network and returns a transaction hash.
- [klay_signTransaction] - Returns a raw transaction. A raw transaction is an RLP-encoded transaction with the signature attached to it.

To send a legacy transaction, you can either use `klay_sendTransaction` or get a raw transaction using `klay_signTransaction` then send it through `klay_sendRawTransaction`. 

1. [klay_sendTransaction]

or 

1. [klay_signTransaction]
2. [klay_sendRawTransaction] 

## Klaytn-specific Transactions

To send Klaytn specific transactions, you should first serialize the transaction using RLP-encoding, and sent it through `klay_sendRawTransaction`.

1. RLP encoding
2. [klay_sendRawTransaction]

RLP serialization process of each transaction type is explained in the [Transaction] chapter.  


[TxTypeLegacyTransaction]: ../../klaytn/design/transactions/basic.md#txtypelegacytransaction
[klay_sendTransaction]: api-references/klay/transaction.md#klay_sendtransaction
[klay_signTransaction]: api-references/klay/transaction.md#klay_signtransaction
[klay_sendRawTransaction]: api-references/klay/transaction.md#klay_sendrawtransaction
[Transaction]: ../../klaytn/design/transactions/README.md  
