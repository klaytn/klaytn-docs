## eth_coinbase <a id="eth_coinbase"></a>

クライアントのコインベースアドレスを返します。

**パラメータ**

なし

**戻り値**

| タイプ        | Description     |
| ---------- | --------------- |
| 20 バイトのデータ | 現在のコインベースのアドレス。 |

**例**

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

クライアントのイーサベースアドレスを返します。

**パラメータ**

なし

**戻り値**

| タイプ        | Description    |
| ---------- | -------------- |
| 20 バイトのデータ | 現在のイーサベースアドレス。 |

**例**

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


## eth_chainId <a id="eth_chainid"></a>

リクエストされたノードに現在の chainId セットを返します。

**パラメータ**

なし

**戻り値**

| タイプ | Description               |
| --- | ------------------------- |
| 品質  | 要求されたノードにチェーンIDがセットされました。 |

**例**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0x2019"
}
```


## eth_gasPrice <a id="eth_gasprice"></a>

ペブ内のガス当たりの現在の価格を返します。

**注**: このAPIはEthereumとは異なる動作をしており、 Ethereumのようにガス価格を提案するのではなく、Klaytnのガス価格を返します。

**パラメータ**

なし

**戻り値**

| タイプ | Description     |
| --- | --------------- |
| 品質  | ペブ内の現在のガス価格の整数。 |

**例**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0xAE9F7BCC00" // 250,000,000,000 peb = 250 ston (Gwei)
}
```
