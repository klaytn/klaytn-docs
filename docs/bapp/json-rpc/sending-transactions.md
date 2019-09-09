# Sending Transactions

This page explains how to send transactions using JSON-RPC APIs.

## Send Legacy Transactions

The below APIs accepts [TxTypeLegacyTransaction](../../klaytn/design/transactions/basic.md#txtypelegacytransaction).
- klay_sendTransaction
- klay_signTransaction

You can either use `klay_sendTransaction` or get a raw transaction then send it through `klay_sendRawTransaction`. 

option 1) 

- 1. klay_sendTransaction

option 2)

- 1. klay_signTransaction
- 2. klay_sendRawTransaction

option 3)

- 1. RLP encoding
- 2. klay_sendRawTransaction

## Send Klaytn-specific Transactions

To send Klaytn specific transactions, you should first serialize the transaction using RLP-encoding, and sent it through `klay_sendRawTransaction`.

- 1. RLP encoding
- 2. klay_sendRawTransaction

RLP serialization process of each transaction type is explained in the [Transaction]((../../klaytn/design/transactions/README.md) chapter.  

