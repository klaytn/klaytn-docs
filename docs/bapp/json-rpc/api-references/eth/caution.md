---
description: >- 
  Cautions when using `eth` namespace apis in Klaytn.
---

# Namespace caution <a id="namespace-caution"></a>

Klaytn supports `eth` namespace APIs, so Developers who using Ethereum based SDKs or tools now can easily migrate their
existing projects to Klaytn.
(e.g. just replacing endpoint url to Klaytn node in the source code using Ethereum SDKs should work enough.)

But due to the fundamental design differences that exist between Klaytn and Ethereum, there are some APIs that are
difficult to fully support compatibility with Ethereum.

This document describes the limitations of those APIs.

## Block Header

Please read the descriptions marked "(Note that)" carefully. 

| Field         | Description                                                                                                                                                                                                                                                                                                                                                  |
|---------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| baseFeePerGas | (Note that) It always return `0x0` because there is no scheme of baseFeePerGas in Klaytn yet.                                                                                                                                                                                                                                                                |
| difficulty    | (Note that) It always return `0x1`, this value is from blockScore field of Klaytn Header. There is no PoW mechanism in Klaytn.                                                                                                                                                                                                                               |
| extraData     | (Note that) It always return `0x` because actual value of extraData in Klaytn header cannot be used as meaningful way when serving eth namespace api because we cannot provide original header of Klaytn and this field is used as consensus info which is encoded value of validators addresses, validators signatures, and proposer signature in Klaytn.   |
| gasLimit      | (Note that) It always return `0x3b9ac9ff`(=`999999999` in decimal representation.). There is no GasLimit in Klaytn, so we return this value as a large enough. As of the writing date, it is 30 times the block gas limit of Ethereum. Please check [computation cost](https://docs.klaytn.com/klaytn/design/computation/computation-cost) for more details. |
| gasUsed       | (Same with Ethereum) A scalar value equal to the total gas used in transactions in this block.                                                                                                                                                                                                                                                               |
| hash          | (Same with Ethereum) A hash of the block.                                                                                                                                                                                                                                                                                                                    |
| logsBloom     | (Same with Ethereum) The bloom filter for the logs of the block. null when it is pending block.                                                                                                                                                                                                                                                              |
| miner         | (Note that) Because the [consensus mechanism](https://docs.klaytn.com/klaytn/design/consensus-mechanism) in Klaytn is PBFT, there is a block proposer not miner. So it returns the address of proposer of the block.                                                                                                                                         |
| mixHash       | (Note that) It always return zeroHash(`0x00...`) because there is no PoW mechanism in Klaytn.                                                                                                                                                                                                                                                                |
| nonce         | (Note that) It always return zeroNonce(`0x00...`) because there is no PoW mechanism in Klaytn.                                                                                                                                                                                                                                                               |
| number        | (Same with Ethereum) The block number.                                                                                                                                                                                                                                                                                                                       |

## Transaction

To support Ethereum Transaction data structure from Klaytn, there were a lot of changes.
There are lots of transaction types in Klaytn, and fields of data structure vary based on the type.

When you try to query Klaytn transactions via eth namespace JSON-RPC apis, Klaytn Transaction will be
return as Ethereum Legacy Transaction.

But since Klaytn Transaction and Ethereum Legacy Transaction are quite different,
it is difficult to make them perfectly compatible. 

This document describes the limitations of those APIs.

### Common Fields

Regardless of various Klaytn transaction type, there are common fields.
This section describes how that common fields are served as Ethereum Legacy Transaction.

Please read the descriptions marked "(Note that)" carefully.

| Ethereum Legacy Transaction Field | Klaytn Transaction Field         | Description                                                                                                                                                                                                                          |
|-----------------------------------|----------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| blockHash                         | blockHash                        | (Same with Ethereum) Block hash                                                                                                                                                                                                      |
| blockNumber                       | blockNumber                      | (Same with Ethereum) Block number                                                                                                                                                                                                    |
| from                              | from                             | (Same with Ethereum) Address of the sender                                                                                                                                                                                           |
| gas                               | gas                              | (Same with Ethereum) Gas provided by the sender                                                                                                                                                                                      |
| gasPrice                          | gasPrice                         | (Note that) Gas price provided by the sender in Peb.                                                                                                                                                                                 |
| hash                              | hash                             | (Same with Ethereum) Transaction hash                                                                                                                                                                                                |
| input                             | (will be covered below sections) | The description of this field is covered in the detailed transaction items below.                                                                                                                                                    |
| nonce                             | nonce                            | (Same with Ethereum) The number of transactions made by the sender prior to this one.                                                                                                                                                |
|                                   | senderTxHash(omitted)            | (Note that) This field is omitted because this field does not exist in Ethereum Legacy Transaction.                                                                                                                                  |
|                                   | signatures(omitted)              | (Note that) This field is omitted because this field does not exist in Ethereum Legacy Transaction.                                                                                                                                  |
| to                                | (will be covered below sections) | The description of this field is covered in the detailed transaction items below.                                                                                                                                                    |
| transactionIndex                  | transactionIndex                 | (Note that) Almost same with Ethereum but unlike Ethereum, Klaytn returns integer as it is when its pending.                                                                                                                         |
| value                             | (will be covered below sections) | The description of this field is covered in the detailed transaction items below.                                                                                                                                                    |
| type                              | type(converted)                  | (Note that) Value and data type of this field is converted. The type of this field is a string(e.g. `"LegacyTransaction"`) in Klaytn but it is converted and served as hexadecimal(e.g. `0x`) just like Ethereum Legacy Transaction. |
|                                   | typeInt(omitted)                 | (Note that) This field is omitted because this field does not exist in Ethereum Legacy Transaction.                                                                                                                                  |
| v                                 | (added)                          | (Note that) `signatures[0].V` will be added as the value of the field `v`.                                                                                                                                                           |
| r                                 | (added)                          | (Note that) `signatures[0].R` will be added as the value of the field `r`.                                                                                                                                                           |
| s                                 | (added)                          | (Note that) `signatures[0].S` will be added as the value of the field `s`.                                                                                                                                                           |

### Common Fields For FeeDelegation
Regardless of various Klaytn FeeDelegation transaction type, there are common fields.
This section describes how that common fields for feeDelegation(except for the common fields covered above) 
are served as Ethereum Legacy Transaction.

| Ethereum Legacy Transaction Field | Klaytn FeeDelegation Transaction Field | Description                                                                                                  |
|-----------------------------------|----------------------------------------|--------------------------------------------------------------------------------------------------------------|
|                                   | feePayer                               | (Note that) This field is omitted because this field does not exist in Ethereum Legacy Transaction.          |
|                                   | feePayerSignatures                     | (Note that) This field is omitted because this field does not exist in Ethereum Legacy Transaction.          |

### Common Fields For PartialFeeDelegation
Regardless of various Klaytn PartialFeeDelegation transaction type, there are common fields.
This section describes how that common fields for partialFeeDelegation(except for the common fields covered above)
are served as Ethereum Legacy Transaction.

| Ethereum Legacy Transaction Field | Klaytn FeeDelegation Transaction Field | Description                                                                                                  |
|-----------------------------------|----------------------------------------|--------------------------------------------------------------------------------------------------------------|
|                                   | feeRatio                               | (Note that) This field is omitted because this field does not exist in Ethereum Legacy Transaction.          |

### LegacyTransaction

| Ethereum Legacy Transaction Field | Klaytn Legacy Transaction Field | Description                                                                                  |
|-----------------------------------|---------------------------------|----------------------------------------------------------------------------------------------|
| input                             | input                           | (Same with Ethereum) The data sent along with the transaction.                               |
| to                                | to                              | (Same with Ethereum) Address of the receiver. null when its a contract creation transaction. |
| value                             | value                           | (Same with Ethereum) Value transferred in Peb.                                               |

**Klaytn LegacyTransaction** is served as Ethereum Legacy Transaction like below.
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x0f5fa35be72c9c49a60c936ccdf0e85210c12ea227e679f32a6dc6c84c3cb859",
    "blockNumber": "0x47ef00c",
    "from": "0xbd4fa032e6afe41cacde8e3292fb129b857bfca8",
    "gas": "0x204c8e",
    "gasPrice": "0x5d21dba00",
    "hash": "0x6ad3b34e12242a2ef8daadea7ebf538f735d9cad400e1a8745263c877cfb9058",
    "input": "0xe2bbb1580...",
    "nonce": "0x22aa",
    /** "senderTxHash": "0x6ad3b34e12242a2ef8daadea7ebf538f735d9cad400e1a8745263c877cfb9058", omitted */
    /** "signatures": [ 
      { 
        "V": "0x4055", 
        "R": "0xcf815d41522d4c95d1b86b956c1101b8fef9d446358e7675e8db467ada6b7549", 
        "S": "0x39b7e32b8d689737f57ef005f13f9c65abaf89d8444b7f286a43d7df6c684d69" 
      } 
    ], omitted */
    "r": "0xcf815d41522d4c95d1b86b956c1101b8fef9d446358e7675e8db467ada6b7549", /** added */
    "s": "0x39b7e32b8d689737f57ef005f13f9c65abaf89d8444b7f286a43d7df6c684d69", /** added */
    "to": "0x0cddc42b218a109ca4cf93cbef1f8740d72af7b2",
    "transactionIndex": "0xe",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    "v": "0x4055" /** added */
    /** "typeInt": 0, omitted */
    "value": "0x0"
  }
}
```

### ValueTransfer

| Ethereum Legacy Transaction Field | Klaytn ValueTransfer Transaction Field | Description                                                                                                          |
|-----------------------------------|----------------------------------------|----------------------------------------------------------------------------------------------------------------------|
| input                             | (added)                                | (Note that) This field always have value `0x` because this field does not exist in Klaytn ValueTransfer transaction. |
| to                                | to                                     | (Same with Ethereum) Address of the receiver. null when its a contract creation transaction.                         |
| value                             | value                                  | (Same with Ethereum) Value transferred in Peb.                                                                       |

**Klaytn ValueTransfer Transaction** is served as Ethereum Legacy Transaction like below.
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x0f5fa35be72c9c49a60c936ccdf0e85210c12ea227e679f32a6dc6c84c3cb859",
    "blockNumber": "0x47ef00c",
    "from": "0xbd4fa032e6afe41cacde8e3292fb129b857bfca8",
    "gas": "0x204c8e",
    "gasPrice": "0x5d21dba00",
    "hash": "0x6ad3b34e12242a2ef8daadea7ebf538f735d9cad400e1a8745263c877cfb9058",
    "input": "0x", /** added */
    "nonce": "0x22aa",
    /** "senderTxHash": "0x6ad3b34e12242a2ef8daadea7ebf538f735d9cad400e1a8745263c877cfb9058", omitted */
    /** "signatures": [ 
      { 
        "V": "0x4055", 
        "R": "0xcf815d41522d4c95d1b86b956c1101b8fef9d446358e7675e8db467ada6b7549", 
        "S": "0x39b7e32b8d689737f57ef005f13f9c65abaf89d8444b7f286a43d7df6c684d69" 
      } 
    ], omitted */
    "r": "0xcf815d41522d4c95d1b86b956c1101b8fef9d446358e7675e8db467ada6b7549", /** added */
    "s": "0x39b7e32b8d689737f57ef005f13f9c65abaf89d8444b7f286a43d7df6c684d69", /** added */
    "to": "0x0cddc42b218a109ca4cf93cbef1f8740d72af7b2",
    "transactionIndex": "0xe",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    "v": "0x4055" /** added */
    /** "typeInt": 8, omitted */
    "value": "0x49249695"
  }
}
```

### ValueTransferMemo

| Ethereum Legacy Transaction Field | Klaytn ValueTransferMemo Transaction Field | Description                                                                                  |
|-----------------------------------|--------------------------------------------|----------------------------------------------------------------------------------------------|
| input                             | input                                      | (Same with Ethereum) the data sent along with the transaction.                               |
| to                                | to                                         | (Same with Ethereum) Address of the receiver. null when its a contract creation transaction. |
| value                             | value                                      | (Same with Ethereum) Value transferred in Peb.                                               |

**Klaytn ValueTransferMemo Transaction** is served as Ethereum Legacy Transaction like below.
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x0f5fa35be72c9c49a60c936ccdf0e85210c12ea227e679f32a6dc6c84c3cb859",
    "blockNumber": "0x47ef00c",
    "from": "0xbd4fa032e6afe41cacde8e3292fb129b857bfca8",
    "gas": "0x204c8e",
    "gasPrice": "0x5d21dba00",
    "hash": "0x6ad3b34e12242a2ef8daadea7ebf538f735d9cad400e1a8745263c877cfb9058",
    "input": "0x32104204104", 
    "nonce": "0x22aa",
    /** "senderTxHash": "0x6ad3b34e12242a2ef8daadea7ebf538f735d9cad400e1a8745263c877cfb9058", omitted */
    /** "signatures": [ 
      { 
        "V": "0x4055", 
        "R": "0xcf815d41522d4c95d1b86b956c1101b8fef9d446358e7675e8db467ada6b7549", 
        "S": "0x39b7e32b8d689737f57ef005f13f9c65abaf89d8444b7f286a43d7df6c684d69" 
      } 
    ], omitted */
    "r": "0xcf815d41522d4c95d1b86b956c1101b8fef9d446358e7675e8db467ada6b7549", /** added */
    "s": "0x39b7e32b8d689737f57ef005f13f9c65abaf89d8444b7f286a43d7df6c684d69", /** added */
    "to": "0x0cddc42b218a109ca4cf93cbef1f8740d72af7b2",
    "transactionIndex": "0xe",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    "v": "0x4055" /** added */
    /** "typeInt": 16, omitted */
    "value": "0x49249695"
  }
}
```

### SmartContractDeploy

| Ethereum Legacy Transaction Field | Klaytn SmartContractDeploy Transaction Field | Description                                                                                         |
|-----------------------------------|----------------------------------------------|-----------------------------------------------------------------------------------------------------|
|                                   | codeFormat(omitted)                          | (Note that) This field is omitted because this field does not exist in Ethereum Legacy Transaction. |
|                                   | humanReadable(omitted)                       | (Note that) This field is omitted because this field does not exist in Ethereum Legacy Transaction. |
| input                             | input                                        | (Same with Ethereum) the data sent along with the transaction.                                      |
| to                                | to                                           | (Same with Ethereum) Address of the receiver. null when its a contract creation transaction.        |
| value                             | value                                        | (Same with Ethereum) Value transferred in Peb.                                                      |

**Klaytn SmartContractDeploy Transaction** is served as Ethereum Legacy Transaction like below.
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x93ec6f013194d4a16453fd17fb98630b89d763532208a7712d12e8fcf3900f3a",
    "blockNumber": "0x4857712",
    /** "codeFormat": "0x0", omitted */
    "from": "0x760fcf5159263b7cf39b0751e7d2bb008d09147d",
    "gas": "0x5b8d80",
    "gasPrice": "0x5d21dba00",
    "hash": "0xbf230e13023aad3c3c758b07ee3d2f7eaac45b301972f1bfa49a5bf49a1ccd7c",
    /** "humanReadable": false, omitted */
    "input": "0x6080...",
    "nonce": "0x2",
    /** "senderTxHash": "0x104e27f4cd69215f0080eca9f51bf06232c107b3209e16a7c004c7b5e619c846", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "r": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9", /** added */
    "s": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec", /** added */
    "to": "null",
    "transactionIndex": "0x6",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    "v": "0x4055" /** added */
    /** "typeInt": 40, omitted */
    "value": "0x0"
  }
}
```

### SmartContractExecution

| Ethereum Legacy Transaction Field | Klaytn SmartContractExecution Transaction Field | Description                                                                                         |
|-----------------------------------|-------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| input                             | input                                           | (Same with Ethereum) the data sent along with the transaction.                                      |
| to                                | to                                              | (Same with Ethereum) Address of the receiver. null when its a contract creation transaction.        |
| value                             | value                                           | (Same with Ethereum) Value transferred in Peb.                                                      |

**Klaytn SmartContractExecution Transaction** is served as Ethereum Legacy Transaction like below.
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x93ec6f013194d4a16453fd17fb98630b89d763532208a7712d12e8fcf3900f3a",
    "blockNumber": "0x4857712",
    "from": "0x760fcf5159263b7cf39b0751e7d2bb008d09147d",
    "gas": "0x5b8d80",
    "gasPrice": "0x5d21dba00",
    "hash": "0xbf230e13023aad3c3c758b07ee3d2f7eaac45b301972f1bfa49a5bf49a1ccd7c",
    "input": "0x6080...",
    "nonce": "0x2",
    /** "senderTxHash": "0x104e27f4cd69215f0080eca9f51bf06232c107b3209e16a7c004c7b5e619c846", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "r": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9", /** added */
    "s": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec", /** added */
    "to": "0x6e71df210046227af62323ae35c0ea5e606a349c",
    "transactionIndex": "0x6",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    "v": "0x4055" /** added */
    /** "typeInt": 48, omitted */
    "value": "0x6449e84e47a8a80000"
  }
}
```

### AccountUpdate

| Ethereum Legacy Transaction Field | Klaytn AccountUpdate Transaction Field | Description                                                                                                                                                                                               |
|-----------------------------------|----------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|                                   | key(omitted)                           | (Note that) This field is omitted because this field does not exist in Ethereum Legacy Transaction.                                                                                                       |
| input                             | (added)                                | (Note that) This field always have value `0x` because this field does not exist in Klaytn AccountUpdate transaction.                                                                                      |
| to                                | (added)                                | (Note that) This field always have same address with `from` because this field does not exist in Klaytn AccountUpdate transaction and giving a value of this field as `from` address is most meaningful.  | 
| value                             | (added)                                | (Note that) This field always have value `0x0` because this field does not exist in Klaytn AccountUpdate transaction.                                                                                     |

**Klaytn AccountUpdate Transaction** is served as Ethereum Legacy Transaction like below.
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x93ec6f013194d4a16453fd17fb98630b89d763532208a7712d12e8fcf3900f3a",
    "blockNumber": "0x4857712",
    "from": "0x760fcf5159263b7cf39b0751e7d2bb008d09147d",
    "gas": "0x5b8d80",
    "gasPrice": "0x5d21dba00",
    "hash": "0xbf230e13023aad3c3c758b07ee3d2f7eaac45b301972f1bfa49a5bf49a1ccd7c",
    /** "key": "0x02a103bf900d727fcbb4baa9f9ffc840ba947af7c7dae52ad6ef453ab5d50942e18b2f", omitted */
    "input": "0x6080...",
    "nonce": "0x2",
    /** "senderTxHash": "0x104e27f4cd69215f0080eca9f51bf06232c107b3209e16a7c004c7b5e619c846", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "r": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9", /** added */
    "s": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec", /** added */
    "to": "0x760fcf5159263b7cf39b0751e7d2bb008d09147d", /** added */
    "transactionIndex": "0x6",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    "v": "0x4055" /** added */
    /** "typeInt": 32, omitted */
    "value": "0x6449e84e47a8a80000"
  }
}
```

### Cancel

| Ethereum Legacy Transaction Field | Klaytn Cancel Transaction Field | Description                                                                                                                                                                                          |
|-----------------------------------|---------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| input                             | (added)                         | (Note that) This field always have value `0x` because this field does not exist in Klaytn Cancel transaction.                                                                                        |
| to                                | (added)                         | (Note that) This field always have same address with `from` because this field does not exist in Klaytn Cancel transaction and giving a value of this field as `from` address is most meaningful.    | 
| value                             | (added)                         | (Note that) This field always have value `0x0` because this field does not exist in Klaytn Cancel transaction.                                                                                       |

**Klaytn Cancel Transaction** is served as Ethereum Legacy Transaction like below.
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x93ec6f013194d4a16453fd17fb98630b89d763532208a7712d12e8fcf3900f3a",
    "blockNumber": "0x4857712",
    "from": "0x760fcf5159263b7cf39b0751e7d2bb008d09147d",
    "gas": "0x5b8d80",
    "gasPrice": "0x5d21dba00",
    "hash": "0xbf230e13023aad3c3c758b07ee3d2f7eaac45b301972f1bfa49a5bf49a1ccd7c",
    "input": "0x6080...",
    "nonce": "0x2",
    /** "senderTxHash": "0x104e27f4cd69215f0080eca9f51bf06232c107b3209e16a7c004c7b5e619c846", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "r": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9", /** added */
    "s": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec", /** added */
    "to": "0x760fcf5159263b7cf39b0751e7d2bb008d09147d", /** added */
    "transactionIndex": "0x6",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    "v": "0x4055" /** added */
    /** "typeInt": 56, omitted */
    "value": "0x6449e84e47a8a80000"
  }
}
```

### ChainDataAnchoring

| Ethereum Legacy Transaction Field | Klaytn ChainDataAnchoring Transaction Field  | Description                                                                                                                                                                                                   |
|-----------------------------------|----------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| input                             | input                                        | (Same with Ethereum) the data sent along with the transaction.                                                                                                                                                |
|                                   | inputJSON(omitted)                           | (Note that) This field is omitted because this field does not exist in Ethereum Legacy Transaction.                                                                                                           |
| to                                | (added)                                      | (Note that) This field always have same address with `from` because this field does not exist in Klaytn ChainDataAnchoring transaction and giving a value of this field as `from` address is most meaningful. | 
| value                             | (added)                                      | (Note that) This field always have value `0x0` because this field does not exist in Klaytn ChainDataAnchoring transaction.                                                                                    |

**Klaytn ChainDataAnchoring Transaction** is served as Ethereum Legacy Transaction like below.
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0xfec3dab64552e3148d8dbf8fba0bdcc4f170b458683065cf47e67c35e45ac395",
    "blockNumber": "0x3052bb2",
    "from": "0x89ecb00d2a52f2d4ead1578d60928a19ad3224bd",
    "gas": "0x186a0",
    "gasPrice": "0x5d21dba00",
    "hash": "0x9d64d2fb416cb4e4c2c9a4575b627d291c5139d477356af767f35dc5a887c138",
    "input": "0xf8...",
    /** "inputJSON": {
      "blockHash": "0x2b69e9532eddd9a25dc48c53253d8bc93a29770362a8f778fe799e3493cad626",
      "transactionsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      "parentHash": "0x094084ac3580231708c2a2dcbcf39f712a61dcc070b76a7eaaaf8b6f07a9549c",
      "receiptsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      "stateRoot": "0x768b8ae0874e4ac5e3ef9bccbeb417b4207d562b85dfb30ecf9cc8344209a5e6",
      "blockNumber": 43372800,
      "blockCount": 86400,
      "txCount": 53777
    }, omitted */
    "nonce": "0x278",
    /** "senderTxHash": "0x104e27f4cd69215f0080eca9f51bf06232c107b3209e16a7c004c7b5e619c846", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "r": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9", /** added */
    "s": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec", /** added */
    "to": "0x89ecb00d2a52f2d4ead1578d60928a19ad3224bd", /** added */
    "transactionIndex": "0x6",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    "v": "0x4055" /** added */
    /** "typeInt": 72, omitted */
    "value": "0x0" /** added */
  }
}
```
