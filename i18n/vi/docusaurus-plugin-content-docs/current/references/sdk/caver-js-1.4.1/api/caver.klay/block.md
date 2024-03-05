# Block

## defaultBlock <a id="defaultblock"></a>

```javascript
caver.klay.defaultBlock
```

Khối mặc định được sử dụng cho các phương pháp nhất định.  Bạn có thể ghi đè tham số này bằng cách truyền defaultBlock để làm tham số cuối cùng.
in the defaultBlock as the last parameter.  Giá trị mặc định là `"latest"`.

- [caver.klay.getBalance()](./account.md#getbalance)
- [caver.klay.getCode()](./account.md#getcode)
- [caver.klay.getTransactionCount()](./account.md#gettransactioncount)
- [caver.klay.getStorageAt()](#getstorageat)
- [caver.klay.call()](./transaction/transaction.md#call)
- [new caver.klay.Contract()](../caver.klay.Contract.md#new-contract) -> [myContract.methods.myMethod().call()](../caver.klay.Contract.md#methods-mymethod-call)

**Thuộc tính**

Tham số khối mặc định có thể là một trong các tham số sau:

- Số: Số khối
- `"genesis"` - Chuỗi: Khối khởi nguyên
- `"latest"` - Chuỗi: Khối mới nhất (khối cuối cùng trong chuỗi khối vào thời điểm hiện tại)

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

| Tên      | type | Mô tả                                                                                                                              |
| -------- | ---- | ---------------------------------------------------------------------------------------------------------------------------------- |
| callback | Hàm  | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

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

| Tên                      | Loại       | Mô tả                                                                                                                                                                                      |
| ------------------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| blockHashOrBlockNumber   | Chuỗi \| Số | Hàm băm của khối hoặc số khối. Hoặc chuỗi `"genesis"` hoặc `"latest"`.                                                                                                                     |
| returnTransactionObjects | Boolean     | (tùy chọn, mặc định là `false`) Nếu giá trị là `true`, khối trả về sẽ chứa tất cả các giao dịch dưới dạng đối tượng, nếu là `false` thì chỉ chứa các hàm băm giao dịch. |
| callback                 | Hàm         | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai.                                                         |

**Giá trị trả về**

`Promise` trả về `Object` - Đối tượng của khối:

| Tên              | type            | Mô tả                                                                                                     |
| ---------------- | --------------- | --------------------------------------------------------------------------------------------------------- |
| blockScore       | SỐ LƯỢNG        | Độ khó trước đây. Giá trị luôn là 1 trong công cụ đồng thuận BFT                                          |
| extraData        | Chuỗi           | Trường "dữ liệu bổ sung" của khối này.                                                                    |
| gasUsed          | Số              | Tổng số gas đã được sử dụng bởi tất cả các giao dịch trong khối này.                                      |
| governanceData   | DATA            | Cấu hình quản trị được mã hóa RLP                                                                         |
| hash             | Chuỗi 32 byte   | Hàm băm của một khối. Giá trị là `null` nếu đó là khối đang chờ xử lý.                                    |
| nhật kýBloom     | Chuỗi 256 byte  | Bộ lọc Bloom cho các bản ghi của khối. Giá trị là `null` nếu đó là khối đang chờ xử lý.                   |
| number           | Số              | Số khối. Giá trị là `null` nếu đó là khối đang chờ xử lý.                                                 |
| parentHash       | Chuỗi 32 byte   | Hàm băm của khối cha mẹ.                                                                                  |
| receiptsRoot     | DỮ LIỆU 32 byte | Gốc của trie biên lai giao dịch của khối.                                                                 |
| phần thưởng      | DỮ LIỆU 20 byte | Địa chỉ của người thụ hưởng đã được trao phần thưởng khối.                                                |
| size             | Số              | Giá trị nguyên chỉ kích cỡ của khối này theo byte.                                                        |
| stateRoot        | Chuỗi 32 byte   | Gốc của trie trạng thái cuối trong khối.                                                                  |
| dấu thời gian    | Số              | Dấu thời gian unix khi khối được đối chiếu.                                                               |
| timestampFoS     | SỐ LƯỢNG        | Phần giây của dấu thời gian khi khối được đối chiếu.                                                      |
| totalBlockScore  | SỐ LƯỢNG        | Giá trị nguyên chỉ tổng khối lượng tính toán trung bình của chuỗi cho đến khối này.                       |
| giao dịch        | Mảng            | Mảng đối tượng giao dịch hoặc hàm băm giao dịch 32 byte tùy thuộc vào tham số `returnTransactionObjects`. |
| transactionsRoot | Chuỗi 32 byte   | Gốc của trie giao dịch trong khối.                                                                        |
| voteData         | DATA            | Phiếu bầu quản trị được mã hóa RLP của người đề xuất                                                      |

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

Trả về danh sách các biên lai giao dịch bao gồm trong khối được xác định bởi hàm băm của khối đã cho.

**Tham số**

| Tên       | Loại | Mô tả                                                                                                                              |
| --------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------- |
| blockHash | Chuỗi | Hàm băm của một khối.                                                                                                              |
| callback  | Hàm   | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `Array` - Các biên lai được bao gồm trong một khối.  Nếu khối mục tiêu không chứa giao dịch, thì hàm sẽ trả về một mảng trống `[]`.

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

| Tên                    | Loại       | Mô tả                                                                                                                              |
| ---------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| blockHashOrBlockNumber | Chuỗi \| Số | Số khối hoặc hàm băm. Hoặc chuỗi `"genesis"` hoặc `"latest"`.                                                                      |
| callback               | Hàm         | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

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

| Tên                    | type        | Mô tả                                                                                                                              |
| ---------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| blockHashOrBlockNumber | Chuỗi \| Số | Hàm băm của khối hoặc số khối. Hoặc chuỗi `"genesis"` hoặc `"latest"`.                                                             |
| callback               | Hàm         | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `Object` - Một đối tượng khối với thông tin đồng thuận (bao gồm một người đề xuất và một danh sách các thành viên ủy ban) Đối tượng khối bao gồm:
The block object contains:

| Tên              | Loại           | Mô tả                                                                                                                                                    |
| ---------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockScore       | SỐ LƯỢNG        | Độ khó trước đây. Giá trị luôn là 1 trong công cụ đồng thuận BFT                                                                                         |
| committee        | Mảng            | Mảng địa chỉ của các thành viên ủy ban của khối này. Ủy ban là một tập hợp con của những nút xác thực đã tham gia vào giao thức đồng thuận cho khối này. |
| extraData        | Chuỗi           | Trường "dữ liệu bổ sung" của khối này.                                                                                                                   |
| gasUsed          | SỐ LƯỢNG        | Tổng số gas đã được sử dụng bởi tất cả các giao dịch trong khối này.                                                                                     |
| governanceData   | DATA            | Cấu hình quản trị được mã hóa RLP                                                                                                                        |
| hash             | DỮ LIỆU 32 byte | Hàm băm của một khối. Giá trị là `null` nếu đó là khối đang chờ xử lý.                                                                                   |
| nhật kýBloom     | Chuỗi 256 byte  | Bộ lọc Bloom cho các bản ghi của khối. Giá trị là `null` nếu đó là khối đang chờ xử lý.                                                                  |
| number           | SỐ LƯỢNG        | Số khối. Giá trị là `null` nếu đó là khối đang chờ xử lý.                                                                                                |
| parentHash       | DỮ LIỆU 32 byte | Hàm băm của khối cha mẹ.                                                                                                                                 |
| người đề xuất    | DỮ LIỆU 20 byte | Địa chỉ của người đề xuất khối.                                                                                                                          |
| receiptsRoot     | DỮ LIỆU 32 byte | Gốc của trie biên lai giao dịch của khối.                                                                                                                |
| phần thưởng      | DỮ LIỆU 20 byte | Địa chỉ của người thụ hưởng đã được trao phần thưởng khối.                                                                                               |
| size             | SỐ LƯỢNG        | Giá trị nguyên chỉ kích cỡ của khối này theo byte.                                                                                                       |
| stateRoot        | DỮ LIỆU 32 byte | Gốc của trie trạng thái cuối trong khối.                                                                                                                 |
| dấu thời gian    | SỐ LƯỢNG        | Dấu thời gian unix khi khối được đối chiếu.                                                                                                              |
| timestampFoS     | SỐ LƯỢNG        | Phần giây của dấu thời gian khi khối được đối chiếu.                                                                                                     |
| totalBlockScore  | SỐ LƯỢNG        | Giá trị nguyên chỉ tổng khối lượng tính toán trung bình của chuỗi cho đến khối này.                                                                      |
| giao dịch        | Mảng            | Mảng đối tượng giao dịch.                                                                                                                                |
| transactionsRoot | DỮ LIỆU 32 byte | Gốc của trie giao dịch trong khối.                                                                                                                       |
| voteData         | DATA            | Phiếu bầu quản trị được mã hóa RLP của người đề xuất                                                                                                     |

**Ví dụ**

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

Trả về danh sách tất cả các nút xác thực của ủy ban tại khối được chỉ định. Nếu tham số không được đặt, thì sẽ trả về danh sách tất cả các nút xác thực trong ủy ban ở khối mới nhất.

**Tham số**

| Tên          | Loại       | Mô tả                                                                                                                                                                     |
| ------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| defaultBlock | Số \| Chuỗi | (tùy chọn) Nếu bạn truyền tham số này thì tham số này sẽ không sử dụng khối mặc định được thiết lập bằng hàm [caver.klay.defaultBlock](#defaultblock). |
| callback     | Hàm         | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai.                                        |

**Giá trị trả về**

`Promise` trả về `Array` - Địa chỉ của tất cả các nút xác thực của ủy ban.

**Ví dụ**

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

Trả về quy mô của ủy ban tại khối được chỉ định. Nếu tham số không được đặt thì sẽ trả về quy mô của ủy ban tại khối mới nhất.

**Tham số**

| Tên          | Loại       | Mô tả                                                                                                                                                                     |
| ------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| defaultBlock | Số \| Chuỗi | (tùy chọn) Nếu bạn truyền tham số này thì tham số này sẽ không sử dụng khối mặc định được thiết lập bằng hàm [caver.klay.defaultBlock](#defaultblock). |
| callback     | Hàm         | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai.                                        |

**Giá trị trả về**

`Promise` trả về `Number` - Quy mô của ủy ban.

**Ví dụ**

```javascript
> caver.klay.getCommitteeSize().then(console.log);
4
```

## getCouncil <a id="getcouncil"></a>

**LƯU Ý**: Phương thức `getValidators` được thay thế bằng phương pháp này và không còn được hỗ trợ.

```javascript
caver.klay.getCouncil([defaultBlock] [, callback])
```

Trả về danh sách tất cả các nút xác thực của hội đồng tại khối được chỉ định. Nếu tham số không được đặt, thì sẽ trả về danh sách tất cả những nút xác thực của hội đồng tại khối mới nhất.

**Tham số**

| Tên          | type        | Mô tả                                                                                                                                                                     |
| ------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| defaultBlock | Số \| Chuỗi | (tùy chọn) Nếu bạn truyền tham số này thì tham số này sẽ không sử dụng khối mặc định được thiết lập bằng hàm [caver.klay.defaultBlock](#defaultblock). |
| callback     | Hàm         | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai.                                        |

**Giá trị trả về**

`Promise` trả về `Array` - Địa chỉ của tất cả các nút xác thực trong hội đồng.

**Ví dụ**

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

Trả về quy mô của hội đồng tại khối được chỉ định. Nếu tham số không được đặt thì sẽ trả về quy mô của hội đồng tại khối mới nhất.

**Tham số**

| Tên          | Loại       | Mô tả                                                                                                                                                                     |
| ------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| defaultBlock | Số \| Chuỗi | (tùy chọn) Nếu bạn truyền tham số này thì tham số này sẽ không sử dụng khối mặc định được thiết lập bằng hàm [caver.klay.defaultBlock](#defaultblock). |
| callback     | Hàm         | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai.                                        |

**Giá trị trả về**

`Promise` trả về `Number` - Quy mô của hội đồng.

**Ví dụ**

```javascript
> caver.klay.getCouncilSize().then(console.log);
4
```

## getStorageAt <a id="getstorageat"></a>

```javascript
caver.klay.getStorageAt(address, position [, defaultBlock] [, callback])
```

Nhận bộ nhớ lưu trữ tại một vị trí cụ thể của địa chỉ.

**Tham số**

| Tên          | type        | Mô tả                                                                                                                                                                     |
| ------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address      | Chuỗi       | Địa chỉ để nhận bộ nhớ lưu trữ từ đó.                                                                                                                                     |
| vị trí       | Số          | Vị trí chỉ mục của bộ nhớ lưu trữ.                                                                                                                                        |
| defaultBlock | Số \| Chuỗi | (tùy chọn) Nếu bạn truyền tham số này thì tham số này sẽ không sử dụng khối mặc định được thiết lập bằng hàm [caver.klay.defaultBlock](#defaultblock). |
| callback     | Hàm         | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai.                                        |

**Giá trị trả về**

`Promise` trả về `String` - Giá trị trong bộ nhớ lưu trữ tại vị trí đã cho.

**Ví dụ**

```javascript
> caver.klay.getStorageAt("0x407d73d8a49eeb85d32cf465507dd71d507100c1", 0).then(console.log);
"0x033456732123ffff2342342dd12342434324234234fd234fd23fd4f23d4234"
```

## isMining <a id="ismining"></a>

```javascript
caver.klay.isMining([callback])
```

Giá trị trả về là `true` nếu máy khách đang tích cực khai thác các khối mới.

**Tham số**

| Tên      | Loại | Mô tả                                                                                                                              |
| -------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------- |
| callback | Hàm   | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `boolean` - giá trị là `true` nếu máy khách đang khai thác, nếu không sẽ là `false`.

**Ví dụ**

```javascript
> caver.klay.isMining().then(console.log);
true
```

## isSyncing <a id="issyncing"></a>

```javascript
caver.klay.isSyncing([callback])
```

Kiểm tra xem nút có đang đồng bộ hóa không và trả về một đối tượng đồng bộ hóa hoặc `false`.

**Tham số**

| Tên      | Loại | Mô tả                                                                                                                              |
| -------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------- |
| callback | Hàm   | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `Object|Boolean` - Đối tượng đồng bộ hóa khi nút hiện đang đồng bộ hóa hoặc `false`:

| Tên           | Loại | Mô tả                                                 |
| ------------- | ----- | ----------------------------------------------------- |
| startingBlock | Số    | Số khối nơi quy trình đồng bộ hóa bắt đầu.            |
| currentBlock  | Số    | Số khối tại khối mà nút hiện đã được đồng bộ hóa đến. |
| highestBlock  | Số    | Số khối ước tính để đồng bộ hóa đến.                  |
| knownStates   | Số    | Các trạng thái ước tính cần tải xuống.                |
| pulledStates  | Số    | Các trạng thái đã tải xuống.                          |

**Ví dụ**

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
