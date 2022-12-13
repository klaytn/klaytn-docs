## デフォルトのブロックパラメータ <a id="the-default-block-parameter"></a>

  `eth` 名前空間で API リクエストを送信すると、ブロックの高さは `defaultBlock` パラメータによって決まります。

`defaultBlock` パラメータには、以下のオプションがあります。

- `HEX文字列` - 整数ブロック数
- `アーチスト/ジェネシスブロックの文字列 "firmaryest"`
- `String "latest"` - 最新の採掘ブロック用
- `文字列 "pending"` - 保留中の状態/トランザクション用


## eth_blockNumber <a id="eth_blocknumber"></a>

直近のブロックの数を返します。

**パラメータ**

なし

**戻り値**

| タイプ | Description                  |
| --- | ---------------------------- |
| 品質  | クライアントがオンになっている現在のブロック番号の整数。 |

**例**

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

ヘッダに関する情報を数値で返します。

この API を使用する前に、 [Caution-Header](./caution.md#block_header) を確認してください。

**パラメータ**

| タイプ                 | Description                                                                                                                                                   |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| QUANTITY &#124; Tag | Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"` as in the [default block parameter](#the-default-block-parameter). |

**戻り値**

[eth_getHeaderByHash](#eth_getheaderbyhash) を参照

**例**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getHeaderByNumber","params":["0x1b4"],"id":1}' http://localhost:8551
// Result
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "baseFeePerGas": "0x5d21dba00",
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

ヘッダーに関する情報をハッシュで返します。

この API を使用する前に [Caution-Header](./caution.md#block_header) を確認してください。

**パラメータ**

| タイプ       | Description |
| --------- | ----------- |
| 32バイトのデータ | ブロックのハッシュ。  |

**戻り値**

`Object` - ヘッダーが見つからなかった場合、ヘッダーオブジェクト、または `null`。 それ以外の場合は、エラーを返します。

| 名前               | タイプ        | Description                                       |
| ---------------- | ---------- | ------------------------------------------------- |
| baseFeePerGas    | 品質         | ガス1回あたりの基本料金。                                     |
| 難易度：             | 品質         | このブロックの難易度の整数。                                    |
| extraData        | データ        | このブロックの「追加データ」フィールド。                              |
| gasLimit         | 品質         | このブロックで許可される最大ガス。                                 |
| gasUsed          | 品質         | このブロック内のすべてのトランザクションによって使用された合計ガス。                |
| hash             | 32バイトのデータ  | ブロックのハッシュ。 `保留中のブロックの場合は null` です。                |
| logsBloom        | 256バイトのデータ | ブロックのログのブルームフィルタ。                                 |
| miner            | 20 バイトのデータ | 採掘報酬が与えられた受益者の住所。                                 |
| mixHash          | 32バイトのデータ  | 十分な量の計算がこのブロックで実行されている nonce と組み合わされたことを証明するハッシュ。 |
| nonce            | 8バイトのデータ   | 生成された作業証明のハッシュ。                                   |
| 数値               | 品質         | ブロック番号 `保留中のブロックの場合は null` です。                    |
| parentHash       | 32バイトのデータ  | 親ブロックのハッシュ。                                       |
| receiptsRoot     | 32バイトのデータ  | ブロックのレシートのルートは試してみました。                            |
| sha3Uncles       | 32バイトのデータ  | ブロック内の叔父のデータのSHA3。                                |
| サイズ              | 品質         | バイト単位のブロックサイズの整数。                                 |
| stateRoot        | 32バイトのデータ  | ブロックの最後の状態のルート。                                   |
| timestamp        | 品質         | Unixタイムスタンプ。ブロックがコールされたときのタイムスタンプ。                |
| totalDifficulty  | 品質         | 合計ブロックこのブロックまでチェーンのスコア。                           |
| transactionsRoot | 32バイトのデータ  | ブロックのトランザクションのルート。                                |

**例**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getHeaderByHash","params":["0xb8deae63002d2b6aa33247c8ef545383ee0fd2282ac9b49dbbb74114389ddb5c"],"id":1}' http://localhost:8551
// Result
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "baseFeePerGas": "0x5d21dba00",
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

ブロック番号でブロックに関する情報を返します。

このAPIを使用する前に、 [注意-ブロック](./caution.md#block) をご確認ください。

**パラメータ**

| タイプ                 | Description                                                                                                                                               |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| QUANTITY &#124; Tag | Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"` as in [default block parameter](#the-default-block-parameter). |
| Boolean             | `true` の場合、トランザクションのハッシュのみが `false` の場合、完全なトランザクションオブジェクトを返します。                                                                                           |


**戻り値**

参照 [eth_getBlockByHash](#eth_getblockbyhash)

**例**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0xd0054e", false],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "baseFeePerGas": "0x5d21dba00",
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

ハッシュでブロックに関する情報を返します。

このAPIを使用する前に、 [注意-ブロック](./caution.md#block) をご確認ください。

**パラメータ**

| タイプ       | Description                                                     |
| --------- | --------------------------------------------------------------- |
| 32バイトのデータ | ブロックのハッシュ。                                                      |
| Boolean   | `true` の場合、トランザクションのハッシュのみが `false` の場合、完全なトランザクションオブジェクトを返します。 |

**戻り値**

`Object` - ブロックが見つからない場合はブロックオブジェクト、 `null`。 それ以外の場合は、エラーを返します。

| 名前               | タイプ        | Description                                                    |
| ---------------- | ---------- | -------------------------------------------------------------- |
| baseFeePerGas    | 品質         | ガス1回あたりの基本料金。                                                  |
| 難易度：             | 品質         | このブロックの難易度の整数                                                  |
| extraData        | データ        | このブロックの「追加データ」フィールド。                                           |
| gasLimit         | 品質         | このブロックで許可される最大ガス。                                              |
| gasUsed          | 品質         | このブロック内のすべてのトランザクションによって使用された合計ガス。                             |
| hash             | 32バイトのデータ  | ブロックのハッシュ。 `保留中のブロックの場合は null` です。                             |
| logsBloom        | 256バイトのデータ | ブロックのログのブルームフィルタ。 `保留中のブロックの場合は null` です。                      |
| miner            | 20 バイトのデータ | 採掘報酬が与えられた受益者の住所。                                              |
| mixHash          | 32バイトのデータ  | 十分な量の計算がこのブロックで実行されている nonce と組み合わされたことを証明するハッシュ。              |
| nonce            | 8バイトのデータ   | 生成された作業証明のハッシュ。                                                |
| 数値               | 品質         | ブロック番号 `保留中のブロックの場合は null` です。                                 |
| parentHash       | 32バイトのデータ  | 親ブロックのハッシュ。                                                    |
| receiptsRoot     | 32バイトのデータ  | ブロックのレシートのルートは試してみました。                                         |
| sha3Uncles       | 32バイトのデータ  | ブロック内の叔父のデータのSHA3。                                             |
| サイズ              | 品質         | バイト単位のブロックサイズの整数。                                              |
| stateRoot        | 32バイトのデータ  | ブロックの最後の状態のルート。                                                |
| timestamp        | 品質         | Unixタイムスタンプ。ブロックがコールされたときのタイムスタンプ。                             |
| totalDifficulty  | 品質         | 合計ブロックこのブロックまでチェーンのスコア                                         |
| transactionsRoot | 32バイトのデータ  | ブロックのトランザクションのルート。                                             |
| 取引               | 行列         | トランザクションオブジェクトの配列、または最後に指定されたパラメータに応じて32バイトのトランザクションハッシュを行います。 |
| おじさんたち           | 行列         | 伯父のハッシュの配列。                                                    |

**例**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getBlockByHash","params":["0xb8deae63002d2b6aa33247c8ef545383ee0fd2282ac9b49dbbb74114389ddb5c", true],"id":1}' http://localhost:8551

// Result
{
   "jsonrpc":"2.0",
   "id":1,
   "result":{
      baseFeePerGas: "0x5d21dba00",
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


## eth_getUncleByBlockHashAndIndex <a id="eth_getunclebyblockhashandindex"></a>

ブロックの叔父に関する情報をハッシュと叔父の位置から返します。 Klaytn には叔父がいないため、常に `null` を返します。

**パラメータ**

| タイプ       | Description  |
| --------- | ------------ |
| 32バイトのデータ | ブロックのハッシュ。   |
| 品質        | 叔父のインデックス位置。 |

**戻り値** `null`

**例**
```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2. ","method":"eth_getUncleByBlockHashAndIndex","params":["0xb8deae63002d2b6aa33247c8ef545383ee0fd2282ac9b49dbbb74389ddb5c", "0x1"],"id":1}' http://localhost:8551 
 // Result

{
{
  "jsonrpc": "2.0",
  "id":1,
  "result": null
}
```


## eth_getUncleByBlockNumberAndIndex <a id="eth_getunclebyblocknumberandindex"></a>

ブロックの叔父についての情報を数値と叔父の位置で返します。 Klaytn には叔父がいないので、常に `null` を返します。

**パラメータ**

| タイプ                 | Description                                                                                                                                                       |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| QUANTITY &#124; Tag | Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"` as in [default block parameter](block.md#the-default-block-parameter). |
| 品質                  | 叔父のインデックス位置。                                                                                                                                                      |

**戻り値** `null`

**例**
```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2. ","method":"eth_getUncleByBlockNumberAndIndex","params":["0xe8", "0x1"],"id":1}' http://localhost:8551 
 // Result

{
{
  "jsonrpc": "2.0",
  "id":1,
  "result": null
}
```


## eth_getBlockTransactionCountByNumber <a id="eth_getblocktransactioncountbynumber"></a>

指定されたブロック番号に一致するブロック内のトランザクション数を返します。

**パラメータ**

| タイプ                 | Description                                                                                                                                                       |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| QUANTITY &#124; Tag | Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"` as in [default block parameter](block.md#the-default-block-parameter). |

**戻り値**

| タイプ | Description           |
| --- | --------------------- |
| 品質  | このブロック内のトランザクション数の整数。 |

**例**

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

指定されたハッシュに一致するブロックから、ブロック内のトランザクション数を返します。

**パラメータ**

| タイプ       | Description |
| --------- | ----------- |
| 32バイトのデータ | ブロックのハッシュ   |

**戻り値**

| タイプ | Description           |
| --- | --------------------- |
| 品質  | このブロック内のトランザクション数の整数。 |

**例**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0x0c11803ab36110db993e7520908b9ba9336cca2f2dcc9b6130c481a3cccdc2621"],"id":1} http://localhost:8551

//
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0x0"
}
```


## eth_getUncleCountByBlockNumber <a id="eth_getunclecountbyblocknumber"></a>

与えられたブロック番号に一致するブロックから、ブロック内の叔父の数を返します。 Klaytnには叔父がいないので、 `0x0`を返します。 一致するブロックがない場合は `null` を返します。

**パラメータ**

| タイプ                 | Description                                                                                                                                                       |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| QUANTITY &#124; Tag | Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"` as in [default block parameter](block.md#the-default-block-parameter). |

**戻り値**

| タイプ | Description                                        |
| --- | -------------------------------------------------- |
| 品質  | このブロック内のトランザクション数の整数。 一致するブロックがない場合は `null` を返します。 |

**例**

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

与えられたブロックハッシュに一致するブロックから、ブロック内の叔父の数を返します。 Klaytnには叔父がいないので、 `0x0`を返します。 一致するブロックがない場合は `null` を返します。

**パラメータ**

| タイプ       | Description |
| --------- | ----------- |
| 32バイトのデータ | ブロックのハッシュ   |

**戻り値**

| タイプ | Description                                        |
| --- | -------------------------------------------------- |
| 品質  | このブロック内のトランザクション数の整数。 一致するブロックがない場合は `null` を返します。 |

**例**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0x0c11803ab36110db993e7520908b9ba9336cca2f2dcc9b6130c481a3cccdc2621"],"id":1} http://localhost:8551

//
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0x0"
}
```




## eth_getStorageAt <a id="eth_getstorageat"></a>

指定されたアドレスの格納位置から値を返します。

**パラメータ**

| タイプ                             | Description                                                                                                                                                                      |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 20 バイトのデータ                      | ストレージのアドレス。                                                                                                                                                                      |
| 品質                              | ストレージ内の位置の整数。                                                                                                                                                                    |
| QUANTITY &#124; Tag &#124; Hash | Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"` as in [default block parameter](block.md#the-default-block-parameter), or block hash. |

**戻り値**

| タイプ | Description   |
| --- | ------------- |
| データ | このストレージの位置の値。 |

**例**

正しい位置を計算することは、取得するストレージによって異なります。 `0x295a70b2de5e3953354a6a8344e616ed314d7251` にアドレス `0x391694e7e0b0cce554cb130d723a9d27458f9298` でデプロイされる以下のコントラクトを考えてみましょう。

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

`pos0` の値を取得することは、まっすぐに進みます。

```shell
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' http://localhost:8551

{"jsonrpc":"2.0","id":1,"result":"1,"result":"0x0000000000000000000000000000004d2"}
```

マップの要素を取得するのは難しいです。 マップ内の要素の位置は、次のように計算されます。
```javascript
ケックケーキ(LeftPad32(key, 0), LeftPad32(map position, 0))
```

つまり、 `pos1["0x391694e7e0b0cce554cb130d723a9d27458f9298"]` 次の位置を計算する必要があります：
```javascript
kecchak(decodeHex("00000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000001"))
```
`klay` ライブラリに付属のKlaytnコンソールを使用して計算を行うことができます。
```javascript
> var key = "0000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000001"
undefined
> klay.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```
次に、ストレージを取得します。
```shell
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' http://localhost:8551

{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```


## eth_mining <a id="eth_mining"></a>

クライアントが新しいブロックを積極的にマイニングしている場合、 `true` を返します。

**注**: 現在、すべてのノードは、トランザクションを再送信するためにデフォルトでマイニングモードになっています。 実際の「マイニング」はコンセンサスノード(CNs)によってのみ実行されることに注意してください。

**パラメータ**

なし

**戻り値**

| タイプ     | Description                                   |
| ------- | --------------------------------------------- |
| Boolean | `true` クライアントがマイニングしている場合、そうでなければ `false` です。 |

**例**

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

同期ステータスまたは `false`のデータを持つオブジェクトを返します。

**パラメータ**

なし

**戻り値**

`Object|Boolean`、同期しない場合は `false` の状態データを持つオブジェクト。

| 名前            | タイプ | Description                                      |
| ------------- | --- | ------------------------------------------------ |
| startingBlock | 品質  | インポートを開始したブロック（同期がヘッドに達した後にのみリセットされます）。          |
| currentBlock  | 品質  | 現在のブロック、 `eth_blockNumber` と同じ。                  |
| highestBlock  | 品質  | 推定最高ブロック。                                        |
| pulledStates  | 品質  | 現在までに処理された状態項目の数。  同期モードが「高速」でない場合、ゼロが返されます。     |
| 既知の状態         | 品質  | プルする必要がある既知の状態エントリの数。  同期モードが「高速」でない場合、ゼロが返されます。 |

**例**

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



