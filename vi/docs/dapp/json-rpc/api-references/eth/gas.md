## eth_feeHistory<a id="eth_feehistory"></a>

Trả về phí cơ sở cho mỗi gas và phí ưu tiên hiệu quả của một giao dịch trên mỗi lịch sử gas đối với khoảng khối được yêu cầu nếu có.

**Tham số**

| Tên               | Loại               | Mô tả                                                                                                                                                                                                                                                            |
| ----------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockCount        | SỐ LƯỢNG            | Số lượng khối trong khoảng yêu cầu được trình bày dưới dạng số thập lục phân. Có thể yêu cầu giữa 1 (0x1) và 1024 (0x400) khối trong một truy vấn duy nhất. Nếu không có đủ các khối cần truy vấn, thì số lượng khối trả về có thể ít hơn số lượng khối yêu cầu. |
| lastBlock         | SỐ LƯỢNG &#124; THẺ | Khối cao nhất trong khoảng được yêu cầu dưới dạng số khối hoặc thẻ khối.                                                                                                                                                                                         |
| rewardPercentiles | Mảng DẤU PHẢY ĐỘNG  | Mảng số thực dấu phảy động nằm trong khoảng từ 0 đến 100.                                                                                                                                                                                                        |


**Giá trị trả về**

| Tên           | Loại              | Mô tả                                                                                                                                                              |
| ------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| oldestBlock   | SỐ LƯỢNG          | Khối thấp nhất trong khoảng trả về được trình bày dưới dạng số thập lục phân.                                                                                      |
| baseFeePerGas | Array of QUANTITY | An array of block base fees per gas. This includes the next block after the newest of the returned range, because this value can be derived from the newest block. |
| gasUsedRatio  | Array of FLOAT    | An array of block gas used ratios. These are calculated as the ratio of gasUsed and gasLimit.                                                                      |
| reward        | Array of QUANTITY | An array of effective priority fee per gas data points from a single block. All zeroes are returned if the block is empty.                                         |


**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_feeHistory","params":["0x10", "latest", [0.1, 0.2, 0.3]],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "oldestBlock": "0xa5b",
    "reward": [
      [
        "0x0",
        "0x0",
        "0x0"
      ],
      [
        "0x0",
        "0x0",
        "0x0"
      ],
      [
        "0x0",
        "0x0",
        "0x0"
      ],
      [
        "0x0",
        "0x0",
        "0x0"
      ],
      [
        "0x0",
        "0x0",
        "0x0"
      ],
      [
        "0x5d21dba00",
        "0x5d21dba00",
        "0x5d21dba00"
      ],
      [
        "0x0",
        "0x0",
        "0x0"
      ],
      [
        "0x0",
        "0x0",
        "0x0"
      ],
      [
        "0x5d21dba00",
        "0x5d21dba00",
        "0x5d21dba00"
      ],
      [
        "0x0",
        "0x0",
        "0x0"
      ],
      [
        "0x0",
        "0x0",
        "0x0"
      ],
      [
        "0x5d21dba00",
        "0x5d21dba00",
        "0x5d21dba00"
      ],
      [
        "0x0",
        "0x0",
        "0x0"
      ],
      [
        "0x0",
        "0x0",
        "0x0"
      ],
      [
        "0x0",
        "0x0",
        "0x0"
      ],
      [
        "0x0",
        "0x0",
        "0x0"
      ]
    ],
    "baseFeePerGas": [
      "0x0",
      "0x0",
      "0x0",
      "0x0",
      "0x0",
      "0x0",
      "0x0",
      "0x0",
      "0x0",
      "0x0",
      "0x0",
      "0x0",
      "0x0",
      "0x0",
      "0x0",
      "0x0",
      "0x0"
    ],
    "gasUsedRatio": [
      0,
      0,
      0,
      0,
      0,
      0.0002952004000002952,
      0,
      0,
      0.00029504250000029504,
      0,
      0,
      0.0002963777000002964,
      0,
      0,
      0,
      0
    ]
  }
}
```


## eth_maxPriorityFeePerGas <a id="eth_maxpriorityfeepergas"></a>

Returns a suggestion for a gas tip cap for dynamic fee transaction in peb.

**NOTE**: This API has different behavior from Ethereum's and returns a gas price of Klaytn instead of suggesting a gas price as in Ethereum.

**Parameters**

None

**Return Value**

| Type     | Description                              |
| -------- | ---------------------------------------- |
| QUANTITY | Integer of the current gas price in peb. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_maxPriorityFeePerGas","params":[],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1)
  "result": "0xAE9F7BCC00" // 250,000,000,000 peb = 250 ston (Gwei)
}
```

