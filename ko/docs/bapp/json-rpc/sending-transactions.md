# Sending Transactions <a id="sending-transactions"></a>

This page gives an explanation about how to send transactions using JSON-RPC APIs.

## Legacy Transactions <a id="legacy-transactions"></a>

The below APIs accept [TxTypeLegacyTransaction](../../klaytn/design/transactions/basic.md#txtypelegacytransaction) as their input. Other transaction types will be supported in the near future.

- [klay_sendTransaction](api-references/klay/transaction.md#klay_sendtransaction) - Sends a transaction to the network and returns a transaction hash.
- [klay_signTransaction](api-references/klay/transaction.md#klay_signtransaction) - Returns a raw transaction. A raw transaction is an RLP-encoded transaction with the signature attached to it.

To send a legacy transaction, you can either use `klay_sendTransaction` or get a raw transaction using `klay_signTransaction` then send it through `klay_sendRawTransaction`.

1. [klay_sendTransaction](api-references/klay/transaction.md#klay_sendtransaction)

또는

1. [klay_signTransaction](api-references/klay/transaction.md#klay_signtransaction)
2. [klay_sendRawTransaction](api-references/klay/transaction.md#klay_sendrawtransaction)

## Klaytn-specific Transactions <a id="klaytn-specific-transactions"></a>

To send Klaytn specific transactions, you should first serialize the transaction using RLP-encoding, and sent it through `klay_sendRawTransaction`.

1. RLP encoding
2. [klay_sendRawTransaction](api-references/klay/transaction.md#klay_sendrawtransaction)

RLP serialization process of each transaction type is explained in the [Transaction](../../klaytn/design/transactions/README.md) chapter.  
