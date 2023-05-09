## defaultBlock <a id="defaultblock"></a>

```javascript
caver.klay.defaultBlock
```

Khối mặc định được sử dụng cho các phương thức nhất định.  Bạn có thể ghi đè khối này bằng cách truyền vào defaultBlock như là tham số cuối cùng.  Giá trị mặc định là `"latest"`.

- [caver.klay.getBalance()](./account.md#getbalance)
- [caver.klay.getCode()](./account.md#getcode)
- [caver.klay.getTransactionCount()](./account.md#gettransactioncount)
- [caver.klay.getStorageAt()](#getstorageat)
- [caver.klay.call()](./transaction.md#call)
- [new caver.klay.Contract()](../caver.klay.Contract.md#new-contract) -> [myContract.methods.myMethod().call()](../caver.klay.Contract.md#methods-mymethod-call)

**Thuộc tính**

Tham số khối mặc định có thể là một trong các tham số sau:

- Số: Số khối
- `"genesis"` - Chuỗi: Khối khởi nguyên
- `"latest"` - Chuỗi: Khối mới nhất (tiêu đề hiện tại của chuỗi khối)

Mặc định là `"latest"`.

**Ví dụ**

```javascript
> caver.klay.defaultBlock;
"latest"

// set the default block
> caver.klay.defaultBlock = 1000;
```

## getBlockNumber <a id="getblocknumber"></a>

```javascript
caver.klay.getBlockNumber([callback])
```

Trả về số khối hiện tại.

**Tham số**

| Tên      | Loại | Mô tả                                                                                                           |
| -------- | ---- | --------------------------------------------------------------------------------------------------------------- |
| callback | Hàm  | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số đầu tiên và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `Number`: Số khối gần đây nhất.

**Ví dụ**

```javascript
> caver.klay.getBlockNumber().then(console.log);
2744
```

## getBlock <a id="getblock"></a>

```javascript
caver.klay.getBlock(blockHashOrBlockNumber [, returnTransactionObjects] [, callback])
```
Trả về khối khớp với hàm băm của khối hoặc số khối.

**Tham số**

| Tên                      | Loại           | Mô tả                                                                                                                                                                |
| ------------------------ | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockHashOrBlockNumber   | Chuỗi &#124; Số | Hàm băm của khối hoặc số khối. Hoặc chuỗi `"genesis"`, hoặc `"latest"`.                                                                                              |
| returnTransactionObjects | Logic           | (tùy chọn, mặc định `false`) Nếu giá trị là `true`, khối trả về sẽ chứa tất cả các giao dịch dưới dạng đối tượng, nếu là `false` thì chỉ chứa các hàm băm giao dịch. |
| callback                 | Hàm             | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số đầu tiên và kết quả làm tham số thứ hai.                                                      |

**Giá trị trả về**

`Promise` trả về `Object` - Đối tượng của khối:

| Tên              | Loại            | Mô tả                                                                                                     |
| ---------------- | --------------- | --------------------------------------------------------------------------------------------------------- |
| blockScore       | SỐ LƯỢNG        | Độ khó trước đây. Luôn luôn là 1 trong công cụ đồng thuận BFT                                             |
| extraData        | Chuỗi           | Trường "dữ liệu bổ sung" của khối này.                                                                    |
| gasUsed          | Số              | Tổng số gas đã được sử dụng bởi tất cả các giao dịch trong khối này.                                      |
| governanceData   | DỮ LIỆU         | Cấu hình quản trị được mã hóa RLP                                                                         |
| hash             | Chuỗi 32 byte   | Hàm băm của khối. Giá trị là `null` nếu đó là khối đang chờ xử lý.                                        |
| logsBloom        | Chuỗi 256 byte  | Bộ lọc Bloom cho các bản ghi của khối. Giá trị là `null` nếu đó là khối đang chờ xử lý.                   |
| number           | Số              | Số khối. Giá trị là `null` nếu đó là khối đang chờ xử lý.                                                 |
| parentHash       | Chuỗi 32 byte   | Hàm băm của khối cha.                                                                                     |
| receiptsRoot     | DỮ LIỆU 32 byte | Gốc của cây tiền tố biên lai giao dịch của khối.                                                          |
| reward           | DỮ LIỆU 20 byte | Địa chỉ của người thụ hưởng đã được trao phần thưởng khối.                                                |
| size             | Số              | Số nguyên chỉ kích thước của khối này theo byte.                                                          |
| stateRoot        | Chuỗi 32 byte   | Gốc của cây tiền tố trạng thái cuối của khối.                                                             |
| timestamp        | Số              | Dấu thời gian unix khi khối được đối chiếu.                                                               |
| timestampFoS     | SỐ LƯỢNG        | Phần giây của dấu thời gian khi khối được đối chiếu.                                                      |
| totalBlockScore  | SỐ LƯỢNG        | Tổng số blockScore bằng số nguyên của chuỗi cho đến khối này.                                             |
| transactions     | Mảng            | Mảng đối tượng giao dịch hoặc hàm băm giao dịch 32 byte tùy thuộc vào tham số `returnTransactionObjects`. |
| transactionsRoot | Chuỗi 32 byte   | Gốc của cây tiền tố giao dịch trong khối.                                                                 |
| voteData         | DỮ LIỆU         | Phiếu bầu quản trị được mã hóa RLP của người đề xuất                                                      |

**Ví dụ**

```javascript
> caver.klay.getBlock(19097).then(console.log);
{ 
    blockscore: '0x1',
    extraData: '0xd7820a01846b6c617988676f312e31312e32856c696e75780000000000000000f8b3ea94715dd3ce7a285f21111715a2ba5537414d40506b9471959675eeb7c7ec1e0c74f206a9c488d7f178d4b8418e55cfb464eed804671bbee503f2dcacae9349f23aa3c42fc43349f96ef08bb07c1039541a3b768af32384c8e29ec7e673356a6b0ea4c6d88604ae8abae4303201f843b841386a3fbd09cd3a7c82c0b8fdc9ae8c3e624be5f12553dde42bed456093e40c113aa36fb7015b578611e2cd2ee979e6017b15be7d3cc645f455b32e8607c85d7100',
    gasUsed: '0x5208',
    governanceData: '0x',
    hash: '0x6ccef34eb59fab927705d344f080f449b576c0626e4aa3e20f569feb8df6e283',
    logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    number: '0x4a99',
    parentHash: '0x3b56b598828368d86b175a78ba21845125372851154840c6b1b318da910849c2',
    receiptsRoot: '0xe38e5532717f12f769b07ea016014bd39b74fb72def4de8442114cc2728609f2',
    reward: '0x59e6931f46b091f4ecbc39e8626fc0be7d3fcdeb',
    size: '0x314',
    stateRoot: '0xc65b3e3f1c32c33c095507d6d37e2a8a5589b178b5b03a1365295908ac92c40c',
    timestamp: '0x5d11f951',
    timestampFoS: '0x0',
    totalBlockScore: '0x4a9a',
    transactions: [ '0xac418c96f7386a3343d149eeb29e48e28905525dda2e5afe55b0661f9ab01aca' ],
    transactionsRoot: '0xac418c96f7386a3343d149eeb29e48e28905525dda2e5afe55b0661f9ab01aca',
    voteData: '0x' 
}
```

## getBlockReceipts <a id="getblockreceipts"></a>

```javascript
caver.klay.getBlockReceipts(blockHash [, callback])
```
Trả về danh sách các biên lai giao dịch được bao gồm trong khối được xác định bởi hàm băm của khối đã cho.

**Tham số**

| Tên       | Loại | Mô tả                                                                                                           |
| --------- | ----- | --------------------------------------------------------------------------------------------------------------- |
| blockHash | Chuỗi | Hàm băm của khối.                                                                                               |
| callback  | Hàm   | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số đầu tiên và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `Array` - Các biên lai được bao gồm trong một khối.  Nếu khối mục tiêu không chứa giao dịch, thì hệ thống sẽ trả về một mảng trống `[]`.


**Ví dụ**

```javascript
> caver.klay.getBlockReceipts('0x6ccef34eb59fab927705d344f080f449b576c0626e4aa3e20f569feb8df6e283').then(console.log);
[ 
    { 
        blockHash: '0x6ccef34eb59fab927705d344f080f449b576c0626e4aa3e20f569feb8df6e283',
        blockNumber: '0x4a99',
        contractAddress: null,
        from: '0x71959675eeb7c7ec1e0c74f206a9c488d7f178d4',
        gas: '0x493e0',
        gasPrice: '0x5d21dba00',
        gasUsed: '0x5208',
        logs: [],
        logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
        nonce: '0x2',
        senderTxHash: '0xac418c96f7386a3343d149eeb29e48e28905525dda2e5afe55b0661f9ab01aca',
        signatures: [ 
            { 
                V: '0x4e43',
                R: '0xa857ef0676d7e65697cadeaf1654b2facd71d0b9f942d695f3972a1f7c34c25c',
                S: '0x43fba9e5c2c16511f951e27957f1279ea3c1f913b27f9fbb2a8dcb5884e37e3d'
            } 
        ],
        status: '0x1',
        to: '0xef5cd886c7f8d85fbe8023291761341acbb4da01',
        transactionHash: '0xac418c96f7386a3343d149eeb29e48e28905525dda2e5afe55b0661f9ab01aca',
        transactionIndex: '0x0',
        type: 'TxTypeValueTransfer',
        typeInt: 8,
        value: '0xde0b6b3a7640000' 
    } 
]

> caver.klay.getBlockReceipts('0x6275712cd6ec769603f1560819ad226ea29216881c495c778ca68f0c1cd6e550').then(console.log);
[]
```

## getBlockTransactionCount <a id="getblocktransactioncount"></a>

```javascript
caver.klay.getBlockTransactionCount(blockHashOrBlockNumber [, callback])
```
Trả về số lượng giao dịch trong một khối đã cho.

**Tham số**

| Tên                    | Loại           | Mô tả                                                                                                           |
| ---------------------- | --------------- | --------------------------------------------------------------------------------------------------------------- |
| blockHashOrBlockNumber | Chuỗi &#124; Số | Số khối hoặc hàm băm. Hoặc chuỗi `"genesis"`, hoặc `"latest"`.                                                  |
| callback               | Hàm             | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số đầu tiên và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `Number`: Số lượng giao dịch trong khối đã cho.

**Ví dụ**

```javascript
> caver.klay.getBlockTransactionCount("0x407d73d8a49eeb85d32cf465507dd71d507100c1").then(console.log);
1
```


## getBlockWithConsensusInfo <a id="getblockwithconsensusinfo"></a>

```javascript
caver.klay.getBlockWithConsensusInfo(blockHashOrBlockNumber [, callback])
```

Trả về một khối có thông tin đồng thuận khớp với số khối hoặc hàm băm của khối đã cho.

**Tham số**

| Tên                    | Loại            | Mô tả                                                                                                           |
| ---------------------- | --------------- | --------------------------------------------------------------------------------------------------------------- |
| blockHashOrBlockNumber | Chuỗi &#124; Số | Hàm băm của khối hoặc số khối. Hoặc chuỗi `"genesis"`, hoặc `"latest"`.                                         |
| callback               | Hàm             | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số đầu tiên và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `Object` - Một đối tượng khối với thông tin đồng thuận (bao gồm một người đề xuất và một danh sách các thành viên ủy ban) Đối tượng khối bao gồm:

| Tên              | Loại           | Mô tả                                                                                                                                                      |
| ---------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockScore       | SỐ LƯỢNG        | Độ khó trước đây. Luôn luôn là 1 trong công cụ đồng thuận BFT                                                                                              |
| committee        | Mảng            | Mảng địa chỉ của các thành viên ủy ban của khối này. Ủy ban là một tập hợp con của những người xác nhận đã tham gia vào giao thức đồng thuận cho khối này. |
| extraData        | Chuỗi           | Trường "dữ liệu bổ sung" của khối này.                                                                                                                     |
| gasUsed          | QUANTITY        | The total used gas by all transactions in this block.                                                                                                      |
| governanceData   | DATA            | RLP encoded governance configuration                                                                                                                       |
| hash             | 32-byte DATA    | Hash of the block. `null` when it is a pending block.                                                                                                      |
| logsBloom        | 256-byte String | The bloom filter for the logs of the block. `null` when it is a pending block.                                                                             |
| number           | QUANTITY        | The block number. `null` when it is a pending block.                                                                                                       |
| parentHash       | 32-byte DATA    | Hash of the parent block.                                                                                                                                  |
| proposer         | 20-byte DATA    | The address of the block proposer.                                                                                                                         |
| receiptsRoot     | 32-byte DATA    | The root of the receipts trie of the block.                                                                                                                |
| reward           | 20-byte DATA    | The address of the beneficiary to whom the block rewards were given.                                                                                       |
| size             | QUANTITY        | Integer the size of this block in bytes.                                                                                                                   |
| stateRoot        | 32-byte DATA    | The root of the final state trie of the block.                                                                                                             |
| timestamp        | QUANTITY        | The unix timestamp for when the block was collated.                                                                                                        |
| timestampFoS     | QUANTITY        | The fraction of a second of the timestamp for when the block was collated.                                                                                 |
| totalBlockScore  | QUANTITY        | Integer of the total blockScore of the chain until this block.                                                                                             |
| transactions     | Array           | Array of transaction objects.                                                                                                                              |
| transactionsRoot | 32-byte DATA    | The root of the transaction trie of the block.                                                                                                             |
| voteData         | DATA            | RLP encoded governance vote of the proposer                                                                                                                |

**Examples**
```javascript
> caver.klay.getBlockWithConsensusInfo(19097).then(console.log);
{ 
    blockscore: '0x1',
    committee: [ 
        '0x715dd3ce7a285f21111715a2ba5537414d40506b',
        '0x71959675eeb7c7ec1e0c74f206a9c488d7f178d4' 
    ],
    extraData: '0xd7820a01846b6c617988676f312e31312e32856c696e75780000000000000000f8b3ea94715dd3ce7a285f21111715a2ba5537414d40506b9471959675eeb7c7ec1e0c74f206a9c488d7f178d4b8418e55cfb464eed804671bbee503f2dcacae9349f23aa3c42fc43349f96ef08bb07c1039541a3b768af32384c8e29ec7e673356a6b0ea4c6d88604ae8abae4303201f843b841386a3fbd09cd3a7c82c0b8fdc9ae8c3e624be5f12553dde42bed456093e40c113aa36fb7015b578611e2cd2ee979e6017b15be7d3cc645f455b32e8607c85d7100',
    gasUsed: '0x5208',
    governanceData: '0x',
    hash: '0x6ccef34eb59fab927705d344f080f449b576c0626e4aa3e20f569feb8df6e283',
    logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    number: '0x4a99',
    parentHash: '0x3b56b598828368d86b175a78ba21845125372851154840c6b1b318da910849c2',
    proposer: '0x715dd3ce7a285f21111715a2ba5537414d40506b',
    receiptsRoot: '0xe38e5532717f12f769b07ea016014bd39b74fb72def4de8442114cc2728609f2',
    reward: '0x59e6931f46b091f4ecbc39e8626fc0be7d3fcdeb',
    size: '0x314',
    stateRoot: '0xc65b3e3f1c32c33c095507d6d37e2a8a5589b178b5b03a1365295908ac92c40c',
    timestamp: '0x5d11f951',
    timestampFoS: '0x0',
    totalBlockScore: '0x4a9a',
    transactions: [ 
        { 
            blockHash: '0x6ccef34eb59fab927705d344f080f449b576c0626e4aa3e20f569feb8df6e283',
            blockNumber: '0x4a99',
            contractAddress: null,
            from: '0x71959675eeb7c7ec1e0c74f206a9c488d7f178d4',
            gas: '0x493e0',
            gasPrice: '0x5d21dba00',
            gasUsed: '0x5208',
            logs: [],
            logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
            nonce: '0x2',
            senderTxHash: '0xac418c96f7386a3343d149eeb29e48e28905525dda2e5afe55b0661f9ab01aca',
            signatures: [ 
                { 
                    V: '0x4e43',
                    R: '0xa857ef0676d7e65697cadeaf1654b2facd71d0b9f942d695f3972a1f7c34c25c',
                    S: '0x43fba9e5c2c16511f951e27957f1279ea3c1f913b27f9fbb2a8dcb5884e37e3d' 
                } 
            ],
            status: '0x1',
            to: '0xef5cd886c7f8d85fbe8023291761341acbb4da01',
            transactionHash: '0xac418c96f7386a3343d149eeb29e48e28905525dda2e5afe55b0661f9ab01aca',
            transactionIndex: '0x0',
            type: 'TxTypeValueTransfer',
            typeInt: 8,
            value: '0xde0b6b3a7640000' 
        } 
    ],
    transactionsRoot: '0xac418c96f7386a3343d149eeb29e48e28905525dda2e5afe55b0661f9ab01aca',
    voteData: '0x' 
}
```

## getCommittee <a id="getcommittee"></a>

```javascript
caver.klay.getCommittee([defaultBlock] [, callback])
```

Returns a list of all validators in the committee at the specified block. If the parameter is not set, returns a list of all validators in the committee at the latest block.

**Parameters**

| Name         | Type                 | Description                                                                                                                 |
| ------------ | -------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| defaultBlock | Number &#124; String | (optional) If you pass this parameter, it will not use the default block set with [caver.klay.defaultBlock](#defaultblock). |
| callback     | Function             | (optional) Optional callback, returns an error object as the first parameter and the result as the second.                  |

**Return Value**

`Promise` returns `Array` - Addresses of all validators in the committee.

**Example**

```javascript
> caver.klay.getCommittee().then(console.log);
[
    "0x207e38864b45a538733741dc1ff92eff9d1a6159",
    "0x6d64bc82b93368a7f963d6c34483ca3893f405f6",
    "0xbc9c19f91878369776812039e4ebcdfa3c646716",
    "0xe3ed6fa287752b992f936b42360770c59731d9eb"
]
```

## getCommitteeSize <a id="getcommitteesize"></a>

```javascript
caver.klay.getCommitteeSize([defaultBlock] [, callback])
```

Returns the size of the committee at the specified block. If the parameter is not set, returns the size of the committee at the latest block.

**Parameters**

| Name         | Type                 | Description                                                                                                                 |
| ------------ | -------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| defaultBlock | Number &#124; String | (optional) If you pass this parameter, it will not use the default block set with [caver.klay.defaultBlock](#defaultblock). |
| callback     | Function             | (optional) Optional callback, returns an error object as the first parameter and the result as the second.                  |

**Return Value**

`Promise` returns `Number` - The size of the committee.

**Example**

```javascript
> caver.klay.getCommitteeSize().then(console.log);
4
```

## getCouncil <a id="getcouncil"></a>
**NOTE**: `getValidators` is replaced with this method and is not supported anymore.

```javascript
caver.klay.getCouncil([defaultBlock] [, callback])
```

Returns a list of all validators of the council at the specified block. If the parameter is not set, returns a list of all validators of the council at the latest block.

**Parameters**

| Name         | Type                 | Description                                                                                                                 |
| ------------ | -------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| defaultBlock | Number &#124; String | (optional) If you pass this parameter, it will not use the default block set with [caver.klay.defaultBlock](#defaultblock). |
| callback     | Function             | (optional) Optional callback, returns an error object as the first parameter and the result as the second.                  |

**Return Value**

`Promise` returns `Array` - Addresses of all validators of the council.

**Example**

```javascript
> caver.klay.getCouncil().then(console.log);
[
    "0x207e38864b45a538733741dc1ff92eff9d1a6159",
    "0x6d64bc82b93368a7f963d6c34483ca3893f405f6",
    "0xbc9c19f91878369776812039e4ebcdfa3c646716",
    "0xe3ed6fa287752b992f936b42360770c59731d9eb"
]
```

## getCouncilSize <a id="getcouncilsize"></a>

```javascript
caver.klay.getCouncilSize([defaultBlock] [, callback])
```

Returns the size of the council at the specified block. If the parameter is not set, returns the size of the council at the latest block.

**Parameters**

| Name         | Type                 | Description                                                                                                                 |
| ------------ | -------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| defaultBlock | Number &#124; String | (optional) If you pass this parameter, it will not use the default block set with [caver.klay.defaultBlock](#defaultblock). |
| callback     | Function             | (optional) Optional callback, returns an error object as the first parameter and the result as the second.                  |

**Return Value**

`Promise` returns `Number` - The size of the council.

**Example**

```javascript
> caver.klay.getCouncilSize().then(console.log);
4
```


## getStorageAt <a id="getstorageat"></a>

```javascript
caver.klay.getStorageAt(address, position [, defaultBlock] [, callback])
```
Gets the storage at a specific position of an address.

**Parameters**

| Name         | Type                 | Description                                                                                                                 |
| ------------ | -------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| address      | String               | The address to get the storage from.                                                                                        |
| position     | Number               | The index position of the storage.                                                                                          |
| defaultBlock | Number &#124; String | (optional) If you pass this parameter, it will not use the default block set with [caver.klay.defaultBlock](#defaultblock). |
| callback     | Function             | (optional) Optional callback, returns an error object as the first parameter and the result as the second.                  |

**Return Value**

`Promise` returns `String` - The value in storage at the given position.

**Example**

```javascript
> caver.klay.getStorageAt("0x407d73d8a49eeb85d32cf465507dd71d507100c1", 0).then(console.log);
"0x033456732123ffff2342342dd12342434324234234fd234fd23fd4f23d4234"
```


## isMining <a id="ismining"></a>

```javascript
caver.klay.isMining([callback])
```

Returns `true` if client is actively mining new blocks.

**Parameters**

| Name     | Type     | Description                                                                                                |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |


**Return Value**

`Promise` returns `Boolean` - `true` if the client is mining, otherwise `false`.

**Example**

```javascript
> caver.klay.isMining().then(console.log);
true
```

## isSyncing <a id="issyncing"></a>

```javascript
caver.klay.isSyncing([callback])
```

Checks if the node is currently syncing and returns either a syncing object or `false`.

**Parameters**

| Name     | Type     | Description                                                                                                |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| callback | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |


**Return Value**

`Promise` returns `Object|Boolean` - A sync object when the node is currently syncing or `false`:

| Name          | Type   | Description                                                                 |
| ------------- | ------ | --------------------------------------------------------------------------- |
| startingBlock | Number | The block number where the sync started.                                    |
| currentBlock  | Number | The block number where at which block the node currently synced to already. |
| highestBlock  | Number | The estimated block number to sync to.                                      |
| knownStates   | Number | The estimated states to download.                                           |
| pulledStates  | Number | The already downloaded states.                                              |

**Example**

```javascript
> caver.klay.isSyncing().then(console.log);
{
    startingBlock: 100,
    currentBlock: 312,
    highestBlock: 512,
    knownStates: 234566,
    pulledStates: 123455
}
```
