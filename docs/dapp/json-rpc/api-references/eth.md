---
description: >-
`eth` namespace APIs.
---

# Namespace eth <a id="namespace-eth"></a>

The namespace `eth` provides functions related to accounts, blocks, transactions,
configurations of networks or nodes, filters, and so on.

Klaytn now supports [eth namespace apis](https://eth.wiki/json-rpc/API). But Please note that
there are some fields returning correction values. Below is the overview of that fields.

**NOTE**: `eth` namespace APIs are supported from Klaytn v1.8.0.

## Differences Overview from Ethereum

> Please check the [Caution](./eth/caution.md) document which describes details about differences between Klaytn and Ethereum when serving eth namespace APIs. 

### Block Header <a id="block_header"></a>

Related APIs: `eth_getHeaderByNumber`, `eth_getHeaderByHash`.

| Field           | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                          |                                                                                                                                                                                                                                                                                                                                                                                                            
|-----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| baseFeePerGas   | **(Note that)** This field always have value `0x0` because there is no scheme of baseFeePerGas in Klaytn yet.                                                                                                                                                                                                                                                                                                                                                        |
| difficulty      | **(Note that)** This field always have value `0x1` because the value is from `blockScore` field of Klaytn Header. There is no PoW mechanism in Klaytn.                                                                                                                                                                                                                                                                                                               |
| extraData       | **(Note that)** It always return `0x` which means empty data because actual value of `extraData` field in Klaytn header cannot be used as meaningful way when served as eth namespace api. Because `extraData` is used as consensus info which is an encoded value of validators addresses, validators signatures, and proposer signature in Klaytn but the original Klaytn header changes while serving eth namespace apis, so it lost it's meaning.                |
| gasLimit        | **(Note that)** This field always have value `0xe8d4a50fff`(=`999999999999` in decimal representation.) because there is no GasLimit in Klaytn, so we return this value as a large enough. As of the writing date, it is 30 times larger than [the block gas limit of Ethereum](https://ethereum.org/en/developers/docs/gas/#block-size). Please check [computation cost](https://docs.klaytn.com/klaytn/design/computation/computation-cost) for more details.      |
| miner           | **(Note that)** Because the [consensus mechanism](https://docs.klaytn.com/klaytn/design/consensus-mechanism) in Klaytn is [PBFT](https://docs.klaytn.com/klaytn/design/consensus-mechanism#pbft-practical-byzantine-fault-tolerance), there is a block proposer not miner. So it returns the address of proposer of the block.                                                                                                                                       |
| mixHash         | **(Note that)** This field always have zeroHash(`0x00...`) because there is no PoW mechanism in Klaytn.                                                                                                                                                                                                                                                                                                                                                              |
| nonce           | **(Note that)** This field always have zeroNonce(`0x00...`) because there is no PoW mechanism in Klaytn.                                                                                                                                                                                                                                                                                                                                                             |
| sha3Uncles      | **(Note that)** This field always have `0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347` which is the keccak256 hash of rlp encoded bytes of empty list of transaction headers because there is no uncles in Klaytn.                                                                                                                                                                                                                              |
| totalDifficulty | **(Note that)** The total blockScore of the chain until this block.                                                                                                                                                                                                                                                                                                                                                                                                  |

Fields not covered here are fields used synonymously with Ethereum.

### Block <a id="block"></a>

Related APIs: `eth_getBlockByHash`, `eth_getBlockByNumber`, `eth_getUncleByBlockHashAndIndex`, `eth_getUncleByBlockNumberAndIndex`.

Since Block contains fields of Header and header has already been covered above,
this section describes the remaining fields of the block except for header.

| Field           | Description                                                                                       |
|-----------------|---------------------------------------------------------------------------------------------------|
| uncles          | **(Note that)** This field is always have value `[]` because there are no uncles in Klaytn.       |

### Transaction <a id="transaction"></a>

Related APIs: `eth_getTransactionByHash`, `eth_getTransactionByBlockHashAndIndex`, `eth_getTransactionByBlockNumberAndIndex`, `eth_pendingTransactions`.

| Field    | Description                                                                                                                                                                                                                                                                                                   |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| gasPrice | **(Note that)** It is also called [Unit Price](https://docs.klaytn.com/klaytn/design/transaction-fees#unit-price) in Klaytn and this value is set in the system by the governance.                                                                                                                            |
| input    | **(Note that)** The value of this field can be different based on Klaytn's transaction types. So, please check [the detailed reference](./eth/caution.md#transaction).                                                                                                                                        |
| to       | **(Note that)** The value of this field can be different based on Klaytn's transaction types. So, please check [the detailed reference](./eth/caution.md#transaction).                                                                                                                                        |
| value    | **(Note that)** The value of this field can be different based on Klaytn's transaction types. So, please check [the detailed reference](./eth/caution.md#transaction).                                                                                                                                        |
| type     | **(Note that)** Value and data type of this field is converted. The type of this field is a string(e.g. `"LegacyTransaction"`) in Klaytn but it is converted and served as hexadecimal(e.g. `0x0`) just like Ethereum Legacy Transaction. Transaction types valid only for Klaytn are served as `0x0` always. |
| v        | **(Note that)** Klaytn supports MultiSig so transaction in Klaytn can have more than one signature. `signatures[0].V` is used as the value of the field `v`.                                                                                                                                                  |
| r        | **(Note that)** Klaytn supports MultiSig so transaction in Klaytn can have more than one signature. `signatures[0].R` is used as the value of the field `r`.                                                                                                                                                  |
| s        | **(Note that)** Klaytn supports MultiSig so transaction in Klaytn can have more than one signature. `signatures[0].S` is used as the value of the field `s`.                                                                                                                                                  |

Fields not covered here are fields used synonymously with Ethereum.

### Transaction Receipt <a id="transaction_receipt"></a>

Related APIs: `eth_getTransactionReceipt`.

| Field             | Description                                                                                                                                                                                                                                                                                                   |
|-------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| effectiveGasPrice | **(Note that)** In Klaytn, gasPrice(also called [Unit Price](https://docs.klaytn.com/klaytn/design/transaction-fees#unit-price)) is set in the system by the governance.                                                                                                                                      |
| to                | **(Note that)** The value of this field can be different based on Klaytn's transaction types. So, please check [the detailed reference](./eth/caution.md#transaction_receipt).                                                                                                                                |
| type              | **(Note that)** Value and data type of this field is converted. The type of this field is a string(e.g. `"LegacyTransaction"`) in Klaytn but it is converted and served as hexadecimal(e.g. `0x0`) just like Ethereum Legacy Transaction. Transaction types valid only for Klaytn are served as `0x0` always. |
| transactionIndex  | **(Note that)** Almost same with Ethereum but unlike Ethereum, Klaytn returns integer as it is when its pending.                                                                                                                                                                                              |

## eth_accounts <a id="eth_accounts"></a>

Returns a list of addresses owned by client.

**Parameters**

None

**Return Value**

| Type                  | Description                      |
|-----------------------|----------------------------------|
| Array of 20-byte DATA | Addresses owned by the client.   |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": ["0xc94770007dda54cF92009BFF0dE90c06F603a09f"]
}
```


## eth_getBalance <a id="eth_getbalance"></a>

Returns the balance of the account of given address.

**Parameters**

| Name                 | Type                            | Description                                                                                                                                                                            |
|----------------------|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| address              | 20-byte DATA                    | Address to check for balance.                                                                                                                                                          |
| block number or hash | QUANTITY &#124; TAG &#124; HASH | Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"` as in the [default block parameter](./block.md#the-default-block-parameter), or block hash. |

**Return Value**

| Type       | Description                              |
|------------|------------------------------------------|
| QUANTITY   | Integer of the current balance in peb.   |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0xc94770007dda54cF92009BFF0dE90c06F603a09f", "latest"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0","id":1,
  "result": "0x0234c8a3397aab58" // 158972490234375000
}
```


## eth_getCode <a id="eth_getcode"></a>

Returns code at a given address.

**Parameters**

| Type                            | Description                                                                                                                                                                            |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 20-byte DATA                    | Address                                                                                                                                                                                |
| QUANTITY &#124; TAG &#124; HASH | Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"` as in the [default block parameter](./block.md#the-default-block-parameter), or block hash. |

**Return Value**

| Type   | Description                        |
|--------|------------------------------------|
| DATA   | The code from the given address.   |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getCode","params":["0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b", "0x2"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result":   "0x600160008035811a818181146012578301005b601b6001356025565b8060005260206000f25b600060078202905091905056"
}
```


## eth_getTransactionCount <a id="eth_gettransactioncount"></a>

Returns the number of transactions *sent* from an address.

**Parameters**

| Type                            | Description                                                                                                                                                                            |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 20-byte DATA                    | Address                                                                                                                                                                                |
| QUANTITY &#124; TAG &#124; HASH | Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"` as in the [default block parameter](./block.md#the-default-block-parameter), or block hash. |

**Return Value**

| Type       | Description                                                   |
|------------|---------------------------------------------------------------|
| QUANTITY   | Integer of the number of transactions send from this address. |

**Example**

 ```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0xc94770007dda54cF92009BFF0dE90c06F603a09f","latest"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0x1" // 1
}
 ```


## eth_sign <a id="eth_sign"></a>

The sign method calculates a Klaytn-specific signature with:
```
sign(keccak256("\x19Klaytn Signed Message:\n" + len(message) + message)))
```

Adding a prefix to the message makes the calculated signature recognizable as a Klaytn-specific signature. This prevents misuse where a malicious BApp can sign arbitrary data, *e.g.*, transaction, and use the signature to impersonate the victim.

**NOTE**: The address to sign with must be unlocked.

**Parameters**

| Name    | Type         | Description     |
|---------|--------------|-----------------|
| account | 20-byte DATA | Address         |
| message | N-byte DATA  | Message to sign |

**Return Value**

| Type   | Description   |
|--------|---------------|
| DATA   | Signature     |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_sign","params":["0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "0xdeadbeaf"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

## The Default Block Parameter <a id="the-default-block-parameter"></a>

When requests are made that act on the state of Klaytn, the last default block
parameter determines the height of the block.

The following options are possible for the `defaultBlock` parameter:

- `HEX String` - an integer block number
- `String "earliest"` for the earliest/genesis block
- `String "latest"` - for the latest mined block
- `String "pending"` - for the pending state/transactions


## eth_blockNumber <a id="eth_blocknumber"></a>

Returns the number of most recent block.

**Parameters**

None

**Return Value**

| Type     | Description                                           |
| -------- | ----------------------------------------------------- |
| QUANTITY | Integer of the current block number the client is on. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":83,
  "result": "0xc94"
}
```


## eth_getHeaderByNumber <a id="eth_getheaderbynumber"></a>

Returns information about a header by number.

Please check the [Caution-Header](./eth/caution.md#block_header) before using this API.

**Parameters**

| Type                | Description                                                                                                                                                   |
|---------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| QUANTITY &#124; TAG | Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"` as in the [default block parameter](#the-default-block-parameter). |

**Return Value**

See [eth_getHeaderByHash](#eth_getheaderbyhash)

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getHeaderByNumber","params":["0x1b4"],"id":1}' http://localhost:8551
// Result
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "baseFeePerGas": "0x0",
        "difficulty": "0x1",
        "extraData": "0x",
        "gasLimit": "0xe8d4a50fff",
        "gasUsed": "0x28b484",
        "hash": "0x5de0dc71dec2e724be002dcad135b602810769ce26e16b3b06862405e08ca71b",
        "logsBloom": "0x02200022800002050000084080014015001001004b0002440401060a0830000200014041044010180010430018800119120098000800200241c2090a4020011040004400002201081800440a340020a4000820100848081020003000892050105a05000002100000200012c0800408982000085100000c4040a03814000800200812210100200010004018410d80004214800123210400082002214620100021028800120309200802008291c8e000904210080008110900010100081000101000501002010a0080311886000008000000240900400000100200a402005830200010300804020200000002310000008004004080a58000550000508000000000",
        "miner": "0xea674fdde714fd979de3edf0f56aa9716b898ec8",
        "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "nonce": "0x0000000000000000",
        "number": "0x1b4",
        "parentHash": "0x99fcd33dddd763835ba8bdc842853d973496a7e64ea2f6cf826bc2c338e23b0c",
        "receiptsRoot": "0xd3d70ed54a9274ba3191bf2d4fd8738c5d782fe17c8bfb45c03a25dc04120c35",
        "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
        "size": "0x23a",
        "stateRoot": "0x1076e6726164bd6f74720a717242584109f37c55017d004eefccf9ec3be76c18",
        "timestamp": "0x61b0a6c6",
        "totalDifficulty": "0x12",
        "transactionsRoot": "0x6ec8daca98c1005d9bbd7716b5e94180e2bf0e6b77770174563a166337369344" }
}   
```

## eth_getHeaderByHash <a id="eth_getheaderbyhash"></a>

Returns information about a header by hash.

Please check the [Caution-Header](./eth/caution.md#block_header) before using this API.

**Parameters**

| Type         | Description      |
|--------------|------------------|
| 32-byte DATA | Hash of a block. |

**Return Value**

`Object` - A header object, or `error` when no header was found:

| Name             | Type          | Description                                                                                                               |
|------------------|---------------|---------------------------------------------------------------------------------------------------------------------------|
| baseFeePerGas    | QUANTITY      | The base fee per gas.                                                                                                     |
| difficulty       | QUANTITY      | The integer of the difficulty for this block.                                                                             |
| extraData        | DATA          | The "extra data" field of this block.                                                                                     |
| gasLimit         | QUANTITY      | The maximum gas allowed in this block.                                                                                    |
| gasUsed          | QUANTITY      | The total used gas by all transactions in this block.                                                                     |
| hash             | 32-byte DATA  | Hash of the block. `null` when it is pending block.                                                                       |
| logsBloom        | 256-byte DATA | The bloom filter for the logs of the block.                                                                               |
| miner            | 20-byte DATA  | The address of the beneficiary to whom the mining rewards were given.                                                     |
| mixHash          | 32-byte DATA  | The hash which proves combined with the nonce that a sufficient amount of computation has been carried out on this block. |
| nonce            | 8-byte DATA   | The hash of the generated proof-of-work.                                                                                  |
| number           | QUANTITY      | The block number. `null` when it is pending block.                                                                        |
| parentHash       | 32-byte DATA  | Hash of the parent block.                                                                                                 |
| receiptsRoot     | 32-byte DATA  | The root of the receipts trie of the block.                                                                               |
| sha3Uncles       | 32-byte DATA  | The sha3 of the uncles data in the block.                                                                                 |
| size             | QUANTITY      | Integer the size of this block in bytes.                                                                                  |
| stateRoot        | 32-byte DATA  | The root of the final state trie of the block.                                                                            |
| timestamp        | QUANTITY      | The Unix timestamp for when the block was collated.                                                                       |
| totalDifficulty  | QUANTITY      | The total blockScore of the chain until this block                                                                        |
| transactionsRoot | 32-byte DATA  | The root of the transaction trie of the block.                                                                            |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getHeaderByHash","params":["0xb8deae63002d2b6aa33247c8ef545383ee0fd2282ac9b49dbbb74114389ddb5c"],"id":1}' http://localhost:8551
// Result
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "baseFeePerGas": "0x0",
        "difficulty": "0x1",
        "extraData": "0x",
        "gasLimit": "0xe8d4a50fff",
        "gasUsed": "0x28b484",
        "hash": "0xb8deae63002d2b6aa33247c8ef545383ee0fd2282ac9b49dbbb74114389ddb5c",
        "logsBloom": "0x02200022800002050000084080014015001001004b0002440401060a0830000200014041044010180010430018800119120098000800200241c2090a4020011040004400002201081800440a340020a4000820100848081020003000892050105a05000002100000200012c0800408982000085100000c4040a03814000800200812210100200010004018410d80004214800123210400082002214620100021028800120309200802008291c8e000904210080008110900010100081000101000501002010a0080311886000008000000240900400000100200a402005830200010300804020200000002310000008004004080a58000550000508000000000",
        "miner": "0xea674fdde714fd979de3edf0f56aa9716b898ec8",
        "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "nonce": "0x0000000000000000",
        "number": "0xd208de",
        "parentHash": "0x99fcd33dddd763835ba8bdc842853d973496a7e64ea2f6cf826bc2c338e23b0c",
        "receiptsRoot": "0xd3d70ed54a9274ba3191bf2d4fd8738c5d782fe17c8bfb45c03a25dc04120c35",
        "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
        "size": "0x23a",
        "stateRoot": "0x1076e6726164bd6f74720a717242584109f37c55017d004eefccf9ec3be76c18",
        "timestamp": "0x61b0a6c6",
        "totalDifficulty": "0xd208df",
        "transactionsRoot": "0x6ec8daca98c1005d9bbd7716b5e94180e2bf0e6b77770174563a166337369344"
    }
}   
```


## eth_getBlockByNumber <a id="eth_getblockbynumber"></a>

Returns information about a block by block number.

Please check the [Caution-Block](./eth/caution.md#block) before using this API.

**Parameters**

| Type                | Description                                                                                                                                                   |
|---------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| QUANTITY &#124; TAG | Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"` as in the [default block parameter](#the-default-block-parameter). |
| Boolean             | If `true` it returns the full transaction objects, if `false` only the hashes of the transactions.                                                            |


**Return Value**

See [eth_getBlockByHash](#eth_getblockbyhash)

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0xd0054e", false],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "baseFeePerGas": "0x0",
    "difficulty": "0x1",
    "extraData": "0x",
    "gasLimit": "0xe8d4a50fff",
    "gasUsed": "0x44437",
    "hash": "0x456a7cbb6fada11a0ca8cec24510d89da1c52898f1087528752ae6e13973fbc5",
    "logsBloom": "0x0000100000000094000000400000080000000040000000000000000000000002000000000000000000000000004001000000200000000000000008000220000000080400000800000000000a000000000000000000000000000010000000000000002000000408000000000000000010000080101002000000000010000000100000010000200800000400000080000000000000000000000002000000102000024000080200000000000082000000000000000000000000010000000000000000100012000000000000011000000000002000201000000008000000002000000010002800000000001400000000000000000000000100000000200000000000",
    "miner": "0x1ad91ee08f21be3de0ba2ba6918e714da6b45836",
    "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "nonce": "0x0000000000000000",
    "number": "0xd0054e",
    "parentHash": "0x2b88fdb3821669357a0b8367115e30145135c44bb8f62641d4e7765a7f555d17",
    "receiptsRoot": "0xc36bc44d0b52dee954be9bbd519bddc0bf6e991af2ed6f6ba506f89f10cdb9a7",
    "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
    "size": "0x64c",
    "stateRoot": "0x123a0da1c621236e64f9b486a9a9712ec6ce07d6690acab5a18b716d17cdc29f",
    "timestamp": "0x6194f184",
    "totalDifficulty": "0xd0054f",
    "transactions": [
      "0x5b3492f8199ee2a551d991b7d00bd48967ca5e5c1c15d6e1ee9fda97e3126e9a",
      "0x8e1870262f2ba0452458280ad6ad5d54e5288623e415692c822979b7608c7297",
      "0x98053d20b01c9e56964a57084fb91ccc01b242adfb09c23534162dcbbcc094c2",
    ],
    "transactionsRoot": "0x29b9880f57c0e79d0be5aa4fcc6b4cfcbed3e51478ad8f44533acce012df8cf1",
    "uncles": []
  }
}
```


## eth_getBlockByHash <a id="eth_getblockbyhash"></a>

Returns information about a block by hash.

Please check the [Caution-Block](./eth/caution.md#block) before using this API.

**Parameters**

| Type         | Description                                                                                        |
|--------------|----------------------------------------------------------------------------------------------------|
| 32-byte DATA | Hash of a block.                                                                                   |
| Boolean      | If `true` it returns the full transaction objects, if `false` only the hashes of the transactions. |

**Return Value**

`Object` - A block object, or `error` when no block was found:

| Name              | Type          | Description                                                                                                               |
|-------------------|---------------|---------------------------------------------------------------------------------------------------------------------------|
| baseFeePerGas     | QUANTITY      | The base fee per gas.                                                                                                     |
| difficulty        | QUANTITY      | The integer of the difficulty for this block                                                                              |
| extraData         | DATA          | The "extra data" field of this block.                                                                                     |
| gasLimit          | QUANTITY      | The maximum gas allowed in this block.                                                                                    |
| gasUsed           | QUANTITY      | The total used gas by all transactions in this block.                                                                     |
| hash              | 32-byte DATA  | Hash of the block. `null` when it is pending block.                                                                       |
| logsBloom         | 256-byte DATA | The bloom filter for the logs of the block. `null` when it is pending block.                                              |
| miner             | 20-byte DATA  | The address of the beneficiary to whom the mining rewards were given.                                                     |
| mixHash           | 32-byte DATA  | The hash which proves combined with the nonce that a sufficient amount of computation has been carried out on this block. |
| nonce             | 8-byte DATA   | The hash of the generated proof-of-work.                                                                                  |
| number            | QUANTITY      | The block number. `null` when it is pending block.                                                                        | 
| parentHash        | 32-byte DATA  | Hash of the parent block.                                                                                                 |
| receiptsRoot      | 32-byte DATA  | The root of the receipts trie of the block.                                                                               |
| sha3Uncles        | 32-byte DATA  | The sha3 of the uncles data in the block.                                                                                 |
| size              | QUANTITY      | Integer the size of this block in bytes.                                                                                  |
| stateRoot         | 32-byte DATA  | The root of the final state trie of the block.                                                                            |
| timestamp         | QUANTITY      | The Unix timestamp for when the block was collated.                                                                       |
| totalDifficulty   | QUANTITY      | The total blockScore of the chain until this block                                                                        |
| transactionsRoot  | 32-byte DATA  | The root of the transaction trie of the block.                                                                            |
| transactions      | Array         | Array of transaction objects, or 32-byte transaction hashes depending on the last given parameter.                        |
| uncles            | Array         | Array of uncle hashes.                                                                                                    |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getBlockByHash","params":["0xb8deae63002d2b6aa33247c8ef545383ee0fd2282ac9b49dbbb74114389ddb5c", true],"id":1}' http://localhost:8551

// Result
{
   "jsonrpc":"2.0",
   "id":1,
   "result":{
      difficulty: "0x1",
      extraData: "0xd8820505846b6c617988676f312e31312e328664617277696e00000000000000f89ed594e733cb4d279da696f30d470f8c04decb54fcb0d2b841f1f600d136f93a5a2d9c12a7a9f6d7ba80a047c3910a2bbc01e38bcce25e48ed2004d21f134df5efaf1f8cbb9a26e1548e57628ab258c935490c11a7cd65324701f843b841444b3efc40071b6eec2c4d2630b483710b8fc7a601432431b0161f489102d1ca02f2ef93153d0be3843aa563d34cee1716163f58711843442aedd94a56303c0400",
      gasLimit: "0xe8d4a50fff",
      gasUsed: "0x0",
      governanceData: "0x",
      hash: "0xb8deae63002d2b6aa33247c8ef545383ee0fd2282ac9b49dbbb74114389ddb5c",
      logsBloom: "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      miner: "0x0000000000000000000000000000000000000000",
      mixHash: "0x63746963616c2062797a616e74696e65206661756c7420746f6c6572616e6365",
      nonce: "0x0000000000000000",
      number: "0x1",
      parentHash: "0x73255a60e9491b5715f9bfcb7fa1143296810f629836d4cefbd1921d9173d63d",
      receiptsRoot: "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      reward: "0x0000000000000000000000000000000000000000",
      size: "0x2d7",
      stateRoot: "0xedb87f4b0f905a655c80d1768eb22b1eff2405098c4748b8364c869611e02a2b",
      timestamp: "0x5c99cbd8",
      totalDifficulty: "0x2",
      transactions: [],
      transactionsRoot: "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      uncles: [],
    }
}
```

## eth_getUncleBlockByHashAndIndex <a id="eth_getunclebyblockhashandindex"></a>

Returns information about a uncle of a block by hash and uncle index position.
But there are no uncles in Klaytn, so it always return `null` as result.

**Parameters**

| Type         | Description                 |
|--------------|-----------------------------|
| 32-byte DATA | The hash of a block.        |
| QUANTITY     | The uncle's index position. |

**Return Value**
`null`

**Example**
```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getUncleBlockByHashAndIndex","params":["0xb8deae63002d2b6aa33247c8ef545383ee0fd2282ac9b49dbbb74114389ddb5c", "0x1"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": null
}
```


## eth_getUncleByBlockNumberAndIndex <a id="eth_getunclebyblocknumberandindex"></a>

Returns information about a uncle of a block by number and uncle index position.
But there are no uncles in Klaytn, so it always return `null` as result.

**Parameters**

| Type                | Description                                                                                                                                                           |
|---------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| QUANTITY &#124; TAG | Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"` as in the [default block parameter](block.md#the-default-block-parameter). |
| QUANTITY            | The uncle's index position.                                                                                                                                           |

**Return Value**
`null`

**Example**
```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getUncleBlockByNumberAndIndex","params":["0xe8", "0x1"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": null
}
```


## eth_getBlockTransactionCountByNumber <a id="eth_getblocktransactioncountbynumber"></a>

Returns the number of transactions in a block matching the given block number.

**Parameters**

| Type                | Description                                                                                                                                                           |
|---------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| QUANTITY &#124; TAG | Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"` as in the [default block parameter](block.md#the-default-block-parameter). |

**Return Value**

| Type       | Description                                           |
|------------|-------------------------------------------------------|
| QUANTITY   | Integer of the number of transactions in this block.  |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0xe8"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0xa" // 10
}
```


## eth_getBlockTransactionCountByHash <a id="eth_getblocktransactioncountbyhash"></a>

Returns the number of transactions in a block from a block that matches the given hash.

**Parameters**

| Type         | Description         |
|--------------|---------------------|
| 32-byte DATA | Hash of a block     |

**Return Value**

| Type       | Description                                           |
|------------|-------------------------------------------------------|
| QUANTITY   | Integer of the number of transactions in this block.  |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0x0c11803ab36110db993e7520908b9ba9336cca2f2dcc9b6130c481a3ccdc2621"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0x0"
}
```


## eth_getUncleCountByBlockNumber <a id="eth_getunclecountbyblocknumber"></a>

Returns the number of uncles in a block from a block matching the given block number.
There is no uncles in Klaytn, so it always returns `0x0`.

**Parameters**

| Type                | Description                                                                                                                                                           |
|---------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| QUANTITY &#124; TAG | Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"` as in the [default block parameter](block.md#the-default-block-parameter). |

**Return Value**

| Type       | Description                                           |
|------------|-------------------------------------------------------|
| QUANTITY   | Integer of the number of transactions in this block.  |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0xe8"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0x0" // 0
}
```


## eth_getUncleCountByBlockHash <a id="eth_getunclecountbyblockhash"></a>

Returns the number of uncles in a block from a block matching the given block hash.
There is no uncles in Klaytn, so it always returns `0x0`.

**Parameters**

| Type         | Description         |
|--------------|---------------------|
| 32-byte DATA | Hash of a block     |

**Return Value**

| Type       | Description                                           |
|------------|-------------------------------------------------------|
| QUANTITY   | Integer of the number of transactions in this block.  |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0x0c11803ab36110db993e7520908b9ba9336cca2f2dcc9b6130c481a3ccdc2621"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0x0"
}
```

## eth_call <a id="eth_call"></a>

Klaytn-TODO: Write docs after implement call.

## eth_estimateGas <a id="eth_estimategas"></a>

Klaytn-TODO: Write docs after implement estimateGas.

## eth_getTransactionByBlockHashAndIndex <a id="eth_gettransactionbyblockhashandindex"></a>

Returns information about a transaction by block hash and transaction index position.

Please check the [Caution-Transaction](./eth/caution.md#transaction) before using this API.

**Parameters**

| Type         | Description                                |
|--------------|--------------------------------------------|
| 32-byte DATA | Hash of a block.                           |
| QUANTITY     | Integer of the transaction index position. |

**Return Value**

Klaytn-TODO: Ethereum transaction has various types of transaction, so if we support that
we should add descriptions about it.

See [eth_getTransactionByHash](#eth_gettransactionbyhash)

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0x451cafae98d61b7458b5cef54402830941432278184453e3ca490eb687317e68", "0x0"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0xd49c770e1c6fdf340e25aca6d2de0ddf3d10873582b62b7ad604ff5b291bdbe5",
    "blockNumber": "0xd017a7",
    "from": "0x46705dfff24256421a05d056c29e81bdc09723b8",
    "gas": "0x19a28",
    "gasPrice": "0x5d21dba00",
    "hash": "0x73af85890dd29691ff807b8d9e10c5a4d3349d28b6b143fa5e46db2c61b376e9",
    "input": "0xa9059cbb000000000000000000000000cad1d9c2ad1860d4d4fb53782720279c60ae4de8000000000000000000000000000000000000000000000000000000000cd0a3c0",
    "nonce": "0x1bea18",
    "r": "0x85d848276f22f8ce5aa17cd27ded21269e17cacc258ef2aaece296497803aa9",
    "s": "0x2d9ae07f349c66628b02db7033a8a35d18f6338c39f995d7e8336d635002df54",
    "to": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "transactionIndex": "0x3",
    "type": "0x0",
    "v": "0x25",
    "value": "0x0"
  }
}
```


## eth_getTransactionByBlockNumberAndIndex <a id="eth_gettransactionbyblocknumberandindex"></a>

Returns information about a transaction by block number and transaction index position.

Please check the [Caution-Transaction](./eth/caution.md#transaction) before using this API.

**Parameters**

| Type                | Description                                                                                                                                                              |
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| QUANTITY &#124; TAG | Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"`  as in the [default block parameter](./block.md#the-default-block-parameter). |
| QUANTITY            | The transaction index position.                                                                                                                                          |

**Return Value**

Klaytn-TODO: Ethereum transaction has various types of transaction, so if we support that
we should add descriptions about it.

See [eth_getTransactionByHash](#eth_gettransactionbyhash)

**Example**

Klaytn-TODO: Ethereum transaction has various types of transaction, so if we support that
we should add descriptions about it.

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["0x27", "0x0"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0xd49c770e1c6fdf340e25aca6d2de0ddf3d10873582b62b7ad604ff5b291bdbe5",
    "blockNumber": "0xd017a7",
    "from": "0x46705dfff24256421a05d056c29e81bdc09723b8",
    "gas": "0x19a28",
    "gasPrice": "0x5d21dba00",
    "hash": "0x73af85890dd29691ff807b8d9e10c5a4d3349d28b6b143fa5e46db2c61b376e9",
    "input": "0xa9059cbb000000000000000000000000cad1d9c2ad1860d4d4fb53782720279c60ae4de8000000000000000000000000000000000000000000000000000000000cd0a3c0",
    "nonce": "0x1bea18",
    "r": "0x85d848276f22f8ce5aa17cd27ded21269e17cacc258ef2aaece296497803aa9",
    "s": "0x2d9ae07f349c66628b02db7033a8a35d18f6338c39f995d7e8336d635002df54",
    "to": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "transactionIndex": "0x3",
    "type": "0x0",
    "v": "0x25",
    "value": "0x0"
  }
}
```


## eth_getTransactionByHash <a id="eth_gettransactionbyhash"></a>

Returns the information about a transaction requested by transaction hash.

Please check the [Caution-Transaction](./eth/caution.md#transaction) before using this API.

**Parameters**

| Type         | Description            |
|--------------|------------------------|
| 32-byte DATA | Hash of a transaction. |

**Return Value**

Klaytn-TODO: Ethereum transaction has various types of transaction, so if we support that
we should add descriptions about it.

`Object` - A transaction object, or `null` when no transaction was found:

| Name             | Type          | Description                                                                        |
|------------------|---------------|------------------------------------------------------------------------------------|
| blockHash        | 32-byte DATA  | Hash of the block where this transaction was in. `null` when it is pending.        |
| blockNumber      | QUANTITY      | Block number where this transaction was in. `null` when it is pending.             |
| from             | 20-byte DATA  | Address of the sender.                                                             |
| gas              | QUANTITY      | Gas provided by the sender.                                                        |
| gasPrice         | QUANTITY      | Gas price provided by the sender in peb.                                           |
| hash             | 32-byte DATA  | Hash of the transaction.                                                           |
| input            | DATA          | (optional) The data sent along with the transaction.                               |
| nonce            | QUANTITY      | The number of transactions made by the sender prior to this one.                   |
| to               | 20-byte DATA  | Address of the receiver. `null` when it is a contract creation transaction.        |
| transactionIndex | QUANTITY      | Integer of the transaction index position in the block. `null` when it is pending. |
| type             | QUANTITY      | An integer representing the type of the transaction.                               |
| v                | QUANTITY      | ECDSA recovery id.                                                                 |
| r                | 32-byte DATA  | ECDSA signature r.                                                                 |
| s                | 32-byte DATA  | ECDSA signature s.                                                                 |


**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0xaca5d9a1ed8b86b1ef61431b2bedfc99a66eaefc3a7e1cffdf9ff53653956a67"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0xd49c770e1c6fdf340e25aca6d2de0ddf3d10873582b62b7ad604ff5b291bdbe5",
    "blockNumber": "0xd017a7",
    "from": "0x46705dfff24256421a05d056c29e81bdc09723b8",
    "gas": "0x19a28",
    "gasPrice": "0x5d21dba00",
    "hash": "0x73af85890dd29691ff807b8d9e10c5a4d3349d28b6b143fa5e46db2c61b376e9",
    "input": "0xa9059cbb000000000000000000000000cad1d9c2ad1860d4d4fb53782720279c60ae4de8000000000000000000000000000000000000000000000000000000000cd0a3c0",
    "nonce": "0x1bea18",
    "r": "0x85d848276f22f8ce5aa17cd27ded21269e17cacc258ef2aaece296497803aa9",
    "s": "0x2d9ae07f349c66628b02db7033a8a35d18f6338c39f995d7e8336d635002df54",
    "to": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "transactionIndex": "0x3",
    "type": "0x0",
    "v": "0x25",
    "value": "0x0"
  }
}
```


## eth_getTransactionReceipt <a id="eth_gettransactionreceipt"></a>

Returns the receipt of a transaction by transaction hash.

**NOTE**: The receipt is not available for pending transactions.

Please check the [Caution-TransactionReceipt](./eth/caution.md#transaction_receipt) before using this API.

**Parameters**

| Name   | Type         | Description            |
|--------|--------------|------------------------|
| Hash   | 32-byte DATA | Hash of a transaction. |

**Return Value**

`Object` - A transaction receipt object, or `null` when no receipt was found

| Name              | Type                    | Description                                                                                                                                                                                                               |
|-------------------|-------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| blockHash         | 32-byte DATA            | Hash of the block where this transaction was in.                                                                                                                                                                          |
| blockNumber       | QUANTITY                | The block number where this transaction was in.                                                                                                                                                                           |
| contractAddress   | DATA                    | The contract address created, if the transaction was a contract creation, otherwise `null`.                                                                                                                               |
| cumulativeGasUsed | QUANTITY                | The total amount of gas used when this transaction was executed in the block.                                                                                                                                             |
| effectiveGasPrice | QUANTITY                | The actual value per gas deducted from the senders account. Before EIP-1559, this is equal to the transaction's gas price. After, it is equal to baseFeePerGas + min(maxFeePerGas - baseFeePerGas, maxPriorityFeePerGas). |
| from              | 20-byte DATA            | Address of the sender.                                                                                                                                                                                                    |
| logs              | Array                   | Array of log objects, which this transaction generated.                                                                                                                                                                   |
| logsBloom         | 256-byte DATA           | Bloom filter for light clients to quickly retrieve related logs.                                                                                                                                                          |
| status            | QUANTITY                | Either `1` (success) or `0` (failure).                                                                                                                                                                                    |
| to                | 20-byte DATA            | Address of the receiver. `null` when it is a contract creation transaction.                                                                                                                                               |
| transactionHash   | 32-byte DATA            | Hash of the transaction.                                                                                                                                                                                                  |
| transactionIndex  | QUANTITY                | Integer of the transaction index position in the block.                                                                                                                                                                   |
| type              | QUANTITY                | An integer representing the type of the transaction.                                                                                                                                                                      |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0xaca5d9a1ed8b86b1ef61431b2bedfc99a66eaefc3a7e1cffdf9ff53653956a67"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0xd49c770e1c6fdf340e25aca6d2de0ddf3d10873582b62b7ad604ff5b291bdbe5",
    "blockNumber": "0xd017a7",
    "contractAddress": null,
    "cumulativeGasUsed": "0x8dc5d",
    "effectiveGasPrice": "0x315c2f4800",
    "from": "0x46705dfff24256421a05d056c29e81bdc09723b8",
    "gasUsed": "0xf6e9",
    "logs": [
      {
        "address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
        "blockHash": "0xd49c770e1c6fdf340e25aca6d2de0ddf3d10873582b62b7ad604ff5b291bdbe5",
        "blockNumber": "0xd017a7",
        "data": "0x000000000000000000000000000000000000000000000000000000000cd0a3c0",
        "logIndex": "0x13",
        "removed": false,
        "topics": [
          "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
          "0x00000000000000000000000046705dfff24256421a05d056c29e81bdc09723b8",
          "0x000000000000000000000000cad1d9c2ad1860d4d4fb53782720279c60ae4de8"
        ],
        "transactionHash": "0x73af85890dd29691ff807b8d9e10c5a4d3349d28b6b143fa5e46db2c61b376e9",
        "transactionIndex": "0x3"
      }
    ],
    "logsBloom": "0x00000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000400000000000000000008000000000000008000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000080000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000004000800000000000000000000000000000000000000000000000000000000000000",
    "status": "0x1",
    "to": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "transactionHash": "0x73af85890dd29691ff807b8d9e10c5a4d3349d28b6b143fa5e46db2c61b376e9",
    "transactionIndex": "0x3",
    "type": "0x0"
  }
}
```


## eth_sendRawTransaction <a id="eth_sendrawtransaction"></a>

Creates a new message call transaction or a contract creation for signed transactions.

**Parameters**

| Type   | Description                  |
|--------|------------------------------|
| DATA   | The signed transaction data. |

**Return Value**

| Type         | Description                                                                    |
|--------------|--------------------------------------------------------------------------------|
| 32-byte DATA | The transaction hash or the zero hash if the transaction is not yet available. |

If you deployed a contract, use [eth_getTransactionReceipt](#eth_gettransactionreceipt) to get the contract address.

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":[{see above}],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```


## eth_sendTransaction <a id="eth_sendtransaction"></a>

Klaytn-TODO: Write docs after implement sendTransaction.

## eth_signTransaction <a id="eth_signtransaction"></a>

Klaytn-TODO: Write docs after implement sendTransaction.


## eth_getStorageAt <a id="eth_getstorageat"></a>

Returns the value from a storage position at a given address.

**Parameters**

| Type                            | Description                                                                                                                                                                          |
|---------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 20-byte DATA                    | Address of the storage.                                                                                                                                                              |
| QUANTITY                        | Integer of the position in the storage.                                                                                                                                              |
| QUANTITY &#124; TAG &#124; HASH | Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"` as in the [default block parameter](block.md#the-default-block-parameter), or block hash. |

**Return Value**

| Type  | Description                          |
|-------|--------------------------------------|
| DATA  | The value at this storage position.  |

**Example**

Calculating the correct position depends on the storage to retrieve. Consider the following contract deployed at `0x295a70b2de5e3953354a6a8344e616ed314d7251` by address `0x391694e7e0b0cce554cb130d723a9d27458f9298`.

```
contract Storage {
    uint pos0;
    mapping(address => uint) pos1;

    function Storage() {
        pos0 = 1234;
        pos1[msg.sender] = 5678;
    }
}
```

Retrieving the value of `pos0` is straight forward:

```shell
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' http://localhost:8551

{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}
```

Retrieving an element of the map is harder. The position of an element in the map is calculated with:
```javascript
keccak(LeftPad32(key, 0), LeftPad32(map position, 0))
```

This means to retrieve the storage on `pos1["0x391694e7e0b0cce554cb130d723a9d27458f9298"]` we need to calculate the position with:
```javascript
keccak(decodeHex("000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"))
```
The Klaytn console which comes with the `klay` library can be used to make the calculation
```javascript
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> klay.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```
Now to fetch the storage:
```shell
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' http://localhost:8551

{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```


## eth_mining <a id="eth_mining"></a>

Returns `true` if client is actively mining new blocks.

**NOTE**: Currently, every node is on mining mode by default to resend transactions. Please note that actual "mining" process is only done by Consensus Nodes (CNs).

**Parameters**

None

**Return Value**

| Type     | Description                                         |
|----------|-----------------------------------------------------|
| Boolean  | `true` if the client is mining, otherwise `false`.  |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_mining","params":[],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":true
}
```


## eth_syncing <a id="eth_syncing"></a>

Returns an object with data about the sync status or `false`.

**Parameters**

None

**Return Value**

`Object|Boolean`, an object with sync status data or `false` when not syncing:

| Name           | Type      | Description                                                                                                        |
|----------------|-----------|--------------------------------------------------------------------------------------------------------------------|
| startingBlock  | QUANTITY  | The block at which the import started (will only be reset, after the sync reached his head).                       |
| currentBlock   | QUANTITY  | The current block, same as `eth_blockNumber`.                                                                      |
| highestBlock   | QUANTITY  | The estimated highest block.                                                                                       |
| pulledStates   | QUANTITY  | The number of state entries processed until now.  If the sync mode is not "fast", zero is returned.                |
| knownStates    | QUANTITY  | The number of known state entries that still need to be pulled.  If the sync mode is not "fast", zero is returned. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": {
    "currentBlock":"0x3e31e",
    "highestBlock":"0x827eef",
    "knownStates":"0x0",
    "pulledStates":"0x0",
    "startingBlock":"0x0"
  }
}
// Or when not syncing
{
  "jsonrpc": "2.0",
  "id":1,
  "result": false
}
```

## eth_gasPrice <a id="eth_gasprice"></a>

Returns the current price per gas in peb.

**NOTE**: This API has different behavior from Ethereum's and
returns a gas price of Klaytn instead of suggesting a gas price as in Ethereum.

**Parameters**

None

**Return Value**

| Type       | Description                                |
|------------|--------------------------------------------|
| QUANTITY   | Integer of the current gas price in peb.   |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0x5d21dba00" // 25,000,000,000 peb = 25 Gpeb
}
```


## eth_maxPriorityFeePerGas <a id="eth_maxpriorityfeepergas"></a>

Returns a suggestion for a gas tip cap for dynamic fee transaction in peb.

**NOTE**: This API has different behavior from Ethereum's and
returns a gas price of Klaytn instead of suggesting a gas price as in Ethereum.

**Parameters**

None

**Return Value**

| Type       | Description                                |
|------------|--------------------------------------------|
| QUANTITY   | Integer of the current gas price in peb.   |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_maxPriorityFeePerGas","params":[],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0x5d21dba00" // 25,000,000,000 peb = 25 Gpeb
}
```

## eth_feeHistory<a id="eth_feehistory"></a>

Returns base fee per gas and transaction effective priority fee per gas history for the requested block range if available.

**Parameters**

| Name               | Type                | Description                                                                                                                                                                                                                  |
|--------------------|---------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| blockCount         | QUANTITY            | Number of blocks in the requested range expressed as a hexidecimal number. Between 1 (0x1) and 1024 (0x400) blocks can be requested in a single query. Less than requested may be returned if not all blocks are available.  |
| lastBlock          | QUANTITY &#124; TAG | Highest number block of the requested range as a block number or block tag.                                                                                                                                                  |
| rewardPercentiles  | Array of FLOAT      | Array of floating point value between 0 and 100.                                                                                                                                                                             |


**Return Value**

| Name          | Type              | Description                                                                                                                                                        |
|---------------|-------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| oldestBlock   | QUANTITY          | Lowest number block of the returned range expressed as a hexidecimal number.                                                                                       |
| baseFeePerGas | Array of QUANTITY | An array of block base fees per gas. This includes the next block after the newest of the returned range, because this value can be derived from the newest block. |
| gasUsedRatio  | Array of FLOAT    | An array of block gas used ratios. These are calculated as the ratio of gasUsed and gasLimit.                                                                      |
| reward        | Array of QUANTITY | An array of effective priority fee per gas data points from a single block. All zeroes are returned if the block is empty.                                         |


**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_maxPriorityFeePerGas","params":[],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0x5d21dba00" // 25,000,000,000 peb = 25 Gpeb
}
```


## eth_getFilterChanges <a id="eth_getfilterchanges"></a>

Polling method for a filter, which returns an array of logs which occurred since last poll.

**Parameters**

| Name | Type      | Description                           |
|------|-----------|---------------------------------------|
| id   | QUANTITY  | The filter id (*e.g.*, "0x16" // 22). |

**Return Value**

`Array` - Array of log objects, or an empty array if nothing has changed since last poll.
- For filters created with [eth_newBlockFilter](#eth_newblockfilter), the return are block hashes (32-byte DATA),
  *e.g.*, `["0x3454645634534..."]`.
- For filters created with [eth_newPendingTransactionFilter](#eth_newpendingtransactionfilter), the return are transaction
  hashes (32-byte DATA), *e.g.*, `["0x6345343454645..."]`.
- For filters created with [eth_newFilter](#eth_newfilter), logs are objects with following parameters:

| Name             | Type          | Description                                                                                                                                                                                                                                  |
|------------------|---------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| removed          | TAG           | `true` when the log was removed, due to a chain reorganization. `false` if it is a valid log.                                                                                                                                                |
| logIndex         | QUANTITY      | Integer of the log index position in the block. `null` when it is a pending log.                                                                                                                                                             |
| transactionIndex | QUANTITY      | Integer of the transactions index position log was created from. `null` when pending.                                                                                                                                                        |
| transactionHash  | 32-byte DATA  | Hash of the transactions this log was created from. `null` when pending.                                                                                                                                                                     |
| blockHash        | 32-byte DATA  | Hash of the block where this log was in. `null` when pending.                                                                                                                                                                                |
| blockNumber      | QUANTITY      | The block number where this log was in. `null` when pending.                                                                                                                                                                                 |
| address          | 20-byte DATA  | Address from which this log originated.                                                                                                                                                                                                      |
| data             | DATA          | Contains the non-indexed arguments of the log.                                                                                                                                                                                               |
| topics           | Array of DATA | Array of 0 to 4 32-byte DATA of indexed log arguments. (In Solidity: The first topic is the hash of the signature of the event (*e.g.*, `Deposit(address,bytes32,uint256)`), except you declared the event with the `anonymous` specifier.). |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getFilterChanges","params":["0x16"],"id":73}' http://localhost:8551

// Result
{
    "id":1,
    "jsonrpc":"2.0",
    "result": [{
    "logIndex": "0x1", // 1
    "blockNumber":"0x1b4", // 436
    "blockHash": "0x8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcfdf829c5a142f1fccd7d",
    "transactionHash":  "0xdf829c5a142f1fccd7d8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcf",
    "transactionIndex": "0x0", // 0
    "address": "0x16c5785ac562ff41e2dcfdf829c5a142f1fccd7d",
    "data":"0x0000000000000000000000000000000000000000000000000000000000000000",
    "topics": ["0x59ebeb90bc63057b6515673c3ecf9438e5058bca0f92585014eced636878c9a5"]
    },{
        ...
    }]
}
```


## eth_getFilterLogs <a id="eth_getfilterlogs"></a>

Returns an array of all logs matching filter with given id, which has been
obtained using [eth_newFilter](#eth_newfilter).  Note that filter ids
returned by other filter creation functions, such as [eth_newBlockFilter](#eth_newblockfilter)
or [eth_newPendingTransactionFilter](#eth_newpendingtransactionfilter),
cannot be used with this function.

The execution of this API can be limited by two node configurations to manage resources of Klaytn node safely.
- The number of maximum returned results in a single query (Default: 10,000).
- The execution duration limit of a single query (Default: 10 seconds).

**Parameters**

| Name | Type     | Description   |
|------|----------|---------------|
| id   | QUANTITY | The filter id |

**Return Value**

See [eth_getFilterChanges](#eth_getfilterchanges)

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getFilterLogs","params":["0xd32fd16b6906e67f6e2b65dcf48fc272"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":[{
      "address":"0x87ac99835e67168d4f9a40580f8f5c33550ba88b",
      "topics":["0xd596fdad182d29130ce218f4c1590c4b5ede105bee36690727baa6592bd2bfc8"],
      "data":"0x0000000000000000000000000000000000000000000000000000000000000064000000000000000000000000000000000000000000000000000000000000007b",
      "blockNumber":"0x54",
      "transactionHash":"0xcd4703cd62bd930d4652999bce8dcb75b7ade49d922fa42dc11e568c52a5fa6f",
      "transactionIndex":"0x0",
      "blockHash":"0x9a49f30f1d1876ff3913bd0aa58f328822e7a369cb13e0640b82234f26e781bb",
      "logIndex":"0x0",
      "removed":false
  }]
}
```


## eth_getLogs <a id="eth_getlogs"></a>

Returns an array of all logs matching a given filter object.

The execution of this API can be limited by two node configurations to manage resources of Klaytn node safely.
- The number of maximum returned results in a single query (Default: 10,000).
- The execution duration limit of a single query (Default: 10 seconds).

**Parameters**

`Object` - The filter options:

| Name      | Type                      | Description                                                                                                                                                                                                                                                                                                      |
|-----------|---------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| fromBlock | QUANTITY &#124; TAG       | (optional, default: `"latest"`) Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"` as in the [default block parameter](block.md#the-default-block-parameter).                                                                                                            |
| toBlock   | QUANTITY &#124; TAG       | (optional, default: `"latest"`) Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"` as in the [default block parameter](block.md#the-default-block-parameter).                                                                                                            |
| address   | 20-byte DATA &#124; Array | (optional) Contract address or a list of addresses from which logs should originate.                                                                                                                                                                                                                             |
| topics    | Array of DATA             | (optional) Array of 32-byte DATA topics. Topics are order-dependent. Each topic can also be an array of DATA with “or” options.                                                                                                                                                                                  |
| blockHash | 32-byte DATA              | (optional) A filter option that restricts the logs returned to the single block with the 32-byte hash blockHash. Using blockHash is equivalent to fromBlock = toBlock = the block number with hash blockHash. If blockHash is present in in the filter criteria, then neither fromBlock nor toBlock are allowed. |

**Return Value**

See [eth_getFilterChanges](#eth_getfilterchanges)

**Examples**

```shell
// Request
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"fromBlock":"0x1","toBlock":"latest","address":"0x87ac99835e67168d4f9a40580f8f5c33550ba88b"}],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":[
    {
      "address":"0x87ac99835e67168d4f9a40580f8f5c33550ba88b",
      "topics":["0xfa9b2165fc71c1d6ffa03291c7f5d223ea363ec063d747eec9ce2d30d24855ef"],
      "data":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000060000000000000000000000000d3564e57bb5c6f4d983a493a946534f8e1e8b481000000000000000000000000000000000000000000000000000000000000001341646472657373426f6f6b436f6e747261637400000000000000000000000000",
      "blockNumber":"0xd3b5",
      "transactionHash":"0x57ca8ff0a0d454d4c5418694c21bc4ef3de26cf7cd18dd404d6a7189a826bfe0",
      "transactionIndex":"0x0",
      "blockHash":"0x279251a907c6ab1fb723595511ff401432e7c2437d54189298f53a7d33ce3a60",
      "logIndex":"0x0",
      "removed":false
    },
    {
      "address":"0x87ac99835e67168d4f9a40580f8f5c33550ba88b",
      "topics":["0xfa3e1e272694072320aad73a3fadd8876c4bf8f40899c6c7ce2fda9f4e652cfa"],
      "data":"0x00000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000300000000000000000000000041383b6ee0ea5108d6b139165a9c85351aacd39800000000000000000000000057f7439898e652fa9b5654022297588532e5e0370000000000000000000000005b5b7a718a4124eb746ae00b1ce6edcaa5ab55bc",
      "blockNumber":"0xd3b5",
      "transactionHash":"0x57ca8ff0a0d454d4c5418694c21bc4ef3de26cf7cd18dd404d6a7189a826bfe0",
      "transactionIndex":"0x0",
      "blockHash":"0x279251a907c6ab1fb723595511ff401432e7c2437d54189298f53a7d33ce3a60",
      "logIndex":"0x1",
      "removed":false
    },
    {
      "address":"0x87ac99835e67168d4f9a40580f8f5c33550ba88b",
      "topics":["0xc7b359b1e189b7d721be7f0765a8d745be718566b8e67cbd2728dae5d6fd64b6"],
      "data":"0x000000000000000000000000d3564e57bb5c6f4d983a493a946534f8e1e8b481000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000003000000000000000000000000286d09b578d6126e09296dfe6c775ea7d0cf06e9000000000000000000000000860350f6d774efd16046335c388b832b910d3f8c00000000000000000000000061a7cbdd597848494fa85cbb76f9c63ad9c06cad",
      "blockNumber":"0x14d96",
      "transactionHash":"0x73282602d2f908180f47e3c8673f41c0899cbbb2d606976c2f77188ffa57d6e7",
      "transactionIndex":"0x0",
      "blockHash":"0xa5268a093cd5df7eccde18217a7019a35ab761088312027af16682aafa704ee3",
      "logIndex":"0x1",
      "removed":false
    },
    {
      "address":"0x87ac99835e67168d4f9a40580f8f5c33550ba88b",
      "topics":["0xc7b359b1e189b7d721be7f0765a8d745be718566b8e67cbd2728dae5d6fd64b6"],
      "data":"0x000000000000000000000000d3564e57bb5c6f4d983a493a946534f8e1e8b4810000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000030000000000000000000000002f91d1b79dd06da1b622122d61e05e64562de61e0000000000000000000000006e76e0ce76dfba55060400144318d4821a58510600000000000000000000000031b93ca83b5ad17582e886c400667c6f698b8ccd",
      "blockNumber":"0x14e4e",
      "transactionHash":"0xf9d86ed451d67abc68c517f7fa0e0a7a8e3dedec23f56febda2b7f52d35185b6",
      "transactionIndex":"0x0",
      "blockHash":"0x7ddf4a0a203d40afc1706aa24b787da601e1bce326319349d0eeef6c41656fa5",
      "logIndex":"0x1",
      "removed":false
    }
  ]
}
```

```shell
// Request
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"fromBlock":"earliest","toBlock":"latest","topics":["0xc7b359b1e189b7d721be7f0765a8d745be718566b8e67cbd2728dae5d6fd64b6"]}],"id":2}' http://localhost:8551

// Result
{
  "jsonrpc":"2.0",
  "id":2,
  "result":[
    {
      "address":"0x87ac99835e67168d4f9a40580f8f5c33550ba88b",
      "topics":["0xc7b359b1e189b7d721be7f0765a8d745be718566b8e67cbd2728dae5d6fd64b6"],
      "data":"0x000000000000000000000000d3564e57bb5c6f4d983a493a946534f8e1e8b481000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000003000000000000000000000000286d09b578d6126e09296dfe6c775ea7d0cf06e9000000000000000000000000860350f6d774efd16046335c388b832b910d3f8c00000000000000000000000061a7cbdd597848494fa85cbb76f9c63ad9c06cad",
      "blockNumber":"0x14d96",
      "transactionHash":"0x73282602d2f908180f47e3c8673f41c0899cbbb2d606976c2f77188ffa57d6e7",
      "transactionIndex":"0x0",
      "blockHash":"0xa5268a093cd5df7eccde18217a7019a35ab761088312027af16682aafa704ee3",
      "logIndex":"0x1",
      "removed":false
    },
    {
      "address":"0x87ac99835e67168d4f9a40580f8f5c33550ba88b",
      "topics":["0xc7b359b1e189b7d721be7f0765a8d745be718566b8e67cbd2728dae5d6fd64b6"],
      "data":"0x000000000000000000000000d3564e57bb5c6f4d983a493a946534f8e1e8b4810000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000030000000000000000000000002f91d1b79dd06da1b622122d61e05e64562de61e0000000000000000000000006e76e0ce76dfba55060400144318d4821a58510600000000000000000000000031b93ca83b5ad17582e886c400667c6f698b8ccd",
      "blockNumber":"0x14e4e",
      "transactionHash":"0xf9d86ed451d67abc68c517f7fa0e0a7a8e3dedec23f56febda2b7f52d35185b6",
      "transactionIndex":"0x0",
      "blockHash":"0x7ddf4a0a203d40afc1706aa24b787da601e1bce326319349d0eeef6c41656fa5",
      "logIndex":"0x1",
      "removed":false
    },
    {
      "address":"0x87ac99835e67168d4f9a40580f8f5c33550ba88b",
      "topics":["0xc7b359b1e189b7d721be7f0765a8d745be718566b8e67cbd2728dae5d6fd64b6"],
      "data":"0x000000000000000000000000d3564e57bb5c6f4d983a493a946534f8e1e8b481000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000003000000000000000000000000a2b1264624c92257dd8e7f0cac42d451061d1510000000000000000000000000b381ee81e319e5ec48f42d0b47b5e4361c9a6f740000000000000000000000003855407fa65c4c5104648b3a9e495072df62b585",
      "blockNumber":"0x14f38",
      "transactionHash":"0xc8f8c637ea9fcbe71e23fe0779b59fb10173e8c4fd7e49bce3cce76ff67d353d",
      "transactionIndex":"0x0",
      "blockHash":"0xb1717038e443f517bd7a8c37b66fb731fed573f5fa5486ebbbb5e4c9060be50b",
      "logIndex":"0x1",
      "removed":false
    },
    {
      "address":"0x87ac99835e67168d4f9a40580f8f5c33550ba88b",
      "topics":["0xc7b359b1e189b7d721be7f0765a8d745be718566b8e67cbd2728dae5d6fd64b6"],
      "data":"0x000000000000000000000000d3564e57bb5c6f4d983a493a946534f8e1e8b4810000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000030000000000000000000000009dd579f23912665b956b0cd50387b29a62052732000000000000000000000000c98a86af2eca2989c0cb2a2b8d4bb841f11e94ab000000000000000000000000f65e07b6626ab43ecea744803fa46bd4a89bfdb6",
      "blockNumber":"0x14fe7",
      "transactionHash":"0x14da1883bb2aae487ce1cb93cd39bc9bb802adbba083f337051877358150ab3f",
      "transactionIndex":"0x0",
      "blockHash":"0xcd820189f00e9a6faaea7313437b92114e69bd32e18b4a28e7763117716c6fa9",
      "logIndex":"0x1",
      "removed":false
    }
  ]
}
```


## eth_newBlockFilter <a id="eth_newblockfilter"></a>

Creates a filter in the node, to notify when a new block arrives.
To check if the state has changed, call [eth_getFilterChanges](#eth_getfilterchanges).

**Parameters**

None

**Return Value**

| Type     | Description  |
|----------|--------------|
| QUANTITY | A filter id. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_newBlockFilter","params":[],"id":73}' http://localhost:8551

// Result
{
  "jsonrpc":"2.0",
  "id":73,
  "result":"0xc2f2e8168a7e38b5d979d0f7084130ee"
}
```


## eth_newFilter <a id="eth_newfilter"></a>

Creates a filter object, based on filter options, to notify when the state changes (logs).
- To check if the state has changed, call [eth_getFilterChanges](#eth_getfilterchanges).
- To obtain all logs matching the filter created by `eth_newFilter`, call
  [eth_getFilterLogs](#eth_getfilterlogs).

**A note on specifying topic filters:**
Topics are order-dependent. A transaction with a log with topics `[A, B]` will be matched by the following topic filters:
* `[]` "anything"
* `[A]` "A in first position (and anything after)"
* `[null, B]` "anything in first position AND B in second position (and anything after)"
* `[A, B]` "A in first position AND B in second position (and anything after)"
* `[[A, B], [A, B]]` "(A OR B) in first position AND (A OR B) in second position (and anything after)"

**Parameters**

`Object` - The filter options:

| Name      | Type                      | Description                                                                                                                                                                                           |
|-----------|---------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| fromBlock | QUANTITY &#124; TAG       | (optional, default: `"latest"`) Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"` as in the [default block parameter](block.md#the-default-block-parameter). |
| toBlock   | QUANTITY &#124; TAG       | (optional, default: `"latest"`) Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"` as in the [default block parameter](block.md#the-default-block-parameter). |
| address   | 20-byte DATA &#124; Array | (optional) Contract address or a list of addresses from which logs should originate.                                                                                                                  |
| topics    | Array of DATA             | (optional) Array of 32-byte DATA topics. Topics are order-dependent. Each topic can also be an array of DATA with "or" options.                                                                       |

{% hint style="success" %}
NOTE: In versions earlier than Klaytn v1.7.0, only integer block number, the string `"earliest"` and `"latest"` are available.
{% endhint %}

**Return Value**

| Type     | Description |
|----------|-------------|
| QUANTITY | A filter id |

**Example**

```shell
// Request
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_newFilter","params":[{"fromBlock":"earliest","toBlock":"latest","address":"0x87ac99835e67168d4f9a40580f8f5c33550ba88b","topics":["0xd596fdad182d29130ce218f4c1590c4b5ede105bee36690727baa6592bd2bfc8"]}],"id":1}' http://localhost:8551

// Result
{"jsonrpc":"2.0","id":1,"result":"0xd32fd16b6906e67f6e2b65dcf48fc272"}
```


## eth_newPendingTransactionFilter <a id="eth_newpendingtransactionfilter"></a>

Creates a filter in the node, to notify when new pending transactions arrive.
To check if the state has changed, call [eth_getFilterChanges](#eth_getfilterchanges).

**Parameters**

None

**Return Value**

| Type     | Description     |
|----------|-----------------|
| QUANTITY | A filter id.    |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_newPendingTransactionFilter","params":[],"id":73}' http://localhost:8551

// Result
{
  "jsonrpc":"2.0",
  "id":73,
  "result":"0x90cec22a723fcc725fb2462733c2880f"
}
```

## eth_subscribe <a id="eth_subscribe"></a>

Creates a new subscription to specific events by using either RPC Pub/Sub over WebSockets or filters over HTTP.
It allows clients to wait for events instead of polling for them.

The node will return a subscription id for each subscription created.
For each event that matches the subscription, a notification with relevant data is sent together with the subscription id.
If a connection is closed, all subscriptions created over the connection are removed.

**Parameters**

`Object` - A notification type: `"newHeads"` or `"logs"`.


`"newHeads"` notifies you of each block added to the blockchain.
`"logs"` notifies you of logs included in new blocks. This type requires a second parameter that specifies filter options. For more details, go to [eth_newFilter > parameters](https://docs.klaytn.com/bapp/json-rpc/api-references/klay/filter#eth_newfilter).

**Return Value**

| Type     | Description                                                                                                                                                  |
|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| QUANTITY | A subscription id when a subscription is created. For each event that matches the subscription, a notification with relevant data will be delivered as well. |


**Example**

This API is appropriate for use with a WebSocket tool, [`wscat`](https://www.npmjs.com/package/wscat).

```shell
// Request
wscat -c http://localhost:8552
> {"jsonrpc":"2.0", "id": 1, "method": "eth_subscribe", "params": ["newHeads"]}

// Result
< {"jsonrpc":"2.0","id":1,"result":"0x48bb6cb35d6ccab6eb2b4799f794c312"}
< {"jsonrpc":"2.0","method":"eth_subscription","params":{"subscription":"0x48bb6cb35d6ccab6eb2b4799f794c312","result":{"parentHash":"0xc39755b6ac01d1e8c58b1088e416204f7af5b6b66bfb4f474523292acbaa7d57","reward":"0x2b2a7a1d29a203f60e0a964fc64231265a49cd97","stateRoot":"0x12aa1d3ab0440d844c28fbc6f89d26082f39a8435b512fa487ff55c2056aceb3","number":"0x303bea4”, ... ... }}}
```

```shell
// Request
wscat -c http://localhost:8552
> {"jsonrpc":"2.0", "id": 1, "method": "eth_subscribe", "params": ["logs", {"fromBlock":"earliest","toBlock":"latest","address":"0x87ac99835e67168d4f9a40580f8f5c33550ba88b","topics":["0xd596fdad182d29130ce218f4c1590c4b5ede105bee36690727baa6592bd2bfc8"]}]}

// Result
< {"jsonrpc":"2.0","id":1,"result":"0xbdab16c8e4ae1b9e6930c78359de3e0e"}
< {"jsonrpc":"2.0","method":"eth_subscription","params":{"subscription":"0xbdab16c8e4ae1b9e6930c78359de3e0e","result":{"address":"0x2e4bb340e26caffb4073d7f1151f37d17524cdbc","topics":["0xb1a7310b1a46c788fcf30784cad70442d5232acaef480b0c094c76bee8d9c77d"],"data":"0x0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000d2588fe96a34c56a5d0a484cb603bc16fc5cdbbc","blockNumber":"0x3041201","transactionHash":"0xdacdebc77006fc566f65448524a0bc770056d8c7a05244bc7bfb2123b1bd398c","transactionIndex":"0x0","blockHash":"0x899b2dbfe96a34ce5d965dbcfcf39d072b4ce1097d479923e6b6355f3e2609ec","logIndex":"0x0","removed":false}}}
```


## eth_uninstallFilter <a id="eth_uninstallfilter"></a>

Uninstalls a filter with given id. Should always be called when watch is no longer needed.
Additionally, filters timeout when they are not requested with [eth_getFilterChanges](#eth_getfilterchanges) for a period of time.

**Parameters**

| Name   | Type     | Description   |
|--------|----------|---------------|
| filter | QUANTITY | A filter id.  |

**Return Value**

| Type    | Description                                                           |
|---------|-----------------------------------------------------------------------|
| Boolean | `true` if the filter was successfully uninstalled, otherwise `false`. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_uninstallFilter","params":["0xb"],"id":73}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": true
}
```


## eth_unsubscribe <a id="eth_unsubscribe"></a>

Cancels the subscription with a specific subscription id by using either RPC Pub/Sub over WebSockets or filters over HTTP.
Only the connection that created a subscription can unsubscribe from it.

**Parameters**

| Type     | Description        |
|----------|--------------------|
| QUANTITY | A subscription id. |

**Return Value**

| Type    | Description                                                              |
|---------|--------------------------------------------------------------------------|
| Boolean | `true` if the subscription was successfully canceled, otherwise `false`. |


**Example**

This API is appropriate for use with a WebSocket tool, [`wscat`](https://www.npmjs.com/package/wscat).

```shell
// Request
> {"jsonrpc":"2.0", "id": 1, "method": "eth_unsubscribe", "params": ["0xab8ac7a4045025d0c2807d63060eea6d"]}

// Result
< {"jsonrpc":"2.0","id":1,"result":true}
```

## eth_coinbase <a id="eth_coinbase"></a>

Returns the client coinbase address.

**Parameters**

None

**Return Value**

| Type           | Description                     |
|----------------|---------------------------------|
| 20-byte DATA   | The current coinbase address.   |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_coinbase","params":[],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0xc94770007dda54cF92009BFF0dE90c06F603a09f"
}
```


## eth_etherbase <a id="eth_etherbase"></a>

Returns the client etherbase address.

**Parameters**

None

**Return Value**

| Type           | Description                    |
|----------------|--------------------------------|
| 20-byte DATA   | The current etherbase address. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_etherbase","params":[],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0xc94770007dda54cF92009BFF0dE90c06F603a09f"
}
```

## eth_hashrate <a id="eth_hashrate"></a>

Returns the number of hashes per second that the node is mining with.

Please note that it always return `0x0` because there is no PoW mechanism in Klaytn.

**Parameters**

None

**Return Value**

| Type     | Description                      |
|----------|----------------------------------|
| QUANTITY | The number of hashes per second. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_hashrate","params":[],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0x0"
}
```

## eth_getWork <a id="eth_getwork"></a>

Returns the hash of the current block, the seedHash, and the boundary condition to be met ("target").

Please note that it always return `errNoMiningWork` because there is no PoW mechanism in Klaytn.

**Parameters**

None

**Return Value**

| Type                  | Description                                                                                                                   |
|-----------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Array of 32-byte DATA | List of current block header pow-hash, the seed hash used for the DAG, the boundary condition ("target"), 2^256 / difficulty. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getWork","params":[],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "error": {
    "code": -32000,
    "message": "no mining work available yet"
  }
}
```


## eth_submitWork <a id="eth_submitwork"></a>

Used for submitting a proof-of-work solution.

Please note that it always return `false` because there is no PoW mechanism in Klaytn.

**Parameters**

| Type         | Description                      |
|--------------|----------------------------------|
| 8-byte DATA  | The nonce found (64 bits)        |
| 32-byte DATA | The header’s pow-hash (256 bits) |
| 32-byte DATA | The mix digest (256 bits)        |

**Return Value**

| Type      | Description                                                        |
|-----------|--------------------------------------------------------------------|
| Boolean   | Returns true if the provided solution is valid, otherwise false.   |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_submitWork","params":[],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": false
}
```

## eth_submitHashrate <a id="eth_submithashrate"></a>

Used for submitting mining hashrate.

Please note that it always return `false` because there is no PoW mechanism in Klaytn.

**Parameters**

| Name     | Type         | Description                                                      |
|----------|--------------|------------------------------------------------------------------|
| hashrate | 32-byte DATA | A hexadecimal string representation (32 bytes) of the hash rate. |
| id       | 32-byte DATA | A random hexadecimal(32 bytes) ID identifying the client.        |

**Return Value**

| Type      | Description                                                              |
|-----------|--------------------------------------------------------------------------|
| Boolean   | Returns true if submitting went through succesfully and false otherwise. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_submithashrate","params":[],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": false
}
```