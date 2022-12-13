## klay_feeHistory<a id="klay_feehistory"></a>

利用可能な場合は、ガスあたりの基本料金と、要求されたブロック範囲に対するガス履歴あたりの取引効果的な優先度料金を返します。

{% hint style="success" %}
**注意**: この API は Klaytn v1.8.0 以降に有効になります。
{% endhint %}

**パラメータ**

| 名前                | タイプ                 | Description                                                                                                  |
| ----------------- | ------------------- | ------------------------------------------------------------------------------------------------------------ |
| blockCount        | 品質                  | 要求された範囲内の 16 進数のブロック数。 1 回のクエリで 1 (0x1) から 1024 (0x400) のブロックを要求できます。 すべてのブロックが利用可能でない場合は、要求された未満を返すことができます。 |
| lastBlock         | QUANTITY &#124; Tag | ブロック番号またはブロックタグとして要求された範囲の最も高い番号のブロック。                                                                       |
| rewardPercentiles | FLOAT の配列           | 0 から 100 までの浮動小数点値の配列。                                                                                       |


**戻り値**

| 名前            | タイプ       | Description                                                                             |
| ------------- | --------- | --------------------------------------------------------------------------------------- |
| oldestBlock   | 品質        | 返される範囲の最も低い番号のブロックは16進数です。                                                              |
| baseFeePerGas | 品質の配列     | ガスあたりのブロックベース・フィーの配列。 これには、返された範囲の最新の後に続く次のブロックが含まれます。なぜなら、この値は最新のブロックから派生することができるからです。 |
| gasUsedRatio  | FLOAT の配列 | ブロックごとに使用されるガスの比率の配列。 これは gasUsed と gasLimit の比率として計算されます。                              |
| 報酬            | 品質の配列     | 1つのブロックからのガスデータポイントあたりの効果的な優先手数料の配列。 ブロックが空の場合、すべてのゼロが返されます。                            |


**例**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_feeHistory","params":["0x10", "latest", [0.1, 0.2, 0.3]],"id":1}' http://localhost:8551
// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "oldestBlock": "0xa5b",
    "reward": [
      [ "0x0", "0x0", "0x0" ],
      ...
      ["0x5d21dba00", "0x5d21dba00", "0x5d21dba00" ]
    ],
    "baseFeePerGas": [ "0x0", ..., "0x0" ],
    "gasedRatio": [ 0, ..., 0.0002963777000002964 ]
  }

```


## klay_maxPriorityFeePerGas <a id="klay_maxpriorityfeepergas"></a>

peb内の動的手数料取引のためのガスチップキャップの提案を返します。

{% hint style="success" %}
**注意**: この API は Klaytn v1.8.0 以降に有効になります。
{% endhint %}

**パラメータ**

なし

**戻り値**

| タイプ | Description     |
| --- | --------------- |
| 品質  | ペブ内の現在のガス価格の整数。 |

**例**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_maxPriorityFeePerGas","params":[],"id":1}' http://localhost:8551
// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0xAE9F7BCC00" // 250,000,000,000 peb = 250 Ston
}
```