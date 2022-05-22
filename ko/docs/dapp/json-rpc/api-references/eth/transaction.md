## eth_call <a id="eth_call"></a>

Executes a new message call immediately, without creating a transaction on the block chain. The eth_call method can be used to query internal contract state, to execute validations coded into a contract or even to test what the effect of a transaction would be without running it live.

**Parameters**

| 이름               | 타입                  | 설명                                                                                                                                                                                                                                                                                            |
| ---------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| callObject       | Object              | 트랜잭션 호출 객체입니다. 객체 속성은 다음의 표를 참고해주세요.                                                                                                                                                                                                                                                          |
| blockNumberOrTag | QUANTITY &#124; TAG | Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"` as in [default block parameter](./block.md#the-default-block-parameter). The block number is mandatory and defines the context (state) against which the specified transaction should be executed. |
| stateOverrideSet | Object              | The state override set is an optional address-to-state mapping, where each entry specifies some state to be ephemerally overridden prior to executing the call.                                                                                                                               |

`callObject`에는 다음의 속성이 있습니다.

| 이름    | 타입            | 설명                                                                                                                                                                |
| ----- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from  | 20바이트 크기 DATA | (optional) Address the transaction is simulated to have been sent from. The `0x00..0` address is used if no address is specified.                                 |
| to    | 20바이트 크기 DATA | (optional) Address the transaction is sent to.                                                                                                                    |
| gas   | QUANTITY      | (optional) Maximum gas allowance for the code execution to avoid infinite loops. Defaults to 2^63 or whatever value the node operator specified via --rpc.gascap. |
| 가스 가격 | QUANTITY      | (optional) Number of `peb` to simulate paying for each unit of gas during execution. Defaults to `0` peb.                                                         |
| value | QUANTITY      | (optional) Amount of `peb` to simulate sending along with the transaction. Defaults to `0`.                                                                       |
| 데이터   | DATA          | (optional) Hash of the method signature and encoded parameter.                                                                                                    |

**Example - callObject**

```json
{
  "from": "0xd9c9cd5f6779558b6e0ed4e6acf6b1947e7fa1f3",
  "to": "0xebe8efa441b9302a0d7eaecc277c09d20d684540",
  "gas": "0x1bd7c",
  "data": "0xd459fc46000000000000000000000000000000000000000000000000000000000046c650dbb5e8cb2bac4d2ed0b1e6475d37361157738801c494ca482f96527eb48f9eec488c2eba92d31baeccfb6968fad5c21a3df93181b43b4cf253b4d572b64172ef000000000000000000000000000000000000000000000000000000000000008c00000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000001a00000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000001c000000000000000000000000000000000000000000000000000000000000001c0000000000000000000000000000000000000000000000000000000000000002b85c0c828d7a98633b4e1b65eac0c017502da909420aeade9a280675013df36bdc71cffdf420cef3d24ba4b3f9b980bfbb26bd5e2dcf7795b3519a3fd22ffbb2000000000000000000000000000000000000000000000000000000000000000238fb6606dc2b5e42d00c653372c153da8560de77bd9afaba94b4ab6e4aa11d565d858c761320dbf23a94018d843772349bd9d92301b0ca9ca983a22d86a70628"
}
```

`stateOverrideSet` has the following properties:

| 이름        | 타입     | 설명                                                                                                               |
| --------- | ------ | ---------------------------------------------------------------------------------------------------------------- |
| 잔액        | 수량     | (optional) Fake balance to set for the account before executing the call.                                        |
| 논스        | 수량     | (optional) Fake nonce to set for the account before executing the call.                                          |
| code      | DATA   | (optional) Fake EVM bytecode to inject into the account before executing the call.                               |
| state     | Object | (optional) Fake key-value mapping to override all slots in the account storage before executing the call.        |
| stateDiff | Object | (optional) Fake key-value mapping to override individual slots in the account storage before executing the call. |

The goal of the state override set is manyfold:

* It can be used by DApps to reduce the amount of contract code needed to be deployed on chain. Code that simply returns internal state or does pre-defined validations can be kept off chain and fed to the node on-demand.
* It can be used for smart contract analysis by extending the code deployed on chain with custom methods and invoking them. This avoids having to download and reconstruct the entire state in a sandbox to run custom code against.
* It can be used to debug smart contracts in an already deployed large suite of contracts by selectively overriding some code or state and seeing how execution changes. Specialized tooling will probably be necessary.

**Example - stateOverrideSet**

```json
{
  "0xd9c9cd5f6779558b6e0ed4e6acf6b1947e7fa1f3": {
    "balance": "0xde0b6b3a7640000"
  },
  "0xebe8efa441b9302a0d7eaecc277c09d20d684540": {
    "code": "0x...",
    "state": {
      "0ccfa7da0b3522161999fd723e497b1a3556598653325c2fe7f0b2a98c9d6aae": "c70447ca5ce4344e32ae8234c5e70a446e26b39a5b636b502983ea7a555ab21c"
    }
  }
}
```

**예시**

To test call in meaningful way, you need to setup test environment like below.

* Deploy KIP-7 Contract to test call or you can use it with already deployed one.
  * We will use KIP-7 contract function `totalSupply` to check whether call is working or not in this example.
  * To call `totalSupply` you should know about its function signature which is `0x18160ddd`.

In this example:

* The address of KIP-7 contract: `0xbE3892d33620bE5aca8c75D39e7401871194d290` (You should use an existing contract address.)
* The address of caller: `0xca7a99380131e6c76cfa622396347107aeedca2d`

```shell
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0", "method": "eth_call", "params": [{"from": "0xca7a99380131e6c76cfa622396347107aeedca2d", "to": "0xbE3892d33620bE5aca8c75D39e7401871194d290", "data": "0x18160ddd"}, "latest"], "id": 1}' http://localhost:8551

{"jsonrpc":"2.0","id":1,"result":"0x0000000000000000000000000000000000000000000000000de0b6b3a7640000"}
```

**Example - StateOverrides**

Following the example above, let's test call using state overrides feature.

* We will replace the bytecode of `0xbE3892d33620bE5aca8c75D39e7401871194d290` which is the address of KIP-7 contract already deployed above (Check the above example).
* The bytecode to be replaced is `6080604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680632e64cec114604e5780636057361d146076575b600080fd5b348015605957600080fd5b50606060a0565b6040518082815260200191505060405180910390f35b348015608157600080fd5b50609e6004803603810190808035906020019092919050505060a9565b005b60008054905090565b80600081905550505600a165627a7a723058207783dba41884f73679e167576362b7277f88458815141651f48ca38c25b498f80029` .
  * The original source code of this bytecode is below.

```solidity
pragma solidity ^0.4.24;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 */
contract Storage {

    uint256 number;

    /**
     * @dev Store value in variable
     * @param num value to store
     */
    function store(uint256 num) public {
        number = num;
    }

    /**
     * @dev Return value 
     * @return value of 'number'
     */
    function retrieve() public view returns (uint256){
        return number;
    }
}
```

Now let's override the state of `0xbE3892d33620bE5aca8c75D39e7401871194d290` (KIP-7 contract) with another contract's byte code (Storage contract) and call `retrieve` (function signature: `0x2e64cec1`) of Storage contract.

```shell
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0", "method": "eth_call", "params": [{"from": "0xca7a99380131e6c76cfa622396347107aeedca2d", "to": "0xbE3892d33620bE5aca8c75D39e7401871194d290", "data": "0x2e64cec1"}, "latest", {"0xbE3892d33620bE5aca8c75D39e7401871194d290": {"code":"0x6080604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680632e64cec114604e5780636057361d146076575b600080fd5b348015605957600080fd5b50606060a0565b6040518082815260200191505060405180910390f35b348015608157600080fd5b50609e6004803603810190808035906020019092919050505060a9565b005b60008054905090565b80600081905550505600a165627a7a723058207783dba41884f73679e167576362b7277f88458815141651f48ca38c25b498f80029"}}], "id": 1}' http://localhost:8551

{"jsonrpc":"2.0","id":1,"result":"0x0000000000000000000000000000000000000000000000000000000000000000"}
```

## eth_estimateGas <a id="eth_estimategas"></a>

트랜잭션 실행을 완료하는 데에 필요한 가스양의 추정치를 생성하여 반환합니다. The transaction will not be added to the blockchain. Note that the estimate may be significantly more than the amount of gas actually used by the transaction, for a variety of reasons including EVM mechanics and node performance.

**Parameters**

| 이름         | 타입     | 설명                                   |
| ---------- | ------ | ------------------------------------ |
| callObject | Object | 트랜잭션 호출 객체입니다. 객체 속성은 다음의 표를 참고해주세요. |

`callObject`에는 다음의 속성이 있습니다.

| 이름    | 타입            | 설명                                                                                                                                                                |
| ----- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from  | 20바이트 크기 DATA | (optional) Address the transaction is simulated to have been sent from. The `0x00..0` address is used if no address is specified.                                 |
| to    | 20바이트 크기 DATA | (optional) Address the transaction is sent to.                                                                                                                    |
| gas   | QUANTITY      | (optional) Maximum gas allowance for the code execution to avoid infinite loops. Defaults to 2^63 or whatever value the node operator specified via --rpc.gascap. |
| 가스 가격 | QUANTITY      | (optional) Number of `peb` to simulate paying for each unit of gas during execution. Defaults to `0` peb.                                                         |
| value | QUANTITY      | (optional) Amount of `peb` to simulate sending along with the transaction. Defaults to `0`.                                                                       |
| 데이터   | DATA          | (optional) Hash of the method signature and encoded parameter.                                                                                                    |

**Example - callObject**

```json
{
  "from": "0xd9c9cd5f6779558b6e0ed4e6acf6b1947e7fa1f3",
  "to": "0xebe8efa441b9302a0d7eaecc277c09d20d684540",
  "gas": "0x1bd7c",
  "data": "0xd459fc46000000000000000000000000000000000000000000000000000000000046c650dbb5e8cb2bac4d2ed0b1e6475d37361157738801c494ca482f96527eb48f9eec488c2eba92d31baeccfb6968fad5c21a3df93181b43b4cf253b4d572b64172ef000000000000000000000000000000000000000000000000000000000000008c00000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000001a00000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000001c000000000000000000000000000000000000000000000000000000000000001c0000000000000000000000000000000000000000000000000000000000000002b85c0c828d7a98633b4e1b65eac0c017502da909420aeade9a280675013df36bdc71cffdf420cef3d24ba4b3f9b980bfbb26bd5e2dcf7795b3519a3fd22ffbb2000000000000000000000000000000000000000000000000000000000000000238fb6606dc2b5e42d00c653372c153da8560de77bd9afaba94b4ab6e4aa11d565d858c761320dbf23a94018d843772349bd9d92301b0ca9ca983a22d86a70628"
}
```

**리턴값**

| 타입       | 설명          |
| -------- | ----------- |
| QUANTITY | 사용된 가스양입니다. |

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "klay_estimateGas", "params": [{"from": "0x3f71029af4e252b25b9ab999f77182f0cd3bc085", "to": "0x87ac99835e67168d4f9a40580f8f5c33550ba88b", "gas": "0x100000", "gasPrice": "0x5d21dba00", "value": "0x0", "data": "0x8ada066e"}], "id": 1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0","id":1,
  "result": "0x5208" // 21000
}
```

## eth_getTransactionByBlockHashAndIndex <a id="eth_gettransactionbyblockhashandindex"></a>

블록 해시와 트랜잭션 인덱스 위치로 조회한 트랜잭션의 정보를 반환합니다.

Please check the [Caution-Transaction](./caution.md#transaction) before using this API.

**Parameters**

| 타입            | 설명                    |
| ------------- | --------------------- |
| 32바이트 크기 DATA | 블록의 해시입니다.            |
| QUANTITY      | 트랜잭션의 인덱스 위치의 정숫값입니다. |

**리턴값**

See [eth_getTransactionByHash](#eth_gettransactionbyhash)

**예시**

To see examples of various transaction types, check [eth_getTransactionByHash](#eth_gettransactionbyhash)

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

블록 번호와 트랜잭션 인덱스 위치로 조회한 트랜잭션의 정보를 반환합니다.

Please check the [Caution-Transaction](./caution.md#transaction) before using this API.

**Parameters**

| 타입                  | 설명                                                                                                                                            |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| QUANTITY &#124; TAG | 정수 또는 16진수 형태의 블록 번호 또는 [기본 블록 매개변수](./block.md#the-default-block-parameter)에서와 같이 `"earliest"`, `"latest"`, `"pending"`과 같이 상태를 나타내는 문자열입니다. |
| QUANTITY            | 트랜잭션의 인덱스 위치입니다.                                                                                                                              |

**리턴값**

See [eth_getTransactionByHash](#eth_gettransactionbyhash)

**예시**

To see examples of various transaction types, check [eth_getTransactionByHash](#eth_gettransactionbyhash)

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

트랜잭션 해시로 조회한 트랜잭션의 정보를 반환합니다.

Please check the [Caution-Transaction](./caution.md#transaction) before using this API.

**Parameters**

| 타입            | 설명          |
| ------------- | ----------- |
| 32바이트 크기 DATA | 트랜잭션 해시입니다. |

**리턴값**

Fields of transaction can be different based on transaction types. Currently, there are three types of transactions in Ethereum(Legacy, [AccessList](https://eips.ethereum.org/EIPS/eip-2930) , [DynamicFee](https://eips.ethereum.org/EIPS/eip-1559)).

`객체` - 트랜잭션 객체를 반환하거나 또는 해당하는 트랜잭션을 찾을 수 없는 경우 `null`을 반환합니다.

**기본 트랜잭션**

| 이름               | 타입            | 설명                                                   |
| ---------------- | ------------- | ---------------------------------------------------- |
| blockHash        | 32바이트 크기 DATA | 트랜잭션이 담긴 블록의 해시입니다. 보류 중인 상태이면 `null`을 반환합니다.        |
| blockNumber      | QUANTITY      | 트랜잭션이 담긴 블록의 번호입니다. 보류 중인 상태이면 `null`을 반환합니다.        |
| from             | 20바이트 크기 DATA | 트랜잭션 발신자의 주소입니다.                                     |
| gas              | QUANTITY      | 트랜잭션 발신자에 의해 설정된 가스양입니다.                             |
| 가스 가격            | QUANTITY      | peb에서 트랜잭션 발신자에 의해 설정된 가스 가격입니다.                     |
| 해시               | 32바이트 크기 DATA | 트랜잭션의 해시입니다.                                         |
| input            | DATA          | 트랜잭션과 함께 전송된 데이터입니다.                                 |
| 논스               | QUANTITY      | 트랜잭션 발신자가 이 트랜잭션 이전까지 전송했던 트랜잭션의 개수입니다.              |
| to               | 20바이트 크기 DATA | 트랜잭션 수신자의 주소입니다. 컨트랙트 생성 트랜잭션이면 `null`을 반환합니다.       |
| value            | QUANTITY      | Integer of values sent with this transaction.        |
| transactionIndex | QUANTITY      | 블록 내 트랜잭션의 인덱스 위치의 정숫값입니다. 보류 중인 상태이면 `null`을 반환합니다. |
| 형식               | QUANTITY      | 트랜잭션의 유형을 나타내는 정수입니다.                                |
| v                | QUANTITY      | ECDSA 리커버리 id.                                       |
| r                | 32바이트 크기 DATA | ECDSA 서명 r.                                          |
| s                | 32바이트 크기 DATA | ECDSA 서명 s.                                          |

**Example - Legacy Transaction**

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

**AccessList Transaction**

| 이름               | 타입            | 설명                                                                 |
| ---------------- | ------------- | ------------------------------------------------------------------ |
| blockHash        | 32바이트 크기 DATA | 트랜잭션이 담긴 블록의 해시입니다. 보류 중인 상태이면 `null`을 반환합니다.                      |
| blockNumber      | QUANTITY      | 트랜잭션이 담긴 블록의 번호입니다. 보류 중인 상태이면 `null`을 반환합니다.                      |
| from             | 20바이트 크기 DATA | 트랜잭션 발신자의 주소입니다.                                                   |
| gas              | QUANTITY      | 트랜잭션 발신자에 의해 설정된 가스양입니다.                                           |
| 가스 가격            | QUANTITY      | peb에서 트랜잭션 발신자에 의해 설정된 가스 가격입니다.                                   |
| 해시               | 32바이트 크기 DATA | 트랜잭션의 해시입니다.                                                       |
| input            | DATA          | 트랜잭션과 함께 전송된 데이터입니다.                                               |
| 논스               | QUANTITY      | 트랜잭션 발신자가 이 트랜잭션 이전까지 전송했던 트랜잭션의 개수입니다.                            |
| to               | 20바이트 크기 DATA | 트랜잭션 수신자의 주소입니다. 컨트랙트 생성 트랜잭션이면 `null`을 반환합니다.                     |
| value            | QUANTITY      | Integer of values sent with this transaction.                      |
| transactionIndex | QUANTITY      | 블록 내 트랜잭션의 인덱스 위치의 정숫값입니다. 보류 중인 상태이면 `null`을 반환합니다.               |
| 형식               | QUANTITY      | 트랜잭션의 유형을 나타내는 정수입니다.                                              |
| accessList       | Array         | An array of [accessList](https://eips.ethereum.org/EIPS/eip-2930). |
| chainId          | QUANTITY      | Chain id set on the requested node.                                |
| v                | QUANTITY      | ECDSA 리커버리 id.                                                     |
| r                | 32바이트 크기 DATA | ECDSA 서명 r.                                                        |
| s                | 32바이트 크기 DATA | ECDSA 서명 s.                                                        |

**Example - AccessList Transaction**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0xfe134fa592b5acdd353fc3c25c3ba9979b8582fee3e5ac9740f418813b405038"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x12bb73d1bfd0b8ec005839acc69926d5699005c7738455848b3438a549457457",
    "blockNumber": "0x3c",
    "from": "0x3753f5bf8cca929eeeb4b74f200dfc6375ad5444",
    "gas": "0x52080",
    "gasPrice": "0x99999",
    "hash": "0xfe134fa592b5acdd353fc3c25c3ba9979b8582fee3e5ac9740f418813b405038",
    "input": "0x",
    "nonce": "0x3",
    "to": "0xca7a99380131e6c76cfa622396347107aeedca2d",
    "transactionIndex": "0x0",
    "value": "0x1",
    "type": "0x1",
    "accessList": [
      {
        "address": "0xca7a99380131e6c76cfa622396347107aeedca2d",
        "storageKeys": [
          "0x0709c257577296fac29c739dad24e55b70a260497283cf9885ab67b4daa9b67f"
        ]
      }
    ],
    "chainId": "0x2edaf",
    "v": "0x0",
    "r": "0x7c2568b6970bc2a87f828ef10dbd83057369cb62cf7c9e2b21357f04c3685cf0",
    "s": "0x21a32ce836b06acadcf507748909e5d7efaf49825b6eafff583b1e751e0cd306"
  }
}
```

**DynamicFee Transaction**

| 이름                   | 타입            | 설명                                                                 |
| -------------------- | ------------- | ------------------------------------------------------------------ |
| blockHash            | 32바이트 크기 DATA | 트랜잭션이 담긴 블록의 해시입니다. 보류 중인 상태이면 `null`을 반환합니다.                      |
| blockNumber          | QUANTITY      | 트랜잭션이 담긴 블록의 번호입니다. 보류 중인 상태이면 `null`을 반환합니다.                      |
| from                 | 20바이트 크기 DATA | 트랜잭션 발신자의 주소입니다.                                                   |
| gas                  | QUANTITY      | 트랜잭션 발신자에 의해 설정된 가스양입니다.                                           |
| 가스 가격                | QUANTITY      | peb에서 트랜잭션 발신자에 의해 설정된 가스 가격입니다.                                   |
| maxFeePerGas         | QUANTITY      | A maximum amount to pay for the transaction to execute.            |
| maxPriorityFeePerGas | QUANTITY      | Gas tip cap for dynamic fee transaction in peb.                    |
| 해시                   | 32바이트 크기 DATA | 트랜잭션의 해시입니다.                                                       |
| input                | DATA          | 트랜잭션과 함께 전송된 데이터입니다.                                               |
| 논스                   | QUANTITY      | 트랜잭션 발신자가 이 트랜잭션 이전까지 전송했던 트랜잭션의 개수입니다.                            |
| to                   | 20바이트 크기 DATA | 트랜잭션 수신자의 주소입니다. 컨트랙트 생성 트랜잭션이면 `null`을 반환합니다.                     |
| value                | QUANTITY      | Integer of values sent with this transaction.                      |
| transactionIndex     | QUANTITY      | 블록 내 트랜잭션의 인덱스 위치의 정숫값입니다. 보류 중인 상태이면 `null`을 반환합니다.               |
| 형식                   | QUANTITY      | 트랜잭션의 유형을 나타내는 정수입니다.                                              |
| accessList           | Array         | An array of [accessList](https://eips.ethereum.org/EIPS/eip-2930). |
| chainId              | QUANTITY      | Chain id set on the requested node.                                |
| v                    | QUANTITY      | ECDSA 리커버리 id.                                                     |
| r                    | 32바이트 크기 DATA | ECDSA 서명 r.                                                        |
| s                    | 32바이트 크기 DATA | ECDSA 서명 s.                                                        |

**Example - DynamicFee Transaction**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0x40e64aac79b2e51b05d41adc005e45d4618ad5e8783f8fac9e3af63b4f6cf27d"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x2228ad3dd7588af51060adbdd6b4ac8c50ef91d59bea5399b2fa439138720886",
    "blockNumber": "0x4a",
    "from": "0x3753f5bf8cca929eeeb4b74f200dfc6375ad5444",
    "gas": "0x52080",
    "gasPrice": "0xa6528",
    "maxFeePerGas": "0xb6adf",
    "maxPriorityFeePerGas": "0x99999",
    "hash": "0x40e64aac79b2e51b05d41adc005e45d4618ad5e8783f8fac9e3af63b4f6cf27d",
    "input": "0x",
    "nonce": "0x4",
    "to": "0xca7a99380131e6c76cfa622396347107aeedca2d",
    "transactionIndex": "0x0",
    "value": "0x1",
    "type": "0x2",
    "accessList": [
      {
        "address": "0xca7a99380131e6c76cfa622396347107aeedca2d",
        "storageKeys": [
          "0x0709c257577296fac29c739dad24e55b70a260497283cf9885ab67b4daa9b67f"
        ]
      }
    ],
    "chainId": "0x2edaf",
    "v": "0x0",
    "r": "0xf7de95e3d4893cdb53c88fd5f7ec37a32df24da6a390259e470a5192cbefba46",
    "s": "0x2ba8cecb1332088ffc017cd9a08e613dabc306d16e593a42cda6f57def901292"
  }
}
```

## eth_getTransactionReceipt <a id="eth_gettransactionreceipt"></a>

트랜잭션 해시로 조회한 트랜잭션의 영수증을 반환합니다.

**참고**: 보류 상태의 트랜잭션은 영수증을 확인할 수 없습니다.

Please check the [Caution-TransactionReceipt](./caution.md#transaction_receipt) before using this API.

**Parameters**

| 이름 | 타입            | 설명          |
| -- | ------------- | ----------- |
| 해시 | 32바이트 크기 DATA | 트랜잭션 해시입니다. |

**리턴값**

`객체` - 트랜잭션 영수증 객체를 반환하거나 또는 해당하는 트랜잭션 영수증을 찾을 수 없는 경우 `null`을 반환합니다.

| 이름                | 타입             | 설명                                                                                                                                                                                                                        |
| ----------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockHash         | 32바이트 크기 DATA  | 트랜잭션이 담긴 블록의 해시입니다.                                                                                                                                                                                                       |
| blockNumber       | QUANTITY       | 트랜잭션이 담긴 블록의 번호입니다.                                                                                                                                                                                                       |
| contractAddress   | DATA           | 컨트랙트 생성 트랜잭션이면 생성된 컨트랙트의 주소를 반환합니다. 컨트랙트 생성 트랜잭션이 아닌 경우 `null`을 반환합니다.                                                                                                                                                    |
| cumulativeGasUsed | QUANTITY       | The total amount of gas used when this transaction was executed in the block.                                                                                                                                             |
| effectiveGasPrice | QUANTITY       | The actual value per gas deducted from the senders account. Before EIP-1559, this is equal to the transaction's gas price. After, it is equal to baseFeePerGas + min(maxFeePerGas - baseFeePerGas, maxPriorityFeePerGas). |
| from              | 20바이트 크기 DATA  | 트랜잭션 발신자의 주소입니다.                                                                                                                                                                                                          |
| 로그                | Array          | 이 트랜잭션이 발생시킨 로그 객체들의 배열입니다.                                                                                                                                                                                               |
| logsBloom         | 256바이트 크기 DATA | 라이트 클라이언트가 관련된 로그를 빠르게 검색할 수 있도록 하는 블룸필터입니다.                                                                                                                                                                              |
| 상태                | QUANTITY       | `1` (성공) 또는 `0` (실패)를 나타냅니다.                                                                                                                                                                                              |
| to                | 20바이트 크기 DATA  | 트랜잭션 수신자의 주소입니다. 컨트랙트 생성 트랜잭션이면 `null`을 반환합니다.                                                                                                                                                                            |
| transactionHash   | 32바이트 크기 DATA  | 트랜잭션의 해시입니다.                                                                                                                                                                                                              |
| transactionIndex  | QUANTITY       | 블록 내 트랜잭션의 인덱스 위치의 정숫값입니다.                                                                                                                                                                                                |
| 형식                | QUANTITY       | 트랜잭션의 유형을 나타내는 정수입니다.                                                                                                                                                                                                     |

**예시**

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

새 메시지 호출 트랜잭션을 생성하거나 또는 서명된 트랜잭션을 입력으로 받으면 컨트랙트를 생성합니다.

**Parameters**

| 타입   | 설명               |
| ---- | ---------------- |
| DATA | 서명된 트랜잭션 데이터입니다. |

**리턴값**

| 타입            | 설명                                                     |
| ------------- | ------------------------------------------------------ |
| 32바이트 크기 DATA | 트랜잭션 해시를 반환하거나 또는 해당 트랜잭션을 아직 사용할 수 없는 경우 0 해시를 반환합니다. |

If you deployed a contract, use [eth_getTransactionReceipt](#eth_gettransactionreceipt) to get the contract address.

**예시**

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

Constructs a transaction with given parameters, signs the transaction with a sender's private key and propagates the transaction to Klaytn network.

**참고**: 서명하려는 계정은 잠금 해제되어 있어야 합니다.

**Parameters**:

| 이름              | 타입     | 설명                                                                                   |
| --------------- | ------ | ------------------------------------------------------------------------------------ |
| transactionArgs | Object | An object of transaction arguments. See the table below for the object's properties. |

`transactionArgs` has the following properties:

| 이름                   | 타입            | 설명                                                                                                                                                                           |
| -------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from                 | 20바이트 크기 DATA | 트랜잭션 발신자의 주소입니다.                                                                                                                                                             |
| to                   | 20바이트 크기 DATA | (not required when creating a new contract) The address to which the transaction is directed.                                                                                |
| gas                  | QUANTITY      | (optional) The integer of the gas provided for the transaction's execution. It will return unused gas.                                                                       |
| maxFeePerGas         | QUANTITY      | (optional, default: 250 ston) The maximum amount to pay for the transaction's execution. Since Klaytn uses a fixed gas price, it must be set to 250 ston (Gpeb in Ethereum). |
| maxPriorityFeePerGas | QUANTITY      | (optional, default: 250 ston) Gas tip cap for dynamic fee transaction in peb. Since Klaytn uses a fixed gas price, it must be set to 250 ston (Gpeb in Ethereum).            |
| 데이터                  | DATA          | (optional) The hash of the method signature and the encoded parameter.                                                                                                       |
| value                | QUANTITY      | (optional) The integer of values sent with this transaction.                                                                                                                 |
| 논스                   | QUANTITY      | (optional) The integer of a nonce.                                                                                                                                           |



**리턴값**

| 타입            | 설명                                                     |
| ------------- | ------------------------------------------------------ |
| 32바이트 크기 DATA | 트랜잭션 해시를 반환하거나 또는 해당 트랜잭션을 아직 사용할 수 없는 경우 0 해시를 반환합니다. |

If you deployed a contract, use [eth_getTransactionReceipt](#eth_gettransactionreceipt) to get the contract address.

**예시**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{"from": "0xca7a99380131e6c76cfa622396347107aeedca2d", "to": "0x8c9f4468ae04fb3d79c80f6eacf0e4e1dd21deee", "value": "0x1", "gas": "0x9999", "maxFeePerGas": "0x5d21dba00", "maxPriorityPerGas": "0x5d21dba00"}],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

## eth_signTransaction <a id="eth_signtransaction"></a>

Signs a transaction that can be submitted to the network at a later time using with eth_sendRawTransaction.

**참고**: 서명하려는 계정은 잠금 해제되어 있어야 합니다.

**Parameters**:

| 이름              | 타입     | 설명                                                                                   |
| --------------- | ------ | ------------------------------------------------------------------------------------ |
| transactionArgs | Object | An object of transaction arguments. See the table below for the object's properties. |

`transactionArgs` has the following properties:

| 이름                   | 타입            | 설명                                                                                                                                             |
| -------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| from                 | 20바이트 크기 DATA | 트랜잭션 발신자의 주소입니다.                                                                                                                               |
| to                   | 20바이트 크기 DATA | (not required when creating a new contract) The address to which the transaction is directed.                                                  |
| gas                  | QUANTITY      | The integer of the gas provided for the transaction's execution. It will return unused gas.                                                    |
| maxFeePerGas         | QUANTITY      | The maximum amount to pay for the transaction's execution. Since Klaytn uses a fixed gas price, it must be set to 250 ston (Gpeb in Ethereum). |
| maxPriorityFeePerGas | QUANTITY      | Gas tip cap for dynamic fee transaction in peb. Since Klaytn uses a fixed gas price, it must be set to 250 ston (Gpeb in Ethereum).            |
| 데이터                  | DATA          | (optional) The hash of the method signature and the encoded parameter.                                                                         |
| value                | QUANTITY      | (optional) The integer of values sent with this transaction.                                                                                   |
| 논스                   | QUANTITY      | The integer of a nonce.                                                                                                                        |

**리턴값**

`Object` - The signed transaction object.

| 이름  | 타입     | 설명                                                            |
| --- | ------ | ------------------------------------------------------------- |
| raw | DATA   | A `rawTransaction` string (a RLP-encoded transaction string). |
| tx  | Object | The transaction object. 객체 속성은 다음의 표를 참고해주세요.                 |

`tx` has the following properties:

| 이름                   | 타입            | 설명                                                                                              |
| -------------------- | ------------- | ----------------------------------------------------------------------------------------------- |
| 형식                   | QUANTITY      | 트랜잭션의 유형을 나타내는 정수입니다.                                                                           |
| 논스                   | QUANTITY      | 트랜잭션이 담긴 블록의 번호입니다.                                                                             |
| 가스 가격                | QUANTITY      | peb에서 트랜잭션 발신자에 의해 설정된 가스 가격입니다. `null` when it is not a legacy transaction.                    |
| maxFeePerGas         | QUANTITY      | A maximum amount to pay for the transaction to execute. `null` when it is a legacy transaction. |
| maxPriorityFeePerGas | QUANTITY      | Gas tip cap for dynamic fee transaction in peb. `null` when it is a legacy transaction.         |
| gas                  | QUANTITY      | 트랜잭션 발신자에 의해 설정된 가스양입니다.                                                                        |
| value                | QUANTITY      | Integer of values sent with this transaction.                                                   |
| v                    | QUANTITY      | ECDSA 리커버리 id.                                                                                  |
| r                    | 32바이트 크기 DATA | ECDSA 서명 r.                                                                                     |
| s                    | 32바이트 크기 DATA | ECDSA 서명 s.                                                                                     |
| chainId              | QUANTITY      | Chain id set on the requested node.                                                             |
| accessList           | Array         | An array of [accessList](https://eips.ethereum.org/EIPS/eip-2930).                              |
| 해시                   | 32바이트 크기 DATA | 트랜잭션의 해시입니다.                                                                                    |

**예시**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "raw": "0x02f86f8302edaf048505d21dba008505d21dba00829999948c9f4468ae04fb3d79c80f6eacf0e4e1dd21deee0180c001a0b6e16781d247b505aa8eaf363a6ea61e7c23c77ad64846ffda28e73e31304884a05a296904cd009506cb5ed006af016d2c5dab255966af9ba6f8fc352f75e9b079",
    "tx": {
      "type": "0x2",
      "nonce": "0x4",
      "gasPrice": null,
      "maxPriorityFeePerGas": "0x5d21dba00",
      "maxFeePerGas": "0x5d21dba00",
      "gas": "0x9999",
      "value": "0x1",
      "input": "0x",
      "v": "0x1",
      "r": "0xb6e16781d247b505aa8eaf363a6ea61e7c23c77ad64846ffda28e73e31304884",
      "s": "0x5a296904cd009506cb5ed006af016d2c5dab255966af9ba6f8fc352f75e9b079",
      "to": "0x8c9f4468ae04fb3d79c80f6eacf0e4e1dd21deee",
      "chainId": "0x2edaf",
      "accessList": [],
      "hash": "0x9cfbea4942b334050660ec7207f3323ee13e3196b06279f922404384acbf7b47"
    }
  }
}
```

## eth_fillTransaction <a id="eth_filltransaction"></a>

Fills the defaults (nonce, gas, gasPrice or 1559 fields) on a given unsigned transaction, and returns it to the caller for further processing (signing + broadcast).

**Parameters**:

Parameters are same with eth_sendTransaction. See [eth_sendtransaction](#eth_sendtransaction).

**Return value**

See [eth_signTransaction](#eth_signtransaction).

**예시**

```shell
// Request
curl http://localhost:8551 -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_fillTransaction", "params":[{"from": "0xca7a99380131e6c76cfa622396347107aeedca2d", "to": "0x8c9f4468ae04fb3d79c80f6eacf0e4e1dd21deee", "value": "0x1", "gas": "0x9999", "maxFeePerGas": "0x5d21dba00"}],"id":1}'

// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "raw": "0x02ef8302edaf808505d21dba008505d21dba00829999948c9f4468ae04fb3d79c80f6eacf0e4e1dd21deee0180c0808080",
    "tx": {
      "type": "0x2",
      "nonce": "0x0",
      "gasPrice": null,
      "maxPriorityFeePerGas": "0x5d21dba00",
      "maxFeePerGas": "0x5d21dba00",
      "gas": "0x9999",
      "value": "0x1",
      "input": "0x",
      "v": "0x0",
      "r": "0x0",
      "s": "0x0",
      "to": "0x8c9f4468ae04fb3d79c80f6eacf0e4e1dd21deee",
      "chainId": "0x2edaf",
      "accessList": [],
      "hash": "0x83e382bfb39249dc0e2b4283702bc1c0685deffad1316d166546da9c4c14c59d"
    }
  }
}
```

## eth_pendingTransactions <a id="eth_pendingtransactions"></a>

Returns the transactions that are in the transaction pool and have a from address that is one of the accounts this node manages.

**Parameters**:

없음

**Return value**

| 이름                  | 타입    | 설명                                                                                                             |
| ------------------- | ----- | -------------------------------------------------------------------------------------------------------------- |
| pendingTransactions | Array | An array of transactions. For the returned transaction object, See [eth_signTransaction](#eth_signtransaction) |

**예시**

```shell
// Request
curl http://localhost:8551 -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_pendingTransactions", "params":[],"id":1}'

// Result
{
  "jsonrpc": "2.0",
  "id": 39,
  "result": [
    {
      "blockHash": null,
      "blockNumber": null,
      "from": "0xca7a99380131e6c76cfa622396347107aeedca2d",
      "gas": "0x5208",
      "gasPrice": "0x5d21dba00",
      "maxFeePerGas": "0x5d21dba00",
      "maxPriorityFeePerGas": "0x5d21dba00",
      "hash": "0xb5cd867ccc356b86634092919fb1acf4e315618d6c804df3ec3d30d66b6baba5",
      "input": "0x",
      "nonce": "0xdb",
      "to": "0x3e2ac308cd78ac2fe162f9522deb2b56d9da9499",
      "transactionIndex": null,
      "value": "0x1",
      "type": "0x2",
      "accessList": [],
      "chainId": "0x2edaf",
      "v": "0x1",
      "r": "0x73992e7c3b9f6cd73176969efa8509d8e9ae0739e24b03d514508f8ef03f19ef",
      "s": "0x7035dd8639e82ea3ba922ff02e1f21f4cff92d0de33050934f5c70908d61e8c3"
    }
  ]
}
```
