## eth_accounts <a id="eth_accounts"></a>

クライアントが所有するアドレスのリストを返します。

**Parameters**

None

**Return Value**

| Type         | Description      |
| ------------ | ---------------- |
| 20 バイトデータの配列 | クライアントが所有するアドレス。 |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": [0xc94770007dda54cF92009FFB0dE90c06F603a09f"]
}
```


## eth_getBalance <a id="eth_getbalance"></a>

指定されたアドレスのアカウントの残高を返します。

**Parameters**

| Name                 | Type                            | Description                                                                                                                                        |
| -------------------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| address              | 20-byte DATA                    | 残高を確認するアドレス。                                                                                                                                       |
| block number or hash | QUANTITY &#124; TAG &#124; HASH | 整数または16進ブロック番号、または文字列 `"forest"`、 ` "latest" ` または `"pending"` `"pending"` [既定のブロックパラメータ](./block.md#the-default-block-parameter)、またはブロックハッシュのように。 |

**Return Value**

| Type | Description  |
| ---- | ------------ |
| 品質   | ペブの現在の残高の整数。 |

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

指定されたアドレスのコードを返します。

**Parameters**

| Type                            | Description                                                                                                                                                                            |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 20-byte DATA                    | 住所                                                                                                                                                                                     |
| QUANTITY &#124; TAG &#124; HASH | Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"` as in the [default block parameter](./block.md#the-default-block-parameter), or block hash. |

**Return Value**

| Type | Description      |
| ---- | ---------------- |
| データ  | 指定されたアドレスからのコード。 |

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

アドレスから ** を送信したトランザクション数を返します。

**Parameters**

| Type                            | Description                                                                                                                                                                            |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 20-byte DATA                    | Address                                                                                                                                                                                |
| QUANTITY &#124; TAG &#124; HASH | Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"` as in the [default block parameter](./block.md#the-default-block-parameter), or block hash. |

**Return Value**

| Type     | Description                |
| -------- | -------------------------- |
| QUANTITY | このアドレスから送信されるトランザクション数の整数。 |

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

signメソッドは、Klaytn固有の署名を次のように計算します。
```
sign(kecchak256("\x19Klaytn Signed Message:\n" + len(message) + message)))
```

メッセージにプレフィックスを追加すると、計算された署名が Klaytn 固有の署名として認識可能になります。 これにより、悪意のあるdAppが任意のデータ (トランザクションなど) に署名し、偽装のために署名を使用する場合の誤用を防ぎます。

**注**: 署名するアドレスのロックを解除する必要があります。

**Parameters**

| Name    | Type         | Description |
| ------- | ------------ | ----------- |
| アカウント   | 20-byte DATA | Address     |
| message | Nバイトのデータ     | 署名するメッセージ   |

**Return Value**

| Type | Description |
| ---- | ----------- |
| DATA | 署名          |

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