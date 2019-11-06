## klay_accountCreated <a id="klay_accountcreated"></a>

입력된 주소의 계정이 존재하는 경우 `true`를 반환합니다. 해당 주소의 계정이 존재하지 않으면 `false`를 반환합니다.

**매개변수**

| 명칭           | 형식                  | 설명                                                                                                                                                         |
| ------------ | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 계정 (Account) | 20바이트 크기 DATA       | 계정의 주소입니다.                                                                                                                                                 |
| 블록 번호        | QUANTITY &#124; TAG | 정수 형태의 블록 번호 또는 `"latest"`, `"earliest"`, `"pending"`과 같이 상태를 나타내는 문자열입니다. 이 매개변수에 대한 자세한 설명은 [기본 블록 매개변수](./block.md#the-default-block-parameter)를 참고하세요. |

**리턴값**

| 형식  | 설명                           |
| --- | ---------------------------- |
| 불리언 | 입력으로 받은 주소가 존재하는지 여부를 반환합니다. |

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


## klay_accounts <a id="klay_accounts"></a>

클라이언트가 소유한 계정들의 주소 목록을 반환합니다.

**매개변수**

없음

**리턴값**

| 형식            | 설명                         |
| ------------- | -------------------------- |
| 20바이트 크기 DATA | 클라이언트가 소유한 계정의 주소들을 반환합니다. |

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


## klay_getAccount <a id="klay_getaccount"></a>

입력으로 받은 주소의 계정 정보를 반환합니다. Klaytn에는 외부 소유 계정(EOA)와 스마트 컨트랙트 계정 등 두 가지 유형의 계정이 있습니다. 자세한 내용은  [Klaytn 계정](../../../../klaytn/design/accounts.md#klaytn-accounts)을 참고해주세요.

**매개변수**

| 형식                  | 설명                                                                                                                                                         |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 20바이트 크기 DATA       | 계정의 주소입니다.                                                                                                                                                 |
| QUANTITY &#124; TAG | 정수 형태의 블록 번호 또는 `"latest"`, `"earliest"`, `"pending"`과 같이 상태를 나타내는 문자열입니다. 이 매개변수에 대한 자세한 설명은 [기본 블록 매개변수](./block.md#the-default-block-parameter)를 참고하세요. |

**리턴값**

| 형식          | 설명                      |
| ----------- | ----------------------- |
| 계정(Account) | 계정 유형에 따라 다른 속성을 반환합니다. |

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


## klay_getAccountKey <a id="klay_getaccountkey"></a>

입력으로 받은 주소의 외부 소유 계정(EOA)에 해당하는 계정의 키를 반환합니다. 해당 계정이 AccountKeyLegacy이거나 입력으로 받은 주소의 계정이 스마트 컨트랙트 계정이면 빈 값을 반환합니다. 자세한 내용은 [계정 키](../../../../klaytn/design/accounts.md#account-key)를 참고해주세요.

**매개변수**

| 형식                  | 설명                                                                                                                                                         |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 20바이트 크기 DATA       | 계정의 주소입니다.                                                                                                                                                 |
| QUANTITY &#124; TAG | 정수 형태의 블록 번호 또는 `"latest"`, `"earliest"`, `"pending"`과 같이 상태를 나타내는 문자열입니다. 이 매개변수에 대한 자세한 설명은 [기본 블록 매개변수](./block.md#the-default-block-parameter)를 참고하세요. |

**리턴값**

| 형식         | 설명                           |
| ---------- | ---------------------------- |
| AccountKey | 계정 키는 공개키(들)와 키의 유형으로 구성됩니다. |

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


## klay_getBalance <a id="klay_getbalance"></a>

입력으로 받은 주소에 해당하는 계정의 잔액을 반환합니다.

**매개변수**

| 형식                  | 설명                                                                                                                                                         |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 20바이트 크기 DATA       | 잔액을 확인할 계정의 주소입니다.                                                                                                                                         |
| QUANTITY &#124; TAG | 정수 형태의 블록 번호 또는 `"latest"`, `"earliest"`, `"pending"`과 같이 상태를 나타내는 문자열입니다. 이 매개변수에 대한 자세한 설명은 [기본 블록 매개변수](./block.md#the-default-block-parameter)를 참고하세요. |

**리턴값**

| 형식       | 설명                        |
| -------- | ------------------------- |
| QUANTITY | peb의 현재 잔액을 정수 형태로 반환합니다. |

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


## klay_getCode <a id="klay_getcode"></a>

입력으로 받은 주소의 코드를 반환합니다.

**매개변수**

| 형식                  | 설명                                                                                                                                                         |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 20바이트 크기 DATA       | 계정의 주소입니다.                                                                                                                                                 |
| QUANTITY &#124; TAG | 정수 형태의 블록 번호 또는 `"latest"`, `"earliest"`, `"pending"`과 같이 상태를 나타내는 문자열입니다. 이 매개변수에 대한 자세한 설명은 [기본 블록 매개변수](./block.md#the-default-block-parameter)를 참고하세요. |

**리턴값**

| 형식   | 설명                 |
| ---- | ------------------ |
| DATA | 입력으로 받은 주소의 코드입니다. |

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


## klay_getTransactionCount <a id="klay_gettransactioncount"></a>

어떤 주소의 계정에서 *발신된* 트랜잭션의 개수를 반환합니다.

**매개변수**

| 형식                  | 설명                                                                                                                                                         |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 20바이트 크기 DATA       | 계정의 주소입니다.                                                                                                                                                 |
| QUANTITY &#124; TAG | 정수 형태의 블록 번호 또는 `"latest"`, `"earliest"`, `"pending"`과 같이 상태를 나타내는 문자열입니다. 이 매개변수에 대한 자세한 설명은 [기본 블록 매개변수](./block.md#the-default-block-parameter)를 참고하세요. |

**리턴값**

| 형식       | 설명                                       |
| -------- | ---------------------------------------- |
| QUANTITY | 입력으로 받은 주소에서 발신한 트랜잭션의 개수를 정수 형태로 반환합니다. |

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




## klay_isContractAccount <a id="klay_iscontractaccount"></a>

특정 번호의 블록 시간에서 입력으로 받은 계정의 codeHash가 비어 있지 않은 경우 `true`를 반환합니다. 해당 계정이 EOA이거나 codeHash가 비어 있는 스마트 컨트랙트 계정이면 `false`를 반환합니다.

**매개변수**

| 명칭           | 형식                  | 설명                                                                                                                                                         |
| ------------ | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 계정 (Account) | 20바이트 크기 DATA       | 계정의 주소입니다.                                                                                                                                                 |
| 블록 번호        | QUANTITY &#124; TAG | 정수 형태의 블록 번호 또는 `"latest"`, `"earliest"`, `"pending"`과 같이 상태를 나타내는 문자열입니다. 이 매개변수에 대한 자세한 설명은 [기본 블록 매개변수](./block.md#the-default-block-parameter)를 참고하세요. |

**리턴값**

| 형식  | 설명                                 |
| --- | ---------------------------------- |
| 불리언 | `true`이면 매개변수가 스마트 컨트랙트 계정의 주소입니다. |

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

## klay_sign <a id="klay_sign"></a>

sign 메서드는 다음을 사용하여 Klaytn만의 서명을 계산합니다.
```
sign(keccak256("\x19Klaytn Signed Message:\n" + len(message) + message)))
```

메시지에 접두사를 붙이면 계산된 서명 값이 Klaytn의 서명임을 알 수 있습니다. 이는 악성 BApp이 트랜잭션과 같은 임의의 데이터를 서명하여 누군가를 사칭할 수 없도록 방지합니다.

**참고**: 서명하려는 계정은 잠금 해제되어 있어야 합니다.

**매개변수**

| 명칭           | 형식             | 설명            |
| ------------ | -------------- | ------------- |
| 계정 (Account) | 20바이트 크기 DATA  | 계정의 주소입니다.    |
| 메시지          | N 바이트 크기의 DATA | 서명하려는 메시지입니다. |

**리턴값**

| 형식   | 설명       |
| ---- | -------- |
| DATA | 서명 값입니다. |

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
