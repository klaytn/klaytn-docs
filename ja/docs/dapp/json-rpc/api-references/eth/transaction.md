## eth_call <a id="eth_call"></a>

ブロックチェーン上でトランザクションを作成せずに、すぐに新しいメッセージ呼び出しを実行します。 The eth_call method can be used to query internal contract state, to execute validations coded into a contract or even to test what the effect of a transaction would be without running it live.

**パラメータ**

| 名前               | タイプ                 | Description                                                                                                                                                                                                          |
| ---------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| callObject       | Object              | トランザクションコールオブジェクト。 オブジェクトのプロパティについては次の表を参照してください。                                                                                                                                                                    |
| blockNumberOrTag | QUANTITY &#124; Tag | Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"` as in [default block parameter](./block.md#the-default-block-parameter). ブロック番号は必須であり、指定されたトランザクションを実行するコンテキスト(状態)を定義します。 |
| stateOverrideSet | Object              | ステートオーバーライドセットはオプションの address-to-state マッピングで、各エントリは呼び出しを実行する前に一時的にオーバーライドされる状態を指定します。                                                                                                                               |

`callObject` には以下のプロパティがあります。

| 名前       | タイプ        | Description                                                                              |
| -------- | ---------- | ---------------------------------------------------------------------------------------- |
| from     | 20 バイトのデータ | (オプション) トランザクションが送信されるようにシミュレートされます。 アドレスが指定されていない場合、 `0x00..0` アドレスが使用されます。             |
| to       | 20 バイトのデータ | (オプション) トランザクションが送信されるアドレス。                                                              |
| ガス       | 品質         | (オプション) 無限ループを回避するためのコード実行の最大ガス許容量。 デフォルトでは 2^63 か、--rpc.gascapで指定されたノード演算子の値です。         |
| gasPrice | 品質         | (オプション) 実行中のガス単位ごとの支払いをシミュレートする `ペブ` の数。 デフォルトは `0` peb です。                              |
| 値        | 品質         | (オプション) トランザクションとともに送信をシミュレートするための `peb` の量。 デフォルトは `0` です。                              |
| input    | データ        | (オプション) メソッド署名とエンコードされたパラメータのハッシュ。 `data` フィールドを置き換えますが、'data' フィールドは後方互換性のためサポートされています。 |

**例 - callObject**

```json
{
  "from": "0xd9c9cd5f6779558b6e0ed4e6acf6b1947e7fa1f3",
  "to": "0xebe8efa441b9302a0d7eaecc277c09d20d684540",
  "gas": "0x1bd7c",
  "input": "0xd459fc46000000000000000000000000000000000000000000000000000000000046c650dbb5e8cb2bac4d2ed0b1e6475d37361157738801c494ca482f96527eb48f9eec488c2eba92d31baeccfb6968fad5c21a3df93181b43b4cf253b4d572b64172ef000000000000000000000000000000000000000000000000000000000000008c00000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000001a00000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000001c000000000000000000000000000000000000000000000000000000000000001c0000000000000000000000000000000000000000000000000000000000000002b85c0c828d7a98633b4e1b65eac0c017502da909420aeade9a280675013df36bdc71cffdf420cef3d24ba4b3f9b980bfbb26bd5e2dcf7795b3519a3fd22ffbb2000000000000000000000000000000000000000000000000000000000000000238fb6606dc2b5e42d00c653372c153da8560de77bd9afaba94b4ab6e4aa11d565d858c761320dbf23a94018d843772349bd9d92301b0ca9ca983a22d86a70628"
}
```

`stateOverrideSet` には以下のプロパティがあります。

| 名前        | タイプ    | Description                                                     |
| --------- | ------ | --------------------------------------------------------------- |
| balance   | 数量     | (オプション) 通話を実行する前にアカウントに設定する偽の残高                                 |
| nonce     | 数量     | (オプション) 通話を実行する前にアカウントに設定するnonce を偽装します。                        |
| コード       | データ    | (オプション) 呼び出しを実行する前にアカウントに注入するEVMバイトコードを偽造します。                   |
| 状態        | Object | (オプション) コールを実行する前に、アカウントストレージ内のすべてのスロットをオーバーライドするための偽のキー値マッピング。 |
| stateDiff | Object | (オプション) コールを実行する前に、アカウントストレージ内の個々のスロットをオーバーライドするための偽のキー値マッピング。  |

状態オーバーライドセットの目的は manyfold:

* DAppsでは、チェーンにデプロイするために必要な契約コードの量を減らすために使用できます。 単純に 内部状態を返すか、あらかじめ定義された検証を行うコードは、オンデマンドのノードにチェーンを離れて送ることができます。
* カスタムメソッドでチェーンにデプロイされたコードを拡張して 呼び出すことで、スマートコントラクト分析に使用できます。 これにより、サンドボックス内で状態全体をダウンロードして再構築し、カスタムコードを実行する必要がなくなります。
* すでに導入されている大規模なコントラクトでスマートコントラクトをデバッグするために、 コードまたは状態を選択的にオーバーライドし、実行がどのように変化するかを確認することができます。 専門のツーリングはおそらく必要になるでしょう。

**例 - stateOverrideSet**

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

**例**

有意義な方法で呼び出しをテストするには、以下のようなテスト環境を設定する必要があります。

* KIP-7コントラクトをデプロイして通話をテストするか、すでにデプロイされているコントラクトを使用できます。
  * この例では、KIP-7 contract 関数 `totalSupply` を使用して、呼び出しが動作しているかどうかを確認します。
  * `totalSupply` を呼び出すには、 `0x18160ddd` である関数署名について知っておく必要があります。

この例では:

* KIP-7 契約の住所: `0xbE3892d33620bE5aca8c75D39e7401871194d290` (既存の契約 アドレスを使用する必要があります。
* 発信者のアドレス: `0xca7a99380131e6c76cfa622396347107aeedca2d`

```shell
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0", "method": "eth_call", "params": [{"from": "0xca7a99380131e6c76cfa622396347107aeedca2d", "to": "0xbE3892d33620bE5aca8c75D39e7401871194d290", "input": "0x18160ddd"}, "latest"], "id": 1}' http:/localhost:8551

{"jsonrpc":"2.0","result":1,"result":0x000000000000000000000000000000000000
```

**例 - StateOverrides**

上記の例に従って、state のオーバーライド機能を使用してコールをテストしましょう。

* We will replace the bytecode of `0xbE3892d33620bE5aca8c75D39e7401871194d290` which is the address of KIP-7 contract already deployed above (Check the above example).
* The bytecode to be replaced is `6080604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680632e64cec114604e5780636057361d146076575b600080fd5b348015605957600080fd5b50606060a0565b6040518082815260200191505060405180910390f35b348015608157600080fd5b50609e6004803603810190808035906020019092919050505060a9565b005b60008054905090565b80600081905550505600a165627a7a723058207783dba41884f73679e167576362b7277f88458815141651f48ca38c25b498f80029` .
  * このバイトコードの元のソースコードは以下です。

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

次に、別の契約の `バイトコード (ストレージコントラクト)` (KIP-7 コントラクト) で xbE3892d33620bE5aca8c75D39e7401871194d290 の状態を上書きし、 `retrieve` (関数シグネチャ: `0x2e64cec1`) のストレージコントラクトを呼び出します。

```shell
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0", "method": "eth_call", "params": [{"from": "0xca7a99380131e6c76cfa622396347107aeedca2d", "to": "0xbE3892d33620bE5aca8c75D39e7401871194d290", "input": "0x2e64cec1"}, "latest", {"0xbE3892d33620bE5aca8c75D39e7401871194d290": {"code":"0x6080604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680632e64cec114604e5780636057361d146076575b600080fd5b348015605957600080fd5b50606060a0565b6040518082815260200191505060405180910390f35b348015608157600080fd5b50609e6004803603810190808035906020019092919050505060a9565b005b60008054905090565b80600081905550505600a165627a7a723058207783dba41884f73679e167576362b7277f88458815141651f48ca38c25b498f80029"}}], "id": 1}' http://localhost:8551

{"jsonrpc":"2.0","id":1,"result":"0x0000000000000000000000000000000000000000000000000000000000000000"}
```

## eth_estimateGas <a id="eth_estimategas"></a>

トランザクションが完了するために必要なガス量の見積もりを生成して返します。 トランザクション はブロックチェーンに追加されません。 この推定値は、トランザクションによって実際に使用されるガス の量よりも有意に大きい可能性があることに注意してください。 EVM力学やノード性能など、さまざまな理由で。

**パラメータ**

| 名前         | タイプ    | Description                                       |
| ---------- | ------ | ------------------------------------------------- |
| callObject | Object | トランザクションコールオブジェクト。 オブジェクトのプロパティについては次の表を参照してください。 |

`callObject` には以下のプロパティがあります。

| 名前       | タイプ        | Description                                                                              |
| -------- | ---------- | ---------------------------------------------------------------------------------------- |
| from     | 20 バイトのデータ | (オプション) トランザクションが送信されるようにシミュレートされます。 アドレスが指定されていない場合、 `0x00..0` アドレスが使用されます。             |
| to       | 20 バイトのデータ | (オプション) トランザクションが送信されるアドレス。                                                              |
| ガス       | 品質         | (オプション) 無限ループを回避するためのコード実行の最大ガス許容量。 デフォルトでは 2^63 か、--rpc.gascapで指定されたノード演算子の値です。         |
| gasPrice | 品質         | (オプション) 実行中のガス単位ごとの支払いをシミュレートする `ペブ` の数。 デフォルトは `0` peb です。                              |
| 値        | 品質         | (オプション) トランザクションとともに送信をシミュレートするための `peb` の量。 デフォルトは `0` です。                              |
| input    | データ        | (オプション) メソッド署名とエンコードされたパラメータのハッシュ。 `data` フィールドを置き換えますが、'data' フィールドは後方互換性のためサポートされています。 |

**例 - callObject**

```json
{
  "from": "0xd9c9cd5f6779558b6e0ed4e6acf6b1947e7fa1f3",
  "to": "0xebe8efa441b9302a0d7eaecc277c09d20d684540",
  "gas": "0x1bd7c",
  "input": "0xd459fc46000000000000000000000000000000000000000000000000000000000046c650dbb5e8cb2bac4d2ed0b1e6475d37361157738801c494ca482f96527eb48f9eec488c2eba92d31baeccfb6968fad5c21a3df93181b43b4cf253b4d572b64172ef000000000000000000000000000000000000000000000000000000000000008c00000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000001a00000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000001c000000000000000000000000000000000000000000000000000000000000001c0000000000000000000000000000000000000000000000000000000000000002b85c0c828d7a98633b4e1b65eac0c017502da909420aeade9a280675013df36bdc71cffdf420cef3d24ba4b3f9b980bfbb26bd5e2dcf7795b3519a3fd22ffbb2000000000000000000000000000000000000000000000000000000000000000238fb6606dc2b5e42d00c653372c153da8560de77bd9afaba94b4ab6e4aa11d565d858c761320dbf23a94018d843772349bd9d92301b0ca9ca983a22d86a70628"
}
```

**戻り値**

| タイプ | Description |
| --- | ----------- |
| 品質  | ガスの使用量。     |

**例**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "method": "klay_estimateGas", "params": [{"from": "0x3f71029af4e252b25b9ab999f77182f0cd3bc085", "to": "0x87ac99835e67168d4f9a40580f8f5c33550ba88b", "gas": "0x100000", "gasPrice": "0x5d21dba00", "value": "0x0", "input": "0x8ada066e"}], "id": 1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0","id":1,
  "result": "0x5208" // 21000
}
```

## eth_getTransactionByBlockHashAndIndex <a id="eth_gettransactionbyblockhashandindex"></a>

ブロックハッシュとトランザクションインデックスの位置でトランザクションに関する情報を返します。

このAPIを使用する前に、 [注意事項-取引](./caution.md#transaction) をご確認ください。

**パラメータ**

| タイプ       | Description          |
| --------- | -------------------- |
| 32バイトのデータ | ブロックのハッシュ。           |
| 品質        | トランザクションインデックス位置の整数。 |

**戻り値**

[eth_getTransactionByHash](#eth_gettransactionbyhash) を参照してください

**例**

さまざまなトランザクションタイプの例を見るには、 [eth_getTransactionByHash](#eth_gettransactionbyhash) を参照してください。

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

ブロック番号とトランザクションインデックス位置でトランザクションに関する情報を返します。

このAPIを使用する前に、 [注意事項-取引](./caution.md#transaction) をご確認ください。

**パラメータ**

| タイプ                 | Description                                                                                                                                                              |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| QUANTITY &#124; Tag | Integer or hexadecimal block number, or the string `"earliest"`, `"latest"` or `"pending"`  as in the [default block parameter](./block.md#the-default-block-parameter). |
| 品質                  | トランザクションインデックスの位置。                                                                                                                                                       |

**戻り値**

[eth_getTransactionByHash](#eth_gettransactionbyhash) を参照してください

**例**

さまざまなトランザクションタイプの例を見るには、 [eth_getTransactionByHash](#eth_gettransactionbyhash) を参照してください。

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

トランザクションハッシュによって要求されたトランザクションに関する情報を返します。

このAPIを使用する前に、 [注意事項-取引](./caution.md#transaction) をご確認ください。

**パラメータ**

| タイプ       | Description    |
| --------- | -------------- |
| 32バイトのデータ | トランザクションのハッシュ。 |

**戻り値**

トランザクションのフィールドは、トランザクションタイプに基づいて異なることができます。 現在、 Ethereum(Legacy, [AccessList](https://eips.ethereum.org/EIPS/eip-2930) , [DynamicFee](https://eips.ethereum.org/EIPS/eip-1559) )には3種類のトランザクションがあります。

`Object` - トランザクションが見つからなかった場合、トランザクションオブジェクト、または `null`。

**Legacy Transaction**

| 名前               | タイプ        | Description                               |
| ---------------- | ---------- | ----------------------------------------- |
| blockHash        | 32バイトのデータ  | このトランザクションがあったブロックのハッシュ。 `保留中の場合は null`   |
| blockNumber      | 品質         | このトランザクションがあったブロック番号。 `保留中の場合は null`      |
| from             | 20 バイトのデータ | 送信者のアドレス                                  |
| ガス               | 品質         | 送信者が提供するガス。                               |
| gasPrice         | 品質         | ペブ内の送信者によって提供されるガス価格。                     |
| hash             | 32バイトのデータ  | トランザクションのハッシュ                             |
| input            | データ        | トランザクションとともに送信されたデータ。                     |
| nonce            | 品質         | この前の送信者によって行われたトランザクションの数。                |
| to               | 20 バイトのデータ | 受信者のアドレス。 `null` がコントラクト作成トランザクションの場合。    |
| 値                | 品質         | このトランザクションで送信された値の整数。                     |
| transactionIndex | 品質         | ブロック内のトランザクションインデックス位置の整数。 `保留中の場合は null` |
| タイプ              | 品質         | トランザクションのタイプを表す整数。                        |
| v                | 品質         | ECDSAリカバリID。                              |
| r                | 32バイトのデータ  | ECDSA 署名 r.                               |
| s                | 32バイトのデータ  | ECDSA 署名 s.                               |

**例 - 従来の取引**

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

**AccessListトランザクション**

| 名前               | タイプ        | Description                                                |
| ---------------- | ---------- | ---------------------------------------------------------- |
| blockHash        | 32バイトのデータ  | このトランザクションがあったブロックのハッシュ。 `保留中の場合は null`                    |
| blockNumber      | 品質         | このトランザクションがあったブロック番号。 `保留中の場合は null`                       |
| from             | 20 バイトのデータ | 送信者のアドレス                                                   |
| ガス               | 品質         | 送信者が提供するガス。                                                |
| gasPrice         | 品質         | ペブ内の送信者によって提供されるガス価格。                                      |
| hash             | 32バイトのデータ  | トランザクションのハッシュ                                              |
| input            | データ        | トランザクションとともに送信されたデータ。                                      |
| nonce            | 品質         | この前の送信者によって行われたトランザクションの数。                                 |
| to               | 20 バイトのデータ | 受信者のアドレス。 `null` がコントラクト作成トランザクションの場合。                     |
| 値                | 品質         | このトランザクションで送信された値の整数。                                      |
| transactionIndex | 品質         | ブロック内のトランザクションインデックス位置の整数。 `保留中の場合は null`                  |
| タイプ              | 品質         | トランザクションのタイプを表す整数。                                         |
| accessList       | 行列         | [accessList](https://eips.ethereum.org/EIPS/eip-2930) の配列。 |
| chainId          | 品質         | 要求されたノードにチェーンIDがセットされました。                                  |
| v                | 品質         | ECDSAリカバリID。                                               |
| r                | 32バイトのデータ  | ECDSA 署名 r.                                                |
| s                | 32バイトのデータ  | ECDSA 署名 s.                                                |

**例 - AccessList トランザクション**

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

**動的手数料取引**

| 名前                   | タイプ        | Description                                                |
| -------------------- | ---------- | ---------------------------------------------------------- |
| blockHash            | 32バイトのデータ  | このトランザクションがあったブロックのハッシュ。 `保留中の場合は null`                    |
| blockNumber          | 品質         | このトランザクションがあったブロック番号。 `保留中の場合は null`                       |
| from                 | 20 バイトのデータ | 送信者のアドレス                                                   |
| ガス                   | 品質         | 送信者が提供するガス。                                                |
| gasPrice             | 品質         | ペブ内の送信者によって提供されるガス価格。                                      |
| maxFeePerGas         | 品質         | トランザクションを実行するために支払う最大額。                                    |
| maxPriorityFeePerGas | 品質         | ペブでの動的手数料取引のためのガスチップキャップ。                                  |
| hash                 | 32バイトのデータ  | トランザクションのハッシュ                                              |
| input                | データ        | トランザクションとともに送信されたデータ。                                      |
| nonce                | 品質         | この前の送信者によって行われたトランザクションの数。                                 |
| to                   | 20 バイトのデータ | 受信者のアドレス。 `null` がコントラクト作成トランザクションの場合。                     |
| 値                    | 品質         | このトランザクションで送信された値の整数。                                      |
| transactionIndex     | 品質         | ブロック内のトランザクションインデックス位置の整数。 `保留中の場合は null`                  |
| タイプ                  | 品質         | トランザクションのタイプを表す整数。                                         |
| accessList           | 行列         | [accessList](https://eips.ethereum.org/EIPS/eip-2930) の配列。 |
| chainId              | 品質         | 要求されたノードにチェーンIDがセットされました。                                  |
| v                    | 品質         | ECDSAリカバリID。                                               |
| r                    | 32バイトのデータ  | ECDSA 署名 r.                                                |
| s                    | 32バイトのデータ  | ECDSA 署名 s.                                                |

**例 - DynamicFee Transaction**

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

トランザクションハッシュによるトランザクションの受領を返します。

**注意**: 保留中の取引ではレシートは利用できません。

このAPIを使用する前に、 [注意事項-トランザクション領収書](./caution.md#transaction_receipt) をご確認ください。

**パラメータ**

| 名前   | タイプ       | Description    |
| ---- | --------- | -------------- |
| ハッシュ | 32バイトのデータ | トランザクションのハッシュ。 |

**戻り値**

`Object` - レシートが見つからなかった場合、 `null`

| 名前                | タイプ        | Description                                                                                                                           |
| ----------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| blockHash         | 32バイトのデータ  | このトランザクションがあったブロックのハッシュ。                                                                                                              |
| blockNumber       | 品質         | この取引があったブロック番号                                                                                                                        |
| コントラクトアドレス        | データ        | トランザクションがコントラクト作成であれば、コントラクトアドレスが作成されます。そうでなければ `null` です。                                                                            |
| 累積ガス使用            | 品質         | このトランザクションがブロック内で実行されたときに使用されるガスの合計量。                                                                                                 |
| effectiveGasPrice | 品質         | 送信者口座からガス当たりの実際の値が差し引かれます。 EIP-1559以前は、これは取引のガス価格に等しいです。 その後、baseFeePerGas + min(maxFeePerGas - baseFeePerGas, maxPriorityFeePerGas). |
| from              | 20 バイトのデータ | 送信者のアドレス                                                                                                                              |
| ログ                | 行列         | このトランザクションが生成したログオブジェクトの配列。                                                                                                           |
| logsBloom         | 256バイトのデータ | ライトクライアントが関連するログをすばやく取得できるようにするためのフィルターをブルームにします。                                                                                     |
| ステータス             | 品質         | `1` (成功) または `0 0` (失敗).                                                                                                              |
| to                | 20 バイトのデータ | 受信者のアドレス。 `null` がコントラクト作成トランザクションの場合。                                                                                                |
| transactionHash   | 32バイトのデータ  | トランザクションのハッシュ                                                                                                                         |
| transactionIndex  | 品質         | ブロック内のトランザクションインデックス位置の整数。                                                                                                            |
| タイプ               | 品質         | トランザクションのタイプを表す整数。                                                                                                                    |

**例**

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

新しいメッセージコールトランザクションまたは署名されたトランザクションのコントラクト作成を作成します。

**パラメータ**

| タイプ | Description       |
| --- | ----------------- |
| データ | 署名されたトランザクションデータ。 |

**戻り値**

| タイプ       | Description                                 |
| --------- | ------------------------------------------- |
| 32バイトのデータ | トランザクションがまだ利用可能でない場合、トランザクションハッシュまたはゼロハッシュ。 |

コントラクトをデプロイした場合は、 [eth_getTransactionReceipt](#eth_gettransactionreceipt) を使用してコントラクトアドレスを取得します。

**例**

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

与えられたパラメータでトランザクションを構築し、送信者の秘密鍵でトランザクションに署名し、 トランザクションをKlaytnネットワークに伝播します。

**注**: 署名するアドレスのロックを解除する必要があります。

**パラメータ**:

| 名前              | タイプ    | Description                                        |
| --------------- | ------ | -------------------------------------------------- |
| transactionArgs | Object | トランザクション引数のオブジェクト。 オブジェクトのプロパティについては以下の表を参照してください。 |

`transactionArgs` には以下のプロパティがあります:

| 名前                   | タイプ        | Description                                                                                             |
| -------------------- | ---------- | ------------------------------------------------------------------------------------------------------- |
| from                 | 20 バイトのデータ | トランザクションが送信されたアドレス                                                                                      |
| to                   | 20 バイトのデータ | (新規コントラクトを作成する際に必須ではありません) トランザクションが指示されるアドレス。                                                          |
| ガス                   | 品質         | (オプション) トランザクションの実行に提供されるガスの整数。 未使用のガスを返却します。                                                           |
| maxFeePerGas         | 品質         | (オプション、デフォルト: 250 ston) トランザクションの実行に支払う最大額。 Klaytnは固定のガス価格を使用するため、250ston(EthereumではGpeb)に設定する必要があります。  |
| maxPriorityFeePerGas | 品質         | (オプション、デフォルト:250個) ペブ内の動的手数料取引のためのガスチップキャップ。 Klaytnは固定のガス価格を使用するため、250ston(EthereumではGpeb)に設定する必要があります。 |
| input                | データ        | (オプション) メソッド署名とエンコードされたパラメータのハッシュ。 `data` フィールドを置き換えますが、'data' フィールドは後方互換性のためサポートされています。                |
| 値                    | 品質         | (オプション) このトランザクションで送信された値の整数。                                                                           |
| nonce                | 品質         | (オプション) nonce の整数。                                                                                      |



**戻り値**

| タイプ       | Description                                 |
| --------- | ------------------------------------------- |
| 32バイトのデータ | トランザクションがまだ利用可能でない場合、トランザクションハッシュまたはゼロハッシュ。 |

コントラクトをデプロイした場合は、 [eth_getTransactionReceipt](#eth_gettransactionreceipt) を使用してコントラクトアドレスを取得します。

**例**

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

eth_sendRawTransaction を使用して、後でネットワークに送信できるトランザクションに署名します。

**注**: 署名するアドレスのロックを解除する必要があります。

**パラメータ**:

| 名前              | タイプ    | Description                                        |
| --------------- | ------ | -------------------------------------------------- |
| transactionArgs | Object | トランザクション引数のオブジェクト。 オブジェクトのプロパティについては以下の表を参照してください。 |

`transactionArgs` には以下のプロパティがあります:

| 名前                   | タイプ        | Description                                                                              |
| -------------------- | ---------- | ---------------------------------------------------------------------------------------- |
| from                 | 20 バイトのデータ | トランザクションが送信されたアドレス                                                                       |
| to                   | 20 バイトのデータ | (新規コントラクトを作成する際に必須ではありません) トランザクションが指示されるアドレス。                                           |
| ガス                   | 品質         | トランザクションの実行に提供されるガスの整数。 未使用のガスを返却します。                                                    |
| maxFeePerGas         | 品質         | トランザクションの実行に支払う最大額。 Klaytnは固定のガス価格を使用するため、250ston(EthereumではGpeb)に設定する必要があります。           |
| maxPriorityFeePerGas | 品質         | ペブでの動的手数料取引のためのガスチップキャップ。 Klaytnは固定のガス価格を使用するため、250ston(EthereumではGpeb)に設定する必要があります。     |
| input                | データ        | (オプション) メソッド署名とエンコードされたパラメータのハッシュ。 `data` フィールドを置き換えますが、'data' フィールドは後方互換性のためサポートされています。 |
| 値                    | 品質         | (オプション) このトランザクションで送信された値の整数。                                                            |
| nonce                | 品質         | nonce の整数。                                                                               |

**戻り値**

`Object` - 署名されたトランザクションオブジェクト。

| 名前  | タイプ    | Description                                    |
| --- | ------ | ---------------------------------------------- |
| raw | データ    | `rawTransaction` 文字列 (RLPエンコードされたトランザクション文字列)。 |
| tx  | Object | トランザクションオブジェクト。 オブジェクトのプロパティについては次の表を参照してください。 |

`tx` には以下のプロパティがあります。

| 名前                   | タイプ       | Description                                                |
| -------------------- | --------- | ---------------------------------------------------------- |
| タイプ                  | 品質        | トランザクションのタイプを表す整数。                                         |
| nonce                | 品質        | この取引があったブロック番号                                             |
| gasPrice             | 品質        | ペブ内の送信者によって提供されるガス価格。 `null` 従来のトランザクションではない場合。            |
| maxFeePerGas         | 品質        | トランザクションを実行するために支払う最大額。 `null` レガシートランザクションの場合。            |
| maxPriorityFeePerGas | 品質        | ペブでの動的手数料取引のためのガスチップキャップ。 `null` レガシートランザクションの場合。          |
| ガス                   | 品質        | 送信者が提供するガス。                                                |
| 値                    | 品質        | このトランザクションで送信された値の整数。                                      |
| v                    | 品質        | ECDSAリカバリID。                                               |
| r                    | 32バイトのデータ | ECDSA 署名 r.                                                |
| s                    | 32バイトのデータ | ECDSA 署名 s.                                                |
| chainId              | 品質        | 要求されたノードにチェーンIDがセットされました。                                  |
| accessList           | 行列        | [accessList](https://eips.ethereum.org/EIPS/eip-2930) の配列。 |
| hash                 | 32バイトのデータ | トランザクションのハッシュ                                              |

**例**

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

指定された署名されていないトランザクションで既定値 (nonce、gasPrice、または1559 フィールド) を入力します。 そして、さらに処理(署名とブロードキャスト)するために呼び出し元の に返します。

**パラメータ**:

パラメータは eth_sendTransaction と同じです。 [eth_sendtransaction](#eth_sendtransaction) を参照してください。

**戻り値**

参照 [eth_signTransaction](#eth_signtransaction).

**例**

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

## eth_pendingTransaction <a id="eth_pendingtransactions"></a>

トランザクションプールにあり、このノード が管理するアカウントの 1 つである from アドレスを持つトランザクションを返します。

**パラメータ**:

なし

**戻り値**

| 名前     | タイプ | Description                                                                                 |
| ------ | --- | ------------------------------------------------------------------------------------------- |
| 保留中の取引 | 行列  | トランザクションの配列。 返されたトランザクションオブジェクトについては、 [eth_signTransaction を参照してください](#eth_signtransaction) |

**例**

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
