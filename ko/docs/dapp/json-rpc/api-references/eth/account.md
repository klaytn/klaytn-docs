## eth_accounts <a id="eth_accounts"></a>

클라이언트가 소유한 계정의 주소 목록을 반환합니다.

**Parameters**

없음

**리턴값**

| 타입                  | 설명                         |
| ------------------- | -------------------------- |
| 20바이트 크기 DATA array | 클라이언트가 소유한 계정의 주소들을 반환합니다. |

**예시**

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

입력으로 받은 주소에 해당하는 계정의 잔액을 반환합니다.

**Parameters**

| 이름                   | 타입                              | 설명                                                                                                                                           |
| -------------------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| address              | 20바이트 크기 DATA                   | 잔액을 확인할 계정의 주소입니다.                                                                                                                           |
| block number 또는 hash | QUANTITY &#124; TAG &#124; HASH | 정수 형태의 블록 번호 또는 [기본 블록 매개변수](./block.md#the-default-block-parameter)나 블록 해시에서와 같이 `"earliest"`, `"latest"`, `"pending"`과 같이 상태를 나타내는 문자열입니다. |

**리턴값**

| 타입       | 설명                          |
| -------- | --------------------------- |
| QUANTITY | peb 단위 현재 잔액을 정수 형태로 반환합니다. |

**예시**

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

입력으로 받은 주소의 코드를 반환합니다.

**Parameters**

| 타입                              | 설명                                                                                                                                           |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| 20바이트 크기 DATA                   | 주소입니다.                                                                                                                                       |
| QUANTITY &#124; TAG &#124; HASH | 정수 형태의 블록 번호 또는 [기본 블록 매개변수](./block.md#the-default-block-parameter)나 블록 해시에서와 같이 `"earliest"`, `"latest"`, `"pending"`과 같이 상태를 나타내는 문자열입니다. |

**리턴값**

| 타입   | 설명                 |
| ---- | ------------------ |
| DATA | 입력으로 받은 주소의 코드입니다. |

**예시**

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

어떤 주소의 계정에서 *발신된* 트랜잭션의 개수를 반환합니다.

**Parameters**

| 타입                              | 설명                                                                                                                                           |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| 20바이트 크기 DATA                   | 주소입니다.                                                                                                                                       |
| QUANTITY &#124; TAG &#124; HASH | 정수 형태의 블록 번호 또는 [기본 블록 매개변수](./block.md#the-default-block-parameter)나 블록 해시에서와 같이 `"earliest"`, `"latest"`, `"pending"`과 같이 상태를 나타내는 문자열입니다. |

**리턴값**

| 타입       | 설명                                       |
| -------- | ---------------------------------------- |
| QUANTITY | 입력으로 받은 주소에서 발신한 트랜잭션의 개수를 정수 형태로 반환합니다. |

**예시**

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

sign 메서드는 다음을 사용하여 Klaytn만의 서명을 계산합니다.
```
sign(keccak256("\x19Klaytn Signed Message:\n" + len(message) + message)))
```

메시지에 접두사를 붙이면 계산된 서명 값이 Klaytn의 서명임을 알 수 있습니다. This prevents misuse where a malicious dApp signs arbitrary data (e.g. transaction) and uses the signature for impersonation.

**참고**: 서명하려는 계정은 잠금 해제되어 있어야 합니다.

**Parameters**

| 이름      | 타입             | 설명            |
| ------- | -------------- | ------------- |
| account | 20바이트 크기 DATA  | 주소입니다.        |
| 메시지     | N 바이트 크기의 DATA | 서명하려는 메시지입니다. |

**리턴값**

| 타입   | 설명       |
| ---- | -------- |
| DATA | 서명 값입니다. |

**예시**

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