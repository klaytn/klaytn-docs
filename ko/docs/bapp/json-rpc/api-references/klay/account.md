## klay_accountCreated

입력된 주소의 계정이 존재하는 경우 `true`를 반환합니다. 해당 주소의 계정이 존재하지 않으면 `false`를 반환합니다.

**Parameters**

| 명칭           | 형식                  | 설명                                                                                                                                                      |
| ------------ | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 계정 (Account) | 20-byte DATA        | 주소                                                                                                                                                      |
| block number | QUANTITY &#124; TAG | Integer block number, or the string `"latest"`, `"earliest"` or `"pending"`, see the [default block parameter](./block.md#the-default-block-parameter). |

**Return Value**

| 형식      | 설명                                |
| ------- | --------------------------------- |
| Boolean | The existence of an input address |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_accountCreated","params":["0xa4f42d4d2a3a13874406435500950c9bf2d783db","latest"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":true
}
```


## klay_accounts

Returns a list of addresses owned by client.

**Parameters**

None

**Return Value**

| 형식                    | 설명                             |
| --------------------- | ------------------------------ |
| Array of 20-byte DATA | Addresses owned by the client. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_accounts","params":[],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": ["0xc94770007dda54cF92009BFF0dE90c06F603a09f"]
}
```


## klay_getAccount

Returns the account information of a given address. There are two different account types in Klaytn: Externally Owned Account (EOA) and Smart Contract Account. See [Klaytn Accounts](../../../../klaytn/design/accounts.md#klaytn-accounts).

**Parameters**

| 형식                  | 설명                                                                                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 20-byte DATA        | 주소                                                                                                                                                      |
| QUANTITY &#124; TAG | Integer block number, or the string `"latest"`, `"earliest"` or `"pending"`, see the [default block parameter](./block.md#the-default-block-parameter). |

**Return Value**

| 형식           | 설명                                          |
| ------------ | ------------------------------------------- |
| 계정 (Account) | Each account type has different attributes. |

**예시**

```shell
// Request (Account type: Externally Owned Account)
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getAccount","params":["0x3111a0577f322e8fb54f78d9982a26ae7ca0f722", "latest"],"id":1}' http://localhost:8551

// Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    accType: 1,
    account: {
      balance: 4985316100000000000,
      humanReadable: false,
      key: {
        key: {
          x: "0x230037a99462acd829f317d0ce5c8e2321ac2951de1c1b1a18f9af5cff66f0d7",
          y: "0x18a7fb1b9012d2ac87bc291cbf1b3b2339356f1ce7669ae68405389be7f8b3b6"
        },
        keyType: 2
      },
      nonce: 11
    }
  }
}
```
```shell
// Request (Account type: Smart Contract Account)
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getAccount","params":["0x3111a0577f322e8fb54f78d9982a26ae7ca0f722", "latest"],"id":1}' http://localhost:8551

// Result
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "accType": 2,
    "account": {
      "balance": "0x0",
      "codeFormat": 0,
      "codeHash": "80NXvdOay02rYC/JgQ7RfF7yoxY1N7W8P7BiPvkIeF8=",
      "humanReadable": false,
      "key": {
        "key": {},
        "keyType": 3
      },
      "nonce": 1,
      "storageRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421"
    }
  }
}
```


## klay_getAccountKey

Returns the account key of the Externally Owned Account (EOA) of a given address. If the account has AccountKeyLegacy or the account of the given address is a Smart Contract Account, it will return an empty key value. See [Account Key](../../../../klaytn/design/accounts.md#account-key).

**Parameters**

| 형식                  | 설명                                                                                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 20-byte DATA        | 주소                                                                                                                                                      |
| QUANTITY &#124; TAG | Integer block number, or the string `"latest"`, `"earliest"` or `"pending"`, see the [default block parameter](./block.md#the-default-block-parameter). |

**Return Value**

| 형식         | 설명                                                       |
| ---------- | -------------------------------------------------------- |
| AccountKey | The account key consist of public key(s) and a key type. |

**예시**

```shell
// Request (AccountKey type: AccountKeyPublic)
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getAccountKey","params":["0x3111a0577f322e8fb54f78d9982a26ae7ca0f722", "latest"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": {
    key: {
      x: "0x230037a99462acd829f317d0ce5c8e2321ac2951de1c1b1a18f9af5cff66f0d7",
      y: "0x18a7fb1b9012d2ac87bc291cbf1b3b2339356f1ce7669ae68405389be7f8b3b6"
    },
    keyType: 2
  }
}
```
```shell
// Request (AccountKey type: AccountKeyRoleBased)
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getAccountKey","params":["0x68756d616e616161000000000000000000000000", "latest"],"id":1}' http://localhost:8551

// Result (AccountKeyRoleBased has nested key structure)
{
  "jsonrpc": "2.0",
  "id":1,
  "result": {
    key: [{
      key: {
        x: "0x819659d4f08e08d4bd97c6ce5ed2c2eb914201a5b3731eb9d208128df24b97dd",
        y: "0x1824267ab9e55f5a3fb1030f0299fa73fc0037305d5b1d90100e2131af41c010"
      },
      keyType: 2
    }, {
      key: {
        x: "0x73363604ca8776a2883b02046361b7eb6bd11f4fc10700ee51c525bcded134c1",
        y: "0xfc3e3cb3f4f5b709df5a2075107bc73c8618440c08456bafc44ee6f27f9e6326"
      },
      keyType: 2
    }, {
      key: {
        x: "0x95c920eb2571dff37baecdbbee32897e6e448c6725c5ab73569cc6f659684307",
        y: "0xef7839023c48acf710ad322356c12b7c5b7f475515ba7d5834f41a993f42b8f9"
      },
      keyType: 2
    }],
    keyType: 5
  }
}
```
```shell
// Request (AccountKey type: AccountKeyLegacy)
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getAccountKey","params":["0x44711E89b0c23845b5B2ed9D3716BA42b8a3e075", "latest"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": {
    key: {},
    keyType: 1
  }
}
```


## klay_getBalance

Returns the balance of the account of given address.

**Parameters**

| 형식                  | 설명                                                                                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 20-byte DATA        | Address to check for balance.                                                                                                                           |
| QUANTITY &#124; TAG | Integer block number, or the string `"latest"`, `"earliest"` or `"pending"`, see the [default block parameter](./block.md#the-default-block-parameter). |

**Return Value**

| 형식       | 설명                                     |
| -------- | -------------------------------------- |
| QUANTITY | Integer of the current balance in peb. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getBalance","params":["0xc94770007dda54cF92009BFF0dE90c06F603a09f", "latest"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0","id":1,
  "result": "0x0234c8a3397aab58" // 158972490234375000
}
```


## klay_getCode

Returns code at a given address.

**Parameters**

| 형식                  | 설명                                                                                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 20-byte DATA        | 주소                                                                                                                                                      |
| QUANTITY &#124; TAG | Integer block number, or the string `"latest"`, `"earliest"` or `"pending"`, see the [default block parameter](./block.md#the-default-block-parameter). |

**Return Value**

| 형식   | 설명                               |
| ---- | -------------------------------- |
| DATA | The code from the given address. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getCode","params":["0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b", "0x2"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result":   "0x600160008035811a818181146012578301005b601b6001356025565b8060005260206000f25b600060078202905091905056"
}
```


## klay_getTransactionCount

Returns the number of transactions *sent* from an address.

**Parameters**

| 형식                  | 설명                                                                                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 20-byte DATA        | 주소                                                                                                                                                      |
| QUANTITY &#124; TAG | Integer block number, or the string `"latest"`, `"earliest"` or `"pending"`, see the [default block parameter](./block.md#the-default-block-parameter). |

**Return Value**

| 형식       | 설명                                                            |
| -------- | ------------------------------------------------------------- |
| QUANTITY | Integer of the number of transactions send from this address. |

**예시**

 ```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_getTransactionCount","params":["0xc94770007dda54cF92009BFF0dE90c06F603a09f","latest"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0x1" // 1
}
 ```




## klay_isContractAccount

Returns `true` if an input account has a non-empty codeHash at the time of a specific block number. It returns `false` if the account is an EOA or a smart contract account which doesn't have codeHash.

**Parameters**

| 명칭           | 형식                  | 설명                                                                                                                                                      |
| ------------ | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 계정 (Account) | 20-byte DATA        | 주소                                                                                                                                                      |
| block number | QUANTITY &#124; TAG | Integer block number, or the string `"latest"`, `"earliest"` or `"pending"`, see the [default block parameter](./block.md#the-default-block-parameter). |

**Return Value**

| 형식      | 설명                                                                      |
| ------- | ----------------------------------------------------------------------- |
| Boolean | `true` means the input parameter is an existing smart contract address. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_isContractAccount","params":["0x2f07d5b3fa1051460099dc9ea0c2975b6ea67776", "latest"],"id":1}' http://localhost:8551

// Result
{
    "jsonrpc":"2.0",
    "id":1,
    "result":true
}
```

## klay_sign

The sign method calculates a Klaytn-specific signature with:
```
sign(keccak256("\x19Klaytn Signed Message:\n" + len(message) + message)))
```

Adding a prefix to the message makes the calculated signature recognizable as a Klaytn-specific signature. This prevents misuse where a malicious BApp can sign arbitrary data, *e.g.*, transaction, and use the signature to impersonate the victim.

**NOTE**: The address to sign with must be unlocked.

**Parameters**

| 명칭           | 형식           | 설명              |
| ------------ | ------------ | --------------- |
| 계정 (Account) | 20-byte DATA | 주소              |
| message      | N-byte DATA  | Message to sign |

**Return Value**

| 형식   | 설명        |
| ---- | --------- |
| DATA | Signature |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_sign","params":["0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "0xdeadbeaf"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```
