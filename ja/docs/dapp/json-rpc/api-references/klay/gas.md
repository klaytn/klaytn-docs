## klay_feeHistory<a id="klay_feehistory"></a>

Returns base fee per gas and transaction effective priority fee per gas history for the requested block range if available.

{% hint style="success" %}
**注意**: この API は Klaytn v1.8.0 以降に有効になります。
{% endhint %}

**Parameters**

| Name              | Type                | Description                                                                                                                                                             |
| ----------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockCount        | QUANTITY            | 要求された範囲内の 16 進数のブロック数。 Between 1 (0x1) and 1024 (0x400) blocks can be requested in a single query. Less than requested may be returned if not all blocks are available. |
| lastBlock         | QUANTITY &#124; TAG | ブロック番号またはブロックタグとして要求された範囲の最も高い番号のブロック。                                                                                                                                  |
| rewardPercentiles | Array of FLOAT      | 0 から 100 までの浮動小数点値の配列。                                                                                                                                                  |


**Return Value**

| Name          | Type              | Description                                                                                                                                                        |
| ------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| oldestBlock   | QUANTITY          | 返される範囲の最も低い番号のブロックは16進数です。                                                                                                                                         |
| baseFeePerGas | Array of QUANTITY | An array of block base fees per gas. This includes the next block after the newest of the returned range, because this value can be derived from the newest block. |
| gasUsedRatio  | Array of FLOAT    | ブロックごとに使用されるガスの比率の配列。 These are calculated as the ratio of gasUsed and gasLimit.                                                                                   |
| reward        | Array of QUANTITY | An array of effective priority fee per gas data points from a single block. All zeroes are returned if the block is empty.                                         |


**Example**

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
**NOTE**: This API is effective after Klaytn v1.8.0
{% endhint %}

**Parameters**

None

**Return Value**

| Type     | Description                              |
| -------- | ---------------------------------------- |
| QUANTITY | Integer of the current gas price in peb. |

**Example**

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