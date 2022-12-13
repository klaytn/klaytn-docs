## ハッシュレート <a id="eth_hashrate"></a>

ノードが採掘している1秒あたりのハッシュ数を返します。

Klaytn には PoW メカニズムがないため、常に `0x0` を返すことに注意してください。

**パラメータ**

なし

**戻り値**

| タイプ | Description |
| --- | ----------- |
| 品質  | 毎秒のハッシュ数。   |

**例**

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

## eth_getHashrate <a id="eth_gethashrate"></a>

ノードが採掘している1秒あたりのハッシュ数を返します。

Klaytn には PoW メカニズムがないため、常に `0 0` を返すことに注意してください。

**パラメータ**

なし

**戻り値**

| タイプ | Description |
| --- | ----------- |
| 品質  | 毎秒のハッシュ数。   |

**例**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getHashrate","params":[],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": 0
}
``

## eth_getWork <a id="eth_getwork"></a>

Returns the hash of the current block, the seedHash, and the boundary condition to be met ("target").

KlaytnにPoWメカニズムがないため、常に `errNoMiningWork`を返すことに注意してください。

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

作業証明ソリューションの送信に使用されます。

Klaytn には PoW メカニズムがないため、常に `false` を返すことに注意してください。

**パラメータ**

| タイプ       | Description           |
| --------- | --------------------- |
| 8バイトのデータ  | nonce found (64 bits) |
| 32バイトのデータ | ヘッダのpow-hash（256ビット）  |
| 32バイトのデータ | ミックスダイジェスト（256ビット）    |

**戻り値**

| タイプ     | Description                                        |
| ------- | -------------------------------------------------- |
| Boolean | 与えられたソリューションが有効な場合は true を返し、それ以外の場合は false を返します。 |

**例**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_submitWork","params":["0x0000000000000001", "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef", "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": false
}
```


## eth_submitHashrate <a id="eth_submithashrate"></a>

マイニングハッシュレートの送信に使用します。

Klaytn には PoW メカニズムがないため、常に `false` を返すことに注意してください。

**パラメータ**

| 名前      | タイプ       | Description                    |
| ------- | --------- | ------------------------------ |
| ハッシュレート | 32バイトのデータ | ハッシュレートの16進数文字列表現(32バイト)。      |
| id      | 32バイトのデータ | クライアントを識別するランダムな16進数(32バイト)ID。 |

**戻り値**

| タイプ     | Description                                  |
| ------- | -------------------------------------------- |
| Boolean | 送信が正常に行われた場合は true を返し、それ以外の場合は false を返します。 |

**例**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2. ","method":"eth_submithashrate","params":["0x5", "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"],"id":1}' http://localhost:8551 
 // Result

{
{
  "jsonrpc": "2.0",
  "id":1,
  "result": false
}
```


